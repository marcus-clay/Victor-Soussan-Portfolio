'use client'

import React from 'react'
import { Icon, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './pptx.css'

/**
 * pptx: a request in a conversation answered with a .pptx file, ready to download.
 *
 * On hover only (no loop): the conversation is emptied from the foot up (clear, about 0.6 s), then the request arrives, the
 * answer follows, the file card comes in, and the two skills it used come last (build, about 3 s), ending on the finished
 * frame.
 */
export const READY = true

const TEXT = {
  en: { win: 'Chat', q: 'Make the deck from this brief', a: 'Done. Your presentation is ready.', kind: 'Presentation' },
  fr: { win: 'Discussion', q: 'Fais le deck à partir de ce brief', a: 'Voilà, la présentation est prête.', kind: 'Présentation' },
}

/** How far the conversation has gone: 1 the request, 2 the answer, 3 the file card, 4 the skills used */
type S = { step: number }
const EMPTY: S = { step: 0 }
const DONE: S = { step: 4 }

// Out: the skills and the file go first, then the answer and the request
async function clear(a: Act<S>) {
  await a.set({ step: 2 })
  await a.wait(110)
  await a.set({ step: 0 })
  await a.wait(330)
}

// In: the request, then the answer, then the file, then the two skills one after the other
async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ step: 1 })
  await a.wait(800)
  await a.set({ step: 2 })
  await a.wait(750)
  await a.set({ step: 3 })
  await a.wait(750)
  await a.set({ step: 4 })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
        <Window title={t.win} className="sc-px-win">
          <div className="sc-px-chat">
            <div className="sc-px-q" data-show={s.step >= 1 || undefined}>{t.q}</div>
            <div className="sc-px-a" data-show={s.step >= 2 || undefined}>{t.a}</div>
            <div className="sc-px-file" data-show={s.step >= 3 || undefined}>
              <span className="sc-px-icon"><Icon name="file" size={18} stroke={1.8} /></span>
              <div>
                <div className="sc-px-name">deck.pptx</div>
                <div className="sc-px-kind">{t.kind}</div>
              </div>
              <span className="sc-px-dl"><Icon name="arrow" size={14} stroke={1.8} style={{ transform: 'rotate(90deg)' }} /></span>
            </div>
            <div className="sc-px-used">
              <span style={{ ['--i' as string]: 0 }} data-show={s.step >= 4 || undefined}>slides</span>
              <span style={{ ['--i' as string]: 1 }} data-show={s.step >= 4 || undefined}>brand-system</span>
            </div>
          </div>
        </Window>
      )}
    </ResourceStage>
  )
}
