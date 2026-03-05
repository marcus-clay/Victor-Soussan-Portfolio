// Connect Case Study Page - Static content with instant loading
// Displays the SQOOL Connect project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { smoothScrollTo } from './src/utils/smoothScroll';
import {
  X,
  Play
} from 'lucide-react';
import { GalleryItem, getConnectGalleryItems } from './BentoGallery';
import ConnectExecutive from './src/components/ConnectExecutive';
import StackedCaseStudies from './src/components/StackedCaseStudies';
import EnhancedLightbox from './src/components/EnhancedLightbox';
import CaseStudyTOCSidebar from './src/components/CaseStudyTOCSidebar';

interface ConnectPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

// Translations for Connect Case Study
const CONNECT_TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    projectGallery: 'Project Gallery',
    gallery: 'Gallery',
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
      thumbnailDesc: 'Web-based dashboard concept for classroom orchestration.',
      homeDark: 'Dashboard home (dark mode)',
      homeDarkDesc: 'Main dashboard interface with quick actions and class status.',
      homeLight: 'Dashboard home (light mode)',
      homeLightDesc: 'Light theme variant for different lighting conditions.',
      applications: 'Applications dashboard',
      applicationsDesc: 'App catalog for browsing and deploying applications.',
      loadingAuth: 'Connection & auth flow',
      loadingAuthDesc: 'User authentication and app launching choreography.',
      prototype: 'Dashboard prototype',
      prototypeDesc: 'Full interaction walkthrough demonstrating modular capabilities.',
      techArch: 'Technical architecture',
      techArchDesc: 'System overview showing web dashboard integration.',
      specsImplem: 'Implementation specs',
      specsImplDesc: 'Detailed specifications for developer handoff.',
      specsContent: 'Content specifications',
      specsContentDesc: 'Content strategy documentation for interface elements.',
      appLoading: 'App loading choreography',
      appLoadingDesc: 'Animation specifications for smooth transitions.',
      wireframes: 'La Bulle - Wireframes',
      wireframesDesc: 'Early exploration of the bubble interaction model.',
      uiFocus: 'La Bulle - UI Focus',
      uiFocusDesc: 'Detailed view of the bubble expanded state.',
      icons: 'La Bulle - Icons',
      iconsDesc: 'Custom icon set for the contextual menu.',
      behaviour1: 'La Bulle - Behavior (1)',
      behaviour1Desc: 'Animation states and interaction patterns.',
      behaviour2: 'La Bulle - Behavior (2)',
      behaviour2Desc: 'Edge cases and system integration specs.',
      interactionDemo: 'La Bulle - Interaction demo',
      interactionDemoDesc: 'Motion prototype of bubble opening animation.',
      bulleDemo: 'La Bulle - Full demo',
      bulleDemoDesc: 'Complete demonstration of bubble capabilities.',
      designSprint: 'Design Sprint Flow',
      designSprintDesc: 'User journey walkthrough from onboarding to classroom piloting.',
      designSystem: 'Design System',
      designSystemDesc: 'Component library and visual language foundation.',
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    projectGallery: 'Galerie du projet',
    gallery: 'Galerie',
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
      thumbnailDesc: 'Concept de dashboard web pour l\'orchestration de classe.',
      homeDark: 'Dashboard accueil (mode sombre)',
      homeDarkDesc: 'Interface dashboard principale avec actions rapides et statut de classe.',
      homeLight: 'Dashboard accueil (mode clair)',
      homeLightDesc: 'Variante thème clair pour différentes conditions d\'éclairage.',
      applications: 'Dashboard applications',
      applicationsDesc: 'Catalogue d\'apps pour parcourir et déployer des applications.',
      loadingAuth: 'Flux connexion & auth',
      loadingAuthDesc: 'Authentification utilisateur et chorégraphie de lancement d\'app.',
      prototype: 'Prototype dashboard',
      prototypeDesc: 'Walkthrough d\'interaction complet démontrant les capacités modulaires.',
      techArch: 'Architecture technique',
      techArchDesc: 'Vue d\'ensemble système montrant l\'intégration du dashboard web.',
      specsImplem: 'Specs d\'implémentation',
      specsImplDesc: 'Spécifications détaillées pour le handoff développeur.',
      specsContent: 'Spécifications de contenu',
      specsContentDesc: 'Documentation stratégie de contenu pour les éléments d\'interface.',
      appLoading: 'Chorégraphie de chargement d\'app',
      appLoadingDesc: 'Spécifications d\'animation pour des transitions fluides.',
      wireframes: 'La Bulle - Wireframes',
      wireframesDesc: 'Exploration initiale du modèle d\'interaction de la bulle.',
      uiFocus: 'La Bulle - Focus UI',
      uiFocusDesc: 'Vue détaillée de l\'état étendu de la bulle.',
      icons: 'La Bulle - Icônes',
      iconsDesc: 'Set d\'icônes personnalisé pour le menu contextuel.',
      behaviour1: 'La Bulle - Comportement (1)',
      behaviour1Desc: 'États d\'animation et patterns d\'interaction.',
      behaviour2: 'La Bulle - Comportement (2)',
      behaviour2Desc: 'Cas limites et spécifications d\'intégration système.',
      interactionDemo: 'La Bulle - Démo d\'interaction',
      interactionDemoDesc: 'Prototype motion de l\'animation d\'ouverture de la bulle.',
      bulleDemo: 'La Bulle - Démo complète',
      bulleDemoDesc: 'Démonstration complète des capacités de la bulle.',
      designSprint: 'Design Sprint Flow',
      designSprintDesc: 'Parcours utilisateur de l\'onboarding au pilotage de classe.',
      designSystem: 'Design System',
      designSystemDesc: 'Bibliothèque de composants et fondation du langage visuel.',
    },
  },
};

