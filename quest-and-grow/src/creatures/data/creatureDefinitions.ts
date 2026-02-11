import type { CreatureDefinition, ThemeId } from '@core/types/index.ts'

// ============== HARRY POTTER (Ann) ==============

const harryPotterCreatures: CreatureDefinition[] = [
  {
    id: 'hp-pygmypuff', themeId: 'harry-potter', name: 'Pygmy Puff', rarity: 'common',
    description: 'A tiny, fluffy ball of magical cuteness.',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🟣', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '💜', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🧸', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'hp-niffler', themeId: 'harry-potter', name: 'Niffler', rarity: 'common',
    description: 'A mischievous treasure-hunter with a pouch full of shiny things.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐾', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🦡', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '💰', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'hp-owl', themeId: 'harry-potter', name: 'Owl', rarity: 'common',
    description: 'A wise and loyal messenger owl.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐣', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🦉', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦅', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'hp-cat', themeId: 'harry-potter', name: 'Magical Cat', rarity: 'uncommon',
    description: 'A clever cat with a hint of magical ability.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐱', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '😺', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🐈‍⬛', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'hp-bowtruckle', themeId: 'harry-potter', name: 'Bowtruckle', rarity: 'uncommon',
    description: 'A tiny tree guardian that bonds closely with its caretaker.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🌱', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🌿', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🌲', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'hp-hippogriff', themeId: 'harry-potter', name: 'Hippogriff', rarity: 'rare',
    description: 'A majestic half-horse, half-eagle creature. Requires respect to befriend.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐴', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🦅', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦄', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'hp-thestral', themeId: 'harry-potter', name: 'Thestral', rarity: 'rare',
    description: 'A mysterious winged horse, invisible to most. Deeply loyal once bonded.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🌑', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🖤', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦇', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'hp-phoenix', themeId: 'harry-potter', name: 'Phoenix', rarity: 'epic',
    description: 'The legendary firebird. Reborn from its own ashes.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🔥', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐦', careRequired: 12, bondRequired: 10, timeRequiredDays: 5 },
      { stage: 'juvenile', icon: '🔶', careRequired: 30, bondRequired: 20, timeRequiredDays: 10 },
      { stage: 'adult', icon: '🔥', careRequired: 60, bondRequired: 40, timeRequiredDays: 21 },
    ],
  },
]

// ============== JURASSIC PARK (Cat) ==============

const jurassicParkCreatures: CreatureDefinition[] = [
  {
    id: 'jp-compy', themeId: 'jurassic-park', name: 'Compy', rarity: 'common',
    description: 'A tiny, curious dinosaur that travels in packs.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦎', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🐊', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦖', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'jp-para', themeId: 'jurassic-park', name: 'Parasaurolophus', rarity: 'common',
    description: 'A gentle herbivore with a distinctive head crest.',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🟢', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🐉', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦕', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'jp-gallimimus', themeId: 'jurassic-park', name: 'Gallimimus', rarity: 'common',
    description: 'A fast-running dinosaur. Loves to race!',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐤', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🏃', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦩', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'jp-triceratops', themeId: 'jurassic-park', name: 'Triceratops', rarity: 'uncommon',
    description: 'A sturdy three-horned herbivore. Protective and loyal.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐂', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🦏', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🛡️', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'jp-stego', themeId: 'jurassic-park', name: 'Stegosaurus', rarity: 'uncommon',
    description: 'A gentle giant with impressive back plates.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🟤', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🐢', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🦕', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'jp-raptor', themeId: 'jurassic-park', name: 'Velociraptor', rarity: 'rare',
    description: 'Clever and fast. A dangerous but fascinating companion.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦎', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🐲', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦖', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'jp-pteranodon', themeId: 'jurassic-park', name: 'Pteranodon', rarity: 'rare',
    description: 'A magnificent flying reptile that soars above the park.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐦', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🦅', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦇', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'jp-trex', themeId: 'jurassic-park', name: 'T-Rex', rarity: 'epic',
    description: 'The king of the dinosaurs. The ultimate prize.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🔥', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦎', careRequired: 12, bondRequired: 10, timeRequiredDays: 5 },
      { stage: 'juvenile', icon: '🐊', careRequired: 30, bondRequired: 20, timeRequiredDays: 10 },
      { stage: 'adult', icon: '🦖', careRequired: 60, bondRequired: 40, timeRequiredDays: 21 },
    ],
  },
]

