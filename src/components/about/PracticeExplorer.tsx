'use client'

/**
 * What I lead, what AI equips: one drawing that is also the way in. Two rails run across five areas of the
 * work, the solid one is what I lead, the dashed one what AI equips, so the idea reads at a glance: the top
 * line is always mine. Choosing an area (a click, or the arrow keys) opens its detail below: what I lead
 * there, what the AI equips, and the tools it takes. The frame of use closes the panel, because setting it is
 * part of what I lead.
 *
 * Motion: the rails grow from the left as the drawing comes into view, the active pill slides on a critically
 * damped spring, the detail swaps in 200 ms (4 px, 2 px of blur). With reduced motion it cuts.
 */

import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HandPointing } from '@phosphor-icons/react'
import { useReducedMotion } from '@/components/case-study/controls'
import { grow, rise, useDiagramReveal } from '@/components/approche/diagramMotion'

type Lang = 'en' | 'fr'

interface Area {
  id: string
  name: string
  lead: string
  ai: string
  tools: string[]
}

const COPY: Record<Lang, { label: string; hint: string; lead: string; ai: string; tools: string; frame: string; areas: Area[] }> = {
  fr: {
    label: 'Ce que je mène, ce que l’IA outille, par domaine',
    hint: 'Choisissez un domaine pour voir le détail',
    lead: 'Je mène',
    ai: 'L’IA outille',
    tools: 'Outils',
    frame: 'Quand la sécurité des données l’exige, je pose un cadre d’usage : aucune donnée client, une revue humaine, chaque cas mesuré.',
    areas: [
      { id: 'steering', name: 'Pilotage', lead: 'Les priorités, les méthodes, le suivi des chantiers.', ai: 'Les tâches, la mémoire de travail, les comptes rendus.', tools: ['Notion', 'Linear', 'Claude Code'] },
      { id: 'research', name: 'Recherche', lead: 'Les entretiens, l’observation, la restitution aux équipes.', ai: 'Les transcriptions, les synthèses, les rapports.', tools: ['Notion', 'Claude Code'] },
      { id: 'design', name: 'Conception', lead: 'Le craft : parcours, états, niveaux de fidélité.', ai: 'La production dans Figma, les variantes, le design system.', tools: ['Figma', 'Figma Console MCP'] },
      { id: 'prototyping', name: 'Prototypage', lead: 'Les hypothèses à tester et ce qu’on en conclut.', ai: 'Les prototypes codés en React et leurs animations.', tools: ['Claude Code', 'VS Code', 'Framer Motion'] },
      { id: 'communication', name: 'Communication', lead: 'Le cadrage, les arbitrages, les décisions.', ai: 'Les synthèses de réunion, les decks à la charte, les visuels.', tools: ['Google Slides', 'Midjourney'] },
    ],
  },
  en: {
    label: 'What I lead, what AI equips, by area',
    hint: 'Pick an area to see the detail',
    lead: 'I lead',
    ai: 'AI equips',
    tools: 'Tools',
    frame: 'Where data security requires it, I set a frame of use: no customer data, human review, every case measured.',
    areas: [
      { id: 'steering', name: 'Steering', lead: 'Priorities, methods, the follow-up of the work.', ai: 'Tasks, working memory, meeting notes.', tools: ['Notion', 'Linear', 'Claude Code'] },
      { id: 'research', name: 'Research', lead: 'Interviews, observation, handing findings to the teams.', ai: 'Transcripts, syntheses, reports.', tools: ['Notion', 'Claude Code'] },
      { id: 'design', name: 'Design', lead: 'The craft: journeys, states, levels of fidelity.', ai: 'Production in Figma, variants, the design system.', tools: ['Figma', 'Figma Console MCP'] },
      { id: 'prototyping', name: 'Prototyping', lead: 'The hypotheses to test and what we conclude.', ai: 'Coded prototypes in React and their motion.', tools: ['Claude Code', 'VS Code', 'Framer Motion'] },
      { id: 'communication', name: 'Communication', lead: 'Framing, tradeoffs, decisions.', ai: 'Meeting syntheses, decks on brand, visuals.', tools: ['Google Slides', 'Midjourney'] },
    ],
  },
}

