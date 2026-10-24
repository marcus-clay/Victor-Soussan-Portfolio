/**
 * One idea: in each area of the work, I lead and the AI equips. Five areas as hairline rows; in
 * each one the left column is what I carry (ink), the right one is what the AI equips (quiet grey).
 * Plain text on hairlines, no boxes: it reads as a drawing, stays legible at 390 px (text is HTML,
 * so it does not shrink with the page) and the human column keeps the visual weight. One legend
 * above the rows names the two columns, so no row repeats a label.
 * Qualitative, no values.
 */
export default function AiPracticeDiagram({ lang }: { lang: 'en' | 'fr' }) {
  const c = {
    fr: {
      title: 'Ce que je mène, ce que l’IA outille',
      lead: 'Je mène',
      ai: 'L’IA outille',
      rows: [
        { area: 'Pilotage', lead: 'Priorités, méthodes, suivi', ai: 'Tâches, mémoire de travail' },
        { area: 'Recherche', lead: 'Entretiens, organisation, passation', ai: 'Synthèses, rapports' },
        { area: 'Conception', lead: 'Craft, niveaux de fidélité', ai: 'Production dans Figma (Figma Console MCP)' },
        { area: 'Prototypage', lead: 'Hypothèses à tester', ai: 'Prototypes codés (Claude Code)' },
        { area: 'Communication', lead: 'Cadrage, décisions', ai: 'Synthèses de réunions, decks à la charte' },
      ],
    },
    en: {
      title: 'What I lead, what AI equips',
      lead: 'I lead',
      ai: 'AI equips',
      rows: [
        { area: 'Steering', lead: 'Priorities, methods, follow-up', ai: 'Tasks, working memory' },
        { area: 'Research', lead: 'Interviews, organisation, handover', ai: 'Syntheses, reports' },
        { area: 'Design', lead: 'Craft, levels of fidelity', ai: 'Production in Figma (Figma Console MCP)' },
        { area: 'Prototyping', lead: 'Hypotheses to test', ai: 'Coded prototypes (Claude Code)' },
        { area: 'Communication', lead: 'Framing, decisions', ai: 'Meeting syntheses, decks on brand' },
      ],
    },
  }[lang]

  return (
    <figure aria-label={c.title} className="max-w-[40rem]">
      {/* Column legend, once, above the rows: the left column is what I carry, the right one what the AI equips */}
      <div
        aria-hidden="true"
        className="grid grid-cols-2 items-center gap-x-6 pb-3 text-xs text-gray-500 md:grid-cols-[7rem_1fr_1fr] md:gap-x-8"
      >
        <span className="hidden md:block" />
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-gray-900" />
          {c.lead}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full border border-gray-400" />
          {c.ai}
        </span>
      </div>

      <ul className="border-b border-gray-100">
        {c.rows.map((row) => (
          <li
            key={row.area}
            className="grid grid-cols-2 gap-x-6 gap-y-1.5 border-t border-gray-100 py-4 md:grid-cols-[7rem_1fr_1fr] md:gap-x-8"
          >
            <p className="col-span-2 text-sm font-medium text-gray-900 md:col-span-1">{row.area}</p>
            <p className="text-sm text-gray-900">{row.lead}</p>
            <p className="text-sm text-gray-600">{row.ai}</p>
          </li>
        ))}
      </ul>
    </figure>
  )
}
