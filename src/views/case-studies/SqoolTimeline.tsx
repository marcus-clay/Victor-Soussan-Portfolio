// SqoolTimeline - Interactive timeline and carousel component
// Apple-style design with clean typography and subtle animations

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight, Stack as Layers, Clock } from '@phosphor-icons/react';
import { SQOOL_TIMELINE_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolTimelineTranslations';

interface SqoolTimelineProps {
  lang: 'en' | 'fr';
}

const TRANSLATIONS = SQOOL_TIMELINE_TRANSLATIONS;

export const SqoolTimeline: React.FC<SqoolTimelineProps> = ({ lang }) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'carousel'>('timeline');
  const [activePhase, setActivePhase] = useState(0);
  // Preview card: hover (mouse), focus (keyboard) or selection (touch tap)
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [focusedPhase, setFocusedPhase] = useState<number | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const pointerType = useRef<string>('mouse');
  const t = TRANSLATIONS[lang];
  const phases = t.phases;

  const previewPhase = hoveredPhase ?? focusedPhase ?? selectedPhase;

  // Carousel navigation
  const goToPhase = (index: number) => {
    setActivePhase(Math.max(0, Math.min(phases.length - 1, index)));
  };

  const nextPhase = () => goToPhase(activePhase + 1);
  const prevPhase = () => goToPhase(activePhase - 1);

  const changeView = (mode: 'timeline' | 'carousel') => {
    // The nodes unmount with the timeline: drop any hover, focus or selection left behind
    setHoveredPhase(null);
    setFocusedPhase(null);
    setSelectedPhase(null);
    setViewMode(mode);
  };

  const openPhase = (index: number) => {
    setActivePhase(index);
    changeView('carousel');
  };

  // Keyboard navigation, scoped to the carousel widget
  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevPhase();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextPhase();
    }
  };

  const preview = previewPhase !== null ? phases[previewPhase] : null;

  return (
    <div className="w-full text-gray-900">
      {/* View Toggle */}
      <div className="flex justify-start mb-8">
        <div className="inline-flex p-1 rounded-full bg-gray-100">
          <button
            onClick={() => changeView('timeline')}
            aria-pressed={viewMode === 'timeline'}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium active:scale-[0.97] transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'timeline'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900'
            }`}
          >
            <Clock size={16} />
            {t.timeline}
          </button>
          <button
            onClick={() => changeView('carousel')}
            aria-pressed={viewMode === 'carousel'}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium active:scale-[0.97] transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'carousel'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-900'
            }`}
          >
            <Layers size={16} />
            {t.carousel}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'timeline' ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Timeline View */}
            <div className="relative">
              {/* Phase nodes: the connecting line lives in each node's dot row, so it always meets the dots */}
              <div className="flex">
                {phases.map((phase, index) => {
                  const isPreviewed = previewPhase === index;
                  return (
                    <motion.button
                      key={phase.id}
                      type="button"
                      aria-expanded={isPreviewed}
                      className="group flex flex-col items-center cursor-pointer min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
                      style={{ width: `${100 / phases.length}%` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.32, delay: 0.2 + index * 0.07 }}
                      onPointerDown={(e) => { pointerType.current = e.pointerType; }}
                      onKeyDown={() => { pointerType.current = 'keyboard'; }}
                      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHoveredPhase(index); }}
                      onPointerLeave={() => setHoveredPhase(null)}
                      onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) setFocusedPhase(index); }}
                      onBlur={() => setFocusedPhase(null)}
                      onClick={() => {
                        // Touch: a tap selects the phase, the preview offers the jump to the carousel
                        if (pointerType.current === 'touch' || pointerType.current === 'pen') {
                          setSelectedPhase(prev => (prev === index ? null : index));
                        } else {
                          openPhase(index);
                        }
                      }}
                    >
                      {/* Phase number: the order matters, the years do not */}
                      <span className="text-xs tabular-nums text-gray-500 mb-3">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Dot row with the line segments */}
                      <span className="relative flex items-center justify-center w-full h-4">
                        {index > 0 && (
                          <span aria-hidden="true" className="absolute left-0 right-1/2 top-1/2 h-[2px] -translate-y-1/2 bg-gray-200" />
                        )}
                        {index < phases.length - 1 && (
                          <span aria-hidden="true" className="absolute left-1/2 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gray-200" />
                        )}
                        <span
                          className={`relative z-10 w-4 h-4 rounded-full bg-white border-[2px] transition-[border-color,transform] duration-150 [@media(hover:hover)]:group-hover:scale-110 ${
                            isPreviewed ? 'border-gray-600' : 'border-gray-300 [@media(hover:hover)]:group-hover:border-gray-600'
                          }`}
                        />
                      </span>

                      {/* Phase Content */}
                      <span className="mt-5 block text-center px-2">
                        <span className="block text-xs font-medium text-gray-900 mb-0.5">
                          {phase.title}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {phase.subtitle}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Preview card (single, below the nodes, so it never overflows on narrow screens) */}
              <div className="mt-10 min-h-[9.5rem] flex flex-col items-stretch justify-start" aria-live="polite">
                <AnimatePresence mode="wait">
                  {preview ? (
                    <motion.div
                      key={previewPhase}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="w-full p-5 md:p-6 rounded-2xl border border-gray-100 bg-white"
                    >
                      <p className="text-base text-gray-600 mb-4 max-w-[62ch]">
                        {preview.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {preview.items.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                          >
                            {item.title}
                          </span>
                        ))}
                        {preview.items.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">
                            +{preview.items.length - 3}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => openPhase(previewPhase as number)}
                        className="mt-3 inline-flex items-center gap-1.5 min-h-11 text-sm text-gray-500 [@media(hover:hover)]:hover:text-gray-900 active:scale-[0.97] transition-[color,transform] duration-150"
                      >
                        {t.openPhase}
                        <ChevronRight size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm text-gray-500"
                    >
                      {t.hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Carousel View */}
            <div
              className="relative"
              role="group"
              aria-roledescription="carousel"
              aria-label={t.carouselLabel}
              tabIndex={0}
              onKeyDown={handleCarouselKeyDown}
            >
              {/* Carousel Content */}
              <div className="overflow-hidden" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="w-full"
                  >
                    <div className="p-8 md:p-10 rounded-2xl border border-gray-100 bg-gray-50">
                      {/* Phase Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <div className="flex-1">
                          {/* Phase Number */}
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-baseline gap-2 mb-4"
                          >
                            <span className="text-title-2 text-gray-900">
                              {String(activePhase + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm text-gray-500">
                              / {String(phases.length).padStart(2, '0')}
                            </span>
                          </motion.div>

                          {/* Phase number */}
                          <motion.p
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-xs text-gray-500 mb-3"
                          >
                            {String(activePhase + 1).padStart(2, '0')}
                          </motion.p>

                          {/* Title */}
                          <motion.h4
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-title-3 text-gray-900 mb-1"
                          >
                            {phases[activePhase].title}
                          </motion.h4>

                          {/* Subtitle */}
                          <motion.p
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-sm text-gray-500"
                          >
                            {phases[activePhase].subtitle}
                          </motion.p>
                        </div>
                      </div>

                      {/* Description */}
                      <motion.p
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-base text-gray-600 mb-8 max-w-[62ch]"
                      >
                        {phases[activePhase].description}
                      </motion.p>

                      {/* Items List */}
                      <motion.div
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="divide-y divide-gray-100"
                      >
                        {phases[activePhase].items.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="py-3 border-b border-gray-100 last:border-0"
                          >
                            <h5 className="text-sm font-medium text-gray-900 mb-0.5">
                              {item.title}
                            </h5>
                            {item.description && (
                              <p className="text-sm text-gray-600 max-w-[62ch]">
                                {item.description}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls: previous, dots, next, in one row under the card */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={prevPhase}
                  disabled={activePhase === 0}
                  aria-label={t.previous}
                  className={`p-3 rounded-full bg-gray-100 transition-[background-color,color,transform] duration-200 ease-out ${
                    activePhase === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : '[@media(hover:hover)]:hover:bg-gray-200 active:scale-[0.97]'
                  }`}
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Dots Navigation (44px hit area, small visual dot) */}
                <div className="flex justify-center">
                  {phases.map((phase, index) => (
                    <button
                      key={index}
                      onClick={() => goToPhase(index)}
                      aria-label={`${index + 1}. ${phase.title}`}
                      aria-current={activePhase === index ? 'true' : undefined}
                      className="group flex items-center justify-center min-h-11 min-w-11"
                    >
                      <span
                        className={`block h-2 rounded-full transition-[width,background-color,transform] duration-200 ease-out ${
                          activePhase === index
                            ? 'w-8 bg-gray-900'
                            : 'w-2 bg-black/15 [@media(hover:hover)]:group-hover:scale-125'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPhase}
                  disabled={activePhase === phases.length - 1}
                  aria-label={t.next}
                  className={`p-3 rounded-full bg-gray-100 transition-[background-color,color,transform] duration-200 ease-out ${
                    activePhase === phases.length - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : '[@media(hover:hover)]:hover:bg-gray-200 active:scale-[0.97]'
                  }`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Phase Labels Below Dots */}
              <div className="flex flex-wrap justify-center gap-x-4 mt-1">
                {phases.map((phase, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhase(index)}
                    className={`min-h-11 px-2 text-xs font-medium active:scale-[0.97] transition-[color,transform] duration-150 ${
                      activePhase === index
                        ? 'text-gray-900'
                        : 'text-gray-500 [@media(hover:hover)]:hover:text-gray-600'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolTimeline;
