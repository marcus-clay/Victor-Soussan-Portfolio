'use client'

import React from 'react'
import { Icon, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './pptx.css'

/** pptx: a request in a conversation answered with a .pptx file, ready to download */
export const READY = true

const TEXT = {
  en: { win: 'Chat', q: 'Make the deck from this brief', a: 'Done. Your presentation is ready.', kind: 'Presentation' },
  fr: { win: 'Discussion', q: 'Fais le deck à partir de ce brief', a: 'Voilà, la présentation est prête.', kind: 'Présentation' },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window title={t.win} className="sc-px-win">
        <div className="sc-px-chat">
          <div className="sc-px-q">{t.q}</div>
          <div className="sc-px-a">{t.a}</div>
          <div className="sc-px-file">
            <span className="sc-px-icon"><Icon name="file" size={18} stroke={1.8} /></span>
            <div>
              <div className="sc-px-name">deck.pptx</div>
              <div className="sc-px-kind">{t.kind}</div>
            </div>
            <span className="sc-px-dl"><Icon name="arrow" size={14} stroke={1.8} style={{ transform: 'rotate(90deg)' }} /></span>
          </div>
          <div className="sc-px-used"><span>slides</span><span>brand-system</span></div>
        </div>
      </Window>
    </StillStage>
  )
}
