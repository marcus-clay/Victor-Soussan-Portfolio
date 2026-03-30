---
name: victor-slides
description: >
  Système de création de présentations et slides pour Victor Soussan /
  Condamine Studio. Appliquer à tout output de type deck, pitch, présentation
  client, keynote, support de formation ou rapport visuel. Déclencher dès que
  la demande implique des slides, un deck, une présentation PowerPoint, Google
  Slides, ou tout support visuel multi-pages. Prend la priorité sur pptx pour
  les choix visuels et stylistiques : pptx gère la technique de génération,
  victor-slides gère les tokens de design, la structure narrative et les
  conventions de mise en page propres à la marque Victor.
---

# Victor Slides

Système de design pour les présentations de Victor Soussan / Condamine Studio.
S'applique à tous les decks, qu'ils soient internes, clients, ou publics.

Lire également pptx/SKILL.md pour la génération technique des fichiers.

---

## 1. Tokens de design (source : victorsoussan.fr)

### Palette principale

| Rôle | Hex | Statut | Usage slides |
|---|---|---|---|
| Bleu primaire | #3D65E8 | Approché - à confirmer | Titres accent, CTA, formes d'emphase |
| Fond global clair | #EBEFF7 | Approché - à confirmer | Fond de slides contenu |
| Surface / carte | #FFFFFF | Confirmé | Blocs de contenu, cartes, encadrés |
| Texte principal | #111827 | Approché - à confirmer | Corps de texte, titres dark |
| Texte muted | #6B7280 | Approché - à confirmer | Labels, légendes, métadonnées |
| Vert statut | #22C55E | Approché - à confirmer | Indicateurs positifs, KPIs en hausse |

Pas de variante navy. Une seule palette pour tous les clients.

### Typographie

| Usage | Police | Poids | Taille indicative |
|---|---|---|---|
| Titre de slide | Inter | Black 900 ou ExtraBold 800 | 36-48pt |
| Sous-titre / chapeau | Inter | SemiBold 600 | 20-24pt |
| Corps de texte | Inter | Regular 400 | 14-16pt |
| Label / métadonnée | Inter | Regular 400 | 10-12pt, muted |

