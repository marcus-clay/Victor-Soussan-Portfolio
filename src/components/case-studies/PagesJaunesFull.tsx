/**
 * PagesJaunesFull - Full narrative case study version
 *
 * Complete deep-dive into the 2-year design work at PagesJaunes (2014-2016)
 * Following the pattern of SqoolPage, DailymotionPage, ToolkitPage
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Stack as Layers,
  Calendar,
  Briefcase,
  Buildings as Building2,
  Quotes as Quote,
  DeviceMobile as Smartphone,
  MapTrifold as Map,
  Users,
  Palette,
  Watch,
  CheckCircle as CheckCircle2,
  ArrowRight,
  Heart,
  MagnifyingGlass as Search
} from '@phosphor-icons/react';

interface PagesJaunesFullProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onContact?: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

// ============================================================================
// IMAGE GALLERY DATA WITH CAPTIONS
// ============================================================================

const GALLERY_IMAGES = {
  homepage: {
    main: '/images/pagesjaunes/pagesjaunes homepage.webp',
    variations: '/images/pagesjaunes/pagesjaunes homepage - variations.webp',
  },
  homepageIpad: {
    main: '/images/pagesjaunes/pagesjaunes hp ipad.webp',
    variations: '/images/pagesjaunes/pagesjaunes hp ipad variations.webp',
  },
  artDirection: {
    before: '/images/pagesjaunes/pj 02@2x.webp',
    after: '/images/pagesjaunes/pj 03@2x.webp',
  },
  search: {
    flow: '/images/pagesjaunes/pj 04@2x.webp',
    prototype: '/images/pagesjaunes/2020_NES_moteur_Android_img.mp4',
  },
  account: {
    flow: '/images/pagesjaunes/pj 05@2x.webp',
    engagement: '/images/pagesjaunes/pj 06@2x.webp',
  },
  maps: {
    system: '/images/pagesjaunes/pj 07@2x.webp',
    multidevice: '/images/pagesjaunes/pj 08@2x.webp',
    ipadPedestrian: '/images/pagesjaunes/pj_ipad_itinéraire_piéton.webp',
    ipadTransit: '/images/pagesjaunes/pj_ipad_itinéraire_transports.webp',
    ipadDriving: '/images/pagesjaunes/pj_ipad_itinéraire_voiture.webp',
    iphonePedestrian: '/images/pagesjaunes/pj_iphone_itinéraire_piéton.webp',
    iphoneTransit: '/images/pagesjaunes/pj_iphone_itinéraire_transports.webp',
    iphoneDriving: '/images/pagesjaunes/pj_iphone_itinéraire_voiture.webp',
    iphoneFlows: '/images/pagesjaunes/pagejaunes itineraire iphone.webp',
    ipadItinerary: '/images/pagesjaunes/pagejaunes itineraire ipad.webp',
  },
  wear: {
    flows: '/images/pagesjaunes/pj android wear flows.webp',
    uiModes: '/images/pagesjaunes/pj android wear ui modes.webp',
    ui: '/images/pagesjaunes/pj android wear ui.webp',
    flowsDetailed: '/images/pagesjaunes/Android wear/Android Wear UI and Interactions.webp',
    components: '/images/pagesjaunes/Android wear/android_wear_design_02.webp',
    ambient: '/images/pagesjaunes/Android wear/Android Wear - ambient mode sketches.webp',
    insituStore: '/images/pagesjaunes/Android wear/android_wear_insitu_store_01.webp',
    insituDetail: '/images/pagesjaunes/Android wear/maquette_insitu_FD_03 (1).webp',
    sketches: '/images/pagesjaunes/Android wear/IMG_20151016_105901.webp',
    devSession: '/images/pagesjaunes/Android wear/IMG_20151214_183749.webp',
    thumbnail: '/images/pagesjaunes/Android wear/android_wear_thumbnail.webp',
    yAllerBtn: '/images/pagesjaunes/Android wear/screens/09 Y Aller BTN.webp',
    designWork: '/images/pagesjaunes/Android wear/IMG_20151113_153404.webp',
    prototypeVideo1: '/images/pagesjaunes/Android wear/VID_20151202_184124.mp4',
    prototypeVideo2: '/images/pagesjaunes/Android wear/VID_20151218_100148.mp4',
  },
  contributions: {
    desktopReview: '/images/pagesjaunes/24_06_2015_avis_edition.webp',
  },
  tooltips: {
    redesign: '/images/pagesjaunes/pagejaunes tooltip redesign.webp',
  },
  microInteractions: {
    navDrawer: '/images/pagesjaunes/micro-interactions/NES_Anim_Nav_Drawer.gif',
    favorites: '/images/pagesjaunes/micro-interactions/anim_favoris.mp4',
    historyRemarketing: '/images/pagesjaunes/micro-interactions/Anim_remarketing_historique.mp4',
  },
};

const CAPTIONS = {
  en: {
    homepage: {
      main: 'A conversational greeting ("What do you need today?") reframes the search from directory lookup to problem-solving. Users act faster when the interface feels personal.',
      variations: 'Eight contextual hero images featuring local pros: the baker, mechanic, florist. Each builds trust by showing the human behind the service.',
    },
    homepageIpad: {
      main: 'Two homepage variants on iPad showcasing contextual hero photography. Each image features a local professional, creating warmth and trust at first glance.',
      variations: 'Responsive hero images across iPhone 4, Retina, iPad, Android phone/tablet. Auto-detection of image focal point with viewport-adaptive cropping. Co-developed with Android lead dev Alexandre Badie.',
    },
    artDirection: {
      before: 'Before: Raw photo. The subject competes with distracting background elements.',
      after: 'After: Strategic cropping and color grading. Focus shifts to the craftsman\'s expertise.',
    },
    search: {
      flow: 'From query to listing in three taps. Autocomplete reduces cognitive load, location context eliminates redundant input.',
      prototype: 'Search engine evolution prototype. Material Design activity transitions with shared element animations. Search bar transforms into full-screen results.',
    },
    account: {
      flow: 'Social login reduces friction by 60%. Email/password fallback preserved for users who prefer traditional auth.',
      engagement: 'History and Favorites turn one-time searches into retained value. Each saved business is a reason to return.',
    },
    maps: {
      system: 'Transit icons carry data: metro line colors, station names, walking segments. All parsed from Mappy API and styled for quick scanning.',
      multidevice: 'One journey, three modes: walk, drive, transit. The interface adapts to the user\'s choice, the destination stays constant.',
      ipadPedestrian: 'iPad split-view navigation: map context on the left, turn-by-turn on the right. Both visible, no tab switching needed.',
      ipadTransit: 'Public transit on tablet: metro lines as visual anchors. Users trace their journey without reading every step.',
      ipadDriving: 'Car mode handoff: "Guide me with..." surfaces Waze, Google Maps, Apple Maps. We facilitate navigation through the user\'s preferred app.',
      iphonePedestrian: 'Mobile pedestrian view with calorie count and ETA. Walking directions that also surface a health benefit.',
      iphoneTransit: 'Transit breakdown: walk 3 min, Line 1 for 20 min, Line 11 for 7 min. Complex routes made scannable.',
      iphoneDriving: 'Car route with app handoff. The yellow CTA respects platform conventions while maintaining brand presence.',
      iphoneFlows: 'Three iPhone flows: route sheet, map preview, transit breakdown. Each screen answers a different user question.',
    },
    wear: {
      flows: 'Wearable task flows: search then call, or search then navigate. Two jobs, two paths, minimal taps.',
      uiModes: 'Regular mode uses high-contrast yellow for active interaction. Ambient mode switches to monochrome for battery efficiency.',
      ui: 'Complete Android Wear component system: loading states, launcher position, home, results, detail cards, action buttons.',
      flowsDetailed: 'User task flows mapped with phone handoff. Two scenarios: "Find a restaurant and call" (triggers phone dialer) or "Find and navigate" (opens Google Maps).',
      components: 'Full screen inventory: Loading, Launcher, Home, Results list, Detail card, Actions. Guidelines for both square and round displays.',
      ambient: 'Ambient mode sketches. Mapping each screen state to low-power display. White outlines on black background for OLED battery efficiency.',
      insituStore: 'Google Play Store promotional visual. Watch mockup on PagesJaunes yellow background showing the home screen with category shortcuts.',
      insituDetail: 'Business detail card in context. Key info hierarchy: name, category, status, rating, phone, address. All scannable in under 2 seconds.',
      sketches: 'Early wireframe sketches for the reminder flow. User can set a reminder after calling a business to pick up an order later.',
      devSession: 'Real device testing with Thibault. Two watches connected, smartphone synced, iterating on the build in real-time.',
      thumbnail: 'PagesJaunes Android Wear app on watch face. Glanceable local search for wearables.',
      yAllerBtn: 'Navigation action screen. One-tap "Y Aller" (Go There) button triggers Google Maps handoff.',
      designWork: 'Keynote design session. Building the full detail card flow: business info, map preview, hours, budget, action buttons.',
      prototypeVideo: 'Working prototype on real hardware. Full flow from app launch to business detail to phone call handoff.',
    },
    contributions: {
      desktopReview: 'Desktop web interface for review editing. Multi-criteria star ratings, pros/cons fields, character limits, rich formatting. Responsive from desktop to tablet.',
    },
    tooltips: {
      redesign: 'Contextual tooltips guide feature discovery. Clear visual hierarchy, animated entrance, minimal disruption to the user flow.',
    },
    microInteractions: {
      sectionTitle: 'Micro-Interactions',
      intro: 'Motion specs I delivered to dev teams. These animations shipped in production across iOS and Android.',
      navDrawer: 'Material Design Navigation Drawer. Familiar Android pattern, PagesJaunes colors. Users already know how this works.',
      favorites: 'Heart animation on "Add to Favorites". The bounce gives instant feedback that the action worked.',
      historyRemarketing: 'History screen with photo upload prompt. Encouraging users to share their experience after visiting a business.',
    },
  },
  fr: {
    homepage: {
      main: 'Une accroche conversationnelle ("De quoi avez-vous besoin ?") transforme la recherche d\'annuaire en résolution de problème. Les utilisateurs agissent plus vite quand l\'interface est personnelle.',
      variations: 'Huit visuels contextuels de pros locaux : boulanger, garagiste, fleuriste. Chacun crée la confiance en montrant l\'humain derrière le service.',
    },
    homepageIpad: {
      main: 'Deux variantes de homepage sur iPad avec photographies de professionnels en fond. Chaque visuel met en avant un pro local, créant chaleur et confiance dès le premier regard.',
      variations: 'Visuels héros responsive sur iPhone 4, Retina, iPad, Android phone/tablet. Détection auto du point focal avec recadrage adapté au viewport. Co-développé avec Alexandre Badie, lead dev Android.',
    },
    artDirection: {
      before: 'Avant : Photo brute. Le sujet entre en concurrence avec les éléments de fond distrayants.',
      after: 'Après : Cadrage stratégique et étalonnage couleur. Le focus se déplace vers l\'expertise de l\'artisan.',
    },
    search: {
      flow: 'De la requête à la fiche en trois taps. L\'autocomplétion réduit la charge cognitive, le contexte de localisation élimine les saisies redondantes.',
      prototype: 'Prototype évolution moteur de recherche. Transitions Activity Material Design avec animations d\'éléments partagés. La barre de recherche se transforme en résultats plein écran.',
    },
    account: {
      flow: 'La connexion sociale réduit la friction de 60%. Le fallback email/mot de passe est conservé pour ceux qui préfèrent l\'auth traditionnelle.',
      engagement: 'Historique et Favoris transforment les recherches ponctuelles en valeur conservée. Chaque établissement sauvegardé est une raison de revenir.',
    },
    maps: {
      system: 'Les icônes de transport portent des données : couleurs des lignes de métro, noms de stations, segments piétons. Tout parsé depuis l\'API Mappy, stylé pour la lecture rapide.',
      multidevice: 'Un trajet, trois modes : marche, voiture, transports. L\'interface s\'adapte au choix de l\'utilisateur, la destination reste constante.',
      ipadPedestrian: 'Navigation split-view iPad : contexte carte à gauche, guidage pas-à-pas à droite. Tout visible, pas besoin de changer d\'onglet.',
      ipadTransit: 'Transports en commun sur tablette : les lignes de métro comme repères visuels. Les utilisateurs tracent leur trajet sans tout lire.',
      ipadDriving: 'Mode voiture avec handoff : "Guidez-moi avec..." affiche Waze, Google Maps, Plans. On facilite la navigation via l\'app préférée de l\'utilisateur.',
      iphonePedestrian: 'Vue piéton mobile avec calories et temps estimé. Des directions qui font aussi ressortir un bénéfice santé.',
      iphoneTransit: 'Détail transports : marche 3 min, Ligne 1 pendant 20 min, Ligne 11 pendant 7 min. Des trajets complexes rendus scannables.',
      iphoneDriving: 'Itinéraire voiture avec handoff app. Le CTA jaune respecte les conventions de plateforme tout en maintenant la présence de marque.',
      iphoneFlows: 'Trois flows iPhone : feuille de route, aperçu carte, détail transports. Chaque écran répond à une question utilisateur différente.',
    },
    wear: {
      flows: 'Flows wearable : recherche puis appel, ou recherche puis navigation. Deux jobs, deux chemins, minimum de taps.',
      uiModes: 'Le mode normal utilise un jaune à fort contraste pour l\'interaction active. Le mode ambiant passe en monochrome pour économiser la batterie.',
      ui: 'Système de composants Android Wear complet : états de chargement, position launcher, home, résultats, fiches détail, boutons d\'action.',
      flowsDetailed: 'Flux utilisateur avec handoff téléphone. Deux scénarios : "Trouver un resto et appeler" (lance le téléphone) ou "Trouver et y aller" (ouvre Google Maps).',
      components: 'Inventaire complet des écrans : Chargement, Launcher, Home, Liste résultats, Fiche détail, Actions. Guidelines pour écrans carrés et ronds.',
      ambient: 'Sketches mode ambiant. Mapping de chaque état d\'écran vers affichage basse conso. Contours blancs sur noir pour économie batterie OLED.',
      insituStore: 'Visuel promo Google Play Store. Mockup montre sur fond jaune PagesJaunes montrant l\'écran d\'accueil avec raccourcis catégories.',
      insituDetail: 'Fiche pro en contexte. Hiérarchie d\'info clé : nom, catégorie, statut, note, tel, adresse. Scannable en moins de 2 secondes.',
      sketches: 'Wireframes précoces du flow rappel. L\'utilisateur peut programmer un rappel après avoir appelé un commerce pour récupérer une commande.',
      devSession: 'Test sur device réel avec Thibault. Deux montres connectées, smartphone sync, itérations sur le build en temps réel.',
      thumbnail: 'App PagesJaunes Android Wear sur cadran de montre. Infos locales lisibles d\'un coup d\'œil.',
      yAllerBtn: 'Écran d\'action navigation. Bouton "Y Aller" en un tap déclenche le handoff vers Google Maps.',
      designWork: 'Session design Keynote. Construction du flow complet fiche détail : infos commerce, aperçu carte, horaires, budget, boutons d\'action.',
      prototypeVideo: 'Prototype fonctionnel sur hardware réel. Flow complet du lancement app à la fiche détail jusqu\'au handoff appel téléphone.',
    },
    contributions: {
      desktopReview: 'Interface web desktop pour l\'édition d\'avis. Notes multi-critères par étoiles, champs pour/contre, limites de caractères, formatage enrichi. Responsive du desktop à la tablette.',
    },
    tooltips: {
      redesign: 'Tooltips contextuels pour guider la découverte des features. Hiérarchie visuelle claire, animation d\'entrée, perturbation minimale du flow utilisateur.',
    },
    microInteractions: {
      sectionTitle: 'Micro-Interactions',
      intro: 'Specs motion livrées aux équipes dev. Ces animations sont passées en production sur iOS et Android.',
      navDrawer: 'Navigation Drawer Material Design. Pattern Android familier, couleurs PagesJaunes. Les utilisateurs savent déjà comment ça marche.',
      favorites: 'Animation cœur sur "Ajouter aux Favoris". Le rebond donne un feedback immédiat que l\'action a fonctionné.',
      historyRemarketing: 'Écran Historique avec incitation à uploader une photo. Encourager les utilisateurs à partager leur expérience après une visite.',
    },
  },
};

const TRANSLATIONS = {
  en: {
    hero: {
      role: 'Product Designer → UI Team Lead',
      scope: 'Mobile Apps, Web, Design System',
      period: '2014-2016',
      title: 'Redesigning PagesJaunes for 22M Users',
      subtitle: 'From legacy directory to mobile-first experience',
      description: 'Two years modernizing France\'s most downloaded utility app. I joined as Product Designer, became UI Team Lead managing 4 designers, and shipped major updates across iOS, Android, web, and Android Wear.'
    },
    testimonial: {
      quote: 'Victor is passionate about UX and keeps himself up to date with latest trends and methods. He is a very capable designer who can do the legwork but also take a step back and advise on more strategic aspects of an interface design or the project as a whole. Highly recommended as part of a UX or product team.',
      author: 'Simon White',
      role: 'Director of UX @ PagesJaunes'
    },
    meta: {
      type: 'Mobile & Web',
      typeLabel: 'Type',
      scope: 'Apps Redesign',
      scopeLabel: 'Scope',
      period: '2014-2016',
      periodLabel: 'Period',
      company: 'PagesJaunes (Solocal)',
      companyLabel: 'Company'
    },
    overview: {
      title: 'Overview',
      introTitle: 'The Context',
      introDesc: 'In 2014, PagesJaunes served 15M+ monthly visitors but felt stuck in web directory logic. The mobile apps had millions of downloads, but the experience was heavy. The product needed to evolve from static listings to a fluid, personal, mobile-first experience, without breaking what worked for existing users.',
      roleTitle: 'My Role',
      roleDesc: 'I joined as Product Designer working on web, partnerships (TheFork, Renault R-Link), and login flows. In 2015, I became UI Team Lead: coordinating 4 designers, owning the mobile app redesign, and running weekly syncs with iOS/Android devs.',
      goalsTitle: 'Key Objectives',
      goals: [
        'Redesign the homepage with intent-first search',
        'Ship native onboarding for iOS & Android',
        'Build pedestrian navigation (Mappy API)',
        'Audit and roadmap the design system (Yellowstrap)'
      ]
    },
    homepage: {
      sectionTitle: 'Homepage Redesign',
      question: 'How do you make a utility search feel personal and welcoming?',
      intro: 'The old homepage showed two search fields: "Who" and "Where". It worked, but felt cold and dated. We moved toward a more conversational design.',
      greeting: 'Bonjour, de quoi avez-vous besoin?',
      greetingDesc: 'This friendly phrase set the tone. It brought warmth to a utility-first tool.',
      imagery: 'Contextual Imagery',
      imageryDesc: 'We designed art direction rules for rotating background images featuring local professionals: the baker, the mechanic, the florist. Contextual based on search category.',
      simplification: 'Search Simplification',
      simplificationDesc: 'Replaced dual fields with a single search bar. Reduced visual clutter. Unified tab language across iOS and Android.'
    },
    searchEngine: {
      sectionTitle: 'Search Engine Evolution',
      question: 'How do you redesign the revenue engine without losing users?',
      intro: 'The search engine is the heart of PagesJaunes. With close to €500M in annual revenue tied to search rankings and visibility, every change carried high stakes. Users needed to find professionals quickly. The business needed to preserve the ranking model that monetized every query.',
      stakes: 'High Stakes',
      stakesDesc: 'The search engine powered the entire business model. Ranking position in suggestions and results directly impacted advertiser revenue. Any misstep in the redesign could cost millions.',
      model: 'The "What + Where" Model',
      modelDesc: 'Search structured around two core questions: What professional or company are you looking for? Where do you need them? This geolocation-centric approach helped users find nearby professionals, view their details, call them, or navigate there.',
      materialDesign: 'Material Design Transitions',
      materialDesignDesc: 'We implemented Google\'s Material Design patterns with Activity transitions and shared element animations. The search bar elegantly transforms into full-screen results, maintaining context while expanding functionality.',
      shipped: 'Shipped to Production',
      shippedDesc: 'This prototype became the production implementation deployed on Google Play Store. Smooth transitions reduced perceived latency while the familiar search model preserved user habits built over years.'
    },
    onboarding: {
      sectionTitle: 'Native Onboarding',
      question: 'How do you guide 22M users through a major app update?',
      intro: 'We were launching a major version update. Users needed to discover the new features without being blocked. We designed short, non-blocking animations at first launch.',
      ios: 'iOS Implementation',
      iosDesc: 'Leveraged CAAnimation for smooth walkthrough sequences. Tested iterations in our Paris UX lab.',
      android: 'Android Implementation',
      androidDesc: 'Used Activity transitions with Material Design cues. Coordinated with dev team on motion specs.',
      goals: 'Onboarding Goals',
      goalsList: [
        'Reduce support requests about navigation',
        'Boost feature discovery (Favorites, Maps)',
        'Increase first-week retention'
      ]
    },
    navigation: {
      sectionTitle: 'Maps & Walking Itinerary',
      question: 'How do you get users from search to destination faster?',
      intro: 'Finding a professional is only half the job. Users need to get there. We built a complete pedestrian navigation experience on top of Mappy API.',
      features: 'Core Features',
      featuresList: [
        'Pedestrian route previews with turn-by-turn',
        'Multi-app handoff: Waze, Google Maps, Apple Maps',
        'Network optimization for 3G connections',
        'iPad split-view with route clarity'
      ],
      tablet: 'Tablet Experience',
      tabletDesc: 'On iPad, we completely redesigned the map experience with native split views. Directions list on one side, interactive map on the other. Full accessibility support with Dynamic Type and VoiceOver.'
    },
    account: {
      sectionTitle: 'My PagesJaunes',
      question: 'How do you turn passive searchers into engaged users?',
      intro: 'The loyalty and account area was fragmented and underused. We redesigned it to support the retention strategy.',
      areas: 'Key Areas',
      areasList: [
        'Favorites: save and organize preferred businesses',
        'History: quick access to recent searches',
        'Contributions: photo and review submission',
        'Account: simplified login and registration'
      ],
      contribution: 'User Contributions',
      contributionDesc: 'Designed the full experience for adding photos and reviews from business profile pages. Turning passive users into active contributors.'
    },
    wear: {
      sectionTitle: 'Android Wear',
      intro: 'An experimental, forward-looking project. PagesJaunes wanted presence on wearable devices. I designed and built this app in duo with Android developer Thibault Fighiera. Two months from concept to Google Play release.',
      scenario: '"It\'s noon, Julien is hungry. He wants to quickly find a restaurant near the office and get directions."',
      context: 'Project Context',
      contextItems: [
        'Agile team of 3: Designer (me) + Product Owner + Developer',
        'Oct-Dec 2015: conception and development in 2 months',
        'First step of PagesJaunes branding to Material Design',
        'Shipped to Google Play, December 2015'
      ],
      approach: 'Design Approach',
      approachDesc: 'Learning the OS guidelines, assessing Android Wear constraints, matching PagesJaunes branding. Designing for watch with context in mind: low-effort usage, information readable at a glance, quick actions.',
      features: 'What We Built',
      featuresList: [
        'Card-based UI with ratings, status, and contact CTA',
        'Two user flows: search→call and search→navigate',
        'Regular mode (high-contrast yellow) and ambient mode (monochrome)',
        'Voice search integration with "Ok Google"',
        'Phone handoff for calls and Google Maps navigation'
      ],
      deliverables: 'My Deliverables',
      deliverablesList: [
        'Persona and user story documentation',
        'Sketching and wireframing',
        'UI design and interaction specs',
        'Prototyping and demo videos',
        'Stakeholder presentation'
      ],
      collaborator: 'Thibault Fighiera',
      collaboratorRole: 'Android Developer',
      collaboratorDesc: 'Back-to-back collaboration on design and development. Fast iteration cycles with real device testing.'
    },
    system: {
      sectionTitle: 'Design System Strategy',
      intro: 'With multiple platforms and growing feature divergence, we needed shared foundations. I led the first comprehensive audit.',
      audit: 'The Audit',
      auditDesc: 'Reviewed all app screens across iOS, Android, and web. Interviewed designers and developers across squads to understand pain points.',
      roadmap: 'Yellowstrap Roadmap',
      roadmapDesc: 'Delivered the component system roadmap and guidelines. Defined naming conventions, color usage, CTA styles, status indicators. Pre-Figma era tools: Zeplin, PDF kits, Sketch.',
      note: 'Note: My role focused on strategic definition and requirements, not hands-on library building.'
    },
    team: {
      sectionTitle: 'Team & Collaboration',
      intro: 'This project was impossible to pull off alone. I worked with iOS/Android devs, backend, marketing, and PO.',
      led: 'I Led',
      ledList: [
        'UI direction and component specs',
        'Design team rituals and mentoring (4 designers)',
        'Executive presentations (User Club Day, roadmap reviews)'
      ],
      collaborated: 'I Collaborated With',
      collaboratedList: [
        'Backend for API payload shaping',
        'Mobile teams for animation and scroll specs',
        'Marketing for homepage imagery guidelines'
      ],
      rituals: 'Weekly crits and retros. Fast feedback loops, tight alignment.'
    },
    impact: {
      sectionTitle: 'Results',
      metrics: [
        { value: '22M+', label: 'Downloads', sublabel: 'cumulative app installs' },
        { value: '300K', label: 'Daily Users', sublabel: 'at peak usage' },
        { value: '4', label: 'Designers', sublabel: 'managed as team lead' },
        { value: '4.5★', label: 'App Store', sublabel: 'up from 4.2' }
      ]
    },
    learnings: {
      sectionTitle: 'What I Learned',
      items: [
        {
          title: 'Don\'t break habits',
          description: '22M users have muscle memory. Radical changes confuse them. Small, clear improvements work better.'
        },
        {
          title: 'Utility apps need speed',
          description: 'People search for a plumber when they have a leak. Every millisecond counts. Especially on 3G.'
        },
        {
          title: 'Consistency is hard',
          description: 'iOS, Android, web, Wear: each platform has its own constraints. Shared patterns require constant negotiation.'
        },
        {
          title: 'Strategy creates leverage',
          description: 'At this scale, defining structure and rules (design system audit) creates more impact than individual screens.'
        }
      ]
    },
    cta: {
      title: 'Got a legacy product to modernize?',
      button: 'Get in touch'
    },
    scrollHint: 'Scroll to explore'
  },
  fr: {
    hero: {
      role: 'Product Designer → UI Team Lead',
      scope: 'Apps Mobiles, Web, Design System',
      period: '2014-2016',
      title: 'Refonte de PagesJaunes pour 22M d\'utilisateurs',
      subtitle: 'D\'un annuaire legacy vers une expérience mobile-first',
      description: 'Deux ans à moderniser l\'app utilitaire la plus téléchargée de France. J\'ai rejoint comme Product Designer, suis devenu UI Team Lead avec 4 designers, et livré des mises à jour majeures sur iOS, Android, web et Android Wear.'
    },
    testimonial: {
      quote: 'Victor est passionné par l\'UX et se tient constamment à jour des dernières tendances et méthodes. C\'est un designer très compétent qui peut faire le travail de terrain mais aussi prendre du recul pour conseiller sur les aspects plus stratégiques d\'une interface ou du projet dans son ensemble. Hautement recommandé dans une équipe UX ou produit.',
      author: 'Simon White',
      role: 'Director of UX @ PagesJaunes'
    },
    meta: {
      type: 'Mobile & Web',
      typeLabel: 'Type',
      scope: 'Refonte Apps',
      scopeLabel: 'Périmètre',
      period: '2014-2016',
      periodLabel: 'Période',
      company: 'PagesJaunes (Solocal)',
      companyLabel: 'Entreprise'
    },
    overview: {
      title: 'Vue d\'ensemble',
      introTitle: 'Le Contexte',
      introDesc: 'En 2014, PagesJaunes servait 15M+ de visiteurs mensuels mais restait ancré dans une logique d\'annuaire web. Les apps mobiles avaient des millions de téléchargements, mais l\'expérience était lourde. Le produit devait évoluer de fiches statiques vers une expérience fluide, personnelle et mobile-first, sans casser ce qui marchait.',
      roleTitle: 'Mon Rôle',
      roleDesc: 'J\'ai rejoint comme Product Designer sur le web, les partenariats (TheFork, Renault R-Link), et les flows de login. En 2015, je suis devenu UI Team Lead : coordination de 4 designers, ownership de la refonte mobile, et syncs hebdo avec les devs iOS/Android.',
      goalsTitle: 'Objectifs Clés',
      goals: [
        'Refonte de la homepage avec recherche par intention',
        'Livrer l\'onboarding natif pour iOS & Android',
        'Construire la navigation piétonne (API Mappy)',
        'Auditer et planifier le design system (Yellowstrap)'
      ]
    },
    homepage: {
      sectionTitle: 'Refonte Homepage',
      question: 'Comment rendre une recherche utilitaire personnelle et accueillante ?',
      intro: 'L\'ancienne homepage montrait deux champs : "Qui" et "Où". Ça marchait, mais c\'était froid et daté. On est passé à un design plus conversationnel.',
      greeting: 'Bonjour, de quoi avez-vous besoin ?',
      greetingDesc: 'Cette phrase amicale donnait le ton. Elle apportait de la chaleur à un outil utilitaire.',
      imagery: 'Imagerie Contextuelle',
      imageryDesc: 'On a conçu des règles de direction artistique pour des images de fond tournantes montrant des pros locaux : le boulanger, le garagiste, le fleuriste. Contextualisées selon la catégorie de recherche.',
      simplification: 'Simplification Recherche',
      simplificationDesc: 'Remplacement des deux champs par une barre de recherche unique. Réduction du bruit visuel. Unification du langage des onglets sur iOS et Android.'
    },
    searchEngine: {
      sectionTitle: 'Évolution Moteur de Recherche',
      question: 'Comment refondre le moteur de revenus sans perdre les utilisateurs ?',
      intro: 'Le moteur de recherche est le cœur de PagesJaunes. Avec près de 500M€ de revenus annuels liés au ranking et à la visibilité, chaque changement était à haut risque. Les utilisateurs devaient trouver les professionnels rapidement. Le business devait préserver le modèle de ranking qui monétisait chaque requête.',
      stakes: 'Enjeux Élevés',
      stakesDesc: 'Le moteur de recherche alimentait tout le modèle économique. La position dans les suggestions et résultats impactait directement les revenus publicitaires. Toute erreur de redesign pouvait coûter des millions.',
      model: 'Le Modèle "Quoi + Où"',
      modelDesc: 'Recherche structurée autour de deux questions : Quel professionnel ou entreprise cherchez-vous ? Où en avez-vous besoin ? Cette approche géolocalisée aide les utilisateurs à trouver des pros à proximité, consulter leurs infos, les appeler ou s\'y rendre.',
      materialDesign: 'Transitions Material Design',
      materialDesignDesc: 'On a implémenté les patterns Material Design de Google avec transitions Activity et animations d\'éléments partagés. La barre de recherche se transforme élégamment en résultats plein écran, maintenant le contexte tout en étendant les fonctionnalités.',
      shipped: 'Livré en Production',
      shippedDesc: 'Ce prototype est devenu l\'implémentation production déployée sur le Google Play Store. Les transitions fluides réduisent la latence perçue tout en préservant les habitudes utilisateur construites au fil des années.'
    },
    onboarding: {
      sectionTitle: 'Onboarding Natif',
      question: 'Comment guider 22M d\'utilisateurs à travers une mise à jour majeure ?',
      intro: 'On lançait une version majeure. Les utilisateurs devaient découvrir les nouvelles features sans être bloqués. On a conçu des animations courtes et non-bloquantes au premier lancement.',
      ios: 'Implémentation iOS',
      iosDesc: 'Utilisation de CAAnimation pour des séquences de walkthrough fluides. Itérations testées dans notre labo UX à Paris.',
      android: 'Implémentation Android',
      androidDesc: 'Utilisation des transitions Activity avec les codes Material Design. Coordination avec les devs sur les specs motion.',
      goals: 'Objectifs Onboarding',
      goalsList: [
        'Réduire les tickets support sur la navigation',
        'Booster la découverte des features (Favoris, Cartes)',
        'Augmenter la rétention première semaine'
      ]
    },
    navigation: {
      sectionTitle: 'Cartes & Itinéraire Piéton',
      question: 'Comment amener les utilisateurs de la recherche à la destination plus vite ?',
      intro: 'Trouver un pro, c\'est la moitié du travail. Les utilisateurs doivent s\'y rendre. On a construit une expérience de navigation piétonne complète sur l\'API Mappy.',
      features: 'Features Clés',
      featuresList: [
        'Aperçu itinéraires piétons turn-by-turn',
        'Handoff multi-apps : Waze, Google Maps, Apple Maps',
        'Optimisation réseau pour connexions 3G',
        'Split-view iPad avec clarté d\'itinéraire'
      ],
      tablet: 'Expérience Tablette',
      tabletDesc: 'Sur iPad, on a complètement repensé l\'expérience carte avec les split views natifs. Liste des directions d\'un côté, carte interactive de l\'autre. Support accessibilité complet avec Dynamic Type et VoiceOver.'
    },
    account: {
      sectionTitle: 'Mon PagesJaunes',
      question: 'Comment transformer des chercheurs passifs en utilisateurs engagés ?',
      intro: 'L\'espace fidélité et compte était fragmenté et sous-utilisé. On l\'a repensé pour soutenir la stratégie de rétention.',
      areas: 'Zones Clés',
      areasList: [
        'Favoris : sauvegarder et organiser les pros préférés',
        'Historique : accès rapide aux recherches récentes',
        'Contributions : soumission de photos et avis',
        'Compte : login et inscription simplifiés'
      ],
      contribution: 'Contributions Utilisateurs',
      contributionDesc: 'Conception de l\'expérience complète pour ajouter photos et avis depuis les fiches pro. Transformer les utilisateurs passifs en contributeurs actifs.'
    },
    wear: {
      sectionTitle: 'Android Wear',
      intro: 'Un projet expérimental, tourné vers l\'avenir. PagesJaunes voulait être présent sur les wearables. J\'ai conçu et développé cette app en duo avec Thibault Fighiera, dev Android. Deux mois du concept à la sortie Google Play.',
      scenario: '"Il est midi, Julien a faim. Il veut trouver rapidement un resto près du bureau et s\'y faire guider."',
      context: 'Contexte Projet',
      contextItems: [
        'Équipe agile de 3 : Designer (moi) + PO + Dev',
        'Oct-Déc 2015 : conception et développement en 2 mois',
        'Première étape du branding PagesJaunes vers Material Design',
        'Livré sur Google Play, décembre 2015'
      ],
      approach: 'Approche Design',
      approachDesc: 'Apprentissage des guidelines OS, évaluation des contraintes Android Wear, adaptation de la marque PagesJaunes. Design pour montre avec contexte en tête : usage low-effort, info scannable, actions rapides.',
      features: 'Ce qu\'on a construit',
      featuresList: [
        'UI en cartes avec notes, statut et CTA contact',
        'Deux flows utilisateur : recherche→appel et recherche→navigation',
        'Mode normal (jaune haut contraste) et mode ambiant (monochrome)',
        'Intégration recherche vocale "Ok Google"',
        'Handoff vers téléphone pour appels et navigation Google Maps'
      ],
      deliverables: 'Mes Livrables',
      deliverablesList: [
        'Documentation persona et user story',
        'Sketching et wireframing',
        'UI design et specs d\'interaction',
        'Prototypage et vidéos de démo',
        'Présentation aux stakeholders'
      ],
      collaborator: 'Thibault Fighiera',
      collaboratorRole: 'Développeur Android',
      collaboratorDesc: 'Collaboration back-to-back sur design et développement. Cycles d\'itération rapides avec tests sur device réel.'
    },
    system: {
      sectionTitle: 'Stratégie Design System',
      intro: 'Avec plusieurs plateformes et une divergence croissante des features, on avait besoin de fondations partagées. J\'ai mené le premier audit complet.',
      audit: 'L\'Audit',
      auditDesc: 'Revue de tous les écrans app sur iOS, Android et web. Interviews des designers et devs à travers les squads pour comprendre les points de friction.',
      roadmap: 'Roadmap Yellowstrap',
      roadmapDesc: 'Livraison de la roadmap système de composants et des guidelines. Définition des conventions de nommage, usage couleurs, styles CTA, indicateurs de statut. Outils pré-Figma : Zeplin, kits PDF, Sketch.',
      note: 'Note : Mon rôle était focalisé sur la définition stratégique et les besoins, pas sur la construction hands-on de la bibliothèque.'
    },
    team: {
      sectionTitle: 'Équipe & Collaboration',
      intro: 'Ce projet était impossible à réaliser seul. J\'ai travaillé avec les devs iOS/Android, le backend, le marketing et les PO.',
      led: 'J\'ai piloté',
      ledList: [
        'Direction UI et specs composants',
        'Rituels d\'équipe design et mentoring (4 designers)',
        'Présentations executive (User Club Day, revues roadmap)'
      ],
      collaborated: 'J\'ai collaboré avec',
      collaboratedList: [
        'Backend pour le shaping des payloads API',
        'Équipes mobiles pour les specs animation et scroll',
        'Marketing pour les guidelines imagerie homepage'
      ],
      rituals: 'Crits et retros hebdo. Boucles de feedback rapides, alignement serré.'
    },
    impact: {
      sectionTitle: 'Résultats',
      metrics: [
        { value: '22M+', label: 'Téléchargements', sublabel: 'installations cumulées' },
        { value: '300K', label: 'Utilisateurs/jour', sublabel: 'au pic d\'usage' },
        { value: '4', label: 'Designers', sublabel: 'managés comme lead' },
        { value: '4.5★', label: 'App Store', sublabel: 'vs 4.2 avant' }
      ]
    },
    learnings: {
      sectionTitle: 'Ce que j\'ai appris',
      items: [
        {
          title: 'Ne pas casser les habitudes',
          description: '22M d\'utilisateurs ont une mémoire musculaire. Les changements radicaux les perdent. Des améliorations petites et claires marchent mieux.'
        },
        {
          title: 'L\'utilitaire exige la vitesse',
          description: 'Les gens cherchent un plombier quand ils ont une fuite. Chaque milliseconde compte. Surtout en 3G.'
        },
        {
          title: 'La cohérence, c\'est dur',
          description: 'iOS, Android, web, Wear : chaque plateforme a ses contraintes. Les patterns partagés demandent une négociation constante.'
        },
        {
          title: 'La stratégie crée du levier',
          description: 'À cette échelle, définir la structure et les règles (audit design system) crée plus d\'impact que des écrans individuels.'
        }
      ]
    },
    cta: {
      title: 'Un produit legacy à moderniser ?',
      button: 'Me contacter'
    },
    scrollHint: 'Défiler pour explorer'
  }
};

// ============================================================================
// ANIMATION COMPONENT
// ============================================================================

const FadeInSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: delay * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PagesJaunesFull: React.FC<PagesJaunesFullProps> = ({
  systemTheme,
  lang,
  onImageClick,
  onContact,
  onNavigateToProject
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <div className={`${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">

        {/* ================================================================ */}
        {/* HERO SECTION */}
        {/* ================================================================ */}
        <section className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left Column - Main Content */}
            <div className="md:col-span-3">
              {/* Role Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium ${
                  isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {t.hero.role}
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {t.hero.scope}
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {t.hero.period}
                </span>
              </div>

              {/* Main Title */}
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <h2 className={`text-xl md:text-2xl font-bold mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t.hero.subtitle}
              </h2>

              {/* Description */}
              <p className={`text-base leading-relaxed mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t.hero.description}
              </p>
            </div>

            {/* Right Column - Testimonial */}
            <div className="md:col-span-2">
              <div className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-yellow-900/20 border-yellow-500/20'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <Quote size={24} className={isDark ? 'text-yellow-400 mb-4' : 'text-yellow-600 mb-4'} />
                <p className={`text-sm italic leading-relaxed mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t.testimonial.quote}
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    loading="lazy"
                    src="/images/simon-white.webp"
                    alt={t.testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.testimonial.author}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* META CARD */}
        {/* ================================================================ */}
        <div className={`p-6 rounded-3xl border mb-12 ${
          isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'
        }`}>
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
              <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                <Briefcase size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
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
              <div className={`p-2 rounded-xl ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                <Building2 size={20} className={isDark ? 'text-orange-400' : 'text-orange-600'} />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.meta.companyLabel}</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* HERO IMAGE */}
        {/* ================================================================ */}
        <figure className="mb-24 md:mb-32">
          <div
            onClick={() => onImageClick('/images/thumbnail_pagesjaunes_sp_tablette.webp')}
            className={`rounded-2xl overflow-hidden border cursor-pointer ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <img
              loading="lazy"
              src="/images/thumbnail_pagesjaunes_sp_tablette.webp"
              alt="PagesJaunes Mobile Apps"
              className="w-full h-auto"
            />
          </div>
        </figure>

        {/* ================================================================ */}
        {/* OVERVIEW SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="overview" className="mb-24 md:mb-32">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.overview.title}
            </h1>
            <hr className={`mb-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h2 className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.overview.introTitle}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.introDesc}
                </p>
              </div>

              <div>
                <h2 className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.overview.roleTitle}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.roleDesc}
                </p>
              </div>

              <div>
                <h2 className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.overview.goalsTitle}
                </h2>
                <ul className={`text-base leading-relaxed space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.overview.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* HOMEPAGE SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="homepage" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                <Smartphone size={20} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.homepage.sectionTitle}
              </h2>
            </div>

            <p className={`text-lg italic mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.homepage.question}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.homepage.intro}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  "{t.homepage.greeting}"
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.homepage.greetingDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.homepage.imagery}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.homepage.imageryDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.homepage.simplification}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.homepage.simplificationDesc}
                </p>
              </div>
            </div>

            {/* Homepage iOS & Android */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.homepage.main)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.homepage.main}
                  alt="PagesJaunes Homepage iOS & Android"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].homepage.main}
              </figcaption>
            </figure>

            {/* Homepage Variations */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.homepage.variations)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.homepage.variations}
                  alt="PagesJaunes Homepage Variations"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].homepage.variations}
              </figcaption>
            </figure>

            {/* iPad Homepage */}
            <div className="grid md:grid-cols-2 gap-6">
              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.homepageIpad.main)}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    loading="lazy"
                    src={GALLERY_IMAGES.homepageIpad.main}
                    alt="PagesJaunes iPad Homepage"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].homepageIpad.main}
                </figcaption>
              </figure>

              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.homepageIpad.variations)}
                  className={`rounded-2xl overflow-hidden border cursor-pointer ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    loading="lazy"
                    src={GALLERY_IMAGES.homepageIpad.variations}
                    alt="PagesJaunes iPad Homepage Variations"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].homepageIpad.variations}
                </figcaption>
              </figure>
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* SEARCH ENGINE EVOLUTION SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="search" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                <Search size={20} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.searchEngine.sectionTitle}
              </h2>
            </div>

            <p className={`text-lg italic mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.searchEngine.question}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.searchEngine.intro}
            </p>

            {/* Key Points Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.searchEngine.stakes}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.searchEngine.stakesDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.searchEngine.model}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.searchEngine.modelDesc}
                </p>
              </div>
            </div>

            {/* Search Flow Image */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.search.flow)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.search.flow}
                  alt="PagesJaunes Search Flow"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].search.flow}
              </figcaption>
            </figure>

            {/* Material Design Implementation */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.searchEngine.materialDesign}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.searchEngine.materialDesignDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.searchEngine.shipped}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.searchEngine.shippedDesc}
                </p>
              </div>
            </div>

            {/* Search Engine Prototype Video */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.search.prototype)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] relative ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
                style={{ backgroundColor: '#C8C8C8', width: '100%', height: 0, paddingTop: '66.67%', position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Video with drop shadow */}
                  <div className="relative rounded-lg overflow-hidden" style={{ maxWidth: '384px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)' }}>
                    <video
                      src={GALLERY_IMAGES.search.prototype}
                      className="w-full h-auto"
                      muted
                      playsInline
                      loop
                      autoPlay
                    />
                  </div>
                </div>
                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 bg-white/30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].search.prototype}
              </figcaption>
            </figure>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* ONBOARDING SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="onboarding" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Users size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.onboarding.sectionTitle}
              </h2>
            </div>

            <p className={`text-lg italic mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.onboarding.question}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.onboarding.intro}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.onboarding.ios}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.onboarding.iosDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.onboarding.android}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.onboarding.androidDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.onboarding.goals}
                </p>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.onboarding.goalsList.map((goal, idx) => (
                    <li key={idx}>• {goal}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Onboarding Videos */}
            <div className="grid md:grid-cols-2 gap-6">
              <figure>
                <div
                  onClick={() => onImageClick('/images/pj-ios-app-onboarding-animation.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer group relative ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/images/pj-ios-app-onboarding-animation.mp4"
                    className="w-full h-auto"
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 bg-white/20">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.onboarding.ios}
                </figcaption>
              </figure>

              <figure>
                <div
                  onClick={() => onImageClick('/images/pj-and-app-onboarding-animation.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer group relative ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/images/pj-and-app-onboarding-animation.mp4"
                    className="w-full h-auto"
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 bg-white/20">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.onboarding.android}
                </figcaption>
              </figure>
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* NAVIGATION SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="navigation" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <Map size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.navigation.sectionTitle}
              </h2>
            </div>

            <p className={`text-lg italic mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.navigation.question}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.navigation.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.navigation.features}
                </p>
                <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.navigation.featuresList.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.navigation.tablet}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.navigation.tabletDesc}
                </p>
              </div>
            </div>

            {/* Transit System Components */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.maps.system)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.system}
                  alt="PagesJaunes Transit System Components"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].maps.system}
              </figcaption>
            </figure>

            {/* Multi-device Navigation */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.maps.multidevice)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.multidevice}
                  alt="PagesJaunes Multi-device Navigation"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].maps.multidevice}
              </figcaption>
            </figure>

            {/* iPhone Navigation Flows */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.maps.iphoneFlows)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.iphoneFlows}
                  alt="PagesJaunes iPhone Navigation Flows"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].maps.iphoneFlows}
              </figcaption>
            </figure>

            {/* iPad Itinerary */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.maps.ipadItinerary)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.ipadItinerary}
                  alt="PagesJaunes iPad Itinerary"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].maps.ipadPedestrian}
              </figcaption>
            </figure>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* ACCOUNT SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="account" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
                <Users size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.account.sectionTitle}
              </h2>
            </div>

            <p className={`text-lg italic mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.account.question}
            </p>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.account.intro}
            </p>

            {/* Account Flow */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.account.flow)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.account.flow}
                  alt="PagesJaunes Account Flow"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].account.flow}
              </figcaption>
            </figure>

            {/* Engagement Features */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.account.engagement)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.account.engagement}
                  alt="PagesJaunes Engagement Features"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].account.engagement}
              </figcaption>
            </figure>

            {/* Desktop Review Editing */}
            <figure className="mb-8">
              <div
                onClick={() => onImageClick(GALLERY_IMAGES.contributions.desktopReview)}
                className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.contributions.desktopReview}
                  alt="PagesJaunes Desktop Review Editing"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {CAPTIONS[lang].contributions.desktopReview}
              </figcaption>
            </figure>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* MICRO-INTERACTIONS SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="micro-interactions" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-pink-500/20' : 'bg-pink-100'}`}>
                <Heart size={20} className={isDark ? 'text-pink-400' : 'text-pink-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {CAPTIONS[lang].microInteractions.sectionTitle}
              </h2>
            </div>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {CAPTIONS[lang].microInteractions.intro}
            </p>

            {/* Micro-interactions Grid - 3 columns, 2:3 aspect ratio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Navigation Drawer */}
              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.microInteractions.navDrawer)}
                  className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <div
                    className="aspect-[2/3] flex items-center justify-center"
                    style={{ backgroundColor: '#C8C8C8' }}
                  >
                    <img
                      loading="lazy"
                      src={GALLERY_IMAGES.microInteractions.navDrawer}
                      alt="Material Design Navigation Drawer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].microInteractions.navDrawer}
                </figcaption>
              </figure>

              {/* Favorites Animation */}
              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.microInteractions.favorites)}
                  className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] relative ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <div
                    className="aspect-[2/3] flex items-center justify-center"
                    style={{ backgroundColor: '#C8C8C8' }}
                  >
                    <video
                      src={GALLERY_IMAGES.microInteractions.favorites}
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].microInteractions.favorites}
                </figcaption>
              </figure>

              {/* History Remarketing Animation */}
              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.microInteractions.historyRemarketing)}
                  className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] relative ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <div
                    className="aspect-[2/3] flex items-center justify-center"
                    style={{ backgroundColor: '#C8C8C8' }}
                  >
                    <video
                      src={GALLERY_IMAGES.microInteractions.historyRemarketing}
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].microInteractions.historyRemarketing}
                </figcaption>
              </figure>
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* ANDROID WEAR SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="wear" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                <Watch size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.wear.sectionTitle}
              </h2>
            </div>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.wear.intro}
            </p>

            {/* Key visuals - 2-column grid with square aspect ratio */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.wear.thumbnail)}
                  className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] aspect-square ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    loading="lazy"
                    src={GALLERY_IMAGES.wear.thumbnail}
                    alt="PagesJaunes Android Wear"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].wear.thumbnail}
                </figcaption>
              </figure>
              <figure>
                <div
                  onClick={() => onImageClick(GALLERY_IMAGES.wear.yAllerBtn)}
                  className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.01] aspect-square ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    loading="lazy"
                    src={GALLERY_IMAGES.wear.yAllerBtn}
                    alt="Y Aller navigation button"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {CAPTIONS[lang].wear.yAllerBtn}
                </figcaption>
              </figure>
            </div>

            {/* CTA to dedicated Android Wear case study */}
            <div
              onClick={() => onNavigateToProject?.('androidwear')}
              className={`group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:scale-[1.005] ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-5">
                {/* Mobile: Stack vertically / Desktop: Horizontal */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {/* Thumbnail + Content row on mobile */}
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    {/* Square thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        loading="lazy"
                        src={GALLERY_IMAGES.wear.insituStore}
                        alt="PagesJaunes Android Wear"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {lang === 'en' ? 'Case Study' : 'Case Study'}
                      </p>
                      <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'en'
                          ? 'PagesJaunes on your wrist'
                          : 'PagesJaunes au poignet'}
                      </h3>
                      <p className={`text-sm line-clamp-2 sm:line-clamp-none ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lang === 'en'
                          ? 'When users need a plumber now, can a watch be faster than pulling out a phone?'
                          : 'Quand l\'utilisateur a besoin d\'un plombier maintenant, une montre peut-elle être plus rapide qu\'un téléphone ?'}
                      </p>
                    </div>
                  </div>
                  {/* CTA button - full width on mobile, auto on desktop */}
                  <div className="flex-shrink-0 sm:self-center">
                    <span className="flex sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#2D5CF3] text-white text-sm font-semibold transition-transform duration-300 group-hover:scale-105 whitespace-nowrap">
                      {lang === 'en' ? 'Read more' : 'Lire la suite'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* DESIGN SYSTEM SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="design-system" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                <Palette size={20} className={isDark ? 'text-orange-400' : 'text-orange-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.system.sectionTitle}
              </h2>
            </div>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.system.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.system.audit}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.system.auditDesc}
                </p>
              </div>

              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.system.roadmap}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.system.roadmapDesc}
                </p>
              </div>
            </div>

            <p className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {t.system.note}
            </p>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* TEAM SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="team" className="mb-24 md:mb-32">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
                <Users size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.team.sectionTitle}
              </h2>
            </div>

            <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.team.intro}
            </p>

            {/* Phase 1: 2014-2015 - UX Core Team */}
            <div className={`p-6 rounded-2xl border mb-6 ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                  2014–2015
                </span>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {lang === 'en' ? 'UX Core Team' : 'Équipe UX centrale'}
                </h3>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {lang === 'en' ? 'My role: Product Designer' : 'Mon rôle : Product Designer'}
                </span>
              </div>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'en'
                  ? 'Integrated within the central UX team, working on cross-platform design strategy and visual direction.'
                  : 'Intégré à l\'équipe UX centrale, travail sur la stratégie design cross-plateforme et la direction visuelle.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Simon White', role: 'Director of UX', url: 'https://www.linkedin.com/in/fruey/' },
                  { name: 'Benjamin Dupont', role: 'Head of UX', url: 'https://www.linkedin.com/in/benjamin-dupont-141b7312/' },
                  { name: 'Karl Smits', role: 'Lead UX', url: 'https://www.linkedin.com/in/karlsmits/' },
                  { name: 'Fabien Bajeot', role: 'Lead UX Research', url: null },
                  { name: 'Qian Xu', role: 'UI Designer', url: 'https://www.linkedin.com/in/alixxu/' },
                  { name: 'Mylène Roquinarc\'h', role: 'UI Designer', url: null },
                  { name: 'Emilie Conty', role: 'Marketing Manager', url: 'https://www.linkedin.com/in/emilie-conty/' },
                  { name: 'Taline Kabakian', role: 'Marketing UGC', url: 'https://www.linkedin.com/in/talinekabakian/' },
                  { name: 'Nicolas Moulin', role: 'Marketing Director', url: 'https://www.linkedin.com/in/moulinnicolas/' },
                  { name: 'François Khoury', role: 'Business Owner', url: 'https://www.linkedin.com/in/francoisk/' },
                ].map((person, idx) => (
                  person.url ? (
                    <a
                      key={idx}
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</span>
                    </a>
                  ) : (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                        isDark
                          ? 'bg-white/5 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</span>
                    </span>
                  )
                ))}
              </div>
            </div>

            {/* Phase 2: 2015-2016 - Feature Team */}
            <div className={`p-6 rounded-2xl border mb-6 ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                  2015–2016
                </span>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {lang === 'en' ? 'Feature Team' : 'Feature Team'}
                </h3>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {lang === 'en' ? 'My role: Product Designer → UI Team Lead' : 'Mon rôle : Product Designer → UI Team Lead'}
                </span>
              </div>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'en'
                  ? 'Dedicated squad for homepage redesign, Material Design integration, user accounts, favorites, and history.'
                  : 'Squad dédiée à la refonte homepage, intégration Material Design, compte utilisateur, favoris et historique.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Vedran Beric', role: 'UX/UI Designer', url: 'https://www.linkedin.com/in/vedran-beric-26002155/' },
                  { name: 'Frédéric Rodriguez', role: 'Product Manager', url: 'https://www.linkedin.com/in/frederic-rodriguez-71061255/' },
                  { name: 'Thibault Fighiera', role: 'Android Dev', url: 'https://www.linkedin.com/in/thibault-fighiera-65794731/' },
                  { name: 'Alexandre Badie', role: 'Android Dev', url: null },
                  { name: 'Jérémie Godon', role: 'iOS Dev', url: 'https://www.linkedin.com/in/jgodon/' },
                  { name: 'Jeffrey Macko', role: 'iOS Dev', url: 'https://www.linkedin.com/in/mackojeffrey/' },
                  { name: 'Marilyn Kol', role: 'Scrum Master', url: 'https://www.linkedin.com/in/marilyn-kol-933878b0/' },
                  { name: 'Nicolas Dovran', role: 'Team Lead', url: 'https://www.linkedin.com/in/nicolas-dovran-scrum-coach-agile/' },
                ].map((person, idx) => (
                  person.url ? (
                    <a
                      key={idx}
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</span>
                    </a>
                  ) : (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                        isDark
                          ? 'bg-white/5 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</span>
                    </span>
                  )
                ))}
              </div>
            </div>

            <p className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {t.team.rituals}
            </p>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* IMPACT SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="impact" className="mb-24 md:mb-32">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.impact.sectionTitle}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.impact.metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <p className={`text-4xl md:text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {metric.value}
                  </p>
                  <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {metric.label}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {metric.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* LEARNINGS SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section id="learnings" className="mb-24 md:mb-32">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.learnings.sectionTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.learnings.items.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* ================================================================ */}
        {/* CTA SECTION */}
        {/* ================================================================ */}
        <FadeInSection>
          <section className="text-center py-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
            >
              {t.cta.button}
              <ArrowRight size={22} />
            </button>
          </section>
        </FadeInSection>

      </div>
    </div>
  );
};

export default PagesJaunesFull;
