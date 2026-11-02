'use client'

import React from 'react'
import { Caret, Check, Prompt, Stage, Window, type Act } from '@/components/stageshow/kit'
import './skills-hero-stage.css'

/**
 * The hero picture of the skills page, made with the Stageshow kit: the skills catalogue in a light window, and what
 * happens when someone uses it. One cursor, three beats: it picks a skill, copies the install command from the card
 * that opens beside it, and the terminal that straddles the window's edge runs the command and confirms. The
 * last frame is the poster, shown still under reduced motion.
 *
 * Layout: "wide hero" on a 960 x 500 stage. The window is inset 72px from the left and 40px from the top and runs off
 * the bottom; the install card straddles its right edge, a dark terminal sits under it at the lower right (two
 * satellites of different kinds and sizes). The compact design (358 wide) keeps the window and the card and drops the
 * terminal: the card carries the confirmation.
 */

type S = {
  /** The skill card is selected */
  picked: boolean
  /** The install card is open */
  panel: boolean
  /** The copy button has been pressed */
  copied: boolean
  /** 0 nothing, 1 the command is pasted, 2 the confirmation */
  term: number
}

const initial: S = { picked: false, panel: false, copied: false, term: 0 }
const POSTER: S = { picked: true, panel: true, copied: true, term: 2 }

const COPY = {
  en: {
    label: 'The skills catalogue: pick a skill, copy its command, and Claude Code installs it.',
    title: 'Skills',
    search: 'Search a skill',
    pills: ['All', 'Product', 'Design'],
    more: 'More',
    heading: 'Design and UX',
    install: 'Install',
    tabs: ['Claude Code', 'Codex', 'Claude.ai'],
    copy: 'Copy',
    copied: 'Copied',
    done: 'prototype-anime installed',
    cards: ['prototype-anime', 'emil-design-eng', 'creative-director'],
  },
  fr: {
    label: 'Le catalogue de skills : on choisit une skill, on copie sa commande, et Claude Code l’installe.',
    title: 'Skills',
    search: 'Rechercher une skill',
    pills: ['Tout', 'Produit', 'Design'],
    more: 'Plus',
    heading: 'Design et UX',
    install: 'Installer',
    tabs: ['Claude Code', 'Codex', 'Claude.ai'],
    copy: 'Copier',
    copied: 'Copié',
    done: 'prototype-anime installée',
    cards: ['prototype-anime', 'emil-design-eng', 'creative-director'],
  },
} as const

const REST = { wide: { x: 40, y: 330 }, compact: { x: 24, y: 330 } }
const COMMAND = 'curl -L -o prototype-anime.zip …'

/** Three tiny drawings for the three cards: a phone, an easing curve, a row of criteria */
function Thumb({ kind }: { kind: 0 | 1 | 2 }) {
  return (
    <svg viewBox="0 0 120 70" className="ch-thumb__svg" aria-hidden="true">
      {kind === 0 && (
        <>
          <rect x="46" y="8" width="28" height="56" rx="6" fill="#fff" stroke="#1f2937" strokeWidth="2" />
          <rect x="51" y="20" width="18" height="4" rx="2" fill="#d1d5db" />
          <rect x="51" y="30" width="18" height="7" rx="3.5" fill="var(--ss-accent)" />
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M18 56 C 40 54, 56 18, 102 16" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="102" cy="16" r="4.5" fill="var(--ss-accent)" />
        </>
      )}
      {kind === 2 && (
        <>
          <rect x="22" y="16" width="76" height="6" rx="3" fill="#e5e7eb" />
          <rect x="22" y="16" width="58" height="6" rx="3" fill="var(--ss-accent)" />
          <rect x="22" y="32" width="76" height="6" rx="3" fill="#e5e7eb" />
          <rect x="22" y="32" width="40" height="6" rx="3" fill="#9ca3af" />
          <rect x="22" y="48" width="76" height="6" rx="3" fill="#e5e7eb" />
          <rect x="22" y="48" width="50" height="6" rx="3" fill="#9ca3af" />
        </>
      )}
    </svg>
  )
}

