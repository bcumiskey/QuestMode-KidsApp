import { useState } from 'react'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { calculateLevel } from '@core/services/dateUtils.ts'
import { TRUST_NAMES, type TrustLevel } from '@core/types/index.ts'
import { Modal } from '@shared/components/Modal.tsx'

export function ChildManager() {
  const members = useFamilyStore((s) => s.members)
  const updateMemberStats = useFamilyStore((s) => s.updateMemberStats)
  const [selected, setSelected] = useState<string | null>(null)
  const [bonusXp, setBonusXp] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  const children = Object.values(members)
    .filter((m) => m.role === 'child')
    .sort((a, b) => a.name.localeCompare(b.name))

  const selectedChild = selected ? members[selected] : null

  const handleAwardXp = async () => {
    if (!selected || !bonusXp) return
    const amount = parseInt(bonusXp, 10)
    if (isNaN(amount) || amount <= 0) return
    const child = members[selected]
    if (!child) return

    const newXp = (child.stats?.xp ?? 0) + amount
    await updateMemberStats(selected, { xp: newXp, level: calculateLevel(newXp) })
    setBonusXp('')
  }

  const handleResetStreak = async () => {
    if (!selected) return
    await updateMemberStats(selected, { streak: 0, lastCompletedDate: null })
    setConfirmReset(false)
  }

  const handleChangeTrust = async (newLevel: TrustLevel) => {
    if (!selected) return
    await updateMemberStats(selected, { trustLevel: newLevel, trustWarnings: 0 })
  }

  return (
    <div className="space-y-4">
      {/* Child selector */}
      <div className="flex gap-2">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => { setSelected(child.id); setBonusXp(''); setConfirmReset(false) }}
            className={`flex-1 p-3 rounded-xl text-center transition-all ${
              selected === child.id
                ? 'bg-white/20 ring-2 ring-white/50'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-3xl">{child.avatar}</div>
            <div className="text-sm font-medium mt-1">{child.name}</div>
          </button>
        ))}
      </div>

      {/* Child detail panel */}
      {selectedChild && (
        <div className="space-y-4">
          {/* Stats overview */}
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">{selectedChild.name}'s Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 rounded-xl p-3">
                <div className="text-lg font-bold">{(selectedChild.stats?.xp ?? 0).toLocaleString()}</div>
                <div className="text-white/60 text-xs">XP (Level {calculateLevel(selectedChild.stats?.xp ?? 0)})</div>
              </div>
              <div className="bg-black/20 rounded-xl p-3">
                <div className="text-lg font-bold">{selectedChild.stats?.streak ?? 0} 🔥</div>
                <div className="text-white/60 text-xs">Day Streak</div>
              </div>
              <div className="bg-black/20 rounded-xl p-3">
                <div className="text-lg font-bold">{selectedChild.stats?.totalQuestsCompleted ?? 0}</div>
                <div className="text-white/60 text-xs">Total Quests</div>
              </div>
              <div className="bg-black/20 rounded-xl p-3">
                <div className="text-lg font-bold">{TRUST_NAMES[(selectedChild.stats?.trustLevel ?? 1) as TrustLevel]}</div>
                <div className="text-white/60 text-xs">Trust Level</div>
              </div>
            </div>
          </div>

          {/* Award Bonus XP */}
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">🎁 Award Bonus XP</h3>
            <div className="flex gap-2">
              <input
                type="number"
                value={bonusXp}
                onChange={(e) => setBonusXp(e.target.value)}
                placeholder="Amount"
                min="1"
                className="flex-1 bg-black/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
              />
              <button
                onClick={handleAwardXp}
                disabled={!bonusXp || parseInt(bonusXp) <= 0}
                className="bg-yellow-500 text-yellow-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-40"
              >
                Award
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {[25, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setBonusXp(String(amt))}
                  className="flex-1 bg-black/20 py-1 rounded-lg text-sm hover:bg-black/30 transition-colors"
                >
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Level */}
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">🛡️ Trust Level</h3>
            <div className="grid grid-cols-4 gap-2">
              {([1, 2, 3, 4] as TrustLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => handleChangeTrust(level)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    (selectedChild.stats?.trustLevel ?? 1) === level
                      ? 'bg-purple-500 ring-2 ring-purple-300'
                      : 'bg-black/20 hover:bg-black/30'
                  }`}
                >
                  {TRUST_NAMES[level]}
                </button>
              ))}
            </div>
            {selectedChild.stats?.trustWarnings > 0 && (
              <div className="mt-2 text-yellow-400 text-sm">
                ⚠️ {selectedChild.stats.trustWarnings} warning{selectedChild.stats.trustWarnings > 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Streak Reset */}
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3">🔥 Streak Management</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Current streak: {selectedChild.stats?.streak ?? 0} days</div>
                <div className="text-white/60 text-sm">Longest: {selectedChild.stats?.longestStreak ?? 0} days</div>
              </div>
              <button
                onClick={() => setConfirmReset(true)}
                className="bg-red-500/80 px-4 py-2 rounded-lg font-medium hover:bg-red-500 transition-colors"
              >
                Reset Streak
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedChild && (
        <div className="bg-white/10 rounded-2xl p-6 text-center text-white/60">
          Select a child above to manage their stats
        </div>
      )}

      {/* Confirm reset modal */}
      {confirmReset && selectedChild && (
        <Modal onClose={() => setConfirmReset(false)}>
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Reset Streak?</h3>
          <p className="text-gray-600 mb-4">
            This will reset {selectedChild.name}'s streak to 0. This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmReset(false)}
              className="flex-1 py-3 bg-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleResetStreak}
              className="flex-1 py-3 bg-red-500 rounded-xl font-medium text-white hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
