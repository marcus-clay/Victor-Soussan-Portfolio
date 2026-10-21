// Toolkit Case Study Page - Minimalist aesthetic
// Displays the Toolkit project case study

import React, { useState, useEffect, useRef, useId } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import { useStableComponent } from '../../hooks/useStableComponent';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock';
import { GalleryItem, getToolkitGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { TOOLKIT_TRANSLATIONS } from '../../data/caseStudyTranslations/toolkitTranslations';
import { zoomable } from '@/utils/zoomable'

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
      aria-label={item.caption}
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {item.caption}
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// ============================================================================
// SUB-SECTION - h3 + description above a media figure, one step of rhythm below
// ============================================================================

const SubSection: React.FC<{
  title?: string;
  desc?: string;
  children: React.ReactNode;
}> = ({ title, desc, children }) => (
  <div className="mb-16 md:mb-20 last:mb-0">
    {title && (
      <div className="max-w-[740px] mx-auto px-6 mb-6">
        <h3 className="text-title-3 text-gray-900 mb-2">{title}</h3>
        {desc && <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">{desc}</p>}
      </div>
    )}
    <div className="max-w-[960px] mx-auto px-6">{children}</div>
  </div>
);

// ============================================================================
// PHASES - Three phases to market fit (strings live in toolkitTranslations)
// ============================================================================

const ProductEvolutionDiagram: React.FC<{
  lang: 'en' | 'fr';
}> = ({ lang }) => {
  const t = TOOLKIT_TRANSLATIONS[lang];
  const phases = t.phases;
  const ui = t.phaseUi;
  const baseId = useId();
  const tabId = (idx: number) => `${baseId}-tab-${idx}`;
  const panelId = `${baseId}-panel`;

  const [activePhase, setActivePhase] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Swipe tracking lives in refs: no re-render per touchmove, and x = 0 stays a valid position
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const colon = lang === 'fr' ? ' : ' : ': ';
  const prevPhase = activePhase > 0 ? phases[activePhase - 1] : null;
  const nextPhase = activePhase < phases.length - 1 ? phases[activePhase + 1] : null;

  const goTo = (idx: number, focus = false) => {
    setActivePhase(idx);
    if (focus) tabRefs.current[idx]?.focus();
  };

  const handleNext = () => {
    setActivePhase(prev => Math.min(prev + 1, phases.length - 1));
  };

  const handlePrev = () => {
    setActivePhase(prev => Math.max(prev - 1, 0));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    touchStartX.current = null;
    touchEndX.current = null;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo((activePhase + 1) % phases.length, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo((activePhase - 1 + phases.length) % phases.length, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(phases.length - 1, true);
    }
  };

  const navButtonClass =
    'min-h-11 text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-lg';

  return (
    <div className="mt-6">
      {/* Phase tabs */}
      <div
        role="tablist"
        aria-label={ui.tablistLabel}
        className="flex gap-1 mb-8"
        onKeyDown={onTabKeyDown}
      >
        {phases.map((phase, idx) => (
          <button
            key={phase.id}
            ref={el => { tabRefs.current[idx] = el; }}
            type="button"
            role="tab"
            id={tabId(idx)}
            aria-selected={idx === activePhase}
            aria-controls={panelId}
            tabIndex={idx === activePhase ? 0 : -1}
            onClick={() => setActivePhase(idx)}
            className={`min-h-11 px-4 rounded-full text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
              idx === activePhase
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {ui.phase} {phase.id}
          </button>
        ))}
      </div>

      <div
        className="relative touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Active phase panel */}
        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(activePhase)}
          tabIndex={0}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-lg"
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
                      <h4 className="text-title-3 text-gray-900 mb-1">{phase.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {ui.phase} {phase.id}
                        <span aria-hidden="true"> · </span>
                        <span className="sr-only">, </span>
                        {phase.duration}
                      </p>
                      <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">{phase.description}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-xs text-gray-500 mb-4">{ui.keyDeliverables}</p>
                      <ul className="divide-y divide-gray-100">
                        {phase.features.map((feature, fIdx) => (
                          <motion.li
                            key={fIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 + fIdx * 0.05, duration: 0.3 }}
                            className="py-2.5 flex items-start gap-2"
                          >
                            <span className="text-gray-300 mt-0.5" aria-hidden="true">&#8226;</span>
                            <span className="text-base text-gray-600 leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation: each button names its destination */}
        <div className="flex items-center justify-between mt-6">
          {prevPhase ? (
            <button type="button" onClick={handlePrev} className={navButtonClass}>
              <ArrowRight size={14} className="rotate-180" aria-hidden="true" />
              <span>{ui.previousPhase}{colon}{prevPhase.title}</span>
            </button>
          ) : <span />}
          {nextPhase ? (
            <button type="button" onClick={handleNext} className={navButtonClass}>
              <span>{ui.nextPhase}{colon}{nextPhase.title}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          ) : <span />}
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
  const t = TOOLKIT_TRANSLATIONS[lang];
  const galleryItems = getToolkitGalleryItems(lang);

  // Lightbox captions: "title : description", no dangling separator when there is no description
  const captionSeparator = lang === 'fr' ? ' : ' : ': ';
  const allImages = allImagesData.map(item => {
    const title = t.captions[item.captionKey as keyof typeof t.captions] as string;
    const desc = t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] as string | undefined;
    return {
      src: item.src,
      type: item.type,
      caption: desc ? `${title}${captionSeparator}${desc}` : title,
    };
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [viewMode]);

  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Reusable media figure (image or video) with a left-aligned figcaption.
  // The wrapper is named by the caption, so the image itself carries an empty alt.
  const MediaFigure = useStableComponent(({ src, caption, captionDesc, type = 'image', priority = false, width, height }: {
    src: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; priority?: boolean; width?: number; height?: number;
  }) => (
    <motion.figure
      initial={priority ? false : { opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        {...zoomable(() => openLightbox(src))}
        aria-label={caption}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
      >
        {type === 'video' ? (
          <VideoPlayer
            src={src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img
            src={src}
            alt=""
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-4 max-w-[65ch] text-xs text-gray-500 leading-relaxed">
        <span className="block font-medium text-gray-600">{caption}</span>
        {captionDesc && <span className="block mt-0.5">{captionDesc}</span>}
      </figcaption>
    </motion.figure>
  ));

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDFDFC]"
    >

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
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
        ) : (
          /* Full Case Study View */
          <div key="caseStudy">
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24">
                {/* Title */}
                <h1 className="text-title-1 text-gray-900 mb-3">
                  {t.hero.title}
                </h1>

                {/* Subtitle: the headline claim, then scope and period as one quiet line */}
                <p className="text-lg text-gray-900 mb-1">{t.hero.subtitle}</p>
                <p className="text-xs text-gray-500 mb-6">
                  {[t.hero.tags, t.hero.zeroToOne, t.meta.period].join(' · ')}
                </p>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-6">
                  {t.hero.description}
                </p>

                {/* Visit Website */}
                <a
                  href="https://toolkit-app.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
                >
                  {t.visitToolkit}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>

              {/* Testimonial */}
              <div className="max-w-[740px] mx-auto px-6">
                <CaseStudyTestimonialBlock
                  quote={t.testimonial.quote}
                  author={t.testimonial.author}
                  role={t.testimonial.role}
                  image="pierre-marie-nigay.webp"
                  lang={lang}
                />
              </div>
            </section>

            {/* Hero Image (LCP): eager, high priority, intrinsic size known */}
            <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <MediaFigure
                src="/images/toolkit/hero.webp"
                caption={t.captions.hero as string}
                captionDesc={t.captions.heroDesc as string}
                priority
                width={2200}
                height={1467}
              />
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.overview.title}
                </h2>

                <div className="space-y-8">
                  {/* Introduction */}
                  <div>
                    <h3 className="text-title-3 text-gray-900 mb-2">
                      {t.overview.introTitle}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {t.overview.introP1}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mt-3">
                      {t.overview.introP2}
                    </p>
                  </div>

                  {/* My Role */}
                  <div>
                    <h3 className="text-title-3 text-gray-900 mb-2">
                      {t.overview.roleTitle}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {t.overview.roleDesc}
                    </p>
                  </div>

                  {/* Project and Impact */}
                  <div>
                    <h3 className="text-title-3 text-gray-900 mb-2">
                      {t.overview.projectTitle}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {t.overview.projectP1}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mt-3">
                      {t.overview.projectP2}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Context and Approach Section: problem and research first, then the three phases */}
            <section id="context" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-12">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.context.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                  {t.context.intro}
                </p>
              </div>

              {/* Diagram 01 - Core Challenge */}
              <SubSection title={t.context.coreChallenge} desc={t.context.coreChallengeDesc}>
                <MediaFigure
                  src="/images/toolkit/Diagram_01_-_Problem.svg"
                  caption={t.context.coreChallenge}
                />
              </SubSection>

              {/* Diagram 02 - Research */}
              <SubSection title={t.context.research} desc={t.context.researchDesc}>
                <MediaFigure
                  src="/images/toolkit/Diagram_02_-_Research.svg"
                  caption={t.context.research}
                />
              </SubSection>

              {/* Three phases interactive */}
              <div className="max-w-[740px] mx-auto px-6 mb-16 md:mb-20">
                <h3 className="text-title-3 text-gray-900">{t.context.phasesTitle}</h3>
                <ProductEvolutionDiagram lang={lang} />
              </div>

              {/* Diagram 03 - Foundation */}
              <SubSection title={t.context.foundation} desc={t.context.foundationDesc}>
                <MediaFigure
                  src="/images/toolkit/Diagram_03_-_Foundation.svg"
                  caption={t.context.foundation}
                />
              </SubSection>

              {/* Diagram 04 - Creation Workflow */}
              <SubSection title={t.context.creationWorkflow} desc={t.context.creationWorkflowDesc}>
                <MediaFigure
                  src="/images/toolkit/Diagram_04_-_Project_creation_workflow.svg"
                  caption={t.context.creationWorkflow}
                />
              </SubSection>

              {/* Diagram 05 - Interaction Principles */}
              <SubSection title={t.context.interactionPrinciples} desc={t.context.interactionPrinciplesDesc}>
                <MediaFigure
                  src="/images/toolkit/Diagram_05_-_Core_interaction_principles.svg"
                  caption={t.context.interactionPrinciples}
                />
              </SubSection>
            </section>

            {/* Phase 1 - Foundation */}
            <section id="phase1" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-12">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.phase1.title}
                </h2>

                <h3 className="text-title-3 text-gray-900">
                  {t.phase1.firstTimeExp}
                </h3>
              </div>

              {/* Passwordless authentication */}
              <SubSection title={t.captions.passwordlessAuth} desc={t.captions.passwordlessAuthDesc}>
                <MediaFigure
                  src="/images/toolkit/authentication_-_magic_link.svg"
                  caption={t.captions.passwordlessAuth as string}
                />
              </SubSection>

              {/* Empty state */}
              <SubSection title={t.captions.emptyState} desc={t.captions.emptyStateDesc}>
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_create_-_empty.svg"
                  caption={t.captions.emptyState as string}
                />
              </SubSection>

              {/* Form design pattern */}
              <SubSection title={t.captions.formPattern} desc={t.captions.formPatternDesc}>
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_create_-_modal.svg"
                  caption={t.captions.formPattern as string}
                />
              </SubSection>

              {/* Chantier Detail v1 */}
              <SubSection title={t.captions.chantierV1} desc={t.captions.chantierV1Desc}>
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_details_-_v1.svg"
                  caption={t.captions.chantierV1 as string}
                />
              </SubSection>

              {/* Chantier Detail v2 */}
              <SubSection title={t.captions.chantierV2} desc={t.captions.chantierV2Desc}>
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_details_-_v2.svg"
                  caption={t.captions.chantierV2 as string}
                />
              </SubSection>

              {/* Show and Hide navigation */}
              <SubSection title={t.phase1.showHideNav} desc={t.phase1.showHideNavDesc}>
                <MediaFigure
                  type="video"
                  src="/videos/toolkit/video_-_navigation_-_show_hide.mp4"
                  caption={t.captions.navShowHide as string}
                  captionDesc={t.captions.navShowHideDesc as string}
                />
              </SubSection>

              {/* Tasks */}
              <SubSection title={t.phase1.tasks} desc={t.phase1.tasksDesc}>
                <MediaFigure
                  src="/images/toolkit/daktop_-_site_setup_-_tasks_list.svg"
                  caption={t.captions.taskCreation as string}
                  captionDesc={t.captions.taskCreationDesc as string}
                />
              </SubSection>

              {/* Sequences */}
              <SubSection title={t.phase1.sequences} desc={t.phase1.sequencesDesc}>
                <MediaFigure
                  src="/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg"
                  caption={t.captions.taskSequences as string}
                  captionDesc={t.captions.taskSequencesDesc as string}
                />
              </SubSection>

              {/* Planning */}
              <SubSection title={t.phase1.planning} desc={t.phase1.planningDesc}>
                <MediaFigure
                  src="/images/toolkit/planning_-_v1.svg"
                  caption={t.captions.planningV1 as string}
                  captionDesc={t.captions.planningV1Desc as string}
                />
              </SubSection>

              {/* Task component v1 */}
              <SubSection title={t.captions.taskComponentV1} desc={t.captions.taskComponentV1Desc}>
                <MediaFigure
                  src="/images/toolkit/Component_Task_v1.svg"
                  caption={t.captions.taskComponentV1 as string}
                />
              </SubSection>

              {/* Task component v2 */}
              <SubSection title={t.captions.taskComponentV2} desc={t.captions.taskComponentV2Desc}>
                <MediaFigure
                  src="/images/toolkit/Component_Task_v2.svg"
                  caption={t.captions.taskComponentV2 as string}
                />
              </SubSection>

              {/* Planning v2 */}
              <SubSection title={t.captions.planningV2} desc={t.captions.planningV2Desc}>
                <MediaFigure
                  src="/images/toolkit/planning_-_v2.svg"
                  caption={t.captions.planningV2 as string}
                />
              </SubSection>

              {/* Multi-select */}
              <SubSection title={t.captions.multiSelect} desc={t.captions.multiSelectDesc}>
                <MediaFigure
                  src="/images/toolkit/planning_-_mouse_-_selection_rectangle.svg"
                  caption={t.captions.multiSelect as string}
                />
              </SubSection>

              {/* Context menu */}
              <SubSection title={t.captions.contextMenu} desc={t.captions.contextMenuDesc}>
                <MediaFigure
                  src="/images/toolkit/planning_-_mouse_-_right_click.svg"
                  caption={t.captions.contextMenu as string}
                />
              </SubSection>

              {/* Adaptive zoom */}
              <SubSection title={t.captions.adaptiveZoom} desc={t.captions.adaptiveZoomDesc}>
                <MediaFigure
                  src="/images/toolkit/planning_-_selection_tache_dynamic_menu.svg"
                  caption={t.captions.adaptiveZoom as string}
                />
              </SubSection>

              {/* Expand layout */}
              <SubSection title={t.phase1.expandLayout} desc={t.phase1.expandLayoutDesc}>
                <MediaFigure
                  type="video"
                  src="/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4"
                  caption={t.captions.expandLayout as string}
                  captionDesc={t.captions.expandLayoutDesc as string}
                />
              </SubSection>
            </section>

            {/* Phase 2 - Feature expansion */}
            <section id="phase2" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-12">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.phase2.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                  {t.phase2.intro}
                </p>
              </div>

              {/* Dynamic Menu */}
              <SubSection title={t.phase2.dynamicMenu} desc={t.phase2.dynamicMenuDesc}>
                <MediaFigure
                  src="/images/toolkit/dynamic_island_menu_-_modifier_tache.svg"
                  caption={t.captions.dynamicIsland as string}
                  captionDesc={t.captions.dynamicIslandDesc as string}
                />
              </SubSection>

              {/* Task manipulation video */}
              <SubSection title={t.phase2.taskManipulation} desc={t.phase2.taskManipulationDesc}>
                <MediaFigure
                  type="video"
                  src="/videos/toolkit/video_-_task_manipulation.mp4"
                  caption={t.captions.taskManipulation as string}
                  captionDesc={t.captions.taskManipulationDesc as string}
                />
              </SubSection>

              {/* Batch edition video */}
              <SubSection title={t.phase2.batchEdition} desc={t.phase2.batchEditionDesc}>
                <MediaFigure
                  type="video"
                  src="/videos/toolkit/video_-_batch_edition.mp4"
                  caption={t.captions.batchEdition as string}
                  captionDesc={t.captions.batchEditionDesc as string}
                />
              </SubSection>

              {/* Interface System */}
              <SubSection title={t.captions.interfaceSystem} desc={t.captions.interfaceSystemDesc}>
                <MediaFigure
                  src="/images/toolkit/dynamic_menu_-_components_and_interface_system.svg"
                  caption={t.captions.interfaceSystem as string}
                />
              </SubSection>

              {/* Activity Section */}
              <SubSection title={t.captions.activitySection} desc={t.captions.activitySectionDesc}>
                <MediaFigure
                  src="/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg"
                  caption={t.captions.activitySection as string}
                />
              </SubSection>
            </section>

            {/* Phase 3 - Platform maturity */}
            <section id="phase3" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-12">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.phase3.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                  {t.phase3.intro}
                </p>
              </div>

              {/* Project Hub */}
              <SubSection title={t.phase3.projectHub} desc={t.phase3.projectHubDesc}>
                <MediaFigure
                  src="/images/toolkit/desktop_-_chantier_-_index_-_v3.svg"
                  caption={t.captions.projectHubV3 as string}
                  captionDesc={t.captions.projectHubV3Desc as string}
                />
              </SubSection>

              {/* Mobile Evolution */}
              <SubSection title={t.phase3.mobileEvolution} desc={t.phase3.mobileEvolutionDesc}>
                <MediaFigure
                  src="/images/toolkit/evolution_mobile_menu.svg"
                  caption={t.captions.mobileNav as string}
                  captionDesc={t.captions.mobileNavDesc as string}
                />
              </SubSection>
            </section>

            {/* Design System Foundation */}
            <section id="design-system" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-12">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.designSystem.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                  {t.designSystem.intro}
                </p>
              </div>

              <SubSection>
                <MediaFigure
                  src="/images/toolkit/Design_system.svg"
                  caption={t.designSystem.ds}
                  captionDesc={t.designSystem.dsDesc}
                />
              </SubSection>

              <SubSection title={t.designSystem.iconSystem} desc={t.designSystem.iconSystemDesc}>
                <MediaFigure
                  src="/images/toolkit/system_-_icons_-_files_and_folders.svg"
                  caption={t.designSystem.iconSystem}
                />
              </SubSection>
            </section>

            {/* Impact */}
            <section id="impact" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-12">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.impact.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                  {t.impact.intro}
                </p>
              </div>

              <SubSection>
                <MediaFigure
                  src="/images/toolkit/Diagram_06_-_Impact.svg"
                  caption={t.impact.projectImpact}
                  captionDesc={t.impact.projectImpactDesc}
                />
              </SubSection>

              {/* Key Results - inline metrics (not interactive, no hover) */}
              <div className="max-w-[740px] mx-auto px-6">
                <div className="divide-y divide-gray-100">
                  <div className="py-4">
                    <p className="text-title-1 text-gray-900">{t.impact.customers}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.impact.customersDesc}</p>
                  </div>
                  <div className="py-4">
                    <p className="text-title-1 text-gray-900">{t.impact.seriesA}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.impact.seriesADesc}</p>
                  </div>
                  <div className="py-4">
                    <p className="text-title-1 text-gray-900">{t.impact.enterprise}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.impact.enterpriseDesc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="max-w-[740px] mx-auto px-6 py-16 border-t border-gray-100">
              <button
                onClick={onContact}
                className="min-h-11 text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
              >
                {t.contactVictor}
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Bottom spacing for mobile nav */}
            <div className="h-20 md:h-0" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolkitPage;
