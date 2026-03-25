// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Dedicated case study for the classroom management application
// Embeds interactive prototypes from the UI Motion project

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Briefcase,
  Stack as Layers,
  Buildings as Building2,
  ArrowRight,
  Monitor,
  Users,
} from '@phosphor-icons/react';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
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

// TOC Sections
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'hero', label: 'Intro' },
    { id: 'context', label: 'Context' },
    { id: 'approach', label: 'Approach' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'students', label: 'Students' },
    { id: 'impact', label: 'Impact' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'hero', label: 'Intro' },
    { id: 'context', label: 'Contexte' },
    { id: 'approach', label: 'Approche' },
    { id: 'teacher', label: 'Enseignant' },
    { id: 'students', label: '\u00c9l\u00e8ves' },
    { id: 'impact', label: 'Impact' },
  ],
};

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
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(true);
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

  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const sections = TOC_SECTIONS[lang] || TOC_SECTIONS.fr;


  // Scroll to top on mount + lock scroll for 1.5s to prevent iframe focus stealing
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Force scroll to top and lock overflow
    el.scrollTop = 0;
    el.style.overflow = 'hidden';

    const unlock = setTimeout(() => {
      el.style.overflow = '';
      el.scrollTop = 0; // reset one last time before unlocking
      setScrollLocked(false);
    }, 1500);

    return () => {
      clearTimeout(unlock);
      el.style.overflow = '';
    };
  }, []);

  // Scroll tracking for active section (only after scroll lock released)
  useEffect(() => {
    if (scrollLocked) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setShowNav(true);

      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i];
        if (el && el.offsetTop - 200 <= scrollTop) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('top');
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections, scrollLocked]);

  // Sync caseStudyMode with viewMode prop and scroll to top on switch
  useEffect(() => {
    if (viewMode === 'executive') setCaseStudyMode('executive');
    else if (viewMode === 'caseStudy') setCaseStudyMode('full');
    // Reset scroll immediately and after AnimatePresence exit/enter completes
    const resetScroll = () => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
    };
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 200);
    const t3 = setTimeout(resetScroll, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [viewMode]);

  const scrollToSection = useCallback((sectionId: string) => {
    const container = containerRef.current;
    if (!container) return;
    if (sectionId === 'top') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const headerHeight = 64;
      const elTop = el.getBoundingClientRect().top + container.scrollTop - container.getBoundingClientRect().top;
      container.scrollTo({ top: elTop - headerHeight - 16, behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
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


      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showNav && viewMode !== 'gallery' && caseStudyMode === 'full'}
        lang={lang}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80'
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              SQOOL Classe
            </h1>
          </div>

          {/* Center toggle */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                isDark ? 'bg-white/10' : 'bg-gray-100'
              }`}
            >
              {/* Summary button */}
              <button
                onClick={() => { onViewModeChange('executive'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {(viewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive')) && (
                  <motion.div
                    layoutId="sqoolclasse-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  (viewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive'))
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Resume' : 'Summary'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Res.' : 'Sum.'}</span>
                </span>
              </button>
              {/* Full case button */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'full' && (
                  <motion.div
                    layoutId="sqoolclasse-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Cas complet' : 'Full case'}</span>
                  <span className="sm:hidden">Full</span>
                </span>
              </button>
              {/* Gallery button */}
              <button
                onClick={() => onViewModeChange('gallery')}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'gallery' && (
                  <motion.div
                    layoutId="sqoolclasse-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery'
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{t.gallery}</span>
                  <span className="sm:hidden">Proto.</span>
                </span>
              </button>
            </div>
          </div>

          {/* Close button */}
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className={`relative p-3 flex items-center justify-center rounded-full transition-colors before:absolute before:inset-[-12px] before:content-[''] ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

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
            <div className="w-full px-4 md:px-6 lg:px-8 pt-4 md:pt-6 pb-8">
              <PrototypeFinderGallery isDark={isDark} lang={lang} initialCategory={galleryInitialCategory} />
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
              onViewPrototypes={() => { setGalleryInitialCategory(undefined); onViewModeChange('gallery'); }}
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
            <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
              <div>
                <main className="w-full">

                  {/* ==================== HERO ==================== */}
                  <section id="hero" className="mb-24 md:mb-32">
                    {/* Logo */}
                    <img
                      loading="lazy"
                      src="/images/sqool/logo-sqool.svg"
                      alt="SQOOL"
                      className="h-8 w-auto mb-8"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-start">
                      {/* Left: Hero text */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.role}</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.scope}</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.period}</span>
                        </div>

                        <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t.hero.title}
                        </h1>

                        <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t.hero.subtitle}
                        </h2>

                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.hero.description}
                        </p>
                      </div>

                      {/* Right: Charlotte Rifflet testimonial */}
                      <blockquote className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                        </div>
                        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.heroTestimonial.quote}
                        </p>
                        <footer className="flex items-center gap-3">
                          <div>
                            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {t.heroTestimonial.author}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {t.heroTestimonial.role}
                            </p>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </section>

                  {/* Project Meta Card */}
                  <div className={`p-6 rounded-3xl border mb-12 ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                          <Layers size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.type}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                          <Briefcase size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.scope}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.scope}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                          <Calendar size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.period}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.period}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                          <Building2 size={20} className={isDark ? 'text-orange-400' : 'text-orange-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.company}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <figure className="mb-24 md:mb-32">
                    <div
                      onClick={() => openImageLightbox('/images/thumbnail_sqool_classe.webp')}
                      className={`rounded-2xl overflow-hidden cursor-pointer transition-[background-color,color,transform] duration-200 ease-out ease-out hover:scale-[1.015] hover:shadow-xl border ${
                        isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                      } bg-[#E7E7E7]`}
                    >
                      <img
                        loading="lazy"
                        src="/images/thumbnail_sqool_classe.webp"
                        alt="SQOOL Classe - Supervision de classe en temps réel"
                        className="w-full h-auto"
                      />
                    </div>
                  </figure>

                  {/* ==================== CONTEXT ==================== */}
                  <section id="context" className="mb-32 md:mb-40">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.context.title}
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.context.description}
                    </p>

                    {/* Field observation photos */}
                    <div className="mt-16 md:mt-20">
                      <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white/60' : 'text-gray-400'} uppercase tracking-wider`}>
                        {t.context.fieldObsTitle}
                      </h3>
                      <p className={`text-sm mb-8 max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.context.fieldObsDesc}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {caseImages.slice(2, 4).map((img, i) => (
                          <button
                            key={i}
                            onClick={() => openImageLightbox(img.src)}
                            className={`group relative aspect-[3/2] rounded-xl overflow-hidden border cursor-pointer ${
                              isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img src={img.src} alt={img.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Problem question */}
                    <div className={`mt-16 md:mt-20 p-8 md:p-10 rounded-2xl border-l-4 ${
                      isDark ? 'border-l-blue-500 bg-blue-500/10' : 'border-l-blue-600 bg-blue-50'
                    }`}>
                      <p className={`text-xl md:text-2xl font-bold italic leading-snug ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t.context.problemQuestion}
                      </p>
                    </div>
                  </section>

                  {/* ==================== APPROACH ==================== */}
                  <section id="approach" className="mb-32 md:mb-40">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-12 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.approach.title}
                    </h1>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        { title: t.approach.pillar1Title, desc: t.approach.pillar1Desc },
                        { title: t.approach.pillar2Title, desc: t.approach.pillar2Desc },
                        { title: t.approach.pillar3Title, desc: t.approach.pillar3Desc },
                      ].map((p, i) => (
                        <div key={i}>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <hr className={`my-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== TEACHER EXPERIENCE ==================== */}
                  <section id="teacher" className="mb-32 md:mb-40 pt-8">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-8 ${
                      isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Monitor size={12} />
                      {lang === 'fr' ? 'Côté enseignant' : 'Teacher side'}
                    </span>

                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.teacher.title}
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-3xl mb-16 md:mb-20 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.teacher.description}
                    </p>

                    {/* Hero visual: teacher grid screenshot */}
                    <figure className="mb-16 md:mb-20">
                      <button
                        onClick={() => openImageLightbox(caseImages[6].src)}
                        className={`group relative w-full rounded-2xl overflow-hidden border cursor-pointer ${
                          isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={caseImages[6].src} alt={caseImages[6].caption} loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                      </button>
                      <figcaption className={`mt-4 text-sm leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.teacher.gridCaption}
                      </figcaption>
                    </figure>

                    {/* CTA: explore teacher prototypes */}
                    <button
                      onClick={() => { setGalleryInitialCategory('teacher'); onViewModeChange('gallery'); }}
                      className={`mb-16 md:mb-20 w-full text-left rounded-2xl p-8 md:p-10 transition-[transform,box-shadow,gap] duration-200 ease-out group cursor-pointer ${
                        isDark ? 'bg-[#2D5CF3] hover:bg-[#3D6AF5]' : 'bg-[#2D5CF3] hover:bg-[#2450d9]'
                      }`}
                    >
                      <p className="text-lg md:text-xl font-bold mb-2 text-white">
                        {lang === 'fr' ? '25 prototypes enseignant à explorer' : '25 teacher prototypes to explore'}
                      </p>
                      <p className="text-base leading-relaxed mb-6 text-white/70">
                        {lang === 'fr'
                          ? 'Chaque interaction est documentée avec son parti pris de design, sa stratégie UX et son résultat concret. Animations GSAP, navigation par étapes.'
                          : 'Each interaction is documented with its design rationale, UX strategy, and concrete outcome. GSAP animations, step-by-step navigation.'}
                      </p>
                      <span className="inline-flex items-center gap-2 text-white font-semibold text-base transition-[gap,color] duration-200 ease-out group-hover:gap-3">
                        {lang === 'fr' ? 'Ouvrir la galerie' : 'Open gallery'}
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>

                    {/* Screen sharing + Document sending */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-20">
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[8].src)}
                          className={`group relative w-full rounded-xl overflow-hidden border cursor-pointer ${
                            isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={caseImages[8].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                        </button>
                        <figcaption className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.teacher.screenShareCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[10].src)}
                          className={`group relative w-full rounded-xl overflow-hidden border cursor-pointer ${
                            isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={caseImages[10].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                        </button>
                        <figcaption className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.teacher.docSendCaption}
                        </figcaption>
                      </figure>
                    </div>

                    {/* Active screen sharing (full-width) */}
                    <figure>
                      <button
                        onClick={() => openImageLightbox(caseImages[9].src)}
                        className={`group relative w-full rounded-2xl overflow-hidden border cursor-pointer ${
                          isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={caseImages[9].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                      </button>
                      <figcaption className={`mt-4 text-sm leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.teacher.actionsCaption}
                      </figcaption>
                    </figure>
                  </section>

                  <hr className={`my-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== STUDENT EXPERIENCE ==================== */}
                  <section id="students" className="mb-32 md:mb-40 pt-8">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-8 ${
                      isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-50 text-green-700'
                    }`}>
                      <Users size={12} />
                      {lang === 'fr' ? 'Côté élève' : 'Student side'}
                    </span>

                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.students.title}
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-3xl mb-16 md:mb-20 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.students.description}
                    </p>

                    {/* iPad composition (hero visual) */}
                    <figure className="mb-16 md:mb-20">
                      <button
                        onClick={() => openImageLightbox(caseImages[7].src)}
                        className={`group relative w-full md:w-3/4 mx-auto block rounded-2xl overflow-hidden border cursor-pointer ${
                          isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={caseImages[7].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                      </button>
                      <figcaption className={`mt-4 text-sm leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.students.compositionCaption}
                      </figcaption>
                    </figure>

                    {/* Student screens: classrooms + interactions */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-20">
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[11].src)}
                          className={`group relative w-full rounded-xl overflow-hidden border cursor-pointer ${
                            isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={caseImages[11].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                        </button>
                        <figcaption className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.students.classroomsCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <button
                          onClick={() => openImageLightbox(caseImages[14].src)}
                          className={`group relative w-full rounded-xl overflow-hidden border cursor-pointer ${
                            isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src={caseImages[14].src} alt="" loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                        </button>
                        <figcaption className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.students.interactionsCaption}
                        </figcaption>
                      </figure>
                    </div>

                    {/* CTA: explore student + scenario prototypes */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => { setGalleryInitialCategory('student'); onViewModeChange('gallery'); }}
                        className={`text-left rounded-2xl p-8 transition-[transform,box-shadow,gap] duration-200 ease-out group cursor-pointer ${
                          isDark ? 'bg-[#1D1D1F] hover:bg-[#252528]' : 'bg-[#1D1D1F] hover:bg-[#252528]'
                        }`}
                      >
                        <p className="text-lg font-bold mb-2 text-white">
                          {lang === 'fr' ? '7 prototypes élève' : '7 student prototypes'}
                        </p>
                        <p className="text-sm leading-relaxed mb-5 text-white/50">
                          {lang === 'fr'
                            ? 'Login, ressources, signaux de compréhension, rendu de devoir, écran verrouillé.'
                            : 'Login, resources, comprehension signals, assignment submission, locked screen.'}
                        </p>
                        <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-sm transition-[gap,color] duration-200 ease-out group-hover:gap-3 group-hover:text-white">
                          {lang === 'fr' ? 'Voir les prototypes' : 'View prototypes'}
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                      <button
                        onClick={() => { setGalleryInitialCategory('scenario'); onViewModeChange('gallery'); }}
                        className={`text-left rounded-2xl p-8 transition-[transform,box-shadow,gap] duration-200 ease-out group cursor-pointer ${
                          isDark ? 'bg-[#1D1D1F] hover:bg-[#252528]' : 'bg-[#1D1D1F] hover:bg-[#252528]'
                        }`}
                      >
                        <p className="text-lg font-bold mb-2 text-white">
                          {lang === 'fr' ? '10 scénarios complets' : '10 complete scenarios'}
                        </p>
                        <p className="text-sm leading-relaxed mb-5 text-white/50">
                          {lang === 'fr'
                            ? 'Séances de bout en bout : ouverture, supervision, différenciation, examens, clôture.'
                            : 'End-to-end sessions: opening, supervision, differentiation, exams, closing.'}
                        </p>
                        <span className="inline-flex items-center gap-2 text-white/80 font-semibold text-sm transition-[gap,color] duration-200 ease-out group-hover:gap-3 group-hover:text-white">
                          {lang === 'fr' ? 'Voir les scénarios' : 'View scenarios'}
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                    </div>
                  </section>

                  <hr className={`my-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== IMPACT ==================== */}
                  <section id="impact" className="mb-24 md:mb-32 pt-8">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.impact.title}
                    </h1>
                    <p className={`text-lg leading-relaxed max-w-3xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.impact.intro}
                    </p>

                    {/* Marketing visuals */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-20">
                      {[
                        { img: caseImages[16], caption: t.marketingCaptions?.inviteCode },
                        { img: caseImages[15], caption: t.marketingCaptions?.linkShare },
                      ].map((item, i) => (
                        <figure key={i}>
                          <button
                            onClick={() => openImageLightbox(item.img.src)}
                            className={`group relative w-full rounded-xl overflow-hidden border cursor-pointer ${
                              isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img src={item.img.src} alt={item.img.caption} loading="lazy" className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.01]" />
                          </button>
                          <figcaption className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                      {[
                        { value: t.impact.stat1, label: t.impact.stat1Desc },
                        { value: t.impact.stat2, label: t.impact.stat2Desc },
                        { value: t.impact.stat3, label: t.impact.stat3Desc },
                        { value: t.impact.stat4, label: t.impact.stat4Desc },
                      ].map((stat, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <p className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <blockquote className={`p-8 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <p className={`text-lg italic mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        &laquo;{t.testimonial.quote}&raquo;
                      </p>
                      <footer className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.testimonial.author}, {t.testimonial.role}
                      </footer>
                    </blockquote>
                  </section>
                  {/* ==================== CTA ==================== */}
                  <section className="py-24 md:py-32 px-10">
                    <div className="max-w-[800px] mx-auto text-center">
                      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.cta.title}
                      </h2>
                      <button
                        onClick={onContact}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
                      >
                        {t.cta.button}
                        <ArrowRight size={22} />
                      </button>
                    </div>
                  </section>

                </main>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SqoolClassePage;
