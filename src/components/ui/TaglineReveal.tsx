'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * A statement in large type whose words go from a muted tone to the full colour, one after the
 * other, as they cross a trigger line on the way up the screen.
 *
 * Why it never hides text by mistake (same contract as `Reveal`):
 * - Server HTML and the first client render carry the full colour. The muted state only exists
 *   once the component has mounted (`data-armed`, see app/globals.css), so without JavaScript the
 *   sentence reads in full.
 * - Only the colour changes: no movement, so reduced motion needs no special case and nothing
 *   shifts in the layout.
 * - If IntersectionObserver is missing, or never reports, every word is switched on.
 * - Words that sit on the same line are staggered in reading order (40ms apart), measured from
 *   their position on screen and refreshed on resize.
 */

const STAGGER_MS = 40
const WATCHDOG_MS = 1500

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function TaglineReveal({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  // Split on plain spaces only: a no-break space stays glued to the word before it
  const words = text.split(' ')

  useIsoLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const spans = Array.from(root.querySelectorAll<HTMLElement>('[data-w]'))

    const lightAll = () => spans.forEach((span) => span.setAttribute('data-on', ''))
    if (typeof IntersectionObserver === 'undefined') {
      lightAll()
      return
    }

    const stagger = () => {
      let lineTop = Number.NaN
      let rank = 0
      spans.forEach((span) => {
        const top = span.offsetTop
        if (top !== lineTop) {
          lineTop = top
          rank = 0
        }
        span.style.setProperty('--wd', `${rank * STAGGER_MS}ms`)
        rank += 1
      })
    }
    stagger()

    let heard = false
    const io = new IntersectionObserver(
      (entries) => {
        heard = true
        entries.forEach((entry) => {
          // On screen past the trigger line, or already scrolled above the viewport
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
            entry.target.setAttribute('data-on', '')
            io.unobserve(entry.target)
          }
        })
      },
      // The trigger line sits at 62% of the viewport height: a word lights as it rises above it
      { rootMargin: '0px 0px -38% 0px', threshold: 0 },
    )
    root.setAttribute('data-armed', '')
    spans.forEach((span) => io.observe(span))

    const watchdog = window.setTimeout(() => {
      if (!heard) lightAll()
    }, WATCHDOG_MS)
    window.addEventListener('resize', stagger)

    return () => {
      window.clearTimeout(watchdog)
      window.removeEventListener('resize', stagger)
      io.disconnect()
      root.removeAttribute('data-armed')
      lightAll()
    }
  }, [text])

  return (
    <p ref={ref} className={`tagline ${className}`}>
      {words.map((word, i) => (
        <span key={i} data-w="">
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
