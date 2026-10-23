import { FIDELITY_DIAGRAM } from '@/data/approcheData'

/**
 * One idea: fidelity rises as the complexity becomes readable. One ink curve through the three
 * stages, the last point larger because it is the finished one. Guides tie each stage label to its
 * point; the curve is named on the curve itself. Qualitative, no values.
 */
export default function FidelityDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = FIDELITY_DIAGRAM[lang]
  const points = [
    { x: 56, y: 150, r: 4 },
    { x: 200, y: 100, r: 4 },
    { x: 360, y: 36, r: 6.5 },
  ]

  return (
    <svg viewBox="24 24 362 192" role="img" aria-labelledby="fidelity-title fidelity-desc" className="h-auto w-full">
      <title id="fidelity-title">{c.title}</title>
      <desc id="fidelity-desc">{c.desc}</desc>

      <line x1="24" y1="176" x2="376" y2="176" className="stroke-gray-200" strokeWidth="1" />

      {points.map((p, i) => (
        <g key={p.x}>
          <line x1={p.x} y1={p.y} x2={p.x} y2="176" className="stroke-gray-200" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx={p.x} cy="176" r="3" className="fill-gray-300" />
          <text x={p.x} y="204" textAnchor="middle" fontSize="13" className="fill-gray-600">
            {c.stages[i]}
          </text>
        </g>
      ))}

      <path
        d="M56 150 C120 150 145 108 200 100 C260 92 300 44 360 36"
        fill="none"
        strokeWidth="2.25"
        strokeLinecap="round"
        className="stroke-gray-900"
      />
      {points.map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r={p.r} className="fill-gray-900" />
      ))}

      <text x="24" y="118" fontSize="13" fontWeight="500" className="fill-gray-900">
        {c.curve}
      </text>
    </svg>
  )
}
