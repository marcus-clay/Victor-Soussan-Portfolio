# Instructions : page Guide Ship to Show

## Objectif

Creer une page Guide/methodologie sur victorsoussan.fr pour presenter Ship to Show, un framework en 7 phases pour transformer un prototype en case study portfolio.

## URL cible

/fr/guide/ship-to-show (FR)
/en/guide/ship-to-show (EN)

## Structure de la page

### Hero
- Titre : Ship to Show
- Sous-titre : Un framework en 7 phases pour transformer un prototype en case study portfolio
- Auteur : Victor Soussan
- Categorie : Methodologie / Claude Code

### Le probleme
Les designers et developpeurs construisent des prototypes mais les documentent rarement dans leur portfolio. Le travail de production d'un case study (redaction, videos, deploiement, integration) prend plusieurs jours et mobilise des competences variees (motion design, redaction, devops). La plupart des prototypes restent dans un dossier local sans jamais etre publies.

### Le framework
Ship to Show structure ce travail en 7 phases executables par un agent IA. Chaque phase a un prompt structure, une checklist de sortie, et un livrable concret. Le processus complet prend environ 2h30.

### Les 7 phases (une section par phase)
Pour chaque phase, afficher :
- Numero et nom (1. CADRER, 2. STRUCTURER, etc.)
- Duree estimee
- Entree et sortie
- Description en 2-3 phrases
- Checklist de sortie

Phases :
1. CADRER (15 min) : Identifier secteur, utilisateurs, probleme, point de vue de design. Sortie : case-study v1, CLAUDE.md.
2. STRUCTURER (10 min) : Rendre le prototype executable en local. Sortie : projet sur localhost.
3. ENRICHIR (30-45 min) : Ajouter les parcours manquants pour produire 5 videos. Sortie : prototype filmable.
4. FILMER (30 min) : Produire les videos via Puppeteer + FFmpeg. Sortie : 5-8 videos MP4 + screenshots.
5. RACONTER (20 min) : Rediger le case study avec structure narrative. Sortie : case study FR/EN.
6. EMPAQUETER (15 min) : GitHub, Vercel, fichier d'integration autoportant. Sortie : pack complet.
7. PUBLIER (variable) : Integrer dans le site portfolio. Sortie : page projet publiee.

### Prerequisites
Node.js 18+, FFmpeg, Git, GitHub CLI, Vercel CLI, un agent IA (Claude Code recommande).

### Installation comme skill Claude Code
```bash
mkdir -p ~/.claude/skills/ship-to-show
curl -o ~/.claude/skills/ship-to-show/SKILL.md https://raw.githubusercontent.com/marcus-clay/ship-to-show/main/SKILL.md
```
Puis taper `/ship-to-show` dans n'importe quel projet.

### Exemple : RiskOS
Mentionner que le framework a ete concu et teste sur le projet RiskOS (detection de fraude augmentee par IA agentique). Lien vers la page projet : /fr/project/riskos/summary

### Lien GitHub
https://github.com/marcus-clay/ship-to-show

## Mise a jour de la page skills existante

Sur la page /fr/guide/claude-code/skills, ajouter une entree pour Ship to Show dans la liste des skills :
- Nom : ship-to-show
- Description : Framework en 7 phases pour transformer un prototype en case study portfolio avec videos animees, contenu narratif bilingue et pack d'integration.
- Installation : `mkdir -p ~/.claude/skills/ship-to-show && curl -o ~/.claude/skills/ship-to-show/SKILL.md https://raw.githubusercontent.com/marcus-clay/ship-to-show/main/SKILL.md`
- Invocation : `/ship-to-show`

## Ton et style

Appliquer victor-voice et francais-parfait. Ton de praticien qui partage un outil, pas un vendeur. Pas de superlatifs, pas de buzzwords.
