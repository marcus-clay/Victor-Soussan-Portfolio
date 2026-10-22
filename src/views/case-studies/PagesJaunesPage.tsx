// PagesJaunes Case Study Page - wrapper around PagesJaunesFull (case study) and the media gallery

import React, { useState } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../components/BentoGallery';
import EnhancedLightbox, { type LightboxImage } from '../../components/media/EnhancedLightbox';
import PagesJaunesFull from '../../components/case-studies/PagesJaunesFull';
import VideoPlayer from '@/components/VideoPlayer';
import { zoomable } from '@/utils/zoomable';

import { PAGESJAUNES_CAPTIONS } from '../../data/caseStudyTranslations/pagesJaunesTranslations';
import { useScrollTopOnChange } from '@/hooks/useScrollTopOnChange';

interface PagesJaunesPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

// Gallery items for PagesJaunes
const getPagesJaunesGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] => {
  const captions = PAGESJAUNES_CAPTIONS;

  const t = captions[lang];
  const fr = lang === 'fr';

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
    },
    // Micro-interactions and Android Wear visuals, shown in the gallery only (the case study keeps one visual per decision)
    {
      src: '/images/pagesjaunes/micro-interactions/NES_Anim_Nav_Drawer.gif',
      type: 'image',
      caption: fr ? 'Tiroir de navigation Material Design' : 'Material Design navigation drawer',
      captionDesc: fr ? 'Motif Android familier, aux couleurs de PagesJaunes.' : 'Familiar Android pattern in PagesJaunes colors.'
    },
    {
      src: '/images/pagesjaunes/micro-interactions/anim_favoris.mp4',
      type: 'video',
      caption: fr ? 'Animation des favoris' : 'Favorites animation',
      captionDesc: fr ? 'Le rebond du cœur confirme immédiatement l’action.' : 'The heart bounce confirms the action at once.'
    },
    {
      src: '/images/pagesjaunes/micro-interactions/Anim_remarketing_historique.mp4',
      type: 'video',
      caption: fr ? 'Historique et invitation à ajouter une photo' : 'History and photo upload prompt',
      captionDesc: fr ? 'Inviter l’utilisateur à partager son expérience après une visite.' : 'Inviting users to share their experience after a visit.'
    },
    {
      src: '/images/pagesjaunes/Android wear/android_wear_thumbnail.webp',
      type: 'image',
      caption: fr ? 'PagesJaunes Android Wear' : 'PagesJaunes Android Wear',
      captionDesc: fr ? 'Recherche locale lisible d’un coup d’œil sur un cadran de montre.' : 'Glanceable local search on a watch face.'
    },
    {
      src: '/images/pagesjaunes/Android wear/screens/09 Y Aller BTN.webp',
      type: 'image',
      caption: fr ? 'L’action de navigation « Y aller »' : 'The "Y Aller" navigation action',
      captionDesc: fr ? 'Un appui ouvre Google Maps.' : 'One tap opens Google Maps.'
    }
  ];
};

