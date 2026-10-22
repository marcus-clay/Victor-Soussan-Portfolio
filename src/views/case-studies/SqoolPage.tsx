// SQOOL Ecosystem Case Study Page
// A trunk case study that synthesizes the SQOOL journey (2018-2024) and points to Connect and SQOOL Classe.
// Order: hero, testimonial, summary, then four numbered acts:
// stakes and objectives, design approach, one app per problem, outcome and lessons.

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { imgDims } from '@/utils/imageDimensions'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';

import { GalleryItem, getSqoolGalleryItems } from '../../components/BentoGallery';
import { SqoolTimeline } from './SqoolTimeline';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { MediaCarousel, MediaStage, type SuiteMediaItem } from '../../components/case-studies/SuiteMedia';

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

const BRAND = '/images/sqool/systeme de marque';
const HISQOOL = '/images/sqool/hi sqool';

// Media items for the lightbox, in reading order. Nothing is dropped: what the story does not
// show stays reachable here and in the gallery.
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
type LightboxItem = { src: string; caption: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/thumbnail-sqool-suite.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/sqool/hero_ecosystem_sqool.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp', captionKey: 'distribution', type: 'image' },
  { src: '/images/sqool/image-unowhy-shootingphoto-tablette.webp', captionKey: 'tablette', type: 'image' },
  { src: '/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp', captionKey: 'marquage', type: 'image' },
  { src: '/images/sqool/sqool_legacy_launcher_eleve.webp', captionKey: 'legacyLauncher', type: 'image' },
  { src: '/images/sqool/sqool_legacy_manager_teacher.webp', captionKey: 'legacyManager', type: 'image' },
  { src: '/images/sqool/sqool_legacy_mdm.webp', captionKey: 'legacyMdm', type: 'image' },
  { src: `${HISQOOL}/004 003-hp-scroll-2x.webp`, captionKey: 'hisqool', type: 'image' },
  { src: `${HISQOOL}/021 020b-chat-input-doc-comment-2x.webp`, captionKey: 'hisqoolChat', type: 'image' },
  { src: `${HISQOOL}/hisqoolcomponents2x.webp`, captionKey: 'hisqoolComponents', type: 'image' },
  { src: `${HISQOOL}/hisqooltokens2x3.webp`, captionKey: 'hisqoolTokens', type: 'image' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', captionKey: 'connect', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', captionKey: 'bulle', type: 'video' },
  { src: '/images/sqool/thumbnail_suite_sqool_blue.webp', captionKey: 'suiteSqool', type: 'image' },
  // Brand system visuals
  { src: `${BRAND}/visuels_systeme_de_marque_01_2x.webp`, captionKey: 'brandVisual01', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_02_2x.webp`, captionKey: 'brandVisual02', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_03_2x.webp`, captionKey: 'brandVisual03', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_04_2x.webp`, captionKey: 'brandVisual04', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_05_2x.webp`, captionKey: 'brandVisual05', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_06_2x.webp`, captionKey: 'brandVisual06', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_07_2x.webp`, captionKey: 'brandVisual07', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_08_2x.webp`, captionKey: 'brandVisual08', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_09_2x.webp`, captionKey: 'brandVisual09', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_10_2x.webp`, captionKey: 'brandVisual10', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_11_2x.webp`, captionKey: 'brandVisual11', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_12_2x.webp`, captionKey: 'brandVisual12', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_13_2x.webp`, captionKey: 'brandVisual13', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_14_2x.webp`, captionKey: 'brandVisual14', type: 'image' },
  { src: `${BRAND}/visuel_systeme_de_marque_15.webp`, captionKey: 'brandVisual15', type: 'image' },
  { src: `${HISQOOL}/hisqoolcomponents2x.webp`, captionKey: 'designSystem', type: 'image' },
  { src: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp', captionKey: 'classe', type: 'image' },
];

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
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

// One decision: an h3, one short paragraph, its visual below. Lives inside the act column:
// title and paragraph cap their own measure, the visual takes the full column.
const Block: React.FC<{ id?: string; title: string; text: string; children?: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="mb-14 md:mb-16 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <p className="text-base text-gray-600 max-w-[62ch]">{text}</p>
    {children && <div className="mt-6 md:mt-8">{children}</div>}
  </div>
);

const QUIET_LINK =
  'inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]';

// Visuals of the long narration that the curated story no longer shows, and that the
// shared gallery list does not hold: appended to the gallery view so nothing is lost.
const EXTRA_GALLERY_SRCS: { src: string; captionKey: string; type: 'image' | 'video' }[] = [
  { src: '/images/sqool/image-unowhy-marquage-fonctionnalites-appareils.webp', captionKey: 'marquage', type: 'image' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', captionKey: 'connect', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', captionKey: 'bulle', type: 'video' },
  { src: '/images/sqool/thumbnail_suite_sqool_blue.webp', captionKey: 'suiteSqool', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_03_2x.webp`, captionKey: 'brandVisual03', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_05_2x.webp`, captionKey: 'brandVisual05', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_10_2x.webp`, captionKey: 'brandVisual10', type: 'image' },
  { src: `${BRAND}/visuels_systeme_de_marque_11_2x.webp`, captionKey: 'brandVisual11', type: 'image' },
  { src: `${BRAND}/visuel_systeme_de_marque_15.webp`, captionKey: 'brandVisual15', type: 'image' },
];

