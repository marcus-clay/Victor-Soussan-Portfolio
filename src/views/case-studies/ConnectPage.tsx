// Connect Case Study Page - Static content with instant loading
// Displays the SQOOL Connect project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  X
} from '@phosphor-icons/react';
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-[border-color,box-shadow,transform] duration-300 ease-out hover:scale-[1.01]">
        {isVideo ? (
          <video src={item.src} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" muted playsInline autoPlay loop preload="metadata" />
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-sm text-gray-500">
        <strong className="text-gray-700">{item.caption}</strong>
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
  // Load gallery items directly in the component
  const galleryItems = getConnectGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // videoRefs reserved for future use
  void useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const isDark = systemTheme === 'dark';

  // Sync caseStudyMode when viewMode changes from outside
  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

  // Scroll to top when mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [caseStudyMode, viewMode]);

  // Open lightbox with specific image and optional start time for videos
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${
        viewMode === 'gallery' ? 'bg-white' : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')
      }`}
    >

      {/* Lightbox Modal - Using EnhancedLightbox */}
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

      {/* Content - Switch between Case Study and Gallery */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Gallery View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full px-6 md:px-10 lg:px-12 py-8 md:py-12"
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
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
      <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
              <div className="md:col-span-3">
                {/* Meta tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.hero.role}
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    -
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.hero.scope}
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    -
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.hero.period}
                  </span>
                </div>

                {/* Main Title */}
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t.hero.title}
                </h1>

                {/* Subtitle */}
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {t.hero.subtitle}
                </h2>

                {/* Description */}
                <p
                  className={`text-base leading-relaxed mb-6 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t.hero.description}
                </p>
              </div>
            </section>

            {/* Hero Image */}
            <figure className="mb-24 md:mb-32">
              <div
                onClick={() => openLightbox('/images/connect/connect_overview.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/connect/connect_overview.webp"
                  alt="SQOOL Connect Overview"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>{t.captions.thumbnail}</strong> - {t.captions.thumbnailDesc}
              </figcaption>
            </figure>

            {/* Overview Section */}
            <section id="overview" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.overview.title}
              </h1>
              <hr
                className={`mb-8 ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              />

              <div className="grid md:grid-cols-3 gap-8">
                {/* Introduction */}
                <div className="md:col-span-2">
                  <h2
                    className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.overview.introTitle}
                  </h2>
                  <p
                    className={`text-base leading-relaxed ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {t.overview.introDesc}
                  </p>
                </div>

                {/* Goals */}
                <div>
                  <h2
                    className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.overview.goalsTitle}
                  </h2>
                  <ul
                    className={`text-base leading-relaxed space-y-2 ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {t.overview.goals.map((goal, idx) => (
                      <li key={idx}>- {goal}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role Section */}
              <div className="mt-8">
                <h2
                  className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t.overview.roleTitle}
                </h2>
                <p
                  className={`text-base leading-relaxed ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t.overview.roleDesc}
                </p>
              </div>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Dashboard Section */}
            <section id="dashboard" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.dashboard.title}
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.dashboard.intro}
              </p>

              {/* Dashboard Home Dark */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp"
                    alt={t.dashboard.homeDark}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.homeDark}</strong> - {t.dashboard.homeDarkDesc}
                </figcaption>
              </figure>

              {/* Dashboard Home Light & Applications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_dashboard_home_light_full-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_dashboard_home_light_full-scaled.webp"
                      alt={t.dashboard.homeLight}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.homeLight}</strong> - {t.dashboard.homeLightDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_dashboard_applications_full-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_dashboard_applications_full-scaled.webp"
                      alt={t.dashboard.applications}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.applications}</strong> - {t.dashboard.applicationsDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Loading & Auth Video */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-loading-user-authent-app-launch-study.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-loading-user-authent-app-launch-study.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.loadingAuth}</strong> - {t.dashboard.loadingAuthDesc}
                </figcaption>
              </figure>

              {/* Complete Dashboard Prototype Video */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.prototype}</strong> - {t.dashboard.prototypeDesc}
                </figcaption>
              </figure>

              {/* Tech Architecture */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/connect/connect_tech_architecture-1-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/connect/connect_tech_architecture-1-scaled.webp"
                    alt={t.dashboard.techArch}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.techArch}</strong> - {t.dashboard.techArchDesc}
                </figcaption>
              </figure>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_specifications_implem_01-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_specifications_implem_01-scaled.webp"
                      alt={t.dashboard.specsImplem}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.specsImplem}</strong> - {t.dashboard.specsImplDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_specifications_content_02-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_specifications_content_02-scaled.webp"
                      alt={t.dashboard.specsContent}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.dashboard.specsContent}</strong> - {t.dashboard.specsContentDesc}
                  </figcaption>
                </figure>
              </div>

              {/* App Loading Choreography */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/connect-specs-app-loading-choregraphy.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/connect-specs-app-loading-choregraphy.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.dashboard.appLoading}</strong> - {t.dashboard.appLoadingDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* La Bulle Section */}
            <section id="bulle" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.bulle.title}
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.bulle.intro}
              </p>

              {/* Bulle Wireframes */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp"
                    alt={t.bulle.wireframes}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.bulle.wireframes}</strong> - {t.bulle.wireframesDesc}
                </figcaption>
              </figure>

              {/* UI Focus & Icons */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_ui_focus-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_bulle_ui_focus-scaled.webp"
                      alt={t.bulle.uiFocus}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.uiFocus}</strong> - {t.bulle.uiFocusDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_icons-1-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_bulle_icons-1-scaled.webp"
                      alt={t.bulle.icons}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.icons}</strong> - {t.bulle.iconsDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Behaviour documentation */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_behaviour_square_01-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_bulle_behaviour_square_01-scaled.webp"
                      alt={t.bulle.behaviour1}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.behaviour1}</strong> - {t.bulle.behaviour1Desc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/connect/connect_bulle_behaviour_square_02-scaled.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/connect/connect_bulle_behaviour_square_02-scaled.webp"
                      alt={t.bulle.behaviour2}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.bulle.behaviour2}</strong> - {t.bulle.behaviour2Desc}
                  </figcaption>
                </figure>
              </div>

              {/* Interaction Demo Video */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/interaction-bulle-connect-compressed.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/interaction-bulle-connect-compressed.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.bulle.interactionDemo}</strong> - {t.bulle.interactionDemoDesc}
                </figcaption>
              </figure>

              {/* Bulle Demo Video */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <video
                    src="/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.bulle.bulleDemo}</strong> - {t.bulle.bulleDemoDesc}
                </figcaption>
              </figure>
            </section>

            {/* Footer CTA */}
            <div className={`text-center py-16 border-t ${systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-medium transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
              >
                {t.contactVictor}
              </button>
            </div>
          </main>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectPage;
