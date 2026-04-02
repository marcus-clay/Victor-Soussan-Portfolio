'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from '@phosphor-icons/react';

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

const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  scrollToSection,
}) => {
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
          {/* Name — like Emil's bold name at top */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-base font-semibold tracking-[-0.01em] text-gray-900"
          >
            {content.hero.tagline}
          </motion.h1>

          {/* Role — lighter, right below, like Emil's "Design Engineer" */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="text-base text-gray-500 mb-16 sm:mb-20 md:mb-28"
          >
            Lead Product Designer
          </motion.p>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="text-base leading-relaxed mb-10 text-gray-500 max-w-[55ch] md:hidden"
          >
            {content.hero.descShort || content.hero.desc}
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="hidden md:block text-base leading-relaxed mb-12 text-gray-500 max-w-[55ch]"
          >
            {content.hero.desc}
          </motion.p>

          {/* Single text CTA */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group text-sm font-medium text-gray-500 hover:text-gray-900 active:opacity-60 transition-[color,opacity] duration-150 flex items-center gap-2 cursor-pointer"
            >
              {content.hero.cta_projects}
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-150" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
