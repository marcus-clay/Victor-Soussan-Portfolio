'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  PencilSimple,
  Compass,
  UsersThree,
  ArrowRight,
} from '@phosphor-icons/react';

interface PillarItem {
  title: string;
  desc: string;
}

interface ExpertisePreviewSectionProps {
  lang: 'en' | 'fr';
  content: {
    services: {
      title: string;
      subtitle: string;
      homepage_pillars: PillarItem[];
      cta_all: string;
    };
  };
  onNavigate: (path: string) => void;
}

const PILLAR_ICONS = [
  <PencilSimple key="design" size={28} />,
  <Compass key="strategy" size={28} />,
  <UsersThree key="leadership" size={28} />,
];

const PILLAR_COLORS = [
  { bg: 'bg-pink-50', text: 'text-pink-600' },
  { bg: 'bg-blue-50', text: 'text-blue-600' },
  { bg: 'bg-teal-50', text: 'text-teal-600' },
];

const logos = [
  { src: '/logos/LOGO UNOWHY.svg', alt: 'Unowhy' },
  { src: '/logos/LOGO BETAGOUV.svg', alt: 'Beta.gouv' },
  { src: '/logos/LOGO TOOLKIT.svg', alt: 'Toolkit' },
  { src: '/logos/LOGO KYU.svg', alt: 'Kyu' },
  { src: '/logos/LOGO AIRBUS.svg', alt: 'Airbus' },
  { src: '/logos/LOGO ORANGE.svg', alt: 'Orange' },
  { src: '/logos/LOGO VINCI.svg', alt: 'Vinci' },
  { src: '/logos/LOGO DAILYMOTION-1.svg', alt: 'Dailymotion' },
  { src: '/logos/LOGO BOUYGUES IMMO.svg', alt: 'Bouygues Immobilier' },
  { src: '/logos/LOGO REGION ILE DE FRANCE.svg', alt: 'Region Ile-de-France' },
  { src: '/logos/LOGO OGURY.svg', alt: 'Ogury' },
  { src: '/logos/LOGO SOLOCAL.svg', alt: 'Solocal' },
  { src: '/logos/LOGO CELIO.svg', alt: 'Celio' },
  { src: '/logos/LOGO OPERA COMIQUE.svg', alt: 'Opera Comique' },
  { src: '/logos/LOGO VERLINDE.svg', alt: 'Verlinde' },
  { src: '/logos/LOGO UPTRADE.svg', alt: 'Uptrade' },
];

const ExpertisePreviewSection: React.FC<ExpertisePreviewSectionProps> = ({
  lang,
  content,
}) => {
  const pillars = content.services.homepage_pillars ?? [];

  return (
    <section className="py-16 md:py-32 px-6 md:px-10 bg-[#FCFCFD]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section heading */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 text-gray-900">
            {content.services.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-500">
            {content.services.subtitle}
          </p>
        </div>

        {/* 3 pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
          {pillars.map((pillar, index) => {
            const color = PILLAR_COLORS[index] ?? PILLAR_COLORS[0];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8"
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${color.bg} ${color.text}`}>
                  {PILLAR_ICONS[index]}
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-[-0.02em] text-gray-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mb-24 md:mb-32">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97]"
          >
            {content.services.cta_all}
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>

        {/* Trusted by / Logo carousel */}
        <div id="clients">
          <div className="mb-8 md:mb-12 text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-gray-900">
              {lang === 'en' ? 'Trusted by leading companies' : 'Ils me font confiance'}
            </h3>
          </div>

          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-[#FCFCFD] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-[#FCFCFD] to-transparent" />

            <div className="logo-carousel-track flex hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0">
                  {logos.map((logo, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="flex items-center justify-center mx-2 md:mx-3 flex-shrink-0"
                      style={{ contain: 'layout style' }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width="100"
                        height="100"
                        className="h-[60px] sm:h-[80px] md:h-[100px] w-auto transition-opacity duration-300 ease-out grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                        style={{ contentVisibility: 'auto' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertisePreviewSection;
