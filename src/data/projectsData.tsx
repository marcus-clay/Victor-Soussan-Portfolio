import React from 'react';
import {
  Cpu,
  Users,
  FileText,
  Stack as Layers,
  Briefcase,
  DeviceMobile as Smartphone,
  ShieldCheck,
  Stethoscope,
} from '@phosphor-icons/react/ssr';
import type { Language } from './translations';

export type ProjectFormat = 'case-study' | 'short'
export type ProjectCategory = 'product-design' | 'ai-experiment' | 'prototype' | 'concept'

export interface Project {
  id: string;
  title: string;
  role: string;
  summary: string;
  format: ProjectFormat;
  category: ProjectCategory;
  missions: string[];
  system: {
    title: string;
    desc: string;
  };
  deliverables: string[];
  icon: React.ReactNode;
  color: 'blue' | 'gray' | 'indigo' | 'purple';
  coverImage: string;
  hoverImage?: string;
  externalLink?: string;
  testimonialId?: string;
  status?: 'shipped' | 'concept' | 'experiment';
  cardBg?: string; // Custom background color for card image area
  navTitle?: string; // Short name shown in the site header (falls back to title)
  // Short format fields
  media?: string[];          // Image/video URLs for short projects
  shortDescription?: string; // Executive description for short format
  videoUrl?: string;         // Embedded video URL
  body?: string;             // Extended description (rendered after media)
}

