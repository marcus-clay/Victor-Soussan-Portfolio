// Toolkit Case Study Page - Static content with instant loading
// Displays the Toolkit project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ExternalLink,
  Calendar,
  Briefcase,
  Layers,
  Rocket,
  Quote,
  ChevronRight,
  ChevronDown,
  X,
  Play,
  Zap,
  Trophy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { GalleryItem, getToolkitGalleryItems } from './BentoGallery';
import ToolkitExecutive from './src/components/ToolkitExecutive';
import EnhancedLightbox from './src/components/EnhancedLightbox';

interface ToolkitPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
}

// Translations for Toolkit Case Study
const TOOLKIT_TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    visitToolkit: 'Visit Toolkit',
    projectGallery: 'Project Gallery',
    gallery: 'Gallery',
    contactVictor: 'Contact Victor for a similar project',
    clickToZoom: 'Click image to zoom',
    clickToExitZoom: 'Click to exit zoom',
    meta: {
      type: 'Product Design',
      scope: 'Web, App, Branding',
      phase: 'Zero to One',
      period: '2023-2025',
    },
    nav: {
      top: 'Top',
      intro: 'Intro',
      overview: 'Overview',
      context: 'Context',
      phase1: 'Phase 1',
      phase2: 'Phase 2',
      phase3: 'Phase 3',
      designSystem: 'Design System',
      impact: 'Impact',
    },
    hero: {
      tags: 'Product Design, web, app, branding',
      zeroToOne: 'Zero to one',
      title: 'Designing construction management software that works',
      subtitle: 'From Prototype to 2,000 Customers',
      description: 'Toolkit needed product design to secure funding and reach market fit in construction tech. Over 12 months, I led end-to-end design in a lean CEO-Dev-Designer team with continuous user validation. We shipped three major releases: funding prototype (3 months), feature-rich V2 (5 months), and mobile-optimized V3 (4 months). The product reached 2,000 paying customers within 24 months, secured enterprise adoption at launch, and raised Series A funding in November 2025.',
    },
    testimonial: {
      quote: 'Victor worked with Toolkit as our UX/UI designer from the earliest stages. We ran discovery workshops together before even building the product, allowing him to deeply understand the construction industry. He transformed complex business requirements into perfectly adapted user flows, exactly what a startup like ours needed. Thanks to his experience, Victor also established foundational systems (UI kit, interaction patterns) that saved us considerable development time down the line.',
      author: 'Pierre-Marie Nigay',
      role: 'Founder @ Toolkit',
    },
    overview: {
      title: 'Overview',
      introTitle: 'Introduction',
      introP1: 'Construction software is overwhelming. Legacy tools pack every feature into dense interfaces, forcing users through complex workflows to complete basic tasks. Site managers juggle multiple projects, field workers need quick status updates, and office teams require detailed planning. One interface cannot serve all needs equally.',
      introP2: 'Toolkit approached this differently. Rather than building another feature-complete solution, we focused on core workflows that construction teams use daily: planning tasks across zones, tracking progress, managing documents, coordinating teams. The challenge was delivering sophistication without complexity.',
      roleTitle: 'My role',
      roleDesc: 'I joined as sole designer in a three-person team. The CEO brought domain expertise from years researching construction workflows. The lead developer built the technical foundation. My role: transform business requirements into a scalable product that users would actually adopt. No design team, no researchers, no product managers. Just tight collaboration, continuous validation, and rapid iteration.',
      projectTitle: 'Project and impact',
      projectP1: 'Over 12 months, we evolved from funding prototype to platform maturity. Each phase added sophistication while maintaining simplicity. Progressive disclosure hid complexity until needed. Context-aware interfaces adapted to user tasks. Batch operations reduced repetitive actions. Visual hierarchy prevented information overload at scale.',
      projectP2: 'The approach worked. Enterprise customers deployed at launch. Users managing 15+ construction sites adopted the platform. The product reached 2,000 paying customers in 24 months and secured Series A funding. This case study shows how we got there.',
    },
    context: {
      title: 'Context and approach',
      intro: 'Three phases from funding prototype to platform maturity. Phase 1 secured initial funding with core features. Phase 2 added sophisticated interactions and multi-project support. Phase 3 achieved mobile optimization and design system scalability. Result: 2,000 customers, enterprise adoption, Series A funding within 24 months.',
      coreChallenge: 'Core Design Challenge',
      coreChallengeDesc: 'Planning interface showing the fundamental tension: construction projects contain 50-100+ tasks across multiple zones and timelines.',
      research: 'Research process',
      researchDesc: 'Lean validation in a three-person team. Microsoft Clarity provided behavioral analytics. CEO conducted 5-7 user calls weekly.',
      foundation: 'Foundation',
      foundationDesc: 'MVP scope securing initial funding. Core infrastructure: passwordless auth, dual sidebar navigation, project workflows.',
      creationWorkflow: 'Product Creation Workflow',
      creationWorkflowDesc: 'Four-step process from project basics to team launch. Progressive disclosure design: setup steps prominent during creation, automatically collapse once project active.',
      interactionPrinciples: 'Core Interaction Principles',
      interactionPrinciplesDesc: 'Design principles preventing feature bloat. Progressive disclosure, context awareness, batch efficiency, visual hierarchy.',
    },
    phase1: {
      title: 'Phase 1 - Foundation',
      firstTimeExp: '1st time experience',
      passwordlessAuth: 'Passwordless authentication',
      passwordlessAuthDesc: 'Magic link login eliminates password friction for field workers sharing devices.',
      emptyState: 'Empty state',
      emptyStateDesc: 'Greeting new users with primary sidebar navigation introduced.',
      formPattern: 'Form design pattern',
      formPatternDesc: 'Mobile-first approach used across all the application.',
      chantierV1: 'Chantier Detail v1',
      chantierV1Desc: 'Early desktop layout establishing dual sidebar architecture.',
      chantierV2: 'Chantier Detail v2',
      chantierV2Desc: 'Removed the metadata informations to the edit view. We only kept contact information display at 1st sight.',
      showHideNav: 'Show and Hide navigation',
      showHideNavDesc: 'Secondary sidebar collapsing and expanding on demand. Setup sections (zones, companies, task libraries) prominent during project creation, collapsing once project active. Operations sections (planning, documents, observations) surfacing as primary navigation. Progressive disclosure: complexity hidden until relevant, interface adapting to project lifecycle stage.',
      navShowHide: 'Navigation show/hide',
      navShowHideDesc: 'Secondary sidebar collapsing and expanding on demand.',
      tasks: 'Tasks',
      taskCreation: 'Task creation',
      taskCreationDesc: 'Assisted task creation for quick addition and task setting for each phase of the project.',
      sequences: 'Sequences',
      taskSequences: 'Tasks sequences',
      taskSequencesDesc: 'Templating is part of Toolkit DNA. The construction planner can set and save task sequences in a library to speed up site planning.',
      planning: 'Planning',
      planningV1: 'Planning v1',
      planningV1Desc: 'First planning canvas with colorful task card aesthetic. High visual weight worked well with 10-15 tasks but became overwhelming at 50-100+ tasks.',
      taskComponentV1: 'Task component v1',
      taskComponentV1Desc: 'Multiple sizes and variations for different display contexts.',
      taskComponentV2: 'Task component v2',
      taskComponentV2Desc: 'Refined system with four interaction states. Height reduced, colors desaturated, contrast improved.',
      planningV2: 'Planning v2',
      planningV2Desc: 'Planning canvas evolution with refined visual system. Multiple zones and 50+ tasks visible simultaneously without overwhelming interface.',
      multiSelect: 'Multi-select',
      multiSelectDesc: 'Rectangle drag enabling batch operations across zones and timeline.',
      contextMenu: 'Context menu',
      contextMenuDesc: 'Adapting to selected task with prioritized actions.',
      adaptiveZoom: 'Adaptive zoom',
      adaptiveZoomDesc: 'View controls toggling between day, week, month scales.',
      expandLayout: 'Expand layout on planning view',
      expandLayoutDesc: 'To enhance ease of use on the planning we implemented a way to expand the layout to focus on task management, without getting confusion with navigation panel.',
      expandLayoutCaption: 'Expand layout',
      expandLayoutCaptionDesc: 'Zoom in and out on the planning canvas for better focus.',
    },
    phase2: {
      title: 'Phase 2 - Feature expansion',
      intro: 'With the foundation validated, Phase 2 focused on expanding capabilities while maintaining simplicity. We introduced a dynamic menu system that adapts to user context, reducing cognitive load and streamlining workflows. The challenge was adding power features without cluttering the interface.',
      dynamicMenu: 'Dynamic menu system',
      dynamicMenuDesc: 'The dynamic menu adapts to the current task context. When editing a task, relevant actions surface immediately. When viewing activity logs, filtering options take priority. This context-awareness reduces navigation steps and keeps users focused on their current workflow.',
      dynamicIsland: 'Dynamic island menu',
      dynamicIslandDesc: 'Contextual task modification with quick actions and status updates.',
      taskManipulation: 'Task manipulation in planning',
      taskManipulationDesc: 'Edit duration and task information on the fly directly from the planning canvas.',
      taskManipulationCaption: 'Task manipulation',
      taskManipulationCaptionDesc: 'Edit duration and task information on the fly.',
      batchEdition: 'Batch edition',
      batchEditionDesc: 'Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds. Users managing 50-100+ tasks need efficient ways to apply changes across groups.',
      batchEditionCaption: 'Batch edition',
      batchEditionCaptionDesc: 'Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds.',
      interfaceSystem: 'Interface system',
      interfaceSystemDesc: 'Component architecture for the dynamic menu, ensuring consistency across different contexts.',
      activitySection: 'Activity section behavior',
      activitySectionDesc: 'Task detail view with dynamic menu showing activity log and contextual actions.',
    },
    phase3: {
      title: 'Phase 3 - Platform maturity',
      intro: 'Phase 3 brought platform maturity with the project hub and mobile evolution. Enterprise customers needed to manage multiple construction sites from a single dashboard. Field workers needed mobile access that matched the desktop experience. We delivered both without compromising either.',
      projectHub: 'Project hub',
      projectHubDesc: "The project hub provides a bird's-eye view of all construction sites. Managers can quickly assess progress, identify bottlenecks, and drill into specific projects. Visual indicators surface urgent items without requiring deep navigation.",
      projectHubV3: 'Project hub v3',
      projectHubV3Desc: 'Multi-site dashboard with progress indicators, quick actions, and filtering capabilities.',
      mobileEvolution: 'Mobile evolution',
      mobileEvolutionDesc: 'Construction happens on-site, often in challenging conditions. The mobile experience needed to be robust, fast, and usable with gloves. We redesigned the navigation system for touch-first interaction while maintaining feature parity with desktop.',
      mobileNav: 'Mobile navigation evolution',
      mobileNavDesc: 'Touch-optimized menu system with gesture support and thumb-friendly action zones.',
    },
    designSystem: {
      title: 'Design system foundation',
      intro: 'A three-person team cannot afford to redesign components for every feature. We built a design system that scaled with the product: reusable components, consistent patterns, and a shared visual language. This foundation enabled rapid iteration while maintaining quality.',
      ds: 'Design system',
      dsDesc: 'Component library with tokens, patterns, and usage guidelines for consistent implementation.',
      iconSystem: 'Icon system',
      iconSystemDesc: 'Custom icon set for files and folders, optimized for construction document management.',
    },
    impact: {
      title: 'Impact',
      intro: 'The design approach delivered measurable business results. By focusing on core workflows and progressive complexity, we created a product that both enterprise customers and small teams could adopt quickly. The numbers tell the story.',
      projectImpact: 'Project impact',
      projectImpactDesc: 'Key metrics and milestones achieved over the 12-month product development cycle.',
      customers: '2,000+',
      customersDesc: 'Paying customers within 24 months of launch',
      seriesA: 'Series A',
      seriesADesc: 'Funding secured in November 2025',
      enterprise: 'Enterprise',
      enterpriseDesc: 'Customers managing 15+ sites adopted at launch',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Scope',
      period: 'Period',
      phase: 'Phase',
    },
    captions: {
      hero: 'Toolkit App',
      heroDesc: 'Construction management software that works.',
      overview: 'Toolkit App Overview',
      overviewDesc: 'Platform maturity with web and mobile interfaces.',
      productEvolution: 'Product Evolution',
      productEvolutionDesc: '12 months roadmap showing the journey from prototype to platform maturity.',
      coreChallenge: 'Core Design Challenge',
      coreChallengeDesc: 'Planning interface showing the fundamental tension: 50-100+ tasks across zones and timelines.',
      research: 'Research process',
      researchDesc: 'Lean validation in a three-person team with continuous user feedback.',
      foundation: 'Product Foundation',
      foundationDesc: 'MVP scope securing initial funding with core infrastructure.',
      creationWorkflow: 'Project creation workflow',
      creationWorkflowDesc: 'Four-step process from project basics to team launch.',
      interactionPrinciples: 'Core interaction principles',
      interactionPrinciplesDesc: 'Design principles preventing feature bloat as product expanded.',
      passwordlessAuth: 'Passwordless authentication',
      passwordlessAuthDesc: 'Magic link login eliminates password friction for field workers sharing devices.',
      emptyState: 'Empty state',
      emptyStateDesc: 'Greeting new users with primary sidebar navigation introduced.',
      formPattern: 'Form design pattern',
      formPatternDesc: 'Mobile-first approach used across all the application.',
      chantierV1: 'Chantier Detail v1',
      chantierV1Desc: 'Early desktop layout establishing dual sidebar architecture.',
      chantierV2: 'Chantier Detail v2',
      chantierV2Desc: 'Removed the metadata informations to the edit view. We only kept contact information display at 1st sight.',
      navShowHide: 'Navigation show/hide',
      navShowHideDesc: 'Secondary sidebar collapsing and expanding on demand.',
      taskCreation: 'Task creation',
      taskCreationDesc: 'Assisted task creation for quick addition and task setting for each phase of the project.',
      taskSequences: 'Tasks sequences',
      taskSequencesDesc: 'Templating is part of Toolkit DNA. The construction planner can set and save task sequences in a library to speed up site planning.',
      planningV1: 'Planning v1',
      planningV1Desc: 'First planning canvas with colorful task card aesthetic. High visual weight worked well with 10-15 tasks but became overwhelming at 50-100+ tasks.',
      taskComponentV1: 'Task component v1',
      taskComponentV1Desc: 'Multiple sizes and variations for different display contexts.',
      taskComponentV2: 'Task component v2',
      taskComponentV2Desc: 'Refined system with four interaction states. Height reduced, colors desaturated, contrast improved.',
      planningV2: 'Planning v2',
      planningV2Desc: 'Planning canvas evolution with refined visual system. Multiple zones and 50+ tasks visible simultaneously without overwhelming interface.',
      multiSelect: 'Multi-select',
      multiSelectDesc: 'Rectangle drag enabling batch operations across zones and timeline.',
      contextMenu: 'Context menu',
      contextMenuDesc: 'Adapting to selected task with prioritized actions.',
      adaptiveZoom: 'Adaptive zoom',
      adaptiveZoomDesc: 'View controls toggling between day, week, month scales.',
      expandLayout: 'Expand layout',
      expandLayoutDesc: 'Zoom in and out on the planning canvas for better focus.',
      dynamicIsland: 'Dynamic island menu',
      dynamicIslandDesc: 'Contextual task modification with quick actions and status updates.',
      taskManipulation: 'Task manipulation',
      taskManipulationDesc: 'Edit duration and task information on the fly.',
      batchEdition: 'Batch edition',
      batchEditionDesc: 'Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds.',
      interfaceSystem: 'Interface system',
      interfaceSystemDesc: 'Component architecture for the dynamic menu, ensuring consistency across different contexts.',
      activitySection: 'Activity section behavior',
      activitySectionDesc: 'Task detail view with dynamic menu showing activity log and contextual actions.',
      projectHubV3: 'Project hub v3',
      projectHubV3Desc: 'Multi-site dashboard with progress indicators, quick actions, and filtering capabilities.',
      mobileNav: 'Mobile navigation evolution',
      mobileNavDesc: 'Touch-optimized menu system with gesture support and thumb-friendly action zones.',
      designSystem: 'Design system',
      designSystemDesc: 'Component library with tokens, patterns, and usage guidelines.',
      iconSystem: 'Icon system',
      iconSystemDesc: 'Custom icon set for files and folders.',
      projectImpact: 'Project impact',
      projectImpactDesc: 'Key metrics and milestones achieved.',
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    visitToolkit: 'Visiter Toolkit',
    projectGallery: 'Galerie du projet',
    gallery: 'Galerie',
    contactVictor: 'Contacter Victor pour un projet similaire',
    clickToZoom: 'Cliquer pour agrandir',
    clickToExitZoom: 'Cliquer pour fermer',
    meta: {
      type: 'Design Produit',
      scope: 'Web, App, Branding',
      phase: 'De zéro à un',
      period: '2023-2025',
    },
    nav: {
      top: 'Haut',
      intro: 'Intro',
      overview: 'Vue d\'ensemble',
      context: 'Contexte',
      phase1: 'Phase 1',
      phase2: 'Phase 2',
      phase3: 'Phase 3',
      designSystem: 'Design System',
      impact: 'Impact',
    },
    hero: {
      tags: 'Design Produit, web, app, branding',
      zeroToOne: 'De zéro à un',
      title: 'Concevoir un logiciel de gestion de chantier qui fonctionne vraiment',
      subtitle: 'Du Prototype à 2 000 Clients',
      description: 'Toolkit avait besoin de design produit pour lever des fonds et atteindre le product-market fit dans la construction tech. Pendant 12 mois, j\'ai mené le design de bout en bout dans une équipe légère CEO-Dev-Designer avec validation continue auprès des utilisateurs. Nous avons livré trois versions majeures : prototype de financement (3 mois), V2 riche en fonctionnalités (5 mois) et V3 optimisée mobile (4 mois). Le produit a atteint 2 000 clients payants en 24 mois, sécurisé l\'adoption entreprise dès le lancement et levé une Série A en novembre 2025.',
    },
    testimonial: {
      quote: 'Victor a travaillé avec Toolkit en tant que designer UX/UI dès les premières étapes. Nous avons mené ensemble des ateliers de découverte avant même de construire le produit, ce qui lui a permis de comprendre en profondeur l\'industrie du bâtiment. Il a transformé des exigences métier complexes en parcours utilisateurs parfaitement adaptés, exactement ce dont une startup comme la nôtre avait besoin. Grâce à son expérience, Victor a aussi mis en place des systèmes fondamentaux (UI kit, patterns d\'interaction) qui nous ont fait gagner un temps de développement considérable par la suite.',
      author: 'Pierre-Marie Nigay',
      role: 'Fondateur @ Toolkit',
    },
    overview: {
      title: 'Vue d\'ensemble',
      introTitle: 'Introduction',
      introP1: 'Les logiciels de construction sont écrasants. Les outils historiques empilent toutes les fonctionnalités dans des interfaces denses, forçant les utilisateurs à traverser des workflows complexes pour accomplir des tâches basiques. Les conducteurs de travaux jonglent entre plusieurs projets, les ouvriers sur site ont besoin de mises à jour rapides, et les équipes bureau demandent une planification détaillée. Une seule interface ne peut pas servir tous ces besoins de manière égale.',
      introP2: 'Toolkit a abordé le problème différemment. Plutôt que de construire une énième solution complète, nous nous sommes concentrés sur les workflows essentiels que les équipes de construction utilisent quotidiennement : planifier les tâches par zones, suivre l\'avancement, gérer les documents, coordonner les équipes. Le défi était d\'offrir de la sophistication sans complexité.',
      roleTitle: 'Mon rôle',
      roleDesc: 'J\'ai rejoint l\'équipe comme seul designer dans un trio. Le CEO apportait l\'expertise métier acquise en années de recherche sur les workflows du bâtiment. Le lead développeur construisait les fondations techniques. Mon rôle : transformer les exigences business en un produit scalable que les utilisateurs adopteraient vraiment. Pas d\'équipe design, pas de researchers, pas de product managers. Juste une collaboration serrée, une validation continue et des itérations rapides.',
      projectTitle: 'Projet et impact',
      projectP1: 'Sur 12 mois, nous sommes passés du prototype de financement à la maturité plateforme. Chaque phase ajoutait de la sophistication tout en maintenant la simplicité. La révélation progressive cachait la complexité jusqu\'au moment opportun. Les interfaces context-aware s\'adaptaient aux tâches utilisateur. Les opérations par lot réduisaient les actions répétitives. La hiérarchie visuelle prévenait la surcharge d\'information à grande échelle.',
      projectP2: 'L\'approche a fonctionné. Les clients entreprise ont déployé dès le lancement. Les utilisateurs gérant plus de 15 chantiers ont adopté la plateforme. Le produit a atteint 2 000 clients payants en 24 mois et sécurisé une levée Série A. Cette étude de cas montre comment nous y sommes arrivés.',
    },
    context: {
      title: 'Contexte et approche',
      intro: 'Trois phases, du prototype de financement à la maturité plateforme. La Phase 1 a sécurisé le financement initial avec les fonctionnalités core. La Phase 2 a ajouté des interactions sophistiquées et le support multi-projets. La Phase 3 a atteint l\'optimisation mobile et la scalabilité du design system. Résultat : 2 000 clients, adoption entreprise, Série A en moins de 24 mois.',
      coreChallenge: 'Défi design central',
      coreChallengeDesc: 'Interface de planification montrant la tension fondamentale : les projets de construction contiennent 50-100+ tâches réparties sur plusieurs zones et timelines.',
      research: 'Processus de recherche',
      researchDesc: 'Validation lean dans une équipe de trois. Microsoft Clarity fournissait l\'analytics comportemental. Le CEO menait 5-7 appels utilisateurs par semaine.',
      foundation: 'Fondation',
      foundationDesc: 'Scope MVP sécurisant le financement initial. Infrastructure core : auth sans mot de passe, navigation double sidebar, workflows projet.',
      creationWorkflow: 'Workflow de création projet',
      creationWorkflowDesc: 'Processus en quatre étapes, des bases du projet au lancement de l\'équipe. Design en révélation progressive : étapes de setup visibles pendant la création, se réduisant automatiquement une fois le projet actif.',
      interactionPrinciples: 'Principes d\'interaction core',
      interactionPrinciplesDesc: 'Principes de design évitant la surcharge fonctionnelle. Révélation progressive, conscience du contexte, efficacité par lot, hiérarchie visuelle.',
    },
    phase1: {
      title: 'Phase 1 - Fondation',
      firstTimeExp: 'Première expérience',
      passwordlessAuth: 'Authentification sans mot de passe',
      passwordlessAuthDesc: 'La connexion par magic link élimine la friction des mots de passe pour les ouvriers sur site qui partagent les appareils.',
      emptyState: 'État vide',
      emptyStateDesc: 'Accueil des nouveaux utilisateurs avec introduction de la navigation sidebar principale.',
      formPattern: 'Pattern de formulaire',
      formPatternDesc: 'Approche mobile-first utilisée dans toute l\'application.',
      chantierV1: 'Détail Chantier v1',
      chantierV1Desc: 'Layout desktop initial établissant l\'architecture double sidebar.',
      chantierV2: 'Détail Chantier v2',
      chantierV2Desc: 'Suppression des métadonnées vers la vue d\'édition. Seules les informations de contact restent visibles au premier coup d\'œil.',
      showHideNav: 'Navigation afficher/masquer',
      showHideNavDesc: 'Sidebar secondaire se réduisant et s\'étendant à la demande. Sections de setup (zones, entreprises, bibliothèques de tâches) visibles pendant la création du projet, se réduisant une fois le projet actif. Sections opérations (planning, documents, observations) apparaissant comme navigation principale. Révélation progressive : complexité cachée jusqu\'au moment pertinent, interface s\'adaptant au cycle de vie du projet.',
      navShowHide: 'Navigation afficher/masquer',
      navShowHideDesc: 'Sidebar secondaire se réduisant et s\'étendant à la demande.',
      tasks: 'Tâches',
      taskCreation: 'Création de tâches',
      taskCreationDesc: 'Création de tâches assistée pour ajout rapide et paramétrage de chaque phase du projet.',
      sequences: 'Séquences',
      taskSequences: 'Séquences de tâches',
      taskSequencesDesc: 'Le templating fait partie de l\'ADN de Toolkit. Le planificateur peut définir et sauvegarder des séquences de tâches dans une bibliothèque pour accélérer la planification de chantier.',
      planning: 'Planning',
      planningV1: 'Planning v1',
      planningV1Desc: 'Premier canvas de planning avec une esthétique de cartes colorées. Le poids visuel élevé fonctionnait bien avec 10-15 tâches mais devenait écrasant au-delà de 50-100+ tâches.',
      taskComponentV1: 'Composant tâche v1',
      taskComponentV1Desc: 'Tailles et variations multiples pour différents contextes d\'affichage.',
      taskComponentV2: 'Composant tâche v2',
      taskComponentV2Desc: 'Système raffiné avec quatre états d\'interaction. Hauteur réduite, couleurs désaturées, contraste amélioré.',
      planningV2: 'Planning v2',
      planningV2Desc: 'Évolution du canvas de planning avec système visuel raffiné. Zones multiples et 50+ tâches visibles simultanément sans surcharger l\'interface.',
      multiSelect: 'Multi-sélection',
      multiSelectDesc: 'Glissement rectangulaire permettant des opérations par lot sur les zones et la timeline.',
      contextMenu: 'Menu contextuel',
      contextMenuDesc: 'S\'adaptant à la tâche sélectionnée avec actions priorisées.',
      adaptiveZoom: 'Zoom adaptatif',
      adaptiveZoomDesc: 'Contrôles de vue basculant entre échelles jour, semaine, mois.',
      expandLayout: 'Extension du layout sur la vue planning',
      expandLayoutDesc: 'Pour améliorer la facilité d\'utilisation sur le planning, nous avons implémenté un moyen d\'étendre le layout pour se concentrer sur la gestion des tâches, sans confusion avec le panneau de navigation.',
      expandLayoutCaption: 'Extension du layout',
      expandLayoutCaptionDesc: 'Zoom avant et arrière sur le canvas de planning pour une meilleure concentration.',
    },
    phase2: {
      title: 'Phase 2 - Expansion fonctionnelle',
      intro: 'La fondation validée, la Phase 2 s\'est concentrée sur l\'expansion des capacités tout en maintenant la simplicité. Nous avons introduit un système de menu dynamique qui s\'adapte au contexte utilisateur, réduisant la charge cognitive et fluidifiant les workflows. Le défi était d\'ajouter des fonctionnalités puissantes sans encombrer l\'interface.',
      dynamicMenu: 'Système de menu dynamique',
      dynamicMenuDesc: 'Le menu dynamique s\'adapte au contexte de la tâche courante. En éditant une tâche, les actions pertinentes apparaissent immédiatement. En consultant les logs d\'activité, les options de filtrage prennent la priorité. Cette conscience du contexte réduit les étapes de navigation et garde les utilisateurs concentrés sur leur workflow actuel.',
      dynamicIsland: 'Menu île dynamique',
      dynamicIslandDesc: 'Modification de tâche contextuelle avec actions rapides et mises à jour de statut.',
      taskManipulation: 'Manipulation de tâches dans le planning',
      taskManipulationDesc: 'Modifier la durée et les informations de tâche à la volée directement depuis le canvas de planning.',
      taskManipulationCaption: 'Manipulation de tâches',
      taskManipulationCaptionDesc: 'Modifier la durée et les informations de tâche à la volée.',
      batchEdition: 'Édition par lot',
      batchEditionDesc: 'Sélectionner une zone ou plusieurs tâches sur le canvas, appliquer des paramètres en 20 secondes. Les utilisateurs gérant 50-100+ tâches ont besoin de moyens efficaces pour appliquer des changements sur des groupes.',
      batchEditionCaption: 'Édition par lot',
      batchEditionCaptionDesc: 'Sélectionner une zone ou plusieurs tâches sur le canvas, appliquer des paramètres en 20 secondes.',
      interfaceSystem: 'Système d\'interface',
      interfaceSystemDesc: 'Architecture de composants pour le menu dynamique, assurant la cohérence à travers différents contextes.',
      activitySection: 'Comportement section activité',
      activitySectionDesc: 'Vue détail tâche avec menu dynamique montrant le log d\'activité et les actions contextuelles.',
    },
    phase3: {
      title: 'Phase 3 - Maturité plateforme',
      intro: 'La Phase 3 a apporté la maturité plateforme avec le hub projet et l\'évolution mobile. Les clients entreprise avaient besoin de gérer plusieurs chantiers depuis un dashboard unique. Les ouvriers sur site avaient besoin d\'un accès mobile équivalent à l\'expérience desktop. Nous avons livré les deux sans compromis.',
      projectHub: 'Hub projet',
      projectHubDesc: 'Le hub projet offre une vue d\'ensemble de tous les chantiers. Les managers peuvent rapidement évaluer l\'avancement, identifier les blocages et explorer des projets spécifiques. Les indicateurs visuels font remonter les éléments urgents sans nécessiter une navigation profonde.',
      projectHubV3: 'Hub projet v3',
      projectHubV3Desc: 'Dashboard multi-sites avec indicateurs de progression, actions rapides et capacités de filtrage.',
      mobileEvolution: 'Évolution mobile',
      mobileEvolutionDesc: 'La construction se passe sur site, souvent dans des conditions difficiles. L\'expérience mobile devait être robuste, rapide et utilisable avec des gants. Nous avons reconçu le système de navigation pour une interaction tactile-first tout en maintenant la parité fonctionnelle avec le desktop.',
      mobileNav: 'Évolution navigation mobile',
      mobileNavDesc: 'Système de menu optimisé tactile avec support des gestes et zones d\'action accessibles au pouce.',
    },
    designSystem: {
      title: 'Fondation design system',
      intro: 'Une équipe de trois personnes ne peut pas se permettre de redesigner des composants pour chaque fonctionnalité. Nous avons construit un design system qui scale avec le produit : composants réutilisables, patterns cohérents et langage visuel partagé. Cette fondation a permis une itération rapide tout en maintenant la qualité.',
      ds: 'Design system',
      dsDesc: 'Bibliothèque de composants avec tokens, patterns et guidelines d\'usage pour une implémentation cohérente.',
      iconSystem: 'Système d\'icônes',
      iconSystemDesc: 'Set d\'icônes personnalisé pour fichiers et dossiers, optimisé pour la gestion documentaire du bâtiment.',
    },
    impact: {
      title: 'Impact',
      intro: 'L\'approche design a livré des résultats business mesurables. En nous concentrant sur les workflows core et la complexité progressive, nous avons créé un produit que les clients entreprise comme les petites équipes pouvaient adopter rapidement. Les chiffres parlent d\'eux-mêmes.',
      projectImpact: 'Impact projet',
      projectImpactDesc: 'Métriques clés et jalons atteints sur le cycle de développement produit de 12 mois.',
      customers: '2 000+',
      customersDesc: 'Clients payants en 24 mois après le lancement',
      seriesA: 'Série A',
      seriesADesc: 'Financement sécurisé en novembre 2025',
      enterprise: 'Entreprise',
      enterpriseDesc: 'Clients gérant plus de 15 chantiers ont adopté dès le lancement',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Périmètre',
      period: 'Période',
      phase: 'Phase',
    },
    captions: {
      hero: 'Toolkit App',
      heroDesc: 'Logiciel de gestion de chantier qui fonctionne vraiment.',
      overview: 'Vue d\'ensemble Toolkit',
      overviewDesc: 'Maturité plateforme avec interfaces web et mobile.',
      productEvolution: 'Évolution produit',
      productEvolutionDesc: 'Roadmap 12 mois montrant le parcours du prototype à la maturité plateforme.',
      coreChallenge: 'Défi design central',
      coreChallengeDesc: 'Interface de planification montrant la tension fondamentale : 50-100+ tâches sur zones et timelines.',
      research: 'Processus de recherche',
      researchDesc: 'Validation lean dans une équipe de trois avec feedback utilisateur continu.',
      foundation: 'Fondation produit',
      foundationDesc: 'Scope MVP sécurisant le financement initial avec infrastructure core.',
      creationWorkflow: 'Workflow de création projet',
      creationWorkflowDesc: 'Processus en quatre étapes des bases du projet au lancement de l\'équipe.',
      interactionPrinciples: 'Principes d\'interaction core',
      interactionPrinciplesDesc: 'Principes de design évitant la surcharge fonctionnelle à mesure que le produit grandit.',
      passwordlessAuth: 'Authentification sans mot de passe',
      passwordlessAuthDesc: 'La connexion par magic link élimine la friction des mots de passe pour les ouvriers sur site.',
      emptyState: 'État vide',
      emptyStateDesc: 'Accueil des nouveaux utilisateurs avec navigation sidebar principale.',
      formPattern: 'Pattern de formulaire',
      formPatternDesc: 'Approche mobile-first utilisée dans toute l\'application.',
      chantierV1: 'Détail Chantier v1',
      chantierV1Desc: 'Layout desktop initial établissant l\'architecture double sidebar.',
      chantierV2: 'Détail Chantier v2',
      chantierV2Desc: 'Métadonnées déplacées vers la vue d\'édition. Seuls les contacts restent visibles.',
      navShowHide: 'Navigation afficher/masquer',
      navShowHideDesc: 'Sidebar secondaire se réduisant et s\'étendant à la demande.',
      taskCreation: 'Création de tâches',
      taskCreationDesc: 'Création assistée pour ajout rapide et paramétrage de chaque phase.',
      taskSequences: 'Séquences de tâches',
      taskSequencesDesc: 'Le templating fait partie de l\'ADN de Toolkit. Le planificateur peut sauvegarder des séquences.',
      planningV1: 'Planning v1',
      planningV1Desc: 'Premier canvas avec esthétique de cartes colorées. Le poids visuel fonctionnait avec 10-15 tâches mais devenait écrasant à 50-100+ tâches.',
      taskComponentV1: 'Composant tâche v1',
      taskComponentV1Desc: 'Tailles et variations multiples pour différents contextes.',
      taskComponentV2: 'Composant tâche v2',
      taskComponentV2Desc: 'Système raffiné avec quatre états. Hauteur réduite, couleurs désaturées.',
      planningV2: 'Planning v2',
      planningV2Desc: 'Évolution du canvas avec système visuel raffiné. Zones multiples et 50+ tâches visibles simultanément sans surcharger l\'interface.',
      multiSelect: 'Multi-sélection',
      multiSelectDesc: 'Glissement rectangulaire pour opérations par lot sur zones et timeline.',
      contextMenu: 'Menu contextuel',
      contextMenuDesc: 'S\'adaptant à la tâche sélectionnée avec actions priorisées.',
      adaptiveZoom: 'Zoom adaptatif',
      adaptiveZoomDesc: 'Contrôles basculant entre échelles jour, semaine, mois.',
      expandLayout: 'Extension du layout',
      expandLayoutDesc: 'Zoom avant et arrière sur le canvas pour meilleure concentration.',
      dynamicIsland: 'Menu île dynamique',
      dynamicIslandDesc: 'Modification de tâche contextuelle avec actions rapides.',
      taskManipulation: 'Manipulation de tâches',
      taskManipulationDesc: 'Modifier durée et informations à la volée.',
      batchEdition: 'Édition par lot',
      batchEditionDesc: 'Sélectionner zone ou tâches, appliquer paramètres en 20 secondes.',
      interfaceSystem: 'Système d\'interface',
      interfaceSystemDesc: 'Architecture de composants pour le menu dynamique, assurant la cohérence dans tous les contextes.',
      activitySection: 'Section activité',
      activitySectionDesc: 'Vue détail tâche avec menu dynamique, log d\'activité et actions contextuelles.',
      projectHubV3: 'Hub projet v3',
      projectHubV3Desc: 'Dashboard multi-sites avec indicateurs de progression et filtres.',
      mobileNav: 'Navigation mobile',
      mobileNavDesc: 'Système de menu tactile avec support des gestes et zones d\'action accessibles au pouce.',
      designSystem: 'Design system',
      designSystemDesc: 'Bibliothèque de composants avec tokens et guidelines.',
      iconSystem: 'Système d\'icônes',
      iconSystemDesc: 'Set d\'icônes personnalisé pour fichiers et dossiers.',
      projectImpact: 'Impact projet',
      projectImpactDesc: 'Métriques clés et jalons atteints.',
    },
  },
};

