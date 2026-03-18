'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react'

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
    intro_role: 'Lead Product Designer',
    intro_location: 'Paris, France',
    intro_p1:
      "I've been designing digital products for close to twenty years. I started in advertising agencies, moved to media and publishing, then spent the last decade building enterprise software, EdTech platforms, and public services.",
    intro_p2:
      "Along the way I've led design teams, worked hand in hand with product managers and engineers, and shipped products used by hundreds of thousands of people. The conviction I carry from all of this: good design is built with the team, not handed off to it.",
    value_prop: 'What I bring to the table',
    bullets: [
      'End-to-end product design, from strategy and framing to pixel-level execution',
      'Proven experience scaling design systems across multi-product ecosystems',
      'User research embedded in every phase, not tacked on as validation',
      'AI-augmented workflows: Claude Code, Figma MCP, rapid prototyping to production',
      'Team leadership and DesignOps: hiring, mentoring, rituals, delivery cadence',
    ],
    career_title: 'Journey',
    chapters: [
      {
        period: '2025 \u2013 Present',
        title: 'Lead Product Designer',
        company: 'Independent',
        text: "Product design and prototyping for B2B, B2G companies and growing startups. Full cycle: framing, user research, design, delivery. Current engagements: redesigning the search engine and optimizing conversion on Banque des Territoires' B2G marketplaces (Aquagir, Numerique360). Designing V2 of Toolkit.ac (construction SaaS, 2,000 paying customers). User research for FEPEM's MonEmploiDirect launch. In parallel, I run Condamine Apps, a personal lab where I prototype and deploy web applications with Claude Code and Figma. 50 apps and prototypes shipped since early 2025.",
      },
      {
        period: 'January \u2013 July 2025',
        title: 'Lead Product Designer',
        company: 'beta.gouv.fr \u00b7 France VAE',
        text: "Joined beta.gouv.fr as Lead Product Designer for France VAE, a government service helping workers validate professional experience. Ran user interviews, facilitated design thinking workshops with field actors, and restructured the delivery workflow around one-month seasons with clear cycles: frame, build, test.",
      },
      {
        period: '2018 \u2013 2024',
        title: 'Senior Designer \u2192 Product Lead',
        company: 'UNOWHY / SQOOL',
        text: "Six years transforming SQOOL from a simple Android launcher into a five-application SaaS suite serving 500,000 students across 465 schools. Recruited and managed a team of five designers, built a unified design system across five brands (reducing design time by 60%), and led two products from zero to one: SQOOL Extend and SQOOL Protect.",
      },
      {
        period: '2017 \u2013 2018',
        title: 'Senior Product Designer',
        company: 'Dailymotion',
        text: "Focused on B2B publisher tools used by 8,000+ users and 50 to 100 premium publishers including CBS, ESPN, and BBC. Designed upload and livestream management interfaces, and created the team's first UI Kit with Storybook.",
      },
      {
        period: '2016 \u2013 2017',
        title: 'Product Designer',
        company: 'Ogury',
        text: 'Designed analytics dashboards and campaign management interfaces for a mobile data company navigating early privacy and consent challenges.',
      },
      {
        period: '2014 \u2013 2016',
        title: 'Lead UI/UX Designer',
        company: 'PagesJaunes',
        text: "Redesigned iOS and Android apps (22 million downloads, 300,000 daily users). Built the company's first cross-platform design system. Led a team of four UI designers.",
      },
      {
        period: '2010 \u2013 2014',
        title: 'Art Director & Freelance Creative Director',
        company: 'Hommell Publications, Louis 21, Freelance',
        text: "Transition from print to digital. Art-directed a monthly magazine with 300,000 copies at Groupe Hommell. Freelance creative direction for L'Or\u00e9al, Orange, Galeries Lafayette. Designed EADS's internal social network for 10,000 managers.",
      },
      {
        period: '2005 \u2013 2010',
        title: 'Art Director',
        company: 'Publicis Groupe',
        text: 'Creative campaigns for luxury houses: Herm\u00e8s, Leica, Helena Rubinstein. Visual storytelling, attention to detail, and discipline within tight brand guidelines.',
      },
    ],
    practice_title: 'Current Practice',
    practice_text:
      "Since early 2025, I integrate AI into every stage of my design process. Claude Code as a daily partner for research, writing, prototyping, and shipping production code. Figma MCP to read design tokens and component specs directly into the development environment. This workflow compresses the distance between an idea and something people can use.",
    tools_title: 'Daily Drivers',
    education_title: 'Education',
    education_master_title: 'Master in Communication & Multimedia',
    education_master_school: 'ISCOM Paris (2001\u20132005)',
    education_ux_title: 'UX/UI Design & Prototyping',
    education_ux_school: 'UXcel / Udemy (2021)',
    toolkit_title: 'Toolkit',
    toolkit_desc:
      'Templates and methods I use daily to structure design workflows. Available as Notion pages.',
    cta_title: 'Want to work together?',
    cta_desc:
      "If you're looking for a Lead Product Designer who can operate from strategy to pixels, let's talk.",
    cta_button: 'Get in touch',
  },
  fr: {
    page_title: '\u00c0 propos',
    intro_role: 'Lead Product Designer',
    intro_location: 'Paris, France',
    intro_p1:
      "Je con\u00e7ois des produits num\u00e9riques depuis bient\u00f4t vingt ans. J'ai commenc\u00e9 en agence de publicit\u00e9, \u00e9volu\u00e9 dans les m\u00e9dias et l'\u00e9dition, puis pass\u00e9 la derni\u00e8re d\u00e9cennie \u00e0 construire des logiciels d'entreprise, des plateformes EdTech et des services publics.",
    intro_p2:
      "En chemin, j'ai dirig\u00e9 des \u00e9quipes design, travaill\u00e9 main dans la main avec des product managers et des ing\u00e9nieurs, et livr\u00e9 des produits utilis\u00e9s par des centaines de milliers de personnes. La conviction que j'en tire : le bon design se construit avec l'\u00e9quipe, pas en silo.",
    value_prop: 'Ce que j\u2019apporte',
    bullets: [
      'Conception produit end-to-end, de la strat\u00e9gie et du cadrage jusqu\u2019au pixel',
      'Exp\u00e9rience prouv\u00e9e en design systems multi-produits \u00e0 grande \u00e9chelle',
      'Recherche utilisateur int\u00e9gr\u00e9e \u00e0 chaque phase, pas ajout\u00e9e en validation',
      'Workflows augment\u00e9s par l\u2019IA : Claude Code, Figma MCP, prototypage rapide en production',
      '\u00c9quipe et DesignOps : recrutement, mentoring, rituels, cadence de livraison',
    ],
    career_title: 'Parcours',
    chapters: [
      {
        period: "2025 \u2013 Aujourd'hui",
        title: 'Lead Product Designer',
        company: 'Ind\u00e9pendant',
        text: "Conception produit et prototypage pour des entreprises B2B, B2G et des startups en croissance. Cycle complet : cadrage, recherche utilisateur, conception, livraison. Missions en cours : redesign du moteur de recherche et optimisation de conversion sur les marketplaces B2G de la Banque des Territoires (Aquagir, Num\u00e9rique360). Conception V2 de Toolkit.ac (SaaS construction, 2 000 clients payants). Recherche utilisateur pour le lancement de MonEmploiDirect (FEPEM). En parall\u00e8le, je d\u00e9veloppe Condamine Apps, un lab personnel o\u00f9 je prototype et d\u00e9ploie des applications web avec Claude Code et Figma. 50 apps et prototypes d\u00e9ploy\u00e9s depuis d\u00e9but 2025.",
      },
      {
        period: 'Janvier \u2013 Juillet 2025',
        title: 'Lead Product Designer',
        company: 'beta.gouv.fr \u00b7 France VAE',
        text: "J'ai rejoint beta.gouv.fr en tant que Lead Product Designer pour France VAE, un service public d'accompagnement \u00e0 la validation des acquis de l'exp\u00e9rience. Entretiens utilisateurs, ateliers de design thinking avec des acteurs de terrain, restructuration du workflow de livraison autour de saisons d'un mois avec des cycles clairs : cadrer, construire, tester.",
      },
      {
        period: '2018 \u2013 2024',
        title: 'Senior Designer \u2192 Product Lead',
        company: 'UNOWHY / SQOOL',
        text: "Six ann\u00e9es \u00e0 transformer SQOOL d'un simple launcher Android en une suite SaaS de cinq applications servant 500 000 \u00e9l\u00e8ves dans 465 \u00e9tablissements. Recrutement et management d'une \u00e9quipe de cinq designers, design system unifi\u00e9 sur cinq marques (r\u00e9duction de 60 % du temps de conception), et deux produits de z\u00e9ro \u00e0 un : SQOOL Extend et SQOOL Protect.",
      },
      {
        period: '2017 \u2013 2018',
        title: 'Senior Product Designer',
        company: 'Dailymotion',
        text: "Versant B2B : outils pour \u00e9diteurs, utilis\u00e9s par plus de 8 000 personnes et 50 \u00e0 100 \u00e9diteurs premium (CBS, ESPN, BBC). Interfaces d'upload et de gestion du livestream. Premier UI Kit de l'\u00e9quipe avec Storybook.",
      },
      {
        period: '2016 \u2013 2017',
        title: 'Product Designer',
        company: 'Ogury',
        text: "Dashboards d'analytics et interfaces de gestion de campagnes pour une entreprise de donn\u00e9es mobiles, \u00e0 un moment o\u00f9 le secteur cherchait ses rep\u00e8res sur la vie priv\u00e9e et le consentement.",
      },
      {
        period: '2014 \u2013 2016',
        title: 'Lead UI/UX Designer',
        company: 'PagesJaunes',
        text: "Refonte des applications iOS et Android (22 millions de t\u00e9l\u00e9chargements, 300 000 utilisateurs quotidiens). Premier design system cross-platform de l'entreprise. Management d'une \u00e9quipe de quatre UI designers.",
      },
      {
        period: '2010 \u2013 2014',
        title: 'Directeur Artistique & Directeur de Cr\u00e9ation Freelance',
        company: 'Hommell Publications, Louis 21, Freelance',
        text: "Transition du print vers le digital. Direction artistique d'un magazine mensuel \u00e0 300 000 exemplaires chez le Groupe Hommell. Freelance pour L'Or\u00e9al, Orange, Galeries Lafayette. Conception du r\u00e9seau social interne d'EADS pour 10 000 managers.",
      },
      {
        period: '2005 \u2013 2010',
        title: 'Directeur Artistique',
        company: 'Publicis Groupe',
        text: "Campagnes cr\u00e9atives pour des maisons de luxe : Herm\u00e8s, Leica, Helena Rubinstein. Storytelling visuel, importance de chaque d\u00e9tail, discipline du travail dans un cadre de marque exigeant.",
      },
    ],
    practice_title: 'Pratique actuelle',
    practice_text:
      "Depuis d\u00e9but 2025, j'int\u00e8gre l'IA \u00e0 chaque \u00e9tape de mon processus de conception. Claude Code au quotidien pour la recherche, la r\u00e9daction, le prototypage et le d\u00e9ploiement. Figma MCP pour lire les design tokens et les specs composants directement dans l'environnement de d\u00e9veloppement. Ce workflow r\u00e9duit la distance entre une id\u00e9e et quelque chose d'utilisable.",
    tools_title: 'Outils du quotidien',
    education_title: 'Formation',
    education_master_title: 'Master en Communication et Multim\u00e9dia',
    education_master_school: 'ISCOM Paris (2001\u20132005)',
    education_ux_title: 'UX/UI Design et Prototypage',
    education_ux_school: 'Certification UXcel / Udemy (2021)',
    toolkit_title: 'Bo\u00eete \u00e0 outils',
    toolkit_desc:
      "Templates et m\u00e9thodes que j'utilise au quotidien pour structurer les workflows de conception. Disponibles en pages Notion.",
    cta_title: 'Envie de travailler ensemble ?',
    cta_desc:
      "Si vous cherchez un Lead Product Designer capable d'intervenir de la strat\u00e9gie jusqu'au pixel, \u00e9changeons.",
    cta_button: 'Me contacter',
  },
}

