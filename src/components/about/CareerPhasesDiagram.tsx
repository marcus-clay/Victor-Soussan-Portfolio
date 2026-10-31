'use client'

import { flash, grow, rise, seg, travel, useDiagramReveal, useLoop } from '@/components/approche/diagramMotion'
import { Panel } from '@/components/approche/ApproachDiagrams'

/**
 * One idea: where the career converges. A time axis from 2005 to today across the full width, drawn to
 * scale (one unit per year): the years in business tools are the ink segment, the other periods stay pale,
 * and the dot at the end marks where I stand now. The two long periods are named on the axis; the two short
 * ones at the right end are named below, on leader lines. The periods draw one after the other as the
 * drawing comes into view. Qualitative grouping, years from the career data.
 */
export default function CareerPhasesDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = {
    fr: {
      title: 'Un parcours qui converge vers les outils métier',
      desc: 'Une frise de 2005 à aujourd’hui : de 2005 à 2016, des agences au grand public ; de 2016 à 2024, les outils métier B2B et B2G ; de 2025 à 2026, indépendant ; aujourd’hui, Lead UX France, à la tête de la pratique design d’un éditeur européen d’information professionnelle.',
      early: ['Agences, grand public', '2005 à 2016'],
      core: ['Outils métier B2B et B2G', '2016 à 2024'],
      solo: 'Indépendant, 2025 à 2026',
      now: ['Lead UX France', 'Pratique design, éditeur européen'],
    },
    en: {
      title: 'A career that converges on business tools',
      desc: 'A timeline from 2005 to today: from 2005 to 2016, agencies to consumer products; from 2016 to 2024, B2B and B2G business tools; from 2025 to 2026, independent; today, Lead UX France, running the design practice at a European professional information publisher.',
      early: ['Agencies, consumer', '2005 to 2016'],
      core: ['B2B and B2G business tools', '2016 to 2024'],
      solo: 'Independent, 2025 to 2026',
      now: ['Lead UX France', 'Design practice, European publisher'],
    },
  }[lang]
  const { ref, shown } = useDiagramReveal<SVGSVGElement>()
  // Living part: twenty years travelled in a few seconds, then today answers with a ring
  const t = useLoop(shown, 7600, 2400)

  const end = 2026.8 // the axis ends in October 2026
  const X0 = 40
  const X1 = 900
  const x = (year: number) => X0 + ((year - 2005) / (end - 2005)) * (X1 - X0)
  const axisY = 92
  const NOW = X1 + 8

  return (
    // The same pale panel as the Approach diagrams: it scrolls sideways on a phone, its right edge fading while
    // part of the timeline is hidden
    <Panel minWidth={640}>
        <svg ref={ref} viewBox="0 0 960 220" role="img" aria-labelledby="career-title career-desc" className="block h-auto w-full">
          <title id="career-title">{c.title}</title>
          <desc id="career-desc">{c.desc}</desc>

          {/* The periods, as segments on one axis, drawn in the order they happened */}
          <g strokeWidth="4" strokeLinecap="round" fill="none">
            <path d={`M${x(2005)} ${axisY} H${x(2016) - 6}`} stroke="#D1D5DB" style={grow(shown, 0, 900)} />
            <path d={`M${x(2016)} ${axisY} H${x(2025) - 6}`} stroke="#111827" style={grow(shown, 700, 900)} />
            <path d={`M${x(2025)} ${axisY} H${x(2026.67) - 5}`} stroke="#9CA3AF" style={grow(shown, 1400, 400)} />
          </g>
          <circle cx={NOW} cy={axisY} r="7" fill="#111827" style={rise(shown, 1700)} />
          {/* The years go by: a glow runs from 2005 to today, then today sends out a ring */}
          {t != null && (
            <>
              <circle
                cx={x(2005) + (NOW - x(2005)) * travel(seg(t, 0, 4600))}
                cy={axisY}
                r="7"
                fill="#FFFFFF"
                stroke="#111827"
                strokeWidth="2"
                style={{ opacity: Math.min(seg(t, 0, 300), 1 - seg(t, 4500, 200)) }}
              />
              <circle
                cx={NOW}
                cy={axisY}
                r="7"
                fill="none"
                stroke="#111827"
                strokeWidth="2"
                style={{ opacity: 0.45 * flash(t, 4700, 1400), transform: `scale(${1 + 1.8 * seg(t, 4700, 1400)})`, transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            </>
          )}

          {/* The two long periods: name above the axis, years below */}
          <g style={rise(shown, 150)}>
            <text x={x(2005)} y="64" fontSize="15" className="fill-gray-600">{c.early[0]}</text>
            <text x={x(2005)} y="124" fontSize="13" className="fill-gray-500">{c.early[1]}</text>
          </g>
          <g style={rise(shown, 850)}>
            <text x={x(2016)} y="64" fontSize="15" fontWeight="600" fill="#111827">{c.core[0]}</text>
            <text x={x(2016)} y="124" fontSize="13" className="fill-gray-500">{c.core[1]}</text>
          </g>

          {/* The two short periods at the right end: leader lines down to their names */}
          <g style={rise(shown, 1500)}>
            <path d={`M${x(2025.8)} ${axisY + 10} V150`} fill="none" strokeWidth="1" stroke="#D1D5DB" />
            <text x={x(2025.8) - 8} y="155" textAnchor="end" fontSize="14" className="fill-gray-600">{c.solo}</text>
          </g>
          <g style={rise(shown, 1800)}>
            <path d={`M${NOW} ${axisY + 12} V182`} fill="none" strokeWidth="1" stroke="#D1D5DB" />
            <text x={NOW - 8} y="187" textAnchor="end" fontSize="15" fontWeight="600" fill="#111827">{c.now[0]}</text>
            <text x={NOW - 8} y="207" textAnchor="end" fontSize="13" className="fill-gray-500">{c.now[1]}</text>
          </g>
        </svg>
    </Panel>
  )
}
