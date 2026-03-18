# Cartographie du contenu

## Sources de données

| Fichier | Contenu | Volume |
|---|---|---|
| `src/data/translations.ts` | UI copy bilingue (nav, hero, services, about, etc.) | ~1000 lignes |
| `src/data/signalsData.ts` | Articles blog (id, titre, body, catégorie, date) | 20+ articles |
| `src/data/testimonialsData.ts` | Témoignages clients bilingues | 14 témoignages |
| `src/data/careerData.ts` | Timeline carrière (période, rôle, entreprise, détails) | 11 entrées |
| `src/data/consultingData.ts` | Offres consulting, scénarios, références, modes | 513 lignes |
| `src/data/galleryData.ts` | Projets gallery (images + vidéos par projet) | 8 projets |
| `src/data/sqoolPrototypesData.ts` | 42 prototypes interactifs SQOOL Classe | T1-T25, S1-S7, SC1-SC10 |
| `src/data/labData.ts` | Previews lab (apps, agents, art) | 3 catégories |

## Pages et leur contenu

| Page | Fichier | Contenu intégré |
|---|---|---|
| Homepage | App.tsx (~320 Ko) | Hero, projects grid, about preview, gallery, services, signals, testimonials, footer |
| About | pages/AboutPage.tsx | Bio, CareerCarousel (careerData), skills |
| Services | pages/ServicesPage.tsx | 3 piliers expertise, deliverables |
| Work | pages/WorkPage.tsx | Grid des 9 projets, liens case studies |
| Signals | pages/SignalsPage.tsx | Liste filtrée (signalsData) |
| Gallery | pages/VisualArchivePage.tsx | BentoGallery (galleryData) |
| Consulting | pages/ConsultingPage.tsx | Lifecycle, offres, scénarios (consultingData) |
| Executive | pages/ExecutivePage.tsx | Présentation 1 min, slides |

## Case studies (9)

| Case study | Fichier | Taille |
|---|---|---|
| Toolkit (design system) | pages/case-studies/ToolkitPage.tsx | 131 Ko |
| SQOOL Classe | pages/case-studies/SqoolClassePage.tsx | 105 Ko |
| SQOOL (écosystème) | pages/case-studies/SqoolPage.tsx | 101 Ko |
| Dailymotion | pages/case-studies/DailymotionPage.tsx | 94 Ko |
| Android Wear | pages/case-studies/AndroidWearPage.tsx | 81 Ko |
| SQOOL Connect | pages/case-studies/ConnectPage.tsx | 66 Ko |
| Pages Jaunes | pages/case-studies/PagesJaunesPage.tsx | 38 Ko |
| SQOOL Timeline | pages/case-studies/SqoolTimeline.tsx | 29 Ko |
| France VAE | pages/case-studies/FranceVaePage.tsx | 26 Ko |

## Assets

- Images : `public/images/` (organisées par projet, format WebP)
- Vidéos : `public/videos/` (MP4 compressées, par projet)
- Thumbnails : responsive avec suffixes `-400w`, `-800w`, `-1200w`
- CDN : Cloudinary pour optimisation serveur
- OG image : `public/og_victor_soussan.webp`

## Configuration

| Fichier | Rôle |
|---|---|
| `src/config/DESIGN_SYSTEM.ts` | Tokens design documentés (504 lignes) |
| `src/config/emailConfig.ts` | EmailJS service/template IDs |
| `src/config/styles.ts` | Constantes de style réutilisables |
| `src/utils/seo.ts` | Meta tags dynamiques, PROJECT_SEO par case study |
