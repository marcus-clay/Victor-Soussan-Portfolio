'use client'

import React from 'react'
import { Avatar, Text } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './designer-skills.css'

/** designer-skills: three sheets of design paper, a persona on top of a journey and a wall of notes */
export const READY = true

const T = {
  en: {
    name: 'Maya',
    role: 'Freelance designer',
    quote: '“I want the real price, up front.”',
    facts: [
      ['Goal', 'Compare plans'],
      ['Blocker', 'Hidden fees'],
    ],
  },
  fr: {
    name: 'Maya',
    role: 'Designer indépendante',
    quote: '« Je veux le vrai prix, dès le départ. »',
    facts: [
      ['Objectif', 'Comparer'],
      ['Frein', 'Frais cachés'],
    ],
  },
} as const

const STEPS = [0, 33, 66, 100]

/** Scene state: the wall of notes behind (the card and how many of its notes), the journey card (the card and how many of its four steps). The persona on top stays in place. */
type S = { back: boolean; notes: number; mid: boolean; dots: number }
const EMPTY: S = { back: false, notes: 0, mid: false, dots: 0 }
const DONE: S = { back: true, notes: 3, mid: true, dots: 4 }

/** In (about 3.3 s): the wall of notes slides in behind the persona and its notes appear, then the journey card and its four steps, the last one in the accent. */
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ back: true })
  await a.wait(380)
  await a.set({ notes: 1 })
  await a.wait(110)
  await a.set({ notes: 2 })
  await a.wait(110)
  await a.set({ notes: 3 })
  await a.wait(520)
  await a.set({ mid: true })
  await a.wait(480)
  for (let d = 1; d <= 4; d++) {
    await a.set({ dots: d })
    await a.wait(d === 3 ? 260 : 130)
  }
  await a.wait(300)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <div className="sc-designer-skills-pile">
        <section className="sc-designer-skills-card sc-designer-skills-card--back" data-on={s.back || undefined} aria-hidden>
          <div className="sc-designer-skills-notes">
            <span className="sc-designer-skills-note" data-show={s.notes > 0 || undefined} />
            <span className="sc-designer-skills-note" data-hot data-show={s.notes > 1 || undefined} />
            <span className="sc-designer-skills-note" data-show={s.notes > 2 || undefined} />
          </div>
        </section>
        <section className="sc-designer-skills-card sc-designer-skills-card--mid" data-on={s.mid || undefined} aria-hidden>
          <div className="sc-designer-skills-journey">
            <span className="sc-designer-skills-journey__line" data-show={s.mid || undefined} />
            {STEPS.map((x, i) => (
              <span key={x} className="sc-designer-skills-journey__dot" data-hot={i === 3 || undefined} data-show={s.dots > i || undefined} style={{ left: `calc(${x}% - ${x * 0.14}px)` }} />
            ))}
          </div>
        </section>
        <section className="sc-designer-skills-card sc-designer-skills-card--top">
          <div className="sc-designer-skills-who">
            <Avatar name={t.name} tone="accent" size={38} />
            <div>
              <Text className="sc-designer-skills-name">{t.name}</Text>
              <Text className="sc-designer-skills-role">{t.role}</Text>
            </div>
          </div>
          <blockquote className="sc-designer-skills-quote">{t.quote}</blockquote>
          <div className="sc-designer-skills-facts">
            {t.facts.map(([k, v]) => (
              <div key={k} className="sc-designer-skills-fact">
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      )}
    </ResourceStage>
  )
}
