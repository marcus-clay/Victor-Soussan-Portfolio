// Approach, second version: two halves of the same weight. Structuring the product (the organisation, the
// roadmap, the cycles), then designing the experience (journeys and interaction, prototypes in code and in
// Figma, deliverables to implement).
// One idea per act, one sentence of lead, the diagram carries the explanation, one proof when a real case
// exists. The diagrams and the real documents are shared with the first version (approcheData).
// A no-break space (U+00A0) sits before the French colon, semicolon, question and exclamation marks.

import type { Language } from '@/data/approcheData'

type Bi<T> = { en: T; fr: T }

export interface Proof {
  text: string
  link?: { href: string; label: string }
}

export const V2_HERO: Bi<{ title: string; lead: string }> = {
  fr: {
    title: 'Approche',
    lead: 'Avec les équipes produit\u00a0: définir ce qu’il faut concevoir, puis le concevoir écran par écran, jusqu’aux maquettes prêtes à développer.',
  },
  en: {
    title: 'Approach',
    lead: 'With product teams: defining what needs to be designed, then designing it screen by screen, down to mock-ups ready to build.',
  },
}

export const V2_TOC: Bi<{ id: string; label: string }[]> = {
  fr: [
    { id: 'organisation', label: 'L’organisation' },
    { id: 'roadmap', label: 'La feuille de route' },
    { id: 'cycles', label: 'Les cycles' },
    { id: 'interaction', label: 'Le parcours et l’interaction' },
    { id: 'prototyping', label: 'Prototyper' },
    { id: 'deliverables', label: 'Les livrables' },
    { id: 'domains', label: 'Domaines' },
    { id: 'clients', label: 'Références' },
    { id: 'contact', label: 'Contact' },
  ],
  en: [
    { id: 'organisation', label: 'The organisation' },
    { id: 'roadmap', label: 'The roadmap' },
    { id: 'cycles', label: 'Cycles' },
    { id: 'interaction', label: 'Journeys and interaction' },
    { id: 'prototyping', label: 'Prototyping' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'domains', label: 'Areas of work' },
    { id: 'clients', label: 'Clients' },
    { id: 'contact', label: 'Contact' },
  ],
}

/** The two halves of the page */
export const V2_PARTS: Bi<{ structure: string; design: string }> = {
  fr: { structure: 'Structurer le produit', design: 'Concevoir l’expérience' },
  en: { structure: 'Structuring the product', design: 'Designing the experience' },
}

// ---------------------------------------------------------------------------
// 01 The organisation: where I start, by maturity
// ---------------------------------------------------------------------------

export const V2_ORGANISATION: Bi<{
  title: string
  lead: string
  starts: { name: string; text: string }[]
  proof: Proof
}> = {
  fr: {
    title: 'L’organisation',
    lead: 'Chaque équipe a sa propre culture produit et design. J’observe d’abord comment elle travaille, puis j’entre par ce dont elle a le plus besoin.',
    starts: [
      { name: 'Aucun cadre', text: 'Les sujets s’empilent et le problème reste à écrire. Je pose le cadre avec l’équipe, en ateliers.' },
      { name: 'Un cadre partiel', text: 'Une direction existe, l’équipe connaît peu ses utilisateurs. J’organise la recherche et je mets les pistes à l’épreuve.' },
      { name: 'Une équipe outillée', text: 'Produit, design et tech ont leurs habitudes. Je m’intègre et je conçois avec eux, jusqu’aux composants.' },
    ],
    proof: {
      text: 'Chez France VAE, dix entretiens terrain ont réordonné les priorités d’un MVP entier.',
      link: { href: '/project/france-vae#initiative-3', label: 'France VAE' },
    },
  },
  en: {
    title: 'The organisation',
    lead: 'Every team has its own product and design culture. I first observe how it works, then start with what it needs most.',
    starts: [
      { name: 'No frame yet', text: 'Subjects pile up and the problem is still to be written. I set the frame with the team, in workshops.' },
      { name: 'A partial frame', text: 'A direction exists, the team knows little about its users. I organise the research and put the options to the test.' },
      { name: 'An equipped team', text: 'Product, design and engineering have their habits. I join in and design with them, down to the components.' },
    ],
    proof: {
      text: 'At France VAE, ten field interviews reordered the priorities of an entire MVP.',
      link: { href: '/project/france-vae#initiative-3', label: 'France VAE' },
    },
  },
}

