'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { getArticles } from '@/data/contentData'

const CALENDAR_URL = 'https://calendar.app.google/h22c1RRu7JWuK92J9'
const EMAIL = 'victorsoussan@gmail.com'

const TOPICS = {
  en: [
    {
      title: 'Claude Code for designers',
      desc: 'How a product designer uses Claude Code daily for research, prototyping, code and documentation. Drawn from my own practice.',
    },
    {
      title: 'Figma MCP: from design token to coded component',
      desc: 'Syncing Figma and code. Reading tokens, specs and variables directly in the development environment.',
    },
    {
      title: 'AI prototyping: from concept to deployment',
      desc: 'The full workflow: idea, prompt, prototype, test, deploy. With real cases from 50+ shipped prototypes.',
    },
    {
      title: 'Design Systems and AI',
      desc: 'Building and maintaining a design system when code generation tools change the workflow. Tokens, components, documentation.',
    },
  ],
  fr: [
    {
      title: 'Claude Code pour designers',
      desc: 'Comment un designer produit utilise Claude Code au quotidien pour la recherche, le prototypage, le code et la documentation. Tir\u00e9 de ma pratique.',
    },
    {
      title: 'Figma MCP\u00a0: du design token au composant cod\u00e9',
      desc: 'Synchroniser Figma et le code. Tokens, specs et variables lus directement dans l\u2019environnement de dev.',
    },
    {
      title: 'Prototypage IA\u00a0: du concept au d\u00e9ploiement',
      desc: 'Id\u00e9e, prompt, prototype, test, d\u00e9ploiement. Le workflow complet, avec des cas r\u00e9els (50+ prototypes livr\u00e9s).',
    },
    {
      title: 'Design Systems et IA',
      desc: 'Construire et maintenir un design system quand les outils de g\u00e9n\u00e9ration de code modifient le workflow. Tokens, composants, documentation.',
    },
  ],
}

const FORMATS = {
  en: [
    { name: 'Conference', duration: '45\u201360 min', context: 'Presentation + Q&A. Internal or public event.' },
    { name: 'Brownbag lunch', duration: '30\u201345 min', context: 'Short, informal format. For a design or product team.' },
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

export default function InterventionsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const topics = TOPICS[lang]
  const formats = FORMATS[lang]
  const articles = getArticles().slice(0, 3)

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-28">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08] mb-5">
          {isEn ? 'Speaking & Workshops' : 'Interventions'}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-[60ch] mb-16">
          {isEn
            ? 'Conferences, workshops and training. Product design, design systems, AI tools.'
            : 'Conf\u00e9rences, workshops et formations. Conception produit, design systems, outils IA.'}
        </p>

        {/* Topics — 2-column grid */}
        <section className="mb-20">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
            {isEn ? 'Topics' : 'Sujets'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formats — list */}
        <section className="mb-20">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
            {isEn ? 'Formats' : 'Formats'}
          </h2>
          <div className="space-y-0 rounded-2xl border border-gray-200 bg-white overflow-hidden">
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
        </section>

        {/* About — compact */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                src="/images/photos victor/image-victor-linkedin.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
                {isEn
                  ? 'Victor Soussan, Lead Product Designer. 15 years of experience with Airbus, Orange, beta.gouv, Dailymotion, Unowhy. I use Claude Code and Figma MCP daily to design, prototype and ship.'
                  : 'Victor Soussan, Lead Product Designer. 15 ans d\u2019exp\u00e9rience avec Airbus, Orange, beta.gouv, Dailymotion, Unowhy. J\u2019utilise Claude Code et Figma MCP au quotidien pour concevoir, prototyper et livrer.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/guide/claude-code`}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                >
                  {isEn ? 'Claude Code guide' : 'Guide Claude Code'}
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href={`/${lang}/ressources`}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                >
                  {isEn ? 'Articles' : 'Articles'}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mb-20">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {isEn ? 'Propose an engagement' : 'Proposer une intervention'}
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-[50ch]">
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
        </section>

        {/* Related content — articles */}
        {articles.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {isEn ? 'On these topics' : 'Sur ces sujets'}
              </h2>
              <Link
                href={`/${lang}/ressources`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
              >
                {isEn ? 'All articles' : 'Toutes les ressources'}
                <ArrowRight size={14} />
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
          </section>
        )}

      </div>
    </div>
  )
}
