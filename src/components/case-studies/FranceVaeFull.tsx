/**
 * FranceVaeFull - Complete case study: hero, testimonial, summary, then four acts
 *
 * - 01 Challenge: why delivering fast was hard, and the three objectives
 * - 02 Approach: three moves (shared rhythm, user knowledge, workshops with accompaniment providers)
 * - 03 Deliverables: employer MVP, AI prototypes, homepage and search, ministry video
 * - 04 Results and learnings
 *
 * The text lives in `FRANCEVAE_CASE_STUDY`. Every block is a short title and paragraph followed by
 * its visuals, shown large on the shared grey stage (see `CaseStudyMedia`).
 */

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { imgDims } from '@/utils/imageDimensions'
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import { StageCarousel, StageFigure, type StageItem } from './CaseStudyMedia'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import { FRANCEVAE_CASE_STUDY } from '@/data/caseStudyTranslations/franceVaeTranslations'
import {
  ArrowRight,
  Play,
  ArrowSquareOut as ExternalLink,
  CaretDown as ChevronDown,
  ArrowsOut,
} from '@phosphor-icons/react';

interface FranceVaeFullProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
  onContact?: () => void;
}

const IMG = '/images/francevae/';
const HERO_SRC = `${IMG}thumbnail_france_vae.webp`;
const BEFORE_SRC = `${IMG}france_vae_home_before_2x.webp`;
const AFTER_SRC = `${IMG}france_vae_home_after_2x.webp`;
const MINISTER_VIDEO_SRC = "/images/francevae/20250701 - Video ministre - revision 3'30.mp4";
const VAE_COLLECTIVE_PROTOTYPE_URL = 'https://endearing-taffy-c86c69.netlify.app/';
const UXR_REPORT_URL = 'https://tests-utilisateur-tableau-de-bord-c.vercel.app';
const AI_CHATBOT_DEMO_URL = 'https://joyful-unicorn-489a7b.netlify.app';
const AI_RADAR_DEMO_URL = 'https://flourishing-cascaron-0d6509.netlify.app';

// Quiet text link used for demos and reports: 44px target, press feedback
const quietLinkClass =
  'inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]';

// ============================================================================
// BEFORE/AFTER SLIDER COMPONENT
// ============================================================================

