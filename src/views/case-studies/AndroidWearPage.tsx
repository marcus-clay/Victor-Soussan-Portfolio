// Android Wear case study page.
// Order: hero, testimonial, summary, then four numbered acts: challenge and goals, design
// approach (four steps), deliverables (the app screen by screen) and result.
// Watch screens come in groups of two or three on a flat grey plate (WatchScreenGroup), the
// making-of photographs in a snap carousel (MediaCarousel); a click opens the lightbox, whose
// list is the gallery view in the same order.

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { imgDims } from '@/utils/imageDimensions'
import { motion } from 'framer-motion';
import { useReveal } from '@/lib/motion'
import VideoPlayer from '@/components/VideoPlayer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudySummary from '@/components/case-study/CaseStudySummary';
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock';
import WatchScreenGroup from '@/components/case-studies/WatchScreenGroup';
import MediaCarousel from '@/components/case-studies/MediaCarousel';
import { ActRule, ActTitle } from '@/components/case-study/ActSection';

import { GalleryItem } from '../../components/BentoGallery';
import EnhancedLightbox, { type LightboxImage } from '../../components/media/EnhancedLightbox';

import { ANDROID_WEAR_TRANSLATIONS } from '../../data/caseStudyTranslations/androidWearTranslations';
import { zoomable } from '@/utils/zoomable'

interface AndroidWearPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
}

const TRANSLATIONS = ANDROID_WEAR_TRANSLATIONS;

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const VIDEO_RE = /\.(mp4|webm|mov)$/i;
const WEAR = '/images/pagesjaunes/Android%20wear';
const SCREENS = `${WEAR}/screens`;

// Every file of the page, once, so the case study and the gallery cannot drift apart
const FILES = {
  hero: `${WEAR}/android_wear_thumbnail%2002.webp`,
  julien: `${SCREENS}/persona_julien_scenario.webp`,
  bernard: `${SCREENS}/persona_bernard_scenario.webp`,
  bernardBoard: `${SCREENS}/AWEAR%20Scenario%2002.webp`,
  sketches: `${WEAR}/early_wireframes.webp`,
  ambientSketches: `${WEAR}/android_wear_ambient_sketches.webp`,
  flows: `${WEAR}/pj%20android%20wear%20flows.webp`,
  flowsDetailed: `${WEAR}/ui_interactions.webp`,
  uiModes: `${WEAR}/pj%20android%20wear%20ui%20modes.webp`,
  ambientDesign: `${SCREENS}/android%20wear%20design%20ambient%20mode.webp`,
  ui: `${WEAR}/pj%20android%20wear%20ui.webp`,
  components: `${WEAR}/component_library.webp`,
  specs1: `${WEAR}/android_wear_design_optim_02.webp`,
  specs2: `${WEAR}/android_wear_design_optim%2003.webp`,
  specs3: `${WEAR}/android_wear_design.webp`,
  time: `${SCREENS}/01%20Time.webp`,
  voice: `${WEAR}/12%20reco%20voc.webp`,
  voice2: `${WEAR}/12b%20reco%20voc.webp`,
  loading: `${SCREENS}/00%20Loading.webp`,
  appList: `${SCREENS}/02%20App%20list.webp`,
  rubriques: `${SCREENS}/03%20Rubriques%20list.webp`,
  fd: `${SCREENS}/07%20FD.webp`,
  fdMap: `${WEAR}/07b%20FD%20Detail%20map.webp`,
  lr1: `${SCREENS}/04%20LR%2001.webp`,
  lr2: `${SCREENS}/05%20LR%2002.webp`,
  lr3: `${SCREENS}/06%20LR%2003.webp`,
  call: `${SCREENS}/08%20Appeler%20BTN.webp`,
  callConfirm: `${WEAR}/11%20connex%20phone.webp`,
  go: `${SCREENS}/09%20Y%20Aller%20BTN.webp`,
  route: `${SCREENS}/10%20Route%20GMaps.webp`,
  keynote: `${WEAR}/design_work_keynote.webp`,
  diagram: `${WEAR}/design_work_keynote_2.webp`,
  notes: `${WEAR}/design_work_detail.webp`,
  devSession: `${WEAR}/dev_session_1.webp`,
  devSession2: `${WEAR}/IMG_20151214_183800.webp`,
  finalReview: `${WEAR}/final_review.webp`,
  insituStore: `${WEAR}/android_wear_insitu_store_01.webp`,
  insituDetail: `${WEAR}/maquette_insitu_FD_03%20(1).webp`,
  mail: `${SCREENS}/android_wear_visuel_mail_comm.webp`,
  videoSquare: `${WEAR}/VID_20151202_184124.mp4`,
  videoRound: `${WEAR}/VID_20151218_100148.mp4`,
};

