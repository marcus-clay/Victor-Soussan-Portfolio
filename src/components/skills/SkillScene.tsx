import React from 'react'
import { ScenePanel } from '@/components/resources/ResourceScene'
import { ACCENTS } from '@/components/resources/accentPalette'
import { SCENES as NEW_SCENES } from './scenes'
import { SKILLS, type Lang, type SceneKind, type SkillEntry } from '@/data/skillsCatalogue'

/**
 * The pictures of the skills catalogue, on the grammar of the resource cards: a pale panel, a fragment of the
 * thing itself, a skeleton in grey, an annotation in monospace, and one element that takes the accent of the
 * theme. One family of scene per kind of skill; each makes a single gesture on hover (transform and opacity,
 * 300 ms on the media curve, pointer devices only). The words on a scene come from the entry's `note`.
 */

type Accent = { hex: string; soft: string }

/**
 * The accent of a skill. Neighbours in the catalogue take different hues: the position in the list is stepped by 7
 * on the ten-hue palette (7 and 10 share no factor, so every hue is used once per ten skills, warm and cool in turn).
 * Stable between the server and the browser.
 */
export function accentOfSkill(skill: SkillEntry): Accent {
  const index = Math.max(0, SKILLS.findIndex((s) => s.id === skill.id))
  return ACCENTS[(index * 7 + 3) % ACCENTS.length]
}

const SURFACE = 'rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)]'
const MOVE = 'transition-transform duration-300 ease-media'
const FADE_IN = 'transition-opacity duration-300 ease-media'
const H = '[@media(hover:hover)]:group-hover:'
const MASK_BOTTOM: React.CSSProperties = {
  maskImage: 'linear-gradient(to bottom, #000 60%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, #000 60%, transparent 100%)',
}

const Bar = ({ w, h = 6, tone = 'bg-gray-200', className = '', style }: { w: string; h?: number; tone?: string; className?: string; style?: React.CSSProperties }) => (
  <div className={`rounded-full ${tone} ${className}`} style={{ width: w, height: h, ...style }} />
)

/** An annotation: monospace, grey, outside the object */
const Note = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <span className={`absolute whitespace-nowrap font-mono text-[11px] leading-none text-gray-500 ${className}`} style={style}>
    {children}
  </span>
)

/** The English of the few notes that carry words */
const NOTE_EN: Record<string, string> = {
  'structurer · outiller · construire': 'structure · equip · build',
  'maintenant · ensuite · plus tard': 'now · next · later',
  'job → écran': 'job → screen',
  '30 min · décision': '30 min · decision',
  'tap · clic · caméra': 'tap · click · camera',
  'se dessine au défilement': 'draws on scroll',
  'feutre · papier à points': 'marker · dot paper',
  'une idée': 'one idea',
  'faits · raisonnement': 'facts · reasoning',
  '15 mises en page': '15 layouts',
  'surface ← besoins': 'surface ← needs',
  'signals → angles': 'signals → angles',
  'insight → concept': 'insight → concept',
}

const parts = (note: string, sep: string) => note.split(sep).map((s) => s.trim())

// ---------------------------------------------------------------------------
// Scenes
// ---------------------------------------------------------------------------

/** A line of steps, the current one in accent. Hover: the next step fills. */
function StepsScene({ note, a }: { note: string; a: Accent }) {
  const count = /^\d+ /.test(note) ? Number(note.split(' ')[0]) : 0
  const labels = count ? [] : parts(note, '·')
  const n = count || Math.max(labels.length, 4)
  const current = Math.min(2, n - 2)
  return (
    <>
      <div className="absolute left-[12%] right-[12%] top-[42%] h-px bg-gray-300" />
      {Array.from({ length: n }).map((_, i) => {
        const left = 12 + (76 * i) / (n - 1)
        const isCurrent = i === current
        const done = i < current
        return (
          <React.Fragment key={i}>
            <span
              className="absolute flex items-center justify-center rounded-full border"
              style={{ left: `${left}%`, top: '42%', width: 16, height: 16, transform: 'translate(-50%, -50%)', borderColor: isCurrent ? a.hex : done ? '#18181B' : '#A1A1AA', background: isCurrent ? a.hex : done ? '#18181B' : '#FAFAF8' }}
            />
            {i === current + 1 && (
              <span className={`absolute rounded-full opacity-0 ${FADE_IN} ${H}opacity-100`} style={{ left: `${left}%`, top: '42%', width: 16, height: 16, transform: 'translate(-50%, -50%)', background: a.hex }} />
            )}
            {labels[i] && (
              <Note className="-translate-x-1/2" style={{ left: `${left}%`, top: '56%', color: isCurrent ? '#18181B' : undefined }}>
                {labels[i]}
              </Note>
            )}
          </React.Fragment>
        )
      })}
      {count > 0 && <Note className="left-1/2 -translate-x-1/2" style={{ top: '58%' }}>{note}</Note>}
    </>
  )
}

