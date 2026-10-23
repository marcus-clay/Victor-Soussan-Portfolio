/**
 * One idea: where the career converges. A time bar from 2005 to today, drawn to scale (one unit per
 * year): the years in business tools are the ink segment, the rest stays pale. Labels sit on the
 * segments they name. Qualitative grouping, years from the career data.
 */
export default function CareerPhasesDiagram({
  lang,
}: {
  lang: 'en' | 'fr'
}) {
  const c = {
    fr: {
      title: 'Un parcours qui converge vers les outils métier',
      desc: 'Une frise de 2005 à aujourd’hui : de 2005 à 2016, des agences au grand public ; de 2016 à 2024, les outils métier B2B ; depuis 2025, indépendant.',
      early: ['Des agences', 'au grand public', '2005 à 2016'],
      core: ['Outils métier B2B', '2016 à 2024'],
      now: ['Indépendant', 'depuis 2025'],
    },
    en: {
      title: 'A career that converges on business tools',
      desc: 'A timeline from 2005 to today: from 2005 to 2016, agencies to consumer products; from 2016 to 2024, B2B business tools; since 2025, independent.',
      early: ['From agencies', 'to consumer products', '2005 to 2016'],
      core: ['B2B business tools', '2016 to 2024'],
      now: ['Independent', 'since 2025'],
    },
  }[lang]

  const unit = 362 / 21 // 2005 to 2026
  const x = (year: number) => (year - 2005) * unit
  const barY = 46
  const barH = 26

  return (
    <svg viewBox="0 0 362 124" role="img" aria-labelledby="career-title career-desc" className="h-auto w-full">
      <title id="career-title">{c.title}</title>
      <desc id="career-desc">{c.desc}</desc>

      <rect x={x(2005)} y={barY} width={x(2016) - x(2005) - 2} height={barH} rx="6" className="fill-gray-200" />
      <rect x={x(2016)} y={barY} width={x(2024.7) - x(2016) - 2} height={barH} rx="6" className="fill-gray-900" />
      <rect x={x(2025)} y={barY} width={362 - x(2025)} height={barH} rx="6" className="fill-gray-300" />

      <text x={x(2005)} y="96" fontSize="13" className="fill-gray-600">{c.early[0]}</text>
      <text x={x(2005)} y="112" fontSize="13" className="fill-gray-600">{c.early[1]}</text>
      <text x={x(2005)} y="28" fontSize="12" className="fill-gray-500">{c.early[2]}</text>

      <text x={x(2016)} y="96" fontSize="13" fontWeight="500" className="fill-gray-900">{c.core[0]}</text>
      <text x={x(2016)} y="112" fontSize="12" className="fill-gray-500">{c.core[1]}</text>

      <text x="362" y="12" textAnchor="end" fontSize="13" className="fill-gray-600">{c.now[0]}</text>
      <text x="362" y="28" textAnchor="end" fontSize="12" className="fill-gray-500">{c.now[1]}</text>
    </svg>
  )
}
