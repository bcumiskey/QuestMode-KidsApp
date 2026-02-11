import { useState, useEffect } from 'react'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useQuestStore } from '@quests/stores/questStore.ts'
import { TRUST_NAMES, type TrustLevel } from '@core/types/index.ts'

export function ApprovalQueue() {
  const members = useFamilyStore((s) => s.members)
  const pendingApproval = useQuestStore((s) => s.pendingApproval)
  const approveQuest = useQuestStore((s) => s.approveQuest)
  const rejectQuest = useQuestStore((s) => s.rejectQuest)
  const loadCompletedToday = useQuestStore((s) => s.loadCompletedToday)
  const [processing, setProcessing] = useState<string | null>(null)

  const children = Object.values(members).filter((m) => m.role === 'child')

  // Load pending approvals for all children
  useEffect(() => {
    for (const child of children) {
      loadCompletedToday(child.id)
    }
  }, [children.length]) // eslint-disable-line react-hooks/exhaustive-deps

  // Collect all pending items across children
  const allPending: Array<{
    memberId: string
    memberName: string
    memberAvatar: string
    trustLevel: TrustLevel
    key: string
    questName: string
    questIcon: string
    category: string
    timestamp: string
  }> = []

  for (const child of children) {
    const childPending = pendingApproval[child.id] ?? {}
    for (const [key, entry] of Object.entries(childPending)) {
      allPending.push({
        memberId: child.id,
        memberName: child.name,
        memberAvatar: child.avatar,
        trustLevel: child.stats?.trustLevel ?? 1,
        key,
        questName: entry.quest.name,
        questIcon: entry.quest.icon,
        category: entry.category,
        timestamp: entry.timestamp,
      })
    }
  }

  // Sort by timestamp, oldest first
  allPending.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  const handleApprove = async (memberId: string, key: string) => {
    setProcessing(key)
    try {
      await approveQuest(memberId, key)
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (memberId: string, key: string) => {
    setProcessing(key)
    try {
      await rejectQuest(memberId, key)
    } finally {
      setProcessing(null)
    }
  }

  if (allPending.length === 0) {
    return (
      <div className="bg-white/10 rounded-2xl p-6">
        <div className="text-white/60 text-center py-8">
          No tasks waiting for approval ✓
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-white/70 text-sm mb-2">
        {allPending.length} task{allPending.length > 1 ? 's' : ''} awaiting approval
      </div>

      {allPending.map((item) => {
        const isProcessing = processing === item.key
        const trustName = TRUST_NAMES[item.trustLevel]
        const timeAgo = getTimeAgo(item.timestamp)

        return (
          <div key={`${item.memberId}_${item.key}`} className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{item.memberAvatar}</span>
              <div className="flex-1">
                <div className="font-bold">{item.memberName}</div>
                <div className="text-white/60 text-xs">
                  {trustName} &middot; {timeAgo}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 bg-black/20 rounded-xl p-3">
              <span className="text-2xl">{item.questIcon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.questName}</div>
                <div className="text-white/60 text-xs capitalize">{item.category}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                disabled={isProcessing}
                onClick={() => handleApprove(item.memberId, item.key)}
                className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                  isProcessing
                    ? 'bg-gray-500 opacity-50'
                    : 'bg-green-500 hover:bg-green-400'
                }`}
              >
                {isProcessing ? '...' : '✓ Approve'}
              </button>
              <button
                disabled={isProcessing}
                onClick={() => handleReject(item.memberId, item.key)}
                className={`flex-1 py-2 rounded-xl font-bold transition-all ${
                  isProcessing
                    ? 'bg-gray-500 opacity-50'
                    : 'bg-red-500/80 hover:bg-red-400'
                }`}
              >
                {isProcessing ? '...' : '✗ Reject'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
