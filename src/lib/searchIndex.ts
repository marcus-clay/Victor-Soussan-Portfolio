import { getAllProjects } from '@/data/projectsData'
import { ALL_CONTENT, CATEGORY_LABELS, TYPE_LABELS, guidePath } from '@/data/contentData'
import { RESOURCE_TAGS } from '@/data/resourceTags'
import { GUIDE_CHAPTERS, getChapterSlug } from '@/data/guideClaudeCodeData'
import { PROFILE_ERAS, PROFILE_EXPERIENCE } from '@/data/profileData'
import { TRANSLATIONS } from '@/data/translations'
import { SKILLS, searchText as skillText, type ThemeId } from '@/data/skillsCatalogue'
import { getProjectTags } from '@/data/projectTags'
import { getTestimonials } from '@/data/testimonialsData'
import { TEMPLATE_BODIES } from '@/data/templateBodies'
import { DECK_ENTRIES } from '@/data/decksData'
import * as ShipToShow from '@/data/guideShipToShowData'
import * as OsGuide from '@/data/guideOsData'
import { TESSAN_TRANSLATIONS, type TessanChapterKey } from '@/data/caseStudyTranslations/tessanTranslations'
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations'
import { DAILYMOTION_TRANSLATIONS } from '@/data/caseStudyTranslations/dailymotionTranslations'
import { FRANCEVAE_TRANSLATIONS, FRANCEVAE_CASE_STUDY } from '@/data/caseStudyTranslations/franceVaeTranslations'
import { CONNECT_TRANSLATIONS } from '@/data/caseStudyTranslations/connectTranslations'
import { SQOOL_TRANSLATIONS } from '@/data/caseStudyTranslations/sqoolTranslations'
import { SQOOL_TIMELINE_TRANSLATIONS } from '@/data/caseStudyTranslations/sqoolTimelineTranslations'
import { SQOOL_CLASSE_TRANSLATIONS } from '@/data/caseStudyTranslations/sqoolClasseTranslations'
import { PAGESJAUNES_TEXT, PAGESJAUNES_CAPTIONS } from '@/data/caseStudyTranslations/pagesJaunesTranslations'
import { ANDROID_WEAR_TRANSLATIONS } from '@/data/caseStudyTranslations/androidWearTranslations'

/**
 * What the search of the header looks into: the projects, the resources (templates and decks), the guides and their
 * chapters, the skills, the articles, and the main pages. Built on the server, one list per language, and served as a
 * static file (app/api/search/[lang]): the pages never carry it, the browser fetches it when the search is first used.
 * `text` is the searchable body (never shown), `sub` the line under the title.
 */

export type SearchGroup = 'page' | 'project' | 'resource' | 'guide' | 'skill' | 'article'

export interface SearchEntry {
  id: string
  group: SearchGroup
  title: string
  sub: string
  href: string
  text: string
  /** The title in the other language, searched too (« work » finds « Projets »): shown next to a result found through it */
  alt?: string
  /** Other names of the entry, in both languages, searched like the titles and never shown (« projects » finds « Work ») */
  aka?: string
}

type Lang = 'en' | 'fr'

const PAGE_COPY = {
  en: {
    projets: { sub: 'Case studies and projects', text: 'work portfolio case study product design mobile web ai' },
    claude: { sub: 'Claude Code for designers: skills, guides, agents', text: 'claude code anthropic skills agents ai guide designers' },
    skills: { sub: 'The catalogue of skills for Claude Code', text: 'skills catalogue claude code agents motion animation ai prototyping writing' },
    blog: { sub: 'Articles on design, AI and practice', text: 'articles writing essays ai design leadership craft' },
    ressources: { sub: 'Guides, templates and decks', text: 'resources library guides templates decks methods' },
    testimonials: { sub: 'What clients and colleagues say', text: 'testimonials recommendations references clients colleagues' },
    approche: { sub: 'How I work and what I bring to a team', text: 'approach method process practice' },
    about: { sub: 'Background, values and way of working', text: 'bio biography story career approach values' },
    resume: { title: 'Resume', sub: 'Experience, roles and achievements', text: 'cv curriculum vitae career jobs skills education' },
    contact: { sub: 'Write to me, propose a collaboration', text: 'email mail message hire availability collaboration mission linkedin reach' },
  },
  fr: {
    projets: { sub: 'Études de cas et projets', text: 'travaux portfolio étude de cas product design mobile web ia' },
    claude: { sub: 'Claude Code pour les designers : skills, guides, agents', text: 'claude code anthropic skills agents ia guide designers' },
    skills: { sub: 'Le catalogue de skills pour Claude Code', text: 'skills catalogue claude code agents motion animation ia prototypage écriture' },
    blog: { sub: 'Articles sur le design, l’IA et la pratique', text: 'articles écriture essais ia design leadership craft' },
    ressources: { sub: 'Guides, modèles et decks', text: 'ressources bibliothèque guides modèles templates decks méthodes' },
    testimonials: { sub: 'Ce que disent clients et collègues', text: 'témoignages recommandations références clients collègues' },
    approche: { sub: 'Ma façon de travailler et ce que j’apporte à une équipe', text: 'approche méthode processus pratique' },
    about: { sub: 'Parcours, valeurs et façon de travailler', text: 'bio biographie histoire carrière approche valeurs' },
    resume: { title: 'CV', sub: 'Expériences, rôles et réalisations', text: 'curriculum vitae carrière postes compétences formation résumé' },
    contact: { sub: 'M’écrire, proposer une collaboration', text: 'email mail message embauche disponibilité collaboration mission linkedin joindre' },
  },
} as const

