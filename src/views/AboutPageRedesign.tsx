'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '@/lib/motion'
import { ArrowUpRight, ArrowRight, X, DownloadSimple, Copy, Check } from '@phosphor-icons/react'
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel'
import { ActRule } from '@/components/case-study/ActSection'
import { aboutEras } from '@/data/profileData'

type Language = 'en' | 'fr'

interface Resource {
  title: string
  type: string
  desc: string
  link: string
  icon: React.ReactNode
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
      "Lead Product Designer, 15 years of experience in B2B and B2G SaaS and complex business interfaces. I frame with a PM and deliver with a developer, or directly with Claude Code and Figma MCP.",
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
      "Since early 2025, I integrate AI into every stage of my design process. Claude Code as a daily partner for research, writing, prototyping, and shipping production code. Figma MCP to read design tokens and component specs directly into the development environment. This workflow compresses the distance between an idea and something people can use.",
    education_title: 'Education',
    education_line1: 'Master Communication & Multimedia \u2014 ISCOM Paris (2001\u20132005)',
    education_line2: 'UX/UI Design & Prototyping \u2014 UXcel/Udemy (2021)',
    toolkit_title: 'Toolkit',
    toolkit_items: 'Figma, Notion, Linear, VS Code, Claude Code, Framer Motion, Google Slides, Midjourney',
    cta_text: 'Want to work together?',
    cta_email: 'victorsoussan@gmail.com',
    availability: 'Available for new projects',
    linkedin_label: 'Full background and recommendations',
    cv_label: 'View or download resume',
    testimonials_link: 'View all testimonials',
    resources_section_title: 'Resources',
    resources_section_desc: 'Templates, checklists and process docs I use in my day-to-day practice.',
    resources_link: 'Guides, articles and complementary resources',
  },
  fr: {
    page_title: '\u00c0 propos',
    role: 'Lead Product Designer \u00b7 Paris',
    intro:
      "Lead Product Designer, 15 ans d'expérience en SaaS B2B, B2G et interfaces métier complexes. Je cadre avec un PM, je livre avec un développeur, ou directement avec Claude Code et Figma MCP.",
    bio_p1:
      "Mon approche commence avant Figma : ateliers de vision avec la direction, cadrage du problème avec les équipes produit, idéation avec les parties prenantes, recherche utilisateur terrain. Ensuite : conception, prototypage, design system, livraison.",
    bio_p2:
      "Références : la suite SQOOL (7 applications, 500 000 élèves, équipe de 5 designers), les outils publishers de Dailymotion (8 000+ utilisateurs, Paris et New York), France VAE pour beta.gouv, les applications PagesJaunes (22 millions de téléchargements).",
    quote_text:
      'Victor allie une cr\u00e9ativit\u00e9 d\u00e9bordante \u00e0 une rigueur de travail impressionnante.',
    quote_author: 'Charlotte Rifflet, CPO UNOWHY',
    career_title: 'Parcours',
    eras: aboutEras('fr'),
    practice_title: 'Pratique actuelle',
    practice_text:
      "Depuis d\u00e9but 2025, j'int\u00e8gre l'IA \u00e0 chaque \u00e9tape de mon processus de conception. Claude Code au quotidien pour la recherche, la r\u00e9daction, le prototypage et le d\u00e9ploiement. Figma MCP pour lire les design tokens et les specs composants directement dans l'environnement de d\u00e9veloppement. Ce workflow r\u00e9duit la distance entre une id\u00e9e et quelque chose d'utilisable.",
    education_title: 'Formation',
    education_line1: 'Master Communication & Multim\u00e9dia \u2014 ISCOM Paris (2001\u20132005)',
    education_line2: 'UX/UI Design & Prototypage \u2014 UXcel/Udemy (2021)',
    toolkit_title: 'Bo\u00eete \u00e0 outils',
    toolkit_items: 'Figma, Notion, Linear, VS Code, Claude Code, Framer Motion, Google Slides, Midjourney',
    cta_text: 'Envie de travailler ensemble ?',
    cta_email: 'victorsoussan@gmail.com',
    availability: 'Disponible pour de nouveaux projets',
    linkedin_label: 'Parcours complet et recommandations',
    cv_label: 'Consulter ou t\u00e9l\u00e9charger le CV',
    testimonials_link: 'Voir tous les t\u00e9moignages',
    resources_section_title: 'Ressources',
    resources_section_desc: 'Templates, checklists et documents de processus que j\u2019utilise au quotidien.',
    resources_link: 'Guides, articles et ressources compl\u00e9mentaires',
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
    { value: '15+', label: 'ann\u00e9es' },
    { value: '500K+', label: 'utilisateurs impact\u00e9s' },
    { value: '5', label: 'designers manag\u00e9s' },
    { value: '50+', label: 'apps livr\u00e9es' },
  ],
}

