'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';

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
  Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }>;
  scrollToSection: (id: string) => void;
  openModalWithUrl: (path: string) => void;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  content,
  scrollToSection,
  openModalWithUrl,
}) => {
  const router = useRouter()

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/${lang}/contact`)
    // Wait for page to render, then scroll to anchor
    setTimeout(() => {
      const el = document.getElementById('interventions')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }
  return (
    <header className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center px-6 md:px-10 overflow-hidden">
      {/* Subtle background gradient — single, restrained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[-5%] top-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-blue-200/15" />
        <div className="absolute left-[-10%] bottom-[-5%] w-[35%] h-[35%] rounded-full blur-[120px] bg-indigo-200/10" />
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
            {/* Availability Badge — clickable link to /interventions */}
            <motion.button
              onClick={handleBadgeClick}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="inline-flex items-center relative z-20 px-3 py-1.5 rounded-full mb-8 bg-white/70 border border-gray-200/60 group cursor-pointer transition-colors duration-200 hover:border-gray-300"
              style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium ml-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                {content.hero.availability}
              </span>
            </motion.button>

            {/* Main Tagline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] mb-4 md:mb-6 leading-[1.05] text-[#1D1D1F]"
            >
              {content.hero.tagline}
            </motion.h1>

            {/* Title + subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="text-lg sm:text-xl md:text-2xl font-medium mb-3 text-[#1D1D1F]"
            >
              {content.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{content.hero.subtitle}</span>
            </motion.p>

            {/* Positioning line */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="text-[13px] md:text-sm text-gray-500 mb-4"
            >
              {content.hero.positioning}
            </motion.p>

            {/* Description — short on mobile, full on desktop */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="text-[15px] leading-relaxed mb-6 text-gray-500 max-w-2xl md:hidden"
            >
              {content.hero.descShort || content.hero.desc}
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="hidden md:block text-lg leading-relaxed mb-10 text-gray-500 max-w-2xl"
            >
              {content.hero.desc}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-[15px] sm:text-base flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200 ease-out bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-lg shadow-[#2D5CF3]/25 hover:shadow-xl hover:shadow-[#2D5CF3]/30 active:scale-[0.97] w-full sm:w-auto"
              >
                {content.hero.cta_projects} <ArrowUpRight className="ml-2 flex-shrink-0 rotate-[135deg] group-hover:translate-y-0.5 transition-transform duration-200 ease-out" size={16} />
              </button>
              <button
                onClick={() => openModalWithUrl('/contact')}
                className="group px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-[15px] sm:text-base flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-[background-color,box-shadow,border-color,transform] duration-200 ease-out w-full sm:w-auto bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm active:scale-[0.97]"
              >
                {lang === 'en' ? 'Get in touch' : 'Prendre contact'} <ArrowRight className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200 ease-out" size={16} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Victor's photo with contact overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
            className="hidden md:flex flex-shrink-0 items-center"
          >
            <div className="w-[300px] lg:w-[340px] h-[380px] lg:h-[440px] rounded-3xl bg-gray-100/80 overflow-hidden relative group">
              <img
                src="/images/photos victor/image_victor_home.png"
                alt="Victor Soussan"
                className="w-full h-full object-cover object-top will-change-transform transition-transform duration-[600ms] group-hover:scale-[1.03]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                loading="eager"
              />
              {/* Apple-style overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms] rounded-3xl flex flex-col justify-end items-start p-6 pointer-events-none group-hover:pointer-events-auto"
                style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                <p className="text-white/80 text-[13px] mb-2.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-[300ms]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                >
                  {lang === 'en' ? 'Need a senior designer on a project?' : 'Besoin d\u2019un regard senior sur un projet\u00a0?'}
                </p>
                <a
                  href="https://calendar.app.google/h22c1RRu7JWuK92J9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white/25 active:scale-[0.97] transition-[transform,opacity,background-color] duration-[300ms]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)', transitionDelay: '50ms' }}
                >
                  {lang === 'en' ? 'Book a call' : 'On en parle\u00a0?'}
                  <ArrowUpRight size={14} weight="bold" className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
