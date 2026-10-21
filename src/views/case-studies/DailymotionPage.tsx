// Dailymotion Case Study Page
// Order: hero, summary, then the narration as numbered acts (approach, product, results)

import React, { useState } from 'react';
import Link from 'next/link';
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import { imgDims } from '@/utils/imageDimensions'
import { useStableComponent } from '../../hooks/useStableComponent';
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

// One idea: h3 and one short paragraph (each caps its own measure), one visual below, all in the act column
const Block: React.FC<{ id?: string; title: string; text: string; children: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="mb-12 md:mb-14 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-2 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    <div className="mt-6 md:mt-8">{children}</div>
  </div>
);

// Several visuals of one idea, stacked in the act column
const Visuals: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="space-y-6 md:space-y-8">{children}</div>
);

export const DailymotionPage: React.FC<DailymotionPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = DAILYMOTION_TRANSLATIONS[lang];
  const galleryItems = getDailymotionGalleryItems(lang);

  // Build allImages with translated captions
  // French needs a no-break space before the colon.
  const captionSeparator = lang === 'fr' ? ' : ' : ': ';
  const allImages = allImagesData.map(item => {
    const title = t.captions[item.captionKey as keyof typeof t.captions];
    const desc = t.captions[`${item.captionKey}Desc` as keyof typeof t.captions];
    return {
      src: item.src,
      type: item.type,
      caption: desc ? `${title}${captionSeparator}${desc}` : title,
    };
  });

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

  // Reusable media figure component
  // The figcaption describes the media, so the image alt stays empty and the
  // zoom button takes its accessible name from the caption.
  const MediaFigure = useStableComponent(({ src, caption, captionDesc, type = 'image', className = '' }: {
    src: string; caption: string; captionDesc?: string; type?: 'image' | 'video'; className?: string;
  }) => (
    <figure className={className}>
      <div
        {...zoomable(() => openLightbox(src))}
        aria-label={caption}
        className="group rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]"
      >
        {type === 'video' ? (
          <VideoPlayer
            src={src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={src} {...imgDims(src)} alt=""
            className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-3 text-left text-xs text-gray-500 leading-relaxed">
        {caption}{captionDesc && ` · ${captionDesc}`}
      </figcaption>
    </figure>
  ));

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
            {/* Hero: same structure for every case study. Its intro is the executive summary. */}
            <CaseStudyHero
              lang={lang}
              projectId="dailymotion"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={[
                { label: t.metaLabels.role, value: t.hero.role },
                { label: t.metaLabels.scope, value: t.hero.scope },
              ]}
              visualAlt={t.captions.hero}
              externalHref="https://www.dailymotion.com/partner"
              externalLabel={t.visitDailymotion}
            />

            {/* Summary: context, role, deliverables and the sourced numbers. No client testimonial exists for this study. */}
            <CaseStudySummary
              lang={lang}
              context={t.summary.context}
              role={t.summary.role}
              roleItems={t.summary.roleItems}
              deliverables={t.summary.deliverables}
              metrics={[
                { value: t.impact.partners, label: t.impact.partnersDesc },
                { value: t.impact.reduction, label: t.impact.reductionDesc },
                { value: t.impact.components, label: t.impact.componentsDesc },
              ]}
            />

            {/* 01 Workflows: three decisions, one proof visual each */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.brief.workflowsTitle} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.lead}</p>

                <div className="mt-10 md:mt-12">
                  <Block id="upload" title={t.upload.question} text={t.brief.upload}>
                    <Visuals>
                      <MediaFigure
                        src="/images/dailymotion/dailymotion_-_upload2x.webp"
                        caption={t.captions.batchUpload}
                      />
                      <MediaFigure
                        src="/videos/dailymotion/video_-_cancel_upload.mp4"
                        type="video"
                        caption={t.captions.cancelUpload}
                      />
                    </Visuals>
                  </Block>

                  <Block id="live" title={t.live.question} text={t.brief.live}>
                    <MediaFigure
                      src="/images/dailymotion/dailymotion_-_livestream2x.webp"
                      caption={t.captions.liveMonitor}
                    />
                  </Block>

                  <Block id="player" title={t.player.question} text={t.brief.player}>
                    <Visuals>
                      <MediaFigure
                        src="/images/dailymotion/dailymotion_-_create_player2x.webp"
                        caption={t.captions.playerConfigurator}
                      />
                      <MediaFigure
                        src="/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4"
                        type="video"
                        caption={t.captions.embedCode}
                      />
                    </Visuals>
                  </Block>
                </div>

                {/* Quiet way to the full gallery */}
                <div className="mt-10 md:mt-12">
                  <Link
                    href={`/${lang}/project/dailymotion/gallery`}
                    className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  >
                    {t.acts.viewAll}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 02 Design system: one visual */}
            <section id="design-system">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.designSystem.sectionTitle} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.designSystemLead}</p>
                <div className="mt-8 md:mt-10">
                  <MediaFigure
                    src="/images/dailymotion/design_system_-_component_library2x.webp"
                    caption={t.captions.uiKitComponents}
                  />
                </div>
              </div>
            </section>

            {/* 03 Results: outcomes only. The three numbers of the summary are not repeated. */}
            <section id="results">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.acts.results} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.brief.resultsLead}</p>

                <dl id="impact" className="mt-8 border-y border-gray-100">
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-sm text-gray-500">{t.impact.videosDesc}</dt>
                    <dd className="text-title-3 text-gray-900 tabular-nums">{t.impact.videos}</dd>
                  </div>
                </dl>

                {/* Closing visual: the finished video manager, in colour */}
                <div className="mt-8 md:mt-10">
                  <MediaFigure
                    src="/images/dailymotion/dailymotion_-_video_manager.svg"
                    caption={t.captions.videoLibrary}
                  />
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
