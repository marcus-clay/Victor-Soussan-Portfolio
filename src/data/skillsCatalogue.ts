/**
 * The skills catalogue: one list, one entry per skill or collection. Adding a skill is adding an entry here;
 * the catalogue page (search, themes), the picture of its card and the counts all derive from this file.
 *
 * Each entry says what the skill does, one or two benefits, and the outcome it leads to. The sources are
 * the design-skills repository (the skills written here) and the repositories of their authors (the
 * recommended ones, which are never copied: the entry credits the author and points to the source).
 */

export type Lang = 'en' | 'fr'
type Bi<T> = { en: T; fr: T }

export const SKILLS_REPO = 'https://github.com/marcus-clay/design-skills'
export const SKILLS_DEMOS = 'https://marcus-clay.github.io/prototype-anime-skill/'

export type ThemeId =
  | 'product'
  | 'design'
  | 'ai'
  | 'ideation'
  | 'facilitation'
  | 'prototyping'
  | 'animation'
  | 'illustration'
  | 'writing'
  | 'presentations'

/** The themes, in the order of the filter. `accent` is the hue of the illustrations of the theme (see accentPalette). */
export const SKILL_THEMES: { id: ThemeId; label: Bi<string>; accent: number }[] = [
  { id: 'product', label: { en: 'Product and strategy', fr: 'Produit et stratégie' }, accent: 7 },
  { id: 'design', label: { en: 'Design and UX', fr: 'Design et UX' }, accent: 8 },
  { id: 'ai', label: { en: 'Designing AI', fr: 'Design de l’IA' }, accent: 9 },
  { id: 'ideation', label: { en: 'Ideation and creation', fr: 'Idéation et création' }, accent: 1 },
  { id: 'facilitation', label: { en: 'Facilitation', fr: 'Facilitation' }, accent: 2 },
  { id: 'prototyping', label: { en: 'Prototyping', fr: 'Prototypage' }, accent: 6 },
  { id: 'animation', label: { en: 'Animation', fr: 'Animation' }, accent: 4 },
  { id: 'illustration', label: { en: 'Illustration and diagrams', fr: 'Illustration et schémas' }, accent: 5 },
  { id: 'writing', label: { en: 'Writing and brand', fr: 'Écriture et marque' }, accent: 3 },
  { id: 'presentations', label: { en: 'Presentations', fr: 'Présentations' }, accent: 0 },
]

/** What the picture of the card draws (see SkillScene): one family of scene per kind of skill */
export type SceneKind =
  | 'steps'
  | 'roadmap'
  | 'lens'
  | 'agenda'
  | 'film'
  | 'window'
  | 'diagram'
  | 'sheet'
  | 'sketch'
  | 'deck'
  | 'palette'
  | 'text'
  | 'search'
  | 'prompt'
  | 'curve'
  | 'score'
  | 'layers'
  | 'link'
  | 'stack'

export interface SkillEntry {
  id: string
  /** The first theme is the one the card is coloured with */
  themes: ThemeId[]
  /** Written here ('own'), or written by someone else and recommended ('recommended') */
  origin: 'own' | 'recommended'
  /** The name shown on the card */
  name: string
  scene: SceneKind
  /** A word or two drawn on the picture (an annotation, a command, a file name) */
  note?: string
  summary: Bi<string>
  /** One or two benefits */
  benefits: Bi<string[]>
  /** The outcome the skill leads to */
  outcome: Bi<string>
  /** Authors of the recommended skills, and their licence when it matters */
  author?: string
  license?: string
  /** Where to find it */
  href: string
  /** Live demos of the skill, when it has some (shown on its own page only) */
  demos?: string
  /** The install command given by the source of a recommended skill (written skills are installed from their archive) */
  install?: string
  /** Extra words that make the search find it */
  keywords?: string[]
}

const own = (id: string) => `${SKILLS_REPO}/tree/main/skills/${id}`

