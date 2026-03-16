/**
 * Gallery - Editorial layout grouped by project
 * Features: TOC sidebar, collapsed sections, editorial/grid views
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GridFour as LayoutGrid, Rows as Rows3, CaretDown as ChevronDown } from '@phosphor-icons/react';
import EnhancedLightbox, { LightboxImage } from '../components/media/EnhancedLightbox';
import CaseStudyTOCSidebar from '../components/CaseStudyTOCSidebar';
import { smoothScrollTo } from '../utils/smoothScroll';
import LazyImage from '../components/media/LazyImage';
import { GALLERY_PROJECTS, ALL_GALLERY_ITEMS, GalleryItem, GalleryProject } from '../data/galleryData';

type Language = 'en' | 'fr';
type ViewMode = 'editorial' | 'grid';

interface VisualArchivePageProps {
  systemTheme: 'light' | 'dark';
  lang: Language;
  onBack: () => void;
}

const TRANSLATIONS = {
  en: {
    title: "Gallery",
    subtitle: "Interfaces, design systems and interaction prototypes from fifteen years of product design across SaaS, EdTech and public services.",
    showMore: (n: number) => `Show ${n} more`,
    showLess: "Show less",
  },
  fr: {
    title: "Galerie",
    subtitle: "Interfaces, design systems et prototypes d'interaction issus de quinze ans de design produit en SaaS, EdTech et services publics.",
    showMore: (n: number) => `Voir ${n} de plus`,
    showLess: "Voir moins",
  }
};

const VisualArchivePage: React.FC<VisualArchivePageProps> = ({ systemTheme, lang, onBack }) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const [viewMode, setViewMode] = useState<ViewMode>('editorial');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeSection, setActiveSection] = useState(GALLERY_PROJECTS[0]?.id || '');
  const [showTOC, setShowTOC] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  // TOC sections from gallery projects
  const tocSections = useMemo(() => [
    { id: 'top', label: lang === 'en' ? 'Top' : 'Début' },
    ...GALLERY_PROJECTS.map(p => ({ id: p.id, label: p.name })),
  ], [lang]);

  // Flat list for lightbox navigation
  const lightboxImages: LightboxImage[] = useMemo(() =>
    ALL_GALLERY_ITEMS.map(item => {
      const project = GALLERY_PROJECTS.find(p => p.items.includes(item));
      return {
        src: item.src,
        caption: project?.name || '',
        type: item.type,
      };
    }),
    []
  );

  // Scroll detection for active section and TOC visibility
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowTOC(container.scrollTop > 400);

      for (let i = GALLERY_PROJECTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(`gallery-${GALLERY_PROJECTS[i].id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(GALLERY_PROJECTS[i].id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (!scrollRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(scrollRef.current, 0);
      return;
    }
    const el = document.getElementById(`gallery-${sectionId}`);
    if (el) {
      const offset = el.offsetTop - 80;
      smoothScrollTo(scrollRef.current, offset);
    }
  }, []);

  const toggleExpand = useCallback((projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  }, []);

  const openLightbox = useCallback((item: GalleryItem) => {
    const globalIndex = ALL_GALLERY_ITEMS.indexOf(item);
    if (globalIndex >= 0) setLightboxIndex(globalIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
  }, []);

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}
    >
      {/* Header - mobile only, desktop uses persistent nav */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl md:hidden ${
        isDark ? 'bg-[#0a0a0a]/80' : 'bg-[#FCFCFD]/80'
      }`}>
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span className={`font-semibold text-lg tracking-[-0.02em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </span>
          <button
            onClick={onBack}
            className={`relative p-3 rounded-full transition-colors cursor-pointer before:absolute before:inset-[-12px] before:content-[''] ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* TOC Sidebar - only in editorial mode */}
      <CaseStudyTOCSidebar
        sections={tocSections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showTOC && viewMode === 'editorial'}
        lang={lang}
      />

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20">

        {/* Title + View toggle */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.title}</h1>
            <p className={`text-base md:text-lg max-w-xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>{t.subtitle}</p>
          </div>

          {/* View mode toggle */}
          <div className={`hidden sm:flex items-center rounded-full p-1 flex-shrink-0 ${
            isDark ? 'bg-white/5' : 'bg-gray-100'
          }`}>
            {([
              { key: 'editorial' as ViewMode, Icon: Rows3 },
              { key: 'grid' as ViewMode, Icon: LayoutGrid },
            ]).map(({ key, Icon }) => (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  viewMode === key
                    ? isDark
                      ? 'bg-white text-gray-900'
                      : 'bg-gray-900 text-white'
                    : isDark
                      ? 'text-gray-500 hover:text-white'
                      : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'editorial' ? (
          <EditorialView
            projects={GALLERY_PROJECTS}
            isDark={isDark}
            lang={lang}
            onItemClick={openLightbox}
            expandedProjects={expandedProjects}
            onToggleExpand={toggleExpand}
          />
        ) : (
          <GridView
            items={ALL_GALLERY_ITEMS}
            isDark={isDark}
            onItemClick={openLightbox}
          />
        )}
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxIndex >= 0}
        onClose={closeLightbox}
        images={lightboxImages}
        currentIndex={Math.max(0, lightboxIndex)}
        onIndexChange={setLightboxIndex}
        lang={lang}
      />
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Editorial View - grouped by project
// ---------------------------------------------------------------------------

interface EditorialViewProps {
  projects: GalleryProject[];
  isDark: boolean;
  lang: Language;
  onItemClick: (item: GalleryItem) => void;
  expandedProjects: Set<string>;
  onToggleExpand: (projectId: string) => void;
}

const EditorialView: React.FC<EditorialViewProps> = ({ projects, isDark, lang, onItemClick, expandedProjects, onToggleExpand }) => {
  return (
    <div className="space-y-20 md:space-y-28">
      {projects.map((project) => (
        <ProjectSection
          key={project.id}
          project={project}
          isDark={isDark}
          lang={lang}
          onItemClick={onItemClick}
          isExpanded={expandedProjects.has(project.id)}
          onToggleExpand={() => onToggleExpand(project.id)}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Project Section - with collapsible items
// ---------------------------------------------------------------------------

interface ProjectSectionProps {
  project: GalleryProject;
  isDark: boolean;
  lang: Language;
  onItemClick: (item: GalleryItem) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, isDark, lang, onItemClick, isExpanded, onToggleExpand }) => {
  const description = lang === 'en' ? project.descriptionEn : project.descriptionFr;
  const showMoreLabel = lang === 'en'
    ? (n: number) => `Show ${n} more`
    : (n: number) => `Voir ${n} de plus`;
  const showLessLabel = lang === 'en' ? 'Show less' : 'Voir moins';

  const [heroItem, ...restItems] = project.items;
  const visibleRest = restItems.slice(0, 2);
  const hiddenItems = restItems.slice(2);
  const hasHidden = hiddenItems.length > 0;

  return (
    <section id={`gallery-${project.id}`} style={{ scrollMarginTop: '136px' }}>
      {/* Project header */}
      <div className="mb-6 md:mb-8">
        <h2 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] mb-1 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{project.name}</h2>
        <p className={`text-sm md:text-base ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>{description}</p>
      </div>

      {/* Hero image (full width) */}
      {heroItem && (
        <div className="mb-3 md:mb-4">
          <MediaCard item={heroItem} isDark={isDark} onClick={() => onItemClick(heroItem)} />
        </div>
      )}

      {/* First 2 items in 2-col grid */}
      {visibleRest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {visibleRest.map(item => (
            <MediaCard key={item.id} item={item} isDark={isDark} onClick={() => onItemClick(item)} />
          ))}
        </div>
      )}

      {/* Collapsed items with expand/collapse */}
      {hasHidden && (
        <>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                  {hiddenItems.map(item => (
                    <MediaCard key={item.id} item={item} isDark={isDark} onClick={() => onItemClick(item)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onToggleExpand}
            className={`mt-4 flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              isDark
                ? 'text-gray-500 hover:text-white'
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            {isExpanded ? showLessLabel : showMoreLabel(hiddenItems.length)}
          </button>
        </>
      )}
    </section>
  );
};

// ---------------------------------------------------------------------------
// Grid View - flat dense grid
// ---------------------------------------------------------------------------

interface GridViewProps {
  items: GalleryItem[];
  isDark: boolean;
  onItemClick: (item: GalleryItem) => void;
}

const GridView: React.FC<GridViewProps> = ({ items, isDark, onItemClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {items.map(item => (
        <MediaCard key={item.id} item={item} isDark={isDark} onClick={() => onItemClick(item)} />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Media Card (image or video)
// ---------------------------------------------------------------------------

interface MediaCardProps {
  item: GalleryItem;
  isDark: boolean;
  onClick: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, isDark, onClick }) => {
  return (
    <div
      className={`group rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isDark
          ? 'border-white/5 hover:border-white/10'
          : 'border-gray-100 hover:border-gray-200'
      }`}
      onClick={onClick}
    >
      {item.type === 'video' ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
      ) : (
        <LazyImage
          src={item.src}
          alt=""
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
      )}
    </div>
  );
};

export default VisualArchivePage;
