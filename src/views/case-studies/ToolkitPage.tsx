// Toolkit Case Study Page - Minimalist aesthetic
// Displays the Toolkit project case study

import React, { useState, useRef, useId } from 'react';
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import { imgDims } from '@/utils/imageDimensions'
import { useStableComponent } from '../../hooks/useStableComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '@/lib/motion'

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock';
import { GalleryItem, getToolkitGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { TOOLKIT_TRANSLATIONS } from '../../data/caseStudyTranslations/toolkitTranslations';
import { zoomable } from '@/utils/zoomable'
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

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
  { src: '/images/thumbnail-toolkit.webp', captionKey: 'hero', type: 'image' },
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
      aria-label={item.caption}
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]" />
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
// BLOCK - one idea: h3 and one short paragraph (each caps its own measure), one visual below, all in the act column
// ============================================================================

const Block: React.FC<{
  id?: string;
  kicker?: string;
  title: string;
  text: string;
  children: React.ReactNode;
}> = ({ id, kicker, title, text, children }) => (
  <div id={id} className="mb-12 md:mb-14 last:mb-0 scroll-mt-24">
    {kicker && <p className="text-micro uppercase tracking-[0.08em] text-gray-500 mb-2">{kicker}</p>}
    <h3 className="text-title-3 text-gray-900 mb-2 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    <div className="mt-6 md:mt-8">{children}</div>
  </div>
);

// Several visuals of one idea, stacked in the act column
const Visuals: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-6 md:space-y-8">{children}</div>
);

// Two visuals side by side from md up (each keeps its own caption)
const Pair: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-start">{children}</div>
);

// ============================================================================
// PHASES WIDGET - Three phases to market fit (strings live in toolkitTranslations).
// Not rendered since the editorial curation (the three phase blocks carry the story);
// kept exported so it can be restored in the phases act.
// ============================================================================

