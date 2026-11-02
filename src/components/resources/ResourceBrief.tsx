'use client'

// The brief at the top of a resource page: what it is for, the questions it helps answer, and where it sits
// in the design cycle, drawn as a small double diamond (discover, define, develop, deliver) with the
// resource's phases in ink. Same grammar as the diagrams: ink for the message, grey for the rest, and the
// drawing draws itself once as it comes into view (the two diamonds, then the phases fill, then the words).

import React from 'react'
import { draw, open, rise, useDiagramReveal } from '@/components/approche/diagramMotion'
import { PHASE_LABELS, RESOURCE_BRIEFS, type DesignPhase } from '@/data/resourceBriefs'

type Lang = 'en' | 'fr'

const INK = '#111827'
const LINE = '#D1D5DB'
const PALE = '#E5E7EB'
const PHASES: DesignPhase[] = ['discover', 'define', 'develop', 'deliver']

/** The four half-diamonds, left to right, on a 320 by 120 drawing */
const SHAPES: Record<DesignPhase, string> = {
  discover: 'M0 60 L80 12 L80 108 Z',
  define: 'M80 12 L160 60 L80 108 Z',
  develop: 'M160 60 L240 12 L240 108 Z',
  deliver: 'M240 12 L320 60 L240 108 Z',
}
const CENTERS: Record<DesignPhase, number> = { discover: 40, define: 120, develop: 200, deliver: 280 }
/** The two diamonds and their centre lines, the strokes that draw first */
const OUTLINES = ['M0 60 L80 12 L160 60 L80 108 Z', 'M160 60 L240 12 L320 60 L240 108 Z', 'M80 12 L80 108', 'M240 12 L240 108']

export function DoubleDiamond({ active, lang }: { active: DesignPhase[]; lang: Lang }) {
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  const title = lang === 'fr' ? 'Le cycle de design en double diamant' : 'The design cycle as a double diamond'
  const desc = `${lang === 'fr' ? 'Phases concernées' : 'Phases concerned'}: ${active.map((p) => PHASE_LABELS[p][lang]).join(', ')}.`
  return (
    <svg ref={ref} viewBox="-2 0 324 150" role="img" aria-label={`${title}. ${desc}`} className="block h-auto w-full max-w-[22rem]">
      {/* The two diamonds, drawn left to right, then their centre lines */}
      {OUTLINES.map((d, i) => (
        <path key={d} d={d} pathLength={1} fill="none" stroke={LINE} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round" style={draw(shown, i < 2 ? i * 250 : 450, i < 2 ? 700 : 300)} />
      ))}
      {/* The phases in ink: they open once the outlines are drawn */}
      {PHASES.filter((p) => active.includes(p)).map((p, i) => (
        <path key={p} d={SHAPES[p]} fill={PALE} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" style={open(shown, 700 + i * 90)} />
      ))}
      {PHASES.map((p, i) => (
        <text
          key={p}
          x={CENTERS[p]}
          y="136"
          textAnchor="middle"
          fontSize="11"
          fontWeight={active.includes(p) ? 600 : 400}
          fill={active.includes(p) ? INK : '#6B7280'}
          style={rise(shown, 900 + i * 60)}
        >
          {PHASE_LABELS[p][lang]}
        </text>
      ))}
    </svg>
  )
}

/** The brief card of a resource, by the id of its content item; nothing when the resource has none */
export function ResourceBrief({ id, lang }: { id: string; lang: Lang }) {
  const brief = RESOURCE_BRIEFS[id]
  if (!brief) return null
  const isFr = lang === 'fr'
  const t = isFr
    ? { purpose: 'À quoi ça sert', questions: 'Les questions que ça aide à trancher', cycle: 'Où dans le cycle de design' }
    : { purpose: 'What it is for', questions: 'The questions it helps settle', cycle: 'Where in the design cycle' }
  const overline = 'text-micro font-medium uppercase tracking-[0.08em] text-gray-500'

  return (
    <div className="grid gap-8 rounded-2xl border border-gray-100 bg-white p-6 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-8">
      <div>
        <p className={overline}>{t.purpose}</p>
        <p className="mt-2 text-base leading-[1.5] text-gray-900">{brief.purpose[lang]}</p>
        <p className={`${overline} mt-6`}>{t.questions}</p>
        <ul className="mt-2 space-y-1.5">
          {brief.questions[lang].map((q) => (
            <li key={q} className="flex gap-2.5 text-sm leading-[1.6] text-gray-600">
              <span aria-hidden="true" className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              {q}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={overline}>{t.cycle}</p>
        <div className="mt-3">
          <DoubleDiamond active={brief.phases} lang={lang} />
        </div>
      </div>
    </div>
  )
}
