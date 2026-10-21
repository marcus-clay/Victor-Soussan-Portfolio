/**
 * FranceVaeFull - Complete case study with narrative structure
 *
 * Structure based on france_vae_casestudy_v2.md:
 * - Context (before the overview diagram)
 * - Initiative 1: MVP VAE Collective
 * - Initiative 2: Product Operations
 * - Initiative 3: User Research
 * - Initiative 4: Design Thinking Workshops
 * - Initiative 5: AI Experimentation
 * - Learnings
 * - Testimonial
 */

import React, { useRef, useState } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import ExpandableSection from './ExpandableSection';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { motion, useInView } from 'framer-motion';
import { zoomable } from '@/utils/zoomable'
import {
  Stack as Layers,
  ArrowRight,
  Play,
  ArrowSquareOut as ExternalLink,
  Users,
  Lightbulb,
  Robot as Bot,
  CheckCircle as CheckCircle2,
  Target,
  CaretDown as ChevronDown,
} from '@phosphor-icons/react';

interface FranceVaeFullProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onContact?: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  en: {
    meta: {
      role: 'Lead Product Designer',
      scope: 'Product Strategy, Design, Research',
      period: 'Dec 2024 to Jul 2025',
      company: 'beta.gouv.fr',
      type: 'Product Design',
      labels: { type: 'Type', scope: 'Scope', period: 'Period', company: 'Company' }
    },
    ui: {
      focus: 'Focus',
      overview: 'Overview',
      keyDeliverables: 'Key deliverables',
      initiative: 'Initiative',
      carouselLabel: 'The five initiatives',
      previous: 'Previous initiative',
      next: 'Next initiative',
      goTo: 'Go to initiative',
      beforeAlt: 'France VAE homepage before the redesign',
      afterAlt: 'France VAE homepage after the redesign',
      sliderLabel: 'Compare the homepage before and after the redesign',
      videoFallback: 'Your browser does not support the video tag.'
    },
    hero: {
      title: 'Shipping fast in a complex environment',
      subtitle: 'How I led the design team process and co-drove the roadmap to help a government startup ship faster, especially on politically-driven initiatives lacking clear specs.',
      visitSite: 'Visit France VAE',
      heroCaption: 'France VAE Homepage: national public service for VAE'
    },
    context: {
      title: 'Context',
      intro: 'France VAE is the national public service for Validation of Acquired Experience. The platform enables citizens without diplomas to have their professional experience officially recognized to obtain certifications.',
      challenge: 'The challenge',
      challengeText: 'Structure discovery and roadmap planning to accelerate decision-making, while delivering critical features for a service serving 100K+ candidates, often from politically-driven requests lacking mature specs.',
      myScope: 'My scope',
      myScopeText: 'Leading design team process, co-driving the roadmap with the Lead PM, structuring discovery to help the delivery team ship faster. A transversal role covering the entire product cycle.'
    },
    initiative1: {
      title: 'MVP VAE Collective',
      subtitle: 'Employer journey',
      problem: 'The problem',
      problemText: 'Companies wanting to support their employees in a collective VAE process had no dedicated tool. HR teams juggled emails, spreadsheets and phone calls to coordinate cohorts of 10 to 90 candidates.',
      whatIDid: 'What I did',
      discovery: {
        title: 'Discovery (2 weeks)',
        items: [
          'Interviews with HR managers and training center directors',
          'Mapping the existing employer journey (off-platform)',
          'Identifying friction points: candidate tracking, coordinator coordination, progress visibility'
        ]
      },
      design: {
        title: 'Design (3 weeks)',
        items: [
          'Complete employer journey prototype: cohort declaration, employee invitation, progress tracking, validator coordination',
          'B2B pitch deck for commercial outreach',
          'Promotional video (screencast, scenario, script, editing, voiceover) presenting the complete journey'
        ]
      },
      deliverables: {
        title: 'Deliverables',
        items: [
          'Functional MVP ready for deployment',
          'Commercial kit for the field team',
          'Journey documentation for support'
        ]
      },
      impact: 'Structured B2B offer ready for deployment. The sales team has a clear journey and tools to approach companies.',
      prototypeButton: 'Open prototype',
      prototypeCaption: 'VAE Collective employer dashboard: cohort management interface',
      bentoImages: {
        large: { src: '/images/francevae/VAE Collective/vae collective wireframes/interface commanditaires cible@2x.webp', caption: 'VAE Collective employer dashboard - Complete interface overview showing cohort management features' },
        small1: { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'Sales deck slide explaining the 4-step process designed to reduce onboarding friction' },
        small2: { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'ROI visualization for enterprise buyers, translating user value into business language' }
      }
    },
    initiative2: {
      title: 'Structuring product team operations',
      problem: 'The problem',
      problemText: 'The product team operated in fits and starts. Priorities changed frequently, teams worked in silos, and the distinction between exploration and execution remained unclear.',
      whatIDid: 'What I did',
      diagnostic: {
        title: 'Diagnosis (1 week)',
        items: [
          'Audit of current operations with each team',
          'Identifying blockers: lack of cadence, subjective prioritization, lack of cross-team visibility'
        ]
      },
      coDesign: {
        title: 'Co-design with Lead PM (2 weeks)',
        items: [
          'New organizational model: unified contributors around common objectives rather than siloed teams',
          'Three-tier strategic framework: Objectives (the why), Initiatives (the what), Features (the how)',
          'Monthly seasons: Preparation (25%), Execution (50%), Retrospective (25%)'
        ]
      },
      matrix: {
        title: 'Cross-team prioritization matrix',
        items: [
          'Criteria: user value, time criticality, business score, technical effort, specificity degree',
          'Participants: Product, Business, Design, Support, Tech',
          'Transparent and shared scoring formula'
        ]
      },
      deployment: {
        title: 'Deployment (2 weeks)',
        items: [
          'Presentation campaign to each France VAE team',
          'Process adaptation based on feedback',
          'Weekly PO/designer meetings on discovery/delivery planning'
        ]
      },
      impact: 'Faster decisions, stronger alignment. Teams have a clear framework to arbitrate between initiatives.',
      imageCaption: 'Discovery process and monthly seasons framework presented to teams',
      bentoImages: {
        large: { src: '/images/francevae/presentation process_discovery @2x.webp', caption: 'The seasons framework gave teams a shared rhythm: preparation, execution, retrospective' },
        small1: { src: '/images/francevae/schema - equipe 01.webp', caption: 'Team organization before: siloed structure with limited cross-team collaboration' },
        small2: { src: '/images/francevae/schema - equipe 02.webp', caption: 'Team organization after: unified contributors with clear roles and shared rituals' },
        large2: { src: '/images/francevae/presentation_process_discovery_05.webp', caption: 'Initiative lifecycle co-designed with Lead PM Aurélie: deeper problem framing and cross-team prioritization (yellow) before delivery sprints (green lanes)' }
      }
    },
    initiative3: {
      title: 'User Research',
      subtitle: 'Candidate dashboard',
      problem: 'The problem',
      problemText: 'Product decisions were made without consolidated user data. Field feedback existed but remained scattered in individual notes.',
      whatIDid: 'What I did',
      structuring: {
        title: 'Structuring (1 week)',
        items: [
          'Centralized user knowledge base',
          'Weekly rituals with product designers and deployment team'
        ]
      },
      campaigns: {
        title: 'Test campaigns for new dashboard (3 weeks)',
        items: [
          '10 qualitative moderated remote interviews (2 waves)',
          'Test protocols, interview guides, note-taking, recordings',
          'Feedback prioritization tables: quick wins, technical bugs, UX issues, UI fixes, feature requests'
        ]
      },
      presentation: {
        title: 'Presentation',
        items: [
          '2 synthesis reports presented in plenary',
          'Consolidated files for ongoing analysis'
        ]
      },
      impact: 'Operational user knowledge base. Product decisions now rely on structured qualitative data.',
      reportButton: 'View full report',
      imageCaption: 'Candidate dashboard interface tested with users',
      bentoImages: {
        large: { src: '/images/francevae/UXR - Rapport de campangne de test tableau de bord.webp', caption: 'Synthesis report shared in plenary, transforming scattered feedback into actionable product decisions' },
        small1: { src: '/images/francevae/UXR - test - script candidat 01.webp', caption: 'Standardized interview guide ensuring consistent data collection across 10 moderated sessions' },
        small2: { src: '/images/francevae/UXR - test - tableau prio.webp', caption: 'Prioritization matrix categorizing feedback: quick wins, technical bugs, UX issues, feature requests' }
      }
    },
    initiative4: {
      title: 'Design Thinking Workshops',
      subtitle: 'With field practitioners',
      problem: 'The problem',
      problemText: 'The product team lacked direct contact with accompaniment providers, key actors in the VAE journey. Design decisions were made with partial understanding of the business context.',
      whatIDid: 'What I did',
      preparation: {
        title: 'Preparation (1 week)',
        items: [
          'Identifying influential accompaniment structures',
          '2-day program construction',
          'Logistics coordination'
        ]
      },
      facilitation: {
        title: 'Facilitation (2 days)',
        items: [
          'Structured debate on a business issue',
          'Priority theme identification workshops',
          'Ideation sessions on platform problems',
          'Solution concept co-creation with sketches'
        ]
      },
      internal: {
        title: 'Complementary internal workshops',
        items: [
          'Crazy-8 with internal team',
          'Workshops on notification system evolution',
          'Audit and categorization of all user emails'
        ]
      },
      impact: 'Co-creation of grounded solutions. Accompaniment providers became active design partners.',
      imageCaption: 'Design thinking workshop with AAP accompaniment structures',
      bentoImages: {
        large: { src: '/images/francevae/photo atelier aap.webp', caption: 'Accompaniment providers became active design partners, bridging the gap between product team and field reality' },
        small1: { src: '/images/francevae/animation atelier 00.webp', caption: 'Data-driven discovery: surfacing user pain points that shaped the workshop agenda' },
        small2: { src: '/images/francevae/animation atelier 01.webp', caption: 'Six Thinking Hats method: structured divergence before convergence' }
      }
    },
    initiative5: {
      title: 'AI Experimentation',
      subtitle: 'Candidate orientation',
      context: '55% of candidates don\'t know if VAE suits them. Many choose certifications by default. The initiative explored how AI could help candidates identify if VAE fits their profile and match their skills with certifications.',
      whatIDid: 'What I did',
      study: {
        title: 'Prospective study (1 week)',
        items: [
          'User archetype identification: experienced professionals without diplomas, career changers, job seekers in transition',
          'Mapping barriers specific to each profile',
          'Benchmark of existing orientation solutions'
        ]
      },
      ideation: {
        title: 'Ideation (3 days)',
        items: [
          '10+ concepts for engaged and non-engaged candidates',
          'Chatbots, skills-certification matching, career impact simulators, testimonial galleries, local opportunity analyzers'
        ]
      },
      prototyping: {
        title: 'Rapid prototyping (1 week)',
        items: [
          'VAE positioning chatbot: Conversational assistant evaluating VAE relevance based on professional situation',
          'AI orientation with skills radar: Tool analyzing skills via CV/LinkedIn and guiding toward corresponding certifications, with gap visualization'
        ]
      },
      impact: 'Initiative deprioritized but functional prototypes delivered in 1 week. Demonstrated ability to rapidly explore innovative paths without blocking other work.',
      tryDemo: 'Try the demo',
      chatbotCaption: 'AI chatbot prototype: VAE positioning assessment',
      radarCaption: 'Skills radar prototype: career orientation tool'
    },
    learnings: {
      title: 'What I learned',
      items: [
        {
          title: 'Designing for citizens',
          text: 'In public service, success is measured by access, understanding, and empowerment. Classic conversion metrics don\'t apply.'
        },
        {
          title: 'Navigating institutional constraints',
          text: 'Public procurement, regulation, institutional vocabulary: every design decision accounts for an ecosystem of actors with different logics.'
        },
        {
          title: 'Structure before production',
          text: 'In high uncertainty context, investing in process generates more impact than delivering extra screens.'
        },
        {
          title: 'Prototype to de-risk',
          text: 'AI prototypes tested hypotheses in 1 week rather than 2 months of specification. Even deprioritized, they informed product decisions.'
        }
      ]
    },
    testimonial: {
      quote: 'Victor quickly understood the complexity of our environment and knew how to structure design operations while delivering critical features. His ability to navigate institutional constraints while maintaining high design standards was remarkable.',
      author: 'Boris Aimé-Bauderlique',
      role: 'Chargé de déploiement, France VAE'
    },
    uiDelivery: {
      title: 'Shipping features',
      subtitle: 'Beyond process and research, concrete deliverables shipped to production.',
      homepageTitle: 'Homepage redesign',
      homepageDescription: 'Complete redesign of the France VAE homepage to improve clarity, accessibility and conversion. The new design emphasizes the value proposition and simplifies the entry points for different user profiles.',
      homepageBefore: 'Before',
      homepageAfter: 'After',
      homepageCaption: 'France VAE Homepage: before and after redesign',
      searchEngineTitle: 'Certification search engine',
      searchEngineDescription: 'Redesign of the certification search engine to help candidates find the right certification based on their professional experience. Improved filters, clearer results presentation, and better guidance through the 16,000+ available certifications.',
      videoTitle: 'Platform presentation video for the Minister of Labor',
      videoSubtitle: 'My final milestone at France VAE: complete design and production of a presentation video showcasing the entire candidate journey on the platform, presented to the Minister of Labor\'s cabinet.',
      videoCaption: 'France VAE platform presentation: designed and produced by Victor Soussan for the Minister of Labor\'s cabinet'
    },
    cta: {
      title: 'Interested in working together?',
      button: 'Get in touch'
    },
    initiatives: {
      title: 'Five high-impact initiatives'
    },
    progressive: {
      readMore: 'Read more',
      showLess: 'Show less'
    }
  },
  fr: {
    meta: {
      role: 'Lead Product Designer',
      scope: 'Stratégie produit, conception, recherche',
      period: 'déc. 2024 à juil. 2025',
      company: 'beta.gouv.fr',
      type: 'Design produit',
      labels: { type: 'Type', scope: 'Périmètre', period: 'Période', company: 'Entreprise' }
    },
    ui: {
      focus: 'Focus',
      overview: 'Vue d’ensemble',
      keyDeliverables: 'Livrables clés',
      initiative: 'Initiative',
      carouselLabel: 'Les cinq initiatives',
      previous: 'Initiative précédente',
      next: 'Initiative suivante',
      goTo: 'Aller à l’initiative',
      beforeAlt: 'Page d’accueil France VAE avant la refonte',
      afterAlt: 'Page d’accueil France VAE après la refonte',
      sliderLabel: 'Comparer la page d’accueil avant et après la refonte',
      videoFallback: 'Votre navigateur ne prend pas en charge la lecture vidéo.'
    },
    hero: {
      title: 'Livrer vite dans un environnement complexe',
      subtitle: 'Comment j’ai encadré le processus design et co-piloté la feuille de route pour aider une startup d’État à livrer plus vite, notamment sur des commandes politiques sans spécifications claires.',
      visitSite: 'Visiter France VAE',
      heroCaption: 'Page d’accueil France VAE\u00a0: service public national pour la VAE'
    },
    context: {
      title: 'Contexte',
      intro: 'France VAE est le service public national de la Validation des Acquis de l’Expérience. La plateforme permet aux citoyens sans diplôme de faire reconnaître leur expérience professionnelle pour obtenir des certifications officielles.',
      challenge: 'L’enjeu',
      challengeText: 'Structurer la découverte et la planification de la feuille de route pour accélérer la prise de décision, tout en livrant des fonctionnalités critiques pour un service au service de 100\u00a0000+ candidats, souvent issues de commandes politiques floues dont les spécifications n’étaient pas abouties.',
      myScope: 'Mon périmètre',
      myScopeText: 'Encadrer le processus de l’équipe design, co-piloter la feuille de route avec la Lead PM, structurer la découverte pour permettre à l’équipe de réalisation de livrer plus vite. Un rôle transverse couvrant l’ensemble du cycle produit.'
    },
    initiative1: {
      title: 'MVP VAE Collective',
      subtitle: 'Parcours employeur',
      problem: 'Le problème',
      problemText: 'Les entreprises souhaitant accompagner leurs salariés dans une démarche VAE collective n’avaient aucun outil dédié. Les RH jonglaient entre emails, tableurs et appels téléphoniques pour coordonner des cohortes de 10 à 90 candidats.',
      whatIDid: 'Ce que j’ai fait',
      discovery: {
        title: 'Découverte (2 semaines)',
        items: [
          'Entretiens avec responsables RH et directeurs de centres de formation',
          'Cartographie du parcours employeur existant (hors plateforme)',
          'Identification des points de friction\u00a0: suivi des candidats, coordination avec les accompagnateurs, visibilité sur l’avancement'
        ]
      },
      design: {
        title: 'Conception (3 semaines)',
        items: [
          'Prototype complet du parcours employeur\u00a0: déclaration de cohorte, invitation des salariés, suivi de progression, coordination avec les validateurs',
          'Présentation B2B pour le démarchage commercial',
          'Vidéo promotionnelle (enregistrement d’écran, scénario, script, montage, voix off) présentant le parcours complet'
        ]
      },
      deliverables: {
        title: 'Livrables',
        items: [
          'MVP fonctionnel prêt au déploiement',
          'Kit commercial pour l’équipe terrain',
          'Documentation du parcours pour le support'
        ]
      },
      impact: 'Offre B2B structurée et prête au déploiement. L’équipe commerciale dispose d’un parcours clair et d’outils pour adresser les entreprises.',
      prototypeButton: 'Ouvrir le prototype',
      prototypeCaption: 'Tableau de bord employeur VAE Collective\u00a0: interface de gestion des cohortes',
      bentoImages: {
        large: { src: '/images/francevae/VAE Collective/vae collective wireframes/interface commanditaires cible@2x.webp', caption: 'Tableau de bord employeur VAE Collective\u00a0: vue d’ensemble de l’interface avec les fonctionnalités de gestion de cohortes' },
        small1: { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'Diapositive de la présentation commerciale expliquant le processus en 4 étapes, conçu pour réduire les frictions à la prise en main' },
        small2: { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'Visualisation du retour sur investissement pour les acheteurs en entreprise, traduisant la valeur pour l’utilisateur en langage métier' }
      }
    },
    initiative2: {
      title: 'Structurer le fonctionnement de l’équipe produit',
      problem: 'Le problème',
      problemText: 'L’équipe produit fonctionnait par à-coups. Les priorités changeaient fréquemment, les équipes travaillaient en silos, et la distinction entre exploration et exécution restait floue.',
      whatIDid: 'Ce que j’ai fait',
      diagnostic: {
        title: 'Diagnostic (1 semaine)',
        items: [
          'Audit du fonctionnement actuel avec chaque équipe',
          'Identification des blocages\u00a0: absence de cadence, priorisation subjective, manque de visibilité entre équipes'
        ]
      },
      coDesign: {
        title: 'Co-conception avec la Lead PM (2 semaines)',
        items: [
          'Nouveau modèle organisationnel\u00a0: contributeurs unifiés autour d’objectifs communs plutôt que des équipes cloisonnées',
          'Cadre stratégique à trois niveaux\u00a0: Objectifs (le pourquoi), Initiatives (le quoi), Fonctionnalités (le comment)',
          'Saisons mensuelles\u00a0: Préparation (25\u00a0%), Exécution (50\u00a0%), Rétrospective (25\u00a0%)'
        ]
      },
      matrix: {
        title: 'Matrice de priorisation inter-équipes',
        items: [
          'Critères\u00a0: valeur utilisateur, criticité temporelle, score métier, effort technique, degré de spécificité',
          'Participants\u00a0: Produit, Métier, Design, Support, Tech',
          'Formule de scoring transparente et partagée'
        ]
      },
      deployment: {
        title: 'Déploiement (2 semaines)',
        items: [
          'Campagne de présentation auprès de chaque équipe France VAE',
          'Adaptation du processus selon les retours',
          'Points hebdomadaires PO / designers sur la planification découverte / livraison'
        ]
      },
      impact: 'Décisions plus rapides, alignement renforcé. Les équipes disposent d’un cadre clair pour arbitrer entre les initiatives.',
      imageCaption: 'Cadre de découverte et saisons mensuelles présentés aux équipes',
      bentoImages: {
        large: { src: '/images/francevae/presentation process_discovery @2x.webp', caption: 'Le cadre des saisons donne aux équipes un rythme partagé\u00a0: préparation, exécution, rétrospective' },
        small1: { src: '/images/francevae/schema - equipe 01.webp', caption: 'Organisation d’équipe avant\u00a0: structure cloisonnée, avec une collaboration limitée entre équipes' },
        small2: { src: '/images/francevae/schema - equipe 02.webp', caption: 'Organisation d’équipe après\u00a0: contributeurs unifiés avec rôles clairs et rituels partagés' },
        large2: { src: '/images/francevae/presentation_process_discovery_05.webp', caption: 'Cycle de vie d’une initiative co-construit avec la Lead PM Aurélie\u00a0: cadrage approfondi et priorisation inter-équipes (jaune) avant les sprints de livraison (couloirs verts)' }
      }
    },
    initiative3: {
      title: 'Recherche utilisateur',
      subtitle: 'Tableau de bord candidat',
      problem: 'Le problème',
      problemText: 'Les décisions produit se prenaient sans données utilisateurs consolidées. Les retours terrain existaient mais restaient éparpillés dans les notes individuelles.',
      whatIDid: 'Ce que j’ai fait',
      structuring: {
        title: 'Structuration (1 semaine)',
        items: [
          'Base de connaissance utilisateur centralisée',
          'Rituels hebdomadaires avec product designers et équipe déploiement'
        ]
      },
      campaigns: {
        title: 'Campagnes de tests pour le nouveau tableau de bord (3 semaines)',
        items: [
          '10 entretiens qualitatifs modérés à distance (2 vagues)',
          'Protocole de tests, guides d’entretien, prise de notes, enregistrements',
          'Tableaux de priorisation des retours\u00a0: gains rapides, bugs techniques, problèmes UX, correctifs UI, demandes de fonctionnalités'
        ]
      },
      presentation: {
        title: 'Restitution',
        items: [
          '2 rapports de synthèse présentés en plénière',
          'Fichiers consolidés pour analyse continue'
        ]
      },
      impact: 'Base de connaissance utilisateur opérationnelle. Les décisions produit s’appuient désormais sur des données qualitatives structurées.',
      reportButton: 'Voir le rapport complet',
      imageCaption: 'Interface tableau de bord candidat testée avec les utilisateurs',
      bentoImages: {
        large: { src: '/images/francevae/UXR - Rapport de campangne de test tableau de bord.webp', caption: 'Synthèse présentée en plénière, transformant les retours épars en décisions produit actionnables' },
        small1: { src: '/images/francevae/UXR - test - script candidat 01.webp', caption: 'Guide d’entretien standardisé pour assurer la reproductibilité des tests entre les vagues' },
        small2: { src: '/images/francevae/UXR - test - tableau prio.webp', caption: 'Catégorisation des retours\u00a0: gains rapides, bugs, problèmes UX et demandes de fonctionnalités' }
      }
    },
    initiative4: {
      title: 'Ateliers design thinking',
      subtitle: 'Avec les acteurs terrain',
      problem: 'Le problème',
      problemText: 'L’équipe produit manquait de contact direct avec les accompagnateurs, acteurs clés du parcours VAE. Les décisions de conception se prenaient avec une compréhension partielle du contexte métier.',
      whatIDid: 'Ce que j’ai fait',
      preparation: {
        title: 'Préparation (1 semaine)',
        items: [
          'Identification des structures d’accompagnement influentes',
          'Construction du programme sur 2 jours',
          'Coordination logistique'
        ]
      },
      facilitation: {
        title: 'Animation (2 jours)',
        items: [
          'Débat structuré sur une problématique métier',
          'Ateliers d’identification de thématiques prioritaires',
          'Sessions d’idéation sur les problèmes plateforme',
          'Co-création de concepts avec croquis de solutions'
        ]
      },
      internal: {
        title: 'Ateliers internes complémentaires',
        items: [
          'Crazy-8 avec l’équipe interne',
          'Ateliers sur l’évolution du système de notification',
          'Audit et catégorisation de l’ensemble des emails utilisateurs'
        ]
      },
      impact: 'Co-création de solutions ancrées dans le réel. Les accompagnateurs sont devenus des partenaires actifs de la conception.',
      imageCaption: 'Atelier design thinking avec les structures d’accompagnement AAP',
      bentoImages: {
        large: { src: '/images/francevae/photo atelier aap.webp', caption: 'Les accompagnateurs deviennent partenaires actifs de la conception, comblant le fossé entre équipe produit et réalité terrain' },
        small1: { src: '/images/francevae/animation atelier 00.webp', caption: 'Découverte fondée sur les données\u00a0: les constats du terrain qui ont cadré le programme de l’atelier' },
        small2: { src: '/images/francevae/animation atelier 01.webp', caption: 'Méthode des Six Chapeaux\u00a0: divergence structurée avant convergence' }
      }
    },
    initiative5: {
      title: 'Expérimentation IA',
      subtitle: 'Orientation candidat',
      context: '55\u00a0% des candidats ne savent pas si la VAE leur convient. Beaucoup choisissent des certifications par défaut. L’initiative explorait comment l’IA pourrait aider les candidats à identifier si la VAE correspond à leur profil et à associer leurs compétences à une certification.',
      whatIDid: 'Ce que j’ai fait',
      study: {
        title: 'Étude prospective (1 semaine)',
        items: [
          'Identification des archétypes utilisateurs\u00a0: professionnels expérimentés sans diplôme, reconvertis, demandeurs d’emploi en transition',
          'Cartographie des barrières spécifiques à chaque profil',
          'Étude comparative des solutions d’orientation existantes'
        ]
      },
      ideation: {
        title: 'Idéation (3 jours)',
        items: [
          '10+ concepts pour candidats engagés et non engagés',
          'Chatbots, mise en correspondance compétences-certifications, simulateurs d’impact sur la carrière, galeries de témoignages, analyseurs d’opportunités locales'
        ]
      },
      prototyping: {
        title: 'Prototypage rapide (1 semaine)',
        items: [
          'Chatbot de positionnement VAE\u00a0: assistant conversationnel évaluant la pertinence de la VAE selon la situation professionnelle du candidat',
          'Orientation IA avec radar de compétences\u00a0: outil analysant les compétences via CV/LinkedIn et guidant vers les certifications correspondantes, avec visualisation radar des écarts'
        ]
      },
      impact: 'Initiative non priorisée, mais prototypes fonctionnels livrés en 1 semaine. Démonstration de la capacité à explorer rapidement des pistes innovantes sans bloquer les autres chantiers.',
      tryDemo: 'Essayer la démo',
      chatbotCaption: 'Prototype de chatbot IA\u00a0: évaluation du positionnement VAE',
      radarCaption: 'Prototype de radar de compétences\u00a0: outil d’orientation professionnelle'
    },
    learnings: {
      title: 'Ce que j’ai appris',
      items: [
        {
          title: 'Concevoir pour des citoyens',
          text: 'Dans le service public, le succès se mesure en accès, en compréhension et en autonomisation. Les métriques classiques de conversion ne s’appliquent pas.'
        },
        {
          title: 'Composer avec les contraintes institutionnelles',
          text: 'Processus d’achat public, réglementation, vocabulaire institutionnel\u00a0: chaque décision design tient compte d’un écosystème d’acteurs aux logiques différentes.'
        },
        {
          title: 'Structurer avant de produire',
          text: 'Dans un contexte à forte incertitude, investir dans le processus génère plus d’impact que livrer des écrans supplémentaires.'
        },
        {
          title: 'Prototyper pour réduire les risques',
          text: 'Les prototypes IA ont permis de tester des hypothèses en 1 semaine plutôt que de spécifier pendant 2 mois. Même non priorisés, ils ont informé les décisions produit.'
        }
      ]
    },
    testimonial: {
      quote: 'Victor a rapidement compris la complexité de notre environnement et a su structurer les opérations design tout en livrant des fonctionnalités critiques. Sa capacité à naviguer les contraintes institutionnelles tout en maintenant des standards design élevés était remarquable.',
      author: 'Boris Aimé-Bauderlique',
      role: 'Chargé de déploiement, France VAE'
    },
    uiDelivery: {
      title: 'Fonctionnalités livrées',
      subtitle: 'Au-delà du processus et de la recherche, des livrables concrets mis en production.',
      homepageTitle: 'Refonte de la page d’accueil',
      homepageDescription: 'Refonte complète de la page d’accueil France VAE pour améliorer la clarté, l’accessibilité et la conversion. Le nouveau design met en valeur la proposition de valeur et simplifie les points d’entrée pour les différents profils utilisateurs.',
      homepageBefore: 'Avant',
      homepageAfter: 'Après',
      homepageCaption: 'Page d’accueil France VAE\u00a0: avant et après la refonte',
      searchEngineTitle: 'Moteur de recherche de certifications',
      searchEngineDescription: 'Refonte du moteur de recherche de certifications pour aider les candidats à trouver la certification adaptée à leur expérience professionnelle. Filtres améliorés, présentation des résultats plus claire, et meilleur accompagnement à travers les 16\u00a0000+ certifications disponibles.',
      videoTitle: 'Vidéo de présentation pour le cabinet de la Ministre du Travail',
      videoSubtitle: 'Mon dernier livrable chez France VAE\u00a0: conception et production complète d’une vidéo présentant tout le parcours du candidat sur la plateforme, présentée au cabinet de la Ministre du Travail.',
      videoCaption: 'Présentation de la plateforme France VAE\u00a0: conçue et réalisée par Victor Soussan pour le cabinet ministériel'
    },
    cta: {
      title: 'Intéressé par une collaboration\u00a0?',
      button: 'Me contacter'
    },
    initiatives: {
      title: 'Cinq initiatives à fort impact'
    },
    progressive: {
      readMore: 'Lire la suite',
      showLess: 'Réduire'
    }
  }
};

