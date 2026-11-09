'use client'

import React from 'react'
import { Roll } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './taste-skill.css'

/** taste-skill: three dials (variance, motion, density) over the page they shape */
export const READY = true

const T = {
  en: {
    dials: [
      { name: 'Variance', value: 'High', mid: 'Medium', at: 0.78 },
      { name: 'Motion', value: 'Low', mid: 'Medium', at: 0.24 },
      { name: 'Density', value: 'Medium', mid: 'Medium', at: 0.5 },
    ],
    headline: 'Software with a point of view',
    cta: 'See the work',
  },
  fr: {
    dials: [
      { name: 'Variance', value: 'Forte', mid: 'Moyenne', at: 0.78 },
      { name: 'Mouvement', value: 'Faible', mid: 'Moyenne', at: 0.24 },
      { name: 'Densité', value: 'Moyenne', mid: 'Moyenne', at: 0.5 },
    ],
    headline: 'Des outils avec un point de vue',
    cta: 'Voir le travail',
  },
} as const

/** Scene state: whether the variance and motion dials are turned (the density dial stays on medium), and the page lines shown (0 none, 1 headline, 2 headline and button). */
type S = { v: boolean; m: boolean; page: number }
const EMPTY: S = { v: false, m: false, page: 0 }
const DONE: S = { v: true, m: true, page: 2 }

/** In (about 3 s): variance is turned up and reads High, motion is turned down and reads Low, then the page they shape writes its headline and button. */
async function build(a: Act<S>) {
  await a.wait(200)
  await a.set({ v: true })
  await a.wait(900)
  await a.set({ m: true })
  await a.wait(900)
  await a.set({ page: 1 })
  await a.wait(280)
  await a.set({ page: 2 })
  await a.wait(400)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <div className="sc-taste-skill-stack">
        <section className="sc-taste-skill-card sc-taste-skill-dials">
          {t.dials.map((d, i) => {
            const turned = i === 0 ? s.v : i === 1 ? s.m : true
            const at = turned ? d.at : 0.5
            return (
            <div key={d.name} className="sc-taste-skill-dial">
              <span className="sc-taste-skill-dial__name">{d.name}</span>
              <span className="sc-taste-skill-track">
                <span className="sc-taste-skill-fill" style={{ width: `${at * 100}%` }} />
                <span className="sc-taste-skill-knob" style={{ left: `${at * 100}%` }} />
              </span>
              <span className="sc-taste-skill-dial__value"><Roll align="end">{turned ? d.value : d.mid}</Roll></span>
            </div>
            )
          })}
        </section>
        <section className="sc-taste-skill-page">
          <div className="sc-taste-skill-headline" data-on={s.page > 0 || undefined}>{t.headline}</div>
          <div className="sc-taste-skill-cta" data-on={s.page > 1 || undefined}>{t.cta}</div>
        </section>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
