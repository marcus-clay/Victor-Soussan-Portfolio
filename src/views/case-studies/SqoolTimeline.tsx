// SqoolTimeline - Interactive timeline and carousel component
// Apple-style design with clean typography and subtle animations

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight, Stack as Layers, Clock } from '@phosphor-icons/react';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { SQOOL_TIMELINE_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolTimelineTranslations';

interface SqoolTimelineProps {
  lang: 'en' | 'fr';
  isDark: boolean;
  onImageClick?: (src: string) => void;
}

const TRANSLATIONS = SQOOL_TIMELINE_TRANSLATIONS;

// Neutral palette — all phases use the same gray tone
const PHASE_COLORS = [
  { color: '#6B7280', colorLight: '#9CA3AF' },
  { color: '#6B7280', colorLight: '#9CA3AF' },
  { color: '#6B7280', colorLight: '#9CA3AF' },
  { color: '#6B7280', colorLight: '#9CA3AF' },
];

export const SqoolTimeline: React.FC<SqoolTimelineProps> = ({ lang, isDark, onImageClick: _onImageClick }) => {
  useEffect(() => {
    const seo = PROJECT_SEO['sqool'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('sqool', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const [viewMode, setViewMode] = useState<'timeline' | 'carousel'>('timeline');
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];
  const phases = t.phases;

  // Carousel navigation
  const goToPhase = (index: number) => {
    setActivePhase(Math.max(0, Math.min(phases.length - 1, index)));
  };

  const nextPhase = () => goToPhase(activePhase + 1);
  const prevPhase = () => goToPhase(activePhase - 1);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'carousel') return;
      if (e.key === 'ArrowLeft') prevPhase();
      if (e.key === 'ArrowRight') nextPhase();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, activePhase]);

  return (
    <div className="w-full text-gray-900">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-full bg-gray-100">
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'timeline'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Clock size={16} />
            {t.timeline}
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out ${
              viewMode === 'carousel'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Timeline View */}
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="relative px-4 md:px-8">
                {/* Background line */}
                <div className="absolute top-[60px] left-0 right-0 h-[2px] bg-gray-200" />

                {/* Progress line */}
                <motion.div
                  className="absolute top-[60px] left-0 h-[2px] bg-gray-300"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />

                {/* Phase Points */}
                <div className="relative flex justify-between">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: `${100 / phases.length}%` }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.15 }}
                      onMouseEnter={() => setHoveredPhase(index)}
                      onMouseLeave={() => setHoveredPhase(null)}
                      onClick={() => {
                        setActivePhase(index);
                        setViewMode('carousel');
                      }}
                    >
                      {/* Year Label */}
                      <span className="text-xs text-gray-400 mb-3">
                        {phase.period}
                      </span>

                      {/* Point */}
                      <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <div
                          className="w-4 h-4 rounded-full bg-white border-[2px] border-gray-300 transition-[border-color] duration-150 group-hover:border-gray-600"
                        />
                      </motion.div>

                      {/* Phase Content */}
                      <div className="mt-5 text-center px-2">
                        <h3 className="text-xs font-medium text-gray-900 mb-0.5">
                          {phase.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {phase.subtitle}
                        </p>
                      </div>

                      {/* Expanded Preview on Hover */}
                      <AnimatePresence>
                        {hoveredPhase === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-4 w-64 md:w-72 p-4 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-xl z-20"
                            style={{
                              left: '50%',
                              transform: 'translateX(-50%)',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                            }}
                          >
                            <p className="text-base text-gray-600 mb-3">
                              {phase.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {phase.items.slice(0, 3).map((item, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                                >
                                  {item.title}
                                </span>
                              ))}
                              {phase.items.length > 3 && (
                                <span className="text-xs px-2 py-1 text-gray-400">
                                  +{phase.items.length - 3}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Click hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center mt-12 text-sm text-gray-400"
              >
                {lang === 'fr' ? 'Cliquez sur une phase pour voir les détails' : 'Click on a phase to see details'}
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Carousel View */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevPhase}
                disabled={activePhase === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-[background-color,color,transform] duration-200 ease-out ${
                  activePhase === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-100 hover:scale-105'
                } bg-gray-100 hover:bg-gray-200`}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextPhase}
                disabled={activePhase === phases.length - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-[background-color,color,transform] duration-200 ease-out ${
                  activePhase === phases.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-100 hover:scale-105'
                } bg-gray-100 hover:bg-gray-200`}
              >
                <ChevronRight size={24} />
              </button>

              {/* Carousel Content */}
              <div className="overflow-hidden px-12 md:px-16">
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
                            <span className="text-2xl font-semibold tracking-[-0.01em] text-gray-900">
                              {String(activePhase + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm text-gray-400">
                              / {String(phases.length).padStart(2, '0')}
                            </span>
                          </motion.div>

                          {/* Period */}
                          <motion.p
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-xs text-gray-400 mb-3"
                          >
                            {phases[activePhase].period}
                          </motion.p>

                          {/* Title */}
                          <motion.h2
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1"
                          >
                            {phases[activePhase].title}
                          </motion.h2>

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
                        className="text-base text-gray-500 leading-relaxed mb-8 max-w-[65ch]"
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
                            <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                              {item.title}
                            </h4>
                            {item.description && (
                              <p className="text-xs text-gray-500 leading-relaxed">
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

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {phases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhase(index)}
                    className={`transition-[background-color,color,transform] duration-200 ease-out rounded-full ${
                      activePhase === index
                        ? 'w-8 h-2'
                        : 'w-2 h-2 hover:scale-125'
                    }`}
                    style={{
                      backgroundColor: activePhase === index
                        ? '#111827'
                        : 'rgba(0,0,0,0.15)'
                    }}
                  />
                ))}
              </div>

              {/* Phase Labels Below Dots */}
              <div className="flex justify-center gap-8 mt-4">
                {phases.map((phase, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhase(index)}
                    className={`text-xs font-medium transition-colors duration-150 ${
                      activePhase === index
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {phase.period}
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
