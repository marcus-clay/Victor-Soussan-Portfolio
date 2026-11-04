'use client'

import React, { type CSSProperties } from 'react'
import { Bar, Phone, Row } from '@/components/stageshow/kit'
import type { SceneProps } from '@/components/skills/scenes/types'
import ResourceStage, { type Act } from './ResourceStage'
import './guide-claude-code.css'

/** guide-claude-code: a phone pinned from the top, cut at the foot, whose home screen is being built (header, card, list, button), and a small prompt card on its left edge with the two tool lines of the Claude Code session. From the device-pair and phone-touch examples (the phone is the hero, one satellite straddles its edge). */
export const READY = true

const NBSP = ' '

const T = {
  en: {
    prompt: 'Build the home screen from the Figma file.',
    read: 'Read(home.fig)',
    write: 'Write(Home.tsx)',
  },
  fr: {
    prompt: `Construis l’écran d’accueil à partir du${NBSP}fichier Figma.`,
    read: 'Lecture(accueil.fig)',
    write: 'Écriture(Accueil.tsx)',
  },
}

type S = { typed: string; hide: boolean; read: boolean; write: boolean; screen: boolean }
/** The empty frame the story builds from: an empty prompt, an empty app */
const INITIAL: S = { typed: '', hide: false, read: false, write: false, screen: false }

/** On hover: `clear` takes the finished frame back to the empty one (everything leaves together, then the prompt is cleared while hidden), `build` types the prompt, reads the file, writes the screen and builds the phone blocks (the button last), and ends on the finished frame. */
function makeClear() {
  return async function clear(a: Act<S>) {
    await a.set({ hide: true, screen: false, write: false, read: false })
    await a.wait(450)
    await a.snap({ typed: '' })
    await a.set({ hide: false })
    await a.wait(200)
  }
}
function makeBuild(prompt: string) {
  return async function build(a: Act<S>) {
    await a.type('typed', prompt, { interval: 30 })
    await a.wait(350)
    await a.set({ read: true })
    await a.wait(800)
    await a.set({ write: true, screen: true })
    await a.wait(900)
  }
}

/** enter and exit delays of an element of the story, in ms */
const d = (enter: number, exit: number) => ({ '--d-in': `${enter}ms`, '--d-out': `${exit}ms` }) as CSSProperties

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  /** The finished frame: the resting look, and where `build` ends */
  const poster: S = { typed: t.prompt, hide: false, read: true, write: true, screen: true }
  return (
    <ResourceStage<S> a={a} initial={INITIAL} poster={poster} build={makeBuild(t.prompt)} clear={makeClear()}>
      {(s) => (
        <div className="sc-res-claude-code-root">
          <Phone width={190} frame="silver" className="sc-res-claude-code-phone">
            <div className="sc-res-claude-code-screen" data-on={s.screen || undefined}>
              <div className="sc-res-claude-code-blk sc-res-claude-code-head" style={d(0, 240)}>
                <i className="sc-res-claude-code-title" />
                <i className="sc-res-claude-code-avatar" />
              </div>
              <div className="sc-res-claude-code-blk" style={d(110, 180)}>
                <i className="sc-res-claude-code-card" />
              </div>
              <div className="sc-res-claude-code-blk" style={d(220, 120)}>
                <Row pad={0} lead={<Bar w={38} h={38} r={19} tone={2} />} title={<Bar w={150} tone={3} />} subtitle={<Bar w={96} tone={2} />} />
              </div>
              <div className="sc-res-claude-code-blk" style={d(300, 60)}>
                <Row pad={0} lead={<Bar w={38} h={38} r={19} tone={2} />} title={<Bar w={120} tone={3} />} subtitle={<Bar w={150} tone={2} />} />
              </div>
              <div className="sc-res-claude-code-blk" style={d(430, 0)}>
                <i className="sc-res-claude-code-btn" />
              </div>
            </div>
          </Phone>

          <div className="sc-res-claude-code-prompt">
            <div className="sc-res-claude-code-ask" data-hide={s.hide || undefined}>
              <span>{s.typed}</span>
              <span className="sc-res-claude-code-ghost">{t.prompt.slice(s.typed.length)}</span>
            </div>
            <div className="sc-res-claude-code-tools">
              <div className="sc-res-claude-code-tool" data-on={s.read || undefined}>
                <span className="sc-res-claude-code-dot" />
                {t.read}
              </div>
              <div className="sc-res-claude-code-tool" data-on={s.write || undefined}>
                <span className="sc-res-claude-code-dot" />
                {t.write}
              </div>
            </div>
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
