// BentoGallery - Full-page modal gallery for case study snapshots
// Displays images and videos in a 3-column masonry grid with parallax and auto-scroll

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

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

export interface GalleryItem {
  src: string;
  caption: string;
  captionDesc?: string;
  type: 'image' | 'video';
  span?: 'normal' | 'wide' | 'tall'; // for bento layout variation
}

interface BentoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: GalleryItem[];
  systemTheme: 'light' | 'dark';
  lang?: 'en' | 'fr';
  hasCaseStudy?: boolean; // Whether this project has a case study view
  onOpenCaseStudy?: () => void; // Callback to switch to case study view
}

const TRANSLATIONS = {
  en: {
    snapshots: 'Project Snapshots',
    items: 'items',
    clickToZoom: 'Click image to zoom',
    clickToExitZoom: 'Click to exit zoom',
    close: 'Close',
    caseStudy: 'Case Study',
    gallery: 'Gallery',
  },
  fr: {
    snapshots: 'Aperçus du projet',
    items: 'éléments',
    clickToZoom: 'Cliquer pour agrandir',
    clickToExitZoom: 'Cliquer pour fermer',
    close: 'Fermer',
    caseStudy: 'Étude de cas',
    gallery: 'Galerie',
  },
};

// Individual Gallery Card with Apple TV-style 3D tilt effect
interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  isVideo: (src: string) => boolean;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, isVideo, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring smoothing for natural feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  // Glow position
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group cursor-pointer break-inside-avoid mb-8 md:mb-10"
      onClick={onClick}
      style={{ perspective: 1000 }}
    >
      {/* Container with Apple TV 3D tilt effect */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
      >
        {/* Glow overlay - Apple TV style */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Shine effect on edges */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.2)',
          }}
        />

        {item.type === 'video' || isVideo(item.src) ? (
          <div className="relative">
            <video
              src={item.src}
              className="w-full h-auto block"
              muted
              playsInline
              preload="metadata"
            />
            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110 bg-white/20">
                <Play
                  size={28}
                  className="text-white ml-1"
                  fill="white"
                />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.caption}
            className="w-full h-auto block"
            loading="lazy"
          />
        )}
      </motion.div>

      {/* Caption - Always dark theme */}
      <figcaption className="mt-4 text-sm text-gray-400">
        <strong className="text-gray-200">
          {item.caption}
        </strong>
        {item.captionDesc && (
          <span className="hidden sm:inline">
            {' '}— {item.captionDesc}
          </span>
        )}
      </figcaption>
    </motion.figure>
  );
};

