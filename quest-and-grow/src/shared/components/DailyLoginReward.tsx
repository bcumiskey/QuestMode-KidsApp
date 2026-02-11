import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@shared/components/Modal.tsx'
import { DAILY_LOGIN_REWARDS } from '@core/types/index.ts'
import type { AgeTier, ThemeDefinition } from '@core/types/index.ts'

interface DailyLoginRewardProps {
  currentDay: number // 1-7
  theme: ThemeDefinition
  tier: AgeTier
  onClaim: (day: number, currency: number) => void
  onClose: () => void
}

export function DailyLoginReward({ currentDay, theme, tier, onClaim, onClose }: DailyLoginRewardProps) {
  const [claimed, setClaimed] = useState(false)

  const today = DAILY_LOGIN_REWARDS.find((r) => r.day === currentDay) ?? DAILY_LOGIN_REWARDS[0]

  const handleClaim = () => {
    setClaimed(true)
    onClaim(currentDay, today.currency)
    setTimeout(onClose, 2000)
  }

  const isBig = tier === 'little'
  const fontSize = isBig ? 'text-3xl' : tier === 'middle' ? 'text-2xl' : 'text-xl'

  return (
    <Modal onClose={onClose}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-4 text-center"
      >
        <div className="text-4xl">🎁</div>
        <h2 className={`font-extrabold ${fontSize}`} style={{ color: theme.colors.primary }}>
          DAILY REWARD!
        </h2>

        {/* Day progress */}
        <div className="flex justify-center gap-2">
          {DAILY_LOGIN_REWARDS.map((reward) => {
            const isToday = reward.day === currentDay
            const isPast = reward.day < currentDay
            const isMega = reward.day === 5 || reward.day === 7

            return (
              <div
                key={reward.day}
                className={`flex flex-col items-center ${isBig ? 'gap-1' : 'gap-0.5'}`}
              >
                <motion.div
                  className={`rounded-xl flex items-center justify-center font-bold ${
                    isBig ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'
                  } ${
                    isPast
                      ? 'bg-green-500 text-white'
                      : isToday
                        ? 'ring-2 ring-yellow-400 bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-400'
                  }`}
                  animate={isToday ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {isPast ? '✓' : isMega ? '👑' : '🎁'}
                </motion.div>
                <span className="text-xs text-gray-400">{reward.day}</span>
              </div>
            )
          })}
        </div>

        <div className="text-gray-500 text-sm">
          Day {currentDay} of 7 — {currentDay >= 3 ? `${currentDay} days in a row!` : 'Keep it up!'}
        </div>

        {/* Today's reward */}
        <AnimatePresence>
          {!claimed ? (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                className="rounded-2xl p-4 text-white"
                style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              >
                <div className={`font-extrabold ${isBig ? 'text-4xl' : 'text-2xl'}`}>
                  +{today.currency} {theme.vocabulary.resources.primary}
                </div>
                {today.bonusItem && (
                  <div className="text-white/80 text-sm mt-1">
                    + Bonus item!
                  </div>
                )}
                {today.guaranteed && (
                  <div className="text-white/80 text-sm mt-1">
                    + Guaranteed {today.guaranteed} creature!
                  </div>
                )}
              </div>

              {currentDay === 7 && (
                <div className="text-yellow-500 font-bold animate-pulse text-lg">
                  MEGA CHEST!
                </div>
              )}

              <button
                onClick={handleClaim}
                className={`w-full rounded-2xl font-extrabold text-white transition-all hover:scale-105 active:scale-95 ${
                  isBig ? 'py-5 text-2xl' : 'py-3 text-lg'
                }`}
                style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              >
                {tier === 'little' ? '✨ YAY! ✨' : tier === 'middle' ? 'CLAIM REWARD!' : 'Claim'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <div className="text-5xl mb-2">🎉</div>
              <div className="text-green-600 font-bold text-xl">Claimed!</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot */}
        <div className="text-sm text-gray-500">
          {theme.mascot.icon} {theme.mascot.celebration}
        </div>
      </motion.div>
    </Modal>
  )
}
