/**
 * DailymotionExecutive - "En bref" / "At a glance" version of Dailymotion case study
 *
 * Complete scope of work:
 * - Senior Product Designer for Partner Business Unit
 * - Full redesign of media management tools
 * - Upload, Live Console, Player Manager
 * - Design System creation
 *
 * Design: Apple Keynote-style with progressive disclosure (same as ToolkitExecutive & ConnectExecutive)
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  Layout,
  Users,
  Briefcase,
  Target,
  ArrowRight,
  CheckCircle2,
  Upload,
  Radio,
  Play
} from 'lucide-react';
interface DailymotionExecutiveProps {
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
      eyebrow: 'Senior Product Designer • Platform Redesign • 2017-2018',
      title: 'Video management\nfor media partners',
      subtitle: 'Empowering 30,000+ content partners to manage, publish and go live',
      scrollHint: 'Scroll to explore'
    },
    context: {
      eyebrow: 'Context',
      title: 'A platform in\ntransformation',
      description: 'Dailymotion was undergoing a major strategic pivot, shifting from general consumer content to repositioning itself as a premium platform for media partners. While high-profile partners like France TV, CBS, and beIN Sports were onboard, the existing tools were outdated, clunky, and inconsistent. Thousands of videos were uploaded daily, managed from a legacy backend that needed a complete overhaul.'
    },
    role: {
      eyebrow: 'My Role',
      title: 'Co-leading the\nfull redesign',
      subtitle: 'Building a control center for media operators',
      items: [
        { icon: 'briefcase', label: 'Senior Product Designer', detail: 'Partner Business Unit' },
        { icon: 'target', label: 'Co-lead redesign', detail: 'UX & UI ownership' },
        { icon: 'layout', label: 'Three core modules', detail: 'Upload, Live, Player' },
        { icon: 'layers', label: 'Design system', detail: 'Component library' },
        { icon: 'users', label: 'Cross-team', detail: 'Dev & stakeholder alignment' }
      ],
      context: 'As Senior Product Designer for the Partner Business Unit, I co-led the full redesign of Dailymotion\'s partner tools. My mission: rebuild the experience into a real control center for media operators handling industrial-scale workflows.'
    },
    scope: {
      eyebrow: 'Scope of Work',
      title: 'Three primary\nworkflows',
      intro: 'The Partner Space was reorganized around three modules that partners use daily.',
      areas: [
        {
          id: 'upload',
          title: 'Upload & Management',
          description: 'Redesigned upload to publication experience with batch processing and inline editing.',
          image: '/images/dailymotion/dailymotion_focus_upload_2x.webp'
        },
        {
          id: 'live',
          title: 'Live Console',
          description: 'Real-time monitoring interface for live video streams with clear status indicators.',
          image: '/images/dailymotion/dailymotion_focus_livestream_2x.webp'
        },
        {
          id: 'player',
          title: 'Player Manager',
          description: 'Visual customization tools for embed players and playback behaviors.',
          image: '/images/dailymotion/dailymotion_focus_player_template_2x.webp'
        },
        {
          id: 'library',
          title: 'Video Library',
          description: 'Bulk media management with status indicators and batch actions for thousands of videos.',
          image: '/images/dailymotion/dailymotion_-_video_manager.svg'
        },
        {
          id: 'share',
          title: 'Share & Embed',
          description: 'Full embed customization with auto-generated iframe code that updates dynamically.',
          image: '/images/dailymotion/dailymotion_-_share_expanded2x.webp'
        },
        {
          id: 'system',
          title: 'Design System',
          description: 'Component library with tokens, patterns, and usage guidelines.',
          image: '/images/dailymotion/design_system_-_component_library2x.webp'
        }
      ]
    },
    highlights: {
      eyebrow: 'Key Interactions',
      title: 'Microinteractions\nas differentiator',
      items: [
        {
          id: 'cancel',
          title: 'Cancel Upload',
          subtitle: 'Smooth cancellation',
          description: 'Visual feedback for upload cancellation with clear state transitions.',
          media: '/videos/dailymotion/video_-_cancel_upload.mp4',
          type: 'video' as const
        },
        {
          id: 'thumbnail',
          title: 'Thumbnail Update',
          subtitle: 'Instant preview',
          description: 'Upload an image and update video preview thumbnail instantly.',
          media: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4',
          type: 'video' as const
        },
        {
          id: 'embed',
          title: 'Embed Code',
          subtitle: 'Copy interaction',
          description: 'Input copy interaction with immediate user feedback.',
          media: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4',
          type: 'video' as const
        },
        {
          id: 'geoblocking',
          title: 'Geoblocking',
          subtitle: 'Location control',
          description: 'Allow/Block video broadcasts in specific geographic locations.',
          media: '/videos/dailymotion/Geoblocking.mp4',
          type: 'video' as const
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Design driving\nmeasurable results',
      metrics: [
        { value: '30,000+', label: 'Content partners', sublabel: 'served worldwide' },
        { value: '-50%', label: 'Preparation time', sublabel: 'for upload workflows' },
        { value: '120+', label: 'UI components', sublabel: 'in design system' }
      ]
    },
    cta: {
      viewFull: 'View full case study',
      visitDailymotion: 'Visit Dailymotion',
      getInTouch: 'Get in touch'
    }
  },
  fr: {
    hero: {
      eyebrow: 'Senior Product Designer • Refonte Plateforme • 2017-2018',
      title: 'Gestion vidéo\npour partenaires médias',
      subtitle: 'Outiller 30 000+ partenaires pour gérer, publier et diffuser en live',
      scrollHint: 'Défiler pour explorer'
    },
    context: {
      eyebrow: 'Contexte',
      title: 'Une plateforme en\ntransformation',
      description: 'Dailymotion était en plein pivot stratégique majeur, passant du contenu grand public à un repositionnement comme plateforme premium pour les partenaires médias. Bien que des partenaires de renom comme France TV, CBS et beIN Sports soient déjà à bord, les outils existants étaient obsolètes, peu ergonomiques et incohérents. Des milliers de vidéos étaient uploadées quotidiennement, gérées depuis un backend legacy nécessitant une refonte complète.'
    },
    role: {
      eyebrow: 'Mon Rôle',
      title: 'Co-piloter la\nrefonte complète',
      subtitle: 'Construire un centre de contrôle pour opérateurs médias',
      items: [
        { icon: 'briefcase', label: 'Senior Product Designer', detail: 'Business Unit Partner' },
        { icon: 'target', label: 'Co-lead refonte', detail: 'Ownership UX & UI' },
        { icon: 'layout', label: 'Trois modules core', detail: 'Upload, Live, Player' },
        { icon: 'layers', label: 'Design system', detail: 'Bibliothèque composants' },
        { icon: 'users', label: 'Transversal', detail: 'Alignement dev & stakeholders' }
      ],
      context: 'En tant que Senior Product Designer pour la Business Unit Partner, j\'ai co-piloté la refonte complète des outils partenaires de Dailymotion. Ma mission : reconstruire l\'expérience en un véritable centre de contrôle pour les opérateurs médias gérant des workflows à l\'échelle industrielle.'
    },
    scope: {
      eyebrow: 'Périmètre',
      title: 'Trois workflows\nprincipaux',
      intro: 'Le Partner Space a été réorganisé autour de trois modules que les partenaires utilisent quotidiennement.',
      areas: [
        {
          id: 'upload',
          title: 'Upload & Gestion',
          description: 'Expérience d\'upload vers publication repensée avec traitement par lot et édition inline.',
          image: '/images/dailymotion/dailymotion_focus_upload_2x.webp'
        },
        {
          id: 'live',
          title: 'Console Live',
          description: 'Interface de monitoring temps réel pour les streams vidéo live avec indicateurs de statut clairs.',
          image: '/images/dailymotion/dailymotion_focus_livestream_2x.webp'
        },
        {
          id: 'player',
          title: 'Gestionnaire Player',
          description: 'Outils de personnalisation visuelle pour les players embed et comportements de lecture.',
          image: '/images/dailymotion/dailymotion_focus_player_template_2x.webp'
        },
        {
          id: 'library',
          title: 'Bibliothèque Vidéo',
          description: 'Gestion média en masse avec indicateurs de statut et actions par lot pour des milliers de vidéos.',
          image: '/images/dailymotion/dailymotion_-_video_manager.svg'
        },
        {
          id: 'share',
          title: 'Partage & Embed',
          description: 'Personnalisation embed complète avec code iframe auto-généré mis à jour dynamiquement.',
          image: '/images/dailymotion/dailymotion_-_share_expanded2x.webp'
        },
        {
          id: 'system',
          title: 'Design System',
          description: 'Bibliothèque de composants avec tokens, patterns et guidelines d\'usage.',
          image: '/images/dailymotion/design_system_-_component_library2x.webp'
        }
      ]
    },
    highlights: {
      eyebrow: 'Interactions Clés',
      title: 'Les microinteractions\ncomme différenciateur',
      items: [
        {
          id: 'cancel',
          title: 'Annuler Upload',
          subtitle: 'Annulation fluide',
          description: 'Retour visuel pour l\'annulation d\'upload avec transitions d\'état claires.',
          media: '/videos/dailymotion/video_-_cancel_upload.mp4',
          type: 'video' as const
        },
        {
          id: 'thumbnail',
          title: 'Mise à jour Vignette',
          subtitle: 'Aperçu instantané',
          description: 'Uploader une image et mettre à jour la vignette de prévisualisation instantanément.',
          media: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4',
          type: 'video' as const
        },
        {
          id: 'embed',
          title: 'Code Embed',
          subtitle: 'Interaction de copie',
          description: 'Interaction de copie avec retour utilisateur immédiat.',
          media: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4',
          type: 'video' as const
        },
        {
          id: 'geoblocking',
          title: 'Geoblocking',
          subtitle: 'Contrôle géographique',
          description: 'Autoriser/Bloquer les diffusions vidéo dans des zones géographiques spécifiques.',
          media: '/videos/dailymotion/Geoblocking.mp4',
          type: 'video' as const
        }
      ]
    },
    outcome: {
      eyebrow: 'Impact',
      title: 'Le design qui génère\ndes résultats mesurables',
      metrics: [
        { value: '30 000+', label: 'Partenaires contenu', sublabel: 'dans le monde' },
        { value: '-50%', label: 'Temps de préparation', sublabel: 'pour workflows upload' },
        { value: '120+', label: 'Composants UI', sublabel: 'dans le design system' }
      ]
    },
    cta: {
      viewFull: 'Voir l\'étude complète',
      visitDailymotion: 'Visiter Dailymotion',
      getInTouch: 'Me contacter'
    }
  }
};

// ============================================================================
// PHASES DATA
// ============================================================================

const PHASES_DATA = {
  en: [
    {
      id: 1,
      title: "Upload & Management",
      duration: "Core Module",
      icon: Upload,
      description: "Redesigning the upload to publication experience.",
      features: [
        "Batch upload with parallel processing",
        "Real-time progress and error visibility",
        "Inline metadata editing during encoding",
        "Geoblocking and scheduling controls",
        "Video library with bulk operations",
        "Dynamic share and embed modal"
      ]
    },
    {
      id: 2,
      title: "Live Streaming Console",
      duration: "Core Module",
      icon: Radio,
      description: "Real-time monitoring for live broadcasts.",
      features: [
        "Three-panel structure: Control, Info, Record",
        "Status transitions: Ready → On Air → Recording",
        "Real-time metrics (bitrate, viewers, latency)",
        "Pre-broadcast countdown interface",
        "Animated state change feedback",
        "Technical operator diagnostics panel"
      ]
    },
    {
      id: 3,
      title: "Player Manager",
      duration: "Core Module",
      icon: Play,
      description: "Visual customization for embed players.",
      features: [
        "Progressive disclosure interface",
        "Guided player creation flow",
        "Appearance and content assignment",
        "Auto-generated embed code",
        "Template management system",
        "Non-technical user friendly"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      title: "Upload & Gestion",
      duration: "Module Core",
      icon: Upload,
      description: "Repenser l'expérience d'upload vers publication.",
      features: [
        "Upload par lot avec traitement parallèle",
        "Progression temps réel et visibilité erreurs",
        "Édition métadonnées inline pendant encodage",
        "Contrôles geoblocking et programmation",
        "Bibliothèque vidéo avec opérations bulk",
        "Modal partage et embed dynamique"
      ]
    },
    {
      id: 2,
      title: "Console Live Streaming",
      duration: "Module Core",
      icon: Radio,
      description: "Monitoring temps réel pour diffusions live.",
      features: [
        "Structure trois panneaux : Contrôle, Info, Record",
        "Transitions statut : Prêt → À l'antenne → Enregistrement",
        "Métriques temps réel (débit, viewers, latence)",
        "Interface compte à rebours pré-diffusion",
        "Feedback animé changement d'état",
        "Panneau diagnostics opérateur technique"
      ]
    },
    {
      id: 3,
      title: "Gestionnaire Player",
      duration: "Module Core",
      icon: Play,
      description: "Personnalisation visuelle pour players embed.",
      features: [
        "Interface à divulgation progressive",
        "Flux guidé création player",
        "Assignation apparence et contenu",
        "Code embed auto-généré",
        "Système gestion templates",
        "Adapté utilisateurs non techniques"
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
// ROLE DIAGRAM
// ============================================================================

const RoleDiagram: React.FC<{
  items: Array<{ icon: string; label: string; detail: string }>;
  isDark: boolean;
}> = ({ items, isDark }) => {
  const iconMap: Record<string, React.ReactNode> = {
    briefcase: <Briefcase size={24} />,
    target: <Target size={24} />,
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
// SCOPE GRID
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
          <div className="aspect-[4/3] overflow-hidden">
            <img loading="lazy"
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </div>
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
// PRODUCT MODULES DIAGRAM
// ============================================================================

const ProductModulesDiagram: React.FC<{
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ isDark, lang }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [viewMode, setViewMode] = useState<'focus' | 'overview'>('focus');
  const phases = PHASES_DATA[lang];

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
    module: lang === 'fr' ? 'Module' : 'Module',
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
                          {texts.module} {phase.id}
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
                      {texts.module} {phase.id}
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
// HIGHLIGHTS GRID
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
          <div
            onClick={() => onImageClick(item.media)}
            className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
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

const DailymotionExecutive: React.FC<DailymotionExecutiveProps> = ({
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
            <img loading="lazy"
              src={isDark
                ? '/images/dailymotion/logo-dailymotion-white.svg'
                : '/images/dailymotion/logo-dailymotion-black.svg'
              }
              alt="Dailymotion"
              className="h-8 w-auto mb-8"
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
              onClick={() => onImageClick('/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img loading="lazy"
                src="/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp"
                alt="Dailymotion Partner Platform"
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
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.context.title}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className={`mt-6 text-lg leading-relaxed max-w-4xl ${
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
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
      {/* MODULES SECTION */}
      {/* ================================================================== */}
      <section className={`py-20 md:py-28 px-10 ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <span className={`text-sm font-medium tracking-wide ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {lang === 'fr' ? 'Modules Produit' : 'Product Modules'}
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {lang === 'fr' ? 'Trois modules\ncore livrés' : 'Three core\nmodules delivered'}
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <ProductModulesDiagram isDark={isDark} lang={lang} />
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
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
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
            <h2 className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.outcome.title}
            </h2>
          </FadeInSection>

          <MetricsRow metrics={t.outcome.metrics} isDark={isDark} />
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
              {t.cta.getInTouch}
              <ArrowRight size={22} />
            </button>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
};

export default DailymotionExecutive;