/** Three horizons, one block in accent. Hover: the block slides to the next horizon. */
function RoadmapScene({ note, a }: { note: string; a: Accent }) {
  const cols = parts(note, '·')
  return (
    <>
      {cols.map((c, i) => (
        <div key={c} className="absolute top-[16%]" style={{ left: `${8 + i * 30}%`, width: '26%' }}>
          <Note className="static block pb-2">{c}</Note>
          <div className={`${SURFACE} px-3 py-3`} style={{ height: 52 }}>
            <Bar w="70%" />
            <Bar w="45%" className="mt-2" tone="bg-gray-100" />
          </div>
          <div className={`${SURFACE} mt-2 px-3 py-3 ${i === 0 ? MOVE + ' ' + H + 'translate-x-[30%]' : ''}`} style={{ height: 40, ...(i === 0 ? { background: a.hex, borderColor: a.hex } : {}) }}>
            <Bar w="60%" tone={i === 0 ? 'bg-white/70' : 'bg-gray-200'} />
          </div>
        </div>
      ))}
    </>
  )
}

/** A job on the left, the screen it leads to on the right. Hover: the screen lifts. */
function LensScene({ note, a }: { note: string; a: Accent }) {
  const [job, screen] = parts(note, '→')
  return (
    <>
      <div className={`absolute left-[8%] top-[30%] ${SURFACE} px-3.5 py-3`} style={{ width: '30%' }}>
        <span className="inline-flex rounded-full px-2 py-1 text-[10px] font-medium leading-none" style={{ background: a.soft, color: a.hex }}>{job}</span>
        <Bar w="80%" className="mt-3" />
        <Bar w="55%" className="mt-2" tone="bg-gray-100" />
      </div>
      <svg className="absolute left-[38%] top-[44%]" width="15%" height="14" viewBox="0 0 60 14" fill="none" aria-hidden="true">
        <path d="M0 7H54M48 2l6 5-6 5" stroke="#A1A1AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className={`absolute left-[55%] top-[16%] ${SURFACE} ${MOVE} ${H}-translate-y-1`} style={{ width: '38%', height: '76%', ...MASK_BOTTOM }}>
        <div className="flex gap-1 border-b border-gray-100 px-3 py-2">
          {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300" />)}
        </div>
        <div className="space-y-2 p-3">
          <Bar w="60%" tone="bg-gray-300" />
          <Bar w="90%" />
          <Bar w="75%" />
          <div className="mt-3 h-6 rounded-full" style={{ width: '40%', background: '#18181B' }} />
        </div>
      </div>
      <Note className="left-[55%]" style={{ top: '86%' }}>{screen}</Note>
    </>
  )
}

/** A short agenda: time, topic, one slot in accent. Hover: the next slot takes the accent. */
function AgendaScene({ note, a }: { note: string; a: Accent }) {
  const rows = ['09:00', '09:30', '10:00', '10:30']
  return (
    <>
      <div className={`absolute left-[14%] right-[14%] top-[14%] ${SURFACE} px-4 pb-6 pt-3`} style={MASK_BOTTOM}>
        {rows.map((t, i) => (
          <div key={t} className={`flex items-center gap-3 py-2 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
            <span className="w-9 font-mono text-[10px] text-gray-400">{t}</span>
            <span className="relative h-5 flex-1 rounded-md" style={{ background: i === 1 ? a.soft : 'transparent' }}>
              <span className="absolute left-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ width: [44, 70, 55, 62][i] + '%', background: i === 1 ? a.hex : '#E5E7EB' }} />
              {i === 2 && <span className={`absolute inset-0 rounded-md opacity-0 ${FADE_IN} ${H}opacity-100`} style={{ background: a.soft }} />}
            </span>
          </div>
        ))}
      </div>
      <Note className="right-[14%]" style={{ top: '6%' }}>{note}</Note>
    </>
  )
}

/** A phone, a finger on it. Hover: the finger moves up to the next control. */
function FilmScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className="absolute left-[58%] top-[10%] -translate-x-1/2 overflow-hidden rounded-[18px] border-[3px] border-gray-900 bg-white" style={{ height: '88%', aspectRatio: '390 / 844' }}>
        <div className="mx-auto mt-1.5 h-1.5 w-8 rounded-full bg-gray-900" />
        <div className="space-y-2 p-3 pt-4">
          <Bar w="55%" tone="bg-gray-300" />
          <Bar w="90%" />
          <Bar w="70%" />
          <div className="mt-3 h-7 rounded-full" style={{ background: a.hex }} />
        </div>
        <div className={`absolute left-[62%] top-[56%] h-7 w-7 rounded-full border border-white/80 bg-white/55 shadow-[0_6px_14px_rgba(0,0,0,0.16)] backdrop-blur-[2px] ${MOVE} ${H}-translate-y-9`} />
      </div>
      <div className="absolute left-[10%] top-[34%] flex flex-col gap-2">
        {parts(note, "·").map((w) => (
          <Note key={w} className="!static">{w}</Note>
        ))}
      </div>
    </>
  )
}

/** Three nodes and arrows, the last one in accent. Hover: the arrows draw on. */
function DiagramScene({ note, a }: { note: string; a: Accent }) {
  const box = (left: number, top: number, accent: boolean) => (
    <div className={`absolute ${SURFACE}`} style={{ left: `${left}%`, top: `${top}%`, width: '24%', height: '24%', ...(accent ? { background: a.hex, borderColor: a.hex } : {}) }}>
      <Bar w="50%" className="absolute left-3 top-1/2 -translate-y-1/2" tone={accent ? 'bg-white/80' : 'bg-gray-200'} />
    </div>
  )
  return (
    <>
      {box(8, 38, false)}
      {box(38, 18, false)}
      {box(68, 38, true)}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M32 50 C 35 50, 35 30, 38 30" stroke="#A1A1AA" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <path d="M62 30 C 65 30, 65 50, 68 50" stroke="#A1A1AA" strokeWidth="0.5" vectorEffect="non-scaling-stroke" strokeDasharray="3 3" className={`${FADE_IN} ${H}opacity-60`} />
      </svg>
      <Note style={{ left: '8%', top: '78%' }}>{note}</Note>
    </>
  )
}

/** A contact sheet: numbered thumbnails, one selected and enlarged. Hover: the selection moves. */
function SheetScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className="absolute left-[8%] top-[20%] grid grid-cols-3 gap-1.5" style={{ width: '44%' }}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="relative rounded-md bg-white" style={{ aspectRatio: '4 / 5', border: n === 5 ? `1.5px solid ${a.hex}` : '1px solid #E4E4E7' }}>
            <span className="absolute left-1 top-1 font-mono text-[8px] text-gray-400">{String(n).padStart(2, '0')}</span>
            {n === 3 && <span className={`absolute inset-[-1px] rounded-md opacity-0 ${FADE_IN} ${H}opacity-100`} style={{ border: `1.5px solid ${a.hex}` }} />}
          </div>
        ))}
      </div>
      <div className={`absolute right-[8%] top-[14%] ${SURFACE} ${MOVE} ${H}-translate-y-1`} style={{ width: '32%', height: '70%' }}>
        <div className="space-y-2 p-3">
          <Bar w="70%" tone="bg-gray-300" />
          <Bar w="50%" />
          <div className="mt-3 rounded-md" style={{ height: 38, background: a.soft }} />
        </div>
      </div>
      <Note style={{ left: '8%', top: '82%' }}>{note}</Note>
    </>
  )
}

/** A marker sketch on dotted paper. Hover: the sketch tilts a degree. */
function SketchScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D4D4D8 1px, transparent 1px)', backgroundSize: '14px 14px', opacity: 0.8 }} />
      <svg className={`absolute inset-0 h-full w-full ${MOVE} ${H}-rotate-1`} viewBox="0 0 130 100" fill="none" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="26" width="38" height="26" rx="3" fill="#fff" stroke="#18181B" strokeWidth="1.6" />
        <rect x="80" y="26" width="38" height="26" rx="3" fill="#fff" stroke="#18181B" strokeWidth="1.6" />
        <path d="M52 39 C 62 35, 70 43, 80 39" stroke="#18181B" strokeWidth="1.6" />
        <path d="M75 35l5 4-5 4" stroke="#18181B" strokeWidth="1.6" />
        <path d="M18 66 C 40 62, 70 70, 112 64" stroke={a.hex} strokeWidth="2.4" />
        <path d="M22 34h22M22 40h14M88 34h22M88 40h16" stroke="#A1A1AA" strokeWidth="1.2" />
      </svg>
      <Note style={{ left: '8%', top: '84%' }}>{note}</Note>
    </>
  )
}

/** A small deck, the front slide with its accent. Hover: the front slide lifts. */
function DeckScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className={`absolute ${SURFACE} ${MOVE} ${H}-translate-y-1`} style={{ left: '12%', top: '30%', width: '40%', aspectRatio: '16 / 10', opacity: 0.6 }} />
      <div className={`absolute ${SURFACE} ${MOVE} ${H}-translate-y-1.5`} style={{ left: '24%', top: '22%', width: '40%', aspectRatio: '16 / 10', opacity: 0.85 }} />
      <div className={`absolute ${SURFACE} ${MOVE} ${H}-translate-y-2 overflow-hidden`} style={{ left: '36%', top: '14%', width: '48%', aspectRatio: '16 / 10' }}>
        <div className="p-3.5">
          <Bar w="30%" h={5} tone="" style={{ background: a.hex }} />
          <Bar w="72%" h={9} tone="bg-gray-900" className="mt-2.5" />
          <Bar w="50%" h={9} tone="bg-gray-900" className="mt-1.5" />
          <Bar w="85%" className="mt-4" />
          <Bar w="65%" className="mt-2" />
        </div>
      </div>
      <Note style={{ left: '12%', top: '84%' }}>{note}</Note>
    </>
  )
}

/** A row of swatches, one in accent. Hover: the accent swatch lifts. */
function PaletteScene({ note, a }: { note: string; a: Accent }) {
  const tones = ['#18181B', '#52525B', '#A1A1AA', '#E4E4E7']
  return (
    <>
      <div className="absolute left-[8%] right-[8%] top-[22%] flex gap-2">
        {tones.map((t) => <span key={t} className="flex-1 rounded-lg" style={{ height: 70, background: t }} />)}
        <span className={`flex-1 rounded-lg ${MOVE} ${H}-translate-y-2`} style={{ height: 70, background: a.hex }} />
      </div>
      <div className={`absolute left-[8%] ${SURFACE} px-4 py-3`} style={{ top: '62%', width: '56%' }}>
        <Bar w="60%" tone="bg-gray-900" h={8} />
        <Bar w="85%" className="mt-2.5" />
      </div>
      <Note className="right-[8%]" style={{ top: '70%' }}>{note}</Note>
    </>
  )
}

/** A page of text, one sentence underlined in accent. Hover: the underline runs on. */
function TextScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className={`absolute left-[12%] right-[12%] top-[14%] ${SURFACE} px-5 py-4`} style={MASK_BOTTOM}>
        <Bar w="45%" h={8} tone="bg-gray-900" />
        <Bar w="92%" className="mt-4" />
        <Bar w="84%" className="mt-2" />
        <div className="relative mt-2" style={{ width: '70%', height: 6 }}>
          <Bar w="100%" tone="bg-gray-200" />
          <span className={`absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full ${MOVE} ${H}w-full`} style={{ background: a.hex, transitionProperty: 'width', width: '55%' }} />
        </div>
        <Bar w="78%" className="mt-4" />
        <Bar w="40%" className="mt-2" tone="bg-gray-100" />
      </div>
      <Note className="right-[12%]" style={{ top: '6%' }}>{note}</Note>
    </>
  )
}

/** A search field and its results, the match in accent. Hover: the caret moves on. */
function SearchScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className={`absolute left-[12%] right-[12%] top-[14%] flex items-center gap-2 ${SURFACE} px-3 py-2.5`}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="#71717A" strokeWidth="1.5" /><path d="M11 11l3.5 3.5" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span className="font-mono text-[11px] text-gray-900">{note}</span>
        <span className={`h-3 w-px ${MOVE} ${H}translate-x-2`} style={{ background: a.hex }} />
      </div>
      <div className={`absolute left-[12%] right-[12%] top-[40%] ${SURFACE} px-3.5 py-2`} style={MASK_BOTTOM}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex items-center gap-2.5 py-2 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
            <span className="h-4 w-4 rounded" style={{ background: i === 0 ? a.hex : '#E4E4E7' }} />
            <Bar w={['58%', '46%', '66%'][i]} tone={i === 0 ? 'bg-gray-300' : 'bg-gray-200'} />
          </div>
        ))}
      </div>
    </>
  )
}

/** A command and its answer, the caret in accent. Hover: the caret moves on. */
function PromptScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className={`absolute left-[10%] right-[10%] top-[16%] ${SURFACE} px-4 py-3.5`}>
        <div className="flex items-center gap-1.5 font-mono text-[12px] text-gray-900">
          <span style={{ color: a.hex }}>›</span>
          <span>{note}</span>
          <span className={`inline-block h-3.5 w-[2px] ${MOVE} ${H}translate-x-1`} style={{ background: a.hex }} />
        </div>
        <div className="mt-4 space-y-2" style={MASK_BOTTOM}>
          <Bar w="80%" />
          <Bar w="62%" />
          <Bar w="72%" tone="bg-gray-100" />
        </div>
      </div>
    </>
  )
}

/**
 * An easing curve, a dot in accent at its end. Three variants by note: "a → b" draws the old curve dashed under
 * the new one (a polish); words separated by dots become chips under the curve (a collection of transitions);
 * anything else is a plain curve. Hover: the dot slides back along the curve.
 */
function CurveScene({ note, a }: { note: string; a: Accent }) {
  const polish = note.includes('→')
  const chips = !polish && note.includes('·') ? parts(note, '·') : []
  return (
    <>
      <div className={`absolute left-[12%] right-[12%] top-[12%] ${SURFACE}`} style={{ height: chips.length ? '50%' : '62%' }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M10 50H92M10 8V50" stroke="#E4E4E7" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          {polish && <path d="M10 50 C 44 50, 60 8, 90 10" stroke="#A1A1AA" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />}
          <path d="M10 50 C 30 50, 42 12, 90 10" stroke="#18181B" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className={`absolute rounded-full ${MOVE} ${H}-translate-x-[110%] ${H}translate-y-[160%]`} style={{ right: '8%', top: '12%', width: 10, height: 10, background: a.hex }} />
      </div>
      {chips.length > 0 ? (
        <div className="absolute left-[12%] flex gap-1.5" style={{ top: '70%' }}>
          {chips.map((w, i) => (
            <span key={w} className={`rounded-full border px-2.5 py-1 font-mono text-[10px] leading-none ${i === 0 ? `${MOVE} ${H}-translate-y-0.5` : ''}`} style={i === 0 ? { background: a.soft, borderColor: a.soft, color: '#18181B' } : { borderColor: '#E4E4E7', color: '#71717A', background: '#fff' }}>
              {w}
            </span>
          ))}
        </div>
      ) : (
        <Note className="left-[12%]" style={{ top: '84%' }}>{note}</Note>
      )}
    </>
  )
}

/** Ideas ranked by bars, the top one in accent. Hover: the second one catches up. */
function ScoreScene({ note, a }: { note: string; a: Accent }) {
  const rows = [86, 62, 40]
  return (
    <>
      <div className={`absolute left-[12%] right-[12%] top-[14%] flex flex-col justify-between ${SURFACE} px-4 py-3`} style={{ height: '56%' }}>
        {rows.map((w, i) => (
          <div key={w} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-gray-400">{i + 1}</span>
            <span className="relative h-2 flex-1 rounded-full bg-gray-100">
              <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${w}%`, background: i === 0 ? a.hex : '#D4D4D8' }} />
              {i === 1 && <span className={`absolute inset-y-0 left-0 rounded-full opacity-0 ${FADE_IN} ${H}opacity-100`} style={{ width: '78%', background: '#A1A1AA' }} />}
            </span>
          </div>
        ))}
      </div>
      <Note className="left-[12%]" style={{ top: '80%' }}>{note}</Note>
    </>
  )
}

