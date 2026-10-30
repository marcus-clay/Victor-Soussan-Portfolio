// Approche page: three scales of work (a subject, a roadmap, an organisation), structuring a roadmap,
// situations by team maturity, deliverables from the least defined to the most precise, how it is to work
// together, collaboration by discipline, a rhythm over several horizons, closing. A no-break space (U+00A0) sits before
// the French colon, semicolon, question and exclamation marks.
// ACTS and ACTS_INTRO (Cadrer, Matérialiser, Arbitrer) are no longer shown on the Approche page:
// the homepage Method section still reads them.

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
// Acts
// ---------------------------------------------------------------------------

export const ACTS_INTRO: Bi<{ title: string; subtitle: string }> = {
  fr: {
    title: 'Comment le travail se structure',
    subtitle: 'Trois temps, adaptés à chaque projet. Le rythme se construit ensemble dès la première semaine.',
  },
  en: {
    title: 'How the work is structured',
    subtitle: 'Three stages, adapted to each project. We set the rhythm together from the first week.',
  },
}

export interface ActProofLink {
  href: string
  label: Bi<string>
}

/** One real artefact of the work shown under an act, with a short caption */
export interface ActEvidence {
  src: string
  label: Bi<string>
}

export interface ActDeliverable {
  activity: Bi<string>
  output: Bi<string>
  format: Bi<string>
}

export interface Act {
  id: string
  title: Bi<string>
  description: Bi<string>
  detail: Bi<string>
  deliverables: ActDeliverable[]
  /** Three real artefacts (photos, boards, screens, specs), read left to right */
  evidence: ActEvidence[]
  proof: {
    heading: Bi<string>
    body: Bi<string>
    links: ActProofLink[]
  }
}

