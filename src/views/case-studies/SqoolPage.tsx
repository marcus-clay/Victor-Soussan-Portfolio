// SQOOL Ecosystem Case Study Page - Minimalist aesthetic
// A trunk case study that synthesizes the SQOOL journey (2018-2024)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaretRight as ChevronRight,
  CaretLeft as ChevronLeft,
  ArrowRight,
} from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';

import { GalleryItem, getSqoolGalleryItems } from '../../components/BentoGallery';
import { SqoolTimeline } from './SqoolTimeline';
import SqoolExecutive from '../../components/case-studies/SqoolExecutive';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { SQOOL_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolTranslations';


interface SqoolPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

// Media items for lightbox
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/sqool/hero_ecosystem_sqool.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp', captionKey: 'distribution', type: 'image' },
  { src: '/images/sqool/image-unowhy-shootingphoto-tablette.webp', captionKey: 'tablette', type: 'image' },
  { src: '/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp', captionKey: 'marquage', type: 'image' },
  { src: '/images/sqool/sqool_legacy_launcher_eleve.webp', captionKey: 'legacyLauncher', type: 'image' },
  { src: '/images/sqool/sqool_legacy_manager_teacher.webp', captionKey: 'legacyManager', type: 'image' },
  { src: '/images/sqool/sqool_legacy_mdm.webp', captionKey: 'legacyMdm', type: 'image' },
  { src: '/images/sqool/hi sqool/004 003-hp-scroll-2x.webp', captionKey: 'hisqool', type: 'image' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', captionKey: 'connect', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', captionKey: 'bulle', type: 'video' },
  { src: '/images/sqool/sqool_brand.webp', captionKey: 'brand', type: 'image' },
  { src: '/images/sqool/thumbnail_suite_sqool_blue.webp', captionKey: 'suiteSqool', type: 'image' },
  // Brand System Visuals
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_01_2x.webp', captionKey: 'brandVisual01', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_02_2x.webp', captionKey: 'brandVisual02', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp', captionKey: 'brandVisual03', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp', captionKey: 'brandVisual04', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', captionKey: 'brandVisual05', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_06_2x.webp', captionKey: 'brandVisual06', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp', captionKey: 'brandVisual07', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp', captionKey: 'brandVisual08', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_09_2x.webp', captionKey: 'brandVisual09', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_10_2x.webp', captionKey: 'brandVisual10', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_11_2x.webp', captionKey: 'brandVisual11', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp', captionKey: 'brandVisual12', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_13_2x.webp', captionKey: 'brandVisual13', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp', captionKey: 'brandVisual14', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuel_systeme_de_marque_15.webp', captionKey: 'brandVisual15', type: 'image' },
  { src: '/images/sqool/sqool_design_system.webp', captionKey: 'designSystem', type: 'image' },
  { src: '/images/sqool/sqool_classe.webp', captionKey: 'classe', type: 'image' },
  { src: '/images/sqool/sqool_partage.webp', captionKey: 'partage', type: 'image' },
  { src: '/images/sqool/sqool_applications.webp', captionKey: 'applications', type: 'image' },
  { src: '/images/sqool/sqool_mdm.webp', captionKey: 'mdm', type: 'image' },
  { src: '/images/sqool/sqool_protect.webp', captionKey: 'protect', type: 'image' },
  { src: '/images/sqool/sqool_extend.webp', captionKey: 'extend', type: 'image' },
];

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|mov)$/i);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
      onClick={onClick}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer src={item.src} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
        {item.caption}
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

