'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Copy,
  Check,
  ArrowUpRight,
  ArrowRight,
} from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import { getArticles } from '@/data/contentData'
import HomeBlock from '@/components/sections/HomeBlock'
import TopicsCarousel from '@/components/contact/TopicsCarousel'
import { RelatedCard, type RelatedItem } from '@/components/RelatedContent'

const EMAIL = 'victorsoussan@gmail.com'
const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1FzJJuVF3V2pu95ctzbbztxczeq8yQf0ZxbTL_JBrFsuu4iWORqpflL14N8NHM-sR5v1Az4Tew'
const FEATURED_PROJECT_IDS = ['riskos', 'toolkit', 'france-vae']

const TOPICS = {
  en: [
    { title: 'Claude Code for designers', desc: 'How a product designer uses Claude Code daily for research, prototyping, code and documentation. Drawn from my own practice.' },
    { title: 'Figma MCP: from design token to coded component', desc: 'Syncing Figma and code. Reading tokens, specs and variables directly in the development environment.' },
    { title: 'AI prototyping: from concept to deployment', desc: 'The full workflow: idea, prompt, prototype, test, deploy. With real cases from 50+ shipped prototypes.' },
    { title: 'Design Systems and AI', desc: 'Building and maintaining a design system when code generation tools change the workflow. Tokens, components, documentation.' },
  ],
  fr: [
    { title: 'Claude Code pour designers', desc: 'Comment un designer produit utilise Claude Code au quotidien pour la recherche, le prototypage, le code et la documentation. Tir\u00e9 de ma pratique.' },
    { title: 'Figma MCP\u00a0: du design token au composant cod\u00e9', desc: 'Synchroniser Figma et le code. Tokens, specs et variables lus directement dans l\u2019environnement de dev.' },
    { title: 'Prototypage IA\u00a0: du concept au d\u00e9ploiement', desc: 'Id\u00e9e, prompt, prototype, test, d\u00e9ploiement. Le workflow complet, avec des cas r\u00e9els (50+ prototypes livr\u00e9s).' },
    { title: 'Design Systems et IA', desc: 'Construire et maintenir un design system quand les outils de g\u00e9n\u00e9ration de code modifient le workflow. Tokens, composants, documentation.' },
  ],
}

const FORMATS = {
  en: [
    { name: 'Conference', duration: '45\u201360 min', context: 'Presentation + Q&A. Internal or public event.' },
    { name: 'Brownbag lunch', duration: '30\u201345 min', context: 'Short, informal. For a design or product team.' },
    { name: 'Workshop', duration: 'Half-day or full day', context: 'Hands-on exercises, practical work.' },
    { name: 'Webinar', duration: '45 min remote', context: 'For distributed teams or a first conversation.' },
  ],
  fr: [
    { name: 'Conf\u00e9rence', duration: '45\u201360 min', context: 'Pr\u00e9sentation + Q&A. \u00c9v\u00e9nement interne ou public.' },
    { name: 'Brownbag lunch', duration: '30\u201345 min', context: 'Format court, informel. Pour une \u00e9quipe design ou produit.' },
    { name: 'Workshop', duration: 'Demi-journ\u00e9e ou journ\u00e9e', context: 'Exercices pratiques, hands-on.' },
    { name: 'Webinaire', duration: '45 min en visio', context: '\u00c9quipes distribu\u00e9es ou premier contact.' },
  ],
}

const HELP = {
  en: [
    { title: 'Product Design', desc: 'UX/UI, design systems, prototyping, from framing to dev handoff' },
    { title: 'Team Leadership', desc: 'Hiring, mentoring, design ops, delivery cadence' },
    { title: 'AI Prototyping', desc: 'Claude Code, Figma MCP, concept to deployed prototype in hours' },
  ],
  fr: [
    { title: 'Design Produit', desc: 'UX/UI, design systems, prototypage, du cadrage au handoff dev' },
    { title: 'Leadership', desc: 'Recrutement, mentoring, design ops, cadence de livraison' },
    { title: 'Prototypage IA', desc: 'Claude Code, Figma MCP, du concept au prototype déployé en quelques heures' },
  ],
}

