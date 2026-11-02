'use client'

import React from 'react'
import { Icon, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './facilitation-ateliers.css'

/** facilitation-ateliers: a timed run of show for a workshop, the closing step (the decision) highlighted. From the corner-chip example. */
export const READY = true

const TEXT = {
  en: {
    title: 'Prioritisation workshop',
    people: '6 people',
    chip: '90 min',
    steps: [
      ['0:00', 'Opening'],
      ['0:10', 'Ideas, alone'],
      ['0:30', 'Group similar ideas'],
      ['0:55', 'Vote with dots'],
      ['1:15', 'Decision'],
    ],
  },
  fr: {
    title: 'Atelier de priorisation',
    people: '6 personnes',
    chip: '90 min',
    steps: [
      ['0:00', 'Ouverture'],
      ['0:10', 'Idées, en solo'],
      ['0:30', 'Regrouper les idées'],
      ['0:55', 'Vote par points'],
      ['1:15', 'Décision'],
    ],
  },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window title={t.title} className="sc-facilitation-ateliers-win" body={{ className: 'sc-facilitation-ateliers-body' }}>
        <div className="sc-facilitation-ateliers-head">
          <Text className="sc-facilitation-ateliers-meta" style={{ marginLeft: 0 }}>{t.people}</Text>
        </div>
        {t.steps.map(([time, what], i) => {
          const goal = i === t.steps.length - 1
          return (
            <div key={time} className="sc-facilitation-ateliers-row" data-goal={goal || undefined}>
              <span className="sc-facilitation-ateliers-time">{time}</span>
              <span className="sc-facilitation-ateliers-what">{what}</span>
              {goal && <Icon name="check" filled size={18} />}
            </div>
          )
        })}
      </Window>
      <div className="sc-facilitation-ateliers-pill">
        <Icon name="clock" size={14} />
        {t.chip}
      </div>
    </StillStage>
  )
}
