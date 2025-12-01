// Connect Case Study Page - Static content with instant loading
// Displays the SQOOL Connect project case study with portfolio styling

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';

interface ConnectPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenGallery?: () => void;
  lang?: 'en' | 'fr';
}

// Translations for Connect Case Study
const CONNECT_TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    projectGallery: 'Project Gallery',
    contactVictor: 'Contact Victor for a similar project',
    clickToZoom: 'Click to zoom',
    clickToExitZoom: 'Click to exit zoom',
    meta: {
      type: 'Product Design',
      scope: 'Dashboard, Android UI',
      period: '2020-2021',
      company: 'UNOWHY',
    },
    nav: {
      top: 'Top',
      intro: 'Intro',
      overview: 'Overview',
      dashboard: 'Dashboard',
      bulle: 'La Bulle',
    },
    hero: {
      role: 'Product Design Lead',
      scope: 'UX Strategy, UI Design, Prototyping',
      period: '2020-2021',
      title: 'A web-based dashboard concept and persistent interaction prototype for classroom orchestration',
      subtitle: 'Replacing a legacy Android launcher with modern, modular interfaces',
      description: 'By 2020, UNOWHY\'s Android launcher was increasingly difficult to maintain and evolve. The launcher acted as the main interface for students to access content, but it had become outdated and unsustainable on new Android systems. We envisioned Connect as a modern, web-based dashboard to replace the launcher for teachers and students, offering modular access to apps, session tools, and notifications. In parallel, we conceptualized "The Bubble", a persistent contextual UI prototype that would float above Android UI, offering quick and smart interactions.',
    },
    overview: {
      title: 'Overview',
      introTitle: 'Introduction',
      introDesc: 'Between 2020 and 2021, the French EdTech company UNOWHY faced a turning point. Its long-standing Android-based launcher had reached technical and conceptual obsolescence. Originally built for primary and middle schools, the launcher offered limited flexibility and a user experience that no longer reflected modern pedagogical practices, especially for high schools entering France\'s ambitious Plan Lycée Numérique. At that critical juncture, I led the design of a proof-of-concept platform we called Connect: an integrated web-based dashboard interface that brought together classroom control, onboarding, app access, and persistent UI experimentation. Its goal wasn\'t to be shipped as-is, but rather to crystallize a vision for the future of educational interfaces at UNOWHY and provide a tangible experimentation platform.',
      roleTitle: 'Role and scope',
      roleDesc: 'Product Design Lead (UX strategy, UI design, prototyping, interaction design). Initiator and co-author of the project vision and interaction model. Designer and presenter of motion prototypes, interaction flows and specs. Contributor to the PRD and onboarding flows. Designed all core UI systems: app grid, quick actions, notifications, modals. Collaborated daily with our React developer to shape the prototype dashboard.',
      goalsTitle: 'Goals',
      goals: [
        'Replace the obsolete Android launcher with a web-first, modular alternative',
        'Centralize classroom pilotage features in one interface',
        'Offer application store, onboarding, notifications, and search',
        'Provide a simple, extensible UI system that could scale to future tools',
        'Experiment with new interaction paradigms (e.g., persistent modules like "la Bulle")',
      ],
    },
    dashboard: {
      title: 'The Dashboard: A New Starting Point',
      intro: 'The core of Connect was a modular dashboard interface. Inspired by desktop operating systems, it enabled teachers to access quick actions (e.g., lock screens, share files, open apps remotely), visualize class status (who\'s connected, device health, participation), browse and launch apps from a personalized catalog, and receive and manage notifications such as work submission or session events.',
      features: [
        'Access quick actions (lock screens, share files, open apps remotely)',
        'Visualize class status (connectivity, device health, participation)',
        'Browse and launch apps from personalized catalog',
        'Receive and manage notifications',
      ],
      homeDark: 'Dashboard home (dark mode)',
      homeDarkDesc: 'The main dashboard interface showing quick actions and class status overview with dark theme optimized for classroom projection.',
      homeLight: 'Dashboard home (light mode)',
      homeLightDesc: 'Light theme variant for different lighting conditions and user preferences.',
      applications: 'Applications dashboard',
      applicationsDesc: 'App catalog interface allowing teachers to browse, organize, and deploy applications to student devices.',
      prototype: 'Complete dashboard prototype',
      prototypeDesc: 'Full interaction walkthrough demonstrating the dashboard\'s modular capabilities and responsive behavior.',
      loadingAuth: 'Connection & authentication flow',
      loadingAuthDesc: 'User authentication study showing the login flow and app launching choreography.',
      techArch: 'Technical architecture',
      techArchDesc: 'System overview showing how the web-based dashboard integrates with the existing Android infrastructure.',
      specsImplem: 'Implementation specifications',
      specsImplDesc: 'Detailed specifications for developer handoff, including component structure and interaction states.',
      specsContent: 'Content specifications',
      specsContentDesc: 'Content strategy documentation for the dashboard interface elements.',
      appLoading: 'App loading choreography',
      appLoadingDesc: 'Animation specifications for smooth app launching transitions.',
    },
    bulle: {
      title: 'La Bulle - A Vision-Driven Experiment',
      intro: 'One of the boldest explorations was "la Bulle": a floating, persistent UI module inspired by gaming overlays or stylus menus (e.g., Samsung Galaxy Note\'s radial shortcuts). We imagined it as a visual presence on student tablets, a motion-rich bubble that opened a radial or vertical menu, and a context-aware assistant offering shortcuts, search, capture, and sharing capabilities.',
      features: [
        'Visual presence on student tablets',
        'Motion-rich bubble opening radial/vertical menu',
        'Context-aware assistant with shortcuts, search, capture, and sharing',
      ],
      wireframes: 'UI Wireframes concept',
      wireframesDesc: 'Early exploration of the bubble\'s interaction model, showing radial menu patterns and contextual actions.',
      uiFocus: 'UI Focus view',
      uiFocusDesc: 'Detailed view of the bubble\'s expanded state with all available quick actions.',
      icons: 'Icon system',
      iconsDesc: 'Custom icon set designed for the bubble\'s contextual menu, optimized for touch targets and quick recognition.',
      behaviour1: 'Behavior documentation (1)',
      behaviour1Desc: 'Specifications for the bubble\'s animation states and user interaction patterns.',
      behaviour2: 'Behavior documentation (2)',
      behaviour2Desc: 'Additional behavior specifications covering edge cases and system integration.',
      interactionDemo: 'Interaction demonstration',
      interactionDemoDesc: 'Motion prototype showing the bubble\'s opening animation and menu interactions.',
      bulleDemo: 'Bubble interactions',
      bulleDemoDesc: 'Full demonstration of the bubble\'s capabilities including shortcuts, search, and sharing features.',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Scope',
      period: 'Period',
      company: 'Company',
    },
    captions: {
      thumbnail: 'Connect overview',
      thumbnailDesc: 'An experimental interface meant to replace a legacy launcher.',
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    projectGallery: 'Galerie du projet',
    contactVictor: 'Contacter Victor pour un projet similaire',
    clickToZoom: 'Cliquer pour agrandir',
    clickToExitZoom: 'Cliquer pour fermer',
    meta: {
      type: 'Design Produit',
      scope: 'Dashboard, UI Android',
      period: '2020-2021',
      company: 'UNOWHY',
    },
    nav: {
      top: 'Haut',
      intro: 'Intro',
      overview: 'Vue d\'ensemble',
      dashboard: 'Dashboard',
      bulle: 'La Bulle',
    },
    hero: {
      role: 'Product Design Lead',
      scope: 'Stratégie UX, Design UI, Prototypage',
      period: '2020-2021',
      title: 'Un concept de dashboard web et prototype d\'interaction persistante pour l\'orchestration de classe',
      subtitle: 'Remplacer un launcher Android obsolète par des interfaces modernes et modulaires',
      description: 'En 2020, le launcher Android d\'UNOWHY était de plus en plus difficile à maintenir et faire évoluer. Le launcher servait d\'interface principale aux élèves pour accéder au contenu, mais il était devenu obsolète et insoutenable sur les nouveaux systèmes Android. Nous avons imaginé Connect comme un dashboard web moderne pour remplacer le launcher pour les enseignants et les élèves, offrant un accès modulaire aux applications, aux outils de session et aux notifications. En parallèle, nous avons conceptualisé "La Bulle", un prototype d\'UI contextuelle persistante flottant au-dessus de l\'UI Android, offrant des interactions rapides et intelligentes.',
    },
    overview: {
      title: 'Vue d\'ensemble',
      introTitle: 'Introduction',
      introDesc: 'Entre 2020 et 2021, l\'entreprise EdTech française UNOWHY faisait face à un tournant. Son launcher Android de longue date avait atteint l\'obsolescence technique et conceptuelle. Construit à l\'origine pour les écoles primaires et collèges, le launcher offrait une flexibilité limitée et une expérience utilisateur qui ne reflétait plus les pratiques pédagogiques modernes, notamment pour les lycées entrant dans l\'ambitieux Plan Lycée Numérique de la France. À ce moment critique, j\'ai dirigé la conception d\'une plateforme proof-of-concept que nous avons appelée Connect : une interface dashboard web intégrée réunissant le contrôle de classe, l\'onboarding, l\'accès aux applications et l\'expérimentation d\'UI persistante. Son objectif n\'était pas d\'être livrée telle quelle, mais plutôt de cristalliser une vision pour l\'avenir des interfaces éducatives chez UNOWHY et de fournir une plateforme d\'expérimentation tangible.',
      roleTitle: 'Rôle et périmètre',
      roleDesc: 'Product Design Lead (stratégie UX, design UI, prototypage, design d\'interaction). Initiateur et co-auteur de la vision projet et du modèle d\'interaction. Concepteur et présentateur de prototypes motion, flows d\'interaction et specs. Contributeur au PRD et aux flows d\'onboarding. Conception de tous les systèmes UI core : grille d\'apps, actions rapides, notifications, modales. Collaboration quotidienne avec notre développeur React pour façonner le prototype dashboard.',
      goalsTitle: 'Objectifs',
      goals: [
        'Remplacer le launcher Android obsolète par une alternative web-first et modulaire',
        'Centraliser les fonctionnalités de pilotage de classe dans une interface',
        'Offrir store d\'applications, onboarding, notifications et recherche',
        'Fournir un système UI simple et extensible pouvant évoluer vers de futurs outils',
        'Expérimenter de nouveaux paradigmes d\'interaction (ex: modules persistants comme "la Bulle")',
      ],
    },
    dashboard: {
      title: 'Le Dashboard : Un nouveau point de départ',
      intro: 'Le cœur de Connect était une interface dashboard modulaire. Inspirée des systèmes d\'exploitation desktop, elle permettait aux enseignants d\'accéder à des actions rapides (verrouiller les écrans, partager des fichiers, ouvrir des apps à distance), visualiser le statut de la classe (qui est connecté, santé des appareils, participation), parcourir et lancer des apps depuis un catalogue personnalisé, et recevoir et gérer des notifications comme les soumissions de travaux ou les événements de session.',
      features: [
        'Accéder aux actions rapides (verrouiller écrans, partager fichiers, ouvrir apps à distance)',
        'Visualiser le statut de la classe (connectivité, santé des appareils, participation)',
        'Parcourir et lancer des apps depuis le catalogue personnalisé',
        'Recevoir et gérer les notifications',
      ],
      homeDark: 'Dashboard accueil (mode sombre)',
      homeDarkDesc: 'Interface dashboard principale montrant les actions rapides et la vue d\'ensemble du statut de classe avec thème sombre optimisé pour la projection en classe.',
      homeLight: 'Dashboard accueil (mode clair)',
      homeLightDesc: 'Variante thème clair pour différentes conditions d\'éclairage et préférences utilisateur.',
      applications: 'Dashboard applications',
      applicationsDesc: 'Interface catalogue d\'apps permettant aux enseignants de parcourir, organiser et déployer des applications sur les appareils élèves.',
      prototype: 'Prototype dashboard complet',
      prototypeDesc: 'Walkthrough d\'interaction complet démontrant les capacités modulaires du dashboard et son comportement responsive.',
      loadingAuth: 'Flux connexion & authentification',
      loadingAuthDesc: 'Étude d\'authentification utilisateur montrant le flux de login et la chorégraphie de lancement d\'app.',
      techArch: 'Architecture technique',
      techArchDesc: 'Vue d\'ensemble système montrant comment le dashboard web s\'intègre avec l\'infrastructure Android existante.',
      specsImplem: 'Spécifications d\'implémentation',
      specsImplDesc: 'Spécifications détaillées pour le handoff développeur, incluant structure des composants et états d\'interaction.',
      specsContent: 'Spécifications de contenu',
      specsContentDesc: 'Documentation stratégie de contenu pour les éléments d\'interface du dashboard.',
      appLoading: 'Chorégraphie de chargement d\'app',
      appLoadingDesc: 'Spécifications d\'animation pour des transitions de lancement d\'app fluides.',
    },
    bulle: {
      title: 'La Bulle - Une expérimentation guidée par la vision',
      intro: 'L\'une des explorations les plus audacieuses était "la Bulle" : un module UI flottant et persistant inspiré des overlays gaming ou des menus stylus (ex: raccourcis radiaux du Samsung Galaxy Note). Nous l\'imaginions comme une présence visuelle sur les tablettes élèves, une bulle riche en motion ouvrant un menu radial ou vertical, et un assistant contextuel offrant raccourcis, recherche, capture et partage.',
      features: [
        'Présence visuelle sur les tablettes élèves',
        'Bulle riche en motion ouvrant un menu radial/vertical',
        'Assistant contextuel avec raccourcis, recherche, capture et partage',
      ],
      wireframes: 'Concept wireframes UI',
      wireframesDesc: 'Exploration initiale du modèle d\'interaction de la bulle, montrant les patterns de menu radial et actions contextuelles.',
      uiFocus: 'Vue UI Focus',
      uiFocusDesc: 'Vue détaillée de l\'état étendu de la bulle avec toutes les actions rapides disponibles.',
      icons: 'Système d\'icônes',
      iconsDesc: 'Set d\'icônes personnalisé conçu pour le menu contextuel de la bulle, optimisé pour les zones de touch et la reconnaissance rapide.',
      behaviour1: 'Documentation comportement (1)',
      behaviour1Desc: 'Spécifications pour les états d\'animation de la bulle et les patterns d\'interaction utilisateur.',
      behaviour2: 'Documentation comportement (2)',
      behaviour2Desc: 'Spécifications comportement additionnelles couvrant les cas limites et l\'intégration système.',
      interactionDemo: 'Démonstration d\'interaction',
      interactionDemoDesc: 'Prototype motion montrant l\'animation d\'ouverture de la bulle et les interactions menu.',
      bulleDemo: 'Interactions de la bulle',
      bulleDemoDesc: 'Démonstration complète des capacités de la bulle incluant raccourcis, recherche et fonctionnalités de partage.',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Périmètre',
      period: 'Période',
      company: 'Entreprise',
    },
    captions: {
      thumbnail: 'Vue d\'ensemble Connect',
      thumbnailDesc: 'Une interface expérimentale destinée à remplacer un launcher obsolète.',
    },
  },
};

