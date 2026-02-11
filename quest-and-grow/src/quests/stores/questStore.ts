import { create } from 'zustand'
import type { QuestBase, QuestCategory, BonusResult, Resources } from '@core/types/index.ts'
import { FAMILY_ID } from '@core/types/index.ts'
import { dbGet, dbSet } from '@core/firebase/database.ts'
import { getTodayString } from '@core/services/dateUtils.ts'
import { calculateXpAward, type XpAwardResult } from '@progression/services/xpService.ts'
import { updateStreak, type StreakResult } from '@progression/services/streakService.ts'
import { rollBonus } from '@progression/services/rewardService.ts'
import { addResources, getThemeCurrencyBonus } from '@progression/services/resourceService.ts'
import { checkAutoPromotion, type TrustUpdate } from '@progression/services/trustService.ts'
import { rollCreatureAttraction, type AttractionResult } from '@creatures/services/attractionService.ts'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useCreatureStore } from '@creatures/stores/creatureStore.ts'

const basePath = `families/${FAMILY_ID}`

export interface CompletedTodayMap {
  [key: string]: boolean // key: "{date}_{category}_{questId}"
}

export interface QuestCompletionResult {
  xpResult: XpAwardResult
  streakResult: StreakResult
  bonusResult: BonusResult
  resourcesEarned: Partial<Resources>
  trustUpdate: TrustUpdate
  creatureAttraction: AttractionResult
}

interface QuestState {
  completedToday: Record<string, CompletedTodayMap> // memberId -> map
  pendingApproval: Record<string, Record<string, { quest: QuestBase; category: QuestCategory; timestamp: string }>>

  loadCompletedToday: (memberId: string) => Promise<void>
  completeQuest: (memberId: string, quest: QuestBase, category: QuestCategory) => Promise<QuestCompletionResult | null>
  uncompleteQuest: (memberId: string, quest: QuestBase, category: QuestCategory) => Promise<void>
  isCompleted: (memberId: string, questId: string, category: QuestCategory) => boolean
  isPending: (memberId: string, questId: string, category: QuestCategory) => boolean
  submitForApproval: (memberId: string, quest: QuestBase, category: QuestCategory) => Promise<void>
  approveQuest: (memberId: string, key: string) => Promise<QuestCompletionResult | null>
  rejectQuest: (memberId: string, key: string) => Promise<void>
}