export const ACTS: Act[] = [
  {
    id: 'frame',
    title: { en: 'Frame', fr: 'Cadrer' },
    description: {
      en: 'Before the first screen, we align on what we are solving and why it matters.',
      fr: 'Avant le premier écran, on s’aligne sur ce qu’on résout et pourquoi.',
    },
    detail: {
      en: 'I work with the PM and the business team to define the problem perimeter, the hypotheses we want to test, and the success criteria. We identify the user profiles involved, their real workflows, their frustrations, and we map the risks. This framing produces a shared document that everyone can refer to throughout the project, so the team does not revisit the same questions later.',
      fr: 'Je travaille avec le PM et le métier pour définir le périmètre du problème, les hypothèses qu’on veut tester et les critères de succès. On identifie les profils utilisateurs concernés, leurs parcours réels, leurs frustrations, et on cartographie les risques. Ce cadrage produit un document partagé auquel tout le monde peut se référer pendant le projet, pour ne pas revenir sur les mêmes questions plus tard.',
    },
    deliverables: [
      {
        activity: { en: 'Framing workshop', fr: 'Atelier de cadrage' },
        output: {
          en: 'Structured problem, perimeter, risks, hypotheses, success criteria',
          fr: 'Problème structuré, périmètre, risques, hypothèses, critères de succès',
        },
        format: {
          en: 'FigJam board, Notion/Confluence doc, restitution deck',
          fr: 'Board FigJam, doc Notion/Confluence, deck de restitution',
        },
      },
    ],
    evidence: [
      {
        src: '/images/approche/persona-journey.webp',
        label: { en: 'Persona and journey map', fr: 'Persona et parcours' },
      },
      {
        src: '/images/francevae/atelier france vae AAP 01.webp',
        label: { en: 'Workshop with the field', fr: 'Atelier avec le terrain' },
      },
      {
        src: '/images/francevae/animation atelier 00.webp',
        label: { en: 'Key figures from the research', fr: 'Chiffres clés de la recherche' },
      },
    ],
    proof: {
      heading: {
        en: 'The user knows what does not work, even without saying it.',
        fr: 'L’utilisateur sait ce qui ne fonctionne pas, même sans le formuler.',
      },
      body: {
        en: 'Interviews help understand real behaviors, the prototype confronts the hypotheses we draw from them. At France VAE, ten field interviews were enough to reorder the priorities of an entire MVP. At Banque des Territoires, tests on Aquagir showed a gap between the designed journey and the actual moment of user need. I practice user research continuously: on-site observation, calls with sales and support teams, ticket analysis.',
        fr: 'Les entretiens servent à comprendre les comportements réels, le prototype à confronter les hypothèses qu’on en tire. Chez France VAE, dix entretiens terrain ont suffi à réordonner les priorités d’un MVP entier. Chez la Banque des Territoires, les tests sur Aquagir ont montré un décalage entre le parcours conçu et le moment réel du besoin. Je pratique la recherche utilisateur en continu : observation sur site, calls avec les équipes sales et support, analyse des tickets.',
      },
      links: [{ href: '/project/france-vae#initiative-3', label: { en: 'France VAE', fr: 'France VAE' } }],
    },
  },
  {
    id: 'build',
    title: { en: 'Build', fr: 'Matérialiser' },
    description: {
      en: 'A prototype rather than a document, at the fidelity the question requires. Something concrete to put in front of a user or a decision-maker.',
      fr: 'Un prototype plutôt qu’un document, au niveau de fidélité que la question demande. Quelque chose de concret à mettre devant un utilisateur ou un décideur.',
    },
    detail: {
      en: 'I explore two to three directions, then converge on the one we test. The prototype can be a Figma interactive flow, an HTML page deployed on Vercel, or a coded component, depending on what the question requires. Discovery and delivery run in parallel: while one sprint produces a testable artifact, the previous one is being evaluated. The right level of fidelity depends on the question being asked, whatever the project stage.',
      fr: 'J’explore deux à trois directions, puis on converge sur celle qu’on teste. Le prototype peut être un parcours interactif Figma, une page HTML déployée sur Vercel ou un composant codé, selon ce que la question demande. Discovery et delivery tournent en parallèle : pendant qu’un sprint produit un artefact testable, le précédent est en cours d’évaluation. Le bon niveau de fidélité dépend de la question qu’on se pose, quelle que soit l’étape du projet.',
    },
    deliverables: [
      {
        activity: { en: 'Exploration', fr: 'Exploration' },
        output: { en: '2 to 3 directions to decide between, with rationale', fr: '2 à 3 directions à arbitrer, avec argumentaire' },
        format: {
          en: 'Sketches, lo-fi wireframes (Figma), presentation deck',
          fr: 'Sketches, wireframes basse fidélité (Figma), deck de présentation',
        },
      },
      {
        activity: { en: 'Design', fr: 'Conception' },
        output: { en: 'Complete flows, states, edge cases', fr: 'Parcours complets, états, cas limites' },
        format: {
          en: 'Interactive Figma or HTML prototype, annotated mockups',
          fr: 'Prototype interactif Figma ou HTML, maquettes annotées',
        },
      },
    ],
    evidence: [
      {
        src: '/images/approche/design-teardown.webp',
        label: { en: 'Directions explored in a workshop', fr: 'Pistes explorées en atelier' },
      },
      {
        src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp',
        label: { en: 'Low-fidelity wireframes', fr: 'Wireframes basse fidélité' },
      },
      {
        src: '/images/connect/connect_dashboard_home_light_full-scaled.webp',
        label: { en: 'The interface, high fidelity', fr: 'L’interface en haute fidélité' },
      },
    ],
    proof: {
      heading: {
        en: 'A prototype moves a project forward faster than a document.',
        fr: 'Un prototype fait avancer un projet plus vite qu’un document.',
      },
      body: {
        en: 'At Toolkit, the V2 prototype helped the CEO secure the second funding round: the investors saw the product instead of a slide deck. It did what a specification document never could, it made the decision tangible.',
        fr: 'Chez Toolkit, le prototype V2 a permis au CEO de sécuriser la deuxième levée de fonds : les investisseurs ont vu le produit plutôt qu’un deck de slides. Il a fait ce qu’un document de spécifications n’aurait jamais fait, il a rendu la décision tangible.',
      },
      links: [{ href: '/project/toolkit', label: { en: 'Toolkit', fr: 'Toolkit' } }],
    },
  },
  {
    id: 'decide',
    title: { en: 'Decide', fr: 'Arbitrer' },
    description: {
      en: 'We test with real users, observe what happens, and let the results shape what comes next.',
      fr: 'On teste avec de vrais utilisateurs, on observe ce qui se passe, et on laisse les résultats orienter la suite.',
    },
    detail: {
      en: 'Moderated tests with five to eight participants, or unmoderated tests via Maze or Lookback with thirty users. Precise scenarios, direct observation: we watch what people do rather than what they say they would do. Every tradeoff is documented. The backlog is fed by test observations and storymaps rather than assumptions. When we need to decide what enters V1 and what waits, we have data to support the conversation.',
      fr: 'Tests modérés avec cinq à huit participants, ou tests non modérés via Maze ou Lookback avec trente utilisateurs. Scénarios précis, observation directe : on regarde ce que les gens font, plus que ce qu’ils disent qu’ils feraient. Chaque arbitrage est documenté. Le backlog se nourrit des observations de test et des storymaps, sans passer par des suppositions. Quand il faut décider ce qui entre dans la V1 et ce qui attend, on a des données pour appuyer la conversation.',
    },
    deliverables: [
      {
        activity: { en: 'Validation', fr: 'Validation' },
        output: {
          en: 'Documented field insights, recommendations, documented decisions',
          fr: 'Insights terrain documentés, recommandations, décisions documentées',
        },
        format: { en: 'Test report (Notion), annotated videos', fr: 'Rapport de test (Notion), vidéos annotées' },
      },
      {
        activity: { en: 'Handoff', fr: 'Handoff' },
        output: { en: 'Specs ready for developers, backlog prioritised on facts', fr: 'Specs prêtes pour les développeurs, backlog priorisé sur la base de faits' },
        format: {
          en: 'Annotated Figma, flows/US, implementation specs',
          fr: 'Figma annoté, flows/US, specs d’implémentation',
        },
      },
      {
        activity: { en: 'Deployment', fr: 'Déploiement' },
        output: { en: 'Release presentation, changelog visuals, field demo', fr: 'Présentation release, visuels changelog, démo terrain' },
        format: {
          en: 'Hi-fi Figma prototype, design rationale, product copy',
          fr: 'Prototype Figma hi-fi, partis pris de conception, rédactionnel produit',
        },
      },
    ],
    evidence: [
      {
        src: '/images/francevae/UXR - interface tableau de bord candidat.webp',
        label: { en: 'The interface tested with users', fr: 'L’interface testée avec les utilisateurs' },
      },
      {
        src: '/images/francevae/UXR - test - tableau prio.webp',
        label: { en: 'Prioritisation after the tests', fr: 'Priorisation après les tests' },
      },
      {
        src: '/images/connect/connect_specifications_implem_01-scaled.webp',
        label: { en: 'Specs for the developers', fr: 'Spécifications pour les développeurs' },
      },
    ],
    proof: {
      heading: {
        en: 'Build a target vision, break it down into testable increments.',
        fr: 'On construit une vision cible, on la découpe en incréments testables.',
      },
      body: {
        en: 'At UNOWHY, the Connect dashboard prototype showed that teachers needed specialized applications rather than a unified dashboard. We changed direction, which saved the project six months. The SQOOL suite went from zero to five applications in two years, shipped quarter by quarter, and SQOOL Extend was deployed in five pilot schools before being industrialized.',
        fr: 'Chez UNOWHY, le prototype du dashboard Connect a montré que les enseignants avaient besoin d’applications spécialisées plutôt que d’un tableau de bord unifié. On a changé de direction, ce qui a fait gagner six mois au projet. La suite SQOOL est passée de zéro à cinq applications en deux ans, livrées trimestre par trimestre, et SQOOL Extend a été déployée dans cinq lycées pilotes avant d’être industrialisée.',
      },
      links: [
        { href: '/project/connect', label: { en: 'SQOOL Connect', fr: 'SQOOL Connect' } },
        { href: '/project/sqool-classe', label: { en: 'SQOOL Classe', fr: 'SQOOL Classe' } },
      ],
    },
  },
]

