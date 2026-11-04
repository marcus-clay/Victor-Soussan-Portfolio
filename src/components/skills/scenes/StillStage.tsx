'use client'

import React, { useContext } from 'react'
import { Stage } from '@/components/stageshow/kit'
import type { SceneProps } from './types'
import { StillTintContext } from './tint'
import './still.css'

/**
 * The canvas of every skill picture, made with the Stageshow kit: a still (no script, no cursor unless asked),
 * 390 x 300 design points (13:10, the ratio of the card's panel), scaled to fill the panel. The skill's accent is the
 * stage's accent (`--ss-accent`, `--ss-accent-soft`). Compose the scene in `children`: the hero object (a window,
 * a card, a phone) pinned and cropped as framing.md says, at most one or two satellites, real words only on what
 * the story is about.
 */
/** The hue of a coloured stage as custom properties; `display: contents` keeps the wrapper out of the layout */
export function tintVars(tint: { hex: string; soft: string; ground?: readonly [string, string, string]; on?: string }): React.CSSProperties {
  const [g1, g2, g3] = tint.ground ?? [tint.soft, tint.hex, tint.soft]
  return {
    display: 'contents',
    ['--still-hex' as string]: tint.hex,
    ['--still-soft' as string]: tint.soft,
    ['--still-g1' as string]: g1,
    ['--still-g2' as string]: g2,
    ['--still-g3' as string]: g3,
    ['--still-on' as string]: tint.on ?? '#111827',
  }
}

export default function StillStage({ a, children, hover }: { a: SceneProps['a']; children: React.ReactNode; hover?: string[] }) {
  const tint = useContext(StillTintContext)
  const stage = (
    <Stage width={390} height={300} initial={{}} fill accent={a.hex} hover={hover} className={tint ? 'still still-tinted' : 'still'}>
      {() => <>{children}</>}
    </Stage>
  )
  // The hue travels as custom properties; `display: contents` keeps the wrapper out of the layout
  return tint ? (
    <div style={tintVars(tint)}>{stage}</div>
  ) : (
    stage
  )
}
