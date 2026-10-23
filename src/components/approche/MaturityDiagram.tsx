import { MATURITY_DIAGRAM } from '@/data/approcheData'

/**
 * One idea: the more the team is equipped, the less I carry upstream of the screen. Two curves
 * cross at the middle stage. The message curve is ink, the other one stays pale; labels sit on
 * the curves themselves, so the eye never leaves the drawing. Qualitative, no values.
 */
export default function MaturityDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = MATURITY_DIAGRAM[lang]
  const stageX = [64, 200, 336]

  return (
    <svg
      viewBox="24 30 362 186"
      role="img"
      aria-labelledby="maturity-title maturity-desc"
      className="h-auto w-full"
    >
      <title id="maturity-title">{c.title}</title>
      <desc id="maturity-desc">{c.desc}</desc>

      {/* Axis and the three stages, the same three situations as the table below */}
      <line x1="24" y1="176" x2="376" y2="176" className="stroke-gray-200" strokeWidth="1" />
      {stageX.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="176" r="3" className="fill-gray-300" />
          <text x={x} y="204" textAnchor="middle" fontSize="13" className="fill-gray-600">
            {c.stages[i]}
          </text>
        </g>
      ))}

      {/* What the other curve stands for: pale, behind */}
      <path d="M64 150 C150 150 250 72 336 72" fill="none" strokeWidth="2.25" strokeLinecap="round" className="stroke-gray-300" />
      <circle cx="64" cy="150" r="3.5" className="fill-gray-300" />
      <circle cx="336" cy="72" r="4.5" className="fill-gray-300" />
      <text x="376" y="48" textAnchor="end" fontSize="13" className="fill-gray-500">
        {c.onScreen}
      </text>

      {/* The message: what I carry upstream of the screen */}
      <path d="M64 72 C150 72 250 150 336 150" fill="none" strokeWidth="2.25" strokeLinecap="round" className="stroke-gray-900" />
      <circle cx="64" cy="72" r="4.5" className="fill-gray-900" />
      <circle cx="336" cy="150" r="3.5" className="fill-gray-900" />
      <text x="24" y="48" fontSize="13" fontWeight="500" className="fill-gray-900">
        {c.upstream}
      </text>
    </svg>
  )
}
