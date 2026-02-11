import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '@themes/hooks/useTheme.ts'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useCreatureStore } from '@creatures/stores/creatureStore.ts'
import { getCreaturesForTheme, getCreatureDefinition, RARITY_COLORS, RARITY_LABELS } from '@creatures/data/creatureDefinitions.ts'
import { getCreatureIcon, getEvolutionProgress, getHappinessIcon, canEvolve } from '@creatures/services/evolutionService.ts'
import { Modal } from '@shared/components/Modal.tsx'
import { ProgressBar } from '@shared/components/ProgressBar.tsx'
import { ErrorBoundary } from '@shared/components/ErrorBoundary.tsx'
import type { Creature } from '@core/types/index.ts'

export function CreatureCollection() {
  return (
    <ErrorBoundary>
      <CreatureCollectionInner />
    </ErrorBoundary>
  )
}

function CreatureCollectionInner() {
  const { memberId } = useParams<{ memberId: string }>()
  const theme = useTheme()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const loadCreatures = useCreatureStore((s) => s.loadCreatures)
  const creatures = useCreatureStore((s) => s.getCreaturesByMember(memberId ?? ''))
  const careFor = useCreatureStore((s) => s.careFor)
  const tryEvolve = useCreatureStore((s) => s.tryEvolve)

  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null)
  const [caring, setCaring] = useState(false)
  const [evolving, setEvolving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (memberId) loadCreatures(memberId)
  }, [memberId, loadCreatures])

  if (!memberId || !member) return null

  const themeCreatures = getCreaturesForTheme(member.theme)
  const discoveredIds = new Set(creatures.map((c) => c.definitionId))

  const handleCare = async (creature: Creature) => {
    setCaring(true)
    try {
      const result = await careFor(memberId, creature.id)
      if (result) {
        setSelectedCreature(result)
        setMessage('Care given! +bond +care')
      } else {
        setMessage('Already cared for today!')
      }
    } finally {
      setCaring(false)
      setTimeout(() => setMessage(null), 2000)
    }
  }

  const handleEvolve = async (creature: Creature) => {
    setEvolving(true)
    try {
      const result = await tryEvolve(memberId, creature.id)
      if (result) {
        setSelectedCreature(result)
        setMessage(`Evolved to ${result.stage}!`)
      }
    } finally {
      setEvolving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 shadow-xl text-center">
        <h2 className="text-xl font-bold text-white">Creature Collection</h2>
        <p className="text-white/60 text-sm mt-1">
          {creatures.length}/{themeCreatures.length} discovered
        </p>
      </div>

      {/* Discovered creatures */}
      {creatures.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">Your Creatures</h3>
          <div className="grid grid-cols-2 gap-3">
            {creatures.map((creature) => {
              const definition = getCreatureDefinition(creature.definitionId)
              if (!definition) return null
              const icon = getCreatureIcon(creature)
              const happiness = getHappinessIcon(creature.happiness)
              const progress = getEvolutionProgress(creature)

              return (
                <button
                  key={creature.id}
                  onClick={() => setSelectedCreature(creature)}
                  className="bg-white/10 backdrop-blur rounded-2xl p-4 shadow-xl text-center transition-all hover:scale-105 active:scale-95"
                >
                  <div className="text-3xl mb-1">{icon}</div>
                  <div className="text-sm font-medium text-white">{definition.name}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-xs" style={{ color: RARITY_COLORS[definition.rarity] }}>
                      {RARITY_LABELS[definition.rarity]}
                    </span>
                    <span className="text-xs">{happiness}</span>
                  </div>
                  {creature.stage !== 'adult' && (
                    <div className="mt-2">
                      <ProgressBar percent={progress.overall} height="h-1" />
                    </div>
                  )}
                  <div className="text-xs text-white/50 capitalize mt-1">{creature.stage}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Undiscovered silhouettes */}
      <div className="space-y-3">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">
          {creatures.length === 0 ? 'Waiting to be Discovered' : 'Undiscovered'}
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {themeCreatures
            .filter((def) => !discoveredIds.has(def.id))
            .map((def) => (
              <div
                key={def.id}
                className="bg-white/10 backdrop-blur rounded-xl p-3 shadow-lg text-center aspect-square flex flex-col items-center justify-center"
              >
                <div className="text-2xl opacity-20">❓</div>
                <div
                  className="text-xs mt-1 font-medium"
                  style={{ color: RARITY_COLORS[def.rarity] }}
                >
                  {RARITY_LABELS[def.rarity]}
                </div>
              </div>
            ))}
        </div>
        {creatures.length === 0 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 shadow-xl text-center text-white/60 text-sm">
            Complete {theme.vocabulary.quests.toLowerCase()} to attract creatures!
          </div>
        )}
      </div>

      {/* Creature detail modal */}
      {selectedCreature && (() => {
        const definition = getCreatureDefinition(selectedCreature.definitionId)
        if (!definition) return null
        const icon = getCreatureIcon(selectedCreature)
        const happiness = getHappinessIcon(selectedCreature.happiness)
        const progress = getEvolutionProgress(selectedCreature)
        const evolveCheck = canEvolve(selectedCreature)

        return (
          <Modal onClose={() => setSelectedCreature(null)}>
            <div className="space-y-4">
              <div className="text-5xl">{icon}</div>
              <h3 className="text-xl font-bold text-white">{definition.name}</h3>
              <div
                className="text-sm font-medium"
                style={{ color: RARITY_COLORS[definition.rarity] }}
              >
                {RARITY_LABELS[definition.rarity]} &middot; {selectedCreature.stage} {happiness}
              </div>
              <p className="text-white/60 text-sm">{definition.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-pink-500/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-pink-400">{selectedCreature.carePoints}</div>
                  <div className="text-xs text-pink-300/70">Care</div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-blue-400">{selectedCreature.bondPoints}</div>
                  <div className="text-xs text-blue-300/70">Bond</div>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-2">
                  <div className="text-lg font-bold text-yellow-400">{selectedCreature.careStreak}</div>
                  <div className="text-xs text-yellow-300/70">Streak</div>
                </div>
              </div>

              {/* Evolution progress */}
              {selectedCreature.stage !== 'adult' && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-white">Evolution Progress</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="w-12">Care</span>
                      <div className="flex-1"><ProgressBar percent={progress.carePercent} height="h-1.5" colorFrom="#ec4899" colorTo="#f472b6" /></div>
                      <span>{progress.carePercent}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="w-12">Bond</span>
                      <div className="flex-1"><ProgressBar percent={progress.bondPercent} height="h-1.5" colorFrom="#3b82f6" colorTo="#60a5fa" /></div>
                      <span>{progress.bondPercent}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="w-12">Time</span>
                      <div className="flex-1"><ProgressBar percent={progress.timePercent} height="h-1.5" colorFrom="#f59e0b" colorTo="#fbbf24" /></div>
                      <span>{progress.timePercent}%</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedCreature.stage === 'adult' && (
                <div className="bg-green-500/20 rounded-xl p-3 text-green-400 font-medium">
                  Fully evolved!
                </div>
              )}

              {message && (
                <div className="bg-purple-500/20 rounded-xl p-2 text-purple-400 font-medium animate-pulse">
                  {message}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCare(selectedCreature)}
                  disabled={caring}
                  className="flex-1 py-3 rounded-xl font-bold bg-pink-500 text-white hover:bg-pink-400 transition-all disabled:opacity-50"
                >
                  {caring ? '...' : '💝 Care'}
                </button>
                {evolveCheck.canEvolve && (
                  <button
                    onClick={() => handleEvolve(selectedCreature)}
                    disabled={evolving}
                    className="flex-1 py-3 rounded-xl font-bold bg-purple-500 text-white hover:bg-purple-400 transition-all disabled:opacity-50"
                  >
                    {evolving ? '...' : '✨ Evolve!'}
                  </button>
                )}
              </div>

              {!evolveCheck.canEvolve && selectedCreature.stage !== 'adult' && evolveCheck.reason && (
                <div className="text-white/40 text-xs">{evolveCheck.reason}</div>
              )}

              <button
                onClick={() => setSelectedCreature(null)}
                className="text-white/40 text-sm hover:text-white/60"
              >
                Close
              </button>
            </div>
          </Modal>
        )
      })()}
    </div>
  )
}
