'use client'

import React from 'react'
import { Bar, Code, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './drawing-animated-diagrams.css'

/**
 * drawing-animated-diagrams: a page with a three-box diagram caught halfway through drawing itself (ink, grey, the pen tip in the accent), and the two lines of code behind it. From the overlap example (page, small card on its lower-left edge).
 *
 * On hover only: the diagram is taken back stroke by stroke, last first, and the code lines leave (clear, about 0.7 s);
 * then the two code lines are written, the first box draws, the arrow and the second box follow, and the pen tip draws the last arrow
 * (build, about 3 s), ending on the resting frame.
 */
export const READY = true

const TEXT = {
  en: { url: 'acme.co/guide', title: 'How a request flows', nodes: ['Request', 'Review', 'Delivery'] },
  fr: { url: 'acme.co/guide', title: 'Le trajet d’une demande', nodes: ['Demande', 'Revue', 'Livraison'] },
} as const

const INK = '#262628'
const GREY = 'rgba(0,0,0,0.22)'

/** code: lines of code shown; b1, a1, b2: the first box, the first arrow, the second box drawn; a2: the pen tip and the next arrow */
type S = { code: number; b1: boolean; a1: boolean; b2: boolean; a2: boolean }
const EMPTY: S = { code: 0, b1: false, a1: false, b2: false, a2: false }
const DONE: S = { code: 2, b1: true, a1: true, b2: true, a2: true }

async function clear(a: Act<S>) {
  await a.set({ a2: false })
  await a.wait(100)
  await a.set({ b2: false, a1: false })
  await a.wait(100)
  await a.set({ b1: false })
  await a.wait(120)
  await a.set({ code: 0 })
  await a.wait(300)
}

async function build(a: Act<S>) {
  await a.wait(300)
  await a.set({ code: 1 })
  await a.wait(120)
  await a.set({ code: 2 })
  await a.wait(560)
  await a.set({ b1: true })
  await a.wait(640)
  await a.set({ a1: true })
  await a.wait(280)
  await a.set({ b2: true })
  await a.wait(700)
  await a.set({ a2: true })
  await a.wait(560)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <Window url={t.url} urlShape="pill" className="sc-drawing-animated-diagrams-win" body={{ className: 'sc-drawing-animated-diagrams-page' }}>
        <div className="sc-drawing-animated-diagrams-title">{t.title}</div>
        <div className="sc-drawing-animated-diagrams-lines">
          <Bar w={220} h={6} tone={2} />
          <Bar w={160} h={6} tone={2} />
        </div>
        <svg className="sc-drawing-animated-diagrams-svg" viewBox="0 0 264 56" aria-hidden>
          {/* drawn: two boxes and the first arrow, in ink */}
          <rect className="sc-drawing-animated-diagrams-d" data-on={s.b1 || undefined} pathLength={1} x="1" y="6" width="74" height="44" rx="11" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <rect className="sc-drawing-animated-diagrams-d" data-on={s.b2 || undefined} pathLength={1} x="95" y="6" width="74" height="44" rx="11" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <path className="sc-drawing-animated-diagrams-d" data-on={s.a1 || undefined} pathLength={1} d="M75 28 H93" stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path className="sc-drawing-animated-diagrams-head" data-on={s.a1 || undefined} d="M88.5 23.5 L93.5 28 L88.5 32.5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* drawing now: the second arrow, its pen tip in the accent; what comes next is still grey and dashed */}
          <path className="sc-drawing-animated-diagrams-ghost" data-on={s.a2 || undefined} d="M169 28 H190" stroke={GREY} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 5" fill="none" />
          <path className="sc-drawing-animated-diagrams-d" data-on={s.a2 || undefined} pathLength={1} d="M169 28 H182" stroke="var(--ss-accent)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle className="sc-drawing-animated-diagrams-tip" data-on={s.a2 || undefined} cx="182" cy="28" r="4.5" fill="var(--ss-accent)" stroke="#fff" strokeWidth="2" />
          <rect className="sc-drawing-animated-diagrams-ghost" data-on={s.a2 || undefined} x="189" y="6" width="74" height="44" rx="11" fill="none" stroke={GREY} strokeWidth="1.4" strokeDasharray="3 5" strokeLinecap="round" />
          <text className="sc-drawing-animated-diagrams-label" data-on={s.b1 || undefined} x="38" y="33">{t.nodes[0]}</text>
          <text className="sc-drawing-animated-diagrams-label" data-on={s.b2 || undefined} x="132" y="33">{t.nodes[1]}</text>
        </svg>
        <div className="sc-drawing-animated-diagrams-lines" style={{ marginTop: 22 }}>
          <Bar w={232} h={6} tone={2} />
          <Bar w={196} h={6} tone={2} />
        </div>
      </Window>
      <div className="sc-drawing-animated-diagrams-code">
        <Code lines={['strokeDasharray={1}', 'strokeDashoffset={0}']} numbers={false} count={s.code} />
      </div>
      </>
      )}
    </ResourceStage>
  )
}
