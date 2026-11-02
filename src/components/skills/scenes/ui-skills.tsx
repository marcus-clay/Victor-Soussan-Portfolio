'use client'

import React from 'react'
import { Check, Code, Icon, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
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

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
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
              <Check on={i < 3} pending={i === 3} size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Window>
      <div className="sc-ui-skills-code">
        <Text className="sc-ui-skills-code__label">{t.code}</Text>
        <Code numbers={false} lines={[...t.lines]} />
      </div>
    </StillStage>
  )
}
