// France VAE Case Study Page

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
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      onClick={onClick}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <video src={item.src} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" muted playsInline autoPlay loop preload="metadata" />
        ) : (
          <img loading="lazy" src={item.src} alt={caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
        {caption}
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

// All media for lightbox
const ALL_MEDIA = [
  { src: '/images/francevae/france_vae_home.webp', caption: 'France VAE Homepage', captionFr: 'Page d\'accueil France VAE' },
  { src: '/images/francevae/prototype vae collective .webp', caption: 'VAE Collective - Employer Dashboard Prototype', captionFr: 'VAE Collective - Prototype Dashboard Employeur' },
  { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'VAE Collective - 4-Step Onboarding Process', captionFr: 'VAE Collective - Processus d\'onboarding en 4 étapes' },
  { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'VAE Collective - ROI & Benefits for Enterprises', captionFr: 'VAE Collective - ROI et bénéfices entreprises' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 01.webp', caption: 'Wireframe - Employer Space Home', captionFr: 'Wireframe - Accueil Espace Commanditaire' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 02.webp', caption: 'Wireframe - Program Overview', captionFr: 'Wireframe - Vue Programme' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue cohorte - 03.webp', caption: 'Wireframe - Cohort Tracking View', captionFr: 'Wireframe - Vue Suivi Cohorte' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue detail d\'une cohorte - 04.webp', caption: 'Wireframe - Individual Cohort Detail', captionFr: 'Wireframe - Détail d\'une Cohorte' },
  { src: '/images/francevae/presentation process_discovery @2x.webp', caption: 'Monthly Seasons Framework', captionFr: 'Framework Saisons Mensuelles' },
  { src: '/images/francevae/schema - equipe 01.webp', caption: 'Before: Siloed Team Structure', captionFr: 'Avant : Structure d\'équipe en silos' },
  { src: '/images/francevae/schema - equipe 02.webp', caption: 'After: Unified Contributors Model', captionFr: 'Après : Modèle contributeurs unifiés' },
  { src: '/images/francevae/presentation_process_discovery_05.webp', caption: 'Initiative Lifecycle', captionFr: 'Cycle de vie initiative' },
  { src: '/images/francevae/presentation_process_discovery_01.webp', caption: 'Roadmap Structure', captionFr: 'Structure Roadmap' },
  { src: '/images/francevae/presentation_process_discovery_02.webp', caption: 'Unified Contributors Around Shared Objectives', captionFr: 'Contributeurs unifiés autour d\'objectifs communs' },
  { src: '/images/francevae/presentation_process_discovery_03.webp', caption: 'Three-tier Framework', captionFr: 'Framework à 3 niveaux' },
  { src: '/images/francevae/presentation_process_discovery_04.webp', caption: 'Season Calendar', captionFr: 'Calendrier Saison' },
  { src: '/images/francevae/UXR - Rapport de campangne de test tableau de bord.webp', caption: 'Dashboard Test Campaign', captionFr: 'Campagne de test Tableau de bord' },
  { src: '/images/francevae/UXR - test - script candidat 01.webp', caption: 'Moderated Interview Script', captionFr: 'Script d\'entretien modéré' },
  { src: '/images/francevae/UXR - test - tableau prio.webp', caption: 'Feedback Prioritization', captionFr: 'Priorisation des retours' },
  { src: '/images/francevae/UXR - interface tableau de bord candidat.webp', caption: 'Candidate Dashboard Interface', captionFr: 'Interface Tableau de bord candidat' },
  { src: '/images/francevae/UXR - panel france vae.webp', caption: 'User Research Panel', captionFr: 'Panel Recherche Utilisateur' },
  { src: '/images/francevae/UXR - base d\'etudes.webp', caption: 'Centralized Research Knowledge Base', captionFr: 'Base de connaissances recherche centralisée' },
  { src: '/images/francevae/UXR - test - script candidat 02.webp', caption: 'Interview Script - Tasks & Scenarios', captionFr: 'Script d\'entretien - Tâches & Scénarios' },
  { src: '/images/francevae/photo atelier aap.webp', caption: 'Workshop Day 1', captionFr: 'Atelier Jour 1' },
  { src: '/images/francevae/photo atelier aap 02.webp', caption: 'Workshop Day 2', captionFr: 'Atelier Jour 2' },
  { src: '/images/francevae/atelier france vae AAP 01.webp', caption: 'Workshop Objectives & Agenda', captionFr: 'Objectifs & Programme de l\'atelier' },
  { src: '/images/francevae/animation atelier 00.webp', caption: 'Data-driven discovery', captionFr: 'Découverte data-driven' },
  { src: '/images/francevae/animation atelier 01.webp', caption: 'Six Thinking Hats', captionFr: 'Méthode des Six Chapeaux' },
  { src: '/images/francevae/proto IA - chatbot de positionnement.webp', caption: 'AI Chatbot Prototype', captionFr: 'Prototype Chatbot IA' },
  { src: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp', caption: 'AI Skills Radar', captionFr: 'Radar de compétences IA' },
  { src: '/images/francevae/workspace UX 01.webp', caption: 'Notion UX Workspace', captionFr: 'Espace Notion UX' },
  { src: '/images/francevae/workspace UX 02.webp', caption: 'Design Tasks Board', captionFr: 'Tableau des tâches design' },
  { src: '/images/francevae/workspace UX 03.webp', caption: 'Kanban Board', captionFr: 'Kanban' },
  { src: '/images/francevae/workspace UX 04.webp', caption: 'Weekly Meeting Notes', captionFr: 'Notes de réunion hebdo' },
  { src: '/images/francevae/workspace UX 05 - uxr.webp', caption: 'User Research Hub', captionFr: 'Hub Recherche Utilisateur' },
  { src: '/images/francevae/workspace UX 06 - uxr - etudes.webp', caption: 'Research Studies', captionFr: 'Études recherche' },
  { src: '/images/francevae/workspace UX 07 - uxr - annuaire.webp', caption: 'UXR Participant Directory', captionFr: 'Annuaire participants UXR' },
];

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
  const initialViewMode = propViewMode === 'gallery' ? 'gallery' : 'caseStudy';
  const [viewMode, setViewModeInternal] = useState<'caseStudy' | 'gallery'>(initialViewMode);
  const initialCaseStudyMode = propViewMode === 'executive' ? 'executive' : (propViewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);

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

  useEffect(() => {
    if (propLang) setLang(propLang);
  }, [propLang]);

  useEffect(() => {
    if (propViewMode) {
      setViewModeInternal(propViewMode === 'gallery' ? 'gallery' : 'caseStudy');
    }
  }, [propViewMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [caseStudyMode, viewMode]);

  const openLightbox = (imageSrc: string) => {
    const index = ALL_MEDIA.findIndex(m => m.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">
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
        <main>
          <div className="max-w-[960px] mx-auto px-6 py-16 md:py-24">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
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