// ---------------------------------------------------------------------------
// 04 Journeys and interaction: from the sketch that unblocks a discussion to the detail of a gesture
// ---------------------------------------------------------------------------

export const V2_INTERACTION: Bi<{ title: string; lead: string; sketchTitle: string; sketchText: string; filmTitle: string; filmText: string; filmCaption: string; filmLink: { href: string; label: string }; quoteLabel: string; statesTitle: string; statesText: string; states: { title: string; desc: string; nodes: string[]; verbs: string[] } }> = {
  fr: {
    title: 'Le parcours et l’interaction',
    lead: 'Je conçois les parcours, les états et les micro-interactions, du schéma qui débloque une discussion jusqu’au détail d’un geste.',
    sketchTitle: 'Schématiser pour avancer',
    sketchText: 'Quand un sujet reste longtemps à l’état de discussion, un schéma en quelques heures rend visible le problème, le flux, le parcours ou l’interaction.',
    filmTitle: 'Jusqu’au détail d’un geste',
    filmText: 'Le parcours de téléconsultation de l’app Tessan, joué comme un film : chaque écran répond au doigt, les champs se remplissent, la caméra lit les cartes.',
    filmCaption: 'Téléconsulter avec l’app Tessan, de l’accueil à la fin de la consultation',
    filmLink: { href: '/project/tessan-app', label: 'Voir l’étude de cas Tessan' },
    quoteLabel: 'Dans les mots d’un client',
    statesTitle: 'Chaque état se conçoit',
    statesText: 'Un bouton tient en cinq états, et chacun a son retour visuel. C’est à ce niveau que l’expérience se joue.',
    states: {
      title: 'Un bouton, cinq états à concevoir',
      desc: 'Au repos, pressé, en cours, réussi, ou en erreur. Le doigt le touche puis le relâche, le système répond ou échoue, et l’on peut réessayer.',
      nodes: ['Au repos', 'Pressé', 'En cours', 'Réussi', 'Erreur'],
      verbs: ['touche', 'relâche', 'répond', 'échoue', 'réessaie'],
    },
  },
  en: {
    title: 'Journeys and interaction',
    lead: 'I design the journeys, the states and the micro-interactions, from the diagram that unblocks a discussion down to the detail of a gesture.',
    sketchTitle: 'Sketching to move forward',
    sketchText: 'When a subject stays at the stage of discussion for a long time, a diagram made within a few hours makes the problem, the flow, the journey or the interaction visible.',
    filmTitle: 'Down to the detail of a gesture',
    filmText: 'The teleconsultation journey of the Tessan app, played as a film: each screen answers the finger, fields fill in, the camera reads the cards.',
    filmCaption: 'Teleconsulting with the Tessan app, from the home screen to the end of the consultation',
    filmLink: { href: '/project/tessan-app', label: 'See Tessan' },
    quoteLabel: 'In a client’s words',
    statesTitle: 'Every state is designed',
    statesText: 'A button holds five states, and each one has its visual feedback. This is where the experience is played out.',
    states: {
      title: 'One button, five states to design',
      desc: 'Idle, pressed, loading, done, or error. The finger taps then releases, the system responds or fails, and one can retry.',
      nodes: ['Idle', 'Pressed', 'Loading', 'Done', 'Error'],
      verbs: ['taps', 'releases', 'responds', 'fails', 'retries'],
    },
  },
}

// ---------------------------------------------------------------------------
// 05 Prototyping, in code and in Figma, with Claude Code
// ---------------------------------------------------------------------------

