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

/** Line and link names for the store badges. */
export interface StoreCopy {
  label: string
  apple: string
  google: string
}

export interface TessanSummary {
  context: string
  role: string
  roleItems: { title: string; detail?: string }[]
  deliverables: { title: string; detail?: string }[]
  metrics: { value: string; label: string }[]
}

export interface TessanHero {
  title: string
  intro: string
  role: string
  period: string
  team: string
  scope: string
}

/** One deep dive: its own opening and summary, and the sections it reuses. */
export interface TessanChapter {
  hero: TessanHero
  summary: TessanSummary
  sectionIds: string[]
}

export type TessanChapterKey = 'app' | 'os' | 'systeme'

export interface TessanTeaser {
  id: TessanChapterKey
  title: string
  text: string
  /** Key of the visual in FIGURES */
  figure: string
}

export interface TessanTranslation {
  chapters: Record<TessanChapterKey, TessanChapter>
  hub: { teasers: TessanTeaser[]; read: string }
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
  ui: { prototype: string; stores: StoreCopy }
  captions: Record<string, string>
}

export const TESSAN_TRANSLATIONS: Record<'en' | 'fr', TessanTranslation> = {
  fr: {
    hero: {
      title: 'Tessan : l’application, la vision et le système en trois mois',
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
        'Tessan équipe des pharmacies de cabines de téléconsultation. L’enjeu : la valeur vient du patient qui revient, et l’application existante n’y contribuait pas, avec une session fragmentée, une double navigation et un tunnel de 8 à 13 écrans. L’objectif : une première version centrée sur la consultation, publiée sur l’App Store et Google Play le 15 juillet.',
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
        { value: '30 jours', label: 'entre la décision de reconstruire (15 juin) et la sortie sur les stores (15 juillet)' },
        { value: '4,5 / 5', label: 'de note moyenne sur les 17 avis écrits de la nouvelle app, contre 3,6 sur les 5 de l’ancienne' },
        { value: '97 %', label: 'des patients échouaient sur l’écran de mutuelle, retiré du tunnel' },
      ],
    },
    chapters: {
      app: {
        hero: {
          title: 'Tessan : l’application patient reconstruite en 30 jours',
          intro: 'Le 15 juin, nous reconstruisons l’application en natif autour de la consultation. Un tunnel allégé, un assistant qui ne diagnostique pas, trois builds en deux semaines, puis la sortie sur l’App Store et Google Play le 15 juillet.',
          role: 'Lead design et product owner',
          period: 'Juin à juillet 2026',
          team: 'Un tech lead, deux développeurs, seul designer',
          scope: 'Application, tunnel, assistant',
        },
        summary: {
          context: 'L’application existante ne servait pas la consultation : session fragmentée, double navigation, tunnel de 8 à 13 écrans. L’objectif : une première version centrée sur la consultation, publiée sur l’App Store et Google Play le 15 juillet.',
          role: 'Lead design et product owner de l’application patient, avec un tech lead et deux développeurs.',
          roleItems: [
            { title: 'Périmètre', detail: 'ce qui entre et ce qui sort de la V0' },
            { title: 'Parcours', detail: 'accès, tunnel, documents, proches' },
            { title: 'Écrans', detail: '40 écrans, sept epics, 25 user stories' },
            { title: 'Builds', detail: '0.1, 0.2 et 0.3' },
          ],
          deliverables: [
            { title: 'Application patient', detail: 'iOS et Android' },
            { title: 'Tunnel de consultation', detail: 'audit de 25 écrans, parcours refondu' },
            { title: 'Assistant Santé', detail: 'quatre parcours, garde-fous' },
            { title: 'Prototypes interactifs', detail: 'wireframes et réservation' },
          ],
          metrics: [
            { value: '30 jours', label: 'entre la décision de reconstruire (15 juin) et la sortie sur les stores (15 juillet)' },
            { value: '4,5 / 5', label: 'de note moyenne sur les 17 avis écrits de la nouvelle app, contre 3,6 sur les 5 de l’ancienne' },
            { value: '97 %', label: 'des patients échouaient sur l’écran de mutuelle, retiré du tunnel' },
          ],
        },
        sectionIds: ['app', 'tunnel', 'paiement', 'protos-tunnel', 'notifications', 'assistant'],
      },
      os: {
        hero: {
          title: 'Tessan OS et le Hub Santé : la vision produit en prototypes',
          intro: 'En avril, sept prototypes rendent la vision discutable en une semaine. En juin, ils deviennent le Hub Santé : une seule application, la consultation qui finance, des programmes de prévention qui retiennent.',
          role: 'Design produit et vision',
          period: 'Avril à juin 2026',
          team: 'Designer produit, avec la direction produit',
          scope: 'Concepts, prototypes, Hub Santé',
        },
        summary: {
          context: 'Tessan installe des cabines de téléconsultation, et peu de patients reviennent. La vision devait relier la consultation et le suivi entre deux soins, sans promettre ce que le cadre réglementaire interdit.',
          role: 'Conception des cinq concepts et des sept prototypes, puis cadrage du Hub Santé présenté au comité de direction le 26 juin.',
          roleItems: [
            { title: 'Concepts', detail: 'un interlocuteur, un signal, un pont, des missions, une couche commune' },
            { title: 'Prototypes', detail: 'déployés sur un site de test public' },
            { title: 'Hub Santé', detail: 'programmes, pharmacie, objets connectés' },
          ],
          deliverables: [
            { title: 'Sept prototypes', detail: 'mobile, tablette, cabine et bureau' },
            { title: 'Hub Santé', detail: 'programme obésité et écrans Ma Santé' },
            { title: 'Deck de vision', detail: 'dix slides, décisions attendues' },
          ],
          metrics: [
            { value: '7 prototypes', label: 'en une semaine, déployés sur un site de test public' },
            { value: '1 application', label: 'décision du comité de direction du 26 juin' },
          ],
        },
        sectionIds: ['vision', 'hub'],
      },
      systeme: {
        hero: {
          title: 'Un design system et des agents pour une équipe d’un designer',
          intro: 'Un kit React aligné sur Figma, un pack de skills pour Claude Code et un index Notion qu’un agent sait lire : la gouvernance par l’outil plutôt que par le document.',
          role: 'Design system et product management',
          period: 'Avril à juillet 2026',
          team: 'Seul designer, avec la direction produit et technique',
          scope: 'Design system, skills, pilotage produit',
        },
        summary: {
          context: 'Angular en production, React pour le neuf, un seul designer : une règle écrite ne tient pas. Le système devait se lire par les outils que l’équipe utilise déjà, dont Claude Code.',
          role: 'Conception du design system dans Figma et en React, écriture des skills, refonte du modèle de pilotage produit et de son index pour agents.',
          roleItems: [
            { title: 'Design system', detail: 'tokens, composants, démos' },
            { title: 'Skills', detail: 'règles lues par Claude Code' },
            { title: 'Figma et code', detail: 'audit et alignement' },
            { title: 'Pilotage produit', detail: 'chaîne unique, index pour agents' },
          ],
          deliverables: [
            { title: 'Kit de composants React', detail: '89 fichiers, tokens Tailwind v4' },
            { title: 'Design system Figma', detail: '13 styles de texte, près de 1 300 variantes' },
            { title: 'Pack de skills', detail: '4 publiques, 5 internes' },
            { title: 'Index Notion pour agents', detail: 'garde-fous écrits' },
          ],
          metrics: [
            { value: '89', label: 'fichiers de composants dans le kit React' },
            { value: '13 styles', label: 'typographiques, du display 64 px à la légende 11 px' },
            { value: '15 scénarios', label: 'au crash-test du pilotage produit' },
          ],
        },
        sectionIds: ['design-system', 'skills', 'figma-code', 'gestion-produit'],
      },
    },
    hub: {
      read: 'Lire l’étude de cas',
      teasers: [
        { id: 'app', title: 'L’application patient', text: 'Reconstruite en natif en 30 jours autour de la consultation : un tunnel allégé, un assistant qui ne diagnostique pas, trois builds en deux semaines.', figure: 'hubApp' },
        { id: 'os', title: 'Tessan OS et le Hub Santé', text: 'Sept prototypes en une semaine pour rendre la vision discutable, puis une seule application : la consultation qui finance, des programmes de prévention qui retiennent.', figure: 'hubOs' },
        { id: 'systeme', title: 'Design system et agents', text: 'Un kit React aligné sur Figma, un pack de skills pour Claude Code et un index Notion qu’un agent sait lire : la gouvernance par l’outil plutôt que par le document.', figure: 'hubSysteme' },
      ],
    },
    sections: [
      {
        id: 'app',
        title: 'L’application',
        text: 'Le 15 juin, deux décisions cadrent la reconstruction. Nous passons au natif, car réaménager l’ancienne coquille aurait conservé la double session : seul le moteur de téléconsultation reste encapsulé. Nous retirons aussi ce qui séduisait le plus. La santé connectée, le score et l’abonnement exposaient le produit à une requalification en dispositif médical, soit 18 à 36 mois de certification face à 30 jours. La mise à jour du 14 octobre réintroduit une partie de ce qui avait été écarté : dans Ma santé, le patient note ses mesures, enregistrées dans Apple Santé avec son accord, et l’écran d’attente est repensé pour lire sa position d’un coup d’œil.',
        figures: ['appScreens', 'storeVisuals'],
      },
      {
        id: 'tunnel',
        title: 'Le tunnel de consultation',
        text: 'Huit à treize écrans selon un routeur invisible, dont un écran de mutuelle sur lequel 97 % des patients échouaient. La mutuelle sort du tunnel au profit d’une avance de frais, l’arrêt de travail devient une option du motif, et la salle d’attente montre une position plutôt qu’un minuteur qui mentirait. Les écrans ci-dessous suivent deux parcours : pour soi, et pour un proche.',
        figures: ['journeyTunnel'],
      },
      {
        id: 'paiement',
        title: 'Payer, et comprendre sa prise en charge',
        text: 'Le patient voit ce qu’il paie avant de payer. La carte bancaire se scanne avec la caméra au lieu de se saisir, la carte Vitale aussi, et l’analyse reste sur l’appareil. Selon les droits, la prise en charge va de 100 % à 0 % : chaque cas dit en une phrase ce qui reste à régler et propose l’action qui peut le changer.',
        figures: ['journeyScan'],
      },
      {
        id: 'protos-tunnel',
        title: 'Des prototypes pour trancher l’ordre des écrans',
        text: 'Des wireframes interactifs en noir et blanc, revus avec la direction produit, ont fixé l’ordre des écrans avant les maquettes. Un prototype de réservation a ensuite simulé la prise de créneau en pharmacie, de la carte des cabines à l’accès confirmé, avec les vraies officines autour des cabines.',
        figures: ['journeyProtos'],
      },
      {
        id: 'notifications',
        title: 'Les notifications de la salle d’attente',
        text: 'Une fois la consultation lancée, le patient peut quitter l’application : la salle d’attente continue sur l’écran verrouillé, dans la Dynamic Island sur iOS, dans une notification développée ou une puce Live Updates sur Android. Huit états, de la place dans la file à la reprise après une interruption, avec une règle : un état à la fois, et jamais une attente promise.',
        figures: ['notifications'],
      },
      {
        id: 'assistant',
        title: 'L’assistant',
        text: 'L’assistant n’a pas le droit de diagnostiquer, et la limite est dans l’écran : un bandeau de périmètre permanent, une escalade vers un médecin déclenchée par le contenu et non par un compteur, un prénom jamais transmis au modèle. « Assistant Santé » remplace « Docteur Tessan », dont le titre promettait trop.',
        figures: ['journeyAssistant'],
      },
      {
        id: 'design-system',
        title: 'Le design system',
        text: 'Un seul designer, Angular en production, React pour le neuf : le partage porte sur les tokens. Dans Figma, 13 styles typographiques et près de 1 300 variantes de composants, nommés comme dans le kit React, son alter ego.',
        figures: ['dsVideos', 'dsPalette'],
      },
      {
        id: 'skills',
        title: 'Des skills pour que chaque génération respecte le système',
        text: 'Seul designer face à trois stacks, j’ai écrit les règles du design system sous une forme que Claude Code lit à chaque session : tokens, composants, doctrine de mouvement, vocabulaire patient. Le pack compte quatre skills dans le dépôt public et cinq dans la version interne de juin, avec une préséance écrite entre le kit React et le SDK Angular. Les équipes génèrent ainsi des interfaces déjà alignées, sans dépendance de plus. Aucune mesure d’adoption n’a été instrumentée.',
        figures: ['skillsPack', 'skillsDiptych', 'skillsReact', 'skillsMotion'],
      },
      {
        id: 'figma-code',
        title: 'Figma et code, dans les deux sens',
        text: 'L’audit du système Smile a croisé le code et les variables Figma, et il a nommé le mécanisme de la dérive. Côté app, cinq sous-agents ont parcouru les écrans en lecture seule le 25 juin : cinq hauteurs de barre, une cible de retour à 24 px au lieu de 44 sur 15 écrans sur 23, une seule cause, l’absence d’un composant Header. Il a été construit le jour même, puis déployé sur 24 écrans.',
        figures: ['figmaCodePalette', 'figmaCodeBoutons', 'auditComposants'],
      },
      {
        id: 'gestion-produit',
        title: 'Piloter et produire avec des agents',
        text: 'Une page Notion écrite pour les agents décrit les bases, les statuts et les recettes de lecture. L’agent répond à « où en est l’application mobile ? », propose un tri signé et ne change jamais une priorité sans validation humaine ; le crash-test de 15 scénarios en a fait ressortir 7 correctifs. Côté livraison, les développeurs reçoivent sept epics, 25 user stories, 40 écrans et un gabarit de CLAUDE.md qui porte les interdits réglementaires, et ils implémentent avec Claude Code.',
        figures: ['pilotageAgent', 'deliveryFigma'],
      },
      {
        id: 'vision',
        title: 'Tessan OS, sept prototypes en une semaine',
        text: 'En avril, un document de vision ne se discute pas en réunion, un téléphone qu’on fait défiler si. Chaque prototype porte une hypothèse : la confiance dans un interlocuteur permanent, un signal de santé lisible, la continuité entre la cabine et le mobile, la prévention par de petites missions. La revue du 24 avril les retient comme cap. Les sept sont déployés sur un site de test public, avec une fiche de briefing par prototype : audience, contexte, user story, objectif de test. Les voici, de 01 à 07, chacun avec ses écrans et un lien pour l’essayer en ligne. Ensuite, tout ce qui ressemble à un avis médical est retiré : le score devient Score Bien-Être, WhatsApp est écarté, « Docteur » disparaît du nom.',
        figures: ['journeyOs'],
      },
      {
        id: 'hub',
        title: 'Le Hub Santé, une seule application',
        text: 'La vision tient en quatre principes : rester présents entre deux rendez-vous, la consultation finance et la prévention retient, l’Assistant Santé comme fil conducteur, et un réseau de plus de 1 600 pharmacies comme avantage. Le 9 juin, « Ma santé » pose les règles : une navigation stable, un état vide qui invite, des programmes bornés dans le temps, avec un objectif nommé et un suivi en tendance. Le 26 juin, le comité de direction retient une seule application et un ordre : programmes de prévention, écosystème pharmacie, puis objets connectés. La trajectoire suit quatre versions : la V0 fiabilise la consultation (15 juillet), la V1 retient et amorce (notifications, suivi après consultation, rendez-vous, premiers programmes), la V2 ouvre la prévention (Ma santé vivant, données connectées, outils d’analyse), la V3 porte le Hub Santé à l’échelle (programmes multiples, assistant enrichi, écosystème pharmacie). La vision reste un cap, et une première partie est en production depuis la mise à jour du 14 octobre : la saisie de mesures dans Ma santé.',
        figures: ['hubScreens', 'hubHorizon'],
      },
      {
        id: 'limites',
        title: 'Ce qui reste ouvert',
        text: 'L’application est sortie sur l’App Store et Google Play le 15 juillet, et aucune métrique d’impact n’existait à mon départ. Les avis des stores donnent une première mesure en octobre : la note moyenne des avis écrits passe de 3,6 sur 5 (5 avis, ancienne app) à 4,5 sur 5 (17 avis, nouvelle app), et les notes publiques atteignent 4,7 sur Google Play (105 notes) et 4,8 sur l’App Store (151 notes). L’échantillon est trop petit pour attribuer l’écart à la refonte, d’autant que la mise à jour du 14 octobre a modifié l’application depuis, et aucune complétion par étape n’était suivie. Je poserais la mesure avant la refonte du tunnel, et la gouvernance du pilotage avant l’outil.',
      },
    ],
    ui: {
      prototype: 'Essayer le prototype',
      stores: { label: 'Disponible depuis le 15 juillet 2026', apple: 'Télécharger l’application Tessan sur l’App Store', google: 'Disponible sur Google Play : application Tessan' },
    },
    captions: {
      appScreens: 'Les écrans de l’application patient',
      storeVisuals: 'Les visuels conçus pour la fiche Google Play',
      notifications: 'Les notifications de la salle d’attente, sur iOS et sur Android',
      dsVideos: 'Les démos du design system en usage : catalogue, tokens, dialog et composants mobile et cabine',
      dsPalette: 'Les rampes de couleur du design system, dans Figma',
      hubApp: 'L’application patient : Démarrer, Accueil, et la fin de la consultation',
      hubOs: 'Tessan OS sur mobile, tablette et bureau',
      hubSysteme: 'Tessan-UI, le catalogue de composants',
      skillsPack: 'Le pack de skills : les cinq skills de la version interne',
      skillsReact: 'La skill du kit React, et le catalogue rendu',
      skillsMotion: 'La skill de mouvement, et une boîte de dialogue du kit',
      figmaCodePalette: 'La palette dans Figma et les tokens dans le code',
      figmaCodeBoutons: 'Les boutons dans Figma et le composant du kit React',
      deliveryFigma: 'La page de livraison Figma : les 40 écrans rangés par parcours et par epic, avec le lien de chaque user story. Les développeurs et leur agent de code la lisent pour implémenter.',
      skillsDiptych: 'Une règle du pack de skills, et le kit rendu à partir de ces tokens',
      hubHorizon: 'Le Hub Santé à l’horizon : l’assistant et ses agents experts, Ma Santé version après version',
      auditComposants: 'Audit des composants de l’app patient, 25 juin : cinq sous-agents, une cause racine',
      pilotageAgent: 'Le pilotage produit lisible par un agent, et ses garde-fous',
      hubScreens: 'Le Hub Santé : Ma Santé et le programme obésité',
    },
  },
  en: {
    hero: {
      title: 'Tessan: the app, the vision and the system in three months',
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
        'Tessan equips pharmacies with telemedicine booths. The stake: value comes from the patient who returns, and the existing app did not contribute, with a fragmented session, double navigation and a funnel of 8 to 13 screens. The goal: a first version centered on the consultation, released on the App Store and Google Play on July 15.',
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
        { value: '30 days', label: 'between the decision to rebuild (June 15) and the store release (July 15)' },
        { value: '4.5 / 5', label: 'average rating across the 17 written reviews of the new app, against 3.6 for the 5 of the old one' },
        { value: '97%', label: 'of patients failed on the health insurance screen, removed from the funnel' },
      ],
    },
    chapters: {
      app: {
        hero: {
          title: 'Tessan: the patient app rebuilt in 30 days',
          intro: 'On June 15, we rebuild the app in native around the consultation. A lighter funnel, an assistant that does not diagnose, three builds in two weeks, then the release on the App Store and Google Play on July 15.',
          role: 'Design lead and product owner',
          period: 'June to July 2026',
          team: 'A tech lead, two developers, sole designer',
          scope: 'App, funnel, assistant',
        },
        summary: {
          context: 'The existing app did not serve the consultation: fragmented session, double navigation, a funnel of 8 to 13 screens. The goal: a first version centered on the consultation, released on the App Store and Google Play on July 15.',
          role: 'Design lead and product owner of the patient app, with a tech lead and two developers.',
          roleItems: [
            { title: 'Scope', detail: 'what goes into and out of V0' },
            { title: 'Journeys', detail: 'access, funnel, documents, relatives' },
            { title: 'Screens', detail: '40 screens, seven epics, 25 user stories' },
            { title: 'Builds', detail: '0.1, 0.2 and 0.3' },
          ],
          deliverables: [
            { title: 'Patient app', detail: 'iOS and Android' },
            { title: 'Consultation funnel', detail: 'audit of 25 screens, reworked journey' },
            { title: 'Health Assistant', detail: 'four journeys, guardrails' },
            { title: 'Interactive prototypes', detail: 'wireframes and booking' },
          ],
          metrics: [
            { value: '30 days', label: 'between the decision to rebuild (June 15) and the store release (July 15)' },
            { value: '4.5 / 5', label: 'average rating across the 17 written reviews of the new app, against 3.6 for the 5 of the old one' },
            { value: '97%', label: 'of patients failed on the health insurance screen, removed from the funnel' },
          ],
        },
        sectionIds: ['app', 'tunnel', 'paiement', 'protos-tunnel', 'notifications', 'assistant'],
      },
      os: {
        hero: {
          title: 'Tessan OS and the Health Hub: the product vision in prototypes',
          intro: 'In April, seven prototypes make the vision discussable in a week. In June they become the Health Hub: a single app, the consultation that funds, prevention programs that retain.',
          role: 'Product design and vision',
          period: 'April to June 2026',
          team: 'Product designer, with product leadership',
          scope: 'Concepts, prototypes, Health Hub',
        },
        summary: {
          context: 'Tessan installs telemedicine booths, and few patients return. The vision had to link the consultation and the follow-up between two visits, without promising what the regulatory framework forbids.',
          role: 'Design of the five concepts and the seven prototypes, then framing of the Health Hub presented to the executive committee on June 26.',
          roleItems: [
            { title: 'Concepts', detail: 'an interlocutor, a signal, a bridge, missions, a shared layer' },
            { title: 'Prototypes', detail: 'deployed on a public test site' },
            { title: 'Health Hub', detail: 'programs, pharmacy, connected devices' },
          ],
          deliverables: [
            { title: 'Seven prototypes', detail: 'mobile, tablet, booth and desktop' },
            { title: 'Health Hub', detail: 'weight program and My Health screens' },
            { title: 'Vision deck', detail: 'ten slides, decisions expected' },
          ],
          metrics: [
            { value: '7 prototypes', label: 'in a week, deployed on a public test site' },
            { value: '1 app', label: 'decision of the executive committee on June 26' },
          ],
        },
        sectionIds: ['vision', 'hub'],
      },
      systeme: {
        hero: {
          title: 'A design system and agents for a one-designer team',
          intro: 'A React kit aligned with Figma, a skills pack for Claude Code and a Notion index an agent can read: governance through the tool rather than the document.',
          role: 'Design system and product management',
          period: 'April to July 2026',
          team: 'Sole designer, with product and technical leadership',
          scope: 'Design system, skills, product management',
        },
        summary: {
          context: 'Angular in production, React for everything new, one designer: a written rule does not hold. The system had to be read by the tools the team already uses, Claude Code included.',
          role: 'Design of the design system in Figma and React, writing of the skills, overhaul of the product management model and its index for agents.',
          roleItems: [
            { title: 'Design system', detail: 'tokens, components, demos' },
            { title: 'Skills', detail: 'rules read by Claude Code' },
            { title: 'Figma and code', detail: 'audit and alignment' },
            { title: 'Product management', detail: 'single chain, index for agents' },
          ],
          deliverables: [
            { title: 'React component kit', detail: '89 files, Tailwind v4 tokens' },
            { title: 'Figma design system', detail: '13 text styles, nearly 1,300 variants' },
            { title: 'Skills pack', detail: '4 public, 5 internal' },
            { title: 'Notion index for agents', detail: 'written guardrails' },
          ],
          metrics: [
            { value: '89', label: 'component files in the React kit' },
            { value: '13 styles', label: 'of type, from the 64 px display to the 11 px caption' },
            { value: '15 scenarios', label: 'in the product management stress test' },
          ],
        },
        sectionIds: ['design-system', 'skills', 'figma-code', 'gestion-produit'],
      },
    },
    hub: {
      read: 'Read the case study',
      teasers: [
        { id: 'app', title: 'The patient app', text: 'Rebuilt in native in 30 days around the consultation: a lighter funnel, an assistant that does not diagnose, three builds in two weeks.', figure: 'hubApp' },
        { id: 'os', title: 'Tessan OS and the Health Hub', text: 'Seven prototypes in a week to make the vision discussable, then a single app: the consultation that funds, prevention programs that retain.', figure: 'hubOs' },
        { id: 'systeme', title: 'Design system and agents', text: 'A React kit aligned with Figma, a skills pack for Claude Code and a Notion index an agent can read: governance through the tool rather than the document.', figure: 'hubSysteme' },
      ],
    },
    sections: [
      {
        id: 'app',
        title: 'The app',
        text: 'On June 15, two decisions frame the rebuild. We go native, because reworking the old shell would have kept the double session: only the teleconsultation engine stays encapsulated. We also remove what was most attractive. Connected health, the score and the subscription exposed the product to a medical device requalification, 18 to 36 months of certification against 30 days. The October 14 update brings back part of what had been set aside: in My health, patients record their measurements, saved in Apple Health with their consent, and the waiting screen is redesigned so the position reads at a glance.',
        figures: ['appScreens', 'storeVisuals'],
      },
      {
        id: 'tunnel',
        title: 'The consultation funnel',
        text: 'Eight to thirteen screens depending on an invisible router, including a health insurance screen on which 97% of patients failed. The insurance entry leaves the funnel for an advance payment, sick leave becomes an option of the reason for the visit, and the waiting room shows a position rather than a timer that would lie. The screens below follow two journeys: for oneself, and for a relative.',
        figures: ['journeyTunnel'],
      },
      {
        id: 'paiement',
        title: 'Paying, and understanding the coverage',
        text: 'The patient sees what they pay before paying. The bank card is scanned with the camera instead of typed, and so is the health card, with the analysis staying on the device. Depending on their rights, coverage ranges from 100% to 0%: each case says in one sentence what is left to pay and offers the action that can change it.',
        figures: ['journeyScan'],
      },
      {
        id: 'protos-tunnel',
        title: 'Prototypes to settle the order of the screens',
        text: 'Interactive black-and-white wireframes, reviewed with product leadership, fixed the order of the screens before the mockups. A booking prototype then simulated slot booking in a pharmacy, from the booth map to the confirmed access, with the real pharmacies around the booths.',
        figures: ['journeyProtos'],
      },
      {
        id: 'notifications',
        title: 'Waiting room notifications',
        text: 'Once the consultation is started, the patient can leave the app: the waiting room carries on on the lock screen, in the Dynamic Island on iOS, in an expanded notification or a Live Updates chip on Android. Eight states, from the place in the queue to the resume after an interruption, with one rule: one state at a time, and never a promised wait.',
        figures: ['notifications'],
      },
      {
        id: 'assistant',
        title: 'The assistant',
        text: 'The assistant is not allowed to diagnose, and the limit lives in the screen: a permanent scope banner, escalation to a doctor triggered by the content rather than a counter, a first name never sent to the model. “Health Assistant” replaces “Doctor Tessan”, whose title promised too much.',
        figures: ['journeyAssistant'],
      },
      {
        id: 'design-system',
        title: 'The design system',
        text: 'One designer, Angular in production, React for everything new: what is shared is the tokens. In Figma, 13 type styles and nearly 1,300 component variants, named as in the React kit, its alter ego.',
        figures: ['dsVideos', 'dsPalette'],
      },
      {
        id: 'skills',
        title: 'Skills so that every generation respects the system',
        text: 'As the only designer facing three stacks, I wrote the design system rules in a form Claude Code reads at every session: tokens, components, motion doctrine, patient vocabulary. The pack holds four skills in the public repository and five in the internal June version, with a written precedence between the React kit and the Angular SDK. Teams generate interfaces that are already aligned, without one more dependency. No adoption metric was instrumented.',
        figures: ['skillsPack', 'skillsDiptych', 'skillsReact', 'skillsMotion'],
      },
      {
        id: 'figma-code',
        title: 'Figma and code, both ways',
        text: 'The audit of the Smile system crossed the code with the Figma variables and named the mechanism of the drift. On the app side, five read-only sub-agents went through the screens on June 25: five bar heights, a back target of 24 px instead of 44 on 15 of 23 screens, a single cause, the lack of a Header component. It was built the same day, then deployed on 24 screens.',
        figures: ['figmaCodePalette', 'figmaCodeBoutons', 'auditComposants'],
      },
      {
        id: 'gestion-produit',
        title: 'Running and building with agents',
        text: 'A Notion page written for agents describes the databases, the statuses and the reading recipes. The agent answers “where does the mobile app stand?”, proposes a signed triage and never changes a priority without human validation; the stress test of 15 scenarios called for 7 fixes. On the delivery side, developers receive seven epics, 25 user stories, 40 screens and a CLAUDE.md template that carries the regulatory prohibitions, and they implement with Claude Code.',
        figures: ['pilotageAgent', 'deliveryFigma'],
      },
      {
        id: 'vision',
        title: 'Tessan OS, seven prototypes in a week',
        text: 'In April, a vision document cannot be discussed in a meeting, a phone you scroll can. Each prototype carries a hypothesis: trust in a permanent interlocutor, a readable health signal, continuity between booth and mobile, prevention through small missions. The April 24 review keeps them as a heading. The seven are deployed on a public test site, with a briefing sheet per prototype: audience, context, user story, test goal. Here they are, 01 to 07, each with its screens and a link to try it online. After that, everything that reads like medical advice is removed: the score becomes the Wellbeing Score, WhatsApp is dropped, “Doctor” leaves the name.',
        figures: ['journeyOs'],
      },
      {
        id: 'hub',
        title: 'The Health Hub, a single app',
        text: 'The vision rests on four principles: staying present between two appointments, the consultation pays and prevention retains, the Health Assistant as the common thread, and a network of over 1,600 pharmacies as the advantage. On June 9, “My health” sets the rules: stable navigation, an empty state that invites, time-bound programs with a named goal and a trend-based follow-up. On June 26, the executive committee keeps a single app and an order: prevention programs, the pharmacy ecosystem, then connected devices. The trajectory runs through four versions: V0 makes the consultation reliable (July 15), V1 retains and primes (notifications, post-consultation follow-up, appointments, first programs), V2 opens prevention (a living My health, connected data, analysis tools), V3 takes the Health Hub to scale (multiple programs, richer assistant, pharmacy ecosystem). The vision stays a heading, and a first part is in production since the October 14 update: recording measurements in My health.',
        figures: ['hubScreens', 'hubHorizon'],
      },
      {
        id: 'limites',
        title: 'What remains open',
        text: 'The app went live on the App Store and Google Play on July 15, and no impact metric existed when I left. The store reviews give a first measure in October: the average rating of written reviews goes from 3.6 out of 5 (5 reviews, old app) to 4.5 out of 5 (17 reviews, new app), and the public ratings reach 4.7 on Google Play (105 ratings) and 4.8 on the App Store (151 ratings). The sample is too small to credit the difference to the rebuild, all the more as the October 14 update has changed the app since, and step-by-step completion was not tracked. I would set up measurement before the funnel redesign, and the governance of the management system before the tool.',
      },
    ],
    ui: {
      prototype: 'Try the prototype',
      stores: { label: 'Available since July 15, 2026', apple: 'Download the Tessan app on the App Store', google: 'Get the Tessan app on Google Play' },
    },
    captions: {
      appScreens: 'The patient app screens',
      storeVisuals: 'The visuals designed for the Google Play listing',
      notifications: 'The waiting room notifications, on iOS and on Android',
      dsVideos: 'The design system demos in use: catalog, tokens, dialog and mobile and booth components',
      dsPalette: 'The design system’s color ramps, in Figma',
      hubApp: 'The patient app: Get started, Home, and the end of the consultation',
      hubOs: 'Tessan OS on mobile, tablet and desktop',
      hubSysteme: 'Tessan-UI, the component catalog',
      skillsPack: 'The skills pack: the five skills of the internal version',
      skillsReact: 'The React kit skill, and the rendered catalog',
      skillsMotion: 'The motion skill, and a dialog of the kit',
      figmaCodePalette: 'The palette in Figma and the tokens in code',
      figmaCodeBoutons: 'The buttons in Figma and the component in the React kit',
      deliveryFigma: 'The Figma delivery page: the 40 screens organized by journey and epic, with the link of each user story. Developers and their coding agent read it to implement.',
      skillsDiptych: 'A rule from the skills pack, and the kit rendered from those tokens',
      hubHorizon: 'The Health Hub on the horizon: the assistant and its expert agents, My Health version after version',
      auditComposants: 'Component audit of the patient app, June 25: five sub-agents, one root cause',
      pilotageAgent: 'Product management an agent can read, and its guardrails',
      hubScreens: 'The Health Hub: My Health and the weight program',
    },
  },
}
