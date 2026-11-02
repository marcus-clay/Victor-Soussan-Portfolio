'use client'

import React from 'react'
import { Icon, Segmented, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './ship-to-show.css'

/** ship-to-show: a published bilingual case study with a video, and the seven phases that ended in it. From the static-card example (hero page, one satellite on its left edge). */
export const READY = true

const TEXT = {
  en: { url: 'acme.co/work/checkout', kicker: 'Case study', title: 'Checkout redesign', state: 'Published', count: 'Phase 7 of 7' },
  fr: { url: 'acme.co/work/paiement', kicker: 'Étude de cas', title: 'Refonte du paiement', state: 'Publiée', count: 'Phase 7 sur 7' },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
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
        <div className="sc-ship-to-show-state">
          <Icon name="check" filled size={18} />
          {t.state}
        </div>
        <div className="sc-ship-to-show-steps">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <i key={i} />
          ))}
        </div>
        <div className="sc-ship-to-show-count">{t.count}</div>
      </div>
    </StillStage>
  )
}
