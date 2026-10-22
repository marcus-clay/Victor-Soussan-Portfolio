// Connect case study: copy for ConnectPage.tsx
// Structure: hero, summary (context, role, deliverables), then five acts:
// stakes and objectives, design approach, La Bulle, deliverables, outcome.
export const CONNECT_TRANSLATIONS = {
  en: {
    metaLabels: { role: 'Role', scope: 'Scope', company: 'Company' },
    meta: { company: 'UNOWHY' },
    hero: {
      role: 'Product Design Lead',
      scope: 'UX strategy, UI design, prototyping',
      title: 'Replacing an Android launcher with a web dashboard',
      intro:
        'In 2020 I led the design of Connect, a web dashboard meant to replace UNOWHY’s Android launcher, and of La Bulle, a floating interface that went with it. The prototype never shipped as a product. It convinced the leadership to change strategy and opened the way to the SQOOL suite.',
    },
    summary: {
      context:
        'UNOWHY’s Android launcher was outdated technically and visually, and the surge in digital use during COVID-19 made replacing it urgent. It no longer matched how high schools, then entering the Plan Lycée Numérique, were teaching. Connect was the proof of concept for a web dashboard for teachers, in a program that equipped 465 schools and 500,000 students in Île-de-France.',
      role:
        'Product Design Lead. I started the Connect vision with the Head of Product, co-wrote the PRD and designed every interface. I worked daily with a React developer to build a working prototype, which was presented to the leadership.',
      roleItems: [
        { title: 'Product Design Lead', detail: 'UX strategy and UI design' },
        { title: 'Vision', detail: 'Co-author of the PRD' },
        { title: 'Prototype', detail: 'Working React demo' },
        { title: 'Visual language', detail: 'Base of the design system' },
        { title: 'Alignment', detail: 'Developer and leadership' },
      ],
      deliverables: [
        { title: 'Teacher dashboard', detail: 'Quick actions, class status, app catalog and notifications, in light and dark themes.' },
        { title: 'App catalog', detail: 'Searchable, filtered access to educational apps, linked to MDM policies.' },
        { title: 'La Bulle', detail: 'A floating interface for contextual shortcuts, with wireframes, icons and behavior specs.' },
        { title: 'Technical architecture', detail: 'How the web dashboard connects to the existing Android infrastructure.' },
        { title: 'Specifications', detail: 'Implementation and content specs, and the app loading choreography.' },
        { title: 'Visual language', detail: 'Components and style that became the base of the SQOOL design system.' },
      ],
    },
    acts: {
      stakes: 'A launcher to replace, a direction to choose',
      approach: 'Proving it with a prototype, not a document',
      bulle: 'La Bulle, permanent access above Android',
      deliverables: 'Deliverables the team could judge',
      outcome: 'What Connect changed',
    },
    stakes: {
      text:
        'The Android launcher was the students’ way into their apps, but it no longer kept up with Android versions or with how schools worked. Replacing it meant choosing a direction for every app attached to it, without proof that a web approach would hold on the tablets already in schools. The stake was as much the decision as the interface: producing what the team needed to decide.',
      objectivesTitle: 'Four objectives to prove at once',
      objectives: [
        { title: 'A modular dashboard', text: 'Blocks (quick actions, class status, catalog) that a teacher can customize and rearrange.' },
        { title: 'Credible web performance', text: 'A dense dashboard that loads fast and reliably in a browser, on the hardware already deployed.' },
        { title: 'Readable notifications', text: 'Student requests and newly shared content surface by importance, without distracting.' },
        { title: 'One entry point', text: 'Apps and classroom control tools brought together in one view.' },
      ],
    },
    approach: {
      sprint: {
        title: 'A design sprint that starts from the teacher',
        text:
          'I ran a strategic design sprint, held remotely on Miro and Figma, around one question: how do we make digital tools easier for teachers to adopt in class? The prototype was tested with teachers and UNOWHY staff, and the results were gathered in a scorecard. A sprint gives user feedback on a hypothesis in a few days, where documentation alone would take months.',
      },
      prototype: {
        title: 'A React prototype instead of mockups',
        text:
          'With a developer, I built the dashboard in React on a modular grid (React Grid Layout) that hosts apps in iframes. Mockups could not show whether rearrangeable blocks load fast on a tablet. A working prototype could, and it is the prototype that was presented to the leadership.',
      },
      dashboard: {
        title: 'The three most frequent actions come first',
        text:
          'On the home screen, the main area holds what a teacher repeats most: start a session, share a document, lock the devices. Class status, the app catalog and notifications are organized around it, in light and dark themes (the dark one for projection in class). Notifications are ranked to flag what matters without distracting.',
      },
    },
    bulle: {
      text:
        'Alongside the dashboard I explored La Bulle, a floating module that stays visible above the Android interface. Inspired by gaming overlays and stylus menus (the radial shortcuts of the Galaxy Note), it opens a radial or vertical menu with contextual shortcuts: search, screen capture, sharing. The idea was permanent access to frequent actions without leaving the current app. I specified its animation states, edge cases and integration with the system.',
    },
    deliverables: {
      text:
        'The prototype rested on an architecture that had to coexist with the existing Android infrastructure, and the diagram shows how the web dashboard plugs into it. I wrote the implementation and content specifications for the React developer, including the app loading choreography. The visual language set here (colors, typography, spacing) became the base of the SQOOL design system.',
    },
    outcome: {
      text:
        'Connect never launched as a single product, and it was only tested internally, for a year. It still served as proof: React and a modular web approach held on the existing tablets, and the prototype convinced the leadership.',
      text2:
        'It also showed the limits of the idea. A dashboard that gathers everything became dense for teachers, and it would have competed directly with the ENT (digital workspaces) that schools already used. That finding led to splitting the platform into focused apps, which the SQOOL suite case study tells.',
      readSuite: 'Read the SQOOL suite case study',
      viewAll: 'View all visuals',
    },
    ui: {
      prev: 'Previous visual',
      next: 'Next visual',
      slide: 'Visual',
      sprintLabel: 'Visuals of the design sprint',
      screensLabel: 'Dashboard screens',
      bulleLabel: 'La Bulle design documents',
      deliverablesLabel: 'Specifications, architecture and visual language',
    },
    captions: {
      thumbnail: 'Connect overview',
      thumbnailDesc: 'Web dashboard concept for classroom orchestration.',
      homeDark: 'Dashboard home, dark theme',
      homeDarkDesc: 'Quick actions and class status, on tablet and phone.',
      homeLight: 'Dashboard home, light theme',
      homeLightDesc: 'Light variant for other lighting conditions.',
      applications: 'App catalog',
      applicationsDesc: 'Browse, filter and launch educational apps.',
      loadingAuth: 'Connection and authentication flow',
      loadingAuthDesc: 'Motion study of the login and app launch sequence.',
      prototype: 'Working dashboard prototype',
      prototypeDesc: 'Full walkthrough of the modular dashboard.',
      designSprint: 'Design sprint flow',
      designSprintDesc: 'From onboarding to classroom control.',
      ds1: 'Sprint method',
      ds1Desc: 'Sketch and decide steps, run remotely.',
      ds2: 'Voting on sketches',
      ds2Desc: 'Remote vote on a Miro board.',
      ds3: 'Home screen wireframe',
      ds3Desc: 'First layout of the Connect home: quick actions, class space, news.',
      ds4: 'Prototype screens in Figma',
      ds4Desc: 'Frames prepared for the test sessions.',
      ds5: 'Clickable prototype',
      ds5Desc: 'The version tested with teachers and UNOWHY staff.',
      ds6: 'Test scorecard',
      ds6Desc: 'Results of the test sessions, teachers and UNOWHY staff.',
      techArch: 'Technical architecture',
      techArchDesc: 'How the web dashboard connects to the Android infrastructure.',
      specsImplem: 'Implementation specifications',
      specsImplemDesc: 'Component structure and interaction states for the developer.',
      specsContent: 'Content specifications',
      specsContentDesc: 'Texts and content rules of the interface.',
      appLoading: 'App loading choreography',
      appLoadingDesc: 'Animation specification of the launch transition.',
      wireframes: 'La Bulle: wireframes',
      wireframesDesc: 'First exploration of the interaction model.',
      uiFocus: 'La Bulle: expanded menu',
      uiFocusDesc: 'The menu open, with its quick actions.',
      icons: 'La Bulle: icons',
      iconsDesc: 'Icon set for the contextual menu.',
      behaviour1: 'La Bulle: behavior (1)',
      behaviour1Desc: 'Animation states and interaction patterns.',
      behaviour2: 'La Bulle: behavior (2)',
      behaviour2Desc: 'Edge cases and system integration.',
      interactionDemo: 'La Bulle: interaction demo',
      interactionDemoDesc: 'Motion prototype of the opening animation.',
      bulleDemo: 'La Bulle: full demo',
      bulleDemoDesc: 'Shortcuts, search and sharing in motion.',
      designSystem: 'Visual language and components',
      designSystemDesc: 'Palette, type scale and components of Connect.',
    },
  },
  fr: {
    metaLabels: { role: 'Rôle', scope: 'Périmètre', company: 'Entreprise' },
    meta: { company: 'UNOWHY' },
    hero: {
      role: 'Product Design Lead',
      scope: 'Stratégie UX, design UI, prototypage',
      title: 'Remplacer un lanceur Android par un tableau de bord web',
      intro:
        'En 2020, j’ai dirigé la conception de Connect, un tableau de bord web destiné à remplacer le lanceur Android d’UNOWHY, et de La Bulle, une interface flottante qui l’accompagnait. Le prototype n’a pas été lancé comme produit. Il a convaincu la direction de changer de stratégie et a ouvert la voie à la suite SQOOL.',
    },
    summary: {
      context:
        'Le lanceur Android d’UNOWHY était dépassé sur le plan technique comme visuel, et l’essor des usages numériques pendant la COVID-19 rendait son remplacement urgent. Il ne correspondait plus aux pratiques des lycées, qui entraient dans le Plan Lycée Numérique. Connect était la preuve de concept d’un tableau de bord web pour les enseignants, dans un programme qui a équipé 465 établissements et 500 000 élèves en Île-de-France.',
      role:
        'Product Design Lead. J’ai initié la vision de Connect avec le Head of Product, co-rédigé le PRD et conçu toutes les interfaces. J’ai travaillé chaque jour avec un développeur React pour construire un prototype fonctionnel, présenté à la direction.',
      roleItems: [
        { title: 'Product Design Lead', detail: 'Stratégie UX et design UI' },
        { title: 'Vision', detail: 'Co-auteur du PRD' },
        { title: 'Prototype', detail: 'Démo React fonctionnelle' },
        { title: 'Langage visuel', detail: 'Base du design system' },
        { title: 'Alignement', detail: 'Développeur et direction' },
      ],
      deliverables: [
        { title: 'Tableau de bord enseignant', detail: 'Actions rapides, état de la classe, catalogue d’applications et notifications, en thèmes clair et sombre.' },
        { title: 'Catalogue d’applications', detail: 'Accès recherchable et filtré aux applications éducatives, relié aux politiques MDM.' },
        { title: 'La Bulle', detail: 'Interface flottante de raccourcis contextuels, avec wireframes, icônes et spécifications de comportement.' },
        { title: 'Architecture technique', detail: 'Raccordement du tableau de bord web à l’infrastructure Android existante.' },
        { title: 'Spécifications', detail: 'Spécifications d’implémentation et de contenu, et chorégraphie de chargement des applications.' },
        { title: 'Langage visuel', detail: 'Composants et style devenus la base du design system SQOOL.' },
      ],
    },
    acts: {
      stakes: 'Un lanceur à remplacer, une direction à choisir',
      approach: 'Prouver par un prototype plutôt que par un document',
      bulle: 'La Bulle, un accès permanent au-dessus d’Android',
      deliverables: 'Des livrables que l’équipe pouvait juger',
      outcome: 'Ce que Connect a changé',
    },
    stakes: {
      text:
        'Le lanceur Android servait de porte d’entrée aux élèves, mais il ne suivait plus les versions d’Android ni les usages des établissements. Le remplacer revenait à choisir une direction pour toutes les applications qui s’y rattachaient, sans preuve qu’une approche web tienne sur les tablettes déjà déployées. L’enjeu portait autant sur la décision que sur l’interface\u00a0: produire de quoi trancher.',
      objectivesTitle: 'Quatre objectifs à prouver en même temps',
      objectives: [
        { title: 'Un tableau de bord modulaire', text: 'Des blocs (actions rapides, état de la classe, catalogue) que l’enseignant peut personnaliser et réorganiser.' },
        { title: 'Une performance web crédible', text: 'Un tableau de bord dense qui charge vite et de façon fiable dans un navigateur, sur le matériel déjà déployé.' },
        { title: 'Des notifications lisibles', text: 'Les demandes d’élèves et les contenus partagés remontent par ordre d’importance, sans distraire.' },
        { title: 'Un seul point d’entrée', text: 'Les applications et les outils de pilotage de la classe réunis dans une même vue.' },
      ],
    },
    approach: {
      sprint: {
        title: 'Un design sprint qui part de l’enseignant',
        text:
          'J’ai lancé un design sprint stratégique, mené à distance sur Miro et Figma, autour d’une question\u00a0: comment faciliter l’appropriation du numérique en classe pour l’enseignant\u00a0? Le prototype a été testé avec des enseignants et des collaborateurs d’UNOWHY, et les résultats ont été consignés dans une grille de synthèse. Un sprint donne en quelques jours un retour d’utilisateurs sur une hypothèse, là où la documentation seule en demanderait des mois.',
      },
      prototype: {
        title: 'Un prototype React plutôt que des maquettes',
        text:
          'Avec un développeur, j’ai construit le tableau de bord en React, sur une grille modulaire (React Grid Layout) qui accueille des applications dans des iframes. Des maquettes ne pouvaient pas montrer si des blocs réorganisables chargent vite sur une tablette. Un prototype fonctionnel le pouvait, et c’est lui qui a été présenté à la direction.',
      },
      dashboard: {
        title: 'Les trois gestes les plus fréquents au premier plan',
        text:
          'Sur l’écran d’accueil, la zone principale reçoit ce que l’enseignant répète le plus\u00a0: démarrer une séance, partager un document, verrouiller les appareils. L’état de la classe, le catalogue d’applications et les notifications s’organisent autour, en thèmes clair et sombre (le sombre pour la projection en classe). Les notifications sont hiérarchisées pour signaler l’important sans distraire.',
      },
    },
    bulle: {
      text:
        'En parallèle du tableau de bord, j’ai exploré La Bulle, un module flottant qui reste visible au-dessus de l’interface Android. Inspirée des surcouches de jeu vidéo et des menus de stylet (les raccourcis radiaux des Galaxy Note), elle ouvre un menu radial ou vertical avec des raccourcis contextuels\u00a0: recherche, capture d’écran, partage. L’idée était de donner un accès permanent aux actions fréquentes sans quitter l’application en cours. J’ai spécifié ses états d’animation, ses cas limites et son intégration au système.',
    },
    deliverables: {
      text:
        'Le prototype reposait sur une architecture qui devait cohabiter avec l’infrastructure Android existante, et le schéma montre comment le tableau de bord web s’y raccorde. J’ai rédigé les spécifications d’implémentation et de contenu pour le développeur React, avec la chorégraphie de chargement des applications. Le langage visuel posé ici (couleurs, typographie, espacements) est devenu la base du design system de la suite SQOOL.',
    },
    outcome: {
      text:
        'Connect n’a jamais été lancé comme produit unique, et il n’a été testé qu’en interne, pendant un an. Il a pourtant servi de preuve\u00a0: React et une approche web modulaire tenaient sur les tablettes existantes, et le prototype a convaincu la direction.',
      text2:
        'Il a aussi montré les limites de l’idée. Un tableau de bord qui réunit tout devenait dense pour les enseignants, et il aurait concurrencé directement les ENT (espaces numériques de travail) que les établissements utilisaient déjà. Ce constat a conduit à découper la plateforme en applications ciblées, ce que raconte l’étude de la suite SQOOL.',
      readSuite: 'Lire l’étude de la suite SQOOL',
      viewAll: 'Voir tous les visuels',
    },
    ui: {
      prev: 'Visuel précédent',
      next: 'Visuel suivant',
      slide: 'Visuel',
      sprintLabel: 'Visuels du design sprint',
      screensLabel: 'Écrans du tableau de bord',
      bulleLabel: 'Documents de conception de La Bulle',
      deliverablesLabel: 'Spécifications, architecture et langage visuel',
    },
    captions: {
      thumbnail: 'Vue d’ensemble de Connect',
      thumbnailDesc: 'Concept de tableau de bord web pour l’orchestration de la classe.',
      homeDark: 'Accueil du tableau de bord, thème sombre',
      homeDarkDesc: 'Actions rapides et état de la classe, sur tablette et téléphone.',
      homeLight: 'Accueil du tableau de bord, thème clair',
      homeLightDesc: 'Variante claire pour d’autres conditions d’éclairage.',
      applications: 'Catalogue d’applications',
      applicationsDesc: 'Parcourir, filtrer et lancer les applications éducatives.',
      loadingAuth: 'Parcours de connexion et d’authentification',
      loadingAuthDesc: 'Étude animée de la connexion et du lancement d’une application.',
      prototype: 'Prototype fonctionnel du tableau de bord',
      prototypeDesc: 'Parcours complet du tableau de bord modulaire.',
      designSprint: 'Déroulé du design sprint',
      designSprintDesc: 'De la prise en main au pilotage de la classe.',
      ds1: 'Méthode du sprint',
      ds1Desc: 'Les étapes d’esquisse et de décision, menées à distance.',
      ds2: 'Vote sur les esquisses',
      ds2Desc: 'Vote à distance sur un tableau Miro.',
      ds3: 'Wireframe de l’écran d’accueil',
      ds3Desc: 'Première organisation de l’accueil de Connect\u00a0: actions rapides, espace de classe, actualités.',
      ds4: 'Écrans du prototype dans Figma',
      ds4Desc: 'Écrans préparés pour les séances de test.',
      ds5: 'Prototype cliquable',
      ds5Desc: 'La version testée avec des enseignants et des collaborateurs d’UNOWHY.',
      ds6: 'Grille de synthèse des tests',
      ds6Desc: 'Résultats des séances de test, enseignants et collaborateurs d’UNOWHY.',
      techArch: 'Architecture technique',
      techArchDesc: 'Raccordement du tableau de bord web à l’infrastructure Android.',
      specsImplem: 'Spécifications d’implémentation',
      specsImplemDesc: 'Structure des composants et états d’interaction pour le développeur.',
      specsContent: 'Spécifications de contenu',
      specsContentDesc: 'Textes et règles de contenu de l’interface.',
      appLoading: 'Chorégraphie de chargement d’une application',
      appLoadingDesc: 'Spécification d’animation de la transition de lancement.',
      wireframes: 'La Bulle\u00a0: wireframes',
      wireframesDesc: 'Première exploration du modèle d’interaction.',
      uiFocus: 'La Bulle\u00a0: menu déployé',
      uiFocusDesc: 'Le menu ouvert, avec ses actions rapides.',
      icons: 'La Bulle\u00a0: icônes',
      iconsDesc: 'Jeu d’icônes du menu contextuel.',
      behaviour1: 'La Bulle\u00a0: comportement (1)',
      behaviour1Desc: 'États d’animation et modes d’interaction.',
      behaviour2: 'La Bulle\u00a0: comportement (2)',
      behaviour2Desc: 'Cas limites et intégration au système.',
      interactionDemo: 'La Bulle\u00a0: démonstration d’interaction',
      interactionDemoDesc: 'Prototype animé de l’animation d’ouverture.',
      bulleDemo: 'La Bulle\u00a0: démonstration complète',
      bulleDemoDesc: 'Raccourcis, recherche et partage en mouvement.',
      designSystem: 'Langage visuel et composants',
      designSystemDesc: 'Palette, échelle typographique et composants de Connect.',
    },
  },
}
