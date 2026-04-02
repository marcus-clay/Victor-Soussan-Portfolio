/**
 * Gallery data - Organized by project for editorial presentation
 */

export interface GalleryItem {
  id: string;
  src: string;
  type: 'image' | 'video';
}

export interface GalleryProject {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionFr: string;
  items: GalleryItem[];
}

// Helper: generate UI image items from a number range
function ui(numbers: number[]): GalleryItem[] {
  return numbers.map(n => ({
    id: `ui-${n}`,
    src: `/images/visuels UI/${n}_1_5x.webp`,
    type: 'image' as const,
  }));
}

function img(id: string, src: string): GalleryItem {
  return { id, src, type: 'image' };
}

function vid(id: string, src: string): GalleryItem {
  return { id, src, type: 'video' };
}

// ---------------------------------------------------------------------------
// Projects ordered by visual impact (best-looking first)
// ---------------------------------------------------------------------------

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'scrim',
    name: 'SCRIM',
    descriptionEn: 'Risk management dashboard for industrial sites',
    descriptionFr: 'Tableau de bord de gestion des risques pour sites industriels',
    items: ui([100, 101, 102, 103, 104, 105, 106]),
  },
  {
    id: 'dailymotion',
    name: 'Dailymotion',
    descriptionEn: 'Publisher video management platform, design system and interaction prototypes',
    descriptionFr: 'Plateforme de gestion vidéo pour éditeurs, design system et prototypes d\'interaction',
    items: [
      img('dm-platform', '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp'),
      img('dm-ds', '/images/dailymotion/design_system_-_component_library2x.webp'),
      img('dm-upload', '/images/dailymotion/dailymotion_-_upload2x.webp'),
      img('dm-livestream', '/images/dailymotion/dailymotion_-_livestream2x.webp'),
      img('dm-styles', '/images/dailymotion/design_system_-_Styles2x.webp'),
      vid('dm-embed', '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4'),
      vid('dm-password', '/videos/dailymotion/dailymotion_video_manager_-_set_password.mp4'),
      vid('dm-subtitle', '/videos/dailymotion/video_add_subtitle.mp4'),
      vid('dm-cancel', '/videos/dailymotion/video_-_cancel_upload.mp4'),
      vid('dm-geoblocking', '/videos/dailymotion/Geoblocking.mp4'),
    ],
  },
  // --- SQOOL ecosystem (grouped) ---
  {
    id: 'sqool-connect',
    name: 'SQOOL Connect',
    descriptionEn: 'App catalog, teacher workspace and classroom communication for K-12 schools',
    descriptionFr: 'Catalogue d\'applications, espace enseignant et communication de classe pour le scolaire',
    items: [
      ...ui([800, 801, 802, 803, 804, 805, 806]),
      ...ui([900, 901, 902, 903, 904, 905, 906]),
      img('connect-overview', '/images/connect/connect_overview.webp'),
      img('connect-home', '/images/connect/connect_dashboard_home_light_full-scaled.webp'),
      img('connect-bulle', '/images/connect/connect_bulle_ui_focus-scaled.webp'),
      img('connect-ds', '/images/connect/connect_design_system.webp'),
      vid('connect-dashboard', '/videos/connect/connect-dashboard-prototype-compressed.mp4'),
      vid('connect-bulle-01', '/videos/connect/Video-demo-bulle-interactions-compressed.mp4'),
      vid('connect-bulle-02', '/videos/connect/interaction-bulle-connect-compressed.mp4'),
    ],
  },
  {
    id: 'sqool-classe',
    name: 'SQOOL Classe',
    descriptionEn: 'Real-time classroom management and student interaction monitoring for teachers',
    descriptionFr: 'Gestion de classe en temps réel et suivi des interactions élèves pour les enseignants',
    items: ui([1000, 1001, 1002]),
  },
  {
    id: 'sqool-ecosystem',
    name: 'SQOOL',
    descriptionEn: 'Educational tablet ecosystem for K-12 schools, 500,000 users',
    descriptionFr: 'Écosystème éducatif sur tablette pour le scolaire, 500 000 utilisateurs',
    items: [
      ...ui([1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708]),
      img('sqool-classe', '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp'),
    ],
  },
  {
    id: 'sqool-extend',
    name: 'SQOOL Extend',
    descriptionEn: 'Virtual PC classroom management for schools and universities',
    descriptionFr: 'Gestion de PC virtuels en classe pour établissements scolaires et universitaires',
    items: ui([1600, 1601, 1602, 1603, 1604]),
  },
  {
    id: 'sqool-brand',
    name: 'SQOOL Brand System',
    descriptionEn: 'Complete visual identity system: typography, iconography, color palette and guidelines',
    descriptionFr: 'Système d\'identité visuelle complet : typographie, iconographie, palette et guidelines',
    items: [
      img('brand-sqool-01', '/images/sqool/systeme de marque/visuels_systeme_de_marque_01_2x.webp'),
      img('brand-sqool-02', '/images/sqool/systeme de marque/visuels_systeme_de_marque_02_2x.webp'),
      img('brand-sqool-03', '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp'),
      img('brand-sqool-04', '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp'),
      img('brand-sqool-05', '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp'),
      img('brand-sqool-06', '/images/sqool/systeme de marque/visuels_systeme_de_marque_06_2x.webp'),
      img('brand-sqool-colors', '/images/sqool/sqool brand/ColorsGradients.webp'),
    ],
  },
  {
    id: 'hi-sqool',
    name: 'Hi SQOOL',
    descriptionEn: 'Brand identity for an educational communication platform',
    descriptionFr: 'Identité de marque pour une plateforme de communication éducative',
    items: ui([1500, 1501, 1502, 1503, 1504, 1505]),
  },
  // --- Other projects ---
  {
    id: 'komete',
    name: 'Komète',
    descriptionEn: 'KPI builder and statistical analytics platform for workforce data',
    descriptionFr: 'Constructeur de KPI et plateforme d\'analyse statistique pour les données emploi-formation',
    items: [
      ...ui([200, 201, 202, 203]),
      ...ui([300, 301, 302, 303]),
    ],
  },
  {
    id: 'toolkit',
    name: 'Toolkit',
    descriptionEn: 'Project planning, task management and batch operations platform',
    descriptionFr: 'Plateforme de planification, gestion de tâches et opérations par lot',
    items: [
      ...ui([1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110]),
      vid('toolkit-batch', '/videos/toolkit/video_-_batch_edition.mp4'),
      vid('toolkit-nav', '/videos/toolkit/video_-_navigation_-_show_hide.mp4'),
      vid('toolkit-planning', '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4'),
      vid('toolkit-task', '/videos/toolkit/video_-_task_manipulation.mp4'),
    ],
  },
  {
    id: 'vinci',
    name: 'Vinci Construction',
    descriptionEn: 'Enterprise authentication, mobile app and augmented process management for construction projects',
    descriptionFr: 'Authentification, application mobile et gestion de processus augmentée pour les chantiers',
    items: [
      ...ui([600, 601, 602]),
      ...ui([500, 501, 502, 503, 504]),
      ...ui([400, 401, 402, 403]),
    ],
  },
  {
    id: 'pagesjaunes',
    name: 'PagesJaunes',
    descriptionEn: 'Local search mobile application, iOS and Android',
    descriptionFr: 'Application mobile de recherche locale, iOS et Android',
    items: [
      ...ui([1300, 1301, 1302, 1303, 1304, 1305]),
      vid('pj-onboarding', '/images/pj-and-app-onboarding-animation.mp4'),
      vid('pj-ios-onboarding', '/images/pj-ios-app-onboarding-animation.mp4'),
    ],
  },
  {
    id: 'ogury',
    name: 'Ogury',
    descriptionEn: 'Mobile advertising campaign performance analytics',
    descriptionFr: 'Analytique de performance pour campagnes publicitaires mobiles',
    items: ui([1200, 1201, 1202, 1203, 1204, 1205, 1206]),
  },
  {
    id: 'eads',
    name: 'EADS',
    descriptionEn: 'Executive education online campus for Airbus Group',
    descriptionFr: 'Campus en ligne de formation executive pour le groupe Airbus',
    items: ui([700, 701, 702, 703, 704, 705, 706]),
  },
  {
    id: 'uptrade',
    name: 'UpTrade',
    descriptionEn: 'Brand identity for a B2B trading platform',
    descriptionFr: 'Identité de marque pour une plateforme de trading B2B',
    items: ui([1400, 1401, 1402, 1403, 1404, 1405]),
  },
];

