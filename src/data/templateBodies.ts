/**
 * The six templates as reading pages: an opening (why the document exists, when it is used), then the
 * template itself, in HTML read by ArticleBody. Same markup rules as the articles: p, h2, h3, ul, ol,
 * table, code, `.callout`. Every h2 opens a numbered section on the page.
 *
 * The French text is the original (the templates were written in French); the English is a translation
 * that keeps the same structure, so both pages have the same sections.
 */

export interface TemplateBody {
  /** One or two short paragraphs before the first section: what the document is, when it is used. */
  intro: string
  /** The template itself, h2 sections. */
  body: string
}

export const TEMPLATE_BODIES: Record<string, { en: TemplateBody; fr: TemplateBody }> = {
  'template-design-scoping': {
    fr: {
      intro: `<p>Ce document ouvre chaque sujet de conception un peu large&nbsp;: une refonte, une nouvelle fonctionnalité, une demande de PO sans solution évidente. Je le remplis avant d’ouvrir Figma, pour que l’équipe soit d’accord sur le problème avant de discuter des écrans.</p>
<p>Il tient sur une page et suit toujours le même ordre&nbsp;: le contexte, la problématique, les objectifs, puis les concepts et les prototypes explorés, et enfin les prochaines étapes. Les questions ci-dessous sont celles qui figurent dans le modèle vide&nbsp;; elles guident la rédaction de chaque partie.</p>`,
      body: `<h2>Contexte</h2>
<p>Dans quel contexte ce sujet a-t-il été abordé&nbsp;? Répond-il à un besoin exprimé par des utilisateurs, par des PO&nbsp;? Existe-t-il des chiffres ou des pourcentages pour illustrer la situation&nbsp;?</p>
<p>Deux ou trois phrases suffisent. Le but est que quelqu’un qui arrive sur le sujet un mois plus tard comprenne d’où il vient.</p>

<h2>Problématique</h2>
<h3>Le besoin et la question qu’il pose</h3>
<p>Quel est le besoin, et quelle problématique se pose par rapport à ce besoin&nbsp;? Formuler la question en une phrase, sans solution dedans.</p>
<h3>L’existant</h3>
<p>Comment répond-on à cette problématique aujourd’hui, dans le produit ou en dehors&nbsp;? Captures d’écran, parcours actuel, contournements observés chez les utilisateurs.</p>
<h3>Benchmark</h3>
<p>Existe-t-il des services qui répondent déjà à cette problématique&nbsp;? Quels en sont les avantages et les inconvénients&nbsp;? Deux ou trois exemples bien choisis valent mieux qu’une liste.</p>

<h2>Objectifs</h2>
<p>Citer les objectifs du sujet&nbsp;: que cherche-t-on à atteindre, et quel en serait le bénéfice&nbsp;? Trois objectifs au plus, formulés de façon à pouvoir dire plus tard s’ils sont atteints.</p>
<ul>
<li>Objectif 1</li>
<li>Objectif 2</li>
<li>Objectif 3</li>
</ul>

<h2>Exploration de solutions</h2>
<h3>Concepts</h3>
<p>Un tableau par concept exploré, avec la même grille pour tous&nbsp;: une description courte, les points forts, les points faibles. Trois concepts est un bon nombre pour discuter&nbsp;; un seul, et la discussion porte sur le détail au lieu de porter sur l’approche.</p>
<table>
<thead><tr><th>Concept</th><th>Description</th><th>Les +</th><th>Les -</th></tr></thead>
<tbody>
<tr><td>Concept 1</td><td>Ce que l’utilisateur voit et fait, en deux phrases</td><td>Ce que l’approche résout bien</td><td>Ce qu’elle coûte ou laisse de côté</td></tr>
<tr><td>Concept 2</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Concept 3</td><td>…</td><td>…</td><td>…</td></tr>
</tbody>
</table>
<h3>Prototypes</h3>
<p>Un prototype par concept retenu, inséré ou lié depuis Figma. Le niveau de fidélité dépend de ce qu’on veut tester&nbsp;: un flux se teste en basse fidélité, une interaction fine demande de la haute fidélité.</p>

<h2>Prochaines étapes</h2>
<p>Lister les étapes à suivre, taguer les personnes concernées, formuler les besoins vers l’équipe de recherche utilisateur pour tester les hypothèses. Chaque étape a un responsable et une échéance, sinon elle n’existe pas.</p>
<h3>Notes complémentaires</h3>
<p>Notes ou commentaires qui ne rentrent pas ailleurs&nbsp;: contraintes techniques apprises en chemin, décisions prises en réunion, questions restées ouvertes.</p>`,
    },
    en: {
      intro: `<p>This document opens every design topic that is a little too wide to start in Figma: a redesign, a new feature, a request from a Product Owner with no obvious answer. I fill it in before opening Figma, so that the team agrees on the problem before anyone discusses screens.</p>
<p>It fits on one page and always follows the same order: the context, the problem, the goals, then the concepts and prototypes explored, and finally the next steps. The questions below are the ones written in the empty template; they guide each part.</p>`,
      body: `<h2>Context</h2>
<p>In what context did this topic come up? Does it answer a need expressed by users, by Product Owners? Are there figures or percentages that illustrate the situation?</p>
<p>Two or three sentences are enough. The goal is that someone who joins the topic a month later understands where it comes from.</p>

<h2>Problem</h2>
<h3>The need and the question it raises</h3>
<p>What is the need, and what problem does it raise? State the question in one sentence, with no solution inside it.</p>
<h3>What exists today</h3>
<p>How is this problem answered today, in the product or outside it? Screenshots, current journey, workarounds observed among users.</p>
<h3>Benchmark</h3>
<p>Do services already answer this problem? What are their strengths and weaknesses? Two or three well-chosen examples are worth more than a list.</p>

<h2>Goals</h2>
<p>State the goals of the topic: what are we trying to reach, and what would the benefit be? Three goals at most, written so that it is possible to say later whether they were reached.</p>
<ul>
<li>Goal 1</li>
<li>Goal 2</li>
<li>Goal 3</li>
</ul>

<h2>Exploring solutions</h2>
<h3>Concepts</h3>
<p>One table per concept explored, with the same grid for all of them: a short description, the strengths, the weaknesses. Three concepts is a good number for a discussion; with only one, the conversation moves to details instead of the approach.</p>
<table>
<thead><tr><th>Concept</th><th>Description</th><th>Pros</th><th>Cons</th></tr></thead>
<tbody>
<tr><td>Concept 1</td><td>What the user sees and does, in two sentences</td><td>What the approach solves well</td><td>What it costs or leaves aside</td></tr>
<tr><td>Concept 2</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td>Concept 3</td><td>…</td><td>…</td><td>…</td></tr>
</tbody>
</table>
<h3>Prototypes</h3>
<p>One prototype per concept kept, embedded or linked from Figma. The level of fidelity depends on what is being tested: a flow is tested in low fidelity, a fine interaction needs high fidelity.</p>

<h2>Next steps</h2>
<p>List the steps to follow, tag the people involved, write down what the user research team needs in order to test the hypotheses. Each step has an owner and a date, otherwise it does not exist.</p>
<h3>Additional notes</h3>
<p>Notes or comments that fit nowhere else: technical constraints learned along the way, decisions taken in meetings, questions still open.</p>`,
    },
  },

  'template-po-design-sync': {
    fr: {
      intro: `<p>Deux réunions de trente minutes, en alternance d’une semaine sur l’autre, entre le Product Owner et l’équipe design. La première identifie les sujets design du sprint à venir, la seconde prépare le sprint planning.</p>
<p>Le rituel existe pour éviter l’effet tunnel&nbsp;: le design avance avec un sprint d’avance, le PO connaît l’état des maquettes, et les tickets arrivent en refinement avec des livrables déjà visibles.</p>`,
      body: `<h2>Principe</h2>
<p>Ce processus décrit deux types de réunions de synchronisation à mener en alternance entre le Product Owner et l’équipe design. L’objectif est d’assurer une collaboration fluide et une préparation efficace des livrables design pour les sprints.</p>
<p>Chaque réunion dure trente minutes. Les deux types se succèdent&nbsp;: une semaine l’identification des sujets, la semaine suivante la préparation du sprint planning.</p>

<h2>Réunion 1&nbsp;: identification des sujets</h2>
<ul>
<li>Lecture des tickets du board du sprint en cours.</li>
<li>Identification des sujets design à travailler, et estimation.</li>
<li>Identification des inconnues et des besoins pour avancer sur l’UX et l’UI&nbsp;: point avec l’équipe technique, point avec l’équipe data.</li>
<li>Présentation des premiers livrables design, en vue du backlog refinement.</li>
</ul>

<h2>Réunion 2&nbsp;: préparation du sprint planning</h2>
<ul>
<li>Relecture des tickets pour affiner les scénarios.</li>
<li>Revue du design en cours, retours, et passage en «&nbsp;prêt pour le développement&nbsp;».</li>
</ul>
<div class="callout"><p>Un sujet qui n’est pas prêt à la deuxième réunion ne rentre pas dans le sprint. Il revient à la réunion d’identification suivante, avec ce qui lui manque nommé explicitement.</p></div>`,
    },
    en: {
      intro: `<p>Two thirty-minute meetings, alternating from one week to the next, between the Product Owner and the design team. The first one identifies the design topics of the coming sprint, the second one prepares the sprint planning.</p>
<p>The ritual exists to avoid the tunnel effect: design runs one sprint ahead, the Product Owner knows the state of the mockups, and tickets reach refinement with deliverables that can already be seen.</p>`,
      body: `<h2>Principle</h2>
<p>This process describes two kinds of synchronisation meetings, held in alternation between the Product Owner and the design team. The goal is a smooth collaboration and an efficient preparation of the design deliverables for the sprints.</p>
<p>Each meeting lasts thirty minutes. The two kinds follow each other: one week the identification of topics, the next week the preparation of the sprint planning.</p>

<h2>Meeting 1: identifying the topics</h2>
<ul>
<li>Reading of the tickets on the board of the current sprint.</li>
<li>Identification of the design topics to work on, and estimation.</li>
<li>Identification of the unknowns and of what is needed to move forward on UX and UI: a check with the engineering team, a check with the data team.</li>
<li>Presentation of the first design deliverables, ahead of backlog refinement.</li>
</ul>

<h2>Meeting 2: preparing the sprint planning</h2>
<ul>
<li>Re-reading of the tickets to refine the scenarios.</li>
<li>Review of the design in progress, feedback, and move to “ready for development”.</li>
</ul>
<div class="callout"><p>A topic that is not ready at the second meeting does not enter the sprint. It comes back to the next identification meeting, with what it lacks named explicitly.</p></div>`,
    },
  },

  'template-design-teardown': {
    fr: {
      intro: `<p>Un atelier d’idéation express de trois heures, avec quatre ou cinq participants, pour passer d’un problème de design à une piste de solution en haute fidélité dans la même demi-journée.</p>
<p>Le support est un tableau FigJam préparé à l’avance. La séquence ci-dessous donne la durée de chaque temps&nbsp;; elle est serrée volontairement, pour que le groupe converge au lieu d’explorer sans fin.</p>`,
      body: `<h2>Avant l’atelier</h2>
<p><strong>Participants&nbsp;:</strong> quatre à cinq personnes recommandées. <strong>Durée&nbsp;:</strong> trois heures.</p>
<p>Préparation&nbsp;:</p>
<ul>
<li>Définir le sujet ou la fonctionnalité à étudier.</li>
<li>Préparer le contexte, les points d’attention et la problématique.</li>
<li>Rassembler des captures d’écran pertinentes (facultatif).</li>
</ul>

<h2>Introduction (15 minutes)</h2>
<ul>
<li>Présentation du contexte, des points d’attention et de la problématique.</li>
<li>Revue des captures d’écran, si disponibles.</li>
</ul>

<h2>Cadrage du défi (40 minutes)</h2>
<ul>
<li>Génération d’opportunités avec «&nbsp;Comment pourrions-nous…&nbsp;?&nbsp;» (15 min).</li>
<li>Classement par thématique (5 min).</li>
<li>Définition des étapes de l’expérience utilisateur (10 min).</li>
<li>Identification des principes de design (5 min).</li>
<li>Synthèse et convergence (5 min).</li>
</ul>

<h2>Analyse comparative (30 minutes)</h2>
<p>Examen de deux ou trois exemples similaires. Pour chaque exemple&nbsp;:</p>
<ul>
<li>Analyse des points forts et des points faibles.</li>
<li>Identification des idées à retenir.</li>
</ul>

<h2>Génération de concepts (45 minutes)</h2>
<ul>
<li>Dessin individuel ou en binôme (30 min).</li>
<li>Partage et analyse des concepts (15 min).</li>
</ul>

<h2>Convergence (50 minutes)</h2>
<ul>
<li>Vote sur les solutions (5 min).</li>
<li>Discussion et sélection des concepts les plus pertinents (15 min).</li>
<li>Définition des principes à retenir (15 min).</li>
<li>Établissement des règles et des interactions pour les designers (15 min).</li>
</ul>

<h2>Décisions et suite</h2>
<ul>
<li>Récapitulatif des décisions prises.</li>
<li>Définition des actions à suivre pour la réalisation en haute fidélité.</li>
</ul>
<div class="callout"><p>Le résultat de l’atelier est une page de principes et de règles d’interaction, pas une maquette finie. La haute fidélité se fait ensuite, par les designers, à partir de cette page.</p></div>`,
    },
    en: {
      intro: `<p>A three-hour express ideation workshop, with four or five participants, to go from a design problem to a high-fidelity solution path within the same half-day.</p>
<p>The support is a FigJam board prepared in advance. The sequence below gives the duration of each step; it is deliberately tight, so that the group converges instead of exploring endlessly.</p>`,
      body: `<h2>Before the workshop</h2>
<p><strong>Participants:</strong> four to five people recommended. <strong>Duration:</strong> three hours.</p>
<p>Preparation:</p>
<ul>
<li>Define the topic or feature to study.</li>
<li>Prepare the context, the points of attention and the problem.</li>
<li>Gather relevant screenshots (optional).</li>
</ul>

<h2>Introduction (15 minutes)</h2>
<ul>
<li>Presentation of the context, the points of attention and the problem.</li>
<li>Review of the screenshots, if available.</li>
</ul>

<h2>Framing the challenge (40 minutes)</h2>
<ul>
<li>Generating opportunities with “How might we…?” (15 min).</li>
<li>Grouping by theme (5 min).</li>
<li>Defining the steps of the user experience (10 min).</li>
<li>Identifying the design principles (5 min).</li>
<li>Synthesis and convergence (5 min).</li>
</ul>

<h2>Comparative analysis (30 minutes)</h2>
<p>Review of two or three similar examples. For each example:</p>
<ul>
<li>Analysis of strengths and weaknesses.</li>
<li>Identification of the ideas worth keeping.</li>
</ul>

<h2>Generating concepts (45 minutes)</h2>
<ul>
<li>Individual or paired sketching (30 min).</li>
<li>Sharing and analysis of the concepts (15 min).</li>
</ul>

<h2>Convergence (50 minutes)</h2>
<ul>
<li>Vote on the solutions (5 min).</li>
<li>Discussion and selection of the most relevant concepts (15 min).</li>
<li>Definition of the principles to keep (15 min).</li>
<li>Rules and interactions set for the designers (15 min).</li>
</ul>

<h2>Decisions and follow-up</h2>
<ul>
<li>Recap of the decisions taken.</li>
<li>Definition of the actions to follow for the high-fidelity work.</li>
</ul>
<div class="callout"><p>The outcome of the workshop is a page of principles and interaction rules, not a finished mockup. High fidelity comes afterwards, done by the designers, from that page.</p></div>`,
    },
  },

  'template-feature-checklist': {
    fr: {
      intro: `<p>Vingt-cinq points de vigilance à passer en revue avant de considérer qu’une fonctionnalité est conçue, précédés de trois questions sans lesquelles je ne commence pas.</p>
<p>Tous les points ne s’appliquent pas à chaque fonctionnalité. La liste sert à vérifier qu’aucun angle n’a été oublié, et à nommer ce qu’on choisit de ne pas traiter. Je la relis à deux moments&nbsp;: au cadrage, pour poser les questions, et avant le passage en développement, pour vérifier les réponses.</p>`,
      body: `<h2>Trois questions auxquelles répondre avant tout</h2>
<h3>Le besoin</h3>
<p>Quel est le besoin utilisateur pour lequel on conçoit une solution&nbsp;? Un besoin remonté par un utilisateur réel, idéalement.</p>
<h3>La réponse</h3>
<p>Comment prévoit-on d’y répondre&nbsp;?</p>
<h3>Le résultat</h3>
<p>Pour quel résultat, quel aboutissement&nbsp;?</p>

<h2>Comprendre le besoin</h2>
<h3>1. Objectif</h3>
<p>Quel est l’objectif de l’utilisateur quand il utilise cette fonctionnalité&nbsp;?</p>
<h3>2. Patterns existants</h3>
<p>Cette fonctionnalité a-t-elle des particularités communes avec d’autres applications&nbsp;? Par exemple&nbsp;: gérer une liste d’éléments, ajouter un élément, trier ou filtrer une liste, sélectionner, sélectionner plusieurs éléments.</p>
<p>Pour une fonctionnalité de type liste, les questions à se poser&nbsp;:</p>
<ul>
<li>Y a-t-il un moyen standard de le faire, auquel l’audience cible est habituée&nbsp;?</li>
<li>Existe-t-il un pattern natif pour réaliser cette fonctionnalité (les listes iOS et Android, par exemple)&nbsp;?</li>
</ul>
<h3>3. Parallèle conceptuel</h3>
<p>Une fonctionnalité similaire existe-t-elle ailleurs, et partage-t-elle la même approche de la solution&nbsp;? Y a-t-il des métaphores, dans la vie réelle ou dans celle des utilisateurs, qui pourraient ressembler à la solution&nbsp;? Si le concept est nouveau, est-on capable de le décrire en termes génériques&nbsp;?</p>
<h3>4. Connaissances et habitudes d’usage</h3>
<p>Quels autres outils utilisent nos audiences&nbsp;? Sont-elles expertes de ces outils&nbsp;? Cela influence-t-il leur manière de comprendre comment une fonction d’import fonctionne, par exemple&nbsp;? Sont-elles plus habituées à la sauvegarde automatique qu’au clic sur un bouton «&nbsp;Enregistrer&nbsp;»&nbsp;?</p>
<h3>5. Complexité</h3>
<p>Quel niveau d’expertise demande cette fonctionnalité&nbsp;? Est-ce une action utilisée dès la première connexion, ou réservée aux experts&nbsp;? Pour supprimer un e-mail, le balayage est masqué mais connu des utilisateurs avancés. Souhaite-t-on guider l’utilisateur pour qu’il apprenne cette action, ou préfère-t-on la masquer pour éviter une interaction accidentelle des débutants&nbsp;?</p>

<h2>Le contexte d’usage</h2>
<h3>6. Contexte physique</h3>
<p>Quel est le contexte d’usage de cette fonctionnalité&nbsp;? L’environnement de l’utilisateur peut-il influencer la manière dont il comprend l’information ou interagit avec l’interface&nbsp;? Par exemple, un professeur qui partage un contenu depuis un ordinateur, dans une classe bruyante, avec des élèves dissipés.</p>
<h3>7. Contexte temporel</h3>
<p>Que fait l’utilisateur juste avant d’utiliser la fonctionnalité&nbsp;? De quels endroits de l’application arrive-t-il&nbsp;? Prévoir un parcours clair et rassurant pour lui permettre de revenir en arrière s’il s’est trompé.</p>
<h3>8. Déclencheur</h3>
<p>Qu’est-ce qui déclenche l’utilisation de la fonctionnalité&nbsp;? Quand et pourquoi le besoin intervient-il&nbsp;? Le déclencheur peut être&nbsp;:</p>
<ul>
<li>temporel&nbsp;: un nouveau contenu chaque semaine, un reporting mensuel&nbsp;;</li>
<li>système&nbsp;: le système notifie l’action à prendre.</li>
</ul>
<p>Si l’utilisateur a besoin d’être notifié, comment s’assure-t-on que la notification n’est pas intrusive&nbsp;? Comment calibrer l’application pour qu’elle ne génère pas de stress par des notifications trop fréquentes&nbsp;?</p>
<h3>9. Paramètres</h3>
<p>L’utilisateur a-t-il besoin de configurer des paramètres avant de pouvoir utiliser la fonctionnalité&nbsp;? Le système mémorise-t-il cette configuration pour la prochaine fois (oui, de préférence)&nbsp;? L’utilisateur sait-il où modifier ces paramètres si besoin&nbsp;?</p>
<h3>10. Prérequis d’utilisation</h3>
<p>Un prérequis est-il nécessaire pour accéder à la fonctionnalité&nbsp;? Comment le communique-t-on à l’utilisateur&nbsp;? Par exemple, l’accès à la caméra du téléphone pour scanner un code-barres.</p>
<h3>11. Informations à connaître</h3>
<p>L’utilisateur a-t-il besoin de connaître certaines informations pour faire des choix avant de commencer le parcours&nbsp;? Que doit-il voir ou savoir pour choisir correctement&nbsp;? S’il est amené à visiter une page externe, comment l’en informer&nbsp;? Par exemple, un tableau de bord consulté sur un autre site.</p>

<h2>Ce que le système renvoie</h2>
<h3>12. Progression et chargement</h3>
<p>Certaines opérations prennent-elles du temps&nbsp;? Comment gérer l’attente&nbsp;? Un long chargement est-il à prévoir pour certaines informations ou pour initialiser un processus&nbsp;? Comment montrer le chargement pour que l’utilisateur sente qu’il garde le contrôle&nbsp;? Peut-il continuer ses tâches pendant ce temps, ou faut-il lui interdire des changements&nbsp;?</p>
<p>Si une opération dure plus de cinq secondes, permettre de l’annuler. Où l’utilisateur se retrouve-t-il après l’annulation&nbsp;? Le système revient-il à l’état précédent&nbsp;?</p>
<h3>13. Retour du système</h3>
<p>Comment les utilisateurs sont-ils informés du succès d’une opération&nbsp;? Les retours sont-ils informatifs, rassurants&nbsp;? Sont-ils discrets mais suffisamment clairs&nbsp;?</p>
<h3>14. Erreurs</h3>
<p>Quelles erreurs sont susceptibles de se produire&nbsp;? S’il existe plusieurs niveaux de sévérité, comment le système les représente-t-il&nbsp;? Que propose-t-on à l’utilisateur pour les résoudre&nbsp;? Un accès à une section d’aide, ou un raccourci vers une information en contexte&nbsp;?</p>
<h3>15. Fréquence</h3>
<p>À quelle fréquence cette fonctionnalité sera-t-elle utilisée&nbsp;? Dix fois par jour, une fois par mois, une seule fois&nbsp;? Combien de clics, de touches ou de balayages sont nécessaires&nbsp;? Des raccourcis clavier ou des actions en masse permettent-ils d’éliminer les clics en trop&nbsp;?</p>

<h2>Pour tous les utilisateurs</h2>
<h3>16. Accessibilité</h3>
<p>Comment l’accessibilité est-elle gérée dans la fonctionnalité&nbsp;? Est-ce un paramètre qui conditionne son utilisation&nbsp;? La fonctionnalité est-elle utilisable avec un lecteur d’écran&nbsp;? Y a-t-il un mode opératoire particulier à la souris&nbsp;? Les contrastes et les tailles de texte sont-ils corrects&nbsp;?</p>
<h3>17. Rôles utilisateurs</h3>
<p>Si plusieurs rôles existent dans le système, quels sont les niveaux d’accès à la fonctionnalité&nbsp;? Implique-t-elle l’accès à une information réservée à certains utilisateurs&nbsp;? Les personnes qui n’y ont pas accès peuvent-elles en être informées, et savoir sous quelles conditions elles pourraient y accéder&nbsp;? Par exemple, un mode payant, ou un accès administrateur à demander au responsable.</p>
<h3>18. Onboarding</h3>
<p>Quelle sera l’expérience de l’utilisateur à la première connexion&nbsp;? Comment l’embarquer&nbsp;? Comment lui faire comprendre l’objectif et la valeur de la fonctionnalité&nbsp;? Comment proposer un accompagnement suffisant au démarrage, sans être intrusif&nbsp;?</p>
<h3>19. États vides</h3>
<p>Trois situations produisent un état vide&nbsp;:</p>
<ul>
<li>la première utilisation (bienvenue)&nbsp;;</li>
<li>le nettoyage (tous les e-mails ont été lus aujourd’hui)&nbsp;;</li>
<li>l’erreur (le contenu prévu ne se charge pas).</li>
</ul>
<p>Chacune est une occasion&nbsp;: éduquer et enrichir la compréhension du service, susciter un sourire à la lecture d’une information, clarifier la proposition de valeur et proposer une action.</p>
<p>Comment la fonctionnalité se comporte-t-elle sans aucune donnée à afficher&nbsp;? Qu’affiche-t-on pour aider l’utilisateur à comprendre et à agir&nbsp;? Quelles actions proposer pour éviter l’hésitation et la perte de repères&nbsp;? Comment l’accompagner pour remplir l’état vide&nbsp;?</p>
<h3>20. Contraintes techniques</h3>
<p>L’application fonctionne-t-elle correctement sur des machines lentes&nbsp;? L’équipement présente-t-il des lacunes de performance&nbsp;? L’accès au réseau peut-il être un enjeu&nbsp;? Peut-on proposer un mode dégradé pour rendre la fonctionnalité accessible dans le plus grand nombre de contextes&nbsp;? Les jeux gourmands en ressources, par exemple, permettent de réduire la qualité graphique sur les téléphones peu puissants.</p>

<h2>Cohérence et lancement</h2>
<h3>21. Design system</h3>
<p>Cette fonctionnalité nécessite-t-elle un nouveau pattern d’interaction, comme une recherche avec autocomplétion&nbsp;? Un composant existe-t-il déjà dans le design system&nbsp;? Faut-il en créer un spécifique pour répondre au besoin&nbsp;?</p>
<h3>22. Simplification</h3>
<p>Est-il possible de simplifier la solution conçue&nbsp;? La nouvelle fonctionnalité est-elle en accord avec le reste de l’application&nbsp;?</p>
<h3>23. Nom de la fonctionnalité</h3>
<p>Comment est-elle nommée&nbsp;? Trouver un nom au début de la réflexion, et le clarifier auprès des différents interlocuteurs, pour que tout le monde parle de la même chose.</p>
<h3>24. Communication</h3>
<p>Comment les utilisateurs vont-ils apprendre l’existence de la fonctionnalité&nbsp;? Par une lettre d’information, une mise à jour de l’application, une notification dans l’application&nbsp;? Quelles seront leurs attentes&nbsp;? Connaîtront-ils d’emblée la valeur de cette mise à jour, ou devront-ils tester pour comprendre toutes les possibilités&nbsp;? Comment aligner le discours promotionnel et l’expérience ressentie dans l’application&nbsp;?</p>
<h3>25. Retours des utilisateurs</h3>
<p>Comment les utilisateurs peuvent-ils donner leur avis sur la nouvelle fonctionnalité&nbsp;? Combien d’utilisateurs sont concernés&nbsp;?</p>`,
    },
    en: {
      intro: `<p>Twenty-five points to review before considering a feature designed, preceded by three questions without which I do not start.</p>
<p>Not every point applies to every feature. The list is there to check that no angle was forgotten, and to name what we choose not to address. I read it at two moments: at framing, to ask the questions, and before handing off to development, to check the answers.</p>`,
      body: `<h2>Three questions to answer before anything else</h2>
<h3>The need</h3>
<p>What is the user need we are designing a solution for? A need reported by a real user, ideally.</p>
<h3>The answer</h3>
<p>How do we plan to answer it?</p>
<h3>The outcome</h3>
<p>For what result, what outcome?</p>

<h2>Understanding the need</h2>
<h3>1. Goal</h3>
<p>What is the user’s goal when using this feature?</p>
<h3>2. Existing patterns</h3>
<p>Does this feature share traits with other applications? For example: managing a list of items, adding an item, sorting or filtering a list, selecting, multi-selecting.</p>
<p>For a list-type feature, the questions to ask:</p>
<ul>
<li>Is there a standard way of doing it, one the target audience is used to?</li>
<li>Is there a native pattern for this feature (iOS and Android list views, for example)?</li>
</ul>
<h3>3. Conceptual parallel</h3>
<p>Does a similar feature exist elsewhere, and does it share the same approach to the solution? Are there metaphors, in real life or in the users’ lives, that could resemble the solution? If the concept is new, can we describe it in generic terms?</p>
<h3>4. Knowledge and habits</h3>
<p>What other tools do our audiences use? Are they experts in those tools? Does that influence how they understand how an import function works, for example? Are they more used to autosave than to clicking a “Save” button?</p>
<h3>5. Complexity</h3>
<p>What level of expertise does this feature require? Is it an action used from the first login, or reserved for experts? To delete an email, swipe to delete is hidden but known to advanced users. Do we want to guide the user to learn this action, or hide it to avoid accidental use by beginners?</p>

<h2>The context of use</h2>
<h3>6. Physical context</h3>
<p>What is the context of use of this feature? Can the user’s environment influence how they understand the information or interact with the interface? For example, a teacher sharing content from a computer, in a noisy classroom, with distracted students.</p>
<h3>7. Temporal context</h3>
<p>What is the user doing right before using the feature? From which parts of the application do they arrive? Plan a clear and reassuring path to let them go back if they made a mistake.</p>
<h3>8. Trigger</h3>
<p>What triggers the use of the feature? When and why does the need arise? The trigger can be:</p>
<ul>
<li>time-based: new content every week, a monthly report;</li>
<li>system-based: the system notifies the action to take.</li>
</ul>
<p>If the user needs to be notified, how do we make sure the notification is not intrusive? How do we calibrate the application so that it does not create stress through too frequent notifications?</p>
<h3>9. Settings</h3>
<p>Does the user need to configure settings before using the feature? Does the system remember that configuration for next time (yes, preferably)? Does the user know where to change those settings if needed?</p>
<h3>10. Prerequisites</h3>
<p>Is a prerequisite needed to access the feature? How do we communicate it to the user? For example, access to the phone camera to scan a barcode.</p>
<h3>11. Things to know</h3>
<p>Does the user need to know certain information to make choices before starting the journey? What do they need to see or know to choose correctly? If they are taken to an external page, how do we tell them? For example, a dashboard viewed on another site.</p>

<h2>What the system gives back</h2>
<h3>12. Progress and loading</h3>
<p>Do some operations take time? How do we handle the wait? Should a long loading time be expected for some information or to initialise a process? How do we show loading so that the user feels in control? Can they continue their tasks in the meantime, or must changes be prevented?</p>
<p>If an operation takes more than five seconds, allow cancelling it. Where does the user land after cancelling? Does the system return to the previous state?</p>
<h3>13. System feedback</h3>
<p>How are users told that an operation succeeded? Is the feedback informative, reassuring? Is it unobtrusive yet clear enough?</p>
<h3>14. Errors</h3>
<p>Which errors are likely to happen? If there are several levels of severity, how does the system represent them? What do we offer the user to resolve them? Access to a help section, or a shortcut to information in context?</p>
<h3>15. Frequency</h3>
<p>How often will this feature be used? Ten times a day, once a month, once ever? How many clicks, taps or swipes does it take? Do keyboard shortcuts or bulk actions remove the extra clicks?</p>

<h2>For every user</h2>
<h3>16. Accessibility</h3>
<p>How is accessibility handled in the feature? Is it a condition of its use? Is the feature usable with a screen reader? Is there a specific way of using it with the mouse? Are contrasts and text sizes correct?</p>
<h3>17. User roles</h3>
<p>If several roles exist in the system, what are the levels of access to the feature? Does it involve information reserved for some users? Can the people without access be told, and know under which conditions they could get it? For example, a paid tier, or admin access to request from a manager.</p>
<h3>18. Onboarding</h3>
<p>What will the user’s experience be at first login? How do we bring them on board? How do we make them understand the goal and the value of the feature? How do we offer enough guidance at the start, without being intrusive?</p>
<h3>19. Empty states</h3>
<p>Three situations produce an empty state:</p>
<ul>
<li>first use (welcome);</li>
<li>clearance (every email has been read today);</li>
<li>error (the expected content does not load).</li>
</ul>
<p>Each one is an opportunity: to educate and enrich the understanding of the service, to bring a smile when reading a piece of information, to clarify the value proposition and offer an action.</p>
<p>How does the feature behave with no data to display? What is shown to help the user understand and act? Which actions avoid hesitation and loss of bearings? How do we guide the user to fill the empty state?</p>
<h3>20. Technical constraints</h3>
<p>Does the application still work correctly on slow machines? Does the equipment have performance gaps? Can network access be an issue? Can we offer a degraded mode so that the feature is reachable in as many contexts as possible? Resource-hungry games, for example, let players lower graphics quality on weak phones.</p>

<h2>Consistency and launch</h2>
<h3>21. Design system</h3>
<p>Does this feature need a new interaction pattern, such as a search with autocomplete? Does a component already exist in the design system? Should a specific one be created for this need?</p>
<h3>22. Simplification</h3>
<p>Can the designed solution be simplified? Is the new feature consistent with the rest of the application?</p>
<h3>23. Naming the feature</h3>
<p>What is it called? Find a name at the start of the work, and clarify it with everyone involved, so that everybody talks about the same thing.</p>
<h3>24. Communication</h3>
<p>How will users learn that the feature exists? Through a newsletter, an app update, an in-app notification? What will they expect? Will they know the value of the update right away, or will they need to try it to understand all the possibilities? How do we align the promotional message with the experience felt in the app?</p>
<h3>25. User feedback</h3>
<p>How can users give their opinion on the new feature? How many users are concerned?</p>`,
    },
  },

  'template-ui-slicing': {
    fr: {
      intro: `<p>Quand un composant évolue ou qu’un nouveau composant entre dans le produit, l’implémentation se passe mieux si le développeur front reçoit l’interface en tranches&nbsp;: une planche avant/après par ticket, avec une phrase sur le changement.</p>
<p>Ce document décrit le découpage que j’utilise, ce que contient chaque planche, et ce qui reste ailleurs dans le fichier Figma.</p>`,
      body: `<h2>Quand le découpage s’applique</h2>
<ul>
<li>Évolution d’un composant du service.</li>
<li>Ajout d’un nouveau composant dans le service.</li>
</ul>

<h2>Le problème qu’il résout</h2>
<p>Comment accompagner le développeur front dans l’implémentation d’une refonte ou d’un nouveau composant, afin de limiter les risques d’incompréhension, les oublis et les erreurs&nbsp;?</p>
<p>Objectifs&nbsp;:</p>
<ul>
<li>rendre l’implémentation plus intuitive, pas à pas&nbsp;;</li>
<li>limiter les risques d’erreur&nbsp;;</li>
<li>obtenir des tickets aussi atomiques que possible, pour une meilleure insertion dans les sprints&nbsp;;</li>
<li>anticiper plus tôt les problèmes d’implémentation&nbsp;;</li>
<li>mieux estimer les tickets grâce à une meilleure visibilité du travail à réaliser.</li>
</ul>

<h2>La séquence</h2>
<ol>
<li>Découper l’implémentation en tickets atomiques.</li>
<li>Réaliser les maquettes correspondant à l’implémentation, étape par étape.</li>
<li>Poser un post-it avec une brève description de la modification ou de l’ajout à réaliser.</li>
<li>Le PO crée le ticket.</li>
<li>Le PO ajoute le numéro du ticket sur le post-it.</li>
<li>Présentation en refinement.</li>
<li>Estimation des tickets côté technique.</li>
<li>Suivi de l’implémentation.</li>
</ol>

<h2>Le format d’une planche</h2>
<ul>
<li>Un «&nbsp;avant / après&nbsp;» (la version cible).</li>
<li>Le numéro du ticket, ou un emplacement vide pour que le PO le saisisse.</li>
<li>Une phrase courte qui décrit le changement effectué.</li>
<li>Les spécifications des nouveaux composants sont sur une autre page Figma.</li>
<li>Le flux de la fonctionnalité est sur une autre page Figma.</li>
</ul>
<div class="callout"><p>Un découpage n’est pas un flux. La planche montre ce qui change dans un composant, pas le parcours dans lequel il s’insère.</p></div>`,
    },
    en: {
      intro: `<p>When a component evolves or a new component enters the product, implementation goes better if the front-end developer receives the interface in slices: one before/after board per ticket, with one sentence about the change.</p>
<p>This document describes the slicing I use, what each board contains, and what stays elsewhere in the Figma file.</p>`,
      body: `<h2>When slicing applies</h2>
<ul>
<li>Evolution of a component of the service.</li>
<li>Addition of a new component to the service.</li>
</ul>

<h2>The problem it solves</h2>
<p>How do we support the front-end developer in implementing a redesign or a new component, so as to limit misunderstandings, omissions and errors?</p>
<p>Goals:</p>
<ul>
<li>make the implementation more intuitive, step by step;</li>
<li>limit the risk of errors;</li>
<li>get tickets as atomic as possible, for a better fit in the sprints;</li>
<li>anticipate implementation problems earlier;</li>
<li>estimate tickets better thanks to a clearer view of the work to do.</li>
</ul>

<h2>The sequence</h2>
<ol>
<li>Slice the implementation into atomic tickets.</li>
<li>Produce the mockups that match the implementation, step by step.</li>
<li>Add a sticky note with a short description of the change or addition to make.</li>
<li>The Product Owner creates the ticket.</li>
<li>The Product Owner adds the ticket number on the sticky note.</li>
<li>Presentation in refinement.</li>
<li>Estimation of the tickets by the engineering team.</li>
<li>Follow-up of the implementation.</li>
</ol>

<h2>The format of a board</h2>
<ul>
<li>A “before / after” (the target version).</li>
<li>The ticket number, or an empty slot for the Product Owner to fill in.</li>
<li>One short sentence describing the change made.</li>
<li>The specifications of new components live on another Figma page.</li>
<li>The flow of the feature lives on another Figma page.</li>
</ul>
<div class="callout"><p>A slice is not a flow. The board shows what changes in a component, not the journey it belongs to.</p></div>`,
    },
  },

  'template-figma-file-status': {
    fr: {
      intro: `<p>Un fichier Figma partagé entre designers, PO et développeurs a besoin d’une signalétique lisible par tous&nbsp;: ce qui est en exploration, ce qui peut être discuté, ce qui est gravé pour le développement.</p>
<p>Quatre statuts, une convention de nommage des pages, et quelques règles de publication et de partage. Les icônes font partie du nom des pages&nbsp;: elles se lisent dans la liste des pages avant même d’ouvrir le contenu.</p>`,
      body: `<h2>Les quatre statuts</h2>
<table>
<thead><tr><th>Signalétique</th><th>Statut</th></tr></thead>
<tbody>
<tr><td><code>🔍 [Explo]</code></td><td>Sujet en cours d’exploration par les designers. Pas prêt à être présenté.</td></tr>
<tr><td><code>🚧 [WIP]</code></td><td>Conception d’une fonctionnalité en cours. Le travail peut être vu et discuté avec les designers, les PO et les développeurs.</td></tr>
<tr><td><code>✅ [Ready to dev]</code></td><td>Le prototype est finalisé et peut être livré dans un ticket pour être implémenté pendant un sprint.</td></tr>
<tr><td><code>📦 [Archive]</code></td><td>Section qui regroupe les archives d’écrans ou de parcours non utilisés sur le projet.</td></tr>
</tbody>
</table>

<h2>Statut WIP&nbsp;: l’espace de travail</h2>
<p>Créer un espace de travail WIP (work in progress) dans une nouvelle page, nommée ainsi, icône incluse&nbsp;:</p>
<div class="callout"><p><code>🚧 [Design-WIP] N° ticket US - Scénario - Écrans</code></p></div>
<p>Dans cette page, on peut créer tous ses écrans, tests et recherches. Les sous-parties suivent le titre «&nbsp;Scénario X&nbsp;».</p>
<p><strong>Aucun élément de la page WIP ne sera utilisé pour le développement.</strong> Pour cela, on crée une page «&nbsp;Ready to dev&nbsp;», étape suivante.</p>

<h2>Statut Ready to dev&nbsp;: le travail validé</h2>
<p>Cet espace est réservé au travail validé par l’équipe, gravé dans le marbre pour l’implémentation par les développeurs. Les écrans seront utilisés tels quels&nbsp;: ils doivent être validés et documentés pour la livraison.</p>
<p>S’il faut ajuster un flux déjà en Ready to dev, dupliquer la page Figma et faire les modifications sur la copie. L’intégrité du parcours validé ne se touche pas.</p>
<p>Il existe deux catégories de pages Ready to dev&nbsp;: le prototype et la spécification.</p>
<h3>Ready to dev «&nbsp;proto&nbsp;»</h3>
<p>Cette page contient le prototype interactif. Tous les écrans ont été validés en amont avec le PO, et le prototype peut servir à une démonstration. Créer une nouvelle page nommée ainsi, icône incluse&nbsp;:</p>
<div class="callout"><p><code>✅ ▶️ [Ready-to-Dev] - N° de ticket - fonctionnalité</code></p></div>
<h3>Ready to dev «&nbsp;spec&nbsp;»</h3>
<p>Cette page contient les écrans avec leurs spécifications. C’est l’étape finale&nbsp;: tous les écrans et le prototype ont été validés. Les spécifications donnent à l’équipe front des informations brèves&nbsp;: taille d’écran, marges internes et externes, taille de police, couleurs, zones interactives, règles d’affichage. Rester simple&nbsp;: la spécification complète les écrans, elle ne les remplace pas.</p>
<div class="callout"><p><code>✅ 📐 [Ready-to-Dev] - N° ticket - fonctionnalité</code></p></div>

<h2>Publication, partage et documentation</h2>
<h3>Publication</h3>
<p>Pour faciliter la publication d’une section passée en Ready to dev, utiliser le plugin Trello dans Figma&nbsp;: il publie automatiquement la maquette dans le ticket Trello.</p>
<h3>Partage</h3>
<p>Pour partager le travail avec l’équipe, utiliser l’adresse de la page ou le bouton «&nbsp;Partager&nbsp;». Raccourci clavier&nbsp;: <code>Cmd + L</code> copie le lien vers la frame sélectionnée. Les adresses de partage se mettent à jour d’elles-mêmes, et tout le monde peut commenter les écrans pour une question ou une suggestion&nbsp;; le commentaire en garde une trace.</p>
<h3>Documentation</h3>
<p>Après validation des écrans Ready to dev, documenter le travail dans l’outil de documentation de l’équipe, à côté du ticket.</p>`,
    },
    en: {
      intro: `<p>A Figma file shared between designers, Product Owners and developers needs signage that everyone can read: what is being explored, what can be discussed, what is set in stone for development.</p>
<p>Four statuses, a naming convention for pages, and a few rules for publishing and sharing. The icons are part of the page names: they can be read in the page list before the content is even opened.</p>`,
      body: `<h2>The four statuses</h2>
<table>
<thead><tr><th>Signage</th><th>Status</th></tr></thead>
<tbody>
<tr><td><code>🔍 [Explo]</code></td><td>Topic being explored by the designers. Not ready to be presented.</td></tr>
<tr><td><code>🚧 [WIP]</code></td><td>Design of a feature in progress. The work can be seen and discussed with designers, Product Owners and developers.</td></tr>
<tr><td><code>✅ [Ready to dev]</code></td><td>The prototype is final and can be delivered in a ticket to be implemented during a sprint.</td></tr>
<tr><td><code>📦 [Archive]</code></td><td>Section that gathers the archives of screens or journeys not used on the project.</td></tr>
</tbody>
</table>

<h2>WIP status: the workspace</h2>
<p>Create a WIP (work in progress) workspace in a new page, named as follows, icon included:</p>
<div class="callout"><p><code>🚧 [Design-WIP] Story ticket no. - Scenario - Screens</code></p></div>
<p>In this page, you can create all your screens, tests and research. Sub-parts follow the title “Scenario X”.</p>
<p><strong>Nothing in the WIP page will be used for development.</strong> For that, a “Ready to dev” page is created, the next step.</p>

<h2>Ready to dev status: the validated work</h2>
<p>This space is reserved for work validated by the team, set in stone for implementation by the developers. The screens will be used as they are: they must be validated and documented for delivery.</p>
<p>If a flow already in Ready to dev needs adjustments, duplicate the Figma page and make the changes on the copy. The integrity of the validated journey is never touched.</p>
<p>There are two kinds of Ready to dev pages: the prototype and the specification.</p>
<h3>Ready to dev “proto”</h3>
<p>This page holds the interactive prototype. All screens were validated beforehand with the Product Owner, and the prototype can be used for a demo. Create a new page named as follows, icon included:</p>
<div class="callout"><p><code>✅ ▶️ [Ready-to-Dev] - Ticket no. - feature</code></p></div>
<h3>Ready to dev “spec”</h3>
<p>This page holds the screens with their specifications. It is the final step: all screens and the prototype have been validated. The specifications give the front-end team brief information: screen size, padding and margins, font size, colours, interactive areas, display rules. Keep it simple: the specification completes the screens, it does not replace them.</p>
<div class="callout"><p><code>✅ 📐 [Ready-to-Dev] - Ticket no. - feature</code></p></div>

<h2>Publishing, sharing and documentation</h2>
<h3>Publishing</h3>
<p>To make publishing a Ready to dev section easier, use the Trello plugin in Figma: it publishes the mockup into the Trello ticket automatically.</p>
<h3>Sharing</h3>
<p>To share the work with the team, use the page address or the “Share” button. Keyboard shortcut: <code>Cmd + L</code> copies the link to the selected frame. Share links update by themselves, and everyone can comment on the screens for a question or a suggestion; the comment keeps a trace of it.</p>
<h3>Documentation</h3>
<p>Once the Ready to dev screens are validated, document the work in the team’s documentation tool, next to the ticket.</p>`,
    },
  },
}
