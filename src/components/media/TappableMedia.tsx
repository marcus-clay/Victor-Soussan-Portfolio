import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import { X } from '@phosphor-icons/react';

interface TappableMediaProps {
  children: React.ReactNode;
  src: string;
  alt?: string;
  type?: 'image' | 'video';
  poster?: string;
}

/**
 * Wrapper component that adds WhatsApp-style tap-to-zoom behavior on mobile
 * - Tap to open fullscreen
 * - Double-tap to zoom in/out
 * - Swipe down to close
 */
const TappableMedia = ({
  children,
  src,
  alt = '',
  type = 'image',
  poster
}: TappableMediaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragY, setDragY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const controls = useAnimation();
  const lastTap = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const doubleTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Hide hint after 2 seconds
      const timer = setTimeout(() => setShowHint(false), 2000);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setShowHint(true);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Open lightbox
  const handleOpen = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
    setDragY(0);
  }, [isMobile]);

  // Close lightbox
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setDragY(0);
  }, []);

  // Handle tap/double-tap detection
  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (doubleTapTimeout.current) {
      clearTimeout(doubleTapTimeout.current);
      doubleTapTimeout.current = null;
    }

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      lastTap.current = 0;
      handleDoubleTap(e);
    } else {
      // Single tap - wait to see if it's a double tap
      lastTap.current = now;
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = null;
      }, DOUBLE_TAP_DELAY);
    }
  }, []);

  // Handle double-tap zoom
  const handleDoubleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isOpen) return;

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
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('changedTouches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = rect.width / 2;
        clientY = rect.height / 2;
      }

      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;

      const newScale = 2.5;
      setScale(newScale);
      setPosition({ x: -x * (newScale - 1), y: -y * (newScale - 1) });
      setIsZoomed(true);
      controls.start({
        scale: newScale,
        x: -x * (newScale - 1),
        y: -y * (newScale - 1)
      });
    }
  }, [isOpen, isZoomed, controls]);

  // Handle drag for swipe-to-close
  const handleDrag = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;
    setDragY(info.offset.y);
  }, [isZoomed]);

  // Handle drag end
  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;

    const threshold = 100;
    const velocity = info.velocity.y;

    if (info.offset.y > threshold || velocity > 500) {
      handleClose();
    } else {
      setDragY(0);
      controls.start({ y: 0 });
    }
  }, [isZoomed, handleClose, controls]);

  // Handle pan when zoomed
  const handlePan = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isZoomed) return;
    setPosition(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  }, [isZoomed]);

  // Calculate opacity based on drag distance
  const backgroundOpacity = Math.max(0, 1 - Math.abs(dragY) / 300);

  // If not mobile, just render children
  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Trigger element */}
      <div
        onClick={handleOpen}
        onTouchEnd={handleOpen}
        className="cursor-pointer"
        style={{ touchAction: 'manipulation' }}
      >
        {children}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ touchAction: 'none' }}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 bg-black"
              style={{ opacity: backgroundOpacity }}
              onClick={!isZoomed ? handleClose : undefined}
            />

            {/* Close button - fades when zoomed */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: isZoomed ? 0 : 1,
                y: 0,
                pointerEvents: isZoomed ? 'none' : 'auto'
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors active:bg-white/20 before:absolute before:inset-[-12px] before:content-['']"
            >
              <X size={24} />
            </motion.button>

            {/* Image/Video container */}
            <motion.div
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              drag={!isZoomed ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              animate={controls}
              style={{ y: isZoomed ? 0 : dragY }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: scale,
                  opacity: 1,
                  x: position.x,
                  y: position.y
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 35,
                  opacity: { duration: 0.2 }
                }}
                onClick={handleTap}
                onPan={isZoomed ? handlePan : undefined}
                className="max-w-full max-h-full px-4"
                style={{ touchAction: 'none' }}
              >
                {type === 'video' ? (
                  <video
                    src={src}
                    poster={poster}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                    controls
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img loading="lazy"
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[85vh] object-contain select-none rounded-lg"
                    draggable={false}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Swipe hint indicator */}
            <AnimatePresence>
              {showHint && !isZoomed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xs flex flex-col items-center gap-2 pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-8 h-1 rounded-full bg-white/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TappableMedia;