// Text swap: 200 ms, 4 px of travel, 2 px of blur
const SWAP = {
  initial: { opacity: 0, transform: 'translateY(4px)', filter: 'blur(2px)' },
  animate: { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
  exit: { opacity: 0, transform: 'translateY(-4px)', filter: 'blur(2px)' },
}

export default function PracticeExplorer({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  const reduce = useReducedMotion()
  const uid = useId()
  const { ref, shown } = useDiagramReveal<HTMLDivElement>()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = useState(2)
  const area = c.areas[active]

  const select = (i: number, focus = false) => {
    const next = (i + c.areas.length) % c.areas.length
    setActive(next)
    if (focus) tabs.current[next]?.focus()
  }

  return (
    <div className="rounded-2xl bg-[#F7F7F5] ring-1 ring-inset ring-black/[0.04]">
      {/* The drawing, which is also the list of areas */}
      <div ref={ref} className="no-scrollbar overflow-x-auto">
        <div className="grid min-w-[600px] grid-cols-[6.5rem_1fr] gap-x-4 px-5 pt-6 md:px-8 md:pt-8">
          <div aria-hidden="true" className="grid grid-rows-[3rem_2rem_2rem] text-xs">
            <span />
            <span className="self-center font-medium text-gray-900" style={rise(shown, 200)}>{c.lead}</span>
            <span className="self-center text-gray-500" style={rise(shown, 350)}>{c.ai}</span>
          </div>

          <div
            role="tablist"
            aria-label={c.label}
            className="relative grid grid-cols-5"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') select(active + 1, true)
              else if (e.key === 'ArrowLeft') select(active - 1, true)
              else return
              e.preventDefault()
            }}
          >
            {/* Two rails: the solid line is what I lead, the dashed one what AI equips */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[3rem] h-[4rem] w-full" preserveAspectRatio="none" viewBox="0 0 100 64">
              <line x1="0" y1="16" x2="100" y2="16" stroke="#111827" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={grow(shown, 0, 800)} />
              <line x1="0" y1="48" x2="100" y2="48" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" style={grow(shown, 150, 800)} />
            </svg>

            {c.areas.map((a, i) => {
              const on = i === active
              return (
                <button
                  key={a.id}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${a.id}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  className="group relative grid grid-rows-[3rem_2rem_2rem] justify-items-center focus-visible:outline-none"
                >
                  {/* The keyboard focus rings the pill only, not the whole column */}
                  <span className="relative inline-flex items-center self-center rounded-full px-3 py-1.5 group-focus-visible:ring-2 group-focus-visible:ring-gray-900">
                    {on && (
                      <motion.span
                        layoutId={`${uid}-pill`}
                        aria-hidden="true"
                        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.35, bounce: 0 }}
                        className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-black/[0.06]"
                      />
                    )}
                    <span
                      className={`relative text-sm transition-colors duration-150 ease-out ${
                        on ? 'font-medium text-gray-900' : 'text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900'
                      }`}
                    >
                      {a.name}
                    </span>
                  </span>
                  {/* A point on each rail: what I lead (ink), what AI equips (hollow) */}
                  <span aria-hidden="true" className="self-center" style={rise(shown, 400 + i * 60)}>
                    <span className={`block rounded-full bg-gray-900 transition-transform duration-200 ease-out ${on ? 'size-3.5' : 'size-2.5'}`} />
                  </span>
                  <span aria-hidden="true" className="self-center" style={rise(shown, 550 + i * 60)}>
                    <span className={`block rounded-full border-[1.5px] bg-[#F7F7F5] transition-colors duration-200 ease-out ${on ? 'size-3.5 border-gray-700' : 'size-2.5 border-gray-400'}`} />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* How to use the drawing, in a word */}
      <p className="mx-5 mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500 md:mx-8">
        <HandPointing size={14} aria-hidden="true" />
        {c.hint}
      </p>

      {/* The detail of the chosen area */}
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${area.id}`} className="relative mx-5 mt-4 min-h-[9.5rem] border-t border-black/[0.06] pt-5 md:mx-8 md:min-h-[8rem]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={area.id}
            {...(reduce ? {} : SWAP)}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <div>
              <p className="text-xs font-medium text-gray-900">{c.lead}</p>
              <p className="mt-1 text-base text-gray-900">{area.lead}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">{c.ai}</p>
              <p className="mt-1 text-base text-gray-600">{area.ai}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">{c.tools}</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5 md:max-w-[14rem]">
                {area.tools.map((tool) => (
                  <li key={tool} className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-600 ring-1 ring-inset ring-black/[0.06]">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The frame of use: set by me, whatever the area */}
      <p className="mx-5 mt-5 border-t border-black/[0.06] pb-6 pt-4 text-sm text-gray-600 md:mx-8 md:pb-8">{c.frame}</p>
    </div>
  )
}
