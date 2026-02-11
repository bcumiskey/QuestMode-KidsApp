import { dbGet, dbSet } from '@core/firebase/database.ts'
import {
  FAMILY_ID,
  EMPTY_RESOURCES,
  type FamilyInfo,
  type Member,
  type MemberStats,
  type FamilySettings,
  type RewardDefinition,
} from '@core/types/index.ts'

const basePath = `families/${FAMILY_ID}`

const defaultStats: MemberStats = {
  xp: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  trustLevel: 1,
  trustWarnings: 0,
  resources: { ...EMPTY_RESOURCES },
  totalQuestsCompleted: 0,
}

const defaultRewards: RewardDefinition[] = [
  { id: 'r1', name: '$1 Greenlight bonus', icon: '💵', points: 500, active: true },
  { id: 'r2', name: '30 min extra screen time', icon: '📱', points: 1000, active: true },
  { id: 'r3', name: '$2 Greenlight bonus', icon: '💰', points: 1500, active: true },
  { id: 'r4', name: 'Pick dinner one night', icon: '🍕', points: 2000, active: true },
  { id: 'r5', name: '$5 Greenlight bonus', icon: '💸', points: 3000, active: true },
  { id: 'r6', name: 'Special outing with parent', icon: '🎉', points: 5000, active: true },
  { id: 'r7', name: '$10 Greenlight bonus', icon: '🤑', points: 7500, active: true },
  { id: 'r8', name: 'MEGA reward - your choice!', icon: '🏆', points: 10000, active: true },
]

const defaultSettings: FamilySettings = {
  morningDeadline: '07:30',
  eveningDeadline: '20:30',
  autoApproveDefault: true,
  hardDayActive: false,
  hardDayExpires: null,
  hardDayChildren: [],
  notificationLevel: 'all',
  rewards: defaultRewards,
}

const childMembers: Member[] = [
  {
    id: 'ann',
    name: 'Ann',
    role: 'child',
    pin: '1111',
    theme: 'harry-potter',
    complexity: 'standard',
    avatar: '⭐',
    age: 11,
    stats: { ...defaultStats },
    onboardingComplete: false,
  },
  {
    id: 'cat',
    name: 'Cat',
    role: 'child',
    pin: '2222',
    theme: 'jurassic-park',
    complexity: 'standard',
    avatar: '💖',
    age: 9,
    stats: { ...defaultStats },
    onboardingComplete: false,
  },
  {
    id: 'reagan',
    name: 'Reagan',
    role: 'child',
    pin: '3333',
    theme: 'sonic-mario',
    complexity: 'simple',
    avatar: '⚡',
    age: 8,
    stats: { ...defaultStats },
    onboardingComplete: false,
  },
  {
    id: 'lucy',
    name: 'Lucy',
    role: 'child',
    pin: '4444',
    theme: 'disney-princess',
    complexity: 'simple',
    avatar: '👑',
    age: 5,
    stats: { ...defaultStats },
    onboardingComplete: false,
  },
  {
    id: 'barrett',
    name: 'Barrett',
    role: 'child',
    pin: '5555',
    theme: 'marvel',
    complexity: 'simple',
    avatar: '🦸',
    age: 4,
    stats: { ...defaultStats },
    onboardingComplete: false,
  },
]

const parentMember: Member = {
  id: 'parent',
  name: 'Parent',
  role: 'parent',
  pin: '1234',
  theme: 'harry-potter',
  complexity: 'standard',
  avatar: '🛡️',
  stats: { ...defaultStats },
}

export async function seedFamilyData(): Promise<boolean> {
  try {
    // Check if family already exists
    const existing = await dbGet<FamilyInfo>(`${basePath}/info`)
    if (existing) {
      // Check if Barrett needs to be added
      const existingMembers = await dbGet<Record<string, Member>>(`${basePath}/members`)
      if (existingMembers && !existingMembers['barrett']) {
        const barrett = childMembers.find((c) => c.id === 'barrett')!
        await dbSet(`${basePath}/members/barrett`, barrett)
        console.log('[Seed] Added Barrett to existing family')
      }
      // Ensure all members have age field
      if (existingMembers) {
        for (const child of childMembers) {
          if (existingMembers[child.id] && !existingMembers[child.id].age) {
            await dbSet(`${basePath}/members/${child.id}/age`, child.age)
          }
        }
      }
      return false // Already seeded
    }

    // Create family info
    const familyInfo: FamilyInfo = {
      name: 'Cumiskey Family',
      createdAt: new Date().toISOString(),
      settings: defaultSettings,
    }
    await dbSet(`${basePath}/info`, familyInfo)

    // Create members
    const members: Record<string, Member> = {}
    for (const child of childMembers) {
      members[child.id] = child
    }
    members[parentMember.id] = parentMember
    await dbSet(`${basePath}/members`, members)

    console.log('[Seed] Family data seeded successfully with 5 children')
    return true
  } catch (error) {
    console.error('[Seed] Failed to seed family data:', error)
    return false
  }
}
