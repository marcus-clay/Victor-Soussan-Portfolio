import React from 'react';
import {
  Cpu,
  Users,
  FileText,
  Stack as Layers,
  Briefcase,
  DeviceMobile as Smartphone,
} from '@phosphor-icons/react';
import type { Language } from './translations';

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  missions: string[];
  system: {
    title: string;
    desc: string;
  };
  deliverables: string[];
  icon: React.ReactNode;
  color: 'blue' | 'gray' | 'indigo' | 'purple';
  coverImage: string; // Landscape cover image filename
  hoverImage?: string; // Image to show on hover (with device mockup)
  externalLink?: string;
  testimonialId?: string;
  status?: 'shipped' | 'concept';
}

export const getProjects = (lang: Language): Project[] => {
  const isEn = lang === 'en';
  return [
    {
      id: "toolkit",
      title: "Toolkit",
      role: isEn ? "Founding Designer" : "Founding Designer (Premier Designer)",
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
      externalLink: "https://victor-soussan.notion.site/ebd/2b7a519b0dea80b99138d4b51a65620b"
    },
    {
      id: "france-vae",
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
      coverImage: "thumbnail-connect.webp",
      status: "concept"
    },
    {
      id: "sqool",
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
      coverImage: "thumbnail-sqool-suite.webp",
      testimonialId: "charlotte-rifflet"
    },
    {
      id: "pagesjaunes",
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
      coverImage: "thumbnail-pagesjaunes-multidevices.webp",
      testimonialId: "nicolas-moulin"
    }
  ];
};
