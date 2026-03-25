/**
 * Guide Ship to Show - Bilingual content data (EN/FR)
 * A 7-phase framework to turn a prototype into a published portfolio case study.
 */

export interface ShipToShowPhase {
  number: number;
  name_fr: string;
  name_en: string;
  duration: string;
  input_fr: string;
  input_en: string;
  output_fr: string;
  output_en: string;
  description_fr: string;
  description_en: string;
  checklist_fr: string[];
  checklist_en: string[];
}

export const SHIP_TO_SHOW_META = {
  title_en: 'Ship to Show',
  title_fr: 'Ship to Show',
  subtitle_en: 'A 7-phase framework to turn a prototype into a portfolio case study',
  subtitle_fr: 'Un framework en 7 phases pour transformer un prototype en case study portfolio',
  categories_en: ['Methodology', 'Claude Code'] as const,
  categories_fr: ['Méthodologie', 'Claude Code'] as const,
  date: '2026-03-25',
  readTime: '12 min',
  author: {
    name: 'Victor Soussan',
    role: 'Lead Product Designer',
    bio_en: 'SaaS B2B & B2G | Complex business interfaces | Design Systems | Figma, Claude Code | AI Prototyping',
    bio_fr: 'SaaS B2B & B2G | Interfaces métier complexes | Design Systems | Figma, Claude Code | Prototypage IA',
    image: '/images/guide-claude-code/author-victor.png',
    linkedin: 'https://linkedin.com/in/victor-soussan-product-design/',
    website: 'https://www.victorsoussan.fr/',
  },
  githubUrl: 'https://github.com/marcus-clay/ship-to-show',
  exampleProject: {
    name: 'RiskOS',
    slug: 'riskos',
    description_fr: 'Détection de fraude augmentée par IA agentique',
    description_en: 'AI-augmented fraud detection with agentic workflows',
  },
};

