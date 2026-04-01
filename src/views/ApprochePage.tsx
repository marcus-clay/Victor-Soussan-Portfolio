'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CaretDown } from '@phosphor-icons/react'
import AuthorContactCard from '@/components/AuthorContactCard'
import {
  type Language,
  type Deliverable,
  HERO,
  PROCESS_PHASES,
  PROCESS_SECTION,
  LESSONS,
  COLLABORATION,
  DELIVERABLES_SECTION,
  DELIVERABLES,
  CTA_SECTION,
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
// Easing
// ---------------------------------------------------------------------------

const EASE_OUT = [0.23, 1, 0.32, 1] as const

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
        className="h-full bg-gray-900 origin-left"
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
      initial={prefersReduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Shared accordion item — used in all four sections
// ---------------------------------------------------------------------------

function AccordionItem({
  isOpen,
  onToggle,
  trigger,
  children,
  id,
}: {
  isOpen: boolean
  onToggle: () => void
  trigger: React.ReactNode
  children: React.ReactNode
  id?: string
}) {
  const prefersReduced = useReducedMotion()
  const bodyId = id ? `${id}-body` : undefined

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left
          transition-colors duration-150 ease-out hover:bg-black/[.04] active:bg-black/[.06] -mx-3 px-3 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        {trigger}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2, ease: EASE_OUT }}
          className="shrink-0 text-gray-400"
        >
          <CaretDown size={14} weight="bold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={bodyId}
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.18, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Phase SVG illustrations
// ---------------------------------------------------------------------------

function IllustrationFraming() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <rect x="18" y="18" width="48" height="36" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
      <rect x="76" y="18" width="52" height="36" rx="6" stroke="#374151" strokeWidth="1.5" fill="#F3F4F6" />
      <rect x="140" y="18" width="42" height="36" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
      <rect x="46" y="70" width="48" height="32" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
      <rect x="106" y="70" width="48" height="32" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
      <path d="M66 36 L74 36" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M130 36 L138 36" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M102 54 L70 70" stroke="#374151" strokeWidth="1.5" />
      <path d="M102 54 L130 70" stroke="#D1D5DB" strokeWidth="1.5" />
      <circle cx="102" cy="54" r="3" fill="#374151" />
    </svg>
  )
}

function IllustrationExploration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <rect x="12" y="22" width="68" height="76" rx="8" stroke="#E5E7EB" strokeWidth="1.5" fill="white" />
      <rect x="30" y="16" width="68" height="76" rx="8" stroke="#D1D5DB" strokeWidth="1.5" fill="white" />
      <rect x="52" y="20" width="68" height="76" rx="8" stroke="#374151" strokeWidth="1.5" fill="white" />
      <line x1="64" y1="44" x2="108" y2="44" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="64" y1="56" x2="96" y2="56" stroke="#D1D5DB" strokeWidth="1" />
      <rect x="64" y="68" width="36" height="14" rx="4" stroke="#374151" strokeWidth="1.5" />
      <circle cx="82" cy="106" r="3" fill="#E5E7EB" />
      <circle cx="96" cy="106" r="3" fill="#E5E7EB" />
      <circle cx="110" cy="106" r="4" fill="#374151" />
    </svg>
  )
}