// ---------------------------------------------------------------------------
// Situations: what changes with the maturity of the team
// ---------------------------------------------------------------------------

export const SITUATIONS_COPY: Bi<{
  title: string
  intro: string
  columns: { situation: string; role: string; outputs: string }
  proofLink: string
}> = {
  fr: {
    title: 'Ce que je fais change avec la maturité de l’équipe',
    intro: 'Chaque équipe que je rejoins a sa propre culture produit et sa propre culture design. Mon rôle et ce que je produis s’adaptent à son point de départ.',
    columns: { situation: 'Situation', role: 'Mon rôle', outputs: 'Ce que je produis' },
    proofLink: 'Voir',
  },
  en: {
    title: 'What I do depends on the maturity of the team',
    intro: 'Every team I join has its own product culture and its own design culture. What I take on and what I produce adapt to where it starts.',
    columns: { situation: 'Situation', role: 'What I take on', outputs: 'What I produce' },
    proofLink: 'See',
  },
}

export interface Situation {
  id: string
  name: Bi<string>
  context: Bi<string>
  role: Bi<string>
  outputs: Bi<string>
  proof: { text: Bi<string>; link?: { href: string; label: Bi<string> } }
}

export const SITUATIONS: Situation[] = [
  {
    id: 'no-frame',
    name: { fr: 'Aucun cadre', en: 'No frame yet' },
    context: {
      fr: 'Les sujets s’empilent, les avis divergent, le problème reste à écrire.',
      en: 'Subjects pile up, opinions differ, and the problem is still to be written down.',
    },
    role: {
      fr: 'J’anime des ateliers de cadrage et je mène la réflexion stratégique : définir le problème, repérer les opportunités, poser un premier cadre de solution.',
      en: 'I run framing workshops and lead the strategic thinking: define the problem, spot opportunities, structure the roadmap, set a first solution frame.',
    },
    outputs: {
      fr: 'Un document de cadrage partagé, la cartographie des acteurs et des enjeux, les hypothèses à tester.',
      en: 'A shared framing document, a map of the people and stakes involved, the hypotheses to test.',
    },
    proof: {
      text: {
        fr: 'Chez France VAE, dix entretiens terrain ont réordonné les priorités d’un MVP entier.',
        en: 'At France VAE, ten field interviews reordered the priorities of an entire MVP.',
      },
      link: { href: '/project/france-vae#initiative-3', label: { fr: 'France VAE', en: 'France VAE' } },
    },
  },
  {
    id: 'partial-frame',
    name: { fr: 'Un cadre partiel', en: 'A partial frame' },
    context: {
      fr: 'Une direction existe, mais l’équipe connaît peu ses utilisateurs.',
      en: 'A direction exists, but the team knows little about its users.',
    },
    role: {
      fr: 'J’organise et j’anime la recherche : entretiens, observation sur site, tests de maquettes. Ce qu’on observe nourrit les pistes de solution.',
      en: 'I organise and run the research: interviews, on-site observation, mockup tests. What we observe feeds the solution options.',
    },
    outputs: {
      fr: 'Des synthèses de recherche, des priorités, des concepts et des prototypes à mettre devant des utilisateurs.',
      en: 'Research syntheses, priorities, and concepts and prototypes to put in front of users.',
    },
    proof: {
      text: {
        fr: 'À la Banque des Territoires, les tests sur Aquagir ont montré un décalage entre le parcours conçu et le moment réel du besoin.',
        en: 'At Banque des Territoires, the Aquagir tests showed a gap between the journey as designed and the moment the need actually arises.',
      },
    },
  },
  {
    id: 'equipped-team',
    name: { fr: 'Une équipe déjà outillée', en: 'An equipped team' },
    context: {
      fr: 'Produit, design et tech travaillent ensemble et ont leurs habitudes.',
      en: 'Product, design and engineering already work together and have their habits.',
    },
    role: {
      fr: 'Je m’intègre : je conçois, je prototype, je teste les maquettes et je définis les composants avec les développeurs.',
      en: 'I join the team: I design, prototype, test mockups, and define the components with the developers.',
    },
    outputs: {
      fr: 'Des parcours complets avec leurs états et cas limites, des maquettes annotées, des spécifications, un design system.',
      en: 'Complete flows with their states and edge cases, annotated mockups, specifications, a design system.',
    },
    proof: {
      text: {
        fr: 'Chez UNOWHY, le prototype du dashboard Connect a montré que les enseignants avaient besoin d’applications spécialisées. On a changé de direction, ce qui a fait gagner six mois au projet.',
        en: 'At UNOWHY, the Connect dashboard prototype showed that teachers needed specialised applications. We changed direction, which saved the project six months.',
      },
      link: { href: '/project/connect', label: { fr: 'SQOOL Connect', en: 'SQOOL Connect' } },
    },
  },
]

