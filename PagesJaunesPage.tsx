// PagesJaunes Case Study Page - Wrapper for PagesJaunesExecutive component
// Displays the PagesJaunes project case study with portfolio styling

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { smoothScrollTo } from './src/utils/smoothScroll';
import { X, Play } from 'lucide-react';
import { GalleryItem } from './BentoGallery';
import EnhancedLightbox from './src/components/EnhancedLightbox';
import PagesJaunesExecutive from './src/components/PagesJaunesExecutive';
import PagesJaunesFull from './src/components/PagesJaunesFull';
import CaseStudyTOCSidebar from './src/components/CaseStudyTOCSidebar';

// TOC Sections for Full case study
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'overview', label: 'Overview' },
    { id: 'homepage', label: 'Homepage' },
    { id: 'search', label: 'Search Engine' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'account', label: 'Account' },
    { id: 'micro-interactions', label: 'Motion' },
    { id: 'wear', label: 'Android Wear' },
    { id: 'design-system', label: 'Design System' },
    { id: 'team', label: 'Team' },
    { id: 'impact', label: 'Impact' },
    { id: 'learnings', label: 'Learnings' }
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'overview', label: 'Aperçu' },
    { id: 'homepage', label: 'Homepage' },
    { id: 'search', label: 'Moteur' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'account', label: 'Compte' },
    { id: 'micro-interactions', label: 'Motion' },
    { id: 'wear', label: 'Android Wear' },
    { id: 'design-system', label: 'Design System' },
    { id: 'team', label: 'Équipe' },
    { id: 'impact', label: 'Impact' },
    { id: 'learnings', label: 'Apprentissages' }
  ]
};

interface PagesJaunesPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

