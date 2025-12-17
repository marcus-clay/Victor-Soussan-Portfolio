/**
 * ToolkitExecutive - "En bref" / "At a glance" version of Toolkit case study
 *
 * Complete scope of work:
 * - Sole product designer for creation phase (concept to launch)
 * - Brand identity and visual guidelines
 * - Main web and mobile user flows (onboarding to core features)
 * - Design system foundations
 * - Direct collaboration with CEO and CTO
 *
 * Design: Apple Keynote-style with progressive disclosure, Linear-quality visualizations
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  Palette,
  Layout,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Trophy
} from 'lucide-react';

interface ToolkitExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Product Design • Zero to One • 2023-2025',
      title: 'Construction software\nthat works',
      subtitle: 'Sole designer from concept to 2,000 customers',
      scrollHint: 'Scroll to explore'
    },
    role: {
      eyebrow: 'My Role',
      title: 'End-to-end\nproduct design',
      subtitle: 'From prototype to production in a lean 3-person team',
      items: [
        { icon: 'briefcase', label: 'Sole product designer', detail: 'Creation phase' },
        { icon: 'palette', label: 'Brand & visual identity', detail: 'Guidelines & key visuals' },
        { icon: 'layout', label: 'Web & mobile flows', detail: 'Onboarding to core features' },
        { icon: 'layers', label: 'Design system', detail: 'Scalable foundations' },
        { icon: 'users', label: 'Direct collaboration', detail: 'With CEO & CTO' }
      ],
      context: 'I joined a three-person team: CEO with domain expertise, lead developer building foundations, and myself as sole designer. No design team, no researchers. Tight collaboration and weekly user validation.'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: 'Designed\nthe entire app',
      intro: 'From authentication to planning, every screen and interaction.',
      areas: [
        {
          id: 'prototype',
          title: 'Funding Prototype',
          description: 'Hi-fi prototype securing initial investment. App architecture, UX flows, pitch deck design.',
          image: '/images/toolkit/hero.webp'
        },
        {
          id: 'core',
          title: 'Core Product',
          description: 'Project creation, task management, documents, zones, activity tracking, team collaboration.',
          image: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg'
        },
        {
          id: 'planning',
          title: 'Interactive Planning',
          description: 'Advanced canvas with micro-interactions: fluid zoom, dynamic menus, drag selection, batch operations.',
          image: '/images/toolkit/planning_-_v2.svg'
        },
        {
          id: 'mobile',
          title: 'Mobile Strategy',
          description: 'Responsive views designed for native iOS/Android adaptation. Coherent interaction patterns.',
          image: '/images/toolkit/evolution_mobile_menu.svg'
        },
        {
          id: 'admin',
          title: 'Administration',
          description: 'User management, subscriptions, enterprise features.',
          image: '/images/toolkit/desktop_-_chantier_-_index_-_v3.svg'
        },
        {
          id: 'system',
          title: 'Design System',
          description: 'Tailwind UI kit, tokens, Figma organization. Scalable to 120+ screens.',
          image: '/images/toolkit/Design_system.svg'
        }
      ]
    },
    journey: {
      eyebrow: '12-Month Journey',
      title: 'Three phases\nto market fit',
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
            'PDF export'
          ]
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
            'Stakeholder management'
          ]
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
            '120+ screens delivered'
          ]
        }
      ]
    },
    highlights: {
      eyebrow: 'Key Interactions',
      title: 'Interaction design\nas differentiator',
      items: [
        {
          id: 'planning',
          title: 'Planning Canvas',
          subtitle: 'From v1 to v2',
          description: 'Evolved visual system: reduced weight, improved contrast. 50+ tasks visible without overwhelm.',
          media: '/images/toolkit/planning_-_v2.svg',
          type: 'image' as const
        },
        {
          id: 'dynamic',
          title: 'Dynamic Island Menu',
          subtitle: 'Context-aware actions',
          description: 'Menu adapts to selection state. Single task: edit options. Multiple: batch operations.',
          media: '/videos/toolkit/video_-_task_manipulation.mp4',
          type: 'video' as const
        },
        {
          id: 'batch',
          title: 'Batch Operations',
          subtitle: '20 seconds vs minutes',
          description: 'Rectangle drag selection across zones. Apply parameters to 50+ tasks at once.',
          media: '/videos/toolkit/video_-_batch_edition.mp4',
          type: 'video' as const
        },
        {
          id: 'zoom',
          title: 'Fluid Zoom',
          subtitle: 'Day to quarter view',
          description: 'Seamless timeline navigation from daily tasks to quarterly overview.',
          media: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4',
          type: 'video' as const
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Design driving\nbusiness results',
      metrics: [
        { value: '2,000+', label: 'Paying customers', sublabel: 'in 24 months' },
        { value: 'Series A', label: 'Funding secured', sublabel: 'November 2025' },
        { value: '15+', label: 'Sites per enterprise', sublabel: 'customer' }
      ]
    },
    testimonial: {
      quote: 'Victor worked with Toolkit as our UX/UI designer from the earliest stages. He transformed complex business requirements into perfectly adapted user flows. Thanks to his experience, Victor also established foundational systems (UI kit, interaction patterns) that saved us considerable development time.',
      author: 'Pierre-Marie Nigay',
      role: 'Founder @ Toolkit'
    },
    cta: {
      title: 'Interested in similar results?',
      button: 'Get in touch'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Design Produit • De zéro à un • 2023-2025',
      title: 'Un logiciel de chantier\nqui fonctionne',
      subtitle: 'Seul designer du concept à 2 000 clients',
      scrollHint: 'Défiler pour explorer'
    },
    role: {
      eyebrow: 'Mon Rôle',
      title: 'Design produit\nde bout en bout',
      subtitle: 'Du prototype à la production dans une équipe lean de 3 personnes',
      items: [
        { icon: 'briefcase', label: 'Seul product designer', detail: 'Phase de création' },
        { icon: 'palette', label: 'Identité visuelle', detail: 'Guidelines & visuels clés' },
        { icon: 'layout', label: 'Parcours web & mobile', detail: 'Onboarding aux features core' },
        { icon: 'layers', label: 'Design system', detail: 'Fondations scalables' },
        { icon: 'users', label: 'Collaboration directe', detail: 'Avec CEO & CTO' }
      ],
      context: 'J\'ai rejoint une équipe de trois : CEO avec expertise métier, lead dev construisant les fondations, et moi comme seul designer. Pas d\'équipe design, pas de researchers. Collaboration serrée et validation utilisateur hebdomadaire.'
    },
    scope: {
      eyebrow: 'Périmètre',
      title: '6 domaines clés livrés en 12 mois',
      intro: 'Tout pour simplifier le quotidien des opérateurs sur les chantiers.',
      areas: [
        {
          id: 'prototype',
          title: 'Prototype de Levée',
          description: 'Prototype hi-fi pour l\'investissement initial. Architecture app, UX flows, design pitch deck.',
          image: '/images/toolkit/hero.webp'
        },
        {
          id: 'core',
          title: 'Produit Core',
          description: 'Création projet, gestion tâches, documents, zones, suivi activité, collaboration équipe.',
          image: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg'
        },
        {
          id: 'planning',
          title: 'Planning Interactif',
          description: 'Canvas avancé avec micro-interactions : zoom fluide, menus dynamiques, sélection drag, opérations batch.',
          image: '/images/toolkit/planning_-_v2.svg'
        },
        {
          id: 'mobile',
          title: 'Stratégie Mobile',
          description: 'Vues responsive conçues pour adaptation native iOS/Android. Patterns d\'interaction cohérents.',
          image: '/images/toolkit/evolution_mobile_menu.svg'
        },
        {
          id: 'admin',
          title: 'Administration',
          description: 'Gestion utilisateurs, abonnements, fonctionnalités entreprise.',
          image: '/images/toolkit/desktop_-_chantier_-_index_-_v3.svg'
        },
        {
          id: 'system',
          title: 'Design System',
          description: 'UI kit Tailwind, tokens, organisation Figma. Scalable à 120+ écrans.',
          image: '/images/toolkit/Design_system.svg'
        }
      ]
    },
    journey: {
      eyebrow: 'Parcours 12 Mois',
      title: 'Trois phases\nvers le market fit',
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
            'Export PDF'
          ]
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
            'Gestion parties prenantes'
          ]
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
            '120+ écrans livrés'
          ]
        }
      ]
    },
    highlights: {
      eyebrow: 'Interactions Clés',
      title: 'Le design d\'interaction\ncomme différenciateur',
      items: [
        {
          id: 'planning',
          title: 'Canvas Planning',
          subtitle: 'De v1 à v2',
          description: 'Système visuel évolué : poids réduit, contraste amélioré. 50+ tâches visibles sans surcharge.',
          media: '/images/toolkit/planning_-_v2.svg',
          type: 'image' as const
        },
        {
          id: 'dynamic',
          title: 'Menu Dynamic Island',
          subtitle: 'Actions contextuelles',
          description: 'Menu s\'adapte à la sélection. Tâche unique : édition. Multiples : opérations batch.',
          media: '/videos/toolkit/video_-_task_manipulation.mp4',
          type: 'video' as const
        },
        {
          id: 'batch',
          title: 'Opérations Batch',
          subtitle: '20 secondes vs minutes',
          description: 'Sélection rectangle à travers zones. Appliquer paramètres à 50+ tâches d\'un coup.',
          media: '/videos/toolkit/video_-_batch_edition.mp4',
          type: 'video' as const
        },
        {
          id: 'zoom',
          title: 'Zoom Fluide',
          subtitle: 'Vue jour à trimestre',
          description: 'Navigation timeline seamless des tâches quotidiennes à la vue trimestrielle.',
          media: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4',
          type: 'video' as const
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Le design qui génère\ndes résultats business',
      metrics: [
        { value: '2 000+', label: 'Clients payants', sublabel: 'en 24 mois' },
        { value: 'Série A', label: 'Financement', sublabel: 'Novembre 2025' },
        { value: '15+', label: 'Sites par client', sublabel: 'entreprise' }
      ]
    },
    testimonial: {
      quote: 'Victor a travaillé avec Toolkit comme UX/UI designer dès les premières étapes. Il a transformé des exigences business complexes en parcours utilisateurs parfaitement adaptés. Grâce à son expérience, Victor a également établi des systèmes fondamentaux (UI kit, patterns d\'interaction) qui nous ont fait gagner un temps de développement considérable.',
      author: 'Pierre-Marie Nigay',
      role: 'Fondateur @ Toolkit'
    },
    cta: {
      title: 'Intéressé par des résultats similaires ?',
      button: 'Me contacter'
    }
  }
};

// ============================================================================
// ANIMATION COMPONENTS
// ============================================================================

const FadeInSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROLE DIAGRAM - Keynote style
// ============================================================================

const RoleDiagram: React.FC<{
  items: Array<{ icon: string; label: string; detail: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  const iconMap: Record<string, React.ReactNode> = {
    briefcase: <Briefcase size={24} />,
    palette: <Palette size={24} />,
    layout: <Layout size={24} />,
    layers: <Layers size={24} />,
    users: <Users size={24} />
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.08 }}
          className={`p-5 rounded-2xl text-center ${
            isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
            isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            {iconMap[item.icon]}
          </div>
          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.label}
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {item.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// SCOPE GRID - Interactive cards
// ============================================================================

const ScopeGrid: React.FC<{
  areas: Array<{ id: string; title: string; description: string; image: string }>;
  isDark: boolean;
  onImageClick: (src: string) => void;
}> = ({ areas, isDark, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {areas.map((area, idx) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.06 }}
          onClick={() => onImageClick(area.image)}
          className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}
        >
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img loading="lazy"
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {area.title}
            </h4>
            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {area.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// PRODUCT EVOLUTION DIAGRAM - Apple Keynote style (from DiagramProductEvolution.tsx)
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Foundation",
      duration: "Months 1-3",
      icon: Layers,
      description: "Establishing the core architecture and essential workflows.",
      features: [
        "Core authentication & navigation architecture",
        "Project creation & management workflows",
        "Task library with drag-drop sequences",
        "Planning V1 with colorful task cards",
        "Subscription system (individual + enterprise)",
        "PDF export functionality"
      ]
    },
    {
      id: 2,
      title: "Feature Expansion",
      duration: "Months 4-8",
      icon: Zap,
      description: "Enhancing interactivity and visual systems.",
      features: [
        "Advanced planning interactions (multi-select)",
        "Dynamic island adaptive menu system",
        "Refined task card aesthetic (V2 visual system)",
        "Fluid zoom timeline (daily to quarterly)",
        "Project hub for multi-site managers",
        "Stakeholder management features"
      ]
    },
    {
      id: 3,
      title: "Platform Maturity",
      duration: "Months 9-12",
      icon: Trophy,
      description: "Scalability, mobile strategy, and refinement.",
      features: [
        "Visual complexity management (hierarchy)",
        "Mobile strategy with platform-specific design",
        "Navigation evolution (direct access)",
        "Consolidated mobile navigation (4 groups)",
        "Activity enrichment (photo annotation)",
        "Design system scalability (120+ screens)"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Fondation",
      duration: "Mois 1-3",
      icon: Layers,
      description: "Architecture core et workflows essentiels.",
      features: [
        "Architecture authentification & navigation",
        "Workflows création & gestion projet",
        "Bibliothèque tâches avec séquences drag-drop",
        "Planning V1 avec cartes colorées",
        "Système abonnement (individuel + entreprise)",
        "Export PDF"
      ]
    },
    {
      id: 2,
      title: "Expansion Features",
      duration: "Mois 4-8",
      icon: Zap,
      description: "Interactions enrichies et systèmes visuels.",
      features: [
        "Interactions planning avancées (multi-sélection)",
        "Système menu adaptatif dynamic island",
        "Esthétique cartes tâches affinée (V2)",
        "Zoom fluide timeline (jour à trimestre)",
        "Hub projet pour managers multi-sites",
        "Gestion des parties prenantes"
      ]
    },
    {
      id: 3,
      title: "Maturité Plateforme",
      duration: "Mois 9-12",
      icon: Trophy,
      description: "Scalabilité, stratégie mobile et raffinement.",
      features: [
        "Gestion complexité visuelle (hiérarchie)",
        "Stratégie mobile platform-specific",
        "Évolution navigation (accès direct)",
        "Navigation mobile consolidée (4 groupes)",
        "Enrichissement activité (annotation photo)",
        "Scalabilité design system (120+ écrans)"
      ]
    }
  ]
};

const ProductEvolutionDiagram: React.FC<{
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ isDark, lang }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const phases = PHASES_DATA[lang];

  // Swipe logic for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (activePhase < phases.length - 1) setActivePhase(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activePhase > 0) setActivePhase(prev => prev - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const texts = {
    focus: lang === 'fr' ? 'Focus' : 'Focus',
    overview: lang === 'fr' ? 'Vue d\'ensemble' : 'Overview',
    keyDeliverables: lang === 'fr' ? 'Livrables clés' : 'Key Deliverables',
    phase: lang === 'fr' ? 'Phase' : 'Phase',
    more: lang === 'fr' ? 'de plus' : 'more'
  };

  return (
    <div className="mt-8">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className={`inline-flex rounded-full p-1 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <button
            onClick={() => setViewMode('focus')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'focus'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.focus}
          </button>
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'overview'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.overview}
          </button>
        </div>
      </div>

      {viewMode === 'focus' ? (
        /* Focus View */
        <div
          className="relative touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {phases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhase(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activePhase
                    ? `w-12 ${isDark ? 'bg-white' : 'bg-gray-900'}`
                    : `w-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          {/* Card Container */}
          <div className="relative h-[480px] md:h-[420px]">
            {phases.map((phase, idx) => {
              const isActive = idx === activePhase;
              const isPrev = idx < activePhase;
              const isNext = idx > activePhase;
              const PhaseIcon = phase.icon;

              return (
                <div
                  key={phase.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out origin-bottom
                    ${isActive ? 'opacity-100 scale-100 translate-x-0 z-20' : ''}
                    ${isPrev ? 'opacity-0 scale-95 -translate-x-12 z-10 pointer-events-none' : ''}
                    ${isNext ? 'opacity-0 scale-95 translate-x-12 z-10 pointer-events-none' : ''}
                  `}
                >
                  <div className={`rounded-3xl overflow-hidden h-full flex flex-col md:flex-row ${
                    isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-xl border border-gray-100'
                  }`}>
                    {/* Left: Identity */}
                    <div className={`md:w-1/3 p-8 md:p-10 flex flex-col justify-between ${
                      isDark ? 'bg-white/5 border-b md:border-b-0 md:border-r border-white/10' : 'bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100'
                    }`}>
                      <div>
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${
                          isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                        }`}>
                          <PhaseIcon size={26} strokeWidth={2} />
                        </div>
                        <div className={`uppercase tracking-widest text-[10px] font-bold mb-2 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {texts.phase} {phase.id}
                        </div>
                        <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {phase.title}
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                          isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {phase.duration}
                        </div>
                      </div>
                      <p className={`text-base leading-relaxed mt-6 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {phase.description}
                      </p>
                    </div>

                    {/* Right: Features */}
                    <div className="md:w-2/3 p-8 md:p-10 overflow-y-auto">
                      <h4 className={`text-xs font-semibold uppercase tracking-wider mb-6 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {texts.keyDeliverables}
                      </h4>
                      <ul className="space-y-4">
                        {phase.features.map((feature, fIdx) => (
                          <motion.li
                            key={fIdx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                            transition={{ delay: isActive ? 0.2 + fIdx * 0.08 : 0, duration: 0.4 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                            <span className={`text-sm md:text-base font-medium leading-relaxed ${
                              isDark ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-2 md:-mx-4 z-50">
            <button
              onClick={handlePrev}
              disabled={activePhase === 0}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={activePhase === phases.length - 1}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        /* Overview View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase) => {
            const PhaseIcon = phase.icon;
            return (
              <div
                key={phase.id}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-white shadow-sm hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDark
                      ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                      : 'bg-gray-100 text-gray-700 group-hover:bg-gray-900 group-hover:text-white'
                  }`}>
                    <PhaseIcon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {texts.phase} {phase.id}
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {phase.duration}
                    </div>
                  </div>
                </div>

                <h4 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {phase.title}
                </h4>

                <div className="space-y-2">
                  {phase.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        isDark ? 'bg-white/30 group-hover:bg-emerald-400' : 'bg-gray-300 group-hover:bg-emerald-500'
                      }`} />
                      <span className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                  {phase.features.length > 4 && (
                    <div className={`text-xs italic pl-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      + {phase.features.length - 4} {texts.more}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// HIGHLIGHTS GRID - Media cards
// ============================================================================

const HighlightsGrid: React.FC<{
  items: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    media: string;
    type: 'image' | 'video';
  }>;
  isDark: boolean;
  onImageClick: (src: string) => void;
}> = ({ items, isDark, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.1 }}
          className={`group rounded-2xl overflow-hidden border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}
        >
          {/* Media - clickable container */}
          <div
            onClick={() => onImageClick(item.media)}
            className={`rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]`}
          >
            {item.type === 'video' ? (
              <video
                src={item.media}
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img loading="lazy"
                src={item.media}
                alt={item.title}
                className="w-full h-auto"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {item.subtitle}
            </div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h4>
            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// METRICS ROW
// ============================================================================

const MetricsRow: React.FC<{
  metrics: Array<{ value: string; label: string; sublabel: string }>;
  isDark: boolean;
}> = ({ metrics, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className={`text-5xl md:text-6xl font-bold tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {metric.value}
          </div>
          <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {metric.label}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {metric.sublabel}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ToolkitExecutive: React.FC<ToolkitExecutiveProps> = ({
  systemTheme,
  lang,
  onImageClick,
  onViewFull
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="min-h-[85vh] flex flex-col justify-center px-10 py-20">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Logo */}
          <FadeInSection>
            <img loading="lazy"
              src={isDark
                ? '/images/toolkit/Logo toolkit - dark bg - large - horizontal.svg'
                : '/images/toolkit/Logo toolkit - light bg - large - horizontal.svg'
              }
              alt="Toolkit"
              className="h-8 md:h-10 w-auto mb-8"
            />
          </FadeInSection>

          <FadeInSection delay={0.05}>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1 className={`mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.hero.title}
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className={`mt-6 text-xl md:text-2xl max-w-2xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.subtitle}
            </p>
          </FadeInSection>

          {/* Hero Image */}
          <FadeInSection delay={0.3} className="mt-12">
            <div
              onClick={() => onImageClick('/images/toolkit/toolkit_app_v3.webp')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/toolkit_app_v3.webp"
                alt="Toolkit App"
                className="w-full h-auto"
              />
            </div>
          </FadeInSection>

          {/* Scroll hint */}
          <FadeInSection delay={0.5} className="mt-12 flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex flex-col items-center gap-2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              <span className="text-sm">{t.hero.scrollHint}</span>
              <ChevronDown size={20} />
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROLE SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {t.role.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.role.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.role.subtitle}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <RoleDiagram items={t.role.items} isDark={isDark} />
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <p className={`mt-8 text-base leading-relaxed max-w-3xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.role.context}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SCOPE SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {t.scope.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.scope.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.scope.intro}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ScopeGrid areas={t.scope.areas} isDark={isDark} onImageClick={onImageClick} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* JOURNEY SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {t.journey.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.journey.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ProductEvolutionDiagram isDark={isDark} lang={lang} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* HIGHLIGHTS SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}>
              {t.highlights.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.highlights.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <HighlightsGrid
              items={t.highlights.items}
              isDark={isDark}
              onImageClick={onImageClick}
            />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUTCOME SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}>
              {t.outcome.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.outcome.title}
            </h2>
          </FadeInSection>

          <MetricsRow metrics={t.outcome.metrics} isDark={isDark} />
        </div>
      </section>

      {/* ================================================================== */}
      {/* TESTIMONIAL SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className={`text-4xl mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                "
              </div>
              <blockquote className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {t.testimonial.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <img loading="lazy"
                  src="/images/toolkit/photo_avatar_pierre-marie2x.webp"
                  alt={t.testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.testimonial.author}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <FadeInSection>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <a
              href="mailto:victor.soussan@gmail.com"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-full transition-colors"
            >
              {t.cta.button}
              <ArrowRight size={20} />
            </a>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default ToolkitExecutive;
