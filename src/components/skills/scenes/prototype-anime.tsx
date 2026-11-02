'use client'

import React from 'react'
import { Icon, Phone } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './prototype-anime.css'

/** prototype-anime: an app screen played as a film: a phone, the glass finger about to tap, the scrubber of the film. From the phone-touch and corner-chip examples. */
export const READY = true

const TEXT = {
  en: { title: 'Book a ride', from: 'From', to: 'To', a: 'Paris', b: 'Lyon', cta: 'Continue', time: '0:12' },
  fr: { title: 'Réserver', from: 'Départ', to: 'Arrivée', a: 'Paris', b: 'Lyon', cta: 'Continuer', time: '0:12' },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Phone width={290} className="sc-prototype-anime-phone">
        <div className="sc-prototype-anime-screen">
          <div className="sc-prototype-anime-title">{t.title}</div>
          <div className="sc-prototype-anime-card">
            <div className="sc-prototype-anime-field">
              <span>{t.from}</span>
              <span>{t.a}</span>
            </div>
            <div className="sc-prototype-anime-field">
              <span>{t.to}</span>
              <span>{t.b}</span>
            </div>
          </div>
          <div className="sc-prototype-anime-cta">
            {t.cta}
            <span className="sc-prototype-anime-finger" />
          </div>
        </div>
      </Phone>
      <div className="sc-prototype-anime-scrub">
        <Icon name="play" filled size={14} />
        <div className="sc-prototype-anime-track">
          <i />
          <b data-done style={{ left: '0%' }} />
          <b data-done style={{ left: '22%' }} />
          <b style={{ left: '72%' }} />
          <b style={{ left: '100%' }} />
          <em />
        </div>
        <span className="sc-prototype-anime-time">{t.time}</span>
      </div>
    </StillStage>
  )
}
