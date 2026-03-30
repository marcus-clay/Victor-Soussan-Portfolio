# Instructions d'intégration portfolio : RiskOS

Tu es dans le projet Victor-Soussan-Portfolio (Next.js, dossier `app/`).
Les assets du case study RiskOS sont dans `/tmp/riskos/`.
Ce fichier contient TOUT ce qu'il faut pour publier le projet sur victorsoussan.fr/fr/projets.

---

## Étape 1 : copier les assets

```bash
# Vidéos (8 fichiers MP4, 2.5 Mo total)
mkdir -p public/assets/projets/riskos/videos
cp /tmp/riskos/videos/*.mp4 public/assets/projets/riskos/videos/

# Screenshots (5 fichiers PNG Retina 2x, ~1 Mo total)
mkdir -p public/assets/projets/riskos/screenshots
cp /tmp/riskos/screenshots/*.png public/assets/projets/riskos/screenshots/
```

---

## Étape 2 : métadonnées du projet

```yaml
slug: riskos
title_fr: "RiskOS"
title_en: "RiskOS"
subtitle_fr: "Détection de fraude augmentée par IA agentique"
subtitle_en: "AI-Augmented Fraud Detection"
category_fr: "Expérimentation UX agentiques"
category_en: "Agentic UX Experimentation"
author: "Victor Soussan"
role: "Product Design"
date: "2026-03"
status: "published"
featured: true
thumbnail: "/assets/projets/riskos/screenshots/02-case-detail.png"
og_image: "/assets/projets/riskos/screenshots/02-case-detail.png"
tags:
  - agentic-ux
  - fraud-detection
  - ai-interface
  - fintech
  - prototype
  - react
stack:
  - React 18
  - Vite
  - Tailwind CSS
  - lucide-react
  - Web Audio API
links:
  prototype: "https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app"
  github: "https://github.com/marcus-clay/riskos-fraud-detection"
```

---

## Étape 3 : structure de la page

Le case study suit le pattern Late Checkout Agency : sections espacées, vidéos plein écran en autoplay/loop/muted, texte qui cadre sans dominer. Fond sombre. Pas de grille de vidéos sans contexte. Chaque vidéo a sa propre section avec un titre, un texte de contexte, et une légende frustration/bénéfice.

### Ordre des sections (respecter cet ordre, pas l'ordre numérique des fichiers)

**1. Header**
- Titre : « RiskOS »
- Sous-titre : « Détection de fraude augmentée par IA agentique »
- Catégorie : « Expérimentation UX agentiques »
- Auteur : Victor Soussan · Product Design

**2. Pourquoi cette expérimentation**

Les interfaces agentiques posent une question de design qui n'a pas encore de réponse stabilisée : comment intégrer un agent IA dans un flux de décision humain sans créer de la dépendance, de la passivité ou de la méfiance ?

Cette expérimentation explore cette question dans un contexte où les enjeux sont concrets et mesurables : la détection de fraude dans le secteur bancaire européen. Un terrain où chaque seconde de latence cognitive coûte de l'argent, où 80 % des alertes sont des faux positifs, et où l'analyste doit garder le contrôle de la décision finale.

RiskOS est un prototype fonctionnel conçu pour tester des hypothèses de design sur la collaboration humain/IA dans un environnement de pression temporelle.

**3. L'insight fondateur**

Les analystes fraude des néobanques européennes traitent 80 à 150 alertes par shift de 8 heures. 80 % de ces alertes sont des faux positifs. Le temps perdu sur les faux positifs est du temps volé aux cas réels.

L'outil actuel de la plupart des équipes : un tableau CSV, un terminal, des règles statiques. Aucune contextualisation, aucune priorisation intelligente, aucune mémoire de patterns.

**4. VIDÉO : avant/après**
- Fichier : `/assets/projets/riskos/videos/06-before-after.mp4`
- Titre légende : **Le gap entre l'existant et la proposition.**
- Texte : À gauche, le flux d'alertes tel qu'il arrive dans beaucoup d'établissements : un CSV brut, des colonnes de données sans hiérarchie visuelle. À droite, les mêmes données structurées dans RiskOS. Le comparatif rend tangible le coût cognitif de l'interface actuelle.

**5. La question de design**

Comment concevoir une interface où l'IA qualifie et contextualise une alerte en temps réel, sans retirer à l'analyste le contrôle de la décision finale ?

Trois principes guident le prototype :
- L'IA prépare le terrain cognitif de l'analyste, elle ne décide pas à sa place.
- Le raisonnement de l'agent doit être visible, pas seulement sa conclusion.
- Chaque action doit avoir des conséquences traçables dans l'écosystème réel.

