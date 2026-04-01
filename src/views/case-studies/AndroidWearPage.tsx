// Android Wear Case Study Page - Minimalist rewrite
// PagesJaunes Android Wear wearable design project

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowRight,
} from '@phosphor-icons/react';
import VideoPlayer from '@/components/VideoPlayer';

import { GalleryItem } from '../../components/BentoGallery';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';

import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags, injectJsonLd } from '../../utils/seo';
import { ANDROID_WEAR_TRANSLATIONS } from '../../data/caseStudyTranslations/androidWearTranslations';

interface AndroidWearPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery';
  onViewModeChange: (mode: 'caseStudy' | 'gallery') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
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
      flowsDetailedDesc: 'The complete interaction model showing how watch actions hand off to phone for calls and navigation. Seamless transitions were critical for perceived speed.',
      uiModes: 'Active vs Ambient States',
      uiModesDesc: 'Brand yellow delivered instant recognition in active mode. The ambient state stripped to monochrome essentials, extending battery life by hours.',
      ui: 'Screen Inventory',
      uiDesc: 'A systematic catalog of every screen state, ensuring design consistency across the compact wearable experience.',
      components: 'Component Library',
      componentsDesc: 'Full documentation covering both round and square watch variants. This became the single source of truth for our two-person team.',
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
      navVideoDesc: 'Demonstrating the seamless transition from watch to phone when the user requests directions.',
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
      sketches: 'Wireframes Papier',
      sketchesDesc: 'Avant d\'ouvrir Sketch, j\'ai explor\u00e9 des dizaines d\'options de layout sur papier. Cette it\u00e9ration rapide a r\u00e9v\u00e9l\u00e9 quelle hi\u00e9rarchie d\'information fonctionnait sur un \u00e9cran circulaire de 280dp.',
      ambient: 'Mapping Mode Ambiant',
      ambientDesc: 'Chaque \u00e9cran actif n\u00e9cessitait un \u00e9quivalent basse consommation. Des contours blancs sur fond noir pr\u00e9servaient la batterie tout en gardant les utilisateurs orient\u00e9s.',
      ambientDesign: 'Design Mode Ambiant',
      ambientDesignDesc: 'Sp\u00e9cifications finales du mode ambiant. Contours monochromes pour pr\u00e9server la batterie tout en maintenant la reconnaissance de marque.',
      flows: 'Parcours Utilisateur',
      flowsDesc: 'Deux trajectoires optimis\u00e9es : trouver-et-appeler pour l\'urgence, trouver-et-naviguer pour la d\u00e9couverte. Chaque tap comptait sur un \u00e9cran aussi contraint.',
      flowsDetailed: 'UI et Interactions',
      flowsDetailedDesc: 'Le mod\u00e8le d\'interaction complet montrant comment les actions montre se transmettent au t\u00e9l\u00e9phone. Des transitions fluides \u00e9taient essentielles.',
      uiModes: '\u00c9tats Actif vs Ambiant',
      uiModesDesc: 'Le jaune PagesJaunes assurait une reconnaissance instantan\u00e9e en mode actif. L\'\u00e9tat ambiant se r\u00e9duisait \u00e0 l\'essentiel monochrome, prolongeant la batterie de plusieurs heures.',
      ui: 'Inventaire \u00c9crans',
      uiDesc: 'Un catalogue syst\u00e9matique de chaque \u00e9tat d\'\u00e9cran, assurant la coh\u00e9rence du design \u00e0 travers l\'exp\u00e9rience montre connect\u00e9e.',
      components: 'Biblioth\u00e8que Composants',
      componentsDesc: 'Documentation compl\u00e8te couvrant les variantes de montres rondes et carr\u00e9es. Cette biblioth\u00e8que est devenue la source de v\u00e9rit\u00e9 pour notre \u00e9quipe de deux.',
      insituStore: 'Pr\u00e9sence Google Play',
      insituStoreDesc: 'Le visuel promotionnel pour le Play Store. Les premi\u00e8res impressions comptent quand les utilisateurs d\u00e9couvrent de nouvelles apps pour montre connect\u00e9e.',
      insituDetail: 'Pr\u00e9visualisation Contextuelle',
      insituDetailDesc: 'Montrer la fiche d\u00e9tail sur un vrai poignet aide les d\u00e9cideurs \u00e0 comprendre les conditions de lecture r\u00e9elles pour lesquelles nous avons con\u00e7u.',
      storeSubmission: 'Soumission Play Store',
      storeSubmissionDesc: 'Communication interne pour le lancement. Visuels marketing et supports de pr\u00e9sentation pr\u00eats pour publication.',
      devSession: 'Sessions en Bin\u00f4me',
      devSessionDesc: 'Sessions de travail quotidiennes avec le d\u00e9veloppeur Thibault Fighiera. Deux montres connect\u00e9es, it\u00e9rant sur des versions r\u00e9elles plut\u00f4t que des maquettes statiques.',
      designWork: 'Design en Cours',
      designWorkDesc: 'Keynote servait d\'outil de prototypage rapide. Rapide \u00e0 it\u00e9rer, facile \u00e0 partager, et assez pr\u00e9cis pour la transmission au d\u00e9veloppeur.',
      designDetail: 'V\u00e9rification sur Appareil',
      designDetailDesc: 'Rien ne remplace la v\u00e9rification des designs sur le vrai mat\u00e9riel. Reflets d\'\u00e9cran, angles de vue et zones tactiles ne se r\u00e9v\u00e8lent qu\'en contexte.',
      prototypeVideo: 'D\u00e9mo Parcours Recherche',
      prototypeVideoDesc: 'Le parcours de recherche complet captur\u00e9 sur du vrai mat\u00e9riel. De la saisie vocale \u00e0 l\'affichage de la fiche commerce.',
      navVideo: 'Relais Navigation',
      navVideoDesc: 'D\u00e9monstration de la transition fluide de la montre au t\u00e9l\u00e9phone quand l\'utilisateur demande un itin\u00e9raire.',
      screenLoading: '\u00c9tat de Chargement',
      screenLoadingDesc: 'Indicateur de chargement minimaliste sur jaune marque.',
      screenTime: 'Cadran Montre',
      screenTimeDesc: 'Affichage de l\'heure syst\u00e8me avant lancement app.',
      screenAppList: 'Lanceur d\'Apps',
      screenAppListDesc: 'Ic\u00f4ne PagesJaunes dans la liste d\'apps Android Wear.',
      screenRubriques: 'S\u00e9lection Cat\u00e9gorie',
      screenRubriquesDesc: 'Navigation par cat\u00e9gorie pour recherche exploratoire.',
      screenLR01: 'R\u00e9sultats Recherche',
      screenLR01Desc: 'Premier r\u00e9sultat dans la liste de recherche locale.',
      screenLR02: 'Navigation R\u00e9sultats',
      screenLR02Desc: 'D\u00e9filement dans les r\u00e9sultats de recherche.',
      screenLR03: 'Aper\u00e7u D\u00e9tail R\u00e9sultat',
      screenLR03Desc: 'Aper\u00e7u rapide avant la fiche d\u00e9tail compl\u00e8te.',
      screenFD: 'Fiche D\u00e9tail Pro',
      screenFDDesc: 'Information commerce compl\u00e8te en un coup d\'\u0153il.',
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
      onClick={onClick}
    >
      <div className="rounded-xl overflow-hidden ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]">
        {isVideo ? (
          <VideoPlayer
            src={item.src}
            className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <img loading="lazy" src={item.src} alt={item.caption} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
        {item.caption}
      </figcaption>
    </motion.figure>
  );
};