export const V2_PROTOTYPING: Bi<{
  title: string
  lead: string
  diagram: { title: string; desc: string; source: string; rules: string[]; agent: string; figma: string; figmaDesc: string; react: string; reactDesc: string; both: string }
  proofs: Proof[]
}> = {
  fr: {
    title: 'Prototyper, en code et dans Figma',
    lead: 'Un prototype quand la question l’exige : interactif en React ou conçu dans Figma, construit avec Claude Code à partir des règles du design system.',
    diagram: {
      title: 'Une même source, deux sorties',
      desc: 'Les règles du design system, lues par Claude Code, donnent des maquettes dans Figma et un prototype en React, qui se répondent dans les deux sens.',
      source: 'Règles du design system',
      rules: ['Tokens', 'Composants', 'Mouvement'],
      agent: 'Claude Code',
      figma: 'Figma',
      figmaDesc: 'Maquettes et variantes',
      react: 'React',
      reactDesc: 'Prototype interactif et kit',
      both: 'dans les deux sens',
    },
    proofs: [
      { text: 'Chez Tessan, sept prototypes en une semaine ont rendu la vision discutable, et un kit React aligné sur Figma porte le design system.', link: { href: '/project/tessan-systeme', label: 'Tessan' } },
      { text: 'Pour SQOOL Classe, 42 flux interactifs animés, dont dix séances complètes, de l’ouverture de la classe à un examen.', link: { href: '/project/sqool-classe', label: 'SQOOL Classe' } },
      { text: 'Chez Toolkit, le prototype de la V2 a aidé le CEO à sécuriser sa deuxième levée de fonds.', link: { href: '/project/toolkit', label: 'Toolkit' } },
    ],
  },
  en: {
    title: 'Prototyping, in code and in Figma',
    lead: 'A prototype when the question calls for one: interactive in React or designed in Figma, built with Claude Code from the rules of the design system.',
    diagram: {
      title: 'One source, two outputs',
      desc: 'The rules of the design system, read by Claude Code, give mockups in Figma and a prototype in React, which answer each other both ways.',
      source: 'Design system rules',
      rules: ['Tokens', 'Components', 'Motion'],
      agent: 'Claude Code',
      figma: 'Figma',
      figmaDesc: 'Mockups and variants',
      react: 'React',
      reactDesc: 'Interactive prototype and kit',
      both: 'both ways',
    },
    proofs: [
      { text: 'At Tessan, seven prototypes in one week made the vision discussable, and a React kit aligned with Figma carries the design system.', link: { href: '/project/tessan-systeme', label: 'Tessan' } },
      { text: 'For SQOOL Classe, 42 animated interactive flows, including ten full lessons, from opening the class to an exam.', link: { href: '/project/sqool-classe', label: 'SQOOL Classe' } },
      { text: 'At Toolkit, the V2 prototype helped the CEO secure the second funding round.', link: { href: '/project/toolkit', label: 'Toolkit' } },
    ],
  },
}

// ---------------------------------------------------------------------------
// 04 Structuring: one roadmap, readable levels, a vision sliced into lots
// ---------------------------------------------------------------------------

export const V2_STRUCTURING: Bi<{ title: string; lead: string; levelsTitle: string; levelsText: string; visionTitle: string; visionText: string }> = {
  fr: {
    title: 'La feuille de route',
    lead: 'Quand plusieurs PM portent chacun leurs sujets, je les range dans une même feuille de route, à des niveaux qui se lisent d’un coup d’œil.',
    levelsTitle: 'Des niveaux lisibles',
    levelsText: 'Objectif, initiative, epic, feature. Le titre de chaque initiative dit ce qu’elle change pour l’utilisateur.',
    visionTitle: 'D’un prototype de vision à des lots',
    visionText: 'Un prototype interactif en couleur couvre environ 80 % de l’expérience. Avec la squad, on le déconstruit en storymap, puis en lots prêts pour l’implémentation.',
  },
  en: {
    title: 'The roadmap',
    lead: 'When several PMs each carry their own subjects, I bring them into one roadmap, at levels that read at a glance.',
    levelsTitle: 'Readable levels',
    levelsText: 'Objective, initiative, epic, feature. The title of each initiative says what it changes for the user.',
    visionTitle: 'From a vision prototype to lots',
    visionText: 'An interactive colour prototype covers about 80% of the experience. With the squad, we take it apart into a story map, then into lots ready for implementation.',
  },
}

// ---------------------------------------------------------------------------
// 05 Cycles: design ready before development needs it, several horizons
// ---------------------------------------------------------------------------

