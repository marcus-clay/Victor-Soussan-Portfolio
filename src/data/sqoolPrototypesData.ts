// SQOOL Classe Prototypes - Central data source
// All 42 prototypes with bilingual labels and section groupings

export type PrototypeCategory = 'teacher' | 'student' | 'scenario';

export interface PrototypeItem {
  id: string;
  category: PrototypeCategory;
  title: { en: string; fr: string };
  desc: { en: string; fr: string };
}

export const UI_MOTION_BASE_URL = 'https://ui-motion-five.vercel.app';

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
export const CASE_STUDY_SECTIONS = [
  { sectionId: 'grid', prototypeIds: ['T1', 'T3', 'T5', 'T25', 'T2'] },
  { sectionId: 'orchestration', prototypeIds: ['T9', 'T18', 'T12', 'T7', 'T8', 'T13'] },
  { sectionId: 'communication', prototypeIds: ['T10', 'T11', 'T4', 'T16', 'T17', 'T6'] },
  { sectionId: 'sessions', prototypeIds: ['T19', 'T20', 'T21', 'T22', 'T23', 'T24', 'T15'] },
  { sectionId: 'students', prototypeIds: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'] },
  { sectionId: 'journeys', prototypeIds: ['SC1', 'SC2', 'SC3', 'SC4', 'SC5', 'SC6', 'SC7', 'SC8', 'SC9', 'SC10'] },
] as const;

// Gallery categories
export const GALLERY_CATEGORIES = [
  { id: 'teacher' as const, prototypeIds: PROTOTYPES.filter(p => p.category === 'teacher').map(p => p.id) },
  { id: 'student' as const, prototypeIds: PROTOTYPES.filter(p => p.category === 'student').map(p => p.id) },
  { id: 'scenario' as const, prototypeIds: PROTOTYPES.filter(p => p.category === 'scenario').map(p => p.id) },
];

// Executive summary key prototypes
export const EXECUTIVE_PROTOTYPES = ['T1', 'SC1', 'SC7', 'SC10'];

// Helper to get prototypes for a section
export function getPrototypesForSection(sectionId: string): PrototypeItem[] {
  const section = CASE_STUDY_SECTIONS.find(s => s.sectionId === sectionId);
  if (!section) return [];
  return section.prototypeIds.map(id => PROTOTYPE_MAP.get(id)).filter(Boolean) as PrototypeItem[];
}

// Helper to build iframe URL
// autoplay=0: shows first frame (paused), autoplay=1: plays animation immediately
export function getIframeSrc(prototypeId: string, autoplay = false): string {
  return `${UI_MOTION_BASE_URL}/?embed=1&speed=0.8&autoplay=${autoplay ? '1' : '0'}&card=1#${prototypeId.toLowerCase()}`;
}
