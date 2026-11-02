'use client'

// One diagram per template, between the opening and the template itself: the idea of the document in one
// picture, drawn at the width of the column on the pale panel. Same grammar as the Approach diagrams: ink for
// what carries the message, grey for the rest, labels on the drawing, no legend. Each one draws itself once
// as it comes into view (diagramMotion); nothing moves once it has settled, and with reduced motion the
// drawing is simply there.

import React from 'react'
import { draw, grow, open, rise, useDiagramReveal } from '@/components/approche/diagramMotion'
import { Arrowhead, INK, LINE, PALE, Panel } from '@/components/diagrams/DiagramParts'
import {
  CHECKLIST_DIAGRAM,
  SCOPING_DIAGRAM,
  SLICING_DIAGRAM,
  STATUS_DIAGRAM,
  SYNC_DIAGRAM,
  TEARDOWN_DIAGRAM,
} from '@/data/templateDiagramsData'

type Lang = 'en' | 'fr'
const MUTED = '#6B7280'

interface DiagramProps {
  lang: Lang
  /** A still, cropped view of the drawing for a card (no panel, no reveal, no accessible name: the card carries the title) */
  thumb?: boolean
}

/** The part of each drawing a card shows, in viewBox units, 13:10 like the card's picture */
type Frame = { x: number; y: number; w: number; h: number }
const FRAMES: Record<string, Frame> = {
  scoping: { x: 400, y: -50, w: 520, h: 400 },
  sync: { x: 220, y: 10, w: 520, h: 400 },
  teardown: { x: 230, y: -30, w: 520, h: 400 },
  checklist: { x: 380, y: 10, w: 520, h: 400 },
  slicing: { x: 10, y: -20, w: 520, h: 400 },
  status: { x: 230, y: -10, w: 520, h: 400 },
}

/** The drawing on its panel, or, as a thumb, the bare SVG cropped to its frame */
function Drawing({ thumb, frame, svgRef, viewBox, minWidth, id, title, desc, children }: {
  thumb: boolean; frame: Frame; svgRef: React.RefObject<SVGSVGElement>; viewBox: string; minWidth?: number; id: string; title: string; desc: string; children: React.ReactNode
}) {
  if (thumb) {
    return (
      <svg viewBox={`${frame.x} ${frame.y} ${frame.w} ${frame.h}`} aria-hidden="true" focusable="false" className="block h-full w-full">
        {children}
      </svg>
    )
  }
  return (
    <Panel minWidth={minWidth}>
      <svg ref={svgRef} viewBox={viewBox} role="img" aria-labelledby={`${id}-title ${id}-desc`} className="block h-auto w-full">
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}</desc>
        {children}
      </svg>
    </Panel>
  )
}

/** A line that draws itself from its start */
function Line({ d, shown, delay, tone = INK, width = 1.5, dashed = false, duration }: { d: string; shown: boolean; delay: number; tone?: string; width?: number; dashed?: boolean; duration?: number }) {
  // A dashed line cannot use the dash trick to draw itself: it fades in instead
  if (dashed) {
    return <path d={d} fill="none" stroke={tone} strokeWidth={width} strokeDasharray="5 4" strokeLinecap="round" style={rise(shown, delay)} />
  }
  return <path d={d} pathLength={1} fill="none" stroke={tone} strokeWidth={width} strokeLinecap="round" style={draw(shown, delay, duration)} />
}

/** A box with a title and, under it, a quiet line */
function Node({ x, y, w, h = 52, title, sub, tone = LINE, width = 1, fill = '#FFFFFF', dashed = false, shown, delay }: {
  x: number; y: number; w: number; h?: number; title: string; sub?: string; tone?: string; width?: number; fill?: string; dashed?: boolean; shown: boolean; delay: number
}) {
  const titleY = sub ? y + h / 2 - 3 : y + h / 2 + 5
  return (
    <g style={open(shown, delay)}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={fill} stroke={tone} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined} />
      <text x={x + w / 2} y={titleY} textAnchor="middle" fontSize="14" fontWeight="600" fill={INK}>{title}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize="11" fill={MUTED}>{sub}</text>}
    </g>
  )
}

// ---------------------------------------------------------------------------
// Scoping: three steps in a row, three concepts fan out, one prototype is kept
// ---------------------------------------------------------------------------

