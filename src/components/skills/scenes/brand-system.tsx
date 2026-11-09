'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './brand-system.css'

/**
 * brand-system: palette, type, buttons and the tokens that carry them.
 *
 * On hover only (no loop): the sheet is emptied from the foot up (clear, about 0.6 s), then it is laid out again, each
 * block bringing its token into the code card: the accent swatch and --brand, the specimen and --font, the neutrals,
 * the buttons and --radius (build, about 3 s), ending on the finished frame.
 */
export const READY = true

const TEXT = {
  en: { primary: 'Continue', ghost: 'Cancel' },
  fr: { primary: 'Continuer', ghost: 'Annuler' },
}
const NEUTRALS = ['#18181b', '#52525b', '#a1a1aa', '#e4e4e7']

/** How many of the four blocks are laid out: the swatch, the specimen, the neutrals, the buttons */
type S = { step: number }
const EMPTY: S = { step: 0 }
const DONE: S = { step: 4 }

// In: swatch with its colour token, specimen with its font token, the four neutrals, the buttons with the radius token
async function build(a: Act<S>) {
  await a.wait(200)
  await a.set({ step: 1 })
  await a.wait(750)
  await a.set({ step: 2 })
  await a.wait(750)
  await a.set({ step: 3 })
  await a.wait(650)
  await a.set({ step: 4 })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
        <>
          <div className="sc-bs-card">
            <div className="sc-bs-swatch" data-show={s.step >= 1 || undefined}><span className="sc-bs-hex">{a.hex.toUpperCase()}</span></div>
            <div className="sc-bs-type">
              <span className="sc-bs-aa" data-show={s.step >= 2 || undefined}>Aa</span>
              <span className="sc-bs-font" data-show={s.step >= 2 || undefined}>Inter</span>
            </div>
            <div className="sc-bs-neutrals">
              {NEUTRALS.map((c, i) => (
                <i key={c} style={{ background: c, ['--i' as string]: i }} data-show={s.step >= 3 || undefined} />
              ))}
            </div>
            <div className="sc-bs-buttons">
              <span className="sc-bs-btn is-primary" style={{ ['--i' as string]: 0 }} data-show={s.step >= 4 || undefined}>{t.primary}</span>
              <span className="sc-bs-btn is-ghost" style={{ ['--i' as string]: 1 }} data-show={s.step >= 4 || undefined}>{t.ghost}</span>
            </div>
            <div className="sc-bs-lines">
              <Bar w={180} h={6} tone={2} />
              <Bar w={130} h={6} tone={2} />
            </div>
          </div>
          <div className="sc-bs-code" data-show={s.step >= 1 || undefined}>
            <div className="sc-bs-tok" data-show={s.step >= 1 || undefined}><b>--brand:</b> <u>{a.hex.toUpperCase()}</u>;</div>
            <div className="sc-bs-tok" data-show={s.step >= 2 || undefined}><b>--font:</b> Inter;</div>
            <div className="sc-bs-tok" data-show={s.step >= 4 || undefined}><b>--radius:</b> 10px;</div>
          </div>
        </>
      )}
    </ResourceStage>
  )
}
