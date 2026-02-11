import { format, subDays, isAfter, parse } from 'date-fns'

export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export function getYesterdayString(): string {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd')
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function xpForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100
}

export function xpForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100
}

export function xpProgress(xp: number): { current: number; needed: number; percent: number } {
  const level = calculateLevel(xp)
  const currentLevelXp = xpForLevel(level)
  const nextLevelXp = xpForNextLevel(level)
  const current = xp - currentLevelXp
  const needed = nextLevelXp - currentLevelXp
  return { current, needed, percent: needed > 0 ? (current / needed) * 100 : 0 }
}

export function isOverdue(
  timeWindow: 'morning' | 'evening' | 'anytime',
  morningDeadline: string,
  eveningDeadline: string,
): boolean {
  if (timeWindow === 'anytime') return false
  const now = new Date()
  const deadlineStr = timeWindow === 'morning' ? morningDeadline : eveningDeadline
  const deadline = parse(deadlineStr, 'HH:mm', now)
  return isAfter(now, deadline)
}

export function formatPoints(points: number): string {
  return points.toLocaleString()
}