export function ScopingDiagram({ lang, thumb = false }: DiagramProps) {
  const c = SCOPING_DIAGRAM[lang]
  const reveal = useDiagramReveal<SVGSVGElement>()
  const shown = thumb || reveal.shown
  const Y = 150
  const W = 150
  const stepsX = [30, 220, 410]
  const conceptX = 620
  const conceptW = 130
  const conceptY = [60, 130, 200]
  const keptX = 810

  return (
    <Drawing thumb={thumb} frame={FRAMES.scoping} svgRef={reveal.ref} viewBox="0 0 960 300" id="tpl-scoping" title={c.title} desc={c.desc}>

        {/* The three steps, one after the other */}
        {c.steps.map((label, i) => (
          <React.Fragment key={label}>
            <Node x={stepsX[i]} y={Y - 26} w={W} title={label} shown={shown} delay={i * 220} />
            {i < 2 && <Line d={`M${stepsX[i] + W} ${Y} L${stepsX[i + 1]} ${Y}`} shown={shown} delay={i * 220 + 160} tone={MUTED} duration={400} />}
          </React.Fragment>
        ))}

        {/* The fan: three concepts out of the goals */}
        {conceptY.map((cy, i) => {
          const kept = i === 1
          const from = { x: stepsX[2] + W, y: Y }
          const to = { x: conceptX, y: cy + 20 }
          const d = `M${from.x} ${from.y} C${from.x + 30} ${from.y} ${to.x - 30} ${to.y} ${to.x} ${to.y}`
          return (
            <React.Fragment key={cy}>
              <Line d={d} shown={shown} delay={700 + i * 90} tone={kept ? INK : LINE} width={kept ? 1.5 : 1.25} duration={600} />
              <Node x={conceptX} y={cy} w={conceptW} h={40} title={`${c.concept} ${i + 1}`} tone={kept ? INK : LINE} width={kept ? 1.5 : 1} shown={shown} delay={900 + i * 90} />
              {!kept && (
                <text x={conceptX + conceptW + 10} y={cy + 24} fontSize="11" fill="#9CA3AF" style={rise(shown, 1300 + i * 60)}>{c.setAside}</text>
              )}
            </React.Fragment>
          )
        })}

        {/* The one kept goes on, in ink */}
        <Line d={`M${conceptX + conceptW} ${Y} L${keptX} ${Y}`} shown={shown} delay={1350} duration={400} />
        <Arrowhead x={keptX} y={Y} angle={0} style={rise(shown, 1600)} />
        <g style={open(shown, 1500)}>
          <rect x={keptX + 6} y={Y - 26} width={W - 20} height="52" rx="12" fill={INK} />
          <text x={keptX + 6 + (W - 20) / 2} y={Y + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="#FFFFFF">{c.kept}</text>
        </g>
        <text x={keptX + 6 + (W - 20) / 2} y={Y + 50} textAnchor="middle" fontSize="11" fill={MUTED} style={rise(shown, 1750)}>{c.next}</text>
    </Drawing>
  )
}

// ---------------------------------------------------------------------------
// PO and design sync: two meetings alternate each week; design prepares the next sprint while development
// delivers the current one
// ---------------------------------------------------------------------------

const SYNC_X0 = 230
const SYNC_WEEK = 118
const sx = (week: number) => SYNC_X0 + week * SYNC_WEEK

export function SyncDiagram({ lang, thumb = false }: DiagramProps) {
  const c = SYNC_DIAGRAM[lang]
  const reveal = useDiagramReveal<SVGSVGElement>()
  const shown = thumb || reveal.shown
  const laneY = [120, 210, 290]
  const SPRINT = 2 * SYNC_WEEK

  return (
    <Drawing thumb={thumb} frame={FRAMES.sync} svgRef={reveal.ref} viewBox="0 0 960 340" minWidth={760} id="tpl-sync" title={c.title} desc={c.desc}>

        {/* The weeks */}
        <g style={rise(shown, 0)}>
          <text x="28" y="40" fontSize="13" fill={MUTED}>{c.weeks}</text>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <text x={sx(i) + SYNC_WEEK / 2} y="40" textAnchor="middle" fontSize="12" fill="#9CA3AF">{i + 1}</text>
              <line x1={sx(i)} y1="54" x2={sx(i)} y2="320" stroke="#ECECE9" />
            </g>
          ))}
          <line x1={sx(6)} y1="54" x2={sx(6)} y2="320" stroke="#ECECE9" />
        </g>
        {c.lanes.map((lane, i) => (
          <text key={lane} x="28" y={laneY[i] + 5} fontSize="13" fontWeight="500" className="fill-gray-700" style={rise(shown, 100 + i * 80)}>{lane}</text>
        ))}

        {/* The meetings: filled one week, outlined the next */}
        {Array.from({ length: 6 }, (_, w) => {
          const identify = w % 2 === 0
          const x = sx(w) + SYNC_WEEK / 2
          return (
            <g key={w} style={rise(shown, 300 + w * 110)}>
              <circle cx={x} cy={laneY[0]} r="9" fill={identify ? INK : '#FFFFFF'} stroke={INK} strokeWidth="1.5" />
              <text x={x} y={laneY[0] + 28} textAnchor="middle" fontSize="10" fill="#9CA3AF">{c.thirtyMin}</text>
            </g>
          )
        })}
        <text x={sx(0) + SYNC_WEEK / 2} y={laneY[0] - 22} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 1000)}>{c.identify}</text>
        <text x={sx(3) + SYNC_WEEK / 2} y={laneY[0] - 22} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 1100)}>{c.prepare}</text>

        {/* Design prepares the sprint after the one being delivered */}
        {Array.from({ length: 3 }, (_, k) => (
          <g key={k} style={grow(shown, 700 + k * 150, 600)}>
            <rect x={sx(0) + k * SPRINT + 3} y={laneY[1] - 15} width={SPRINT - 6} height="30" rx="6" fill={PALE} />
            <text x={sx(0) + k * SPRINT + 14} y={laneY[1] + 4} fontSize="12" fontWeight="500" className="fill-gray-700">{`${c.prepares} ${k + 2}`}</text>
          </g>
        ))}
        {Array.from({ length: 3 }, (_, k) => (
          <g key={k} style={grow(shown, 800 + k * 150, 600)}>
            <rect x={sx(0) + k * SPRINT + 3} y={laneY[2] - 15} width={SPRINT - 6} height="30" rx="6" fill="#FFFFFF" stroke={LINE} />
            <text x={sx(0) + k * SPRINT + 14} y={laneY[2] + 4} fontSize="12" className="fill-gray-600">{`${c.sprint} ${k + 1}`}</text>
          </g>
        ))}

        {/* What was prepared in sprint 1 is built in sprint 2 */}
        <Line d={`M${sx(2) - 20} ${laneY[1] + 15} C${sx(2) + 10} ${laneY[1] + 40} ${sx(2) - 10} ${laneY[2] - 40} ${sx(2) + 18} ${laneY[2] - 18}`} shown={shown} delay={1500} duration={700} />
        <Arrowhead x={sx(2) + 20} y={laneY[2] - 17} angle={45} style={rise(shown, 2050)} />
        <text x={sx(2) + 34} y={laneY[2] - 30} fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 2000)}>{c.ahead}</text>
    </Drawing>
  )
}

