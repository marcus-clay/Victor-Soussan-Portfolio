/**
 * FranceVaeFull - Complete case study: summary first, then narration
 *
 * - Hero (the intro is the executive summary), client testimonial, summary
 * - 01 Approach: overview of the five initiatives, then one h3 block each
 *   (problem, what I did, impact); sub-anchors initiative-1 to initiative-5
 * - 02 Product: homepage before and after, search engine, ministry video
 * - 03 Learnings
 */

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { imgDims } from '@/utils/imageDimensions'
import ExpandableSection from './ExpandableSection';
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import { motion } from 'framer-motion';
import { useReveal } from '@/lib/motion'
import { zoomable } from '@/utils/zoomable'
import VideoPlayer from '@/components/VideoPlayer'
import {
  ArrowRight,
  Play,
  ArrowSquareOut as ExternalLink,
  CheckCircle as CheckCircle2,
  CaretDown as ChevronDown,
  ArrowsOut,
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
      company: 'beta.gouv.fr',
      type: 'Product Design',
      labels: { role: 'Role', type: 'Type', scope: 'Scope', company: 'Company' }
    },
    ui: {
      focus: 'Focus',
      impact: 'Impact',
      viewAllVisuals: 'View all visuals',
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
      zoomLabel: 'View the homepage before and after in full size',
      videoFallback: 'Your browser does not support the video tag.'
    },
    hero: {
      title: 'Shipping fast in a complex environment',
      intro: 'As Lead Product Designer at France VAE, the national public service for VAE, I structured design and discovery so the team could ship faster on politically driven requests. Five initiatives, from an employer MVP to AI prototypes.',
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
    acts: {
      approach: 'Five initiatives to ship faster',
      product: 'Shipping features',
      learnings: 'What I learned',
      processTitle: 'Structuring how the team works',
      deliveryTitle: 'What shipped and what was tested',
    },
    summary: {
      context: 'France VAE is the national public service for Validation of Acquired Experience (VAE): it lets citizens without diplomas have their professional experience officially recognized. The service reaches 100K+ candidates, and critical features often came from politically driven requests with immature specs.',
      role: 'Lead Product Designer on a mission at beta.gouv.fr. I led the design team process, co-drove the roadmap with the Lead PM and structured discovery so the delivery team could ship faster. A transversal role across the whole product cycle.',
      roleItems: [
        { title: 'Monthly seasons', detail: 'One-month cycles' },
        { title: 'Prioritization matrix', detail: 'Co-designed with the Lead PM' },
        { title: 'User research', detail: '10 interviews and workshops' },
        { title: 'Design ops', detail: 'Figma and delivery' },
      ],
      deliverables: [
        { title: 'MVP VAE Collective', detail: 'Employer journey prototype for collective VAE, sales deck and promotional video.' },
        { title: 'Product operations', detail: 'One-month seasons, a three-tier strategic framework and a cross-team prioritization matrix.' },
        { title: 'User research', detail: 'Knowledge base, 10 moderated interviews in 2 waves and 2 synthesis reports.' },
        { title: 'Design thinking workshops', detail: 'A 2-day workshop with accompaniment providers, plus internal workshops.' },
        { title: 'AI experimentation', detail: 'Two functional prototypes in 1 week: a positioning chatbot and a skills radar.' },
        { title: 'UI deliveries', detail: 'Homepage redesign, certification search engine and a presentation video for the Minister of Labor\'s cabinet.' },
      ],
      metrics: [
        { value: '100K+', label: 'Candidates served by the platform' },
        { value: '10', label: 'Moderated interviews, in 2 waves' },
        { value: '1 week', label: 'To deliver two functional AI prototypes' },
      ],
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
      brief: 'Companies running a collective VAE had no dedicated tool: HR teams coordinated cohorts of 10 to 90 candidates by email and spreadsheet. After two weeks of discovery, I designed the employer journey prototype, a B2B pitch deck and a promotional video. Result: a structured B2B offer ready to deploy.',
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
      brief: 'Priorities changed often and teams worked in silos. With the Lead PM, I introduced one-month seasons (25% preparation, 50% execution, 25% retrospective), a three-tier framework (objectives, initiatives, features) and a cross-team prioritization matrix. Decisions got faster and teams now share a framework to arbitrate.',
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
      brief: 'Product decisions were made without consolidated user data. I set up a centralized knowledge base and ran 10 moderated remote interviews in two waves on the new candidate dashboard, then presented two synthesis reports in plenary. Product decisions now rely on structured qualitative data.',
      reportCaption: 'Synthesis report of the dashboard test campaign',
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
      brief: 'The product team had no direct contact with accompaniment providers, key actors of the VAE journey. I built and facilitated a two-day design thinking workshop with them, from problem framing to solution sketches. They became active design partners.',
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
      brief: '55% of candidates don\'t know if VAE suits them. I explored 10+ concepts, then built two functional prototypes in one week: a positioning chatbot and a skills radar. The initiative was deprioritized, but the prototypes informed product decisions.',
      chatbotDemo: 'Try the chatbot demo',
      radarDemo: 'Try the skills radar demo',
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
      brief: 'The homepage was redesigned to clarify the value proposition and simplify the entry points for each user profile. I also reworked the certification search engine across the 16,000+ certifications, and produced a presentation video of the candidate journey for the Minister of Labor\'s cabinet.',
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
      title: 'Five initiatives to ship faster'
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
      company: 'beta.gouv.fr',
      type: 'Design produit',
      labels: { role: 'Rôle', type: 'Type', scope: 'Périmètre', company: 'Entreprise' }
    },
    ui: {
      focus: 'Focus',
      impact: 'Impact',
      viewAllVisuals: 'Voir tous les visuels',
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
      zoomLabel: 'Voir la page d’accueil avant et après en grand',
      videoFallback: 'Votre navigateur ne prend pas en charge la lecture vidéo.'
    },
    hero: {
      title: 'Livrer vite dans un environnement complexe',
      intro: 'Lead Product Designer chez France VAE, j’ai structuré la conception et la découverte pour que l’équipe livre plus vite malgré des commandes politiques peu spécifiées. Cinq initiatives, d’un MVP employeur à des prototypes IA.',
      subtitle: 'Comment j’ai encadré le processus design et co-piloté la feuille de route pour aider une startup d’État à livrer plus vite, notamment sur des commandes politiques sans spécifications claires.',
      visitSite: 'Visiter France VAE',
      heroCaption: 'Page d’accueil France VAE\u00a0: service public national pour la VAE'
    },
    context: {
      title: 'Contexte',
      intro: 'France VAE est le service public national de la Validation des Acquis de l’Expérience. La plateforme permet aux citoyens sans diplôme de faire reconnaître leur expérience professionnelle pour obtenir des certifications officielles.',
      challenge: 'L’enjeu',
      challengeText: 'Structurer la découverte et la planification de la feuille de route pour accélérer la prise de décision, tout en livrant des fonctionnalités critiques pour un service destiné à 100\u00a0000+ candidats, souvent issues de commandes politiques floues dont les spécifications n’étaient pas abouties.',
      myScope: 'Mon périmètre',
      myScopeText: 'Encadrer le processus de l’équipe design, co-piloter la feuille de route avec la Lead PM, structurer la découverte pour permettre à l’équipe de réalisation de livrer plus vite. Un rôle transverse couvrant l’ensemble du cycle produit.'
    },
    acts: {
      approach: 'Cinq initiatives pour livrer plus vite',
      product: 'Fonctionnalités livrées',
      learnings: 'Ce que j’ai appris',
      processTitle: 'Structurer le travail de l’équipe',
      deliveryTitle: 'Ce qui a été livré et testé',
    },
    summary: {
      context: 'France VAE est le service public national de la Validation des Acquis de l’Expérience (VAE)\u00a0: il permet aux citoyens sans diplôme de faire reconnaître officiellement leur expérience professionnelle. Le service touche plus de 100\u00a0000 candidats, et des fonctionnalités critiques naissaient souvent de commandes politiques aux spécifications peu abouties.',
      role: 'Lead Product Designer en mission chez beta.gouv.fr. J’ai encadré le processus de l’équipe design, co-piloté la feuille de route avec la Lead PM et structuré la découverte pour que l’équipe de réalisation livre plus vite. Un rôle transverse sur tout le cycle produit.',
      roleItems: [
        { title: 'Saisons mensuelles', detail: 'Cycles d’un mois' },
        { title: 'Matrice de priorisation', detail: 'Co-conçue avec la Lead PM' },
        { title: 'Recherche utilisateur', detail: '10 entretiens et ateliers' },
        { title: 'Design ops', detail: 'Figma et livraison' },
      ],
      deliverables: [
        { title: 'MVP VAE Collective', detail: 'Prototype du parcours employeur pour la VAE collective, présentation commerciale et vidéo promotionnelle.' },
        { title: 'Opérations produit', detail: 'Saisons d’un mois, cadre stratégique à trois niveaux et matrice de priorisation inter-équipes.' },
        { title: 'Recherche utilisateur', detail: 'Base de connaissances, 10 entretiens modérés en 2 vagues et 2 rapports de synthèse.' },
        { title: 'Ateliers design thinking', detail: 'Un atelier de 2 jours avec des accompagnateurs, plus des ateliers internes.' },
        { title: 'Expérimentation IA', detail: 'Deux prototypes fonctionnels en 1 semaine\u00a0: un chatbot de positionnement et un radar de compétences.' },
        { title: 'Livraisons UI', detail: 'Refonte de la page d’accueil, moteur de recherche de certifications et vidéo de présentation pour le cabinet de la Ministre du Travail.' },
      ],
      metrics: [
        { value: '100\u00a0000+', label: 'Candidats servis par la plateforme' },
        { value: '10', label: 'Entretiens modérés, en 2 vagues' },
        { value: '1 semaine', label: 'Pour livrer deux prototypes IA fonctionnels' },
      ],
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
      brief: 'Les entreprises qui lancent une VAE collective n’avaient aucun outil dédié\u00a0: les RH coordonnaient des cohortes de 10 à 90 candidats par e-mail et tableur. Après deux semaines de découverte, j’ai conçu le prototype du parcours employeur, une présentation B2B et une vidéo promotionnelle. Résultat\u00a0: une offre B2B structurée, prête au déploiement.',
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
      brief: 'Les priorités changeaient souvent et les équipes travaillaient en silos. Avec la Lead PM, j’ai introduit des saisons d’un mois (25\u00a0% préparation, 50\u00a0% exécution, 25\u00a0% rétrospective), un cadre à trois niveaux (objectifs, initiatives, fonctionnalités) et une matrice de priorisation inter-équipes. Les décisions sont plus rapides et les équipes partagent un cadre pour arbitrer.',
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
      brief: 'Les décisions produit se prenaient sans données utilisateurs consolidées. J’ai mis en place une base de connaissances centralisée et mené 10 entretiens modérés à distance, en deux vagues, sur le nouveau tableau de bord candidat, puis présenté deux rapports de synthèse en plénière. Les décisions produit s’appuient désormais sur des données qualitatives structurées.',
      reportCaption: 'Rapport de synthèse de la campagne de test du tableau de bord',
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
      brief: 'L’équipe produit n’avait pas de contact direct avec les accompagnateurs, acteurs clés du parcours VAE. J’ai préparé et animé avec eux un atelier design thinking de deux jours, du cadrage du problème aux croquis de solutions. Ils sont devenus des partenaires actifs de la conception.',
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
      brief: '55\u00a0% des candidats ne savent pas si la VAE leur convient. J’ai exploré plus de 10 concepts, puis construit deux prototypes fonctionnels en une semaine\u00a0: un chatbot de positionnement et un radar de compétences. L’initiative n’a pas été priorisée, mais les prototypes ont informé les décisions produit.',
      chatbotDemo: 'Essayer la démo du chatbot',
      radarDemo: 'Essayer la démo du radar de compétences',
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
      brief: 'La page d’accueil a été refondue pour clarifier la proposition de valeur et simplifier les points d’entrée de chaque profil. J’ai aussi retravaillé le moteur de recherche parmi les 16\u00a0000+ certifications, et réalisé une vidéo de présentation du parcours candidat pour le cabinet de la Ministre du Travail.',
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
      title: 'Cinq initiatives pour livrer plus vite'
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

// Clickable image with hover effect; fades in once as it enters the viewport
const ClickableImage: React.FC<{
  src: string;
  alt: string;
  caption?: string;
  onClick: (src: string) => void;
  className?: string;
  priority?: boolean;
}> = ({ src, alt, caption, onClick, className = '', priority = false }) => {
  const reveal = useReveal();
  return (
    <motion.figure className={className} {...reveal(0, priority)}>
      <div
        {...zoomable(() => onClick(src))}
        aria-label={alt}
        className="cursor-zoom-in group rounded-2xl overflow-hidden ring-1 ring-black/[0.06] [@media(hover:hover)]:hover:ring-black/[0.10] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]"
      >
        <img
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          src={src} {...imgDims(src)}
          alt=""
          className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
};

// Interaction or demo video: autoplay muted loop (VideoPlayer), same frame and lightbox wiring as ClickableImage
const VideoFigure: React.FC<{
  src: string;
  caption?: string;
  label: string;
  onClick: (src: string) => void;
}> = ({ src, caption, label, onClick }) => {
  const reveal = useReveal();
  return (
    <motion.figure {...reveal(0, false)}>
      <div
        {...zoomable(() => onClick(src))}
        aria-label={label}
        className="cursor-zoom-in group rounded-2xl overflow-hidden ring-1 ring-black/[0.06] [@media(hover:hover)]:hover:ring-black/[0.10] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]"
      >
        <VideoPlayer
          src={src}
          className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
};

// Sub-section with bullet list (h5 inside an h4 label)
const BulletSection: React.FC<{
  title: string;
  items: string[];
}> = ({ title, items }) => {
  return (
    <div className="mb-8">
      <h5 className="text-sm font-medium mb-3 text-gray-900">
        {title}
      </h5>
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

// Label above a paragraph of a decision block (problem, what I did, impact)
const BlockLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-title-3 text-gray-900 mb-2">{children}</h4>
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
  /** Accessible name of the full size button */
  zoomLabel: string;
  /** Opens the shared lightbox on the given image */
  onZoom: (src: string) => void;
}> = ({ beforeSrc, afterSrc, beforeLabel, afterLabel, beforeAlt, afterAlt, sliderLabel, zoomLabel, onZoom }) => {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-gray-900">
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

      {/* Full size: a separate control, because a press anywhere on the frame moves the slider.
          It stops the pointer events so the frame never starts a drag or captures the click. */}
      <button
        type="button"
        aria-label={zoomLabel}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onZoom(afterSrc)}
        className="absolute bottom-4 right-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-900 shadow-md cursor-zoom-in active:scale-[0.95] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] before:absolute before:-inset-1 before:content-['']"
      >
        <ArrowsOut size={16} aria-hidden="true" />
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
    <div>
      {/* View Toggle */}
      <div className="flex justify-start mb-8">
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
          <div className="flex items-center justify-start gap-1 mb-8 -ml-2">
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
                        <p className="text-title-3 mb-2 text-gray-900">
                          {initiative.title}
                        </p>
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
                      <p className="text-sm font-medium mb-6 text-gray-900">
                        {ui.keyDeliverables}
                      </p>
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
            return (
              <div
                key={initiative.id}
                {...zoomable(() => {
                  setActiveInitiative(initiative.id - 1);
                  setViewMode('focus');
                })}
                className="group rounded-xl p-5 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 cursor-pointer border border-gray-100 hover:border-gray-200"
              >
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {ui.initiative} {initiative.id} · {initiative.duration}
                </p>

                <p className="text-title-3 mb-2 text-gray-900">
                  {initiative.title}
                </p>

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

// Two key visuals side by side, same frame (similarity)
const Pair: React.FC<{
  a: { src: string; caption: string };
  b: { src: string; caption: string };
  onClick: (src: string) => void;
}> = ({ a, b, onClick }) => (
  <div className="mb-10 grid gap-x-6 gap-y-8 md:grid-cols-2">
    <ClickableImage src={a.src} alt={a.caption} caption={a.caption} onClick={onClick} />
    <ClickableImage src={b.src} alt={b.caption} caption={b.caption} onClick={onClick} />
  </div>
);

const MINISTER_VIDEO_SRC = "/images/francevae/20250701 - Video ministre - revision 3'30.mp4";
const VAE_COLLECTIVE_PROTOTYPE_URL = 'https://endearing-taffy-c86c69.netlify.app/';
const UXR_REPORT_URL = 'https://tests-utilisateur-tableau-de-bord-c.vercel.app';
const AI_CHATBOT_DEMO_URL = 'https://joyful-unicorn-489a7b.netlify.app';
const AI_RADAR_DEMO_URL = 'https://flourishing-cascaron-0d6509.netlify.app';

// Quiet text link used for demos and reports: 44px target, press feedback
const quietLinkClass =
  'inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]';

// One initiative: an h3, one short paragraph, one visual, optional quiet links.
const InitiativeBlock: React.FC<{
  id: string;
  title: string;
  text: string;
  src: string;
  caption: string;
  onImageClick: (src: string) => void;
  links?: { href: string; label: string; external: boolean; play?: boolean }[];
}> = ({ id, title, text, src, caption, onImageClick, links }) => (
  <div id={id} className="mb-14 md:mb-16 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <p className="text-base text-gray-600 max-w-[62ch]">{text}</p>
    {links && links.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-x-6">
        {links.map(link => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={quietLinkClass}>
            {link.play && <Play size={14} aria-hidden="true" />}
            {link.label}
            {!link.play && (link.external ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />)}
          </a>
        ))}
      </div>
    )}
    <div className="mt-6 md:mt-8">
      <ClickableImage src={src} alt={caption} caption={caption} onClick={onImageClick} />
    </div>
  </div>
);

const FranceVaeFull: React.FC<FranceVaeFullProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Hero: same structure for every case study. The intro is the executive summary. */}
      <CaseStudyHero
        lang={lang}
        projectId="france-vae"
        title={t.hero.title}
        intro={t.hero.intro}
        meta={[
          { label: t.meta.labels.role, value: t.meta.role },
          { label: t.meta.labels.scope, value: t.meta.scope },
          { label: t.meta.labels.company, value: t.meta.company },
        ]}
        onZoom={() => onImageClick('/images/francevae/thumbnail_france_vae.webp')}
        visualAlt={t.hero.heroCaption}
        externalHref="https://vae.gouv.fr"
        externalLabel={t.hero.visitSite}
      />

      {/* Client testimonial, right under the hero, in the act column */}
      <div className="act-wide pb-12 md:pb-16">
        <div className="max-w-[62ch]">
          <CaseStudyTestimonialBlock
            quote={t.testimonial.quote}
            author={t.testimonial.author}
            role={t.testimonial.role}
            image="boris-aime-bauderlique.webp"
            lang={lang}
          />
        </div>
      </div>

      {/* Summary: context, role, deliverables and sourced numbers */}
      <CaseStudySummary
        lang={lang}
        context={t.summary.context}
        role={t.summary.role}
        roleItems={t.summary.roleItems}
        deliverables={t.summary.deliverables}
        metrics={t.summary.metrics}
      />

      {/* 01 Approach: the three initiatives that changed how the team works */}
      <section id="approach">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="01" title={t.acts.processTitle} />

          <div className="mt-4 md:mt-6">
            <InitiativeBlock
              id="initiative-2"
              title={t.initiative2.title}
              text={t.initiative2.brief}
              src={t.initiative2.bentoImages.large.src}
              caption={t.initiative2.imageCaption}
              onImageClick={onImageClick}
            />

            <InitiativeBlock
              id="initiative-3"
              title={t.initiative3.title}
              text={t.initiative3.brief}
              src="/images/francevae/UXR - interface tableau de bord candidat.webp"
              caption={t.initiative3.imageCaption}
              onImageClick={onImageClick}
              links={[{ href: UXR_REPORT_URL, label: t.initiative3.reportButton, external: true }]}
            />

            <InitiativeBlock
              id="initiative-4"
              title={t.initiative4.title}
              text={t.initiative4.brief}
              src={t.initiative4.bentoImages.large.src}
              caption={t.initiative4.imageCaption}
              onImageClick={onImageClick}
            />
          </div>
        </div>
      </section>

      {/* 02 Product: the employer MVP, the AI prototypes, the homepage */}
      <section id="product">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="02" title={t.acts.deliveryTitle} />

          <div id="ui-delivery" className="mt-4 md:mt-6">
            <InitiativeBlock
              id="initiative-1"
              title={t.initiative1.title}
              text={t.initiative1.brief}
              src={t.initiative1.bentoImages.large.src}
              caption={t.initiative1.prototypeCaption}
              onImageClick={onImageClick}
              links={[{ href: VAE_COLLECTIVE_PROTOTYPE_URL, label: t.initiative1.prototypeButton, external: false }]}
            />

            <InitiativeBlock
              id="initiative-5"
              title={t.initiative5.title}
              text={t.initiative5.brief}
              src="/images/francevae/proto IA - orientation professionnelle assistee par IA.webp"
              caption={t.initiative5.radarCaption}
              onImageClick={onImageClick}
              links={[
                { href: AI_CHATBOT_DEMO_URL, label: t.initiative5.chatbotDemo, external: false, play: true },
                { href: AI_RADAR_DEMO_URL, label: t.initiative5.radarDemo, external: false, play: true },
              ]}
            />

            {/* Homepage before and after: the slider is the visual of this block */}
            <div>
              <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.uiDelivery.homepageTitle}</h3>
              <p className="text-base text-gray-600 max-w-[62ch]">{t.uiDelivery.brief}</p>
              <figure className="mt-6 md:mt-8">
                <BeforeAfterSlider
                  beforeSrc="/images/francevae/france_vae_home_before_2x.webp"
                  afterSrc="/images/francevae/france_vae_home_after_2x.webp"
                  beforeLabel={t.uiDelivery.homepageBefore}
                  afterLabel={t.uiDelivery.homepageAfter}
                  beforeAlt={t.ui.beforeAlt}
                  afterAlt={t.ui.afterAlt}
                  sliderLabel={t.ui.sliderLabel}
                  zoomLabel={t.ui.zoomLabel}
                  onZoom={onImageClick}
                />
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {t.uiDelivery.homepageCaption}
                </figcaption>
              </figure>

              {/* Presentation video for the Minister's cabinet: the last visual of the page */}
              <div className="mt-10 md:mt-12">
                <VideoFigure
                  src={MINISTER_VIDEO_SRC}
                  caption={t.uiDelivery.videoCaption}
                  label={t.uiDelivery.videoTitle}
                  onClick={onImageClick}
                />
              </div>
            </div>

            {/* Gallery access */}
            <div className="mt-10">
              <Link href={`/${lang}/project/france-vae/gallery`} className={quietLinkClass}>
                {t.ui.viewAllVisuals}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Learnings: three of the four, the fourth stays in the translations */}
      <section id="learnings">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="03" title={t.acts.learnings} />
          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {t.learnings.items.slice(1).map((item, idx) => (
              <div key={idx} className="py-6">
                <h3 className="text-title-3 mb-2 text-gray-900 max-w-[56ch]">{item.title}</h3>
                <p className="text-base text-gray-600 max-w-[62ch]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FranceVaeFull;
