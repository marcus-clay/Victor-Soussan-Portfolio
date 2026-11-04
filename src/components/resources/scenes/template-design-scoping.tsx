'use client'

import React from 'react'
import { Bar, Check, Stream, Text, type Act } from '@/components/stageshow/kit'
import ResourceStage from './ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './template-design-scoping.css'

/**
 * template-design-scoping: a sheet of paper (the page of the model, no window, no title bar) with real margins, a title,
 * the « Pourquoi » section filled in and the next sections still to fill, ruled apart; a small « Validé » stamp straddles
 * the sheet's right edge. The sheet is set a small margin from the top and runs off the bottom. From the static-card
 * example (one hero cropped at the foot, one satellite on its edge) with the paper of tilted-stack and google-docs.
 *
 * On hover only (no loop): the stamp and the lines leave in a short reverse stagger (clear), then the two lines of
 * « Pourquoi » write in word by word and the stamp slides in from the edge with its tick (build, about 3 s), ending on the
 * finished frame. The poster is that finished frame (lines written, stamp in), the resting look.
 */
export const READY = true

const T = {
  en: {
    title: 'Design scoping',
    why: 'Why',
    whyText: ['Users cannot find their recent documents.', 'Goal: reach them in one click.'],
    sections: ['For whom', 'Scope'],
    ok: 'Agreed',
    lineMax: 178,
  },
  fr: {
    title: 'Cadrage de conception',
    why: 'Pourquoi',
    whyText: ['Les utilisateurs ne retrouvent pas leurs documents récents.', 'Objectif : y accéder en un clic.'],
    sections: ['Pour qui', 'Périmètre'],
    ok: 'Validé',
    lineMax: 186,
  },
}
const WIDTHS = [[150], [136, 100]]

type S = { w1: number; w2: number; stamp: boolean; tick: boolean }

const INITIAL: S = { w1: 0, w2: 0, stamp: false, tick: false }
const wordsOf = (line: string) => line.split(' ').length

const sequences = (lang: 'en' | 'fr') => {
  const [n1, n2] = T[lang].whyText.map(wordsOf)
  // From the finished frame to the empty one: the stamp, then the second line, then the first (a short reverse cascade)
  const clear = async (a: Act<S>) => {
    await a.set({ stamp: false, tick: false })
    await a.wait(110)
    await a.set({ w2: 0 })
    await a.wait(90)
    await a.set({ w1: 0 })
    await a.wait(250)
  }
  // From the empty frame to the finished one, where it stays
  const build = async (a: Act<S>) => {
    for (let i = 1; i <= n1; i++) {
      await a.set({ w1: i })
      await a.wait(70)
    }
    await a.wait(200)
    for (let i = 1; i <= n2; i++) {
      await a.set({ w2: i })
      await a.wait(70)
    }
    await a.wait(450)
    await a.set({ stamp: true })
    await a.wait(360)
    await a.set({ tick: true })
    await a.wait(300)
  }
  return { build, clear }
}
const SEQUENCES = { en: sequences('en'), fr: sequences('fr') }

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  const full: S = { w1: wordsOf(t.whyText[0]), w2: wordsOf(t.whyText[1]), stamp: true, tick: true }
  return (
    <ResourceStage<S> a={a} initial={INITIAL} poster={full} build={SEQUENCES[lang].build} clear={SEQUENCES[lang].clear}>
      {(s) => (
        <div className="sc-res-scoping-root">
          <div className="sc-res-scoping-sheet">
            <Text className="sc-res-scoping-title">{t.title}</Text>
            <div className="sc-res-scoping-rule" />
            <div className="sc-res-scoping-why">
              <Text className="sc-res-scoping-label sc-res-scoping-label-on">{t.why}</Text>
              {t.whyText.map((line, i) => (
                <div key={line} className="sc-res-scoping-line" style={{ maxWidth: t.lineMax }}>
                  <Stream text={line} count={i ? s.w2 : s.w1} />
                </div>
              ))}
            </div>
            {t.sections.map((sec, i) => (
              <React.Fragment key={sec}>
                <div className="sc-res-scoping-rule" />
                <div className="sc-res-scoping-sec">
                  <Text className="sc-res-scoping-label">{sec}</Text>
                  <div className="sc-res-scoping-bars">
                    {WIDTHS[i].map((w, j) => (
                      <Bar key={j} w={w} h={7} tone={j ? 2 : 3} />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="sc-res-scoping-stamp" data-show={s.stamp || undefined}>
            <Check on={s.tick} size={16} />
            {t.ok}
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
