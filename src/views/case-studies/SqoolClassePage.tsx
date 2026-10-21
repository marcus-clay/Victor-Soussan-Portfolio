// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Minimalist rewrite: bg-[#FDFDFC], no dark mode, no cards, no shadows, no blue CTA

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import PrototypeFinderGallery from '../../components/prototype/PrototypeFinderGallery';
import { SQOOL_CLASSE_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolClasseTranslations';

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
  'group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]';
const MEDIA_IMAGE =
  'w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]';

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

  // Scroll to top on view switch
  useEffect(() => {
    // Single scroll reset when switching views, no delayed repeats
    // (delayed repeats interfere with gallery interactions that happen soon after navigation)
    if (viewMode !== 'gallery') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [viewMode]);

  // French guillemets with narrow no-break spaces, curly quotes in English
  const quote = (text: string) => (lang === 'fr' ? `«\u202f${text}\u202f»` : `“${text}”`);

  const heroMeta = [t.hero.role, t.hero.scope, t.hero.period].join(' · ');

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
            <div className="w-full px-8 pt-4 md:pt-6 pb-8">
              <PrototypeFinderGallery isDark={false} lang={lang} />
            </div>
          </motion.div>
        ) : (
          /* Full Case Study */
          <div key="caseStudy">
            <div className="pt-16 md:pt-24 pb-12 md:pb-16">
              {/* The layout already provides the page's <main> */}
              <div className="w-full">

                {/* ==================== HERO ==================== */}
                <section id="hero" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    {/* Logo */}
                    <img
                      src="/images/sqool/logo-sqool.svg" {...imgDims("/images/sqool/logo-sqool.svg")}
                      alt="SQOOL"
                      className="h-6 w-auto mb-8 opacity-60"
                    />

                    <h1 className="text-title-1 text-gray-900 mb-2">
                      {t.hero.title}
                    </h1>

                    {/* Role line */}
                    <p className="text-sm text-gray-500 mb-6">{heroMeta}</p>

                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-10">
                      {t.hero.description}
                    </p>

                    {/* Project meta row */}
                    <div className="divide-y divide-gray-100">
                      {[
                        { label: t.metaLabels.type, value: t.meta.type },
                        { label: t.metaLabels.scope, value: t.meta.scope },
                        { label: t.metaLabels.period, value: t.meta.period },
                        { label: t.metaLabels.company, value: t.meta.company },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-3">
                          <span className="text-xs text-gray-500">{item.label}</span>
                          <span className="text-sm font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Hero Image */}
                <figure className="mb-24 md:mb-32">
                  <div className="max-w-[960px] mx-auto px-6">
                    <button
                      onClick={() => openImageLightbox(caseImages[0].src)}
                      aria-label={caseImages[0].caption}
                      className={MEDIA_BUTTON}
                    >
                      <img
                        loading="eager"
                        fetchPriority="high"
                        src={caseImages[0].src} {...imgDims(caseImages[0].src)}
                        alt={caseImages[0].caption}
                        className={`${MEDIA_IMAGE} h-auto`}
                      />
                    </button>
                  </div>
                </figure>

                {/* ==================== CONTEXT ==================== */}
                <section id="context" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-title-2 text-gray-900 mb-4">
                      {t.context.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {t.context.description}
                    </p>
                  </div>

                  {/* Field observation photos */}
                  <div className="max-w-[960px] mx-auto px-6 mt-16">
                    <h3 className="text-title-3 text-gray-900 mb-2">
                      {t.context.fieldObsTitle}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-[65ch]">
                      {t.context.fieldObsDesc}
                    </p>
                    <div className="space-y-4">
                      {caseImages.slice(2, 4).map((img, i) => (
                        <button
                          key={i}
                          onClick={() => openImageLightbox(img.src)}
                          aria-label={img.caption}
                          className={`${MEDIA_BUTTON} aspect-[3/2] block`}
                        >
                          <img src={img.src} {...imgDims(img.src)} alt={img.caption} loading="lazy" className={`absolute inset-0 h-full object-cover ${MEDIA_IMAGE}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Problem question */}
                  <div className="max-w-[740px] mx-auto px-6 mt-16">
                    <h3 className="text-title-3 text-gray-900 max-w-[65ch]">
                      {t.context.problemQuestion}
                    </h3>
                  </div>
                </section>

                {/* ==================== ROLE ==================== */}
                <section id="role" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-title-2 text-gray-900 mb-4">
                      {t.myRole.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-10">
                      {t.myRole.roleDesc}
                    </p>

                    {[
                      { title: t.myRole.scopeTitle, items: t.myRole.scopeItems },
                      { title: t.myRole.modulesTitle, items: t.myRole.modules },
                      { title: t.myRole.challengesTitle, items: t.myRole.challenges },
                    ].map((group, g) => (
                      <div key={g} className="mb-10 last:mb-0">
                        <h3 className="text-title-3 text-gray-900 mb-3">{group.title}</h3>
                        <ul className="space-y-2">
                          {group.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span aria-hidden="true" className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0 bg-gray-300" />
                              <span className="text-base text-gray-600 leading-relaxed max-w-[65ch]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ==================== APPROACH ==================== */}
                <section id="approach" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-title-2 text-gray-900 mb-8">
                      {t.approach.title}
                    </h2>
                    <div className="divide-y divide-gray-100">
                      {[
                        { title: t.approach.pillar1Title, desc: t.approach.pillar1Desc },
                        { title: t.approach.pillar2Title, desc: t.approach.pillar2Desc },
                        { title: t.approach.pillar3Title, desc: t.approach.pillar3Desc },
                      ].map((p, i) => (
                        <div key={i} className="py-6 first:pt-0 last:pb-0">
                          <h3 className="text-title-3 text-gray-900 mb-2">{p.title}</h3>
                          <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="max-w-[740px] mx-auto px-6">
                  <hr className="border-gray-100" />
                </div>

                {/* ==================== TEACHER EXPERIENCE ==================== */}
                <section id="teacher" className="mb-24 md:mb-32 pt-12">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-title-2 text-gray-900 mb-4">
                      {t.teacher.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {t.teacher.description}
                    </p>
                  </div>

                  {/* Hero visual: teacher grid screenshot */}
                  <figure className="max-w-[960px] mx-auto px-6 mt-12 mb-12">
                    <button
                      onClick={() => openImageLightbox(caseImages[6].src)}
                      aria-label={caseImages[6].caption}
                      className={MEDIA_BUTTON}
                    >
                      <img src={caseImages[6].src} {...imgDims(caseImages[6].src)} alt={caseImages[6].caption} loading="lazy" className={MEDIA_IMAGE} />
                    </button>
                    <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.teacher.gridCaption}
                    </figcaption>
                  </figure>

                  {/* Screen sharing + Document sending */}
                  <div className="max-w-[960px] mx-auto px-6">
                    <div className="space-y-4 mb-12">
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[8].src)}
                          aria-label={caseImages[8].caption}
                          className={MEDIA_BUTTON}
                        >
                          <img src={caseImages[8].src} {...imgDims(caseImages[8].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                          {t.teacher.screenShareCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[10].src)}
                          aria-label={caseImages[10].caption}
                          className={MEDIA_BUTTON}
                        >
                          <img src={caseImages[10].src} {...imgDims(caseImages[10].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                          {t.teacher.docSendCaption}
                        </figcaption>
                      </figure>
                    </div>

                    {/* Active screen sharing (full-width) */}
                    <figure>
                      <button
                        onClick={() => openImageLightbox(caseImages[9].src)}
                        aria-label={caseImages[9].caption}
                        className={MEDIA_BUTTON}
                      >
                        <img src={caseImages[9].src} {...imgDims(caseImages[9].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                      </button>
                      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed max-w-[65ch]">
                        {t.teacher.actionsCaption}
                      </figcaption>
                    </figure>
                  </div>
                </section>

                <div className="max-w-[740px] mx-auto px-6">
                  <hr className="border-gray-100" />
                </div>

                {/* ==================== STUDENT EXPERIENCE ==================== */}
                <section id="students" className="mb-24 md:mb-32 pt-12">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-title-2 text-gray-900 mb-4">
                      {t.students.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {t.students.description}
                    </p>
                  </div>

                  {/* iPad composition (hero visual) */}
                  <figure className="max-w-[960px] mx-auto px-6 mt-12 mb-12">
                    <button
                      onClick={() => openImageLightbox(caseImages[7].src)}
                      aria-label={caseImages[7].caption}
                      className={`${MEDIA_BUTTON} md:w-3/4 mx-auto block`}
                    >
                      <img src={caseImages[7].src} {...imgDims(caseImages[7].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                    </button>
                    <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed text-center max-w-[65ch] mx-auto">
                      {t.students.compositionCaption}
                    </figcaption>
                  </figure>

                  {/* Student screens: classrooms + interactions */}
                  <div className="max-w-[960px] mx-auto px-6">
                    <div className="space-y-4">
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[11].src)}
                          aria-label={caseImages[11].caption}
                          className={MEDIA_BUTTON}
                        >
                          <img src={caseImages[11].src} {...imgDims(caseImages[11].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                          {t.students.classroomsCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[14].src)}
                          aria-label={caseImages[14].caption}
                          className={MEDIA_BUTTON}
                        >
                          <img src={caseImages[14].src} {...imgDims(caseImages[14].src)} alt="" loading="lazy" className={MEDIA_IMAGE} />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                          {t.students.interactionsCaption}
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </section>

                <div className="max-w-[740px] mx-auto px-6">
                  <hr className="border-gray-100" />
                </div>

                {/* ==================== IMPACT ==================== */}
                <section id="impact" className="mb-24 md:mb-32 pt-12">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-title-2 text-gray-900 mb-4">
                      {t.impact.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-12">
                      {t.impact.intro}
                    </p>
                  </div>

                  {/* Marketing visuals */}
                  <div className="max-w-[960px] mx-auto px-6 mb-16">
                    <div className="space-y-4">
                      {[
                        { img: caseImages[16], caption: t.marketingCaptions?.inviteCode },
                        { img: caseImages[15], caption: t.marketingCaptions?.linkShare },
                      ].map((item, i) => (
                        <figure key={i}>
                          <button
                            onClick={() => openImageLightbox(item.img.src)}
                            aria-label={item.img.caption}
                            className={MEDIA_BUTTON}
                          >
                            <img src={item.img.src} {...imgDims(item.img.src)} alt={item.img.caption} loading="lazy" className={MEDIA_IMAGE} />
                          </button>
                          <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                            {item.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="max-w-[740px] mx-auto px-6 mb-16">
                    <div className="divide-y divide-gray-100">
                      {[
                        { value: t.impact.stat1, label: t.impact.stat1Desc },
                        { value: t.impact.stat2, label: t.impact.stat2Desc },
                        { value: t.impact.stat3, label: t.impact.stat3Desc },
                        { value: t.impact.stat4, label: t.impact.stat4Desc },
                      ].map((stat, i) => (
                        <div key={i} className="flex items-baseline justify-between gap-6 py-4">
                          <span className="text-sm text-gray-500">{stat.label}</span>
                          <span className="text-base font-semibold text-gray-900 tabular-nums">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="max-w-[740px] mx-auto px-6">
                    <blockquote>
                      <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-3">
                        {quote(t.testimonial.quote)}
                      </p>
                      <footer className="text-xs text-gray-500">
                        {t.testimonial.author}, {t.testimonial.role}
                      </footer>
                    </blockquote>
                  </div>

                  {/* Hero testimonial (Charlotte Rifflet) */}
                  <div className="max-w-[740px] mx-auto px-6 mt-12">
                    <blockquote>
                      <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-3">
                        {quote(t.heroTestimonial.quote)}
                      </p>
                      <footer>
                        <p className="text-sm font-medium text-gray-900">{t.heroTestimonial.author}</p>
                        <p className="text-xs text-gray-500">{t.heroTestimonial.role}</p>
                      </footer>
                    </blockquote>
                  </div>
                </section>

                {/* ==================== CTA ==================== */}
                <section className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6 text-center">
                    <h2 className="text-title-2 text-gray-900 mb-6">
                      {t.cta.title}
                    </h2>
                    <button
                      onClick={onContact}
                      className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {t.cta.button}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </section>

              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolClassePage;
