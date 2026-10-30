// SQOOL Classe case study: copy for SqoolClassePage.tsx
// Structure: hero, testimonial, summary, then four acts:
// stakes and principles, design approach (four decisions), what was delivered, outcome and open points.
export const SQOOL_CLASSE_TRANSLATIONS = {
  en: {
    metaLabels: { role: 'Role', scope: 'Scope', company: 'Company' },
    meta: { company: 'UNOWHY / SQOOL' },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Real-time supervision, Classe UX',
      title: 'Giving teachers the composure to teach in a digital classroom',
      intro:
        'SQOOL Classe is the web application I designed to give teachers control of 30 open tablets during a lesson. It became the reference app of the SQOOL suite, and a class connects in 30 seconds on average.',
    },
    heroTestimonial: {
      quote:
        'I had the chance to work with Victor for 3 years as a duo, and he is one of the most inspiring designers I have ever worked with. Victor combines boundless creativity with impressive rigor. He knows how to translate complex visions into clear and impactful user experiences. Always listening, curious, he constantly pushes thinking further, whether on substance or form. I particularly valued our ability to co-build: he is not afraid to challenge ideas while remaining kind, focused on product quality and user impact. I recommend him to any team looking for a Lead Designer who is creative, demanding, and deeply human.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY',
    },
    summary: {
      context:
        'The Île-de-France region gave a tablet to each of 500,000 students and teachers across 465 high schools. In every classroom this meant 30 open screens, and no adequate tool to keep control of the lesson. Existing tools were either too invasive or too fragile for school Wi-Fi.',
      role:
        'Design Lead in the product squad that built and deployed SQOOL Classe, for nearly two years, alongside the CPO, 5 designers, product managers and developers. My scope covered ideation workshops on supervision and screen projection, and the vision of turning a monitoring tool into a collaboration medium between teachers and students.',
      roleItems: [
        { title: 'Design Lead', detail: 'Product squad, nearly 2 years' },
        { title: 'Field research', detail: 'Classroom observation' },
        { title: 'Design system', detail: 'SQOOL suite' },
        { title: 'Design team', detail: '5 designers' },
      ],
      deliverables: [
        { title: 'Teacher grid view', detail: 'One tile per student: name, active application, battery and connection state. 32 students readable at once.' },
        { title: 'Screen sharing', detail: 'The teacher shares a full screen or one window, and an indicator confirms the sharing is active and received.' },
        { title: 'Document distribution', detail: 'Documents from local storage or Google Drive reach the tablets, with a timestamped notification.' },
        { title: 'Student experience', detail: 'A class view and a group view, each with its own resources, messages and instructions.' },
        { title: 'Student interactions', detail: 'Six ways to reach the teacher without disrupting the class.' },
        { title: 'Joining a class', detail: 'A code or a QR code from the student’s tablet. No login, no password, no setup.' },
      ],
      metrics: [
        { value: '500,000', label: 'Students and teachers given a tablet' },
        { value: '465', label: 'Schools equipped across Île-de-France' },
        { value: '30s', label: 'Average class setup time with QR code join' },
      ],
    },
    acts: {
      stakes: 'Thirty open screens and no tool to hold them',
      approach: 'The student card, the actions at hand, a discreet student',
      deliverables: 'Nine modules for the whole lesson',
      outcome: 'A reference app, and a network the design cannot fix',
    },
    stakes: {
      text1:
        'When the region equipped every student with a tablet, each classroom ended up with thirty open screens. Checking that everyone is on the right app, managing distractions, reacting when a tablet stops responding: all of it came on top of the pace of a lesson with thirty teenagers. Existing tools ranged from invasive surveillance to fragility on school Wi-Fi.',
      text2:
        'The starting question was how to give a teacher a view of thirty tablets without turning the classroom into a control room. I set three principles, checked during classroom observations and tests with teachers.',
      principlesTitle: 'Three principles behind every decision',
      principles: [
        { title: 'Instant readability', text: 'The teacher reads the state of the whole class at a glance, between two explanations at the board.' },
        { title: 'One-gesture action', text: 'Locking the tablets, sending a document or projecting content takes a single gesture.' },
        { title: 'A calm interface', text: 'Information density is set to reassure. Visual alerts are kept for situations that call for them.' },
      ],
    },
    approach: {
      card: {
        title: 'The student card as the unit of reading',
        text:
          'Each student gets one tile: name, active application, battery and connection state. Nothing more, so the grid reads between two explanations at the board, with 32 students visible at once. Color is kept for states that call for action, such as a low battery or an off-task student. Device states (off, idle, live, projecting) are explicit, so the teacher never wonders whether the data is current.',
      },
      actions: {
        title: 'Actions that never take the teacher off the grid',
        text:
          'Lock, project, group and distribute live in a permanent command panel with large touch targets, usable on a tablet as on a computer. The teacher is standing and looks at the screen between two sentences: acting must never require changing view. When the teacher shares a screen, an indicator confirms students are receiving it, which avoids the “can everyone see my screen?” that breaks the pace of a lesson.',
      },
      student: {
        title: 'A student who shows up only when there is something to do',
        text:
          'On the student side, SQOOL Classe appears to join a session, receive a document or answer a poll. The rest of the time the tablet stays an ordinary work tool, and the student works without feeling watched. To join a class, students type a four-digit code shown on the teacher’s screen, or scan a QR code: no account, no password, no setup, because if students cannot connect, the teacher cannot supervise anything.',
      },
      scenarios: {
        title: 'Ten full lessons to check the sequence',
        text:
          'Isolated screens do not say whether functions chain together. I prototyped 42 interactive flows with GSAP animations: 25 for the teacher, 7 for the student and 10 full lessons, from opening the class to an exam. These scenarios checked that a real lesson, with its device restrictions and the collection of student work, holds together without a break.',
      },
    },
    deliverables: {
      text:
        'SQOOL Classe groups nine modules, designed for the whole lesson rather than supervision alone. The exam and assignment mode answers a request from schools: beyond screen projection, they expected settings and restrictions on device use.',
      modulesTitle: 'Modules delivered',
      modules: [
        'Student grid with live status and screen previews',
        'One-gesture classroom controls (lock, project, share, group)',
        'Messaging between teacher and students',
        'Distribution of documents, files and links',
        'Live polling and shared timer',
        'Session management (open, close, history)',
        'Assignment and exam mode with device restrictions',
        'Student-side tablet experience',
        'URL filtering and content restriction',
      ],
    },
    outcome: {
      text:
        'SQOOL Classe became the reference app of the suite. A class connects in 30 seconds on average, and its real-time and data visualization patterns served as the base for the apps that followed. Pilot teachers report a gain in composure and less time spent managing tablets.',
      quote: 'For the first time, I felt I could manage my classroom without raising my voice. SQOOL Classe gave me back my composure.',
      quoteAuthor: 'Teacher',
      quoteRole: 'Test pilot',
      openTitle: 'What stays open',
      open:
        'Use depends on the reliability of each school’s network. Screen projection needs a stable signal between the tablets, the middleware and the teacher’s computer. We chose to show the connection state rather than hide it, but the school network stays outside what design can settle.',
      readSuite: 'Read the SQOOL suite case study',
    },
    ui: {
      prev: 'Previous visual',
      next: 'Next visual',
      slide: 'Visual',
      actionsLabel: 'Sharing and distributing from the teacher view',
      studentLabel: 'The student side of SQOOL Classe',
      deliverablesLabel: 'Starting a class, sharing a link and collecting feedback',
      scenariosLabel: 'Interactive prototypes of full lessons',
      protoPlay: 'Play the prototype',
      protoPause: 'Pause',
      protoReplay: 'Replay',
      protoExpand: 'Open larger',
      protoClose: 'Close',
    },
    imageCaptions: {
      thumb: 'SQOOL Classe',
      dashboard: 'Starting a class',
      obs1: 'Field observation: live student screen monitoring, Collège Jean Vilar',
      obs2: 'Real-world testing: handling connection states',
      obs3: 'Teacher navigating student view during class',
      obs4: 'Student side: a transparent, non-intrusive supervision notification',
      grid: 'Teacher grid view: every student visible, every action accessible',
      groupView: 'Class view and group view on the student tablet',
      shareChoose: 'Choose what to share: full screen or a specific window',
      shareActive: 'Screen sharing in progress: the teacher sees their screen and the students at once',
      sendDoc: 'Send a document directly from Google Drive, in one gesture',
      studentHome: 'Student home: all classrooms with key info at a glance',
      studentClass: 'Class view: classmates, course resources, teacher messages',
      studentGroup: 'Group view: a dedicated space with its own resources and instructions',
      studentInteractions: 'Six ways to communicate with the teacher, without disrupting the class',
      linkShare: 'Link sharing to the whole class: every browser opens the same page',
      inviteCode: 'Invitation code: students join the class in seconds',
      feedback: 'Built-in feedback collection for continuous product improvement',
    },
  },
  fr: {
    metaLabels: { role: 'Rôle', scope: 'Périmètre', company: 'Entreprise' },
    meta: { company: 'UNOWHY / SQOOL' },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Supervision temps réel, UX Classe',
      title: 'Donner aux enseignants la sérénité de faire cours dans une classe numérique',
      intro:
        'SQOOL Classe est l’application web que j’ai conçue pour que les enseignants gardent la maîtrise de 30 tablettes ouvertes pendant un cours. Elle est devenue l’application de référence de la suite SQOOL, et une classe s’y connecte en 30 secondes en moyenne.',
    },
    heroTestimonial: {
      quote:
        'J’ai eu la chance de collaborer avec Victor pendant 3 ans en binôme et c’est l’un des designers les plus inspirants avec qui j’ai travaillé. Victor allie une créativité débordante à une rigueur de travail impressionnante. Il sait traduire des visions complexes en expériences utilisateur claires et percutantes. Toujours à l’écoute, curieux, il pousse constamment les réflexions plus loin, que ce soit sur le fond ou sur la forme. J’ai particulièrement apprécié notre capacité à co-construire\u00a0: il n’a pas peur de challenger les idées tout en restant dans une posture bienveillante, tournée vers la qualité du produit et l’impact utilisateur. Je le recommande à toute équipe qui cherche un Lead Design à la fois créatif, exigeant, et profondément humain.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY',
    },
    summary: {
      context:
        'La Région Île-de-France a distribué une tablette à chacun des 500 000 élèves et enseignants de 465 lycées. Dans chaque classe, cela donnait 30 écrans allumés, et aucun outil adapté pour garder la maîtrise de la séance. Les solutions existantes oscillaient entre surveillance invasive et fragilité technique.',
      role:
        'Design Lead dans l’équipe produit chargée de réaliser et de déployer SQOOL Classe, pendant près de deux ans, aux côtés de la CPO, de 5 designers, de chefs de produit et de développeurs. Mon périmètre couvrait les ateliers d’idéation sur la supervision et la projection d’écrans, et la vision d’un outil de suivi devenu médium de collaboration entre enseignants et élèves.',
      roleItems: [
        { title: 'Design Lead', detail: 'Équipe produit, près de 2 ans' },
        { title: 'Recherche terrain', detail: 'Observation en classe' },
        { title: 'Design system', detail: 'Suite SQOOL' },
        { title: 'Équipe design', detail: '5 designers' },
      ],
      deliverables: [
        { title: 'Grille enseignant', detail: 'Une tuile par élève\u00a0: nom, application active, batterie, état de connexion. 32 élèves lisibles en même temps.' },
        { title: 'Partage d’écran', detail: 'L’enseignant partage un écran complet ou une fenêtre, et un indicateur confirme que le partage est actif et bien reçu.' },
        { title: 'Distribution de documents', detail: 'Les documents du stockage local ou de Google Drive arrivent sur les tablettes, avec une notification horodatée.' },
        { title: 'Expérience élève', detail: 'Une vue classe et une vue groupe, chacune avec ses ressources, ses messages et ses consignes.' },
        { title: 'Interactions élève', detail: 'Six façons de joindre l’enseignant sans déranger la classe.' },
        { title: 'Rejoindre une classe', detail: 'Un code ou un QR code depuis la tablette de l’élève. Sans identifiant, sans mot de passe, sans configuration.' },
      ],
      metrics: [
        { value: '500 000', label: 'Élèves et enseignants dotés d’une tablette' },
        { value: '465', label: 'Établissements équipés en Île-de-France' },
        { value: '30 s', label: 'Pour ouvrir une séance et connecter toute la classe' },
      ],
    },
    acts: {
      stakes: 'Trente écrans allumés, aucun outil pour les tenir',
      approach: 'La carte élève, des actions à portée de main, un élève discret',
      deliverables: 'Neuf modules pour toute la séance',
      outcome: 'Une application de référence, et un réseau que le design ne règle pas',
    },
    stakes: {
      text1:
        'Quand la Région a équipé chaque élève d’une tablette, chaque salle de classe s’est retrouvée avec trente écrans allumés. Vérifier que chacun est sur la bonne application, gérer les distractions, réagir quand une tablette ne répond plus\u00a0: tout cela s’ajoutait au rythme d’un cours de trente adolescents. Les outils existants oscillaient entre surveillance invasive et fragilité sur le Wi-Fi des établissements.',
      text2:
        'La question de départ\u00a0: comment donner à l’enseignant une vue sur trente tablettes sans transformer la classe en salle de contrôle\u00a0? J’ai posé trois principes, vérifiés pendant les observations en classe et les tests avec des enseignants.',
      principlesTitle: 'Trois principes derrière chaque décision',
      principles: [
        { title: 'Lisibilité immédiate', text: 'L’enseignant lit l’état de toute la classe en un regard, entre deux explications au tableau.' },
        { title: 'Action en un geste', text: 'Verrouiller les tablettes, envoyer un document ou projeter un contenu tient en un seul geste.' },
        { title: 'Interface apaisante', text: 'La densité d’information est calibrée pour rassurer. Les alertes visuelles sont réservées aux situations qui le justifient.' },
      ],
    },
    approach: {
      card: {
        title: 'La carte élève comme unité de lecture',
        text:
          'Chaque élève occupe une tuile\u00a0: nom, application active, batterie, état de connexion. Rien de plus, pour que la grille se lise entre deux explications au tableau, avec 32 élèves visibles en même temps. La couleur est réservée aux états qui demandent une action, comme une batterie faible ou un élève hors sujet. Les états de l’appareil (éteint, inactif, en direct, en projection) sont explicites, pour que l’enseignant ne se demande jamais si la donnée est à jour.',
      },
      actions: {
        title: 'Des actions qui ne font jamais quitter la grille',
        text:
          'Verrouiller, projeter, grouper et distribuer vivent dans un panneau de commandes permanent, avec de larges zones tactiles, utilisable sur tablette comme sur ordinateur. L’enseignant est debout et regarde l’écran entre deux phrases\u00a0: agir ne doit jamais demander de changer de vue. Quand il partage son écran, un indicateur confirme que les élèves le reçoivent, ce qui évite le «\u202ftout le monde voit mon écran\u00a0?\u202f» qui casse le rythme du cours.',
      },
      student: {
        title: 'Un élève qui n’apparaît que lorsqu’il y a quelque chose à faire',
        text:
          'Côté élève, SQOOL Classe se montre pour rejoindre une séance, recevoir un document ou répondre à un sondage. Le reste du temps, la tablette reste un outil de travail ordinaire, et l’élève travaille sans se sentir surveillé. Pour rejoindre une classe, il saisit un code à quatre chiffres affiché sur l’écran de l’enseignant, ou scanne un QR code\u00a0: ni compte, ni mot de passe, ni configuration, car sans connexion des élèves, l’enseignant ne peut rien superviser.',
      },
      scenarios: {
        title: 'Dix séances complètes pour vérifier l’enchaînement',
        text:
          'Des écrans isolés ne disent pas si les fonctions s’enchaînent. J’ai donc prototypé 42 flux interactifs en animations GSAP\u00a0: 25 pour l’enseignant, 7 pour l’élève et 10 séances complètes, de l’ouverture de la classe à un examen. Ces scénarios servaient à vérifier qu’une séance réelle, avec ses restrictions d’appareils et la récupération des copies, tient sans rupture.',
      },
    },
    deliverables: {
      text:
        'SQOOL Classe regroupe neuf modules, pensés pour toute la séance plutôt que pour la seule supervision. Le mode devoir et examen répond à une demande des établissements\u00a0: au-delà de la projection d’écran, ils attendaient du paramétrage et des restrictions d’usage des appareils.',
      modulesTitle: 'Modules livrés',
      modules: [
        'Grille élèves avec statuts temps réel et aperçu des écrans',
        'Commandes de classe en un geste (verrouiller, projeter, partager, grouper)',
        'Messagerie entre l’enseignant et les élèves',
        'Distribution de documents, de fichiers et de liens',
        'Sondage en direct et minuteur partagé',
        'Gestion des séances (ouverture, clôture, historique)',
        'Mode devoir et examen avec restrictions des appareils',
        'Expérience côté tablette élève',
        'Filtrage d’URL et restriction de contenu',
      ],
    },
    outcome: {
      text:
        'SQOOL Classe est devenue l’application de référence de la suite. Une classe s’y connecte en 30 secondes en moyenne, et ses schémas de temps réel et de visualisation de données ont servi de base aux applications suivantes. Les enseignants pilotes rapportent un gain de sérénité et moins de temps passé à gérer les tablettes.',
      quote: 'Pour la première fois, j’ai senti que je pouvais gérer ma classe sans élever la voix. SQOOL Classe m’a redonné de la sérénité.',
      quoteAuthor: 'Enseignante',
      quoteRole: 'Pilote de test',
      openTitle: 'Ce qui reste ouvert',
      open:
        'L’usage dépend de la fiabilité du réseau de chaque établissement. La projection d’écran exige un signal stable entre les tablettes, l’intergiciel et l’ordinateur de l’enseignant. Nous avons choisi de montrer l’état de la connexion plutôt que de le masquer, mais le réseau de l’établissement reste hors de ce que le design peut régler.',
      readSuite: 'Lire l’étude de la suite SQOOL',
    },
    ui: {
      prev: 'Visuel précédent',
      next: 'Visuel suivant',
      slide: 'Visuel',
      actionsLabel: 'Partager et distribuer depuis la vue enseignant',
      studentLabel: 'Le côté élève de SQOOL Classe',
      deliverablesLabel: 'Ouvrir une classe, partager un lien et recueillir des retours',
      scenariosLabel: 'Prototypes interactifs de séances complètes',
      protoPlay: 'Lancer le prototype',
      protoPause: 'Pause',
      protoReplay: 'Rejouer',
      protoExpand: 'Agrandir',
      protoClose: 'Fermer',
    },
    imageCaptions: {
      thumb: 'SQOOL Classe',
      dashboard: 'Ouvrir une classe',
      obs1: 'Observation terrain\u00a0: suivi des écrans élèves en temps réel, collège Jean Vilar',
      obs2: 'Test en conditions réelles\u00a0: gestion des connexions et déconnexions',
      obs3: 'L’enseignant navigue dans la vue élèves pendant le cours',
      obs4: 'Côté élève\u00a0: la notification de supervision, transparente et non intrusive',
      grid: 'Vue grille enseignant\u00a0: chaque élève visible, chaque action accessible',
      groupView: 'Vue classe et vue groupe sur la tablette élève',
      shareChoose: 'Choisir quoi partager\u00a0: un écran complet ou une fenêtre spécifique',
      shareActive: 'Partage en cours\u00a0: l’enseignant voit son écran et ses élèves simultanément',
      sendDoc: 'Envoyer un document directement depuis Google Drive, en un geste',
      studentHome: 'L’accueil élève\u00a0: toutes les salles de classe, avec l’essentiel visible d’un coup d’œil',
      studentClass: 'Vue classe\u00a0: les camarades, les ressources du cours, les messages du professeur',
      studentGroup: 'Vue groupe\u00a0: un espace dédié avec ses propres ressources et consignes',
      studentInteractions: 'Six façons de communiquer avec l’enseignant, sans déranger la classe',
      linkShare: 'Partage de lien vers toute la classe\u00a0: chaque navigateur ouvre la même page',
      inviteCode: 'Code d’invitation\u00a0: les élèves rejoignent la classe en quelques secondes',
      feedback: 'Recueil de retours intégré pour améliorer le produit en continu',
    },
  },
}
