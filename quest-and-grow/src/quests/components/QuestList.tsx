import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useThemedText } from '@themes/hooks/useTheme.ts'
import type { QuestCategory, QuestBase } from '@core/types/index.ts'
import { ProgressBar } from '@shared/components/ProgressBar.tsx'
import { questDataByMember } from '@quests/data/questDefinitions.ts'
import { useQuestStore, type QuestCompletionResult } from '@quests/stores/questStore.ts'
import { QuestCompletionModal } from '@quests/components/QuestCompletionModal.tsx'

const categoryOrder: QuestCategory[] = ['body', 'knowledge', 'home', 'brave', 'bond']

const categoryIcons: Record<QuestCategory, string> = {
  knowledge: '📚',
  body: '💪',
  home: '🏠',
  brave: '🗡️',
  bond: '🤝',
}

const categoryColors: Record<QuestCategory, string> = {
  knowledge: '#34C759',
  body: '#FF9500',
  home: '#007AFF',
  brave: '#FF2D55',
  bond: '#AF52DE',
}

export function QuestList() {
  const { memberId } = useParams<{ memberId: string }>()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const text = useThemedText()

  const loadCompletedToday = useQuestStore((s) => s.loadCompletedToday)
  const completeQuest = useQuestStore((s) => s.completeQuest)
  const uncompleteQuest = useQuestStore((s) => s.uncompleteQuest)
  const isCompleted = useQuestStore((s) => s.isCompleted)
  const isPending = useQuestStore((s) => s.isPending)

  const [completionResult, setCompletionResult] = useState<{
    result: QuestCompletionResult
    quest: QuestBase
  } | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [optimisticCompleted, setOptimisticCompleted] = useState<Set<string>>(new Set())

  // Load completed quests on mount
  useEffect(() => {
    if (memberId) {
      loadCompletedToday(memberId)
    }
  }, [memberId, loadCompletedToday])

  if (!memberId || !member) return null

  const quests = questDataByMember[memberId] ?? {}

  // Calculate totals
  let totalQuests = 0
  let completedCount = 0
  for (const category of categoryOrder) {
    const categoryQuests = quests[category] ?? []
    totalQuests += categoryQuests.length
    for (const q of categoryQuests) {
      if (isCompleted(memberId, q.id, category) || optimisticCompleted.has(q.id)) completedCount++
    }
  }

  const handleToggleQuest = async (quest: QuestBase, category: QuestCategory) => {
    if (loading) return

    const questCompleted = isCompleted(memberId, quest.id, category) || optimisticCompleted.has(quest.id)
    setLoading(quest.id)

    try {
      if (questCompleted) {
        setOptimisticCompleted((prev) => { const next = new Set(prev); next.delete(quest.id); return next })
        await uncompleteQuest(memberId, quest, category)
      } else {
        // Optimistic: mark as completed immediately
        setOptimisticCompleted((prev) => new Set(prev).add(quest.id))
        const result = await completeQuest(memberId, quest, category)
        if (result) {
          setCompletionResult({ result, quest })
        }
        // Clear optimistic state — real state now has it
        setOptimisticCompleted((prev) => { const next = new Set(prev); next.delete(quest.id); return next })
      }
    } catch {
      // Revert optimistic state on error
      setOptimisticCompleted((prev) => { const next = new Set(prev); next.delete(quest.id); return next })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 shadow-xl">
        <h3 className="font-bold text-white mb-2">Today's Progress</h3>
        <ProgressBar
          percent={totalQuests > 0 ? (completedCount / totalQuests) * 100 : 0}
        />
        <div className="text-white/60 text-sm mt-1">
          {completedCount} / {totalQuests} {text.quests.toLowerCase()} complete
          {completedCount === totalQuests && totalQuests > 0 ? ' 🎉' : ''}
        </div>
      </div>

      {/* Quest Categories */}
      {categoryOrder.map((catId) => {
        const categoryQuests = quests[catId] ?? []
        if (categoryQuests.length === 0) return null

        const catCompleted = categoryQuests.filter(
          (q) => isCompleted(memberId, q.id, catId) || optimisticCompleted.has(q.id),
        ).length

        return (
          <div key={catId} className="bg-white/10 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{ background: categoryColors[catId] }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{categoryIcons[catId]}</span>
                <span className="font-bold">{text.categoryName(catId)}</span>
              </div>
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                {catCompleted}/{categoryQuests.length}
              </span>
            </div>
            <div className="p-2">
              {categoryQuests.map((quest) => {
                const isComplete = isCompleted(memberId, quest.id, catId) || optimisticCompleted.has(quest.id)
                const pending = isPending(memberId, quest.id, catId)
                const isLoading = loading === quest.id

                return (
                  <button
                    key={quest.id}
                    disabled={isLoading || pending}
                    onClick={() => handleToggleQuest(quest, catId)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      isComplete
                        ? 'bg-green-500/20'
                        : pending
                          ? 'bg-yellow-500/20'
                          : 'hover:bg-white/10'
                    } ${isLoading ? 'opacity-50' : ''}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm ${
                        isComplete
                          ? 'bg-green-500 border-green-500 text-white'
                          : pending
                            ? 'bg-yellow-400 border-yellow-400 text-white'
                            : 'border-gray-300'
                      }`}
                    >
                      {isComplete ? '✓' : pending ? '⏳' : isLoading ? '...' : ''}
                    </div>
                    <span className="text-2xl">{quest.icon}</span>
                    <span
                      className={`flex-1 text-left ${
                        isComplete
                          ? 'text-white/50 line-through'
                          : pending
                            ? 'text-yellow-300'
                            : 'text-white'
                      }`}
                    >
                      {quest.name}
                      {pending && (
                        <span className="text-xs text-yellow-400 ml-1">(awaiting approval)</span>
                      )}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isComplete ? 'text-green-400' : 'text-white/40'
                      }`}
                    >
                      +{quest.baseXp}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Completion modal */}
      {completionResult && (
        <QuestCompletionModal
          result={completionResult.result}
          quest={completionResult.quest}
          onClose={() => setCompletionResult(null)}
        />
      )}
    </div>
  )
}
