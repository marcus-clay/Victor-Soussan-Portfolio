'use client'

import React from 'react';
import { motion } from 'framer-motion';

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
      descShort?: string;
      cta_projects: string;
      cta_guide: string;
    };
  };
  scrollToSection: (id: string) => void;
  openModalWithUrl: (path: string) => void;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

function ArrowDiag({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  lang,
  openModalWithUrl,
}) => {
  const isEn = lang === 'en';

  return (
    <header className="px-6 pt-32 sm:pt-40 md:pt-48 pb-24 md:pb-32">
      <div className="max-w-[692px] mx-auto w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {/* Name */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-base font-semibold tracking-[-0.01em] text-gray-900"
          >
            {content.hero.tagline}
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="text-base text-gray-500 mb-16 sm:mb-20 md:mb-28"
          >
            Lead Product Designer
          </motion.p>

          {/* Description — mobile */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="text-base leading-relaxed mb-10 text-gray-500 max-w-[55ch] md:hidden"
          >
            {content.hero.descShort || content.hero.desc}
          </motion.p>
          {/* Description — desktop */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="hidden md:block text-base leading-relaxed mb-12 text-gray-500 max-w-[55ch]"
          >
            {content.hero.desc}
          </motion.p>

          {/* CTAs — approach first, contact second */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="flex items-center gap-6"
          >
            {/* Approach */}
            <button
              onClick={() => openModalWithUrl('/approche')}
              className="text-sm text-gray-500 hover:text-gray-900 active:opacity-60 transition-[color,opacity] duration-150 inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isEn ? 'My approach' : 'Mon approche'}
              <ArrowDiag />
            </button>

            {/* Separator */}
            <span className="text-gray-200 select-none" aria-hidden="true">·</span>

            {/* Contact */}
            <button
              onClick={() => openModalWithUrl('/contact')}
              className="text-sm font-medium text-gray-900 hover:text-gray-500 active:opacity-60 transition-[color,opacity] duration-150 inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isEn ? "Let's talk" : 'Parlons-en'}
              <ArrowDiag />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
