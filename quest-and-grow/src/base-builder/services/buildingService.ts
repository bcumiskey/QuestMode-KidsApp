import type { Building, BuildingDefinition, Resources } from '@core/types/index.ts'
import { canAfford, spendResources } from '@progression/services/resourceService.ts'

/**
 * Check if a building can be constructed or upgraded.
 */
export function canBuild(
  definition: BuildingDefinition,
  targetLevel: number,
  currentResources: Resources,
  playerLevel: number,
): { canBuild: boolean; reason?: string } {
  if (playerLevel < definition.unlockLevel) {
    return { canBuild: false, reason: `Requires level ${definition.unlockLevel}` }
  }

  const levelDef = definition.levels[targetLevel - 1]
  if (!levelDef) {
    return { canBuild: false, reason: 'Max level reached' }
  }

  if (!canAfford(currentResources, levelDef.cost)) {
    return { canBuild: false, reason: 'Not enough resources' }
  }

  return { canBuild: true }
}

/**
 * Start construction of a building. Returns updated resources and building state.
 */
export function startConstruction(
  definition: BuildingDefinition,
  targetLevel: number,
  currentResources: Resources,
  memberId: string,
  existingBuilding?: Building,
): { building: Building; newResources: Resources } | null {
  const levelDef = definition.levels[targetLevel - 1]
  if (!levelDef) return null

  const newResources = spendResources(currentResources, levelDef.cost)
  if (!newResources) return null

  const now = new Date()
  const endsAt = new Date(now.getTime() + levelDef.buildTimeMinutes * 60000)

  const building: Building = {
    id: existingBuilding?.id ?? `${memberId}_${definition.id}`,
    definitionId: definition.id,
    memberId,
    level: targetLevel,
    status: levelDef.buildTimeMinutes === 0 ? 'built' : 'constructing',
    constructionStartedAt: levelDef.buildTimeMinutes === 0 ? null : now.toISOString(),
    constructionEndsAt: levelDef.buildTimeMinutes === 0 ? null : endsAt.toISOString(),
    position: definition.slot,
  }

  return { building, newResources }
}

/**
 * Check if construction is complete. Returns the building with updated status.
 */
export function checkConstructionComplete(building: Building): Building {
  if (building.status !== 'constructing' || !building.constructionEndsAt) {
    return building
  }

  if (new Date() >= new Date(building.constructionEndsAt)) {
    return {
      ...building,
      status: 'built',
      constructionStartedAt: null,
      constructionEndsAt: null,
    }
  }

  return building
}

/**
 * Get construction progress as a percentage (0-100).
 */
export function getConstructionProgress(building: Building): number {
  if (building.status !== 'constructing' || !building.constructionStartedAt || !building.constructionEndsAt) {
    return building.status === 'built' ? 100 : 0
  }

  const start = new Date(building.constructionStartedAt).getTime()
  const end = new Date(building.constructionEndsAt).getTime()
  const now = Date.now()

  if (now >= end) return 100
  return Math.floor(((now - start) / (end - start)) * 100)
}

/**
 * Get the time remaining for construction in a human-readable format.
 */
export function getTimeRemaining(building: Building): string {
  if (building.status !== 'constructing' || !building.constructionEndsAt) return ''

  const remaining = new Date(building.constructionEndsAt).getTime() - Date.now()
  if (remaining <= 0) return 'Done!'

  const mins = Math.ceil(remaining / 60000)
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  const remainingMins = mins % 60
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`
}

/**
 * Get the bonus description for a building level.
 */
export function getBonusDescription(bonus: string, value: number): string {
  switch (bonus) {
    case 'energy_regen': return `+${value} energy per day`
    case 'knowledge_xp': return `+${value}% Knowledge XP`
    case 'body_xp': return `+${value}% Body XP`
    case 'brave_xp': return `+${value}% Brave XP`
    case 'all_xp': return `+${value}% all XP`
    case 'bonus_chance': return `+${value}% bonus chance`
    case 'creature_attract': return `+${value}% creature attraction`
    case 'bond_resources': return `+${value} Bond resources`
    case 'all_resources': return `+${value} all resources`
    default: return `+${value}`
  }
}