export const SqoolPage: React.FC<SqoolPageProps> = ({
  onClose,
  viewMode,
  lang = 'en',
}) => {
  const t = SQOOL_TRANSLATIONS[lang];
  const captions = t.captions as Record<string, string>;
  const baseGalleryItems = getSqoolGalleryItems(lang);
  const galleryItems: GalleryItem[] = [
    ...baseGalleryItems,
    ...EXTRA_GALLERY_SRCS
      .filter(extra => !baseGalleryItems.some(item => item.src === extra.src))
      .map(extra => ({
        src: extra.src,
        type: extra.type,
        caption: captions[extra.captionKey],
        captionDesc: captions[`${extra.captionKey}Desc`],
      })),
  ];

  const full = (key: string) => (captions[`${key}Desc`] ? `${captions[key]} · ${captions[`${key}Desc`]}` : captions[key]);

  // Story view: every media of the case study, deduplicated by src
  const storyImages: LightboxItem[] = [];
  allImagesData.forEach(item => {
    if (storyImages.some(img => img.src === item.src)) return;
    storyImages.push({ src: item.src, type: item.type, caption: full(item.captionKey) || '' });
  });

  // Gallery view: the lightbox follows the gallery cards
  const galleryLightboxImages: LightboxItem[] = galleryItems.map(item => ({
    src: item.src,
    type: item.type,
    caption: item.captionDesc ? `${item.caption} · ${item.captionDesc}` : item.caption,
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

  // A visual of the story: its source, its caption key, and how it sits on the grey stage
  const media = (src: string, key: string, extra: Partial<SuiteMediaItem> = {}): SuiteMediaItem => ({
    src,
    caption: full(key),
    type: /\.(mp4|webm|mov)$/i.test(src) ? 'video' : 'image',
    ...extra,
  });

  const carouselLabels = { prev: t.ui.prev, next: t.ui.next, slide: t.ui.slide };

  const legacySlides = [
    media('/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.webp', 'distribution'),
    media('/images/sqool/sqool_legacy_launcher_eleve.webp', 'legacyLauncher', { inset: true }),
    media('/images/sqool/sqool_legacy_manager_teacher.webp', 'legacyManager'),
    media('/images/sqool/sqool_legacy_mdm.webp', 'legacyMdm'),
  ];
  const hisqoolSlides = [
    media(`${HISQOOL}/004 003-hp-scroll-2x.webp`, 'hisqool'),
    media(`${HISQOOL}/021 020b-chat-input-doc-comment-2x.webp`, 'hisqoolChat'),
    media(`${HISQOOL}/hisqoolcomponents2x.webp`, 'hisqoolComponents', { inset: true }),
    media(`${HISQOOL}/hisqooltokens2x3.webp`, 'hisqoolTokens'),
  ];
  const systemSlides = [
    media(`${BRAND}/visuels_systeme_de_marque_13_2x.webp`, 'brandVisual13', { inset: true }),
    media(`${BRAND}/visuels_systeme_de_marque_02_2x.webp`, 'brandVisual02', { inset: true }),
    media(`${BRAND}/visuels_systeme_de_marque_01_2x.webp`, 'brandVisual01'),
    media(`${BRAND}/visuels_systeme_de_marque_14_2x.webp`, 'brandVisual14'),
    media(`${BRAND}/visuels_systeme_de_marque_12_2x.webp`, 'brandVisual12'),
    media(`${BRAND}/visuel_systeme_de_marque_15.webp`, 'brandVisual15', { inset: true }),
  ];
  const appSlides = [
    media('/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp', 'classe'),
    media(`${BRAND}/visuels_systeme_de_marque_04_2x.webp`, 'partage'),
    media(`${BRAND}/visuels_systeme_de_marque_09_2x.webp`, 'applications'),
    media(`${BRAND}/visuels_systeme_de_marque_08_2x.webp`, 'protect'),
    media(`${BRAND}/visuels_systeme_de_marque_07_2x.webp`, 'extend'),
  ];

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
              {galleryItems.map((item) => (
                <GalleryCard
                  key={item.src}
                  item={item}
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
              onZoom={() => openLightbox('/images/thumbnail-sqool-suite.webp')}
              visualAlt={captions.hero}
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
                { value: lang === 'fr' ? '500 000+' : '500,000+', label: lang === 'fr' ? 'Élèves et enseignants' : 'Students and teachers' },
                { value: '465', label: lang === 'fr' ? 'Établissements équipés en Île-de-France' : 'Schools equipped across Île-de-France' },
                { value: '7', label: lang === 'fr' ? 'Applications web livrées' : 'Web applications shipped' },
              ]}
            />

            {/* 01 Stakes and objectives */}
            <section id="stakes">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.acts.stakes} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.stakes.text1}</p>

                <div className="mt-8 md:mt-10">
                  <MediaCarousel items={legacySlides} label={t.ui.legacyLabel} labels={carouselLabels} onOpen={openLightbox} />
                </div>

                <p className="mt-12 max-w-[62ch] text-base text-gray-600">{t.stakes.text2}</p>
                <h3 className="text-title-3 text-gray-900 mt-10 mb-3 max-w-[56ch]">{t.stakes.objectivesTitle}</h3>
                <ul className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                  {t.stakes.objectives.map((o) => (
                    <li key={o.title} className="py-4">
                      <span className="block text-base font-medium text-gray-900">{o.title}</span>
                      <span className="block mt-1 text-base text-gray-600">{o.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 02 Design approach: the journey at a glance, then four moves */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.acts.approach} />

                <div className="mt-6 md:mt-8">
                  <SqoolTimeline lang={lang} />
                </div>

                <div className="mt-14 md:mt-16">
                  <Block id="hisqool" title={t.approach.hisqool.title} text={t.approach.hisqool.text}>
                    <MediaCarousel items={hisqoolSlides} label={t.ui.hisqoolLabel} labels={carouselLabels} onOpen={openLightbox} />
                  </Block>

                  <Block id="connect" title={t.approach.connect.title} text={t.approach.connect.text}>
                    <MediaStage item={media('/videos/connect/connect-dashboard-prototype-compressed.mp4', 'connect')} onOpen={openLightbox} />
                    <Link href={`/${lang}/project/connect`} className={`${QUIET_LINK} mt-4`}>
                      {t.approach.connect.link}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </Block>

                  <Block id="pivot" title={t.approach.pivot.title} text={t.approach.pivot.text}>
                    <MediaStage item={media('/images/sqool/thumbnail_suite_sqool_blue.webp', 'suiteSqool')} onOpen={openLightbox} />
                  </Block>

                  <Block id="system" title={t.approach.system.title} text={t.approach.system.text}>
                    <MediaCarousel items={systemSlides} label={t.ui.systemLabel} labels={carouselLabels} onOpen={openLightbox} />
                  </Block>
                </div>
              </div>
            </section>

            {/* 03 One app per audience and per problem */}
            <section id="deliverables">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.acts.deliverables} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.apps.text}</p>

                <ul className="mt-8 max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                  {t.apps.items.map((app) => (
                    <li key={app.title} className="py-4">
                      <span className="block text-base font-medium text-gray-900">{app.title}</span>
                      <span className="block mt-1 text-base text-gray-600">{app.text}</span>
                      {'link' in app && app.link && (
                        <Link href={`/${lang}/project/sqool-classe`} className={`${QUIET_LINK} mt-1`}>
                          {app.link}
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 md:mt-12">
                  <MediaCarousel items={appSlides} label={t.ui.appsLabel} labels={carouselLabels} onOpen={openLightbox} />
                </div>
              </div>
            </section>

            {/* 04 Outcome and lessons */}
            <section id="outcome">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="04" title={t.acts.outcome} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.outcome.text}</p>

                <h3 className="text-title-3 text-gray-900 mt-12 mb-3 max-w-[56ch]">{t.outcome.learningsTitle}</h3>
                <ul className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                  {t.outcome.learnings.map((l) => (
                    <li key={l.title} className="py-4">
                      <span className="block text-base font-medium text-gray-900">{l.title}</span>
                      <span className="block mt-1 text-base text-gray-600">{l.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 md:mt-12">
                  <Link href={`/${lang}/project/sqool/gallery`} className={QUIET_LINK}>
                    {t.outcome.viewAll}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
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
