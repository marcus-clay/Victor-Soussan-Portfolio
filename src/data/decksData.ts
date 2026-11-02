/**
 * The deck templates of the library: a PowerPoint file per language, its PDF, and one picture per slide for
 * the page's gallery (public/decks/<id>/<lang>/slide-NN.webp). Built by the deck generator (pptxgenjs) in the
 * site's visual system: Public Sans, pale grounds, white cards with a hairline, black as the one accent.
 */

import type { SignalCategory } from './signalsData'

type Bi<T> = { en: T; fr: T }

export interface DeckEntry {
  id: string
  category: SignalCategory
  tags: string[]
  /** Address under /ressources/, one per language */
  slug: Bi<string>
  title: Bi<string>
  desc: Bi<string>
  seoTitle: Bi<string>
  seoDesc: Bi<string>
  /** File names under public/decks, without extension (one deck per language) */
  file: Bi<string>
  /** Slides in each language's deck (the gallery lists them all) */
  slides: Bi<number>
  /** The opening of the page: what the deck is for, how to use it */
  intro: Bi<string>
  /** The sections of the deck, as the reader will find them */
  sections: Bi<string[]>
}

export const DECK_ENTRIES: DeckEntry[] = [
  {
    id: 'deck-concept-review',
    category: 'methodology',
    tags: ['presentation', 'decision', 'cadrage'],
    slug: { en: 'concept-review-deck', fr: 'deck-revue-de-concept' },
    title: { en: 'Deck: concept review', fr: 'Deck : revue de concept' },
    desc: {
      en: 'Eighteen slides to present a product design concept and get it decided: problem, needs, scope, principles, the concept, its flow, for and against, decisions.',
      fr: 'Dix-huit slides pour présenter un concept de design produit et le faire décider : problème, besoins, périmètre, principes, le concept, son parcours, pour et contre, décisions.',
    },
    seoTitle: { en: 'Concept review deck template', fr: 'Modèle de deck : revue de concept' },
    seoDesc: {
      en: 'A PowerPoint template to present a product design concept and get it decided: problem, needs, scope, principles, concept, flow, for and against, decisions and schedule.',
      fr: 'Un modèle PowerPoint pour présenter un concept de design produit et le faire décider : problème, besoins, périmètre, principes, concept, parcours, pour et contre, décisions.',
    },
    file: { en: 'Concept-review-template-EN', fr: 'Modele-revue-de-concept-FR' },
    slides: { en: 18, fr: 18 },
    intro: {
      fr: `<p>Une revue de concept sert à faire décider, pas à montrer du travail. Ce deck suit l’ordre dans lequel une salle peut trancher&nbsp;: le problème tel que l’équipe le vit, les besoins et ce que l’on cherche à atteindre, les impératifs à respecter, les principes qui guident les propositions, puis le concept lui-même, son parcours, ce qu’il gagne et ce qu’il coûte, et enfin les décisions à prendre et leur calendrier.</p>
<p>Chaque slide porte un texte d’exemple qui dit ce qu’il faut y mettre. Les titres sont des phrases affirmatives&nbsp;: quelqu’un qui ne lit que les titres doit comprendre la logique. Le fichier est dans le système visuel de ce site, en Public Sans, sans couleur&nbsp;: il se lit aussi bien projeté qu’envoyé en lecture.</p>`,
      en: `<p>A concept review exists to get a decision, not to show work. This deck follows the order in which a room can decide: the problem as the team lives it, the needs and what we aim for, the mandatories to respect, the principles that guide every proposal, then the concept itself, its flow, what it gains and what it costs, and finally the decisions to take and their schedule.</p>
<p>Every slide carries example copy that says what goes there. Titles are affirmative sentences: someone who only reads the titles must understand the logic. The file uses this site’s visual system, Public Sans, no colour: it reads as well projected as sent for reading.</p>`,
    },
    sections: {
      fr: ['Couverture et sommaire', 'Le problème à cadrer', 'Besoins et objectifs', 'Périmètre et impératifs', 'Cadre conceptuel', 'Le concept, sa proposition de valeur, son parcours, pour et contre', 'Décisions et calendrier, prochaine étape'],
      en: ['Cover and contents', 'The problem to frame', 'Needs and goals', 'Scope and mandatories', 'Conceptual framework', 'The concept, its value proposition, its flow, for and against', 'Decisions and schedule, next step'],
    },
  },
  {
    id: 'deck-design-study',
    category: 'methodology',
    tags: ['presentation', 'recherche', 'prototypage'],
    slug: { en: 'design-study-deck', fr: 'deck-etude-de-design' },
    title: { en: 'Deck: design study', fr: 'Deck : étude de design' },
    desc: {
      en: 'Twenty slides to tell a design study from the opening question to the next steps: context, research, insights, explorations, decision, prototype, tests.',
      fr: 'Vingt slides pour raconter une étude de design, de la question de départ à la suite : contexte, recherche, enseignements, explorations, décision, prototype, tests.',
    },
    seoTitle: { en: 'Design study deck template', fr: 'Modèle de deck : étude de design' },
    seoDesc: {
      en: 'A PowerPoint template to tell a design study: context, what the research showed, insights, explorations, decision, prototype, tests and next steps.',
      fr: 'Un modèle PowerPoint pour raconter une étude de design : contexte, ce que la recherche a montré, enseignements, explorations, décision, prototype, tests et suite.',
    },
    file: { en: 'Design-study-template-EN', fr: 'Modele-etude-de-design-FR' },
    slides: { en: 20, fr: 20 },
    intro: {
      fr: `<p>Une étude de design se raconte dans l’ordre où elle s’est faite&nbsp;: la question de départ, ce que la recherche a montré, ce que l’on en a appris, les pistes explorées, la décision, le prototype construit pour la tester, les résultats des tests, et ce qui démarre ensuite. Ce deck tient cet ordre, avec une slide de section avant chaque partie.</p>
<p>Les slides de recherche séparent les faits (une citation mot pour mot, des phrases chiffrées) des enseignements. Les explorations tiennent sur une grille de quatre visuels, la décision sur une phrase. Le fichier est dans le système visuel de ce site, en Public Sans, sans couleur.</p>`,
      en: `<p>A design study is told in the order it happened: the opening question, what the research showed, what we learned from it, the paths explored, the decision, the prototype built to test it, the test results, and what starts next. This deck keeps that order, with a section slide before each part.</p>
<p>The research slides keep the facts (a word-for-word quote, sentences with numbers) apart from the insights. Explorations fit on a grid of four visuals, the decision on one sentence. The file uses this site’s visual system, Public Sans, no colour.</p>`,
    },
    sections: {
      fr: ['Couverture et sommaire', 'Le contexte', 'Ce que la recherche a montré', 'Les enseignements', 'Les explorations', 'La décision', 'Le prototype', 'Les tests', 'La suite, prochaine étape'],
      en: ['Cover and contents', 'The context', 'What the research showed', 'The insights', 'The explorations', 'The decision', 'The prototype', 'The tests', 'What comes next, next step'],
    },
  },
]

export const deckPath = (d: DeckEntry, lang: 'en' | 'fr') => `ressources/${d.slug[lang]}`
export const findDeckBySlug = (slug: string) => DECK_ENTRIES.find((d) => d.slug.en === slug || d.slug.fr === slug)
export const deckFile = (d: DeckEntry, lang: 'en' | 'fr', ext: 'pptx' | 'pdf') => `/decks/${d.file[lang]}.${ext}`
export const deckSlide = (d: DeckEntry, lang: 'en' | 'fr', n: number) => `/decks/${d.id.replace(/^deck-/, '')}/${lang}/slide-${String(n).padStart(2, '0')}.webp`
export const DECK_SLUG_PAIRS: [en: string, fr: string][] = DECK_ENTRIES.map((d) => [d.slug.en, d.slug.fr])
