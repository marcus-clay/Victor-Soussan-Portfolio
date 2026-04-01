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
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-[692px] mx-auto">
          <div className="mb-10 md:mb-14">
            <h2 className="text-base font-semibold tracking-[-0.01em] mb-3 text-gray-900">
              {content.homepage_visual_archive.title}
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              {content.homepage_visual_archive.subtitle}
            </p>
          </div>

          {/* Grid: 1 full-width + 3 thumbnails */}
          <div className="mb-10 md:mb-14">
            {mainImage && (
              <button
                onClick={() => setLightboxIndex(0)}
                className="group w-full aspect-[16/7] rounded-xl overflow-hidden mb-3 cursor-zoom-in active:scale-[0.99]"
                style={{ transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
              >
                <img
                  src={mainImage}
                  alt="Gallery featured"
                  className="w-full h-full object-cover scale-[2] transition-transform duration-300 ease-out group-hover:scale-[2.03]"
                  style={{ transformOrigin: 'top left' }}
                  loading="lazy"
                />
              </button>
            )}
            <div className="grid grid-cols-3 gap-3">
              {thumbs.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index + 1)}
                  className="group aspect-[3/2] rounded-lg overflow-hidden cursor-zoom-in active:scale-[0.98]"
                  style={{ transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                >
                  <img
                    src={src}
                    alt={`Gallery preview ${index + 2}`}
                    className="w-full h-full object-cover scale-[2] transition-transform duration-300 ease-out group-hover:scale-[2.03]"
                    style={{ transformOrigin: 'top left' }}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/${lang}/visual-archive`}
            className="group text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 inline-flex items-center gap-1.5"
          >
            {content.homepage_visual_archive.cta}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
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
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-[background-color,transform] duration-150 cursor-pointer active:scale-[0.9]"
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
