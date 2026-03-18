import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { HOMEPAGE_GALLERY_ITEMS } from '@/data/galleryData';

interface GalleryPreviewSectionProps {
  lang: 'en' | 'fr';
  content: {
    homepage_visual_archive: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
  onNavigate: (path: string) => void;
}

const GalleryPreviewSection: React.FC<GalleryPreviewSectionProps> = ({
  lang,
  content,
}) => {
  return (
    <section className="py-16 md:py-32 px-6 md:px-10 bg-[#F9F9F9]">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 text-gray-900">
            {content.homepage_visual_archive.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-500">
            {content.homepage_visual_archive.subtitle}
          </p>
        </div>

        {/* Thumbnail row */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 md:mb-12 scrollbar-hide">
          {HOMEPAGE_GALLERY_ITEMS.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[16/10] rounded-2xl overflow-hidden border border-gray-100 bg-white"
            >
              <img
                src={src}
                alt={`Gallery preview ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${lang}/visual-archive`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all"
          >
            {content.homepage_visual_archive.cta}
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreviewSection;
