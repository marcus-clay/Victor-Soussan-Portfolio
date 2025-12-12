// France VAE Case Study Page
// Displays the France VAE project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ChevronDown, ZoomIn, ZoomOut } from 'lucide-react';
import FranceVaeExecutive from './src/components/FranceVaeExecutive';
import FranceVaeFull from './src/components/FranceVaeFull';

// Gallery Card with Apple TV-style 3D tilt effect (same as BentoGallery)
interface GalleryCardProps {
  item: { src: string; caption: string; captionFr: string };
  index: number;
  onClick: () => void;
  lang: 'en' | 'fr';
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring smoothing for natural feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  // Glow position
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group cursor-pointer break-inside-avoid mb-8 md:mb-10"
      onClick={onClick}
      style={{ perspective: 1000 }}
    >
      {/* Container with Apple TV 3D tilt effect */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
      >
        {/* Glow overlay - Apple TV style */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Shine effect on edges */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.2)',
          }}
        />

        <img
          src={item.src}
          alt={lang === 'fr' ? item.captionFr : item.caption}
          className="w-full h-auto block"
          loading="lazy"
        />
      </motion.div>

      {/* Caption */}
      <figcaption className="mt-4 px-1">
        <strong className="text-sm text-gray-200 font-medium">
          {lang === 'fr' ? item.captionFr : item.caption}
        </strong>
      </figcaption>
    </motion.figure>
  );
};

interface FranceVaePageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang?: 'en' | 'fr';
  viewMode?: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange?: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
}

// Translations
const FRANCEVAE_TRANSLATIONS = {
  en: {
    enBref: 'At a glance',
    enBrefShort: 'Brief',
    full: 'Full',
    fullShort: 'Full',
    gallery: 'Gallery',
  },
  fr: {
    enBref: 'En bref',
    enBrefShort: 'Bref',
    full: 'Complet',
    fullShort: 'Complet',
    gallery: 'Galerie',
  }
};

// TOC Sections for Full case study
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'context', label: 'Context' },
    { id: 'initiative-1', label: 'VAE Collective' },
    { id: 'initiative-2', label: 'Product Ops' },
    { id: 'initiative-3', label: 'Research' },
    { id: 'initiative-4', label: 'Workshops' },
    { id: 'initiative-5', label: 'AI' },
    { id: 'learnings', label: 'Learnings' }
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'context', label: 'Contexte' },
    { id: 'initiative-1', label: 'VAE Collective' },
    { id: 'initiative-2', label: 'Product Ops' },
    { id: 'initiative-3', label: 'Recherche' },
    { id: 'initiative-4', label: 'Ateliers' },
    { id: 'initiative-5', label: 'IA' },
    { id: 'learnings', label: 'Apprentissages' }
  ]
};

