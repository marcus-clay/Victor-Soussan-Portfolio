'use client'

import React from 'react'
import { Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './slides.css'

/**
 * slides: a deck in an app, the open slide carries a sentence as its title, and a picker of layouts.
 *
 * On hover only (no loop): the slide is emptied (clear, about 0.6 s), then a layout is picked in the picker, the kicker and
 * the title come onto the slide, the three columns follow, and the thumbnail of the open slide takes its lines (build,
 * about 3 s), ending on the finished frame.
 */
export const READY = true

const TEXT = {
  en: { title: 'Three steps from question to source', pick: 'Layouts' },
  fr: { title: 'Trois étapes de la question à la source', pick: 'Mises en page' },
}

// Each mini layout is a few boxes in percentages: [left, top, width, height]
const LAYOUTS: number[][][] = [
  [[12, 22, 76, 18], [12, 52, 50, 10]],
  [[10, 20, 36, 60], [54, 20, 36, 60]],
  [[12, 20, 76, 14], [12, 44, 22, 34], [38, 44, 22, 34], [64, 44, 22, 34]],
  [[10, 18, 80, 64]],
  [[10, 20, 30, 60], [48, 24, 42, 10], [48, 44, 42, 10]],
  [[12, 20, 76, 10], [12, 40, 76, 10], [12, 60, 76, 10]],
]

/** How far the deck is told: 1 the layout is picked, 2 the title is on the slide, 3 the columns, 4 the thumbnail's lines */
type S = { step: number }
const EMPTY: S = { step: 0 }
const DONE: S = { step: 4 }

// Out: the thumbnail and the columns go first, then the title and the pick
async function clear(a: Act<S>) {
  await a.set({ step: 2 })
  await a.wait(110)
  await a.set({ step: 0 })
  await a.wait(330)
}

// In: the layout is picked, the title is set, the columns come in one after the other, the thumbnail follows
async function build(a: Act<S>) {
  await a.wait(200)
  await a.set({ step: 1 })
  await a.wait(700)
  await a.set({ step: 2 })
  await a.wait(750)
  await a.set({ step: 3 })
  await a.wait(750)
  await a.set({ step: 4 })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
        <>
          <Window
            className="sc-sl-win"
            sidebarWidth={64}
            sidebar={
              <div className="sc-sl-side">
                {[0, 1].map((n) => (
                  <div key={n} className={`sc-sl-thumb${n === 1 ? ' is-on' : ''}`} data-show={n === 0 || s.step >= 4 || undefined}>
                    <i className="t" style={{ width: '60%', ['--i' as string]: 0 }} />
                    <i style={{ width: '85%', ['--i' as string]: 1 }} />
                    <i style={{ width: '45%', ['--i' as string]: 2 }} />
                  </div>
                ))}
              </div>
            }
          >
            <div className="sc-sl-stage">
              <div className="sc-sl-slide">
                <span className="sc-sl-kick" data-show={s.step >= 2 || undefined} />
                <div className="sc-sl-title" data-show={s.step >= 2 || undefined}>{t.title}</div>
                <div className="sc-sl-cols">
                  {[0, 1, 2].map((i) => (
                    <i key={i} style={{ ['--i' as string]: i }} data-show={s.step >= 3 || undefined} />
                  ))}
                </div>
              </div>
            </div>
          </Window>

          <div className="sc-sl-pick">
            <div className="sc-sl-pick-h">{t.pick}</div>
            <div className="sc-sl-grid">
              {LAYOUTS.map((boxes, i) => (
                <span key={i} className="sc-sl-lay" data-on={(i === 2 && s.step >= 1) || undefined}>
                  {boxes.map(([l, tp, w, h], j) => <i key={j} style={{ left: `${l}%`, top: `${tp}%`, width: `${w}%`, height: `${h}%` }} />)}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </ResourceStage>
  )
}
