// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Minimalist rewrite: bg-[#FDFDFC], no dark mode, no cards, no shadows, no blue CTA

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import { motion, AnimatePresence } from 'framer-motion';
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import CaseStudySummary from '@/components/case-study/CaseStudySummary'
import { ActRule, ActTitle } from '@/components/case-study/ActSection'
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock'

import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import PrototypeFinderGallery from '../../components/prototype/PrototypeFinderGallery';
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

type LightboxItem = { src: string; caption: string; type: 'image' | 'video' };

// Frame shared by every zoomable image of the page
const MEDIA_BUTTON =
  'group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]';
const MEDIA_IMAGE =
  'w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]';

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

  // All images for lightbox navigation (the .webp twins when they exist)
  const caseImages = useMemo<LightboxItem[]>(
    () => [
      { src: '/images/thumbnail_sqool_classe.webp', caption: c.thumb },
      { src: `${IMG_BASE}/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp`, caption: c.dashboard },
      // Field observation photos
      { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_084158712.webp`, caption: c.obs1 },
      { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_085423494.jpg`, caption: c.obs2 },
      { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_085429484.jpg`, caption: c.obs3 },
      { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_122812837.jpg`, caption: c.obs4 },
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
      { src: `${IMG_BASE}/Visuel - Comm - Pilotage - En Classe - code big@2x.png`, caption: c.inviteCode },
      { src: `${IMG_BASE}/Visuel - Comm - Pilotage - avis@2x.png`, caption: c.feedback },
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
  const quote = (text: string) => (lang === 'fr' ? `«\u202f${text}\u202f»` : `“${text}”`);

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

            {/* 01 Approach: one observation, three principles */}
            <section id="approach">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="01" title={t.acts.approach} />

                {/* Observation: one field photo */}
                <div className="mt-4 md:mt-6">
                <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.context.fieldObsTitle}</h3>
                <p className="text-base text-gray-600 max-w-[62ch]">{t.context.fieldObsDesc}</p>
                <figure className="mt-6 md:mt-8">
                  <button
                    onClick={() => openImageLightbox(caseImages[2].src)}
                    aria-label={caseImages[2].caption}
                    className={`${MEDIA_BUTTON} block`}
                  >
                    <img src={caseImages[2].src} {...imgDims(caseImages[2].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                  </button>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{caseImages[2].caption}</figcaption>
                </figure>
                </div>

                {/* Three principles, in one block */}
                <div className="mt-14 md:mt-16">
                  <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.approach.title}</h3>
                  <ul className="divide-y divide-gray-100 border-t border-gray-100">
                    {t.curated.principles.map((p, i) => (
                      <li key={i} className="py-4">
                        <span className="block text-base font-medium text-gray-900">{p.title}</span>
                        <span className="block mt-1 text-base text-gray-600 max-w-[62ch]">{p.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 02 Product: the teacher grid, the student side, joining a class */}
            <section id="product">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="02" title={t.acts.product} />

                <div id="teacher" className="mt-4 md:mt-6">
                <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.teacher.title}</h3>
                <p className="text-base text-gray-600 max-w-[62ch]">{t.curated.teacher}</p>
                <figure className="mt-6 md:mt-8">
                  <button
                    onClick={() => openImageLightbox(caseImages[6].src)}
                    aria-label={caseImages[6].caption}
                    className={MEDIA_BUTTON}
                  >
                    <img src={caseImages[6].src} {...imgDims(caseImages[6].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                  </button>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{caseImages[6].caption}</figcaption>
                </figure>
                </div>

                <div id="students" className="mt-14 md:mt-16">
                <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.students.title}</h3>
                <p className="text-base text-gray-600 max-w-[62ch]">{t.curated.students}</p>
                <figure className="mt-6 md:mt-8">
                  <button
                    onClick={() => openImageLightbox(caseImages[11].src)}
                    aria-label={caseImages[11].caption}
                    className={MEDIA_BUTTON}
                  >
                    <img src={caseImages[11].src} {...imgDims(caseImages[11].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                  </button>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{caseImages[11].caption}</figcaption>
                </figure>
                </div>

                <div id="join" className="mt-14 md:mt-16">
                <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{t.curated.joinTitle}</h3>
                <p className="text-base text-gray-600 max-w-[62ch]">{t.curated.join}</p>
                <figure className="mt-6 md:mt-8">
                  <button
                    onClick={() => openImageLightbox(caseImages[16].src)}
                    aria-label={caseImages[16].caption}
                    className={MEDIA_BUTTON}
                  >
                    <img src={caseImages[16].src} {...imgDims(caseImages[16].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                  </button>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">{caseImages[16].caption}</figcaption>
                </figure>
                </div>
              </div>
            </section>

            {/* 03 Results: what the work produced, in the words of a pilot teacher */}
            <section id="results">
              <ActRule />
              <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActTitle index="03" title={t.impact.title} />
                <p className="text-base text-gray-600 max-w-[62ch]">{t.impact.intro}</p>
                <blockquote className="mt-10 max-w-[62ch]">
                  <p className="text-base text-gray-900">{quote(t.testimonial.quote)}</p>
                  <footer className="mt-3 text-xs text-gray-500">
                    {t.testimonial.author}, {t.testimonial.role}
                  </footer>
                </blockquote>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolClassePage;
