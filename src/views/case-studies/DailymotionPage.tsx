// Dailymotion Case Study Page - Static content with instant loading
// Displays the Dailymotion project case study with portfolio styling

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {

  ArrowSquareOut as ExternalLink,
  Calendar,
  Briefcase,
  Stack as Layers,
  Buildings as Building2,
  ArrowRight
} from '@phosphor-icons/react';
import { GalleryItem, getDailymotionGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import DailymotionExecutive from '../../components/case-studies/DailymotionExecutive';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
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

// TOC Sections for Full case study
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Key Modules' },
    { id: 'upload', label: 'Upload & Management' },
    { id: 'live', label: 'Live Console' },
    { id: 'player', label: 'Player Manager' },
    { id: 'design-system', label: 'Design System' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'modules', label: 'Modules clés' },
    { id: 'upload', label: 'Upload & Gestion' },
    { id: 'live', label: 'Console Live' },
    { id: 'player', label: 'Gestionnaire Player' },
    { id: 'design-system', label: 'Design System' },
  ]
};

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
  // Load gallery items directly in the component
  const galleryItems = getDailymotionGalleryItems(lang);

  // Build allImages with translated captions
  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  // TOC sections for current language
  const sections = TOC_SECTIONS[lang];
  const isDark = systemTheme === 'dark';

  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [, setLightboxZoomed] = useState(false);
  const [, setPage] = useState([0, 0]);
  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const [videoStartTime, setVideoStartTime] = useState(0);
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

  // Track scroll position and update active section (only in full mode)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Show nav after scrolling past hero (300px)
      setShowNav(scrollTop > 300);

      // If at the very top, set 'top' as active
      if (scrollTop < 100) {
        setActiveSection('top');
        return;
      }

      // Find active section (skip 'top' which has no DOM element)
      const sectionElements = sections
        .filter(s => s.id !== 'top')
        .map(s => ({
          id: s.id,
          element: document.getElementById(s.id)
        })).filter(s => s.element);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section with proper offset for sticky mini-nav
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open lightbox with specific image and optional start time for videos
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setPage([index, 0]);
      setLightboxZoomed(false);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Navigate to next/previous image
  const paginate = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setLightboxIndex(newIndex);
      setPage([newIndex, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, paginate]);

  return (
    <div ref={containerRef} className={`min-h-screen ${viewMode === 'gallery' ? 'bg-white' : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')}`}>
      {/* TOC Sidebar - Persistent left navigation for full mode */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showNav && viewMode !== 'gallery' && caseStudyMode === 'full'}
        lang={lang}
      />


      {/* Enhanced Lightbox with mobile gestures */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type as 'image' | 'video'
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => {
          setLightboxIndex(idx);
          setPage([idx, idx > lightboxIndex ? 1 : -1]);
        }}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="dailymotion"
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
      <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
              {/* Logo */}
              <img loading="lazy"
                src={systemTheme === 'dark'
                  ? '/images/dailymotion/logo-dailymotion-white.svg'
                  : '/images/dailymotion/logo-dailymotion-black.svg'
                }
                alt="Dailymotion"
                className="h-8 w-auto mb-8"
              />
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

                {/* Visit Website Button */}
                <a
                  href="https://www.dailymotion.com/partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    systemTheme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ExternalLink size={16} className="mr-2" />
                  {t.visitDailymotion}
                </a>
              </div>
            </section>

            {/* Project Meta Card - Synthesis */}
            <div
              className={`p-6 rounded-3xl border mb-12 ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50'
                    }`}
                  >
                    <Layers
                      size={20}
                      className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Type
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                    }`}
                  >
                    <Briefcase
                      size={20}
                      className={systemTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Scope
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.scope}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-green-500/20' : 'bg-green-50'
                    }`}
                  >
                    <Calendar
                      size={20}
                      className={systemTheme === 'dark' ? 'text-green-400' : 'text-green-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Period
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50'
                    }`}
                  >
                    <Building2
                      size={20}
                      className={systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Company
                    </p>
                    <p className={`text-sm font-medium ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <figure className="mb-24 md:mb-32">
              <div
                onClick={() => openLightbox('/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img loading="lazy"
                  src="/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp"
                  alt="Dailymotion Partner Platform Overview"
                  className="w-full h-auto"
                />
              </div>
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
                <div>
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

                {/* Role and scope */}
                <div>
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

                {/* Strategic goals */}
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
            </section>

            {/* Key Product Modules Section */}
            <section id="modules" className="mb-24 md:mb-32">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-8 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.modules.deliveredTitle}
              </h1>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Video Management */}
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_focus_upload_2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-video ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_focus_upload_2x.webp"
                      alt="Video Management Workflows"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.videoManagement}</strong> - {t.captions.videoManagementDesc}
                  </figcaption>
                </figure>

                {/* Live Dashboard */}
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_focus_livestream_2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-video ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_focus_livestream_2x.webp"
                      alt="Live Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.liveDashboard}</strong> - {t.captions.liveDashboardDesc}
                  </figcaption>
                </figure>

                {/* Player Manager */}
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_focus_player_template_2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-video ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_focus_player_template_2x.webp"
                      alt="Player Manager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.playerManager}</strong> - {t.captions.playerManagerDesc}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Video Upload and Management Workflows Section */}
            <section id="upload" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.sectionTitle}
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.question}
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.upload.intro}
              </p>

              {/* Upload Section */}
              <h3
                className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.uploadSubtitle}
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_-_upload2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/dailymotion_-_upload2x.webp"
                      alt="Batch upload interface"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.batchUpload}</strong> - {t.captions.batchUploadDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => {
                      const currentTime = videoRefs.current['cancel-upload']?.currentTime || 0;
                      openLightbox('/videos/dailymotion/video_-_cancel_upload.mp4', currentTime);
                    }}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      ref={(el) => { videoRefs.current['cancel-upload'] = el; }}
                      src="/videos/dailymotion/video_-_cancel_upload.mp4"
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
                    <strong>{t.captions.cancelUpload}</strong> - {t.captions.cancelUploadDesc}
                  </figcaption>
                </figure>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/video_2025-11-10_02.26.48.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/video_2025-11-10_02.26.48.mp4"
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
                    <strong>{t.captions.thumbnailUpdate}</strong> - {t.captions.thumbnailUpdateDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/video_add_subtitle.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/video_add_subtitle.mp4"
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
                    <strong>{t.captions.addSubtitles}</strong> - {t.captions.addSubtitlesDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Video Library Section */}
              <h3
                className={`text-xl md:text-2xl font-semibold mb-5 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.upload.videoLibraryTitle}
              </h3>

              <p
                className={`text-base leading-relaxed mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.upload.videoLibraryIntro}
              </p>

              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_video_manager.svg')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_video_manager.svg"
                    alt="Video library"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.videoLibrary}</strong> - {t.captions.videoLibraryDesc}
                </figcaption>
              </figure>

              {/* Video interactions */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4"
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
                    <strong>{t.captions.embedCode}</strong> - {t.captions.embedCodeDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/switch_12-24.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/switch_12-24.mp4"
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
                    <strong>{t.captions.timePicker}</strong> - {t.captions.timePickerDesc}
                  </figcaption>
                </figure>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4"
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
                    <strong>{t.captions.passwordProtection}</strong> - {t.captions.passwordProtectionDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/Geoblocking.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
                      src="/videos/dailymotion/Geoblocking.mp4"
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
                    <strong>{t.captions.geoblocking}</strong> - {t.captions.geoblockingDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Share modal */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_share_expanded2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_share_expanded2x.webp"
                    alt="Share modal"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.shareModal}</strong> - {t.captions.shareModalDesc}
                </figcaption>
              </figure>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/Share_-_keyboard_input2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/Share_-_keyboard_input2x.webp"
                      alt="Share modal keyboard mapping"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.keyboardMapping}</strong> - {t.captions.keyboardMappingDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/image.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/image.webp"
                      alt="Start time keyboard input"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.startTimeInput}</strong> - {t.captions.startTimeInputDesc}
                  </figcaption>
                </figure>
              </div>

              {/* Playlist */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp"
                    alt="Add to playlist flow"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.addToPlaylist}</strong> - {t.captions.addToPlaylistDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Live Management Console Section */}
            <section id="live" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.live.sectionTitle}
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.live.question}
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.live.intro}
              </p>

              {/* Live countdown */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_live_-_countdown2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_live_-_countdown2x.webp"
                    alt="Pre-broadcast countdown"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.preBroadcast}</strong> - {t.captions.preBroadcastDesc}
                </figcaption>
              </figure>

              {/* Live dashboard */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_livestream2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_livestream2x.webp"
                    alt="Live dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.liveMonitor}</strong> - {t.captions.liveMonitorDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Player Manager Section */}
            <section id="player" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.player.title}
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.player.question}
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.player.intro}
              </p>

              {/* Player configurator */}
              <figure className="my-12">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_create_player2x.webp')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img loading="lazy"
                    src="/images/dailymotion/dailymotion_-_create_player2x.webp"
                    alt="Player template configurator"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>{t.captions.playerConfigurator}</strong> - {t.captions.playerConfiguratorDesc}
                </figcaption>
              </figure>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Design System Section */}
            <section id="design-system" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.designSystem.sectionTitle}
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.designSystem.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/design_system_-_Styles2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/design_system_-_Styles2x.webp"
                      alt="UI Kit - Styles"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.uiKitStyles}</strong> - {t.captions.uiKitStylesDesc}
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/design_system_-_component_library2x.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img loading="lazy"
                      src="/images/dailymotion/design_system_-_component_library2x.webp"
                      alt="UI Kit - Components"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>{t.captions.uiKitComponents}</strong> - {t.captions.uiKitComponentsDesc}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Divider */}
            <hr
              className={`my-12 ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            />

            {/* Impact Section - Toolkit style */}
            <section id="impact" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.title}
              </h1>
              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.impact.intro}
              </p>

              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.partners}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.partnersDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.videos}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.videosDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.reduction}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.reductionDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.components}
                  </p>
                  <p
                    className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.componentsDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 md:py-32 px-10">
              <div className="max-w-[800px] mx-auto text-center">
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.cta.title}
                </h2>
                <button
                  onClick={onContact}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
                >
                  {t.cta.button}
                  <ArrowRight size={22} />
                </button>
              </div>
            </section>

          </main>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailymotionPage;
