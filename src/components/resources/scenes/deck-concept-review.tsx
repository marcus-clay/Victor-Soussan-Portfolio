'use client'

import React from 'react'
import type { SceneProps } from '@/components/skills/scenes/types'
import { DeckStackScene } from './deck-stack'

/** deck-concept-review: the pile of slides of every deck, with the section and the title of this one */
export const READY = true

const T = {
  en: { kicker: 'SECTION 05', title: 'The concept, in one sentence' },
  fr: { kicker: 'SECTION 05', title: 'Le concept, en une phrase' },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return <DeckStackScene lang={lang} a={a} kicker={t.kicker} title={t.title} />
}
