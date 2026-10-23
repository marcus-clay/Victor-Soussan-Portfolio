/**
 * One idea: the distance between an idea and something usable is short. Four steps in a row; the
 * two ends are mine (dashed outline: I decide), the two middle ones are assisted by the AI (solid).
 * A legend names the two treatments. Qualitative, no values.
 */
export default function AiFlowDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = {
    fr: {
      title: 'De l’idée à quelque chose d’utilisable',
      desc: 'Quatre étapes : l’idée, Claude Code, Figma MCP, puis quelque chose d’utilisable. Je décide aux deux extrémités, l’IA assiste les deux étapes du milieu.',
      steps: [['Idée'], ['Claude', 'Code'], ['Figma', 'MCP'], ['Utilisable']],
      decide: 'Je décide',
      assisted: 'Assisté par l’IA',
    },
    en: {
      title: 'From an idea to something usable',
      desc: 'Four steps: the idea, Claude Code, Figma MCP, then something usable. I decide at both ends, the AI assists the two middle steps.',
      steps: [['Idea'], ['Claude', 'Code'], ['Figma', 'MCP'], ['Usable']],
      decide: 'I decide',
      assisted: 'AI-assisted',
    },
  }[lang]

  const w = 76
  const gap = (362 - 4 * w) / 3
  const x = (i: number) => i * (w + gap)
  const y = 8
  const h = 52
  const cy = y + h / 2
  const assisted = [false, true, true, false]

  return (
    <svg viewBox="0 0 362 108" role="img" aria-labelledby="aiflow-title aiflow-desc" className="h-auto w-full">
      <title id="aiflow-title">{c.title}</title>
      <desc id="aiflow-desc">{c.desc}</desc>

      {[0, 1, 2].map((i) => {
        const x1 = x(i) + w + 4
        const x2 = x(i + 1) - 4
        return (
          <g key={`arrow-${i}`} className="stroke-gray-400" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={`M${x1} ${cy} H${x2}`} />
            <path d={`M${x2 - 4} ${cy - 4} L${x2} ${cy} L${x2 - 4} ${cy + 4}`} />
          </g>
        )
      })}

      {c.steps.map((lines, i) => (
        <g key={i}>
          {assisted[i] ? (
            <rect x={x(i)} y={y} width={w} height={h} rx="12" className="fill-gray-900" />
          ) : (
            <rect x={x(i)} y={y} width={w} height={h} rx="12" fill="none" strokeWidth="1.5" strokeDasharray="4 3" className="stroke-gray-900" />
          )}
          {lines.map((line, j) => (
            <text
              key={line}
              x={x(i) + w / 2}
              y={lines.length === 1 ? cy + 4.5 : cy - 2 + j * 17}
              textAnchor="middle"
              fontSize="13"
              fontWeight="500"
              className={assisted[i] ? 'fill-white' : 'fill-gray-900'}
            >
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* Legend: the two treatments */}
      <rect x="0" y="82" width="16" height="12" rx="4" fill="none" strokeWidth="1.5" strokeDasharray="3 2" className="stroke-gray-900" />
      <text x="24" y="92" fontSize="12" className="fill-gray-600">{c.decide}</text>
      <rect x="132" y="82" width="16" height="12" rx="4" className="fill-gray-900" />
      <text x="156" y="92" fontSize="12" className="fill-gray-600">{c.assisted}</text>
    </svg>
  )
}
