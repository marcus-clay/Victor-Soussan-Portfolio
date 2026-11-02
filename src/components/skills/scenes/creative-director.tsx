'use client'

import React from 'react'
import { Badge, Icon, Meter, Text } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './creative-director.css'

/** creative-director: an insight note stuck on a concept card, and the concept scored against its criteria */
export const READY = true

const T = {
  en: {
    insight: 'Insight',
    insightText: 'People plan trips by feeling, not by dates.',
    badge: 'Refined',
    title: 'Trip by mood',
    sub: 'Pick a feeling, get a route.',
    crit: [
      ['Originality', 0.86],
      ['Insight fit', 0.94],
      ['Craft', 0.7],
    ],
  },
  fr: {
    insight: 'Insight',
    insightText: 'On prépare un voyage à l’envie, pas à la date.',
    badge: 'Affiné',
    title: 'Voyage à l’humeur',
    sub: 'Choisissez une envie, obtenez un trajet.',
    crit: [
      ['Originalité', 0.86],
      ['Justesse', 0.94],
      ['Exécution', 0.7],
    ],
  },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <section className="sc-creative-director-card">
        <div className="sc-creative-director-head">
          <span>Concept</span>
          <Badge tone="accent" icon={<Icon name="check" size={11} stroke={2} />}>{t.badge}</Badge>
        </div>
        <Text className="sc-creative-director-title">{t.title}</Text>
        <Text className="sc-creative-director-sub">{t.sub}</Text>
        <div className="sc-creative-director-criteria">
          {t.crit.map(([name, value]) => (
            <div key={name} className="sc-creative-director-crit">
              <span>{name}</span>
              <Meter value={value as number} />
            </div>
          ))}
        </div>
      </section>
      <div className="sc-creative-director-note">
        <span className="sc-creative-director-note__label">{t.insight}</span>
        <span className="sc-creative-director-note__text">{t.insightText}</span>
      </div>
    </StillStage>
  )
}
