'use client'

import React from 'react'
import { Avatar, Bar, Chart, Tabs, Window, chartPoints } from '@/components/stageshow/kit'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './ux-designer.css'

/**
 * ux-designer: a user journey map (tab "Journey" of three: research, journey, tests), one flagged low point, a persona beside it.
 *
 * On hover only (no loop): the persona, the flag and the curve leave (clear, about 0.5 s), then the curve is drawn across
 * the four phases with its points, the low point lights up and is flagged, and the persona arrives (build, about 3.4 s),
 * ending on the finished frame, which is also the resting look. The window, its tabs and its phases stay in place.
 */
export const READY = true

const T = {
  en: { title: 'Journey', tabs: ['Research', 'Journey', 'Tests'], phases: ['Discover', 'Search', 'Compare', 'Decide'], flag: 'Hesitates', who: 'Team lead' },
  fr: { title: 'Parcours', tabs: ['Recherche', 'Parcours', 'Tests'], phases: ['Découvrir', 'Chercher', 'Comparer', 'Décider'], flag: 'Hésite', who: 'Responsable d\u2019équipe' },
}
/** Scene state: the curve drawn, how many points are shown, the low point lit, the flag shown, the persona shown */
type S = { chart: boolean; pts: number; low: boolean; flag: boolean; who: boolean }
const EMPTY: S = { chart: false, pts: 0, low: false, flag: false, who: false }
const DONE: S = { chart: true, pts: 4, low: true, flag: true, who: true }

// Out: the persona, then the flag and the lit point, then the curve and its points together
async function clear(a: Act<S>) {
  await a.set({ who: false })
  await a.wait(90)
  await a.set({ flag: false, low: false })
  await a.wait(90)
  await a.set({ chart: false, pts: 0 })
  await a.wait(320)
}

// In: the curve is drawn (about 1.2 s) and each point appears as the line reaches it, a rest, the low point lights up
// and is flagged, a rest, the persona arrives
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ chart: true, pts: 1 })
  await a.wait(390)
  await a.set({ pts: 2 })
  await a.wait(330)
  await a.set({ pts: 3 })
  await a.wait(380)
  await a.set({ pts: 4 })
  await a.wait(450)
  await a.set({ low: true })
  await a.wait(330)
  await a.set({ flag: true })
  await a.wait(750)
  await a.set({ who: true })
  await a.wait(450)
}

const DATA = [6, 8.4, 2.4, 6.6]
const W = 246
const H = 96
const PTS = chartPoints({ data: DATA, width: W, height: H, dot: false, max: 10 })

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <Window title={t.title} className="sc-ud-win">
        <div className="sc-ud-body">
          <div className="sc-ud-tabs">
            <Tabs items={t.tabs} value={1} />
          </div>
          <div className="sc-ud-phases">
            {t.phases.map((p) => <span key={p}>{p}</span>)}
          </div>
          <div className="sc-ud-plot">
            <div className="sc-ud-grid">
              {[41, 123, 205, 287].map((x) => <i key={x} style={{ left: x }} />)}
            </div>
            <Chart data={DATA} width={W} height={H} max={10} area dot={false} show={s.chart} />
            {PTS.map((p, i) => (
              <span key={i} className="sc-ud-pt" data-low={(i === 2 && s.low) || undefined} data-show={i < s.pts || undefined} style={{ left: p.x, top: p.y }} />
            ))}
            <span className="sc-ud-flag" data-show={s.flag || undefined} style={{ left: PTS[2].x + 14, top: PTS[2].y - 9 }}>{t.flag}</span>
          </div>
          <div className="sc-ud-lane">
            <Bar w={210} h={7} tone={2} />
            <Bar w={150} h={7} tone={2} />
          </div>
        </div>
      </Window>
      <div className="sc-ud-card" data-show={s.who || undefined}>
        <Avatar plain size={34} />
        <div className="sc-ud-who">{t.who}<Bar w={70} h={5} tone={2} /></div>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
