'use client'

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Stage, type Act } from '@/components/stageshow/kit'
import type { Layout } from '@/components/stageshow/kit/looks'
import type { Rect } from '@/components/stageshow/kit/measure'
import type { Script } from '@/components/stageshow/kit/act'
import { StillTintContext } from '@/components/skills/scenes/tint'
import { tintVars } from '@/components/skills/scenes/StillStage'
import type { SceneProps } from '@/components/skills/scenes/types'
import '@/components/skills/scenes/still.css'

/**
 * The canvas of every resource picture that moves: the same 390 x 300 design points and the same ground as StillStage
 * (the card or the hero provides the soft grey), plus a story that plays ON HOVER only.
 *
 * At rest the picture is `poster`: the finished frame, the same still a visitor sees under reduced motion or on a phone.
 * When the pointer enters the card (the nearest ancestor marked `data-hover-scope`, not just the picture), the story
 * plays: `clear` takes the finished frame back to the empty one (the exit sequence of the scene, a short cascade), then
 * `build` builds it up again and ENDS on the finished frame, where it stays. When the pointer leaves, the scene settles
 * back to the finished frame. No loop, no automatic start: nothing moves until the visitor asks.
 *
 * A scene gives `initial` (the empty frame), `poster` (the finished one), `build` and, when it has an exit sequence,
 * `clear`. A scene that only has the older `script` (a loop that starts and ends on `initial`) still works: it is played
 * once and the frame is then set back to `poster`.
 */
export default function ResourceStage<S extends object>({
  a,
  initial,
  poster,
  build,
  clear,
  script,
  speed,
  height = 300,
  children,
}: {
  a: SceneProps['a']
  /** The empty frame the story builds from */
  initial: S
  /** The finished frame: the resting look, and where the story ends */
  poster: S
  /** The entry sequence, from `initial` to `poster` */
  build?: Script<S>
  /** The exit sequence, from `poster` back to `initial` (a short cascade); without it the frame is set to `initial` at once */
  clear?: Script<S>
  /** Older form: a loop that starts and ends on `initial` */
  script?: Script<S>
  speed?: number
  /** Design height, 300 by default (13:10); a wider picture passes its own */
  height?: number
  children: (s: S, rect: (name: string) => Rect, layout: Layout) => React.ReactNode
}) {
  const tint = useContext(StillTintContext)
  const holder = useRef<HTMLDivElement>(null)
  // No hover on a phone: the picture stays on its finished frame
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const hoverScript = useMemo<Script<S> | undefined>(() => {
    if (!build && !script) return undefined
    return async (act: Act<S>) => {
      if (clear) await clear(act)
      else await act.set(() => initial)
      if (build) {
        await build(act)
      } else if (script) {
        await script(act)
        await act.set(() => poster)
      }
    }
  }, [build, clear, script, initial, poster])

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
  }, [canHover, hoverScript])

  const stage = (
    <Stage<S>
      width={390}
      height={height}
      initial={poster}
      poster={poster}
      script={canHover ? hoverScript : undefined}
      play="hover"
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
