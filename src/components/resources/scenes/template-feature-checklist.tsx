'use client'

import React from 'react'
import { Bar, Check, Count, Meter, Row, Text, type Act } from '@/components/stageshow/kit'
import ResourceStage from './ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './template-feature-checklist.css'

/**
 * template-feature-checklist: a stand-alone list card (a reminders list, no window) shown in close-up: large corners,
 * the title « Checklist », big tick rows at about 1.4x, a filler row running off the foot, and a small « 2 sur 5 » pill
 * on its right edge. From the close-up example (one control at 1.4x, row whole) and stacked-cards (a card off the bottom).
 *
 * On hover only (no loop): the pill and the ticks leave (clear), then the pill returns and the first and second lines are
 * ticked, the meter fills and its figure rolls 1, 2 (build, about 2.4 s), ending on the finished frame. The poster is that
 * finished frame (2 of 5), the resting look.
 */
export const READY = true

const T = {
  en: {
    title: 'Checklist',
    items: ['Goal', 'Empty states', 'Errors', 'Screen sizes'],
    progress: (n: number) => `${n}\u00a0of\u00a05`,
  },
  fr: {
    title: 'Checklist',
    items: ['Objectif', 'États vides', 'Erreurs', 'Adaptation aux écrans'],
    progress: (n: number) => `${n}\u00a0sur\u00a05`,
  },
}
const TOTAL = 5

type S = { n: number; cnt: number; pill: boolean }

// The empty frame (no line ticked) and the finished one, which is the resting look (2 of 5)
const EMPTY: S = { n: 0, cnt: 0, pill: true }
const DONE: S = { n: 2, cnt: 2, pill: true }

// Out: the pill leaves while the ticks fade, last line first; the figure goes back while the pill is hidden
async function clear(a: Act<S>) {
  await a.set({ pill: false })
  await a.set({ n: 1 })
  await a.wait(90)
  await a.set({ n: 0 })
  await a.wait(400)
  await a.snap({ cnt: 0 })
  await a.wait(80)
}

// In: the pill returns, then the first and the second line are ticked, the meter fills and the figure rolls 1, 2
async function build(a: Act<S>) {
  await a.set({ pill: true })
  await a.wait(450)
  await a.set({ n: 1 })
  await a.wait(130)
  await a.set({ cnt: 1 })
  await a.wait(650)
  await a.set({ n: 2 })
  await a.wait(130)
  await a.set({ cnt: 2 })
  await a.wait(450)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
        <div className="sc-res-checklist-root">
          <div className="sc-res-checklist-card">
            <Text className="sc-res-checklist-title">{t.title}</Text>
            <div className="sc-res-checklist-list">
              {t.items.map((item, i) => (
                <Row
                  key={item}
                  pad={12}
                  className="sc-res-checklist-row"
                  lead={<Check on={i < s.n} size={22} />}
                  title={<Text className="sc-res-checklist-item">{item}</Text>}
                />
              ))}
              <Row
                pad={12}
                className="sc-res-checklist-row"
                lead={<Bar w={22} h={22} r={11} tone={2} />}
                title={<Bar w={140} h={9} tone={2} />}
              />
            </div>
          </div>

          <div className="sc-res-checklist-pill" data-show={s.pill || undefined}>
            <Meter value={s.cnt / TOTAL} tone="ink" className="sc-res-checklist-meter" />
            <Count value={s.cnt} format={t.progress} duration={420} className="sc-res-checklist-count" />
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
