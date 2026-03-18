// SQOOL Classe Prototypes - Central data source
// All 42 prototypes with bilingual labels and section groupings

export type PrototypeCategory = 'teacher' | 'student' | 'scenario';

export interface PrototypeItem {
  id: string;
  category: PrototypeCategory;
  title: { en: string; fr: string };
  desc: { en: string; fr: string };
}

// Prototypes served locally from public/prototypes/ (no external dependency)
export const UI_MOTION_BASE_URL = '/prototypes';

export const CATEGORY_COLORS = {
  teacher: { bg: 'bg-blue-600/20', bgLight: 'bg-blue-50', text: 'text-blue-400', textLight: 'text-blue-700', dot: 'bg-blue-500' },
  student: { bg: 'bg-green-600/20', bgLight: 'bg-green-50', text: 'text-green-400', textLight: 'text-green-700', dot: 'bg-green-500' },
  scenario: { bg: 'bg-purple-600/20', bgLight: 'bg-purple-50', text: 'text-purple-400', textLight: 'text-purple-700', dot: 'bg-purple-500' },
} as const;

export const CATEGORY_LABELS = {
  teacher: { en: 'Teacher flows', fr: 'Flux enseignant' },
  student: { en: 'Student flows', fr: 'Flux \u00e9l\u00e8ve' },
  scenario: { en: 'Full scenarios', fr: 'Sc\u00e9narios complets' },
} as const;