Fallback prioritaire si Inter non disponible : Public Sans (https://fonts.google.com/specimen/Public+Sans).
Fallbacks système : Geist, SF Pro, Helvetica Neue. Jamais de serif.

### Icônes

- Phosphor Icons (https://phosphoricons.com/) ou Lucide (https://lucide.dev/)
- Poids Regular ou Light
- Zero emoji

---

## 2. Principes de mise en page

### Structure visuelle

- Une idée par slide. Pas de slide encyclopédique.
- Espace blanc généreux. Ne pas remplir toute la surface.
- Ratio texte/visuel : maximum 60% texte, minimum 40% espace ou visuel.
- Hiérarchie forte : un élément dominant par slide (stat, titre, image, schéma).

### Layouts privilégiés

- Deux colonnes (texte gauche, visuel droite)
- Stat callout centré (chiffre très grand, label small dessous)
- Grille 2x2 ou 2x3 pour les comparaisons et listes de points
- Pleine largeur image avec overlay texte pour les slides de transition
- Timeline horizontale pour les processus et jalons

### Slides de structure

| Type | Fond | Texte | Usage |
|---|---|---|---|
| Couverture | Bleu #3D65E8 | Blanc | Titre du deck |
| Transition / chapitre | #EBEFF7 | #111827 | Séparation de sections |
| Contenu | #FFFFFF ou #EBEFF7 | #111827 | Corps du deck |
| Conclusion / CTA | Bleu #3D65E8 | Blanc | Fermeture, prochaine étape |

Structure recommandée (sandwich clair/sombre) : couverture sombre,
slides contenu clairs, conclusion sombre.

---

## 3. Conventions narratives

### Arc du deck

Tout deck Victor suit une logique de décision, pas une logique d'exposé :

1. Situation actuelle (ancrage dans la réalité du client)
2. Tension ou problème identifié
3. Angle d'intervention et mécanisme
4. Livrables, jalons, ou solution proposée
5. Prochaine étape concrète (jamais une conclusion abstraite)

### Titres de slides

- Spécifiques et affirmatifs : « Les tests révèlent 3 points de friction critiques »,
  pas « Résultats des tests ».
- Le lecteur qui ne lit que les titres doit comprendre la logique du deck.
- Pas de titres génériques : « Introduction », « Contexte », « Conclusion »
  sont interdits.

### Données et métriques

- Les chiffres sont mis en valeur visuellement (stat callout, grande taille).
- Chaque métrique est accompagnée de son contexte (avant/après, période, source).
- Pas de tableau de données brutes sans visualisation ou commentaire.

---

## 4. Anti-patterns à éviter

- Bullets sur fond blanc sans structure visuelle : interdit.
- Texte centré sur slides de contenu : interdit (centré uniquement sur couverture
  et transition).
- Mélange de polices : interdit.
- Icônes en emoji : interdit.
- Ligne décorative sous les titres : interdit (signature des slides générés par IA).
- Même layout répété sur plus de 3 slides consécutives : éviter.
- Fond blanc pur (#FFFFFF) comme fond global de deck : préférer #EBEFF7.

---

## 5. Configurations de decks

### Deck commercial / proposition client

- Couverture : bleu #3D65E8 + blanc, titre de mission, nom du client
- 8-12 slides maximum
- Pas de slide de sommaire
- Fermeture sur une prochaine étape précise (date, action, contact)

### Deck de cas / case study

- Couverture : bleu #3D65E8 + titre + année
- Structure : contexte, décisions, résultats, learnings
- Stat callouts pour les métriques clés
- Screenshots ou maquettes en pleine largeur sur slides dédiées

### Deck de formation / atelier design ou UX

- Structure en chapitres avec slides de transition (#EBEFF7)
- Exercices et livrables visuellement différenciés (fond légèrement différent)
- Timeline de session en slide d'ouverture
- Pas de bullets denses : une notion par slide, illustration systématique

### Formation IA pour PME et équipes produit

Structure spécifique pour les decks de formation IA de Victor :

- Couverture : bleu #3D65E8, titre de module, niveau (Découverte / Pratique / Avancé)
- Slide de contexte : pourquoi l'IA maintenant, ancré sur des cas sectoriels réels
- Slides de démonstration : screenshot ou enregistrement côte à côte (avant/après IA)
- Slides d'exercice : fond #EBEFF7 légèrement différencié, consigne courte + livrable attendu
- Slides de concept : une notion par slide, définition en 1 phrase, exemple immédiatement après
- Slide de récap par chapitre : 3 points max, visuellement aérés
- Fermeture : prochaines étapes actionnables, ressources, contact

Audiences couvertes par cette configuration :
décideurs PME (niveau Découverte, 45-60 min),
équipes produit/design (niveau Pratique, ateliers 2-3h),
équipes techniques ou avancées (niveau Avancé, workshops demi-journée).

### Pitch / keynote

- Maximum 10 slides
- Une stat ou une idée forte par slide
- Pas de bullets : narration visuelle uniquement

---

## 6. Vérification avant livraison

1. Palette conforme aux tokens victor-brand (bleu #3D65E8, fond #EBEFF7).
2. Typographie Inter uniquement, hiérarchie de poids respectée.
3. Un élément dominant par slide, espace blanc respecté.
4. Titres de slides affirmatifs et spécifiques, jamais génériques.
5. Arc narratif lisible en ne lisant que les titres.
6. Zero emoji, zero emdash, zero ligne décorative sous titre.
7. Slides de couverture et conclusion en fond sombre (sandwich).
8. QA visuel effectué (voir pptx/SKILL.md section QA).