// ---------------------------------------------------------------------------
// Teardown: three hours, five steps proportional to their minutes; the ideas open up, then close
// ---------------------------------------------------------------------------

const TEARDOWN_MINUTES = [15, 40, 30, 45, 50]

export function TeardownDiagram({ lang, thumb = false }: DiagramProps) {
  const c = TEARDOWN_DIAGRAM[lang]
  const reveal = useDiagramReveal<SVGSVGElement>()
  const shown = thumb || reveal.shown
  const X0 = 140
  const X1 = 820
  const perMin = (X1 - X0) / 180
  const barY = 232
  const lensY = 128
  // Widest where the concepts are drawn
  const peakX = X0 + (15 + 40 + 30 + 22) * perMin
  const starts = TEARDOWN_MINUTES.reduce<number[]>((acc, m, i) => [...acc, i === 0 ? X0 : acc[i - 1] + TEARDOWN_MINUTES[i - 1] * perMin], [])

  const lens = `M${X0} ${lensY} C${X0 + 200} ${lensY} ${peakX - 150} ${lensY - 66} ${peakX} ${lensY - 66} C${peakX + 150} ${lensY - 66} ${X1 - 60} ${lensY - 4} ${X1} ${lensY} C${X1 - 60} ${lensY + 4} ${peakX + 150} ${lensY + 66} ${peakX} ${lensY + 66} C${peakX - 150} ${lensY + 66} ${X0 + 200} ${lensY} ${X0} ${lensY} Z`

  return (
    <Drawing thumb={thumb} frame={FRAMES.teardown} svgRef={reveal.ref} viewBox="0 0 960 310" id="tpl-teardown" title={c.title} desc={c.desc}>

        {/* The ideas: one problem opens into many, then closes into a page of principles */}
        <path d={lens} fill={PALE} style={open(shown, 0)} />
        <path d={lens} pathLength={1} fill="none" stroke={INK} strokeWidth="1.25" style={draw(shown, 100, 1400)} />
        <text x={X0 - 6} y={lensY + 5} textAnchor="end" fontSize="12" fontWeight="600" fill={INK} style={rise(shown, 200)}>{c.problem}</text>
        <text x={peakX} y={lensY + 5} textAnchor="middle" fontSize="12" fontWeight="500" className="fill-gray-700" style={rise(shown, 900)}>{c.ideas}</text>
        <text x={X1 + 6} y={lensY + 5} fontSize="12" fontWeight="600" fill={INK} style={rise(shown, 1500)}>{c.principles}</text>

        {/* The three hours, step by step */}
        {TEARDOWN_MINUTES.map((m, i) => {
          const w = m * perMin
          const x = starts[i]
          const pale = i % 2 === 0
          return (
            <React.Fragment key={i}>
              <g style={grow(shown, 400 + i * 260, 520)}>
                <rect x={x + 2} y={barY - 14} width={w - 4} height="28" rx="6" fill={pale ? PALE : '#FFFFFF'} stroke={pale ? 'none' : LINE} />
                <text x={x + w / 2} y={barY + 4} textAnchor="middle" fontSize="11" fontWeight="500" className="fill-gray-700">{`${m} ${c.min}`}</text>
              </g>
              <text x={x + w / 2} y={barY + 36} textAnchor="middle" fontSize="11" fill={MUTED} style={rise(shown, 700 + i * 260)}>{c.steps[i]}</text>
            </React.Fragment>
          )
        })}
        <Line d={`M${X0} ${barY + 54} L${X1} ${barY + 54}`} shown={shown} delay={1800} tone={LINE} width={1} duration={800} />
        <text x={X1} y={barY + 72} textAnchor="end" fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 2300)}>{c.total}</text>
    </Drawing>
  )
}

