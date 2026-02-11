import { useNavigate, useParams } from 'react-router-dom'
import { useFamilyStore } from '@core/stores/familyStore.ts'
import { useAuthStore } from '@core/auth/authStore.ts'
import { PinPad } from '@shared/components/PinPad.tsx'
import { useState } from 'react'

export function PinLogin() {
  const { memberId } = useParams<{ memberId: string }>()
  const navigate = useNavigate()
  const getMember = useFamilyStore((s) => s.getMember)
  const login = useAuthStore((s) => s.login)
  const loginAdmin = useAuthStore((s) => s.loginAdmin)
  const [error, setError] = useState(false)

  if (!memberId) {
    navigate('/')
    return null
  }

  const member = getMember(memberId)
  if (!member) {
    navigate('/')
    return null
  }

  const isParent = member.role === 'parent'

  function handleSubmit(pin: string) {
    if (pin === member!.pin) {
      if (isParent) {
        loginAdmin()
        navigate('/parent')
      } else {
        login(member!)
        navigate(`/child/${member!.id}/quests`)
      }
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <>
      <PinPad
        title={isParent ? 'Parent Access' : `Hi ${member.name}!`}
        subtitle={isParent ? undefined : 'Enter your secret PIN'}
        icon={isParent ? '🔐' : member.avatar}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        darkMode={isParent}
      />
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce-in z-50">
          Incorrect PIN — try again!
        </div>
      )}
    </>
  )
}