// ---------------------------------------------------------------------------
// Page structure: table of contents, intermediate titles and leads of each numbered act
// ---------------------------------------------------------------------------

export const PAGE_STRUCTURE: Bi<{
  toc: { id: string; label: string }[]
  situationsDiagram: string
  situationsTable: string
  fidelity: string
  concept: string
  documents: string
  prototype: string
  client: string
  disciplinesLead: string
  counterparts: string
  rhythm: string
  domainsLead: string
}> = {
  fr: {
    toc: [
      { id: 'scales', label: 'Trois échelles' },
      { id: 'roadmap', label: 'Feuille de route' },
      { id: 'situations', label: 'Situations' },
      { id: 'before-screen', label: 'Avant l’écran' },
      { id: 'working', label: 'Travailler ensemble' },
      { id: 'disciplines', label: 'Chaque métier' },
      { id: 'domains', label: 'Domaines' },
      { id: 'clients', label: 'Références' },
      { id: 'contact', label: 'Contact' },
    ],
    situationsDiagram: 'Mon rôle selon la maturité de l’équipe',
    situationsTable: 'Trois points de départ',
    fidelity: 'Du moins défini au plus précis',
    concept: 'Schématiser pour faire avancer les discussions',
    documents: 'Des documents réels',
    prototype: 'Un prototype quand la question l’exige',
    client: 'Dans les mots d’un client',
    disciplinesLead: 'Ce que je produis et la façon de collaborer changent selon l’interlocuteur.',
    counterparts: 'Quatre interlocuteurs',
    rhythm: 'Un rythme sur plusieurs horizons',
    domainsLead: 'Quatre domaines, chacun avec les études de cas qui le montrent.',
  },
  en: {
    toc: [
      { id: 'scales', label: 'Three scales' },
      { id: 'roadmap', label: 'Roadmap' },
      { id: 'situations', label: 'Situations' },
      { id: 'before-screen', label: 'Before the screen' },
      { id: 'working', label: 'Working together' },
      { id: 'disciplines', label: 'Each discipline' },
      { id: 'domains', label: 'Areas of work' },
      { id: 'clients', label: 'Clients' },
      { id: 'contact', label: 'Contact' },
    ],
    situationsDiagram: 'My role shifts with maturity',
    situationsTable: 'Three starting points',
    fidelity: 'From the least defined to the most precise',
    concept: 'Sketching to move discussions forward',
    documents: 'Real documents',
    prototype: 'A prototype when the question calls for one',
    client: 'In a client’s words',
    disciplinesLead: 'What I produce and how we collaborate change with who is across the table.',
    counterparts: 'Four counterparts',
    rhythm: 'A rhythm over several horizons',
    domainsLead: 'Four areas, each with the case studies that show it.',
  },
}

