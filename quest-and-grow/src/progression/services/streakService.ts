import { getTodayString, getYesterdayString } from '@core/services/dateUtils.ts'

export interface StreakResult {
  newStreak: number
  newLongestStreak: number
  lastCompletedDate: string
}

/**
 * Update streak based on last completed date.
 * If completed yesterday or never before, increment streak.
 * If already completed today, no change.
 * Otherwise, reset streak to 1.
 */
export function updateStreak(
  currentStreak: number,
  longestStreak: number,
  lastCompletedDate: string | null,
  hardDayActive: boolean = false,
): StreakResult {
  const today = getTodayString()
  const yesterday = getYesterdayString()

  // Already completed today — no change
  if (lastCompletedDate === today) {
    return {
      newStreak: currentStreak,
      newLongestStreak: longestStreak,
      lastCompletedDate: today,
    }
  }

  let newStreak: number

  if (lastCompletedDate === yesterday || lastCompletedDate === null) {
    // Consecutive day or first ever — increment
    newStreak = currentStreak + 1
  } else if (hardDayActive) {
    // Hard day mode protects the streak
    newStreak = currentStreak + 1
  } else {
    // Streak broken — reset to 1
    newStreak = 1
  }

  const newLongestStreak = Math.max(longestStreak, newStreak)

  return {
    newStreak,
    newLongestStreak,
    lastCompletedDate: today,
  }
}
