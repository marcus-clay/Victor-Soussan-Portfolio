'use client'

import React from 'react'
import { Bar, type Act } from '@/components/stageshow/kit'
import { CalendarDays } from 'lucide-react'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './direction-design.css'

/**
 * direction-design: a design roadmap as a sheet with three columns (now, next, later) and an upcoming meeting.
 *
 * On hover only: the cards are placed column by column (now, next, later), then the meeting pill comes in on the sheet's
 * edge (about 2.7 s). The poster is the finished frame, the resting look.
 */
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

// k: cards placed, in reading order (3 in Now, 3 in Next, 2 in Later); pill: the meeting is on the sheet
type S = { k: number; pill: boolean }
const EMPTY: S = { k: 0, pill: false }
const DONE: S = { k: 8, pill: true }

// In: Now, then Next, then Later (a card every 100 ms, a rest between columns), then the meeting
async function build(a: Act<S>) {
  for (const k of [1, 2, 3]) {
    await a.set({ k })
    await a.wait(110)
  }
  await a.wait(300)
  for (const k of [4, 5, 6]) {
    await a.set({ k })
    await a.wait(110)
  }
  await a.wait(300)
  for (const k of [7, 8]) {
    await a.set({ k })
    await a.wait(110)
  }
  await a.wait(550)
  await a.set({ pill: true })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <div className="sc-dd-sheet">
        <div className="sc-dd-title">{t.title}</div>
        <div className="sc-dd-cols">
          <div className="sc-dd-col">
            <div className="sc-dd-label" data-on><span>{t.cols[0]}</span></div>
            {t.now.map((c, i) => (
              <div key={c} className="sc-dd-card" data-in={i < s.k || undefined}>{c}<Bar w={50} h={5} tone={2} /></div>
            ))}
            <div className="sc-dd-card" data-in={2 < s.k || undefined}><Bar w={70} h={7} tone={3} /><Bar w={40} h={5} tone={2} /></div>
          </div>
          <div className="sc-dd-col">
            <div className="sc-dd-label">{t.cols[1]}</div>
            {t.next.map((c, i) => (
              <div key={c} className="sc-dd-card" data-in={3 + i < s.k || undefined}>{c}<Bar w={42} h={5} tone={2} /></div>
            ))}
            <div className="sc-dd-card" data-in={5 < s.k || undefined}><Bar w={64} h={7} tone={3} /><Bar w={36} h={5} tone={2} /></div>
          </div>
          <div className="sc-dd-col">
            <div className="sc-dd-label" data-dim>{t.cols[2]}</div>
            {[78, 64].map((w, i) => (
              <div key={w} className="sc-dd-card" data-in={6 + i < s.k || undefined}><Bar w={w} h={7} tone={3} /><Bar w={44} h={5} tone={2} /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="sc-dd-pill" data-in={s.pill || undefined}>
        <CalendarDays size={15} strokeWidth={1.7} />
        {t.pill}
      </div>
      </>
      )}
    </ResourceStage>
  )
}