/** Seven stacked layers, one in accent. Hover: the accent layer lifts. */
function LayersScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className="absolute left-[12%] top-[12%] flex flex-col gap-1.5" style={{ width: '50%' }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`rounded-md border ${i === 2 ? `${MOVE} ${H}translate-x-2` : ''}`} style={{ height: 17, background: i === 2 ? a.hex : '#fff', borderColor: i === 2 ? a.hex : '#E4E4E7' }} />
        ))}
      </div>
      <Note className="left-[68%]" style={{ top: '16%' }}>surface</Note>
      <Note className="left-[68%]" style={{ top: '76%' }}>reality</Note>
      <Note className="left-[12%]" style={{ top: '90%' }}>{note}</Note>
    </>
  )
}

/** Two tools and a link between them, a node in accent. Hover: the node pulses outward. */
function LinkScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className={`absolute left-[8%] top-[28%] ${SURFACE} px-3 py-3`} style={{ width: '26%', height: '36%' }}>
        <Bar w="60%" tone="bg-gray-300" />
        <Bar w="85%" className="mt-2.5" />
        <Bar w="50%" className="mt-2" tone="bg-gray-100" />
      </div>
      <div className={`absolute right-[8%] top-[28%] ${SURFACE} px-3 py-3`} style={{ width: '26%', height: '36%' }}>
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => <span key={i} className="h-5 rounded bg-gray-100" />)}
        </div>
      </div>
      <div className="absolute left-[34%] right-[34%] top-[46%] h-px bg-gray-300" />
      <span className={`absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full ${MOVE} ${H}scale-125`} style={{ width: 14, height: 14, background: a.hex }} />
      <Note className="left-1/2 -translate-x-1/2" style={{ top: '74%' }}>{note}</Note>
    </>
  )
}

