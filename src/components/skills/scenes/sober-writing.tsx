'use client'

import React from 'react'
import { Bar, Icon, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './sober-writing.css'

/**
 * sober-writing: a draft where a superlative is struck and replaced by the fact.
 *
 * On hover only (no loop): the chip, the sentence of fact and the mark on the superlative leave (clear, about 0.6 s), then
 * the superlative is marked and struck, the sentence of fact is written under it and the chip comes in over the corner
 * (build, about 2.2 s). It ends on the finished draft, which is also the poster.
 */
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

/** struck: the superlative is marked and crossed out; fact: the sentence that replaces it; chip: the note over the corner */
type S = { struck: boolean; fact: boolean; chip: boolean }
const EMPTY: S = { struck: false, fact: false, chip: false }
const DONE: S = { struck: true, fact: true, chip: true }

// Out: the chip, then the sentence of fact, then the mark on the superlative
async function clear(a: Act<S>) {
  await a.set({ chip: false })
  await a.wait(90)
  await a.set({ fact: false })
  await a.wait(110)
  await a.set({ struck: false })
  await a.wait(330)
}

// In: the superlative is read, marked and struck, the fact is written under it, then the chip says what was done
async function build(a: Act<S>) {
  await a.wait(650)
  await a.set({ struck: true })
  await a.wait(850)
  await a.set({ fact: true })
  await a.wait(750)
  await a.set({ chip: true })
  await a.wait(450)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <>
      <Window className="sc-sw-win">
        <div className="sc-sw-page">
          <div className="sc-sw-h">{t.title}</div>
          <div className="sc-sw-p"><span className="sc-sw-del" data-on={s.struck || undefined}>{t.del}</span></div>
          <div className="sc-sw-p sc-sw-add" data-on={s.fact || undefined}>{t.add}</div>
          <div className="sc-sw-lines">
            <Bar w="92%" h={6} tone={2} />
            <Bar w="78%" h={6} tone={2} />
          </div>
        </div>
      </Window>
      <div className="sc-sw-chip" data-on={s.chip || undefined}><Icon name="check" size={14} stroke={2} /> {t.chip}</div>
      </>
      )}
    </ResourceStage>
  )
}
