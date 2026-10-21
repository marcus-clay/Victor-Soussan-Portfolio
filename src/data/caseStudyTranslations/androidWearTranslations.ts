// Translations extracted from AndroidWearPage.tsx
export const ANDROID_WEAR_TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    gallery: 'Gallery',
    meta: {
      type: 'Wearable App',
      typeLabel: 'Type',
      scope: 'Product Design',
      scopeLabel: 'Scope',
      company: 'PagesJaunes',
      companyLabel: 'Company',
    },
    hero: {
      role: 'Product Designer',
      scope: 'Android Wear, Material Design',
      title: 'Bringing PagesJaunes to Your Wrist',
      subtitle: 'Designing a glanceable local search experience for Android Wear',
      intro: 'A wearable app that brings PagesJaunes local search to Android Wear. In a duo with an Android developer, I designed a glanceable experience for a 280dp circular screen and shipped it from concept to Google Play.',
      description: 'A two-month design sprint to bring France\'s leading local directory to wearables. Working in a tight duo with Android developer Thibault Fighiera, we shipped a fully functional Android Wear app from concept to Google Play.',
    },
    testimonial: {
      quote: 'Victor designed a complete wearable experience from scratch in two months. His ability to understand the constraints of a new platform and translate them into a coherent design language was impressive.',
      author: 'Thibault Fighiera',
      role: 'Android Developer at PagesJaunes',
    },
    summary: {
      context: 'PagesJaunes wanted to experiment with wearable technology. Android Wear was emerging as a platform, and we saw an opportunity to help users find local professionals in the most contextual way possible: right from their wrist. The challenge was a complete local search experience for a 280dp circular screen, where users find businesses, view key info, and take action (call or navigate) within seconds.',
      role: 'I owned the full design process: user research, persona creation, sketching, wireframing, UI design, interaction specs, prototyping, and stakeholder presentations. Working back-to-back with our developer for rapid iteration.',
      deliverables: [
        { title: 'Persona and user stories', detail: 'Julien, 25, and the two scenarios the app had to serve.' },
        { title: 'Sketches and wireframes', detail: 'Dozens of layout options explored on paper before opening Sketch.' },
        { title: 'Full UI design', detail: 'Circular and square displays, in regular mode and in monochrome ambient mode.' },
        { title: 'Interaction specs and motion design', detail: 'Handoff from the watch to the phone for calls and Google Maps navigation.' },
        { title: 'Prototypes and demo videos', detail: 'A working prototype captured on real hardware, and the stakeholder presentation deck.' },
      ],
    },
    acts: {
      context: 'Julien at noon: find a restaurant and get there',
      approach: 'From platform constraints to real hardware',
      product: 'A card-based search app in two modes',
      results: 'What the sprint delivered',
      seeAll: 'View all visuals',
    },
    persona: {
      title: 'User Scenario',
      scenario: '\u201cIt\u2019s noon, Julien is hungry. He wants to quickly find a restaurant near the office and get directions.\u201d',
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
      componentsDesc: 'Documentation covering both round and square watch variants. This became the single source of truth for our two-person team.',
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
          label: 'Circular screen size designed for',
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
          desc: 'Deep understanding of Android Wear patterns made our app feel native to the platform.',
        },
        {
          title: 'Tight collaboration accelerates',
          desc: 'Daily check-ins with the developer meant problems were caught and solved within hours.',
        },
      ],
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    gallery: 'Galerie',
    meta: {
      type: 'App pour montre connectée',
      typeLabel: 'Type',
      scope: 'Product design',
      scopeLabel: 'Périmètre',
      company: 'PagesJaunes',
      companyLabel: 'Entreprise',
    },
    hero: {
      role: 'Product Designer',
      scope: 'Android Wear, Material Design',
      title: 'PagesJaunes à votre poignet',
      subtitle: 'Concevoir une expérience de recherche locale lisible d\'un coup d\'œil pour Android Wear',
      intro: 'Une app qui porte la recherche locale de PagesJaunes sur Android Wear. En binôme avec un développeur Android, j\'ai conçu une expérience lisible d\'un coup d\'œil sur un écran circulaire de 280dp, du concept à Google Play.',
      description: 'Un sprint de conception de deux mois pour porter l\'annuaire local leader en France sur les montres connectées. En binôme serré avec le développeur Android Thibault Fighiera, nous avons livré une app Android Wear complète, du concept à Google Play.',
    },
    testimonial: {
      quote: 'Victor a conçu une expérience montre connectée complète en partant de zéro en deux mois. Sa capacité à comprendre les contraintes d\'une nouvelle plateforme et à les traduire en un langage de design cohérent était impressionnante.',
      author: 'Thibault Fighiera',
      role: 'Développeur Android chez PagesJaunes',
    },
    summary: {
      context: 'PagesJaunes voulait expérimenter les montres connectées. Android Wear émergeait comme plateforme, et nous avons vu l\'occasion d\'aider les utilisateurs à trouver des professionnels locaux de la manière la plus contextuelle\u00a0: directement depuis leur poignet. Le défi\u00a0: une expérience de recherche locale complète sur un écran circulaire de 280dp, où l\'utilisateur trouve un commerce, voit les informations clés et agit (appeler ou naviguer) en quelques secondes.',
      role: 'J\'ai piloté tout le processus de design\u00a0: recherche utilisateur, création de profils types, croquis, maquettes fil de fer, design d\'interface, spécifications d\'interaction, prototypage et présentations aux décideurs. En binôme avec notre développeur pour itérer rapidement.',
      deliverables: [
        { title: 'Persona et user stories', detail: 'Julien, 25 ans, et les deux scénarios que l\'app devait servir.' },
        { title: 'Croquis et wireframes', detail: 'Des dizaines d\'options de mise en page explorées sur papier avant d\'ouvrir Sketch.' },
        { title: 'Design d\'interface complet', detail: 'Écrans circulaires et carrés, en mode normal et en mode ambiant monochrome.' },
        { title: 'Spécifications d\'interaction et motion design', detail: 'Relais de la montre vers le téléphone pour les appels et la navigation Google Maps.' },
        { title: 'Prototypes et vidéos de démonstration', detail: 'Un prototype fonctionnel filmé sur du vrai matériel, et le support de présentation aux décideurs.' },
      ],
    },
    acts: {
      context: 'Julien à midi\u00a0: trouver un restaurant et s\'y rendre',
      approach: 'Des contraintes de la plateforme au matériel réel',
      product: 'Une app de recherche en cartes, en deux modes',
      results: 'Ce que le sprint a livré',
      seeAll: 'Voir tous les visuels',
    },
    persona: {
      title: 'Scénario utilisateur',
      scenario: '«\u202fIl est midi, Julien a faim. Il veut trouver rapidement un restaurant près du bureau et s\'y faire guider.\u202f»',
      name: 'Julien, 25 ans',
      context: 'Professionnel occupé, toujours en mouvement. Utilise son téléphone pour tout mais veut un accès plus rapide aux tâches courantes. Adepte des nouvelles technologies.',
      needs: [
        'Trouver des commerces proches en quelques secondes',
        'Obtenir les informations clés en un coup d\'œil (ouvert ou fermé, note, distance)',
        'Agir rapidement (appeler ou naviguer)',
        'Interaction minimale, résultat maximal',
      ],
    },
    approach: {
      title: 'Approche de conception',
      items: [
        {
          title: 'Apprendre la plateforme',
          desc: 'Plongée dans les recommandations Android Wear. Comprendre les contraintes\u00a0: écrans circulaires, mode ambiant, saisie vocale, relais vers le téléphone.',
        },
        {
          title: 'Définir les parcours',
          desc: 'Deux parcours utilisateur principaux\u00a0: «\u202fTrouver et appeler\u202f» et «\u202fTrouver et naviguer\u202f». Chaque chemin est optimisé pour un minimum d\'interactions et une clarté maximale.',
        },
        {
          title: 'Concevoir pour la lisibilité instantanée',
          desc: 'Chaque écran devait communiquer son propos en moins de 2 secondes. La hiérarchie de l\'information est devenue décisive sur un écran de 280dp.',
        },
        {
          title: 'Itérer sur du vrai matériel',
          desc: 'Sessions hebdomadaires avec de vraies montres. Tester avec des contraintes réelles a révélé des problèmes que les maquettes ne pouvaient pas montrer.',
        },
      ],
    },
    features: {
      title: 'Ce que nous avons construit',
      items: [
        'Interface en cartes avec notes, statut et bouton de contact',
        'Deux parcours utilisateur optimisés\u00a0: recherche→appel et recherche→navigation',
        'Mode normal (jaune à fort contraste) et mode ambiant (monochrome)',
        'Recherche vocale avec «\u202fOk Google\u202f»',
        'Relais vers le téléphone pour les appels et la navigation Google Maps',
        'Raccourcis par catégorie pour accéder rapidement aux recherches courantes',
      ],
    },
    deliverables: {
      title: 'Mes livrables',
      items: [
        'Documentation du persona et des user stories',
        'Croquis et wireframes',
        'Design d\'interface complet pour écrans circulaires et carrés',
        'Spécifications d\'interaction et motion design',
        'Prototypage et vidéos de démonstration',
        'Support de présentation aux décideurs',
      ],
    },
    process: {
      title: 'Démarche de conception',
      sketches: 'Wireframes sur papier',
      sketchesDesc: 'Avant d\'ouvrir Sketch, j\'ai exploré des dizaines d\'options de mise en page sur papier. Cette itération rapide a révélé quelle hiérarchie d\'information fonctionnait sur un écran circulaire de 280dp.',
      ambient: 'Cartographie du mode ambiant',
      ambientDesc: 'Chaque écran actif nécessitait un équivalent basse consommation. Des contours blancs sur fond noir préservaient la batterie tout en gardant les utilisateurs orientés.',
      flows: 'Parcours utilisateur',
      flowsDesc: 'Deux trajectoires optimisées\u00a0: trouver et appeler pour l\'urgence, trouver et naviguer pour la découverte. Chaque appui comptait sur un écran aussi contraint.',
      uiModes: 'États actif et ambiant',
      uiModesDesc: 'Le jaune PagesJaunes assurait une reconnaissance instantanée en mode actif. L\'état ambiant se réduisait à l\'essentiel monochrome, prolongeant la batterie de plusieurs heures.',
      components: 'Bibliothèque de composants',
      componentsDesc: 'Documentation couvrant les variantes de montres rondes et carrées. Cette bibliothèque est devenue la source de vérité de notre équipe de deux.',
    },
    implementation: {
      title: 'Implémentation',
      devSession: 'Sessions en binôme',
      devSessionDesc: 'Sessions de travail quotidiennes avec le développeur Thibault Fighiera. Deux montres connectées, des itérations sur des versions réelles plutôt que sur des maquettes statiques.',
      prototype: 'Démo du parcours de recherche',
      prototypeDesc: 'Le parcours de recherche complet capturé sur du vrai matériel. De la saisie vocale à l\'affichage de la fiche du commerce.',
    },
    result: {
      title: 'Résultat',
      items: [
        {
          value: '2 mois',
          label: 'Du concept à Google Play',
        },
        {
          value: '2 parcours',
          label: 'Parcours utilisateur optimisés',
        },
        {
          value: '280dp',
          label: 'Taille de l\'écran circulaire visé',
        },
        {
          value: '1 équipe',
          label: 'Duo designer et développeur',
        },
      ],
    },
    learnings: {
      title: 'Ce que j\'ai appris',
      items: [
        {
          title: 'Les contraintes stimulent la créativité',
          desc: 'Un écran de 280dp a obligé à rendre chaque décision de design intentionnelle. Aucune place pour le superflu.',
        },
        {
          title: 'La maîtrise de la plateforme compte',
          desc: 'Une compréhension approfondie des motifs Android Wear a donné à notre app un comportement natif.',
        },
        {
          title: 'Une collaboration serrée accélère',
          desc: 'Des points quotidiens avec le développeur permettaient de repérer et de résoudre les problèmes en quelques heures.',
        },
      ],
    },
  },
};
