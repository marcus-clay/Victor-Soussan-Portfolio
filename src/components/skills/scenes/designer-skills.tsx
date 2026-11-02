'use client'

import React from 'react'
import { Avatar, Text } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './designer-skills.css'

/** designer-skills: three sheets of design paper, a persona on top of a journey and a wall of notes */
export const READY = true

const T = {
  en: {
    name: 'Maya',
    role: 'Freelance designer',
    quote: '“I want the real price, up front.”',
    facts: [
      ['Goal', 'Compare plans'],
      ['Blocker', 'Hidden fees'],
    ],
  },
  fr: {
    name: 'Maya',
    role: 'Designer indépendante',
    quote: '« Je veux le vrai prix, dès le départ. »',
    facts: [
      ['Objectif', 'Comparer'],
      ['Frein', 'Frais cachés'],
    ],
  },
} as const

const STEPS = [0, 33, 66, 100]

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <div className="sc-designer-skills-pile">
        <section className="sc-designer-skills-card sc-designer-skills-card--back" aria-hidden>
          <div className="sc-designer-skills-notes">
            <span className="sc-designer-skills-note" />
            <span className="sc-designer-skills-note" data-hot />
            <span className="sc-designer-skills-note" />
          </div>
        </section>
        <section className="sc-designer-skills-card sc-designer-skills-card--mid" aria-hidden>
          <div className="sc-designer-skills-journey">
            <span className="sc-designer-skills-journey__line" />
            {STEPS.map((x, i) => (
              <span key={x} className="sc-designer-skills-journey__dot" data-hot={i === 3 || undefined} style={{ left: `calc(${x}% - ${x * 0.14}px)` }} />
            ))}
          </div>
        </section>
        <section className="sc-designer-skills-card sc-designer-skills-card--top">
          <div className="sc-designer-skills-who">
            <Avatar name={t.name} tone="accent" size={38} />
            <div>
              <Text className="sc-designer-skills-name">{t.name}</Text>
              <Text className="sc-designer-skills-role">{t.role}</Text>
            </div>
          </div>
          <blockquote className="sc-designer-skills-quote">{t.quote}</blockquote>
          <div className="sc-designer-skills-facts">
            {t.facts.map(([k, v]) => (
              <div key={k} className="sc-designer-skills-fact">
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StillStage>
  )
}
