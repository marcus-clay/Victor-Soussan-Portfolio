'use client'

import React from 'react'
import { Bar, Window } from '@/components/stageshow/kit'
import { Bot, BookText, FileText, Inbox, ScrollText, Search } from 'lucide-react'
import ResourceStage, { type Act } from './ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './guide-personal-os.css'

/** guide-personal-os (moving): a macOS window: a Finder-like window on the folder that serves as memory (inbox, journal, rules, agents) with the journal open, cut by the foot; a launcher palette on its left edge where `/inbox` files a meeting note. From the finder and raycast examples. */
export const READY = true

const NBSP = ' '

const T = {
  en: {
    folders: ['inbox', 'journal', 'rules', 'agents'],
    file: 'journal.md',
    date: 'Nov 2',
    lines: [
      ['→', 'Send the mock-up'],
      ['?', 'Who signs off the flow?'],
      ['!', 'Tight deadline'],
    ],
    command: '/inbox',
    note: 'notes.md',
  },
  fr: {
    folders: ['inbox', 'journal', 'règles', 'agents'],
    file: 'journal.md',
    date: '2 nov.',
    lines: [
      ['→', 'Envoyer la maquette'],
      ['?', `Qui valide le parcours${NBSP}?`],
      ['!', 'Délai très court'],
    ],
    command: '/inbox',
    note: 'compte-rendu.md',
  },
}
const ICONS = [Inbox, BookText, ScrollText, Bot]

/** Scene state: the command typed in the launcher, whether the palette is on screen, and how many journal lines are written. */
type S = { query: string; card: boolean; lines: number }
const EMPTY: S = { query: '', card: false, lines: 0 }
const REST: S = { query: '/inbox', card: true, lines: 3 }

/** On hover, `clear` takes the finished frame back to the empty one (about 0.7 s): the lines fade out in reverse, then the palette. */
const clear = async (a: Act<S>) => {
  await a.set({ lines: 2 })
  await a.wait(90)
  await a.set({ lines: 1 })
  await a.wait(90)
  await a.set({ lines: 0 })
  await a.wait(110)
  await a.set({ card: false })
  await a.wait(300)
  await a.snap({ query: '' })
}

/** then `build` writes it again and ends on the finished frame: the palette arrives and `/inbox` is typed, its result appears, the three lines are written one after the other. */
const build = async (a: Act<S>) => {
  await a.wait(150)
  await a.set({ card: true })
  await a.wait(450)
  await a.type('query', '/inbox', { interval: 85 })
  await a.wait(320)
  await a.set({ lines: 1 })
  await a.wait(300)
  await a.set({ lines: 2 })
  await a.wait(300)
  await a.set({ lines: 3 })
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  const typed = (s: S) => s.query === t.command
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={REST} build={build} clear={clear}>
      {(s) => (
        <div className="sc-res-os-root">
          <Window
            title={t.file}
            className="sc-res-os-win"
            sidebarWidth={98}
            sidebar={
              <div className="sc-res-os-side">
                {t.folders.map((f, i) => {
                  const Ico = ICONS[i]
                  return (
                    <div key={f} className="sc-res-os-item" data-on={i === 1 || undefined}>
                      <Ico size={14} strokeWidth={1.7} />
                      <span>{f}</span>
                    </div>
                  )
                })}
              </div>
            }
          >
            <div className="sc-res-os-main">
              <div className="sc-res-os-head">
                <span>{t.date}</span>
                <span className="sc-res-os-tag">[PROD]</span>
              </div>
              {t.lines.map(([sym, text], i) => (
                <div key={text} className="sc-res-os-line" data-on={s.lines > i || undefined}>
                  <span className="sc-res-os-sym">{sym}</span>
                  <span>{text}</span>
                </div>
              ))}
              <div className="sc-res-os-rule" />
              <div className="sc-res-os-bars">
                <Bar w={54} h={7} tone={2} />
                <Bar w={132} h={7} tone={3} />
                <Bar w={104} h={7} tone={2} />
              </div>
            </div>
          </Window>

          <div className="sc-res-os-card" data-on={s.card || undefined}>
            <div className="sc-res-os-field">
              <Search size={14} strokeWidth={1.7} />
              <span className="sc-res-os-cmd">{s.query}</span>
            </div>
            <div className="sc-res-os-result" data-on={typed(s) || undefined}>
              <span className="sc-res-os-tile">
                <FileText size={13} strokeWidth={1.7} />
              </span>
              <span className="sc-res-os-file">{t.note}</span>
            </div>
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
