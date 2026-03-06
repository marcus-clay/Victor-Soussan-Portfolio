// SQOOL Classe Case Study Page - Real-Time Classroom Supervision
// Dedicated case study for the classroom management application
// Embeds interactive prototypes from the UI Motion project

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  X,
  ExternalLink,
  Play,
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
  Maximize2,
  Minimize2
} from 'lucide-react';
import EnhancedLightbox from './src/components/EnhancedLightbox';
import CaseStudyTOCSidebar from './src/components/CaseStudyTOCSidebar';

// UI Motion base URL for prototype iframes
const UI_MOTION_BASE_URL = 'https://ui-motion-five.vercel.app';

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
    gallery: 'Gallery',
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
      challenge: 'Challenge',
      grid: 'The Grid',
      orchestration: 'Orchestration',
      communication: 'Communication',
      sessions: 'Sessions',
      students: 'Students',
      journeys: 'Full Journeys',
      impact: 'Impact',
    },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Real-Time Supervision, Classroom UX',
      period: '2022',
      title: 'Giving Teachers Calm and Control in a Digital Classroom',
      subtitle: 'Designing a supervision tool that steps back so pedagogy can step forward',
      description: 'When every student gets their own tablet, the teacher faces a very concrete problem: managing 30 screens at once, catching disengagement, keeping the lesson on track. SQOOL Classe is the web application we designed to address that need. It gives the teacher a clear view of the classroom, immediate actions, and the composure to focus on what matters: teaching.',
    },
    context: {
      title: 'The Context',
      subtitle: 'What digital devices actually changed in the classroom',
      description: 'The rollout of individual tablets in French middle and high schools carried a strong promise: more personalized, more engaging learning. On the ground, reality was more nuanced. The teachers we interviewed described an added cognitive load. Managing distractions, checking that everyone follows along, reacting to technical issues\u2014all of this layered on top of the lesson itself. The tools available on the market were either too invasive or too fragile for a school Wi-Fi network.',
      frustration1Title: 'The teacher\'s cognitive load',
      frustration1Desc: 'In interviews, one phrase came up repeatedly: "I spend more time watching screens than teaching." Without a clear overview of student activity, teachers lost the thread of their lesson and their sense of classroom control.',
      frustration2Title: 'A fragile technical environment',
      frustration2Desc: 'Wi-Fi in schools is rarely stable. Any supervision solution had to work smoothly on slow or intermittent networks, without crashes or data loss\u2014otherwise it would generate more frustration than value.',
      frustration3Title: 'Balancing trust and control',
      frustration3Desc: 'Teachers needed to regain agency, but the tool could not feel like a surveillance apparatus. The design challenge was to provide visibility and responsiveness while preserving a relationship of trust with students.',
    },
    challenge: {
      title: 'The Core Challenge',
      subtitle: 'Making things visible without being invasive',
      description: 'The heart of the design problem was a tension: the teacher needs to see what is happening on every tablet to maintain structure, but the interface must neither overwhelm them with data nor turn the classroom into a control room. We structured our approach around three guiding principles.',
      pillar1Title: 'Instant visibility',
      pillar1Desc: 'The teacher should be able to scan the state of the entire class at a glance. A tile grid with restrained color coding surfaces the essentials: who is connected, who is working, who has drifted.',
      pillar2Title: 'Immediate action',
      pillar2Desc: 'Critical gestures\u2014locking screens, sending a document, projecting content\u2014must be reachable in a single tap, with no unnecessary navigation or confirmation.',
      pillar3Title: 'Calm and clarity',
      pillar3Desc: 'Information density is calibrated to reassure, not to constantly alert. Warning states are reserved for situations that genuinely warrant attention.',
    },
    grid: {
      title: 'The Real-Time Grid',
      subtitle: 'The student card, the core building block',
      description: 'Everything rests on the student card. Each tile surfaces at a glance the student\'s name, the active application, battery level, and connection state. The design challenge was to keep this information readable without cluttering the screen, even with 32 students displayed simultaneously.',
      statesTitle: 'Unambiguous visual states',
      statesDesc: 'Each device moves through clear states: off, idle, active, projecting, locked. Transitions are visible and progressive. During initial connection, skeleton loading avoids the impression of latency or malfunction.',
      screensTitle: 'Live screen previews',
      screensDesc: 'The teacher can enable a preview mode where each card displays a periodically refreshed thumbnail of the student\'s screen. This provides immediate awareness of each student\'s activity without opening individual views.',
      lockTitle: 'Lock all screens',
      lockDesc: 'The most frequently used action in daily practice. A single tap locks every tablet. Visual feedback is immediate: the lock icon appears on each card at the same time, confirming the action has been received.',
      viewerTitle: 'Full-screen student view',
      viewerDesc: 'Tap any card to open a student\'s screen full-size, with carousel navigation to browse through the entire class without returning to the grid. Useful for a quick classroom walkthrough.',
    },
    orchestration: {
      title: 'Classroom Orchestration',
      subtitle: 'The teacher\'s control panel',
      description: 'The essential classroom management actions\u2014lock, project, group, distribute\u2014live in a persistent panel with large, touch-friendly targets. The goal: let the teacher act without looking away from the grid, even on a tablet.',
      groupsTitle: 'Create groups',
      groupsDesc: 'The teacher forms sub-groups by dragging student cards. The gesture is direct, the grouping is instant. Useful for differentiated instruction or team exercises.',
      randomTitle: 'Random groups',
      randomDesc: 'For collaborative exercises, a single tap generates balanced groups automatically. The teacher saves the time of manual assignment and starts the activity faster.',
      projectionTitle: 'Screen projection',
      projectionDesc: 'The teacher shares their screen to all tablets in one gesture. A clear visual confirmation in the interface indicates that projection is active.',
      spotlightTitle: 'Spotlight student work',
      spotlightDesc: 'Select up to 3 student screens and display them to the entire class. The supervision tool becomes a pedagogical one: highlight a piece of work, start a discussion, show an example.',
    },
    communication: {
      title: 'Teacher-Student Communication',
      subtitle: 'A discreet channel supporting the teaching relationship',
      description: 'SQOOL Classe includes a lightweight communication channel between teacher and students. The idea: enable targeted exchanges without interrupting the lesson, and give the teacher quick animation tools (polls, timer, resource distribution).',
      messagesTitle: 'Student questions',
      messagesDesc: 'A student can send a question to the teacher privately, directly from their tablet. On the teacher\'s side, a notification badge appears without interrupting the lesson flow.',
      replyTitle: 'Quick reply',
      replyDesc: 'The teacher responds to a student directly from the message panel, without switching screens. The exchange stays discreet and contextual.',
      pollTitle: 'Live poll',
      pollDesc: 'Launch a quick poll and watch results arrive in real time. A formative assessment tool that takes seconds to configure and provides immediate feedback on class comprehension.',
      timerTitle: 'Shared timer',
      timerDesc: 'A countdown displayed on every tablet. The teacher sets the pace for an exercise, students see the countdown live. Simple, but heavily used in practice.',
      resourceTitle: 'Send a resource',
      resourceDesc: 'The teacher distributes a document, file, or link to the entire class or a specific group, in a single action from the control panel.',
      linkTitle: 'Share a web link',
      linkDesc: 'Push a URL to every student\'s browser instantly. No more dictating an address or writing it on the board.',
    },
    sessions: {
      title: 'Sessions & Exams',
      subtitle: 'Structuring class time',
      description: 'SQOOL Classe supports the teacher across the full duration of a lesson: opening the session, distributing resources, exercises, exams, and closing. Each step is tooled to reduce logistical overhead.',
      openTitle: 'Open the class',
      openDesc: 'The teacher displays a QR code. Students scan it with their tablet and join the session in seconds, with no login or prior configuration.',
      endTitle: 'Close the session',
      endDesc: 'A summary screen shows key session data: duration, number of interactions, resources shared. The teacher can close the session and release the tablets.',
      assignmentTitle: 'Assignment mode',
      assignmentDesc: 'The teacher configures a timed exercise with restrictions: browser lock, time limit, automatic collection of submissions when time runs out.',
      examSetupTitle: 'Exam preparation',
      examSetupDesc: 'For official evaluations, the teacher sets exam parameters: duration, allowed applications, restriction level, submission rules. Everything is centralized in a single configuration screen.',
      examMonitorTitle: 'Exam monitoring',
      examMonitorDesc: 'During the exam, the teacher supervises all 32 stations in parallel. Real-time indicators show where each student stands, who has finished, and whether there is a technical incident.',
      examReviewTitle: 'Review & collection',
      examReviewDesc: 'Once the exam is over, the teacher reviews all digital submissions, checks delivery status, and retrieves every file in a single operation.',
    },
    students: {
      title: 'The Student Experience',
      subtitle: 'The other side of the screen',
      description: 'On the student side, the experience is intentionally minimal. SQOOL Classe only appears when useful: joining a session, receiving a document, responding to a poll. The rest of the time, the tablet remains a regular work tool.',
      loginTitle: 'Scan & join',
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
      lockedDesc: 'When the teacher locks the tablets, a clean, readable screen appears. The message is clear, the tone is calm. The student understands the situation immediately.',
    },
    journeys: {
      title: 'Complete Journeys',
      subtitle: 'Three end-to-end scenarios',
      description: 'These prototypes show complete sessions, from opening the class to closing it. They illustrate how the different features work together in real use, with a step-by-step narrated walkthrough.',
      sc1Title: 'Start & distribute',
      sc1Desc: 'The teacher opens the session, shares lesson materials, and students receive them on their tablets.',
      sc7Title: 'Official exam, from A to Z',
      sc7Desc: 'The complete exam journey: setup, monitoring 32 students, and collecting digital submissions.',
      sc10Title: 'A typical session',
      sc10Desc: 'A full lesson walkthrough: open, teach, interact, quick assessment, and close.',
    },
    impact: {
      title: 'What the project delivered',
      intro: 'SQOOL Classe became the reference application within the SQOOL suite for usability and responsiveness. Pilot teachers reported a significant gain in classroom composure and a clear reduction in the time spent on tablet management.',
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
    metaLabels: {
      type: 'Type',
      scope: 'Scope',
      period: 'Period',
      company: 'Company',
    },
    tryPrototype: 'Try the prototype',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
  },
  fr: {
    caseStudy: '\u00c9tude de cas',
    gallery: 'Galerie',
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
      grid: 'La Grille',
      orchestration: 'Orchestration',
      communication: 'Communication',
      sessions: 'S\u00e9ances',
      students: '\u00c9l\u00e8ves',
      journeys: 'Parcours',
      impact: 'Impact',
    },
    hero: {
      role: 'Lead Interaction Designer',
      scope: 'Supervision temps r\u00e9el, UX Classe',
      period: '2022',
      title: 'Donner aux enseignants le calme et le contr\u00f4le dans une classe num\u00e9rique',
      subtitle: 'Concevoir un outil de supervision qui s\u2019efface pour laisser la place \u00e0 la p\u00e9dagogie',
      description: 'Quand chaque \u00e9l\u00e8ve re\u00e7oit sa propre tablette, l\u2019enseignant se retrouve face \u00e0 un probl\u00e8me concret\u00a0: g\u00e9rer 30\u00a0\u00e9crans en simultan\u00e9, rep\u00e9rer les d\u00e9crochages, garder le rythme du cours. SQOOL Classe est l\u2019application web que nous avons con\u00e7ue pour r\u00e9pondre \u00e0 ce besoin. Elle donne \u00e0 l\u2019enseignant une vision claire de sa classe, des actions imm\u00e9diates, et la s\u00e9r\u00e9nit\u00e9 n\u00e9cessaire pour se concentrer sur ce qui compte\u00a0: enseigner.',
    },
    context: {
      title: 'Le contexte',
      subtitle: 'Ce que le num\u00e9rique a chang\u00e9 dans la salle de classe',
      description: 'La distribution de tablettes individuelles dans les coll\u00e8ges et lyc\u00e9es fran\u00e7ais portait une promesse forte\u00a0: un apprentissage plus personnalis\u00e9, plus engageant. Sur le terrain, la r\u00e9alit\u00e9 \u00e9tait plus nuanc\u00e9e. Les enseignants que nous avons rencontr\u00e9s d\u00e9crivaient une charge mentale suppl\u00e9mentaire. G\u00e9rer les distractions, v\u00e9rifier que chacun suit, r\u00e9agir aux probl\u00e8mes techniques, tout cela se superposait au cours lui-m\u00eame. Les outils disponibles sur le march\u00e9 \u00e9taient soit trop intrusifs, soit trop fragiles pour un r\u00e9seau Wi-Fi scolaire.',
      frustration1Title: 'La charge mentale de l\u2019enseignant',
      frustration1Desc: 'En entretien, une phrase revenait souvent\u00a0: \u00ab\u00a0Je passe plus de temps \u00e0 surveiller les \u00e9crans qu\u2019\u00e0 enseigner.\u00a0\u00bb Sans vision d\u2019ensemble sur l\u2019activit\u00e9 des \u00e9l\u00e8ves, les enseignants perdaient le fil de leur cours et le sentiment de ma\u00eetrise de leur salle.',
      frustration2Title: 'Un environnement technique fragile',
      frustration2Desc: 'Le Wi-Fi dans les \u00e9tablissements scolaires est rarement stable. Toute solution de supervision devait fonctionner de mani\u00e8re fluide sur des r\u00e9seaux lents ou intermittents, sans plantage ni perte de donn\u00e9es, sous peine de g\u00e9n\u00e9rer plus de frustration que de valeur.',
      frustration3Title: 'L\u2019\u00e9quilibre entre confiance et contr\u00f4le',
      frustration3Desc: 'Les enseignants avaient besoin de reprendre la main, mais sans que l\u2019outil ressemble \u00e0 un dispositif de surveillance. Le d\u00e9fi design \u00e9tait l\u00e0\u00a0: offrir de la visibilit\u00e9 et de la r\u00e9activit\u00e9 tout en pr\u00e9servant une relation de confiance avec les \u00e9l\u00e8ves.',
    },
    challenge: {
      title: 'L\u2019enjeu central',
      subtitle: 'Rendre visible sans envahir',
      description: 'Le c\u0153ur du probl\u00e8me de design r\u00e9sidait dans une tension\u00a0: l\u2019enseignant a besoin de voir ce qui se passe sur chaque tablette pour maintenir le cadre, mais l\u2019interface ne doit ni le submerger d\u2019informations, ni transformer la classe en salle de contr\u00f4le. Nous avons structur\u00e9 notre approche autour de trois principes directeurs.',
      pillar1Title: 'Visibilit\u00e9 instantan\u00e9e',
      pillar1Desc: 'L\u2019enseignant doit pouvoir scanner l\u2019\u00e9tat de sa classe d\u2019un seul regard. Une grille de tuiles, avec un code couleur sobre, restitue l\u2019essentiel\u00a0: qui est connect\u00e9, qui travaille, qui d\u00e9croche.',
      pillar2Title: 'Action imm\u00e9diate',
      pillar2Desc: 'Les gestes critiques, verrouiller les \u00e9crans, envoyer un document, projeter un contenu, doivent \u00eatre accessibles en un tap, sans navigation ni confirmation superflue.',
      pillar3Title: 'Calme et lisibilit\u00e9',
      pillar3Desc: 'La densit\u00e9 d\u2019information est calibr\u00e9e pour rassurer, pas pour alerter en permanence. Les \u00e9tats d\u2019alerte sont r\u00e9serv\u00e9s aux situations qui le justifient vraiment.',
    },
    grid: {
      title: 'La grille temps r\u00e9el',
      subtitle: 'La carte \u00e9l\u00e8ve, brique centrale de l\u2019interface',
      description: 'Tout repose sur la carte \u00e9l\u00e8ve. Chaque tuile condense en un coup d\u2019\u0153il le nom de l\u2019\u00e9l\u00e8ve, l\u2019application en cours, le niveau de batterie et l\u2019\u00e9tat de connexion. L\u2019enjeu de design \u00e9tait de rendre ces informations lisibles sans surcharger l\u2019\u00e9cran, m\u00eame avec 32\u00a0\u00e9l\u00e8ves affich\u00e9s simultan\u00e9ment.',
      statesTitle: 'Des \u00e9tats visuels sans ambigu\u00eft\u00e9',
      statesDesc: 'Chaque appareil passe par des \u00e9tats clairs\u00a0: \u00e9teint, inactif, actif, en projection, verrouill\u00e9. Les transitions sont visibles et progressives. Pendant la connexion initiale, un skeleton loading \u00e9vite l\u2019impression de latence ou de bug.',
      screensTitle: 'Aper\u00e7u des \u00e9crans en direct',
      screensDesc: 'L\u2019enseignant peut activer un mode d\u2019aper\u00e7u o\u00f9 chaque carte affiche une vignette de l\u2019\u00e9cran \u00e9l\u00e8ve, rafra\u00eechie p\u00e9riodiquement. Cela lui donne une conscience imm\u00e9diate de l\u2019activit\u00e9 de chacun, sans avoir \u00e0 ouvrir de vue individuelle.',
      lockTitle: 'Verrouiller tous les \u00e9crans',
      lockDesc: 'L\u2019action la plus utilis\u00e9e au quotidien. Un seul tap verrouille l\u2019ensemble des tablettes. Le retour visuel est imm\u00e9diat\u00a0: l\u2019ic\u00f4ne de cadenas appara\u00eet sur chaque carte en m\u00eame temps, confirmant que l\u2019action a bien \u00e9t\u00e9 prise en compte.',
      viewerTitle: 'Vue plein \u00e9cran d\u2019un \u00e9l\u00e8ve',
      viewerDesc: 'Un tap sur une carte ouvre l\u2019\u00e9cran de l\u2019\u00e9l\u00e8ve en grand, avec une navigation en carrousel pour passer d\u2019un \u00e9l\u00e8ve \u00e0 l\u2019autre sans revenir \u00e0 la grille. Pratique pour un tour de classe rapide.',
    },
    orchestration: {
      title: 'L\u2019orchestration de la classe',
      subtitle: 'Le panneau de contr\u00f4le enseignant',
      description: 'Les actions essentielles de gestion de classe, verrouiller, projeter, grouper, distribuer, sont regroup\u00e9es dans un panneau persistant avec des cibles tactiles larges. L\u2019objectif\u00a0: que l\u2019enseignant puisse agir sans quitter la grille des yeux, m\u00eame sur tablette.',
      groupsTitle: 'Cr\u00e9er des groupes',
      groupsDesc: 'L\u2019enseignant constitue des sous-groupes en glissant les cartes \u00e9l\u00e8ves. Le geste est direct, le regroupement est imm\u00e9diat. Utile pour la diff\u00e9renciation p\u00e9dagogique ou les travaux en \u00e9quipe.',
      randomTitle: 'Groupes al\u00e9atoires',
      randomDesc: 'Pour les exercices collaboratifs, un tap g\u00e9n\u00e8re des groupes \u00e9quilibr\u00e9s automatiquement. L\u2019enseignant \u00e9conomise le temps de l\u2019attribution manuelle et lance l\u2019activit\u00e9 plus vite.',
      projectionTitle: 'Projeter son \u00e9cran',
      projectionDesc: 'L\u2019enseignant partage son \u00e9cran sur toutes les tablettes d\u2019un geste. Une confirmation visuelle claire dans l\u2019interface indique que la projection est active.',
      spotlightTitle: 'Mettre en avant un travail d\u2019\u00e9l\u00e8ve',
      spotlightDesc: 'S\u00e9lectionner jusqu\u2019\u00e0 3\u00a0\u00e9crans d\u2019\u00e9l\u00e8ves et les afficher \u00e0 toute la classe. L\u2019outil de supervision devient un outil p\u00e9dagogique\u00a0: valoriser un travail, lancer une discussion, montrer un exemple.',
    },
    communication: {
      title: 'La communication enseignant-\u00e9l\u00e8ve',
      subtitle: 'Un canal discret, au service de la relation p\u00e9dagogique',
      description: 'SQOOL Classe int\u00e8gre un canal de communication l\u00e9ger entre l\u2019enseignant et ses \u00e9l\u00e8ves. L\u2019id\u00e9e\u00a0: permettre des \u00e9changes cibl\u00e9s sans interrompre le cours, et donner \u00e0 l\u2019enseignant des outils rapides d\u2019animation (sondages, minuteur, distribution de ressources).',
      messagesTitle: 'Questions des \u00e9l\u00e8ves',
      messagesDesc: 'Un \u00e9l\u00e8ve peut envoyer une question \u00e0 l\u2019enseignant de mani\u00e8re priv\u00e9e, directement depuis sa tablette. C\u00f4t\u00e9 enseignant, un badge de notification appara\u00eet sans interrompre le flux du cours.',
      replyTitle: 'R\u00e9ponse rapide',
      replyDesc: 'L\u2019enseignant r\u00e9pond \u00e0 un \u00e9l\u00e8ve directement depuis le panneau de messages, sans changer d\u2019\u00e9cran. L\u2019\u00e9change reste discret et contextuel.',
      pollTitle: 'Sondage en direct',
      pollDesc: 'Lancer un sondage rapide et voir les r\u00e9sultats arriver en temps r\u00e9el. Un outil d\u2019\u00e9valuation formative qui se configure en quelques secondes et donne un retour imm\u00e9diat sur la compr\u00e9hension de la classe.',
      timerTitle: 'Minuteur partag\u00e9',
      timerDesc: 'Un compte \u00e0 rebours affich\u00e9 sur toutes les tablettes. L\u2019enseignant cadre le temps d\u2019un exercice, les \u00e9l\u00e8ves voient le d\u00e9compte en direct. Simple, mais tr\u00e8s utilis\u00e9 dans la pratique.',
      resourceTitle: 'Envoyer une ressource',
      resourceDesc: 'L\u2019enseignant distribue un document, un fichier ou un lien \u00e0 toute la classe ou \u00e0 un groupe pr\u00e9cis, en une seule action depuis le panneau de contr\u00f4le.',
      linkTitle: 'Partager un lien web',
      linkDesc: 'Pousser une URL sur le navigateur de chaque \u00e9l\u00e8ve instantan\u00e9ment. Plus besoin de dicter une adresse ou de l\u2019\u00e9crire au tableau.',
    },
    sessions: {
      title: 'S\u00e9ances et examens',
      subtitle: 'Structurer le temps de classe',
      description: 'SQOOL Classe accompagne l\u2019enseignant sur toute la dur\u00e9e de son cours\u00a0: ouverture de la s\u00e9ance, distribution de ressources, exercices, examens, et cl\u00f4ture. Chaque \u00e9tape est outill\u00e9e pour r\u00e9duire la charge logistique.',
      openTitle: 'Ouvrir la classe',
      openDesc: 'L\u2019enseignant affiche un QR code. Les \u00e9l\u00e8ves le scannent avec leur tablette et rejoignent la s\u00e9ance en quelques secondes, sans identifiant ni configuration pr\u00e9alable.',
      endTitle: 'Cl\u00f4turer la s\u00e9ance',
      endDesc: 'Un \u00e9cran r\u00e9capitulatif affiche les donn\u00e9es cl\u00e9s de la s\u00e9ance\u00a0: dur\u00e9e, nombre d\u2019interactions, ressources partag\u00e9es. L\u2019enseignant peut fermer la session et lib\u00e9rer les tablettes.',
      assignmentTitle: 'Mode devoir',
      assignmentDesc: 'L\u2019enseignant configure un exercice chronom\u00e9tr\u00e9 avec des restrictions\u00a0: verrouillage du navigateur, dur\u00e9e limit\u00e9e, collecte automatique des rendus \u00e0 la fin du temps imparti.',
      examSetupTitle: 'Pr\u00e9paration d\u2019examen',
      examSetupDesc: 'Pour les \u00e9valuations officielles, l\u2019enseignant param\u00e8tre l\u2019examen\u00a0: dur\u00e9e, applications autoris\u00e9es, niveau de restriction, r\u00e8gles de remise des copies. Tout est centralis\u00e9 dans un seul \u00e9cran de configuration.',
      examMonitorTitle: 'Surveillance d\u2019examen',
      examMonitorDesc: 'Pendant l\u2019examen, l\u2019enseignant supervise les 32\u00a0postes en parall\u00e8le. Des indicateurs en temps r\u00e9el montrent o\u00f9 en est chaque \u00e9l\u00e8ve, qui a termin\u00e9, et s\u2019il y a un incident technique.',
      examReviewTitle: 'R\u00e9capitulatif et copies',
      examReviewDesc: 'Une fois l\u2019examen termin\u00e9, l\u2019enseignant consulte l\u2019ensemble des copies num\u00e9riques, v\u00e9rifie les statuts de remise, et r\u00e9cup\u00e8re tous les fichiers en une seule op\u00e9ration.',
    },
    students: {
      title: 'L\u2019exp\u00e9rience \u00e9l\u00e8ve',
      subtitle: 'De l\u2019autre c\u00f4t\u00e9 de l\u2019\u00e9cran',
      description: 'C\u00f4t\u00e9 \u00e9l\u00e8ve, l\u2019exp\u00e9rience est volontairement minimale. SQOOL Classe n\u2019appara\u00eet que lorsque c\u2019est utile\u00a0: rejoindre la s\u00e9ance, recevoir un document, r\u00e9pondre \u00e0 un sondage. Le reste du temps, la tablette reste un outil de travail classique.',
      loginTitle: 'Scanner et rejoindre',
      loginDesc: 'L\u2019\u00e9l\u00e8ve scanne le QR code affich\u00e9 par l\u2019enseignant. La connexion est imm\u00e9diate, sans cr\u00e9ation de compte ni mot de passe.',
      resourcesTitle: 'Consulter les ressources',
      resourcesDesc: 'Les documents partag\u00e9s par l\u2019enseignant apparaissent dans une liste simple et chronologique. Chaque ressource est accessible en un tap.',
      doneTitle: '\u00ab\u00a0J\u2019ai termin\u00e9\u00a0\u00bb',
      doneDesc: 'L\u2019\u00e9l\u00e8ve signale qu\u2019il a fini un exercice. L\u2019enseignant le voit imm\u00e9diatement sur sa grille, ce qui l\u2019aide \u00e0 adapter le rythme du cours.',
      questionTitle: 'Poser une question',
      questionDesc: 'L\u2019\u00e9l\u00e8ve envoie une question \u00e0 l\u2019enseignant sans interrompre la classe. Plus besoin de lever la main ou d\u2019attendre son tour.',
      shareTitle: 'Rendre un travail',
      shareDesc: 'L\u2019\u00e9l\u00e8ve envoie un fichier directement \u00e0 l\u2019enseignant depuis sa tablette. Le rendu est horodat\u00e9 et confirm\u00e9 c\u00f4t\u00e9 \u00e9l\u00e8ve.',
      receiveTitle: 'Recevoir un document',
      receiveDesc: 'Quand l\u2019enseignant partage une ressource, une notification discr\u00e8te appara\u00eet avec un acc\u00e8s direct au fichier.',
      lockedTitle: '\u00c9cran verrouill\u00e9',
      lockedDesc: 'Quand l\u2019enseignant verrouille les tablettes, un \u00e9cran sobre et lisible s\u2019affiche. Le message est clair, le ton est calme. L\u2019\u00e9l\u00e8ve comprend imm\u00e9diatement la situation.',
    },
    journeys: {
      title: 'Parcours complets',
      subtitle: 'Trois sc\u00e9narios de bout en bout',
      description: 'Ces prototypes montrent des s\u00e9ances compl\u00e8tes, de l\u2019ouverture de la classe \u00e0 la cl\u00f4ture. Ils permettent de voir comment les diff\u00e9rentes fonctionnalit\u00e9s s\u2019articulent dans un usage r\u00e9el, avec un d\u00e9roul\u00e9 narr\u00e9 \u00e9tape par \u00e9tape.',
      sc1Title: 'D\u00e9marrer et distribuer',
      sc1Desc: 'L\u2019enseignant ouvre sa s\u00e9ance, partage les ressources du cours, et les \u00e9l\u00e8ves re\u00e7oivent le mat\u00e9riel sur leur tablette.',
      sc7Title: 'Examen officiel, de A \u00e0 Z',
      sc7Desc: 'Le parcours complet d\u2019un examen\u00a0: configuration, surveillance de 32\u00a0\u00e9l\u00e8ves, et collecte des copies num\u00e9riques.',
      sc10Title: 'Une s\u00e9ance type',
      sc10Desc: 'Le d\u00e9roul\u00e9 d\u2019un cours complet\u00a0: ouverture, enseignement, interactions, \u00e9valuation rapide, et cl\u00f4ture.',
    },
    impact: {
      title: 'Ce que le projet a produit',
      intro: 'SQOOL Classe est devenu l\u2019application de r\u00e9f\u00e9rence de la suite SQOOL en termes d\u2019ergonomie et de r\u00e9activit\u00e9. Les enseignants pilotes ont rapport\u00e9 un gain significatif de s\u00e9r\u00e9nit\u00e9 en classe et une r\u00e9duction nette du temps pass\u00e9 sur la gestion technique des tablettes.',
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
    metaLabels: {
      type: 'Type',
      scope: 'P\u00e9rim\u00e8tre',
      period: 'P\u00e9riode',
      company: 'Entreprise',
    },
    tryPrototype: 'Essayer le prototype',
    fullscreen: 'Plein \u00e9cran',
    exitFullscreen: 'Quitter le plein \u00e9cran',
  },
};

