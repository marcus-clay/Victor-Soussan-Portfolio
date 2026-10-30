// Shared content of the Approach page (the page itself reads approcheV2Data): its header and closing,
// the copy of the diagrams it draws, and the related articles. A no-break space (U+00A0) sits before the
// French colon, semicolon, question and exclamation marks.

export type Language = 'en' | 'fr'

type Bi<T> = { en: T; fr: T }

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO: Bi<{ title: string; statement: string; lead: string; cta: { label: string; href: string } }> = {
  fr: {
    title: 'Approche',
    statement: 'Approche',
    lead: 'Je rends lisible ce qu’une équipe produit doit concevoir, dans quel ordre et à quel niveau de détail. Je travaille à trois échelles : un sujet, une feuille de route, et l’organisation qui la porte.',
    cta: { label: 'Parlons de votre contexte', href: '/contact' },
  },
  en: {
    title: 'Approach',
    statement: 'Approach',
    lead: 'I make readable what a product team has to design, in which order and at which level of detail. I work at three scales: a subject, a roadmap, and the organisation that carries it.',
    cta: { label: 'Tell me about your context', href: '/contact' },
  },
}

// ---------------------------------------------------------------------------
// Diagrams
// ---------------------------------------------------------------------------

export const FIDELITY_DIAGRAM: Bi<{ title: string; desc: string; stages: string[]; curve: string; slow: string; fast: string }> = {
  fr: {
    title: 'Des livrables du moins défini au plus précis',
    desc: 'Une courbe qui monte de la note de cadrage aux parcours et zonings, aux wireframes, aux maquettes, puis aux spécifications d’implémentation.',
    stages: ['Note de cadrage', 'Parcours et zonings', 'Wireframes', 'Maquettes', 'Specs d’implémentation'],
    curve: 'Précision',
    slow: 'parfois plusieurs semaines',
    fast: 'quelques jours',
  },
  en: {
    title: 'Deliverables from the least defined to the most precise',
    desc: 'A curve that rises from the framing note to journeys and zonings, wireframes, mockups, then implementation specs.',
    stages: ['Framing note', 'Journeys and zonings', 'Wireframes', 'Mockups', 'Implementation specs'],
    curve: 'Precision',
    slow: 'sometimes several weeks',
    fast: 'a few days',
  },
}

// ---------------------------------------------------------------------------
// Three scales: a subject, a roadmap, an organisation
// ---------------------------------------------------------------------------

export interface Scale {
  id: string
  name: string
  does: string
  produces: string
}

