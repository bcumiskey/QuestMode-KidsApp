import { useEffect } from 'react'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { calculateLevel } from '@core/services/dateUtils.ts'
import { ProgressBar } from '@shared/components/ProgressBar.tsx'
import { TRUST_NAMES, type TrustLevel, type QuestCategory } from '@core/types/index.ts'
import { questDataByMember } from '@quests/data/questDefinitions.ts'
import { useQuestStore } from '@quests/stores/questStore.ts'

export function FamilyOverview() {
  const members = useFamilyStore((s) => s.members)
  const loadCompletedToday = useQuestStore((s) => s.loadCompletedToday)
  const isCompleted = useQuestStore((s) => s.isCompleted)

  const children = Object.values(members)
    .filter((m) => m.role === 'child')
    .sort((a, b) => a.name.localeCompare(b.name))

  // Load completed data for all children
  useEffect(() => {
    for (const child of children) {
      loadCompletedToday(child.id)
    }
  }, [children.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      {children.map((child) => {
        const level = calculateLevel(child.stats?.xp ?? 0)
        const trustName = TRUST_NAMES[(child.stats?.trustLevel ?? 1) as TrustLevel]
        const quests = questDataByMember[child.id] ?? {}
        let totalQuests = 0
        let completedCount = 0

        for (const [catId, catQuests] of Object.entries(quests)) {
          totalQuests += catQuests.length
          for (const q of catQuests) {
            if (isCompleted(child.id, q.id, catId as QuestCategory)) completedCount++
          }
        }

        return (
          <div key={child.id} className="bg-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{child.avatar}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{child.name}</h3>
                <div className="text-white/70">
                  Level {level} &middot; {child.stats?.streak ?? 0} day streak 🔥 &middot; {trustName}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{completedCount}/{totalQuests}</div>
                <div className="text-white/70 text-sm">today</div>
              </div>
            </div>
            <ProgressBar
              percent={totalQuests > 0 ? (completedCount / totalQuests) * 100 : 0}
              bgColor="bg-black/30"
            />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-black/20 rounded-xl p-3 text-center">
                <div className="text-lg font-bold">{(child.stats?.xp ?? 0).toLocaleString()}</div>
                <div className="text-white/60 text-xs">Total XP</div>
              </div>
              <div className="bg-black/20 rounded-xl p-3 text-center">
                <div className="text-lg font-bold">{child.stats?.totalQuestsCompleted ?? 0}</div>
                <div className="text-white/60 text-xs">Quests Done</div>
              </div>
            </div>
          </div>
        )
      })}

      {children.length === 0 && (
        <div className="bg-white/10 rounded-2xl p-6 text-center text-white/60">
          No children found. Data may still be loading...
        </div>
      )}
    </div>
  )
}
