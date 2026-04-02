'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Copy,
  Check,
  LinkedinLogo,
  ArrowUpRight,
  ArrowRight,
} from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import { getArticles } from '@/data/contentData'

const EMAIL = 'victorsoussan@gmail.com'
const CALENDAR_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1FzJJuVF3V2pu95ctzbbztxczeq8yQf0ZxbTL_JBrFsuu4iWORqpflL14N8NHM-sR5v1Az4Tew'
const FEATURED_PROJECT_IDS = ['riskos', 'toolkit', 'francevae']

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

export default function ContactPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const [copied, setCopied] = useState(false)
  const isEn = lang === 'en'
  const projects = getProjects(lang).filter(p => FEATURED_PROJECT_IDS.includes(p.id))
  const articles = getArticles().slice(0, 3)
  const topics = TOPICS[lang]
  const formats = FORMATS[lang]

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <div className="max-w-[740px] mx-auto px-6 pt-32 sm:pt-40 md:pt-48 pb-24 md:pb-40">

        {/* ============================================ */}
        {/* SECTION 1: Contact                          */}
        {/* ============================================ */}

        <section className="pb-24 md:pb-40">
          <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 leading-tight mb-4">
            {isEn ? "Let's talk" : 'Discutons'}
          </h1>

          <p className="text-base text-gray-500 leading-relaxed mb-10">
            {isEn
              ? 'Open to product design missions, team leadership roles, and interesting problems where design makes a measurable difference.'
              : 'Ouvert aux missions de design produit, aux r\u00f4les de leadership, et aux probl\u00e8mes int\u00e9ressants o\u00f9 le design fait une diff\u00e9rence mesurable.'}
          </p>

          {/* Primary CTA */}
          <div className="mb-8">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gray-900 text-white font-medium text-[15px] hover:bg-gray-800 active:scale-[0.97] ring-1 ring-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,transform] duration-200 ease-out"
            >
              {isEn ? 'Book a call' : 'R\u00e9server un appel'}
            </a>
          </div>

          {/* Email + copy */}
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-1.5">
              {isEn ? 'Prefer async?' : 'Plut\u00f4t par \u00e9crit\u00a0?'}
            </p>
            <div className="flex items-center gap-3">
              <a href={`mailto:${EMAIL}`} className="text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">
                {EMAIL}
              </a>
              <button
                onClick={handleCopy}
                className="relative p-1.5 rounded-md hover:bg-gray-100 active:scale-[0.95] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
                title={isEn ? 'Copy email' : 'Copier l\'email'}
              >
                <span className={`inline-flex transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`}>
                  <Copy size={16} className="text-gray-400" />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                  <Check size={16} weight="bold" className="text-gray-900" />
                </span>
              </button>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-wrap items-center gap-5">
            <a href="https://linkedin.com/in/victorsoussan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200">
              <LinkedinLogo size={18} /> LinkedIn
            </a>
            <a href="https://www.condamine.studio/apps" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200">
              <ArrowUpRight size={14} /> Condamine Apps
            </a>
            <a href="tel:+33615989400" className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200">
              +33 6 15 98 94 00
            </a>
          </div>
        </section>

        {/* ============================================ */}
        {/* What I can help with                        */}
        {/* ============================================ */}

        <section className="py-24 md:py-40 border-t border-gray-100">
          <h2 className="text-lg font-semibold tracking-[-0.04em] text-gray-900 mb-6">
            {isEn ? 'What I can help with' : 'Ce que je peux apporter'}
          </h2>
          <div className="divide-y divide-gray-100">
            <div className="py-4 first:pt-0">
              <p className="text-[15px] text-gray-900 font-medium mb-1">{isEn ? 'Product Design' : 'Design Produit'}</p>
              <p className="text-base text-gray-500 leading-relaxed">
                {isEn ? 'UX/UI, design systems, prototyping, from framing to dev handoff' : 'UX/UI, design systems, prototypage, du cadrage au handoff dev'}
              </p>
            </div>
            <div className="py-4">
              <p className="text-[15px] text-gray-900 font-medium mb-1">{isEn ? 'Team Leadership' : 'Leadership'}</p>
              <p className="text-base text-gray-500 leading-relaxed">
                {isEn ? 'Hiring, mentoring, design ops, delivery cadence' : 'Recrutement, mentoring, design ops, cadence de livraison'}
              </p>
            </div>
            <div className="py-4 last:pb-0">
              <p className="text-[15px] text-gray-900 font-medium mb-1">{isEn ? 'AI Prototyping' : 'Prototypage IA'}</p>
              <p className="text-base text-gray-500 leading-relaxed">
                {isEn ? 'Claude Code, Figma MCP, concept to deployed prototype in hours' : 'Claude Code, Figma MCP, du concept au prototype d\u00e9ploy\u00e9 en quelques heures'}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: Interventions                    */}
        {/* ============================================ */}

        <section id="interventions" className="py-24 md:py-40 border-t border-gray-100 scroll-mt-24">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
            {isEn ? 'Speaking & Workshops' : 'Interventions'}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-12">
            {isEn
              ? 'Conferences, workshops and training. Product design, design systems, AI tools.'
              : 'Conf\u00e9rences, workshops et formations. Conception produit, design systems, outils IA.'}
          </p>

          {/* Topics */}
          <div className="mb-14">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
              {isEn ? 'Topics' : 'Sujets'}
            </h3>
            <div className="divide-y divide-gray-100">
              {topics.map((topic) => (
                <div key={topic.title} className="py-5 first:pt-0 last:pb-0">
                  <h4 className="text-[15px] font-medium text-gray-900 mb-1.5">{topic.title}</h4>
                  <p className="text-base text-gray-500 leading-relaxed">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formats */}
          <div className="mb-14">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
              {isEn ? 'Formats' : 'Formats'}
            </h3>
            <div className="divide-y divide-gray-100">
              {formats.map((format) => (
                <div
                  key={format.name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-3 sm:w-[200px] flex-shrink-0">
                    <span className="text-[15px] font-medium text-gray-900">{format.name}</span>
                    <span className="text-xs text-gray-400">{format.duration}</span>
                  </div>
                  <p className="text-sm text-gray-500">{format.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Intervention CTA */}
          <div>
            <p className="text-[15px] text-gray-500 mb-5 max-w-[50ch]">
              {isEn
                ? 'Tell me about the format, topic, and context. I\u2019ll get back to you within 48h.'
                : 'Dites-moi quel format vous int\u00e9resse, le sujet, et le contexte. R\u00e9ponse sous 48h.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(isEn ? 'Speaking engagement inquiry' : 'Demande d\u2019intervention')}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium text-[15px] hover:bg-gray-800 active:scale-[0.97] ring-1 ring-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,transform] duration-200 ease-out"
              >
                {isEn ? 'Send an email' : 'Envoyer un email'}
                <ArrowUpRight size={15} weight="bold" />
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 transition-colors duration-200 py-3"
              >
                {isEn ? 'Or book a call' : 'Ou r\u00e9server un appel'}
              </a>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: Discovery                        */}
        {/* ============================================ */}

        <section className="py-24 md:py-40 border-t border-gray-100">
          {/* Featured projects */}
          <div className="mb-14">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-lg font-semibold tracking-[-0.04em] text-gray-900">
                {isEn ? 'Recent work' : 'Projets r\u00e9cents'}
              </h2>
              <Link href={`/${lang}/projets`} className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1">
                {isEn ? 'All projects' : 'Tous les projets'} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/${lang}/project/${project.id}/full`}
                  className="group flex items-baseline justify-between py-3.5 first:pt-0 last:pb-0 transition-colors duration-200"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[15px] font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-200">{project.title}</span>
                    <span className="text-xs text-gray-400">{project.role}</span>
                  </div>
                  <span className="text-xs text-gray-400">{project.period}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured articles */}
          {articles.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-lg font-semibold tracking-[-0.04em] text-gray-900">
                  {isEn ? 'Recent writing' : '\u00c0 lire'}
                </h2>
                <Link href={`/${lang}/ressources`} className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1">
                  {isEn ? 'All articles' : 'Toutes les ressources'} <ArrowRight size={14} />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${lang}/signal/${article.id}`}
                    className="group block py-3.5 first:pt-0 last:pb-0 transition-colors duration-200"
                  >
                    <p className="text-[15px] font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-200 mb-0.5">
                      {isEn ? article.title_en : article.title_fr}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {isEn ? article.excerpt_en : article.excerpt_fr}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
