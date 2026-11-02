'use client'

import React from 'react'
import { Caret, Prompt, Stage, Window, type Act } from '@/components/stageshow/kit'
import './claude-hero-stage.css'

/**
 * The hero picture of the Claude page, made with the Stageshow kit: agentic design as a whole. A request is typed in
 * Claude Code; the agent lays out a plan of four tasks and ticks them one by one; each task leaves something on the
 * stage, a mockup frame, then the prototype pressed, then a slide. The last line says the memory is updated. One
 * cursor; the last frame is the poster (shown still under reduced motion).
 *
 * Layout: "wide hero" on a 960 x 520 stage. The dark terminal is inset 64px from the left and 36px from the top and
 * runs off the bottom; the mockup frame (portrait) straddles its right edge and the slide (landscape) sits lower right:
 * two satellites of different shapes and sizes. The compact design (358 wide) keeps the terminal and the frame.
 */

type S = {
  typed: string
  sent: boolean
  /** How many tasks are ticked: 0 to 4 */
  done: number
  frame: boolean
  proto: boolean
  slide: boolean
  memory: boolean
}

const initial: S = { typed: '', sent: false, done: 0, frame: false, proto: false, slide: false, memory: false }
const POSTER: S = { typed: '', sent: true, done: 4, frame: true, proto: true, slide: true, memory: true }

const COPY = {
  fr: {
    label: 'La conception avec des agents : une demande dans Claude Code, un plan en quatre tâches, et à chaque tâche un résultat (maquette, prototype, présentation) puis la mémoire mise à jour.',
    title: 'acme-app · claude',
    request: 'Conçois le parcours d’inscription',
    plan: 'Plan',
    tasks: ['Cadrer le besoin', 'Maquetter dans Figma', 'Prototyper le parcours', 'Préparer la présentation'],
    memory: 'Mémoire mise à jour',
    placeholder: 'Écrire à Claude',
    hint: '? pour les raccourcis',
    frameLabel: 'Inscription',
    frameTitle: 'Créer un compte',
    frameButton: 'Continuer',
    slideTitle: 'Parcours d’inscription',
  },
  en: {
    label: 'Designing with agents: a request in Claude Code, a plan of four tasks, and a result for each (mockup, prototype, presentation), then the memory is updated.',
    title: 'acme-app · claude',
    request: 'Design the sign-up journey',
    plan: 'Plan',
    tasks: ['Frame the need', 'Mock up in Figma', 'Prototype the journey', 'Prepare the presentation'],
    memory: 'Memory updated',
    placeholder: 'Message Claude',
    hint: '? for shortcuts',
    frameLabel: 'Sign-up',
    frameTitle: 'Create an account',
    frameButton: 'Continue',
    slideTitle: 'The sign-up journey',
  },
} as const

const REST = { wide: { x: 30, y: 340 }, compact: { x: 14, y: 340 } }

export default function ClaudeHeroStage({ lang }: { lang: 'en' | 'fr' }) {
  const c = COPY[lang]

  async function script(a: Act<S>) {
    await a.wait(800)
    // The request, typed after a click in the prompt
    await a.enter('input')
    await a.wait(250)
    await a.click()
    await a.type('typed', c.request)
    await a.wait(350)
    await a.set({ sent: true })
    await a.wait(700)
    // The agent works through its plan; each task leaves a result on the stage
    await a.set({ done: 1 })
    await a.wait(650)
    await a.set({ done: 2, frame: true })
    await a.wait(950)
    await a.set({ done: 3, proto: true })
    await a.wait(950)
    await a.set({ done: 4, slide: true })
    await a.wait(750)
    await a.set({ memory: true })
    await a.wait(450)
    // Payoff: the pointer rests on the mockup
    await a.move('frame')
    await a.wait(2800)
    await a.move('rest')
    await a.wait(300)
    await a.set({ ...initial })
    await a.wait(600)
  }

  return (
    <div role="img" aria-label={c.label} className="ag-wrap">
      <Stage
        width={960}
        height={520}
        compact={{ below: 560, width: 358, height: 440 }}
        fill
        accent="#389DC7"
        initial={initial}
        poster={POSTER}
        script={script}
        cursor={{ at: REST }}
        className="ag"
      >
        {(s, _rect, layout) => (
          <>
            <Window chrome="terminal" title={c.title} className="ag-term">
              <div className="ag-head">
                <span className="ag-star">✻</span> Claude Code
              </div>
              <Prompt path="acme-app" data-target="input" data-cursor="ibeam" className="ag-prompt">
                {s.sent ? (
                  c.request
                ) : (
                  <>
                    {s.typed}
                    <Caret still={s.typed.length > 0} />
                  </>
                )}
              </Prompt>
              <div className="ag-line ag-line--plan" data-show={s.sent}>
                <span className="ag-bullet">●</span> {c.plan}
              </div>
              {c.tasks.map((task, i) => (
                <div key={task} className="ag-line ag-task" data-show={s.sent} data-done={s.done > i || undefined}>
                  <span className="ag-task__mark">{s.done > i ? '✓' : '○'}</span> {task}
                </div>
              ))}
              <div className="ag-line ag-line--memory" data-show={s.memory}>
                <span className="ok">✓</span> {c.memory}
              </div>
              <div className="ag-input" aria-hidden="true">
                <span>{c.placeholder}</span>
                <span className="ag-input__hint">{c.hint}</span>
              </div>
            </Window>

            <div className="ag-frame" data-show={s.frame} data-target="frame" data-cursor="pointer" data-proto={s.proto || undefined}>
              <div className="ag-frame__body">
                <div className="ag-frame__title">{c.frameTitle}</div>
                <div className="ag-field" />
                <div className="ag-field ag-field--short" />
                <div className="ag-frame__button">{c.frameButton}</div>
                <span className="ag-tap" aria-hidden="true" />
              </div>
            </div>

            <div className="ag-slide" data-show={s.slide}>
              <div className="ag-slide__rule" />
              <div className="ag-slide__title">{c.slideTitle}</div>
              <div className="ag-slide__lines">
                <span />
                <span />
              </div>
            </div>

            <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
          </>
        )}
      </Stage>
    </div>
  )
}
