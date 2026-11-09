'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './francais-parfait.css'

/**
 * francais-parfait: a French sentence with its typographic marks lit, and an inspector that names them.
 *
 * On hover only (no loop): the marks and the inspector leave together (clear, about 0.5 s), then the inspector opens its four rows
 * and the marks are lit one family after the other in the sentence, the capital accent, the ligature, the non-breaking
 * spaces and the quotation marks, the first row of the inspector taking its highlight last (build, about 3 s), ending on
 * the finished frame.
 */
export const READY = true

// The sentence stays French in both languages; only the inspector's labels follow the page
const LABELS = {
  en: ['Quotation marks', 'Ligature', 'Capital accents', 'Non-breaking space'],
  fr: ['Guillemets', 'Ligature', 'Capitales accentuées', 'Espace insécable'],
}
const GLYPHS: React.ReactNode[] = ['«»', 'œ', 'É', <i key="nb" className="sc-fp-nb is-big" />]

/** The inspector (open or not), how many of its rows are in, and how many mark families are lit (0 to 4) */
type S = { insp: boolean; rows: number; m: number }
const EMPTY: S = { insp: false, rows: 0, m: 0 }
const DONE: S = { insp: true, rows: 4, m: 4 }

// In: the inspector opens and fills its rows, then the families are lit: capital, ligature, spaces, quotation marks
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ insp: true })
  await a.wait(110)
  await a.set({ rows: 4 })
  await a.wait(850)
  await a.set({ m: 1 })
  await a.wait(500)
  await a.set({ m: 2 })
  await a.wait(500)
  await a.set({ m: 3 })
  await a.wait(500)
  await a.set({ m: 4 })
  await a.wait(450)
}

export default function Scene({ lang, a }: SceneProps) {
  const l = LABELS[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => {
        // Plain functions returning elements (not components), so the marks keep their identity from one state to the next
        const mark = (k: string, at: number, c: string) => (
          <span key={k} className="sc-fp-mark" data-on={s.m >= at || undefined}>{c}</span>
        )
        const nb = (k: string) => <i key={k} className="sc-fp-nb" data-on={s.m >= 3 || undefined} />
        return (
          <>
            <div className="sc-fp-card">
              <div className="sc-fp-text">
                {mark('q1', 4, '«')}{nb('n1')}{mark('a', 1, 'À')} l’{mark('o', 2, 'œ')}uvre{nb('n2')}:<br />un français natif{nb('n3')}{mark('q2', 4, '»')}
              </div>
              <div className="sc-fp-lines">
                <Bar w={150} h={6} tone={2} />
                <Bar w={120} h={6} tone={2} />
                <Bar w={140} h={6} tone={2} />
              </div>
            </div>
            <div className="sc-fp-insp" data-show={s.insp || undefined}>
              {l.map((label, i) => (
                <div
                  key={label}
                  className="sc-fp-row"
                  style={{ ['--i' as string]: i }}
                  data-show={s.rows > i || undefined}
                  data-on={(i === 0 && s.m >= 4) || undefined}
                >
                  <span className="sc-fp-tile">{GLYPHS[i]}</span>
                  <span className="sc-fp-label">{label}</span>
                </div>
              ))}
            </div>
          </>
        )
      }}
    </ResourceStage>
  )
}
