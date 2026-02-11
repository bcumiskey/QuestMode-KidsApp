import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BonusTier } from '@core/types/index.ts'

interface SpinWheelProps {
  onComplete: (tier: BonusTier) => void
  rigged?: BonusTier // Force a specific result (first spin rigging)
}

interface WheelSegment {
  tier: BonusTier
  label: string
  color: string
  emoji: string
  weight: number // degrees of arc
}

const SEGMENTS: WheelSegment[] = [
  { tier: 'none', label: 'Nice Try!', color: '#6B7280', emoji: '👍', weight: 180 },
  { tier: 'small', label: '+10% XP', color: '#3B82F6', emoji: '⭐', weight: 90 },
  { tier: 'medium', label: '+25% XP', color: '#8B5CF6', emoji: '🌟', weight: 54 },
  { tier: 'large', label: '+50% XP!', color: '#F59E0B', emoji: '💎', weight: 28.8 },
  { tier: 'jackpot', label: 'JACKPOT!', color: '#EF4444', emoji: '🎰', weight: 7.2 },
]

export function SpinWheel({ onComplete, rigged }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<WheelSegment | null>(null)
  const [showResult, setShowResult] = useState(false)

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setShowResult(false)
    setResult(null)

    // Determine the winning segment
    let winningTier: BonusTier
    if (rigged) {
      winningTier = rigged
    } else {
      const roll = Math.random() * 100
      if (roll < 50) winningTier = 'none'
      else if (roll < 75) winningTier = 'small'
      else if (roll < 90) winningTier = 'medium'
      else if (roll < 98) winningTier = 'large'
      else winningTier = 'jackpot'
    }

    const winSegment = SEGMENTS.find((s) => s.tier === winningTier)!

    // Calculate the rotation to land on the winning segment
    let degreeOffset = 0
    for (const seg of SEGMENTS) {
      if (seg.tier === winningTier) {
        degreeOffset += seg.weight * (0.3 + Math.random() * 0.4) // Land somewhere within the segment
        break
      }
      degreeOffset += seg.weight
    }

    // Add multiple full rotations for drama + near-miss effect
    const fullRotations = 5 + Math.floor(Math.random() * 3)
    const totalRotation = rotation + fullRotations * 360 + (360 - degreeOffset)

    setRotation(totalRotation)

    // Show result after spin completes
    setTimeout(() => {
      setResult(winSegment)
      setShowResult(true)
      setSpinning(false)

      setTimeout(() => {
        onComplete(winningTier)
      }, 1500)
    }, 3000)
  }, [spinning, rotation, rigged, onComplete])

  // Build the wheel with CSS conic gradient
  let gradientParts: string[] = []
  let currentDeg = 0
  for (const seg of SEGMENTS) {
    gradientParts.push(`${seg.color} ${currentDeg}deg ${currentDeg + seg.weight}deg`)
    currentDeg += seg.weight
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-2xl font-bold text-white">Bonus Spin!</h3>

      {/* Pointer */}
      <div className="text-3xl">▼</div>

      {/* Wheel */}
      <div className="relative w-64 h-64">
        <motion.div
          className="w-full h-full rounded-full border-4 border-white/30 shadow-2xl"
          style={{
            background: `conic-gradient(${gradientParts.join(', ')})`,
          }}
          animate={{ rotate: rotation }}
          transition={{
            duration: 3,
            ease: [0.2, 0.8, 0.2, 1], // Custom ease for near-miss feel
          }}
        >
          {/* Segment labels */}
          {SEGMENTS.map((seg, i) => {
            let labelDeg = 0
            for (let j = 0; j < i; j++) labelDeg += SEGMENTS[j].weight
            labelDeg += seg.weight / 2

            return (
              <div
                key={seg.tier}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${labelDeg}deg)`,
                }}
              >
                <span
                  className="absolute text-white font-bold text-xs drop-shadow-lg"
                  style={{
                    top: '15%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {seg.emoji}
                </span>
              </div>
            )
          })}
        </motion.div>

        {/* Center button */}
        <button
          onClick={spin}
          disabled={spinning}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full font-bold text-sm shadow-xl transition-all ${
            spinning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-800 hover:scale-110 active:scale-95 animate-pulse'
          }`}
        >
          {spinning ? '...' : 'SPIN!'}
        </button>
      </div>

      {/* Result popup */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div
              className="rounded-2xl px-8 py-4 text-white font-bold text-xl shadow-2xl"
              style={{ backgroundColor: result.color }}
            >
              {result.emoji} {result.label} {result.emoji}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
