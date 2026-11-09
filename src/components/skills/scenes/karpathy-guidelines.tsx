'use client'

import React from 'react'
import { Bar, Code, Window } from '@/components/stageshow/kit'
import { Brain, Feather, Scissors } from 'lucide-react'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './karpathy-guidelines.css'

/**
 * karpathy-guidelines: a two-line diff (a small, surgical change) and the three rules that led to it.
 *
 * On hover only (no loop): the rules leave and the diff is undone (clear, about 0.6 s), then the three rules come one
 * after the other, the old line is struck, the new line is written under it (build, about 3.3 s), ending on the
 * finished frame, which is also the resting look.
 */
export const READY = true

const T = {
  en: { rules: ['Think before writing', 'Keep it simple', 'Change little'] },
  fr: { rules: ['Réfléchir avant d’écrire', 'Rester simple', 'Modifier peu'] },
}
const ICONS = [Brain, Feather, Scissors]

/** Scene state: how many rules are shown, whether the old line is struck, whether the new line is written */
type S = { rules: number; mark: boolean; add: boolean }
const EMPTY: S = { rules: 0, mark: false, add: false }
const DONE: S = { rules: 3, mark: true, add: true }

// In: the three rules one after the other, a rest, the old line is struck, a rest, the new line is written
async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ rules: 1 })
  await a.wait(260)
  await a.set({ rules: 2 })
  await a.wait(260)
  await a.set({ rules: 3 })
  await a.wait(700)
  await a.set({ mark: true })
  await a.wait(750)
  await a.set({ add: true })
  await a.wait(450)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <Window title="total.ts" className="sc-kg-win">
        <div className="sc-kg-code" data-mark={s.mark || undefined} data-add={s.add || undefined}>
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
            <div key={r} className="sc-kg-rule" data-show={i < s.rules || undefined}>
              <Ico size={16} strokeWidth={1.7} />
              {r}
            </div>
          )
        })}
      </div>
      </>
      )}
    </ResourceStage>
  )
}
