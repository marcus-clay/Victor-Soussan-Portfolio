'use client'

// The diagrams of the Approach page. One idea each, drawn at the full width of the column on a pale panel:
// ink for what carries the message, grey for the rest, labels on the drawing itself (no legend). Time runs
// left to right, in parallel lanes. Each one draws itself once as it comes into view (see diagramMotion).
// Below md the panel scrolls sideways rather than shrinking the type out of reach.

import React from 'react'
import {
  CONCEPT,
  FIDELITY_DIAGRAM,
  MATURITY_DIAGRAM,
  RHYTHM_DIAGRAM,
  ROADMAP,
  SCALES,
  type Language,
} from '@/data/approcheData'
import { draw, flash, grow, open, rise, seg, travel, useDiagramReveal, useLoop } from '@/components/approche/diagramMotion'
import { V2_CYCLES, V2_INTERACTION, V2_PROTOTYPING } from '@/data/approcheV2Data'

const INK = '#111827'
const LINE = '#D1D5DB'
const PALE = '#E5E7EB'
const GRID = '#ECECE9'

/** The pale panel every diagram sits on; scrolls sideways on narrow screens. */
function Panel({ children, minWidth = 720 }: { children: React.ReactNode; minWidth?: number }) {
  return (
    <div className="no-scrollbar overflow-x-auto rounded-2xl bg-[#F7F7F5] ring-1 ring-inset ring-black/[0.04]">
      <div className="px-5 py-6 md:px-10 md:py-10" style={{ minWidth }}>
        {children}
      </div>
    </div>
  )
}

