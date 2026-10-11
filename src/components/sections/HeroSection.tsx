'use client'

import React from 'react';

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
        <div>
          {/* Name */}
          <h1
            className="rise-in text-title-1 text-gray-900"
            style={{ '--i': 0, '--rise': '16px' } as React.CSSProperties}
          >
            {content.hero.tagline}
          </h1>

          {/* Role */}
          <p
            className="rise-in mt-1 text-lg text-gray-500 mb-16 sm:mb-20 md:mb-28"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Lead Product Designer
          </p>

          {/* Description — mobile */}
          <p
            className="rise-in text-base leading-relaxed mb-10 text-gray-500 max-w-[55ch] md:hidden"
            style={{ '--i': 2, '--rise': '10px' } as React.CSSProperties}
          >
            {content.hero.descShort || content.hero.desc}
          </p>
          {/* Description — desktop */}
          <p
            className="rise-in hidden md:block text-base leading-relaxed mb-12 text-gray-500 max-w-[55ch]"
            style={{ '--i': 2, '--rise': '10px' } as React.CSSProperties}
          >
            {content.hero.desc}
          </p>

          {/* CTAs — approach first, contact second */}
          <div
            className="rise-in flex items-center gap-6"
            style={{ '--i': 3, '--rise': '10px' } as React.CSSProperties}
          >
            {/* Approach */}
            <button
              onClick={() => openModalWithUrl('/approche')}
              className="text-sm text-gray-500 hover:text-gray-900 active:opacity-60 transition-[color,opacity] duration-150 inline-flex items-center gap-1.5 cursor-pointer py-2.5 -my-2.5"
            >
              {isEn ? 'My approach' : 'Mon approche'}
              <ArrowDiag />
            </button>

            {/* Separator */}
            <span className="text-gray-200 select-none" aria-hidden="true">·</span>

            {/* Contact */}
            <button
              onClick={() => openModalWithUrl('/contact')}
              className="text-sm font-medium text-gray-900 hover:text-gray-500 active:opacity-60 transition-[color,opacity] duration-150 inline-flex items-center gap-1.5 cursor-pointer py-2.5 -my-2.5"
            >
              {isEn ? "Let's talk" : 'Parlons-en'}
              <ArrowDiag />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
