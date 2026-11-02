'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import HomeBlock from '@/components/sections/HomeBlock'
import ContactCTASection from '@/components/sections/ContactCTASection'
import Reveal from '@/components/ui/Reveal'
import ClaudeHeroStage from '@/components/claude/ClaudeHeroStage'
import { SkillPicture } from '@/components/skills/SkillScene'
import { PILL, RepoLink, ROW, ROW_ARROW, TEXT_LINK } from '@/components/claude/ui'
import { FEATURED_SKILL_IDS, SKILLS, SKILLS_DEMOS, SKILLS_REPO, SKILL_THEMES, getTheme, type Lang, type SkillEntry } from '@/data/skillsCatalogue'
import { GUIDE_CHAPTERS } from '@/data/guideClaudeCodeData'
import { TRANSLATIONS } from '@/data/translations'

/**
 * The Claude page, in the order a visitor asks the questions. The hero says what this is and shows it (agentic design
 * as a whole, a Stageshow picture). Then the approach, in one sentence and three habits; how to get started, as three
 * steps of the guide; the skills, which carry the page (a wide grid of six, not a side block); the four uses, and the
 * other guides. Each block has one shape: habits are plain columns, steps and guides are rows that lead to a page,
 * skills are cards, uses are plain text with links. Nothing unfolds.
 */

type Link2 = { label: string; skill?: string; path?: string }

