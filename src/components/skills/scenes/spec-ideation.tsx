'use client'

import React from 'react'
import { Bar, Icon } from '@/components/stageshow/kit'
import { Minus } from 'lucide-react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './spec-ideation.css'

/** spec-ideation: a specification sheet (documentation phase) with the decisions kept, and the loose ideas beside it */
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

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <div className="sc-si-sheet">
        <span className="sc-si-tag">{t.tag}</span>
        <div className="sc-si-title">{t.title}</div>
        <Bar w={150} h={6} tone={2} />
        <div className="sc-si-label">{t.label}</div>
        {t.kept.map((k) => (
          <div key={k} className="sc-si-row">
            <span className="sc-si-dot"><Icon name="check" size={9} stroke={2.4} /></span>
            {k}
          </div>
        ))}
        <div className="sc-si-row" data-cut>
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
        <div key={n} className="sc-si-note" data-i={i} data-cut={cut || undefined}>{n}</div>
      ))}
    </StillStage>
  )
}
