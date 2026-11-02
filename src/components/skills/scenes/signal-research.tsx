'use client'

import React from 'react'
import { Badge, Bar, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './signal-research.css'

/** signal-research: a feed of signals with one picked, and the content angle it turns into */
export const READY = true

const T = {
  en: {
    title: 'Signals',
    rows: [
      ['Empty states get a second look', 'UI/UX'],
      ['Agents ask before they act', 'AI'],
    ],
    angle: 'Angle',
    angleText: 'Why calm interfaces age better',
    format: 'Post',
  },
  fr: {
    title: 'Veille',
    rows: [
      ['Les états vides reviennent', 'UI/UX'],
      ['Les agents demandent d’abord', 'IA'],
    ],
    angle: 'Angle',
    angleText: 'Pourquoi les interfaces calmes vieillissent mieux',
    format: 'Post',
  },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <Window title={t.title} className="sc-signal-research-win">
        <div className="sc-signal-research-list">
          {t.rows.map(([title, tag], i) => (
            <div key={title} className="sc-signal-research-row" data-on={i === 1 || undefined}>
              <Text className="sc-signal-research-row__title">{title}</Text>
              <Badge>{tag}</Badge>
            </div>
          ))}
          {[[150, 34], [120, 40], [170, 30]].map(([w, b], i) => (
            <div key={i} className="sc-signal-research-row" data-bars>
              <Bar w={w} h={7} r={3.5} tone={3} />
              <Bar w={b} h={16} r={8} tone={2} />
            </div>
          ))}
        </div>
      </Window>
      <div className="sc-signal-research-angle">
        <span className="sc-signal-research-angle__label">{t.angle}</span>
        <span className="sc-signal-research-angle__text">{t.angleText}</span>
        <Badge>{t.format}</Badge>
      </div>
    </StillStage>
  )
}