export const useQuestStore = create<QuestState>((set, get) => ({
  completedToday: {},
  pendingApproval: {},

  loadCompletedToday: async (memberId) => {
    const today = getTodayString()
    const data = await dbGet<CompletedTodayMap>(
      `${basePath}/questLogs/${memberId}/${today}`,
    )
    set((s) => ({
      completedToday: { ...s.completedToday, [memberId]: data ?? {} },
    }))

    const pending = await dbGet<Record<string, { quest: QuestBase; category: QuestCategory; timestamp: string }>>(
      `${basePath}/pendingApproval/${memberId}`,
    )
    set((s) => ({
      pendingApproval: { ...s.pendingApproval, [memberId]: pending ?? {} },
    }))
  },

  isCompleted: (memberId, questId, category) => {
    const today = getTodayString()
    const key = `${today}_${category}_${questId}`
    return !!get().completedToday[memberId]?.[key]
  },

  isPending: (memberId, questId, category) => {
    const today = getTodayString()
    const key = `${today}_${category}_${questId}`
    return !!get().pendingApproval[memberId]?.[key]
  },

  completeQuest: async (memberId, quest, category) => {
    const today = getTodayString()
    const key = `${today}_${category}_${quest.id}`

    // Already completed
    if (get().completedToday[memberId]?.[key]) return null

    // Get current member stats
    const member = useFamilyStore.getState().getMember(memberId)
    if (!member) return null
    const stats = member.stats
    const settings = useFamilyStore.getState().familyInfo?.settings

    // 1. Roll bonus reward
    const bonusResult = rollBonus()

    // 2. Calculate XP award
    const xpResult = calculateXpAward(
      stats.xp,
      quest.baseXp,
      stats.streak,
      bonusResult.xpMultiplier,
    )

    // 3. Update streak
    const streakResult = updateStreak(
      stats.streak,
      stats.longestStreak,
      stats.lastCompletedDate,
      settings?.hardDayActive && settings.hardDayChildren.includes(memberId),
    )

    // 4. Calculate resources earned
    const baseResources = quest.baseResources ?? {}
    const themeCurrencyBonus = getThemeCurrencyBonus(category, quest.difficulty)
    const totalResources = { ...baseResources }
    for (const [k, v] of Object.entries(themeCurrencyBonus)) {
      totalResources[k as keyof Resources] = (totalResources[k as keyof Resources] ?? 0) + (v ?? 0)
    }
    const newResources = addResources(stats.resources, totalResources)

    // 5. Check trust auto-promotion
    const newTotalQuests = stats.totalQuestsCompleted + 1
    const trustUpdate = checkAutoPromotion(
      stats.trustLevel,
      streakResult.newStreak,
      newTotalQuests,
      stats.trustWarnings,
    )

    // 6. Roll for creature attraction
    const creatureAttraction = rollCreatureAttraction(category)

    // 6b. If attracted, discover the creature
    if (creatureAttraction.attracted && creatureAttraction.rarity) {
      await useCreatureStore.getState().discoverCreature(memberId, creatureAttraction.rarity, category)
    }

    // 7. Persist to Firebase
    // Mark quest completed today
    await dbSet(`${basePath}/questLogs/${memberId}/${today}/${key}`, true)

    // Update member stats
    await useFamilyStore.getState().updateMemberStats(memberId, {
      xp: xpResult.newXp,
      level: xpResult.newLevel,
      streak: streakResult.newStreak,
      longestStreak: streakResult.newLongestStreak,
      lastCompletedDate: streakResult.lastCompletedDate,
      resources: newResources,
      totalQuestsCompleted: newTotalQuests,
      trustLevel: trustUpdate.newTrustLevel,
      trustWarnings: trustUpdate.newTrustWarnings,
    })

    // Remove from pending if it was there
    await dbSet(`${basePath}/pendingApproval/${memberId}/${key}`, null)

    // Update local state
    set((s) => ({
      completedToday: {
        ...s.completedToday,
        [memberId]: { ...s.completedToday[memberId], [key]: true },
      },
    }))

    return {
      xpResult,
      streakResult,
      bonusResult,
      resourcesEarned: totalResources,
      trustUpdate,
      creatureAttraction,
    }
  },

  uncompleteQuest: async (memberId, quest, category) => {
    const today = getTodayString()
    const key = `${today}_${category}_${quest.id}`

    if (!get().completedToday[memberId]?.[key]) return

    const member = useFamilyStore.getState().getMember(memberId)
    if (!member) return

    // Deduct XP
    const newXp = Math.max(0, member.stats.xp - quest.baseXp)
    await useFamilyStore.getState().updateMemberStats(memberId, { xp: newXp })

    // Remove completion
    await dbSet(`${basePath}/questLogs/${memberId}/${today}/${key}`, null)

    set((s) => {
      const updated = { ...s.completedToday[memberId] }
      delete updated[key]
      return { completedToday: { ...s.completedToday, [memberId]: updated } }
    })
  },

  submitForApproval: async (memberId, quest, category) => {
    const today = getTodayString()
    const key = `${today}_${category}_${quest.id}`
    const entry = { quest, category, timestamp: new Date().toISOString() }

    await dbSet(`${basePath}/pendingApproval/${memberId}/${key}`, entry)

    set((s) => ({
      pendingApproval: {
        ...s.pendingApproval,
        [memberId]: { ...s.pendingApproval[memberId], [key]: entry },
      },
    }))
  },

  approveQuest: async (memberId, key) => {
    const pending = get().pendingApproval[memberId]?.[key]
    if (!pending) return null

    try {
      // Complete the quest with full rewards
      const result = await get().completeQuest(memberId, pending.quest, pending.category)

      // Remove from pending in Firebase
      await dbSet(`${basePath}/pendingApproval/${memberId}/${key}`, null)

      // Remove from pending in local state
      set((s) => {
        const updated = { ...s.pendingApproval[memberId] }
        delete updated[key]
        return { pendingApproval: { ...s.pendingApproval, [memberId]: updated } }
      })

      return result
    } catch (error) {
      console.error('Failed to approve quest:', error)
      return null
    }
  },

  rejectQuest: async (memberId, key) => {
    try {
      await dbSet(`${basePath}/pendingApproval/${memberId}/${key}`, null)

      set((s) => {
        const updated = { ...s.pendingApproval[memberId] }
        delete updated[key]
        return { pendingApproval: { ...s.pendingApproval, [memberId]: updated } }
      })
    } catch (error) {
      console.error('Failed to reject quest:', error)
    }
  },
}))
