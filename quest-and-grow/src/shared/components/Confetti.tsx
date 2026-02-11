import { useEffect, useState, useCallback } from 'react'
import type { AgeTier } from '@core/types/index.ts'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  shape: 'square' | 'circle' | 'star'
  velocityX: number
  velocityY: number
  opacity: number
}

interface ConfettiProps {
  active: boolean
  tier: AgeTier
  colors?: string[]
  onComplete?: () => void
}

const TIER_CONFIG = {
  little: { count: 150, duration: 5100, gravity: 0.5 },
  middle: { count: 80, duration: 3000, gravity: 0.6 },
  older: { count: 40, duration: 1500, gravity: 0.7 },
}

const DEFAULT_COLORS = ['#FFD700', '#FF69B4', '#00FFFF', '#FF4444', '#00FF00', '#9B59B6', '#FF6B35']

export function Confetti({ active, tier, colors = DEFAULT_COLORS, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  const config = TIER_CONFIG[tier]

  const createPieces = useCallback(() => {
    const shapes: ConfettiPiece['shape'][] = ['square', 'circle', 'star']
    return Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      velocityX: (Math.random() - 0.5) * 6,
      velocityY: Math.random() * -15 - 5,
      opacity: 1,
    }))
  }, [config.count, colors])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }

    setPieces(createPieces())

    const timeout = setTimeout(() => {
      setPieces([])
      onComplete?.()
    }, config.duration)

    return () => clearTimeout(timeout)
  }, [active, createPieces, config.duration, onComplete])

  if (pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti-piece"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            animationDuration: `${config.duration}ms`,
            animationDelay: `${Math.random() * 500}ms`,
          }}
        >
          {piece.shape === 'star' ? (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <polygon
                points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4"
                fill={piece.color}
              />
            </svg>
          ) : piece.shape === 'circle' ? (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: piece.color }}
            />
          ) : (
            <div
              className="w-3 h-3"
              style={{ backgroundColor: piece.color }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-piece {
          animation: confettiFall linear forwards;
        }
      `}</style>
    </div>
  )
}
