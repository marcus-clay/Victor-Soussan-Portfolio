'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, X, DownloadSimple, Copy, Check } from '@phosphor-icons/react'

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
      "I've been designing digital products for close to twenty years, from advertising agencies through media, EdTech, enterprise software, and public services. The conviction I carry from all of it: good design is built with the team, not handed off to it.",
    bio_p1:
      "I started in advertising agencies, moved to media and publishing, then spent the last decade building enterprise software, EdTech platforms, and public services. Along the way I've led design teams, worked hand in hand with product managers and engineers, and shipped products used by hundreds of thousands of people.",
    bio_p2:
      "What holds all of it together is a bias toward clarity. I think the best work comes from staying close to the problem, compressing the distance between research and delivery, and treating the team as the design surface, not just the output.",
    quote_text:
      'Victor combines overflowing creativity with impressive rigor.',
    quote_author: 'Charlotte Rifflet, CPO UNOWHY',
    career_title: 'Journey',
    eras: [
      {
        period: '2025 \u2013 Present',
        title: 'Independent & beta.gouv.fr',
        description:
          "Product design and prototyping for B2B, B2G companies and growing startups. Full cycle: framing, user research, design, delivery. Current engagements include redesigning search and conversion for Banque des Territoires' B2G marketplaces, V2 of Toolkit.ac (construction SaaS), and user research for FEPEM's MonEmploiDirect. Earlier in 2025, Lead Product Designer at beta.gouv.fr for France VAE: user interviews, design thinking workshops with field actors, delivery restructured around one-month seasons. In parallel, Condamine Apps: 50+ prototypes shipped with Claude Code and Figma.",
      },
      {
        period: '2018 \u2013 2024',
        title: 'UNOWHY / SQOOL',
        description:
          'Six years transforming SQOOL from a simple Android launcher into a five-application SaaS suite serving 500,000 students across 465 schools. Recruited and managed a team of five designers. Built a unified design system across five brands, reducing design time by 60%. Led two products from zero to one: SQOOL Extend and SQOOL Protect.',
      },
      {
        period: '2014 \u2013 2018',
        title: 'Dailymotion, Ogury, PagesJaunes',
        description:
          "B2B product era. At Dailymotion, designed publisher tools used by 8,000+ users and premium publishers including CBS, ESPN, BBC. At Ogury, analytics dashboards and campaign management during early privacy challenges. At PagesJaunes, redesigned iOS and Android apps (22M downloads, 300K daily users) and built the company's first cross-platform design system.",
      },
      {
        period: '2005 \u2013 2014',
        title: 'Publicis, Hommell, Louis 21',
        description:
          "Creative origins. At Publicis Groupe, campaigns for luxury houses: Herm\u00e8s, Leica, Helena Rubinstein. Then the transition from print to digital: art-directing a monthly magazine with 300,000 copies at Groupe Hommell, freelance creative direction for L'Or\u00e9al, Orange, Galeries Lafayette, and designing EADS's internal social network for 10,000 managers.",
      },
    ],
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
      "Je con\u00e7ois des produits num\u00e9riques depuis bient\u00f4t vingt ans, des agences de publicit\u00e9 aux m\u00e9dias, \u00e0 l'EdTech, aux logiciels d'entreprise et aux services publics. La conviction que j'en tire : le bon design se construit avec l'\u00e9quipe, pas en silo.",
    bio_p1:
      "J'ai commenc\u00e9 en agence de publicit\u00e9, \u00e9volu\u00e9 dans les m\u00e9dias et l'\u00e9dition, puis pass\u00e9 la derni\u00e8re d\u00e9cennie \u00e0 construire des logiciels d'entreprise, des plateformes EdTech et des services publics. En chemin, j'ai dirig\u00e9 des \u00e9quipes design, travaill\u00e9 main dans la main avec des product managers et des ing\u00e9nieurs, et livr\u00e9 des produits utilis\u00e9s par des centaines de milliers de personnes.",
    bio_p2:
      "Ce qui relie tout cela, c'est un biais vers la clart\u00e9. Je crois que le meilleur travail na\u00eet quand on reste proche du probl\u00e8me, qu'on comprime la distance entre la recherche et la livraison, et qu'on traite l'\u00e9quipe comme la surface de conception, pas seulement comme le destinataire.",
    quote_text:
      'Victor allie une cr\u00e9ativit\u00e9 d\u00e9bordante \u00e0 une rigueur de travail impressionnante.',
    quote_author: 'Charlotte Rifflet, CPO UNOWHY',
    career_title: 'Parcours',
    eras: [
      {
        period: "2025 \u2013 Aujourd'hui",
        title: 'Ind\u00e9pendant & beta.gouv.fr',
        description:
          "Conception produit et prototypage pour des entreprises B2B, B2G et des startups en croissance. Cycle complet : cadrage, recherche utilisateur, conception, livraison. Missions en cours : redesign du moteur de recherche et optimisation de conversion sur les marketplaces B2G de la Banque des Territoires, conception V2 de Toolkit.ac (SaaS construction), recherche utilisateur pour le lancement de MonEmploiDirect (FEPEM). D\u00e9but 2025, Lead Product Designer chez beta.gouv.fr pour France VAE : entretiens utilisateurs, ateliers de design thinking, livraison restructur\u00e9e en saisons d'un mois. En parall\u00e8le, Condamine Apps : 50+ prototypes d\u00e9ploy\u00e9s avec Claude Code et Figma.",
      },
      {
        period: '2018 \u2013 2024',
        title: 'UNOWHY / SQOOL',
        description:
          "Six ann\u00e9es \u00e0 transformer SQOOL d'un simple launcher Android en une suite SaaS de cinq applications servant 500 000 \u00e9l\u00e8ves dans 465 \u00e9tablissements. Recrutement et management d'une \u00e9quipe de cinq designers. Design system unifi\u00e9 sur cinq marques, r\u00e9duction de 60 % du temps de conception. Deux produits de z\u00e9ro \u00e0 un : SQOOL Extend et SQOOL Protect.",
      },
      {
        period: '2014 \u2013 2018',
        title: 'Dailymotion, Ogury, PagesJaunes',
        description:
          "\u00c8re produit B2B. Chez Dailymotion, outils pour \u00e9diteurs utilis\u00e9s par plus de 8 000 personnes et des \u00e9diteurs premium (CBS, ESPN, BBC). Chez Ogury, dashboards d'analytics et gestion de campagnes. Chez PagesJaunes, refonte des applications iOS et Android (22 millions de t\u00e9l\u00e9chargements, 300 000 utilisateurs quotidiens) et premier design system cross-platform de l'entreprise.",
      },
      {
        period: '2005 \u2013 2014',
        title: 'Publicis, Hommell, Louis 21',
        description:
          "Origines cr\u00e9atives. Chez Publicis Groupe, campagnes pour des maisons de luxe : Herm\u00e8s, Leica, Helena Rubinstein. Puis la transition du print vers le digital : direction artistique d'un magazine mensuel \u00e0 300 000 exemplaires chez le Groupe Hommell, direction de cr\u00e9ation freelance pour L'Or\u00e9al, Orange, Galeries Lafayette, et conception du r\u00e9seau social interne d'EADS pour 10 000 managers.",
      },
    ],
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