// ---------------------------------------------------------------------------
// Diagrams (qualitative, no values): fidelity over readability, and the two tracks of a sprint
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

export const BEFORE_SCREEN: Bi<{
  /** Section name for assistive technology: the visible heading is the tagline */
  title: string
  /** The large statement, revealed word by word as the section scrolls into view */
  tagline: string
  caption: string
  prototype: string
  prototypeLink: { href: string; label: string }
}> = {
  fr: {
    title: 'Avant l’écran, des documents de travail',
    tagline: 'Le gros du travail se fait avant l’écran, dans des documents que toute l’équipe peut relire et discuter.',
    caption: 'Du plus brut au plus abouti : le niveau de détail suit ce que l’équipe comprend.',
    prototype: 'Un prototype testable en quelques jours est l’un de mes leviers, parmi d’autres. Chez Toolkit, celui de la V2 a permis au CEO de sécuriser sa deuxième levée de fonds : les investisseurs ont vu le produit plutôt qu’une présentation.',
    prototypeLink: { href: '/project/toolkit', label: 'Voir l’étude de cas Toolkit' },
  },
  en: {
    title: 'Before the screen, working documents',
    tagline: 'Most of the work happens before the screen, in documents the whole team can reread and discuss.',
    caption: 'A framing note can take several weeks, a mockup a few days: the level of detail follows what the team understands.',
    prototype: 'A testable prototype within a few days is one of my levers among others. At Toolkit, the V2 prototype helped the CEO secure the second funding round: the investors saw the product instead of a deck.',
    prototypeLink: { href: '/project/toolkit', label: 'See Toolkit' },
  },
}

