# Handoff : migration Next.js du portfolio Victor Soussan

Document de contexte complet pour la prochaine session. Aucune information perdue.

---

## 1. État actuel du projet

### Stack actuelle
- **Framework** : React 18.2 + TypeScript 5.2 + Vite 5.1.4
- **Styling** : Tailwind CSS 3.4 (CDN, pas installé comme dépendance build)
- **Animations** : Framer Motion 12.x
- **Icons** : Phosphor Icons 2.x (migration Lucide terminée)
- **Routing** : custom URL-based modal routing (pas de React Router actif malgré la dépendance)
- **Code splitting** : React.lazy + Suspense sur toutes les pages
- **Bilingual** : EN/FR via objets TRANSLATIONS, query param `?lang=en` / `?lang=fr`
- **Images** : Cloudinary CDN (cloud: dqohphelh) avec LQIP, srcSet responsive, lazy loading
- **Email** : EmailJS
- **PDF** : jsPDF (export CV)
- **Deploy** : Vercel, branche `feat/portfolio-redesign-v2`
- **Domaine** : victorsoussan.fr / www.victorsoussan.fr

### Git
- **Branche active** : `feat/portfolio-redesign-v2`
- **Branche principale** : `main`
- **Dernier commit** : `099e21d` feat: expand claude-code-figma-mcp signal to 2600-word article (FR+EN)

### Fichiers clés et tailles
```
src/App.tsx                          ~4800 lignes (homepage + routing + modals + sections)
src/pages/ExecutivePage.tsx           2185 lignes
src/pages/case-studies/ToolkitPage.tsx 2333 lignes
src/components/case-studies/FranceVaeFull.tsx 2280 lignes
src/components/case-studies/PagesJaunesFull.tsx 1940 lignes
src/components/QuoteGeneratorModal.tsx 1577 lignes
src/components/BentoGallery.tsx       1429 lignes
src/data/translations.ts              1002 lignes
```

---

## 2. Pourquoi migrer vers Next.js

