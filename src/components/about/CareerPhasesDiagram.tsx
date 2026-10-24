/**
 * One idea: where the career converges. A hairline time axis from 2005 to today, drawn to scale
 * (one unit per year): the years in business tools are the ink segment, the other periods stay pale,
 * and the dot at the end marks where I stand now. The two long periods are named on the axis; the
 * two short ones at the right end are named below, on a leader line. Qualitative grouping, years
 * from the career data.
 */
export default function CareerPhasesDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = {
    fr: {
      title: 'Un parcours qui converge vers les outils métier',
      desc: 'Une frise de 2005 à aujourd’hui : de 2005 à 2016, des agences au grand public ; de 2016 à 2024, les outils métier B2B et B2G ; de 2025 à 2026, indépendant ; aujourd’hui, Lead UX France, dans un éditeur européen d’information professionnelle de 2 500 personnes.',
      early: ['Agences, grand public', '2005 à 2016'],
      core: ['Outils métier B2B et B2G', '2016 à 2024'],
      solo: 'Indépendant, 2025 à 2026',
      now: ['Lead UX France', 'Éditeur européen, 2 500 personnes, 500 M€ de CA'],
    },
    en: {
      title: 'A career that converges on business tools',
      desc: 'A timeline from 2005 to today: from 2005 to 2016, agencies to consumer products; from 2016 to 2024, B2B and B2G business tools; from 2025 to 2026, independent; today, Lead UX France, at a European professional information publisher of 2,500 people.',
      early: ['Agencies, consumer', '2005 to 2016'],
      core: ['B2B and B2G business tools', '2016 to 2024'],
      solo: 'Independent, 2025 to 2026',
      now: ['Lead UX France', 'European publisher, 2,500 people, €500M revenue'],
    },
  }[lang]

  const end = 2026.8 // the axis ends in October 2026
  const axisEnd = 348
  const x = (year: number) => ((year - 2005) / (end - 2005)) * axisEnd
  const axisY = 48

  return (
    <svg viewBox="0 0 362 154" role="img" aria-labelledby="career-title career-desc" className="h-auto w-full">
      <title id="career-title">{c.title}</title>
      <desc id="career-desc">{c.desc}</desc>

      {/* The periods, as hairline segments on one axis */}
      <g strokeWidth="3" strokeLinecap="round" fill="none">
        <path d={`M${x(2005)} ${axisY} H${x(2016) - 4}`} className="stroke-gray-300" />
        <path d={`M${x(2016)} ${axisY} H${x(2025) - 4}`} className="stroke-gray-900" />
        <path d={`M${x(2025)} ${axisY} H${x(2026.67) - 3}`} className="stroke-gray-400" />
      </g>
      <circle cx="354" cy={axisY} r="4.5" className="fill-gray-900" />

      {/* The two long periods: name above the axis, years below */}
      <text x={x(2005)} y="32" fontSize="13" className="fill-gray-600">{c.early[0]}</text>
      <text x={x(2005)} y="72" fontSize="12" className="fill-gray-500">{c.early[1]}</text>
      <text x={x(2016)} y="32" fontSize="13" fontWeight="500" className="fill-gray-900">{c.core[0]}</text>
      <text x={x(2016)} y="72" fontSize="12" className="fill-gray-500">{c.core[1]}</text>

      {/* The two short periods at the right end: leader lines down to their names */}
      <path d={`M${x(2025.8)} ${axisY + 8} V98`} fill="none" strokeWidth="1" className="stroke-gray-300" />
      <text x={x(2025.8) - 6} y="102" textAnchor="end" fontSize="13" className="fill-gray-600">{c.solo}</text>
      <path d="M354 56 V118" fill="none" strokeWidth="1" className="stroke-gray-300" />
      <text x="348" y="124" textAnchor="end" fontSize="13" fontWeight="500" className="fill-gray-900">{c.now[0]}</text>
      <text x="348" y="142" textAnchor="end" fontSize="12" className="fill-gray-500">{c.now[1]}</text>
    </svg>
  )
}
