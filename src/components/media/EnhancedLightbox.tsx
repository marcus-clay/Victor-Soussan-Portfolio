'use client'

/**
 * EnhancedLightbox: one viewer for desktop and touch.
 *
 * - Opens with the media fitted to 90% of the screen (width and height).
 * - Click zooms in on the clicked point, click again returns to the fitted view. On touch the
 *   same toggle is a double tap. Zoomed, the media pans: drag with inertia, wheel, trackpad.
 * - Images sit on one horizontal track. Arrows, keys, dots and swipes move the track with a
 *   critically damped spring that starts from where the track is and inherits the finger's
 *   velocity (Apple, "Designing Fluid Interfaces"): interruptible at any instant, rubber
 *   banding at both ends, a flick lands on the page its momentum projects to.
 * - Dragging down (fitted view) dismisses, the backdrop fading with the drag.
 * - Reduced motion: no travel, the page changes with a short fade.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion'
import { useScrollLock } from '@/hooks/useScrollLock'
import { imgDims } from '@/utils/imageDimensions'
import {
  X,
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  MagnifyingGlassPlus as ZoomIn,
  MagnifyingGlassMinus as ZoomOut,
} from '@phosphor-icons/react'

export interface LightboxImage {
  src: string
  caption?: string
  type?: 'image' | 'video'
}

interface EnhancedLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: LightboxImage[]
  currentIndex: number
  onIndexChange: (index: number) => void
  lang?: 'en' | 'fr'
  videoStartTime?: number
  /** Project ID for URL generation (e.g., 'toolkit', 'dailymotion') */
  projectId?: string
  /** Whether to update browser URL when navigating images */
  updateUrl?: boolean
}

// Critically damped (damping ratio 1): no overshoot, settles in about 0.4s
const SLIDE_SPRING = { type: 'spring' as const, stiffness: 260, damping: 32, mass: 1 }
const ZOOM_SPRING = { type: 'spring' as const, stiffness: 300, damping: 34, mass: 1 }

const FIT = 0.9 // fitted media fills 90% of the screen
const ZOOM_WIDTH = 0.95 // zoomed media is 95% of the screen width, as before
const MIN_ZOOM = 1.6 // a click on an already wide image must still zoom visibly
const TOUCH_ZOOM = 2.2
const DRAG_THRESHOLD = 8

/** Where a flick comes to rest (Apple's exponential deceleration, rate 0.998) */
const project = (velocity: number, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate)

/** Progressive resistance past an edge */
const rubberband = (over: number, dimension: number, c = 0.55) =>
  (over * dimension * c) / (dimension + c * Math.abs(over))

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

interface Gesture {
  id: number
  startX: number
  startY: number
  mode: 'idle' | 'pan' | 'swipe' | 'dismiss'
  onMedia: boolean
  touch: boolean
  samples: { t: number; x: number; y: number }[]
  startPanX: number
  startPanY: number
  startTrack: number
  startIndex: number
}

/**
 * The viewer moves media across the whole screen, which is the large travel the site's own
 * motion policy leaves out, so it reads the system preference directly: visitors who ask for
 * reduced motion get a fade between images and no rubber banding.
 */
