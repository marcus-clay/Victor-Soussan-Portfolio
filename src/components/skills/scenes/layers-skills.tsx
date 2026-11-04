'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './layers-skills.css'

/**
 * layers-skills: four layers of a product drawn apart, from the needs observed to the surface people see.
 *
 * On hover only: the layers leave from the surface down (clear, about 0.6 s), then rise one after the other from the
 * needs to the surface, each with its hairline and its label, and the little screen on top fills in (build, about
 * 3 s). The poster is the finished stack, the resting look.
 */
export const READY = true

/** How many plates are drawn (the needs plate, at the bottom, always is), and whether the screen on the surface has filled in */
type S = { n: number; ui: boolean }
const EMPTY: S = { n: 1, ui: false }
const DONE: S = { n: 4, ui: true }

async function clear(a: Act<S>) {
  await a.set({ ui: false })
  await a.wait(60)
  await a.set({ n: 3 })
  await a.wait(70)
  await a.set({ n: 2 })
  await a.wait(70)
  await a.set({ n: 1 })
  await a.wait(320)
}

async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ n: 2 })
  await a.wait(560)
  await a.set({ n: 3 })
  await a.wait(560)
  await a.set({ n: 4 })
  await a.wait(640)
  await a.set({ ui: true })
  await a.wait(500)
}

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
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
        <>
          <div className="sc-layers-skills-iso">
            {FILLS.map((fill, i) => (
              <div
                key={i}
                className="sc-layers-skills-plate"
                data-show={i < s.n || undefined}
                style={{ ['--sc-z' as string]: `${i * GAP - 1.5 * GAP}px` }}
              >
                <span className="sc-layers-skills-shade" />
                <span className="sc-layers-skills-edge" />
                <div className="sc-layers-skills-face" data-dots={i < 3 || undefined} style={{ ['--sc-plate' as string]: fill }}>
                  {i === 3 && (
                    <div className="sc-layers-skills-screen" data-show={s.ui || undefined}>
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
              </div>
            ))}
          </div>
          {labels.map((text, i) => {
            const y = sy(i)
            const show = i < s.n || undefined
            return (
              <React.Fragment key={text}>
                <span className="sc-layers-skills-leader" data-show={show} data-hot={i === 3 || undefined} style={{ left: ORIGIN.x + 85 + 4, top: y, width: 268 - (ORIGIN.x + 85 + 4) - 8 }} />
                <span className="sc-layers-skills-label" data-show={show} data-hot={i === 3 || undefined} style={{ top: y }}>{text}</span>
              </React.Fragment>
            )
          })}
        </>
      )}
    </ResourceStage>
  )
}
