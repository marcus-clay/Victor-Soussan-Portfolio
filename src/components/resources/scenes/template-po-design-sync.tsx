'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import { Clock } from 'lucide-react'
import ResourceStage, { type Act } from './ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './template-po-design-sync.css'

/** template-po-design-sync: close-up of one calendar event card, the week row under it with two marked days, and the second slot behind. From the close-up and stacked-cards examples (no window; two cards at one width, the lower one off the bottom), the event card at about 1.4x. */
export const READY = true

const T = {
  en: { event: 'PO and design', duration: '30 min', days: ['M', 'T', 'W', 'T', 'F'] },
  fr: { event: 'Point PO et design', duration: '30 min', days: ['L', 'M', 'M', 'J', 'V'] },
} as const

/** The two marked days (Tuesday and Thursday) and the slot each one carries, in the week row */
const MARKED: Record<number, number> = { 1: 18, 3: 46 }
/** Filler events of the week, [column, top, height] */
const BUSY: [number, number, number][] = [
  [0, 10, 36],
  [0, 70, 30],
  [1, 74, 40],
  [2, 30, 40],
  [2, 92, 30],
  [3, 8, 26],
  [3, 88, 36],
  [4, 22, 44],
  [4, 84, 34],
]

/** What the loop adds: the event card, the two marked days, the second slot behind. The week row is always there. */
type S = { hero: boolean; marks: number; second: boolean }
const initial: S = { hero: false, marks: 0, second: false }
const poster: S = { hero: true, marks: 2, second: true }

/** On hover: the finished frame clears in a short reverse cascade (about 500 ms), then the story builds up again and stays on the finished frame. */
async function clear(a: Act<S>) {
  await a.set({ second: false })
  await a.wait(80)
  await a.set({ marks: 0 })
  await a.wait(80)
  await a.set({ hero: false })
  await a.wait(150)
}

/** The card lands, the two days are marked 140 ms apart, the second card comes out from behind: it ends on `poster`. */
async function build(a: Act<S>) {
  await a.wait(100)
  await a.set({ hero: true })
  await a.wait(700)
  await a.set({ marks: 1 })
  await a.wait(140)
  await a.set({ marks: 2 })
  await a.wait(700)
  await a.set({ second: true })
  await a.wait(400)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={initial} poster={poster} build={build} clear={clear}>
      {(s) => (
        <div className="sc-res-po-sync">
          <div className="sc-res-po-sync-back" data-show={s.second || undefined}>
            <Bar w={84} h={7} tone={4} />
            <Bar w={46} h={6} tone={3} />
          </div>

          <div className="sc-res-po-sync-hero" data-show={s.hero || undefined}>
            <span className="sc-res-po-sync-ico">
              <Clock size={20} strokeWidth={1.9} />
            </span>
            <span className="sc-res-po-sync-txt">
              <span className="sc-res-po-sync-title">{t.event}</span>
              <span className="sc-res-po-sync-dur">{t.duration}</span>
            </span>
          </div>

          <div className="sc-res-po-sync-week">
            <div className="sc-res-po-sync-cols">
              {t.days.map((d, i) => {
                const on = i in MARKED && s.marks > (i === 1 ? 0 : 1)
                return (
                  <div key={i} className="sc-res-po-sync-col">
                    <span className="sc-res-po-sync-day" data-on={on || undefined}>
                      {d}
                    </span>
                    <i className="sc-res-po-sync-dot" data-on={on || undefined} />
                    <div className="sc-res-po-sync-lane">
                      {BUSY.filter(([c]) => c === i).map(([, top, h], k) => (
                        <span key={k} className="sc-res-po-sync-busy" style={{ top, height: h }}>
                          <Bar w={22} h={4} tone={3} />
                        </span>
                      ))}
                      {i in MARKED && <span className="sc-res-po-sync-slot" data-on={on || undefined} style={{ top: MARKED[i] }} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