export const PROTOTYPES: PrototypeItem[] = [
  // Teacher flows (T1-T25)
  { id: 'T1', category: 'teacher', title: { en: 'Open class via QR code', fr: 'Ouvrir la classe (QR code)' }, desc: { en: 'The teacher displays a QR code. Students scan it to join in seconds.', fr: 'L\u2019enseignant affiche un QR code. Les \u00e9l\u00e8ves le scannent et rejoignent en quelques secondes.' } },
  { id: 'T2', category: 'teacher', title: { en: 'Activate interactions', fr: 'Activer les interactions' }, desc: { en: 'Enable messaging, file sharing, and hand-raising for the session.', fr: 'Activer la messagerie, le partage de fichiers et la lev\u00e9e de main pour la s\u00e9ance.' } },
  { id: 'T3', category: 'teacher', title: { en: 'Display student screens', fr: 'Afficher les \u00e9crans' }, desc: { en: 'Live thumbnails of each student screen. See who is working, who has drifted.', fr: 'Vignettes en direct de chaque \u00e9cran \u00e9l\u00e8ve. Voir qui travaille, qui a d\u00e9croch\u00e9.' } },
  { id: 'T4', category: 'teacher', title: { en: 'Read student messages', fr: 'Consulter les messages' }, desc: { en: 'Check incoming questions from students without interrupting the lesson.', fr: 'Lire les questions des \u00e9l\u00e8ves sans interrompre le cours.' } },
  { id: 'T5', category: 'teacher', title: { en: 'Lock all screens', fr: 'Verrouiller les \u00e9crans' }, desc: { en: 'One tap freezes every tablet. Visual confirmation on each student card.', fr: 'Un seul tap g\u00e8le toutes les tablettes. Confirmation visuelle sur chaque carte.' } },
  { id: 'T6', category: 'teacher', title: { en: 'Send a resource', fr: 'Envoyer une ressource' }, desc: { en: 'Distribute a document or file to the entire class or a specific group.', fr: 'Distribuer un document ou un fichier \u00e0 toute la classe ou \u00e0 un groupe.' } },
  { id: 'T7', category: 'teacher', title: { en: 'Project teacher screen', fr: 'Projeter son \u00e9cran' }, desc: { en: 'Share the teacher screen on all student tablets in one gesture.', fr: 'Partager l\u2019\u00e9cran enseignant sur toutes les tablettes d\u2019un seul geste.' } },
  { id: 'T8', category: 'teacher', title: { en: 'Take remote control', fr: 'Prendre la main' }, desc: { en: 'Access a student device remotely to troubleshoot or demonstrate.', fr: 'Acc\u00e9der \u00e0 distance \u00e0 l\u2019appareil d\u2019un \u00e9l\u00e8ve pour d\u00e9panner ou montrer.' } },
  { id: 'T9', category: 'teacher', title: { en: 'Create student groups', fr: 'Cr\u00e9er des groupes' }, desc: { en: 'Drag student cards to form sub-groups for differentiated instruction.', fr: 'Glisser les cartes \u00e9l\u00e8ves pour constituer des sous-groupes de travail.' } },
  { id: 'T10', category: 'teacher', title: { en: 'Launch a live poll', fr: 'Lancer un sondage' }, desc: { en: 'Send a question to all students and watch results arrive in real time.', fr: 'Envoyer une question \u00e0 toute la classe et voir les r\u00e9sultats en temps r\u00e9el.' } },
  { id: 'T11', category: 'teacher', title: { en: 'Reply to a student', fr: 'R\u00e9pondre \u00e0 un \u00e9l\u00e8ve' }, desc: { en: 'Respond directly from the message panel, without switching screens.', fr: 'R\u00e9pondre directement depuis le panneau de messages, sans changer d\u2019\u00e9cran.' } },
  { id: 'T12', category: 'teacher', title: { en: 'Feature 3 screens', fr: 'Mettre 3 \u00e9crans en avant' }, desc: { en: 'Select up to 3 student screens and display them to the entire class.', fr: 'S\u00e9lectionner jusqu\u2019\u00e0 3 \u00e9crans d\u2019\u00e9l\u00e8ves et les afficher \u00e0 toute la classe.' } },
  { id: 'T13', category: 'teacher', title: { en: 'Annotate a projected assignment', fr: 'Annoter un devoir projet\u00e9' }, desc: { en: 'Draw and comment on a student assignment projected to the class.', fr: 'Dessiner et commenter sur un devoir d\u2019\u00e9l\u00e8ve projet\u00e9 \u00e0 la classe.' } },
  { id: 'T14', category: 'teacher', title: { en: 'Scan and send', fr: 'Scanner et envoyer' }, desc: { en: 'Scan a physical document and distribute it digitally to the class.', fr: 'Scanner un document papier et le distribuer num\u00e9riquement \u00e0 la classe.' } },
  { id: 'T15', category: 'teacher', title: { en: 'End session', fr: 'Fin de s\u00e9ance' }, desc: { en: 'Close the session, view a summary of interactions and shared resources.', fr: 'Fermer la s\u00e9ance, consulter le r\u00e9capitulatif des interactions et ressources.' } },
  { id: 'T16', category: 'teacher', title: { en: 'Share a web link', fr: 'Partager un lien web' }, desc: { en: 'Push a URL to every student browser instantly. No dictation needed.', fr: 'Envoyer une URL sur le navigateur de chaque \u00e9l\u00e8ve instantan\u00e9ment.' } },
  { id: 'T17', category: 'teacher', title: { en: 'Launch a timer', fr: 'Lancer un minuteur' }, desc: { en: 'Start a shared countdown visible on all tablets for timed exercises.', fr: 'D\u00e9marrer un compte \u00e0 rebours partag\u00e9 visible sur toutes les tablettes.' } },
  { id: 'T18', category: 'teacher', title: { en: 'Random groups', fr: 'Groupes al\u00e9atoires' }, desc: { en: 'Generate balanced groups with one tap for collaborative exercises.', fr: 'G\u00e9n\u00e9rer des groupes \u00e9quilibr\u00e9s en un tap pour les exercices collaboratifs.' } },
  { id: 'T19', category: 'teacher', title: { en: 'Access past sessions', fr: 'Acc\u00e9der aux s\u00e9ances' }, desc: { en: 'Browse the history of previous sessions, resources, and student data.', fr: 'Parcourir l\u2019historique des s\u00e9ances pass\u00e9es, ressources et donn\u00e9es \u00e9l\u00e8ves.' } },
  { id: 'T20', category: 'teacher', title: { en: 'New session', fr: 'Nouvelle s\u00e9ance' }, desc: { en: 'Create and configure a new teaching session from scratch.', fr: 'Cr\u00e9er et configurer une nouvelle s\u00e9ance d\u2019enseignement.' } },
  { id: 'T21', category: 'teacher', title: { en: 'Assignment mode', fr: 'Mode devoir' }, desc: { en: 'Configure a timed exercise with browser lock and automatic collection.', fr: 'Configurer un exercice chronom\u00e9tr\u00e9 avec verrouillage et collecte automatique.' } },
  { id: 'T22', category: 'teacher', title: { en: 'Official exam setup', fr: 'Examen officiel, configuration' }, desc: { en: 'Set up exam parameters: duration, allowed apps, restriction level.', fr: 'Param\u00e9trer l\u2019examen\u00a0: dur\u00e9e, applications autoris\u00e9es, niveau de restriction.' } },
  { id: 'T23', category: 'teacher', title: { en: 'Exam monitoring', fr: 'Examen, surveillance' }, desc: { en: 'Supervise 32 stations in parallel with real-time progress indicators.', fr: 'Superviser 32 postes en parall\u00e8le avec indicateurs d\u2019avancement en temps r\u00e9el.' } },
  { id: 'T24', category: 'teacher', title: { en: 'Exam summary and copies', fr: 'Examen, r\u00e9cap et copies' }, desc: { en: 'Review submissions, check delivery status, retrieve all files at once.', fr: 'Consulter les copies, v\u00e9rifier les statuts de remise, r\u00e9cup\u00e9rer les fichiers.' } },
  { id: 'T25', category: 'teacher', title: { en: 'View a student screen', fr: 'Voir l\u2019\u00e9cran d\u2019un \u00e9l\u00e8ve' }, desc: { en: 'Open a student screen full-size with carousel navigation across the class.', fr: 'Ouvrir l\u2019\u00e9cran d\u2019un \u00e9l\u00e8ve en grand avec navigation en carrousel.' } },
  // Student flows (S1-S7)
  { id: 'S1', category: 'student', title: { en: 'Login and scan QR', fr: 'Login et scan QR' }, desc: { en: 'The student scans the QR code and joins. No account, no password.', fr: 'L\u2019\u00e9l\u00e8ve scanne le QR code et rejoint. Pas de compte, pas de mot de passe.' } },
  { id: 'S2', category: 'student', title: { en: 'Access resources', fr: 'Consulter les ressources' }, desc: { en: 'Documents shared by the teacher appear in a simple, chronological list.', fr: 'Les documents partag\u00e9s apparaissent dans une liste simple et chronologique.' } },
  { id: 'S3', category: 'student', title: { en: 'Signal completion', fr: 'Signaler \u00ab\u00a0J\u2019ai termin\u00e9\u00a0\u00bb' }, desc: { en: 'The student signals they have finished. The teacher sees it on the grid.', fr: 'L\u2019\u00e9l\u00e8ve signale qu\u2019il a fini. L\u2019enseignant le voit sur sa grille.' } },
  { id: 'S4', category: 'student', title: { en: 'Ask a question', fr: 'Poser une question' }, desc: { en: 'Send a question to the teacher without interrupting the class.', fr: 'Envoyer une question \u00e0 l\u2019enseignant sans interrompre la classe.' } },
  { id: 'S5', category: 'student', title: { en: 'Share a document', fr: 'Partager un document' }, desc: { en: 'Submit a file directly to the teacher. Timestamped and confirmed.', fr: 'Envoyer un fichier \u00e0 l\u2019enseignant. Le rendu est horodat\u00e9 et confirm\u00e9.' } },
  { id: 'S6', category: 'student', title: { en: 'Receive a resource', fr: 'Recevoir une ressource' }, desc: { en: 'A notification appears when the teacher shares a resource.', fr: 'Une notification appara\u00eet quand l\u2019enseignant partage une ressource.' } },
  { id: 'S7', category: 'student', title: { en: 'Locked screen', fr: '\u00c9cran verrouill\u00e9' }, desc: { en: 'When the teacher locks tablets, a calm, readable screen appears.', fr: 'Quand l\u2019enseignant verrouille les tablettes, un \u00e9cran sobre et clair s\u2019affiche.' } },
  // Full scenarios (SC1-SC10)
  { id: 'SC1', category: 'scenario', title: { en: 'Start and distribute', fr: 'D\u00e9marrer et distribuer' }, desc: { en: 'Open the session, share lesson materials, students receive them on their tablets.', fr: 'Ouvrir la s\u00e9ance, partager les ressources, les \u00e9l\u00e8ves les re\u00e7oivent sur leur tablette.' } },
  { id: 'SC2', category: 'scenario', title: { en: 'Observe and intervene', fr: 'Observer et intervenir' }, desc: { en: 'Monitor student activity, spot issues, and intervene without disrupting the class.', fr: 'Surveiller l\u2019activit\u00e9, rep\u00e9rer les difficult\u00e9s, intervenir sans perturber la classe.' } },
  { id: 'SC3', category: 'scenario', title: { en: 'Differentiate learning paths', fr: 'Diff\u00e9rencier les parcours' }, desc: { en: 'Create groups and distribute different resources based on student level.', fr: 'Cr\u00e9er des groupes et distribuer des ressources adapt\u00e9es au niveau de chacun.' } },
  { id: 'SC4', category: 'scenario', title: { en: 'Assess in real time', fr: '\u00c9valuer en direct' }, desc: { en: 'Launch a quick poll or quiz to gauge comprehension mid-lesson.', fr: 'Lancer un sondage ou un quiz pour mesurer la compr\u00e9hension en cours de le\u00e7on.' } },
  { id: 'SC5', category: 'scenario', title: { en: 'Collaborate and submit', fr: 'Collaborer et rendre' }, desc: { en: 'Students work in groups, share documents, and submit their work.', fr: 'Les \u00e9l\u00e8ves travaillent en groupes, partagent des documents et rendent leur travail.' } },
  { id: 'SC6', category: 'scenario', title: { en: 'Scan and distribute', fr: 'Scanner et distribuer' }, desc: { en: 'Scan a paper document and push it to the entire class digitally.', fr: 'Scanner un document papier et le distribuer num\u00e9riquement \u00e0 toute la classe.' } },
  { id: 'SC7', category: 'scenario', title: { en: 'Complete official exam', fr: 'Examen officiel complet' }, desc: { en: 'Full exam journey: setup, monitoring 32 students, collecting digital copies.', fr: 'Parcours complet d\u2019un examen\u00a0: configuration, surveillance de 32 \u00e9l\u00e8ves, collecte des copies.' } },
  { id: 'SC8', category: 'scenario', title: { en: 'Classroom assessment', fr: 'Contr\u00f4le en classe' }, desc: { en: 'Run a structured in-class evaluation with timed exercises and restrictions.', fr: 'Mener une \u00e9valuation structur\u00e9e avec exercices chronom\u00e9tr\u00e9s et restrictions.' } },
  { id: 'SC9', category: 'scenario', title: { en: 'Showcase student work', fr: 'Valoriser un travail' }, desc: { en: 'Feature selected student screens to the class for discussion and feedback.', fr: 'Projeter des \u00e9crans d\u2019\u00e9l\u00e8ves s\u00e9lectionn\u00e9s pour discussion et retour collectif.' } },
  { id: 'SC10', category: 'scenario', title: { en: 'Full session A to Z', fr: 'S\u00e9ance compl\u00e8te de A \u00e0 Z' }, desc: { en: 'A complete lesson walkthrough: opening, teaching, interactions, assessment, closing.', fr: 'D\u00e9roul\u00e9 d\u2019un cours entier\u00a0: ouverture, enseignement, interactions, \u00e9valuation et cl\u00f4ture.' } },
];

