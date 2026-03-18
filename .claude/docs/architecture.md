# Architecture technique

## Décisions structurantes

### SPA sans router library
Le routing est custom (pas de React Router). Chaque page est un overlay modal
piloté par un state boolean. La map `MODAL_ROUTES` dans App.tsx lie les URLs
aux setters. Ce choix simplifie le bundle et donne un contrôle total sur les
transitions (AnimatePresence), mais implique que toute nouvelle page nécessite :
1. Un state boolean dans App.tsx
2. Une entrée dans MODAL_ROUTES
3. Un rewrite dans vercel.json

### Tailwind via CDN
Tailwind n'est pas une dépendance npm. Il est chargé via `<script>` CDN dans
index.html. Conséquence : pas de purge build-time, pas de `@apply` dans les
fichiers CSS, pas de tailwind.config.js. Les classes utilitaires sont écrites
inline dans le JSX. Les tokens custom utilisent la syntaxe `bg-[#hex]`.

### Code splitting
Toutes les pages (9 case studies + pages principales) sont lazy-loaded via
`React.lazy()` + `Suspense`. Les vendor chunks sont séparés manuellement dans
vite.config.ts : react, framer-motion, icons.

### Bilinguisme
Pas de i18n library. Un objet `TRANSLATIONS` unique (data/translations.ts)
avec clés `.en` / `.fr`. Le state `lang` est un query param (`?lang=en`).
Les données bilingues dans les data files utilisent des champs suffixés
(`title_en`, `title_fr`) ou des objets imbriqués (`{ en: "", fr: "" }`).

### Images et médias
- Images statiques dans `public/images/` organisées par projet
- Optimisation Cloudinary via `src/utils/cloudinary.ts`
- Composant `LazyImage` avec Intersection Observer
- Lightbox desktop (`EnhancedLightbox`) et mobile (`MobileLightbox`)
- Vidéos compressées pour rester sous la limite Vercel (100 Mo)

### Prototypes interactifs
42 prototypes SQOOL Classe hébergés sur ui-motion-five.vercel.app,
intégrés via iframe. Données dans `sqoolPrototypesData.ts`.

## Patterns à respecter

### Ajouter une nouvelle page
1. Créer le composant dans `src/pages/`
2. Ajouter `const [isXOpen, setIsXOpen] = useState(false)` dans App.tsx
3. Ajouter l'entrée dans `MODAL_ROUTES`
4. Ajouter le lazy import : `const XPage = lazy(() => import('./pages/XPage'))`
5. Ajouter le rendu conditionnel avec AnimatePresence + Suspense
6. Ajouter le rewrite dans vercel.json

### Ajouter un case study
Même procédure que ci-dessus, plus :
1. Composant page dans `src/pages/case-studies/`
2. Composant executive summary dans `src/components/case-studies/`
3. Entrée dans le grid de WorkPage.tsx
4. SEO metadata dans `src/utils/seo.ts` (PROJECT_SEO)
5. Traductions dans translations.ts

### Ajouter un signal (blog post)
Ajouter un objet dans `src/data/signalsData.ts` avec tous les champs bilingues.
Pas de fichier séparé, pas de markdown : le contenu est inline dans le data file.
