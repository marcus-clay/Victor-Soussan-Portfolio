'use client'

import React from 'react'
import { Bar, Icon, type Act } from '@/components/stageshow/kit'
import { Minus } from 'lucide-react'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './spec-ideation.css'

/**
 * spec-ideation: a specification sheet (documentation phase) with the decisions kept, and the loose ideas beside it.
 *
 * On hover only: the three loose ideas are laid down one by one, then the sheet takes the decisions (the two kept ones,
 * then the one left out, while its idea is struck through), about 3 s. The poster is the finished frame.
 */
export const READY = true

const T = {
  en: {
    tag: 'Documentation',
    title: 'Notes export',
    label: 'Decisions',
    kept: ['PDF export', 'A single button'],
    cut: 'Sharing: out of scope',
    notes: [['PDF export', false], ['History', false], ['Sharing', true]] as [string, boolean][],
  },
  fr: {
    tag: 'Documentation',
    title: 'Export des notes',
    label: 'Décisions',
    kept: ['Export en PDF', 'Un seul bouton'],
    cut: 'Partage : hors périmètre',
    notes: [['Export PDF', false], ['Historique', false], ['Partage', true]] as [string, boolean][],
  },
}

// notes: ideas laid down (0 to 3); kept: decisions written (0 to 2); cut: the third decision is written and its idea struck
type S = { notes: number; kept: number; cut: boolean }
const EMPTY: S = { notes: 0, kept: 0, cut: false }
const DONE: S = { notes: 3, kept: 2, cut: true }

// Out: the left-out decision and its strike go, then the kept ones, then the ideas, last first
async function clear(a: Act<S>) {
  await a.set({ cut: false })
  await a.wait(80)
  await a.set({ kept: 1 })
  await a.wait(70)
  await a.set({ kept: 0, notes: 2 })
  await a.wait(80)
  await a.set({ notes: 1 })
  await a.wait(70)
  await a.set({ notes: 0 })
  await a.wait(300)
}

// In: the ideas, one by one; the two decisions kept; the third one left out, with its idea struck through
async function build(a: Act<S>) {
  for (const notes of [1, 2, 3]) {
    await a.set({ notes })
    await a.wait(220)
  }
  await a.wait(450)
  await a.set({ kept: 1 })
  await a.wait(420)
  await a.set({ kept: 2 })
  await a.wait(650)
  await a.set({ cut: true })
  await a.wait(600)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <div className="sc-si-sheet">
        <span className="sc-si-tag">{t.tag}</span>
        <div className="sc-si-title">{t.title}</div>
        <Bar w={150} h={6} tone={2} />
        <div className="sc-si-label sc-si-in" data-in={s.kept > 0 || undefined}>{t.label}</div>
        {t.kept.map((k, i) => (
          <div key={k} className="sc-si-row sc-si-in" data-in={i < s.kept || undefined}>
            <span className="sc-si-dot"><Icon name="check" size={9} stroke={2.4} /></span>
            {k}
          </div>
        ))}
        <div className="sc-si-row sc-si-in" data-cut data-in={s.cut || undefined}>
          <span className="sc-si-dot"><Minus size={9} strokeWidth={2.4} /></span>
          {t.cut}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 22 }}>
          <Bar w={64} h={6} tone={2} />
          <Bar w={176} h={6} tone={3} />
          <Bar w={150} h={6} tone={2} />
        </div>
      </div>
      {t.notes.map(([n, cut], i) => (
        <div key={n} className="sc-si-note" data-i={i} data-in={i < s.notes || undefined} data-cut={(cut && s.cut) || undefined}>{n}</div>
      ))}
      </>
      )}
    </ResourceStage>
  )
}
