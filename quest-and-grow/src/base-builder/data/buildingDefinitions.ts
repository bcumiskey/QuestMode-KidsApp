import type { BuildingDefinition, ThemeId } from '@core/types/index.ts'

// ============== HARRY POTTER (Ann) ==============

const harryPotterBuildings: BuildingDefinition[] = [
  {
    id: 'hp-dormitory',
    themeId: 'harry-potter',
    name: 'Personal Dormitory',
    description: 'Your cozy room in the castle. Rest here to recover energy faster.',
    icon: '🛏️',
    slot: 1,
    unlockLevel: 1,
    type: 'core',
    levels: [
      { level: 1, cost: { primary: 5 }, buildTimeMinutes: 0, bonus: 'energy_regen', bonusValue: 1 },
      { level: 2, cost: { primary: 15, energy: 5 }, buildTimeMinutes: 30, bonus: 'energy_regen', bonusValue: 2 },
      { level: 3, cost: { primary: 30, secondary: 5 }, buildTimeMinutes: 60, bonus: 'energy_regen', bonusValue: 3 },
    ],
  },
  {
    id: 'hp-study',
    themeId: 'harry-potter',
    name: 'Study Nook',
    description: 'A quiet corner for reading and learning. Boosts Knowledge quest XP.',
    icon: '📖',
    slot: 2,
    unlockLevel: 2,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 10, knowledge: 3 }, buildTimeMinutes: 15, bonus: 'knowledge_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 25, knowledge: 8 }, buildTimeMinutes: 45, bonus: 'knowledge_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 90, bonus: 'knowledge_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'hp-owlpost',
    themeId: 'harry-potter',
    name: 'Owl Post',
    description: 'Send and receive magical messages. Boosts Bond quest rewards.',
    icon: '🦉',
    slot: 3,
    unlockLevel: 3,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 15, harmony: 5 }, buildTimeMinutes: 20, bonus: 'bond_resources', bonusValue: 1 },
      { level: 2, cost: { primary: 35, harmony: 10 }, buildTimeMinutes: 60, bonus: 'bond_resources', bonusValue: 2 },
      { level: 3, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 120, bonus: 'bond_resources', bonusValue: 3 },
    ],
  },
  {
    id: 'hp-potions',
    themeId: 'harry-potter',
    name: 'Potions Corner',
    description: 'Brew magical potions for bonus effects. Increases bonus roll chance.',
    icon: '⚗️',
    slot: 4,
    unlockLevel: 4,
    type: 'upgrade',
    levels: [
      { level: 1, cost: { primary: 20, courage: 5 }, buildTimeMinutes: 30, bonus: 'bonus_chance', bonusValue: 2 },
      { level: 2, cost: { primary: 45, courage: 10 }, buildTimeMinutes: 90, bonus: 'bonus_chance', bonusValue: 5 },
      { level: 3, cost: { primary: 80, rare: 1 }, buildTimeMinutes: 180, bonus: 'bonus_chance', bonusValue: 8 },
    ],
  },
  {
    id: 'hp-habitat',
    themeId: 'harry-potter',
    name: 'Creature Habitat',
    description: 'A magical sanctuary for your creatures. Increases creature attraction.',
    icon: '🪺',
    slot: 5,
    unlockLevel: 5,
    type: 'creature',
    levels: [
      { level: 1, cost: { primary: 25, harmony: 8 }, buildTimeMinutes: 45, bonus: 'creature_attract', bonusValue: 2 },
      { level: 2, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 120, bonus: 'creature_attract', bonusValue: 5 },
      { level: 3, cost: { primary: 90, rare: 2 }, buildTimeMinutes: 240, bonus: 'creature_attract', bonusValue: 8 },
    ],
  },
  {
    id: 'hp-quidditch',
    themeId: 'harry-potter',
    name: 'Quidditch Pitch',
    description: 'Practice flying and Quidditch! Boosts Body quest XP.',
    icon: '🧹',
    slot: 6,
    unlockLevel: 6,
    type: 'cosmetic',
    levels: [
      { level: 1, cost: { primary: 30, energy: 10 }, buildTimeMinutes: 60, bonus: 'body_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 180, bonus: 'body_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 100, rare: 3 }, buildTimeMinutes: 300, bonus: 'body_xp', bonusValue: 15 },
    ],
  },
]

// ============== JURASSIC PARK (Cat) ==============

