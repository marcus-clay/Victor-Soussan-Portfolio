'use client'

import React, { type CSSProperties } from 'react'
import { Frame, Check } from 'lucide-react'
import { Bar, Roll, Row, Text } from '@/components/stageshow/kit'
import type { SceneProps } from '@/components/skills/scenes/types'
import ResourceStage, { type Act } from './ResourceStage'
import './template-figma-file-status.css'

/** template-figma-file-status: a close-up of the pages panel of a design file, no window around it (1.25x, cut at the foot), each page carrying its status (Explo, WIP, Ready to dev), and a small thumbnail of the frame of the page that moves from status to status. From the close-up and stacked-cards examples (one panel at a larger scale, a small detail straddling its edge). */
export const READY = true

type Status = 0 | 1 | 2

const T = {
  en: {
    pages: 'Pages',
    labels: ['Explo', 'WIP', 'Ready to dev'],
    rows: [
      ['Search', 1],
      ['Filters', 0],
      ['Sign in', 2],
      ['Results', 1],
    ] as [string, Status][],
    frame: 'Sign in',
  },
  fr: {
    pages: 'Pages',
    labels: ['Explo', 'WIP', 'Ready to dev'],
    rows: [
      ['Recherche', 1],
      ['Filtres', 0],
      ['Connexion', 2],
      ['Résultats', 1],
    ] as [string, Status][],
    frame: 'Connexion',
  },
}
const KEY = 2 // the row that moves from status to status

type S = { status: Status; fill: Status; hide: boolean }
/** The empty frame the story builds from: the page is in exploration and its frame is empty */
const INITIAL: S = { status: 0, fill: 0, hide: false }
/** The resting frame: the page is ready to dev and its frame is complete */
const POSTER: S = { status: 2, fill: 2, hide: false }

/** On hover: `clear` takes the finished frame back to the empty one (the frame empties, the status goes back to Explo while its chip is hidden), `build` goes Explo, WIP (the fields appear), Ready to dev (the button appears) and ends on the finished frame. */
async function clear(a: Act<S>) {
  await a.set({ fill: 0, hide: true })
  await a.wait(500)
  await a.snap({ status: 0 })
  await a.set({ hide: false })
  await a.wait(300)
}
async function build(a: Act<S>) {
  await a.wait(300)
  await a.set({ status: 1, fill: 1 })
  await a.wait(1600)
  await a.set({ status: 2, fill: 2 })
  await a.wait(700)
}

/** enter and exit delays of an element of the story, in ms */
const d = (enter: number, exit: number) => ({ '--d-in': `${enter}ms`, '--d-out': `${exit}ms` }) as CSSProperties

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={INITIAL} poster={POSTER} build={build} clear={clear}>
      {(s) => (
        <div className="sc-res-figma-status-root">
          <div className="sc-res-figma-status-panel">
            <Text className="sc-res-figma-status-head">{t.pages}</Text>
            <div className="sc-res-figma-status-list">
              {t.rows.map(([name, base], i) => {
                const status = i === KEY ? s.status : base
                return (
                  <Row
                    key={name}
                    pad={10}
                    selected={i === KEY || undefined}
                    className="sc-res-figma-status-row"
                    lead={<Frame size={18} strokeWidth={1.7} />}
                    title={
                      <span className="sc-res-figma-status-line">
                        <Text className="sc-res-figma-status-name">{name}</Text>
                        <span className="sc-res-figma-status-chip" data-status={['explo', 'wip', 'ready'][status]} data-hide={(i === KEY && s.hide) || undefined}>
                          <span className="sc-res-figma-status-ck">
                            <Check size={16} strokeWidth={1.7} />
                          </span>
                          {i === KEY ? <Roll variant="fade">{t.labels[status]}</Roll> : t.labels[status]}
                        </span>
                      </span>
                    }
                  />
                )
              })}
              {[88, 64].map((w) => (
                <Row
                  key={w}
                  pad={10}
                  className="sc-res-figma-status-row"
                  lead={<Bar w={18} h={18} r={5} tone={2} />}
                  title={
                    <span className="sc-res-figma-status-line">
                      <Bar w={w} tone={3} />
                      <Bar w={60} h={26} r={13} tone={2} />
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          <div className="sc-res-figma-status-card" data-fill={s.fill}>
            <Text className="sc-res-figma-status-cap">{t.frame}</Text>
            <i className="sc-res-figma-status-f-field sc-res-figma-status-blk" style={d(0, 80)} />
            <i className="sc-res-figma-status-f-field sc-res-figma-status-blk" style={d(90, 40)} />
            <i className="sc-res-figma-status-f-btn sc-res-figma-status-blk" style={d(60, 0)} />
            <i className="sc-res-figma-status-f-line sc-res-figma-status-blk" style={d(150, 0)} />
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
