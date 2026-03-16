/**
 * ToolkitShowcase - Premium bento cards presentation
 *
 * Inspired by Jumpshare's marketing style:
 * - Device frames with shadows and gradients
 * - Inner white shadows for depth
 * - Subtle borders and radius
 * - Cards with integrated titles and descriptions
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Quotes as Quote } from '@phosphor-icons/react';
import EnhancedLightbox, { LightboxImage } from '../media/EnhancedLightbox';

interface ToolkitShowcaseProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
}

// Media cropping styles for Apple-style tight framing
type CropStyle = 'full' | 'top' | 'bottom' | 'left' | 'right' | 'center-zoom' | 'top-left' | 'bottom-right';

interface MediaSection {
  id: string;
  title?: string;
  description?: string;
  media?: string;
  mediaType?: 'image' | 'video';
  size: 'large' | 'medium';
  type?: 'testimonial' | 'stats';
  crop?: CropStyle;
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
  stats?: Array<{ value: string; label: string }>;
}

// Showcase content
const SHOWCASE_CONTENT = {
  en: {
    hero: {
      title: 'Construction management that works',
      subtitle: 'From prototype to 2,000 customers in 24 months',
    },
    sections: [
      {
        id: 'planning',
        title: 'Plan projects with visual clarity',
        description: 'Manage 50-100+ tasks across multiple zones with an interface that scales. Color-coded tasks, drag-to-schedule, and zoom controls that adapt to your workflow.',
        media: '/images/toolkit/planning_-_v2.svg',
        mediaType: 'image' as const,
        size: 'large' as const,
        crop: 'top' as CropStyle, // Show top portion, cropped at bottom
      },
      {
        id: 'testimonial',
        type: 'testimonial' as const,
        quote: 'Victor transformed complex business requirements into perfectly adapted user flows. His foundational systems saved us considerable development time.',
        author: 'Pierre-Marie Nigay',
        role: 'Founder @ Toolkit',
        avatar: '/images/testimonials/pierre-marie-nigay.webp',
        size: 'medium' as const,
      },
      {
        id: 'dynamic-menu',
        title: 'Context-aware task editing',
        description: 'Edit task details without leaving the planning view. The dynamic menu adapts to show relevant actions based on what you\'re working on.',
        media: '/images/toolkit/dynamic_island_menu_-_modifier_tache.svg',
        mediaType: 'image' as const,
        size: 'medium' as const,
        crop: 'center-zoom' as CropStyle, // Zoomed center focus
      },
      {
        id: 'batch-edit',
        title: 'Batch operations in seconds',
        description: 'Select multiple tasks with rectangle drag, apply changes to all at once. What used to take 20 minutes now takes 20 seconds.',
        media: '/videos/toolkit/video_-_batch_edition.mp4',
        mediaType: 'video' as const,
        size: 'large' as const,
        crop: 'full' as CropStyle,
      },
      {
        id: 'task-manipulation',
        title: 'Drag, resize, reschedule',
        description: 'Intuitive task manipulation directly on the canvas. Change duration, move between zones, update status, all with natural gestures.',
        media: '/videos/toolkit/video_-_task_manipulation.mp4',
        mediaType: 'video' as const,
        size: 'medium' as const,
        crop: 'right' as CropStyle, // Show right side, cropped left
      },
      {
        id: 'navigation',
        title: 'Navigation that adapts',
        description: 'Progressive disclosure keeps the interface clean. Setup sections collapse once your project is active, surfacing what matters most.',
        media: '/videos/toolkit/video_-_navigation_-_show_hide.mp4',
        mediaType: 'video' as const,
        size: 'medium' as const,
        crop: 'left' as CropStyle, // Show left side
      },
      {
        id: 'zoom',
        title: 'Zoom to the right level',
        description: 'Switch between day, week, and month views instantly. The interface adapts task density and information based on zoom level.',
        media: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4',
        mediaType: 'video' as const,
        size: 'large' as const,
        crop: 'bottom' as CropStyle, // Show bottom, cropped top
      },
      {
        id: 'design-system',
        title: 'Built on solid foundations',
        description: 'A design system that scales with the product. Reusable components, consistent patterns, and a shared visual language.',
        media: '/images/toolkit/Design_system.svg',
        mediaType: 'image' as const,
        size: 'medium' as const,
        crop: 'top-left' as CropStyle, // Corner crop
      },
      {
        id: 'mobile',
        title: 'Mobile-first field access',
        description: 'Construction happens on-site. The mobile experience is touch-optimized and usable with gloves, maintaining full feature parity.',
        media: '/images/toolkit/evolution_mobile_menu.svg',
        mediaType: 'image' as const,
        size: 'medium' as const,
        crop: 'full' as CropStyle,
      },
      {
        id: 'impact',
        type: 'stats' as const,
        stats: [
          { value: '2,000+', label: 'Paying customers' },
          { value: 'Series A', label: 'Funding secured' },
          { value: '15+', label: 'Sites per enterprise user' },
        ],
        size: 'large' as const,
      },
    ] as MediaSection[],
  },
  fr: {
    hero: {
      title: 'Gestion de chantier qui fonctionne',
      subtitle: 'Du prototype à 2 000 clients en 24 mois',
    },
    sections: [
      {
        id: 'planning',
        title: 'Planifiez vos projets avec clarté',
        description: 'Gérez 50-100+ tâches sur plusieurs zones avec une interface qui s\'adapte. Tâches colorées, glisser-déposer et contrôles de zoom adaptés à votre workflow.',
        media: '/images/toolkit/planning_-_v2.svg',
        mediaType: 'image' as const,
        size: 'large' as const,
        crop: 'top' as CropStyle,
      },
      {
        id: 'testimonial',
        type: 'testimonial' as const,
        quote: 'Victor a transformé des exigences métier complexes en parcours utilisateur parfaitement adaptés. Ses systèmes fondamentaux nous ont fait gagner un temps de développement considérable.',
        author: 'Pierre-Marie Nigay',
        role: 'Fondateur @ Toolkit',
        avatar: '/images/testimonials/pierre-marie-nigay.webp',
        size: 'medium' as const,
      },
      {
        id: 'dynamic-menu',
        title: 'Édition de tâches contextuelle',
        description: 'Modifiez les détails des tâches sans quitter la vue planning. Le menu dynamique s\'adapte pour afficher les actions pertinentes.',
        media: '/images/toolkit/dynamic_island_menu_-_modifier_tache.svg',
        mediaType: 'image' as const,
        size: 'medium' as const,
        crop: 'center-zoom' as CropStyle,
      },
      {
        id: 'batch-edit',
        title: 'Opérations en lot en quelques secondes',
        description: 'Sélectionnez plusieurs tâches par rectangle, appliquez les modifications à toutes en une fois. Ce qui prenait 20 minutes prend maintenant 20 secondes.',
        media: '/videos/toolkit/video_-_batch_edition.mp4',
        mediaType: 'video' as const,
        size: 'large' as const,
        crop: 'full' as CropStyle,
      },
      {
        id: 'task-manipulation',
        title: 'Glissez, redimensionnez, replanifiez',
        description: 'Manipulation intuitive des tâches directement sur le canvas. Changez la durée, déplacez entre zones, mettez à jour le statut.',
        media: '/videos/toolkit/video_-_task_manipulation.mp4',
        mediaType: 'video' as const,
        size: 'medium' as const,
        crop: 'right' as CropStyle,
      },
      {
        id: 'navigation',
        title: 'Navigation adaptative',
        description: 'Le dévoilement progressif garde l\'interface épurée. Les sections de configuration se replient une fois le projet actif.',
        media: '/videos/toolkit/video_-_navigation_-_show_hide.mp4',
        mediaType: 'video' as const,
        size: 'medium' as const,
        crop: 'left' as CropStyle,
      },
      {
        id: 'zoom',
        title: 'Zoomez au bon niveau',
        description: 'Passez de la vue jour à semaine à mois instantanément. L\'interface adapte la densité et l\'information selon le niveau de zoom.',
        media: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4',
        mediaType: 'video' as const,
        size: 'large' as const,
        crop: 'bottom' as CropStyle,
      },
      {
        id: 'design-system',
        title: 'Construit sur des bases solides',
        description: 'Un design system qui évolue avec le produit. Composants réutilisables, patterns cohérents, langage visuel partagé.',
        media: '/images/toolkit/Design_system.svg',
        mediaType: 'image' as const,
        size: 'medium' as const,
        crop: 'top-left' as CropStyle,
      },
      {
        id: 'mobile',
        title: 'Accès mobile terrain',
        description: 'La construction se passe sur site. L\'expérience mobile est optimisée tactile, utilisable avec des gants, avec parité fonctionnelle complète.',
        media: '/images/toolkit/evolution_mobile_menu.svg',
        mediaType: 'image' as const,
        size: 'medium' as const,
        crop: 'full' as CropStyle,
      },
      {
        id: 'impact',
        type: 'stats' as const,
        stats: [
          { value: '2 000+', label: 'Clients payants' },
          { value: 'Série A', label: 'Financement obtenu' },
          { value: '15+', label: 'Chantiers par utilisateur entreprise' },
        ],
        size: 'large' as const,
      },
    ] as MediaSection[],
  },
};

// Get crop styles for Apple-style tight framing
const getCropStyles = (crop: CropStyle = 'full'): React.CSSProperties => {
  const styles: Record<CropStyle, React.CSSProperties> = {
    'full': {},
    'top': { objectPosition: 'top center', transform: 'scale(1.15)', transformOrigin: 'top center' },
    'bottom': { objectPosition: 'bottom center', transform: 'scale(1.15)', transformOrigin: 'bottom center' },
    'left': { objectPosition: 'left center', transform: 'scale(1.2)', transformOrigin: 'left center' },
    'right': { objectPosition: 'right center', transform: 'scale(1.2)', transformOrigin: 'right center' },
    'center-zoom': { transform: 'scale(1.3)', transformOrigin: 'center center' },
    'top-left': { objectPosition: 'top left', transform: 'scale(1.25)', transformOrigin: 'top left' },
    'bottom-right': { objectPosition: 'bottom right', transform: 'scale(1.25)', transformOrigin: 'bottom right' },
  };
  return styles[crop];
};

// Premium Card Component
const ShowcaseCard: React.FC<{
  section: any;
  isDark: boolean;
  index: number;
  onMediaClick: (media: string, type: 'image' | 'video') => void;
}> = ({ section, isDark, index, onMediaClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Testimonial card - Apple-quality design
  if (section.type === 'testimonial') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
        className={`relative rounded-2xl p-7 ${
          section.size === 'large' ? 'md:col-span-2' : ''
        } ${
          isDark
            ? 'bg-[#141418] border border-[#2a2a2e]'
            : 'bg-white border border-gray-200/80'
        }`}
        style={{
          boxShadow: isDark
            ? '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        {/* Subtle blue accent glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />
        <Quote className={`w-8 h-8 mb-5 ${isDark ? 'text-blue-400/30' : 'text-blue-500/25'}`} />
        <blockquote className={`text-base md:text-lg font-medium leading-relaxed mb-6 ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          "{section.quote}"
        </blockquote>
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-full overflow-hidden ${
              isDark ? 'border border-[#3a3a3e]' : 'border border-gray-300'
            }`}
            style={{
              boxShadow: isDark
                ? '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(59,130,246,0.1)'
                : '0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(59,130,246,0.08)',
            }}
          >
            <img
              src={section.avatar}
              alt={section.author}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/victor-soussan.webp';
              }}
            />
          </div>
          <div>
            <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {section.author}
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {section.role}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Stats card - Apple-quality design with prominent blue accents
  if (section.type === 'stats') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
        className={`relative rounded-2xl p-8 md:col-span-2 overflow-hidden ${
          isDark
            ? 'bg-gradient-to-br from-[#0f1628] via-[#111827] to-[#0c1220] border border-blue-500/15'
            : 'bg-gradient-to-br from-[#f0f5ff] via-[#f5f8ff] to-[#edf2ff] border border-blue-200/60'
        }`}
        style={{
          boxShadow: isDark
            ? '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3), 0 16px 48px rgba(59,130,246,0.1)'
            : '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(59,130,246,0.08), 0 20px 60px rgba(59,130,246,0.1)',
        }}
      >
        {/* Blue glow at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at top, rgba(59,130,246,0.15) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at top, rgba(59,130,246,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative grid grid-cols-3 gap-6">
          {section.stats.map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <div
                className={`text-3xl md:text-4xl font-bold mb-1.5 tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{
                  textShadow: isDark
                    ? '0 2px 12px rgba(59,130,246,0.2)'
                    : 'none',
                }}
              >
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${isDark ? 'text-blue-300/60' : 'text-blue-600/70'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Get crop styles for this section
  const cropStyles = getCropStyles(section.crop || 'full');

  // Media card (image or video) - Apple-quality design
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden ${
        section.size === 'large' ? 'md:col-span-2' : ''
      } ${
        isDark
          ? 'bg-[#141418] border border-[#2a2a2e]'
          : 'bg-white border border-gray-200/80'
      }`}
      style={{
        boxShadow: isDark
          ? '0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)'
          : '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* Text content - tighter spacing */}
      <div className="px-6 pt-6 pb-4">
        <h3 className={`text-lg font-semibold tracking-tight mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {section.title}
        </h3>
        <p className={`text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {section.description}
        </p>
      </div>

      {/* Media container with blue shadow behind */}
      <div className="px-6 pb-6">
        {/* Blue glow behind the visual */}
        <div
          className="absolute left-6 right-6 bottom-6 rounded-xl pointer-events-none"
          style={{
            height: section.size === 'large' ? '65%' : '60%',
            background: isDark
              ? 'radial-gradient(ellipse at center bottom, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 50%, transparent 80%)'
              : 'radial-gradient(ellipse at center bottom, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 50%, transparent 80%)',
            filter: 'blur(20px)',
            transform: 'translateY(8px)',
          }}
        />

        {/* Device frame container */}
        <div
          className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
            isHovered ? 'scale-[1.015] translate-y-[-2px]' : ''
          }`}
          onClick={() => onMediaClick(section.media, section.mediaType)}
          style={{
            boxShadow: isDark
              ? `0 2px 4px rgba(0,0,0,0.3),
                 0 8px 24px rgba(0,0,0,0.4),
                 0 16px 48px rgba(59,130,246,0.12),
                 inset 0 0 0 1px rgba(255,255,255,0.06)`
              : `0 2px 4px rgba(0,0,0,0.04),
                 0 8px 24px rgba(59,130,246,0.08),
                 0 20px 60px rgba(59,130,246,0.12),
                 inset 0 0 0 1px rgba(255,255,255,0.9)`,
          }}
        >
          {/* Visible gray border on the media */}
          <div
            className={`absolute inset-0 rounded-xl pointer-events-none z-20 ${
              isDark ? 'border border-[#3a3a3e]' : 'border border-gray-300'
            }`}
          />

          {/* Inner shadow for depth */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-xl"
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 2px rgba(255,255,255,0.04), inset 0 -2px 8px rgba(0,0,0,0.3)'
                : 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -2px 8px rgba(0,0,0,0.03)',
            }}
          />

          {section.mediaType === 'video' ? (
            <div className="relative overflow-hidden" style={{ aspectRatio: section.size === 'large' ? '16/9' : '4/3' }}>
              <video
                src={section.media}
                className={`w-full h-full object-cover ${isDark ? 'bg-[#0c0c10]' : 'bg-gray-50'}`}
                style={cropStyles}
                muted
                loop
                playsInline
                autoPlay={isHovered}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
              {/* Play button overlay */}
              {!isVideoPlaying && !isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-xl transition-transform duration-300 hover:scale-105"
                    style={{
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 8px 32px rgba(59,130,246,0.2)',
                    }}
                  >
                    <Play className="w-7 h-7 ml-1 text-gray-800" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative overflow-hidden" style={{ aspectRatio: section.size === 'large' ? '16/9' : '4/3' }}>
              <img
                src={section.media}
                alt={section.title}
                className={`w-full h-full object-cover ${isDark ? 'bg-[#0c0c10]' : 'bg-gray-50'}`}
                style={cropStyles}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ToolkitShowcase: React.FC<ToolkitShowcaseProps> = ({ systemTheme, lang }) => {
  const isDark = systemTheme === 'dark';
  const content = SHOWCASE_CONTENT[lang] || SHOWCASE_CONTENT.en;

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleMediaClick = (media: string, type: 'image' | 'video') => {
    setLightboxImages([{ src: media, type, caption: '' }]);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0c]' : 'bg-[#fafbfc]'}`}>
      {/* Subtle gradient overlays for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.06) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Hero section - Apple-style minimal */}
      <div className="relative max-w-[1600px] mx-auto px-6 pt-16 pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {content.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          className={`text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {content.hero.subtitle}
        </motion.p>
      </div>

      {/* Bento grid - tighter gaps */}
      <div className="relative max-w-[1600px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.sections.map((section: any, index: number) => (
            <ShowcaseCard
              key={section.id}
              section={section}
              isDark={isDark}
              index={index}
              onMediaClick={handleMediaClick}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
      />
    </div>
  );
};

export default ToolkitShowcase;
