import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PrototypeCard from './PrototypeCard';
import { PrototypeItem, getIframeSrc } from '../../data/sqoolPrototypesData';

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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const activeProto = prototypes[activeIndex];

  // Ref callback to ensure iframeRef is always current across key changes
  const setIframeRef = useCallback((node: HTMLIFrameElement | null) => {
    iframeRef.current = node;
  }, []);

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(index);
    setIframeLoaded(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setIframeLoaded(false);
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex < prototypes.length - 1) {
      setActiveIndex(activeIndex + 1);
      setIframeLoaded(false);
    }
  }, [activeIndex, prototypes.length]);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    // Give ui-motion time to initialize before sending play
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage('play', '*');
    }, 1000);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handlePrev, handleNext]);

  // Remaining prototypes (all except active)
  const gridPrototypes = prototypes
    .map((proto, index) => ({ proto, index }))
    .filter(({ index }) => index !== activeIndex);

  return (
    <div className="relative">
      {/* Active player */}
      {activeProto && (
        <motion.div
          key={activeProto.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`rounded-xl overflow-hidden mb-6 ${
            isDark
              ? 'bg-[#1C1C1E] border border-white/[0.08]'
              : 'bg-[#F2F2F7] border border-black/[0.06]'
          }`}
        >
          {/* Iframe */}
          <div className="relative" style={{ paddingBottom: '75%' }}>
            {!iframeLoaded && (
              <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]'}`}>
                <div className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${isDark ? 'border-white/20' : 'border-black/10'}`} />
              </div>
            )}
            <iframe
              ref={setIframeRef}
              key={activeProto.id}
              src={getIframeSrc(activeProto.id)}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              onLoad={handleIframeLoad}
              title={activeProto.title[lang]}
              allow="fullscreen"
            />
          </div>

          {/* Minimal nav bar below iframe */}
          <div className={`flex items-center justify-center gap-3 px-4 py-2 ${
            isDark ? 'border-t border-white/[0.06]' : 'border-t border-black/[0.04]'
          }`}>
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-1.5 rounded-lg transition-colors ${
                activeIndex === 0
                  ? 'opacity-20 cursor-default'
                  : isDark
                    ? 'hover:bg-white/10 text-white/40'
                    : 'hover:bg-black/5 text-black/30'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className={`text-xs tabular-nums ${isDark ? 'text-white/30' : 'text-black/30'}`}>
              {activeIndex + 1} / {prototypes.length}
            </span>
            <button
              onClick={handleNext}
              disabled={activeIndex === prototypes.length - 1}
              className={`p-1.5 rounded-lg transition-colors ${
                activeIndex === prototypes.length - 1
                  ? 'opacity-20 cursor-default'
                  : isDark
                    ? 'hover:bg-white/10 text-white/40'
                    : 'hover:bg-black/5 text-black/30'
              }`}
            >
              <ChevronRight size={16} />
            </button>
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