// Main Component
const AndroidWearPage: React.FC<AndroidWearPageProps> = ({
  onClose,
  viewMode,
  onViewModeChange,
  lang = 'en',
  onContact,
}) => {
  useEffect(() => {
    const seo = PROJECT_SEO['androidwear'];
    if (seo) {
      updateMetaTags(seo);
      const removeJsonLd = injectJsonLd('androidwear', seo);
      return () => { updateMetaTags(DEFAULT_SEO); removeJsonLd(); };
    }
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const t = TRANSLATIONS[lang];
  const galleryItems = getGalleryItems(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const allImages = galleryItems.map(item => ({
    src: item.src,
    type: (item.type || 'image') as 'image' | 'video',
    caption: `${item.caption} - ${item.captionDesc || ''}`,
  }));

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img.src === src);
    if (index !== -1) {
      openLightbox(index);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFC]">
      {/* Content */}
      {viewMode === 'caseStudy' ? (
        <div id="top">
          {/* Hero Section */}
          <section id="overview" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs text-gray-400">{t.hero.role}</span>
                <span className="text-xs text-gray-400">{t.hero.scope}</span>
                <span className="text-xs text-gray-400">{t.hero.period}</span>
              </div>

              <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {t.hero.title}
              </h1>

              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch] mb-8">
                {t.hero.subtitle}
              </p>

              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                {t.hero.description}
              </p>
            </div>
          </section>

          {/* Hero Image */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[960px] mx-auto px-6">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  style={{ backgroundColor: '#E7E7E7' }}
                >
                  <div className="flex items-center justify-center" style={{ aspectRatio: '3/2' }}>
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp"
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
                  <span className="text-xs text-gray-400">{t.meta.typeLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.type}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-400">{t.meta.scopeLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.scope}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-400">{t.meta.periodLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.period}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-xs text-gray-400">{t.meta.companyLabel}</span>
                  <span className="text-sm text-gray-900">{t.meta.company}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <p className="text-base text-gray-500 leading-relaxed italic max-w-[65ch] mb-4">
                "{t.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-400">
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
                  <p className="text-xs text-gray-400">{t.testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {t.overview.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.overview.contextTitle}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {t.overview.contextDesc}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.overview.challengeTitle}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {t.overview.challengeDesc}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.overview.roleTitle}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                    {t.overview.roleDesc}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Scenario Section */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {t.persona.title}
              </h2>

              <p className="text-base text-gray-500 leading-relaxed italic max-w-[65ch] mb-8">
                "{t.persona.scenario}"
              </p>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {t.persona.name}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  {t.persona.context}
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
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
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {t.approach.title}
              </h2>

              <div className="divide-y divide-gray-100">
                {t.approach.items.map((item, idx) => (
                  <div key={idx} className="py-4 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {item.title}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
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
                  <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                    {t.features.title}
                  </h2>
                  <ul className="text-sm text-gray-500 space-y-2">
                    {t.features.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gray-300 mt-0.5">{'\u2022'}</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                    {t.deliverables.title}
                  </h2>
                  <div className="divide-y divide-gray-100">
                    {t.deliverables.items.map((item, idx) => (
                      <div key={idx} className="py-4 text-sm text-gray-500">
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
              <span className="text-xs text-gray-400 mb-3 block">
                {lang === 'fr' ? 'Phase 1' : 'Phase 1'}
              </span>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {lang === 'fr' ? 'Recherche & Exploration' : 'Research & Discovery'}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Immersion dans les guidelines Android Wear, \u00e9tude des contraintes mat\u00e9rielles, d\u00e9finition des parcours utilisateur et exploration de dizaines de concepts sur papier.'
                  : 'Deep dive into Android Wear guidelines, studying hardware constraints, defining user journeys, and exploring dozens of concepts on paper.'}
              </p>
            </div>

            {/* Full width - Early Sketches */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/early_wireframes.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/early_wireframes.webp"
                    alt={t.process.sketches}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {t.process.sketches}. {t.process.sketchesDesc}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - User Flows & Platform Study */}
            <div className="max-w-[960px] mx-auto px-6">
              <div className="space-y-8 mb-12">
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20flows.webp"
                      alt={t.process.flows}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {t.process.flows}. {t.process.flowsDesc}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/android_wear_ambient_sketches.webp"
                      alt={t.process.ambient}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
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
              <span className="text-xs text-gray-400 mb-3 block">
                {lang === 'fr' ? 'Phase 2' : 'Phase 2'}
              </span>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {lang === 'fr' ? 'Design d\'Interface' : 'Screen Design'}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Cr\u00e9ation de l\'UI compl\u00e8te pour \u00e9crans circulaires et carr\u00e9s. Chaque \u00e9cran devait communiquer son propos en moins de 2 secondes sur un display de 280dp.'
                  : 'Creating the complete UI for circular and square displays. Each screen needed to communicate its purpose in under 2 seconds on a 280dp display.'}
              </p>
            </div>

            {/* Full width - UI Interactions */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/ui_interactions.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/ui_interactions.webp"
                    alt={lang === 'fr' ? 'UI et Interactions' : 'UI and Interactions'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {lang === 'fr' ? 'UI et Interactions' : 'UI and Interactions'}. {lang === 'fr' ? 'Le mod\u00e8le d\'interaction complet montrant comment les actions montre se transmettent au t\u00e9l\u00e9phone pour les appels et la navigation.' : 'The complete interaction model showing how watch actions hand off to phone for calls and navigation.'}
                </figcaption>
              </figure>
            </div>

            {/* Screen Inventory */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div className="divide-y divide-gray-100">
                  {[
                    { src: '/images/pagesjaunes/Android%20wear/screens/00%20Loading.webp', alt: 'Loading' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/02%20App%20list.webp', alt: 'App List' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/03%20Rubriques%20list.webp', alt: 'Categories' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/04%20LR%2001.webp', alt: 'Result 1' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/05%20LR%2002.webp', alt: 'Result 2' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/06%20LR%2003.webp', alt: 'Result 3' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/07%20FD.webp', alt: 'Detail Card' },
                    { src: '/images/pagesjaunes/Android%20wear/screens/01%20Time.webp', alt: 'Watch Face' },
                  ].map((screen, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleImageClick(screen.src)}
                      className="py-4 cursor-pointer rounded-xl overflow-hidden group"
                    >
                      <img
                        loading="lazy"
                        src={screen.src}
                        alt={screen.alt}
                        className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                      />
                    </div>
                  ))}
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {lang === 'fr' ? 'Inventaire des \u00c9crans' : 'Screen Inventory'}. {lang === 'fr' ? 'Catalogue de chaque \u00e9tat d\'\u00e9cran. Du chargement \u00e0 la fiche d\u00e9tail, chaque transition pens\u00e9e pour une lecture rapide sur 280dp.' : 'Catalog of every screen state. From loading to detail card, each transition designed for quick scanning on 280dp.'}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - UI Modes & Screen Overview */}
            <div className="max-w-[960px] mx-auto px-6">
              <div className="space-y-8">
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui%20modes.webp"
                      alt={t.process.uiModes}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {t.process.uiModes}. {t.process.uiModesDesc}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/pj%20android%20wear%20ui.webp"
                      alt={lang === 'fr' ? 'Vue d\'ensemble UI' : 'UI Overview'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
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
              <span className="text-xs text-gray-400 mb-3 block">
                {lang === 'fr' ? 'Phase 3' : 'Phase 3'}
              </span>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {lang === 'fr' ? 'Sp\u00e9cifications & Guidelines' : 'Specifications & Guidelines'}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Documentation exhaustive des modes actif et ambiant, biblioth\u00e8que de composants pour les variantes rondes et carr\u00e9es, et sp\u00e9cifications d\'interaction pour la transmission au d\u00e9veloppeur.'
                  : 'Comprehensive documentation of active and ambient modes, component library for round and square variants, and interaction specs for developer handoff.'}
              </p>
            </div>

            {/* Full width - Component Library */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/component_library.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/component_library.webp"
                    alt={t.process.components}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {t.process.components}. {t.process.componentsDesc}
                </figcaption>
              </figure>
            </div>

            {/* Full width - Ambient Mode Final Design */}
            <div className="max-w-[960px] mx-auto px-6">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/screens/android%20wear%20design%20ambient%20mode.webp"
                    alt={lang === 'fr' ? 'Design Mode Ambiant' : 'Ambient Mode Design'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {lang === 'fr' ? 'Sp\u00e9cifications Mode Ambiant' : 'Ambient Mode Specifications'}. {lang === 'fr' ? 'Contours blancs sur fond noir pour \u00e9conomiser la batterie. Chaque \u00e9cran actif a son \u00e9quivalent basse consommation, gardant les utilisateurs orient\u00e9s.' : 'White outlines on black background to preserve battery. Each active screen has its low-power equivalent, keeping users oriented.'}
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PHASE 4: IMPLEMENTATION & LAUNCH */}
          {/* ================================================================== */}
          <section id="implementation" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6 mb-8">
              <span className="text-xs text-gray-400 mb-3 block">
                {lang === 'fr' ? 'Phase 4' : 'Phase 4'}
              </span>
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {lang === 'fr' ? 'Impl\u00e9mentation & Lancement' : 'Implementation & Launch'}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                {lang === 'fr'
                  ? 'Sessions quotidiennes en bin\u00f4me avec le d\u00e9veloppeur, it\u00e9rations sur des builds r\u00e9els, prototypes vid\u00e9o, et pr\u00e9paration des assets pour la soumission Google Play.'
                  : 'Daily pair sessions with the developer, iterating on real builds, video prototypes, and preparing assets for Google Play submission.'}
              </p>
            </div>

            {/* Full width - Dev Session */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/dev_session_1.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/dev_session_1.webp"
                    alt={t.implementation.devSession}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {t.implementation.devSession}. {t.implementation.devSessionDesc}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - Design Work Photos */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <div className="space-y-8">
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/design_work_keynote.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/design_work_keynote.webp"
                      alt={lang === 'fr' ? 'Session Design' : 'Design Session'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {lang === 'fr' ? 'Prototypage Keynote' : 'Keynote Prototyping'}. {lang === 'fr' ? 'Keynote servait d\'outil de prototypage rapide. Rapide \u00e0 it\u00e9rer, facile \u00e0 partager, assez pr\u00e9cis pour la transmission au d\u00e9veloppeur.' : 'Keynote served as my rapid prototyping tool. Quick to iterate, easy to share, precise enough for handoff.'}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/design_work_detail.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/design_work_detail.webp"
                      alt={lang === 'fr' ? 'V\u00e9rification Device' : 'Device Verification'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
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
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4')}
                    className="relative rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <VideoPlayer
                      src="/images/pagesjaunes/Android%20wear/VID_20151202_184124.mp4"
                      className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {t.implementation.prototype}. {t.implementation.prototypeDesc}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4')}
                    className="relative rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <VideoPlayer
                      src="/images/pagesjaunes/Android%20wear/VID_20151218_100148.mp4"
                      className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {lang === 'fr' ? 'D\u00e9mo Navigation' : 'Navigation Demo'}. {lang === 'fr' ? 'Transition fluide de la montre au t\u00e9l\u00e9phone quand l\'utilisateur demande un itin\u00e9raire.' : 'Seamless transition from watch to phone when the user requests directions.'}
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Full width - Google Play Store Submission */}
            <div className="max-w-[960px] mx-auto px-6 mb-12">
              <figure>
                <div
                  onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp')}
                  className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <img
                    loading="lazy"
                    src="/images/pagesjaunes/Android%20wear/screens/android_wear_visuel_mail_comm.webp"
                    alt={lang === 'fr' ? 'Soumission Play Store' : 'Play Store Submission'}
                    className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                  {lang === 'fr' ? 'Communication Lancement' : 'Launch Communication'}. {lang === 'fr' ? 'Communication interne pour le lancement. Visuels marketing pr\u00eats pour publication.' : 'Internal communication for app launch. Marketing assets and store listing materials ready for publication.'}
                </figcaption>
              </figure>
            </div>

            {/* Stacked - Final Mockups */}
            <div className="max-w-[960px] mx-auto px-6">
              <div className="space-y-8">
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <img
                      loading="lazy"
                      src="/images/pagesjaunes/Android%20wear/android_wear_insitu_store_01.webp"
                      alt={lang === 'fr' ? 'Pr\u00e9sence Google Play' : 'Google Play Presence'}
                      className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {lang === 'fr' ? 'Visuel Play Store' : 'Play Store Visual'}. {lang === 'fr' ? 'Le visuel promotionnel pour le listing Google Play. Les premi\u00e8res impressions comptent.' : 'The promotional visual for Google Play listing. First impressions matter.'}
                  </figcaption>
                </figure>
                <figure>
                  <div
                    onClick={() => handleImageClick('/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp')}
                    className="rounded-xl overflow-hidden cursor-pointer group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
                    style={{ backgroundColor: '#E7E7E7' }}
                  >
                    <div className="w-full flex items-center justify-center p-6">
                      <img
                        loading="lazy"
                        src="/images/pagesjaunes/Android%20wear/maquette_insitu_FD_03%20(1).webp"
                        alt={lang === 'fr' ? 'Fiche Pro sur Poignet' : 'Business Card on Wrist'}
                        className="max-w-full object-contain transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                        style={{ transform: 'rotate(-5deg)' }}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3 text-xs text-gray-400 leading-relaxed">
                    {lang === 'fr' ? 'Mockup In-situ' : 'In-situ Mockup'}. {lang === 'fr' ? 'Visualiser la fiche sur un vrai poignet r\u00e9v\u00e8le les conditions de lecture r\u00e9elles.' : 'Visualizing the card on an actual wrist reveals real-world reading conditions.'}
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section id="results" className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-8">
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
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {t.learnings.title}
              </h2>

              <div className="divide-y divide-gray-100">
                {t.learnings.items.map((item, idx) => (
                  <div key={idx} className="py-4 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {item.title}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-24 md:mb-32">
            <div className="max-w-[740px] mx-auto px-6">
              <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
                {t.cta.title}
              </h2>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {t.cta.button}
                <ArrowRight size={14} />
              </button>
            </div>
          </section>
        </div>
      ) : (
        /* Gallery View */
        <div className="max-w-[960px] mx-auto px-6 py-12">
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
        images={allImages}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        lang={lang}
        projectId="androidwear"
      />
    </div>
  );
};

export default AndroidWearPage;
