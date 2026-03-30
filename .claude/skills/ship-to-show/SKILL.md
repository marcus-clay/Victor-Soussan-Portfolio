---
name: ship-to-show
description: >
  Framework en 7 phases pour transformer un prototype en case study portfolio avec
  vidéos animées, contenu narratif bilingue et pack d'intégration. Déclencher quand
  l'utilisateur veut documenter un prototype, créer un case study, produire des vidéos
  de démonstration d'une interface, ou publier un projet dans un portfolio. Entrée :
  un fichier de code ou un prototype. Sortie : case study complet publié avec vidéos.
---

# Ship to Show

Framework en 7 phases pour transformer un prototype en case study portfolio.

## Quand utiliser cette skill

- L'utilisateur a un prototype (React, Vue, HTML, Figma exporté) et veut le documenter
- L'utilisateur veut créer un case study pour son portfolio
- L'utilisateur veut produire des vidéos de démonstration d'une interface
- L'utilisateur veut publier un projet de prototype sur son site

## Prérequis à vérifier

Avant de démarrer, vérifier que les outils sont installés :

```bash
node --version && npm --version && ffmpeg -version | head -1 && git --version && gh --version && vercel --version
```

Si un outil manque, indiquer la commande d'installation (macOS) :
- Node.js : `brew install node`
- FFmpeg : `brew install ffmpeg`
- Git : `brew install git`
- GitHub CLI : `brew install gh` puis `gh auth login`
- Vercel CLI : `npm i -g vercel`

## Les 7 phases

```
1. CADRER       →  Identifier secteur, utilisateurs, problème, point de vue de design
2. STRUCTURER   →  Rendre le prototype exécutable en local
3. ENRICHIR     →  Ajouter les parcours manquants pour produire 5 vidéos
4. FILMER       →  Produire les vidéos via Puppeteer + FFmpeg
5. RACONTER     →  Rédiger le case study avec structure narrative et légendes
6. EMPAQUETER   →  GitHub, Vercel, fichier d'intégration autoportant
7. PUBLIER      →  Intégrer dans le site portfolio
```

Exécuter les phases séquentiellement. Chaque phase produit un livrable concret avant de passer à la suivante. Ne pas compresser les phases.

---

## Phase 1 : CADRER (15 min)

**Entrée** : un fichier de code ou un prototype
**Sortie** : case-study.md (v1), CLAUDE.md, mémoire projet

### Actions

