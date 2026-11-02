'use client'

import React from 'react'
import { Bar, Window } from '@/components/stageshow/kit'
import { Columns3, BookText, FileText, Inbox } from 'lucide-react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './personal-os.css'

/** personal-os: a Finder-like window on the journal of a folder of text files, and the `/inbox` command beside it */
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

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
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
          <div className="sc-pos-head">
            <span>{t.date}</span>
            <span className="sc-pos-tag">[PROD]</span>
          </div>
          {t.lines.map(([sym, text]) => (
            <div key={text} className="sc-pos-line">
              <span className="sc-pos-sym">{sym}</span>
              <span>{text}</span>
            </div>
          ))}
          <div className="sc-pos-rule" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Bar w={60} h={7} tone={2} />
            <Bar w={150} h={7} tone={3} />
            <Bar w={120} h={7} tone={2} />
          </div>
        </div>
      </Window>

      <div className="sc-pos-card">
        <span className="sc-pos-cmd">/inbox</span>
        <span className="sc-pos-file">
          <FileText size={15} strokeWidth={1.7} />
          {t.note}
        </span>
      </div>
    </StillStage>
  )
}
