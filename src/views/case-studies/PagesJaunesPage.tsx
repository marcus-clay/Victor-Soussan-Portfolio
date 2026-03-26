// PagesJaunes Case Study Page - Wrapper for PagesJaunesExecutive component
// Displays the PagesJaunes project case study with portfolio styling

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import PagesJaunesExecutive from '../../components/case-studies/PagesJaunesExecutive';
import PagesJaunesFull from '../../components/case-studies/PagesJaunesFull';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { TOC_SECTIONS as PJ_TOC_SECTIONS, PAGESJAUNES_CAPTIONS } from '../../data/caseStudyTranslations/pagesJaunesTranslations';

const TOC_SECTIONS = PJ_TOC_SECTIONS;

interface PagesJaunesPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

// Gallery items for PagesJaunes
const getPagesJaunesGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] => {
  const captions = PAGESJAUNES_CAPTIONS;

  const t = captions[lang];

  return [
    // Homepage
    {
      src: '/images/pagesjaunes/pagesjaunes homepage.webp',
      type: 'image',
      caption: t.homepage,
      captionDesc: t.homepageDesc
    },
    {
      src: '/images/pagesjaunes/pagesjaunes homepage - variations.webp',
      type: 'image',
      caption: t.homepageVariations,
      captionDesc: t.homepageVariationsDesc
    },
    {
      src: '/images/pagesjaunes/pj 01@2x.webp',
      type: 'image',
      caption: t.androidHomepage,
      captionDesc: t.androidHomepageDesc
    },
    {
      src: '/images/pagesjaunes/pagesjaunes hp ipad.webp',
      type: 'image',
      caption: t.ipadHomepage,
      captionDesc: t.ipadHomepageDesc
    },
    {
      src: '/images/pagesjaunes/pagesjaunes hp ipad variations.webp',
      type: 'image',
      caption: t.ipadVariations,
      captionDesc: t.ipadVariationsDesc
    },
    // Art Direction
    {
      src: '/images/pagesjaunes/pj 02@2x.webp',
      type: 'image',
      caption: t.artDirectionBefore,
      captionDesc: t.artDirectionBeforeDesc
    },
    {
      src: '/images/pagesjaunes/pj 03@2x.webp',
      type: 'image',
      caption: t.artDirectionAfter,
      captionDesc: t.artDirectionAfterDesc
    },
    // Search & Account
    {
      src: '/images/pagesjaunes/pj 04@2x.webp',
      type: 'image',
      caption: t.searchFlow,
      captionDesc: t.searchFlowDesc
    },
    {
      src: '/images/pagesjaunes/2020_NES_moteur_Android_img.mp4',
      type: 'video',
      caption: t.searchPrototype,
      captionDesc: t.searchPrototypeDesc
    },
    {
      src: '/images/pagesjaunes/pj 05@2x.webp',
      type: 'image',
      caption: t.accountFlow,
      captionDesc: t.accountFlowDesc
    },
    {
      src: '/images/pagesjaunes/pj 06@2x.webp',
      type: 'image',
      caption: t.engagement,
      captionDesc: t.engagementDesc
    },
    // Maps & Navigation
    {
      src: '/images/pagesjaunes/pj 07@2x.webp',
      type: 'image',
      caption: t.mapsSystem,
      captionDesc: t.mapsSystemDesc
    },
    {
      src: '/images/pagesjaunes/pj 08@2x.webp',
      type: 'image',
      caption: t.mapsMultidevice,
      captionDesc: t.mapsMultideviceDesc
    },
    {
      src: '/images/pagesjaunes/pagejaunes itineraire iphone.webp',
      type: 'image',
      caption: t.iphoneItinerary,
      captionDesc: t.iphoneItineraryDesc
    },
    {
      src: '/images/pagesjaunes/pagejaunes itineraire ipad.webp',
      type: 'image',
      caption: t.ipadItinerary,
      captionDesc: t.ipadItineraryDesc
    },
    // Tooltip Redesign
    {
      src: '/images/pagesjaunes/pagejaunes tooltip redesign.webp',
      type: 'image',
      caption: t.tooltipRedesign,
      captionDesc: t.tooltipRedesignDesc
    },
    // Android Wear
    {
      src: '/images/pagesjaunes/Android wear/pj android wear flows.webp',
      type: 'image',
      caption: t.wearFlows,
      captionDesc: t.wearFlowsDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/pj android wear ui modes.webp',
      type: 'image',
      caption: t.wearUiModes,
      captionDesc: t.wearUiModesDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/pj android wear ui.webp',
      type: 'image',
      caption: t.wearUi,
      captionDesc: t.wearUiDesc
    },
    {
      src: '/images/pagesjaunes/pj 09@2x.webp',
      type: 'image',
      caption: t.wearFlowsDetailed,
      captionDesc: t.wearFlowsDetailedDesc
    },
    {
      src: '/images/pagesjaunes/pj 10@2x.webp',
      type: 'image',
      caption: t.wearComponents,
      captionDesc: t.wearComponentsDesc
    },
    {
      src: '/images/pagesjaunes/pj 11@2x.webp',
      type: 'image',
      caption: t.wearAmbient,
      captionDesc: t.wearAmbientDesc
    },
    // Android Wear Additional Assets
    {
      src: '/images/pagesjaunes/Android wear/IMG_20151016_105901.webp',
      type: 'image',
      caption: t.wearSketches,
      captionDesc: t.wearSketchesDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/Android Wear - ambient mode sketches.webp',
      type: 'image',
      caption: t.wearAmbient,
      captionDesc: t.wearAmbientDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/Android Wear UI and Interactions.webp',
      type: 'image',
      caption: t.wearFlowsDetailed,
      captionDesc: t.wearFlowsDetailedDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/android_wear_design_02.webp',
      type: 'image',
      caption: t.wearComponents,
      captionDesc: t.wearComponentsDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/android_wear_insitu_store_01.webp',
      type: 'image',
      caption: t.wearInsituStore,
      captionDesc: t.wearInsituStoreDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/maquette_insitu_FD_03 (1).webp',
      type: 'image',
      caption: t.wearInsituDetail,
      captionDesc: t.wearInsituDetailDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/IMG_20151214_183749.webp',
      type: 'image',
      caption: t.wearDevSession,
      captionDesc: t.wearDevSessionDesc
    },
    {
      src: '/images/pagesjaunes/Android wear/VID_20151202_184124.mp4',
      type: 'video',
      caption: t.wearPrototypeVideo,
      captionDesc: t.wearPrototypeVideoDesc
    },
    // Desktop Review
    {
      src: '/images/pagesjaunes/24_06_2015_avis_edition.webp',
      type: 'image',
      caption: t.desktopReview,
      captionDesc: t.desktopReviewDesc
    },
    // Onboarding Videos
    {
      src: '/images/pj-ios-app-onboarding-animation.mp4',
      type: 'video',
      caption: t.iosOnboarding,
      captionDesc: t.iosOnboardingDesc
    },
    {
      src: '/images/pj-and-app-onboarding-animation.mp4',
      type: 'video',
      caption: t.androidOnboarding,
      captionDesc: t.androidOnboardingDesc
    }
  ];
};

