'use client'

import React from 'react'
import { Badge, Icon, Meter, Text } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './creative-director.css'

/**
 * creative-director: an insight note stuck on a concept card, and the concept scored against its criteria.
 *
 * On hover only: the badge, the three scores and the note leave (clear, about 0.6 s); then the insight is stuck on the
 * concept, the three bars are drawn one after the other and the « Refined » badge closes the sequence (build, about
 * 3 s). The concept itself stays in place. The poster is the finished frame, the resting look.
 */
export const READY = true

/** Whether the insight note is shown, the three scores (0 to 1), whether the badge is shown, and whether the bars move fast (when they go back) */
type S = { note: boolean; m: [number, number, number]; badge: boolean; quick: boolean }
const SCORES: S['m'] = [0.86, 0.94, 0.7]
const EMPTY: S = { note: false, m: [0, 0, 0], badge: false, quick: true }
const DONE: S = { note: true, m: SCORES, badge: true, quick: false }

async function clear(a: Act<S>) {
  await a.set({ badge: false })
  await a.wait(80)
  await a.set({ m: [0, 0, 0], quick: true })
  await a.wait(120)
  await a.set({ note: false })
  await a.wait(360)
}

async function build(a: Act<S>) {
  await a.wait(300)
  await a.set({ note: true })
  await a.wait(700)
  await a.set({ quick: false, m: [SCORES[0], 0, 0] })
  await a.wait(150)
  await a.set({ m: [SCORES[0], SCORES[1], 0] })
  await a.wait(150)
  await a.set({ m: SCORES })
  await a.wait(750)
  await a.set({ badge: true })
  await a.wait(450)
}

const T = {
  en: {
    insight: 'Insight',
    insightText: 'People plan trips by feeling, not by dates.',
    badge: 'Refined',
    title: 'Trip by mood',
    sub: 'Pick a feeling, get a route.',
    crit: [
      ['Originality', 0.86],
      ['Insight fit', 0.94],
      ['Craft', 0.7],
    ],
  },
  fr: {
    insight: 'Insight',
    insightText: 'On prépare un voyage à l’envie, pas à la date.',
    badge: 'Affiné',
    title: 'Voyage à l’humeur',
    sub: 'Choisissez une envie, obtenez un trajet.',
    crit: [
      ['Originalité', 0.86],
      ['Justesse', 0.94],
      ['Exécution', 0.7],
    ],
  },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
        <>
          <section className="sc-creative-director-card">
            <div className="sc-creative-director-head">
              <span>Concept</span>
              <Badge tone="accent" className="sc-creative-director-badge" data-show={s.badge || undefined} icon={<Icon name="check" size={11} stroke={2} />}>{t.badge}</Badge>
            </div>
            <Text className="sc-creative-director-title">{t.title}</Text>
            <Text className="sc-creative-director-sub">{t.sub}</Text>
            <div className="sc-creative-director-criteria" data-quick={s.quick || undefined}>
              {t.crit.map(([name], i) => (
                <div key={name} className="sc-creative-director-crit">
                  <span>{name}</span>
                  <Meter value={s.m[i]} />
                </div>
              ))}
            </div>
          </section>
          <div className="sc-creative-director-note" data-show={s.note || undefined}>
            <span className="sc-creative-director-note__label">{t.insight}</span>
            <span className="sc-creative-director-note__text">{t.insightText}</span>
          </div>
        </>
      )}
    </ResourceStage>
  )
}
