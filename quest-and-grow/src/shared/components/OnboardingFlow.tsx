import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ThemeDefinition, AgeTier, Member } from '@core/types/index.ts'
import { getAgeTier } from '@core/types/index.ts'
import { getCreaturesForTheme } from '@creatures/data/creatureDefinitions.ts'
import { Confetti } from '@shared/components/Confetti.tsx'

interface OnboardingFlowProps {
  member: Member
  theme: ThemeDefinition
  onComplete: () => void
}

// Starter creature per theme (first uncommon creature)
function getStarterCreature(theme: ThemeDefinition) {
  const creatures = getCreaturesForTheme(theme.id)
  const uncommon = creatures.find((c) => c.rarity === 'uncommon')
  return uncommon ?? creatures[0]
}

// Per-theme mascot greeting data
function getMascotDialogue(theme: ThemeDefinition, memberName: string) {
  const m = theme.mascot
  return {
    greeting: m.greeting,
    nameReaction: `${memberName.toUpperCase()}! ${m.celebration}`,
    giftIntro: 'I almost forgot — there\'s something special waiting for you...',
    eggIntro: 'This egg has been waiting for someone special...',
    hatchCelebration: m.celebration,
    questIntro: `Ready for your first ${theme.vocabulary.quest.toLowerCase()}?`,
    finalWords: `You\'re going to do amazing things. ${m.celebration}`,
  }
}

type OnboardingStep =
  | 'dark-intro'
  | 'mascot-appear'
  | 'mascot-greet'
  | 'mascot-excited'
  | 'gift-reveal'
  | 'gift-open'
  | 'egg-intro'
  | 'egg-hatch'
  | 'creature-born'
  | 'base-preview'
  | 'quest-intro'
  | 'welcome-complete'

