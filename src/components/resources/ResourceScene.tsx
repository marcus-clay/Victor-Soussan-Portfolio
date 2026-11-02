'use client'

// The pictures of the resource cards: one scene per resource, a flat fragment of the thing itself (a page, a
// prompt, a strip of cells, a window) set large on the pale ground, with a few real words and the bottom
// fading out. White surfaces, hairline borders, one ink accent, no colour. Same vocabulary for every card,
// so the library reads as one set.
//
// On hover (pointer devices only) each scene makes one small gesture that says what the document does: a
// box gets ticked, the kept note lifts, the slide comes forward. Transform and opacity only, 300 ms on the
// site's media curve; a few pixels at most, so reduced motion needs no special case.

import React from 'react'
import PersonalOsScene from '@/components/skills/scenes/personal-os'
import { ACCENTS } from './accentPalette'

type Lang = 'en' | 'fr'

const T = {
  fr: {
    prompt: 'Construis l’écran d’accueil à partir du fichier Figma.',
    why: 'Pourquoi',
    days: ['L', 'M', 'M', 'J', 'V'],
    thirty: '30 min',
    hmw: 'Comment pourrions-nous… ?',
    stickies: ['Idée', 'Idée', 'Point fort', 'Point faible'],
    kept: 'Principe retenu',
    votes: '3 votes',
    checks: ['Objectif', 'États vides', 'Erreurs', 'Accessibilité'],
    ticket: 'n° 124',
    statuses: ['Explo', 'WIP', 'Ready to dev'],
    deckConcept: { section: 'Section 05', title: 'Le concept, en une phrase', toc: ['Le problème', 'Besoins et objectifs', 'Le concept', 'Décisions'] },
    deckStudy: { section: 'Section 02', title: 'Ce que la recherche a montré', toc: ['Le contexte', 'La recherche', 'Les explorations', 'Les tests'] },
  },
  en: {
    prompt: 'Build the home screen from the Figma file.',
    why: 'Why',
    days: ['M', 'T', 'W', 'T', 'F'],
    thirty: '30 min',
    hmw: 'How might we…?',
    stickies: ['Idea', 'Idea', 'Strength', 'Weakness'],
    kept: 'Principle kept',
    votes: '3 votes',
    checks: ['Goal', 'Empty states', 'Errors', 'Accessibility'],
    ticket: 'no. 124',
    statuses: ['Explo', 'WIP', 'Ready to dev'],
    deckConcept: { section: 'Section 05', title: 'The concept, in one sentence', toc: ['The problem', 'Needs and goals', 'The concept', 'Decisions'] },
    deckStudy: { section: 'Section 02', title: 'What the research showed', toc: ['The context', 'The research', 'The explorations', 'The tests'] },
  },
}

/** The ground of every scene: the card's picture panel. The hover gesture lives in each scene. */
export function ScenePanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[13/10] overflow-hidden rounded-xl bg-[#FAFAF8] ring-1 ring-inset ring-black/[0.04] ${className}`}>
      <div className="absolute inset-0" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}

/** Fades the bottom of a fragment that runs past the panel */
const FADE: React.CSSProperties = {
  maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%)',
}

const SURFACE = 'rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]'
const PILL = 'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none'
/** The hover gesture: 300 ms on the media curve, pointer devices only */
const MOVE = 'transition-transform duration-300 ease-media'
const H = '[@media(hover:hover)]:group-hover:'
/** A grey bar standing for a line of text */
const Bar = ({ w, className = '' }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full bg-gray-200 ${className}`} style={{ width: w }} />
)

// ---------------------------------------------------------------------------
// Guides
// ---------------------------------------------------------------------------

/** A prompt, the one sentence the guide teaches you to write, over a faint page of code. Hover: the cursor advances. */
function PromptScene({ lang }: { lang: Lang }) {
  return (
    <>
      <div className="absolute inset-x-[14%] top-[52%] space-y-2.5 opacity-70" style={FADE}>
        <Bar w="38%" /><Bar w="62%" className="ml-[8%]" /><Bar w="46%" className="ml-[8%]" /><Bar w="70%" className="ml-[16%]" /><Bar w="30%" className="ml-[8%]" /><Bar w="54%" />
      </div>
      <div className={`absolute left-[12%] right-[12%] top-[18%] ${SURFACE} px-5 py-4 ${MOVE} ${H}-translate-y-0.5`}>
        <p className="text-[13px] leading-5 text-gray-900">{T[lang].prompt}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full bg-gray-900 ${MOVE} ${H}translate-x-[18px]`} />
          <Bar w="34%" />
        </div>
      </div>
    </>
  )
}

