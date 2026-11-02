'use client'

import React from 'react'
import { Bar, Icon, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './sober-writing.css'

/** sober-writing: a draft where a superlative is struck and replaced by the fact */
export const READY = true

const TEXT = {
  en: {
    title: 'One field replaces three filters',
    del: 'This groundbreaking redesign changes everything.',
    add: 'We merged three filters into one field.',
    chip: 'Superlative removed',
  },
  fr: {
    title: 'Un seul champ remplace trois filtres',
    del: 'Cette refonte révolutionnaire change tout.',
    add: 'Nous avons réuni trois filtres dans un seul champ.',
    chip: 'Superlatif retiré',
  },
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <Window className="sc-sw-win">
        <div className="sc-sw-page">
          <div className="sc-sw-h">{t.title}</div>
          <div className="sc-sw-p"><span className="sc-sw-del">{t.del}</span></div>
          <div className="sc-sw-p sc-sw-add">{t.add}</div>
          <div className="sc-sw-lines">
            <Bar w="92%" h={6} tone={2} />
            <Bar w="78%" h={6} tone={2} />
          </div>
        </div>
      </Window>
      <div className="sc-sw-chip"><Icon name="check" size={14} stroke={2} /> {t.chip}</div>
    </StillStage>
  )
}