const COPY = {
  en: {
    title: 'Designing with Claude',
    lead: 'Welcome. I share here my experience of designing with agents, with the guides and skills I use. Everything is free to use: take it, adapt it, and pass it on to your peers or to anyone starting with Claude in design and agentic design.',
    ctaSkills: 'Explore the skills',
    ctaGuide: 'Get started',
    approachTitle: 'The approach',
    approach: 'An agent saves time once it knows your rules. I write mine once, as skills, guides and a context folder, and every design task starts from there.',
    habits: [
      ['Describe the result', 'Say what you want to obtain and why.'],
      ['Set rules', 'Skills and a CLAUDE.md file give the agent your conventions: tone, structure, scope.'],
      ['Validate before keeping', 'Each write is proposed first. You read it, then it is kept.'],
    ],
    setupTitle: 'Get started',
    setupNote: 'Three steps in the guide.',
    steps: [
      { title: 'Understand Claude Code', text: 'What the tool does and how to talk to it.', slug: 'understanding' },
      { title: 'Set up your environment', text: 'Install the tool and open a first folder.', slug: 'setup' },
      { title: 'Add skills', text: 'Plug the skills of the catalogue into your project.', slug: 'skills' },
    ],
    guideAll: 'Read the whole guide',
    chapters: 'chapters',
    skillsTitle: 'Skills',
    skillsNote: 'Six to begin with. Each page details the installation.',
    skillsAll: 'All the skills',
    themes: 'themes',
    usesTitle: 'What for',
    usesNote: 'Four uses and what they bring.',
    labels: { case: 'Use case', benefit: 'Benefit', how: 'How to use it' },
    uses: [
      {
        title: 'Frame and write',
        case: 'An interview synthesis, a framing note, a deliverable.',
        benefit: 'A steady tone and structure from the first version.',
        how: 'Install',
        links: [{ label: 'sober-writing', skill: 'sober-writing' }, { label: 'signal-research', skill: 'signal-research' }] as Link2[],
        after: 'then describe your text.',
      },
      {
        title: 'Design and prototype',
        case: 'Going from an idea to a prototype or a mockup you can show.',
        benefit: 'An animated prototype played like a short film, mockups created straight in Figma.',
        how: 'Start with',
        links: [{ label: 'prototype-anime', skill: 'prototype-anime' }, { label: 'figma-console-mcp', skill: 'figma-console-mcp' }] as Link2[],
        after: 'then describe the journey.',
      },
      {
        title: 'Equip a team',
        case: 'Keeping a product or a site consistent across several people.',
        benefit: 'Tokens, motion and illustrations aligned from one page to the next.',
        how: 'Add',
        links: [{ label: 'brand-system', skill: 'brand-system' }, { label: 'transitions-polish', skill: 'transitions-polish' }] as Link2[],
        after: 'to the project: Claude applies them to each page.',
      },
      {
        title: 'Steer with a personal OS',
        case: 'Following several topics and keeping track of decisions.',
        benefit: 'A memory in text files: decisions, actions and context at hand.',
        how: 'Follow',
        links: [{ label: 'the guide', path: 'guide/os-personnel' }, { label: 'personal-os', skill: 'personal-os' }] as Link2[],
        after: 'to create your own folder.',
      },
    ],
    guidesTitle: 'More guides',
    guides: [
      { title: 'A personal OS with Claude Code', text: 'A memory and a dashboard for your work: inbox, rules, agents, use cases.', path: 'guide/os-personnel' },
      { title: 'Ship to Show', text: 'Turn a prototype into a published case study with animated videos.', path: 'guide/ship-to-show' },
    ],
    moreLinks: [
      { label: 'Claude Code and Figma MCP: designing and implementing in one place', path: 'signal/claude-code-figma-mcp', external: false },
      { label: 'Live demos of animated prototypes', path: SKILLS_DEMOS, external: true },
    ],
  },
  fr: {
    title: 'Concevoir avec Claude',
    lead: 'Bienvenue. Je partage ici mon expérience de la conception avec des agents, avec les guides et les skills que j’utilise. Tout est en libre accès : reprenez-le, adaptez-le, et transmettez-le à vos pairs ou à toute personne qui débute avec Claude dans la conception et le design agentique.',
    ctaSkills: 'Explorer les skills',
    ctaGuide: 'Démarrer',
    approachTitle: 'L’approche',
    approach: 'Un agent fait gagner du temps quand il connaît vos règles. J’écris les miennes une fois, en skills, en guides et en dossier de contexte, et chaque tâche de conception repart de là.',
    habits: [
      ['Décrire le résultat', 'Dites ce que vous voulez obtenir et pourquoi.'],
      ['Poser des règles', 'Des skills et un fichier CLAUDE.md donnent à l’agent vos conventions : ton, structure, périmètre.'],
      ['Valider avant de garder', 'Chaque écriture est d’abord proposée. Vous la relisez, puis elle est conservée.'],
    ],
    setupTitle: 'Démarrer',
    setupNote: 'Trois étapes dans le guide.',
    steps: [
      { title: 'Comprendre Claude Code', text: 'Ce que l’outil fait et comment lui parler.', slug: 'comprendre' },
      { title: 'Préparer son environnement', text: 'Installer l’outil et ouvrir un premier dossier.', slug: 'environnement' },
      { title: 'Ajouter des skills', text: 'Brancher les skills du catalogue à votre projet.', slug: 'skills' },
    ],
    guideAll: 'Lire tout le guide',
    chapters: 'chapitres',
    skillsTitle: 'Skills',
    skillsNote: 'Six pour commencer. Chaque page détaille l’installation.',
    skillsAll: 'Toutes les skills',
    themes: 'thèmes',
    usesTitle: 'Pour quoi faire',
    usesNote: 'Quatre usages et ce qu’ils apportent.',
    labels: { case: 'Cas d’usage', benefit: 'Bénéfice', how: 'Pour l’utiliser' },
    uses: [
      {
        title: 'Cadrer et rédiger',
        case: 'Une synthèse d’entretiens, une note de cadrage, un livrable.',
        benefit: 'Un ton et une structure constants dès la première version.',
        how: 'Installez',
        links: [{ label: 'sober-writing', skill: 'sober-writing' }, { label: 'signal-research', skill: 'signal-research' }] as Link2[],
        after: 'puis décrivez votre texte.',
      },
      {
        title: 'Concevoir et prototyper',
        case: 'Passer d’une idée à un prototype ou une maquette à montrer.',
        benefit: 'Un prototype animé comme un court film, des maquettes créées directement dans Figma.',
        how: 'Commencez par',
        links: [{ label: 'prototype-anime', skill: 'prototype-anime' }, { label: 'figma-console-mcp', skill: 'figma-console-mcp' }] as Link2[],
        after: 'puis décrivez le parcours.',
      },
      {
        title: 'Outiller une équipe',
        case: 'Garder un produit ou un site cohérent à plusieurs.',
        benefit: 'Tokens, mouvements et illustrations alignés d’une page à l’autre.',
        how: 'Ajoutez',
        links: [{ label: 'brand-system', skill: 'brand-system' }, { label: 'transitions-polish', skill: 'transitions-polish' }] as Link2[],
        after: 'au projet : Claude les applique à chaque page.',
      },
      {
        title: 'Piloter avec un OS personnel',
        case: 'Suivre plusieurs sujets et garder le fil des décisions.',
        benefit: 'Une mémoire en fichiers texte : décisions, actions et contexte à portée de main.',
        how: 'Suivez',
        links: [{ label: 'le guide', path: 'guide/os-personnel' }, { label: 'personal-os', skill: 'personal-os' }] as Link2[],
        after: 'pour créer votre dossier.',
      },
    ],
    guidesTitle: 'Autres guides',
    guides: [
      { title: 'Un OS personnel avec Claude Code', text: 'Une mémoire et un tableau de bord pour son travail : inbox, règles, agents, cas d’usage.', path: 'guide/os-personnel' },
      { title: 'Ship to Show', text: 'Transformer un prototype en étude de cas publiée, avec des vidéos animées.', path: 'guide/ship-to-show' },
    ],
    moreLinks: [
      { label: 'Claude Code et Figma MCP : concevoir et implémenter au même endroit', path: 'signal/claude-code-figma-mcp', external: false },
      { label: 'Les démos en direct des prototypes animés', path: SKILLS_DEMOS, external: true },
    ],
  },
} as const

