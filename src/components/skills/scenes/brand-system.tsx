'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './brand-system.css'

/** brand-system: palette, type, buttons and the tokens that carry them */
export const READY = true

const TEXT = {
  en: { primary: 'Continue', ghost: 'Cancel' },
  fr: { primary: 'Continuer', ghost: 'Annuler' },
}
const NEUTRALS = ['#18181b', '#52525b', '#a1a1aa', '#e4e4e7']

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <div className="sc-bs-card">
        <div className="sc-bs-swatch"><span className="sc-bs-hex">{a.hex.toUpperCase()}</span></div>
        <div className="sc-bs-type">
          <span className="sc-bs-aa">Aa</span>
          <span className="sc-bs-font">Inter</span>
        </div>
        <div className="sc-bs-neutrals">
          {NEUTRALS.map((c) => <i key={c} style={{ background: c }} />)}
        </div>
        <div className="sc-bs-buttons">
          <span className="sc-bs-btn is-primary">{t.primary}</span>
          <span className="sc-bs-btn is-ghost">{t.ghost}</span>
        </div>
        <div className="sc-bs-lines">
          <Bar w={180} h={6} tone={2} />
          <Bar w={130} h={6} tone={2} />
        </div>
      </div>
      <div className="sc-bs-code">
        <div><b>--brand:</b> <u>{a.hex.toUpperCase()}</u>;</div>
        <div><b>--font:</b> Inter;</div>
        <div><b>--radius:</b> 10px;</div>
      </div>
    </StillStage>
  )
}
