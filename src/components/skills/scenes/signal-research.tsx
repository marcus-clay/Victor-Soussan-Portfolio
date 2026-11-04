'use client'

import React from 'react'
import { Badge, Bar, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './signal-research.css'

/**
 * signal-research: a feed of signals with one picked, and the content angle it turns into.
 *
 * On hover only: the angle leaves, the pick is lifted and the feed's lines go out from the bottom up (the first signal stays) (clear, about
 * 0.6 s); then the feed fills line by line below it, one signal is picked and the angle it turns into rises over the window
 * (build, about 3 s). The window stays in place. The poster is the finished frame, the resting look.
 */
export const READY = true

const LINES = 5

/** How many lines of the feed are drawn (of five, the first always is), whether the second signal is picked, whether its angle is shown */
type S = { rows: number; pick: boolean; angle: boolean }
const EMPTY: S = { rows: 1, pick: false, angle: false }
const DONE: S = { rows: LINES, pick: true, angle: true }

async function clear(a: Act<S>) {
  await a.set({ angle: false, pick: false })
  await a.wait(120)
  await a.stagger(Array.from({ length: LINES - 1 }, (_, i) => LINES - 1 - i), (n) => a.set({ rows: n }), 45)
  await a.wait(260)
}

async function build(a: Act<S>) {
  await a.wait(300)
  await a.stagger(Array.from({ length: LINES - 1 }, (_, i) => i + 2), (n) => a.set({ rows: n }), 110)
  await a.wait(750)
  await a.set({ pick: true })
  await a.wait(650)
  await a.set({ angle: true })
  await a.wait(900)
}

const T = {
  en: {
    title: 'Signals',
    rows: [
      ['Empty states get a second look', 'UI/UX'],
      ['Agents ask before they act', 'AI'],
    ],
    angle: 'Angle',
    angleText: 'Why calm interfaces age better',
    format: 'Post',
  },
  fr: {
    title: 'Veille',
    rows: [
      ['Les états vides reviennent', 'UI/UX'],
      ['Les agents demandent d’abord', 'IA'],
    ],
    angle: 'Angle',
    angleText: 'Pourquoi les interfaces calmes vieillissent mieux',
    format: 'Post',
  },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
        <>
          <Window title={t.title} className="sc-signal-research-win">
            <div className="sc-signal-research-list">
              {t.rows.map(([title, tag], i) => (
                <div key={title} className="sc-signal-research-row" data-show={i < s.rows || undefined} data-on={(i === 1 && s.pick) || undefined}>
                  <Text className="sc-signal-research-row__title">{title}</Text>
                  <Badge>{tag}</Badge>
                </div>
              ))}
              {[[150, 34], [120, 40], [170, 30]].map(([w, b], i) => (
                <div key={i} className="sc-signal-research-row" data-bars data-show={i + 2 < s.rows || undefined}>
                  <Bar w={w} h={7} r={3.5} tone={3} />
                  <Bar w={b} h={16} r={8} tone={2} />
                </div>
              ))}
            </div>
          </Window>
          <div className="sc-signal-research-angle" data-show={s.angle || undefined}>
            <span className="sc-signal-research-angle__label">{t.angle}</span>
            <span className="sc-signal-research-angle__text">{t.angleText}</span>
            <Badge>{t.format}</Badge>
          </div>
        </>
      )}
    </ResourceStage>
  )
}
