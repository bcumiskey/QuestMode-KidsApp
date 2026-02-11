// ============== ENUMS & CONSTANTS ==============

export type MemberRole = 'child' | 'parent'
export type Complexity = 'standard' | 'simple'
export type ThemeId = 'harry-potter' | 'jurassic-park' | 'sonic-mario' | 'disney-princess' | 'marvel'
export type QuestCategory = 'knowledge' | 'body' | 'home' | 'brave' | 'bond'
export type QuestDifficulty = 1 | 2 | 3 | 4
export type QuestScheduleType = 'daily' | 'specific_days' | 'weekly' | 'one_time'
export type ApprovalMode = 'always' | 'timer' | 'self'
export type QuestLogStatus = 'pending' | 'approved' | 'rejected' | 'completed'
export type BuildingStatus = 'empty' | 'constructing' | 'built' | 'upgrading'
export type EvolutionStage = 'egg' | 'baby' | 'juvenile' | 'adult'
export type CreatureRarity = 'common' | 'uncommon' | 'rare' | 'epic'
export type HappinessState = 'ecstatic' | 'happy' | 'neutral' | 'sad' | 'dormant'
export type NotificationType = 'reminder' | 'approval_request' | 'milestone' | 'creature' | 'building' | 'system'
export type BonusTier = 'none' | 'small' | 'medium' | 'large' | 'jackpot'
export type TrustLevel = 1 | 2 | 3 | 4
export type AgeTier = 'little' | 'middle' | 'older'

export const TRUST_NAMES: Record<TrustLevel, string> = {
  1: 'Apprentice',
  2: 'Journeyman',
  3: 'Trusted',
  4: 'Master',
}

export const FAMILY_ID = 'cumiskey'

export function getAgeTier(age: number): AgeTier {
  if (age <= 6) return 'little'
  if (age <= 9) return 'middle'
  return 'older'
}

// ============== MEMBER ==============

export interface MemberStats {
  xp: number
  level: number
  streak: number
  longestStreak: number
  lastCompletedDate: string | null
  trustLevel: TrustLevel
  trustWarnings: number
  resources: Resources
  totalQuestsCompleted: number
}

export interface Member {
  id: string
  name: string
  role: MemberRole
  pin: string
  theme: ThemeId
  complexity: Complexity
  avatar: string
  age?: number
  stats: MemberStats
  onboardingComplete?: boolean
  onboardingStep?: number
  loginStreak?: number
  lastLoginDate?: string
  lastLoginRewardDay?: number
  mysteryBoxProgress?: number
}

// ============== RESOURCES ==============

export interface Resources {
  // Universal
  energy: number
  knowledge: number
  harmony: number
  courage: number
  order: number
  // Theme-specific
  primary: number
  secondary: number
  rare: number
}

export const EMPTY_RESOURCES: Resources = {
  energy: 0,
  knowledge: 0,
  harmony: 0,
  courage: 0,
  order: 0,
  primary: 0,
  secondary: 0,
  rare: 0,
}

// ============== FAMILY ==============

export interface FamilySettings {
  morningDeadline: string
  eveningDeadline: string
  autoApproveDefault: boolean
  hardDayActive: boolean
  hardDayExpires: string | null
  hardDayChildren: string[]
  notificationLevel: 'all' | 'important' | 'none'
  rewards: RewardDefinition[]
}

export interface FamilyInfo {
  name: string
  createdAt: string
  settings: FamilySettings
}

export interface RewardDefinition {
  id: string
  name: string
  icon: string
  points: number
  active: boolean
}

// ============== QUESTS ==============

export interface QuestBase {
  id: string
  name: string
  category: QuestCategory
  difficulty: QuestDifficulty
  baseXp: number
  baseResources: Partial<Resources>
  icon: string
  description?: string
  checklist?: string[]
  estimatedMinutes?: number
}

export interface QuestSchedule {
  type: QuestScheduleType
  timeWindow: 'morning' | 'evening' | 'anytime'
  deadline?: string // HH:mm
  specificDays?: number[] // 0=Sun, 1=Mon, ...
}

export interface ApprovalConfig {
  mode: ApprovalMode
  timerMinutes: number
  requireProof: boolean
  proofType?: 'photo' | 'text'
}

