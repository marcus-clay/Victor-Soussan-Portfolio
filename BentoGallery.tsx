// BentoGallery - Full-page modal gallery for case study snapshots
// Displays images and videos in a 3-column bento grid with lightbox support

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

export interface GalleryItem {
  src: string;
  caption: string;
  captionDesc?: string;
  type: 'image' | 'video';
  span?: 'normal' | 'wide' | 'tall'; // for bento layout variation
}

interface BentoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: GalleryItem[];
  systemTheme: 'light' | 'dark';
  lang?: 'en' | 'fr';
}

const TRANSLATIONS = {
  en: {
    snapshots: 'Project Snapshots',
    items: 'items',
    clickToZoom: 'Click to zoom',
    close: 'Close',
  },
  fr: {
    snapshots: 'Aperçus du projet',
    items: 'éléments',
    clickToZoom: 'Cliquer pour agrandir',
    close: 'Fermer',
  },
};

export const BentoGallery: React.FC<BentoGalleryProps> = ({
  isOpen,
  onClose,
  title,
  items,
  systemTheme,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  // Lightbox navigation
  const paginate = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < items.length) {
      setLightboxIndex(newIndex);
      setPage([page + newDirection, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex, items.length, page]);

  // Open lightbox at specific index
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setPage([index, 0]); // direction 0 = open from center
    setLightboxOpen(true);
    setLightboxZoomed(false);
  };

  // Close lightbox
  const closeLightbox = () => {
    setPage([page, 0]); // direction 0 = close to center
    setLightboxOpen(false);
    setLightboxZoomed(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, paginate]);

  // Close gallery on Escape
  useEffect(() => {
    if (!isOpen || lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle drag end for swipe navigation
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      if (lightboxIndex < items.length - 1) paginate(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      if (lightboxIndex > 0) paginate(-1);
    }
  };

  // Check if item is video
  const isVideo = (src: string) => {
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  };

  // Get current item
  const currentItem = items[lightboxIndex];

  // Lightbox animation variants
  // When direction is 0 (initial open), animate from center with scale
  // When direction is non-zero (swiping), animate from left/right
  const lightboxVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 0 : direction > 0 ? 300 : -300,
      opacity: 0,
      scale: direction === 0 ? 0.9 : 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction === 0 ? 0 : direction < 0 ? 300 : -300,
      opacity: 0,
      scale: direction === 0 ? 0.9 : 0.95,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-[100] overflow-y-auto ${
            systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
          }`}
        >
          {/* Header */}
          <header
            className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/80 border-white/10'
                : 'bg-white/80 border-gray-200'
            }`}
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
              <div>
                <h1
                  className={`text-lg md:text-xl font-bold ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {title}
                </h1>
                <p
                  className={`text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {t.snapshots} - {items.length} {t.items}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  systemTheme === 'dark'
                    ? 'hover:bg-white/10 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label={t.close}
              >
                <X size={24} />
              </button>
            </div>
          </header>

          {/* Bento Grid */}
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, index) => (
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group cursor-pointer ${
                    item.span === 'wide' ? 'sm:col-span-2' : ''
                  } ${item.span === 'tall' ? 'sm:row-span-2' : ''}`}
                  onClick={() => openLightbox(index)}
                >
                  <div
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg ${
                      systemTheme === 'dark'
                        ? 'border-white/10 group-hover:border-white/20'
                        : 'border-gray-200 group-hover:border-gray-300'
                    }`}
                  >
                    {item.type === 'video' || isVideo(item.src) ? (
                      <div className="relative aspect-video">
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        {/* Play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              systemTheme === 'dark'
                                ? 'bg-white/20 backdrop-blur-sm'
                                : 'bg-black/30 backdrop-blur-sm'
                            }`}
                          >
                            <Play
                              size={24}
                              className="text-white ml-1"
                              fill="white"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video">
                        <img
                          src={item.src}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                  <figcaption
                    className={`mt-2 text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <strong
                      className={
                        systemTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }
                    >
                      {item.caption}
                    </strong>
                    {item.captionDesc && (
                      <span className="hidden sm:inline">
                        {' '}
                        - {item.captionDesc}
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxOpen && currentItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
                onClick={closeLightbox}
              >
                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-[210] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label={t.close}
                >
                  <X size={24} />
                </button>

                {/* Navigation arrows */}
                {lightboxIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      paginate(-1);
                    }}
                    className="absolute left-4 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={28} />
                  </button>
                )}
                {lightboxIndex < items.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      paginate(1);
                    }}
                    className="absolute right-4 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight size={28} />
                  </button>
                )}

                {/* Image/Video container */}
                <motion.div
                  key={page}
                  custom={direction}
                  variants={lightboxVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ cursor: 'grabbing' }}
                  className={`relative max-w-[90vw] max-h-[85vh] cursor-grab active:cursor-grabbing ${
                    lightboxZoomed ? 'cursor-zoom-out' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentItem.type !== 'video' && !isVideo(currentItem.src)) {
                      setLightboxZoomed(!lightboxZoomed);
                    }
                  }}
                >
                  {currentItem.type === 'video' || isVideo(currentItem.src) ? (
                    <video
                      src={currentItem.src}
                      className="max-w-full max-h-[85vh] rounded-lg"
                      controls
                      autoPlay
                      playsInline
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <img
                      src={currentItem.src}
                      alt={currentItem.caption}
                      className={`max-h-[85vh] rounded-lg transition-transform duration-300 ${
                        lightboxZoomed
                          ? 'scale-150 cursor-zoom-out'
                          : 'scale-100 cursor-zoom-in'
                      }`}
                      style={{
                        maxWidth: lightboxZoomed ? 'none' : '90vw',
                      }}
                    />
                  )}
                </motion.div>

                {/* Caption */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white/90 text-sm font-medium mb-1">
                    {currentItem.caption}
                  </p>
                  {currentItem.captionDesc && (
                    <p className="text-white/60 text-xs max-w-xl mx-auto px-4">
                      {currentItem.captionDesc}
                    </p>
                  )}
                  <p className="text-white/40 text-xs mt-2">
                    {lightboxIndex + 1} / {items.length}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gallery data for Toolkit case study
export const TOOLKIT_GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/toolkit/toolkit_app_v3.webp',
    caption: 'Toolkit App Overview',
    captionDesc: 'Vue d\'ensemble de l\'application Toolkit',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/toolkit/Diagram_00_-_Product_Evolution___12_months.svg',
    caption: 'Product Evolution',
    captionDesc: '12 months of product iteration',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_01_-_Problem.svg',
    caption: 'Problem Statement',
    captionDesc: 'Initial pain points and challenges',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_02_-_Research.svg',
    caption: 'Research Phase',
    captionDesc: 'User research and discovery',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_03_-_Foundation.svg',
    caption: 'Design Foundation',
    captionDesc: 'Core design principles',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_04_-_Project_creation_workflow.svg',
    caption: 'Project Creation Workflow',
    captionDesc: 'Streamlined project setup flow',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_05_-_Core_interaction_principles.svg',
    caption: 'Interaction Principles',
    captionDesc: 'Core UX patterns',
    type: 'image',
  },
  {
    src: '/images/toolkit/Diagram_06_-_Impact.svg',
    caption: 'Business Impact',
    captionDesc: 'Measured outcomes',
    type: 'image',
  },
  {
    src: '/images/toolkit/authentication_-_magic_link.svg',
    caption: 'Magic Link Authentication',
    captionDesc: 'Passwordless login flow',
    type: 'image',
  },
  {
    src: '/images/toolkit/desktop_-_chantier_-_index_-_v3.svg',
    caption: 'Project Index',
    captionDesc: 'Main dashboard view',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg',
    caption: 'Project Details',
    captionDesc: 'Detailed project view',
    type: 'image',
  },
  {
    src: '/images/toolkit/desktop_-_chantier_-_create_-_modal.svg',
    caption: 'Create Project Modal',
    captionDesc: 'New project creation',
    type: 'image',
  },
  {
    src: '/images/toolkit/daktop_-_site_setup_-_tasks_list.svg',
    caption: 'Tasks List',
    captionDesc: 'Task management interface',
    type: 'image',
  },
  {
    src: '/images/toolkit/daktop_-_site_setup_-_tasks_sequence.svg',
    caption: 'Task Sequence',
    captionDesc: 'Sequential task workflow',
    type: 'image',
  },
  {
    src: '/images/toolkit/planning_-_v1.svg',
    caption: 'Planning V1',
    captionDesc: 'Initial planning interface',
    type: 'image',
  },
  {
    src: '/images/toolkit/planning_-_v2.svg',
    caption: 'Planning V2',
    captionDesc: 'Improved planning view',
    type: 'image',
  },
  {
    src: '/images/toolkit/dynamic_menu_-_components_and_interface_system.svg',
    caption: 'Dynamic Menu System',
    captionDesc: 'Component and interface patterns',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/toolkit/evolution_mobile_menu.svg',
    caption: 'Mobile Menu Evolution',
    captionDesc: 'Mobile navigation iterations',
    type: 'image',
  },
  {
    src: '/images/toolkit/dynamic_island_menu_-_modifier_tache.svg',
    caption: 'Dynamic Island Menu',
    captionDesc: 'Task modification interface',
    type: 'image',
  },
  {
    src: '/images/toolkit/cars_detail_tache_-_dynamic_menu_-_comportement_section_activite.svg',
    caption: 'Activity Section',
    captionDesc: 'Task activity behavior',
    type: 'image',
  },
  {
    src: '/images/toolkit/Design_system.svg',
    caption: 'Design System',
    captionDesc: 'UI component library',
    type: 'image',
  },
  {
    src: '/images/toolkit/system_-_icons_-_files_and_folders.svg',
    caption: 'Icon System',
    captionDesc: 'Files and folders iconography',
    type: 'image',
  },
];

// Gallery data for Dailymotion case study
export const DAILYMOTION_GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.png',
    caption: 'Platform Overview',
    captionDesc: 'Dailymotion Partner Platform',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/dailymotion/dailymotion_focus_upload_2x.webp',
    caption: 'Video Upload',
    captionDesc: 'Upload management interface',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_focus_livestream_2x.webp',
    caption: 'Live Dashboard',
    captionDesc: 'Real-time streaming monitor',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_focus_player_template_2x.webp',
    caption: 'Player Manager',
    captionDesc: 'Player customization tools',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_upload2x.png',
    caption: 'Batch Upload',
    captionDesc: 'Parallel upload with real-time feedback',
    type: 'image',
  },
  {
    src: '/videos/dailymotion/video_-_cancel_upload.mp4',
    caption: 'Cancel Upload',
    captionDesc: 'Smooth cancellation flow',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/video_2025-11-10_02.26.48.mp4',
    caption: 'Thumbnail Update',
    captionDesc: 'Instant thumbnail preview update',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/video_add_subtitle.mp4',
    caption: 'Add Subtitles',
    captionDesc: 'Streamlined subtitle upload',
    type: 'video',
  },
  {
    src: '/images/dailymotion/dailymotion_-_video_manager.svg',
    caption: 'Video Library',
    captionDesc: 'Bulk media management',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4',
    caption: 'Embed Code',
    captionDesc: 'Copy interaction and feedback',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/switch_12-24.mp4',
    caption: 'Time Picker',
    captionDesc: '12/24H switch interaction',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4',
    caption: 'Password Protection',
    captionDesc: 'Secure video access workflow',
    type: 'video',
  },
  {
    src: '/videos/dailymotion/Geoblocking.mp4',
    caption: 'Geoblocking',
    captionDesc: 'Location-based access control',
    type: 'video',
  },
  {
    src: '/images/dailymotion/dailymotion_-_share_expanded2x.png',
    caption: 'Share Modal',
    captionDesc: 'Full embed customization options',
    type: 'image',
  },
  {
    src: '/images/dailymotion/Share_-_keyboard_input2x.png',
    caption: 'Keyboard Mapping',
    captionDesc: 'Share modal specifications',
    type: 'image',
  },
  {
    src: '/images/dailymotion/image.png',
    caption: 'Start Time Input',
    captionDesc: 'Keyboard input specifications',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_add_to_playlist_-_spec2x.png',
    caption: 'Add to Playlist',
    captionDesc: 'Playlist management flow',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_live_-_countdown2x.png',
    caption: 'Pre-broadcast Countdown',
    captionDesc: 'Scheduled start with OFF AIR badge',
    type: 'image',
  },
  {
    src: '/images/dailymotion/dailymotion_-_livestream2x.png',
    caption: 'Live Dashboard',
    captionDesc: 'Real-time broadcast monitoring',
    type: 'image',
    span: 'wide',
  },
  {
    src: '/images/dailymotion/dailymotion_-_create_player2x.png',
    caption: 'Player Configurator',
    captionDesc: 'Define appearance and retrieve embed code',
    type: 'image',
  },
  {
    src: '/images/dailymotion/design_system_-_Styles2x.png',
    caption: 'UI Kit - Styles',
    captionDesc: 'Foundation for coherent product suite',
    type: 'image',
  },
  {
    src: '/images/dailymotion/design_system_-_component_library2x.png',
    caption: 'UI Kit - Components',
    captionDesc: 'Scalable component library',
    type: 'image',
  },
];

export default BentoGallery;