export const BentoGallery: React.FC<BentoGalleryProps> = ({
  isOpen,
  onClose,
  title,
  items,
  systemTheme,
  lang = 'en',
  hasCaseStudy = false,
  onOpenCaseStudy,
}) => {
  const t = TRANSLATIONS[lang];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  // Motion values for parallax effect in lightbox
  const dragX = useMotionValue(0);
  const parallaxX = useTransform(dragX, [-300, 0, 300], [30, 0, -30]);

  // Lightbox navigation
  const paginate = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < items.length) {
      setLightboxIndex(newIndex);
      setPage([newIndex, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex, items.length]);

  // Open lightbox at specific index
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setPage([index, 0]);
    setLightboxZoomed(false);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxZoomed(false);
  };

  // Keyboard navigation
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

  // Close gallery on Escape
  useEffect(() => {
    if (!isOpen || lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle drag end for swipe navigation
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      if (lightboxIndex < items.length - 1) paginate(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      if (lightboxIndex > 0) paginate(-1);
    }
    dragX.set(0);
  };

  // Check if item is video
  const isVideo = (src: string) => {
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  };

  // Get current item
  const currentItem = items[lightboxIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backgroundColor: 'rgba(255,255,255,1)' }}
          animate={{ opacity: 1, backgroundColor: 'rgba(0,0,0,1)' }}
          exit={{ opacity: 0, backgroundColor: 'rgba(255,255,255,1)' }}
          transition={{
            opacity: { duration: 0.3 },
            backgroundColor: { duration: 0.5, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-[100] overflow-y-auto"
        >
          {/* Header - iOS-inspired responsive design */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="sticky top-0 z-50 backdrop-blur-xl border-b bg-black/80 border-white/10"
          >
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-4">
              {/* Left - Title (truncates on mobile, fixed width on desktop for centering) */}
              <div className="flex-shrink-0 min-w-0 max-w-[30%] sm:max-w-none sm:w-32 md:w-40">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
                  {title}
                </h1>
              </div>

              {/* Center - Toggle Switch with animated pill (compact on mobile) */}
              {hasCaseStudy && onOpenCaseStudy ? (
                <div className="flex-1 flex justify-center">
                  <div className="relative flex items-center rounded-full p-0.5 sm:p-1 bg-white/10">
                    {/* Animated background pill */}
                    <motion.div
                      className="absolute bg-blue-600 rounded-full shadow-md"
                      initial={false}
                      animate={{
                        x: '100%',
                        width: '50%'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8
                      }}
                      style={{
                        height: 'calc(100% - 4px)',
                        top: '2px',
                        left: '2px',
                        right: '2px'
                      }}
                    />
                    <button
                      onClick={onOpenCaseStudy}
                      className="relative z-10 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 text-gray-400 hover:text-white whitespace-nowrap"
                      style={{ width: '50%' }}
                    >
                      <span className="hidden sm:inline">{t.caseStudy}</span>
                      <span className="sm:hidden">Étude</span>
                    </button>
                    <button
                      className="relative z-10 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 text-white whitespace-nowrap"
                      style={{ width: '50%' }}
                    >
                      <span className="hidden sm:inline">{t.gallery}</span>
                      <span className="sm:hidden">Galerie</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Gallery only - show static label in center */
                <div className="flex-1 flex justify-center">
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 text-white">
                    {t.gallery}
                  </span>
                </div>
              )}

              {/* Right - Close button (fixed width matching title for centering) */}
              <div className="flex-shrink-0 sm:w-32 md:w-40 flex justify-end">
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-full transition-colors bg-white/10 hover:bg-white/20 text-white"
                  aria-label={t.close}
                >
                  <X size={20} className="sm:hidden" />
                  <X size={24} className="hidden sm:block" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Full-width Masonry Grid with staggered card animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="overflow-y-auto"
          >
            <div className="w-full px-6 md:px-10 lg:px-12 py-8 md:py-12">
              {/* CSS Masonry Grid - 3 columns fluid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
                {items.map((item, index) => (
                  <GalleryCard
                    key={index}
                    item={item}
                    index={index}
                    isVideo={isVideo}
                    onClick={() => openLightbox(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxOpen && currentItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
                onClick={closeLightbox}
              >
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={springTransition}
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label={t.close}
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
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={28} />
                  </motion.button>
                )}

                {lightboxIndex < items.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={springTransition}
                    onClick={(e) => { e.stopPropagation(); paginate(1); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next"
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
                            src={currentItem.src}
                            alt={currentItem.caption}
                            className="w-[95vw] md:w-[90vw] h-auto rounded-2xl shadow-2xl cursor-zoom-out"
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
                              {currentItem.caption}
                              {currentItem.captionDesc && ` — ${currentItem.captionDesc}`}
                            </p>
                            <p className="text-white/40 text-xs mt-2">
                              {t.clickToExitZoom}
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
                              if (currentItem.type !== 'video' && !isVideo(currentItem.src)) {
                                e.stopPropagation();
                                setLightboxZoomed(true);
                              }
                            }}
                          >
                            {currentItem.type === 'video' || isVideo(currentItem.src) ? (
                              <motion.video
                                src={currentItem.src}
                                className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-2xl shadow-2xl"
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
                                src={currentItem.src}
                                alt={currentItem.caption}
                                className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain cursor-zoom-in rounded-2xl shadow-2xl"
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
                              {currentItem.caption}
                              {currentItem.captionDesc && ` — ${currentItem.captionDesc}`}
                            </p>
                            <p className="text-white/40 text-xs mt-2">
                              {lightboxIndex + 1} / {items.length}
                              {currentItem.type !== 'video' && !isVideo(currentItem.src) && ` • ${t.clickToZoom}`}
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
                    {items.map((_, idx) => (
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gallery data for Toolkit case study
export const TOOLKIT_GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/toolkit/toolkit_app_v3.webp',
    caption: 'Toolkit App Overview',
    captionDesc: 'Vue d\'ensemble de l\'application Toolkit',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg',
    caption: 'Product Evolution',
    captionDesc: '12 months of product iteration',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_01_-_Problem.svg',
    caption: 'Problem Statement',
    captionDesc: 'Initial pain points and challenges',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_02_-_Research.svg',
    caption: 'Research Phase',
    captionDesc: 'User research and discovery',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_03_-_Foundation.svg',
    caption: 'Design Foundation',
    captionDesc: 'Core design principles',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_04_-_Project_creation_workflow.svg',
    caption: 'Project Creation Workflow',
    captionDesc: 'Streamlined project setup flow',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_05_-_Core_interaction_principles.svg',
    caption: 'Interaction Principles',
    captionDesc: 'Core UX patterns',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_06_-_Impact.svg',
    caption: 'Business Impact',
    captionDesc: 'Measured outcomes',
    type: 'image',
  },
  {
    src: '/images/toolkit/authentication_-_magic_link.svg',
    caption: 'Magic Link Authentication',
    captionDesc: 'Passwordless login flow',
    type: 'image',
  },
  {
    src: '/images/toolkit/desktop_-_chantier_-_index_-_v3.svg',
    caption: 'Project Index',
    captionDesc: 'Main dashboard view',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg',
    caption: 'Project Details',
    captionDesc: 'Detailed project view',
    type: 'image',
  },
  {
    src: '/images/toolkit/desktop_-_chantier_-_create_-_modal.svg',
    caption: 'Create Project Modal',
    captionDesc: 'New project creation',
    type: 'image',
  },
  {
    src: '/images/toolkit/daktop_-_site_setup_-_tasks_list.svg',
    caption: 'Tasks List',
    captionDesc: 'Task management interface',
    type: 'image',
  },
  {
    src: '/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg',
    caption: 'Task Sequence',
    captionDesc: 'Sequential task workflow',
    type: 'image',
  },
  {
    src: '/images/toolkit/planning_-_v1.svg',
    caption: 'Planning V1',
    captionDesc: 'Initial planning interface',
    type: 'image',
  },
  {
    src: '/images/toolkit/planning_-_v2.svg',
    caption: 'Planning V2',
    captionDesc: 'Improved planning view',
    type: 'image',
  },
  {
    src: '/images/toolkit/dynamic_menu_-_components_and_interface_system.svg',
    caption: 'Dynamic Menu System',
    captionDesc: 'Component and interface patterns',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/toolkit/evolution_mobile_menu.svg',
    caption: 'Mobile Menu Evolution',
    captionDesc: 'Mobile navigation iterations',
    type: 'image',
  },
  {
    src: '/images/toolkit/dynamic_island_menu_-_modifier_tache.svg',
    caption: 'Dynamic Island Menu',
    captionDesc: 'Task modification interface',
    type: 'image',
  },
  {
    src: '/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg',
    caption: 'Activity Section',
    captionDesc: 'Task activity behavior',
    type: 'image',
  },
  {
    src: '/images/toolkit/Design_system.svg',
    caption: 'Design System',
    captionDesc: 'UI component library',
    type: 'image',
  },
  {
    src: '/images/toolkit/system_-_icons_-_files_and_folders.svg',
    caption: 'Icon System',
    captionDesc: 'Files and folders iconography',
    type: 'image',
  },
];

// Gallery data for Dailymotion case study
export const DAILYMOTION_GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.png',
    caption: 'Platform Overview',
    captionDesc: 'Dailymotion Partner Platform',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/dailymotion/dailymotion_focus_upload_2x.webp',
    caption: 'Video Upload',
    captionDesc: 'Upload management interface',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_focus_livestream_2x.webp',
    caption: 'Live Dashboard',
    captionDesc: 'Real-time streaming monitor',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_focus_player_template_2x.webp',
    caption: 'Player Manager',
    captionDesc: 'Player customization tools',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_upload2x.png',
    caption: 'Batch Upload',
    captionDesc: 'Parallel upload with real-time feedback',
    type: 'image',
  },
  {
    src: '/videos/dailymotion/video_-_cancel_upload.mp4',
    caption: 'Cancel Upload',
    captionDesc: 'Smooth cancellation flow',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4',
    caption: 'Thumbnail Update',
    captionDesc: 'Instant thumbnail preview update',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/video_add_subtitle.mp4',
    caption: 'Add Subtitles',
    captionDesc: 'Streamlined subtitle upload',
    type: 'video',
  },
  {
    src: '/images/dailymotion/dailymotion_-_video_manager.svg',
    caption: 'Video Library',
    captionDesc: 'Bulk media management',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4',
    caption: 'Embed Code',
    captionDesc: 'Copy interaction and feedback',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/switch_12-24.mp4',
    caption: 'Time Picker',
    captionDesc: '12/24H switch interaction',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4',
    caption: 'Password Protection',
    captionDesc: 'Secure video access workflow',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/Geoblocking.mp4',
    caption: 'Geoblocking',
    captionDesc: 'Location-based access control',
    type: 'video',
  },
  {
    src: '/images/dailymotion/dailymotion_-_share_expanded2x.png',
    caption: 'Share Modal',
    captionDesc: 'Full embed customization options',
    type: 'image',
  },
  {
    src: '/images/dailymotion/Share_-_keyboard_input2x.png',
    caption: 'Keyboard Mapping',
    captionDesc: 'Share modal specifications',
    type: 'image',
  },
  {
    src: '/images/dailymotion/image.png',
    caption: 'Start Time Input',
    captionDesc: 'Keyboard input specifications',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.png',
    caption: 'Add to Playlist',
    captionDesc: 'Playlist management flow',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_live_-_countdown2x.png',
    caption: 'Pre-broadcast Countdown',
    captionDesc: 'Scheduled start with OFF AIR badge',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_livestream2x.png',
    caption: 'Live Dashboard',
    captionDesc: 'Real-time broadcast monitoring',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/dailymotion/dailymotion_-_create_player2x.png',
    caption: 'Player Configurator',
    captionDesc: 'Define appearance and retrieve embed code',
    type: 'image',
  },
  {
    src: '/images/dailymotion/design_system_-_Styles2x.png',
    caption: 'UI Kit - Styles',
    captionDesc: 'Foundation for coherent product suite',
    type: 'image',
  },
  {
    src: '/images/dailymotion/design_system_-_component_library2x.png',
    caption: 'UI Kit - Components',
    captionDesc: 'Scalable component library',
    type: 'image',
  },
];

// Connect Gallery Items
export const CONNECT_GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/connect/connect_overview.webp',
    caption: 'Connect Overview',
    captionDesc: 'Web-based dashboard concept for classroom orchestration',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp',
    caption: 'Dashboard Home (Dark)',
    captionDesc: 'Main dashboard interface with quick actions and class status',
    type: 'image',
  },
  {
    src: '/images/connect/connect_dashboard_home_light_full-scaled.webp',
    caption: 'Dashboard Home (Light)',
    captionDesc: 'Light theme variant for different lighting conditions',
    type: 'image',
  },
  {
    src: '/images/connect/connect_dashboard_applications_full-scaled.webp',
    caption: 'Applications Dashboard',
    captionDesc: 'App catalog for browsing and deploying applications',
    type: 'image',
  },
  {
    src: '/videos/connect/connect-loading-user-authent-app-launch-study.mp4',
    caption: 'Connection & Auth Flow',
    captionDesc: 'User authentication and app launching choreography',
    type: 'video',
  },
  {
    src: '/videos/connect/connect-dashboard-prototype_complet_4k.mp4',
    caption: 'Dashboard Prototype',
    captionDesc: 'Full interaction walkthrough demonstrating modular capabilities',
    type: 'video',
  },
  {
    src: '/images/connect/connect_tech_architecture-1-scaled.webp',
    caption: 'Technical Architecture',
    captionDesc: 'System overview showing web dashboard integration',
    type: 'image',
  },
  {
    src: '/images/connect/connect_specifications_implem_01-scaled.webp',
    caption: 'Implementation Specs',
    captionDesc: 'Detailed specifications for developer handoff',
    type: 'image',
  },
  {
    src: '/images/connect/connect_specifications_content_02-scaled.webp',
    caption: 'Content Specifications',
    captionDesc: 'Content strategy documentation for interface elements',
    type: 'image',
  },
  {
    src: '/videos/connect/connect-specs-app-loading-choregraphy.mp4',
    caption: 'App Loading Choreography',
    captionDesc: 'Animation specifications for smooth transitions',
    type: 'video',
  },
  {
    src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp',
    caption: 'La Bulle - Wireframes',
    captionDesc: 'Early exploration of the bubble interaction model',
    type: 'image',
  },
  {
    src: '/images/connect/connect_bulle_ui_focus-scaled.webp',
    caption: 'La Bulle - UI Focus',
    captionDesc: 'Detailed view of the bubble expanded state',
    type: 'image',
  },
  {
    src: '/images/connect/connect_bulle_icons-1-scaled.webp',
    caption: 'La Bulle - Icons',
    captionDesc: 'Custom icon set for the contextual menu',
    type: 'image',
  },
  {
    src: '/images/connect/connect_bulle_behaviour_square_01-scaled.webp',
    caption: 'La Bulle - Behavior (1)',
    captionDesc: 'Animation states and interaction patterns',
    type: 'image',
  },
  {
    src: '/images/connect/connect_bulle_behaviour_square_02-scaled.webp',
    caption: 'La Bulle - Behavior (2)',
    captionDesc: 'Edge cases and system integration specs',
    type: 'image',
  },
  {
    src: '/videos/connect/interaction-bulle-connect.mp4',
    caption: 'La Bulle - Interaction Demo',
    captionDesc: 'Motion prototype of bubble opening animation',
    type: 'video',
  },
  {
    src: '/videos/connect/Video-demo-bulle-interactions-02.mp4',
    caption: 'La Bulle - Full Demo',
    captionDesc: 'Complete demonstration of bubble capabilities',
    type: 'video',
  },
];

// French translations for gallery items
export const TOOLKIT_GALLERY_ITEMS_FR: GalleryItem[] = TOOLKIT_GALLERY_ITEMS.map(item => ({
  ...item,
  caption: {
    'Toolkit App Overview': 'Vue d\'ensemble Toolkit',
    'Product Evolution': 'Évolution produit',
    'Problem Statement': 'Énoncé du problème',
    'Research Phase': 'Phase de recherche',
    'Design Foundation': 'Fondation design',
    'Project Creation Workflow': 'Workflow de création projet',
    'Interaction Principles': 'Principes d\'interaction',
    'Business Impact': 'Impact business',
    'Magic Link Authentication': 'Authentification Magic Link',
    'Project Index': 'Index des projets',
    'Project Details': 'Détails du projet',
    'Create Project Modal': 'Modal de création projet',
    'Tasks List': 'Liste des tâches',
    'Task Sequence': 'Séquence de tâches',
    'Planning V1': 'Planning V1',
    'Planning V2': 'Planning V2',
    'Dynamic Menu System': 'Système de menu dynamique',
    'Mobile Menu Evolution': 'Évolution menu mobile',
    'Dynamic Island Menu': 'Menu île dynamique',
    'Activity Section': 'Section activité',
    'Design System': 'Design System',
    'Icon System': 'Système d\'icônes',
  }[item.caption] || item.caption,
  captionDesc: {
    'Vue d\'ensemble de l\'application Toolkit': 'Maturité plateforme avec interfaces web et mobile',
    '12 months of product iteration': '12 mois d\'itération produit',
    'Initial pain points and challenges': 'Points de friction initiaux et défis',
    'User research and discovery': 'Recherche utilisateur et découverte',
    'Core design principles': 'Principes de design fondamentaux',
    'Streamlined project setup flow': 'Flux de configuration projet simplifié',
    'Core UX patterns': 'Patterns UX fondamentaux',
    'Measured outcomes': 'Résultats mesurés',
    'Passwordless login flow': 'Flux de connexion sans mot de passe',
    'Main dashboard view': 'Vue dashboard principale',
    'Detailed project view': 'Vue détaillée du projet',
    'New project creation': 'Création de nouveau projet',
    'Task management interface': 'Interface de gestion des tâches',
    'Sequential task workflow': 'Workflow de tâches séquentielles',
    'Initial planning interface': 'Interface de planning initiale',
    'Improved planning view': 'Vue de planning améliorée',
    'Component and interface patterns': 'Patterns de composants et interface',
    'Mobile navigation iterations': 'Itérations de navigation mobile',
    'Task modification interface': 'Interface de modification de tâches',
    'Task activity behavior': 'Comportement de section activité',
    'UI component library': 'Bibliothèque de composants UI',
    'Files and folders iconography': 'Iconographie fichiers et dossiers',
  }[item.captionDesc || ''] || item.captionDesc,
}));

export const DAILYMOTION_GALLERY_ITEMS_FR: GalleryItem[] = DAILYMOTION_GALLERY_ITEMS.map(item => ({
  ...item,
  caption: {
    'Platform Overview': 'Vue d\'ensemble plateforme',
    'Video Upload': 'Upload vidéo',
    'Live Dashboard': 'Dashboard live',
    'Player Manager': 'Gestionnaire de player',
    'Batch Upload': 'Upload par lot',
    'Cancel Upload': 'Annuler l\'upload',
    'Thumbnail Update': 'Mise à jour vignette',
    'Add Subtitles': 'Ajouter sous-titres',
    'Video Library': 'Bibliothèque vidéo',
    'Embed Code': 'Code embed',
    'Time Picker': 'Sélecteur d\'heure',
    'Password Protection': 'Protection par mot de passe',
    'Geoblocking': 'Geoblocking',
    'Share Modal': 'Modal de partage',
    'Keyboard Mapping': 'Mapping clavier',
    'Start Time Input': 'Input heure de début',
    'Add to Playlist': 'Ajouter à la playlist',
    'Pre-broadcast Countdown': 'Compte à rebours pré-diffusion',
    'Live Monitoring': 'Monitoring live',
    'Player Configurator': 'Configurateur de player',
    'UI Kit - Styles': 'UI Kit - Styles',
    'UI Kit - Components': 'UI Kit - Composants',
  }[item.caption] || item.caption,
  captionDesc: {
    'Dailymotion Partner Platform': 'Plateforme Partenaires Dailymotion',
    'Upload management interface': 'Interface de gestion d\'upload',
    'Real-time streaming monitor': 'Moniteur de streaming temps réel',
    'Player customization tools': 'Outils de personnalisation player',
    'Parallel upload with real-time feedback': 'Upload parallèle avec feedback temps réel',
    'Smooth cancellation flow': 'Flux d\'annulation fluide',
    'Instant thumbnail preview update': 'Mise à jour instantanée de la vignette',
    'Streamlined subtitle upload': 'Upload de sous-titres simplifié',
    'Bulk media management': 'Gestion média en masse',
    'Input copy interaction': 'Interaction de copie',
    '12/24H format switch': 'Switch format 12/24H',
    'Secure video access': 'Accès vidéo sécurisé',
    'Location-based restrictions': 'Restrictions géographiques',
    'Embed customization options': 'Options de personnalisation embed',
    'Share modal specifications': 'Spécifications modal partage',
    'Keyboard input specifications': 'Spécifications saisie clavier',
    'Playlist management flow': 'Flux gestion playlist',
    'Scheduled broadcast countdown': 'Compte à rebours diffusion programmée',
    'Active broadcast metrics': 'Métriques diffusion active',
    'Player template creation': 'Création template player',
    'Foundation for product suite': 'Fondation pour la suite produit',
    'Scalable component library': 'Bibliothèque de composants scalable',
  }[item.captionDesc || ''] || item.captionDesc,
}));

export const CONNECT_GALLERY_ITEMS_FR: GalleryItem[] = CONNECT_GALLERY_ITEMS.map(item => ({
  ...item,
  caption: {
    'Connect Overview': 'Vue d\'ensemble Connect',
    'Dashboard Home (Dark)': 'Dashboard accueil (sombre)',
    'Dashboard Home (Light)': 'Dashboard accueil (clair)',
    'Applications Dashboard': 'Dashboard applications',
    'Connection & Auth Flow': 'Flux connexion & auth',
    'Dashboard Prototype': 'Prototype dashboard',
    'Technical Architecture': 'Architecture technique',
    'Implementation Specs': 'Specs d\'implémentation',
    'Content Specifications': 'Spécifications de contenu',
    'App Loading Choreography': 'Chorégraphie de chargement',
    'La Bulle - Wireframes': 'La Bulle - Wireframes',
    'La Bulle - UI Focus': 'La Bulle - Focus UI',
    'La Bulle - Icons': 'La Bulle - Icônes',
    'La Bulle - Behavior (1)': 'La Bulle - Comportement (1)',
    'La Bulle - Behavior (2)': 'La Bulle - Comportement (2)',
    'La Bulle - Interaction Demo': 'La Bulle - Démo d\'interaction',
    'La Bulle - Full Demo': 'La Bulle - Démo complète',
  }[item.caption] || item.caption,
  captionDesc: {
    'Web-based dashboard concept for classroom orchestration': 'Concept de dashboard web pour l\'orchestration de classe',
    'Main dashboard interface with quick actions and class status': 'Interface dashboard principale avec actions rapides et statut classe',
    'Light theme variant for different lighting conditions': 'Variante thème clair pour différentes conditions d\'éclairage',
    'App catalog for browsing and deploying applications': 'Catalogue d\'apps pour parcourir et déployer',
    'User authentication and app launching choreography': 'Authentification et chorégraphie de lancement d\'app',
    'Full interaction walkthrough demonstrating modular capabilities': 'Walkthrough complet démontrant les capacités modulaires',
    'System overview showing web dashboard integration': 'Vue système montrant l\'intégration du dashboard web',
    'Detailed specifications for developer handoff': 'Spécifications détaillées pour handoff développeur',
    'Content strategy documentation for interface elements': 'Documentation stratégie de contenu pour éléments d\'interface',
    'Animation specifications for smooth transitions': 'Spécifications d\'animation pour transitions fluides',
    'Early exploration of the bubble interaction model': 'Exploration initiale du modèle d\'interaction bulle',
    'Detailed view of the bubble expanded state': 'Vue détaillée de l\'état étendu de la bulle',
    'Custom icon set for the contextual menu': 'Set d\'icônes personnalisé pour menu contextuel',
    'Animation states and interaction patterns': 'États d\'animation et patterns d\'interaction',
    'Edge cases and system integration specs': 'Cas limites et specs d\'intégration système',
    'Motion prototype of bubble opening animation': 'Prototype motion de l\'animation d\'ouverture',
    'Complete demonstration of bubble capabilities': 'Démonstration complète des capacités de la bulle',
  }[item.captionDesc || ''] || item.captionDesc,
}));

// SQOOL Gallery Items
export const SQOOL_GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/sqool/hero_ecosystem_sqool.webp',
    caption: 'SQOOL Ecosystem Overview',
    captionDesc: 'The complete suite of applications designed for French schools',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.jpg',
    caption: 'Back-to-school distribution',
    captionDesc: 'Ile-de-France region deploying 500,000 devices to students',
    type: 'image',
  },
  {
    src: '/images/sqool/image-unowhy-shootingphoto-tablette.jpg',
    caption: 'SQOOL tablet',
    captionDesc: 'Student device designed for education',
    type: 'image',
  },
  {
    src: '/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.jpg',
    caption: 'Device features',
    captionDesc: 'Marking the tablet functionalities for users',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_legacy_launcher.webp',
    caption: 'Legacy Android Launcher',
    captionDesc: 'The original monolithic launcher that reached its technical ceiling',
    type: 'image',
  },
  {
    src: '/images/sqool/hi sqool/004 003-hp-scroll-2x.png',
    caption: 'Hi-SQOOL Dashboard',
    captionDesc: 'Early redesign targeting high-school audiences',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_connect_prototype.webp',
    caption: 'Connect Vision Prototype',
    captionDesc: 'High-fidelity React demonstrator for web-first validation',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/sqool/sqool_bulle_interaction.webp',
    caption: 'La Bulle Concept',
    captionDesc: 'Persistent, animated, context-aware overlay for system shortcuts',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_design_system.webp',
    caption: 'SQOOL Design System',
    captionDesc: 'Tokens, color, grid rules, and component library',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/sqool/sqool_classe.webp',
    caption: 'SQOOL Classe',
    captionDesc: 'Real-time classroom activity supervision and device control',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_partage.webp',
    caption: 'SQOOL Partage',
    captionDesc: 'Document and resource sharing between teachers and students',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_applications.webp',
    caption: 'SQOOL Applications',
    captionDesc: 'App catalog browsing, access, and distribution',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_mdm.webp',
    caption: 'SQOOL MDM',
    captionDesc: 'Device fleet management for IT administrators',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_evolution_timeline.webp',
    caption: 'Evolution Timeline',
    captionDesc: 'Full 2018-2024 strategic transformation journey',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/sqool/sqool_brand_evolution.webp',
    caption: 'Brand Evolution',
    captionDesc: 'Visual identity transformation over six years',
    type: 'image',
  },
  {
    src: '/images/sqool/sqool_impact.webp',
    caption: 'Impact Metrics',
    captionDesc: 'Measurable results from the ecosystem transformation',
    type: 'image',
  },
];

export const SQOOL_GALLERY_ITEMS_FR: GalleryItem[] = SQOOL_GALLERY_ITEMS.map(item => ({
  ...item,
  caption: {
    'SQOOL Ecosystem Overview': 'Vue d\'ensemble ecosysteme SQOOL',
    'Back-to-school distribution': 'Distribution de rentree',
    'SQOOL tablet': 'Tablette SQOOL',
    'Device features': 'Fonctionnalites appareils',
    'Legacy Android Launcher': 'Launcher Android legacy',
    'Hi-SQOOL Dashboard': 'Dashboard Hi-SQOOL',
    'Connect Vision Prototype': 'Prototype vision Connect',
    'La Bulle Concept': 'Concept La Bulle',
    'SQOOL Design System': 'Design System SQOOL',
    'SQOOL Classe': 'SQOOL Classe',
    'SQOOL Partage': 'SQOOL Partage',
    'SQOOL Applications': 'SQOOL Applications',
    'SQOOL MDM': 'SQOOL MDM',
    'Evolution Timeline': 'Timeline d\'evolution',
    'Brand Evolution': 'Evolution de marque',
    'Impact Metrics': 'Metriques d\'impact',
  }[item.caption] || item.caption,
  captionDesc: {
    'The complete suite of applications designed for French schools': 'La suite complete d\'applications concue pour les ecoles francaises',
    'Ile-de-France region deploying 500,000 devices to students': 'La Region Ile-de-France distribue 500 000 appareils aux eleves',
    'Student device designed for education': 'Appareil concu pour l\'education',
    'Marking the tablet functionalities for users': 'Marquage des fonctionnalites sur les tablettes',
    'The original monolithic launcher that reached its technical ceiling': 'Le launcher monolithique original ayant atteint son plafond technique',
    'Early redesign targeting high-school audiences': 'Refonte initiale ciblant les audiences lycee',
    'High-fidelity React demonstrator for web-first validation': 'Demonstrateur React haute-fidelite pour validation web-first',
    'Persistent, animated, context-aware overlay for system shortcuts': 'Surcouche persistante, animee et contextuelle pour raccourcis systeme',
    'Tokens, color, grid rules, and component library': 'Tokens, couleur, regles de grille et bibliotheque de composants',
    'Real-time classroom activity supervision and device control': 'Supervision d\'activite de classe en temps reel et controle des appareils',
    'Document and resource sharing between teachers and students': 'Partage de documents et ressources entre enseignants et eleves',
    'App catalog browsing, access, and distribution': 'Navigation, acces et distribution du catalogue d\'applications',
    'Device fleet management for IT administrators': 'Gestion de flotte d\'appareils pour administrateurs IT',
    'Full 2018-2024 strategic transformation journey': 'Parcours complet de transformation strategique 2018-2024',
    'Visual identity transformation over six years': 'Transformation de l\'identite visuelle sur six ans',
    'Measurable results from the ecosystem transformation': 'Resultats mesurables de la transformation ecosysteme',
  }[item.captionDesc || ''] || item.captionDesc,
}));

// Helper function to get gallery items by language
export const getToolkitGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] =>
  lang === 'fr' ? TOOLKIT_GALLERY_ITEMS_FR : TOOLKIT_GALLERY_ITEMS;

export const getDailymotionGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] =>
  lang === 'fr' ? DAILYMOTION_GALLERY_ITEMS_FR : DAILYMOTION_GALLERY_ITEMS;

export const getConnectGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] =>
  lang === 'fr' ? CONNECT_GALLERY_ITEMS_FR : CONNECT_GALLERY_ITEMS;

export const getSqoolGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] =>
  lang === 'fr' ? SQOOL_GALLERY_ITEMS_FR : SQOOL_GALLERY_ITEMS;

export default BentoGallery;
