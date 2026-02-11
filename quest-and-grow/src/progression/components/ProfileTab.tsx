import { useParams } from 'react-router-dom'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { calculateLevel } from '@core/services/dateUtils.ts'
import { TRUST_NAMES, type TrustLevel } from '@core/types/index.ts'
import { useTheme } from '@themes/hooks/useTheme.ts'

export function ProfileTab() {
  const { memberId } = useParams<{ memberId: string }>()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const theme = useTheme()

  if (!member) return null

  const level = calculateLevel(member.stats?.xp ?? 0)
  const trustName = TRUST_NAMES[(member.stats?.trustLevel ?? 1) as TrustLevel]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-white mb-4">📊 Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{level}</div>
            <div className="text-white/60 text-sm">Level</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{member.stats?.streak ?? 0}</div>
            <div className="text-white/60 text-sm">Current Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">{member.stats?.longestStreak ?? 0}</div>
            <div className="text-white/60 text-sm">Best Streak</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{(member.stats?.xp ?? 0).toLocaleString()}</div>
            <div className="text-white/60 text-sm">Total XP</div>
          </div>
        </div>
      </div>

      {/* Trust Level */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-white mb-4">🛡️ Trust Level</h3>
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {member.stats?.trustLevel === 4 ? '👑' : member.stats?.trustLevel === 3 ? '🛡️' : member.stats?.trustLevel === 2 ? '⚔️' : '🔰'}
          </div>
          <div>
            <div className="text-xl font-bold" style={{ color: theme.colors.primary }}>
              {trustName}
            </div>
            <div className="text-white/60 text-sm">Level {member.stats?.trustLevel ?? 1} of 4</div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-white mb-4">💎 Resources</h3>
        <div className="grid grid-cols-2 gap-3">
          <ResourceItem label="Energy" value={member.stats?.resources?.energy ?? 0} icon="⚡" />
          <ResourceItem label="Knowledge" value={member.stats?.resources?.knowledge ?? 0} icon="📚" />
          <ResourceItem label="Harmony" value={member.stats?.resources?.harmony ?? 0} icon="🤝" />
          <ResourceItem label="Courage" value={member.stats?.resources?.courage ?? 0} icon="🗡️" />
          <ResourceItem label="Order" value={member.stats?.resources?.order ?? 0} icon="🏠" />
          <ResourceItem label={theme.vocabulary.resources.primary} value={member.stats?.resources?.primary ?? 0} icon="💰" />
        </div>
      </div>

      {/* Theme Info */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl text-center">
        <div className="text-4xl mb-2">{theme.icon}</div>
        <div className="text-xl font-bold text-white">{theme.name}</div>
        <div className="text-white/60 text-sm mt-1">{member.name}'s World</div>
      </div>
    </div>
  )
}

function ResourceItem({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-3 flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-sm font-bold text-white">{value}</div>
        <div className="text-xs text-white/60">{label}</div>
      </div>
    </div>
  )
}
