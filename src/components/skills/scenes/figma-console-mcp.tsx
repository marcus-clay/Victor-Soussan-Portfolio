'use client'

import React from 'react'
import { Bar, BrandMark, Caret, Prompt, Text, Window } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './figma-console-mcp.css'

/** figma-console-mcp: the variables table of a Figma file, and the terminal that just created them. From the static-card example (hero on the right, one satellite straddling its left edge over the sidebar). */
export const READY = true

const TEXT = {
  en: { title: 'Variables', file: 'Acme', group: 'Colors', names: ['brand', 'surface', 'text', 'border'], title2: 'claude', cmd: 'add the colors', tool: 'figma_create_variable', ok: '✓ 4 variables' },
  fr: { title: 'Variables', file: 'Acme', group: 'Couleurs', names: ['marque', 'surface', 'texte', 'bordure'], title2: 'claude', cmd: 'ajoute les couleurs', tool: 'figma_create_variable', ok: '✓ 4 variables' },
} as const

const SWATCH = ['var(--ss-accent)', '#ffffff', '#262628', '#e4e3e1']

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
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
          <div key={n} className="sc-figma-console-mcp-row" data-new={i === 0 || undefined}>
            <span className="sc-figma-console-mcp-sw" style={{ background: SWATCH[i] }} />
            <Text className="sc-figma-console-mcp-name">{n}</Text>
            <Bar w={[34, 28, 32, 26][i]} h={6} tone={2} shrink={false} />
          </div>
        ))}
      </Window>
      <Window chrome="terminal" title={t.title2} className="sc-figma-console-mcp-term">
        <Prompt path="~">
          <span className="sc-figma-console-mcp-line">{t.cmd}</span>
        </Prompt>
        <div className="sc-figma-console-mcp-line" style={{ color: 'var(--ss-term-dim)' }}>{t.tool}</div>
        <div className="sc-figma-console-mcp-line ok">{t.ok}</div>
        <Caret />
      </Window>
    </StillStage>
  )
}