export const V2_CYCLES: Bi<{
  title: string
  lead: string
  calendarTitle: string
  calendarText: string
  horizonsTitle: string
  horizonsText: string
  more: string
  less: string
  diagram: { title: string; desc: string; weeks: string; discovery: string; discoverySteps: string; discoveryPace: string; delivery: string; deliverySteps: string; deliveryPace: string; feeds: string; learns: string }
}> = {
  fr: {
    title: 'Les cycles',
    lead: 'La conception a son propre calendrier : elle doit être prête avant que le développement en ait besoin.',
    calendarTitle: 'Un calendrier de conception commun',
    calendarText: 'Pour chaque initiative, du cadrage amont jusqu’à la préparation du sprint. Les initiatives de design y ont leur place.',
    horizonsTitle: 'Plusieurs horizons à la fois',
    horizonsText: 'Des notes de cadrage sur plusieurs semaines, une discovery qui nourrit les sprints, et des rendez-vous chaque semaine.',
    more: 'Voir le calendrier de conception et les rituels',
    less: 'Masquer le calendrier et les rituels',
    diagram: {
      title: 'Deux cycles qui se nourrissent, sur douze semaines',
      desc: 'Deux lignes de temps. En haut, trois cycles de discovery de quatre semaines. En bas, six sprints de deux semaines. À la fin de chaque cycle de discovery, ce qu’on a appris nourrit le sprint suivant ; à la fin d’un sprint, ce que la livraison apprend remonte vers la discovery.',
      weeks: 'Semaines',
      discovery: 'Discovery',
      discoverySteps: 'Cadrer, explorer, tester',
      discoveryPace: 'cycles de quatre semaines',
      delivery: 'Delivery',
      deliverySteps: 'Découper, construire, livrer',
      deliveryPace: 'sprints de deux semaines',
      feeds: 'nourrit',
      learns: 'apprend',
    },
  },
  en: {
    title: 'Cycles',
    lead: 'Design has its own calendar: it has to be ready before development needs it.',
    calendarTitle: 'A shared design calendar',
    calendarText: 'For each initiative, from upstream framing to sprint preparation. Design initiatives have their place on it.',
    horizonsTitle: 'Several horizons at once',
    horizonsText: 'Framing notes over several weeks, discovery that feeds the sprints, and meetings every week.',
    more: 'See the design calendar and the rituals',
    less: 'Hide the calendar and the rituals',
    diagram: {
      title: 'Two cycles that feed each other, over twelve weeks',
      desc: 'Two timelines. Above, three discovery cycles of four weeks. Below, six sprints of two weeks. At the end of each discovery cycle, what was learnt feeds the next sprint; at the end of a sprint, what delivery learns goes back up to discovery.',
      weeks: 'Weeks',
      discovery: 'Discovery',
      discoverySteps: 'Frame, explore, test',
      discoveryPace: 'four-week cycles',
      delivery: 'Delivery',
      deliverySteps: 'Slice, build, ship',
      deliveryPace: 'two-week sprints',
      feeds: 'feeds',
      learns: 'learns',
    },
  },
}

// ---------------------------------------------------------------------------
// 06 Deliverables: from the least defined to the most precise
// ---------------------------------------------------------------------------

export const V2_DELIVERABLES: Bi<{ title: string; lead: string; documentsTitle: string; devs: Proof }> = {
  fr: {
    title: 'Les livrables à implémenter',
    lead: 'Le niveau de détail suit ce que l’équipe comprend, d’une note de cadrage jusqu’à des spécifications prêtes pour l’implémentation.',
    documentsTitle: 'Du plus brut au plus précis',
    devs: {
      text: 'Avec les développeurs, j’interviens en amont sur les états et les cas limites. Chez UNOWHY et Dailymotion, le design system a été construit avec eux, dès les premiers composants.',
      link: { href: '/project/connect', label: 'SQOOL Connect' },
    },
  },
  en: {
    title: 'Deliverables to implement',
    lead: 'The level of detail follows what the team understands, from a framing note to specifications ready for implementation.',
    documentsTitle: 'From the roughest to the most precise',
    devs: {
      text: 'With the developers, I get involved early on states and edge cases. At UNOWHY and Dailymotion, the design system was built with them, from the first components.',
      link: { href: '/project/connect', label: 'SQOOL Connect' },
    },
  },
}

export const V2_UI: Bi<{ rituals: string; ritualsHide: string; see: string }> = {
  fr: { rituals: 'Voir les rituels', ritualsHide: 'Masquer les rituels', see: 'Voir' },
  en: { rituals: 'See the rituals', ritualsHide: 'Hide the rituals', see: 'See' },
}

export type { Language }

// ---------------------------------------------------------------------------
// Home page: the same arc in three steps (organisation and team, structure and cycles, deliverables)
// ---------------------------------------------------------------------------

