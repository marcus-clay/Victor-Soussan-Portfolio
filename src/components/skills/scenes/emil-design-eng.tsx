'use client'

import React from 'react'
import { Segmented, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './emil-design-eng.css'

/**
 * emil-design-eng: a timing inspector, the ease-out curve chosen over the linear one, 200 ms. From the close-up example (one window, one subject, the rest context).
 *
 * On hover only: the tag and the press value leave, the curve is taken back and the selector returns to ease-in (clear, about 0.6 s);
 * then ease-out is chosen, the curve draws itself, the tag and the press value come in (build, about 2.7 s), ending on the resting frame.
 */
export const READY = true

const TEXT = {
  en: { title: 'Animation', press: 'Press', val: 'scale 0.97', ms: '200 ms', curve: 'Curve', items: ['ease-in', 'ease-out', 'linear'] },
  fr: { title: 'Animation', press: 'Appui', val: 'scale\u00a00,97', ms: '200 ms', curve: 'Courbe', items: ['ease-in', 'ease-out', 'linear'] },
} as const

/** seg: the selected curve (0 ease-in, 1 ease-out); curve: the ease-out line drawn; tag: the duration label; val: the press value */
type S = { seg: number; curve: boolean; tag: boolean; val: boolean }
const EMPTY: S = { seg: 0, curve: false, tag: false, val: false }
const DONE: S = { seg: 1, curve: true, tag: true, val: true }

async function build(a: Act<S>) {
  await a.wait(300)
  await a.set({ seg: 1 })
  await a.wait(560)
  await a.set({ curve: true })
  await a.wait(1050)
  await a.set({ tag: true })
  await a.wait(420)
  await a.set({ val: true })
  await a.wait(400)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <Window title={t.title} className="sc-emil-design-eng-win" body={{ className: 'sc-emil-design-eng-body' }}>
        <div className="sc-emil-design-eng-plot">
          <svg viewBox="0 0 314 124" aria-hidden>
            {[20, 60, 100].map((y) => (
              <line key={y} x1="18" x2="296" y1={y} y2={y} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            ))}
            <line x1="18" y1="100" x2="296" y2="20" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" />
            <path className="sc-emil-design-eng-curve" data-on={s.curve || undefined} pathLength={1} d="M18 100 C81.9 20 107 20 296 20" fill="none" stroke="var(--ss-accent)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="18" cy="100" r="3.5" fill="#fff" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
            <circle className="sc-emil-design-eng-end" data-on={s.curve || undefined} cx="296" cy="20" r="6" fill="var(--ss-accent)" stroke="#fff" strokeWidth="2.5" />
          </svg>
          <span className="sc-emil-design-eng-tag" data-on={s.tag || undefined}>{t.ms}</span>
        </div>
        <div className="sc-emil-design-eng-rows">
          <div className="sc-emil-design-eng-row">
            <span>{t.curve}</span>
            <Segmented items={[...t.items]} value={s.seg} className="sc-emil-design-eng-seg" />
          </div>
          <div className="sc-emil-design-eng-row">
            <span>{t.press}</span>
            <b className="sc-emil-design-eng-val" data-on={s.val || undefined}>{t.val}</b>
          </div>
        </div>
      </Window>
      )}
    </ResourceStage>
  )
}
