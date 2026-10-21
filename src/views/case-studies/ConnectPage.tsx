// Connect Case Study Page
// Order: hero, summary, then the narration as numbered acts (approach, product)

import React, { useState } from 'react';
import Link from 'next/link';
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import { imgDims } from '@/utils/imageDimensions'
import { useStableComponent } from '../../hooks/useStableComponent';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getConnectGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { CONNECT_TRANSLATIONS } from '../../data/caseStudyTranslations/connectTranslations';
import { zoomable } from '@/utils/zoomable'
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

interface ConnectPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

// All images for lightbox navigation with caption keys
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/connect/connect_overview.webp', captionKey: 'thumbnail', type: 'image' },
  { src: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp', captionKey: 'homeDark', type: 'image' },
  { src: '/images/connect/connect_dashboard_home_light_full-scaled.webp', captionKey: 'homeLight', type: 'image' },
  { src: '/images/connect/connect_dashboard_applications_full-scaled.webp', captionKey: 'applications', type: 'image' },
  { src: '/videos/connect/connect-loading-user-authent-app-launch-study.mp4', captionKey: 'loadingAuth', type: 'video' },
  { src: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4', captionKey: 'prototype', type: 'video' },
  { src: '/videos/connect/connect-design-sprint-compressed.mp4', captionKey: 'designSprint', type: 'video' },
  { src: '/images/connect/connect_tech_architecture-1-scaled.webp', captionKey: 'techArch', type: 'image' },
  { src: '/images/connect/connect_specifications_implem_01-scaled.webp', captionKey: 'specsImplem', type: 'image' },
  { src: '/images/connect/connect_specifications_content_02-scaled.webp', captionKey: 'specsContent', type: 'image' },
  { src: '/videos/connect/connect-specs-app-loading-choregraphy.mp4', captionKey: 'appLoading', type: 'video' },
  { src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp', captionKey: 'wireframes', type: 'image' },
  { src: '/images/connect/connect_bulle_ui_focus-scaled.webp', captionKey: 'uiFocus', type: 'image' },
  { src: '/images/connect/connect_bulle_icons-1-scaled.webp', captionKey: 'icons', type: 'image' },
  { src: '/images/connect/connect_bulle_behaviour_square_01-scaled.webp', captionKey: 'behaviour1', type: 'image' },
  { src: '/images/connect/connect_bulle_behaviour_square_02-scaled.webp', captionKey: 'behaviour2', type: 'image' },
  { src: '/videos/connect/interaction-bulle-connect-compressed.mp4', captionKey: 'interactionDemo', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4', captionKey: 'bulleDemo', type: 'video' },
  { src: '/images/connect/connect_design_system.webp', captionKey: 'designSystem', type: 'image' },
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
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer src={item.src} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]" />
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

// One idea: h3 and one short paragraph (each caps its own measure), one visual below, all in the act column
const Block: React.FC<{ id?: string; title: string; text: string; children: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="mb-12 md:mb-14 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-2 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    <div className="mt-6 md:mt-8">{children}</div>
  </div>
);

// Several visuals of one idea, stacked in the act column
const Visuals: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-6 md:space-y-8">{children}</div>
);

export const ConnectPage: React.FC<ConnectPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = CONNECT_TRANSLATIONS[lang];
  const galleryItems = getConnectGalleryItems(lang);

  // Build allImages with translated captions
  // French needs a no-break space before the colon.
  const captionSeparator = lang === 'fr' ? ' : ' : ': ';
  const allImages = allImagesData.map(item => {
    const title = t.captions[item.captionKey as keyof typeof t.captions];
    const desc = t.captions[`${item.captionKey}Desc` as keyof typeof t.captions];
    return {
      src: item.src,
      type: item.type,
      caption: desc ? `${title}${captionSeparator}${desc}` : title,
    };
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);

  useScrollTopOnChange(viewMode);

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
  // The figcaption describes the media, so the image alt stays empty and the
  // zoom button takes its accessible name from the caption.
  const MediaFigure = useStableComponent(({ src, caption, captionDesc, type = 'image', className = '' }: {
    src: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string;
  }) => (
    <figure className={className}>
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
          <img loading="lazy" src={src} {...imgDims(src)} alt=""
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-3 text-left text-xs text-gray-500 leading-relaxed">
        {caption}{captionDesc && ` · ${captionDesc}`}
      </figcaption>
    </figure>
  ));

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

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
        projectId="connect"
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
            {/* Hero: same structure for every case study. Its intro is the executive summary. */}
            <CaseStudyHero
              lang={lang}
              projectId="connect"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={[
                { label: t.metaLabels.role, value: t.hero.role },
                { label: t.metaLabels.scope, value: t.hero.scope },
                { label: t.metaLabels.company, value: t.meta.company },
              ]}
              visualAlt={t.captions.thumbnail}
            />

            {/* Summary: context, role, deliverables. No client testimonial on this page, and no sourced result numbers (the outcome is qualitative). */}
            <CaseStudySummary
              lang={lang}
              context={t.summary.context}
              role={t.summary.role}
              roleItems={t.summary.roleItems}
              deliverables={t.summary.deliverables}
            />

            {/* 01 Dashboard: the main decision, then how it fits the existing Android stack */}
            <section id="dashboard">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.dashboard.title} />

                <div className="mt-3 md:mt-5">
                  <Block id="product-dashboard" title={t.brief.dashboardBlock} text={t.brief.dashboard}>
                    <Visuals>
                      <MediaFigure
                        src="/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp"
                        caption={t.captions.homeDark}
                      />
                      <MediaFigure
                        src="/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4"
                        type="video"
                        caption={t.captions.prototype}
                      />
                    </Visuals>
                  </Block>

                  <Block id="architecture" title={t.architecture.title} text={t.brief.architecture}>
                    <Visuals>
                      <MediaFigure
                        src="/images/connect/connect_tech_architecture-1-scaled.webp"
                        caption={t.captions.techArch}
                      />
                      <MediaFigure
                        src="/images/connect/connect_specifications_implem_01-scaled.webp"
                        caption={t.captions.specsImplem}
                      />
                    </Visuals>
                  </Block>
                </div>
              </div>
            </section>

            {/* 02 La Bulle: one demonstration */}
            <section id="bulle">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.bulle.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.bulleLead}</p>

                {/* Bulle demo: dark stage inside the column (never full bleed).
                    Silent autoplay (the movement is the content) with the shared pause control.
                    Opens the shared lightbox like every other visual of the page. */}
                <figure className="mt-8 md:mt-10 rounded-2xl bg-[#111113] p-4 md:p-8">
                  <div
                    {...zoomable(() => openLightbox('/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4'))}
                    aria-label={t.captions.bulleDemo}
                    className="group rounded-xl overflow-hidden cursor-zoom-in transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <VideoPlayer
                      src="/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4"
                      className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:[@media(hover:hover)]:group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-4 text-left text-xs text-white/60 leading-relaxed">
                    {t.captions.bulleDemo}
                  </figcaption>
                </figure>

                {/* Quiet way to the full gallery */}
                <div className="mt-10 md:mt-12">
                  <Link
                    href={`/${lang}/project/connect/gallery`}
                    className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    {t.acts.viewAll}
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

export default ConnectPage;
