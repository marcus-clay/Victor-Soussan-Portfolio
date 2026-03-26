// France VAE Case Study Page
// Displays the France VAE project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import FranceVaeExecutive from '../../components/case-studies/FranceVaeExecutive';
import FranceVaeFull from '../../components/case-studies/FranceVaeFull';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';

import { FRANCEVAE_TRANSLATIONS } from '../../data/caseStudyTranslations/franceVaeTranslations';

interface GalleryCardProps {
  item: { src: string; caption: string; captionFr: string };
  index: number;
  onClick: () => void;
  lang: 'en' | 'fr';
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick, lang }) => {
  const isVideo = item.src.match(/\.(mp4|webm|mov)$/i);
  const caption = lang === 'fr' ? item.captionFr : item.caption;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-[border-color,box-shadow,transform] duration-300 ease-out hover:scale-[1.01]">
        {isVideo ? (
          <video src={item.src} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" muted playsInline autoPlay loop preload="metadata" />
        ) : (
          <img loading="lazy" src={item.src} alt={caption} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-sm text-gray-500">
        <strong className="text-gray-700">{caption}</strong>
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
  useEffect(() => {
    const seo = PROJECT_SEO['france-vae'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('france-vae', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

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
  const containerRef = useRef<HTMLDivElement>(null);
  void FRANCEVAE_TRANSLATIONS[lang];
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
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [caseStudyMode, viewMode]);

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
    <div ref={containerRef} className={`min-h-screen ${viewMode === 'gallery' ? 'bg-white' : (isDark ? 'bg-[#0a0a0a]' : 'bg-white')}`}>
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
    </div>
  );
};

export default FranceVaePage;
