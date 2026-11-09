'use client'

import React from 'react'
import { Bar, Icon, Roll, Segmented, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from './ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './guide-ship-to-show.css'

/** guide-ship-to-show: a browser (tab rail, address pill) on a published bilingual case study with its video, and the seven phases that ended in it (the seventh in the hue). From the skill's scene, recomposed as stage with gutters (hero centered, cut at the foot, one satellite on its right edge). */
export const READY = true

const NBSP = ' '

const T = {
  en: { url: 'acme.co/work/checkout', kicker: 'Case study', title: 'Checkout redesign', pending: 'In progress', state: 'Published', count: (n: number) => `Phase ${n} of 7` },
  fr: { url: 'acme.co/work/paiement', kicker: 'Étude de cas', title: 'Refonte du paiement', pending: 'En cours', state: 'Publiée', count: (n: number) => `Phase${NBSP}${n}${NBSP}sur${NBSP}7` },
} as const

/** Scene state: how many of the seven phase segments are filled, whether the case study is published, the press on the play button, and the card leaving (so the empty frame can be reached behind a fade). */
type S = { step: number; done: boolean; pressed: boolean; out: boolean }
const EMPTY: S = { step: 6, done: false, pressed: false, out: false }
const REST: S = { step: 7, done: true, pressed: false, out: false }

/** then `build` ends on the finished frame: the play button is pressed, the seventh segment fills, the label rolls to Published and the check fills. */
const build = async (a: Act<S>) => {
  await a.wait(500)
  await a.set({ pressed: true })
  await a.wait(150)
  await a.set({ pressed: false })
  await a.wait(220)
  await a.set({ step: 7 })
  await a.wait(420)
  await a.set({ done: true })
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={REST} build={build}>
      {(s) => (
      <div className="sc-res-sts-root">
        <Window tabs={[t.title, <Bar key="o" w={44} h={6} tone={2} />]} url={t.url} urlShape="pill" className="sc-res-sts-win" body={{ className: 'sc-res-sts-page' }}>
          <Text className="sc-res-sts-kicker">{t.kicker}</Text>
          <div className="sc-res-sts-head">
            <Text className="sc-res-sts-title">{t.title}</Text>
            <Segmented items={['FR', 'EN']} value={lang === 'fr' ? 0 : 1} className="sc-res-sts-seg" />
          </div>
          <div className="sc-res-sts-video">
            <span className="sc-res-sts-play" data-pressed={s.pressed || undefined}>
              <Icon name="play" filled size={14} />
            </span>
          </div>
        </Window>

        <div className="sc-res-sts-card" data-out={s.out || undefined}>
          <div className="sc-res-sts-state">
            <span className="sc-res-sts-mark" data-done={s.done || undefined}>
              <i className="sc-res-sts-ring" />
              <Icon name="check" filled size={16} />
            </span>
            <Roll variant="fade">{s.done ? t.state : t.pending}</Roll>
          </div>
          <div className="sc-res-sts-steps">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <i key={i} data-on={i < s.step || undefined} data-last={i === 6 || undefined} />
            ))}
          </div>
          <div className="sc-res-sts-count">
            <Roll>{t.count(s.done ? 7 : 6)}</Roll>
          </div>
        </div>
      </div>
      )}
    </ResourceStage>
  )
}
