/**
 * EnhancedLightbox - Mobile-optimized lightbox with WhatsApp-style gestures
 *
 * Features:
 * - Tap to open (on mobile)
 * - Double-tap to zoom in/out
 * - Swipe down to close
 * - Swipe left/right to navigate
 * - UI fades when zoomed
 * - Pinch to zoom (native)
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo, useMotionValue } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  lang = 'fr'
}) => {
  // Mobile gesture state
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragY, setDragY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Animation controls
  const controls = useAnimation();
  const dragX = useMotionValue(0);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef<number>(0);
  const doubleTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Translations
  const t = {
    close: lang === 'fr' ? 'Fermer' : 'Close',
    swipeHint: lang === 'fr' ? 'Glisser pour fermer' : 'Swipe to close',
    tapToZoom: lang === 'fr' ? 'Double-tap pour zoomer' : 'Double-tap to zoom',
    counter: (idx: number, total: number) => `${idx + 1} / ${total}`
  };

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Hide hint after a delay
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onIndexChange(currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  // Reset all state
  const resetState = useCallback(() => {
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setDragY(0);
    controls.start({ scale: 1, x: 0, y: 0 });
  }, [controls]);

  // Handle double-tap zoom
  const handleDoubleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
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
        if (!rect) return;

        let clientX: number, clientY: number;
        if ('changedTouches' in e && e.changedTouches.length > 0) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
        } else if ('clientX' in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        } else {
          clientX = rect.width / 2 + rect.left;
          clientY = rect.height / 2 + rect.top;
        }

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

  // Handle vertical drag for swipe-to-close
  const handleDragY = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed || !isMobile) return;
    setDragY(info.offset.y);
  }, [isZoomed, isMobile]);

  // Handle drag end - close if swiped down enough
  const handleDragYEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;

    const threshold = 100;
    const velocity = info.velocity.y;

    if ((info.offset.y > threshold || velocity > 500) && isMobile) {
      onClose();
    } else if (isMobile) {
      setDragY(0);
      controls.start({ y: 0 });
    }
  }, [isZoomed, isMobile, onClose, controls]);

  // Handle horizontal drag for navigation (desktop + mobile non-zoomed)
  const handleDragXEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;

    const threshold = 50;
    const velocity = 500;

    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      // Swiped left - go to next
      if (currentIndex < images.length - 1) {
        onIndexChange(currentIndex + 1);
      }
    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
      // Swiped right - go to previous
      if (currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      }
    }
    dragX.set(0);
  }, [isZoomed, currentIndex, images.length, onIndexChange, dragX]);

  // Handle pan when zoomed
  const handlePanWhenZoomed = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isZoomed) return;
    setPosition(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  }, [isZoomed]);

  // Calculate background opacity based on drag
  const backgroundOpacity = isMobile ? Math.max(0.3, 1 - Math.abs(dragY) / 250) : 1;

  // Navigate functions
  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      resetState();
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, images.length, onIndexChange, resetState]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      resetState();
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange, resetState]);

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
            onClick={!isZoomed ? onClose : undefined}
          />

          {/* Close button - fades when zoomed on mobile */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isZoomed && isMobile ? 0 : 1,
              y: 0,
              pointerEvents: isZoomed && isMobile ? 'none' : 'auto'
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20"
            aria-label={t.close}
          >
            <X size={24} />
          </motion.button>

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
          <motion.div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            drag={!isZoomed ? (isMobile ? 'y' : 'x') : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            onDrag={isMobile ? handleDragY : undefined}
            onDragEnd={isMobile ? handleDragYEnd : handleDragXEnd}
            animate={controls}
            style={{ y: isZoomed ? 0 : (isMobile ? dragY : 0) }}
          >
            {/* Image/Video */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: isZoomed ? scale : 1,
                opacity: 1,
                x: isZoomed ? position.x : 0,
                y: isZoomed ? position.y : 0
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={springTransition}
              onClick={handleDoubleTap}
              onPan={isZoomed ? handlePanWhenZoomed : undefined}
              className="relative max-w-[95vw] md:max-w-[85vw] max-h-[85vh] px-4"
              style={{ touchAction: 'none' }}
            >
              {currentImage.type === 'video' ? (
                <video
                  src={currentImage.src}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  controls
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={currentImage.src}
                  alt={currentImage.caption || ''}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
                  draggable={false}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Caption and counter - fades when zoomed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isZoomed && isMobile ? 0 : 1,
              y: 0,
              pointerEvents: isZoomed && isMobile ? 'none' : 'auto'
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="absolute bottom-16 md:bottom-8 left-4 right-4 text-center z-10"
          >
            {currentImage.caption && (
              <p className="text-white/90 text-sm md:text-base mb-2 line-clamp-2">
                {currentImage.caption}
              </p>
            )}
            <p className="text-white/50 text-xs">
              {t.counter(currentIndex, images.length)}
              {isMobile && !isZoomed && ` • ${t.tapToZoom}`}
            </p>
          </motion.div>

          {/* Dots indicator - hidden when zoomed */}
          {images.length > 1 && !isZoomed && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
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
