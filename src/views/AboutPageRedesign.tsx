'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, X, DownloadSimple, Copy, Check } from '@phosphor-icons/react'
import TestimonialsLink from '@/components/testimonials/TestimonialsLink'
import { ActHeader } from '@/components/case-study/ActSection'
import CardCarousel from '@/components/ui/CardCarousel'
import Reveal from '@/components/ui/Reveal'
import { BLOCK, Disclosure, SubTitle } from '@/components/ui/ActBlocks'
import CareerPhasesDiagram from '@/components/about/CareerPhasesDiagram'
import PracticeExplorer from '@/components/about/PracticeExplorer'
import type { ResourceArt } from '@/data/resourcesData'
import { aboutEras } from '@/data/profileData'
import { TRANSLATIONS as SITE_TRANSLATIONS } from '@/data/translations'

type Language = 'en' | 'fr'

interface Resource {
  title: string
  type: string
  desc: string
  link: string
  icon: React.ReactNode
  art?: ResourceArt
}

interface AboutPageRedesignProps {
  lang: Language
  onBack: () => void
  onContact: () => void
  resources: Resource[]
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const TRANSLATIONS = {
  en: {
    page_title: 'About',
    role: 'Lead Product Designer \u00b7 Paris',
    intro:
      "Lead Product Designer working on B2B and B2G SaaS and complex business interfaces. I frame with a PM and deliver with a developer, and I prototype myself when the question calls for it. I design the journeys and I lead a team's design practice.",
    bio_p1:
      "My approach starts before Figma: vision workshops with leadership, problem framing with product teams, ideation with stakeholders, field user research. Then design, prototyping, design system and delivery.",
    bio_p2:
      "References: the SQOOL suite (7 applications, 500,000 students, a team of 5 designers), Dailymotion's publisher tools (8,000+ users, Paris and New York), France VAE for beta.gouv, the PagesJaunes mobile apps (22 million downloads).",
    quote_text:
      'Victor combines overflowing creativity with impressive rigor.',
    quote_author: 'Charlotte Rifflet, CPO UNOWHY',
    career_title: 'Journey',
    eras: aboutEras('en'),
    practice_title: 'Current Practice',
    practice_text:
      'Since early 2025, AI has been part of my toolkit. Most of the job stays with people: I lead, AI equips.',
    education_title: 'Education',
    education_line1: 'Master Communication & Multimedia, ISCOM Paris (2001 to 2005)',
    education_line2: 'UX/UI Design & Prototyping, UXcel/Udemy (2021)',
    cta_text: 'Want to talk?',
    cta_availability: 'I hold a full-time role and remain available for short consulting and freelance missions.',
    cta_email: 'victorsoussan@gmail.com',
    linkedin_label: 'Full background and recommendations',
    cv_label: 'View or download resume',
    testimonials_link: 'View all testimonials',
    resources_section_title: 'Resources',
    resources_section_desc: 'Templates, checklists and process docs I use in my day-to-day practice.',
    resources_link: 'Guides, articles and complementary resources',
    more: 'Read more',
    less: 'Show less',
    career_lead: 'From agencies to business products: the thread is designing dense, data-rich tools.',
    career_periods: 'The main periods',
    career_steps: 'Step by step',
    era_more: 'See details',
    era_less: 'Show less',
    practice_flow: 'What I lead, what AI equips',
    contact_email: 'Email',
    contact_copy: 'Copy address',
    contact_copied: 'Copied',
    carousels: {
      eras: { track: 'Career steps, from the most recent to the oldest', prev: 'Previous step', next: 'Next step' },
      resources: { track: 'Resources', prev: 'Previous resource', next: 'Next resource' },
    },
  },
  fr: {
    page_title: 'À propos',
    role: 'Lead Product Designer · Paris',
    intro:
      "Lead Product Designer, spécialisé dans les SaaS B2B, B2G et les interfaces métier complexes. Je cadre avec un PM, je livre avec un développeur, et je prototype moi-même quand la question l’exige. Je conçois les parcours et je dirige la pratique design d’une équipe.",
    bio_p1:
      "Mon approche commence avant Figma : ateliers de vision avec la direction, cadrage du problème avec les équipes produit, idéation avec les parties prenantes, recherche utilisateur sur le terrain. Ensuite viennent la conception, le prototypage, le design system et la livraison.",
    bio_p2:
      "Références : la suite SQOOL (7 applications, 500 000 élèves, une équipe de 5 designers), les outils pour les éditeurs de Dailymotion (8 000+ utilisateurs, entre Paris et New York), France VAE pour beta.gouv, les applications PagesJaunes (22 millions de téléchargements).",
    quote_text:
      'Victor allie une créativité débordante à une rigueur de travail impressionnante.',
    quote_author: 'Charlotte Rifflet, CPO UNOWHY',
    career_title: 'Parcours',
    eras: aboutEras('fr'),
    practice_title: 'Pratique actuelle',
    practice_text:
      'Depuis début 2025, l’IA fait partie de mon outillage. L’essentiel du métier reste avec les gens\u00a0: je mène, l’IA outille.',
    education_title: 'Formation',
    education_line1: 'Master Communication & Multimédia, ISCOM Paris (2001 à 2005)',
    education_line2: 'UX/UI Design & Prototypage, UXcel/Udemy (2021)',
    cta_text: 'Envie d’échanger ?',
    cta_availability: 'En poste aujourd’hui, je reste disponible pour des missions courtes de conseil et de freelance.',
    cta_email: 'victorsoussan@gmail.com',
    linkedin_label: 'Parcours complet et recommandations',
    cv_label: 'Lire ou télécharger le CV',
    testimonials_link: 'Voir tous les témoignages',
    resources_section_title: 'Ressources',
    resources_section_desc: 'Modèles, checklists et documents de méthode que j’utilise au quotidien.',
    resources_link: 'Tous les guides et articles',
    more: 'Lire la suite',
    less: 'Voir moins',
    career_lead: 'Des agences aux produits métier : le fil reste la conception d’outils denses en données.',
    career_periods: 'Les grandes périodes',
    career_steps: 'Étape par étape',
    era_more: 'Voir le détail',
    era_less: 'Masquer le détail',
    practice_flow: 'Ce que je mène, ce que l’IA outille',
    contact_email: 'E-mail',
    contact_copy: 'Copier l’adresse',
    contact_copied: 'Copié',
    carousels: {
      eras: { track: 'Étapes du parcours, de la plus récente à la plus ancienne', prev: 'Étape précédente', next: 'Étape suivante' },
      resources: { track: 'Ressources', prev: 'Ressource précédente', next: 'Ressource suivante' },
    },
  },
}


// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

const METRICS = {
  en: [
    { value: '15+', label: 'years' },
    { value: '500K+', label: 'users impacted' },
    { value: '5', label: 'designers managed' },
    { value: '50+', label: 'apps shipped' },
  ],
  fr: [
    { value: '15+', label: 'années' },
    { value: '500K+', label: 'utilisateurs concernés' },
    { value: '5', label: 'designers encadrés' },
    { value: '50+', label: 'applications livrées' },
  ],
}

// Shared ease
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** A text opens with its claim: the first sentence, then the rest. Words and order are kept. */
function splitFirst(text: string): [string, string] {
  const at = text.search(/(?<=[.!?]) (?=[A-ZÀ-ÖØ-Þ])/)
  return at === -1 ? [text, ''] : [text.slice(0, at), text.slice(at + 1)]
}

const CARD = 'rounded-2xl border border-gray-100 bg-white p-5 md:p-6'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AboutPageRedesign({
  lang,
  onBack: _onBack,
  onContact: _onContact,
  resources,
}: AboutPageRedesignProps) {
  const t = TRANSLATIONS[lang]
  const metrics = METRICS[lang]
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('victorsoussan@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasResources = resources.length > 0
  const rowClass =
    'group flex items-center justify-between gap-4 py-4 -mx-3 px-3 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150'

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* ================================================================ */}
      {/* HEADER + INTRO: who, in one screen. The detail is one level down. */}
      {/* ================================================================ */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="build-line text-display text-gray-900">
          {t.page_title}
        </h1>
        <p className="build-rise mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]" style={{ ['--d' as string]: '200ms' }}>
          {t.role}
        </p>
      </header>

      <section className="wrap pb-16 md:pb-24" aria-label={t.page_title}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6 lg:items-start">
          {/* Photo: the same portrait as the home page */}
          <div className="lg:col-span-4">
            <div className="w-full max-w-[360px] lg:max-w-none aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-inset ring-black/[0.05]">
              <img
                src="/images/image-victor-soussan-2027.jpg"
                alt="Victor Soussan"
                className="build-media w-full h-full object-cover object-top"
                style={{ ['--d' as string]: '260ms' }}
                loading="eager"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="build-rise text-lead-lg text-gray-900 max-w-[40ch]" style={{ ['--d' as string]: '320ms' }}>
              {t.intro}
            </p>

            {/* Four figures, quiet: a definition list, not a banner */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-gray-600">{m.label}</dt>
                  <dd className="text-title-3 text-gray-900 tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>

            <Disclosure className="mt-8" open={t.more} close={t.less}>
              <div className="disclosure-body mt-5 max-w-[62ch] space-y-5">
                <p className="text-base text-gray-600">{t.bio_p1}</p>
                <p className="text-base text-gray-600">{t.bio_p2}</p>
              </div>
            </Disclosure>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 01 JOURNEY: the shape of the career, then step by step           */}
      {/* ================================================================ */}
      <section id="journey" aria-label={t.career_title} className="scroll-mt-24">
        <ActHeader index="01" title={t.career_title} lead={t.career_lead} />

        <div className="act-wide">
          <SubTitle>{t.career_periods}</SubTitle>
          <CareerPhasesDiagram lang={lang} />

          <SubTitle className={`${BLOCK} !mb-6 md:!mb-8`}>{t.career_steps}</SubTitle>
        </div>

        <CardCarousel labels={t.carousels.eras} itemClassName="w-[82vw] max-w-[24rem] md:w-[24rem]">
          {t.eras.map((era) => {
            const [lead, rest] = splitFirst(era.description)
            return (
              <article key={era.title + era.period} className={`flex flex-col ${CARD}`}>
                <p className="text-xs tabular-nums text-gray-500">{era.period}</p>
                <h3 className="mt-2 text-title-3 text-gray-900">{era.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{lead}</p>
                {rest && (
                  <Disclosure className="mt-4" open={t.era_more} close={t.era_less}>
                    <p className="disclosure-body mt-4 text-sm text-gray-600">{rest}</p>
                  </Disclosure>
                )}
              </article>
            )
          })}
        </CardCarousel>

        <div className="pb-12 md:pb-20" />
      </section>

      {/* ================================================================ */}
      {/* 02 TESTIMONIALS                                                  */}
      {/* ================================================================ */}
      <section id="testimonials" aria-label={SITE_TRANSLATIONS[lang].testimonials.title} className="scroll-mt-24">
        <ActHeader index="02" title={SITE_TRANSLATIONS[lang].testimonials.title} />
        {/* The testimonials are read on their own page: here, one line and the way there */}
        <div className="act-wide pb-12 md:pb-20">
          <TestimonialsLink lang={lang} />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 03 PRACTICE: AI in the process, the tools, the training          */}
      {/* ================================================================ */}
      <section id="practice" aria-label={t.practice_title} className="scroll-mt-24">
        <ActHeader index="03" title={t.practice_title} lead={t.practice_text} />

        <div className="act-wide pb-12 md:pb-20">
          {/* What I lead, what AI equips: the drawing is the way in, the detail opens one area at a time */}
          <SubTitle>{t.practice_flow}</SubTitle>
          <Reveal>
            <PracticeExplorer lang={lang} />
          </Reveal>

          <SubTitle className={BLOCK}>{t.education_title}</SubTitle>
          <ul className="max-w-[62ch] divide-y divide-gray-100 border-y border-gray-100">
            <li className="py-4 text-base text-gray-600">{t.education_line1}</li>
            <li className="py-4 text-base text-gray-600">{t.education_line2}</li>
          </ul>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 04 RESOURCES: one card per document, on a tinted band          */}
      {/* ================================================================ */}
      {hasResources && (
        <section id="resources" aria-label={t.resources_section_title} className="scroll-mt-24 bg-[#F7F7F5] pb-12 md:pb-20">
          <ActHeader index="04" title={t.resources_section_title} lead={t.resources_section_desc} />

          <CardCarousel labels={t.carousels.resources} itemClassName="w-[78vw] max-w-[22rem] md:w-[22rem]">
            {resources.map((res) => (
              <a
                key={res.link}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:border-gray-200 active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
              >
                {/* The document, drawn in the Hairline line style: the same sheet, a folded corner, for the whole series */}
                {res.art && (
                  <div className="m-2 aspect-[13/10] overflow-hidden rounded-xl bg-[#FAFAF8] ring-1 ring-inset ring-black/[0.04]">
                    <div className="h-full w-full transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.03]">
                      <img
                        src={`/images/resources/doc-${res.art}-light.svg`}
                        alt=""
                        width={400}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="block h-full w-full object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 pt-4 md:p-6 md:pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs text-gray-500">{res.type}</p>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-gray-900 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
                    />
                  </div>
                  <h3 className="mt-2 text-title-3 text-gray-900 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-gray-500">
                    {res.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">{res.desc}</p>
                </div>
              </a>
            ))}
          </CardCarousel>

          <div className="act-wide pt-6">
            <a
              href={`/${lang}/ressources`}
              className="group inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150"
            >
              {t.resources_link}
              <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* CONTACT: the three ways, all visible (no hover needed on touch)  */}
      {/* ================================================================ */}
      <section id="contact" aria-label={t.cta_text} className="scroll-mt-24">
        <ActHeader index={hasResources ? '05' : '04'} title={t.cta_text} />

        <div className="act-wide pb-14 md:pb-20">
          <p className="mb-6 max-w-[40rem] text-base text-gray-600">{t.cta_availability}</p>
          <ul className="max-w-[40rem] divide-y divide-gray-100 border-y border-gray-100">
            <li className="flex items-center gap-2">
              <a
                href={`mailto:${t.cta_email}`}
                className="group flex min-w-0 flex-1 items-center justify-between gap-4 py-4 -ml-3 px-3 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150"
              >
                <div className="min-w-0">
                  <span className="text-title-3 text-gray-900 block">{t.contact_email}</span>
                  <span className="text-sm text-gray-600 break-all">{t.cta_email}</span>
                </div>
                <ArrowUpRight size={14} aria-hidden="true" className="text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0" />
              </a>
              <button
                onClick={copyEmail}
                aria-label={copied ? t.contact_copied : t.contact_copy}
                className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-gray-500 [@media(hover:hover)]:hover:text-gray-900 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.95]"
                style={{ transition: 'color 150ms ease, background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      style={{ display: 'flex', color: '#22c55e' }}
                    >
                      <Check size={14} weight="bold" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      style={{ display: 'flex' }}
                    >
                      <Copy size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/victorsoussan-product-design/"
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
              >
                <div>
                  <span className="text-title-3 text-gray-900 block">LinkedIn</span>
                  <span className="text-sm text-gray-600">{t.linkedin_label}</span>
                </div>
                <ArrowUpRight size={14} aria-hidden="true" className="text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0" />
              </a>
            </li>
            <li>
              <button
                onClick={() => setCvModalOpen(true)}
                className={`${rowClass} w-full text-left cursor-pointer`}
              >
                <div>
                  <span className="text-title-3 text-gray-900 block">
                    {lang === 'fr' ? 'Curriculum vitae' : 'Resume'}
                  </span>
                  <span className="text-sm text-gray-600">{t.cv_label}</span>
                </div>
                <ArrowRight size={14} aria-hidden="true" className="text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0" />
              </button>
            </li>
          </ul>
        </div>
      </section>

      {/* CV Modal */}
      <AnimatePresence>
        {cvModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setCvModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-title-3 text-gray-900">
                  {lang === 'fr' ? 'Curriculum vitae' : 'Resume'}
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href={`/cv/CV-Victor-Soussan-2026-${lang.toUpperCase()}.pdf`}
                    download
                    className="inline-flex items-center gap-1.5 min-h-11 px-4 rounded-full text-sm font-medium bg-gray-900 text-white [@media(hover:hover)]:hover:bg-black active:scale-[0.97]"
                    style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    <DownloadSimple size={14} />
                    {lang === 'fr' ? 'T\u00e9l\u00e9charger' : 'Download'}
                  </a>
                  <button
                    onClick={() => setCvModalOpen(false)}
                    className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full [@media(hover:hover)]:hover:bg-gray-100 text-gray-500 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.95]"
                    style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              {/* PDF viewer */}
              <div className="flex-1 overflow-auto bg-gray-50">
                <iframe
                  src={`/cv/CV-Victor-Soussan-2026-${lang.toUpperCase()}.pdf`}
                  className="w-full h-full min-h-[70vh]"
                  title="CV Victor Soussan"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
