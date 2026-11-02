'use client'

import React from 'react'
import { Bar, Prompt, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
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

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <Window chrome="terminal" lights="grey" className="sc-impeccable-term">
        <div className="ss-term">
          <Prompt path="~/shop">/impeccable polish</Prompt>
          <div className="dim">{t.reading}</div>
          <div><span className="ok">✓</span> {t.l1}</div>
          <div><span className="ok">✓</span> {t.l2}</div>
          <div className="sc-impeccable-flag"><b>!</b> {t.l3}</div>
          <div><span className="ok">✓</span> {t.l4}</div>
        </div>
      </Window>
      <div className="sc-impeccable-card">
        <Text className="sc-impeccable-card__label">{t.card}</Text>
        <div className="sc-impeccable-btn">{t.btn}</div>
        <Bar w={84} h={6} tone={2} />
      </div>
    </StillStage>
  )
}
