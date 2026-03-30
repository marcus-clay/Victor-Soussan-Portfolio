# Ship to Show

Un framework en 7 phases pour transformer un prototype en case study portfolio, avec vidéos animées, contenu narratif et pack d'intégration. En une session de travail, assisté par un agent IA.

---

## À qui s'adresse ce framework

Designers produit, développeurs front-end, consultants qui construisent des prototypes et qui ont besoin de les documenter dans un portfolio professionnel. Aucune compétence vidéo ou motion design requise. Le framework repose sur un agent IA (Claude Code, Cursor, ou équivalent) qui exécute chaque phase à partir d'un prompt structuré.

## Ce que le framework produit

À partir d'un prototype fonctionnel (un fichier React, une maquette codée, un projet Figma implémenté), Ship to Show produit :

- Un case study bilingue (FR/EN) avec structure narrative
- 5 à 8 vidéos animées style Late Checkout Agency (autoplay, loop, fond sombre)
- Des screenshots Retina du prototype
- Un prototype déployé sur Vercel (URL publique)
- Un repo GitHub
- Un pack d'intégration autoportant pour le site portfolio

## Prérequis

| Outil | Rôle | Installation |
|---|---|---|
| **Node.js 18+** | Exécuter le prototype et les scripts | `brew install node` |
| **npm** | Gérer les dépendances | Inclus avec Node.js |
| **FFmpeg** | Encoder les vidéos | `brew install ffmpeg` |
| **Git** | Versionner le projet | `brew install git` |
| **GitHub CLI** | Créer le repo et pousser | `brew install gh` puis `gh auth login` |
| **Vercel CLI** | Déployer le prototype | `npm i -g vercel` |
| **Google Chrome** | Puppeteer l'utilise pour la capture | Installé sur la plupart des machines |
| **Un agent IA** | Exécuter les prompts | Claude Code, Cursor, ou équivalent |

Vérifier l'installation :
```bash
node --version && npm --version && ffmpeg -version | head -1 && git --version && gh --version && vercel --version
```

---

## Les 7 phases

```
PROTOTYPE BRUT
     │
     ▼
 1. CADRER        →  case-study v1, CLAUDE.md
     │
     ▼
 2. STRUCTURER    →  projet sur localhost
     │
     ▼
 3. ENRICHIR      →  prototype filmable
     │
     ▼
 4. FILMER        →  7 vidéos MP4 + screenshots
     │
     ▼
 5. RACONTER      →  case study FR/EN
     │
     ▼
 6. EMPAQUETER    →  GitHub, Vercel, fichier d'instructions
     │
     ▼
 7. PUBLIER       →  page projet sur le portfolio
```

---

## Phase 1 : CADRER

**Durée** : 15 min
**Entrée** : un fichier de code (App.jsx, un repo, un export Figma)
**Sortie** : `case-study.md` (v1), `CLAUDE.md`, mémoire projet

### Prompt

```
Analyse ce prototype. Identifie :
1. Le secteur d'activité et le contexte marché
2. Les utilisateurs cibles (rôle, contexte d'usage, pression)
3. Le problème adressé (avec un chiffre clé si possible)
4. Les fonctionnalités clés
5. Le point de vue de design (quelle hypothèse le prototype teste)

Rédige un executive summary de 1500 caractères pour un portfolio de
product design. Insère des inter-titres narratifs. Commence par une
section de contexte marché avec un chiffre clé.

Crée ensuite :
- Un fichier CLAUDE.md avec le positionnement du projet
- Un fichier de mémoire avec le contexte complet
```

### Checklist de sortie

- [ ] Secteur identifié
- [ ] Utilisateurs décrits (rôle, contexte, pression)
- [ ] Problème formulé avec un chiffre
- [ ] Point de vue de design explicite
- [ ] Executive summary de 1500 caractères
- [ ] CLAUDE.md créé

---

## Phase 2 : STRUCTURER

**Durée** : 10 min
**Entrée** : le fichier de code brut
**Sortie** : projet fonctionnel sur localhost

### Prompt

```
Crée un setup projet complet pour que ce prototype tourne en local :
- package.json avec les dépendances
- Config Vite (ou Next.js selon le projet)
- Tailwind CSS configuré
- index.html + point d'entrée
- npm install
- Lancement sur localhost

Stack minimale. Pas de sur-ingénierie.
```

