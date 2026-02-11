import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '@themes/hooks/useTheme.ts'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useBuildingStore } from '@base-builder/stores/buildingStore.ts'
import { getBuildingsForTheme } from '@base-builder/data/buildingDefinitions.ts'
import { canBuild, getConstructionProgress, getTimeRemaining, getBonusDescription } from '@base-builder/services/buildingService.ts'
import { calculateLevel } from '@core/services/dateUtils.ts'
import { ProgressBar } from '@shared/components/ProgressBar.tsx'
import { Modal } from '@shared/components/Modal.tsx'
import type { BuildingDefinition } from '@core/types/index.ts'

export function BaseGrid() {
  const { memberId } = useParams<{ memberId: string }>()
  const theme = useTheme()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const loadBuildings = useBuildingStore((s) => s.loadBuildings)
  const constructBuilding = useBuildingStore((s) => s.constructBuilding)
  const upgradeBuilding = useBuildingStore((s) => s.upgradeBuilding)
  const checkAllConstruction = useBuildingStore((s) => s.checkAllConstruction)
  const getBuilding = useBuildingStore((s) => s.getBuilding)

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [isBuildingAction, setIsBuildingAction] = useState(false)

  useEffect(() => {
    if (memberId) {
      loadBuildings(memberId)
    }
  }, [memberId, loadBuildings])

  // Check for completed constructions periodically
  useEffect(() => {
    if (!memberId) return
    checkAllConstruction(memberId)
    const interval = setInterval(() => checkAllConstruction(memberId), 30000)
    return () => clearInterval(interval)
  }, [memberId, checkAllConstruction])

  if (!memberId || !member) return null

  const playerLevel = calculateLevel(member.stats.xp)
  const themeBuildings = getBuildingsForTheme(member.theme)

  const handleBuild = async (definition: BuildingDefinition) => {
    if (isBuildingAction) return
    setIsBuildingAction(true)
    try {
      const existing = getBuilding(memberId, definition.slot)
      if (existing && existing.status === 'built') {
        await upgradeBuilding(memberId, existing, definition)
      } else if (!existing) {
        await constructBuilding(memberId, definition)
      }
    } finally {
      setIsBuildingAction(false)
      setSelectedSlot(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl text-center">
        <h2 className="text-xl font-bold text-gray-800">Your {theme.name} Base</h2>
        <p className="text-gray-500 text-sm mt-1">
          Build and upgrade structures to boost your powers!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {themeBuildings.map((def) => {
          const existing = getBuilding(memberId, def.slot)
          const locked = playerLevel < def.unlockLevel
          const isConstructing = existing?.status === 'constructing'
          const isBuilt = existing?.status === 'built'
          const progress = existing ? getConstructionProgress(existing) : 0
          const timeLeft = existing ? getTimeRemaining(existing) : ''

          return (
            <button
              key={def.id}
              onClick={() => !locked && setSelectedSlot(def.slot)}
              disabled={locked || isConstructing}
              className={`bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl text-center aspect-square flex flex-col items-center justify-center transition-all ${
                locked
                  ? 'opacity-40'
                  : isConstructing
                    ? 'ring-2 ring-yellow-400'
                    : isBuilt
                      ? 'ring-2 ring-green-400'
                      : 'hover:scale-105 active:scale-95'
              }`}
            >
              <div className="text-3xl mb-1">
                {locked ? '🔒' : def.icon}
              </div>
              <div className={`text-sm font-medium ${locked ? 'text-gray-400' : 'text-gray-800'}`}>
                {locked ? `Lv.${def.unlockLevel}` : def.name}
              </div>
              {isBuilt && existing && (
                <div className="text-xs text-green-600 mt-1">
                  Level {existing.level}/{def.levels.length}
                </div>
              )}
              {isConstructing && (
                <div className="w-full mt-2">
                  <ProgressBar percent={progress} height="h-1.5" />
                  <div className="text-xs text-yellow-600 mt-0.5">{timeLeft}</div>
                </div>
              )}
              {!locked && !isConstructing && !isBuilt && (
                <div className="text-xs text-gray-400 mt-1">Tap to build</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Building detail modal */}
      {selectedSlot !== null && (() => {
        const def = themeBuildings.find((b) => b.slot === selectedSlot)
        if (!def) return null
        const existing = getBuilding(memberId, def.slot)
        const isBuilt = existing?.status === 'built'
        const nextLevel = isBuilt ? (existing?.level ?? 0) + 1 : 1
        const levelDef = def.levels[nextLevel - 1]
        const maxLevel = !levelDef
        const check = levelDef
          ? canBuild(def, nextLevel, member.stats.resources, playerLevel)
          : { canBuild: false, reason: 'Max level' }

        return (
          <Modal onClose={() => setSelectedSlot(null)}>
            <div className="space-y-4">
              <div className="text-4xl">{def.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{def.name}</h3>
              <p className="text-gray-500 text-sm">{def.description}</p>

              {isBuilt && existing && (
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="text-green-600 font-medium">Level {existing.level}</div>
                  <div className="text-green-500 text-sm">
                    {getBonusDescription(def.levels[existing.level - 1].bonus, def.levels[existing.level - 1].bonusValue)}
                  </div>
                </div>
              )}

              {!maxLevel && levelDef && (
                <>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-gray-700 font-medium text-sm mb-2">
                      {isBuilt ? `Upgrade to Level ${nextLevel}` : 'Build Cost'}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {Object.entries(levelDef.cost)
                        .filter(([, v]) => (v ?? 0) > 0)
                        .map(([key, value]) => (
                          <span key={key} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                            {value} {key}
                          </span>
                        ))}
                    </div>
                    {levelDef.buildTimeMinutes > 0 && (
                      <div className="text-gray-500 text-xs mt-1">
                        Build time: {levelDef.buildTimeMinutes < 60
                          ? `${levelDef.buildTimeMinutes}m`
                          : `${Math.floor(levelDef.buildTimeMinutes / 60)}h ${levelDef.buildTimeMinutes % 60 > 0 ? ` ${levelDef.buildTimeMinutes % 60}m` : ''}`}
                      </div>
                    )}
                    <div className="text-purple-600 text-xs mt-1">
                      Bonus: {getBonusDescription(levelDef.bonus, levelDef.bonusValue)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuild(def)}
                    disabled={!check.canBuild || isBuildingAction}
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                      check.canBuild && !isBuildingAction
                        ? 'bg-green-500 text-white hover:bg-green-400 active:scale-95'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {isBuildingAction ? 'Building...' : !check.canBuild ? check.reason : isBuilt ? 'Upgrade' : 'Build'}
                  </button>
                </>
              )}

              {maxLevel && (
                <div className="bg-yellow-50 rounded-xl p-3 text-yellow-700 font-medium">
                  Max level reached!
                </div>
              )}

              <button
                onClick={() => setSelectedSlot(null)}
                className="text-gray-400 text-sm hover:text-gray-600"
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