export const SHIP_TO_SHOW_PHASES: ShipToShowPhase[] = [
  {
    number: 1,
    name_fr: 'CADRER',
    name_en: 'FRAME',
    duration: '15 min',
    input_fr: 'Fichier de code ou prototype',
    input_en: 'Code file or prototype',
    output_fr: 'Case study v1, CLAUDE.md',
    output_en: 'Case study v1, CLAUDE.md',
    description_fr: 'Identifier le secteur, les utilisateurs cibles, le problème adressé et le point de vue de design. Cette phase pose les fondations narratives du case study en extrayant les décisions structurantes du prototype.',
    description_en: 'Identify the sector, target users, the problem addressed, and the design point of view. This phase lays the narrative foundations of the case study by extracting the structural decisions from the prototype.',
    checklist_fr: [
      'Secteur et contexte identifiés',
      'Utilisateurs cibles décrits',
      'Problème formulé en une phrase',
      'Point de vue design explicité',
      'Fichier case-study v1 généré',
      'CLAUDE.md du projet créé',
    ],
    checklist_en: [
      'Sector and context identified',
      'Target users described',
      'Problem stated in one sentence',
      'Design point of view made explicit',
      'Case study v1 file generated',
      'Project CLAUDE.md created',
    ],
  },
  {
    number: 2,
    name_fr: 'STRUCTURER',
    name_en: 'STRUCTURE',
    duration: '10 min',
    input_fr: 'Prototype brut',
    input_en: 'Raw prototype',
    output_fr: 'Projet exécutable sur localhost',
    output_en: 'Project running on localhost',
    description_fr: 'Rendre le prototype exécutable en local. Installer les dépendances, corriger les erreurs de build, vérifier que l\'interface tourne dans un navigateur. Aucun enrichissement à ce stade, seulement la stabilité.',
    description_en: 'Get the prototype running locally. Install dependencies, fix build errors, verify the interface renders in a browser. No enrichment at this stage, only stability.',
    checklist_fr: [
      'Dépendances installées',
      'Build sans erreur',
      'Interface visible sur localhost',
      'Navigation fonctionnelle',
    ],
    checklist_en: [
      'Dependencies installed',
      'Build with no errors',
      'Interface visible on localhost',
      'Navigation working',
    ],
  },
  {
    number: 3,
    name_fr: 'ENRICHIR',
    name_en: 'ENRICH',
    duration: '30-45 min',
    input_fr: 'Prototype fonctionnel',
    input_en: 'Working prototype',
    output_fr: 'Prototype filmable avec 5+ parcours',
    output_en: 'Filmable prototype with 5+ user flows',
    description_fr: 'Ajouter les parcours manquants pour produire au moins 5 vidéos. Compléter les écrans secondaires, les états de chargement, les transitions entre vues. Le prototype doit raconter une histoire cohérente quand on le filme.',
    description_en: 'Add the missing user flows to produce at least 5 videos. Complete secondary screens, loading states, transitions between views. The prototype must tell a coherent story when filmed.',
    checklist_fr: [
      '5 parcours utilisateur identifiés',
      'Écrans secondaires complétés',
      'États de chargement ajoutés',
      'Transitions entre vues fluides',
      'Données réalistes injectées',
    ],
    checklist_en: [
      '5 user flows identified',
      'Secondary screens completed',
      'Loading states added',
      'Smooth transitions between views',
      'Realistic data injected',
    ],
  },
  {
    number: 4,
    name_fr: 'FILMER',
    name_en: 'FILM',
    duration: '30 min',
    input_fr: 'Prototype filmable',
    input_en: 'Filmable prototype',
    output_fr: '5 à 8 vidéos MP4 + screenshots',
    output_en: '5 to 8 MP4 videos + screenshots',
    description_fr: 'Produire les vidéos via Puppeteer et FFmpeg. Chaque vidéo capture un parcours utilisateur complet avec des timings calibrés. Les screenshots servent de visuels d\'appui pour le case study.',
    description_en: 'Produce videos via Puppeteer and FFmpeg. Each video captures a complete user flow with calibrated timings. Screenshots serve as supporting visuals for the case study.',
    checklist_fr: [
      'Scripts Puppeteer écrits pour chaque parcours',
      'Vidéos MP4 générées (1080p minimum)',
      'Timings vérifiés (pas de frames vides)',
      'Screenshots des écrans clés exportés',
      'Fichiers nommés et organisés',
    ],
    checklist_en: [
      'Puppeteer scripts written for each flow',
      'MP4 videos generated (1080p minimum)',
      'Timings verified (no empty frames)',
      'Key screen screenshots exported',
      'Files named and organized',
    ],
  },
  {
    number: 5,
    name_fr: 'RACONTER',
    name_en: 'NARRATE',
    duration: '20 min',
    input_fr: 'Vidéos et screenshots',
    input_en: 'Videos and screenshots',
    output_fr: 'Case study FR/EN complet',
    output_en: 'Complete FR/EN case study',
    description_fr: 'Rédiger le case study avec une structure narrative : contexte, problème, approche, résultat. Le texte est bilingue (FR/EN) et calibré pour un portfolio professionnel. Chaque section est associée à une vidéo ou un screenshot.',
    description_en: 'Write the case study with a narrative structure: context, problem, approach, result. The text is bilingual (FR/EN) and calibrated for a professional portfolio. Each section is paired with a video or screenshot.',
    checklist_fr: [
      'Structure narrative définie (contexte, problème, approche, résultat)',
      'Texte FR rédigé',
      'Texte EN rédigé',
      'Vidéos et screenshots associés à chaque section',
      'Relecture tonale (pas de jargon, pas de superlatifs)',
    ],
    checklist_en: [
      'Narrative structure defined (context, problem, approach, result)',
      'FR text written',
      'EN text written',
      'Videos and screenshots paired with each section',
      'Tone review (no jargon, no superlatives)',
    ],
  },
  {
    number: 6,
    name_fr: 'EMPAQUETER',
    name_en: 'PACKAGE',
    duration: '15 min',
    input_fr: 'Case study et assets',
    input_en: 'Case study and assets',
    output_fr: 'Pack complet (GitHub, Vercel, fichier d\'intégration)',
    output_en: 'Complete pack (GitHub, Vercel, integration file)',
    description_fr: 'Créer le dépôt GitHub, déployer sur Vercel, et produire un fichier d\'intégration autoportant. Ce fichier contient tout ce dont le site portfolio a besoin pour afficher le projet : données, chemins des assets, métadonnées SEO.',
    description_en: 'Create the GitHub repository, deploy on Vercel, and produce a self-contained integration file. This file contains everything the portfolio site needs to display the project: data, asset paths, SEO metadata.',
    checklist_fr: [
      'Dépôt GitHub créé et poussé',
      'Déploiement Vercel fonctionnel',
      'Fichier d\'intégration généré',
      'Assets uploadés (vidéos, images)',
      'URL de démo vérifiée',
    ],
    checklist_en: [
      'GitHub repository created and pushed',
      'Vercel deployment working',
      'Integration file generated',
      'Assets uploaded (videos, images)',
      'Demo URL verified',
    ],
  },
  {
    number: 7,
    name_fr: 'PUBLIER',
    name_en: 'PUBLISH',
    duration: 'variable',
    input_fr: 'Pack d\'intégration',
    input_en: 'Integration pack',
    output_fr: 'Page projet publiée sur le portfolio',
    output_en: 'Project page published on portfolio',
    description_fr: 'Intégrer le case study dans le site portfolio. Créer la page projet, connecter les données, vérifier le rendu sur mobile et desktop. Le projet devient visible et partageable.',
    description_en: 'Integrate the case study into the portfolio site. Create the project page, connect the data, verify rendering on mobile and desktop. The project becomes visible and shareable.',
    checklist_fr: [
      'Page projet créée dans le portfolio',
      'Données connectées depuis le fichier d\'intégration',
      'Vidéos et images chargées correctement',
      'Rendu vérifié sur mobile et desktop',
      'SEO : titre, description, Open Graph',
      'Page accessible via l\'URL publique',
    ],
    checklist_en: [
      'Project page created in portfolio',
      'Data connected from integration file',
      'Videos and images loading correctly',
      'Rendering verified on mobile and desktop',
      'SEO: title, description, Open Graph',
      'Page accessible via public URL',
    ],
  },
];

