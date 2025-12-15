// Dailymotion Case Study Page - Static content with instant loading
// Displays the Dailymotion project case study with portfolio styling

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  ExternalLink,
  Play,
  Calendar,
  Briefcase,
  Layers,
  Building2
} from 'lucide-react';
import { GalleryItem, getDailymotionGalleryItems } from './BentoGallery';
import EnhancedLightbox from './src/components/EnhancedLightbox';
import DailymotionExecutive from './src/components/DailymotionExecutive';

interface DailymotionPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
}

// Translations for Dailymotion Case Study
const DAILYMOTION_TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    visitDailymotion: 'Visit Dailymotion',
    projectGallery: 'Project Gallery',
    gallery: 'Gallery',
    contactVictor: 'Contact Victor for a similar project',
    clickToZoom: 'Click to zoom',
    clickToExitZoom: 'Click to exit zoom',
    meta: {
      type: 'Product Design',
      scope: 'Platform Redesign',
      period: '2017-2018',
      company: 'Dailymotion',
    },
    nav: {
      top: 'Top',
      intro: 'Intro',
      overview: 'Overview',
      modules: 'Key Modules',
      upload: 'Upload & Management',
      live: 'Live Console',
      player: 'Player Manager',
      designSystem: 'Design System',
    },
    hero: {
      role: 'Senior Product Designer',
      scope: 'Media Management, Design System',
      period: '2017-2018',
      title: 'Empowering Dailymotion\'s Video Partners to Manage, Publish and Go Live with Confidence',
      subtitle: 'Improved media management tools for video publishers',
      description: 'Between 2017 and 2018, I was responsible for the UX and UI of Dailymotion\'s partner tool ecosystem. These web and mobile tools empowered over 30,000 content partners, including broadcasters and media publishers like France TV, CBS, and beIN Sports, to upload, edit, and livestream videos to their audiences.',
    },
    overview: {
      title: 'Overview',
      introTitle: 'Introduction',
      introDesc: 'Dailymotion was undergoing a major strategic pivot, shifting from general consumer content to repositioning itself as a premium platform for media partners. While high-profile partners were onboard, the existing platform tools were outdated, clunky, and inconsistent, hindering professional use. Thousands of videos were uploaded daily, managed from a legacy backend.',
      roleTitle: 'Role and scope',
      roleDesc: 'As Senior Product Designer for the Partner Business Unit, my role was to co-lead the full redesign. Rebuild the experience into a real control center for media operators.',
      goalsTitle: 'Strategic goals',
      goals: [
        'Rework the media manager experience upload, edition and distribution',
        'Design a new Live Dashboard for video broadcasts',
        'Rethink player and widget managers',
        'Establish a scalable design infrastructure',
      ],
    },
    modules: {
      title: 'Key Modules',
      deliveredTitle: 'Key product modules delivered',
      intro: 'The Partner Space was reorganized around three primary workflows that partners use daily. Each module was designed to work independently while sharing common patterns from the design system.',
      upload: {
        title: 'Upload & Management',
        desc: 'Redesigned upload to publication experience with batch processing and inline editing.',
      },
      live: {
        title: 'Live Console',
        desc: 'Real-time monitoring interface for live video streams with clear status indicators.',
      },
      player: {
        title: 'Player Manager',
        desc: 'Visual customization tools for embed players and playback behaviors.',
      },
    },
    upload: {
      title: 'Upload & Video Management',
      sectionTitle: 'Video Upload and Management Workflows',
      question: 'How can a media platform help publishers process, manage, and monetize thousands of videos daily?',
      intro: 'Managing large volumes of video required more than an upload button. Dailymotion\'s media partners worked with industrial-scale workflows, multiple encodes, metadata rules, ad configuration, and distribution timelines that all had to stay in sync. The objective was to design a system that made these operations fast, traceable, and intuitive. The new Upload flow introduced parallel processing with real-time progress and error visibility. Editors could queue files, edit titles or geoblocking while encoding ran, and publish once all checks passed.',
      uploadSubtitle: 'Upload',
      batchUpload: 'Batch upload interface',
      batchUploadDesc: 'Supports parallel uploads with real-time feedback. Editors can edit metadata, geoblocking, and scheduling while encoding runs.',
      interactions: 'Key interactions',
      interactionsDesc: 'Smooth microinteractions provide immediate feedback for actions like cancellation, thumbnail updates, and subtitle uploads.',
      videoManager: 'Video library',
      videoManagerDesc: 'Displays bulk media management with status indicators and batch actions. Each video card shows privacy state, timestamp, view count, and duration overlay.',
      videoLibraryTitle: 'Video Library',
      videoLibraryIntro: 'In the Video Library, hierarchy and motion replaced heavy controls. Hover actions surfaced only when needed, reducing clutter while keeping all operations one click away. The interface supported continuous publishing, users could act while data refreshed in the background, cutting idle time between uploads.',
      embedShare: 'Share & embed',
      embedShareDesc: 'Expanded share modal reveals full embed customization options with auto-generated iframe code that updates dynamically.',
    },
    live: {
      title: 'Live Streaming Console',
      sectionTitle: 'Live Management Console',
      question: 'How can a live platform compete with Twitch and Facebook while giving professionals real control?',
      intro: 'Going live brought a different kind of complexity. Operators needed to monitor performance and react instantly to encoding or audience shifts. The goal was to design a calm control surface that worked under pressure. The Live Manager structured all actions around three panels, Control, Information, and Record, matching the mental model of a live broadcast. Status changes and transitions were central: Ready > On Air > Recording > Completed. Each transition was animated with clear visual feedback to confirm that a command had been received. Metrics such as bitrate, viewers, or latency updated in place without motion noise.',
      countdown: 'Pre-broadcast countdown',
      countdownDesc: 'Displays scheduled start time with OFF AIR badge. The persistent Share button enables promotional distribution before stream begins.',
      dashboard: 'Live dashboard',
      dashboardDesc: 'Monitors active broadcasts with real-time technical metrics and viewer count. The preview pane displays current stream frame with persistent LIVE badge.',
    },
    player: {
      title: 'Player Manager',
      question: 'How do you turn player configuration into a task anyone can complete in minutes?',
      intro: 'Once uploaded and streamed, videos needed consistent playback across partner sites. The Player Manager solved this by giving non-technical users the ability to create and configure their own players. The interface focused on progressive disclosure. Users started from a simple list and expanded into detailed tabs only when required. Creating a player triggered a guided flow: define appearance, assign content, then retrieve the embed code. Subtle transitions kept context between steps, avoiding modal interruptions.',
      configurator: 'Player template configurator',
      configuratorDesc: 'Define appearance, assign content, retrieve embed code - all in one place.',
    },
    designSystem: {
      title: 'Design System',
      sectionTitle: 'Building a Scalable UI Kit',
      intro: 'To ensure coherence across the growing product suite, I led the creation of a new Design System and Component Library.',
      styles: 'Styles foundation',
      stylesDesc: 'Color, typography, and spacing tokens ensure visual coherence across the product suite.',
      components: 'Component library',
      componentsDesc: 'Reusable UI components with variants and states for scalable development.',
    },
    impact: {
      title: 'Impact',
      intro: 'The design approach delivered measurable business results. By focusing on core workflows and progressive complexity, we created tools that media partners could adopt quickly.',
      partners: '30,000+',
      partnersDesc: 'Content partners served worldwide',
      videos: '10K+',
      videosDesc: 'Videos uploaded daily through the platform',
      reduction: '-50%',
      reductionDesc: 'Upload preparation time reduction',
      components: '120+',
      componentsDesc: 'UI components shipped in design system',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Scope',
      period: 'Period',
      company: 'Company',
    },
    captions: {
      hero: 'Dailymotion Partner Platform',
      heroDesc: 'Web-based dashboard for video partners to manage, publish and go live with confidence.',
      videoManagement: 'Video Management Workflows',
      videoManagementDesc: 'Redesigned the full video management experience, from upload to publication. Introduced batch processing, inline editing, and contextual sharing actions.',
      liveDashboard: 'Live Dashboard',
      liveDashboardDesc: 'Designed the creation and monitoring interface for live video streams, ensuring real-time stats and clarity in a complex, high-pressure environment.',
      playerManager: 'Player Manager',
      playerManagerDesc: 'Redesigned the visual customization tools for embed players, allowing partners to define player themes and manage playback behaviors.',
      batchUpload: 'Batch upload',
      batchUploadDesc: 'Parallel uploads with real-time feedback. Editors can edit metadata, geoblocking, and scheduling while encoding runs. Reduces clip preparation time by 50%.',
      cancelUpload: 'Cancel Upload',
      cancelUploadDesc: 'Smooth cancellation flow with visual feedback.',
      thumbnailUpdate: 'Thumbnail update',
      thumbnailUpdateDesc: 'Upload an image and update video preview thumbnail instantly.',
      addSubtitles: 'Add subtitles',
      addSubtitlesDesc: 'Streamlined subtitle upload workflow.',
      videoLibrary: 'Video library',
      videoLibraryDesc: 'Bulk media management with status indicators and batch actions. Each video card shows privacy state, timestamp, view count, and duration overlay. Multi-select checkboxes enable batch operations on hundreds of videos.',
      embedCode: 'Embed code',
      embedCodeDesc: 'Input copy interaction and user feedback.',
      timePicker: 'Time picker',
      timePickerDesc: '12/24H switch interaction.',
      passwordProtection: 'Password protection',
      passwordProtectionDesc: 'Secure video access workflow.',
      geoblocking: 'Geoblocking',
      geoblockingDesc: 'Allow/Block video broadcasts in certain locations.',
      shareModal: 'Share modal',
      shareModalDesc: 'Full embed customization options with auto-generated iframe code that updates dynamically. Progressive disclosure keeps simple sharing lightweight while offering technical control.',
      keyboardMapping: 'Keyboard mapping',
      keyboardMappingDesc: 'Share modal specifications.',
      startTimeInput: 'Start time input',
      startTimeInputDesc: 'Keyboard input specifications.',
      addToPlaylist: 'Add to playlist',
      addToPlaylistDesc: 'Streamlined playlist management flow.',
      preBroadcast: 'Pre-broadcast countdown',
      preBroadcastDesc: 'Displays scheduled start time with OFF AIR badge. The persistent Share button enables promotional distribution before stream begins.',
      liveMonitor: 'Live dashboard',
      liveMonitorDesc: 'Monitors active broadcasts with real-time technical metrics and viewer count. The preview pane displays current stream frame with persistent LIVE badge and elapsed time. The right panel surfaces critical encoding parameters enabling technical operators to diagnose stream quality issues during high-pressure live events.',
      playerConfigurator: 'Player template configurator',
      playerConfiguratorDesc: 'Define appearance, assign content, retrieve embed code. Speed and control for editors managing dozens of templates.',
      uiKitStyles: 'UI Kit - Styles',
      uiKitStylesDesc: 'Foundation for coherent product suite across all partner tools.',
      uiKitComponents: 'UI Kit - Components',
      uiKitComponentsDesc: 'Scalable component library for consistent development.',
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    visitDailymotion: 'Visiter Dailymotion',
    projectGallery: 'Galerie du projet',
    gallery: 'Galerie',
    contactVictor: 'Contacter Victor pour un projet similaire',
    clickToZoom: 'Cliquer pour agrandir',
    clickToExitZoom: 'Cliquer pour fermer',
    meta: {
      type: 'Design Produit',
      scope: 'Refonte Plateforme',
      period: '2019-2021',
      company: 'Dailymotion',
    },
    nav: {
      top: 'Haut',
      intro: 'Intro',
      overview: 'Vue d\'ensemble',
      modules: 'Modules clés',
      upload: 'Upload & Gestion',
      live: 'Console Live',
      player: 'Gestionnaire Player',
      designSystem: 'Design System',
    },
    hero: {
      role: 'Senior Product Designer',
      scope: 'Gestion Média, Design System',
      period: '2017-2018',
      title: 'Permettre aux partenaires vidéo de Dailymotion de gérer, publier et diffuser en live en toute confiance',
      subtitle: 'Outils de gestion média améliorés pour les éditeurs vidéo',
      description: 'Entre 2017 et 2018, j\'étais responsable de l\'UX et UI de l\'écosystème d\'outils partenaires de Dailymotion. Ces outils web et mobile ont permis à plus de 30 000 partenaires de contenu, incluant des diffuseurs et éditeurs médias comme France TV, CBS et beIN Sports, d\'uploader, éditer et diffuser des vidéos en live à leurs audiences.',
    },
    overview: {
      title: 'Vue d\'ensemble',
      introTitle: 'Introduction',
      introDesc: 'Dailymotion était en plein pivot stratégique majeur, passant du contenu grand public à un repositionnement comme plateforme premium pour les partenaires médias. Bien que des partenaires de renom soient déjà à bord, les outils de la plateforme existante étaient obsolètes, peu ergonomiques et incohérents, freinant l\'usage professionnel. Des milliers de vidéos étaient uploadées quotidiennement, gérées depuis un backend legacy.',
      roleTitle: 'Rôle et périmètre',
      roleDesc: 'En tant que Senior Product Designer pour la Business Unit Partner, mon rôle était de co-piloter la refonte complète. Reconstruire l\'expérience en un véritable centre de contrôle pour les opérateurs médias.',
      goalsTitle: 'Objectifs stratégiques',
      goals: [
        'Repenser l\'expérience du gestionnaire média : upload, édition et distribution',
        'Concevoir un nouveau Dashboard Live pour les diffusions vidéo',
        'Repenser les gestionnaires de player et de widgets',
        'Établir une infrastructure design scalable',
      ],
    },
    modules: {
      title: 'Modules clés',
      deliveredTitle: 'Modules produit clés livrés',
      intro: 'Le Partner Space a été réorganisé autour de trois workflows principaux que les partenaires utilisent quotidiennement. Chaque module a été conçu pour fonctionner indépendamment tout en partageant des patterns communs du design system.',
      upload: {
        title: 'Upload & Gestion',
        desc: 'Expérience d\'upload vers publication repensée avec traitement par lot et édition inline.',
      },
      live: {
        title: 'Console Live',
        desc: 'Interface de monitoring temps réel pour les streams vidéo live avec indicateurs de statut clairs.',
      },
      player: {
        title: 'Gestionnaire Player',
        desc: 'Outils de personnalisation visuelle pour les players embed et les comportements de lecture.',
      },
    },
    upload: {
      title: 'Upload & Gestion Vidéo',
      sectionTitle: 'Workflows d\'Upload et de Gestion Vidéo',
      question: 'Comment une plateforme média peut-elle aider les éditeurs à traiter, gérer et monétiser des milliers de vidéos quotidiennement ?',
      intro: 'Gérer de gros volumes de vidéos nécessitait plus qu\'un simple bouton d\'upload. Les partenaires médias de Dailymotion travaillaient avec des workflows à l\'échelle industrielle : encodages multiples, règles de métadonnées, configuration publicitaire et calendriers de distribution devaient tous rester synchronisés. L\'objectif était de concevoir un système rendant ces opérations rapides, traçables et intuitives. Le nouveau flux d\'Upload a introduit le traitement parallèle avec une visibilité en temps réel de la progression et des erreurs. Les éditeurs pouvaient mettre des fichiers en file d\'attente, modifier les titres ou le geoblocking pendant l\'encodage, et publier une fois toutes les vérifications passées.',
      uploadSubtitle: 'Upload',
      batchUpload: 'Interface d\'upload par lot',
      batchUploadDesc: 'Supporte les uploads parallèles avec feedback en temps réel. Les éditeurs peuvent modifier les métadonnées, le geoblocking et la programmation pendant l\'encodage.',
      interactions: 'Interactions clés',
      interactionsDesc: 'Des microinteractions fluides fournissent un retour immédiat pour des actions comme l\'annulation, les mises à jour de vignettes et les uploads de sous-titres.',
      videoManager: 'Bibliothèque vidéo',
      videoManagerDesc: 'Affiche la gestion de médias en masse avec indicateurs de statut et actions par lot. Chaque carte vidéo montre l\'état de confidentialité, l\'horodatage, le nombre de vues et la durée.',
      videoLibraryTitle: 'Bibliothèque Vidéo',
      videoLibraryIntro: 'Dans la Bibliothèque Vidéo, la hiérarchie et le mouvement ont remplacé les contrôles lourds. Les actions au survol n\'apparaissaient que lorsque nécessaire, réduisant l\'encombrement tout en gardant toutes les opérations à un clic. L\'interface supportait la publication continue : les utilisateurs pouvaient agir pendant que les données se rafraîchissaient en arrière-plan, réduisant le temps mort entre les uploads.',
      embedShare: 'Partage & embed',
      embedShareDesc: 'Le modal de partage étendu révèle les options complètes de personnalisation de l\'embed avec un code iframe auto-généré qui se met à jour dynamiquement.',
    },
    live: {
      title: 'Console de Streaming Live',
      sectionTitle: 'Console de Gestion Live',
      question: 'Comment une plateforme live peut-elle concurrencer Twitch et Facebook tout en donnant aux professionnels un véritable contrôle ?',
      intro: 'Passer en live apportait une complexité différente. Les opérateurs devaient surveiller les performances et réagir instantanément aux changements d\'encodage ou d\'audience. L\'objectif était de concevoir une surface de contrôle sereine fonctionnant sous pression. Le Live Manager a structuré toutes les actions autour de trois panneaux : Contrôle, Information et Enregistrement, correspondant au modèle mental d\'une diffusion live. Les changements et transitions de statut étaient centraux : Prêt > À l\'antenne > Enregistrement > Terminé. Chaque transition était animée avec un retour visuel clair pour confirmer qu\'une commande avait été reçue. Les métriques comme le débit, les viewers ou la latence se mettaient à jour sur place sans bruit de mouvement.',
      countdown: 'Compte à rebours pré-diffusion',
      countdownDesc: 'Affiche l\'heure de démarrage programmée avec un badge OFF AIR. Le bouton Partager persistant permet la distribution promotionnelle avant le début du stream.',
      dashboard: 'Dashboard live',
      dashboardDesc: 'Surveille les diffusions actives avec des métriques techniques en temps réel et le nombre de viewers. Le panneau de prévisualisation affiche l\'image actuelle du stream avec un badge LIVE persistant.',
    },
    player: {
      title: 'Gestionnaire de Player',
      question: 'Comment transformer la configuration d\'un player en une tâche que n\'importe qui peut accomplir en quelques minutes ?',
      intro: 'Une fois uploadées et diffusées, les vidéos avaient besoin d\'une lecture cohérente sur les sites partenaires. Le Gestionnaire de Player a résolu ce problème en donnant aux utilisateurs non techniques la possibilité de créer et configurer leurs propres players. L\'interface s\'est concentrée sur la divulgation progressive. Les utilisateurs partaient d\'une liste simple et développaient des onglets détaillés uniquement si nécessaire. La création d\'un player déclenchait un flux guidé : définir l\'apparence, assigner le contenu, puis récupérer le code embed. Des transitions subtiles maintenaient le contexte entre les étapes, évitant les interruptions modales.',
      configurator: 'Configurateur de template player',
      configuratorDesc: 'Définir l\'apparence, assigner le contenu, récupérer le code embed - tout en un seul endroit.',
    },
    designSystem: {
      title: 'Design System',
      sectionTitle: 'Construire un UI Kit Scalable',
      intro: 'Pour assurer la cohérence à travers la suite produit grandissante, j\'ai dirigé la création d\'un nouveau Design System et d\'une Bibliothèque de Composants.',
      styles: 'Fondation des styles',
      stylesDesc: 'Les tokens de couleur, typographie et espacement assurent la cohérence visuelle à travers la suite produit.',
      components: 'Bibliothèque de composants',
      componentsDesc: 'Composants UI réutilisables avec variantes et états pour un développement scalable.',
    },
    impact: {
      title: 'Impact',
      intro: 'L\'approche design a produit des résultats mesurables. En se concentrant sur les workflows essentiels et la complexité progressive, nous avons créé des outils que les partenaires médias ont pu adopter rapidement.',
      partners: '30 000+',
      partnersDesc: 'Partenaires de contenu dans le monde',
      videos: '10K+',
      videosDesc: 'Vidéos uploadées quotidiennement sur la plateforme',
      reduction: '-50%',
      reductionDesc: 'Réduction du temps de préparation upload',
      components: '120+',
      componentsDesc: 'Composants UI livrés dans le design system',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Périmètre',
      period: 'Période',
      company: 'Entreprise',
    },
    captions: {
      hero: 'Plateforme Partenaires Dailymotion',
      heroDesc: 'Dashboard web permettant aux partenaires vidéo de gérer, publier et diffuser en live en toute confiance.',
      videoManagement: 'Workflows de gestion vidéo',
      videoManagementDesc: 'Refonte complète de l\'expérience de gestion vidéo, de l\'upload à la publication. Introduction du traitement par lot, de l\'édition inline et des actions de partage contextuelles.',
      liveDashboard: 'Dashboard Live',
      liveDashboardDesc: 'Conception de l\'interface de création et monitoring pour les streams vidéo live, assurant des stats en temps réel et de la clarté dans un environnement complexe et sous pression.',
      playerManager: 'Gestionnaire de Player',
      playerManagerDesc: 'Refonte des outils de personnalisation visuelle pour les players embed, permettant aux partenaires de définir des thèmes et gérer les comportements de lecture.',
      batchUpload: 'Upload par lot',
      batchUploadDesc: 'Uploads parallèles avec feedback en temps réel. Les éditeurs peuvent modifier les métadonnées, le geoblocking et la programmation pendant l\'encodage. Réduit le temps de préparation de 50%.',
      cancelUpload: 'Annuler l\'upload',
      cancelUploadDesc: 'Flux d\'annulation fluide avec retour visuel.',
      thumbnailUpdate: 'Mise à jour vignette',
      thumbnailUpdateDesc: 'Uploader une image et mettre à jour la vignette de prévisualisation instantanément.',
      addSubtitles: 'Ajouter des sous-titres',
      addSubtitlesDesc: 'Workflow d\'upload de sous-titres simplifié.',
      videoLibrary: 'Bibliothèque vidéo',
      videoLibraryDesc: 'Gestion média en masse avec indicateurs de statut et actions par lot. Chaque carte vidéo affiche l\'état de confidentialité, l\'horodatage, le nombre de vues et la durée. Les cases multi-sélection permettent des opérations par lot sur des centaines de vidéos.',
      embedCode: 'Code embed',
      embedCodeDesc: 'Interaction de copie et retour utilisateur.',
      timePicker: 'Sélecteur d\'heure',
      timePickerDesc: 'Interaction de switch 12/24H.',
      passwordProtection: 'Protection par mot de passe',
      passwordProtectionDesc: 'Workflow d\'accès vidéo sécurisé.',
      geoblocking: 'Geoblocking',
      geoblockingDesc: 'Autoriser/Bloquer les diffusions vidéo dans certaines zones.',
      shareModal: 'Modal de partage',
      shareModalDesc: 'Options complètes de personnalisation embed avec code iframe auto-généré qui se met à jour dynamiquement. La divulgation progressive garde le partage simple léger tout en offrant un contrôle technique.',
      keyboardMapping: 'Mapping clavier',
      keyboardMappingDesc: 'Spécifications du modal de partage.',
      startTimeInput: 'Input heure de début',
      startTimeInputDesc: 'Spécifications de saisie clavier.',
      addToPlaylist: 'Ajouter à la playlist',
      addToPlaylistDesc: 'Flux de gestion de playlist simplifié.',
      preBroadcast: 'Compte à rebours pré-diffusion',
      preBroadcastDesc: 'Affiche l\'heure de démarrage programmée avec un badge OFF AIR. Le bouton Partager persistant permet la distribution promotionnelle avant le début du stream.',
      liveMonitor: 'Dashboard live',
      liveMonitorDesc: 'Surveille les diffusions actives avec des métriques techniques en temps réel et le nombre de viewers. Le panneau de prévisualisation affiche l\'image actuelle du stream avec badge LIVE persistant et temps écoulé. Le panneau droit expose les paramètres d\'encodage critiques permettant aux opérateurs techniques de diagnostiquer les problèmes de qualité de stream pendant les événements live sous pression.',
      playerConfigurator: 'Configurateur de template player',
      playerConfiguratorDesc: 'Définir l\'apparence, assigner le contenu, récupérer le code embed. Rapidité et contrôle pour les éditeurs gérant des dizaines de templates.',
      uiKitStyles: 'UI Kit - Styles',
      uiKitStylesDesc: 'Fondation pour une suite produit cohérente à travers tous les outils partenaires.',
      uiKitComponents: 'UI Kit - Composants',
      uiKitComponentsDesc: 'Bibliothèque de composants scalable pour un développement cohérent.',
    },
  },
};

