'use client'

import React from 'react'
import { Caret, Check, Prompt, Stage, Window, type Act } from '@/components/stageshow/kit'
import './claude-code-stage.css'

/**
 * The illustration of the Claude tile on the homepage, made with the Stageshow kit: Claude Code in a dark terminal,
 * and beside it, straddling its edge, the folder it builds. One story, one cursor: the pointer clicks the prompt,
 * the request is typed, three lines confirm what was created, and the folders of the "brain" light up one by one.
 * The last frame (the payoff) is also the poster, shown still under reduced motion.
 *
 * Layout: "corner bleed" on a 560 x 440 stage. The terminal is inset 96px from the left and 40px from the top and
 * runs off the right and bottom edges; the folder card straddles its left edge, over the part of the terminal
 * that stays empty. A second design (`compact`, 358 wide) keeps the same story for a phone column.
 */

type S = {
  typed: string
  sent: boolean
  /** 0 nothing, 1 the skill line, 2 to 4 the three confirmations */
  step: number
  /** How many groups of the folder card are done: 0 to 3 */
  rows: number
}

const initial: S = { typed: '', sent: false, step: 0, rows: 0 }
const POSTER: S = { typed: '', sent: true, step: 4, rows: 3 }

const COPY = {
  en: {
    title: 'brain · claude',
    request: 'Create my personal OS',
    skill: 'Skill personal-os',
    lines: ['inbox, journal, decisions', 'rules and agents', 'CLAUDE.md'],
    placeholder: 'Message Claude',
    hint: '? for shortcuts',
    label: 'Claude Code builds a personal OS: a brain folder with an inbox, a journal and decisions.',
  },
  fr: {
    title: 'brain · claude',
    request: 'Crée mon OS personnel',
    skill: 'Skill personal-os',
    lines: ['inbox, journal, décisions', 'règles et agents', 'CLAUDE.md'],
    placeholder: 'Écrire à Claude',
    hint: '? pour les raccourcis',
    label: 'Claude Code construit un OS personnel : un dossier brain avec une inbox, un journal et des décisions.',
  },
} as const

const TREE = [
  { id: 'inbox', label: 'inbox/', at: 1, folder: true },
  { id: 'journal', label: '00_journal/', at: 2, folder: true },
  { id: 'decisions', label: '04_decisions/', at: 2, folder: true },
  { id: 'claude', label: 'CLAUDE.md', at: 3, folder: false },
] as const

const REST = { wide: { x: 40, y: 150 }, compact: { x: 24, y: 150 } }

function Folder() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="cs-tree__icon">
      <path d="M1.75 4.25A1.5 1.5 0 0 1 3.25 2.75h2.9c.4 0 .78.16 1.06.44l.6.62c.28.28.66.44 1.06.44h3.88a1.5 1.5 0 0 1 1.5 1.5v5.5a1.5 1.5 0 0 1-1.5 1.5H3.25a1.5 1.5 0 0 1-1.5-1.5z" fill="currentColor" />
    </svg>
  )
}

function File() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="cs-tree__icon">
      <path d="M4.5 1.75h4.1c.33 0 .64.13.88.37l2.4 2.4c.24.24.37.55.37.88v7.7a1.5 1.5 0 0 1-1.5 1.5h-6.25a1.5 1.5 0 0 1-1.5-1.5v-9.35a1.5 1.5 0 0 1 1.5-1.5z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export default function ClaudeCodeStage({ lang }: { lang: 'en' | 'fr' }) {
  const c = COPY[lang]
  const poster: S = { ...POSTER, typed: c.request }

  async function script(a: Act<S>) {
    await a.wait(700)
    // The pointer arrives from the edge and clicks the prompt
    await a.enter('input')
    await a.wait(250)
    await a.click()
    await a.type('typed', c.request)
    await a.wait(350)
    await a.set({ sent: true })
    await a.wait(500)
    // Claude answers, the folders light up as each line lands
    await a.set({ step: 1 })
    await a.wait(550)
    await a.set({ step: 2, rows: 1 })
    await a.wait(550)
    await a.set({ step: 3, rows: 2 })
    await a.wait(550)
    await a.set({ step: 4, rows: 3 })
    await a.wait(900)
    // Payoff: the pointer rests on the first folder
    await a.move('row-inbox')
    await a.wait(2600)
    // Back to the start, with the pointer parked where it began
    await a.move('rest')
    await a.wait(300)
    await a.set({ ...initial })
    await a.wait(500)
  }

  return (
    <div role="img" aria-label={c.label} className="cs-wrap">
      <Stage
        width={560}
        height={440}
        compact={{ below: 480, width: 358, height: 420 }}
        fill
        initial={initial}
        poster={poster}
        script={script}
        cursor={{ at: REST }}
        className="cs"
      >
        {(s, _rect, layout) => (
          <>
            <Window chrome="terminal" title={c.title} className="cs-term">
              <div className="cs-head">
                <span className="cs-star">✻</span> Claude Code
              </div>
              <div className="cs-head cs-head--path">~/brain</div>
              <Prompt path="brain" data-target="input" data-cursor="ibeam" className="cs-prompt">
                {s.sent ? (
                  c.request
                ) : (
                  <>
                    {s.typed}
                    <Caret still={s.typed.length > 0} />
                  </>
                )}
              </Prompt>
              <div className="cs-line" data-show={s.step >= 1}>
                <span className="cs-bullet">●</span> {c.skill}
              </div>
              {c.lines.map((line, i) => (
                <div key={line} className="cs-line cs-line--sub" data-show={s.step >= i + 2}>
                  <span className="ok">✓</span> {line}
                </div>
              ))}
              <div className="cs-input" aria-hidden="true">
                <span>{c.placeholder}</span>
                <span className="cs-input__hint">{c.hint}</span>
              </div>
            </Window>

            <div className="cs-tree">
              <div className="cs-tree__head">
                <Folder /> brain
              </div>
              {TREE.map((row) => (
                <div key={row.id} className="cs-tree__row" data-target={`row-${row.id}`} data-cursor="pointer" data-done={s.rows >= row.at || undefined}>
                  <Check on={s.rows >= row.at} size={14} />
                  {row.folder ? <Folder /> : <File />}
                  <span>{row.label}</span>
                </div>
              ))}
            </div>

            <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
          </>
        )}
      </Stage>
    </div>
  )
}
