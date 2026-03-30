# RiskOS

## Expérimentation UX agentiques · Détection de fraude

Victor Soussan · Product Design
Catégorie : Expérimentation UX agentiques

---

`image:hero`
![RiskOS hero](public/images/thubmnail_riskos_dark.webp)

---

## Intention et cadre de l'expérimentation

Les interfaces agentiques posent une question de design qui n'a pas encore de réponse stabilisée : comment intégrer un agent IA dans un flux de décision humain sans créer de la dépendance, de la passivité ou de la méfiance ?

Cette expérimentation explore cette question dans un contexte où les enjeux sont concrets et mesurables : la détection de fraude dans le secteur bancaire européen. Un terrain où chaque seconde de latence cognitive coûte de l'argent, où 80 % des alertes sont des faux positifs, et où l'analyste doit garder le contrôle de la décision finale.

RiskOS est un prototype fonctionnel conçu pour tester des hypothèses de design sur la collaboration humain/IA dans un environnement de pression temporelle.

---

## Le problème : 80 % de faux positifs, zéro contextualisation

Les analystes fraude des néobanques européennes traitent 80 à 150 alertes par shift de 8 heures. 80 % de ces alertes sont des faux positifs. Le temps perdu sur les faux positifs est du temps volé aux cas réels.

L'outil actuel de la plupart des équipes : un tableau CSV, un terminal, des règles statiques. Aucune contextualisation, aucune priorisation intelligente, aucune mémoire de patterns.

---

`video:06-before-after.mp4`
**Données brutes comparées à l'interface structurée.**
À gauche, le flux d'alertes tel qu'il arrive dans beaucoup d'établissements : un CSV brut, des colonnes de données sans hiérarchie visuelle. À droite, les mêmes données structurées dans RiskOS. Le comparatif rend tangible le coût cognitif de l'interface actuelle.

---

## Trois principes de design pour les interfaces agentiques

Comment concevoir une interface où l'IA qualifie et contextualise une alerte en temps réel, sans retirer à l'analyste le contrôle de la décision finale ?

Trois principes guident le prototype :
- L'IA prépare le terrain cognitif de l'analyste, elle ne décide pas à sa place.
- Le raisonnement de l'agent doit être visible, pas seulement sa conclusion.
- Chaque action doit avoir des conséquences traçables dans l'écosystème réel.

---

`video:07-data-flow.mp4`
**Le positionnement de RiskOS dans la chaîne de détection.**
Le parcours d'une transaction suspecte : du core banking au moteur de règles, de la file d'alertes à l'analyse IA, jusqu'à la décision humaine. RiskOS intervient au moment où l'alerte a besoin d'un jugement, pas d'une règle supplémentaire.

---

## Priorisation et triage des alertes

L'analyste L1 ouvre son poste de travail. L'inbox affiche 5 cas ouverts, triés par risque. Le filtrage par niveau (high, medium, low) permet de concentrer l'attention sur les cas critiques. Le compteur de session rappelle ce qui a été traité et ce qui reste.

`video:01-hero-triage.mp4`
**Frustration :** l'analyste perd du temps à scanner une liste non priorisée pour identifier les cas urgents.
**Bénéfice :** le codage couleur, le filtre par risque et le compteur dynamique réduisent le temps de triage à quelques secondes.

---

## Analyse IA avec raisonnement visible

L'agent IA analyse le cas en temps réel. Le texte apparaît mot par mot : pattern matching, analyse comportementale, recommandation. Les tokens sensibles (montants, géolocalisations, devices) se colorent pour guider l'attention. Un indicateur de confiance quantifie la certitude de l'analyse. Les sources de données (Core Banking API, Device Fingerprint, Geo Intelligence) s'allument pour montrer sur quelles données l'analyse s'appuie.

Les boutons d'action n'apparaissent qu'après le streaming complet. Ce choix de design impose un temps de lecture minimum et empêche la décision réflexe.