// All images for lightbox - includes gallery items + additional images from case studies
const getAllImages = (lang: 'en' | 'fr') => {
  const items = getPagesJaunesGalleryItems(lang);
  const galleryImages = items.map(item => ({
    src: item.src,
    type: item.type || 'image',
    caption: `${item.caption} - ${item.captionDesc || ''}`
  }));

  // Additional images used in Full case study and Executive that aren't in gallery
  const additionalImages: { src: string; type: 'image' | 'video'; caption: string }[] = [
    { src: '/images/thumbnail_pagesjaunes_sp_tablette.webp', type: 'image', caption: 'PagesJaunes Mobile Apps' },
    { src: '/images/thumbnail-pagesjaunes-multidevices.webp', type: 'image', caption: 'PagesJaunes Multi-devices' },
    // Itinerary images with special characters - need both encoded and regular versions
    { src: '/images/pagesjaunes/pj_ipad_itinéraire_piéton.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire piéton iPad' : 'iPad Pedestrian Route' },
    { src: '/images/pagesjaunes/pj_ipad_itinéraire_transports.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire transports iPad' : 'iPad Transit Route' },
    { src: '/images/pagesjaunes/pj_ipad_itinéraire_voiture.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire voiture iPad' : 'iPad Driving Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_piéton.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire piéton iPhone' : 'iPhone Pedestrian Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_transports.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire transports iPhone' : 'iPhone Transit Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_voiture.webp', type: 'image', caption: lang === 'fr' ? 'Itinéraire voiture iPhone' : 'iPhone Driving Route' },
    { src: '/images/pagesjaunes/pj_iphone_itinéraire_piéton_ficheroute.webp', type: 'image', caption: lang === 'fr' ? 'Fiche route piéton iPhone' : 'iPhone Pedestrian Route Sheet' },
    { src: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp', type: 'image', caption: lang === 'fr' ? 'Stratégie Design System Yellowstrap' : 'Yellowstrap Design System Strategy' },
  ];

  // Combine and deduplicate by src
  const allImages = [...galleryImages];
  additionalImages.forEach(img => {
    if (!allImages.some(existing => existing.src === img.src)) {
      allImages.push(img);
    }
  });

  return allImages;
};

// Gallery Card Component
interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  const isVideo = item.type === 'video' || item.src.match(/\.(mp4|webm|mov)$/i);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-[border-color,box-shadow,transform] duration-300 ease-out hover:scale-[1.01]">
        {isVideo ? (
          <video src={item.src} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" muted playsInline autoPlay loop preload="metadata" />
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-sm text-gray-500">
        <strong className="text-gray-700">{item.caption}</strong>
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

export const PagesJaunesPage: React.FC<PagesJaunesPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
  onNavigateToProject,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['pagesjaunes'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('pagesjaunes', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const galleryItems = getPagesJaunesGalleryItems(lang);
  const allImages = getAllImages(lang);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  // Sync caseStudyMode with external viewMode
  const initialCaseStudyMode = viewMode === 'executive' ? 'executive' : (viewMode === 'caseStudy' ? 'full' : 'executive');
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(initialCaseStudyMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);
  const sections = TOC_SECTIONS[lang];
  const isDark = systemTheme === 'dark';

  // Sync caseStudyMode when viewMode changes from outside
  useEffect(() => {
    if (viewMode === 'executive') {
      setCaseStudyMode('executive');
    } else if (viewMode === 'caseStudy') {
      setCaseStudyMode('full');
    }
  }, [viewMode]);

  // Scroll to top when mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [caseStudyMode, viewMode]);

  // Track scroll position and update active section (only in full mode)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Show nav after scrolling past hero (300px)
      setShowNav(scrollTop > 300);

      // If at the very top, set 'top' as active
      if (scrollTop < 100) {
        setActiveSection('top');
        return;
      }

      // Find active section (skip 'top' which has no DOM element)
      const sectionElements = sections
        .filter(s => s.id !== 'top')
        .map(s => ({
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section with proper offset
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open lightbox with specific image
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Image not in list - fallback to first image
      setLightboxIndex(0);
      setVideoStartTime(startTime);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div ref={containerRef} className={`min-h-screen ${viewMode === 'gallery' ? 'bg-white' : (systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white')}`}>
      {/* TOC Sidebar - Persistent left navigation for full mode */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showNav && viewMode !== 'gallery' && caseStudyMode === 'full'}
        lang={lang}
      />

      {/* Main content */}
      <div>
        <AnimatePresence mode="wait">
          {viewMode === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-full bg-white"
            >
              <div className="max-w-[1600px] mx-auto px-6 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {lang === 'fr' ? 'Galerie du projet' : 'Project Gallery'}
                </h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8">
                  {galleryItems.map((item, idx) => (
                    <GalleryCard
                      key={item.src}
                      item={item}
                      index={idx}
                      onClick={() => openLightbox(item.src)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : caseStudyMode === 'executive' ? (
            <motion.div
              key="executive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PagesJaunesExecutive
                systemTheme={systemTheme}
                lang={lang}
                onImageClick={(src) => openLightbox(src)}
                onViewFull={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                onContact={onContact}
              />
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PagesJaunesFull
                systemTheme={systemTheme}
                lang={lang}
                onImageClick={(src) => openLightbox(src)}
                onContact={onContact}
                onNavigateToProject={onNavigateToProject}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => ({
          src: img.src,
          caption: img.caption,
          type: img.type as 'image' | 'video'
        }))}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="pagesjaunes"
      />
    </div>
  );
};

export default PagesJaunesPage;
