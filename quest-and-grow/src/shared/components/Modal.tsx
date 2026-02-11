import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in"
        style={{ backgroundColor: 'var(--theme-surface, #1C1C2E)', color: 'var(--theme-text, #F5F5F5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
