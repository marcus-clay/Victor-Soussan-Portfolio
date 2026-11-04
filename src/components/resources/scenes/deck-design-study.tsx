'use client'

import React from 'react'
import type { SceneProps } from '@/components/skills/scenes/types'
import { DeckStackScene } from './deck-stack'

/** deck-design-study: the pile of slides of every deck, with the section and the title of this one */
export const READY = true

const T = {
  en: { kicker: 'SECTION 02', title: 'What the research showed' },
  fr: { kicker: 'SECTION 02', title: 'Ce que la recherche a montré' },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return <DeckStackScene lang={lang} a={a} kicker={t.kicker} title={t.title} />
}
