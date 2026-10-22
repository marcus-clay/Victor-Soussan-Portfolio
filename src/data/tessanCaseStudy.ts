// Texte du case study Tessan (projet court `telemedicine-patient-app`).
// Syntaxe du corps : paragraphes séparés par une ligne vide, `## ` pour un titre de section,
// `![légende](chemin)` seul sur sa ligne pour une figure (ouverte dans la lightbox).
// Sources : archive de la mission, avril à juillet 2026. Les collègues sont désignés par leur rôle.
// Les chiffres internes sont donnés en ordre de grandeur.

export const TESSAN_BODY = {
  fr: `![Le parcours de consultation de la première version : accueil, motif, salle d’attente, consultation terminée](/images/tessan/tessan-parcours-consultation.webp)

## Moins d’un patient sur quatre revient

Tessan équipe des pharmacies de cabines de téléconsultation : le patient est en officine, le médecin à distance, et il pilote en temps réel des dispositifs médicaux connectés présents sur place. L’acte est remboursé, et le modèle économique dépend du nombre de consultations réellement lancées. Un patient qui entre dans le tunnel et n’en sort pas a déjà coûté son acquisition. Or moins d’un patient sur quatre revient pour une deuxième consultation, ce qui laisse des centaines de milliers de patients qui ne reviennent pas après une première visite.

Je suis arrivé début avril dans une entreprise sans fonction design : aucun designer avant moi, une bibliothèque de composants Angular dont les écarts avec Figma s’étaient accumulés, un pilotage produit éclaté entre plusieurs outils, une équipe produit en réduction. Deux priorités structurent le trimestre, le volume de consultations et l’application mobile. Le 15 juin, un arbitrage avec le directeur produit et technique fixe le périmètre de la première version, avec une soumission aux stores visée au 15 juillet.

## Quatre constats qui rendaient la réparation inutile

Une revue de l’application existante, le 11 juin pour iOS puis le 17 juin pour le tunnel, relève quatre problèmes qu’aucun correctif ne règle. La session est fragmentée : on peut être connecté à l’application et déconnecté de la consultation, parce que la vue web embarquée relance son propre parcours d’authentification. La navigation est double : le patient traverse deux grammaires d’interface dans un même geste. L’accueil se réorganise selon les objets connectés actifs, donc un patient qui revient ne retrouve pas ce qu’il a quitté. Enfin le tunnel compte de 8 à 13 écrans selon un routeur invisible, dont un écran de saisie de mutuelle que 3 % des patients réussissaient à remplir.

L’architecture suivait les fonctionnalités empilées plutôt que le parcours. Déshabiller la coquille existante aurait conservé la vue web embarquée, donc la double session, et les deux options imposaient de toute façon de passer la téléconsultation en natif et d’unifier l’authentification. Le 15 juin, nous choisissons de reconstruire en réutilisant les briques natives de la consultation. Seul le moteur de téléconsultation reste encapsulé.

## Retirer ce qui séduisait le plus

Du 9 au 11 juin, j’avais conçu « Ma santé » : une navigation stable, un accueil qui ne change pas de nature, des états vides qui invitent, quatre briques d’analyse. Le 15 juin, la première version recentre l’application sur la consultation en ligne. Sortent du périmètre la santé connectée, le score, l’abonnement et l’assistant premium. Raison économique : la consultation est remboursée et monétisée au volume, alors que la santé connectée se vendait quelques euros par mois sur un marché qui n’est pas celui de Tessan. Raison réglementaire : ces briques exposaient le produit à une requalification en dispositif médical, avec une certification de 18 à 36 mois face à une échéance de 30 jours.

La conception de « Ma santé » n’est pas perdue : ses règles reviennent comme horizon de la deuxième version, conditionnée à une certification. Le bien-être comme application autonome reste un arbitrage séparé de la direction.

## Supprimer l’écran qui échoue

La saisie de mutuelle réussissait dans 3 % des cas et restait désactivée techniquement. Un écran qui échoue presque toujours ne collecte pas une donnée, il fabrique des abandons. Il sort du tunnel au profit d’une avance de frais et d’une explication du remboursement. L’écran « Prise en charge » est ensuite reconstruit en euros plutôt qu’en pourcentages, parce que le patient paie un montant au terminal, avec un modèle de calcul explicite et six états. L’ancien texte « vous êtes remboursé automatiquement » était faux sans mutuelle.

![Prise en charge, moyens de paiement, carte bancaire et confirmation](/images/tessan/tessan-prise-en-charge-paiement.webp)

## Tester une hypothèse, la documenter, l’abandonner

Ma première hypothèse pour réduire la friction était de repousser l’authentification jusqu’à la salle d’attente. Je l’ai analysée en une journée, puis abandonnée en documentant pourquoi : l’appel aux droits de l’Assurance Maladie exige une identification avant la mise en relation, les conditions d’utilisation doivent être acceptées à chaque session, et une session anonyme complique la file côté médecin. Le levier réel était de simplifier l’authentification là où elle se trouve : une entrée unique par e-mail ou téléphone, un code à usage unique, aucun mot de passe.

Le principe « qualifier avant d’authentifier » tient pleinement sur le web. Sur le mobile, la connexion précède l’accueil. Ce que le parcours tient : les données administratives (carte vitale, médecin traitant) sont demandées après le motif, au moment où elles servent.

![Accès : bienvenue, saisie de l’e-mail ou du téléphone, code à usage unique, accueil](/images/tessan/tessan-acces.webp)

## Représenter l’incertitude de la salle d’attente

La salle d’attente a connu trois états. En mai, une position dans la file et « environ 8 minutes ». En juin, un décompte descendant et une estimation avant d’entrer en file. En juillet, plus aucun temps d’attente affiché : la position et sa tendance (avance, stable, recul), parce qu’un chiffre figé mentirait et ruinerait la confiance dans le reste de l’écran. Seule la fenêtre pour rejoindre, une fois un médecin disponible, est chronométrée, parce qu’elle est contractuelle.

Un recul de position n’est jamais silencieux et jamais présenté comme un échec du patient. Sept statuts décrivent l’attente, et un seul franchit les modes de concentration : « médecin disponible ». Les cartes pour Dynamic Island, iPhone sans Dynamic Island et Android ont été vérifiées contre le kit officiel d’Apple, ce qui a fait apparaître deux défauts bloquants : des hauteurs de carte hors des deux tailles autorisées et des pilules compactes mal dimensionnées.

![La salle d’attente sur l’écran verrouillé : votre tour approche, un médecin est disponible, en consultation, reprise](/images/tessan/tessan-live-activity.webp)

## Faire de la limite réglementaire un élément d’interface

L’assistant IA n’a pas le droit de diagnostiquer. Plutôt qu’une clause dans les conditions d’utilisation, j’ai rendu cette limite visible et opérationnelle. Un bandeau de périmètre reste affiché sous l’en-tête. Chaque réponse suit la même structure, information, contexte, action, sans valeur brute isolée. L’escalade vers un médecin est déclenchée par le contenu de la conversation, jamais par un compteur. Un refus est conçu comme un parcours, avec une sortie réelle vers un médecin. L’écran de consentement n’apparaît qu’une fois, avec quatre mentions informatives sans case à cocher et deux choix, dont un seul conditionne l’accès. Son nom, « Assistant Santé », écarte le mot « docteur », qui portait une attente d’autorité médicale en tension avec un périmètre de conseil.

Les données sont anonymisées avant d’être envoyées au modèle : le prénom n’est jamais transmis, l’âge, le poids et la taille passent en tranches, le code postal devient une région puis est jeté, et l’historique est purgé au bout de 90 jours. Le 1er juillet, nous retirons deux boutons d’accueil, « décrire un symptôme » et « comprendre une ordonnance » : une affordance est une promesse, et celle-ci rapprochait l’outil d’un acte médical.

Même logique pour les contre-indications. L’écran qui filtrait les motifs non éligibles renvoyait le patient vers l’accueil, un cul-de-sac. J’ai construit trois versions dans Figma, un filtre amélioré, un filtre léger et un contrôle fondu dans le motif, et je recommandais la troisième. Le CEO a tranché pour une quatrième option, plus légère encore : un disclaimer non bloquant sous l’écran Motif, sur une surface grise neutre, sans case à cocher, avec un seul interrupteur pour l’arrêt de travail. Le risque qu’un patient paie pour un motif non couvert est assumé.

## Un design system sans équipe design

Aucune équipe ne pouvait maintenir un système, donc je suis parti d’un audit de la bibliothèque Angular existante, en croisant le code et Figma. Les écarts se trouvaient à chaque couche : toutes les graisses typographiques décalées d’un cran, une erreur de mapping commise tôt et propagée, une ombre qui n’était pas celle de la marque, deux jeux d’icônes, six composants dessinés sans code. L’équipe tech a tranché le 29 avril pour une seule source de code plutôt qu’un second kit React.

Pour l’application mobile, j’ai construit en parallèle un système neuf : des tokens partagés entre Figma et le code, avec le fichier Figma comme vérité visuelle, et des composants reconstruits en React Native plutôt qu’importés d’Angular. Le 25 juin, un audit des composants de l’application, mené par cinq sous-agents en lecture seule, trouve une cause racine unique à des écarts visibles partout : il n’existait pas de composant Header, donc chaque écran redessinait sa barre, avec cinq hauteurs différentes et une cible « retour » de 24 px au lieu de 44 sur 15 écrans sur 23. La réponse tient en trois vagues le même jour. Un pack de quatre skills pour Claude Code encode les règles du système : sans équipe design, la gouvernance passe par l’outil plutôt que par un document.

## Livrer en sprints d’une semaine

Le 18 juin, le pack de handoff est prêt pour les développeurs, avec une réunion de passation de 90 minutes prévue pour le présenter : sept epics et 25 user stories, 40 écrans de 390 px rangés par section dans Figma, un périmètre de première version, des tokens, et un gabarit de fichier CLAUDE.md pour que l’agent de code des développeurs connaisse les règles du produit (vocabulaire patient, aucun avis médical, aucune valeur brute isolée). Les développeurs implémentent avec Claude Code, presque au rythme du design : maquette, interface générée, correction de ce qui ne marche pas.

Le premier sprint démarre le 22 juin. Trois builds suivent en deux semaines : le 0.1 le 26 juin, le 0.2 le 6 juillet, le 0.3 le 9 juillet, sur Android seulement. La recette du 0.2 relève dix anomalies. Au 14 juillet, 28 des 60 tâches suivies sont terminées, et le parcours de consultation fonctionne de bout en bout en démonstration depuis le 26 juin.

La fiche des stores est construite comme un storyboard par objections : huit captures, chacune lève une peur (l’examen à distance, le vrai médecin, le coût, le médecin traitant), avec des titres écrits comme une circonstance et un résultat vécus. La première version ouvrait sur « 1 500 cabines ». Je l’ai corrigée le 13 juillet : la cabine sert de preuve, la promesse tient ailleurs, un médecin maintenant et aucune surprise sur le coût. Deux formulations sont retirées pour conformité, une revendication de fonction de dispositif médical et un nom de médecin affiché avec une notation par étoiles.

## Rendre l’état du produit interrogeable par une IA

Le pilotage produit reposait sur six bases Notion, trois échelles de priorité incompatibles (P1 à P12, P0 à P3, Critique à Basse) et des files d’entrée déguisées en livrables. Le 1er juillet, le directeur produit et technique me confie la refonte du process et fixe le test : poser des questions à Claude et obtenir une réponse précise, comme « cette feature, où en est-elle ? » ou « cette personne, sur quoi travaille-t-elle ? ». À partir du modèle commun de la direction produit et technique, j’ai audité le système existant avec cinq agents en parallèle, puis simplifié.

Le modèle final tient en une chaîne : Tâche, Livrable, Produit, et Release pour le quand. Un objet, une vérité : une priorité sur une seule échelle (P0 à P3), un effort S, M ou L, une origine normalisée. Une page « Claude, index Notion » donne à l’agent les identifiants des bases, le dictionnaire de statuts, des recettes de lecture et ses garde-fous : il lit tout, il peut proposer un tri en le signant, il ne retient, ne planifie ni n’écarte rien, et ne touche jamais à une priorité. Un test de résistance a joué 15 scénarios simulés, comme un bug bloquant le mardi soir, une urgence de la direction à trois jours ou une release annulée : 4 passent, 11 coincent, 7 correctifs minimaux, aucun ne condamne l’architecture. Le 2 juillet, une démonstration en direct répond à « où en est l’application mobile ? » depuis Notion.

![La chaîne Tâche, Livrable, Release, Produit, et ce que Claude lit, écrit ou laisse à l’humain](/images/tessan/tessan-systeme-gestion-produit.webp)

Côté Figma, une page de découpage range les 40 écrans par epic, avec le lien et l’identifiant de nœud de chaque user story, et une page de passation documente comment produire des écrans dans Figma depuis Claude Code par MCP. Au 9 juillet, le modèle migré, l’index, le formulaire d’entrée et les guides sont en service. Restent prévus : le tri hebdomadaire par un agent, trois automatisations Notion, l’arrêt de Jira, dont le miroir reste actif, et toute mesure d’usage. La gouvernance, qui trie et qui arbitre, aurait dû être écrite avant de configurer l’outil.

## Cinq concepts, un deck, une décision

En avril, avant l’application, j’ai exploré cinq concepts avec six prototypes déployés : un interlocuteur permanent, un signal de santé unique, un pont entre la cabine et le mobile, des missions de prévention et une couche d’expérience commune au mobile, à la tablette et au bureau. Plusieurs ne survivent pas au cadre réglementaire : le concept de score contenait la phrase « Votre tension est dans la norme », qu’une règle de conformité interdit ensuite.

Fin juin, un deck de dix slides, « Hub Santé : la continuité de soin au centre de Tessan », est présenté au comité de direction. Le 26 juin, il tranche : une seule application, avec cet ordre de priorité, les programmes de prévention, l’écosystème pharmacie, puis les objets connectés. Le pont entre soin et prévention s’appuie sur le réseau d’officines, qu’aucun acteur uniquement en ligne ne peut copier.

## Ce qui n’est pas mesuré, et ce qui restait ouvert

Aucune métrique d’impact n’existe à mon départ. L’application n’était pas publiée : la soumission aux stores était préparée, avec les captures, les textes et les déclarations de confidentialité, et suspendue le temps d’établir la qualification réglementaire de l’application. Le design system n’a pas de mesure d’adoption. Le système de gestion produit n’avait vécu qu’une semaine. L’assistant n’a jamais été ouvert au public. La refonte du tunnel reste une hypothèse argumentée tant que la complétion par étape n’est pas suivie.

Restaient ouverts à la passation : un bug de session qui déconnecte l’utilisateur quinze minutes après une consultation, dont la cause est identifiée sans correctif acté, la connexion par code jamais testée en production avec un envoi réel, et la clé de signature Android d’origine. Chaque fil est listé dans un document de passation avec la personne qui doit trancher.

## Ce que je ferais autrement

Poser la mesure avant la refonte du tunnel : complétion par étape, abandon, temps d’accompagnement en officine. Obtenir dès la première semaine les confirmations techniques dont dépendait la fiche des stores, car la mise à jour de la fiche existante n’a été confirmée que le 9 juillet. Instrumenter l’adoption du design system dès sa première version. Écrire la gouvernance du système de gestion produit avant de configurer l’outil.`,

  en: `![The consultation journey of the first version: home, reason, waiting room, consultation completed](/images/tessan/tessan-parcours-consultation.webp)

## Fewer than one patient in four comes back

Tessan equips pharmacies with telemedicine booths: the patient is in the pharmacy, the doctor is remote and operates connected medical devices on site in real time. The visit is reimbursed, and the business model depends on the number of consultations actually started. A patient who enters the funnel and drops out has already cost their acquisition. Fewer than one patient in four returns for a second consultation, which leaves hundreds of thousands of patients who never come back after a first visit.

I arrived in early April in a company with no design function: no designer before me, an Angular component library whose gaps with Figma had piled up, product management scattered across several tools, and a shrinking product team. Two priorities shaped the quarter, consultation volume and the mobile app. On June 15, a decision with the product and technical director set the scope of the first version, with a store submission targeted for July 15.

## Four findings that made repair pointless

A review of the existing app, on June 11 for iOS and June 17 for the funnel, found four problems no patch could fix. The session is fragmented: you can be signed in to the app and signed out of the consultation, because the embedded web view starts its own authentication journey. The navigation is doubled: the patient crosses two interface grammars in a single gesture. The home screen reorganizes around the connected devices in use, so a returning patient does not find what they left. And the funnel runs from 8 to 13 screens depending on an invisible router, including a health insurance entry screen that only 3% of patients managed to complete.

The architecture followed stacked features rather than the journey. Stripping the existing shell would have kept the embedded web view, and with it the double session, and both options required moving the consultation to native and unifying authentication anyway. On June 15, we chose to rebuild, reusing the native building blocks of the consultation. Only the teleconsultation engine stays encapsulated.

## Removing what was most attractive

From June 9 to 11, I had designed "My health": a stable navigation, a home screen that does not change nature, empty states that invite, four analysis modules. On June 15, the first version refocuses the app on online consultation. Connected health, the score, the subscription and the premium assistant leave the scope. Economic reason: the consultation is reimbursed and monetized by volume, while connected health sold for a few euros a month in a market that is not Tessan's. Regulatory reason: these modules exposed the product to a medical device requalification, with an 18 to 36 month certification against a 30 day deadline.

The "My health" design is not lost: its rules return as the horizon of the second version, conditional on certification. Wellbeing as a standalone app remains a separate decision for the leadership.

## Deleting the screen that fails

The health insurance entry succeeded in 3% of cases and was technically disabled. A screen that almost always fails does not collect data, it manufactures drop-offs. It leaves the funnel in favor of an advance payment and a clear explanation of reimbursement. The "Coverage" screen is then rebuilt in euros rather than percentages, because the patient pays an amount at the terminal, with an explicit calculation model and six states. The old text "you are automatically reimbursed" was wrong without supplementary insurance.

![Coverage, payment methods, bank card and confirmation](/images/tessan/tessan-prise-en-charge-paiement.webp)

## Test a hypothesis, document it, drop it

My first idea to reduce friction was to postpone authentication until the waiting room. I analyzed it in a day, then dropped it and documented why: checking entitlements with the national health insurance requires identification before the patient is connected, the terms of use must be accepted at every session, and an anonymous session complicates the queue on the doctor's side. The real lever was to simplify authentication where it already is: a single entry by e-mail or phone, a one-time code, no password.

The principle "qualify before authenticating" holds fully on the web. On mobile, sign-in comes before the home screen. What the journey keeps: administrative data (health card, regular doctor) is requested after the reason for the visit, at the moment it is useful.

![Access: welcome, e-mail or phone entry, one-time code, home](/images/tessan/tessan-acces.webp)

## Representing the uncertainty of the waiting room

The waiting room went through three states. In May, a position in the queue and "about 8 minutes". In June, a countdown and an estimate before joining the queue. In July, no waiting time at all: the position and its trend (moving up, stable, moving back), because a frozen number would lie and ruin trust in the rest of the screen. Only the window to join, once a doctor is available, is timed, because it is contractual.

A drop in position is never silent and never presented as the patient's failure. Seven statuses describe the wait, and only one crosses focus modes: "doctor available". The cards for Dynamic Island, iPhone without Dynamic Island and Android were checked against Apple's official kit, which revealed two blocking defects: card heights outside the two allowed sizes and compact pills sized wrongly.

![The waiting room on the lock screen: your turn is near, a doctor is available, in consultation, resume](/images/tessan/tessan-live-activity.webp)

## Making the regulatory limit part of the interface

The AI assistant is not allowed to diagnose. Instead of a clause in the terms of use, I made that limit visible and operational. A scope banner stays displayed under the header. Every answer follows the same structure, information, context, action, with no isolated raw value. Escalation to a doctor is triggered by the content of the conversation, never by a counter. A refusal is designed as a journey, with a real way out to a doctor. The consent screen appears once, with four informative statements without a checkbox and two choices, only one of which conditions access. Its name, "Health Assistant", avoids the word "doctor", which carried an expectation of medical authority at odds with an advisory scope.

Data is anonymized before it is sent to the model: the first name is never transmitted, age, weight and height become ranges, the postal code becomes a region and is then discarded, and the history is purged after 90 days. On July 1, we removed two home buttons, "describe a symptom" and "understand a prescription": an affordance is a promise, and this one brought the tool closer to a medical act.

Same logic for contraindications. The screen that filtered ineligible reasons sent the patient back to the home screen, a dead end. I built three versions in Figma, an improved filter, a light filter and a control blended into the reason, and recommended the third. The CEO chose a fourth option, lighter still: a non-blocking disclaimer under the Reason screen, on a neutral grey surface, with no checkbox and a single toggle for sick leave. The risk that a patient pays for a reason that is not covered is accepted.

## A design system without a design team

No team could maintain a system, so I started from an audit of the existing Angular library, cross-checking code and Figma. The gaps were in every layer: all font weights shifted one step, a mapping error made early and propagated, a shadow that was not the brand's, two icon sets, six components drawn without code. The tech team decided on April 29 for a single code source rather than a second React kit.

For the mobile app, I built a new system in parallel: tokens shared between Figma and code, with the Figma file as the visual truth, and components rebuilt in React Native rather than imported from Angular. On June 25, an audit of the app's components, run by five read-only sub-agents, found a single root cause behind gaps visible everywhere: there was no Header component, so every screen redrew its bar, with five different heights and a 24 px "back" target instead of 44 on 15 screens out of 23. The response came in three waves on the same day. A pack of four skills for Claude Code encodes the system's rules: with no design team, governance goes through the tool rather than a document.

## Shipping in one-week sprints

On June 18, the handoff pack was ready for the developers, with a 90 minute handover meeting planned to present it: seven epics and 25 user stories, 40 screens at 390 px organized by section in Figma, a scope for the first version, tokens, and a CLAUDE.md template so the developers' coding agent knows the product rules (patient vocabulary, no medical advice, no isolated raw value). The developers implement with Claude Code, almost at the pace of design: mockup, generated interface, fixing what does not work.

The first sprint starts on June 22. Three builds follow in two weeks: 0.1 on June 26, 0.2 on July 6, 0.3 on July 9, Android only. The 0.2 acceptance run finds ten issues. By July 14, 28 of the 60 tracked tasks are done, and the consultation journey has worked end to end in demos since June 26.

The store listing is built as a storyboard of objections: eight screenshots, each lifting one fear (the remote exam, the real doctor, the cost, the regular doctor), with titles written as a lived circumstance and outcome. The first version opened on "1,500 booths". I corrected it on July 13: the booth serves as proof, the promise lies elsewhere, a doctor now and no surprise on cost. Two phrasings are removed for compliance, a claim of a medical device function and a doctor's name shown with a star rating.

## Making the state of the product queryable by an AI

Product management relied on six Notion databases, three incompatible priority scales (P1 to P12, P0 to P3, Critical to Low) and intake queues disguised as deliverables. On July 1, the product and technical director entrusted me with the process overhaul and set the test: ask Claude questions and get a precise answer, such as "this feature, where does it stand?" or "this person, what are they working on?". Starting from the shared model of product and technology leadership, I audited the existing system with five agents in parallel, then simplified it.

The final model fits in one chain: Task, Deliverable, Product, and Release for the when. One object, one truth: a priority on a single scale (P0 to P3), an effort of S, M or L, a normalized origin. A page called "Claude, Notion index" gives the agent the database identifiers, the status dictionary, read recipes and its guardrails: it reads everything, it can propose a triage by signing it, it never retains, schedules or dismisses anything, and never touches a priority. A stress test played 15 simulated scenarios, such as a blocking bug on Tuesday evening, a three-day urgency from leadership or a cancelled release: 4 pass, 11 get stuck, 7 minimal fixes, none condemns the architecture. On July 2, a live demonstration answers "where does the mobile app stand?" from Notion.

![The chain Task, Deliverable, Release, Product, and what Claude reads, writes or leaves to humans](/images/tessan/tessan-systeme-gestion-produit.webp)

On the Figma side, a breakdown page organizes the 40 screens by epic, with the link and node identifier of each user story, and a handover page documents how to produce screens in Figma from Claude Code through MCP. As of July 9, the migrated model, the index, the intake form and the guides are in service. Still planned: the weekly triage by an agent, three Notion automations, the shutdown of Jira, whose mirror remains active, and any usage measurement. The governance, who triages and who arbitrates, should have been written before configuring the tool.

## Five concepts, one deck, one decision

In April, before the app, I explored five concepts with six deployed prototypes: a permanent interlocutor, a single health signal, a bridge between the booth and mobile, prevention missions, and an experience layer shared by mobile, tablet and desktop. Several do not survive the regulatory framework: the score concept contained the sentence "Your blood pressure is normal", which a compliance rule later forbids.

At the end of June, a ten-slide deck, "Health Hub: continuity of care at the center of Tessan", is presented to the executive committee. On June 26, it decides: a single app, with this order of priority, prevention programs, the pharmacy ecosystem, then connected devices. The bridge between care and prevention relies on the pharmacy network, which no online-only player can copy.

## What is not measured, and what remained open

No impact metric exists when I leave. The app was not published: the store submission was prepared, with screenshots, texts and privacy declarations, and suspended while the app's regulatory qualification was being established. The design system has no adoption measure. The product management system had lived for a week. The assistant was never opened to the public. The funnel redesign remains a reasoned hypothesis until completion by step is tracked.

Still open at handover: a session bug that signs the user out fifteen minutes after a consultation, whose cause is identified but without an agreed fix, the code-based sign-in never tested in production with real delivery, and the original Android signing key. Each thread is listed in a handover document with the person who has to decide.

## What I would do differently

Set up measurement before the funnel redesign: completion by step, drop-off, assistance time in the pharmacy. Get the technical confirmations the store listing depended on in the first week, because updating the existing listing was only confirmed on July 9. Instrument design system adoption from its first version. Write the product management governance before configuring the tool.`,
}
