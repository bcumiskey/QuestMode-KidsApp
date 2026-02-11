import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@shared/components/Modal.tsx'
import type { MysteryBoxTier, AgeTier, ThemeDefinition } from '@core/types/index.ts'

interface MysteryBoxProps {
  boxTier: MysteryBoxTier
  theme: ThemeDefinition
  ageTier: AgeTier
  onClaim: (rewards: MysteryBoxReward[]) => void
  onClose: () => void
}

interface MysteryBoxReward {
  name: string
  icon: string
  amount?: number
}

const BOX_CONFIG: Record<MysteryBoxTier, { label: string; color: string; icon: string; rewardCount: number }> = {
  bronze: { label: 'Bronze Box', color: '#CD7F32', icon: '📦', rewardCount: 2 },
  silver: { label: 'Silver Box', color: '#C0C0C0', icon: '🎁', rewardCount: 3 },
  gold: { label: 'Gold Box', color: '#FFD700', icon: '✨', rewardCount: 4 },
  diamond: { label: 'Diamond Box', color: '#B9F2FF', icon: '💎', rewardCount: 5 },
}

function generateRewards(tier: MysteryBoxTier, theme: ThemeDefinition): MysteryBoxReward[] {
  const config = BOX_CONFIG[tier]
  const rewards: MysteryBoxReward[] = []
  const multiplier = tier === 'bronze' ? 1 : tier === 'silver' ? 2 : tier === 'gold' ? 4 : 8

  // Always currency
  rewards.push({
    name: theme.vocabulary.resources.primary,
    icon: '💰',
    amount: 15 * multiplier + Math.floor(Math.random() * 10 * multiplier),
  })

  // Bonus XP
  rewards.push({
    name: 'Bonus XP',
    icon: '⭐',
    amount: 10 * multiplier + Math.floor(Math.random() * 15 * multiplier),
  })

  if (config.rewardCount >= 3) {
    rewards.push({
      name: 'Creature Food',
      icon: '🍖',
      amount: multiplier,
    })
  }

  if (config.rewardCount >= 4) {
    const specialItems = ['Sparkle Sticker', 'Speed Boost', 'Build Boost', 'XP Shield']
    rewards.push({
      name: specialItems[Math.floor(Math.random() * specialItems.length)],
      icon: '✨',
    })
  }

  if (config.rewardCount >= 5) {
    rewards.push({
      name: 'Rare Material',
      icon: '💎',
      amount: Math.ceil(multiplier / 2),
    })
  }

  return rewards
}

export function MysteryBox({ boxTier, theme, ageTier, onClaim, onClose }: MysteryBoxProps) {
  const [stage, setStage] = useState<'closed' | 'shaking' | 'opening' | 'revealed'>('closed')
  const [rewards, setRewards] = useState<MysteryBoxReward[]>([])

  const config = BOX_CONFIG[boxTier]
  const isBig = ageTier === 'little'

  const handleOpen = () => {
    setStage('shaking')

    setTimeout(() => {
      setStage('opening')
    }, 1000)

    setTimeout(() => {
      const generated = generateRewards(boxTier, theme)
      setRewards(generated)
      setStage('revealed')
    }, 2000)
  }

  const handleClaim = () => {
    onClaim(rewards)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4 text-center">
        <AnimatePresence mode="wait">
          {(stage === 'closed' || stage === 'shaking') && (
            <motion.div
              key="box"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="space-y-4"
            >
              <h2
                className={`font-extrabold ${isBig ? 'text-3xl' : 'text-xl'}`}
                style={{ color: config.color }}
              >
                {config.label} Earned!
              </h2>

              <motion.div
                className="text-8xl"
                animate={
                  stage === 'shaking'
                    ? {
                        rotate: [-5, 5, -5, 5, -8, 8, -8, 8, 0],
                        scale: [1, 1.05, 1, 1.05, 1.1, 1.05, 1.1, 1.05, 1.2],
                      }
                    : { scale: [1, 1.05, 1] }
                }
                transition={
                  stage === 'shaking'
                    ? { duration: 1, ease: 'easeInOut' }
                    : { repeat: Infinity, duration: 2 }
                }
              >
                {config.icon}
              </motion.div>

              {stage === 'closed' && (
                <button
                  onClick={handleOpen}
                  className={`rounded-2xl font-extrabold text-white transition-all hover:scale-105 active:scale-95 ${
                    isBig ? 'px-12 py-5 text-2xl' : 'px-8 py-3 text-lg'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${config.color}, ${theme.colors.primary})` }}
                >
                  {isBig ? '✨ OPEN IT! ✨' : 'Open!'}
                </button>
              )}

              {stage === 'shaking' && (
                <div className="text-gray-400 animate-pulse">Opening...</div>
              )}
            </motion.div>
          )}

          {stage === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-6xl">💥</div>
            </motion.div>
          )}

          {stage === 'revealed' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <h2
                className={`font-extrabold ${isBig ? 'text-3xl' : 'text-xl'}`}
                style={{ color: config.color }}
              >
                {isBig ? '✨ WOW! ✨' : 'You got:'}
              </h2>

              <div className="space-y-2">
                {rewards.map((reward, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-gray-50 rounded-xl p-3 flex items-center gap-3"
                  >
                    <span className="text-2xl">{reward.icon}</span>
                    <span className="font-medium text-gray-800 flex-1 text-left">
                      {reward.name}
                    </span>
                    {reward.amount && (
                      <span className="font-bold" style={{ color: theme.colors.primary }}>
                        +{reward.amount}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleClaim}
                className={`w-full rounded-2xl font-extrabold text-white transition-all hover:scale-105 active:scale-95 ${
                  isBig ? 'py-5 text-2xl' : 'py-3 text-lg'
                }`}
                style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              >
                {isBig ? '🎉 YAY! 🎉' : 'Awesome!'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}