export const HOME_STEPS: Bi<{ title: string; steps: { id: string; title: string; text: string }[] }> = {
  fr: {
    title: 'Comment le travail se structure',
    steps: [
      { id: 'structure', title: 'Structurer le produit', text: 'Les sujets de chaque PM dans une même feuille de route, et une conception prête avant que le développement en ait besoin.' },
      { id: 'design', title: 'Concevoir l’expérience', text: 'Parcours, états et micro-interactions, prototypés en React ou dans Figma avec Claude Code.' },
      { id: 'deliver', title: 'Livrer pour l’implémentation', text: 'Spécifications, composants et lots découpés avec la squad, prêts pour les sprints.' },
    ],
  },
  en: {
    title: 'How the work is structured',
    steps: [
      { id: 'structure', title: 'Structure the product', text: 'Each PM’s subjects in one roadmap, and design ready before development needs it.' },
      { id: 'design', title: 'Design the experience', text: 'Journeys, states and micro-interactions, prototyped in React or in Figma with Claude Code.' },
      { id: 'deliver', title: 'Deliver for implementation', text: 'Specifications, components and lots sliced with the squad, ready for the sprints.' },
    ],
  },
}

// ---------------------------------------------------------------------------
// The one-minute page: the steps of the job as one explorer, then what it led to
// ---------------------------------------------------------------------------

export interface V2Step {
  id: 'organisation' | 'roadmap' | 'cycles' | 'sketch' | 'interaction' | 'prototype' | 'deliver'
  name: string
  text: string
  proof?: Proof
}

export const V2_JOB: Bi<{ title: string; lead: string; label: string; groups: { name: string; steps: V2Step[] }[] }> = {
  fr: {
    title: 'Structurer le produit, concevoir l’expérience',
    lead: 'Deux volets menés avec l’équipe, de l’organisation du travail à la livraison. Chaque étape se consulte en détail.',
    label: 'Les étapes du métier',
    groups: [
      {
        name: 'Structurer le produit',
        steps: [
          { id: 'organisation', name: 'L’organisation', text: 'J’observe d’abord comment l’équipe travaille, puis j’entre par ce dont elle a le plus besoin : le cadrage, la recherche ou la conception.', proof: { text: 'Chez France VAE, dix entretiens terrain ont réordonné les priorités d’un MVP entier.', link: { href: '/project/france-vae#initiative-3', label: 'France VAE' } } },
          { id: 'roadmap', name: 'La feuille de route', text: 'Les sujets de plusieurs PM réunis dans une même feuille de route, à quatre niveaux, avec des titres qui disent ce qu’ils changent pour l’utilisateur.' },
          { id: 'cycles', name: 'Les cycles', text: 'La conception est prête avant que le développement en ait besoin. La discovery nourrit le delivery, qui lui renvoie ce qu’il apprend.' },
        ],
      },
      {
        name: 'Concevoir l’expérience',
        steps: [
          { id: 'sketch', name: 'Schématiser', text: 'Quand un sujet reste longtemps à l’état de discussion, un schéma en quelques heures rend visible le problème, le flux, le parcours ou l’interaction.' },
          { id: 'interaction', name: 'L’interaction', text: 'Parcours, états et micro-interactions, jusqu’au détail d’un geste. Ici, le parcours de téléconsultation de l’app Tessan.', proof: { text: 'Chaque écran répond au doigt, les champs se remplissent, la caméra lit les cartes.', link: { href: '/project/tessan-app', label: 'Tessan, l’app patient' } } },
          { id: 'prototype', name: 'Prototyper', text: 'Un prototype quand la question l’exige : interactif en React ou conçu dans Figma, construit avec Claude Code à partir des règles du design system.', proof: { text: 'Chez Tessan, un kit React aligné sur Figma porte le design system.', link: { href: '/project/tessan-systeme', label: 'Tessan, le système' } } },
          { id: 'deliver', name: 'Livrer', text: 'Un prototype de vision, déconstruit avec la squad en storymap, puis découpé en lots prêts pour l’implémentation.' },
        ],
      },
    ],
  },
  en: {
    title: 'Structuring the product, designing the experience',
    lead: 'Two strands run with the team, from how the work is organised to delivery. Each step can be opened in detail.',
    label: 'The steps of the job',
    groups: [
      {
        name: 'Structuring the product',
        steps: [
          { id: 'organisation', name: 'The organisation', text: 'I first observe how the team works, then start with what it needs most: framing, research or design.', proof: { text: 'At France VAE, ten field interviews reordered the priorities of an entire MVP.', link: { href: '/project/france-vae#initiative-3', label: 'France VAE' } } },
          { id: 'roadmap', name: 'The roadmap', text: 'The subjects of several PMs brought into one roadmap, at four levels, with titles that say what they change for the user.' },
          { id: 'cycles', name: 'Cycles', text: 'Design is ready before development needs it. Discovery feeds delivery, which sends back what it learns.' },
        ],
      },
      {
        name: 'Designing the experience',
        steps: [
          { id: 'sketch', name: 'Sketching', text: 'When a subject stays at the stage of discussion for a long time, a diagram made within a few hours makes the problem, the flow, the journey or the interaction visible.' },
          { id: 'interaction', name: 'Interaction', text: 'Journeys, states and micro-interactions, down to the detail of a gesture. Here, the teleconsultation journey of the Tessan app.', proof: { text: 'Each screen answers the finger, fields fill in, the camera reads the cards.', link: { href: '/project/tessan-app', label: 'Tessan, the patient app' } } },
          { id: 'prototype', name: 'Prototyping', text: 'A prototype when the question calls for one: interactive in React or designed in Figma, built with Claude Code from the rules of the design system.', proof: { text: 'At Tessan, a React kit aligned with Figma carries the design system.', link: { href: '/project/tessan-systeme', label: 'Tessan, the system' } } },
          { id: 'deliver', name: 'Delivering', text: 'A vision prototype, taken apart with the squad into a story map, then sliced into lots ready for implementation.' },
        ],
      },
    ],
  },
}

