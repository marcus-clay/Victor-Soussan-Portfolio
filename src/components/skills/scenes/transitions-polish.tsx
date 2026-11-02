'use client'

import React from 'react'
import { Code, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './transitions-polish.css'

/** transitions-polish: a CSS diff that shortens a transition, and a small before/after card for its duration. From the overlap example (a window with a smaller card whose edge lands on its lower border). */
export const READY = true

const TEXT = {
  en: { cap: 'Duration', old: '250 ms', now: '150 ms' },
  fr: { cap: 'Durée', old: '250 ms', now: '150 ms' },
} as const

const LINES = [
  '.menu {',
  { text: '  transition: all 250ms ease;', kind: 'del' as const },
  { text: '  transition: opacity 150ms ease-out;', kind: 'add' as const },
  '}',
]

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window title="menu.css" className="sc-transitions-polish-win" body={{ className: 'sc-transitions-polish-body' }}>
        <Code lines={LINES} numbers={false} />
      </Window>
      <div className="sc-transitions-polish-card">
        <div className="sc-transitions-polish-cap">{t.cap}</div>
        <div className="sc-transitions-polish-line">
          <span>{t.old}</span>
          <i />
        </div>
        <div className="sc-transitions-polish-line" data-now>
          <span>{t.now}</span>
          <i />
        </div>
      </div>
    </StillStage>
  )
}
