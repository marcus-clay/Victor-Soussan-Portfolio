import type { Act } from './act'

// A soft start and a soft landing, the curve of every story on the site
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

/**
 * The seam of a loop, like a GIF: back to the start without ever showing the way back, and without an empty frame.
 *
 * A frozen copy of the frame as it is now (`.ss-ghost`, every layer but the cursor and the keycaps) lies on top, the scene
 * jumps to `patch` under it with no transition (act.snap), then the copy dissolves, with a light blur, while the story
 * starts again. What both frames share (the window, the chrome) stays solid; only what changes cross-fades. The copy stays
 * whole for the first `lead` of `duration`, so the new turn is already under way when it starts to go.
 *
 * Call it at the end of a looping script instead of `a.set({ ...initial })`, with the cursor already back at its rest.
 * If the run is stopped (pointer left, off screen), the copy goes in 240 ms.
 */
export async function dissolveTo<S>(
  a: Act<S>,
  patch: Partial<S> | ((s: S) => Partial<S>),
  { duration = 950, lead = 0.25 }: { duration?: number; lead?: number } = {},
): Promise<void> {
  const root = a.root
  if (!root) return a.snap(patch)
  const ghost = document.createElement('div')
  ghost.className = 'ss-ghost'
  ghost.setAttribute('aria-hidden', 'true')
  Array.from(root.children).forEach((child) => {
    if (!child.matches('.ss-ghost, .ss-cursor, .ss-keys, .ss-keys-row')) ghost.appendChild(child.cloneNode(true))
  })
  root.appendChild(ghost)

  const onAbort = () => fade(240, 0)
  const done = () => {
    ghost.remove()
    a.signal.removeEventListener('abort', onAbort)
  }
  function fade(ms: number, hold: number) {
    const from = getComputedStyle(ghost).opacity
    ghost.getAnimations().forEach((an) => an.cancel())
    ghost
      .animate(
        [
          { opacity: from, filter: 'blur(0px)' },
          { opacity: from, filter: 'blur(0px)', offset: hold },
          { opacity: 0, filter: 'blur(2px)' },
        ],
        { duration: ms, easing: EASE, fill: 'forwards' },
      )
      .finished.then(done, done)
  }
  a.signal.addEventListener('abort', onAbort, { once: true })
  if (a.signal.aborted) onAbort()

  await a.snap(patch)
  fade(duration, lead)
}