export const V2_RESULTS: Bi<{ title: string; lead: string; quoteLabel: string; facts: { text: string; link: { href: string; label: string } }[] }> = {
  fr: {
    title: 'Ce que ça a donné',
    lead: 'Dans chaque projet, une pièce concrète a permis de décider : des entretiens, des prototypes, des flux vérifiés.',
    quoteLabel: 'Dans les mots de celles et ceux avec qui je travaille',
    facts: [
      { text: 'Dix entretiens terrain ont réordonné les priorités d’un MVP.', link: { href: '/project/france-vae', label: 'France VAE' } },
      { text: 'Sept prototypes en une semaine ont rendu une vision discutable.', link: { href: '/project/tessan', label: 'Tessan' } },
      { text: 'Des flux interactifs ont vérifié qu’une séance de classe tient de bout en bout.', link: { href: '/project/sqool-classe', label: 'SQOOL Classe' } },
      { text: 'Un prototype a aidé le CEO à sécuriser sa deuxième levée de fonds.', link: { href: '/project/toolkit', label: 'Toolkit' } },
    ],
  },
  en: {
    title: 'What it led to',
    lead: 'In each project, something concrete made the decision possible: interviews, prototypes, flows checked end to end.',
    quoteLabel: 'In the words of the people I work with',
    facts: [
      { text: 'Ten field interviews reordered the priorities of an MVP.', link: { href: '/project/france-vae', label: 'France VAE' } },
      { text: 'Seven prototypes in one week made a vision discussable.', link: { href: '/project/tessan', label: 'Tessan' } },
      { text: 'Interactive flows checked that a class session holds from start to end.', link: { href: '/project/sqool-classe', label: 'SQOOL Classe' } },
      { text: 'A prototype helped the CEO secure the second funding round.', link: { href: '/project/toolkit', label: 'Toolkit' } },
    ],
  },
}

export const V2_SHORT_TOC: Bi<{ id: string; label: string }[]> = {
  fr: [
    { id: 'job', label: 'La méthode' },
    { id: 'results', label: 'Résultats' },
    { id: 'clients', label: 'Références' },
    { id: 'contact', label: 'Contact' },
  ],
  en: [
    { id: 'job', label: 'The method' },
    { id: 'results', label: 'Results' },
    { id: 'clients', label: 'Clients' },
    { id: 'contact', label: 'Contact' },
  ],
}

/**
 * Worked examples under the introduction, before the method: finding, approach, outcome. Nominal, self-standing
 * sentences in no first person: the work is a team's. Every fact restates the linked case study.
 */