// Flat list of all items (for lightbox indexing)
export const ALL_GALLERY_ITEMS = GALLERY_PROJECTS.flatMap(p => p.items);

// ~77 thumbnails for the Projets page horizontal scroll grid (4 rows × ~20 cols).
// Ordered by project for visual rhythm. Uses object-fit: cover — no positioning math.
export const PROJETS_GRID_ITEMS: { src: string; projectId: string }[] = [
  // SCRIM (5)
  { src: '/images/visuels UI/100_1_5x.webp', projectId: 'scrim' },
  { src: '/images/visuels UI/101_1_5x.webp', projectId: 'scrim' },
  { src: '/images/visuels UI/102_1_5x.webp', projectId: 'scrim' },
  { src: '/images/visuels UI/103_1_5x.webp', projectId: 'scrim' },
  { src: '/images/visuels UI/104_1_5x.webp', projectId: 'scrim' },
  // Dailymotion (5)
  { src: '/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp', projectId: 'dailymotion' },
  { src: '/images/dailymotion/design_system_-_component_library2x.webp',   projectId: 'dailymotion' },
  { src: '/images/dailymotion/dailymotion_-_upload2x.webp',                 projectId: 'dailymotion' },
  { src: '/images/dailymotion/dailymotion_-_livestream2x.webp',             projectId: 'dailymotion' },
  { src: '/images/dailymotion/design_system_-_Styles2x.webp',               projectId: 'dailymotion' },
  // SQOOL Connect (6)
  { src: '/images/visuels UI/800_1_5x.webp',  projectId: 'sqool-connect' },
  { src: '/images/visuels UI/801_1_5x.webp',  projectId: 'sqool-connect' },
  { src: '/images/visuels UI/900_1_5x.webp',  projectId: 'sqool-connect' },
  { src: '/images/visuels UI/901_1_5x.webp',  projectId: 'sqool-connect' },
  { src: '/images/connect/connect_overview.webp',                            projectId: 'sqool-connect' },
  { src: '/images/connect/connect_dashboard_home_light_full-scaled.webp',   projectId: 'sqool-connect' },
  // SQOOL Classe (3)
  { src: '/images/visuels UI/1000_1_5x.webp', projectId: 'sqool-classe' },
  { src: '/images/visuels UI/1001_1_5x.webp', projectId: 'sqool-classe' },
  { src: '/images/visuels UI/1002_1_5x.webp', projectId: 'sqool-classe' },
  // SQOOL Ecosystem (5)
  { src: '/images/visuels UI/1700_1_5x.webp', projectId: 'sqool-ecosystem' },
  { src: '/images/visuels UI/1701_1_5x.webp', projectId: 'sqool-ecosystem' },
  { src: '/images/visuels UI/1702_1_5x.webp', projectId: 'sqool-ecosystem' },
  { src: '/images/visuels UI/1703_1_5x.webp', projectId: 'sqool-ecosystem' },
  { src: '/images/visuels UI/1704_1_5x.webp', projectId: 'sqool-ecosystem' },
  // SQOOL Extend (5)
  { src: '/images/visuels UI/1600_1_5x.webp', projectId: 'sqool-extend' },
  { src: '/images/visuels UI/1601_1_5x.webp', projectId: 'sqool-extend' },
  { src: '/images/visuels UI/1602_1_5x.webp', projectId: 'sqool-extend' },
  { src: '/images/visuels UI/1603_1_5x.webp', projectId: 'sqool-extend' },
  { src: '/images/visuels UI/1604_1_5x.webp', projectId: 'sqool-extend' },
  // SQOOL Brand (5)
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_01_2x.webp', projectId: 'sqool-brand' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_02_2x.webp', projectId: 'sqool-brand' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_03_2x.webp', projectId: 'sqool-brand' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_04_2x.webp', projectId: 'sqool-brand' },
  { src: '/images/sqool/systeme de marque/visuels_systeme_de_marque_05_2x.webp', projectId: 'sqool-brand' },
  // Hi SQOOL (5)
  { src: '/images/visuels UI/1500_1_5x.webp', projectId: 'hi-sqool' },
  { src: '/images/visuels UI/1501_1_5x.webp', projectId: 'hi-sqool' },
  { src: '/images/visuels UI/1502_1_5x.webp', projectId: 'hi-sqool' },
  { src: '/images/visuels UI/1503_1_5x.webp', projectId: 'hi-sqool' },
  { src: '/images/visuels UI/1504_1_5x.webp', projectId: 'hi-sqool' },
  // Komète (6)
  { src: '/images/visuels UI/200_1_5x.webp', projectId: 'komete' },
  { src: '/images/visuels UI/201_1_5x.webp', projectId: 'komete' },
  { src: '/images/visuels UI/202_1_5x.webp', projectId: 'komete' },
  { src: '/images/visuels UI/300_1_5x.webp', projectId: 'komete' },
  { src: '/images/visuels UI/301_1_5x.webp', projectId: 'komete' },
  { src: '/images/visuels UI/302_1_5x.webp', projectId: 'komete' },
  // Toolkit (6)
  { src: '/images/visuels UI/1100_1_5x.webp', projectId: 'toolkit' },
  { src: '/images/visuels UI/1101_1_5x.webp', projectId: 'toolkit' },
  { src: '/images/visuels UI/1102_1_5x.webp', projectId: 'toolkit' },
  { src: '/images/visuels UI/1103_1_5x.webp', projectId: 'toolkit' },
  { src: '/images/visuels UI/1104_1_5x.webp', projectId: 'toolkit' },
  { src: '/images/visuels UI/1105_1_5x.webp', projectId: 'toolkit' },
  // Vinci (6)
  { src: '/images/visuels UI/600_1_5x.webp', projectId: 'vinci' },
  { src: '/images/visuels UI/601_1_5x.webp', projectId: 'vinci' },
  { src: '/images/visuels UI/500_1_5x.webp', projectId: 'vinci' },
  { src: '/images/visuels UI/501_1_5x.webp', projectId: 'vinci' },
  { src: '/images/visuels UI/400_1_5x.webp', projectId: 'vinci' },
  { src: '/images/visuels UI/401_1_5x.webp', projectId: 'vinci' },
  // PagesJaunes (5)
  { src: '/images/visuels UI/1300_1_5x.webp', projectId: 'pagesjaunes' },
  { src: '/images/visuels UI/1301_1_5x.webp', projectId: 'pagesjaunes' },
  { src: '/images/visuels UI/1302_1_5x.webp', projectId: 'pagesjaunes' },
  { src: '/images/visuels UI/1303_1_5x.webp', projectId: 'pagesjaunes' },
  { src: '/images/visuels UI/1304_1_5x.webp', projectId: 'pagesjaunes' },
  // Ogury (5)
  { src: '/images/visuels UI/1200_1_5x.webp', projectId: 'ogury' },
  { src: '/images/visuels UI/1201_1_5x.webp', projectId: 'ogury' },
  { src: '/images/visuels UI/1202_1_5x.webp', projectId: 'ogury' },
  { src: '/images/visuels UI/1203_1_5x.webp', projectId: 'ogury' },
  { src: '/images/visuels UI/1204_1_5x.webp', projectId: 'ogury' },
  // EADS (5)
  { src: '/images/visuels UI/700_1_5x.webp', projectId: 'eads' },
  { src: '/images/visuels UI/701_1_5x.webp', projectId: 'eads' },
  { src: '/images/visuels UI/702_1_5x.webp', projectId: 'eads' },
  { src: '/images/visuels UI/703_1_5x.webp', projectId: 'eads' },
  { src: '/images/visuels UI/704_1_5x.webp', projectId: 'eads' },
  // UpTrade (5)
  { src: '/images/visuels UI/1400_1_5x.webp', projectId: 'uptrade' },
  { src: '/images/visuels UI/1401_1_5x.webp', projectId: 'uptrade' },
  { src: '/images/visuels UI/1402_1_5x.webp', projectId: 'uptrade' },
  { src: '/images/visuels UI/1403_1_5x.webp', projectId: 'uptrade' },
  { src: '/images/visuels UI/1404_1_5x.webp', projectId: 'uptrade' },
];

