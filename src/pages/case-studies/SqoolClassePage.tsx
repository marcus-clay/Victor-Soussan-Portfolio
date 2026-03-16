// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Dedicated case study for the classroom management application
// Embeds interactive prototypes from the UI Motion project

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Calendar,
  Briefcase,
  Layers,
  Building2,
  ArrowRight,
  Monitor,
  Lock,
  Users,
  MessageCircle,
  Timer,
  FileText,
  Eye,
  Play,
  Maximize2,
} from 'lucide-react';
import EnhancedLightbox from '../../components/media/EnhancedLightbox';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
import PrototypeCard from '../../components/prototype/PrototypeCard';
import PrototypeCarousel from '../../components/prototype/PrototypeCarousel';
import PrototypeLightbox from '../../components/prototype/PrototypeLightbox';
import GallerySidebar from '../../components/GallerySidebar';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags } from '../../utils/seo';
import {
  PROTOTYPE_MAP,
  GALLERY_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  EXECUTIVE_PROTOTYPES,
  getPrototypesForSection,
  PrototypeCategory,
  PrototypeItem,
} from '../../data/sqoolPrototypesData';

interface SqoolClassePageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  viewMode: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  lang?: 'en' | 'fr';
  onContact?: () => void;
}

// Translations
const TRANSLATIONS = {
  en: {
    caseStudy: 'Case Study',
    gallery: 'Prototypes',
    cta: {
      title: 'Interested in working together?',
      button: 'Get in touch',
    },
    clickToZoom: 'Click to zoom',
    clickToExitZoom: 'Click to exit zoom',
    meta: {
      type: 'Interaction Design',
      scope: 'Classroom Management',
      period: '2022',
      company: 'UNOWHY / SQOOL',
    },
    nav: {
      top: 'Top',
      intro: 'Intro',
      overview: 'Overview',
      challenge: 'Challenge',
      grid: 'The Grid',
      orchestration: 'Orchestration',
      communication: 'Communication',
      sessions: 'Sessions',
      students: 'Students',
      journeys: 'Full Journeys',
      impact: 'Impact',
    },
    overview: {
      title: 'Overview',
      introTitle: 'Introduction',
      introDesc: 'In 2019, the Ile-de-France region launched one of France\'s largest digital education programs: distributing a tablet or PC to each of 500,000 students and teachers across 465 high schools. This massive deployment raised a very concrete problem in every classroom: how does a teacher manage 30 individual devices during a lesson without losing control of the room? SQOOL Classe was born from that question, which teachers faced every day.',
      roleTitle: 'My role',
      roleDesc: 'I led the interaction design and prototyping of SQOOL Classe from scratch. In close collaboration with the CPO, I took ownership of the full design scope: user research with teachers and students, information architecture, interaction flows, real-time UI patterns, and a library of over 50 interactive prototypes documenting every scenario. I also managed a team of designers contributing to the broader SQOOL ecosystem.',
      objectivesTitle: 'Strategic objectives',
      objective1: 'Give teachers a calm, reliable overview of all student activity during a lesson',
      objective2: 'Reduce the time spent on device management so pedagogy stays the priority',
      objective3: 'Work within the real constraints of schools: unstable Wi-Fi, heterogeneous hardware',
      objective4: 'Deliver a web application accessible from any browser, on any device',
    },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Real-Time Supervision, Classroom UX',
      period: '2022',
      title: 'Making the digital classroom readable, calm, and manageable',
      subtitle: 'A supervision tool designed to fade behind the pedagogy',
      description: 'In 2019, the Ile-de-France region distributed a tablet to each of 500,000 students and teachers across 465 high schools. This decision created a very concrete problem in every classroom: how to manage 30 screens simultaneously, catch disengagement, and keep the lesson on track. SQOOL Classe is the web application I designed to answer that question. It gives teachers a clear view of their class, immediate actions on every device, and the composure they need to focus on what matters: teaching.',
    },
    context: {
      title: 'What happens when 500,000 students receive a tablet?',
      subtitle: 'An ambitious program, very concrete difficulties',
      description: 'The digital education plan in the Ile-de-France region carried a strong promise: personalized learning, modern teaching practices. On the ground, the teachers we interviewed described a different reality. The tablet added a layer of complexity to their daily work: managing distractions, checking that everyone follows along, reacting to technical issues, all while maintaining the rhythm of the lesson. The tools available on the market were either too invasive (total surveillance, a climate of distrust) or too fragile for a school Wi-Fi network.',
      frustration1Title: 'Teacher cognitive load',
      frustration1Desc: 'In interviews, one phrase came up regularly: "I spend more time watching screens than teaching." Without a clear overview of student activity, teachers lost the thread of their lesson and their sense of classroom control.',
      frustration2Title: 'Fragile infrastructure',
      frustration2Desc: 'Wi-Fi in schools is rarely stable. Any supervision solution had to work smoothly on slow or intermittent networks, without crashes or data loss. A tool that fails mid-lesson generates more frustration than value.',
      frustration3Title: 'Balancing trust and control',
      frustration3Desc: 'Teachers needed to regain agency, but the tool could not feel like a surveillance apparatus. The challenge was to provide visibility and responsiveness while preserving the relationship of trust with students.',
      problemQuestion: 'How do you give teachers real-time visibility into 30 screens without turning the classroom into a surveillance room?',
    },
    challenge: {
      title: 'How do you make things visible without being invasive?',
      subtitle: 'Three principles to structure the response',
      description: 'The teacher needs to see what is happening on every tablet to maintain pedagogical structure. But the interface must neither overwhelm them with data nor create a climate of permanent control. This paradox sits at the heart of the design problem. We structured our approach around three principles that guided every decision, from the macro (information architecture) to the micro (the color code of a student tile).',
      pillar1Title: 'Instant visibility',
      pillar1Desc: 'The teacher should be able to scan the state of the entire class at a glance. A tile grid with restrained color coding surfaces the essentials: who is connected, who is working, who has drifted.',
      pillar2Title: 'Immediate action',
      pillar2Desc: 'Locking screens, sending a document, projecting content: these critical gestures must be reachable in a single tap, with no unnecessary navigation or confirmation.',
      pillar3Title: 'Calm and clarity',
      pillar3Desc: 'Information density is calibrated to reassure, not to constantly alert. Visual warning states are reserved for situations that genuinely warrant attention.',
    },
    grid: {
      title: 'What does the teacher see when they look at their class?',
      subtitle: 'The student card, the core building block',
      description: 'Everything rests on one component: the student card. Each tile surfaces the student\'s name, active application, battery level, and connection state. The design challenge was to keep this information readable without cluttering the screen, even with 32 students displayed simultaneously. The grid must work like a dashboard the teacher glances at between two explanations, not a screen that requires analysis.',
      statesTitle: 'Unambiguous visual states',
      statesDesc: 'Each device moves through clear states: off, idle, active, projecting, locked. Transitions are visible and progressive. During initial connection, skeleton loading avoids any impression of latency or malfunction.',
      screensTitle: 'Live screen previews',
      screensDesc: 'The teacher can enable a preview mode where each card displays a periodically refreshed thumbnail of the student\'s screen. This provides immediate awareness of each student\'s activity without opening individual views.',
      lockTitle: 'Global lock',
      lockDesc: 'The most frequently used action in daily practice. A single tap locks every tablet. Visual feedback is immediate: the lock icon appears on each card at the same moment, confirming the action has been received.',
      viewerTitle: 'Full-screen view',
      viewerDesc: 'Tap any card to open a student\'s screen full-size, with carousel navigation to browse the entire class without returning to the grid. Useful for a quick classroom walkthrough.',
    },
    orchestration: {
      title: 'How do you act fast without looking away from the grid?',
      subtitle: 'The classroom control commands',
      description: 'Seeing is not enough. The teacher also needs to act quickly, from the same screen, without losing track of what is happening in the room. The essential actions (lock, project, group, distribute) live in a persistent panel with large, touch-friendly targets, accessible on both tablet and desktop.',
      groupsTitle: 'Create groups',
      groupsDesc: 'The teacher forms sub-groups by dragging student cards directly in the grid. The gesture is natural, the grouping immediate. Useful for differentiated instruction or team exercises.',
      randomTitle: 'Random groups',
      randomDesc: 'For collaborative exercises, a single tap generates balanced groups. The teacher saves the time of manual assignment and starts the activity more quickly.',
      projectionTitle: 'Screen projection',
      projectionDesc: 'The teacher shares their screen to all tablets in a single gesture. A visual confirmation in the interface indicates that projection is active and received.',
      spotlightTitle: 'Spotlight student work',
      spotlightDesc: 'Select up to 3 student screens and display them to the entire class. The supervision tool becomes a pedagogical one: highlight a piece of work, start a discussion, show an example.',
    },
    communication: {
      title: 'How do you maintain the pedagogical connection through the screen?',
      subtitle: 'A discreet channel between teacher and students',
      description: 'Beyond screen management, SQOOL Classe supports the pedagogical relationship itself. The application integrates a lightweight communication channel that enables targeted exchanges without interrupting the lesson, and gives the teacher quick animation tools: polls, timer, resource distribution.',
      messagesTitle: 'Student questions',
      messagesDesc: 'A student can send a question to the teacher privately, directly from their tablet. On the teacher\'s side, a notification badge appears without interrupting the lesson.',
      replyTitle: 'Quick reply',
      replyDesc: 'The teacher responds directly from the message panel, without switching screens. The exchange stays discreet and contextual.',
      pollTitle: 'Live poll',
      pollDesc: 'Launch a poll and watch results arrive in real time. A formative assessment tool that takes seconds to configure and provides immediate feedback on class comprehension.',
      timerTitle: 'Shared timer',
      timerDesc: 'A countdown displayed on every tablet. The teacher sets the pace for an exercise, students see the countdown live. Simple, and heavily used in practice.',
      resourceTitle: 'Resource distribution',
      resourceDesc: 'The teacher distributes a document, file, or link to the entire class or a specific group, in a single action from the control panel.',
      linkTitle: 'Web link sharing',
      linkDesc: 'Push a URL to every student\'s browser instantly. No more dictating an address or writing it on the board.',
    },
    sessions: {
      title: 'How do you structure a digital lesson hour?',
      subtitle: 'From opening to closing, every step is tooled',
      description: 'SQOOL Classe supports the teacher across the full duration of a lesson. Session opening, resource distribution, exercises, assessments, closing: each step has its own tools to reduce logistical overhead and leave more room for pedagogy.',
      openTitle: 'Class opening',
      openDesc: 'The teacher displays a QR code. Students scan it with their tablet and join the session in seconds, with no login or prior configuration.',
      endTitle: 'Session closing',
      endDesc: 'A summary screen shows key data: duration, number of interactions, resources shared. The teacher closes the session and releases the tablets.',
      assignmentTitle: 'Assignment mode',
      assignmentDesc: 'The teacher configures a timed exercise with restrictions: browser lock, time limit, automatic collection of submissions when time runs out.',
      examSetupTitle: 'Exam preparation',
      examSetupDesc: 'For official evaluations, the teacher configures the exam from a single screen: duration, allowed applications, restriction level, submission rules.',
      examMonitorTitle: 'Exam monitoring',
      examMonitorDesc: 'During the exam, the teacher supervises 32 stations in parallel. Real-time indicators show where each student stands, who has finished, and whether a technical incident has occurred.',
      examReviewTitle: 'Review and collection',
      examReviewDesc: 'Once the exam is over, the teacher reviews digital submissions, checks delivery status, and retrieves all files in a single operation.',
    },
    students: {
      title: 'What does the student experience on the other side?',
      subtitle: 'An intentionally minimal experience',
      description: 'On the student side, SQOOL Classe only appears when useful: joining a session, receiving a document, responding to a poll. The rest of the time, the tablet remains a regular work tool. This design choice is deliberate: the student should not feel watched, but know they are supported.',
      loginTitle: 'Scan and join',
      loginDesc: 'The student scans the QR code displayed by the teacher. Connection is immediate, no account creation or password required.',
      resourcesTitle: 'Access resources',
      resourcesDesc: 'Documents shared by the teacher appear in a simple, chronological list. Each resource is accessible in a single tap.',
      doneTitle: '"I\'m done"',
      doneDesc: 'The student signals they have finished an exercise. The teacher sees it immediately on their grid, which helps adapt the pace of the lesson.',
      questionTitle: 'Ask a question',
      questionDesc: 'The student sends a question to the teacher without interrupting the class. No need to raise a hand or wait for a turn.',
      shareTitle: 'Submit work',
      shareDesc: 'The student sends a file directly to the teacher from their tablet. The submission is timestamped and confirmed on the student\'s side.',
      receiveTitle: 'Receive a document',
      receiveDesc: 'When the teacher shares a resource, a discreet notification appears with direct access to the file.',
      lockedTitle: 'Locked screen',
      lockedDesc: 'When the teacher locks the tablets, a clean, readable screen appears. The message is clear, the tone calm. The student understands the situation immediately.',
    },
    journeys: {
      title: 'What does a full session look like, end to end?',
      subtitle: 'Three complete scenarios, from opening to closing',
      description: 'These prototypes show full sessions as they unfold in the classroom. They illustrate how the different features work together in real use, with a step-by-step narrated walkthrough.',
      sc1Title: 'Start and distribute',
      sc1Desc: 'The teacher opens the session, shares lesson materials, and students receive them directly on their tablets.',
      sc7Title: 'Official exam, from A to Z',
      sc7Desc: 'The complete exam journey: setup, monitoring 32 students in parallel, and collecting digital submissions.',
      sc10Title: 'Typical session',
      sc10Desc: 'A full lesson walkthrough: opening, teaching, interactions, quick assessment, and closing.',
    },
    impact: {
      title: 'What did this work produce?',
      intro: 'SQOOL Classe became the reference application within the SQOOL suite, both for its usability and its responsiveness. Pilot teachers reported a concrete gain in classroom composure and a tangible reduction in the time spent on tablet management.',
      stat1: '465',
      stat1Desc: 'Schools equipped across Ile-de-France',
      stat2: '50',
      stat2Desc: 'Interactive prototypes covering every flow',
      stat3: '-70%',
      stat3Desc: 'Device management time per lesson (estimated by pilot teachers)',
      stat4: '30s',
      stat4Desc: 'Average setup time with QR code join',
    },
    testimonial: {
      quote: 'For the first time, I felt I could manage my classroom without raising my voice. SQOOL Classe gave me back my composure.',
      author: 'Teacher',
      role: 'Test Pilot, 2023',
    },
    heroTestimonial: {
      quote: 'I had the chance to work with Victor for 3 years as a duo, and he is one of the most inspiring designers I have ever worked with. Victor combines boundless creativity with impressive rigor. He knows how to translate complex visions into clear and impactful user experiences. Always listening, curious, he constantly pushes thinking further, whether on substance or form. I particularly valued our ability to co-build: he is not afraid to challenge ideas while remaining kind, focused on product quality and user impact. I recommend him to any team looking for a Lead Designer who is creative, demanding, and deeply human.',
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY',
    },
    metaLabels: {
      type: 'Type',
      scope: 'Scope',
      period: 'Period',
      company: 'Company',
    },
    transitions: {
      gridToOrchestration: 'Visibility is the foundation. But the teacher also needs to act, fast, without leaving the overview.',
      orchestrationToCommunication: 'Beyond screen management, the tool supports the pedagogical relationship itself.',
      communicationToSessions: 'These interactions live within a structured framework: the lesson session.',
      sessionsToStudents: 'Everything so far has been designed for the teacher. Let\'s look at the other side.',
      studentsToJourneys: 'Let\'s see how it all comes together in a real session.',
    },
  },
  fr: {
    caseStudy: 'Étude de cas',
    gallery: 'Prototypes',
    cta: {
      title: 'Un projet de design produit en tête\u00a0?',
      button: 'Échangeons',
    },
    clickToZoom: 'Cliquer pour agrandir',
    clickToExitZoom: 'Cliquer pour fermer',
    meta: {
      type: 'Design d\u2019interaction',
      scope: 'Supervision de classe',
      period: '2022',
      company: 'UNOWHY / SQOOL',
    },
    nav: {
      top: 'Haut',
      intro: 'Intro',
      challenge: 'Enjeu',
      overview: 'Vue d\u2019ensemble',
      grid: 'Grille',
      orchestration: 'Orchestration',
      communication: 'Communication',
      sessions: 'S\u00e9ances',
      students: '\u00c9l\u00e8ves',
      journeys: 'Parcours',
      impact: 'Impact',
    },
    overview: {
      title: 'Vue d\u2019ensemble',
      introTitle: 'Le contexte',
      introDesc: 'En 2019, la Région Île-de-France a lancé un programme sans précédent dans l\u2019éducation nationale\u00a0: équiper chaque élève et chaque enseignant de 465\u00a0lycées d\u2019une tablette ou d\u2019un PC, soit environ 500\u00a0000\u00a0appareils déployés en quelques mois. La promesse était ambitieuse — moderniser les apprentissages, réduire les inégalités numériques. Mais dans les salles de classe, une question très concrète s\u2019est imposée dès les premières semaines\u00a0: comment un enseignant peut-il faire cours sereinement quand 30\u00a0tablettes sont ouvertes devant lui\u00a0? SQOOL Classe est né de cette question.',
      roleTitle: 'Mon rôle',
      roleDesc: 'J\u2019ai conçu SQOOL Classe de zéro en tant que Lead Interaction Designer, en binôme quotidien avec la CPO Charlotte Rifflet. Mon périmètre couvrait l\u2019intégralité du design produit\u00a0: recherche terrain auprès d\u2019enseignants et d\u2019élèves, architecture d\u2019information, conception des flux d\u2019interaction en temps réel, et la production d\u2019une bibliothèque de plus de 50\u00a0prototypes interactifs qui documentaient chaque scénario d\u2019usage. J\u2019ai également encadré une équipe de designers travaillant sur les autres briques de l\u2019écosystème SQOOL.',
      objectivesTitle: 'Objectifs stratégiques',
      objective1: 'Offrir à l\u2019enseignant une lecture claire et apaisée de l\u2019activité de ses élèves pendant le cours',
      objective2: 'Réduire drastiquement le temps consacré à la logistique des appareils pour que le temps de classe reste du temps d\u2019enseignement',
      objective3: 'Fonctionner dans les conditions réelles des établissements scolaires\u00a0: Wi-Fi instable, matériel hétérogène, pas de support technique sur place',
      objective4: 'Livrer une application web accessible depuis n\u2019importe quel navigateur, sur tablette comme sur ordinateur',
    },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Supervision temps réel, UX Classe',
      period: '2022',
      title: 'Donner aux enseignants la sérénité de faire cours dans une classe numérique',
      subtitle: 'SQOOL Classe\u00a0: l\u2019application de supervision conçue pour s\u2019effacer derrière la pédagogie',
      description: 'Quand la Région Île-de-France a distribué une tablette à chacun des 500\u00a0000\u00a0élèves et enseignants de 465\u00a0lycées, elle a aussi créé un défi quotidien dans chaque salle de classe\u00a0: un enseignant qui entre dans sa salle se retrouve face à 30\u00a0écrans allumés, 30\u00a0élèves connectés, et aucun outil adapté pour garder la maîtrise de sa séance. SQOOL Classe est l\u2019application web que j\u2019ai conçue pour résoudre ce problème. Elle permet à l\u2019enseignant de voir l\u2019état de toute sa classe en un coup d\u2019œil, d\u2019agir sur chaque tablette en un geste, et de retrouver la tranquillité nécessaire pour se consacrer à ce qui compte\u00a0: transmettre.',
    },
    context: {
      title: '500\u00a0000\u00a0tablettes déployées, et après\u00a0?',
      subtitle: 'Le quotidien des enseignants face au numérique en classe',
      description: 'Le plan numérique de la Région Île-de-France portait une vision forte\u00a0: donner à chaque élève les mêmes outils, permettre aux enseignants de renouveler leurs pratiques pédagogiques. Sur le terrain, la réalité était plus nuancée. Les enseignants que nous avons rencontrés lors de nos recherches décrivaient une charge supplémentaire difficile à absorber\u00a0: vérifier que chaque élève est bien sur la bonne application, gérer les distractions, réagir quand une tablette ne répond plus, tout cela en maintenant le rythme et l\u2019attention d\u2019une classe de 30\u00a0adolescents. Les solutions existantes sur le marché oscillaient entre deux extrêmes\u00a0: des outils de surveillance invasifs qui installaient un climat de méfiance, ou des solutions trop fragiles pour tenir sur un réseau Wi-Fi scolaire.',
      frustration1Title: 'Une attention constamment morcelée',
      frustration1Desc: 'Lors de nos entretiens, une phrase revenait sous différentes formes\u00a0: «\u00a0Je passe plus de temps à surveiller les écrans qu\u2019à enseigner.\u00a0» Sans vision globale de ce que font les élèves sur leurs tablettes, les enseignants perdaient à la fois le fil de leur cours et le sentiment de maîtriser leur salle.',
      frustration2Title: 'Des conditions techniques imprévisibles',
      frustration2Desc: 'Le Wi-Fi dans un lycée français est rarement stable, et les parcs de tablettes sont souvent hétérogènes. Tout outil de supervision qui plante en plein cours génère plus de frustration que de valeur — les enseignants finissent par ne plus l\u2019utiliser.',
      frustration3Title: 'Le juste équilibre entre visibilité et confiance',
      frustration3Desc: 'Les enseignants avaient besoin de reprendre la main sur ce qui se passait dans leur classe numérique, mais ils ne voulaient pas d\u2019un outil qui donne l\u2019impression de fliquer les élèves. Le défi était de leur offrir de la visibilité et de la réactivité tout en préservant une relation de travail saine avec les élèves.',
      problemQuestion: 'Comment permettre à un enseignant de garder la maîtrise de 30\u00a0tablettes sans transformer sa classe en salle de contrôle\u00a0?',
    },
    challenge: {
      title: 'Concevoir un outil qu\u2019on comprend en 30\u00a0secondes, au milieu d\u2019un cours',
      subtitle: 'Trois principes de design pour guider chaque décision',
      description: 'L\u2019enseignant a besoin de savoir ce qui se passe sur chaque tablette pour maintenir le cadre de son cours. Mais l\u2019interface doit lui donner cette information sans le submerger, et sans créer un climat de contrôle permanent qui nuirait à la dynamique de classe. Toute la difficulté du projet tenait dans cet équilibre. Nous avons structuré notre approche autour de trois principes qui ont guidé chaque décision de design, de l\u2019architecture générale de l\u2019application jusqu\u2019au choix des couleurs sur une tuile élève.',
      pillar1Title: 'Lisibilité immédiate',
      pillar1Desc: 'L\u2019enseignant doit pouvoir comprendre l\u2019état de toute sa classe en un seul regard, entre deux explications au tableau. Une grille de tuiles avec un code couleur sobre fait remonter l\u2019essentiel\u00a0: qui est connecté, qui travaille, qui a décroché.',
      pillar2Title: 'Action en un geste',
      pillar2Desc: 'Verrouiller toutes les tablettes, envoyer un document, projeter un contenu sur les écrans des élèves\u00a0: chaque action critique doit être accessible en un seul tap, sans navigation intermédiaire ni confirmation superflue.',
      pillar3Title: 'Interface apaisante',
      pillar3Desc: 'La densité d\u2019information est calibrée pour rassurer l\u2019enseignant, pas pour le solliciter en permanence. Les alertes visuelles sont réservées aux situations qui justifient réellement son attention — le reste du temps, l\u2019interface reste sobre et stable.',
    },
    grid: {
      title: 'Voir toute sa classe en un coup d\u2019œil',
      subtitle: 'La carte élève\u00a0: le composant central de l\u2019expérience enseignant',
      description: 'L\u2019interface de SQOOL Classe repose sur un composant fondamental\u00a0: la carte élève. Chaque tuile condense le nom de l\u2019élève, l\u2019application en cours d\u2019utilisation, le niveau de batterie et l\u2019état de connexion de l\u2019appareil. L\u2019enjeu de conception était de garder toutes ces informations lisibles sur un même écran, y compris lorsque 32\u00a0élèves sont affichés simultanément. La grille devait fonctionner comme un tableau de bord que l\u2019enseignant consulte d\u2019un coup d\u2019œil entre deux explications — pas comme un écran de monitoring qui demande de l\u2019analyse.',
      statesTitle: 'Des états visuels sans ambiguïté',
      statesDesc: 'Chaque appareil passe par des états clairement identifiables\u00a0: éteint, inactif, actif, en projection, verrouillé. Les transitions entre états sont progressives et visibles. Au moment de la connexion initiale des élèves, un skeleton loading évite toute impression de latence ou de dysfonctionnement.',
      screensTitle: 'Aperçu des écrans en temps réel',
      screensDesc: 'L\u2019enseignant peut activer un mode de prévisualisation où chaque carte affiche une vignette de l\u2019écran de l\u2019élève, rafraîchie périodiquement. Cette fonctionnalité lui donne une conscience immédiate de l\u2019activité de chacun sans avoir à ouvrir de vue individuelle.',
      lockTitle: 'Verrouiller toute la classe en un tap',
      lockDesc: 'Le geste que les enseignants utilisent le plus au quotidien. Un seul tap verrouille l\u2019ensemble des tablettes de la classe. Le retour visuel est immédiat\u00a0: l\u2019icône de cadenas apparaît sur chaque carte au même moment, confirmant que l\u2019action a bien été reçue par tous les appareils.',
      viewerTitle: 'Parcourir les écrans un par un',
      viewerDesc: 'Un tap sur n\u2019importe quelle carte ouvre l\u2019écran de l\u2019élève en plein format, avec une navigation en carrousel pour passer d\u2019un élève à l\u2019autre sans revenir à la grille. Particulièrement utile pour un tour de classe rapide.',
    },
    orchestration: {
      title: 'Agir sur la classe sans quitter l\u2019écran principal',
      subtitle: 'Les commandes de pilotage, toujours à portée de main',
      description: 'Avoir une vue claire de sa classe ne suffit pas — l\u2019enseignant doit aussi pouvoir agir rapidement, depuis le même écran, sans perdre le fil de ce qui se passe dans la salle. Les actions essentielles (verrouiller, projeter, grouper, distribuer) vivent dans un panneau de commandes persistant, avec des zones tactiles suffisamment larges pour être utilisées aussi bien sur tablette que sur un écran d\u2019ordinateur.',
      groupsTitle: 'Constituer des groupes de travail',
      groupsDesc: 'L\u2019enseignant forme des sous-groupes en déplaçant les cartes élèves directement dans la grille, avec un geste de glisser-déposer naturel. Le regroupement est immédiat et visible par tous. Utile pour la différenciation pédagogique ou les travaux en équipe.',
      randomTitle: 'Générer des groupes aléatoires',
      randomDesc: 'Pour les exercices collaboratifs, un seul tap génère des groupes équilibrés automatiquement. L\u2019enseignant économise le temps de l\u2019attribution manuelle et peut lancer l\u2019activité plus rapidement.',
      projectionTitle: 'Projeter son écran sur toutes les tablettes',
      projectionDesc: 'L\u2019enseignant partage son écran sur l\u2019ensemble des tablettes de la classe en un seul geste. Une confirmation visuelle dans l\u2019interface indique que la projection est active et bien reçue par chaque appareil.',
      spotlightTitle: 'Valoriser le travail d\u2019un élève devant la classe',
      spotlightDesc: 'L\u2019enseignant peut sélectionner jusqu\u2019à 3\u00a0écrans d\u2019élèves et les diffuser à toute la classe. L\u2019outil de supervision se transforme alors en outil pédagogique\u00a0: mettre en valeur une production, lancer une discussion collective, montrer un exemple concret.',
    },
    communication: {
      title: 'Maintenir le lien pédagogique à travers l\u2019écran',
      subtitle: 'Des échanges ciblés qui ne perturbent pas le cours',
      description: 'La supervision des écrans ne couvre qu\u2019une partie du besoin. SQOOL Classe intègre également un canal de communication léger entre l\u2019enseignant et ses élèves, conçu pour permettre des échanges ciblés sans interrompre le déroulement du cours. Ce canal s\u2019accompagne d\u2019outils d\u2019animation rapides — sondages, minuteur, distribution de documents — qui enrichissent la séance sans ajouter de complexité.',
      messagesTitle: 'Recevoir les questions des élèves',
      messagesDesc: 'Un élève peut envoyer une question à l\u2019enseignant de manière privée, directement depuis sa tablette. Côté enseignant, un badge de notification discret signale la question reçue sans interrompre le fil du cours.',
      replyTitle: 'Répondre sans changer d\u2019écran',
      replyDesc: 'L\u2019enseignant répond directement depuis le panneau de messages, sans quitter la grille de classe. L\u2019échange reste discret, contextuel, et ne perturbe ni l\u2019enseignant ni le reste de la classe.',
      pollTitle: 'Prendre le pouls de la classe en temps réel',
      pollDesc: 'L\u2019enseignant lance un sondage et voit les réponses arriver en direct. Un outil d\u2019évaluation formative qui se configure en quelques secondes et offre un retour immédiat sur le niveau de compréhension de la classe.',
      timerTitle: 'Cadrer le temps avec un minuteur partagé',
      timerDesc: 'Un compte à rebours s\u2019affiche simultanément sur toutes les tablettes de la classe. L\u2019enseignant donne un cadre temporel à un exercice, les élèves voient le décompte en direct. Simple, et très utilisé dans la pratique quotidienne.',
      resourceTitle: 'Distribuer un document à toute la classe',
      resourceDesc: 'L\u2019enseignant envoie un document, un fichier ou un lien à l\u2019ensemble de la classe ou à un groupe précis, en une seule action depuis le panneau de commandes.',
      linkTitle: 'Envoyer un lien web sur chaque tablette',
      linkDesc: 'L\u2019enseignant pousse une URL directement dans le navigateur de chaque élève. Plus besoin de dicter une adresse ou de l\u2019écrire au tableau — les élèves l\u2019ont sous les yeux instantanément.',
    },
    sessions: {
      title: 'Accompagner l\u2019enseignant de la première à la dernière minute du cours',
      subtitle: 'Chaque étape de la séance dispose de ses propres outils',
      description: 'SQOOL Classe structure le temps du cours numérique. De l\u2019ouverture de séance à la clôture, en passant par la distribution de ressources, les exercices et les évaluations, chaque moment dispose d\u2019outils dédiés qui réduisent la charge logistique de l\u2019enseignant et lui permettent de consacrer son énergie à la pédagogie.',
      openTitle: 'Ouvrir sa classe en 30\u00a0secondes',
      openDesc: 'L\u2019enseignant affiche un QR code sur son écran. Les élèves le scannent avec leur tablette et rejoignent la séance en quelques secondes, sans identifiant, sans mot de passe, sans configuration préalable.',
      endTitle: 'Clôturer proprement la séance',
      endDesc: 'Un écran récapitulatif rassemble les données clés de la séance\u00a0: durée, nombre d\u2019interactions, ressources partagées. L\u2019enseignant ferme la session et libère les tablettes pour le cours suivant.',
      assignmentTitle: 'Configurer un exercice encadré',
      assignmentDesc: 'L\u2019enseignant met en place un exercice chronométré avec les restrictions nécessaires\u00a0: verrouillage du navigateur, durée limitée, collecte automatique des rendus à la fin du temps imparti.',
      examSetupTitle: 'Préparer un examen depuis un seul écran',
      examSetupDesc: 'Pour les évaluations officielles, l\u2019enseignant paramètre l\u2019intégralité de l\u2019examen depuis une interface unique\u00a0: durée, applications autorisées, niveau de restriction, règles de remise des copies numériques.',
      examMonitorTitle: 'Superviser 32\u00a0postes en parallèle pendant l\u2019examen',
      examMonitorDesc: 'Pendant l\u2019épreuve, l\u2019enseignant surveille l\u2019ensemble des postes depuis sa grille. Des indicateurs en temps réel montrent où en est chaque élève, qui a terminé, et signalent immédiatement tout incident technique.',
      examReviewTitle: 'Collecter les copies et vérifier les remises',
      examReviewDesc: 'Une fois l\u2019examen terminé, l\u2019enseignant consulte les copies numériques, vérifie le statut de remise de chaque élève, et récupère l\u2019ensemble des fichiers en une seule opération.',
    },
    students: {
      title: 'L\u2019expérience côté élève\u00a0: présente quand il faut, invisible le reste du temps',
      subtitle: 'Une interface volontairement minimale',
      description: 'Du côté de l\u2019élève, SQOOL Classe n\u2019apparaît que lorsqu\u2019il y a quelque chose à faire\u00a0: rejoindre la séance, recevoir un document, répondre à un sondage, rendre un travail. Le reste du temps, la tablette reste un outil de travail ordinaire. Ce parti pris de design est délibéré\u00a0: l\u2019élève doit pouvoir travailler sans sentir qu\u2019il est surveillé, tout en sachant qu\u2019il peut compter sur l\u2019enseignant en cas de besoin.',
      loginTitle: 'Scanner le QR code et rejoindre la classe',
      loginDesc: 'L\u2019élève scanne le QR code affiché par l\u2019enseignant et rejoint la séance immédiatement, sans création de compte ni mot de passe à retenir.',
      resourcesTitle: 'Retrouver les ressources du cours',
      resourcesDesc: 'Les documents partagés par l\u2019enseignant apparaissent dans une liste simple, chronologique et accessible en un tap. L\u2019élève retrouve tout le matériel de la séance au même endroit.',
      doneTitle: 'Signaler qu\u2019on a terminé',
      doneDesc: 'L\u2019élève indique qu\u2019il a fini un exercice d\u2019un simple tap. L\u2019enseignant le voit immédiatement sur sa grille, ce qui lui permet d\u2019adapter le rythme du cours en conséquence.',
      questionTitle: 'Poser une question sans interrompre la classe',
      questionDesc: 'L\u2019élève envoie une question à l\u2019enseignant directement depuis sa tablette, de manière privée. Plus besoin de lever la main ou d\u2019attendre son tour pour obtenir de l\u2019aide.',
      shareTitle: 'Rendre un travail depuis sa tablette',
      shareDesc: 'L\u2019élève envoie un fichier directement à l\u2019enseignant. Le rendu est horodaté et confirmé côté élève, ce qui évite toute ambiguïté sur la remise.',
      receiveTitle: 'Recevoir un document de l\u2019enseignant',
      receiveDesc: 'Quand l\u2019enseignant partage une ressource, une notification discrète apparaît sur la tablette de l\u2019élève avec un accès direct au fichier.',
      lockedTitle: 'Comprendre le verrouillage sans stress',
      lockedDesc: 'Quand l\u2019enseignant verrouille les tablettes, un écran sobre et lisible s\u2019affiche. Le ton est calme, le message clair — l\u2019élève comprend immédiatement ce qui se passe et ne ressent aucune tension.',
    },
    journeys: {
      title: 'Trois séances complètes, du début à la fin',
      subtitle: 'Des parcours de bout en bout pour comprendre l\u2019usage réel',
      description: 'Ces prototypes montrent des séances entières telles qu\u2019elles se déroulent en classe, étape par étape. Ils illustrent comment les différentes fonctionnalités s\u2019articulent dans un usage réel et permettent de suivre le déroulement d\u2019un cours numérique du point de vue de l\u2019enseignant.',
      sc1Title: 'Démarrer un cours et distribuer les ressources',
      sc1Desc: 'L\u2019enseignant ouvre sa séance, partage les documents du cours, et les élèves reçoivent le matériel directement sur leur tablette en quelques secondes.',
      sc7Title: 'Conduire un examen officiel de bout en bout',
      sc7Desc: 'Le parcours complet d\u2019une épreuve\u00a0: configuration de l\u2019examen, surveillance de 32\u00a0élèves en parallèle, et collecte des copies numériques à la fin de l\u2019épreuve.',
      sc10Title: 'Une séance type avec interactions et évaluation',
      sc10Desc: 'Le déroulé d\u2019un cours complet tel qu\u2019il se vit en classe\u00a0: ouverture, enseignement, échanges avec les élèves, évaluation rapide et clôture de séance.',
    },
    impact: {
      title: 'Ce que ce travail a produit',
      intro: 'SQOOL Classe est devenu l\u2019application de référence au sein de la suite SQOOL, reconnue à la fois pour la clarté de son interface et pour sa fiabilité en conditions réelles. Les enseignants pilotes ont rapporté un gain concret de sérénité pendant leurs cours et une réduction significative du temps qu\u2019ils consacraient auparavant à la gestion technique des tablettes — du temps qu\u2019ils ont pu réinvestir dans la pédagogie.',
      stat1: '465',
      stat1Desc: 'Établissements équipés en Île-de-France',
      stat2: '50+',
      stat2Desc: 'Prototypes interactifs documentant chaque scénario d\u2019usage',
      stat3: '30\u00a0s',
      stat3Desc: 'Pour ouvrir une séance et connecter toute la classe via QR code',
      stat4: '1',
      stat4Desc: 'Application web, accessible sur tablette et ordinateur, sans installation',
    },
    testimonial: {
      quote: 'Pour la premi\u00e8re fois, j\u2019ai senti que je pouvais g\u00e9rer ma classe sans \u00e9lever la voix. SQOOL Classe m\u2019a redonn\u00e9 de la s\u00e9r\u00e9nit\u00e9.',
      author: 'Enseignante',
      role: 'Pilote de test, 2023',
    },
    heroTestimonial: {
      quote: "J\u2019ai eu la chance de collaborer avec Victor pendant 3 ans en bin\u00f4me et c\u2019est l\u2019un des designers les plus inspirants avec qui j\u2019ai travaill\u00e9. Victor allie une cr\u00e9ativit\u00e9 d\u00e9bordante \u00e0 une rigueur de travail impressionnante. Il sait traduire des visions complexes en exp\u00e9riences utilisateur claires et percutantes. Toujours \u00e0 l\u2019\u00e9coute, curieux, il pousse constamment les r\u00e9flexions plus loin, que ce soit sur le fond ou sur la forme. J\u2019ai particuli\u00e8rement appr\u00e9ci\u00e9 notre capacit\u00e9 \u00e0 co-construire\u00a0: il n\u2019a pas peur de challenger les id\u00e9es tout en restant dans une posture bienveillante, tourn\u00e9e vers la qualit\u00e9 du produit et l\u2019impact utilisateur. Je le recommande \u00e0 toute \u00e9quipe qui cherche un Lead Design \u00e0 la fois cr\u00e9atif, exigeant, et profond\u00e9ment humain.",
      author: 'Charlotte Rifflet',
      role: 'CPO, UNOWHY',
    },
    metaLabels: {
      type: 'Type',
      scope: 'P\u00e9rim\u00e8tre',
      period: 'P\u00e9riode',
      company: 'Entreprise',
    },
    transitions: {
      gridToOrchestration: 'Avoir une vue claire de sa classe est le point de départ. Mais l\u2019enseignant a aussi besoin d\u2019agir, rapidement, sans quitter cette vue d\u2019ensemble.',
      orchestrationToCommunication: 'Le pilotage des écrans couvre une partie du besoin. L\u2019autre partie concerne la relation pédagogique elle-même\u00a0: les échanges entre l\u2019enseignant et ses élèves.',
      communicationToSessions: 'Toutes ces interactions prennent leur sens à l\u2019intérieur d\u2019un cadre temporel\u00a0: la séance de cours, de l\u2019ouverture à la clôture.',
      sessionsToStudents: 'Tout ce qui précède a été pensé du point de vue de l\u2019enseignant. Il est temps de regarder ce que vit l\u2019élève de l\u2019autre côté de l\u2019écran.',
      studentsToJourneys: 'Pour comprendre comment ces éléments s\u2019assemblent dans la pratique, voici trois séances complètes telles qu\u2019elles se déroulent en classe.',
    },
  },
};

