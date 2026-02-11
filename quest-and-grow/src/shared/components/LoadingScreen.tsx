export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🎮</div>
        <div className="text-white text-2xl font-bold">Quest & Grow</div>
        <div className="text-white/70 mt-2">Loading your adventure...</div>
      </div>
    </div>
  )
}