// Featured items for the gallery teaser strip (hand-picked for visual diversity)
// projectId        → links to #gallery-{projectId} on the Galerie page
//
// backgroundPosition → CSS background-position for the 200%-scaled base image.
//
//   HOW PERCENTAGES WORK at backgroundSize: '200%':
//     Container = 692px, rendered image = 1384px, overflow = 692px.
//     X% horizontal shift = X% × 692px into the rendered image from its left edge.
//     Y% vertical shift   = Y% × rendered_height into the image from its top edge.
//     → '0% 0%'   = strict top-left corner
//     → '15% 6%'  = skip ~104px left (typical narrow sidebar) + ~6% nav height
//     → 'center 4%' = centre horizontally, slight top inset (device mockups)
//
//   TO TUNE: open the browser, inspect the card's background div, and adjust
//   backgroundPosition live in DevTools. Paste the final value here.
//
export const HOMEPAGE_GALLERY_ITEMS: { src: string; projectId: string; backgroundPosition?: string }[] = [
  // SCRIM — risk dashboard: left filter panel ~200px rendered, skip it, show task grid
  { src: '/images/visuels UI/100_1_5x.webp',  projectId: 'scrim',         backgroundPosition: '28% 6%' },
  // SQOOL Connect — dark tablet device mockup: centre the device in the frame
  { src: '/images/visuels UI/800_1_5x.webp',  projectId: 'sqool-connect', backgroundPosition: 'center 3%' },
  // Komète — KPI data table: show from near-left edge, skip nav bar height
  { src: '/images/visuels UI/200_1_5x.webp',  projectId: 'komete',        backgroundPosition: '5% 8%' },
  // Toolkit — planning grid: slight left inset, skip top toolbar
  { src: '/images/visuels UI/1102_1_5x.webp', projectId: 'toolkit',       backgroundPosition: '12% 6%' },
  // PagesJaunes — mobile app: centre the phone, anchor at top
  { src: '/images/visuels UI/1300_1_5x.webp', projectId: 'pagesjaunes',   backgroundPosition: 'center top' },
  // Vinci — enterprise forms: slight left inset, show form content
  { src: '/images/visuels UI/500_1_5x.webp',  projectId: 'vinci',         backgroundPosition: '10% 6%' },
  // Ogury — analytics: slight left inset, show chart zone
  { src: '/images/visuels UI/1200_1_5x.webp', projectId: 'ogury',         backgroundPosition: '10% 8%' },
];
