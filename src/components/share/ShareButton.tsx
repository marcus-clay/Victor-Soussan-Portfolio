'use client'

/**
 * The one share control of the site, for a page, a section or a media.
 *
 * Where the browser has its own share sheet (phones, Safari, Edge) a click opens it. Elsewhere it opens
 * the ShareMenu from the trigger: copy the link, LinkedIn, e-mail. The address is built at the moment of
 * the click (`shareUrl`), so it always matches what is on screen: the page, its `#section` or its `?m=media`.
 *
 * Variants, one per place:
 * - pill    a text button with the icon, 40px high, for the head of a page
 * - bar     the same, compact, for the sticky breadcrumb bar (40px hit area)
 * - icon    a round 40px icon button, for a strip of visuals
 * - viewer  a round 44px glass button, for the lightbox top bar
 * - custom  the caller draws the trigger (the link icon after a title) and passes it as children
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Export } from '@phosphor-icons/react'
import { useVideoLang } from '@/components/media/videoLabels'
import { canNativeShare, shareUrl, trackShare, type ShareTarget } from '@/lib/share'
import ShareMenu, { SHARE_COPY } from './ShareMenu'

export type ShareVariant = 'pill' | 'bar' | 'icon' | 'viewer' | 'custom'

export interface ShareButtonProps {
  target: ShareTarget
  /** Section: the id of the element the address points to */
  hash?: string
  /** Media: the key of the media (see mediaKey) */
  media?: string
  /** Name of what is shared, for the sheet and the e-mail. Default: the title of the page */
  title?: string
  variant?: ShareVariant
  /** Accessible name when it differs from "Share" (a section, a media) */
  label?: string | { fr: string; en: string }
  className?: string
  /** Inside a viewer: a click outside the menu only closes the menu */
  modal?: boolean
  /** Custom trigger content */
  children?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

const BASE = 'relative inline-flex shrink-0 items-center justify-center transition-[background-color,border-color,color,transform,opacity] duration-150 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

const VARIANTS: Record<Exclude<ShareVariant, 'custom'>, string> = {
  pill: `${BASE} h-10 gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:bg-gray-100`,
  // 32px drawn, 40px to hit: the extra 4px above and below belong to the bar
  bar: `${BASE} h-8 gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3 text-xs font-medium text-gray-900 before:absolute before:-inset-y-1 before:inset-x-0 before:content-[''] [@media(hover:hover)]:hover:bg-gray-100`,
  icon: `${BASE} size-10 rounded-full border border-gray-200 bg-white text-gray-900 [@media(hover:hover)]:hover:bg-gray-100`,
  viewer: `${BASE} size-11 rounded-full bg-black/45 text-white backdrop-blur-xl [@media(hover:hover)]:hover:bg-black/60 focus-visible:outline-white`,
}

export default function ShareButton({
  target,
  hash,
  media,
  title,
  variant = 'pill',
  label,
  className = '',
  modal = false,
  children,
  onOpenChange,
}: ShareButtonProps) {
  const lang = useVideoLang()
  const copy = SHARE_COPY[lang]
  const ref = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const [snapshot, setSnapshot] = useState({ url: '', title: '' })

  const setOpenState = useCallback(
    (next: boolean) => {
      setOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  const close = useCallback(
    (restoreFocus: boolean) => {
      setOpenState(false)
      if (restoreFocus) ref.current?.focus({ preventScroll: true })
    },
    [setOpenState]
  )

  // A share control that leaves the page with its menu open must not leave the flag behind
  useEffect(() => () => onOpenChange?.(false), []) // eslint-disable-line react-hooks/exhaustive-deps

  const onClick = async () => {
    if (open) return close(true)
    const url = shareUrl({ hash, media })
    const name = (title ?? document.title).trim()
    if (canNativeShare()) {
      try {
        await navigator.share({ title: name, url })
        trackShare(target, 'native')
        return
      } catch (error) {
        // Closing the sheet is a choice, not a failure
        if ((error as DOMException)?.name === 'AbortError') return
        // Any other refusal: the menu below does the job
      }
    }
    setSnapshot({ url, title: name })
    setOpenState(true)
  }

  const accessible = typeof label === 'object' ? label[lang] : (label ?? copy.share)

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={accessible}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        data-share-trigger
        className={`${variant === 'custom' ? '' : VARIANTS[variant]} ${className}`}
      >
        {children ?? (
          <>
            <Export size={variant === 'bar' ? 14 : 18} weight="bold" aria-hidden="true" />
            {(variant === 'pill' || variant === 'bar') && <span>{copy.share}</span>}
          </>
        )}
      </button>
      <ShareMenu id={menuId} open={open} anchor={ref.current} url={snapshot.url} title={snapshot.title} lang={lang} target={target} onClose={close} modal={modal} />
    </>
  )
}
