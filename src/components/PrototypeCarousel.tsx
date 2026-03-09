import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PrototypeCard from './PrototypeCard';
import { PrototypeItem, getIframeSrc } from '../data/sqoolPrototypesData';

interface PrototypeCarouselProps {
  prototypes: PrototypeItem[];
  isDark: boolean;
  lang: 'en' | 'fr';
  onCardClick: (index: number) => void;
}

const PrototypeCarousel: React.FC<PrototypeCarouselProps> = ({
  prototypes,
  isDark,
  lang,
  onCardClick,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const activeProto = prototypes[activeIndex];

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(index);
    setIframeLoaded(false);
    // Smooth scroll to top of component
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(0);
    setIframeLoaded(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setIframeLoaded(false);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex < prototypes.length - 1) {
      setActiveIndex(activeIndex + 1);
      setIframeLoaded(false);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeIndex, prototypes.length]);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    // Give ui-motion time to initialize before sending play
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage('play', '*');
    }, 600);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleClose, handlePrev, handleNext]);

  // Remaining prototypes (all except active)
  const gridPrototypes = prototypes
    .map((proto, index) => ({ proto, index }))
    .filter(({ index }) => index !== activeIndex);

  return (
    <div ref={containerRef} className="relative">
      {/* Active player */}
      {activeProto && (
        <motion.div
          key={activeProto.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl overflow-hidden mb-6 ${
            isDark
              ? 'bg-[#1C1C1E] ring-1 ring-white/[0.08]'
              : 'bg-[#F2F2F7] ring-1 ring-black/[0.04]'
          }`}
        >
          {/* Player header */}
          <div className={`flex items-center justify-between px-4 py-2.5 ${
            isDark ? 'border-b border-white/[0.06]' : 'border-b border-black/[0.04]'
          }`}>
            <div className="flex items-center gap-3 min-w-0">
              <span className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded ${
                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-700'
              }`}>
                {activeProto.id}
              </span>
              <span className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeProto.title[lang]}
              </span>
              <span className={`text-xs hidden md:inline ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                {activeIndex + 1} / {prototypes.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {activeIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10 text-white/40' : 'hover:bg-black/5 text-black/30'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              {activeIndex < prototypes.length - 1 && (
                <button
                  onClick={handleNext}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10 text-white/40' : 'hover:bg-black/5 text-black/30'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              )}
              <button
                onClick={handleClose}
                className={`p-1.5 rounded-lg transition-colors ml-1 ${
                  isDark ? 'hover:bg-white/10 text-white/40' : 'hover:bg-black/5 text-black/30'
                }`}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div className="relative" style={{ paddingBottom: '66%' }}>
            {!iframeLoaded && (
              <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]'}`}>
                <div className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-white/20' : 'border-black/10'}`} />
              </div>
            )}
            <iframe
              ref={iframeRef}
              key={activeProto.id}
              src={getIframeSrc(activeProto.id)}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              onLoad={handleIframeLoad}
              title={activeProto.title[lang]}
              allow="fullscreen"
            />
          </div>

          {/* Description bar */}
          <div className={`px-4 py-3 ${
            isDark ? 'border-t border-white/[0.06]' : 'border-t border-black/[0.04]'
          }`}>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-white/40' : 'text-black/40'}`}>
              {activeProto.desc[lang]}
            </p>
          </div>
        </motion.div>
      )}

      {/* 2-column grid of remaining prototypes */}
      {gridPrototypes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gridPrototypes.map(({ proto, index }) => (
            <div
              key={proto.id}
              className={`relative rounded-xl transition-all duration-200 ${
                index === activeIndex
                  ? isDark
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0a0a0a]'
                    : 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white'
                  : ''
              }`}
            >
              <PrototypeCard
                prototypeId={proto.id}
                title={proto.title[lang]}
                description={proto.desc[lang]}
                category={proto.category}
                isDark={isDark}
                onClick={() => handleCardClick(index)}
                compact
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrototypeCarousel;
