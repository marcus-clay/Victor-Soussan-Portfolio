/**
 * The words on the six template diagrams (src/components/templates/TemplateDiagrams.tsx), in both languages.
 * Labels sit on the drawing itself, there is no legend: a label is at most a few words.
 */

type Bi<T> = { en: T; fr: T }

export const SCOPING_DIAGRAM: Bi<{
  title: string
  desc: string
  steps: [string, string, string]
  concept: string
  setAside: string
  kept: string
  next: string
}> = {
  fr: {
    title: 'Le cadrage, du contexte au prototype retenu',
    desc: 'Contexte, problématique et objectifs se suivent, puis trois concepts sont explorés et un seul prototype est retenu.',
    steps: ['Contexte', 'Problématique', 'Objectifs'],
    concept: 'Concept',
    setAside: 'écarté',
    kept: 'Prototype retenu',
    next: 'Prochaines étapes',
  },
  en: {
    title: 'Scoping, from context to the prototype kept',
    desc: 'Context, problem and goals follow each other, then three concepts are explored and one prototype is kept.',
    steps: ['Context', 'Problem', 'Goals'],
    concept: 'Concept',
    setAside: 'set aside',
    kept: 'Prototype kept',
    next: 'Next steps',
  },
}

export const SYNC_DIAGRAM: Bi<{
  title: string
  desc: string
  weeks: string
  lanes: [string, string, string]
  identify: string
  prepare: string
  thirtyMin: string
  sprint: string
  prepares: string
  ahead: string
}> = {
  fr: {
    title: 'Deux réunions en alternance, le design un sprint en avance',
    desc: 'Sur six semaines, une réunion d’identification et une réunion de préparation alternent chaque semaine ; le design prépare le sprint suivant pendant que le développement livre le sprint en cours.',
    weeks: 'Semaines',
    lanes: ['Réunions PO et design', 'Design', 'Développement'],
    identify: 'Identification des sujets',
    prepare: 'Préparation du sprint planning',
    thirtyMin: '30 min',
    sprint: 'Sprint',
    prepares: 'prépare le sprint',
    ahead: 'un sprint d’avance',
  },
  en: {
    title: 'Two alternating meetings, design one sprint ahead',
    desc: 'Over six weeks, an identification meeting and a preparation meeting alternate each week; design prepares the next sprint while development delivers the current one.',
    weeks: 'Weeks',
    lanes: ['PO and design meetings', 'Design', 'Development'],
    identify: 'Identifying the topics',
    prepare: 'Preparing the sprint planning',
    thirtyMin: '30 min',
    sprint: 'Sprint',
    prepares: 'prepares sprint',
    ahead: 'one sprint ahead',
  },
}

export const TEARDOWN_DIAGRAM: Bi<{
  title: string
  desc: string
  steps: [string, string, string, string, string]
  min: string
  problem: string
  ideas: string
  principles: string
  total: string
}> = {
  fr: {
    title: 'Trois heures qui s’ouvrent puis se referment',
    desc: 'Cinq temps proportionnels à leur durée, de quinze à cinquante minutes ; le nombre d’idées s’élargit pendant le cadrage et les concepts, puis se resserre jusqu’à une page de principes.',
    steps: ['Introduction', 'Cadrage du défi', 'Analyse comparative', 'Génération de concepts', 'Convergence'],
    min: 'min',
    problem: 'Un problème',
    ideas: 'Les idées s’ouvrent',
    principles: 'Une page de principes',
    total: '3 heures',
  },
  en: {
    title: 'Three hours that open up, then close',
    desc: 'Five steps proportional to their length, from fifteen to fifty minutes; the number of ideas widens during framing and concepts, then narrows down to a page of principles.',
    steps: ['Introduction', 'Framing the challenge', 'Comparative analysis', 'Generating concepts', 'Convergence'],
    min: 'min',
    problem: 'One problem',
    ideas: 'Ideas open up',
    principles: 'A page of principles',
    total: '3 hours',
  },
}