**6. VIDÉO : flux de données**
- Fichier : `/assets/projets/riskos/videos/07-data-flow.mp4`
- Titre légende : **Où se positionne RiskOS dans la chaîne de détection.**
- Texte : Le parcours d'une transaction suspecte : du core banking au moteur de règles, de la file d'alertes à l'analyse IA, jusqu'à la décision humaine. RiskOS intervient au moment où l'alerte a besoin d'un jugement, pas d'une règle supplémentaire.

**7. Le triage : prioriser sous pression**

L'analyste L1 ouvre son shift. L'inbox affiche 5 cas ouverts, triés par risque. Le filtrage par niveau (high, medium, low) permet de concentrer l'attention sur les cas critiques. Le compteur de session rappelle ce qui a été traité et ce qui reste.

- Fichier vidéo : `/assets/projets/riskos/videos/01-hero-triage.mp4`
- Titre légende : **Triage**
- Frustration : l'analyste perd du temps à scanner une liste non priorisée pour identifier les cas urgents.
- Bénéfice : le codage couleur, le filtre par risque et le compteur dynamique réduisent le temps de triage à quelques secondes.

**8. L'analyse IA : rendre le raisonnement visible**

L'agent IA analyse le cas en temps réel. Le texte apparaît mot par mot : pattern matching, analyse comportementale, recommandation. Les tokens sensibles (montants, géolocalisations, devices) se colorent pour guider l'attention. Un indicateur de confiance quantifie la certitude de l'analyse. Les sources de données (Core Banking API, Device Fingerprint, Geo Intelligence) s'allument pour montrer d'où vient l'intelligence.

Les boutons d'action n'apparaissent qu'après le streaming complet. Ce choix de design impose un temps de lecture minimum et empêche la décision réflexe.

- Fichier vidéo : `/assets/projets/riskos/videos/02-ai-insight.mp4`
- Titre légende : **Analyse IA**
- Frustration : l'analyste reçoit un score de risque sans comprendre pourquoi. Il doit reconstruire mentalement le raisonnement à partir de données éparses.
- Bénéfice : l'IA structure les signaux faibles en une lecture narrative. L'analyste comprend le « pourquoi » avant de décider le « quoi ».

**9. La décision : agir et voir l'impact**

L'analyste choisit une action (bloquer, escalader, monitorer). La confirmation récapitule le cas, l'action et la durée de review. Deux ellipses montrent que l'action ne reste pas dans l'outil : le message Slack envoyé à l'équipe #fraud-ops, et le SMS reçu par le client dont la carte a été gelée.

L'escalade vers le niveau 2 inclut une note pré-remplie par l'IA, que l'analyste peut éditer avant de transmettre. L'escalade devient un acte de transmission, pas un abandon.

- Fichier vidéo : `/assets/projets/riskos/videos/03-decision-ellipses.mp4`
- Titre légende : **Décision et impact**
- Frustration : l'analyste agit dans l'outil mais ne voit jamais la conséquence de sa décision. L'escalade part dans le vide.
- Bénéfice : chaque action a un écho visible dans l'écosystème (Slack, SMS, ticket). L'analyste sait que sa décision a été transmise, reçue et exécutée.

**10. Le faux positif : aussi rapide à disqualifier qu'à traiter**

Un cas à risque moyen (score 45, payment de 450 euros). L'IA conclut : « Transaction within acceptable range. Consistent patterns. Mark as safe. » L'analyste confirme en un clic. Le cas est résolu en 8 secondes.

- Fichier vidéo : `/assets/projets/riskos/videos/05-false-positive.mp4`
- Titre légende : **Faux positif**
- Frustration : les faux positifs consomment autant de temps que les cas réels, alors qu'ils ne nécessitent aucune action.
- Bénéfice : l'IA qualifie les faux positifs en quelques secondes, libérant l'attention de l'analyste pour les cas qui comptent.

**11. Le traitement en queue : enchaîner sans friction**

L'analyste traite 5 cas en séquence. Chaque confirmation propose directement le cas suivant. La barre de session se met à jour en temps réel. Au dernier cas, un écran récapitule la session : 5 cas traités, 92 secondes au total, 18 secondes de moyenne par cas.

- Fichier vidéo : `/assets/projets/riskos/videos/04-queue-cleared.mp4`
- Titre légende : **Traitement en queue**
- Frustration : chaque changement de cas impose un cold start cognitif. L'analyste perd le rythme entre les dossiers.
- Bénéfice : le chaînage direct et les métriques de session maintiennent le flux de travail et rendent la productivité visible.

