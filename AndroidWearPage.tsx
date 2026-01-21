// Android Wear Case Study Page - Standalone case study for PagesJaunes Android Wear
// A focused deep-dive into the wearable design project

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  X,
  Play,
  Calendar,
  Briefcase,
  Layers,
  Building2,
  Watch,
  CheckCircle2,
  ArrowRight,
  Users,
  Smartphone,
  Quote
} from 'lucide-react';
import { GalleryItem } from './BentoGallery';
import EnhancedLightbox from './src/components/EnhancedLightbox';

interface AndroidWearPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery';
  onViewModeChange: (mode: 'caseStudy' | 'gallery') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    gallery: 'Gallery',
    cta: {
      title: 'Working on a wearable project?',
      button: 'Get in touch',
    },
    meta: {
      type: 'Wearable App',
      typeLabel: 'Type',
      scope: 'Product Design',
      scopeLabel: 'Scope',
      period: 'Oct-Dec 2015',
      periodLabel: 'Period',
      company: 'PagesJaunes',
      companyLabel: 'Company',
    },
    hero: {
      role: 'Product Designer',
      scope: 'Android Wear, Material Design',
      period: '2015',
      title: 'Bringing PagesJaunes to Your Wrist',
      subtitle: 'Designing a glanceable local search experience for Android Wear',
      description: 'A two-month design sprint to bring France\'s leading local directory to wearables. Working in a tight duo with Android developer Thibault Fighiera, we shipped a fully functional Android Wear app from concept to Google Play.',
    },
    testimonial: {
      quote: 'Victor designed a complete wearable experience from scratch in two months. His ability to understand the constraints of a new platform and translate them into a coherent design language was impressive.',
      author: 'Thibault Fighiera',
      role: 'Android Developer @ PagesJaunes',
    },
    overview: {
      title: 'Overview',
      contextTitle: 'The Context',
      contextDesc: 'PagesJaunes wanted to experiment with wearable technology. Android Wear was emerging as a platform, and we saw an opportunity to help users find local professionals in the most contextual way possible: right from their wrist.',
      challengeTitle: 'The Challenge',
      challengeDesc: 'Design a complete local search experience for a 280dp circular screen. Users needed to find businesses, view key info, and take action (call or navigate) in seconds, not minutes.',
      roleTitle: 'My Role',
      roleDesc: 'I owned the full design process: user research, persona creation, sketching, wireframing, UI design, interaction specs, prototyping, and stakeholder presentations. Working back-to-back with our developer for rapid iteration.',
    },
    persona: {
      title: 'User Scenario',
      scenario: '"It\'s noon, Julien is hungry. He wants to quickly find a restaurant near the office and get directions."',
      name: 'Julien, 25 years old',
      context: 'Busy professional, always on the go. Uses his phone for everything but wants faster access to quick tasks. Early adopter of wearable tech.',
      needs: [
        'Find nearby businesses in seconds',
        'Get key info at a glance (open/closed, rating, distance)',
        'Take action quickly (call or navigate)',
        'Minimal interaction, maximum result',
      ],
    },
    approach: {
      title: 'Design Approach',
      items: [
        {
          title: 'Learn the Platform',
          desc: 'Deep dive into Android Wear guidelines. Understanding the constraints: circular screens, ambient mode, voice input, phone handoff patterns.',
        },
        {
          title: 'Define the Flows',
          desc: 'Two primary user journeys: "Find and Call" and "Find and Navigate." Each path optimized for minimum taps and maximum clarity.',
        },
        {
          title: 'Design for Glanceability',
          desc: 'Every screen needed to communicate its purpose in under 2 seconds. Information hierarchy became critical on a 280dp display.',
        },
        {
          title: 'Iterate on Real Hardware',
          desc: 'Weekly sessions with actual watches. Testing with real constraints revealed issues that mockups couldn\'t surface.',
        },
      ],
    },
    features: {
      title: 'What We Built',
      items: [
        'Card-based UI with ratings, status, and contact CTA',
        'Two optimized user flows: search→call and search→navigate',
        'Regular mode (high-contrast yellow) and ambient mode (monochrome)',
        'Voice search integration with "Ok Google"',
        'Phone handoff for calls and Google Maps navigation',
        'Category shortcuts for quick access to common searches',
      ],
    },
    deliverables: {
      title: 'My Deliverables',
      items: [
        'Persona and user story documentation',
        'Sketching and wireframing',
        'Full UI design for circular and square displays',
        'Interaction specs and motion design',
        'Prototyping and demo videos',
        'Stakeholder presentation deck',
      ],
    },
    process: {
      title: 'Design Process',
      sketches: 'Early Wireframe Sketches',
      sketchesDesc: 'Rapid paper sketching to explore information hierarchy and flow patterns. Testing ideas before committing to pixels.',
      ambient: 'Ambient Mode Design',
      ambientDesc: 'Mapping each screen state to low-power display mode. White outlines on black background for OLED battery efficiency.',
      flows: 'User Task Flows',
      flowsDesc: 'Complete flow mapping from app launch to action completion. Two paths: find→call and find→navigate.',
      uiModes: 'Regular & Ambient Modes',
      uiModesDesc: 'Regular mode uses high-contrast PagesJaunes yellow. Ambient mode switches to monochrome for battery conservation.',
      components: 'Component Library',
      componentsDesc: 'Full screen inventory: Loading, Launcher, Home, Results, Detail card, Actions. Guidelines for both square and round displays.',
    },
    implementation: {
      title: 'Implementation',
      devSession: 'Real Device Testing',
      devSessionDesc: 'Back-to-back development sessions with Thibault. Two watches connected, iterating on builds in real-time.',
      prototype: 'Working Prototype',
      prototypeDesc: 'Full flow from app launch to business detail to phone call handoff. Tested on actual hardware.',
    },
    result: {
      title: 'Result',
      items: [
        {
          value: '2 months',
          label: 'From concept to Google Play',
        },
        {
          value: '2 flows',
          label: 'Optimized user journeys',
        },
        {
          value: '280dp',
          label: 'Screen real estate mastered',
        },
        {
          value: '1 team',
          label: 'Designer + Developer duo',
        },
      ],
    },
    learnings: {
      title: 'What I Learned',
      items: [
        {
          title: 'Constraints breed creativity',
          desc: 'A 280dp screen forced every design decision to be intentional. No room for filler.',
        },
        {
          title: 'Platform fluency matters',
          desc: 'Deep understanding of Android Wear patterns made our app feel native, not ported.',
        },
        {
          title: 'Tight collaboration accelerates',
          desc: 'Daily syncs with the developer meant problems were caught and solved in hours, not days.',
        },
      ],
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    gallery: 'Galerie',
    cta: {
      title: 'Un projet wearable en cours ?',
      button: 'Me contacter',
    },
    meta: {
      type: 'App Wearable',
      typeLabel: 'Type',
      scope: 'Product Design',
      scopeLabel: 'Périmètre',
      period: 'Oct-Déc 2015',
      periodLabel: 'Période',
      company: 'PagesJaunes',
      companyLabel: 'Entreprise',
    },
    hero: {
      role: 'Product Designer',
      scope: 'Android Wear, Material Design',
      period: '2015',
      title: 'PagesJaunes à Votre Poignet',
      subtitle: 'Concevoir une expérience de recherche locale glanceable pour Android Wear',
      description: 'Un sprint design de deux mois pour porter l\'annuaire local leader en France sur les montres connectées. En binôme serré avec le développeur Android Thibault Fighiera, nous avons livré une app Android Wear complète du concept au Google Play.',
    },
    testimonial: {
      quote: 'Victor a conçu une expérience wearable complète from scratch en deux mois. Sa capacité à comprendre les contraintes d\'une nouvelle plateforme et à les traduire en un langage design cohérent était impressionnante.',
      author: 'Thibault Fighiera',
      role: 'Développeur Android @ PagesJaunes',
    },
    overview: {
      title: 'Vue d\'ensemble',
      contextTitle: 'Le Contexte',
      contextDesc: 'PagesJaunes voulait expérimenter avec la technologie wearable. Android Wear émergeait comme plateforme, et nous avons vu une opportunité d\'aider les utilisateurs à trouver des pros locaux de la manière la plus contextuelle : directement depuis leur poignet.',
      challengeTitle: 'Le Défi',
      challengeDesc: 'Concevoir une expérience de recherche locale complète pour un écran circulaire de 280dp. Les utilisateurs devaient trouver des commerces, voir les infos clés, et agir (appeler ou naviguer) en secondes, pas en minutes.',
      roleTitle: 'Mon Rôle',
      roleDesc: 'J\'ai owné tout le process design : recherche utilisateur, création persona, sketching, wireframing, UI design, specs d\'interaction, prototypage, et présentations aux stakeholders. En binôme avec notre développeur pour une itération rapide.',
    },
    persona: {
      title: 'Scénario Utilisateur',
      scenario: '"Il est midi, Julien a faim. Il veut trouver rapidement un resto près du bureau et s\'y faire guider."',
      name: 'Julien, 25 ans',
      context: 'Pro occupé, toujours en mouvement. Utilise son téléphone pour tout mais veut un accès plus rapide aux tâches rapides. Early adopter de tech wearable.',
      needs: [
        'Trouver des commerces proches en secondes',
        'Obtenir les infos clés en un coup d\'œil (ouvert/fermé, note, distance)',
        'Agir rapidement (appeler ou naviguer)',
        'Interaction minimale, résultat maximum',
      ],
    },
    approach: {
      title: 'Approche Design',
      items: [
        {
          title: 'Apprendre la Plateforme',
          desc: 'Plongée dans les guidelines Android Wear. Comprendre les contraintes : écrans circulaires, mode ambiant, input vocal, patterns de handoff téléphone.',
        },
        {
          title: 'Définir les Flows',
          desc: 'Deux parcours utilisateur principaux : "Trouver et Appeler" et "Trouver et Naviguer." Chaque chemin optimisé pour un minimum de taps et une clarté maximale.',
        },
        {
          title: 'Designer pour la Glanceability',
          desc: 'Chaque écran devait communiquer son propos en moins de 2 secondes. La hiérarchie d\'information est devenue critique sur un écran de 280dp.',
        },
        {
          title: 'Itérer sur du Vrai Hardware',
          desc: 'Sessions hebdomadaires avec de vraies montres. Tester avec des contraintes réelles a révélé des problèmes que les maquettes ne pouvaient pas montrer.',
        },
      ],
    },
    features: {
      title: 'Ce qu\'on a construit',
      items: [
        'UI en cartes avec notes, statut et CTA contact',
        'Deux flows utilisateur optimisés : recherche→appel et recherche→navigation',
        'Mode normal (jaune haut contraste) et mode ambiant (monochrome)',
        'Intégration recherche vocale "Ok Google"',
        'Handoff téléphone pour appels et navigation Google Maps',
        'Raccourcis catégories pour accès rapide aux recherches courantes',
      ],
    },
    deliverables: {
      title: 'Mes Livrables',
      items: [
        'Documentation persona et user story',
        'Sketching et wireframing',
        'UI design complet pour écrans circulaires et carrés',
        'Specs d\'interaction et motion design',
        'Prototypage et vidéos de démo',
        'Deck de présentation stakeholders',
      ],
    },
    process: {
      title: 'Process Design',
      sketches: 'Wireframes Précoces',
      sketchesDesc: 'Sketching papier rapide pour explorer la hiérarchie d\'info et les patterns de flow. Tester les idées avant de passer aux pixels.',
      ambient: 'Design Mode Ambiant',
      ambientDesc: 'Mapping de chaque état d\'écran vers le mode basse conso. Contours blancs sur fond noir pour économie batterie OLED.',
      flows: 'Flows Tâches Utilisateur',
      flowsDesc: 'Mapping complet des flows du lancement app jusqu\'à l\'action. Deux chemins : trouver→appeler et trouver→naviguer.',
      uiModes: 'Modes Normal & Ambiant',
      uiModesDesc: 'Le mode normal utilise le jaune PagesJaunes à haut contraste. Le mode ambiant passe en monochrome pour économiser la batterie.',
      components: 'Bibliothèque de Composants',
      componentsDesc: 'Inventaire complet des écrans : Chargement, Launcher, Home, Résultats, Fiche détail, Actions. Guidelines pour écrans carrés et ronds.',
    },
    implementation: {
      title: 'Implémentation',
      devSession: 'Test sur Device Réel',
      devSessionDesc: 'Sessions de développement back-to-back avec Thibault. Deux montres connectées, itérations sur les builds en temps réel.',
      prototype: 'Prototype Fonctionnel',
      prototypeDesc: 'Flow complet du lancement app à la fiche détail jusqu\'au handoff appel téléphone. Testé sur du vrai hardware.',
    },
    result: {
      title: 'Résultat',
      items: [
        {
          value: '2 mois',
          label: 'Du concept au Google Play',
        },
        {
          value: '2 flows',
          label: 'Parcours utilisateur optimisés',
        },
        {
          value: '280dp',
          label: 'Surface d\'écran maîtrisée',
        },
        {
          value: '1 équipe',
          label: 'Duo Designer + Développeur',
        },
      ],
    },
    learnings: {
      title: 'Ce que j\'ai appris',
      items: [
        {
          title: 'Les contraintes stimulent la créativité',
          desc: 'Un écran de 280dp a forcé chaque décision design à être intentionnelle. Pas de place pour le superflu.',
        },
        {
          title: 'La fluence plateforme compte',
          desc: 'Une compréhension profonde des patterns Android Wear a rendu notre app native, pas portée.',
        },
        {
          title: 'Une collaboration serrée accélère',
          desc: 'Des syncs quotidiens avec le développeur signifiaient que les problèmes étaient catchés et résolus en heures, pas en jours.',
        },
      ],
    },
  },
};

