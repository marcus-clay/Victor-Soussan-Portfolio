// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Order: hero, testimonial, summary, then four numbered acts:
// stakes and principles, design approach (four decisions), deliverables, outcome and open points.

import React, { useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock'

import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import { MediaCarousel, MediaStage, type SuiteMediaItem } from '../../components/case-studies/SuiteMedia';

import PrototypeFinderGallery from '../../components/prototype/PrototypeFinderGallery';
import DeviceCarousel, { type CarouselScreen } from '@/components/case-study/DeviceCarousel'
import PrototypeScreen from '@/components/case-study/PrototypeScreen'
import { PROTOTYPE_MAP } from '../../data/sqoolPrototypesData';
import { SQOOL_CLASSE_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolClasseTranslations';
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

interface SqoolClassePageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

const TRANSLATIONS = SQOOL_CLASSE_TRANSLATIONS;

const IMG_BASE = '/images/sqool/sqool classe';
const OBS = `${IMG_BASE}/prototypes - observation - user testing - classe`;

// The full lessons of the prototype set that the case study plays (see `sqoolPrototypesData`)
const SCENARIO_PROTOTYPES = ['SC1', 'SC2', 'SC4', 'SC7', 'SC10'] as const

type LightboxItem = { src: string; caption: string; type: 'image' | 'video' };

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

const SqoolClassePage: React.FC<SqoolClassePageProps> = ({
  onClose: _onClose,
  systemTheme: _systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange: _onViewModeChange,
  lang = 'fr',
  onContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Single-item list used when a clicked image is not part of the main list
  const [fallbackItem, setFallbackItem] = useState<LightboxItem | null>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const c = t.imageCaptions;

  // Every visual of the case study for the lightbox (the .webp twins). Nothing is dropped:
  // the field photos and screens the story does not show stay reachable here.
  const caseImages = useMemo<LightboxItem[]>(
    () => [
      { src: '/images/thumbnail_sqool_classe.webp', caption: c.thumb },
      { src: `${IMG_BASE}/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp`, caption: c.dashboard },
      // Field observation photos
      { src: `${OBS} PXL_20231010_084158712.webp`, caption: c.obs1 },
      { src: `${OBS} PXL_20231010_085423494.webp`, caption: c.obs2 },
      { src: `${OBS} PXL_20231010_085429484.webp`, caption: c.obs3 },
      { src: `${OBS} PXL_20231010_122812837.webp`, caption: c.obs4 },
      // Teacher UI
      { src: `${IMG_BASE}/UI - enseignant_vue_en_classe_grille_1_5x.webp`, caption: c.grid },
      { src: `${IMG_BASE}/UI - enseignant_vue_groupe_classe_vue_groupe_individuel_1_5x.webp`, caption: c.groupView },
      { src: `${IMG_BASE}/UI - enseignant_partager_son_cran_aux_l_ves_1_5x.webp`, caption: c.shareChoose },
      { src: `${IMG_BASE}/UI - enseignant_partage_d_cran_en_cours_1_5x.webp`, caption: c.shareActive },
      { src: `${IMG_BASE}/UI - enseignant_envoyer_un_document_depuis_drive_1_5x.webp`, caption: c.sendDoc },
      // Student UI
      { src: `${IMG_BASE}/UI - eleve_vue_mes_salles_de_classe_1_5x.webp`, caption: c.studentHome },
      { src: `${IMG_BASE}/UI - eleve_vue_groupe_classe_1_5x.webp`, caption: c.studentClass },
      { src: `${IMG_BASE}/UI - eleve_vue_groupe_individuel_1_5x.webp`, caption: c.studentGroup },
      { src: `${IMG_BASE}/UI - eleve_interactions_vers_le_prof_1_5x.webp`, caption: c.studentInteractions },
      // Marketing visuals
      { src: `${IMG_BASE}/Visuel - Comm - En Classe - Partager un lien - Toute la classe V0@2x.webp`, caption: c.linkShare },
      { src: `${IMG_BASE}/Visuel - Comm - Pilotage - En Classe - code big@2x.webp`, caption: c.inviteCode },
      { src: `${IMG_BASE}/Visuel - Comm - Pilotage - avis@2x.webp`, caption: c.feedback },
    ].map(img => ({ ...img, type: 'image' as const })),
    [c]
  );

  // Never a silent no-op: an unknown src opens as a single-item lightbox
  const openImageLightbox = useCallback((imageSrc: string) => {
    const index = caseImages.findIndex(img => img.src === imageSrc);
    if (index >= 0) {
      setFallbackItem(null);
      setLightboxIndex(index);
    } else {
      setFallbackItem({ src: imageSrc, caption: '', type: 'image' });
      setLightboxIndex(0);
    }
    setLightboxOpen(true);
  }, [caseImages]);

  // Scroll to top on view switch (never on mount, never into the gallery)
  useScrollTopOnChange(viewMode, viewMode !== 'gallery');

  // French guillemets with narrow no-break spaces, curly quotes in English
  const quote = (text: string) => (lang === 'fr' ? `« ${text} »` : `“${text}”`);

  // A visual of the story, by its position in the lightbox list
  const visual = (index: number, extra: Partial<SuiteMediaItem> = {}): SuiteMediaItem => ({
    src: caseImages[index].src,
    caption: caseImages[index].caption,
    type: 'image',
    ...extra,
  });

  const carouselLabels = { prev: t.ui.prev, next: t.ui.next, slide: t.ui.slide };

  // Interactive prototypes of five full lessons, played on demand inside a tablet frame
  const scenarioScreens = useMemo<CarouselScreen[]>(
    () =>
      SCENARIO_PROTOTYPES.map((id) => {
        const proto = PROTOTYPE_MAP.get(id)
        const title = proto ? proto.title[lang] : id
        return {
          src: `prototype:${id}`,
          label: title,
          custom: (focused: boolean) => (
            <PrototypeScreen
              id={id}
              title={title}
              focused={focused}
              labels={{ play: t.ui.protoPlay, pause: t.ui.protoPause, replay: t.ui.protoReplay, expand: t.ui.protoExpand, close: t.ui.protoClose }}
            />
          ),
        }
      }),
    [lang, t]
  )

  const actionSlides = [visual(8), visual(9), visual(10)];
  const studentSlides = [visual(12), visual(13), visual(11), visual(14), visual(16), visual(5)];
  const deliverableSlides = [visual(1), visual(15), visual(17)];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">
      {/* Image Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={fallbackItem ? [fallbackItem] : caseImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="sqool-classe"
      />


      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Prototype Finder Gallery (disabled on purpose, see projectsData) */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="wrap pt-4 md:pt-6 pb-8">
              <PrototypeFinderGallery isDark={false} lang={lang} />
            </div>
          </motion.div>
        ) : (
          /* Full Case Study */
          <div key="caseStudy">
            {/* Hero: same structure for every case study. The intro is the executive summary.
                The gallery of this project is disabled on purpose, so no gallery link. */}
            <CaseStudyHero
              lang={lang}
              projectId="sqool-classe"
              title={t.hero.title}
              intro={t.hero.intro}
              meta={[
                { label: t.metaLabels.role, value: t.hero.role },
                { label: t.metaLabels.scope, value: t.hero.scope },
                { label: t.metaLabels.company, value: t.meta.company },
              ]}
              onZoom={() => openImageLightbox('/images/thumbnail_sqool_classe.webp')}
              visualAlt={c.thumb}
              hideGallery
            />

            {/* Client testimonial, right under the hero, in the act column */}
            <div className="act-wide pb-12 md:pb-16">
              <div className="max-w-[62ch]">
                <CaseStudyTestimonialBlock
                  quote={t.heroTestimonial.quote}
                  author={t.heroTestimonial.author}
                  role={t.heroTestimonial.role}
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
              metrics={t.summary.metrics}
            />

            {/* 01 Stakes and principles */}
            <section id="stakes">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.acts.stakes} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.stakes.text1}</p>
                <p className="mt-5 max-w-[62ch] text-base text-gray-600">{t.stakes.text2}</p>

                <div className="mt-8 md:mt-10">
                  <MediaStage item={visual(2)} onOpen={openImageLightbox} />
                </div>

                <h3 className="text-title-3 text-gray-900 mt-12 mb-3 max-w-[56ch]">{t.stakes.principlesTitle}</h3>
                <ul className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                  {t.stakes.principles.map((p) => (
                    <li key={p.title} className="py-4">
                      <span className="block text-base font-medium text-gray-900">{p.title}</span>
                      <span className="block mt-1 text-base text-gray-600">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 02 Design approach: four decisions */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.acts.approach} />

                <div className="mt-6 md:mt-8">
                  <Block id="card" title={t.approach.card.title} text={t.approach.card.text}>
                    <MediaStage item={visual(6)} onOpen={openImageLightbox} />
                  </Block>

                  <Block id="actions" title={t.approach.actions.title} text={t.approach.actions.text}>
                    <MediaCarousel items={actionSlides} label={t.ui.actionsLabel} labels={carouselLabels} onOpen={openImageLightbox} />
                  </Block>

                  <Block id="students" title={t.approach.student.title} text={t.approach.student.text}>
                    <MediaCarousel items={studentSlides} label={t.ui.studentLabel} labels={carouselLabels} onOpen={openImageLightbox} />
                  </Block>

                  <Block id="scenarios" title={t.approach.scenarios.title} text={t.approach.scenarios.text}>
                    <DeviceCarousel
                      kind="tablet"
                      screens={scenarioScreens}
                      ariaLabel={t.ui.scenariosLabel}
                      prevLabel={t.ui.prev}
                      nextLabel={t.ui.next}
                    />
                  </Block>
                </div>
              </div>
            </section>

            {/* 03 Deliverables: the nine modules */}
            <section id="deliverables">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.acts.deliverables} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.deliverables.text}</p>

                <h3 className="text-title-3 text-gray-900 mt-10 mb-3 max-w-[56ch]">{t.deliverables.modulesTitle}</h3>
                <ul className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                  {t.deliverables.modules.map((m) => (
                    <li key={m} className="py-3 text-base text-gray-600">{m}</li>
                  ))}
                </ul>

                <div className="mt-10 md:mt-12">
                  <MediaCarousel items={deliverableSlides} label={t.ui.deliverablesLabel} labels={carouselLabels} onOpen={openImageLightbox} />
                </div>
              </div>
            </section>

            {/* 04 Outcome: what the work produced, in the words of a pilot teacher, and what stays open */}
            <section id="outcome">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="04" title={t.acts.outcome} />
                <p className="max-w-[62ch] text-base text-gray-600">{t.outcome.text}</p>
                <blockquote className="mt-10 max-w-[62ch]">
                  <p className="text-base text-gray-900">{quote(t.outcome.quote)}</p>
                  <footer className="mt-3 text-xs text-gray-500">
                    {t.outcome.quoteAuthor}, {t.outcome.quoteRole}
                  </footer>
                </blockquote>

                <h3 className="text-title-3 text-gray-900 mt-12 mb-3 max-w-[56ch]">{t.outcome.openTitle}</h3>
                <p className="max-w-[62ch] text-base text-gray-600">{t.outcome.open}</p>

                <div className="mt-10 md:mt-12">
                  <Link href={`/${lang}/project/sqool`} className={QUIET_LINK}>
                    {t.outcome.readSuite}
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

export default SqoolClassePage;