function IllustrationDesign() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <rect x="8" y="32" width="44" height="56" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="16" y1="48" x2="44" y2="48" stroke="#E5E7EB" strokeWidth="1" />
      <line x1="16" y1="58" x2="36" y2="58" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="76" y="22" width="52" height="68" rx="6" stroke="#374151" strokeWidth="1.5" />
      <line x1="86" y1="42" x2="118" y2="42" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="86" y1="54" x2="108" y2="54" stroke="#D1D5DB" strokeWidth="1" />
      <rect x="86" y="64" width="30" height="16" rx="4" fill="#F3F4F6" stroke="#374151" strokeWidth="1" />
      <rect x="150" y="32" width="42" height="56" rx="6" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="158" y1="48" x2="184" y2="48" stroke="#E5E7EB" strokeWidth="1" />
      <line x1="158" y1="58" x2="176" y2="58" stroke="#E5E7EB" strokeWidth="1" />
      <path d="M54 60 L73 60" stroke="#374151" strokeWidth="1.5" />
      <path d="M69 55 L74 60 L69 65" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M130 60 L147 60" stroke="#D1D5DB" strokeWidth="1.5" />
      <path d="M143 55 L148 60 L143 65" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IllustrationValidation() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <rect x="40" y="15" width="120" height="90" rx="8" stroke="#D1D5DB" strokeWidth="1.5" fill="white" />
      <circle cx="60" cy="40" r="8" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M56 40 L59 43 L64 37" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="76" y1="40" x2="148" y2="40" stroke="#D1D5DB" strokeWidth="1" />
      <circle cx="60" cy="62" r="8" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M56 62 L59 65 L64 59" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="76" y1="62" x2="136" y2="62" stroke="#D1D5DB" strokeWidth="1" />
      <circle cx="60" cy="84" r="8" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M56 84 L59 87 L64 81" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="76" y1="84" x2="148" y2="84" stroke="#D1D5DB" strokeWidth="1" />
      <circle cx="148" cy="84" r="6" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
    </svg>
  )
}

function IllustrationHandoff() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <rect x="24" y="16" width="100" height="88" rx="8" stroke="#D1D5DB" strokeWidth="1.5" fill="white" />
      <rect x="34" y="32" width="80" height="8" rx="2" fill="#F3F4F6" />
      <rect x="34" y="48" width="60" height="6" rx="2" fill="#F3F4F6" />
      <rect x="34" y="60" width="72" height="6" rx="2" fill="#F3F4F6" />
      <rect x="34" y="72" width="50" height="6" rx="2" fill="#F3F4F6" />
      <line x1="124" y1="38" x2="155" y2="38" stroke="#374151" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="124" y1="51" x2="162" y2="51" stroke="#374151" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="124" y1="63" x2="158" y2="63" stroke="#374151" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="152" y="32" width="28" height="12" rx="4" stroke="#374151" strokeWidth="1.5" fill="#F3F4F6" />
      <rect x="159" y="45" width="28" height="12" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
      <rect x="155" y="58" width="28" height="12" rx="4" stroke="#D1D5DB" strokeWidth="1.5" />
    </svg>
  )
}

function IllustrationDeployment() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto" aria-hidden="true">
      <rect x="20" y="20" width="160" height="80" rx="8" stroke="#D1D5DB" strokeWidth="1.5" fill="white" />
      <rect x="20" y="20" width="160" height="28" rx="8" stroke="#D1D5DB" strokeWidth="1.5" fill="#F9FAFB" />
      <rect x="20" y="36" width="160" height="12" fill="#F9FAFB" />
      <circle cx="36" cy="34" r="5" fill="#E5E7EB" />
      <circle cx="52" cy="34" r="5" fill="#E5E7EB" />
      <circle cx="68" cy="34" r="5" fill="#E5E7EB" />
      <rect x="32" y="58" width="136" height="6" rx="3" fill="#F3F4F6" />
      <rect x="32" y="58" width="88" height="6" rx="3" fill="#374151" />
      <rect x="32" y="72" width="60" height="8" rx="3" fill="#F3F4F6" />
      <rect x="100" y="72" width="68" height="8" rx="3" fill="#F3F4F6" />
      <circle cx="156" cy="76" r="6" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M153 76 L155.5 78.5 L159 73.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PHASE_ILLUSTRATIONS = [
  IllustrationFraming,
  IllustrationExploration,
  IllustrationDesign,
  IllustrationValidation,
  IllustrationHandoff,
  IllustrationDeployment,
]

// ---------------------------------------------------------------------------
// Deliverable carousel — horizontal scroll, multiple cards visible
// Exposes prev/next via ref so the section header can host the arrow buttons
// ---------------------------------------------------------------------------

const DeliverableCarousel = React.forwardRef<
  { prev: () => void; next: () => void },
  { items: Deliverable[]; lang: Language }