/** A window with the recorded prototype playing, the case study text under it. Hover: the play button comes forward. */
function PlayerScene() {
  return (
    <div className={`absolute left-[12%] right-[12%] top-[14%] ${SURFACE} overflow-hidden ${MOVE} ${H}-translate-y-0.5`} style={FADE}>
      <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" /><span className="h-1.5 w-1.5 rounded-full bg-gray-300" /><span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
      </div>
      <div className="relative mx-3 mt-3 aspect-[16/9] rounded-lg bg-gray-100">
        <span className={`absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900 text-white ${MOVE} ${H}scale-110`}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
        </span>
      </div>
      <div className="space-y-2 px-3 pb-6 pt-4">
        <Bar w="56%" className="bg-gray-300" /><Bar w="88%" /><Bar w="72%" />
      </div>
    </div>
  )
}

/**
 * The personal OS guide: the Stageshow picture of the `personal-os` skill (a window with the inbox, the journal and the
 * board, and the folder card straddling it), so that the guide and its skill show the same thing wherever they are cited
 * (Resources grid, About carousel, follow-up cards). It is a still: no hover gesture.
 */
function OsScene({ lang }: { lang: Lang }) {
  return <PersonalOsScene lang={lang} a={ACCENTS[7]} note="" />
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

/** The scoping page: the framed "why" first, then the rest. Hover: the frame comes forward. */
function PageScene({ lang }: { lang: Lang }) {
  return (
    <div className={`absolute left-[16%] right-[16%] top-[12%] ${SURFACE} px-5 pb-8 pt-5`} style={FADE}>
      <Bar w="40%" className="bg-gray-300" />
      <div className={`mt-4 rounded-lg border border-gray-900 bg-white px-3 py-2.5 ${MOVE} ${H}-translate-y-0.5 ${H}scale-[1.02]`}>
        <p className="text-[12px] font-semibold leading-none text-gray-900">{T[lang].why}</p>
        <div className="mt-2.5 space-y-2"><Bar w="78%" /><Bar w="52%" /></div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-gray-200 p-2.5"><Bar w="60%" /></div>
        <div className="rounded-lg border border-gray-200 p-2.5"><Bar w="60%" /></div>
      </div>
      <div className="mt-3 space-y-2"><Bar w="90%" /><Bar w="64%" /></div>
    </div>
  )
}

/** A strip of cells: the days of the week, the meetings on two of them. Hover: the two meetings lift. */
function CellsScene({ lang }: { lang: Lang }) {
  const t = T[lang]
  const filled = [0, 2]
  return (
    <div className="absolute inset-x-[12%] top-1/2 -translate-y-1/2">
      <div className="mb-4 flex justify-center">
        <span className={`${PILL} bg-gray-200 text-gray-700`}>{t.thirty}</span>
      </div>
      <div className="flex gap-1.5">
        {t.days.map((c, i) => (
          <div
            key={i}
            className={`flex h-9 flex-1 items-center justify-center rounded-md border text-[11px] font-medium ${
              filled.includes(i) ? `border-gray-900 bg-gray-900 text-white ${MOVE} ${H}-translate-y-1` : 'border-gray-200 bg-white text-gray-500'
            }`}
          >
            {c}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5">
        {t.days.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-b-sm border-x border-b ${filled.includes(i) ? 'border-gray-900' : 'border-gray-200'}`} />
        ))}
      </div>
    </div>
  )
}

/** The workshop board: sticky notes from several hands, the participants above, the one kept carries the votes. Hover: it lifts. */
function WorkshopScene({ lang }: { lang: Lang }) {
  const t = T[lang]
  const notes: { text: string; x: string; y: string; rot: number; kept?: boolean; hmw?: boolean }[] = [
    { text: t.hmw, x: '10%', y: '24%', rot: -2.5, hmw: true },
    { text: t.stickies[0], x: '40%', y: '20%', rot: 1.5 },
    { text: t.stickies[1], x: '68%', y: '26%', rot: -1 },
    { text: t.stickies[2], x: '14%', y: '60%', rot: 1 },
    { text: t.kept, x: '41%', y: '56%', rot: -1.5, kept: true },
    { text: t.stickies[3], x: '70%', y: '62%', rot: 2 },
  ]
  return (
    <>
      <div className="absolute right-[8%] top-[7%] flex items-center">
        {['A', 'M', 'S', 'V'].map((i, k) => (
          <span key={i} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FAFAF8] text-[9px] font-medium ${k === 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'} ${k > 0 ? '-ml-1.5' : ''}`}>{i}</span>
        ))}
      </div>
      {notes.map((n) => (
        <div
          key={n.text + n.x}
          className={`absolute flex h-[26%] w-[24%] items-start p-2 text-[10px] leading-snug shadow-[0_1px_2px_rgba(0,0,0,0.05),0_6px_16px_-10px_rgba(0,0,0,0.25)] ${
            n.kept ? `border border-gray-900 bg-white font-medium text-gray-900 ${MOVE} ${H}-translate-y-1 ${H}rotate-0 ${H}scale-105` : n.hmw ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-200' : 'bg-gray-100 text-gray-600'
          }`}
          style={{ left: n.x, top: n.y, rotate: `${n.rot}deg` }}
        >
          {n.text}
          {n.kept && (
            <span className="absolute bottom-1.5 left-2 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" /><span className="h-1.5 w-1.5 rounded-full bg-gray-900" /><span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              <span className="ml-1 text-[9px] font-normal text-gray-500">{t.votes}</span>
            </span>
          )}
        </div>
      ))}
    </>
  )
}

/** The checklist, the first points ticked. Hover: the third one gets ticked. */
function ChecklistScene({ lang }: { lang: Lang }) {
  const tick = <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 5.2l2.1 2.1L8 3.4" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  return (
    <div className={`absolute left-[14%] right-[14%] top-[14%] ${SURFACE} px-5 pb-6 pt-4`} style={FADE}>
      {T[lang].checks.map((label, i) => {
        const done = i < 2
        const next = i === 2
        return (
          <div key={label} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
            <span className={`relative flex items-center justify-center rounded-[5px] border ${done ? 'border-gray-900 bg-gray-900' : 'border-gray-300 bg-white'}`} style={{ width: 18, height: 18 }}>
              {done && tick}
              {next && (
                <span className={`absolute inset-[-1px] flex items-center justify-center rounded-[5px] bg-gray-900 opacity-0 transition-opacity duration-300 ease-media ${H}opacity-100`}>{tick}</span>
              )}
            </span>
            <span className={`text-[12px] ${done ? 'text-gray-900' : 'text-gray-500'} ${next ? `transition-colors duration-300 ease-media ${H}text-gray-900` : ''}`}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

/** An interface cut along dashed lines, a ticket number on the cut. Hover: the cuts slide, the ticket lifts. */
function SlicingScene({ lang }: { lang: Lang }) {
  return (
    <>
      <div className={`absolute left-[16%] right-[22%] top-[14%] ${SURFACE} px-4 pb-6 pt-3`} style={FADE}>
        <div className="flex items-center justify-between"><Bar w="30%" className="bg-gray-300" /><span className="h-3 w-8 rounded-full bg-gray-200" /></div>
        {[0, 1, 2].map((r) => (
          <div key={r} className="mt-4 flex items-center gap-3">
            <span className="h-8 w-10 rounded-md bg-gray-100" />
            <div className="flex-1 space-y-2"><Bar w="80%" /><Bar w="55%" /></div>
          </div>
        ))}
      </div>
      {['35%', '58%'].map((top, i) => (
        <div key={top} className={`absolute left-[10%] right-[10%] border-t border-dashed border-gray-900/60 ${MOVE} ${H}translate-x-1`} style={{ top }}>
          {i === 0 && (
            <span className={`${PILL} absolute -top-3 right-0 bg-gray-900 text-white ${MOVE} ${H}-translate-y-0.5`}>{T[lang].ticket}</span>
          )}
        </div>
      ))}
    </>
  )
}

/** The three statuses of a Figma page, the last one set in stone. Hover: each step moves one notch forward. */
function StatusScene({ lang }: { lang: Lang }) {
  const s = T[lang].statuses
  return (
    <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 pl-[18%]">
      <span className={`${PILL} border border-dashed border-gray-400 bg-white py-2 text-gray-600 ${MOVE} ${H}translate-x-1`}>{s[0]}</span>
      <span className={`${PILL} ml-[14%] border border-gray-300 bg-white py-2 text-gray-800 ${MOVE} ${H}translate-x-2`}>{s[1]}</span>
      <span className={`${PILL} ml-[28%] border border-gray-900 bg-gray-900 py-2 text-white ${MOVE} ${H}translate-x-3`}>{s[2]}</span>
      <div className="absolute left-[18%] top-[22%] h-[56%] w-px bg-gray-200" aria-hidden="true" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Decks
// ---------------------------------------------------------------------------

/** A deck: the section slide of its subject in front of its contents slide. Hover: the front slide comes forward. */
function DeckScene({ deck }: { deck: { section: string; title: string; toc: string[] } }) {
  return (
    <>
      <div className={`absolute left-[26%] right-[8%] top-[12%] aspect-[16/9] ${SURFACE} px-4 py-3 ${MOVE} ${H}translate-x-1 ${H}-translate-y-0.5`} style={FADE}>
        <div className="flex items-start justify-between">
          <Bar w="22%" className="bg-gray-300" />
          <span className="text-[9px] text-gray-400">2</span>
        </div>
        <div className="mt-4 space-y-2">
          {deck.toc.map((t, i) => (
            <div key={t} className="flex items-center gap-2 text-[9px] text-gray-500"><span className="w-4 text-gray-400">0{i + 1}</span>{t}</div>
          ))}
        </div>
      </div>
      <div className={`absolute left-[8%] right-[26%] top-[30%] aspect-[16/9] ${SURFACE} px-5 py-4 ${MOVE} ${H}-translate-y-1`}>
        <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-gray-500">{deck.section}</p>
        <p className="mt-3 text-[15px] font-semibold leading-tight text-gray-900">{deck.title}</p>
        <Bar w="60%" className="mt-3" />
        <div className="absolute bottom-3 left-5 right-5 flex justify-between"><Bar w="20%" className="h-1 bg-gray-100" /><span className="text-[8px] text-gray-400">11</span></div>
      </div>
    </>
  )
}

/** The scene of a resource, by the id of its content item */
export function ResourceScene({ id, lang }: { id: string; lang: Lang }) {
  switch (id) {
    case 'guide-claude-code': return <PromptScene lang={lang} />
    case 'guide-ship-to-show': return <PlayerScene />
    case 'guide-personal-os': return <OsScene lang={lang} />
    case 'template-design-scoping': return <PageScene lang={lang} />
    case 'template-po-design-sync': return <CellsScene lang={lang} />
    case 'template-design-teardown': return <WorkshopScene lang={lang} />
    case 'template-feature-checklist': return <ChecklistScene lang={lang} />
    case 'template-ui-slicing': return <SlicingScene lang={lang} />
    case 'template-figma-file-status': return <StatusScene lang={lang} />
    case 'deck-concept-review': return <DeckScene deck={T[lang].deckConcept} />
    case 'deck-design-study': return <DeckScene deck={T[lang].deckStudy} />
    default: return null
  }
}

/** True when a resource has a scene */
export const hasScene = (id: string) => [
  'guide-claude-code', 'guide-ship-to-show', 'guide-personal-os', 'template-design-scoping', 'template-po-design-sync',
  'template-design-teardown', 'template-feature-checklist', 'template-ui-slicing', 'template-figma-file-status',
  'deck-concept-review', 'deck-design-study',
].includes(id)

/** The picture of a resource card: its scene on the panel */
export function ResourcePicture({ id, lang, className = '' }: { id: string; lang: Lang; className?: string }) {
  if (!hasScene(id)) return null
  return (
    <ScenePanel className={className}>
      <ResourceScene id={id} lang={lang} />
    </ScenePanel>
  )
}