// Gallery items for PagesJaunes
const getPagesJaunesGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] => {
  const captions = {
    en: {
      homepage: 'Conversational Homepage',
      homepageDesc: 'A friendly greeting ("What do you need today?") reframes search from directory lookup to problem-solving.',
      homepageVariations: 'Contextual Hero Images',
      homepageVariationsDesc: 'Eight variations featuring local pros: baker, mechanic, florist. Each builds trust by showing the human behind the service.',
      ipadVariations: 'Responsive Hero Strategy',
      ipadVariationsDesc: 'Hero images across iPhone 4, Retina, iPad, Android phone/tablet. Auto-detection of focal point with viewport-adaptive cropping. With Alexandre Badie, Android lead.',
      androidHomepage: 'Android Material Homepage',
      androidHomepageDesc: 'Material Design adapted to PagesJaunes brand. The yellow search bar signals action and creates visual continuity.',
      ipadHomepage: 'iPad Split-View Homepage',
      ipadHomepageDesc: 'Split-view respects the user\'s mental model: browse categories on the left, take action on the right.',
      artDirectionBefore: 'Art Direction: Before',
      artDirectionBeforeDesc: 'Raw photo. The subject competes with distracting background elements.',
      artDirectionAfter: 'Art Direction: After',
      artDirectionAfterDesc: 'Strategic cropping and color grading. Focus shifts to the craftsman\'s expertise.',
      searchFlow: 'Search to Listing Flow',
      searchFlowDesc: 'From query to listing in three taps. Autocomplete reduces cognitive load, location context eliminates redundant input.',
      searchPrototype: 'Search Engine Prototype',
      searchPrototypeDesc: 'Material Design activity transitions with shared element animations. Search bar transforms into full-screen results.',
      accountFlow: 'Login & Account Flow',
      accountFlowDesc: 'Social login reduces friction by 60%. Email/password fallback preserved for users who prefer traditional auth.',
      engagement: 'History & Favorites',
      engagementDesc: 'History and Favorites turn one-time searches into retained value. Each saved business is a reason to return.',
      mapsSystem: 'Transit System Components',
      mapsSystemDesc: 'Metro line colors, station names, walking segments: all parsed from Mappy API and styled for quick scanning.',
      mapsMultidevice: 'Multi-device Navigation',
      mapsMultideviceDesc: 'One journey, three modes: walk, drive, transit. The interface adapts to the user\'s choice.',
      iphoneItinerary: 'iPhone Navigation Flows',
      iphoneItineraryDesc: 'Three flows: route sheet, map preview, transit breakdown. Each screen answers a different user question.',
      ipadItinerary: 'iPad Itinerary Split-View',
      ipadItineraryDesc: 'Map context on the left, turn-by-turn on the right. Both visible, no tab switching needed.',
      tooltipRedesign: 'Tooltip Redesign',
      tooltipRedesignDesc: 'Contextual tooltips guide feature discovery. Clear visual hierarchy, minimal disruption to the flow.',
      wearFlows: 'Android Wear Task Flows',
      wearFlowsDesc: 'Wearable task flows: search then call, or search then navigate. Two jobs, two paths, minimal taps.',
      wearUiModes: 'Wear Regular & Ambient Modes',
      wearUiModesDesc: 'Regular mode uses high-contrast yellow. Ambient mode switches to monochrome for battery efficiency.',
      wearUi: 'Wear Component System',
      wearUiDesc: 'Complete Android Wear pattern library: loading states, launcher, home, results, detail cards, action buttons.',
      wearFlowsDetailed: 'Wear User Task Flows',
      wearFlowsDetailedDesc: 'User task flows mapped: "Find a restaurant and call" or "Find a restaurant and navigate." Each path optimized.',
      wearComponents: 'Wear Micro-UI Patterns',
      wearComponentsDesc: 'Micro-UI pattern library: cards, CTAs, status indicators. Every element earns its pixel on a 280dp screen.',
      wearAmbient: 'Wear Ambient Mode',
      wearAmbientDesc: 'White outlines on black. Battery-conscious and still functional for at-a-glance information.',
      wearSketches: 'Early Wireframe Sketches',
      wearSketchesDesc: 'Early wireframe sketches for the reminder flow. User can set a reminder after calling a business.',
      wearDevSession: 'Real Device Testing',
      wearDevSessionDesc: 'Testing session with Thibault Fighiera. Two watches connected, smartphone synced, iterating in real-time.',
      wearInsituStore: 'Google Play Store Visual',
      wearInsituStoreDesc: 'Promotional visual for Google Play Store. Watch mockup on PagesJaunes yellow background.',
      wearInsituDetail: 'Business Detail In-situ',
      wearInsituDetailDesc: 'Business detail card in context. Key info hierarchy: name, category, status, rating, phone, address.',
      wearPrototypeVideo: 'Working Prototype Demo',
      wearPrototypeVideoDesc: 'Working prototype on real hardware. Full flow from app launch to business detail to phone call handoff.',
      desktopReview: 'Desktop Review Editing',
      desktopReviewDesc: 'Web interface for review editing. Multi-criteria ratings with star system, pros/cons fields, rich text support.',
      iosOnboarding: 'iOS Onboarding Animation',
      iosOnboardingDesc: 'Non-blocking animations at first launch. CAAnimation for smooth walkthrough sequences.',
      androidOnboarding: 'Android Onboarding Animation',
      androidOnboardingDesc: 'Material Design onboarding with Activity transitions. Coordinated motion specs.',
    },
    fr: {
      homepage: 'Homepage Conversationnelle',
      homepageDesc: 'Une accroche amicale ("De quoi avez-vous besoin ?") transforme la recherche d\'annuaire en résolution de problème.',
      homepageVariations: 'Visuels Héros Contextuels',
      homepageVariationsDesc: 'Huit variations avec des pros locaux : boulanger, garagiste, fleuriste. Chacun crée la confiance.',
      ipadVariations: 'Stratégie Visuels Responsive',
      ipadVariationsDesc: 'Visuels héros sur iPhone 4, Retina, iPad, Android phone/tablet. Détection auto du point focal avec recadrage adapté au viewport. Avec Alexandre Badie, lead dev Android.',
      androidHomepage: 'Homepage Android Material',
      androidHomepageDesc: 'Material Design adapté à la marque PagesJaunes. La barre jaune signale l\'action et crée une continuité visuelle.',
      ipadHomepage: 'Homepage iPad Split-View',
      ipadHomepageDesc: 'Le split-view respecte le modèle mental : parcourir à gauche, agir à droite.',
      artDirectionBefore: 'Direction Artistique : Avant',
      artDirectionBeforeDesc: 'Photo brute. Le sujet entre en concurrence avec les éléments de fond distrayants.',
      artDirectionAfter: 'Direction Artistique : Après',
      artDirectionAfterDesc: 'Cadrage stratégique et étalonnage couleur. Le focus se déplace vers l\'expertise de l\'artisan.',
      searchFlow: 'Flow Recherche vers Fiche',
      searchFlowDesc: 'De la requête à la fiche en trois taps. L\'autocomplétion réduit la charge cognitive.',
      searchPrototype: 'Prototype Moteur de Recherche',
      searchPrototypeDesc: 'Transitions Activity Material Design avec animations d\'éléments partagés. La barre de recherche se transforme en résultats.',
      accountFlow: 'Flow Login & Compte',
      accountFlowDesc: 'La connexion sociale réduit la friction de 60%. Le fallback email/mot de passe est conservé.',
      engagement: 'Historique & Favoris',
      engagementDesc: 'Historique et Favoris transforment les recherches ponctuelles en valeur conservée.',
      mapsSystem: 'Composants Transports',
      mapsSystemDesc: 'Couleurs des lignes de métro, noms de stations, segments piétons : parsés depuis l\'API Mappy.',
      mapsMultidevice: 'Navigation Multi-appareil',
      mapsMultideviceDesc: 'Un trajet, trois modes : marche, voiture, transports. L\'interface s\'adapte au choix de l\'utilisateur.',
      iphoneItinerary: 'Flows Navigation iPhone',
      iphoneItineraryDesc: 'Trois flows : feuille de route, aperçu carte, détail transports.',
      ipadItinerary: 'Itinéraire iPad Split-View',
      ipadItineraryDesc: 'Contexte carte à gauche, guidage pas-à-pas à droite. Tout visible, pas besoin de changer d\'onglet.',
      tooltipRedesign: 'Refonte Tooltips',
      tooltipRedesignDesc: 'Tooltips contextuels pour guider la découverte des features. Hiérarchie visuelle claire, perturbation minimale.',
      wearFlows: 'Flows Android Wear',
      wearFlowsDesc: 'Flows wearable : recherche puis appel, ou recherche puis navigation. Deux jobs, minimum de taps.',
      wearUiModes: 'Modes Normal & Ambiant Wear',
      wearUiModesDesc: 'Le mode normal utilise un jaune à fort contraste. Le mode ambiant passe en monochrome.',
      wearUi: 'Système Composants Wear',
      wearUiDesc: 'Bibliothèque patterns Android Wear complète : chargement, launcher, home, résultats, fiches, actions.',
      wearFlowsDetailed: 'Flows Utilisateur Wear',
      wearFlowsDetailedDesc: 'Cartographie des flux : "Trouver un resto et appeler" ou "Trouver un resto et y aller." Chaque chemin optimisé.',
      wearComponents: 'Patterns Micro-UI Wear',
      wearComponentsDesc: 'Bibliothèque de patterns micro-UI : cartes, CTAs, indicateurs de statut. Chaque élément mérite son pixel.',
      wearAmbient: 'Mode Ambiant Wear',
      wearAmbientDesc: 'Contours blancs sur noir. Économe en batterie et toujours fonctionnel pour l\'information rapide.',
      wearSketches: 'Sketches Wireframes',
      wearSketchesDesc: 'Wireframes précoces du flow rappel. L\'utilisateur peut programmer un rappel après avoir appelé un commerce.',
      wearDevSession: 'Test sur Device Réel',
      wearDevSessionDesc: 'Session de test avec Thibault Fighiera. Deux montres connectées, smartphone sync, itérations en temps réel.',
      wearInsituStore: 'Visuel Google Play Store',
      wearInsituStoreDesc: 'Visuel promo pour Google Play Store. Mockup montre sur fond jaune PagesJaunes.',
      wearInsituDetail: 'Fiche Pro en Contexte',
      wearInsituDetailDesc: 'Fiche détail pro en contexte. Hiérarchie d\'info : nom, catégorie, statut, note, tel, adresse.',
      wearPrototypeVideo: 'Démo Prototype Fonctionnel',
      wearPrototypeVideoDesc: 'Prototype fonctionnel sur hardware réel. Flow complet du lancement app jusqu\'au handoff appel téléphone.',
      desktopReview: 'Édition Avis Desktop',
      desktopReviewDesc: 'Interface web pour l\'édition d\'avis. Notes multi-critères avec étoiles, champs pour/contre, texte enrichi.',
      iosOnboarding: 'Animation Onboarding iOS',
      iosOnboardingDesc: 'Animations non-bloquantes au premier lancement. CAAnimation pour des séquences fluides.',
      androidOnboarding: 'Animation Onboarding Android',
      androidOnboardingDesc: 'Onboarding Material Design avec transitions Activity. Specs motion coordonnées.',
    }
  };

  const t = captions[lang];

  return [
    // Homepage
    {
      src: '/images/pagesjaunes/pagesjaunes homepage.webp',
      type: 'image',
      caption: t.homepage,
      captionDesc: t.homepageDesc
    },
    {
      src: '/images/pagesjaunes/pagesjaunes homepage - variations.webp',
      type: 'image',
      caption: t.homepageVariations,
      captionDesc: t.homepageVariationsDesc
    },
    {
      src: '/images/pagesjaunes/pj 01@2x.webp',
      type: 'image',
      caption: t.androidHomepage,
      captionDesc: t.androidHomepageDesc
    },
    {
      src: '/images/pagesjaunes/pagesjaunes hp ipad.webp',
      type: 'image',
      caption: t.ipadHomepage,
      captionDesc: t.ipadHomepageDesc
    },
    {
      src: '/images/pagesjaunes/pagesjaunes hp ipad variations.webp',
      type: 'image',
      caption: t.ipadVariations,
      captionDesc: t.ipadVariationsDesc
    },
    // Art Direction
    {
      src: '/images/pagesjaunes/pj 02@2x.webp',
      type: 'image',
      caption: t.artDirectionBefore,
      captionDesc: t.artDirectionBeforeDesc
    },
    {
      src: '/images/pagesjaunes/pj 03@2x.webp',
      type: 'image',
      caption: t.artDirectionAfter,
      captionDesc: t.artDirectionAfterDesc
    },
    // Search & Account
    {
      src: '/images/pagesjaunes/pj 04@2x.webp',
      type: 'image',
      caption: t.searchFlow,
      captionDesc: t.searchFlowDesc
    },
    {
      src: '/images/pagesjaunes/2020_NES_moteur_Android_img.mp4',
      type: 'video',
      caption: t.searchPrototype,
      captionDesc: t.searchPrototypeDesc
    },
    {
      src: '/images/pagesjaunes/pj 05@2x.webp',
      type: 'image',
      caption: t.accountFlow,
      captionDesc: t.accountFlowDesc
    },
    {
      src: '/images/pagesjaunes/pj 06@2x.webp',
      type: 'image',
      caption: t.engagement,
      captionDesc: t.engagementDesc
    },
    // Maps & Navigation
    {
      src: '/images/pagesjaunes/pj 07@2x.webp',
      type: 'image',
      caption: t.mapsSystem,
      captionDesc: t.mapsSystemDesc
    },
    {
      src: '/images/pagesjaunes/pj 08@2x.webp',
      type: 'image',
      caption: t.mapsMultidevice,
      captionDesc: t.mapsMultideviceDesc
    },
    {
      src: '/images/pagesjaunes/pagejaunes itineraire iphone.webp',
      type: 'image',
      caption: t.iphoneItinerary,
      captionDesc: t.iphoneItineraryDesc
    },
    {
      src: '/images/pagesjaunes/pagejaunes itineraire ipad.webp',
      type: 'image',
      caption: t.ipadItinerary,
      captionDesc: t.ipadItineraryDesc
    },
    // Tooltip Redesign
    {
      src: '/images/pagesjaunes/pagejaunes tooltip redesign.webp',
      type: 'image',
      caption: t.tooltipRedesign,
      captionDesc: t.tooltipRedesignDesc
    },
    // Android Wear
    {
      src: '/images/pagesjaunes/Android wear/pj android wear flows.webp',
      type: 'image',
      caption: t.wearFlows,
      captionDesc: t.wearFlowsDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/pj android wear ui modes.webp',
      type: 'image',
      caption: t.wearUiModes,
      captionDesc: t.wearUiModesDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/pj android wear ui.webp',
      type: 'image',
      caption: t.wearUi,
      captionDesc: t.wearUiDesc
    },
    {
      src: '/images/pagesjaunes/pj 09@2x.webp',
      type: 'image',
      caption: t.wearFlowsDetailed,
      captionDesc: t.wearFlowsDetailedDesc
    },
    {
      src: '/images/pagesjaunes/pj 10@2x.webp',
      type: 'image',
      caption: t.wearComponents,
      captionDesc: t.wearComponentsDesc
    },
    {
      src: '/images/pagesjaunes/pj 11@2x.webp',
      type: 'image',
      caption: t.wearAmbient,
      captionDesc: t.wearAmbientDesc
    },
    // Android Wear Additional Assets
    {
      src: '/images/pagesjaunes/Android wear/IMG_20151016_105901.webp',
      type: 'image',
      caption: t.wearSketches,
      captionDesc: t.wearSketchesDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/Android Wear - ambient mode sketches.webp',
      type: 'image',
      caption: t.wearAmbient,
      captionDesc: t.wearAmbientDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/Android Wear UI and Interactions.webp',
      type: 'image',
      caption: t.wearFlowsDetailed,
      captionDesc: t.wearFlowsDetailedDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/android_wear_design_02.webp',
      type: 'image',
      caption: t.wearComponents,
      captionDesc: t.wearComponentsDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/android_wear_insitu_store_01.webp',
      type: 'image',
      caption: t.wearInsituStore,
      captionDesc: t.wearInsituStoreDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/maquette_insitu_FD_03 (1).webp',
      type: 'image',
      caption: t.wearInsituDetail,
      captionDesc: t.wearInsituDetailDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/IMG_20151214_183749.webp',
      type: 'image',
      caption: t.wearDevSession,
      captionDesc: t.wearDevSessionDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/VID_20151202_184124.mp4',
      type: 'video',
      caption: t.wearPrototypeVideo,
      captionDesc: t.wearPrototypeVideoDesc
    },
    // Desktop Review
    {
      src: '/images/pagesjaunes/24_06_2015_avis_edition.webp',
      type: 'image',
      caption: t.desktopReview,
      captionDesc: t.desktopReviewDesc
    },
    // Onboarding Videos
    {
      src: '/images/pj-ios-app-onboarding-animation.mp4',
      type: 'video',
      caption: t.iosOnboarding,
      captionDesc: t.iosOnboardingDesc
    },
    {
      src: '/images/pj-and-app-onboarding-animation.mp4',
      type: 'video',
      caption: t.androidOnboarding,
      captionDesc: t.androidOnboardingDesc
    }
  ];
};