// ---------------------------------------------------------------------------
// Tool data (SVG icons inline)
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: 'Figma',
    color: 'bg-[#1E1E1E]',
    icon: (
      <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
        <path
          d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
          fill="#1ABCFE"
        />
        <path
          d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
          fill="#0ACF83"
        />
        <path
          d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
          fill="#FF7262"
        />
        <path
          d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
          fill="#F24E1E"
        />
        <path
          d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
          fill="#A259FF"
        />
      </svg>
    ),
  },
  {
    name: 'Notion',
    color: 'bg-white',
    icon: (
      <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
        <path
          d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
          fill="#fff"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
          fill="#000"
        />
      </svg>
    ),
  },
  {
    name: 'Linear',
    color: 'bg-[#5E6AD2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
          fill="#fff"
        />
        <path
          d="M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: 'GSlides',
    color: 'bg-[#FBBC04]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
        <path
          d="M37 45H11c-2.209 0-4-1.791-4-4V7c0-2.209 1.791-4 4-4h18l12 12v26c0 2.209-1.791 4-4 4z"
          fill="#FFC107"
        />
        <path d="M29 3L29 15 41 15z" fill="#FFECB3" />
        <path d="M15 23H33V35H15z" fill="#FFECB3" />
        <path d="M15 27H33V31H15z" fill="#FFC107" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    color: 'bg-[#D4A27F]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
          fill="#fff"
        />
        <path
          d="M16.5 8.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-9 0C6.672 8.5 6 9.172 6 10s.672 1.5 1.5 1.5S9 10.828 9 10s-.672-1.5-1.5-1.5zm4.5 9c-2.33 0-4.304-1.458-5.084-3.5h10.168c-.78 2.042-2.754 3.5-5.084 3.5z"
          fill="#D4A27F"
        />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    color: 'bg-gradient-to-br from-[#4285F4] via-[#9B72CB] to-[#D96570]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          fill="#fff"
        />
        <path d="M12 6l-4 6h8l-4-6zm0 12l4-6H8l4 6z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: 'Midjourney',
    color: 'bg-[#0B0B0B]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          fill="#FFFFFF"
        />
        <path
          d="M8 8h8v2H8V8zm0 3h8v2H8v-2zm0 3h5v2H8v-2z"
          fill="#0B0B0B"
        />
      </svg>
    ),
  },
  {
    name: 'ScreenStudio',
    color: 'bg-gradient-to-br from-[#7C3AED] to-[#4F46E5]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="12" rx="2" fill="#fff" />
        <circle cx="12" cy="10" r="3" fill="#7C3AED" />
        <path
          d="M8 20h8"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Timeline badge colors
// ---------------------------------------------------------------------------

const BADGE_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
  'bg-slate-100 text-slate-700',
  'bg-amber-100 text-amber-700',
]

