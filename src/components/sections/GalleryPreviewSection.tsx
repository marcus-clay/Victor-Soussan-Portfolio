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
  const items = HOMEPAGE_GALLERY_ITEMS;
  const mainImage = items[0];
  const thumbs = items.slice(1, 4);

  return (
    <section className="py-16 md:py-28 px-6 md:px-10 bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 text-gray-900">
            {content.homepage_visual_archive.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-gray-500">
            {content.homepage_visual_archive.subtitle}
          </p>
        </div>

        {/* Grid: 1 full-width + 3 thumbnails */}
        <div className="mb-8 md:mb-12">
          {mainImage && (
            <div className="w-full aspect-[16/7] rounded-2xl overflow-hidden border border-gray-100 bg-white mb-4">
              <img
                src={mainImage}
                alt="Gallery featured"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {thumbs.map((src, index) => (
              <div
                key={index}
                className="aspect-[16/10] rounded-xl overflow-hidden border border-gray-100 bg-white"
              >
                <img
                  src={src}
                  alt={`Gallery preview ${index + 2}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
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