// All images for lightbox - includes gallery items + additional images from case studies
const getAllImages = (lang: 'en' | 'fr'): LightboxImage[] => {
  const items = getPagesJaunesGalleryItems(lang);
  const galleryImages: LightboxImage[] = items.map(item => ({
    src: item.src,
    type: (item.type || 'image') as 'image' | 'video',
    caption: item.captionDesc ? `${item.caption}. ${item.captionDesc}` : item.caption,
  }));

  // Additional media used in the Full case study that are not in the gallery
  const fr = lang === 'fr';
  const additionalImages: LightboxImage[] = [
    { src: '/images/thumbnail_pagesjaunes_sp_tablette.webp', type: 'image', caption: fr ? 'Applications PagesJaunes sur iOS, Android et tablette' : 'PagesJaunes apps on iOS, Android and tablet' },
    { src: '/images/thumbnail-pagesjaunes-multidevices.webp', type: 'image', caption: fr ? 'PagesJaunes sur plusieurs appareils' : 'PagesJaunes across devices' },
    { src: '/images/pagesjaunes/pj_ipad_itineraire_pieton.webp', type: 'image', caption: fr ? 'Itinéraire piéton sur iPad' : 'iPad pedestrian route' },
    { src: '/images/pagesjaunes/pj_ipad_itineraire_transports.webp', type: 'image', caption: fr ? 'Itinéraire en transports sur iPad' : 'iPad transit route' },
    { src: '/images/pagesjaunes/pj_ipad_itineraire_voiture.webp', type: 'image', caption: fr ? 'Itinéraire en voiture sur iPad' : 'iPad driving route' },
    { src: '/images/pagesjaunes/pj_iphone_itineraire_pieton.webp', type: 'image', caption: fr ? 'Itinéraire piéton sur iPhone' : 'iPhone pedestrian route' },
    { src: '/images/pagesjaunes/pj_iphone_itineraire_transports.webp', type: 'image', caption: fr ? 'Itinéraire en transports sur iPhone' : 'iPhone transit route' },
    { src: '/images/pagesjaunes/pj_iphone_itineraire_voiture.webp', type: 'image', caption: fr ? 'Itinéraire en voiture sur iPhone' : 'iPhone driving route' },
    { src: '/images/pagesjaunes/pj_iphone_itineraire_pieton_ficheroute.webp', type: 'image', caption: fr ? 'Feuille de route piéton sur iPhone' : 'iPhone pedestrian route sheet' },
    { src: '/images/pagesjaunes/Android wear/screens/cover_yellow strap apps.webp', type: 'image', caption: fr ? 'Stratégie du design system Yellowstrap' : 'Yellowstrap design system strategy' },
    { src: '/images/pagesjaunes/Android wear/android_wear_thumbnail.webp', type: 'image', caption: fr ? 'Application PagesJaunes Android Wear sur un cadran de montre' : 'PagesJaunes Android Wear app on a watch face' },
    { src: '/images/pagesjaunes/Android wear/screens/09 Y Aller BTN.webp', type: 'image', caption: fr ? 'Bouton « Y aller » de la montre' : '"Y Aller" button on the watch' },
    { src: '/images/pagesjaunes/micro-interactions/NES_Anim_Nav_Drawer.gif', type: 'image', caption: fr ? 'Animation du tiroir de navigation Material Design' : 'Material Design navigation drawer animation' },
    { src: '/images/pagesjaunes/micro-interactions/anim_favoris.mp4', type: 'video', caption: fr ? 'Animation du bouton Favoris' : 'Favorites button animation' },
    { src: '/images/pagesjaunes/micro-interactions/Anim_remarketing_historique.mp4', type: 'video', caption: fr ? 'Écran Historique avec invitation à ajouter une photo' : 'History screen with photo upload prompt' },
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-6"
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] [@media(hover:hover)]:hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {item.caption}
        {item.captionDesc && <span className="hidden sm:inline"> · {item.captionDesc}</span>}
      </figcaption>
    </motion.figure>
  );
};

export const PagesJaunesPage: React.FC<PagesJaunesPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const galleryItems = getPagesJaunesGalleryItems(lang);
  const allImages = getAllImages(lang);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);
  // Media that is not in the lightbox list opens alone, never on the wrong image
  const [singleImage, setSingleImage] = useState<LightboxImage | null>(null);

  // Scroll to top when mode changes
  useScrollTopOnChange(viewMode);

  // Open lightbox with specific image
  const openLightbox = (imageSrc: string, startTime: number = 0) => {
    const index = allImages.findIndex(img => img.src === imageSrc);
    if (index !== -1) {
      setSingleImage(null);
      setLightboxIndex(index);
    } else {
      const isVideo = /\.(mp4|webm|mov)$/i.test(imageSrc);
      setSingleImage({ src: imageSrc, type: isVideo ? 'video' : 'image', caption: '' });
      setLightboxIndex(0);
    }
    setVideoStartTime(startTime);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
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
              className="min-h-full bg-[#FDFDFC]"
            >
              <div className="act-wide py-8 md:py-12">
                <h1 className="sr-only">
                  {lang === 'fr' ? 'PagesJaunes : galerie du projet' : 'PagesJaunes: project gallery'}
                </h1>
                <h2 className="text-title-2 text-gray-900 mb-10">
                  {lang === 'fr' ? 'Galerie du projet' : 'Project gallery'}
                </h2>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
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
          ) : (
            <div key="full">
              <PagesJaunesFull
                lang={lang}
                onImageClick={(src) => openLightbox(src)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={singleImage ? [singleImage] : allImages}
        currentIndex={singleImage ? 0 : lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        videoStartTime={videoStartTime}
        projectId="pagesjaunes"
      />
    </div>
  );
};

export default PagesJaunesPage;
