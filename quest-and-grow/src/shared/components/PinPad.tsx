import { useState, useCallback } from 'react'

interface PinPadProps {
  title: string
  subtitle?: string
  icon: string
  onSubmit: (pin: string) => void
  onCancel: () => void
  darkMode?: boolean
}

export function PinPad({ title, subtitle, icon, onSubmit, onCancel, darkMode = false }: PinPadProps) {
  const [pin, setPin] = useState('')

  const handleInput = useCallback(
    (key: string) => {
      if (key === 'backspace') {
        setPin((p) => p.slice(0, -1))
      } else if (pin.length < 4) {
        const newPin = pin + key
        setPin(newPin)
        if (newPin.length === 4) {
          setTimeout(() => {
            onSubmit(newPin)
            setPin('')
          }, 200)
        }
      }
    },
    [pin, onSubmit],
  )

  const bgClass = darkMode
    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-purple-500 to-pink-500'

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">{icon}</div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-colors ${
                pin.length > i ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'backspace'].map((key, i) => (
            <button
              key={i}
              onClick={() => key !== null && handleInput(key === 'backspace' ? 'backspace' : String(key))}
              className={`p-4 text-2xl rounded-xl transition-colors ${
                key === null
                  ? ''
                  : 'bg-purple-100 hover:bg-purple-200 active:bg-purple-300'
              }`}
              disabled={key === null}
            >
              {key === 'backspace' ? '⌫' : key === null ? '' : key}
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  )
}