// ---------------------------------------------------------------------------
// Featured quotes (rotating)
// ---------------------------------------------------------------------------

const FEATURED_QUOTES = {
  en: [
    { text: 'Victor combines overflowing creativity with impressive rigor.', author: 'Charlotte Rifflet, CPO UNOWHY' },
    { text: 'He transformed business requirements into perfectly adapted user journeys, ideal for a startup like ours.', author: 'Pierre-Marie Nigay, Founder of Toolkit' },
    { text: 'He was a real driver of progress within the design team, fostering a collaborative and stimulating work environment.', author: 'Justine Le Tellier, UX Researcher @UNOWHY' },
  ],
  fr: [
    { text: 'Victor allie une créativité débordante à une rigueur de travail impressionnante.', author: 'Charlotte Rifflet, CPO UNOWHY' },
    { text: 'Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés, idéal pour une startup comme la nôtre.', author: 'Pierre-Marie Nigay, Fondateur de Toolkit' },
    { text: "Il a été un véritable moteur de progrès au sein de l'équipe de conception.", author: 'Justine Le Tellier, UX Researcher @UNOWHY' },
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
  const [quoteIndex, setQuoteIndex] = useState(0)
  const quotes = FEATURED_QUOTES[lang]
  const currentQuote = quotes[quoteIndex]

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
      <section className="py-24 md:py-40">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="text-base font-semibold tracking-[-0.01em] text-gray-900"
            >
              {t.page_title}
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="mt-2 text-sm text-gray-500"
            >
              {t.role}
            </motion.p>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
            className="mt-10 mb-10"
          >
            <div
              className="group w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden bg-gray-100"
              style={{ cursor: 'zoom-in' }}
            >
              <img
                src="/images/photos victor/image-victor-linkedin.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Intro + Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
            className="space-y-6"
          >
            <p className="text-base leading-relaxed text-gray-500">
              {t.intro}
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
              {t.bio_p1}
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
              {t.bio_p2}
            </p>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: EASE_OUT }}
            className="mt-8 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">{t.availability}</span>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. METRICS                                                       */}
      {/* ================================================================ */}
      <section className="py-24 md:py-40 border-t border-gray-100">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div
            className="flex flex-wrap gap-x-12 gap-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {metrics.map((m, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <span className="block text-2xl font-semibold text-gray-900 tracking-[-0.01em]">
                  <CountUp value={m.value} delay={idx * 100} />
                </span>
                <span className="text-xs text-gray-400 mt-1 block">{m.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. QUOTE                                                         */}
      {/* ================================================================ */}
      <section className="py-24 md:py-40 border-t border-gray-100">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="text-lg italic text-gray-500 leading-relaxed">
                  &ldquo;{currentQuote.text}&rdquo;
                </p>
                <p className="mt-4 text-xs text-gray-400">
                  {currentQuote.author}
                </p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={() => setQuoteIndex((quoteIndex + 1) % quotes.length)}
              className="mt-5 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors duration-150 group"
              aria-label="Next testimonial"
            >
              <span>{lang === 'fr' ? 'Voir un autre' : 'Next'}</span>
              <span className="flex gap-1">
                {quotes.map((_, i) => (
                  <span
                    key={i}
                    className="block w-1 h-1 rounded-full transition-colors duration-150"
                    style={{ backgroundColor: i === quoteIndex ? '#374151' : '#D1D5DB' }}
                  />
                ))}
              </span>
            </button>
            <a
              href={`/${lang}/testimonials`}
              className="group inline-flex items-center gap-1.5 mt-6 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              {t.testimonials_link}
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. CAREER                                                        */}
      {/* ================================================================ */}
      <section className="py-24 md:py-40 border-t border-gray-100">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
              {t.career_title}
            </h2>

            <div className="divide-y divide-gray-100">
              {t.eras.map((era, idx) => (
                <div
                  key={idx}
                  className="group py-6 first:pt-0 last:pb-0 -mx-3 px-3 rounded-lg hover:bg-black/[.02] transition-colors duration-200 cursor-default"
                >
                  <span className="text-xs text-gray-400 block mb-1 group-hover:text-gray-500 transition-colors duration-200">
                    {era.period}
                  </span>
                  <span className="text-base font-medium text-gray-900 block mb-2">
                    {era.title}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                    {era.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* LinkedIn + CV links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mt-10 divide-y divide-gray-100"
          >
            <a
              href="https://www.linkedin.com/in/victorsoussan/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg hover:bg-black/[.04] active:bg-black/[.06] transition-colors duration-150"
            >
              <div>
                <span className="text-sm font-medium text-gray-900 block">LinkedIn</span>
                <span className="text-sm text-gray-500">{t.linkedin_label}</span>
              </div>
              <ArrowUpRight size={14} className="text-gray-400 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
            </a>
            <button
              onClick={() => setCvModalOpen(true)}
              className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg hover:bg-black/[.04] active:bg-black/[.06] transition-colors duration-150 w-full text-left cursor-pointer"
            >
              <div>
                <span className="text-sm font-medium text-gray-900 block">
                  {lang === 'fr' ? 'Curriculum vitae' : 'Resume'}
                </span>
                <span className="text-sm text-gray-500">{t.cv_label}</span>
              </div>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0" />
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
                <h3 className="text-base font-semibold text-gray-900">
                  {lang === 'fr' ? 'Curriculum vitae' : 'Resume'}
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href="/cv/CV-Victor-Soussan-2026-FR.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.97]"
                    style={{ transition: 'background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    <DownloadSimple size={14} />
                    {lang === 'fr' ? 'T\u00e9l\u00e9charger' : 'Download'}
                  </a>
                  <button
                    onClick={() => setCvModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 active:scale-[0.95]"
                    style={{ transition: 'background-color 150ms ease, color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              {/* PDF viewer */}
              <div className="flex-1 overflow-auto bg-gray-50">
                <iframe
                  src="/cv/CV-Victor-Soussan-2026-FR.pdf"
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
      <section className="py-24 md:py-40 border-t border-gray-100">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-6">
              {t.practice_title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-500 mb-10">
              {t.practice_text}
            </p>

            {/* Toolkit as animated pills */}
            <div className="mb-10">
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
                {t.toolkit_title}
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {t.toolkit_items.split(', ').map((tool, i) => (
                  <motion.span
                    key={i}
                    variants={{ hidden: { opacity: 0, scale: 0.88, y: 4 }, visible: { opacity: 1, scale: 1, y: 0 } }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    className="inline-block text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {tool}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Education */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
                {t.education_title}
              </h3>
              <p className="text-sm text-gray-500">{t.education_line1}</p>
              <p className="text-sm text-gray-500 mt-1">{t.education_line2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. TOOLKIT RESOURCES                                             */}
      {/* ================================================================ */}
      {resources.length > 0 && (
        <section className="py-24 md:py-40 border-t border-gray-100">
          <div className="max-w-[740px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
                {t.resources_section_title}
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                {t.resources_section_desc}
              </p>

              <div className="divide-y divide-gray-100">
                {resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 -mx-3 px-3 rounded-lg hover:bg-black/[.04] active:bg-black/[.06] transition-colors duration-150"
                  >
                    <span className="text-sm text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                      {res.title}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200 flex-shrink-0 ml-4"
                    />
                  </a>
                ))}
              </div>

              <a
                href={`/${lang}/ressources`}
                className="group inline-flex items-center gap-1.5 mt-6 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                {t.resources_link}
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* 7. CONTACT CTA                                                   */}
      {/* ================================================================ */}
      <section className="py-24 md:py-40 border-t border-gray-100">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* Progressive disclosure CTA — email appears on hover */}
            <div
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className="-mx-4 px-4 py-4 rounded-xl transition-colors duration-250"
              style={{
                backgroundColor: ctaHovered ? 'rgba(0,0,0,0.025)' : 'transparent',
                cursor: 'default',
              }}
            >
              {/* Title row — shows a hint arrow on hover */}
              <div className="flex items-center gap-2 mb-4">
                <p className="text-base font-semibold tracking-[-0.01em] text-gray-900">
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

              {/* Email + copy — revealed on hover */}
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
                  className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500 transition-colors duration-200"
                  tabIndex={ctaHovered ? 0 : -1}
                >
                  {t.cta_email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label={copied ? (lang === 'fr' ? 'Copié' : 'Copied') : (lang === 'fr' ? 'Copier l\u2019adresse' : 'Copy address')}
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-black/[.04] active:scale-[0.95]"
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