// ---------------------------------------------------------------------------
// Checklist: three questions first, then twenty-five points in five groups, read twice
// ---------------------------------------------------------------------------

export function ChecklistDiagram({ lang, thumb = false }: DiagramProps) {
  const c = CHECKLIST_DIAGRAM[lang]
  const reveal = useDiagramReveal<SVGSVGElement>()
  const shown = thumb || reveal.shown
  const boxX = 30
  const boxY = 60
  const gridX = 560
  const rowY = (i: number) => 76 + i * 44
  const CELL = 24
  const GAP = 10

  return (
    <Drawing thumb={thumb} frame={FRAMES.checklist} svgRef={reveal.ref} viewBox="0 0 960 330" id="tpl-checklist" title={c.title} desc={c.desc}>

        {/* The three questions, before anything else */}
        <g style={open(shown, 0)}>
          <rect x={boxX} y={boxY} width="190" height="212" rx="14" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
          <text x={boxX + 20} y={boxY + 34} fontSize="14" fontWeight="600" fill={INK}>{c.three}</text>
        </g>
        {c.questions.map((q, i) => (
          <g key={q} style={rise(shown, 200 + i * 90)}>
            <circle cx={boxX + 26} cy={boxY + 76 + i * 44} r="3.5" fill={INK} />
            <text x={boxX + 40} y={boxY + 81 + i * 44} fontSize="13" className="fill-gray-700">{q}</text>
          </g>
        ))}

        <Line d={`M${boxX + 190} 166 L${boxX + 246} 166`} shown={shown} delay={500} duration={400} />
        <Arrowhead x={boxX + 248} y={166} angle={0} style={rise(shown, 850)} />

        {/* Five groups of five */}
        {c.groups.map((group, i) => (
          <React.Fragment key={group}>
            <text x={gridX - 16} y={rowY(i) + CELL / 2 + 4} textAnchor="end" fontSize="12" fontWeight="500" className="fill-gray-700" style={rise(shown, 700 + i * 120)}>{group}</text>
            {Array.from({ length: 5 }, (_, j) => {
              const n = i * 5 + j + 1
              return (
                <g key={j} style={rise(shown, 760 + i * 120 + j * 40)}>
                  <rect x={gridX + j * (CELL + GAP)} y={rowY(i)} width={CELL} height={CELL} rx="6" fill="#FFFFFF" stroke={LINE} />
                  <text x={gridX + j * (CELL + GAP) + CELL / 2} y={rowY(i) + CELL / 2 + 3.5} textAnchor="middle" fontSize="10" fill={MUTED} style={{ fontVariantNumeric: 'tabular-nums' }}>{n}</text>
                </g>
              )
            })}
          </React.Fragment>
        ))}

        {/* Read twice: at framing, and before development */}
        <Line d={`M${gridX} 310 L${gridX + 5 * (CELL + GAP) - GAP} 310`} shown={shown} delay={1700} tone={LINE} width={1} duration={700} />
        <circle cx={gridX} cy={310} r="3.5" fill={INK} style={rise(shown, 1800)} />
        <circle cx={gridX + 5 * (CELL + GAP) - GAP} cy={310} r="3.5" fill={INK} style={rise(shown, 2100)} />
        <text x={gridX - 10} y={314} textAnchor="end" fontSize="11" fill={INK} fontWeight="600" style={rise(shown, 1900)}>{c.atFraming}</text>
        <text x={gridX + 5 * (CELL + GAP)} y={314} fontSize="11" fill={INK} fontWeight="600" style={rise(shown, 2200)}>{c.beforeDev}</text>
    </Drawing>
  )
}

