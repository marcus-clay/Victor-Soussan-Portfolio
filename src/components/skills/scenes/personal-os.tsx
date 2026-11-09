'use client'

import React from 'react'
import { Bar, Window, type Act } from '@/components/stageshow/kit'
import { Columns3, BookText, FileText, Inbox } from 'lucide-react'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './personal-os.css'

/**
 * personal-os: a Finder-like window on the journal of a folder of text files, and the `/inbox` command beside it.
 *
 * On hover only: the command card comes in, then the journal fills (its date line, its three lines one after the other,
 * the rule and the rest), about 2.8 s. The poster is the finished frame, the resting look.
 */
export const READY = true

const T = {
  en: {
    folders: ['inbox', 'journal', 'board'],
    file: 'journal.md',
    date: 'Nov 2',
    lines: [
      ['→', 'Send the mock-up'],
      ['?', 'Who signs off the flow?'],
      ['!', 'Tight deadline'],
    ],
    note: 'meeting-notes.md',
  },
  fr: {
    folders: ['inbox', 'journal', 'board'],
    file: 'journal.md',
    date: '2 nov.',
    lines: [
      ['→', 'Envoyer la maquette'],
      ['?', 'Qui valide le parcours ?'],
      ['!', 'Délai très court'],
    ],
    note: 'compte-rendu.md',
  },
}
const ICONS = [Inbox, BookText, Columns3]

// card: the command card is there; lines: lines written (0 to 3, the date line comes with the first); rest: the rule and the bars
type S = { card: boolean; head: boolean; lines: number; rest: boolean }
const EMPTY: S = { card: false, head: false, lines: 0, rest: false }
const DONE: S = { card: true, head: true, lines: 3, rest: true }

// In: the command card, then the date line, the three lines of the journal and the rest
async function build(a: Act<S>) {
  await a.set({ card: true })
  await a.wait(650)
  await a.set({ head: true })
  await a.wait(350)
  await a.set({ lines: 1 })
  await a.wait(450)
  await a.set({ lines: 2 })
  await a.wait(450)
  await a.set({ lines: 3 })
  await a.wait(450)
  await a.set({ rest: true })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <Window
        title={t.file}
        className="sc-pos-win"
        sidebarWidth={112}
        sidebar={
          <div className="sc-pos-side">
            {t.folders.map((f, i) => {
              const Ico = ICONS[i]
              return (
                <div key={f} className="sc-pos-item" data-on={i === 1 || undefined}>
                  <Ico size={15} strokeWidth={1.7} />
                  <span>{f}</span>
                </div>
              )
            })}
          </div>
        }
      >
        <div className="sc-pos-main">
          <div className="sc-pos-head sc-pos-in" data-in={s.head || undefined}>
            <span>{t.date}</span>
            <span className="sc-pos-tag">[PROD]</span>
          </div>
          {t.lines.map(([sym, text], i) => (
            <div key={text} className="sc-pos-line sc-pos-in" data-in={i < s.lines || undefined}>
              <span className="sc-pos-sym">{sym}</span>
              <span>{text}</span>
            </div>
          ))}
          <div className="sc-pos-rule sc-pos-in" data-in={s.rest || undefined} />
          <div className="sc-pos-in" data-in={s.rest || undefined} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Bar w={60} h={7} tone={2} />
            <Bar w={150} h={7} tone={3} />
            <Bar w={120} h={7} tone={2} />
          </div>
        </div>
      </Window>

      <div className="sc-pos-card" data-in={s.card || undefined}>
        <span className="sc-pos-cmd">/inbox</span>
        <span className="sc-pos-file">
          <FileText size={15} strokeWidth={1.7} />
          {t.note}
        </span>
      </div>
      </>
      )}
    </ResourceStage>
  )
}
