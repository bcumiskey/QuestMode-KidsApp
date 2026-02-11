import { useThemeContext } from '@themes/context/ThemeContext.tsx'
import type { ThemeDefinition, QuestCategory } from '@core/types/index.ts'

export function useTheme(): ThemeDefinition {
  return useThemeContext().theme
}

export function useThemedText() {
  const { theme } = useThemeContext()

  return {
    quest: theme.vocabulary.quest,
    quests: theme.vocabulary.quests,
    complete: theme.vocabulary.complete,
    xp: theme.vocabulary.xp,
    greeting: theme.vocabulary.greeting,
    farewell: theme.vocabulary.farewell,
    celebration: theme.vocabulary.celebration,
    categoryName: (cat: QuestCategory) => theme.vocabulary.categories[cat],
    resourceName: (type: 'primary' | 'secondary' | 'rare') => theme.vocabulary.resources[type],
  }
}
