/**
 * PagesJaunesFull - Full narrative case study version
 *
 * Two years of design work at PagesJaunes, told in the same order as the other case studies:
 * hero (the intro is the executive summary), testimonial, summary, then four numbered acts:
 * challenge and goals, design approach (four steps of the redesign), deliverables, results.
 * One block is an h3, one short paragraph and its large visuals. What is not shown here lives
 * in the gallery view; the texts live in `pagesJaunesTranslations.ts`.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';
import { motion } from 'framer-motion';
import { useReveal } from '@/lib/motion'
import { zoomable } from '@/utils/zoomable'
import { imgDims } from '@/utils/imageDimensions'
import CaseStudyTestimonialBlock from './CaseStudyTestimonialBlock';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudySummary from '@/components/case-study/CaseStudySummary';
import { ActRule, ActTitle } from '@/components/case-study/ActSection';
import { PAGESJAUNES_TEXT } from '../../data/caseStudyTranslations/pagesJaunesTranslations';

interface PagesJaunesFullProps {
  lang: 'en' | 'fr';
  onImageClick: (src: string) => void;
}

// ============================================================================
// FILES
// ============================================================================

const PJ = '/images/pagesjaunes';
const FILES = {
  home: `${PJ}/pagesjaunes homepage.webp`,
  homeVariations: `${PJ}/pagesjaunes homepage - variations.webp`,
  homeAndroid: `${PJ}/pj 01@2x.webp`,
  homeIpad: `${PJ}/pagesjaunes hp ipad.webp`,
  artBefore: `${PJ}/pj 02@2x.webp`,
  artAfter: `${PJ}/pj 03@2x.webp`,
  searchFlow: `${PJ}/pj 04@2x.webp`,
  searchPrototype: `${PJ}/2020_NES_moteur_Android_img.mp4`,
  accountLogin: `${PJ}/pj 05@2x.webp`,
  accountEngagement: `${PJ}/pj 06@2x.webp`,
  mapsSystem: `${PJ}/pj 07@2x.webp`,
  mapsMultidevice: `${PJ}/pj 08@2x.webp`,
  mapsIphone: `${PJ}/pagejaunes itineraire iphone.webp`,
  mapsIpad: `${PJ}/pagejaunes itineraire ipad.webp`,
  onboardingIos: '/images/pj-ios-app-onboarding-animation.mp4',
  onboardingAndroid: '/images/pj-and-app-onboarding-animation.mp4',
  microDrawer: `${PJ}/micro-interactions/NES_Anim_Nav_Drawer.gif`,
  microFavorites: `${PJ}/micro-interactions/anim_favoris.mp4`,
  microHistory: `${PJ}/micro-interactions/Anim_remarketing_historique.mp4`,
  review: `${PJ}/24_06_2015_avis_edition.webp`,
  systemCover: `${PJ}/Android wear/screens/cover_yellow strap apps.webp`,
  wearCard: `${PJ}/Android wear/android_wear_insitu_store_01.webp`,
};

// ============================================================================
// LAYOUT BLOCKS (module level so they keep one identity across renders)
// ============================================================================

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const VIDEO_RE = /\.(mp4|webm|mov)$/i;

interface MediaProps {
  src: string;
  /** Accessible name of the zoomable frame, also the one-line caption */
  name: string;
  onZoom: (src: string) => void;
  /** Tailwind max-width class for square or portrait media, left-aligned on the media edge */
  maxWidth?: string;
}

const Media: React.FC<MediaProps> = ({ src, name, onZoom, maxWidth = '' }) => {
  const reveal = useReveal();
  const video = VIDEO_RE.test(src);
  return (
    <motion.figure {...reveal()} className={maxWidth}>
        <div
          {...zoomable(() => onZoom(src))}
          aria-label={name}
          className={`group rounded-2xl overflow-hidden border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 cursor-zoom-in shadow-sm [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-300 ${EASE}`}
        >
          {video ? (
            <VideoPlayer
              src={src}
              className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          ) : (
            <img
              loading="lazy"
              src={src}
              {...imgDims(src)}
              alt=""
              className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          )}
        </div>
        <figcaption className="mt-3 text-xs text-gray-500">{name}</figcaption>
    </motion.figure>
  );
};