export const CHECKLIST_DIAGRAM: Bi<{
  title: string
  desc: string
  three: string
  questions: [string, string, string]
  groups: [string, string, string, string, string]
  atFraming: string
  beforeDev: string
}> = {
  fr: {
    title: 'Trois questions, puis vingt-cinq points en cinq groupes',
    desc: 'Les trois questions de départ ouvrent sur une grille de vingt-cinq points, lus au cadrage pour poser les questions et avant le développement pour vérifier les réponses.',
    three: 'Trois questions',
    questions: ['Le besoin', 'La réponse', 'Le résultat'],
    groups: ['Comprendre le besoin', 'Le contexte d’usage', 'Ce que le système renvoie', 'Pour tous les utilisateurs', 'Cohérence et lancement'],
    atFraming: 'Au cadrage : les questions',
    beforeDev: 'Avant le développement : les réponses',
  },
  en: {
    title: 'Three questions, then twenty-five points in five groups',
    desc: 'The three opening questions lead to a grid of twenty-five points, read at framing to ask the questions and before development to check the answers.',
    three: 'Three questions',
    questions: ['The need', 'The answer', 'The outcome'],
    groups: ['Understanding the need', 'The context of use', 'What the system gives back', 'For every user', 'Consistency and launch'],
    atFraming: 'At framing: the questions',
    beforeDev: 'Before development: the answers',
  },
}

export const SLICING_DIAGRAM: Bi<{
  title: string
  desc: string
  ui: string
  cut: string
  board: string
  before: string
  after: string
  ticket: string
  sentence: string
}> = {
  fr: {
    title: 'Une interface coupée en planches, une planche par ticket',
    desc: 'L’interface est coupée en quatre tranches ; chaque tranche devient une planche avant et après, avec son numéro de ticket et une phrase.',
    ui: 'L’interface',
    cut: 'une coupe par ticket',
    board: 'Une planche par ticket',
    before: 'avant',
    after: 'après',
    ticket: 'n°',
    sentence: 'une phrase sur le changement',
  },
  en: {
    title: 'An interface cut into boards, one board per ticket',
    desc: 'The interface is cut into four slices; each slice becomes a before and after board, with its ticket number and one sentence.',
    ui: 'The interface',
    cut: 'one cut per ticket',
    board: 'One board per ticket',
    before: 'before',
    after: 'after',
    ticket: 'no.',
    sentence: 'one sentence about the change',
  },
}

export const STATUS_DIAGRAM: Bi<{
  title: string
  desc: string
  explo: string
  exploDesc: string
  wip: string
  wipDesc: string
  rtd: string
  rtdDesc: string
  proto: string
  spec: string
  copy: string
  copyDesc: string
  archive: string
  archiveDesc: string
  toDiscuss: string
  validated: string
  adjust: string
  notKept: string
}> = {
  fr: {
    title: 'Quatre statuts, et une copie pour les ajustements',
    desc: 'Une page passe d’Explo à WIP puis à Ready to dev, gravé pour le développement ; un ajustement se fait sur une copie, les écrans non retenus vont en archive.',
    explo: 'Explo',
    exploDesc: 'pas prêt à montrer',
    wip: 'WIP',
    wipDesc: 'visible, discuté',
    rtd: 'Ready to dev',
    rtdDesc: 'gravé pour les devs',
    proto: 'proto',
    spec: 'spec',
    copy: 'Copie de la page',
    copyDesc: 'les ajustements se font ici',
    archive: 'Archive',
    archiveDesc: 'écrans non utilisés',
    toDiscuss: 'à discuter',
    validated: 'validé par l’équipe',
    adjust: 'ajustement',
    notKept: 'non retenu',
  },
  en: {
    title: 'Four statuses, and a copy for adjustments',
    desc: 'A page moves from Explo to WIP then to Ready to dev, set in stone for development; an adjustment is made on a copy, screens not kept go to the archive.',
    explo: 'Explo',
    exploDesc: 'not ready to show',
    wip: 'WIP',
    wipDesc: 'visible, discussed',
    rtd: 'Ready to dev',
    rtdDesc: 'set in stone for devs',
    proto: 'proto',
    spec: 'spec',
    copy: 'Copy of the page',
    copyDesc: 'adjustments happen here',
    archive: 'Archive',
    archiveDesc: 'unused screens',
    toDiscuss: 'to discuss',
    validated: 'validated by the team',
    adjust: 'adjustment',
    notKept: 'not kept',
  },
}
