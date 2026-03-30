# Ship to Show : démarrer un nouveau projet

Ce fichier est le point d'entrée pour appliquer le framework Ship to Show à n'importe quel prototype. Copier ce fichier dans le dossier du prototype, ouvrir Claude Code (ou un agent IA équivalent), et suivre les étapes dans l'ordre.

---

## Avant de commencer

### Vérifier les prérequis

```bash
node --version    # 18+
npm --version
ffmpeg -version | head -1
git --version
gh --version
vercel --version
```

Si un outil manque :
```bash
brew install node ffmpeg git gh
npm i -g vercel
gh auth login
```

### Préparer le dossier de travail

```bash
# Créer un dossier local (pas sur Google Drive ou Dropbox)
mkdir -p ~/Desktop/mon-projet
cp mon-prototype.jsx ~/Desktop/mon-projet/
cd ~/Desktop/mon-projet
```

Point important : ne pas travailler sur un filesystem réseau. Les file watchers de Vite et Tailwind ne fonctionnent pas correctement sur Google Drive ou Dropbox. Toujours travailler en local, synchroniser vers le cloud une fois terminé.

---

## Phase 1 : CADRER (15 min)

Ouvrir Claude Code dans le dossier du prototype et coller ce prompt :

```
Analyse ce prototype. Identifie :
1. Le secteur d'activité et le contexte marché
2. Les utilisateurs cibles (rôle, contexte d'usage, pression)
3. Le problème adressé (avec un chiffre clé si possible)
4. Les fonctionnalités clés
5. Le point de vue de design (quelle hypothèse le prototype teste)

Rédige un executive summary de 1500 caractères pour un portfolio
de product design. Insère des inter-titres narratifs. Commence
par une section de contexte marché avec un chiffre clé.

Crée ensuite :
- Un fichier case-study.md avec l'executive summary
- Un fichier CLAUDE.md avec le positionnement du projet
- Un fichier de mémoire projet

Catégorie portfolio : [préciser, ex: "Expérimentation UX agentiques"]
```

Adapter la catégorie portfolio au projet.

**Ce qu'on vérifie avant de passer à la suite** :
- Le secteur est identifié et crédible
- Les utilisateurs sont décrits avec leur contexte de pression
- Le problème est formulé avec un chiffre
- Le point de vue de design est explicite

---

## Phase 2 : STRUCTURER (10 min)

```
Crée un setup projet complet pour que ce prototype tourne en local :
- package.json avec les dépendances
- Config Vite
- Tailwind CSS configuré
- index.html + point d'entrée
- npm install
- Lancement sur localhost

Stack minimale. Pas de sur-ingénierie.
```

**Ce qu'on vérifie** :
- `npm run dev` démarre sans erreur
- Le prototype s'affiche dans le navigateur
- Pas de console errors

---

## Phase 3 : ENRICHIR (30 à 45 min)

```
Le prototype tourne sur localhost:[port]. Identifie les parcours
utilisateurs nécessaires pour produire 5 vidéos de démonstration.

Pour chaque parcours, liste les interactions manquantes et
implémente-les. Chaque parcours doit être filmable de bout en bout.

Ajoute aussi :
- Des données variées par cas (pas les mêmes données partout)
- Des connexions simulées vers des outils externes (Slack, email,
  CRM, export PDF)
- Des micro-interactions (sons, animations de transition, feedback
  visuel sur les actions)

Les 5 parcours types :
1. Vue d'ensemble / triage
2. Fonctionnalité principale (l'interaction clé)
3. Prise de décision et feedback (action + impact visible)
4. Cas limite (faux positif, erreur, résolution rapide)
5. Flux complet (enchaînement, métriques de session)
```

**Ce qu'on vérifie** :
- Chaque parcours se déroule sans bug
- Les données sont différentes entre les cas
- Les intégrations simulées sont visibles

---

## Phase 4 : FILMER (30 min)