// All images for lightbox - includes gallery items + additional images from case studies
const getAllImages = (lang: 'en' | 'fr') => {
  const items = getPagesJaunesGalleryItems(lang);
  const galleryImages = items.map(item => ({
    src: item.src,
    type: item.type || 'image',
    caption: `${item.caption} - ${item.captionDesc || ''}`
  }));

  // Additional images used in Full case study and Executive that aren't in gallery
  const additionalImages = [
    { src: '/images/thumbnail_pagesjaunes_sp_tablette.webp', type: 'image', caption: 'PagesJaunes Mobile Apps' },
    { src: '/images/thumbnail-pagesjaunes-multidevices.webp', type: 'image', caption: 'PagesJaunes Multi-devices' },
    // Itinerary images with special characters - need both encoded and regular versions
    { src: '/images/pagesjaunes/pj_ipad_itinéraire_piéton.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire piéton iPad' : 'iPad Pedestrian Route' },
    { src: '/images/pagesjaunes/pj_ipad_itinéraire_transports.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire transports iPad' : 'iPad Transit Route' },
    { src: '/images/pagesjaunes/pj_ipad_itinéraire_voiture.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire voiture iPad' : 'iPad Driving Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_piéton.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire piéton iPhone' : 'iPhone Pedestrian Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_transports.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire transports iPhone' : 'iPhone Transit Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_voiture.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire voiture iPhone' : 'iPhone Driving Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_piéton_ficheroute.webp', type: 'image', caption: lang === 'fr' ? 'Fiche route piéton iPhone' : 'iPhone Pedestrian Route Sheet' },
    { src: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp', type: 'image', caption: lang === 'fr' ? 'Stratégie Design System Yellowstrap' : 'Yellowstrap Design System Strategy' },
  ];

  // Combine and deduplicate by src
  const allImages = [...galleryImages];
  additionalImages.forEach(img => {
    if (!allImages.some(existing => existing.src === img.src)) {
      allImages.push(img);
    }
  });

  return allImages;
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
        className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-yellow-500/20"
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

export const PagesJaunesPage: React.FC<PagesJaunesPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
  onNavigateToProject,
}) => {
  const galleryItems = getPagesJaunesGalleryItems(lang);
  const allImages = getAllImages(lang);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);
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

  // Open lightbox with specific image
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Image not in list - open lightbox with a single image
      console.warn('Image not found in lightbox list:', imageSrc);
      // Still open lightbox at first image as fallback
      setLightboxIndex(0);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[60] ${
        viewMode === 'gallery'
          ? 'bg-black'
          : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          viewMode === 'gallery'
            ? 'bg-black/80'
            : (systemTheme === 'dark' ? 'bg-[#0a0a0a]/80' : 'bg-white/80')
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          {/* Left - Title */}
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
                viewMode === 'gallery' ? 'text-white' : (systemTheme === 'dark' ? 'text-white' : 'text-gray-900')
              }`}
            >
              PagesJaunes
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
                    layoutId="pagesjaunes-toggle-pill"
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
                    layoutId="pagesjaunes-toggle-pill"
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
                    layoutId="pagesjaunes-toggle-pill"
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

      {/* Main content */}
      <div
        ref={containerRef}
        className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          {viewMode === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-full bg-black"
            >
              <div className="max-w-[1600px] mx-auto px-6 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  {lang === 'fr' ? 'Galerie du projet' : 'Project Gallery'}
                </h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8">
                  {galleryItems.map((item, idx) => (
                    <GalleryCard
                      key={item.src}
                      item={item}
                      index={idx}
                      onClick={() => openLightbox(item.src)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : caseStudyMode === 'executive' ? (
            <motion.div
              key="executive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PagesJaunesExecutive
                systemTheme={systemTheme}
                lang={lang}
                onImageClick={(src) => openLightbox(src)}
                onViewFull={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                onContact={onContact}
              />
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PagesJaunesFull
                systemTheme={systemTheme}
                lang={lang}
                onImageClick={(src) => openLightbox(src)}
                onContact={onContact}
                onNavigateToProject={onNavigateToProject}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type as 'image' | 'video'
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="pagesjaunes"
      />
    </motion.div>
  );
};

export default PagesJaunesPage;
