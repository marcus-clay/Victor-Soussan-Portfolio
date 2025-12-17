import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileLightboxProps {
  src: string;
  alt?: string;
  type?: 'image' | 'video';
  poster?: string;
  className?: string;
  children?: React.ReactNode;
}

const MobileLightbox = ({
  src,
  alt = '',
  type = 'image',
  poster,
  className = '',
  children
}: MobileLightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragY, setDragY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const controls = useAnimation();
  const lastTap = useRef<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);
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
    } else {
      document.body.style.overflow = '';
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

  // Open lightbox with WhatsApp-style animation
  const handleOpen = useCallback(() => {
    if (!isMobile) return;
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
        // Single tap confirmed - do nothing in lightbox view
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
  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;
    setDragY(info.offset.y);
  }, [isZoomed]);

  // Handle drag end - close if swiped down enough
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
  const handlePan = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isZoomed) return;
    setPosition(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  }, [isZoomed]);

  // Calculate opacity based on drag distance
  const backgroundOpacity = Math.max(0, 1 - Math.abs(dragY) / 300);

  // If not mobile, just render children or default element
  if (!isMobile) {
    if (children) {
      return <>{children}</>;
    }
    return type === 'video' ? (
      <video src={src} poster={poster} className={className} controls playsInline />
    ) : (
      <img loading="lazy" src={src} alt={alt} className={className} />
    );
  }

  return (
    <>
      {/* Trigger element */}
      <div
        onClick={handleOpen}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
      >
        {children || (
          type === 'video' ? (
            <video src={src} poster={poster} className={className} playsInline muted />
          ) : (
            <img loading="lazy" src={src} alt={alt} className={className} loading="lazy" />
          )
        )}
      </div>

      {/* Lightbox Modal */}
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

            {/* Close button - fades when zoomed */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isZoomed ? 0 : 1,
                scale: 1,
                pointerEvents: isZoomed ? 'none' : 'auto'
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors before:absolute before:inset-[-12px] before:content-['']"
            >
              <X size={24} />
            </motion.button>

            {/* Image/Video container */}
            <motion.div
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              drag={!isZoomed ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              animate={controls}
              style={{ y: isZoomed ? 0 : dragY }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: scale,
                  opacity: 1,
                  x: position.x,
                  y: position.y
                }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  opacity: { duration: 0.2 }
                }}
                onClick={handleTap}
                onTouchEnd={handleTap}
                onPan={isZoomed ? handlePan : undefined}
                className="max-w-full max-h-full"
                style={{ touchAction: 'none' }}
              >
                {type === 'video' ? (
                  <video
                    ref={imageRef as any}
                    src={src}
                    poster={poster}
                    className="max-w-full max-h-[90vh] object-contain"
                    controls
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img loading="lazy"
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[90vh] object-contain select-none"
                    draggable={false}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Swipe indicator - shows when not zoomed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isZoomed ? 0 : 0.5,
                y: 0,
                pointerEvents: 'none'
              }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xs flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-6 rounded-full bg-white/30"
              />
              <span>Glisser pour fermer</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileLightbox;