```
Crée un pipeline de production vidéo :

Structure :
  video-scenes/
  ├── capture.js           (Puppeteer + FFmpeg)
  ├── scenes/
  │   ├── shared/
  │   │   ├── design-tokens.css
  │   │   ├── animations.css
  │   │   └── components.css
  │   ├── 01-[nom].html
  │   ├── 02-[nom].html
  │   └── ...
  └── output/

Spécifications vidéo :
- 1920x1080, 30 fps, H.264
- Fond noir, typographie Inter
- Animations CSS avec timeline commentée
- Capture frame par frame via Web Animations API
- Chrome système (PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1)

Design tokens : reprendre les couleurs et espacements du prototype.

Crée aussi un script de screenshots Retina (2x) du prototype
réel sur localhost.

Scénarios à filmer :
[lister les 5 parcours identifiés en phase 3, plus :
- une scène avant/après (workflow actuel vs. prototype)
- une scène de flux de données / architecture animée]
```

**Ce qu'on vérifie** :
- Toutes les vidéos sont rendues et lisibles
- Les animations sont fluides (pas de frames identiques)
- Les screenshots sont en Retina 2x

---

## Phase 5 : RACONTER (20 min)

```
Rédige le case study en suivant cette structure narrative
(pattern Late Checkout Agency) :

1. Header (titre, sous-titre, catégorie, auteur)
2. Pourquoi cette expérimentation (contexte personnel)
3. L'insight fondateur (le problème avec un chiffre)
4. VIDÉO : avant/après + légende
5. La question de design (principes)
6. VIDÉO : flux de données + légende
7-11. Une section par fonctionnalité, chacune avec :
    - Texte de contexte (2-3 paragraphes)
    - VIDÉO correspondante
    - Légende : titre + frustration utilisateur + bénéfice
12. Ce que j'ai appris (mécanismes transposables)
13. Stack + liens

Pas de grille de vidéos sans contexte. Chaque vidéo a sa narration.
Le texte cadre, les vidéos démontrent.

Produire en FR et EN.

Ton : praticien qui partage une expérimentation, pas un vendeur.
```

**Ce qu'on vérifie** :
- Chaque vidéo a sa légende frustration/bénéfice
- L'ordre des vidéos est narratif (pas l'ordre numérique)
- La section apprentissages identifie des mécanismes transposables
- Les deux langues sont complètes

---

## Phase 6 : EMPAQUETER (15 min)

```
Prépare le projet pour la publication :

1. .gitignore (node_modules, dist, .env, frames)
2. Initialise git, commit structuré
3. Push sur GitHub (repo public)
4. Déploie le prototype sur Vercel (production)
5. Crée PORTFOLIO-INTEGRATION.md autoportant avec :
   - Métadonnées YAML
   - Commandes de copie d'assets
   - Contenu intégral du case study section par section
   - Inventaire des assets avec positions dans la page
   - Format des vidéos et légendes
   - Checklist de publication

Le fichier doit être autoportant : une autre instance de Claude Code
doit pouvoir implémenter le case study sans contexte supplémentaire.

Copie PORTFOLIO-INTEGRATION.md dans :
[chemin du projet portfolio]
```

**Ce qu'on vérifie** :
- Le repo GitHub est public et complet
- Le prototype Vercel est accessible
- Le fichier d'intégration contient tout le contenu

---

## Phase 7 : PUBLIER (variable)

Dans le projet portfolio, ouvrir Claude Code et coller :

```
Lis PORTFOLIO-INTEGRATION.md et implémente le case study comme
projet sur mon site. Le fichier contient toutes les instructions :
assets, contenu, structure de page, format des vidéos et légendes.
```

**Ce qu'on vérifie** :
- La page est accessible
- Les vidéos sont en autoplay/loop/muted
- Les légendes sont sous chaque vidéo
- Les liens prototype et GitHub fonctionnent
- Les versions FR et EN sont complètes

---

## Résumé des temps

| Phase | Durée | Ce qu'on produit |
|---|---|---|
| 1. Cadrer | 15 min | Case study v1, CLAUDE.md |
| 2. Structurer | 10 min | Prototype localhost |
| 3. Enrichir | 30-45 min | Prototype filmable |
| 4. Filmer | 30 min | 7 vidéos + screenshots |
| 5. Raconter | 20 min | Case study FR/EN |
| 6. Empaqueter | 15 min | GitHub, Vercel, pack |
| 7. Publier | variable | Page portfolio |
| **Total** | **~2h30** | **Case study publié** |

---

## Après la publication

- Prendre les vidéos clés (2 ou 3) pour un post LinkedIn
- Utiliser le screenshot principal comme og:image
- Référencer le case study dans les propositions commerciales
- Ajouter le prototype Vercel au CV
