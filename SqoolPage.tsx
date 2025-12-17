// SQOOL Ecosystem Case Study Page - The 6-Year EdTech Transformation
// A trunk case study that synthesizes the SQOOL journey (2018-2024)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Play,
  Quote,
  Calendar,
  Briefcase,
  Layers,
  Users
} from 'lucide-react';
import { GalleryItem, getSqoolGalleryItems } from './BentoGallery';
import { SqoolTimeline } from './SqoolTimeline';
import SqoolExecutive from './src/components/SqoolExecutive';
import EnhancedLightbox from './src/components/EnhancedLightbox';

interface SqoolPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
}

// Translations - Clear, jargon-free language
const SQOOL_TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    projectGallery: 'Project Gallery',
    gallery: 'Gallery',
    back: 'Back',
    contactVictor: 'Contact Victor for a similar project',
    clickToZoom: 'Click to zoom',
    clickToExitZoom: 'Click to exit zoom',
    viewDetailedCaseStudy: 'View detailed case study',
    meta: {
      type: 'Product Design, Design System',
      scope: 'EdTech Ecosystem',
      period: '2018-2024',
      company: 'UNOWHY / SQOOL',
    },
    nav: {
      intro: 'Intro',
      context: 'Context',
      phase1: '2019-2020',
      phase2: '2021',
      phase3: '2022-2024',
      apps: 'Apps',
      impact: 'Impact',
    },
    hero: {
      role: 'Product Lead & Design Manager',
      scope: 'EdTech Ecosystem & Design System',
      period: '2018-2024',
      title: 'Building an EdTech Ecosystem for 500,000 Students',
      subtitle: 'How we transformed a hardware company into a modern software platform',
      description: 'Over six years at UNOWHY, I led the design transformation from a legacy Android launcher to a suite of 7+ web applications serving high school students and teachers across 465 schools in Ile-de-France. This is the story of strategic pivots, user-centered design, and building a design system that scales.',
    },
    testimonial: {
      quote: 'Victor played a key role in our design transformation. He built the team, established our design system, and brought the rigor we needed to scale from one product to an entire ecosystem. His ability to balance strategic vision with hands-on execution was essential to SQOOL\'s evolution.',
      author: 'Charlotte Rifflet',
      role: 'CPO @ UNOWHY',
    },
    context: {
      title: 'The Context',
      subtitle: 'A massive deployment, a new challenge',
      p1: 'In early 2019, the Ile-de-France region partnered with UNOWHY for the "Lycee Numerique" program. The goal: equip every student and teacher in 465 high schools with a personal device - that\'s 500,000 tablets and PCs deployed at the start of the 2019 school year.',
      p2: 'The existing SQOOL suite (2015-2018) was built for a different world: shared tablets on carts, teachers using heavy C++ desktop apps, and students locked into a custom Android launcher. None of this would work for personal devices used at school and at home.',
      challenge: 'The Challenge',
      challengeDesc: 'Design a new software ecosystem that works on standard Android and Windows devices, accessible from any browser, while competing with government-mandated platforms (ENT) that schools were already using.',
      myRole: 'My Role',
      roleDesc: 'I joined as Senior UX/UI Designer in 2018, grew into Design Lead in 2020, then Product Lead in 2023. I recruited and managed a team of 5 designers, co-led product strategy with the CPO, and built the design system that unified the entire suite.',
    },
    phase1: {
      title: 'Phase 1: Finding Our Place',
      period: '2019-2020',
      intro: 'We needed to prove that web-based tools could work for education. Two projects shaped our direction:',
      hisqool: {
        title: 'Hi-SQOOL: A New Identity for Students',
        p1: 'Our first challenge was creating a student-facing platform. Through interviews with high schoolers, we discovered they wanted something that felt different from the institutional tools they were forced to use.',
        p2: 'Hi-SQOOL became a 6-week sprint to design a new brand identity and a web app that centralized student activities: chat, documents, class schedules, and educational content. We validated our web-first approach, even though adoption was limited by political conflicts with existing ENT platforms.',
        outcome: 'Outcome: Established new authentication system and cloud storage that became foundations for future apps.',
      },
      connect: {
        title: 'Connect: The Dashboard That Taught Us to Pivot',
        p1: 'In 2020, as COVID hit, we realized our apps weren\'t sticky. Without a native launcher, users had no reason to think of SQOOL. We designed Connect - a vision prototype for a unified dashboard that would be the entry point for everything.',
        p2: 'We built a working React prototype with an innovative concept called "La Bulle" - a persistent floating menu for quick actions. The prototype proved the technology worked.',
        p3: 'But it also revealed a fatal flaw: a dense dashboard would directly compete with ENTs. We were building something schools already had.',
        outcome: 'Outcome: The non-shipped prototype was our most valuable deliverable. It gave us evidence to stop and change direction.',
      },
    },
    phase2: {
      title: 'Phase 2: The Strategic Pivot',
      period: '2021',
      intro: 'Instead of one big platform, we decided to build focused apps that do one thing well.',
      manifesto: {
        title: 'A New Vision: Simple, Fluid, Magical',
        p1: 'I worked with the product leadership to define a new direction. We wrote a manifesto shared across the company: SQOOL apps should be simple to understand, fluid to use, and magical in the moments that matter.',
        p2: 'This meant killing complexity. Each app would solve one clear problem. If teachers needed to share files, they\'d use SQOOL Partage. If they needed to see what students were doing, they\'d use SQOOL Classe. No more trying to be everything.',
      },
      brand: {
        title: 'Building the SQOOL Brand System',
        p1: 'A suite of apps needs a shared identity. I designed the new SQOOL visual system: logos for each app, a color palette that distinguished them while keeping them part of a family, and interaction patterns that would feel consistent everywhere.',
        p2: 'We partnered with agency Fllow to refine the brand. The result was a system that could scale to 7+ apps while maintaining recognition.',
      },
      ds: {
        title: 'Design System as Infrastructure',
        p1: 'With multiple teams building different apps, consistency became critical. I architected our Figma libraries and established documentation on ZeroHeight. The goal: any designer could start a new screen and have all the components they needed.',
        p2: 'We implemented weekly design syncs and QA reviews to keep everyone aligned. When you use SQOOL Classe, then switch to SQOOL Partage, it feels like the same product family.',
      },
    },
    phase3: {
      title: 'Phase 3: Shipping the Suite',
      period: '2022-2024',
      intro: 'With our strategy defined and design system in place, we built and launched the specialized apps:',
    },
    apps: {
      classe: {
        title: 'SQOOL Classe',
        subtitle: 'Classroom supervision',
        desc: 'Teachers see every student screen in real-time. They can lock devices, push content, and manage attention without leaving their desk. We learned that teachers don\'t want surveillance - they want to feel in control of their classroom.',
        research: 'User research insight: Teachers feared losing control when students had devices. Our grid-based view with color-coded status gave them confidence.',
      },
      partage: {
        title: 'SQOOL Partage',
        subtitle: 'File sharing',
        desc: 'Drag and drop to share files with a class. No more USB keys, no more email attachments. We designed it to be as simple as AirDrop, but for classrooms.',
        research: 'User research insight: The biggest daily friction was getting a PDF to 27 students. We made it one gesture.',
      },
      applications: {
        title: 'SQOOL Applications',
        subtitle: 'App discovery',
        desc: 'A curated catalog of educational apps. Teachers browse, IT admins deploy through the MDM. We pivoted from building an "app store" to being a discovery front-end.',
        research: 'User research insight: Teachers didn\'t want to manage installations. They wanted to find good tools.',
      },
      mdm: {
        title: 'SQOOL MDM',
        subtitle: 'Device management',
        desc: 'IT administrators manage 500,000 devices: security policies, app deployments, remote troubleshooting. We separated this complexity from teacher-facing tools.',
      },
      protect: {
        title: 'SQOOL Protect',
        subtitle: 'Parental controls',
        desc: 'Parents set screen time limits for evenings and weekends. QR code pairing, 3-minute setup. We shipped in 3 months to thousands of devices.',
        research: 'User research insight: Parents wanted simplicity, not features. We designed the most minimal viable control panel.',
      },
      extend: {
        title: 'SQOOL Extend',
        subtitle: 'Cloud desktops',
        desc: 'Heavy software on light devices. Students access virtual Windows desktops with professional tools installed. We designed loading sequences that reduced perceived wait time.',
        research: 'User research insight: Teachers didn\'t ask for VMs. They asked why Photoshop was slow. We solved the underlying problem.',
      },
    },
    research: {
      title: 'What We Learned From Users',
      subtitle: 'Patterns that shaped our design decisions',
      insights: [
        {
          title: 'Teachers don\'t collaborate in real-time',
          desc: 'We tested Canvas, a collaborative whiteboard (like Figma). Teachers rejected it. They want to prepare content, distribute it, collect work, then grade. Sequential, not simultaneous.',
        },
        {
          title: 'Simplicity beats features',
          desc: 'Every time we added options, adoption dropped. The apps that worked had fewer screens and clearer paths.',
        },
        {
          title: 'Design for bad WiFi',
          desc: 'School networks are unreliable. We built graceful degradation into everything - apps show clear status when offline, not cryptic errors.',
        },
        {
          title: 'Consistency builds trust',
          desc: 'When teachers move between apps, they don\'t want to relearn interfaces. Our design system paid off in user confidence.',
        },
      ],
    },
    impact: {
      title: 'Impact',
      intro: 'Over six years, we transformed a hardware company into a modern SaaS platform. The design approach enabled scale across multiple products while maintaining consistency.',
      users: '500,000+',
      usersDesc: 'Students & teachers served daily',
      schools: '465',
      schoolsDesc: 'Schools equipped across Ile-de-France',
      apps: '7+',
      appsDesc: 'Web applications shipped',
      team: '5',
      teamDesc: 'Designers recruited & managed',
    },
    learnings: {
      title: 'Key Learnings',
      items: [
        {
          title: 'Prototypes can be more valuable than products',
          desc: 'Connect never shipped, but it was our most important project. It proved our technology worked and showed us why our strategy was wrong.',
        },
        {
          title: 'Splitting the product was the biggest UX win',
          desc: 'The decision to build focused apps instead of one platform reduced complexity more than any interface redesign could.',
        },
        {
          title: 'Design systems are about governance, not components',
          desc: 'The hard part isn\'t building a button library. It\'s getting 30+ developers across 5 teams to use it consistently.',
        },
      ],
    },
    relatedCases: {
      title: 'Detailed Case Studies',
      items: [
        { title: 'Hi-SQOOL: A Foundational Design Project', id: 'hisqool' },
        { title: 'Connect: The Vision Prototype', id: 'connect' },
        { title: 'SQOOL Classe: Classroom Control', id: 'classe' },
        { title: 'SQOOL Partage: File Sharing', id: 'partage' },
        { title: 'SQOOL Brand System', id: 'brand' },
        { title: 'SQOOL Design System', id: 'design-system' },
      ],
    },
    captions: {
      hero: 'SQOOL App Suite',
      heroDesc: 'The complete ecosystem of web applications',
      distribution: 'Back-to-school distribution',
      distributionDesc: 'Ile-de-France region deploying devices to students',
      tablette: 'SQOOL tablet',
      tabletteDesc: 'Student device designed for education',
      marquage: 'Device features',
      marquageDesc: 'Marking the tablet functionalities for users',
      legacyLauncher: 'Legacy Student Launcher',
      legacyLauncherDesc: 'Custom Android environment that locked students into SQOOL apps',
      legacyManager: 'Legacy Teacher Manager',
      legacyManagerDesc: 'C++ desktop application for classroom management',
      legacyMdm: 'Legacy MDM',
      legacyMdmDesc: 'On-premise device management system',
      context: 'Lycee Numerique',
      contextDesc: '500,000 devices deployed in 2019',
      hisqool: 'Hi-SQOOL',
      hisqoolDesc: 'Student platform and new brand identity',
      connect: 'Connect',
      connectDesc: 'An experimental interface meant to replace a legacy launcher. Connect explored personalization, dashboard design, and access to classroom tools.',
      bulle: 'La Bulle',
      bulleDesc: 'An animated floating module on Android tablets, always accessible. Designed to surface contextual actions: screenshot & share, help shortcuts, quick app actions, and notifications.',
      brand: 'Brand System',
      brandDesc: 'Visual identity for the app suite',
      designSystem: 'Design System',
      designSystemDesc: 'Components and documentation on ZeroHeight',
      classe: 'SQOOL Classe',
      classeDesc: 'Real-time classroom supervision',
      partage: 'SQOOL Partage',
      partageDesc: 'One-gesture file sharing',
      applications: 'SQOOL Applications',
      applicationsDesc: 'Educational app discovery',
      mdm: 'SQOOL MDM',
      mdmDesc: 'Device fleet management',
      protect: 'SQOOL Protect',
      protectDesc: 'Parental controls with QR pairing',
      extend: 'SQOOL Extend',
      extendDesc: 'Cloud desktops for heavy software',
      timeline: 'Timeline',
      timelineDesc: '6 years of product evolution',
      impact: 'Impact',
      impactDesc: 'Results and outcomes',
      // Brand System Visuals
      brandVisual01: 'Primary Colors',
      brandVisual01Desc: 'Blue Dodger, Text Primary and Marine - core palette',
      brandVisual02: 'App Color System',
      brandVisual02Desc: 'Signature colors for Classe, Applications, MDM and Partage',
      brandVisual03: 'Gradient Library',
      brandVisual03Desc: 'Blue, orange and purple gradients with hex values',
      brandVisual04: 'SQOOL Partage Logo',
      brandVisual04Desc: 'Logo variations on white, dark and blue backgrounds',
      brandVisual05: 'Settings Icon',
      brandVisual05Desc: 'Gear icon on light, dark and gradient backgrounds',
      brandVisual06: 'Community Page',
      brandVisual06Desc: 'SQOOL Community landing page design',
      brandVisual07: 'SQOOL Extend',
      brandVisual07Desc: 'Cloud desktop extension branding',
      brandVisual08: 'SQOOL Protect',
      brandVisual08Desc: 'Security and protection app branding',
      brandVisual09: 'Applications Catalog',
      brandVisual09Desc: 'Web interface for browsing educational apps',
      brandVisual10: 'Android Launcher',
      brandVisual10Desc: 'Tablet home screen with dock icons',
      brandVisual11: 'Password Reset',
      brandVisual11Desc: 'Authentication form component design',
      brandVisual12: 'Apps Hub',
      brandVisual12Desc: 'Landing page with all SQOOL apps cards',
      brandVisual13: 'Logo Variations',
      brandVisual13Desc: 'App logos on dark, light and gradient backgrounds',
      brandVisual14: 'Desktop Launcher',
      brandVisual14Desc: 'Full app grid on tablet with ecosystem apps',
      brandVisual15: 'App Switcher',
      brandVisual15Desc: 'Quick navigation dropdown menu',
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    projectGallery: 'Galerie du projet',
    gallery: 'Galerie',
    back: 'Retour',
    contactVictor: 'Contacter Victor pour un projet similaire',
    clickToZoom: 'Cliquer pour agrandir',
    clickToExitZoom: 'Cliquer pour fermer',
    viewDetailedCaseStudy: 'Voir le case study détaillé',
    meta: {
      type: 'Design Produit, Design System',
      scope: 'Écosystème EdTech',
      period: '2018-2024',
      company: 'UNOWHY / SQOOL',
    },
    nav: {
      intro: 'Intro',
      context: 'Contexte',
      phase1: '2019-2020',
      phase2: '2021',
      phase3: '2022-2024',
      apps: 'Apps',
      impact: 'Impact',
    },
    hero: {
      role: 'Product Lead & Design Manager',
      scope: 'Écosystème EdTech & Design System',
      period: '2018-2024',
      title: 'Construire un écosystème EdTech pour 500 000 élèves',
      subtitle: 'Comment nous avons transformé un fabricant de matériel en plateforme logicielle moderne',
      description: 'Pendant six ans chez UNOWHY, j\'ai dirigé la transformation design d\'un launcher Android vers une suite de 7+ applications web utilisées par les lycéens et enseignants de 465 établissements en Île-de-France. C\'est l\'histoire de pivots stratégiques, de design centré utilisateur, et de la construction d\'un design system qui passe à l\'échelle.',
    },
    testimonial: {
      quote: 'Victor a joué un rôle clé dans notre transformation design. Il a construit l\'équipe, établi notre design system, et apporté la rigueur nécessaire pour passer d\'un produit à un écosystème entier. Sa capacité à équilibrer vision stratégique et exécution concrète a été essentielle à l\'évolution de SQOOL.',
      author: 'Charlotte Rifflet',
      role: 'CPO @ UNOWHY',
    },
    context: {
      title: 'Le Contexte',
      subtitle: 'Un déploiement massif, un nouveau défi',
      p1: 'Début 2019, la Région Île-de-France s\'associe à UNOWHY pour le programme "Lycée Numérique". L\'objectif : équiper chaque élève et enseignant des 465 lycées d\'un appareil personnel - soit 500 000 tablettes et PC déployés à la rentrée 2019.',
      p2: 'La suite SQOOL existante (2015-2018) était conçue pour un autre monde : tablettes partagées sur chariots, enseignants utilisant des apps lourdes en C++, élèves enfermés dans un launcher Android personnalisé. Rien de tout ça ne fonctionnerait pour des appareils personnels utilisés en classe et à la maison.',
      challenge: 'Le Défi',
      challengeDesc: 'Concevoir un nouvel écosystème logiciel qui fonctionne sur Android et Windows standard, accessible depuis n\'importe quel navigateur, tout en concurrençant les plateformes gouvernementales (ENT) déjà utilisées par les établissements.',
      myRole: 'Mon Rôle',
      roleDesc: 'J\'ai rejoint UNOWHY comme Senior UX/UI Designer en 2018, suis devenu Design Lead en 2020, puis Product Lead en 2023. J\'ai recruté et managé une équipe de 5 designers, co-piloté la stratégie produit avec le CPO, et construit le design system qui unifie toute la suite.',
    },
    phase1: {
      title: 'Phase 1 : Trouver notre place',
      period: '2019-2020',
      intro: 'Nous devions prouver que des outils web pouvaient fonctionner pour l\'éducation. Deux projets ont orienté notre direction :',
      hisqool: {
        title: 'Hi-SQOOL : Une nouvelle identité pour les élèves',
        p1: 'Notre premier défi était de créer une plateforme pour les élèves. À travers des entretiens avec des lycéens, nous avons découvert qu\'ils voulaient quelque chose qui se démarque des outils institutionnels qu\'on leur imposait.',
        p2: 'Hi-SQOOL est devenu un sprint de 6 semaines pour designer une nouvelle identité de marque et une app web centralisant les activités des élèves : chat, documents, emplois du temps, contenus pédagogiques. Nous avons validé notre approche web-first, même si l\'adoption a été limitée par des conflits politiques avec les ENT existants.',
        outcome: 'Résultat : Mise en place d\'un nouveau système d\'authentification et de stockage cloud qui sont devenus les fondations des futures apps.',
      },
      connect: {
        title: 'Connect : Le dashboard qui nous a appris à pivoter',
        p1: 'En 2020, avec le COVID, nous avons réalisé que nos apps ne retenaient pas les utilisateurs. Sans launcher natif, les gens n\'avaient aucune raison de penser à SQOOL. Nous avons conçu Connect - un prototype de vision pour un dashboard unifié qui serait le point d\'entrée de tout.',
        p2: 'Nous avons construit un prototype React fonctionnel avec un concept innovant appelé "La Bulle" - un menu flottant persistant pour les actions rapides. Le prototype a prouvé que la technologie fonctionnait.',
        p3: 'Mais il a aussi révélé un défaut fatal : un dashboard dense serait en concurrence directe avec les ENT. Nous construisions quelque chose que les établissements avaient déjà.',
        outcome: 'Résultat : Le prototype non livré a été notre livrable le plus précieux. Il nous a donné les preuves pour nous arrêter et changer de direction.',
      },
    },
    phase2: {
      title: 'Phase 2 : Le pivot stratégique',
      period: '2021',
      intro: 'Au lieu d\'une grande plateforme, nous avons décidé de construire des apps ciblées qui font une seule chose bien.',
      manifesto: {
        title: 'Une nouvelle vision : Simple, Fluide, Magique',
        p1: 'J\'ai travaillé avec la direction produit pour définir une nouvelle direction. Nous avons écrit un manifeste partagé à toute l\'entreprise : les apps SQOOL doivent être simples à comprendre, fluides à utiliser, et magiques dans les moments qui comptent.',
        p2: 'Cela signifiait éliminer la complexité. Chaque app résoudrait un problème clair. Si les enseignants devaient partager des fichiers, ils utiliseraient SQOOL Partage. S\'ils devaient voir ce que faisaient les élèves, ils utiliseraient SQOOL Classe. Plus question d\'essayer d\'être tout à la fois.',
      },
      brand: {
        title: 'Construire le système de marque SQOOL',
        p1: 'Une suite d\'apps a besoin d\'une identité partagée. J\'ai conçu le nouveau système visuel SQOOL : logos pour chaque app, une palette de couleurs qui les distingue tout en les gardant dans une même famille, et des patterns d\'interaction cohérents partout.',
        p2: 'Nous avons travaillé avec l\'agence Fllow pour affiner la marque. Le résultat : un système qui peut passer à l\'échelle pour 7+ apps tout en maintenant la reconnaissance.',
      },
      ds: {
        title: 'Le Design System comme infrastructure',
        p1: 'Avec plusieurs équipes construisant différentes apps, la cohérence est devenue critique. J\'ai architecturé nos bibliothèques Figma et établi la documentation sur ZeroHeight. L\'objectif : n\'importe quel designer peut commencer un nouvel écran et avoir tous les composants nécessaires.',
        p2: 'Nous avons mis en place des syncs design hebdomadaires et des revues QA pour garder tout le monde aligné. Quand vous utilisez SQOOL Classe, puis passez à SQOOL Partage, ça ressemble à la même famille de produits.',
      },
    },
    phase3: {
      title: 'Phase 3 : Livrer la suite',
      period: '2022-2024',
      intro: 'Avec notre stratégie définie et le design system en place, nous avons construit et lancé les apps spécialisées :',
    },
    apps: {
      classe: {
        title: 'SQOOL Classe',
        subtitle: 'Supervision de classe',
        desc: 'Les enseignants voient chaque écran d\'élève en temps réel. Ils peuvent verrouiller les appareils, pousser du contenu, et gérer l\'attention sans quitter leur bureau. Nous avons appris que les enseignants ne veulent pas de surveillance - ils veulent se sentir en contrôle de leur classe.',
        research: 'Insight recherche : Les enseignants craignaient de perdre le contrôle quand les élèves avaient des appareils. Notre vue en grille avec statuts colorés leur a donné confiance.',
      },
      partage: {
        title: 'SQOOL Partage',
        subtitle: 'Partage de fichiers',
        desc: 'Glisser-déposer pour partager des fichiers avec une classe. Plus de clés USB, plus de pièces jointes par email. Nous l\'avons conçu pour être aussi simple qu\'AirDrop, mais pour les salles de classe.',
        research: 'Insight recherche : La plus grande friction quotidienne était de distribuer un PDF à 27 élèves. Nous en avons fait un geste.',
      },
      applications: {
        title: 'SQOOL Applications',
        subtitle: 'Découverte d\'apps',
        desc: 'Un catalogue d\'apps éducatives. Les enseignants parcourent, les admins IT déploient via le MDM. Nous avons pivoté de construire un "app store" vers être un front-end de découverte.',
        research: 'Insight recherche : Les enseignants ne voulaient pas gérer les installations. Ils voulaient trouver de bons outils.',
      },
      mdm: {
        title: 'SQOOL MDM',
        subtitle: 'Gestion d\'appareils',
        desc: 'Les administrateurs IT gèrent 500 000 appareils : politiques de sécurité, déploiements d\'apps, dépannage à distance. Nous avons séparé cette complexité des outils pour enseignants.',
      },
      protect: {
        title: 'SQOOL Protect',
        subtitle: 'Contrôle parental',
        desc: 'Les parents définissent des limites de temps d\'écran pour les soirs et week-ends. Appairage par QR code, configuration en 3 minutes. Livré en 3 mois sur des milliers d\'appareils.',
        research: 'Insight recherche : Les parents voulaient de la simplicité, pas des fonctionnalités. Nous avons conçu le panneau de contrôle minimal viable.',
      },
      extend: {
        title: 'SQOOL Extend',
        subtitle: 'Bureaux virtuels',
        desc: 'Des logiciels lourds sur des appareils légers. Les élèves accèdent à des bureaux Windows virtuels avec des outils professionnels installés. Nous avons conçu des séquences de chargement qui réduisent le temps d\'attente perçu.',
        research: 'Insight recherche : Les enseignants ne demandaient pas de VMs. Ils demandaient pourquoi Photoshop était lent. Nous avons résolu le vrai problème.',
      },
    },
    research: {
      title: 'Ce que nous avons appris des utilisateurs',
      subtitle: 'Patterns qui ont orienté nos décisions design',
      insights: [
        {
          title: 'Les enseignants ne collaborent pas en temps réel',
          desc: 'Nous avons testé Canvas, un tableau blanc collaboratif (comme Figma). Les enseignants l\'ont rejeté. Ils veulent préparer du contenu, le distribuer, collecter les travaux, puis noter. Séquentiel, pas simultané.',
        },
        {
          title: 'La simplicité bat les fonctionnalités',
          desc: 'Chaque fois que nous ajoutions des options, l\'adoption baissait. Les apps qui marchaient avaient moins d\'écrans et des chemins plus clairs.',
        },
        {
          title: 'Designer pour le WiFi instable',
          desc: 'Les réseaux scolaires sont peu fiables. Nous avons intégré une dégradation gracieuse partout - les apps montrent un statut clair hors ligne, pas des erreurs cryptiques.',
        },
        {
          title: 'La cohérence construit la confiance',
          desc: 'Quand les enseignants passent d\'une app à l\'autre, ils ne veulent pas réapprendre les interfaces. Notre design system a payé en confiance utilisateur.',
        },
      ],
    },
    impact: {
      title: 'Impact',
      intro: 'En six ans, nous avons transformé un fabricant de matériel en plateforme SaaS moderne. L\'approche design a permis de passer à l\'échelle sur plusieurs produits tout en maintenant la cohérence.',
      users: '500 000+',
      usersDesc: 'Élèves & enseignants servis quotidiennement',
      schools: '465',
      schoolsDesc: 'Lycées équipés en Ile-de-France',
      apps: '7+',
      appsDesc: 'Applications web livrées',
      team: '5',
      teamDesc: 'Designers recrutés & managés',
    },
    learnings: {
      title: 'Apprentissages clés',
      items: [
        {
          title: 'Les prototypes peuvent valoir plus que les produits',
          desc: 'Connect n\'a jamais été livré, mais c\'était notre projet le plus important. Il a prouvé que notre technologie fonctionnait et nous a montré pourquoi notre stratégie était fausse.',
        },
        {
          title: 'Séparer le produit a été le plus grand gain UX',
          desc: 'La décision de construire des apps ciblées au lieu d\'une plateforme a réduit la complexité plus qu\'aucune refonte d\'interface n\'aurait pu le faire.',
        },
        {
          title: 'Le design system, c\'est la gouvernance, pas les composants',
          desc: 'Le difficile n\'est pas de construire une bibliothèque de boutons. C\'est d\'amener 30+ développeurs sur 5 équipes à l\'utiliser de manière cohérente.',
        },
      ],
    },
    relatedCases: {
      title: 'Case studies détaillés',
      items: [
        { title: 'Hi-SQOOL : Un projet design fondateur', id: 'hisqool' },
        { title: 'Connect : Le prototype de vision', id: 'connect' },
        { title: 'SQOOL Classe : Contrôle de classe', id: 'classe' },
        { title: 'SQOOL Partage : Partage de fichiers', id: 'partage' },
        { title: 'Système de marque SQOOL', id: 'brand' },
        { title: 'Design System SQOOL', id: 'design-system' },
      ],
    },
    captions: {
      hero: 'Suite SQOOL',
      heroDesc: 'L\'écosystème complet d\'applications web',
      distribution: 'Distribution de rentrée',
      distributionDesc: 'La Région Île-de-France distribue les appareils aux élèves',
      tablette: 'Tablette Y10',
      tabletteDesc: '1ère tablette conçue par UNOWHY pour le programme Lycée Numérique',
      marquage: 'Fonctionnalités appareils',
      marquageDesc: 'Marquage des fonctionnalités sur les tablettes',
      legacyLauncher: 'Launcher élève legacy',
      legacyLauncherDesc: 'Interface tablette pour l\'élève, qui verrouille l\'accès aux apps SQOOL',
      legacyManager: 'Manager enseignant legacy',
      legacyManagerDesc: 'Application C++ desktop pour la gestion de classe',
      legacyMdm: 'MDM legacy',
      legacyMdmDesc: 'Système de gestion d\'appareils on-premise',
      context: 'Lycée Numérique',
      contextDesc: '500 000 appareils déployés en 2019',
      hisqool: 'Hi-SQOOL',
      hisqoolDesc: 'Plateforme élève et nouvelle identité',
      connect: 'Connect',
      connectDesc: 'Une interface expérimentale destinée à remplacer un launcher legacy. Connect explorait la personnalisation, le design de dashboard et l\'accès aux outils de classe.',
      bulle: 'La Bulle',
      bulleDesc: 'Un module flottant animé sur tablettes Android, toujours accessible. Conçu pour afficher des actions contextuelles : capture & partage, raccourcis d\'aide, actions rapides et notifications.',
      brand: 'Système de marque',
      brandDesc: 'Identité visuelle pour la suite d\'apps',
      designSystem: 'Design System',
      designSystemDesc: 'Composants et documentation sur ZeroHeight',
      classe: 'SQOOL Classe',
      classeDesc: 'Supervision de classe en temps réel',
      partage: 'SQOOL Partage',
      partageDesc: 'Partage de fichiers en un geste',
      applications: 'SQOOL Applications',
      applicationsDesc: 'Découverte d\'apps éducatives',
      mdm: 'SQOOL MDM',
      mdmDesc: 'Gestion de flotte d\'appareils',
      protect: 'SQOOL Protect',
      protectDesc: 'Contrôle parental avec appairage QR',
      extend: 'SQOOL Extend',
      extendDesc: 'Bureaux virtuels pour logiciels lourds',
      timeline: 'Timeline',
      timelineDesc: '6 ans d\'évolution produit',
      impact: 'Impact',
      impactDesc: 'Résultats et aboutissements',
      // Brand System Visuals
      brandVisual01: 'Couleurs primaires',
      brandVisual01Desc: 'Blue Dodger, Text Primary et Marine - palette de base',
      brandVisual02: 'Couleurs par app',
      brandVisual02Desc: 'Couleurs signature pour Classe, Applications, MDM et Partage',
      brandVisual03: 'Bibliothèque de dégradés',
      brandVisual03Desc: 'Dégradés bleu, orange et violet avec valeurs hex',
      brandVisual04: 'Logo SQOOL Partage',
      brandVisual04Desc: 'Variations du logo sur fonds blanc, sombre et bleu',
      brandVisual05: 'Icône Paramètres',
      brandVisual05Desc: 'Icône engrenage sur fonds clair, sombre et dégradé',
      brandVisual06: 'Page Communauté',
      brandVisual06Desc: 'Design de la landing page Communauté SQOOL',
      brandVisual07: 'SQOOL Extend',
      brandVisual07Desc: 'Branding de l\'extension bureau cloud',
      brandVisual08: 'SQOOL Protect',
      brandVisual08Desc: 'Branding de l\'app sécurité et protection',
      brandVisual09: 'Catalogue Applications',
      brandVisual09Desc: 'Interface web de navigation des apps éducatives',
      brandVisual10: 'Launcher Android',
      brandVisual10Desc: 'Écran d\'accueil tablette avec dock d\'icônes',
      brandVisual11: 'Réinitialisation mot de passe',
      brandVisual11Desc: 'Design du composant formulaire d\'authentification',
      brandVisual12: 'Hub Apps',
      brandVisual12Desc: 'Landing page avec toutes les cartes d\'apps SQOOL',
      brandVisual13: 'Variations des logos',
      brandVisual13Desc: 'Logos des apps sur fonds sombre, clair et dégradé',
      brandVisual14: 'Launcher Desktop',
      brandVisual14Desc: 'Grille complète d\'apps sur tablette avec écosystème',
      brandVisual15: 'App Switcher',
      brandVisual15Desc: 'Menu dropdown de navigation rapide',
    },
  },
};

