'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, CaretDown } from '@phosphor-icons/react'

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
    education_line1: 'Master Communication & Multimedia \u2014 ISCOM Paris (2001\u20132005)',
    education_line2: 'UX/UI Design & Prototyping \u2014 UXcel/Udemy (2021)',
    toolkit_title: 'Toolkit',
    cta_text: 'Want to work together?',
    cta_button: 'Get in touch',
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
    education_line1: 'Master Communication & Multim\u00e9dia \u2014 ISCOM Paris (2001\u20132005)',
    education_line2: 'UX/UI Design & Prototypage \u2014 UXcel/Udemy (2021)',
    toolkit_title: 'Bo\u00eete \u00e0 outils',
    cta_text: 'Envie de travailler ensemble ?',
    cta_button: 'Me contacter',
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
// Tool icons (grayscale, no labels, no backgrounds)
// ---------------------------------------------------------------------------

const TOOL_ICONS = [
  // Figma
  <svg key="figma" width="32" height="32" viewBox="0 0 38 57" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#999" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#999" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#BBB" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#AAA" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#BBB" />
  </svg>,
  // Notion
  <svg key="notion" width="32" height="32" viewBox="0 0 100 100" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#e5e5e5" />
    <path fillRule="evenodd" clipRule="evenodd" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#666" />
  </svg>,
  // Linear
  <svg key="linear" width="32" height="32" viewBox="0 0 100 100" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.8437L39.3228 98.1789c.7025.7025.1051 1.819-.8437 1.5765C17.0253 95.5923 4.40835 82.9753 1.22541 61.5228zM.00189135 46.8891c-.01764375.2833.08887005.5599.29588765.7646L52.3503 99.7051c.2047.2069.4813.3134.7645.2958 7.5283-.4677 14.4607-2.7622 20.4387-6.4864L6.48678 26.4479C2.76259 32.4258.469551 39.3582.00189135 46.8891zM12.6431 20.0547 79.9461 87.3577c4.7849-4.3428 8.5962-9.7434 11.0885-15.8046L27.4478 11.9662C21.3866 14.4584 16.9859 18.2698 12.6431 20.0547zM33.5765 8.50513 91.4963 66.4249C93.4164 60.7089 94.4946 54.5765 94.4946 48.2016 94.4946 22.4839 73.5107 1.5 47.793 1.5c-6.3749 0-12.5073 1.07819-18.2231 2.99827L33.5765 8.50513z" fill="#888" />
  </svg>,
  // VS Code
  <svg key="vscode" width="32" height="32" viewBox="0 0 100 100" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M71.564 2.754L29.358 38.96 12.326 25.894 5.5 28.93v42.14l6.826 3.036 17.032-13.066 42.206 36.206L94.5 89.73V10.27L71.564 2.754zM71.5 72.1L42.466 50 71.5 27.9V72.1zM12.326 50l12.2-9.5v19l-12.2-9.5z" fill="#999" />
  </svg>,
  // Claude
  <svg key="claude" width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M15.1 3.2L12.7 9.8L18.9 7.2L15.1 3.2Z" fill="#999" />
    <path d="M12.7 9.8L6.5 12.3L12.7 14.8L12.7 9.8Z" fill="#888" />
    <path d="M12.7 14.8L18.9 17.3L15.1 21.3L12.7 14.8Z" fill="#999" />
    <path d="M12.7 14.8L6.5 12.3L9 20.8L12.7 14.8Z" fill="#AAA" />
    <path d="M12.7 9.8L6.5 12.3L9 3.8L12.7 9.8Z" fill="#AAA" />
    <path d="M18.9 7.2L12.7 9.8L18.9 12.3L18.9 7.2Z" fill="#888" />
    <path d="M18.9 12.3L12.7 14.8L18.9 17.3L18.9 12.3Z" fill="#888" />
  </svg>,
  // Framer
  <svg key="framer" width="32" height="32" viewBox="0 0 14 21" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M0 14H7L14 21H0V14Z" fill="#999" />
    <path d="M0 7H14L7 14H0V7Z" fill="#888" />
    <path d="M0 0H14V7H7L0 0Z" fill="#777" />
  </svg>,
  // Google Slides
  <svg key="gslides" width="32" height="32" viewBox="0 0 48 48" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M37 45H11c-2.209 0-4-1.791-4-4V7c0-2.209 1.791-4 4-4h18l12 12v26c0 2.209-1.791 4-4 4z" fill="#BBB" />
    <path d="M29 3L29 15 41 15z" fill="#DDD" />
    <path d="M15 23H33V35H15z" fill="#DDD" />
    <path d="M15 27H33V31H15z" fill="#BBB" />
  </svg>,
  // Midjourney
  <svg key="midjourney" width="32" height="32" viewBox="0 0 24 24" fill="none" className="opacity-50 hover:opacity-100 transition-opacity">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#CCC" />
    <path d="M8 8h8v2H8V8zm0 3h8v2H8v-2zm0 3h5v2H8v-2z" fill="#888" />
  </svg>,
]

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
  const [expandedEra, setExpandedEra] = useState<number | null>(0)

  const toggleEra = (idx: number) => {
    setExpandedEra((prev) => (prev === idx ? null : idx))
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 py-20">

        {/* ================================================================ */}
        {/* 1. HERO SECTION                                                  */}
        {/* ================================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm text-gray-400 mb-4">{t.role}</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 mb-10">
            {t.page_title}
          </h1>

          {/* Two columns: intro text + photo */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-14">
            <p className="text-lg leading-relaxed text-gray-600 max-w-[55ch] flex-1">
              {t.intro}
            </p>
            <div className="w-[200px] h-[250px] rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/images/photos victor/image_victor_home.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>
          </div>

          {/* Horizontal metrics strip */}
          <div className="flex flex-wrap items-center gap-y-6">
            {metrics.map((m, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center px-6 md:px-10">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    {m.value}
                  </span>
                  <span className="text-sm text-gray-500 mt-1">{m.label}</span>
                </div>
                {idx < metrics.length - 1 && (
                  <div className="hidden sm:block w-px h-10 bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/* 2. NARRATIVE SECTION                                             */}
        {/* ================================================================ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-[55ch]"
        >
          <p className="text-base md:text-lg leading-relaxed text-gray-600 mb-6">
            {t.bio_p1}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-600 mb-12">
            {t.bio_p2}
          </p>

          {/* Pull quote */}
          <blockquote className="border-l-2 border-gray-200 pl-6 py-2">
            <p className="text-xl md:text-2xl italic text-gray-500 leading-relaxed mb-3">
              "{t.quote_text}"
            </p>
            <cite className="text-sm text-gray-400 not-italic">
              {t.quote_author}
            </cite>
          </blockquote>
        </motion.section>

        {/* ================================================================ */}
        {/* 3. CAREER SECTION (timeline with eras)                           */}
        {/* ================================================================ */}
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
              {t.career_title}
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="relative pl-8">
            {/* Vertical timeline line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200" />

            <div className="space-y-1">
              {t.eras.map((era, idx) => {
                const isExpanded = expandedEra === idx
                return (
                  <div key={idx} className="relative">
                    {/* Dot on timeline */}
                    <div
                      className={`absolute left-[-25px] top-[18px] w-[7px] h-[7px] rounded-full border-2 transition-colors duration-200 ${
                        isExpanded
                          ? 'bg-gray-900 border-gray-900'
                          : 'bg-white border-gray-300'
                      }`}
                    />

                    {/* Clickable header */}
                    <button
                      onClick={() => toggleEra(idx)}
                      className="w-full text-left py-3 flex items-center gap-4 group cursor-pointer"
                    >
                      <span className="text-sm text-gray-400 font-medium whitespace-nowrap min-w-[140px]">
                        {era.period}
                      </span>
                      <span className="text-lg font-semibold text-gray-900 flex-1">
                        {era.title}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="flex-shrink-0"
                      >
                        <CaretDown
                          size={16}
                          weight="bold"
                          className="text-gray-300 group-hover:text-gray-500 transition-colors"
                        />
                      </motion.div>
                    </button>

                    {/* Expandable description */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { type: 'spring', stiffness: 250, damping: 30 },
                            opacity: { duration: 0.25 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-base leading-relaxed text-gray-600 max-w-[55ch] pb-4 pl-[156px] md:pl-[156px]">
                            {era.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. PRACTICE SECTION                                              */}
        {/* ================================================================ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-[55ch] mb-8">
            {t.practice_text}
          </p>

          {/* Tool icons row */}
          <div className="flex items-center gap-5 flex-wrap">
            {TOOL_ICONS.map((icon, idx) => (
              <div key={idx} className="w-8 h-8 flex items-center justify-center">
                {icon}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================================================================ */}
        {/* 5. EDUCATION (minimal, inline)                                   */}
        {/* ================================================================ */}
        <div className="mt-16 space-y-2">
          <p className="text-sm text-gray-500">{t.education_line1}</p>
          <p className="text-sm text-gray-500">{t.education_line2}</p>
        </div>

        {/* ================================================================ */}
        {/* 6. TOOLKIT RESOURCES (single card)                               */}
        {/* ================================================================ */}
        {resources.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="mt-20 bg-white border border-gray-100 rounded-2xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.toolkit_title}
            </h2>
            <div className="divide-y divide-gray-100">
              {resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-4 group transition-colors hover:bg-gray-50 -mx-4 px-4 rounded-lg"
                >
                  <div className="mr-4 flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                    {res.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-[#2D5CF3] transition-colors">
                      {res.title}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 flex-shrink-0 ml-2"
                  />
                </a>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================================================================ */}
        {/* 7. CTA                                                           */}
        {/* ================================================================ */}
        <section className="py-20 text-center">
          <p className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-900 mb-6">
            {t.cta_text}
          </p>
          <motion.button
            onClick={onContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D5CF3] text-white rounded-full font-medium text-base hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md cursor-pointer"
          >
            {t.cta_button}
            <ArrowRight size={18} weight="bold" />
          </motion.button>
        </section>
      </div>
    </div>
  )
}
