'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Handshake,
  Code,
  Lightbulb,
  CaretDown,
  Image as ImageIcon,
} from '@phosphor-icons/react'
import AuthorContactCard from '@/components/AuthorContactCard'
import {
  type Language,
  HERO,
  PROCESS_PHASES,
  PROCESS_SECTION,
  LESSONS,
  COLLABORATION,
  DELIVERABLES_SECTION,
  DELIVERABLES,
  CTA_SECTION,
  SECTION_IMAGES,
} from '@/data/approcheData'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ApprochePageProps {
  lang: Language
  onBack: () => void
  onContact: () => void
  relatedProjects: { id: string; title: string; summary: string; cover?: string }[]
  relatedArticles: { id: string; title: string; summary: string }[]
}

// ---------------------------------------------------------------------------
// Easing + animation
// ---------------------------------------------------------------------------

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const fadeUpBlur = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const staggerInView = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

// ---------------------------------------------------------------------------
// Reading progress bar
// ---------------------------------------------------------------------------

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) setProgress(Math.min(scrollTop / docHeight, 1))
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (progress < 0.02) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        className="h-full bg-[#2D5CF3] origin-left"
        style={{
          transform: `scaleX(${progress})`,
          transition: 'transform 80ms linear',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Scroll-triggered reveal
// ---------------------------------------------------------------------------

function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Collapsible image (progressive disclosure for artifacts)
// ---------------------------------------------------------------------------

function CollapsibleImage({
  src,
  alt,
  label,
  className = '',
}: {
  src: string
  alt: string
  label: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <div className="mt-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700
          transition-colors duration-150 ease-out active:scale-[0.98]"
      >
        <ImageIcon size={16} weight="bold" />
        <span>{label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
        >
          <CaretDown size={12} weight="bold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className={`mt-4 rounded-2xl border border-gray-100 p-5 sm:p-8 ${className || 'bg-gray-50'}`}>
              <img src={src} alt={alt} className="w-full h-auto rounded-xl" loading="lazy" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Accordion item
// ---------------------------------------------------------------------------

function AccordionItem({
  isOpen,
  onToggle,
  title,
  icon,
  children,
}: {
  isOpen: boolean
  onToggle: () => void
  title: React.ReactNode
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  const prefersReduced = useReducedMotion()

  return (
    <div
      className={`border border-gray-100 rounded-xl bg-white overflow-hidden transition-[border-color,box-shadow] duration-200 ease-out ${
        isOpen ? 'shadow-sm' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left group
          transition-colors duration-150 ease-out hover:bg-gray-50/50 active:scale-[0.995]"
        aria-expanded={isOpen}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 text-[15px] font-semibold text-gray-900 leading-snug">
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
          className="shrink-0 text-gray-400"
        >
          <CaretDown size={16} weight="bold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Deliverable card illustrations (minimalist SVG, 1.5px stroke, gray + blue accent)
// ---------------------------------------------------------------------------

const DELIVERABLE_ILLUSTRATIONS: React.ReactNode[] = [
  // 01 Framing workshop — board with post-its
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="20" y="10" width="160" height="100" rx="8" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="36" y="26" width="32" height="24" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="84" y="26" width="32" height="24" rx="4" stroke="#2D5CF3" strokeWidth="1.5" fill="#2D5CF3" fillOpacity="0.06" />
    <rect x="132" y="26" width="32" height="24" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="36" y="64" width="32" height="24" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="84" y="64" width="32" height="24" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="52" y1="50" x2="100" y2="64" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="100" y1="50" x2="100" y2="64" stroke="#2D5CF3" strokeWidth="1" strokeDasharray="3 3" />
  </svg>,

  // 02 Exploration — wireframes fanned out
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="50" y="18" width="80" height="56" rx="6" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-6 50 18)" />
    <rect x="55" y="22" width="80" height="56" rx="6" stroke="#D1D5DB" strokeWidth="1.5" fill="white" />
    <rect x="60" y="26" width="80" height="56" rx="6" stroke="#2D5CF3" strokeWidth="1.5" fill="white" />
    <line x1="68" y1="38" x2="108" y2="38" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="46" x2="128" y2="46" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="54" x2="96" y2="54" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <rect x="68" y="62" width="24" height="10" rx="5" stroke="#2D5CF3" strokeWidth="1.5" />
    <circle cx="158" cy="100" r="3" fill="#D1D5DB" />
    <circle cx="168" cy="100" r="3" fill="#D1D5DB" />
    <circle cx="178" cy="100" r="3" fill="#2D5CF3" />
  </svg>,

  // 03 Design — prototype flow (3 screens + arrows)
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="12" y="24" width="44" height="72" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="20" y1="40" x2="48" y2="40" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="48" x2="40" y2="48" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <rect x="20" y="56" width="32" height="16" rx="3" fill="#F3F4F6" />
    <path d="M64 60 L76 60" stroke="#2D5CF3" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
    <rect x="78" y="24" width="44" height="72" rx="6" stroke="#2D5CF3" strokeWidth="1.5" />
    <line x1="86" y1="40" x2="114" y2="40" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
    <line x1="86" y1="48" x2="106" y2="48" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
    <rect x="86" y="56" width="32" height="16" rx="3" fill="#2D5CF3" fillOpacity="0.08" stroke="#2D5CF3" strokeWidth="1" />
    <path d="M130 60 L142 60" stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
    <rect x="144" y="24" width="44" height="72" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="152" y1="40" x2="180" y2="40" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="152" y1="48" x2="172" y2="48" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <rect x="152" y="56" width="32" height="16" rx="3" fill="#F3F4F6" />
    <defs>
      <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6" fill="none" stroke="#2D5CF3" strokeWidth="1.5" />
      </marker>
      <marker id="arrowGray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
      </marker>
    </defs>
  </svg>,

  // 04 Validation — report with checkmarks
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="48" y="12" width="104" height="96" rx="8" stroke="#D1D5DB" strokeWidth="1.5" />
    <circle cx="68" cy="36" r="5" stroke="#16A34A" strokeWidth="1.5" />
    <path d="M65 36 L67 38.5 L71 33.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="82" y1="36" x2="132" y2="36" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <circle cx="68" cy="56" r="5" stroke="#16A34A" strokeWidth="1.5" />
    <path d="M65 56 L67 58.5 L71 53.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="82" y1="56" x2="120" y2="56" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <circle cx="68" cy="76" r="5" stroke="#2D5CF3" strokeWidth="1.5" />
    <path d="M65 76 L67 78.5 L71 73.5" stroke="#2D5CF3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="82" y1="76" x2="140" y2="76" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <circle cx="68" cy="92" r="5" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="82" y1="92" x2="110" y2="92" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
  </svg>,

  // 05 Handoff — annotated screen
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="30" y="14" width="100" height="92" rx="8" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="40" y1="30" x2="80" y2="30" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <rect x="40" y="40" width="80" height="32" rx="4" fill="#F3F4F6" />
    <line x1="40" y1="82" x2="100" y2="82" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="90" x2="74" y2="90" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    {/* Annotation pins */}
    <circle cx="120" cy="36" r="8" fill="#2D5CF3" fillOpacity="0.1" stroke="#2D5CF3" strokeWidth="1.5" />
    <circle cx="120" cy="36" r="2" fill="#2D5CF3" />
    <line x1="128" y1="36" x2="170" y2="36" stroke="#2D5CF3" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="146" y1="32" x2="170" y2="32" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="146" y1="40" x2="164" y2="40" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="120" cy="70" r="8" fill="#EA580C" fillOpacity="0.1" stroke="#EA580C" strokeWidth="1.5" />
    <circle cx="120" cy="70" r="2" fill="#EA580C" />
    <line x1="128" y1="70" x2="170" y2="70" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="146" y1="66" x2="168" y2="66" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="146" y1="74" x2="160" y2="74" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,

  // 06 Deployment — screen with progress bar and status
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect x="30" y="14" width="140" height="92" rx="8" stroke="#D1D5DB" strokeWidth="1.5" />
    <line x1="30" y1="32" x2="170" y2="32" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="44" cy="23" r="3" fill="#F87171" />
    <circle cx="54" cy="23" r="3" fill="#FBBF24" />
    <circle cx="64" cy="23" r="3" fill="#34D399" />
    <line x1="46" y1="48" x2="100" y2="48" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="56" x2="80" y2="56" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    {/* Progress bar */}
    <rect x="46" y="70" width="108" height="6" rx="3" fill="#F3F4F6" />
    <rect x="46" y="70" width="84" height="6" rx="3" fill="#2D5CF3" />
    {/* Status badge */}
    <rect x="46" y="86" width="48" height="12" rx="6" fill="#16A34A" fillOpacity="0.1" stroke="#16A34A" strokeWidth="1" />
    <circle cx="56" cy="92" r="2" fill="#16A34A" />
    <line x1="62" y1="92" x2="86" y2="92" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
]

// ---------------------------------------------------------------------------
// Deliverables carousel (snap-scroll, glass cards, arrow nav)
// ---------------------------------------------------------------------------

function DeliverablesCarousel({
  lang,
  deliverablesT,
}: {
  lang: Language
  deliverablesT: typeof DELIVERABLES_SECTION['en']
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    // Determine active card based on scroll position
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300
    setActiveIndex(Math.round(el.scrollLeft / cardWidth))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300
    el.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-32" id="deliverables">
      <RevealSection>
        {/* Header with arrows */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-1">
              {deliverablesT.title}
            </h2>
            <p className="text-sm text-gray-500">
              {deliverablesT.subtitle}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full bg-white border border-gray-100 text-gray-500
                hover:border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-default
                transition-all duration-150 ease-out active:scale-[0.92]"
              aria-label="Previous"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full bg-white border border-gray-100 text-gray-500
                hover:border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-default
                transition-all duration-150 ease-out active:scale-[0.92]"
              aria-label="Next"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </RevealSection>

      {/* Scrollable track */}
      <div className="-mx-6 px-6">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
            scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden"
        >
          {DELIVERABLES.map((item, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[280px] sm:w-[320px]"
            >
              <div
                className="h-full rounded-2xl p-6 border border-white/60 bg-white/70 backdrop-blur-xl
                  shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]
                  transition-[box-shadow,transform] duration-300 ease-out
                  hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.05)]
                  hover:scale-[1.01] flex flex-col"
              >
                {/* Illustration */}
                <div className="mb-4 px-2">
                  {DELIVERABLE_ILLUSTRATIONS[i]}
                </div>
                <span className="text-xs font-semibold text-gray-300 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-3">
                  {item.activity[lang]}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  {item.output[lang]}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.format[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators (mobile) */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-3">
        {DELIVERABLES.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ease-out ${
              activeIndex === i ? 'bg-gray-900 w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Collaboration icons
// ---------------------------------------------------------------------------

const COLLAB_ICONS: Record<string, React.ReactNode> = {
  pm: <Handshake size={18} weight="bold" className="text-[#2D5CF3]" />,
  devs: <Code size={18} weight="bold" className="text-[#16A34A]" />,
  culture: <Lightbulb size={18} weight="bold" className="text-[#EA580C]" />,
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ApprochePage({
  lang,
  onBack,
  onContact,
  relatedProjects,
  relatedArticles,
}: ApprochePageProps) {
  const hero = HERO[lang]
  const processT = PROCESS_SECTION[lang]
  const lessons = LESSONS[lang]
  const collab = COLLABORATION[lang]
  const deliverablesT = DELIVERABLES_SECTION[lang]
  const ctaT = CTA_SECTION[lang]
  const prefersReduced = useReducedMotion()

  const [activePhase, setActivePhase] = useState(0)
  const [openLesson, setOpenLesson] = useState(0)
  const [openCollab, setOpenCollab] = useState(0)

  return (
    <>
      <ReadingProgressBar />

      <div className="min-h-screen bg-[#F9F9F9]">
        <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">

          {/* ============================================================= */}
          {/* HERO                                                          */}
          {/* ============================================================= */}
          <motion.div
            className="mb-20"
            initial="hidden"
            animate="visible"
            variants={staggerParent}
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]"
            >
              {hero.title}
            </motion.h1>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="mt-6 max-w-[720px] space-y-4"
            >
              {hero.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-base sm:text-lg leading-relaxed ${
                    i === 0 ? 'text-gray-600' : 'text-gray-500'
                  }`}
                >
                  {p}
                </p>
              ))}
            </motion.div>
          </motion.div>

          {/* ============================================================= */}
          {/* PROCESS                                                       */}
          {/* ============================================================= */}
          <section className="mb-32" id="process">
            <RevealSection className="mb-8">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-2">
                {processT.title}
              </h2>
              <p className="text-base text-gray-500">
                {processT.subtitle}
              </p>
            </RevealSection>

            <RevealSection>
              <div className="flex flex-wrap gap-2 mb-6">
                {PROCESS_PHASES.map((phase, i) => (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(i)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out active:scale-[0.96]
                      ${activePhase === i
                        ? 'text-white shadow-sm'
                        : 'text-gray-600 bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    style={activePhase === i ? { backgroundColor: phase.color } : undefined}
                  >
                    {phase.title[lang]}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {PROCESS_PHASES[activePhase].title[lang]}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mb-4">
                    {PROCESS_PHASES[activePhase].description[lang]}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-[680px]">
                    {PROCESS_PHASES[activePhase].detail[lang]}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-4 border-t border-gray-50">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Output</p>
                      <p className="text-sm text-gray-500">{PROCESS_PHASES[activePhase].output[lang]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                        {lang === 'fr' ? 'Exemple' : 'Example'}
                      </p>
                      <p className="text-sm text-gray-500 italic">{PROCESS_PHASES[activePhase].example[lang]}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </RevealSection>

            <CollapsibleImage
              src={SECTION_IMAGES.process}
              alt={lang === 'fr' ? 'Diagramme Double Diamant' : 'Double Diamond diagram'}
              label={lang === 'fr' ? 'Voir le diagramme de processus' : 'View process diagram'}
              className="bg-white"
            />
          </section>

          {/* ============================================================= */}
          {/* PRINCIPLES                                                    */}
          {/* ============================================================= */}
          <section className="mb-32" id="lessons">
            <RevealSection>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-2">
                {lessons.title}
              </h2>
              <p className="text-base text-gray-500 mb-6">
                {lessons.intro}
              </p>
            </RevealSection>

            <RevealSection className="space-y-3 max-w-[800px]">
              {lessons.blocks.map((block, i) => (
                <AccordionItem
                  key={i}
                  isOpen={openLesson === i}
                  onToggle={() => setOpenLesson(openLesson === i ? -1 : i)}
                  title={block.heading}
                >
                  <p className="text-base text-gray-600 leading-relaxed">
                    {block.body}
                  </p>
                </AccordionItem>
              ))}
            </RevealSection>

            <CollapsibleImage
              src={SECTION_IMAGES.lessons}
              alt={lang === 'fr' ? 'Persona et parcours utilisateur' : 'Persona and user journey'}
              label={lang === 'fr' ? 'Voir un exemple de persona et journey map' : 'View persona and journey map example'}
              className="bg-white"
            />
          </section>

          {/* ============================================================= */}
          {/* COLLABORATION                                                 */}
          {/* ============================================================= */}
          <section className="mb-32" id="collaboration">
            <RevealSection>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-8">
                {collab.title}
              </h2>
            </RevealSection>

            <RevealSection className="space-y-3 max-w-[800px]">
              {collab.blocks.map((block, i) => (
                <AccordionItem
                  key={block.id}
                  isOpen={openCollab === i}
                  onToggle={() => setOpenCollab(openCollab === i ? -1 : i)}
                  title={block.label}
                  icon={COLLAB_ICONS[block.id]}
                >
                  <p className="text-base text-gray-600 leading-relaxed">
                    {block.body}
                  </p>
                </AccordionItem>
              ))}
            </RevealSection>

            <CollapsibleImage
              src={SECTION_IMAGES.collaboration}
              alt={lang === 'fr' ? 'Atelier Design Teardown' : 'Design Teardown workshop'}
              label={lang === 'fr' ? 'Voir un exemple d\'atelier Design Teardown' : 'View Design Teardown workshop example'}
              className="bg-white"
            />
          </section>

          {/* ============================================================= */}
          {/* DELIVERABLES CAROUSEL                                         */}
          {/* ============================================================= */}
          <DeliverablesCarousel lang={lang} deliverablesT={deliverablesT} />

          {/* ============================================================= */}
          {/* CTA                                                           */}
          {/* ============================================================= */}
          <RevealSection>
            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-8">
                {ctaT.title}
              </h2>

              {relatedProjects.length > 0 && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                  variants={staggerInView}
                  initial={prefersReduced ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {relatedProjects.map((project) => (
                    <motion.div key={project.id} variants={fadeUpBlur} transition={{ duration: 0.4, ease: EASE_OUT }}>
                      <Link
                        href={`/${lang}/project/${project.id}/full`}
                        className="group block bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-5
                          transition-[border-color,box-shadow,transform] duration-300 ease-out
                          hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"
                      >
                        {project.cover && (
                          <div className="rounded-lg overflow-hidden mb-4 bg-gray-50 aspect-[16/10]">
                            <img
                              src={project.cover}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                            />
                          </div>
                        )}
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {project.summary}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#2D5CF3] transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                          {lang === 'fr' ? 'Voir le projet' : 'View project'}
                          <ArrowRight size={12} weight="bold" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {relatedArticles.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    {ctaT.articles_title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/${lang}/signal/${article.id}`}
                        className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 p-5
                          transition-[border-color,box-shadow,transform] duration-300 ease-out
                          hover:shadow-md active:scale-[0.98]"
                      >
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#2D5CF3] transition-colors duration-200">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {article.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <AuthorContactCard lang={lang} message={ctaT.contact_message} />
            </section>
          </RevealSection>

        </div>
      </div>
    </>
  )
}
