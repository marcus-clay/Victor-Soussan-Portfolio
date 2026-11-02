'use client'

import React from 'react'
import { Check, Icon, Row, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './socle.css'

/** socle: a project window, five steps in the sidebar (structure, equip, build, ship, extend), the third one open */
export const READY = true

const T = {
  en: {
    steps: ['Structure', 'Equip', 'Build', 'Ship', 'Extend'],
    title: 'Build',
    kicker: 'Step 3 of 5',
    tasks: ['Home screen', 'Navigation', 'Sign-up form', 'Profile page'],
  },
  fr: {
    steps: ['Structurer', 'Outiller', 'Construire', 'Livrer', 'Élargir'],
    title: 'Construire',
    kicker: 'Étape 3 sur 5',
    tasks: ['Écran d’accueil', 'Navigation', 'Inscription', 'Page de profil'],
  },
}
const NOW = 2

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <StillStage a={a}>
      <Window
        title={t.title}
        className="sc-socle-win"
        sidebarWidth={140}
        sidebar={
          <div className="sc-socle-side">
            {t.steps.map((s, i) => {
              const state = i < NOW ? 'done' : i === NOW ? 'now' : 'todo'
              return (
                <div key={s} className="sc-socle-step" data-state={state}>
                  {state === 'done' && <span className="sc-socle-mark"><Icon name="check" size={10} stroke={2.2} /></span>}
                  {state === 'now' && <Check on={false} pending size={16} className="sc-socle-now" />}
                  {state === 'todo' && <span className="sc-socle-mark" data-todo />}
                  <span>{s}</span>
                </div>
              )
            })}
          </div>
        }
      >
        <div className="sc-socle-main">
          <div className="sc-socle-kicker">{t.kicker}</div>
          <div className="sc-socle-tasks">
            {t.tasks.map((task, i) => (
              <Row
                key={task}
                pad={6}
                lead={i === 0 ? <span className="sc-socle-tick"><Icon name="check" size={10} stroke={2.2} /></span> : <span className="sc-socle-open" />}
                title={<Text style={{ fontSize: 14, color: i === 0 ? 'var(--ss-text-faint)' : 'var(--ss-text-strong)' }}>{task}</Text>}
              />
            ))}
          </div>
        </div>
      </Window>
    </StillStage>
  )
}
