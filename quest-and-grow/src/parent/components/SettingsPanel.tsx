import { useFamilyStore } from '@core/stores/familyStore.ts'

export function SettingsPanel() {
  const settings = useFamilyStore((s) => s.familyInfo?.settings)
  const updateSettings = useFamilyStore((s) => s.updateSettings)

  if (!settings) return null

  return (
    <div className="space-y-4">
      {/* Deadlines */}
      <div className="bg-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">⏰ Deadlines</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Morning tasks due by</span>
            <input
              type="time"
              value={settings.morningDeadline}
              onChange={(e) => updateSettings({ morningDeadline: e.target.value })}
              className="bg-black/30 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Evening tasks due by</span>
            <input
              type="time"
              value={settings.eveningDeadline}
              onChange={(e) => updateSettings({ eveningDeadline: e.target.value })}
              className="bg-black/30 rounded-lg px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>

      {/* Auto-Approve */}
      <div className="bg-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">✅ Approval Mode</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Auto-Approve Tasks</div>
            <div className="text-white/60 text-sm">Tasks complete instantly without parent review</div>
          </div>
          <button
            onClick={() => updateSettings({ autoApproveDefault: !settings.autoApproveDefault })}
            className={`w-14 h-8 rounded-full transition-all flex items-center ${
              settings.autoApproveDefault ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-all ${
                settings.autoApproveDefault ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Hard Day Mode */}
      <div className="bg-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">💛 Hard Day Mode</h3>
        <p className="text-white/60 text-sm mb-4">
          Reduces to essentials only, extends deadlines by 2 hours, protects streaks, and uses a softer tone.
        </p>
        <button
          onClick={() =>
            updateSettings({
              hardDayActive: !settings.hardDayActive,
              hardDayExpires: settings.hardDayActive ? null : new Date(new Date().setHours(23, 59, 59)).toISOString(),
            })
          }
          className={`w-full py-3 rounded-xl font-medium transition-all ${
            settings.hardDayActive
              ? 'bg-yellow-500 text-yellow-900'
              : 'bg-yellow-500/30 text-yellow-300 hover:bg-yellow-500/40'
          }`}
        >
          {settings.hardDayActive ? '💛 Hard Day Active — Tap to Deactivate' : '💛 Activate Hard Day Mode'}
        </button>
      </div>
    </div>
  )
}
