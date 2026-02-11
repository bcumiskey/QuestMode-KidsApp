import type { QuestCategory, CreatureRarity } from '@core/types/index.ts'

export interface AttractionResult {
  attracted: boolean
  rarity: CreatureRarity | null
}

/**
 * Roll for creature attraction on quest completion.
 * Attraction chances from the spec:
 * - Common: 15% per quest
 * - Uncommon: 5% per quest
 * - Rare: 1% per quest
 * - Epic: 5% from Brave quests only
 *
 * Only one creature can be attracted per quest completion.
 * Higher rarities are checked first.
 */
export function rollCreatureAttraction(
  category: QuestCategory,
): AttractionResult {
  const roll = Math.random() * 100

  // Epic: only from brave quests, 5% chance
  if (category === 'brave' && roll < 5) {
    return { attracted: true, rarity: 'epic' }
  }

  // Rare: 1% chance
  if (roll < 1) {
    return { attracted: true, rarity: 'rare' }
  }

  // Uncommon: 5% chance
  if (roll < 5) {
    return { attracted: true, rarity: 'uncommon' }
  }

  // Common: 15% chance
  if (roll < 15) {
    return { attracted: true, rarity: 'common' }
  }

  return { attracted: false, rarity: null }
}
