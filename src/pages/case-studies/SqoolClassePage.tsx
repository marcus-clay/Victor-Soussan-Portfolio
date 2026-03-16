// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Dedicated case study for the classroom management application
// Embeds interactive prototypes from the UI Motion project

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowSquareOut as ExternalLink,
  Calendar,
  Briefcase,
  Stack as Layers,
  Buildings as Building2,
  ArrowRight,
  Monitor,
  Lock,
  Users,
  ChatCircle as MessageCircle,
  Timer,
  FileText,
  Eye,
  Play,
  ArrowsOut as Maximize2,
} from '@phosphor-icons/react';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
import PrototypeCard from '../../components/prototype/PrototypeCard';
import PrototypeCarousel from '../../components/prototype/PrototypeCarousel';
import PrototypeLightbox from '../../components/prototype/PrototypeLightbox';
import GallerySidebar from '../../components/GallerySidebar';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags } from '../../utils/seo';
import { SQOOL_CLASSE_TRANSLATIONS } from '../../data/caseStudyTranslations/sqoolClasseTranslations';
import {
  PROTOTYPE_MAP,
  GALLERY_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  EXECUTIVE_PROTOTYPES,
  getPrototypesForSection,
  PrototypeCategory,
  PrototypeItem,
} from '../../data/sqoolPrototypesData';

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
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'grid', label: 'Grid' },
    { id: 'orchestration', label: 'Orchestration' },
    { id: 'communication', label: 'Communication' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'students', label: 'Students' },
    { id: 'journeys', label: 'Journeys' },
    { id: 'impact', label: 'Impact' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Vue d\u2019ensemble' },
    { id: 'challenge', label: 'Enjeu' },
    { id: 'grid', label: 'Grille' },
    { id: 'orchestration', label: 'Orchestration' },
    { id: 'communication', label: 'Communication' },
    { id: 'sessions', label: 'S\u00e9ances' },
    { id: 'students', label: '\u00c9l\u00e8ves' },
    { id: 'journeys', label: 'Parcours' },
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
    updateMetaTags(PROJECT_SEO['sqool-classe']);
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prototype lightbox state
  const [prototypeLightboxOpen, setPrototypeLightboxOpen] = useState(false);
  const [protoLightboxGroup, setProtoLightboxGroup] = useState<{id: string; title: string; desc: string}[]>([]);
  const [protoLightboxIndex, setProtoLightboxIndex] = useState(0);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<PrototypeCategory | null>(null);
  const [activeGalleryPrototype, setActiveGalleryPrototype] = useState<string | null>(null);

  // All images for lightbox navigation
  const caseImages = [
    { src: '/images/thumbnail_sqool_classe.webp', caption: 'SQOOL Classe' },
    { src: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp', caption: lang === 'fr' ? 'Tableau de bord enseignant' : 'Teacher dashboard' },
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

  const openPrototypeLightbox = useCallback((prototypes: PrototypeItem[], index: number) => {
    setProtoLightboxGroup(prototypes.map(p => ({
      id: p.id,
      title: p.title[lang],
      desc: p.desc[lang],
    })));
    setProtoLightboxIndex(index);
    setPrototypeLightboxOpen(true);
  }, [lang]);

  // Scroll to top on mount
  useEffect(() => {
    const el = containerRef.current;
    const resetScroll = () => {
      if (el) el.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 150);
    const t3 = setTimeout(resetScroll, 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Scroll tracking for active section
  useEffect(() => {
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
  }, [sections]);

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

      {/* Prototype Lightbox */}
      <PrototypeLightbox
        isOpen={prototypeLightboxOpen}
        onClose={() => setPrototypeLightboxOpen(false)}
        prototypes={protoLightboxGroup}
        currentIndex={protoLightboxIndex}
        onIndexChange={setProtoLightboxIndex}
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
          /* Prototype Showcase View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-16">
              <div className="flex gap-8">
                {/* Sidebar */}
                <GallerySidebar
                  activeCategory={activeGalleryCategory}
                  activePrototypeId={activeGalleryPrototype}
                  onPrototypeClick={(pid) => {
                    setActiveGalleryPrototype(pid);
                    const el = document.getElementById(`proto-${pid}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  onCategoryClick={(cat) => {
                    setActiveGalleryCategory(cat);
                    const el = document.getElementById(`gallery-cat-${cat}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  isDark={isDark}
                  lang={lang}
                />

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <section className="mb-12">
                    <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lang === 'fr' ? 'Tous les prototypes' : 'All Prototypes'}
                    </h1>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang === 'fr'
                        ? 'Parcourez chaque interaction, sc\u00e9nario et flux utilisateur con\u00e7us pour SQOOL Classe'
                        : 'Explore every interaction, scenario, and user flow designed for SQOOL Classe'}
                    </p>
                  </section>

                  {GALLERY_CATEGORIES.map(cat => {
                    const colors = CATEGORY_COLORS[cat.id];
                    const categoryPrototypes = cat.prototypeIds
                      .map(pid => PROTOTYPE_MAP.get(pid))
                      .filter((p): p is PrototypeItem => !!p);
                    return (
                      <section key={cat.id} id={`gallery-cat-${cat.id}`} className="mb-16">
                        <div className="flex items-center gap-2 mb-6">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {CATEGORY_LABELS[cat.id][lang]}
                          </h2>
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {cat.prototypeIds.length}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {categoryPrototypes.map((proto, i) => (
                            <div key={proto.id} id={`proto-${proto.id}`}>
                              <PrototypeCard
                                prototypeId={proto.id}
                                title={proto.title[lang]}
                                description={proto.desc[lang]}
                                category={proto.category}
                                isDark={isDark}
                                onClick={() => {
                                  setActiveGalleryPrototype(proto.id);
                                  openPrototypeLightbox(categoryPrototypes, i);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : caseStudyMode === 'executive' ? (
          /* Executive Summary */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
              <main className="w-full">
                {/* Executive Hero */}
                <section className="mb-16">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.role}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.period}</span>
                  </div>
                  <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.hero.title}
                  </h1>
                  <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.hero.description}
                  </p>
                </section>

                {/* Hero Image */}
                <figure className="mb-16">
                  <div
                    onClick={() => openImageLightbox('/images/thumbnail_sqool_classe.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ease-out hover:scale-[1.015] hover:shadow-xl ${
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

                {/* 3 Design Pillars */}
                <section className="mb-16">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: <Eye size={24} />, title: t.challenge.pillar1Title, desc: t.challenge.pillar1Desc, color: 'blue' },
                      { icon: <Monitor size={24} />, title: t.challenge.pillar2Title, desc: t.challenge.pillar2Desc, color: 'purple' },
                      { icon: <Users size={24} />, title: t.challenge.pillar3Title, desc: t.challenge.pillar3Desc, color: 'green' },
                    ].map((pillar, i) => (
                      <div
                        key={i}
                        className={`p-6 rounded-2xl border ${
                          isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded-xl w-fit mb-4 ${
                          isDark ? `bg-${pillar.color}-600/20` : `bg-${pillar.color}-50`
                        }`}>
                          <div className={isDark ? `text-${pillar.color}-400` : `text-${pillar.color}-600`}>
                            {pillar.icon}
                          </div>
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {pillar.title}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key prototypes carousel */}
                <section className="mb-16">
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'fr' ? 'Prototypes clés' : 'Key prototypes'}
                  </h3>
                  <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'fr'
                      ? 'Ces prototypes illustrent les interactions fondamentales du produit : ouvrir une classe, superviser une séance complète, et gérer les imprévus en temps réel.'
                      : 'These prototypes illustrate the core interactions of the product: opening a class, supervising a full session, and handling real-time events.'}
                  </p>
                  {(() => {
                    const execProtos = EXECUTIVE_PROTOTYPES
                      .map(id => PROTOTYPE_MAP.get(id))
                      .filter((p): p is PrototypeItem => !!p);
                    return (
                      <PrototypeCarousel
                        prototypes={execProtos}
                        isDark={isDark}
                        lang={lang}
                        onCardClick={(i) => openPrototypeLightbox(execProtos, i)}
                      />
                    );
                  })()}
                </section>

                {/* Impact Stats */}
                <section className="mb-16">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                </section>

                {/* Testimonial */}
                <section className="mb-16">
                  <blockquote className={`p-8 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <p className={`text-lg italic mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      "{t.testimonial.quote}"
                    </p>
                    <footer className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      — {t.testimonial.author}, {t.testimonial.role}
                    </footer>
                  </blockquote>
                </section>

                {/* CTA to full case */}
                <section className="text-center py-12">
                  <button
                    onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
                  >
                    {lang === 'fr' ? 'Voir le cas complet' : 'View full case study'}
                    <ArrowRight size={20} />
                  </button>
                </section>
              </main>
            </div>
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
                      className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-[1.015] hover:shadow-xl border ${
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

                  {/* ==================== OVERVIEW ==================== */}
                  <section id="overview" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-12 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.overview.title}
                    </h1>

                    <div className="grid md:grid-cols-2 gap-10 mb-12">
                      {/* Introduction */}
                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t.overview.introTitle}
                        </h3>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.overview.introDesc}
                        </p>
                      </div>

                      {/* My Role */}
                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t.overview.roleTitle}
                        </h3>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.overview.roleDesc}
                        </p>
                      </div>
                    </div>

                    {/* Strategic Objectives */}
                    <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.overview.objectivesTitle}
                      </h3>
                      <ul className="space-y-3">
                        {[t.overview.objective1, t.overview.objective2, t.overview.objective3, t.overview.objective4].map((obj, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                            <span className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* ==================== CONTEXT ==================== */}
                  <section id="context" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.context.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.context.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.context.description}
                    </p>

                    {/* Frustration cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { icon: <Monitor size={24} />, title: t.context.frustration1Title, desc: t.context.frustration1Desc },
                        { icon: <Eye size={24} />, title: t.context.frustration2Title, desc: t.context.frustration2Desc },
                        { icon: <Users size={24} />, title: t.context.frustration3Title, desc: t.context.frustration3Desc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-red-600/20' : 'bg-red-50'}`}>
                            <div className={isDark ? 'text-red-400' : 'text-red-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Problem-framing question */}
                    <div className={`mt-16 p-8 rounded-2xl border-l-4 ${
                      isDark ? 'border-l-blue-500 bg-blue-500/10' : 'border-l-blue-600 bg-blue-50'
                    }`}>
                      <p className={`text-xl md:text-2xl font-bold italic leading-snug ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t.context.problemQuestion}
                      </p>
                    </div>
                  </section>

                  {/* ==================== CHALLENGE ==================== */}
                  <section id="challenge" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.challenge.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.challenge.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.challenge.description}
                    </p>

                    {/* 3 Design Pillars */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                          <Eye size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.challenge.pillar1Title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.challenge.pillar1Desc}</p>
                      </div>
                      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                          <Monitor size={24} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.challenge.pillar2Title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.challenge.pillar2Desc}</p>
                      </div>
                      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                          <Users size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.challenge.pillar3Title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.challenge.pillar3Desc}</p>
                      </div>
                    </div>
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== THE GRID ==================== */}
                  <section id="grid" className="mb-24 md:mb-32">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                      isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Monitor size={12} />
                      {lang === 'fr' ? 'Côté enseignant' : 'Teacher side'}
                    </span>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.grid.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.grid.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.grid.description}
                    </p>

                    {/* Grid prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('grid');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Grid features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <Eye size={24} />, title: t.grid.statesTitle, desc: t.grid.statesDesc },
                        { icon: <Lock size={24} />, title: t.grid.lockTitle, desc: t.grid.lockDesc },
                        { icon: <Maximize2 size={24} />, title: t.grid.viewerTitle, desc: t.grid.viewerDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                            <div className={isDark ? 'text-blue-400' : 'text-blue-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Grid → Orchestration */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.gridToOrchestration}
                    </p>
                  </div>

                  {/* ==================== ORCHESTRATION ==================== */}
                  <section id="orchestration" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.orchestration.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.orchestration.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.orchestration.description}
                    </p>

                    {/* Orchestration prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('orchestration');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Orchestration features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <Users size={24} />, title: t.orchestration.randomTitle, desc: t.orchestration.randomDesc },
                        { icon: <Monitor size={24} />, title: t.orchestration.projectionTitle, desc: t.orchestration.projectionDesc },
                        { icon: <Eye size={24} />, title: t.orchestration.spotlightTitle, desc: t.orchestration.spotlightDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                            <div className={isDark ? 'text-purple-400' : 'text-purple-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Orchestration → Communication */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.orchestrationToCommunication}
                    </p>
                  </div>

                  {/* ==================== COMMUNICATION ==================== */}
                  <section id="communication" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.communication.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.communication.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.communication.description}
                    </p>

                    {/* Communication prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('communication');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Communication features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <MessageCircle size={24} />, title: t.communication.messagesTitle, desc: t.communication.messagesDesc },
                        { icon: <ArrowRight size={24} />, title: t.communication.replyTitle, desc: t.communication.replyDesc },
                        { icon: <Timer size={24} />, title: t.communication.timerTitle, desc: t.communication.timerDesc },
                        { icon: <FileText size={24} />, title: t.communication.resourceTitle, desc: t.communication.resourceDesc },
                        { icon: <ExternalLink size={24} />, title: t.communication.linkTitle, desc: t.communication.linkDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                            <div className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Communication → Sessions */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.communicationToSessions}
                    </p>
                  </div>

                  {/* ==================== SESSIONS & EXAMS ==================== */}
                  <section id="sessions" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.sessions.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.sessions.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.sessions.description}
                    </p>

                    {/* Sessions prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('sessions');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Session & exam features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <Timer size={24} />, title: t.sessions.endTitle, desc: t.sessions.endDesc },
                        { icon: <FileText size={24} />, title: t.sessions.assignmentTitle, desc: t.sessions.assignmentDesc },
                        { icon: <Layers size={24} />, title: t.sessions.examSetupTitle, desc: t.sessions.examSetupDesc },
                        { icon: <Eye size={24} />, title: t.sessions.examMonitorTitle, desc: t.sessions.examMonitorDesc },
                        { icon: <FileText size={24} />, title: t.sessions.examReviewTitle, desc: t.sessions.examReviewDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                            <div className={isDark ? 'text-orange-400' : 'text-orange-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Sessions → Students */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.sessionsToStudents}
                    </p>
                  </div>

                  {/* ==================== STUDENT EXPERIENCE ==================== */}
                  <section id="students" className="mb-24 md:mb-32">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                      isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-50 text-green-700'
                    }`}>
                      <Users size={12} />
                      {lang === 'fr' ? 'Côté élève' : 'Student side'}
                    </span>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.students.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.students.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.students.description}
                    </p>

                    {/* Student prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('students');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Student features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <FileText size={24} />, title: t.students.resourcesTitle, desc: t.students.resourcesDesc },
                        { icon: <ArrowRight size={24} />, title: t.students.doneTitle, desc: t.students.doneDesc },
                        { icon: <MessageCircle size={24} />, title: t.students.questionTitle, desc: t.students.questionDesc },
                        { icon: <FileText size={24} />, title: t.students.shareTitle, desc: t.students.shareDesc },
                        { icon: <FileText size={24} />, title: t.students.receiveTitle, desc: t.students.receiveDesc },
                        { icon: <Lock size={24} />, title: t.students.lockedTitle, desc: t.students.lockedDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                            <div className={isDark ? 'text-green-400' : 'text-green-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Students → Journeys */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.studentsToJourneys}
                    </p>
                  </div>

                  {/* ==================== COMPLETE JOURNEYS ==================== */}
                  <section id="journeys" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.journeys.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.journeys.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.journeys.description}
                    </p>

                    {/* Journeys prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('journeys');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Other journeys described as cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      {[
                        { icon: <Play size={24} />, title: t.journeys.sc1Title, desc: t.journeys.sc1Desc },
                        { icon: <FileText size={24} />, title: t.journeys.sc7Title, desc: t.journeys.sc7Desc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                            <div className={isDark ? 'text-blue-400' : 'text-blue-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== IMPACT ==================== */}
                  <section id="impact" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.impact.title}
                    </h1>
                    <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.impact.intro}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
                        "{t.testimonial.quote}"
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
                        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
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