// Navigation sections configuration
const sections = [
  { id: 'top', label: 'Top', shortLabel: '' },
  { id: 'hero', label: 'Intro', shortLabel: '' },
  { id: 'overview', label: 'Overview', shortLabel: 'OV' },
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'DB' },
  { id: 'bulle', label: 'La Bulle', shortLabel: 'LB' },
];

// All images for lightbox navigation
const allImages = [
  '/images/connect/thumbnail_connect-scaled.webp',
  '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp',
  '/images/connect/connect_dashboard_home_light_full-scaled.webp',
  '/images/connect/connect_dashboard_applications_full-scaled.webp',
  '/videos/connect/connect-loading-user-authent-app-launch-study.mp4',
  '/videos/connect/connect-dashboard-prototype_complet_4k.mp4',
  '/images/connect/connect_tech_architecture-1-scaled.webp',
  '/images/connect/connect_specifications_implem_01-scaled.webp',
  '/images/connect/connect_specifications_content_02-scaled.webp',
  '/videos/connect/connect-specs-app-loading-choregraphy.mp4',
  '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp',
  '/images/connect/connect_bulle_ui_focus-scaled.webp',
  '/images/connect/connect_bulle_icons-1-scaled.webp',
  '/images/connect/connect_bulle_behaviour_square_01-scaled.webp',
  '/images/connect/connect_bulle_behaviour_square_02-scaled.webp',
  '/videos/connect/interaction-bulle-connect.mp4',
  '/videos/connect/Video-demo-bulle-interactions-02.mp4',
];

