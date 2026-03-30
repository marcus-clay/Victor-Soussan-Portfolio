---
name: Ship to Show - Skill Creation Brief
description: Brief complet pour créer Ship to Show comme skill Claude Code installable, page Guide sur victorsoussan.fr, et mise à jour des pages skills existantes. Contient tout le contexte, les sources, les contraintes et les livrables.
type: project
---

## Ce que c'est

Ship to Show est un framework en 7 phases conçu par Victor Soussan pour transformer un prototype fonctionnel en case study portfolio publiable, en une session de travail (~2h30) assistée par un agent IA.

Les 7 phases : Cadrer > Structurer > Enrichir > Filmer > Raconter > Empaqueter > Publier.

Chaque phase a un prompt autonome que l'utilisateur colle dans Claude Code. Le framework inclut un pipeline de production vidéo (Puppeteer + FFmpeg), un système de fichier d'interface entre agents (PORTFOLIO-INTEGRATION.md), et un post LinkedIn prêt à publier.

Le framework a été développé et testé sur le projet RiskOS (détection de fraude augmentée par IA agentique).

## Où sont les sources

**Fichiers du framework** (contenu complet) :
- `/tmp/riskos/SHIP-TO-SHOW.md` : documentation complète (7 phases, prérequis, technique vidéo, application RiskOS)
- `/tmp/riskos/SHIP-TO-SHOW-STARTER.md` : template de démarrage avec prompts copiables par phase, checklist, timing
- `/tmp/riskos/content-linkedin-ship-to-show.md` : post LinkedIn

**Attention /tmp/ est volatile.** Si les fichiers ont été supprimés au redémarrage, les récupérer depuis :
- GitHub : https://github.com/marcus-clay/riskos-fraud-detection (branche main)
- Ou depuis le projet portfolio : `/Users/condamine/Documents/GitHub/Victor-Soussan-Portfolio/` (SHIP-TO-SHOW.md, SHIP-TO-SHOW-STARTER.md, content-linkedin-ship-to-show.md y sont copiés)

**Projet portfolio Victor** : `/Users/condamine/Documents/GitHub/Victor-Soussan-Portfolio`
- Stack : Next.js, dossier `app/`
- Pages existantes à mettre à jour :
  - https://www.victorsoussan.fr/fr/guide/claude-code/skills
  - Page Notion : https://www.notion.so/victor-soussan/Skills-Claude-pour-les-designers-323a519b0dea80ccae97e9a4eef93dfc

## Les 3 livrables à produire

### Livrable 1 : Skill Claude Code installable

Créer Ship to Show comme un plugin/skill Claude Code que Victor et d'autres peuvent installer.

**Déclencheurs** : le skill doit se proposer quand l'utilisateur mentionne « case study », « portfolio », « prototype to portfolio », « ship to show », « documenter un prototype », « publier un projet ».

**Contenu du skill** : intégrer le contenu de SHIP-TO-SHOW.md et SHIP-TO-SHOW-STARTER.md. Le skill doit guider l'utilisateur à travers les 7 phases avec les prompts structurés. Utiliser les conventions de skills Claude Code (frontmatter YAML, structure progressive disclosure).

**Distribution** : le skill doit être installable par d'autres. Documenter la procédure d'installation.

### Livrable 2 : Page Guide sur victorsoussan.fr

Créer une page dans la section `/fr/guide/` du site portfolio (au même niveau que l'article `/fr/guide/claude-code/skills`).

**Contenu** : adapter SHIP-TO-SHOW.md pour le format web. Inclure le schéma des 7 phases (visuel), les prompts par phase, les prérequis, et le lien vers le case study RiskOS comme exemple d'application.

**Créer un PORTFOLIO-INTEGRATION.md dédié** pour que l'agent du portfolio puisse implémenter la page.

**Ton** : praticien qui partage une méthodologie. Pas de posture de vente. Appliquer victor-voice et francais-parfait. L'IA est un accélérateur, les décisions de design restent celles du praticien.

### Livrable 3 : Mise à jour de deux pages existantes

**Page victorsoussan.fr/fr/guide/claude-code/skills** : ajouter Ship to Show dans la liste des skills disponibles, avec une description et un lien vers la page Guide (livrable 2).

**Page Notion Skills Claude pour les designers** : ajouter Ship to Show avec description, lien GitHub, et instructions d'installation.

## Contraintes de ton et de posture

- Appliquer les skills `francais-parfait` et `victor-voice` sur tous les outputs en français.
- Appliquer `victor-brand` pour tout ce qui touche au site portfolio.
- Le rôle de l'IA dans le framework doit être présenté comme un accélérateur (mise en forme, production vidéo, structuration), pas comme l'auteur du travail. Les décisions de design, le cadrage, les choix narratifs et le positionnement sont ceux du praticien.
- Pas de notes stratégiques visibles dans les fichiers publics (pas de mention MOFU/TOFU, pas de ciblage, pas d'objectifs de contenu).
- Pas de formulations qui donnent l'impression que le praticien délègue toute la rédaction à l'IA.

## Contexte projet RiskOS (pour référence)

- Prototype : https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app
- GitHub : https://github.com/marcus-clay/riskos-fraud-detection
- Secteur : néobanques et établissements de paiement européens (PSD2)
- Utilisateurs : analystes fraude L1 (80 à 150 alertes par shift)
- Catégorie portfolio : « Expérimentation UX agentiques »
- Stack prototype : React 18, Vite, Tailwind CSS, lucide-react, Web Audio API
- Pipeline vidéo : Puppeteer + Web Animations API + FFmpeg H.264