**12. Ce que cette expérimentation m'a appris**

L'intégration de l'IA dans un flux de décision humain ne se résout pas par l'automatisation. Le problème de design est plus fin : il s'agit de distribuer l'autorité entre l'agent et l'humain à chaque étape du processus.

**Le streaming comme outil de confiance.** Quand l'IA montre son raisonnement en temps réel, l'analyste peut commencer à évaluer avant la fin de l'analyse. La transparence du processus construit la confiance plus efficacement qu'un score de confiance affiché après coup.

**Le conditionnement des actions.** Retarder l'apparition des boutons de décision jusqu'à la fin de l'analyse IA impose un temps de lecture minimum. Dans un contexte de pression temporelle, ce frein intentionnel protège contre la décision réflexe sans ralentir significativement le workflow.

**Les ellipses comme preuve d'impact.** Montrer la notification Slack, le SMS client, le ticket de suivi après une action transforme l'outil d'un silo en un nœud d'un réseau. L'analyste voit que sa décision a des conséquences, ce qui renforce la responsabilité et la satisfaction du travail accompli.

Ces mécanismes sont transposables à d'autres contextes B2B où l'IA assiste une décision humaine : conformité réglementaire, triage médical, modération de contenu, gestion d'incidents.

**13. Périmètre technique + liens**
- Stack : React 18, Vite, Tailwind CSS, lucide-react, Web Audio API
- Lien prototype : https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app
- Lien GitHub : https://github.com/marcus-clay/riskos-fraud-detection

---

## Étape 4 : format des vidéos

Toutes les vidéos sont en MP4, H.264, 1920x1080, 30 fps. Les intégrer en :

```html
<video
  src="/assets/projets/riskos/videos/[filename].mp4"
  autoplay
  loop
  muted
  playsInline
  style={{ width: '100%', borderRadius: '12px' }}
/>
```

Plein écran dans la colonne de contenu. Pas de contrôles vidéo visibles. Fond sombre derrière chaque vidéo.

---

## Étape 5 : format des légendes

Sous chaque vidéo, afficher :
- **Titre** en gras (une phrase)
- **Frustration :** en texte secondaire (le problème utilisateur)
- **Bénéfice :** en texte secondaire (la valeur apportée)

Le style doit être discret : texte petit, couleur secondaire, espacé du bas de la vidéo.

---

## Étape 6 : version anglaise

Le contenu ci-dessus est en français. La version anglaise complète est dans `/tmp/riskos/case-study-en.md`. Utiliser le même structure de page, mêmes vidéos, mêmes légendes traduites.

---

## Inventaire des assets

### Vidéos (`/tmp/riskos/videos/` → `public/assets/projets/riskos/videos/`)

| Fichier | Durée | Section |
|---|---|---|
| `00-live-prototype.mp4` | 19s | Optionnel (hero alternatif) |
| `01-hero-triage.mp4` | 16s | Section 7 : Le triage |
| `02-ai-insight.mp4` | 15s | Section 8 : L'analyse IA |
| `03-decision-ellipses.mp4` | 15s | Section 9 : La décision |
| `04-queue-cleared.mp4` | 14s | Section 11 : Le traitement en queue |
| `05-false-positive.mp4` | 11s | Section 10 : Le faux positif |
| `06-before-after.mp4` | 12s | Section 4 : Après l'insight fondateur |
| `07-data-flow.mp4` | 11s | Section 6 : Après la question de design |

### Screenshots (`/tmp/riskos/screenshots/` → `public/assets/projets/riskos/screenshots/`)

| Fichier | Usage |
|---|---|
| `01-inbox.png` | Thumbnail carte projet (optionnel) |
| `02-case-detail.png` | **og:image + thumbnail principal** |
| `03-ai-insight-complete.png` | Illustration statique (optionnel) |
| `04-confirmation.png` | Illustration statique (optionnel) |
| `05-inbox-session.png` | Illustration statique (optionnel) |

---

## Checklist

- [ ] Assets copiés dans `public/assets/projets/riskos/`
- [ ] Page projet créée (respecter l'ordre des sections ci-dessus)
- [ ] Vidéos en autoplay/loop/muted (pas de contrôles)
- [ ] Légendes sous chaque vidéo (titre + frustration + bénéfice)
- [ ] og:image configuré (`02-case-detail.png`)
- [ ] Catégorie « Expérimentation UX agentiques »
- [ ] Liens prototype Vercel et GitHub fonctionnels
- [ ] Version FR et EN
- [ ] Vidéos dans l'ordre narratif (06, 07, 01, 02, 03, 05, 04)
