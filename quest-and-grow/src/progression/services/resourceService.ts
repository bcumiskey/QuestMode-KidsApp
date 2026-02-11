import type { Resources, QuestCategory } from '@core/types/index.ts'

/**
 * Merge partial resource earnings into existing resources.
 */
export function addResources(
  current: Resources,
  earned: Partial<Resources>,
): Resources {
  return {
    energy: current.energy + (earned.energy ?? 0),
    knowledge: current.knowledge + (earned.knowledge ?? 0),
    harmony: current.harmony + (earned.harmony ?? 0),
    courage: current.courage + (earned.courage ?? 0),
    order: current.order + (earned.order ?? 0),
    primary: current.primary + (earned.primary ?? 0),
    secondary: current.secondary + (earned.secondary ?? 0),
    rare: current.rare + (earned.rare ?? 0),
  }
}

/**
 * Check if resources can cover a cost.
 */
export function canAfford(current: Resources, cost: Partial<Resources>): boolean {
  for (const [key, value] of Object.entries(cost)) {
    if ((value ?? 0) > (current[key as keyof Resources] ?? 0)) return false
  }
  return true
}

/**
 * Deduct resources for a purchase. Returns null if insufficient.
 */
export function spendResources(
  current: Resources,
  cost: Partial<Resources>,
): Resources | null {
  if (!canAfford(current, cost)) return null

  return {
    energy: current.energy - (cost.energy ?? 0),
    knowledge: current.knowledge - (cost.knowledge ?? 0),
    harmony: current.harmony - (cost.harmony ?? 0),
    courage: current.courage - (cost.courage ?? 0),
    order: current.order - (cost.order ?? 0),
    primary: current.primary - (cost.primary ?? 0),
    secondary: current.secondary - (cost.secondary ?? 0),
    rare: current.rare - (cost.rare ?? 0),
  }
}

/**
 * Calculate theme-specific currency bonus from quest category.
 * Body/Knowledge/Home quests give 1-2 primary currency.
 * Brave quests give 1 secondary currency.
 * Bond quests give a small chance at rare currency.
 */
export function getThemeCurrencyBonus(category: QuestCategory, difficulty: number): Partial<Resources> {
  const bonus: Partial<Resources> = {}

  switch (category) {
    case 'body':
    case 'knowledge':
    case 'home':
      bonus.primary = Math.ceil(difficulty * 1.5)
      break
    case 'brave':
      bonus.primary = difficulty
      bonus.secondary = Math.ceil(difficulty * 0.5)
      break
    case 'bond':
      bonus.secondary = difficulty
      // 20% chance of rare currency
      if (Math.random() < 0.2) {
        bonus.rare = 1
      }
      break
  }

  return bonus
}