const jurassicParkBuildings: BuildingDefinition[] = [
  {
    id: 'jp-basecamp',
    themeId: 'jurassic-park',
    name: 'Base Camp Tent',
    description: 'Your starting shelter in the wild. Rest and recover energy.',
    icon: '⛺',
    slot: 1,
    unlockLevel: 1,
    type: 'core',
    levels: [
      { level: 1, cost: { primary: 5 }, buildTimeMinutes: 0, bonus: 'energy_regen', bonusValue: 1 },
      { level: 2, cost: { primary: 15, energy: 5 }, buildTimeMinutes: 30, bonus: 'energy_regen', bonusValue: 2 },
      { level: 3, cost: { primary: 30, secondary: 5 }, buildTimeMinutes: 60, bonus: 'energy_regen', bonusValue: 3 },
    ],
  },
  {
    id: 'jp-research',
    themeId: 'jurassic-park',
    name: 'Research Station',
    description: 'Study dinosaur DNA and fossils. Boosts Knowledge quest XP.',
    icon: '🔬',
    slot: 2,
    unlockLevel: 2,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 10, knowledge: 3 }, buildTimeMinutes: 15, bonus: 'knowledge_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 25, knowledge: 8 }, buildTimeMinutes: 45, bonus: 'knowledge_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 90, bonus: 'knowledge_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'jp-herbivore',
    themeId: 'jurassic-park',
    name: 'Herbivore Paddock',
    description: 'A safe enclosure for gentle giants. Houses your peaceful creatures.',
    icon: '🌿',
    slot: 3,
    unlockLevel: 3,
    type: 'creature',
    levels: [
      { level: 1, cost: { primary: 15, harmony: 5 }, buildTimeMinutes: 20, bonus: 'creature_attract', bonusValue: 2 },
      { level: 2, cost: { primary: 35, harmony: 10 }, buildTimeMinutes: 60, bonus: 'creature_attract', bonusValue: 5 },
      { level: 3, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 120, bonus: 'creature_attract', bonusValue: 8 },
    ],
  },
  {
    id: 'jp-genetics',
    themeId: 'jurassic-park',
    name: 'Genetics Lab',
    description: 'Splice DNA for new discoveries. Increases bonus roll chance.',
    icon: '🧬',
    slot: 4,
    unlockLevel: 4,
    type: 'upgrade',
    levels: [
      { level: 1, cost: { primary: 20, courage: 5 }, buildTimeMinutes: 30, bonus: 'bonus_chance', bonusValue: 2 },
      { level: 2, cost: { primary: 45, courage: 10 }, buildTimeMinutes: 90, bonus: 'bonus_chance', bonusValue: 5 },
      { level: 3, cost: { primary: 80, rare: 1 }, buildTimeMinutes: 180, bonus: 'bonus_chance', bonusValue: 8 },
    ],
  },
  {
    id: 'jp-raptor',
    themeId: 'jurassic-park',
    name: 'Raptor Enclosure',
    description: 'For your more dangerous specimens. Boosts Brave quest XP.',
    icon: '🦖',
    slot: 5,
    unlockLevel: 5,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 25, courage: 8 }, buildTimeMinutes: 45, bonus: 'brave_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 120, bonus: 'brave_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 90, rare: 2 }, buildTimeMinutes: 240, bonus: 'brave_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'jp-visitor',
    themeId: 'jurassic-park',
    name: 'Visitor Center',
    description: 'Welcome guests to your park! Boosts all resource earnings.',
    icon: '🏛️',
    slot: 6,
    unlockLevel: 6,
    type: 'cosmetic',
    levels: [
      { level: 1, cost: { primary: 30, order: 10 }, buildTimeMinutes: 60, bonus: 'all_resources', bonusValue: 1 },
      { level: 2, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 180, bonus: 'all_resources', bonusValue: 2 },
      { level: 3, cost: { primary: 100, rare: 3 }, buildTimeMinutes: 300, bonus: 'all_resources', bonusValue: 3 },
    ],
  },
]

// ============== SONIC/MARIO (Reagan) ==============

