import type React from 'react'
import type { SceneProps } from './types'
import * as s0 from './socle'
import * as s1 from './personal-os'
import * as s2 from './direction-design'
import * as s3 from './spec-ideation'
import * as s4 from './karpathy-guidelines'
import * as s5 from './find-skills'
import * as s6 from './ux-et-design-thinking'
import * as s7 from './ux-designer'
import * as s8 from './impeccable'
import * as s9 from './ui-skills'
import * as s10 from './taste-skill'
import * as s11 from './designer-skills'
import * as s12 from './layers-skills'
import * as s13 from './ai-design-skills'
import * as s14 from './creative-director'
import * as s15 from './signal-research'
import * as s16 from './facilitation-ateliers'
import * as s17 from './prototype-anime'
import * as s18 from './ship-to-show'
import * as s19 from './figma-console-mcp'
import * as s20 from './emil-design-eng'
import * as s21 from './transitions-dev'
import * as s22 from './transitions-polish'
import * as s23 from './drawing-animated-diagrams'
import * as s24 from './card-illustrations'
import * as s25 from './marker-sketch'
import * as s26 from './diagram-storytelling'
import * as s27 from './sober-writing'
import * as s28 from './francais-parfait'
import * as s29 from './brand-system'
import * as s30 from './slides'
import * as s31 from './pptx'

/** One scene per skill, keyed by the skill's id. A scene is used once its module sets READY to true. */
export const SCENES: Record<string, { default: React.ComponentType<SceneProps>; READY: boolean }> = {
  'socle': s0,
  'personal-os': s1,
  'direction-design': s2,
  'spec-ideation': s3,
  'karpathy-guidelines': s4,
  'find-skills': s5,
  'ux-et-design-thinking': s6,
  'ux-designer': s7,
  'impeccable': s8,
  'ui-skills': s9,
  'taste-skill': s10,
  'designer-skills': s11,
  'layers-skills': s12,
  'ai-design-skills': s13,
  'creative-director': s14,
  'signal-research': s15,
  'facilitation-ateliers': s16,
  'prototype-anime': s17,
  'ship-to-show': s18,
  'figma-console-mcp': s19,
  'emil-design-eng': s20,
  'transitions-dev': s21,
  'transitions-polish': s22,
  'drawing-animated-diagrams': s23,
  'card-illustrations': s24,
  'marker-sketch': s25,
  'diagram-storytelling': s26,
  'sober-writing': s27,
  'francais-parfait': s28,
  'brand-system': s29,
  'slides': s30,
  'pptx': s31,
}
