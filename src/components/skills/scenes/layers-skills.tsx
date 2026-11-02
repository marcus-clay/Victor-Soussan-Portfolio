'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './layers-skills.css'

/** layers-skills: four layers of a product drawn apart, from the needs observed to the surface people see */
export const READY = true

const T = {
  en: ['Needs', 'Structure', 'Interaction', 'Surface'],
  fr: ['Besoins', 'Structure', 'Interaction', 'Surface'],
} as const

// Bottom to top: plate fill, and its height above the one below
const FILLS = ['#ececef', '#f1f1f3', '#f6f6f7', '#ffffff']
const GAP = 54
const ORIGIN = { x: 134, y: 150 }
// Plate centers on screen: x stays, y rises by 0.848 per unit of height (sin 58°); the right-hand corner of a plate is 85 px out and 6 px down
const sy = (i: number) => ORIGIN.y - 0.848 * (i * GAP - 1.5 * GAP) + 6

export default function Scene({ lang, a }: SceneProps) {
  const labels = T[lang]
  return (
    <StillStage a={a}>
      <div className="sc-layers-skills-iso">
        {FILLS.map((fill, i) => (
          <div
            key={i}
            className="sc-layers-skills-plate"
            data-dots={i < 3 || undefined}
            style={{ ['--sc-plate' as string]: fill, transform: `translateZ(${i * GAP - 1.5 * GAP}px)` }}
          >
            {i === 3 && (
              <div className="sc-layers-skills-screen">
                <div className="sc-layers-skills-screen__head">
                  <Bar w={10} h={10} r={5} tone={3} />
                  <Bar w={44} h={6} r={3} tone={3} />
                </div>
                <Bar w={96} h={26} r={6} tone={2} />
                <Bar w={80} h={6} r={3} tone={3} />
                <Bar w={58} h={6} r={3} tone={2} />
                <div className="sc-layers-skills-screen__btn" />
              </div>
            )}
          </div>
        ))}
      </div>
      {labels.map((text, i) => {
        const y = sy(i)
        return (
          <React.Fragment key={text}>
            <span className="sc-layers-skills-leader" data-hot={i === 3 || undefined} style={{ left: ORIGIN.x + 85 + 4, top: y, width: 268 - (ORIGIN.x + 85 + 4) - 8 }} />
            <span className="sc-layers-skills-label" data-hot={i === 3 || undefined} style={{ top: y }}>{text}</span>
          </React.Fragment>
        )
      })}
    </StillStage>
  )
}
