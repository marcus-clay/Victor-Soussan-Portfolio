import { getAllProjects } from '@/data/projectsData'
import { SIGNALS } from '@/data/signalsData'
import { GUIDE_CHAPTERS, GUIDE_META } from '@/data/guideClaudeCodeData'
import { SHIP_TO_SHOW_META, SHIP_TO_SHOW_PHASES } from '@/data/guideShipToShowData'
import { LINKEDIN_URL, pageUrl } from '@/lib/seo'

/**
 * /llms-full.txt: the full text of the French pages an answer engine is most likely to quote
 * (case studies in summary, articles, guides), in one Markdown file it can read without crawling.
 * Same data as the pages themselves, so it cannot drift from them.
 */
export const dynamic = 'force-static'

const ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: '’', nbsp: ' ', rsquo: '’', lsquo: '‘',
  laquo: '«', raquo: '»', hellip: '…', eacute: 'é', egrave: 'è', agrave: 'à',
}

/** Small HTML to Markdown pass, enough for the article and guide bodies (p, h2-h4, lists, links, strong). */
function toMarkdown(html: string): string {
  return html
    // Code blocks first, tags inside removed, so a sample Markdown file never adds headings to this one
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, c) => `\n\`\`\`\n${c.replace(/<[^>]+>/g, '').trim()}\n\`\`\`\n`)
    .replace(/<\/t[hd]>\s*<t[hd][^>]*>/gi, ' | ')
    .replace(/<tr[^>]*>\s*<t[hd][^>]*>/gi, '\n| ')
    .replace(/<\/t[hd]>\s*<\/tr>/gi, ' |')
    .replace(/<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n${'#'.repeat(Number(n) + 1)} ${t}\n`)
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) =>
      `[${t}](${href.startsWith('/') ? `https://www.victorsoussan.fr${href}` : href})`)
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|ul|ol|blockquote|div|figure|table)>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#\d+|[a-z]+);/gi, (m, e) =>
      e.startsWith('#') ? String.fromCharCode(Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function build(): string {
  const out: string[] = [
    '# Victor Soussan, texte intégral',
    '',
    '> Lead Product Designer à Paris, spécialiste du product design B2B et B2G. Ce fichier rassemble le texte des études de cas (en résumé), des articles et des guides publiés sur www.victorsoussan.fr. Chaque section indique l’adresse de la page source ; la version anglaise est à la même adresse sous /en.',
    '',
    `Profil LinkedIn : ${LINKEDIN_URL}`,
    '',
    '## Études de cas',
    '',
  ]

  for (const p of getAllProjects('fr').filter((p) => !p.parentId)) {
    out.push(`### ${p.title}`, '', `Source : ${pageUrl('fr', `project/${p.id}`)}`, '', `Rôle : ${p.role}`, '', p.summary, '')
    if (p.shortDescription) out.push(toMarkdown(p.shortDescription), '')
    if (p.missions?.length) out.push('Missions :', ...p.missions.map((m) => `- ${toMarkdown(m)}`), '')
    if (p.system?.desc) out.push(`${p.system.title} : ${toMarkdown(p.system.desc)}`, '')
    if (p.deliverables?.length) out.push(`Livrables : ${p.deliverables.join(', ')}.`, '')
  }

  out.push('## Articles', '')
  for (const s of SIGNALS) {
    out.push(`### ${s.title_fr}`, '', `Source : ${pageUrl('fr', `signal/${s.id}`)} (${s.date})`, '', toMarkdown(s.body_long_fr ?? s.body_fr), '')
  }

  out.push(`## Guide : ${GUIDE_META.title_fr}`, '', `${GUIDE_META.subtitle_fr}. Source : ${pageUrl('fr', 'guide/claude-code')}`, '')
  for (const ch of GUIDE_CHAPTERS) {
    out.push(`### ${ch.number}. ${ch.title_fr}`, '', `Source : ${pageUrl('fr', `guide/claude-code/${ch.slug_fr}`)}`, '', toMarkdown(ch.intro_fr), '')
    for (const sec of ch.sections) out.push(`#### ${sec.heading_fr}`, '', toMarkdown(sec.content_fr), '')
  }

  out.push(`## Guide : ${SHIP_TO_SHOW_META.title_fr}`, '', `${SHIP_TO_SHOW_META.subtitle_fr}. Source : ${pageUrl('fr', 'guide/ship-to-show')}`, '')
  for (const ph of SHIP_TO_SHOW_PHASES) {
    out.push(
      `### Phase ${ph.number} : ${ph.name_fr} (${ph.duration})`, '',
      `Entrée : ${ph.input_fr}. Sortie : ${ph.output_fr}.`, '',
      toMarkdown(ph.description_fr), '',
      ...ph.checklist_fr.map((c) => `- ${toMarkdown(c)}`), '',
    )
  }

  return out.join('\n')
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
