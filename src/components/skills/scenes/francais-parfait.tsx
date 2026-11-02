'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './francais-parfait.css'

/** francais-parfait: a French sentence with its typographic marks lit, and an inspector that names them */
export const READY = true

// The sentence stays French in both languages; only the inspector's labels follow the page
const LABELS = {
  en: ['Quotation marks', 'Ligature', 'Capital accents', 'Non-breaking space'],
  fr: ['Guillemets', 'Ligature', 'Capitales accentuées', 'Espace insécable'],
}
const GLYPHS: React.ReactNode[] = ['«»', 'œ', 'É', <i key="nb" className="sc-fp-nb is-big" />]

const Nb = () => <i className="sc-fp-nb" />

export default function Scene({ lang, a }: SceneProps) {
  const l = LABELS[lang]
  return (
    <StillStage a={a}>
      <div className="sc-fp-card">
        <div className="sc-fp-text">
          <span className="sc-fp-mark">«</span><Nb /><span className="sc-fp-mark">À</span> l’<span className="sc-fp-mark">œ</span>uvre<Nb />:<br />un français natif<Nb /><span className="sc-fp-mark">»</span>
        </div>
        <div className="sc-fp-lines">
          <Bar w={150} h={6} tone={2} />
          <Bar w={120} h={6} tone={2} />
          <Bar w={140} h={6} tone={2} />
        </div>
      </div>
      <div className="sc-fp-insp">
        {l.map((label, i) => (
          <div key={label} className={`sc-fp-row${i === 0 ? ' is-on' : ''}`}>
            <span className="sc-fp-tile">{GLYPHS[i]}</span>
            <span className="sc-fp-label">{label}</span>
          </div>
        ))}
      </div>
    </StillStage>
  )
}
