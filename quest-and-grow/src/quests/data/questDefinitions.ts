import type { QuestBase, QuestCategory } from '@core/types/index.ts'

type QuestMap = Record<QuestCategory, QuestBase[]>

const annQuests: QuestMap = {
  body: [
    { id: 'brush_am', name: 'Brush teeth (morning)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'shower', name: 'Shower / wash face', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🚿' },
    { id: 'dressed', name: 'Get dressed (no reminders!)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 1 }, icon: '👕' },
    { id: 'breakfast', name: 'Eat breakfast', category: 'body', difficulty: 1, baseXp: 5, baseResources: { energy: 2 }, icon: '🥣' },
    { id: 'brush_pm', name: 'Brush teeth (evening)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'bed_ontime', name: 'In bed on time', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🌙' },
  ],
  knowledge: [
    { id: 'homework', name: 'Homework complete', category: 'knowledge', difficulty: 2, baseXp: 25, baseResources: { knowledge: 5 }, icon: '📚' },
    { id: 'reading', name: '20 min reading', category: 'knowledge', difficulty: 2, baseXp: 20, baseResources: { knowledge: 4 }, icon: '📖' },
    { id: 'practice', name: 'French horn practice', category: 'knowledge', difficulty: 2, baseXp: 25, baseResources: { knowledge: 4 }, icon: '🎺' },
    { id: 'good_report', name: 'Good day report', category: 'knowledge', difficulty: 3, baseXp: 30, baseResources: { knowledge: 6 }, icon: '⭐' },
  ],
  home: [
    { id: 'bed_made', name: 'Make bed', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🛏️' },
    { id: 'room_clean', name: 'Room clean & organized', category: 'home', difficulty: 2, baseXp: 20, baseResources: { order: 4 }, icon: '✨' },
    { id: 'dishes', name: 'Help with dishes', category: 'home', difficulty: 1, baseXp: 15, baseResources: { order: 3 }, icon: '🍽️' },
    { id: 'laundry', name: 'Put away laundry', category: 'home', difficulty: 1, baseXp: 15, baseResources: { order: 3 }, icon: '🧺' },
    { id: 'pet_care', name: 'Pet care duties', category: 'home', difficulty: 1, baseXp: 15, baseResources: { order: 2 }, icon: '🐾' },
    { id: 'clothes_out', name: 'Clothes out for tomorrow', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '👗' },
    { id: 'backpack', name: 'Backpack packed', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🎒' },
  ],
  brave: [
    { id: 'extra_chore', name: 'Extra chore (unasked!)', category: 'brave', difficulty: 3, baseXp: 35, baseResources: { courage: 5 }, icon: '🌟' },
    { id: 'exercise', name: '30 min physical activity', category: 'brave', difficulty: 2, baseXp: 20, baseResources: { courage: 3 }, icon: '🏃‍♀️' },
    { id: 'ready_ontime', name: 'Ready on time', category: 'brave', difficulty: 2, baseXp: 20, baseResources: { courage: 3 }, icon: '⏰' },
  ],
  bond: [
    { id: 'help_sister', name: 'Help Cat with something', category: 'bond', difficulty: 2, baseXp: 20, baseResources: { harmony: 4 }, icon: '💕' },
    { id: 'kind_act', name: 'Random act of kindness', category: 'bond', difficulty: 2, baseXp: 25, baseResources: { harmony: 5 }, icon: '💝' },
    { id: 'no_screens', name: 'Screen-free bonus hour', category: 'bond', difficulty: 2, baseXp: 20, baseResources: { harmony: 3 }, icon: '📵' },
  ],
}

const catQuests: QuestMap = {
  body: [
    { id: 'brush_am', name: 'Brush teeth (morning)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'wash_face', name: 'Wash face', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '💧' },
    { id: 'dressed', name: 'Get dressed (no reminders!)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 1 }, icon: '👕' },
    { id: 'breakfast', name: 'Eat breakfast', category: 'body', difficulty: 1, baseXp: 5, baseResources: { energy: 2 }, icon: '🥣' },
    { id: 'brush_pm', name: 'Brush teeth (evening)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'bath', name: 'Bath or shower', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🛁' },
    { id: 'bed_ontime', name: 'In bed on time', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🌙' },
  ],
  knowledge: [
    { id: 'homework', name: 'Homework complete', category: 'knowledge', difficulty: 2, baseXp: 25, baseResources: { knowledge: 5 }, icon: '📚' },
    { id: 'reading', name: '15 min reading', category: 'knowledge', difficulty: 2, baseXp: 20, baseResources: { knowledge: 4 }, icon: '📖' },
    { id: 'practice', name: 'Practice / learning activity', category: 'knowledge', difficulty: 2, baseXp: 20, baseResources: { knowledge: 4 }, icon: '🎨' },
    { id: 'good_report', name: 'Good day report', category: 'knowledge', difficulty: 3, baseXp: 30, baseResources: { knowledge: 6 }, icon: '⭐' },
  ],
  home: [
    { id: 'bed_made', name: 'Make bed', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🛏️' },
    { id: 'room_clean', name: 'Room clean & organized', category: 'home', difficulty: 2, baseXp: 20, baseResources: { order: 4 }, icon: '✨' },
    { id: 'dishes', name: 'Help clear table', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🍽️' },
    { id: 'toys_away', name: 'Put toys/stuff away', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🧸' },
    { id: 'pet_care', name: 'Help with pet care', category: 'home', difficulty: 1, baseXp: 15, baseResources: { order: 3 }, icon: '🐾' },
    { id: 'clothes_out', name: 'Clothes out for tomorrow', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '👗' },
    { id: 'backpack', name: 'Backpack packed', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🎒' },
  ],
  brave: [
    { id: 'extra_chore', name: 'Extra chore (unasked!)', category: 'brave', difficulty: 3, baseXp: 30, baseResources: { courage: 5 }, icon: '🌟' },
    { id: 'exercise', name: '30 min physical activity', category: 'brave', difficulty: 2, baseXp: 15, baseResources: { courage: 3 }, icon: '🏃‍♀️' },
    { id: 'ready_ontime', name: 'Ready on time', category: 'brave', difficulty: 2, baseXp: 20, baseResources: { courage: 3 }, icon: '⏰' },
  ],
  bond: [
    { id: 'help_family', name: 'Help someone in family', category: 'bond', difficulty: 2, baseXp: 15, baseResources: { harmony: 3 }, icon: '💕' },
    { id: 'kind_act', name: 'Random act of kindness', category: 'bond', difficulty: 2, baseXp: 25, baseResources: { harmony: 5 }, icon: '💝' },
    { id: 'no_screens', name: 'Screen-free bonus hour', category: 'bond', difficulty: 2, baseXp: 15, baseResources: { harmony: 3 }, icon: '📵' },
  ],
}

const reaganQuests: QuestMap = {
  body: [
    { id: 'brush_am', name: 'Brush teeth', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'wash_face', name: 'Wash face', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '💧' },
    { id: 'dressed', name: 'Get dressed', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 1 }, icon: '👕' },
    { id: 'breakfast', name: 'Eat breakfast', category: 'body', difficulty: 1, baseXp: 5, baseResources: { energy: 2 }, icon: '🥣' },
    { id: 'brush_pm', name: 'Brush teeth (night)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'bed_ontime', name: 'In bed on time', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🌙' },
  ],
  knowledge: [
    { id: 'homework', name: 'Homework done', category: 'knowledge', difficulty: 2, baseXp: 25, baseResources: { knowledge: 5 }, icon: '📚' },
    { id: 'reading', name: '15 min reading', category: 'knowledge', difficulty: 2, baseXp: 20, baseResources: { knowledge: 4 }, icon: '📖' },
  ],
  home: [
    { id: 'bed_made', name: 'Make bed', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🛏️' },
    { id: 'toys_away', name: 'Pick up toys', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🧸' },
    { id: 'dishes', name: 'Help clear table', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🍽️' },
  ],
  brave: [
    { id: 'try_new', name: 'Try something new', category: 'brave', difficulty: 2, baseXp: 25, baseResources: { courage: 4 }, icon: '🌟' },
    { id: 'exercise', name: 'Be active for 20 min', category: 'brave', difficulty: 1, baseXp: 15, baseResources: { courage: 3 }, icon: '🏃' },
  ],
  bond: [
    { id: 'help_family', name: 'Help someone', category: 'bond', difficulty: 1, baseXp: 15, baseResources: { harmony: 3 }, icon: '💕' },
    { id: 'kind_act', name: 'Be kind to someone', category: 'bond', difficulty: 1, baseXp: 20, baseResources: { harmony: 4 }, icon: '💝' },
  ],
}

const lucyQuests: QuestMap = {
  body: [
    { id: 'brush_am', name: 'Brush teeth', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'wash_face', name: 'Wash face', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '💧' },
    { id: 'dressed', name: 'Get dressed', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 1 }, icon: '👗' },
    { id: 'breakfast', name: 'Eat breakfast', category: 'body', difficulty: 1, baseXp: 5, baseResources: { energy: 2 }, icon: '🥣' },
    { id: 'brush_pm', name: 'Brush teeth (night)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'bed_ontime', name: 'In bed on time', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🌙' },
  ],
  knowledge: [
    { id: 'reading', name: '10 min reading', category: 'knowledge', difficulty: 1, baseXp: 20, baseResources: { knowledge: 4 }, icon: '📖' },
    { id: 'learning', name: 'Learning activity', category: 'knowledge', difficulty: 1, baseXp: 15, baseResources: { knowledge: 3 }, icon: '🎨' },
  ],
  home: [
    { id: 'bed_made', name: 'Make bed', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🛏️' },
    { id: 'toys_away', name: 'Put toys away', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🧸' },
  ],
  brave: [
    { id: 'try_new', name: 'Try something new', category: 'brave', difficulty: 1, baseXp: 20, baseResources: { courage: 4 }, icon: '🌟' },
  ],
  bond: [
    { id: 'help_family', name: 'Help someone', category: 'bond', difficulty: 1, baseXp: 15, baseResources: { harmony: 3 }, icon: '💕' },
    { id: 'kind_act', name: 'Be kind', category: 'bond', difficulty: 1, baseXp: 15, baseResources: { harmony: 3 }, icon: '💝' },
  ],
}

// Barrett's quests — age 4, Marvel theme. Very simple, minimal reading.
const barrettQuests: QuestMap = {
  body: [
    { id: 'brush_am', name: 'Brush teeth', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷', description: 'Heroes need strong teeth!' },
    { id: 'wash_hands', name: 'Wash hands', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🧼', description: 'Super clean hands!' },
    { id: 'dressed', name: 'Get dressed', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 1 }, icon: '👕', description: 'Put on your hero suit!' },
    { id: 'breakfast', name: 'Eat breakfast', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🥣', description: 'Hero fuel!' },
    { id: 'brush_pm', name: 'Brush teeth (night)', category: 'body', difficulty: 1, baseXp: 10, baseResources: { energy: 2 }, icon: '🦷' },
    { id: 'bed_ontime', name: 'Go to bed', category: 'body', difficulty: 1, baseXp: 15, baseResources: { energy: 3 }, icon: '🌙', description: 'Heroes rest up!' },
  ],
  knowledge: [
    { id: 'reading', name: 'Story time', category: 'knowledge', difficulty: 1, baseXp: 15, baseResources: { knowledge: 3 }, icon: '📖', description: 'Read with mom or dad!' },
    { id: 'learning', name: 'Learning game', category: 'knowledge', difficulty: 1, baseXp: 15, baseResources: { knowledge: 3 }, icon: '🧩', description: 'Play and learn!' },
  ],
  home: [
    { id: 'toys_away', name: 'Pick up toys', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🧸', description: 'Clean up time!' },
    { id: 'help_clean', name: 'Help clean up', category: 'home', difficulty: 1, baseXp: 10, baseResources: { order: 2 }, icon: '🧹', description: 'Be a cleanup hero!' },
  ],
  brave: [
    { id: 'try_new', name: 'Try something new', category: 'brave', difficulty: 1, baseXp: 20, baseResources: { courage: 4 }, icon: '💪', description: 'Be brave like Captain America!' },
  ],
  bond: [
    { id: 'help_family', name: 'Help someone', category: 'bond', difficulty: 1, baseXp: 15, baseResources: { harmony: 3 }, icon: '💕', description: 'Heroes help others!' },
    { id: 'nice_words', name: 'Say something nice', category: 'bond', difficulty: 1, baseXp: 10, baseResources: { harmony: 2 }, icon: '💝', description: 'Use kind words!' },
  ],
}

export const questDataByMember: Record<string, QuestMap> = {
  ann: annQuests,
  cat: catQuests,
  reagan: reaganQuests,
  lucy: lucyQuests,
  barrett: barrettQuests,
}
