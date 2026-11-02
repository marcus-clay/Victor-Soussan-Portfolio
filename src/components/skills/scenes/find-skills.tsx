'use client'

import React from 'react'
import { Bar, Prompt } from '@/components/stageshow/kit'
import { BookOpenCheck, FileCheck2, Search, SpellCheck } from 'lucide-react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './find-skills.css'

/** find-skills: a command palette with a described need and its matching skills, the install command beside it */
export const READY = true

const T = {
  en: { query: 'proofread my texts', rows: ['proofreader', 'style-guide', 'copy-editor'] },
  fr: { query: 'relire mes textes', rows: ['proofreader', 'style-guide', 'copy-editor'] },
}
const ICONS = [SpellCheck, BookOpenCheck, FileCheck2]

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <div className="sc-fs-pal">
        <div className="sc-fs-search">
          <Search size={17} strokeWidth={1.8} />
          <span>{t.query}<i className="sc-fs-caret" /></span>
        </div>
        <div className="sc-fs-list">
          {t.rows.map((r, i) => {
            const Ico = ICONS[i]
            return (
              <div key={r} className="sc-fs-row" data-on={i === 0 || undefined}>
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
      <div className="ss-term sc-fs-term">
        <Prompt path="~">npx skills add proofreader</Prompt>
      </div>
    </StillStage>
  )
}
