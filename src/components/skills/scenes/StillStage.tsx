'use client'

import React from 'react'
import { Stage } from '@/components/stageshow/kit'
import type { SceneProps } from './types'
import './still.css'

/**
 * The canvas of every skill picture, made with the Stageshow kit: a still (no script, no cursor unless asked),
 * 390 x 300 design points (13:10, the ratio of the card's panel), scaled to fill the panel. The skill's accent is the
 * stage's accent (`--ss-accent`, `--ss-accent-soft`). Compose the scene in `children`: the hero object (a window,
 * a card, a phone) pinned and cropped as framing.md says, at most one or two satellites, real words only on what
 * the story is about.
 */
export default function StillStage({ a, children, hover }: { a: SceneProps['a']; children: React.ReactNode; hover?: string[] }) {
  return (
    <Stage width={390} height={300} initial={{}} fill accent={a.hex} hover={hover} className="still">
      {() => <>{children}</>}
    </Stage>
  )
}