### Checklist de sortie

- [ ] `npm install` sans erreur
- [ ] `npm run dev` démarre le serveur
- [ ] Le prototype s'affiche dans le navigateur
- [ ] Pas de console errors

### Point d'attention

Si le projet est sur un filesystem réseau (Google Drive, Dropbox), copier en local (`/tmp/` ou `~/Desktop/`) avant de lancer. Les file watchers de Vite/Tailwind ne fonctionnent pas correctement sur les filesystems distants.

---

## Phase 3 : ENRICHIR

**Durée** : 30 à 45 min
**Entrée** : le prototype fonctionnel + le cadrage
**Sortie** : prototype filmable avec parcours complets

### Prompt

```
Le prototype tourne sur localhost. Identifie les parcours utilisateurs
nécessaires pour produire 5 vidéos de démonstration :

1. Vue d'ensemble / triage (inbox, filtrage, sélection)
2. Fonctionnalité principale (l'interaction clé du produit)
3. Prise de décision et feedback (action, confirmation, impact)
4. Cas limite (faux positif, erreur, cas rapide)
5. Flux complet (enchaînement, métriques de session)

Pour chaque parcours, liste les interactions manquantes et implémente-les.
Chaque parcours doit être filmable de bout en bout.

Ajoute aussi :
- Des données variées par cas (pas les mêmes données partout)
- Des connexions simulées (Slack, email, CRM, export)
- Des micro-interactions (sons, animations de transition)
```

### Checklist de sortie

- [ ] 5 parcours identifiés et fonctionnels
- [ ] Données différentes pour chaque cas
- [ ] Intégrations simulées visibles
- [ ] Chaque parcours peut être démontré en 10 à 20 secondes

---

## Phase 4 : FILMER

**Durée** : 30 min
**Entrée** : les parcours définis + le prototype fonctionnel
**Sortie** : 5 à 8 vidéos MP4, 5 screenshots PNG

### Prompt

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
  │   ├── 01-scene-name.html
  │   ├── 02-scene-name.html
  │   └── ...
  └── output/

Spécifications :
- 1920x1080, 30 fps, H.264
- Fond noir, typographie Inter
- Animations CSS avec timeline commentée en haut de chaque fichier
- Capture frame par frame via Web Animations API
- Utilise le Chrome système (pas Chromium téléchargé)

Design tokens : reprendre les couleurs, rayons et espacements
du prototype.

Crée aussi un script de screenshots Retina (2x) du prototype réel
sur localhost pour 5 écrans clés.

Produis les vidéos suivantes :
[lister les 5 à 8 scénarios identifiés en phase 3]
```

### Technique clé : contrôle frame par frame

Le script capture.js utilise la Web Animations API pour contrôler le temps :

```javascript
// Pause toutes les animations
document.getAnimations({ subtree: true }).forEach(a => a.pause());

// Pour chaque frame, avancer le temps
document.getAnimations({ subtree: true }).forEach(a => {
  a.currentTime = currentTimeMs;
});
```

Les animations CSS dans les scènes HTML sont écrites avec des `animation-delay` qui définissent le storyboard. Le script avance le temps frame par frame et capture chaque état.

### Checklist de sortie

- [ ] Toutes les vidéos rendues en MP4
- [ ] Preview accessible (serveur HTTP local)
- [ ] Screenshots Retina capturés
- [ ] Vidéo du prototype réel capturée

---

## Phase 5 : RACONTER

**Durée** : 20 min
**Entrée** : le cadrage + les vidéos + les parcours
**Sortie** : `case-study.md` (FR), `case-study-en.md` (EN)

### Prompt

```
Rédige le case study en suivant cette structure narrative
(pattern Late Checkout Agency) :

1. Header (titre, sous-titre, catégorie, auteur)
2. Pourquoi cette expérimentation (contexte personnel, 3 paragraphes)
3. L'insight fondateur (le problème avec un chiffre)
4. VIDÉO : avant/après
5. La question de design (3 principes)
6. VIDÉO : flux de données / architecture
7-11. Une section par fonctionnalité, chacune avec :
    - Texte de contexte (2-3 paragraphes)
    - VIDÉO correspondante
    - Légende : titre + frustration utilisateur + bénéfice
