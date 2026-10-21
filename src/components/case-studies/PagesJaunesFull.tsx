/**
 * PagesJaunesFull - Full narrative case study version
 *
 * Complete deep-dive into the 2-year design work at PagesJaunes (2014-2016)
 */

import React, { useRef } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import { motion, useInView } from 'framer-motion';
import { zoomable } from '@/utils/zoomable'
import ReadMoreList from './ReadMoreList';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';

interface PagesJaunesFullProps {
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
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
    ipadPedestrian: '/images/pagesjaunes/pj_ipad_itineraire_pieton.webp',
    ipadTransit: '/images/pagesjaunes/pj_ipad_itineraire_transports.webp',
    ipadDriving: '/images/pagesjaunes/pj_ipad_itineraire_voiture.webp',
    iphonePedestrian: '/images/pagesjaunes/pj_iphone_itineraire_pieton.webp',
    iphoneTransit: '/images/pagesjaunes/pj_iphone_itineraire_transports.webp',
    iphoneDriving: '/images/pagesjaunes/pj_iphone_itineraire_voiture.webp',
    iphoneFlows: '/images/pagesjaunes/pagejaunes itineraire iphone.webp',
    ipadItinerary: '/images/pagesjaunes/pagejaunes itineraire ipad.webp',
  },
  wear: {
    flows: '/images/pagesjaunes/Android wear/pj android wear flows.webp',
    uiModes: '/images/pagesjaunes/Android wear/pj android wear ui modes.webp',
    ui: '/images/pagesjaunes/Android wear/pj android wear ui.webp',
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
      sectionTitle: 'Micro-interactions',
      intro: 'Motion specs I delivered to dev teams. These animations shipped in production across iOS and Android.',
      navDrawer: 'Material Design Navigation Drawer. Familiar Android pattern, PagesJaunes colors. Users already know how this works.',
      favorites: 'Heart animation on "Add to Favorites". The bounce gives instant feedback that the action worked.',
      historyRemarketing: 'History screen with photo upload prompt. Encouraging users to share their experience after visiting a business.',
    },
  },
  fr: {
    homepage: {
      main: 'Une accroche conversationnelle («\u202fDe quoi avez-vous besoin\u00a0?\u202f») transforme la recherche d\'annuaire en résolution de problème. Les utilisateurs agissent plus vite quand l\'interface est personnelle.',
      variations: 'Huit visuels contextuels de professionnels locaux\u00a0: boulanger, garagiste, fleuriste. Chacun crée la confiance en montrant l\'humain derrière le service.',
    },
    homepageIpad: {
      main: 'Deux variantes de la page d\'accueil sur iPad, avec des photographies de professionnels en arrière-plan. Chaque visuel met en avant un professionnel local, ce qui crée chaleur et confiance dès le premier regard.',
      variations: 'Visuels héros adaptatifs sur iPhone 4, Retina, iPad, téléphone et tablette Android. Détection automatique du point focal avec recadrage adapté à l\'écran. Co-développé avec Alexandre Badie, développeur Android principal.',
    },
    artDirection: {
      before: 'Avant\u00a0: photo brute. Le sujet entre en concurrence avec les éléments de fond.',
      after: 'Après\u00a0: cadrage stratégique et étalonnage couleur. L\'attention se déplace vers l\'expertise de l\'artisan.',
    },
    search: {
      flow: 'De la requête à la fiche en trois appuis. L\'autocomplétion réduit la charge cognitive, le contexte de localisation évite les saisies redondantes.',
      prototype: 'Prototype de l\'évolution du moteur de recherche. Transitions d\'activité Material Design avec animations d\'éléments partagés. La barre de recherche se transforme en résultats plein écran.',
    },
    account: {
      flow: 'La connexion sociale réduit la friction de 60\u00a0%. La connexion par e-mail et mot de passe reste disponible pour ceux qui la préfèrent.',
      engagement: 'Historique et favoris transforment les recherches ponctuelles en valeur conservée. Chaque établissement enregistré est une raison de revenir.',
    },
    maps: {
      system: 'Les icônes de transport portent des données\u00a0: couleurs des lignes de métro, noms de stations, segments à pied. Tout est extrait de l\'API Mappy et mis en forme pour une lecture rapide.',
      multidevice: 'Un trajet, trois modes\u00a0: marche, voiture, transports. L\'interface s\'adapte au choix de l\'utilisateur, la destination reste la même.',
      ipadPedestrian: 'Navigation iPad en vue scindée\u00a0: la carte à gauche, le guidage pas à pas à droite. Tout est visible, sans changer d\'onglet.',
      ipadTransit: 'Transports en commun sur tablette\u00a0: les lignes de métro servent de repères visuels. Les utilisateurs suivent leur trajet sans tout lire.',
      ipadDriving: 'Mode voiture avec relais vers une autre app\u00a0: «\u202fGuidez-moi avec...\u202f» propose Waze, Google Maps, Plans. La navigation passe par l\'app préférée de l\'utilisateur.',
      iphonePedestrian: 'Vue piéton sur mobile avec calories et durée estimée. Un itinéraire qui met aussi en avant un bénéfice pour la santé.',
      iphoneTransit: 'Détail des transports\u00a0: marche 3 min, ligne 1 pendant 20 min, ligne 11 pendant 7 min. Des trajets complexes lisibles d\'un coup d\'œil.',
      iphoneDriving: 'Itinéraire en voiture avec relais vers une autre app. Le bouton jaune respecte les conventions de la plateforme tout en gardant la marque présente.',
      iphoneFlows: 'Trois parcours sur iPhone\u00a0: feuille de route, aperçu de la carte, détail des transports. Chaque écran répond à une question différente de l\'utilisateur.',
    },
    wear: {
      flows: 'Parcours sur montre\u00a0: recherche puis appel, ou recherche puis navigation. Deux usages, deux chemins, un minimum d\'appuis.',
      uiModes: 'Le mode normal utilise un jaune à fort contraste pour l\'interaction active. Le mode ambiant passe en monochrome pour économiser la batterie.',
      ui: 'Système de composants Android Wear\u00a0: états de chargement, position du lanceur, accueil, résultats, fiches détail, boutons d\'action.',
      flowsDetailed: 'Parcours utilisateur avec relais vers le téléphone. Deux scénarios\u00a0: «\u202fTrouver un resto et appeler\u202f» (lance le composeur) ou «\u202fTrouver et y aller\u202f» (ouvre Google Maps).',
      components: 'Inventaire des écrans\u00a0: chargement, lanceur, accueil, liste de résultats, fiche détail, actions. Recommandations pour les écrans carrés et ronds.',
      ambient: 'Croquis du mode ambiant. Chaque état d\'écran est associé à un affichage basse consommation. Contours blancs sur fond noir pour économiser la batterie sur écran OLED.',
      insituStore: 'Visuel promotionnel pour Google Play Store. Maquette de montre sur fond jaune PagesJaunes, avec l\'écran d\'accueil et ses raccourcis de catégories.',
      insituDetail: 'Fiche du professionnel en contexte. Hiérarchie de l\'information\u00a0: nom, catégorie, statut, note, téléphone, adresse. Lisible en moins de 2 secondes.',
      sketches: 'Premiers croquis du parcours de rappel. L\'utilisateur peut programmer un rappel après avoir appelé un commerce, pour récupérer une commande plus tard.',
      devSession: 'Test sur appareil réel avec Thibault. Deux montres connectées, smartphone synchronisé, itérations sur la version en temps réel.',
      thumbnail: 'App PagesJaunes Android Wear sur un cadran de montre. Recherche locale lisible d\'un coup d\'œil.',
      yAllerBtn: 'Écran d\'action de navigation. Le bouton « Y aller » ouvre Google Maps en un appui.',
      designWork: 'Session de design dans Keynote. Construction du parcours complet de la fiche détail\u00a0: infos du commerce, aperçu de la carte, horaires, budget, boutons d\'action.',
      prototypeVideo: 'Prototype fonctionnel sur matériel réel. Parcours complet du lancement de l\'app à la fiche détail, jusqu\'à la transmission de l\'appel au téléphone.',
    },
    contributions: {
      desktopReview: 'Interface web sur ordinateur pour l\'édition d\'avis. Notes multicritères par étoiles, champs pour et contre, limites de caractères, mise en forme enrichie. Adaptée de l\'ordinateur à la tablette.',
    },
    tooltips: {
      redesign: 'Des info-bulles contextuelles guident la découverte des fonctionnalités. Hiérarchie visuelle claire, animation d\'entrée, perturbation minimale du parcours.',
    },
    microInteractions: {
      sectionTitle: 'Micro-interactions',
      intro: 'Spécifications de mouvement livrées aux équipes de développement. Ces animations sont passées en production sur iOS et Android.',
      navDrawer: 'Tiroir de navigation Material Design. Motif Android familier, aux couleurs de PagesJaunes. Les utilisateurs savent déjà comment il fonctionne.',
      favorites: 'Animation en forme de cœur sur « Ajouter aux favoris ». Le rebond confirme immédiatement que l\'action a fonctionné.',
      historyRemarketing: 'Écran Historique avec invitation à ajouter une photo. Encourager les utilisateurs à partager leur expérience après une visite.',
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
      role: 'Director of UX at PagesJaunes'
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
      materialDesignDesc: 'We implemented Google\'s Material Design patterns with Activity transitions and shared element animations. The search bar expands into full-screen results, keeping context while adding functionality.',
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
      note: 'Note: my role covered strategic definition and requirements. I did not build the library hands-on.'
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
  },
  fr: {
    hero: {
      role: 'Product Designer → UI Team Lead',
      scope: 'Apps mobiles, web, design system',
      period: '2014-2016',
      title: 'Refonte de PagesJaunes pour 22 millions d\'utilisateurs',
      subtitle: 'D\'un annuaire hérité à une expérience pensée d\'abord pour le mobile',
      description: 'Deux ans à moderniser l\'app utilitaire la plus téléchargée de France. J\'ai rejoint l\'équipe comme Product Designer, puis je suis devenu responsable de l\'équipe UI avec 4 designers, et j\'ai livré des mises à jour majeures sur iOS, Android, le web et Android Wear.'
    },
    testimonial: {
      quote: 'Victor est passionné par l\'UX et se tient constamment à jour des dernières tendances et méthodes. C\'est un designer très compétent, capable de faire le travail de terrain mais aussi de prendre du recul pour conseiller sur les aspects plus stratégiques d\'une interface ou du projet dans son ensemble. Hautement recommandé dans une équipe UX ou produit.',
      author: 'Simon White',
      role: 'Directeur UX chez PagesJaunes'
    },
    meta: {
      type: 'Mobile et web',
      typeLabel: 'Type',
      scope: 'Refonte des apps',
      scopeLabel: 'Périmètre',
      period: '2014-2016',
      periodLabel: 'Période',
      company: 'PagesJaunes (Solocal)',
      companyLabel: 'Entreprise'
    },
    overview: {
      title: 'Vue d\'ensemble',
      introTitle: 'Le contexte',
      introDesc: 'En 2014, PagesJaunes comptait plus de 15 millions de visiteurs mensuels mais restait ancré dans une logique d\'annuaire web. Les apps mobiles avaient des millions de téléchargements, mais l\'expérience était lourde. Le produit devait passer de fiches statiques à une expérience fluide, personnelle et pensée d\'abord pour le mobile, sans casser ce qui fonctionnait pour les utilisateurs existants.',
      roleTitle: 'Mon rôle',
      roleDesc: 'J\'ai rejoint l\'équipe comme Product Designer sur le web, les partenariats (TheFork, Renault R-Link) et les parcours de connexion. En 2015, je suis devenu responsable de l\'équipe UI\u00a0: coordination de 4 designers, pilotage de la refonte mobile et points hebdomadaires avec les développeurs iOS et Android.',
      goalsTitle: 'Objectifs clés',
      goals: [
        'Refonte de la page d\'accueil avec une recherche guidée par l\'intention',
        'Livrer l\'onboarding natif pour iOS et Android',
        'Construire la navigation piétonne (API Mappy)',
        'Auditer et planifier le design system (Yellowstrap)'
      ]
    },
    homepage: {
      sectionTitle: 'Refonte de la page d\'accueil',
      question: 'Comment rendre une recherche utilitaire personnelle et accueillante\u00a0?',
      intro: 'L\'ancienne page d\'accueil montrait deux champs\u00a0: «\u202fQui\u202f» et «\u202fOù\u202f». Elle fonctionnait, mais paraissait froide et datée. Nous sommes passés à un design plus conversationnel.',
      greeting: 'Bonjour, de quoi avez-vous besoin\u00a0?',
      greetingDesc: 'Cette phrase amicale donnait le ton. Elle apportait de la chaleur à un outil utilitaire.',
      imagery: 'Imagerie contextuelle',
      imageryDesc: 'Nous avons défini des règles de direction artistique pour des images de fond tournantes montrant des professionnels locaux\u00a0: le boulanger, le garagiste, le fleuriste. Elles varient selon la catégorie de recherche.',
      simplification: 'Simplification de la recherche',
      simplificationDesc: 'Remplacement des deux champs par une barre de recherche unique. Moins de bruit visuel. Langage des onglets unifié sur iOS et Android.'
    },
    searchEngine: {
      sectionTitle: 'Évolution du moteur de recherche',
      question: 'Comment refondre le moteur de revenus sans perdre les utilisateurs\u00a0?',
      intro: 'Le moteur de recherche est le cœur de PagesJaunes. Avec près de 500 M€ de revenus annuels liés au classement et à la visibilité, chaque changement comportait un risque élevé. Les utilisateurs devaient trouver rapidement les professionnels. L\'entreprise devait préserver le modèle de classement qui monétisait chaque requête.',
      stakes: 'Enjeux élevés',
      stakesDesc: 'Le moteur de recherche portait tout le modèle économique. La position dans les suggestions et les résultats influait directement sur les revenus publicitaires. Une erreur de refonte pouvait coûter des millions.',
      model: 'Le modèle «\u202fQuoi + Où\u202f»',
      modelDesc: 'La recherche s\'organise autour de deux questions\u00a0: quel professionnel ou quelle entreprise cherchez-vous\u00a0? Où en avez-vous besoin\u00a0? Cette approche géolocalisée aide les utilisateurs à trouver des professionnels à proximité, à consulter leurs informations, à les appeler ou à s\'y rendre.',
      materialDesign: 'Transitions Material Design',
      materialDesignDesc: 'Nous avons mis en œuvre les motifs Material Design de Google avec des transitions d\'activité et des animations d\'éléments partagés. La barre de recherche se transforme en résultats plein écran, en conservant le contexte tout en étendant les fonctionnalités.',
      shipped: 'Livré en production',
      shippedDesc: 'Ce prototype est devenu l\'implémentation de production déployée sur le Google Play Store. Les transitions fluides réduisent la latence perçue, tandis que le modèle de recherche familier préserve les habitudes construites au fil des années.'
    },
    onboarding: {
      sectionTitle: 'Onboarding natif',
      question: 'Comment guider 22 millions d\'utilisateurs à travers une mise à jour majeure\u00a0?',
      intro: 'Nous lancions une version majeure. Les utilisateurs devaient découvrir les nouveautés sans être bloqués. Nous avons conçu des animations courtes et non bloquantes au premier lancement.',
      ios: 'Implémentation iOS',
      iosDesc: 'Utilisation de CAAnimation pour des séquences de présentation fluides. Itérations testées dans notre laboratoire UX à Paris.',
      android: 'Implémentation Android',
      androidDesc: 'Utilisation des transitions d\'activité avec les codes Material Design. Coordination avec l\'équipe de développement sur les spécifications de mouvement.',
      goals: 'Objectifs de l\'onboarding',
      goalsList: [
        'Réduire les demandes au support sur la navigation',
        'Favoriser la découverte des fonctionnalités (favoris, cartes)',
        'Augmenter la rétention de la première semaine'
      ]
    },
    navigation: {
      sectionTitle: 'Cartes et itinéraire piéton',
      question: 'Comment amener les utilisateurs de la recherche à la destination plus vite\u00a0?',
      intro: 'Trouver un professionnel, c\'est la moitié du travail. Les utilisateurs doivent s\'y rendre. Nous avons construit une expérience de navigation piétonne complète sur l\'API Mappy.',
      features: 'Fonctionnalités clés',
      featuresList: [
        'Aperçu des itinéraires piétons avec guidage pas à pas',
        'Relais vers d\'autres apps\u00a0: Waze, Google Maps, Plans',
        'Optimisation réseau pour les connexions 3G',
        'Vue scindée sur iPad avec itinéraire lisible'
      ],
      tablet: 'Expérience sur tablette',
      tabletDesc: 'Sur iPad, nous avons entièrement repensé l\'expérience de la carte avec des vues scindées natives. La liste des indications d\'un côté, la carte interactive de l\'autre. Prise en charge complète de l\'accessibilité avec Dynamic Type et VoiceOver.'
    },
    account: {
      sectionTitle: 'Mon PagesJaunes',
      question: 'Comment transformer des chercheurs passifs en utilisateurs engagés\u00a0?',
      intro: 'L\'espace fidélité et compte était fragmenté et sous-utilisé. Nous l\'avons repensé pour soutenir la stratégie de rétention.',
      areas: 'Zones clés',
      areasList: [
        'Favoris\u00a0: enregistrer et organiser ses professionnels préférés',
        'Historique\u00a0: accès rapide aux recherches récentes',
        'Contributions\u00a0: ajout de photos et d\'avis',
        'Compte\u00a0: connexion et inscription simplifiées'
      ],
      contribution: 'Contributions des utilisateurs',
      contributionDesc: 'Conception de l\'expérience complète d\'ajout de photos et d\'avis depuis les fiches des professionnels. Faire des utilisateurs passifs des contributeurs actifs.'
    },
    wear: {
      sectionTitle: 'Android Wear',
      intro: 'Un projet expérimental, tourné vers l\'avenir. PagesJaunes voulait être présent sur les appareils portables. J\'ai conçu et développé cette app en duo avec Thibault Fighiera, développeur Android. Deux mois entre le concept et la sortie sur Google Play.',
      scenario: '«\u202fIl est midi, Julien a faim. Il veut trouver rapidement un restaurant près du bureau et s\'y faire guider.\u202f»',
      context: 'Contexte du projet',
      contextItems: [
        'Équipe agile de 3 personnes\u00a0: designer (moi), product owner et développeur',
        'Octobre à décembre 2015\u00a0: conception et développement en 2 mois',
        'Première étape de l\'adaptation de la marque PagesJaunes à Material Design',
        'Livré sur Google Play en décembre 2015'
      ],
      approach: 'Approche de conception',
      approachDesc: 'Apprentissage des recommandations du système, évaluation des contraintes d\'Android Wear, adaptation de la marque PagesJaunes. Conception pour la montre en gardant le contexte en tête\u00a0: usage à faible effort, informations lisibles d\'un coup d\'œil, actions rapides.',
      features: 'Ce que nous avons construit',
      featuresList: [
        'Interface en cartes avec notes, statut et bouton de contact',
        'Deux parcours\u00a0: recherche→appel et recherche→navigation',
        'Mode normal (jaune à fort contraste) et mode ambiant (monochrome)',
        'Recherche vocale avec «\u202fOk Google\u202f»',
        'Transmission au téléphone pour les appels et la navigation Google Maps'
      ],
      deliverables: 'Mes livrables',
      deliverablesList: [
        'Documentation du persona et des user stories',
        'Croquis et wireframes',
        'Design d\'interface et spécifications d\'interaction',
        'Prototypage et vidéos de démonstration',
        'Présentation aux parties prenantes'
      ],
      collaborator: 'Thibault Fighiera',
      collaboratorRole: 'Développeur Android',
      collaboratorDesc: 'Collaboration en binôme sur le design et le développement. Cycles d\'itération rapides avec tests sur appareil réel.'
    },
    system: {
      sectionTitle: 'Stratégie du design system',
      intro: 'Avec plusieurs plateformes et des fonctionnalités qui divergeaient de plus en plus, nous avions besoin de fondations partagées. J\'ai mené le premier audit complet.',
      audit: 'L\'audit',
      auditDesc: 'Revue de tous les écrans des apps iOS, Android et web. Entretiens avec les designers et les développeurs de plusieurs équipes pour comprendre les points de friction.',
      roadmap: 'Feuille de route Yellowstrap',
      roadmapDesc: 'Livraison de la feuille de route du système de composants et des recommandations. Définition des conventions de nommage, de l\'usage des couleurs, des styles de boutons d\'appel à l\'action et des indicateurs de statut. Outils d\'avant Figma\u00a0: Zeplin, kits PDF, Sketch.',
      note: 'Note\u00a0: mon rôle couvrait la définition stratégique et les besoins. Je n\'ai pas construit la bibliothèque moi-même.'
    },
    team: {
      sectionTitle: 'Équipe et collaboration',
      intro: 'Ce projet n\'aurait pas été possible seul. J\'ai travaillé avec les développeurs iOS et Android, le backend, le marketing et le product owner.',
      led: 'J\'ai piloté',
      ledList: [
        'Direction UI et spécifications des composants',
        'Rituels de l\'équipe design et mentorat (4 designers)',
        'Présentations à la direction (User Club Day, revues de feuille de route)'
      ],
      collaborated: 'J\'ai collaboré avec',
      collaboratedList: [
        'Le backend pour la structure des réponses d\'API',
        'Les équipes mobiles pour les spécifications d\'animation et de défilement',
        'Le marketing pour les règles d\'imagerie de la page d\'accueil'
      ],
      rituals: 'Revues de design et rétrospectives chaque semaine. Retours rapides, alignement serré.'
    },
    impact: {
      sectionTitle: 'Résultats',
      metrics: [
        { value: '22M+', label: 'Téléchargements', sublabel: 'installations cumulées' },
        { value: '300K', label: 'Utilisateurs par jour', sublabel: 'au pic d\'usage' },
        { value: '4', label: 'Designers', sublabel: 'encadrés comme responsable d\'équipe' },
        { value: '4,5★', label: 'App Store', sublabel: 'contre 4,2 auparavant' }
      ]
    },
    learnings: {
      sectionTitle: 'Ce que j\'ai appris',
      items: [
        {
          title: 'Ne pas casser les habitudes',
          description: '22 millions d\'utilisateurs ont des automatismes. Les changements radicaux les désorientent. Des améliorations petites et claires fonctionnent mieux.'
        },
        {
          title: 'Un outil utilitaire exige de la vitesse',
          description: 'Les gens cherchent un plombier quand ils ont une fuite. Chaque milliseconde compte, surtout en 3G.'
        },
        {
          title: 'La cohérence est difficile',
          description: 'iOS, Android, web, Wear\u00a0: chaque plateforme a ses contraintes. Les motifs partagés demandent une négociation constante.'
        },
        {
          title: 'La stratégie crée un effet de levier',
          description: 'À cette échelle, définir la structure et les règles (audit du design system) a plus d\'impact que des écrans pris un à un.'
        }
      ]
    }
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
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  // ReadMoreList labels: French when the page is French, component defaults otherwise
  const readMoreLabels = lang === 'fr' ? { expandLabel: 'Voir la suite', collapseLabel: 'Voir moins' } : {};

  return (
    <div className="bg-[#FDFDFC]">

      {/* ================================================================ */}
      {/* HERO SECTION */}
      {/* ================================================================ */}
      <section className="mb-16 md:mb-24">
        <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24">
          {/* Main Title */}
          <h1 className="text-title-1 text-gray-900 mb-3">
            {t.hero.title}
          </h1>

          {/* Subtitle, then role, scope and period as one quiet line */}
          <p className="text-lg text-gray-600 mb-1">
            {t.hero.subtitle}
          </p>
          <p className="text-xs text-gray-500 mb-6">
            {[t.hero.role, t.hero.scope, t.hero.period].join(' · ')}
          </p>

          {/* Description */}
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            {t.hero.description}
          </p>

          {/* Testimonial */}
          <div className="border-t border-gray-100">
            <CaseStudyTestimonialBlock
              quote={t.testimonial.quote}
              author={t.testimonial.author}
              role={t.testimonial.role}
              image="simon-white.webp"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HERO IMAGE */}
      {/* ================================================================ */}
      <div className="max-w-[960px] mx-auto px-6">
        <figure className="mb-24 md:mb-32">
          <div
            {...zoomable(() => onImageClick('/images/thumbnail_pagesjaunes_sp_tablette.webp'))}
            className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
          >
            <img
              loading="eager"
              fetchPriority="high"
              src="/images/thumbnail_pagesjaunes_sp_tablette.webp" {...imgDims("/images/thumbnail_pagesjaunes_sp_tablette.webp")}
              alt="PagesJaunes Mobile Apps"
              className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
            {lang === 'en' ? 'PagesJaunes redesigned apps across iOS, Android and tablet' : 'Applications PagesJaunes redessinées sur iOS, Android et tablette'}
          </figcaption>
        </figure>
      </div>

      {/* ================================================================ */}
      {/* OVERVIEW SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="overview" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-4">
              {t.overview.title}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.overview.introTitle}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.overview.introDesc}
                </p>
              </div>

              <div>
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.overview.roleTitle}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.overview.roleDesc}
                </p>
              </div>

              <div>
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.overview.goalsTitle}
                </h3>
                <ul className="space-y-1.5">
                  {t.overview.goals.map((goal, idx) => (
                    <li key={idx} className="text-base text-gray-600 leading-relaxed">
                      <span className="text-gray-300 mr-2">&#8226;</span>{goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-12 divide-y divide-gray-100">
              <div className="flex justify-between py-3">
                <span className="text-xs text-gray-500">{t.meta.typeLabel}</span>
                <span className="text-sm text-gray-900">{t.meta.type}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-xs text-gray-500">{t.meta.scopeLabel}</span>
                <span className="text-sm text-gray-900">{t.meta.scope}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-xs text-gray-500">{t.meta.periodLabel}</span>
                <span className="text-sm text-gray-900">{t.meta.period}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-xs text-gray-500">{t.meta.companyLabel}</span>
                <span className="text-sm text-gray-900">{t.meta.company}</span>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* HOMEPAGE SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="homepage" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-2">
              {t.homepage.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-3">
              {t.homepage.question}
            </p>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.homepage.intro}
            </p>

            <div className="divide-y divide-gray-100 mb-12">
              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.homepage.imagery}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.homepage.imageryDesc}
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.homepage.simplification}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.homepage.simplificationDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Homepage iOS & Android */}
          <div className="max-w-[740px] mx-auto px-6 mb-4">
            <p className="text-base text-gray-600 leading-relaxed">{CAPTIONS[lang].homepage.main}</p>
          </div>
          <div className="max-w-[960px] mx-auto px-6 mb-16">
            <div
              {...zoomable(() => onImageClick(GALLERY_IMAGES.homepage.main))}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
            >
              <img
                loading="lazy"
                src={GALLERY_IMAGES.homepage.main} {...imgDims(GALLERY_IMAGES.homepage.main)}
                alt="PagesJaunes Homepage iOS & Android"
                className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">
              {lang === 'en' ? 'iOS and Android homepage' : 'Page d\u2019accueil iOS et Android'}
            </p>
          </div>

          {/* Homepage Variations */}
          <div className="max-w-[740px] mx-auto px-6 mb-4">
            <p className="text-base text-gray-600 leading-relaxed">{CAPTIONS[lang].homepage.variations}</p>
          </div>
          <div className="max-w-[960px] mx-auto px-6 mb-16">
            <div
              {...zoomable(() => onImageClick(GALLERY_IMAGES.homepage.variations))}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
            >
              <img
                loading="lazy"
                src={GALLERY_IMAGES.homepage.variations} {...imgDims(GALLERY_IMAGES.homepage.variations)}
                alt="PagesJaunes Homepage Variations"
                className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">
              {lang === 'en' ? 'Hero image variations' : 'Variations des visuels héros'}
            </p>
          </div>

          {/* iPad Homepage */}
          <div className="max-w-[740px] mx-auto px-6 mb-4">
            <p className="text-base text-gray-600 leading-relaxed">{CAPTIONS[lang].homepageIpad.main}</p>
          </div>
          <div className="max-w-[960px] mx-auto px-6 mb-16">
            <div
              {...zoomable(() => onImageClick(GALLERY_IMAGES.homepageIpad.main))}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
            >
              <img
                loading="lazy"
                src={GALLERY_IMAGES.homepageIpad.main} {...imgDims(GALLERY_IMAGES.homepageIpad.main)}
                alt="PagesJaunes iPad Homepage"
                className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">
              {lang === 'en' ? 'iPad homepage' : 'Page d\u2019accueil iPad'}
            </p>
          </div>

          {/* iPad Homepage Variations */}
          <div className="max-w-[740px] mx-auto px-6 mb-4">
            <p className="text-base text-gray-600 leading-relaxed">{CAPTIONS[lang].homepageIpad.variations}</p>
          </div>
          <div className="max-w-[960px] mx-auto px-6">
            <div
              {...zoomable(() => onImageClick(GALLERY_IMAGES.homepageIpad.variations))}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
            >
              <img
                loading="lazy"
                src={GALLERY_IMAGES.homepageIpad.variations} {...imgDims(GALLERY_IMAGES.homepageIpad.variations)}
                alt="PagesJaunes iPad Homepage Variations"
                className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">
              {lang === 'en' ? 'Responsive hero images across devices' : 'Visuels héros adaptés à chaque appareil'}
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* SEARCH ENGINE EVOLUTION SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="search" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-2">
              {t.searchEngine.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-3">
              {t.searchEngine.question}
            </p>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.searchEngine.intro}
            </p>

            <div className="divide-y divide-gray-100 mb-12">
              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.searchEngine.stakes}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.searchEngine.stakesDesc}
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.searchEngine.model}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.searchEngine.modelDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Search Flow Image */}
          <div className="max-w-[960px] mx-auto px-6">
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.search.flow))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.search.flow} {...imgDims(GALLERY_IMAGES.search.flow)}
                  alt="PagesJaunes Search Flow"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].search.flow}
              </figcaption>
            </figure>
          </div>

          <div className="max-w-[740px] mx-auto px-6">
            <div className="divide-y divide-gray-100 mb-12">
              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.searchEngine.materialDesign}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.searchEngine.materialDesignDesc}
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.searchEngine.shipped}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.searchEngine.shippedDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Search Engine Prototype Video: portrait, shown at its natural aspect in a phone-width column */}
          <div className="max-w-[960px] mx-auto px-6">
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.search.prototype))}
                className="group max-w-[360px] mx-auto rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <VideoPlayer
                  src={GALLERY_IMAGES.search.prototype}
                  className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].search.prototype}
              </figcaption>
            </figure>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* ONBOARDING SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="onboarding" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-2">
              {t.onboarding.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-3">
              {t.onboarding.question}
            </p>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.onboarding.intro}
            </p>

            <ReadMoreList className="divide-y divide-gray-100 mb-12" initialCount={2} {...readMoreLabels}>
              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.onboarding.ios}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.onboarding.iosDesc}
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.onboarding.android}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.onboarding.androidDesc}
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.onboarding.goals}
                </h3>
                <ul className="space-y-1">
                  {t.onboarding.goalsList.map((goal, idx) => (
                    <li key={idx} className="text-base text-gray-600 leading-relaxed">
                      <span className="text-gray-300 mr-2">&#8226;</span>{goal}
                    </li>
                  ))}
                </ul>
              </div>
            </ReadMoreList>
          </div>

          {/* iOS Onboarding Video */}
          <div className="max-w-[960px] mx-auto px-6 mb-16">
            <div
              {...zoomable(() => onImageClick('/images/pj-ios-app-onboarding-animation.mp4'))}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
            >
              <VideoPlayer
                src="/images/pj-ios-app-onboarding-animation.mp4"
                className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">{t.onboarding.ios}</p>
          </div>

          {/* Android Onboarding Video */}
          <div className="max-w-[740px] mx-auto px-6 mb-4">
            <h3 className="text-title-3 text-gray-900 mb-1">{t.onboarding.android}</h3>
            <p className="text-base text-gray-600 leading-relaxed">{t.onboarding.androidDesc}</p>
          </div>
          <div className="max-w-[960px] mx-auto px-6">
            <div
              {...zoomable(() => onImageClick('/images/pj-and-app-onboarding-animation.mp4'))}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
            >
              <VideoPlayer
                src="/images/pj-and-app-onboarding-animation.mp4"
                className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-gray-500">{t.onboarding.android}</p>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* NAVIGATION SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="navigation" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-2">
              {t.navigation.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-3">
              {t.navigation.question}
            </p>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.navigation.intro}
            </p>

            <div className="divide-y divide-gray-100 mb-12">
              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.navigation.features}
                </h3>
                <ul className="space-y-1.5">
                  {t.navigation.featuresList.map((feature, idx) => (
                    <li key={idx} className="text-base text-gray-600 leading-relaxed">
                      <span className="text-gray-300 mr-2">&#8226;</span>{feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.navigation.tablet}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.navigation.tabletDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation images */}
          <div className="max-w-[960px] mx-auto px-6">
            {/* Transit System Components */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.maps.system))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.system} {...imgDims(GALLERY_IMAGES.maps.system)}
                  alt="PagesJaunes Transit System Components"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].maps.system}
              </figcaption>
            </figure>

            {/* Multi-device Navigation */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.maps.multidevice))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.multidevice} {...imgDims(GALLERY_IMAGES.maps.multidevice)}
                  alt="PagesJaunes Multi-device Navigation"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].maps.multidevice}
              </figcaption>
            </figure>

            {/* iPhone Navigation Flows */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.maps.iphoneFlows))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.iphoneFlows} {...imgDims(GALLERY_IMAGES.maps.iphoneFlows)}
                  alt="PagesJaunes iPhone Navigation Flows"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].maps.iphoneFlows}
              </figcaption>
            </figure>

            {/* iPad Itinerary */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.maps.ipadItinerary))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.maps.ipadItinerary} {...imgDims(GALLERY_IMAGES.maps.ipadItinerary)}
                  alt="PagesJaunes iPad Itinerary"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].maps.ipadPedestrian}
              </figcaption>
            </figure>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* ACCOUNT SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="account" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-2">
              {t.account.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-3">
              {t.account.question}
            </p>

            <p className="text-base text-gray-600 leading-relaxed mb-12">
              {t.account.intro}
            </p>
          </div>

          <div className="max-w-[960px] mx-auto px-6">
            {/* Account Flow */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.account.flow))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.account.flow} {...imgDims(GALLERY_IMAGES.account.flow)}
                  alt="PagesJaunes Account Flow"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].account.flow}
              </figcaption>
            </figure>

            {/* Engagement Features */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.account.engagement))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.account.engagement} {...imgDims(GALLERY_IMAGES.account.engagement)}
                  alt="PagesJaunes Engagement Features"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].account.engagement}
              </figcaption>
            </figure>

            {/* Desktop Review Editing */}
            <figure className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.contributions.desktopReview))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.contributions.desktopReview} {...imgDims(GALLERY_IMAGES.contributions.desktopReview)}
                  alt="PagesJaunes Desktop Review Editing"
                  className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                {CAPTIONS[lang].contributions.desktopReview}
              </figcaption>
            </figure>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* MICRO-INTERACTIONS SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="micro-interactions" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-3">
              {CAPTIONS[lang].microInteractions.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-12">
              {CAPTIONS[lang].microInteractions.intro}
            </p>
          </div>

          {/* Micro-interactions: three phone-width columns side by side on md+, stacked on mobile */}
          <div className="max-w-[960px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
              {[
                {
                  src: GALLERY_IMAGES.microInteractions.navDrawer,
                  isVideo: false,
                  alt: lang === 'en' ? 'Material Design navigation drawer' : 'Tiroir de navigation Material Design',
                  label: lang === 'en' ? 'Navigation drawer' : 'Tiroir de navigation',
                  desc: CAPTIONS[lang].microInteractions.navDrawer,
                },
                {
                  src: GALLERY_IMAGES.microInteractions.favorites,
                  isVideo: true,
                  alt: '',
                  label: lang === 'en' ? 'Favorites animation' : 'Animation des favoris',
                  desc: CAPTIONS[lang].microInteractions.favorites,
                },
                {
                  src: GALLERY_IMAGES.microInteractions.historyRemarketing,
                  isVideo: true,
                  alt: '',
                  label: lang === 'en' ? 'History and remarketing' : 'Historique et remarketing',
                  desc: CAPTIONS[lang].microInteractions.historyRemarketing,
                },
              ].map((item) => (
                <figure key={item.src} className="flex flex-col">
                  <div
                    {...zoomable(() => onImageClick(item.src))}
                    className="group w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01]"
                  >
                    {item.isVideo ? (
                      <VideoPlayer
                        src={item.src}
                        className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                      />
                    ) : (
                      <img
                        loading="lazy"
                        src={item.src} {...imgDims(item.src)}
                        alt={item.alt}
                        className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      />
                    )}
                  </div>
                  <figcaption className="mt-3 max-w-[320px] w-full mx-auto">
                    <span className="block text-xs font-medium text-gray-500 mb-1">{item.label}</span>
                    <span className="block text-sm text-gray-600 leading-relaxed">{item.desc}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* ANDROID WEAR SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="wear" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-3">
              {t.wear.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-12">
              {t.wear.intro}
            </p>
          </div>

          {/* Key visuals */}
          <div className="max-w-[960px] mx-auto px-6">
            {/* Watch face thumbnail */}
            <p className="text-base text-gray-600 leading-relaxed mb-4">{CAPTIONS[lang].wear.thumbnail}</p>
            <div className="mb-16">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.wear.thumbnail))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01] aspect-square"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.wear.thumbnail} {...imgDims(GALLERY_IMAGES.wear.thumbnail)}
                  alt="PagesJaunes Android Wear"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-gray-500">
                PagesJaunes Android Wear
              </p>
            </div>

            {/* Y Aller navigation button */}
            <p className="text-base text-gray-600 leading-relaxed mb-4">{CAPTIONS[lang].wear.yAllerBtn}</p>
            <div className="mb-8">
              <div
                {...zoomable(() => onImageClick(GALLERY_IMAGES.wear.yAllerBtn))}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-sm hover:shadow-lg hover:scale-[1.01] aspect-square"
              >
                <img
                  loading="lazy"
                  src={GALLERY_IMAGES.wear.yAllerBtn} {...imgDims(GALLERY_IMAGES.wear.yAllerBtn)}
                  alt="Y Aller navigation button"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-gray-500">
                {lang === 'en' ? 'The "Y Aller" navigation action' : 'L\u2019action de navigation «\u202fY aller\u202f»'}
              </p>
            </div>
          </div>

          {/* Link to the dedicated Android Wear case study */}
          <div className="max-w-[740px] mx-auto px-6">
            <Link
              href={`/${lang}/project/androidwear`}
              className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-[border-color,transform] duration-200 ease-out hover:scale-[1.005]"
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        loading="lazy"
                        src={GALLERY_IMAGES.wear.insituStore} {...imgDims(GALLERY_IMAGES.wear.insituStore)}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title-3 text-gray-900 mb-1">
                        {lang === 'en'
                          ? 'PagesJaunes on your wrist'
                          : 'PagesJaunes à votre poignet'}
                      </h3>
                      <p className="text-sm line-clamp-2 sm:line-clamp-none text-gray-600">
                        {lang === 'en'
                          ? 'When users need a plumber now, can a watch be faster than pulling out a phone?'
                          : 'Quand l\u2019utilisateur a besoin d\u2019un plombier maintenant, une montre peut-elle être plus rapide qu\u2019un téléphone\u00a0?'}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 sm:self-center">
                    <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors duration-150 whitespace-nowrap">
                      {lang === 'en' ? 'Read the case study' : 'Lire l\u2019étude de cas'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* DESIGN SYSTEM SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="design-system" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-3">
              {t.system.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.system.intro}
            </p>

            <div className="divide-y divide-gray-100 mb-6">
              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.system.audit}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.system.auditDesc}
                </p>
              </div>

              <div className="py-4">
                <h3 className="text-title-3 text-gray-900 mb-2">
                  {t.system.roadmap}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.system.roadmapDesc}
                </p>
              </div>
            </div>

            <p className="text-sm italic text-gray-600">
              {t.system.note}
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* TEAM SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="team" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-3">
              {t.team.sectionTitle}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              {t.team.intro}
            </p>

            {/* Phase 1: 2014-2015 - UX Core Team */}
            <div className="pt-6 pb-8 border-t border-gray-100 mb-2">
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <span className="text-xs tabular-nums text-gray-500">2014-2015</span>
                <h3 className="text-sm font-medium text-gray-900">
                  {lang === 'en' ? 'UX Core Team' : 'Équipe UX centrale'}
                </h3>
                <span className="ml-auto text-xs text-gray-500">
                  Product Designer
                </span>
              </div>
              <p className={`text-sm mb-4 text-gray-600`}>
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
                      className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-150"
                    >
                      {person.name}
                      <span className="text-xs text-gray-500 ml-1">{person.role}</span>
                    </a>
                  ) : (
                    <span key={idx} className="text-sm text-gray-500">
                      {person.name}
                      <span className="text-xs text-gray-500 ml-1">{person.role}</span>
                    </span>
                  )
                ))}
              </div>
            </div>

            {/* Phase 2: 2015-2016 - Feature Team */}
            <div className="pt-6 pb-8 border-t border-gray-100 mb-2">
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <span className="text-xs tabular-nums text-gray-500">2015-2016</span>
                <h3 className="text-sm font-medium text-gray-900">
                  {lang === 'en' ? 'Feature team' : 'Équipe dédiée'}
                </h3>
                <span className="ml-auto text-xs text-gray-500">
                  Product Designer → UI Team Lead
                </span>
              </div>
              <p className={`text-sm mb-4 text-gray-600`}>
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
                      className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-150"
                    >
                      {person.name}
                      <span className="text-xs text-gray-500 ml-1">{person.role}</span>
                    </a>
                  ) : (
                    <span key={idx} className="text-sm text-gray-500">
                      {person.name}
                      <span className="text-xs text-gray-500 ml-1">{person.role}</span>
                    </span>
                  )
                ))}
              </div>
            </div>

            <p className="text-sm italic text-gray-600">
              {t.team.rituals}
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* IMPACT SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="impact" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-8">
              {t.impact.sectionTitle}
            </h2>

            <div className="divide-y divide-gray-100">
              {t.impact.metrics.map((metric, idx) => (
                <div key={idx} className="flex items-baseline justify-between py-4">
                  <span className="text-sm text-gray-500">
                    {metric.label}
                    {metric.sublabel && <span className="ml-1 text-gray-500"> · {metric.sublabel}</span>}
                  </span>
                  <span className="text-sm text-gray-500 tabular-nums">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ================================================================ */}
      {/* LEARNINGS SECTION */}
      {/* ================================================================ */}
      <FadeInSection>
        <section id="learnings" className="mb-24 md:mb-32">
          <div className="max-w-[740px] mx-auto px-6">
            <h2 className="text-title-2 text-gray-900 mb-8">
              {t.learnings.sectionTitle}
            </h2>

            <ReadMoreList className="divide-y divide-gray-100" initialCount={2} {...readMoreLabels}>
              {t.learnings.items.map((item, idx) => (
                <div key={idx} className="py-4">
                  <h3 className="text-title-3 text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </ReadMoreList>
          </div>
        </section>
      </FadeInSection>


    </div>
  );
};

export default PagesJaunesFull;
