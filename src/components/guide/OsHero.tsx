'use client'

import React from 'react'
import { Bar, Stage, Window, type Act } from '@/components/stageshow/kit'
import './os-hero.css'

/**
 * The hero picture of the "personal OS" guide, made with the Stageshow kit: the whole idea in one short story.
 * A raw note waits in the inbox; the pointer opens it and a card proposes what to file where ("propose, you approve,
 * writes"); the pointer approves and the journal opens with the new entries. One cursor; the last frame is the poster
 * (shown still under reduced motion).
 *
 * Layout: "pinned, bottom bleed" on a 960 x 460 stage: a file window inset from the top-left that runs off the
 * bottom, and one satellite (the proposal card) straddling its right edge over the empty margin. The compact design
 * (358 wide) keeps the same two objects.
 */

type S = {
  view: 'inbox' | 'journal'
  picked: boolean
  card: boolean
  approved: boolean
  /** How many journal entries are written: 0 to 3 */
  entries: number
}

const initial: S = { view: 'inbox', picked: false, card: false, approved: false, entries: 0 }
const POSTER: S = { view: 'journal', picked: true, card: true, approved: true, entries: 3 }

const COPY = {
  fr: {
    label: 'Une note brute déposée dans l’inbox : un agent propose ce qu’il range et où, vous validez, et le journal s’écrit.',
    folders: ['inbox', '00_journal', '04_decisions', '05_scope'],
    inboxTitle: 'inbox/',
    file: 'sync-portal.txt',
    noteTitle: 'Point hebdo, 12 mars',
    journalTitle: 'journal.md',
    date: '12 mars',
    entries: ['→ Envoyer la maquette', '? Qui valide le parcours ?', '! Délai très court'],
    agent: 'inbox-ingestion',
    proposes: 'propose',
    rows: ['Journal', 'Décisions', 'Board'],
    approve: 'Valider',
    written: 'Écrit',
  },
  en: {
    label: 'A raw note dropped in the inbox: an agent proposes what to file where, you approve, and the journal is written.',
    folders: ['inbox', '00_journal', '04_decisions', '05_scope'],
    inboxTitle: 'inbox/',
    file: 'sync-portal.txt',
    noteTitle: 'Weekly sync, 12 March',
    journalTitle: 'journal.md',
    date: '12 March',
    entries: ['→ Send the mockup', '? Who approves the journey?', '! Very short deadline'],
    agent: 'inbox-ingestion',
    proposes: 'proposes',
    rows: ['Journal', 'Decisions', 'Board'],
    approve: 'Approve',
    written: 'Written',
  },
} as const

const REST = { wide: { x: 36, y: 330 }, compact: { x: 14, y: 330 } }
const COUNTS = [3, 1, 2]

function Folder({ open }: { open?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" className="oh-folder" data-open={open || undefined}>
      <path d="M1.75 4.25A1.5 1.5 0 0 1 3.25 2.75h2.9c.4 0 .78.16 1.06.44l.6.62c.28.28.66.44 1.06.44h3.88a1.5 1.5 0 0 1 1.5 1.5v5.5a1.5 1.5 0 0 1-1.5 1.5H3.25a1.5 1.5 0 0 1-1.5-1.5z" fill="currentColor" />
    </svg>
  )
}

export default function OsHero({ lang }: { lang: 'en' | 'fr' }) {
  const c = COPY[lang]

  async function script(a: Act<S>) {
    await a.wait(800)
    // 1. The pointer opens the raw note, and an agent proposes
    await a.enter('file')
    await a.wait(300)
    await a.click()
    await a.set({ picked: true, card: true })
    await a.wait(1100)
    // 2. It approves; the journal opens and is written
    await a.move('approve')
    await a.wait(350)
    await a.click()
    await a.set({ approved: true })
    await a.wait(500)
    await a.set({ view: 'journal' })
    await a.wait(350)
    for (let i = 1; i <= 3; i++) {
      await a.set({ entries: i })
      await a.wait(380)
    }
    await a.move('rest')
    await a.wait(2800)
    await a.set({ ...initial })
    await a.wait(600)
  }

  return (
    <div role="img" aria-label={c.label} className="overflow-hidden rounded-3xl bg-[#F3F3F2] ring-1 ring-inset ring-black/[0.04]">
      <div className="aspect-[358/440] w-full min-[560px]:aspect-[960/460]">
        <Stage
          width={960}
          height={460}
          compact={{ below: 560, width: 358, height: 440 }}
          fill
          accent="#389DC7"
          initial={initial}
          poster={POSTER}
          script={script}
          cursor={{ at: REST }}
          className="oh"
        >
          {(s, _rect, layout) => (
            <>
              <Window
                title={s.view === 'inbox' ? c.inboxTitle : c.journalTitle}
                sidebar={
                  <nav className="oh-side">
                    {c.folders.map((f, i) => (
                      <div key={f} className="oh-side__row" data-on={(i === 0 && s.view === 'inbox') || (i === 1 && s.view === 'journal') || undefined}>
                        <Folder open={(i === 0 && s.view === 'inbox') || (i === 1 && s.view === 'journal')} />
                        {f}
                      </div>
                    ))}
                  </nav>
                }
                sidebarWidth={layout === 'compact' ? 112 : 176}
                className="oh-win"
              >
                <div className="oh-main">
                  {/* Inbox view: the raw note and its preview */}
                  <div className="oh-pane" data-show={s.view === 'inbox'}>
                    <div className="oh-file" data-target="file" data-cursor="pointer" data-picked={s.picked || undefined}>
                      <span className="oh-file__name">{c.file}</span>
                    </div>
                    <div className="oh-file oh-file--filler">
                      <Bar w={46} h={7} tone={3} />
                    </div>
                    <div className="oh-note">
                      <div className="oh-note__title">{c.noteTitle}</div>
                      <div className="oh-note__lines">
                        <Bar w={92} h={6} tone={2} />
                        <Bar w={78} h={6} tone={2} />
                        <Bar w={86} h={6} tone={2} />
                        <Bar w={52} h={6} tone={2} />
                      </div>
                    </div>
                  </div>

                  {/* Journal view: the entries the agent wrote */}
                  <div className="oh-pane" data-show={s.view === 'journal'}>
                    <div className="oh-date">{c.date}</div>
                    {c.entries.map((entry, i) => (
                      <div key={entry} className="oh-entry" data-show={s.entries > i}>
                        {entry}
                      </div>
                    ))}
                    <div className="oh-rest">
                      <Bar w={84} h={6} tone={2} />
                      <Bar w={66} h={6} tone={2} />
                      <Bar w={74} h={6} tone={2} />
                    </div>
                  </div>
                </div>
              </Window>

              <div className="oh-card" data-show={s.card}>
                <div className="oh-card__head">
                  <span className="oh-card__agent">{c.agent}</span>
                  <span className="oh-card__tag">{c.proposes}</span>
                </div>
                <div className="oh-card__rows">
                  {c.rows.map((row, i) => (
                    <div key={row} className="oh-card__row">
                      <span>{row}</span>
                      <span className="oh-card__count">{COUNTS[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="oh-card__btn" data-target="approve" data-cursor="pointer" data-done={s.approved || undefined}>
                  {s.approved ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3.5 8.4 6.6 11.4 12.5 4.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {c.written}
                    </>
                  ) : (
                    c.approve
                  )}
                </div>
              </div>

              <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
            </>
          )}
        </Stage>
      </div>
    </div>
  )
}
