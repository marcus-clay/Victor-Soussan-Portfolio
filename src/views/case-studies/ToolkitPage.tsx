// Toolkit Case Study Page - Minimalist aesthetic
// Displays the Toolkit project case study

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getToolkitGalleryItems } from '../../components/BentoGallery';
import ToolkitExecutive from '../../components/case-studies/ToolkitExecutive';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { TOOLKIT_TRANSLATIONS } from '../../data/caseStudyTranslations/toolkitTranslations';

interface ToolkitPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

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

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|mov)$/i);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
      onClick={onClick}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
        {item.caption}
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
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
      description: "Architecture core et workflows essentiels.",
      features: [
        "Architecture authentification & navigation",
        "Workflows creation & gestion projet",
        "Bibliotheque taches avec sequences drag-drop",
        "Planning V1 avec cartes colorees",
        "Systeme abonnement (individuel + entreprise)",
        "Export PDF"
      ]
    },
    {
      id: 2,
      title: "Expansion Features",
      duration: "Mois 4-8",
      description: "Interactions enrichies et systemes visuels.",
      features: [
        "Interactions planning avancees (multi-selection)",
        "Systeme menu adaptatif dynamic island",
        "Esthetique cartes taches affinee (V2)",
        "Zoom fluide timeline (jour a trimestre)",
        "Hub projet pour managers multi-sites",
        "Gestion des parties prenantes"
      ]
    },
    {
      id: 3,
      title: "Maturite Plateforme",
      duration: "Mois 9-12",
      description: "Scalabilite, strategie mobile et raffinement.",
      features: [
        "Gestion complexite visuelle (hierarchie)",
        "Strategie mobile platform-specific",
        "Evolution navigation (acces direct)",
        "Navigation mobile consolidee (4 groupes)",
        "Enrichissement activite (annotation photo)",
        "Scalabilite design system (120+ ecrans)"
      ]
    }
  ]
};

// ============================================================================
// PRODUCT EVOLUTION DIAGRAM - Minimalist
// ============================================================================