// Gallery items
const getGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] => {
  const c = TRANSLATIONS[lang].captions;
  const image = (src: string, caption: string, captionDesc?: string): GalleryItem => ({ src, type: 'image', caption, captionDesc });
  const video = (src: string, caption: string): GalleryItem => ({ src, type: 'video', caption });

  return [
    image(FILES.hero, c.hero, c.heroDesc),
    image(FILES.julien, c.julien, c.julienDesc),
    image(FILES.bernard, c.bernard, c.bernardDesc),
    image(FILES.bernardBoard, c.bernardBoard, c.bernardBoardDesc),
    image(FILES.sketches, c.sketches, c.sketchesDesc),
    image(FILES.ambientSketches, c.ambientSketches, c.ambientSketchesDesc),
    image(FILES.flows, c.flows, c.flowsDesc),
    image(FILES.flowsDetailed, c.flowsDetailed, c.flowsDetailedDesc),
    image(FILES.uiModes, c.uiModes, c.uiModesDesc),
    image(FILES.ambientDesign, c.ambientDesign, c.ambientDesignDesc),
    image(FILES.ui, c.ui, c.uiDesc),
    image(FILES.components, c.components, c.componentsDesc),
    image(FILES.specs1, c.specs1, c.specs1Desc),
    image(FILES.specs2, c.specs2, c.specs2Desc),
    image(FILES.specs3, c.specs3, c.specs3Desc),
    image(FILES.time, c.screenTime),
    image(FILES.voice, c.screenVoice),
    image(FILES.voice2, c.screenVoice2),
    image(FILES.loading, c.screenLoading),
    image(FILES.appList, c.screenAppList),
    image(FILES.rubriques, c.screenRubriques),
    image(FILES.fd, c.screenFD),
    image(FILES.fdMap, c.screenFDMap),
    image(FILES.lr1, c.screenLR01),
    image(FILES.lr2, c.screenLR02),
    image(FILES.lr3, c.screenLR03),
    image(FILES.call, c.screenCall),
    image(FILES.callConfirm, c.screenCallConfirm),
    image(FILES.go, c.screenGo),
    image(FILES.route, c.screenRoute),
    image(FILES.keynote, c.keynote),
    image(FILES.diagram, c.diagram),
    image(FILES.notes, c.notes),
    image(FILES.devSession, c.devSession),
    image(FILES.devSession2, c.devSession2),
    image(FILES.finalReview, c.finalReview),
    image(FILES.insituStore, c.insituStore),
    image(FILES.insituDetail, c.insituDetail),
    image(FILES.mail, c.storeSubmission),
    video(FILES.videoSquare, c.videoSquare),
    video(FILES.videoRound, c.videoRound),
  ];
};

// Gallery Card Component
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
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {item.caption}
      </figcaption>
    </motion.figure>
  );
};

// ============================================================================
// LAYOUT BLOCKS (module level so they keep one identity across renders)
// ============================================================================

