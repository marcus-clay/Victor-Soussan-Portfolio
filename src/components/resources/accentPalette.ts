/**
 * The accent palette of the resource illustrations: ten hues at the same OKLCH lightness (0.655) and
 * chroma (0.11), all inside sRGB and at least 3:1 on white. Grey stays the base of every scene; one
 * accent, one element. `soft` is the same hue at L 0.95 / C 0.03, for a tinted pill or a light fill.
 *
 * `accentFor(id)` picks a hue from the resource id, so a card always gets the same colour (stable between
 * the server and the browser, no hydration mismatch) while the library as a whole looks varied.
 */

/**
 * The mode of the whole library: 'ink' (black and white, the accented element in gray-900) or 'color'
 * (the accented element takes `accentFor(id)`). One switch for every card, never mixed in one grid.
 */
export const ACCENT_MODE: 'ink' | 'color' = 'ink'

const INK = { name: 'encre', hex: '#111827', soft: '#E5E7EB' } as const

export const ACCENTS = [
  { name: 'rouge', hex: '#CB756E', soft: '#FFE7E4' },
  { name: 'corail', hex: '#C87A56', soft: '#FFE9DE' },
  { name: 'orange', hex: '#BF8242', soft: '#FDEBDA' },
  { name: 'ambre', hex: '#AF8B37', soft: '#F8EDD8' },
  { name: 'vert', hex: '#63A266', soft: '#E3F4E2' },
  { name: 'emeraude', hex: '#42A680', soft: '#DDF5E9' },
  { name: 'turquoise', hex: '#0DA5A5', soft: '#D8F5F5' },
  { name: 'ciel', hex: '#389DC7', soft: '#DBF3FF' },
  { name: 'bleu', hex: '#6B90D4', soft: '#E4EFFF' },
  { name: 'violet', hex: '#9284CE', soft: '#EEEBFF' },
] as const

export type Accent = (typeof ACCENTS)[number] | typeof INK

export function accentFor(id: string): Accent {
  if (ACCENT_MODE === 'ink') return INK
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return ACCENTS[h % ACCENTS.length]
}