// Navigation sections
const sections = [
  { id: 'hero', labelKey: 'intro' },
  { id: 'context', labelKey: 'context' },
  { id: 'phase1', labelKey: 'phase1' },
  { id: 'phase2', labelKey: 'phase2' },
  { id: 'phase3', labelKey: 'phase3' },
  { id: 'apps', labelKey: 'apps' },
  { id: 'impact', labelKey: 'impact' },
];

// Media items for lightbox
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/sqool/hero_ecosystem_sqool.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp', captionKey: 'distribution', type: 'image' },
  { src: '/images/sqool/image-unowhy-shootingphoto-tablette.webp', captionKey: 'tablette', type: 'image' },
  { src: '/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp', captionKey: 'marquage', type: 'image' },
  { src: '/images/sqool/sqool_legacy_launcher_eleve.webp', captionKey: 'legacyLauncher', type: 'image' },
  { src: '/images/sqool/sqool_legacy_manager_teacher.webp', captionKey: 'legacyManager', type: 'image' },
  { src: '/images/sqool/sqool_legacy_mdm.webp', captionKey: 'legacyMdm', type: 'image' },
  { src: '/images/sqool/hi sqool/004 003-hp-scroll-2x.webp', captionKey: 'hisqool', type: 'image' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', captionKey: 'connect', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', captionKey: 'bulle', type: 'video' },
  { src: '/images/sqool/sqool_brand.webp', captionKey: 'brand', type: 'image' },
  { src: '/images/sqool/thumbnail_suite_sqool_blue.webp', captionKey: 'suiteSqool', type: 'image' },
  // Brand System Visuals
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_01_2x.webp', captionKey: 'brandVisual01', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_02_2x.webp', captionKey: 'brandVisual02', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp', captionKey: 'brandVisual03', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp', captionKey: 'brandVisual04', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', captionKey: 'brandVisual05', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_06_2x.webp', captionKey: 'brandVisual06', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp', captionKey: 'brandVisual07', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp', captionKey: 'brandVisual08', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_09_2x.webp', captionKey: 'brandVisual09', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_10_2x.webp', captionKey: 'brandVisual10', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_11_2x.webp', captionKey: 'brandVisual11', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp', captionKey: 'brandVisual12', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_13_2x.webp', captionKey: 'brandVisual13', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp', captionKey: 'brandVisual14', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuel_systeme_de_marque_15.webp', captionKey: 'brandVisual15', type: 'image' },
  { src: '/images/sqool/sqool_design_system.webp', captionKey: 'designSystem', type: 'image' },
  { src: '/images/sqool/sqool_classe.webp', captionKey: 'classe', type: 'image' },
  { src: '/images/sqool/sqool_partage.webp', captionKey: 'partage', type: 'image' },
  { src: '/images/sqool/sqool_applications.webp', captionKey: 'applications', type: 'image' },
  { src: '/images/sqool/sqool_mdm.webp', captionKey: 'mdm', type: 'image' },
  { src: '/images/sqool/sqool_protect.webp', captionKey: 'protect', type: 'image' },
  { src: '/images/sqool/sqool_extend.webp', captionKey: 'extend', type: 'image' },
];

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|mov)$/i);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group cursor-pointer break-inside-avoid mb-8"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow"
      >
        {isVideo ? (
          <div className="relative">
            <video src={item.src} className="w-full h-auto" muted loop playsInline preload="metadata" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto" />
        )}
      </motion.div>
      <figcaption className="mt-3 text-sm text-gray-400">
        <span className="font-medium text-gray-300">{item.caption}</span>
        {item.captionDesc && <span className="text-gray-500"> - {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// Image with fallback placeholder
const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  caption?: string;
  onClick?: () => void;
  className?: string;
}> = ({ src, alt, caption, onClick, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full aspect-video rounded-2xl bg-gray-800 flex items-center justify-center cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="text-center p-8">
          <div className="text-gray-600 text-sm">[Image: {caption || alt}]</div>
        </div>
      </div>
    );
  }

  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`w-full h-auto rounded-2xl cursor-pointer ${className}`}
      onClick={onClick}
      onError={() => setHasError(true)}
    />
  );
};