// Navigation sections configuration
const sections = [
  { id: 'top', label: 'Top', shortLabel: '' },
  { id: 'hero', label: 'Intro', shortLabel: '' },
  { id: 'overview', label: 'Overview', shortLabel: 'OV' },
  { id: 'modules', label: 'Key Modules', shortLabel: 'KM' },
  { id: 'upload', label: 'Upload & Management', shortLabel: 'UM' },
  { id: 'live', label: 'Live Console', shortLabel: 'LC' },
  { id: 'player', label: 'Player Manager', shortLabel: 'PM' },
  { id: 'design-system', label: 'Design System', shortLabel: 'DS' },
];

// All media (images + videos) for lightbox navigation
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_upload_2x.webp', captionKey: 'videoManagement', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_livestream_2x.webp', captionKey: 'liveDashboard', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_player_template_2x.webp', captionKey: 'playerManager', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_upload2x.webp', captionKey: 'batchUpload', type: 'image' },
  { src: '/videos/dailymotion/video_-_cancel_upload.mp4', captionKey: 'cancelUpload', type: 'video' },
  { src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4', captionKey: 'thumbnailUpdate', type: 'video' },
  { src: '/videos/dailymotion/video_add_subtitle.mp4', captionKey: 'addSubtitles', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_video_manager.svg', captionKey: 'videoLibrary', type: 'image' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', captionKey: 'embedCode', type: 'video' },
  { src: '/videos/dailymotion/switch_12-24.mp4', captionKey: 'timePicker', type: 'video' },
  { src: '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4', captionKey: 'passwordProtection', type: 'video' },
  { src: '/videos/dailymotion/Geoblocking.mp4', captionKey: 'geoblocking', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_share_expanded2x.webp', captionKey: 'shareModal', type: 'image' },
  { src: '/images/dailymotion/Share_-_keyboard_input2x.webp', captionKey: 'keyboardMapping', type: 'image' },
  { src: '/images/dailymotion/image.webp', captionKey: 'startTimeInput', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp', captionKey: 'addToPlaylist', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_live_-_countdown2x.webp', captionKey: 'preBroadcast', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_livestream2x.webp', captionKey: 'liveMonitor', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_create_player2x.webp', captionKey: 'playerConfigurator', type: 'image' },
  { src: '/images/dailymotion/design_system_-_Styles2x.webp', captionKey: 'uiKitStyles', type: 'image' },
  { src: '/images/dailymotion/design_system_-_component_library2x.webp', captionKey: 'uiKitComponents', type: 'image' },
];

// Apple-style spring transition
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Slide transition for carousel
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
};

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
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
        {item.captionDesc && <span className="hidden sm:inline"> — {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

export const DailymotionPage: React.FC<DailymotionPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en'
}) => {
  const t = DAILYMOTION_TRANSLATIONS[lang];
  // Load gallery items directly in the component
  const galleryItems = getDailymotionGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>('executive');
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Motion values for parallax effect
  const dragX = useMotionValue(0);
  const parallaxX = useTransform(dragX, [-300, 0, 300], [30, 0, -30]);

  // Scroll to top when mode changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [caseStudyMode, viewMode]);

  // Track scroll position and update active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      // Show nav after scrolling past hero
      setShowNav(scrollTop > 300);

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
      // Header height (73px) + sticky mini-nav height (~56px with py-4) + padding (24px)
      const headerOffset = 73 + 56 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      containerRef.current.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Open lightbox with specific image and optional start time for videos
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setPage([index, 0]);
      setLightboxZoomed(false);
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

  // Navigate to next/previous image
  const paginate = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setLightboxIndex(newIndex);
      setPage([newIndex, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
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

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery' ? 'bg-black' : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Sticky Mini-Nav - All screen sizes - Hidden in gallery mode and executive mode */}
      <AnimatePresence>
        {showNav && viewMode !== 'gallery' && caseStudyMode !== 'executive' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-30 backdrop-blur-xl ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/80'
                : 'bg-white/80'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <div className="w-full px-6">
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full h-12 flex items-center justify-between"
              >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-blue-500`} />
                <span
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
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
                  className={systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
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
              Dailymotion
            </h1>
          </div>

          {/* Center - Toggle Switch with animated pill (compact on mobile) */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                viewMode === 'gallery' ? 'bg-white/10' : (systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100')
              }`}
            >
              {/* Executive button */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'executive' && (
                  <motion.div
                    layoutId="dailymotion-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'executive'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'En bref' : 'Summary'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Bref' : 'Sum.'}</span>
                </span>
              </button>
              {/* Full case study button */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'full' && (
                  <motion.div
                    layoutId="dailymotion-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Complet' : 'Full case'}</span>
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
                    layoutId="dailymotion-toggle-pill"
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
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                viewMode === 'gallery'
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Lightbox with mobile gestures */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type as 'image' | 'video'
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => {
          setLightboxIndex(idx);
          setPage([idx, idx > lightboxIndex ? 1 : -1]);
        }}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="dailymotion"
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
            transition={{ duration: 0.3 }}
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
            transition={{ duration: 0.3 }}
          >
            <DailymotionExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onViewFull={() => setCaseStudyMode('full')}
            />
          </motion.div>
        ) : (
          /* Full Case Study View */
          <motion.div
            key="caseStudy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
      <div className="max-w-[1480px] mx-auto px-10 py-12 md:py-16">
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-16 md:mb-24">
              {/* Logo */}
              <img loading="lazy"
                src={systemTheme === 'dark'
                  ? '/images/dailymotion/logo-dailymotion-white.svg'
                  : '/images/dailymotion/logo-dailymotion-black.svg'
                }
                alt="Dailymotion"
                className="h-8 w-auto mb-8"
              />
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

                {/* Visit Website Button */}
                <a
                  href="https://www.dailymotion.com/partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    systemTheme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ExternalLink size={16} className="mr-2" />
                  {t.visitDailymotion}
                </a>
              </div>
            </section>

            {/* Project Meta Card - Synthesis */}
            <div
              className={`p-6 rounded-3xl border mb-12 ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50'
                    }`}
                  >
                    <Layers
                      size={20}
                      className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Type
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                    }`}
                  >
                    <Briefcase
                      size={20}
                      className={systemTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Scope
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.scope}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-green-500/20' : 'bg-green-50'
                    }`}
                  >
                    <Calendar
                      size={20}
                      className={systemTheme === 'dark' ? 'text-green-400' : 'text-green-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Period
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50'
                    }`}
                  >
                    <Building2
                      size={20}
                      className={systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Company
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <figure className="mb-16 md:mb-24">
              <div
                onClick={() => openLightbox('/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp"
                  alt="Dailymotion Partner Platform Overview"
                  className="w-full h-auto"
                />
              </div>
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
                <div>
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

                {/* Role and scope */}
                <div>
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

                {/* Strategic goals */}
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
            </section>

            {/* Key Product Modules Section */}
            <section id="modules" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-8 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.modules.deliveredTitle}
              </h1>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Video Management */}
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_focus_upload_2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-video ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_focus_upload_2x.webp"
                      alt="Video Management Workflows"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.videoManagement}</strong> - {t.captions.videoManagementDesc}
                  </figcaption>
                </figure>

                {/* Live Dashboard */}
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_focus_livestream_2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-video ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_focus_livestream_2x.webp"
                      alt="Live Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.liveDashboard}</strong> - {t.captions.liveDashboardDesc}
                  </figcaption>
                </figure>

                {/* Player Manager */}
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_focus_player_template_2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-video ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_focus_player_template_2x.webp"
                      alt="Player Manager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.playerManager}</strong> - {t.captions.playerManagerDesc}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Video Upload and Management Workflows Section */}
            <section id="upload" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.sectionTitle}
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.question}
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.upload.intro}
              </p>

              {/* Upload Section */}
              <h3
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.uploadSubtitle}
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_-_upload2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_-_upload2x.webp"
                      alt="Batch upload interface"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.batchUpload}</strong> - {t.captions.batchUploadDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => {
                      const currentTime = videoRefs.current['cancel-upload']?.currentTime || 0;
                      openLightbox('/videos/dailymotion/video_-_cancel_upload.mp4', currentTime);
                    }}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      ref={(el) => { videoRefs.current['cancel-upload'] = el; }}
                      src="/videos/dailymotion/video_-_cancel_upload.mp4"
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
                    <strong>{t.captions.cancelUpload}</strong> - {t.captions.cancelUploadDesc}
                  </figcaption>
                </figure>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/video_2025-11-10_02.26.48.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/video_2025-11-10_02.26.48.mp4"
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
                    <strong>{t.captions.thumbnailUpdate}</strong> - {t.captions.thumbnailUpdateDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/video_add_subtitle.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/video_add_subtitle.mp4"
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
                    <strong>{t.captions.addSubtitles}</strong> - {t.captions.addSubtitlesDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Video Library Section */}
              <h3
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.videoLibraryTitle}
              </h3>

              <p
                className={`text-base leading-relaxed mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.upload.videoLibraryIntro}
              </p>

              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_video_manager.svg')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_video_manager.svg"
                    alt="Video library"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.videoLibrary}</strong> - {t.captions.videoLibraryDesc}
                </figcaption>
              </figure>

              {/* Video interactions */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4"
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
                    <strong>{t.captions.embedCode}</strong> - {t.captions.embedCodeDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/switch_12-24.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/switch_12-24.mp4"
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
                    <strong>{t.captions.timePicker}</strong> - {t.captions.timePickerDesc}
                  </figcaption>
                </figure>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4"
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
                    <strong>{t.captions.passwordProtection}</strong> - {t.captions.passwordProtectionDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/Geoblocking.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/Geoblocking.mp4"
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
                    <strong>{t.captions.geoblocking}</strong> - {t.captions.geoblockingDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Share modal */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_share_expanded2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_share_expanded2x.webp"
                    alt="Share modal"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.shareModal}</strong> - {t.captions.shareModalDesc}
                </figcaption>
              </figure>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/Share_-_keyboard_input2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/Share_-_keyboard_input2x.webp"
                      alt="Share modal keyboard mapping"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.keyboardMapping}</strong> - {t.captions.keyboardMappingDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/image.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/image.webp"
                      alt="Start time keyboard input"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.startTimeInput}</strong> - {t.captions.startTimeInputDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Playlist */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp"
                    alt="Add to playlist flow"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.addToPlaylist}</strong> - {t.captions.addToPlaylistDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Live Management Console Section */}
            <section id="live" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.live.sectionTitle}
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.live.question}
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.live.intro}
              </p>

              {/* Live countdown */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_live_-_countdown2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_live_-_countdown2x.webp"
                    alt="Pre-broadcast countdown"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.preBroadcast}</strong> - {t.captions.preBroadcastDesc}
                </figcaption>
              </figure>

              {/* Live dashboard */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_livestream2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_livestream2x.webp"
                    alt="Live dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.liveMonitor}</strong> - {t.captions.liveMonitorDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Player Manager Section */}
            <section id="player" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.player.title}
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.player.question}
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.player.intro}
              </p>

              {/* Player configurator */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_create_player2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_create_player2x.webp"
                    alt="Player template configurator"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.playerConfigurator}</strong> - {t.captions.playerConfiguratorDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Design System Section */}
            <section id="design-system" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.designSystem.sectionTitle}
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.designSystem.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/design_system_-_Styles2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/design_system_-_Styles2x.webp"
                      alt="UI Kit - Styles"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.uiKitStyles}</strong> - {t.captions.uiKitStylesDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/design_system_-_component_library2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/design_system_-_component_library2x.webp"
                      alt="UI Kit - Components"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.uiKitComponents}</strong> - {t.captions.uiKitComponentsDesc}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Impact Section - Toolkit style */}
            <section id="impact" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.title}
              </h1>
              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.impact.intro}
              </p>

              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.partners}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.partnersDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.videos}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.videosDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.reduction}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.reductionDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.components}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.componentsDesc}
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DailymotionPage;
