import { TRACKS_DIAGRAM } from '@/data/approcheData'

/**
 * One idea: two tracks offset by one cycle. The top row is what I build (ink), the bottom row is
 * what the team evaluates (pale), one column later. The number in each block says which artefact it
 * is, so reading down a column shows 2 being built while 1 is evaluated. Qualitative, no values.
 */
export default function TracksDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = TRACKS_DIAGRAM[lang]
  const x = (i: number) => 20 + i * 90
  const W = 84

  return (
    <svg viewBox="20 20 356 188" role="img" aria-labelledby="tracks-title tracks-desc" className="h-auto w-full">
      <title id="tracks-title">{c.title}</title>
      <desc id="tracks-desc">{c.desc}</desc>

      <text x="20" y="34" fontSize="13" fontWeight="500" className="fill-gray-900">
        {c.build}
      </text>
      <text x="20" y="196" fontSize="13" className="fill-gray-500">
        {c.evaluate}
      </text>

      {/* The artefact of one cycle feeds the evaluation of the next */}
      {[0, 1, 2].map((i) => (
        <path
          key={`link-${i}`}
          d={`M${x(i) + W / 2} 86 C${x(i) + W / 2} 100 ${x(i + 1) + W / 2} 98 ${x(i + 1) + W / 2} 134`}
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          className="stroke-gray-300"
        />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={`build-${i}`}>
          <rect x={x(i)} y="48" width={W} height="38" rx="9" className="fill-gray-900" />
          <text x={x(i) + W / 2} y="72" textAnchor="middle" fontSize="13" fontWeight="500" className="fill-white">
            {i + 1}
          </text>
        </g>
      ))}

      {[1, 2, 3].map((i) => (
        <g key={`eval-${i}`}>
          <rect x={x(i)} y="134" width={W} height="38" rx="9" className="fill-gray-100 stroke-gray-300" strokeWidth="1" />
          <text x={x(i) + W / 2} y="158" textAnchor="middle" fontSize="13" fontWeight="500" className="fill-gray-600">
            {i}
          </text>
        </g>
      ))}
    </svg>
  )
}
