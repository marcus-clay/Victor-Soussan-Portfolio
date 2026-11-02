'use client'

import React from 'react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './diagram-storytelling.css'

/** diagram-storytelling: one idea per diagram, here a three-screen flow on a slide, in black and white with one accent path */
export const READY = true

const TEXT = {
  en: { title: 'Three screens, one path', labels: ['Home', 'Search', 'Result'] },
  fr: { title: 'Trois écrans, un seul chemin', labels: ['Accueil', 'Recherche', 'Résultat'] },
}
const X = [24, 136, 248]

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <div className="sc-ds-slide">
        <div className="sc-ds-title">{t.title}</div>

        <div className="sc-ds-screen" style={{ left: X[0] }}>
          <span className="sc-ds-zone" style={{ width: '60%' }} />
          <span className="sc-ds-zone is-field" />
          <span className="sc-ds-zone is-block" />
          <span className="sc-ds-zone" style={{ width: '80%' }} />
        </div>
        <div className="sc-ds-screen" style={{ left: X[1] }}>
          <span className="sc-ds-zone is-field" />
          <span className="sc-ds-zone" />
          <span className="sc-ds-zone is-hot" />
          <span className="sc-ds-zone" />
        </div>
        <div className="sc-ds-screen" style={{ left: X[2] }}>
          <span className="sc-ds-zone" style={{ width: '70%' }} />
          <span className="sc-ds-zone is-block" style={{ height: 40 }} />
          <span className="sc-ds-zone" />
          <span className="sc-ds-zone" style={{ width: '55%' }} />
        </div>

        {t.labels.map((l, i) => (
          <span key={l} className={`sc-ds-label${i === 2 ? ' is-last' : ''}`} style={{ left: X[i] }}>{l}</span>
        ))}

        <svg className="sc-ds-arrows" viewBox="0 0 380 290" aria-hidden>
          <path className="sc-ds-line" d="M111 113 C118 108 124 108 131 112 M124 106 L132 112 L124 117" />
          <path className="sc-ds-line is-acc" d="M223 137 C230 132 236 132 243 136 M236 130 L244 136 L236 141" />
        </svg>
      </div>
    </StillStage>
  )
}
