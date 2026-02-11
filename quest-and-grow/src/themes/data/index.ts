import type { ThemeDefinition, ThemeId } from '@core/types/index.ts'
import { harryPotterTheme } from './harryPotter.ts'
import { jurassicParkTheme } from './jurassicPark.ts'
import { sonicMarioTheme } from './sonicMario.ts'
import { disneyPrincessTheme } from './disneyPrincess.ts'
import { marvelTheme } from './marvel.ts'

export const themes: Record<ThemeId, ThemeDefinition> = {
  'harry-potter': harryPotterTheme,
  'jurassic-park': jurassicParkTheme,
  'sonic-mario': sonicMarioTheme,
  'disney-princess': disneyPrincessTheme,
  'marvel': marvelTheme,
}

export function getTheme(id: ThemeId): ThemeDefinition {
  return themes[id]
}
