'use client'

/**
 * The like of a visual: a heart and, from the first like on, the number of likes.
 *
 * - `pill`: the small translucent pill in the bottom left corner of a visual. Placed with the corner of
 *   its closest positioned parent (the visual container, `relative`); it appears when that container is
 *   hovered or holds keyboard focus, on devices that hover only. Inside an element marked
 *   `data-likes-visible` (a lightbox) it is always there, on touch screens too.
 * - `inline`: no background, in the flow, for a lightbox toolbar. Same heart, same motion, same number.
 *
 * Draws nothing while the likes service is off or has not answered (see app/api/likes/route.ts).
 * Many buttons on one page cost ONE request (likesStore).
 *
 * Motion: the heart fills with a small rebound, a few dots spark, the number rolls (vertical
 * translation, fade and a light blur). With `prefers-reduced-motion`, a plain fade and a colour change.
 */

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Heart } from '@phosphor-icons/react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLike } from './likesStore'
import './likes.css'

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'
const COPY = {
  fr: { like: 'J’aime', unlike: 'Retirer mon j’aime' },
  en: { like: 'Like', unlike: 'Remove my like' },
} as const

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export interface LikeButtonProps {
  /** The key of the media: `mediaKey(src)` from src/lib/mediaKey.ts */
  mediaKey: string
  variant?: 'pill' | 'inline'
  className?: string
}

export default function LikeButton({ mediaKey, variant = 'pill', className }: LikeButtonProps) {
  const { lang } = useLanguage()
  const { enabled, count, liked, ready, toggle } = useLike(mediaKey)

  const heartRef = useRef<HTMLSpanElement>(null)
  const burstRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const clipRef = useRef<HTMLSpanElement>(null)
  const previous = useRef({ count, ready })
  const lastText = useRef('')

  const format = useMemo(() => new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 }), [lang])
  if (count > 0) lastText.current = format.format(count)
  // At zero the number leaves while its room closes: it keeps its last text until then
  const text = lastText.current

  const visible = enabled === true && ready

  /* A visual under 200px (a watch screen, a thumbnail) has no room for the pill */
  const slotRef = useRef<HTMLSpanElement>(null)
  const [tooSmall, setTooSmall] = useState(false)
  useEffect(() => {
    const parent = slotRef.current?.parentElement
    if (variant !== 'pill' || !parent || typeof ResizeObserver === 'undefined') return
    const measure = () => setTooSmall(parent.clientWidth < 200 || parent.clientHeight < 120)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [variant, visible])

  /* The number rolls when it changes (not when it first arrives) */
  useLayoutEffect(() => {
    const before = previous.current
    previous.current = { count, ready }
    const node = textRef.current
    const clip = clipRef.current
    if (!node || !clip || !before.ready || !ready || before.count === count || count === 0) return

    if (reducedMotion()) {
      node.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' })
      return
    }
    const direction = count > before.count ? 1 : -1
    // From 0 the number only arrives (the room opens); otherwise the old one leaves as the new one comes
    if (before.count > 0) {
      const ghost = node.cloneNode(true) as HTMLElement
      ghost.textContent = format.format(before.count)
      ghost.setAttribute('aria-hidden', 'true')
      Object.assign(ghost.style, { position: 'absolute', left: '0', top: '50%', marginTop: '-0.5em', opacity: '1' })
      clip.appendChild(ghost)
      const out = ghost.animate(
        [
          { transform: 'translateY(0)', opacity: 1, filter: 'blur(0px)' },
          { transform: `translateY(${-direction * 7}px)`, opacity: 0, filter: 'blur(2px)' },
        ],
        { duration: 200, easing: EASE, fill: 'forwards' },
      )
      out.onfinish = () => ghost.remove()
      out.oncancel = () => ghost.remove()
    }
    node.animate(
      [
        { transform: `translateY(${direction * 7}px)`, opacity: 0, filter: 'blur(2px)' },
        { transform: 'translateY(0)', opacity: 1, filter: 'blur(0px)' },
      ],
      { duration: 260, easing: EASE },
    )
  }, [count, ready, format])

  /* Dots of a new like */
  useEffect(() => () => burstRef.current?.replaceChildren(), [])

  if (!visible) return null

  const copy = COPY[lang === 'fr' ? 'fr' : 'en']
  const label = `${liked ? copy.unlike : copy.like}${count > 0 ? ` (${format.format(count)})` : ''}`

  const celebrate = () => {
    if (reducedMotion()) return
    heartRef.current?.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.28)', offset: 0.4 }, { transform: 'scale(1)' }],
      { duration: 300, easing: EASE },
    )
    const burst = burstRef.current
    if (!burst) return
    const dots = 6
    for (let i = 0; i < dots; i++) {
      const angle = (Math.PI * 2 * i) / dots - Math.PI / 2 + 0.3
      const reach = 11 + (i % 2) * 3
      const dot = document.createElement('span')
      dot.className = 'vs-like__dot'
      burst.appendChild(dot)
      const move = dot.animate(
        [
          { transform: 'translate(0, 0) scale(0.6)', opacity: 0.9 },
          { transform: `translate(${Math.cos(angle) * reach}px, ${Math.sin(angle) * reach}px) scale(1)`, opacity: 0.9, offset: 0.55 },
          { transform: `translate(${Math.cos(angle) * (reach + 3)}px, ${Math.sin(angle) * (reach + 3)}px) scale(0.5)`, opacity: 0 },
        ],
        { duration: 350, easing: EASE },
      )
      move.onfinish = () => dot.remove()
      move.oncancel = () => dot.remove()
    }
  }

  const onClick = (event: React.MouseEvent) => {
    // The visual around opens its lightbox on click: this one is only a like
    event.stopPropagation()
    if (!liked) celebrate()
    toggle()
  }

  const stop = (event: React.SyntheticEvent) => event.stopPropagation()

  const button = (
    <button
      type="button"
      className={variant === 'inline' ? `vs-like vs-like--inline${className ? ` ${className}` : ''}` : 'vs-like'}
      aria-pressed={liked}
      aria-label={label}
      data-has-count={count > 0 ? '' : undefined}
      onClick={onClick}
      onKeyDown={stop}
      onPointerDown={stop}
      onMouseDown={stop}
    >
      <span ref={heartRef} className="vs-like__heart" aria-hidden="true">
        <Heart size={16} weight="regular" />
        <Heart size={16} weight="fill" className="vs-like__fill" />
        <span ref={burstRef} className="vs-like__burst" />
      </span>
      <span className="vs-like__count" aria-hidden="true">
        <span ref={clipRef} className="vs-like__count-clip">
          <span ref={textRef} className="vs-like__count-text">
            {text}
          </span>
        </span>
      </span>
    </button>
  )

  if (variant === 'inline') return button

  return (
    <span ref={slotRef} className={`vs-like-slot${className ? ` ${className}` : ''}`} data-autohide="" hidden={tooSmall} onClick={stop}>
      {button}
    </span>
  )
}