export const getProjects = (lang: Language): Project[] => {
  const isEn = lang === 'en';
  return [
    {
      id: "riskos",
      format: 'case-study',
      category: 'ai-experiment',
      title: "RiskOS",
      role: "Product Design",
      summary: isEn
        ? "AI-augmented fraud detection. A functional prototype exploring human/AI collaboration under time pressure."
        : "Détection de fraude augmentée par IA agentique. Un prototype fonctionnel explorant la collaboration humain/IA sous pression temporelle.",
      missions: isEn ? [
        "Designed the full interaction model for analyst/AI collaboration",
        "Built a functional React prototype with streaming AI analysis",
        "Tested design hypotheses on conditional action gating",
        "Explored ellipses as proof-of-impact patterns"
      ] : [
        "Conception du modèle d'interaction analyste/IA complet",
        "Construction d'un prototype React fonctionnel avec analyse IA en streaming",
        "Test d'hypothèses de design sur le conditionnement des actions",
        "Exploration des ellipses comme preuve d'impact"
      ],
      system: {
        title: isEn ? "Agentic UX Patterns" : "Patterns UX agentiques",
        desc: isEn
          ? "Designed interaction patterns where the AI prepares the analyst's cognitive ground without deciding in their place: streaming reasoning, conditional action gating, and ecosystem-level feedback."
          : "Conception de patterns d'interaction où l'IA prépare le terrain cognitif de l'analyste sans décider à sa place : raisonnement en streaming, conditionnement des actions, et feedback au niveau de l'écosystème."
      },
      deliverables: isEn
        ? ["Functional Prototype", "6 Interaction Flows", "Before/After Comparison", "Data Flow Diagram", "Session Metrics"]
        : ["Prototype fonctionnel", "6 flux d'interaction", "Comparatif avant/après", "Schéma de flux de données", "Métriques de session"],
      icon: <ShieldCheck size={24} />,
      color: "blue",
      coverImage: "/images/riskos/02-case-detail.webp",
      externalLink: "https://riskos.vercel.app",
      status: "experiment",
      cardBg: "#111113"
    },
    {
      id: "toolkit",
      format: 'case-study',
      category: 'product-design',
      title: "Toolkit",
      role: isEn ? "Founding Designer" : "Premier Designer",
      summary: isEn
        ? "0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP."
        : "Création d'un SaaS B2B pour le BTP, de zéro (0 to 1). J'ai traduit la vision des fondateurs en un produit commercialisable.",
      missions: isEn ? [
        "Defined the entire product architecture from scratch",
        "Worked directly with Founders (CEO/CTO) in Lean mode",
        "Designed Investor Pitch Decks & Marketing Assets",
        "Conducted field research with construction site managers"
      ] : [
        "Architecture de l'information : structurer une app complexe pour le terrain",
        "Prototypage rapide pour valider les hypothèses avec les conducteurs de travaux",
        "Création de l'identité visuelle et des supports investisseurs (Pitch Deck)",
        "Livraison des maquettes prêtes au développement (Dev Handoff)"
      ],
      system: {
        title: isEn ? "Tailwind-ready UI Kit" : "UI Kit optimisé Tailwind",
        desc: isEn ? "Designed a lightweight, mobile-first system optimized for messy field conditions (high contrast, large touch targets) ready for rapid Tailwind integration." : "J'ai conçu un système simple et robuste (Mobile First), avec de gros contrastes pour l'usage sur chantier, directement aligné sur les classes utilitaires Tailwind."
      },
      deliverables: isEn ? [
        "SaaS Platform (Web & Mobile)",
        "Planning & Gantt Interaction Model",
        "Admin & Billing Panels",
        "Brand Identity & Logo"
      ] : [
        "Plateforme SaaS complète (Web & Mobile)",
        "Module de Gantt/Planning interactif",
        "Back-office Admin & Facturation",
        "Identité de marque & Logo"
      ],
      icon: <Cpu size={24} />,
      color: "indigo",
      coverImage: "/images/thumbnail-toolkit.webp",
      externalLink: "https://victor-soussan.notion.site/ebd/2b7a519b0dea80d9b40cc730ce4cfc4b",
      testimonialId: "pierre-marie-nigay"
    },
    {
      id: "dailymotion",
      format: 'case-study',
      category: 'product-design',
      title: "Dailymotion Partner",
      role: isEn ? "Senior Product Designer" : "Senior Product Designer",
      summary: isEn ? "Redesigning the professional video management suite for tier-1 media partners (CBS, Bein Sports)." : "Refonte du back-office vidéo utilisé par les grands médias (CBS, Bein Sports). Un outil métier complexe à fort volume de données.",
      missions: isEn ? [
        "Led UX for high-volume upload & livestreaming dashboards",
        "Mentored junior designers on interaction specs",
        "Collaborated across Paris, NYC & Marseille teams",
        "Initiated the internal 'Pattern Library' for consistency"
      ] : [
        "Design des features critiques : Upload de masse, Livestreaming",
        "Simplification de workflows complexes pour les éditeurs vidéo",
        "Collaboration internationale (Paris, NYC, Marseille)",
        "Mentorat des designers juniors sur l'UI et les specs"
      ],
      system: {
        title: isEn ? "Storybook UI Kit" : "Pattern Library (Sketch/Storybook)",
        desc: isEn ? "Created the first atomic component library in Sketch (pre-Figma) and collaborated with frontend to implement it in Storybook for global scalability." : "Création de la première librairie de composants atomiques (à l'époque sous Sketch) pour aligner le design et le code (Storybook)."
      },
      deliverables: isEn ? [
        "Live Dashboard & Clipping Tool",
        "Batch Upload & Metadata Editor",
        "Motion Guidelines",
        "Partner Mobile App (iOS/Android)"
      ] : [
        "Dashboard Live & Outil de Clipping",
        "Éditeur de métadonnées en masse",
        "App Mobile Partenaire (iOS/Android)",
        "Guidelines d'animation"
      ],
      icon: <Users size={24} />,
      color: "gray",
      coverImage: "/images/thumbnail-dailymotion-web-platform.webp",
      externalLink: "https://victor-soussan.notion.site/ebd/2b7a519b0dea80b99138d4b51a65620b",
      navTitle: "Dailymotion"
    },
    {
      id: "france-vae",
      format: 'case-study',
      category: 'product-design',
      title: "France VAE",
      role: isEn ? "Lead Product Designer" : "Lead Product Designer",
      summary: isEn
        ? "6-month mission structuring product ops for a national public service scaling to 100K+ candidates."
        : "Mission de 6 mois pour structurer les ops produit d'un service public national servant 100K+ candidats.",
      missions: isEn ? [
        "Co-designed prioritization matrix with Lead PM",
        "Led 10 user interviews for dashboard launch",
        "Organized 2-day design thinking workshop with field actors",
        "Restructured Figma architecture & delivery process"
      ] : [
        "Co-conception matrice de priorisation avec Lead PM",
        "10 entretiens utilisateurs pour lancement dashboard",
        "Organisation atelier design thinking 2 jours avec AAP",
        "Restructuration architecture Figma & process delivery"
      ],
      system: {
        title: isEn ? "Season-based Workflow" : "Workflow en Saisons",
        desc: isEn ? "Implemented 1-month seasons with 3 delivery cycles, cross-team prioritization matrix, and weekly discovery rituals." : "Mise en place de saisons d'1 mois avec 3 cycles de livraison, matrice de priorisation cross-équipe et rituels discovery hebdo."
      },
      deliverables: isEn ? [
        "VAE Collective MVP & Employer Journey",
        "Promotional Video (Screencast)",
        "User Research Protocol & Synthesis",
        "Design Ops & Figma Architecture"
      ] : [
        "MVP VAE Collective & Parcours Employeur",
        "Vidéo Promotionnelle (Screencast)",
        "Protocole Recherche & Synthèses",
        "Design Ops & Architecture Figma"
      ],
      icon: <FileText size={24} />,
      color: "blue",
      coverImage: "/images/francevae/thumbnail_france_vae.webp",
      testimonialId: "boris-aime"
    },
    {
      id: "connect",
      format: 'case-study',
      category: 'product-design',
      title: "SQOOL Connect",
      role: isEn ? "Product Design Lead" : "Product Design Lead",
      summary: isEn ? "Designing a web-based dashboard concept and persistent interaction prototype for classroom orchestration." : "Conception d'un dashboard web et d'un prototype d'interaction persistante pour l'orchestration de classe.",
      missions: isEn ? [
        "Led the design of a proof-of-concept dashboard platform",
        "Co-authored the project vision and interaction model",
        "Created motion prototypes and interaction specifications",
        "Collaborated daily with React developer on prototype"
      ] : [
        "Direction du design d'une plateforme dashboard proof-of-concept",
        "Co-auteur de la vision projet et du modèle d'interaction",
        "Création de prototypes motion et spécifications d'interaction",
        "Collaboration quotidienne avec le développeur React"
      ],
      system: {
        title: isEn ? "Modular Dashboard System" : "Système Dashboard Modulaire",
        desc: isEn ? "Designed a modular web-based interface replacing the legacy Android launcher, with quick actions, app catalog, and persistent contextual UI ('La Bulle')." : "Conception d'une interface web modulaire remplaçant le launcher Android legacy, avec actions rapides, catalogue d'apps et UI contextuelle persistante ('La Bulle')."
      },
      deliverables: isEn ? [
        "Web Dashboard Prototype",
        "La Bulle - Persistent UI Module",
        "Technical Architecture Specs",
        "Motion & Interaction Guidelines"
      ] : [
        "Prototype Dashboard Web",
        "La Bulle - Module UI Persistant",
        "Spécifications Architecture Technique",
        "Guidelines Motion & Interaction"
      ],
      icon: <Layers size={24} />,
      color: "purple",
      coverImage: "/images/thumbnail-connect.webp",
      testimonialId: "achref-akkari",
      status: "concept"
    },
    {
      id: "sqool",
      format: 'case-study',
      category: 'product-design',
      title: "SQOOL Suite (UNOWHY)",
      role: isEn ? "Product Lead UI & Manager" : "Product Design Manager",
      summary: isEn ? "Leading the design transformation of a hardware company into a comprehensive EdTech SaaS ecosystem." : "Passage d'une boite Hardware à un écosystème SaaS EdTech complet. J'ai structuré le pôle design et piloté la refonte logicielle.",
      missions: isEn ? [
        "Managed a team of 5 designers: hiring, annual reviews, career coaching",
        "Led design strategy workshops to define the product vision",
        "Structured Design Ops: Figma organization, templates, and rituals",
        "Bridged Product & Tech: Designed decks for C-Level & All-Hands demos"
      ] : [
        "Recrutement et management d'une équipe de 5 designers",
        "Mise en place des Design Ops (Process, Figma, QA Design)",
        "Pilotage de la stratégie UX pour la suite logicielle et sa feuille de route",
        "Collaboration étroite avec 30+ développeurs et PMs"
      ],
      system: {
        title: isEn ? "Multi-Brand Design System" : "Design System Multi-Plateforme",
        desc: isEn ? "Built a centralized Figma system supporting 7 apps (Web/Android/PC). Created shared libraries for icons, gestures, and device frames to speed up hand-offs." : "Un système centralisé pour 7 applications (Web, Android, PC). J'ai standardisé les composants pour réduire la dette technique et accélérer les développements."
      },
      deliverables: [
        "SQOOL Classe (Gestion de classe)",
        "SQOOL MDM (Gestion de flotte)",
        "Documentation Zeroheight",
        "Présentations Stratégiques (Comex)"
      ],
      icon: <Briefcase size={24} />,
      color: "blue",
      coverImage: "/images/thumbnail-sqool-suite.webp",
      testimonialId: "charlotte-rifflet",
      navTitle: "SQOOL Suite"
    },
    {
      id: "sqool-classe",
      format: 'case-study',
      category: 'product-design',
      title: "SQOOL Classe",
      role: isEn ? "Lead Interaction Designer" : "Lead Interaction Designer",
      summary: isEn
        ? "Designing a real-time classroom supervision tool for 500,000 tablets deployed across 465 high schools in Ile-de-France."
        : "Conception d'un outil de supervision de classe en temps réel pour 500 000 tablettes déployées dans 465 lycées d'Île-de-France.",
      missions: isEn ? [
        "Led interaction design for the product squad",
        "42 interactive prototypes with GSAP animations",
        "User research and field observation in schools",
        "Design team coordination (5 designers)"
      ] : [
        "Direction du design d'interaction pour le squad produit",
        "42 prototypes interactifs avec animations GSAP",
        "Recherche utilisateur et observation terrain en établissements",
        "Coordination de l'équipe design (5 designers)"
      ],
      system: {
        title: isEn ? "Calm Supervision System" : "Système de Supervision Serein",
        desc: isEn ? "Designed a real-time supervision interface where teachers can scan 30 student screens at a glance and act with one tap, without turning the classroom into a control room." : "Conception d'une interface de supervision temps réel permettant aux enseignants de scanner 30 écrans d'élèves d'un coup d'œil et d'agir en un tap, sans transformer la classe en salle de contrôle."
      },
      deliverables: isEn ? [
        "Student Grid with Live Status",
        "One-Tap Classroom Controls",
        "Document Distribution System",
        "42 Interactive Prototypes"
      ] : [
        "Grille Élèves avec Statut Temps Réel",
        "Contrôles de Classe en Un Tap",
        "Système de Distribution de Documents",
        "42 Prototypes Interactifs"
      ],
      icon: <Smartphone size={24} />,
      color: "purple",
      coverImage: "/images/thumbnail_sqool_classe.webp",
      testimonialId: "charlotte-rifflet",
      status: "shipped"
    },
    {
      id: "pagesjaunes",
      format: 'case-study',
      category: 'product-design',
      title: "PagesJaunes",
      role: isEn ? "Mobile UI Lead" : "Lead UI Mobile",
      summary: isEn ? "Modernizing a legacy giant. Bringing mobile-first thinking to 22M+ users." : "Modernisation de l'application grand public (22 millions de téléchargements). Le défi : faire simple pour une audience très large.",
      missions: isEn ? [
        "Led UI for iOS & Android apps (22M downloads)",
        "Managed transition to Material Design standards",
        "Supervised Android Wear prototyping & Motion Design",
        "Coordinated cross-platform consistency with Engineering"
      ] : [
        "Direction artistique des apps iOS & Android",
        "Passage aux standards Material Design (Google)",
        "Prototypage innovant (Android Wear, Motion Design)",
        "Garant de la cohérence visuelle sur toutes les plateformes"
      ],
      system: {
        title: isEn ? "Cross-Platform Foundations" : "Fondations Cross-Platform",
        desc: isEn ? "Established the first shared design language between iOS, Android, and Responsive Web to unify the brand experience across millions of daily interactions." : "Définition d'un langage visuel commun entre iOS, Android et Web Mobile pour unifier l'expérience utilisateur sur tous les écrans."
      },
      deliverables: isEn ? [
        "Onboarding Redesign (iOS/Android)",
        "Navigation & Search UI",
        "Android Wear Prototype",
        "User Retention Flows"
      ] : [
        "Refonte de l'Onboarding",
        "UI de Recherche & Navigation",
        "Expériences contextuelles (Wearables)",
        "Optimisation de l'expérience de cartographie et itinéraires"
      ],
      icon: <Smartphone size={24} />,
      color: "purple",
      coverImage: "/images/thumbnail-pagesjaunes-multidevices.webp",
      testimonialId: "nicolas-moulin"
    },
    {
      id: "androidwear",
      format: 'case-study',
      category: 'product-design',
      title: "Android Wear",
      role: isEn ? "Mobile UI Lead" : "Lead UI Mobile",
      summary: isEn
        ? "Designing PagesJaunes for wrist: local search on Android Wear, shipped on Google Play."
        : "PagesJaunes sur montre connectée : recherche locale sur Android Wear, disponible sur Google Play.",
      missions: isEn ? [
        "Designed the full interaction model for a 280dp circular display",
        "Defined active and ambient mode screens for battery efficiency",
        "Collaborated daily with developer Thibault Fighiera on device builds",
        "Shipped on Google Play within 3 months"
      ] : [
        "Conception du modèle d'interaction pour un écran circulaire de 280dp",
        "Définition des écrans actifs et mode ambiant pour l'autonomie batterie",
        "Collaboration quotidienne avec le développeur Thibault Fighiera",
        "Mis en ligne sur Google Play en 3 mois"
      ],
      system: {
        title: isEn ? "Wearable Design System" : "Design System Wearables",
        desc: isEn
          ? "Built a component library covering both round and square watch variants, with systematic active/ambient mode equivalents for every screen."
          : "Bibliothèque de composants couvrant les variantes rondes et carrées, avec équivalents actif/ambiant systématiques pour chaque écran."
      },
      deliverables: isEn
        ? ["Android Wear App (Google Play)", "Active & Ambient Mode Specs", "Component Library", "Interaction Flows"]
        : ["App Android Wear (Google Play)", "Spécifications Actif/Ambiant", "Bibliothèque Composants", "Flux d'interaction"],
      icon: <Smartphone size={24} />,
      color: "purple",
      coverImage: "/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp",
      testimonialId: "frederic-rodriguez",
      status: "shipped"
    },
    // --- Short format projects ---
    {
      id: "condamine-apps",
      format: 'short',
      category: 'ai-experiment',
      title: "Condamine Apps",
      role: isEn ? "Solo Designer & Builder" : "Designer & Builder",
      summary: isEn
        ? "50+ functional web applications prototyped and deployed with Claude Code and AI-assisted workflows."
        : "50+ applications web fonctionnelles prototypées et déployées avec Claude Code et des workflows assistés par IA.",
      shortDescription: isEn
        ? "A personal lab where I prototype and ship functional web applications using Claude Code, Figma MCP, and Vercel. Each app goes from concept to deployed URL in hours. The goal: prove that a designer can produce and deploy production-grade interfaces without a development team, and use the speed to make better design decisions through rapid iteration."
        : "Un lab personnel où je prototype et déploie des applications web fonctionnelles avec Claude Code, Figma MCP et Vercel. Chaque app passe du concept à une URL déployée en quelques heures. L'objectif : prouver qu'un designer peut produire et déployer des interfaces de qualité production sans équipe de développement, et utiliser la vitesse pour prendre de meilleures décisions de design par l'itération rapide.",
      missions: [],
      system: { title: '', desc: '' },
      deliverables: isEn
        ? ["50+ Web Apps", "React/Next.js", "Tailwind CSS", "Vercel Deploys", "Claude Code Workflows"]
        : ["50+ Apps Web", "React/Next.js", "Tailwind CSS", "Déploiements Vercel", "Workflows Claude Code"],
      icon: <Cpu size={24} />,
      color: "indigo",
      coverImage: "/images/thumbnail_condamine_apps.webp",
      externalLink: "https://www.condamine.studio/apps",
      status: "shipped"
    },
    {
      id: "design-system-figma-claude",
      format: 'short',
      category: 'ai-experiment',
      title: isEn ? "Design System with Claude Code" : "Design System avec Claude Code",
      role: isEn ? "Designer & Implementer" : "Designer & Implémenteur",
      summary: isEn
        ? "Using Claude Code and Figma MCP to design, implement, and maintain a design system where tokens, variables, and components stay synchronized between Figma and code."
        : "Utiliser Claude Code et Figma MCP pour concevoir, implémenter et maintenir un design system où tokens, variables et composants restent synchronisés entre Figma et le code.",
      shortDescription: isEn
        ? "Connecting two workflows that never talked to each other: the rigor of a Figma design system and the speed of AI-assisted prototyping. Claude Code now drives both sides through Figma MCP Console."
        : "Connecter deux workflows qui ne se parlaient pas : la rigueur d'un design system Figma et la vitesse du prototypage assisté par IA. Claude Code pilote désormais les deux via Figma MCP Console.",
      body: isEn
        ? "For a year, I worked with two parallel approaches that didn't talk to each other. On one side, the classic Figma workflow: brand library, component library, connected design files, detailed journeys for developer handoff. Rigorous but slow to evolve. On the other, prototyping with Claude Code: realistic HTML interfaces generated in minutes, usable in user testing, but completely disconnected from the design system in Figma. Useful for conversations, useless for production delivery.\n\nFigma MCP Console changed this. Claude Code can now generate a complete Figma file: a design system with its tokens, variables, and components, then implement the screens described in specification, connect user journeys, and set transitions. The output is a self-contained, interactive Figma file with a complete application inside.\n\nI designed a medical mobile application this way: 10 screens, a complete UI kit with styles, tokens, variables, and twenty main components. In two hours. The gap between the intended design and the implemented result was near zero on atomic components.\n\nWhat matters most is not production speed. It's the ability to maintain a design system on the fly, update components and variables by iterating directly with Claude Code, without reworking each screen by hand. And to keep this design system as the shared source of truth, on both the design and development side.\n\nThere are still manual corrections, and the workflow is not yet frictionless. But the direction is clear for designers who build systems and prototype journeys."
        : "Pendant un an, j'ai travaillé avec deux approches parallèles qui ne se parlaient pas. D'un côté, l'approche classique dans Figma : librairie de marque, librairie de composants, fichiers de conception connectés, parcours détaillés pour le handoff avec les développeurs. Rigoureux, mais complexe à produire et à faire évoluer. De l'autre, le prototypage avec Claude Code : des interfaces HTML réalistes générées en quelques minutes, utilisables en test utilisateur, mais complètement déconnectées du design system en place dans Figma. Utiles pour converser, inutiles pour livrer en production.\n\nFigma MCP Console a changé la donne. Claude Code peut maintenant générer un fichier Figma complet : un design system avec ses tokens, ses variables, ses composants, puis implémenter les écrans décrits en spécification, connecter les parcours entre eux et poser les transitions. En sortie, on récupère un fichier Figma autonome, interactif, avec une application complète à l'intérieur.\n\nJ'ai conçu une application mobile pour le secteur médical de cette façon. 10 écrans, un UI kit complet avec styles, tokens, variables et une vingtaine de composants principaux. En deux heures. L'écart entre le design voulu et le résultat implémenté était quasi nul sur les composants atomiques.\n\nCe qui m'intéresse le plus dans cette évolution, ce n'est pas la vitesse de production. C'est la possibilité de maintenir un design system à jour au fil de l'eau, de mettre à jour les composants et les variables en itérant directement avec Claude Code, sans avoir à reprendre chaque écran à la main. Et de garder ce design system comme source de vérité partagée, côté design et côté développement.\n\nIl reste des corrections manuelles, et l'ensemble n'est pas encore sans friction. Mais la direction est claire pour les designers qui créent des systèmes et prototypent des parcours.",
      missions: [],
      system: { title: '', desc: '' },
      deliverables: isEn
        ? ["Design System (Tokens + Variables)", "Figma MCP Console", "10-Screen Medical App", "Claude Code Workflow", "Interactive Prototypes"]
        : ["Design System (Tokens + Variables)", "Figma MCP Console", "App Médicale 10 Écrans", "Workflow Claude Code", "Prototypes Interactifs"],
      icon: <Layers size={24} />,
      color: "blue",
      coverImage: "/articles/Experimentation Claude Code - design system, ui, figma, claude/thumnbnail claude code - figma mcp.webp",
      // videoUrl: the demo file was never committed. Add it under public/articles/... and restore this line.
      status: "shipped"
    },
    {
      id: "telemedicine-patient-app",
      format: 'short',
      category: 'product-design',
      title: isEn ? "Rebuilding a telemedicine patient app in 30 days" : "Reconstruire l'application patient d'une société de téléconsultation en 30 jours",
      navTitle: isEn ? "Telemedicine patient app" : "App patient téléconsultation",
      role: isEn ? "First product designer, design lead and product owner" : "Premier product designer, lead design et product owner",
      summary: isEn
        ? "Patient app rebuilt in 30 days, a design system of nearly 90 components, an AI assistant under regulatory constraints and a product management system, in three months."
        : "Application patient reconstruite en 30 jours, design system de près de 90 composants, assistant IA sous contrainte réglementaire et système de gestion produit, en trois mois.",
      shortDescription: isEn
        ? "Three month engagement (April to July 2026) for a digital health company that equips pharmacies with telemedicine booths. As the company's first product designer, I rebuilt the patient app with a tech lead and two developers, while laying down a design system, a product management system and the design framework of an AI assistant that is not allowed to diagnose."
        : "Mission de trois mois (avril à juillet 2026) pour une société de santé numérique qui équipe des pharmacies de cabines de téléconsultation. Premier product designer de l'entreprise, j'ai reconstruit l'application patient avec un tech lead et deux développeurs, tout en posant un design system, un système de gestion produit et le cadre de conception d'un assistant IA qui n'a pas le droit de diagnostiquer.",
      body: isEn
        ? "The business model depends on the number of consultations actually started. A patient who enters the funnel and drops out has already cost their acquisition. Over a year, 80% of patients consult only once: nothing in the journey gives a reason to come back once the prescription is delivered. The organization did not help: no design function, a component library frozen for more than a year, product management scattered across several tools, a shrinking product team and a very tight budget. On June 15, leadership set two priorities, consultation volume and the mobile app, with a store submission on July 15.\n\nA review of the existing app in early June found four problems that a patch could not fix: a fragmented session (signed in to the app, signed out of the consultation), a double navigation, a home screen that reorganized itself around the connected devices in use, and a funnel of 8 to 13 screens including a health insurance screen that only 3% of patients managed to complete. The architecture followed stacked features rather than the journey. Stripping the shell would have kept the embedded web view, and with it the double session: a rebuild was the only option.\n\nI removed what was most attractive. The first version refocuses the app on online consultation: connected devices, health metrics, AI analysis and the subscription are out of scope. Economic reason: the consultation is reimbursed and monetized by volume. Regulatory reason: these features exposed the product to a medical device requalification, with an 18 to 36 month certification against a 30 day deadline. I carried this removal to a leadership team that cared about these features.\n\nThe health insurance screen leaves the funnel in favor of an advance payment and a clear explanation of reimbursement. A screen with a failure rate close to 100% does not collect data, it manufactures drop-offs. My first hypothesis, delaying authentication until the waiting room, was abandoned and documented: checking entitlements with the national health insurance requires identification before the patient is connected.\n\nThe AI assistant is not allowed to diagnose. Instead of a clause in the terms of use, the limit is visible in the interface: a permanent scope banner, an imposed answer structure (information, context, action), escalation to a doctor triggered by the content of the conversation and never by a counter, and refusal designed as a journey with a real way out. Two home buttons (\"describe a symptom\", \"understand a prescription\") were removed: an affordance is a promise, and these announced a medical act. The non-medical framing was validated by the data protection officer, with data anonymized before it is sent to the model.\n\nOn the design system, a full migration of the existing Angular library was out of reach without a design team or a budget. I built a new system in parallel, with a shared token vocabulary, for everything new: two repositories, nearly 90 components, 12 color ramps, a 13 level type scale and layouts for three contexts (desktop, mobile, booth tablet). Accepted cost: two brand greens coexist for a while, with a written precedence rule. A Claude Code skill pack generates code aligned with the system: without a design team, governance goes through the tool rather than the document.\n\nThe patient app was rebuilt in React Native, reusing the native building blocks of the consultation. Mockups were presented to developers 48 hours after the decision, with one week sprints and a testable demo at the end of each, and three builds in two weeks. The specification has 7 epics, 24 user stories and eight screen sections with their four states (empty, loading, data, error). In the waiting room, no waiting time is ever displayed: the position changes continuously, and a frozen number would lie and ruin trust in the rest of the screen.\n\nOn product management, I audited six databases (three incompatible priority scales), moved tracking from Jira to Notion into four databases linked by a single chain, requalified 92 inherited requests and opened an intake form to the whole company. The model was tested on fifteen real situations before rollout: four pass, eleven get stuck, seven fixes. Documented handover to a junior product owner. A ten slide vision deck presented to the executive committee obtained two decisions: a single app with care and prevention sequenced, and a priority order between programs, pharmacy and connected devices.\n\nWhat is not measured: the app was not yet published when I left, the design system has no adoption measure, the product management system had been live for a week and the assistant was never opened to the public. The funnel redesign remains a reasoned hypothesis until step by step completion is tracked. Still open at handover: the exact regulatory qualification of the app, a session bug that signs the user out fifteen minutes after a consultation, and a passwordless authentication never tested in production.\n\nWhat I would do differently: set up measurement before the funnel redesign (completion by step, drop-off, assistance time in the pharmacy), get the technical confirmations the store listing depended on in the first week, instrument design system adoption from its first version, and write the product management governance before configuring the tool."
        : "Le modèle économique dépend du nombre de consultations réellement lancées. Un patient qui entre dans le tunnel et n'en sort pas a déjà coûté son acquisition. Or, sur un an, 80 % des patients ne consultent qu'une fois : le parcours ne donne aucune raison de revenir une fois l'ordonnance remise. L'organisation n'aidait pas : aucune fonction design, une bibliothèque de composants gelée depuis plus d'un an, un pilotage produit éclaté entre plusieurs outils, une équipe produit en réduction et un budget très contraint. Le 15 juin, la direction fixe deux priorités, le volume de consultations et l'application mobile, avec une soumission aux stores le 15 juillet.\n\nUne revue de l'application existante, début juin, relève quatre problèmes qui ne se traitent pas par un correctif : une session fragmentée (connecté à l'application, déconnecté de la consultation), une double navigation, un accueil qui se réorganise selon les objets connectés actifs, et un tunnel de 8 à 13 écrans avec un écran de saisie de mutuelle que 3 % des patients réussissaient à remplir. L'architecture suivait les fonctionnalités empilées plutôt que le parcours. Déshabiller la coquille aurait conservé la vue web embarquée, donc la double session : la reconstruction s'est imposée.\n\nJ'ai retiré ce qui séduisait le plus. La première version recentre l'application sur la consultation en ligne : sortent du périmètre les objets connectés, les métriques de santé, l'analyse par IA et l'abonnement. Raison économique : la consultation est remboursée et monétisée au volume. Raison réglementaire : ces briques exposaient le produit à une requalification en dispositif médical, avec une certification de 18 à 36 mois face à une échéance de 30 jours. J'ai porté ce retrait devant une direction qui tenait à ces fonctions.\n\nLa mutuelle sort du tunnel au profit d'une avance de frais et d'une explication claire du remboursement. Un écran dont le taux d'échec approche 100 % ne collecte pas une donnée, il fabrique des abandons. Ma première hypothèse, repousser l'authentification jusqu'à la salle d'attente, a été abandonnée et documentée : l'appel aux droits de l'Assurance Maladie exige une identification avant la mise en relation.\n\nL'assistant IA n'a pas le droit de diagnostiquer. Plutôt qu'une clause dans les conditions d'utilisation, la limite est visible dans l'interface : bandeau de périmètre permanent, structure de réponse imposée (information, contexte, action), escalade vers un médecin déclenchée par le contenu de la conversation et jamais par un compteur, refus conçu comme un parcours avec une sortie réelle. Deux boutons d'accueil (« décrire un symptôme », « comprendre une ordonnance ») ont été retirés : une affordance est une promesse, et celle-ci annonçait un acte médical. Le cadrage non médical a été validé par la DPO, avec anonymisation des données avant envoi au modèle.\n\nSur le design system, la migration complète de la bibliothèque Angular existante était intenable sans équipe design ni budget. J'ai construit un système neuf en parallèle, avec un vocabulaire de tokens commun, pour tout ce qui est nouveau : deux dépôts, près de 90 composants, 12 rampes de couleur, une échelle typographique à 13 niveaux et des mises en page pour trois contextes (bureau, mobile, tablette de cabine). Coût assumé : deux verts de marque coexistent un temps, avec une règle de préséance écrite. Un pack de skills Claude Code génère du code aligné sur le système : sans équipe design, la gouvernance passe par l'outil plutôt que par le document.\n\nL'application patient a été reconstruite en React Native en réutilisant les briques natives de la consultation. Maquettes présentées aux développeurs 48 heures après l'arbitrage, sprints d'une semaine avec une démo testable à chaque fin, trois builds en deux semaines. La spécification compte 7 epics, 24 user stories et huit sections d'écrans avec leurs quatre états (vide, chargement, données, erreur). En salle d'attente, jamais de temps d'attente affiché : la position varie en continu, et un chiffre figé mentirait et ruinerait la confiance dans le reste de l'écran.\n\nCôté pilotage produit, j'ai audité six bases (trois échelles de priorité incompatibles), migré le suivi de Jira vers Notion en quatre bases reliées par une seule chaîne, requalifié 92 demandes héritées et ouvert un formulaire d'entrée à toute l'entreprise. Le modèle a été éprouvé sur quinze situations réelles avant déploiement : quatre passent, onze coincent, sept correctifs. Passation documentée à une PO junior. Un deck de vision de dix slides présenté au comité de direction a obtenu deux arbitrages : une seule application avec soin et prévention séquencés, et un ordre de priorité entre programmes, pharmacie et objets connectés.\n\nCe qui n'est pas mesuré : l'application n'était pas encore publiée à mon départ, le design system n'a pas de mesure d'adoption, le système de gestion produit n'avait vécu qu'une semaine et l'assistant n'a jamais été ouvert au public. La refonte du tunnel reste une hypothèse argumentée tant que la complétion par étape n'est pas suivie. Restaient ouverts à la passation : la qualification réglementaire exacte de l'application, un bug de session qui déconnecte l'utilisateur quinze minutes après une consultation, et une authentification sans mot de passe jamais testée en production.\n\nCe que je ferais autrement : poser la mesure avant la refonte du tunnel (complétion par étape, abandon, temps d'accompagnement en officine), obtenir dès la première semaine les confirmations techniques dont dépendait la fiche store, instrumenter l'adoption du design system dès sa première version, et écrire la gouvernance du système de gestion produit avant de configurer l'outil.",
      missions: [],
      system: { title: '', desc: '' },
      deliverables: isEn
        ? ["Patient app (iOS, Android)", "Design system, nearly 90 components", "AI assistant design framework", "Product management system (Jira to Notion)", "Product vision deck"]
        : ["Application patient (iOS, Android)", "Design system, près de 90 composants", "Cadre de conception de l'assistant IA", "Système de gestion produit (Jira vers Notion)", "Deck de vision produit"],
      icon: <Stethoscope size={24} />,
      color: "blue",
      coverImage: "/images/telemedicine/cover_patient_app.webp"
    }
  ];
};