// ---------------------------------------------------------------------------
// Shared card animation props
// ---------------------------------------------------------------------------

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function AnimatedCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`bg-white border border-gray-100 rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
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

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-6">
        {/* ---------------------------------------------------------------- */}
        {/* Page header                                                       */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-4 pb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 mb-3">
            {t.page_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500">
            {t.intro_role} · {t.intro_location}
          </p>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Intro card: two columns (text left, photo right)                  */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10" delay={0.05}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-1 space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-[65ch]">
                {t.intro_p1}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-[65ch]">
                {t.intro_p2}
              </p>
            </div>
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
              <img
                src="/images/photos victor/image_victor_home.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>
          </div>
        </AnimatedCard>

        {/* ---------------------------------------------------------------- */}
        {/* Value proposition card                                            */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10" delay={0.1}>
          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-6">
            {t.value_prop}
          </h2>
          <ul className="space-y-3 max-w-[65ch]">
            {t.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="text-[#2D5CF3] flex-shrink-0 mt-0.5"
                />
                <span className="text-base md:text-lg leading-relaxed text-gray-600">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </AnimatedCard>

        {/* ---------------------------------------------------------------- */}
        {/* Current Practice card                                             */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10" delay={0.1}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-gray-900">
              {t.practice_title}
            </h2>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-[65ch]">
            {t.practice_text}
          </p>
        </AnimatedCard>

        {/* ---------------------------------------------------------------- */}
        {/* Career timeline section                                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="pt-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-900 mb-6"
          >
            {t.career_title}
          </motion.h2>

          <div className="space-y-4">
            {t.chapters.map((chapter, idx) => (
              <AnimatedCard
                key={idx}
                className="p-6 md:p-8"
                delay={idx * 0.04}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Period badge */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start ${
                      BADGE_COLORS[idx % BADGE_COLORS.length]
                    }`}
                  >
                    {chapter.period}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold tracking-[-0.01em] text-gray-900 mb-0.5">
                      {chapter.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-400 mb-3">
                      {chapter.company}
                    </p>
                    <p className="text-base leading-relaxed text-gray-600 max-w-[65ch]">
                      {chapter.text}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Tools card (iPadOS app grid style)                                */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10" delay={0.05}>
          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-6">
            {t.tools_title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-[#F9F9F9] hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center shadow-sm border border-gray-200`}
                >
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* ---------------------------------------------------------------- */}
        {/* Education card                                                    */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10" delay={0.05}>
          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-6">
            {t.education_title}
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={22} weight="fill" className="text-[#2D5CF3]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {t.education_master_title}
                </h4>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t.education_master_school}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} weight="fill" className="text-[#2D5CF3]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {t.education_ux_title}
                </h4>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t.education_ux_school}
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* ---------------------------------------------------------------- */}
        {/* Toolkit resources card                                            */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10" delay={0.05}>
          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-gray-900 mb-2">
            {t.toolkit_title}
          </h2>
          <p className="text-base text-gray-500 mb-6 max-w-[65ch]">
            {t.toolkit_desc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resources.map((res, idx) => (
              <a
                key={idx}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-xl border border-gray-100 bg-[#F9F9F9] hover:bg-blue-50 hover:border-blue-100 transition-all duration-200 group"
              >
                <div className="mr-4 p-2.5 rounded-lg bg-white border border-gray-100 shadow-sm group-hover:border-blue-100">
                  {res.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 truncate">
                    {res.title}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-blue-500 truncate">
                    {res.desc}
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 flex-shrink-0 ml-2"
                />
              </a>
            ))}
          </div>
        </AnimatedCard>

        {/* ---------------------------------------------------------------- */}
        {/* CTA card                                                          */}
        {/* ---------------------------------------------------------------- */}
        <AnimatedCard className="p-8 md:p-10 text-center" delay={0.05}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-gray-900 mb-3">
            {t.cta_title}
          </h2>
          <p className="text-base md:text-lg text-gray-500 mb-6 max-w-lg mx-auto">
            {t.cta_desc}
          </p>
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2D5CF3] text-white rounded-full font-medium text-base hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md cursor-pointer"
          >
            {t.cta_button}
            <ArrowRight size={18} weight="bold" />
          </button>
        </AnimatedCard>
      </div>
    </div>
  )
}
