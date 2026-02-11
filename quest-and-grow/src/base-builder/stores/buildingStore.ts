import { create } from 'zustand'
import type { Building, BuildingDefinition } from '@core/types/index.ts'
import { FAMILY_ID } from '@core/types/index.ts'
import { dbGet, dbSet } from '@core/firebase/database.ts'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { startConstruction, checkConstructionComplete } from '@base-builder/services/buildingService.ts'
import { calculateLevel } from '@core/services/dateUtils.ts'

const basePath = `families/${FAMILY_ID}`

interface BuildingState {
  buildings: Record<string, Record<string, Building>> // memberId -> buildingId -> building

  loadBuildings: (memberId: string) => Promise<void>
  constructBuilding: (memberId: string, definition: BuildingDefinition) => Promise<boolean>
  upgradeBuilding: (memberId: string, building: Building, definition: BuildingDefinition) => Promise<boolean>
  checkAllConstruction: (memberId: string) => Promise<void>
  getBuilding: (memberId: string, slot: number) => Building | null
}

export const useBuildingStore = create<BuildingState>((set, get) => ({
  buildings: {},

  loadBuildings: async (memberId) => {
    const data = await dbGet<Record<string, Building>>(
      `${basePath}/buildings/${memberId}`,
    )
    set((s) => ({
      buildings: { ...s.buildings, [memberId]: data ?? {} },
    }))
  },

  constructBuilding: async (memberId, definition) => {
    const member = useFamilyStore.getState().getMember(memberId)
    if (!member) return false

    const playerLevel = calculateLevel(member.stats.xp)
    if (playerLevel < definition.unlockLevel) return false

    const result = startConstruction(definition, 1, member.stats.resources, memberId)
    if (!result) return false

    // Persist building and updated resources
    await dbSet(`${basePath}/buildings/${memberId}/${result.building.id}`, result.building)
    await useFamilyStore.getState().updateMemberStats(memberId, { resources: result.newResources })

    // Update local state
    set((s) => ({
      buildings: {
        ...s.buildings,
        [memberId]: {
          ...s.buildings[memberId],
          [result.building.id]: result.building,
        },
      },
    }))

    return true
  },

  upgradeBuilding: async (memberId, building, definition) => {
    const member = useFamilyStore.getState().getMember(memberId)
    if (!member) return false

    const nextLevel = building.level + 1
    const result = startConstruction(definition, nextLevel, member.stats.resources, memberId, building)
    if (!result) return false

    await dbSet(`${basePath}/buildings/${memberId}/${result.building.id}`, result.building)
    await useFamilyStore.getState().updateMemberStats(memberId, { resources: result.newResources })

    set((s) => ({
      buildings: {
        ...s.buildings,
        [memberId]: {
          ...s.buildings[memberId],
          [result.building.id]: result.building,
        },
      },
    }))

    return true
  },

  checkAllConstruction: async (memberId) => {
    const memberBuildings = get().buildings[memberId] ?? {}
    let changed = false

    const updated = { ...memberBuildings }
    for (const [id, building] of Object.entries(updated)) {
      if (building.status === 'constructing') {
        const checked = checkConstructionComplete(building)
        if (checked.status !== building.status) {
          updated[id] = checked
          await dbSet(`${basePath}/buildings/${memberId}/${id}`, checked)
          changed = true
        }
      }
    }

    if (changed) {
      set((s) => ({
        buildings: { ...s.buildings, [memberId]: updated },
      }))
    }
  },

  getBuilding: (memberId, slot) => {
    const memberBuildings = get().buildings[memberId] ?? {}
    return Object.values(memberBuildings).find((b) => b.position === slot) ?? null
  },
}))