export const SCALES: Bi<{
  title: string
  lead: string
  columns: { does: string; produces: string }
  items: Scale[]
  diagram: { title: string; desc: string; org: string; orgDesc: string; roadmap: string; roadmapDesc: string; subject: string; subjectDesc: string; people: string[] }
}> = {
  fr: {
    title: 'Trois échelles, une même façon de faire',
    lead: 'La méthode reste la même à chaque échelle : rendre visible ce qui est flou, le structurer, puis préciser jusqu’à ce que l’équipe puisse avancer.',
    columns: { does: 'Ce que je fais', produces: 'Ce que je produis' },
    items: [
      {
        id: 'subject',
        name: 'Un sujet',
        does: 'Cadrer le besoin avec le PM, schématiser vite un problème, un flux ou un parcours, explorer des pistes, prototyper quand la question l’exige, spécifier pour les développeurs.',
        produces: 'Note de cadrage, schémas, parcours, maquettes, prototype, spécifications.',
      },
      {
        id: 'roadmap',
        name: 'Une feuille de route',
        does: 'Structurer les niveaux (objectif, initiative, epic, feature), rendre lisibles les titres des initiatives, réunir les sujets de plusieurs PM dans une même feuille de route, y positionner les initiatives de design, et transformer un prototype de vision en lots livrables avec la squad.',
        produces: 'Feuille de route structurée, prototype de vision, storymap, backlog découpé en lots, calendrier de conception.',
      },
      {
        id: 'organisation',
        name: 'Une organisation',
        does: 'Observer comment l’équipe travaille, puis remettre du process là où il manque : des temps d’exploration, un calendrier de recherche utilisateur, des initiatives de discovery qui nourrissent les cycles de livraison.',
        produces: 'Process de conception, rituels, calendrier de recherche, accompagnement des PM.',
      },
    ],
    diagram: {
      title: 'Trois échelles de travail, l’une dans l’autre',
      desc: 'Un sujet tient dans une feuille de route, qui tient dans une organisation. Je travaille à chacune de ces échelles.',
      org: 'Une organisation',
      orgDesc: 'Process, rituels, calendrier de recherche',
      roadmap: 'Une feuille de route',
      roadmapDesc: 'Objectifs, initiatives, calendrier commun',
      subject: 'Un sujet',
      subjectDesc: 'Cadrage, schémas, prototype, specs',
      people: ['Produit', 'Design', 'Tech'],
    },
  },
  en: {
    title: 'Three scales, one way of working',
    lead: 'The method stays the same at every scale: make what is blurry visible, structure it, then refine until the team can move forward.',
    columns: { does: 'What I do', produces: 'What I produce' },
    items: [
      {
        id: 'subject',
        name: 'A subject',
        does: 'Frame the need with the PM, sketch a problem, a flow or a journey quickly, explore options, prototype when the question calls for it, specify for the developers.',
        produces: 'Framing note, diagrams, journeys, mockups, prototype, specifications.',
      },
      {
        id: 'roadmap',
        name: 'A roadmap',
        does: 'Structure the levels (objective, initiative, epic, feature), make the titles of the initiatives readable, bring the subjects of several PMs into one roadmap, place the design initiatives on it, and turn a vision prototype into deliverable lots with the squad.',
        produces: 'A structured roadmap, a vision prototype, a story map, a backlog sliced into lots, a design calendar.',
      },
      {
        id: 'organisation',
        name: 'An organisation',
        does: 'Observe how the team works, then bring process where it is missing: time to explore, a user research calendar, discovery initiatives that feed the delivery cycles.',
        produces: 'Design process, rituals, research calendar, support for the PMs.',
      },
    ],
    diagram: {
      title: 'Three scales of work, one inside the other',
      desc: 'A subject sits in a roadmap, which sits in an organisation. I work at each of these scales.',
      org: 'An organisation',
      orgDesc: 'Process, rituals, research calendar',
      roadmap: 'A roadmap',
      roadmapDesc: 'Objectives, initiatives, shared calendar',
      subject: 'A subject',
      subjectDesc: 'Framing, diagrams, prototype, specs',
      people: ['Product', 'Design', 'Tech'],
    },
  },
}

// ---------------------------------------------------------------------------
// Structuring a roadmap: levels, several PMs, a shared design calendar
// ---------------------------------------------------------------------------

