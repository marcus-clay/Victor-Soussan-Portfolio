// Connect Case Study Page
// Order: hero, summary, then the narration as five numbered acts:
// stakes and objectives, design approach, La Bulle, deliverables, outcome.

import React, { useState } from 'react';
import Link from 'next/link';
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import { imgDims } from '@/utils/imageDimensions'
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getConnectGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { MediaCarousel, MediaStage, type SuiteMediaItem } from '../../components/case-studies/SuiteMedia';

import { CONNECT_TRANSLATIONS } from '../../data/caseStudyTranslations/connectTranslations';
import { zoomable } from '@/utils/zoomable'
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

interface ConnectPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

const DS = '/images/connect/design-sprint';

// Every visual of the case study, in reading order, for the lightbox. The caption keys point
// to `captions` in the translations. Nothing is dropped: what the story does not show stays here.
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/thumbnail-connect.webp', captionKey: 'thumbnail', type: 'image' },
  { src: '/images/connect/connect_overview.webp', captionKey: 'thumbnail', type: 'image' },
  { src: `${DS}/DS 2.webp`, captionKey: 'ds1', type: 'image' },
  { src: `${DS}/DS 5.webp`, captionKey: 'ds2', type: 'image' },
  { src: `${DS}/DS 9.webp`, captionKey: 'ds3', type: 'image' },
  { src: `${DS}/DS 13.webp`, captionKey: 'ds4', type: 'image' },
  { src: `${DS}/DS 16.webp`, captionKey: 'ds5', type: 'image' },
  { src: `${DS}/DS 21.webp`, captionKey: 'ds6', type: 'image' },
  { src: '/videos/connect/connect-design-sprint-compressed.mp4', captionKey: 'designSprint', type: 'video' },
  { src: '/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4', captionKey: 'prototype', type: 'video' },
  { src: '/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp', captionKey: 'homeDark', type: 'image' },
  { src: '/images/connect/connect_dashboard_home_light_full-scaled.webp', captionKey: 'homeLight', type: 'image' },
  { src: '/images/connect/connect_dashboard_applications_full-scaled.webp', captionKey: 'applications', type: 'image' },
  { src: '/videos/connect/connect-loading-user-authent-app-launch-study.mp4', captionKey: 'loadingAuth', type: 'video' },
  { src: '/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4', captionKey: 'bulleDemo', type: 'video' },
  { src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp', captionKey: 'wireframes', type: 'image' },
  { src: '/images/connect/connect_bulle_ui_focus-scaled.webp', captionKey: 'uiFocus', type: 'image' },
  { src: '/images/connect/connect_bulle_icons-1-scaled.webp', captionKey: 'icons', type: 'image' },
  { src: '/images/connect/connect_bulle_behaviour_square_01-scaled.webp', captionKey: 'behaviour1', type: 'image' },
  { src: '/images/connect/connect_bulle_behaviour_square_02-scaled.webp', captionKey: 'behaviour2', type: 'image' },
  { src: '/videos/connect/interaction-bulle-connect-compressed.mp4', captionKey: 'interactionDemo', type: 'video' },
  { src: '/images/connect/connect_tech_architecture-1-scaled.webp', captionKey: 'techArch', type: 'image' },
  { src: '/images/connect/connect_specifications_implem_01-scaled.webp', captionKey: 'specsImplem', type: 'image' },
  { src: '/images/connect/connect_specifications_content_02-scaled.webp', captionKey: 'specsContent', type: 'image' },
  { src: '/videos/connect/connect-specs-app-loading-choregraphy.mp4', captionKey: 'appLoading', type: 'video' },
  { src: '/images/connect/connect_design_system.webp', captionKey: 'designSystem', type: 'image' },
];

