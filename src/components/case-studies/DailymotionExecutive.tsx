/**
 * DailymotionExecutive - Minimalist "En bref" / "At a glance" for Dailymotion
 */

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyViewPills from '../CaseStudyViewPills';
import VideoPlayer from '../VideoPlayer';

interface DailymotionExecutiveProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onViewFull: () => void;
  onContact?: () => void;
}

const TRANSLATIONS = {
  en: {
    hero: {
      eyebrow: 'Senior Product Designer \u00b7 2017-2018',
      title: 'Video management for media partners',
      subtitle: 'Empowering 30,000+ content partners to manage, publish and go live. Dailymotion was undergoing a major strategic pivot, shifting from general consumer content to repositioning itself as a premium platform for media partners.',
      image: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp',
    },
    role: {
      title: 'Role',
      items: [
        { label: 'Senior Product Designer', detail: 'Partner Business Unit' },
        { label: 'Co-lead redesign', detail: 'UX & UI ownership' },
        { label: 'Three core modules', detail: 'Upload, Live, Player' },
        { label: 'Design system', detail: 'Component library' },
        { label: 'Cross-team', detail: 'Dev & stakeholder alignment' },
      ],
      context: 'As Senior Product Designer for the Partner Business Unit, I co-led the full redesign of Dailymotion\'s partner tools. My mission: rebuild the experience into a real control center for media operators handling industrial-scale workflows.',
    },
    modules: {
      title: 'Three core modules',
      phases: [
        {
          title: 'Upload & Management',
          period: 'Core Module',
          deliverables: [
            'Batch upload with parallel processing',
            'Real-time progress and error visibility',
            'Inline metadata editing during encoding',
            'Geoblocking and scheduling controls',
            'Video library with bulk operations',
            'Dynamic share and embed modal',
          ],
        },
        {
          title: 'Live Streaming Console',
          period: 'Core Module',
          deliverables: [
            'Three-panel structure: Control, Info, Record',
            'Status transitions: Ready, On Air, Recording',
            'Real-time metrics (bitrate, viewers, latency)',
            'Pre-broadcast countdown interface',
            'Animated state change feedback',
            'Technical operator diagnostics panel',
          ],
        },
        {
          title: 'Player Manager',
          period: 'Core Module',
          deliverables: [
            'Progressive disclosure interface',
            'Guided player creation flow',
            'Appearance and content assignment',
            'Auto-generated embed code',
            'Template management system',
            'Non-technical user friendly',
          ],
        },
      ],
    },
    scope: {
      title: 'Scope of work',
      intro: 'The Partner Space was reorganized around three modules that partners use daily.',
      areas: [
        {
          title: 'Upload & Management',
          description: 'Redesigned upload to publication experience with batch processing and inline editing.',
          image: '/images/dailymotion/dailymotion_focus_upload_2x.webp',
        },
        {
          title: 'Live Console',
          description: 'Real-time monitoring interface for live video streams with clear status indicators.',
          image: '/images/dailymotion/dailymotion_focus_livestream_2x.webp',
        },
        {
          title: 'Player Manager',
          description: 'Visual customization tools for embed players and playback behaviors.',
          image: '/images/dailymotion/dailymotion_focus_player_template_2x.webp',
        },
        {
          title: 'Video Library',
          description: 'Bulk media management with status indicators and batch actions for thousands of videos.',
          image: '/images/dailymotion/dailymotion_-_video_manager.svg',
        },
        {
          title: 'Share & Embed',
          description: 'Full embed customization with auto-generated iframe code that updates dynamically.',
          image: '/images/dailymotion/dailymotion_-_share_expanded2x.webp',
        },
        {
          title: 'Design System',
          description: 'Component library with tokens, patterns, and usage guidelines.',
          image: '/images/dailymotion/design_system_-_component_library2x.webp',
        },
      ],
    },
    highlights: {
      title: 'Key interactions',
      items: [
        {
          title: 'Cancel Upload',
          description: 'Visual feedback for upload cancellation with clear state transitions.',
          media: '/videos/dailymotion/video_-_cancel_upload.mp4',
          type: 'video' as const,
        },
        {
          title: 'Thumbnail Update',
          description: 'Upload an image and update video preview thumbnail instantly.',
          media: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4',
          type: 'video' as const,
        },
        {
          title: 'Embed Code',
          description: 'Input copy interaction with immediate user feedback.',
          media: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4',
          type: 'video' as const,
        },
        {
          title: 'Geoblocking',
          description: 'Allow/Block video broadcasts in specific geographic locations.',
          media: '/videos/dailymotion/Geoblocking.mp4',
          type: 'video' as const,
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '30,000+', label: 'Content partners served worldwide' },
        { value: '-50%', label: 'Preparation time for upload workflows' },
        { value: '120+', label: 'UI components in design system' },
      ],
    },
  },
  fr: {
    hero: {
      eyebrow: 'Senior Product Designer \u00b7 2017-2018',
      title: 'Gestion vid\u00e9o pour partenaires m\u00e9dias',
      subtitle: 'Outiller 30 000+ partenaires pour g\u00e9rer, publier et diffuser en live. Dailymotion \u00e9tait en plein pivot strat\u00e9gique majeur, passant du contenu grand public \u00e0 un repositionnement comme plateforme premium pour les partenaires m\u00e9dias.',
      image: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp',
    },
    role: {
      title: 'R\u00f4le',
      items: [
        { label: 'Senior Product Designer', detail: 'Business Unit Partner' },
        { label: 'Co-lead refonte', detail: 'Ownership UX & UI' },
        { label: 'Trois modules core', detail: 'Upload, Live, Player' },
        { label: 'Design system', detail: 'Biblioth\u00e8que composants' },
        { label: 'Transversal', detail: 'Alignement dev & stakeholders' },
      ],
      context: 'En tant que Senior Product Designer pour la Business Unit Partner, j\'ai co-pilot\u00e9 la refonte compl\u00e8te des outils partenaires de Dailymotion. Ma mission : reconstruire l\u2019exp\u00e9rience en un v\u00e9ritable centre de contr\u00f4le pour les op\u00e9rateurs m\u00e9dias g\u00e9rant des workflows \u00e0 l\u2019\u00e9chelle industrielle.',
    },
    modules: {
      title: 'Trois modules core',
      phases: [
        {
          title: 'Upload & Gestion',
          period: 'Module Core',
          deliverables: [
            'Upload par lot avec traitement parall\u00e8le',
            'Progression temps r\u00e9el et visibilit\u00e9 erreurs',
            '\u00c9dition m\u00e9tadonn\u00e9es inline pendant encodage',
            'Contr\u00f4les geoblocking et programmation',
            'Biblioth\u00e8que vid\u00e9o avec op\u00e9rations bulk',
            'Modal partage et embed dynamique',
          ],
        },
        {
          title: 'Console Live Streaming',
          period: 'Module Core',
          deliverables: [
            'Structure trois panneaux : Contr\u00f4le, Info, Record',
            'Transitions statut : Pr\u00eat, \u00c0 l\u2019antenne, Enregistrement',
            'M\u00e9triques temps r\u00e9el (d\u00e9bit, viewers, latence)',
            'Interface compte \u00e0 rebours pr\u00e9-diffusion',
            'Feedback anim\u00e9 changement d\u2019\u00e9tat',
            'Panneau diagnostics op\u00e9rateur technique',
          ],
        },
        {
          title: 'Gestionnaire Player',
          period: 'Module Core',
          deliverables: [
            'Interface \u00e0 divulgation progressive',
            'Flux guid\u00e9 cr\u00e9ation player',
            'Assignation apparence et contenu',
            'Code embed auto-g\u00e9n\u00e9r\u00e9',
            'Syst\u00e8me gestion templates',
            'Adapt\u00e9 utilisateurs non techniques',
          ],
        },
      ],
    },
    scope: {
      title: 'P\u00e9rim\u00e8tre',
      intro: 'Le Partner Space a \u00e9t\u00e9 r\u00e9organis\u00e9 autour de trois modules que les partenaires utilisent quotidiennement.',
      areas: [
        {
          title: 'Upload & Gestion',
          description: 'Exp\u00e9rience d\u2019upload vers publication repens\u00e9e avec traitement par lot et \u00e9dition inline.',
          image: '/images/dailymotion/dailymotion_focus_upload_2x.webp',
        },
        {
          title: 'Console Live',
          description: 'Interface de monitoring temps r\u00e9el pour les streams vid\u00e9o live avec indicateurs de statut clairs.',
          image: '/images/dailymotion/dailymotion_focus_livestream_2x.webp',
        },
        {
          title: 'Gestionnaire Player',
          description: 'Outils de personnalisation visuelle pour les players embed et comportements de lecture.',
          image: '/images/dailymotion/dailymotion_focus_player_template_2x.webp',
        },
        {
          title: 'Biblioth\u00e8que Vid\u00e9o',
          description: 'Gestion m\u00e9dia en masse avec indicateurs de statut et actions par lot pour des milliers de vid\u00e9os.',
          image: '/images/dailymotion/dailymotion_-_video_manager.svg',
        },
        {
          title: 'Partage & Embed',
          description: 'Personnalisation embed compl\u00e8te avec code iframe auto-g\u00e9n\u00e9r\u00e9 mis \u00e0 jour dynamiquement.',
          image: '/images/dailymotion/dailymotion_-_share_expanded2x.webp',
        },
        {
          title: 'Design System',
          description: 'Biblioth\u00e8que de composants avec tokens, patterns et guidelines d\u2019usage.',
          image: '/images/dailymotion/design_system_-_component_library2x.webp',
        },
      ],
    },
    highlights: {
      title: 'Interactions cl\u00e9s',
      items: [
        {
          title: 'Annuler Upload',
          description: 'Retour visuel pour l\u2019annulation d\u2019upload avec transitions d\u2019\u00e9tat claires.',
          media: '/videos/dailymotion/video_-_cancel_upload.mp4',
          type: 'video' as const,
        },
        {
          title: 'Mise \u00e0 jour Vignette',
          description: 'Uploader une image et mettre \u00e0 jour la vignette de pr\u00e9visualisation instantan\u00e9ment.',
          media: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4',
          type: 'video' as const,
        },
        {
          title: 'Code Embed',
          description: 'Interaction de copie avec retour utilisateur imm\u00e9diat.',
          media: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4',
          type: 'video' as const,
        },
        {
          title: 'Geoblocking',
          description: 'Autoriser/Bloquer les diffusions vid\u00e9o dans des zones g\u00e9ographiques sp\u00e9cifiques.',
          media: '/videos/dailymotion/Geoblocking.mp4',
          type: 'video' as const,
        },
      ],
    },
    outcome: {
      title: 'Impact',
      metrics: [
        { value: '30 000+', label: 'Partenaires contenu dans le monde' },
        { value: '-50%', label: 'Temps de pr\u00e9paration pour workflows upload' },
        { value: '120+', label: 'Composants UI dans le design system' },
      ],
    },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const DailymotionExecutive: React.FC<DailymotionExecutiveProps> = ({
  lang,
  onImageClick,
}) => {
  const t = TRANSLATIONS[lang];

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] as const },
  });

  return (
    <div className="bg-[#FDFDFC] min-h-screen">

      {/* HERO */}
      <section id="hero" className="pt-16 md:pt-24 mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.p {...fadeIn()} className="text-xs text-gray-400 mb-4">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 {...fadeIn(0.05)} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.hero.title}
          </motion.h1>
          <motion.p {...fadeIn(0.1)} className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
            {t.hero.subtitle}
          </motion.p>
          <motion.div {...fadeIn(0.15)}>
            <CaseStudyViewPills lang={lang} projectId="dailymotion" isDark={false} />
          </motion.div>
        </div>
        <div className="max-w-[960px] mx-auto px-6 mt-10">
          <motion.div {...fadeIn(0.2)}>
            <div
              onClick={() => onImageClick(t.hero.image)}
              className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <img
                loading="lazy"
                src={t.hero.image}
                alt="Dailymotion Partner Platform"
                className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROLE */}
      <section id="role" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.role.title}
          </motion.h2>
          <motion.ul {...fadeIn(0.05)} className="divide-y divide-gray-100">
            {t.role.items.map((item, idx) => (
              <li key={idx} className="py-3 flex items-baseline justify-between">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-xs text-gray-400">{item.detail}</span>
              </li>
            ))}
          </motion.ul>
          <motion.p {...fadeIn(0.1)} className="text-base text-gray-500 leading-relaxed max-w-[65ch] mt-6">
            {t.role.context}
          </motion.p>
        </div>
      </section>

      {/* MODULES */}
      <section id="journey" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.modules.title}
          </motion.h2>
          <div className="space-y-10">
            {t.modules.phases.map((phase, idx) => (
              <motion.div key={idx} {...fadeIn()}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-900">{phase.title}</span>
                  <span className="text-xs text-gray-400">{phase.period}</span>
                </div>
                <ul className="divide-y divide-gray-100">
                  {phase.deliverables.map((d, i) => (
                    <li key={i} className="py-2 text-sm text-gray-500">{d}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section id="scope" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.scope.title}
          </motion.h2>
          <motion.p {...fadeIn(0.05)} className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-4">
            {t.scope.intro}
          </motion.p>
        </div>

        {t.scope.areas.map((area, idx) => (
          <React.Fragment key={idx}>
            <motion.div {...fadeIn()} className="max-w-[740px] mx-auto px-6 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{area.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{area.description}</p>
            </motion.div>
            <motion.div {...fadeIn()} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
                onClick={() => onImageClick(area.image)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                <img
                  loading="lazy"
                  src={area.image}
                  alt={area.title}
                  className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-xs font-medium text-gray-400">{area.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* KEY INTERACTIONS */}
      <section id="highlights" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
            {t.highlights.title}
          </motion.h2>
        </div>
        {t.highlights.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <motion.div {...fadeIn()} className="max-w-[740px] mx-auto px-6 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{item.description}</p>
            </motion.div>
            <motion.div {...fadeIn()} className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <div
                onClick={() => onImageClick(item.media)}
                className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,ring-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                {item.type === 'video' ? (
                  <VideoPlayer src={item.media} className="w-full h-auto block" />
                ) : (
                  <img
                    loading="lazy"
                    src={item.media}
                    alt={item.title}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <p className="mt-3 text-xs font-medium text-gray-400">{item.title}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </section>

      {/* IMPACT */}
      <section id="outcome" className="mb-24 md:mb-32">
        <div className="max-w-[740px] mx-auto px-6">
          <motion.h2 {...fadeIn()} className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
            {t.outcome.title}
          </motion.h2>
          <motion.div {...fadeIn(0.05)} className="flex flex-wrap gap-x-16 gap-y-8">
            {t.outcome.metrics.map((metric, idx) => (
              <div key={idx}>
                <span className="text-base font-semibold text-gray-900">{metric.value}</span>
                <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DailymotionExecutive;