// Motion goes on a wrapper: a CSS transform on the shape itself would replace its SVG transform
function Arrowhead({ x, y, angle, style }: { x: number; y: number; angle: number; style?: React.CSSProperties }) {
  return (
    <g style={style}>
      <path d="M-7 -4.5 L0 0 L-7 4.5" transform={`translate(${x} ${y}) rotate(${angle})`} fill="none" stroke={INK} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

/** A milestone: a small square turned on its point */
function Diamond({ x, y, size = 12, filled = true, tone = INK, style }: { x: number; y: number; size?: number; filled?: boolean; tone?: string; style?: React.CSSProperties }) {
  return (
    <g style={style}>
      <rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx="2" fill={filled ? tone : '#FFFFFF'} stroke={tone} strokeWidth={filled ? 0 : 1.5} transform={`rotate(45 ${x} ${y})`} />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Three scales, one inside the other
// ---------------------------------------------------------------------------

export function ScalesDiagram({ lang }: { lang: Language }) {
  const c = SCALES[lang].diagram
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  const chips = Array.from({ length: 10 }, (_, i) => ({ x: 384 + (i % 2) * 130, y: 196 + Math.floor(i / 2) * 34 }))

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 400" role="img" aria-labelledby="scales-title scales-desc" className="block h-auto w-full">
        <title id="scales-title">{c.title}</title>
        <desc id="scales-desc">{c.desc}</desc>

        {/* The organisation */}
        <g style={open(shown, 900)}>
          <rect x="2" y="2" width="956" height="396" rx="28" fill="#FFFFFF" stroke={PALE} />
        </g>
        <g style={rise(shown, 1000)}>
          <text x="32" y="46" fontSize="15" fontWeight="600" fill={INK}>{c.org}</text>
          <text x="32" y="68" fontSize="13" className="fill-gray-500">{c.orgDesc}</text>
        </g>
        {c.people.map((name, i) => (
          <g key={name} style={rise(shown, 1100 + i * 80)}>
            <circle cx="704" cy={168 + i * 52} r="13" fill={PALE} />
            <text x="728" y={172 + i * 52} fontSize="13" className="fill-gray-600">{name}</text>
          </g>
        ))}

        {/* The roadmap */}
        <g style={open(shown, 450)}>
          <rect x="32" y="100" width="620" height="272" rx="22" fill="#F7F7F5" stroke={LINE} />
        </g>
        <g style={rise(shown, 550)}>
          <text x="60" y="140" fontSize="15" fontWeight="600" fill={INK}>{c.roadmap}</text>
          <text x="60" y="162" fontSize="13" className="fill-gray-500">{c.roadmapDesc}</text>
        </g>
        {chips.map((chip, i) => (
          <g key={i} style={rise(shown, 650 + i * 40)}>
            <rect x={chip.x} y={chip.y} width="116" height="24" rx="7" fill="#FFFFFF" stroke={LINE} />
            <rect x={chip.x + 12} y={chip.y + 9} width={[64, 48, 72, 56, 40][i % 5]} height="6" rx="3" fill={PALE} />
          </g>
        ))}

        {/* The subject: the message, in ink */}
        <g style={open(shown, 0)}>
          <rect x="60" y="190" width="290" height="152" rx="16" fill="#FFFFFF" stroke={INK} strokeWidth="1.75" />
        </g>
        <g style={rise(shown, 120)}>
          <text x="84" y="226" fontSize="15" fontWeight="600" fill={INK}>{c.subject}</text>
          <text x="84" y="248" fontSize="13" className="fill-gray-500">{c.subjectDesc}</text>
        </g>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// Several PMs, one structured roadmap
// ---------------------------------------------------------------------------

const PM_PILLS: [number, number, number][][] = [
  [[30, 92, 78], [46, 124, 62], [26, 156, 84], [40, 188, 70], [32, 220, 58]],
  [[132, 96, 70], [124, 130, 86], [140, 162, 60], [128, 196, 76]],
  [[232, 90, 64], [226, 122, 80], [240, 156, 68], [230, 190, 74], [236, 224, 62], [228, 258, 70]],
]

export function RoadmapStructureDiagram({ lang }: { lang: Language }) {
  const c = ROADMAP[lang].structureDiagram
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: one subject at a time travels into the structure and lands on its initiative
  const t = useLoop(shown, 4800)
  const X = 590
  const W = 340
  const row = (count: number, gap: number) => {
    const w = (W - gap * (count - 1)) / count
    return Array.from({ length: count }, (_, i) => ({ x: X + i * (w + gap), w }))
  }
  let pill = 0

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 340" role="img" aria-labelledby="roadmap-title roadmap-desc" className="block h-auto w-full">
        <title id="roadmap-title">{c.title}</title>
        <desc id="roadmap-desc">{c.desc}</desc>

        <text x="28" y="36" fontSize="13" className="fill-gray-500" style={rise(shown, 0)}>{c.subjects}</text>
        {c.pms.map((pm, i) => (
          <text key={pm} x={[30, 126, 226][i]} y="70" fontSize="13" fontWeight="500" className="fill-gray-600" style={rise(shown, 60)}>{pm}</text>
        ))}
        {PM_PILLS.map((pills, p) =>
          pills.map(([x, y, w]) => (
            <rect key={`${p}-${y}`} x={x} y={y} width={w} height="22" rx="11" fill="#FFFFFF" stroke={LINE} style={rise(shown, 100 + pill++ * 35)} />
          ))
        )}

        {/* The subjects converge into one structure */}
        {[120, 178, 240].map((y, i) => (
          <path key={y} d={`M322 ${y} C400 ${y} 420 178 ${470} 178`} pathLength={1} fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" style={draw(shown, 650 + i * 80, 800)} />
        ))}
        <Arrowhead x={474} y={178} angle={0} style={rise(shown, 1300)} />

        {c.levels.map((level, i) => (
          <text key={level} x="492" y={[86, 150, 212, 274][i]} fontSize="13" fontWeight={i === 0 ? 600 : 500} fill={i === 0 ? INK : undefined} className={i === 0 ? '' : 'fill-gray-600'} style={rise(shown, 950 + i * 120)}>
            {level}
          </text>
        ))}
        <rect x={X} y="66" width={W} height="28" rx="8" fill={INK} style={grow(shown, 950, 600)} />
        {row(3, 8).map((b, i) => (
          <rect key={i} x={b.x} y="130" width={b.w} height="28" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" style={grow(shown, 1070 + i * 60, 500)} />
        ))}
        {row(6, 8).map((b, i) => (
          <rect key={i} x={b.x} y="194" width={b.w} height="24" rx="7" fill={LINE} style={grow(shown, 1190 + i * 40, 450)} />
        ))}
        {row(12, 6).map((b, i) => (
          <rect key={i} x={b.x} y="256" width={b.w} height="20" rx="5" fill={PALE} style={grow(shown, 1310 + i * 25, 400)} />
        ))}
        <text x="930" y="318" textAnchor="end" fontSize="13" fontWeight="500" fill={INK} style={rise(shown, 1700)}>{c.result}</text>
        {[120, 178, 240].map((y, i) => (
          <Runner key={`run${y}`} d={`M322 ${y} C400 ${y} 420 178 470 178`} p={travel(seg(t, i * 1200, 900))} tone={INK} />
        ))}
        {row(3, 8).map((b, i) => (
          <rect key={`lit${i}`} x={b.x} y="130" width={b.w} height="28" rx="8" fill={INK} style={{ opacity: 0.85 * flash(t, i * 1200 + 900, 900) }} />
        ))}
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// A shared design calendar: initiatives in lanes, the stages of each one, ready for the sprint
// ---------------------------------------------------------------------------

const WEEK_X0 = 200
const WEEK = 62
const wx = (week: number) => WEEK_X0 + week * WEEK

function WeekAxis({ label, shown }: { label: string; shown: boolean }) {
  return (
    <g style={rise(shown, 0)}>
      <text x="28" y="40" fontSize="13" className="fill-gray-500">{label}</text>
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <text x={wx(i) + WEEK / 2} y="40" textAnchor="middle" fontSize="12" className="fill-gray-400">{i + 1}</text>
          <line x1={wx(i)} y1="54" x2={wx(i)} y2="352" stroke={GRID} />
        </g>
      ))}
      <line x1={wx(12)} y1="54" x2={wx(12)} y2="352" stroke={GRID} />
    </g>
  )
}

const STAGE_FILL = [PALE, LINE, '#9CA3AF', '#4B5563']
const STAGE_TEXT = ['#374151', '#374151', '#FFFFFF', '#FFFFFF']
const STAGE_WEEKS = [2, 2, 1.25, 1.25]
const LANE_START = [0, 1.5, 3, 4.5]

export function DesignCalendarDiagram({ lang }: { lang: Language }) {
  const c = ROADMAP[lang].calendarDiagram
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()

  return (
    <Panel minWidth={760}>
      <svg ref={ref} viewBox="0 0 960 380" role="img" aria-labelledby="calendar-title calendar-desc" className="block h-auto w-full">
        <title id="calendar-title">{c.title}</title>
        <desc id="calendar-desc">{c.desc}</desc>
        <WeekAxis label={c.weeks} shown={shown} />

        {c.lanes.map((lane, l) => {
          const y = 90 + l * 52
          let week = LANE_START[l]
          return (
            <g key={lane}>
              <text x="28" y={y + 5} fontSize="13" fontWeight="500" className="fill-gray-700" style={rise(shown, 100 + l * 120)}>{lane}</text>
              {STAGE_WEEKS.map((weeks, s) => {
                const x = wx(week) + 1
                const w = weeks * WEEK - 2
                week += weeks
                return (
                  <g key={s} style={grow(shown, 250 + l * 150 + s * 110, 480)}>
                    <rect x={x} y={y - 14} width={w} height="28" rx="6" fill={STAGE_FILL[s]} />
                    {l === 0 && (
                      <text x={x + 8} y={y + 4} fontSize="11" fontWeight="500" fill={STAGE_TEXT[s]}>{c.stages[s]}</text>
                    )}
                  </g>
                )
              })}
              <Diamond x={wx(week) + 14} y={y} style={rise(shown, 800 + l * 150)} />
              {l === 0 && (
                <text x={wx(week) + 28} y={y + 4} fontSize="12" fontWeight="500" fill={INK} style={rise(shown, 900)}>{c.ready}</text>
              )}
            </g>
          )
        })}

        {/* A design initiative has its place on the same calendar */}
        <line x1="28" y1="280" x2={wx(12)} y2="280" stroke={PALE} style={rise(shown, 1100)} />
        <text x="28" y="318" fontSize="13" fontWeight="500" fill={INK} style={rise(shown, 1150)}>{c.designLane}</text>
        <g style={grow(shown, 1250, 700)}>
          <rect x={wx(0.5)} y="299" width={5.5 * WEEK} height="30" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={wx(0.5) + 12} y="318" fontSize="12" fontWeight="500" className="fill-gray-700">{c.designBar}</text>
        </g>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// Maturity: what I carry upstream of the screen, by team maturity
// ---------------------------------------------------------------------------

export function MaturityDiagram({ lang }: { lang: Language }) {
  const c = MATURITY_DIAGRAM[lang]
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: as maturity rises, the framing I carry goes down and the design goes up
  const t = useLoop(shown, 7400)
  const m = 0.002 + 0.996 * travel(seg(t, 0, 5000))
  const mVis = t == null ? 0 : Math.min(seg(t, 0, 300), 1 - seg(t, 6600, 600))
  const stageX = [150, 480, 810]

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 290" role="img" aria-labelledby="maturity-title maturity-desc" className="block h-auto w-full">
        <title id="maturity-title">{c.title}</title>
        <desc id="maturity-desc">{c.desc}</desc>

        <line x1="40" y1="224" x2="920" y2="224" stroke={PALE} pathLength={1} style={draw(shown, 0, 700)} />
        {stageX.map((x, i) => (
          <g key={x} style={rise(shown, 150 + i * 120)}>
            <circle cx={x} cy="224" r="3.5" fill={LINE} />
            <text x={x} y="256" textAnchor="middle" fontSize="13" className="fill-gray-600">{c.stages[i]}</text>
          </g>
        ))}

        <path d="M150 196 C330 196 630 84 810 84" pathLength={1} fill="none" stroke={LINE} strokeWidth="2.25" strokeLinecap="round" style={draw(shown, 250, 1100)} />
        <circle cx="810" cy="84" r="5" fill={LINE} style={rise(shown, 1200)} />
        <text x="920" y="56" textAnchor="end" fontSize="13" className="fill-gray-500" style={rise(shown, 1200)}>{c.onScreen}</text>

        <path d="M150 84 C330 84 630 196 810 196" pathLength={1} fill="none" stroke={INK} strokeWidth="2.25" strokeLinecap="round" style={draw(shown, 450, 1100)} />
        <circle cx="150" cy="84" r="5" fill={INK} style={rise(shown, 450)} />
        <circle cx="810" cy="196" r="4" fill={INK} style={rise(shown, 1400)} />
        <text x="40" y="56" fontSize="13" fontWeight="600" fill={INK} style={rise(shown, 450)}>{c.upstream}</text>
        <g style={{ opacity: mVis }}>
          <line x1={150 + 660 * m} y1="70" x2={150 + 660 * m} y2="224" stroke={INK} strokeOpacity="0.14" strokeWidth="1.5" />
          <rect x={150 + 660 * m - 5} y="219" width="10" height="10" rx="3" fill={INK} />
          <Runner d="M150 196 C330 196 630 84 810 84" p={m} tone="#9CA3AF" r={6} />
          <Runner d="M150 84 C330 84 630 196 810 196" p={m} tone={INK} r={6} />
        </g>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// Deliverables from the least defined to the most precise
// ---------------------------------------------------------------------------

export function FidelityDiagram({ lang }: { lang: Language }) {
  const c = FIDELITY_DIAGRAM[lang]
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: the detail climbs, from the framing note to the specs
  const t = useLoop(shown, 6000, 2200)
  const points = [
    { x: 90, y: 200 },
    { x: 285, y: 180 },
    { x: 480, y: 146 },
    { x: 675, y: 104 },
    { x: 870, y: 54 },
  ]

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 300" role="img" aria-labelledby="fidelity-title fidelity-desc" className="block h-auto w-full">
        <title id="fidelity-title">{c.title}</title>
        <desc id="fidelity-desc">{c.desc}</desc>

        <line x1="40" y1="224" x2="920" y2="224" stroke={PALE} pathLength={1} style={draw(shown, 0, 700)} />
        {points.map((p, i) => (
          <g key={p.x} style={rise(shown, 300 + i * 200)}>
            <line x1={p.x} y1={p.y} x2={p.x} y2="224" stroke={LINE} strokeDasharray="2 4" />
            <circle cx={p.x} cy="224" r="3" fill={LINE} />
            <text x={p.x} y="252" textAnchor="middle" fontSize="13" className="fill-gray-600">{c.stages[i]}</text>
          </g>
        ))}
        <text x={points[0].x} y="272" textAnchor="middle" fontSize="12" className="fill-gray-400" style={rise(shown, 400)}>{c.slow}</text>
        <text x={points[3].x} y="272" textAnchor="middle" fontSize="12" className="fill-gray-400" style={rise(shown, 1000)}>{c.fast}</text>

        <path
          d="M90 200 C160 200 220 184 285 180 C350 176 420 154 480 146 C545 137 610 114 675 104 C745 93 810 64 870 54"
          pathLength={1}
          fill="none"
          stroke={INK}
          strokeWidth="2.25"
          strokeLinecap="round"
          style={draw(shown, 250, 1400)}
        />
        {points.map((p, i) => (
          <circle key={p.x} cx={p.x} cy={p.y} r={i === points.length - 1 ? 7 : 4.5} fill={INK} style={rise(shown, 350 + i * 220)} />
        ))}
        <text x="40" y="60" fontSize="14" fontWeight="600" fill={INK} style={rise(shown, 200)}>{c.curve}</text>
        <Runner d="M90 200 C160 200 220 184 285 180 C350 176 420 154 480 146 C545 137 610 114 675 104 C745 93 810 64 870 54" p={travel(seg(t, 0, 4200))} tone={INK} r={7} />
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// Sketching to move discussions forward
// ---------------------------------------------------------------------------

/** Threads of a discussion that cross for weeks, each starting from a voice, and converge where the diagram starts */
const THREADS: { d: string; tone: string }[] = [
  { d: 'M44 120 C110 60 180 210 250 120 S330 150 374 150', tone: '#C7CBD1' },
  { d: 'M50 200 C120 120 170 60 240 170 S330 150 374 150', tone: '#D5D8DD' },
  { d: 'M60 80 C150 140 120 220 220 190 S320 150 374 150', tone: '#C7CBD1' },
  { d: 'M70 160 C140 230 230 50 290 140 S330 150 374 150', tone: '#DDE0E4' },
  { d: 'M48 150 C130 100 200 140 240 80 S320 150 374 150', tone: '#D5D8DD' },
  { d: 'M90 226 C150 170 210 230 270 200 S320 150 374 150', tone: '#C7CBD1' },
]

/** The diagram the threads resolve into: a start, a step, a decision with its way back, a step, an end */
const SKETCH = {
  y: 150,
  start: 622,
  step1: { x: 660, w: 72 },
  decision: 790,
  step2: { x: 830, w: 64 },
  end: 916,
}
const SKETCH_PATH = `M${SKETCH.start} ${SKETCH.y} L${SKETCH.end} ${SKETCH.y}`
const LOOP_BACK = `M${SKETCH.decision} ${SKETCH.y + 11} C${SKETCH.decision} 198 ${SKETCH.step1.x + SKETCH.step1.w / 2} 198 ${SKETCH.step1.x + SKETCH.step1.w / 2} ${SKETCH.y + 20}`

/** A label on the drawing: small, quiet, rising out of a light blur as it arrives */
const annotate = (shown: boolean, delay: number): React.CSSProperties => ({
  ...rise(shown, delay),
  filter: shown ? 'blur(0px)' : 'blur(2px)',
  transition: `${rise(shown, delay).transition}, filter 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
})

export function ConceptDiagram({ lang }: { lang: Language }) {
  const c = CONCEPT[lang].diagram
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: the discussion becomes a diagram, then a point walks it and the end answers like a touch
  const t = useLoop(shown, 6400, 2600)
  const walk = travel(seg(t, 1000, 2600))
  const at = SKETCH.start + (SKETCH.end - SKETCH.start) * walk
  const reached = (x: number) => (t != null && seg(t, 1000, 2600) > 0 && at >= x - 2 ? flash(t, 1000 + ((x - SKETCH.start) / (SKETCH.end - SKETCH.start)) * 2600 * 0.9, 900) : 0)
  const [problem, flow, journey, interaction] = c.nodes
  const { y, step1, decision, step2 } = SKETCH
  const line = '#9CA3AF'

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 300" role="img" aria-labelledby="concept-title concept-desc" className="block h-auto w-full">
        <title id="concept-title">{c.title}</title>
        <desc id="concept-desc">{c.desc}</desc>

        {/* Weeks of discussion: threads that cross, each from a voice */}
        {THREADS.map((th, i) => (
          <g key={i}>
            <path d={th.d} pathLength={1} fill="none" stroke={th.tone} strokeWidth="1.5" strokeLinecap="round" style={draw(shown, i * 90, 1100)} />
            <circle cx={Number(th.d.split(' ')[0].slice(1))} cy={Number(th.d.split(' ')[1])} r="3.5" fill="#9CA3AF" style={rise(shown, i * 90)} />
          </g>
        ))}
        <circle cx="376" cy="150" r="3" fill="#9CA3AF" style={rise(shown, 900)} />
        <text x="200" y="272" textAnchor="middle" fontSize="13" className="fill-gray-500" style={annotate(shown, 700)}>{c.before}</text>

        {/* A diagram */}
        <path d="M392 150 C440 110 520 110 568 146" pathLength={1} fill="none" stroke={INK} strokeWidth="1.75" strokeLinecap="round" style={draw(shown, 900, 700)} />
        <Arrowhead x={571} y={148} angle={36} style={rise(shown, 1500)} />
        <text x="480" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill={INK} style={annotate(shown, 1000)}>{c.arrow}</text>
        <Runner d="M392 150 C440 110 520 110 568 146" p={travel(seg(t, 0, 900))} tone={INK} />

        {/* A shared understanding: one diagram, its parts named quietly */}
        <path d={SKETCH_PATH} pathLength={1} fill="none" stroke={line} strokeWidth="1.25" style={draw(shown, 1300, 900)} />
        <path d={LOOP_BACK} fill="none" stroke={line} strokeWidth="1.25" strokeDasharray="3 4" style={rise(shown, 1900)} />
        <Arrowhead x={step1.x + step1.w / 2} y={y + 18} angle={-90} style={rise(shown, 2000)} />

        <g style={rise(shown, 1300)}>
          <circle cx={SKETCH.start} cy={y} r="6" fill={INK} />
        </g>
        <g style={rise(shown, 1450)}>
          <rect x={step1.x} y={y - 15} width={step1.w} height="30" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="1.25" />
          <rect x={step1.x} y={y - 15} width={step1.w} height="30" rx="8" fill={INK} style={{ opacity: 0.85 * reached(step1.x) }} />
        </g>
        <g style={rise(shown, 1600)}>
          <rect x={decision - 10} y={y - 10} width="20" height="20" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.25" transform={`rotate(45 ${decision} ${y})`} />
          <rect x={decision - 10} y={y - 10} width="20" height="20" rx="3" fill={INK} transform={`rotate(45 ${decision} ${y})`} style={{ opacity: 0.85 * reached(decision - 10) }} />
        </g>
        <g style={rise(shown, 1750)}>
          <rect x={step2.x} y={y - 15} width={step2.w} height="30" rx="8" fill="#FFFFFF" stroke={INK} strokeWidth="1.25" />
          <rect x={step2.x} y={y - 15} width={step2.w} height="30" rx="8" fill={INK} style={{ opacity: 0.85 * reached(step2.x) }} />
        </g>
        <g style={rise(shown, 1900)}>
          <circle cx={SKETCH.end} cy={y} r="7" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          <circle cx={SKETCH.end} cy={y} r="3" fill={INK} />
        </g>
        {/* The end answers like a touch */}
        <circle cx={SKETCH.end} cy={y} r="9" fill="none" stroke={INK} strokeWidth="1.5" style={{ opacity: 0.5 * flash(t, 3600, 1100), transform: `scale(${1 + 1.4 * seg(t, 3600, 1100)})`, transformBox: 'fill-box', transformOrigin: 'center' }} />
        {t != null && walk > 0 && walk < 1 && <circle cx={at} cy={y} r="4" fill={INK} />}

        {/* The four words, as quiet annotations of the parts */}
        {[
          { x: SKETCH.start, yy: y + 34, text: problem, anchor: 'middle' as const, d: 2100 },
          { x: (step1.x + step1.w + decision) / 2 - 4, yy: y - 26, text: flow, anchor: 'middle' as const, d: 2200 },
          { x: (decision + step2.x + step2.w) / 2 + 6, yy: y - 26, text: journey, anchor: 'middle' as const, d: 2300 },
          { x: SKETCH.end, yy: y + 34, text: interaction, anchor: 'middle' as const, d: 2400 },
        ].map((n) => (
          <text key={n.text} x={n.x} y={n.yy} textAnchor={n.anchor} fontSize="11" letterSpacing="0.04em" className="fill-gray-500" style={annotate(shown, n.d)}>
            {n.text.toLowerCase()}
          </text>
        ))}
        <text x="770" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill={INK} style={annotate(shown, 2500)}>{c.after}</text>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// A rhythm over several horizons
// ---------------------------------------------------------------------------

export function RhythmDiagram({ lang }: { lang: Language }) {
  const c = RHYTHM_DIAGRAM[lang]
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  const laneY = [96, 172, 248, 324]
  const SPRINT = 2 * WEEK

  return (
    <Panel minWidth={760}>
      <svg ref={ref} viewBox="0 0 960 384" role="img" aria-labelledby="rhythm-title rhythm-desc" className="block h-auto w-full">
        <title id="rhythm-title">{c.title}</title>
        <desc id="rhythm-desc">{c.desc}</desc>
        <WeekAxis label={c.weeks} shown={shown} />

        {c.lanes.map((lane, i) => (
          <text key={lane} x="28" y={laneY[i] + 5} fontSize="13" fontWeight="500" className="fill-gray-700" style={rise(shown, 100 + i * 80)}>{lane}</text>
        ))}

        {/* Framing, over several weeks */}
        <g style={grow(shown, 250, 800)}>
          <rect x={wx(0) + 1} y={laneY[0] - 15} width={4 * WEEK - 2} height="30" rx="6" fill={PALE} />
          <text x={wx(0) + 12} y={laneY[0] + 4} fontSize="12" fontWeight="500" className="fill-gray-700">{c.framingNote}</text>
        </g>
        <g style={grow(shown, 650, 700)}>
          <rect x={wx(8) + 1} y={laneY[0] - 15} width={4 * WEEK - 2} height="30" rx="6" fill={PALE} />
          <text x={wx(8) + 12} y={laneY[0] + 4} fontSize="12" fontWeight="500" className="fill-gray-700">{c.roadmapUpdate}</text>
        </g>

        {/* Discovery: a research calendar, then an initiative */}
        <g style={grow(shown, 400, 800)}>
          <rect x={wx(1) + 1} y={laneY[1] - 15} width={4 * WEEK - 2} height="30" rx="6" fill="#FFFFFF" stroke="#9CA3AF" strokeDasharray="5 4" />
          <text x={wx(1) + 12} y={laneY[1] + 4} fontSize="12" fontWeight="500" className="fill-gray-700">{c.research}</text>
        </g>
        <g style={grow(shown, 750, 800)}>
          <rect x={wx(6) + 1} y={laneY[1] - 15} width={4 * WEEK - 2} height="30" rx="6" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1.25" />
          <text x={wx(6) + 12} y={laneY[1] + 4} fontSize="12" fontWeight="500" className="fill-gray-700">{c.discovery}</text>
        </g>
        {/* The prototype is one moment of the initiative, when the question calls for it */}
        <g style={rise(shown, 1500)}>
          <Diamond x={wx(8.6)} y={laneY[1] - 32} size={10} filled={false} tone="#6B7280" />
          <text x={wx(8.6) + 12} y={laneY[1] - 28} fontSize="11" className="fill-gray-600">{c.prototype}</text>
        </g>

        {/* Delivery, sprint after sprint, each one prepared by a refinement */}
        {Array.from({ length: 6 }, (_, k) => (
          <g key={k} style={grow(shown, 500 + k * 90, 450)}>
            <rect x={wx(0) + k * SPRINT + 3} y={laneY[2] - 15} width={SPRINT - 6} height="30" rx="6" fill="#FFFFFF" stroke={LINE} />
            <text x={wx(0) + k * SPRINT + 14} y={laneY[2] + 4} fontSize="12" className="fill-gray-600">{`${c.sprint} ${k + 1}`}</text>
          </g>
        ))}
        {Array.from({ length: 5 }, (_, k) => (
          <circle key={k} cx={wx(0) + (k + 1) * SPRINT} cy={laneY[2]} r="4.5" fill="#6B7280" style={rise(shown, 1000 + k * 70)} />
        ))}
        <text x={wx(0) + SPRINT} y={laneY[2] - 24} textAnchor="middle" fontSize="11" className="fill-gray-600" style={rise(shown, 1050)}>{c.refinement}</text>

        {/* Discovery feeds delivery */}
        <path d={`M${wx(5) - 6} ${laneY[1] + 15} C${wx(5) + 10} ${laneY[1] + 40} ${wx(6) - 30} ${laneY[2] - 44} ${wx(6) + 14} ${laneY[2] - 19}`} pathLength={1} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" style={draw(shown, 1300, 600)} />
        <Arrowhead x={wx(6) + 16} y={laneY[2] - 18} angle={40} style={rise(shown, 1800)} />
        <path d={`M${wx(10) - 6} ${laneY[1] + 15} C${wx(10) + 6} ${laneY[1] + 40} ${wx(10)} ${laneY[2] - 44} ${wx(10) + 26} ${laneY[2] - 19}`} pathLength={1} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" style={draw(shown, 1450, 600)} />
        <Arrowhead x={wx(10) + 28} y={laneY[2] - 18} angle={40} style={rise(shown, 1950)} />
        <text x={wx(6) + 36} y={laneY[2] - 26} fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 1700)}>{c.feeds}</text>

        {/* Every week */}
        {Array.from({ length: 12 }, (_, w) => (
          <rect key={w} x={wx(w) + WEEK / 2 - 4} y={laneY[3] - 12} width="8" height="24" rx="4" fill="#9CA3AF" style={rise(shown, 900 + w * 30)} />
        ))}
        <text x={wx(0)} y={laneY[3] + 36} fontSize="12" className="fill-gray-600" style={rise(shown, 1300)}>{c.weekly}</text>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// From a vision prototype to deliverable lots: the prototype is the only thing in colour, the high fidelity
// it stands for; taken apart with the squad, it becomes a story map sliced into lots that join the roadmap
// ---------------------------------------------------------------------------

/** Stories under each activity of the backbone, by lot */
const STORIES = [
  [1, 1, 1, 1, 1],
  [2, 1, 2, 1, 2],
  [1, 2, 0, 1, 1],
]

export function VisionToLotsDiagram({ lang }: { lang: Language }) {
  const c = ROADMAP[lang].visionDiagram
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: the prototype is taken apart, the first lot is sliced story by story, then it ships
  const t = useLoop(shown, 6800, 2600)
  const MX = 430
  const COL = 92
  const GAP = 8
  const colX = (j: number) => MX + j * (COL + GAP)
  const bandTop = [108, 160, 236]
  let card = 0

  return (
    <Panel minWidth={760}>
      <svg ref={ref} viewBox="0 0 960 360" role="img" aria-labelledby="vision-title vision-desc" className="block h-auto w-full">
        <title id="vision-title">{c.title}</title>
        <desc id="vision-desc">{c.desc}</desc>

        {/* The vision prototype: colour, motion, most of the experience */}
        <g style={open(shown, 0)}>
          <rect x="62" y="40" width="132" height="244" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="1.75" />
          <rect x="108" y="50" width="40" height="8" rx="4" fill={INK} />
        </g>
        {[
          <rect key="h" x="76" y="70" width="70" height="10" rx="5" fill="#111827" />,
          <rect key="c" x="76" y="90" width="104" height="62" rx="10" fill="#C7D2FE" />,
          <circle key="cd" cx="96" cy="112" r="9" fill="#6366F1" />,
          <rect key="r1" x="76" y="164" width="104" height="18" rx="6" fill="#FDE68A" />,
          <rect key="r2" x="76" y="188" width="104" height="18" rx="6" fill="#BBF7D0" />,
          <rect key="r3" x="76" y="212" width="104" height="18" rx="6" fill="#FBCFE8" />,
          <rect key="b" x="76" y="246" width="104" height="24" rx="12" fill="#4F46E5" />,
        ].map((el, i) => (
          <g key={i} style={rise(shown, 150 + i * 70)}>{el}</g>
        ))}
        {/* A micro-interaction: the finger on the button, its ring spreading */}
        <circle cx="150" cy="258" r="13" fill="none" stroke="#4F46E5" strokeOpacity="0.35" strokeWidth="2" style={rise(shown, 800)} />
        <g style={rise(shown, 650)}>
          <text x="128" y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill={INK}>{c.prototype}</text>
          <text x="128" y="332" textAnchor="middle" fontSize="12" className="fill-gray-500">{c.prototypeDesc}</text>
        </g>

        {/* Taken apart with the squad */}
        <path d="M214 170 C262 122 318 122 352 158" pathLength={1} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" style={draw(shown, 900, 700)} />
        <Arrowhead x={355} y={161} angle={44} style={rise(shown, 1500)} />
        <text x="284" y="112" textAnchor="middle" fontSize="13" fontWeight="600" fill={INK} style={rise(shown, 1000)}>{c.undesign}</text>

        {/* The story map: the backbone of activities, the stories under them, sliced into lots */}
        <text x={MX} y="44" fontSize="13" className="fill-gray-500" style={rise(shown, 1100)}>{c.storymap}</text>
        {[0, 1, 2, 3, 4].map((j) => (
          <rect key={j} x={colX(j)} y="58" width={COL} height="30" rx="7" fill="#4B5563" style={grow(shown, 1150 + j * 60, 400)} />
        ))}
        {c.lots.map((lot, l) => (
          <g key={lot}>
            <text x="372" y={bandTop[l] + 17} fontSize="12" fontWeight={l === 0 ? 600 : 500} fill={l === 0 ? INK : undefined} className={l === 0 ? '' : 'fill-gray-500'} style={rise(shown, 1500 + l * 150)}>
              {lot}
            </text>
            {l > 0 && <line x1="372" y1={bandTop[l] - 8} x2={colX(4) + COL} y2={bandTop[l] - 8} stroke="#9CA3AF" strokeDasharray="4 4" pathLength={1} style={draw(shown, 1500 + l * 150, 500)} />}
            {STORIES[l].map((count, j) =>
              Array.from({ length: count }, (_, k) => (
                <rect
                  key={`${l}-${j}-${k}`}
                  x={colX(j) + 4}
                  y={bandTop[l] + k * 32}
                  width={COL - 8}
                  height="24"
                  rx="6"
                  fill={l === 0 ? '#FFFFFF' : PALE}
                  stroke={l === 0 ? INK : 'none'}
                  strokeWidth="1.5"
                  style={rise(shown, 1550 + l * 150 + card++ * 25)}
                />
              ))
            )}
          </g>
        ))}

        {/* The lots join the roadmap, one after the other */}
        <text x={MX} y="306" fontSize="12" className="fill-gray-600" style={rise(shown, 2100)}>{c.roadmap}</text>
        {[
          { x: MX, w: 150, fill: INK, text: '#FFFFFF' },
          { x: MX + 158, w: 170, fill: LINE, text: '#374151' },
          { x: MX + 336, w: 164, fill: PALE, text: '#374151' },
        ].map((seg, i) => (
          <g key={i} style={grow(shown, 2150 + i * 150, 500)}>
            <rect x={seg.x} y="316" width={seg.w} height="30" rx="7" fill={seg.fill} />
            <text x={seg.x + 12} y="335" fontSize="12" fontWeight="500" fill={seg.text}>{c.lots[i]}</text>
          </g>
        ))}
        <Runner d="M214 170 C262 122 318 122 352 158" p={travel(seg(t, 0, 1000))} tone={INK} />
        {[0, 1, 2, 3, 4].map((j) => (
          <rect key={`slice${j}`} x={colX(j) + 4} y={bandTop[0]} width={COL - 8} height="24" rx="6" fill={INK} style={{ opacity: 0.85 * flash(t, 1100 + j * 220, 800) }} />
        ))}
        <rect x={MX} y="316" width="150" height="30" rx="7" fill="none" stroke={INK} strokeWidth="2" style={{ opacity: flash(t, 2400, 1200) }} />
        <circle cx="150" cy="258" r="13" fill="none" stroke="#4F46E5" strokeWidth="2" style={{ opacity: 0.5 * flash(t, 0, 900), transform: `scale(${1 + 0.6 * seg(t, 0, 900)})`, transformBox: 'fill-box', transformOrigin: 'center' }} />
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// One source, two outputs: the design system rules, read by Claude Code, give Figma mockups and a React
// prototype that answer each other both ways
// ---------------------------------------------------------------------------

export function SourceDiagram({ lang }: { lang: Language }) {
  const c = V2_PROTOTYPING[lang].diagram
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: the rules reach the agent, which gives both outputs at once; they answer each other
  const t = useLoop(shown, 5200, 2200)

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 300" role="img" aria-labelledby="source-title source-desc" className="block h-auto w-full">
        <title id="source-title">{c.title}</title>
        <desc id="source-desc">{c.desc}</desc>

        {/* The source */}
        <g style={rise(shown, 0)}>
          <rect x="30" y="72" width="230" height="156" rx="16" fill="#FFFFFF" stroke={LINE} />
          <text x="54" y="108" fontSize="14" fontWeight="600" fill={INK}>{c.source}</text>
        </g>
        {c.rules.map((rule, i) => (
          <g key={rule} style={rise(shown, 120 + i * 80)}>
            <rect x="54" y={126 + i * 30} width="182" height="22" rx="6" fill={PALE} />
            <text x="66" y={141 + i * 30} fontSize="12" className="fill-gray-700">{rule}</text>
          </g>
        ))}

        {/* Read by the agent */}
        <path d="M262 150 L388 150" pathLength={1} fill="none" stroke="#9CA3AF" strokeWidth="1.5" style={draw(shown, 450, 500)} />
        <Arrowhead x={392} y={150} angle={0} style={rise(shown, 900)} />
        <g style={rise(shown, 650)}>
          <rect x="398" y="128" width="148" height="44" rx="22" fill={INK} />
          <text x="472" y="155" textAnchor="middle" fontSize="13" fontWeight="600" fill="#FFFFFF">{c.agent}</text>
        </g>

        {/* Two outputs */}
        <path d="M546 142 C590 142 590 86 630 86" pathLength={1} fill="none" stroke={INK} strokeWidth="1.75" strokeLinecap="round" style={draw(shown, 950, 600)} />
        <Arrowhead x={634} y={86} angle={0} style={rise(shown, 1500)} />
        <path d="M546 158 C590 158 590 214 630 214" pathLength={1} fill="none" stroke={INK} strokeWidth="1.75" strokeLinecap="round" style={draw(shown, 1050, 600)} />
        <Arrowhead x={634} y={214} angle={0} style={rise(shown, 1600)} />
        {[
          { y: 40, name: c.figma, desc: c.figmaDesc },
          { y: 168, name: c.react, desc: c.reactDesc },
        ].map((o, i) => (
          <g key={o.name} style={rise(shown, 1200 + i * 150)}>
            <rect x="640" y={o.y} width="290" height="92" rx="16" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
            <text x="664" y={o.y + 40} fontSize="15" fontWeight="600" fill={INK}>{o.name}</text>
            <text x="664" y={o.y + 64} fontSize="13" className="fill-gray-500">{o.desc}</text>
          </g>
        ))}

        <Runner d="M262 150 L388 150" p={travel(seg(t, 0, 700))} tone="#6B7280" />
        <rect x="398" y="128" width="148" height="44" rx="22" fill="none" stroke={INK} strokeWidth="2" style={{ opacity: 0.4 * flash(t, 700, 700), transform: `scale(${1 + 0.12 * seg(t, 700, 700)})`, transformBox: 'fill-box', transformOrigin: 'center' }} />
        <Runner d="M546 142 C590 142 590 86 630 86" p={travel(seg(t, 1100, 800))} tone={INK} />
        <Runner d="M546 158 C590 158 590 214 630 214" p={travel(seg(t, 1100, 800))} tone={INK} />
        {[40, 168].map((y) => (
          <rect key={`out${y}`} x="640" y={y} width="290" height="92" rx="16" fill="none" stroke={INK} strokeWidth="2.5" style={{ opacity: flash(t, 1900, 900) }} />
        ))}
        <Runner d="M900 136 L900 164" p={travel(seg(t, 2800, 500))} tone="#6B7280" r={4} />
        <Runner d="M900 164 L900 136" p={travel(seg(t, 3300, 500))} tone="#6B7280" r={4} />

        {/* They answer each other */}
        <path d="M900 136 L900 164" pathLength={1} fill="none" stroke="#6B7280" strokeWidth="1.5" style={draw(shown, 1700, 300)} />
        <Arrowhead x={900} y={134} angle={-90} style={rise(shown, 1900)} />
        <Arrowhead x={900} y={166} angle={90} style={rise(shown, 1900)} />
        <text x="886" y="154" textAnchor="end" fontSize="12" className="fill-gray-500" style={rise(shown, 1900)}>{c.both}</text>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// Two cycles that feed each other, over twelve weeks: discovery cycles above, sprints below, as joined pills
// on the grid of the weeks. Once drawn, a playhead walks the weeks and each pill fills with ink as time goes
// through it, then stays grey once done; a dot runs along each arrow as the playhead reaches it. It loops,
// pauses off screen, and stays still with reduced motion.
// ---------------------------------------------------------------------------

const CY = { x0: 210, step: 60, discTop: 88, deliTop: 192, h: 34, axis: 270 }
const cx = (week: number) => CY.x0 + week * CY.step
const DISCOVERY_CYCLES: [number, number][] = [[0, 4], [4, 8], [8, 12]]
const SPRINTS: [number, number][] = [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, 12]]
/** Discovery feeds the sprint that starts as it ends; a sprint's learning goes up as it ends */
const FEEDS = [4, 8]
const LEARNS = [6, 10]
const WEEK_MS = 1000
const HOLD_MS = 1600
const DISC_BOTTOM = CY.discTop + CY.h
/** A clean S between the two lanes: vertical where it leaves, vertical where it lands */
const sCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (y1 + y2) / 2
  return `M${x1} ${y1} C${x1} ${m} ${x2} ${m} ${x2} ${y2}`
}
const feedPath = (w: number) => sCurve(cx(w) - 16, DISC_BOTTOM + 4, cx(w) + 16, CY.deliTop - 8)
const learnPath = (w: number) => sCurve(cx(w) - 16, CY.deliTop - 4, cx(w) + 16, DISC_BOTTOM + 8)

/** A dot running along a path, at share p of its length */
function Runner({ d, p, tone, r = 5 }: { d: string; p: number; tone: string; r?: number }) {
  const ref = React.useRef<SVGPathElement>(null)
  const [pt, setPt] = React.useState<{ x: number; y: number } | null>(null)
  React.useEffect(() => {
    const path = ref.current
    if (!path || p <= 0 || p >= 1) return setPt(null)
    const at = path.getPointAtLength(path.getTotalLength() * p)
    setPt({ x: at.x, y: at.y })
  }, [p, d])
  return (
    <>
      <path ref={ref} d={d} fill="none" stroke="none" />
      {pt && <circle cx={pt.x} cy={pt.y} r={r} fill={tone} style={{ opacity: Math.sin(Math.PI * p) * 0.6 + 0.4 }} />}
    </>
  )
}

/** One cycle as a pill: empty ahead of the playhead, filling with ink while it runs, grey once done */
function CyclePill({ span, top, week, shown, delay, clip }: { span: [number, number]; top: number; week: number | null; shown: boolean; delay: number; clip: string }) {
  const [a, b] = span
  const x = cx(a) + 3
  const w = (b - a) * CY.step - 6
  const done = week != null && week >= b
  const share = week == null || week < a ? 0 : Math.min(1, (week - a) / (b - a))
  return (
    <g style={grow(shown, delay, 500)}>
      <clipPath id={clip}>
        <rect x={x} y={top} width={w} height={CY.h} rx={CY.h / 2} />
      </clipPath>
      <rect x={x} y={top} width={w} height={CY.h} rx={CY.h / 2} fill="#FFFFFF" stroke={LINE} />
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={top} width={w * share} height={CY.h} fill={done ? LINE : INK} style={{ transition: 'fill 400ms ease-out' }} />
      </g>
    </g>
  )
}

export function CyclesDiagram({ lang }: { lang: Language }) {
  const c = V2_CYCLES[lang].diagram
  const uid = React.useId().replace(/:/g, '')
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  const t = useLoop(shown, 12 * WEEK_MS + HOLD_MS, 2000)
  const week = t == null ? null : Math.min(12, t / WEEK_MS)
  const live = week != null && week < 12
  const run = (from: number, span = 0.8) => (week != null && week >= from && week < from + span ? travel((week - from) / span) : 0)

  return (
    <Panel minWidth={760}>
      <svg ref={ref} viewBox="0 0 960 300" role="img" aria-labelledby="cycles-title cycles-desc" className="block h-auto w-full">
        <title id="cycles-title">{c.title}</title>
        <desc id="cycles-desc">{c.desc}</desc>

        {/* The two lanes, named on the left */}
        {[
          { top: CY.discTop, name: c.discovery, steps: c.discoverySteps, pace: c.discoveryPace },
          { top: CY.deliTop, name: c.delivery, steps: c.deliverySteps, pace: c.deliveryPace },
        ].map((lane, i) => (
          <g key={lane.name} style={rise(shown, i * 150)}>
            <text x="28" y={lane.top + 12} fontSize="15" fontWeight="600" fill={INK}>{lane.name}</text>
            <text x="28" y={lane.top + 31} fontSize="12" className="fill-gray-600">{lane.steps}</text>
            <text x="28" y={lane.top + 48} fontSize="12" className="fill-gray-400">{lane.pace}</text>
          </g>
        ))}

        {/* The weeks, and their grid */}
        <g style={rise(shown, 250)}>
          <text x="28" y={CY.axis + 4} fontSize="12" className="fill-gray-500">{c.weeks}</text>
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <line x1={cx(i)} y1={CY.discTop - 22} x2={cx(i)} y2={CY.axis - 14} stroke={GRID} />
              <text x={cx(i) + CY.step / 2} y={CY.axis + 4} textAnchor="middle" fontSize="12" className={week != null && Math.floor(week) === i && live ? 'fill-gray-900' : 'fill-gray-400'}>{i + 1}</text>
            </g>
          ))}
          <line x1={cx(12)} y1={CY.discTop - 22} x2={cx(12)} y2={CY.axis - 14} stroke={GRID} />
        </g>

        {DISCOVERY_CYCLES.map((span, i) => (
          <CyclePill key={`d${i}`} span={span} top={CY.discTop} week={week} shown={shown} delay={300 + i * 180} clip={`${uid}-d${i}`} />
        ))}
        {SPRINTS.map((span, i) => (
          <CyclePill key={`s${i}`} span={span} top={CY.deliTop} week={week} shown={shown} delay={450 + i * 90} clip={`${uid}-s${i}`} />
        ))}

        {/* Discovery feeds the sprint that starts (ink); a sprint's learning goes back up (grey, dashed) */}
        {FEEDS.map((w, i) => (
          <g key={`f${w}`}>
            <path d={feedPath(w)} pathLength={1} fill="none" stroke={INK} strokeWidth="1.75" strokeLinecap="round" style={draw(shown, 1100 + i * 150, 500)} />
            <Arrowhead x={cx(w) + 16} y={CY.deliTop - 6} angle={90} style={rise(shown, 1500 + i * 150)} />
            <Runner d={feedPath(w)} p={run(w)} tone={INK} />
          </g>
        ))}
        {LEARNS.map((w, i) => (
          <g key={`l${w}`}>
            <path d={learnPath(w)} fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" style={rise(shown, 1300 + i * 150)} />
            <Arrowhead x={cx(w) + 16} y={DISC_BOTTOM + 6} angle={-90} style={rise(shown, 1600 + i * 150)} />
            <Runner d={learnPath(w)} p={run(w)} tone="#6B7280" />
          </g>
        ))}
        <text x={cx(FEEDS[0]) + 30} y={(DISC_BOTTOM + CY.deliTop) / 2 + 4} fontSize="12" fontWeight="600" fill={INK} style={rise(shown, 1450)}>{c.feeds}</text>
        <text x={cx(LEARNS[0]) + 30} y={(DISC_BOTTOM + CY.deliTop) / 2 + 4} fontSize="12" className="fill-gray-500" style={rise(shown, 1600)}>{c.learns}</text>

        {/* The playhead: this week */}
        <g style={{ opacity: live ? 1 : 0, transition: 'opacity 400ms ease-out' }}>
          <line x1={cx(week ?? 0)} y1={CY.discTop - 26} x2={cx(week ?? 0)} y2={CY.axis - 12} stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx={cx(week ?? 0)} cy={CY.discTop - 26} r="4.5" fill={INK} />
        </g>
      </svg>
    </Panel>
  )
}

// ---------------------------------------------------------------------------
// One button, five states: nodes are states, arrows carry the verb that triggers them
// ---------------------------------------------------------------------------

export function StatesDiagram({ lang }: { lang: Language }) {
  const c = V2_INTERACTION[lang].states
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: the active state walks idle, pressed, loading, done; then pressed, loading, error, and back
  const t = useLoop(shown, 7600)
  const STEPS: [number, number, number][] = [[0, 0, 900], [1, 900, 600], [2, 1500, 1100], [3, 2600, 1200], [0, 3800, 500], [1, 4300, 500], [2, 4800, 900], [4, 5700, 1300], [0, 7000, 600]]
  const current = t == null ? -1 : (STEPS.find(([, a, d]) => t >= a && t < a + d)?.[0] ?? -1)
  const W = 170
  const H = 48
  const row = [30, 250, 470, 690].map((x) => ({ x, y: 60 }))
  const error = { x: 470, y: 176 }

  return (
    <Panel>
      <svg ref={ref} viewBox="0 0 960 260" role="img" aria-labelledby="states-title states-desc" className="block h-auto w-full">
        <title id="states-title">{c.title}</title>
        <desc id="states-desc">{c.desc}</desc>

        {row.map((n, i) => {
          const done = i === 3
          return (
            <g key={i} style={rise(shown, i * 220)}>
              <rect x={n.x} y={n.y} width={W} height={H} rx="12" fill={done ? INK : '#FFFFFF'} stroke={INK} strokeWidth="1.5" />
              <text x={n.x + W / 2} y={n.y + 29} textAnchor="middle" fontSize="13" fontWeight="500" fill={done ? '#FFFFFF' : INK}>{c.nodes[i]}</text>
              {/* The feedback of the press: the ring under the finger */}
              {i === 1 && <circle cx={n.x + W - 22} cy={n.y + H / 2} r="8" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" />}
            </g>
          )
        })}
        {[0, 1, 2].map((i) => {
          const x1 = row[i].x + W + 4
          const x2 = row[i + 1].x - 6
          return (
            <g key={i}>
              <path d={`M${x1} 84 L${x2} 84`} pathLength={1} fill="none" stroke={INK} strokeWidth="1.5" style={draw(shown, 150 + i * 220, 300)} />
              <Arrowhead x={x2 + 2} y={84} angle={0} style={rise(shown, 400 + i * 220)} />
              <text x={(x1 + x2) / 2} y="70" textAnchor="middle" fontSize="12" className="fill-gray-600" style={rise(shown, 300 + i * 220)}>{c.verbs[i]}</text>
            </g>
          )
        })}

        {/* The state the control is in now: a soft halo that moves from one to the next */}
        {[...row, error].map((n, i) => (
          <rect key={`halo${i}`} x={n.x - 5} y={n.y - 5} width={W + 10} height={H + 10} rx="16" fill="none" stroke={INK} strokeOpacity="0.22" strokeWidth="4" style={{ opacity: current === i ? 1 : 0, transition: 'opacity 250ms ease-out' }} />
        ))}

        {/* The other way out of loading, and back */}
        <path d={`M555 112 L555 ${error.y - 6}`} pathLength={1} fill="none" stroke="#6B7280" strokeWidth="1.5" style={draw(shown, 900, 300)} />
        <Arrowhead x={555} y={error.y - 4} angle={90} style={rise(shown, 1150)} />
        <text x="566" y="148" fontSize="12" className="fill-gray-600" style={rise(shown, 1000)}>{c.verbs[3]}</text>
        <g style={rise(shown, 1100)}>
          <rect x={error.x} y={error.y} width={W} height={H} rx="12" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={error.x + W / 2} y={error.y + 29} textAnchor="middle" fontSize="13" fontWeight="500" className="fill-gray-700">{c.nodes[4]}</text>
        </g>
        <path d={`M${error.x - 4} ${error.y + H / 2} C300 ${error.y + H / 2} 115 ${error.y + H / 2} 115 116`} pathLength={1} fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" style={draw(shown, 1300, 600)} />
        <Arrowhead x={115} y={113} angle={-90} style={rise(shown, 1850)} />
        <text x="280" y="226" textAnchor="middle" fontSize="12" className="fill-gray-600" style={rise(shown, 1500)}>{c.verbs[4]}</text>
      </svg>
    </Panel>
  )
}