/** French typography: a no-break space before : ; ? ! and inside « » */
const fr = (s: string, lang: Lang) => (lang === 'fr' ? s.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ') : s)

function FeaturedSkill({ skill, lang }: { skill: SkillEntry; lang: Lang }) {
  return (
    <Link
      href={`/${lang}/skills/${skill.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white outline-offset-4 transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] [@media(hover:hover)]:hover:border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
    >
      <SkillPicture skill={skill} lang={lang} className="m-2.5" />
      <div className="flex flex-1 flex-col p-6 pt-4">
        <p className="text-xs text-gray-500">{getTheme(skill.themes[0]).label[lang]}</p>
        <h3 className="mt-1.5 font-mono text-[16px] font-semibold tracking-[-0.01em] text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">{skill.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{fr(skill.outcome[lang], lang)}</p>
      </div>
    </Link>
  )
}

export default function ClaudePageClient({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  const featured = FEATURED_SKILL_IDS.map((id) => SKILLS.find((s) => s.id === id)).filter(Boolean) as SkillEntry[]
  const hrefOf = (l: Link2) => (l.skill ? `/${lang}/skills/${l.skill}` : `/${lang}/${l.path}`)

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Hero: what this is, and the whole idea in one picture */}
      <header className="wrap pt-10 pb-12 md:pt-16 md:pb-16">
        <h1 className="text-display text-gray-900">{c.title}</h1>
        <p className="mt-6 max-w-[54ch] text-lead-lg text-gray-600 md:mt-8">{fr(c.lead, lang)}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-10">
          <Link href={`/${lang}/skills`} className={PILL}>
            {c.ctaSkills}
            <ArrowRight className="btn-arrow" size={16} weight="bold" aria-hidden="true" />
          </Link>
          <Link href={`/${lang}/guide/claude-code`} className={`group ${TEXT_LINK}`}>
            <span className="link-line">{c.ctaGuide}</span>
            <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-12 overflow-hidden rounded-[28px] bg-[#F4F4F2] ring-1 ring-inset ring-black/[0.04] md:mt-16">
          <div className="aspect-[358/440] w-full min-[560px]:aspect-[960/520]">
            <ClaudeHeroStage lang={lang} />
          </div>
        </div>
      </header>

      {/* The approach: one sentence, three habits */}
      <HomeBlock id="approach" title={c.approachTitle}>
        <p className="max-w-[46ch] text-lead-lg text-gray-900">{fr(c.approach, lang)}</p>
        <ul className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {c.habits.map(([title, text]) => (
            <li key={title} className="border-t border-gray-200 pt-4">
              <h3 className="text-title-3 text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{fr(text, lang)}</p>
            </li>
          ))}
        </ul>
      </HomeBlock>

      {/* Getting started: three steps of the guide */}
      <HomeBlock id="setup" title={c.setupTitle} note={c.setupNote}>
        <div className="divide-y divide-gray-100 border-b border-gray-100">
          {c.steps.map((step) => (
            <Link key={step.slug} href={`/${lang}/guide/claude-code/${step.slug}`} className={ROW}>
              <div className="min-w-0">
                <h3 className="text-title-3 text-gray-900">{step.title}</h3>
                <p className="mt-1.5 max-w-[60ch] text-sm text-gray-600">{fr(step.text, lang)}</p>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={ROW_ARROW} />
            </Link>
          ))}
        </div>
        <Link href={`/${lang}/guide/claude-code`} className={`group ${TEXT_LINK} mt-4`}>
          <span className="link-line">
            {c.guideAll} · {GUIDE_CHAPTERS.length} {c.chapters}
          </span>
          <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
        </Link>
      </HomeBlock>

      {/* The skills carry the page: a wide block of its own, six cards on the full width */}
      <section id="skills" aria-labelledby="skills-title" className="pb-16 md:pb-28">
        <div className="wrap">
          <Reveal className="border-t border-gray-200 pt-6 md:pt-8">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <h2 id="skills-title" className="text-subhead text-gray-900">{c.skillsTitle}</h2>
                <p className="mt-3 max-w-[48ch] text-base text-gray-600">{fr(c.skillsNote, lang)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6">
                <Link href={`/${lang}/skills`} className={`group ${TEXT_LINK}`}>
                  <span className="link-line">
                    {c.skillsAll} ({SKILLS.length} · {SKILL_THEMES.length} {c.themes})
                  </span>
                  <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </Link>
                <RepoLink href={SKILLS_REPO} muted />
              </div>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {featured.map((s) => (
                <li key={s.id} className="min-w-0">
                  <FeaturedSkill skill={s} lang={lang} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <HomeBlock id="uses" title={c.usesTitle} note={c.usesNote}>
        <ul className="divide-y divide-gray-100 border-b border-gray-100">
          {c.uses.map((u) => (
            <li key={u.title} className="py-6 md:py-8">
              <h3 className="text-title-3 text-gray-900">{u.title}</h3>
              <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[7.5rem_1fr]">
                <dt className="text-gray-500">{c.labels.case}</dt>
                <dd className="max-w-[56ch] text-gray-600">{fr(u.case, lang)}</dd>
                <dt className="text-gray-500">{c.labels.benefit}</dt>
                <dd className="max-w-[56ch] text-gray-900">{fr(u.benefit, lang)}</dd>
                <dt className="text-gray-500">{c.labels.how}</dt>
                <dd className="max-w-[56ch] text-gray-600">
                  {u.how}{' '}
                  {u.links.map((l, i) => (
                    <React.Fragment key={l.label}>
                      {i > 0 && (lang === 'fr' ? ' et ' : ' and ')}
                      <Link href={hrefOf(l)} className={`font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 transition-colors duration-150 ${l.skill ? 'font-mono text-[13px]' : ''}`}>
                        <span className="link-line">{l.label}</span>
                      </Link>
                    </React.Fragment>
                  ))}{' '}
                  {fr(u.after, lang)}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </HomeBlock>

      <HomeBlock id="guides" title={c.guidesTitle}>
        <div className="divide-y divide-gray-100 border-b border-gray-100">
          {c.guides.map((g) => (
            <Link key={g.path} href={`/${lang}/${g.path}`} className={ROW}>
              <div className="min-w-0">
                <h3 className="text-title-3 text-gray-900">{g.title}</h3>
                <p className="mt-1.5 max-w-[60ch] text-sm text-gray-600">{fr(g.text, lang)}</p>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={ROW_ARROW} />
            </Link>
          ))}
        </div>
        <ul className="mt-6 space-y-1">
          {c.moreLinks.map((l) => (
            <li key={l.path}>
              {l.external ? (
                <a href={l.path} target="_blank" rel="noopener noreferrer" className={`group ${TEXT_LINK}`}>
                  <span className="link-line">{fr(l.label, lang)}</span>
                  <ArrowUpRight size={12} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <Link href={`/${lang}/${l.path}`} className={`group ${TEXT_LINK}`}>
                  <span className="link-line">{fr(l.label, lang)}</span>
                  <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </HomeBlock>

      <ContactCTASection lang={lang} content={TRANSLATIONS[lang]} />
    </div>
  )
}
