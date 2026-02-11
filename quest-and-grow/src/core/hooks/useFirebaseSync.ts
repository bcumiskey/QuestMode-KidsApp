import { useEffect, useRef } from 'react'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { seedFamilyData } from '@core/services/seedService.ts'

export function useFirebaseSync() {
  const startSync = useFamilyStore((s) => s.startSync)
  const stopSync = useFamilyStore((s) => s.stopSync)
  const syncStatus = useFamilyStore((s) => s.syncStatus)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    async function init() {
      // Seed data if first launch
      await seedFamilyData()
      // Start real-time listeners
      startSync()
    }

    init()

    return () => {
      stopSync()
    }
  }, [startSync, stopSync])

  return { syncStatus }
}