// Swipe variants for lightbox
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export const ConnectPage: React.FC<ConnectPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme,
  onOpenGallery,
  lang = 'en'
}) => {
  const t = CONNECT_TRANSLATIONS[lang];
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position to show/hide mini-nav
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowNav(container.scrollTop > heroBottom - 100);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section with proper offset for header + sticky mini-nav
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      const headerOffset = 73 + 56 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      containerRef.current.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Lightbox functions
  const openLightbox = (src: string) => {
    const index = allImages.indexOf(src);
    if (index !== -1) {
      setLightboxIndex(index);
      setPage([index, 0]);
      setLightboxOpen(true);
      setLightboxZoomed(false);
    }
  };

  const paginate = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setLightboxIndex(newIndex);
      setPage([newIndex, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, paginate]);

  // Handle drag end for swipe navigation
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      if (lightboxIndex < allImages.length - 1) paginate(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      if (lightboxIndex > 0) paginate(-1);
    }
  };

  // Check if current lightbox item is video
  const isVideo = (src: string) => src.endsWith('.mp4');

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      {/* Sticky Mini-Nav - All screen sizes */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[73px] left-0 right-0 z-30 border-b ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10'
                : 'bg-white/95 backdrop-blur-xl border-gray-200'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full py-4 flex items-center justify-between"
              >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-blue-600`} />
                <span
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {sections.find(s => s.id === activeSection)?.label || 'Top'}
                </span>
              </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isMobileNavExpanded ? 'rotate-180' : ''} ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
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
                  <div className={`pb-3 space-y-1 border-t ${
                    systemTheme === 'dark' ? 'border-white/5' : 'border-gray-100'
                  }`}>
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
                              ? systemTheme === 'dark'
                                ? 'bg-blue-600/10 text-blue-400'
                                : 'bg-blue-50 text-blue-600'
                              : systemTheme === 'dark'
                                ? 'text-gray-400 hover:bg-white/5'
                                : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive
                                ? 'bg-blue-600'
                                : isPast
                                  ? systemTheme === 'dark'
                                    ? 'bg-gray-500'
                                    : 'bg-gray-400'
                                  : systemTheme === 'dark'
                                    ? 'bg-gray-700'
                                    : 'bg-gray-300'
                            }`}
                          />
                          <span className="text-sm font-medium">{section.label}</span>
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

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          systemTheme === 'dark'
            ? 'bg-[#0a0a0a]/80 border-white/10'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Left - Title */}
          <div className="flex-1">
            <h1
              className={`text-lg md:text-xl font-bold ${
                systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              SQOOL Connect
            </h1>
          </div>

          {/* Center - Toggle Switch */}
          {onOpenGallery && (
            <div className="flex-1 flex justify-center">
              <div
                className={`inline-flex rounded-full p-1 ${
                  systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                }`}
              >
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    systemTheme === 'dark'
                      ? 'bg-white text-gray-900'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  {t.caseStudy}
                </button>
                <button
                  onClick={onOpenGallery}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    systemTheme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {t.projectGallery}
                </button>
              </div>
            </div>
          )}

          {/* Right - Close button only */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            onClick={() => !lightboxZoomed && setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {lightboxIndex < allImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image/Video with swipe */}
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag={!lightboxZoomed ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-[90vw] max-h-[85vh] ${lightboxZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            >
              {isVideo(allImages[lightboxIndex]) ? (
                <video
                  src={allImages[lightboxIndex]}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={allImages[lightboxIndex]}
                  alt=""
                  onClick={() => setLightboxZoomed(!lightboxZoomed)}
                  className={`rounded-lg transition-transform duration-300 ${
                    lightboxZoomed
                      ? 'max-w-none max-h-none scale-150'
                      : 'max-w-full max-h-[85vh] object-contain'
                  }`}
                  draggable={false}
                />
              )}
            </motion.div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg bg-black/50 max-w-[90vw] overflow-x-auto">
                {allImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx);
                      setPage([idx, idx > lightboxIndex ? 1 : -1]);
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                      idx === lightboxIndex ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    {isVideo(src) ? (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <ChevronRight size={16} className="text-white" />
                      </div>
                    ) : (
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-16 md:mb-24">
              <div className="md:col-span-3">
                {/* Meta tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.hero.role}
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    -
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.hero.scope}
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    -
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.hero.period}
                  </span>
                </div>

                {/* Main Title */}
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t.hero.title}
                </h1>

                {/* Subtitle */}
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {t.hero.subtitle}
                </h2>

                {/* Description */}
                <p
                  className={`text-base leading-relaxed mb-6 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t.hero.description}
                </p>
              </div>
            </section>

            {/* Hero Image */}
            <figure className="mb-16 md:mb-24">
              <div
                onClick={() => openLightbox('/images/connect/thumbnail_connect-scaled.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/connect/thumbnail_connect-scaled.webp"
                  alt="SQOOL Connect Overview"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.thumbnail}</strong> - {t.captions.thumbnailDesc}
              </figcaption>
            </figure>

            {/* Overview Section */}
            <section id="overview" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.overview.title}
              </h1>
              <hr
                className={`mb-8 ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              />

              <div className="grid md:grid-cols-3 gap-8">
                {/* Introduction */}
                <div className="md:col-span-2">
                  <h2
                    className={`text-lg font-bold mb-4 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.overview.introTitle}
                  </h2>
                  <p
                    className={`text-sm leading-relaxed ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {t.overview.introDesc}
                  </p>
                </div>

                {/* Goals */}
                <div>
                  <h2
                    className={`text-lg font-bold mb-4 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.overview.goalsTitle}
                  </h2>
                  <ul
                    className={`text-sm leading-relaxed space-y-2 ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {t.overview.goals.map((goal, idx) => (
                      <li key={idx}>- {goal}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role Section */}
              <div className="mt-8">
                <h2
                  className={`text-lg font-bold mb-4 ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t.overview.roleTitle}
                </h2>
                <p
                  className={`text-sm leading-relaxed ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t.overview.roleDesc}
                </p>
              </div>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Dashboard Section */}
            <section id="dashboard" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.dashboard.title}
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.dashboard.intro}
              </p>

              {/* Dashboard Home Dark */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp"
                    alt={t.dashboard.homeDark}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.homeDark}</strong> - {t.dashboard.homeDarkDesc}
                </figcaption>
              </figure>

              {/* Dashboard Home Light & Applications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_dashboard_home_light_full-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_dashboard_home_light_full-scaled.webp"
                      alt={t.dashboard.homeLight}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.homeLight}</strong> - {t.dashboard.homeLightDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_dashboard_applications_full-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_dashboard_applications_full-scaled.webp"
                      alt={t.dashboard.applications}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.applications}</strong> - {t.dashboard.applicationsDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Loading & Auth Video */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-loading-user-authent-app-launch-study.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-loading-user-authent-app-launch-study.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.loadingAuth}</strong> - {t.dashboard.loadingAuthDesc}
                </figcaption>
              </figure>

              {/* Complete Dashboard Prototype Video */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-dashboard-prototype_complet_4k.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-dashboard-prototype_complet_4k.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.prototype}</strong> - {t.dashboard.prototypeDesc}
                </figcaption>
              </figure>

              {/* Tech Architecture */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/connect/connect_tech_architecture-1-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/connect/connect_tech_architecture-1-scaled.webp"
                    alt={t.dashboard.techArch}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.techArch}</strong> - {t.dashboard.techArchDesc}
                </figcaption>
              </figure>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_specifications_implem_01-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_specifications_implem_01-scaled.webp"
                      alt={t.dashboard.specsImplem}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.specsImplem}</strong> - {t.dashboard.specsImplDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_specifications_content_02-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_specifications_content_02-scaled.webp"
                      alt={t.dashboard.specsContent}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.specsContent}</strong> - {t.dashboard.specsContentDesc}
                  </figcaption>
                </figure>
              </div>

              {/* App Loading Choreography */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-specs-app-loading-choregraphy.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-specs-app-loading-choregraphy.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.appLoading}</strong> - {t.dashboard.appLoadingDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* La Bulle Section */}
            <section id="bulle" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.bulle.title}
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.bulle.intro}
              </p>

              {/* Bulle Wireframes */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp"
                    alt={t.bulle.wireframes}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.bulle.wireframes}</strong> - {t.bulle.wireframesDesc}
                </figcaption>
              </figure>

              {/* UI Focus & Icons */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_ui_focus-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_bulle_ui_focus-scaled.webp"
                      alt={t.bulle.uiFocus}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.uiFocus}</strong> - {t.bulle.uiFocusDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_icons-1-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_bulle_icons-1-scaled.webp"
                      alt={t.bulle.icons}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.icons}</strong> - {t.bulle.iconsDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Behaviour documentation */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_behaviour_square_01-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_bulle_behaviour_square_01-scaled.webp"
                      alt={t.bulle.behaviour1}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.behaviour1}</strong> - {t.bulle.behaviour1Desc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_behaviour_square_02-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/connect/connect_bulle_behaviour_square_02-scaled.webp"
                      alt={t.bulle.behaviour2}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.behaviour2}</strong> - {t.bulle.behaviour2Desc}
                  </figcaption>
                </figure>
              </div>

              {/* Interaction Demo Video */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/videos/connect/interaction-bulle-connect.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/interaction-bulle-connect.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.bulle.interactionDemo}</strong> - {t.bulle.interactionDemoDesc}
                </figcaption>
              </figure>

              {/* Bulle Demo Video */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/videos/connect/Video-demo-bulle-interactions-02.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/Video-demo-bulle-interactions-02.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.bulle.bulleDemo}</strong> - {t.bulle.bulleDemoDesc}
                </figcaption>
              </figure>
            </section>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectPage;
