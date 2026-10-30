// Dailymotion Case Study Page
// Order: hero, summary, then four acts: the challenge and its objectives, the design approach
// (upload, live, player, specifications), the design system, the results. Each block is a short
// title and paragraph followed by its visuals, shown large on the shared grey stage.

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import { StageCarousel, StageFigure, type StageItem } from '@/components/case-studies/CaseStudyMedia'
import { imgDims } from '@/utils/imageDimensions'
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { GalleryItem, getDailymotionGalleryItems } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { DAILYMOTION_TRANSLATIONS } from '../../data/caseStudyTranslations/dailymotionTranslations';
import { zoomable } from '@/utils/zoomable'
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

interface DailymotionPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

// All media (images + videos) for lightbox navigation
type MediaItem = { src: string; captionKey: string; type: 'image' | 'video' };
const allImagesData: MediaItem[] = [
  { src: '/images/thumbnail-dailymotion-web-platform.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp', captionKey: 'hero', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_upload_2x.webp', captionKey: 'videoManagement', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_livestream_2x.webp', captionKey: 'liveDashboard', type: 'image' },
  { src: '/images/dailymotion/dailymotion_focus_player_template_2x.webp', captionKey: 'playerManager', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_upload2x.webp', captionKey: 'batchUpload', type: 'image' },
  { src: '/videos/dailymotion/video_-_cancel_upload.mp4', captionKey: 'cancelUpload', type: 'video' },
  { src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4', captionKey: 'thumbnailUpdate', type: 'video' },
  { src: '/videos/dailymotion/video_add_subtitle.mp4', captionKey: 'addSubtitles', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_video_manager.svg', captionKey: 'videoLibrary', type: 'image' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', captionKey: 'embedCode', type: 'video' },
  { src: '/videos/dailymotion/switch_12-24.mp4', captionKey: 'timePicker', type: 'video' },
  { src: '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4', captionKey: 'passwordProtection', type: 'video' },
  { src: '/videos/dailymotion/Geoblocking.mp4', captionKey: 'geoblocking', type: 'video' },
  { src: '/images/dailymotion/dailymotion_-_share_expanded2x.webp', captionKey: 'shareModal', type: 'image' },
  { src: '/images/dailymotion/Share_-_keyboard_input2x.webp', captionKey: 'keyboardMapping', type: 'image' },
  { src: '/images/dailymotion/image.webp', captionKey: 'startTimeInput', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp', captionKey: 'addToPlaylist', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_live_-_countdown2x.webp', captionKey: 'preBroadcast', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_livestream2x.webp', captionKey: 'liveMonitor', type: 'image' },
  { src: '/images/dailymotion/dailymotion_-_create_player2x.webp', captionKey: 'playerConfigurator', type: 'image' },
  { src: '/images/dailymotion/design_system_-_Styles2x.webp', captionKey: 'uiKitStyles', type: 'image' },
  { src: '/images/dailymotion/design_system_-_component_library2x.webp', captionKey: 'uiKitComponents', type: 'image' },
];

const HERO_SRC = '/images/thumbnail-dailymotion-web-platform.webp';

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

// One idea: an h3, one short paragraph (each caps its own measure), its visuals below, all in the act column
const Block: React.FC<{ id?: string; title: string; text: string; children: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="mb-14 md:mb-16 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-2 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">{children}</div>
  </div>
);

export const DailymotionPage: React.FC<DailymotionPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = DAILYMOTION_TRANSLATIONS[lang];
  const galleryItems = getDailymotionGalleryItems(lang);

  // French needs a no-break space before the colon.
  const captionSeparator = lang === 'fr' ? ' : ' : ': ';
  const allImages = useMemo(() => allImagesData.map(item => {
    const title = t.captions[item.captionKey as keyof typeof t.captions];
    const desc = t.captions[`${item.captionKey}Desc` as keyof typeof t.captions];
    return {
      src: item.src,
      type: item.type,
      caption: desc ? `${title}${captionSeparator}${desc}` : title,
    };
  }), [t, captionSeparator]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);

  // Scroll to top when the view changes
  useScrollTopOnChange(viewMode);

  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(0);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // A visual of the page: its short name under it, its source and its stage treatment here
  const cap = (key: string) => t.captions[key as keyof typeof t.captions] as string;
  // A video is named by what it shows, in a few words (the `Clip` caption); a picture by its title
  const visual = (src: string, key: string, extra: Partial<StageItem> = {}): StageItem => ({
    src,
    caption: cap(extra.type === 'video' ? `${key}Clip` : key),
    ...extra,
  });
  const stripProps = { prevLabel: t.ui.previous, nextLabel: t.ui.next, onZoom: openLightbox };

  const uploadStrip: StageItem[] = [
    visual('/videos/dailymotion/video_-_cancel_upload.mp4', 'cancelUpload', { type: 'video', size: [1730, 1080] }),
    visual('/videos/dailymotion/video_2025-11-10_02.26.48.mp4', 'thumbnailUpdate', { type: 'video', size: [1080, 1080] }),
    visual('/videos/dailymotion/video_add_subtitle.mp4', 'addSubtitles', { type: 'video', size: [1080, 1080] }),
  ];
  const accessStrip: StageItem[] = [
    visual('/videos/dailymotion/Geoblocking.mp4', 'geoblocking', { type: 'video', size: [2048, 2022], maxWidth: 780 }),
    visual('/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4', 'passwordProtection', { type: 'video', size: [2048, 1860], maxWidth: 780 }),
  ];
  const liveStrip: StageItem[] = [
    visual('/images/dailymotion/dailymotion_-_live_-_countdown2x.webp', 'preBroadcast', { onStage: true }),
    visual('/images/dailymotion/dailymotion_-_livestream2x.webp', 'liveMonitor', { onStage: true }),
  ];
  const playerStrip: StageItem[] = [
    visual('/images/dailymotion/dailymotion_-_create_player2x.webp', 'playerConfigurator', { onStage: true }),
    visual('/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', 'embedCode', { type: 'video', size: [2048, 2004], maxWidth: 680 }),
  ];
  const specsStrip: StageItem[] = [
    visual('/videos/dailymotion/switch_12-24.mp4', 'timePicker', { type: 'video', size: [420, 520], maxWidth: 420 }),
    visual('/images/dailymotion/dailymotion_-_share_expanded2x.webp', 'shareModal', { onStage: true }),
    visual('/images/dailymotion/Share_-_keyboard_input2x.webp', 'keyboardMapping'),
    visual('/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.webp', 'addToPlaylist', { onStage: true }),
  ];
  const designSystemStrip: StageItem[] = [
    visual('/images/dailymotion/design_system_-_component_library2x.webp', 'uiKitComponents'),
    visual('/images/dailymotion/design_system_-_Styles2x.webp', 'uiKitStyles'),
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type as 'image' | 'video'
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="dailymotion"
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
            <div id="top">
              {/* Hero: same structure for every case study. Its intro is the executive summary. */}
              <CaseStudyHero
                lang={lang}
                projectId="dailymotion"
                title={t.hero.title}
                intro={t.hero.intro}
                meta={[
                  { label: t.metaLabels.role, value: t.hero.role },
                  { label: t.metaLabels.period, value: t.hero.period },
                  { label: t.metaLabels.team, value: t.hero.team },
                  { label: t.metaLabels.scope, value: t.hero.scope },
                ]}
                onZoom={() => openLightbox(HERO_SRC)}
                visualAlt={t.captions.hero}
                externalHref="https://www.dailymotion.com/partner"
                externalLabel={t.visitDailymotion}
              />
            </div>

            {/* Summary: context, role, deliverables and the sourced numbers. No client testimonial exists for this study. */}
            <CaseStudySummary
              lang={lang}
              context={t.summary.context}
              role={t.summary.role}
              roleItems={t.summary.roleItems}
              deliverables={t.summary.deliverables}
              metrics={t.summary.metrics}
            />

            {/* 01 Challenge and objectives: text only, the visuals start with the approach */}
            <section id="challenge">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.challenge.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.challenge.text}</p>
                <h3 className="mt-8 text-title-3 text-gray-900">{t.challenge.objectivesTitle}</h3>
                <ul className="mt-3 max-w-[62ch] list-disc pl-5 space-y-1.5 text-base text-gray-600 marker:text-gray-400">
                  {t.challenge.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 02 Approach: three workflows, then the specifications that carried them to delivery */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.approach.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.approach.lead}</p>

                <div className="mt-10 md:mt-12">
                  <Block id="upload" title={t.approach.upload.title} text={t.approach.upload.text}>
                    <StageFigure item={visual('/images/dailymotion/dailymotion_-_upload2x.webp', 'batchUpload', { onStage: true, maxWidth: 820 })} onZoom={openLightbox} />
                    <StageCarousel items={uploadStrip} ariaLabel={t.ui.carouselInteractions} {...stripProps} />
                    <StageCarousel items={accessStrip} ariaLabel={t.ui.carouselAccess} {...stripProps} />
                  </Block>

                  <Block id="live" title={t.approach.live.title} text={t.approach.live.text}>
                    <StageCarousel items={liveStrip} ariaLabel={t.ui.carouselLive} {...stripProps} />
                  </Block>

                  <Block id="player" title={t.approach.player.title} text={t.approach.player.text}>
                    <StageCarousel items={playerStrip} ariaLabel={t.ui.carouselPlayer} {...stripProps} />
                  </Block>

                  <Block id="specs" title={t.approach.specs.title} text={t.approach.specs.text}>
                    <StageCarousel items={specsStrip} ariaLabel={t.ui.carouselSpecs} {...stripProps} />
                  </Block>
                </div>

                {/* Quiet way to the full gallery */}
                <div className="mt-10 md:mt-12">
                  <Link
                    href={`/${lang}/project/dailymotion/gallery`}
                    className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    {t.ui.viewAll}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 03 Design system */}
            <section id="design-system">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.designSystem.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.designSystem.text}</p>
                <div className="mt-8 md:mt-10">
                  <StageCarousel items={designSystemStrip} ariaLabel={t.ui.carouselDesignSystem} {...stripProps} />
                </div>
              </div>
            </section>

            {/* 04 Results: the numbers are in the summary and are not repeated here */}
            <section id="results">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="04" title={t.results.title} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.results.text}</p>
                <div className="mt-8 md:mt-10">
                  <StageFigure item={visual('/images/dailymotion/dailymotion_-_video_manager.svg', 'videoLibrary', { onStage: true })} onZoom={openLightbox} />
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailymotionPage;
