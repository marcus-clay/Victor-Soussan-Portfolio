'use client'

import React from 'react'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './marker-sketch.css'

/** marker-sketch: a dotted sheet, a three-step flow in marker, a loop back and a small wireframe, one accent stroke */
export const READY = true

const TEXT = {
  en: { a: 'Idea', b: 'Test', c: 'Pick' },
  fr: { a: 'Idée', b: 'Test', c: 'Choix' },
}

const r = (n: number) => Math.round(n * 10) / 10

/** A hand-drawn rectangle: each side is its own stroke, a little off, corners overshooting like a felt tip */
function box(x: number, y: number, w: number, h: number, s: number) {
  const j = (n: number) => Math.round(((Math.sin(s * 12.9898 + n * 78.233) * 43758.5453) % 1) * 24) / 10
  const x2 = x + w
  const y2 = y + h
  return [
    `M${x - 3 + j(1)} ${y + j(2)} C${r(x + w * 0.35)} ${y - 1.5 + j(3)} ${r(x + w * 0.7)} ${y + 1.5 + j(4)} ${x2 + 3 + j(5)} ${y + 0.5 + j(6)}`,
    `M${x2 + j(7)} ${y - 3 + j(8)} C${x2 + 1.5 + j(9)} ${r(y + h * 0.35)} ${x2 - 1.5 + j(10)} ${r(y + h * 0.7)} ${x2 + 0.5 + j(11)} ${y2 + 3 + j(12)}`,
    `M${x2 + 3 + j(13)} ${y2 + j(14)} C${r(x + w * 0.65)} ${y2 + 1.5 + j(15)} ${r(x + w * 0.3)} ${y2 - 1.5 + j(16)} ${x - 3 + j(17)} ${y2 + 0.5 + j(18)}`,
    `M${x + j(19)} ${y2 + 3 + j(20)} C${x - 1.5 + j(21)} ${r(y + h * 0.65)} ${x + 1.5 + j(22)} ${r(y + h * 0.3)} ${x + 0.5 + j(23)} ${y - 3 + j(24)}`,
  ].join(' ')
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  return (
    <StillStage a={a}>
      <div className="sc-ms-paper">
        <svg className="sc-ms-svg" viewBox="0 0 400 300" aria-hidden>
          {/* The one accent: a highlighter swipe behind the choice and a circle round its box */}
          <path className="sc-ms-hl" d="M262 66 L318 64" />
          {/* Row of three steps */}
          <path className="sc-ms-ink" d={box(24, 40, 78, 52, 1)} />
          <path className="sc-ms-ink" d={box(142, 40, 78, 52, 2)} />
          <path className="sc-ms-ink" d={box(260, 40, 78, 52, 3)} />


          {/* Arrows between steps */}
          <path className="sc-ms-ink" d="M108 66 C118 62 126 70 136 65 M129 58 L137 65 L128 72" />
          <path className="sc-ms-ink" d="M226 66 C236 70 244 62 254 67 M247 59 L255 67 L246 74" />
          {/* Loop back from Test to Idea */}
          <path className="sc-ms-thin" d="M181 100 C183 140 70 142 64 104 M57 113 L64 103 L72 112" />
          {/* Accent: underline under the chosen step */}
          <path className="sc-ms-acc" d="M268 100 C285 104 310 99 332 103" />
          {/* A small wireframe below */}
          <path className="sc-ms-ink" d={box(24, 158, 166, 98, 4)} />
          <path className="sc-ms-thin" d="M26 182 C80 184 140 181 188 183" />
          <path className="sc-ms-thin" d="M42 204 C62 205 80 203 98 204 M42 217 C56 218 70 216 84 217 M42 230 C60 231 78 229 92 230" />
          <path className="sc-ms-ink" d={box(116, 198, 56, 40, 5)} />
        </svg>
        {[[24, t.a], [142, t.b], [260, t.c]].map(([x, w]) => (
          <span key={w} className="sc-ms-word" style={{ left: x as number, top: 40, width: 78, height: 52 }}>{w}</span>
        ))}
        <div className="sc-ms-note">
          <svg viewBox="0 0 104 92" width="104" height="92" aria-hidden>
            <path className="sc-ms-thin" d="M16 28 C40 30 62 27 88 29 M16 46 C34 47 50 45 66 46" />
            <path className="sc-ms-acc" d="M18 68 L28 78 L46 58" />
          </svg>
        </div>
      </div>
    </StillStage>
  )
}