// ============== SONIC/MARIO (Reagan) ==============

const sonicMarioCreatures: CreatureDefinition[] = [
  {
    id: 'sm-chao', themeId: 'sonic-mario', name: 'Chao', rarity: 'common',
    description: 'A cute little creature that loves to play.',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '💙', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '😊', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '👼', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'sm-yoshi', themeId: 'sonic-mario', name: 'Yoshi', rarity: 'common',
    description: 'A friendly dinosaur companion. Ready to help!',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🟢', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🐉', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦖', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'sm-flicky', themeId: 'sonic-mario', name: 'Flicky', rarity: 'common',
    description: 'A cheerful little bird freed from a badnik.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐥', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🐦', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🕊️', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'sm-herochao', themeId: 'sonic-mario', name: 'Hero Chao', rarity: 'uncommon',
    description: 'A Chao that has evolved through good deeds.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '💛', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '⭐', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🌟', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'sm-coloryoshi', themeId: 'sonic-mario', name: 'Rainbow Yoshi', rarity: 'uncommon',
    description: 'A rare Yoshi that sparkles with all the colors.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🌈', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🎨', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🦕', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'sm-tailsbot', themeId: 'sonic-mario', name: 'Tails Bot', rarity: 'rare',
    description: 'A small robot built by Tails. Helpful and smart!',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🤖', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '⚙️', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦾', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'sm-luma', themeId: 'sonic-mario', name: 'Luma', rarity: 'rare',
    description: 'A star-child from the cosmos. Glows with celestial light.',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '✨', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '💫', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '⭐', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'sm-chaoschao', themeId: 'sonic-mario', name: 'Chaos Chao', rarity: 'epic',
    description: 'The ultimate Chao evolution. Immortal and all-powerful.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🔥', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🔮', careRequired: 12, bondRequired: 10, timeRequiredDays: 5 },
      { stage: 'juvenile', icon: '💎', careRequired: 30, bondRequired: 20, timeRequiredDays: 10 },
      { stage: 'adult', icon: '🌀', careRequired: 60, bondRequired: 40, timeRequiredDays: 21 },
    ],
  },
]

// ============== DISNEY PRINCESS (Lucy) ==============

const disneyPrincessCreatures: CreatureDefinition[] = [
  {
    id: 'dp-bluebirds', themeId: 'disney-princess', name: 'Bluebirds', rarity: 'common',
    description: 'Sweet singing birds that help with chores.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐦', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🐤', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🕊️', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'dp-mice', themeId: 'disney-princess', name: 'Mice Friends', rarity: 'common',
    description: 'Tiny helpers that can make anything!',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐭', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🐁', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🧵', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'dp-deer', themeId: 'disney-princess', name: 'Forest Deer', rarity: 'common',
    description: 'A gentle deer from the enchanted forest.',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦌', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🫎', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦌', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'dp-raccoon', themeId: 'disney-princess', name: 'Raccoon', rarity: 'uncommon',
    description: 'A playful and clever friend from the woods.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦝', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🐾', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🦝', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'dp-horse', themeId: 'disney-princess', name: 'Royal Horse', rarity: 'uncommon',
    description: 'A noble steed fit for royalty.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐴', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🏇', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🐎', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'dp-pascal', themeId: 'disney-princess', name: 'Pascal', rarity: 'rare',
    description: 'A color-changing chameleon. Your best friend!',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦎', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🟢', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🌈', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'dp-pegasus', themeId: 'disney-princess', name: 'Pegasus', rarity: 'rare',
    description: 'A magnificent winged horse from the clouds.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐴', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🦄', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦄', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'dp-mushu', themeId: 'disney-princess', name: 'Dragon Guardian', rarity: 'epic',
    description: 'A small but mighty dragon protector. Fiercely loyal!',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🔥', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦎', careRequired: 12, bondRequired: 10, timeRequiredDays: 5 },
      { stage: 'juvenile', icon: '🐲', careRequired: 30, bondRequired: 20, timeRequiredDays: 10 },
      { stage: 'adult', icon: '🐉', careRequired: 60, bondRequired: 40, timeRequiredDays: 21 },
    ],
  },
]

// ============== MARVEL ==============

