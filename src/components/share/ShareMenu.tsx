'use client'

/**
 * The share menu: a small popover that opens from its trigger (transform-origin on the trigger, never from
 * nothing), or a bottom panel on a narrow screen. Used where the browser has no share sheet of its own.
 *
 * Entries, in this order: copy the link (the button turns into "Link copied" with a check for two seconds,
 * announced through a live region), LinkedIn, e-mail. Three is the whole list.
 *
 * Motion: 250ms in, 150ms out, strong ease-out, opacity and transform only. Reduced motion keeps the fade.
 * Keyboard: arrows, Home and End move between entries, Escape and Tab close and give the focus back to the
 * trigger. The page-wide flag in `lib/share` tells a viewer with its own keys (the lightbox) to leave
 * Escape and the arrows to the menu while it is open.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, EnvelopeSimple, LinkedinLogo, LinkSimple } from '@phosphor-icons/react'
import { copyText, linkedinHref, mailHref, setShareMenuOpen, trackShare, type ShareTarget } from '@/lib/share'

type Lang = 'en' | 'fr'

export const SHARE_COPY = {
  fr: {
    share: 'Partager',
    menu: 'Partager',
    copy: 'Copier le lien',
    copied: 'Lien copié',
    failed: 'Copie impossible',
    linkedin: 'LinkedIn',
    email: 'E-mail',
  },
  en: {
    share: 'Share',
    menu: 'Share',
    copy: 'Copy link',
    copied: 'Link copied',
    failed: 'Could not copy',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
} as const

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const WIDTH = 248
const GAP = 8
const MARGIN = 8
const ICON_SWAP = 'col-start-1 row-start-1 transition-[opacity,filter,transform] duration-200 ease-out'

interface Props {
  id?: string
  open: boolean
  anchor: HTMLElement | null
  url: string
  title: string
  lang: Lang
  target: ShareTarget
  /** Closes the menu; `restoreFocus` is true for the keyboard and for a chosen entry */
  onClose: (restoreFocus: boolean) => void
  /** Inside a viewer: a click outside only closes the menu, it does not reach what is behind */
  modal?: boolean
}

