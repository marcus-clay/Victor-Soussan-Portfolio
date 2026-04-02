// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Minimalist rewrite: bg-[#FDFDFC], no dark mode, no cards, no shadows, no blue CTA

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import PrototypeFinderGallery from '../../components/prototype/PrototypeFinderGallery';
import SqoolClasseExecutive from '../../components/case-studies/SqoolClasseExecutive';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
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


const SqoolClassePage: React.FC<SqoolClassePageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'fr',
  onContact,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['sqool-classe'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('sqool-classe', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [galleryInitialCategory, setGalleryInitialCategory] = useState<'teacher' | 'student' | 'scenario' | undefined>(undefined);

  // All images for lightbox navigation
  const IMG_BASE = '/images/sqool/sqool classe';
  const caseImages = [
    { src: '/images/thumbnail_sqool_classe.webp', caption: 'SQOOL Classe' },
    { src: `${IMG_BASE}/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp`, caption: lang === 'fr' ? 'Tableau de bord enseignant' : 'Teacher dashboard' },
    // Field observation photos
    { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_084158712.jpg`, caption: lang === 'fr' ? 'Observation terrain : suivi des écrans élèves en temps réel, Collège Jean Vilar' : 'Field observation: live student screen monitoring, Collège Jean Vilar' },
    { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_085423494.jpg`, caption: lang === 'fr' ? 'Test en conditions réelles : gestion des connexions et déconnexions' : 'Real-world testing: handling connection states' },
    { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_085429484.jpg`, caption: lang === 'fr' ? 'L\'enseignant navigue dans la vue élèves pendant le cours' : 'Teacher navigating student view during class' },
    { src: `${IMG_BASE}/prototypes - observation - user testing - classe PXL_20231010_122812837.jpg`, caption: lang === 'fr' ? 'Côté élève : la notification de supervision, transparente et non intrusive' : 'Student side: transparent, non-intrusive supervision notification' },
    // Teacher UI
    { src: `${IMG_BASE}/UI - enseignant_vue_en_classe_grille_1_5x.webp`, caption: lang === 'fr' ? 'Vue grille enseignant : chaque élève visible, chaque action accessible' : 'Teacher grid view: every student visible, every action accessible' },
    { src: `${IMG_BASE}/UI - enseignant_vue_groupe_classe_vue_groupe_individuel_1_5x.webp`, caption: lang === 'fr' ? 'Vue classe et vue groupe sur tablette élève' : 'Class view and group view on student tablet' },
    { src: `${IMG_BASE}/UI - enseignant_partager_son_cran_aux_l_ves_1_5x.webp`, caption: lang === 'fr' ? 'Choisir quoi partager : un écran complet ou une fenêtre spécifique' : 'Choose what to share: full screen or a specific window' },
    { src: `${IMG_BASE}/UI - enseignant_partage_d_cran_en_cours_1_5x.webp`, caption: lang === 'fr' ? 'Partage en cours : l\'enseignant voit son écran et ses élèves simultanément' : 'Screen sharing in progress: teacher sees their screen and students simultaneously' },
    { src: `${IMG_BASE}/UI - enseignant_envoyer_un_document_depuis_drive_1_5x.webp`, caption: lang === 'fr' ? 'Envoyer un document directement depuis Google Drive, en un geste' : 'Send a document directly from Google Drive, in one gesture' },
    // Student UI
    { src: `${IMG_BASE}/UI - eleve_vue_mes_salles_de_classe_1_5x.webp`, caption: lang === 'fr' ? 'L\'accueil élève : toutes les salles de classe, avec l\'essentiel visible d\'un coup d\'oeil' : 'Student home: all classrooms with key info at a glance' },
    { src: `${IMG_BASE}/UI - eleve_vue_groupe_classe_1_5x.webp`, caption: lang === 'fr' ? 'Vue classe : les camarades, les ressources du cours, les messages du professeur' : 'Class view: classmates, course resources, teacher messages' },
    { src: `${IMG_BASE}/UI - eleve_vue_groupe_individuel_1_5x.webp`, caption: lang === 'fr' ? 'Vue groupe : un espace dédié avec ses propres ressources et consignes' : 'Group view: a dedicated space with its own resources and instructions' },
    { src: `${IMG_BASE}/UI - eleve_interactions_vers_le_prof_1_5x.webp`, caption: lang === 'fr' ? 'Six façons de communiquer avec l\'enseignant, sans déranger la classe' : 'Six ways to communicate with the teacher, without disrupting the class' },
    // Marketing visuals
    { src: `${IMG_BASE}/Visuel - Comm - En Classe - Partager un lien - Toute la classe V0@2x.png`, caption: lang === 'fr' ? 'Partage de lien vers toute la classe : chaque navigateur ouvre la même page' : 'Link sharing to the whole class: every browser opens the same page' },
    { src: `${IMG_BASE}/Visuel - Comm - Pilotage - En Classe - code big@2x.png`, caption: lang === 'fr' ? 'Code d\'invitation : les élèves rejoignent la classe en quelques secondes' : 'Invitation code: students join the class in seconds' },
    { src: `${IMG_BASE}/Visuel - Comm - Pilotage - avis@2x.png`, caption: lang === 'fr' ? 'Recueil de feedback intégré pour améliorer le produit en continu' : 'Built-in feedback collection for continuous product improvement' },
  ];

  const openImageLightbox = useCallback((imageSrc: string) => {
    const index = caseImages.findIndex(img => img.src === imageSrc);
    if (index >= 0) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  }, [caseImages]);
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(
    viewMode === 'executive' ? 'executive' : 'full'
  );

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;


  // Sync caseStudyMode with viewMode prop and scroll to top on view switch
  useEffect(() => {
    if (viewMode === 'executive') setCaseStudyMode('executive');
    else if (viewMode === 'caseStudy') setCaseStudyMode('full');
    // Single scroll reset when switching views — no delayed repeats
    // (delayed repeats interfere with gallery interactions that happen soon after navigation)
    if (viewMode !== 'gallery') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [viewMode]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">
      {/* Image Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={caseImages.map(img => ({ src: img.src, caption: img.caption, type: 'image' as const }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="sqool-classe"
      />


      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Prototype Finder Gallery */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-full px-8 pt-4 md:pt-6 pb-8">
              <PrototypeFinderGallery isDark={false} lang={lang} initialCategory={galleryInitialCategory} />
            </div>
          </motion.div>
        ) : caseStudyMode === 'executive' ? (
          /* Executive Summary - dedicated component */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <SqoolClasseExecutive
              systemTheme={systemTheme}
              lang={lang}
              onImageClick={(src) => openImageLightbox(src)}
              onViewFull={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
              onContact={() => onContact?.()}
            />
          </motion.div>
        ) : (
          /* Full Case Study */
          <motion.div
            key="caseStudy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="pt-16 md:pt-24 pb-12 md:pb-16">
              <main className="w-full">

                {/* ==================== HERO ==================== */}
                <section id="hero" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    {/* Logo */}
                    <img
                      loading="lazy"
                      src="/images/sqool/logo-sqool.svg"
                      alt="SQOOL"
                      className="h-6 w-auto mb-8 opacity-60"
                    />

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
                      <span className="text-xs text-gray-400">{t.hero.role}</span>
                      <span className="text-xs text-gray-300">/</span>
                      <span className="text-xs text-gray-400">{t.hero.scope}</span>
                      <span className="text-xs text-gray-300">/</span>
                      <span className="text-xs text-gray-400">{t.hero.period}</span>
                    </div>

                    <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                      {t.hero.title}
                    </h1>

                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-10">
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
                          <span className="text-xs text-gray-400">{item.label}</span>
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
                      onClick={() => openImageLightbox('/images/thumbnail_sqool_classe.webp')}
                      className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <img
                        loading="lazy"
                        src="/images/thumbnail_sqool_classe.webp"
                        alt="SQOOL Classe"
                        className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                      />
                    </button>
                  </div>
                </figure>

                {/* ==================== CONTEXT ==================== */}
                <section id="context" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                      {t.context.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.context.description}
                    </p>
                  </div>

                  {/* Field observation photos */}
                  <div className="max-w-[960px] mx-auto px-6 mt-16">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      {t.context.fieldObsTitle}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-[65ch]">
                      {t.context.fieldObsDesc}
                    </p>
                    <div className="space-y-4">
                      {caseImages.slice(2, 4).map((img, i) => (
                        <button
                          key={i}
                          onClick={() => openImageLightbox(img.src)}
                          className="group relative aspect-[3/2] rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99] w-full block"
                        >
                          <img src={img.src} alt={img.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Problem question */}
                  <div className="max-w-[740px] mx-auto px-6 mt-16">
                    <p className="text-sm font-medium text-gray-900 leading-relaxed max-w-[65ch]">
                      {t.context.problemQuestion}
                    </p>
                  </div>
                </section>

                {/* ==================== APPROACH ==================== */}
                <section id="approach" className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
                      {t.approach.title}
                    </h2>
                    <div className="divide-y divide-gray-100">
                      {[
                        { title: t.approach.pillar1Title, desc: t.approach.pillar1Desc },
                        { title: t.approach.pillar2Title, desc: t.approach.pillar2Desc },
                        { title: t.approach.pillar3Title, desc: t.approach.pillar3Desc },
                      ].map((p, i) => (
                        <div key={i} className="py-6 first:pt-0 last:pb-0">
                          <p className="text-sm font-medium text-gray-900 mb-1">{p.title}</p>
                          <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">{p.desc}</p>
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
                    <p className="text-xs text-gray-400 mb-4">
                      {lang === 'fr' ? 'Côté enseignant' : 'Teacher side'}
                    </p>

                    <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                      {t.teacher.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.teacher.description}
                    </p>
                  </div>

                  {/* Hero visual: teacher grid screenshot */}
                  <figure className="max-w-[960px] mx-auto px-6 mt-12 mb-12">
                    <button
                      onClick={() => openImageLightbox(caseImages[6].src)}
                      className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <img src={caseImages[6].src} alt={caseImages[6].caption} loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                    </button>
                    <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed max-w-[65ch]">
                      {t.teacher.gridCaption}
                    </figcaption>
                  </figure>

                  {/* CTA: explore teacher prototypes */}
                  <div className="max-w-[740px] mx-auto px-6 mb-12">
                    <button
                      onClick={() => { setGalleryInitialCategory('teacher'); onViewModeChange('gallery'); }}
                      className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {lang === 'fr' ? '25 prototypes enseignant a explorer' : '25 teacher prototypes to explore'}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  {/* Screen sharing + Document sending */}
                  <div className="max-w-[960px] mx-auto px-6">
                    <div className="space-y-4 mb-12">
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[8].src)}
                          className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <img src={caseImages[8].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                          {t.teacher.screenShareCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[10].src)}
                          className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <img src={caseImages[10].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                          {t.teacher.docSendCaption}
                        </figcaption>
                      </figure>
                    </div>

                    {/* Active screen sharing (full-width) */}
                    <figure>
                      <button
                        onClick={() => openImageLightbox(caseImages[9].src)}
                        className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <img src={caseImages[9].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                      </button>
                      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed max-w-[65ch]">
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
                    <p className="text-xs text-gray-400 mb-4">
                      {lang === 'fr' ? 'Côté élève' : 'Student side'}
                    </p>

                    <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                      {t.students.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {t.students.description}
                    </p>
                  </div>

                  {/* iPad composition (hero visual) */}
                  <figure className="max-w-[960px] mx-auto px-6 mt-12 mb-12">
                    <button
                      onClick={() => openImageLightbox(caseImages[7].src)}
                      className="group relative w-full md:w-3/4 mx-auto block rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <img src={caseImages[7].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                    </button>
                    <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed text-center max-w-[65ch] mx-auto">
                      {t.students.compositionCaption}
                    </figcaption>
                  </figure>

                  {/* Student screens: classrooms + interactions */}
                  <div className="max-w-[960px] mx-auto px-6 mb-12">
                    <div className="space-y-4">
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[11].src)}
                          className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <img src={caseImages[11].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                          {t.students.classroomsCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[14].src)}
                          className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <img src={caseImages[14].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                        </button>
                        <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                          {t.students.interactionsCaption}
                        </figcaption>
                      </figure>
                    </div>
                  </div>

                  {/* CTA: explore student + scenario prototypes */}
                  <div className="max-w-[740px] mx-auto px-6 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => { setGalleryInitialCategory('student'); onViewModeChange('gallery'); }}
                      className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {lang === 'fr' ? '7 prototypes élève' : '7 student prototypes'}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                    <button
                      onClick={() => { setGalleryInitialCategory('scenario'); onViewModeChange('gallery'); }}
                      className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {lang === 'fr' ? '10 scénarios complets' : '10 complete scenarios'}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </section>

                <div className="max-w-[740px] mx-auto px-6">
                  <hr className="border-gray-100" />
                </div>

                {/* ==================== IMPACT ==================== */}
                <section id="impact" className="mb-24 md:mb-32 pt-12">
                  <div className="max-w-[740px] mx-auto px-6">
                    <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                      {t.impact.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-12">
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
                            className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                          >
                            <img src={item.img.src} alt={item.img.caption} loading="lazy" className="w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
                          </button>
                          <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
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
                        <div key={i} className="flex items-baseline justify-between py-4">
                          <span className="text-sm text-gray-500">{stat.label}</span>
                          <span className="text-base font-semibold text-gray-900 tabular-nums">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="max-w-[740px] mx-auto px-6">
                    <blockquote>
                      <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-3">
                        &laquo;{t.testimonial.quote}&raquo;
                      </p>
                      <footer className="text-xs text-gray-400">
                        {t.testimonial.author}, {t.testimonial.role}
                      </footer>
                    </blockquote>
                  </div>

                  {/* Hero testimonial (Charlotte Rifflet) */}
                  <div className="max-w-[740px] mx-auto px-6 mt-12">
                    <blockquote>
                      <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-3">
                        &laquo;{t.heroTestimonial.quote}&raquo;
                      </p>
                      <footer>
                        <p className="text-sm font-medium text-gray-900">{t.heroTestimonial.author}</p>
                        <p className="text-xs text-gray-400">{t.heroTestimonial.role}</p>
                      </footer>
                    </blockquote>
                  </div>
                </section>

                {/* ==================== CTA ==================== */}
                <section className="mb-24 md:mb-32">
                  <div className="max-w-[740px] mx-auto px-6 text-center">
                    <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-6">
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

              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolClassePage;
