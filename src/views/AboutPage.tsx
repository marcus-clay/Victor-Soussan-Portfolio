/**
 * AboutPage - Full about page replacing the old Bio modal
 * MOFU structure: Hero → Career Chapters → Tools → Education → Resources → CTA
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  GraduationCap,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
} from '@phosphor-icons/react';

type Language = 'en' | 'fr';

interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
}

interface AboutPageProps {
  systemTheme: 'light' | 'dark';
  lang: Language;
  onBack: () => void;
  onContact: () => void;
  resources: Resource[];
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const TRANSLATIONS = {
  en: {
    back: 'Close',
    page_title: 'About',
    intro_role: 'Lead Product Designer',
    intro_location: 'Paris, France',
    intro_text: "I've been designing digital products for close to twenty years. I started in advertising agencies, moved to media and publishing, then spent the last decade building enterprise software, EdTech platforms, and public services. Along the way I've led design teams, worked hand in hand with product managers and engineers, and shipped products used by hundreds of thousands of people. The conviction I carry from all of this: good design is built with the team, not handed off to it.",
    career_title: 'Career',
    chapters: [
      {
        period: '2025 – Present',
        title: 'Lead Product Designer',
        company: 'Independent',
        text: "Product design and prototyping for B2B, B2G companies and growing startups. Full cycle: framing, user research, design, delivery. Current engagements: redesigning the search engine and optimizing conversion on Banque des Territoires' B2G marketplaces (Aquagir, Numérique360). Designing V2 of Toolkit.ac (construction SaaS, 2,000 paying customers): job site dashboard, scheduling, multi-device navigation, end-to-end design from 0 to 1 with CEO and CTO. User research for FEPEM's MonEmploiDirect launch: methodology, team mentoring, product roadmap recommendations. In parallel, I run Condamine Apps, a personal lab where I prototype and deploy web applications with Claude Code and Figma. 50 apps and prototypes shipped since early 2025.",
      },
      {
        period: 'January – July 2025',
        title: 'Lead Product Designer',
        company: 'beta.gouv.fr · France VAE',
        text: "I joined beta.gouv.fr as Lead Product Designer for France VAE, a government service helping workers validate professional experience. I worked in tight collaboration with the product team, running user interviews, facilitating design thinking workshops with field actors, and restructuring the delivery workflow around one-month seasons with clear cycles: frame, build, test.",
      },
      {
        period: '2018 – 2024',
        title: 'Senior Designer → Product Lead',
        company: 'UNOWHY / SQOOL',
        text: "Six years at UNOWHY transformed both the product and my role. I started as a Senior UX/UI Designer and grew into Product Lead, working as a close partner to five product managers across the SQOOL ecosystem. Together we transformed SQOOL from a simple Android launcher into a five-application SaaS suite serving 500,000 students across 465 schools in Île-de-France. I recruited and managed a team of five designers, built a unified design system across five brands (reducing design time by 60%), and led two products from zero to one: SQOOL Extend (virtual machines for education) and SQOOL Protect (parental control, delivered in three months). I also structured the team's delivery rhythms: weekly PM-Designer syncs, documented decisions, and continuous alignment that kept design and product moving in the same direction. Alongside this, I co-designed two executive strategy seminars that shaped the company's 2027 roadmap, and worked with Toolkit.ac (2023-2024) as their first product designer, helping shape their V2 construction management tool for 2,000 paying users.",
      },
      {
        period: '2017 – 2018',
        title: 'Senior Product Designer',
        company: 'Dailymotion',
        text: "At Dailymotion I focused on the B2B side: publisher tools used by 8,000+ users and 50 to 100 premium publishers including CBS, ESPN, and BBC, handling over 100,000 videos per month. I designed the upload and livestream management interfaces, and created the team's first UI Kit with Storybook, establishing a reliable design-to-development workflow.",
      },
      {
        period: '2016 – 2017',
        title: 'Product Designer',
        company: 'Ogury',
        text: "My first experience in ad-tech. I designed analytics dashboards and campaign management interfaces for a mobile data company at a time when the industry was still finding its footing around privacy and consent.",
      },
      {
        period: '2014 – 2016',
        title: 'Lead UI/UX Designer',
        company: 'PagesJaunes',
        text: "PagesJaunes is where I learned to design at scale. I redesigned the iOS and Android apps (22 million downloads, 300,000 daily users) and built the company's first cross-platform design system. I also stepped into my first management role, leading a team of four UI designers and establishing quality standards for the design practice.",
      },
      {
        period: '2010 – 2014',
        title: 'Art Director & Freelance Creative Director',
        company: 'Hommell Publications, Louis 21, Freelance',
        text: "A formative period where I transitioned from print to digital. I art-directed a monthly magazine with 300,000 copies in circulation at Groupe Hommell, then worked as a freelance creative director for brands like L'Oréal, Orange, and Galeries Lafayette. At the agency Louis 21, I designed EADS's internal social network for 10,000 managers and built mobile apps for major brands. This is when I discovered my appetite for product design.",
      },
      {
        period: '2005 – 2010',
        title: 'Art Director',
        company: 'Publicis Groupe',
        text: "I started at Publicis working on creative campaigns for luxury houses: Hermès, Leica, Helena Rubinstein. Those years taught me visual storytelling, the importance of every detail, and the discipline of working within tight brand guidelines. A foundation I still draw from every day.",
      },
    ],
    practice_title: 'Current Practice',
    practice_text: "Since early 2025, I've been integrating AI into every stage of my design process. I use Claude Code as a daily partner for research, writing, prototyping, and shipping production code. With Figma MCP, I read design tokens and component specs directly from Figma into my development environment, keeping design and code in sync without manual handoffs. This workflow lets me go from concept to deployed prototype in hours. I've shipped 50 apps and prototypes this way through Condamine Apps. The concrete value: compressing the distance between an idea and something people can use, so I spend more time on the decisions that matter. Structure, clarity, and user outcomes.",
    tools_title: 'Daily Drivers',
    education_title: 'Education & Certifications',
    education_master_title: 'Master in Communication & Multimedia',
    education_master_school: 'ISCOM Paris (2001–2005)',
    education_ux_title: 'UX/UI Design & Prototyping',
    education_ux_school: 'UXcel / Udemy (2021)',
    toolkit_title: 'Resource Toolkit',
    toolkit_desc: 'Templates and methods I use daily to structure design workflows. Available as Notion pages.',
    cta_title: 'Want to work together?',
    cta_desc: "If you're looking for a Lead Product Designer who can operate from strategy to pixels, let's talk.",
    cta_button: 'Get in touch',
  },
  fr: {
    back: 'Fermer',
    page_title: 'À propos',
    intro_role: 'Lead Product Designer',
    intro_location: 'Paris, France',
    intro_text: "Je conçois des produits numériques depuis bientôt vingt ans. J'ai commencé en agence de publicité, évolué dans les médias et l'édition, puis passé la dernière décennie à construire des logiciels d'entreprise, des plateformes EdTech et des services publics. En chemin, j'ai dirigé des équipes design, travaillé main dans la main avec des product managers et des ingénieurs, et livré des produits utilisés par des centaines de milliers de personnes. La conviction que j'en tire : le bon design se construit avec l'équipe, pas en silo.",
    career_title: 'Parcours',
    chapters: [
      {
        period: '2025 – Aujourd\'hui',
        title: 'Lead Product Designer',
        company: 'Indépendant',
        text: "Conception produit et prototypage pour des entreprises B2B, B2G et des startups en croissance. Cycle complet : cadrage, recherche utilisateur, conception, livraison. Missions en cours : redesign du moteur de recherche et optimisation de conversion sur les marketplaces B2G de la Banque des Territoires (Aquagir, Numérique360). Conception V2 de Toolkit.ac (SaaS construction, 2 000 clients payants) : dashboard chantier, planning, navigation multi-devices, design end-to-end de 0 à 1 avec CEO et CTO. Recherche utilisateur pour le lancement de MonEmploiDirect (FEPEM) : méthodologie, mentoring d'équipe, recommandations roadmap produit. En parallèle, je développe Condamine Apps, un lab personnel où je prototype et déploie des applications web avec Claude Code et Figma. 50 apps et prototypes déployés depuis début 2025.",
      },
      {
        period: 'Janvier – Juillet 2025',
        title: 'Lead Product Designer',
        company: 'beta.gouv.fr · France VAE',
        text: "J'ai rejoint beta.gouv.fr en tant que Lead Product Designer pour France VAE, un service public d'accompagnement à la validation des acquis de l'expérience. J'ai travaillé en étroite collaboration avec l'équipe produit, mené des entretiens utilisateurs, animé des ateliers de design thinking avec des acteurs de terrain, et restructuré le workflow de livraison autour de saisons d'un mois avec des cycles clairs : cadrer, construire, tester.",
      },
      {
        period: '2018 – 2024',
        title: 'Senior Designer → Product Lead',
        company: 'UNOWHY / SQOOL',
        text: "Six années chez UNOWHY ont transformé le produit autant que mon rôle. J'ai débuté comme UX/UI Designer Senior et évolué vers un poste de Product Lead, en travaillant comme partenaire direct de cinq product managers sur l'écosystème SQOOL. Ensemble, nous avons transformé SQOOL d'un simple launcher Android en une suite SaaS de cinq applications servant 500 000 élèves dans 465 établissements d'Île-de-France. J'ai recruté et managé une équipe de cinq designers, construit un design system unifié sur cinq marques (réduisant le temps de conception de 60 %), et mené deux produits de zéro à un : SQOOL Extend (machines virtuelles pour l'éducation) et SQOOL Protect (contrôle parental, livré en trois mois). J'ai aussi structuré les rythmes de livraison de l'équipe : syncs PM-Designer hebdomadaires, décisions documentées, et alignement continu entre design et produit. En parallèle, j'ai co-conçu deux séminaires de stratégie exécutive qui ont défini la roadmap 2027 de l'entreprise, et collaboré avec Toolkit.ac (2023-2024) en tant que premier product designer, pour structurer la V2 de leur outil de gestion de chantier destiné à 2 000 utilisateurs payants.",
      },
      {
        period: '2017 – 2018',
        title: 'Senior Product Designer',
        company: 'Dailymotion',
        text: "Chez Dailymotion, je me suis concentré sur le versant B2B : les outils pour éditeurs, utilisés par plus de 8 000 personnes et 50 à 100 éditeurs premium comme CBS, ESPN et BBC, avec plus de 100 000 vidéos gérées chaque mois. J'ai conçu les interfaces d'upload et de gestion du livestream, et créé le premier UI Kit de l'équipe avec Storybook, instaurant un workflow fiable entre design et développement.",
      },
      {
        period: '2016 – 2017',
        title: 'Product Designer',
        company: 'Ogury',
        text: "Ma première expérience dans l'ad-tech. J'ai conçu des dashboards d'analytics et des interfaces de gestion de campagnes pour une entreprise de données mobiles, à un moment où le secteur cherchait encore ses repères sur les questions de vie privée et de consentement.",
      },
      {
        period: '2014 – 2016',
        title: 'Lead UI/UX Designer',
        company: 'PagesJaunes',
        text: "PagesJaunes m'a appris à designer à grande échelle. J'ai redessiné les applications iOS et Android (22 millions de téléchargements, 300 000 utilisateurs quotidiens) et construit le premier design system cross-platform de l'entreprise. J'y ai aussi pris mon premier rôle de management, en encadrant une équipe de quatre UI designers et en structurant les standards qualité de la pratique design.",
      },
      {
        period: '2010 – 2014',
        title: 'Directeur Artistique & Directeur de Création Freelance',
        company: 'Hommell Publications, Louis 21, Freelance',
        text: "Une période formatrice de transition du print vers le digital. J'ai dirigé la direction artistique d'un magazine mensuel à 300 000 exemplaires chez le Groupe Hommell, puis travaillé en freelance pour des marques comme L'Oréal, Orange et les Galeries Lafayette. Chez l'agence Louis 21, j'ai conçu le réseau social interne d'EADS pour 10 000 managers et développé des applications mobiles pour de grandes marques. C'est à cette période que j'ai découvert mon appétit pour le design produit.",
      },
      {
        period: '2005 – 2010',
        title: 'Directeur Artistique',
        company: 'Publicis Groupe',
        text: "J'ai démarré chez Publicis sur des campagnes créatives pour des maisons de luxe : Hermès, Leica, Helena Rubinstein. Ces années m'ont enseigné le storytelling visuel, l'importance de chaque détail, et la discipline du travail dans un cadre de marque exigeant. Un socle sur lequel je m'appuie encore au quotidien.",
      },
    ],
    practice_title: 'Pratique actuelle',
    practice_text: "Depuis début 2025, j'intègre l'IA à chaque étape de mon processus de conception. J'utilise Claude Code au quotidien pour la recherche, la rédaction, le prototypage et le déploiement de code en production. Avec Figma MCP, je lis les design tokens et les spécifications composants directement depuis Figma dans mon environnement de développement, ce qui maintient design et code synchronisés sans transferts manuels. Ce workflow me permet de passer du concept au prototype déployé en quelques heures. J'ai livré 50 apps et prototypes de cette manière via Condamine Apps. L'apport concret : réduire la distance entre une idée et quelque chose d'utilisable, pour consacrer plus de temps aux décisions qui comptent. La structure, la clarté, les résultats pour l'utilisateur.",
    tools_title: 'Outils du quotidien',
    education_title: 'Formation et certifications',
    education_master_title: 'Master en Communication et Multimédia',
    education_master_school: 'ISCOM Paris (2001–2005)',
    education_ux_title: 'UX/UI Design et Prototypage',
    education_ux_school: 'Certification UXcel / Udemy (2021)',
    toolkit_title: 'Boîte à outils',
    toolkit_desc: 'Templates et méthodes que j\'utilise au quotidien pour structurer les workflows de conception. Disponibles en pages Notion.',
    cta_title: 'Envie de travailler ensemble ?',
    cta_desc: 'Si vous cherchez un Lead Product Designer capable d\'intervenir de la stratégie jusqu\'au pixel, échangeons.',
    cta_button: 'Me contacter',
  },
};

// ---------------------------------------------------------------------------
// Tool data (SVG icons inline, same as former bio modal)
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: 'Figma',
    color: 'bg-[#1E1E1E]',
    icon: (
      <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: 'Notion',
    color: 'bg-white',
    icon: (
      <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
        <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#fff"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#000"/>
      </svg>
    ),
  },
  {
    name: 'Linear',
    color: 'bg-[#5E6AD2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="#fff"/>
        <path d="M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'GSlides',
    color: 'bg-[#FBBC04]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
        <path d="M37 45H11c-2.209 0-4-1.791-4-4V7c0-2.209 1.791-4 4-4h18l12 12v26c0 2.209-1.791 4-4 4z" fill="#FFC107"/>
        <path d="M29 3L29 15 41 15z" fill="#FFECB3"/>
        <path d="M15 23H33V35H15z" fill="#FFECB3"/>
        <path d="M15 27H33V31H15z" fill="#FFC107"/>
      </svg>
    ),
  },
  {
    name: 'Claude',
    color: 'bg-[#D4A27F]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#fff"/>
        <path d="M16.5 8.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-9 0C6.672 8.5 6 9.172 6 10s.672 1.5 1.5 1.5S9 10.828 9 10s-.672-1.5-1.5-1.5zm4.5 9c-2.33 0-4.304-1.458-5.084-3.5h10.168c-.78 2.042-2.754 3.5-5.084 3.5z" fill="#D4A27F"/>
      </svg>
    ),
  },
  {
    name: 'Gemini',
    color: 'bg-gradient-to-br from-[#4285F4] via-[#9B72CB] to-[#D96570]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#fff"/>
        <path d="M12 6l-4 6h8l-4-6zm0 12l4-6H8l4 6z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'Midjourney',
    color: 'bg-[#0B0B0B]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#FFFFFF"/>
        <path d="M8 8h8v2H8V8zm0 3h8v2H8v-2zm0 3h5v2H8v-2z" fill="#0B0B0B"/>
      </svg>
    ),
  },
  {
    name: 'ScreenStudio',
    color: 'bg-gradient-to-br from-[#7C3AED] to-[#4F46E5]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="12" rx="2" fill="#fff"/>
        <circle cx="12" cy="10" r="3" fill="#7C3AED"/>
        <path d="M8 20h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Chapter accent colors for the timeline dots
// ---------------------------------------------------------------------------

const CHAPTER_COLORS = [
  'bg-blue-600',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-slate-500',
];

const CHAPTER_BORDER_COLORS_DARK = [
  'border-blue-600/30',
  'border-indigo-500/30',
  'border-purple-500/30',
  'border-pink-500/30',
  'border-orange-500/30',
  'border-teal-500/30',
  'border-slate-500/30',
];

const CHAPTER_BORDER_COLORS_LIGHT = [
  'border-blue-200',
  'border-indigo-200',
  'border-purple-200',
  'border-pink-200',
  'border-orange-200',
  'border-teal-200',
  'border-slate-200',
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AboutPage: React.FC<AboutPageProps> = ({ systemTheme, lang, onBack, onContact, resources }) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-page-title"
      className={`fixed inset-0 md:top-16 z-[100] flex flex-col ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#F9F9F9]'
      }`}
    >
      {/* Fixed header - mobile only, desktop uses persistent nav */}
      <header className={`sticky top-0 z-20 backdrop-blur-xl md:hidden ${
        isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80'
      }`}>
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <h2 id="about-page-title" className={`font-semibold text-base sm:text-lg tracking-[-0.02em] ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t.page_title}
          </h2>
          <button
            onClick={onBack}
            aria-label="Close"
            className={`relative p-3 flex items-center justify-center rounded-full transition-colors cursor-pointer before:absolute before:inset-[-12px] before:content-[''] ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-white/10'
                : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className={`flex-1 overflow-y-auto py-12 md:py-20 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#F9F9F9]'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 space-y-16 md:space-y-20">

          {/* ------------------------------------------------------------ */}
          {/* Page Header */}
          {/* ------------------------------------------------------------ */}
          <div className="mb-10 md:mb-14">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {lang === 'en' ? 'About' : '\u00c0 propos'}
            </h1>
            <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t.intro_role} · {t.intro_location}
            </p>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Intro */}
          {/* ------------------------------------------------------------ */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Portrait */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/images/photos victor/image_victor_home.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>
            {/* Text */}
            <div className="flex-1">
              <p className={`text-base md:text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t.intro_text}
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Career Chapters */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className={`text-2xl font-bold mb-8 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.career_title}</h2>

            <div className="space-y-0">
              {t.chapters.map((chapter, idx) => {
                const isLast = idx === t.chapters.length - 1;
                const dotColor = CHAPTER_COLORS[idx % CHAPTER_COLORS.length];
                const borderColor = isDark
                  ? CHAPTER_BORDER_COLORS_DARK[idx % CHAPTER_BORDER_COLORS_DARK.length]
                  : CHAPTER_BORDER_COLORS_LIGHT[idx % CHAPTER_BORDER_COLORS_LIGHT.length];

                return (
                  <div
                    key={idx}
                    className={`relative pl-8 pb-10 ${!isLast ? `border-l-2 ${borderColor}` : ''}`}
                  >
                    {/* Dot */}
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 ${dotColor} rounded-full`} />

                    {/* Period */}
                    <div className={`text-sm font-semibold mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {chapter.period}
                    </div>

                    {/* Title & company */}
                    <h3 className={`text-lg font-bold mb-0.5 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {chapter.title}
                    </h3>
                    <div className={`text-sm mb-3 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {chapter.company}
                    </div>

                    {/* Body text */}
                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {chapter.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Current Practice */}
          {/* ------------------------------------------------------------ */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{t.practice_title}</h2>
            </div>
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t.practice_text}
            </p>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Tools & Stack */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className={`text-xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.tools_title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TOOLS.map(tool => (
                <div
                  key={tool.name}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-default ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0 border ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    {tool.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Education */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className={`text-xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.education_title}</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <GraduationCap size={20} className="mr-3 mt-1 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.education_master_title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.education_master_school}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <BookOpen size={20} className="mr-3 mt-1 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.education_ux_title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.education_ux_school}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Resource Toolkit */}
          {/* ------------------------------------------------------------ */}
          <div>
            <div className={`flex items-center mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <BookOpen size={24} className="mr-3 text-blue-600" />
              <h2 className="text-xl font-bold">{t.toolkit_title}</h2>
            </div>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.toolkit_desc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-xl transition-colors group cursor-pointer border ${
                    isDark
                      ? 'bg-white/5 hover:bg-blue-900/30 text-gray-300 hover:text-blue-400 border-white/5 hover:border-blue-600/30'
                      : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border-transparent hover:border-blue-100'
                  }`}
                >
                  <div className={`mr-4 p-2.5 rounded-lg border shadow-sm ${
                    isDark
                      ? 'bg-white/10 border-white/10 group-hover:border-blue-600/30'
                      : 'bg-white border-gray-100 group-hover:border-blue-100'
                  }`}>
                    {res.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{res.title}</div>
                    <div className={`text-xs ${
                      isDark
                        ? 'text-gray-500 group-hover:text-blue-400'
                        : 'text-gray-400 group-hover:text-blue-400'
                    }`}>{res.desc}</div>
                  </div>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                </a>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CTA */}
          {/* ------------------------------------------------------------ */}
          <div className={`py-12 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.cta_title}
            </h2>
            <p className={`text-base mb-6 max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.cta_desc}
            </p>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5CF3] text-white rounded-full font-medium text-sm hover:bg-[#2450d4] transition-colors cursor-pointer"
            >
              {t.cta_button}
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
