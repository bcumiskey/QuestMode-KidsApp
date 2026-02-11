import { useFirebaseSync } from '@core/hooks/useFirebaseSync.ts'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { AppRouter } from './app/Router.tsx'
import { LoadingScreen } from '@shared/components/LoadingScreen.tsx'

function App() {
  useFirebaseSync()
  const syncStatus = useFamilyStore((s) => s.syncStatus)
  const familyInfo = useFamilyStore((s) => s.familyInfo)

  if (syncStatus === 'connecting' || !familyInfo) {
    return <LoadingScreen />
  }

  return <AppRouter />
}

export default App