// Lookup map for quick access
export const PROTOTYPE_MAP = new Map(PROTOTYPES.map(p => [p.id, p]));

// Case study section groupings (which prototypes appear in each carousel)
// highlightIds: 2-3 best prototypes shown in case study (progressive disclosure)
// prototypeIds: full list for gallery view and lightbox navigation
export const CASE_STUDY_SECTIONS = [
  { sectionId: 'grid', highlightIds: ['T1', 'T3', 'T5'], prototypeIds: ['T1', 'T3', 'T5', 'T25', 'T2'], galleryCategory: 'teacher' as const },
  { sectionId: 'orchestration', highlightIds: ['T9', 'T18'], prototypeIds: ['T9', 'T18', 'T12', 'T7', 'T8', 'T13'], galleryCategory: 'teacher' as const },
  { sectionId: 'communication', highlightIds: ['T10', 'T11'], prototypeIds: ['T10', 'T11', 'T4', 'T16', 'T17', 'T6'], galleryCategory: 'teacher' as const },
  { sectionId: 'sessions', highlightIds: ['T20', 'T22'], prototypeIds: ['T19', 'T20', 'T21', 'T22', 'T23', 'T24', 'T15'], galleryCategory: 'teacher' as const },
  { sectionId: 'students', highlightIds: ['S1', 'S4'], prototypeIds: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'], galleryCategory: 'student' as const },
  { sectionId: 'journeys', highlightIds: ['SC1', 'SC7', 'SC10'], prototypeIds: ['SC1', 'SC2', 'SC3', 'SC4', 'SC5', 'SC6', 'SC7', 'SC8', 'SC9', 'SC10'], galleryCategory: 'scenario' as const },
] as const;

// Gallery categories
export const GALLERY_CATEGORIES = [
  { id: 'teacher' as const, prototypeIds: PROTOTYPES.filter(p => p.category === 'teacher').map(p => p.id) },
  { id: 'student' as const, prototypeIds: PROTOTYPES.filter(p => p.category === 'student').map(p => p.id) },
  { id: 'scenario' as const, prototypeIds: PROTOTYPES.filter(p => p.category === 'scenario').map(p => p.id) },
];

// Executive summary key prototypes
export const EXECUTIVE_PROTOTYPES = ['T1', 'SC1', 'SC7', 'SC10'];

// Helper to get ALL prototypes for a section (gallery + lightbox)
export function getPrototypesForSection(sectionId: string): PrototypeItem[] {
  const section = CASE_STUDY_SECTIONS.find(s => s.sectionId === sectionId);
  if (!section) return [];
  return section.prototypeIds.map(id => PROTOTYPE_MAP.get(id)).filter(Boolean) as PrototypeItem[];
}

// Helper to get HIGHLIGHT prototypes for case study view (2-3 per section)
export function getHighlightsForSection(sectionId: string): PrototypeItem[] {
  const section = CASE_STUDY_SECTIONS.find(s => s.sectionId === sectionId);
  if (!section) return [];
  return section.highlightIds.map(id => PROTOTYPE_MAP.get(id)).filter(Boolean) as PrototypeItem[];
}

// Get gallery category for a section (for "See all" deep linking)
export function getGalleryCategoryForSection(sectionId: string): string | null {
  const section = CASE_STUDY_SECTIONS.find(s => s.sectionId === sectionId);
  return section?.galleryCategory ?? null;
}

// Helper to build iframe URL (always autoplay=0, controlled via postMessage)
// Explicit index.html required: Vite dev server falls back to SPA for directory URLs
export function getIframeSrc(prototypeId: string): string {
  return `${UI_MOTION_BASE_URL}/index.html?embed=1&speed=0.8&autoplay=0#${prototypeId.toLowerCase()}`;
}

// Extended prototype info (interaction, concept, UX strategy, outcome)
export interface PrototypeDetail {
  interaction?: string;
  concept?: string;
  uxStrategy?: string;
  outcome?: string;
}

export const PROTOTYPE_DETAILS: Record<string, PrototypeDetail> = {
  T1: { interaction: 'L\'enseignant affiche un QR code plein écran. Les élèves le scannent avec leur tablette. Les cartes apparaissent une à une avec le statut « Connecté » ou « Absent ».', concept: 'Connexion visuelle et progressive. Chaque élève qui rejoint la classe génère un feedback immédiat sur l\'écran de l\'enseignant.', uxStrategy: 'Progressive disclosure : les cartes arrivent une par une pour créer un sentiment de classe vivante. Le compteur rassure l\'enseignant sur l\'avancement.', outcome: 'L\'enseignant lance sa séance en 30 secondes et sait exactement qui est présent sans faire l\'appel.' },
  T2: { interaction: 'L\'enseignant active le suivi en temps réel. Des badges colorés (terminé, question, main levée) s\'affichent sur chaque carte élève.', concept: 'Feedback ambient : les badges fournissent une information contextuelle sans interrompre le flux de la séance.', uxStrategy: 'Signalétique intuitive par couleur et icône. Pas de notification intrusive : l\'information est là, visible, mais non bloquante.', outcome: 'L\'enseignant identifie les élèves qui ont terminé, ceux qui ont besoin d\'aide, et ceux qui lèvent la main, sans aucune interruption.' },
  T3: { interaction: 'L\'enseignant clique sur « Afficher les écrans ». Les cartes passent du mode avatar + statut au mode miniature d\'écran.', concept: 'Supervision non intrusive. L\'enseignant voit l\'activité réelle sans prendre le contrôle.', uxStrategy: 'Transition fluide entre les deux modes de vue (avatar → écran). Les miniatures sont suffisamment grandes pour identifier l\'activité sans zoom.', outcome: 'L\'enseignant repère instantanément qui travaille, qui est bloqué, et qui navigue hors-sujet.' },
  T4: { interaction: 'L\'enseignant ouvre le panneau latéral de messages. Chaque message affiche le nom de l\'élève, le contenu et l\'heure.', concept: 'Canal de communication asynchrone et silencieux. Les élèves peuvent s\'exprimer sans lever la main ni interrompre le cours.', uxStrategy: 'Panneau latéral coulissant qui préserve le contexte principal (la grille d\'élèves).', outcome: 'L\'enseignant reste informé des questions sans perturber le rythme de la classe.' },
  T5: { interaction: 'Un clic sur « Verrouiller » : les écrans s\'éteignent un par un en cascade. Chaque carte affiche une icône cadenas.', concept: 'Contrôle autoritaire mais bienveillant. Le verrouillage est visible (animation cascade) pour que l\'enseignant constate l\'effet.', uxStrategy: 'Animation en vague : chaque écran se verrouille avec un léger décalage pour créer un effet visuel satisfaisant et confirmer que l\'action s\'applique à tous.', outcome: 'L\'enseignant capte l\'attention de toute la classe en une seconde.' },
  T6: { interaction: 'L\'enseignant sélectionne un fichier PDF et clique « Envoyer à tous ». Un badge « Reçu » apparaît progressivement sur chaque carte.', concept: 'Distribution zéro-friction. Un seul geste envoie le document à 32 tablettes.', uxStrategy: 'Confirmation progressive : les badges « Reçu » apparaissent en staggered pour montrer que la distribution est en cours.', outcome: 'L\'enseignant distribue un document en 2 secondes et voit qui l\'a reçu sans demander.' },
  T7: { interaction: 'L\'enseignant active la projection. Son écran est dupliqué vers le vidéo projecteur.', concept: 'Projection sans configuration. L\'enseignant partage instantanément ce qu\'il voit.', uxStrategy: 'Un bouton toggle simple, pas de boîte de dialogue. L\'indicateur visuel rappelle que la projection est active.', outcome: 'L\'enseignant illustre son propos en projetant n\'importe quel contenu sans délai technique.' },
  T8: { interaction: 'L\'enseignant pousse un contenu sur toutes les tablettes. Les élèves voient le contenu imposé, la navigation libre est temporairement désactivée.', concept: 'Mode dirigé temporaire. Quand l\'enseignant a besoin que tous les élèves voient la même chose.', uxStrategy: 'Action réversible et visible. Les élèves comprennent que c\'est temporaire grâce à un message explicite.', outcome: 'Toute la classe est synchronisée sur le même contenu en une seconde.' },
  T9: { interaction: 'L\'enseignant sélectionne des élèves un par un avec des chips de couleur. Chaque groupe reçoit une couleur distincte.', concept: 'Différenciation pédagogique rendue simple. L\'enseignant crée des parcours différents pour des sous-groupes.', uxStrategy: 'Sélection par chips visuels avec couleur immédiate. L\'enseignant voit les groupes se former en temps réel.', outcome: 'L\'enseignant constitue des groupes de travail en quelques clics.' },
  T10: { interaction: 'L\'enseignant crée une question avec des options de réponse. Les résultats s\'affichent en temps réel sous forme de barres colorées.', concept: 'Évaluation formative intégrée au flux de la séance.', uxStrategy: 'Affichage temps réel des résultats pour créer un momentum de participation.', outcome: 'L\'enseignant évalue la compréhension de la classe en 30 secondes.' },
  T11: { interaction: 'L\'enseignant ouvre le message d\'un élève, choisit une réponse rapide prédéfinie ou tape un message personnalisé.', concept: 'Communication one-to-one sans perturber la classe.', uxStrategy: 'Réponses rapides prédéfinies pour les cas courants. Champ libre pour les réponses personnalisées.', outcome: 'L\'enseignant accompagne chaque élève individuellement tout en gardant la vue d\'ensemble.' },
  T12: { interaction: 'L\'enseignant sélectionne 3 cartes élèves. Leurs écrans s\'affichent côte à côte en grand format.', concept: 'Mise en valeur collective. L\'enseignant montre plusieurs travaux simultanément pour comparer ou féliciter.', uxStrategy: 'Sélection directe sur les cartes. L\'affichage en triptique maximise la lisibilité.', outcome: 'L\'enseignant enrichit son cours avec des exemples concrets tirés du travail des élèves.' },
  T13: { interaction: 'L\'enseignant agrandit l\'écran d\'un élève, le projette, puis active le mode annotation pour dessiner et entourer.', concept: 'Correction collaborative en temps réel. L\'enseignant corrige devant toute la classe, sur le travail réel d\'un élève.', uxStrategy: 'Outils d\'annotation simples accessibles en un clic. Le dessin SVG est fluide et précis.', outcome: 'L\'enseignant illustre ses corrections de manière vivante et interactive.' },
  T14: { interaction: 'L\'enseignant active la caméra, capture le document, le recadre automatiquement et l\'envoie à toute la classe.', concept: 'Passerelle papier-numérique. Tout se fait dans l\'application en quelques secondes.', uxStrategy: 'Pipeline en 5 étapes visuelles (capture → cadrage → perspective → PDF → envoi).', outcome: 'L\'enseignant numérise et distribue un document papier en moins de 15 secondes.' },
  T15: { interaction: 'L\'enseignant clique « Quitter ». Un récapitulatif s\'affiche : durée, nombre de ressources échangées, participation.', concept: 'Clôture propre et automatisée. L\'enseignant ne perd rien.', uxStrategy: 'Récapitulatif non bloquant. La sauvegarde Google Drive est automatique.', outcome: 'L\'enseignant termine sa séance sereinement, les données sont archivées sans effort.' },
  T16: { interaction: 'L\'enseignant colle une URL et clique envoyer. Le lien s\'ouvre automatiquement sur les tablettes.', concept: 'Partage d\'URL zéro-friction. L\'URL arrive directement sur les tablettes.', uxStrategy: 'Champ URL avec auto-complétion et validation. Envoi instantané avec confirmation visuelle.', outcome: 'Les élèves accèdent tous à la même page web en 2 secondes.' },
  T17: { interaction: 'L\'enseignant définit une durée et lance le minuteur. Une barre de progression passe du vert au rouge.', concept: 'Gestion du temps visuelle et partagée entre enseignant et élèves.', uxStrategy: 'Barre de progression avec sémantique colorimétrique universelle (vert → orange → rouge).', outcome: 'L\'enseignant structure son activité dans le temps.' },
  T18: { interaction: 'L\'enseignant choisit le nombre de groupes et clique « Créer ». Les cartes se réorganisent par couleur.', concept: 'Randomisation équitable et instantanée.', uxStrategy: 'Animation de répartition : les cartes glissent vers leur groupe.', outcome: 'L\'enseignant constitue des groupes hétérogènes en une seconde.' },
  T19: { interaction: 'L\'enseignant consulte un index de toutes ses séances avec filtres par statut.', concept: 'Historique pédagogique structuré. Chaque séance est une unité traçable.', uxStrategy: 'Liste ordonnée chronologiquement avec filtres par statut.', outcome: 'L\'enseignant retrouve n\'importe quelle séance passée.' },
  T20: { interaction: 'L\'enseignant remplit un formulaire : matière, classe, horaire, ressources à distribuer.', concept: 'Préparation en amont pour ne pas perdre de temps le jour J.', uxStrategy: 'Formulaire structuré par sections logiques.', outcome: 'L\'enseignant prépare sa séance en 2 minutes.' },
  T21: { interaction: 'L\'enseignant configure un devoir : durée, restrictions internet, applications autorisées. Le devoir se lance avec un minuteur.', concept: 'Évaluation encadrée et équitable. Les restrictions numériques reproduisent les conditions d\'un devoir surveillé.', uxStrategy: 'Toggles visuels pour chaque restriction. Whitelist d\'applications configurable.', outcome: 'L\'enseignant lance un devoir surveillé numériquement en quelques clics.' },
  T22: { interaction: 'L\'enseignant lance un examen préparé par l\'administration. Les restrictions matérielles se verrouillent : WiFi, Bluetooth, clavier, navigation.', concept: 'Examen haute sécurité, administré par l\'institution mais piloté par l\'enseignant.', uxStrategy: 'Dashboard de restrictions avec statut visuel (vert/rouge) pour chaque composant matériel.', outcome: 'L\'enseignant lance un examen officiel en toute confiance.' },
  T23: { interaction: 'Grille de 32 élèves en temps réel pendant l\'examen. Chaque carte affiche le statut : en cours, terminé, inactif.', concept: 'Surveillance passive mais exhaustive.', uxStrategy: 'Grille dense optimisée pour 32 cartes. Code couleur des statuts : bleu (en cours), vert (terminé), orange (alerte).', outcome: 'L\'enseignant surveille sereinement 32 élèves et détecte les anomalies.' },
  T24: { interaction: 'Bilan d\'examen : copies récupérées, téléchargement ZIP, sauvegarde Drive, génération d\'email pour l\'académie.', concept: 'Chaîne de traçabilité complète. De la récupération des copies à l\'envoi aux autorités.', uxStrategy: 'Actions en cascade : récupérer → sauvegarder → envoyer. Chaque étape confirme visuellement son succès.', outcome: 'L\'enseignant transmet les copies et le PV en 3 clics.' },
  T25: { interaction: 'L\'enseignant clique sur une carte. L\'écran de l\'élève s\'affiche en plein format avec navigation carrousel.', concept: 'Zoom contextuel. De la vue d\'ensemble (grille) au détail (plein écran) d\'un clic.', uxStrategy: 'Transition fluide grille → plein écran. Le carrousel permet de parcourir les élèves sans retour arrière.', outcome: 'L\'enseignant examine le travail d\'un élève en détail.' },
  S1: { interaction: 'L\'élève entre ses identifiants, se connecte, puis scanne le QR code affiché par l\'enseignant.', concept: 'Double authentification simplifiée. Le login identifie, le QR code rattache à la séance.', uxStrategy: 'Formulaire de login épuré avec champs larges adaptés au tactile. Scanner QR plein écran.', outcome: 'L\'élève rejoint sa classe en moins de 15 secondes.' },
  S2: { interaction: 'L\'élève ouvre le panneau de ressources. Les documents sont listés par type.', concept: 'Accès centralisé aux ressources de la séance.', uxStrategy: 'Panneau latéral non bloquant. Icônes de type fichier pour l\'identification.', outcome: 'L\'élève retrouve instantanément tous les documents distribués.' },
  S3: { interaction: 'L\'élève sélectionne « J\'ai terminé » dans une liste de messages prédéfinis.', concept: 'Communication structurée. Les messages prédéfinis éliminent l\'ambiguïté.', uxStrategy: 'Sélection en un clic dans une liste courte. Confirmation visuelle immédiate.', outcome: 'L\'élève signale qu\'il a fini sans déranger la classe.' },
  S4: { interaction: 'L\'élève tape sa question et l\'envoie. L\'enseignant la reçoit dans son panneau de messages.', concept: 'Main levée numérique et silencieuse.', uxStrategy: 'Champ texte simple. Le message apparaît dans la file de l\'enseignant avec nom et heure.', outcome: 'Les élèves timides posent des questions qu\'ils n\'oseraient pas poser à voix haute.' },
  S5: { interaction: 'L\'élève dépose un fichier dans une zone de dépôt. Une barre de progression s\'anime.', concept: 'Rendu de devoir numérique natif.', uxStrategy: 'Zone de dépôt large avec feedback de progression. Confirmation explicite.', outcome: 'L\'élève rend son travail en 3 secondes.' },
  S6: { interaction: 'Un toast non bloquant apparaît en haut de l\'écran quand l\'enseignant partage un document.', concept: 'Notification douce et non intrusive.', uxStrategy: 'Toast avec icône de type fichier. Disparition automatique après quelques secondes.', outcome: 'L\'élève sait qu\'une ressource est disponible sans perdre le fil.' },
  S7: { interaction: 'L\'écran affiche un cadenas et un message neutre : « Votre écran a été verrouillé par l\'enseignant ».', concept: 'Verrouillage non punitif. Le message est factuel, pas réprimandant.', uxStrategy: 'Écran sobre avec icône cadenas centrée. Pas de couleur agressive.', outcome: 'L\'élève comprend que l\'enseignant demande son attention.' },
  SC1: { interaction: 'Monsieur Julien ouvre sa classe, les élèves scannent le QR code, il distribue le cours.', concept: 'Séance type du début : connexion, distribution, démarrage.', uxStrategy: 'Enchaînement fluide des actions d\'ouverture.', outcome: 'La séance démarre en moins d\'une minute.' },
  SC2: { interaction: 'Monsieur Julien vérifie les écrans, verrouille les tablettes, consulte les messages.', concept: 'Observation et intervention en milieu de séance.', uxStrategy: 'Alternance entre modes passif (observation) et actif (intervention).', outcome: 'L\'enseignant recentre la classe sans élever la voix.' },
  SC3: { interaction: 'Monsieur Julien crée un groupe « Approfondissement » et envoie un exercice supplémentaire.', concept: 'Différenciation pédagogique en temps réel.', uxStrategy: 'Création de groupe et distribution ciblée en deux gestes.', outcome: 'Chaque élève travaille à son niveau.' },
  SC4: { interaction: 'Monsieur Julien lance un sondage rapide et adapte la suite du cours.', concept: 'Évaluation formative intégrée.', uxStrategy: 'Résultats temps réel pour décision immédiate.', outcome: 'L\'enseignant ajuste son cours en fonction de la compréhension réelle.' },
  SC5: { interaction: 'Chloé dépose son devoir, Ravi pose une question. Monsieur Julien répond et projette le travail exemplaire.', concept: 'Collaboration et valorisation dans le flux de la séance.', uxStrategy: 'Flux d\'interactions croisées sans interruption du cours.', outcome: 'Les interactions enrichissent la séance.' },
  SC6: { interaction: 'Monsieur Julien scanne un exercice papier, le convertit en PDF et l\'envoie.', concept: 'Passerelle papier-numérique intégrée.', uxStrategy: 'Pipeline automatisé du papier au numérique.', outcome: 'Le document papier est distribué numériquement en 15 secondes.' },
  SC7: { interaction: 'Jour d\'examen. Monsieur Julien lance le bac blanc, surveille 32 élèves, récupère les copies et les transmet.', concept: 'Examen officiel de bout en bout, du lancement à la transmission.', uxStrategy: 'Enchaînement configuration → surveillance → récupération → transmission.', outcome: 'L\'examen se déroule sans incident et les copies sont transmises en 3 clics.' },
  SC8: { interaction: 'Monsieur Julien lance un contrôle de 30 minutes avec restrictions et badges de complétion.', concept: 'Contrôle rapide avec conditions d\'examen allégées.', uxStrategy: 'Configuration simplifiée par rapport à l\'examen officiel.', outcome: 'Le contrôle est lancé en quelques secondes.' },
  SC9: { interaction: 'Monsieur Julien projette le devoir de Chloé et l\'annote en direct.', concept: 'Valorisation du travail d\'élève devant la classe.', uxStrategy: 'Annotation live sur le travail réel d\'un élève.', outcome: 'L\'enseignant illustre ses attentes avec un exemple concret.' },
  SC10: { interaction: 'Monsieur Julien gère une séance entière : QR code, distribution, supervision, sondage, clôture.', concept: 'Séance complète de A à Z.', uxStrategy: 'Enchaînement de toutes les fonctionnalités dans un usage réel.', outcome: 'Une séance fluide, sans rupture technique.' },
};
