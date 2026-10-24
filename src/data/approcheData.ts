// Approche page: situations by team maturity, working documents, how it is to work together,
// collaboration by discipline, weekly rhythm, closing. A no-break space (U+00A0) sits before
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
    lead: 'Je pose un cadre là où il n’y en a pas, j’organise la recherche et le travail en commun qui l’entourent, puis j’affine les maquettes à mesure que le sujet devient lisible.',
    cta: { label: 'Parlons de votre contexte', href: '/contact' },
  },
  en: {
    title: 'Approach',
    statement: 'Approach',
    lead: 'I set a frame where there is none, organise the collaboration and the research around it, then raise the fidelity as the complexity becomes readable.',
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
      en: 'Short cycles. One week, one testable prototype. Something concrete to put in front of a user or a decision-maker.',
      fr: 'Cycles courts. Une semaine, un prototype testable. Quelque chose de concret à mettre devant un utilisateur ou un décideur.',
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
    intro: 'Les équipes que je rejoins n’ont ni la même culture produit ni la même culture design. Mon rôle et ce que je produis s’adaptent à leur point de départ.',
    columns: { situation: 'Situation', role: 'Mon rôle', outputs: 'Ce que je produis' },
    proofLink: 'Voir',
  },
  en: {
    title: 'What I do depends on the maturity of the team',
    intro: 'The teams I join do not share the same product culture or design culture. What I take on and what I produce adapt to where they start.',
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
      fr: 'Le sujet est flou, les avis divergent, le problème n’est écrit nulle part.',
      en: 'The subject is blurry, opinions differ, and the problem is written down nowhere.',
    },
    role: {
      fr: 'J’anime des ateliers de cadrage et je mène la réflexion stratégique : définir le problème, repérer les opportunités, poser un premier cadre de solution.',
      en: 'I run framing workshops and lead the strategic thinking: define the problem, spot opportunities, set a first solution frame.',
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
    fidelity: 'On précise à mesure que le sujet s’éclaircit',
    documents: 'Des documents réels',
    prototype: 'Un prototype quand la question l’exige',
    client: 'Dans les mots d’un client',
    disciplinesLead: 'Ce que je produis et la façon de collaborer changent selon l’interlocuteur.',
    counterparts: 'Quatre interlocuteurs',
    rhythm: 'Un rythme de travail',
    domainsLead: 'Quatre domaines, chacun avec les études de cas qui le montrent.',
  },
  en: {
    toc: [
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
    fidelity: 'Fidelity rises with readability',
    documents: 'Real documents',
    prototype: 'A prototype when the question calls for one',
    client: 'In a client’s words',
    disciplinesLead: 'What I produce and how we collaborate change with who is across the table.',
    counterparts: 'Four counterparts',
    rhythm: 'A working rhythm',
    domainsLead: 'Four areas, each with the case studies that show it.',
  },
}

// ---------------------------------------------------------------------------
// Diagrams (qualitative, no values): fidelity over readability, and the two tracks of a sprint
// ---------------------------------------------------------------------------

export const FIDELITY_DIAGRAM: Bi<{ title: string; desc: string; stages: [string, string, string]; curve: string }> = {
  fr: {
    title: 'Le niveau de détail monte à mesure que le sujet s’éclaircit',
    desc: 'Une courbe qui monte de l’atelier brut aux wireframes, puis aux spécifications.',
    stages: ['Atelier', 'Wireframes', 'Specs'],
    curve: 'Fidélité',
  },
  en: {
    title: 'Fidelity rises as the complexity becomes readable',
    desc: 'A curve that rises from the rough workshop to wireframes, then to specifications.',
    stages: ['Workshop', 'Wireframes', 'Specs'],
    curve: 'Fidelity',
  },
}

