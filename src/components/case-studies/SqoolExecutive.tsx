/**
 * SqoolExecutive - "En bref" / "At a glance" version of SQOOL Suite case study
 *
 * Complete scope of work:
 * - Product Design Lead & Manager (2018-2024)
 * - Led the design transformation from a hardware company to a SaaS EdTech ecosystem
 * - Built a suite of 7+ web applications for 500,000+ students
 * - Recruited and managed a team of 5 designers
 * - Created and scaled the SQOOL Design System
 *
 * Design: Apple Keynote-style with progressive disclosure, Linear-quality visualizations
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  Palette,
  Layout,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Trophy,
  Target
} from 'lucide-react';
interface SqoolExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Product Design Lead • EdTech Ecosystem • 2018-2024',
      title: 'Building an EdTech\necosystem at scale',
      subtitle: 'From hardware launcher to 7+ web apps serving 500K+ students',
      scrollHint: 'Scroll to explore'
    },
    role: {
      eyebrow: 'My Role',
      title: '6 years of\ndesign leadership',
      subtitle: 'From senior designer to product lead, building team and systems',
      items: [
        { icon: 'briefcase', label: 'Product Design Lead', detail: '2020-2024' },
        { icon: 'users', label: 'Team of 5 designers', detail: 'Recruited & managed' },
        { icon: 'palette', label: 'Brand identity', detail: 'Full visual system' },
        { icon: 'layers', label: 'Design system', detail: 'ZeroHeight + Figma' },
        { icon: 'target', label: 'Product strategy', detail: 'Co-led with CPO' }
      ],
      context: 'I joined UNOWHY as Senior UX/UI Designer in 2018, grew into Design Lead in 2020, then Product Lead in 2023. I built the design organization, co-authored product strategy, and created the unified visual system across 7+ applications.'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: '7 apps shipped,\none design system',
      intro: 'From classroom supervision to parental controls, each app solves one clear problem.',
      areas: [
        {
          id: 'classe',
          title: 'SQOOL Classe',
          description: 'Real-time classroom supervision. Teachers see every student screen, lock devices, push content.',
          image: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp'
        },
        {
          id: 'partage',
          title: 'SQOOL Partage',
          description: 'One-gesture file sharing. Drag and drop to share files with a class, like AirDrop for classrooms.',
          image: '/images/sqool/hero_ecosystem_sqool.webp'
        },
        {
          id: 'mdm',
          title: 'SQOOL MDM',
          description: 'Device fleet management for IT admins. Security policies, app deployments, remote troubleshooting.',
          image: '/images/sqool/sqool_legacy_mdm.webp'
        },
        {
          id: 'protect',
          title: 'SQOOL Protect',
          description: 'Parental controls with QR code pairing. Screen time limits, 3-minute setup, shipped in 3 months.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp'
        },
        {
          id: 'extend',
          title: 'SQOOL Extend',
          description: 'Cloud desktops for heavy software. Virtual Windows with professional tools on light devices.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp'
        },
        {
          id: 'design-system',
          title: 'Design System',
          description: 'Figma libraries, ZeroHeight documentation, tokens, and components scaling to 7+ apps.',
          image: '/images/sqool/hi sqool/hisqoolcomponents2x.webp'
        }
      ]
    },
    journey: {
      eyebrow: '6-Year Journey',
      title: 'Three phases to\nplatform maturity',
      phases: [
        {
          id: 1,
          title: 'Discovery',
          period: '2018-2020',
          goal: 'Validate web-first approach',
          deliverables: [
            'Hi-SQOOL student platform',
            'New authentication system',
            'Cloud storage foundations',
            'Connect vision prototype',
            '"La Bulle" concept UI',
            'First design patterns'
          ]
        },
        {
          id: 2,
          title: 'Strategic Pivot',
          period: '2021',
          goal: 'From platform to focused apps',
          deliverables: [
            'Product manifesto: Simple, Fluid, Magical',
            'Brand system with agency Fllow',
            'App color differentiation',
            'Figma design libraries',
            'ZeroHeight documentation',
            'Weekly design syncs'
          ]
        },
        {
          id: 3,
          title: 'Suite Delivery',
          period: '2022-2024',
          goal: 'Ship and scale 7+ apps',
          deliverables: [
            'SQOOL Classe (classroom control)',
            'SQOOL Partage (file sharing)',
            'SQOOL Protect (parental controls)',
            'SQOOL Extend (cloud desktops)',
            'Design QA rituals',
            'Team scaled to 5 designers'
          ]
        }
      ]
    },
    highlights: {
      eyebrow: 'Brand System',
      title: 'A cohesive visual\nidentity at scale',
      items: [
        {
          id: 'colors',
          title: 'Color System',
          subtitle: 'App differentiation',
          description: 'Each app has a signature color while maintaining family recognition across the suite.',
          media: '/images/sqool/sqool brand/ColorsGradients.webp',
          type: 'image' as const
        },
        {
          id: 'apps-hub',
          title: 'Apps Hub',
          subtitle: 'Unified entry point',
          description: 'Landing page showcasing all SQOOL apps with consistent card design and navigation.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp',
          type: 'image' as const
        },
        {
          id: 'launcher',
          title: 'Android Launcher',
          subtitle: 'Device home screen',
          description: 'Tablet launcher with ecosystem app grid, maintaining brand consistency on Android.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp',
          type: 'image' as const
        },
        {
          id: 'components',
          title: 'Component Library',
          subtitle: 'Design system foundations',
          description: 'Reusable UI components ensuring consistency across 7+ applications and 120+ screens.',
          media: '/images/sqool/hi sqool/hisqooltokens2x3.webp',
          type: 'image' as const
        }
      ]
    },
    insights: {
      eyebrow: 'User Research',
      title: 'What teachers\ntaught us',
      items: [
        {
          title: 'Simplicity beats features',
          description: 'Every time we added options, adoption dropped. The apps that worked had fewer screens and clearer paths.'
        },
        {
          title: 'Teachers don\'t collaborate real-time',
          description: 'They want to prepare content, distribute it, collect work, then grade. Sequential, not simultaneous.'
        },
        {
          title: 'Design for bad WiFi',
          description: 'School networks are unreliable. Apps show clear status when offline, not cryptic errors.'
        },
        {
          title: 'Consistency builds trust',
          description: 'When teachers move between apps, they don\'t want to relearn interfaces. Our design system paid off.'
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Design driving\nbusiness transformation',
      metrics: [
        { value: '500K+', label: 'Students & teachers', sublabel: 'served daily' },
        { value: '465', label: 'High schools', sublabel: 'in Ile-de-France' },
        { value: '7+', label: 'Web applications', sublabel: 'shipped' }
      ]
    },
    testimonial: {
      quote: 'Victor played a key role in our design transformation. He built the team, established our design system, and brought the rigor we needed to scale from one product to an entire ecosystem. His ability to balance strategic vision with hands-on execution was essential to SQOOL\'s evolution.',
      author: 'Charlotte Rifflet',
      role: 'CPO @ UNOWHY'
    },
    cta: {
      title: 'Interested in similar results?',
      button: 'Get in touch',
      viewFull: 'View full case study',
      nextProject: 'Next case study'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Product Design Lead • Écosystème EdTech • 2018-2024',
      title: 'Construire un écosystème\nEdTech à grande échelle',
      subtitle: 'Du launcher matériel à 7+ apps web pour 500K+ élèves',
      scrollHint: 'Défiler pour explorer'
    },
    role: {
      eyebrow: 'Mon Rôle',
      title: '6 ans de\nleadership design',
      subtitle: 'De senior designer à product lead, en construisant équipe et systèmes',
      items: [
        { icon: 'briefcase', label: 'Product Design Lead', detail: '2020-2024' },
        { icon: 'users', label: 'Équipe de 5 designers', detail: 'Recrutés & managés' },
        { icon: 'palette', label: 'Identité de marque', detail: 'Système visuel complet' },
        { icon: 'layers', label: 'Design system', detail: 'ZeroHeight + Figma' },
        { icon: 'target', label: 'Stratégie produit', detail: 'Co-pilotée avec CPO' }
      ],
      context: 'J\'ai rejoint UNOWHY comme Senior UX/UI Designer en 2018, suis devenu Design Lead en 2020, puis Product Lead en 2023. J\'ai construit l\'organisation design, co-écrit la stratégie produit, et créé le système visuel unifié sur 7+ applications.'
    },
    scope: {
      eyebrow: 'Périmètre',
      title: '7 apps livrées,\nun design system',
      intro: 'De la supervision de classe au contrôle parental, chaque app résout un problème clair.',
      areas: [
        {
          id: 'classe',
          title: 'SQOOL Classe',
          description: 'Supervision de classe en temps réel. Les enseignants voient chaque écran, verrouillent les appareils, poussent du contenu.',
          image: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp'
        },
        {
          id: 'partage',
          title: 'SQOOL Partage',
          description: 'Partage de fichiers en un geste. Glisser-déposer pour partager avec une classe, comme AirDrop pour les salles de classe.',
          image: '/images/sqool/hero_ecosystem_sqool.webp'
        },
        {
          id: 'mdm',
          title: 'SQOOL MDM',
          description: 'Gestion de flotte d\'appareils pour admins IT. Politiques de sécurité, déploiements d\'apps, dépannage à distance.',
          image: '/images/sqool/sqool_legacy_mdm.webp'
        },
        {
          id: 'protect',
          title: 'SQOOL Protect',
          description: 'Contrôle parental avec appairage QR code. Limites de temps d\'écran, configuration en 3 minutes, livré en 3 mois.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp'
        },
        {
          id: 'extend',
          title: 'SQOOL Extend',
          description: 'Bureaux virtuels pour logiciels lourds. Windows virtuel avec outils pros sur appareils légers.',
          image: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp'
        },
        {
          id: 'design-system',
          title: 'Design System',
          description: 'Bibliothèques Figma, documentation ZeroHeight, tokens et composants scalant sur 7+ apps.',
          image: '/images/sqool/hi sqool/hisqoolcomponents2x.webp'
        }
      ]
    },
    journey: {
      eyebrow: 'Parcours 6 Ans',
      title: 'Trois phases vers\nla maturité plateforme',
      phases: [
        {
          id: 1,
          title: 'Découverte',
          period: '2018-2020',
          goal: 'Valider l\'approche web-first',
          deliverables: [
            'Plateforme élève Hi-SQOOL',
            'Nouveau système d\'authentification',
            'Fondations stockage cloud',
            'Prototype de vision Connect',
            'Concept UI "La Bulle"',
            'Premiers patterns design'
          ]
        },
        {
          id: 2,
          title: 'Pivot Stratégique',
          period: '2021',
          goal: 'De plateforme à apps ciblées',
          deliverables: [
            'Manifeste produit : Simple, Fluide, Magique',
            'Système de marque avec agence Fllow',
            'Différenciation couleur par app',
            'Bibliothèques design Figma',
            'Documentation ZeroHeight',
            'Syncs design hebdomadaires'
          ]
        },
        {
          id: 3,
          title: 'Livraison Suite',
          period: '2022-2024',
          goal: 'Livrer et scaler 7+ apps',
          deliverables: [
            'SQOOL Classe (contrôle de classe)',
            'SQOOL Partage (partage fichiers)',
            'SQOOL Protect (contrôle parental)',
            'SQOOL Extend (bureaux virtuels)',
            'Rituels Design QA',
            'Équipe à 5 designers'
          ]
        }
      ]
    },
    highlights: {
      eyebrow: 'Système de Marque',
      title: 'Une identité visuelle\ncohérente à l\'échelle',
      items: [
        {
          id: 'colors',
          title: 'Système de Couleurs',
          subtitle: 'Différenciation des apps',
          description: 'Chaque app a une couleur signature tout en maintenant la reconnaissance famille dans la suite.',
          media: '/images/sqool/sqool brand/ColorsGradients.webp',
          type: 'image' as const
        },
        {
          id: 'apps-hub',
          title: 'Hub Apps',
          subtitle: 'Point d\'entrée unifié',
          description: 'Page d\'accueil présentant toutes les apps SQOOL avec design de cartes et navigation cohérents.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp',
          type: 'image' as const
        },
        {
          id: 'launcher',
          title: 'Launcher Android',
          subtitle: 'Écran d\'accueil appareil',
          description: 'Launcher tablette avec grille d\'apps écosystème, maintenant la cohérence de marque sur Android.',
          media: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp',
          type: 'image' as const
        },
        {
          id: 'components',
          title: 'Bibliothèque de Composants',
          subtitle: 'Fondations design system',
          description: 'Composants UI réutilisables assurant la cohérence sur 7+ applications et 120+ écrans.',
          media: '/images/sqool/hi sqool/hisqooltokens2x3.webp',
          type: 'image' as const
        }
      ]
    },
    insights: {
      eyebrow: 'Recherche Utilisateur',
      title: 'Ce que les enseignants\nnous ont appris',
      items: [
        {
          title: 'La simplicité bat les fonctionnalités',
          description: 'Chaque fois qu\'on ajoutait des options, l\'adoption baissait. Les apps qui marchaient avaient moins d\'écrans et des chemins plus clairs.'
        },
        {
          title: 'Les enseignants ne collaborent pas en temps réel',
          description: 'Ils veulent préparer du contenu, le distribuer, collecter les travaux, puis noter. Séquentiel, pas simultané.'
        },
        {
          title: 'Designer pour le WiFi instable',
          description: 'Les réseaux scolaires sont peu fiables. Les apps montrent un statut clair hors ligne, pas des erreurs cryptiques.'
        },
        {
          title: 'La cohérence construit la confiance',
          description: 'Quand les enseignants passent d\'une app à l\'autre, ils ne veulent pas réapprendre. Notre design system a payé.'
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Le design moteur de\ntransformation business',
      metrics: [
        { value: '500K+', label: 'Élèves & enseignants', sublabel: 'servis quotidiennement' },
        { value: '465', label: 'Lycées', sublabel: 'en Ile-de-France' },
        { value: '7+', label: 'Applications web', sublabel: 'livrées' }
      ]
    },
    testimonial: {
      quote: 'Victor a joué un rôle clé dans notre transformation design. Il a construit l\'équipe, établi notre design system, et apporté la rigueur nécessaire pour passer d\'un produit à un écosystème entier. Sa capacité à équilibrer vision stratégique et exécution concrète a été essentielle à l\'évolution de SQOOL.',
      author: 'Charlotte Rifflet',
      role: 'CPO @ UNOWHY'
    },
    cta: {
      title: 'Intéressé par des résultats similaires ?',
      button: 'Me contacter',
      viewFull: 'Voir le case study complet',
      nextProject: 'Projet suivant'
    }
  }
};

// ============================================================================
// ANIMATION COMPONENTS
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
      transition={{ duration: 0.35, delay: delay * 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROLE DIAGRAM - Keynote style
// ============================================================================

const RoleDiagram: React.FC<{
  items: Array<{ icon: string; label: string; detail: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  const iconMap: Record<string, React.ReactNode> = {
    briefcase: <Briefcase size={24} />,
    palette: <Palette size={24} />,
    layout: <Layout size={24} />,
    layers: <Layers size={24} />,
    users: <Users size={24} />,
    target: <Target size={24} />
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.08 }}
          className={`p-5 rounded-2xl text-center ${
            isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
            isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            {iconMap[item.icon]}
          </div>
          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.label}
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {item.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// SCOPE GRID - Interactive cards
// ============================================================================

const ScopeGrid: React.FC<{
  areas: Array<{ id: string; title: string; description: string; image: string }>;
  isDark: boolean;
  onImageClick: (src: string) => void;
}> = ({ areas, isDark, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {areas.map((area, idx) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.06 }}
          onClick={() => onImageClick(area.image)}
          className={`group rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}
        >
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img loading="lazy"
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {area.title}
            </h4>
            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {area.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// PRODUCT EVOLUTION DIAGRAM - Apple Keynote style
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Discovery",
      duration: "2018-2020",
      icon: Layers,
      description: "Validating web-first approach with student platform and vision prototypes.",
      features: [
        "Hi-SQOOL student platform launched",
        "New authentication system (SSO)",
        "Cloud storage foundations built",
        "Connect vision prototype designed",
        "\"La Bulle\" concept UI explored",
        "First design patterns established"
      ]
    },
    {
      id: 2,
      title: "Strategic Pivot",
      duration: "2021",
      icon: Zap,
      description: "Shifting from monolithic platform to focused app suite strategy.",
      features: [
        "Product manifesto authored",
        "Brand system with agency Fllow",
        "App color differentiation",
        "Figma design libraries created",
        "ZeroHeight documentation",
        "Weekly design sync rituals"
      ]
    },
    {
      id: 3,
      title: "Suite Delivery",
      duration: "2022-2024",
      icon: Trophy,
      description: "Shipping 7+ specialized apps and scaling the design team.",
      features: [
        "SQOOL Classe shipped",
        "SQOOL Partage shipped",
        "SQOOL Protect shipped (3 months)",
        "SQOOL Extend cloud desktops",
        "Design QA rituals implemented",
        "Team scaled to 5 designers"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Découverte",
      duration: "2018-2020",
      icon: Layers,
      description: "Validation de l'approche web-first avec plateforme élève et prototypes de vision.",
      features: [
        "Lancement plateforme Hi-SQOOL",
        "Nouveau système d'authentification (SSO)",
        "Fondations stockage cloud",
        "Prototype vision Connect designé",
        "Concept UI \"La Bulle\" exploré",
        "Premiers patterns design établis"
      ]
    },
    {
      id: 2,
      title: "Pivot Stratégique",
      duration: "2021",
      icon: Zap,
      description: "Passage d'une plateforme monolithique à une stratégie de suite d'apps ciblées.",
      features: [
        "Manifeste produit rédigé",
        "Système de marque avec Fllow",
        "Différenciation couleur par app",
        "Bibliothèques Figma créées",
        "Documentation ZeroHeight",
        "Rituels sync design hebdo"
      ]
    },
    {
      id: 3,
      title: "Livraison Suite",
      duration: "2022-2024",
      icon: Trophy,
      description: "Livraison de 7+ apps spécialisées et scaling de l'équipe design.",
      features: [
        "SQOOL Classe livré",
        "SQOOL Partage livré",
        "SQOOL Protect livré (3 mois)",
        "SQOOL Extend bureaux virtuels",
        "Rituels Design QA implémentés",
        "Équipe scalée à 5 designers"
      ]
    }
  ]
};

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
                        <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-2 ${
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
                      <p className={`text-base leading-relaxed mt-6 ${
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

// ============================================================================
// HIGHLIGHTS GRID - Media cards
// ============================================================================

const HighlightsGrid: React.FC<{
  items: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    media: string;
    type: 'image' | 'video';
  }>;
  isDark: boolean;
  onImageClick: (src: string) => void;
}> = ({ items, isDark, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.1 }}
          className={`group rounded-2xl overflow-hidden border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}
        >
          {/* Media - clickable container */}
          <div
            onClick={() => onImageClick(item.media)}
            className={`rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]`}
          >
            {item.type === 'video' ? (
              <video
                src={item.media}
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img loading="lazy"
                src={item.media}
                alt={item.title}
                className="w-full h-auto"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {item.subtitle}
            </div>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h4>
            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// INSIGHTS GRID
// ============================================================================

const InsightsGrid: React.FC<{
  items: Array<{ title: string; description: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.1 }}
          className={`p-6 rounded-2xl ${
            isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}
        >
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.title}
          </h4>
          <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// METRICS ROW
// ============================================================================

const MetricsRow: React.FC<{
  metrics: Array<{ value: string; label: string; sublabel: string }>;
  isDark: boolean;
}> = ({ metrics, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className={`text-5xl md:text-6xl font-bold tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {metric.value}
          </div>
          <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {metric.label}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {metric.sublabel}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SqoolExecutive: React.FC<SqoolExecutiveProps> = ({
  systemTheme,
  lang,
  onImageClick,
  onViewFull,
  onContact,
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="min-h-[85vh] flex flex-col justify-center px-10 py-20">
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Logo */}
          <FadeInSection>
            <div className="my-12">
              <img loading="lazy"
                src={isDark ? '/images/sqool/logo-sqool-dark.svg' : '/images/sqool/logo-sqool.svg'}
                alt="SQOOL"
                className="h-6 w-auto"
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.05}>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1 className={`mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.hero.title}
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className={`mt-6 text-xl md:text-2xl max-w-2xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.subtitle}
            </p>
          </FadeInSection>

          {/* Hero Image */}
          <FadeInSection delay={0.3} className="mt-12">
            <div
              onClick={() => onImageClick('/images/sqool/hero_ecosystem_sqool.webp')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/sqool/hero_ecosystem_sqool.webp"
                alt="SQOOL Ecosystem"
                className="w-full h-auto"
              />
            </div>
          </FadeInSection>

          {/* Scroll hint */}
          <FadeInSection delay={0.5} className="mt-12 flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex flex-col items-center gap-2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              <span className="text-sm">{t.hero.scrollHint}</span>
              <ChevronDown size={20} />
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROLE SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {t.role.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.role.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.role.subtitle}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <RoleDiagram items={t.role.items} isDark={isDark} />
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <p className={`mt-8 text-base leading-relaxed max-w-3xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.role.context}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SCOPE SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {t.scope.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.scope.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.scope.intro}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ScopeGrid areas={t.scope.areas} isDark={isDark} onImageClick={onImageClick} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* JOURNEY SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {t.journey.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.journey.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ProductEvolutionDiagram isDark={isDark} lang={lang} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* HIGHLIGHTS SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}>
              {t.highlights.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.highlights.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <HighlightsGrid
              items={t.highlights.items}
              isDark={isDark}
              onImageClick={onImageClick}
            />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* USER RESEARCH INSIGHTS SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              {t.insights.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.insights.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <InsightsGrid items={t.insights.items} isDark={isDark} />
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUTCOME SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}>
              {t.outcome.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.outcome.title}
            </h2>
          </FadeInSection>

          <MetricsRow metrics={t.outcome.metrics} isDark={isDark} />
        </div>
      </section>

      {/* ================================================================== */}
      {/* TESTIMONIAL SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-white/5' : 'bg-white border border-gray-100'}`}>
              <div className={`text-4xl mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                "
              </div>
              <blockquote className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {t.testimonial.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Users size={20} />
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.testimonial.author}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-24 md:py-32 px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeInSection>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.cta.title}
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
            >
              {t.cta.button}
              <ArrowRight size={22} />
            </button>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default SqoolExecutive;