function usePrefersReducedMotion() {
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

const EnhancedLightbox: React.FC<EnhancedLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  lang = 'fr',
  videoStartTime = 0,
  projectId,
  updateUrl = false,
}) => {
  const prefersReduced = usePrefersReducedMotion()
  const [viewport, setViewport] = useState({ w: 1280, h: 800 })
  const [zoomed, setZoomed] = useState(false)
  const [natural, setNatural] = useState<Record<string, [number, number]>>({})

  const trackX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const zoom = useMotionValue(1)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const backdrop = useTransform(dragY, [-260, 0, 260], [0.35, 1, 0.35])

  const dialogRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const gesture = useRef<Gesture | null>(null)
  const lastTap = useRef(0)
  const openedFrom = useRef<HTMLElement | null>(null)
  const savedUrl = useRef('')
  const settledOnce = useRef(false)

  const count = images.length
  const index = clamp(currentIndex, 0, Math.max(0, count - 1))
  const current = images[index]

  const t = {
    close: lang === 'fr' ? 'Fermer' : 'Close',
    zoomIn: lang === 'fr' ? 'Agrandir' : 'Zoom in',
    zoomOut: lang === 'fr' ? 'Réduire' : 'Zoom out',
    previous: lang === 'fr' ? 'Image précédente' : 'Previous image',
    next: lang === 'fr' ? 'Image suivante' : 'Next image',
    dialog: lang === 'fr' ? 'Visionneuse d’images' : 'Image viewer',
    hintClick: lang === 'fr' ? 'Cliquez pour agrandir' : 'Click to zoom',
    hintTap: lang === 'fr' ? 'Double-tap pour agrandir' : 'Double-tap to zoom',
    hintBack: lang === 'fr' ? 'Cliquez pour revenir' : 'Click to return',
    goTo: (n: number) => (lang === 'fr' ? `Aller à l’image ${n}` : `Go to image ${n}`),
  }

  // Lock page scroll while open: the page stays exactly where the tapped media was
  useScrollLock(isOpen)

  // Viewport size
  useEffect(() => {
    const measure = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Geometry of the fitted media, from its known aspect ratio
  const aspectOf = useCallback(
    (img: LightboxImage) => {
      const known = imgDims(img.src)
      const dims = known.width && known.height ? ([known.width, known.height] as [number, number]) : natural[img.src]
      if (dims) return dims[0] / dims[1]
      return img.type === 'video' ? 16 / 9 : 4 / 3
    },
    [natural]
  )

  const fitSize = useCallback(
    (img: LightboxImage) => {
      const ar = aspectOf(img)
      let w = viewport.w * FIT
      let h = w / ar
      if (h > viewport.h * FIT) {
        h = viewport.h * FIT
        w = h * ar
      }
      return { w, h }
    },
    [aspectOf, viewport]
  )

  const isTouchDevice = useRef(false)
  const zoomTarget = useCallback(
    (img: LightboxImage) => {
      const fit = fitSize(img)
      if (isTouchDevice.current) return TOUCH_ZOOM
      return Math.max(MIN_ZOOM, (viewport.w * ZOOM_WIDTH) / fit.w)
    },
    [fitSize, viewport.w]
  )

  const panBounds = useCallback(
    (img: LightboxImage, scale: number) => {
      const fit = fitSize(img)
      return {
        x: Math.max(0, (fit.w * scale - viewport.w) / 2 + (fit.w * scale > viewport.w ? 24 : 0)),
        y: Math.max(0, (fit.h * scale - viewport.h) / 2 + (fit.h * scale > viewport.h ? 24 : 0)),
      }
    },
    [fitSize, viewport]
  )

  // Return to the fitted view
  const resetZoom = useCallback(
    (instant = false) => {
      setZoomed(false)
      if (instant || prefersReduced) {
        zoom.set(1)
        panX.set(0)
        panY.set(0)
        return
      }
      animate(zoom, 1, ZOOM_SPRING)
      animate(panX, 0, ZOOM_SPRING)
      animate(panY, 0, ZOOM_SPRING)
    },
    [zoom, panX, panY, prefersReduced]
  )

  const toggleZoom = useCallback(
    (point?: { x: number; y: number }) => {
      if (!current || current.type === 'video') return
      if (zoomed) {
        resetZoom()
        return
      }
      const s = zoomTarget(current)
      const bounds = panBounds(current, s)
      // The clicked point stays under the cursor: pan = -(point - center) * (scale - 1)
      const px = point ? point.x - viewport.w / 2 : 0
      const py = point ? point.y - viewport.h / 2 : 0
      const tx = clamp(-px * (s - 1), -bounds.x, bounds.x)
      const ty = clamp(-py * (s - 1), -bounds.y, bounds.y)
      setZoomed(true)
      if (prefersReduced) {
        zoom.set(s)
        panX.set(tx)
        panY.set(ty)
      } else {
        animate(zoom, s, ZOOM_SPRING)
        animate(panX, tx, ZOOM_SPRING)
        animate(panY, ty, ZOOM_SPRING)
      }
    },
    [current, zoomed, resetZoom, zoomTarget, panBounds, viewport, zoom, panX, panY, prefersReduced]
  )

  // Move the track to the current page. Starts from the live value, so an interrupted
  // slide continues instead of jumping.
  useEffect(() => {
    if (!isOpen) {
      settledOnce.current = false
      return
    }
    const target = -index * viewport.w
    const dragging = gesture.current?.mode === 'swipe'
    if (!settledOnce.current || prefersReduced) {
      trackX.set(target)
      settledOnce.current = true
    } else if (!dragging) {
      animate(trackX, target, SLIDE_SPRING)
    }
    resetZoom(true)
    dragY.set(0)
  }, [isOpen, index, viewport.w]) // eslint-disable-line react-hooks/exhaustive-deps

  // Video start position
  useEffect(() => {
    if (isOpen && current?.type === 'video' && videoRef.current && videoStartTime > 0) {
      videoRef.current.currentTime = videoStartTime
    }
  }, [isOpen, index, videoStartTime, current])

  // Focus management: move focus into the dialog, give it back on close
  useEffect(() => {
    if (!isOpen) return
    openedFrom.current = document.activeElement as HTMLElement | null
    savedUrl.current = window.location.pathname + window.location.search
    dialogRef.current?.focus({ preventScroll: true })
    return () => {
      openedFrom.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen])

  // Reflect the current media in the URL hash (shareable, leaves the route untouched)
  useEffect(() => {
    if (!isOpen || !updateUrl || !projectId) return
    const mediaType = current?.type === 'video' ? 'video' : 'image'
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}#${mediaType}-${index + 1}`
    )
  }, [isOpen, index, projectId, updateUrl, current])

  const handleClose = useCallback(() => {
    if (updateUrl && savedUrl.current) {
      window.history.replaceState(window.history.state, '', savedUrl.current)
    }
    onClose()
  }, [onClose, updateUrl])

  const goTo = useCallback(
    (next: number) => {
      const target = clamp(next, 0, count - 1)
      if (target !== index) onIndexChange(target)
    },
    [count, index, onIndexChange]
  )

  // Keyboard: arrows move the track, Escape closes, Tab stays inside the dialog
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        handleClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(index + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(index - 1)
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), video[controls]')
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [isOpen, index, goTo, handleClose])

  // Wheel and trackpad pan the zoomed media (non-passive: the page must not scroll)
  useEffect(() => {
    const node = dialogRef.current
    if (!isOpen || !node) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (!zoomed || !current) return
      const bounds = panBounds(current, zoom.get())
      panX.set(clamp(panX.get() - e.deltaX, -bounds.x, bounds.x))
      panY.set(clamp(panY.get() - e.deltaY, -bounds.y, bounds.y))
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [isOpen, zoomed, current, panBounds, zoom, panX, panY])

  // ── Gestures: one pointer model for mouse, pen and touch ────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('video')) return
    isTouchDevice.current = e.pointerType === 'touch'
    e.currentTarget.setPointerCapture(e.pointerId)
    // A press stops the track where it is (interruptibility)
    trackX.stop()
    gesture.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      mode: 'idle',
      onMedia: !!target.closest('[data-media]'),
      touch: e.pointerType === 'touch',
      samples: [{ t: performance.now(), x: e.clientX, y: e.clientY }],
      startPanX: panX.get(),
      startPanY: panY.get(),
      startTrack: trackX.get(),
      startIndex: index,
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g || g.id !== e.pointerId || !current) return
    const dx = e.clientX - g.startX
    const dy = e.clientY - g.startY
    g.samples.push({ t: performance.now(), x: e.clientX, y: e.clientY })
    if (g.samples.length > 6) g.samples.shift()

    if (g.mode === 'idle' && Math.max(Math.abs(dx), Math.abs(dy)) > DRAG_THRESHOLD) {
      g.mode = zoomed ? 'pan' : Math.abs(dx) > Math.abs(dy) ? 'swipe' : 'dismiss'
    }

    if (g.mode === 'pan') {
      const b = panBounds(current, zoom.get())
      const soft = (v: number, limit: number, dim: number) =>
        Math.abs(v) <= limit ? v : Math.sign(v) * (limit + (prefersReduced ? 0 : rubberband(Math.abs(v) - limit, dim)))
      panX.set(soft(g.startPanX + dx, b.x, viewport.w))
      panY.set(soft(g.startPanY + dy, b.y, viewport.h))
    } else if (g.mode === 'swipe') {
      let next = g.startTrack + dx
      const min = -(count - 1) * viewport.w
      if (next > 0) next = prefersReduced ? 0 : rubberband(next, viewport.w)
      else if (next < min) next = prefersReduced ? min : min - rubberband(min - next, viewport.w)
      trackX.set(next)
    } else if (g.mode === 'dismiss') {
      dragY.set(dy)
    }
  }

  const velocityOf = (g: Gesture) => {
    const first = g.samples[0]
    const last = g.samples[g.samples.length - 1]
    const dt = (last.t - first.t) / 1000
    if (dt <= 0) return { x: 0, y: 0 }
    return { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt }
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    gesture.current = null
    const v = velocityOf(g)

    if (g.mode === 'idle') {
      // A press without travel: a click
      if (g.onMedia) {
        if (g.touch) {
          const now = Date.now()
          if (now - lastTap.current < 300) {
            lastTap.current = 0
            toggleZoom({ x: e.clientX, y: e.clientY })
          } else {
            lastTap.current = now
          }
        } else {
          toggleZoom({ x: e.clientX, y: e.clientY })
        }
      } else if (!zoomed) {
        handleClose()
      }
      return
    }

    if (g.mode === 'pan' && current) {
      const b = panBounds(current, zoom.get())
      animate(panX, panX.get(), {
        type: 'inertia',
        velocity: v.x,
        min: -b.x,
        max: b.x,
        bounceStiffness: 260,
        bounceDamping: 30,
        timeConstant: 325,
      })
      animate(panY, panY.get(), {
        type: 'inertia',
        velocity: v.y,
        min: -b.y,
        max: b.y,
        bounceStiffness: 260,
        bounceDamping: 30,
        timeConstant: 325,
      })
    } else if (g.mode === 'swipe') {
      // Land on the page the gesture is heading to, one page at most
      const projected = trackX.get() + project(v.x)
      const wanted = Math.round(-projected / viewport.w)
      const target = clamp(wanted, g.startIndex - 1, g.startIndex + 1)
      const final = clamp(target, 0, count - 1)
      if (final !== g.startIndex) onIndexChange(final)
      if (prefersReduced) trackX.set(-final * viewport.w)
      else animate(trackX, -final * viewport.w, { ...SLIDE_SPRING, velocity: v.x })
    } else if (g.mode === 'dismiss') {
      if (dragY.get() > 110 || v.y > 600) {
        handleClose()
      } else {
        animate(dragY, 0, SLIDE_SPRING)
      }
    }
  }

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    gesture.current = null
    animate(trackX, -index * viewport.w, SLIDE_SPRING)
    animate(dragY, 0, SLIDE_SPRING)
  }

  // Slides worth rendering: the current one and its neighbours
  const visible = useMemo(() => {
    const set = new Set<number>()
    for (let i = index - 1; i <= index + 1; i++) if (i >= 0 && i < count) set.add(i)
    return [...set]
  }, [index, count])

  const hint = zoomed ? t.hintBack : isTouchDevice.current ? t.hintTap : t.hintClick
  const canZoom = current?.type !== 'video'

  if (!current) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.dialog}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[200] outline-none"
        >
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: backdrop }} aria-hidden="true" />

          {/* Viewer: the track of slides and all gestures */}
          <motion.div
            className="absolute inset-0 overflow-hidden select-none"
            style={{ y: dragY, touchAction: 'none', cursor: zoomed ? 'zoom-out' : 'default' }}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ scale: 0.92, transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] } }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <motion.div className="absolute inset-0" style={{ x: trackX }}>
              {visible.map((i) => {
                const img = images[i]
                const isCurrent = i === index
                const fit = fitSize(img)
                return (
                  <div
                    key={`${img.src}-${i}-${prefersReduced && isCurrent ? 'current' : 'idle'}`}
                    className={`absolute top-0 h-full flex items-center justify-center ${prefersReduced && isCurrent ? 'page-in' : ''}`}
                    style={{ left: i * viewport.w, width: viewport.w }}
                    aria-hidden={!isCurrent}
                  >
                    <motion.div
                      data-media
                      className="relative"
                      style={{
                        width: fit.w,
                        height: fit.h,
                        ...(isCurrent ? { scale: zoom, x: panX, y: panY } : {}),
                        cursor: img.type === 'video' ? 'default' : zoomed && isCurrent ? 'zoom-out' : 'zoom-in',
                      }}
                    >
                      {img.type === 'video' ? (
                        isCurrent ? (
                          <video
                            ref={videoRef}
                            src={img.src}
                            className="w-full h-full object-contain rounded-2xl shadow-2xl"
                            controls
                            playsInline
                            autoPlay
                            onLoadedMetadata={(e) => {
                              const { videoWidth, videoHeight } = e.currentTarget
                              setNatural((n) => ({ ...n, [img.src]: [videoWidth, videoHeight] }))
                            }}
                          />
                        ) : (
                          <div className="w-full h-full rounded-2xl bg-white/5" />
                        )
                      ) : (
                        <img
                          src={img.src}
                          alt={isCurrent ? img.caption || '' : ''}
                          className="w-full h-full object-contain rounded-2xl shadow-2xl select-none"
                          draggable={false}
                          onLoad={(e) => {
                            const { naturalWidth, naturalHeight } = e.currentTarget
                            setNatural((n) => ({ ...n, [img.src]: [naturalWidth, naturalHeight] }))
                          }}
                        />
                      )}
                    </motion.div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Controls sit above the viewer, outside its gesture area */}
          <button
            type="button"
            onClick={handleClose}
            aria-label={t.close}
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-black/45 backdrop-blur-xl text-white hover:bg-black/60 active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            <X size={22} />
          </button>

          {canZoom && (
            <button
              type="button"
              onClick={() => toggleZoom()}
              aria-label={zoomed ? t.zoomOut : t.zoomIn}
              aria-pressed={zoomed}
              className="absolute top-4 left-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-black/45 backdrop-blur-xl text-white hover:bg-black/60 active:scale-[0.97] transition-[background-color,transform] duration-150"
            >
              {zoomed ? <ZoomOut size={22} /> : <ZoomIn size={22} />}
            </button>
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label={t.previous}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-black/45 backdrop-blur-xl text-white hover:bg-black/60 active:scale-[0.97] disabled:opacity-0 disabled:pointer-events-none transition-[background-color,transform,opacity] duration-150"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === count - 1}
                aria-label={t.next}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-black/45 backdrop-blur-xl text-white hover:bg-black/60 active:scale-[0.97] disabled:opacity-0 disabled:pointer-events-none transition-[background-color,transform,opacity] duration-150"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* Caption plate: a translucent material over the media's lower edge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[min(92vw,640px)] pointer-events-none">
            <div className="mx-auto w-fit max-w-full rounded-2xl bg-black/50 backdrop-blur-xl px-4 py-2.5 text-center">
              {current.caption && (
                <p className="text-white text-sm font-medium leading-snug line-clamp-2">{current.caption}</p>
              )}
              <p className="text-white/60 text-xs tabular-nums mt-0.5">
                {index + 1} / {count}
                {canZoom && <span className="ml-2">{`· ${hint}`}</span>}
              </p>
              {count > 1 && count <= 20 && (
                <div className="mt-2 flex items-center justify-center gap-1 pointer-events-auto">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={t.goTo(i + 1)}
                      aria-current={i === index}
                      className="relative flex items-center justify-center w-5 h-5"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-[width,background-color] duration-200 ${
                          i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/35'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EnhancedLightbox
