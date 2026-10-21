// Android Wear Case Study Page - Minimalist rewrite
// PagesJaunes Android Wear wearable design project

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { imgDims } from '@/utils/imageDimensions'
import { motion } from 'framer-motion';
import { useReveal } from '@/lib/motion'
import VideoPlayer from '@/components/VideoPlayer';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudySummary from '@/components/case-study/CaseStudySummary';
import CaseStudyTestimonialBlock from '@/components/case-studies/CaseStudyTestimonialBlock';
import { ActRule, ActTitle } from '@/components/case-study/ActSection';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-zoom-in break-inside-avoid mb-4"
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
      </figcaption>
    </motion.figure>
  );
};



// ============================================================================
// LAYOUT BLOCKS (module level so they keep one identity across renders)
// ============================================================================

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const VIDEO_RE = /\.(mp4|webm|mov)$/i;
const WEAR = '/images/pagesjaunes/Android%20wear';

interface MediaProps {
  src: string;
  /** Accessible name of the zoomable frame, also the one-line caption */
  name: string;
  onZoom: (src: string) => void;
  /** Tailwind max-width class for near-square or portrait media, left-aligned on the media edge */
  maxWidth?: string;
}

const Media: React.FC<MediaProps> = ({ src, name, onZoom, maxWidth = '' }) => {
  const reveal = useReveal();
  const video = VIDEO_RE.test(src);
  return (
    <motion.figure {...reveal()} className={maxWidth}>
        <div
          {...zoomable(() => onZoom(src))}
          aria-label={name}
          className={`group rounded-2xl overflow-hidden border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 cursor-zoom-in shadow-sm [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-300 ${EASE}`}
        >
          {video ? (
            <VideoPlayer
              src={src}
              className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          ) : (
            <img
              loading="lazy"
              src={src}
              {...imgDims(src)}
              alt=""
              className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`}
            />
          )}
        </div>
        <figcaption className="mt-3 text-xs text-gray-500">{name}</figcaption>
    </motion.figure>
  );
};

/** One block: an h3, one short paragraph in the reading column, then at most one visual */
const Block: React.FC<{ id?: string; title: string; text: string; children?: React.ReactNode }> = ({ id, title, text, children }) => (
  <div id={id} className="scroll-mt-28 mb-12 md:mb-16 last:mb-0">
    <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
    <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
    {children && <div className="mt-8">{children}</div>}
  </div>
);

/** Act opening: hairline, number, title and an optional lead of 55 words at most */
const ActOpen: React.FC<{ index: string; title: string; lead?: string }> = ({ index, title, lead }) => (
  <div className={lead ? 'mb-10 md:mb-14' : 'mb-5 md:mb-9'}>
    <ActTitle index={index} title={title} />
    {lead && <p className="max-w-[62ch] text-base text-gray-600">{lead}</p>}
  </div>
);

/** Kept out of the narration (each screen is a separate item in the gallery): the eight screen states, shown on a dark plate */
const INVENTORY: { src: string; en: string; fr: string }[] = [
  { src: `${WEAR}/screens/01%20Time.webp`, en: 'Watch face. Entry point and quick return.', fr: 'Cadran montre. Point d’entrée et retour rapide.' },
  { src: `${WEAR}/screens/00%20Loading.webp`, en: 'Loading. Immediate feedback on launch.', fr: 'Chargement. Feedback immédiat au lancement.' },
  { src: `${WEAR}/screens/02%20App%20list.webp`, en: 'App list. Category-first navigation.', fr: 'Apps. Navigation contextuelle par catégorie.' },
  { src: `${WEAR}/screens/03%20Rubriques%20list.webp`, en: 'PagesJaunes categories on the wrist.', fr: 'Rubriques PagesJaunes sur le poignet.' },
  { src: `${WEAR}/screens/04%20LR%2001.webp`, en: 'Result 1/3. Name and distance first.', fr: 'Résultat 1/3. Nom et distance en priorité.' },
  { src: `${WEAR}/screens/05%20LR%2002.webp`, en: 'Result 2/3. Swipe to browse.', fr: 'Résultat 2/3. Swipe pour parcourir.' },
  { src: `${WEAR}/screens/06%20LR%2003.webp`, en: 'Result 3/3. End of list.', fr: 'Résultat 3/3. Fin de liste.' },
  { src: `${WEAR}/screens/07%20FD.webp`, en: 'Detail card. Call or directions in one tap.', fr: 'Fiche détail. Appel ou itinéraire en un tap.' },
];

const AndroidWearPage: React.FC<AndroidWearPageProps> = ({
  viewMode,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang];
  const fr = lang === 'fr';
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

  // The gallery view indexes into these items, so they stay in the same order
  const allImages: LightboxImage[] = galleryItems.map(item => ({
    src: item.src,
    type: (item.type || 'image') as 'image' | 'video',
    caption: item.captionDesc ? `${item.caption}. ${item.captionDesc}` : item.caption,
  }));

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img.src === src);
    if (index !== -1) {
      openLightbox(index);
      return;
    }
    const isVideo = VIDEO_RE.test(src);
    setSingleImage({ src, type: isVideo ? 'video' : 'image', caption: '' });
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Content */}
      {viewMode !== 'gallery' ? (
        <div id="top">
          {/* Hero: the intro is the executive summary */}
          <CaseStudyHero
            lang={lang}
            projectId="androidwear"
            title={t.hero.title}
            intro={t.hero.intro}
            meta={[
              { label: fr ? 'Rôle' : 'Role', value: t.hero.role },
              { label: fr ? 'Périmètre' : 'Scope', value: t.hero.scope },
              { label: fr ? 'Équipe' : 'Team', value: t.result.items[3].label },
            ]}
            visualAlt={t.process.uiModes}
            onZoom={() => handleImageClick(`${WEAR}/pj%20android%20wear%20ui%20modes.webp`)}
          />

          {/* Client testimonial, right under the hero */}
          <div className="act-wide pb-12 md:pb-16">
            <CaseStudyTestimonialBlock
              quote={t.testimonial.quote}
              author={t.testimonial.author}
              role={t.testimonial.role}
              image="thibault-fighiera.webp"
              linkedin="https://www.linkedin.com/in/thibaultfighiera/"
              lang={lang}
            />
          </div>

          {/* Summary: context, role and deliverables (no sourced numbers: the page has none to show) */}
          <CaseStudySummary
            lang={lang}
            context={t.summary.context}
            role={t.summary.role}
            deliverables={t.summary.deliverables}
          />

          {/* ============================================================== */}
          {/* 01 CONTEXT: the user scenario */}
          {/* ============================================================== */}
          <section id="context">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
                <ActOpen index="01" title={t.acts.context} lead={t.persona.scenario} />
                <Block title={t.persona.name} text={t.persona.context} />
            </div>
          </section>

          {/* ============================================================== */}
          {/* 02 APPROACH: three decisions (platform learning is the lead) */}
          {/* ============================================================== */}
          <section id="approach">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="02" title={t.acts.approach} lead={t.approach.items[0].desc} />

              <Block id="flows" title={t.approach.items[1].title} text={t.approach.items[1].desc}>
                {/* Colour clip on real hardware leads; the flow diagram stays in the gallery */}
                <Media
                  src={`${WEAR}/VID_20151218_100148.mp4`}
                  name={fr ? 'Relais vers la navigation' : 'Navigation handoff'}
                  onZoom={handleImageClick}
                />
              </Block>

              <Block id="glanceability" title={t.approach.items[2].title} text={t.approach.items[2].desc}>
                {/* Near-square watch mockup, capped and left-aligned */}
                <Media
                  src={`${WEAR}/maquette_insitu_FD_03%20(1).webp`}
                  name={fr ? 'Aperçu en contexte' : 'Contextual preview'}
                  maxWidth="max-w-[420px]"
                  onZoom={handleImageClick}
                />
              </Block>

              <Block id="hardware" title={t.approach.items[3].title} text={t.approach.items[3].desc}>
                <Media
                  src={`${WEAR}/dev_session_1.webp`}
                  name={t.implementation.devSession}
                  onZoom={handleImageClick}
                />
              </Block>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 03 PRODUCT: two modes, then the flow on real hardware */}
          {/* ============================================================== */}
          <section id="product">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="03" title={t.acts.product} />

              <Block id="modes" title={t.process.uiModes} text={t.process.uiModesDesc}>
                <Media
                  src={`${WEAR}/screens/android%20wear%20design%20ambient%20mode.webp`}
                  name={fr ? 'Mode normal et mode ambiant' : 'Regular mode and ambient mode'}
                  maxWidth="max-w-[560px]"
                  onZoom={handleImageClick}
                />
              </Block>

              <Block id="prototype" title={t.implementation.prototype} text={t.implementation.prototypeDesc}>
                <Media
                  src={`${WEAR}/VID_20151202_184124.mp4`}
                  name={t.implementation.prototype}
                  onZoom={handleImageClick}
                />
              </Block>

              {/* Gallery access */}
              <div>
                <Link
                  href={`/${lang}/project/androidwear/gallery`}
                  className={`inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ${EASE}`}
                >
                  {t.acts.seeAll}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 04 RESULTS AND LEARNINGS */}
          {/* ============================================================== */}
          <section id="results">
            <ActRule />
            <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
              <ActOpen index="04" title={t.acts.results} />

              <div className="mb-12 md:mb-16">
                <dl className="max-w-[62ch] divide-y divide-gray-100 border-t border-gray-100">
                  {t.result.items.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-base text-gray-600">{item.label}</dt>
                      <dd className="text-title-2 text-gray-900 tabular-nums">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div id="learnings" className="scroll-mt-28">
                <h3 className="text-title-3 text-gray-900 mb-4 max-w-[56ch]">{t.learnings.title}</h3>
                <ul className="max-w-[62ch] space-y-4">
                  {t.learnings.items.map((item) => (
                    <li key={item.title} className="text-base text-gray-600">
                      <span className="font-medium text-gray-900">{item.title}.</span> {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Gallery View */
        <div className="act-wide py-8 md:py-12">
          <h1 className="sr-only">{t.hero.title} ({t.gallery})</h1>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
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
