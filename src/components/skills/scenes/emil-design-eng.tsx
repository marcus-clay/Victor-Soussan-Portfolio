'use client'

import React from 'react'
import { Segmented, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './emil-design-eng.css'

/** emil-design-eng: a timing inspector, the ease-out curve chosen over the linear one, 200 ms. From the close-up example (one window, one subject, the rest context). */
export const READY = true

const TEXT = {
  en: { title: 'Animation', press: 'Press', val: 'scale 0.97', ms: '200 ms', curve: 'Curve', items: ['ease-in', 'ease-out', 'linear'] },
  fr: { title: 'Animation', press: 'Appui', val: 'scale\u00a00,97', ms: '200 ms', curve: 'Courbe', items: ['ease-in', 'ease-out', 'linear'] },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window title={t.title} className="sc-emil-design-eng-win" body={{ className: 'sc-emil-design-eng-body' }}>
        <div className="sc-emil-design-eng-plot">
          <svg viewBox="0 0 314 124" aria-hidden>
            {[20, 60, 100].map((y) => (
              <line key={y} x1="18" x2="296" y1={y} y2={y} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            ))}
            <line x1="18" y1="100" x2="296" y2="20" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" />
            <path d="M18 100 C81.9 20 107 20 296 20" fill="none" stroke="var(--ss-accent)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="18" cy="100" r="3.5" fill="#fff" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
            <circle cx="296" cy="20" r="6" fill="var(--ss-accent)" stroke="#fff" strokeWidth="2.5" />
          </svg>
          <span className="sc-emil-design-eng-tag">{t.ms}</span>
        </div>
        <div className="sc-emil-design-eng-rows">
          <div className="sc-emil-design-eng-row">
            <span>{t.curve}</span>
            <Segmented items={[...t.items]} value={1} className="sc-emil-design-eng-seg" />
          </div>
          <div className="sc-emil-design-eng-row">
            <span>{t.press}</span>
            <b>{t.val}</b>
          </div>
        </div>
      </Window>
    </StillStage>
  )
}
