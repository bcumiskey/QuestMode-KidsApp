import { useState, useEffect } from 'react'
import { Outlet, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useAuthStore } from '@core/auth/authStore.ts'
import { ThemeProvider } from '@themes/context/ThemeContext.tsx'
import { ProgressBar } from '@shared/components/ProgressBar.tsx'
import { AnimatedPage } from '@shared/components/AnimatedPage.tsx'
import { ErrorBoundary } from '@shared/components/ErrorBoundary.tsx'
import { DailyLoginReward } from '@shared/components/DailyLoginReward.tsx'
import { OnboardingFlow } from '@shared/components/OnboardingFlow.tsx'
import { calculateLevel, xpProgress } from '@core/services/dateUtils.ts'
import { getAgeTier } from '@core/types/index.ts'
import { getTheme } from '@themes/data/index.ts'

const tabs = [
  { id: 'quests', label: 'Quests', icon: '⚔️' },
  { id: 'base', label: 'Base', icon: '🏗️' },
  { id: 'creatures', label: 'Creatures', icon: '🐾' },
  { id: 'rewards', label: 'Rewards', icon: '🎁' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export function ChildLayout() {
  const { memberId } = useParams<{ memberId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const member = useFamilyStore((s) => s.getMember(memberId ?? ''))
  const logout = useAuthStore((s) => s.logout)
  const currentMember = useAuthStore((s) => s.currentMember)

  if (!memberId || !member || member.role !== 'child') {
    return <Navigate to="/" replace />
  }

  if (!currentMember || currentMember.id !== memberId) {
    return <Navigate to={`/login/${memberId}`} replace />
  }

  const level = calculateLevel(member.stats?.xp ?? 0)
  const progress = xpProgress(member.stats?.xp ?? 0)
  const activeTab = location.pathname.split('/').pop() ?? 'quests'
  const tier = getAgeTier(member.age)
  const themeData = getTheme(member.theme)

  // Daily login reward check
  const [showLoginReward, setShowLoginReward] = useState(false)
  const today = new Date().toISOString().slice(0, 10)
  const updateMember = useFamilyStore((s) => s.updateMember)

  useEffect(() => {
    if (member.lastLoginDate !== today) {
      setShowLoginReward(true)
    }
  }, [member.lastLoginDate, today])

  const handleClaimLoginReward = async (day: number, _currency: number) => {
    const newStreak = member.lastLoginDate === new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      ? (member.loginStreak ?? 0) + 1
      : 1
    await updateMember(memberId, {
      lastLoginDate: today,
      loginStreak: newStreak,
      lastLoginRewardDay: day,
    })
    setShowLoginReward(false)
  }

  const handleOnboardingComplete = async () => {
    await updateMember(memberId, { onboardingComplete: true })
  }

  // Show onboarding for first-time users
  if (!member.onboardingComplete) {
    return (
      <ThemeProvider themeId={member.theme}>
        <OnboardingFlow
          member={member}
          theme={themeData}
          onComplete={handleOnboardingComplete}
        />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider themeId={member.theme}>
      <div
        className="min-h-screen"
        style={{
          background: `linear-gradient(135deg, var(--theme-bg-from), var(--theme-bg-to))`,
        }}
      >
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-lg mx-auto p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => { logout(); navigate('/') }}
                className="text-white/80 hover:text-white text-2xl"
              >
                ←
              </button>
              <div className="text-4xl">{member.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-xl">{member.name}</span>
                  <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-sm">
                    Lv.{level}
                  </span>
                </div>
                <div className="mt-1">
                  <ProgressBar
                    percent={progress.percent}
                    colorFrom="#facc15"
                    colorTo="#fde68a"
                    height="h-2"
                    bgColor="bg-black/30"
                  />
                  <div className="text-white/70 text-xs mt-0.5">
                    {progress.current.toLocaleString()} / {progress.needed.toLocaleString()} XP
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm">
                  {member.stats?.streak ?? 0} 🔥
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="flex bg-black/20 rounded-xl p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(`/child/${memberId}/${tab.id}`)}
                className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-800 shadow'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto p-4 pb-20">
          <ErrorBoundary>
            <AnimatedPage key={activeTab}>
              <Outlet />
            </AnimatedPage>
          </ErrorBoundary>
        </div>

        {/* Daily Login Reward */}
        {showLoginReward && themeData && (
          <DailyLoginReward
            currentDay={(member.loginStreak ?? 0) % 7 + 1}
            tier={tier}
            theme={themeData}
            onClaim={handleClaimLoginReward}
            onClose={() => setShowLoginReward(false)}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
