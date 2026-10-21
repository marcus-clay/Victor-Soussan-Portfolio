/**
 * PagesJaunesFull - Full narrative case study version
 *
 * Complete deep-dive into the 2-year design work at PagesJaunes.
 * Order: hero (executive summary as intro), testimonial, summary, then three numbered acts (approach, product, results and learnings).
 * Curated narration: one block is an h3, a short paragraph and its visuals (colour UI, mockups and interaction videos lead; no black and white diagram). What is not shown here lives in the gallery view.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { motion } from 'framer-motion';
import { useReveal } from '@/lib/motion'
import { zoomable } from '@/utils/zoomable'
import { imgDims } from '@/utils/imageDimensions'
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudySummary from '@/components/case-study/CaseStudySummary';
import { ActRule, ActTitle } from '@/components/case-study/ActSection';

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
      yAllerBtn: 'Écran d\'action de navigation. Le bouton « Y aller » ouvre Google Maps en un appui.',
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
      favorites: 'Animation en forme de cœur sur « Ajouter aux favoris ». Le rebond confirme immédiatement que l\'action a fonctionné.',
      historyRemarketing: 'Écran Historique avec invitation à ajouter une photo. Encourager les utilisateurs à partager leur expérience après une visite.',
    },
  },
};

const TRANSLATIONS = {
  en: {
    hero: {
      role: 'Product Designer → UI Team Lead',
      scope: 'Mobile Apps, Web, Design System',
      title: 'Redesigning PagesJaunes for 22M Users',
      subtitle: 'From legacy directory to mobile-first experience',
      intro: 'Two years modernizing France\'s most downloaded utility app. Homepage, onboarding, maps and a design system roadmap on iOS, Android, web and Android Wear, as Product Designer then UI Team Lead.',
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
      company: 'PagesJaunes (Solocal)',
      companyLabel: 'Company'
    },
    summary: {
      context: 'PagesJaunes served 15M+ monthly visitors but felt stuck in web directory logic. The mobile apps had millions of downloads, but the experience was heavy. The product needed to evolve from static listings to a fluid, personal, mobile-first experience, without breaking what worked for existing users.',
      role: 'I joined as Product Designer working on web, partnerships (TheFork, Renault R-Link), and login flows. Later, I became UI Team Lead: coordinating 4 designers, owning the mobile app redesign, and running weekly syncs with iOS/Android devs.',
      deliverables: [
        { title: 'Homepage redesign', detail: 'A conversational greeting and a single search bar replace the two-field directory search.' },
        { title: 'Native onboarding', detail: 'Short, non-blocking animations at first launch: CAAnimation on iOS, Material Design transitions on Android.' },
        { title: 'Maps and walking itinerary', detail: 'Pedestrian routes on the Mappy API, with handoff to Waze, Google Maps and Apple Maps.' },
        { title: 'My PagesJaunes', detail: 'Favorites, history and contributions, redesigned to support retention.' },
        { title: 'Android Wear app', detail: 'Built in duo with an Android developer, from concept to Google Play in two months.' },
        { title: 'Design system strategy', detail: 'Audit across iOS, Android and web, and the Yellowstrap component roadmap.' },
      ],
      metrics: [
        { value: '15M+', label: 'monthly visitors' },
        { value: '300K', label: 'daily users at peak usage' },
        { value: '4', label: 'designers managed as UI Team Lead' },
      ],
    },
    acts: {
      approach: 'Four objectives for the redesign',
      product: 'What shipped on iOS, Android, web and Android Wear',
      results: 'What the redesign reached',
      learnings: 'What I learned',
      team: 'Team and collaboration',
      seeAll: 'View all visuals',
    },
    overview: {
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
        'Design and development in 2 months',
        'First step of PagesJaunes branding to Material Design',
        'Shipped to Google Play'
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
      title: 'Refonte de PagesJaunes pour 22 millions d\'utilisateurs',
      subtitle: 'D\'un annuaire hérité à une expérience pensée d\'abord pour le mobile',
      intro: 'Deux ans à moderniser l\'app utilitaire la plus téléchargée de France. Accueil, onboarding, cartes et feuille de route du design system sur iOS, Android, le web et Android Wear, comme Product Designer puis responsable de l\'équipe UI.',
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
      company: 'PagesJaunes (Solocal)',
      companyLabel: 'Entreprise'
    },
    summary: {
      context: 'PagesJaunes comptait plus de 15 millions de visiteurs mensuels mais restait ancré dans une logique d\'annuaire web. Les apps mobiles avaient des millions de téléchargements, mais l\'expérience était lourde. Le produit devait passer de fiches statiques à une expérience fluide, personnelle et pensée d\'abord pour le mobile, sans casser ce qui fonctionnait pour les utilisateurs existants.',
      role: 'J\'ai rejoint l\'équipe comme Product Designer sur le web, les partenariats (TheFork, Renault R-Link) et les parcours de connexion. Ensuite, je suis devenu responsable de l\'équipe UI\u00a0: coordination de 4 designers, pilotage de la refonte mobile et points hebdomadaires avec les développeurs iOS et Android.',
      deliverables: [
        { title: 'Refonte de la page d\'accueil', detail: 'Une accroche conversationnelle et une barre de recherche unique remplacent les deux champs de l\'annuaire.' },
        { title: 'Onboarding natif', detail: 'Animations courtes et non bloquantes au premier lancement\u00a0: CAAnimation sur iOS, transitions Material Design sur Android.' },
        { title: 'Cartes et itinéraire piéton', detail: 'Itinéraires piétons sur l\'API Mappy, avec relais vers Waze, Google Maps et Plans.' },
        { title: 'Mon PagesJaunes', detail: 'Favoris, historique et contributions repensés pour soutenir la rétention.' },
        { title: 'App Android Wear', detail: 'Conçue en duo avec un développeur Android, du concept à Google Play en deux mois.' },
        { title: 'Stratégie du design system', detail: 'Audit des apps iOS, Android et web, et feuille de route des composants Yellowstrap.' },
      ],
      metrics: [
        { value: '15M+', label: 'visiteurs mensuels' },
        { value: '300K', label: 'utilisateurs par jour au pic d\'usage' },
        { value: '4', label: 'designers encadrés comme responsable de l\'équipe UI' },
      ],
    },
    acts: {
      approach: 'Quatre objectifs pour la refonte',
      product: 'Ce qui a été livré sur iOS, Android, le web et Android Wear',
      results: 'Ce que la refonte a atteint',
      learnings: 'Ce que j\'ai appris',
      team: 'Équipe et collaboration',
      seeAll: 'Voir tous les visuels',
    },
    overview: {
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
        'Conception et développement en 2 mois',
        'Première étape de l\'adaptation de la marque PagesJaunes à Material Design',
        'Livré sur Google Play'
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
// TEAM (credits): names, roles and LinkedIn profiles
// ============================================================================

type Person = { name: string; role: string; url: string | null };

const TEAM_UX_CORE: Person[] = [
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
];

const TEAM_FEATURE: Person[] = [
  { name: 'Vedran Beric', role: 'UX/UI Designer', url: 'https://www.linkedin.com/in/vedran-beric-26002155/' },
  { name: 'Frédéric Rodriguez', role: 'Product Manager', url: 'https://www.linkedin.com/in/frederic-rodriguez-71061255/' },
  { name: 'Thibault Fighiera', role: 'Android Dev', url: 'https://www.linkedin.com/in/thibault-fighiera-65794731/' },
  { name: 'Alexandre Badie', role: 'Android Dev', url: null },
  { name: 'Jérémie Godon', role: 'iOS Dev', url: 'https://www.linkedin.com/in/jgodon/' },
  { name: 'Jeffrey Macko', role: 'iOS Dev', url: 'https://www.linkedin.com/in/mackojeffrey/' },
  { name: 'Marilyn Kol', role: 'Scrum Master', url: 'https://www.linkedin.com/in/marilyn-kol-933878b0/' },
  { name: 'Nicolas Dovran', role: 'Team Lead', url: 'https://www.linkedin.com/in/nicolas-dovran-scrum-coach-agile/' },
];

const TEAM_COPY = {
  en: {
    core: { title: 'UX Core Team', role: 'Product Designer', desc: 'Integrated within the central UX team, working on cross-platform design strategy and visual direction.' },
    feature: { title: 'Feature team', role: 'Product Designer → UI Team Lead', desc: 'Dedicated squad for homepage redesign, Material Design integration, user accounts, favorites, and history.' },
  },
  fr: {
    core: { title: 'Équipe UX centrale', role: 'Product Designer', desc: 'Intégré à l\'équipe UX centrale, travail sur la stratégie design cross-plateforme et la direction visuelle.' },
    feature: { title: 'Équipe dédiée', role: 'Product Designer → UI Team Lead', desc: 'Squad dédiée à la refonte homepage, intégration Material Design, compte utilisateur, favoris et historique.' },
  },
} as const;

// ============================================================================
// CURATED COPY: short paragraphs for the three acts (the long copy above stays in TRANSLATIONS and CAPTIONS)
// ============================================================================

const CURATED = {
  en: {
    approachLead: 'Four objectives ordered the work: an intent-first homepage, native onboarding, pedestrian navigation and a design system roadmap. Three decisions set the direction.',
    homepageText: 'The old homepage showed two fields, "Who" and "Where". A conversational greeting and one search bar replace them, with art direction rules for photos of local professionals that change with the search category.',
    homepageCaption: 'iOS and Android homepage',
    searchText: 'With close to €500M in annual revenue tied to search ranking, the "What + Where" model stayed as it was. We changed the transitions: the search bar expands into full-screen results with Material Design shared elements. The prototype became the production version on Google Play.',
    searchCaption: 'Search engine prototype',
    systemText: 'I led the first audit of all screens across iOS, Android and web, then delivered the Yellowstrap component roadmap: naming conventions, color usage, CTA styles. My role covered strategy and requirements, not building the library.',
    onboardingText: 'A major release meant users had to find the new features without being blocked. Short, non-blocking animations at first launch: CAAnimation on iOS, Material Design transitions on Android, with motion specs agreed with the developers.',
    onboardingCaption: 'iOS onboarding animation',
    mapsTitle: 'Maps and My PagesJaunes',
    mapsText: 'Pedestrian routes use the Mappy API and hand off to Waze, Google Maps and Apple Maps. On iPad a native split view puts the map beside the directions. My PagesJaunes (favorites, history, contributions) was redesigned to support retention.',
    mapsCaption: 'One journey, three modes: walk, drive, transit',
    wearTitle: 'PagesJaunes on your wrist',
    wearLink: 'Read the case study',
    resultsTitle: 'Results and learnings',
    resultsHeading: 'Results',
    learningsHeading: 'What I learned',
    learningsKeep: [0, 1, 3],
  },
  fr: {
    approachLead: 'Quatre objectifs ont ordonné le travail : une page d’accueil guidée par l’intention, un onboarding natif, la navigation piétonne et une feuille de route du design system. Trois décisions ont fixé la direction.',
    homepageText: 'L’ancienne page d’accueil montrait deux champs, « Qui » et « Où ». Une accroche conversationnelle et une barre de recherche unique les remplacent, avec des règles de direction artistique pour des photos de professionnels locaux qui varient selon la catégorie de recherche.',
    homepageCaption: 'Page d’accueil iOS et Android',
    searchText: 'Avec près de 500 M€ de revenus annuels liés au classement, le modèle « Quoi + Où » est resté en place. Nous avons changé les transitions : la barre de recherche s’étend en résultats plein écran, avec des éléments partagés Material Design. Le prototype est devenu la version livrée sur Google Play.',
    searchCaption: 'Prototype du moteur de recherche',
    systemText: 'J’ai mené le premier audit des écrans iOS, Android et web, puis livré la feuille de route des composants Yellowstrap : conventions de nommage, usage des couleurs, styles des boutons d’appel à l’action. Mon rôle couvrait la stratégie et les besoins, pas la construction de la bibliothèque.',
    onboardingText: 'Une version majeure obligeait à faire découvrir les nouveautés sans bloquer l’utilisateur. Animations courtes et non bloquantes au premier lancement : CAAnimation sur iOS, transitions Material Design sur Android, avec des spécifications de mouvement validées avec les développeurs.',
    onboardingCaption: 'Animation d’onboarding iOS',
    mapsTitle: 'Cartes et Mon PagesJaunes',
    mapsText: 'Les itinéraires piétons reposent sur l’API Mappy, avec relais vers Waze, Google Maps et Plans. Sur iPad, une vue scindée native place la carte à côté des indications. Mon PagesJaunes (favoris, historique, contributions) est repensé pour soutenir la rétention.',
    mapsCaption: 'Un trajet, trois modes : marche, voiture, transports',
    wearTitle: 'PagesJaunes à votre poignet',
    wearLink: 'Lire l’étude de cas',
    resultsTitle: 'Résultats et apprentissages',
    resultsHeading: 'Résultats',
    learningsHeading: 'Ce que j’ai appris',
    learningsKeep: [0, 1, 3],
  },
} as const;

// ============================================================================
// LAYOUT BLOCKS (module level so they keep one identity across renders)
// ============================================================================

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const VIDEO_RE = /\.(mp4|webm|mov)$/i;

interface MediaProps {
  src: string;
  /** Accessible name of the zoomable frame, also the one-line caption */
  name: string;
  onZoom: (src: string) => void;
  /** Tailwind max-width class for square or portrait media, left-aligned on the media edge */
  maxWidth?: string;
}

