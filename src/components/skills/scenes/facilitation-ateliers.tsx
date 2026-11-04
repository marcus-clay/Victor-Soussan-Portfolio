'use client'

import React from 'react'
import { Icon, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './facilitation-ateliers.css'

/**
 * facilitation-ateliers: a timed run of show for a workshop, the closing step (the decision) highlighted. From the corner-chip example.
 *
 * On hover only (no loop): the duration pill and the lines leave (clear, about 0.6 s), then the pill returns, the five
 * steps are written one after the other and the decision is lit last (build, about 2.4 s), ending on the finished frame.
 */
export const READY = true

const TEXT = {
  en: {
    title: 'Prioritisation workshop',
    people: '6 people',
    chip: '90 min',
    steps: [
      ['0:00', 'Opening'],
      ['0:10', 'Ideas, alone'],
      ['0:30', 'Group similar ideas'],
      ['0:55', 'Vote with dots'],
      ['1:15', 'Decision'],
    ],
  },
  fr: {
    title: 'Atelier de priorisation',
    people: '6 personnes',
    chip: '90 min',
    steps: [
      ['0:00', 'Ouverture'],
      ['0:10', 'Idées, en solo'],
      ['0:30', 'Regrouper les idées'],
      ['0:55', 'Vote par points'],
      ['1:15', 'Décision'],
    ],
  },
} as const

/** n: how many steps of the run are written; goal: the decision is lit; pill: the duration chip is there */
type S = { n: number; goal: boolean; pill: boolean }
const EMPTY: S = { n: 0, goal: false, pill: false }
const DONE: S = { n: 5, goal: true, pill: true }

// Out: the decision goes dark, then the lines leave last first while the pill goes
async function clear(a: Act<S>) {
  await a.set({ goal: false, pill: false })
  await a.wait(60)
  for (const n of [4, 3, 2, 1, 0]) {
    await a.set({ n })
    await a.wait(60)
  }
  await a.wait(120)
}

// In: the pill returns, the steps are written one after the other, the decision is lit last
async function build(a: Act<S>) {
  await a.set({ pill: true })
  await a.wait(420)
  for (const n of [1, 2, 3, 4, 5]) {
    await a.set({ n })
    await a.wait(n === 5 ? 380 : 190)
  }
  await a.set({ goal: true })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <Window title={t.title} className="sc-facilitation-ateliers-win" body={{ className: 'sc-facilitation-ateliers-body' }}>
        <div className="sc-facilitation-ateliers-head">
          <Text className="sc-facilitation-ateliers-meta" style={{ marginLeft: 0 }}>{t.people}</Text>
        </div>
        {t.steps.map(([time, what], i) => {
          const goal = i === t.steps.length - 1
          return (
            <div key={time} className="sc-facilitation-ateliers-row" data-goal={goal || undefined} data-in={i < s.n || undefined} data-lit={(goal && s.goal) || undefined}>
              <span className="sc-facilitation-ateliers-time">{time}</span>
              <span className="sc-facilitation-ateliers-what">{what}</span>
              {goal && (
                <span className="sc-facilitation-ateliers-tick">
                  <Icon name="check" filled size={18} />
                </span>
              )}
            </div>
          )
        })}
      </Window>
      <div className="sc-facilitation-ateliers-pill" data-show={s.pill || undefined}>
        <Icon name="clock" size={14} />
        {t.chip}
      </div>
      </>
      )}
    </ResourceStage>
  )
}