export default function SkillsHeroStage({ lang }: { lang: 'en' | 'fr' }) {
  const c = COPY[lang]

  async function script(a: Act<S>) {
    await a.wait(800)
    // 1. The pointer picks a skill
    await a.enter('card-0')
    await a.wait(300)
    await a.click()
    await a.set({ picked: true, panel: true })
    await a.wait(900)
    // 2. It copies the command
    await a.move('copy')
    await a.wait(300)
    await a.click()
    await a.set({ copied: true })
    await a.wait(700)
    // 3. The terminal pastes it, then confirms
    await a.set({ term: 1 })
    await a.wait(900)
    await a.set({ term: 2 })
    await a.move('rest')
    await a.wait(2800)
    // Back to the start
    await a.set({ ...initial })
    await a.wait(600)
  }

  return (
    <div role="img" aria-label={c.label} className="ch-wrap">
      <Stage
        width={960}
        height={500}
        compact={{ below: 560, width: 358, height: 440 }}
        fill
        accent="#389DC7"
        initial={initial}
        poster={POSTER}
        script={script}
        cursor={{ at: REST }}
        className="ch"
      >
        {(s, _rect, layout) => (
          <>
            <Window title={c.title} className="ch-win">
              <div className="ch-body">
                <div className="ch-bar">
                  <div className="ch-search">
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                      <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10.6 10.6 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {c.search}
                  </div>
                  <div className="ch-pills">
                    {c.pills.map((p, i) => (
                      <span key={p} className="ch-pill" data-on={i === 0 || undefined}>
                        {p}
                      </span>
                    ))}
                    <span className="ch-pill">{c.more}</span>
                  </div>
                </div>
                <div className="ch-heading">{c.heading}</div>
                <div className="ch-grid">
                  {c.cards.map((name, i) => (
                    <div key={name} className="ch-card" data-target={`card-${i}`} data-cursor="pointer" data-picked={(i === 0 && s.picked) || undefined}>
                      <div className="ch-thumb" data-tone={i}>
                        <Thumb kind={i as 0 | 1 | 2} />
                      </div>
                      <div className="ch-name">{name}</div>
                      <div className="ch-line" />
                      <div className="ch-line ch-line--short" />
                    </div>
                  ))}
                  <div className="ch-card ch-card--filler" aria-hidden="true">
                    <div className="ch-thumb" />
                    <div className="ch-line" />
                    <div className="ch-line ch-line--short" />
                  </div>
                </div>
                {/* A second shelf, as placeholders: the window runs off the bottom through it */}
                <div className="ch-heading ch-heading--bar" aria-hidden="true">
                  <span className="ch-hbar" />
                </div>
                <div className="ch-grid ch-grid--filler" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="ch-card ch-card--filler">
                      <div className="ch-thumb" data-filler={i} />
                      <div className="ch-line ch-line--name" />
                      <div className="ch-line ch-line--short" />
                    </div>
                  ))}
                </div>
              </div>
            </Window>

            <div className="ch-panel" data-show={s.panel}>
              <div className="ch-panel__head">
                <span className="ch-panel__name">prototype-anime</span>
                <span className="ch-panel__tag">{c.install}</span>
              </div>
              <div className="ch-tabs">
                {c.tabs.map((t, i) => (
                  <span key={t} className="ch-tab" data-on={i === 0 || undefined}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="ch-cmd">
                <code>{COMMAND}</code>
                <span className="ch-copy" data-target="copy" data-cursor="pointer" data-done={s.copied || undefined}>
                  {s.copied ? (
                    <>
                      <Check on size={13} /> {c.copied}
                    </>
                  ) : (
                    c.copy
                  )}
                </span>
              </div>
              <div className="ch-done" data-show={s.term >= 2}>
                <Check on size={14} /> {c.done}
              </div>
            </div>

            <Window chrome="terminal" title="~" className="ch-term" data-show={s.term >= 1}>
              <Prompt path="~">{s.term >= 1 ? <>{COMMAND}</> : <Caret />}</Prompt>
              <div className="ch-term__ok" data-show={s.term >= 2}>
                <span className="ok">✓</span> {c.done}
              </div>
            </Window>

            <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
          </>
        )}
      </Stage>
    </div>
  )
}