const Media: React.FC<MediaProps> = ({ src, name, onZoom, maxWidth = '' }) => {
  const reveal = useReveal();
  const video = VIDEO_RE.test(src);
  return (
    <motion.figure {...reveal()} className={maxWidth}>
        <div
          {...zoomable(() => onZoom(src))}
          aria-label={name}
          className={`group rounded-2xl overflow-hidden border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 cursor-zoom-in shadow-sm [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-300 ${EASE}`}
        >
          {video ? (
            <VideoPlayer
              src={src}
              className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          ) : (
            <img
              loading="lazy"
              src={src}
              {...imgDims(src)}
              alt=""
              className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          )}
        </div>
        <figcaption className="mt-3 text-xs text-gray-500">{name}</figcaption>
    </motion.figure>
  );
};

/** One block: an h3, one short paragraph in the reading column, then at most one visual */
const Block: React.FC<{ id?: string; title: string; text?: string; children?: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="scroll-mt-28 mb-12 md:mb-16 last:mb-0">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    {text && <p className="max-w-[62ch] text-base text-gray-600">{text}</p>}
    {children && <div className={text ? 'mt-8' : ''}>{children}</div>}
  </div>
);

/** Act opening: hairline, number, title and an optional lead of 55 words at most */
const ActOpen: React.FC<{ index: string; title: string; lead?: string }> = ({ index, title, lead }) => (
  <div className={lead ? 'mb-10 md:mb-14' : 'mb-5 md:mb-9'}>
    <ActTitle index={index} title={title} />
    {lead && <p className="max-w-[62ch] text-base text-gray-600">{lead}</p>}
  </div>
);