>(function DeliverableCarousel({ items, lang }, ref) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[index] as HTMLElement
    if (!card) return
    // Offset relative to container, not document — reliable across layouts
    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  const prev = () => scrollTo(Math.max(0, activeIndex - 1))
  const next = () => scrollTo(Math.min(items.length - 1, activeIndex + 1))

  // Expose controls to parent (section header arrows)
  React.useImperativeHandle(ref, () => ({ prev, next }))

  // Sync dot with scroll — use requestAnimationFrame to debounce
  const rafRef = React.useRef<number | null>(null)
  const onScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const container = scrollRef.current
      if (!container) return
      const cards = Array.from(container.children) as HTMLElement[]
      const mid = container.scrollLeft + container.clientWidth / 2
      let closest = 0
      let minDist = Infinity
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveIndex(closest)
    })
  }

  return (
    <div>
      {/* Track — bleeds past parent's px-6 */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-6 px-6
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const Illustration = PHASE_ILLUSTRATIONS[i]
          return (
            <div
              key={i}
              className="snap-start shrink-0 w-[248px] sm:w-[288px]"
            >
              <div
                className="h-full rounded-2xl border border-gray-100 bg-white p-5 flex flex-col
                  transition-[border-color,box-shadow,transform]
                  duration-[220ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]
                  [@media(hover:hover)]:hover:border-gray-200
                  [@media(hover:hover)]:hover:shadow-[0_1px_8px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.03)]
                  [@media(hover:hover)]:hover:scale-[1.005]"
              >
                {/* Illustration */}
                <div className="mb-4 rounded-xl overflow-hidden bg-[#F9FAFB] p-3">
                  <Illustration />
                </div>
                {/* Number */}
                <span className="text-[11px] tabular-nums text-gray-300 font-medium mb-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Title */}
                <h3 className="text-sm font-semibold tracking-[-0.01em] text-gray-900 mb-2 leading-snug">
                  {item.activity[lang]}
                </h3>
                {/* Output */}
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                  {item.output[lang]}
                </p>
                {/* Format */}
                <p className="text-[11px] text-gray-400 leading-relaxed mt-3 pt-3 border-t border-gray-50">
                  {item.format[lang]}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={items[i].activity[lang]}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-full"
          >
            <span
              className="block rounded-full bg-gray-900"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                opacity: i === activeIndex ? 1 : 0.15,
                transition: 'width 200ms cubic-bezier(0.23,1,0.32,1), opacity 200ms ease',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
})

// ---------------------------------------------------------------------------
// Weekly rhythm grid — from deck (Discovery + Delivery modes, Mon→Fri)
// ---------------------------------------------------------------------------

const RHYTHM = {
  en: {
    label: 'Weekly rhythm',
    modes: ['Discovery', 'Delivery'],
    // Desktop: 4 cols
    days4: ['Mon', 'Tue – Wed', 'Thu', 'Fri'],
    cells4: [
      ['Frame hypotheses. Who to talk to. Protocol.', 'User interviews. Observations. Data analysis.', 'Map insights. Emerging patterns. Reframe.', 'Restitution. Validate or pivot. Decision.'],
      ['Sync PM/Designer. Sprint goal. Review hypotheses.', 'Exploration or iteration. Async exchanges.', 'Pattern coherence. Prep refinement or demo.', 'Prototype presented. Backlog prioritised.'],
    ],
    // Mobile: 3 cols
    days3: ['Mon', 'Midweek', 'Fri'],
    cells3: [
      ['Frame & hypotheses', 'Terrain + analysis', 'Share & decide'],
      ['Sync PM/Designer', 'Exploration or craft', 'Sprint review'],
    ],
    footer: 'Monday: align. Midweek: deep work. Friday: share and decide. Rhythm is set together in the first week.',
  },
  fr: {
    label: 'Rythme hebdomadaire',
    modes: ['Discovery', 'Delivery'],
    days4: ['Lun', 'Mar – Mer', 'Jeu', 'Ven'],
    cells4: [
      ['Cadrage hypothèses. Qui on va voir. Protocole.', 'Entretiens utilisateurs. Observations. Analyse données.', 'Cartographie insights. Patterns. Reformulation.', 'Restitution. Validation ou pivot. Décision.'],
      ['Sync PM/Designer. Objectif sprint. Revue hypothèses.', 'Exploration ou itération. Échanges asynchrones.', 'Cohérence patterns. Préparation refinement ou démo.', 'Prototype présenté. Priorisation backlog.'],
    ],
    days3: ['Lun', 'Milieu', 'Ven'],
    cells3: [
      ['Cadrage & hypothèses', 'Terrain + analyse', 'Partager & décider'],
      ['Sync PM/Designer', 'Exploration ou craft', 'Sprint review'],
    ],
    footer: 'Lundi\u00a0: s\u2019aligner. Milieu de semaine\u00a0: travail de fond. Vendredi\u00a0: partager et décider. Le rythme se construit ensemble dès la première semaine.',
  },
}

