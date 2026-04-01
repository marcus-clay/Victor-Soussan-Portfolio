// Dailymotion Case Study Page - Minimalist aesthetic
// Displays the Dailymotion project case study

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getDailymotionGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import DailymotionExecutive from '../../components/case-studies/DailymotionExecutive';

import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { DAILYMOTION_TRANSLATIONS } from '../../data/caseStudyTranslations/dailymotionTranslations';

interface DailymotionPageProps {
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
  { src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_upload_2x.webp', captionKey: 'videoManagement', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_livestream_2x.webp', captionKey: 'liveDashboard', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_player_template_2x.webp', captionKey: 'playerManager', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_upload2x.webp', captionKey: 'batchUpload', type: 'image' },
  { src: '/videos/dailymotion/video_-_cancel_upload.mp4', captionKey: 'cancelUpload', type: 'video' },
  { src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4', captionKey: 'thumbnailUpdate', type: 'video' },
  { src: '/videos/dailymotion/video_add_subtitle.mp4', captionKey: 'addSubtitles', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_video_manager.svg', captionKey: 'videoLibrary', type: 'image' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', captionKey: 'embedCode', type: 'video' },
  { src: '/videos/dailymotion/switch_12-24.mp4', captionKey: 'timePicker', type: 'video' },
  { src: '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4', captionKey: 'passwordProtection', type: 'video' },
  { src: '/videos/dailymotion/Geoblocking.mp4', captionKey: 'geoblocking', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_share_expanded2x.webp', captionKey: 'shareModal', type: 'image' },
  { src: '/images/dailymotion/Share_-_keyboard_input2x.webp', captionKey: 'keyboardMapping', type: 'image' },
  { src: '/images/dailymotion/image.webp', captionKey: 'startTimeInput', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp', captionKey: 'addToPlaylist', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_live_-_countdown2x.webp', captionKey: 'preBroadcast', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_livestream2x.webp', captionKey: 'liveMonitor', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_create_player2x.webp', captionKey: 'playerConfigurator', type: 'image' },
  { src: '/images/dailymotion/design_system_-_Styles2x.webp', captionKey: 'uiKitStyles', type: 'image' },
  { src: '/images/dailymotion/design_system_-_component_library2x.webp', captionKey: 'uiKitComponents', type: 'image' },
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

export const DailymotionPage: React.FC<DailymotionPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['dailymotion'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('dailymotion', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const t = DAILYMOTION_TRANSLATIONS[lang];
  const galleryItems = getDailymotionGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

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
  const MediaFigure = ({ src, alt, caption, captionDesc, type = 'image', className = '', videoRefKey }: {
    src: string; alt: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string; videoRefKey?: string;
  }) => (
    <figure className={className}>
      <div
        onClick={() => {
          const startTime = videoRefKey ? (videoRefs.current[videoRefKey]?.currentTime || 0) : 0;
          openLightbox(src, startTime);
        }}
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
          type: img.type as 'image' | 'video'
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="dailymotion"
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
            <DailymotionExecutive
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
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-6">
                  {t.hero.description}
                </p>

                {/* Visit Website */}
                <a
                  href="https://www.dailymotion.com/partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  {t.visitDailymotion}
                  <ArrowRight size={14} />
                </a>
              </div>
            </section>

            {/* Hero Image */}
            <div className="max-w-[960px] mx-auto px-6">
              <MediaFigure
                src="/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp"
                alt="Dailymotion Partner Platform Overview"
                caption={t.captions.hero}
                captionDesc={t.captions.heroDesc}
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

                  {/* Role and scope */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {t.overview.roleTitle}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.overview.roleDesc}
                    </p>
                  </div>

                  {/* Strategic goals */}
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

                {/* Project meta */}
                <div className="mt-12 divide-y divide-gray-100">
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Type</span>
                    <span className="text-sm text-gray-900">{t.meta.type}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Scope</span>
                    <span className="text-sm text-gray-900">{t.meta.scope}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Period</span>
                    <span className="text-sm text-gray-900">{t.meta.period}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Company</span>
                    <span className="text-sm text-gray-900">{t.meta.company}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Product Modules Section */}
            <section id="modules" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.modules.deliveredTitle}
                </h2>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <div className="space-y-8">
                  {/* Video Management */}
                  <MediaFigure
                    src="/images/dailymotion/dailymotion_focus_upload_2x.webp"
                    alt="Video Management Workflows"
                    caption={t.captions.videoManagement}
                    captionDesc={t.captions.videoManagementDesc}
                  />

                  {/* Live Dashboard */}
                  <MediaFigure
                    src="/images/dailymotion/dailymotion_focus_livestream_2x.webp"
                    alt="Live Dashboard"
                    caption={t.captions.liveDashboard}
                    captionDesc={t.captions.liveDashboardDesc}
                  />

                  {/* Player Manager */}
                  <MediaFigure
                    src="/images/dailymotion/dailymotion_focus_player_template_2x.webp"
                    alt="Player Manager"
                    caption={t.captions.playerManager}
                    captionDesc={t.captions.playerManagerDesc}
                  />
                </div>
              </div>
            </section>

            {/* Video Upload and Management Workflows Section */}
            <section id="upload" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.upload.sectionTitle}
                </h2>

                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.upload.question}
                </p>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.upload.intro}
                </p>

