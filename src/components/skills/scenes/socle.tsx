'use client'

import React from 'react'
import { Check, Icon, Row, Text, Window, type Act } from '@/components/stageshow/kit'
import ResourceStage from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './socle.css'

/**
 * socle: a project window, five steps in the sidebar (structure, equip, build, ship, extend), the third one open.
 *
 * On hover only: the two first steps are ticked one after the other, the third opens (build, about 2.6 s), then its
 * kicker and its tasks come in and the first task is ticked. The poster is the finished frame, the resting look.
 */
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

// done: steps ticked (0 to 2); now: the third step is open; tasks: tasks shown (0 to 4); tick: the first task is ticked
type S = { done: number; now: boolean; tasks: number; tick: boolean }
const EMPTY: S = { done: 0, now: false, tasks: 0, tick: false }
const DONE: S = { done: NOW, now: true, tasks: 4, tick: true }

// Out: the tick leaves, the tasks fade last first, then the steps go back
async function clear(a: Act<S>) {
  await a.set({ tick: false })
  await a.wait(60)
  await a.set({ tasks: 3 })
  await a.wait(60)
  await a.set({ tasks: 2 })
  await a.wait(60)
  await a.set({ tasks: 1 })
  await a.wait(60)
  await a.set({ tasks: 0, now: false })
  await a.wait(100)
  await a.set({ done: 1 })
  await a.wait(80)
  await a.set({ done: 0 })
  await a.wait(300)
}

// In: Structurer then Outiller are ticked, Construire opens, its tasks come in, the first is ticked
async function build(a: Act<S>) {
  await a.set({ done: 1 })
  await a.wait(500)
  await a.set({ done: 2 })
  await a.wait(500)
  await a.set({ now: true })
  await a.wait(550)
  await a.set({ tasks: 1 })
  await a.wait(100)
  await a.set({ tasks: 2 })
  await a.wait(100)
  await a.set({ tasks: 3 })
  await a.wait(100)
  await a.set({ tasks: 4 })
  await a.wait(650)
  await a.set({ tick: true })
  await a.wait(450)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => (
      <Window
        title={t.title}
        className="sc-socle-win"
        sidebarWidth={140}
        sidebar={
          <div className="sc-socle-side">
            {t.steps.map((step, i) => {
              const state = i < s.done ? 'done' : i === NOW && s.now ? 'now' : 'todo'
              return (
                <div key={step} className="sc-socle-step" data-state={state}>
                  <span className="sc-socle-slot">
                    <span className="sc-socle-mark" data-todo />
                    <span className="sc-socle-mark" data-done><Icon name="check" size={10} stroke={2.2} /></span>
                    <Check on={false} pending size={16} className="sc-socle-now" />
                  </span>
                  <span>{step}</span>
                </div>
              )
            })}
          </div>
        }
      >
        <div className="sc-socle-main">
          <div className="sc-socle-kicker sc-socle-in" data-in={s.tasks > 0 || undefined}>{t.kicker}</div>
          <div className="sc-socle-tasks">
            {t.tasks.map((task, i) => (
              <div key={task} className="sc-socle-in" data-in={i < s.tasks || undefined}>
                <Row
                  pad={6}
                  lead={
                    <span className="sc-socle-slot">
                      <span className="sc-socle-open" />
                      {i === 0 && <span className="sc-socle-tick" data-on={s.tick || undefined}><Icon name="check" size={10} stroke={2.2} /></span>}
                    </span>
                  }
                  title={<Text className="sc-socle-task" style={{ fontSize: 14, color: i === 0 && s.tick ? 'var(--ss-text-faint)' : 'var(--ss-text-strong)' }}>{task}</Text>}
                />
              </div>
            ))}
          </div>
        </div>
      </Window>
      )}
    </ResourceStage>
  )
}
