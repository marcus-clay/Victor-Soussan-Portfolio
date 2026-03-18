import React from 'react';
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

      <div className="relative max-w-[1280px] mx-auto z-10 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 pt-2.5">
            {/* Availability Badge */}
            <div className="inline-flex items-center relative z-20 px-3 py-1.5 rounded-full mb-8 bg-white/70 border border-gray-200/60"
              style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium ml-2 text-gray-600">
                {content.hero.availability}
              </span>
            </div>

            {/* Main Tagline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] mb-4 md:mb-6 leading-[1.05] text-[#1D1D1F]">
              {content.hero.tagline}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium mb-3 text-[#1D1D1F]">
              {content.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{content.hero.subtitle}</span>
            </p>

            {/* Positioning */}
            <p className="text-sm text-gray-500 mb-4">
              {content.hero.positioning}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed mb-8 md:mb-10 text-gray-500 max-w-2xl">
              {content.hero.desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-all duration-200 bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-lg shadow-[#2D5CF3]/25 hover:shadow-xl hover:shadow-[#2D5CF3]/30 w-full sm:w-auto"
              >
                {lang === 'en' ? 'View work' : 'Voir mes projets'} <ArrowUpRight className="ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
              <button
                onClick={() => openModalWithUrl('/presentation')}
                className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-all duration-200 w-full sm:w-auto bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm"
              >
                {lang === 'en' ? '1-min Presentation' : 'Presentation 1 min'} <ArrowUpRight className="ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
            </div>
          </div>

          {/* Right: Victor's photo */}
          <div className="hidden md:block flex-shrink-0">
            <img
              src="/images/photos victor/image_victor_home.png"
              alt="Victor Soussan"
              className="w-[320px] lg:w-[380px] h-auto rounded-2xl object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
