'use client'

import React, { type CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { Bar, Caret, Prompt, Stage, Window, type Act } from '@/components/stageshow/kit'
import { accentFor } from './accentPalette'
import './resources-hero-stage.css'

/**
 * The hero picture of the Resources page, made with the Stageshow kit: the library as a tidy workbench of three kinds of
 * documents that complete each other, a guide (a terminal where a session writes itself), a template (a sheet whose
 * checklist fills) and a deck (a slide that lands on its pile), each with its small accent. A slim search field and
 * three discreet filters run along the top as the common thread. No cursor: the three beats are the documents' own, then
 * a short synthesis (the three filters light up one after the other, the three objects come forward together). The last
 * frame is the poster, shown still under reduced motion.
 *
 * Layout: "wide hero" on a 960 x 500 stage. The sheet, the tallest object, stands in the middle and runs off the bottom;
 * the terminal sits left and the deck right, both on one baseline, overlapping the sheet's margins. The compact design
 * (358 wide) keeps the sheet as the hero and stacks the terminal and the deck in a narrow right column.
 */

type S = {
  /** The document being built: -1 none, 0 guide, 1 template, 2 deck */
  focus: -1 | 0 | 1 | 2
  /** The synthesis: all three documents are forward */
  all: boolean
  /** How many filters are lit in the synthesis */
  lit: number
  /** The command typed in the terminal */
  typed: string
  /** The output lines shown (0 to 3) */
  lines: number
  /** The checklist rows ticked */
  ticks: number
  /** The top slide has landed on the pile */
  slide: boolean
}

const initial: S = { focus: -1, all: false, lit: 0, typed: '', lines: 0, ticks: 0, slide: false }

const NB = ' '

const COPY = {
  en: {
    label: 'The library: guides, templates and decks, three kinds of documents that complete each other.',
    search: 'Search',
    pills: ['Guides', 'Templates', 'Decks'],
    term: 'Claude Code',
    command: 'claude',
    out: ['Read(home.fig)', 'Write(Home.tsx)', 'Prototype ready'],
    kind: 'Template',
    sheet: `Checklist:${NB}designing a feature`,
    deck: 'Concept review',
    deckKind: 'Deck',
  },
  fr: {
    label: 'La bibliothèque : des guides, des modèles et des decks, trois natures de documents qui se complètent.',
    search: 'Rechercher',
    pills: ['Guides', 'Modèles', 'Decks'],
    term: 'Claude Code',
    command: 'claude',
    out: ['Lecture(accueil.fig)', 'Écriture(Accueil.tsx)', 'Prototype prêt'],
    kind: 'Modèle',
    sheet: `Checklist${NB}: concevoir une fonctionnalité`,
    deck: 'Revue de concept',
    deckKind: 'Deck',
  },
} as const

const POSTER: S = { focus: 2, all: true, lit: 3, typed: 'claude', lines: 3, ticks: 4, slide: true }

/** The three documents and their accents, from the library's own palette */
const HUES = [accentFor('guide-claude-code'), accentFor('template-feature-checklist'), accentFor('deck-concept-review')]

const ROWS = [150, 118, 164, 104, 138, 96, 152, 112]

const hue = (i: number): CSSProperties => ({ '--hue': HUES[i].hex, '--hue-soft': HUES[i].soft }) as CSSProperties

export default function ResourcesHeroStage({ lang }: { lang: 'en' | 'fr' }) {
  const c = COPY[lang]

  /** About 12.5 s: the guide writes itself, the sheet fills, the slide lands; then the filters light up one after the
   *  other and the three documents stand together; a rest; then what the story added leaves in a short reverse stagger. */
  async function script(a: Act<S>) {
    await a.wait(900)
    // 1. The guide: a command, three lines
    await a.set({ focus: 0 })
    await a.wait(260)
    await a.type('typed', c.command, { interval: 55 })
    await a.wait(260)
    for (let i = 1; i <= 3; i++) {
      await a.set({ lines: i })
      await a.wait(340)
    }
    await a.wait(500)
    // 2. The template: the checklist fills
    await a.set({ focus: 1 })
    await a.wait(420)
    for (let i = 1; i <= 4; i++) {
      await a.set({ ticks: i })
      await a.wait(340)
    }
    await a.wait(500)
    // 3. The deck: the slide lands on its pile
    await a.set({ focus: 2 })
    await a.wait(300)
    await a.set({ slide: true })
    await a.wait(1100)
    // 4. The synthesis: the filters light up one after the other and the three documents stand together
    await a.set({ all: true })
    for (let i = 1; i <= 3; i++) {
      await a.set({ lit: i })
      await a.wait(170)
    }
    await a.wait(3400)
    // Back to the start: what was added leaves, last in first out
    await a.set({ lit: 0, all: false, focus: -1, slide: false })
    await a.wait(120)
    await a.set({ ticks: 0 })
    await a.wait(120)
    await a.set({ lines: 0 })
    await a.wait(240)
    await a.snap({ typed: '' })
    await a.wait(700)
  }

  return (
    <div role="img" aria-label={c.label} className="rs-wrap">
      <Stage width={960} height={500} compact={{ below: 560, width: 358, height: 440 }} fill accent={HUES[1].hex} initial={initial} poster={POSTER} script={script} className="rs">
        {(s) => {
          const fwd = (k: number) => s.all || s.focus === k || undefined
          return (
            <>
              <div className="rs-search">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.6 10.6 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {c.search}
              </div>
              <div className="rs-pills">
                {c.pills.map((p, i) => (
                  <span key={p} className="rs-pill" style={hue(i)} data-now={(!s.all && s.focus === i) || undefined} data-lit={s.lit > i || undefined}>
                    <i />
                    {p}
                  </span>
                ))}
              </div>

              {/* The guide: a terminal where the session writes itself */}
              <Window chrome="terminal" lights="grey" title={c.term} className="rs-obj rs-term" style={hue(0)} data-fwd={fwd(0)}>
                <Prompt path="~">
                  <span>{s.typed}</span>
                  {s.lines === 0 && <Caret />}
                </Prompt>
                {c.out.map((line, i) => (
                  <div key={line} className="rs-out" data-on={s.lines > i || undefined}>
                    <span className="ok">✓</span> {line}
                  </div>
                ))}
                <Prompt path="~" className="rs-out" data-on={s.lines >= 3 || undefined}>
                  <Caret />
                </Prompt>
              </Window>

              {/* The template: a sheet whose checklist fills */}
              <div className="rs-obj rs-sheet" style={hue(1)} data-fwd={fwd(1)}>
                <div className="rs-kind">
                  <i />
                  {c.kind}
                </div>
                <div className="rs-sheet__title">{c.sheet}</div>
                <div className="rs-rows">
                  {ROWS.map((w, i) => (
                    <div key={i} className="rs-row" data-done={s.ticks > i || undefined}>
                      <span className="rs-box">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="rs-ln" style={{ width: w }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* The deck: a pile of slides, the top one lands */}
              <div className="rs-obj rs-deck" style={hue(2)} data-fwd={fwd(2)}>
                <div className="rs-slide rs-slide--c" />
                <div className="rs-slide rs-slide--b rs-face">
                  <div className="rs-slide__text">
                    <Bar w={44} h={5} r={3} tone={2} />
                    <div className="rs-ghost-title">
                      <Bar w={120} h={9} r={5} tone={2} />
                      <Bar w={80} h={9} r={5} tone={2} />
                    </div>
                    <Bar w={96} h={6} r={3} tone={1} />
                  </div>
                  <div className="rs-slide__art rs-slide__art--ghost" />
                </div>
                <div className="rs-slide rs-slide--a rs-face" data-on={s.slide || undefined}>
                  <div className="rs-slide__text">
                    <div className="rs-kind">
                      <i />
                      {c.deckKind}
                    </div>
                    <div className="rs-slide__title">{c.deck}</div>
                    <div className="rs-slide__lines">
                      <Bar w={104} h={6} r={3} tone={2} />
                      <Bar w={72} h={6} r={3} tone={2} />
                    </div>
                  </div>
                  <div className="rs-slide__art">
                    <span className="rs-slide__dot" />
                    <span className="rs-slide__bar" />
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </Stage>
    </div>
  )
}