// Shared ease
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

// ---------------------------------------------------------------------------
// CountUp helper component
// ---------------------------------------------------------------------------

function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('0')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    // Parse: "15+" → { num: 15, suffix: '+' }, "500K+" → { num: 500, suffix: 'K+' }, "5" → { num: 5, suffix: '' }
    const match = value.match(/^(\d+)(.*$)/)
    if (!match) { setDisplayed(value); return }
    const target = parseInt(match[1])
    const suffix = match[2]
    const duration = 800
    const startDelay = delay
    const startTime = performance.now() + startDelay
    let raf: number

    const animate = (now: number) => {
      if (now < startTime) { raf = requestAnimationFrame(animate); return }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(eased * target)
      setDisplayed(`${current}${suffix}`)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, value, delay])

  return <span ref={ref}>{displayed}</span>
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AboutPageRedesign({
  lang,
  onBack: _onBack,
  onContact,
  resources,
}: AboutPageRedesignProps) {
  const t = TRANSLATIONS[lang]
  const metrics = METRICS[lang]
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)
  const reveal = useReveal()

  const copyEmail = () => {
    navigator.clipboard.writeText('victorsoussan@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* ================================================================ */}
      {/* 1. HEADER + INTRO                                                */}
      {/* ================================================================ */}
      <header className="wrap pt-10 md:pt-16 pb-12 md:pb-16">
        <h1 className="text-display text-gray-900">
          {t.page_title}
        </h1>
        <p className="mt-6 md:mt-8 text-lead-lg text-gray-600 max-w-[54ch]">
          {t.role}
        </p>
      </header>

      <section className="wrap pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6 lg:items-start">
          {/* Photo: the same portrait as the home page */}
          <div className="lg:col-span-4">
            <div className="w-full max-w-[360px] lg:max-w-none aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-inset ring-black/[0.05]">
              <img
                src="/images/image-victor-soussan-2027.jpg"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
          </div>

          {/* Intro + bio: same reading size as the case studies and the approach page */}
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-lead-lg text-gray-900 max-w-[40ch]">
              {t.intro}
            </p>
            <div className="mt-8 space-y-5">
              <p className="text-base text-gray-600 max-w-[62ch]">
                {t.bio_p1}
              </p>
              <p className="text-base text-gray-600 max-w-[62ch]">
                {t.bio_p2}
              </p>
            </div>

            {/* Availability */}
            <div className="mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">{t.availability}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. METRICS                                                       */}
      {/* ================================================================ */}
      <ActRule />
      <section className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {metrics.map((m, idx) => (
              <motion.div key={idx} {...reveal(idx)}>
                <span className="block text-subhead text-gray-900 tabular-nums">
                  <CountUp value={m.value} delay={idx * 100} />
                </span>
                <span className="text-sm text-gray-600 mt-1 block">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. TESTIMONIALS                                                  */}
      {/* ================================================================ */}
      <ActRule />
      <section className="pt-12 md:pt-16 pb-16 md:pb-24">
        <motion.div
          {...reveal()}
        >
          <TestimonialCarousel lang={lang} allLabel={t.testimonials_link} />
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 4. CAREER                                                        */}
      {/* ================================================================ */}
      <ActRule />
      <section className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
        <div>
          <motion.div
            {...reveal()}
          >
            <h2 className="text-title-2 text-gray-900 mb-8">
              {t.career_title}
            </h2>

            <div className="divide-y divide-gray-100">
              {t.eras.map((era, idx) => (
                <div
                  key={idx}
                  className="py-8 first:pt-0 last:pb-0 md:grid md:grid-cols-12 md:gap-x-6"
                >
                  <span className="text-xs text-gray-500 block mb-1 md:mb-0 md:col-span-3 lg:col-span-5 md:pt-1 tabular-nums">
                    {era.period}
                  </span>
                  <div className="min-w-0 md:col-span-9 lg:col-span-7">
                    <span className="text-title-3 text-gray-900 block mb-3">
                      {era.title}
                    </span>
                    <p className="text-base text-gray-600 max-w-[62ch]">
                      {era.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* LinkedIn + CV links */}
          <motion.div
            {...reveal()}
            className="mt-10 divide-y divide-gray-100"
          >
            <a
              href="https://www.linkedin.com/in/victorsoussan-product-design/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150"
            >
              <div>
                <span className="text-title-3 text-gray-900 block">LinkedIn</span>
                <span className="text-sm text-gray-600">{t.linkedin_label}</span>
              </div>
              <ArrowUpRight size={14} aria-hidden="true" className="text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0" />
            </a>
            <button
              onClick={() => setCvModalOpen(true)}
              className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150 w-full text-left cursor-pointer"
            >
              <div>
                <span className="text-title-3 text-gray-900 block">
                  {lang === 'fr' ? 'Curriculum vitae' : 'Resume'}
                </span>
                <span className="text-sm text-gray-600">{t.cv_label}</span>
              </div>
              <ArrowRight size={14} aria-hidden="true" className="text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0" />
            </button>
          </motion.div>
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

      {/* ================================================================ */}
      {/* 5. PRACTICE + EDUCATION                                          */}
      {/* ================================================================ */}
      <ActRule />
      <section className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
        <div>
          <motion.div
            {...reveal()}
          >
            <h2 className="text-title-2 text-gray-900 mb-6">
              {t.practice_title}
            </h2>
            <p className="text-base text-gray-600 max-w-[62ch] mb-10">
              {t.practice_text}
            </p>

            {/* Toolkit as animated pills */}
            <div className="mb-10">
              <h3 className="text-micro uppercase tracking-[0.08em] text-gray-500 mb-3">
                {t.toolkit_title}
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
              >
                {t.toolkit_items.split(', ').map((tool, i) => (
                  <motion.span
                    key={i}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    transition={{ duration: 0.32, ease: EASE_OUT }}
                    className="inline-block text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                  >
                    {tool}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Education */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-micro uppercase tracking-[0.08em] text-gray-500 mb-3">
                {t.education_title}
              </h3>
              <p className="text-base text-gray-600 max-w-[62ch]">{t.education_line1}</p>
              <p className="text-base text-gray-600 max-w-[62ch] mt-1">{t.education_line2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. TOOLKIT RESOURCES                                             */}
      {/* ================================================================ */}
      {resources.length > 0 && (
        <>
        <ActRule />
        <section className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
          <div>
            <motion.div
              {...reveal()}
            >
              <h2 className="text-title-2 text-gray-900 mb-2">
                {t.resources_section_title}
              </h2>
              <p className="text-base text-gray-600 max-w-[62ch] mb-8">
                {t.resources_section_desc}
              </p>

              <div className="divide-y divide-gray-100">
                {resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg [@media(hover:hover)]:hover:bg-gray-100 active:bg-gray-100 transition-colors duration-150"
                  >
                    <span className="text-base text-gray-900">
                      {res.title}
                    </span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0 ml-4"
                    />
                  </a>
                ))}
              </div>

              <a
                href={`/${lang}/ressources`}
                className="group inline-flex items-center gap-1.5 min-h-11 mt-3 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150"
              >
                {t.resources_link}
                <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </section>
        </>
      )}

      {/* ================================================================ */}
      {/* 7. CONTACT CTA                                                   */}
      {/* ================================================================ */}
      <ActRule />
      <section className="wrap pt-12 md:pt-16 pb-16 md:pb-24">
        <div>
          <motion.div
            {...reveal()}
          >
            {/* Progressive disclosure CTA: email appears on hover */}
            <div
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className="-mx-4 px-4 py-4 rounded-xl transition-colors duration-250"
              style={{
                backgroundColor: ctaHovered ? 'rgba(0,0,0,0.025)' : 'transparent',
                cursor: 'default',
              }}
            >
              {/* Title row: shows a hint arrow on hover */}
              <div className="flex items-center gap-2 mb-4">
                <p className="text-lead-lg text-gray-900 max-w-[40ch]">
                  {t.cta_text}
                </p>
                <motion.span
                  animate={ctaHovered ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-gray-300 select-none"
                  aria-hidden="true"
                >
                  ↓
                </motion.span>
              </div>

              {/* Email + copy: revealed on hover */}
              <motion.div
                className="flex items-center gap-3"
                initial={false}
                animate={ctaHovered
                  ? { opacity: 1, y: 0, pointerEvents: 'auto' as const }
                  : { opacity: 0, y: 5, pointerEvents: 'none' as const }
                }
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <a
                  href={`mailto:${t.cta_email}`}
                  className="text-base text-gray-900 [@media(hover:hover)]:hover:text-gray-500 underline underline-offset-4 decoration-gray-300 [@media(hover:hover)]:hover:decoration-gray-500 transition-colors duration-200"
                  tabIndex={ctaHovered ? 0 : -1}
                >
                  {t.cta_email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label={copied ? (lang === 'fr' ? 'Copié' : 'Copied') : (lang === 'fr' ? 'Copier l\u2019adresse' : 'Copy address')}
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-gray-500 [@media(hover:hover)]:hover:text-gray-900 [@media(hover:hover)]:hover:bg-gray-100 active:scale-[0.95]"
                  style={{ transition: 'color 150ms ease, background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  tabIndex={ctaHovered ? 0 : -1}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
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
                        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                        style={{ display: 'flex' }}
                      >
                        <Copy size={14} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
