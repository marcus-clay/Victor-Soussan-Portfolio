/**
 * SqoolClasseExecutive - "En bref" / "At a glance" version of SQOOL Classe case study
 *
 * Complete scope of work:
 * - Lead Interaction Designer for SQOOL Classe product squad
 * - Real-time supervision UX for digital classrooms
 * - 42 interactive prototypes with GSAP animations
 * - Design system for the SQOOL suite
 * - Coordination of 5 designers over 2 years
 *
 * Design: Apple Keynote-style with progressive disclosure, Linear-quality visualizations
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CaretDown as ChevronDown,
  Stack as Layers,
  Palette,
  Layout,
  Users,
  Lightning as Zap,
  ArrowRight,
  CheckCircle as CheckCircle2,
  Briefcase,
  Trophy
} from '@phosphor-icons/react';

interface SqoolClasseExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact: () => void;
  onViewPrototypes: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Lead Interaction Designer \u00b7 Real-Time Supervision, Classroom UX \u00b7 2022',
      title: 'Giving teachers the composure\nto teach in a digital classroom',
      subtitle: 'SQOOL Classe: a supervision tool designed to fade behind the pedagogy',
      scrollHint: 'Scroll to explore'
    },
    context: {
      eyebrow: 'Context',
      title: '500,000 tablets deployed.\nWhat happens next?',
      description: 'The teachers we interviewed described the same reality: the tablet added a layer of complexity that was difficult to absorb. Checking that each student was on the right application, managing distractions, reacting to technical issues, all while maintaining the rhythm of a class of 30 teenagers. Existing tools were either too invasive or too fragile for school Wi-Fi.'
    },
    role: {
      eyebrow: 'My Role',
      title: 'Design Lead,\nSQOOL Classe product squad',
      subtitle: 'Two years working alongside the CPO, 5 designers, product managers, and developers',
      items: [
        { icon: 'briefcase', label: 'Design Lead', detail: 'Product squad, 2 years' },
        { icon: 'palette', label: 'Field research', detail: 'Classroom observation' },
        { icon: 'layout', label: '42 prototypes', detail: 'GSAP animations' },
        { icon: 'layers', label: 'Design system', detail: 'SQOOL suite' },
        { icon: 'users', label: '5 designers', detail: 'Team coordination' }
      ],
      context: 'Two years working alongside the CPO, 5 designers, product managers, and developers. From ideation workshops to delivery, through strategic framing and intensive prototyping of 42 usage scenarios.'
    },
    modules: {
      eyebrow: 'Product Modules',
      title: 'Eight modules delivered,\none goal: let the teacher focus on teaching'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: 'What we designed',
      intro: 'Six key interfaces covering the full teacher and student experience.',
      areas: [
        {
          id: 'grid',
          title: 'Teacher grid view',
          description: 'Each student occupies a tile with name, active application, battery, and connection status. 32 students displayed simultaneously, readable at a glance.',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_en_classe_grille_1_5x.webp'
        },
        {
          id: 'screenshare',
          title: 'Screen sharing',
          description: 'The teacher selects a full screen or a specific window. An indicator confirms that sharing is active and received.',
          image: '/images/sqool/sqool classe/UI - enseignant_partager_son_cran_aux_l_ves_1_5x.webp'
        },
        {
          id: 'documents',
          title: 'Document distribution',
          description: 'Documents arrive from local storage or Google Drive directly onto tablets. A timestamped notification confirms receipt.',
          image: '/images/sqool/sqool classe/UI - enseignant_envoyer_un_document_depuis_drive_1_5x.webp'
        },
        {
          id: 'student-views',
          title: 'Student experience',
          description: 'Two views coexist: class view (classmates, resources, messages) and group view (dedicated space with specific resources and instructions).',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_groupe_classe_vue_groupe_individuel_1_5x.webp'
        },
        {
          id: 'student-interactions',
          title: 'Student interactions',
          description: 'Six ways to communicate with the teacher without disrupting the class: question, comprehension signal, assignment submission.',
          image: '/images/sqool/sqool classe/UI - eleve_interactions_vers_le_prof_1_5x.webp'
        },
        {
          id: 'classrooms',
          title: 'Classrooms',
          description: 'The student home screen shows all active classes. One tap to join. No login, no configuration.',
          image: '/images/sqool/sqool classe/UI - eleve_vue_mes_salles_de_classe_1_5x.webp'
        }
      ]
    },
    highlights: {
      eyebrow: 'Interactive Prototypes',
      title: 'Interactive prototypes',
      subtitle: '42 animated scenarios',
      items: [
        {
          id: 'qr-code',
          title: 'QR code class opening',
          subtitle: 'Teacher',
          description: 'Full-screen QR code, instant scan, student cards appearing progressively.',
          media: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - En Classe - code big@2x.png',
          type: 'image' as const
        },
        {
          id: 'share-link',
          title: 'Link sharing to the whole class',
          subtitle: 'Teacher',
          description: 'The teacher types a URL, every student browser opens the same page at the same time.',
          media: '/images/sqool/sqool classe/Visuel - Comm - En Classe - Partager un lien - Toute la classe V0@2x.png',
          type: 'image' as const
        },
        {
          id: 'screen-sharing',
          title: 'Screen sharing in progress',
          subtitle: 'Teacher',
          description: 'The teacher sees their screen and their students simultaneously during sharing.',
          media: '/images/sqool/sqool classe/UI - enseignant_partage_d_cran_en_cours_1_5x.webp',
          type: 'image' as const
        },
        {
          id: 'observation',
          title: 'Classroom observation, Jean Vilar middle school',
          subtitle: 'Field',
          description: 'Before drawing anything, we sit in the classroom.',
          media: '/images/sqool/sqool classe/prototypes - observation - user testing - classe PXL_20231010_084158712.jpg',
          type: 'image' as const
        }
      ]
    },
    prototypeCta: {
      title: '42 interactive prototypes to explore',
      description: 'Each scenario documented with GSAP animations',
      button: 'Explore prototypes'
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'What this work\nproduced',
      metrics: [
        { value: '465', label: 'Equipped schools', sublabel: '\u00cele-de-France' },
        { value: '42', label: 'Interactive prototypes', sublabel: 'Each scenario documented' },
        { value: '30s', label: 'To connect the class', sublabel: 'Via QR code' }
      ]
    },
    testimonial: {
      quote: 'I had the chance to collaborate with Victor for 3 years as a duo and he is one of the most inspiring designers I have worked with. Victor combines overflowing creativity with an impressive work ethic.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY'
    },
    cta: {
      title: 'Interested in similar results?',
      button: 'Get in touch'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Lead Interaction Designer \u00b7 Supervision temps r\u00e9el, UX Classe \u00b7 2022',
      title: 'Donner aux enseignants la s\u00e9r\u00e9nit\u00e9\nde faire cours dans une classe num\u00e9rique',
      subtitle: 'SQOOL Classe : l\u2019application de supervision con\u00e7ue pour s\u2019effacer derri\u00e8re la p\u00e9dagogie',
      scrollHint: 'D\u00e9filer pour explorer'
    },
    context: {
      eyebrow: 'Contexte',
      title: '500 000 tablettes d\u00e9ploy\u00e9es,\net apr\u00e8s ?',
      description: 'Les enseignants que nous avons rencontr\u00e9s lors de nos recherches d\u00e9crivaient la m\u00eame r\u00e9alit\u00e9 : la tablette ajoutait une couche de complexit\u00e9 difficile \u00e0 absorber. V\u00e9rifier que chaque \u00e9l\u00e8ve est sur la bonne application, g\u00e9rer les distractions, r\u00e9agir quand une tablette ne r\u00e9pond plus, tout cela en maintenant le rythme d\u2019une classe de 30 adolescents. Les solutions existantes oscillaient entre surveillance invasive et fragilit\u00e9 technique.'
    },
    role: {
      eyebrow: 'Mon R\u00f4le',
      title: 'Design Lead,\nsquad produit SQOOL Classe',
      subtitle: 'Deux ans de travail avec la CPO, 5 designers, product managers et d\u00e9veloppeurs',
      items: [
        { icon: 'briefcase', label: 'Design Lead', detail: 'Squad produit, 2 ans' },
        { icon: 'palette', label: 'Recherche terrain', detail: 'Observation en classe' },
        { icon: 'layout', label: '42 prototypes', detail: 'Animations GSAP' },
        { icon: 'layers', label: 'Design system', detail: 'Suite SQOOL' },
        { icon: 'users', label: '5 designers', detail: 'Coordination \u00e9quipe' }
      ],
      context: 'Deux ans de travail avec la CPO, 5 designers, product managers et d\u00e9veloppeurs. Des ateliers d\u2019id\u00e9ation \u00e0 la livraison, en passant par le cadrage strat\u00e9gique et le prototypage intensif de 42 sc\u00e9narios d\u2019usage.'
    },
    modules: {
      eyebrow: 'Modules Produit',
      title: 'Huit modules livr\u00e9s, un seul objectif :\nque l\u2019enseignant se concentre sur son cours'
    },
    scope: {
      eyebrow: 'P\u00e9rim\u00e8tre',
      title: 'Ce que nous avons con\u00e7u',
      intro: 'Six interfaces cl\u00e9s couvrant l\u2019exp\u00e9rience compl\u00e8te enseignant et \u00e9l\u00e8ve.',
      areas: [
        {
          id: 'grid',
          title: 'Vue grille enseignant',
          description: 'Chaque \u00e9l\u00e8ve occupe une tuile avec nom, application active, batterie et \u00e9tat de connexion. 32 \u00e9l\u00e8ves affich\u00e9s simultan\u00e9ment, lisibles d\u2019un coup d\u2019\u0153il.',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_en_classe_grille_1_5x.webp'
        },
        {
          id: 'screenshare',
          title: 'Partage d\u2019\u00e9cran',
          description: 'L\u2019enseignant s\u00e9lectionne un \u00e9cran complet ou une fen\u00eatre sp\u00e9cifique. Un indicateur confirme que le partage est actif et re\u00e7u.',
          image: '/images/sqool/sqool classe/UI - enseignant_partager_son_cran_aux_l_ves_1_5x.webp'
        },
        {
          id: 'documents',
          title: 'Distribution de documents',
          description: 'Les documents arrivent depuis le stockage local ou Google Drive directement sur les tablettes. Une notification horodat\u00e9e confirme la r\u00e9ception.',
          image: '/images/sqool/sqool classe/UI - enseignant_envoyer_un_document_depuis_drive_1_5x.webp'
        },
        {
          id: 'student-views',
          title: 'Exp\u00e9rience \u00e9l\u00e8ve',
          description: 'Deux vues coexistent : vue classe (camarades, ressources, messages) et vue groupe (espace d\u00e9di\u00e9 avec ressources et consignes sp\u00e9cifiques).',
          image: '/images/sqool/sqool classe/UI - enseignant_vue_groupe_classe_vue_groupe_individuel_1_5x.webp'
        },
        {
          id: 'student-interactions',
          title: 'Interactions \u00e9l\u00e8ve',
          description: 'Six fa\u00e7ons de communiquer avec l\u2019enseignant sans d\u00e9ranger la classe : question, signal de compr\u00e9hension, rendu de devoir.',
          image: '/images/sqool/sqool classe/UI - eleve_interactions_vers_le_prof_1_5x.webp'
        },
        {
          id: 'classrooms',
          title: 'Salles de classe',
          description: 'L\u2019\u00e9cran d\u2019accueil \u00e9l\u00e8ve pr\u00e9sente toutes les classes actives. Un tap pour rejoindre. Pas de login, pas de configuration.',
          image: '/images/sqool/sqool classe/UI - eleve_vue_mes_salles_de_classe_1_5x.webp'
        }
      ]
    },
    highlights: {
      eyebrow: 'Prototypes Interactifs',
      title: 'Prototypes interactifs',
      subtitle: '42 sc\u00e9narios anim\u00e9s',
      items: [
        {
          id: 'qr-code',
          title: 'Ouverture de classe par QR code',
          subtitle: 'Enseignant',
          description: 'QR code plein \u00e9cran, scan instantan\u00e9, cartes \u00e9l\u00e8ves qui apparaissent progressivement.',
          media: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - En Classe - code big@2x.png',
          type: 'image' as const
        },
        {
          id: 'share-link',
          title: 'Partage de lien vers toute la classe',
          subtitle: 'Enseignant',
          description: 'L\u2019enseignant tape une URL, chaque navigateur \u00e9l\u00e8ve ouvre la m\u00eame page au m\u00eame moment.',
          media: '/images/sqool/sqool classe/Visuel - Comm - En Classe - Partager un lien - Toute la classe V0@2x.png',
          type: 'image' as const
        },
        {
          id: 'screen-sharing',
          title: '\u00c9cran de partage en cours',
          subtitle: 'Enseignant',
          description: 'L\u2019enseignant voit son \u00e9cran et ses \u00e9l\u00e8ves simultan\u00e9ment pendant le partage.',
          media: '/images/sqool/sqool classe/UI - enseignant_partage_d_cran_en_cours_1_5x.webp',
          type: 'image' as const
        },
        {
          id: 'observation',
          title: 'Observation en classe, Coll\u00e8ge Jean Vilar',
          subtitle: 'Terrain',
          description: 'Avant de dessiner quoi que ce soit, on s\u2019installe dans la salle de classe.',
          media: '/images/sqool/sqool classe/prototypes - observation - user testing - classe PXL_20231010_084158712.jpg',
          type: 'image' as const
        }
      ]
    },
    prototypeCta: {
      title: '42 prototypes interactifs \u00e0 explorer',
      description: 'Chaque sc\u00e9nario document\u00e9 avec animations GSAP',
      button: 'Explorer les prototypes'
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Ce que ce travail\na produit',
      metrics: [
        { value: '465', label: '\u00c9tablissements \u00e9quip\u00e9s', sublabel: '\u00cele-de-France' },
        { value: '42', label: 'Prototypes interactifs', sublabel: 'Chaque sc\u00e9nario document\u00e9' },
        { value: '30s', label: 'Pour connecter la classe', sublabel: 'Via QR code' }
      ]
    },
    testimonial: {
      quote: 'J\u2019ai eu la chance de collaborer avec Victor pendant 3 ans en bin\u00f4me et c\u2019est l\u2019un des designers les plus inspirants avec qui j\u2019ai travaill\u00e9. Victor allie une cr\u00e9ativit\u00e9 d\u00e9bordante \u00e0 une rigueur de travail impressionnante.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY'
    },
    cta: {
      title: 'Int\u00e9ress\u00e9 par des r\u00e9sultats similaires ?',
      button: 'Me contacter'
    }
  }
};

// ============================================================================
// PHASES DATA (for ProductEvolutionDiagram)
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Supervision",
      duration: "Months 1-8",
      icon: Layers,
      description: "Core real-time supervision and classroom management tools.",
      features: [
        "Student grid with live status indicators",
        "Real-time screen previews",
        "One-tap lock for all tablets",
        "QR code class opening (30 seconds)",
        "Grid and carousel display modes"
      ]
    },
    {
      id: 2,
      title: "Collaboration",
      duration: "Months 9-16",
      icon: Zap,
      description: "Interactive tools for teacher-student exchanges.",
      features: [
        "Document and link distribution",
        "Teacher-student messaging",
        "Live polling and shared timer",
        "Screen projection and live annotation",
        "Drag-and-drop group creation"
      ]
    },
    {
      id: 3,
      title: "Assessment",
      duration: "Months 17-24",
      icon: Trophy,
      description: "Exam mode, monitoring, and academic compliance.",
      features: [
        "Assignment mode with configurable restrictions",
        "Official exam setup (MDM configuration)",
        "32-station parallel monitoring",
        "Copy collection and academic transmission",
        "URL filtering and content restriction"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Supervision",
      duration: "Mois 1-8",
      icon: Layers,
      description: "Outils de supervision temps r\u00e9el et gestion de classe.",
      features: [
        "Grille \u00e9l\u00e8ves avec statuts temps r\u00e9el",
        "Aper\u00e7u des \u00e9crans en direct",
        "Verrouillage de toutes les tablettes en un tap",
        "Ouverture de classe par QR code (30 secondes)",
        "Mode d\u2019affichage grille et carrousel"
      ]
    },
    {
      id: 2,
      title: "Collaboration",
      duration: "Mois 9-16",
      icon: Zap,
      description: "Outils interactifs pour les \u00e9changes enseignant-\u00e9l\u00e8ves.",
      features: [
        "Distribution de documents et liens",
        "Messagerie enseignant-\u00e9l\u00e8ves",
        "Sondage en direct et minuteur partag\u00e9",
        "Projection d\u2019\u00e9cran et annotation en direct",
        "Cr\u00e9ation de groupes par glisser-d\u00e9poser"
      ]
    },
    {
      id: 3,
      title: "\u00c9valuation",
      duration: "Mois 17-24",
      icon: Trophy,
      description: "Mode examen, surveillance et conformit\u00e9 acad\u00e9mique.",
      features: [
        "Mode devoir avec restrictions configurables",
        "Examen officiel (configuration MDM)",
        "Surveillance de 32 postes en parall\u00e8le",
        "Collecte des copies et transmission acad\u00e9mie",
        "Filtrage d\u2019URL et restriction de contenu"
      ]
    }
  ]
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
    users: <Users size={24} />
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
    keyDeliverables: lang === 'fr' ? 'Livrables cl\u00e9s' : 'Key Deliverables',
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

const SqoolClasseExecutive: React.FC<SqoolClasseExecutiveProps> = ({
  systemTheme,
  lang,
  onImageClick,
  onViewFull: _onViewFull,
  onContact,
  onViewPrototypes
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
            <img loading="lazy"
              src="/images/sqool/logo-sqool.svg"
              alt="SQOOL"
              className="h-8 md:h-10 w-auto mb-8"
            />
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
              onClick={() => onImageClick('/images/thumbnail_sqool_classe.webp')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/thumbnail_sqool_classe.webp"
                alt="SQOOL Classe"
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
      {/* CONTEXT SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.context.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.context.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className={`mt-6 text-base md:text-lg leading-relaxed max-w-3xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.context.description}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROLE SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
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
      {/* PRODUCT MODULES SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {t.modules.eyebrow}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.modules.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ProductEvolutionDiagram isDark={isDark} lang={lang} />
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
      {/* HIGHLIGHTS SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
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

          <FadeInSection delay={0.15}>
            <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.highlights.subtitle}
            </p>
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
      {/* CTA PROTOTYPES SECTION */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <div
              onClick={onViewPrototypes}
              className="group w-full rounded-2xl bg-[#2D5CF3] hover:bg-[#2450d9] transition-colors cursor-pointer p-8 md:p-12 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                  {t.prototypeCta.title}
                </h3>
                <p className="text-white/70 mt-2 text-base md:text-lg">
                  {t.prototypeCta.description}
                </p>
              </div>
              <ArrowRight size={28} className="text-white flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUTCOME SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
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
      <section className="py-20 md:py-28 px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className={`text-4xl mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                "
              </div>
              <blockquote className={`text-lg md:text-xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {t.testimonial.quote}
              </blockquote>
              <div className="mt-8">
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

export default SqoolClasseExecutive;
