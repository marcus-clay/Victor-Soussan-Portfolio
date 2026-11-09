'use client'

import React from 'react'
import { Count, Icon, Segmented, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './ship-to-show.css'

/**
 * ship-to-show: a published bilingual case study with a video, and the seven phases that ended in it. From the static-card example (hero page, one satellite on its left edge).
 *
 * On hover only (no loop): the state line and the phase count leave and the seven segments go back to empty (clear, about
 * 0.7 s); then the count returns, the seven phases fill one after the other while the figure rolls to 7, and the case study
 * is marked published (build, about 2.6 s), ending on the finished frame.
 */
export const READY = true

const TEXT = {
  en: { url: 'acme.co/work/checkout', kicker: 'Case study', title: 'Checkout redesign', state: 'Published', count: ['Phase\u00a0', '\u00a0of\u00a07'] },
  fr: { url: 'acme.co/work/paiement', kicker: 'Étude de cas', title: 'Refonte du paiement', state: 'Publiée', count: ['Phase\u00a0', '\u00a0sur\u00a07'] },
} as const

/** n: how many of the seven segments are filled; cnt: the figure of the count; count: the count line is there; done: the case study is marked published */
type S = { n: number; cnt: number; count: boolean; done: boolean }
const EMPTY: S = { n: 0, cnt: 1, count: false, done: false }
const DONE: S = { n: 7, cnt: 7, count: true, done: true }

// In: the count returns, the seven phases fill one after the other while the figure rolls to 7, the state arrives
async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ count: true })
  await a.wait(380)
  await a.set({ cnt: 7 })
  for (const n of [1, 2, 3, 4, 5, 6, 7]) {
    await a.set({ n })
    await a.wait(125)
  }
  await a.wait(420)
  await a.set({ done: true })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <Window url={t.url} urlShape="pill" className="sc-ship-to-show-win" body={{ className: 'sc-ship-to-show-page' }}>
        <Text className="sc-ship-to-show-kicker">{t.kicker}</Text>
        <div className="sc-ship-to-show-head">
          <Text className="sc-ship-to-show-title">{t.title}</Text>
          <Segmented items={['FR', 'EN']} value={lang === 'fr' ? 0 : 1} className="sc-ship-to-show-seg" />
        </div>
        <div className="sc-ship-to-show-video">
          <span className="sc-ship-to-show-play">
            <Icon name="play" filled size={16} />
          </span>
        </div>
      </Window>
      <div className="sc-ship-to-show-card">
        <div className="sc-ship-to-show-state" data-in={s.done || undefined}>
          <Icon name="check" filled size={18} />
          {t.state}
        </div>
        <div className="sc-ship-to-show-steps">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <i key={i} data-on={i < s.n || undefined} />
          ))}
        </div>
        <div className="sc-ship-to-show-count" data-in={s.count || undefined}>
          {t.count[0]}
          <Count value={s.cnt} format={String} duration={900} />
          {t.count[1]}
        </div>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
