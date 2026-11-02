'use client'

import React from 'react'
import { Bar, Code, Window } from '@/components/stageshow/kit'
import { Brain, Feather, Scissors } from 'lucide-react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './karpathy-guidelines.css'

/** karpathy-guidelines: a two-line diff (a small, surgical change) and the three rules that led to it */
export const READY = true

const T = {
  en: { rules: ['Think before writing', 'Keep it simple', 'Change little'] },
  fr: { rules: ['Réfléchir avant d’écrire', 'Rester simple', 'Modifier peu'] },
}
const ICONS = [Brain, Feather, Scissors]

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <Window title="total.ts" className="sc-kg-win">
        <div className="sc-kg-code">
          <Code
            lines={[
              'export function total(items) {',
              { text: '  return items.length * 10', kind: 'del' },
              { text: '  return items.reduce(add, 0)', kind: 'add' },
              '}',
              '',
              'export const add = (a, b) => a + b',
            ]}
          />
        </div>
      </Window>
      <div className="sc-kg-card">
        {t.rules.map((r, i) => {
          const Ico = ICONS[i]
          return (
            <div key={r} className="sc-kg-rule">
              <Ico size={16} strokeWidth={1.7} />
              {r}
            </div>
          )
        })}
      </div>
    </StillStage>
  )
}