// All media for lightbox - ordered to follow case study narrative
const ALL_MEDIA = [
  // ===== CONTEXT =====
  { src: '/francevae/france_vae_home.webp', caption: 'France VAE Homepage', captionFr: 'Page d\'accueil France VAE' },

  // ===== INITIATIVE 1: VAE Collective =====
  { src: '/francevae/prototype vae collective .png', caption: 'VAE Collective - Employer Dashboard Prototype', captionFr: 'VAE Collective - Prototype Dashboard Employeur' },
  { src: '/francevae/slide presentation process vae collective.png', caption: 'VAE Collective - 4-Step Onboarding Process', captionFr: 'VAE Collective - Processus d\'onboarding en 4 étapes' },
  { src: '/francevae/slide presentation benefices vae collective.png', caption: 'VAE Collective - ROI & Benefits for Enterprises', captionFr: 'VAE Collective - ROI et bénéfices entreprises' },
  { src: '/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 01.png', caption: 'Wireframe - Employer Space Home', captionFr: 'Wireframe - Accueil Espace Commanditaire' },
  { src: '/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 02.png', caption: 'Wireframe - Program Overview', captionFr: 'Wireframe - Vue Programme' },
  { src: '/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue cohorte - 03.png', caption: 'Wireframe - Cohort Tracking View', captionFr: 'Wireframe - Vue Suivi Cohorte' },
  { src: '/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue detail d\'une cohorte - 04.png', caption: 'Wireframe - Individual Cohort Detail', captionFr: 'Wireframe - Détail d\'une Cohorte' },

  // ===== INITIATIVE 2: Product Operations =====
  { src: '/francevae/presentation process_discovery @2x.png', caption: 'Monthly Seasons Framework - Preparation, Execution, Retrospective', captionFr: 'Framework Saisons Mensuelles - Préparation, Exécution, Rétrospective' },
  { src: '/francevae/schema - equipe 01.png', caption: 'Before: Siloed Team Structure', captionFr: 'Avant : Structure d\'équipe en silos' },
  { src: '/francevae/schema - equipe 02.png', caption: 'After: Unified Contributors Model', captionFr: 'Après : Modèle contributeurs unifiés' },
  { src: '/francevae/presentation_process_discovery_05.png', caption: 'Initiative Lifecycle - Problem Framing & Cross-team Prioritization', captionFr: 'Cycle de vie initiative - Cadrage problème & Priorisation cross-équipe' },
  { src: '/francevae/presentation_process_discovery_01.png', caption: 'Roadmap Structure - Goals, Initiatives, Features hierarchy', captionFr: 'Structure Roadmap - Hiérarchie Objectifs, Initiatives, Fonctionnalités' },
  { src: '/francevae/presentation_process_discovery_02.png', caption: 'Solution - Unified Contributors Around Shared Objectives', captionFr: 'Solution - Contributeurs unifiés autour d\'objectifs communs' },
  { src: '/francevae/presentation_process_discovery_03.png', caption: 'Three-tier Framework: Objectives, Initiatives, Features', captionFr: 'Framework à 3 niveaux : Objectifs, Initiatives, Features' },
  { src: '/francevae/presentation_process_discovery_04.png', caption: 'Season Calendar - 25% Prep, 50% Execution, 25% Retro', captionFr: 'Calendrier Saison - 25% Prépa, 50% Exécution, 25% Rétro' },

  // ===== INITIATIVE 3: User Research =====
  { src: '/francevae/UXR - Rapport de campangne de test tableau de bord.png', caption: 'Dashboard Test Campaign - Synthesis Report', captionFr: 'Campagne de test Tableau de bord - Rapport de synthèse' },
  { src: '/francevae/UXR - test - script candidat 01.png', caption: 'Moderated Interview Script - Test Protocol', captionFr: 'Script d\'entretien modéré - Protocole de test' },
  { src: '/francevae/UXR - test - tableau prio.png', caption: 'Feedback Prioritization - Quick Wins, Bugs, UX Issues', captionFr: 'Priorisation des retours - Quick Wins, Bugs, Problèmes UX' },
  { src: '/francevae/UXR - interface tableau de bord candidat.webp', caption: 'Candidate Dashboard Interface - Under Test', captionFr: 'Interface Tableau de bord candidat - En test' },
  { src: '/francevae/UXR - panel france vae.png', caption: 'User Research Panel - Participant Database', captionFr: 'Panel Recherche Utilisateur - Base de participants' },
  { src: '/francevae/UXR - base d\'etudes.png', caption: 'Centralized Research Knowledge Base', captionFr: 'Base de connaissances recherche centralisée' },
  { src: '/francevae/UXR - test - script candidat 02.png', caption: 'Interview Script - Tasks & Scenarios', captionFr: 'Script d\'entretien - Tâches & Scénarios' },

  // ===== INITIATIVE 4: Design Thinking Workshops =====
  { src: '/francevae/photo atelier aap.jpg', caption: 'Workshop Day 1 - With Accompaniment Providers (AAP)', captionFr: 'Atelier Jour 1 - Avec les Accompagnateurs (AAP)' },
  { src: '/francevae/photo atelier aap 02.jpg', caption: 'Workshop Day 2 - Collaborative Ideation', captionFr: 'Atelier Jour 2 - Idéation collaborative' },
  { src: '/francevae/atelier france vae AAP 01.png', caption: 'Workshop Objectives & Agenda', captionFr: 'Objectifs & Programme de l\'atelier' },
  { src: '/francevae/animation atelier 00.png', caption: 'Facilitation Framework - Session Structure', captionFr: 'Framework d\'animation - Structure de session' },
  { src: '/francevae/animation atelier 01.png', caption: 'Ideation Exercise - How Might We', captionFr: 'Exercice d\'idéation - How Might We' },

  // ===== INITIATIVE 5: AI Experimentation =====
  { src: '/francevae/proto IA - chatbot de positionnement.png', caption: 'AI Chatbot Prototype - VAE Eligibility Assessment', captionFr: 'Prototype Chatbot IA - Évaluation éligibilité VAE' },
  { src: '/francevae/proto IA - orientation professionnelle assistee par IA.png', caption: 'AI Skills Radar - Career Orientation Assistant', captionFr: 'Radar de compétences IA - Assistant orientation professionnelle' },

  // ===== UX Workspace (Design Ops) =====
  { src: '/francevae/workspace UX 01.png', caption: 'Notion UX Workspace - Team Hub Overview', captionFr: 'Espace Notion UX - Vue d\'ensemble du hub équipe' },
  { src: '/francevae/workspace UX 02.png', caption: 'Design Tasks Board - Sprint Planning', captionFr: 'Tableau des tâches design - Planification sprint' },
  { src: '/francevae/workspace UX 03.png', caption: 'Kanban Board - Task Status Tracking', captionFr: 'Kanban - Suivi statut des tâches' },
  { src: '/francevae/workspace UX 04.png', caption: 'Weekly Meeting Notes - Design/Dev Sync', captionFr: 'Notes de réunion hebdo - Sync Design/Dev' },
  { src: '/francevae/workspace UX 05 - uxr.png', caption: 'User Research Hub - Centralized Insights', captionFr: 'Hub Recherche Utilisateur - Insights centralisés' },
  { src: '/francevae/workspace UX 06 - uxr - etudes.png', caption: 'Research Studies - Organized by Theme', captionFr: 'Études recherche - Organisées par thème' },
  { src: '/francevae/workspace UX 07 - uxr - annuaire.png', caption: 'UXR Participant Directory', captionFr: 'Annuaire participants UXR' },
];