### Problème SEO critique (Google Search Console)
- **220 pages non indexées** sur 227 découvertes
- **7 pages indexées** seulement (homepage + quelques variantes JS-rendues)
- **79 erreurs 404** : Vercel retourne 404 sur les routes SPA accédées directement (`/work`, `/about`, etc.) parce qu'il n'y a pas de fichier HTML physique
- **71 "crawled, not indexed"** : Google rend le JS mais juge le contenu insuffisant ou dupliqué
- **32 redirections** : variantes d'URL (`?lang=en`, `?lang=fr`, trailing slash)
- **21 canoniques incorrectes** : toutes les pages pointaient vers la homepage comme canonical (corrigé dynamiquement dans cette session, mais le fix JS n'est pas visible dans le HTML source)
- **14 noindex** : previews Vercel ou variantes

### Problème GEO (Generative Engine Optimization)
- Les LLMs (ChatGPT, Perplexity, Claude) crawlent le HTML statique, pas le JS rendu
- Le contenu du site n'apparaît pas dans les réponses des LLMs
- Le JSON-LD existe et est riche, mais le contenu textuel est invisible sans JS

### Backlinks
- Seulement 5 liens externes : medium.com (2), dixit-distribution.com (1), linkedin.com (1), x.com (1)
- Textes d'ancrage : tous des variantes de l'URL brute, aucun texte descriptif

---

## 3. Décisions d'architecture confirmées

| Décision | Choix | Raison |
|---|---|---|
| Framework | Next.js App Router | SSG natif, intégration Vercel, meta tags dans le HTML source |
| Rendu | SSG (Static Site Generation) | Contenu statique, parfait pour SSG |
| i18n | Path prefix (`/fr/`, `/en/`) | Meilleur SEO que query param, URLs distinctes par langue |
| Pages | Pages complètes avec transitions | Plus de modal overlays, chaque route = vraie page |
| Mobile nav | Burger menu | Remplace le menu bottom tab actuel |
| Transitions | Framer Motion layout animations | Préserve le feel fluide sans modals |
| CMS | Sanity (projet w6bejsy8, dataset production) | Après la migration Next.js |
| Branche | `feat/nextjs-migration` (nouvelle branche) | Preview Vercel automatique, main intacte |
| Staging | Vercel preview deployments | Zéro config, URL auto-générée par branche |

---

## 4. Architecture Next.js cible

```
app/
  layout.tsx                    # Root layout (nav, footer, ThemeProvider, LanguageProvider)
  page.tsx                      # Homepage (hero + sections)

  [lang]/                       # i18n path prefix (/fr/, /en/)
    layout.tsx                  # Language-aware layout
    page.tsx                    # Localized homepage
    about/page.tsx
    work/page.tsx
    services/page.tsx
    consulting/page.tsx
    signals/page.tsx
    visual-archive/page.tsx
    testimonials/page.tsx
    contact/page.tsx
    resume/page.tsx
    quote/page.tsx
    presentation/page.tsx

    signal/
      [id]/page.tsx             # 17 signaux, SSG via generateStaticParams

    project/
      [id]/
        [view]/page.tsx         # 8 projets x 3 vues (summary/full/gallery), SSG

    guide/
      claude-code/
        page.tsx                # Index guide
        [slug]/page.tsx         # 9 chapitres, SSG

  sitemap.ts                    # Auto-generated depuis les data files
  robots.ts                     # Config robots
  not-found.tsx                 # 404 page

components/                     # Composants existants (migrer tels quels)
  media/                        # CloudinaryImage, EnhancedLightbox, LazyImage, etc.
  prototype/                    # PrototypeCard, PrototypeCarousel, etc.
  case-studies/                 # Executive + Full components par projet
  sections/                     # HeroSection, ProjectsSection, etc.
  ui/                           # InfiniteGrid, ResponsiveImage

data/                           # Fichiers de données existants (migrer tels quels)
  signalsData.ts                # 17 signaux avec body_long EN/FR
  translations.ts               # TRANSLATIONS object
  projectsData.ts               # Données projets
  testimonialsData.ts           # 12 témoignages
  consultingData.ts             # JTBD framework, offres, scénarios
  careerData.ts                 # Timeline carrière
  galleryData.ts                # Visual archive
  guideClaudeCodeData.ts        # 9 chapitres du guide
  caseStudyTranslations/        # 9 fichiers de traductions études de cas
  articles/                     # Source MD + HTML des articles enrichis

config/                         # Design tokens, email config
hooks/                          # Custom hooks
utils/                          # Cloudinary, smooth scroll, seo

public/                         # Static assets (identique)
  images/                       # 150+ images
  videos/
  logos/
  sounds/
```

---

## 5. Routes complètes à migrer

### Routes statiques (11)

| Route actuelle | Page Next.js | Titre |
|---|---|---|
| `/testimonials` | `[lang]/testimonials/page.tsx` | Témoignages |
| `/about` | `[lang]/about/page.tsx` | À propos |
| `/work` | `[lang]/work/page.tsx` | Projets |
| `/resume` | `[lang]/resume/page.tsx` | CV |
| `/contact` | `[lang]/contact/page.tsx` | Contact |
| `/quote` | `[lang]/quote/page.tsx` | Demande de devis |
| `/presentation` | `[lang]/presentation/page.tsx` | Présentation Executive |
| `/services` | `[lang]/services/page.tsx` | Expertises |
| `/visual-archive` | `[lang]/visual-archive/page.tsx` | Gallery |
| `/signals` | `[lang]/signals/page.tsx` | Blog |
| `/consulting` | `[lang]/consulting/page.tsx` | Consulting |

### Routes dynamiques : signaux (17)

| ID | Titre EN |
|---|---|
| `hiring-solo-designer` | Hiring designers when you are the only designer |
| `design-thinking-public-service` | Running design thinking workshops in a public service context |
| `roadmap-zero-to-one` | Building a product roadmap when the product does not exist yet |
| `design-system-five-brands` | A design system for five brands: the real challenge |
| `ai-prototyping-50-apps` | 50 apps in one year: what AI prototyping actually taught me |
| `scoping-is-the-work` | Design scoping is 80% of the work |
| `designer-to-lead` | Moving from designer to design lead: what nobody tells you |
| `designing-for-unwilling-users` | Designing for 500,000 users who never asked for your product |
| `storybook-negotiation` | Storybook as a negotiation tool with developers |
| `ai-training-non-designers` | Training non-designers on generative AI: field notes |
| `delivery-cycles` | Why I organize design work in seasons, not sprints |
| `structurer-le-flou` | When the product direction is unclear, design creates the clarity |
| `culture-design-organisation` | How a design culture actually takes root in a product org |
| `binome-pm-designer` | The PM-Designer partnership: three principles that actually work |
| `claude-code-figma-mcp` | Claude Code and Figma MCP: designing and implementing without switching tools |
| `design-system-figma-claude-code` | Designing a design system in Figma, then implementing it with Claude Code |
| `claude-code-full-project` | Using Claude Code across an entire product design project |

### Routes dynamiques : projets (8 x 3 vues = 24)

| Projet ID | Vues |
|---|---|
| `toolkit` | summary, full, gallery |
| `dailymotion` | summary, full, gallery |
| `connect` | summary, full, gallery |
| `sqool` | summary, full, gallery |
| `sqool-classe` | summary, full, gallery |
| `france-vae` | summary, full, gallery |
| `pagesjaunes` | summary, full, gallery |
| `androidwear` | summary, full, gallery |

### Routes dynamiques : guide Claude Code (1 index + 9 chapitres)

Route index : `/guide/claude-code`
Chapitres : `ch1` a `ch9` (slugs dans guideClaudeCodeData.ts)

---

## 6. Phases de migration

### Phase 0 : Setup (30 min)
- Créer branche `feat/nextjs-migration`
- `npx create-next-app@latest` avec App Router, TypeScript, Tailwind
- Configurer `next.config.ts` : images (Cloudinary), redirects, headers CSP
- Installer Tailwind comme dépendance build (remplacer le CDN)
- Copier `public/` (images, videos, logos, sounds, robots.txt)
- Configurer les fonts (Inter via next/font)

### Phase 1 : Layout + providers (1h)
- **ThemeProvider** : context React pour `systemTheme` (actuellement props passées partout)
- **LanguageProvider** : context React pour `lang`, basé sur le segment `[lang]` de l'URL
- **Nav** : extraire la navigation de App.tsx (~200 lignes), adapter pour Next.js Link
- **Footer** : extraire le footer de App.tsx (~100 lignes)
- Middleware i18n : rediriger `/` vers `/en/` ou `/fr/` selon `Accept-Language`

### Phase 2 : Homepage (1-2h)
- Porter les sections homepage vers `app/[lang]/page.tsx`
- Sections déjà partiellement extraites dans `components/sections/`
- App.tsx contient encore ~3000 lignes de sections inline
- Les cards projet linkent vers les vraies pages (`/en/project/toolkit/summary`)

### Phase 3 : Pages statiques (1-2h)
- Migrer chaque page modale vers une vraie page Next.js
- Retirer le wrapper `motion.div fixed inset-0` (plus de modal overlay)
- Ajouter `generateMetadata()` pour les meta tags SSR
- Les composants existants (WorkPage, AboutPage, etc.) restent quasi identiques

### Phase 4 : Pages dynamiques (1h)
- `signal/[id]/page.tsx` avec `generateStaticParams()` pour SSG des 17 signaux
- `project/[id]/[view]/page.tsx` avec SSG des 8 projets x 3 vues
- `guide/claude-code/[slug]/page.tsx` avec SSG des 9 chapitres
- Chaque page a ses propres meta tags via `generateMetadata()`

### Phase 5 : SEO automatisé (30 min)
- `app/sitemap.ts` : génère le sitemap depuis les data files (remplace le XML statique)
- `app/robots.ts` : config robots
- JSON-LD intégré dans les pages (pas injecté en JS)
- Canonical URLs automatiques via Next.js
- hreflang automatique via le middleware i18n

### Phase 6 : Config Vercel + QA (1h)
- `next.config.ts` : redirects (anciennes URLs vers nouvelles), headers CSP
- Supprimer `vercel.json` (les rewrites deviennent des redirects Next.js)
- Tester toutes les routes
- Vérifier les meta tags dans le HTML source (`view-source:`)
- Lighthouse audit
- Resoumettre le sitemap dans Google Search Console

---

## 7. État global du App.tsx actuel

### Modal state management
```typescript
// 11 boolean states pour les modales
setIsTestimonialsOpen, setIsBioOpen, setIsWorkOpen, setIsResumeOpen,
setIsBookingOpen, setIsQuoteGeneratorOpen, setIsExecutiveOpen,
setIsServicesPageOpen, setIsVisualArchiveOpen, setIsSignalsOpen, setIsConsultingOpen

// États dynamiques
setOpenSignalId(null | string)        // Signal detail
setGuideView(null | string)           // Guide Claude Code chapter
setOpenProject(null | { project: string; viewMode: string })  // Case study
```

### Theme management
```typescript
themeMode: 'system' | 'light' | 'dark'   // User preference
systemTheme: 'light' | 'dark'             // Computed via matchMedia
// Pas de localStorage, reset au reload
// Toggle cycle: light -> dark -> system -> light
```

### Language management
```typescript
lang: 'en' | 'fr'
// Source: URL query param ?lang=en ou ?lang=fr
// Fallback: navigator.language
// Default: 'en'
```

### Key functions
```typescript
openModalWithUrl(path: string)    // Ferme toutes les modales, ouvre une, pushState
closeModalWithUrl(setterFn)       // Ferme une modale, reset à /?lang=en
handleProjectOpen(id, viewMode)   // Ouvre un case study
handleProjectClose()              // Ferme et retourne à /work si ouvert depuis l'index
```

---

## 8. Composants existants (inventaire complet)

### Pages (src/pages/)
| Fichier | Lignes | Rôle |
|---|---|---|
| AboutPage.tsx | 606 | Bio et carrière |
| ConsultingPage.tsx | 981 | Offres consulting |
| ExecutivePage.tsx | 2185 | Deck présentation |
| GuideClaudeCodePage.tsx | 577 | Guide Claude Code |
| HomePageV2.tsx | 849 | Homepage alternative (V2) |
| ServicesPage.tsx | 499 | Expertises |
| SignalDetailPage.tsx | 345 | Détail d'un signal/article |
| SignalsPage.tsx | 260 | Liste des signaux/blog |
| VisualArchivePage.tsx | 427 | Galerie visuelle |
| WorkPage.tsx | 357 | Liste des projets |

### Case studies (src/pages/case-studies/)
| Fichier | Lignes | Projet |
|---|---|---|
| AndroidWearPage.tsx | 1203 | PagesJaunes Android Wear |
| ConnectPage.tsx | 1081 | SQOOL Connect |
| DailymotionPage.tsx | 1604 | Dailymotion |
| FranceVaePage.tsx | 537 | France VAE |
| PagesJaunesPage.tsx | 701 | PagesJaunes |
| SqoolClassePage.tsx | 866 | SQOOL Classe |
| SqoolPage.tsx | 1490 | SQOOL Suite |
| SqoolTimeline.tsx | 483 | SQOOL Timeline |
| ToolkitPage.tsx | 2333 | Toolkit |

### Executive + Full components (src/components/case-studies/)
| Fichier | Lignes |
|---|---|
| ConnectExecutive.tsx | 1377 |
| DailymotionExecutive.tsx | 1176 |
| FranceVaeExecutive.tsx | 986 |
| FranceVaeFull.tsx | 2280 |
| PagesJaunesExecutive.tsx | 1357 |
| PagesJaunesFull.tsx | 1940 |
| SqoolClasseExecutive.tsx | 1264 |
| SqoolExecutive.tsx | 1384 |
| ToolkitExecutive.tsx | 1280 |
| ToolkitShowcase.tsx | 596 |

### Media (src/components/media/)
CloudinaryImage.tsx (147), EnhancedLightbox.tsx (683), LazyImage.tsx (80), MobileLightbox.tsx (334), ProgressiveVideo.tsx (283), TappableMedia.tsx (330)

### Sections homepage (src/components/sections/)
HeroSection.tsx (122), ProjectsSection.tsx (373), BiographySection.tsx (239), ServicesSection.tsx (308), TestimonialsSection.tsx (142), LabSection.tsx (138)

NOTE : ces 6 sections sont créées mais PAS encore wired dans App.tsx. App.tsx contient encore le JSX inline.

### Autres composants
BentoGallery.tsx (1429), CareerCarousel.tsx (333), CaseStudyTOCSidebar.tsx (350), DiagramProductEvolution.tsx (311), ErrorBoundary.tsx (54), GallerySidebar.tsx (137), IframeModal.tsx (309), ProductEvolutionTimeline.tsx (446), QuoteGeneratorModal.tsx (1577)

### Prototype (src/components/prototype/)
PrototypeCard.tsx (93), PrototypeCarousel.tsx (549), PrototypeFinderGallery.tsx (585), PrototypeLightbox.tsx (272)

### UI (src/components/ui/)
InfiniteGrid.tsx (120), ResponsiveImage.tsx (76)

---

## 9. Données et contenu

### Fichiers de données (src/data/)
| Fichier | Lignes | Exports principaux |
|---|---|---|
| signalsData.ts | ~200 | SIGNALS (17 articles), FEATURED_SIGNAL_IDS, CATEGORY_COLORS, CATEGORY_LABELS |
| translations.ts | 1002 | TRANSLATIONS (objet EN/FR complet pour UI copy) |
| consultingData.ts | 513 | LIFECYCLE_PHASES, OFFERINGS, SCENARIOS, REFERENCES, DELIVERY_MODES |
| careerData.ts | 273 | Timeline carrière (11 périodes, 2005-2026) |
| galleryData.ts | 208 | GALLERY_PROJECTS, ALL_GALLERY_ITEMS |
| guideClaudeCodeData.ts | 792 | GUIDE_META, GUIDE_CHAPTERS (9 chapitres, 5909 mots) |
| testimonialsData.ts | 188 | 12 témoignages catégorisés |
| projectsData.ts | ~150 | 6 projets featured |
| labData.ts | 20 | LAB_PREVIEWS |
| sqoolPrototypesData.ts | 178 | Prototypes SQOOL |
| resourcesData.ts | ~50 | Ressources externes |
| caseStudyTranslations/ | 9 fichiers | Traductions par projet |

### Utilitaires (src/utils/)
| Fichier | Exports |
|---|---|
| seo.ts | updateMetaTags(seo, path?), injectJsonLd(), PROJECT_SEO, DEFAULT_SEO |
| cloudinary.ts | cloudinaryUrl(), cloudinaryBlurUrl(), cloudinarySrcSet(), presets |
| smoothScroll.ts | smoothScrollTo() |

### Config (src/config/)
| Fichier | Exports |
|---|---|
| DESIGN_SYSTEM.ts | COLORS, TYPOGRAPHY, SPACING, LAYOUT, BUTTON_STYLES, etc. |
| emailConfig.ts | EMAILJS_CONFIG (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) |
| styles.ts | IMAGE_HOVER_SCALE, CLICKABLE_IMAGE_CONTAINER |

### Hooks (src/hooks/)
| Fichier | Exports |
|---|---|
| useMobileLightboxGestures.ts | Hook pour gestures mobile (zoom, pan, swipe) |
| useIframeLifecycle.ts | Hook pour lifecycle iframe |

---

## 10. Design system tokens

### Couleurs
- Brand blue (CTA) : `#2D5CF3`, hover : `#2450d9`
- Dark background : `#0a0a0a`
- Light background : `#FCFCFD`
- Dark cards : `#1D1D1F`
- Light cards : `white`
- Dark borders : `white/5` to `white/10`
- Light borders : `gray-100` to `gray-200`

### Boutons
- Primary CTA : `bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md`
- Toujours bleu, light et dark mode
- `rounded-full font-medium inline-flex gap-2`

### Header pattern (pages)
```html
<header class="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 | bg-[#FCFCFD]/80">
  <div class="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
    <span class="font-semibold text-lg tracking-[-0.02em]">{title}</span>
    <button class="relative p-3 rounded-full before:absolute before:inset-[-12px]">
      <X size={24} />
    </button>
  </div>
</header>
```

### Typographie
- Headings : `font-bold tracking-[-0.02em]` ou `tracking-[-0.03em]`
- Body : `text-sm` to `text-base`, `leading-relaxed`
- Dark : `text-white` (headings), `text-gray-400` (body)
- Light : `text-gray-900` (headings), `text-gray-600` (body)
- Font : Inter (Google Fonts)

---

## 11. SEO et structured data existants

### JSON-LD dans index.html
- **Person** : Victor Soussan, jobTitle, knowsAbout, credentials, worksFor
- **WebSite** : Portfolio metadata
- **ItemList** : 7 case studies avec metadata complètes
- **ProfessionalService** : 5 stars, 14 reviews, 3 service offerings
- **Review** : 14 témoignages avec author, date, rating
- **BreadcrumbList** : Home > Projects > About > Testimonials > Contact

### Runtime SEO (src/utils/seo.ts)
- `PROJECT_SEO` : meta tags par projet (8 projets)
- `DEFAULT_SEO` : meta tags par défaut
- `updateMetaTags(seo, path?)` : met à jour title, description, og:*, twitter:*, canonical, hreflang
- `injectJsonLd(projectId, seo)` : injecte un schema CreativeWork dynamiquement

### Corrections appliquées dans cette session
- Canonical URL dynamique par route (plus statique sur homepage)
- hreflang dynamique par route
- og:url dynamique par route
- Sitemap étendu : +17 signaux, +4 pages, +1 guide, +1 case study

---

## 12. Vercel config actuelle

### vercel.json
- Rewrites : toutes les routes SPA redirigées vers `/` (pattern SPA classique)
- Headers de sécurité : CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- CSP autorise : googletagmanager, clarity.ms, fonts.googleapis, emailjs, cloudinary, youtube, vimeo

### Build actuel
- Command : `vite build` (pas le prerender script)
- Output : `dist/`
- Le script `prerender.mjs` (Puppeteer) existe mais n'est PAS utilisé en production

### Après migration
- Vercel détecte Next.js automatiquement
- `vercel.json` sera remplacé par `next.config.ts` (redirects, headers)
- Build : `next build` (auto-détecté)

---

## 13. Accessibilité (corrections de cette session)

### Appliqué
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` sur 10 modales
- `aria-label="Close"` sur les boutons de fermeture
- Skip-to-content link (`<a href="#main-content">`)
- `<main id="main-content">` wrapper sémantique
- `<header>` existant sur toutes les pages modales

### Encore manquant
- Focus trap dans les modales
- `<article>` sur les case studies
- Video `<track>` pour sous-titres
- Toggle UI pour les modes accessibilité (contrast/dyslexie, CSS existe mais pas exposé)
- `text-gray-400` sur fond sombre : ratio de contraste limite

---

## 14. Contenu et articles

### Article enrichi (cette session)
- Signal `claude-code-figma-mcp` : de 200 mots à 2 600 FR / 2 223 EN
- Structure MOFU, 7 sections
- Source MD + HTML dans `src/data/articles/`
- Intégré dans `signalsData.ts` (body_long_en, body_long_fr)

### 16 signaux restants à enrichir
Tous entre 6 et 111 mots. Cible : 1 000 a 3 000 mots chacun.
Priorité : les 5 signaux AI, puis methodology (4), puis leadership (3), strategy (3), craft (2).

### Guide Claude Code
9 chapitres, 5 909 mots total. Déjà bien structuré.
Prévu pour publication sur Medium en 3 articles.

### Tone guidelines pour les articles
MOFU/TOFU/BOFU. Posture : Clay Christensen (JTBD), Luke Wroblewski, Sundar Pichai, Macron (contexte FR), Victor (praticien). Ton mature, professionnel, pas de jargon, pas de bullshit, pas de posture de supériorité. Transmission inspirante, exécutif, bien articulé. Contexte éducation/numérique France solide. Données quali, impact sur efficacité/facilité/gain. Pas de tonalité LLM, pas de « Ce n'est pas X, c'est Y », pas de phrases staccato, pas de passif-agressif. Lecteurs = pairs du réseau, humains et authentiques.

---

## 15. Dépendances à gérer pendant la migration

### À conserver
- react 18.2, react-dom 18.2
- framer-motion 12.x
- @phosphor-icons/react 2.x
- @emailjs/browser 4.x
- jspdf 3.x

### À retirer
- vite, @vitejs/plugin-react (remplacés par Next.js)
- react-helmet-async (remplacé par generateMetadata)
- react-router-dom (jamais utilisé activement, routing custom)
- puppeteer (prerender script obsolète)

### À ajouter
- next (latest)
- @next/font (optionnel, pour Inter)
- tailwindcss (déjà en devDeps, mais configurer pour build-time au lieu de CDN)

---

## 16. Risques et points d'attention

| Risque | Impact | Mitigation |
|---|---|---|
| App.tsx trop couplé (4800 lignes) | Migration longue | Migrer section par section, pas tout d'un coup |
| Framer Motion AnimatePresence entre pages | Perte du feel fluide | next-view-transitions ou Framer layout animations |
| Tailwind CDN vs installed | Possible différences de rendu | Tester visuellement chaque page |
| emailConfig.ts contient des clés API | Ne pas exposer côté serveur | Garder en client component |
| 150+ images dans public/ | Build time long | Cloudinary déjà utilisé, images optimisées |
| Case study pages très longues (2000+ lignes) | Complexité de migration | Les composants ne changent pas, juste le wrapper |
| Prerender script (scripts/prerender.mjs) | Confusion sur le build | Le supprimer après migration |

---

## 17. Sanity CMS (pour après la migration)

- **Compte** : créé sur sanity.io/manage
- **Projet** : w6bejsy8
- **Dataset** : production
- **CLI** : `npm create sanity@latest -- --project w6bejsy8 --dataset production --template clean`
- **Plan** : gratuit (3 users, 500k API CDN requests/mois)
- **Intégration** : après Next.js, dans un dossier `/studio` ou repo séparé
- **Schemas prévus** : project, blogPost, page, pageTemplate, siteSettings
