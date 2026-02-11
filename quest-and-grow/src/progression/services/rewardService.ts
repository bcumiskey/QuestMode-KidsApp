import type { BonusResult, BonusTier } from '@core/types/index.ts'

/**
 * Variable reward roll table from the spec:
 * Roll 1-50:   No bonus (50%)
 * Roll 51-75:  +10-25% XP (25%)
 * Roll 76-90:  +25-50% XP + item (15%)
 * Roll 91-98:  +50-100% XP + rare (8%)
 * Roll 99-100: JACKPOT 2x + ultra-rare (2%)
 */
export function rollBonus(): BonusResult {
  const roll = Math.floor(Math.random() * 100) + 1 // 1-100

  if (roll <= 50) {
    return { roll, tier: 'none', xpMultiplier: 1, itemAwarded: null }
  }

  if (roll <= 75) {
    const multiplier = 1 + (0.1 + Math.random() * 0.15) // 1.10 - 1.25
    return { roll, tier: 'small', xpMultiplier: Math.round(multiplier * 100) / 100, itemAwarded: null }
  }

  if (roll <= 90) {
    const multiplier = 1 + (0.25 + Math.random() * 0.25) // 1.25 - 1.50
    return { roll, tier: 'medium', xpMultiplier: Math.round(multiplier * 100) / 100, itemAwarded: 'resource_bundle' }
  }

  if (roll <= 98) {
    const multiplier = 1 + (0.5 + Math.random() * 0.5) // 1.50 - 2.00
    return { roll, tier: 'large', xpMultiplier: Math.round(multiplier * 100) / 100, itemAwarded: 'rare_item' }
  }

  // Jackpot! (99-100)
  return { roll, tier: 'jackpot', xpMultiplier: 2, itemAwarded: 'ultra_rare' }
}

export const TIER_LABELS: Record<BonusTier, string> = {
  none: '',
  small: 'Bonus!',
  medium: 'Great Find!',
  large: 'Rare Discovery!',
  jackpot: 'JACKPOT!',
}

export const TIER_COLORS: Record<BonusTier, string> = {
  none: '',
  small: '#3b82f6',
  medium: '#a855f7',
  large: '#f59e0b',
  jackpot: '#ef4444',
}

export const TIER_EMOJIS: Record<BonusTier, string> = {
  none: '',
  small: '✨',
  medium: '💎',
  large: '🌟',
  jackpot: '🎰',
}
