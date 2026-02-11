import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuestCompletionResult } from '@quests/stores/questStore.ts'
import type { QuestBase, AgeTier } from '@core/types/index.ts'
import { TIER_LABELS, TIER_COLORS, TIER_EMOJIS } from '@progression/services/rewardService.ts'
import { TRUST_NAMES, type TrustLevel, getAgeTier } from '@core/types/index.ts'
import { RARITY_COLORS } from '@creatures/data/creatureDefinitions.ts'
import { Confetti } from '@shared/components/Confetti.tsx'
import { SpinWheel } from '@shared/components/SpinWheel.tsx'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useParams } from 'react-router-dom'

interface Props {
  result: QuestCompletionResult
  quest: QuestBase
  onClose: () => void
}

type ModalPhase = 'celebration' | 'spinWheel' | 'results'

export function QuestCompletionModal({ result, quest, onClose }: Props) {
  const { memberId } = useParams<{ memberId: string }>()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const age = member?.age ?? 9
  const tier: AgeTier = getAgeTier(age)

  const [phase, setPhase] = useState<ModalPhase>('celebration')
  const [celebrationStage, setCelebrationStage] = useState(0)
  const [confettiActive, setConfettiActive] = useState(false)
  const [showFlash, setShowFlash] = useState(true)
  const [xpDisplay, setXpDisplay] = useState(0)

  const { xpResult, streakResult, bonusResult, resourcesEarned, trustUpdate, creatureAttraction } = result
  const hasBonusTier = bonusResult.tier !== 'none'

  // Check if this is the first spin ever
  const isFirstSpin = !localStorage.getItem(`firstSpin_${memberId}`)

  // Celebration timing per tier
  const celebrationDuration = tier === 'little' ? 4000 : tier === 'middle' ? 2500 : 1500

  useEffect(() => {
    // Flash effect
    setTimeout(() => setShowFlash(false), tier === 'little' ? 200 : 100)

    // Confetti
    setTimeout(() => setConfettiActive(true), 200)

    // Stage reveals
    const delays = tier === 'little'
      ? [600, 1200, 2000, 3000]
      : tier === 'middle'
        ? [400, 800, 1400, 2000]
        : [200, 500, 800, 1200]

    delays.forEach((delay, i) => {
      setTimeout(() => setCelebrationStage(i + 1), delay)
    })

    // Animate XP counter
    const xpAnimStart = delays[0]
    const steps = 15
    const stepDuration = 40
    for (let i = 0; i <= steps; i++) {
      setTimeout(
        () => setXpDisplay(Math.round((xpResult.totalXp / steps) * i)),
        xpAnimStart + i * stepDuration,
      )
    }

    // Auto transition to spin wheel after celebration
    setTimeout(() => {
      setPhase('spinWheel')
    }, celebrationDuration)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSpinComplete = useCallback(() => {
    if (isFirstSpin) {
      localStorage.setItem(`firstSpin_${memberId}`, 'true')
    }
    setTimeout(() => setPhase('results'), 500)
  }, [isFirstSpin, memberId])

  const isBig = tier === 'little'
  const fontSize = isBig ? 'text-3xl' : tier === 'middle' ? 'text-2xl' : 'text-xl'
  const buttonText = tier === 'little' ? '✨ I DID IT! ✨' : tier === 'middle' ? 'AWESOME!' : 'Done'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={tier === 'older' && phase === 'results' ? onClose : undefined}
      />

      {/* Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: tier === 'little' ? 0.8 : 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-white z-[51]"
          />
        )}
      </AnimatePresence>

      {/* Confetti */}
      <Confetti active={confettiActive} tier={tier} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`relative z-[52] bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden ${
          isBig ? 'p-8' : 'p-6'
        }`}
      >
        <AnimatePresence mode="wait">
          {/* PHASE 1: Celebration */}
          {phase === 'celebration' && (
            <motion.div
              key="celebration"
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4 text-center"
            >
              {/* Mascot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ type: 'spring', damping: 10 }}
                className={isBig ? 'text-7xl' : 'text-5xl'}
              >
                {quest.icon}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`font-extrabold ${fontSize}`}
              >
                {tier === 'little' ? '🎉 YAY! 🎉' : tier === 'middle' ? 'MISSION COMPLETE!' : quest.name}
              </motion.h3>

              {/* XP fly */}
              {celebrationStage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-yellow-50 rounded-xl p-3"
                >
                  <motion.div
                    className={`font-extrabold text-yellow-600 ${isBig ? 'text-4xl' : 'text-2xl'}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: 2, duration: 0.3 }}
                  >
                    +{xpDisplay} XP
                  </motion.div>
                  {xpResult.streakBonus > 0 && (
                    <div className="text-yellow-500 text-sm">
                      ({Math.round(xpResult.streakBonus * 100)}% streak bonus!)
                    </div>
                  )}
                  {xpResult.leveledUp && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-purple-600 font-bold text-lg mt-1"
                    >
                      LEVEL UP! Lv.{xpResult.newLevel}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Streak */}
              {celebrationStage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`font-bold ${isBig ? 'text-xl' : 'text-base'}`}
                >
                  🔥 {streakResult.newStreak} day streak {streakResult.newStreak >= 7 ? '🔥🔥' : '🔥'}
                </motion.div>
              )}

              {/* Resources */}
              {celebrationStage >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 justify-center"
                >
                  {Object.entries(resourcesEarned)
                    .filter(([, v]) => (v ?? 0) > 0)
                    .map(([key, value]) => (
                      <motion.span
                        key={key}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        +{value} {key}
                      </motion.span>
                    ))}
                </motion.div>
              )}

              {/* Trust promotion */}
              {celebrationStage >= 4 && trustUpdate.promoted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-purple-50 rounded-xl p-3"
                >
                  <div className="text-purple-600 font-bold text-lg">
                    Trust Level Up! {TRUST_NAMES[trustUpdate.newTrustLevel as TrustLevel]}
                  </div>
                </motion.div>
              )}

              {/* Creature attraction */}
              {celebrationStage >= 4 && creatureAttraction.attracted && creatureAttraction.rarity && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl p-3 text-white font-bold"
                  style={{ backgroundColor: RARITY_COLORS[creatureAttraction.rarity] }}
                >
                  🐾 A {creatureAttraction.rarity} creature was attracted!
                </motion.div>
              )}

              {tier === 'older' && celebrationStage >= 2 && (
                <button
                  onClick={() => setPhase('spinWheel')}
                  className="text-gray-400 text-xs hover:text-gray-600"
                >
                  Skip to spin &gt;
                </button>
              )}
            </motion.div>
          )}

          {/* PHASE 2: Spin Wheel */}
          {phase === 'spinWheel' && (
            <motion.div
              key="spin"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-4"
            >
              <SpinWheel
                onComplete={handleSpinComplete}
                rigged={isFirstSpin ? (tier === 'little' ? 'jackpot' : 'large') : undefined}
              />
            </motion.div>
          )}

          {/* PHASE 3: Final Results */}
          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 text-center"
            >
              <div className={`font-extrabold ${fontSize}`}>
                {tier === 'little' ? '⭐ AMAZING! ⭐' : 'Results'}
              </div>

              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center bg-yellow-50 rounded-xl p-3">
                  <span className="text-gray-600">XP Earned</span>
                  <span className="font-bold text-yellow-600">+{xpResult.totalXp}</span>
                </div>
                {hasBonusTier && (
                  <div
                    className="flex justify-between items-center rounded-xl p-3 text-white"
                    style={{ backgroundColor: TIER_COLORS[bonusResult.tier] }}
                  >
                    <span>Bonus</span>
                    <span className="font-bold">
                      {TIER_EMOJIS[bonusResult.tier]} {TIER_LABELS[bonusResult.tier]}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center bg-orange-50 rounded-xl p-3">
                  <span className="text-gray-600">Streak</span>
                  <span className="font-bold text-orange-600">{streakResult.newStreak} days 🔥</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className={`w-full rounded-2xl font-extrabold text-white bg-gray-800 hover:bg-gray-700 transition-all active:scale-95 ${
                  isBig ? 'py-5 text-2xl' : 'py-3 text-lg'
                }`}
              >
                {buttonText}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
