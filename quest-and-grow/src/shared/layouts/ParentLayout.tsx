import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuthStore } from '@core/auth/authStore.ts'
import { SyncIndicator } from '@shared/components/SyncIndicator.tsx'
import { AnimatedPage } from '@shared/components/AnimatedPage.tsx'
import { useFamilyStore } from '@core/stores/familyStore.ts'

const tabs = [
  { id: '', label: 'Overview' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'children', label: 'Children' },
  { id: 'settings', label: 'Settings' },
]

export function ParentLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const adminMode = useAuthStore((s) => s.adminMode)
  const logout = useAuthStore((s) => s.logout)
  const syncStatus = useFamilyStore((s) => s.syncStatus)

  if (!adminMode) {
    return <Navigate to="/login/parent" replace />
  }

  const activeTab = location.pathname.replace('/parent', '').replace('/', '') || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="bg-black/30 p-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold">👨‍👩‍👧‍👦 Parent Dashboard</h1>
            <button
              onClick={() => { logout(); navigate('/') }}
              className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Exit
            </button>
          </div>
          <SyncIndicator status={syncStatus} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex bg-black/20 rounded-xl p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(`/parent${tab.id ? `/${tab.id}` : ''}`)}
              className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-800'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <AnimatedPage key={activeTab}>
          <Outlet />
        </AnimatedPage>
      </div>
    </div>
  )
}
