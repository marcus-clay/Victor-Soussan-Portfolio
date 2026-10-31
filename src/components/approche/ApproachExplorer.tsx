'use client'

/**
 * The job in one place: the steps of its two halves (structuring the product, designing the experience) as
 * pills, and below, the chosen step: one sentence, its proof, and the drawing that shows it (for the
 * interaction, the Tessan film itself). A reader in a hurry reads one step, the curious one walks them all.
 *
 * Motion: the active pill slides on a critically damped spring across both groups; the step swaps in 200 ms
 * (4 px, 2 px of blur) and its drawing draws itself as it arrives. Arrow keys walk the steps. With reduced
 * motion it cuts.
 *
 * On a phone the steps sit on one row that slides sideways, each group under its name, the chosen step kept
 * in view; below the step, the previous and the next one are a thumb away, so the reader walks the job
 * without going back up.
 */

const COPY = {
  fr: { previous: 'Étape précédente', next: 'Étape suivante' },
  en: { previous: 'Previous step', next: 'Next step' },
} as const

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useReducedMotion } from '@/components/case-study/controls'
import JourneyFilm from '@/components/case-study/JourneyFilm'
import { consultationFilm } from '@/data/tessanFilms'
import { TESSAN_TRANSLATIONS } from '@/data/caseStudyTranslations/tessanTranslations'
import { V2_JOB, type V2Step } from '@/data/approcheV2Data'
import type { Language } from '@/data/approcheData'
import { ConceptDiagram, CyclesDiagram, MaturityDiagram, RoadmapStructureDiagram, SourceDiagram, VisionToLotsDiagram } from '@/components/approche/ApproachDiagrams'

const SWAP = {
  initial: { opacity: 0, transform: 'translateY(4px)', filter: 'blur(2px)' },
  animate: { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
  exit: { opacity: 0, transform: 'translateY(-4px)', filter: 'blur(2px)' },
}

function Visual({ id, lang }: { id: V2Step['id']; lang: Language }) {
  switch (id) {
    case 'organisation':
      return <MaturityDiagram lang={lang} />
    case 'roadmap':
      return <RoadmapStructureDiagram lang={lang} />
    case 'cycles':
      return <CyclesDiagram lang={lang} />
    case 'sketch':
      return <ConceptDiagram lang={lang} />
    case 'interaction':
      return <JourneyFilm steps={consultationFilm()} label={V2_JOB[lang].groups[1].steps[1].name} labels={TESSAN_TRANSLATIONS[lang].ui.film} />
    case 'prototype':
      return <SourceDiagram lang={lang} />
    case 'deliver':
      return <VisionToLotsDiagram lang={lang} />
  }
}

export default function ApproachExplorer({ lang }: { lang: Language }) {
  const c = V2_JOB[lang]
  const reduce = useReducedMotion()
  const uid = useId()
  const steps = c.groups.flatMap((g) => g.steps)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const row = useRef<HTMLDivElement>(null)
  const top = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const step = steps[active]
  const prev = steps[(active - 1 + steps.length) % steps.length]
  const next = steps[(active + 1) % steps.length]

  const select = (i: number, focus = false) => {
    const n = (i + steps.length) % steps.length
    setActive(n)
    if (focus) tabs.current[n]?.focus({ preventScroll: true })
  }

  // Keeps the chosen step in view on the sliding row (on a wide screen the row does not scroll, nothing moves)
  useEffect(() => {
    const el = row.current
    const tab = tabs.current[active]
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return
    const left = tab.offsetLeft - (el.clientWidth - tab.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: reduce ? 'auto' : 'smooth' })
  }, [active, reduce])

  // From the bottom of a step: the next one starts at the top of the explorer
  const walk = (i: number) => {
    select(i)
    top.current?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })
  }

  let index = -1
  return (
    <div ref={top} className="scroll-mt-28">
      <div
        ref={row}
        role="tablist"
        aria-label={c.label}
        className="no-scrollbar -mx-[var(--pad)] flex gap-6 overflow-x-auto px-[var(--pad)] md:mx-0 md:gap-10 md:overflow-visible md:px-0"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') select(active + 1, true)
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') select(active - 1, true)
          else return
          e.preventDefault()
        }}
      >
        {c.groups.map((group, g) => (
          <div key={group.name} className={`shrink-0 md:shrink ${g > 0 ? 'border-l border-gray-200 pl-6 md:pl-10' : ''}`}>
            <p className="mb-2 whitespace-nowrap text-micro uppercase tracking-[0.08em] text-gray-500">{group.name}</p>
            <div className="-mx-3 flex gap-1 md:flex-wrap">
              {group.steps.map((s) => {
                index += 1
                const i = index
                const on = i === active
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${s.id}`}
                    aria-selected={on}
                    aria-controls={`${uid}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    className="group relative inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-3 transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none"
                  >
                    {on && (
                      <motion.span
                        layoutId={`${uid}-pill`}
                        aria-hidden="true"
                        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.25, bounce: 0 }}
                        className="absolute inset-0 rounded-full bg-gray-900"
                      />
                    )}
                    <span
                      className={`relative text-sm transition-colors duration-150 ease-out group-focus-visible:underline group-focus-visible:underline-offset-4 ${
                        on ? 'font-medium text-white' : 'text-gray-600 [@media(hover:hover)]:group-hover:text-gray-900'
                      }`}
                    >
                      {s.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${step.id}`} className="mt-8 md:mt-10">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={step.id} {...(reduce ? {} : SWAP)} transition={{ duration: 0.2, ease: 'easeInOut' }}>
            <p className="max-w-[62ch] text-lg text-gray-900">{step.text}</p>
            {step.proof && (
              <p className="mt-3 max-w-[62ch] text-sm text-gray-600">
                {step.proof.text}
                {step.proof.link && (
                  <>
                    {' '}
                    <Link
                      href={`/${lang}${step.proof.link.href}`}
                      className="group/link inline-flex items-center gap-1 font-medium text-gray-900"
                    >
                      <span className="link-line">{step.proof.link.label}</span>
                      <ArrowRight size={12} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover/link:translate-x-0.5" />
                    </Link>
                  </>
                )}
              </p>
            )}
            <div className="mt-6 md:mt-8">
              <Visual id={step.id} lang={lang} />
            </div>
          </motion.div>
        </AnimatePresence>
        <nav aria-label={c.label} className="mt-6 flex items-stretch justify-between gap-3 border-t border-gray-200 pt-4 md:hidden">
          <button type="button" onClick={() => walk(active - 1)} className="flex min-h-11 min-w-0 flex-col items-start rounded-lg py-1 text-left transition-transform duration-150 ease-out active:scale-[0.97]">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <ArrowLeft size={12} weight="bold" aria-hidden="true" />
              {COPY[lang].previous}
            </span>
            <span className="truncate text-sm font-medium text-gray-900">{prev.name}</span>
          </button>
          <span className="self-center text-xs tabular-nums text-gray-500" aria-live="polite">
            {active + 1} / {steps.length}
          </span>
          <button type="button" onClick={() => walk(active + 1)} className="flex min-h-11 min-w-0 flex-col items-end rounded-lg py-1 text-right transition-transform duration-150 ease-out active:scale-[0.97]">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              {COPY[lang].next}
              <ArrowRight size={12} weight="bold" aria-hidden="true" />
            </span>
            <span className="truncate text-sm font-medium text-gray-900">{next.name}</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