export interface Quest {
  id: string
  base: QuestBase
  schedule: QuestSchedule
  assignedTo: string[] // member IDs
  approval: ApprovalConfig
}

export interface QuestLog {
  id: string
  questId: string
  memberId: string
  date: string
  status: QuestLogStatus
  completedAt: string | null
  approvedAt: string | null
  xpEarned: number
  resourcesEarned: Partial<Resources>
  bonusRoll: BonusResult | null
  proof?: string
}

// ============== PROGRESSION ==============

export interface BonusResult {
  roll: number // 1-100
  tier: BonusTier
  xpMultiplier: number
  itemAwarded: string | null
  display?: string
  prize?: string
}

export interface LevelThreshold {
  level: number
  xpRequired: number
}

// ============== DAILY LOGIN REWARDS ==============

export interface DailyLoginReward {
  day: number // 1-7
  currency: number
  bonusItem?: string
  guaranteed?: string
}

export const DAILY_LOGIN_REWARDS: DailyLoginReward[] = [
  { day: 1, currency: 10 },
  { day: 2, currency: 15 },
  { day: 3, currency: 25 },
  { day: 4, currency: 40, bonusItem: 'creature_chance' },
  { day: 5, currency: 100, bonusItem: 'rare_item' },
  { day: 6, currency: 50 },
  { day: 7, currency: 200, guaranteed: 'uncommon' },
]

// ============== MYSTERY BOX ==============

export type MysteryBoxTier = 'bronze' | 'silver' | 'gold' | 'diamond'

export const MYSTERY_BOX_THRESHOLDS: Record<MysteryBoxTier, number> = {
  bronze: 3,
  silver: 10,
  gold: 25,
  diamond: 50,
}

// ============== BUILDINGS ==============

export interface BuildingDefinition {
  id: string
  themeId: ThemeId
  name: string
  description: string
  icon: string
  slot: number // 1-6
  unlockLevel: number
  type: 'core' | 'production' | 'creature' | 'upgrade' | 'cosmetic'
  levels: BuildingLevel[]
}

export interface BuildingLevel {
  level: number
  cost: Partial<Resources>
  buildTimeMinutes: number
  bonus: string
  bonusValue: number
}

export interface Building {
  id: string
  definitionId: string
  memberId: string
  level: number
  status: BuildingStatus
  constructionStartedAt: string | null
  constructionEndsAt: string | null
  position: number // grid slot 1-6
}

// ============== CREATURES ==============

export interface CreatureDefinition {
  id: string
  themeId: ThemeId
  name: string
  description: string
  rarity: CreatureRarity
  category: QuestCategory // attracted by this category
  stages: CreatureStageInfo[]
}

export interface CreatureStageInfo {
  stage: EvolutionStage
  icon: string
  careRequired: number
  bondRequired: number
  timeRequiredDays: number
}

export interface Creature {
  id: string
  definitionId: string
  memberId: string
  nickname?: string
  stage: EvolutionStage
  carePoints: number
  bondPoints: number
  happiness: HappinessState
  lastCaredAt: string | null
  careStreak: number
  discoveredAt: string
}

// ============== NOTIFICATIONS ==============

export interface AppNotification {
  id: string
  memberId: string
  type: NotificationType
  title: string
  body: string
  read: boolean
  createdAt: string
  data?: Record<string, unknown>
}

// ============== THEME ==============

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  backgroundFrom: string
  backgroundTo: string
  surface: string
  surfaceLight: string
  surfaceText: string
  text: string
  textMuted: string
  xpColor: string
  streakColor: string
}

export interface ThemeVocabulary {
  quest: string
  quests: string
  complete: string
  xp: string
  greeting: string
  farewell: string
  celebration: string
  categories: Record<QuestCategory, string>
  resources: {
    primary: string
    secondary: string
    rare: string
  }
}

export interface ThemeMascot {
  name: string
  icon: string
  greeting: string
  celebration: string
  encouragement: string
}

export interface ThemeDefinition {
  id: ThemeId
  name: string
  colors: ThemeColors
  vocabulary: ThemeVocabulary
  mascot: ThemeMascot
  icon: string
  backgroundClass: string
}