const strip = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** Every sentence of a data structure, in one language: a `{ en, fr }` pair gives the one asked for, lists and objects are
 *  walked, HTML is stripped, and what is not a sentence (a path, a link, a colour, a file) is left out. Read from the same
 *  files the pages are built from, so a word on a page is a word of the search. */
function harvest(node: unknown, lang: Lang, out: string[] = []): string[] {
  if (typeof node === 'string') {
    if (node.length > 1 && !/^(\/|https?:|#|mailto:|data:)/.test(node) && !/\.(webp|png|jpe?g|svg|mp4|webm|zip|pptx|pdf)$/i.test(node)) out.push(strip(node))
  } else if (Array.isArray(node)) {
    for (const n of node) harvest(n, lang, out)
  } else if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>
    if ('en' in o && 'fr' in o) harvest(o[lang], lang, out)
    else for (const v of Object.values(o)) harvest(v, lang, out)
  }
  return out
}

type Part = string | undefined | Part[]

/** The words people use for a theme of skills, in both languages, so that « motion » finds the animation skills */
const THEME_WORDS: Record<ThemeId, string> = {
  product: 'produit strategie product strategy roadmap',
  design: 'design ux ui',
  ai: 'ia ai intelligence artificielle',
  ideation: 'ideation creation idees ideas',
  facilitation: 'facilitation atelier workshop',
  prototyping: 'prototype prototypage prototyping',
  animation: 'motion animation transition mouvement',
  illustration: 'illustration diagramme schema diagram',
  writing: 'ecriture redaction writing brand marque',
  presentations: 'slides deck presentation diaporama',
}

const join = (...parts: Part[]): string =>
  parts
    .flat(Infinity as 1)
    .filter(Boolean)
    .join(' ')

/** The text of an entry, capped so that no single page weighs down the file */
const body = (cap: number, ...parts: Part[]): string => join(...parts).slice(0, cap)

/** The text of a case study per project: its own copy, in the language asked for */
function caseStudyText(id: string, lang: Lang): string[] {
  switch (id) {
    case 'tessan': {
      const t = TESSAN_TRANSLATIONS[lang]
      return harvest([t.hero, t.summary, t.hub, t.metaLabels, t.captions], lang)
    }
    case 'tessan-app':
    case 'tessan-os':
    case 'tessan-systeme': {
      const t = TESSAN_TRANSLATIONS[lang]
      const chapter = t.chapters[id.replace('tessan-', '') as TessanChapterKey]
      return harvest([chapter?.hero, chapter?.summary, t.sections.filter((x) => chapter?.sectionIds.includes(x.id))], lang)
    }
    case 'toolkit': return harvest(TOOLKIT_TRANSLATIONS, lang)
    case 'dailymotion': return harvest(DAILYMOTION_TRANSLATIONS, lang)
    case 'france-vae': return harvest([FRANCEVAE_TRANSLATIONS, FRANCEVAE_CASE_STUDY], lang)
    case 'connect': return harvest(CONNECT_TRANSLATIONS, lang)
    case 'sqool': return harvest([SQOOL_TRANSLATIONS, SQOOL_TIMELINE_TRANSLATIONS], lang)
    case 'sqool-classe': return harvest(SQOOL_CLASSE_TRANSLATIONS, lang)
    case 'pagesjaunes': return harvest([PAGESJAUNES_TEXT, PAGESJAUNES_CAPTIONS], lang)
    case 'androidwear': return harvest(ANDROID_WEAR_TRANSLATIONS, lang)
    default: return []
  }
}

/** The reading text of a template, a deck or a guide, from the files its page is built from */
function resourceText(id: string, lang: Lang): string[] {
  if (id === 'guide-ship-to-show') return harvest([ShipToShow.SHIP_TO_SHOW_PROBLEM, ShipToShow.SHIP_TO_SHOW_SOLUTION, ShipToShow.SHIP_TO_SHOW_PREREQUISITES, ShipToShow.SHIP_TO_SHOW_INSTALL, ShipToShow.SHIP_TO_SHOW_PHASES], lang)
  if (id === 'guide-personal-os') {
    const { OS_SECTIONS, OS_WHY, OS_NEEDS, OS_INSTALL, OS_STEPS_INTRO, OS_STEPS, OS_DAILY, OS_USECASES, OS_EXAMPLE, OS_SAFETY, OS_MORE } = OsGuide
    return harvest([OS_SECTIONS, OS_WHY, OS_NEEDS, OS_INSTALL, OS_STEPS_INTRO, OS_STEPS, OS_DAILY, OS_USECASES, OS_EXAMPLE, OS_SAFETY, OS_MORE], lang)
  }
  if (id === 'guide-claude-code') return GUIDE_CHAPTERS.map((ch) => (lang === 'fr' ? ch.title_fr : ch.title_en))
  const tpl = TEMPLATE_BODIES[id]
  if (tpl) return harvest(tpl, lang)
  const deck = DECK_ENTRIES.find((d) => d.id === id)
  if (deck) return harvest([deck.desc, deck.intro, deck.sections], lang)
  return []
}

function buildEntries(lang: Lang): SearchEntry[] {
  const nav = TRANSLATIONS[lang].nav
  const copy = PAGE_COPY[lang]
  const entries: SearchEntry[] = []

  // Pages
  entries.push(
    { id: 'page-about', group: 'page', title: nav.bio, sub: copy.about.sub, href: `/${lang}/about`, text: join(copy.about.text, PROFILE_ERAS.flatMap((e) => [e.title[lang], e.description[lang]])) },
    {
      id: 'page-resume',
      group: 'page',
      title: copy.resume.title,
      sub: copy.resume.sub,
      href: `/${lang}/resume`,
      text: join(copy.resume.text, PROFILE_EXPERIENCE.flatMap((e) => [e.role[lang], e.company[lang], e.context[lang], e.bullets[lang]])),
    },
    { id: 'page-contact', group: 'page', title: nav.contact, sub: copy.contact.sub, href: `/${lang}/contact`, text: copy.contact.text },
    { id: 'page-projets', group: 'page', title: nav.projects, sub: copy.projets.sub, href: `/${lang}/projets`, text: copy.projets.text },
    { id: 'page-claude', group: 'page', title: nav.claude, sub: copy.claude.sub, href: `/${lang}/claude`, text: copy.claude.text },
    { id: 'page-skills', group: 'page', title: 'Skills', sub: copy.skills.sub, href: `/${lang}/skills`, text: copy.skills.text },
    { id: 'page-ressources', group: 'page', title: nav.resources, sub: copy.ressources.sub, href: `/${lang}/ressources`, text: copy.ressources.text },
    { id: 'page-blog', group: 'page', title: nav.blog, sub: copy.blog.sub, href: `/${lang}/blog`, text: copy.blog.text },
    { id: 'page-testimonials', group: 'page', title: nav.testimonials, sub: copy.testimonials.sub, href: `/${lang}/testimonials`, text: body(8000, copy.testimonials.text, getTestimonials(lang).flatMap((t) => [t.author, t.role, t.content])) },
    { id: 'page-approche', group: 'page', title: nav.approach, sub: copy.approche.sub, href: `/${lang}/approche`, text: copy.approche.text },
  )

  // Projects (deep dives included: they are pages of their own)
  for (const p of getAllProjects(lang)) {
    entries.push({
      id: `project-${p.id}`,
      group: 'project',
      title: p.title,
      // The sector and the type of the project, not the job held there (a deep dive takes those of its case study)
      sub: (getProjectTags(p.id, lang).length ? getProjectTags(p.id, lang) : getProjectTags(p.parentId ?? '', lang)).join(' · '),
      href: `/${lang}/project/${p.id}`,
      text: body(14000, p.role, getProjectTags(p.id, 'en'), getProjectTags(p.id, 'fr'), p.summary, p.shortDescription, p.missions, p.system?.title, p.system?.desc, p.deliverables, p.body ? strip(p.body) : undefined, caseStudyText(p.id, lang)),
    })
  }

  // Resources: guides apart, then templates and decks
  for (const item of ALL_CONTENT) {
    if (item.type === 'article') {
      const long = lang === 'fr' ? item.body_long_fr : item.body_long_en
      const short = lang === 'fr' ? item.body_fr : item.body_en
      entries.push({
        id: `article-${item.id}`,
        group: 'article',
        title: lang === 'fr' ? item.title_fr : item.title_en,
        sub: [TYPE_LABELS.article[lang], item.category ? CATEGORY_LABELS[item.category][lang] : ''].filter(Boolean).join(' · '),
        href: `/${lang}/signal/${item.id}`,
        text: body(12000, lang === 'fr' ? item.excerpt_fr : item.excerpt_en, strip(long ?? short ?? ''), item.category ? [CATEGORY_LABELS[item.category].en, CATEGORY_LABELS[item.category].fr] : undefined),
      })
      continue
    }
    const tags = (item.tags ?? []).flatMap((t) => [RESOURCE_TAGS[t]?.en, RESOURCE_TAGS[t]?.fr])
    const theme = item.category ? CATEGORY_LABELS[item.category][lang] : ''
    const isGuide = item.type === 'guide'
    const href = !isGuide && item.slug ? `/${lang}/ressources/${item.slug[lang]}` : `/${lang}/${guidePath(item.id)}`
    entries.push({
      id: item.id,
      group: isGuide ? 'guide' : 'resource',
      title: lang === 'fr' ? item.title_fr : item.title_en,
      sub: [TYPE_LABELS[item.type][lang], theme].filter(Boolean).join(' · '),
      href,
      text: body(16000, lang === 'fr' ? item.excerpt_fr : item.excerpt_en, tags, resourceText(item.id, lang)),
    })
  }

  // The skills of the catalogue
  for (const sk of SKILLS) {
    entries.push({
      id: `skill-${sk.id}`,
      group: 'skill',
      title: sk.name,
      sub: sk.summary[lang],
      href: `/${lang}/skills/${sk.id}`,
      text: join(skillText(sk), 'skill claude', sk.themes.map((t) => THEME_WORDS[t])),
    })
  }

  // The chapters of the Claude Code guide
  for (const ch of GUIDE_CHAPTERS) {
    entries.push({
      id: `chapter-${ch.number}`,
      group: 'guide',
      title: lang === 'fr' ? ch.title_fr : ch.title_en,
      sub: lang === 'fr' ? `Guide Claude Code · chapitre ${ch.number}` : `Claude Code guide · chapter ${ch.number}`,
      href: `/${lang}/guide/claude-code/${getChapterSlug(ch, lang)}`,
      text: body(12000, lang === 'fr' ? ch.intro_fr : ch.intro_en, ch.sections.flatMap((s) => [lang === 'fr' ? s.heading_fr : s.heading_en, strip(lang === 'fr' ? s.content_fr : s.content_en)])),
    })
  }

  return entries
}

/**
 * The index of a language, searchable in both. Every entry keeps its title, its line and its address in the language of
 * the page the visitor is on, and carries the title of the other language (`alt`) and the start of its text: typing
 * « work » on the French site finds « Projets », and opens it in French.
 */
const AKA: Record<string, string> = {
  'page-projets': 'projects projets work travaux case studies etudes de cas',
  'page-resume': 'resume cv curriculum vitae',
  'page-about': 'about a propos bio',
  'page-ressources': 'resources ressources library bibliotheque',
  'page-testimonials': 'testimonials temoignages recommendations',
  'page-approche': 'approach approche method',
}

export function buildSearchIndex(lang: Lang): SearchEntry[] {
  const other = new Map(buildEntries(lang === 'fr' ? 'en' : 'fr').map((e) => [e.id, e]))
  return buildEntries(lang).map((e) => {
    const o = other.get(e.id)
    if (!o) return e
    return { ...e, aka: AKA[e.id], alt: o.title !== e.title ? o.title : undefined, text: join(e.text, o.title, o.sub, o.text.slice(0, 500)) }
  })
}