const PeopleList: React.FC<{ people: Person[] }> = ({ people }) => (
  <ul className="flex flex-wrap gap-x-4 gap-y-1">
    {people.map((person) => (
      <li key={person.name}>
        {person.url ? (
          <a
            href={person.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline min-h-8 text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-150"
          >
            {person.name}
            <span className="text-xs text-gray-500 ml-1">{person.role}</span>
          </a>
        ) : (
          <span className="inline-flex items-baseline min-h-8 text-sm text-gray-500">
            {person.name}
            <span className="text-xs text-gray-500 ml-1">{person.role}</span>
          </span>
        )}
      </li>
    ))}
  </ul>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PagesJaunesFull: React.FC<PagesJaunesFullProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];
  const k = CURATED[lang];
  const fr = lang === 'fr';
  const zoom = onImageClick;
  const G = GALLERY_IMAGES;
  const learnings = k.learningsKeep.map((index) => t.learnings.items[index]);

  return (
    <div className="bg-[#FDFDFC]">

      {/* Hero: the intro is the executive summary */}
      <CaseStudyHero
        lang={lang}
        projectId="pagesjaunes"
        title={t.hero.title}
        intro={t.hero.intro}
        meta={[
          { label: fr ? 'Rôle' : 'Role', value: t.hero.role },
          { label: fr ? 'Périmètre' : 'Scope', value: t.hero.scope },
          { label: fr ? 'Entreprise' : 'Company', value: t.meta.company },
        ]}
        visualAlt={fr ? 'Applications PagesJaunes redessinées sur iOS, Android et tablette' : 'PagesJaunes redesigned apps across iOS, Android and tablet'}
        onZoom={() => onImageClick('/images/thumbnail-pagesjaunes-multidevices.webp')}
      />

      {/* Client testimonial, right under the hero */}
      <div className="act-wide pb-12 md:pb-16">
        <CaseStudyTestimonialBlock
          quote={t.testimonial.quote}
          author={t.testimonial.author}
          role={t.testimonial.role}
          image="simon-white.webp"
          lang={lang}
        />
      </div>

      {/* Summary: context, role, deliverables and sourced numbers */}
      <CaseStudySummary
        lang={lang}
        context={t.summary.context}
        role={t.summary.role}
        deliverables={t.summary.deliverables}
        metrics={t.summary.metrics}
      />

      {/* ================================================================ */}
      {/* 01 APPROACH: three decisions that set the direction */}
      {/* ================================================================ */}
      <section id="approach">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="01" title={t.acts.approach} lead={k.approachLead} />

          <Block id="homepage" title={t.homepage.sectionTitle} text={k.homepageText}>
            <Media src={G.homepage.main} name={k.homepageCaption} onZoom={zoom} />
          </Block>

          <Block id="search" title={t.searchEngine.sectionTitle} text={k.searchText}>
            {/* Portrait video, shown at a phone width on the media edge */}
            <Media src={G.search.prototype} name={k.searchCaption} maxWidth="max-w-[360px]" onZoom={zoom} />
          </Block>

          <Block id="design-system" title={t.system.sectionTitle} text={k.systemText} />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 02 PRODUCT: what shipped, one block per area */}
      {/* ================================================================ */}
      <section id="product">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="02" title={t.acts.product} />

          <Block id="onboarding" title={t.onboarding.sectionTitle} text={k.onboardingText}>
            {/* Both clips are near-square: iOS and Android side by side on wide screens */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Media src="/images/pj-ios-app-onboarding-animation.mp4" name={k.onboardingCaption} onZoom={zoom} />
              <Media src="/images/pj-and-app-onboarding-animation.mp4" name={fr ? 'Animation d’onboarding Android' : 'Android onboarding animation'} onZoom={zoom} />
            </div>
          </Block>

          <Block id="micro-interactions" title={CAPTIONS[lang].microInteractions.sectionTitle} text={CAPTIONS[lang].microInteractions.intro}>
            {/* Two portrait clips, capped on the media edge */}
            <div className="grid grid-cols-2 gap-6 max-w-[560px]">
              <Media src={G.microInteractions.favorites} name={fr ? 'Animation des favoris' : 'Favorites animation'} onZoom={zoom} />
              <Media src={G.microInteractions.historyRemarketing} name={fr ? 'Historique et invitation à ajouter une photo' : 'History and photo upload prompt'} onZoom={zoom} />
            </div>
          </Block>

          <Block id="navigation" title={k.mapsTitle} text={k.mapsText}>
            <Media src={G.maps.multidevice} name={k.mapsCaption} onZoom={zoom} />
          </Block>

          {/* Link to the dedicated Android Wear case study, one line */}
          <div id="wear" className="scroll-mt-28 mb-8 md:mb-10">
            <Link
              href={`/${lang}/project/androidwear`}
              className={`group flex items-center gap-4 rounded-xl border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 p-4 min-h-11 active:scale-[0.99] transition-[border-color,transform] duration-200 ${EASE}`}
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={G.wear.insituStore}
                  {...imgDims(G.wear.insituStore)}
                  alt=""
                  className={`w-full h-full object-cover transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
                />
              </div>
              <span className="flex-1 min-w-0 text-base font-semibold text-gray-900">{k.wearTitle}</span>
              <span className="text-sm text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-150 whitespace-nowrap">
                {k.wearLink}
              </span>
            </Link>
          </div>

          {/* Gallery access */}
          <div>
            <Link
              href={`/${lang}/project/pagesjaunes/gallery`}
              className={`inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ${EASE}`}
            >
              {t.acts.seeAll}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 03 RESULTS AND LEARNINGS, with the team in one sentence */}
      {/* ================================================================ */}
      <section id="results">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="03" title={k.resultsTitle} />

          <div id="impact" className="scroll-mt-28 mb-12 md:mb-16">
              <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{k.resultsHeading}</h3>
              <dl className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                {t.impact.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-base text-gray-600">
                      {metric.label}
                      {metric.sublabel && <span className="text-gray-500">{fr ? ' : ' : ' · '}{metric.sublabel}</span>}
                    </dt>
                    <dd className="text-title-2 text-gray-900 tabular-nums">{metric.value}</dd>
                  </div>
                ))}
              </dl>
          </div>

          <div id="learnings" className="scroll-mt-28 mb-12 md:mb-16">
              <h3 className="text-title-3 text-gray-900 mb-4 max-w-[56ch]">{k.learningsHeading}</h3>
              <ul className="max-w-[62ch] space-y-4">
                {learnings.map((item) => (
                  <li key={item.title} className="text-base text-gray-600">
                    <span className="font-medium text-gray-900">{item.title}.</span> {item.description}
                  </li>
                ))}
              </ul>
          </div>

          <Block id="team" title={t.acts.team} text={t.team.intro} />
        </div>
      </section>
    </div>
  );
};

export default PagesJaunesFull;