/** Real artefacts, ordered from the roughest to the most finished */
export const ARTEFACTS: { src: string; label: Bi<string> }[] = [
  { src: '/images/francevae/atelier france vae AAP 01.webp', label: { fr: 'Atelier avec le terrain', en: 'Workshop with the field' } },
  { src: '/images/approche/persona-journey.webp', label: { fr: 'Persona et parcours', en: 'Persona and journey map' } },
  { src: '/images/approche/design-teardown.webp', label: { fr: 'Pistes explorées en atelier', en: 'Directions explored in a workshop' } },
  { src: '/images/connect/connect_bulle_ui_wireframes_concept-scaled.webp', label: { fr: 'Wireframes basse fidélité', en: 'Low-fidelity wireframes' } },
  { src: '/images/connect/connect_dashboard_home_light_full-scaled.webp', label: { fr: 'L’interface en haute fidélité', en: 'The interface, high fidelity' } },
  { src: '/images/connect/connect_specifications_implem_01-scaled.webp', label: { fr: 'Spécifications pour les développeurs', en: 'Specs for the developers' } },
]

// ---------------------------------------------------------------------------
// What it is like to work with me
// ---------------------------------------------------------------------------

export const WORKING_WITH_ME: Bi<{ title: string; paragraphs: string[] }> = {
  fr: {
    title: 'Travailler avec moi',
    paragraphs: [
      'Mon approche est humaine. J’écoute d’abord l’équipe et son terrain, puis je rends visible ce que chacun sait déjà, pour que la compréhension devienne commune.',
      'Je travaille en intelligence collective : ateliers, entretiens, revues, et des documents que toute l’équipe peut relire et réutiliser. Chaque arbitrage laisse une trace écrite.',
      'Je cherche à faire progresser l’équipe en même temps que le produit : qu’elle sache mener un atelier et lire un test utilisateur. Les livrables prennent le format que le besoin demande : cadrage, brief, synthèse de recherche, prototype, spécifications.',
    ],
  },
  en: {
    title: 'What it is like to work with me',
    paragraphs: [
      'My approach is human. I start by listening to the team and its field, then make visible what each person already knows, so the understanding becomes shared.',
      'I work through collective intelligence: workshops, interviews, reviews, and documents the whole team can reread and reuse. Every tradeoff leaves a written trace.',
      'I aim for the team to grow along with the product: able to run a workshop and read a user test. Deliverables take the format the need calls for: framing note, diagram, design calendar, research synthesis, prototype, specifications.',
    ],
  },
}

// ---------------------------------------------------------------------------
// With each discipline
// ---------------------------------------------------------------------------