1. Lire le code source du prototype
2. Identifier :
   - Le secteur d'activité et le contexte marché
   - Les utilisateurs cibles (rôle, contexte d'usage, pression)
   - Le problème adressé (avec un chiffre clé si possible)
   - Les fonctionnalités clés existantes
   - Le point de vue de design (quelle hypothèse le prototype teste)
3. Rédiger un executive summary de 1500 caractères avec inter-titres narratifs
4. Créer un CLAUDE.md avec le positionnement du projet
5. Créer un fichier mémoire avec le contexte complet

### Checklist

- [ ] Secteur identifié
- [ ] Utilisateurs décrits (rôle, contexte, pression)
- [ ] Problème formulé avec un chiffre
- [ ] Point de vue de design explicite
- [ ] Executive summary rédigé
- [ ] CLAUDE.md créé

---

## Phase 2 : STRUCTURER (10 min)

**Entrée** : le fichier de code brut
**Sortie** : projet fonctionnel sur localhost

### Actions

1. Créer package.json avec les dépendances détectées
2. Configurer le build tool (Vite recommandé)
3. Configurer Tailwind CSS si utilisé
4. Créer index.html et point d'entrée
5. npm install
6. Lancer sur localhost

### Point d'attention

Si le projet est sur un filesystem réseau (Google Drive, Dropbox, OneDrive), copier en local avant de lancer. Les file watchers ne fonctionnent pas sur les filesystems distants.

### Checklist

- [ ] npm install sans erreur
- [ ] npm run dev démarre le serveur
- [ ] Le prototype s'affiche dans le navigateur
- [ ] Pas de console errors

---

## Phase 3 : ENRICHIR (30-45 min)

**Entrée** : le prototype fonctionnel + le cadrage
**Sortie** : prototype filmable avec parcours complets

### Actions

1. Identifier 5 parcours filmables :
   - Vue d'ensemble / triage (inbox, filtrage, sélection)
   - Fonctionnalité principale (l'interaction clé du produit)
   - Prise de décision et feedback (action, confirmation, impact)
   - Cas limite (faux positif, erreur, cas rapide)
   - Flux complet (enchaînement, métriques de session)
2. Lister les interactions manquantes pour chaque parcours
3. Implémenter les interactions manquantes
4. Ajouter des données variées par cas
5. Ajouter des connexions simulées (Slack, email, CRM, export)
6. Ajouter des micro-interactions (animations, feedback sonore si pertinent)

### Checklist

- [ ] 5 parcours identifiés et fonctionnels
- [ ] Données différentes pour chaque cas
- [ ] Intégrations simulées visibles
- [ ] Chaque parcours filmable en 10 à 20 secondes

---

## Phase 4 : FILMER (30 min)

**Entrée** : les parcours définis + le prototype fonctionnel
**Sortie** : 5 à 8 vidéos MP4, 5 screenshots PNG

### Actions

1. Créer la structure du pipeline vidéo :
```
video-scenes/
├── capture.js
├── scenes/
│   ├── shared/
│   │   ├── design-tokens.css
│   │   ├── animations.css
│   │   └── components.css
│   ├── 01-scene.html
│   └── ...
└── output/
```

2. Extraire les design tokens du prototype (couleurs, typo, espacements, rayons)
3. Créer les animations CSS partagées (fadeIn, slideUp, scaleIn, stagger, typing)
4. Pour chaque scène, créer un fichier HTML avec :
   - Un storyboard temporel en commentaire CSS
   - Des animations CSS timeline contrôlables frame par frame
   - Le markup qui reproduit l'interface du prototype
5. Créer capture.js (Puppeteer + FFmpeg) avec contrôle via Web Animations API
6. Rendre toutes les vidéos
7. Capturer 5 screenshots Retina du prototype réel

### Technique clé : contrôle frame par frame

```javascript
// Pause toutes les animations
document.getAnimations({ subtree: true }).forEach(a => a.pause());

// Pour chaque frame, avancer le temps
document.getAnimations({ subtree: true }).forEach(a => {
  a.currentTime = currentTimeMs;
});
```

### Spécifications vidéo

- 1920x1080
- 30 fps
- H.264 (MP4) + WebM optionnel
- Fond noir (#0a0a0a)
- Typographie Inter (Google Fonts)
- Durée 8 à 20 secondes par vidéo

### Checklist

- [ ] Toutes les vidéos rendues en MP4
- [ ] Preview accessible (serveur HTTP local)
- [ ] Screenshots Retina capturés
- [ ] Qualité visuelle vérifiée

---

## Phase 5 : RACONTER (20 min)

**Entrée** : le cadrage + les vidéos + les parcours
**Sortie** : case-study.md (FR), case-study-en.md (EN)

### Actions

1. Rédiger le case study avec la structure narrative suivante :
   - Header (titre, sous-titre, catégorie, auteur)
   - Image hero (pleine largeur)
   - Intention de l'expérimentation (contexte personnel, 3 paragraphes)
   - L'insight fondateur (le problème avec un chiffre)
   - VIDÉO : avant/après (ou comparatif)
   - La question de design (principes directeurs)
   - VIDÉO : flux de données / architecture
   - Une section par fonctionnalité (texte + vidéo + légende)
   - Apprentissages (mécanismes transposables)
   - Stack + liens

2. Chaque vidéo est accompagnée de sa légende :
   - **Titre en gras** (ce que la vidéo montre)
   - **Frustration :** le problème utilisateur
   - **Bénéfice :** la valeur apportée

3. Pas de grille de vidéos sans contexte. Chaque vidéo a sa propre narration.

4. Produire les versions FR et EN

### Ton

Praticien qui partage une expérimentation. Pas un vendeur qui fait la promotion d'un produit. Titres spécifiques et professionnels (pas de langage familier). Structure visible : problème, mécanisme, implication.

### Checklist

- [ ] Case study FR complet
- [ ] Case study EN complet
- [ ] Chaque vidéo a sa légende frustration/bénéfice
- [ ] Section apprentissages avec mécanismes transposables
- [ ] Titres de section narratifs et professionnels

---

## Phase 6 : EMPAQUETER (15 min)

**Entrée** : tous les livrables des phases précédentes
**Sortie** : repo GitHub, prototype Vercel, PORTFOLIO-INTEGRATION.md

### Actions

1. Créer .gitignore (node_modules, dist, .env, frames)
2. Initialiser repo git, commit structuré
3. Push sur GitHub (repo public)
4. Déployer le prototype sur Vercel (production)
5. Créer PORTFOLIO-INTEGRATION.md autoportant :
   - Métadonnées YAML du projet
   - Commandes de copie d'assets
   - Contenu intégral du case study, section par section
   - Inventaire des assets (vidéos, screenshots, positions)
   - Format des vidéos (autoplay/loop/muted/playsinline)
   - Format des légendes
   - Checklist de publication

### Checklist

- [ ] Repo GitHub créé et poussé
- [ ] Prototype déployé sur Vercel
- [ ] PORTFOLIO-INTEGRATION.md autoportant
- [ ] Fichier copié dans le projet portfolio

---

## Phase 7 : PUBLIER (variable)

**Entrée** : PORTFOLIO-INTEGRATION.md dans le projet portfolio
**Sortie** : page projet publiée sur le site

### Actions

Cette phase s'exécute dans une session séparée, dans le projet portfolio. Le prompt :

```
Lis PORTFOLIO-INTEGRATION.md et implémente le case study comme projet
sur mon site. Le fichier contient toutes les instructions : assets,
contenu, structure de page, format des vidéos et légendes.
```

### Checklist

- [ ] Assets copiés dans le projet portfolio
- [ ] Page projet créée
- [ ] Vidéos en autoplay/loop/muted
- [ ] Légendes sous chaque vidéo
- [ ] og:image configuré
- [ ] Versions FR et EN
- [ ] Liens prototype et GitHub fonctionnels

---

## Récapitulatif

| Phase | Durée | Livrables |
|---|---|---|
| 1. Cadrer | 15 min | case-study v1, CLAUDE.md |
| 2. Structurer | 10 min | projet localhost |
| 3. Enrichir | 30-45 min | prototype filmable |
| 4. Filmer | 30 min | vidéos + screenshots |
| 5. Raconter | 20 min | case study FR/EN |
| 6. Empaqueter | 15 min | GitHub, Vercel, pack |
| 7. Publier | variable | page portfolio |
| **Total** | **~2h30** | **case study complet publié** |