export const SqoolPage: React.FC<SqoolPageProps> = ({
  onClose,
  systemTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['sqool'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('sqool', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const t = SQOOL_TRANSLATIONS[lang];
  const galleryItems = getSqoolGalleryItems(lang);

  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandCarouselRef = useRef<HTMLDivElement>(null);
  void useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [canScrollBrandLeft, setCanScrollBrandLeft] = useState(false);
  const [canScrollBrandRight, setCanScrollBrandRight] = useState(true);

  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [caseStudyMode, viewMode]);

  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, onClose]);

  // Brand carousel scroll
  const checkBrandScroll = useCallback(() => {
    if (brandCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = brandCarouselRef.current;
      setCanScrollBrandLeft(scrollLeft > 0);
      setCanScrollBrandRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scrollBrandCarousel = useCallback((direction: 'left' | 'right') => {
    if (brandCarouselRef.current) {
      const scrollAmount = 400;
      brandCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  const brandVisuals = [
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_01_2x.webp', key: 'brandVisual01', wide: true },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_02_2x.webp', key: 'brandVisual02' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp', key: 'brandVisual03' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp', key: 'brandVisual04' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', key: 'brandVisual05' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_06_2x.webp', key: 'brandVisual06', wide: true },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp', key: 'brandVisual07' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp', key: 'brandVisual08' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_09_2x.webp', key: 'brandVisual09' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_10_2x.webp', key: 'brandVisual10' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_11_2x.webp', key: 'brandVisual11' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_12_2x.webp', key: 'brandVisual12' },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_13_2x.webp', key: 'brandVisual13', wide: true },
    { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_14_2x.webp', key: 'brandVisual14' },
    { src: '/images/sqool/systeme de marque/visuel_systeme_de_marque_15.webp', key: 'brandVisual15' },
  ];

  // Reusable media figure
  const MediaFigure = ({ src, alt, caption, captionDesc, type = 'image', className = '' }: {
    src: string; alt: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string;
  }) => (
    <figure className={className}>
      <div
        onClick={() => openLightbox(src)}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
      >
        {type === 'video' ? (
          <VideoPlayer
            src={src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={src} alt={alt}
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
        {caption}{captionDesc && ` · ${captionDesc}`}
      </figcaption>
    </figure>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="sqool"
        updateUrl={true}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Gallery View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="max-w-[960px] mx-auto px-6 py-8 md:py-12"
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {galleryItems.map((item, index) => (
                <GalleryCard
                  key={index}
                  item={item}
                  index={index}
                  onClick={() => openLightbox(item.src)}
                />
              ))}
            </div>
          </motion.div>
        ) : caseStudyMode === 'executive' ? (
          /* Executive View */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <SqoolExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={openLightbox}
              onViewFull={() => setCaseStudyMode('full')}
              onContact={onContact}
            />
          </motion.div>
        ) : (
          /* Full Case Study View */
          <motion.div
            key="caseStudy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24">
                {/* Logo */}
                <div className="mb-8">
                  <img loading="lazy"
                    src="/images/sqool/logo-sqool.svg"
                    alt="SQOOL"
                    className="h-5 w-auto"
                  />
                </div>

                {/* Meta */}
                <p className="text-xs text-gray-400 mb-4">
                  {t.hero.role} · {t.hero.scope} · {t.hero.period}
                </p>

                {/* Title */}
                <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
                  {t.hero.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm font-medium text-gray-900 mb-4">
                  {t.hero.subtitle}
                </p>

                {/* Description */}
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  {t.hero.description}
                </p>

                {/* Testimonial */}
                <div className="py-6 border-t border-gray-100">
                  <p className="text-base text-gray-500 leading-relaxed italic max-w-[65ch] mb-3">
                    {t.testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <img loading="lazy"
                      src="/images/people/charlotte-rifflet.webp"
                      alt={t.testimonial.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.testimonial.author}</p>
                      <p className="text-xs text-gray-400">{t.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Project Meta */}
            <section className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <div className="divide-y divide-gray-100">
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Type</span>
                    <span className="text-sm text-gray-900">{t.meta.type}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Scope</span>
                    <span className="text-sm text-gray-900">{t.meta.scope}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Period</span>
                    <span className="text-sm text-gray-900">{t.meta.period}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-xs text-gray-400">Company</span>
                    <span className="text-sm text-gray-900">{t.meta.company}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Hero Image */}
            <div className="max-w-[960px] mx-auto px-6 mb-24 md:mb-32">
              <MediaFigure
                src="/images/sqool/hero_ecosystem_sqool.webp"
                alt={t.captions.hero}
                caption={t.captions.hero}
              />
            </div>

            {/* Context Section */}
            <section id="context" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.context.title}
                </h2>
                <p className="text-sm font-medium text-gray-900 mb-4">
                  {t.context.subtitle}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  {t.context.p1}
                </p>
              </div>

              {/* Context images */}
              <div className="max-w-[960px] mx-auto px-6 mb-8">
                <div className="space-y-8">
                  <MediaFigure
                    src="/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp"
                    alt={t.captions.distribution}
                    caption={t.captions.distribution}
                  />
                  <MediaFigure
                    src="/images/sqool/image-unowhy-shootingphoto-tablette.webp"
                    alt={t.captions.tablette}
                    caption={t.captions.tablette}
                  />
                  <MediaFigure
                    src="/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp"
                    alt={t.captions.marquage}
                    caption={t.captions.marquage}
                  />
                </div>
              </div>

              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  {t.context.p2}
                </p>
              </div>

              {/* Legacy Suite Images */}
              <div className="max-w-[960px] mx-auto px-6 mb-8">
                <div className="space-y-8">
                  <MediaFigure
                    src="/images/sqool/sqool_legacy_launcher_eleve.webp"
                    alt={t.captions.legacyLauncher}
                    caption={t.captions.legacyLauncher}
                    captionDesc={t.captions.legacyLauncherDesc}
                  />
                  <MediaFigure
                    src="/images/sqool/sqool_legacy_manager_teacher.webp"
                    alt={t.captions.legacyManager}
                    caption={t.captions.legacyManager}
                    captionDesc={t.captions.legacyManagerDesc}
                  />
                  <MediaFigure
                    src="/images/sqool/sqool_legacy_mdm.webp"
                    alt={t.captions.legacyMdm}
                    caption={t.captions.legacyMdm}
                    captionDesc={t.captions.legacyMdmDesc}
                  />
                </div>
              </div>

              {/* Challenge */}
              <div className="max-w-[740px] mx-auto px-6">
                <div className="py-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.context.challenge}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {t.context.challengeDesc}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.context.myRole}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {t.context.roleDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 mb-8">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {lang === 'fr' ? 'Parcours de transformation' : 'Transformation Journey'}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                  {lang === 'fr' ? '6 ans d\'evolution produit et design' : '6 years of product and design evolution'}
                </p>
              </div>
              <div className="max-w-[960px] mx-auto px-6">
                <SqoolTimeline
                  lang={lang}
                  isDark={false}
                  onImageClick={openLightbox}
                />
              </div>
            </section>

            {/* Phase 1 */}
            <section id="phase1" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1">
                  {t.phase1.title}
                </h2>
                <p className="text-xs text-gray-400 mb-6">{t.phase1.period}</p>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
                  {t.phase1.intro}
                </p>

                {/* Hi-SQOOL */}
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase1.hisqool.title}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-2">
                  {t.phase1.hisqool.p1}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-6">
                  {t.phase1.hisqool.p2}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6 mb-6">
                <MediaFigure
                  src="/images/sqool/hi sqool/004 003-hp-scroll-2x.webp"
                  alt={t.captions.hisqool}
                  caption={t.captions.hisqool}
                  captionDesc={t.captions.hisqoolDesc}
                />
              </div>

              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
                  {t.phase1.hisqool.outcome}
                </p>

                {/* Connect */}
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase1.connect.title}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-2">
                  {t.phase1.connect.p1}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-2">
                  {t.phase1.connect.p2}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-6">
                  {t.phase1.connect.p3}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6 mb-6">
                <div className="space-y-8">
                  <MediaFigure
                    src="/videos/connect/connect-dashboard-prototype-compressed.mp4"
                    alt={t.captions.connect}
                    caption={t.captions.connect}
                    captionDesc={t.captions.connectDesc}
                    type="video"
                  />
                  <MediaFigure
                    src="/videos/connect/Video-demo-bulle-interactions-compressed.mp4"
                    alt={t.captions.bulle}
                    caption={t.captions.bulle}
                    captionDesc={t.captions.bulleDesc}
                    type="video"
                  />
                </div>
              </div>

              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                  {t.phase1.connect.outcome}
                </p>
              </div>
            </section>

            {/* Phase 2 */}
            <section id="phase2" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1">
                  {t.phase2.title}
                </h2>
                <p className="text-xs text-gray-400 mb-6">{t.phase2.period}</p>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
                  {t.phase2.intro}
                </p>

                {/* Manifesto */}
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase2.manifesto.title}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-2">
                  {t.phase2.manifesto.p1}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
                  {t.phase2.manifesto.p2}
                </p>

                {/* Brand */}
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase2.brand.title}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-2">
                  {t.phase2.brand.p1}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-6">
                  {t.phase2.brand.p2}
                </p>
              </div>

              {/* Suite SQOOL Blue */}
              <div className="max-w-[960px] mx-auto px-6 mb-6">
                <MediaFigure
                  src="/images/sqool/thumbnail_suite_sqool_blue.webp"
                  alt="Suite SQOOL"
                  caption="Suite SQOOL"
                />
              </div>

              {/* Brand System Carousel */}
              <div className="max-w-[960px] mx-auto px-6 mb-10">
                <div className="relative">
                  {/* Gradient overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 z-10 pointer-events-none bg-gradient-to-r from-[#FDFDFC] to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 z-10 pointer-events-none bg-gradient-to-l from-[#FDFDFC] to-transparent" />

                  {/* Navigation arrows */}
                  <button
                    onClick={() => scrollBrandCarousel('left')}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 ${
                      canScrollBrandLeft
                        ? 'bg-gray-900/80 text-white cursor-pointer opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollBrandCarousel('right')}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 ${
                      canScrollBrandRight
                        ? 'bg-gray-900/80 text-white cursor-pointer opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Scrollable container */}
                  <div
                    ref={brandCarouselRef}
                    onScroll={checkBrandScroll}
                    className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {brandVisuals.map((item, idx) => (
                      <div
                        key={idx}
                        className="group rounded-xl overflow-hidden cursor-zoom-in flex-shrink-0 ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          width: item.wide ? '400px' : '280px',
                          height: '220px'
                        }}
                        onClick={() => openLightbox(item.src)}
                      >
                        <img loading="lazy"
                          src={item.src}
                          alt={t.captions[item.key as keyof typeof t.captions]}
                          className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design System */}
              <div className="max-w-[740px] mx-auto px-6">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {t.phase2.ds.title}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-2">
                  {t.phase2.ds.p1}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-6">
                  {t.phase2.ds.p2}
                </p>
              </div>

              <div className="max-w-[960px] mx-auto px-6">
                <MediaFigure
                  src="/images/sqool/sqool_design_system.webp"
                  alt={t.captions.designSystem}
                  caption={t.captions.designSystem}
                  captionDesc={t.captions.designSystemDesc}
                />
              </div>
            </section>

            {/* Phase 3 - Apps */}
            <section id="phase3" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1">
                  {t.phase3.title}
                </h2>
                <p className="text-xs text-gray-400 mb-6">{t.phase3.period}</p>

                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
                  {t.phase3.intro}
                </p>
              </div>

              {/* SQOOL Classe */}
              <div className="max-w-[740px] mx-auto px-6 mb-10">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {t.apps.classe.title}
                </p>
                <p className="text-xs text-gray-400 mb-3">{t.apps.classe.subtitle}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-3">
                  {t.apps.classe.desc}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-4">
                  {t.apps.classe.research}
                </p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-10">
                <MediaFigure
                  src="/images/sqool/sqool_classe.webp"
                  alt={t.captions.classe}
                  caption={t.captions.classe}
                />
              </div>

              {/* SQOOL Partage */}
              <div className="max-w-[740px] mx-auto px-6 mb-10">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {t.apps.partage.title}
                </p>
                <p className="text-xs text-gray-400 mb-3">{t.apps.partage.subtitle}</p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-3">
                  {t.apps.partage.desc}
                </p>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-4">
                  {t.apps.partage.research}
                </p>
              </div>
              <div className="max-w-[960px] mx-auto px-6 mb-10">
                <MediaFigure
                  src="/images/sqool/sqool_partage.webp"
                  alt={t.captions.partage}
                  caption={t.captions.partage}
                />
              </div>

              {/* Smaller apps as list */}
              <div className="max-w-[740px] mx-auto px-6">
                <div className="divide-y divide-gray-100">
                  {/* Applications */}
                  <div className="py-6">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {t.apps.applications.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">{t.apps.applications.subtitle}</p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.apps.applications.desc}
                    </p>
                  </div>

                  {/* MDM */}
                  <div className="py-6">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {t.apps.mdm.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">{t.apps.mdm.subtitle}</p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.apps.mdm.desc}
                    </p>
                  </div>

                  {/* Protect */}
                  <div className="py-6">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {t.apps.protect.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">{t.apps.protect.subtitle}</p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.apps.protect.desc}
                    </p>
                  </div>

                  {/* Extend */}
                  <div className="py-6">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {t.apps.extend.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">{t.apps.extend.subtitle}</p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.apps.extend.desc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* User Research Insights */}
            <section className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.research.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                  {t.research.subtitle}
                </p>

                <div className="divide-y divide-gray-100">
                  {t.research.insights.map((insight, index) => (
                    <div key={index} className="py-5">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {insight.title}
                      </p>
                      <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                        {insight.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact */}
            <section id="impact" className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                  {t.impact.title}
                </h2>
                <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
                  {t.impact.intro}
                </p>

                {/* Metrics */}
                <div className="divide-y divide-gray-100 mb-10">
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.usersDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.users}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.schoolsDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.schools}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.appsDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.apps}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{t.impact.teamDesc}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{t.impact.team}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Learnings */}
            <section className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
                  {t.learnings.title}
                </h2>

                <div className="divide-y divide-gray-100">
                  {t.learnings.items.map((learning, index) => (
                    <div key={index} className="py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {index + 1}. {learning.title}
                      </p>
                      <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                        {learning.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <section className="mb-24 md:mb-32">
              <div className="max-w-[740px] mx-auto px-6 border-t border-gray-100 pt-10">
                <button
                  onClick={onContact}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  {t.contactVictor}
                  <ArrowRight size={14} />
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolPage;
