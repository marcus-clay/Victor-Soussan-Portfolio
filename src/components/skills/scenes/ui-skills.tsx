'use client'

import React from 'react'
import { Check, Code, Icon, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './ui-skills.css'

/** ui-skills: a review window with three passes (accessibility, metadata, motion), the metadata fix lifted beside it */
export const READY = true

const T = {
  en: {
    passes: ['Accessibility', 'Metadata', 'Motion'],
    items: ['Buttons have labels', 'Images have alt text', 'Contrast is readable', 'Focus ring is visible', 'Headings are in order'],
    code: 'Page title',
    lines: ['<title>', '  Pricing, Acme', '</title>'],
  },
  fr: {
    passes: ['Accessibilité', 'Métadonnées', 'Animation'],
    items: ['Boutons avec libellé', 'Images décrites', 'Contraste lisible', 'Focus visible', 'Titres dans l’ordre'],
    code: 'Titre de la page',
    lines: ['<title>', '  Tarifs, Acme', '</title>'],
  },
} as const

const ICONS = ['user', 'file', 'bolt'] as const

/** Scene state: checks ticked, the fourth one pending, the fix card shown and how many of its code lines are written. */
type S = { n: number; pend: boolean; fix: boolean; lines: number }
const EMPTY: S = { n: 0, pend: false, fix: false, lines: 0 }
const DONE: S = { n: 3, pend: true, fix: true, lines: 3 }

/** In (about 3 s): three checks pass one after another, the fourth starts its pass, then the title fix arrives and is written line by line. */
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ n: 1 })
  await a.wait(420)
  await a.set({ n: 2 })
  await a.wait(420)
  await a.set({ n: 3 })
  await a.wait(420)
  await a.set({ pend: true })
  await a.wait(560)
  await a.set({ fix: true })
  await a.wait(380)
  await a.set({ lines: 1 })
  await a.wait(150)
  await a.set({ lines: 2 })
  await a.wait(150)
  await a.set({ lines: 3 })
  await a.wait(350)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <Window
        title={t.passes[0]}
        sidebar={
          <div className="sc-ui-skills-side">
            {t.passes.map((p, i) => (
              <div key={p} className="sc-ui-skills-nav" data-on={i === 0 || undefined}>
                <Icon name={ICONS[i]} size={14} filled />
                <span>{p}</span>
              </div>
            ))}
          </div>
        }
        sidebarWidth={132}
        className="sc-ui-skills-win"
      >
        <div className="sc-ui-skills-list">
          {t.items.map((item, i) => (
            <div key={item} className="sc-ui-skills-item">
              <Check on={i < s.n} pending={i === 3 && s.pend} size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Window>
      <div className="sc-ui-skills-code" data-on={s.fix || undefined}>
        <Text className="sc-ui-skills-code__label">{t.code}</Text>
        <Code numbers={false} lines={[...t.lines]} count={s.lines} />
      </div>
      </>
      )}
    </ResourceStage>
  )
}
