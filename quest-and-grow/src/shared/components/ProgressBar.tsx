interface ProgressBarProps {
  percent: number
  colorFrom?: string
  colorTo?: string
  height?: string
  bgColor?: string
}

export function ProgressBar({
  percent,
  colorFrom = '#4ade80',
  colorTo = '#10b981',
  height = 'h-3',
  bgColor = 'bg-gray-200',
}: ProgressBarProps) {
  return (
    <div className={`${height} ${bgColor} rounded-full overflow-hidden`}>
      <div
        className={`h-full rounded-full transition-all duration-500`}
        style={{
          width: `${Math.min(100, Math.max(0, percent))}%`,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
        }}
      />
    </div>
  )
}
