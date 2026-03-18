# Déploiement et infrastructure

## Vercel

- **Projet** : victorsoussan-portfolio-2026
- **Org** : team_9H6gnuzDlPYWLmXsg4R2hhvs
- **Build command** : `vite build`
- **Output** : `dist/`
- **Node** : version par défaut Vercel
- **Framework** : Vite (auto-détecté)

## vercel.json

### Rewrites (SPA routing)
Toutes les routes (`/about`, `/work`, `/project/:path*`, etc.) sont rewritées
vers `/` pour que le routing client-side fonctionne. Toute nouvelle route
publique doit être ajoutée ici.

### Security headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

## Build

- **Bundler** : esbuild (minification)
- **Target** : ES2020
- **Chunks manuels** : vendor-react, vendor-framer, vendor-icons
- **Limite chunk** : 600 Ko (warning)
- **Source maps** : désactivées en production

## Contraintes

- Limite Vercel : 100 Mo par fichier. Les vidéos doivent être compressées.
- `.vercelignore` exclut `dist/`, vidéos lourdes, `node_modules/`
- Tailwind via CDN : pas de purge build-time, taille constante

## Scripts npm

| Script | Commande | Usage |
|---|---|---|
| `dev` | `vite` | Dev server local |
| `build` | `vite build` | Build production |
| `prerender` | `vite build && node prerender.mjs` | Build + rendu statique |
| `preview` | `vite preview` | Preview du build local |

## Environnement

- EmailJS : config dans `src/config/emailConfig.ts` (clés publiques, pas de secret)
- Cloudinary : utilitaires dans `src/utils/cloudinary.ts`
- UI Motion (prototypes) : hébergé séparément sur ui-motion-five.vercel.app
