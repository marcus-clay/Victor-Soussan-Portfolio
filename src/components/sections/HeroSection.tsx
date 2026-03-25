'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

interface HeroSectionProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  content: {
    hero: {
      availability: string;
      tagline: string;
      title: string;
      subtitle: string;
      positioning: string;
      desc: string;
    };
  };
  Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }>;
  scrollToSection: (id: string) => void;
  openModalWithUrl: (path: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  content,
  scrollToSection,
  openModalWithUrl,
}) => {
  return (
    <header className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-10 overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[-10%] top-[-20%] w-[50%] h-[50%] rounded-full blur-[120px] bg-blue-300/20" />
        <div className="absolute right-[20%] top-[10%] w-[25%] h-[25%] rounded-full blur-[100px] bg-indigo-300/15" />
        <div className="absolute left-[-15%] bottom-[-10%] w-[45%] h-[45%] rounded-full blur-[120px] bg-indigo-300/20" />
        <div className="absolute left-[30%] bottom-[20%] w-[20%] h-[20%] rounded-full blur-[80px] bg-violet-300/12" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/70 to-transparent" />
      </div>

      <div className="relative max-w-[1200px] mx-auto z-10 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
          {/* Left: Text content */}
          <motion.div
            className="flex-1 pt-2.5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {/* Availability Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center relative z-20 px-3 py-1.5 rounded-full mb-8 bg-white/70 border border-gray-200/60"
              style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium ml-2 text-gray-600">
                {content.hero.availability}
              </span>
            </motion.div>

            {/* Main Tagline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] mb-4 md:mb-6 leading-[1.05] text-[#1D1D1F]"
            >
              {content.hero.tagline}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg sm:text-xl md:text-2xl font-medium mb-3 text-[#1D1D1F]"
            >
              {content.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{content.hero.subtitle}</span>
            </motion.p>

            {/* Positioning */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-sm md:text-base text-gray-500 mb-4"
            >
              {content.hero.positioning}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 text-gray-500 max-w-2xl"
            >
              {content.hero.desc}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200 ease-out bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-lg shadow-[#2D5CF3]/25 hover:shadow-xl hover:shadow-[#2D5CF3]/30 active:scale-[0.97] w-full sm:w-auto"
              >
                {lang === 'en' ? 'View work' : 'Voir mes projets'} <ArrowUpRight className="ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
              <button
                onClick={() => openModalWithUrl('/presentation')}
                className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200 ease-out w-full sm:w-auto bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm active:scale-[0.97]"
              >
                {lang === 'en' ? '1-min Presentation' : 'Presentation 1 min'} <ArrowUpRight className="ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Victor's photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex flex-shrink-0 items-center"
          >
            <div className="w-[300px] lg:w-[340px] h-[380px] lg:h-[440px] rounded-3xl bg-gray-100/80 overflow-hidden">
              <img
                src="/images/photos victor/image_victor_home.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