// Gallery items
const getGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] => {
  const captions = {
    en: {
      sketches: 'Early Wireframes',
      sketchesDesc: 'Rapid paper sketching to explore information hierarchy.',
      ambient: 'Ambient Mode Sketches',
      ambientDesc: 'Mapping screen states to low-power display.',
      flows: 'User Task Flows',
      flowsDesc: 'Complete flow from search to action.',
      flowsDetailed: 'UI and Interactions',
      flowsDetailedDesc: 'Detailed flow with phone handoff patterns.',
      uiModes: 'Regular & Ambient',
      uiModesDesc: 'High-contrast yellow vs monochrome modes.',
      ui: 'Component System',
      uiDesc: 'Full screen inventory for wearable.',
      components: 'Component Library',
      componentsDesc: 'Complete screen inventory for square and round.',
      insituStore: 'Play Store Visual',
      insituStoreDesc: 'Promotional mockup for Google Play.',
      insituDetail: 'In-situ Detail',
      insituDetailDesc: 'Business card in watch context.',
      devSession: 'Dev Session',
      devSessionDesc: 'Real device testing with Thibault.',
      designWork: 'Design Work',
      designWorkDesc: 'Keynote design session.',
      designDetail: 'Pixel Perfect',
      designDetailDesc: 'Device verification session.',
      prototypeVideo: 'Prototype Demo',
      prototypeVideoDesc: 'Working prototype on real hardware.',
      navVideo: 'Navigation Demo',
      navVideoDesc: 'Navigation flow to Google Maps.',
    },
    fr: {
      sketches: 'Wireframes Précoces',
      sketchesDesc: 'Sketching papier pour explorer la hiérarchie.',
      ambient: 'Sketches Mode Ambiant',
      ambientDesc: 'Mapping des états écran vers basse conso.',
      flows: 'Flows Utilisateur',
      flowsDesc: 'Flow complet de recherche à action.',
      flowsDetailed: 'UI et Interactions',
      flowsDetailedDesc: 'Flow détaillé avec patterns handoff.',
      uiModes: 'Normal & Ambiant',
      uiModesDesc: 'Jaune haut contraste vs modes monochrome.',
      ui: 'Système Composants',
      uiDesc: 'Inventaire complet d\'écrans wearable.',
      components: 'Bibliothèque Composants',
      componentsDesc: 'Inventaire écrans complet carrés et ronds.',
      insituStore: 'Visuel Play Store',
      insituStoreDesc: 'Mockup promo pour Google Play.',
      insituDetail: 'Détail In-situ',
      insituDetailDesc: 'Fiche commerce en contexte montre.',
      devSession: 'Session Dev',
      devSessionDesc: 'Test device réel avec Thibault.',
      designWork: 'Travail Design',
      designWorkDesc: 'Session design Keynote.',
      designDetail: 'Pixel Perfect',
      designDetailDesc: 'Session vérification device.',
      prototypeVideo: 'Démo Prototype',
      prototypeVideoDesc: 'Prototype fonctionnel sur vrai hardware.',
      navVideo: 'Démo Navigation',
      navVideoDesc: 'Flow navigation vers Google Maps.',
    },
  };

  const t = captions[lang];

  return [
    { src: '/images/pagesjaunes/Android wear/early_wireframes.webp', type: 'image', caption: t.sketches, captionDesc: t.sketchesDesc },
    { src: '/images/pagesjaunes/Android wear/android_wear_ambient_sketches.webp', type: 'image', caption: t.ambient, captionDesc: t.ambientDesc },
    { src: '/images/pagesjaunes/pj android wear flows.jpeg', type: 'image', caption: t.flows, captionDesc: t.flowsDesc },
    { src: '/images/pagesjaunes/Android wear/ui_interactions.webp', type: 'image', caption: t.flowsDetailed, captionDesc: t.flowsDetailedDesc },
    { src: '/images/pagesjaunes/pj android wear ui modes.jpeg', type: 'image', caption: t.uiModes, captionDesc: t.uiModesDesc },
    { src: '/images/pagesjaunes/pj android wear ui.jpeg', type: 'image', caption: t.ui, captionDesc: t.uiDesc },
    { src: '/images/pagesjaunes/Android wear/component_library.webp', type: 'image', caption: t.components, captionDesc: t.componentsDesc },
    { src: '/images/pagesjaunes/Android wear/android_wear_insitu_store_01.png', type: 'image', caption: t.insituStore, captionDesc: t.insituStoreDesc },
    { src: '/images/pagesjaunes/Android wear/maquette_insitu_FD_03 (1).png', type: 'image', caption: t.insituDetail, captionDesc: t.insituDetailDesc },
    { src: '/images/pagesjaunes/Android wear/dev_session_1.webp', type: 'image', caption: t.devSession, captionDesc: t.devSessionDesc },
    { src: '/images/pagesjaunes/Android wear/design_work_keynote.webp', type: 'image', caption: t.designWork, captionDesc: t.designWorkDesc },
    { src: '/images/pagesjaunes/Android wear/design_work_detail.webp', type: 'image', caption: t.designDetail, captionDesc: t.designDetailDesc },
    { src: '/images/pagesjaunes/Android wear/VID_20151202_184124.mp4', type: 'video', caption: t.prototypeVideo, captionDesc: t.prototypeVideoDesc },
    { src: '/images/pagesjaunes/Android wear/VID_20151218_100148.mp4', type: 'video', caption: t.navVideo, captionDesc: t.navVideoDesc },
  ];
};