const sonicMarioBuildings: BuildingDefinition[] = [
  {
    id: 'sm-startzone',
    themeId: 'sonic-mario',
    name: 'Starting Zone',
    description: 'Your home base! Rest here between adventures.',
    icon: '🏠',
    slot: 1,
    unlockLevel: 1,
    type: 'core',
    levels: [
      { level: 1, cost: { primary: 5 }, buildTimeMinutes: 0, bonus: 'energy_regen', bonusValue: 1 },
      { level: 2, cost: { primary: 15, energy: 5 }, buildTimeMinutes: 30, bonus: 'energy_regen', bonusValue: 2 },
      { level: 3, cost: { primary: 30, secondary: 5 }, buildTimeMinutes: 60, bonus: 'energy_regen', bonusValue: 3 },
    ],
  },
  {
    id: 'sm-itemshop',
    themeId: 'sonic-mario',
    name: 'Item Shop',
    description: 'Buy power-ups and goodies. Increases bonus roll chance.',
    icon: '🏪',
    slot: 2,
    unlockLevel: 2,
    type: 'upgrade',
    levels: [
      { level: 1, cost: { primary: 10, knowledge: 3 }, buildTimeMinutes: 15, bonus: 'bonus_chance', bonusValue: 2 },
      { level: 2, cost: { primary: 25, knowledge: 8 }, buildTimeMinutes: 45, bonus: 'bonus_chance', bonusValue: 5 },
      { level: 3, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 90, bonus: 'bonus_chance', bonusValue: 8 },
    ],
  },
  {
    id: 'sm-chaogarden',
    themeId: 'sonic-mario',
    name: 'Chao Garden',
    description: 'A peaceful place for your little friends. Increases creature attraction.',
    icon: '🌸',
    slot: 3,
    unlockLevel: 3,
    type: 'creature',
    levels: [
      { level: 1, cost: { primary: 15, harmony: 5 }, buildTimeMinutes: 20, bonus: 'creature_attract', bonusValue: 2 },
      { level: 2, cost: { primary: 35, harmony: 10 }, buildTimeMinutes: 60, bonus: 'creature_attract', bonusValue: 5 },
      { level: 3, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 120, bonus: 'creature_attract', bonusValue: 8 },
    ],
  },
  {
    id: 'sm-speedtrack',
    themeId: 'sonic-mario',
    name: 'Speed Track',
    description: 'Race and train for speed! Boosts Body quest XP.',
    icon: '🏎️',
    slot: 4,
    unlockLevel: 4,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 20, energy: 5 }, buildTimeMinutes: 30, bonus: 'body_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 45, energy: 10 }, buildTimeMinutes: 90, bonus: 'body_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 80, rare: 1 }, buildTimeMinutes: 180, bonus: 'body_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'sm-powerup',
    themeId: 'sonic-mario',
    name: 'Power-Up Factory',
    description: 'Craft power-ups and special items. Boosts all XP earnings.',
    icon: '⭐',
    slot: 5,
    unlockLevel: 5,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 25, courage: 8 }, buildTimeMinutes: 45, bonus: 'all_xp', bonusValue: 3 },
      { level: 2, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 120, bonus: 'all_xp', bonusValue: 5 },
      { level: 3, cost: { primary: 90, rare: 2 }, buildTimeMinutes: 240, bonus: 'all_xp', bonusValue: 8 },
    ],
  },
  {
    id: 'sm-casino',
    themeId: 'sonic-mario',
    name: 'Rainbow Road',
    description: 'The ultimate challenge track! Boosts Brave quest XP.',
    icon: '🌈',
    slot: 6,
    unlockLevel: 6,
    type: 'cosmetic',
    levels: [
      { level: 1, cost: { primary: 30, courage: 10 }, buildTimeMinutes: 60, bonus: 'brave_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 180, bonus: 'brave_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 100, rare: 3 }, buildTimeMinutes: 300, bonus: 'brave_xp', bonusValue: 15 },
    ],
  },
]

// ============== DISNEY PRINCESS (Lucy) ==============

