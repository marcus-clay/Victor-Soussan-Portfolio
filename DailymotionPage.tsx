// Dailymotion Case Study Page - Static content with instant loading
// Displays the Dailymotion project case study with portfolio styling

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X
} from 'lucide-react';

interface DailymotionPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
}

// Navigation sections configuration
const sections = [
  { id: 'top', label: 'Top', shortLabel: '' },
  { id: 'hero', label: 'Intro', shortLabel: '' },
  { id: 'overview', label: 'Overview', shortLabel: 'OV' },
  { id: 'modules', label: 'Key Modules', shortLabel: 'KM' },
  { id: 'upload', label: 'Upload & Management', shortLabel: 'UM' },
  { id: 'live', label: 'Live Console', shortLabel: 'LC' },
  { id: 'player', label: 'Player Manager', shortLabel: 'PM' },
  { id: 'design-system', label: 'Design System', shortLabel: 'DS' },
];

// All media (images + videos) for lightbox navigation
type MediaItem = { src: string; caption: string; type: 'image' | 'video' };
const allImages: MediaItem[] = [
  { src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.png', caption: 'Dailymotion Partner Platform Hero', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_upload_2x.webp', caption: 'Video Management Workflows - Redesigned upload to publication experience with batch processing and inline editing.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_livestream_2x.webp', caption: 'Live Dashboard - Real-time monitoring interface for live video streams with clear status indicators.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_player_template_2x.webp', caption: 'Player Manager - Visual customization tools for embed players and playback behaviors.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_upload2x.png', caption: 'Batch upload interface supports parallel uploads with real-time feedback. Editors can edit metadata, geoblocking, and scheduling while encoding runs.', type: 'image' },
  { src: '/videos/dailymotion/video_-_cancel_upload.mp4', caption: 'Cancel Upload interaction - Smooth cancellation flow with visual feedback.', type: 'video' },
  { src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4', caption: 'Upload an image and update video preview thumbnail instantly.', type: 'video' },
  { src: '/videos/dailymotion/video_add_subtitle.mp4', caption: 'Add subtitles - Streamlined subtitle upload workflow.', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_video_manager.svg', caption: 'Video library displays bulk media management with status indicators and batch actions. Each video card shows privacy state, timestamp, view count, and duration overlay.', type: 'image' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', caption: 'Embed code - Input copy interaction and user feedback.', type: 'video' },
  { src: '/videos/dailymotion/switch_12-24.mp4', caption: 'Time picker 12/24H switch interaction.', type: 'video' },
  { src: '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4', caption: 'Set password protection - Secure video access workflow.', type: 'video' },
  { src: '/videos/dailymotion/Geoblocking.mp4', caption: 'Geoblocking - Allow/Block a video to be broadcasted in certain locations.', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_share_expanded2x.png', caption: 'Expanded share modal reveals full embed customization options with auto-generated iframe code that updates dynamically.', type: 'image' },
  { src: '/images/dailymotion/Share_-_keyboard_input2x.png', caption: 'Share modal keyboard mapping specifications.', type: 'image' },
  { src: '/images/dailymotion/image.png', caption: 'Start time keyboard input specifications.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.png', caption: 'Add video to playlist flow - Streamlined playlist management.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_live_-_countdown2x.png', caption: 'Pre-broadcast countdown displays scheduled start time with OFF AIR badge. The persistent Share button enables promotional distribution before stream begins.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_livestream2x.png', caption: 'Live dashboard monitors active broadcasts with real-time technical metrics and viewer count. The preview pane displays current stream frame with persistent LIVE badge.', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_create_player2x.png', caption: 'Player template configurator - Define appearance, assign content, retrieve embed code.', type: 'image' },
  { src: '/images/dailymotion/design_system_-_Styles2x.png', caption: "Dailymotion's Partner Space UI Kit - Styles foundation for coherent product suite.", type: 'image' },
  { src: '/images/dailymotion/design_system_-_component_library2x.png', caption: "Dailymotion's Partner Space UI Kit - Component library for scalable development.", type: 'image' },
];

// Apple-style spring transition
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Slide transition for carousel
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
};

export const DailymotionPage: React.FC<DailymotionPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for parallax effect
  const dragX = useMotionValue(0);
  const parallaxX = useTransform(dragX, [-300, 0, 300], [30, 0, -30]);

  // Track scroll position and update active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      // Show nav after scrolling past hero
      setShowNav(scrollTop > 300);

      // Find active section
      const sectionElements = sections.map(s => ({
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

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section with proper offset for header + sticky mini-nav
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      // Header height (73px) + sticky mini-nav height (~56px with py-4) + padding (24px)
      const headerOffset = 73 + 56 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      containerRef.current.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Open lightbox with specific image
  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setPage([index, 0]);
      setLightboxZoomed(false);
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

  // Handle drag end for swipe navigation
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      if (lightboxIndex < allImages.length - 1) paginate(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      if (lightboxIndex > 0) paginate(-1);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      {/* Sticky Mini-Nav - All screen sizes */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[73px] left-0 right-0 z-30 border-b ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10'
                : 'bg-white/95 backdrop-blur-xl border-gray-200'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <div className="mx-auto px-4 md:px-6" style={{ maxWidth: '1480px' }}>
              <button
                onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                className="w-full py-4 flex items-center justify-between"
              >
              <div className="flex items-center gap-2 ml-10">
                <div className={`w-2 h-2 rounded-full bg-blue-600`} />
                <span
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {sections.find(s => s.id === activeSection)?.label || 'Top'}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isMobileNavExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown
                  size={20}
                  className={systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                />
              </motion.div>
            </button>

            {/* Expanded state - shows all sections */}
            <AnimatePresence>
              {isMobileNavExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`pb-3 space-y-1 border-t ml-10 ${
                    systemTheme === 'dark' ? 'border-white/5' : 'border-gray-100'
                  }`}>
                    {sections.map((section) => {
                      const isActive = activeSection === section.id;
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      const sectionIndex = sections.findIndex(s => s.id === section.id);
                      const isPast = sectionIndex < currentIndex;

                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            scrollToSection(section.id);
                            setIsMobileNavExpanded(false);
                          }}
                          className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 transition-colors ${
                            isActive
                              ? systemTheme === 'dark'
                                ? 'bg-blue-600/10 text-blue-400'
                                : 'bg-blue-50 text-blue-600'
                              : systemTheme === 'dark'
                                ? 'text-gray-400 hover:bg-white/5'
                                : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive
                                ? 'bg-blue-600'
                                : isPast
                                  ? systemTheme === 'dark'
                                    ? 'bg-gray-500'
                                    : 'bg-gray-400'
                                  : systemTheme === 'dark'
                                    ? 'bg-gray-700'
                                    : 'bg-gray-300'
                            }`}
                          />
                          <span className="text-sm font-medium">{section.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          systemTheme === 'dark'
            ? 'bg-[#0a0a0a]/80 border-white/10'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="mx-auto px-4 md:px-6 py-4 flex items-center justify-between" style={{ maxWidth: '1480px' }}>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1
                className={`text-lg md:text-xl font-bold ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Dailymotion
              </h1>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Case Study
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {systemTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* External link */}
            <a
              href="https://www.dailymotion.com/partner"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Visit Dailymotion Partner"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </motion.button>
            )}

            {lightboxIndex < allImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight size={28} />
              </motion.button>
            )}

            {/* Image container with carousel */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-20 py-20">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 350, damping: 35 },
                    opacity: { duration: 0.2 },
                    scale: { type: 'spring', stiffness: 350, damping: 35 },
                  }}
                  drag={lightboxZoomed ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDrag={(_, info) => dragX.set(info.offset.x)}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute w-full h-full ${
                    lightboxZoomed
                      ? 'overflow-y-auto overflow-x-hidden cursor-grab active:cursor-grabbing'
                      : 'flex flex-col items-center justify-center cursor-grab active:cursor-grabbing'
                  }`}
                  style={lightboxZoomed ? { scrollBehavior: 'smooth' } : {}}
                >
                  {lightboxZoomed ? (
                    /* Zoomed mode - Full scrollable container */
                    <div
                      className="min-h-full w-full flex flex-col items-center py-16 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxZoomed(false);
                      }}
                    >
                      <motion.img
                        src={allImages[lightboxIndex].src}
                        alt={allImages[lightboxIndex].caption}
                        className="w-[95vw] md:w-[90vw] h-auto rounded-lg shadow-2xl cursor-zoom-out"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                        draggable={false}
                      />
                      {/* Caption at the bottom of zoomed image */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 mb-8 px-4 text-center max-w-3xl"
                      >
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                          {allImages[lightboxIndex].caption}
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          Click to exit zoom
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    /* Normal mode - Centered with constraints */
                    <>
                      <motion.div
                        style={{ x: parallaxX }}
                        className="relative max-w-[90vw] max-h-[70vh] md:max-w-[80vw] md:max-h-[75vh]"
                        onClick={(e) => {
                          if (allImages[lightboxIndex].type === 'image') {
                            e.stopPropagation();
                            setLightboxZoomed(true);
                          }
                        }}
                      >
                        {allImages[lightboxIndex].type === 'video' ? (
                          <motion.video
                            src={allImages[lightboxIndex].src}
                            className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={springTransition}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                          />
                        ) : (
                          <motion.img
                            src={allImages[lightboxIndex].src}
                            alt={allImages[lightboxIndex].caption}
                            className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain cursor-zoom-in rounded-lg shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={springTransition}
                            draggable={false}
                          />
                        )}
                      </motion.div>

                      {/* Caption */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, ...springTransition }}
                        className="mt-6 px-4 text-center max-w-3xl"
                      >
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                          {allImages[lightboxIndex].caption}
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          {lightboxIndex + 1} / {allImages.length} {allImages[lightboxIndex].type === 'image' && '• Click image to zoom'}
                        </p>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image dots indicator */}
            {!lightboxZoomed && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      const dir = idx > lightboxIndex ? 1 : -1;
                      setLightboxIndex(idx);
                      setPage([idx, dir]);
                      setLightboxZoomed(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      idx === lightboxIndex
                        ? 'bg-white w-4'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="mx-auto px-4 md:px-6 py-12 md:py-16" style={{ maxWidth: '960px' }}>
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-16 md:mb-24">
              <div className="md:col-span-3">
                {/* Meta tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Senior Product Designer
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    -
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Media Management, Design System
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    -
                  </span>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    2017-2018
                  </span>
                </div>

                {/* Main Title */}
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Empowering Dailymotion's Video Partners to Manage, Publish and Go Live with Confidence
                </h1>

                {/* Subtitle */}
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Improved media management tools for video publishers
                </h2>

                {/* Description */}
                <p
                  className={`text-base leading-relaxed ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Between 2017 and 2018, I was responsible for the UX and UI of Dailymotion's partner tool ecosystem. These web and mobile tools empowered over 30,000 content partners, including broadcasters and media publishers like France TV, CBS, and beIN Sports, to upload, edit, and livestream videos to their audiences.
                </p>
              </div>
            </section>

            {/* Hero Image */}
            <figure className="mb-16 md:mb-24">
              <div
                onClick={() => openLightbox('/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.png')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.png"
                  alt="Dailymotion Partner Platform Overview"
                  className="w-full h-auto"
                />
              </div>
            </figure>

            {/* Overview Section */}
            <section id="overview" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Overview
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
                    className={`text-lg font-bold mb-4 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Introduction
                  </h2>
                  <p
                    className={`text-sm leading-relaxed ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Dailymotion was undergoing a major strategic pivot, shifting from general consumer content to repositioning itself as a premium platform for media partners. While high-profile partners were onboard, the existing platform tools were outdated, clunky, and inconsistent, hindering professional use. Thousands of videos were uploaded daily, managed from a legacy backend.
                  </p>
                </div>

                {/* Role and scope */}
                <div>
                  <h2
                    className={`text-lg font-bold mb-4 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Role and scope
                  </h2>
                  <p
                    className={`text-sm leading-relaxed ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    As Senior Product Designer for the Partner Business Unit, my role was to co-lead the full redesign. Rebuild the experience into a real control center for media operators.
                  </p>
                </div>

                {/* Strategic goals */}
                <div>
                  <h2
                    className={`text-lg font-bold mb-4 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Strategic goals
                  </h2>
                  <ul
                    className={`text-sm leading-relaxed space-y-2 ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <li>- Rework the media manager experience upload, edition and distribution</li>
                    <li>- Design a new Live Dashboard for video broadcasts</li>
                    <li>- Rethink player and widget managers</li>
                    <li>- Establish a scalable design infrastructure</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Product Modules Section */}
            <section id="modules" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-8 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Key product modules delivered
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
                    <img
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
                    <strong>Video Management Workflows</strong> - Redesigned the full video management experience, from upload to publication. Introduced batch processing, inline editing, and contextual sharing actions.
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
                    <img
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
                    <strong>Live Dashboard</strong> - Designed the creation and monitoring interface for live video streams, ensuring real-time stats and clarity in a complex, high-pressure environment.
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
                    <img
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
                    <strong>Player Manager</strong> - Redesigned the visual customization tools for embed players, allowing partners to define player themes and manage playback behaviors.
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
            <section id="upload" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Video Upload and Management Workflows
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                How can a media platform help publishers process, manage, and monetize thousands of videos daily?
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Managing large volumes of video required more than an upload button. Dailymotion's media partners worked with industrial-scale workflows, multiple encodes, metadata rules, ad configuration, and distribution timelines that all had to stay in sync. The objective was to design a system that made these operations fast, traceable, and intuitive. The new Upload flow introduced parallel processing with real-time progress and error visibility. Editors could queue files, edit titles or geoblocking while encoding ran, and publish once all checks passed.
              </p>

              {/* Upload Section */}
              <h3
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Upload
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/dailymotion_-_upload2x.png')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/dailymotion/dailymotion_-_upload2x.png"
                      alt="Batch upload interface"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>Batch upload</strong> - Parallel uploads with real-time feedback. Editors can edit metadata, geoblocking, and scheduling while encoding runs. Reduces clip preparation time by 50%.
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/videos/dailymotion/video_-_cancel_upload.mp4')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <video
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
                    <strong>Cancel Upload</strong> - Smooth cancellation flow with visual feedback.
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
                    <strong>Thumbnail update</strong> - Upload an image and update video preview thumbnail instantly.
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
                    <strong>Add subtitles</strong> - Streamlined subtitle upload workflow.
                  </figcaption>
                </figure>
              </div>

              {/* Video Library Section */}
              <h3
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Video Library
              </h3>

              <p
                className={`text-base leading-relaxed mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                In the Video Library, hierarchy and motion replaced heavy controls. Hover actions surfaced only when needed, reducing clutter while keeping all operations one click away. The interface supported continuous publishing, users could act while data refreshed in the background, cutting idle time between uploads.
              </p>

              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_video_manager.svg')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
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
                  <strong>Video library</strong> - Bulk media management with status indicators and batch actions. Each video card shows privacy state, timestamp, view count, and duration overlay. Multi-select checkboxes enable batch operations on hundreds of videos.
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
                    <strong>Embed code</strong> - Input copy interaction and user feedback.
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
                    <strong>Time picker</strong> - 12/24H switch interaction.
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
                    <strong>Password protection</strong> - Secure video access workflow.
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
                    <strong>Geoblocking</strong> - Allow/Block video broadcasts in certain locations.
                  </figcaption>
                </figure>
              </div>

              {/* Share modal */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_share_expanded2x.png')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/dailymotion/dailymotion_-_share_expanded2x.png"
                    alt="Share modal"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>Share modal</strong> - Full embed customization options with auto-generated iframe code that updates dynamically. Progressive disclosure keeps simple sharing lightweight while offering technical control.
                </figcaption>
              </figure>

              {/* Specifications */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/Share_-_keyboard_input2x.png')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/dailymotion/Share_-_keyboard_input2x.png"
                      alt="Share modal keyboard mapping"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>Keyboard mapping</strong> - Share modal specifications.
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/image.png')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/dailymotion/image.png"
                      alt="Start time keyboard input"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>Start time input</strong> - Keyboard input specifications.
                  </figcaption>
                </figure>
              </div>

              {/* Playlist */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.png')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.png"
                    alt="Add to playlist flow"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>Add to playlist</strong> - Streamlined playlist management flow.
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
            <section id="live" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Live Management Console
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                How can a live platform compete with Twitch and Facebook while giving professionals real control?
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Going live brought a different kind of complexity. Operators needed to monitor performance and react instantly to encoding or audience shifts. The goal was to design a calm control surface that worked under pressure. The Live Manager structured all actions around three panels, Control, Information, and Record, matching the mental model of a live broadcast. Status changes and transitions were central: Ready {'>'} On Air {'>'} Recording {'>'} Completed. Each transition was animated with clear visual feedback to confirm that a command had been received. Metrics such as bitrate, viewers, or latency updated in place without motion noise.
              </p>

              {/* Live countdown */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_live_-_countdown2x.png')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/dailymotion/dailymotion_-_live_-_countdown2x.png"
                    alt="Pre-broadcast countdown"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>Pre-broadcast countdown</strong> - Displays scheduled start time with OFF AIR badge. The persistent Share button enables promotional distribution before stream begins.
                </figcaption>
              </figure>

              {/* Live dashboard */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_livestream2x.png')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/dailymotion/dailymotion_-_livestream2x.png"
                    alt="Live dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>Live dashboard</strong> - Monitors active broadcasts with real-time technical metrics and viewer count. The preview pane displays current stream frame with persistent LIVE badge and elapsed time. The right panel surfaces critical encoding parameters enabling technical operators to diagnose stream quality issues during high-pressure live events.
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
            <section id="player" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Player Manager
              </h1>

              <h2
                className={`text-xl md:text-2xl font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                How do you turn player configuration into a task anyone can complete in minutes?
              </h2>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Once uploaded and streamed, videos needed consistent playback across partner sites. The Player Manager solved this by giving non-technical users the ability to create and configure their own players. The interface focused on progressive disclosure. Users started from a simple list and expanded into detailed tabs only when required. Creating a player triggered a guided flow: define appearance, assign content, then retrieve the embed code. Subtle transitions kept context between steps, avoiding modal interruptions.
              </p>

              {/* Player configurator */}
              <figure className="mb-8">
                <div
                  onClick={() => openLightbox('/images/dailymotion/dailymotion_-_create_player2x.png')}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <img
                    src="/images/dailymotion/dailymotion_-_create_player2x.png"
                    alt="Player template configurator"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption
                  className={`mt-3 text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <strong>Player template configurator</strong> - Define appearance, assign content, retrieve embed code. Speed and control for editors managing dozens of templates.
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
            <section id="design-system" className="mb-16 md:mb-24">
              <h1
                className={`text-2xl md:text-3xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Building a Scalable UI Kit
              </h1>

              <p
                className={`text-base leading-relaxed mb-8 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                To ensure coherence across the growing product suite, I led the creation of a new Design System and Component Library.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/design_system_-_Styles2x.png')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/dailymotion/design_system_-_Styles2x.png"
                      alt="UI Kit - Styles"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>UI Kit - Styles</strong> - Foundation for coherent product suite across all partner tools.
                  </figcaption>
                </figure>

                <figure>
                  <div
                    onClick={() => openLightbox('/images/dailymotion/design_system_-_component_library2x.png')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src="/images/dailymotion/design_system_-_component_library2x.png"
                      alt="UI Kit - Components"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption
                    className={`mt-3 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong>UI Kit - Components</strong> - Scalable component library for consistent development.
                  </figcaption>
                </figure>
              </div>
            </section>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default DailymotionPage;
