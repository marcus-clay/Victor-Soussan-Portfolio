'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  CalendarBlank,
  Copy,
  Check,
  LinkedinLogo,
  ArrowUpRight,
  ArrowRight,
} from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import { getArticles } from '@/data/contentData'

const EMAIL = 'victorsoussan@gmail.com'
const CALENDAR_URL = 'https://calendar.app.google/h22c1RRu7JWuK92J9'
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
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-28">

        {/* ============================================ */}
        {/* SECTION 1: Contact                          */}
        {/* ============================================ */}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08] mb-5">
          {isEn ? "Let's talk" : 'Discutons'}
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed max-w-[55ch] mb-14">
          {isEn
            ? 'Open to product design missions, team leadership roles, and interesting problems where design makes a measurable difference.'
            : 'Ouvert aux missions de design produit, aux r\u00f4les de leadership, et aux probl\u00e8mes int\u00e9ressants o\u00f9 le design fait une diff\u00e9rence mesurable.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: CTA + async + connect */}
          <div>
            <div className="mb-10">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#2D5CF3] text-white font-semibold text-base hover:bg-[#2450d9] shadow-sm hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-200 ease-out"
              >
                <CalendarBlank size={20} weight="bold" />
                {isEn ? 'Book a call' : 'R\u00e9server un appel'}
              </a>
            </div>

            <div className="mb-10">
              <p className="text-sm text-gray-400 mb-2">
                {isEn ? 'Prefer async?' : 'Plut\u00f4t par \u00e9crit\u00a0?'}
              </p>
              <div className="flex items-center gap-3">
                <a href={`mailto:${EMAIL}`} className="text-base font-medium text-gray-900 hover:text-[#2D5CF3] transition-colors duration-200">
                  {EMAIL}
                </a>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-gray-100 active:scale-[0.95] transition-[background-color,transform] duration-150 ease-out cursor-pointer"
                  title={isEn ? 'Copy email' : 'Copier l\'email'}
                >
                  {copied
                    ? <Check size={16} weight="bold" className="text-emerald-500" />
                    : <Copy size={16} className="text-gray-400" />
                  }
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white px-7 py-5">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                {isEn ? 'Connect' : 'Retrouvez-moi'}
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <a href="https://linkedin.com/in/victorsoussan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                  <LinkedinLogo size={18} /> LinkedIn
                </a>
                <a href="https://www.condamine.studio/apps" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                  <ArrowUpRight size={14} /> Condamine Apps
                </a>
                <a href="tel:+33615989400" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                  +33 6 15 98 94 00
                </a>
              </div>
            </div>
          </div>

          {/* Right: What I can help with */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 md:p-8 h-fit">
            <h2 className="text-sm font-bold text-gray-900 mb-5">
              {isEn ? 'What I can help with' : 'Ce que je peux apporter'}
            </h2>
            <ul className="space-y-3">
              <li className="flex items-baseline gap-2.5 text-[15px] text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
                <span>
                  <span className="font-semibold text-gray-900">{isEn ? 'Product Design' : 'Design Produit'}</span>
                  {isEn ? ' — UX/UI, design systems, prototyping, from framing to dev handoff' : ' — UX/UI, design systems, prototypage, du cadrage au handoff dev'}
                </span>
              </li>
              <li className="flex items-baseline gap-2.5 text-[15px] text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
                <span>
                  <span className="font-semibold text-gray-900">{isEn ? 'Team Leadership' : 'Leadership'}</span>
                  {isEn ? ' — hiring, mentoring, design ops, delivery cadence' : ' — recrutement, mentoring, design ops, cadence de livraison'}
                </span>
              </li>
              <li className="flex items-baseline gap-2.5 text-[15px] text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2" />
                <span>
                  <span className="font-semibold text-gray-900">{isEn ? 'AI Prototyping' : 'Prototypage IA'}</span>
                  {isEn ? ' — Claude Code, Figma MCP, concept to deployed prototype in hours' : ' — Claude Code, Figma MCP, du concept au prototype d\u00e9ploy\u00e9 en quelques heures'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: Interventions                    */}
        {/* ============================================ */}

        <div id="interventions" className="mt-20 pt-16 border-t border-gray-200 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-gray-900 mb-3">
            {isEn ? 'Speaking & Workshops' : 'Interventions'}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-[55ch] mb-12">
            {isEn
              ? 'Conferences, workshops and training. Product design, design systems, AI tools.'
              : 'Conf\u00e9rences, workshops et formations. Conception produit, design systems, outils IA.'}
          </p>

          {/* Topics */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
              {isEn ? 'Topics' : 'Sujets'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{topic.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formats */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
              {isEn ? 'Formats' : 'Formats'}
            </h3>
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              {formats.map((format, i) => (
                <div
                  key={format.name}
                  className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 px-6 py-4 ${
                    i < formats.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
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
          <div className="rounded-2xl border border-gray-200 bg-white p-7 md:p-8">
            <p className="text-[15px] text-gray-500 mb-5 max-w-[50ch]">
              {isEn
                ? 'Tell me about the format, topic, and context. I\u2019ll get back to you within 48h.'
                : 'Dites-moi quel format vous int\u00e9resse, le sujet, et le contexte. R\u00e9ponse sous 48h.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(isEn ? 'Speaking engagement inquiry' : 'Demande d\u2019intervention')}`}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D5CF3] text-white font-medium text-[15px] hover:bg-[#2450d9] shadow-sm hover:shadow-md active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-200 ease-out"
              >
                {isEn ? 'Send an email' : 'Envoyer un email'}
                <ArrowUpRight size={15} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out" />
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium text-[15px] hover:bg-gray-50 hover:border-gray-300 active:scale-[0.97] transition-[background-color,border-color,transform] duration-200 ease-out"
              >
                {isEn ? 'Book a call' : 'R\u00e9server un appel'}
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out" />
              </a>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: Discovery                        */}
        {/* ============================================ */}

        <div className="mt-20 pt-16 border-t border-gray-200">
          {/* Featured projects */}
          <div className="mb-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {isEn ? 'Recent work' : 'Projets r\u00e9cents'}
              </h2>
              <Link href={`/${lang}/projets`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1">
                {isEn ? 'All projects' : 'Tous les projets'} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/${lang}/project/${project.id}/full`}
                  className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-gray-300 hover:shadow-sm active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-out"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{project.title}</p>
                    <p className="text-xs text-gray-500">{project.role} \u00b7 {project.period}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured articles */}
          {articles.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {isEn ? 'Recent writing' : '\u00c0 lire'}
                </h2>
                <Link href={`/${lang}/ressources`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1">
                  {isEn ? 'All articles' : 'Toutes les ressources'} <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${lang}/signal/${article.id}`}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-sm active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-out"
                  >
                    <p className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#2D5CF3] transition-colors duration-200">
                      {isEn ? article.title_en : article.title_fr}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {isEn ? article.excerpt_en : article.excerpt_fr}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