export const ROADMAP: Bi<{
  title: string
  lead: string
  structureTitle: string
  structureText: string
  calendarTitle: string
  calendarText: string
  visionTitle: string
  visionText: string
  visionDiagram: { title: string; desc: string; prototype: string; prototypeDesc: string; undesign: string; storymap: string; lots: string[]; roadmap: string }
  structureDiagram: { title: string; desc: string; subjects: string; pms: string[]; levels: string[]; result: string }
  calendarDiagram: { title: string; desc: string; weeks: string; lanes: string[]; stages: string[]; ready: string; designLane: string; designBar: string }
}> = {
  fr: {
    title: 'Structurer une feuille de route',
    lead: 'Quand plusieurs PM portent chacun leurs sujets, je les réunis dans une même feuille de route, avec des niveaux de structure clairs et un calendrier commun pour la conception.',
    structureTitle: 'Des niveaux de structure lisibles',
    structureText: 'Objectif, initiative, epic, feature : chaque sujet trouve son niveau, et le titre de chaque initiative dit ce qu’elle change pour l’utilisateur. La feuille de route se lit d’un coup d’œil, par l’équipe comme par la direction.',
    visionTitle: 'D’un prototype de vision à des lots livrables',
    visionText: 'Je conçois aussi des livrables de vision : un prototype interactif en couleur, avec des micro-interactions fines, qui couvre environ 80 % de l’expérience. Il rejoint ensuite la feuille de route. Avec la squad, on le déconstruit : une storymap, puis un découpage fin en lots prêts pour l’implémentation.',
    visionDiagram: {
      title: 'D’un prototype de vision à des lots livrables',
      desc: 'Un prototype de vision en couleur, déconstruit avec la squad en une storymap, elle-même découpée en trois lots qui rejoignent la feuille de route.',
      prototype: 'Prototype de vision',
      prototypeDesc: '80 % de l’expérience, micro-interactions',
      undesign: 'Déconstruit avec la squad',
      storymap: 'Storymap',
      lots: ['Lot 1', 'Lot 2', 'Lot 3'],
      roadmap: 'Dans la feuille de route',
    },
    calendarTitle: 'Un calendrier de conception commun',
    calendarText: 'Sur un même calendrier, je planifie pour chaque initiative les ateliers de cadrage amont, la définition du besoin, le refinement, le découpage fin et la préparation des sprints. Les initiatives de design y ont leur place, au même titre que les développements.',
    structureDiagram: {
      title: 'Plusieurs PM, une feuille de route structurée',
      desc: 'À gauche, les sujets épars de trois PM. Ils se rangent à droite dans quatre niveaux : objectif, initiatives, epics, features.',
      subjects: 'Les sujets de chaque PM',
      pms: ['PM 1', 'PM 2', 'PM 3'],
      levels: ['Objectif', 'Initiatives', 'Epics', 'Features'],
      result: 'Une feuille de route lisible',
    },
    calendarDiagram: {
      title: 'Un calendrier de conception commun',
      desc: 'Quatre initiatives et une initiative de design, sur douze semaines. Chaque initiative passe par le cadrage amont, la définition du besoin, le refinement et le découpage, jusqu’à être prête pour le sprint.',
      weeks: 'Semaines',
      lanes: ['Initiative A', 'Initiative B', 'Initiative C', 'Initiative D'],
      stages: ['Cadrage amont', 'Définition du besoin', 'Refinement', 'Découpage'],
      ready: 'Prêt pour le sprint',
      designLane: 'Initiative design',
      designBar: 'Recherche et concepts',
    },
  },
  en: {
    title: 'Structuring a roadmap',
    lead: 'When several PMs each carry their own subjects, I bring them into one roadmap, with clear levels of structure and a shared calendar for design.',
    structureTitle: 'Readable levels of structure',
    structureText: 'Objective, initiative, epic, feature: each subject finds its level, and the title of each initiative says what it changes for the user. The roadmap reads at a glance, for the team and for leadership.',
    visionTitle: 'From a vision prototype to deliverable lots',
    visionText: 'I also design vision deliverables: an interactive colour prototype with fine micro-interactions, covering about 80% of the experience. It then joins the roadmap. With the squad, we take it apart: a story map, then a fine slicing into lots ready for implementation.',
    visionDiagram: {
      title: 'From a vision prototype to deliverable lots',
      desc: 'A colour vision prototype, taken apart with the squad into a story map, itself sliced into three lots that join the roadmap.',
      prototype: 'Vision prototype',
      prototypeDesc: '80% of the experience, micro-interactions',
      undesign: 'Taken apart with the squad',
      storymap: 'Story map',
      lots: ['Lot 1', 'Lot 2', 'Lot 3'],
      roadmap: 'Into the roadmap',
    },
    calendarTitle: 'A shared design calendar',
    calendarText: 'On one calendar, I plan for each initiative the upstream framing workshops, the definition of the need, refinement, fine slicing and sprint preparation. Design initiatives have their place on it, like development work.',
    structureDiagram: {
      title: 'Several PMs, one structured roadmap',
      desc: 'On the left, the scattered subjects of three PMs. On the right they settle into four levels: objective, initiatives, epics, features.',
      subjects: 'Each PM’s subjects',
      pms: ['PM 1', 'PM 2', 'PM 3'],
      levels: ['Objective', 'Initiatives', 'Epics', 'Features'],
      result: 'A readable roadmap',
    },
    calendarDiagram: {
      title: 'A shared design calendar',
      desc: 'Four initiatives and one design initiative over twelve weeks. Each initiative goes through upstream framing, need definition, refinement and slicing, until it is ready for the sprint.',
      weeks: 'Weeks',
      lanes: ['Initiative A', 'Initiative B', 'Initiative C', 'Initiative D'],
      stages: ['Upstream framing', 'Need definition', 'Refinement', 'Slicing'],
      ready: 'Ready for the sprint',
      designLane: 'Design initiative',
      designBar: 'Research and concepts',
    },
  },
}

// ---------------------------------------------------------------------------
// Sketching to move discussions forward (in phases that stay blurry for a long time)
// ---------------------------------------------------------------------------

