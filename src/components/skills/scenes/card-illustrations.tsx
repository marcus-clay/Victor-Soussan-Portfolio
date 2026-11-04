'use client'

import React from 'react'
import { Bar, Check, Pin } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './card-illustrations.css'

/**
 * card-illustrations: a resource card whose picture is a fragment of its subject, with numbered annotations.
 *
 * On hover only (no loop): the rows, pins, text lines and the next card leave (clear, about 0.6 s), then the rows of the
 * sheet arrive and the first one is ticked, the two pins land, the card's lines come in and the next card slides in from
 * the right (build, about 2.8 s), ending on the finished frame, which is also the poster.
 */
export const READY = true

const NBSP = ' '
const TEXT = {
  en: { name: 'Onboarding checklist', sheet: 'Week one', kind: 'Guide', rows: ['Set up accounts', 'Meet the team'] },
  fr: { name: 'Checklist d’onboarding', sheet: 'Semaine 1', kind: 'Guide', rows: ['Créer les accès', 'Voir l’équipe'] },
}
void NBSP

/** rows: how many of the three sheet rows are shown; tick: the first one ticked; pins: 0 to 2; lines: the card's text lines; next: the next card */
type S = { rows: number; tick: boolean; pins: number; lines: boolean; next: boolean }
const EMPTY: S = { rows: 0, tick: false, pins: 0, lines: false, next: false }
const DONE: S = { rows: 3, tick: true, pins: 2, lines: true, next: true }

// Out: pins, then the next card and the lines, then the rows from the last one up; the tick goes while the rows are hidden
async function clear(a: Act<S>) {
  await a.set({ pins: 1 })
  await a.wait(70)
  await a.set({ pins: 0, next: false, lines: false })
  await a.wait(90)
  await a.set({ rows: 2 })
  await a.wait(70)
  await a.set({ rows: 1 })
  await a.wait(70)
  await a.set({ rows: 0 })
  await a.wait(320)
  await a.snap({ tick: false })
  await a.wait(60)
}

// In: the rows of the sheet, the first one ticked, the two pins, the card's lines, then the next card
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ rows: 1 })
  await a.wait(110)
  await a.set({ rows: 2 })
  await a.wait(110)
  await a.set({ rows: 3 })
  await a.wait(480)
  await a.set({ tick: true })
  await a.wait(520)
  await a.set({ pins: 1 })
  await a.wait(180)
  await a.set({ pins: 2 })
  await a.wait(480)
  await a.set({ lines: true })
  await a.wait(420)
  await a.set({ next: true })
  await a.wait(420)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <div className="sc-ci-card is-next" data-show={s.next || undefined}>
        <div className="sc-ci-thumb sc-ci-next-thumb">
          <span className="sc-ci-tile" style={{ left: 14, top: 18, width: 70, height: 56, background: 'var(--ss-accent-soft)' }} />
          <span className="sc-ci-tile" style={{ left: 96, top: 18, width: 70, height: 56, background: 'var(--ss-surface)', boxShadow: '0 0 0 1px var(--ss-line)' }} />
          <span className="sc-ci-tile" style={{ left: 14, top: 86, width: 152, height: 56, background: 'var(--ss-surface)', boxShadow: '0 0 0 1px var(--ss-line)' }} />
        </div>
        <div className="sc-ci-meta" style={{ top: 176 }}>
          <Bar w={110} h={9} r={4} tone={4} />
          <div className="sc-ci-sub"><Bar w={56} h={6} tone={2} /></div>
        </div>
      </div>

      <div className="sc-ci-card is-hero">
        <div className="sc-ci-thumb">
          <div className="sc-ci-sheet">
            <div className="sc-ci-sheet-title">{t.sheet}</div>
            <div className="sc-ci-item" data-hide={s.rows < 1 || undefined}>
              <div className="sc-ci-item-in">
                <Check on={s.tick} size={16} />
                <span className="sc-ci-item-label">{t.rows[0]}</span>
              </div>
            </div>
            <div className="sc-ci-item" data-hide={s.rows < 2 || undefined}>
              <div className="sc-ci-item-in">
                <Check on={false} size={16} />
                <span className="sc-ci-item-label">{t.rows[1]}</span>
              </div>
            </div>
            <div className="sc-ci-item" data-hide={s.rows < 3 || undefined}>
              <div className="sc-ci-item-in">
                <Check on={false} size={16} />
                <Bar w={90} h={6} tone={2} />
              </div>
            </div>
          </div>
          <div className="sc-ci-pinwrap" data-show={s.pins >= 1 || undefined}>
            <Pin name="1" size={22} corner="br" className="sc-ci-pin" style={{ left: 8, top: 14 }} />
          </div>
          <div className="sc-ci-pinwrap" data-show={s.pins >= 2 || undefined}>
            <Pin name="2" size={22} corner="bl" tone="ink" className="sc-ci-pin" style={{ left: 200, top: 84 }} />
          </div>
        </div>
        <div className="sc-ci-meta">
          <div className="sc-ci-name">{t.name}</div>
          <div className="sc-ci-sub">
            <span className="sc-ci-kind">{t.kind}</span>
            <span className="sc-ci-lines" data-show={s.lines || undefined}>
              <Bar w={44} h={6} tone={2} />
            </span>
          </div>
          <div className="sc-ci-lines" data-show={s.lines || undefined} style={{ marginTop: 12, display: 'grid', gap: 7 }}>
            <Bar w="92%" h={6} tone={2} />
            <Bar w="64%" h={6} tone={2} />
          </div>
        </div>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
