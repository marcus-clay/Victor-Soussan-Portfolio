'use client'

import React from 'react'
import { Bar, Prompt, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './impeccable.css'

/** impeccable: a terminal running /impeccable polish on a checkout, and the button it leaves behind */
export const READY = true

const T = {
  en: {
    reading: 'Reading checkout.tsx',
    l1: 'Spacing follows an 8\u00a0px scale',
    l2: 'Contrast passes AA',
    l3: 'Button label wraps on mobile',
    l4: 'Fixed: label on one line',
    card: 'After',
    btn: 'Pay now',
  },
  fr: {
    reading: 'Lecture de checkout.tsx',
    l1: 'Espacements sur une grille de 8\u00a0px',
    l2: 'Contraste conforme AA',
    l3: 'Libellé du bouton sur deux lignes',
    l4: 'Corrigé : libellé sur une ligne',
    card: 'Après',
    btn: 'Payer',
  },
} as const

/** Scene state: how many of the five terminal lines are written, and whether the polished button card is shown. */
type S = { n: number; card: boolean }
const EMPTY: S = { n: 0, card: false }
const DONE: S = { n: 5, card: true }

/** Out (about 0.6 s): the card leaves, then the lines fade from the last to the first. */
async function clear(a: Act<S>) {
  await a.set({ card: false })
  for (let n = 4; n >= 0; n--) {
    await a.wait(70)
    await a.set({ n })
  }
  await a.wait(220)
}

/** In (about 3 s): the terminal reads the file, passes two checks, flags the wrapped label, then the fix lands and the polished button appears. */
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ n: 1 })
  await a.wait(420)
  await a.set({ n: 2 })
  await a.wait(150)
  await a.set({ n: 3 })
  await a.wait(560)
  await a.set({ n: 4 })
  await a.wait(780)
  await a.set({ n: 5 })
  await a.wait(240)
  await a.set({ card: true })
  await a.wait(400)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  const ln = (s: S, i: number, extra = '') => ({ className: `sc-impeccable-ln${extra}`, 'data-on': s.n > i || undefined })
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <Window chrome="terminal" lights="grey" className="sc-impeccable-term">
        <div className="ss-term">
          <Prompt path="~/shop">/impeccable polish</Prompt>
          <div {...ln(s, 0, ' dim')}>{t.reading}</div>
          <div {...ln(s, 1)}><span className="ok">✓</span> {t.l1}</div>
          <div {...ln(s, 2)}><span className="ok">✓</span> {t.l2}</div>
          <div {...ln(s, 3, ' sc-impeccable-flag')}><b>!</b> {t.l3}</div>
          <div {...ln(s, 4)}><span className="ok">✓</span> {t.l4}</div>
        </div>
      </Window>
      <div className="sc-impeccable-card" data-on={s.card || undefined}>
        <Text className="sc-impeccable-card__label">{t.card}</Text>
        <div className="sc-impeccable-btn">{t.btn}</div>
        <Bar w={84} h={6} tone={2} />
      </div>
      </>
      )}
    </ResourceStage>
  )
}
