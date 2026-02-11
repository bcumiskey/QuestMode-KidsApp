import type { TrustLevel } from '@core/types/index.ts'

export interface TrustUpdate {
  newTrustLevel: TrustLevel
  newTrustWarnings: number
  promoted: boolean
  demoted: boolean
}

/**
 * Trust level promotion thresholds from the spec:
 * → Journeyman (2): 7 days honest, 80%+ completion, no dishonesty
 * → Trusted (3): +14 days, 2+ spot checks passed, parent confirms
 * → Master (4): +30 days, high-stakes handled, parent promotes (rare)
 *
 * For automatic promotion, we check streak and total quests completed.
 * Parent can manually promote/demote through the dashboard.
 */
export function checkAutoPromotion(
  currentLevel: TrustLevel,
  streak: number,
  totalQuestsCompleted: number,
  warnings: number,
): TrustUpdate {
  // Can't auto-promote with active warnings
  if (warnings > 0) {
    return {
      newTrustLevel: currentLevel,
      newTrustWarnings: warnings,
      promoted: false,
      demoted: false,
    }
  }

  let newLevel = currentLevel

  // Check promotion thresholds
  if (currentLevel === 1 && streak >= 7 && totalQuestsCompleted >= 30) {
    newLevel = 2
  } else if (currentLevel === 2 && streak >= 21 && totalQuestsCompleted >= 100) {
    newLevel = 3
  }
  // Level 4 (Master) is parent-only promotion

  return {
    newTrustLevel: newLevel,
    newTrustWarnings: warnings,
    promoted: newLevel > currentLevel,
    demoted: false,
  }
}

/**
 * Add a dishonesty warning. 2+ warnings demotes one level.
 */
export function addWarning(
  currentLevel: TrustLevel,
  currentWarnings: number,
): TrustUpdate {
  const newWarnings = currentWarnings + 1

  if (newWarnings >= 2 && currentLevel > 1) {
    return {
      newTrustLevel: (currentLevel - 1) as TrustLevel,
      newTrustWarnings: 0, // Reset warnings after demotion
      promoted: false,
      demoted: true,
    }
  }

  return {
    newTrustLevel: currentLevel,
    newTrustWarnings: newWarnings,
    promoted: false,
    demoted: false,
  }
}

/**
 * Get the auto-approve delay based on trust level.
 * Returns minutes, or null if no auto-approve.
 */
export function getAutoApproveDelay(trustLevel: TrustLevel): number | null {
  switch (trustLevel) {
    case 1: return null      // Apprentice: no auto-approve
    case 2: return null      // Journeyman: no auto-approve
    case 3: return 120       // Trusted: 2 hours
    case 4: return 30        // Master: 30 minutes
  }
}
