// SQOOL Ecosystem Case Study Page - Minimalist aesthetic
// A trunk case study that synthesizes the SQOOL journey (2018-2024)

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { imgDims } from '@/utils/imageDimensions'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock'
import { useStableComponent } from '../../hooks/useStableComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';

import { GalleryItem, getSqoolGalleryItems } from '../../components/BentoGallery';
import { SqoolTimeline } from './SqoolTimeline';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { SQOOL_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolTranslations';
import { zoomable } from '@/utils/zoomable'
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';


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
type LightboxItem = { src: string; caption: string; type: 'image' | 'video' };
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
  { src: '/images/sqool/hi sqool/hisqoolcomponents2x.webp', captionKey: 'designSystem', type: 'image' },
  { src: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp', captionKey: 'classe', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp', captionKey: 'partage', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_09_2x.webp', captionKey: 'applications', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', captionKey: 'mdm', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_08_2x.webp', captionKey: 'protect', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_07_2x.webp', captionKey: 'extend', type: 'image' },
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
      aria-label={item.caption}
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer src={item.src} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]" />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {item.caption}
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// One decision: an h3, one short paragraph, at most one visual below it
// Lives inside the act column: title and paragraph cap their own measure, the visual takes the full column
const Block: React.FC<{ title: string; text: string; children?: React.ReactNode }> = ({ title, text, children }) => (
  <div className="mb-14 md:mb-16 last:mb-0">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <p className="text-base text-gray-600 max-w-[62ch]">{text}</p>
    {children && <div className="mt-6 md:mt-8">{children}</div>}
  </div>
);

// Visuals of the long narration that the curated story no longer shows, and that the
// shared gallery list does not hold: appended to the gallery view so nothing is lost.
const EXTRA_GALLERY_SRCS: { src: string; captionKey: string; type: 'image' | 'video' }[] = [
  { src: '/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp', captionKey: 'marquage', type: 'image' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', captionKey: 'connect', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', captionKey: 'bulle', type: 'video' },
  { src: '/images/sqool/thumbnail_suite_sqool_blue.webp', captionKey: 'suiteSqool', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp', captionKey: 'brandVisual03', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', captionKey: 'brandVisual05', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_10_2x.webp', captionKey: 'brandVisual10', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_11_2x.webp', captionKey: 'brandVisual11', type: 'image' },
  { src: '/images/sqool/systeme de marque/visuel_systeme_de_marque_15.webp', captionKey: 'brandVisual15', type: 'image' },
];