interface MediaProps {
  src: string;
  /** Accessible name of the zoomable frame, also the one-line caption */
  name: string;
  onZoom: (src: string) => void;
  /** Tailwind max-width class for near-square or portrait media, left-aligned on the media edge */
  maxWidth?: string;
  /** Flat grey ground for cut-outs on a transparent background */
  plate?: boolean;
}

const Media: React.FC<MediaProps> = ({ src, name, onZoom, maxWidth = '', plate = false }) => {
  const reveal = useReveal();
  const video = VIDEO_RE.test(src);
  return (
    <motion.figure {...reveal()} className={maxWidth}>
        <div
          {...zoomable(() => onZoom(src))}
          aria-label={name}
          className={`group rounded-2xl overflow-hidden border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 cursor-zoom-in shadow-sm [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-300 ease-media active:duration-150 active:ease-out ${plate ? 'bg-[#E8E8E8]' : ''}`}
        >
          {video ? (
            <VideoPlayer
              src={src}
              className={`w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          ) : (
            <img
              loading="lazy"
              src={src}
              {...imgDims(src)}
              alt=""
              className={`w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          )}
        </div>
        <figcaption className="mt-3 text-xs text-gray-500">{name}</figcaption>
    </motion.figure>
  );
};

/** One block: an h3, one short paragraph in the reading column, then its visuals */
const Block: React.FC<{ id?: string; title: string; text: string; children?: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="scroll-mt-28 mb-14 md:mb-20 last:mb-0">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    {children && <div className="mt-8 space-y-6 md:space-y-8">{children}</div>}
  </div>
);

/** Act opening: hairline, number, title and an optional lead */
const ActOpen: React.FC<{ index: string; title: string; lead?: string }> = ({ index, title, lead }) => (
  <div className={lead ? 'mb-10 md:mb-14' : 'mb-5 md:mb-9'}>
    <ActTitle index={index} title={title} />
    {lead && <p className="max-w-[62ch] text-base text-gray-600">{lead}</p>}
  </div>
);

const AndroidWearPage: React.FC<AndroidWearPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang];
  const fr = lang === 'fr';
  const galleryItems = getGalleryItems(lang);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Media that is not in the lightbox list opens alone, never silently ignored
  const [singleImage, setSingleImage] = useState<LightboxImage | null>(null);

  const openLightbox = (index: number) => {
    setSingleImage(null);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // The gallery view indexes into these items, so they stay in the same order
  const allImages: LightboxImage[] = galleryItems.map(item => ({
    src: item.src,
    type: (item.type || 'image') as 'image' | 'video',
    caption: item.captionDesc ? `${item.caption}. ${item.captionDesc}` : item.caption,
  }));

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img.src === src);
    if (index !== -1) {
      openLightbox(index);
      return;
    }
    const isVideo = VIDEO_RE.test(src);
    setSingleImage({ src, type: isVideo ? 'video' : 'image', caption: '' });
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const p = t.product;
  const a = t.approach;

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Content */}
      {viewMode !== 'gallery' ? (
        <div id="top">
          {/* Hero: the intro is the executive summary */}
          <CaseStudyHero
            lang={lang}
            projectId="androidwear"
            title={t.hero.title}
            intro={t.hero.intro}
            meta={[
              { label: fr ? 'Rôle' : 'Role', value: t.hero.role },
              { label: fr ? 'Périmètre' : 'Scope', value: t.hero.scope },
              { label: fr ? 'Équipe' : 'Team', value: t.hero.team },
            ]}
            visualAlt={t.captions.hero}
            onZoom={() => handleImageClick(FILES.hero)}
          />

          {/* Client testimonial, right under the hero */}
          <div className="act-wide pb-12 md:pb-16">
            <CaseStudyTestimonialBlock
              quote={t.testimonial.quote}
              author={t.testimonial.author}
              role={t.testimonial.role}
              image="thibault-fighiera.webp"
              linkedin="https://www.linkedin.com/in/thibaultfighiera/"
              lang={lang}
            />
          </div>

          {/* Summary: context, role, deliverables and the three numbers of the project */}
          <CaseStudySummary
            lang={lang}
            context={t.summary.context}
            role={t.summary.role}
            deliverables={t.summary.deliverables}
            metrics={t.summary.metrics}
          />

          {/* ============================================================== */}
          {/* 01 CHALLENGE AND GOALS, then the two personas that framed the journeys */}
          {/* ============================================================== */}
          <section id="context">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="01" title={t.acts.context} />

              <Block id="challenge" title={t.context.challengeTitle} text={t.context.challenge} />
              <Block id="goals" title={t.context.goalsTitle} text={t.context.goals} />

              <Block id="personas" title={t.context.personasTitle} text={t.context.personas}>
                {/* Two A3 boards, one per persona: readable at this width, full size in the lightbox */}
                <MediaCarousel
                  label={t.context.personasCarousel}
                  labels={{ prev: fr ? 'Planche précédente' : 'Previous board', next: fr ? 'Planche suivante' : 'Next board' }}
                  onZoom={handleImageClick}
                  items={[
                    { src: FILES.julien, name: t.context.julien },
                    { src: FILES.bernard, name: t.context.bernard },
                  ]}
                />
              </Block>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 02 DESIGN APPROACH: four steps of the project */}
          {/* ============================================================== */}
          <section id="approach">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="02" title={t.acts.approach} />

              <Block id="platform" title={a.platformTitle} text={a.platform}>
                <Media src={FILES.flows} name={a.flowsName} onZoom={handleImageClick} />
              </Block>

              <Block id="paper" title={a.paperTitle} text={a.paper}>
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <Media src={FILES.sketches} name={a.paperName1} onZoom={handleImageClick} />
                  <Media src={FILES.ambientSketches} name={a.paperName2} onZoom={handleImageClick} />
                </div>
              </Block>

              <Block id="modes" title={a.modesTitle} text={a.modes}>
                <Media src={FILES.uiModes} name={a.modesName} onZoom={handleImageClick} />
              </Block>

              <Block id="hardware" title={a.hardwareTitle} text={a.hardware}>
                <MediaCarousel
                  label={a.photosLabel}
                  labels={{ prev: a.prev, next: a.next }}
                  onZoom={handleImageClick}
                  items={[
                    { src: FILES.keynote, name: a.photoKeynote },
                    { src: FILES.diagram, name: a.photoDiagram },
                    { src: FILES.notes, name: a.photoNotes },
                    { src: FILES.devSession, name: a.photoPair },
                    { src: FILES.devSession2, name: a.photoReview },
                    { src: FILES.finalReview, name: a.photoFinal },
                  ]}
                />
                {/* The two prototype clips, one per watch shape */}
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <Media src={FILES.videoSquare} name={a.videoSquare} onZoom={handleImageClick} />
                  <Media src={FILES.videoRound} name={a.videoRound} onZoom={handleImageClick} />
                </div>
              </Block>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 03 DELIVERABLES: the app screen by screen, then specs and launch visuals */}
          {/* ============================================================== */}
          <section id="product">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="03" title={t.acts.product} lead={p.lead} />

              <div className="mb-14 md:mb-20">
                <Media src={FILES.ui} name={p.overviewName} onZoom={handleImageClick} />
              </div>

              <Block id="launch" title={p.launchTitle} text={p.launch}>
                <WatchScreenGroup
                  groupLabel={p.launchGroup}
                  onZoom={handleImageClick}
                  screens={[
                    { src: FILES.time, label: p.launchTime },
                    { src: FILES.voice, label: p.launchVoice },
                    { src: FILES.loading, label: p.launchLoading },
                  ]}
                />
              </Block>

              <Block id="lists" title={p.listsTitle} text={p.lists}>
                <WatchScreenGroup
                  groupLabel={p.listsGroup}
                  onZoom={handleImageClick}
                  screens={[
                    { src: FILES.appList, label: p.listsLauncher },
                    { src: FILES.rubriques, label: p.listsHome },
                    { src: FILES.fd, label: p.listsDetail },
                  ]}
                />
              </Block>

              <Block id="results-list" title={p.resultsTitle} text={p.results}>
                <WatchScreenGroup
                  groupLabel={p.resultsGroup}
                  onZoom={handleImageClick}
                  screens={[
                    { src: FILES.lr1, label: p.result1 },
                    { src: FILES.lr2, label: p.result2 },
                    { src: FILES.lr3, label: p.result3 },
                  ]}
                />
              </Block>

              <Block id="actions" title={p.actionsTitle} text={p.actions}>
                <WatchScreenGroup
                  groupLabel={p.callGroup}
                  onZoom={handleImageClick}
                  screens={[
                    { src: FILES.call, label: p.call },
                    { src: FILES.callConfirm, label: p.callPhone },
                  ]}
                />
                <WatchScreenGroup
                  groupLabel={p.goGroup}
                  onZoom={handleImageClick}
                  screens={[
                    { src: FILES.go, label: p.go },
                    { src: FILES.route, label: p.goMaps },
                  ]}
                />
                <Media src={FILES.flowsDetailed} name={p.handoffName} onZoom={handleImageClick} />
              </Block>

              <Block id="ambient" title={p.ambientTitle} text={p.ambient}>
                <Media src={FILES.ambientDesign} name={p.ambientName} maxWidth="max-w-[760px]" onZoom={handleImageClick} />
              </Block>

              <Block id="specs" title={p.specsTitle} text={p.specs}>
                <Media src={FILES.specs1} name={p.specsName1} onZoom={handleImageClick} />
                <Media src={FILES.specs2} name={p.specsName2} onZoom={handleImageClick} />
                <Media src={FILES.specs3} name={p.specsName3} onZoom={handleImageClick} />
              </Block>

              <Block id="launch-visuals" title={p.launchVisualsTitle} text={p.launchVisuals}>
                <Media src={FILES.mail} name={p.launchMail} onZoom={handleImageClick} />
                <WatchScreenGroup
                  groupLabel={p.storeGroup}
                  onZoom={handleImageClick}
                  screens={[
                    { src: FILES.insituStore, label: p.storeVisual },
                    { src: FILES.insituDetail, label: p.storeDetail },
                  ]}
                />
              </Block>

              {/* Gallery access */}
              <div>
                <Link
                  href={`/${lang}/project/androidwear/gallery`}
                  className={`inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ${EASE}`}
                >
                  {t.acts.seeAll}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 04 RESULT AND WHAT STAYS OPEN, then learnings */}
          {/* ============================================================== */}
          <section id="results">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="04" title={t.acts.results} />

              <div className="mb-12 md:mb-16 max-w-[62ch] text-base text-gray-600 [&>p+p]:mt-5">
                <p>{t.result.text}</p>
                <p>{t.result.open}</p>
              </div>

              <div id="learnings" className="scroll-mt-28">
                <h3 className="text-title-3 text-gray-900 mb-4 max-w-[56ch]">{t.learnings.title}</h3>
                <ul className="max-w-[62ch] space-y-4">
                  {t.learnings.items.map((item) => (
                    <li key={item.title} className="text-base text-gray-600">
                      <span className="font-medium text-gray-900">{item.title}.</span> {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Gallery View */
        <div className="act-wide py-8 md:py-12">
          <h1 className="sr-only">{t.hero.title} ({t.gallery})</h1>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {galleryItems.map((item, index) => (
              <GalleryCard
                key={item.src}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={singleImage ? [singleImage] : allImages}
        currentIndex={singleImage ? 0 : lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        projectId="androidwear"
      />
    </div>
  );
};

export default AndroidWearPage;
