'use client'

import React from 'react'
import { Bar, BrandMark, Caret, Prompt, Text, Window } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './figma-console-mcp.css'

/**
 * figma-console-mcp: the variables table of a Figma file, and the terminal that just created them. From the static-card example (hero on the right, one satellite straddling its left edge over the sidebar).
 *
 * On hover only (no loop): the result line, the four variables and the command leave (clear, about 0.5 s); then the command
 * is typed, the tool call appears, the four variables are written in the table one after the other and the terminal
 * confirms (build, about 2.7 s), ending on the finished frame.
 */
export const READY = true

const TEXT = {
  en: { title: 'Variables', file: 'Acme', group: 'Colors', names: ['brand', 'surface', 'text', 'border'], title2: 'claude', cmd: 'add the colors', tool: 'figma_create_variable', ok: '✓ 4 variables' },
  fr: { title: 'Variables', file: 'Acme', group: 'Couleurs', names: ['marque', 'surface', 'texte', 'bordure'], title2: 'claude', cmd: 'ajoute les couleurs', tool: 'figma_create_variable', ok: '✓ 4 variables' },
} as const

const SWATCH = ['var(--ss-accent)', '#ffffff', '#262628', '#e4e3e1']

/** cmd: the command is typed; tool: the tool call line; rows: how many variables are written in the table; ok: the terminal confirms */
type S = { cmd: boolean; tool: boolean; rows: number; ok: boolean }
const EMPTY: S = { cmd: false, tool: false, rows: 0, ok: false }
const DONE: S = { cmd: true, tool: true, rows: 4, ok: true }

// In: the command is typed, the tool is called, the variables appear in the table one after the other, the terminal confirms
async function build(a: Act<S>) {
  await a.wait(250)
  await a.set({ cmd: true })
  await a.wait(700)
  await a.set({ tool: true })
  await a.wait(450)
  for (const rows of [1, 2, 3, 4]) {
    await a.set({ rows })
    await a.wait(130)
  }
  await a.wait(380)
  await a.set({ ok: true })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build}>
      {(s) => (
      <>
      <Window
        title={t.title}
        sidebar={
          <div className="sc-figma-console-mcp-side">
            <div className="sc-figma-console-mcp-file">
              <BrandMark brand="figma" size={14} tile={false} />
              <Text>{t.file}</Text>
            </div>
            <Bar w={64} h={6} tone={2} />
            <Bar w={48} h={6} tone={2} />
          </div>
        }
        sidebarWidth={100}
        className="sc-figma-console-mcp-win"
        body={{ className: 'sc-figma-console-mcp-main' }}
      >
        <div className="sc-figma-console-mcp-group">{t.group}</div>
        {t.names.map((n, i) => (
          <div key={n} className="sc-figma-console-mcp-row" data-new={i === 0 || undefined} data-in={i < s.rows || undefined}>
            <span className="sc-figma-console-mcp-sw" style={{ background: SWATCH[i] }} />
            <Text className="sc-figma-console-mcp-name">{n}</Text>
            <Bar w={[34, 28, 32, 26][i]} h={6} tone={2} shrink={false} />
          </div>
        ))}
      </Window>
      <Window chrome="terminal" title={t.title2} className="sc-figma-console-mcp-term">
        <Prompt path="~">
          <span className="sc-figma-console-mcp-line sc-figma-console-mcp-cmd" data-in={s.cmd || undefined}>{t.cmd}</span>
        </Prompt>
        <div className="sc-figma-console-mcp-line sc-figma-console-mcp-step" data-in={s.tool || undefined} style={{ color: 'var(--ss-term-dim)' }}>{t.tool}</div>
        <div className="sc-figma-console-mcp-line sc-figma-console-mcp-step ok" data-in={s.ok || undefined}>{t.ok}</div>
        <Caret />
      </Window>
      </>
      )}
    </ResourceStage>
  )
}