const ProductEvolutionDiagram: React.FC<{
  lang: 'en' | 'fr';
}> = ({ lang }) => {
  const [activePhase, setActivePhase] = useState(0);
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
    keyDeliverables: lang === 'fr' ? 'Livrables cles' : 'Key Deliverables',
    phase: lang === 'fr' ? 'Phase' : 'Phase',
  };

  return (
    <div className="mt-8">
      {/* Phase tabs */}
      <div className="flex gap-1 mb-8">
        {phases.map((phase, idx) => (
          <button
            key={idx}
            onClick={() => setActivePhase(idx)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors duration-200 ${
              idx === activePhase
                ? 'bg-gray-900 text-white'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {texts.phase} {phase.id}
          </button>
        ))}
      </div>

      {/* Active phase card */}
      <div
        className="relative touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          {phases.map((phase, idx) => {
            if (idx !== activePhase) return null;
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="space-y-8">
                  {/* Identity */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{texts.phase} {phase.id} · {phase.duration}</p>
                    <p className="text-sm font-medium text-gray-900 mb-2">{phase.title}</p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{phase.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-xs text-gray-400 mb-4">{texts.keyDeliverables}</p>
                    <div className="divide-y divide-gray-100">
                      {phase.features.map((feature, fIdx) => (
                        <motion.div
                          key={fIdx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 + fIdx * 0.05, duration: 0.3 }}
                          className="py-2.5 flex items-start gap-2"
                        >
                          <span className="text-gray-300 mt-0.5">&#8226;</span>
                          <span className="text-base text-gray-500 leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={activePhase === 0}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-0 disabled:pointer-events-none flex items-center gap-1"
          >
            <ArrowRight size={14} className="rotate-180" />
            <span>{lang === 'fr' ? 'Precedent' : 'Previous'}</span>
          </button>
          <button
            onClick={handleNext}
            disabled={activePhase === phases.length - 1}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-0 disabled:pointer-events-none flex items-center gap-1"
          >
            <span>{lang === 'fr' ? 'Suivant' : 'Next'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ToolkitPage: React.FC<ToolkitPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['toolkit'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('toolkit', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const t = TOOLKIT_TRANSLATIONS[lang];
  const galleryItems = getToolkitGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [caseStudyMode, viewMode]);

  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Reusable media figure component
  const MediaFigure = ({ src, alt, caption, captionDesc, description, type = 'image', className = '' }: {
    src: string; alt: string; caption: string; captionDesc?: string; description?: string; type?: 'image' | 'video'; className?: string;
  }) => (
    <motion.figure
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      <div
        onClick={() => openLightbox(src)}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
      >
        {type === 'video' ? (
          <VideoPlayer
            src={src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={src} alt={alt}
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="mt-4 max-w-[740px] mx-auto">
        <p className="text-xs font-medium text-gray-400 mb-1">{caption}</p>
        {captionDesc && <p className="text-base text-gray-500 leading-relaxed">{captionDesc}</p>}
        {description && <p className="text-base text-gray-500 leading-relaxed mt-2">{description}</p>}
      </div>
    </motion.figure>
  );

  // Reusable video figure with ref tracking
  const VideoFigure = ({ src, refKey, caption, captionDesc, description, className = '' }: {
    src: string; refKey: string; caption: string; captionDesc?: string; description?: string; className?: string;
  }) => (
    <motion.figure
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      <div
        onClick={() => {
          const currentTime = videoRefs.current[refKey]?.currentTime || 0;
          openLightbox(src, currentTime);
        }}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
      >
        <VideoPlayer
          src={src}
          className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4 max-w-[740px] mx-auto">
        <p className="text-xs font-medium text-gray-400 mb-1">{caption}</p>
        {captionDesc && <p className="text-base text-gray-500 leading-relaxed">{captionDesc}</p>}
        {description && <p className="text-base text-gray-500 leading-relaxed mt-2">{description}</p>}
      </div>
    </motion.figure>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDFDFC]"
    >

      {/* Lightbox */}
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

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Gallery View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="max-w-[960px] mx-auto px-6 py-8 md:py-12"
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
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
            transition={{ duration: 0.15 }}
          >
            <ToolkitExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onViewFull={() => setCaseStudyMode('full')}
              onContact={onContact}
            />
          </motion.div>
        ) : (
          /* Full Case Study View */
          <motion.div
            key="caseStudy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24">
                {/* Meta */}
                <p className="text-xs text-gray-400 mb-4">
                  {t.hero.tags} · {t.hero.zeroToOne} · {t.meta.period}
                </p>

                {/* Title */}
                <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
                  {t.hero.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm font-medium text-gray-900 mb-4">
                  {t.hero.subtitle}
                </p>

                {/* Description */}
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-6">
                  {t.hero.description}
                </p>

                {/* Visit Website */}
                <a
                  href="https://toolkit-app.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
                >
                  {t.visitToolkit}
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Testimonial */}
              <div className="max-w-[740px] mx-auto px-6 mt-10">
                <div className="py-6 border-t border-gray-100">
                  <p className="text-base text-gray-500 leading-relaxed italic max-w-[65ch] mb-4">
                    "{t.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img loading="lazy"
                      src="/images/people/pierre-marie-nigay.webp"
                      alt={t.testimonial.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {t.testimonial.author}
                      </p>
                      <p className="text-xs text-gray-400">
                        {t.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hero Image */}
            <div className="max-w-[960px] mx-auto px-6">
              <MediaFigure
                src="/images/toolkit/hero.webp"
                alt="Toolkit App Overview"
                caption={t.captions.hero as string}
                captionDesc={t.captions.heroDesc as string}
                className="mb-24 md:mb-32"
              />
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.overview.title}
                </h2>

                <div className="space-y-8">
                  {/* Introduction */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {t.overview.introTitle}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.overview.introP1}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mt-3">
                      {t.overview.introP2}
                    </p>
                  </div>

                  {/* My Role */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {t.overview.roleTitle}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.overview.roleDesc}
                    </p>
                  </div>

                  {/* Project and Impact */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {t.overview.projectTitle}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.overview.projectP1}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mt-3">
                      {t.overview.projectP2}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Context and Approach Section */}
            <section id="context" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.context.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.context.intro}
                </p>

                {/* Three phases interactive */}
                <ProductEvolutionDiagram lang={lang} />
              </div>

              {/* Diagram 01 - Core Challenge */}
              <div className="max-w-[740px] mx-auto px-6 mt-16 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.context.coreChallenge}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.context.coreChallengeDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Diagram_01_-_Problem.svg"
                  alt="Core Design Challenge"
                  caption={t.context.coreChallenge}
                />
              </div>

              {/* Diagram 02 - Research */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.context.research}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.context.researchDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Diagram_02_-_Research.svg"
                  alt="Research process"
                  caption={t.context.research}
                />
              </div>

              {/* Diagram 03 - Foundation */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.context.foundation}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.context.foundationDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Diagram_03_-_Foundation.svg"
                  alt="Foundation"
                  caption={t.context.foundation}
                />
              </div>

              {/* Diagram 04 - Creation Workflow */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.context.creationWorkflow}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.context.creationWorkflowDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Diagram_04_-_Project_creation_workflow.svg"
                  alt="Project Creation Workflow"
                  caption={t.context.creationWorkflow}
                />
              </div>

              {/* Diagram 05 - Interaction Principles */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.context.interactionPrinciples}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.context.interactionPrinciplesDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Diagram_05_-_Core_interaction_principles.svg"
                  alt="Core Interaction Principles"
                  caption={t.context.interactionPrinciples}
                />
              </div>
            </section>

            {/* Phase 1 - Foundation */}
            <section id="phase1" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.phase1.title}
                </h2>

                <p className="text-sm font-medium text-gray-900 mb-8">
                  {t.phase1.firstTimeExp}
                </p>
              </div>

              {/* Passwordless authentication */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.passwordlessAuth}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.passwordlessAuthDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/authentication_-_magic_link.svg"
                  alt="Passwordless authentication"
                  caption={t.captions.passwordlessAuth as string}
                />
              </div>

              {/* Empty state */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.emptyState}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.emptyStateDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_create_-_empty.svg"
                  alt="Empty state"
                  caption={t.captions.emptyState as string}
                />
              </div>

              {/* Form design pattern */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.formPattern}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.formPatternDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_create_-_modal.svg"
                  alt="Form design pattern"
                  caption={t.captions.formPattern as string}
                />
              </div>

              {/* Chantier Detail v1 */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.chantierV1}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.chantierV1Desc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_details_-_v1.svg"
                  alt="Chantier Detail v1"
                  caption={t.captions.chantierV1 as string}
                />
              </div>

              {/* Chantier Detail v2 */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.chantierV2}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.chantierV2Desc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_details_-_v2.svg"
                  alt="Chantier Detail v2"
                  caption={t.captions.chantierV2 as string}
                />
              </div>

              {/* Show and Hide navigation */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Show and Hide navigation
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Secondary sidebar collapsing and expanding on demand. Setup sections (zones, companies, task libraries) prominent during project creation, collapsing once project active. Operations sections (planning, documents, observations) surfacing as primary navigation. Progressive disclosure: complexity hidden until relevant, interface adapting to project lifecycle stage.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <VideoFigure
                  src="/videos/toolkit/video_-_navigation_-_show_hide.mp4"
                  refKey="nav-show-hide"
                  caption={t.captions.navShowHide as string}
                  captionDesc={t.captions.navShowHideDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Tasks */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Tasks
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Reusable templates with title, estimated duration, and responsible trade. Grouped in libraries by site type, they reduce repetitive data entry and ensure consistent information across projects.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/daktop_-_site_setup_-_tasks_list.svg"
                  alt="Task creation interface"
                  caption={t.captions.taskCreation as string}
                  captionDesc={t.captions.taskCreationDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Sequences */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Sequences
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Ordered sets of tasks that populate the planning automatically when applied to a project. Sequences encode team expertise into repeatable workflows, cutting setup time significantly.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg"
                  alt="Tasks sequences interface"
                  caption={t.captions.taskSequences as string}
                  captionDesc={t.captions.taskSequencesDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Planning */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Planning
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Gantt-style canvas organized by trade or zone. The initial version used colorful task cards for quick visual parsing. Later iterations refined the task component design and the interaction model around scheduling and multi-select.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/planning_-_v1.svg"
                  alt="Planning interface v1"
                  caption={t.captions.planningV1 as string}
                  captionDesc={t.captions.planningV1Desc as string}
                />
              </div>

              {/* Task component v1 */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.taskComponentV1}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.taskComponentV1Desc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Component_Task_v1.svg"
                  alt="Task component v1"
                  caption={t.captions.taskComponentV1 as string}
                />
              </div>

              {/* Task component v2 */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.taskComponentV2}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.taskComponentV2Desc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/Component_Task_v2.svg"
                  alt="Task component v2"
                  caption={t.captions.taskComponentV2 as string}
                />
              </div>

              {/* Planning v2 */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.planningV2}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.planningV2Desc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/planning_-_v2.svg"
                  alt="Planning interface v2"
                  caption={t.captions.planningV2 as string}
                />
              </div>

              {/* Multi-select */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.multiSelect}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.multiSelectDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/planning_-_mouse_-_selection_rectangle.svg"
                  alt="Multi-select"
                  caption={t.captions.multiSelect as string}
                />
              </div>

              {/* Context menu */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.contextMenu}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.contextMenuDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/planning_-_mouse_-_right_click.svg"
                  alt="Context menu"
                  caption={t.captions.contextMenu as string}
                />
              </div>

              {/* Adaptive zoom */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.adaptiveZoom}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.adaptiveZoomDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/planning_-_selection_tache_dynamic_menu.svg"
                  alt="Adaptive zoom"
                  caption={t.captions.adaptiveZoom as string}
                />
              </div>

              {/* Expand layout */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Expand layout on planning view
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  To enhance ease of use on the planning we implemented a way to expand the layout to focus on task management, without getting confusion with navigation panel.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <VideoFigure
                  src="/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4"
                  refKey="planning-zoom"
                  caption={t.captions.expandLayout as string}
                  captionDesc={t.captions.expandLayoutDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>
            </section>

            {/* Phase 2 - Feature expansion */}
            <section id="phase2" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.phase2.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.phase2.intro}
                </p>

                {/* Dynamic Menu */}
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase2.dynamicMenu}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  {t.phase2.dynamicMenuDesc}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/dynamic_island_menu_-_modifier_tache.svg"
                  alt="Dynamic island menu - task modification"
                  caption={t.captions.dynamicIsland as string}
                  captionDesc={t.captions.dynamicIslandDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Task manipulation video */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Task manipulation in planning
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Edit duration and task information on the fly directly from the planning canvas.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <VideoFigure
                  src="/videos/toolkit/video_-_task_manipulation.mp4"
                  refKey="task-manipulation"
                  caption={t.captions.taskManipulation as string}
                  captionDesc={t.captions.taskManipulationDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Batch edition video */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Batch edition
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds. Users managing 50-100+ tasks need efficient ways to apply changes across groups.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <VideoFigure
                  src="/videos/toolkit/video_-_batch_edition.mp4"
                  refKey="batch-edition"
                  caption={t.captions.batchEdition as string}
                  captionDesc={t.captions.batchEditionDesc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Interface System */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.interfaceSystem}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.interfaceSystemDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
                <MediaFigure
                  src="/images/toolkit/dynamic_menu_-_components_and_interface_system.svg"
                  alt="Dynamic menu components and interface system"
                  caption={t.captions.interfaceSystem as string}
                />
              </div>

              {/* Activity Section */}
              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.captions.activitySection}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.captions.activitySectionDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg"
                  alt="Task detail with activity section"
                  caption={t.captions.activitySection as string}
                />
              </div>
            </section>

            {/* Phase 3 - Platform maturity */}
            <section id="phase3" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.phase3.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.phase3.intro}
                </p>

                {/* Project Hub */}
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase3.projectHub}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  {t.phase3.projectHubDesc}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_index_-_v3.svg"
                  alt="Project hub - construction site index v3"
                  caption={t.captions.projectHubV3 as string}
                  captionDesc={t.captions.projectHubV3Desc as string}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Mobile Evolution */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Mobile evolution
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  Construction happens on-site, often in challenging conditions. The mobile experience needed to be robust, fast, and usable with gloves. We redesigned the navigation system for touch-first interaction while maintaining feature parity with desktop.
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/evolution_mobile_menu.svg"
                  alt="Mobile menu evolution"
                  caption={t.captions.mobileNav as string}
                  captionDesc={t.captions.mobileNavDesc as string}
                />
              </div>
            </section>

            {/* Design System Foundation */}
            <section id="design-system" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.designSystem.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.designSystem.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/Design_system.svg"
                  alt="Design system overview"
                  caption={t.designSystem.ds}
                  captionDesc={t.designSystem.dsDesc}
                  className="mb-24 md:mb-32"
                />
              </div>

              <div className="max-w-[740px] mx-auto px-6 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">{t.designSystem.iconSystem}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{t.designSystem.iconSystemDesc}</p>
              </div>
              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/system_-_icons_-_files_and_folders.svg"
                  alt="Icon system - files and folders"
                  caption={t.designSystem.iconSystem}
                />
              </div>
            </section>

            {/* Impact */}
            <section id="impact" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.impact.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.impact.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/toolkit/Diagram_06_-_Impact.svg"
                  alt="Impact diagram"
                  caption={t.impact.projectImpact}
                  captionDesc={t.impact.projectImpactDesc}
                  className="mb-24 md:mb-32"
                />
              </div>

              {/* Key Results - inline metrics */}
              <div className="max-w-[740px] mx-auto px-6">
                <div className="divide-y divide-gray-100">
                  <div className="py-4 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-gray-100">
                    <p className="text-2xl font-semibold text-gray-900">{t.impact.customers}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.impact.customersDesc}</p>
                  </div>
                  <div className="py-4 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-gray-100">
                    <p className="text-2xl font-semibold text-gray-900">{t.impact.seriesA}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.impact.seriesADesc}</p>
                  </div>
                  <div className="py-4 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-gray-100">
                    <p className="text-2xl font-semibold text-gray-900">{t.impact.enterprise}</p>
                    <p className="text-xs text-gray-400 mt-1">{t.impact.enterpriseDesc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="max-w-[740px] mx-auto px-6 py-16 border-t border-gray-100">
              <button
                onClick={onContact}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
              >
                {t.contactVictor}
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom spacing for mobile nav */}
            <div className="h-20 md:h-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolkitPage;