// TOC Sections for Full case study
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Overview' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'bulle', label: 'La Bulle' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Aperçu' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'bulle', label: 'La Bulle' },
  ]
};

// All images for lightbox navigation with caption keys
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/connect/connect_overview.webp', captionKey: 'thumbnail', type: 'image' },
  { src: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp', captionKey: 'homeDark', type: 'image' },
  { src: '/images/connect/connect_dashboard_home_light_full-scaled.webp', captionKey: 'homeLight', type: 'image' },
  { src: '/images/connect/connect_dashboard_applications_full-scaled.webp', captionKey: 'applications', type: 'image' },
  { src: '/videos/connect/connect-loading-user-authent-app-launch-study.mp4', captionKey: 'loadingAuth', type: 'video' },
  { src: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4', captionKey: 'prototype', type: 'video' },
  { src: '/videos/connect/connect-design-sprint-compressed.mp4', captionKey: 'designSprint', type: 'video' },
  { src: '/images/connect/connect_tech_architecture-1-scaled.webp', captionKey: 'techArch', type: 'image' },
  { src: '/images/connect/connect_specifications_implem_01-scaled.webp', captionKey: 'specsImplem', type: 'image' },
  { src: '/images/connect/connect_specifications_content_02-scaled.webp', captionKey: 'specsContent', type: 'image' },
  { src: '/videos/connect/connect-specs-app-loading-choregraphy.mp4', captionKey: 'appLoading', type: 'video' },
  { src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp', captionKey: 'wireframes', type: 'image' },
  { src: '/images/connect/connect_bulle_ui_focus-scaled.webp', captionKey: 'uiFocus', type: 'image' },
  { src: '/images/connect/connect_bulle_icons-1-scaled.webp', captionKey: 'icons', type: 'image' },
  { src: '/images/connect/connect_bulle_behaviour_square_01-scaled.webp', captionKey: 'behaviour1', type: 'image' },
  { src: '/images/connect/connect_bulle_behaviour_square_02-scaled.webp', captionKey: 'behaviour2', type: 'image' },
  { src: '/videos/connect/interaction-bulle-connect-compressed.mp4', captionKey: 'interactionDemo', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4', captionKey: 'bulleDemo', type: 'video' },
  { src: '/images/connect/connect_design_system.webp', captionKey: 'designSystem', type: 'image' },
];

// Gallery Card component with Apple TV-style 3D tilt effect
interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|mov)$/i);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="group cursor-pointer break-inside-avoid mb-8 md:mb-10"
      onClick={onClick}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
      >
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15) 0%, transparent 50%)` }}
        />
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.2)' }}
        />
        {isVideo ? (
          <div className="relative">
            <video src={item.src} className="w-full h-auto block" muted playsInline preload="metadata" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110 bg-white/20">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block" />
        )}
      </motion.div>
      <figcaption className="mt-4 text-sm text-gray-400">
        <strong className="text-gray-200">{item.caption}</strong>
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

export const ConnectPage: React.FC<ConnectPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  const t = CONNECT_TRANSLATIONS[lang];
  // Load gallery items directly in the component
  const galleryItems = getConnectGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const sections = TOC_SECTIONS[lang];
  const isDark = systemTheme === 'dark';

  // Sync caseStudyMode when viewMode changes from outside
  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

  // Scroll to top when mode changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [caseStudyMode, viewMode]);

  // Track scroll position and update active section (only in full mode)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      // Show nav after scrolling past hero (300px)
      setShowNav(scrollTop > 300);

      // If at the very top, set 'top' as active
      if (scrollTop < 100) {
        setActiveSection('top');
        return;
      }

      // Find active section (skip 'top' which has no DOM element)
      const sectionElements = sections
        .filter(s => s.id !== 'top')
        .map(s => ({
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

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section with proper offset for sticky mini-nav
  const scrollToSection = (sectionId: string) => {
    if (!containerRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(containerRef.current, 0);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const currentScroll = containerRef.current.scrollTop;
      const tocOffset = 48 + 16;
      const elementPosition = currentScroll + elementRect.top - 64 - tocOffset;
      smoothScrollTo(containerRef.current, elementPosition);
    }
  };

  // Open lightbox with specific image and optional start time for videos
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };


  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery' ? 'bg-black' : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Header - Glass effect */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          viewMode === 'gallery'
            ? 'bg-black/80'
            : (systemTheme === 'dark' ? 'bg-[#0a0a0a]/80' : 'bg-white/80')
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          {/* Left - Title - Same style as Homepage nav */}
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
                viewMode === 'gallery' ? 'text-white' : (systemTheme === 'dark' ? 'text-white' : 'text-gray-900')
              }`}
            >
              SQOOL Connect
            </h1>
          </div>

          {/* Center - Toggle Switch with animated pill (compact on mobile) */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                viewMode === 'gallery' ? 'bg-white/10' : (systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100')
              }`}
            >
              {/* Summary button */}
              <button
                onClick={() => { onViewModeChange('executive'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {(viewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive')) && (
                  <motion.div
                    layoutId="connect-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  (viewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive'))
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Résumé' : 'Summary'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Rés.' : 'Sum.'}</span>
                </span>
              </button>
              {/* Full case button */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'full' && (
                  <motion.div
                    layoutId="connect-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Cas complet' : 'Full case'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Full' : 'Full'}</span>
                </span>
              </button>
              {/* Gallery button */}
              <button
                onClick={() => onViewModeChange('gallery')}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'gallery' && (
                  <motion.div
                    layoutId="connect-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery' ? 'text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Galerie' : 'Gallery'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Gal.' : 'Gal.'}</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right - Close button */}
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className={`relative p-3 flex items-center justify-center rounded-full transition-colors before:absolute before:inset-[-12px] before:content-[''] ${
                viewMode === 'gallery'
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* TOC Sidebar - Persistent left navigation for full mode */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showNav && viewMode !== 'gallery' && caseStudyMode === 'full'}
        lang={lang}
      />

      {/* Lightbox Modal - Using EnhancedLightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="connect"
        updateUrl={true}
      />

      {/* Content - Switch between Case Study and Gallery */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Gallery View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full px-6 md:px-10 lg:px-12 py-8 md:py-12"
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
              {galleryItems.map((item, index) => (
                <GalleryCard
                  key={index}
                  item={item}
                  index={index}
                  onClick={() => openLightbox(item.src)}
                />
              ))}
            </div>
          </motion.div>
        ) : caseStudyMode === 'executive' ? (
          /* Executive Summary View */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ConnectExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onViewFull={() => setCaseStudyMode('full')}
              onContact={onContact}
            />
          </motion.div>
        ) : (
          /* Full Case Study View */
          <motion.div
            key="caseStudy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
      <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
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
            <figure className="mb-24 md:mb-32">
              <div
                onClick={() => openLightbox('/images/connect/connect_overview.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/connect/connect_overview.webp"
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
            <section id="overview" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${
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
                    className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.overview.introTitle}
                  </h2>
                  <p
                    className={`text-base leading-relaxed ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {t.overview.introDesc}
                  </p>
                </div>

                {/* Goals */}
                <div>
                  <h2
                    className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.overview.goalsTitle}
                  </h2>
                  <ul
                    className={`text-base leading-relaxed space-y-2 ${
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
                  className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t.overview.roleTitle}
                </h2>
                <p
                  className={`text-base leading-relaxed ${
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
            <section id="dashboard" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
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
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
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
                    <img loading="lazy"
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
                    <img loading="lazy"
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
              <figure className="my-12">
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
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4"
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
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/connect/connect_tech_architecture-1-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
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
                    <img loading="lazy"
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
                    <img loading="lazy"
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
              <figure className="my-12">
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
            <section id="bulle" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
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
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
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
                    <img loading="lazy"
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
                    <img loading="lazy"
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
                    <img loading="lazy"
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
                    <img loading="lazy"
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
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/interaction-bulle-connect-compressed.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/interaction-bulle-connect-compressed.mp4"
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
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4"
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

            {/* Footer CTA */}
            <div className={`text-center py-16 border-t ${systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-medium transition-colors"
              >
                {t.contactVictor}
              </button>
            </div>
          </main>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ConnectPage;
