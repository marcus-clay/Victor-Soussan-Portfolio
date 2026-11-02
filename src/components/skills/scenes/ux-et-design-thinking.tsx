'use client'

import React from 'react'
import { Badge, Bar, Phone, Pin } from '@/components/stageshow/kit'
import { FileText, Search } from 'lucide-react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './ux-et-design-thinking.css'

/** ux-et-design-thinking: a mobile search screen with two numbered review pins, and the job to be done it is judged against */
export const READY = true

const T = {
  en: {
    query: 'track my order',
    rows: ['Delivery', 'Returns'],
    kicker: 'Job to be done',
    job: 'Find an answer without rephrasing the question',
    tags: ['Fact', 'Hypothesis'],
  },
  fr: {
    query: 'suivre ma commande',
    rows: ['Livraison', 'Retours'],
    kicker: 'Job à accomplir',
    job: 'Retrouver une réponse sans reformuler sa question',
    tags: ['Fait', 'Hypothèse'],
  },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <Phone width={272} frame="soft" className="sc-ux-phone">
        <div className="sc-ux-screen">
          <div className="sc-ux-field">
            <Search size={22} strokeWidth={1.8} />
            {t.query}
            <Pin name="1" size={36} corner="bl" tone="accent" className="sc-ux-pin" style={{ left: 10, top: -32 }} />
          </div>
          <div className="sc-ux-list">
            {t.rows.map((r, i) => (
              <div key={r} className="sc-ux-row">
                {i === 0 && <Pin name="2" size={36} corner="bl" tone="ink" className="sc-ux-pin" style={{ left: 186, top: 4 }} />}
                <span className="sc-ux-tile"><FileText size={22} strokeWidth={1.7} /></span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <span className="sc-ux-name">{r}</span>
                  <Bar w={120} h={9} tone={2} />
                </div>
              </div>
            ))}
            {[[150, 110], [128, 96]].map(([w1, w2]) => (
              <div key={w1} className="sc-ux-row">
                <span className="sc-ux-tile" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <Bar w={w1} h={12} tone={3} />
                  <Bar w={w2} h={9} tone={2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Phone>
      <div className="sc-ux-card">
        <div className="sc-ux-kicker">{t.kicker}</div>
        <div className="sc-ux-job">{t.job}</div>
        <div className="sc-ux-tags">
          <Badge>{t.tags[0]}</Badge>
          <Badge>{t.tags[1]}</Badge>
        </div>
      </div>
    </StillStage>
  )
}
