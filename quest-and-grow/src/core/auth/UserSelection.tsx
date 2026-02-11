import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { SyncIndicator } from '@shared/components/SyncIndicator.tsx'
import { calculateLevel } from '@core/services/dateUtils.ts'

export function UserSelection() {
  const navigate = useNavigate()
  const members = useFamilyStore((s) => s.members)
  const syncStatus = useFamilyStore((s) => s.syncStatus)

  const children = Object.values(members)
    .filter((m) => m.role === 'child')
    .sort((a, b) => a.name.localeCompare(b.name))

  const leaderboard = [...children].sort(
    (a, b) => (b.stats?.xp ?? 0) - (a.stats?.xp ?? 0),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white/95 backdrop-blur rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Quest & Grow
        </h1>
        <p className="text-gray-500 text-center mb-2">Choose your hero!</p>
        <div className="flex justify-center mb-6">
          <SyncIndicator status={syncStatus} />
        </div>

        <div className="space-y-3">
          {children.map((child) => {
            const level = calculateLevel(child.stats?.xp ?? 0)
            return (
              <button
                key={child.id}
                onClick={() => navigate(`/login/${child.id}`)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] shadow-lg"
              >
                <div className="text-4xl">{child.avatar}</div>
                <div className="flex-1 text-left">
                  <div className="text-xl font-bold">{child.name}</div>
                  <div className="text-purple-200 text-sm">
                    Level {level} &middot; {child.stats?.streak ?? 0} day streak 🔥
                  </div>
                </div>
                <div className="text-2xl">🔐</div>
              </button>
            )
          })}
        </div>

        {leaderboard.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl">
            <h3 className="font-bold text-gray-700 mb-2">🏆 Family Leaderboard</h3>
            <div className="space-y-2">
              {leaderboard.map((child, i) => (
                <div key={child.id} className="flex items-center gap-2 text-gray-600">
                  <span className="text-xl">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}
                  </span>
                  <span className="font-medium">{child.name}</span>
                  <span className="flex-1 text-right">
                    {(child.stats?.xp ?? 0).toLocaleString()} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/login/parent')}
          className="w-full mt-4 py-3 text-gray-400 hover:text-gray-600 text-sm"
        >
          🔐 Parent Access
        </button>
      </motion.div>
    </div>
  )
}
