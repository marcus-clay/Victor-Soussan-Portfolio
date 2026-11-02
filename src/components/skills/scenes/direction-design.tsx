'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import { CalendarDays } from 'lucide-react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './direction-design.css'

/** direction-design: a design roadmap as a sheet with three columns (now, next, later) and an upcoming meeting */
export const READY = true

const T = {
  en: {
    title: 'Design roadmap',
    cols: ['Now', 'Next', 'Later'],
    now: ['Audit the journeys', 'Component kit'],
    next: ['Monthly design review', 'Research plan'],
    pill: 'Thursday review',
  },
  fr: {
    title: 'Feuille de route design',
    cols: ['Maintenant', 'Ensuite', 'Plus tard'],
    now: ['Audit des parcours', 'Kit de composants'],
    next: ['Revue design mensuelle', 'Plan de recherche'],
    pill: 'Comité jeudi',
  },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <div className="sc-dd-sheet">
        <div className="sc-dd-title">{t.title}</div>
        <div className="sc-dd-cols">
          <div className="sc-dd-col">
            <div className="sc-dd-label" data-on><span>{t.cols[0]}</span></div>
            {t.now.map((c) => (
              <div key={c} className="sc-dd-card">{c}<Bar w={50} h={5} tone={2} /></div>
            ))}
            <div className="sc-dd-card"><Bar w={70} h={7} tone={3} /><Bar w={40} h={5} tone={2} /></div>
          </div>
          <div className="sc-dd-col">
            <div className="sc-dd-label">{t.cols[1]}</div>
            {t.next.map((c) => (
              <div key={c} className="sc-dd-card">{c}<Bar w={42} h={5} tone={2} /></div>
            ))}
            <div className="sc-dd-card"><Bar w={64} h={7} tone={3} /><Bar w={36} h={5} tone={2} /></div>
          </div>
          <div className="sc-dd-col">
            <div className="sc-dd-label" data-dim>{t.cols[2]}</div>
            {[78, 64].map((w) => (
              <div key={w} className="sc-dd-card"><Bar w={w} h={7} tone={3} /><Bar w={44} h={5} tone={2} /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="sc-dd-pill">
        <CalendarDays size={15} strokeWidth={1.7} />
        {t.pill}
      </div>
    </StillStage>
  )
}