// ---------------------------------------------------------------------------
// Slicing: one interface, four cuts, four boards with their ticket number
// ---------------------------------------------------------------------------

export function SlicingDiagram({ lang, thumb = false }: DiagramProps) {
  const c = SLICING_DIAGRAM[lang]
  const reveal = useDiagramReveal<SVGSVGElement>()
  const shown = thumb || reveal.shown
  const F = { x: 40, y: 56, w: 300, h: 236 }
  const cuts = [F.y + 44, F.y + 108, F.y + 172]
  const cards = Array.from({ length: 4 }, (_, k) => ({ x: 430 + k * 128, y: 86, w: 112, h: 150 }))

  return (
    <Drawing thumb={thumb} frame={FRAMES.slicing} svgRef={reveal.ref} viewBox="0 0 960 330" id="tpl-slicing" title={c.title} desc={c.desc}>

        {/* The interface: a header, a sidebar, three rows of content */}
        <g style={open(shown, 0)}>
          <rect x={F.x} y={F.y} width={F.w} height={F.h} rx="14" fill="#FFFFFF" stroke={LINE} />
          <rect x={F.x + 16} y={F.y + 14} width="80" height="8" rx="4" fill={PALE} />
          <rect x={F.x + F.w - 56} y={F.y + 12} width="40" height="12" rx="6" fill={PALE} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={F.x + 16} y={F.y + 60 + r * 64} width="52" height="36" rx="6" fill={PALE} />
              <rect x={F.x + 80} y={F.y + 66 + r * 64} width="160" height="7" rx="3.5" fill={PALE} />
              <rect x={F.x + 80} y={F.y + 80 + r * 64} width="110" height="7" rx="3.5" fill="#EFEFEC" />
            </g>
          ))}
        </g>
        <text x={F.x} y={F.y + F.h + 24} fontSize="12" fontWeight="500" className="fill-gray-700" style={rise(shown, 200)}>{c.ui}</text>

        {/* The cuts, one per ticket */}
        {cuts.map((cy, i) => (
          <Line key={cy} d={`M${F.x - 12} ${cy} L${F.x + F.w + 12} ${cy}`} shown={shown} delay={500 + i * 160} dashed />
        ))}
        <text x={F.x + F.w} y={F.y + F.h + 24} textAnchor="end" fontSize="11" fill={MUTED} style={rise(shown, 900)}>{c.cut}</text>

        <Line d={`M${F.x + F.w + 20} ${F.y + F.h / 2 + 40} L${cards[0].x - 36} ${F.y + F.h / 2 + 40}`} shown={shown} delay={1100} duration={450} />
        <Arrowhead x={cards[0].x - 34} y={F.y + F.h / 2 + 40} angle={0} style={rise(shown, 1450)} />

        {/* One board per ticket: before and after, the ticket number, one sentence */}
        <text x={cards[0].x} y={cards[0].y - 22} fontSize="12" fontWeight="600" fill={INK} style={rise(shown, 1300)}>{c.board}</text>
        {cards.map((card, k) => (
          <g key={k} style={rise(shown, 1400 + k * 110)}>
            <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="12" fill="#FFFFFF" stroke={k === 0 ? INK : LINE} strokeWidth={k === 0 ? 1.5 : 1} />
            {/* Ticket number */}
            <rect x={card.x + card.w - 40} y={card.y + 10} width="30" height="16" rx="8" fill={INK} />
            <text x={card.x + card.w - 25} y={card.y + 21.5} textAnchor="middle" fontSize="9" fontWeight="600" fill="#FFFFFF">{`${c.ticket} ${12 + k}`}</text>
            {/* Before, after */}
            <rect x={card.x + 12} y={card.y + 40} width="38" height="46" rx="5" fill="#F7F7F5" stroke={LINE} />
            <rect x={card.x + 62} y={card.y + 40} width="38" height="46" rx="5" fill="#FFFFFF" stroke={INK} strokeWidth="1.25" />
            <rect x={card.x + 70} y={card.y + 50} width="22" height="5" rx="2.5" fill={INK} />
            <rect x={card.x + 20} y={card.y + 50} width="22" height="5" rx="2.5" fill={PALE} />
            <text x={card.x + 31} y={card.y + 100} textAnchor="middle" fontSize="9" fill="#9CA3AF">{c.before}</text>
            <text x={card.x + 81} y={card.y + 100} textAnchor="middle" fontSize="9" fill={INK}>{c.after}</text>
            {/* The sentence */}
            <rect x={card.x + 12} y={card.y + 116} width="84" height="6" rx="3" fill={PALE} />
            <rect x={card.x + 12} y={card.y + 128} width="56" height="6" rx="3" fill="#EFEFEC" />
          </g>
        ))}
        <text x={cards[0].x} y={cards[0].y + cards[0].h + 26} fontSize="11" fill={MUTED} style={rise(shown, 1950)}>{c.sentence}</text>
    </Drawing>
  )
}

