'use client'

import React from 'react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './taste-skill.css'

/** taste-skill: three dials (variance, motion, density) over the page they shape */
export const READY = true

const T = {
  en: {
    dials: [
      { name: 'Variance', value: 'High', at: 0.78 },
      { name: 'Motion', value: 'Low', at: 0.24 },
      { name: 'Density', value: 'Medium', at: 0.5 },
    ],
    headline: 'Software with a point of view',
    cta: 'See the work',
  },
  fr: {
    dials: [
      { name: 'Variance', value: 'Forte', at: 0.78 },
      { name: 'Mouvement', value: 'Faible', at: 0.24 },
      { name: 'Densité', value: 'Moyenne', at: 0.5 },
    ],
    headline: 'Des outils avec un point de vue',
    cta: 'Voir le travail',
  },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <div className="sc-taste-skill-stack">
        <section className="sc-taste-skill-card sc-taste-skill-dials">
          {t.dials.map((d) => (
            <div key={d.name} className="sc-taste-skill-dial">
              <span className="sc-taste-skill-dial__name">{d.name}</span>
              <span className="sc-taste-skill-track">
                <span className="sc-taste-skill-fill" style={{ width: `${d.at * 100}%` }} />
                <span className="sc-taste-skill-knob" style={{ left: `${d.at * 100}%` }} />
              </span>
              <span className="sc-taste-skill-dial__value">{d.value}</span>
            </div>
          ))}
        </section>
        <section className="sc-taste-skill-page">
          <div className="sc-taste-skill-headline">{t.headline}</div>
          <div className="sc-taste-skill-cta">{t.cta}</div>
        </section>
      </div>
    </StillStage>
  )
}