export const SKILLS: SkillEntry[] = [
  // Product and strategy
  {
    id: 'socle',
    themes: ['product'],
    origin: 'own',
    name: 'socle',
    scene: 'steps',
    note: 'structurer · outiller · construire',
    summary: {
      en: 'Guides the start of a digital product in five steps: structure, equip, build, ship, extend.',
      fr: 'Guide le démarrage d’un produit digital en cinq étapes\u00a0: structurer, outiller, construire, livrer, élargir.',
    },
    benefits: {
      en: ['Decisions are made once, in order', 'Technical foundations are set up in one pass'],
      fr: ['Chaque décision est prise une fois, dans l’ordre', 'Les bases techniques sont posées en une seule passe'],
    },
    outcome: {
      en: 'A project ready to build in short, complete increments.',
      fr: 'Un projet prêt à être construit par petites étapes complètes.',
    },
    href: own('socle'),
    keywords: ['mvp', 'saas', 'startup', 'cadrage'],
  },
  {
    id: 'personal-os',
    themes: ['product', 'writing'],
    origin: 'own',
    name: 'personal-os',
    scene: 'stack',
    note: 'inbox · journal · board',
    summary: {
      en: 'Creates a personal OS with Claude Code: a folder of text files with an inbox, rules and agents.',
      fr: 'Crée un OS personnel avec Claude Code\u00a0: un dossier de fichiers texte avec une inbox, des règles et des agents.',
    },
    benefits: {
      en: ['Sorts notes into decisions, actions, facts and questions', 'Includes ready-made agents and commands to run them'],
      fr: ['Trie les notes en décisions, actions, faits et questions', 'Fournit des agents prêts à l’emploi et leurs commandes'],
    },
    outcome: {
      en: 'A memory and a dashboard of your work, updated by Claude and checked by you.',
      fr: 'Une mémoire et un tableau de bord du travail, mis à jour par Claude et validés par vous.',
    },
    href: own('personal-os'),
    keywords: ['brain', 'second cerveau', 'agent', 'agentique', 'inbox', 'mémoire', 'head of design', 'pilotage'],
  },
  {
    id: 'direction-design',
    themes: ['product', 'design'],
    origin: 'own',
    name: 'direction-design',
    scene: 'roadmap',
    note: 'maintenant · ensuite · plus tard',
    summary: {
      en: 'Builds a design roadmap, a meeting schedule and the arguments to support a trade-off decision.',
      fr: 'Prépare une feuille de route design, un calendrier d’instances et les arguments pour un arbitrage.',
    },
    benefits: {
      en: ['Design work is ready before the next step needs it', 'Arguments link to what the other side already accepts'],
      fr: ['Le travail design est prêt avant que la suite en dépende', 'Des arguments liés à ce que l’interlocuteur admet déjà'],
    },
    outcome: {
      en: 'A design position with a fallback option, ready for the trade-off discussion.',
      fr: 'Une position design avec une option de repli, prête pour la discussion d’arbitrage.',
    },
    href: own('direction-design'),
    keywords: ['roadmap', 'arbitrage', 'head of design', 'gouvernance'],
  },
  {
    id: 'spec-ideation',
    themes: ['ideation', 'product'],
    origin: 'recommended',
    name: 'spec-ideation',
    scene: 'steps',
    note: 'expansion · contraction · doc',
    summary: {
      en: 'Turns a rough idea into a specification in three phases: expansion, contraction, documentation.',
      fr: 'Transforme une idée brute en spécification en trois phases\u00a0: expansion, contraction, documentation.',
    },
    benefits: {
      en: ['Ideas are structured before you give them to an AI', 'Decisions are recorded along with ideas'],
      fr: ['Les idées sont structurées avant d’être confiées à une IA', 'Les décisions sont consignées avec les idées'],
    },
    outcome: {
      en: 'A clear specification built from a first rough idea.',
      fr: 'Une spécification claire, construite à partir d’une première idée brute.',
    },
    author: 'cris-achiardi',
    license: 'MIT',
    href: 'https://github.com/cris-achiardi/claude-skills',
  },
  {
    id: 'karpathy-guidelines',
    themes: ['product'],
    origin: 'recommended',
    name: 'karpathy-guidelines',
    scene: 'text',
    note: 'think · simple · surgical',
    summary: {
      en: 'Gives behaviour rules to a model that writes code, to reduce common mistakes.',
      fr: 'Donne des règles de comportement à un modèle qui écrit du code, pour réduire les erreurs courantes.',
    },
    benefits: {
      en: ['The model thinks before it writes', 'The model keeps code simple and changes little'],
      fr: ['Le modèle réfléchit avant d’écrire', 'Le modèle garde un code simple et modifie peu'],
    },
    outcome: {
      en: 'Code changes that are smaller and easier to review.',
      fr: 'Des modifications de code plus courtes et plus faciles à relire.',
    },
    author: 'forrestchang',
    href: 'https://github.com/forrestchang/andrej-karpathy-skills',
    keywords: ['code', 'claude code'],
  },
  {
    id: 'find-skills',
    themes: ['product'],
    origin: 'recommended',
    name: 'find-skills',
    scene: 'search',
    note: 'npx skills add',
    summary: {
      en: 'Searches the open skills ecosystem and installs the skills you pick.',
      fr: 'Recherche des skills dans l’écosystème ouvert et installe celles que vous choisissez.',
    },
    benefits: {
      en: ['Finds a skill from a described need', 'Installs it with one command'],
      fr: ['Trouve une skill à partir d’un besoin décrit', 'L’installe avec une seule commande'],
    },
    outcome: {
      en: 'The skill you need, found and installed from the command line.',
      fr: 'La skill voulue, trouvée et installée en ligne de commande.',
    },
    author: 'Vercel Labs',
    href: 'https://github.com/vercel-labs/skills',
  },

  // Design and UX
  {
    id: 'ux-et-design-thinking',
    themes: ['design'],
    origin: 'own',
    name: 'ux-et-design-thinking',
    scene: 'lens',
    note: 'job → écran',
    summary: {
      en: 'Reviews a journey or a screen: job to be done, usage facts and reuse of components.',
      fr: 'Analyse un parcours ou un écran\u00a0: job à accomplir, faits d’usage et réutilisation des composants.',
    },
    benefits: {
      en: ['Each critique links to an impact on users', 'Hypotheses are separated from observed facts'],
      fr: ['Chaque critique renvoie à un impact sur les utilisateurs', 'Les hypothèses sont séparées des faits observés'],
    },
    outcome: {
      en: 'A design decision backed by a stated reason.',
      fr: 'Une décision de conception appuyée sur une raison explicite.',
    },
    href: own('ux-et-design-thinking'),
    keywords: ['jtbd', 'jobs to be done', 'parcours', 'critique'],
  },
  {
    id: 'ux-designer',
    themes: ['design'],
    origin: 'recommended',
    name: 'ux-designer',
    scene: 'agenda',
    note: 'research · IA · tests',
    summary: {
      en: 'Helps with UX work: research, wireframes, journeys, personas, usability tests, information architecture.',
      fr: 'Aide en UX\u00a0: recherche, wireframes, parcours, personas, tests d’utilisabilité, architecture d’information.',
    },
    benefits: {
      en: ['Covers the process from research to handoff', 'Ranks rules by priority: needs, accessibility, usability'],
      fr: ['Couvre le processus de la recherche à la passation', 'Classe les règles\u00a0: besoins, accessibilité, utilisabilité'],
    },
    outcome: {
      en: 'A journey or screen reviewed, with recommendations ranked by severity.',
      fr: 'Un parcours ou un écran revu, avec des recommandations classées par gravité.',
    },
    author: 'awesome-llm-apps',
    license: 'MIT',
    href: 'https://github.com/Shubhamsaboo/awesome-llm-apps',
    keywords: ['persona', 'wireframe', 'accessibilité'],
  },
  {
    id: 'impeccable',
    themes: ['design', 'animation'],
    origin: 'recommended',
    name: 'impeccable',
    scene: 'prompt',
    note: '/impeccable polish',
    summary: {
      en: 'Provides commands to guide and check the design of an interface, such as audit, critique and polish.',
      fr: 'Fournit des commandes pour guider et contrôler le design d’une interface, dont audit, critique et polish.',
    },
    benefits: {
      en: ['Review commands: audit, critique, polish', 'Rules that detect common flaws in generated front ends'],
      fr: ['Commandes de revue\u00a0: audit, critique, polish', 'Règles qui repèrent les défauts courants d’un front généré'],
    },
    outcome: {
      en: 'An interface checked for common flaws before release.',
      fr: 'Une interface contrôlée, avec les défauts courants repérés avant la mise en ligne.',
    },
    author: 'Paul Bakaus',
    license: 'Apache 2.0',
    href: 'https://impeccable.style',
    install: 'npx impeccable install',
    keywords: ['audit', 'critique', 'polish', 'frontend'],
  },
  {
    id: 'ui-skills',
    themes: ['design', 'animation'],
    origin: 'recommended',
    name: 'ui-skills',
    scene: 'agenda',
    note: 'a11y · metadata · motion',
    summary: {
      en: 'Checks and fixes an interface: visual baseline, accessibility, metadata, animation performance.',
      fr: 'Contrôle et corrige une interface\u00a0: base visuelle, accessibilité, métadonnées, performance des animations.',
    },
    benefits: {
      en: ['Fixes are run in targeted passes', 'Accessibility and metadata are checked'],
      fr: ['Les corrections se font par passes ciblées', 'L’accessibilité et les métadonnées sont vérifiées'],
    },
    outcome: {
      en: 'An interface checked and corrected before delivery.',
      fr: 'Une interface contrôlée et corrigée avant la livraison.',
    },
    author: 'ibelick',
    license: 'MIT',
    href: 'https://github.com/ibelick/ui-skills',
    keywords: ['accessibilité', 'seo', 'performance'],
  },
  {
    id: 'taste-skill',
    themes: ['design'],
    origin: 'recommended',
    name: 'taste-skill',
    scene: 'palette',
    note: 'variance · motion · density',
    summary: {
      en: 'A family of skills that helps avoid the generic look of a generated interface.',
      fr: 'Une famille de skills qui aide à éviter l’aspect générique d’une interface générée.',
    },
    benefits: {
      en: ['Settings for variance, motion and density', 'Variants for the model you use'],
      fr: ['Réglages de variance, de mouvement et de densité', 'Variantes selon le modèle utilisé'],
    },
    outcome: {
      en: 'A front end with a less generic look.',
      fr: 'Une interface au rendu moins générique.',
    },
    author: 'Leonxlnx',
    license: 'MIT',
    href: 'https://github.com/Leonxlnx/taste-skill',
  },
  {
    id: 'designer-skills',
    themes: ['design'],
    origin: 'recommended',
    name: 'designer-skills',
    scene: 'stack',
    note: 'personas · journeys · critique',
    summary: {
      en: 'A collection of skills for designers: research, journeys, personas, workshops, critique, design systems.',
      fr: 'Une collection de skills pour designers\u00a0: recherche, parcours, personas, ateliers, critique, design systems.',
    },
    benefits: {
      en: ['Covers many kinds of design work', 'One skill per activity, used when needed'],
      fr: ['Couvre de nombreux types de travail de design', 'Une skill par activité, utilisée selon le besoin'],
    },
    outcome: {
      en: 'A method framework for each design activity.',
      fr: 'Un cadre de méthode pour chaque activité de conception.',
    },
    author: 'Owl-Listener',
    license: 'MIT',
    href: 'https://github.com/Owl-Listener/designer-skills',
    keywords: ['collection', 'recherche', 'persona', 'design system'],
  },
  {
    id: 'layers-skills',
    themes: ['design', 'product'],
    origin: 'recommended',
    name: 'layers-skills',
    scene: 'layers',
    note: 'surface ← besoins',
    summary: {
      en: 'Applies Layers of Product Design: layers that run from observed behaviour to surface decisions.',
      fr: 'Applique Layers of Product Design\u00a0: des couches qui vont du comportement observé aux décisions de surface.',
    },
    benefits: {
      en: ['Checks the foundations before the surface', 'One entry point per layer'],
      fr: ['Vérifie les fondations avant la surface', 'Une entrée par couche'],
    },
    outcome: {
      en: 'A surface decision backed by observed needs.',
      fr: 'Une décision de surface appuyée sur des besoins observés.',
    },
    author: 'Jamie Mill',
    license: 'MIT',
    href: 'https://github.com/jamiemill/layers-skills',
  },

  // Designing AI
  {
    id: 'ai-design-skills',
    themes: ['ai'],
    origin: 'recommended',
    name: 'ai-design-skills',
    scene: 'score',
    note: 'trust · transparency',
    summary: {
      en: 'Helps design AI products and agents: trust, transparency, escalation, evaluation, context.',
      fr: 'Aide à concevoir des produits et des agents d’IA\u00a0: confiance, transparence, escalade, évaluation, contexte.',
    },
    benefits: {
      en: ['Patterns for products that act on their own', 'Criteria to evaluate an interaction with an AI'],
      fr: ['Modèles pour les produits qui agissent seuls', 'Critères pour évaluer une interaction avec une IA'],
    },
    outcome: {
      en: 'An AI product whose limits and trust are defined.',
      fr: 'Un produit d’IA dont les limites et la confiance sont définies.',
    },
    author: 'Owl-Listener',
    license: 'MIT',
    href: 'https://github.com/Owl-Listener/ai-design-skills',
    keywords: ['agent', 'agentique', 'llm', 'prompt'],
  },

  // Ideation and creation
  {
    id: 'creative-director',
    themes: ['ideation'],
    origin: 'recommended',
    name: 'creative-director',
    scene: 'score',
    note: 'insight → concept',
    summary: {
      en: 'Generates creative concepts with ideation methods, then evaluates and refines them.',
      fr: 'Génère des concepts créatifs avec des méthodes d’idéation, puis les évalue et les affine.',
    },
    benefits: {
      en: ['Starts from an insight before any idea', 'Combines several methods to widen the options'],
      fr: ['Part d’un insight avant toute idée', 'Combine plusieurs méthodes pour élargir les pistes'],
    },
    outcome: {
      en: 'Evaluated concepts with a reasoned recommendation.',
      fr: 'Des concepts évalués, avec une recommandation argumentée.',
    },
    author: 'Serge Shima',
    license: 'CC BY 4.0',
    href: 'https://github.com/smixs/creative-director-skill',
    install: 'npx skills add smixs/creative-director-skill',
    keywords: ['campagne', 'concept', 'direction artistique'],
  },
  {
    id: 'signal-research',
    themes: ['ideation', 'writing'],
    origin: 'own',
    name: 'signal-research',
    scene: 'search',
    note: 'signals → angles',
    summary: {
      en: 'Monitors signals in UI/UX, product, AI and tools, then proposes content angles for your positioning.',
      fr: 'Surveille UI/UX, produit, IA et outils, puis propose des angles de contenu selon votre positionnement.',
    },
    benefits: {
      en: ['Scans several domains from ready-made queries', 'Fits angles to a positioning brief'],
      fr: ['Explore plusieurs domaines avec des requêtes prêtes', 'Adapte les angles à un brief de positionnement'],
    },
    outcome: {
      en: 'A research brief with content angles, ready to write from.',
      fr: 'Un brief de recherche avec des angles de contenu, prêt pour la rédaction.',
    },
    href: own('signal-research'),
    keywords: ['veille', 'linkedin', 'contenu'],
  },

  // Facilitation
  {
    id: 'facilitation-ateliers',
    themes: ['facilitation'],
    origin: 'own',
    name: 'facilitation-ateliers',
    scene: 'agenda',
    note: '30 min · décision',
    summary: {
      en: 'Plans a workshop or meeting: format, participants, duration and deliverable.',
      fr: 'Prépare le déroulé d’un atelier ou d’une réunion\u00a0: format, participants, durée, livrable.',
    },
    benefits: {
      en: ['Picks the format that fits each kind of subject', 'Gives a timed plan you can share in advance'],
      fr: ['Propose le format adapté à chaque type de sujet', 'Donne un déroulé minuté à partager à l’avance'],
    },
    outcome: {
      en: 'A session that ends with a decision, a ranked list or usable material.',
      fr: 'Une séance qui se termine par une décision, une liste priorisée ou des notes exploitables.',
    },
    href: own('facilitation-ateliers'),
    keywords: ['réunion', 'atelier', 'priorisation'],
  },

  // Prototyping
  {
    id: 'prototype-anime',
    themes: ['prototyping', 'animation'],
    origin: 'own',
    name: 'prototype-anime',
    scene: 'film',
    note: 'tap · clic · caméra',
    summary: {
      en: 'Plays a journey of screens as a film, on mobile or desktop, with finger or cursor, typing and camera.',
      fr: 'Joue un parcours d’écrans comme un film, sur mobile ou desktop, avec doigt ou curseur, saisie et caméra.',
    },
    benefits: {
      en: ['The journey is shown step by step on screen', 'One engine for a mobile app and a web product'],
      fr: ['Le parcours se déroule étape par étape à l’écran', 'Un seul moteur pour une app mobile et un produit web'],
    },
    outcome: {
      en: 'A short film for a case study, a presentation or a demo.',
      fr: 'Un film court pour une étude de cas, une présentation ou une démo.',
    },
    href: 'https://github.com/marcus-clay/prototype-anime-skill',
    demos: SKILLS_DEMOS,
    keywords: ['démo', 'vidéo', 'motion', 'case study', 'framer motion'],
  },
  {
    id: 'ship-to-show',
    themes: ['prototyping'],
    origin: 'own',
    name: 'ship-to-show',
    scene: 'steps',
    note: '7 phases',
    summary: {
      en: 'Turns a prototype into a published case study in seven phases, with videos and bilingual content.',
      fr: 'Transforme un prototype en étude de cas publiée en sept phases, avec vidéos et contenu bilingue.',
    },
    benefits: {
      en: ['Seven phases from prototype to publication', 'Text content and videos are produced together'],
      fr: ['Sept phases du prototype à la publication', 'Le contenu rédigé et les vidéos sont produits ensemble'],
    },
    outcome: {
      en: 'A published case study with its animated demonstrations.',
      fr: 'Une étude de cas publiée, avec ses démonstrations animées.',
    },
    href: own('ship-to-show'),
    keywords: ['portfolio', 'case study', 'étude de cas'],
  },
  {
    id: 'figma-console-mcp',
    themes: ['prototyping', 'design'],
    origin: 'recommended',
    name: 'figma-console-mcp',
    scene: 'link',
    note: 'Claude ↔ Figma',
    summary: {
      en: 'An MCP server that connects the AI to Figma to read and create designs, tokens and components.',
      fr: 'Un serveur MCP qui relie l’IA à Figma pour lire et créer des designs, des tokens et des composants.',
    },
    benefits: {
      en: ['Read and create in Figma from the conversation', 'Commands to audit and document a design system'],
      fr: ['Lire et créer dans Figma depuis la conversation', 'Commandes pour auditer et documenter un design system'],
    },
    outcome: {
      en: 'A design system you can query and edit from the conversation.',
      fr: 'Un design system consultable et modifiable depuis la conversation.',
    },
    author: 'TJ Pitre, Southleft',
    license: 'MIT',
    href: 'https://docs.figma-console-mcp.southleft.com',
    keywords: ['figma', 'mcp', 'tokens', 'design system', 'agentique'],
  },

  // Animation
  {
    id: 'emil-design-eng',
    themes: ['animation', 'design'],
    origin: 'recommended',
    name: 'emil-design-eng',
    scene: 'curve',
    note: 'ease-out · 200ms',
    summary: {
      en: 'Principles for finishing an interface and choosing animations.',
      fr: 'Des principes pour soigner la finition d’une interface et choisir ses animations.',
    },
    benefits: {
      en: ['A frame to decide if, when and how to animate', 'Attention to small details that add up'],
      fr: ['Un cadre pour décider si, quand et comment animer', 'Une attention aux petits détails qui s’additionnent'],
    },
    outcome: {
      en: 'An interface where each motion detail has a reason.',
      fr: 'Une interface où chaque détail de mouvement a une raison.',
    },
    author: 'Emil Kowalski',
    href: 'https://github.com/emilkowalski/skills',
    keywords: ['animation', 'finition', 'motion', 'easing'],
  },
  {
    id: 'transitions-dev',
    themes: ['animation'],
    origin: 'recommended',
    name: 'transitions-dev',
    scene: 'curve',
    note: 'modal · menu · badge',
    summary: {
      en: 'A collection of ready-to-use CSS transitions for modals, menus, badges and panels.',
      fr: 'Une collection de transitions CSS prêtes à l’emploi pour modales, menus, badges et panneaux.',
    },
    benefits: {
      en: ['Transitions you copy and connect to your interface', 'A shared vocabulary for motion'],
      fr: ['Des transitions à copier et à brancher', 'Un vocabulaire de mouvement partagé'],
    },
    outcome: {
      en: 'Consistent interface animations built from existing transitions.',
      fr: 'Des animations d’interface cohérentes, construites à partir de transitions existantes.',
    },
    author: 'Jakub Antalik',
    href: 'https://transitions.dev',
    install: 'npx skills add Jakubantalik/transitions.dev',
    keywords: ['css', 'animation', 'modale', 'menu'],
  },
  {
    id: 'transitions-polish',
    themes: ['animation'],
    origin: 'recommended',
    name: 'transitions-polish',
    scene: 'curve',
    note: '250ms → 150ms',
    summary: {
      en: 'Refines existing animations using a scale of durations, distances, blurs and curves.',
      fr: 'Affine des animations existantes selon une échelle de durées, de distances, de flous et de courbes.',
    },
    benefits: {
      en: ['Audits the motion values of a project', 'Rules for opening, closing and staggering'],
      fr: ['Audite les valeurs de mouvement d’un projet', 'Règles d’ouverture, de fermeture et de décalage'],
    },
    outcome: {
      en: 'Consistent motion across the whole product.',
      fr: 'Un mouvement homogène sur l’ensemble du produit.',
    },
    author: 'Jakub Antalik',
    href: 'https://transitions.dev',
    keywords: ['audit', 'durée', 'easing', 'tokens'],
  },
  {
    id: 'drawing-animated-diagrams',
    themes: ['animation', 'illustration'],
    origin: 'own',
    name: 'drawing-animated-diagrams',
    scene: 'diagram',
    note: 'se dessine au défilement',
    summary: {
      en: 'Creates SVG diagrams for React that draw themselves when they enter the screen, in ink and grey.',
      fr: 'Crée des diagrammes SVG pour React qui se dessinent à leur arrivée à l’écran, en encre et en gris.',
    },
    benefits: {
      en: ['One idea per diagram, drawn in reading order', 'Same parts and same motion in every diagram'],
      fr: ['Une idée par diagramme, dessinée dans l’ordre de lecture', 'Mêmes pièces et même mouvement dans chaque diagramme'],
    },
    outcome: {
      en: 'An animated diagram that explains a process.',
      fr: 'Un schéma animé qui explique un processus.',
    },
    href: own('drawing-animated-diagrams'),
    keywords: ['svg', 'react', 'schéma', 'scroll'],
  },

  // Illustration and diagrams
  {
    id: 'card-illustrations',
    themes: ['illustration'],
    origin: 'own',
    name: 'card-illustrations',
    scene: 'sheet',
    note: '01 02 03',
    summary: {
      en: 'Creates card illustrations: a fragment of the subject itself, annotations and a touch of accent colour.',
      fr: 'Crée des illustrations de cartes\u00a0: un fragment du sujet, des annotations et une touche de couleur d’accent.',
    },
    benefits: {
      en: ['Consistent cards, in black and white or in colour', 'Reusable parts to compose each scene'],
      fr: ['Des cartes cohérentes, en noir et blanc ou en couleur', 'Des pièces réutilisables pour composer chaque scène'],
    },
    outcome: {
      en: 'Thumbnails whose picture shows what the content is.',
      fr: 'Des vignettes dont l’image indique le contenu.',
    },
    href: own('card-illustrations'),
    keywords: ['vignette', 'illustration', 'carte', 'ressources'],
  },
  {
    id: 'marker-sketch',
    themes: ['illustration'],
    origin: 'own',
    name: 'marker-sketch',
    scene: 'sketch',
    note: 'feutre · papier à points',
    summary: {
      en: 'Creates marker sketches on dotted paper as SVG, including an interactive mode.',
      fr: 'Crée des croquis au feutre sur papier à points, en SVG, dont un mode interactif.',
    },
    benefits: {
      en: ['A clear diagram in seconds, in a meeting or in writing', 'The same style from one sketch to the next'],
      fr: ['Un schéma clair en peu de temps, en réunion ou à l’écrit', 'Le même style d’un croquis à l’autre'],
    },
    outcome: {
      en: 'A sketch ready to use to explain or decide.',
      fr: 'Un croquis utilisable tout de suite pour expliquer ou décider.',
    },
    href: own('marker-sketch'),
    keywords: ['croquis', 'schéma', 'wireframe', 'atelier'],
  },
  {
    id: 'diagram-storytelling',
    themes: ['illustration', 'presentations'],
    origin: 'own',
    name: 'diagram-storytelling',
    scene: 'diagram',
    note: 'une idée',
    summary: {
      en: 'Creates minimal zonings, wireframes and diagrams for slides, with one idea per diagram.',
      fr: 'Crée des zonings, wireframes et schémas minimalistes pour des slides, avec une idée par diagramme.',
    },
    benefits: {
      en: ['Each diagram is understood on its own', 'Elements are removed before any is added'],
      fr: ['Chaque diagramme se comprend seul', 'On retire des éléments avant d’en ajouter'],
    },
    outcome: {
      en: 'Presentation diagrams that each carry one idea.',
      fr: 'Des schémas de présentation qui portent chacun une idée.',
    },
    href: own('diagram-storytelling'),
    keywords: ['zoning', 'wireframe', 'schéma', 'slides'],
  },

  // Writing and brand
  {
    id: 'sober-writing',
    themes: ['writing'],
    origin: 'own',
    name: 'sober-writing',
    scene: 'text',
    note: 'faits · raisonnement',
    summary: {
      en: 'Applies a sober writing style: facts, visible reasoning and narrative headings.',
      fr: 'Applique un style d’écriture sobre\u00a0: des faits, un raisonnement visible et des titres narratifs.',
    },
    benefits: {
      en: ['Removes the writing habits typical of language models', 'Keeps a peer-to-peer tone and avoids superlatives'],
      fr: ['Retire les tics d’écriture des modèles de langage', 'Garde un ton de pair à pair et évite les superlatifs'],
    },
    outcome: {
      en: 'A text ready to read or publish, with the tone already right.',
      fr: 'Un texte prêt à être lu ou publié, au ton déjà ajusté.',
    },
    href: own('sober-writing'),
    keywords: ['rédaction', 'linkedin', 'ton', 'écriture'],
  },
  {
    id: 'francais-parfait',
    themes: ['writing'],
    origin: 'own',
    name: 'francais-parfait',
    scene: 'text',
    note: '« guillemets » · œ',
    summary: {
      en: 'Applies rules for native French writing: accents, ligatures, quotation marks, non-breaking spaces.',
      fr: 'Applique les règles d’écriture du français natif\u00a0: accents, ligatures, guillemets, espaces insécables.',
    },
    benefits: {
      en: ['French typography applied throughout a text', 'A natural style that avoids non-native phrasing'],
      fr: ['Typographie française appliquée dans tout le texte', 'Un style naturel qui évite les tournures non natives'],
    },
    outcome: {
      en: 'French text that reads as if a person wrote it.',
      fr: 'Un texte en français qui se lit comme écrit par une personne.',
    },
    href: own('francais-parfait'),
    keywords: ['typographie', 'orthographe', 'français'],
  },
  {
    id: 'brand-system',
    themes: ['writing', 'presentations'],
    origin: 'own',
    name: 'brand-system',
    scene: 'palette',
    note: '#3D65E8 · Inter',
    summary: {
      en: 'Provides a ready-to-use brand system: palette, typography, gradient, components and tone.',
      fr: 'Fournit un système de marque prêt à l’emploi\u00a0: palette, typographie, dégradé, composants et ton.',
    },
    benefits: {
      en: ['Tokens ready to import as CSS or JSON', 'A base you can replace with a project’s own brand'],
      fr: ['Tokens prêts à importer en CSS ou en JSON', 'Une base à remplacer par la charte d’un projet'],
    },
    outcome: {
      en: 'Consistent deliverables from the first version.',
      fr: 'Des livrables cohérents dès la première version.',
    },
    href: own('brand-system'),
    keywords: ['charte', 'marque', 'tokens', 'palette', 'identité'],
  },

  // Presentations
  {
    id: 'slides',
    themes: ['presentations'],
    origin: 'own',
    name: 'slides',
    scene: 'deck',
    note: '15 mises en page',
    summary: {
      en: 'Provides tokens, fifteen layouts and narrative conventions for presentations.',
      fr: 'Fournit des tokens, quinze mises en page et des conventions de narration pour des présentations.',
    },
    benefits: {
      en: ['Fifteen layouts to pick from quickly', 'Titles that state the logic of the deck'],
      fr: ['Quinze mises en page pour choisir rapidement', 'Des titres qui expriment la logique du deck'],
    },
    outcome: {
      en: 'A presentation whose titles alone give the full storyline.',
      fr: 'Une présentation dont les titres suffisent à suivre le fil.',
    },
    href: own('slides'),
    keywords: ['deck', 'présentation', 'keynote', 'pitch'],
  },
  {
    id: 'pptx',
    themes: ['presentations'],
    origin: 'recommended',
    name: 'pptx',
    scene: 'deck',
    note: '.pptx',
    summary: {
      en: 'Generates PowerPoint presentations: slides, sections, tables, export as .pptx.',
      fr: 'Génère des présentations PowerPoint\u00a0: slides, sections, tableaux, export en fichier .pptx.',
    },
    benefits: {
      en: ['Generates .pptx files from the conversation', 'Works with slides and brand-system'],
      fr: ['Génère des fichiers .pptx depuis la conversation', 'Fonctionne avec slides et brand-system'],
    },
    outcome: {
      en: 'A presentation file ready to download.',
      fr: 'Un fichier de présentation prêt à télécharger.',
    },
    author: 'Anthropic',
    href: 'https://github.com/anthropics/skills',
    keywords: ['powerpoint', 'deck'],
  },
]