12. Ce que j'ai appris (3 mécanismes transposables)
13. Stack + liens

Chaque vidéo a sa propre narration. Pas de grille de vidéos sans contexte.
Le texte cadre, les vidéos démontrent.

Produire en FR et EN.
Ton : praticien qui partage une expérimentation, pas un vendeur
qui fait la promotion d'un produit.
```

### Format des légendes vidéo

Chaque vidéo est suivie de :
- **Un titre en gras** (ce que la vidéo montre)
- **Frustration :** le problème utilisateur
- **Bénéfice :** la valeur apportée

### Checklist de sortie

- [ ] Case study FR complet
- [ ] Case study EN complet
- [ ] Chaque vidéo a sa légende frustration/bénéfice
- [ ] L'ordre des vidéos est narratif (pas numérique)
- [ ] Section « apprentissages » avec mécanismes transposables

---

## Phase 6 : EMPAQUETER

**Durée** : 15 min
**Entrée** : tous les livrables des phases précédentes
**Sortie** : repo GitHub, prototype Vercel, `PORTFOLIO-INTEGRATION.md`

### Prompt

```
Prépare le projet pour la publication :

1. Crée un .gitignore (node_modules, dist, .env, frames)
2. Initialise un repo git avec un commit structuré
3. Push sur GitHub (repo public)
4. Déploie le prototype sur Vercel (production)
5. Crée un fichier PORTFOLIO-INTEGRATION.md autoportant qui contient :
   - Métadonnées YAML du projet
   - Commandes de copie d'assets (source → portfolio)
   - Contenu intégral du case study, section par section
   - Inventaire des assets (vidéos, screenshots, avec positions)
   - Format des vidéos (autoplay/loop/muted/playsinline)
   - Format des légendes
   - Checklist de publication

Ce fichier sera transmis à une autre instance de Claude Code
dans le projet portfolio. Il doit être autoportant : contenir tout
le contenu, pas des références à d'autres fichiers.
```

### Checklist de sortie

- [ ] Repo GitHub créé et poussé
- [ ] Prototype déployé sur Vercel (URL publique)
- [ ] `PORTFOLIO-INTEGRATION.md` autoportant
- [ ] Le fichier est copié dans le projet portfolio

---

## Phase 7 : PUBLIER

**Durée** : variable (dépend du site portfolio)
**Entrée** : `PORTFOLIO-INTEGRATION.md` dans le projet portfolio
**Sortie** : page projet publiée

### Prompt (dans le projet portfolio)

```
Lis PORTFOLIO-INTEGRATION.md et implémente le case study comme
projet sur mon site. Le fichier contient toutes les instructions :
assets, contenu, structure de page, format des vidéos et légendes.
```

### Checklist de sortie

- [ ] Assets copiés dans le projet
- [ ] Page projet créée
- [ ] Vidéos en autoplay/loop/muted
- [ ] Légendes sous chaque vidéo
- [ ] og:image configuré
- [ ] Versions FR et EN
- [ ] Liens prototype et GitHub fonctionnels

---

## Récapitulatif des livrables

| Phase | Durée | Livrables |
|---|---|---|
| 1. Cadrer | 15 min | case-study v1, CLAUDE.md |
| 2. Structurer | 10 min | projet localhost |
| 3. Enrichir | 30-45 min | prototype filmable |
| 4. Filmer | 30 min | 7 vidéos + 5 screenshots |
| 5. Raconter | 20 min | case study FR/EN |
| 6. Empaqueter | 15 min | GitHub, Vercel, pack intégration |
| 7. Publier | variable | page portfolio |
| **Total** | **~2h30** | **case study complet publié** |

---

## Application : RiskOS

Ce framework a été conçu et testé sur le projet RiskOS (détection de fraude augmentée par IA agentique). Le projet complet est disponible sur :

- Prototype : https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app
- GitHub : https://github.com/marcus-clay/riskos-fraud-detection
- Portfolio : https://www.victorsoussan.fr/fr/projets/riskos

Le repo contient le pipeline vidéo réutilisable (`video-scenes/`), le fichier d'intégration (`PORTFOLIO-INTEGRATION.md`), et les deux versions du case study.
