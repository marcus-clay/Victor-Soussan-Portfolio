'use client'

import React from 'react'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './diagram-storytelling.css'

/**
 * diagram-storytelling: one idea per diagram, here a three-screen flow on a slide, in black and white with one accent path.
 *
 * On hover only (no loop): the second and third screens, their labels, the arrows and the accent on the middle screen
 * leave (clear, about 0.6 s), then the first screen stays as the start, the first arrow is drawn and the Search screen
 * rises, its field lights up in the accent, the accent arrow is drawn and the Result screen rises (build, about 2.6 s).
 * It ends on the finished slide, which is also the poster.
 */
export const READY = true

const TEXT = {
  en: { title: 'Three screens, one path', labels: ['Home', 'Search', 'Result'] },
  fr: { title: 'Trois écrans, un seul chemin', labels: ['Accueil', 'Recherche', 'Résultat'] },
}
const X = [24, 136, 248]

/** The two arrows are drawn on: a shaft, then its head (each its own normalised stroke) */
function Arrow({ d, cls, on }: { d: string; cls: string; on: boolean }) {
  return (
    <>
      {d.split(/(?=M)/).map((part, i) => (
        <path
          key={i}
          className={`sc-ds-line sc-ds-draw ${cls}`.trim()}
          d={part.trim()}
          pathLength={1}
          data-on={on || undefined}
          style={{ ['--d' as string]: `${i * 140}ms` }}
        />
      ))}
    </>
  )
}

/** shown: how many screens (with their label) are there, from 1 (the start stays); a1 and a2: the arrows; hot: the middle screen's accent zone */
type S = { shown: number; a1: boolean; hot: boolean; a2: boolean }
const EMPTY: S = { shown: 1, a1: false, hot: false, a2: false }
const DONE: S = { shown: 3, a1: true, hot: true, a2: true }

// In: the first arrow and the Search screen, its accent zone, then the accent arrow and the Result screen
async function build(a: Act<S>) {
  await a.wait(350)
  await a.set({ a1: true })
  await a.wait(220)
  await a.set({ shown: 2 })
  await a.wait(750)
  await a.set({ hot: true })
  await a.wait(650)
  await a.set({ a2: true })
  await a.wait(220)
  await a.set({ shown: 3 })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
        <div className="sc-ds-slide">
          <div className="sc-ds-title">{t.title}</div>

          <div className="sc-ds-screen" style={{ left: X[0] }}>
            <span className="sc-ds-zone" style={{ width: '60%' }} />
            <span className="sc-ds-zone is-field" />
            <span className="sc-ds-zone is-block" />
            <span className="sc-ds-zone" style={{ width: '80%' }} />
          </div>
          <div className="sc-ds-screen sc-ds-rise" data-show={s.shown > 1 || undefined} style={{ left: X[1] }}>
            <span className="sc-ds-zone is-field" />
            <span className="sc-ds-zone" />
            <span className="sc-ds-zone is-hot" data-on={s.hot || undefined} />
            <span className="sc-ds-zone" />
          </div>
          <div className="sc-ds-screen sc-ds-rise" data-show={s.shown > 2 || undefined} style={{ left: X[2] }}>
            <span className="sc-ds-zone" style={{ width: '70%' }} />
            <span className="sc-ds-zone is-block" style={{ height: 40 }} />
            <span className="sc-ds-zone" />
            <span className="sc-ds-zone" style={{ width: '55%' }} />
          </div>

          {t.labels.map((l, i) => (
            <span key={l} className={`sc-ds-label${i === 2 ? ' is-last' : ''}${i > 0 ? ' sc-ds-rise' : ''}`} data-show={s.shown > i || undefined} style={{ left: X[i] }}>{l}</span>
          ))}

          <svg className="sc-ds-arrows" viewBox="0 0 380 290" aria-hidden>
            <Arrow cls="" on={s.a1} d="M111 113 C118 108 124 108 131 112 M124 106 L132 112 L124 117" />
            <Arrow cls="is-acc" on={s.a2} d="M223 137 C230 132 236 132 243 136 M236 130 L244 136 L236 141" />
          </svg>
        </div>
      )}
    </ResourceStage>
  )
}
