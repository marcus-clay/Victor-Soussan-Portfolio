// Connect Case Study Page - Minimalist aesthetic
// Displays the SQOOL Connect project case study

import React, { useState, useEffect } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import { useStableComponent } from '../../hooks/useStableComponent';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getConnectGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { CONNECT_TRANSLATIONS } from '../../data/caseStudyTranslations/connectTranslations';
import { zoomable } from '@/utils/zoomable'

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
      onClick={onClick}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer src={item.src} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
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

export const ConnectPage: React.FC<ConnectPageProps> = ({
  viewMode,
  lang = 'en',
  onContact,
}) => {
  const t = CONNECT_TRANSLATIONS[lang];
  const galleryItems = getConnectGalleryItems(lang);

  // Build allImages with translated captions
  // French needs a no-break space before the colon.
  const captionSeparator = lang === 'fr' ? '\u00a0: ' : ': ';
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [viewMode]);

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
  const MediaFigure = useStableComponent(({ src, caption, captionDesc, type = 'image', className = '', priority = false }: {
    src: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string; priority?: boolean;
  }) => (
    <figure className={className}>
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
          <img loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} src={src} {...imgDims(src)} alt=""
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
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
              <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24 mb-12 md:mb-16">
                {/* Title */}
                <h1 className="text-title-1 text-gray-900 mb-3">
                  {t.hero.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 mb-2">
                  {t.hero.subtitle}
                </p>

                {/* Role, scope, period */}
                <p className="text-xs text-gray-500 mb-6">
                  {t.hero.role}<span aria-hidden="true"> · </span>{t.hero.scope}<span aria-hidden="true"> · </span>{t.hero.period}
                </p>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                  {t.hero.description}
                </p>
              </div>

              {/* Hero Image (LCP: loaded eagerly) */}
              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/connect/connect_overview.webp"
                  caption={t.captions.thumbnail}
                  captionDesc={t.captions.thumbnailDesc}
                  priority
                />
              </div>
            </section>

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
                      {t.overview.introDesc}
                    </p>
                  </div>

                  {/* Goals */}
                  <div>
                    <h3 className="text-title-3 text-gray-900 mb-2">
                      {t.overview.goalsTitle}
                    </h3>
                    <ul className="space-y-1.5">
                      {t.overview.goals.map((goal, idx) => (
                        <li key={idx} className="text-base text-gray-600 leading-relaxed">
                          <span className="text-gray-300 mr-2">&#8226;</span>{goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Role */}
                <div className="mt-8">
                  <h3 className="text-title-3 text-gray-900 mb-2">
                    {t.overview.roleTitle}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                    {t.overview.roleDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* Dashboard Section */}
            <section id="dashboard" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.dashboard.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-12">
                  {t.dashboard.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Dashboard Home Dark */}
                <MediaFigure
                  src="/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp"
                  caption={t.dashboard.homeDark}
                  captionDesc={t.dashboard.homeDarkDesc}
                  className="mb-12"
                />

                {/* Dashboard Home Light & Applications */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_dashboard_home_light_full-scaled.webp"
                    caption={t.dashboard.homeLight}
                    captionDesc={t.dashboard.homeLightDesc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_dashboard_applications_full-scaled.webp"
                    caption={t.dashboard.applications}
                    captionDesc={t.dashboard.applicationsDesc}
                  />
                </div>

                {/* Loading & Auth Video */}
                <MediaFigure
                  src="/videos/connect/connect-loading-user-authent-app-launch-study.mp4"
                  caption={t.dashboard.loadingAuth}
                  captionDesc={t.dashboard.loadingAuthDesc}
                  type="video"
                  className="mb-12"
                />

                {/* Complete Dashboard Prototype Video */}
                <MediaFigure
                  src="/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4"
                  caption={t.dashboard.prototype}
                  captionDesc={t.dashboard.prototypeDesc}
                  type="video"
                />
              </div>
            </section>

            {/* Architecture and specs Section */}
            <section id="architecture" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-title-2 text-gray-900 mb-8">
                  {t.architecture.title}
                </h2>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Tech Architecture */}
                <MediaFigure
                  src="/images/connect/connect_tech_architecture-1-scaled.webp"
                  caption={t.dashboard.techArch}
                  captionDesc={t.dashboard.techArchDesc}
                  className="mb-12"
                />

                {/* Specifications */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_specifications_implem_01-scaled.webp"
                    caption={t.dashboard.specsImplem}
                    captionDesc={t.dashboard.specsImplDesc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_specifications_content_02-scaled.webp"
                    caption={t.dashboard.specsContent}
                    captionDesc={t.dashboard.specsContentDesc}
                  />
                </div>

                {/* App Loading Choreography */}
                <MediaFigure
                  src="/videos/connect/connect-specs-app-loading-choregraphy.mp4"
                  caption={t.dashboard.appLoading}
                  captionDesc={t.dashboard.appLoadingDesc}
                  type="video"
                />
              </div>
            </section>

            {/* La Bulle Section */}
            <section id="bulle" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-title-2 text-gray-900 mb-4">
                  {t.bulle.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-12">
                  {t.bulle.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Bulle Wireframes */}
                <MediaFigure
                  src="/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp"
                  caption={t.bulle.wireframes}
                  captionDesc={t.bulle.wireframesDesc}
                  className="mb-12"
                />

                {/* UI Focus & Icons */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_bulle_ui_focus-scaled.webp"
                    caption={t.bulle.uiFocus}
                    captionDesc={t.bulle.uiFocusDesc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_bulle_icons-1-scaled.webp"
                    caption={t.bulle.icons}
                    captionDesc={t.bulle.iconsDesc}
                  />
                </div>

                {/* Behaviour documentation */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_bulle_behaviour_square_01-scaled.webp"
                    caption={t.bulle.behaviour1}
                    captionDesc={t.bulle.behaviour1Desc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_bulle_behaviour_square_02-scaled.webp"
                    caption={t.bulle.behaviour2}
                    captionDesc={t.bulle.behaviour2Desc}
                  />
                </div>

                {/* Interaction Demo Video */}
                <MediaFigure
                  src="/videos/connect/interaction-bulle-connect-compressed.mp4"
                  caption={t.bulle.interactionDemo}
                  captionDesc={t.bulle.interactionDemoDesc}
                  type="video"
                />
              </div>

              {/* Bulle demo: dark stage, editorial break.
                  Silent autoplay (the movement is the content) with the shared pause control.
                  No lightbox and no hover zoom: it is a demonstration, not a gallery artifact. */}
              <div className="mt-16 md:mt-20 bg-[#111113] py-16 md:py-20">
                <figure className="max-w-[840px] mx-auto px-6">
                  <div className="rounded-2xl overflow-hidden">
                    <VideoPlayer
                      src="/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4"
                      className="w-full h-auto block"
                    />
                  </div>
                  {t.bulle.bulleDemoDesc && (
                    <figcaption className="mt-5 text-left text-xs text-white/60 leading-relaxed max-w-[60ch]">
                      {t.bulle.bulleDemoDesc}
                    </figcaption>
                  )}
                </figure>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="max-w-[740px] mx-auto px-6 pb-16">
              <div className="pt-8 border-t border-gray-100">
                <button
                  onClick={onContact}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  {t.contactVictor}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectPage;