// ============================================================================
// HELPER COMPONENTS
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
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.28, delay: delay * 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Clickable image with hover effect
const ClickableImage: React.FC<{
  src: string;
  alt: string;
  caption?: string;
  onClick: (src: string) => void;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}> = ({ src, alt, caption, onClick, className = '', aspectRatio, priority = false }) => {
  return (
    <figure className={className}>
      <div
        {...zoomable(() => onClick(src))}
        aria-label={alt}
        className={`cursor-zoom-in group rounded-2xl overflow-hidden ring-1 ring-black/[0.06] hover:ring-black/[0.10] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99] ${aspectRatio || ''}`}
      >
        <img
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          src={src} {...imgDims(src)}
          alt={alt}
          className={`w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] ${aspectRatio ? 'h-full object-cover object-top' : 'h-auto'}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed max-w-[740px] mx-auto">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// Section with bullet list
const BulletSection: React.FC<{
  title: string;
  items: string[];
}> = ({ title, items }) => {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-medium mb-3 text-gray-900">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div aria-hidden="true" className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0 bg-gray-300" />
            <span className="text-base text-gray-600 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Impact block
const ImpactBlock: React.FC<{ text: string }> = ({ text }) => {
  return (
    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">{text}</p>
  );
};

// Section title: h2, optional subtitle, rule
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <FadeInSection>
    <h2 className="text-title-2 mb-2 text-gray-900">{title}</h2>
    {subtitle && <p className="text-base text-gray-600 mb-4">{subtitle}</p>}
    <hr className="mb-10 border-gray-200" />
  </FadeInSection>
);

// ============================================================================
// BEFORE/AFTER SLIDER COMPONENT
// ============================================================================

const BeforeAfterSlider: React.FC<{
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  sliderLabel: string;
}> = ({ beforeSrc, afterSrc, beforeLabel, afterLabel, beforeAlt, afterAlt, sliderLabel }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Pointer events cover mouse, touch and pen; capture keeps the drag alive outside the frame
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition(p => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition(p => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden border border-gray-200 cursor-ew-resize select-none touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After image (full size, visible on right side) */}
      <img
        loading="lazy"
        src={afterSrc} {...imgDims(afterSrc)}
        alt={afterAlt}
        className="w-full h-auto block pointer-events-none"
        draggable={false}
      />

      {/* Before image (clipped with clip-path, visible on left side) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          loading="lazy"
          src={beforeSrc} {...imgDims(beforeSrc)}
          alt={beforeAlt}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Slider handle (the focusable control) */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={sliderLabel}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${beforeLabel} ${Math.round(sliderPosition)} %`}
        onKeyDown={handleKeyDown}
        className="group absolute top-0 bottom-0 w-1 cursor-ew-resize z-20 focus-visible:outline-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="absolute inset-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]" />

        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-[#2D5CF3]">
          <div className="flex items-center gap-0.5">
            <ChevronDown size={16} className="text-gray-700 rotate-90" />
            <ChevronDown size={16} className="text-gray-700 -rotate-90" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold z-10 bg-white/90 text-gray-900 shadow-md pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold z-10 bg-white/90 text-gray-900 shadow-md pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
};

// ============================================================================
// INTERACTIVE INITIATIVE DIAGRAM - Apple Keynote style
// ============================================================================

const INITIATIVES_DATA = {
  en: [
    {
      id: 1,
      title: "VAE Collective MVP",
      duration: "5 weeks",
      icon: Target,
      description: "End-to-end employer journey for collective certification programs.",
      features: [
        "Discovery with HR managers and training centers",
        "Complete employer journey prototype",
        "B2B pitch deck for commercial outreach",
        "Promotional video with screencast",
        "Functional MVP ready for deployment"
      ]
    },
    {
      id: 2,
      title: "Product Operations",
      duration: "5 weeks",
      icon: Layers,
      description: "Restructuring team workflows for faster delivery.",
      features: [
        "Diagnosis of siloed team operations",
        "New org model with 1-month seasons",
        "Cross-team prioritization matrix",
        "Discovery/delivery workflow separation",
        "Weekly PO/designer sync rituals"
      ]
    },
    {
      id: 3,
      title: "User Research",
      duration: "4 weeks",
      icon: Users,
      description: "Building a knowledge base from candidate interviews.",
      features: [
        "Centralized user knowledge base",
        "10 moderated interviews (2 waves)",
        "Test protocols and interview guides",
        "Prioritization tables for feedback",
        "2 synthesis reports for product team"
      ]
    },
    {
      id: 4,
      title: "Design Thinking Workshops",
      duration: "3 weeks",
      icon: Lightbulb,
      description: "Co-creation with field practitioners.",
      features: [
        "2-day workshop with accompaniment structures",
        "Problem framing to solution sketching",
        "Crazy-8 ideation sessions",
        "Notification system audit",
        "Email categorization and optimization"
      ]
    },
    {
      id: 5,
      title: "AI Experimentation",
      duration: "2 weeks",
      icon: Bot,
      description: "Rapid prototyping of AI-powered orientation tools.",
      features: [
        "User archetype identification",
        "10+ AI concept explorations",
        "Positioning chatbot prototype",
        "Skills radar visualization",
        "2 functional prototypes deployed"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "MVP VAE Collective",
      duration: "5 semaines",
      icon: Target,
      description: "Parcours employeur complet pour programmes de certification collective.",
      features: [
        "Découverte avec les RH et les centres de formation",
        "Prototype complet du parcours employeur",
        "Présentation B2B pour le démarchage",
        "Vidéo promotionnelle avec enregistrement d’écran",
        "MVP fonctionnel prêt au déploiement"
      ]
    },
    {
      id: 2,
      title: "Opérations produit",
      duration: "5 semaines",
      icon: Layers,
      description: "Restructuration des modes de travail pour livrer plus vite.",
      features: [
        "Diagnostic des équipes cloisonnées",
        "Nouveau modèle avec saisons d’1 mois",
        "Matrice de priorisation inter-équipes",
        "Séparation découverte / livraison",
        "Rituels hebdomadaires PO / designers"
      ]
    },
    {
      id: 3,
      title: "Recherche utilisateur",
      duration: "4 semaines",
      icon: Users,
      description: "Construction d’une base de connaissances candidat.",
      features: [
        "Base de connaissances utilisateur",
        "10 entretiens modérés (2 vagues)",
        "Protocoles de test et guides",
        "Tableaux de priorisation des retours",
        "2 rapports de synthèse produit"
      ]
    },
    {
      id: 4,
      title: "Ateliers de design thinking",
      duration: "3 semaines",
      icon: Lightbulb,
      description: "Co-création avec les acteurs terrain.",
      features: [
        "Atelier de 2 jours avec les structures AAP",
        "Du cadrage problème aux croquis",
        "Sessions d’idéation Crazy-8",
        "Audit système de notifications",
        "Catégorisation et optimisation des e-mails"
      ]
    },
    {
      id: 5,
      title: "Expérimentation IA",
      duration: "2 semaines",
      icon: Bot,
      description: "Prototypage rapide d’outils d’orientation IA.",
      features: [
        "Identification des archétypes utilisateurs",
        "10+ concepts IA explorés",
        "Prototype de chatbot de positionnement",
        "Visualisation en radar des compétences",
        "2 prototypes fonctionnels déployés"
      ]
    }
  ]
};

const InitiativesDiagram: React.FC<{
  lang: 'en' | 'fr';
}> = ({ lang }) => {
  const [activeInitiative, setActiveInitiative] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const initiatives = INITIATIVES_DATA[lang];
  const ui = TRANSLATIONS[lang].ui;

  // Swipe logic for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (activeInitiative < initiatives.length - 1) setActiveInitiative(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeInitiative > 0) setActiveInitiative(prev => prev - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  // Keyboard navigation, scoped to this widget
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="mt-8">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full p-1 bg-gray-100">
          <button
            onClick={() => setViewMode('focus')}
            aria-pressed={viewMode === 'focus'}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'focus'
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {ui.focus}
          </button>
          <button
            onClick={() => setViewMode('overview')}
            aria-pressed={viewMode === 'overview'}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'overview'
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {ui.overview}
          </button>
        </div>
      </div>

      {viewMode === 'focus' ? (
        /* Focus View */
        <div
          className="relative touch-pan-y"
          role="group"
          aria-roledescription="carousel"
          aria-label={ui.carouselLabel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={onKeyDown}
        >
          {/* Controls: previous, progress dots, next (44px hit areas) */}
          <div className="flex items-center justify-center gap-1 mb-8">
            <button
              onClick={handlePrev}
              disabled={activeInitiative === 0}
              aria-label={ui.previous}
              className="min-h-11 min-w-11 rounded-full flex items-center justify-center text-gray-900 transition-[background-color,opacity] duration-200 ease-out hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={18} className="rotate-180" />
            </button>
            {initiatives.map((initiative, idx) => (
              <button
                key={idx}
                onClick={() => setActiveInitiative(idx)}
                aria-label={`${ui.goTo} ${initiative.id} : ${initiative.title}`}
                aria-current={idx === activeInitiative ? 'true' : undefined}
                className="group min-h-11 min-w-8 flex items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    idx === activeInitiative
                      ? 'w-10 bg-gray-900'
                      : 'w-2 bg-gray-300 group-hover:bg-gray-400'
                  }`}
                />
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={activeInitiative === initiatives.length - 1}
              aria-label={ui.next}
              className="min-h-11 min-w-11 rounded-full flex items-center justify-center text-gray-900 transition-[background-color,opacity] duration-200 ease-out hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Card stack: all cards share one grid cell, so the tallest one sets the height and nothing is clipped */}
          <div className="grid overflow-x-clip" aria-live="polite">
            {initiatives.map((initiative, idx) => {
              const isActive = idx === activeInitiative;
              const isPrev = idx < activeInitiative;
              const InitiativeIcon = initiative.icon;

              return (
                <div
                  key={initiative.id}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive
                      ? 'opacity-100 translate-x-0 visible z-10'
                      : `opacity-0 invisible pointer-events-none ${isPrev ? '-translate-x-8' : 'translate-x-8'}`
                  }`}
                >
                  <div className="rounded-xl overflow-hidden h-full flex flex-col md:flex-row border border-gray-100">
                    {/* Left: Identity */}
                    <div className="md:w-1/3 p-8 md:p-10 flex flex-col justify-between bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100">
                      <div>
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-gray-100 text-gray-600">
                          <InitiativeIcon size={26} />
                        </div>
                        <h3 className="text-title-3 mb-2 text-gray-900">
                          {initiative.title}
                        </h3>
                        <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">
                          {ui.initiative} {initiative.id} · {initiative.duration}
                        </div>
                      </div>
                      <p className="text-base leading-relaxed mt-6 text-gray-600">
                        {initiative.description}
                      </p>
                    </div>

                    {/* Right: Features */}
                    <div className="md:w-2/3 p-8 md:p-10">
                      <h4 className="text-sm font-medium mb-6 text-gray-900">
                        {ui.keyDeliverables}
                      </h4>
                      <ul className="space-y-4">
                        {initiative.features.map((feature, fIdx) => (
                          <motion.li
                            key={fIdx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                            transition={{ delay: isActive ? 0.2 + fIdx * 0.08 : 0, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 size={18} aria-hidden="true" className="text-gray-500 mt-1 flex-shrink-0" />
                            <span className="text-base leading-relaxed text-gray-800">
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
        </div>
      ) : (
        /* Overview View - Stacked list of all initiatives */
        <div className="space-y-4">
          {initiatives.map((initiative) => {
            const InitiativeIcon = initiative.icon;
            return (
              <div
                key={initiative.id}
                {...zoomable(() => {
                  setActiveInitiative(initiative.id - 1);
                  setViewMode('focus');
                })}
                className="group rounded-xl p-5 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 cursor-pointer border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-500">
                    <InitiativeIcon size={20} />
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {ui.initiative} {initiative.id} · {initiative.duration}
                  </div>
                </div>

                <h3 className="text-title-3 mb-2 text-gray-900">
                  {initiative.title}
                </h3>

                <p className="text-base leading-relaxed text-gray-600">
                  {initiative.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const FranceVaeFull: React.FC<FranceVaeFullProps> = ({
  lang,
  onImageClick,
  onContact
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* HERO */}
      <section className="px-6 pt-8 pb-10">
        <div className="max-w-[740px] mx-auto">
          {/* Logo */}
          <img
            src="/images/francevae/logo fvae.webp" {...imgDims("/images/francevae/logo fvae.webp")}
            alt="France VAE"
            className="h-8 w-auto mb-8"
          />

          {/* Title */}
          <h1 className="text-title-1 text-gray-900 mb-2">
            {t.hero.title}
          </h1>

          {/* Role line */}
          <p className="text-sm text-gray-500 mb-6">
            {t.meta.role} · {t.meta.scope} · {t.meta.period}
          </p>

          {/* Subtitle */}
          <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-6">
            {t.hero.subtitle}
          </p>

          {/* Visit link */}
          <a
            href="https://vae.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
          >
            <ExternalLink size={14} />
            {t.hero.visitSite}
          </a>
        </div>
      </section>

      {/* Meta */}
      <section className="px-6 pb-10">
        <div className="max-w-[740px] mx-auto">
          <div className="divide-y divide-gray-100">
            {[
              { label: t.meta.labels.type, value: t.meta.type },
              { label: t.meta.labels.scope, value: t.meta.scope },
              { label: t.meta.labels.period, value: t.meta.period },
              { label: t.meta.labels.company, value: t.meta.company },
            ].map((item, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3">
                <span className="text-xs text-gray-500">{item.label}</span>
                <span className="text-sm font-medium text-gray-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 pb-10">
        <div className="max-w-[960px] mx-auto">
          <FadeInSection>
            <ClickableImage
              src="/images/francevae/france_vae_home.webp"
              alt="France VAE Homepage"
              caption={t.hero.heroCaption}
              onClick={onImageClick}
              aspectRatio="aspect-[3/2]"
              priority
            />
          </FadeInSection>
        </div>
      </section>

      {/* CONTEXT (before the overview diagram, which relies on it) */}
      <section id="context" className="px-6 pt-16 md:pt-24">
        <div className="max-w-[740px] mx-auto">
          <SectionHeading title={t.context.title} />

          <FadeInSection delay={0.1}>
            <p className="text-base text-gray-600 leading-relaxed mb-12 max-w-[65ch]">
              {t.context.intro}
            </p>
          </FadeInSection>

          <div className="space-y-8">
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.context.challenge}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {t.context.challengeText}
              </p>
            </FadeInSection>
            <FadeInSection delay={0.3}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.context.myScope}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {t.context.myScopeText}
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* INTERACTIVE INITIATIVES DIAGRAM */}
      <section className="px-6 py-16">
        <div className="max-w-[740px] mx-auto">
          <FadeInSection>
            <h2 className="mb-8 text-title-2 text-gray-900">
              {t.initiatives.title}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <InitiativesDiagram lang={lang} />
          </FadeInSection>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="px-6 pb-16 md:pb-24">
        <div className="max-w-[740px] mx-auto">

          {/* INITIATIVE 1: VAE COLLECTIVE */}
          <section id="initiative-1" className="mb-24 md:mb-32">
            <SectionHeading title={t.initiative1.title} subtitle={t.initiative1.subtitle} />

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.initiative1.problem}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.initiative1.problemText}
              </p>
            </FadeInSection>

            {/* Key visual: employer dashboard prototype */}
            <FadeInSection delay={0.15} className="mb-12">
              <ClickableImage
                src={t.initiative1.bentoImages.large.src}
                alt={t.initiative1.bentoImages.large.caption}
                caption={t.initiative1.bentoImages.large.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-8 text-gray-900">
                {t.initiative1.whatIDid}
              </h3>
              <div className="space-y-8 mb-10">
                <BulletSection title={t.initiative1.discovery.title} items={t.initiative1.discovery.items} />
                <BulletSection title={t.initiative1.design.title} items={t.initiative1.design.items} />
              </div>
              <BulletSection title={t.initiative1.deliverables.title} items={t.initiative1.deliverables.items} />
              <div className="mt-6">
                <a
                  href="https://endearing-taffy-c86c69.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D5CF3] text-white text-sm font-medium shadow-sm hover:bg-[#2450d9] hover:shadow-md transition-[background-color,box-shadow] duration-150"
                >
                  {t.initiative1.prototypeButton}
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </FadeInSection>

            {/* Presentation slides */}
            <FadeInSection delay={0.3} className="mt-10">
              <ClickableImage
                src={t.initiative1.bentoImages.small1.src}
                alt={t.initiative1.bentoImages.small1.caption}
                caption={t.initiative1.bentoImages.small1.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            <FadeInSection className="mt-10">
              <ClickableImage
                src={t.initiative1.bentoImages.small2.src}
                alt={t.initiative1.bentoImages.small2.caption}
                caption={t.initiative1.bentoImages.small2.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4} className="mt-10">
              <ImpactBlock text={t.initiative1.impact} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 2: PRODUCT OPS */}
          <section id="initiative-2" className="mb-24 md:mb-32">
            <SectionHeading title={t.initiative2.title} />

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.initiative2.problem}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.initiative2.problemText}
              </p>
            </FadeInSection>

            {/* Key visual: seasons framework */}
            <FadeInSection delay={0.15} className="mb-12">
              <ClickableImage
                src={t.initiative2.bentoImages.large.src}
                alt={t.initiative2.bentoImages.large.caption}
                caption={t.initiative2.bentoImages.large.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-8 text-gray-900">
                {t.initiative2.whatIDid}
              </h3>
              <ExpandableSection
                lang={lang}
                previewRem={14}
                expandLabel={t.progressive.readMore}
                collapseLabel={t.progressive.showLess}
              >
                <div className="space-y-8 mb-10">
                  <BulletSection title={t.initiative2.diagnostic.title} items={t.initiative2.diagnostic.items} />
                  <BulletSection title={t.initiative2.coDesign.title} items={t.initiative2.coDesign.items} />
                  <BulletSection title={t.initiative2.matrix.title} items={t.initiative2.matrix.items} />
                  <BulletSection title={t.initiative2.deployment.title} items={t.initiative2.deployment.items} />
                </div>
              </ExpandableSection>
            </FadeInSection>

            {/* Team org: before/after */}
            <FadeInSection delay={0.3} className="mt-10">
              <ClickableImage
                src={t.initiative2.bentoImages.small1.src}
                alt={t.initiative2.bentoImages.small1.caption}
                caption={t.initiative2.bentoImages.small1.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            <FadeInSection className="mt-10">
              <ClickableImage
                src={t.initiative2.bentoImages.small2.src}
                alt={t.initiative2.bentoImages.small2.caption}
                caption={t.initiative2.bentoImages.small2.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* Initiative lifecycle */}
            {t.initiative2.bentoImages.large2 && (
              <FadeInSection delay={0.35} className="mt-10">
                <ClickableImage
                  src={t.initiative2.bentoImages.large2.src}
                  alt={t.initiative2.bentoImages.large2.caption}
                  caption={t.initiative2.bentoImages.large2.caption}
                  onClick={onImageClick}
                />
              </FadeInSection>
            )}

            {/* Impact */}
            <FadeInSection delay={0.4} className="mt-10">
              <ImpactBlock text={t.initiative2.impact} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 3: USER RESEARCH */}
          <section id="initiative-3" className="mb-24 md:mb-32">
            <SectionHeading title={t.initiative3.title} subtitle={t.initiative3.subtitle} />

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.initiative3.problem}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.initiative3.problemText}
              </p>
            </FadeInSection>

            {/* Key visual: synthesis report */}
            <FadeInSection delay={0.15} className="mb-12">
              <ClickableImage
                src={t.initiative3.bentoImages.large.src}
                alt={t.initiative3.bentoImages.large.caption}
                caption={t.initiative3.bentoImages.large.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-8 text-gray-900">
                {t.initiative3.whatIDid}
              </h3>
              <ExpandableSection
                lang={lang}
                previewRem={10.5}
                expandLabel={t.progressive.readMore}
                collapseLabel={t.progressive.showLess}
              >
                <div className="space-y-8 mb-10">
                  <BulletSection title={t.initiative3.structuring.title} items={t.initiative3.structuring.items} />
                  <BulletSection title={t.initiative3.campaigns.title} items={t.initiative3.campaigns.items} />
                  <BulletSection title={t.initiative3.presentation.title} items={t.initiative3.presentation.items} />
                </div>
              </ExpandableSection>
              <div className="mt-6">
                <a
                  href="https://tests-utilisateur-tableau-de-bord-c.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D5CF3] text-white text-sm font-medium shadow-sm hover:bg-[#2450d9] hover:shadow-md transition-[background-color,box-shadow] duration-150"
                >
                  {t.initiative3.reportButton}
                  <ExternalLink size={14} weight="bold" />
                </a>
              </div>
            </FadeInSection>

            {/* Research artifacts */}
            <FadeInSection delay={0.3} className="mt-10">
              <ClickableImage
                src={t.initiative3.bentoImages.small1.src}
                alt={t.initiative3.bentoImages.small1.caption}
                caption={t.initiative3.bentoImages.small1.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            <FadeInSection className="mt-10">
              <ClickableImage
                src={t.initiative3.bentoImages.small2.src}
                alt={t.initiative3.bentoImages.small2.caption}
                caption={t.initiative3.bentoImages.small2.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4} className="mt-10">
              <ImpactBlock text={t.initiative3.impact} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 4: WORKSHOPS */}
          <section id="initiative-4" className="mb-24 md:mb-32">
            <SectionHeading title={t.initiative4.title} subtitle={t.initiative4.subtitle} />

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.initiative4.problem}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.initiative4.problemText}
              </p>
            </FadeInSection>

            {/* Key visual: workshop in session */}
            <FadeInSection delay={0.15} className="mb-12">
              <ClickableImage
                src={t.initiative4.bentoImages.large.src}
                alt={t.initiative4.bentoImages.large.caption}
                caption={t.initiative4.bentoImages.large.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-8 text-gray-900">
                {t.initiative4.whatIDid}
              </h3>
              <div className="space-y-8 mb-10">
                <BulletSection title={t.initiative4.preparation.title} items={t.initiative4.preparation.items} />
                <BulletSection title={t.initiative4.facilitation.title} items={t.initiative4.facilitation.items} />
              </div>
              <BulletSection title={t.initiative4.internal.title} items={t.initiative4.internal.items} />
            </FadeInSection>

            {/* Workshop slides */}
            <FadeInSection delay={0.3} className="mt-10">
              <ClickableImage
                src={t.initiative4.bentoImages.small1.src}
                alt={t.initiative4.bentoImages.small1.caption}
                caption={t.initiative4.bentoImages.small1.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            <FadeInSection className="mt-10">
              <ClickableImage
                src={t.initiative4.bentoImages.small2.src}
                alt={t.initiative4.bentoImages.small2.caption}
                caption={t.initiative4.bentoImages.small2.caption}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4} className="mt-10">
              <ImpactBlock text={t.initiative4.impact} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 5: AI */}
          <section id="initiative-5" className="mb-24 md:mb-32">
            <SectionHeading title={t.initiative5.title} subtitle={t.initiative5.subtitle} />

            {/* Context */}
            <FadeInSection delay={0.1}>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.initiative5.context}
              </p>
            </FadeInSection>

            {/* Key visual: chatbot prototype */}
            <FadeInSection delay={0.15} className="mb-4">
              <ClickableImage
                src="/images/francevae/proto IA - chatbot de positionnement.webp"
                alt="AI Chatbot Prototype"
                caption={t.initiative5.chatbotCaption}
                onClick={onImageClick}
              />
            </FadeInSection>
            <FadeInSection delay={0.17} className="mb-12">
              <a
                href="https://joyful-unicorn-489a7b.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
              >
                <Play size={14} />
                {t.initiative5.tryDemo}
              </a>
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-8 text-gray-900">
                {t.initiative5.whatIDid}
              </h3>
              <ExpandableSection
                lang={lang}
                previewRem={10.5}
                expandLabel={t.progressive.readMore}
                collapseLabel={t.progressive.showLess}
              >
                <div className="space-y-8 mb-10">
                  <BulletSection title={t.initiative5.study.title} items={t.initiative5.study.items} />
                  <BulletSection title={t.initiative5.ideation.title} items={t.initiative5.ideation.items} />
                  <BulletSection title={t.initiative5.prototyping.title} items={t.initiative5.prototyping.items} />
                </div>
              </ExpandableSection>
            </FadeInSection>

            {/* Second prototype: skills radar */}
            <FadeInSection delay={0.3} className="mt-10 mb-4">
              <ClickableImage
                src="/images/francevae/proto IA - orientation professionnelle assistee par IA.webp"
                alt="AI Skills Radar Prototype"
                caption={t.initiative5.radarCaption}
                onClick={onImageClick}
              />
            </FadeInSection>
            <FadeInSection delay={0.32} className="mb-0">
              <a
                href="https://flourishing-cascaron-0d6509.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
              >
                <Play size={14} />
                {t.initiative5.tryDemo}
              </a>
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4} className="mt-10">
              <ImpactBlock text={t.initiative5.impact} />
            </FadeInSection>
          </section>

          {/* UI & DELIVERY */}
          <section id="ui-delivery" className="mb-24 md:mb-32">
            <SectionHeading title={t.uiDelivery.title} subtitle={t.uiDelivery.subtitle} />

            {/* Homepage Before/After */}
            <FadeInSection delay={0.1} className="mb-16">
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.uiDelivery.homepageTitle}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.uiDelivery.homepageDescription}
              </p>
              <figure>
                <BeforeAfterSlider
                  beforeSrc="/images/francevae/france_vae_home_before_2x.webp"
                  afterSrc="/images/francevae/france_vae_home_after_2x.webp"
                  beforeLabel={t.uiDelivery.homepageBefore}
                  afterLabel={t.uiDelivery.homepageAfter}
                  beforeAlt={t.ui.beforeAlt}
                  afterAlt={t.ui.afterAlt}
                  sliderLabel={t.ui.sliderLabel}
                />
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {t.uiDelivery.homepageCaption}
                </figcaption>
              </figure>
            </FadeInSection>

            {/* Search Engine - Text description */}
            <FadeInSection delay={0.15} className="mb-16">
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.uiDelivery.searchEngineTitle}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {t.uiDelivery.searchEngineDescription}
              </p>
            </FadeInSection>

            {/* Video Section */}
            <FadeInSection delay={0.2}>
              <h3 className="text-title-3 mb-4 text-gray-900">
                {t.uiDelivery.videoTitle}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                {t.uiDelivery.videoSubtitle}
              </p>
              <figure>
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto"
                  >
                    <source src="/images/francevae/20250701 - Video ministre - revision 3'30.mp4" type="video/mp4" />
                    {t.ui.videoFallback}
                  </video>
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {t.uiDelivery.videoCaption}
                </figcaption>
              </figure>
            </FadeInSection>
          </section>

          {/* TESTIMONIAL */}
          <section className="mb-24 md:mb-32">
            <CaseStudyTestimonialBlock
              quote={t.testimonial.quote}
              author={t.testimonial.author}
              role={t.testimonial.role}
              image="boris-aime-bauderlique.webp"
              lang={lang}
            />
          </section>

          {/* LEARNINGS */}
          <section id="learnings" className="mb-24 md:mb-32">
            <SectionHeading title={t.learnings.title} />

            <div className="divide-y divide-gray-100">
              {t.learnings.items.map((item, idx) => (
                <FadeInSection key={idx} delay={0.1 + idx * 0.05}>
                  <div className="py-6">
                    <h3 className="text-title-3 mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed max-w-[65ch] text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pb-16 md:pb-24">
            <FadeInSection>
              <p className="text-sm text-gray-500 mb-4">{t.cta.title}</p>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
              >
                {t.cta.button}
                <ArrowRight size={14} />
              </button>
            </FadeInSection>
          </section>

        </div>
      </div>

    </div>
  );
};

export default FranceVaeFull;
