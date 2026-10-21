// Android Wear Case Study Page - Minimalist rewrite
// PagesJaunes Android Wear wearable design project

import React, { useState } from 'react';
import { imgDims } from '@/utils/imageDimensions'
import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';

import { GalleryItem } from '../../components/BentoGallery';
import EnhancedLightbox, { type LightboxImage } from '../../components/media/EnhancedLightbox';

import { ANDROID_WEAR_TRANSLATIONS } from '../../data/caseStudyTranslations/androidWearTranslations';
import { zoomable } from '@/utils/zoomable'

interface AndroidWearPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
}

const TRANSLATIONS = ANDROID_WEAR_TRANSLATIONS;

// Gallery items
const getGalleryItems = (lang: 'en' | 'fr'): GalleryItem[] => {
  const captions = {
    en: {
      sketches: 'Early Wireframes',
      sketchesDesc: 'Before opening Sketch, I explored dozens of layout options on paper. This rapid iteration revealed which information hierarchy worked best for a 280dp circular display.',
      ambient: 'Ambient Mode Mapping',
      ambientDesc: 'Each active screen needed a low-power equivalent. White outlines on black preserved battery life while keeping users oriented when they glanced at their wrist.',
      ambientDesign: 'Ambient Mode Design',
      ambientDesignDesc: 'Final ambient mode specifications. Monochrome outlines preserve battery while maintaining brand recognition.',
      flows: 'User Task Flows',
      flowsDesc: 'Two optimized journeys: find-and-call for urgent needs, find-and-navigate for discovery. Every tap counted on a screen this constrained.',
      flowsDetailed: 'UI and Interactions',
      flowsDetailedDesc: 'The complete interaction model showing how watch actions hand off to phone for calls and navigation. Fast hand-offs were critical for perceived speed.',
      uiModes: 'Active vs Ambient States',
      uiModesDesc: 'Brand yellow delivered instant recognition in active mode. The ambient state stripped to monochrome essentials, extending battery life by hours.',
      ui: 'Screen Inventory',
      uiDesc: 'A systematic catalog of every screen state, ensuring design consistency across the compact wearable experience.',
      components: 'Component Library',
      componentsDesc: 'Documentation covering both round and square watch variants. This became the single source of truth for our two-person team.',
      insituStore: 'Google Play Presence',
      insituStoreDesc: 'The promotional asset for Play Store listing. First impressions matter when users are browsing new wearable experiences.',
      insituDetail: 'Contextual Preview',
      insituDetailDesc: 'Showing the business detail card on an actual wrist helps stakeholders understand the real-world reading conditions we designed for.',
      storeSubmission: 'Play Store Submission',
      storeSubmissionDesc: 'Internal communication for app launch. Marketing assets and store listing materials ready for publication.',
      devSession: 'Pair Programming Sessions',
      devSessionDesc: 'Daily working sessions with developer Thibault Fighiera. Two watches connected, iterating on actual builds instead of static mockups.',
      designWork: 'Design in Progress',
      designWorkDesc: 'Keynote served as my rapid prototyping tool. Quick to iterate, easy to share, and precise enough for production handoff.',
      designDetail: 'On-Device Verification',
      designDetailDesc: 'Nothing replaces checking designs on the actual hardware. Screen reflections, viewing angles, and touch targets only reveal themselves in context.',
      prototypeVideo: 'Search Flow Demo',
      prototypeVideoDesc: 'The complete search journey captured on real hardware. From voice input to business card display.',
      navVideo: 'Navigation Handoff',
      navVideoDesc: 'Demonstrating the transition from watch to phone when the user requests directions.',
      screenLoading: 'Loading State',
      screenLoadingDesc: 'Minimalist loading indicator on brand yellow.',
      screenTime: 'Watch Face',
      screenTimeDesc: 'System time display before app launch.',
      screenAppList: 'App Launcher',
      screenAppListDesc: 'PagesJaunes icon in the Android Wear app list.',
      screenRubriques: 'Category Selection',
      screenRubriquesDesc: 'Browse by category for exploratory search.',
      screenLR01: 'Search Results',
      screenLR01Desc: 'First result in the local search list.',
      screenLR02: 'Results Navigation',
      screenLR02Desc: 'Scrolling through search results.',
      screenLR03: 'Result Details Preview',
      screenLR03Desc: 'Quick preview before full detail card.',
      screenFD: 'Business Detail Card',
      screenFDDesc: 'Complete business information at a glance.',
    },
    fr: {
      sketches: 'Wireframes sur papier',
      sketchesDesc: 'Avant d\'ouvrir Sketch, j\'ai exploré des dizaines d\'options de mise en page sur papier. Cette itération rapide a révélé quelle hiérarchie d\'information fonctionnait sur un écran circulaire de 280dp.',
      ambient: 'Cartographie du mode ambiant',
      ambientDesc: 'Chaque écran actif nécessitait un équivalent basse consommation. Des contours blancs sur fond noir préservaient la batterie tout en gardant les utilisateurs orientés.',
      ambientDesign: 'Design du mode ambiant',
      ambientDesignDesc: 'Spécifications finales du mode ambiant. Contours monochromes pour préserver la batterie tout en maintenant la reconnaissance de la marque.',
      flows: 'Parcours utilisateur',
      flowsDesc: 'Deux trajectoires optimisées\u00a0: trouver et appeler pour l\'urgence, trouver et naviguer pour la découverte. Chaque appui comptait sur un écran aussi contraint.',
      flowsDetailed: 'UI et interactions',
      flowsDetailedDesc: 'Le modèle d\'interaction complet montrant comment les actions de la montre se transmettent au téléphone pour les appels et la navigation. La rapidité de ce relais était déterminante pour la vitesse perçue.',
      uiModes: 'États actif et ambiant',
      uiModesDesc: 'Le jaune PagesJaunes assurait une reconnaissance instantanée en mode actif. L\'état ambiant se réduisait à l\'essentiel monochrome, prolongeant la batterie de plusieurs heures.',
      ui: 'Inventaire des écrans',
      uiDesc: 'Un catalogue systématique de chaque état d\'écran, pour assurer la cohérence du design à travers l\'expérience montre connectée.',
      components: 'Bibliothèque de composants',
      componentsDesc: 'Documentation couvrant les variantes de montres rondes et carrées. Cette bibliothèque est devenue la source de vérité de notre équipe de deux.',
      insituStore: 'Présence sur Google Play',
      insituStoreDesc: 'Le visuel promotionnel de la fiche Play Store. Les premières impressions comptent quand les utilisateurs découvrent de nouvelles apps pour montre connectée.',
      insituDetail: 'Aperçu en contexte',
      insituDetailDesc: 'Montrer la fiche détail sur un vrai poignet aide les décideurs à comprendre les conditions de lecture réelles pour lesquelles nous avons conçu.',
      storeSubmission: 'Soumission au Play Store',
      storeSubmissionDesc: 'Communication interne pour le lancement. Visuels marketing et supports de présentation prêts pour publication.',
      devSession: 'Sessions en binôme',
      devSessionDesc: 'Sessions de travail quotidiennes avec le développeur Thibault Fighiera. Deux montres connectées, des itérations sur des versions réelles plutôt que sur des maquettes statiques.',
      designWork: 'Design en cours',
      designWorkDesc: 'Keynote servait d\'outil de prototypage rapide. Rapide à itérer, facile à partager, et assez précis pour la transmission au développeur.',
      designDetail: 'Vérification sur appareil',
      designDetailDesc: 'Rien ne remplace la vérification des designs sur le vrai matériel. Reflets d\'écran, angles de vue et zones tactiles ne se révèlent qu\'en contexte.',
      prototypeVideo: 'Démo du parcours de recherche',
      prototypeVideoDesc: 'Le parcours de recherche complet capturé sur du vrai matériel. De la saisie vocale à l\'affichage de la fiche du commerce.',
      navVideo: 'Relais vers la navigation',
      navVideoDesc: 'Démonstration de la transition de la montre vers le téléphone quand l\'utilisateur demande un itinéraire.',
      screenLoading: 'État de chargement',
      screenLoadingDesc: 'Indicateur de chargement minimaliste sur le jaune de la marque.',
      screenTime: 'Cadran de montre',
      screenTimeDesc: 'Affichage de l\'heure système avant le lancement de l\'app.',
      screenAppList: 'Lanceur d\'apps',
      screenAppListDesc: 'Icône PagesJaunes dans la liste d\'apps Android Wear.',
      screenRubriques: 'Choix de la catégorie',
      screenRubriquesDesc: 'Navigation par catégorie pour une recherche exploratoire.',
      screenLR01: 'Résultats de recherche',
      screenLR01Desc: 'Premier résultat dans la liste de recherche locale.',
      screenLR02: 'Navigation dans les résultats',
      screenLR02Desc: 'Défilement dans les résultats de recherche.',
      screenLR03: 'Aperçu du détail d\'un résultat',
      screenLR03Desc: 'Aperçu rapide avant la fiche détail complète.',
      screenFD: 'Fiche détail du professionnel',
      screenFDDesc: 'Informations complètes du commerce en un coup d\'œil.',
    },
  };

  const t = captions[lang];

  return [
    { src: '/images/pagesjaunes/Android%20wear/early_wireframes.webp', type: 'image', caption: t.sketches, captionDesc: t.sketchesDesc },
    { src: '/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp', type: 'image', caption: t.ambient, captionDesc: t.ambientDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp', type: 'image', caption: t.ambientDesign, captionDesc: t.ambientDesignDesc },
    { src: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp', type: 'image', caption: t.flows, captionDesc: t.flowsDesc },
    { src: '/images/pagesjaunes/Android%20wear/ui_interactions.webp', type: 'image', caption: t.flowsDetailed, captionDesc: t.flowsDetailedDesc },
    { src: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp', type: 'image', caption: t.uiModes, captionDesc: t.uiModesDesc },
    { src: '/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp', type: 'image', caption: t.ui, captionDesc: t.uiDesc },
    { src: '/images/pagesjaunes/Android%20wear/component_library.webp', type: 'image', caption: t.components, captionDesc: t.componentsDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/00%20Loading.webp', type: 'image', caption: t.screenLoading, captionDesc: t.screenLoadingDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/01%20Time.webp', type: 'image', caption: t.screenTime, captionDesc: t.screenTimeDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/02%20App%20list.webp', type: 'image', caption: t.screenAppList, captionDesc: t.screenAppListDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/03%20Rubriques%20list.webp', type: 'image', caption: t.screenRubriques, captionDesc: t.screenRubriquesDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/04%20LR%2001.webp', type: 'image', caption: t.screenLR01, captionDesc: t.screenLR01Desc },
    { src: '/images/pagesjaunes/Android%20wear/screens/05%20LR%2002.webp', type: 'image', caption: t.screenLR02, captionDesc: t.screenLR02Desc },
    { src: '/images/pagesjaunes/Android%20wear/screens/06%20LR%2003.webp', type: 'image', caption: t.screenLR03, captionDesc: t.screenLR03Desc },
    { src: '/images/pagesjaunes/Android%20wear/screens/07%20FD.webp', type: 'image', caption: t.screenFD, captionDesc: t.screenFDDesc },
    { src: '/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp', type: 'image', caption: t.insituStore, captionDesc: t.insituStoreDesc },
    { src: '/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp', type: 'image', caption: t.insituDetail, captionDesc: t.insituDetailDesc },
    { src: '/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp', type: 'image', caption: t.storeSubmission, captionDesc: t.storeSubmissionDesc },
    { src: '/images/pagesjaunes/Android%20wear/dev_session_1.webp', type: 'image', caption: t.devSession, captionDesc: t.devSessionDesc },
    { src: '/images/pagesjaunes/Android%20wear/design_work_keynote.webp', type: 'image', caption: t.designWork, captionDesc: t.designWorkDesc },
    { src: '/images/pagesjaunes/Android%20wear/design_work_detail.webp', type: 'image', caption: t.designDetail, captionDesc: t.designDetailDesc },
    { src: '/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4', type: 'video', caption: t.prototypeVideo, captionDesc: t.prototypeVideoDesc },
    { src: '/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4', type: 'video', caption: t.navVideo, captionDesc: t.navVideoDesc },
  ];
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
      {...zoomable(onClick)}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} {...imgDims(item.src)} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
        {item.caption}
      </figcaption>
    </motion.figure>
  );
};


// Main Component
const HERO_SRC = '/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp';

const AndroidWearPage: React.FC<AndroidWearPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang];
  const galleryItems = getGalleryItems(lang);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Media that is not in the lightbox list opens alone, never silently ignored
  const [singleImage, setSingleImage] = useState<LightboxImage | null>(null);

  const openLightbox = (index: number) => {
    setSingleImage(null);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Gallery items first (the gallery view indexes into them), then the hero image
  const allImages: LightboxImage[] = [
    ...galleryItems.map(item => ({
      src: item.src,
      type: (item.type || 'image') as 'image' | 'video',
      caption: item.captionDesc ? `${item.caption}. ${item.captionDesc}` : item.caption,
    })),
    { src: HERO_SRC, type: 'image', caption: t.hero.title },
  ];

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img.src === src);
    if (index !== -1) {
      openLightbox(index);
      return;
    }
    const isVideo = /\.(mp4|webm|mov)$/i.test(src);
    setSingleImage({ src, type: isVideo ? 'video' : 'image', caption: '' });
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Content */}
      {viewMode !== 'gallery' ? (
        <div id="top">
          {/* Hero Section */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs text-gray-500">{t.hero.role}</span>
                <span className="text-xs text-gray-500">{t.hero.scope}</span>
                <span className="text-xs text-gray-500">{t.hero.period}</span>
              </div>

              <h1 className="text-title-1 text-gray-900 mb-4">
                {t.hero.title}
              </h1>

              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch] mb-8">
                {t.hero.subtitle}
              </p>

              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {t.hero.description}
              </p>
            </div>
          </section>

          {/* Hero Image */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[960px] mx-auto px-6">
              <figure>
                <div
                  {...zoomable(() => handleImageClick(HERO_SRC))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  style={{ backgroundColor: '#E7E7E7' }}
                >
                  <div className="flex items-center justify-center" style={{ aspectRatio: '3/2' }}>
                    <img
                      loading="eager"
                      fetchPriority="high"
                      src="/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp" {...imgDims("/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp")}
                      alt="PagesJaunes Android Wear"
                      className="h-full w-auto object-contain transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </figure>
            </div>
          </section>

          {/* Meta */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <div className="divide-y divide-gray-100">
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-500">{t.meta.typeLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.type}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-500">{t.meta.scopeLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.scope}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-500">{t.meta.periodLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.period}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-500">{t.meta.companyLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.company}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <p className="text-base text-gray-600 leading-relaxed italic max-w-[65ch] mb-4">
                {lang === 'fr' ? '\u00ab\u202f' : '\u201c'}{t.testimonial.quote}{lang === 'fr' ? '\u202f\u00bb' : '\u201d'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  TF
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/thibaultfighiera/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-900 hover:text-gray-500 transition-colors"
                  >
                    {t.testimonial.author}
                  </a>
                  <p className="text-xs text-gray-500">{t.testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section id="overview" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {t.overview.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-title-3 text-gray-900 mb-2">
                    {t.overview.contextTitle}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                    {t.overview.contextDesc}
                  </p>
                </div>
                <div>
                  <h3 className="text-title-3 text-gray-900 mb-2">
                    {t.overview.challengeTitle}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                    {t.overview.challengeDesc}
                  </p>
                </div>
                <div>
                  <h3 className="text-title-3 text-gray-900 mb-2">
                    {t.overview.roleTitle}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                    {t.overview.roleDesc}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Scenario Section */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {t.persona.title}
              </h2>

              <p className="text-base text-gray-600 leading-relaxed italic max-w-[65ch] mb-8">
                {t.persona.scenario}
              </p>

              <div>
                <h3 className="text-title-3 text-gray-900 mb-1">
                  {t.persona.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t.persona.context}
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  {t.persona.needs.map((need, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">{'\u2022'}</span>
                      <span className="leading-relaxed">{need}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Approach Section */}
          <section id="approach" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {t.approach.title}
              </h2>

              <div className="divide-y divide-gray-100">
                {t.approach.items.map((item, idx) => (
                  <div key={idx} className="py-4">
                    <h3 className="text-title-3 text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features & Deliverables */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-title-2 text-gray-900 mb-4">
                    {t.features.title}
                  </h2>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {t.features.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gray-300 mt-0.5">{'\u2022'}</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-title-2 text-gray-900 mb-4">
                    {t.deliverables.title}
                  </h2>
                  <div className="divide-y divide-gray-100">
                    {t.deliverables.items.map((item, idx) => (
                      <div key={idx} className="py-4 text-sm text-gray-600">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 1: RESEARCH & DISCOVERY */}
          {/* ================================================================== */}
          <section id="research" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 mb-8">
              <h2 className="text-title-2 text-gray-900 mb-4">
                Exploration
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Immersion dans les guidelines Android Wear, \u00e9tude des contraintes mat\u00e9rielles, d\u00e9finition des parcours utilisateur et exploration de dizaines de concepts sur papier.'
                  : 'Deep dive into Android Wear guidelines, studying hardware constraints, defining user journeys, and exploring dozens of concepts on paper.'}
              </p>
            </div>

            {/* Full width - Early Sketches */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/early_wireframes.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/early_wireframes.webp" {...imgDims("/images/pagesjaunes/Android%20wear/early_wireframes.webp")}
                    alt={t.process.sketches}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {t.process.sketches}. {t.process.sketchesDesc}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - User Flows & Platform Study */}
            <div className="max-w-[960px] mx-auto px-6">
              <div className="space-y-8 mb-12">
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp'))}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp" {...imgDims("/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp")}
                      alt={t.process.flows}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {t.process.flows}. {t.process.flowsDesc}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp'))}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp" {...imgDims("/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp")}
                      alt={t.process.ambient}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {t.process.ambient}. {t.process.ambientDesc}
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 2: SCREEN DESIGN */}
          {/* ================================================================== */}
          <section id="design" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 mb-8">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {lang === 'fr' ? 'Design d\'interface' : 'Screen Design'}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Cr\u00e9ation de l\'UI compl\u00e8te pour \u00e9crans circulaires et carr\u00e9s. Chaque \u00e9cran devait communiquer son propos en moins de 2 secondes sur un \u00e9cran de 280dp.'
                  : 'Creating the complete UI for circular and square displays. Each screen needed to communicate its purpose in under 2 seconds on a 280dp display.'}
              </p>
            </div>

            {/* Full width - UI Interactions */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/ui_interactions.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/ui_interactions.webp" {...imgDims("/images/pagesjaunes/Android%20wear/ui_interactions.webp")}
                    alt={lang === 'fr' ? 'UI et interactions' : 'UI and Interactions'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {lang === 'fr' ? 'UI et interactions' : 'UI and Interactions'}. {lang === 'fr' ? 'Le mod\u00e8le d\'interaction complet montrant comment les actions montre se transmettent au t\u00e9l\u00e9phone pour les appels et la navigation.' : 'The complete interaction model showing how watch actions hand off to phone for calls and navigation.'}
                </figcaption>
              </figure>
            </div>

            {/* Screen Inventory - Grid */}
            <div className="max-w-[960px] mx-auto px-6 mb-4">
              <p className="text-sm text-gray-600 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Le syst\u00e8me compte 8 \u00e9tats distincts. Chaque \u00e9cran devait communiquer son propos en autonomie compl\u00e8te, lisible d\'un coup d\'\u0153il sur 280dp circulaire.'
                  : 'The system spans 8 distinct states. Each screen communicates its purpose independently, readable at a glance on a 280dp circular display.'}
              </p>
            </div>
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <div className="rounded-2xl bg-[#111113] px-8 pt-8 pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
                  {[
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/01%20Time.webp',
                      captionFr: 'Cadran montre. Point d\'entr\u00e9e et retour rapide.',
                      captionEn: 'Watch face. Entry point and quick return.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/00%20Loading.webp',
                      captionFr: 'Chargement. Feedback imm\u00e9diat au lancement.',
                      captionEn: 'Loading. Immediate feedback on launch.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/02%20App%20list.webp',
                      captionFr: 'Apps. Navigation contextuelle par cat\u00e9gorie.',
                      captionEn: 'App list. Category-first navigation.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/03%20Rubriques%20list.webp',
                      captionFr: 'Rubriques PagesJaunes sur le poignet.',
                      captionEn: 'PagesJaunes categories on the wrist.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/04%20LR%2001.webp',
                      captionFr: 'R\u00e9sultat 1/3. Nom et distance en priorit\u00e9.',
                      captionEn: 'Result 1/3. Name and distance first.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/05%20LR%2002.webp',
                      captionFr: 'R\u00e9sultat 2/3. Swipe pour parcourir.',
                      captionEn: 'Result 2/3. Swipe to browse.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/06%20LR%2003.webp',
                      captionFr: 'R\u00e9sultat 3/3. Fin de liste.',
                      captionEn: 'Result 3/3. End of list.',
                    },
                    {
                      src: '/images/pagesjaunes/Android%20wear/screens/07%20FD.webp',
                      captionFr: 'Fiche d\u00e9tail. Appel ou itin\u00e9raire en un tap.',
                      captionEn: 'Detail card. Call or directions in one tap.',
                    },
                  ].map((screen, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      <div
                        {...zoomable(() => handleImageClick(screen.src))}
                        className="w-full max-w-[140px] mx-auto cursor-zoom-in group transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.05] active:scale-[0.97]"
                      >
                        <img
                          loading="lazy"
                          src={screen.src} {...imgDims(screen.src)}
                          alt={lang === 'fr' ? screen.captionFr.split('.')[0] : screen.captionEn.split('.')[0]}
                          className="w-full h-auto block"
                        />
                      </div>
                      <p className="text-xs text-gray-400 text-center leading-relaxed">
                        {lang === 'fr' ? screen.captionFr : screen.captionEn}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-gray-400 text-center">
                  {lang === 'fr' ? 'Inventaire des \u00e9crans. 8 \u00e9tats, du chargement \u00e0 la fiche d\u00e9tail.' : 'Screen inventory. 8 states, from loading to detail card.'}
                </p>
              </div>
            </div>

            {/* In-situ ambient: app en situation */}
            <div className="max-w-[740px] mx-auto px-6 mb-4">
              <p className="text-sm text-gray-600 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Visualiser les \u00e9crans sur un vrai poignet r\u00e9v\u00e8le les conditions r\u00e9elles\u00a0: lisibilit\u00e9 en plein soleil, angles de lecture, confort de l\'appui.'
                  : 'Visualizing screens on an actual wrist reveals real-world conditions: readability in sunlight, viewing angles, tap comfort.'}
              </p>
            </div>
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp'))}
                  className="rounded-2xl overflow-hidden cursor-zoom-in group bg-[#E7E7E7] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] shadow-sm hover:shadow-lg"
                >
                  <div className="w-full flex items-center justify-center py-10 px-12">
                    <div className="-rotate-[4deg]">
                      <img
                        loading="lazy"
                        src="/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp" {...imgDims("/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp")}
                        alt={lang === 'fr' ? 'Fiche d\u00e9tail sur le poignet' : 'Detail card on the wrist'}
                        className="max-w-full max-h-[480px] object-contain transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {lang === 'fr' ? 'App en situation.' : 'App in context.'} {lang === 'fr' ? 'La fiche d\u00e9tail sur un vrai poignet. Le design circulaire tire parti du cadre de la montre.' : 'The detail card on an actual wrist. The circular design makes use of the watch frame.'}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - UI Modes & Screen Overview */}
            <div className="max-w-[960px] mx-auto px-6">
              <div className="space-y-8">
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp'))}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp" {...imgDims("/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp")}
                      alt={t.process.uiModes}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {t.process.uiModes}. {t.process.uiModesDesc}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp'))}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp" {...imgDims("/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp")}
                      alt={lang === 'fr' ? 'Vue d\'ensemble UI' : 'UI Overview'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {lang === 'fr' ? 'Vue d\'ensemble UI' : 'UI Overview'}. {lang === 'fr' ? 'Catalogue des \u00e9tats d\'\u00e9cran assurant la coh\u00e9rence \u00e0 travers l\'exp\u00e9rience montre connect\u00e9e.' : 'Systematic catalog of screen states ensuring design consistency across the wearable experience.'}
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 3: SPECIFICATIONS */}
          {/* ================================================================== */}
          <section id="specs" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 mb-8">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {lang === 'fr' ? 'Sp\u00e9cifications et recommandations' : 'Specifications & Guidelines'}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Documentation des modes actif et ambiant, biblioth\u00e8que de composants pour les variantes rondes et carr\u00e9es, et sp\u00e9cifications d\'interaction pour la transmission au d\u00e9veloppeur.'
                  : 'Documentation of active and ambient modes, component library for round and square variants, and interaction specs for developer handoff.'}
              </p>
            </div>

            {/* Full width - Component Library */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/component_library.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/component_library.webp" {...imgDims("/images/pagesjaunes/Android%20wear/component_library.webp")}
                    alt={t.process.components}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {t.process.components}. {t.process.componentsDesc}
                </figcaption>
              </figure>
            </div>

            {/* Full width - Ambient Mode Final Design */}
            <div className="max-w-[960px] mx-auto px-6">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp" {...imgDims("/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp")}
                    alt={lang === 'fr' ? 'Design du mode ambiant' : 'Ambient Mode Design'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {lang === 'fr' ? 'Sp\u00e9cifications du mode ambiant' : 'Ambient Mode Specifications'}. {lang === 'fr' ? 'Contours blancs sur fond noir pour \u00e9conomiser la batterie. Chaque \u00e9cran actif a son \u00e9quivalent basse consommation, gardant les utilisateurs orient\u00e9s.' : 'White outlines on black background to preserve battery. Each active screen has its low-power equivalent, keeping users oriented.'}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 4: IMPLEMENTATION & LAUNCH */}
          {/* ================================================================== */}
          <section id="implementation" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 mb-8">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {lang === 'fr' ? 'Impl\u00e9mentation et lancement' : 'Implementation & Launch'}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Sessions quotidiennes en bin\u00f4me avec le d\u00e9veloppeur, it\u00e9rations sur des builds r\u00e9els, prototypes vid\u00e9o, et pr\u00e9paration des assets pour la soumission Google Play.'
                  : 'Daily pair sessions with the developer, iterating on real builds, video prototypes, and preparing assets for Google Play submission.'}
              </p>
            </div>

            {/* Full width - Dev Session */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/dev_session_1.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/dev_session_1.webp" {...imgDims("/images/pagesjaunes/Android%20wear/dev_session_1.webp")}
                    alt={t.implementation.devSession}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {t.implementation.devSession}. {t.implementation.devSessionDesc}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - Design Work Photos */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <div className="space-y-8">
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/design_work_keynote.webp'))}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/design_work_keynote.webp" {...imgDims("/images/pagesjaunes/Android%20wear/design_work_keynote.webp")}
                      alt={lang === 'fr' ? 'Session de design' : 'Design Session'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {lang === 'fr' ? 'Prototypage dans Keynote' : 'Keynote Prototyping'}. {lang === 'fr' ? 'Keynote servait d\'outil de prototypage rapide. Rapide \u00e0 it\u00e9rer, facile \u00e0 partager, assez pr\u00e9cis pour la transmission au d\u00e9veloppeur.' : 'Keynote served as my rapid prototyping tool. Quick to iterate, easy to share, precise enough for handoff.'}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/design_work_detail.webp'))}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/design_work_detail.webp" {...imgDims("/images/pagesjaunes/Android%20wear/design_work_detail.webp")}
                      alt={lang === 'fr' ? 'V\u00e9rification sur appareil' : 'Device Verification'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {lang === 'fr' ? 'V\u00e9rification sur Appareil' : 'On-Device Verification'}. {lang === 'fr' ? 'Rien ne remplace le test sur le vrai mat\u00e9riel. Reflets, angles de vue et zones tactiles ne se r\u00e9v\u00e8lent qu\'en contexte.' : 'Nothing replaces testing on real hardware. Reflections, viewing angles and touch targets only reveal themselves in context.'}
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Video Prototypes - Stacked */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <div className="space-y-8">
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4'))}
                    className="relative rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <VideoPlayer
                      src="/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4"
                      className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {t.implementation.prototype}. {t.implementation.prototypeDesc}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4'))}
                    className="relative rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <VideoPlayer
                      src="/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4"
                      className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                    {lang === 'fr' ? 'D\u00e9mo de la navigation' : 'Navigation Demo'}. {lang === 'fr' ? 'Transition de la montre vers le t\u00e9l\u00e9phone quand l\'utilisateur demande un itin\u00e9raire.' : 'Transition from watch to phone when the user requests directions.'}
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Full width - Google Play Store Submission */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp" {...imgDims("/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp")}
                    alt={lang === 'fr' ? 'Soumission au Play Store' : 'Play Store Submission'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {lang === 'fr' ? 'Communication de lancement' : 'Launch Communication'}. {lang === 'fr' ? 'Communication interne pour le lancement. Visuels marketing pr\u00eats pour publication.' : 'Internal communication for app launch. Marketing assets and store listing materials ready for publication.'}
                </figcaption>
              </figure>
            </div>

            {/* Final Mockup - Play Store */}
            <div className="max-w-[960px] mx-auto px-6">
              <figure>
                <div
                  {...zoomable(() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp'))}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp" {...imgDims("/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp")}
                    alt={lang === 'fr' ? 'Pr\u00e9sence sur Google Play' : 'Google Play Presence'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {lang === 'fr' ? 'Visuel Play Store' : 'Play Store Visual'}. {lang === 'fr' ? 'Le visuel promotionnel pour le listing Google Play. Les premi\u00e8res impressions comptent.' : 'The promotional visual for Google Play listing. First impressions matter.'}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Results Section */}
          <section id="results" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-title-2 text-gray-900 mb-8">
                {t.result.title}
              </h2>

              <div className="divide-y divide-gray-100">
                {t.result.items.map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between py-4">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-base font-semibold text-gray-900 tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Learnings Section */}
          <section id="learnings" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-title-2 text-gray-900 mb-4">
                {t.learnings.title}
              </h2>

              <div className="divide-y divide-gray-100">
                {t.learnings.items.map((item, idx) => (
                  <div key={idx} className="py-4">
                    <h3 className="text-title-3 text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed max-w-[65ch]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Gallery View */
        <div className="max-w-[960px] mx-auto px-6 py-12">
          <h1 className="sr-only">{t.hero.title} ({t.gallery})</h1>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {galleryItems.map((item, index) => (
              <GalleryCard
                key={item.src}
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={singleImage ? [singleImage] : allImages}
        currentIndex={singleImage ? 0 : lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        projectId="androidwear"
      />
    </div>
  );
};

export default AndroidWearPage;
