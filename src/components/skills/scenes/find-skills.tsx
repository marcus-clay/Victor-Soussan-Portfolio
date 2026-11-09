'use client'

import React from 'react'
import { Bar, Prompt } from '@/components/stageshow/kit'
import { BookOpenCheck, FileCheck2, Search, SpellCheck } from 'lucide-react'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './find-skills.css'

/**
 * find-skills: a command palette with a described need and its matching skills, the install command beside it.
 *
 * On hover only (no loop): the terminal, the matching skills and the query leave (clear, about 0.6 s), then the need is
 * typed, the three skills come one after the other, the first is picked and its install command arrives in the terminal
 * (build, about 3.4 s), ending on the finished frame, which is also the resting look.
 */
export const READY = true

const T = {
  en: { query: 'proofread my texts', rows: ['proofreader', 'style-guide', 'copy-editor'] },
  fr: { query: 'relire mes textes', rows: ['proofreader', 'style-guide', 'copy-editor'] },
}
const ICONS = [SpellCheck, BookOpenCheck, FileCheck2]

/** Scene state: characters of the need typed, whether the query is visible, matching skills shown, the first one picked, the terminal shown */
type S = { q: number; qOn: boolean; rows: number; pick: boolean; term: boolean }
const EMPTY: S = { q: 0, qOn: true, rows: 0, pick: false, term: false }
const DONE: S = { q: 99, qOn: true, rows: 3, pick: true, term: true }

/** The longest query of the two languages: the typing loop runs this many steps (a shorter query is finished earlier) */
const QUERY_MAX = Math.max(...Object.values(T).map((x) => Array.from(x.query).length))

// In: the need is typed, the skills come one after the other, the first is picked, its command arrives
async function build(a: Act<S>) {
  await a.wait(150)
  for (let i = 1; i <= QUERY_MAX; i++) {
    await a.set({ q: i })
    await a.wait(18)
  }
  await a.wait(300)
  await a.set({ rows: 1 })
  await a.wait(110)
  await a.set({ rows: 2 })
  await a.wait(110)
  await a.set({ rows: 3 })
  await a.wait(550)
  await a.set({ pick: true })
  await a.wait(550)
  await a.set({ term: true })
  await a.wait(450)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <div className="sc-fs-pal">
        <div className="sc-fs-search" data-off={!s.qOn || undefined}>
          <Search size={17} strokeWidth={1.8} />
          <span>{t.query.slice(0, s.q)}<i className="sc-fs-caret" /></span>
        </div>
        <div className="sc-fs-list">
          {t.rows.map((r, i) => {
            const Ico = ICONS[i]
            return (
              <div key={r} className="sc-fs-row sc-fs-hit" data-on={(i === 0 && s.pick) || undefined} data-show={i < s.rows || undefined}>
                <span className="sc-fs-tile"><Ico size={15} strokeWidth={1.8} /></span>
                {r}
              </div>
            )
          })}
          {[92, 70, 82].map((w) => (
            <div key={w} className="sc-fs-row">
              <span className="sc-fs-tile" />
              <Bar w={w} h={7} tone={2} />
            </div>
          ))}
        </div>
      </div>
      <div className="ss-term sc-fs-term" data-show={s.term || undefined}>
        <Prompt path="~">npx skills add proofreader</Prompt>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