const disneyPrincessBuildings: BuildingDefinition[] = [
  {
    id: 'dp-cottage',
    themeId: 'disney-princess',
    name: 'Cozy Cottage',
    description: 'Your sweet little home. Rest and feel better here.',
    icon: '🏡',
    slot: 1,
    unlockLevel: 1,
    type: 'core',
    levels: [
      { level: 1, cost: { primary: 5 }, buildTimeMinutes: 0, bonus: 'energy_regen', bonusValue: 1 },
      { level: 2, cost: { primary: 15, energy: 5 }, buildTimeMinutes: 30, bonus: 'energy_regen', bonusValue: 2 },
      { level: 3, cost: { primary: 30, secondary: 5 }, buildTimeMinutes: 60, bonus: 'energy_regen', bonusValue: 3 },
    ],
  },
  {
    id: 'dp-well',
    themeId: 'disney-princess',
    name: 'Wishing Well',
    description: 'Make a wish! Increases bonus roll chance.',
    icon: '💫',
    slot: 2,
    unlockLevel: 2,
    type: 'upgrade',
    levels: [
      { level: 1, cost: { primary: 10, harmony: 3 }, buildTimeMinutes: 15, bonus: 'bonus_chance', bonusValue: 2 },
      { level: 2, cost: { primary: 25, harmony: 8 }, buildTimeMinutes: 45, bonus: 'bonus_chance', bonusValue: 5 },
      { level: 3, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 90, bonus: 'bonus_chance', bonusValue: 8 },
    ],
  },
  {
    id: 'dp-animalgrove',
    themeId: 'disney-princess',
    name: 'Animal Grove',
    description: 'A magical forest where animals gather. Increases creature attraction.',
    icon: '🌳',
    slot: 3,
    unlockLevel: 3,
    type: 'creature',
    levels: [
      { level: 1, cost: { primary: 15, harmony: 5 }, buildTimeMinutes: 20, bonus: 'creature_attract', bonusValue: 2 },
      { level: 2, cost: { primary: 35, harmony: 10 }, buildTimeMinutes: 60, bonus: 'creature_attract', bonusValue: 5 },
      { level: 3, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 120, bonus: 'creature_attract', bonusValue: 8 },
    ],
  },
  {
    id: 'dp-library',
    themeId: 'disney-princess',
    name: 'Royal Library',
    description: 'So many books to read! Boosts Knowledge quest XP.',
    icon: '📚',
    slot: 4,
    unlockLevel: 4,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 20, knowledge: 5 }, buildTimeMinutes: 30, bonus: 'knowledge_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 45, knowledge: 10 }, buildTimeMinutes: 90, bonus: 'knowledge_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 80, rare: 1 }, buildTimeMinutes: 180, bonus: 'knowledge_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'dp-garden',
    themeId: 'disney-princess',
    name: 'Enchanted Garden',
    description: 'Flowers bloom with magic! Boosts Bond quest rewards.',
    icon: '🌺',
    slot: 5,
    unlockLevel: 5,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 25, harmony: 8 }, buildTimeMinutes: 45, bonus: 'bond_resources', bonusValue: 1 },
      { level: 2, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 120, bonus: 'bond_resources', bonusValue: 2 },
      { level: 3, cost: { primary: 90, rare: 2 }, buildTimeMinutes: 240, bonus: 'bond_resources', bonusValue: 3 },
    ],
  },
  {
    id: 'dp-castle',
    themeId: 'disney-princess',
    name: 'Castle Tower',
    description: 'The crown jewel of your kingdom! Boosts all XP.',
    icon: '🏰',
    slot: 6,
    unlockLevel: 6,
    type: 'cosmetic',
    levels: [
      { level: 1, cost: { primary: 30, order: 10 }, buildTimeMinutes: 60, bonus: 'all_xp', bonusValue: 3 },
      { level: 2, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 180, bonus: 'all_xp', bonusValue: 5 },
      { level: 3, cost: { primary: 100, rare: 3 }, buildTimeMinutes: 300, bonus: 'all_xp', bonusValue: 8 },
    ],
  },
]

// ============== MARVEL ==============

