/**
 * ToolkitExecutive - "En bref" / "At a glance" version of Toolkit case study
 *
 * Minimalist rewrite: light-only, no cards, no shadows, no colored badges.
 * divide-y rows for metrics and deliverables, text links for CTAs.
 */

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyViewPills from '../CaseStudyViewPills';
import VideoPlayer from '../VideoPlayer';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { getTestimonials } from '@/data/testimonialsData';
import PhaseAccordion from './PhaseAccordion';

interface ToolkitExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Product Design',
      period: '2023-2025',
      client: 'Toolkit',
      role: 'Sole Product Designer',
      title: 'Construction software that works',
      subtitle: 'From concept to 2,000 paying customers as the only designer on a three-person team.',
      imageCaption: 'Toolkit — 12 months, 120+ screens, one designer',
      imageDesc: 'The starting point was an investor pitch, not a research lab. The founder needed a credible prototype to raise funds, so we built one. What that process surfaced was a sharper question: why were construction managers still running sites on spreadsheets and group chats? Not because they lacked discipline. Because the software built for them started from a database schema, not from a job site. A site manager coordinating six trades across three buildings, absorbing last-minute supplier changes with incomplete information, cannot afford a five-step flow to update a task. We went back to the terrain: how decisions actually get made on a site, how information moves between field and office, how a lean three-person team delivers 120 coherent screens without losing the thread. Three major iterations over twelve months. Each one narrowed the gap between what someone needed to do and how fast they could do it. Two thousand paying customers by 2025.',
    },
    role: {
      title: 'My role',
      subtitle: 'End-to-end product design, from prototype to production in a lean 3-person team.',
      items: [
        { label: 'Sole product designer', detail: 'Creation phase' },
        { label: 'Brand & visual identity', detail: 'Guidelines & key visuals' },
        { label: 'Web & mobile flows', detail: 'Onboarding to core features' },
        { label: 'Design system', detail: 'Scalable foundations' },
        { label: 'Direct collaboration', detail: 'With CEO & CTO' },
      ],
      context: 'I joined a three-person team: CEO with domain expertise, lead developer building foundations, and myself as sole designer. No design team, no researchers. Tight collaboration and weekly user validation.',
    },
    scope: {
      title: 'Scope of work',
      intro: 'From authentication to planning, every screen and interaction.',
      areas: [
        {
          id: 'prototype',
          title: 'Funding Prototype',
          description: 'Hi-fi prototype securing initial investment. App architecture, UX flows, pitch deck design.',
          image: '/images/toolkit/hero.webp',
        },
        {
          id: 'core',
          title: 'Core Product',
          description: 'Project creation, task management, documents, zones, activity tracking, team collaboration.',
          image: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg',
        },
        {
          id: 'planning',
          title: 'Interactive Planning',
          description: 'Advanced canvas with micro-interactions: fluid zoom, dynamic menus, drag selection, batch operations.',
          image: '/images/toolkit/planning_-_v2.svg',
        },
        {
          id: 'mobile',
          title: 'Mobile Strategy',
          description: 'Responsive views designed for native iOS/Android adaptation. Coherent interaction patterns.',
          image: '/images/toolkit/evolution_mobile_menu.svg',
        },
        {
          id: 'system',
          title: 'Design System',
          description: 'Tailwind UI kit, tokens, Figma organization. Scalable to 120+ screens.',
          image: '/images/toolkit/Design_system.svg',
        },
      ],
    },
    journey: {
      title: '12-month journey',
      diagramCaption: 'Product evolution — three phases to market fit',
      phases: [
        {
          id: 1,
          title: 'Foundation',
          period: 'Months 1-3',
          goal: 'Secure initial funding',
          deliverables: [
            'Core authentication (magic link)',
            'Dual sidebar navigation',
            'Project creation workflow',
            'Task library & sequences',
            'Planning canvas v1',
            'PDF export',
          ],
        },
        {
          id: 2,
          title: 'Feature Expansion',
          period: 'Months 4-8',
          goal: 'Rich interactions & multi-project',
          deliverables: [
            'Dynamic island menu system',
            'Multi-select batch operations',
            'Refined task cards (v2)',
            'Fluid zoom (day to quarter)',
            'Project hub for multi-site',
            'Stakeholder management',
          ],
        },
        {
          id: 3,
          title: 'Platform Maturity',
          period: 'Months 9-12',
          goal: 'Mobile & scale',
          deliverables: [
            'Visual hierarchy refinement',
            'Mobile navigation evolution',
            'Platform-specific design',
            'Activity enrichment (photos)',
            'Design system scalability',
            '120+ screens delivered',
          ],
        },
      ],
    },
    highlights: {
      title: 'Key interactions',
      items: [
        {
          id: 'planning',
          title: 'Planning Canvas',
          subtitle: 'From v1 to v2',
          description: 'Evolved visual system: reduced weight, improved contrast. 50+ tasks visible without overwhelm.',
          media: '/images/toolkit/planning_-_v2.svg',
          type: 'image' as const,
        },
        {
          id: 'dynamic',
          title: 'Dynamic Island Menu',
          subtitle: 'Context-aware actions',
          description: 'Menu adapts to selection state. Single task: edit options. Multiple: batch operations.',
          media: '/videos/toolkit/video_-_task_manipulation.mp4',
          type: 'video' as const,
        },
        {
          id: 'batch',
          title: 'Batch Operations',
          subtitle: '20 seconds vs minutes',
          description: 'Rectangle drag selection across zones. Apply parameters to 50+ tasks at once.',
          media: '/videos/toolkit/video_-_batch_edition.mp4',
          type: 'video' as const,
        },
        {
          id: 'zoom',
          title: 'Fluid Zoom',
          subtitle: 'Day to quarter view',
          description: 'Seamless timeline navigation from daily tasks to quarterly overview.',
          media: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4',
          type: 'video' as const,
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '2,000+', label: 'Paying customers', sublabel: 'in 24 months' },
        { value: 'Series A', label: 'Funding secured', sublabel: 'November 2025' },
        { value: '15+', label: 'Sites per enterprise', sublabel: 'customer' },
      ],
    },
    testimonial: {
      quote: 'Victor worked with Toolkit as our UX/UI designer from the earliest stages. He transformed complex business requirements into perfectly adapted user flows. Thanks to his experience, Victor also established foundational systems (UI kit, interaction patterns) that saved us considerable development time.',
      author: 'Pierre-Marie Nigay',
      role: 'Founder @ Toolkit',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Design Produit',
      period: '2023-2025',
      client: 'Toolkit',
      role: 'Seul Product Designer',
      title: 'Un logiciel de chantier\nqui fonctionne',
      subtitle: 'Du concept à 2 000 clients payants, seul designer dans une équipe de trois.',
      imageCaption: 'Toolkit — 12 mois, 120+ écrans, un seul designer',
      imageDesc: 'Le point de départ, c\'était une levée de fonds, pas un laboratoire de recherche. Le fondateur avait besoin d\'un prototype crédible pour convaincre ses investisseurs, on en a construit un. Ce que ce travail a mis en évidence, c\'est une question plus précise : pourquoi les conducteurs de travaux géraient-ils encore leurs chantiers avec des tableurs et des chats de groupe ? Pas par manque de rigueur. Parce que les logiciels conçus pour eux partaient d\'un schéma de base de données, pas d\'une logique de terrain. Un conducteur qui coordonne six corps d\'état sur trois bâtiments, qui absorbe des changements de dernière minute avec une information incomplète, ne peut pas se permettre cinq étapes pour mettre à jour une tâche. On est repartis du terrain : comment les décisions se prennent réellement sur un chantier, comment l\'information circule entre le terrain et le bureau, comment une équipe de trois livre 120 écrans cohérents sans perdre le fil. Trois grandes itérations en douze mois. Chacune a réduit l\'écart entre ce que quelqu\'un devait faire et la vitesse à laquelle il pouvait le faire. Deux mille clients payants en 2025.',
    },
    role: {
      title: 'Mon rôle',
      subtitle: 'Design produit de bout en bout, du prototype à la production dans une équipe lean de 3 personnes.',
      items: [
        { label: 'Seul product designer', detail: 'Phase de création' },
        { label: 'Identité visuelle', detail: 'Guidelines & visuels clés' },
        { label: 'Parcours web & mobile', detail: 'Onboarding aux features core' },
        { label: 'Design system', detail: 'Fondations scalables' },
        { label: 'Collaboration directe', detail: 'Avec CEO & CTO' },
      ],
      context: 'J\'ai rejoint une équipe de trois : CEO avec expertise métier, lead dev construisant les fondations, et moi comme seul designer. Pas d\'équipe design, pas de researchers. Collaboration serrée et validation utilisateur hebdomadaire.',
    },
    scope: {
      title: 'Périmètre',
      intro: 'Tout pour simplifier le quotidien des opérateurs sur les chantiers.',
      areas: [
        {
          id: 'prototype',
          title: 'Prototype de Levée',
          description: 'Prototype hi-fi pour l\'investissement initial. Architecture app, UX flows, design pitch deck.',
          image: '/images/toolkit/hero.webp',
        },
        {
          id: 'core',
          title: 'Produit Core',
          description: 'Création projet, gestion tâches, documents, zones, suivi activité, collaboration équipe.',
          image: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg',
        },
        {
          id: 'planning',
          title: 'Planning Interactif',
          description: 'Canvas avancé avec micro-interactions : zoom fluide, menus dynamiques, sélection drag, opérations batch.',
          image: '/images/toolkit/planning_-_v2.svg',
        },
        {
          id: 'mobile',
          title: 'Stratégie Mobile',
          description: 'Vues responsive conçues pour adaptation native iOS/Android. Patterns d\'interaction cohérents.',
          image: '/images/toolkit/evolution_mobile_menu.svg',
        },
        {
          id: 'system',
          title: 'Design System',
          description: 'UI kit Tailwind, tokens, organisation Figma. Scalable à 120+ écrans.',
          image: '/images/toolkit/Design_system.svg',
        },
      ],
    },
    journey: {
      title: 'Parcours 12 mois',
      diagramCaption: 'Évolution produit — trois phases vers le product-market fit',
      phases: [
        {
          id: 1,
          title: 'Fondation',
          period: 'Mois 1-3',
          goal: 'Sécuriser le financement initial',
          deliverables: [
            'Authentification core (magic link)',
            'Navigation dual sidebar',
            'Workflow création projet',
            'Bibliothèque tâches & séquences',
            'Canvas planning v1',
            'Export PDF',
          ],
        },
        {
          id: 2,
          title: 'Expansion Features',
          period: 'Mois 4-8',
          goal: 'Interactions riches & multi-projet',
          deliverables: [
            'Système menu dynamic island',
            'Opérations batch multi-sélection',
            'Cartes tâches affinées (v2)',
            'Zoom fluide (jour à trimestre)',
            'Hub projet multi-sites',
            'Gestion parties prenantes',
          ],
        },
        {
          id: 3,
          title: 'Maturité Plateforme',
          period: 'Mois 9-12',
          goal: 'Mobile & scale',
          deliverables: [
            'Raffinement hiérarchie visuelle',
            'Évolution navigation mobile',
            'Design platform-specific',
            'Enrichissement activité (photos)',
            'Scalabilité design system',
            '120+ écrans livrés',
          ],
        },
      ],
    },
    highlights: {
      title: 'Interactions clés',
      items: [
        {
          id: 'planning',
          title: 'Canvas Planning',
          subtitle: 'De v1 à v2',
          description: 'Système visuel évolué : poids réduit, contraste amélioré. 50+ tâches visibles sans surcharge.',
          media: '/images/toolkit/planning_-_v2.svg',
          type: 'image' as const,
        },
        {
          id: 'dynamic',
          title: 'Menu Dynamic Island',
          subtitle: 'Actions contextuelles',
          description: 'Menu s\'adapte à la sélection. Tâche unique : édition. Multiples : opérations batch.',
          media: '/videos/toolkit/video_-_task_manipulation.mp4',
          type: 'video' as const,
        },
        {
          id: 'batch',
          title: 'Opérations Batch',
          subtitle: '20 secondes vs minutes',
          description: 'Sélection rectangle à travers zones. Appliquer paramètres à 50+ tâches d\'un coup.',
          media: '/videos/toolkit/video_-_batch_edition.mp4',
          type: 'video' as const,
        },
        {
          id: 'zoom',
          title: 'Zoom Fluide',
          subtitle: 'Vue jour à trimestre',
          description: 'Navigation timeline seamless des tâches quotidiennes à la vue trimestrielle.',
          media: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4',
          type: 'video' as const,
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '2 000+', label: 'Clients payants', sublabel: 'en 24 mois' },
        { value: 'Série A', label: 'Financement', sublabel: 'Novembre 2025' },
        { value: '15+', label: 'Sites par client', sublabel: 'entreprise' },
      ],
    },
    testimonial: {
      quote: 'Victor a travaillé avec Toolkit comme UX/UI designer dès les premières étapes. Il a transformé des exigences business complexes en parcours utilisateurs parfaitement adaptés. Grâce à son expérience, Victor a également établi des systèmes fondamentaux (UI kit, patterns d\'interaction) qui nous ont fait gagner un temps de développement considérable.',
      author: 'Pierre-Marie Nigay',
      role: 'Fondateur @ Toolkit',
    },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ToolkitExecutive: React.FC<ToolkitExecutiveProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  const testimonials = getTestimonials(lang);
  const testimonial = testimonials.find((x) => x.id === 'pierre-marie-nigay')!;

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] as const },
  });

  return (
    <div className="bg-[#FDFDFC]">

      {/* ================================================================ */}
      {/* HERO SECTION                                                     */}
      {/* ================================================================ */}
      <section id="hero" className="pt-16 md:pt-24 mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          {/* Meta row */}
          <motion.div {...fadeIn()} className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
            <span className="text-xs text-gray-400">{t.hero.role}</span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400">{t.hero.client}</span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400">{t.hero.period}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 {...fadeIn(0.05)} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeIn(0.1)} className="mt-4 text-base text-gray-500 leading-relaxed max-w-[65ch]">
            {t.hero.subtitle}
          </motion.p>

          {/* View pills */}
          <motion.div {...fadeIn(0.15)}>
            <CaseStudyViewPills lang={lang} projectId="toolkit" />
          </motion.div>

          {/* Testimonial — social proof before the case study deep-dive */}
          {testimonial && (
            <CaseStudyTestimonialBlock
              quote={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              linkedin={testimonial.linkedin}
              lang={lang}
            />
          )}
        </div>

        {/* Hero image */}
        <motion.div {...fadeIn(0.2)} className="max-w-[960px] mx-auto px-6 mt-12">
          <div
            onClick={() => onImageClick('/images/toolkit/toolkit_app_v3.webp')}
            className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
          >
            <img
              loading="lazy"
              src="/images/toolkit/toolkit_app_v3.webp"
              alt="Toolkit App"
              className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-4 max-w-[740px] mx-auto">
            <p className="text-xs font-medium text-gray-400 mb-1">{t.hero.imageCaption}</p>
            <p className="text-base text-gray-500 leading-relaxed">{t.hero.imageDesc}</p>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* ROLE SECTION                                                     */}
      {/* ================================================================ */}
      <section id="role" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.role.title}
          </motion.h2>

          <motion.p {...fadeIn(0.05)} className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
            {t.role.subtitle}
          </motion.p>

          {/* Role items as divide-y list */}
          <motion.div {...fadeIn(0.1)} className="divide-y divide-gray-100">
            {t.role.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-baseline justify-between gap-4">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-xs text-gray-400 text-right shrink-0">{item.detail}</span>
              </div>
            ))}
          </motion.div>

          <motion.p {...fadeIn(0.15)} className="mt-8 text-base text-gray-500 leading-relaxed max-w-[65ch]">
            {t.role.context}
          </motion.p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SCOPE SECTION                                                    */}
      {/* ================================================================ */}
      <section id="scope" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.scope.title}
          </motion.h2>

          <motion.p {...fadeIn(0.05)} className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
            {t.scope.intro}
          </motion.p>
        </div>

        {/* One text block + image per scope area */}
        {t.scope.areas.map((area) => (
          <React.Fragment key={area.id}>
            <motion.div {...fadeIn()} className="max-w-[740px] mx-auto px-6 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{area.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{area.description}</p>
            </motion.div>
            <motion.div {...fadeIn()} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
                onClick={() => onImageClick(area.image)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <img
                  loading="lazy"
                  src={area.image}
                  alt={area.title}
                  className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-gray-400">{area.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* ================================================================ */}
      {/* JOURNEY SECTION                                                  */}
      {/* ================================================================ */}
      <section id="journey" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-10">
            {t.journey.title}
          </motion.h2>

          <motion.div {...fadeIn(0.05)}>
            <PhaseAccordion phases={t.journey.phases} />
          </motion.div>
        </div>

        {/* Evolution diagram */}
        <motion.div {...fadeIn()} className="max-w-[960px] mx-auto px-6 mt-16">
          <div
            onClick={() => onImageClick('/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg')}
            className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
          >
            <img
              loading="lazy"
              src="/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg"
              alt="Product evolution over 12 months"
              className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
            />
          </div>
          <p className="mt-3 text-xs font-medium text-gray-400">{t.journey.diagramCaption}</p>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* HIGHLIGHTS SECTION                                               */}
      {/* ================================================================ */}
      <section id="highlights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-12">
            {t.highlights.title}
          </motion.h2>
        </div>

        {t.highlights.items.map((item) => (
          <React.Fragment key={item.id}>
            {/* Text first */}
            <motion.div {...fadeIn()} className="max-w-[740px] mx-auto px-6 mb-6">
              <p className="text-xs text-gray-400 mb-1">{item.subtitle}</p>
              <h3 className="text-sm font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{item.description}</p>
            </motion.div>
            {/* Media second */}
            <motion.div {...fadeIn()} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
                onClick={() => onImageClick(item.media)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                {item.type === 'video' ? (
                  <VideoPlayer src={item.media} className="w-full h-auto block" />
                ) : (
                  <img
                    loading="lazy"
                    src={item.media}
                    alt={item.title}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <p className="mt-3 text-xs font-medium text-gray-400">{item.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* ================================================================ */}
      {/* OUTCOME SECTION                                                  */}
      {/* ================================================================ */}
      <section id="outcome" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.outcome.title}
          </motion.h2>

          <motion.div {...fadeIn(0.05)} className="flex flex-wrap gap-x-16 gap-y-8">
            {t.outcome.metrics.map((metric, idx) => (
              <div key={idx}>
                <span className="text-base font-semibold text-gray-900">{metric.value}</span>
                <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
                <p className="text-xs text-gray-400">{metric.sublabel}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ToolkitExecutive;
