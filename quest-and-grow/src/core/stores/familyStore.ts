import { create } from 'zustand'
import type { Member, FamilyInfo, FamilySettings, Quest, QuestLog } from '@core/types/index.ts'
import { FAMILY_ID } from '@core/types/index.ts'
import { dbOnValue, dbSet, dbUpdate } from '@core/firebase/database.ts'
import type { Unsubscribe } from 'firebase/database'

interface FamilyState {
  familyInfo: FamilyInfo | null
  members: Record<string, Member>
  quests: Record<string, Quest>
  questLogs: Record<string, Record<string, QuestLog>> // memberId -> logId -> log
  syncStatus: 'connecting' | 'synced' | 'error'
  unsubscribers: Unsubscribe[]

  startSync: () => void
  stopSync: () => void
  updateMember: (memberId: string, updates: Partial<Member>) => Promise<void>
  updateMemberStats: (memberId: string, stats: Partial<Member['stats']>) => Promise<void>
  updateSettings: (settings: Partial<FamilySettings>) => Promise<void>
  getMember: (memberId: string) => Member | null
  getChildMembers: () => Member[]
}

const basePath = `families/${FAMILY_ID}`

export const useFamilyStore = create<FamilyState>((set, get) => ({
  familyInfo: null,
  members: {},
  quests: {},
  questLogs: {},
  syncStatus: 'connecting',
  unsubscribers: [],

  startSync: () => {
    const unsubs: Unsubscribe[] = []

    // Listen to family info
    unsubs.push(
      dbOnValue<FamilyInfo>(`${basePath}/info`, (data) => {
        set({ familyInfo: data, syncStatus: 'synced' })
      }),
    )

    // Listen to members
    unsubs.push(
      dbOnValue<Record<string, Member>>(`${basePath}/members`, (data) => {
        set({ members: data ?? {} })
      }),
    )

    // Listen to quests
    unsubs.push(
      dbOnValue<Record<string, Quest>>(`${basePath}/quests`, (data) => {
        set({ quests: data ?? {} })
      }),
    )

    set({ unsubscribers: unsubs })
  },

  stopSync: () => {
    const { unsubscribers } = get()
    unsubscribers.forEach((unsub) => unsub())
    set({ unsubscribers: [] })
  },

  updateMember: async (memberId, updates) => {
    const flatUpdates: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(updates)) {
      flatUpdates[`${basePath}/members/${memberId}/${key}`] = value
    }
    await dbUpdate('', flatUpdates)
  },

  updateMemberStats: async (memberId, stats) => {
    const flatUpdates: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(stats)) {
      flatUpdates[`${basePath}/members/${memberId}/stats/${key}`] = value
    }
    await dbUpdate('', flatUpdates)
  },

  updateSettings: async (settings) => {
    const current = get().familyInfo?.settings
    if (!current) return
    await dbSet(`${basePath}/info/settings`, { ...current, ...settings })
  },

  getMember: (memberId) => get().members[memberId] ?? null,

  getChildMembers: () =>
    Object.values(get().members).filter((m) => m.role === 'child'),
}))
