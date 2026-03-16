import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CaretLeft as ChevronLeft, CaretRight as ChevronRight, Play, Pause, ArrowCounterClockwise as RotateCcw } from '@phosphor-icons/react';
import { getIframeSrc } from '../../data/sqoolPrototypesData';

interface PrototypeLightboxItem {
  id: string;
  title: string;
  desc: string;
}

interface PrototypeLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  prototypes: PrototypeLightboxItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

// States: ready = iframe loaded showing first frame, playing = animation running
type PlayerState = 'loading' | 'ready' | 'playing' | 'paused';

const PrototypeLightbox: React.FC<PrototypeLightboxProps> = ({
  isOpen,
  onClose,
  prototypes,
  currentIndex,
  onIndexChange,
}) => {
  const [direction, setDirection] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>('loading');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const current = prototypes[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < prototypes.length - 1;

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= prototypes.length) return;
    setDirection(index > currentIndex ? 1 : -1);
    setPlayerState('loading');
    setIframeLoaded(false);
    onIndexChange(index);
  }, [currentIndex, prototypes.length, onIndexChange]);

  const goPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);

  // Reset state when prototype changes
  useEffect(() => {
    setPlayerState('loading');
    setIframeLoaded(false);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) goPrev();
      if (e.key === 'ArrowRight' && hasNext) goNext();
    };
    document.addEventListener('keydown', handleKey, { capture: true });
    return () => document.removeEventListener('keydown', handleKey, { capture: true });
  }, [isOpen, onClose, hasPrev, hasNext, goPrev, goNext]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 60) {
      if (diff > 0 && hasPrev) goPrev();
      if (diff < 0 && hasNext) goNext();
    }
    setTouchStart(null);
  }, [touchStart, hasPrev, hasNext, goPrev, goNext]);

  const handlePlay = useCallback(() => {
    if (playerState === 'ready' || playerState === 'paused') {
      iframeRef.current?.contentWindow?.postMessage('play', '*');
      setPlayerState('playing');
    }
  }, [playerState]);

  const handlePause = useCallback(() => {
    if (playerState === 'playing') {
      iframeRef.current?.contentWindow?.postMessage('pause', '*');
      setPlayerState('paused');
    }
  }, [playerState]);

  const handleRestart = useCallback(() => {
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      setIframeLoaded(false);
      setPlayerState('loading');
      requestAnimationFrame(() => {
        if (iframeRef.current) {
          iframeRef.current.src = src;
        }
      });
    }
  }, []);

  // Iframe loaded: show first frame, do NOT auto-play
  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    setPlayerState('ready');
  }, []);

  if (!current) return null;

  const showPlayOverlay = playerState === 'ready';
  const showControls = playerState === 'playing' || playerState === 'paused';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 md:px-6 py-3 flex-shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs font-bold text-blue-400 bg-blue-400/20 px-2 py-0.5 rounded">
                {current.id}
              </span>
              <span className="text-sm font-medium text-white truncate">
                {current.title}
              </span>
              <span className="text-xs text-gray-400 hidden md:inline">
                {currentIndex + 1} / {prototypes.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main content area */}
          <div
            className="flex-1 relative flex items-center px-2 md:px-16 pb-4"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left arrow */}
            {hasPrev && (
              <button
                onClick={goPrev}
                className="absolute left-2 md:left-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Iframe container */}
            <div className="w-full h-full relative rounded-lg overflow-hidden">
              {/* Loading spinner */}
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-[#1D1D1F] flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full relative"
                >
                  {/* Iframe: always loaded (with autoplay=0, shows first frame) */}
                  <iframe
                    ref={iframeRef}
                    src={getIframeSrc(current.id)}
                    className={`w-full h-full transition-opacity duration-300 ${
                      iframeLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      border: 'none',
                      pointerEvents: showPlayOverlay ? 'none' : 'auto',
                    }}
                    title={current.title}
                    onLoad={handleIframeLoad}
                    tabIndex={-1}
                  />

                  {/* Play button overlay (first frame visible, not yet playing) */}
                  {showPlayOverlay && (
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                        <Play size={28} weight="fill" className="ml-1 text-gray-900" />
                      </div>
                    </button>
                  )}

                  {/* Playback controls */}
                  {showControls && (
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                      {playerState === 'playing' ? (
                        <button
                          onClick={handlePause}
                          className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
                        >
                          <Pause size={16} weight="fill" />
                        </button>
                      ) : (
                        <button
                          onClick={handlePlay}
                          className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
                        >
                          <Play size={16} weight="fill" className="ml-0.5" />
                        </button>
                      )}
                      <button
                        onClick={handleRestart}
                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            {hasNext && (
              <button
                onClick={goNext}
                className="absolute right-2 md:right-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Bottom: caption + dots */}
          <div className="flex flex-col items-center pb-4 flex-shrink-0 px-4" onClick={e => e.stopPropagation()}>
            <p className="text-sm text-gray-300 mb-3 text-center max-w-md">
              {current.desc}
            </p>
            {prototypes.length <= 12 ? (
              <div className="flex gap-1.5">
                {prototypes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentIndex
                        ? 'w-6 h-2 bg-white'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-gray-400">
                {currentIndex + 1} / {prototypes.length}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrototypeLightbox;