// TOC Sections
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'grid', label: 'Grid' },
    { id: 'orchestration', label: 'Orchestration' },
    { id: 'communication', label: 'Communication' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'students', label: 'Students' },
    { id: 'journeys', label: 'Journeys' },
    { id: 'impact', label: 'Impact' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'hero', label: 'Intro' },
    { id: 'overview', label: 'Vue d\u2019ensemble' },
    { id: 'challenge', label: 'Enjeu' },
    { id: 'grid', label: 'Grille' },
    { id: 'orchestration', label: 'Orchestration' },
    { id: 'communication', label: 'Communication' },
    { id: 'sessions', label: 'S\u00e9ances' },
    { id: 'students', label: '\u00c9l\u00e8ves' },
    { id: 'journeys', label: 'Parcours' },
    { id: 'impact', label: 'Impact' },
  ],
};

const SqoolClassePage: React.FC<SqoolClassePageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme: _onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'fr',
  onContact,
}) => {
  useEffect(() => {
    updateMetaTags(PROJECT_SEO['sqool-classe']);
    return () => updateMetaTags(DEFAULT_SEO);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prototype lightbox state
  const [prototypeLightboxOpen, setPrototypeLightboxOpen] = useState(false);
  const [protoLightboxGroup, setProtoLightboxGroup] = useState<{id: string; title: string; desc: string}[]>([]);
  const [protoLightboxIndex, setProtoLightboxIndex] = useState(0);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<PrototypeCategory | null>(null);
  const [activeGalleryPrototype, setActiveGalleryPrototype] = useState<string | null>(null);

  // All images for lightbox navigation
  const caseImages = [
    { src: '/images/thumbnail_sqool_classe.webp', caption: 'SQOOL Classe' },
    { src: '/images/sqool/sqool classe/Visuel - Comm - Pilotage - accueil - Focus Classe temporaire@2x.webp', caption: lang === 'fr' ? 'Tableau de bord enseignant' : 'Teacher dashboard' },
  ];

  const openImageLightbox = useCallback((imageSrc: string) => {
    const index = caseImages.findIndex(img => img.src === imageSrc);
    if (index >= 0) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  }, [caseImages]);
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(
    viewMode === 'executive' ? 'executive' : 'full'
  );

  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const sections = TOC_SECTIONS[lang] || TOC_SECTIONS.fr;

  const openPrototypeLightbox = useCallback((prototypes: PrototypeItem[], index: number) => {
    setProtoLightboxGroup(prototypes.map(p => ({
      id: p.id,
      title: p.title[lang],
      desc: p.desc[lang],
    })));
    setProtoLightboxIndex(index);
    setPrototypeLightboxOpen(true);
  }, [lang]);

  // Scroll to top on mount
  useEffect(() => {
    const el = containerRef.current;
    const resetScroll = () => {
      if (el) el.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 150);
    const t3 = setTimeout(resetScroll, 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Scroll tracking for active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setShowNav(true);

      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i];
        if (el && el.offsetTop - 200 <= scrollTop) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('top');
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Sync caseStudyMode with viewMode prop and scroll to top on switch
  useEffect(() => {
    if (viewMode === 'executive') setCaseStudyMode('executive');
    else if (viewMode === 'caseStudy') setCaseStudyMode('full');
    // Reset scroll immediately and after AnimatePresence exit/enter completes
    const resetScroll = () => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
    };
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 200);
    const t3 = setTimeout(resetScroll, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [viewMode]);

  const scrollToSection = useCallback((sectionId: string) => {
    const container = containerRef.current;
    if (!container) return;
    if (sectionId === 'top') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const headerHeight = 64;
      const elTop = el.getBoundingClientRect().top + container.scrollTop - container.getBoundingClientRect().top;
      container.scrollTo({ top: elTop - headerHeight - 16, behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      {/* Image Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={caseImages.map(img => ({ src: img.src, caption: img.caption, type: 'image' as const }))}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="sqool-classe"
      />

      {/* Prototype Lightbox */}
      <PrototypeLightbox
        isOpen={prototypeLightboxOpen}
        onClose={() => setPrototypeLightboxOpen(false)}
        prototypes={protoLightboxGroup}
        currentIndex={protoLightboxIndex}
        onIndexChange={setProtoLightboxIndex}
      />

      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        isVisible={showNav && viewMode !== 'gallery' && caseStudyMode === 'full'}
        lang={lang}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80'
        }`}
      >
        <div className="w-full px-6 h-16 flex items-center gap-4">
          <div className="flex-shrink-0">
            <h1
              className={`font-semibold text-lg tracking-[-0.02em] ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              SQOOL Classe
            </h1>
          </div>

          {/* Center toggle */}
          <div className="flex-1 flex justify-center">
            <div
              className={`relative flex items-center gap-0.5 sm:gap-1 rounded-full p-0.5 sm:p-1 ${
                isDark ? 'bg-white/10' : 'bg-gray-100'
              }`}
            >
              {/* Summary button */}
              <button
                onClick={() => { onViewModeChange('executive'); setCaseStudyMode('executive'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {(viewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive')) && (
                  <motion.div
                    layoutId="sqoolclasse-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  (viewMode === 'executive' || (viewMode === 'caseStudy' && caseStudyMode === 'executive'))
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Resume' : 'Summary'}</span>
                  <span className="sm:hidden">{lang === 'fr' ? 'Res.' : 'Sum.'}</span>
                </span>
              </button>
              {/* Full case button */}
              <button
                onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'caseStudy' && caseStudyMode === 'full' && (
                  <motion.div
                    layoutId="sqoolclasse-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'caseStudy' && caseStudyMode === 'full'
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{lang === 'fr' ? 'Cas complet' : 'Full case'}</span>
                  <span className="sm:hidden">Full</span>
                </span>
              </button>
              {/* Gallery button */}
              <button
                onClick={() => onViewModeChange('gallery')}
                className="relative z-10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {viewMode === 'gallery' && (
                  <motion.div
                    layoutId="sqoolclasse-toggle-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className={`relative z-10 ${
                  viewMode === 'gallery'
                    ? 'text-white'
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                }`}>
                  <span className="hidden sm:inline">{t.gallery}</span>
                  <span className="sm:hidden">Proto.</span>
                </span>
              </button>
            </div>
          </div>

          {/* Close button */}
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              className={`relative p-3 flex items-center justify-center rounded-full transition-colors before:absolute before:inset-[-12px] before:content-[''] ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'gallery' ? (
          /* Prototype Showcase View */
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-8 md:py-16">
              <div className="flex gap-8">
                {/* Sidebar */}
                <GallerySidebar
                  activeCategory={activeGalleryCategory}
                  activePrototypeId={activeGalleryPrototype}
                  onPrototypeClick={(pid) => {
                    setActiveGalleryPrototype(pid);
                    const el = document.getElementById(`proto-${pid}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  onCategoryClick={(cat) => {
                    setActiveGalleryCategory(cat);
                    const el = document.getElementById(`gallery-cat-${cat}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  isDark={isDark}
                  lang={lang}
                />

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <section className="mb-12">
                    <h1 className={`text-3xl md:text-4xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lang === 'fr' ? 'Tous les prototypes' : 'All Prototypes'}
                    </h1>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang === 'fr'
                        ? 'Parcourez chaque interaction, sc\u00e9nario et flux utilisateur con\u00e7us pour SQOOL Classe'
                        : 'Explore every interaction, scenario, and user flow designed for SQOOL Classe'}
                    </p>
                  </section>

                  {GALLERY_CATEGORIES.map(cat => {
                    const colors = CATEGORY_COLORS[cat.id];
                    const categoryPrototypes = cat.prototypeIds
                      .map(pid => PROTOTYPE_MAP.get(pid))
                      .filter((p): p is PrototypeItem => !!p);
                    return (
                      <section key={cat.id} id={`gallery-cat-${cat.id}`} className="mb-16">
                        <div className="flex items-center gap-2 mb-6">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {CATEGORY_LABELS[cat.id][lang]}
                          </h2>
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {cat.prototypeIds.length}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {categoryPrototypes.map((proto, i) => (
                            <div key={proto.id} id={`proto-${proto.id}`}>
                              <PrototypeCard
                                prototypeId={proto.id}
                                title={proto.title[lang]}
                                description={proto.desc[lang]}
                                category={proto.category}
                                isDark={isDark}
                                onClick={() => {
                                  setActiveGalleryPrototype(proto.id);
                                  openPrototypeLightbox(categoryPrototypes, i);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : caseStudyMode === 'executive' ? (
          /* Executive Summary */
          <motion.div
            key="executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
              <main className="w-full">
                {/* Executive Hero */}
                <section className="mb-16">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.role}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.period}</span>
                  </div>
                  <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t.hero.title}
                  </h1>
                  <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.hero.description}
                  </p>
                </section>

                {/* Hero Image */}
                <figure className="mb-16">
                  <div
                    onClick={() => openImageLightbox('/images/thumbnail_sqool_classe.webp')}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ease-out hover:scale-[1.015] hover:shadow-xl ${
                      isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                    } bg-[#E7E7E7]`}
                  >
                    <img
                      loading="lazy"
                      src="/images/thumbnail_sqool_classe.webp"
                      alt="SQOOL Classe - Supervision de classe en temps réel"
                      className="w-full h-auto"
                    />
                  </div>
                </figure>

                {/* 3 Design Pillars */}
                <section className="mb-16">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: <Eye size={24} />, title: t.challenge.pillar1Title, desc: t.challenge.pillar1Desc, color: 'blue' },
                      { icon: <Monitor size={24} />, title: t.challenge.pillar2Title, desc: t.challenge.pillar2Desc, color: 'purple' },
                      { icon: <Users size={24} />, title: t.challenge.pillar3Title, desc: t.challenge.pillar3Desc, color: 'green' },
                    ].map((pillar, i) => (
                      <div
                        key={i}
                        className={`p-6 rounded-2xl border ${
                          isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded-xl w-fit mb-4 ${
                          isDark ? `bg-${pillar.color}-600/20` : `bg-${pillar.color}-50`
                        }`}>
                          <div className={isDark ? `text-${pillar.color}-400` : `text-${pillar.color}-600`}>
                            {pillar.icon}
                          </div>
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {pillar.title}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key prototypes carousel */}
                <section className="mb-16">
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'fr' ? 'Prototypes clés' : 'Key prototypes'}
                  </h3>
                  <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'fr'
                      ? 'Ces prototypes illustrent les interactions fondamentales du produit : ouvrir une classe, superviser une séance complète, et gérer les imprévus en temps réel.'
                      : 'These prototypes illustrate the core interactions of the product: opening a class, supervising a full session, and handling real-time events.'}
                  </p>
                  {(() => {
                    const execProtos = EXECUTIVE_PROTOTYPES
                      .map(id => PROTOTYPE_MAP.get(id))
                      .filter((p): p is PrototypeItem => !!p);
                    return (
                      <PrototypeCarousel
                        prototypes={execProtos}
                        isDark={isDark}
                        lang={lang}
                        onCardClick={(i) => openPrototypeLightbox(execProtos, i)}
                      />
                    );
                  })()}
                </section>

                {/* Impact Stats */}
                <section className="mb-16">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { value: t.impact.stat1, label: t.impact.stat1Desc },
                      { value: t.impact.stat2, label: t.impact.stat2Desc },
                      { value: t.impact.stat3, label: t.impact.stat3Desc },
                      { value: t.impact.stat4, label: t.impact.stat4Desc },
                    ].map((stat, i) => (
                      <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <p className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Testimonial */}
                <section className="mb-16">
                  <blockquote className={`p-8 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <p className={`text-lg italic mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      "{t.testimonial.quote}"
                    </p>
                    <footer className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      — {t.testimonial.author}, {t.testimonial.role}
                    </footer>
                  </blockquote>
                </section>

                {/* CTA to full case */}
                <section className="text-center py-12">
                  <button
                    onClick={() => { onViewModeChange('caseStudy'); setCaseStudyMode('full'); }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
                  >
                    {lang === 'fr' ? 'Voir le cas complet' : 'View full case study'}
                    <ArrowRight size={20} />
                  </button>
                </section>
              </main>
            </div>
          </motion.div>
        ) : (
          /* Full Case Study */
          <motion.div
            key="caseStudy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="max-w-[1200px] mx-auto px-10 py-12 md:py-16">
              <div>
                <main className="w-full">

                  {/* ==================== HERO ==================== */}
                  <section id="hero" className="mb-24 md:mb-32">
                    {/* Logo */}
                    <img
                      loading="lazy"
                      src="/images/sqool/logo-sqool.svg"
                      alt="SQOOL"
                      className="h-8 w-auto mb-8"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-start">
                      {/* Left: Hero text */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.role}</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.scope}</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.period}</span>
                        </div>

                        <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t.hero.title}
                        </h1>

                        <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t.hero.subtitle}
                        </h2>

                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.hero.description}
                        </p>
                      </div>

                      {/* Right: Charlotte Rifflet testimonial */}
                      <blockquote className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                        </div>
                        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.heroTestimonial.quote}
                        </p>
                        <footer className="flex items-center gap-3">
                          <div>
                            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {t.heroTestimonial.author}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {t.heroTestimonial.role}
                            </p>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </section>

                  {/* Project Meta Card */}
                  <div className={`p-6 rounded-3xl border mb-12 ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                          <Layers size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.type}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                          <Briefcase size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.scope}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.scope}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                          <Calendar size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.period}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.period}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                          <Building2 size={20} className={isDark ? 'text-orange-400' : 'text-orange-600'} />
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.metaLabels.company}</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.meta.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <figure className="mb-24 md:mb-32">
                    <div
                      onClick={() => openImageLightbox('/images/thumbnail_sqool_classe.webp')}
                      className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-[1.015] hover:shadow-xl border ${
                        isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                      } bg-[#E7E7E7]`}
                    >
                      <img
                        loading="lazy"
                        src="/images/thumbnail_sqool_classe.webp"
                        alt="SQOOL Classe - Supervision de classe en temps réel"
                        className="w-full h-auto"
                      />
                    </div>
                  </figure>

                  {/* ==================== OVERVIEW ==================== */}
                  <section id="overview" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-12 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.overview.title}
                    </h1>

                    <div className="grid md:grid-cols-2 gap-10 mb-12">
                      {/* Introduction */}
                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t.overview.introTitle}
                        </h3>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.overview.introDesc}
                        </p>
                      </div>

                      {/* My Role */}
                      <div>
                        <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {t.overview.roleTitle}
                        </h3>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t.overview.roleDesc}
                        </p>
                      </div>
                    </div>

                    {/* Strategic Objectives */}
                    <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.overview.objectivesTitle}
                      </h3>
                      <ul className="space-y-3">
                        {[t.overview.objective1, t.overview.objective2, t.overview.objective3, t.overview.objective4].map((obj, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                            <span className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* ==================== CONTEXT ==================== */}
                  <section id="context" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.context.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.context.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.context.description}
                    </p>

                    {/* Frustration cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { icon: <Monitor size={24} />, title: t.context.frustration1Title, desc: t.context.frustration1Desc },
                        { icon: <Eye size={24} />, title: t.context.frustration2Title, desc: t.context.frustration2Desc },
                        { icon: <Users size={24} />, title: t.context.frustration3Title, desc: t.context.frustration3Desc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-red-600/20' : 'bg-red-50'}`}>
                            <div className={isDark ? 'text-red-400' : 'text-red-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Problem-framing question */}
                    <div className={`mt-16 p-8 rounded-2xl border-l-4 ${
                      isDark ? 'border-l-blue-500 bg-blue-500/10' : 'border-l-blue-600 bg-blue-50'
                    }`}>
                      <p className={`text-xl md:text-2xl font-bold italic leading-snug ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t.context.problemQuestion}
                      </p>
                    </div>
                  </section>

                  {/* ==================== CHALLENGE ==================== */}
                  <section id="challenge" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.challenge.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.challenge.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.challenge.description}
                    </p>

                    {/* 3 Design Pillars */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                          <Eye size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.challenge.pillar1Title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.challenge.pillar1Desc}</p>
                      </div>
                      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                          <Monitor size={24} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.challenge.pillar2Title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.challenge.pillar2Desc}</p>
                      </div>
                      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                          <Users size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.challenge.pillar3Title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.challenge.pillar3Desc}</p>
                      </div>
                    </div>
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== THE GRID ==================== */}
                  <section id="grid" className="mb-24 md:mb-32">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                      isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Monitor size={12} />
                      {lang === 'fr' ? 'Côté enseignant' : 'Teacher side'}
                    </span>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.grid.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.grid.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.grid.description}
                    </p>

                    {/* Grid prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('grid');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Grid features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <Eye size={24} />, title: t.grid.statesTitle, desc: t.grid.statesDesc },
                        { icon: <Lock size={24} />, title: t.grid.lockTitle, desc: t.grid.lockDesc },
                        { icon: <Maximize2 size={24} />, title: t.grid.viewerTitle, desc: t.grid.viewerDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                            <div className={isDark ? 'text-blue-400' : 'text-blue-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Grid → Orchestration */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.gridToOrchestration}
                    </p>
                  </div>

                  {/* ==================== ORCHESTRATION ==================== */}
                  <section id="orchestration" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.orchestration.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.orchestration.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.orchestration.description}
                    </p>

                    {/* Orchestration prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('orchestration');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Orchestration features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <Users size={24} />, title: t.orchestration.randomTitle, desc: t.orchestration.randomDesc },
                        { icon: <Monitor size={24} />, title: t.orchestration.projectionTitle, desc: t.orchestration.projectionDesc },
                        { icon: <Eye size={24} />, title: t.orchestration.spotlightTitle, desc: t.orchestration.spotlightDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
                            <div className={isDark ? 'text-purple-400' : 'text-purple-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Orchestration → Communication */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.orchestrationToCommunication}
                    </p>
                  </div>

                  {/* ==================== COMMUNICATION ==================== */}
                  <section id="communication" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.communication.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.communication.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.communication.description}
                    </p>

                    {/* Communication prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('communication');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Communication features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <MessageCircle size={24} />, title: t.communication.messagesTitle, desc: t.communication.messagesDesc },
                        { icon: <ArrowRight size={24} />, title: t.communication.replyTitle, desc: t.communication.replyDesc },
                        { icon: <Timer size={24} />, title: t.communication.timerTitle, desc: t.communication.timerDesc },
                        { icon: <FileText size={24} />, title: t.communication.resourceTitle, desc: t.communication.resourceDesc },
                        { icon: <ExternalLink size={24} />, title: t.communication.linkTitle, desc: t.communication.linkDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                            <div className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Communication → Sessions */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.communicationToSessions}
                    </p>
                  </div>

                  {/* ==================== SESSIONS & EXAMS ==================== */}
                  <section id="sessions" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.sessions.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.sessions.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.sessions.description}
                    </p>

                    {/* Sessions prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('sessions');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Session & exam features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <Timer size={24} />, title: t.sessions.endTitle, desc: t.sessions.endDesc },
                        { icon: <FileText size={24} />, title: t.sessions.assignmentTitle, desc: t.sessions.assignmentDesc },
                        { icon: <Layers size={24} />, title: t.sessions.examSetupTitle, desc: t.sessions.examSetupDesc },
                        { icon: <Eye size={24} />, title: t.sessions.examMonitorTitle, desc: t.sessions.examMonitorDesc },
                        { icon: <FileText size={24} />, title: t.sessions.examReviewTitle, desc: t.sessions.examReviewDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
                            <div className={isDark ? 'text-orange-400' : 'text-orange-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Sessions → Students */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.sessionsToStudents}
                    </p>
                  </div>

                  {/* ==================== STUDENT EXPERIENCE ==================== */}
                  <section id="students" className="mb-24 md:mb-32">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                      isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-50 text-green-700'
                    }`}>
                      <Users size={12} />
                      {lang === 'fr' ? 'Côté élève' : 'Student side'}
                    </span>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.students.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.students.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.students.description}
                    </p>

                    {/* Student prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('students');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Student features described as cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { icon: <FileText size={24} />, title: t.students.resourcesTitle, desc: t.students.resourcesDesc },
                        { icon: <ArrowRight size={24} />, title: t.students.doneTitle, desc: t.students.doneDesc },
                        { icon: <MessageCircle size={24} />, title: t.students.questionTitle, desc: t.students.questionDesc },
                        { icon: <FileText size={24} />, title: t.students.shareTitle, desc: t.students.shareDesc },
                        { icon: <FileText size={24} />, title: t.students.receiveTitle, desc: t.students.receiveDesc },
                        { icon: <Lock size={24} />, title: t.students.lockedTitle, desc: t.students.lockedDesc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                            <div className={isDark ? 'text-green-400' : 'text-green-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transition: Students → Journeys */}
                  <div className={`my-16 md:my-24 py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.transitions.studentsToJourneys}
                    </p>
                  </div>

                  {/* ==================== COMPLETE JOURNEYS ==================== */}
                  <section id="journeys" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.journeys.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.journeys.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.journeys.description}
                    </p>

                    {/* Journeys prototypes carousel */}
                    {(() => {
                      const protos = getPrototypesForSection('journeys');
                      return (
                        <PrototypeCarousel
                          prototypes={protos}
                          isDark={isDark}
                          lang={lang}
                          onCardClick={(i) => openPrototypeLightbox(protos, i)}
                        />
                      );
                    })()}

                    {/* Other journeys described as cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      {[
                        { icon: <Play size={24} />, title: t.journeys.sc1Title, desc: t.journeys.sc1Desc },
                        { icon: <FileText size={24} />, title: t.journeys.sc7Title, desc: t.journeys.sc7Desc },
                      ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <div className={`p-2 rounded-xl w-fit mb-4 ${isDark ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                            <div className={isDark ? 'text-blue-400' : 'text-blue-600'}>{item.icon}</div>
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== IMPACT ==================== */}
                  <section id="impact" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.impact.title}
                    </h1>
                    <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.impact.intro}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                      {[
                        { value: t.impact.stat1, label: t.impact.stat1Desc },
                        { value: t.impact.stat2, label: t.impact.stat2Desc },
                        { value: t.impact.stat3, label: t.impact.stat3Desc },
                        { value: t.impact.stat4, label: t.impact.stat4Desc },
                      ].map((stat, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                          <p className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <blockquote className={`p-8 rounded-2xl border ${isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <p className={`text-lg italic mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        "{t.testimonial.quote}"
                      </p>
                      <footer className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.testimonial.author}, {t.testimonial.role}
                      </footer>
                    </blockquote>
                  </section>

                  {/* ==================== CTA ==================== */}
                  <section className="py-24 md:py-32 px-10">
                    <div className="max-w-[800px] mx-auto text-center">
                      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t.cta.title}
                      </h2>
                      <button
                        onClick={onContact}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
                      >
                        {t.cta.button}
                        <ArrowRight size={22} />
                      </button>
                    </div>
                  </section>

                </main>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SqoolClassePage;
