import React from 'react';
import {
  Cpu,
  Users,
  FileText,
  Stack as Layers,
  Briefcase,
  DeviceMobile as Smartphone,
  ShieldCheck,
} from '@phosphor-icons/react';
import type { Language } from './translations';

export type ProjectFormat = 'case-study' | 'short'
export type ProjectCategory = 'product-design' | 'ai-experiment' | 'prototype' | 'concept'

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
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
      period: "2026",
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
      coverImage: "/images/riskos/02-case-detail.png",
      externalLink: "https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app",
      status: "experiment",
      cardBg: "#111113"
    },
    {
      id: "toolkit",
      format: 'case-study',
      category: 'product-design',
      title: "Toolkit",
      role: isEn ? "Founding Designer" : "Premier Designer",
      period: "2023 – 2024",
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
      period: "2017 – 2018",
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
      period: isEn ? "Dec 2024 – Jul 2025" : "Déc 2024 – Juil 2025",
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
      coverImage: "/images/francevae/thumbnail_france_vae.webp"
    },
    {
      id: "connect",
      format: 'case-study',
      category: 'product-design',
      title: "SQOOL Connect",
      role: isEn ? "Product Design Lead" : "Product Design Lead",
      period: "2020 – 2021",
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
      status: "concept"
    },
    {
      id: "sqool",
      format: 'case-study',
      category: 'product-design',
      title: "SQOOL Suite (UNOWHY)",
      role: isEn ? "Product Lead UI & Manager" : "Product Design Manager",
      period: "2018 – 2024",
      summary: isEn ? "Leading the design transformation of a hardware company into a comprehensive EdTech SaaS ecosystem." : "Passage d'une boite Hardware à un écosystème SaaS EdTech complet. J'ai structuré le pôle design et piloté la refonte logicielle.",
      missions: isEn ? [
        "Managed a team of 4 designers: hiring, annual reviews, career coaching",
        "Led design strategy workshops for 'Road to 2025' vision",
        "Structured Design Ops: Figma organization, templates, and rituals",
        "Bridged Product & Tech: Designed decks for C-Level & All-Hands demos"
      ] : [
        "Recrutement et management d'une équipe de 4 Product Designers",
        "Mise en place des Design Ops (Process, Figma, QA Design)",
        "Pilotage de la stratégie UX pour la suite logicielle (Roadmap 2025)",
        "Collaboration étroite avec 30+ développeurs et PMs"
      ],
      system: {
        title: isEn ? "Multi-Brand Design System" : "Design System Multi-Plateforme",
        desc: isEn ? "Built a centralized Figma system supporting 8+ apps (Web/Android/PC). Created shared libraries for icons, gestures, and device frames to speed up hand-offs." : "Un système centralisé pour 8 applications (Web, Android, PC). J'ai standardisé les composants pour réduire la dette technique et accélérer les développements."
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
      period: "2022",
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
      status: "shipped"
    },
    {
      id: "pagesjaunes",
      format: 'case-study',
      category: 'product-design',
      title: "PagesJaunes",
      role: isEn ? "Mobile UI Lead" : "Lead UI Mobile",
      period: "2014 – 2017",
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
      period: "2015",
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
      status: "shipped"
    },
    // --- Short format projects ---
    {
      id: "condamine-apps",
      format: 'short',
      category: 'ai-experiment',
      title: "Condamine Apps",
      role: isEn ? "Solo Designer & Builder" : "Designer & Builder",
      period: "2025",
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
      coverImage: "/images/thumbnail_condamine_apps.png",
      externalLink: "https://www.condamine.studio/apps",
      status: "shipped"
    },
    {
      id: "design-system-figma-claude",
      format: 'short',
      category: 'ai-experiment',
      title: isEn ? "Design System with Claude Code" : "Design System avec Claude Code",
      role: isEn ? "Designer & Implementer" : "Designer & Implémenteur",
      period: "2025",
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
      coverImage: "/articles/Experimentation Claude Code - design system, ui, figma, claude/thumnbnail claude code - figma mcp.png",
      videoUrl: "/articles/Experimentation Claude Code - design system, ui, figma, claude/Claude Code + Figma MCP Console Demo.mp4",
      status: "shipped"
    }
  ];
};