// TOC Sections
const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'hero', label: 'Intro' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'grid', label: 'The Grid' },
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
    { id: 'challenge', label: 'Enjeu' },
    { id: 'grid', label: 'La Grille' },
    { id: 'orchestration', label: 'Orchestration' },
    { id: 'communication', label: 'Communication' },
    { id: 'sessions', label: 'Seances' },
    { id: 'students', label: 'Eleves' },
    { id: 'journeys', label: 'Parcours' },
    { id: 'impact', label: 'Impact' },
  ],
};

// Prototype embed component
interface PrototypeEmbedProps {
  prototypeId: string;
  title: string;
  description: string;
  isDark: boolean;
  tryLabel: string;
}

const PrototypeEmbed: React.FC<PrototypeEmbedProps> = ({ prototypeId, title, description, isDark, tryLabel }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else if (isFullscreen) {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="my-12">
      <div
        ref={containerRef}
        className={`rounded-2xl overflow-hidden border ${
          isDark ? 'border-white/10 bg-[#1D1D1F]' : 'border-gray-200 bg-gray-50'
        }`}
      >
        {/* Header bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          isDark ? 'border-white/10' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2">
            <Play size={14} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
              }`}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <a
              href={`${UI_MOTION_BASE_URL}/#${prototypeId.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isDark
                  ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <ExternalLink size={12} />
              {tryLabel}
            </a>
          </div>
        </div>

        {/* Iframe */}
        <div className="relative" style={{ paddingBottom: '62.5%' }}>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-30" />
            </div>
          )}
          <iframe
            src={`${UI_MOTION_BASE_URL}/?embed=1#${prototypeId.toLowerCase()}`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            allow="fullscreen"
            title={title}
          />
        </div>
      </div>
      <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <strong>{title}</strong> — {description}
      </p>
    </div>
  );
};