interface Place {
  left: number
  top: number
  originX: number
  originY: number
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

export default function ShareMenu({ id, open, anchor, url, title, lang, target, onClose, modal = false }: Props) {
  const copy = SHARE_COPY[lang]
  const reduced = useReducedMotion()
  const menuRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [place, setPlace] = useState<Place | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  // Mount on open, unmount once the exit has played
  useEffect(() => {
    if (open) {
      setSheet(window.innerWidth < 640)
      setMounted(true)
      return
    }
    setShown(false)
    const id = window.setTimeout(() => {
      setMounted(false)
      setPlace(null)
      setCopyState('idle')
    }, reduced ? 100 : 160)
    return () => window.clearTimeout(id)
  }, [open, reduced])

  // The page-wide flag, for viewers with their own keys
  useEffect(() => {
    if (!open) return
    setShareMenuOpen(true)
    return () => setShareMenuOpen(false)
  }, [open])

  const measure = useCallback(() => {
    const menu = menuRef.current
    if (!menu || !anchor || sheet) return
    const rect = anchor.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const h = menu.offsetHeight
    // Opens toward the side with room: left edges aligned when it fits, right edges otherwise
    let left = rect.left + WIDTH <= vw - MARGIN ? rect.left : rect.right - WIDTH
    left = Math.min(Math.max(left, MARGIN), Math.max(MARGIN, vw - WIDTH - MARGIN))
    const below = rect.bottom + GAP + h <= vh - MARGIN || rect.top - GAP - h < MARGIN
    const top = below ? rect.bottom + GAP : rect.top - GAP - h
    const centre = rect.left + rect.width / 2
    setPlace({ left, top, originX: Math.min(Math.max(centre - left, 12), WIDTH - 12), originY: below ? 0 : h })
  }, [anchor, sheet])

  useLayoutEffect(() => {
    if (!mounted) return
    measure()
  }, [mounted, measure])

  // Play the entrance once the menu is placed
  useEffect(() => {
    if (!mounted || !open) return
    if (!sheet && !place) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(id)
  }, [mounted, open, sheet, place])

  // Stay on the trigger when the page moves or resizes
  useEffect(() => {
    if (!mounted || sheet) return
    window.addEventListener('scroll', measure, true)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure, true)
      window.removeEventListener('resize', measure)
    }
  }, [mounted, sheet, measure])

  // First entry takes the focus
  useEffect(() => {
    if (!shown || !open) return
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus({ preventScroll: true })
  }, [shown, open])

  // Keys and outside clicks
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])
      const at = items.indexOf(document.activeElement as HTMLElement)
      const move = (to: number) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        items[(to + items.length) % items.length]?.focus()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        onClose(true)
      } else if (e.key === 'ArrowDown') move(at + 1)
      else if (e.key === 'ArrowUp') move(at < 0 ? items.length - 1 : at - 1)
      else if (e.key === 'Home') move(0)
      else if (e.key === 'End') move(items.length - 1)
      else if (e.key === 'Tab') {
        e.preventDefault()
        onClose(true)
      }
    }
    const onPointer = (e: PointerEvent) => {
      const node = e.target as Node | null
      if (!node || menuRef.current?.contains(node) || anchor?.contains(node)) return
      if (modal) {
        e.stopPropagation()
        e.preventDefault()
      }
      onClose(false)
    }
    window.addEventListener('keydown', onKey, true)
    document.addEventListener('pointerdown', onPointer, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      document.removeEventListener('pointerdown', onPointer, true)
    }
  }, [open, anchor, modal, onClose])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!mounted) return null

  const onCopy = async () => {
    const ok = await copyText(url)
    trackShare(target, 'copy')
    setCopyState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopyState('idle'), 2000)
  }

  const row =
    'flex w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium text-gray-900 outline-none transition-[background-color,transform] duration-150 ease-out [@media(hover:hover)]:hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:!outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 active:scale-[0.97] ' +
    (sheet ? 'h-12' : 'h-11')

  const motion = reduced
    ? { opacity: shown ? 1 : 0, transition: `opacity ${shown ? 250 : 150}ms ${EASE}` }
    : sheet
      ? {
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform ${shown ? 250 : 150}ms ${EASE}, opacity ${shown ? 250 : 150}ms ${EASE}`,
        }
      : {
          opacity: shown ? 1 : 0,
          transform: shown ? 'scale(1)' : 'scale(0.95)',
          transition: `transform ${shown ? 250 : 150}ms ${EASE}, opacity ${shown ? 250 : 150}ms ${EASE}`,
        }

  const panel = (
    <div
      ref={menuRef}
      id={id}
      role="menu"
      aria-label={copy.menu}
      data-share-menu
      className={
        sheet
          ? 'fixed inset-x-0 bottom-0 z-[310] rounded-t-2xl border-t border-gray-100 bg-white px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]'
          : 'fixed z-[310] rounded-2xl border border-gray-100 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)]'
      }
      style={{
        ...(sheet ? {} : { left: place?.left ?? 0, top: place?.top ?? 0, width: WIDTH, transformOrigin: `${place?.originX ?? 0}px ${place?.originY ?? 0}px`, visibility: place ? 'visible' : 'hidden' }),
        ...motion,
      }}
    >
      {sheet && <span className="mx-auto mb-2 mt-1 block h-1 w-9 rounded-full bg-gray-200" aria-hidden="true" />}

      <button type="button" role="menuitem" onClick={onCopy} className={row}>
        <span className="grid size-5 place-items-center" aria-hidden="true">
          <LinkSimple size={20} className={`${ICON_SWAP} ${copyState === 'copied' ? 'scale-75 opacity-0 blur-[2px]' : 'scale-100 opacity-100 blur-0'}`} />
          <Check size={20} weight="bold" className={`${ICON_SWAP} ${copyState === 'copied' ? 'scale-100 opacity-100 blur-0' : 'scale-75 opacity-0 blur-[2px]'}`} />
        </span>
        <span>{copyState === 'copied' ? copy.copied : copyState === 'failed' ? copy.failed : copy.copy}</span>
      </button>

      <a
        role="menuitem"
        href={linkedinHref(url)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackShare(target, 'linkedin')
          onClose(true)
        }}
        className={row}
      >
        <LinkedinLogo size={20} aria-hidden="true" />
        <span>{copy.linkedin}</span>
      </a>

      <a
        role="menuitem"
        href={mailHref(url, title)}
        onClick={() => {
          trackShare(target, 'email')
          onClose(true)
        }}
        className={row}
      >
        <EnvelopeSimple size={20} aria-hidden="true" />
        <span>{copy.email}</span>
      </a>

      {/* Read out when the link is copied */}
      <span role="status" aria-live="polite" className="sr-only">
        {copyState === 'copied' ? copy.copied : copyState === 'failed' ? copy.failed : ''}
      </span>
    </div>
  )

  return createPortal(
    <>
      {sheet && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[305] bg-black/30"
          style={{ opacity: shown ? 1 : 0, transition: `opacity ${shown ? 250 : 150}ms ${EASE}` }}
        />
      )}
      {panel}
    </>,
    document.body
  )
}