export const TRACKS_DIAGRAM: Bi<{ title: string; desc: string; build: string; evaluate: string }> = {
  fr: {
    title: 'Exploration et livraison avancent en parallèle',
    desc: 'Deux rangées décalées d’un cycle. Pendant que je construis l’artefact suivant, l’équipe évalue le précédent.',
    build: 'Je construis un artefact testable',
    evaluate: 'L’équipe évalue le précédent',
  },
  en: {
    title: 'Discovery and delivery run in parallel',
    desc: 'Two rows offset by one cycle. While I build the next artefact, the team evaluates the previous one.',
    build: 'I build a testable artefact',
    evaluate: 'The team evaluates the previous one',
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
    caption: 'From the roughest to the most finished: fidelity goes up as the complexity becomes readable.',
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
      'Je cherche à faire progresser l’équipe en même temps que le produit : qu’elle sache mener un atelier et lire un test utilisateur. Les livrables varient selon le besoin, sans format imposé : cadrage, brief, synthèse de recherche, prototype, spécifications.',
    ],
  },
  en: {
    title: 'What it is like to work with me',
    paragraphs: [
      'My approach is human. I start by listening to the team and its field, then make visible what each person already knows, so the understanding becomes shared.',
      'I work through collective intelligence: workshops, interviews, reviews, and documents the whole team can reread and reuse. Every tradeoff leaves a written trace.',
      'I aim for the team to grow along with the product: able to run a workshop and read a user test. Deliverables vary with the need, with no imposed format: framing, brief, research synthesis, prototype, specifications.',
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
        body: 'J’interviens en amont. Revues des interactions, des cas limites, des états. Chez UNOWHY comme chez Dailymotion, le design system Storybook a été construit avec les développeurs front, pas livré à eux. Cette co-construction change la qualité des composants et réduit les allers-retours.',
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
        body: 'Three principles: every workshop has a defined deliverable, the PM sees progress as it happens, and every tradeoff is documented. Product specs are the PM’s responsibility. I produce annotated mockups and documented flows that feed them. Design is visible from the first explorations.',
      },
      {
        id: 'devs',
        label: 'With engineering',
        body: 'I get involved early. Reviews on interactions, edge cases, states. At UNOWHY and at Dailymotion, the Storybook design system was built with front-end developers, not delivered to them. This co-construction changes the quality of components and reduces back and forth.',
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
// Weekly rhythm (Discovery and Delivery, Monday to Friday)
// ---------------------------------------------------------------------------

export const RHYTHM = {
  en: {
    label: 'Weekly rhythm',
    modes: ['Discovery', 'Delivery'],
    days4: ['Mon', 'Tue to Wed', 'Thu', 'Fri'],
    /** What each column is for: align on Monday, deep work midweek, share and decide on Friday */
    phases: ['Align', 'Deep work', 'Deep work', 'Share and decide'],
    cells4: [
      ['Frame hypotheses. Who to talk to. Protocol.', 'User interviews. Observations. Data analysis.', 'Map insights. Emerging patterns. Reframe.', 'Restitution. Validate or change course. Decision.'],
      ['Sync PM/Designer. Sprint goal. Review hypotheses.', 'Exploration or iteration. Async exchanges.', 'Pattern coherence. Prep refinement or demo.', 'Prototype presented. Backlog prioritised.'],
    ],
    footer: 'Rhythm is set together in the first week.',
  },
  fr: {
    label: 'Rythme hebdomadaire',
    modes: ['Exploration', 'Livraison'],
    days4: ['Lun', 'Mar à Mer', 'Jeu', 'Ven'],
    phases: ['S’aligner', 'Travail de fond', 'Travail de fond', 'Partager et décider'],
    cells4: [
      ['Cadrer les hypothèses. Choisir qui rencontrer. Fixer le protocole.', 'Entretiens utilisateurs. Observations. Analyse des données.', 'Cartographier les enseignements. Repérer les motifs récurrents. Reformuler.', 'Restitution. Valider ou changer de cap. Décision.'],
      ['Point PM et designer. Objectif du sprint. Revue des hypothèses.', 'Exploration ou itération. Échanges asynchrones.', 'Cohérence des motifs. Préparer l’affinage du backlog ou la démo.', 'Prototype présenté. Backlog priorisé.'],
    ],
    footer: 'Le rythme se construit ensemble dès la première semaine.',
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
