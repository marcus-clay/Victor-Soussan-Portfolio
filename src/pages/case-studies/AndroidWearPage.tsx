// Android Wear Case Study Page - Standalone case study for PagesJaunes Android Wear
// A focused deep-dive into the wearable design project

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '../../utils/smoothScroll';
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
import { GalleryItem } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';

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
      sketches: 'Early Wireframes',
      sketchesDesc: 'Before opening Sketch, I explored dozens of layout options on paper. This rapid iteration revealed which information hierarchy worked best for a 280dp circular display.',
      ambient: 'Ambient Mode Mapping',
      ambientDesc: 'Each active screen needed a low-power equivalent. White outlines on black preserved battery life while keeping users oriented when they glanced at their wrist.',
      flows: 'User Task Flows',
      flowsDesc: 'Two optimized journeys: find-and-call for urgent needs, find-and-navigate for discovery. Every tap counted on a screen this constrained.',
      uiModes: 'Active vs Ambient States',
      uiModesDesc: 'Brand yellow delivered instant recognition in active mode. The ambient state stripped to monochrome essentials, extending battery life by hours.',
      components: 'Component Library',
      componentsDesc: 'Full documentation covering both round and square watch variants. This became the single source of truth for our two-person team.',
    },
    implementation: {
      title: 'Implementation',
      devSession: 'Pair Programming Sessions',
      devSessionDesc: 'Daily working sessions with developer Thibault Fighiera. Two watches connected, iterating on actual builds instead of static mockups.',
      prototype: 'Search Flow Demo',
      prototypeDesc: 'The complete search journey captured on real hardware. From voice input to business card display.',
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
      title: 'Un projet montre connectée en cours ?',
      button: 'Me contacter',
    },
    meta: {
      type: 'App Montre Connectée',
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
      subtitle: 'Concevoir une expérience de recherche locale lisible d\'un coup d\'œil pour Android Wear',
      description: 'Un sprint design de deux mois pour porter l\'annuaire local leader en France sur les montres connectées. En binôme serré avec le développeur Android Thibault Fighiera, nous avons livré une app Android Wear complète du concept au Google Play.',
    },
    testimonial: {
      quote: 'Victor a conçu une expérience montre connectée complète en partant de zéro en deux mois. Sa capacité à comprendre les contraintes d\'une nouvelle plateforme et à les traduire en un langage design cohérent était impressionnante.',
      author: 'Thibault Fighiera',
      role: 'Développeur Android @ PagesJaunes',
    },
    overview: {
      title: 'Vue d\'ensemble',
      contextTitle: 'Le Contexte',
      contextDesc: 'PagesJaunes voulait expérimenter avec les montres connectées. Android Wear émergeait comme plateforme, et nous avons vu une opportunité d\'aider les utilisateurs à trouver des pros locaux de la manière la plus contextuelle : directement depuis leur poignet.',
      challengeTitle: 'Le Défi',
      challengeDesc: 'Concevoir une expérience de recherche locale complète pour un écran circulaire de 280dp. Les utilisateurs devaient trouver des commerces, voir les infos clés, et agir (appeler ou naviguer) en secondes, pas en minutes.',
      roleTitle: 'Mon Rôle',
      roleDesc: 'J\'ai piloté tout le processus de design : recherche utilisateur, création de profils types, croquis, maquettes fil de fer, design d\'interface, spécifications d\'interaction, prototypage, et présentations aux décideurs. En binôme avec notre développeur pour itérer rapidement.',
    },
    persona: {
      title: 'Scénario Utilisateur',
      scenario: '"Il est midi, Julien a faim. Il veut trouver rapidement un resto près du bureau et s\'y faire guider."',
      name: 'Julien, 25 ans',
      context: 'Pro occupé, toujours en mouvement. Utilise son téléphone pour tout mais veut un accès plus rapide aux tâches courantes. Adepte des nouvelles technologies.',
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
          desc: 'Plongée dans les recommandations Android Wear. Comprendre les contraintes : écrans circulaires, mode ambiant, saisie vocale, relais vers le téléphone.',
        },
        {
          title: 'Définir les Parcours',
          desc: 'Deux parcours utilisateur principaux : "Trouver et Appeler" et "Trouver et Naviguer." Chaque chemin optimisé pour un minimum d\'interactions et une clarté maximale.',
        },
        {
          title: 'Concevoir pour la Lisibilité Instantanée',
          desc: 'Chaque écran devait communiquer son propos en moins de 2 secondes. La hiérarchie d\'information est devenue critique sur un écran de 280dp.',
        },
        {
          title: 'Itérer sur du Vrai Matériel',
          desc: 'Sessions hebdomadaires avec de vraies montres. Tester avec des contraintes réelles a révélé des problèmes que les maquettes ne pouvaient pas montrer.',
        },
      ],
    },
    features: {
      title: 'Ce qu\'on a construit',
      items: [
        'UI en cartes avec notes, statut et CTA contact',
        'Deux parcours utilisateur optimisés : recherche→appel et recherche→navigation',
        'Mode normal (jaune haut contraste) et mode ambiant (monochrome)',
        'Intégration recherche vocale "Ok Google"',
        'Relais vers le téléphone pour appels et navigation Google Maps',
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
        'Support de présentation aux décideurs',
      ],
    },
    process: {
      title: 'Process Design',
      sketches: 'Wireframes Papier',
      sketchesDesc: 'Avant d\'ouvrir Sketch, j\'ai exploré des dizaines d\'options de layout sur papier. Cette itération rapide a révélé quelle hiérarchie d\'information fonctionnait sur un écran circulaire de 280dp.',
      ambient: 'Mapping Mode Ambiant',
      ambientDesc: 'Chaque écran actif nécessitait un équivalent basse consommation. Des contours blancs sur fond noir préservaient la batterie tout en gardant les utilisateurs orientés.',
      flows: 'Parcours Utilisateur',
      flowsDesc: 'Deux trajectoires optimisées : trouver-et-appeler pour l\'urgence, trouver-et-naviguer pour la découverte. Chaque tap comptait sur un écran aussi contraint.',
      uiModes: 'États Actif vs Ambiant',
      uiModesDesc: 'Le jaune PagesJaunes assurait une reconnaissance instantanée en mode actif. L\'état ambiant se réduisait à l\'essentiel monochrome, prolongeant la batterie de plusieurs heures.',
      components: 'Bibliothèque Composants',
      componentsDesc: 'Documentation complète couvrant les variantes de montres rondes et carrées. Cette bibliothèque est devenue la source de vérité pour notre équipe de deux.',
    },
    implementation: {
      title: 'Implémentation',
      devSession: 'Sessions en Binôme',
      devSessionDesc: 'Sessions de travail quotidiennes avec le développeur Thibault Fighiera. Deux montres connectées, itérant sur des versions réelles plutôt que des maquettes statiques.',
      prototype: 'Démo Parcours Recherche',
      prototypeDesc: 'Le parcours de recherche complet capturé sur du vrai matériel. De la saisie vocale à l\'affichage de la fiche commerce.',
    },
    result: {
      title: 'Résultat',
      items: [
        {
          value: '2 mois',
          label: 'Du concept au Google Play',
        },
        {
          value: '2 parcours',
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
      sketchesDesc: 'Before opening Sketch, I explored dozens of layout options on paper. This rapid iteration revealed which information hierarchy worked best for a 280dp circular display.',
      ambient: 'Ambient Mode Mapping',
      ambientDesc: 'Each active screen needed a low-power equivalent. White outlines on black preserved battery life while keeping users oriented when they glanced at their wrist.',
      ambientDesign: 'Ambient Mode Design',
      ambientDesignDesc: 'Final ambient mode specifications. Monochrome outlines preserve battery while maintaining brand recognition.',
      flows: 'User Task Flows',
      flowsDesc: 'Two optimized journeys: find-and-call for urgent needs, find-and-navigate for discovery. Every tap counted on a screen this constrained.',
      flowsDetailed: 'UI and Interactions',
      flowsDetailedDesc: 'The complete interaction model showing how watch actions hand off to phone for calls and navigation. Seamless transitions were critical for perceived speed.',
      uiModes: 'Active vs Ambient States',
      uiModesDesc: 'Brand yellow delivered instant recognition in active mode. The ambient state stripped to monochrome essentials, extending battery life by hours.',
      ui: 'Screen Inventory',
      uiDesc: 'A systematic catalog of every screen state, ensuring design consistency across the compact wearable experience.',
      components: 'Component Library',
      componentsDesc: 'Full documentation covering both round and square watch variants. This became the single source of truth for our two-person team.',
      insituStore: 'Google Play Presence',
      insituStoreDesc: 'The promotional asset for Play Store listing. First impressions matter when users are browsing new wearable experiences.',
      insituDetail: 'Contextual Preview',
      insituDetailDesc: 'Showing the business detail card on an actual wrist helps stakeholders understand the real-world reading conditions we designed for.',
      storeSubmission: 'Play Store Submission',
      storeSubmissionDesc: 'Internal communication for app launch. Marketing assets and store listing materials ready for publication.',
      devSession: 'Pair Programming Sessions',
      devSessionDesc: 'Daily working sessions with developer Thibault Fighiera. Two watches connected, iterating on actual builds instead of static mockups.',
      designWork: 'Design in Progress',
      designWorkDesc: 'Keynote served as my rapid prototyping tool. Quick to iterate, easy to share, and precise enough for production handoff.',
      designDetail: 'On-Device Verification',
      designDetailDesc: 'Nothing replaces checking designs on the actual hardware. Screen reflections, viewing angles, and touch targets only reveal themselves in context.',
      prototypeVideo: 'Search Flow Demo',
      prototypeVideoDesc: 'The complete search journey captured on real hardware. From voice input to business card display.',
      navVideo: 'Navigation Handoff',
      navVideoDesc: 'Demonstrating the seamless transition from watch to phone when the user requests directions.',
      screenLoading: 'Loading State',
      screenLoadingDesc: 'Minimalist loading indicator on brand yellow.',
      screenTime: 'Watch Face',
      screenTimeDesc: 'System time display before app launch.',
      screenAppList: 'App Launcher',
      screenAppListDesc: 'PagesJaunes icon in the Android Wear app list.',
      screenRubriques: 'Category Selection',
      screenRubriquesDesc: 'Browse by category for exploratory search.',
      screenLR01: 'Search Results',
      screenLR01Desc: 'First result in the local search list.',
      screenLR02: 'Results Navigation',
      screenLR02Desc: 'Scrolling through search results.',
      screenLR03: 'Result Details Preview',
      screenLR03Desc: 'Quick preview before full detail card.',
      screenFD: 'Business Detail Card',
      screenFDDesc: 'Complete business information at a glance.',
    },
    fr: {
      sketches: 'Wireframes Papier',
      sketchesDesc: 'Avant d\'ouvrir Sketch, j\'ai exploré des dizaines d\'options de layout sur papier. Cette itération rapide a révélé quelle hiérarchie d\'information fonctionnait sur un écran circulaire de 280dp.',
      ambient: 'Mapping Mode Ambiant',
      ambientDesc: 'Chaque écran actif nécessitait un équivalent basse consommation. Des contours blancs sur fond noir préservaient la batterie tout en gardant les utilisateurs orientés.',
      ambientDesign: 'Design Mode Ambiant',
      ambientDesignDesc: 'Spécifications finales du mode ambiant. Contours monochromes pour préserver la batterie tout en maintenant la reconnaissance de marque.',
      flows: 'Parcours Utilisateur',
      flowsDesc: 'Deux trajectoires optimisées : trouver-et-appeler pour l\'urgence, trouver-et-naviguer pour la découverte. Chaque tap comptait sur un écran aussi contraint.',
      flowsDetailed: 'UI et Interactions',
      flowsDetailedDesc: 'Le modèle d\'interaction complet montrant comment les actions montre se transmettent au téléphone. Des transitions fluides étaient essentielles.',
      uiModes: 'États Actif vs Ambiant',
      uiModesDesc: 'Le jaune PagesJaunes assurait une reconnaissance instantanée en mode actif. L\'état ambiant se réduisait à l\'essentiel monochrome, prolongeant la batterie de plusieurs heures.',
      ui: 'Inventaire Écrans',
      uiDesc: 'Un catalogue systématique de chaque état d\'écran, assurant la cohérence du design à travers l\'expérience montre connectée.',
      components: 'Bibliothèque Composants',
      componentsDesc: 'Documentation complète couvrant les variantes de montres rondes et carrées. Cette bibliothèque est devenue la source de vérité pour notre équipe de deux.',
      insituStore: 'Présence Google Play',
      insituStoreDesc: 'Le visuel promotionnel pour le Play Store. Les premières impressions comptent quand les utilisateurs découvrent de nouvelles apps pour montre connectée.',
      insituDetail: 'Prévisualisation Contextuelle',
      insituDetailDesc: 'Montrer la fiche détail sur un vrai poignet aide les décideurs à comprendre les conditions de lecture réelles pour lesquelles nous avons conçu.',
      storeSubmission: 'Soumission Play Store',
      storeSubmissionDesc: 'Communication interne pour le lancement. Visuels marketing et supports de présentation prêts pour publication.',
      devSession: 'Sessions en Binôme',
      devSessionDesc: 'Sessions de travail quotidiennes avec le développeur Thibault Fighiera. Deux montres connectées, itérant sur des versions réelles plutôt que des maquettes statiques.',
      designWork: 'Design en Cours',
      designWorkDesc: 'Keynote servait d\'outil de prototypage rapide. Rapide à itérer, facile à partager, et assez précis pour la transmission au développeur.',
      designDetail: 'Vérification sur Appareil',
      designDetailDesc: 'Rien ne remplace la vérification des designs sur le vrai matériel. Reflets d\'écran, angles de vue et zones tactiles ne se révèlent qu\'en contexte.',
      prototypeVideo: 'Démo Parcours Recherche',
      prototypeVideoDesc: 'Le parcours de recherche complet capturé sur du vrai matériel. De la saisie vocale à l\'affichage de la fiche commerce.',
      navVideo: 'Relais Navigation',
      navVideoDesc: 'Démonstration de la transition fluide de la montre au téléphone quand l\'utilisateur demande un itinéraire.',
      screenLoading: 'État de Chargement',
      screenLoadingDesc: 'Indicateur de chargement minimaliste sur jaune marque.',
      screenTime: 'Cadran Montre',
      screenTimeDesc: 'Affichage de l\'heure système avant lancement app.',
      screenAppList: 'Lanceur d\'Apps',
      screenAppListDesc: 'Icône PagesJaunes dans la liste d\'apps Android Wear.',
      screenRubriques: 'Sélection Catégorie',
      screenRubriquesDesc: 'Navigation par catégorie pour recherche exploratoire.',
      screenLR01: 'Résultats Recherche',
      screenLR01Desc: 'Premier résultat dans la liste de recherche locale.',
      screenLR02: 'Navigation Résultats',
      screenLR02Desc: 'Défilement dans les résultats de recherche.',
      screenLR03: 'Aperçu Détail Résultat',
      screenLR03Desc: 'Aperçu rapide avant la fiche détail complète.',
      screenFD: 'Fiche Détail Pro',
      screenFDDesc: 'Information commerce complète en un coup d\'œil.',
    },
  };

  const t = captions[lang];

  return [
    { src: '/images/pagesjaunes/Android%20wear/early_wireframes.webp', type: 'image', caption: t.sketches, captionDesc: t.sketchesDesc },
    { src: '/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp', type: 'image', caption: t.ambient, captionDesc: t.ambientDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp', type: 'image', caption: t.ambientDesign, captionDesc: t.ambientDesignDesc },
    { src: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp', type: 'image', caption: t.flows, captionDesc: t.flowsDesc },
    { src: '/images/pagesjaunes/Android%20wear/ui_interactions.webp', type: 'image', caption: t.flowsDetailed, captionDesc: t.flowsDetailedDesc },
    { src: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp', type: 'image', caption: t.uiModes, captionDesc: t.uiModesDesc },
    { src: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp', type: 'image', caption: t.ui, captionDesc: t.uiDesc },
    { src: '/images/pagesjaunes/Android%20wear/component_library.webp', type: 'image', caption: t.components, captionDesc: t.componentsDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/00%20Loading.webp', type: 'image', caption: t.screenLoading, captionDesc: t.screenLoadingDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/01%20Time.webp', type: 'image', caption: t.screenTime, captionDesc: t.screenTimeDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/02%20App%20list.webp', type: 'image', caption: t.screenAppList, captionDesc: t.screenAppListDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/03%20Rubriques%20list.webp', type: 'image', caption: t.screenRubriques, captionDesc: t.screenRubriquesDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/04%20LR%2001.webp', type: 'image', caption: t.screenLR01, captionDesc: t.screenLR01Desc },
    { src: '/images/pagesjaunes/Android%20wear/screens/05%20LR%2002.webp', type: 'image', caption: t.screenLR02, captionDesc: t.screenLR02Desc },
    { src: '/images/pagesjaunes/Android%20wear/screens/06%20LR%2003.webp', type: 'image', caption: t.screenLR03, captionDesc: t.screenLR03Desc },
    { src: '/images/pagesjaunes/Android%20wear/screens/07%20FD.webp', type: 'image', caption: t.screenFD, captionDesc: t.screenFDDesc },
    { src: '/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp', type: 'image', caption: t.insituStore, captionDesc: t.insituStoreDesc },
    { src: '/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp', type: 'image', caption: t.insituDetail, captionDesc: t.insituDetailDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp', type: 'image', caption: t.storeSubmission, captionDesc: t.storeSubmissionDesc },
    { src: '/images/pagesjaunes/Android%20wear/dev_session_1.webp', type: 'image', caption: t.devSession, captionDesc: t.devSessionDesc },
    { src: '/images/pagesjaunes/Android%20wear/design_work_keynote.webp', type: 'image', caption: t.designWork, captionDesc: t.designWorkDesc },
    { src: '/images/pagesjaunes/Android%20wear/design_work_detail.webp', type: 'image', caption: t.designDetail, captionDesc: t.designDetailDesc },
    { src: '/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4', type: 'video', caption: t.prototypeVideo, captionDesc: t.prototypeVideoDesc },
    { src: '/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4', type: 'video', caption: t.navVideo, captionDesc: t.navVideoDesc },
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
        className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
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
        {item.captionDesc && <span className="hidden sm:inline">. {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// TOC Sections for navigation
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'overview', label: 'Overview' },
    { id: 'research', label: 'Research' },
    { id: 'design', label: 'Screen Design' },
    { id: 'specs', label: 'Specifications' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'results', label: 'Results' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'research', label: 'Recherche' },
    { id: 'design', label: 'Design' },
    { id: 'specs', label: 'Spécifications' },
    { id: 'implementation', label: 'Implémentation' },
    { id: 'results', label: 'Résultats' },
  ]
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
  const sections = TOC_SECTIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);

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
  }, [sections]);

  // Scroll to section with proper offset
  const scrollToSection = (sectionId: string) => {
    if (!containerRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(containerRef.current, 0);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 64 + 48 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      smoothScrollTo(containerRef.current, elementPosition);
    }
  };

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
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery'
          ? 'bg-black'
          : (isDark ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
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
                    className="absolute inset-0 bg-[#2D5CF3] rounded-full shadow-md"
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
                    className="absolute inset-0 bg-[#2D5CF3] rounded-full shadow-md"
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

      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showNav && viewMode === 'caseStudy'}
        lang={lang}
      />

      {/* Content */}
      {viewMode === 'caseStudy' ? (
        <div id="top" className="max-w-[1200px] mx-auto px-10 py-12">
          {/* Hero Section */}
          <section id="overview" className="mb-16">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                  <span className={`px-3 py-1 rounded-full font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    {t.hero.role}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t.hero.scope}</span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t.hero.period}</span>
                </div>

                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.hero.title}
                </h1>

                <h2 className={`text-xl md:text-2xl font-semibold tracking-tight mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.hero.subtitle}
                </h2>

                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.hero.description}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-blue-900/20 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                  <Quote size={24} className={isDark ? 'text-blue-400 mb-4' : 'text-blue-600 mb-4'} />
                  <p className={`text-sm italic leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
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
                <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                  <Layers size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
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
              onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp')}
              className="rounded-2xl overflow-hidden border border-gray-200 cursor-pointer"
              style={{ backgroundColor: '#E7E7E7' }}
            >
              <div className="flex items-center justify-center" style={{ aspectRatio: '3/2' }}>
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp"
                  alt="PagesJaunes Android Wear"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </figure>

          {/* Overview Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.overview.title}
            </h2>
            <hr className={`mb-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className={`text-xl md:text-2xl font-semibold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.overview.contextTitle}
                </h3>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.contextDesc}
                </p>
              </div>
              <div>
                <h3 className={`text-xl md:text-2xl font-semibold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.overview.challengeTitle}
                </h3>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.challengeDesc}
                </p>
              </div>
              <div>
                <h3 className={`text-xl md:text-2xl font-semibold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.persona.title}
            </h2>

            <blockquote className={`text-xl italic mb-8 pl-4 border-l-4 ${isDark ? 'text-gray-300 border-blue-500' : 'text-gray-600 border-blue-400'}`}>
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
                    <CheckCircle2 size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Approach Section */}
          <section className="mb-24">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                <h3 className={`text-xl md:text-2xl font-semibold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.features.title}
                </h3>
                <ul className={`text-sm space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.features.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`text-xl md:text-2xl font-semibold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.deliverables.title}
                </h3>
                <ul className={`text-sm space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.deliverables.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 1: RESEARCH & DISCOVERY */}
          {/* ================================================================== */}
          <section id="research" className="mb-24">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                {lang === 'fr' ? 'Phase 1' : 'Phase 1'}
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {lang === 'fr' ? 'Recherche & Exploration' : 'Research & Discovery'}
            </h2>
            <p className={`text-base mb-8 max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {lang === 'fr'
                ? 'Immersion dans les guidelines Android Wear, étude des contraintes matérielles, définition des parcours utilisateur et exploration de dizaines de concepts sur papier.'
                : 'Deep dive into Android Wear guidelines, studying hardware constraints, defining user journeys, and exploring dozens of concepts on paper.'}
            </p>

            {/* Full width - Early Sketches */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/early_wireframes.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/early_wireframes.webp"
                  alt={t.process.sketches}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.process.sketches}.</strong> {t.process.sketchesDesc}
              </figcaption>
            </figure>

            {/* Bento Grid - User Flows & Platform Study - 1:1 cropped images */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              {/* User Task Flows - cropped 1:1 */}
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp"
                    alt={t.process.flows}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.process.flows}.</strong> {t.process.flowsDesc}
                </figcaption>
              </figure>
              {/* Ambient Mode Sketches - cropped 1:1 */}
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp"
                    alt={t.process.ambient}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.process.ambient}.</strong> {t.process.ambientDesc}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 2: SCREEN DESIGN */}
          {/* ================================================================== */}
          <section id="design" className="mb-24">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                {lang === 'fr' ? 'Phase 2' : 'Phase 2'}
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {lang === 'fr' ? 'Design d\'Interface' : 'Screen Design'}
            </h2>
            <p className={`text-base mb-8 max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {lang === 'fr'
                ? 'Création de l\'UI complète pour écrans circulaires et carrés. Chaque écran devait communiquer son propos en moins de 2 secondes sur un display de 280dp.'
                : 'Creating the complete UI for circular and square displays. Each screen needed to communicate its purpose in under 2 seconds on a 280dp display.'}
            </p>

            {/* Full width - UI Interactions */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/ui_interactions.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/ui_interactions.webp"
                  alt={lang === 'fr' ? 'UI et Interactions' : 'UI and Interactions'}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'UI et Interactions' : 'UI and Interactions'}.</strong> {lang === 'fr' ? 'Le modèle d\'interaction complet montrant comment les actions montre se transmettent au téléphone pour les appels et la navigation.' : 'The complete interaction model showing how watch actions hand off to phone for calls and navigation.'}
              </figcaption>
            </figure>

            {/* Bento Grid - Screen Inventory - 4x2 grid, tight layout */}
            <figure className="mb-12">
              <div className={`rounded-2xl overflow-hidden border p-4 ${isDark ? 'border-white/10 bg-[#1a1a1a]' : 'border-gray-200 bg-gray-100'}`}>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { src: '/images/pagesjaunes/Android%20wear/screens/00%20Loading.webp', alt: 'Loading' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/02%20App%20list.webp', alt: 'App List' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/03%20Rubriques%20list.webp', alt: 'Categories' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/04%20LR%2001.webp', alt: 'Result 1' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/05%20LR%2002.webp', alt: 'Result 2' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/06%20LR%2003.webp', alt: 'Result 3' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/07%20FD.webp', alt: 'Detail Card' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/01%20Time.webp', alt: 'Watch Face' },
                  ].map((screen, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleImageClick(screen.src)}
                      className="cursor-pointer rounded-xl overflow-hidden transition-transform duration-200 hover:scale-[1.03] shadow-sm hover:shadow-md"
                    >
                      <img
                        loading="lazy"
                        src={screen.src}
                        alt={screen.alt}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Inventaire des Écrans' : 'Screen Inventory'}.</strong> {lang === 'fr' ? 'Catalogue de chaque état d\'écran. Du chargement à la fiche détail, chaque transition pensée pour une lecture rapide sur 280dp.' : 'Catalog of every screen state. From loading to detail card, each transition designed for quick scanning on 280dp.'}
              </figcaption>
            </figure>

            {/* 2 columns - UI Modes & Screen Overview - cropped 1:1 */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp"
                    alt={t.process.uiModes}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.process.uiModes}.</strong> {t.process.uiModesDesc}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp"
                    alt={lang === 'fr' ? 'Vue d\'ensemble UI' : 'UI Overview'}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Vue d\'ensemble UI' : 'UI Overview'}.</strong> {lang === 'fr' ? 'Catalogue des états d\'écran assurant la cohérence à travers l\'expérience montre connectée.' : 'Systematic catalog of screen states ensuring design consistency across the wearable experience.'}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 3: SPECIFICATIONS */}
          {/* ================================================================== */}
          <section id="specs" className="mb-24">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                {lang === 'fr' ? 'Phase 3' : 'Phase 3'}
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {lang === 'fr' ? 'Spécifications & Guidelines' : 'Specifications & Guidelines'}
            </h2>
            <p className={`text-base mb-8 max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {lang === 'fr'
                ? 'Documentation exhaustive des modes actif et ambiant, bibliothèque de composants pour les variantes rondes et carrées, et spécifications d\'interaction pour la transmission au développeur.'
                : 'Comprehensive documentation of active and ambient modes, component library for round and square variants, and interaction specs for developer handoff.'}
            </p>

            {/* Full width - Component Library */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/component_library.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/component_library.webp"
                  alt={t.process.components}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.process.components}.</strong> {t.process.componentsDesc}
              </figcaption>
            </figure>

            {/* Full width - Ambient Mode Final Design */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp"
                  alt={lang === 'fr' ? 'Design Mode Ambiant' : 'Ambient Mode Design'}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Spécifications Mode Ambiant' : 'Ambient Mode Specifications'}.</strong> {lang === 'fr' ? 'Contours blancs sur fond noir pour économiser la batterie. Chaque écran actif a son équivalent basse consommation, gardant les utilisateurs orientés.' : 'White outlines on black background to preserve battery. Each active screen has its low-power equivalent, keeping users oriented.'}
              </figcaption>
            </figure>
          </section>

          {/* ================================================================== */}
          {/* PHASE 4: IMPLEMENTATION & LAUNCH */}
          {/* ================================================================== */}
          <section id="implementation" className="mb-24">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                {lang === 'fr' ? 'Phase 4' : 'Phase 4'}
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {lang === 'fr' ? 'Implémentation & Lancement' : 'Implementation & Launch'}
            </h2>
            <p className={`text-base mb-8 max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {lang === 'fr'
                ? 'Sessions quotidiennes en binôme avec le développeur, itérations sur des builds réels, prototypes vidéo, et préparation des assets pour la soumission Google Play.'
                : 'Daily pair sessions with the developer, iterating on real builds, video prototypes, and preparing assets for Google Play submission.'}
            </p>

            {/* Full width - Dev Session */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/dev_session_1.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/dev_session_1.webp"
                  alt={t.implementation.devSession}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.implementation.devSession}.</strong> {t.implementation.devSessionDesc}
              </figcaption>
            </figure>

            {/* 2 columns - Design Work Photos - cropped 1:1 */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/design_work_keynote.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/design_work_keynote.webp"
                    alt={lang === 'fr' ? 'Session Design' : 'Design Session'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Prototypage Keynote' : 'Keynote Prototyping'}.</strong> {lang === 'fr' ? 'Keynote servait d\'outil de prototypage rapide. Rapide à itérer, facile à partager, assez précis pour la transmission au développeur.' : 'Keynote served as my rapid prototyping tool. Quick to iterate, easy to share, precise enough for handoff.'}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/design_work_detail.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/design_work_detail.webp"
                    alt={lang === 'fr' ? 'Vérification Device' : 'Device Verification'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Vérification sur Appareil' : 'On-Device Verification'}.</strong> {lang === 'fr' ? 'Rien ne remplace le test sur le vrai matériel. Reflets, angles de vue et zones tactiles ne se révèlent qu\'en contexte.' : 'Nothing replaces testing on real hardware. Reflections, viewing angles and touch targets only reveal themselves in context.'}
                </figcaption>
              </figure>
            </div>

            {/* Video Prototypes - Side by side, 1:1 ratio */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4')}
                  className={`relative rounded-2xl overflow-hidden border cursor-pointer group aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <video
                    src="/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 bg-white/20">
                      <Play size={28} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{t.implementation.prototype}.</strong> {t.implementation.prototypeDesc}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4')}
                  className={`relative rounded-2xl overflow-hidden border cursor-pointer group aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <video
                    src="/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 bg-white/20">
                      <Play size={28} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Démo Navigation' : 'Navigation Demo'}.</strong> {lang === 'fr' ? 'Transition fluide de la montre au téléphone quand l\'utilisateur demande un itinéraire.' : 'Seamless transition from watch to phone when the user requests directions.'}
                </figcaption>
              </figure>
            </div>

            {/* Full width - Google Play Store Submission */}
            <figure className="mb-12">
              <div
                onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img
                  loading="lazy"
                  src="/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp"
                  alt={lang === 'fr' ? 'Soumission Play Store' : 'Play Store Submission'}
                  className="w-full h-auto"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Communication Lancement' : 'Launch Communication'}.</strong> {lang === 'fr' ? 'Communication interne pour le lancement. Visuels marketing prêts pour publication.' : 'Internal communication for app launch. Marketing assets and store listing materials ready for publication.'}
              </figcaption>
            </figure>

            {/* 2 columns - Final Mockups - 1:1 cropped */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp"
                    alt={lang === 'fr' ? 'Présence Google Play' : 'Google Play Presence'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Visuel Play Store' : 'Play Store Visual'}.</strong> {lang === 'fr' ? 'Le visuel promotionnel pour le listing Google Play. Les premières impressions comptent.' : 'The promotional visual for Google Play listing. First impressions matter.'}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer aspect-square ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                  style={{ backgroundColor: isDark ? '#1a1a1a' : '#E7E7E7' }}
                >
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp"
                      alt={lang === 'fr' ? 'Fiche Pro sur Poignet' : 'Business Card on Wrist'}
                      className="max-w-full max-h-full object-contain"
                      style={{ transform: 'rotate(-5deg)' }}
                    />
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{lang === 'fr' ? 'Mockup In-situ' : 'In-situ Mockup'}.</strong> {lang === 'fr' ? 'Visualiser la fiche sur un vrai poignet révèle les conditions de lecture réelles.' : 'Visualizing the card on an actual wrist reveals real-world reading conditions.'}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Results Section */}
          <section id="results" className="mb-24">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.result.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.result.items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl text-center ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
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
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
          <section className={`p-8 md:p-12 rounded-3xl ${isDark ? 'bg-blue-900/20 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="text-center">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.cta.title}
              </h2>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D5CF3] text-white font-medium hover:bg-[#2450d9] transition-colors"
              >
                {t.cta.button}
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      ) : (
        /* Gallery View */
        <div className="max-w-[1200px] mx-auto px-6 py-12">
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
