// France VAE Case Study Page
// Displays the France VAE project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { X } from 'lucide-react';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
import FranceVaeExecutive from '../../components/case-studies/FranceVaeExecutive';
import FranceVaeFull from '../../components/case-studies/FranceVaeFull';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
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

        <img loading="lazy"
          src={item.src}
          alt={lang === 'fr' ? item.captionFr : item.caption}
          className="w-full h-auto block"
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
  onContact?: () => void;
}

// Translations
const FRANCEVAE_TRANSLATIONS = {
  en: {
    enBref: 'At a glance',
    enBrefShort: 'Brief',
    full: 'Full',
    fullShort: 'Full',
    gallery: 'Gallery',
    contactVictor: 'Contact Victor for a similar project',
  },
  fr: {
    enBref: 'En bref',
    enBrefShort: 'Bref',
    full: 'Complet',
    fullShort: 'Complet',
    gallery: 'Galerie',
    contactVictor: 'Contacter Victor pour un projet similaire',
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
    { id: 'ui-delivery', label: 'UI & Delivery' },
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
    { id: 'ui-delivery', label: 'UI & Livraison' },
    { id: 'learnings', label: 'Apprentissages' }
  ]
};

// All media for lightbox - ordered to follow case study narrative
const ALL_MEDIA = [
  // ===== CONTEXT =====
  { src: '/images/francevae/france_vae_home.webp', caption: 'France VAE Homepage', captionFr: 'Page d\'accueil France VAE' },

  // ===== INITIATIVE 1: VAE Collective =====
  { src: '/images/francevae/prototype vae collective .webp', caption: 'VAE Collective - Employer Dashboard Prototype', captionFr: 'VAE Collective - Prototype Dashboard Employeur' },
  { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'VAE Collective - 4-Step Onboarding Process', captionFr: 'VAE Collective - Processus d\'onboarding en 4 étapes' },
  { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'VAE Collective - ROI & Benefits for Enterprises', captionFr: 'VAE Collective - ROI et bénéfices entreprises' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 01.webp', caption: 'Wireframe - Employer Space Home', captionFr: 'Wireframe - Accueil Espace Commanditaire' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 02.webp', caption: 'Wireframe - Program Overview', captionFr: 'Wireframe - Vue Programme' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue cohorte - 03.webp', caption: 'Wireframe - Cohort Tracking View', captionFr: 'Wireframe - Vue Suivi Cohorte' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue detail d\'une cohorte - 04.webp', caption: 'Wireframe - Individual Cohort Detail', captionFr: 'Wireframe - Détail d\'une Cohorte' },

  // ===== INITIATIVE 2: Product Operations =====
  { src: '/images/francevae/presentation process_discovery @2x.webp', caption: 'Monthly Seasons Framework - Preparation, Execution, Retrospective', captionFr: 'Framework Saisons Mensuelles - Préparation, Exécution, Rétrospective' },
  { src: '/images/francevae/schema - equipe 01.webp', caption: 'Before: Siloed Team Structure', captionFr: 'Avant : Structure d\'équipe en silos' },
  { src: '/images/francevae/schema - equipe 02.webp', caption: 'After: Unified Contributors Model', captionFr: 'Après : Modèle contributeurs unifiés' },
  { src: '/images/francevae/presentation_process_discovery_05.webp', caption: 'Initiative Lifecycle - Problem Framing & Cross-team Prioritization', captionFr: 'Cycle de vie initiative - Cadrage problème & Priorisation cross-équipe' },
  { src: '/images/francevae/presentation_process_discovery_01.webp', caption: 'Roadmap Structure - Goals, Initiatives, Features hierarchy', captionFr: 'Structure Roadmap - Hiérarchie Objectifs, Initiatives, Fonctionnalités' },
  { src: '/images/francevae/presentation_process_discovery_02.webp', caption: 'Solution - Unified Contributors Around Shared Objectives', captionFr: 'Solution - Contributeurs unifiés autour d\'objectifs communs' },
  { src: '/images/francevae/presentation_process_discovery_03.webp', caption: 'Three-tier Framework: Objectives, Initiatives, Features', captionFr: 'Framework à 3 niveaux : Objectifs, Initiatives, Features' },
  { src: '/images/francevae/presentation_process_discovery_04.webp', caption: 'Season Calendar - 25% Prep, 50% Execution, 25% Retro', captionFr: 'Calendrier Saison - 25% Prépa, 50% Exécution, 25% Rétro' },

  // ===== INITIATIVE 3: User Research =====
  { src: '/images/francevae/UXR - Rapport de campangne de test tableau de bord.webp', caption: 'Dashboard Test Campaign - Synthesis Report', captionFr: 'Campagne de test Tableau de bord - Rapport de synthèse' },
  { src: '/images/francevae/UXR - test - script candidat 01.webp', caption: 'Moderated Interview Script - Test Protocol', captionFr: 'Script d\'entretien modéré - Protocole de test' },
  { src: '/images/francevae/UXR - test - tableau prio.webp', caption: 'Feedback Prioritization - Quick Wins, Bugs, UX Issues', captionFr: 'Priorisation des retours - Quick Wins, Bugs, Problèmes UX' },
  { src: '/images/francevae/UXR - interface tableau de bord candidat.webp', caption: 'Candidate Dashboard Interface - Under Test', captionFr: 'Interface Tableau de bord candidat - En test' },
  { src: '/images/francevae/UXR - panel france vae.webp', caption: 'User Research Panel - Participant Database', captionFr: 'Panel Recherche Utilisateur - Base de participants' },
  { src: '/images/francevae/UXR - base d\'etudes.webp', caption: 'Centralized Research Knowledge Base', captionFr: 'Base de connaissances recherche centralisée' },
  { src: '/images/francevae/UXR - test - script candidat 02.webp', caption: 'Interview Script - Tasks & Scenarios', captionFr: 'Script d\'entretien - Tâches & Scénarios' },

  // ===== INITIATIVE 4: Design Thinking Workshops =====
  { src: '/images/francevae/photo atelier aap.webp', caption: 'Workshop Day 1 - With Accompaniment Providers (AAP)', captionFr: 'Atelier Jour 1 - Avec les Accompagnateurs (AAP)' },
  { src: '/images/francevae/photo atelier aap 02.webp', caption: 'Workshop Day 2 - Collaborative Ideation', captionFr: 'Atelier Jour 2 - Idéation collaborative' },
  { src: '/images/francevae/atelier france vae AAP 01.webp', caption: 'Workshop Objectives & Agenda', captionFr: 'Objectifs & Programme de l\'atelier' },
  { src: '/images/francevae/animation atelier 00.webp', caption: 'Data-driven discovery: user pain points that shaped the workshop agenda', captionFr: 'Découverte data-driven : les insights terrain qui ont cadré l\'agenda de l\'atelier' },
  { src: '/images/francevae/animation atelier 01.webp', caption: 'Six Thinking Hats: structured divergence before convergence', captionFr: 'Méthode des Six Chapeaux : divergence structurée avant convergence' },

  // ===== INITIATIVE 5: AI Experimentation =====
  { src: '/images/francevae/proto IA - chatbot de positionnement.webp', caption: 'AI Chatbot Prototype - VAE Eligibility Assessment', captionFr: 'Prototype Chatbot IA - Évaluation éligibilité VAE' },
  { src: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp', caption: 'AI Skills Radar - Career Orientation Assistant', captionFr: 'Radar de compétences IA - Assistant orientation professionnelle' },

  // ===== UX Workspace (Design Ops) =====
  { src: '/images/francevae/workspace UX 01.webp', caption: 'Notion UX Workspace - Team Hub Overview', captionFr: 'Espace Notion UX - Vue d\'ensemble du hub équipe' },
  { src: '/images/francevae/workspace UX 02.webp', caption: 'Design Tasks Board - Sprint Planning', captionFr: 'Tableau des tâches design - Planification sprint' },
  { src: '/images/francevae/workspace UX 03.webp', caption: 'Kanban Board - Task Status Tracking', captionFr: 'Kanban - Suivi statut des tâches' },
  { src: '/images/francevae/workspace UX 04.webp', caption: 'Weekly Meeting Notes - Design/Dev Sync', captionFr: 'Notes de réunion hebdo - Sync Design/Dev' },
  { src: '/images/francevae/workspace UX 05 - uxr.webp', caption: 'User Research Hub - Centralized Insights', captionFr: 'Hub Recherche Utilisateur - Insights centralisés' },
  { src: '/images/francevae/workspace UX 06 - uxr - etudes.webp', caption: 'Research Studies - Organized by Theme', captionFr: 'Études recherche - Organisées par thème' },
  { src: '/images/francevae/workspace UX 07 - uxr - annuaire.webp', caption: 'UXR Participant Directory', captionFr: 'Annuaire participants UXR' },
];

// Main Component
const FranceVaePage: React.FC<FranceVaePageProps> = ({
  onClose,
  systemTheme,
  lang: propLang,
  viewMode: propViewMode,
  onViewModeChange,
  onContact,
}) => {
  const [lang, setLang] = useState<'en' | 'fr'>(propLang || 'fr');
  // Map external viewMode to internal
  const initialViewMode = propViewMode === 'gallery' ? 'gallery' : 'caseStudy';
  const [viewMode, setViewModeInternal] = useState<'caseStudy' | 'gallery'>(initialViewMode);
  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = propViewMode === 'executive' ? 'executive' : (propViewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);

  // Sync caseStudyMode when propViewMode changes from outside
  useEffect(() => {
    if (propViewMode === 'executive') {
      setCaseStudyMode('executive');
      setViewModeInternal('caseStudy');
    } else if (propViewMode === 'caseStudy') {
      setCaseStudyMode('full');
      setViewModeInternal('caseStudy');
    } else if (propViewMode === 'gallery') {
      setViewModeInternal('gallery');
    }
  }, [propViewMode]);

  // Wrapper to sync with external state
  const setViewMode = (mode: 'caseStudy' | 'gallery') => {
    setViewModeInternal(mode);
    if (onViewModeChange) {
      onViewModeChange(mode === 'gallery' ? 'gallery' : 'caseStudy');
    }
  };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  void FRANCEVAE_TRANSLATIONS[lang];
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
    if (!containerRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(containerRef.current, 0);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 73 + 56 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      smoothScrollTo(containerRef.current, elementPosition);
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
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery' ? 'bg-black' : (isDark ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Header - Glass effect */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          viewMode === 'gallery'
            ? 'bg-black/80'
            : (isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80')
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          {/* Left - Title - Same style as Homepage nav */}
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
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
              {/* Summary button */}
              <button
                onClick={() => { if (onViewModeChange) onViewModeChange('executive'); setViewMode('caseStudy'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {(propViewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive')) && (
                  <motion.div
                    layoutId="francevae-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  (propViewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive'))
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Résumé' : 'Summary'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Rés.' : 'Sum.'}</span>
                </span>
              </button>

              {/* Full case button */}
              <button
                onClick={() => { if (onViewModeChange) onViewModeChange('caseStudy'); setViewMode('caseStudy'); setCaseStudyMode('full'); }}
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
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Cas complet' : 'Full case'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Full' : 'Full'}</span>
                </span>
              </button>

              {/* Gallery button */}
              <button
                onClick={() => { if (onViewModeChange) onViewModeChange('gallery'); setViewMode('gallery'); }}
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
                  : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
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

      {/* Main Content */}
      {viewMode === 'caseStudy' ? (
        caseStudyMode === 'executive' ? (
          <main>
            <FranceVaeExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onViewFull={() => setCaseStudyMode('full')}
              onContact={onContact}
            />
          </main>
        ) : (
          /* Full Case Study - Complete narrative version */
          <main>
            <FranceVaeFull
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onContact={onContact}
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

      {/* Lightbox Modal - Using EnhancedLightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={ALL_MEDIA.map(item => ({
          src: item.src,
          caption: lang === 'fr' ? item.captionFr : item.caption
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="france-vae"
        updateUrl={true}
      />
    </motion.div>
  );
};

export default FranceVaePage;
