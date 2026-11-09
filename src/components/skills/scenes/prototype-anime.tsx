'use client'

import React from 'react'
import { Count, Icon, Phone } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './prototype-anime.css'

/**
 * prototype-anime: an app screen played as a film: a phone, the glass finger about to tap, the scrubber of the film. From the phone-touch and corner-chip examples.
 *
 * On hover only (no loop): the finger and the two answers leave and the playhead goes back to the start (clear, about 0.6 s);
 * then the film plays: the playhead moves, Paris then Lyon are written in the two fields, the playhead goes on to 0:12,
 * the glass finger arrives on the button and presses it (build, about 2.8 s), ending on the finished frame.
 */
export const READY = true

const TEXT = {
  en: { title: 'Book a ride', from: 'From', to: 'To', a: 'Paris', b: 'Lyon', cta: 'Continue', time: '0:12' },
  fr: { title: 'Réserver', from: 'Départ', to: 'Arrivée', a: 'Paris', b: 'Lyon', cta: 'Continuer', time: '0:12' },
} as const

/** p: the playhead in % of the track; sec: the time shown; vals: how many of the two answers are written; finger: the glass finger is on the button; press: it presses */
type S = { p: number; sec: number; vals: number; finger: boolean; press: boolean }
const EMPTY: S = { p: 0, sec: 0, vals: 0, finger: false, press: false }
const DONE: S = { p: 46, sec: 12, vals: 2, finger: true, press: false }

const clock = (n: number) => String(Math.round(n)).padStart(2, '0')

// In: the playhead moves on, the two fields are answered, the finger arrives and presses
async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ p: 22, sec: 5, vals: 1 })
  await a.wait(130)
  await a.set({ vals: 2 })
  await a.wait(750)
  await a.set({ p: 46, sec: 12, finger: true })
  await a.wait(650)
  await a.set({ press: true })
  await a.wait(160)
  await a.set({ press: false })
  await a.wait(400)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <Phone width={290} className="sc-prototype-anime-phone">
        <div className="sc-prototype-anime-screen">
          <div className="sc-prototype-anime-title">{t.title}</div>
          <div className="sc-prototype-anime-card">
            <div className="sc-prototype-anime-field">
              <span>{t.from}</span>
              <span className="sc-prototype-anime-val" data-in={s.vals >= 1 || undefined}>{t.a}</span>
            </div>
            <div className="sc-prototype-anime-field">
              <span>{t.to}</span>
              <span className="sc-prototype-anime-val" data-in={s.vals >= 2 || undefined}>{t.b}</span>
            </div>
          </div>
          <div className="sc-prototype-anime-cta" data-press={s.press || undefined}>
            {t.cta}
            <span className="sc-prototype-anime-finger" data-in={s.finger || undefined} />
          </div>
        </div>
      </Phone>
      <div className="sc-prototype-anime-scrub">
        <Icon name="play" filled size={14} />
        <div className="sc-prototype-anime-track">
          <i style={{ width: `${s.p}%` }} />
          <b data-done style={{ left: '0%' }} />
          <b data-done={s.p >= 22 || undefined} style={{ left: '22%' }} />
          <b style={{ left: '72%' }} />
          <b style={{ left: '100%' }} />
          <em style={{ left: `${s.p}%` }} />
        </div>
        <span className="sc-prototype-anime-time">
          0:<Count value={s.sec} format={clock} duration={600} />
        </span>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
