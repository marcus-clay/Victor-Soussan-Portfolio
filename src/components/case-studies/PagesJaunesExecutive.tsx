/**
 * PagesJaunesExecutive - "En bref" / "At a glance" version of PagesJaunes case study
 *
 * Complete scope of work:
 * - UX Lead for Core Flows & System Strategy
 * - Conversational homepage redesign
 * - iOS & Android onboarding
 * - Map & pedestrian navigation experience
 * - Design system strategy ("Yellowstrap")
 *
 * Design: Apple Keynote-style with progressive disclosure
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CaretDown as ChevronDown,
  Stack as Layers,
  Layout,
  Users,
  Briefcase,
  Target,
  ArrowRight,
  CheckCircle as CheckCircle2,
  DeviceMobile as Smartphone,
  MapTrifold as Map,
  MagnifyingGlass as Search,
  Heart,
  NavigationArrow as Navigation
} from '@phosphor-icons/react';

// TOC Sections for navigation
const getSections = (_lang: 'en' | 'fr') => [
  { id: 'top', label: 'Top', labelFr: 'Haut' },
  { id: 'context', label: 'Context', labelFr: 'Contexte' },
  { id: 'role', label: 'My Role', labelFr: 'Mon Rôle' },
  { id: 'journey', label: 'Journey', labelFr: 'Parcours' },
  { id: 'scope', label: 'Scope', labelFr: 'Périmètre' },
  { id: 'insights', label: 'Insights', labelFr: 'Insights' },
  { id: 'outcome', label: 'Outcome', labelFr: 'Résultat' },
];

interface PagesJaunesExecutiveProps {
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
      eyebrow: 'Product Designer → UI Lead • 2014-2016',
      title: 'Redesigning\nPagesJaunes apps',
      subtitle: 'Two years modernizing France\'s most downloaded utility app. Homepage, onboarding, maps, and the groundwork for a design system.',
      scrollHint: 'Scroll to explore'
    },
    context: {
      eyebrow: 'Context',
      title: 'Legacy product,\nmassive scale',
      description: 'In 2014, PagesJaunes served 15M+ monthly visitors but felt stuck in web directory logic. The mobile apps existed, had millions of downloads, but the experience was heavy. Navigation felt dated. The challenge: make it faster, cleaner, more useful, without breaking what worked for existing users.'
    },
    role: {
      eyebrow: 'My Role',
      title: 'From designer\nto team lead',
      subtitle: 'Product Designer in 2014, then UI Team Lead managing 4 designers',
      items: [
        { icon: 'briefcase', label: 'UI Team Lead', detail: '4 designers, 2015-2016' },
        { icon: 'target', label: 'Homepage redesign', detail: 'New search experience' },
        { icon: 'smartphone', label: 'iOS & Android', detail: 'First launch onboarding' },
        { icon: 'map', label: 'Maps & directions', detail: 'Pedestrian routes' },
        { icon: 'layers', label: 'System audit', detail: 'Yellowstrap roadmap' }
      ],
      context: 'I joined as Product Designer working on web, partnerships (TheFork, Renault R-Link), and login flows. In 2015, I became UI Team Lead: coordinating 4 designers, owning the mobile app redesign, and running weekly syncs with iOS/Android devs.'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: 'What I\nactually shipped',
      intro: 'Concrete deliverables across iOS, Android, web, and Android Wear.',
      areas: [
        {
          id: 'homepage',
          title: 'Homepage Redesign',
          description: 'A conversational greeting reframes search from directory lookup to problem-solving. Users act faster when the interface feels personal.',
          image: '/images/pagesjaunes/pagesjaunes homepage.webp'
        },
        {
          id: 'onboarding',
          title: 'First Launch Onboarding',
          description: 'Non-blocking animations at first launch. CAAnimation on iOS, Material transitions on Android. Tested in Paris UX lab.',
          image: '/images/pagesjaunes/pj 01@2x.webp'
        },
        {
          id: 'navigation',
          title: 'Walking Itinerary',
          description: 'Three modes: walk, drive, transit. The interface adapts to the user\'s choice. Built on Mappy API with handoff to external navigation apps.',
          image: '/images/pagesjaunes/pj 08@2x.webp'
        },
        {
          id: 'account',
          title: 'My PagesJaunes',
          description: 'History and Favorites turn one-time searches into retained value. Each saved business is a reason to return.',
          image: '/images/pagesjaunes/pj 06@2x.webp'
        },
        {
          id: 'wear',
          title: 'Android Wear',
          description: 'Wearable task flows: search then call, or search then navigate. Two jobs, two paths, minimal taps.',
          image: '/images/pagesjaunes/Android wear/pj android wear ui.webp'
        },
        {
          id: 'system',
          title: 'Design System Strategy',
          description: 'Component audit across iOS, Android, and web. Identifying inconsistencies, documenting patterns, building the roadmap for "Yellowstrap".',
          image: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp'
        }
      ]
    },
    journey: {
      eyebrow: '2-Year Timeline',
      title: 'Three distinct\nphases'
    },
    insights: {
      eyebrow: 'What I learned',
      title: 'Designing at\nthis scale',
      items: [
        {
          title: 'Don\'t break habits',
          description: '22M users have muscle memory. Radical changes confuse them. Small, clear improvements work better.'
        },
        {
          title: 'Utility apps need speed',
          description: 'People search for a plumber when they have a leak. Every millisecond counts. Especially on 3G.'
        },
        {
          title: 'Consistency is hard',
          description: 'iOS, Android, web, Wear: each platform has its own constraints. Shared patterns require constant negotiation.'
        },
        {
          title: 'Politics slow things down',
          description: 'Big company, many stakeholders. Sometimes the hardest part isn\'t design, it\'s alignment.'
        }
      ]
    },
    outcome: {
      eyebrow: 'Results',
      title: 'By the\nnumbers',
      metrics: [
        { value: '22M+', label: 'Downloads', sublabel: 'total app installs' },
        { value: '300K', label: 'Daily users', sublabel: 'at peak' },
        { value: '4', label: 'Designers', sublabel: 'managed as lead' }
      ]
    },
    cta: {
      title: 'Got a legacy\nproduct to modernize?',
      getInTouch: 'Get in touch'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Product Designer → UI Lead • 2014-2016',
      title: 'Refonte des apps\nPagesJaunes',
      subtitle: 'Deux ans à moderniser l\'app utilitaire la plus téléchargée de France. Homepage, onboarding, cartes, et les bases d\'un design system.',
      scrollHint: 'Défiler pour explorer'
    },
    context: {
      eyebrow: 'Contexte',
      title: 'Produit legacy,\néchelle massive',
      description: 'En 2014, PagesJaunes servait 15M+ de visiteurs mensuels mais restait ancré dans une logique d\'annuaire web. Les apps mobiles existaient, avaient des millions de téléchargements, mais l\'expérience était lourde. La navigation datée. Le défi : rendre tout ça plus rapide, plus clair, plus utile, sans casser ce qui marchait pour les utilisateurs existants.'
    },
    role: {
      eyebrow: 'Mon Rôle',
      title: 'De designer\nà team lead',
      subtitle: 'Product Designer en 2014, puis UI Team Lead avec 4 designers',
      items: [
        { icon: 'briefcase', label: 'UI Team Lead', detail: '4 designers, 2015-2016' },
        { icon: 'target', label: 'Refonte homepage', detail: 'Nouvelle recherche' },
        { icon: 'smartphone', label: 'iOS & Android', detail: 'Onboarding première ouverture' },
        { icon: 'map', label: 'Cartes & itinéraires', detail: 'Navigation piéton' },
        { icon: 'layers', label: 'Audit système', detail: 'Roadmap Yellowstrap' }
      ],
      context: 'J\'ai rejoint comme Product Designer sur le web, les partenariats (TheFork, Renault R-Link), et les flows de login. En 2015, je suis devenu UI Team Lead : coordination de 4 designers, ownership de la refonte mobile, et syncs hebdo avec les devs iOS/Android.'
    },
    scope: {
      eyebrow: 'Périmètre',
      title: 'Ce que j\'ai\nlivré concrètement',
      intro: 'Livrables concrets sur iOS, Android, web et Android Wear.',
      areas: [
        {
          id: 'homepage',
          title: 'Refonte Homepage',
          description: 'Une accroche conversationnelle transforme la recherche d\'annuaire en résolution de problème. Les utilisateurs agissent plus vite quand l\'interface est personnelle.',
          image: '/images/pagesjaunes/pagesjaunes homepage.webp'
        },
        {
          id: 'onboarding',
          title: 'Onboarding Première Ouverture',
          description: 'Animations non-bloquantes au premier lancement. CAAnimation sur iOS, transitions Material sur Android. Testé au labo UX Paris.',
          image: '/images/pagesjaunes/pj 01@2x.webp'
        },
        {
          id: 'navigation',
          title: 'Itinéraire Piéton',
          description: 'Trois modes : marche, voiture, transports. L\'interface s\'adapte au choix de l\'utilisateur. Basé sur l\'API Mappy avec handoff vers les apps de navigation.',
          image: '/images/pagesjaunes/pj 08@2x.webp'
        },
        {
          id: 'account',
          title: 'Mon PagesJaunes',
          description: 'Historique et Favoris transforment les recherches ponctuelles en valeur conservée. Chaque établissement sauvegardé est une raison de revenir.',
          image: '/images/pagesjaunes/pj 06@2x.webp'
        },
        {
          id: 'wear',
          title: 'Android Wear',
          description: 'Flows wearable : recherche puis appel, ou recherche puis navigation. Deux jobs, deux chemins, minimum de taps.',
          image: '/images/pagesjaunes/Android wear/pj android wear ui.webp'
        },
        {
          id: 'system',
          title: 'Stratégie Design System',
          description: 'Audit de composants sur iOS, Android et web. Identification des incohérences, documentation des patterns, construction de la roadmap "Yellowstrap".',
          image: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp'
        }
      ]
    },
    journey: {
      eyebrow: 'Timeline 2 ans',
      title: 'Trois phases\ndistinctes'
    },
    insights: {
      eyebrow: 'Ce que j\'ai appris',
      title: 'Designer à\ncette échelle',
      items: [
        {
          title: 'Ne pas casser les habitudes',
          description: '22M d\'utilisateurs ont une mémoire musculaire. Les changements radicaux les perdent. Des améliorations petites et claires marchent mieux.'
        },
        {
          title: 'L\'utilitaire exige la vitesse',
          description: 'Les gens cherchent un plombier quand ils ont une fuite. Chaque milliseconde compte. Surtout en 3G.'
        },
        {
          title: 'La cohérence, c\'est dur',
          description: 'iOS, Android, web, Wear : chaque plateforme a ses contraintes. Les patterns partagés demandent une négociation constante.'
        },
        {
          title: 'La politique ralentit',
          description: 'Grande boîte, beaucoup de stakeholders. Parfois le plus dur n\'est pas le design, c\'est l\'alignement.'
        }
      ]
    },
    outcome: {
      eyebrow: 'Résultats',
      title: 'En\nchiffres',
      metrics: [
        { value: '22M+', label: 'Téléchargements', sublabel: 'installations totales' },
        { value: '300K', label: 'Utilisateurs/jour', sublabel: 'au pic' },
        { value: '4', label: 'Designers', sublabel: 'managés comme lead' }
      ]
    },
    cta: {
      title: 'Un produit legacy\nà moderniser ?',
      getInTouch: 'Me contacter'
    }
  }
};

// ============================================================================
// PHASES DATA
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Web & Partnerships",
      duration: "2014",
      icon: Search,
      description: "Product Designer. Web, partnerships, login flows.",
      features: [
        "TheFork co-branded partnership integration",
        "Renault R-Link in-car app (testing at Renault HQ)",
        "Login & subscription flow redesign",
        "Homepage redesign for pagesjaunes.fr",
        "Photoshop-based design with structured file system",
        "Component naming conventions pre-Sketch era"
      ]
    },
    {
      id: 2,
      title: "Mobile & Team Lead",
      duration: "2015",
      icon: Heart,
      description: "UI Team Lead. 4 designers. Major app release.",
      features: [
        "Led team of 4 UI designers",
        "iOS & Android first launch onboarding",
        "Material Design migration plan for Android",
        "Android Wear app shipped on Google Play",
        "Walking itinerary feature (Mappy API)",
        "First component system audit (Yellowstrap)"
      ]
    },
    {
      id: 3,
      title: "Core Flows & System",
      duration: "2016",
      icon: Navigation,
      description: "Retention features. System foundations.",
      features: [
        "My PagesJaunes redesign (favorites, history)",
        "Photo & review contribution from business pages",
        "Account creation and management flows",
        "iPad split-view with Dynamic Type support",
        "Yellowstrap guidelines and roadmap delivery",
        "Executive showcase presentation"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Web & Partenariats",
      duration: "2014",
      icon: Search,
      description: "Product Designer. Web, partenariats, flows login.",
      features: [
        "Intégration partenariat co-brandé TheFork",
        "App Renault R-Link embarquée (tests au siège Renault)",
        "Refonte flows login & inscription",
        "Refonte homepage pagesjaunes.fr",
        "Design Photoshop avec système de fichiers structuré",
        "Conventions de nommage composants (pré-Sketch)"
      ]
    },
    {
      id: 2,
      title: "Mobile & Team Lead",
      duration: "2015",
      icon: Heart,
      description: "UI Team Lead. 4 designers. Release majeure app.",
      features: [
        "Management équipe de 4 designers UI",
        "Onboarding iOS & Android première ouverture",
        "Plan migration Material Design pour Android",
        "App Android Wear livrée sur Google Play",
        "Feature itinéraire piéton (API Mappy)",
        "Premier audit système composants (Yellowstrap)"
      ]
    },
    {
      id: 3,
      title: "Flows Core & Système",
      duration: "2016",
      icon: Navigation,
      description: "Features rétention. Fondations système.",
      features: [
        "Refonte Mon PagesJaunes (favoris, historique)",
        "Contribution photo & avis depuis fiches pro",
        "Flows création et gestion de compte",
        "iPad split-view avec Dynamic Type",
        "Livraison guidelines et roadmap Yellowstrap",
        "Présentation showcase executive"
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
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.35, delay: delay * 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROLE DIAGRAM
// ============================================================================

const RoleDiagram: React.FC<{
  items: Array<{ icon: string; label: string; detail: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  const iconMap: Record<string, React.ReactNode> = {
    briefcase: <Briefcase size={24} />,
    target: <Target size={24} />,
    smartphone: <Smartphone size={24} />,
    map: <Map size={24} />,
    layers: <Layers size={24} />,
    layout: <Layout size={24} />,
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
            isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
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
// SCOPE GRID
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
          <div className="aspect-[4/3] overflow-hidden">
            <img
              loading="lazy"
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>
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
// JOURNEY DIAGRAM
// ============================================================================

const JourneyDiagram: React.FC<{
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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'focus'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.focus}
          </button>
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out ${
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
                className={`h-2 rounded-full transition-[transform,box-shadow] duration-300 ease-out ${
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
                          isDark ? 'bg-yellow-500 text-black' : 'bg-yellow-400 text-black'
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
                            <CheckCircle2 size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
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
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-[background-color,color,transform] duration-200 ease-out hover:scale-105 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={activePhase === phases.length - 1}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-[background-color,color,transform] duration-200 ease-out hover:scale-105 disabled:opacity-0 disabled:pointer-events-none ${
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
                className={`group rounded-2xl p-6 transition-[background-color,color,transform] duration-200 ease-out hover:-translate-y-1 ${
                  isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-white shadow-sm hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDark
                      ? 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black'
                      : 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-400 group-hover:text-black'
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
                        isDark ? 'bg-white/30 group-hover:bg-yellow-400' : 'bg-gray-300 group-hover:bg-yellow-500'
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
// INSIGHTS GRID
// ============================================================================

const InsightsGrid: React.FC<{
  items: Array<{ title: string; description: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.1 }}
          className={`p-6 rounded-2xl ${
            isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}
        >
          <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.title}
          </h4>
          <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {item.description}
          </p>
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

const PagesJaunesExecutive: React.FC<PagesJaunesExecutiveProps> = ({
  systemTheme,
  lang,
  onImageClick,
  onViewFull: _onViewFull,
  onContact,
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const sections = getSections(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Show nav after scrolling past hero
      setShowNav(scrollTop > 400);

      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      })).filter(s => s.element);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section with proper offset
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      // Header height (64px) + sticky mini-nav height (~48px) + padding (24px)
      const headerOffset = 64 + 48 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} id="top" className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Sticky Mini-Nav - TOC Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-30 backdrop-blur-xl ${
              isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <div className="w-full px-6">
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full h-12 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'fr'
                      ? sections.find(s => s.id === activeSection)?.labelFr
                      : sections.find(s => s.id === activeSection)?.label}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isMobileNavExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                </motion.div>
              </button>

              {/* Expanded state - shows all sections */}
              <AnimatePresence>
                {isMobileNavExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className={`pb-3 space-y-1 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      {sections.map((section) => {
                        const isActive = activeSection === section.id;
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        const sectionIndex = sections.findIndex(s => s.id === section.id);
                        const isPast = sectionIndex < currentIndex;

                        return (
                          <button
                            key={section.id}
                            onClick={() => {
                              scrollToSection(section.id);
                              setIsMobileNavExpanded(false);
                            }}
                            className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 transition-colors ${
                              isActive
                                ? isDark
                                  ? 'bg-yellow-600/10 text-yellow-400'
                                  : 'bg-yellow-50 text-yellow-600'
                                : isDark
                                  ? 'text-gray-400 hover:bg-white/5'
                                  : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive
                                  ? 'bg-yellow-500'
                                  : isPast
                                    ? isDark ? 'bg-gray-500' : 'bg-gray-400'
                                    : isDark ? 'bg-gray-700' : 'bg-gray-300'
                              }`}
                            />
                            <span className="text-sm font-medium">
                              {lang === 'fr' ? section.labelFr : section.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="min-h-[85vh] flex flex-col justify-center px-10 py-20">
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Logo */}
          <FadeInSection>
            <div className={`flex items-center gap-3 mb-8`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-yellow-500' : 'bg-yellow-400'
              }`}>
                <span className="text-black font-bold text-xl">PJ</span>
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                PagesJaunes
              </span>
            </div>
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
              onClick={() => onImageClick('/images/pagesjaunes/pagesjaunes homepage.webp')}
              className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                loading="lazy"
                src="/images/pagesjaunes/pagesjaunes homepage.webp"
                alt="PagesJaunes Mobile Apps"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
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
      <section id="context" className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
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
      <section id="role" className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-yellow-400' : 'text-yellow-600'
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

          {/* Team - Two phases */}
          <FadeInSection delay={0.4}>
            <div className="mt-8 space-y-4">
              {/* Phase 1: 2014-2015 - UX Core Team */}
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                    2014–2015
                  </span>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'fr' ? 'Équipe UX centrale' : 'UX Core Team'}
                  </h3>
                  <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {lang === 'fr' ? 'Mon rôle : Product Designer' : 'My role: Product Designer'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Simon White', role: 'Director of UX', url: 'https://www.linkedin.com/in/fruey/' },
                    { name: 'Benjamin Dupont', role: 'Head of UX', url: 'https://www.linkedin.com/in/benjamin-dupont-141b7312/' },
                    { name: 'Karl Smits', role: 'Lead UX', url: 'https://www.linkedin.com/in/karlsmits/' },
                    { name: 'Qian Xu', role: 'UI Designer', url: 'https://www.linkedin.com/in/alixxu/' },
                  ].map((person, idx) => (
                    <a
                      key={idx}
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Phase 2: 2015-2016 - Feature Team */}
              <div className={`p-5 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    2015–2016
                  </span>
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Feature Team
                  </h3>
                  <span className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {lang === 'fr' ? 'Mon rôle : Product Designer → UI Team Lead' : 'My role: Product Designer → UI Team Lead'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Vedran Beric', role: 'UX/UI Designer', url: 'https://www.linkedin.com/in/vedran-beric-26002155/' },
                    { name: 'Frédéric Rodriguez', role: 'Product Manager', url: 'https://www.linkedin.com/in/frederic-rodriguez-71061255/' },
                    { name: 'Thibault Fighiera', role: 'Android Dev', url: 'https://www.linkedin.com/in/thibault-fighiera-65794731/' },
                    { name: 'Jérémie Godon', role: 'iOS Dev', url: 'https://www.linkedin.com/in/jgodon/' },
                  ].map((person, idx) => (
                    <a
                      key={idx}
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* JOURNEY SECTION */}
      {/* ================================================================== */}
      <section id="journey" className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {t.journey.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.journey.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <JourneyDiagram isDark={isDark} lang={lang} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SCOPE SECTION */}
      {/* ================================================================== */}
      <section id="scope" className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-purple-400' : 'text-purple-600'
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
      {/* INSIGHTS SECTION */}
      {/* ================================================================== */}
      <section id="insights" className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              {t.insights.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.insights.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <InsightsGrid items={t.insights.items} isDark={isDark} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUTCOME SECTION */}
      {/* ================================================================== */}
      <section id="outcome" className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-amber-400' : 'text-amber-600'
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
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-24 md:py-32 px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeInSection>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 whitespace-pre-line ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
            >
              {t.cta.getInTouch}
              <ArrowRight size={22} />
            </button>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default PagesJaunesExecutive;
