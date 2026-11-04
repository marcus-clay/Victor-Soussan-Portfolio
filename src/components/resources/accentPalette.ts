/**
 * The accent palette of the illustrations (the Resources and the skill pictures): ten hues, as vivid as the product shots
 * they imitate. Each one is a strong accent (`hex`, for the one element the story is about), a pale tint of it (`soft`,
 * for a chip or a light fill), the three stops of a diagonal ground (`ground`: the hue, a deeper step, a light corner of
 * the same family) and the colour of text laid on the accent (`on`: always white: the accents are deep enough for white text, which is how text is laid on a coloured container).
 *
 * Grey stays the base of every scene: white and neutral surfaces on a vivid ground, one accent, one element.
 */

/**
 * The mode of the whole library: 'ink' (black and white, the accented element in gray-900) or 'color'
 * (the accented element takes `accentFor(id)`). One switch for every card, never mixed in one grid.
 */
export const ACCENT_MODE: 'ink' | 'color' = 'color'

/** A palette colour: the accent, its pale tint, the three stops of its ground and the text colour on the accent */
export type Accent = {
  name: string
  hex: string
  soft: string
  ground?: readonly [string, string, string]
  on?: string
}

const INK = { name: 'encre', hex: '#111827', soft: '#E5E7EB' } as const
const WHITE = '#FFFFFF'

export const ACCENTS = [
  { name: 'rouge', hex: '#F43F5E', soft: '#FFDCE3', ground: ['#FF6F8A', '#F43F5E', '#FFAABA'], on: WHITE },
  { name: 'corail', hex: '#EE4B28', soft: '#FFE3DA', ground: ['#FF8A4C', '#FF5A36', '#FFB38A'], on: WHITE },
  { name: 'orange', hex: '#E8650A', soft: '#FFE8CF', ground: ['#FFA544', '#FF8A1F', '#FFC78A'], on: WHITE },
  { name: 'ambre', hex: '#D97706', soft: '#FFF0C7', ground: ['#FFCB3D', '#FFA51A', '#FFE08A'], on: WHITE },
  { name: 'vert', hex: '#4CA516', soft: '#E3F6CF', ground: ['#A6E22E', '#62C21B', '#D6F59B'], on: WHITE },
  { name: 'emeraude', hex: '#059669', soft: '#CFF5E6', ground: ['#34D6A6', '#0FB27F', '#8CEFCF'], on: WHITE },
  { name: 'turquoise', hex: '#0E94A8', soft: '#D3F4F9', ground: ['#2BD4D4', '#0FA3C4', '#8DEBE9'], on: WHITE },
  { name: 'ciel', hex: '#0284C7', soft: '#D2EEFC', ground: ['#4CC4FA', '#1AA3EB', '#A8E3FF'], on: WHITE },
  { name: 'bleu', hex: '#3C70E8', soft: '#E6EEFD', ground: ['#5B8CFF', '#3366F5', '#A6BEFF'], on: WHITE },
  { name: 'violet', hex: '#6D4AFF', soft: '#E5DEFF', ground: ['#9B7CFF', '#6C4CF5', '#C7B8FF'], on: WHITE },
  { name: 'fuchsia', hex: '#C026D3', soft: '#F8DDFB', ground: ['#E069EE', '#C026D3', '#F0A6F7'], on: WHITE },
] as const satisfies readonly Accent[]

type HueName = (typeof ACCENTS)[number]['name']

/**
 * The hue of each resource, chosen on purpose rather than by hash. On the soft grey of the tiles the interface is white and
 * grey, and the colour is only a small touch (a chip, a tinted row, a check): Claude's coral for the Claude Code guide, one
 * a hue of its own for each deck (a deck added later takes the next free one), and neighbours in the list never share a family.
 */
const RESOURCE_HUE: Record<string, HueName> = {
  'guide-claude-code': 'corail',
  'guide-personal-os': 'ambre',
  'guide-ship-to-show': 'turquoise',
  'template-design-scoping': 'bleu',
  'template-po-design-sync': 'vert',
  'template-design-teardown': 'rouge',
  'template-feature-checklist': 'emeraude',
  'template-ui-slicing': 'ciel',
  'template-figma-file-status': 'violet',
  'deck-concept-review': 'fuchsia',
  'deck-design-study': 'orange',
}

export function accentFor(id: string): Accent {
  if (ACCENT_MODE === 'ink') return INK
  const named = ACCENTS.find((a) => a.name === RESOURCE_HUE[id])
  if (named) return named
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return ACCENTS[h % ACCENTS.length]
}