export type ApproachExample = {
  id: string
  /** Case study whose cover is shown as the thumbnail (CASE_STUDY_SHELL) */
  projectId: string
  /** What the thumbnail shows, for image search and screen readers */
  thumbAlt: string
  label: string
  steps: { title: string; text: string }[]
  links: { href: string; label: string; external?: boolean }[]
}

const TESSAN_STORES = {
  apple: 'https://apps.apple.com/fr/app/tessan/id6755781046',
  google: 'https://play.google.com/store/apps/details?id=com.tessan.cloudpatient&hl=fr',
}

export const V2_EXAMPLES: Bi<ApproachExample[]> = {
  fr: [
    {
      id: 'tessan',
      projectId: 'tessan-app',
      thumbAlt: 'Application Tessan\u00a0: accueil, demande de consultation et fin de consultation avec l’ordonnance à télécharger',
      label: 'Exemple\u00a0: Tessan',
      steps: [
        { title: 'Constat', text: 'Application mal adaptée à la consultation\u00a0: parcours morcelé, deux systèmes de navigation, 8 à 13 écrans avant de consulter.' },
        { title: 'Méthode', text: 'Nouvelle application iOS et Android centrée sur la consultation, construite en 30 jours avec un tech lead et deux développeurs\u00a0: parcours raccourci, assistant qui oriente sans poser de diagnostic, trois versions de test en deux semaines.' },
        { title: 'Résultat', text: 'Application publiée sur l’App Store et Google Play le 15 juillet 2026.' },
      ],
      links: [
        { href: '/project/tessan-app', label: 'L’étude de cas Tessan' },
        { href: TESSAN_STORES.apple, label: 'App Store', external: true },
        { href: TESSAN_STORES.google, label: 'Google Play', external: true },
      ],
    },
    {
      id: 'france-vae',
      projectId: 'france-vae',
      thumbAlt: 'Page d’accueil du portail France VAE, le service public de la validation des acquis de l’expérience',
      label: 'Exemple\u00a0: France VAE',
      steps: [
        { title: 'Constat', text: 'Décisions prises sans données sur les utilisateurs, retours du terrain dispersés dans des notes personnelles.' },
        { title: 'Méthode', text: 'Base de connaissances commune, puis dix entretiens à distance, en deux vagues, sur le tableau de bord des candidats.' },
        { title: 'Résultat', text: 'Retours triés (corrections rapides, bugs, difficultés d’usage, demandes) et présentés à toute l’équipe. Priorités revues sur cette base.' },
      ],
      links: [{ href: '/project/france-vae#approach', label: 'L’étude de cas France VAE' }],
    },
  ],
  en: [
    {
      id: 'tessan',
      projectId: 'tessan-app',
      thumbAlt: 'Tessan app: home, consultation request and end of consultation with the prescription to download',
      label: 'Example: Tessan',
      steps: [
        { title: 'Finding', text: 'An app ill-suited to the consultation: a fragmented journey, two navigation systems, 8 to 13 screens before seeing a doctor.' },
        { title: 'Method', text: 'A new iOS and Android app centred on the consultation, built in 30 days with a tech lead and two developers: a shorter journey, an assistant that guides without diagnosing, three test versions in two weeks.' },
        { title: 'Result', text: 'App released on the App Store and Google Play on July 15, 2026.' },
      ],
      links: [
        { href: '/project/tessan-app', label: 'The Tessan case study' },
        { href: TESSAN_STORES.apple, label: 'App Store', external: true },
        { href: TESSAN_STORES.google, label: 'Google Play', external: true },
      ],
    },
    {
      id: 'france-vae',
      projectId: 'france-vae',
      thumbAlt: 'Home page of the France VAE portal, the public service for the accreditation of prior experience',
      label: 'Example: France VAE',
      steps: [
        { title: 'Finding', text: 'Decisions made without data on users, field feedback scattered across personal notes.' },
        { title: 'Method', text: 'A shared knowledge base, then ten remote interviews, in two waves, on the candidates’ dashboard.' },
        { title: 'Result', text: 'Feedback sorted (quick fixes, bugs, usability issues, requests) and presented to the whole team. Priorities revised on that basis.' },
      ],
      links: [{ href: '/project/france-vae#approach', label: 'The France VAE case study' }],
    },
  ],
}