export const CONCEPT: Bi<{
  text: string
  diagram: { title: string; desc: string; before: string; after: string; arrow: string; nodes: string[] }
}> = {
  fr: {
    text: 'Certaines phases restent floues longtemps, à l’état de discussion. Je conceptualise vite pour illustrer un problème, un flux, un parcours ou une interaction : un schéma posé sur la table fait avancer l’échange plus sûrement qu’une réunion de plus.',
    diagram: {
      title: 'Schématiser pour faire avancer les discussions',
      desc: 'À gauche, des échanges qui se croisent pendant des semaines. Un schéma les réunit à droite : un problème, un flux, un parcours, une interaction, compris par tous.',
      before: 'Des semaines de discussion',
      after: 'Une compréhension commune',
      arrow: 'Un schéma',
      nodes: ['Problème', 'Flux', 'Parcours', 'Interaction'],
    },
  },
  en: {
    text: 'Some phases stay blurry for a long time, at the stage of discussion. I conceptualise quickly to illustrate a problem, a flow, a journey or an interaction: a diagram on the table moves the exchange forward more surely than one more meeting.',
    diagram: {
      title: 'Sketching to move discussions forward',
      desc: 'On the left, exchanges that cross for weeks. A diagram brings them together on the right: a problem, a flow, a journey, an interaction, understood by everyone.',
      before: 'Weeks of discussion',
      after: 'A shared understanding',
      arrow: 'A diagram',
      nodes: ['Problem', 'Flow', 'Journey', 'Interaction'],
    },
  },
}

// ---------------------------------------------------------------------------
// Diagram: my role by maturity of the team (qualitative, no values)
// ---------------------------------------------------------------------------

export const MATURITY_DIAGRAM: Bi<{
  title: string
  desc: string
  stages: [string, string, string]
  upstream: string
  onScreen: string
}> = {
  fr: {
    title: 'Mon rôle selon la maturité de l’équipe',
    desc: 'Deux courbes qui se croisent. Sans cadre, je porte surtout le cadrage et la recherche. Plus l’équipe est outillée, plus je porte la conception et les spécifications.',
    stages: ['Aucun cadre', 'Cadre partiel', 'Équipe outillée'],
    upstream: 'Cadrage et recherche',
    onScreen: 'Conception et specs',
  },
  en: {
    title: 'My role by team maturity',
    desc: 'Two curves that cross. With no frame, I mostly carry framing and research. The more the team is equipped, the more I carry design and specifications.',
    stages: ['No frame', 'Partial frame', 'Equipped team'],
    upstream: 'Framing and research',
    onScreen: 'Design and specs',
  },
}

// ---------------------------------------------------------------------------
// Before the screen: working documents, fidelity rising
// ---------------------------------------------------------------------------

export const RHYTHM_DIAGRAM: Bi<{
  title: string
  desc: string
  weeks: string
  lanes: string[]
  framingNote: string
  roadmapUpdate: string
  research: string
  discovery: string
  prototype: string
  sprint: string
  refinement: string
  weekly: string
  feeds: string
}> = {
  fr: {
    title: 'Un rythme sur plusieurs horizons',
    desc: 'Douze semaines sur quatre lignes : le cadrage sur plusieurs semaines, la discovery qui nourrit les sprints, la livraison sprint après sprint, et les rendez-vous de chaque semaine. Le prototype arrive quand la question l’exige.',
    weeks: 'Semaines',
    lanes: ['Cadrage', 'Discovery', 'Delivery', 'Chaque semaine'],
    framingNote: 'Note de cadrage',
    roadmapUpdate: 'Feuille de route',
    research: 'Calendrier de recherche',
    discovery: 'Initiative de discovery',
    prototype: 'Prototype, si la question l’exige',
    sprint: 'Sprint',
    refinement: 'Refinement',
    weekly: 'Points PM, ateliers, revues',
    feeds: 'La discovery nourrit le delivery',
  },
  en: {
    title: 'A rhythm over several horizons',
    desc: 'Twelve weeks on four lines: framing over several weeks, discovery feeding the sprints, delivery sprint after sprint, and the meetings of every week. The prototype comes when the question calls for it.',
    weeks: 'Weeks',
    lanes: ['Framing', 'Discovery', 'Delivery', 'Every week'],
    framingNote: 'Framing note',
    roadmapUpdate: 'Roadmap',
    research: 'Research calendar',
    discovery: 'Discovery initiative',
    prototype: 'Prototype, if the question calls for it',
    sprint: 'Sprint',
    refinement: 'Refinement',
    weekly: 'PM syncs, workshops, reviews',
    feeds: 'Discovery feeds delivery',
  },
}

export const CTA_SECTION = {
  en: {
    message: 'Interested in working together? Let’s talk.',
    email: 'Email',
    articles_title: 'Related writing',
  },
  fr: {
    message: 'Envie de collaborer ? Discutons.',
    email: 'Écrire un e-mail',
    articles_title: 'Écrits liés',
  },
}

export const RELATED_ARTICLE_IDS = ['binome-pm-designer', 'scoping-is-the-work']
