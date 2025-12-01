// Toolkit Case Study Page - Static content with instant loading
// Displays the Toolkit project case study with portfolio styling

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Briefcase,
  Layers,
  Sun,
  Moon,
  Rocket,
  Quote,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X
} from 'lucide-react';

interface ToolkitPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
}

// Navigation sections configuration
const sections = [
  { id: 'hero', label: 'Intro', shortLabel: '' },
  { id: 'overview', label: 'Overview', shortLabel: 'OV' },
  { id: 'context', label: 'Context', shortLabel: 'CT' },
  { id: 'phase1', label: 'Phase 1', shortLabel: 'P1' },
  { id: 'phase2', label: 'Phase 2', shortLabel: 'P2' },
  { id: 'phase3', label: 'Phase 3', shortLabel: 'P3' },
  { id: 'design-system', label: 'Design System', shortLabel: 'DS' },
  { id: 'impact', label: 'Impact', shortLabel: 'IM' },
];

// All media (images + videos) for lightbox navigation
type MediaItem = { src: string; caption: string; type: 'image' | 'video' };
const allImages: MediaItem[] = [
  { src: '/images/toolkit/hero.webp', caption: 'Toolkit App Hero', type: 'image' },
  { src: '/images/toolkit/toolkit_app_v3.webp', caption: 'Toolkit App Overview', type: 'image' },
  { src: '/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg', caption: 'Product Evolution - 12 months roadmap showing the journey from prototype to platform maturity.', type: 'image' },
  { src: '/images/toolkit/Diagram_01_-_Problem.svg', caption: 'Core Design Challenge - Planning interface showing the fundamental tension: construction projects contain 50-100+ tasks across multiple zones and timelines.', type: 'image' },
  { src: '/images/toolkit/Diagram_02_-_Research.svg', caption: 'Research and continuous learnings process - Lean validation in a three-person team.', type: 'image' },
  { src: '/images/toolkit/Diagram_03_-_Foundation.svg', caption: 'Product Foundation - MVP scope securing initial funding.', type: 'image' },
  { src: '/images/toolkit/Diagram_04_-_Project_creation_workflow.svg', caption: 'Four-step process from project basics to team launch.', type: 'image' },
  { src: '/images/toolkit/Diagram_05_-_Core_interaction_principles.svg', caption: 'Design principles preventing feature bloat as product expanded.', type: 'image' },
  { src: '/images/toolkit/authentication_-_magic_link.svg', caption: 'Passwordless authentication via magic link.', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_create_-_empty.svg', caption: 'Empty state greeting new users.', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_create_-_modal.svg', caption: 'Form design pattern used across all the application.', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_details_-_v1.svg', caption: 'Chantier Detail v1 - Early desktop layout establishing dual sidebar architecture.', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg', caption: 'Chantier Detail v2 - Removed the metadata informations to the edit view.', type: 'image' },
  { src: '/videos/toolkit/video_-_navigation_-_show_hide.mp4', caption: 'Navigation show/hide - Secondary sidebar collapsing and expanding on demand.', type: 'video' },
  { src: '/images/toolkit/daktop_-_site_setup_-_tasks_list.svg', caption: 'Task creation - Assisted task creation for quick addition and task setting.', type: 'image' },
  { src: '/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg', caption: 'Tasks sequences - Templating is part of Toolkit DNA.', type: 'image' },
  { src: '/images/toolkit/planning_-_v1.svg', caption: 'Planning v1 - First planning canvas with colorful task card aesthetic.', type: 'image' },
  { src: '/images/toolkit/Component_Task_v1.svg', caption: 'Multiple sizes and variations for Task component.', type: 'image' },
  { src: '/images/toolkit/Component_Task_v2.svg', caption: 'Refined component system addressing scalability.', type: 'image' },
  { src: '/images/toolkit/planning_-_v2.svg', caption: 'Planning v2 - Planning canvas evolution with refined visual system.', type: 'image' },
  { src: '/images/toolkit/planning_-_mouse_-_selection_rectangle.svg', caption: 'Multi-select via rectangle drag enabling batch operations.', type: 'image' },
  { src: '/images/toolkit/planning_-_mouse_-_right_click.svg', caption: 'Context-aware menu adapting to selected task.', type: 'image' },
  { src: '/images/toolkit/planning_-_selection_tache_dynamic_menu.svg', caption: 'Planning canvas with adaptive zoom interface.', type: 'image' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', caption: 'Expand layout - Zoom in and out on the planning canvas for better focus.', type: 'video' },
  { src: '/images/toolkit/dynamic_island_menu_-_modifier_tache.svg', caption: 'Task editing modal overlaying planning canvas.', type: 'image' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', caption: 'Task manipulation - Edit duration and task information on the fly.', type: 'video' },
  { src: '/videos/toolkit/video_-_batch_edition.mp4', caption: 'Batch edition - Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds.', type: 'video' },
  { src: '/images/toolkit/dynamic_menu_-_components_and_interface_system.svg', caption: 'Adaptive menu system showing five transformation states.', type: 'image' },
  { src: '/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg', caption: 'Task detail card showing activity log evolution.', type: 'image' },
  { src: '/images/toolkit/desktop_-_chantier_-_index_-_v3.svg', caption: 'Multi-project hub replacing dashboard in V3.', type: 'image' },
  { src: '/images/toolkit/evolution_mobile_menu.svg', caption: 'Mobile bottom navigation transformation.', type: 'image' },
  { src: '/images/toolkit/Design_system.svg', caption: 'Scalable design system components and patterns.', type: 'image' },
  { src: '/images/toolkit/system_-_icons_-_files_and_folders.svg', caption: 'Document type icon library for construction workflows.', type: 'image' },
  { src: '/images/toolkit/Diagram_06_-_Impact.svg', caption: 'Six qualitative impact dimensions plus business outcomes.', type: 'image' },
];

// Apple-style spring transition
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Slide transition for carousel
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
};

export const ToolkitPage: React.FC<ToolkitPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  // Motion values for parallax effect
  const dragX = useMotionValue(0);
  const parallaxX = useTransform(dragX, [-300, 0, 300], [30, 0, -30]);

  // Project metadata
  const projectMeta = {
    type: 'Product Design',
    scope: 'Web, App, Branding',
    phase: 'Zero to One',
    period: '2023-2025',
  };

  // Track scroll position and update active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      // Show nav after scrolling past hero
      setShowNav(scrollTop > 300);

      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      })).filter(s => s.element);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section with proper offset for header + mobile nav
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      // Header height (73px) + mobile nav height (48px on mobile) + padding (16px)
      const isMobile = window.innerWidth < 768;
      const headerOffset = isMobile ? 73 + 48 + 16 : 73 + 24;
      const elementPosition = element.offsetTop - headerOffset;
      containerRef.current.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Get progress percentage
  const getProgress = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    return ((currentIndex + 1) / sections.length) * 100;
  };

  // Open lightbox with specific image
  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setPage([index, 0]);
      setLightboxZoomed(false);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Navigate to next/previous image
  const paginate = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setLightboxIndex(newIndex);
      setPage([newIndex, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, paginate]);

  // Handle drag end for swipe navigation
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      if (lightboxIndex < allImages.length - 1) paginate(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      if (lightboxIndex > 0) paginate(-1);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      {/* Mobile Navigation - Sticky under header */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[73px] left-0 right-0 z-30 md:hidden border-b ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10'
                : 'bg-white/95 backdrop-blur-xl border-gray-200'
            }`}
          >
            {/* Collapsed state - shows current section */}
            <button
              onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-blue-500`} />
                <span
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {sections.find(s => s.id === activeSection)?.label || 'Top'}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isMobileNavExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown
                  size={20}
                  className={systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                />
              </motion.div>
            </button>

            {/* Expanded state - shows all sections */}
            <AnimatePresence>
              {isMobileNavExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`px-4 pb-3 space-y-1 border-t ${
                    systemTheme === 'dark' ? 'border-white/5' : 'border-gray-100'
                  }`}>
                    {sections.slice(1).map((section) => {
                      const isActive = activeSection === section.id;
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      const sectionIndex = sections.findIndex(s => s.id === section.id);
                      const isPast = sectionIndex < currentIndex;

                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            scrollToSection(section.id);
                            setIsMobileNavExpanded(false);
                          }}
                          className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 transition-colors ${
                            isActive
                              ? systemTheme === 'dark'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-blue-50 text-blue-600'
                              : systemTheme === 'dark'
                                ? 'text-gray-400 hover:bg-white/5'
                                : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive
                                ? 'bg-blue-500'
                                : isPast
                                  ? systemTheme === 'dark'
                                    ? 'bg-gray-500'
                                    : 'bg-gray-400'
                                  : systemTheme === 'dark'
                                    ? 'bg-gray-700'
                                    : 'bg-gray-300'
                            }`}
                          />
                          <span className="text-sm font-medium">{section.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          systemTheme === 'dark'
            ? 'bg-[#0a0a0a]/80 border-white/10'
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="mx-auto px-4 md:px-6 py-4 flex items-center justify-between" style={{ maxWidth: '1480px' }}>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1
                className={`text-lg md:text-xl font-bold ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Toolkit
              </h1>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Case Study
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {systemTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* External link */}
            <a
              href="https://toolkit-app.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Visit Toolkit"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </motion.button>
            )}

            {lightboxIndex < allImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight size={28} />
              </motion.button>
            )}

            {/* Image container with carousel */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-20 py-20">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 350, damping: 35 },
                    opacity: { duration: 0.2 },
                    scale: { type: 'spring', stiffness: 350, damping: 35 },
                  }}
                  drag={lightboxZoomed ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDrag={(_, info) => dragX.set(info.offset.x)}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute w-full h-full ${
                    lightboxZoomed
                      ? 'overflow-y-auto overflow-x-hidden cursor-grab active:cursor-grabbing'
                      : 'flex flex-col items-center justify-center cursor-grab active:cursor-grabbing'
                  }`}
                  style={lightboxZoomed ? { scrollBehavior: 'smooth' } : {}}
                >
                  {lightboxZoomed ? (
                    /* Zoomed mode - Full scrollable container */
                    <div
                      className="min-h-full w-full flex flex-col items-center py-16 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxZoomed(false);
                      }}
                    >
                      <motion.img
                        src={allImages[lightboxIndex].src}
                        alt={allImages[lightboxIndex].caption}
                        className="w-[95vw] md:w-[90vw] h-auto rounded-lg shadow-2xl cursor-zoom-out"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                        draggable={false}
                      />
                      {/* Caption at the bottom of zoomed image */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 mb-8 px-4 text-center max-w-3xl"
                      >
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                          {allImages[lightboxIndex].caption}
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          Click to exit zoom
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    /* Normal mode - Centered with constraints */
                    <>
                      <motion.div
                        style={{ x: parallaxX }}
                        className="relative max-w-[90vw] max-h-[70vh] md:max-w-[80vw] md:max-h-[75vh]"
                        onClick={(e) => {
                          if (allImages[lightboxIndex].type === 'image') {
                            e.stopPropagation();
                            setLightboxZoomed(true);
                          }
                        }}
                      >
                        {allImages[lightboxIndex].type === 'video' ? (
                          <motion.video
                            src={allImages[lightboxIndex].src}
                            className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={springTransition}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                          />
                        ) : (
                          <motion.img
                            src={allImages[lightboxIndex].src}
                            alt={allImages[lightboxIndex].caption}
                            className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain cursor-zoom-in rounded-lg shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={springTransition}
                            draggable={false}
                          />
                        )}
                      </motion.div>

                      {/* Caption */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, ...springTransition }}
                        className="mt-6 px-4 text-center max-w-3xl"
                      >
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">
                          {allImages[lightboxIndex].caption}
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          {lightboxIndex + 1} / {allImages.length} • Click image to zoom
                        </p>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image dots indicator */}
            {!lightboxZoomed && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      const dir = idx > lightboxIndex ? 1 : -1;
                      setLightboxIndex(idx);
                      setPage([idx, dir]);
                      setLightboxZoomed(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      idx === lightboxIndex
                        ? 'bg-white w-4'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with Desktop TOC */}
      <div className="mx-auto px-4 md:px-6 py-8 md:py-12" style={{ maxWidth: '1480px' }}>
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1" style={{ maxWidth: '1192px' }}>
            {/* Hero Section - Title + Logo + Testimonial */}
            <section id="hero" className="mb-12">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left Column - Title and Description */}
            <div className="md:col-span-3">
              {/* Meta tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Product Design, web, app, branding
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  -
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Zero to one
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  -
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  2023-2025
                </span>
              </div>

              {/* Main Title */}
              <h1
                className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Designing construction management software that works
              </h1>

              {/* Subtitle */}
              <h2
                className={`text-xl md:text-2xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                From Prototype to 2,000 Customers
              </h2>

              {/* Description */}
              <p
                className={`text-base leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Toolkit needed product design to secure funding and reach market fit in construction tech. Over 12 months, I led end-to-end design in a lean CEO-Dev-Designer team with continuous user validation. We shipped three major releases: funding prototype (3 months), feature-rich V2 (5 months), and mobile-optimized V3 (4 months). The product reached 2,000 paying customers within 24 months, secured enterprise adoption at launch, and raised Series A funding in November 2025.
              </p>
            </div>

            {/* Right Column - Logo + Testimonial */}
            <div className="md:col-span-2">
              {/* Testimonial Card */}
              <div
                className={`p-6 rounded-2xl border ${
                  systemTheme === 'dark'
                    ? 'bg-yellow-900/20 border-yellow-500/20'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <Quote
                  size={24}
                  className={`mb-4 ${
                    systemTheme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                />
                <p
                  className={`text-sm italic leading-relaxed mb-4 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Victor worked with Toolkit as our UX/UI designer from the earliest stages. We ran discovery workshops together before even building the product, allowing him to deeply understand the construction industry. He transformed complex business requirements into perfectly adapted user flows, exactly what a startup like ours needed. Thanks to his experience, Victor also established foundational systems (UI kit, interaction patterns) that saved us considerable development time down the line.
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src="/images/pierre-marie-nigay.png"
                    alt="Pierre-Marie Nigay"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Pierre-Marie Nigay
                    </p>
                    <p
                      className={`text-xs ${
                        systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Founder @ Toolkit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <figure className="mb-16">
          <div
            onClick={() => openLightbox('/images/toolkit/hero.webp')}
            className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <img
              src="/images/toolkit/hero.webp"
              alt="Toolkit App Overview"
              className="w-full h-auto"
            />
          </div>
        </figure>

        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-2 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Overview
          </h1>
          <hr
            className={`mb-8 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {/* Introduction */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Introduction
              </h2>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Construction software is overwhelming. Legacy tools pack every feature into dense interfaces, forcing users through complex workflows to complete basic tasks. Site managers juggle multiple projects, field workers need quick status updates, and office teams require detailed planning. One interface cannot serve all needs equally.
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Toolkit approached this differently. Rather than building another feature-complete solution, we focused on core workflows that construction teams use daily: planning tasks across zones, tracking progress, managing documents, coordinating teams. The challenge was delivering sophistication without complexity.
              </p>
            </div>

            {/* My Role */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                My role
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                I joined as sole designer in a three-person team. The CEO brought domain expertise from years researching construction workflows. The lead developer built the technical foundation. My role: transform business requirements into a scalable product that users would actually adopt. No design team, no researchers, no product managers. Just tight collaboration, continuous validation, and rapid iteration.
              </p>
            </div>

            {/* Project and Impact */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Project and impact
              </h2>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Over 12 months, we evolved from funding prototype to platform maturity. Each phase added sophistication while maintaining simplicity. Progressive disclosure hid complexity until needed. Context-aware interfaces adapted to user tasks. Batch operations reduced repetitive actions. Visual hierarchy prevented information overload at scale.
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                The approach worked. Enterprise customers deployed at launch. Users managing 15+ construction sites adopted the platform. The product reached 2,000 paying customers in 24 months and secured Series A funding. This case study shows how we got there.
              </p>
            </div>
          </div>
        </section>

        {/* Context and Approach Section */}
        <section id="context" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Context and approach
          </h1>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Three phases from funding prototype to platform maturity. Phase 1 secured initial funding with core features. Phase 2 added sophisticated interactions and multi-project support. Phase 3 achieved mobile optimization and design system scalability. Result: 2,000 customers, enterprise adoption, Series A funding within 24 months.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg"
                alt="Product Evolution - 12 months roadmap"
                className="w-full h-auto"
              />
            </div>
          </figure>

          {/* Core Design Challenge, Research, Foundation */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_01_-_Problem.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-square ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Diagram_01_-_Problem.svg"
                  alt="Core Design Challenge"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Core Design Challenge</strong> - Planning interface showing the fundamental tension: construction projects contain 50-100+ tasks across multiple zones and timelines.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_02_-_Research.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-square ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Diagram_02_-_Research.svg"
                  alt="Research process"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Research process</strong> - Lean validation in a three-person team. Microsoft Clarity provided behavioral analytics. CEO conducted 5-7 user calls weekly.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_03_-_Foundation.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] aspect-square ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Diagram_03_-_Foundation.svg"
                  alt="Foundation"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Foundation</strong> - MVP scope securing initial funding. Core infrastructure: passwordless auth, dual sidebar navigation, project workflows.
              </figcaption>
            </figure>
          </div>

          {/* Project Creation Workflow, Core Interaction Principles */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_04_-_Project_creation_workflow.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Diagram_04_-_Project_creation_workflow.svg"
                  alt="Project Creation Workflow"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Product Creation Workflow</strong> - Four-step process from project basics to team launch. Progressive disclosure design: setup steps prominent during creation, automatically collapse once project active.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Diagram_05_-_Core_interaction_principles.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Diagram_05_-_Core_interaction_principles.svg"
                  alt="Core Interaction Principles"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Core Interaction Principles</strong> - Design principles preventing feature bloat. Progressive disclosure, context awareness, batch efficiency, visual hierarchy.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 1 - Foundation */}
        <section id="phase1" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-8 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Phase 1 - Foundation
          </h1>

          {/* 1st Time Experience */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            1st time experience
          </h2>

          {/* Authentication & Empty State */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/authentication_-_magic_link.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/authentication_-_magic_link.svg"
                  alt="Passwordless authentication"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Passwordless authentication</strong> - Magic link login eliminates password friction for field workers sharing devices.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_create_-_empty.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/desktop_-_chantier_-_create_-_empty.svg"
                  alt="Empty state"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Empty state</strong> - Greeting new users with primary sidebar navigation introduced.
              </figcaption>
            </figure>
          </div>

          {/* Form & Detail v1 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_create_-_modal.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/desktop_-_chantier_-_create_-_modal.svg"
                  alt="Form design pattern"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Form design pattern</strong> - Mobile-first approach used across all the application.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_details_-_v1.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/desktop_-_chantier_-_details_-_v1.svg"
                  alt="Chantier Detail v1"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Chantier Detail v1</strong> - Early desktop layout establishing dual sidebar architecture.
              </figcaption>
            </figure>
          </div>

          {/* Chantier Detail v2 - Full width */}
          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_details_-_v2.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/desktop_-_chantier_-_details_-_v2.svg"
                alt="Chantier Detail v2"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Chantier Detail v2</strong> - Removed the metadata informations to the edit view. We only kept contact information display at 1st sight.
            </figcaption>
          </figure>

          {/* Show and Hide navigation */}
          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Show and Hide navigation
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Secondary sidebar collapsing and expanding on demand. Setup sections (zones, companies, task libraries) prominent during project creation, collapsing once project active. Operations sections (planning, documents, observations) surfacing as primary navigation. Progressive disclosure: complexity hidden until relevant, interface adapting to project lifecycle stage.
          </p>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/videos/toolkit/video_-_navigation_-_show_hide.mp4')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                src="/videos/toolkit/video_-_navigation_-_show_hide.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Navigation show/hide</strong> - Secondary sidebar collapsing and expanding on demand.
            </figcaption>
          </figure>

          {/* Divider */}
          <hr
            className={`my-12 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          {/* Tasks */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Tasks
          </h2>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/daktop_-_site_setup_-_tasks_list.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/daktop_-_site_setup_-_tasks_list.svg"
                alt="Task creation interface"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Task creation</strong> - Assisted task creation for quick addition and task setting for each phase of the project.
            </figcaption>
          </figure>

          {/* Sequences */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Sequences
          </h2>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg"
                alt="Tasks sequences interface"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Tasks sequences</strong> - Templating is part of Toolkit DNA. The construction planner can set and save task sequences in a library to speed up site planning.
            </figcaption>
          </figure>

          {/* Divider */}
          <hr
            className={`my-12 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          {/* Planning */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Planning
          </h2>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/planning_-_v1.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/planning_-_v1.svg"
                alt="Planning interface v1"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Planning v1</strong> - First planning canvas with colorful task card aesthetic. High visual weight worked well with 10-15 tasks but became overwhelming at 50-100+ tasks.
            </figcaption>
          </figure>

          {/* Task Components v1 & v2 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Component_Task_v1.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Component_Task_v1.svg"
                  alt="Task component v1"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Task component v1</strong> - Multiple sizes and variations for different display contexts.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/Component_Task_v2.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/Component_Task_v2.svg"
                  alt="Task component v2"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Task component v2</strong> - Refined system with four interaction states. Height reduced, colors desaturated, contrast improved.
              </figcaption>
            </figure>
          </div>

          {/* Planning v2 */}
          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/planning_-_v2.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/planning_-_v2.svg"
                alt="Planning interface v2"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Planning v2</strong> - Planning canvas evolution with refined visual system. Multiple zones and 50+ tasks visible simultaneously without overwhelming interface.
            </figcaption>
          </figure>

          {/* Planning Interactions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/planning_-_mouse_-_selection_rectangle.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/planning_-_mouse_-_selection_rectangle.svg"
                  alt="Multi-select"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Multi-select</strong> - Rectangle drag enabling batch operations across zones and timeline.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/planning_-_mouse_-_right_click.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/planning_-_mouse_-_right_click.svg"
                  alt="Context menu"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Context menu</strong> - Adapting to selected task with prioritized actions.
              </figcaption>
            </figure>

            <figure>
              <div
                onClick={() => openLightbox('/images/toolkit/planning_-_selection_tache_dynamic_menu.svg')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}
              >
                <img
                  src="/images/toolkit/planning_-_selection_tache_dynamic_menu.svg"
                  alt="Adaptive zoom"
                  className="w-full h-auto"
                />
              </div>
              <figcaption
                className={`mt-3 text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <strong>Adaptive zoom</strong> - View controls toggling between day, week, month scales.
              </figcaption>
            </figure>
          </div>

          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Expand layout on planning view
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            To enhance ease of use on the planning we implemented a way to expand the layout to focus on task management, without getting confusion with navigation panel.
          </p>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                src="/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Expand layout</strong> - Zoom in and out on the planning canvas for better focus.
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 2 - Feature expansion */}
        <section id="phase2" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Phase 2 - Feature expansion
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            With the foundation validated, Phase 2 focused on expanding capabilities while maintaining simplicity. We introduced a dynamic menu system that adapts to user context, reducing cognitive load and streamlining workflows. The challenge was adding power features without cluttering the interface.
          </p>

          {/* Dynamic Menu */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Dynamic menu system
          </h2>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            The dynamic menu adapts to the current task context. When editing a task, relevant actions surface immediately. When viewing activity logs, filtering options take priority. This context-awareness reduces navigation steps and keeps users focused on their current workflow.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/dynamic_island_menu_-_modifier_tache.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/dynamic_island_menu_-_modifier_tache.svg"
                alt="Dynamic island menu - task modification"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Dynamic island menu</strong> - Contextual task modification with quick actions and status updates.
            </figcaption>
          </figure>

          {/* Task manipulation video */}
          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Task manipulation in planning
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Edit duration and task information on the fly directly from the planning canvas.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/videos/toolkit/video_-_task_manipulation.mp4')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                src="/videos/toolkit/video_-_task_manipulation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Task manipulation</strong> - Edit duration and task information on the fly.
            </figcaption>
          </figure>

          {/* Batch edition video */}
          <h3
            className={`text-lg font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Batch edition
          </h3>
          <p
            className={`text-base leading-relaxed mb-6 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds. Users managing 50-100+ tasks need efficient ways to apply changes across groups.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/videos/toolkit/video_-_batch_edition.mp4')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <video
                src="/videos/toolkit/video_-_batch_edition.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto pointer-events-none"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Batch edition</strong> - Select a zone or multiple tasks on the canvas, apply parameters in 20 seconds.
            </figcaption>
          </figure>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/dynamic_menu_-_components_and_interface_system.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/dynamic_menu_-_components_and_interface_system.svg"
                alt="Dynamic menu components and interface system"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Interface system</strong> - Component architecture for the dynamic menu, ensuring consistency across different contexts.
            </figcaption>
          </figure>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg"
                alt="Task detail with activity section"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Activity section behavior</strong> - Task detail view with dynamic menu showing activity log and contextual actions.
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 3 - Platform maturity */}
        <section id="phase3" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Phase 3 - Platform maturity
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Phase 3 brought platform maturity with the project hub and mobile evolution. Enterprise customers needed to manage multiple construction sites from a single dashboard. Field workers needed mobile access that matched the desktop experience. We delivered both without compromising either.
          </p>

          {/* Project Hub */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Project hub
          </h2>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            The project hub provides a bird's-eye view of all construction sites. Managers can quickly assess progress, identify bottlenecks, and drill into specific projects. Visual indicators surface urgent items without requiring deep navigation.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/desktop_-_chantier_-_index_-_v3.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/desktop_-_chantier_-_index_-_v3.svg"
                alt="Project hub - construction site index v3"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Project hub v3</strong> - Multi-site dashboard with progress indicators, quick actions, and filtering capabilities.
            </figcaption>
          </figure>

          {/* Mobile Evolution */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Mobile evolution
          </h2>

          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Construction happens on-site, often in challenging conditions. The mobile experience needed to be robust, fast, and usable with gloves. We redesigned the navigation system for touch-first interaction while maintaining feature parity with desktop.
          </p>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/evolution_mobile_menu.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/evolution_mobile_menu.svg"
                alt="Mobile menu evolution"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Mobile navigation evolution</strong> - Touch-optimized menu system with gesture support and thumb-friendly action zones.
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Design System Foundation */}
        <section id="design-system" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Design system foundation
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            A three-person team cannot afford to redesign components for every feature. We built a design system that scaled with the product: reusable components, consistent patterns, and a shared visual language. This foundation enabled rapid iteration while maintaining quality.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/Design_system.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/Design_system.svg"
                alt="Design system overview"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Design system</strong> - Component library with tokens, patterns, and usage guidelines for consistent implementation.
            </figcaption>
          </figure>

          <figure className="mb-8">
            <div
              onClick={() => openLightbox('/images/toolkit/system_-_icons_-_files_and_folders.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/system_-_icons_-_files_and_folders.svg"
                alt="Icon system - files and folders"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Icon system</strong> - Custom icon set for files and folders, optimized for construction document management.
            </figcaption>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Impact */}
        <section id="impact" className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Impact
          </h1>
          <p
            className={`text-base leading-relaxed mb-8 ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            The design approach delivered measurable business results. By focusing on core workflows and progressive complexity, we created a product that both enterprise customers and small teams could adopt quickly. The numbers tell the story.
          </p>

          <figure className="mb-12">
            <div
              onClick={() => openLightbox('/images/toolkit/Diagram_06_-_Impact.svg')}
              className={`rounded-2xl overflow-hidden border cursor-pointer transition-transform hover:scale-[1.01] ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/Diagram_06_-_Impact.svg"
                alt="Impact diagram"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Project impact</strong> - Key metrics and milestones achieved over the 12-month product development cycle.
            </figcaption>
          </figure>

          {/* Key Results */}
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-2xl border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                2,000+
              </p>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Paying customers within 24 months of launch
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Series A
              </p>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Funding secured in November 2025
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p
                className={`text-3xl font-bold mb-2 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Enterprise
              </p>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Customers managing 15+ sites adopted at launch
              </p>
            </div>
          </div>
        </section>

        {/* Project Meta Card - Bottom */}
        <div
          className={`p-6 rounded-3xl border mt-12 ${
            systemTheme === 'dark'
              ? 'bg-[#1D1D1F] border-white/10'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-50'
                }`}
              >
                <Layers
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Type
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.type}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                }`}
              >
                <Briefcase
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Scope
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.scope}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-green-500/20' : 'bg-green-50'
                }`}
              >
                <Calendar
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Period
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.period}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}
              >
                <Rocket
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Phase
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.phase}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing for mobile nav */}
        <div className="h-20 md:h-0" />
          </main>

          {/* Desktop Table of Contents - Sticky Card */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div
              ref={tocRef}
              className={`sticky top-24 p-5 rounded-2xl border shadow-sm ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-white border-gray-200 shadow-gray-100'
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Table of Contents
              </p>
              <nav className="space-y-1">
                {sections.slice(1).map((section) => {
                  const isActive = activeSection === section.id;
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  const sectionIndex = sections.findIndex(s => s.id === section.id);
                  const isPast = sectionIndex < currentIndex;

                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 transition-all duration-200 group ${
                        isActive
                          ? systemTheme === 'dark'
                            ? 'bg-blue-500/10'
                            : 'bg-blue-50'
                          : 'hover:bg-opacity-50'
                      } ${
                        systemTheme === 'dark'
                          ? 'hover:bg-white/5'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-500'
                            : isPast
                              ? systemTheme === 'dark'
                                ? 'bg-gray-500'
                                : 'bg-gray-400'
                              : systemTheme === 'dark'
                                ? 'bg-gray-700 group-hover:bg-gray-600'
                                : 'bg-gray-300 group-hover:bg-gray-400'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-blue-500'
                            : isPast
                              ? systemTheme === 'dark'
                                ? 'text-gray-300'
                                : 'text-gray-700'
                              : systemTheme === 'dark'
                                ? 'text-gray-500 group-hover:text-gray-400'
                                : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      >
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolkitPage;
