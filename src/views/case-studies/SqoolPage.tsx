// SQOOL Ecosystem Case Study Page - The 6-Year EdTech Transformation
// A trunk case study that synthesizes the SQOOL journey (2018-2024)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaretRight as ChevronRight,
  CaretLeft as ChevronLeft,
  Play,
  Quotes as Quote,
  Calendar,
  Briefcase,
  Stack as Layers,
  Users
} from '@phosphor-icons/react';

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-[border-color,box-shadow,transform] duration-300 ease-out hover:scale-[1.01]">
        {isVideo ? (
          <video src={item.src} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" muted playsInline autoPlay loop preload="metadata" />
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-sm text-gray-500">
        <strong className="text-gray-700">{item.caption}</strong>
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// Image with fallback placeholder
const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  caption?: string;
  onClick?: () => void;
  className?: string;
}> = ({ src, alt, caption, onClick, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full aspect-video rounded-2xl bg-gray-800 flex items-center justify-center cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="text-center p-8">
          <div className="text-gray-600 text-sm">[Image: {caption || alt}]</div>
        </div>
      </div>
    );
  }

  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`w-full h-auto rounded-2xl cursor-pointer ${className}`}
      onClick={onClick}
      onError={() => setHasError(true)}
    />
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
  // Load gallery items directly in the component
  const galleryItems = getSqoolGalleryItems(lang);

  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: `${t.captions[item.captionKey as keyof typeof t.captions]} - ${t.captions[`${item.captionKey}Desc` as keyof typeof t.captions] || ''}`
  }));

  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandCarouselRef = useRef<HTMLDivElement>(null);
  // videoRefs reserved for future use
  void useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [canScrollBrandLeft, setCanScrollBrandLeft] = useState(false);
  const [canScrollBrandRight, setCanScrollBrandRight] = useState(true);
  const isDark = systemTheme === 'dark';

  // Sync caseStudyMode when viewMode changes from outside
  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

  // Lightbox functions with video start time support
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

  // Keyboard navigation for escape only when lightbox closed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, onClose]);

  // Brand carousel scroll functions
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

  // Brand visuals data
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

  return (
    <div ref={containerRef} className={`min-h-screen ${viewMode === 'gallery' ? 'bg-white' : (isDark ? 'bg-[#0a0a0a]' : 'bg-white')}`}>


      {/* Content - Switch between Gallery, Executive, and Full Case Study */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Gallery View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full px-6 md:px-10 lg:px-12 py-8 md:py-12"
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
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
          /* Executive View (En bref) */
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
      <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
        <div>
          {/* Main Content */}
          <main className="w-full">
            {/* Hero Section */}
            <section id="hero" className="mb-24 md:mb-32">
              {/* Logo */}
              <div className="my-12">
                <img loading="lazy"
                  src={isDark ? '/images/sqool/logo-sqool-dark.svg' : '/images/sqool/logo-sqool.svg'}
                  alt="SQOOL"
                  className="h-6 w-auto"
                />
              </div>

              <div className="grid md:grid-cols-5 gap-10">
                {/* Left Column - Title and Description */}
                <div className="md:col-span-3">
                  {/* Meta tags inline like Toolkit */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.hero.role}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.hero.scope}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.hero.period}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.hero.title}
                  </h1>

                  {/* Subtitle */}
                  <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.hero.subtitle}
                  </h2>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.hero.description}
                  </p>
                </div>

                {/* Right Column - Testimonial */}
                <div className="md:col-span-2">
                  {/* Testimonial Card */}
                  <div
                    className={`p-6 rounded-2xl border ${
                      isDark
                        ? 'bg-cyan-900/20 border-cyan-500/20'
                        : 'bg-cyan-50 border-cyan-200'
                    }`}
                  >
                    <Quote
                      size={24}
                      className={`mb-4 ${
                        isDark ? 'text-cyan-400' : 'text-cyan-600'
                      }`}
                    />
                    <p
                      className={`text-sm italic leading-relaxed mb-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {t.testimonial.quote}
                    </p>
                    <div className="flex items-center space-x-3">
                      <img loading="lazy"
                        src="/images/people/charlotte-rifflet.webp"
                        alt={t.testimonial.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {t.testimonial.author}
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {t.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Project Meta Card - Synthesis */}
            <div
              className={`p-6 rounded-3xl border mb-12 ${
                isDark
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-blue-600/20' : 'bg-blue-50'
                    }`}
                  >
                    <Layers
                      size={20}
                      className={isDark ? 'text-blue-400' : 'text-blue-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Type
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-purple-500/20' : 'bg-purple-50'
                    }`}
                  >
                    <Briefcase
                      size={20}
                      className={isDark ? 'text-purple-400' : 'text-purple-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Scope
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.scope}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-green-500/20' : 'bg-green-50'
                    }`}
                  >
                    <Calendar
                      size={20}
                      className={isDark ? 'text-green-400' : 'text-green-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Period
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'
                    }`}
                  >
                    <Users
                      size={20}
                      className={isDark ? 'text-cyan-400' : 'text-cyan-600'}
                    />
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Company
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.meta.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <figure className="mb-24 md:mb-32">
              <div
                onClick={() => openLightbox('/images/sqool/hero_ecosystem_sqool.webp')}
                className={`rounded-2xl overflow-hidden border cursor-pointer ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <img loading="lazy"
                  src="/images/sqool/hero_ecosystem_sqool.webp"
                  alt={t.captions.hero}
                  className="w-full h-auto"
                />
              </div>
            </figure>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Context Section */}
            <section id="context" className="mb-20">
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.context.title}
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.context.subtitle}
              </p>

              <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.context.p1}
              </p>

              {/* Context images - Deployment photos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <figure>
                  <ImageWithFallback
                    src="/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp"
                    alt={t.captions.distribution}
                    caption={t.captions.distribution}
                    onClick={() => openLightbox('/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp')}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.distribution}
                  </figcaption>
                </figure>
                <figure>
                  <ImageWithFallback
                    src="/images/sqool/image-unowhy-shootingphoto-tablette.webp"
                    alt={t.captions.tablette}
                    caption={t.captions.tablette}
                    onClick={() => openLightbox('/images/sqool/image-unowhy-shootingphoto-tablette.webp')}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.tablette}
                  </figcaption>
                </figure>
                <figure>
                  <ImageWithFallback
                    src="/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp"
                    alt={t.captions.marquage}
                    caption={t.captions.marquage}
                    onClick={() => openLightbox('/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp')}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.marquage}
                  </figcaption>
                </figure>
              </div>

              <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.context.p2}
              </p>

              {/* Legacy Suite Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <figure className="group">
                  <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}>
                    <ImageWithFallback
                      src="/images/sqool/sqool_legacy_launcher_eleve.webp"
                      alt={t.captions.legacyLauncher}
                      caption={t.captions.legacyLauncher}
                      onClick={() => openLightbox('/images/sqool/sqool_legacy_launcher_eleve.webp')}
                      className="aspect-[4/3] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-sm font-medium block">{t.captions.legacyLauncher}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.legacyLauncherDesc}</span>
                  </figcaption>
                </figure>
                <figure className="group">
                  <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}>
                    <ImageWithFallback
                      src="/images/sqool/sqool_legacy_manager_teacher.webp"
                      alt={t.captions.legacyManager}
                      caption={t.captions.legacyManager}
                      onClick={() => openLightbox('/images/sqool/sqool_legacy_manager_teacher.webp')}
                      className="aspect-[4/3] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-sm font-medium block">{t.captions.legacyManager}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.legacyManagerDesc}</span>
                  </figcaption>
                </figure>
                <figure className="group">
                  <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}>
                    <ImageWithFallback
                      src="/images/sqool/sqool_legacy_mdm.webp"
                      alt={t.captions.legacyMdm}
                      caption={t.captions.legacyMdm}
                      onClick={() => openLightbox('/images/sqool/sqool_legacy_mdm.webp')}
                      className="aspect-[4/3] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="text-sm font-medium block">{t.captions.legacyMdm}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.legacyMdmDesc}</span>
                  </figcaption>
                </figure>
              </div>

              <div className={`p-6 rounded-2xl mb-8 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  {t.context.challenge}
                </h3>
                <p className={`text-sm ${isDark ? 'text-blue-300/80' : 'text-blue-600'}`}>
                  {t.context.challengeDesc}
                </p>
              </div>

              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.context.myRole}
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.context.roleDesc}
              </p>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Timeline Section */}
            <section className="mb-16">
              <h2 className={`text-2xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'fr' ? 'Parcours de transformation' : 'Transformation Journey'}
              </h2>
              <p className={`text-lg mb-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'fr' ? '6 ans d\'évolution produit et design' : '6 years of product and design evolution'}
              </p>
              <SqoolTimeline
                lang={lang}
                isDark={isDark}
                onImageClick={openLightbox}
              />
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Phase 1 */}
            <section id="phase1" className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase1.title}
                </h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                  {t.phase1.period}
                </span>
              </div>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.phase1.intro}
              </p>

              {/* Hi-SQOOL */}
              <div className="mb-12">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase1.hisqool.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.hisqool.p1}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.hisqool.p2}
                </p>

                <figure className="mb-6">
                  <ImageWithFallback
                    src="/images/sqool/hi sqool/004 003-hp-scroll-2x.webp"
                    alt={t.captions.hisqool}
                    caption={t.captions.hisqool}
                    onClick={() => openLightbox('/images/sqool/hi sqool/004 003-hp-scroll-2x.webp')}
                  />
                  <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.hisqool} - {t.captions.hisqoolDesc}
                  </figcaption>
                </figure>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-100'}`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {t.phase1.hisqool.outcome}
                  </p>
                </div>
              </div>

              {/* Connect */}
              <div className="my-12">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase1.connect.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.connect.p1}
                </p>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.connect.p2}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase1.connect.p3}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6 md:items-stretch">
                  <figure className="group flex flex-col">
                    <div
                      className={`relative overflow-hidden rounded-xl cursor-pointer flex-1 ${isDark ? 'bg-[#1D1D1F]' : 'bg-gray-100'}`}
                      onClick={() => openLightbox('/videos/connect/connect-dashboard-prototype-compressed.mp4')}
                    >
                      <video
                        src="/videos/connect/connect-dashboard-prototype-compressed.mp4"
                        className="w-full h-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        ref={(el) => { if (el) el.playbackRate = 1.25; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={20} className="text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                    <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-sm font-medium block">{t.captions.connect}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.connectDesc}</span>
                    </figcaption>
                  </figure>
                  <figure className="group flex flex-col">
                    <div
                      className="relative overflow-hidden rounded-xl cursor-pointer flex-1 bg-black flex items-center justify-center"
                      onClick={() => openLightbox('/videos/connect/Video-demo-bulle-interactions-compressed.mp4')}
                    >
                      <video
                        src="/videos/connect/Video-demo-bulle-interactions-compressed.mp4"
                        className="h-full w-auto max-w-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={20} className="text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                    <figcaption className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-sm font-medium block">{t.captions.bulle}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.captions.bulleDesc}</span>
                    </figcaption>
                  </figure>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-100'}`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    {t.phase1.connect.outcome}
                  </p>
                </div>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Phase 2 */}
            <section id="phase2" className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.title}
                </h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                  {t.phase2.period}
                </span>
              </div>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.phase2.intro}
              </p>

              {/* Manifesto */}
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.manifesto.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.manifesto.p1}
                </p>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.manifesto.p2}
                </p>
              </div>

              {/* Brand */}
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.brand.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.brand.p1}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.brand.p2}
                </p>

                {/* Suite SQOOL Blue Thumbnail */}
                <div
                  className="mb-6 rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
                  onClick={() => openLightbox('/images/sqool/thumbnail_suite_sqool_blue.webp')}
                >
                  <img loading="lazy"
                    src="/images/sqool/thumbnail_suite_sqool_blue.webp"
                    alt="Suite SQOOL"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Brand System Horizontal Carousel - Apple Style */}
                <div className="relative -mx-4 md:-mx-6">
                  {/* Gradient overlays to show more content */}
                  <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r ${isDark ? 'from-[#0a0a0a]' : 'from-white'} to-transparent`} />
                  <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l ${isDark ? 'from-[#0a0a0a]' : 'from-white'} to-transparent`} />

                  {/* Navigation arrows */}
                  <button
                    onClick={() => scrollBrandCarousel('left')}
                    className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-[background-color,color,transform] duration-200 ease-out ${
                      canScrollBrandLeft
                        ? `${isDark ? 'bg-white/90 hover:bg-white text-gray-900' : 'bg-gray-900/90 hover:bg-gray-900 text-white'} shadow-lg cursor-pointer`
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => scrollBrandCarousel('right')}
                    className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-[background-color,color,transform] duration-200 ease-out ${
                      canScrollBrandRight
                        ? `${isDark ? 'bg-white/90 hover:bg-white text-gray-900' : 'bg-gray-900/90 hover:bg-gray-900 text-white'} shadow-lg cursor-pointer`
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Scrollable container */}
                  <div
                    ref={brandCarouselRef}
                    onScroll={checkBrandScroll}
                    className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-6 py-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {brandVisuals.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className={`relative overflow-hidden rounded-2xl cursor-pointer group flex-shrink-0 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                        style={{
                          width: item.wide ? '400px' : '280px',
                          height: '220px'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => openLightbox(item.src)}
                      >
                        <img loading="lazy"
                          src={item.src}
                          alt={t.captions[item.key as keyof typeof t.captions]}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white font-medium text-sm">{t.captions[item.key as keyof typeof t.captions]}</p>
                          <p className="text-white/70 text-xs">{t.captions[`${item.key}Desc` as keyof typeof t.captions]}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design System */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase2.ds.title}
                </h3>
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.ds.p1}
                </p>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phase2.ds.p2}
                </p>

                <figure>
                  <ImageWithFallback
                    src="/images/sqool/sqool_design_system.webp"
                    alt={t.captions.designSystem}
                    caption={t.captions.designSystem}
                    onClick={() => openLightbox('/images/sqool/sqool_design_system.webp')}
                  />
                  <figcaption className={`mt-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t.captions.designSystem} - {t.captions.designSystemDesc}
                  </figcaption>
                </figure>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Phase 3 - Apps */}
            <section id="phase3" className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.phase3.title}
                </h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                  {t.phase3.period}
                </span>
              </div>

              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.phase3.intro}
              </p>
            </section>

            {/* Apps Grid */}
            <section id="apps" className="mb-20">
              <div className="space-y-12">
                {/* SQOOL Classe */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.apps.classe.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.apps.classe.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.apps.classe.desc}
                  </p>
                  <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>
                    {t.apps.classe.research}
                  </div>
                  <figure className="mt-4">
                    <ImageWithFallback
                      src="/images/sqool/sqool_classe.webp"
                      alt={t.captions.classe}
                      caption={t.captions.classe}
                      onClick={() => openLightbox('/images/sqool/sqool_classe.webp')}
                    />
                  </figure>
                </div>

                {/* SQOOL Partage */}
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.apps.partage.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.apps.partage.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className={`text-base mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.apps.partage.desc}
                  </p>
                  <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>
                    {t.apps.partage.research}
                  </div>
                  <figure className="mt-4">
                    <ImageWithFallback
                      src="/images/sqool/sqool_partage.webp"
                      alt={t.captions.partage}
                      caption={t.captions.partage}
                      onClick={() => openLightbox('/images/sqool/sqool_partage.webp')}
                    />
                  </figure>
                </div>

                {/* Grid for smaller apps */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* SQOOL Applications */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.applications.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.applications.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.applications.desc}
                    </p>
                  </div>

                  {/* SQOOL MDM */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.mdm.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.mdm.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.mdm.desc}
                    </p>
                  </div>

                  {/* SQOOL Protect */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.protect.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.protect.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.protect.desc}
                    </p>
                  </div>

                  {/* SQOOL Extend */}
                  <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.apps.extend.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.apps.extend.subtitle}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.apps.extend.desc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* User Research Insights */}
            <section className="mb-16">
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.research.title}
              </h2>
              <p className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.research.subtitle}
              </p>

              <div className="space-y-6">
                {t.research.insights.map((insight, index) => (
                  <div key={index} className={`p-5 rounded-xl border-l-4 ${isDark ? 'bg-white/5 border-blue-500' : 'bg-gray-50 border-blue-500'}`}>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {insight.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {insight.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Impact - Toolkit style */}
            <section id="impact" className="mb-24 md:mb-32">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t.impact.title}
              </h1>
              <p
                className={`text-base leading-relaxed mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t.impact.intro}
              </p>

              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.users}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.usersDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.schools}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.schoolsDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.apps}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.appsDesc}
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1F] border-white/10'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p
                    className={`text-3xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {t.impact.team}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t.impact.teamDesc}
                  </p>
                </div>
              </div>
            </section>

            <hr className={`my-16 md:my-20 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

            {/* Key Learnings */}
            <section className="mb-16">
              <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.learnings.title}
              </h2>

              <div className="space-y-6">
                {t.learnings.items.map((learning, index) => (
                  <div key={index}>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {index + 1}. {learning.title}
                    </h3>
                    <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {learning.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer CTA */}
            <div className={`text-center py-16 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-medium transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
              >
                {t.contactVictor}
              </button>
            </div>
          </main>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal - Using EnhancedLightbox */}
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
    </div>
  );
};

export default SqoolPage;
