'use client'

import React from 'react'
import { Bar, Check, Pin } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './card-illustrations.css'

/** card-illustrations: a resource card whose picture is a fragment of its subject, with numbered annotations */
export const READY = true

const NBSP = ' '
const TEXT = {
  en: { name: 'Onboarding checklist', sheet: 'Week one', kind: 'Guide', rows: ['Set up accounts', 'Meet the team'] },
  fr: { name: 'Checklist d’onboarding', sheet: 'Semaine 1', kind: 'Guide', rows: ['Créer les accès', 'Voir l’équipe'] },
}
void NBSP

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <div className="sc-ci-card is-next">
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
            <div className="sc-ci-item is-on">
              <Check on size={16} />
              <span className="sc-ci-item-label">{t.rows[0]}</span>
            </div>
            <div className="sc-ci-item">
              <Check on={false} size={16} />
              <span className="sc-ci-item-label">{t.rows[1]}</span>
            </div>
            <div className="sc-ci-item">
              <Check on={false} size={16} />
              <Bar w={90} h={6} tone={2} />
            </div>
          </div>
          <Pin name="1" size={22} corner="br" className="sc-ci-pin" style={{ left: 8, top: 14 }} />
          <Pin name="2" size={22} corner="bl" tone="ink" className="sc-ci-pin" style={{ left: 200, top: 84 }} />
        </div>
        <div className="sc-ci-meta">
          <div className="sc-ci-name">{t.name}</div>
          <div className="sc-ci-sub">
            <span className="sc-ci-kind">{t.kind}</span>
            <Bar w={44} h={6} tone={2} />
          </div>
          <div style={{ marginTop: 12, display: 'grid', gap: 7 }}>
            <Bar w="92%" h={6} tone={2} />
            <Bar w="64%" h={6} tone={2} />
          </div>
        </div>
      </div>
    </StillStage>
  )
}