export const SqoolPage: React.FC<SqoolPageProps> = ({
  onClose,
  systemTheme,
  viewMode,
  onViewModeChange,
  lang = 'en'
}) => {
  const t = SQOOL_TRANSLATIONS[lang];
  // Load gallery items directly in the component
  const galleryItems = getSqoolGalleryItems(lang);

  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [activeSection, setActiveSection] = useState('hero');
  const [showNav, setShowNav] = useState(false);
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>('executive');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandCarouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [canScrollBrandLeft, setCanScrollBrandLeft] = useState(false);
  const [canScrollBrandRight, setCanScrollBrandRight] = useState(true);

  // Section labels for nav
  const sectionLabels = sections.map(s => ({
    id: s.id,
    label: t.nav[s.labelKey as keyof typeof t.nav]
  }));

  // Scroll tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowNav(container.scrollTop > 300);

      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      })).filter(s => s.element);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.getBoundingClientRect().top <= 200) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox functions with video start time support
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Keyboard navigation for escape only when lightbox closed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, onClose]);

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

  // Brand carousel scroll functions
  const checkBrandScroll = useCallback(() => {
    if (brandCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = brandCarouselRef.current;
      setCanScrollBrandLeft(scrollLeft > 0);
      setCanScrollBrandRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scrollBrandCarousel = useCallback((direction: 'left' | 'right') => {
    if (brandCarouselRef.current) {
      const scrollAmount = 400;
      brandCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  // Brand visuals data
  const brandVisuals = [
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_01_2x.webp', key: 'brandVisual01', wide: true },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_02_2x.webp', key: 'brandVisual02' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp', key: 'brandVisual03' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp', key: 'brandVisual04' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', key: 'brandVisual05' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_06_2x.webp', key: 'brandVisual06', wide: true },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp', key: 'brandVisual07' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp', key: 'brandVisual08' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_09_2x.webp', key: 'brandVisual09' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_10_2x.webp', key: 'brandVisual10' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_11_2x.webp', key: 'brandVisual11' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp', key: 'brandVisual12' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_13_2x.webp', key: 'brandVisual13', wide: true },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp', key: 'brandVisual14' },
    { src: '/images/sqool/systeme de marque/visuel_systeme_de_marque_15.webp', key: 'brandVisual15' },
  ];

  const isDark = systemTheme === 'dark';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery' ? 'bg-black' : (isDark ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Sticky Mini-Nav TOC - Hidden in gallery mode and executive mode */}
      <AnimatePresence>
        {showNav && viewMode !== 'gallery' && caseStudyMode !== 'executive' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-30 backdrop-blur-xl ${
              isDark
                ? 'bg-[#0a0a0a]/80'
                : 'bg-white/80'
            }`}
          >
            <div className="w-full px-6">
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full h-12 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {sectionLabels.find(s => s.id === activeSection)?.label || 'Top'}
                  </span>
                </div>
                <motion.div animate={{ rotate: isMobileNavExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
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
                    <div className={`pb-3 space-y-1 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      {sectionLabels.map((section) => {
                        const isActive = activeSection === section.id;
                        const currentIndex = sectionLabels.findIndex(s => s.id === activeSection);
                        const sectionIndex = sectionLabels.findIndex(s => s.id === section.id);
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
                                ? isDark ? 'bg-blue-600/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                                : isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-blue-600' : isPast ? (isDark ? 'bg-gray-500' : 'bg-gray-400') : (isDark ? 'bg-gray-700' : 'bg-gray-300')
                            }`} />
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
      <header className={`sticky top-0 z-40 backdrop-blur-xl ${
        viewMode === 'gallery'
          ? 'bg-black/80'
          : (isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80')
      }`}>
        <div className="w-full px-6 h-16 flex items-center gap-4">
          {/* Left - Title - Same style as Homepage nav */}
          <div className="flex-shrink-0">
            <h1 className={`font-semibold text-lg tracking-[-0.02em] ${
              viewMode === 'gallery' ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')
            }`}>
              SQOOL
            </h1>
          </div>

          {/* Center - Toggle Switch with animated pill (compact on mobile) */}
          <div className="flex-1 flex justify-center">
            <div className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
              viewMode === 'gallery' ? 'bg-white/10' : (isDark ? 'bg-white/10' : 'bg-gray-100')
            }`}>
              {/* Executive button (En bref) */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'executive' && (
                  <motion.div
                    layoutId="sqool-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'executive'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
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
                    layoutId="sqool-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
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
                    layoutId="sqool-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery' ? 'text-white' : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
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
                  : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Content - Switch between Gallery, Executive, and Full Case Study */}
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
          /* Executive View (En bref) */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SqoolExecutive
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
            <section id="hero" className="mb-24 md:mb-32">
              {/* Logo */}
              <div className="my-12">
                <img loading="lazy"
                  src={isDark ? '/images/sqool/logo-sqool-dark.svg' : '/images/sqool/logo-sqool.svg'}
                  alt="SQOOL"
                  className="h-6 w-auto"
                />
              </div>

              <div className="grid md:grid-cols-5 gap-10">
                {/* Left Column - Title and Description */}
                <div className="md:col-span-3">
                  {/* Meta tags inline like Toolkit */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.hero.role}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.hero.scope}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.hero.period}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.hero.title}
                  </h1>

                  {/* Subtitle */}
                  <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.hero.subtitle}
                  </h2>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.hero.description}
                  </p>
                </div>

                {/* Right Column - Testimonial */}
                <div className="md:col-span-2">
                  {/* Testimonial Card */}
                  <div
                    className={`p-6 rounded-2xl border ${
                      isDark
                        ? 'bg-cyan-900/20 border-cyan-500/20'
                        : 'bg-cyan-50 border-cyan-200'
                    }`}
                  >
                    <Quote
                      size={24}
                      className={`mb-4 ${
                        isDark ? 'text-cyan-400' : 'text-cyan-600'
                      }`}
                    />
                    <p
                      className={`text-sm italic leading-relaxed mb-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {t.testimonial.quote}
                    </p>
                    <div className="flex items-center space-x-3">
                      <img loading="lazy"
                        src="/images/charlotte-rifflet.webp"
                        alt={t.testimonial.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {t.testimonial.author}
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {t.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Project Meta Card - Synthesis */}
            <div
              className={`p-6 rounded-3xl border mb-12 ${
                isDark
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-blue-600/20' : 'bg-blue-50'
                    }`}
                  >
                    <Layers
                      size={20}
                      className={isDark ? 'text-blue-400' : 'text-blue-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Type
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-purple-500/20' : 'bg-purple-50'
                    }`}
                  >
                    <Briefcase
                      size={20}
                      className={isDark ? 'text-purple-400' : 'text-purple-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Scope
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.scope}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-green-500/20' : 'bg-green-50'
                    }`}
                  >
                    <Calendar
                      size={20}
                      className={isDark ? 'text-green-400' : 'text-green-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Period
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'
                    }`}
                  >
                    <Users
                      size={20}
                      className={isDark ? 'text-cyan-400' : 'text-cyan-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Company
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <figure className="mb-24 md:mb-32">
              <div
                onClick={() => openLightbox('/images/sqool/hero_ecosystem_sqool.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img loading="lazy"
                  src="/images/sqool/hero_ecosystem_sqool.webp"
                  alt={t.captions.hero}
                  className="w-full h-auto"
                />
              </div>
            </figure>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Context Section */}
            <section id="context" className="mb-20">
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.context.title}
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.context.subtitle}
              </p>

              <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.context.p1}
              </p>

              {/* Context images - Deployment photos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <figure>
                  <ImageWithFallback
                    src="/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp"
                    alt={t.captions.distribution}
                    caption={t.captions.distribution}
                    onClick={() => openLightbox('/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp')}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.distribution}
                  </figcaption>
                </figure>
                <figure>
                  <ImageWithFallback
                    src="/images/sqool/image-unowhy-shootingphoto-tablette.webp"
                    alt={t.captions.tablette}
                    caption={t.captions.tablette}
                    onClick={() => openLightbox('/images/sqool/image-unowhy-shootingphoto-tablette.webp')}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.tablette}
                  </figcaption>
                </figure>
                <figure>
                  <ImageWithFallback
                    src="/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp"
                    alt={t.captions.marquage}
                    caption={t.captions.marquage}
                    onClick={() => openLightbox('/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp')}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.marquage}
                  </figcaption>
                </figure>
              </div>

              <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.context.p2}
              </p>

              {/* Legacy Suite Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <figure className="group">
                  <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}>
                    <ImageWithFallback
                      src="/images/sqool/sqool_legacy_launcher_eleve.webp"
                      alt={t.captions.legacyLauncher}
                      caption={t.captions.legacyLauncher}
                      onClick={() => openLightbox('/images/sqool/sqool_legacy_launcher_eleve.webp')}
                      className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-sm font-medium block">{t.captions.legacyLauncher}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.legacyLauncherDesc}</span>
                  </figcaption>
                </figure>
                <figure className="group">
                  <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}>
                    <ImageWithFallback
                      src="/images/sqool/sqool_legacy_manager_teacher.webp"
                      alt={t.captions.legacyManager}
                      caption={t.captions.legacyManager}
                      onClick={() => openLightbox('/images/sqool/sqool_legacy_manager_teacher.webp')}
                      className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-sm font-medium block">{t.captions.legacyManager}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.legacyManagerDesc}</span>
                  </figcaption>
                </figure>
                <figure className="group">
                  <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}>
                    <ImageWithFallback
                      src="/images/sqool/sqool_legacy_mdm.webp"
                      alt={t.captions.legacyMdm}
                      caption={t.captions.legacyMdm}
                      onClick={() => openLightbox('/images/sqool/sqool_legacy_mdm.webp')}
                      className="aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-sm font-medium block">{t.captions.legacyMdm}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.legacyMdmDesc}</span>
                  </figcaption>
                </figure>
              </div>

              <div className={`p-6 rounded-2xl mb-8 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  {t.context.challenge}
                </h3>
                <p className={`text-sm ${isDark ? 'text-blue-300/80' : 'text-blue-600'}`}>
                  {t.context.challengeDesc}
                </p>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.context.myRole}
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.context.roleDesc}
              </p>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Timeline Section */}
            <section className="mb-16">
              <h2 className={`text-2xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'fr' ? 'Parcours de transformation' : 'Transformation Journey'}
              </h2>
              <p className={`text-lg mb-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'fr' ? '6 ans d\'évolution produit et design' : '6 years of product and design evolution'}
              </p>
              <SqoolTimeline
                lang={lang}
                isDark={isDark}
                onImageClick={openLightbox}
              />
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Phase 1 */}
            <section id="phase1" className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase1.title}
                </h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                  {t.phase1.period}
                </span>
              </div>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.phase1.intro}
              </p>

              {/* Hi-SQOOL */}
              <div className="mb-12">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase1.hisqool.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.hisqool.p1}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.hisqool.p2}
                </p>

                <figure className="mb-6">
                  <ImageWithFallback
                    src="/images/sqool/hi sqool/004 003-hp-scroll-2x.webp"
                    alt={t.captions.hisqool}
                    caption={t.captions.hisqool}
                    onClick={() => openLightbox('/images/sqool/hi sqool/004 003-hp-scroll-2x.webp')}
                  />
                  <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.hisqool} - {t.captions.hisqoolDesc}
                  </figcaption>
                </figure>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-100'}`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {t.phase1.hisqool.outcome}
                  </p>
                </div>
              </div>

              {/* Connect */}
              <div className="my-12">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase1.connect.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.connect.p1}
                </p>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.connect.p2}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.connect.p3}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6 md:items-stretch">
                  <figure className="group flex flex-col">
                    <div
                      className={`relative overflow-hidden rounded-xl cursor-pointer flex-1 ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}
                      onClick={() => openLightbox('/videos/connect/connect-dashboard-prototype-compressed.mp4')}
                    >
                      <video
                        src="/videos/connect/connect-dashboard-prototype-compressed.mp4"
                        className="w-full h-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        ref={(el) => { if (el) el.playbackRate = 1.25; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={20} className="text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                    <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-sm font-medium block">{t.captions.connect}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.connectDesc}</span>
                    </figcaption>
                  </figure>
                  <figure className="group flex flex-col">
                    <div
                      className="relative overflow-hidden rounded-xl cursor-pointer flex-1 bg-black flex items-center justify-center"
                      onClick={() => openLightbox('/videos/connect/Video-demo-bulle-interactions-compressed.mp4')}
                    >
                      <video
                        src="/videos/connect/Video-demo-bulle-interactions-compressed.mp4"
                        className="h-full w-auto max-w-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={20} className="text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                    <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-sm font-medium block">{t.captions.bulle}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.bulleDesc}</span>
                    </figcaption>
                  </figure>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-100'}`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    {t.phase1.connect.outcome}
                  </p>
                </div>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Phase 2 */}
            <section id="phase2" className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.title}
                </h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                  {t.phase2.period}
                </span>
              </div>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.phase2.intro}
              </p>

              {/* Manifesto */}
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.manifesto.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.manifesto.p1}
                </p>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.manifesto.p2}
                </p>
              </div>

              {/* Brand */}
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.brand.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.brand.p1}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.brand.p2}
                </p>

                {/* Suite SQOOL Blue Thumbnail */}
                <div
                  className="mb-6 rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
                  onClick={() => openLightbox('/images/sqool/thumbnail_suite_sqool_blue.webp')}
                >
                  <img loading="lazy"
                    src="/images/sqool/thumbnail_suite_sqool_blue.webp"
                    alt="Suite SQOOL"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Brand System Horizontal Carousel - Apple Style */}
                <div className="relative -mx-4 md:-mx-6">
                  {/* Gradient overlays to show more content */}
                  <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r ${isDark ? 'from-[#0a0a0a]' : 'from-white'} to-transparent`} />
                  <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l ${isDark ? 'from-[#0a0a0a]' : 'from-white'} to-transparent`} />

                  {/* Navigation arrows */}
                  <button
                    onClick={() => scrollBrandCarousel('left')}
                    className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollBrandLeft
                        ? `${isDark ? 'bg-white/90 hover:bg-white text-gray-900' : 'bg-gray-900/90 hover:bg-gray-900 text-white'} shadow-lg cursor-pointer`
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => scrollBrandCarousel('right')}
                    className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      canScrollBrandRight
                        ? `${isDark ? 'bg-white/90 hover:bg-white text-gray-900' : 'bg-gray-900/90 hover:bg-gray-900 text-white'} shadow-lg cursor-pointer`
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Scrollable container */}
                  <div
                    ref={brandCarouselRef}
                    onScroll={checkBrandScroll}
                    className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-6 py-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {brandVisuals.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className={`relative overflow-hidden rounded-2xl cursor-pointer group flex-shrink-0 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                        style={{
                          width: item.wide ? '400px' : '280px',
                          height: '220px'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => openLightbox(item.src)}
                      >
                        <img loading="lazy"
                          src={item.src}
                          alt={t.captions[item.key as keyof typeof t.captions]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white font-medium text-sm">{t.captions[item.key as keyof typeof t.captions]}</p>
                          <p className="text-white/70 text-xs">{t.captions[`${item.key}Desc` as keyof typeof t.captions]}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design System */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.ds.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.ds.p1}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.ds.p2}
                </p>

                <figure>
                  <ImageWithFallback
                    src="/images/sqool/sqool_design_system.webp"
                    alt={t.captions.designSystem}
                    caption={t.captions.designSystem}
                    onClick={() => openLightbox('/images/sqool/sqool_design_system.webp')}
                  />
                  <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.designSystem} - {t.captions.designSystemDesc}
                  </figcaption>
                </figure>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Phase 3 - Apps */}
            <section id="phase3" className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase3.title}
                </h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                  {t.phase3.period}
                </span>
              </div>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.phase3.intro}
              </p>
            </section>

            {/* Apps Grid */}
            <section id="apps" className="mb-20">
              <div className="space-y-12">
                {/* SQOOL Classe */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.apps.classe.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.apps.classe.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.apps.classe.desc}
                  </p>
                  <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>
                    {t.apps.classe.research}
                  </div>
                  <figure className="mt-4">
                    <ImageWithFallback
                      src="/images/sqool/sqool_classe.webp"
                      alt={t.captions.classe}
                      caption={t.captions.classe}
                      onClick={() => openLightbox('/images/sqool/sqool_classe.webp')}
                    />
                  </figure>
                </div>

                {/* SQOOL Partage */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.apps.partage.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.apps.partage.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.apps.partage.desc}
                  </p>
                  <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>
                    {t.apps.partage.research}
                  </div>
                  <figure className="mt-4">
                    <ImageWithFallback
                      src="/images/sqool/sqool_partage.webp"
                      alt={t.captions.partage}
                      caption={t.captions.partage}
                      onClick={() => openLightbox('/images/sqool/sqool_partage.webp')}
                    />
                  </figure>
                </div>

                {/* Grid for smaller apps */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* SQOOL Applications */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.applications.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.applications.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.applications.desc}
                    </p>
                  </div>

                  {/* SQOOL MDM */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.mdm.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.mdm.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.mdm.desc}
                    </p>
                  </div>

                  {/* SQOOL Protect */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.protect.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.protect.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.protect.desc}
                    </p>
                  </div>

                  {/* SQOOL Extend */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.extend.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.extend.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.extend.desc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* User Research Insights */}
            <section className="mb-16">
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.research.title}
              </h2>
              <p className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.research.subtitle}
              </p>

              <div className="space-y-6">
                {t.research.insights.map((insight, index) => (
                  <div key={index} className={`p-5 rounded-xl border-l-4 ${isDark ? 'bg-white/5 border-blue-500' : 'bg-gray-50 border-blue-500'}`}>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {insight.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {insight.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Impact - Toolkit style */}
            <section id="impact" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.title}
              </h1>
              <p
                className={`text-base leading-relaxed mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.impact.intro}
              </p>

              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.users}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.usersDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.schools}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.schoolsDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.apps}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.appsDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.team}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.teamDesc}
                  </p>
                </div>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Key Learnings */}
            <section className="mb-16">
              <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.learnings.title}
              </h2>

              <div className="space-y-6">
                {t.learnings.items.map((learning, index) => (
                  <div key={index}>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {index + 1}. {learning.title}
                    </h3>
                    <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {learning.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <div className={`text-center py-12 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {t.contactVictor}
              </p>
            </div>
          </main>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal - Using EnhancedLightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="sqool"
        updateUrl={true}
      />
    </motion.div>
  );
};

export default SqoolPage;
