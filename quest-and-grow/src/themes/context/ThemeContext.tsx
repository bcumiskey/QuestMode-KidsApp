import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { ThemeDefinition, ThemeId } from '@core/types/index.ts'
import { getTheme } from '@themes/data/index.ts'

interface ThemeContextValue {
  theme: ThemeDefinition
  themeId: ThemeId
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  themeId: ThemeId
  children: ReactNode
}

export function ThemeProvider({ themeId, children }: ThemeProviderProps) {
  const value = useMemo(() => ({
    theme: getTheme(themeId),
    themeId,
  }), [themeId])

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          '--theme-primary': value.theme.colors.primary,
          '--theme-secondary': value.theme.colors.secondary,
          '--theme-accent': value.theme.colors.accent,
          '--theme-bg-from': value.theme.colors.backgroundFrom,
          '--theme-bg-to': value.theme.colors.backgroundTo,
          '--theme-surface': value.theme.colors.surface,
          '--theme-surface-light': value.theme.colors.surfaceLight,
          '--theme-surface-text': value.theme.colors.surfaceText,
          '--theme-text': value.theme.colors.text,
          '--theme-text-muted': value.theme.colors.textMuted,
          '--theme-xp-color': value.theme.colors.xpColor,
          '--theme-streak-color': value.theme.colors.streakColor,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider')
  return ctx
}
