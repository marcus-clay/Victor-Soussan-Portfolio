import type React from 'react'
import type { SceneProps } from '@/components/skills/scenes/types'
import * as claudeCode from './guide-claude-code'
import * as shipToShow from './guide-ship-to-show'
import * as personalOs from './guide-personal-os'
import * as scoping from './template-design-scoping'
import * as poSync from './template-po-design-sync'
import * as teardown from './template-design-teardown'
import * as checklist from './template-feature-checklist'
import * as slicing from './template-ui-slicing'
import * as figmaStatus from './template-figma-file-status'
import * as deckConcept from './deck-concept-review'
import * as deckStudy from './deck-design-study'

/**
 * The pictures of the resource cards, made with the Stageshow kit like the skill pictures: one still of 390 x 300
 * design points (13:10, the ratio of the card's panel) per resource, in the ink accent. A scene is used once its
 * module sets READY to true; until then the card keeps its hand-drawn scene (ResourceScene.tsx).
 *
 */
export const RESOURCE_SCENES: Record<string, { default: React.ComponentType<SceneProps>; READY: boolean }> = {
  'guide-claude-code': claudeCode,
  'guide-ship-to-show': shipToShow,
  'guide-personal-os': personalOs,
  'template-design-scoping': scoping,
  'template-po-design-sync': poSync,
  'template-design-teardown': teardown,
  'template-feature-checklist': checklist,
  'template-ui-slicing': slicing,
  'template-figma-file-status': figmaStatus,
  'deck-concept-review': deckConcept,
  'deck-design-study': deckStudy,
}