/** A pile of documents, file names on their edges. Hover: the pile spreads a little. */
function StackScene({ note, a }: { note: string; a: Accent }) {
  const names = parts(note, '·')
  return (
    <>
      {names.slice(0, 3).map((name, i) => (
        <div key={name} className={`absolute ${SURFACE} px-3.5 pt-2 ${MOVE}`} style={{ left: `${16 - i * 0}%`, right: `${16 - i * 0}%`, top: `${14 + i * 11}%`, height: '56%', zIndex: i }}>
          <span className="font-mono text-[10px] text-gray-500">{name}</span>
          {i === 2 && (
            <div className="mt-3 space-y-2">
              <Bar w="70%" tone="bg-gray-300" />
              <Bar w="88%" />
              <span className="block h-5 rounded-full" style={{ width: '34%', background: a.hex }} />
            </div>
          )}
        </div>
      ))}
    </>
  )
}

/** A window with a skeleton and a pill in accent (the default scene) */
function WindowScene({ note, a }: { note: string; a: Accent }) {
  return (
    <>
      <div className={`absolute left-[12%] top-[16%] ${SURFACE}`} style={{ width: '100%', height: '100%' }}>
        <div className="flex gap-1 border-b border-gray-100 px-3 py-2">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300" />)}</div>
        <div className="space-y-2 p-4">
          <Bar w="40%" tone="bg-gray-300" />
          <Bar w="70%" />
          <Bar w="58%" />
          <span className="mt-3 inline-block h-6 rounded-full" style={{ width: '24%', background: a.hex }} />
        </div>
      </div>
      <Note className="right-[8%]" style={{ top: '8%' }}>{note}</Note>
    </>
  )
}

