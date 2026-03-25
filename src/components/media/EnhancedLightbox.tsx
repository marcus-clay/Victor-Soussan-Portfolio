/**
 * EnhancedLightbox - Desktop & Mobile optimized lightbox
 *
 * Desktop:
 * - Cursor with magnifying glass icon
 * - Single click to zoom to full width (scrollable height)
 * - Click again to dezoom (smooth transition)
 * - Keyboard navigation (arrows, escape)
 *
 * Mobile:
 * - Tap opens image with caption
 * - Double-tap to zoom at tap location
 * - Pan gesture when zoomed
 * - Double-tap to dezoom
 * - Swipe down to close
 * - Swipe left/right to navigate
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo, useMotionValue, LayoutGroup } from 'framer-motion';
import { X, CaretLeft as ChevronLeft, CaretRight as ChevronRight, MagnifyingGlassPlus as ZoomIn, MagnifyingGlassMinus as ZoomOut } from '@phosphor-icons/react';

export interface LightboxImage {
  src: string;
  caption?: string;
  type?: 'image' | 'video';
}

interface EnhancedLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  lang?: 'en' | 'fr';
  videoStartTime?: number;
  /** Project ID for URL generation (e.g., 'toolkit', 'dailymotion') */
  projectId?: string;
  /** Whether to update browser URL when navigating images */
  updateUrl?: boolean;
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 35
};

