/**
 * Gallery - Minimalist editorial layout grouped by project
 * Emil Kowalski aesthetic: restrained, typographically precise, no decorative elements
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { scrollToElement } from '../utils/smoothScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { GridFour as LayoutGrid, Rows as Rows3, CaretDown as ChevronDown, CaretRight } from '@phosphor-icons/react';
import EnhancedLightbox, { LightboxImage } from '../components/media/EnhancedLightbox';
import CaseStudyTOCBar from '../components/CaseStudyTOCBar';
import LazyImage from '../components/media/LazyImage';
import { useScrollDirection } from '../hooks/useScrollDirection';
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
  const isScrollingDown = useScrollDirection();

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

  // Scroll to hash section on initial load (e.g. /visual-archive#gallery-scrim)
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    // rAF ensures React has painted the DOM before we try to scroll
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowTOC(window.scrollY > 400);

      for (let i = GALLERY_PROJECTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(`gallery-${GALLERY_PROJECTS[i].id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            const id = GALLERY_PROJECTS[i].id;
            setActiveSection(id);
            history.replaceState(null, '', `#gallery-${id}`);
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
    scrollToElement(`gallery-${sectionId}`);
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
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Sticky sub-bar: swaps between breadcrumb and TOC */}
      <div
        className="sticky z-10 backdrop-blur-xl bg-[#FDFDFC]/80"
        style={{ top: 'var(--nav-height, 72px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div className="relative h-10 overflow-hidden">
          {/* Breadcrumb layer */}
          {(() => {
            const hasTOC = showTOC && viewMode === 'editorial';
            const shouldSwap = hasTOC && isScrollingDown;
            return (
              <div
                className="absolute inset-0 flex items-center"
                style={{
                  transform: shouldSwap ? 'translateY(-100%)' : 'translateY(0)',
                  opacity: shouldSwap ? 0 : 1,
                  transition: shouldSwap
                    ? 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease'
                    : 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease 80ms',
                }}
              >
                <div className="max-w-[740px] mx-auto px-6 w-full h-10 flex items-center">
                  <nav className="flex items-center gap-1.5 text-[13px] min-w-0 overflow-hidden">
                    <Link
                      href={`/${lang}/projets`}
                      className="transition-colors hover:underline flex-shrink-0 text-gray-400 hover:text-gray-900"
                    >
                      {lang === 'fr' ? 'Projets' : 'Projects'}
                    </Link>
                    <CaretRight size={10} className="flex-shrink-0 text-gray-300" />
                    <span className="truncate font-medium text-gray-900">
                      {lang === 'fr' ? 'Galerie' : 'Gallery'}
                    </span>
                  </nav>
                </div>
              </div>
            );
          })()}

          {/* TOC layer (editorial mode only) */}
          {showTOC && viewMode === 'editorial' && (
            <div
              className="absolute inset-0"
              style={{
                transform: isScrollingDown ? 'translateY(0)' : 'translateY(100%)',
                opacity: isScrollingDown ? 1 : 0,
                transition: isScrollingDown
                  ? 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease'
                  : 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease 80ms',
              }}
            >
              <CaseStudyTOCBar
                sections={tocSections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
                isDark={false}
                lang={lang}
              />
            </div>
          )}
        </div>
      </div>

      {/* Header section */}
      <div className="pt-32 sm:pt-40 md:pt-48">
        <div className="max-w-[740px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-3">
                {t.title}
              </h1>
              <p className="text-base text-gray-500 max-w-md">
                {t.subtitle}
              </p>
            </div>

            {/* View mode toggle */}
            <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
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
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  style={{ transition: 'background-color 200ms ease, color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery content */}
        <div className="max-w-[960px] mx-auto px-6 pb-24 md:pb-40">
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
  <div className="space-y-24 md:space-y-32">
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
    <section
      id={`gallery-${project.id}`}
      style={{ scrollMarginTop: 'calc(var(--nav-height, 72px) + 40px + 32px)' }}
    >
      {/* Project header — aligned with the 740px text column */}
      {/* clamp(0px, (100vw - 740px) / 2, 110px) matches the centering offset between the
          max-w-[960px] image container and the max-w-[740px] text containers elsewhere */}
      <div
        className="max-w-[740px] mb-6"
        style={{ marginLeft: 'clamp(0px, calc((100vw - 740px) / 2), 110px)' }}
      >
        <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1">
          {project.name}
        </h2>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

      {/* Hero image */}
      {heroItem && (
        <div className="mb-3">
          <MediaCard item={heroItem} index={0} onClick={() => onItemClick(heroItem)} />
        </div>
      )}

      {/* First 2 items */}
      {visibleRest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleRest.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i + 1} onClick={() => onItemClick(item)} />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {hiddenItems.map((item, i) => (
                    <MediaCard key={item.id} item={item} index={i + 3} onClick={() => onItemClick(item)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onToggleExpand}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-900 cursor-pointer active:scale-[0.97]"
            style={{
              marginLeft: 'clamp(0px, calc((100vw - 740px) / 2), 110px)',
              transition: 'color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {items.map((item, i) => (
      <MediaCard key={item.id} item={item} index={i} onClick={() => onItemClick(item)} />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Media Card — clean, no borders, no shadows, minimal hover
// ---------------------------------------------------------------------------

// Per-image crop overrides: [scale, transformOrigin]
const CARD_OVERRIDES: Record<string, [number, string]> = {
  'dm-platform':      [1.5, 'top right'],
  'connect-overview': [2,   'top right'],
};

const DEFAULT_SCALE = 2;
const DEFAULT_ORIGIN = 'top left';

const MediaCard: React.FC<{ item: GalleryItem; onClick: () => void; index?: number }> = ({ item, onClick }) => {
  const isVideo = item.type === 'video';
  const [scale, origin] = CARD_OVERRIDES[item.id] || [DEFAULT_SCALE, DEFAULT_ORIGIN];

  return (
    <div
      className="group rounded-xl overflow-hidden cursor-zoom-in"
      onClick={onClick}
    >
      {isVideo ? (
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
        <div className="aspect-[3/2] overflow-hidden">
          <LazyImage
            src={item.src}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            style={{ transform: `scale(${scale})`, transformOrigin: origin }}
          />
        </div>
      )}
    </div>
  );
};

export default VisualArchivePage;