const BeforeAfterSlider: React.FC<{
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  sliderLabel: string;
  /** Accessible name of the full size button */
  zoomLabel: string;
  /** Opens the shared lightbox on the given image */
  onZoom: (src: string) => void;
}> = ({ beforeSrc, afterSrc, beforeLabel, afterLabel, beforeAlt, afterAlt, sliderLabel, zoomLabel, onZoom }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Pointer events cover mouse, touch and pen; capture keeps the drag alive outside the frame
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition(p => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition(p => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg overflow-hidden cursor-ew-resize select-none touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After image (full size, visible on right side) */}
      <img
        loading="lazy"
        src={afterSrc} {...imgDims(afterSrc)}
        alt={afterAlt}
        className="w-full h-auto block pointer-events-none"
        draggable={false}
      />

      {/* Before image (clipped with clip-path, visible on left side) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          loading="lazy"
          src={beforeSrc} {...imgDims(beforeSrc)}
          alt={beforeAlt}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Slider handle (the focusable control) */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={sliderLabel}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${beforeLabel} ${Math.round(sliderPosition)} %`}
        onKeyDown={handleKeyDown}
        className="group absolute top-0 bottom-0 w-1 cursor-ew-resize z-20 focus-visible:outline-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="absolute inset-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]" />

        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-gray-900">
          <div className="flex items-center gap-0.5">
            <ChevronDown size={16} className="text-gray-700 rotate-90" />
            <ChevronDown size={16} className="text-gray-700 -rotate-90" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold z-10 bg-white/90 text-gray-900 shadow-md pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold z-10 bg-white/90 text-gray-900 shadow-md pointer-events-none">
        {afterLabel}
      </div>

      {/* Full size: a separate control, because a press anywhere on the frame moves the slider.
          It stops the pointer events so the frame never starts a drag or captures the click. */}
      <button
        type="button"
        aria-label={zoomLabel}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onZoom(afterSrc)}
        className="absolute bottom-4 right-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-900 shadow-md cursor-zoom-in active:scale-[0.95] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] before:absolute before:-inset-1 before:content-['']"
      >
        <ArrowsOut size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

// ============================================================================
// BLOCK: a short title, one paragraph, optional quiet links, then its visuals
// ============================================================================

const Block: React.FC<{
  id: string;
  title: string;
  text: string;
  links?: { href: string; label: string; play?: boolean }[];
  children?: React.ReactNode;
}> = ({ id, title, text, links, children }) => (
  <div id={id} className="mb-14 md:mb-16 last:mb-0 scroll-mt-24">
    <h3 className="text-title-3 text-gray-900 mb-2 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    {links && links.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-x-6">
        {links.map(link => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={quietLinkClass}>
            {link.play && <Play size={14} aria-hidden="true" />}
            {link.label}
            {!link.play && <ExternalLink size={14} aria-hidden="true" />}
          </a>
        ))}
      </div>
    )}
    {children && <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">{children}</div>}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const FranceVaeFull: React.FC<FranceVaeFullProps> = ({
  lang,
  onImageClick,
}) => {
  const t = FRANCEVAE_CASE_STUDY[lang];
  const cap = (key: string) => t.captions[key as keyof typeof t.captions] as string;
  const visual = (file: string, key: string, extra: Partial<StageItem> = {}): StageItem => ({ src: `${IMG}${file}`, caption: cap(key), ...extra });
  const stripProps = { prevLabel: t.ui.previous, nextLabel: t.ui.next, onZoom: onImageClick };

  const processStrip: StageItem[] = [
    visual('presentation process_discovery @2x.webp', 'seasons'),
    visual('schema - equipe 01.webp', 'teamBefore'),
    visual('schema - equipe 02.webp', 'teamAfter'),
    visual('presentation_process_discovery_05.webp', 'lifecycle'),
  ];
  const researchStrip: StageItem[] = [
    visual('UXR - interface tableau de bord candidat.webp', 'uxrDashboard'),
    visual('UXR - test - tableau prio.webp', 'uxrPrio'),
    visual('UXR - Rapport de campangne de test tableau de bord.webp', 'uxrReport'),
  ];
  const workshopStrip: StageItem[] = [
    visual('photo atelier aap.webp', 'workshop1'),
    visual('photo atelier aap 02.webp', 'workshop2'),
    visual('animation atelier 00.webp', 'workshopData'),
    visual('animation atelier 01.webp', 'workshopHats'),
  ];
  const mvpStrip: StageItem[] = [
    visual('prototype vae collective .webp', 'mvpPrototype'),
    visual('VAE Collective/vae collective wireframes/interface commanditaires cible@2x.webp', 'mvpInterface'),
    visual('slide presentation process vae collective.webp', 'mvpProcess'),
    visual('slide presentation benefices vae collective.webp', 'mvpBenefits'),
  ];
  const aiStrip: StageItem[] = [
    visual('proto IA - chatbot de positionnement.webp', 'aiChatbot'),
    visual('proto IA - orientation professionnelle assistee par IA.webp', 'aiRadar'),
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC]">

      <div id="top">
        {/* Hero: same structure for every case study. The intro is the executive summary. */}
        <CaseStudyHero
          lang={lang}
          projectId="france-vae"
          title={t.hero.title}
          intro={t.hero.intro}
          meta={[
            { label: t.labels.role, value: t.hero.role },
            { label: t.labels.period, value: t.hero.period },
            { label: t.labels.setting, value: t.hero.setting },
            { label: t.labels.scope, value: t.hero.scope },
          ]}
          onZoom={() => onImageClick(HERO_SRC)}
          visualAlt={t.hero.visualAlt}
          externalHref="https://vae.gouv.fr"
          externalLabel={t.hero.visit}
        />
      </div>

      {/* Client testimonial, right under the hero, in the act column */}
      <div className="act-wide pb-12 md:pb-16">
        <div className="max-w-[62ch]">
          <CaseStudyTestimonialBlock
            quote={t.testimonial.quote}
            author={t.testimonial.author}
            role={t.testimonial.role}
            image="boris-aime-bauderlique.webp"
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

      {/* 02 Approach: how the team works, what it knows about users, who it works with */}
      <section id="approach">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="02" title={t.approach.title} />
          <p className="max-w-[62ch] text-base text-gray-600">{t.approach.lead}</p>

          <div className="mt-10 md:mt-12">
            <Block id="process" title={t.approach.process.title} text={t.approach.process.text}>
              <StageCarousel items={processStrip} ariaLabel={t.ui.carouselProcess} {...stripProps} />
            </Block>

            <Block
              id="research"
              title={t.approach.research.title}
              text={t.approach.research.text}
              links={[{ href: UXR_REPORT_URL, label: t.approach.research.link }]}
            >
              <StageCarousel items={researchStrip} ariaLabel={t.ui.carouselResearch} {...stripProps} />
            </Block>

            <Block id="workshops" title={t.approach.workshops.title} text={t.approach.workshops.text}>
              <StageCarousel items={workshopStrip} ariaLabel={t.ui.carouselWorkshops} {...stripProps} />
            </Block>
          </div>
        </div>
      </section>

      {/* 03 Deliverables: the employer MVP, the AI prototypes, the homepage and the ministry video */}
      <section id="deliverables">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="03" title={t.deliverables.title} />

          <div id="ui-delivery" className="mt-4 md:mt-6">
            <Block
              id="initiative-1"
              title={t.deliverables.mvp.title}
              text={t.deliverables.mvp.text}
              links={[{ href: VAE_COLLECTIVE_PROTOTYPE_URL, label: t.deliverables.mvp.link }]}
            >
              <StageCarousel items={mvpStrip} ariaLabel={t.ui.carouselMvp} {...stripProps} />
            </Block>

            <Block
              id="initiative-5"
              title={t.deliverables.ai.title}
              text={t.deliverables.ai.text}
              links={[
                { href: AI_CHATBOT_DEMO_URL, label: t.deliverables.ai.chatbot, play: true },
                { href: AI_RADAR_DEMO_URL, label: t.deliverables.ai.radar, play: true },
              ]}
            >
              <StageCarousel items={aiStrip} ariaLabel={t.ui.carouselAi} {...stripProps} />
            </Block>

            <Block id="homepage" title={t.deliverables.ui.title} text={t.deliverables.ui.text}>
              {/* Homepage before and after: both pictures carry the stage grey, so the slider sits on it */}
              <figure className="m-0">
                <div className="bg-[#E8E8E8] rounded-xl overflow-hidden ring-1 ring-black/[0.04] p-[4%] md:p-[5%]">
                  <div className="mx-auto" style={{ maxWidth: 760 }}>
                    <BeforeAfterSlider
                      beforeSrc={BEFORE_SRC}
                      afterSrc={AFTER_SRC}
                      beforeLabel={t.ui.before}
                      afterLabel={t.ui.after}
                      beforeAlt={t.ui.beforeAlt}
                      afterAlt={t.ui.afterAlt}
                      sliderLabel={t.ui.sliderLabel}
                      zoomLabel={t.ui.zoomLabel}
                      onZoom={onImageClick}
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{t.captions.homepage}</figcaption>
              </figure>

              {/* Presentation video for the Minister's cabinet */}
              <StageFigure
                item={{ src: MINISTER_VIDEO_SRC, type: 'video', size: [1920, 1080], caption: t.captions.ministerVideo }}
                onZoom={onImageClick}
              />
            </Block>

            {/* Gallery access */}
            <div className="mt-10">
              <Link href={`/${lang}/project/france-vae/gallery`} className={quietLinkClass}>
                {t.ui.viewAll}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Results and learnings */}
      <section id="results">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="04" title={t.results.title} />
          <p className="max-w-[62ch] text-base text-gray-600">{t.results.text}</p>
          <div className="mt-8 divide-y divide-gray-100 border-t border-gray-100">
            {t.results.learnings.map((item) => (
              <div key={item.title} className="py-6">
                <h3 className="text-title-3 mb-2 text-gray-900 max-w-[56ch]">{item.title}</h3>
                <p className="text-base text-gray-600 max-w-[62ch]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FranceVaeFull;
