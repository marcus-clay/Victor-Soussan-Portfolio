'use client'

import React from 'react'
import { Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './slides.css'

/** slides: a deck in an app, the open slide carries a sentence as its title, and a picker of layouts */
export const READY = true

const TEXT = {
  en: { title: 'Three steps from question to source', pick: 'Layouts' },
  fr: { title: 'Trois étapes de la question à la source', pick: 'Mises en page' },
}

// Each mini layout is a few boxes in percentages: [left, top, width, height]
const LAYOUTS: number[][][] = [
  [[12, 22, 76, 18], [12, 52, 50, 10]],
  [[10, 20, 36, 60], [54, 20, 36, 60]],
  [[12, 20, 76, 14], [12, 44, 22, 34], [38, 44, 22, 34], [64, 44, 22, 34]],
  [[10, 18, 80, 64]],
  [[10, 20, 30, 60], [48, 24, 42, 10], [48, 44, 42, 10]],
  [[12, 20, 76, 10], [12, 40, 76, 10], [12, 60, 76, 10]],
]

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window
        className="sc-sl-win"
        sidebarWidth={64}
        sidebar={
          <div className="sc-sl-side">
            {[0, 1].map((n) => (
              <div key={n} className={`sc-sl-thumb${n === 1 ? ' is-on' : ''}`}>
                <i className="t" style={{ width: '60%' }} />
                <i style={{ width: '85%' }} />
                <i style={{ width: '45%' }} />
              </div>
            ))}
          </div>
        }
      >
        <div className="sc-sl-stage">
          <div className="sc-sl-slide">
            <span className="sc-sl-kick" />
            <div className="sc-sl-title">{t.title}</div>
            <div className="sc-sl-cols"><i /><i /><i /></div>
          </div>
        </div>
      </Window>

      <div className="sc-sl-pick">
        <div className="sc-sl-pick-h">{t.pick}</div>
        <div className="sc-sl-grid">
          {LAYOUTS.map((boxes, i) => (
            <span key={i} className={`sc-sl-lay${i === 2 ? ' is-on' : ''}`}>
              {boxes.map(([l, tp, w, h], j) => <i key={j} style={{ left: `${l}%`, top: `${tp}%`, width: `${w}%`, height: `${h}%` }} />)}
            </span>
          ))}
        </div>
      </div>
    </StillStage>
  )
}
