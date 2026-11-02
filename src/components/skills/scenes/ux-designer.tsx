'use client'

import React from 'react'
import { Avatar, Bar, Chart, Tabs, Window, chartPoints } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './ux-designer.css'

/** ux-designer: a user journey map (tab "Journey" of three: research, journey, tests), one flagged low point, a persona beside it */
export const READY = true

const T = {
  en: { title: 'Journey', tabs: ['Research', 'Journey', 'Tests'], phases: ['Discover', 'Search', 'Compare', 'Decide'], flag: 'Hesitates', who: 'Team lead' },
  fr: { title: 'Parcours', tabs: ['Recherche', 'Parcours', 'Tests'], phases: ['Découvrir', 'Chercher', 'Comparer', 'Décider'], flag: 'Hésite', who: 'Responsable d\u2019équipe' },
}
const DATA = [6, 8.4, 2.4, 6.6]
const W = 246
const H = 96
const PTS = chartPoints({ data: DATA, width: W, height: H, dot: false, max: 10 })

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
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
            <Chart data={DATA} width={W} height={H} max={10} area dot={false} show />
            {PTS.map((p, i) => (
              <span key={i} className="sc-ud-pt" data-low={i === 2 || undefined} style={{ left: p.x, top: p.y }} />
            ))}
            <span className="sc-ud-flag" style={{ left: PTS[2].x + 14, top: PTS[2].y - 9 }}>{t.flag}</span>
          </div>
          <div className="sc-ud-lane">
            <Bar w={210} h={7} tone={2} />
            <Bar w={150} h={7} tone={2} />
          </div>
        </div>
      </Window>
      <div className="sc-ud-card">
        <Avatar plain size={34} />
        <div className="sc-ud-who">{t.who}<Bar w={70} h={5} tone={2} /></div>
      </div>
    </StillStage>
  )
}
