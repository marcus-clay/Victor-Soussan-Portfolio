'use client'

/**
 * Brings a shared `#section` link to the right place when the section is not in the page yet.
 *
 * The browser scrolls to a hash once, at load. Several pages (the case studies are loaded as views,
 * pictures are lazy) have no such element at that moment, and the page stays at the top. This waits
 * for the element for a few seconds, scrolls to it (its `scroll-margin-top` is honoured), and once more
 * after the pictures above have settled. A visitor who scrolls or presses a key first is never moved.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const WAIT_MS = 5000
const SETTLE_MS = 700

export default function HashTarget() {
  const pathname = usePathname()

  useEffect(() => {
    const raw = window.location.hash.slice(1)
    if (!raw) return
    let id = raw
    try {
      id = decodeURIComponent(raw)
    } catch {
      /* keep the raw id */
    }

    let done = false
    let touched = false
    let timer: number | undefined
    const started = performance.now()

    const stop = () => {
      done = true
      window.clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('wheel', onUser)
      window.removeEventListener('touchstart', onUser)
      window.removeEventListener('keydown', onUser)
    }
    const onUser = () => {
      touched = true
      stop()
    }
    const goTo = (el: HTMLElement) => el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior })

    const attempt = () => {
      if (done) return
      const el = document.getElementById(id)
      if (el) {
        goTo(el)
        // Pictures above the section may still be loading and push it down: once more, then done
        timer = window.setTimeout(() => {
          if (!touched && document.getElementById(id)) goTo(document.getElementById(id) as HTMLElement)
          stop()
        }, SETTLE_MS)
        observer.disconnect()
        return
      }
      if (performance.now() - started > WAIT_MS) stop()
    }

    const observer = new MutationObserver(attempt)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('wheel', onUser, { passive: true })
    window.addEventListener('touchstart', onUser, { passive: true })
    window.addEventListener('keydown', onUser)
    attempt()
    // The page may stay as it is for a while without mutating: stop the wait on time too
    const giveUp = window.setTimeout(() => !done && stop(), WAIT_MS + 200)
    return () => {
      window.clearTimeout(giveUp)
      stop()
    }
  }, [pathname])

  return null
}