export const getTheme = (id: ThemeId) => SKILL_THEMES.find((t) => t.id === id)!

/** The skills of a theme, the ones it comes first for first */
export const skillsOfTheme = (id: ThemeId) => SKILLS.filter((s) => s.themes.includes(id))

/** Ids of the skills shown on the Claude page and on the home page */
export const FEATURED_SKILL_IDS = ['creative-director', 'ux-et-design-thinking', 'ux-designer', 'emil-design-eng', 'transitions-polish', 'prototype-anime']

/** The words a search looks into, in both languages, lower-cased and without accents */
export function searchText(s: SkillEntry): string {
  const all = [s.name, s.note ?? '', s.author ?? '', s.summary.en, s.summary.fr, ...s.benefits.en, ...s.benefits.fr, s.outcome.en, s.outcome.fr, ...(s.keywords ?? []), ...s.themes.flatMap((t) => [getTheme(t).label.en, getTheme(t).label.fr])]
  return all.join(' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

/** Where the archives of the written skills are published */
export const SKILLS_RELEASE = `${SKILLS_REPO}/releases/latest/download`
const PROTOTYPE_ANIME_RELEASE = 'https://github.com/marcus-clay/prototype-anime-skill/releases/latest/download'

/** The zip of a written skill, or null for a recommended one */
export function archiveUrl(s: SkillEntry): string | null {
  if (s.origin !== 'own') return null
  return `${s.id === 'prototype-anime' ? PROTOTYPE_ANIME_RELEASE : SKILLS_RELEASE}/${s.id}.zip`
}

/** The command that installs a skill for an agent: from its archive when it is written here, from its own source otherwise (null when the source gives none) */
export function installCommand(s: SkillEntry, folder: '~/.claude/skills' | '~/.agents/skills'): string | null {
  const zip = archiveUrl(s)
  if (zip) return `curl -L -o ${s.id}.zip ${zip} && unzip -o ${s.id}.zip -d ${folder}`
  return folder === '~/.claude/skills' ? (s.install ?? null) : null
}

/** The skills that share a theme with this one (its own first), without itself */
export const relatedSkills = (s: SkillEntry, max = 3) => SKILLS.filter((o) => o.id !== s.id && o.themes.includes(s.themes[0])).slice(0, max)