const marvelCreatures: CreatureDefinition[] = [
  {
    id: 'mv-redwing', themeId: 'marvel', name: 'Baby Redwing', rarity: 'common',
    description: 'A tiny falcon friend that soars by your side.',
    category: 'body',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐦', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🦅', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦜', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'mv-jarvis', themeId: 'marvel', name: 'Mini J.A.R.V.I.S.', rarity: 'common',
    description: 'A helpful AI companion that loves to learn and assist.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🤖', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '🦾', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🦿', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'mv-dume', themeId: 'marvel', name: 'DUM-E', rarity: 'common',
    description: 'A lovable helper bot that tries its best around the workshop.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🔧', careRequired: 3, bondRequired: 2, timeRequiredDays: 1 },
      { stage: 'juvenile', icon: '⚙️', careRequired: 8, bondRequired: 5, timeRequiredDays: 3 },
      { stage: 'adult', icon: '🔩', careRequired: 15, bondRequired: 10, timeRequiredDays: 7 },
    ],
  },
  {
    id: 'mv-spiderbot', themeId: 'marvel', name: 'Spider-Bot', rarity: 'uncommon',
    description: 'A tiny web-shooting robot that bravely patrols the neighborhood.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🕷️', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🕸️', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🕷️', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'mv-rocketjr', themeId: 'marvel', name: 'Rocket Raccoon Jr', rarity: 'uncommon',
    description: 'A scrappy little raccoon with a big heart and bigger attitude.',
    category: 'bond',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🦝', careRequired: 5, bondRequired: 4, timeRequiredDays: 2 },
      { stage: 'juvenile', icon: '🦝', careRequired: 12, bondRequired: 8, timeRequiredDays: 5 },
      { stage: 'adult', icon: '🦝', careRequired: 25, bondRequired: 15, timeRequiredDays: 10 },
    ],
  },
  {
    id: 'mv-goose', themeId: 'marvel', name: 'Goose the Flerken', rarity: 'rare',
    description: 'Looks like an ordinary cat, but hides a terrifying alien secret.',
    category: 'knowledge',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐱', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '😼', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🐈', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'mv-cloak', themeId: 'marvel', name: 'Cloak of Levitation', rarity: 'rare',
    description: 'A sentient cloak that floats around tidying up and protecting its friends.',
    category: 'home',
    stages: [
      { stage: 'egg', icon: '🥚', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🧣', careRequired: 8, bondRequired: 6, timeRequiredDays: 3 },
      { stage: 'juvenile', icon: '🧥', careRequired: 20, bondRequired: 15, timeRequiredDays: 7 },
      { stage: 'adult', icon: '🦸', careRequired: 40, bondRequired: 25, timeRequiredDays: 14 },
    ],
  },
  {
    id: 'mv-phoenix', themeId: 'marvel', name: 'Baby Phoenix Force', rarity: 'epic',
    description: 'A fragment of the cosmic Phoenix Force. Burns with incredible power.',
    category: 'brave',
    stages: [
      { stage: 'egg', icon: '🔥', careRequired: 0, bondRequired: 0, timeRequiredDays: 0 },
      { stage: 'baby', icon: '🐦', careRequired: 12, bondRequired: 10, timeRequiredDays: 5 },
      { stage: 'juvenile', icon: '🔶', careRequired: 30, bondRequired: 20, timeRequiredDays: 10 },
      { stage: 'adult', icon: '🔥', careRequired: 60, bondRequired: 40, timeRequiredDays: 21 },
    ],
  },
]

// ============== REGISTRY ==============

const allCreatures: CreatureDefinition[] = [
  ...harryPotterCreatures,
  ...jurassicParkCreatures,
  ...sonicMarioCreatures,
  ...disneyPrincessCreatures,
  ...marvelCreatures,
]

export function getCreaturesForTheme(themeId: ThemeId): CreatureDefinition[] {
  return allCreatures.filter((c) => c.themeId === themeId)
}

export function getCreatureDefinition(id: string): CreatureDefinition | undefined {
  return allCreatures.find((c) => c.id === id)
}

export const creaturesByTheme: Record<ThemeId, CreatureDefinition[]> = {
  'harry-potter': harryPotterCreatures,
  'jurassic-park': jurassicParkCreatures,
  'sonic-mario': sonicMarioCreatures,
  'disney-princess': disneyPrincessCreatures,
  'marvel': marvelCreatures,
}

export const RARITY_COLORS: Record<string, string> = {
  common: '#9ca3af',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
}

export const RARITY_LABELS: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
}
