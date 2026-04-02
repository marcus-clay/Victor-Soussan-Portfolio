'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

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

// Maps 1:1 with the 3 homepage pillars → anchors on /services
const PILLAR_SLUGS = ['design-prototyping', 'product-strategy', 'design-ops'];

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const ExpertisePreviewSection: React.FC<ExpertisePreviewSectionProps> = ({
  lang,
  content,
}) => {
  const pillars = content.services.homepage_pillars ?? [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-40 px-6">
      <div className="max-w-[692px] mx-auto">
        {/* Section heading */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-base font-semibold tracking-[-0.01em] mb-4 text-gray-900">
            {content.services.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            {content.services.subtitle}
          </p>
        </div>

        {/* Pillars — spotlight dim focuses reading, light bg confirms clickability */}
        <div
          className="flex flex-col divide-y divide-gray-100 mb-10 md:mb-14"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: EASE_OUT }}
              style={{
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.38 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              <Link
                href={`/${lang}/services#${PILLAR_SLUGS[index]}`}
                className="group flex items-start justify-between gap-3 py-5 -mx-3 px-3 rounded-lg hover:bg-gray-100/60 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium text-gray-900 mb-1.5">
                    {pillar.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: hoveredIndex === index ? '#374151' : '#6B7280',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>

                {/* Arrow — appears on hover to signal navigation */}
                <ArrowRight
                  size={13}
                  className="flex-shrink-0 mt-1.5 text-gray-400"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-4px)',
                    transition: 'opacity 150ms ease, transform 220ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA — single strong arrow for the full expertise page */}
        <Link
          href={`/${lang}/services`}
          className="group text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 inline-flex items-center gap-1.5"
        >
          {content.services.cta_all}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
        </Link>
      </div>
    </section>
  );
};

export default ExpertisePreviewSection;