export const SHIP_TO_SHOW_PROBLEM = {
  fr: 'Les designers et développeurs construisent des prototypes mais les documentent rarement dans leur portfolio. Le travail de production d\'un case study (rédaction, vidéos, déploiement, intégration) prend plusieurs jours et mobilise des compétences variées : motion design, rédaction, devops. La plupart des prototypes restent dans un dossier local sans jamais être publiés.',
  en: 'Designers and developers build prototypes but rarely document them in their portfolio. Producing a case study (writing, videos, deployment, integration) takes several days and requires varied skills: motion design, writing, devops. Most prototypes stay in a local folder and never get published.',
};

export const SHIP_TO_SHOW_SOLUTION = {
  fr: 'Ship to Show structure ce travail en 7 phases exécutables par un agent IA. Chaque phase a un prompt structuré, une checklist de sortie et un livrable concret. Le processus complet prend environ 2h30.',
  en: 'Ship to Show structures this work into 7 phases executable by an AI agent. Each phase has a structured prompt, an exit checklist, and a concrete deliverable. The full process takes about 2h30.',
};

export const SHIP_TO_SHOW_PREREQUISITES = {
  fr: ['Node.js 18+', 'FFmpeg', 'Git', 'GitHub CLI', 'Vercel CLI', 'Un agent IA (Claude Code recommandé)'],
  en: ['Node.js 18+', 'FFmpeg', 'Git', 'GitHub CLI', 'Vercel CLI', 'An AI agent (Claude Code recommended)'],
};

export const SHIP_TO_SHOW_INSTALL = {
  command: `mkdir -p ~/.claude/skills/ship-to-show && curl -o ~/.claude/skills/ship-to-show/SKILL.md https://raw.githubusercontent.com/marcus-clay/ship-to-show/main/SKILL.md`,
  invocation: '/ship-to-show',
};
