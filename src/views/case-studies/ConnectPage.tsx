// Connect Case Study Page - Minimalist aesthetic
// Displays the SQOOL Connect project case study

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getConnectGalleryItems } from '../../components/BentoGallery';
import ConnectExecutive from '../../components/case-studies/ConnectExecutive';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { CONNECT_TRANSLATIONS } from '../../data/caseStudyTranslations/connectTranslations';

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

export const ConnectPage: React.FC<ConnectPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['connect'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('connect', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const t = CONNECT_TRANSLATIONS[lang];
  const galleryItems = getConnectGalleryItems(lang);

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
  void useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

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
  const MediaFigure = ({ src, alt, caption, captionDesc, type = 'image', className = '' }: {
    src: string; alt: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string;
  }) => (
    <figure className={className}>
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
      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
        {caption}{captionDesc && ` · ${captionDesc}`}
      </figcaption>
    </figure>
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
        ) : caseStudyMode === 'executive' ? (
          /* Executive Summary View */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ConnectExecutive
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
                  {t.hero.role} · {t.hero.scope} · {t.hero.period}
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
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                  {t.hero.description}
                </p>
              </div>
            </section>

            {/* Hero Image */}
            <div className="max-w-[960px] mx-auto px-6">
              <MediaFigure
                src="/images/connect/connect_overview.webp"
                alt="SQOOL Connect Overview"
                caption={t.captions.thumbnail}
                captionDesc={t.captions.thumbnailDesc}
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
                      {t.overview.introDesc}
                    </p>
                  </div>

                  {/* Goals */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {t.overview.goalsTitle}
                    </p>
                    <ul className="space-y-1.5">
                      {t.overview.goals.map((goal, idx) => (
                        <li key={idx} className="text-base text-gray-500 leading-relaxed">
                          <span className="text-gray-300 mr-2">&#8226;</span>{goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Role */}
                <div className="mt-8">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.overview.roleTitle}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {t.overview.roleDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* Dashboard Section */}
            <section id="dashboard" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.dashboard.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.dashboard.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Dashboard Home Dark */}
                <MediaFigure
                  src="/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp"
                  alt={t.dashboard.homeDark}
                  caption={t.dashboard.homeDark}
                  captionDesc={t.dashboard.homeDarkDesc}
                  className="mb-12"
                />

                {/* Dashboard Home Light & Applications */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_dashboard_home_light_full-scaled.webp"
                    alt={t.dashboard.homeLight}
                    caption={t.dashboard.homeLight}
                    captionDesc={t.dashboard.homeLightDesc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_dashboard_applications_full-scaled.webp"
                    alt={t.dashboard.applications}
                    caption={t.dashboard.applications}
                    captionDesc={t.dashboard.applicationsDesc}
                  />
                </div>

                {/* Loading & Auth Video */}
                <MediaFigure
                  src="/videos/connect/connect-loading-user-authent-app-launch-study.mp4"
                  alt={t.dashboard.loadingAuth}
                  caption={t.dashboard.loadingAuth}
                  captionDesc={t.dashboard.loadingAuthDesc}
                  type="video"
                  className="mb-12"
                />

                {/* Complete Dashboard Prototype Video */}
                <MediaFigure
                  src="/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4"
                  alt={t.dashboard.prototype}
                  caption={t.dashboard.prototype}
                  captionDesc={t.dashboard.prototypeDesc}
                  type="video"
                  className="mb-12"
                />

                {/* Tech Architecture */}
                <MediaFigure
                  src="/images/connect/connect_tech_architecture-1-scaled.webp"
                  alt={t.dashboard.techArch}
                  caption={t.dashboard.techArch}
                  captionDesc={t.dashboard.techArchDesc}
                  className="mb-12"
                />

                {/* Specifications */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_specifications_implem_01-scaled.webp"
                    alt={t.dashboard.specsImplem}
                    caption={t.dashboard.specsImplem}
                    captionDesc={t.dashboard.specsImplDesc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_specifications_content_02-scaled.webp"
                    alt={t.dashboard.specsContent}
                    caption={t.dashboard.specsContent}
                    captionDesc={t.dashboard.specsContentDesc}
                  />
                </div>

                {/* App Loading Choreography */}
                <MediaFigure
                  src="/videos/connect/connect-specs-app-loading-choregraphy.mp4"
                  alt={t.dashboard.appLoading}
                  caption={t.dashboard.appLoading}
                  captionDesc={t.dashboard.appLoadingDesc}
                  type="video"
                  className="mb-12"
                />
              </div>
            </section>

            {/* La Bulle Section */}
            <section id="bulle" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.bulle.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.bulle.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Bulle Wireframes */}
                <MediaFigure
                  src="/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp"
                  alt={t.bulle.wireframes}
                  caption={t.bulle.wireframes}
                  captionDesc={t.bulle.wireframesDesc}
                  className="mb-12"
                />

                {/* UI Focus & Icons */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_bulle_ui_focus-scaled.webp"
                    alt={t.bulle.uiFocus}
                    caption={t.bulle.uiFocus}
                    captionDesc={t.bulle.uiFocusDesc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_bulle_icons-1-scaled.webp"
                    alt={t.bulle.icons}
                    caption={t.bulle.icons}
                    captionDesc={t.bulle.iconsDesc}
                  />
                </div>

                {/* Behaviour documentation */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/connect/connect_bulle_behaviour_square_01-scaled.webp"
                    alt={t.bulle.behaviour1}
                    caption={t.bulle.behaviour1}
                    captionDesc={t.bulle.behaviour1Desc}
                  />
                  <MediaFigure
                    src="/images/connect/connect_bulle_behaviour_square_02-scaled.webp"
                    alt={t.bulle.behaviour2}
                    caption={t.bulle.behaviour2}
                    captionDesc={t.bulle.behaviour2Desc}
                  />
                </div>

                {/* Interaction Demo Video */}
                <MediaFigure
                  src="/videos/connect/interaction-bulle-connect-compressed.mp4"
                  alt={t.bulle.interactionDemo}
                  caption={t.bulle.interactionDemo}
                  captionDesc={t.bulle.interactionDemoDesc}
                  type="video"
                  className="mb-12"
                />

                {/* Bulle Demo Video */}
                <MediaFigure
                  src="/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4"
                  alt={t.bulle.bulleDemo}
                  caption={t.bulle.bulleDemo}
                  captionDesc={t.bulle.bulleDemoDesc}
                  type="video"
                  className="mb-12"
                />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectPage;
