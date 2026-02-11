import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Confetti } from '@shared/components/Confetti.tsx'
import type { AgeTier, ThemeDefinition } from '@core/types/index.ts'

interface CelebrationProps {
  active: boolean
  tier: AgeTier
  theme: ThemeDefinition
  xpEarned: number
  resourcesEarned: Record<string, number>
  questName: string
  onComplete: () => void
}

const TIER_TIMING = {
  little: {
    flash: 200,
    shake: 400,
    mascotEnter: 300,
    mascotCelebrate: 2800,
    confettiStart: 400,
    xpFly: 800,
    counterSpin: 1500,
    total: 6000,
    canSkipAfter: null,
  },
  middle: {
    flash: 150,
    shake: 300,
    mascotEnter: 200,
    mascotCelebrate: 1500,
    confettiStart: 300,
    xpFly: 500,
    counterSpin: 800,
    total: 3500,
    canSkipAfter: null,
  },
  older: {
    flash: 100,
    shake: 200,
    mascotEnter: 100,
    mascotCelebrate: 800,
    confettiStart: 200,
    xpFly: 300,
    counterSpin: 400,
    total: 1800,
    canSkipAfter: 500,
  },
}

export function CelebrationSequence({
  active,
  tier,
  theme,
  xpEarned,
  resourcesEarned,
  questName,
  onComplete,
}: CelebrationProps) {
  const [phase, setPhase] = useState(0)
  const [showFlash, setShowFlash] = useState(false)
  const [showShake, setShowShake] = useState(false)
  const [showMascot, setShowMascot] = useState(false)
  const [showXpFly, setShowXpFly] = useState(false)
  const [showCounters, setShowCounters] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [xpDisplay, setXpDisplay] = useState(0)

  const timing = TIER_TIMING[tier]

  useEffect(() => {
    if (!active) {
      setPhase(0)
      setShowFlash(false)
      setShowShake(false)
      setShowMascot(false)
      setShowXpFly(false)
      setShowCounters(false)
      setConfettiActive(false)
      setCanSkip(false)
      setXpDisplay(0)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    // Phase 1: Flash
    setShowFlash(true)
    timers.push(setTimeout(() => setShowFlash(false), timing.flash))

    // Phase 2: Shake
    timers.push(setTimeout(() => {
      setShowShake(true)
      setTimeout(() => setShowShake(false), timing.shake)
    }, timing.flash))

    // Phase 3: Mascot entrance
    timers.push(setTimeout(() => setShowMascot(true), timing.mascotEnter))

    // Phase 4: Confetti
    timers.push(setTimeout(() => setConfettiActive(true), timing.confettiStart))

    // Phase 5: XP fly
    timers.push(setTimeout(() => {
      setShowXpFly(true)
      // Animate XP counter
      const steps = 20
      const stepValue = xpEarned / steps
      for (let i = 0; i <= steps; i++) {
        timers.push(setTimeout(() => setXpDisplay(Math.round(stepValue * i)), i * 40))
      }
    }, timing.xpFly))

    // Phase 6: Show counters
    timers.push(setTimeout(() => setShowCounters(true), timing.counterSpin))

    // Skip button
    if (timing.canSkipAfter !== null) {
      timers.push(setTimeout(() => setCanSkip(true), timing.canSkipAfter))
    }

    // Auto-complete
    timers.push(setTimeout(() => {
      setPhase(1)
      onComplete()
    }, timing.total))

    return () => timers.forEach(clearTimeout)
  }, [active, tier, timing, xpEarned, onComplete])

  if (!active) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: tier === 'little' ? 0.8 : tier === 'middle' ? 0.6 : 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.backgroundFrom}, ${theme.colors.backgroundTo})`,
        }}
        animate={showShake ? {
          x: [0, -8, 8, -6, 6, -3, 3, 0],
        } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Confetti */}
        <Confetti
          active={confettiActive}
          tier={tier}
          colors={[theme.colors.primary, theme.colors.secondary, theme.colors.accent, '#FFD700', '#FF69B4']}
        />

        {/* Mascot */}
        <AnimatePresence>
          {showMascot && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: [0, tier === 'little' ? 1.3 : 1.1, 1],
                rotate: 0,
              }}
              transition={{ type: 'spring', damping: 15 }}
              className="text-center mb-4"
            >
              <div className={tier === 'little' ? 'text-8xl' : 'text-6xl'}>
                {theme.mascot.icon}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`font-extrabold mt-2 ${tier === 'little' ? 'text-3xl' : 'text-xl'}`}
                style={{ color: theme.colors.text }}
              >
                {theme.mascot.celebration}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quest complete banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`font-extrabold text-center mb-6 ${
            tier === 'little' ? 'text-4xl' : tier === 'middle' ? 'text-3xl' : 'text-2xl'
          }`}
          style={{ color: theme.colors.text }}
        >
          {tier === 'little' ? '🎉 YAY! 🎉' : tier === 'middle' ? 'MISSION COMPLETE!' : 'Complete!'}
        </motion.div>

        {/* XP fly */}
        <AnimatePresence>
          {showXpFly && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className={`font-extrabold ${tier === 'little' ? 'text-5xl' : 'text-3xl'}`}
                style={{ color: theme.colors.xpColor }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: 3, duration: 0.3 }}
              >
                +{xpDisplay} {theme.vocabulary.xp}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resource counters */}
        <AnimatePresence>
          {showCounters && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 justify-center mt-4"
            >
              {Object.entries(resourcesEarned)
                .filter(([, v]) => v > 0)
                .map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white/20 rounded-full px-4 py-2 backdrop-blur"
                  >
                    <span className="font-bold" style={{ color: theme.colors.text }}>
                      +{value} {key}
                    </span>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button */}
        {canSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={onComplete}
            className="absolute bottom-8 text-white/50 text-sm hover:text-white transition-colors"
          >
            Skip &gt;
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
