'use client'

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Stage, dissolveTo, type Act } from '@/components/stageshow/kit'
import type { Layout } from '@/components/stageshow/kit/looks'
import type { Rect } from '@/components/stageshow/kit/measure'
import type { Script } from '@/components/stageshow/kit/act'
import { useReducedMotion } from '@/components/stageshow/kit/reduced-motion'
import { StillTintContext } from '@/components/skills/scenes/tint'
import { tintVars } from '@/components/skills/scenes/StillStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import '@/components/skills/scenes/still.css'

// How long the finished frame stays before the next turn, so it reads
const HOLD = 1400

/**
 * The canvas of every resource picture that moves: the same 390 x 300 design points and the same ground as StillStage
 * (the card or the hero provides the soft grey), plus a story that only ever plays FORWARD.
 *
 * At rest the picture is `poster`: the finished frame. With a mouse, the story plays while the pointer is over the card
 * (the nearest ancestor marked `data-hover-scope`, not just the picture); on a touch screen, while the picture is on
 * screen. Each turn: a frozen copy of the finished frame lies on top, the scene is set to `initial` under it and the copy
 * dissolves while `build` builds it up again (a seamless loop, like a GIF: never an empty picture), up to
 * the finished frame, which holds a moment, then the next turn starts. Never backwards. When the pointer leaves, the
 * scene settles back to the finished frame.
 *
 * Reduced motion: a hover is the visitor asking, so the story still plays on hover (the parts skip their own tweens);
 * nothing starts on its own on a touch screen.
 */
export default function ResourceStage<S extends object>({
  a,
  initial,
  poster,
  build,
  script,
  speed,
  height = 300,
  children,
}: {
  a: SceneProps['a']
  /** The empty frame the story builds from */
  initial: S
  /** The finished frame: the resting look, and where each turn ends */
  poster: S
  /** The entry sequence, from `initial` to `poster` */
  build?: Script<S>
  /** Older form: a loop that starts and ends on `initial` */
  script?: Script<S>
  speed?: number
  /** Design height, 300 by default (13:10); a wider picture passes its own */
  height?: number
  children: (s: S, rect: (name: string) => Rect, layout: Layout) => React.ReactNode
}) {
  const tint = useContext(StillTintContext)
  const holder = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  // null until measured, so a desktop never starts the touch loop on its first render
  const [canHover, setCanHover] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const loop = useMemo<Script<S> | undefined>(() => {
    if (!build && !script) return undefined
    return async (act: Act<S>) => {
      // Each turn starts with the loop seam (kit/seam.ts): the frame as it is dissolves into the first frame of the story
      if (build) {
        for (;;) {
          await dissolveTo(act, () => initial)
          await build(act)
          await act.wait(HOLD)
        }
      }
      // An older loop already starts and ends on `initial`: one seam, then it repeats on its own
      await dissolveTo(act, () => initial)
      for (;;) await script!(act)
    }
  }, [build, script, initial])

  // Mouse: the story plays on hover. Touch: while on screen, unless the visitor asked for reduced motion.
  const play = canHover ? 'hover' : 'loop'
  const active = canHover === true || (canHover === false && !reduced)

  // The hover belongs to the whole card: its pointer events are passed to the stage, which listens on its own box only
  useEffect(() => {
    const scope = holder.current?.closest('[data-hover-scope]')
    const fit = holder.current?.querySelector('.ss-fit')
    if (!scope || !fit || !canHover) return
    const enter = () => fit.dispatchEvent(new Event('pointerenter'))
    const leave = () => fit.dispatchEvent(new Event('pointerleave'))
    scope.addEventListener('pointerenter', enter)
    scope.addEventListener('pointerleave', leave)
    return () => {
      scope.removeEventListener('pointerenter', enter)
      scope.removeEventListener('pointerleave', leave)
    }
  }, [canHover, loop])

  const stage = (
    <Stage<S>
      width={390}
      height={height}
      initial={poster}
      poster={poster}
      script={active ? loop : undefined}
      play={play}
      onRequest={canHover === true}
      speed={speed}
      fill
      accent={a.hex}
      className={tint ? 'still still-tinted' : 'still'}
    >
      {children}
    </Stage>
  )
  return (
    <div ref={holder} style={{ ...(tint ? tintVars(tint) : { display: 'contents' }), pointerEvents: 'none' }}>
      {stage}
    </div>
  )
}

export type { Act }