export const COLLABORATION = {
  fr: {
    title: 'Avec chaque métier',
    blocks: [
      {
        id: 'pm',
        label: 'Avec le PM',
        body: 'Trois principes : chaque atelier a un livrable défini, le PM voit l’avancement en continu, et chaque arbitrage est documenté. La rédaction des spécifications revient au PM. Je produis les maquettes annotées et les parcours documentés qui les alimentent. La conception est visible dès les premières explorations.',
      },
      {
        id: 'devs',
        label: 'Avec les développeurs',
        body: 'J’interviens en amont. Revues des interactions, des cas limites, des états. Chez UNOWHY comme chez Dailymotion, le design system Storybook a été construit avec les développeurs front, dès les premiers composants. Cette co-construction change la qualité des composants et réduit les allers-retours.',
      },
      {
        id: 'team',
        label: 'Avec les designers et les freelances',
        body: 'Je capte les informations et je les partage, je produis les cadrages et les briefs, j’organise les tâches et je mets en place des tableaux de suivi de la production. J’améliore la structure des fichiers Figma et j’apporte des outils : composants, kits et modèles, y compris pour animer des ateliers.',
      },
      {
        id: 'culture',
        label: 'Culture design',
        body: 'La culture design se construit par des micro-actions répétées : inviter le PM à observer un test utilisateur, animer un atelier d’idéation avec le métier et la tech, montrer concrètement qu’un test de trente minutes évite trois semaines de développement dans la mauvaise direction.',
      },
    ],
  },
  en: {
    title: 'With each discipline',
    blocks: [
      {
        id: 'pm',
        label: 'With the PM',
        body: 'I help the PM define the need: workshops, framing notes, slicing of the initiatives. Every workshop has a defined deliverable, the PM sees progress as it happens, and every tradeoff is documented. Product specs are the PM’s responsibility; I produce the annotated mockups and documented flows that feed them.',
      },
      {
        id: 'devs',
        label: 'With engineering',
        body: 'I get involved early. Reviews on interactions, edge cases, states. At UNOWHY and at Dailymotion, the Storybook design system was built with the front-end developers, from the first components. This co-construction changes the quality of components and reduces back and forth.',
      },
      {
        id: 'team',
        label: 'With designers and freelancers',
        body: 'I gather the information and share it, produce the framings and briefs, organise the tasks and set up production tracking boards. I improve the structure of the Figma files and bring tools: components, kits and templates, including some for running workshops.',
      },
      {
        id: 'culture',
        label: 'Design culture',
        body: 'Design culture is built through repeated small actions: inviting the PM to observe a user test, running an ideation workshop with business and tech, showing concretely that a thirty-minute test saves three weeks of development in the wrong direction.',
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// A rhythm over several horizons: framing over weeks, discovery feeding delivery, sprints, every week
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

/** The rituals behind the rhythm, by horizon */
export const HORIZONS: Bi<{ label: string; columns: { title: string; items: string[] }[]; footer: string }> = {
  fr: {
    label: 'Les rituels, par horizon',
    columns: [
      { title: 'Chaque semaine', items: ['Un point avec chaque PM', 'Des ateliers de définition du besoin', 'Des revues de conception avec les développeurs'] },
      { title: 'Chaque sprint', items: ['Refinement et découpage fin', 'Préparation du sprint suivant', 'Revue de ce qui a été livré'] },
      { title: 'Sur plusieurs semaines', items: ['Des notes de cadrage', 'Des initiatives de discovery et un calendrier de recherche', 'La feuille de route et le calendrier de conception, mis à jour'] },
    ],
    footer: 'Le rythme se construit avec l’équipe, dès les premières semaines.',
  },
  en: {
    label: 'The rituals, by horizon',
    columns: [
      { title: 'Every week', items: ['A sync with each PM', 'Need definition workshops', 'Design reviews with the developers'] },
      { title: 'Every sprint', items: ['Refinement and fine slicing', 'Preparing the next sprint', 'Review of what was shipped'] },
      { title: 'Over several weeks', items: ['Framing notes', 'Discovery initiatives and a research calendar', 'The roadmap and the design calendar, kept up to date'] },
    ],
    footer: 'The rhythm is built with the team, from the first weeks.',
  },
}

// ---------------------------------------------------------------------------
// Closing
// ---------------------------------------------------------------------------

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
