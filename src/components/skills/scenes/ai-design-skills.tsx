'use client'

import React, { useMemo } from 'react'
import { Bubble, Icon, Phone, Stream, Thread } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './ai-design-skills.css'

/**
 * ai-design-skills: an assistant's reply that cites its source and asks before acting, on a phone cropped to the conversation.
 *
 * On hover only: the buttons, the source and the answer leave (clear, about 0.6 s); then the answer is written word by
 * word, the source it rests on appears, and the two buttons that ask before acting come last (build, about 3 s). The
 * question stays in place throughout. The poster is the finished conversation, the resting look.
 */
export const READY = true

/** How many words of the answer are written, whether the source is shown, how many buttons (0 to 2) are shown */
type S = { words: number; src: boolean; btn: number }
const EMPTY: S = { words: 0, src: false, btn: 0 }
const DONE: S = { words: 999, src: true, btn: 2 }

const T = {
  en: {
    ask: 'Cancel my membership',
    // The answer, one string per line as it breaks in the bubble (the words are written in one after the other)
    lines: ['Your plan renews on 30 Nov. If you cancel now,', 'access ends on that date.'],
    source: 'Source: your contract',
    yes: 'Cancel plan',
    no: 'Keep it',
    ph: 'Message the assistant',
  },
  fr: {
    ask: 'Résilier mon abonnement',
    lines: ['Votre abonnement se renouvelle le 30 nov.', 'Si vous résiliez maintenant, l’accès s’arrête à', 'cette date.'],
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
  // Words before each line, and in all
  const sizes = t.lines.map((l) => l.split(' ').length)
  const starts = sizes.map((_, i) => sizes.slice(0, i).reduce((x, y) => x + y, 0))
  const count = sizes.reduce((x, y) => x + y, 0)
  const build = useMemo(
    () => async (act: Act<S>) => {
      await act.wait(350)
      await act.stagger(Array.from({ length: count }), (_, i) => act.set({ words: i + 1 }), 42)
      await act.wait(420)
      await act.set({ src: true })
      await act.wait(620)
      await act.set({ btn: 1 })
      await act.wait(110)
      await act.set({ btn: 2 })
      await act.wait(450)
    },
    [count],
  )
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
        <Phone width={326} className="sc-ai-design-skills-phone">
          <Thread app="chat" className="sc-ai-design-skills-thread">
            <Bubble from="me">{t.ask}</Bubble>
            <Bubble from="them">
              <span className="sc-ai-design-skills-answer">
                <span>
                  {t.lines.map((line, i) => (
                    <Stream key={i} text={line} count={s.words - starts[i]} />
                  ))}
                </span>
                <span className="sc-ai-design-skills-source sc-ai-design-skills-fx" data-show={s.src || undefined}>
                  <Icon name="file" size={14} filled={false} />
                  {t.source}
                </span>
                <span className="sc-ai-design-skills-actions">
                  <span className="sc-ai-design-skills-btn sc-ai-design-skills-fx" data-primary data-show={s.btn >= 1 || undefined}>{t.yes}</span>
                  <span className="sc-ai-design-skills-btn sc-ai-design-skills-fx" data-show={s.btn >= 2 || undefined}>{t.no}</span>
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
      )}
    </ResourceStage>
  )
}