export const ProductEvolutionDiagram: React.FC<{
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
    'min-h-11 text-sm text-gray-600 [@media(hover:hover)]:hover:text-gray-900 transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-lg';

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
                : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900'
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
                      <p className="text-base text-gray-600 leading-relaxed">{phase.description}</p>
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
  const colon = lang === 'fr' ? '\u00a0: ' : ': ';

  // Lightbox captions: "title : description", no dangling separator when there is no description
  const captionSeparator = lang === 'fr' ? ' : ' : ': ';
  // Gallery: the shared list, plus every visual of the page that the narration no longer shows.
  // The gallery is where the full set stays reachable.
  const baseGalleryItems = getToolkitGalleryItems(lang);
  const galleryItems: GalleryItem[] = [
    ...baseGalleryItems,
    ...allImagesData
      .filter(item => item.captionKey !== 'hero' && !baseGalleryItems.some(g => g.src === item.src))
      .map(item => ({
        src: item.src,
        type: item.type,
        caption: t.captions[item.captionKey as keyof typeof t.captions] as string,
        captionDesc: t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] as string | undefined,
      })),
  ];

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
  const reveal = useReveal();

  useScrollTopOnChange(viewMode);

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
    <motion.figure {...reveal(0, priority)}>
      <div
        {...zoomable(() => openLightbox(src))}
        aria-label={caption}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]"
      >
        {type === 'video' ? (
          <VideoPlayer
            src={src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        ) : (
          <img
            src={src}
            alt=""
            width={width ?? imgDims(src).width}
            height={height ?? imgDims(src).height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {caption}{captionDesc && ` · ${captionDesc}`}
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
            className="act-wide py-8 md:py-12"
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
            {/* Hero: same structure for every case study */}
            <CaseStudyHero
              lang={lang}
              projectId="toolkit"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={[
                { label: 'Type', value: t.meta.type },
                { label: lang === 'fr' ? 'Périmètre' : 'Scope', value: t.meta.scope },
                { label: lang === 'fr' ? 'Phase' : 'Phase', value: t.meta.phase },
              ]}
              onZoom={() => openLightbox('/images/thumbnail-toolkit.webp')}
              visualAlt={t.captions.hero as string}
              externalHref="https://toolkit-app.com"
              externalLabel={t.visitToolkit}
            />

            {/* Client testimonial, right under the hero */}
            <div className="act-wide pb-12 md:pb-16">
              {/* The shared block has no measure of its own: cap it here so the quote stays readable */}
              <div className="max-w-[62ch]">
                <CaseStudyTestimonialBlock
                  quote={t.testimonial.quote}
                  author={t.testimonial.author}
                  role={t.testimonial.role}
                  image="pierre-marie-nigay.webp"
                  lang={lang}
                />
              </div>
            </div>

            {/* Summary: context, role, deliverables and sourced numbers */}
            <CaseStudySummary
              lang={lang}
              context={t.overview.introP1}
              role={t.overview.roleDesc}
              deliverables={t.summary.deliverables}
              metrics={[
                { value: t.impact.customers, label: t.impact.customersDesc },
                { value: t.impact.seriesA, label: t.impact.seriesADesc },
                t.summary.enterpriseMetric,
              ]}
            />

            {/* 01 Context: the problem that frames the whole product */}
            <section id="context">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.context.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.contextLead}</p>

                <div className="mt-10 md:mt-12">
                  <Block title={t.context.coreChallenge} text={t.brief.challenge}>
                    <MediaFigure
                      src="/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4"
                      type="video"
                      caption={t.captions.expandLayout as string}
                    />
                  </Block>
                </div>
              </div>
            </section>

            {/* 02 Phases: one block per phase (problem, choice, effect), one proof visual each */}
            <section id="phases">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.context.phasesTitle} />

                <div className="mt-3 md:mt-5">
                  <Block
                    id="phase1"
                    kicker={t.phases[0].duration}
                    title={`${t.phaseUi.phase} ${t.phases[0].id}${colon}${t.phases[0].title}`}
                    text={t.brief.phase1}
                  >
                    <Visuals>
                      <MediaFigure
                        src="/images/toolkit/planning_-_v1.svg"
                        caption={t.captions.planningV1 as string}
                      />
                      <MediaFigure
                        src="/videos/toolkit/video_-_navigation_-_show_hide.mp4"
                        type="video"
                        caption={t.captions.navShowHide as string}
                      />
                    </Visuals>
                  </Block>

                  <Block
                    id="phase2"
                    kicker={t.phases[1].duration}
                    title={`${t.phaseUi.phase} ${t.phases[1].id}${colon}${t.phases[1].title}`}
                    text={t.brief.phase2}
                  >
                    <Visuals>
                      <MediaFigure
                        src="/images/toolkit/planning_-_v2.svg"
                        caption={t.captions.planningV2 as string}
                      />
                      <MediaFigure
                        src="/videos/toolkit/video_-_batch_edition.mp4"
                        type="video"
                        caption={t.captions.batchEdition as string}
                      />
                    </Visuals>
                  </Block>

                  <Block
                    id="phase3"
                    kicker={t.phases[2].duration}
                    title={`${t.phaseUi.phase} ${t.phases[2].id}${colon}${t.phases[2].title}`}
                    text={t.brief.phase3}
                  >
                    <MediaFigure
                      src="/images/toolkit/desktop_-_chantier_-_details_-_v2.svg"
                      caption={t.captions.chantierV2 as string}
                    />
                  </Block>
                </div>
              </div>
            </section>

            {/* 03 Design system: one visual */}
            <section id="design-system">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.designSystem.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.designSystemLead}</p>
                <div className="mt-8 md:mt-10">
                  <MediaFigure
                    src="/images/toolkit/Design_system.svg"
                    caption={t.designSystem.ds}
                  />
                </div>
              </div>
            </section>

            {/* 04 Impact: what shipped, shown in colour (multi-site hub, new mobile version,
                richer planning interactions), closing on the interaction video. The sourced numbers sit in the summary. */}
            <section id="impact">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="04" title={t.impact.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.impactLead}</p>
                <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">
                  <Pair>
                    <MediaFigure
                      src="/images/toolkit/desktop_-_chantier_-_index_-_v3.svg"
                      caption={t.captions.projectHubV3 as string}
                    />
                    <MediaFigure
                      src="/images/toolkit/evolution_mobile_menu.svg"
                      caption={t.captions.mobileNav as string}
                    />
                  </Pair>
                  <MediaFigure
                    src="/videos/toolkit/video_-_task_manipulation.mp4"
                    type="video"
                    caption={t.captions.taskManipulation as string}
                  />
                </div>
              </div>
            </section>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolkitPage;
