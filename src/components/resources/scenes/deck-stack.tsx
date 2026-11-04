'use client'

import React from 'react'
import type { SceneProps } from '@/components/skills/scenes/types'
import ResourceStage, { type Act } from './ResourceStage'
import Face from './deck-slide'
import './deck-stack.css'

/**
 * The picture of every deck of the library: a loose pile of three slides, slightly turned (about -1, 3 and -4
 * degrees), the straightest on top and the only one with words (its section and its title). From the tilted-stack
 * example. A deck only gives its own text; its accent comes from the card (`--ss-accent`).
 *
 * At rest the pile is finished. On hover the slides are put away one after the other, then dropped back one after
 * the other (the one at the back first, the one with the words last) until the pile is finished again.
 */
type S = { show: [boolean, boolean, boolean] }
const initial: S = { show: [false, false, false] }
const poster: S = { show: [true, true, true] }

/** The pile is put away from the top: the slide with the words first, a short cascade (about 0.6 s) */
async function clear(a: Act<S>) {
  await a.set({ show: [false, true, true] })
  await a.wait(90)
  await a.set({ show: [false, false, true] })
  await a.wait(90)
  await a.set({ show: [false, false, false] })
  await a.wait(380)
}

/** The slides come back one after the other, the back one first, and the story ends on the finished pile */
async function build(a: Act<S>) {
  await a.wait(120)
  await a.set({ show: [false, false, true] })
  await a.wait(170)
  await a.set({ show: [false, true, true] })
  await a.wait(170)
  await a.set({ show: [true, true, true] })
  await a.wait(480)
}

export function DeckStackScene({ a, kicker, title }: { lang?: SceneProps['lang']; a: SceneProps['a']; kicker: string; title: string }) {
  return (
    <ResourceStage<S> a={a} initial={initial} poster={poster} build={build} clear={clear}>
      {(s) => (
        <div className="sc-res-deck-pile">
          {[0, 1, 2].map((i) => (
            <section key={i} className="slide" data-pos={i} data-hidden={!s.show[i] || undefined}>
              {i === 0 ? <Face kicker={kicker} title={title} /> : <Face ghost />}
            </section>
          ))}
        </div>
      )}
    </ResourceStage>
  )
}

export default DeckStackScene