// Gallery Card Component
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
        className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-purple-500/20"
      >
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15) 0%, transparent 50%)` }}
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
        {item.captionDesc && <span className="hidden sm:inline"> — {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// Main Component
const AndroidWearPage: React.FC<AndroidWearPageProps> = ({
  onClose,
  systemTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const galleryItems = getGalleryItems(lang);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const allImages = galleryItems.map(item => ({
    src: item.src,
    type: (item.type || 'image') as 'image' | 'video',
    caption: `${item.caption} - ${item.captionDesc || ''}`,
  }));

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img.src === src);
    if (index !== -1) {
      openLightbox(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} overflow-y-auto`}
    >
      {/* Header - Glass effect matching DailymotionPage */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          viewMode === 'gallery'
            ? 'bg-black/80'
            : (isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80')
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          {/* Left - Title */}
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
                viewMode === 'gallery' ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')
              }`}
            >
              Android Wear
            </h1>
          </div>

          {/* Center - Toggle Switch with animated pill */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                viewMode === 'gallery' ? 'bg-white/10' : (isDark ? 'bg-white/10' : 'bg-gray-100')
              }`}
            >
              {/* Case Study button */}
              <button
                onClick={() => onViewModeChange('caseStudy')}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && (
                  <motion.div
                    layoutId="androidwear-toggle-pill"
                    className="absolute inset-0 bg-purple-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  {t.caseStudy}
                </span>
              </button>
              {/* Gallery button */}
              <button
                onClick={() => onViewModeChange('gallery')}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'gallery' && (
                  <motion.div
                    layoutId="androidwear-toggle-pill"
                    className="absolute inset-0 bg-purple-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery' ? 'text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  {t.gallery}
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
                  : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      {viewMode === 'caseStudy' ? (
        <div className="max-w-[1480px] mx-auto px-10 py-12">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                  <span className={`px-3 py-1 rounded-full font-medium ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                    {t.hero.role}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t.hero.scope}</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t.hero.period}</span>
                </div>

                <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.hero.title}
                </h1>

                <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.hero.subtitle}
                </h2>

                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.hero.description}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-purple-900/20 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>
                  <Quote size={24} className={isDark ? 'text-purple-400 mb-4' : 'text-purple-600 mb-4'} />
                  <p className={`text-sm italic leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                      TF
                    </div>
                    <div>
                      <a
                        href="https://www.linkedin.com/in/thibaultfighiera/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-semibold hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                      >
                        {t.testimonial.author}
                      </a>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meta Card */}
          <div className={`p-6 rounded-3xl border mb-12 ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-600/20' : 'bg-purple-50'}`}>
                  <Layers size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.meta.typeLabel}</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                  <Briefcase size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.meta.scopeLabel}</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.scope}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                  <Calendar size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.meta.periodLabel}</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.period}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-50'}`}>
                  <Building2 size={20} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.meta.companyLabel}</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <figure className="mb-24">
            <div
              onClick={() => handleImageClick('/images/pagesjaunes/Android wear/android_wear_insitu_store_01.png')}
              className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <img
                loading="lazy"
                src="/images/pagesjaunes/Android wear/android_wear_insitu_store_01.png"
                alt="PagesJaunes Android Wear"
                className="w-full h-auto"
              />
            </div>
          </figure>

          {/* Overview Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.overview.title}
            </h2>
            <hr className={`mb-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.overview.contextTitle}
                </h3>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.contextDesc}
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.overview.challengeTitle}
                </h3>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.challengeDesc}
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.overview.roleTitle}
                </h3>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.roleDesc}
                </p>
              </div>
            </div>
          </section>

          {/* User Scenario Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.persona.title}
            </h2>

            <blockquote className={`text-xl italic mb-8 pl-4 border-l-4 ${isDark ? 'text-gray-300 border-purple-500' : 'text-gray-600 border-purple-400'}`}>
              {t.persona.scenario}
            </blockquote>

            <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.persona.name}
              </p>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.persona.context}
              </p>
              <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.persona.needs.map((need, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Approach Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.approach.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.approach.items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Features & Deliverables */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.features.title}
                </h2>
                <ul className={`text-sm space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.features.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.deliverables.title}
                </h2>
                <ul className={`text-sm space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.deliverables.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Design Process Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.process.title}
            </h2>

            {/* Full width - Sketches */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android wear/early_wireframes.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android wear/early_wireframes.webp"
                  alt={t.process.sketches}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.process.sketches} — {t.process.sketchesDesc}
              </figcaption>
            </figure>

            {/* Full width - Ambient Mode Sketches */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android wear/android_wear_ambient_sketches.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android wear/android_wear_ambient_sketches.webp"
                  alt={t.process.ambient}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.process.ambient} — {t.process.ambientDesc}
              </figcaption>
            </figure>

            {/* 2 columns - Task Flows & UI Modes */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/pj android wear flows.jpeg')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/pj android wear flows.jpeg"
                    alt={t.process.flows}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.process.flows} — {t.process.flowsDesc}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/pj android wear ui modes.jpeg')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/pj android wear ui modes.jpeg"
                    alt={t.process.uiModes}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.process.uiModes} — {t.process.uiModesDesc}
                </figcaption>
              </figure>
            </div>

            {/* Full width - UI Interactions */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android wear/ui_interactions.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android wear/ui_interactions.webp"
                  alt={t.process.flows}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {lang === 'fr' ? 'UI et Interactions' : 'UI and Interactions'} — {lang === 'fr' ? 'Flow détaillé avec patterns handoff téléphone.' : 'Detailed flow with phone handoff patterns.'}
              </figcaption>
            </figure>

            {/* 2 columns - Component Library & In-situ mockups */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/pj android wear ui.jpeg')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/pj android wear ui.jpeg"
                    alt={t.process.components}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.process.components} — {t.process.componentsDesc}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android wear/maquette_insitu_FD_03 (1).png')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android wear/maquette_insitu_FD_03 (1).png"
                    alt={lang === 'fr' ? 'Détail In-situ' : 'In-situ Detail'}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'fr' ? 'Détail In-situ' : 'In-situ Detail'} — {lang === 'fr' ? 'Fiche commerce en contexte montre.' : 'Business card in watch context.'}
                </figcaption>
              </figure>
            </div>

            {/* Full width - Component Library Detail */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android wear/component_library.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android wear/component_library.webp"
                  alt={t.process.components}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {lang === 'fr' ? 'Bibliothèque de Composants Détaillée' : 'Detailed Component Library'} — {lang === 'fr' ? 'Guidelines pour écrans carrés et ronds.' : 'Guidelines for square and round displays.'}
              </figcaption>
            </figure>
          </section>

          {/* Implementation Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.implementation.title}
            </h2>

            {/* Full width - Dev Session */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android wear/dev_session_1.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android wear/dev_session_1.webp"
                  alt={t.implementation.devSession}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.implementation.devSession} — {t.implementation.devSessionDesc}
              </figcaption>
            </figure>

            {/* 2 columns - Design Work Photos */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android wear/design_work_keynote.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android wear/design_work_keynote.webp"
                    alt={lang === 'fr' ? 'Session Design' : 'Design Session'}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'fr' ? 'Travail Design' : 'Design Work'} — {lang === 'fr' ? 'Session design Keynote.' : 'Keynote design session.'}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android wear/design_work_detail.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android wear/design_work_detail.webp"
                    alt={lang === 'fr' ? 'Détail Pixel Perfect' : 'Pixel Perfect Detail'}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'fr' ? 'Travail Détail' : 'Detail Work'} — {lang === 'fr' ? 'Vérification pixel-perfect sur device.' : 'Pixel-perfect verification on device.'}
                </figcaption>
              </figure>
            </div>

            {/* Full width - Video Prototype */}
            <figure className="mb-12">
              <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <div
                  className="flex items-center justify-center p-12"
                  style={{ backgroundColor: isDark ? '#1D1D1F' : '#F5F5F7' }}
                >
                  <div className="relative w-full max-w-sm">
                    {/* Watch frame */}
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-900'}`} style={{ transform: 'scale(1.15)' }} />
                      <div className="relative rounded-full overflow-hidden border-4 border-gray-700" style={{ aspectRatio: '1/1' }}>
                        <video
                          src="/images/pagesjaunes/Android wear/VID_20151202_184124.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.implementation.prototype} — {t.implementation.prototypeDesc}
              </figcaption>
            </figure>

            {/* Second video if available */}
            <figure className="mb-12">
              <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <div
                  className="flex items-center justify-center p-12"
                  style={{ backgroundColor: isDark ? '#1D1D1F' : '#F5F5F7' }}
                >
                  <div className="relative w-full max-w-sm">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-900'}`} style={{ transform: 'scale(1.15)' }} />
                      <div className="relative rounded-full overflow-hidden border-4 border-gray-700" style={{ aspectRatio: '1/1' }}>
                        <video
                          src="/images/pagesjaunes/Android wear/VID_20151218_100148.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {lang === 'fr' ? 'Démo Navigation' : 'Navigation Demo'} — {lang === 'fr' ? 'Flow de navigation vers Google Maps.' : 'Navigation flow to Google Maps.'}
              </figcaption>
            </figure>
          </section>

          {/* Results Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.result.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.result.items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl text-center ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {item.value}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Learnings Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.learnings.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {t.learnings.items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className={`p-8 md:p-12 rounded-3xl ${isDark ? 'bg-purple-900/20 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}>
            <div className="text-center">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.cta.title}
              </h2>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                {t.cta.button}
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      ) : (
        /* Gallery View */
        <div className="max-w-[1480px] mx-auto px-6 py-12">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {galleryItems.map((item, index) => (
              <GalleryCard
                key={item.src}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        projectId="androidwear"
      />
    </motion.div>
  );
};

export default AndroidWearPage;