const marvelBuildings: BuildingDefinition[] = [
  {
    id: 'mv-hq',
    themeId: 'marvel',
    name: 'Hero Headquarters',
    description: 'Your hero base of operations. Rest and recharge between missions.',
    icon: '🏢',
    slot: 1,
    unlockLevel: 1,
    type: 'core',
    levels: [
      { level: 1, cost: { primary: 5 }, buildTimeMinutes: 0, bonus: 'energy_regen', bonusValue: 1 },
      { level: 2, cost: { primary: 15, energy: 5 }, buildTimeMinutes: 30, bonus: 'energy_regen', bonusValue: 2 },
      { level: 3, cost: { primary: 30, secondary: 5 }, buildTimeMinutes: 60, bonus: 'energy_regen', bonusValue: 3 },
    ],
  },
  {
    id: 'mv-simulator',
    themeId: 'marvel',
    name: 'Training Simulator',
    description: 'Practice your hero skills in virtual missions. Boosts Body quest XP.',
    icon: '🎯',
    slot: 2,
    unlockLevel: 2,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 10, energy: 3 }, buildTimeMinutes: 15, bonus: 'body_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 25, energy: 8 }, buildTimeMinutes: 45, bonus: 'body_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 90, bonus: 'body_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'mv-habitat',
    themeId: 'marvel',
    name: 'Creature Habitat',
    description: 'A high-tech sanctuary for your hero companions. Increases creature attraction.',
    icon: '🪺',
    slot: 3,
    unlockLevel: 3,
    type: 'creature',
    levels: [
      { level: 1, cost: { primary: 15, harmony: 5 }, buildTimeMinutes: 20, bonus: 'creature_attract', bonusValue: 2 },
      { level: 2, cost: { primary: 35, harmony: 10 }, buildTimeMinutes: 60, bonus: 'creature_attract', bonusValue: 5 },
      { level: 3, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 120, bonus: 'creature_attract', bonusValue: 8 },
    ],
  },
  {
    id: 'mv-techlab',
    themeId: 'marvel',
    name: 'Tech Lab',
    description: 'Invent gadgets and upgrade your gear. Increases bonus roll chance.',
    icon: '🔬',
    slot: 4,
    unlockLevel: 5,
    type: 'upgrade',
    levels: [
      { level: 1, cost: { primary: 20, knowledge: 5 }, buildTimeMinutes: 30, bonus: 'bonus_chance', bonusValue: 2 },
      { level: 2, cost: { primary: 45, knowledge: 10 }, buildTimeMinutes: 90, bonus: 'bonus_chance', bonusValue: 5 },
      { level: 3, cost: { primary: 80, rare: 1 }, buildTimeMinutes: 180, bonus: 'bonus_chance', bonusValue: 8 },
    ],
  },
  {
    id: 'mv-armory',
    themeId: 'marvel',
    name: 'Shield Armory',
    description: 'Store and craft hero equipment. Boosts Brave quest XP.',
    icon: '🛡️',
    slot: 5,
    unlockLevel: 7,
    type: 'production',
    levels: [
      { level: 1, cost: { primary: 25, courage: 8 }, buildTimeMinutes: 45, bonus: 'brave_xp', bonusValue: 5 },
      { level: 2, cost: { primary: 50, secondary: 10 }, buildTimeMinutes: 120, bonus: 'brave_xp', bonusValue: 10 },
      { level: 3, cost: { primary: 90, rare: 2 }, buildTimeMinutes: 240, bonus: 'brave_xp', bonusValue: 15 },
    ],
  },
  {
    id: 'mv-tower',
    themeId: 'marvel',
    name: 'Avengers Tower',
    description: 'The ultimate hero landmark! Boosts all XP earnings.',
    icon: '🗼',
    slot: 6,
    unlockLevel: 10,
    type: 'cosmetic',
    levels: [
      { level: 1, cost: { primary: 30, courage: 10 }, buildTimeMinutes: 60, bonus: 'all_xp', bonusValue: 3 },
      { level: 2, cost: { primary: 60, secondary: 15 }, buildTimeMinutes: 180, bonus: 'all_xp', bonusValue: 5 },
      { level: 3, cost: { primary: 100, rare: 3 }, buildTimeMinutes: 300, bonus: 'all_xp', bonusValue: 8 },
    ],
  },
]

// ============== REGISTRY ==============

const allBuildings: BuildingDefinition[] = [
  ...harryPotterBuildings,
  ...jurassicParkBuildings,
  ...sonicMarioBuildings,
  ...disneyPrincessBuildings,
  ...marvelBuildings,
]

export function getBuildingsForTheme(themeId: ThemeId): BuildingDefinition[] {
  return allBuildings.filter((b) => b.themeId === themeId)
}

export function getBuildingDefinition(id: string): BuildingDefinition | undefined {
  return allBuildings.find((b) => b.id === id)
}

export const buildingsByTheme: Record<ThemeId, BuildingDefinition[]> = {
  'harry-potter': harryPotterBuildings,
  'jurassic-park': jurassicParkBuildings,
  'sonic-mario': sonicMarioBuildings,
  'disney-princess': disneyPrincessBuildings,
  'marvel': marvelBuildings,
}
