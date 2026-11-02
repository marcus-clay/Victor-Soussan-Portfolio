'use client'

import React from 'react'
import { Bubble, Icon, Phone, Thread } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './ai-design-skills.css'

/** ai-design-skills: an assistant's reply that cites its source and asks before acting, on a phone cropped to the conversation */
export const READY = true

const T = {
  en: {
    ask: 'Cancel my membership',
    answer: 'Your plan renews on 30 Nov. If you cancel now, access ends on that date.',
    source: 'Source: your contract',
    yes: 'Cancel plan',
    no: 'Keep it',
    ph: 'Message the assistant',
  },
  fr: {
    ask: 'Résilier mon abonnement',
    answer: 'Votre abonnement se renouvelle le 30 nov. Si vous résiliez maintenant, l’accès s’arrête à cette date.',
    source: 'Source : votre contrat',
    yes: 'Résilier',
    no: 'Garder',
    ph: 'Écrire à l’assistant',
  },
} as const

function ArrowUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path d="M8 13V3.5M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <Phone width={326} className="sc-ai-design-skills-phone">
        <Thread app="chat" className="sc-ai-design-skills-thread">
          <Bubble from="me">{t.ask}</Bubble>
          <Bubble from="them">
            <span className="sc-ai-design-skills-answer">
              <span>{t.answer}</span>
              <span className="sc-ai-design-skills-source">
                <Icon name="file" size={14} filled={false} />
                {t.source}
              </span>
              <span className="sc-ai-design-skills-actions">
                <span className="sc-ai-design-skills-btn" data-primary>{t.yes}</span>
                <span className="sc-ai-design-skills-btn">{t.no}</span>
              </span>
            </span>
          </Bubble>
        </Thread>
        <div className="sc-ai-design-skills-compose">
          <span className="sc-ai-design-skills-field">
            <span>{t.ph}</span>
            <span className="sc-ai-design-skills-send"><ArrowUp /></span>
          </span>
        </div>
      </Phone>
    </StillStage>
  )
}
