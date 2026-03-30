'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const allImages = [mainImage, ...thumbs].filter(Boolean);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
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
              <button
                onClick={() => setLightboxIndex(0)}
                className="group w-full aspect-[16/7] rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 bg-white mb-4 cursor-zoom-in hover:shadow-lg hover:scale-[1.01]"
                style={{ transition: 'border-color 200ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                <img
                  src={mainImage}
                  alt="Gallery featured"
                  className="w-full h-full object-cover scale-[2] transition-transform duration-300 ease-out group-hover:scale-[2.05]"
                  style={{ transformOrigin: 'top left' }}
                  loading="lazy"
                />
              </button>
            )}
            <div className="grid grid-cols-3 gap-4">
              {thumbs.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index + 1)}
                  className="group aspect-[3/2] rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 bg-white cursor-zoom-in hover:shadow-lg hover:scale-[1.01]"
                  style={{ transition: 'border-color 200ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                >
                  <img
                    src={src}
                    alt={`Gallery preview ${index + 2}`}
                    className="w-full h-full object-cover scale-[2] transition-transform duration-300 ease-out group-hover:scale-[2.05]"
                    style={{ transformOrigin: 'top left' }}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={`/${lang}/visual-archive`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97]"
            >
              {content.homepage_visual_archive.cta}
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              src={allImages[lightboxIndex]}
              alt="Gallery full view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPreviewSection;
