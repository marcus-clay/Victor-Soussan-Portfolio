'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * A figure that counts from 0 to its value when it enters the screen (900ms, ease-out, once).
 *
 * The exact string you pass is always what the DOM holds: the counting happens on a decorative
 * overlay (aria-hidden) while the real text is hidden with opacity, so screen readers, find in
 * page, SEO and no-JS visitors all get the final value. Prefix, suffix and the thousands
 * separator are kept as written ("+", "%", "K", "100 000+", "-50 %", "8,000+").
 *
 * Left untouched: strings without exactly one number, values under 3 (nothing to count), figures
 * already on screen at load (no flicker), reduced motion, missing IntersectionObserver.
 */

const NUMBER = /\d+(?:[   ,.]\d{3})+(?!\d)|\d+(?:[.,]\d+)?/g

interface Parsed {
  prefix: string
  suffix: string
  target: number
  format: (n: number) => string
}

export function parseCount(value: string): Parsed | null {
  const tokens = Array.from(value.matchAll(NUMBER))
  if (tokens.length !== 1) return null
  const m = tokens[0]
  const token = m[0]
  const prefix = value.slice(0, m.index)
  const suffix = value.slice((m.index ?? 0) + token.length)

  const grouped = /^\d+([   ,.])\d{3}/.exec(token)
  if (grouped) {
    const sep = grouped[1]
    const target = parseInt(token.replace(/\D/g, ''), 10)
    const format = (n: number) =>
      String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, sep)
    return { prefix, suffix, target, format }
  }

  const decimal = /^(\d+)([.,])(\d+)$/.exec(token)
  if (decimal) {
    const sep = decimal[2]
    const digits = decimal[3].length
    const target = parseFloat(`${decimal[1]}.${decimal[3]}`)
    const format = (n: number) => n.toFixed(digits).replace('.', sep)
    return { prefix, suffix, target, format }
  }

  const target = parseInt(token, 10)
  return { prefix, suffix, target, format: (n) => String(Math.round(n)) }
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

export default function CountUp({
  value,
  duration = 900,
  className = '',
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useIsoLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const parsed = parseCount(value)
    if (!parsed || parsed.target < 3) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = root.getBoundingClientRect()
    if (rect.top < window.innerHeight || rect.bottom <= 0) return

    const { prefix, suffix, target, format } = parsed
    const overlay = document.createElement('span')
    overlay.setAttribute('aria-hidden', 'true')
    overlay.className = 'count-up-overlay'
    overlay.textContent = `${prefix}${format(0)}${suffix}`
    root.appendChild(overlay)
    root.dataset.cv = 'pending'

    let frame = 0
    let safety = 0
    const finish = () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(safety)
      overlay.remove()
      delete root.dataset.cv
    }

    let notified = false
    const io = new IntersectionObserver(
      ([entry]) => {
        notified = true
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        // Timers still fire in a background tab, frames do not: the safety net lands the value
        safety = window.setTimeout(finish, duration + 400)
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          if (t >= 1) return finish()
          overlay.textContent = `${prefix}${format(target * easeOutQuart(t))}${suffix}`
          frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(root)
    // No first notification from the observer within a second and a half: show the real value
    const watchdog = window.setTimeout(() => {
      if (!notified) {
        io.disconnect()
        finish()
      }
    }, 1500)

    return () => {
      window.clearTimeout(watchdog)
      io.disconnect()
      finish()
    }
  }, [value, duration])

  return (
    <span ref={ref} className={`count-up ${className}`}>
      <span className="count-up-value">{value}</span>
    </span>
  )
}