const SCENES: Record<SceneKind, (p: { note: string; a: Accent }) => React.ReactElement> = {
  steps: StepsScene,
  roadmap: RoadmapScene,
  lens: LensScene,
  agenda: AgendaScene,
  film: FilmScene,
  window: WindowScene,
  diagram: DiagramScene,
  sheet: SheetScene,
  sketch: SketchScene,
  deck: DeckScene,
  palette: PaletteScene,
  text: TextScene,
  search: SearchScene,
  prompt: PromptScene,
  curve: CurveScene,
  score: ScoreScene,
  layers: LayersScene,
  link: LinkScene,
  stack: StackScene,
}

/** The scene of a skill, drawn in its theme’s accent */
export function SkillScene({ skill, lang }: { skill: SkillEntry; lang: Lang }) {
  const raw = skill.note ?? ''
  const note = lang === 'en' ? (NOTE_EN[raw] ?? raw) : raw
  const entry = NEW_SCENES[skill.id]
  if (entry?.READY) {
    const Made = entry.default
    return <Made lang={lang} a={accentOfSkill(skill)} note={note} />
  }
  const Scene = SCENES[skill.scene]
  return <Scene note={note} a={accentOfSkill(skill)} />
}

/** The picture of a skill card: its scene on the panel. The card around it carries the `group` for the hover. */
export function SkillPicture({ skill, lang, className = '' }: { skill: SkillEntry; lang: Lang; className?: string }) {
  return (
    <ScenePanel className={className}>
      <SkillScene skill={skill} lang={lang} />
    </ScenePanel>
  )
}
