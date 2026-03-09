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
import EnhancedLightbox from './src/components/EnhancedLightbox';
import CaseStudyTOCSidebar from './src/components/CaseStudyTOCSidebar';
import PrototypeCard from './src/components/PrototypeCard';
import PrototypeCarousel from './src/components/PrototypeCarousel';
import PrototypeLightbox from './src/components/PrototypeLightbox';
import GallerySidebar from './src/components/GallerySidebar';
import {
  PROTOTYPE_MAP,
  GALLERY_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  EXECUTIVE_PROTOTYPES,
  getPrototypesForSection,
  PrototypeCategory,
  PrototypeItem,
} from './src/data/sqoolPrototypesData';

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
    caseStudy: '\u00c9tude de cas',
    gallery: 'Prototypes',
    cta: {
      title: 'Envie de travailler ensemble\u00a0?',
      button: 'Me contacter',
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
      introTitle: 'Introduction',
      introDesc: 'En 2019, la R\u00e9gion \u00cele-de-France a lanc\u00e9 l\u2019un des plus grands programmes d\u2019\u00e9quipement num\u00e9rique \u00e9ducatif en France\u00a0: distribuer une tablette ou un PC \u00e0 chacun des 500\u00a0000\u00a0\u00e9l\u00e8ves et enseignants de 465\u00a0lyc\u00e9es. Ce d\u00e9ploiement massif a fait na\u00eetre un probl\u00e8me tr\u00e8s concret dans chaque salle de classe\u00a0: comment un enseignant peut-il g\u00e9rer 30\u00a0appareils individuels pendant un cours sans perdre la ma\u00eetrise de la salle\u00a0? SQOOL Classe est n\u00e9 de cette question, quotidienne et urgente.',
      roleTitle: 'Mon r\u00f4le',
      roleDesc: 'J\u2019ai pilot\u00e9 le design d\u2019interaction et le prototypage de SQOOL Classe de z\u00e9ro. En collaboration \u00e9troite avec la CPO, j\u2019ai pris en charge l\u2019ensemble du p\u00e9rim\u00e8tre design\u00a0: recherche utilisateur aupr\u00e8s d\u2019enseignants et d\u2019\u00e9l\u00e8ves, architecture d\u2019information, flux d\u2019interaction, patterns d\u2019interface temps r\u00e9el, et une biblioth\u00e8que de plus de 50\u00a0prototypes interactifs documentant chaque sc\u00e9nario. J\u2019ai \u00e9galement encadr\u00e9 une \u00e9quipe de designers contribuant \u00e0 l\u2019\u00e9cosyst\u00e8me SQOOL dans son ensemble.',
      objectivesTitle: 'Objectifs strat\u00e9giques',
      objective1: 'Donner \u00e0 l\u2019enseignant une vue sereine et fiable de l\u2019activit\u00e9 de tous ses \u00e9l\u00e8ves pendant le cours',
      objective2: 'R\u00e9duire le temps pass\u00e9 sur la gestion technique des appareils pour que la p\u00e9dagogie reste la priorit\u00e9',
      objective3: 'Fonctionner dans les contraintes r\u00e9elles des \u00e9tablissements\u00a0: Wi-Fi instable, mat\u00e9riel h\u00e9t\u00e9rog\u00e8ne',
      objective4: 'Livrer une application web accessible depuis n\u2019importe quel navigateur, sur n\u2019importe quel appareil',
    },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Supervision temps r\u00e9el, UX Classe',
      period: '2022',
      title: 'Rendre la classe num\u00e9rique lisible, calme et pilotable',
      subtitle: 'Un outil de supervision con\u00e7u pour s\u2019effacer derri\u00e8re la p\u00e9dagogie',
      description: 'En 2019, la R\u00e9gion \u00cele-de-France a distribu\u00e9 une tablette \u00e0 chacun des 500\u00a0000\u00a0\u00e9l\u00e8ves et enseignants de 465\u00a0lyc\u00e9es. Cette d\u00e9cision a cr\u00e9\u00e9 un probl\u00e8me tr\u00e8s concret dans chaque salle de classe\u00a0: comment g\u00e9rer 30\u00a0\u00e9crans en parall\u00e8le, rep\u00e9rer les d\u00e9crochages, et garder le fil du cours\u00a0? SQOOL Classe est l\u2019application web que j\u2019ai con\u00e7ue pour r\u00e9pondre \u00e0 cette question. Elle offre \u00e0 l\u2019enseignant une vue claire de sa classe, des actions imm\u00e9diates sur chaque appareil, et la s\u00e9r\u00e9nit\u00e9 n\u00e9cessaire pour se concentrer sur l\u2019essentiel\u00a0: enseigner.',
    },
    context: {
      title: 'Que se passe-t-il quand 500\u00a0000\u00a0\u00e9l\u00e8ves re\u00e7oivent une tablette\u00a0?',
      subtitle: 'Un programme ambitieux, des difficult\u00e9s tr\u00e8s concr\u00e8tes',
      description: 'Le plan num\u00e9rique \u00e9ducatif de la R\u00e9gion \u00cele-de-France portait une promesse forte\u00a0: personnaliser les apprentissages, moderniser les pratiques p\u00e9dagogiques. Sur le terrain, les enseignants que nous avons rencontr\u00e9s d\u00e9crivaient une r\u00e9alit\u00e9 diff\u00e9rente. La tablette ajoutait une couche de complexit\u00e9 \u00e0 leur quotidien\u00a0: g\u00e9rer les distractions, v\u00e9rifier que chacun suit, r\u00e9agir aux probl\u00e8mes techniques, le tout en maintenant le rythme du cours. Les outils disponibles sur le march\u00e9 \u00e9taient soit trop intrusifs (surveillance totale, climat de m\u00e9fiance), soit trop instables pour un r\u00e9seau Wi-Fi scolaire.',
      frustration1Title: 'Charge mentale enseignante',
      frustration1Desc: 'En entretien, une phrase revenait r\u00e9guli\u00e8rement\u00a0: \u00ab\u00a0Je passe plus de temps \u00e0 surveiller les \u00e9crans qu\u2019\u00e0 enseigner.\u00a0\u00bb Sans vue d\u2019ensemble sur l\u2019activit\u00e9 des \u00e9l\u00e8ves, les enseignants perdaient le fil de leur cours et le sentiment de ma\u00eetrise de leur salle.',
      frustration2Title: 'Infrastructure fragile',
      frustration2Desc: 'Le Wi-Fi dans les \u00e9tablissements scolaires est rarement stable. Toute solution de supervision devait fonctionner de mani\u00e8re fluide sur des r\u00e9seaux lents ou intermittents, sans plantage ni perte de donn\u00e9es. Un outil qui plante en plein cours g\u00e9n\u00e8re plus de frustration que de valeur.',
      frustration3Title: '\u00c9quilibre confiance et contr\u00f4le',
      frustration3Desc: 'Les enseignants avaient besoin de reprendre la main, mais l\u2019outil ne devait pas ressembler \u00e0 un dispositif de surveillance. Le d\u00e9fi \u00e9tait de fournir de la visibilit\u00e9 et de la r\u00e9activit\u00e9 tout en pr\u00e9servant la relation de confiance avec les \u00e9l\u00e8ves.',
      problemQuestion: 'Comment donner \u00e0 l\u2019enseignant une vision en temps r\u00e9el de 30\u00a0\u00e9crans sans transformer la classe en salle de surveillance\u00a0?',
    },
    challenge: {
      title: 'Comment rendre visible sans envahir\u00a0?',
      subtitle: 'Trois principes pour structurer la r\u00e9ponse',
      description: 'L\u2019enseignant a besoin de voir ce qui se passe sur chaque tablette pour maintenir le cadre p\u00e9dagogique. Mais l\u2019interface ne doit ni le submerger d\u2019informations, ni instaurer un climat de contr\u00f4le permanent. Ce paradoxe est au c\u0153ur du probl\u00e8me de design. Nous avons structur\u00e9 notre approche autour de trois principes qui ont guid\u00e9 chaque d\u00e9cision, du macro (l\u2019architecture d\u2019information) au micro (le code couleur d\u2019une tuile \u00e9l\u00e8ve).',
      pillar1Title: 'Visibilit\u00e9 instantan\u00e9e',
      pillar1Desc: 'L\u2019enseignant doit pouvoir scanner l\u2019\u00e9tat de toute sa classe d\u2019un seul regard. Une grille de tuiles avec un code couleur sobre restitue l\u2019essentiel\u00a0: qui est connect\u00e9, qui travaille, qui d\u00e9croche.',
      pillar2Title: 'Action imm\u00e9diate',
      pillar2Desc: 'Verrouiller les \u00e9crans, envoyer un document, projeter un contenu\u00a0: ces gestes critiques doivent \u00eatre accessibles en un seul tap, sans navigation ni confirmation superflue.',
      pillar3Title: 'Calme et lisibilit\u00e9',
      pillar3Desc: 'La densit\u00e9 d\u2019information est calibr\u00e9e pour rassurer, pas pour alerter en permanence. Les \u00e9tats visuels d\u2019alerte sont r\u00e9serv\u00e9s aux situations qui le justifient r\u00e9ellement.',
    },
    grid: {
      title: 'Que voit l\u2019enseignant quand il regarde sa classe\u00a0?',
      subtitle: 'La carte \u00e9l\u00e8ve, brique centrale de l\u2019interface',
      description: 'Tout repose sur un composant\u00a0: la carte \u00e9l\u00e8ve. Chaque tuile condense le nom, l\u2019application en cours, le niveau de batterie et l\u2019\u00e9tat de connexion. L\u2019enjeu de design \u00e9tait de garder ces informations lisibles sans surcharger l\u2019\u00e9cran, y compris avec 32\u00a0\u00e9l\u00e8ves affich\u00e9s simultan\u00e9ment. La grille doit fonctionner comme un tableau de bord que l\u2019enseignant consulte d\u2019un coup d\u2019\u0153il entre deux explications, pas comme un \u00e9cran qu\u2019il faut analyser.',
      statesTitle: '\u00c9tats visuels non ambigu\u00ebs',
      statesDesc: 'Chaque appareil passe par des \u00e9tats clairs\u00a0: \u00e9teint, inactif, actif, en projection, verrouill\u00e9. Les transitions sont visibles et progressives. Pendant la connexion initiale, un skeleton loading \u00e9vite toute impression de latence ou de dysfonctionnement.',
      screensTitle: 'Aper\u00e7u des \u00e9crans en direct',
      screensDesc: 'L\u2019enseignant peut activer un mode d\u2019aper\u00e7u o\u00f9 chaque carte affiche une vignette de l\u2019\u00e9cran \u00e9l\u00e8ve, rafra\u00eechie p\u00e9riodiquement. Cela donne une conscience imm\u00e9diate de l\u2019activit\u00e9 de chacun, sans ouvrir de vue individuelle.',
      lockTitle: 'Verrouillage g\u00e9n\u00e9ral',
      lockDesc: 'Le geste le plus utilis\u00e9 au quotidien. Un seul tap verrouille l\u2019ensemble des tablettes. Le retour visuel est imm\u00e9diat\u00a0: l\u2019ic\u00f4ne de cadenas appara\u00eet sur chaque carte au m\u00eame moment, confirmant la prise en compte de l\u2019action.',
      viewerTitle: 'Vue plein \u00e9cran',
      viewerDesc: 'Un tap sur une carte ouvre l\u2019\u00e9cran de l\u2019\u00e9l\u00e8ve en grand, avec navigation en carrousel pour passer d\u2019un \u00e9l\u00e8ve \u00e0 l\u2019autre sans revenir \u00e0 la grille. Utile pour un tour de classe rapide.',
    },
    orchestration: {
      title: 'Comment agir vite sans quitter la grille des yeux\u00a0?',
      subtitle: 'Les commandes de pilotage de la classe',
      description: 'Voir ne suffit pas. L\u2019enseignant doit aussi pouvoir agir rapidement, depuis le m\u00eame \u00e9cran, sans perdre le fil de ce qui se passe dans la salle. Les actions essentielles (verrouiller, projeter, grouper, distribuer) sont regroup\u00e9es dans un panneau persistant avec des cibles tactiles larges, accessibles aussi bien sur tablette que sur \u00e9cran fixe.',
      groupsTitle: 'Cr\u00e9er des groupes',
      groupsDesc: 'L\u2019enseignant constitue des sous-groupes en glissant les cartes \u00e9l\u00e8ves directement dans la grille. Le geste est naturel, le regroupement imm\u00e9diat. Utile pour la diff\u00e9renciation p\u00e9dagogique ou les travaux en \u00e9quipe.',
      randomTitle: 'Groupes al\u00e9atoires',
      randomDesc: 'Pour les exercices collaboratifs, un seul tap g\u00e9n\u00e8re des groupes \u00e9quilibr\u00e9s. L\u2019enseignant \u00e9conomise le temps de l\u2019attribution manuelle et lance l\u2019activit\u00e9 plus rapidement.',
      projectionTitle: 'Projection d\u2019\u00e9cran',
      projectionDesc: 'L\u2019enseignant partage son \u00e9cran sur toutes les tablettes d\u2019un seul geste. Une confirmation visuelle dans l\u2019interface indique que la projection est active et re\u00e7ue.',
      spotlightTitle: 'Mise en avant d\u2019un travail',
      spotlightDesc: 'S\u00e9lectionner jusqu\u2019\u00e0 3\u00a0\u00e9crans d\u2019\u00e9l\u00e8ves et les afficher \u00e0 toute la classe. L\u2019outil de supervision se transforme en outil p\u00e9dagogique\u00a0: valoriser un travail, lancer une discussion, montrer un exemple.',
    },
    communication: {
      title: 'Comment maintenir le lien p\u00e9dagogique \u00e0 travers l\u2019\u00e9cran\u00a0?',
      subtitle: 'Un canal discret entre l\u2019enseignant et ses \u00e9l\u00e8ves',
      description: 'Au-del\u00e0 de la gestion d\u2019\u00e9crans, SQOOL Classe soutient la relation p\u00e9dagogique elle-m\u00eame. L\u2019application int\u00e8gre un canal de communication l\u00e9ger qui permet des \u00e9changes cibl\u00e9s sans interrompre le cours, et donne \u00e0 l\u2019enseignant des outils rapides d\u2019animation\u00a0: sondages, minuteur, distribution de ressources.',
      messagesTitle: 'Questions des \u00e9l\u00e8ves',
      messagesDesc: 'Un \u00e9l\u00e8ve peut envoyer une question \u00e0 l\u2019enseignant de mani\u00e8re priv\u00e9e, directement depuis sa tablette. C\u00f4t\u00e9 enseignant, un badge de notification appara\u00eet sans interrompre le cours.',
      replyTitle: 'R\u00e9ponse rapide',
      replyDesc: 'L\u2019enseignant r\u00e9pond directement depuis le panneau de messages, sans changer d\u2019\u00e9cran. L\u2019\u00e9change reste discret et contextuel.',
      pollTitle: 'Sondage en direct',
      pollDesc: 'Lancer un sondage et voir les r\u00e9sultats arriver en temps r\u00e9el. Un outil d\u2019\u00e9valuation formative qui se configure en quelques secondes et donne un retour imm\u00e9diat sur la compr\u00e9hension de la classe.',
      timerTitle: 'Minuteur partag\u00e9',
      timerDesc: 'Un compte \u00e0 rebours affich\u00e9 sur toutes les tablettes. L\u2019enseignant cadre le temps d\u2019un exercice, les \u00e9l\u00e8ves voient le d\u00e9compte en direct. Simple et tr\u00e8s utilis\u00e9 dans la pratique.',
      resourceTitle: 'Distribution de ressources',
      resourceDesc: 'L\u2019enseignant distribue un document, un fichier ou un lien \u00e0 toute la classe ou \u00e0 un groupe pr\u00e9cis, en une seule action depuis le panneau de contr\u00f4le.',
      linkTitle: 'Partage de lien web',
      linkDesc: 'Envoyer une URL sur le navigateur de chaque \u00e9l\u00e8ve instantan\u00e9ment. Plus besoin de dicter une adresse ou de l\u2019\u00e9crire au tableau.',
    },
    sessions: {
      title: 'Comment structurer une heure de cours num\u00e9rique\u00a0?',
      subtitle: 'De l\u2019ouverture \u00e0 la cl\u00f4ture, chaque \u00e9tape est outill\u00e9e',
      description: 'SQOOL Classe accompagne l\u2019enseignant sur toute la dur\u00e9e de son cours. Ouverture de s\u00e9ance, distribution de ressources, exercices, \u00e9valuations, cl\u00f4ture\u00a0: chaque \u00e9tape dispose de ses propres outils pour r\u00e9duire la charge logistique et laisser plus de place \u00e0 la p\u00e9dagogie.',
      openTitle: 'Ouverture de classe',
      openDesc: 'L\u2019enseignant affiche un QR code. Les \u00e9l\u00e8ves le scannent avec leur tablette et rejoignent la s\u00e9ance en quelques secondes, sans identifiant ni configuration pr\u00e9alable.',
      endTitle: 'Cl\u00f4ture de s\u00e9ance',
      endDesc: 'Un \u00e9cran r\u00e9capitulatif affiche les donn\u00e9es cl\u00e9s\u00a0: dur\u00e9e, nombre d\u2019interactions, ressources partag\u00e9es. L\u2019enseignant ferme la session et lib\u00e8re les tablettes.',
      assignmentTitle: 'Mode devoir',
      assignmentDesc: 'L\u2019enseignant configure un exercice chronom\u00e9tr\u00e9 avec restrictions\u00a0: verrouillage du navigateur, dur\u00e9e limit\u00e9e, collecte automatique des rendus \u00e0 la fin du temps imparti.',
      examSetupTitle: 'Pr\u00e9paration d\u2019examen',
      examSetupDesc: 'Pour les \u00e9valuations officielles, l\u2019enseignant param\u00e8tre l\u2019examen depuis un \u00e9cran unique\u00a0: dur\u00e9e, applications autoris\u00e9es, niveau de restriction, r\u00e8gles de remise des copies.',
      examMonitorTitle: 'Surveillance d\u2019examen',
      examMonitorDesc: 'Pendant l\u2019examen, l\u2019enseignant supervise 32\u00a0postes en parall\u00e8le. Des indicateurs en temps r\u00e9el montrent o\u00f9 en est chaque \u00e9l\u00e8ve, qui a termin\u00e9, et si un incident technique survient.',
      examReviewTitle: 'R\u00e9capitulatif et copies',
      examReviewDesc: 'Une fois l\u2019examen termin\u00e9, l\u2019enseignant consulte les copies num\u00e9riques, v\u00e9rifie les statuts de remise, et r\u00e9cup\u00e8re l\u2019ensemble des fichiers en une seule op\u00e9ration.',
    },
    students: {
      title: 'Que vit l\u2019\u00e9l\u00e8ve de l\u2019autre c\u00f4t\u00e9\u00a0?',
      subtitle: 'Une exp\u00e9rience volontairement minimale',
      description: 'C\u00f4t\u00e9 \u00e9l\u00e8ve, SQOOL Classe n\u2019appara\u00eet que lorsque c\u2019est utile\u00a0: rejoindre la s\u00e9ance, recevoir un document, r\u00e9pondre \u00e0 un sondage. Le reste du temps, la tablette reste un outil de travail classique. Ce choix de design est d\u00e9lib\u00e9r\u00e9\u00a0: l\u2019\u00e9l\u00e8ve ne doit pas sentir qu\u2019il est surveill\u00e9, mais savoir qu\u2019il est accompagn\u00e9.',
      loginTitle: 'Scanner et rejoindre',
      loginDesc: 'L\u2019\u00e9l\u00e8ve scanne le QR code affich\u00e9 par l\u2019enseignant. La connexion est imm\u00e9diate, sans cr\u00e9ation de compte ni mot de passe.',
      resourcesTitle: 'Consulter les ressources',
      resourcesDesc: 'Les documents partag\u00e9s par l\u2019enseignant apparaissent dans une liste simple et chronologique. Chaque ressource est accessible en un tap.',
      doneTitle: '\u00ab\u00a0J\u2019ai termin\u00e9\u00a0\u00bb',
      doneDesc: 'L\u2019\u00e9l\u00e8ve signale qu\u2019il a fini un exercice. L\u2019enseignant le voit imm\u00e9diatement sur sa grille, ce qui lui permet d\u2019adapter le rythme du cours.',
      questionTitle: 'Poser une question',
      questionDesc: 'L\u2019\u00e9l\u00e8ve envoie une question \u00e0 l\u2019enseignant sans interrompre la classe. Plus besoin de lever la main ou d\u2019attendre son tour.',
      shareTitle: 'Rendre un travail',
      shareDesc: 'L\u2019\u00e9l\u00e8ve envoie un fichier directement \u00e0 l\u2019enseignant depuis sa tablette. Le rendu est horodat\u00e9 et confirm\u00e9 c\u00f4t\u00e9 \u00e9l\u00e8ve.',
      receiveTitle: 'Recevoir un document',
      receiveDesc: 'Quand l\u2019enseignant partage une ressource, une notification discr\u00e8te appara\u00eet avec un acc\u00e8s direct au fichier.',
      lockedTitle: '\u00c9cran verrouill\u00e9',
      lockedDesc: 'Quand l\u2019enseignant verrouille les tablettes, un \u00e9cran sobre et lisible s\u2019affiche. Le message est clair, le ton calme. L\u2019\u00e9l\u00e8ve comprend imm\u00e9diatement la situation.',
    },
    journeys: {
      title: '\u00c0 quoi ressemble une s\u00e9ance de bout en bout\u00a0?',
      subtitle: 'Trois sc\u00e9narios complets, de l\u2019ouverture \u00e0 la cl\u00f4ture',
      description: 'Ces prototypes montrent des s\u00e9ances enti\u00e8res telles qu\u2019elles se d\u00e9roulent en classe. Ils permettent de comprendre comment les diff\u00e9rentes fonctionnalit\u00e9s s\u2019articulent dans un usage r\u00e9el, avec un d\u00e9roul\u00e9 narr\u00e9 \u00e9tape par \u00e9tape.',
      sc1Title: 'D\u00e9marrer et distribuer',
      sc1Desc: 'L\u2019enseignant ouvre sa s\u00e9ance, partage les ressources du cours, et les \u00e9l\u00e8ves re\u00e7oivent le mat\u00e9riel directement sur leur tablette.',
      sc7Title: 'Examen officiel, de A \u00e0 Z',
      sc7Desc: 'Le parcours complet d\u2019un examen\u00a0: configuration, surveillance de 32\u00a0\u00e9l\u00e8ves en parall\u00e8le, et collecte des copies num\u00e9riques.',
      sc10Title: 'S\u00e9ance type',
      sc10Desc: 'Le d\u00e9roul\u00e9 d\u2019un cours complet\u00a0: ouverture, enseignement, interactions, \u00e9valuation rapide et cl\u00f4ture.',
    },
    impact: {
      title: 'Qu\u2019a produit ce travail\u00a0?',
      intro: 'SQOOL Classe est devenu l\u2019application de r\u00e9f\u00e9rence au sein de la suite SQOOL, tant pour son ergonomie que pour sa r\u00e9activit\u00e9. Les enseignants pilotes ont rapport\u00e9 un gain concret de s\u00e9r\u00e9nit\u00e9 en classe et une r\u00e9duction tangible du temps consacr\u00e9 \u00e0 la gestion technique des tablettes.',
      stat1: '465',
      stat1Desc: '\u00c9tablissements \u00e9quip\u00e9s en \u00cele-de-France',
      stat2: '50',
      stat2Desc: 'Prototypes interactifs couvrant chaque flux',
      stat3: '-70\u00a0%',
      stat3Desc: 'Temps de gestion d\u2019appareils par cours (estim\u00e9 par les enseignants pilotes)',
      stat4: '30\u00a0s',
      stat4Desc: 'Mise en route moyenne avec le QR code',
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
      gridToOrchestration: 'La visibilit\u00e9 est le socle. Mais l\u2019enseignant a aussi besoin d\u2019agir, vite, sans quitter la vue d\u2019ensemble.',
      orchestrationToCommunication: 'Au-del\u00e0 de la gestion d\u2019\u00e9crans, l\u2019outil accompagne la relation p\u00e9dagogique elle-m\u00eame.',
      communicationToSessions: 'Ces interactions s\u2019inscrivent dans un cadre structur\u00e9\u00a0: la s\u00e9ance de cours.',
      sessionsToStudents: 'Jusqu\u2019ici, tout a \u00e9t\u00e9 con\u00e7u pour l\u2019enseignant. Regardons de l\u2019autre c\u00f4t\u00e9.',
      studentsToJourneys: 'Voyons comment l\u2019ensemble s\u2019articule dans une s\u00e9ance r\u00e9elle.',
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
  onToggleTheme,
  viewMode,
  onViewModeChange,
  lang = 'fr',
  onContact,
}) => {
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
    if (containerRef.current) containerRef.current.scrollTop = 0;
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
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {lang === 'fr' ? 'Prototypes cl\u00e9s' : 'Key prototypes'}
                  </h3>
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