// Navigation sections configuration
const sections = [
  { id: 'top', label: 'Top', shortLabel: '' },
  { id: 'hero', label: 'Intro', shortLabel: '' },
  { id: 'overview', label: 'Overview', shortLabel: 'OV' },
  { id: 'context', label: 'Context', shortLabel: 'CT' },
  { id: 'phase1', label: 'Phase 1', shortLabel: 'P1' },
  { id: 'phase2', label: 'Phase 2', shortLabel: 'P2' },
  { id: 'phase3', label: 'Phase 3', shortLabel: 'P3' },
  { id: 'design-system', label: 'Design System', shortLabel: 'DS' },
  { id: 'impact', label: 'Impact', shortLabel: 'IM' },
];

// All media (images + videos) for lightbox navigation
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/toolkit/hero.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/toolkit/toolkit_app_v3.webp', captionKey: 'overview', type: 'image' },
  { src: '/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg', captionKey: 'productEvolution', type: 'image' },
  { src: '/images/toolkit/Diagram_01_-_Problem.svg', captionKey: 'coreChallenge', type: 'image' },
  { src: '/images/toolkit/Diagram_02_-_Research.svg', captionKey: 'research', type: 'image' },
  { src: '/images/toolkit/Diagram_03_-_Foundation.svg', captionKey: 'foundation', type: 'image' },
  { src: '/images/toolkit/Diagram_04_-_Project_creation_workflow.svg', captionKey: 'creationWorkflow', type: 'image' },
  { src: '/images/toolkit/Diagram_05_-_Core_interaction_principles.svg', captionKey: 'interactionPrinciples', type: 'image' },
  { src: '/images/toolkit/authentication_-_magic_link.svg', captionKey: 'passwordlessAuth', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_create_-_empty.svg', captionKey: 'emptyState', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_create_-_modal.svg', captionKey: 'formPattern', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_details_-_v1.svg', captionKey: 'chantierV1', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg', captionKey: 'chantierV2', type: 'image' },
  { src: '/videos/toolkit/video_-_navigation_-_show_hide.mp4', captionKey: 'navShowHide', type: 'video' },
  { src: '/images/toolkit/daktop_-_site_setup_-_tasks_list.svg', captionKey: 'taskCreation', type: 'image' },
  { src: '/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg', captionKey: 'taskSequences', type: 'image' },
  { src: '/images/toolkit/planning_-_v1.svg', captionKey: 'planningV1', type: 'image' },
  { src: '/images/toolkit/Component_Task_v1.svg', captionKey: 'taskComponentV1', type: 'image' },
  { src: '/images/toolkit/Component_Task_v2.svg', captionKey: 'taskComponentV2', type: 'image' },
  { src: '/images/toolkit/planning_-_v2.svg', captionKey: 'planningV2', type: 'image' },
  { src: '/images/toolkit/planning_-_mouse_-_selection_rectangle.svg', captionKey: 'multiSelect', type: 'image' },
  { src: '/images/toolkit/planning_-_mouse_-_right_click.svg', captionKey: 'contextMenu', type: 'image' },
  { src: '/images/toolkit/planning_-_selection_tache_dynamic_menu.svg', captionKey: 'adaptiveZoom', type: 'image' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', captionKey: 'expandLayout', type: 'video' },
  { src: '/images/toolkit/dynamic_island_menu_-_modifier_tache.svg', captionKey: 'dynamicIsland', type: 'image' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', captionKey: 'taskManipulation', type: 'video' },
  { src: '/videos/toolkit/video_-_batch_edition.mp4', captionKey: 'batchEdition', type: 'video' },
  { src: '/images/toolkit/dynamic_menu_-_components_and_interface_system.svg', captionKey: 'interfaceSystem', type: 'image' },
  { src: '/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg', captionKey: 'activitySection', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_index_-_v3.svg', captionKey: 'projectHubV3', type: 'image' },
  { src: '/images/toolkit/evolution_mobile_menu.svg', captionKey: 'mobileNav', type: 'image' },
  { src: '/images/toolkit/Design_system.svg', captionKey: 'designSystem', type: 'image' },
  { src: '/images/toolkit/system_-_icons_-_files_and_folders.svg', captionKey: 'iconSystem', type: 'image' },
  { src: '/images/toolkit/Diagram_06_-_Impact.svg', captionKey: 'projectImpact', type: 'image' },
];

// Gallery Card component with Apple TV-style 3D tilt effect
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
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
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.2)' }}
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
        {item.captionDesc && <span className="hidden sm:inline"> — {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// ============================================================================
// PHASES DATA - Three phases to market-fit
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Foundation",
      duration: "Months 1-3",
      icon: Layers,
      description: "Establishing the core architecture and essential workflows.",
      features: [
        "Core authentication & navigation architecture",
        "Project creation & management workflows",
        "Task library with drag-drop sequences",
        "Planning V1 with colorful task cards",
        "Subscription system (individual + enterprise)",
        "PDF export functionality"
      ]
    },
    {
      id: 2,
      title: "Feature Expansion",
      duration: "Months 4-8",
      icon: Zap,
      description: "Enhancing interactivity and visual systems.",
      features: [
        "Advanced planning interactions (multi-select)",
        "Dynamic island adaptive menu system",
        "Refined task card aesthetic (V2 visual system)",
        "Fluid zoom timeline (daily to quarterly)",
        "Project hub for multi-site managers",
        "Stakeholder management features"
      ]
    },
    {
      id: 3,
      title: "Platform Maturity",
      duration: "Months 9-12",
      icon: Trophy,
      description: "Scalability, mobile strategy, and refinement.",
      features: [
        "Visual complexity management (hierarchy)",
        "Mobile strategy with platform-specific design",
        "Navigation evolution (direct access)",
        "Consolidated mobile navigation (4 groups)",
        "Activity enrichment (photo annotation)",
        "Design system scalability (120+ screens)"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Fondation",
      duration: "Mois 1-3",
      icon: Layers,
      description: "Architecture core et workflows essentiels.",
      features: [
        "Architecture authentification & navigation",
        "Workflows création & gestion projet",
        "Bibliothèque tâches avec séquences drag-drop",
        "Planning V1 avec cartes colorées",
        "Système abonnement (individuel + entreprise)",
        "Export PDF"
      ]
    },
    {
      id: 2,
      title: "Expansion Features",
      duration: "Mois 4-8",
      icon: Zap,
      description: "Interactions enrichies et systèmes visuels.",
      features: [
        "Interactions planning avancées (multi-sélection)",
        "Système menu adaptatif dynamic island",
        "Esthétique cartes tâches affinée (V2)",
        "Zoom fluide timeline (jour à trimestre)",
        "Hub projet pour managers multi-sites",
        "Gestion des parties prenantes"
      ]
    },
    {
      id: 3,
      title: "Maturité Plateforme",
      duration: "Mois 9-12",
      icon: Trophy,
      description: "Scalabilité, stratégie mobile et raffinement.",
      features: [
        "Gestion complexité visuelle (hiérarchie)",
        "Stratégie mobile platform-specific",
        "Évolution navigation (accès direct)",
        "Navigation mobile consolidée (4 groupes)",
        "Enrichissement activité (annotation photo)",
        "Scalabilité design system (120+ écrans)"
      ]
    }
  ]
};

// ============================================================================
// PRODUCT EVOLUTION DIAGRAM - Interactive carousel
// ============================================================================

const ProductEvolutionDiagram: React.FC<{
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ isDark, lang }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const phases = PHASES_DATA[lang];

  // Swipe logic for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (activePhase < phases.length - 1) setActivePhase(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activePhase > 0) setActivePhase(prev => prev - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const texts = {
    focus: lang === 'fr' ? 'Focus' : 'Focus',
    overview: lang === 'fr' ? 'Vue d\'ensemble' : 'Overview',
    keyDeliverables: lang === 'fr' ? 'Livrables clés' : 'Key Deliverables',
    phase: lang === 'fr' ? 'Phase' : 'Phase',
    more: lang === 'fr' ? 'de plus' : 'more'
  };

  return (
    <div className="mt-8">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className={`inline-flex rounded-full p-1 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <button
            onClick={() => setViewMode('focus')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'focus'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.focus}
          </button>
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'overview'
                ? isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {texts.overview}
          </button>
        </div>
      </div>

      {viewMode === 'focus' ? (
        /* Focus View */
        <div
          className="relative touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {phases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhase(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activePhase
                    ? `w-12 ${isDark ? 'bg-white' : 'bg-gray-900'}`
                    : `w-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          {/* Card Container */}
          <div className="relative h-[480px] md:h-[420px]">
            {phases.map((phase, idx) => {
              const isActive = idx === activePhase;
              const isPrev = idx < activePhase;
              const isNext = idx > activePhase;
              const PhaseIcon = phase.icon;

              return (
                <div
                  key={phase.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out origin-bottom
                    ${isActive ? 'opacity-100 scale-100 translate-x-0 z-20' : ''}
                    ${isPrev ? 'opacity-0 scale-95 -translate-x-12 z-10 pointer-events-none' : ''}
                    ${isNext ? 'opacity-0 scale-95 translate-x-12 z-10 pointer-events-none' : ''}
                  `}
                >
                  <div className={`rounded-3xl overflow-hidden h-full flex flex-col md:flex-row ${
                    isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-xl border border-gray-100'
                  }`}>
                    {/* Left: Identity */}
                    <div className={`md:w-1/3 p-8 md:p-10 flex flex-col justify-between ${
                      isDark ? 'bg-white/5 border-b md:border-b-0 md:border-r border-white/10' : 'bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100'
                    }`}>
                      <div>
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${
                          isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'
                        }`}>
                          <PhaseIcon size={26} strokeWidth={2} />
                        </div>
                        <div className={`uppercase tracking-widest text-[10px] font-bold mb-2 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {texts.phase} {phase.id}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-bold leading-tight mb-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {phase.title}
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                          isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {phase.duration}
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed mt-6 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {phase.description}
                      </p>
                    </div>

                    {/* Right: Features */}
                    <div className="md:w-2/3 p-8 md:p-10 overflow-y-auto">
                      <h4 className={`text-xs font-semibold uppercase tracking-wider mb-6 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {texts.keyDeliverables}
                      </h4>
                      <ul className="space-y-4">
                        {phase.features.map((feature, fIdx) => (
                          <motion.li
                            key={fIdx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                            transition={{ delay: isActive ? 0.2 + fIdx * 0.08 : 0, duration: 0.4 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                            <span className={`text-sm md:text-base font-medium leading-relaxed ${
                              isDark ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-2 md:-mx-4 z-50">
            <button
              onClick={handlePrev}
              disabled={activePhase === 0}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={activePhase === phases.length - 1}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        /* Overview View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase) => {
            const PhaseIcon = phase.icon;
            return (
              <div
                key={phase.id}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-white shadow-sm hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDark
                      ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                      : 'bg-gray-100 text-gray-700 group-hover:bg-gray-900 group-hover:text-white'
                  }`}>
                    <PhaseIcon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {texts.phase} {phase.id}
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {phase.duration}
                    </div>
                  </div>
                </div>

                <h4 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {phase.title}
                </h4>

                <div className="space-y-2">
                  {phase.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        isDark ? 'bg-white/30 group-hover:bg-emerald-400' : 'bg-gray-300 group-hover:bg-emerald-500'
                      }`} />
                      <span className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                  {phase.features.length > 4 && (
                    <div className={`text-xs italic pl-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      + {phase.features.length - 4} {texts.more}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ToolkitPage: React.FC<ToolkitPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en'
}) => {
  const t = TOOLKIT_TRANSLATIONS[lang];
  // Load gallery items directly in the component
  const galleryItems = getToolkitGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>('executive');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  // Video refs for tracking currentTime
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Project metadata
  const projectMeta = {
    type: 'Product Design',
    scope: 'Web, App, Branding',
    phase: 'Zero to One',
    period: '2023-2025',
  };

  // Scroll to top when mode changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [caseStudyMode, viewMode]);

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
  }, []);

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

  // Get progress percentage
  const getProgress = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    return ((currentIndex + 1) / sections.length) * 100;
  };

  // Open lightbox with specific image and optional start time for videos
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        viewMode === 'gallery' ? 'bg-black' : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >
      {/* Mobile Navigation - Sticky under header - Hidden in gallery mode and executive mode */}
      <AnimatePresence>
        {showNav && viewMode !== 'gallery' && caseStudyMode !== 'executive' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-30 backdrop-blur-xl ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/80'
                : 'bg-white/80'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <div className="w-full px-6">
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full h-12 flex items-center justify-between"
              >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-blue-500`} />
                <span
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {sections.find(s => s.id === activeSection)?.label || 'Top'}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isMobileNavExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown
                  size={20}
                  className={systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                />
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
                  <div className={`pb-3 space-y-1 border-t ${
                    systemTheme === 'dark' ? 'border-white/5' : 'border-gray-100'
                  }`}>
                    {sections.map((section) => {
                      const isActive = activeSection === section.id;
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      const sectionIndex = sections.findIndex(s => s.id === section.id);
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
                              ? systemTheme === 'dark'
                                ? 'bg-blue-600/10 text-blue-400'
                                : 'bg-blue-50 text-blue-600'
                              : systemTheme === 'dark'
                                ? 'text-gray-400 hover:bg-white/5'
                                : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive
                                ? 'bg-blue-600'
                                : isPast
                                  ? systemTheme === 'dark'
                                    ? 'bg-gray-500'
                                    : 'bg-gray-400'
                                  : systemTheme === 'dark'
                                    ? 'bg-gray-700'
                                    : 'bg-gray-300'
                            }`}
                          />
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
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          viewMode === 'gallery'
            ? 'bg-black/80'
            : (systemTheme === 'dark' ? 'bg-[#0a0a0a]/80' : 'bg-white/80')
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          {/* Left - Title - Same style as Homepage nav */}
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
                viewMode === 'gallery' ? 'text-white' : (systemTheme === 'dark' ? 'text-white' : 'text-gray-900')
              }`}
            >
              Toolkit
            </h1>
          </div>

          {/* Center - Toggle Switch with animated pill (compact on mobile) */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                viewMode === 'gallery' ? 'bg-white/10' : (systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100')
              }`}
            >
              {/* Executive button */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'executive' && (
                  <motion.div
                    layoutId="toolkit-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'executive'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
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
                    layoutId="toolkit-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (viewMode === 'gallery' ? 'text-gray-400 hover:text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
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
                    layoutId="toolkit-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery' ? 'text-white' : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
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
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                viewMode === 'gallery'
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : (systemTheme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5')
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </header>

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
        projectId="toolkit"
        updateUrl={true}
      />

      {/* Content - Switch between Case Study and Gallery */}
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
          /* Executive Summary View */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ToolkitExecutive
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
            {/* Hero Section - Title + Logo + Testimonial */}
            <section id="hero" className="mb-16 md:mb-24">
          {/* Logo at top-left */}
          <img loading="lazy"
            src={systemTheme === 'dark'
              ? '/images/toolkit/Logo toolkit - dark bg - large - horizontal.svg'
              : '/images/toolkit/Logo toolkit - light bg - large - horizontal.svg'
            }
            alt="Toolkit"
            className="h-8 md:h-10 w-auto mb-8"
          />

          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Left Column - Title and Description */}
            <div className="md:col-span-3">
              {/* Meta tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.hero.tags}
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  -
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.hero.zeroToOne}
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  -
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.meta.period}
                </span>
              </div>

              {/* Main Title */}
              <h1
                className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <h2
                className={`text-xl md:text-2xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {t.hero.subtitle}
              </h2>

              {/* Description */}
              <p
                className={`text-base leading-relaxed mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.hero.description}
              </p>

              {/* Visit Website Button */}
              <a
                href="https://toolkit-app.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  systemTheme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <ExternalLink size={16} className="mr-2" />
                {t.visitToolkit}
              </a>
            </div>

            {/* Right Column - Testimonial */}
            <div className="md:col-span-2">
              {/* Testimonial Card */}
              <div
                className={`p-6 rounded-2xl border ${
                  systemTheme === 'dark'
                    ? 'bg-yellow-900/20 border-yellow-500/20'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <Quote
                  size={24}
                  className={`mb-4 ${
                    systemTheme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                />
                <p
                  className={`text-sm italic leading-relaxed mb-4 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t.testimonial.quote}
                </p>
                <div className="flex items-center space-x-3">
                  <img loading="lazy"
                    src="/images/pierre-marie-nigay.webp"
                    alt={t.testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {t.testimonial.author}
                    </p>
                    <p
                      className={`text-xs ${
                        systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
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
            systemTheme === 'dark'
              ? 'bg-[#1D1D1F] border-white/10'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50'
                }`}
              >
                <Layers
                  size={20}
                  className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                />
              </div>
              <div>
                <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Type
                </p>
                <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {projectMeta.type}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                }`}
              >
                <Briefcase
                  size={20}
                  className={systemTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
                />
              </div>
              <div>
                <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Scope
                </p>
                <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {projectMeta.scope}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-green-500/20' : 'bg-green-50'
                }`}
              >
                <Calendar
                  size={20}
                  className={systemTheme === 'dark' ? 'text-green-400' : 'text-green-600'}
                />
              </div>
              <div>
                <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Period
                </p>
                <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {projectMeta.period}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}
              >
                <Rocket
                  size={20}
                  className={systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600'}
                />
              </div>
              <div>
                <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Phase
                </p>
                <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {projectMeta.phase}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <figure className="mb-16">
          <div
            onClick={() => openLightbox('/images/toolkit/hero.webp')}
            className={`rounded-2xl overflow-hidden border cursor-pointer ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <img loading="lazy"
              src="/images/toolkit/hero.webp"
              alt="Toolkit App Overview"
              className="w-full h-auto"
            />
          </div>
        </figure>

        {/* Overview Section */}
        <section id="overview" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-2 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.overview.title}
          </h1>
          <hr
            className={`mb-8 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {/* Introduction */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.overview.introTitle}
              </h2>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.overview.introP1}
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.overview.introP2}
              </p>
            </div>

            {/* My Role */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.overview.roleTitle}
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.overview.roleDesc}
              </p>
            </div>

            {/* Project and Impact */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.overview.projectTitle}
              </h2>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.overview.projectP1}
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.overview.projectP2}
              </p>
            </div>
          </div>
        </section>

        {/* Context and Approach Section */}
        <section id="context" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.context.title}
          </h1>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.context.intro}
          </p>

          {/* Interactive Three Phases to Market-Fit */}
          <div className="mb-12">
            <ProductEvolutionDiagram isDark={systemTheme === 'dark'} lang={lang} />
          </div>

          {/* Core Design Challenge, Research, Foundation */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_01_-_Problem.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-square ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Diagram_01_-_Problem.svg"
                  alt="Core Design Challenge"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.context.coreChallenge}</strong> - {t.context.coreChallengeDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_02_-_Research.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-square ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Diagram_02_-_Research.svg"
                  alt="Research process"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.context.research}</strong> - {t.context.researchDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_03_-_Foundation.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-square ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Diagram_03_-_Foundation.svg"
                  alt="Foundation"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.context.foundation}</strong> - {t.context.foundationDesc}
              </figcaption>
            </figure>
          </div>

          {/* Project Creation Workflow, Core Interaction Principles */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_04_-_Project_creation_workflow.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Diagram_04_-_Project_creation_workflow.svg"
                  alt="Project Creation Workflow"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.context.creationWorkflow}</strong> - {t.context.creationWorkflowDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_05_-_Core_interaction_principles.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Diagram_05_-_Core_interaction_principles.svg"
                  alt="Core Interaction Principles"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.context.interactionPrinciples}</strong> - {t.context.interactionPrinciplesDesc}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 1 - Foundation */}
        <section id="phase1" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-8 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.phase1.title}
          </h1>

          {/* 1st Time Experience */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.phase1.firstTimeExp}
          </h2>

          {/* Authentication & Empty State */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/authentication_-_magic_link.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/authentication_-_magic_link.svg"
                  alt="Passwordless authentication"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.passwordlessAuth}</strong> - {t.captions.passwordlessAuthDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_create_-_empty.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/desktop_-_chantier_-_create_-_empty.svg"
                  alt={t.captions.emptyState}
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.emptyState}</strong> - {t.captions.emptyStateDesc}
              </figcaption>
            </figure>
          </div>

          {/* Form & Detail v1 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_create_-_modal.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/desktop_-_chantier_-_create_-_modal.svg"
                  alt="Form design pattern"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.formPattern}</strong> - {t.captions.formPatternDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_details_-_v1.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/desktop_-_chantier_-_details_-_v1.svg"
                  alt="Chantier Detail v1"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.chantierV1}</strong> - {t.captions.chantierV1Desc}
              </figcaption>
            </figure>
          </div>

          {/* Chantier Detail v2 - Full width */}
          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_details_-_v2.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/desktop_-_chantier_-_details_-_v2.svg"
                alt="Chantier Detail v2"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.chantierV2}</strong> - {t.captions.chantierV2Desc}
            </figcaption>
          </figure>

          {/* Show and Hide navigation */}
          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Show and Hide navigation
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Secondary sidebar collapsing and expanding on demand. Setup sections (zones, companies, task libraries) prominent during project creation, collapsing once project active. Operations sections (planning, documents, observations) surfacing as primary navigation. Progressive disclosure: complexity hidden until relevant, interface adapting to project lifecycle stage.
          </p>

          <figure className="mb-8">
            <div
              onClick={() => {
                const currentTime = videoRefs.current['nav-show-hide']?.currentTime || 0;
                openLightbox('/videos/toolkit/video_-_navigation_-_show_hide.mp4', currentTime);
              }}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                ref={(el) => { videoRefs.current['nav-show-hide'] = el; }}
                src="/videos/toolkit/video_-_navigation_-_show_hide.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.navShowHide}</strong> - {t.captions.navShowHideDesc}
            </figcaption>
          </figure>

          {/* Divider */}
          <hr
            className={`my-12 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          {/* Tasks */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Tasks
          </h2>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/daktop_-_site_setup_-_tasks_list.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/daktop_-_site_setup_-_tasks_list.svg"
                alt="Task creation interface"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.taskCreation}</strong> - {t.captions.taskCreationDesc}
            </figcaption>
          </figure>

          {/* Sequences */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Sequences
          </h2>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg"
                alt="Tasks sequences interface"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.taskSequences}</strong> - {t.captions.taskSequencesDesc}
            </figcaption>
          </figure>

          {/* Divider */}
          <hr
            className={`my-12 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          {/* Planning */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Planning
          </h2>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/planning_-_v1.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/planning_-_v1.svg"
                alt="Planning interface v1"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.planningV1}</strong> - {t.captions.planningV1Desc}
            </figcaption>
          </figure>

          {/* Task Components v1 & v2 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Component_Task_v1.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Component_Task_v1.svg"
                  alt="Task component v1"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.taskComponentV1}</strong> - {t.captions.taskComponentV1Desc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Component_Task_v2.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/Component_Task_v2.svg"
                  alt="Task component v2"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.taskComponentV2}</strong> - {t.captions.taskComponentV2Desc}
              </figcaption>
            </figure>
          </div>

          {/* Planning v2 */}
          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/planning_-_v2.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/planning_-_v2.svg"
                alt="Planning interface v2"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.planningV2}</strong> - {t.captions.planningV2Desc}
            </figcaption>
          </figure>

          {/* Planning Interactions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/planning_-_mouse_-_selection_rectangle.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/planning_-_mouse_-_selection_rectangle.svg"
                  alt="Multi-select"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.multiSelect}</strong> - {t.captions.multiSelectDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/planning_-_mouse_-_right_click.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/planning_-_mouse_-_right_click.svg"
                  alt="Context menu"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.contextMenu}</strong> - {t.captions.contextMenuDesc}
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/planning_-_selection_tache_dynamic_menu.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/toolkit/planning_-_selection_tache_dynamic_menu.svg"
                  alt="Adaptive zoom"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.adaptiveZoom}</strong> - {t.captions.adaptiveZoomDesc}
              </figcaption>
            </figure>
          </div>

          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Expand layout on planning view
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            To enhance ease of use on the planning we implemented a way to expand the layout to focus on task management, without getting confusion with navigation panel.
          </p>

          <figure className="mb-8">
            <div
              onClick={() => {
                const currentTime = videoRefs.current['planning-zoom']?.currentTime || 0;
                openLightbox('/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', currentTime);
              }}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                ref={(el) => { videoRefs.current['planning-zoom'] = el; }}
                src="/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.expandLayout}</strong> - {t.captions.expandLayoutDesc}
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 2 - Feature expansion */}
        <section id="phase2" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.phase2.title}
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.phase2.intro}
          </p>

          {/* Dynamic Menu */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.phase2.dynamicMenu}
          </h2>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.phase2.dynamicMenuDesc}
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/dynamic_island_menu_-_modifier_tache.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/dynamic_island_menu_-_modifier_tache.svg"
                alt="Dynamic island menu - task modification"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.dynamicIsland}</strong> - {t.captions.dynamicIslandDesc}
            </figcaption>
          </figure>

          {/* Task manipulation video */}
          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Task manipulation in planning
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Edit duration and task information on the fly directly from the planning canvas.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => {
                const currentTime = videoRefs.current['task-manipulation']?.currentTime || 0;
                openLightbox('/videos/toolkit/video_-_task_manipulation.mp4', currentTime);
              }}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                ref={(el) => { videoRefs.current['task-manipulation'] = el; }}
                src="/videos/toolkit/video_-_task_manipulation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.taskManipulation}</strong> - {t.captions.taskManipulationDesc}
            </figcaption>
          </figure>

          {/* Batch edition video */}
          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Batch edition
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds. Users managing 50-100+ tasks need efficient ways to apply changes across groups.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => {
                const currentTime = videoRefs.current['batch-edition']?.currentTime || 0;
                openLightbox('/videos/toolkit/video_-_batch_edition.mp4', currentTime);
              }}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                ref={(el) => { videoRefs.current['batch-edition'] = el; }}
                src="/videos/toolkit/video_-_batch_edition.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.batchEdition}</strong> - {t.captions.batchEditionDesc}
            </figcaption>
          </figure>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/dynamic_menu_-_components_and_interface_system.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/dynamic_menu_-_components_and_interface_system.svg"
                alt="Dynamic menu components and interface system"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.interfaceSystem}</strong> - {t.captions.interfaceSystemDesc}
            </figcaption>
          </figure>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg"
                alt="Task detail with activity section"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.activitySection}</strong> - {t.captions.activitySectionDesc}
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 3 - Platform maturity */}
        <section id="phase3" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.phase3.title}
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.phase3.intro}
          </p>

          {/* Project Hub */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.phase3.projectHub}
          </h2>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.phase3.projectHubDesc}
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_index_-_v3.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/desktop_-_chantier_-_index_-_v3.svg"
                alt="Project hub - construction site index v3"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.projectHubV3}</strong> - {t.captions.projectHubV3Desc}
            </figcaption>
          </figure>

          {/* Mobile Evolution */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Mobile evolution
          </h2>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Construction happens on-site, often in challenging conditions. The mobile experience needed to be robust, fast, and usable with gloves. We redesigned the navigation system for touch-first interaction while maintaining feature parity with desktop.
          </p>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/evolution_mobile_menu.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/evolution_mobile_menu.svg"
                alt="Mobile menu evolution"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.captions.mobileNav}</strong> - {t.captions.mobileNavDesc}
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Design System Foundation */}
        <section id="design-system" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.designSystem.title}
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.designSystem.intro}
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/Design_system.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/Design_system.svg"
                alt="Design system overview"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.designSystem.ds}</strong> - {t.designSystem.dsDesc}
            </figcaption>
          </figure>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/system_-_icons_-_files_and_folders.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/system_-_icons_-_files_and_folders.svg"
                alt="Icon system - files and folders"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.designSystem.iconSystem}</strong> - {t.designSystem.iconSystemDesc}
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Impact */}
        <section id="impact" className="mb-16 md:mb-24">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.impact.title}
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t.impact.intro}
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/Diagram_06_-_Impact.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/toolkit/Diagram_06_-_Impact.svg"
                alt="Impact diagram"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>{t.impact.projectImpact}</strong> - {t.impact.projectImpactDesc}
            </figcaption>
          </figure>

          {/* Key Results */}
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-2xl border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.customers}
              </p>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {t.impact.customersDesc}
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.seriesA}
              </p>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {t.impact.seriesADesc}
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.enterprise}
              </p>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {t.impact.enterpriseDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Bottom spacing for mobile nav */}
        <div className="h-20 md:h-0" />
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolkitPage;