// Apple-style spring transition
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
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
  const [caseStudyMode, setCaseStudyMode] = useState<'executive' | 'full'>(
    viewMode === 'executive' ? 'executive' : 'full'
  );

  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const sections = TOC_SECTIONS[lang] || TOC_SECTIONS.fr;

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

  // Sync caseStudyMode with viewMode prop
  useEffect(() => {
    if (viewMode === 'executive') setCaseStudyMode('executive');
    else if (viewMode === 'caseStudy') setCaseStudyMode('full');
  }, [viewMode]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        {caseStudyMode === 'executive' ? (
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

                {/* Key prototype embed */}
                <PrototypeEmbed
                  prototypeId="T3"
                  title={t.grid.screensTitle}
                  description={t.grid.screensDesc}
                  isDark={isDark}
                  tryLabel={t.tryPrototype}
                />

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

                      <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t.hero.description}
                      </p>
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
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.grid.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.grid.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.grid.description}
                    </p>

                    {/* T3 - Show screens */}
                    <PrototypeEmbed
                      prototypeId="T3"
                      title={t.grid.screensTitle}
                      description={t.grid.screensDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T5 - Lock screens */}
                    <PrototypeEmbed
                      prototypeId="T5"
                      title={t.grid.lockTitle}
                      description={t.grid.lockDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T25 - Student viewer */}
                    <PrototypeEmbed
                      prototypeId="T25"
                      title={t.grid.viewerTitle}
                      description={t.grid.viewerDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

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

                    {/* T9 - Create groups */}
                    <PrototypeEmbed
                      prototypeId="T9"
                      title={t.orchestration.groupsTitle}
                      description={t.orchestration.groupsDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T18 - Random groups */}
                    <PrototypeEmbed
                      prototypeId="T18"
                      title={t.orchestration.randomTitle}
                      description={t.orchestration.randomDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T7 - Projection */}
                    <PrototypeEmbed
                      prototypeId="T7"
                      title={t.orchestration.projectionTitle}
                      description={t.orchestration.projectionDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T12 - Spotlight */}
                    <PrototypeEmbed
                      prototypeId="T12"
                      title={t.orchestration.spotlightTitle}
                      description={t.orchestration.spotlightDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

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

                    {/* T4 - Messages */}
                    <PrototypeEmbed
                      prototypeId="T4"
                      title={t.communication.messagesTitle}
                      description={t.communication.messagesDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T11 - Reply */}
                    <PrototypeEmbed
                      prototypeId="T11"
                      title={t.communication.replyTitle}
                      description={t.communication.replyDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T10 - Poll */}
                    <PrototypeEmbed
                      prototypeId="T10"
                      title={t.communication.pollTitle}
                      description={t.communication.pollDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T17 - Timer */}
                    <PrototypeEmbed
                      prototypeId="T17"
                      title={t.communication.timerTitle}
                      description={t.communication.timerDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T6 - Send resource */}
                    <PrototypeEmbed
                      prototypeId="T6"
                      title={t.communication.resourceTitle}
                      description={t.communication.resourceDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T16 - Share link */}
                    <PrototypeEmbed
                      prototypeId="T16"
                      title={t.communication.linkTitle}
                      description={t.communication.linkDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

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

                    {/* T1 - Open class */}
                    <PrototypeEmbed
                      prototypeId="T1"
                      title={t.sessions.openTitle}
                      description={t.sessions.openDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T15 - End session */}
                    <PrototypeEmbed
                      prototypeId="T15"
                      title={t.sessions.endTitle}
                      description={t.sessions.endDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T21 - Assignment mode */}
                    <PrototypeEmbed
                      prototypeId="T21"
                      title={t.sessions.assignmentTitle}
                      description={t.sessions.assignmentDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T22 - Exam setup */}
                    <PrototypeEmbed
                      prototypeId="T22"
                      title={t.sessions.examSetupTitle}
                      description={t.sessions.examSetupDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T23 - Exam monitoring */}
                    <PrototypeEmbed
                      prototypeId="T23"
                      title={t.sessions.examMonitorTitle}
                      description={t.sessions.examMonitorDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* T24 - Exam review */}
                    <PrototypeEmbed
                      prototypeId="T24"
                      title={t.sessions.examReviewTitle}
                      description={t.sessions.examReviewDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

                  {/* ==================== STUDENT EXPERIENCE ==================== */}
                  <section id="students" className="mb-24 md:mb-32">
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t.students.title}
                    </h1>
                    <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t.students.subtitle}
                    </h2>
                    <p className={`text-base leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.students.description}
                    </p>

                    {/* S1 - Login */}
                    <PrototypeEmbed
                      prototypeId="S1"
                      title={t.students.loginTitle}
                      description={t.students.loginDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* S2 - Resources */}
                    <PrototypeEmbed
                      prototypeId="S2"
                      title={t.students.resourcesTitle}
                      description={t.students.resourcesDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* S3 - Done */}
                    <PrototypeEmbed
                      prototypeId="S3"
                      title={t.students.doneTitle}
                      description={t.students.doneDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* S4 - Question */}
                    <PrototypeEmbed
                      prototypeId="S4"
                      title={t.students.questionTitle}
                      description={t.students.questionDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* S5 - Share */}
                    <PrototypeEmbed
                      prototypeId="S5"
                      title={t.students.shareTitle}
                      description={t.students.shareDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* S6 - Receive */}
                    <PrototypeEmbed
                      prototypeId="S6"
                      title={t.students.receiveTitle}
                      description={t.students.receiveDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* S7 - Locked */}
                    <PrototypeEmbed
                      prototypeId="S7"
                      title={t.students.lockedTitle}
                      description={t.students.lockedDesc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />
                  </section>

                  <hr className={`my-12 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

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

                    {/* SC1 - Start & distribute */}
                    <PrototypeEmbed
                      prototypeId="SC1"
                      title={t.journeys.sc1Title}
                      description={t.journeys.sc1Desc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* SC7 - Full exam */}
                    <PrototypeEmbed
                      prototypeId="SC7"
                      title={t.journeys.sc7Title}
                      description={t.journeys.sc7Desc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />

                    {/* SC10 - Complete session */}
                    <PrototypeEmbed
                      prototypeId="SC10"
                      title={t.journeys.sc10Title}
                      description={t.journeys.sc10Desc}
                      isDark={isDark}
                      tryLabel={t.tryPrototype}
                    />
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
                        — {t.testimonial.author}, {t.testimonial.role}
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
