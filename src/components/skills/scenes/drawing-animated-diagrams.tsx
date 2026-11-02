'use client'

import React from 'react'
import { Bar, Code, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './drawing-animated-diagrams.css'

/** drawing-animated-diagrams: a page with a three-box diagram caught halfway through drawing itself (ink, grey, the pen tip in the accent), and the two lines of code behind it. From the overlap example (page, small card on its lower-left edge). */
export const READY = true

const TEXT = {
  en: { url: 'acme.co/guide', title: 'How a request flows', nodes: ['Request', 'Review', 'Delivery'] },
  fr: { url: 'acme.co/guide', title: 'Le trajet d’une demande', nodes: ['Demande', 'Revue', 'Livraison'] },
} as const

const INK = '#262628'
const GREY = 'rgba(0,0,0,0.22)'

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window url={t.url} urlShape="pill" className="sc-drawing-animated-diagrams-win" body={{ className: 'sc-drawing-animated-diagrams-page' }}>
        <div className="sc-drawing-animated-diagrams-title">{t.title}</div>
        <div className="sc-drawing-animated-diagrams-lines">
          <Bar w={220} h={6} tone={2} />
          <Bar w={160} h={6} tone={2} />
        </div>
        <svg className="sc-drawing-animated-diagrams-svg" viewBox="0 0 264 56" aria-hidden>
          {/* drawn: two boxes and the first arrow, in ink */}
          <rect x="1" y="6" width="74" height="44" rx="11" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <rect x="95" y="6" width="74" height="44" rx="11" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <path d="M75 28 H93" stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M88.5 23.5 L93.5 28 L88.5 32.5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* drawing now: the second arrow, its pen tip in the accent; what comes next is still grey and dashed */}
          <path d="M169 28 H190" stroke={GREY} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 5" fill="none" />
          <path d="M169 28 H182" stroke="var(--ss-accent)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="182" cy="28" r="4.5" fill="var(--ss-accent)" stroke="#fff" strokeWidth="2" />
          <rect x="189" y="6" width="74" height="44" rx="11" fill="none" stroke={GREY} strokeWidth="1.4" strokeDasharray="3 5" strokeLinecap="round" />
          <text x="38" y="33">{t.nodes[0]}</text>
          <text x="132" y="33">{t.nodes[1]}</text>
        </svg>
        <div className="sc-drawing-animated-diagrams-lines" style={{ marginTop: 22 }}>
          <Bar w={232} h={6} tone={2} />
          <Bar w={196} h={6} tone={2} />
        </div>
      </Window>
      <div className="sc-drawing-animated-diagrams-code">
        <Code lines={['strokeDasharray={1}', 'strokeDashoffset={0}']} numbers={false} />
      </div>
    </StillStage>
  )
}