                {/* Upload subtitle */}
                <p className="text-sm font-medium text-gray-900 mb-4">
                  {t.upload.uploadSubtitle}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Upload images */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/dailymotion/dailymotion_-_upload2x.webp"
                    alt="Batch upload interface"
                    caption={t.captions.batchUpload}
                    captionDesc={t.captions.batchUploadDesc}
                  />
                  <MediaFigure
                    src="/videos/dailymotion/video_-_cancel_upload.mp4"
                    alt="Cancel upload interaction"
                    caption={t.captions.cancelUpload}
                    captionDesc={t.captions.cancelUploadDesc}
                    type="video"
                    videoRefKey="cancel-upload"
                  />
                </div>

                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/videos/dailymotion/video_2025-11-10_02.26.48.mp4"
                    alt="Thumbnail update"
                    caption={t.captions.thumbnailUpdate}
                    captionDesc={t.captions.thumbnailUpdateDesc}
                    type="video"
                  />
                  <MediaFigure
                    src="/videos/dailymotion/video_add_subtitle.mp4"
                    alt="Add subtitles"
                    caption={t.captions.addSubtitles}
                    captionDesc={t.captions.addSubtitlesDesc}
                    type="video"
                  />
                </div>
              </div>

              {/* Video Library */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.upload.videoLibraryTitle}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.upload.videoLibraryIntro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/dailymotion/dailymotion_-_video_manager.svg"
                  alt="Video library"
                  caption={t.captions.videoLibrary}
                  captionDesc={t.captions.videoLibraryDesc}
                  className="mb-12"
                />

                {/* Video interactions */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4"
                    alt="Embed code"
                    caption={t.captions.embedCode}
                    captionDesc={t.captions.embedCodeDesc}
                    type="video"
                  />
                  <MediaFigure
                    src="/videos/dailymotion/switch_12-24.mp4"
                    alt="Time picker"
                    caption={t.captions.timePicker}
                    captionDesc={t.captions.timePickerDesc}
                    type="video"
                  />
                </div>

                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4"
                    alt="Password protection"
                    caption={t.captions.passwordProtection}
                    captionDesc={t.captions.passwordProtectionDesc}
                    type="video"
                  />
                  <MediaFigure
                    src="/videos/dailymotion/Geoblocking.mp4"
                    alt="Geoblocking"
                    caption={t.captions.geoblocking}
                    captionDesc={t.captions.geoblockingDesc}
                    type="video"
                  />
                </div>

                {/* Share modal */}
                <MediaFigure
                  src="/images/dailymotion/dailymotion_-_share_expanded2x.webp"
                  alt="Share modal"
                  caption={t.captions.shareModal}
                  captionDesc={t.captions.shareModalDesc}
                  className="mb-12"
                />

                {/* Specifications */}
                <div className="space-y-8 mb-12">
                  <MediaFigure
                    src="/images/dailymotion/Share_-_keyboard_input2x.webp"
                    alt="Share modal keyboard mapping"
                    caption={t.captions.keyboardMapping}
                    captionDesc={t.captions.keyboardMappingDesc}
                  />
                  <MediaFigure
                    src="/images/dailymotion/image.webp"
                    alt="Start time keyboard input"
                    caption={t.captions.startTimeInput}
                    captionDesc={t.captions.startTimeInputDesc}
                  />
                </div>

                {/* Playlist */}
                <MediaFigure
                  src="/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp"
                  alt="Add to playlist flow"
                  caption={t.captions.addToPlaylist}
                  captionDesc={t.captions.addToPlaylistDesc}
                />
              </div>
            </section>

            {/* Live Management Console Section */}
            <section id="live" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.live.sectionTitle}
                </h2>

                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.live.question}
                </p>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.live.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                {/* Live countdown */}
                <MediaFigure
                  src="/images/dailymotion/dailymotion_-_live_-_countdown2x.webp"
                  alt="Pre-broadcast countdown"
                  caption={t.captions.preBroadcast}
                  captionDesc={t.captions.preBroadcastDesc}
                  className="mb-12"
                />

                {/* Live dashboard */}
                <MediaFigure
                  src="/images/dailymotion/dailymotion_-_livestream2x.webp"
                  alt="Live dashboard"
                  caption={t.captions.liveMonitor}
                  captionDesc={t.captions.liveMonitorDesc}
                />
              </div>
            </section>

            {/* Player Manager Section */}
            <section id="player" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.player.title}
                </h2>

                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.player.question}
                </p>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.player.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/dailymotion/dailymotion_-_create_player2x.webp"
                  alt="Player template configurator"
                  caption={t.captions.playerConfigurator}
                  captionDesc={t.captions.playerConfiguratorDesc}
                />
              </div>
            </section>

            {/* Design System Section */}
            <section id="design-system" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.designSystem.sectionTitle}
                </h2>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.designSystem.intro}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <div className="space-y-8">
                  <MediaFigure
                    src="/images/dailymotion/design_system_-_Styles2x.webp"
                    alt="UI Kit - Styles"
                    caption={t.captions.uiKitStyles}
                    captionDesc={t.captions.uiKitStylesDesc}
                  />
                  <MediaFigure
                    src="/images/dailymotion/design_system_-_component_library2x.webp"
                    alt="UI Kit - Components"
                    caption={t.captions.uiKitComponents}
                    captionDesc={t.captions.uiKitComponentsDesc}
                  />
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.impact.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
                  {t.impact.intro}
                </p>

                {/* Key Results - inline metrics */}
                <div className="divide-y divide-gray-100">
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.partnersDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.partners}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.videosDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.videos}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.reductionDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.reduction}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.componentsDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.components}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="max-w-[740px] mx-auto px-6 pb-16">
              <div className="pt-8 border-t border-gray-100">
                <button
                  onClick={onContact}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  {t.cta.button}
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

export default DailymotionPage;
