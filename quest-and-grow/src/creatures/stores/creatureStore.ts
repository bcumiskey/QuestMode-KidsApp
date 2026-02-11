import { create } from 'zustand'
import type { Creature, CreatureRarity, QuestCategory } from '@core/types/index.ts'
import { FAMILY_ID } from '@core/types/index.ts'
import { dbGet, dbSet } from '@core/firebase/database.ts'
import { getCreaturesForTheme } from '@creatures/data/creatureDefinitions.ts'
import { careForCreature, evolveCreature, canEvolve } from '@creatures/services/evolutionService.ts'
import { useFamilyStore } from '@core/stores/familyStore.ts'

const basePath = `families/${FAMILY_ID}`

interface CreatureState {
  creatures: Record<string, Record<string, Creature>> // memberId -> creatureId -> creature

  loadCreatures: (memberId: string) => Promise<void>
  discoverCreature: (memberId: string, rarity: CreatureRarity, category: QuestCategory) => Promise<Creature | null>
  careFor: (memberId: string, creatureId: string) => Promise<Creature | null>
  tryEvolve: (memberId: string, creatureId: string) => Promise<Creature | null>
  getCreaturesByMember: (memberId: string) => Creature[]
}

export const useCreatureStore = create<CreatureState>((set, get) => ({
  creatures: {},

  loadCreatures: async (memberId) => {
    const data = await dbGet<Record<string, Creature>>(
      `${basePath}/creatures/${memberId}`,
    )
    set((s) => ({
      creatures: { ...s.creatures, [memberId]: data ?? {} },
    }))
  },

  discoverCreature: async (memberId, rarity, category) => {
    const member = useFamilyStore.getState().getMember(memberId)
    if (!member) return null

    // Get available creatures for this theme, rarity, and category
    const themeCreatures = getCreaturesForTheme(member.theme)
    const candidates = themeCreatures.filter(
      (c) => c.rarity === rarity && c.category === category,
    )

    if (candidates.length === 0) {
      // Fall back to any creature of this rarity in the theme
      const fallback = themeCreatures.filter((c) => c.rarity === rarity)
      if (fallback.length === 0) return null
      candidates.push(...fallback)
    }

    // Pick a random candidate that hasn't been discovered yet
    const existingIds = new Set(
      Object.values(get().creatures[memberId] ?? {}).map((c) => c.definitionId),
    )
    const undiscovered = candidates.filter((c) => !existingIds.has(c.id))
    const pool = undiscovered.length > 0 ? undiscovered : candidates

    const definition = pool[Math.floor(Math.random() * pool.length)]

    const creature: Creature = {
      id: `${memberId}_${definition.id}_${Date.now()}`,
      definitionId: definition.id,
      memberId,
      stage: 'egg',
      carePoints: 0,
      bondPoints: 0,
      happiness: 'neutral',
      lastCaredAt: null,
      careStreak: 0,
      discoveredAt: new Date().toISOString(),
    }

    await dbSet(`${basePath}/creatures/${memberId}/${creature.id}`, creature)

    set((s) => ({
      creatures: {
        ...s.creatures,
        [memberId]: {
          ...s.creatures[memberId],
          [creature.id]: creature,
        },
      },
    }))

    return creature
  },

  careFor: async (memberId, creatureId) => {
    const creature = get().creatures[memberId]?.[creatureId]
    if (!creature) return null

    const updated = careForCreature(creature)
    if (updated === creature) return null // Already cared for today

    await dbSet(`${basePath}/creatures/${memberId}/${creatureId}`, updated)

    set((s) => ({
      creatures: {
        ...s.creatures,
        [memberId]: {
          ...s.creatures[memberId],
          [creatureId]: updated,
        },
      },
    }))

    return updated
  },

  tryEvolve: async (memberId, creatureId) => {
    const creature = get().creatures[memberId]?.[creatureId]
    if (!creature) return null

    const check = canEvolve(creature)
    if (!check.canEvolve) return null

    const evolved = evolveCreature(creature)
    if (!evolved) return null

    await dbSet(`${basePath}/creatures/${memberId}/${creatureId}`, evolved)

    set((s) => ({
      creatures: {
        ...s.creatures,
        [memberId]: {
          ...s.creatures[memberId],
          [creatureId]: evolved,
        },
      },
    }))

    return evolved
  },

  getCreaturesByMember: (memberId) => {
    return Object.values(get().creatures[memberId] ?? {})
  },
}))
