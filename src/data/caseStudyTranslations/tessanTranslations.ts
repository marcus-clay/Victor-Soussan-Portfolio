// Tessan case study: hero, summary and six short sections, then what stays open.
// Each section is one title, one paragraph and its screens: the product carries the page,
// the text only names the decision.
// Sources: the mission archive (April to July 2026). Colleagues are named by role.
// Figures named in `figures` are keys of FIGURES in TessanPage.

export interface TessanSection {
  id: string
  title: string
  text: string
  figures?: string[]
}

export interface TessanTranslation {
  hero: { title: string; intro: string; role: string; period: string; team: string; scope: string }
  metaLabels: { role: string; period: string; team: string; scope: string }
  summary: {
    context: string
    role: string
    roleItems: { title: string; detail?: string }[]
    deliverables: { title: string; detail?: string }[]
    metrics: { value: string; label: string }[]
  }
  sections: TessanSection[]
  ui: { prototype: string }
  captions: Record<string, string>
}

export const TESSAN_TRANSLATIONS: Record<'en' | 'fr', TessanTranslation> = {
  fr: {
    hero: {
      title: 'Reconstruire l’application patient de Tessan en 30 jours',
      intro:
        'Trois mois chez Tessan, qui équipe des pharmacies de cabines de téléconsultation. Premier designer de l’entreprise, j’ai piloté avec un tech lead et deux développeurs la reconstruction de l’application patient, autour d’un design system, d’un assistant IA qui ne diagnostique pas et d’une vision produit, le Hub Santé.',
      role: 'Premier designer, lead design et product owner',
      period: 'Avril à juillet 2026',
      team: 'Un tech lead, deux développeurs, seul designer',
      scope: 'App patient, design system, assistant IA, gestion produit, vision',
    },
    metaLabels: { role: 'Rôle', period: 'Période', team: 'Équipe', scope: 'Périmètre' },
    summary: {
      context:
        'Tessan équipe des pharmacies de cabines de téléconsultation. L’enjeu : la valeur vient du patient qui revient, et l’application existante n’y contribuait pas, avec une session fragmentée, une double navigation et un tunnel de 8 à 13 écrans. L’objectif : une première version centrée sur la consultation, prête à soumettre aux stores avant le 15 juillet.',
      role: 'Premier et seul designer de l’entreprise. Lead design et product owner de l’application patient, avec un tech lead et deux développeurs.',
      roleItems: [
        { title: 'Application', detail: 'périmètre, parcours, 40 écrans, builds' },
        { title: 'Assistant IA', detail: 'cadre non médical, garde-fous' },
        { title: 'Design system', detail: 'tokens, composants, skills' },
        { title: 'Gestion produit', detail: 'modèle lisible par une IA' },
      ],
      deliverables: [
        { title: 'Application patient', detail: 'iOS et Android' },
        { title: 'Tunnel de consultation', detail: 'audit de 25 écrans, parcours refondu' },
        { title: 'Assistant Santé', detail: 'quatre parcours, garde-fous' },
        { title: 'Vision Hub Santé', detail: 'cinq concepts prototypés' },
      ],
      metrics: [
        { value: '30 jours', label: 'de la décision de reconstruire à la préparation de la soumission' },
        { value: '3 builds', label: 'en deux semaines, du 26 juin au 9 juillet' },
        { value: '3 %', label: 'de saisies de mutuelle réussies : l’écran est retiré' },
      ],
    },
    sections: [
      {
        id: 'app',
        title: 'L’application',
        text: 'Le 15 juin, deux décisions cadrent la reconstruction. Nous passons au natif, car réaménager l’ancienne coquille aurait conservé la double session : seul le moteur de téléconsultation reste encapsulé. Nous retirons aussi ce qui séduisait le plus. La santé connectée, le score et l’abonnement exposaient le produit à une requalification en dispositif médical, soit 18 à 36 mois de certification face à 30 jours.',
        figures: ['appScreens'],
      },
      {
        id: 'tunnel',
        title: 'Le tunnel de consultation',
        text: 'Huit à treize écrans selon un routeur invisible, et 3 % de saisies de mutuelle réussies. La mutuelle sort du tunnel au profit d’une avance de frais, l’arrêt de travail devient une option du motif, et la salle d’attente montre une position plutôt qu’un minuteur qui mentirait.',
        figures: ['tunnelScreens'],
      },
      {
        id: 'protos-tunnel',
        title: 'Des prototypes pour trancher l’ordre des écrans',
        text: 'Des wireframes interactifs en noir et blanc, revus avec la direction produit, ont fixé l’ordre des écrans avant les maquettes. Un prototype de réservation a ensuite simulé la prise de créneau en pharmacie, de la carte des cabines à l’accès confirmé, avec les vraies officines autour des cabines.',
        figures: ['wireframes', 'wireStills', 'v4Stills'],
      },
      {
        id: 'assistant',
        title: 'L’assistant',
        text: 'L’assistant n’a pas le droit de diagnostiquer, et la limite est dans l’écran : un bandeau de périmètre permanent, une escalade vers un médecin déclenchée par le contenu et non par un compteur, un prénom jamais transmis au modèle. « Assistant Santé » remplace « Docteur Tessan », dont le titre promettait trop.',
        figures: ['assistantScreen', 'doctorStills'],
      },
      {
        id: 'design-system',
        title: 'Le design system',
        text: 'Un seul designer, Angular en production, React pour le neuf : le partage porte sur les tokens. Dans Figma, 11 rampes de couleur, 13 styles typographiques et près de 1 300 variantes de composants, nommés comme dans le kit React, son alter ego.',
        figures: ['dsVideos', 'dsVideosMobile', 'dsDemos', 'dsDemosMobile', 'dsPalette'],
      },
      {
        id: 'skills',
        title: 'Des skills pour que chaque génération respecte le système',
        text: 'Seul designer face à trois stacks, j’ai écrit les règles du design system sous une forme que Claude Code lit à chaque session : tokens, composants, doctrine de mouvement, vocabulaire patient. Le pack compte quatre skills dans le dépôt public et cinq dans la version interne de juin, avec une préséance écrite entre le kit React et le SDK Angular. Les équipes génèrent ainsi des interfaces déjà alignées, sans dépendance de plus. Aucune mesure d’adoption n’a été instrumentée.',
        figures: ['skillsTree'],
      },
      {
        id: 'figma-code',
        title: 'Figma et code, dans les deux sens',
        text: 'L’audit du système Smile a croisé le code et les variables Figma, et il a nommé le mécanisme de la dérive. Côté app, cinq sous-agents ont parcouru les écrans en lecture seule le 25 juin : cinq hauteurs de barre, une cible de retour à 24 px au lieu de 44 sur 15 écrans sur 23, une seule cause, l’absence d’un composant Header. Il a été construit le jour même, puis déployé sur 24 écrans.',
        figures: ['auditComposants'],
      },
      {
        id: 'gestion-produit',
        title: 'Piloter et produire avec des agents',
        text: 'Une page Notion écrite pour les agents décrit les bases, les statuts et les recettes de lecture. L’agent répond à « où en est l’application mobile ? », propose un tri signé et ne change jamais une priorité sans validation humaine ; le crash-test de 15 scénarios en a fait ressortir 7 correctifs. Côté livraison, les développeurs reçoivent sept epics, 25 user stories, 40 écrans et un gabarit de CLAUDE.md qui porte les interdits réglementaires, et ils implémentent avec Claude Code.',
        figures: ['pilotageAgent'],
      },
      {
        id: 'vision',
        title: 'Tessan OS, sept prototypes en une semaine',
        text: 'En avril, un document de vision ne se discute pas en réunion, un téléphone qu’on fait défiler si. Chaque prototype porte une hypothèse : la confiance dans un interlocuteur permanent, un signal de santé lisible, la continuité entre la cabine et le mobile, la prévention par de petites missions. La revue du 24 avril les retient comme cap. Ensuite, tout ce qui ressemble à un avis médical est retiré : le score devient Score Bien-Être, WhatsApp est écarté, « Docteur » disparaît du nom.',
        figures: ['osPrototypes', 'osStills', 'osDesktop', 'osPont', 'osVisio', 'osMedaillon', 'osCross'],
      },
      {
        id: 'hub',
        title: 'Le Hub Santé, une seule application',
        text: 'Le 9 juin, « Ma santé » pose les règles : une navigation stable, un état vide qui invite, des programmes bornés dans le temps, avec un objectif nommé et un suivi en tendance. Le 26 juin, le comité de direction retient une seule application et un ordre : programmes de prévention, écosystème pharmacie, puis objets connectés. La vision reste un cap, conditionnée à la certification des briques concernées, et n’est pas en production.',
        figures: ['hubScreens'],
      },
      {
        id: 'limites',
        title: 'Ce qui reste ouvert',
        text: 'Aucune métrique d’impact à mon départ : l’application n’était pas publiée et la soumission aux stores, préparée, était suspendue. Je poserais la mesure avant la refonte du tunnel, et la gouvernance du pilotage avant l’outil.',
      },
    ],
    ui: { prototype: 'Voir le prototype' },
    captions: {
      wireStills: 'Wireframes interactifs, écran par écran',
      v4Stills: 'Prototype de réservation en pharmacie',
      doctorStills: 'Le prototype Docteur Tessan, de la conversation à la salle d’attente',
      osStills: 'Prototypes Tessan OS : score, prévention, WhatsApp, espace patient',
      osDesktop: 'Prototypes Tessan OS sur cabine, tablette et bureau',
      dsDemos: 'Les démos en ligne du design system : catalogue, tokens, composants, Tessan Cloud et playground',
      dsDemosMobile: 'Les démos du design system sur mobile',
      appScreens: 'Les écrans de l’application patient',
      tunnelScreens: 'Le tunnel de consultation, de la carte vitale à la salle d’attente',
      wireframes: 'Prototypes interactifs : wireframes du tunnel et prototype de réservation en cabine',
      assistantScreen: 'L’Assistant Santé, avec son périmètre affiché',
      dsCatalogue: 'Le catalogue du kit de composants React',
      dsVideos: 'Les démos du design system en usage : catalogue, tokens, composants, Tessan Cloud et playground',
      dsVideosMobile: 'Tessan Cloud et le playground sur mobile',
      dsInteractions: 'Le kit en usage : une boîte de dialogue et une feuille',
      dsPalette: 'Les onze rampes de couleur du design system, dans Figma',
      skillsTree: 'Le pack de skills : arborescence réelle des dépôts public (avril) et interne (juin)',
      auditComposants: 'Audit des composants de l’app patient, 25 juin : cinq sous-agents, une cause racine',
      pilotageAgent: 'Le pilotage produit lisible par un agent, et ses garde-fous',
      osPrototypes: 'Les prototypes Tessan OS en usage',
      osPont: 'Le Pont : en fin de consultation en cabine, le contexte passe au mobile',
      osVisio: 'Première téléconsultation : de la prise des constantes en cabine à l’appel vidéo',
      osMedaillon: 'Tessan OS : l’authentification par empreinte, avec le médaillon du patient',
      osCross: 'Tessan OS : une couche commune au mobile, à la tablette et au bureau',
      hubScreens: 'Le Hub Santé : Ma Santé et le programme obésité',
    },
  },
  en: {
    hero: {
      title: 'Rebuilding Tessan’s patient app in 30 days',
      intro:
        'Three months at Tessan, which equips pharmacies with telemedicine booths. As the company’s first designer, I led the rebuild of the patient app with a tech lead and two developers, around a design system, an AI assistant that does not diagnose and a product vision, the Health Hub.',
      role: 'First designer, design lead and product owner',
      period: 'April to July 2026',
      team: 'A tech lead, two developers, sole designer',
      scope: 'Patient app, design system, AI assistant, product management, vision',
    },
    metaLabels: { role: 'Role', period: 'Period', team: 'Team', scope: 'Scope' },
    summary: {
      context:
        'Tessan equips pharmacies with telemedicine booths. The stake: value comes from the patient who returns, and the existing app did not contribute, with a fragmented session, double navigation and a funnel of 8 to 13 screens. The goal: a first version centered on the consultation, ready to submit to the stores before July 15.',
      role: 'The company’s first and only designer. Design lead and product owner of the patient app, with a tech lead and two developers.',
      roleItems: [
        { title: 'App', detail: 'scope, journeys, 40 screens, builds' },
        { title: 'AI assistant', detail: 'non-medical framework, guardrails' },
        { title: 'Design system', detail: 'tokens, components, skills' },
        { title: 'Product management', detail: 'a model an AI can read' },
      ],
      deliverables: [
        { title: 'Patient app', detail: 'iOS and Android' },
        { title: 'Consultation funnel', detail: 'audit of 25 screens, reworked journey' },
        { title: 'Health Assistant', detail: 'four journeys, guardrails' },
        { title: 'Health Hub vision', detail: 'five prototyped concepts' },
      ],
      metrics: [
        { value: '30 days', label: 'from the decision to rebuild to the prepared submission' },
        { value: '3 builds', label: 'in two weeks, from June 26 to July 9' },
        { value: '3%', label: 'of health insurance entries completed: the screen is removed' },
      ],
    },
    sections: [
      {
        id: 'app',
        title: 'The app',
        text: 'On June 15, two decisions frame the rebuild. We go native, because reworking the old shell would have kept the double session: only the teleconsultation engine stays encapsulated. We also remove what was most attractive. Connected health, the score and the subscription exposed the product to a medical device requalification, 18 to 36 months of certification against 30 days.',
        figures: ['appScreens'],
      },
      {
        id: 'tunnel',
        title: 'The consultation funnel',
        text: 'Eight to thirteen screens depending on an invisible router, and 3% of health insurance entries completed. The insurance entry leaves the funnel for an advance payment, sick leave becomes an option of the reason for the visit, and the waiting room shows a position rather than a timer that would lie.',
        figures: ['tunnelScreens'],
      },
      {
        id: 'protos-tunnel',
        title: 'Prototypes to settle the order of the screens',
        text: 'Interactive black-and-white wireframes, reviewed with product leadership, fixed the order of the screens before the mockups. A booking prototype then simulated slot booking in a pharmacy, from the booth map to the confirmed access, with the real pharmacies around the booths.',
        figures: ['wireframes', 'wireStills', 'v4Stills'],
      },
      {
        id: 'assistant',
        title: 'The assistant',
        text: 'The assistant is not allowed to diagnose, and the limit lives in the screen: a permanent scope banner, escalation to a doctor triggered by the content rather than a counter, a first name never sent to the model. “Health Assistant” replaces “Doctor Tessan”, whose title promised too much.',
        figures: ['assistantScreen', 'doctorStills'],
      },
      {
        id: 'design-system',
        title: 'The design system',
        text: 'One designer, Angular in production, React for everything new: what is shared is the tokens. In Figma, 11 color ramps, 13 type styles and nearly 1,300 component variants, named as in the React kit, its alter ego.',
        figures: ['dsVideos', 'dsVideosMobile', 'dsDemos', 'dsDemosMobile', 'dsPalette'],
      },
      {
        id: 'skills',
        title: 'Skills so that every generation respects the system',
        text: 'As the only designer facing three stacks, I wrote the design system rules in a form Claude Code reads at every session: tokens, components, motion doctrine, patient vocabulary. The pack holds four skills in the public repository and five in the internal June version, with a written precedence between the React kit and the Angular SDK. Teams generate interfaces that are already aligned, without one more dependency. No adoption metric was instrumented.',
        figures: ['skillsTree'],
      },
      {
        id: 'figma-code',
        title: 'Figma and code, both ways',
        text: 'The audit of the Smile system crossed the code with the Figma variables and named the mechanism of the drift. On the app side, five read-only sub-agents went through the screens on June 25: five bar heights, a back target of 24 px instead of 44 on 15 of 23 screens, a single cause, the lack of a Header component. It was built the same day, then deployed on 24 screens.',
        figures: ['auditComposants'],
      },
      {
        id: 'gestion-produit',
        title: 'Running and building with agents',
        text: 'A Notion page written for agents describes the databases, the statuses and the reading recipes. The agent answers “where does the mobile app stand?”, proposes a signed triage and never changes a priority without human validation; the stress test of 15 scenarios called for 7 fixes. On the delivery side, developers receive seven epics, 25 user stories, 40 screens and a CLAUDE.md template that carries the regulatory prohibitions, and they implement with Claude Code.',
        figures: ['pilotageAgent'],
      },
      {
        id: 'vision',
        title: 'Tessan OS, seven prototypes in a week',
        text: 'In April, a vision document cannot be discussed in a meeting, a phone you scroll can. Each prototype carries a hypothesis: trust in a permanent interlocutor, a readable health signal, continuity between booth and mobile, prevention through small missions. The April 24 review keeps them as a heading. After that, everything that reads like medical advice is removed: the score becomes the Wellbeing Score, WhatsApp is dropped, “Doctor” leaves the name.',
        figures: ['osPrototypes', 'osStills', 'osDesktop', 'osPont', 'osVisio', 'osMedaillon', 'osCross'],
      },
      {
        id: 'hub',
        title: 'The Health Hub, a single app',
        text: 'On June 9, “My health” sets the rules: stable navigation, an empty state that invites, time-bound programs with a named goal and a trend-based follow-up. On June 26, the executive committee keeps a single app and an order: prevention programs, the pharmacy ecosystem, then connected devices. The vision stays a heading, conditional on the certification of the modules involved, and is not in production.',
        figures: ['hubScreens'],
      },
      {
        id: 'limites',
        title: 'What remains open',
        text: 'No impact metric exists when I leave: the app was not published and the store submission, prepared, was suspended. I would set up measurement before the funnel redesign, and the governance of the management system before the tool.',
      },
    ],
    ui: { prototype: 'View the prototype' },
    captions: {
      wireStills: 'Interactive wireframes, screen by screen',
      v4Stills: 'Booking prototype in a pharmacy',
      doctorStills: 'The Doctor Tessan prototype, from the conversation to the waiting room',
      osStills: 'Tessan OS prototypes: score, prevention, WhatsApp, patient space',
      osDesktop: 'Tessan OS prototypes on booth, tablet and desktop',
      dsDemos: 'The design system live demos: catalog, tokens, components, Tessan Cloud and playground',
      dsDemosMobile: 'The design system demos on mobile',
      appScreens: 'The patient app screens',
      tunnelScreens: 'The consultation funnel, from the health card to the waiting room',
      wireframes: 'Interactive prototypes: funnel wireframes and booth booking prototype',
      assistantScreen: 'The Health Assistant, with its scope displayed',
      dsCatalogue: 'The React component kit catalog',
      dsVideos: 'The design system demos in use: catalog, tokens, components, Tessan Cloud and playground',
      dsVideosMobile: 'Tessan Cloud and the playground on mobile',
      dsInteractions: 'The kit in use: a dialog and a sheet',
      dsPalette: 'The design system’s eleven color ramps, in Figma',
      skillsTree: 'The skills pack: real tree of the public (April) and internal (June) repositories',
      auditComposants: 'Component audit of the patient app, June 25: five sub-agents, one root cause',
      pilotageAgent: 'Product management an agent can read, and its guardrails',
      osPrototypes: 'The Tessan OS prototypes in use',
      osPont: 'The Bridge: at the end of a booth consultation, the context moves to mobile',
      osVisio: 'First teleconsultation: from the vitals at the booth to the video call',
      osMedaillon: 'Tessan OS: fingerprint sign-in, with the patient badge',
      osCross: 'Tessan OS: a layer shared across mobile, tablet and desktop',
      hubScreens: 'The Health Hub: My Health and the weight program',
    },
  },
}
