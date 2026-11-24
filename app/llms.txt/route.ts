import { getAllProjects } from '@/data/projectsData'
import { SIGNALS } from '@/data/signalsData'
import { TEMPLATE_ENTRIES, templatePath } from '@/data/templatesData'
import { DECK_ENTRIES, deckPath } from '@/data/decksData'
import { SKILLS } from '@/data/skillsCatalogue'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import { SHIP_TO_SHOW_META } from '@/data/guideShipToShowData'
import { LINKEDIN_URL, clip, pageUrl } from '@/lib/seo'

/**
 * /llms.txt (llmstxt.org): a plain Markdown map of the site for answer engines (ChatGPT, Claude,
 * Perplexity, Gemini). Built from the same data as the sitemap, so it never drifts from the pages.
 * French first, since French is the default language; every page also exists under /en.
 */
export const dynamic = 'force-static'

const line = (title: string, url: string, desc?: string) =>
  `- [${title}](${url})${desc ? `: ${clip(desc, 200)}` : ''}`

function build(): string {
  const projects = getAllProjects('fr').filter((p) => !p.parentId)

  return [
    '# Victor Soussan',
    '',
    '> Lead Product Designer à Paris, spécialiste du product design B2B et B2G : design systems, interfaces métier complexes, recherche utilisateur, direction d’une pratique design, IA intégrée au quotidien (Claude Code, prototypage). Disponible pour des missions courtes de conseil.',
    '',
    'Le site est bilingue : chaque page existe en français (/fr, langue par défaut) et en anglais (/en), à la même adresse après le préfixe de langue.',
    '',
    '## Pages principales',
    '',
    line('Accueil', pageUrl('fr'), 'Présentation, projets phares, témoignages.'),
    line('À propos', pageUrl('fr', 'about'), 'Parcours, positionnement, manière de travailler.'),
    line('Approche', pageUrl('fr', 'approche'), 'Méthode de travail et types d’intervention.'),
    line('Projets', pageUrl('fr', 'projets'), 'Études de cas et projets courts.'),
    line('Contact', pageUrl('fr', 'contact'), 'Missions de conseil, interventions, conférences.'),
    line('CV', pageUrl('fr', 'resume')),
    line('LinkedIn', LINKEDIN_URL),
    '',
    '## Études de cas',
    '',
    ...projects.map((p) => line(p.title, pageUrl('fr', `project/${p.id}`), p.summary)),
    '',
    '## Guides',
    '',
    line(GUIDE_META.title_fr, pageUrl('fr', 'guide/claude-code'), GUIDE_META.subtitle_fr),
    ...GUIDE_CHAPTERS.map((ch) =>
      line(`${ch.number}. ${ch.title_fr}`, pageUrl('fr', `guide/claude-code/${ch.slug_fr}`), ch.intro_fr)
    ),
    line(SHIP_TO_SHOW_META.title_fr, pageUrl('fr', 'guide/ship-to-show'), SHIP_TO_SHOW_META.subtitle_fr),
    '',
    '## Articles',
    '',
    ...SIGNALS.map((s) => line(s.title_fr, pageUrl('fr', `signal/${s.id}`), s.body_fr)),
    '',
    '## Ressources (templates et decks)',
    '',
    ...TEMPLATE_ENTRIES.map((t) => line(t.title.fr, pageUrl('fr', templatePath(t, 'fr')), t.desc.fr)),
    ...DECK_ENTRIES.map((d) => line(d.title.fr, pageUrl('fr', deckPath(d, 'fr')))),
    '',
    '## Optional',
    '',
    line('Skills Claude pour designers', pageUrl('fr', 'skills'), 'Catalogue de skills Claude Code pour le design produit.'),
    ...SKILLS.map((s) => line(s.name, pageUrl('fr', `skills/${s.id}`), s.summary.fr)),
    line('English version', pageUrl('en')),
    '',
  ].join('\n')
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
