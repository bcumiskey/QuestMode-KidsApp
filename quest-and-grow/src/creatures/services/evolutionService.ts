import type { Creature, EvolutionStage } from '@core/types/index.ts'
import { getCreatureDefinition } from '@creatures/data/creatureDefinitions.ts'

const STAGE_ORDER: EvolutionStage[] = ['egg', 'baby', 'juvenile', 'adult']

/**
 * Check if a creature can evolve to the next stage.
 */
export function canEvolve(creature: Creature): { canEvolve: boolean; reason?: string } {
  const definition = getCreatureDefinition(creature.definitionId)
  if (!definition) return { canEvolve: false, reason: 'Unknown creature' }

  const currentIndex = STAGE_ORDER.indexOf(creature.stage)
  if (currentIndex >= STAGE_ORDER.length - 1) {
    return { canEvolve: false, reason: 'Already fully evolved' }
  }

  const nextStage = definition.stages[currentIndex + 1]
  if (!nextStage) return { canEvolve: false, reason: 'No next stage defined' }

  if (creature.carePoints < nextStage.careRequired) {
    return { canEvolve: false, reason: `Needs ${nextStage.careRequired - creature.carePoints} more care` }
  }

  if (creature.bondPoints < nextStage.bondRequired) {
    return { canEvolve: false, reason: `Needs ${nextStage.bondRequired - creature.bondPoints} more bond` }
  }

  const daysSinceDiscovery = Math.floor(
    (Date.now() - new Date(creature.discoveredAt).getTime()) / (24 * 60 * 60 * 1000)
  )
  if (daysSinceDiscovery < nextStage.timeRequiredDays) {
    const daysLeft = nextStage.timeRequiredDays - daysSinceDiscovery
    return { canEvolve: false, reason: `${daysLeft} more day${daysLeft > 1 ? 's' : ''} needed` }
  }

  return { canEvolve: true }
}

/**
 * Evolve a creature to the next stage.
 */
export function evolveCreature(creature: Creature): Creature | null {
  const check = canEvolve(creature)
  if (!check.canEvolve) return null

  const currentIndex = STAGE_ORDER.indexOf(creature.stage)
  const nextStage = STAGE_ORDER[currentIndex + 1]

  return {
    ...creature,
    stage: nextStage,
  }
}

/**
 * Add care points to a creature (from daily interaction).
 */
export function careForCreature(creature: Creature): Creature {
  const now = new Date().toISOString()
  const today = now.slice(0, 10)
  const lastCareDay = creature.lastCaredAt?.slice(0, 10) ?? ''

  // Already cared for today
  if (lastCareDay === today) return creature

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const newStreak = lastCareDay === yesterday ? creature.careStreak + 1 : 1
  const careBonus = Math.min(newStreak, 7) // Max 7x streak bonus
  const bondBonus = Math.ceil(careBonus / 2)

  return {
    ...creature,
    carePoints: creature.carePoints + careBonus,
    bondPoints: creature.bondPoints + bondBonus,
    lastCaredAt: now,
    careStreak: newStreak,
    happiness: getHappiness(newStreak, creature.lastCaredAt),
  }
}

/**
 * Calculate happiness state based on care streak and last care time.
 */
export function getHappiness(
  careStreak: number,
  lastCaredAt: string | null,
): Creature['happiness'] {
  if (!lastCaredAt) return 'neutral'

  const hoursSince = (Date.now() - new Date(lastCaredAt).getTime()) / (60 * 60 * 1000)

  if (hoursSince > 72) return 'dormant'
  if (hoursSince > 48) return 'sad'
  if (careStreak >= 7) return 'ecstatic'
  if (careStreak >= 3) return 'happy'
  return 'neutral'
}

/**
 * Get the current stage icon for a creature.
 */
export function getCreatureIcon(creature: Creature): string {
  const definition = getCreatureDefinition(creature.definitionId)
  if (!definition) return '❓'

  const stageInfo = definition.stages.find((s) => s.stage === creature.stage)
  return stageInfo?.icon ?? '❓'
}

/**
 * Get evolution progress as a percentage toward the next stage.
 */
export function getEvolutionProgress(creature: Creature): {
  carePercent: number
  bondPercent: number
  timePercent: number
  overall: number
} {
  const definition = getCreatureDefinition(creature.definitionId)
  if (!definition || creature.stage === 'adult') {
    return { carePercent: 100, bondPercent: 100, timePercent: 100, overall: 100 }
  }

  const currentIndex = STAGE_ORDER.indexOf(creature.stage)
  const nextStage = definition.stages[currentIndex + 1]
  if (!nextStage) return { carePercent: 100, bondPercent: 100, timePercent: 100, overall: 100 }

  const carePercent = nextStage.careRequired > 0
    ? Math.min(100, Math.floor((creature.carePoints / nextStage.careRequired) * 100))
    : 100

  const bondPercent = nextStage.bondRequired > 0
    ? Math.min(100, Math.floor((creature.bondPoints / nextStage.bondRequired) * 100))
    : 100

  const daysSinceDiscovery = Math.floor(
    (Date.now() - new Date(creature.discoveredAt).getTime()) / (24 * 60 * 60 * 1000)
  )
  const timePercent = nextStage.timeRequiredDays > 0
    ? Math.min(100, Math.floor((daysSinceDiscovery / nextStage.timeRequiredDays) * 100))
    : 100

  const overall = Math.floor((carePercent + bondPercent + timePercent) / 3)

  return { carePercent, bondPercent, timePercent, overall }
}

const HAPPINESS_ICONS: Record<Creature['happiness'], string> = {
  ecstatic: '😍',
  happy: '😊',
  neutral: '😐',
  sad: '😢',
  dormant: '😴',
}

export function getHappinessIcon(happiness: Creature['happiness']): string {
  return HAPPINESS_ICONS[happiness]
}
