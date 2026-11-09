'use client'

import React from 'react'
import { Code, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './transitions-polish.css'

/**
 * transitions-polish: a CSS diff that shortens a transition, and a small before/after card for its duration. From the overlap example (a window with a smaller card whose edge lands on its lower border).
 *
 * On hover only: the new line, the 150 ms row and its bar leave and the old line is back to full ink (clear, about 0.6 s);
 * then the new line is written and the old one goes quiet, the 150 ms row appears and its bar draws (build, about 2.2 s), ending on the resting frame.
 */
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

/** add: the new line is written (and the old one goes quiet); row: the 150 ms row; bar: its bar drawn */
type S = { add: boolean; row: boolean; bar: boolean }
const EMPTY: S = { add: false, row: false, bar: false }
const DONE: S = { add: true, row: true, bar: true }

async function build(a: Act<S>) {
  await a.wait(300)
  await a.set({ add: true })
  await a.wait(780)
  await a.set({ row: true })
  await a.wait(420)
  await a.set({ bar: true })
  await a.wait(600)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <div className="sc-transitions-polish-root" data-add={s.add || undefined}>
      <Window title="menu.css" className="sc-transitions-polish-win" body={{ className: 'sc-transitions-polish-body' }}>
        <Code lines={LINES} numbers={false} />
      </Window>
      <div className="sc-transitions-polish-card">
        <div className="sc-transitions-polish-cap">{t.cap}</div>
        <div className="sc-transitions-polish-line">
          <span>{t.old}</span>
          <i />
        </div>
        <div className="sc-transitions-polish-line" data-now data-row={s.row || undefined} data-bar={s.bar || undefined}>
          <span>{t.now}</span>
          <i />
        </div>
      </div>
      </div>
      )}
    </ResourceStage>
  )
}