const EnhancedLightbox: React.FC<EnhancedLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  lang = 'fr',
  videoStartTime = 0,
  projectId,
  updateUrl = false
}) => {
  // State
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragY, setDragY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Animation controls
  const controls = useAnimation();
  const dragX = useMotionValue(0);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef<number>(0);
  const doubleTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set video start time when lightbox opens with a video
  useEffect(() => {
    const currentImg = images[currentIndex];
    if (isOpen && currentImg?.type === 'video' && videoRef.current && videoStartTime > 0) {
      videoRef.current.currentTime = videoStartTime;
    }
  }, [isOpen, currentIndex, videoStartTime, images]);

  // Translations
  const t = {
    close: lang === 'fr' ? 'Fermer' : 'Close',
    swipeHint: lang === 'fr' ? 'Glisser pour fermer' : 'Swipe to close',
    tapToZoom: lang === 'fr' ? 'Double-tap pour zoomer' : 'Double-tap to zoom',
    clickToZoom: lang === 'fr' ? 'Cliquez pour agrandir' : 'Click to enlarge',
    clickToShrink: lang === 'fr' ? 'Cliquez pour réduire' : 'Click to shrink',
    counter: (idx: number, total: number) => `${idx + 1} / ${total}`
  };

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowHint(false), 2500);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setShowHint(true);
      resetState();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset zoom when changing images
  useEffect(() => {
    resetState();
  }, [currentIndex]);

  // Update URL when image changes (for SEO and shareability)
  useEffect(() => {
    if (!isOpen || !updateUrl || !projectId) return;

    const currentImg = images[currentIndex];
    const mediaType = currentImg?.type === 'video' ? 'video' : 'image';
    const mediaUrl = `/project/${projectId}/media/${mediaType}/${currentIndex + 1}`;

    // Update URL without triggering navigation
    window.history.replaceState(
      { project: projectId, mediaIndex: currentIndex, mediaType },
      '',
      mediaUrl
    );
  }, [isOpen, currentIndex, projectId, updateUrl, images]);

  // Restore URL when lightbox closes
  const handleClose = useCallback(() => {
    if (updateUrl && projectId) {
      // Restore the gallery URL when closing
      window.history.replaceState(
        { project: projectId, viewMode: 'gallery' },
        '',
        `/project/${projectId}/gallery`
      );
    }
    onClose();
  }, [onClose, updateUrl, projectId]);

  // Keyboard navigation - capture phase prevents App.tsx global Escape from closing parent modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        if (isZoomed) {
          resetState();
        } else {
          handleClose();
        }
        return;
      }
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1 && !isZoomed) {
        setSlideDirection('left');
        onIndexChange(currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0 && !isZoomed) {
        setSlideDirection('right');
        onIndexChange(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, currentIndex, images.length, handleClose, onIndexChange, isZoomed]);

  // Reset all state
  const resetState = useCallback(() => {
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setDragY(0);
    controls.start({ scale: 1, x: 0, y: 0 });
    // Reset scroll position
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [controls]);

  // Desktop: Single click to toggle zoom
  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    e.stopPropagation();

    if (isZoomed) {
      // Dezoom with smooth animation
      setIsZoomed(false);
      // Scroll to top when dezooming
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Zoom in
      setIsZoomed(true);
    }
  }, [isMobile, isZoomed]);

  // Mobile: Handle double-tap zoom
  const handleMobileDoubleTap = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    e.stopPropagation();

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (doubleTapTimeout.current) {
      clearTimeout(doubleTapTimeout.current);
      doubleTapTimeout.current = null;
    }

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      lastTap.current = 0;

      if (isZoomed) {
        // Zoom out
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setIsZoomed(false);
        controls.start({ scale: 1, x: 0, y: 0 });
      } else {
        // Zoom in to tap location
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect || !e.changedTouches[0]) return;

        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;

        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;

        const newScale = 2.5;
        const newX = -x * (newScale - 1);
        const newY = -y * (newScale - 1);

        setScale(newScale);
        setPosition({ x: newX, y: newY });
        setIsZoomed(true);
        controls.start({ scale: newScale, x: newX, y: newY });
      }
    } else {
      lastTap.current = now;
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = null;
      }, DOUBLE_TAP_DELAY);
    }
  }, [isMobile, isZoomed, controls]);

  // Handle vertical drag for swipe-to-close (mobile only)
  const handleDragY = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed || !isMobile) return;
    setDragY(info.offset.y);
  }, [isZoomed, isMobile]);

  // Combined drag end handler for mobile - determines intent from gesture direction
  const handleCombinedDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;

    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    if (absX > absY) {
      // Horizontal swipe → navigate between images
      const threshold = 50;
      if (info.offset.x < -threshold || info.velocity.x < -500) {
        if (currentIndex < images.length - 1) {
          setSlideDirection('left');
          onIndexChange(currentIndex + 1);
        }
      } else if (info.offset.x > threshold || info.velocity.x > 500) {
        if (currentIndex > 0) {
          setSlideDirection('right');
          onIndexChange(currentIndex - 1);
        }
      }
    } else {
      // Vertical swipe → close lightbox
      const threshold = 100;
      if ((info.offset.y > threshold || info.velocity.y > 500) && isMobile) {
        handleClose();
      } else if (isMobile) {
        setDragY(0);
        controls.start({ y: 0 });
      }
    }
    dragX.set(0);
  }, [isZoomed, currentIndex, images.length, onIndexChange, isMobile, handleClose, controls, dragX]);


  // Handle pan when zoomed (mobile)
  const handlePanWhenZoomed = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isZoomed || !isMobile) return;
    setPosition(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  }, [isZoomed, isMobile]);

  // Calculate background opacity based on drag
  const backgroundOpacity = isMobile ? Math.max(0.3, 1 - Math.abs(dragY) / 250) : 1;

  // Navigate functions
  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setSlideDirection('left');
      resetState();
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, images.length, onIndexChange, resetState]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setSlideDirection('right');
      resetState();
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange, resetState]);

  // Slide animation variants with parallax effect (iOS Photos style)
  const slideVariants = {
    enter: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? 500 : direction === 'right' ? -500 : 0,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
      opacity: 0,
      scale: 0.95
    })
  };

  const slideTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 28,
    mass: 0.8
  };

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ touchAction: 'none' }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: backgroundOpacity }}
            onClick={!isZoomed ? handleClose : undefined}
          />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isZoomed && isMobile ? 0 : 1,
              y: 0,
              pointerEvents: isZoomed && isMobile ? 'none' : 'auto'
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20 before:absolute before:inset-[-12px] before:content-['']"
            aria-label={t.close}
          >
            <X size={24} />
          </motion.button>

          {/* Desktop: Zoom/Unzoom button */}
          {!isMobile && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); handleDesktopClick(e); }}
              className="absolute top-4 left-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20"
              aria-label={isZoomed ? t.clickToShrink : t.clickToZoom}
            >
              {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </motion.button>
          )}

          {/* Navigation arrows - hidden on mobile or when zoomed */}
          {!isMobile && !isZoomed && (
            <>
              {currentIndex > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={springTransition}
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft size={28} />
                </motion.button>
              )}

              {currentIndex < images.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={springTransition}
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight size={28} />
                </motion.button>
              )}
            </>
          )}

          {/* Main content container */}
          <LayoutGroup>
          {isMobile ? (
            // Mobile: Gesture-based container
            <motion.div
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              drag={!isZoomed}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDrag={handleDragY}
              onDragEnd={handleCombinedDragEnd}
              animate={controls}
              style={{ y: isZoomed ? 0 : dragY }}
            >
              <AnimatePresence mode="popLayout" custom={slideDirection}>
                <motion.div
                  key={currentIndex}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="flex flex-col items-center max-w-[95vw] px-4"
                >
                  <motion.div
                    animate={{
                      scale: isZoomed ? scale : 1,
                      x: isZoomed ? position.x : 0,
                      y: isZoomed ? position.y : 0
                    }}
                    transition={springTransition}
                    onTouchEnd={handleMobileDoubleTap}
                    onPan={isZoomed ? handlePanWhenZoomed : undefined}
                    className="relative"
                    style={{ touchAction: 'none' }}
                  >
                    {currentImage.type === 'video' ? (
                      <video
                        ref={videoRef}
                        src={currentImage.src}
                        className="max-w-full max-h-[60vh] object-contain rounded-3xl shadow-2xl"
                        controls
                        playsInline
                        autoPlay
                        onClick={(e) => {
                          const vid = e.currentTarget;
                          const wasPlaying = !vid.paused;
                          setTimeout(() => {
                            if (wasPlaying && vid.paused) vid.play();
                          }, 0);
                        }}
                      />
                    ) : (
                      <img loading="lazy"
                        src={currentImage.src}
                        alt={currentImage.caption || ''}
                        className="max-w-full max-h-[60vh] object-contain rounded-3xl shadow-2xl select-none"
                        draggable={false}
                      />
                    )}
                  </motion.div>

                  {/* Caption below media - mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isZoomed ? 0 : 1,
                      y: isZoomed ? 10 : 0
                    }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="mt-5 text-center max-w-full px-2"
                  >
                    {currentImage.caption && (
                      <p className="text-white/90 text-sm font-medium leading-relaxed mb-2">
                        {currentImage.caption}
                      </p>
                    )}
                    <p className="text-white/40 text-xs tracking-wide">
                      {t.counter(currentIndex, images.length)}
                      {!isZoomed && (
                        <span className="ml-2">
                          • {t.tapToZoom}
                        </span>
                      )}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            // Desktop: Scrollable container when zoomed
            <div
              ref={scrollContainerRef}
              className={`relative w-full h-full flex ${
                isZoomed
                  ? 'overflow-y-auto overflow-x-hidden items-start justify-center py-8'
                  : 'overflow-hidden items-center justify-center'
              }`}
              onClick={(e) => {
                // Only close if clicking background, not image
                if (e.target === e.currentTarget && !isZoomed) {
                  handleClose();
                }
              }}
            >
              <AnimatePresence mode="popLayout" custom={slideDirection}>
                <motion.div
                  key={currentIndex}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className={`flex flex-col items-center ${isZoomed ? 'w-full max-w-[95vw]' : 'max-w-[85vw]'}`}
                >
                  {/* Media container with shared element transition */}
                  <motion.div
                    layoutId={`lightbox-media-${currentIndex}`}
                    onClick={handleDesktopClick}
                    className="relative"
                    style={{
                      cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                    }}
                    transition={{
                      layout: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30
                      }
                    }}
                  >
                    {currentImage.type === 'video' ? (
                      <video
                        ref={videoRef}
                        src={currentImage.src}
                        className={`${isZoomed ? 'w-full h-auto max-w-[95vw]' : 'max-w-[85vw] max-h-[65vh] object-contain'} rounded-3xl shadow-2xl`}
                        controls
                        playsInline
                        autoPlay
                        onClick={(e) => {
                          // Prevent native click from pausing during zoom toggle
                          // Resume playback immediately if the click was for zooming
                          const vid = e.currentTarget;
                          const wasPlaying = !vid.paused;
                          setTimeout(() => {
                            if (wasPlaying && vid.paused) {
                              vid.play();
                            }
                          }, 0);
                        }}
                      />
                    ) : (
                      <motion.img
                        layoutId={`lightbox-img-${currentIndex}`}
                        src={currentImage.src}
                        alt={currentImage.caption || ''}
                        className={`${isZoomed ? 'w-full h-auto max-w-[95vw]' : 'max-w-[85vw] max-h-[65vh] object-contain'} rounded-3xl shadow-2xl select-none`}
                        draggable={false}
                        transition={{
                          layout: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 30
                          }
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Caption below media - only visible when not zoomed */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isZoomed ? 0 : 1,
                      y: isZoomed ? 10 : 0
                    }}
                    transition={{ duration: 0.2, delay: isZoomed ? 0 : 0.15 }}
                    className="mt-6 text-center max-w-3xl px-4"
                  >
                    {currentImage.caption && (
                      <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed mb-2">
                        {currentImage.caption}
                      </p>
                    )}
                    <p className="text-white/40 text-xs tracking-wide">
                      {t.counter(currentIndex, images.length)}
                      {!isZoomed && (
                        <span className="ml-2">
                          • {t.clickToZoom}
                        </span>
                      )}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          </LayoutGroup>

          {/* Navigation indicator - dots for small sets, counter for large sets */}
          {images.length > 1 && !isZoomed && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              {images.length <= 20 ? (
                <div className="flex items-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        resetState();
                        onIndexChange(idx);
                      }}
                      className={`rounded-full transition-all duration-200 ${
                        idx === currentIndex
                          ? 'bg-white w-6 h-2'
                          : 'bg-white/30 hover:bg-white/50 w-2 h-2'
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-medium tracking-wide">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>
          )}

          {/* Mobile swipe hint */}
          <AnimatePresence>
            {isMobile && showHint && !isZoomed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-1 rounded-full bg-white/40"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedLightbox;