function WeeklyRhythmGrid({ lang }: { lang: Language }) {
  const r = RHYTHM[lang]
  return (
    <div className="mt-10 rounded-xl border border-gray-100 overflow-hidden">
      {/* Label */}
      <div className="px-4 py-2.5 border-b border-gray-100 bg-[#FAFAFA]">
        <span className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">{r.label}</span>
      </div>

      {/* ── Mobile: 3-column simplified ─────────────────────────────── */}
      <div className="sm:hidden">
        <div className="grid grid-cols-[60px_repeat(3,1fr)] border-b border-gray-100">
          <div className="px-2 py-2" />
          {r.days3.map((day) => (
            <div key={day} className="px-2 py-2 border-l border-gray-100">
              <span className="text-[10px] text-gray-400 font-medium">{day}</span>
            </div>
          ))}
        </div>
        {r.modes.map((mode, modeIdx) => (
          <div key={mode} className={`grid grid-cols-[60px_repeat(3,1fr)] ${modeIdx === 0 ? 'border-b border-gray-100' : ''}`}>
            <div className="px-2 py-3 flex items-start">
              <span className="text-[10px] font-medium text-gray-500">{mode}</span>
            </div>
            {r.cells3[modeIdx].map((cell, dayIdx) => (
              <div key={dayIdx} className="px-2 py-3 border-l border-gray-100">
                <p className="text-[10px] text-gray-400 leading-relaxed">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Desktop: 4-column full ───────────────────────────────────── */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[80px_repeat(4,1fr)] border-b border-gray-100">
          <div className="px-3 py-2" />
          {r.days4.map((day) => (
            <div key={day} className="px-3 py-2 border-l border-gray-100">
              <span className="text-[11px] text-gray-400 font-medium">{day}</span>
            </div>
          ))}
        </div>
        {r.modes.map((mode, modeIdx) => (
          <div key={mode} className={`grid grid-cols-[80px_repeat(4,1fr)] ${modeIdx === 0 ? 'border-b border-gray-100' : ''}`}>
            <div className="px-3 py-3 flex items-start">
              <span className="text-[11px] font-medium text-gray-500">{mode}</span>
            </div>
            {r.cells4[modeIdx].map((cell, dayIdx) => (
              <div key={dayIdx} className="px-3 py-3 border-l border-gray-100">
                <p className="text-[11px] text-gray-400 leading-relaxed">{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-4 py-2.5 border-t border-gray-100 bg-[#FAFAFA]">
        <p className="text-[11px] text-gray-400 leading-relaxed">{r.footer}</p>
      </div>
    </div>
  )
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

  // Each section independently tracks which item is open (null = all closed)
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [openLesson, setOpenLesson] = useState<number | null>(0)
  const [openCollab, setOpenCollab] = useState<number | null>(0)
  const carouselRef = React.useRef<{ prev: () => void; next: () => void }>(null)

  return (
    <>
      <ReadingProgressBar />

      <div className="min-h-screen bg-[#FDFDFC]">
        <div className="max-w-[740px] mx-auto px-6 pt-32 md:pt-40 pb-20">

          {/* ============================================================= */}
          {/* HERO                                                          */}
          {/* ============================================================= */}
          <motion.div
            className="pb-20 md:pb-28"
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
              {hero.title}
            </h1>
            <div className="space-y-4 max-w-[65ch]">
              {hero.paragraphs.map((p, i) => (
                <p key={i} className="text-base text-gray-500 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* ============================================================= */}
          {/* PROCESS                                                       */}
          {/* ============================================================= */}
          <section className="py-16 md:py-24 border-t border-gray-100" id="process">
            <RevealSection className="mb-8">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
                {processT.title}
              </h2>
              <p className="text-sm text-gray-500 max-w-[55ch]">
                {processT.subtitle}
              </p>
            </RevealSection>

            <RevealSection>
              <div className="divide-y divide-gray-100">
                {PROCESS_PHASES.map((phase, i) => (
                  <AccordionItem
                    key={phase.id}
                    id={`phase-${i}`}
                    isOpen={openPhase === i}
                    onToggle={() => setOpenPhase(openPhase === i ? null : i)}
                    trigger={
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-xs tabular-nums text-gray-400 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-medium text-gray-900 leading-snug">
                          {phase.title[lang]}
                        </span>
                      </div>
                    }
                  >
                    <div className="pb-5 space-y-4">
                      <p className="text-sm text-gray-500 leading-relaxed max-w-[60ch]">
                        {phase.description[lang]}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-3 border-t border-gray-100">
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Output</p>
                          <p className="text-sm text-gray-500 leading-relaxed">{phase.output[lang]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                            {lang === 'fr' ? 'Exemple' : 'Example'}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">{phase.example[lang]}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </div>
            </RevealSection>

          </section>

          {/* ============================================================= */}
          {/* PRINCIPLES                                                    */}
          {/* ============================================================= */}
          <section className="py-16 md:py-24 border-t border-gray-100" id="lessons">
            <RevealSection>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
                {lessons.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-[55ch]">
                {lessons.intro}
              </p>
            </RevealSection>

            <RevealSection>
              <div className="divide-y divide-gray-100">
                {lessons.blocks.map((block, i) => (
                  <AccordionItem
                    key={i}
                    id={`lesson-${i}`}
                    isOpen={openLesson === i}
                    onToggle={() => setOpenLesson(openLesson === i ? null : i)}
                    trigger={
                      <span className="text-sm font-medium text-gray-900 leading-snug">
                        {block.heading}
                      </span>
                    }
                  >
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-[60ch]">
                      {block.body}
                    </p>
                    {block.link && (
                      <Link
                        href={`/${lang}${block.link.href}`}
                        className="group flex items-center gap-3 mb-5 p-3
                          rounded-xl border border-gray-100 bg-white
                          [@media(hover:hover)]:hover:border-gray-200
                          [@media(hover:hover)]:hover:shadow-[0_1px_6px_rgba(0,0,0,0.04),0_2px_12px_rgba(0,0,0,0.03)]
                          active:scale-[0.99]
                          transition-[border-color,box-shadow,transform]
                          duration-[180ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
                      >
                        {/* Thumbnail */}
                        <div className="shrink-0 w-[72px] h-[48px] rounded-lg overflow-hidden bg-gray-50">
                          <img
                            src={block.link.thumbnail}
                            alt={block.link.label}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-[300ms] cubic-bezier(0.23,1,0.32,1) group-hover:scale-[1.04]"
                          />
                        </div>
                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] text-gray-400 mb-0.5 uppercase tracking-wide font-medium">
                            {lang === 'en' ? 'Case study' : 'Étude de cas'}
                          </p>
                          <p className="text-sm font-medium text-gray-900 leading-snug mb-0.5 group-hover:text-black transition-colors duration-150">
                            {block.link.label}
                          </p>
                          <p className="text-xs text-gray-500 leading-snug line-clamp-1">
                            {block.link.description[lang]}
                          </p>
                        </div>
                        <ArrowRight
                          size={12}
                          weight="bold"
                          className="shrink-0 text-gray-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        />
                      </Link>
                    )}
                  </AccordionItem>
                ))}
              </div>
            </RevealSection>

          </section>

          {/* ============================================================= */}
          {/* COLLABORATION                                                 */}
          {/* ============================================================= */}
          <section className="py-16 md:py-24 border-t border-gray-100" id="collaboration">
            <RevealSection>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-6">
                {collab.title}
              </h2>
            </RevealSection>

            <RevealSection>
              <div className="divide-y divide-gray-100">
                {collab.blocks.map((block, i) => (
                  <AccordionItem
                    key={block.id}
                    id={`collab-${block.id}`}
                    isOpen={openCollab === i}
                    onToggle={() => setOpenCollab(openCollab === i ? null : i)}
                    trigger={
                      <span className="text-sm font-medium text-gray-900 leading-snug">
                        {block.label}
                      </span>
                    }
                  >
                    <p className="text-sm text-gray-500 leading-relaxed pb-5 max-w-[60ch]">
                      {block.body}
                    </p>
                  </AccordionItem>
                ))}
              </div>
            </RevealSection>

            <RevealSection delay={0.05}>
              <WeeklyRhythmGrid lang={lang} />
            </RevealSection>

            <RevealSection delay={0.08} className="mt-8">
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <img
                  src="/images/approche/design-teardown.png"
                  alt={lang === 'fr' ? 'Atelier Design Teardown — exemple réel' : 'Design Teardown workshop — real example'}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                {lang === 'fr'
                  ? 'Design Teardown\u00a0: en 3h, générer et valider des solutions concrètes sur une feature identifiée.'
                  : 'Design Teardown: in 3h, generate and validate concrete solutions on a specific feature.'}
              </p>
            </RevealSection>
          </section>

          {/* ============================================================= */}
          {/* DELIVERABLES                                                  */}
          {/* ============================================================= */}
          <section className="py-16 md:py-24 border-t border-gray-100" id="deliverables">
            <RevealSection className="mb-8">
              {/* Header row: title/subtitle left, arrows right */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
                    {deliverablesT.title}
                  </h2>
                  <p className="text-sm text-gray-500 max-w-[50ch]">
                    {deliverablesT.subtitle}
                  </p>
                </div>
                {/* Arrow buttons — visible on sm+ */}
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => carouselRef.current?.prev()}
                    aria-label="Previous"
                    className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-black/[0.04]
                      active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
                      transition-[color,background-color,transform] duration-[160ms] ease-out"
                  >
                    <ArrowLeft size={14} weight="bold" />
                  </button>
                  <button
                    onClick={() => carouselRef.current?.next()}
                    aria-label="Next"
                    className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-black/[0.04]
                      active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
                      transition-[color,background-color,transform] duration-[160ms] ease-out"
                  >
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <DeliverableCarousel ref={carouselRef} items={DELIVERABLES} lang={lang} />
            </RevealSection>
          </section>

          {/* ============================================================= */}
          {/* CTA                                                           */}
          {/* ============================================================= */}
          <section className="py-16 md:py-24 border-t border-gray-100" id="contact">
            <RevealSection>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
                {ctaT.title}
              </h2>

              {relatedProjects.length > 0 && (
                <div className="mb-10">
                  <div className="divide-y divide-gray-100">
                    {relatedProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/${lang}/project/${project.id}/full`}
                        className="group flex items-center justify-between gap-4 py-4
                          transition-colors duration-150 ease-out hover:bg-black/[.04] active:bg-black/[.06] -mx-3 px-3 rounded-lg"
                      >
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 mb-0.5">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {project.summary}
                          </p>
                        </div>
                        <ArrowRight
                          size={14}
                          weight="bold"
                          className="shrink-0 text-gray-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedArticles.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    {ctaT.articles_title}
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {relatedArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/${lang}/signal/${article.id}`}
                        className="group flex items-center justify-between gap-4 py-4
                          transition-colors duration-150 ease-out hover:bg-black/[.04] active:bg-black/[.06] -mx-3 px-3 rounded-lg"
                      >
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 mb-0.5">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {article.summary}
                          </p>
                        </div>
                        <ArrowRight
                          size={14}
                          weight="bold"
                          className="shrink-0 text-gray-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <AuthorContactCard lang={lang} message={ctaT.contact_message} />
            </RevealSection>
          </section>

        </div>
      </div>
    </>
  )
}