export const SqoolPage: React.FC<SqoolPageProps> = ({
  onClose,
  systemTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  const t = SQOOL_TRANSLATIONS[lang];
  const baseGalleryItems = getSqoolGalleryItems(lang);
  const galleryItems: GalleryItem[] = [
    ...baseGalleryItems,
    ...EXTRA_GALLERY_SRCS
      .filter(extra => !baseGalleryItems.some(item => item.src === extra.src))
      .map(extra => ({
        src: extra.src,
        type: extra.type,
        caption: t.captions[extra.captionKey as keyof typeof t.captions] as string,
        captionDesc: t.captions[`${extra.captionKey}Desc` as keyof typeof t.captions] as string | undefined,
      })),
  ];

  const captionWithDesc = (caption: string, desc?: string) => (desc ? `${caption} · ${desc}` : caption);

  // Story view: every media of the case study, deduplicated by src (several slides reuse the brand visuals)
  const storyImages: LightboxItem[] = [];
  allImagesData.forEach(item => {
    if (storyImages.some(img => img.src === item.src)) return;
    storyImages.push({
      src: item.src,
      type: item.type,
      caption: captionWithDesc(
        t.captions[item.captionKey as keyof typeof t.captions] || '',
        t.captions[`${item.captionKey}Desc` as keyof typeof t.captions]
      ),
    });
  });

  // Gallery view: the lightbox follows the gallery cards
  const galleryLightboxImages: LightboxItem[] = galleryItems.map(item => ({
    src: item.src,
    type: item.type,
    caption: captionWithDesc(item.caption, item.captionDesc),
  }));

  const allImages = viewMode === 'gallery' ? galleryLightboxImages : storyImages;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  // Single-item list used when a clicked media is not part of the current list
  const [fallbackItem, setFallbackItem] = useState<LightboxItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollTopOnChange(viewMode);

  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setFallbackItem(null);
      setLightboxIndex(index);
    } else {
      // Never a silent no-op: open the clicked media on its own
      setFallbackItem({
        src: imageSrc,
        type: /\.(mp4|webm|mov)$/i.test(imageSrc) ? 'video' : 'image',
        caption: '',
      });
      setLightboxIndex(0);
    }
    setVideoStartTime(startTime);
    setLightboxOpen(true);
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

  // Reusable media figure
  const MediaFigure = useStableComponent(({ src, alt, caption, captionDesc, type = 'image', className = '', priority = false }: {
    src: string; alt: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string; priority?: boolean;
  }) => (
    <figure className={className}>
      <div
        {...zoomable(() => openLightbox(src))}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]"
      >
        {type === 'video' ? (
          <VideoPlayer
            src={src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        ) : (
          <img loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} src={src} {...imgDims(src)} alt={alt}
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {caption}{captionDesc && ` · ${captionDesc}`}
      </figcaption>
    </figure>
  ));

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={fallbackItem ? [fallbackItem] : allImages}
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
            className="wrap py-8 md:py-12"
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
        ) : (
          /* Full Case Study View */
          <div key="caseStudy">
            {/* Hero: same structure for every case study. The intro is the executive summary. */}
            <CaseStudyHero
              lang={lang}
              projectId="sqool"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={[
                { label: t.metaLabels.role, value: t.hero.role },
                { label: t.metaLabels.scope, value: t.hero.scope },
                { label: t.metaLabels.company, value: t.meta.company },
              ]}
              visualAlt={t.captions.hero}
            />

            {/* Client testimonial, right under the hero, in the act column */}
            <div className="act-wide pb-12 md:pb-16">
              <div className="max-w-[62ch]">
                <CaseStudyTestimonialBlock
                  quote={t.testimonial.quote}
                  author={t.testimonial.author}
                  role={t.testimonial.role}
                  image="charlotte-rifflet.webp"
                  lang={lang}
                />
              </div>
            </div>

            {/* Summary: context, role, deliverables and sourced numbers */}
            <CaseStudySummary
              lang={lang}
              context={t.summary.context}
              role={t.summary.role}
              roleItems={t.summary.roleItems}
              deliverables={t.summary.deliverables}
              metrics={[
                { value: t.impact.users, label: t.impact.usersDesc },
                { value: t.impact.schools, label: t.impact.schoolsDesc },
                { value: t.impact.apps, label: t.impact.appsDesc },
              ]}
            />

            {/* 01 Approach: the challenge, the journey, three decisions. One timeline, one visual per decision. */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.acts.approach} />
                <p className="text-base text-gray-600 max-w-[62ch]">{t.curated.lead}</p>

                <div className="mt-10 md:mt-12">
                  <SqoolTimeline lang={lang} />
                </div>

                <div className="mt-14 md:mt-16">
                  <div id="phase1">
                    <Block title={t.curated.hisqool.title} text={t.curated.hisqool.text}>
                      <MediaFigure
                        src="/images/sqool/hi sqool/004 003-hp-scroll-2x.webp"
                        alt={t.captions.hisqool}
                        caption={t.captions.hisqool}
                        captionDesc={t.captions.hisqoolDesc}
                      />
                    </Block>

                    <Block title={t.curated.connect.title} text={t.curated.connect.text}>
                      {/* Two interaction videos: the dashboard prototype and La Bulle */}
                      <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 items-start">
                        <MediaFigure
                          src="/videos/connect/connect-dashboard-prototype-compressed.mp4"
                          alt={t.captions.connect}
                          caption={t.captions.connect}
                          type="video"
                        />
                        <MediaFigure
                          src="/videos/connect/Video-demo-bulle-interactions-compressed.mp4"
                          alt={t.captions.bulle}
                          caption={t.captions.bulle}
                          type="video"
                        />
                      </div>
                    </Block>
                  </div>

                  <div id="phase2" className="mt-14 md:mt-16">
                    <Block title={t.curated.pivot.title} text={t.curated.pivot.text}>
                      <MediaFigure
                        src="/images/sqool/thumbnail_suite_sqool_blue.webp"
                        alt={t.captions.suiteSqool}
                        caption={t.captions.suiteSqool}
                      />
                    </Block>
                  </div>
                </div>
              </div>
            </section>

            {/* 02 Product: the system, then the two apps that carry the pivot */}
            <section id="product">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.acts.product} />

                <div id="phase3" className="mt-4 md:mt-6">
                  <Block title={t.curated.system.title} text={t.curated.system.text}>
                    <MediaFigure
                      src="/images/sqool/systeme de marque/visuels_systeme_de_marque_13_2x.webp"
                      alt={t.captions.brandVisual13}
                      caption={t.captions.brandVisual13}
                      captionDesc={t.captions.brandVisual13Desc}
                    />
                  </Block>

                  <Block title={t.curated.classe.title} text={t.curated.classe.text}>
                    <MediaFigure
                      src="/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp"
                      alt={t.captions.classe}
                      caption={t.captions.classe}
                      captionDesc={t.captions.classeDesc}
                    />
                  </Block>

                  <Block title={t.curated.partage.title} text={t.curated.partage.text}>
                    <MediaFigure
                      src="/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp"
                      alt={t.captions.partage}
                      caption={t.captions.partage}
                      captionDesc={t.captions.partageDesc}
                    />
                  </Block>

                  {/* Gallery access */}
                  <Link
                    href={`/${lang}/project/sqool/gallery`}
                    className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    {t.viewAllVisuals}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 03 Learnings */}
            <section id="learnings">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.acts.learnings} />
                <div className="mt-4 md:mt-6">
                  {t.learnings.items.map((learning, index) => (
                    <Block key={index} title={learning.title} text={learning.desc} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolPage;
