interface SyncIndicatorProps {
  status: 'connecting' | 'synced' | 'error'
}

export function SyncIndicator({ status }: SyncIndicatorProps) {
  const color = status === 'synced' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
  const textColor = status === 'synced' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-yellow-600'
  const label = status === 'synced' ? 'Connected' : status === 'error' ? 'Error' : 'Syncing...'

  return (
    <span className={`text-xs ${textColor} flex items-center gap-1`}>
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {label}
    </span>
  )
}