/** Text link: ink with a quiet underline, grey on hover, 44px tall hit area, presses on tap */
const TEXT_LINK =
  'inline-flex min-h-11 items-center text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-out'

/** Same link, quieter: grey at rest, ink on hover (the muted state is a class, not !important, so hover can win) */
const TEXT_LINK_MUTED =
  'inline-flex min-h-11 items-center text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.97] transition-[color,transform] duration-150 ease-out'

/** Black pill, the only primary action of the page (twice: calendar, then speaking enquiries) */
const PILL =
  'inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-gray-900 [@media(hover:hover)]:hover:bg-black text-white text-sm font-medium active:scale-[0.97] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]'

const ROW_LINK =
  'group -mx-3 px-3 py-5 md:py-6 rounded-lg flex items-start justify-between gap-6 transition-colors duration-150 [@media(hover:hover)]:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'

const coverSrc = (cover: string) => (cover.startsWith('/') ? cover : `/images/${cover}`)

export default function ContactPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const [copied, setCopied] = useState(false)
  const isEn = lang === 'en'
  const topics = TOPICS[lang]
  const formats = FORMATS[lang]
  const help = HELP[lang]

  const projectItems: RelatedItem[] = getProjects(lang)
    .filter((p) => FEATURED_PROJECT_IDS.includes(p.id))
    .map((p) => ({
      href: `/${lang}/project/${p.id}`,
      title: p.title,
      label: p.role,
      description: p.summary,
      cover: { src: coverSrc(p.coverImage) },
    }))

  const articles = getArticles().slice(0, 3)
  const subject = (s: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(s)}`

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Opening, same grammar as the homepage: display title, one paragraph, the actions */}
      <header className="wrap pt-10 md:pt-16 pb-14 md:pb-20">
        <h1 className="text-display text-gray-900">
          {isEn ? "Let's talk" : 'Discutons'}
        </h1>
        <p className="mt-8 md:mt-10 max-w-[56ch] text-lead-lg text-gray-600">
          {isEn
            ? 'Open to product design missions, team leadership roles, and interesting problems where design makes a measurable difference.'
            : 'Ouvert aux missions de design produit, aux rôles de leadership, et aux problèmes intéressants où le design fait une différence mesurable.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={PILL}>
            {isEn ? 'Book a call' : 'Réserver un appel'}
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${EMAIL}`}
              className="min-w-0 break-words text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 transition-colors duration-150 ease-out"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="relative inline-flex shrink-0 items-center justify-center min-h-11 min-w-11 rounded-md [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.95] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
              title={isEn ? 'Copy email' : 'Copier l’email'}
              aria-label={isEn ? 'Copy email' : 'Copier l’email'}
            >
              <span className={`inline-flex transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`}>
                <Copy size={16} className="text-gray-500" />
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                <Check size={16} weight="bold" className="text-gray-900" />
              </span>
            </button>
          </div>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-6">
          <a href="https://linkedin.com/in/victorsoussan-product-design" target="_blank" rel="noopener noreferrer" className={`${TEXT_LINK_MUTED} gap-1.5`}>
            LinkedIn <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
          </a>
          <a href="https://www.condamine.studio/apps" target="_blank" rel="noopener noreferrer" className={`${TEXT_LINK_MUTED} gap-1.5`}>
            Condamine Apps <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
          </a>
          <a href="tel:+33615989400" className={TEXT_LINK_MUTED}>
            +33 6 15 98 94 00
          </a>
        </div>
      </header>

      {/* What I can help with: title left, three rows right */}
      <HomeBlock id="help" title={isEn ? 'What I can help with' : 'Ce que je peux apporter'}>
        <dl className="divide-y divide-gray-100 border-b border-gray-100">
          {help.map((item) => (
            <div key={item.title} className="grid gap-x-6 gap-y-2 py-6 md:grid-cols-[minmax(0,15rem)_1fr] md:py-8">
              <dt className="text-subhead text-gray-900">{item.title}</dt>
              <dd className="max-w-[48ch] text-base text-gray-600 md:pt-1.5">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </HomeBlock>

      {/* Speaking: the topics as a strip of dark cards, the high-contrast object of the page */}
      <section id="interventions" aria-labelledby="interventions-title" className="scroll-mt-24 pb-16 md:pb-28">
        <div className="wrap">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-gray-200 pt-6 md:pt-8">
            <div className="col-span-12 md:col-span-3">
              <h2 id="interventions-title" className="text-title-2 text-gray-900">
                {isEn ? 'Speaking & Workshops' : 'Interventions'}
              </h2>
            </div>
            <p className="col-span-12 md:col-span-9 max-w-[48ch] text-lead-lg text-gray-600">
              {isEn
                ? 'Conferences, workshops and training. Product design, design systems, AI tools.'
                : 'Conférences, workshops et formations. Conception produit, design systems, outils IA.'}
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-10">
          <TopicsCarousel
            topics={topics.map((topic) => ({
              ...topic,
              href: subject(isEn ? `Speaking: ${topic.title}` : `Intervention : ${topic.title}`),
            }))}
            cardLabel={isEn ? 'Ask about this topic' : 'Parler de ce sujet'}
            labels={{
              track: isEn ? 'Talk topics' : 'Sujets d’intervention',
              prev: isEn ? 'Previous topic' : 'Sujet précédent',
              next: isEn ? 'Next topic' : 'Sujet suivant',
            }}
          />
        </div>
      </section>

      {/* Formats: rows as in the method block, then how to ask */}
      <HomeBlock id="formats" title="Formats">
        <dl className="divide-y divide-gray-100 border-b border-gray-100">
          {formats.map((format) => (
            <div key={format.name} className="grid gap-x-6 gap-y-1 py-5 md:grid-cols-[minmax(0,15rem)_9rem_1fr] md:py-6">
              <dt className="text-title-3 text-gray-900">{format.name}</dt>
              <dd className="text-sm text-gray-500 md:pt-0.5">{format.duration}</dd>
              <dd className="max-w-[48ch] text-sm text-gray-600 md:pt-0.5">{format.context}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-[56ch] text-base text-gray-900">
          {isEn
            ? 'Tell me about the format, topic, and context. I’ll get back to you within 48h.'
            : 'Dites-moi quel format vous intéresse, le sujet, et le contexte. Réponse sous 48h.'}
        </p>
        <div className="mt-4 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
          <a href={subject(isEn ? 'Speaking engagement inquiry' : 'Demande d’intervention')} className={PILL}>
            {isEn ? 'Send an email' : 'Envoyer un email'}
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
            {isEn ? 'Or book a call' : 'Ou réserver un appel'}
          </a>
        </div>
      </HomeBlock>

      {/* Recent work: the picture cards of the site */}
      <HomeBlock id="work" title={isEn ? 'Recent work' : 'Projets récents'}>
        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {projectItems.map((item) => (
            <li key={item.href} className="min-w-0">
              <RelatedCard item={item} />
            </li>
          ))}
        </ul>
        <Link
          href={`/${lang}/projets`}
          className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
        >
          {isEn ? 'All projects' : 'Tous les projets'}
          <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </HomeBlock>

      {/* Recent writing: the resources rows of the homepage */}
      <HomeBlock id="writing" title={isEn ? 'Recent writing' : 'À lire'}>
        <ul role="list" className="divide-y divide-gray-100 border-b border-gray-100">
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`/${lang}/signal/${article.id}`} className={ROW_LINK}>
                <div className="min-w-0">
                  <h3 className="text-title-3 text-gray-900">{isEn ? article.title_en : article.title_fr}</h3>
                  <p className="mt-1.5 max-w-[60ch] text-sm text-gray-600 line-clamp-2">
                    {isEn ? article.excerpt_en : article.excerpt_fr}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-gray-500 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-gray-900"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/${lang}/ressources`}
          className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
        >
          {isEn ? 'All articles' : 'Toutes les ressources'}
          <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </HomeBlock>
    </div>
  )
}