// Spring transition
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Main Component
const FranceVaePage: React.FC<FranceVaePageProps> = ({
  onClose,
  systemTheme,
  lang: propLang,
  viewMode: propViewMode,
  onViewModeChange
}) => {
  const [lang, setLang] = useState<'en' | 'fr'>(propLang || 'fr');
  // Map external viewMode to internal
  const initialViewMode = propViewMode === 'gallery' ? 'gallery' : 'caseStudy';
  const [viewMode, setViewModeInternal] = useState<'caseStudy' | 'gallery'>(initialViewMode);
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>('executive');

  // Wrapper to sync with external state
  const setViewMode = (mode: 'caseStudy' | 'gallery') => {
    setViewModeInternal(mode);
    if (onViewModeChange) {
      onViewModeChange(mode === 'gallery' ? 'gallery' : 'caseStudy');
    }
  };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const lastTapRef = useRef<number>(0);
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = FRANCEVAE_TRANSLATIONS[lang];
  const sections = TOC_SECTIONS[lang];
  const isDark = systemTheme === 'dark';

  // Sync with prop lang
  useEffect(() => {
    if (propLang) setLang(propLang);
  }, [propLang]);

  // Sync with prop viewMode
  useEffect(() => {
    if (propViewMode) {
      setViewModeInternal(propViewMode === 'gallery' ? 'gallery' : 'caseStudy');
    }
  }, [propViewMode]);

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

  // Scroll to section with proper offset for header + sticky mini-nav
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      // Header height (73px) + sticky mini-nav height (~56px with py-4) + padding (24px)
      const headerOffset = 73 + 56 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      containerRef.current.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Open lightbox
  const openLightbox = (imageSrc: string) => {
    const index = ALL_MEDIA.findIndex(m => m.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxZoomed(false);
    document.body.style.overflow = '';
  };

  // Navigate lightbox
  const paginate = (direction: number) => {
    const newIndex = lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < ALL_MEDIA.length) {
      setLightboxZoomed(false);
      setLightboxIndex(newIndex);
    }
  };

  // Toggle zoom in lightbox
  const toggleZoom = () => {
    setLightboxZoomed(!lightboxZoomed);
  };

  // Check if device is mobile/touch
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Handle tap/double-tap for mobile zoom
  const handleImageTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    // On desktop: single click to zoom
    if (!isTouchDevice()) {
      toggleZoom();
      return;
    }

    // On mobile: double-tap to zoom
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap - toggle zoom
      toggleZoom();
      lastTapRef.current = 0;
    } else {
      // Single tap - will check for double tap
      lastTapRef.current = now;
      // If not followed by another tap, do nothing (image stays as is)
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery' ? 'bg-black' : (isDark ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Mobile Navigation - Sticky under header - Only visible in full mode */}
      <AnimatePresence>
        {showNav && viewMode !== 'gallery' && caseStudyMode === 'full' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[53px] sm:top-[65px] left-0 right-0 z-30 border-b ${
              isDark
                ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10'
                : 'bg-white/95 backdrop-blur-xl border-gray-200'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full h-12 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {sections.find(s => s.id === activeSection)?.label || 'Top'}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isMobileNavExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown
                    size={20}
                    className={isDark ? 'text-gray-400' : 'text-gray-500'}
                  />
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
                    <div className={`pb-3 space-y-1 border-t ${
                      isDark ? 'border-white/5' : 'border-gray-100'
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
                                ? isDark
                                  ? 'bg-blue-600/10 text-blue-400'
                                  : 'bg-blue-50 text-blue-600'
                                : isDark
                                  ? 'text-gray-400 hover:bg-white/5'
                                  : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive
                                  ? 'bg-blue-600'
                                  : isPast
                                    ? isDark
                                      ? 'bg-gray-500'
                                      : 'bg-gray-400'
                                    : isDark
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

      {/* Header - iOS-inspired responsive design (same as ToolkitPage) */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          viewMode === 'gallery'
            ? 'bg-black/80 border-white/10'
            : (isDark ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-gray-200')
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-4">
          {/* Left - Title */}
          <div className="flex-shrink-0 min-w-0 max-w-[30%] sm:max-w-none sm:w-32 md:w-40">
            <h1
              className={`text-base sm:text-lg md:text-xl font-bold truncate ${
                viewMode === 'gallery' ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')
              }`}
            >
              France VAE
            </h1>
          </div>

          {/* Center - Toggle Switch with animated pill (3 options) */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                viewMode === 'gallery' ? 'bg-white/10' : (isDark ? 'bg-white/10' : 'bg-gray-100')
              }`}
            >
              {/* En bref button */}
              <button
                onClick={() => { setViewMode('caseStudy'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'executive' && (
                  <motion.div
                    layoutId="francevae-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'executive'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{t.enBref}</span>
                  <span className="sm:hidden">{t.enBrefShort}</span>
                </span>
              </button>

              {/* Full case study button */}
              <button
                onClick={() => { setViewMode('caseStudy'); setCaseStudyMode('full'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'full' && (
                  <motion.div
                    layoutId="francevae-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{t.full}</span>
                  <span className="sm:hidden">{t.fullShort}</span>
                </span>
              </button>

              {/* Gallery button */}
              <button
                onClick={() => setViewMode('gallery')}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'gallery' && (
                  <motion.div
                    layoutId="francevae-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery'
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  {t.gallery}
                </span>
              </button>
            </div>
          </div>

          {/* Right - Close button */}
          <div className="flex-shrink-0 sm:w-32 md:w-40 flex justify-end">
            <button
              onClick={onClose}
              className={`p-1.5 sm:p-2 rounded-full ${
                viewMode === 'gallery'
                  ? 'text-gray-300 hover:bg-white/10'
                  : (isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              <X size={20} className="sm:hidden" />
              <X size={24} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {viewMode === 'caseStudy' ? (
        caseStudyMode === 'executive' ? (
          <main>
            <FranceVaeExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onViewFull={() => setCaseStudyMode('full')}
            />
          </main>
        ) : (
          /* Full Case Study - Complete narrative version */
          <main>
            <FranceVaeFull
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
            />
          </main>
        )
      ) : (
        /* Gallery View - Same layout as BentoGallery */
        <main className="overflow-y-auto">
          <div className="w-full px-6 md:px-10 lg:px-12 py-8 md:py-12">
            {/* CSS Masonry Grid - 3 columns fluid (same as BentoGallery) */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
              {ALL_MEDIA.map((item, index) => (
                <GalleryCard
                  key={item.src}
                  item={item}
                  index={index}
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </motion.button>
            )}

            {lightboxIndex < ALL_MEDIA.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight size={28} />
              </motion.button>
            )}

            {/* Image Container */}
            <motion.div
              key={`${lightboxIndex}-${lightboxZoomed}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={springTransition}
              className={`relative flex flex-col items-center ${
                lightboxZoomed
                  ? 'w-full h-full overflow-auto'
                  : 'max-w-[90vw] max-h-[85vh]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrollable image wrapper when zoomed */}
              <div
                className={`${
                  lightboxZoomed
                    ? 'w-full h-full overflow-auto flex items-start justify-center p-4'
                    : 'flex flex-col items-center'
                }`}
              >
                <img
                  src={ALL_MEDIA[lightboxIndex].src}
                  alt={lang === 'fr' ? ALL_MEDIA[lightboxIndex].captionFr : ALL_MEDIA[lightboxIndex].caption}
                  className={`rounded-lg select-none transition-all ${
                    lightboxZoomed
                      ? 'max-w-none w-full h-auto max-h-none cursor-zoom-out'
                      : 'max-w-full max-h-[80vh] object-contain cursor-zoom-in'
                  }`}
                  style={!lightboxZoomed ? { cursor: 'zoom-in' } : { cursor: 'zoom-out' }}
                  onClick={handleImageTap}
                  draggable={false}
                />
              </div>

              {/* Caption - hidden when zoomed */}
              {!lightboxZoomed && (
                <>
                  <p className="mt-4 text-center text-white/80 text-sm">
                    {lang === 'fr' ? ALL_MEDIA[lightboxIndex].captionFr : ALL_MEDIA[lightboxIndex].caption}
                  </p>
                  <p className="mt-1 text-center text-white/40 text-xs">
                    {lightboxIndex + 1} / {ALL_MEDIA.length}
                  </p>
                </>
              )}

              {/* Zoom hint - different for mobile vs desktop */}
              {!lightboxZoomed && (
                <p className="mt-2 text-center text-white/30 text-xs">
                  <span className="hidden md:inline">{lang === 'fr' ? 'Cliquez pour agrandir' : 'Click to enlarge'}</span>
                  <span className="md:hidden">{lang === 'fr' ? 'Double-tap pour zoomer' : 'Double-tap to zoom'}</span>
                </p>
              )}

              {/* Unzoom button when zoomed */}
              {lightboxZoomed && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors backdrop-blur-sm"
                  >
                    <ZoomOut size={16} />
                    {lang === 'fr' ? 'Réduire' : 'Zoom out'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FranceVaePage;
