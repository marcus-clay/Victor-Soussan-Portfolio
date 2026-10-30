// France VAE Case Study Page

import React, { useState, useEffect, useRef } from 'react';
import { zoomable } from '@/utils/zoomable'
import { imgDims } from '@/utils/imageDimensions'
import { motion } from 'framer-motion';

import FranceVaeFull from '../../components/case-studies/FranceVaeFull';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-media active:duration-150 active:ease-out [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <video src={item.src} className="w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]" muted playsInline autoPlay loop preload="metadata" />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={caption} className="w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
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
  { src: '/images/francevae/france_vae_home.webp', caption: 'France VAE Homepage', captionFr: 'Page d’accueil France VAE' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/interface commanditaires cible@2x.webp', caption: 'VAE Collective: Employer Dashboard Interface', captionFr: 'VAE Collective\u00a0: interface du tableau de bord employeur' },
  { src: '/images/francevae/prototype vae collective .webp', caption: 'VAE Collective: Employer Dashboard Prototype', captionFr: 'VAE Collective\u00a0: prototype du tableau de bord employeur' },
  { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'VAE Collective: 4-Step Onboarding Process', captionFr: 'VAE Collective\u00a0: processus de prise en main en 4 étapes' },
  { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'VAE Collective: ROI and Benefits for Enterprises', captionFr: 'VAE Collective\u00a0: retour sur investissement et bénéfices pour les entreprises' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 01.webp', caption: 'Wireframe: Employer Space Home', captionFr: 'Wireframe\u00a0: accueil de l’espace commanditaire' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - 02.webp', caption: 'Wireframe: Program Overview', captionFr: 'Wireframe\u00a0: vue du programme' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue cohorte - 03.webp', caption: 'Wireframe: Cohort Tracking View', captionFr: 'Wireframe\u00a0: vue de suivi de cohorte' },
  { src: '/images/francevae/VAE Collective/vae collective wireframes/vae collective - espace commanditaire - vue detail d\'une cohorte - 04.webp', caption: 'Wireframe: Individual Cohort Detail', captionFr: 'Wireframe\u00a0: détail d’une cohorte' },
  { src: '/images/francevae/presentation process_discovery @2x.webp', caption: 'Monthly Seasons Framework', captionFr: 'Cadre des saisons mensuelles' },
  { src: '/images/francevae/schema - equipe 01.webp', caption: 'Before: Siloed Team Structure', captionFr: 'Avant\u00a0: structure d’équipe cloisonnée' },
  { src: '/images/francevae/schema - equipe 02.webp', caption: 'After: Unified Contributors Model', captionFr: 'Après\u00a0: modèle de contributeurs unifiés' },
  { src: '/images/francevae/presentation_process_discovery_05.webp', caption: 'Initiative Lifecycle', captionFr: 'Cycle de vie d’une initiative' },
  { src: '/images/francevae/presentation_process_discovery_01.webp', caption: 'Roadmap Structure', captionFr: 'Structure de la feuille de route' },
  { src: '/images/francevae/presentation_process_discovery_02.webp', caption: 'Unified Contributors Around Shared Objectives', captionFr: 'Contributeurs unifiés autour d’objectifs communs' },
  { src: '/images/francevae/presentation_process_discovery_03.webp', caption: 'Three-tier Framework', captionFr: 'Cadre à 3 niveaux' },
  { src: '/images/francevae/presentation_process_discovery_04.webp', caption: 'Season Calendar', captionFr: 'Calendrier d’une saison' },
  { src: '/images/francevae/UXR - Rapport de campangne de test tableau de bord.webp', caption: 'Dashboard Test Campaign', captionFr: 'Campagne de test du tableau de bord' },
  { src: '/images/francevae/UXR - test - script candidat 01.webp', caption: 'Moderated Interview Script', captionFr: 'Script d’entretien modéré' },
  { src: '/images/francevae/UXR - test - tableau prio.webp', caption: 'Feedback Prioritization', captionFr: 'Priorisation des retours' },
  { src: '/images/francevae/UXR - interface tableau de bord candidat.webp', caption: 'Candidate Dashboard Interface', captionFr: 'Interface du tableau de bord candidat' },
  { src: '/images/francevae/UXR - panel france vae.webp', caption: 'User Research Panel', captionFr: 'Panel de recherche utilisateur' },
  { src: '/images/francevae/UXR - base d\'etudes.webp', caption: 'Centralized Research Knowledge Base', captionFr: 'Base de connaissances de recherche centralisée' },
  { src: '/images/francevae/UXR - test - script candidat 02.webp', caption: 'Interview Script: Tasks and Scenarios', captionFr: 'Script d’entretien\u00a0: tâches et scénarios' },
  { src: '/images/francevae/photo atelier aap.webp', caption: 'Workshop Day 1', captionFr: 'Atelier, jour 1' },
  { src: '/images/francevae/photo atelier aap 02.webp', caption: 'Workshop Day 2', captionFr: 'Atelier, jour 2' },
  { src: '/images/francevae/atelier france vae AAP 01.webp', caption: 'Workshop Objectives and Agenda', captionFr: 'Objectifs et programme de l’atelier' },
  { src: '/images/francevae/animation atelier 00.webp', caption: 'Data-driven discovery', captionFr: 'Découverte fondée sur les données' },
  { src: '/images/francevae/animation atelier 01.webp', caption: 'Six Thinking Hats', captionFr: 'Méthode des six chapeaux' },
  { src: '/images/francevae/proto IA - chatbot de positionnement.webp', caption: 'AI Chatbot Prototype', captionFr: 'Prototype de chatbot IA' },
  { src: '/images/francevae/proto IA - orientation professionnelle assistee par IA.webp', caption: 'AI Skills Radar', captionFr: 'Radar de compétences IA' },
  { src: '/images/francevae/workspace UX 01.webp', caption: 'Notion UX Workspace', captionFr: 'Espace Notion UX' },
  { src: '/images/francevae/workspace UX 02.webp', caption: 'Design Tasks Board', captionFr: 'Tableau des tâches design' },
  { src: '/images/francevae/workspace UX 03.webp', caption: 'Kanban Board', captionFr: 'Kanban' },
  { src: '/images/francevae/workspace UX 04.webp', caption: 'Weekly Meeting Notes', captionFr: 'Notes de réunion hebdomadaire' },
  { src: '/images/francevae/workspace UX 05 - uxr.webp', caption: 'User Research Hub', captionFr: 'Pôle de recherche utilisateur' },
  { src: '/images/francevae/workspace UX 06 - uxr - etudes.webp', caption: 'Research Studies', captionFr: 'Études de recherche' },
  { src: '/images/francevae/workspace UX 07 - uxr - annuaire.webp', caption: 'UXR Participant Directory', captionFr: 'Annuaire des participants de recherche' },
  // Product screens of the case study that are not shown in the narration: kept reachable here
  { src: '/images/francevae/VAE Collective/Landing page/Landing âge Entreprises@2x.webp', caption: 'VAE Collective: employer landing page', captionFr: 'VAE Collective\u00a0: page d’accueil dédiée aux entreprises' },
  { src: '/images/francevae/VAE Collective/img vae collective complete - short.webp', caption: 'VAE Collective: project page on France VAE', captionFr: 'VAE Collective\u00a0: page de lancement d’un projet sur France VAE' },
  { src: '/images/francevae/UXR - Tableau de bord candidat (Mai - Juillet 25)/UI/Candidature Catalogue.webp', caption: 'Candidate dashboard: application and certification catalog', captionFr: 'Tableau de bord candidat\u00a0: candidature et catalogue de certifications' },
  { src: '/images/francevae/Design ops/figma workspace 07@2x.webp', caption: 'Figma files organized by user journey', captionFr: 'Fichiers Figma organisés par parcours utilisateur' },
  // Homepage before and after: the two sides of the comparison slider of the case study
  { src: '/images/francevae/france_vae_home_before_2x.webp', caption: 'France VAE homepage before the redesign', captionFr: 'Page d’accueil France VAE avant la refonte' },
  { src: '/images/francevae/france_vae_home_after_2x.webp', caption: 'France VAE homepage after the redesign', captionFr: 'Page d’accueil France VAE après la refonte' },
  // Shown in the case study only as a sentence: kept reachable here
  { src: '/images/francevae/20250701 - Video ministre - revision 3\'30.mp4', caption: 'Presentation video for the Minister of Labor\'s cabinet', captionFr: 'Vidéo de présentation pour le cabinet de la Ministre du Travail' },
];

const FranceVaePage: React.FC<FranceVaePageProps> = ({
  onClose,
  systemTheme,
  lang: propLang,
  viewMode: propViewMode,
  onViewModeChange,
  onContact,
}) => {
  const [lang, setLang] = useState<'en' | 'fr'>(propLang || 'fr');
  const initialViewMode = propViewMode === 'gallery' ? 'gallery' : 'caseStudy';
  const [viewMode, setViewModeInternal] = useState<'caseStudy' | 'gallery'>(initialViewMode);

  const setViewMode = (mode: 'caseStudy' | 'gallery') => {
    setViewModeInternal(mode);
    if (onViewModeChange) {
      onViewModeChange(mode === 'gallery' ? 'gallery' : 'caseStudy');
    }
  };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Single-item list used when a clicked media is not part of ALL_MEDIA
  const [fallbackItem, setFallbackItem] = useState<{ src: string; caption: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propLang) setLang(propLang);
  }, [propLang]);

  useEffect(() => {
    if (propViewMode) {
      setViewModeInternal(propViewMode === 'gallery' ? 'gallery' : 'caseStudy');
    }
  }, [propViewMode]);

  useScrollTopOnChange(viewMode);

  const openLightbox = (imageSrc: string) => {
    const index = ALL_MEDIA.findIndex(m => m.src === imageSrc);
    if (index !== -1) {
      setFallbackItem(null);
      setLightboxIndex(index);
    } else {
      // Never a silent no-op: open the clicked media on its own
      setFallbackItem({ src: imageSrc, caption: '' });
      setLightboxIndex(0);
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">
      {viewMode === 'caseStudy' ? (
        // The layout already provides the page's <main>
        <div>
          <FranceVaeFull
            systemTheme={systemTheme}
            lang={lang}
            onImageClick={openLightbox}
            onContact={onContact}
          />
        </div>
      ) : (
        <div>
          <div className="wrap py-16 md:py-24">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {ALL_MEDIA.map((item, index) => (
                <GalleryCard
                  key={item.src}
                  item={item}
                  index={index}
                  onClick={() => { setFallbackItem(null); setLightboxIndex(index); setLightboxOpen(true); }}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={fallbackItem ? [fallbackItem] : ALL_MEDIA.map(item => ({
          src: item.src,
          type: (/\.(mp4|webm|mov)$/i.test(item.src) ? 'video' : 'image') as 'video' | 'image',
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
