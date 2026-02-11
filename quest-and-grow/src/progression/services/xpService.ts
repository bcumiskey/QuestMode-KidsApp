import { calculateLevel } from '@core/services/dateUtils.ts'

export interface XpAwardResult {
  baseXp: number
  streakBonus: number
  rewardMultiplier: number
  totalXp: number
  newXp: number
  oldLevel: number
  newLevel: number
  leveledUp: boolean
}

/**
 * Calculate streak bonus multiplier.
 * +10% per 7-day streak, capped at 50%.
 */
export function getStreakBonusMultiplier(streak: number): number {
  const weeks = Math.floor(streak / 7)
  return Math.min(weeks * 0.1, 0.5)
}

/**
 * Award XP with streak bonus and optional reward multiplier.
 */
export function calculateXpAward(
  currentXp: number,
  baseXp: number,
  streak: number,
  rewardMultiplier: number = 1,
): XpAwardResult {
  const streakBonus = getStreakBonusMultiplier(streak)
  const totalXp = Math.round(baseXp * (1 + streakBonus) * rewardMultiplier)
  const newXp = currentXp + totalXp
  const oldLevel = calculateLevel(currentXp)
  const newLevel = calculateLevel(newXp)

  return {
    baseXp,
    streakBonus,
    rewardMultiplier,
    totalXp,
    newXp,
    oldLevel,
    newLevel,
    leveledUp: newLevel > oldLevel,
  }
}