`video:02-ai-insight.mp4`
**Frustration :** l'analyste reçoit un score de risque sans comprendre pourquoi. Il doit reconstruire mentalement le raisonnement à partir de données éparses.
**Bénéfice :** l'IA structure les signaux faibles en une lecture narrative. L'analyste comprend le « pourquoi » avant de décider le « quoi ».

---

## Prise de décision et traçabilité de l'impact

L'analyste choisit une action (bloquer, escalader, monitorer). La confirmation récapitule le cas, l'action et la durée de review. Deux éléments montrent que l'action ne reste pas dans l'outil : le message Slack envoyé à l'équipe #fraud-ops, et le SMS reçu par le client dont la carte a été gelée.

L'escalade vers le niveau 2 inclut une note pré-remplie par l'IA, que l'analyste peut éditer avant de transmettre. L'escalade devient un acte de transmission documenté, pas une alerte perdue dans une file d'attente.

`video:03-decision-ellipses.mp4`
**Frustration :** l'analyste agit dans l'outil mais ne voit jamais la conséquence de sa décision. L'escalade part dans le vide.
**Bénéfice :** chaque action a un écho visible dans l'écosystème (Slack, SMS, ticket). L'analyste sait que sa décision a été transmise, reçue et exécutée.

---

## Qualification rapide des faux positifs

Un cas à risque moyen (score 45, paiement de 450 euros). L'IA conclut : « Transaction within acceptable range. Consistent patterns. Mark as safe. » L'analyste confirme en un clic. Le cas est résolu en 8 secondes.

`video:05-false-positive.mp4`
**Frustration :** les faux positifs consomment autant de temps que les cas réels, alors qu'ils ne nécessitent aucune action.
**Bénéfice :** l'IA qualifie les faux positifs en quelques secondes, libérant l'attention de l'analyste pour les cas qui comptent.

---

## Traitement séquentiel et métriques de productivité

L'analyste traite 5 cas en séquence. Chaque confirmation propose directement le cas suivant. La barre de session se met à jour en temps réel. Au dernier cas, un écran récapitule la session : 5 cas traités, 92 secondes au total, 18 secondes de moyenne par cas.

`video:04-queue-cleared.mp4`
**Frustration :** chaque changement de cas impose une reprise de contexte. L'analyste perd le rythme entre les dossiers.
**Bénéfice :** le chaînage direct et les métriques de session maintiennent le flux de travail et rendent la productivité visible.

---

## Apprentissages : trois mécanismes transposables

L'intégration de l'IA dans un flux de décision humain ne se résout pas par l'automatisation. Le problème de design est plus fin : il s'agit de distribuer l'autorité entre l'agent et l'humain à chaque étape du processus.

Trois mécanismes se sont révélés structurants dans cette expérimentation :

**Le streaming comme outil de confiance.** Quand l'IA montre son raisonnement en temps réel, l'analyste peut commencer à évaluer avant la fin de l'analyse. La transparence du processus construit la confiance plus efficacement qu'un score de confiance affiché après coup.

**Le conditionnement des actions.** Retarder l'apparition des boutons de décision jusqu'à la fin de l'analyse IA impose un temps de lecture minimum. Dans un contexte de pression temporelle, ce frein intentionnel protège contre la décision réflexe sans ralentir significativement le workflow.

**La traçabilité comme preuve d'impact.** Montrer la notification Slack, le SMS client, le ticket de suivi après une action transforme l'outil d'un silo en un nœud d'un réseau. L'analyste voit que sa décision a des conséquences, ce qui renforce la responsabilité et la satisfaction du travail accompli.

Ces mécanismes sont transposables à d'autres contextes B2B où l'IA assiste une décision humaine : conformité réglementaire, triage médical, modération de contenu, gestion d'incidents.

---

## Périmètre technique

Prototype fonctionnel. React 18, Vite, Tailwind CSS, lucide-react. Dark mode, desktop-first. Web Audio API pour le feedback sonore. Déployé sur Vercel.

`link:prototype` https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app
`link:github` https://github.com/marcus-clay/riskos-fraud-detection