// Visuals the story shows only in part, and the shared gallery list does not hold:
// appended to the gallery view so they stay reachable there too.
const EXTRA_GALLERY_KEYS = ['ds1', 'ds2', 'ds3', 'ds4', 'ds5', 'ds6', 'designSprint', 'designSystem'];

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
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-media active:duration-150 active:ease-out [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer src={item.src} className="w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]" />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {item.caption}
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

// One idea: an h3, one short paragraph, its visual below, all in the act column
const Block: React.FC<{ id?: string; title: string; text: string; children?: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="mb-14 md:mb-16 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    {children && <div className="mt-6 md:mt-8">{children}</div>}
  </div>
);

const QUIET_LINK =
  'inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]';

export const ConnectPage: React.FC<ConnectPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = CONNECT_TRANSLATIONS[lang];
  const captions = t.captions as Record<string, string>;
  const baseGalleryItems = getConnectGalleryItems(lang);

  const full = (key: string) => (captions[`${key}Desc`] ? `${captions[key]} · ${captions[`${key}Desc`]}` : captions[key]);

  const galleryItems: GalleryItem[] = [
    ...baseGalleryItems,
    ...allImagesData
      .filter(m => EXTRA_GALLERY_KEYS.includes(m.captionKey) && !baseGalleryItems.some(g => g.src === m.src))
      .map(m => ({
        src: m.src,
        type: m.type,
        caption: captions[m.captionKey],
        captionDesc: captions[`${m.captionKey}Desc`],
      })),
  ];

  const allImages = allImagesData.map(item => ({
    src: item.src,
    type: item.type,
    caption: full(item.captionKey),
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  // Single-item list used when a clicked media is not part of the list
  const [fallbackItem, setFallbackItem] = useState<{ src: string; caption: string; type: 'image' | 'video' } | null>(null);

  useScrollTopOnChange(viewMode);

  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setFallbackItem(null);
      setLightboxIndex(index);
    } else {
      // Never a silent no-op: open the clicked media on its own
      setFallbackItem({ src: imageSrc, caption: '', type: /\.(mp4|webm|mov)$/i.test(imageSrc) ? 'video' : 'image' });
      setLightboxIndex(0);
    }
    setVideoStartTime(startTime);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // A visual of the story: its source, its caption key, and how it sits on the grey stage
  const media = (src: string, key: string, extra: Partial<SuiteMediaItem> = {}): SuiteMediaItem => ({
    src,
    caption: full(key),
    type: /\.(mp4|webm|mov)$/i.test(src) ? 'video' : 'image',
    ...extra,
  });

  const carouselLabels = { prev: t.ui.prev, next: t.ui.next, slide: t.ui.slide };

  const sprintSlides = [
    media(`${DS}/DS 2.webp`, 'ds1'),
    media(`${DS}/DS 5.webp`, 'ds2'),
    media(`${DS}/DS 9.webp`, 'ds3'),
    media(`${DS}/DS 13.webp`, 'ds4'),
    media(`${DS}/DS 16.webp`, 'ds5'),
    media(`${DS}/DS 21.webp`, 'ds6'),
  ];
  const screenSlides = [
    media('/images/connect/connect_dashboard_home_dark_full_smartphone-scaled.webp', 'homeDark'),
    media('/images/connect/connect_dashboard_home_light_full-scaled.webp', 'homeLight'),
    media('/images/connect/connect_dashboard_applications_full-scaled.webp', 'applications'),
  ];
  const bulleSlides = [
    media('/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp', 'wireframes'),
    media('/images/connect/connect_bulle_ui_focus-scaled.webp', 'uiFocus'),
    media('/images/connect/connect_bulle_icons-1-scaled.webp', 'icons'),
    media('/images/connect/connect_bulle_behaviour_square_01-scaled.webp', 'behaviour1'),
    media('/images/connect/connect_bulle_behaviour_square_02-scaled.webp', 'behaviour2'),
  ];
  const deliverableSlides = [
    media('/images/connect/connect_tech_architecture-1-scaled.webp', 'techArch'),
    media('/images/connect/connect_specifications_implem_01-scaled.webp', 'specsImplem'),
    media('/images/connect/connect_specifications_content_02-scaled.webp', 'specsContent'),
    media('/videos/connect/connect-specs-app-loading-choregraphy.mp4', 'appLoading'),
    media('/images/connect/connect_design_system.webp', 'designSystem', { inset: true }),
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={fallbackItem ? [fallbackItem] : allImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="connect"
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
            className="act-wide py-8 md:py-12"
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
            {/* Hero: same structure for every case study. Its intro is the executive summary. */}
            <CaseStudyHero
              lang={lang}
              projectId="connect"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={[
                { label: t.metaLabels.role, value: t.hero.role },
                { label: t.metaLabels.scope, value: t.hero.scope },
                { label: t.metaLabels.company, value: t.meta.company },
              ]}
              onZoom={() => openLightbox('/images/thumbnail-connect.webp')}
              visualAlt={captions.thumbnail}
            />

            {/* Summary: context, role, deliverables. No client testimonial on this page, and no sourced result numbers (the outcome is qualitative). */}
            <CaseStudySummary
              lang={lang}
              context={t.summary.context}
              role={t.summary.role}
              roleItems={t.summary.roleItems}
              deliverables={t.summary.deliverables}
            />

            {/* 01 Stakes and objectives */}
            <section id="stakes">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.acts.stakes} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.stakes.text}</p>

                <h3 className="text-title-3 text-gray-900 mt-12 mb-3 max-w-[56ch]">{t.stakes.objectivesTitle}</h3>
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

            {/* 02 Design approach: three decisions, one visual each */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.acts.approach} />

                <div className="mt-6 md:mt-8">
                  <Block id="sprint" title={t.approach.sprint.title} text={t.approach.sprint.text}>
                    <MediaCarousel items={sprintSlides} label={t.ui.sprintLabel} labels={carouselLabels} onOpen={openLightbox} />
                  </Block>

                  <Block id="prototype" title={t.approach.prototype.title} text={t.approach.prototype.text}>
                    <MediaStage item={media('/videos/connect/connect-dashboard-prototype_complet_4k-compressed.mp4', 'prototype')} onOpen={openLightbox} />
                  </Block>

                  <Block id="dashboard" title={t.approach.dashboard.title} text={t.approach.dashboard.text}>
                    <MediaCarousel items={screenSlides} label={t.ui.screensLabel} labels={carouselLabels} onOpen={openLightbox} />
                  </Block>
                </div>
              </div>
            </section>

            {/* 03 La Bulle */}
            <section id="bulle">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.acts.bulle} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.bulle.text}</p>

                <div className="mt-8 md:mt-10 space-y-10 md:space-y-12">
                  <MediaStage item={media('/videos/connect/Video-demo-bulle-interactions-02-compressed.mp4', 'bulleDemo')} onOpen={openLightbox} />
                  <MediaCarousel items={bulleSlides} label={t.ui.bulleLabel} labels={carouselLabels} onOpen={openLightbox} />
                </div>
              </div>
            </section>

            {/* 04 Deliverables */}
            <section id="deliverables">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="04" title={t.acts.deliverables} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.deliverables.text}</p>

                <div className="mt-8 md:mt-10">
                  <MediaCarousel items={deliverableSlides} label={t.ui.deliverablesLabel} labels={carouselLabels} onOpen={openLightbox} />
                </div>
              </div>
            </section>

            {/* 05 Outcome: what it proved, what it showed, where it leads */}
            <section id="outcome">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="05" title={t.acts.outcome} />
                <div className="max-w-[62ch] text-base text-gray-600 [&>p+p]:mt-5">
                  <p>{t.outcome.text}</p>
                  <p>{t.outcome.text2}</p>
                </div>

                <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-8 gap-y-2">
                  <Link href={`/${lang}/project/sqool`} className={QUIET_LINK}>
                    {t.outcome.readSuite}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href={`/${lang}/project/connect/gallery`} className={QUIET_LINK}>
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

export default ConnectPage;
