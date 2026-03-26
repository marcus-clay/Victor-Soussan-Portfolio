/**
 * Gallery - Editorial layout grouped by project
 * Features: TOC sidebar, collapsed sections, editorial/grid views
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GridFour as LayoutGrid, Rows as Rows3, CaretDown as ChevronDown } from '@phosphor-icons/react';
import EnhancedLightbox, { LightboxImage } from '../components/media/EnhancedLightbox';
import CaseStudyTOCSidebar from '../components/CaseStudyTOCSidebar';
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

const VisualArchivePage: React.FC<VisualArchivePageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [viewMode, setViewMode] = useState<ViewMode>('editorial');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeSection, setActiveSection] = useState(GALLERY_PROJECTS[0]?.id || '');
  const [showTOC, setShowTOC] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  // TOC sections from gallery projects
  const tocSections = useMemo(() => [
    { id: 'top', label: lang === 'en' ? 'Top' : 'Début' },
    ...GALLERY_PROJECTS.map(p => ({ id: p.id, label: p.name })),
  ], [lang]);

  // Flat list for lightbox navigation
  const lightboxImages: LightboxImage[] = useMemo(() =>
    ALL_GALLERY_ITEMS.map(item => {
      const project = GALLERY_PROJECTS.find(p => p.items.includes(item));
      return { src: item.src, caption: project?.name || '', type: item.type };
    }),
    []
  );

  // Scroll detection — window-based
  useEffect(() => {
    const handleScroll = () => {
      setShowTOC(window.scrollY > 400);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(`gallery-${sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  return (
    <div className="min-h-screen bg-[#FCFCFD]">
      {/* TOC Sidebar - only in editorial mode */}
      <CaseStudyTOCSidebar
        sections={tocSections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={false}
        isVisible={showTOC && viewMode === 'editorial'}
        lang={lang}
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">

        {/* Title + View toggle */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 text-gray-900">
              {t.title}
            </h1>
            <p className="text-base md:text-lg max-w-xl text-gray-500">
              {t.subtitle}
            </p>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center rounded-full p-1 flex-shrink-0 bg-gray-100">
            {([
              { key: 'editorial' as ViewMode, Icon: Rows3 },
              { key: 'grid' as ViewMode, Icon: LayoutGrid },
            ]).map(({ key, Icon }) => (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                className={`p-2 rounded-full cursor-pointer active:scale-[0.95] ${
                  viewMode === key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
                style={{ transition: 'background-color 200ms ease, color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
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
            lang={lang}
            onItemClick={openLightbox}
            expandedProjects={expandedProjects}
            onToggleExpand={toggleExpand}
          />
        ) : (
          <GridView
            items={ALL_GALLERY_ITEMS}
            onItemClick={openLightbox}
          />
        )}
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        images={lightboxImages}
        currentIndex={Math.max(0, lightboxIndex)}
        onIndexChange={setLightboxIndex}
        lang={lang}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Editorial View
// ---------------------------------------------------------------------------

const EditorialView: React.FC<{
  projects: GalleryProject[];
  lang: Language;
  onItemClick: (item: GalleryItem) => void;
  expandedProjects: Set<string>;
  onToggleExpand: (projectId: string) => void;
}> = ({ projects, lang, onItemClick, expandedProjects, onToggleExpand }) => (
  <div className="space-y-20 md:space-y-28">
    {projects.map((project) => (
      <ProjectSection
        key={project.id}
        project={project}
        lang={lang}
        onItemClick={onItemClick}
        isExpanded={expandedProjects.has(project.id)}
        onToggleExpand={() => onToggleExpand(project.id)}
      />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Project Section
// ---------------------------------------------------------------------------

const ProjectSection: React.FC<{
  project: GalleryProject;
  lang: Language;
  onItemClick: (item: GalleryItem) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}> = ({ project, lang, onItemClick, isExpanded, onToggleExpand }) => {
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
    <section id={`gallery-${project.id}`} className="scroll-mt-28">
      {/* Project header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] mb-1 text-gray-900">
          {project.name}
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          {description}
        </p>
      </div>

      {/* Hero image */}
      {heroItem && (
        <div className="mb-3 md:mb-4">
          <MediaCard item={heroItem} onClick={() => onItemClick(heroItem)} />
        </div>
      )}

      {/* First 2 items */}
      {visibleRest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {visibleRest.map(item => (
            <MediaCard key={item.id} item={item} onClick={() => onItemClick(item)} />
          ))}
        </div>
      )}

      {/* Collapsed items */}
      {hasHidden && (
        <>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                  {hiddenItems.map(item => (
                    <MediaCard key={item.id} item={item} onClick={() => onItemClick(item)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onToggleExpand}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-900 cursor-pointer active:scale-[0.97]"
            style={{ transition: 'color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
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
// Grid View
// ---------------------------------------------------------------------------

const GridView: React.FC<{
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}> = ({ items, onItemClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    {items.map(item => (
      <MediaCard key={item.id} item={item} onClick={() => onItemClick(item)} />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Media Card — design system hover pattern
// ---------------------------------------------------------------------------

const MediaCard: React.FC<{ item: GalleryItem; onClick: () => void }> = ({ item, onClick }) => (
  <div
    className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 cursor-zoom-in shadow-sm hover:shadow-lg hover:scale-[1.01]"
    style={{ transition: 'border-color 200ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
    onClick={onClick}
  >
    {item.type === 'video' ? (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
      />
    ) : (
      <LazyImage
        src={item.src}
        alt=""
        className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
      />
    )}
  </div>
);

export default VisualArchivePage;
