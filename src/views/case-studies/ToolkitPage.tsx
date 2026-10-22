// Toolkit Case Study Page - Minimalist aesthetic
// Displays the Toolkit project case study

import React, { useState, useRef } from 'react';
import Link from 'next/link';
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
  { src: '/videos/toolkit/video_-_navigation_-_show_hide-fit.mp4', captionKey: 'navShowHide', type: 'video' },
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
// BLOCK - one idea: an h3, one or two short paragraphs in the reading column, then its visuals,
// full width of the act column (never a thumbnail in the middle of the text)
// ============================================================================

const Block: React.FC<{
  id?: string;
  title: string;
  text: string | string[];
  children?: React.ReactNode;
}> = ({ id, title, text, children }) => (
  <div id={id} className="mb-14 md:mb-16 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <div className="max-w-[62ch] text-base text-gray-600 [&>p+p]:mt-4">
      {(Array.isArray(text) ? text : [text]).map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
    {children && <div className="mt-6 md:mt-8">{children}</div>}
  </div>
);

// Several visuals of one idea, stacked at the full width of the act column
const Visuals: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-6 md:space-y-8">{children}</div>
);

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
            {/* Hero: same structure for every case study. The intro is the executive summary. */}
            <CaseStudyHero
              lang={lang}
              projectId="toolkit"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={t.heroMeta}
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
              context={t.summary.context}
              role={t.summary.role}
              deliverables={t.summary.deliverables}
              metrics={[
                { value: t.impact.customers, label: t.impact.customersDesc },
                { value: t.impact.seriesA, label: t.impact.seriesADesc },
                t.summary.enterpriseMetric,
              ]}
            />

            {/* 01 Challenge and objectives: why a dense planning is the whole problem */}
            <section id="context">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.story.a1Title} />
                <div className="mt-4 md:mt-6">
                  <Block id="challenge" title={t.story.challengeTitle} text={t.story.challenge}>
                    <MediaFigure
                      src="/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4"
                      type="video"
                      caption={t.captions.expandLayout as string}
                      captionDesc={t.captions.expandLayoutDesc as string}
                    />
                  </Block>
                  <Block id="objectives" title={t.story.goalsTitle} text={t.story.goals} />
                </div>
              </div>
            </section>

            {/* 02 Design approach: three stages, each with its decisions, its reason and its proof */}
            <section id="phases">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.story.a2Title} />
                <p className="max-w-[62ch] text-base text-gray-600 mb-10 md:mb-12">{t.story.a2Lead}</p>

                <Block id="phase1" title={t.story.s1Title} text={t.story.s1}>
                  <Visuals>
                    <MediaFigure
                      src="/images/toolkit/planning_-_v1.svg"
                      caption={t.captions.planningV1 as string}
                      captionDesc={t.captions.planningV1Desc as string}
                    />
                    <MediaFigure
                      src="/videos/toolkit/video_-_navigation_-_show_hide-fit.mp4"
                      type="video"
                      caption={t.captions.navShowHide as string}
                      captionDesc={t.captions.navShowHideDesc as string}
                    />
                  </Visuals>
                </Block>

                <Block id="phase2" title={t.story.s2Title} text={t.story.s2}>
                  <Visuals>
                    <MediaFigure
                      src="/images/toolkit/planning_-_v2.svg"
                      caption={t.captions.planningV2 as string}
                      captionDesc={t.captions.planningV2Desc as string}
                    />
                    <MediaFigure
                      src="/videos/toolkit/video_-_batch_edition.mp4"
                      type="video"
                      caption={t.captions.batchEdition as string}
                      captionDesc={t.captions.batchEditionDesc as string}
                    />
                  </Visuals>
                </Block>

                <Block id="phase3" title={t.story.s3Title} text={t.story.s3}>
                  <Visuals>
                    <MediaFigure
                      src="/images/toolkit/desktop_-_chantier_-_index_-_v3.svg"
                      caption={t.captions.projectHubV3 as string}
                      captionDesc={t.captions.projectHubV3Desc as string}
                    />
                    <MediaFigure
                      src="/images/toolkit/evolution_mobile_menu.svg"
                      caption={t.captions.mobileNav as string}
                      captionDesc={t.captions.mobileNavDesc as string}
                    />
                  </Visuals>
                </Block>
              </div>
            </section>

            {/* 03 Design system: a deliverable that let three people ship fast */}
            <section id="design-system">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.story.a3Title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.story.a3}</p>
                <div className="mt-8 md:mt-10">
                  <MediaFigure
                    src="/images/toolkit/Design_system.svg"
                    caption={t.captions.designSystem as string}
                    captionDesc={t.captions.designSystemDesc as string}
                  />
                </div>
              </div>
            </section>

            {/* 04 Result and what stays open. The sourced numbers sit in the summary. */}
            <section id="impact">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="04" title={t.story.a4Title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.story.result}</p>
                <div className="mt-8 md:mt-10">
                  <MediaFigure
                    src="/videos/toolkit/video_-_task_manipulation.mp4"
                    type="video"
                    caption={t.captions.taskManipulation as string}
                    captionDesc={t.captions.taskManipulationDesc as string}
                  />
                </div>

                <div className="mt-12 md:mt-14">
                  <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.story.openTitle}</h3>
                  <p className="max-w-[62ch] text-base text-gray-600">{t.story.open}</p>
                </div>

                {/* The full set of visuals stays reachable */}
                <div className="mt-10">
                  <Link
                    href={`/${lang}/project/toolkit/gallery`}
                    className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    {t.story.viewAll}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
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
