/**
 * FranceVaeFull - Complete case study with narrative structure
 *
 * Structure based on france_vae_casestudy_v2.md:
 * - Context
 * - Initiative 1: MVP VAE Collective
 * - Initiative 2: Product Operations
 * - Initiative 3: User Research
 * - Initiative 4: Design Thinking Workshops
 * - Initiative 5: AI Experimentation
 * - Learnings
 * - Testimonial
 */

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  Briefcase,
  Calendar,
  Building2,
  X,
  Play,
  ExternalLink,
  Users,
  Lightbulb,
  Bot,
  CheckCircle2,
  Target,
  ChevronDown,
  Search,
  Quote
} from 'lucide-react';

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
      period: 'Dec 2024 - Jul 2025',
      company: 'beta.gouv.fr'
    },
    hero: {
      title: 'Shipping fast in a complex environment',
      subtitle: 'How I led the design team process and co-drove the roadmap to help a government startup ship faster, especially on politically-driven initiatives lacking clear specs.',
      visitSite: 'Visit France VAE',
      heroCaption: 'France VAE Homepage - National public service for VAE'
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
      eyebrow: 'Initiative 1',
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
      prototypeCaption: 'VAE Collective employer dashboard - Cohort management interface',
      bentoImages: {
        large: { src: '/images/francevae/VAE Collective/vae collective wireframes/interface commanditaires cible@2x.webp', caption: 'VAE Collective employer dashboard - Complete interface overview showing cohort management features' },
        small1: { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'Sales deck slide explaining the 4-step process designed to reduce onboarding friction' },
        small2: { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'ROI visualization for enterprise buyers, translating user value into business language' }
      }
    },
    initiative2: {
      eyebrow: 'Initiative 2',
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
      eyebrow: 'Initiative 3',
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
      eyebrow: 'Initiative 4',
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
      eyebrow: 'Initiative 5',
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
      chatbotCaption: 'AI chatbot prototype - VAE positioning assessment',
      radarCaption: 'Skills radar prototype - Career orientation tool'
    },
    learnings: {
      eyebrow: 'Learnings',
      title: 'What I learned',
      items: [
        {
          title: 'Designing for citizens, not users',
          text: 'In public service, success is not measured by conversion but by access, understanding, and empowerment. Classic metrics don\'t apply.'
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
      eyebrow: 'Testimonial',
      quote: 'Victor quickly understood the complexity of our environment and knew how to structure design operations while delivering critical features. His ability to navigate institutional constraints while maintaining high design standards was remarkable.',
      author: 'Boris Aimé-Bauderlique',
      role: 'Chargé de déploiement - FranceVAE'
    },
    uiDelivery: {
      eyebrow: 'UI & Delivery',
      title: 'Shipping features',
      subtitle: 'Beyond process and research, concrete deliverables shipped to production.',
      homepageTitle: 'Homepage redesign',
      homepageDescription: 'Complete redesign of the France VAE homepage to improve clarity, accessibility and conversion. The new design emphasizes the value proposition and simplifies the entry points for different user profiles.',
      homepageBefore: 'Before',
      homepageAfter: 'After',
      homepageCaption: 'France VAE Homepage - Before and after redesign',
      searchEngineTitle: 'Certification search engine',
      searchEngineDescription: 'Redesign of the certification search engine to help candidates find the right certification based on their professional experience. Improved filters, clearer results presentation, and better guidance through the 16,000+ available certifications.',
      videoTitle: 'Platform presentation video for the Minister of Labor',
      videoSubtitle: 'My final milestone at France VAE: complete design and production of a presentation video showcasing the entire candidate journey on the platform, presented to the Minister of Labor\'s cabinet.',
      videoCaption: 'France VAE platform presentation - Designed and produced by Victor Soussan for the Minister of Labor\'s cabinet'
    },
    cta: {
      title: 'Interested in working together?',
      button: 'Get in touch'
    },
    initiatives: {
      eyebrow: '6-Month Mission',
      title: 'Five high-impact\ninitiatives'
    },
    progressive: {
      readMore: 'Read more',
      showLess: 'Show less'
    }
  },
  fr: {
    meta: {
      role: 'Lead Product Designer',
      scope: 'Stratégie produit, Conception, Recherche',
      period: 'Déc 2024 - Juil 2025',
      company: 'beta.gouv.fr'
    },
    hero: {
      title: 'Livrer vite dans un environnement complexe',
      subtitle: 'Comment j\'ai encadré le processus design et co-piloté la roadmap pour aider une startup d\'État à livrer plus vite, notamment sur des commandes politiques manquant de specs claires.',
      visitSite: 'Visiter France VAE',
      heroCaption: 'Page d\'accueil France VAE - Service public national pour la VAE'
    },
    context: {
      title: 'Contexte',
      intro: 'France VAE est le service public national de la Validation des Acquis de l\'Expérience. La plateforme permet aux citoyens sans diplôme de faire reconnaître leur expérience professionnelle pour obtenir des certifications officielles.',
      challenge: 'L\'enjeu',
      challengeText: 'Structurer la découverte et le planning de la roadmap pour accélérer la prise de décision, tout en livrant des fonctionnalités critiques pour un service servant 100K+ candidats, souvent issues de commandes politiques floues manquant de specs matures.',
      myScope: 'Mon scope',
      myScopeText: 'Encadrer le processus de l\'équipe design, co-piloter la roadmap avec la Lead PM, structurer la découverte pour permettre à l\'équipe de réalisation de livrer plus vite. Un rôle transverse couvrant l\'ensemble du cycle produit.'
    },
    initiative1: {
      eyebrow: 'Initiative 1',
      title: 'MVP VAE Collective',
      subtitle: 'Parcours employeur',
      problem: 'Le problème',
      problemText: 'Les entreprises souhaitant accompagner leurs salariés dans une démarche VAE collective n\'avaient aucun outil dédié. Les RH jonglaient entre emails, tableurs et appels téléphoniques pour coordonner des cohortes de 10 à 90 candidats.',
      whatIDid: 'Ce que j\'ai fait',
      discovery: {
        title: 'Discovery (2 semaines)',
        items: [
          'Entretiens avec responsables RH et directeurs de centres de formation',
          'Cartographie du parcours employeur existant (hors plateforme)',
          'Identification des points de friction : suivi des candidats, coordination avec les accompagnateurs, visibilité sur l\'avancement'
        ]
      },
      design: {
        title: 'Conception (3 semaines)',
        items: [
          'Prototype complet du parcours employeur : déclaration de cohorte, invitation des salariés, suivi de progression, coordination avec les validateurs',
          'Pitch deck B2B pour le démarchage commercial',
          'Vidéo promotionnelle (screencast, scénario, script, montage, voix off) présentant le parcours complet'
        ]
      },
      deliverables: {
        title: 'Livrables',
        items: [
          'MVP fonctionnel prêt au déploiement',
          'Kit commercial pour l\'équipe terrain',
          'Documentation du parcours pour le support'
        ]
      },
      impact: 'Offre B2B structurée et prête au déploiement. L\'équipe commerciale dispose d\'un parcours clair et d\'outils pour adresser les entreprises.',
      prototypeButton: 'Ouvrir le prototype',
      prototypeCaption: 'Dashboard employeur VAE Collective - Interface de gestion des cohortes',
      bentoImages: {
        large: { src: '/images/francevae/VAE Collective/vae collective wireframes/interface commanditaires cible@2x.webp', caption: 'Dashboard employeur VAE Collective - Vue d\'ensemble de l\'interface avec les fonctionnalités de gestion de cohortes' },
        small1: { src: '/images/francevae/slide presentation process vae collective.webp', caption: 'Slide du pitch commercial expliquant le processus en 4 étapes, conçu pour réduire la friction d\'onboarding' },
        small2: { src: '/images/francevae/slide presentation benefices vae collective.webp', caption: 'Visualisation du ROI pour les acheteurs entreprise, traduire la valeur utilisateur en langage business' }
      }
    },
    initiative2: {
      eyebrow: 'Initiative 2',
      title: 'Structurer le fonctionnement de l\'équipe produit',
      problem: 'Le problème',
      problemText: 'L\'équipe produit fonctionnait par à-coups. Les priorités changeaient fréquemment, les équipes travaillaient en silos, et la distinction entre exploration et exécution restait floue.',
      whatIDid: 'Ce que j\'ai fait',
      diagnostic: {
        title: 'Diagnostic (1 semaine)',
        items: [
          'Audit du fonctionnement actuel avec chaque équipe',
          'Identification des blocages : absence de cadence, priorisation subjective, manque de visibilité cross-équipe'
        ]
      },
      coDesign: {
        title: 'Co-conception avec la Lead PM (2 semaines)',
        items: [
          'Nouveau modèle organisationnel : contributeurs unifiés autour d\'objectifs communs plutôt qu\'équipes silotées',
          'Framework stratégique à trois niveaux : Objectifs (le pourquoi), Initiatives (le quoi), Fonctionnalités (le comment)',
          'Saisons mensuelles : Préparation (25%), Exécution (50%), Rétrospective (25%)'
        ]
      },
      matrix: {
        title: 'Matrice de priorisation cross-équipe',
        items: [
          'Critères : valeur utilisateur, criticité temporelle, score métier, effort technique, degré de spécificité',
          'Participants : Produit, Métier, Design, Support, Tech',
          'Formule de scoring transparente et partagée'
        ]
      },
      deployment: {
        title: 'Déploiement (2 semaines)',
        items: [
          'Campagne de présentation auprès de chaque équipe France VAE',
          'Adaptation du processus selon les retours',
          'Points hebdomadaires PO/designers sur le planning discovery/delivery'
        ]
      },
      impact: 'Décisions plus rapides, alignement renforcé. Les équipes disposent d\'un cadre clair pour arbitrer entre les initiatives.',
      imageCaption: 'Framework discovery et saisons mensuelles présenté aux équipes',
      bentoImages: {
        large: { src: '/images/francevae/presentation process_discovery @2x.webp', caption: 'Le framework saisons donne aux équipes un rythme partagé : préparation, exécution, rétrospective' },
        small1: { src: '/images/francevae/schema - equipe 01.webp', caption: 'Organisation d\'équipe avant : structure silotée avec collaboration cross-équipe limitée' },
        small2: { src: '/images/francevae/schema - equipe 02.webp', caption: 'Organisation d\'équipe après : contributeurs unifiés avec rôles clairs et rituels partagés' },
        large2: { src: '/images/francevae/presentation_process_discovery_05.webp', caption: 'Cycle de vie d\'une initiative co-construit avec la Lead PM Aurélie : cadrage approfondi et priorisation cross-équipe (jaune) avant les sprints de delivery (couloirs verts)' }
      }
    },
    initiative3: {
      eyebrow: 'Initiative 3',
      title: 'Recherche utilisateur',
      subtitle: 'Tableau de bord candidat',
      problem: 'Le problème',
      problemText: 'Les décisions produit se prenaient sans données utilisateurs consolidées. Les retours terrain existaient mais restaient éparpillés dans les notes individuelles.',
      whatIDid: 'Ce que j\'ai fait',
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
          'Protocole de tests, guides d\'entretien, prise de notes, enregistrements',
          'Tableaux de priorisation des retours : quickwins, bugs techniques, problèmes UX, correctifs UI, feature requests'
        ]
      },
      presentation: {
        title: 'Restitution',
        items: [
          '2 rapports de synthèse présentés en plénière',
          'Fichiers consolidés pour analyse continue'
        ]
      },
      impact: 'Base de connaissance utilisateur opérationnelle. Les décisions produit s\'appuient désormais sur des données qualitatives structurées.',
      reportButton: 'Voir le rapport complet',
      imageCaption: 'Interface tableau de bord candidat testée avec les utilisateurs',
      bentoImages: {
        large: { src: '/images/francevae/UXR - Rapport de campangne de test tableau de bord.webp', caption: 'Synthèse présentée en plénière, transformer les retours épars en décisions produit actionnables' },
        small1: { src: '/images/francevae/UXR - test - script candidat 01.webp', caption: 'Guide d\'entretien standardisé pour assurer la reproductibilité des tests entre les vagues' },
        small2: { src: '/images/francevae/UXR - test - tableau prio.webp', caption: 'Catégorisation des retours : quick-wins, bugs, problèmes UX et features' }
      }
    },
    initiative4: {
      eyebrow: 'Initiative 4',
      title: 'Ateliers design thinking',
      subtitle: 'Avec les acteurs terrain',
      problem: 'Le problème',
      problemText: 'L\'équipe produit manquait de contact direct avec les accompagnateurs, acteurs clés du parcours VAE. Les décisions de conception se prenaient avec une compréhension partielle du contexte métier.',
      whatIDid: 'Ce que j\'ai fait',
      preparation: {
        title: 'Préparation (1 semaine)',
        items: [
          'Identification des structures d\'accompagnement influentes',
          'Construction du programme sur 2 jours',
          'Coordination logistique'
        ]
      },
      facilitation: {
        title: 'Animation (2 jours)',
        items: [
          'Débat structuré sur une problématique métier',
          'Ateliers d\'identification de thématiques prioritaires',
          'Sessions d\'idéation sur les problèmes plateforme',
          'Co-création de concepts avec croquis de solutions'
        ]
      },
      internal: {
        title: 'Ateliers internes complémentaires',
        items: [
          'Crazy-8 avec l\'équipe interne',
          'Ateliers sur l\'évolution du système de notification',
          'Audit et catégorisation de l\'ensemble des emails utilisateurs'
        ]
      },
      impact: 'Co-création de solutions ancrées dans le réel. Les accompagnateurs sont devenus des partenaires actifs de la conception.',
      imageCaption: 'Atelier design thinking avec les structures d\'accompagnement AAP',
      bentoImages: {
        large: { src: '/images/francevae/photo atelier aap.webp', caption: 'Les accompagnateurs deviennent partenaires actifs de la conception, comblant le fossé entre équipe produit et réalité terrain' },
        small1: { src: '/images/francevae/animation atelier 00.webp', caption: 'Découverte data-driven : les insights terrain qui ont cadré l\'agenda de l\'atelier' },
        small2: { src: '/images/francevae/animation atelier 01.webp', caption: 'Méthode des Six Chapeaux : divergence structurée avant convergence' }
      }
    },
    initiative5: {
      eyebrow: 'Initiative 5',
      title: 'Expérimentation IA',
      subtitle: 'Orientation candidat',
      context: '55% des candidats ne savent pas si la VAE leur convient. Beaucoup choisissent des certifications par défaut. L\'initiative explorait comment l\'IA pourrait aider les candidats à identifier si la VAE correspond à leur profil et quelle certification matcher avec leurs compétences.',
      whatIDid: 'Ce que j\'ai fait',
      study: {
        title: 'Étude prospective (1 semaine)',
        items: [
          'Identification des archétypes utilisateurs : professionnels expérimentés sans diplôme, reconvertis, demandeurs d\'emploi en transition',
          'Mapping des barrières spécifiques à chaque profil',
          'Benchmark des solutions d\'orientation existantes'
        ]
      },
      ideation: {
        title: 'Idéation (3 jours)',
        items: [
          '10+ concepts pour candidats engagés et non-engagés',
          'Chatbots, matching compétences-certification, simulateurs d\'impact carrière, galeries de témoignages, analyseurs d\'opportunités locales'
        ]
      },
      prototyping: {
        title: 'Prototypage rapide (1 semaine)',
        items: [
          'Chatbot de positionnement VAE : Assistant conversationnel évaluant la pertinence de la VAE selon la situation professionnelle du candidat',
          'Orientation IA avec radar de compétences : Outil analysant les compétences via CV/LinkedIn et guidant vers les certifications correspondantes, avec visualisation radar des écarts'
        ]
      },
      impact: 'Initiative déprioritisée mais prototypes fonctionnels livrés en 1 semaine. Démonstration de la capacité à explorer rapidement des pistes innovantes sans bloquer les autres chantiers.',
      tryDemo: 'Essayer la démo',
      chatbotCaption: 'Prototype chatbot IA - Évaluation du positionnement VAE',
      radarCaption: 'Prototype radar de compétences - Outil d\'orientation carrière'
    },
    learnings: {
      eyebrow: 'Apprentissages',
      title: 'Ce que j\'ai appris',
      items: [
        {
          title: 'Designer pour des citoyens, pas des utilisateurs',
          text: 'Dans le service public, le succès ne se mesure pas en conversion mais en accès, compréhension et autonomisation. Les métriques classiques ne s\'appliquent pas.'
        },
        {
          title: 'Naviguer les contraintes institutionnelles',
          text: 'Processus d\'achat public, réglementation, vocabulaire institutionnel : chaque décision design tient compte d\'un écosystème d\'acteurs aux logiques différentes.'
        },
        {
          title: 'Structurer avant de produire',
          text: 'Dans un contexte à forte incertitude, investir dans le processus génère plus d\'impact que livrer des écrans supplémentaires.'
        },
        {
          title: 'Prototyper pour dérisquer',
          text: 'Les prototypes IA ont permis de tester des hypothèses en 1 semaine plutôt que de spécifier pendant 2 mois. Même déprioritisés, ils ont informé les décisions produit.'
        }
      ]
    },
    testimonial: {
      eyebrow: 'Témoignage',
      quote: 'Victor a rapidement compris la complexité de notre environnement et a su structurer les opérations design tout en livrant des fonctionnalités critiques. Sa capacité à naviguer les contraintes institutionnelles tout en maintenant des standards design élevés était remarquable.',
      author: 'Boris Aimé-Bauderlique',
      role: 'Chargé de déploiement - FranceVAE'
    },
    uiDelivery: {
      eyebrow: 'UI & Livraison',
      title: 'Fonctionnalités livrées',
      subtitle: 'Au-delà du processus et de la recherche, des livrables concrets mis en production.',
      homepageTitle: 'Refonte de la homepage',
      homepageDescription: 'Refonte complète de la page d\'accueil France VAE pour améliorer la clarté, l\'accessibilité et la conversion. Le nouveau design met en valeur la proposition de valeur et simplifie les points d\'entrée pour les différents profils utilisateurs.',
      homepageBefore: 'Avant',
      homepageAfter: 'Après',
      homepageCaption: 'Page d\'accueil France VAE - Avant et après la refonte',
      searchEngineTitle: 'Moteur de recherche de certifications',
      searchEngineDescription: 'Refonte du moteur de recherche de certifications pour aider les candidats à trouver la certification adaptée à leur expérience professionnelle. Filtres améliorés, présentation des résultats plus claire, et meilleur accompagnement à travers les 16 000+ certifications disponibles.',
      videoTitle: 'Vidéo de présentation pour le cabinet de la Ministre du Travail',
      videoSubtitle: 'Mon dernier livrable chez France VAE : conception et production complète d\'une vidéo présentant tout le parcours du candidat sur la plateforme, présentée au cabinet de la Ministre du Travail.',
      videoCaption: 'Présentation de la plateforme France VAE - Conçue et réalisée par Victor Soussan pour le cabinet ministériel'
    },
    cta: {
      title: 'Intéressé par une collaboration ?',
      button: 'Me contacter'
    },
    initiatives: {
      eyebrow: 'Mission 6 mois',
      title: 'Cinq initiatives\nà fort impact'
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.25, delay: delay * 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
  isDark: boolean;
  onClick: (src: string) => void;
  className?: string;
  aspectRatio?: string;
}> = ({ src, alt, caption, isDark, onClick, className = '', aspectRatio }) => {
  return (
    <figure className={className}>
      <div
        onClick={() => onClick(src)}
        className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-[1.01] ${
          isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
        } ${aspectRatio || ''}`}
      >
        <img loading="lazy"
          src={src}
          alt={alt}
          className={`w-full h-full transition-transform group-hover:scale-[1.02] ${aspectRatio ? 'object-cover object-top' : 'object-cover'}`}
        />
      </div>
      {caption && (
        <figcaption className={`mt-3 text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// Bento Image Grid - Landscape priority: 1 large full-width on top + 2 thumbnails below with 3:2 ratio + optional large2 at bottom
const BentoImageGrid: React.FC<{
  large: { src: string; caption: string };
  small1: { src: string; caption: string };
  small2: { src: string; caption: string };
  large2?: { src: string; caption: string };
  isDark: boolean;
  onClick: (src: string) => void;
}> = ({ large, small1, small2, large2, isDark, onClick }) => {
  return (
    <div className="space-y-6">
      {/* Large landscape image - full width on top */}
      <figure>
        <div
          onClick={() => onClick(large.src)}
          className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-[1.005] ${
            isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
        >
          <img loading="lazy"
            src={large.src}
            alt={large.caption}
            className="w-full h-auto object-cover object-left-top transition-transform group-hover:scale-[1.01]"
          />
        </div>
        <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {large.caption}
        </figcaption>
      </figure>

      {/* Two smaller thumbnails side by side below - 3:2 aspect ratio with background */}
      <div className="grid grid-cols-2 gap-6 items-start">
        <figure>
          <div
            onClick={() => onClick(small1.src)}
            className={`group cursor-pointer rounded-xl overflow-hidden border transition-all hover:scale-[1.01] aspect-[3/2] flex items-center justify-center ${
              isDark
                ? 'border-white/10 hover:border-white/20 bg-white/5'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg bg-gray-100'
            }`}
          >
            <img loading="lazy"
              src={small1.src}
              alt={small1.caption}
              className="w-full h-full object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>
          <figcaption className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {small1.caption}
          </figcaption>
        </figure>
        <figure>
          <div
            onClick={() => onClick(small2.src)}
            className={`group cursor-pointer rounded-xl overflow-hidden border transition-all hover:scale-[1.01] aspect-[3/2] flex items-center justify-center ${
              isDark
                ? 'border-white/10 hover:border-white/20 bg-white/5'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg bg-gray-100'
            }`}
          >
            <img loading="lazy"
              src={small2.src}
              alt={small2.caption}
              className="w-full h-full object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>
          <figcaption className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {small2.caption}
          </figcaption>
        </figure>
      </div>

      {/* Optional second large image at the bottom */}
      {large2 && (
        <figure>
          <div
            onClick={() => onClick(large2.src)}
            className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-[1.005] ${
              isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}
          >
            <img loading="lazy"
              src={large2.src}
              alt={large2.caption}
              className="w-full h-auto object-cover object-left-top transition-transform group-hover:scale-[1.01]"
            />
          </div>
          <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {large2.caption}
          </figcaption>
        </figure>
      )}
    </div>
  );
};

// Section with bullet list
const BulletSection: React.FC<{
  title: string;
  items: string[];
  isDark: boolean;
}> = ({ title, items, isDark }) => {
  return (
    <div className="mb-8">
      <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
            <span className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Impact block
const ImpactBlock: React.FC<{
  text: string;
  isDark: boolean;
}> = ({ text, isDark }) => {
  return (
    <div className={`p-6 rounded-2xl border-l-4 ${
      isDark
        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
        : 'bg-emerald-50 border-emerald-500 text-emerald-800'
    }`}>
      <p className="font-medium">{text}</p>
    </div>
  );
};

// ============================================================================
// BEFORE/AFTER SLIDER COMPONENT
// ============================================================================

const BeforeAfterSlider: React.FC<{
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  isDark: boolean;
  onImageClick: (src: string) => void;
}> = ({ beforeSrc, afterSrc, beforeLabel, afterLabel, isDark }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Click anywhere on container to move slider
  const handleContainerClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border cursor-ew-resize select-none ${
        isDark ? 'border-white/10' : 'border-gray-200'
      }`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onClick={handleContainerClick}
    >
      {/* After image (full size, visible on right side) */}
      <img loading="lazy"
        src={afterSrc}
        alt="After"
        className="w-full h-auto block pointer-events-none"
        draggable={false}
      />

      {/* Before image (clipped with clip-path, visible on left side) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img loading="lazy"
          src={beforeSrc}
          alt="Before"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Vertical line */}
        <div className="absolute inset-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]" />

        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
          <div className="flex items-center gap-0.5">
            <ChevronDown size={16} className="text-gray-700 rotate-90" />
            <ChevronDown size={16} className="text-gray-700 -rotate-90" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold z-10 ${
        isDark ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-900 shadow-md'
      }`}>
        {beforeLabel}
      </div>
      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold z-10 ${
        isDark ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-900 shadow-md'
      }`}>
        {afterLabel}
      </div>
    </div>
  );
};

// ============================================================================
// EXPANDABLE SECTION - Progressive Disclosure
// ============================================================================

const ExpandableSection: React.FC<{
  children: React.ReactNode;
  previewLines?: number;
  isDark: boolean;
  expandLabel?: string;
  collapseLabel?: string;
}> = ({ children, previewLines = 3, isDark, expandLabel = 'Read more', collapseLabel = 'Show less' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div
              className="overflow-hidden"
              style={{ maxHeight: `${previewLines * 1.75}rem` }}
            >
              {children}
            </div>
            {/* Gradient fade */}
            <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t pointer-events-none ${
              isDark ? 'from-[#0a0a0a]' : 'from-white'
            }`} />
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={contentRef}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
          isDark
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-blue-600 hover:text-blue-700'
        }`}
      >
        {isExpanded ? collapseLabel : expandLabel}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
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
        "Découverte avec RH et centres de formation",
        "Prototype complet du parcours employeur",
        "Pitch deck B2B pour démarchage",
        "Vidéo promotionnelle avec screencast",
        "MVP fonctionnel prêt au déploiement"
      ]
    },
    {
      id: 2,
      title: "Opérations Produit",
      duration: "5 semaines",
      icon: Layers,
      description: "Restructuration des workflows pour livrer plus vite.",
      features: [
        "Diagnostic des équipes en silos",
        "Nouveau modèle avec saisons d\'1 mois",
        "Matrice de priorisation cross-équipe",
        "Séparation discovery/delivery",
        "Rituels hebdo PO/designer"
      ]
    },
    {
      id: 3,
      title: "Recherche Utilisateur",
      duration: "4 semaines",
      icon: Users,
      description: "Construction d\'une base de connaissance candidat.",
      features: [
        "Base de connaissance utilisateur",
        "10 entretiens modérés (2 vagues)",
        "Protocoles de test et guides",
        "Tableaux de priorisation retours",
        "2 rapports de synthèse produit"
      ]
    },
    {
      id: 4,
      title: "Ateliers Design Thinking",
      duration: "3 semaines",
      icon: Lightbulb,
      description: "Co-création avec les acteurs terrain.",
      features: [
        "Atelier 2 jours avec structures AAP",
        "Du cadrage problème aux croquis",
        "Sessions d\'idéation Crazy-8",
        "Audit système de notifications",
        "Catégorisation et optimisation emails"
      ]
    },
    {
      id: 5,
      title: "Expérimentation IA",
      duration: "2 semaines",
      icon: Bot,
      description: "Prototypage rapide d\'outils d\'orientation IA.",
      features: [
        "Identification archétypes utilisateurs",
        "10+ explorations concepts IA",
        "Prototype chatbot positionnement",
        "Visualisation radar compétences",
        "2 prototypes fonctionnels déployés"
      ]
    }
  ]
};

const InitiativesDiagram: React.FC<{
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ isDark, lang }) => {
  const [activeInitiative, setActiveInitiative] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const initiatives = INITIATIVES_DATA[lang];

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
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const texts = {
    focus: lang === 'fr' ? 'Focus' : 'Focus',
    overview: lang === 'fr' ? 'Vue d\'ensemble' : 'Overview',
    keyDeliverables: lang === 'fr' ? 'Livrables clés' : 'Key Deliverables',
    initiative: lang === 'fr' ? 'Initiative' : 'Initiative'
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
          <div className="flex items-center justify-center gap-2 mb-8">
            {initiatives.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveInitiative(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activeInitiative
                    ? `w-10 ${isDark ? 'bg-white' : 'bg-gray-900'}`
                    : `w-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          {/* Card Container */}
          <div className="relative h-[520px] md:h-[420px]">
            {initiatives.map((initiative, idx) => {
              const isActive = idx === activeInitiative;
              const isPrev = idx < activeInitiative;
              const isNext = idx > activeInitiative;
              const InitiativeIcon = initiative.icon;

              return (
                <div
                  key={initiative.id}
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
                          isDark ? 'bg-white text-black' : 'bg-blue-600 text-white'
                        }`}>
                          <InitiativeIcon size={26} strokeWidth={2} />
                        </div>
                        <div className={`uppercase tracking-widest text-[10px] font-bold mb-2 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {texts.initiative} {initiative.id}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-bold leading-tight mb-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {initiative.title}
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                          isDark ? 'bg-white/10 text-gray-300' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {initiative.duration}
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed mt-6 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {initiative.description}
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
                        {initiative.features.map((feature, fIdx) => (
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
              disabled={activeInitiative === 0}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeInitiative === initiatives.length - 1}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none ${
                isDark ? 'bg-white/80 text-black' : 'bg-white shadow-lg text-gray-900'
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        /* Overview View - Grid of all initiatives */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((initiative) => {
            const InitiativeIcon = initiative.icon;
            return (
              <div
                key={initiative.id}
                onClick={() => {
                  setActiveInitiative(initiative.id - 1);
                  setViewMode('focus');
                }}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-white shadow-sm hover:shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDark
                      ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <InitiativeIcon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {texts.initiative} {initiative.id}
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-blue-600'}`}>
                      {initiative.duration}
                    </div>
                  </div>
                </div>

                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {initiative.title}
                </h4>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
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
  systemTheme,
  lang,
  onImageClick,
  onContact
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];

  // State for modals
  const [prototypeModalOpen, setPrototypeModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>

      {/* HERO - Grid with Testimonial Card */}
      <section className="px-10 pt-8 pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Left Column - Title and Description */}
            <div className="md:col-span-3">
              {/* Logo */}
              <img loading="lazy"
                src="/images/francevae/logo fvae.webp"
                alt="France VAE"
                className="h-10 w-auto mb-6"
              />

              {/* Meta tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.meta.role}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.meta.scope}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.meta.period}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-[-0.02em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <p className={`text-lg md:text-xl leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.hero.subtitle}
              </p>

              {/* Visit button */}
              <a
                href="https://vae.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <ExternalLink size={16} className="mr-2" />
                {t.hero.visitSite}
              </a>
            </div>

            {/* Right Column - Testimonial Card */}
            <div className="md:col-span-2 md:pt-16">
              <div
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? 'bg-blue-900/20 border-blue-500/20'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <Quote
                  size={24}
                  className={`mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
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
                    src="/images/boris-aime-bauderlique.webp"
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
        </div>
      </section>

      {/* Meta Card - Full width */}
      <section className="px-10 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                  <Layers size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Product Design</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                  <Briefcase size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Scope</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.scope}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                  <Calendar size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Period</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.period}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                  <Building2 size={20} className={isDark ? 'text-orange-400' : 'text-orange-600'} />
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image - 2:3 aspect ratio aligned top */}
      <section className="px-10 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <ClickableImage
              src="/images/francevae/france_vae_home.webp"
              alt="France VAE Homepage"
              caption={t.hero.heroCaption}
              isDark={isDark}
              onClick={onImageClick}
              aspectRatio="aspect-[3/2]"
            />
          </FadeInSection>
        </div>
      </section>

      {/* INTERACTIVE INITIATIVES DIAGRAM */}
      <section className="px-10 py-16">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {t.initiatives.eyebrow}
            </span>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.initiatives.title}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <InitiativesDiagram isDark={isDark} lang={lang} />
          </FadeInSection>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">

          {/* CONTEXT */}
          <section id="context" className="mb-40 md:mb-48">
            <FadeInSection>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.context.title}
              </h2>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <p className={`text-lg md:text-xl leading-relaxed mb-12 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.context.intro}
              </p>
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <FadeInSection delay={0.2}>
                <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.context.challenge}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.context.challengeText}
                </p>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.context.myScope}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.context.myScopeText}
                </p>
              </FadeInSection>
            </div>
          </section>

          {/* INITIATIVE 1: VAE COLLECTIVE */}
          <section id="initiative-1" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                {t.initiative1.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative1.title}
              </h2>
              <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.initiative1.subtitle}
              </p>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative1.problem}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-12 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.initiative1.problemText}
              </p>
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative1.whatIDid}
              </h3>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <BulletSection title={t.initiative1.discovery.title} items={t.initiative1.discovery.items} isDark={isDark} />
                <BulletSection title={t.initiative1.design.title} items={t.initiative1.design.items} isDark={isDark} />
              </div>
              <BulletSection title={t.initiative1.deliverables.title} items={t.initiative1.deliverables.items} isDark={isDark} />
            </FadeInSection>

            {/* Prototype image with CTA below */}
            <FadeInSection delay={0.3} className="mt-12">
              <figure className="mb-8">
                <div
                  onClick={() => onImageClick(t.initiative1.bentoImages.large.src)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-[1.01] ${
                    isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}
                >
                  <img
                    loading="lazy"
                    src={t.initiative1.bentoImages.large.src}
                    alt={t.initiative1.bentoImages.large.caption}
                    className="w-full h-auto object-cover transition-transform group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className={`mt-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t.initiative1.bentoImages.large.caption}
                </figcaption>
              </figure>

              {/* CTA Button - directly under prototype */}
              <div className="text-center my-12">
                <button
                  onClick={() => setPrototypeModalOpen(true)}
                  className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors ${
                    isDark
                      ? 'bg-orange-500 hover:bg-orange-400 text-white'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {t.initiative1.prototypeButton}
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Presentation slides - two thumbnails side by side */}
              <div className="grid grid-cols-2 gap-6">
                <figure>
                  <div
                    onClick={() => onImageClick(t.initiative1.bentoImages.small1.src)}
                    className={`group cursor-pointer rounded-xl overflow-hidden border transition-all hover:scale-[1.01] ${
                      isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    <img loading="lazy"
                      src={t.initiative1.bentoImages.small1.src}
                      alt={t.initiative1.bentoImages.small1.caption}
                      className="w-full h-auto object-cover object-left-top transition-transform group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.initiative1.bentoImages.small1.caption}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    onClick={() => onImageClick(t.initiative1.bentoImages.small2.src)}
                    className={`group cursor-pointer rounded-xl overflow-hidden border transition-all hover:scale-[1.01] ${
                      isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    <img loading="lazy"
                      src={t.initiative1.bentoImages.small2.src}
                      alt={t.initiative1.bentoImages.small2.caption}
                      className="w-full h-auto object-cover object-left-top transition-transform group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.initiative1.bentoImages.small2.caption}
                  </figcaption>
                </figure>
              </div>
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4}>
              <ImpactBlock text={t.initiative1.impact} isDark={isDark} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 2: PRODUCT OPS */}
          <section id="initiative-2" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                {t.initiative2.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative2.title}
              </h2>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative2.problem}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-12 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.initiative2.problemText}
              </p>
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative2.whatIDid}
              </h3>
              <ExpandableSection
                isDark={isDark}
                previewLines={8}
                expandLabel={t.progressive.readMore}
                collapseLabel={t.progressive.showLess}
              >
                <div className="space-y-8 mb-10">
                  <BulletSection title={t.initiative2.diagnostic.title} items={t.initiative2.diagnostic.items} isDark={isDark} />
                  <BulletSection title={t.initiative2.coDesign.title} items={t.initiative2.coDesign.items} isDark={isDark} />
                  <BulletSection title={t.initiative2.matrix.title} items={t.initiative2.matrix.items} isDark={isDark} />
                  <BulletSection title={t.initiative2.deployment.title} items={t.initiative2.deployment.items} isDark={isDark} />
                </div>
              </ExpandableSection>
            </FadeInSection>

            {/* Bento image grid */}
            <FadeInSection delay={0.3} className="my-12">
              <BentoImageGrid
                large={t.initiative2.bentoImages.large}
                small1={t.initiative2.bentoImages.small1}
                small2={t.initiative2.bentoImages.small2}
                large2={t.initiative2.bentoImages.large2}
                isDark={isDark}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4}>
              <ImpactBlock text={t.initiative2.impact} isDark={isDark} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 3: USER RESEARCH */}
          <section id="initiative-3" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                {t.initiative3.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative3.title}
              </h2>
              <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.initiative3.subtitle}
              </p>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative3.problem}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-12 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.initiative3.problemText}
              </p>
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative3.whatIDid}
              </h3>
              <ExpandableSection
                isDark={isDark}
                previewLines={6}
                expandLabel={t.progressive.readMore}
                collapseLabel={t.progressive.showLess}
              >
                <div className="space-y-8 mb-10">
                  <BulletSection title={t.initiative3.structuring.title} items={t.initiative3.structuring.items} isDark={isDark} />
                  <BulletSection title={t.initiative3.campaigns.title} items={t.initiative3.campaigns.items} isDark={isDark} />
                  <BulletSection title={t.initiative3.presentation.title} items={t.initiative3.presentation.items} isDark={isDark} />
                </div>
              </ExpandableSection>
            </FadeInSection>

            {/* Bento image grid */}
            <FadeInSection delay={0.3} className="my-12">
              <BentoImageGrid
                large={t.initiative3.bentoImages.large}
                small1={t.initiative3.bentoImages.small1}
                small2={t.initiative3.bentoImages.small2}
                isDark={isDark}
                onClick={onImageClick}
              />
              <div className="mt-10 text-center">
                <button
                  onClick={() => setReportModalOpen(true)}
                  className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors ${
                    isDark
                      ? 'bg-pink-500 hover:bg-pink-400 text-white'
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  {t.initiative3.reportButton}
                  <ExternalLink size={18} />
                </button>
              </div>
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4}>
              <ImpactBlock text={t.initiative3.impact} isDark={isDark} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 4: WORKSHOPS */}
          <section id="initiative-4" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                {t.initiative4.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative4.title}
              </h2>
              <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.initiative4.subtitle}
              </p>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            {/* Problem */}
            <FadeInSection delay={0.1}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative4.problem}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-12 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.initiative4.problemText}
              </p>
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative4.whatIDid}
              </h3>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <BulletSection title={t.initiative4.preparation.title} items={t.initiative4.preparation.items} isDark={isDark} />
                <BulletSection title={t.initiative4.facilitation.title} items={t.initiative4.facilitation.items} isDark={isDark} />
              </div>
              <BulletSection title={t.initiative4.internal.title} items={t.initiative4.internal.items} isDark={isDark} />
            </FadeInSection>

            {/* Bento image grid */}
            <FadeInSection delay={0.3} className="my-12">
              <BentoImageGrid
                large={t.initiative4.bentoImages.large}
                small1={t.initiative4.bentoImages.small1}
                small2={t.initiative4.bentoImages.small2}
                isDark={isDark}
                onClick={onImageClick}
              />
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4}>
              <ImpactBlock text={t.initiative4.impact} isDark={isDark} />
            </FadeInSection>
          </section>

          {/* INITIATIVE 5: AI */}
          <section id="initiative-5" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {t.initiative5.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative5.title}
              </h2>
              <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.initiative5.subtitle}
              </p>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            {/* Context */}
            <FadeInSection delay={0.1}>
              <p className={`text-base md:text-lg leading-relaxed mb-12 italic max-w-4xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.initiative5.context}
              </p>
            </FadeInSection>

            {/* What I did */}
            <FadeInSection delay={0.2}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.initiative5.whatIDid}
              </h3>
              <ExpandableSection
                isDark={isDark}
                previewLines={6}
                expandLabel={t.progressive.readMore}
                collapseLabel={t.progressive.showLess}
              >
                <div className="space-y-8 mb-10">
                  <BulletSection title={t.initiative5.study.title} items={t.initiative5.study.items} isDark={isDark} />
                  <BulletSection title={t.initiative5.ideation.title} items={t.initiative5.ideation.items} isDark={isDark} />
                  <BulletSection title={t.initiative5.prototyping.title} items={t.initiative5.prototyping.items} isDark={isDark} />
                </div>
              </ExpandableSection>
            </FadeInSection>

            {/* Prototype images */}
            <FadeInSection delay={0.3} className="my-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ClickableImage
                    src="/images/francevae/proto IA - chatbot de positionnement.webp"
                    alt="AI Chatbot Prototype"
                    caption={t.initiative5.chatbotCaption}
                    isDark={isDark}
                    onClick={onImageClick}
                  />
                  <div className="mt-3 text-center">
                    <a
                      href="https://joyful-unicorn-489a7b.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        isDark
                          ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      <Play size={14} />
                      {t.initiative5.tryDemo}
                    </a>
                  </div>
                </div>
                <div>
                  <ClickableImage
                    src="/images/francevae/proto IA - orientation professionnelle assistee par IA.webp"
                    alt="AI Skills Radar Prototype"
                    caption={t.initiative5.radarCaption}
                    isDark={isDark}
                    onClick={onImageClick}
                  />
                  <div className="mt-3 text-center">
                    <a
                      href="https://flourishing-cascaron-0d6509.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        isDark
                          ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      <Play size={14} />
                      {t.initiative5.tryDemo}
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Impact */}
            <FadeInSection delay={0.4}>
              <ImpactBlock text={t.initiative5.impact} isDark={isDark} />
            </FadeInSection>
          </section>

          {/* UI & DELIVERY */}
          <section id="ui-delivery" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                {t.uiDelivery.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.uiDelivery.title}
              </h2>
              <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.uiDelivery.subtitle}
              </p>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            {/* Homepage Before/After */}
            <FadeInSection delay={0.1} className="mb-16">
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.uiDelivery.homepageTitle}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.uiDelivery.homepageDescription}
              </p>
              <figure>
                <BeforeAfterSlider
                  beforeSrc="/images/francevae/france_vae_home_before_2x.webp"
                  afterSrc="/images/francevae/france_vae_home_after_2x.webp"
                  beforeLabel={t.uiDelivery.homepageBefore}
                  afterLabel={t.uiDelivery.homepageAfter}
                  isDark={isDark}
                  onImageClick={onImageClick}
                />
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t.uiDelivery.homepageCaption}
                </figcaption>
              </figure>
            </FadeInSection>

            {/* Search Engine - Text description */}
            <FadeInSection delay={0.15} className="mb-16">
              <div className={`p-8 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 p-3 rounded-xl ${isDark ? 'bg-teal-500/20' : 'bg-teal-100'}`}>
                    <Search size={24} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.uiDelivery.searchEngineTitle}
                    </h4>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.uiDelivery.searchEngineDescription}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Video Section */}
            <FadeInSection delay={0.2}>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.uiDelivery.videoTitle}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.uiDelivery.videoSubtitle}
              </p>
              <figure>
                <div className={`rounded-2xl overflow-hidden border ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <video
                    controls
                    className="w-full h-auto"
                  >
                    <source src="/images/francevae/20250701 - Video ministre - revision 3'30.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t.uiDelivery.videoCaption}
                </figcaption>
              </figure>
            </FadeInSection>
          </section>

          {/* TESTIMONIAL */}
          <section className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                {t.testimonial.eyebrow}
              </span>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <div className={`mt-8 p-8 md:p-10 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'}`}>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <img loading="lazy"
                      src="/images/boris-aime-bauderlique.webp"
                      alt={t.testimonial.author}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <blockquote className={`text-lg md:text-xl leading-relaxed italic ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      "{t.testimonial.quote}"
                    </blockquote>
                    <div className="mt-5">
                      <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.testimonial.author}
                      </p>
                      <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </section>

          {/* LEARNINGS */}
          <section id="learnings" className="mb-40 md:mb-48">
            <FadeInSection>
              <span className={`text-sm md:text-base font-medium tracking-wide ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {t.learnings.eyebrow}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.learnings.title}
              </h2>
              <hr className={`mb-10 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-8">
              {t.learnings.items.map((item, idx) => (
                <FadeInSection key={idx} delay={0.1 + idx * 0.05}>
                  <div className={`p-8 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.text}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center pb-16 md:pb-24">
            <FadeInSection>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.cta.title}
              </h2>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 text-lg font-semibold rounded-full transition-colors bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t.cta.button}
                <ArrowRight size={20} />
              </button>
            </FadeInSection>
          </section>

        </div>
      </div>

      {/* PROTOTYPE MODAL */}
      <AnimatePresence>
        {prototypeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm border-b border-white/10">
              <div className="flex items-center gap-3">
                <img loading="lazy" src="/images/francevae/logo fvae.webp" alt="France VAE" className="h-6 w-auto" />
                <span className="text-white/70 text-sm font-medium">
                  {lang === 'fr' ? 'Prototype VAE Collective' : 'VAE Collective Prototype'}
                </span>
              </div>
              <button
                onClick={() => setPrototypeModalOpen(false)}
                className="relative p-3 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors before:absolute before:inset-[-12px] before:content-['']"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 relative">
              <iframe
                src="https://golden-parfait-cc3d92.netlify.app/"
                className="absolute inset-0 w-full h-full border-0"
                title="VAE Collective Prototype"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REPORT MODAL */}
      <AnimatePresence>
        {reportModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm border-b border-white/10">
              <div className="flex items-center gap-3">
                <img loading="lazy" src="/images/francevae/logo fvae.webp" alt="France VAE" className="h-6 w-auto" />
                <span className="text-white/70 text-sm font-medium">
                  {lang === 'fr' ? 'Rapport de test - Tableau de bord candidat' : 'Test Report - Candidate Dashboard'}
                </span>
              </div>
              <button
                onClick={() => setReportModalOpen(false)}
                className="relative p-3 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors before:absolute before:inset-[-12px] before:content-['']"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 relative">
              <iframe
                src="https://tests-utilisateur-tableau-de-bord-c.vercel.app"
                className="absolute inset-0 w-full h-full border-0"
                title="UXR Test Report"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FranceVaeFull;
