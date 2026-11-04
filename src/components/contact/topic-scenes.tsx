'use client'

import React from 'react'
import { Badge, Caret, Code, Prompt, Text, Window, type CodeLine } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import './topic-scenes.css'

/**
 * The pictures of the speaking cards of the contact page, in the realistic manner of Stageshow: the real chrome of each
 * thing (a terminal, a code window with a diff, a browser, a variables panel), real lines and few of them, one window per
 * scene (390 x 240 design points, drawn from the left edge) on a light container tinted with the topic's pale hue.
 * Each plays one short story on hover of the whole card and rests on its finished frame.
 *
 *   claude-code    a Claude Code terminal: the request, three lines done, the prompt ready again
 *   personal-os    a folder and its CLAUDE.md, the rules written line by line
 *   ai-prototype   a prototype in the browser, its status going from « Building » to « Live »
 *   figma-ds       a stylesheet where values become the design tokens read from Figma (a diff)
 */

const H = 240

// ---------------------------------------------------------------------------------------------------------------------
// 1. Claude Code for designers

const CC = {
  en: { cmd: 'Build the pricing page', lines: ['Design read', 'Components', 'Page coded'], title: 'pricing — claude' },
  fr: { cmd: 'Crée la page tarifs', lines: ['Maquette lue', 'Composants', 'Page codée'], title: 'tarifs — claude' },
}
type CCS = { n: number }

export function ClaudeCodeScene({ lang, a }: SceneProps) {
  const t = CC[lang]
  const empty: CCS = { n: 0 }
  const done: CCS = { n: 3 }
  const clear = async (act: Act<CCS>) => {
    await act.set({ n: 2 }); await act.wait(70)
    await act.set({ n: 1 }); await act.wait(70)
    await act.set({ n: 0 }); await act.wait(260)
  }
  const build = async (act: Act<CCS>) => {
    for (const n of [1, 2, 3]) {
      await act.set({ n }); await act.wait(n === 3 ? 500 : 460)
    }
  }
  return (
    <ResourceStage<CCS> height={H} a={a} initial={empty} poster={done} build={build} clear={clear}>
      {(s) => (
        <div className="tp-root">
          <Window chrome="terminal" lights="grey" title={t.title} className="tp-win tp-term">
            <Prompt path="~/site">claude “{t.cmd}”</Prompt>
            {t.lines.map((line, i) => (
              <div key={line} className="ok tp-out" data-show={s.n > i || undefined}>✓ {line}</div>
            ))}
            <Prompt path="~/site"><Caret /></Prompt>
          </Window>
        </div>
      )}
    </ResourceStage>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// 4. Design systems and Figma MCP: from design token to coded component

const FM_LINES: (CodeLine | string)[] = [
  '.button {',
  { text: '  background: #E5E7EB;', kind: 'del' },
  { text: '  background: var(--color-primary);', kind: 'add' },
  { text: '  border-radius: 6px;', kind: 'del' },
  { text: '  border-radius: var(--radius-md);', kind: 'add' },
  '}',
]
type FMS = { n: number }

export function FigmaMcpScene({ a }: SceneProps) {
  const empty: FMS = { n: 2 }
  const done: FMS = { n: 6 }
  const clear = async (act: Act<FMS>) => {
    await act.set({ n: 4 }); await act.wait(90)
    await act.set({ n: 2 }); await act.wait(260)
  }
  const build = async (act: Act<FMS>) => {
    for (const n of [3, 4, 5, 6]) {
      await act.set({ n }); await act.wait(n === 6 ? 460 : 520)
    }
  }
  return (
    <ResourceStage<FMS> height={H} a={a} initial={empty} poster={done} build={build} clear={clear}>
      {(s) => (
        <div className="tp-root">
          <Window title="Button.css" className="tp-win tp-code-win">
            <Code lines={FM_LINES} count={s.n} className="tp-code" />
          </Window>
        </div>
      )}
    </ResourceStage>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// 3. AI prototyping, concept to deployment

const PR = {
  en: { plans: ['Starter', 'Pro', 'Team'], building: 'Building', live: 'Live', head: 'Pricing' },
  fr: { plans: ['Starter', 'Pro', 'Team'], building: 'Build en cours', live: 'En ligne', head: 'Tarifs' },
}
type PRS = { live: boolean }

export function PrototypeScene({ lang, a }: SceneProps) {
  const t = PR[lang]
  const empty: PRS = { live: false }
  const done: PRS = { live: true }
  const clear = async (act: Act<PRS>) => {
    await act.set({ live: false }); await act.wait(360)
  }
  const build = async (act: Act<PRS>) => {
    await act.wait(900)
    await act.set({ live: true }); await act.wait(520)
  }
  return (
    <ResourceStage<PRS> height={H} a={a} initial={empty} poster={done} build={build} clear={clear}>
      {(s) => (
        <div className="tp-root">
          <Window url="proto.vercel.app" className="tp-win tp-browser">
            <div className="tp-page">
              <Text className="tp-page-head">{t.head}</Text>
              <div className="tp-plans">
                {t.plans.map((name, i) => (
                  <div key={name} className="tp-plan" data-i={i}>
                    <Text className="tp-plan-name">{name}</Text>
                    <span className="tp-plan-bar" /><span className="tp-plan-bar tp-plan-bar--short" />
                  </div>
                ))}
              </div>
            </div>
          </Window>
          <div className="tp-status">
            <Badge tone="warning" dot className="tp-status-a" data-show={!s.live || undefined}>{t.building}</Badge>
            <Badge tone="success" dot className="tp-status-b" data-show={s.live || undefined}>{t.live}</Badge>
          </div>
        </div>
      )}
    </ResourceStage>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// 4. A personal OS with Claude Code

const OS = {
  en: { side: ['inbox', 'journal', 'projects'], file: 'CLAUDE.md', lines: ['# My OS', '- Read, then answer', '- Decision + reason', '- Folder = memory'] },
  fr: { side: ['inbox', 'journal', 'projets'], file: 'CLAUDE.md', lines: ['# Mon OS', '- Lire avant de r\u00e9pondre', '- D\u00e9cision + raison', '- Dossier = m\u00e9moire'] },
}
type OSS = { n: number }

export function PersonalOsScene({ lang, a }: SceneProps) {
  const t = OS[lang]
  const empty: OSS = { n: 1 }
  const done: OSS = { n: 4 }
  const clear = async (act: Act<OSS>) => {
    await act.set({ n: 2 }); await act.wait(90)
    await act.set({ n: 1 }); await act.wait(260)
  }
  const build = async (act: Act<OSS>) => {
    for (const n of [2, 3, 4]) {
      await act.set({ n }); await act.wait(n === 4 ? 460 : 560)
    }
  }
  return (
    <ResourceStage<OSS> height={H} a={a} initial={empty} poster={done} build={build} clear={clear}>
      {(s) => (
        <div className="tp-root">
          <Window
            title={t.file}
            sidebar={
              <div className="tp-side">
                {t.side.map((name) => (
                  <span key={name} className="tp-side-item">{name}</span>
                ))}
                <span className="tp-side-item tp-side-item--on">{t.file}</span>
              </div>
            }
            sidebarWidth={112}
            className="tp-win tp-os"
          >
            <Code lines={t.lines} count={s.n} numbers={false} className="tp-code" />
          </Window>
        </div>
      )}
    </ResourceStage>
  )
}

export const TOPIC_SCENES: Record<string, React.ComponentType<SceneProps>> = {
  'claude-code': ClaudeCodeScene,
  'personal-os': PersonalOsScene,
  'ai-prototype': PrototypeScene,
  'figma-ds': FigmaMcpScene,
}
