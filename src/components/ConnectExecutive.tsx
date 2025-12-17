/**
 * ConnectExecutive - "En bref" / "At a glance" version of Connect case study
 *
 * 3 Phases:
 * 1. Vision Deck & First Prototype (Connect + La Bulle)
 * 2. Design Sprint: Onboarding, Personalization, Classroom Control
 * 3. Design System & React Demonstrator
 *
 * Design: Apple Keynote-style with progressive disclosure (same as ToolkitExecutive)
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  Layout,
  Users,
  Briefcase,
  Target,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Zap,
  Trophy
} from 'lucide-react';

interface ConnectExecutiveProps {
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
      eyebrow: 'Product Design Lead • Vision Prototype • 2020-2021',
      title: 'Classroom orchestration\nreimagined',
      subtitle: 'A vision-casting prototype that catalyzed UNOWHY\'s product pivot',
      scrollHint: 'Scroll to explore'
    },
    context: {
      eyebrow: 'Context',
      title: 'Replacing an\nobsolete launcher',
      description: 'By 2020, UNOWHY\'s Android launcher was technically obsolete and visually outdated. The COVID-19 acceleration of digital usage made the need even more critical. Connect was the proof-of-concept for a modern, web-based dashboard — designed to centralize classroom control, app access, and notifications for 500,000+ students across France.'
    },
    role: {
      eyebrow: 'My Role',
      title: 'Vision to\nprototype',
      subtitle: 'From strategic vision to functional demonstrator',
      items: [
        { icon: 'briefcase', label: 'Product Design Lead', detail: 'UX strategy & UI design' },
        { icon: 'target', label: 'Vision initiator', detail: 'Co-authored the PRD' },
        { icon: 'layout', label: 'Prototype design', detail: 'Functional React demo' },
        { icon: 'layers', label: 'System design', detail: 'UI kit foundations' },
        { icon: 'users', label: 'Cross-team', detail: 'Dev & C-level alignment' }
      ],
      context: 'I initiated the Connect vision with the Head of Product, designed all interfaces, and worked directly with a React developer to build a functional prototype that convinced C-level executives of the strategic direction.'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: 'Two parallel\nexplorations',
      intro: 'Connect explored two complementary concepts for the future of classroom interfaces.',
      areas: [
        {
          id: 'dashboard-light',
          title: 'Dashboard (Light)',
          description: 'Modular web-based teacher dashboard with quick actions, app catalog, and notifications.',
          image: '/images/connect/connect_dashboard_home_light_full-scaled.webp'
        },
        {
          id: 'dashboard-dark',
          title: 'Dashboard (Dark)',
          description: 'Dark theme variant optimized for classroom projection and reduced eye strain.',
          image: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp'
        },
        {
          id: 'applications',
          title: 'App Catalog',
          description: 'Searchable, filtered access to educational apps with MDM policy integration.',
          image: '/images/connect/connect_dashboard_applications_full-scaled.webp'
        },
        {
          id: 'bulle-concept',
          title: 'La Bulle - Concept',
          description: 'Persistent floating UI for quick contextual actions, inspired by gaming overlays.',
          image: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp'
        },
        {
          id: 'bulle-ui',
          title: 'La Bulle - UI',
          description: 'Refined visual system with radial menu and contextual shortcuts.',
          image: '/images/connect/connect_bulle_ui_focus-scaled.webp'
        },
        {
          id: 'architecture',
          title: 'Technical Architecture',
          description: 'System overview showing web dashboard integration with existing Android infrastructure.',
          image: '/images/connect/connect_tech_architecture-1-scaled.webp'
        },
        {
          id: 'design-system',
          title: 'Design System',
          description: 'Component library and visual language foundation for the Connect ecosystem.',
          image: '/images/connect/connect_design_system.webp'
        }
      ]
    },
    highlights: {
      eyebrow: 'Key Interactions',
      title: 'Motion design\nas differentiator',
      items: [
        {
          id: 'sprint',
          title: 'Design Sprint Flow',
          subtitle: 'User journey walkthrough',
          description: 'Complete prototype flow from onboarding to classroom piloting, presented during design sprint sessions.',
          media: '/videos/connect/connect-design-sprint-compressed.mp4',
          type: 'video' as const
        },
        {
          id: 'prototype',
          title: 'Dashboard Prototype',
          subtitle: 'Full interaction flow',
          description: 'Complete walkthrough demonstrating the dashboard\'s modular capabilities and responsive behavior.',
          media: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4',
          type: 'video' as const
        },
        {
          id: 'bulle-demo',
          title: 'La Bulle Demo',
          subtitle: 'Contextual interactions',
          description: 'Full demonstration of the bubble\'s capabilities including shortcuts, search, and sharing.',
          media: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4',
          type: 'video' as const
        },
        {
          id: 'bulle-anim',
          title: 'Bubble Animation',
          subtitle: 'Opening interaction',
          description: 'Motion prototype showing the bubble\'s opening animation and menu transitions.',
          media: '/videos/connect/interaction-bulle-connect-compressed.mp4',
          type: 'video' as const
        }
      ]
    },
    userTesting: {
      eyebrow: 'User Testing',
      title: 'What teachers\ntold us',
      insights: [
        {
          quote: 'The interface is clear, not overloaded. Categories are well-labeled. You know what you\'re looking at.',
          author: 'Solveig T.',
          role: 'Teacher'
        },
        {
          quote: 'Widget customization is frequently requested by SQOOL clients. Great to let users arrange their interface.',
          author: 'Solveig T.',
          role: 'Teacher'
        },
        {
          quote: 'Intuitive, modern, better than what exists. The piloting feature is a real value-add for our solution.',
          author: 'Kevin C.',
          role: 'Teacher'
        }
      ],
      keyFindings: [
        'Onboarding: Users want to skip and discover on their own',
        'Quick Actions: Class piloting is the #1 priority feature',
        'Messages: Concerns about overlap with existing ENT messaging',
        'Customization: High demand for widget rearrangement',
        'Navigation: Need clearer "return to home" affordance'
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'A catalyst for\nstrategic change',
      metrics: [
        { value: 'Pivot', label: 'Strategic catalyst', sublabel: '→ SQOOL Apps Suite' },
        { value: 'React', label: 'Tech validated', sublabel: 'for the team' },
        { value: 'UI Kit', label: 'Design foundation', sublabel: 'for all future apps' }
      ]
    },
    testimonial: {
      quote: 'I had the pleasure of collaborating with Victor for nearly 2 years at UNOWHY. As Product Lead, he played a central role in defining the product vision. His expertise, leadership, and close collaboration with stakeholders were essential in designing solutions that met user needs and strategic challenges.',
      author: 'Justine Le Tellier',
      role: 'UX Researcher'
    },
    cta: {
      viewFull: 'View full case study',
      visitUnowhy: 'Visit UNOWHY'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Product Design Lead • Prototype de Vision • 2020-2021',
      title: 'L\'orchestration de classe\nréinventée',
      subtitle: 'Un prototype de vision qui a catalysé le pivot produit d\'UNOWHY',
      scrollHint: 'Défiler pour explorer'
    },
    context: {
      eyebrow: 'Contexte',
      title: 'Remplacer un\nlanceur obsolète',
      description: 'En 2020, le lanceur Android d\'UNOWHY était techniquement obsolète et visuellement dépassé. L\'accélération numérique COVID-19 rendait le besoin encore plus critique. Connect était le proof-of-concept pour un dashboard web moderne — conçu pour centraliser le contrôle de classe, l\'accès aux apps et les notifications pour plus de 500 000 élèves en France.'
    },
    role: {
      eyebrow: 'Mon Rôle',
      title: 'De la vision\nau prototype',
      subtitle: 'De la vision stratégique au démonstrateur fonctionnel',
      items: [
        { icon: 'briefcase', label: 'Product Design Lead', detail: 'Stratégie UX & design UI' },
        { icon: 'target', label: 'Initiateur de vision', detail: 'Co-auteur du PRD' },
        { icon: 'layout', label: 'Design prototype', detail: 'Démo React fonctionnelle' },
        { icon: 'layers', label: 'Design système', detail: 'Fondations UI kit' },
        { icon: 'users', label: 'Transversal', detail: 'Alignement dev & C-level' }
      ],
      context: 'J\'ai initié la vision Connect avec le Head of Product, designé toutes les interfaces, et travaillé directement avec un développeur React pour construire un prototype fonctionnel qui a convaincu les dirigeants de la direction stratégique.'
    },
    scope: {
      eyebrow: 'Périmètre',
      title: 'Deux explorations\nparallèles',
      intro: 'Connect a exploré deux concepts complémentaires pour l\'avenir des interfaces de classe.',
      areas: [
        {
          id: 'dashboard-light',
          title: 'Dashboard (Clair)',
          description: 'Dashboard web modulaire pour enseignants avec actions rapides, catalogue d\'apps et notifications.',
          image: '/images/connect/connect_dashboard_home_light_full-scaled.webp'
        },
        {
          id: 'dashboard-dark',
          title: 'Dashboard (Sombre)',
          description: 'Variante thème sombre optimisée pour la projection en classe et le confort visuel.',
          image: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp'
        },
        {
          id: 'applications',
          title: 'Catalogue d\'Apps',
          description: 'Accès recherchable et filtré aux apps éducatives avec intégration politique MDM.',
          image: '/images/connect/connect_dashboard_applications_full-scaled.webp'
        },
        {
          id: 'bulle-concept',
          title: 'La Bulle - Concept',
          description: 'UI flottante persistante pour actions contextuelles rapides, inspirée des overlays gaming.',
          image: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp'
        },
        {
          id: 'bulle-ui',
          title: 'La Bulle - UI',
          description: 'Système visuel affiné avec menu radial et raccourcis contextuels.',
          image: '/images/connect/connect_bulle_ui_focus-scaled.webp'
        },
        {
          id: 'architecture',
          title: 'Architecture Technique',
          description: 'Vue d\'ensemble système montrant l\'intégration du dashboard web avec l\'infrastructure Android existante.',
          image: '/images/connect/connect_tech_architecture-1-scaled.webp'
        },
        {
          id: 'design-system',
          title: 'Design System',
          description: 'Bibliothèque de composants et fondation du langage visuel pour l\'écosystème Connect.',
          image: '/images/connect/connect_design_system.webp'
        }
      ]
    },
    highlights: {
      eyebrow: 'Interactions Clés',
      title: 'Le motion design\ncomme différenciateur',
      items: [
        {
          id: 'sprint',
          title: 'Parcours Design Sprint',
          subtitle: 'Walkthrough user journey',
          description: 'Flux prototype complet de l\'onboarding au pilotage de classe, présenté lors des sessions de design sprint.',
          media: '/videos/connect/connect-design-sprint-compressed.mp4',
          type: 'video' as const
        },
        {
          id: 'prototype',
          title: 'Prototype Dashboard',
          subtitle: 'Flux d\'interaction complet',
          description: 'Walkthrough complet démontrant les capacités modulaires du dashboard et son comportement responsive.',
          media: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4',
          type: 'video' as const
        },
        {
          id: 'bulle-demo',
          title: 'Démo La Bulle',
          subtitle: 'Interactions contextuelles',
          description: 'Démonstration complète des capacités de la bulle incluant raccourcis, recherche et partage.',
          media: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4',
          type: 'video' as const
        },
        {
          id: 'bulle-anim',
          title: 'Animation Bulle',
          subtitle: 'Interaction d\'ouverture',
          description: 'Prototype motion montrant l\'animation d\'ouverture de la bulle et les transitions menu.',
          media: '/videos/connect/interaction-bulle-connect-compressed.mp4',
          type: 'video' as const
        }
      ]
    },
    userTesting: {
      eyebrow: 'Tests Utilisateurs',
      title: 'Ce que les enseignants\nnous ont dit',
      insights: [
        {
          quote: 'L\'interface est claire, pas surchargée. Les catégories sont bien nommées. On sait de quoi on parle.',
          author: 'Solveig T.',
          role: 'Enseignante'
        },
        {
          quote: 'La personnalisation des widgets est régulièrement demandée par les clients SQOOL. Bien de laisser le choix à l\'utilisateur d\'agencer son interface.',
          author: 'Solveig T.',
          role: 'Enseignante'
        },
        {
          quote: 'Intuitif, moderne, mieux que l\'existant. Le pilotage est une vraie plus-value de notre solution.',
          author: 'Kevin C.',
          role: 'Enseignant'
        }
      ],
      keyFindings: [
        'Onboarding : Les utilisateurs veulent skipper et découvrir seuls',
        'Actions rapides : Le pilotage de classe est la fonctionnalité #1',
        'Messages : Inquiétudes sur le chevauchement avec la messagerie ENT',
        'Personnalisation : Forte demande de réarrangement des widgets',
        'Navigation : Besoin d\'un retour à l\'accueil plus clair'
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Un catalyseur de\nchangement stratégique',
      metrics: [
        { value: 'Pivot', label: 'Catalyseur stratégique', sublabel: '→ SQOOL Apps Suite' },
        { value: 'React', label: 'Tech validée', sublabel: 'pour l\'équipe' },
        { value: 'UI Kit', label: 'Fondation design', sublabel: 'pour toutes les apps futures' }
      ]
    },
    testimonial: {
      quote: 'J\'ai eu le plaisir de collaborer avec Victor pendant près de 2 ans chez UNOWHY. En tant que Product Lead, il a joué un rôle central dans la définition de la vision produit. Son expertise, son leadership et sa collaboration étroite avec les parties prenantes ont été essentiels pour concevoir des solutions répondant aux besoins utilisateurs et aux enjeux stratégiques.',
      author: 'Justine Le Tellier',
      role: 'UX Researcher'
    },
    cta: {
      viewFull: 'Voir l\'étude complète',
      visitUnowhy: 'Visiter UNOWHY'
    }
  }
};

// ============================================================================
// PHASES DATA (same structure as Toolkit)
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Vision & First Prototype",
      duration: "Q4 2020",
      icon: Layers,
      description: "Securing C-level buy-in with a compelling vision.",
      features: [
        "Vision deck \"Nouvelle Expérience 2021\"",
        "Connect dashboard hi-fi prototype",
        "\"La Bulle\" persistent UI concept",
        "New visual language exploration",
        "PRD co-authored with Head of Product",
        "Executive presentation & validation"
      ]
    },
    {
      id: 2,
      title: "Design Sprint",
      duration: "Q1 2021",
      icon: Zap,
      description: "Validating concepts with real teachers.",
      features: [
        "Onboarding flow iteration",
        "Personalization & themes testing",
        "Classroom control integration",
        "User testing with 3 teachers",
        "Interaction prototype video",
        "Feedback synthesis & pivots"
      ]
    },
    {
      id: 3,
      title: "Design System & React Demo",
      duration: "Q2 2021",
      icon: Trophy,
      description: "Technical validation and foundations.",
      features: [
        "React Grid Layout implementation",
        "Modular component architecture",
        "Motion design specifications",
        "App loading choreography",
        "Internal demonstrator delivery",
        "Foundation for SQOOL Apps Suite"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Vision & Premier Prototype",
      duration: "Q4 2020",
      icon: Layers,
      description: "Obtenir le buy-in C-level avec une vision convaincante.",
      features: [
        "Deck de vision \"Nouvelle Expérience 2021\"",
        "Prototype hi-fi dashboard Connect",
        "Concept UI persistante \"La Bulle\"",
        "Exploration nouveau langage visuel",
        "PRD co-rédigé avec Head of Product",
        "Présentation & validation executive"
      ]
    },
    {
      id: 2,
      title: "Design Sprint",
      duration: "Q1 2021",
      icon: Zap,
      description: "Valider les concepts avec de vrais enseignants.",
      features: [
        "Itération flux d'onboarding",
        "Test personnalisation & thèmes",
        "Intégration pilotage de classe",
        "Tests utilisateurs avec 3 enseignants",
        "Vidéo prototype d'interaction",
        "Synthèse feedback & pivots"
      ]
    },
    {
      id: 3,
      title: "Design System & Démo React",
      duration: "Q2 2021",
      icon: Trophy,
      description: "Validation technique et fondations.",
      features: [
        "Implémentation React Grid Layout",
        "Architecture composants modulaire",
        "Spécifications motion design",
        "Chorégraphie chargement apps",
        "Livraison démonstrateur interne",
        "Fondation pour SQOOL Apps Suite"
      ]
    }
  ]
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
// ROLE DIAGRAM - Same as Toolkit
// ============================================================================

const RoleDiagram: React.FC<{
  items: Array<{ icon: string; label: string; detail: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  const iconMap: Record<string, React.ReactNode> = {
    briefcase: <Briefcase size={24} />,
    target: <Target size={24} />,
    layout: <Layout size={24} />,
    layers: <Layers size={24} />,
    users: <Users size={24} />
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
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
            isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'
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
// SCOPE GRID - Same as Toolkit
// ============================================================================

const ScopeGrid: React.FC<{
  areas: Array<{ id: string; title: string; description: string; image: string }>;
  isDark: boolean;
  onImageClick: (src: string) => void;
}> = ({ areas, isDark, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
          <div className="aspect-[4/3] overflow-hidden">
            <img loading="lazy"
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {area.title}
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {area.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// PRODUCT EVOLUTION DIAGRAM - Same as Toolkit
// ============================================================================

const ProductEvolutionDiagram: React.FC<{
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ isDark, lang }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const phases = PHASES_DATA[lang];

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
                        <h3 className={`text-2xl md:text-3xl font-bold leading-tight mb-2 ${
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
                      <p className={`text-sm leading-relaxed mt-6 ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
// HIGHLIGHTS GRID - Same as Toolkit
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
          <div
            onClick={() => onImageClick(item.media)}
            className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
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
          <div className="p-5">
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.subtitle}
            </div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// USER TESTING SECTION - Clean version
// ============================================================================

const UserTestingSection: React.FC<{
  insights: Array<{ quote: string; author: string; role: string }>;
  keyFindings: string[];
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ insights, keyFindings, isDark, lang }) => {
  return (
    <div className="mt-8 space-y-8">
      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
          >
            <div className={`text-2xl mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>"</div>
            <p className={`text-sm italic leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {insight.quote}
            </p>
            <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {insight.author}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {insight.role}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Key Findings */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'fr' ? 'Enseignements clés' : 'Key Findings'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {keyFindings.map((finding, idx) => (
            <div key={idx} className={`text-sm flex items-start ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} />
              {finding}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// METRICS ROW - Same as Toolkit
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

const ConnectExecutive: React.FC<ConnectExecutiveProps> = ({
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
                ? '/images/unowhy/Logo-Unowhy-DarkBg.svg'
                : '/images/unowhy/Logo-Unowhy-LightBg.svg'
              }
              alt="UNOWHY"
              className="h-6 w-auto mb-8"
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
              onClick={() => onImageClick('/images/connect/connect_overview.webp')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/connect/connect_overview.webp"
                alt="Connect Dashboard Overview"
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
      {/* CONTEXT SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.context.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.context.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className={`mt-6 text-lg leading-relaxed max-w-4xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.context.description}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROLE SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.role.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
      {/* JOURNEY SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {lang === 'fr' ? 'Parcours 12 Mois' : '12-Month Journey'}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {lang === 'fr' ? 'Trois phases\nvers la validation' : 'Three phases\nto validation'}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ProductEvolutionDiagram isDark={isDark} lang={lang} />
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
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.scope.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
      {/* HIGHLIGHTS SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.highlights.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
      {/* USER TESTING SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1280px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.userTesting.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.userTesting.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <UserTestingSection
              insights={t.userTesting.insights}
              keyFindings={t.userTesting.keyFindings}
              isDark={isDark}
              lang={lang}
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
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.outcome.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
              <div className={`text-4xl mb-6 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                "
              </div>
              <blockquote className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {t.testimonial.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <img loading="lazy"
                  src="/images/justine-le-tellier.webp"
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
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { onViewFull(); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                {t.cta.viewFull}
                <ArrowRight size={20} />
              </button>
              <a
                href="https://www.unowhy.com/#equipements"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.cta.visitUnowhy}
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default ConnectExecutive;
