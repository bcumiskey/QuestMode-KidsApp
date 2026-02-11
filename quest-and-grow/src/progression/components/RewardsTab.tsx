import { useParams } from 'react-router-dom'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { formatPoints } from '@core/services/dateUtils.ts'

export function RewardsTab() {
  const { memberId } = useParams<{ memberId: string }>()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const rewards = useFamilyStore((s) => s.familyInfo?.settings.rewards ?? [])

  if (!member) return null

  const availablePoints = (member.stats?.xp ?? 0)

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
        <div className="text-white/60 mb-1">Available Points</div>
        <div className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {formatPoints(availablePoints)}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold">
          🎁 Redeem Rewards
        </div>
        <div className="p-2">
          {rewards.filter((r) => r.active).map((reward) => {
            const canAfford = availablePoints >= reward.points
            return (
              <button
                key={reward.id}
                disabled={!canAfford}
                className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all ${
                  canAfford ? 'hover:bg-white/10' : 'opacity-50'
                }`}
              >
                <span className="text-3xl">{reward.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium text-white">{reward.name}</div>
                  <div className="text-sm text-white/50">
                    {formatPoints(reward.points)} points
                  </div>
                </div>
                {canAfford && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Redeem
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
