/**
 * The brief of each resource, shown at the top of its page: what it is for, the questions it helps answer,
 * and where it sits in the design cycle (the double diamond: discover, define, develop, deliver).
 */

export type DesignPhase = 'discover' | 'define' | 'develop' | 'deliver'

type Bi<T> = { en: T; fr: T }

export interface ResourceBrief {
  phases: DesignPhase[]
  /** One sentence: what the resource is for */
  purpose: Bi<string>
  /** Two or three questions it helps answer */
  questions: Bi<string[]>
}

export const PHASE_LABELS: Record<DesignPhase, Bi<string>> = {
  discover: { en: 'Discover', fr: 'Découvrir' },
  define: { en: 'Define', fr: 'Définir' },
  develop: { en: 'Develop', fr: 'Développer' },
  deliver: { en: 'Deliver', fr: 'Livrer' },
}

export const RESOURCE_BRIEFS: Record<string, ResourceBrief> = {
  'template-design-scoping': {
    phases: ['discover', 'define'],
    purpose: {
      fr: 'Mettre l’équipe d’accord sur le problème avant de dessiner le premier écran.',
      en: 'Get the team to agree on the problem before the first screen is drawn.',
    },
    questions: {
      fr: ['De quoi parle-t-on, et pourquoi maintenant ?', 'Qu’est-ce que l’on cherche à atteindre ?', 'Quelles pistes a-t-on explorées, et laquelle garde-t-on ?'],
      en: ['What are we talking about, and why now?', 'What are we trying to reach?', 'Which paths did we explore, and which one do we keep?'],
    },
  },
  'template-po-design-sync': {
    phases: ['develop', 'deliver'],
    purpose: {
      fr: 'Garder le design un sprint en avance du développement, sans effet tunnel.',
      en: 'Keep design one sprint ahead of development, without a tunnel effect.',
    },
    questions: {
      fr: ['Quels sujets design le prochain sprint demande-t-il ?', 'Que manque-t-il pour avancer sur l’UX et l’UI ?', 'Quelles maquettes sont prêtes pour le sprint planning ?'],
      en: ['Which design topics does the next sprint need?', 'What is missing to move forward on UX and UI?', 'Which mockups are ready for the sprint planning?'],
    },
  },
  'template-design-teardown': {
    phases: ['define', 'develop'],
    purpose: {
      fr: 'Passer d’un problème de design à une piste en haute fidélité en trois heures, à plusieurs.',
      en: 'Go from a design problem to a high-fidelity path in three hours, together.',
    },
    questions: {
      fr: ['Comment pourrions-nous répondre à ce problème ?', 'Que font les autres, et qu’en retient-on ?', 'Quels principes guideront la conception ?'],
      en: ['How might we answer this problem?', 'What do others do, and what do we keep from it?', 'Which principles will guide the design?'],
    },
  },
  'template-feature-checklist': {
    phases: ['develop', 'deliver'],
    purpose: {
      fr: 'Vérifier qu’aucun angle d’une fonctionnalité n’a été oublié avant le développement.',
      en: 'Check that no angle of a feature was forgotten before development.',
    },
    questions: {
      fr: ['À quel besoin répond-on, comment, pour quel résultat ?', 'Que se passe-t-il quand ça charge, quand ça échoue, quand c’est vide ?', 'Qui a accès à quoi, et comment l’apprend-il ?'],
      en: ['Which need do we answer, how, for what result?', 'What happens when it loads, when it fails, when it is empty?', 'Who has access to what, and how do they learn it?'],
    },
  },
  'template-ui-slicing': {
    phases: ['deliver'],
    purpose: {
      fr: 'Livrer une interface aux développeurs en tranches qui tiennent chacune dans un ticket.',
      en: 'Hand an interface to developers in slices that each fit in a ticket.',
    },
    questions: {
      fr: ['Comment découper cette interface en tickets atomiques ?', 'Que montre chaque planche, et que laisse-t-elle ailleurs ?', 'Comment estimer et suivre l’implémentation ?'],
      en: ['How do we cut this interface into atomic tickets?', 'What does each board show, and what does it leave elsewhere?', 'How do we estimate and follow the implementation?'],
    },
  },
  'template-figma-file-status': {
    phases: ['develop', 'deliver'],
    purpose: {
      fr: 'Faire lire le même fichier Figma de la même façon aux designers, aux PO et aux développeurs.',
      en: 'Have designers, Product Owners and developers read the same Figma file the same way.',
    },
    questions: {
      fr: ['Quelle page peut-on regarder, discuter, implémenter ?', 'Comment nommer une page pour que son statut se lise ?', 'Que faire d’un ajustement sur un parcours déjà validé ?'],
      en: ['Which page can be looked at, discussed, implemented?', 'How do we name a page so that its status reads?', 'What to do with an adjustment on a validated journey?'],
    },
  },
  'guide-claude-code': {
    phases: ['develop'],
    purpose: {
      fr: 'Prototyper et déployer une interface avec Claude Code, de l’installation à la mise en ligne.',
      en: 'Prototype and deploy an interface with Claude Code, from setup to going live.',
    },
    questions: {
      fr: ['Comment un designer installe-t-il et configure-t-il Claude Code ?', 'Comment passer d’une maquette Figma à une interface qui tourne ?', 'Comment itérer, déployer et garder la qualité visuelle ?'],
      en: ['How does a designer set up Claude Code?', 'How do we go from a Figma mockup to a running interface?', 'How do we iterate, deploy and keep visual quality?'],
    },
  },
  'guide-ship-to-show': {
    phases: ['deliver'],
    purpose: {
      fr: 'Transformer un prototype livré en case study publié, en sept phases.',
      en: 'Turn a shipped prototype into a published case study, in seven phases.',
    },
    questions: {
      fr: ['Que raconter d’un projet, et dans quel ordre ?', 'Comment produire les vidéos et le récit bilingue ?', 'Comment intégrer le case study dans un portfolio ?'],
      en: ['What to tell about a project, and in what order?', 'How to produce the videos and the bilingual narrative?', 'How to integrate the case study into a portfolio?'],
    },
  },
  'deck-concept-review': {
    phases: ['define', 'develop'],
    purpose: {
      fr: 'Présenter un concept de design produit pour le faire décider.',
      en: 'Present a product design concept to get it decided.',
    },
    questions: {
      fr: ['Quel problème cadre-t-on, pour quels besoins ?', 'Que propose le concept, que gagne-t-il, que coûte-t-il ?', 'Quelles décisions prendre, par qui, et quand ?'],
      en: ['Which problem do we frame, for which needs?', 'What does the concept propose, gain and cost?', 'Which decisions to take, by whom, and when?'],
    },
  },
  'deck-design-study': {
    phases: ['discover', 'define', 'develop', 'deliver'],
    purpose: {
      fr: 'Raconter une étude de design, de la question de départ à la suite.',
      en: 'Tell a design study, from the opening question to what comes next.',
    },
    questions: {
      fr: ['Qu’a montré la recherche, et qu’en a-t-on appris ?', 'Quelles pistes a-t-on explorées, laquelle a-t-on retenue ?', 'Qu’ont donné les tests, et que démarre-t-on ensuite ?'],
      en: ['What did the research show, and what did we learn?', 'Which paths did we explore, which one did we keep?', 'What did the tests show, and what starts next?'],
    },
  },
}
