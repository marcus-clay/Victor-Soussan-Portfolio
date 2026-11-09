'use client'

import React from 'react'
import { Bar, Icon } from '@/components/stageshow/kit'
import { FileText } from 'lucide-react'
import ResourceStage, { type Act } from './ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './template-design-teardown.css'

/** template-design-teardown: a workshop canvas with no window, edge to edge like a work surface: a floating stepper, a cloud of opportunity notes that converges through two concept sketches to one card of principles with its specs. From the many-of-one example (a field of small things off the edges, one object in focus) and presence (a shared canvas). */
export const READY = true

const T = {
  en: { title: 'Design Teardown', step: 'Convergence', principles: 'Principles', specs: 'Specs' },
  fr: { title: 'Design Teardown', step: 'Convergence', principles: 'Principes', specs: 'Specs' },
} as const

/** [left, top, rotation, grey] of the opportunity notes, in stage points; the lowest ones run off the bottom */
const NOTES: [number, number, number, boolean][] = [
  [20, 80, -4, false],
  [62, 92, 3, true],
  [28, 124, 5, true],
  [74, 134, -3, false],
  [16, 170, -5, false],
  [62, 182, 4, true],
  [30, 216, 3, false],
  [76, 230, -2, true],
  [18, 262, -3, true],
  [64, 276, 4, false],
]

/** The loop builds the board from divergence to convergence; the stepper moves one notch per moment. */
type S = { step: number; notes: number; concepts: number; lines: boolean; card: boolean; rules: boolean; specs: boolean }
const initial: S = { step: 0, notes: 0, concepts: 0, lines: false, card: false, rules: false, specs: false }
const poster: S = { step: 3, notes: NOTES.length, concepts: 2, lines: true, card: true, rules: true, specs: true }

/** Notes one by one (step 1), the two concepts (step 2), the curves, the card, its lines, its specs (step 3): it ends on `poster`. */
async function build(a: Act<S>) {
  await a.wait(100)
  await a.set({ step: 1 })
  for (let i = 1; i <= NOTES.length; i++) {
    await a.set({ notes: i })
    await a.wait(70)
  }
  await a.wait(400)
  await a.set({ step: 2 })
  await a.set({ concepts: 1 })
  await a.wait(100)
  await a.set({ concepts: 2 })
  await a.wait(600)
  await a.set({ lines: true })
  await a.wait(450)
  await a.set({ step: 3, card: true })
  await a.wait(300)
  await a.set({ rules: true })
  await a.wait(450)
  await a.set({ specs: true })
  await a.wait(400)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={initial} poster={poster} build={build}>
      {(s) => (
        <div className="sc-res-teardown">
          <span className="sc-res-teardown-funnel" aria-hidden />

          <div className="sc-res-teardown-steps">
            {[0, 1, 2].map((i) => (
              <React.Fragment key={i}>
                <span className="sc-res-teardown-done" data-on={s.step > i || undefined}>
                  <Icon name="check" size={10} />
                </span>
                <i className="sc-res-teardown-link" data-on={(i === 2 ? s.step >= 3 : s.step > i + 1) || undefined} />
              </React.Fragment>
            ))}
            <span className="sc-res-teardown-now" data-on={s.step >= 3 || undefined}>
              {t.step}
            </span>
          </div>

          {NOTES.map(([x, y, r, grey], i) => (
            <span key={i} className="sc-res-teardown-note" data-show={i < s.notes || undefined} data-grey={grey || undefined} style={{ left: x, top: y, ['--r' as string]: `${r}deg` }}>
              <Bar w={16} h={4} tone={grey ? 4 : 3} />
            </span>
          ))}

          {[98, 176].map((y, i) => (
            <span key={y} className="sc-res-teardown-concept" data-show={i < s.concepts || undefined} style={{ top: y }}>
              <Bar w={24} h={4} tone={4} />
              <i />
            </span>
          ))}

          <svg className="sc-res-teardown-lines" data-show={s.lines || undefined} viewBox="0 0 390 300" aria-hidden>
            <path pathLength={1} d="M214 125 C 232 125, 230 160, 252 160" />
            <path pathLength={1} d="M214 203 C 232 203, 230 160, 252 160" />
            <circle cx="252" cy="160" r="3" />
          </svg>

          <div className="sc-res-teardown-card" data-show={s.card || undefined}>
            <span className="sc-res-teardown-card-title">{t.principles}</span>
            <span className="sc-res-teardown-rules" data-show={s.rules || undefined}>
              <i />
              <i />
              <i />
            </span>
            <span className="sc-res-teardown-specs" data-show={s.specs || undefined}>
              <FileText size={13} strokeWidth={1.8} />
              {t.specs}
            </span>
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