// ---------------------------------------------------------------------------
// Figma statuses: Explo, WIP, Ready to dev set in stone; adjustments on a copy, unused screens archived
// ---------------------------------------------------------------------------

export function StatusDiagram({ lang, thumb = false }: DiagramProps) {
  const c = STATUS_DIAGRAM[lang]
  const reveal = useDiagramReveal<SVGSVGElement>()
  const shown = thumb || reveal.shown
  const Y = 86
  const W = 180
  const H = 58
  const X = { explo: 30, wip: 290, rtd: 550 }
  const rowTwo = 220

  return (
    <Drawing thumb={thumb} frame={FRAMES.status} svgRef={reveal.ref} viewBox="0 0 960 320" id="tpl-status" title={c.title} desc={c.desc}>

        {/* Three statuses, from a sketch to something set in stone */}
        <Node x={X.explo} y={Y} w={W} h={H} title={c.explo} sub={c.exploDesc} tone="#9CA3AF" dashed shown={shown} delay={0} />
        <Node x={X.wip} y={Y} w={W} h={H} title={c.wip} sub={c.wipDesc} tone="#9CA3AF" width={1.25} shown={shown} delay={350} />
        <g style={open(shown, 800)}>
          <rect x={X.rtd} y={Y} width={W} height={H} rx="12" fill={INK} />
          <text x={X.rtd + W / 2} y={Y + H / 2 - 3} textAnchor="middle" fontSize="14" fontWeight="600" fill="#FFFFFF">{c.rtd}</text>
          <text x={X.rtd + W / 2} y={Y + H / 2 + 15} textAnchor="middle" fontSize="11" fill="#D1D5DB">{c.rtdDesc}</text>
        </g>
        {/* Its two kinds of pages */}
        {[c.proto, c.spec].map((label, i) => (
          <g key={label} style={rise(shown, 1100 + i * 80)}>
            <rect x={X.rtd + W + 22 + i * 70} y={Y + 18} width="58" height="22" rx="11" fill="#FFFFFF" stroke={INK} />
            <text x={X.rtd + W + 22 + i * 70 + 29} y={Y + 33} textAnchor="middle" fontSize="11" fontWeight="500" fill={INK}>{label}</text>
          </g>
        ))}

        {/* The moves between them, each with its verb */}
        <Line d={`M${X.explo + W} ${Y + H / 2} L${X.wip - 4} ${Y + H / 2}`} shown={shown} delay={200} tone={MUTED} duration={450} />
        <Arrowhead x={X.wip - 2} y={Y + H / 2} angle={0} tone={MUTED} style={rise(shown, 550)} />
        <text x={(X.explo + W + X.wip) / 2} y={Y - 14} textAnchor="middle" fontSize="11" fill={MUTED} style={rise(shown, 500)}>{c.toDiscuss}</text>
        <Line d={`M${X.wip + W} ${Y + H / 2} L${X.rtd - 4} ${Y + H / 2}`} shown={shown} delay={550} duration={450} />
        <Arrowhead x={X.rtd - 2} y={Y + H / 2} angle={0} style={rise(shown, 900)} />
        <text x={(X.wip + W + X.rtd) / 2} y={Y - 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 850)}>{c.validated}</text>

        {/* An adjustment never touches the validated page: it goes on a copy */}
        <Node x={X.rtd} y={rowTwo} w={W} h={H} title={c.copy} sub={c.copyDesc} tone={INK} dashed shown={shown} delay={1500} />
        <Line d={`M${X.rtd + W - 30} ${Y + H} C${X.rtd + W - 30} ${Y + H + 50} ${X.rtd + W - 30} ${rowTwo - 50} ${X.rtd + W - 30} ${rowTwo - 4}`} shown={shown} delay={1350} duration={500} />
        <Arrowhead x={X.rtd + W - 30} y={rowTwo - 2} angle={90} style={rise(shown, 1750)} />
        <text x={X.rtd + W - 18} y={(Y + H + rowTwo) / 2 + 4} fontSize="11" fontWeight="600" fill={INK} style={rise(shown, 1650)}>{c.adjust}</text>

        {/* What is not kept goes to the archive */}
        <Node x={X.explo} y={rowTwo} w={W} h={H} title={c.archive} sub={c.archiveDesc} tone={LINE} fill={PALE} shown={shown} delay={1900} />
        <Line d={`M${X.wip + 30} ${Y + H} C${X.wip + 30} ${Y + H + 60} ${X.explo + W + 40} ${rowTwo - 60} ${X.explo + W + 4} ${rowTwo + H / 2}`} shown={shown} delay={1800} tone={MUTED} duration={600} />
        <Arrowhead x={X.explo + W + 2} y={rowTwo + H / 2} angle={180} tone={MUTED} style={rise(shown, 2300)} />
        <text x={X.wip + 42} y={(Y + H + rowTwo) / 2 + 4} fontSize="11" fill={MUTED} style={rise(shown, 2150)}>{c.notKept}</text>
    </Drawing>
  )
}

/** The diagram of a template, by its id; `thumb` for the still, cropped view of a card */
export function TemplateDiagram({ id, lang, thumb = false }: { id: string; lang: Lang; thumb?: boolean }) {
  switch (id) {
    case 'template-design-scoping': return <ScopingDiagram lang={lang} thumb={thumb} />
    case 'template-po-design-sync': return <SyncDiagram lang={lang} thumb={thumb} />
    case 'template-design-teardown': return <TeardownDiagram lang={lang} thumb={thumb} />
    case 'template-feature-checklist': return <ChecklistDiagram lang={lang} thumb={thumb} />
    case 'template-ui-slicing': return <SlicingDiagram lang={lang} thumb={thumb} />
    case 'template-figma-file-status': return <StatusDiagram lang={lang} thumb={thumb} />
    default: return null
  }
}