/** One block: an h3, one short paragraph in the reading column, then its visuals */
const Block: React.FC<{ id?: string; title: string; text?: string; children?: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="scroll-mt-28 mb-14 md:mb-20 last:mb-0">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    {text && <p className="max-w-[62ch] text-base text-gray-600">{text}</p>}
    {children && <div className={`${text ? 'mt-8 ' : ''}space-y-6 md:space-y-8`}>{children}</div>}
  </div>
);

/** Act opening: hairline, number, title and an optional lead */
const ActOpen: React.FC<{ index: string; title: string; lead?: string }> = ({ index, title, lead }) => (
  <div className={lead ? 'mb-10 md:mb-14' : 'mb-5 md:mb-9'}>
    <ActTitle index={index} title={title} />
    {lead && <p className="max-w-[62ch] text-base text-gray-600">{lead}</p>}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PagesJaunesFull: React.FC<PagesJaunesFullProps> = ({
  lang,
  onImageClick,
}) => {
  const t = PAGESJAUNES_TEXT[lang];
  const fr = lang === 'fr';
  const zoom = onImageClick;
  const F = FILES;
  const a = t.approach;
  const p = t.product;

  return (
    <div className="bg-[#FDFDFC]">

      {/* Hero: the intro is the executive summary */}
      <CaseStudyHero
        lang={lang}
        projectId="pagesjaunes"
        title={t.hero.title}
        intro={t.hero.intro}
        meta={[
          { label: fr ? 'Rôle' : 'Role', value: t.hero.role },
          { label: fr ? 'Périmètre' : 'Scope', value: t.hero.scope },
          { label: fr ? 'Entreprise' : 'Company', value: t.hero.company },
        ]}
        visualAlt={t.hero.visualAlt}
        onZoom={() => onImageClick('/images/thumbnail-pagesjaunes-multidevices.webp')}
      />

      {/* Client testimonial, right under the hero */}
      <div className="act-wide pb-12 md:pb-16">
        <CaseStudyTestimonialBlock
          quote={t.testimonial.quote}
          author={t.testimonial.author}
          role={t.testimonial.role}
          image="simon-white.webp"
          lang={lang}
        />
      </div>

      {/* Summary: context, role, deliverables and sourced numbers */}
      <CaseStudySummary
        lang={lang}
        context={t.summary.context}
        role={t.summary.role}
        deliverables={t.summary.deliverables}
        metrics={t.summary.metrics}
      />

      {/* ================================================================ */}
      {/* 01 CHALLENGE AND GOALS */}
      {/* ================================================================ */}
      <section id="context">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="01" title={t.acts.context} />
          <Block id="challenge" title={t.context.challengeTitle} text={t.context.challenge} />
          <Block id="goals" title={t.context.goalsTitle} text={t.context.goals} />
          <Block id="teams" title={t.context.teamsTitle} text={t.context.teams} />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 02 DESIGN APPROACH: four steps of the redesign */}
      {/* ================================================================ */}
      <section id="approach">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="02" title={t.acts.approach} />

          <Block id="homepage" title={a.homeTitle} text={a.home}>
            <Media src={F.home} name={a.homeMain} onZoom={zoom} />
            <Media src={F.homeVariations} name={a.homeVariations} onZoom={zoom} />
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <Media src={F.homeAndroid} name={a.homeAndroid} onZoom={zoom} />
              <Media src={F.homeIpad} name={a.homeIpad} onZoom={zoom} />
            </div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <Media src={F.artBefore} name={a.artBefore} onZoom={zoom} />
              <Media src={F.artAfter} name={a.artAfter} onZoom={zoom} />
            </div>
          </Block>

          <Block id="search" title={a.searchTitle} text={a.search}>
            {/* The flow board is wide, the prototype is a phone-shaped video: side by side on wide screens */}
            <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-8">
              <Media src={F.searchFlow} name={a.searchFlow} onZoom={zoom} />
              <Media src={F.searchPrototype} name={a.searchPrototype} maxWidth="max-w-[300px]" onZoom={zoom} />
            </div>
          </Block>

          <Block id="maps" title={a.mapsTitle} text={a.maps}>
            <Media src={F.mapsMultidevice} name={a.mapsMultidevice} onZoom={zoom} />
            <Media src={F.mapsIphone} name={a.mapsIphone} onZoom={zoom} />
            <Media src={F.mapsIpad} name={a.mapsIpad} onZoom={zoom} />
            <Media src={F.mapsSystem} name={a.mapsSystem} onZoom={zoom} />
          </Block>

          <Block id="account" title={a.accountTitle} text={a.account}>
            <Media src={F.accountLogin} name={a.accountLogin} onZoom={zoom} />
            <Media src={F.accountEngagement} name={a.accountEngagement} onZoom={zoom} />
          </Block>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 03 DELIVERABLES: what shipped around the four steps */}
      {/* ================================================================ */}
      <section id="product">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="03" title={t.acts.product} />

          <Block id="onboarding" title={p.onboardingTitle} text={p.onboarding}>
            {/* Both clips are near-square: iOS and Android side by side on wide screens */}
            <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
              <Media src={F.onboardingIos} name={p.onboardingIos} onZoom={zoom} />
              <Media src={F.onboardingAndroid} name={p.onboardingAndroid} onZoom={zoom} />
            </div>
          </Block>

          <Block id="micro-interactions" title={p.microTitle} text={p.micro}>
            <div className="grid gap-6 sm:grid-cols-3 md:gap-8">
              <Media src={F.microDrawer} name={p.microDrawer} onZoom={zoom} />
              <Media src={F.microFavorites} name={p.microFavorites} onZoom={zoom} />
              <Media src={F.microHistory} name={p.microHistory} onZoom={zoom} />
            </div>
          </Block>

          <Block id="interface" title={p.uiTitle} text={p.ui}>
            <Media src={F.review} name={p.uiReview} maxWidth="max-w-[640px]" onZoom={zoom} />
          </Block>

          <Block id="design-system" title={p.systemTitle} text={p.system}>
            <Media src={F.systemCover} name={p.systemCover} onZoom={zoom} />
          </Block>

          {/* Link to the dedicated Android Wear case study, one line */}
          <div id="wear" className="scroll-mt-28 mb-8 md:mb-10">
            <Link
              href={`/${lang}/project/androidwear`}
              className={`group flex items-center gap-4 rounded-xl border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 p-4 min-h-11 active:scale-[0.99] transition-[border-color,transform] duration-200 ${EASE}`}
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={F.wearCard}
                  {...imgDims(F.wearCard)}
                  alt=""
                  className={`w-full h-full object-cover transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
                />
              </div>
              <span className="flex-1 min-w-0 text-base font-semibold text-gray-900">{p.wearTitle}</span>
              <span className="text-sm text-gray-500 [@media(hover:hover)]:group-hover:text-gray-900 transition-colors duration-150 whitespace-nowrap">
                {p.wearLink}
              </span>
            </Link>
          </div>

          {/* Gallery access */}
          <div>
            <Link
              href={`/${lang}/project/pagesjaunes/gallery`}
              className={`inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ${EASE}`}
            >
              {t.acts.seeAll}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 04 RESULTS AND LEARNINGS, with the team in one paragraph */}
      {/* ================================================================ */}
      <section id="results">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="04" title={t.acts.results} />

          <div id="impact" className="scroll-mt-28 mb-12 md:mb-16">
            <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.results.title}</h3>
            <dl className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
              {t.results.metrics.map((metric) => (
                <div key={metric.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-base text-gray-600">
                    {metric.label}
                    <span className="text-gray-500">{fr ? ' : ' : ' · '}{metric.sublabel}</span>
                  </dt>
                  <dd className="text-title-2 text-gray-900 tabular-nums">{metric.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-[62ch] text-sm text-gray-500">{t.results.note}</p>
          </div>

          <div id="learnings" className="scroll-mt-28 mb-12 md:mb-16">
            <h3 className="text-title-3 text-gray-900 mb-4 max-w-[56ch]">{t.results.learningsTitle}</h3>
            <ul className="max-w-[62ch] space-y-4">
              {t.results.learnings.map((item) => (
                <li key={item.title} className="text-base text-gray-600">
                  <span className="font-medium text-gray-900">{item.title}.</span> {item.desc}
                </li>
              ))}
            </ul>
          </div>

          <Block id="team" title={t.results.teamTitle} text={t.results.team} />
        </div>
      </section>
    </div>
  );
};

export default PagesJaunesFull;
