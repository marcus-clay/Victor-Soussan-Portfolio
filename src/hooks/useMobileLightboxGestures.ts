import { useState, useRef, useCallback, useEffect } from 'react';
import { useAnimation, PanInfo } from 'framer-motion';

interface UseMobileLightboxGesturesOptions {
  isOpen: boolean;
  onClose: () => void;
  onZoomChange?: (zoomed: boolean) => void;
}

interface UseMobileLightboxGesturesReturn {
  // State
  isZoomed: boolean;
  scale: number;
  position: { x: number; y: number };
  dragY: number;
  backgroundOpacity: number;
  isMobile: boolean;
  showUI: boolean;

  // Controls
  controls: ReturnType<typeof useAnimation>;

  // Handlers
  handleDoubleTap: (e: React.MouseEvent | React.TouchEvent) => void;
  handleDragY: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleDragYEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handlePanWhenZoomed: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  resetZoom: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Hook for mobile-specific lightbox gestures:
 * - Double-tap to zoom in/out
 * - Swipe down to close
 * - Pan when zoomed
 * - UI fades when zoomed
 */
export const useMobileLightboxGestures = ({
  isOpen,
  onClose,
  onZoomChange
}: UseMobileLightboxGesturesOptions): UseMobileLightboxGesturesReturn => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragY, setDragY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  // Reset state when lightbox closes
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setDragY(0);
    }
  }, [isOpen]);

  // Notify parent of zoom changes
  useEffect(() => {
    onZoomChange?.(isZoomed);
  }, [isZoomed, onZoomChange]);

  // Handle double-tap detection and zoom
  const handleDoubleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isOpen || !isMobile) return;

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
          clientX = rect.width / 2 + rect.left;
          clientY = rect.height / 2 + rect.top;
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
    } else {
      lastTap.current = now;
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = null;
      }, DOUBLE_TAP_DELAY);
    }
  }, [isOpen, isMobile, isZoomed, controls]);

  // Handle vertical drag for swipe-to-close
  const handleDragY = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed || !isMobile) return;
    setDragY(info.offset.y);
  }, [isZoomed, isMobile]);

  // Handle drag end - close if swiped down enough
  const handleDragYEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed || !isMobile) return;

    const threshold = 100;
    const velocity = info.velocity.y;

    if (info.offset.y > threshold || velocity > 500) {
      onClose();
    } else {
      setDragY(0);
      controls.start({ y: 0 });
    }
  }, [isZoomed, isMobile, onClose, controls]);

  // Handle pan when zoomed
  const handlePanWhenZoomed = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isZoomed || !isMobile) return;
    setPosition(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  }, [isZoomed, isMobile]);

  // Reset zoom
  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    controls.start({ scale: 1, x: 0, y: 0 });
  }, [controls]);

  // Calculate opacity based on drag distance
  const backgroundOpacity = isMobile ? Math.max(0, 1 - Math.abs(dragY) / 300) : 1;

  // Show UI when not zoomed
  const showUI = !isZoomed;

  return {
    isZoomed,
    scale,
    position,
    dragY,
    backgroundOpacity,
    isMobile,
    showUI,
    controls,
    handleDoubleTap,
    handleDragY,
    handleDragYEnd,
    handlePanWhenZoomed,
    resetZoom,
    containerRef
  };
};

export default useMobileLightboxGestures;