export function OnboardingFlow({ member, theme, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('dark-intro')
  const [showConfetti, setShowConfetti] = useState(false)
  const tier = getAgeTier(member.age)
  const mascot = theme.mascot
  const dialogue = getMascotDialogue(theme, member.name)
  const starterCreature = getStarterCreature(theme)
  const colors = theme.colors

  // Auto-advance from dark intro
  useEffect(() => {
    if (step === 'dark-intro') {
      const timer = setTimeout(() => setStep('mascot-appear'), 1500)
      return () => clearTimeout(timer)
    }
  }, [step])

  const buttonClass = tier === 'little'
    ? 'text-xl py-4 px-8 rounded-2xl'
    : tier === 'middle'
      ? 'text-lg py-3 px-6 rounded-xl'
      : 'text-base py-2.5 px-5 rounded-xl'

  const textSize = tier === 'little' ? 'text-2xl' : tier === 'middle' ? 'text-xl' : 'text-lg'
  const subTextSize = tier === 'little' ? 'text-lg' : tier === 'middle' ? 'text-base' : 'text-sm'

  const advance = (nextStep: OnboardingStep) => setStep(nextStep)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${colors.backgroundFrom}, ${colors.backgroundTo})` }}
    >
      <AnimatePresence mode="wait">
        {/* Step: Dark Intro */}
        {step === 'dark-intro' && (
          <motion.div
            key="dark-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="text-white/30 text-4xl animate-pulse">...</div>
          </motion.div>
        )}

        {/* Step: Mascot Appears */}
        {step === 'mascot-appear' && (
          <motion.div
            key="mascot-appear"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 12 }}
            className="text-center p-6 max-w-sm"
          >
            <div className="text-8xl mb-6 animate-bounce">{theme.icon}</div>
            <div className={`${textSize} text-white font-bold mb-2`}>
              {dialogue.greeting}
            </div>
            <div className={`${subTextSize} text-white/60 mb-6`}>
              I'm {mascot.name}!
            </div>
            <button
              onClick={() => advance('mascot-greet')}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'Hi! 👋' : 'Hello!'}
            </button>
          </motion.div>
        )}

        {/* Step: Mascot Greets by Name */}
        {step === 'mascot-greet' && (
          <motion.div
            key="mascot-greet"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 max-w-sm"
          >
            <div className="text-7xl mb-4">{theme.icon}</div>
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <div className={`${textSize} text-white font-bold mb-2`}>
                {dialogue.nameReaction}
              </div>
              <div className={`${subTextSize} text-white/70`}>
                I've been waiting for you. Are you ready for an adventure?
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => advance('mascot-excited')}
                className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
                style={{ backgroundColor: colors.primary }}
              >
                {tier === 'little' ? 'YEAH! 🎉' : 'Let\'s go!'}
              </button>
              <button
                onClick={() => advance('mascot-excited')}
                className={`${buttonClass} font-bold text-white/80 bg-white/10 transition-all active:scale-95`}
              >
                {tier === 'little' ? 'OK! 😊' : 'Sure!'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step: Mascot Excited + Gift Tease */}
        {step === 'mascot-excited' && (
          <motion.div
            key="mascot-excited"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 max-w-sm"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-7xl mb-4"
            >
              {theme.icon}
            </motion.div>
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <div className={`${textSize} text-white font-bold`}>
                {dialogue.giftIntro}
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl mb-4"
            >
              🎁
            </motion.div>
            <button
              onClick={() => advance('gift-open')}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'Open it! 🎁' : 'Open the gift!'}
            </button>
          </motion.div>
        )}

        {/* Step: Gift Opening */}
        {step === 'gift-open' && (
          <motion.div
            key="gift-open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 max-w-sm"
          >
            <div className={`${textSize} text-white font-bold mb-6`}>
              Starter Pack!
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="bg-white/10 rounded-xl p-3 text-center"
              >
                <div className="text-3xl mb-1">💰</div>
                <div className="text-white font-bold text-sm">200</div>
                <div className="text-white/50 text-xs">{theme.vocabulary.resources.primary}</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="bg-white/10 rounded-xl p-3 text-center"
              >
                <div className="text-3xl mb-1">🥚</div>
                <div className="text-white font-bold text-sm">Mystery</div>
                <div className="text-white/50 text-xs">Egg</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="bg-white/10 rounded-xl p-3 text-center"
              >
                <div className="text-3xl mb-1">🏗️</div>
                <div className="text-white font-bold text-sm">Starter</div>
                <div className="text-white/50 text-xs">Building</div>
              </motion.div>
            </div>
            <div className="text-white/60 text-sm mb-4">
              {theme.icon} "{mascot.celebration} Look at all this!"
            </div>
            <button
              onClick={() => advance('egg-intro')}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'WHOA! 🤩' : 'Awesome!'}
            </button>
          </motion.div>
        )}

        {/* Step: Egg Introduction */}
        {step === 'egg-intro' && (
          <motion.div
            key="egg-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 max-w-sm"
          >
            <div className="text-5xl mb-2">{theme.icon}</div>
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <div className={`${subTextSize} text-white/80`}>
                {dialogue.eggIntro}
              </div>
            </div>
            <motion.div
              animate={{ rotate: [-5, 5, -5], y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-7xl mb-4"
            >
              🥚
            </motion.div>
            <div className="text-white/40 text-sm mb-4 italic">*tap tap tap*</div>
            <button
              onClick={() => advance('egg-hatch')}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'Touch it! 🥚' : 'Touch the egg'}
            </button>
          </motion.div>
        )}

        {/* Step: Egg Hatching */}
        {step === 'egg-hatch' && (
          <EggHatchSequence
            creature={starterCreature}
            mascotCelebration={dialogue.hatchCelebration}
            mascotIcon={theme.icon}
            colors={colors}
            tier={tier}
            buttonClass={buttonClass}
            textSize={textSize}
            onDone={() => {
              setShowConfetti(true)
              advance('creature-born')
            }}
          />
        )}

        {/* Step: Creature Born */}
        {step === 'creature-born' && (
          <motion.div
            key="creature-born"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 max-w-sm"
          >
            <div className={`${textSize} text-white font-bold mb-2`}>
              {starterCreature.name}!
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-8xl mb-4"
            >
              {starterCreature.stages[1]?.icon ?? '🐣'}
            </motion.div>
            <div
              className="text-sm font-medium mb-4 px-3 py-1 rounded-full inline-block"
              style={{ backgroundColor: colors.primary + '30', color: colors.primary }}
            >
              {starterCreature.rarity.toUpperCase()}
            </div>
            <div className="bg-white/10 rounded-2xl p-3 mb-6">
              <div className={`${subTextSize} text-white/80`}>
                {starterCreature.description}
              </div>
            </div>
            <button
              onClick={() => advance('quest-intro')}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'I love it! 💖' : 'Amazing!'}
            </button>
          </motion.div>
        )}

        {/* Step: Quest Introduction */}
        {step === 'quest-intro' && (
          <motion.div
            key="quest-intro"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="text-center p-6 max-w-sm"
          >
            <div className="text-5xl mb-4">{theme.icon}</div>
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <div className={`${textSize} text-white font-bold mb-2`}>
                {dialogue.questIntro}
              </div>
              <div className={`${subTextSize} text-white/70`}>
                Complete {theme.vocabulary.quests.toLowerCase()} to earn {theme.vocabulary.xp}, find creatures, and build your base!
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">⚔️</span>
                <span className="text-white text-sm">Complete {theme.vocabulary.quests.toLowerCase()}</span>
                <span className="text-white/40 ml-auto">→</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-white text-sm">Earn {theme.vocabulary.xp}</span>
                <span className="text-white/40 ml-auto">→</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">🐾</span>
                <span className="text-white text-sm">Discover creatures</span>
                <span className="text-white/40 ml-auto">→</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">🏗️</span>
                <span className="text-white text-sm">Build your base</span>
                <span className="text-white/40 ml-auto">→</span>
              </div>
            </div>
            <button
              onClick={() => advance('welcome-complete')}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'Let\'s DO IT! 🚀' : 'I\'m ready!'}
            </button>
          </motion.div>
        )}

        {/* Step: Welcome Complete */}
        {step === 'welcome-complete' && (
          <motion.div
            key="welcome-complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-6 max-w-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: 2, duration: 0.5 }}
              className="text-7xl mb-4"
            >
              {theme.icon}
            </motion.div>
            <div className={`text-3xl text-white font-bold mb-2`}>
              {dialogue.finalWords}
            </div>
            <div className={`${subTextSize} text-white/60 mb-8`}>
              Your adventure starts now, {member.name}!
            </div>
            <button
              onClick={onComplete}
              className={`${buttonClass} font-bold text-white transition-all active:scale-95 w-full`}
              style={{ backgroundColor: colors.primary }}
            >
              {tier === 'little' ? 'START! 🎉' : 'Begin Adventure'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti
        active={showConfetti}
        tier={tier}
        colors={[colors.primary, colors.secondary, colors.accent, '#FFD700']}
        onComplete={() => setShowConfetti(false)}
      />
    </div>
  )
}

// Sub-component: Egg Hatch Sequence
function EggHatchSequence({
  creature,
  mascotCelebration,
  mascotIcon,
  colors,
  tier,
  buttonClass,
  textSize,
  onDone,
}: {
  creature: ReturnType<typeof getCreaturesForTheme>[0]
  mascotCelebration: string
  mascotIcon: string
  colors: ThemeDefinition['colors']
  tier: AgeTier
  buttonClass: string
  textSize: string
  onDone: () => void
}) {
  const [phase, setPhase] = useState<'crack1' | 'crack2' | 'burst' | 'reveal'>('crack1')

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase('crack2'), 1000))
    timers.push(setTimeout(() => setPhase('burst'), 2000))
    timers.push(setTimeout(() => setPhase('reveal'), 2800))
    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === 'crack1') {
    return (
      <motion.div key="crack1" className="text-center p-6">
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 0.3 }}
          className="text-8xl"
        >
          🥚
        </motion.div>
        <div className="text-white/40 mt-4 italic">*crack...*</div>
      </motion.div>
    )
  }

  if (phase === 'crack2') {
    return (
      <motion.div key="crack2" className="text-center p-6">
        <motion.div
          animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="text-8xl"
        >
          🥚
        </motion.div>
        <div className="text-white/60 mt-4 font-bold">*CRACK CRACK CRACK!*</div>
      </motion.div>
    )
  }

  if (phase === 'burst') {
    return (
      <motion.div
        key="burst"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 2, 1] }}
        className="text-center p-6"
      >
        <div className="text-8xl">💥</div>
      </motion.div>
    )
  }

  // reveal
  return (
    <motion.div
      key="reveal"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-6 max-w-sm"
    >
      <div className="text-white/60 text-sm uppercase tracking-wider mb-2">
        {creature.rarity}!
      </div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-8xl mb-3"
      >
        {creature.stages[1]?.icon ?? '🐣'}
      </motion.div>
      <div className={`${textSize} text-white font-bold mb-1`}>
        {creature.name}
      </div>
      <div className="text-white/50 text-sm mb-4">
        {mascotIcon} "{mascotCelebration}"
      </div>
      <button
        onClick={onDone}
        className={`${buttonClass} font-bold text-white transition-all active:scale-95`}
        style={{ backgroundColor: colors.primary }}
      >
        {tier === 'little' ? 'WOW! 🤩' : 'Incredible!'}
      </button>
    </motion.div>
  )
}
