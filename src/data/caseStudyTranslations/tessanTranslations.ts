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
        text: 'Huit à treize écrans selon un routeur invisible, et 3 % de saisies de mutuelle réussies. La mutuelle sort du tunnel au profit d’une avance de frais, l’arrêt de travail devient une option du motif, et la salle d’attente montre une position plutôt qu’un minuteur qui mentirait. Des wireframes interactifs en noir et blanc, revus avec la direction produit, ont fixé l’ordre des écrans avant les maquettes.',
        figures: ['tunnelScreens', 'wireframes'],
      },
      {
        id: 'assistant',
        title: 'L’assistant',
        text: 'L’assistant n’a pas le droit de diagnostiquer, et la limite est dans l’écran : un bandeau de périmètre permanent, une escalade vers un médecin déclenchée par le contenu et non par un compteur, un prénom jamais transmis au modèle. « Assistant Santé » remplace « Docteur Tessan », dont le titre promettait trop.',
        figures: ['assistantScreen'],
      },
      {
        id: 'design-system',
        title: 'Le design system',
        text: 'Un seul designer, Angular en production, React pour le neuf : le partage porte sur les tokens. Dans Figma, 11 rampes de couleur, 13 styles typographiques et près de 1 300 variantes de composants, nommés comme dans le kit React. Un pack de skills pour Claude Code l’encode, et chaque équipe produit du code déjà aligné.',
        figures: ['dsCatalogue', 'dsInteractions', 'dsPalette'],
      },
      {
        id: 'gestion-produit',
        title: 'Le pilotage produit',
        text: 'Une chaîne unique, Tâche, Livrable, Produit, Release, et un index que Claude sait lire : il répond à « où en est l’application mobile ? » depuis Notion, propose un tri en le signant et ne change jamais une priorité. Un crash-test de 15 scénarios simulés en fait passer 4, bloque 11 et appelle 7 correctifs.',
        figures: ['pmSchema'],
      },
      {
        id: 'vision',
        title: 'Tessan OS, sept prototypes en une semaine',
        text: 'En avril, un document de vision ne se discute pas en réunion, un téléphone qu’on fait défiler si. Chaque prototype porte une hypothèse : la confiance dans un interlocuteur permanent, un signal de santé lisible, la continuité entre la cabine et le mobile, la prévention par de petites missions. La revue du 24 avril les retient comme cap. Ensuite, tout ce qui ressemble à un avis médical est retiré : le score devient Score Bien-Être, WhatsApp est écarté, « Docteur » disparaît du nom.',
        figures: ['osPrototypes', 'osPont', 'osCross'],
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
      appScreens: 'Les écrans de l’application patient',
      tunnelScreens: 'Le tunnel de consultation, de la carte vitale à la salle d’attente',
      wireframes: 'Wireframes interactifs du tunnel',
      assistantScreen: 'L’Assistant Santé, avec son périmètre affiché',
      dsCatalogue: 'Le catalogue du kit de composants React',
      dsInteractions: 'Le kit en usage : une boîte de dialogue et une feuille',
      dsPalette: 'Les onze rampes de couleur du design system, dans Figma',
      pmSchema: 'La chaîne Tâche, Livrable, Release, Produit, et ce que Claude lit, écrit ou laisse à l’humain',
      osPrototypes: 'Prototypes d’avril, avant le cadrage réglementaire',
      osPont: 'Le Pont (prototype d’avril) : en fin de consultation en cabine, le contexte passe au mobile',
      osCross: 'Tessan OS (prototype d’avril) : une couche commune au mobile, à la tablette et au bureau',
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
        text: 'Eight to thirteen screens depending on an invisible router, and 3% of health insurance entries completed. The insurance entry leaves the funnel for an advance payment, sick leave becomes an option of the reason for the visit, and the waiting room shows a position rather than a timer that would lie. Interactive black-and-white wireframes, reviewed with product leadership, fixed the order of the screens before the mockups.',
        figures: ['tunnelScreens', 'wireframes'],
      },
      {
        id: 'assistant',
        title: 'The assistant',
        text: 'The assistant is not allowed to diagnose, and the limit lives in the screen: a permanent scope banner, escalation to a doctor triggered by the content rather than a counter, a first name never sent to the model. “Health Assistant” replaces “Doctor Tessan”, whose title promised too much.',
        figures: ['assistantScreen'],
      },
      {
        id: 'design-system',
        title: 'The design system',
        text: 'One designer, Angular in production, React for everything new: what is shared is the tokens. In Figma, 11 color ramps, 13 type styles and nearly 1,300 component variants, named as in the React kit. A skills pack for Claude Code encodes it, and each team produces code that is already aligned.',
        figures: ['dsCatalogue', 'dsInteractions', 'dsPalette'],
      },
      {
        id: 'gestion-produit',
        title: 'Product management',
        text: 'A single chain, Task, Deliverable, Product, Release, and an index Claude can read: it answers “where does the mobile app stand?” from Notion, proposes a triage by signing it and never changes a priority. A stress test of 15 simulated scenarios passes 4, blocks 11 and calls for 7 fixes.',
        figures: ['pmSchema'],
      },
      {
        id: 'vision',
        title: 'Tessan OS, seven prototypes in a week',
        text: 'In April, a vision document cannot be discussed in a meeting, a phone you scroll can. Each prototype carries a hypothesis: trust in a permanent interlocutor, a readable health signal, continuity between booth and mobile, prevention through small missions. The April 24 review keeps them as a heading. After that, everything that reads like medical advice is removed: the score becomes the Wellbeing Score, WhatsApp is dropped, “Doctor” leaves the name.',
        figures: ['osPrototypes', 'osPont', 'osCross'],
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
      appScreens: 'The patient app screens',
      tunnelScreens: 'The consultation funnel, from the health card to the waiting room',
      wireframes: 'Interactive funnel wireframes',
      assistantScreen: 'The Health Assistant, with its scope displayed',
      dsCatalogue: 'The React component kit catalog',
      dsInteractions: 'The kit in use: a dialog and a sheet',
      dsPalette: 'The design system’s eleven color ramps, in Figma',
      pmSchema: 'The chain Task, Deliverable, Release, Product, and what Claude reads, writes or leaves to humans',
      osPrototypes: 'April prototypes, before the regulatory framing',
      osPont: 'The Bridge (April prototype): at the end of a booth consultation, the context moves to mobile',
      osCross: 'Tessan OS (April prototype): a layer shared across mobile, tablet and desktop',
      hubScreens: 'The Health Hub: My Health and the weight program',
    },
  },
}
