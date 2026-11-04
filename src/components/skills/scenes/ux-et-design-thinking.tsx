'use client'

import React from 'react'
import { Badge, Bar, Phone, Pin } from '@/components/stageshow/kit'
import { FileText, Search } from 'lucide-react'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './ux-et-design-thinking.css'

/**
 * ux-et-design-thinking: a mobile search screen with two numbered review pins, and the job to be done it is judged against.
 *
 * On hover only (no loop): the pins, their tags and the job card leave (clear, about 0.6 s), then the job card arrives,
 * and each observation is pinned on the screen and classed under the job: pin 1 with « Fait », then pin 2 with
 * « Hypothèse » (build, about 3 s), ending on the finished frame, which is also the resting look. The screen itself
 * stays in place.
 */
export const READY = true

/** Scene state: the job card shown, each pin shown, each tag shown */
type S = { card: boolean; p1: boolean; p2: boolean; t1: boolean; t2: boolean }
const EMPTY: S = { card: false, p1: false, p2: false, t1: false, t2: false }
const DONE: S = { card: true, p1: true, p2: true, t1: true, t2: true }

// Out: the second pin and its tag, then the first, then the job card
async function clear(a: Act<S>) {
  await a.set({ p2: false, t2: false })
  await a.wait(90)
  await a.set({ p1: false, t1: false })
  await a.wait(90)
  await a.set({ card: false })
  await a.wait(340)
}

// In: the job card, a rest to read it, then pin 1 with its tag, a rest, then pin 2 with its tag
async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ card: true })
  await a.wait(850)
  await a.set({ p1: true })
  await a.wait(120)
  await a.set({ t1: true })
  await a.wait(700)
  await a.set({ p2: true })
  await a.wait(120)
  await a.set({ t2: true })
  await a.wait(450)
}

const T = {
  en: {
    query: 'track my order',
    rows: ['Delivery', 'Returns'],
    kicker: 'Job to be done',
    job: 'Find an answer without rephrasing the question',
    tags: ['Fact', 'Hypothesis'],
  },
  fr: {
    query: 'suivre ma commande',
    rows: ['Livraison', 'Retours'],
    kicker: 'Job à accomplir',
    job: 'Retrouver une réponse sans reformuler sa question',
    tags: ['Fait', 'Hypothèse'],
  },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <Phone width={272} frame="soft" className="sc-ux-phone">
        <div className="sc-ux-screen">
          <div className="sc-ux-field">
            <Search size={22} strokeWidth={1.8} />
            {t.query}
            <Pin name="1" size={36} corner="bl" tone="accent" className="sc-ux-pin" data-show={s.p1 || undefined} style={{ left: 10, top: -32 }} />
          </div>
          <div className="sc-ux-list">
            {t.rows.map((r, i) => (
              <div key={r} className="sc-ux-row">
                {i === 0 && <Pin name="2" size={36} corner="bl" tone="ink" className="sc-ux-pin" data-show={s.p2 || undefined} style={{ left: 186, top: 4 }} />}
                <span className="sc-ux-tile"><FileText size={22} strokeWidth={1.7} /></span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <span className="sc-ux-name">{r}</span>
                  <Bar w={120} h={9} tone={2} />
                </div>
              </div>
            ))}
            {[[150, 110], [128, 96]].map(([w1, w2]) => (
              <div key={w1} className="sc-ux-row">
                <span className="sc-ux-tile" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <Bar w={w1} h={12} tone={3} />
                  <Bar w={w2} h={9} tone={2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Phone>
      <div className="sc-ux-card" data-show={s.card || undefined}>
        <div className="sc-ux-kicker">{t.kicker}</div>
        <div className="sc-ux-job">{t.job}</div>
        <div className="sc-ux-tags">
          <Badge className="sc-ux-tag" data-show={s.t1 || undefined}>{t.tags[0]}</Badge>
          <Badge className="sc-ux-tag" data-show={s.t2 || undefined}>{t.tags[1]}</Badge>
        </div>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
