import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X, ArrowUpRight } from '@phosphor-icons/react';
import { smoothScrollTo } from '../../utils/smoothScroll';
import CaseStudyTOCSidebar from '../../components/CaseStudyTOCSidebar';
import EnhancedLightbox, { type LightboxImage } from '../../components/media/EnhancedLightbox';

// ─── Types ───────────────────────────────────────────────────────────────────

interface RiskOSPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang?: 'en' | 'fr';
  viewMode?: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange?: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  onContact?: () => void;
}

// ─── TOC ─────────────────────────────────────────────────────────────────────

const TOC_SECTIONS = {
  en: [
    { id: 'top', label: 'Top' },
    { id: 'why', label: 'Why' },
    { id: 'insight', label: 'Insight' },
    { id: 'design-question', label: 'Design Question' },
    { id: 'triage', label: 'Triage' },
    { id: 'ai-analysis', label: 'AI Analysis' },
    { id: 'decision', label: 'Decision' },
    { id: 'false-positive', label: 'False Positive' },
    { id: 'queue', label: 'Queue' },
    { id: 'learnings', label: 'Learnings' },
  ],
  fr: [
    { id: 'top', label: 'Haut' },
    { id: 'why', label: 'Pourquoi' },
    { id: 'insight', label: 'Insight' },
    { id: 'design-question', label: 'Question de design' },
    { id: 'triage', label: 'Triage' },
    { id: 'ai-analysis', label: 'Analyse IA' },
    { id: 'decision', label: 'Décision' },
    { id: 'false-positive', label: 'Faux positif' },
    { id: 'queue', label: 'Queue' },
    { id: 'learnings', label: 'Apprentissages' },
  ],
};

// ─── Content ─────────────────────────────────────────────────────────────────

const CONTENT = {
  en: {
    subtitle: 'AI-Augmented Fraud Detection',
    category: 'Agentic UX Experimentation',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'Where this comes from',
    whyP1: 'I keep coming back to the same question with agentic interfaces: when you put an AI in a workflow where a human has the final say, how do you keep the human genuinely engaged? Too much assistance and they go on autopilot. Too little transparency and they stop trusting the tool.',
    whyP2: 'I picked fraud detection in European banking to work on this. Analysts are under real time pressure, 80% of their alerts are false alarms, and the decision is always theirs. A good setup to test where the AI should step in, and where it should stay out.',
    whyP3: 'RiskOS is the prototype I built to try things out.',
    insightTitle: 'The starting point',
    insightP1: 'A fraud analyst at a European neobank handles 80 to 150 alerts per shift. Most are harmless. Every minute on a false alarm is a minute not spent on a real case.',
    insightP2: 'In a lot of teams, the daily tool is still a spreadsheet and a set of fixed rules. No context, no sorting, no memory of previous cases.',
    beforeAfterCaption: 'Same data, two readings.',
    beforeAfterText: 'On the left, the alert feed as most institutions receive it: raw spreadsheet, flat columns. On the right, the same information in RiskOS. The side by side speaks for itself.',
    designQuestionTitle: 'Can the AI do the prep work without taking over the decision?',
    designQuestionP1: 'That was the question. The analyst owns the decision. The AI can do a lot of the groundwork before that moment.',
    designQuestionP2: 'Three ideas behind the design:',
    designPrinciples: [
      'The AI sets up context so the analyst can think clearly. It doesn\'t decide.',
      'The reasoning is readable, not hidden behind a number.',
      'When the analyst acts, something happens outside the tool, not just inside it.',
    ],
    dataFlowCaption: 'Where RiskOS sits in the process.',
    dataFlowText: 'A suspicious transaction hits the bank\'s automated rules. If flagged, the alert goes into a queue. The AI analyzes it. The analyst reviews and decides. RiskOS is the workspace for that last step.',
    triageTitle: 'Starting the shift',
    triageText: 'The analyst opens their session. Five cases waiting, sorted by risk. Filters by priority, a counter showing progress.',
    triageCaption: 'Triage view',
    triageFrustration: 'Without sorting, the analyst scrolls through the whole list looking for the urgent ones.',
    triageBenefit: 'Color-coded priorities and a live counter. Sorting takes a few seconds.',
    aiTitle: 'How the AI explains itself',
    aiP1: 'The AI writes its analysis in real time, word by word. Key details (amounts, locations, devices) are highlighted. Data sources light up as they contribute. A confidence score gives a sense of certainty.',
    aiP2: 'The action buttons stay hidden until the AI finishes. The analyst reads the full reasoning before they can act.',
    aiCaption: 'AI analysis, streaming',
    aiFrustration: 'Usually the analyst gets a risk number with no explanation. They reconstruct the reasoning themselves.',
    aiBenefit: 'Here the AI writes out what it found, step by step. The analyst reads the reasoning, then decides.',
    decisionTitle: 'Acting on a case, and seeing it through',
    decisionP1: 'The analyst picks an action: block the card, pass the case to a senior, or keep it under watch. A confirmation screen recaps what happened. Then two things appear that usually stay invisible: the Slack message to the fraud team, and the SMS to the customer.',
    decisionP2: 'For handoffs, the AI pre-writes a note the analyst can edit before sending. The case arrives with context instead of landing cold.',
    decisionCaption: 'Confirmation and what happened next',
    decisionFrustration: 'Usually the analyst acts and never sees the result. Handoffs seem to disappear.',
    decisionBenefit: 'Every action has a visible trace: the Slack message, the customer SMS, the ticket. The analyst sees it went through.',
    falsePositiveTitle: 'Clearing a false alarm in eight seconds',
    falsePositiveText: 'A medium-risk alert: score 45, a 450 euro payment. The AI reviews the transaction history, finds nothing unusual. One click to confirm. Eight seconds total.',
    falsePositiveCaption: 'False alarm, resolved',
    falsePositiveFrustration: 'False alarms take as long as real cases, even though they need no action.',
    falsePositiveBenefit: 'The AI catches the harmless ones in seconds. The analyst keeps their attention for the rest.',
    queueTitle: 'Working through a full queue',
    queueText: 'Five cases in a row. After each one, the next loads automatically. Progress bar, running timer. At the end: five cases, 92 seconds, 18 seconds average.',
    queueCaption: 'Case flow and session recap',
    queueFrustration: 'Switching cases usually means starting over mentally each time.',
    queueBenefit: 'The cases chain without interruption. Running totals keep the pace visible.',
    learningsTitle: 'What I learned about agentic interfaces from this project',
    learningsIntro: 'Two observations stood out. I think they go beyond fraud detection.',
    learning1Title: 'Streaming the reasoning builds trust in a way that scores don\'t.',
    learning1Text: 'When the AI writes its analysis word by word, the analyst reads along and forms their own view at the same time. They can agree, push back, or notice something the AI missed. A confidence score after the fact just says "trust me" without showing the work.',
    learning2Title: 'Hiding the buttons until the analysis is done changes how people read.',
    learning2Text: 'The decision buttons in RiskOS only appear once the AI finishes writing. It adds a few seconds, but those seconds are the difference between scanning and actually reading. Under pressure, people click the first thing available. This small constraint gives the reasoning a chance to land.',
    learning3Title: '',
    learning3Text: '',
    learningsOutro: 'I see the same dynamics in other contexts where AI supports decisions under time pressure: compliance, medical triage, content moderation, incident response.',
    techTitle: 'Stack',
    techText: 'Working prototype. React 18, Vite, Tailwind CSS. Dark, desktop-first. On Vercel.',
    viewPrototype: 'View prototype',
    viewGitHub: 'GitHub',
  },
  fr: {
    subtitle: 'Détection de fraude augmentée par IA agentique',
    category: 'Expérimentation UX agentiques',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'D\'où ça vient',
    whyP1: 'Je reviens souvent à la même question quand je travaille sur les interfaces agentiques : quand on met une IA dans un processus où c\'est un humain qui tranche, comment on fait pour que l\'humain reste vraiment impliqué ? Trop d\'assistance et il passe en pilote automatique. Trop peu de transparence et il décroche.',
    whyP2: 'J\'ai choisi la détection de fraude dans le secteur bancaire européen pour travailler là-dessus. Les analystes sont sous pression, 80 % de leurs alertes sont des fausses alarmes, et c\'est toujours eux qui décident. Un bon terrain pour tester où l\'IA doit intervenir, et où elle doit rester en retrait.',
    whyP3: 'RiskOS est le prototype que j\'ai construit pour tester ça.',
    insightTitle: 'Le point de départ',
    insightP1: 'Un analyste fraude dans une néobanque européenne traite 80 à 150 alertes par vacation. La plupart sont sans suite. Chaque minute sur une fausse alarme est une minute en moins pour un vrai cas.',
    insightP2: 'Dans beaucoup d\'équipes, l\'outil du quotidien reste un tableur et un jeu de règles fixes. Pas de contexte, pas de tri, pas de mémoire des cas précédents.',
    beforeAfterCaption: 'Mêmes données, deux lectures.',
    beforeAfterText: 'À gauche, le flux d\'alertes tel que la plupart des établissements le reçoivent : tableur brut, colonnes à plat. À droite, les mêmes informations dans RiskOS. Le côte à côte se passe de commentaire.',
    designQuestionTitle: 'L\'IA peut-elle préparer le terrain sans prendre la main sur la décision ?',
    designQuestionP1: 'C\'est la question. L\'analyste reste maître de sa décision. L\'IA peut faire une bonne partie du travail en amont.',
    designQuestionP2: 'Trois idées derrière le design :',
    designPrinciples: [
      'L\'IA pose le contexte pour que l\'analyste puisse réfléchir. Elle ne décide pas.',
      'Le raisonnement est lisible, pas planqué derrière un chiffre.',
      'Quand l\'analyste agit, il se passe quelque chose en dehors de l\'outil, pas seulement dedans.',
    ],
    dataFlowCaption: 'Où se place RiskOS dans le processus.',
    dataFlowText: 'Une transaction suspecte passe d\'abord par les règles automatiques de la banque. Si elle est signalée, l\'alerte entre dans une file. L\'IA l\'analyse. L\'analyste examine et tranche. RiskOS, c\'est l\'espace de travail de cette dernière étape.',
    triageTitle: 'Début de vacation',
    triageText: 'L\'analyste ouvre sa session. Cinq cas l\'attendent, triés par risque. Filtres par priorité, compteur de progression.',
    triageCaption: 'Vue de triage',
    triageFrustration: 'Sans tri, l\'analyste parcourt toute la liste à la main pour repérer les urgents.',
    triageBenefit: 'Priorités colorées et compteur en direct. Le tri prend quelques secondes.',
    aiTitle: 'Comment l\'IA s\'explique',
    aiP1: 'L\'IA rédige son analyse en direct, mot par mot. Les détails importants (montants, localisations, appareils) sont mis en avant. Les sources de données s\'allument au fil de l\'analyse. Un score de confiance donne une idée de la certitude.',
    aiP2: 'Les boutons d\'action restent masqués tant que l\'IA n\'a pas terminé. L\'analyste lit le raisonnement complet avant de pouvoir agir.',
    aiCaption: 'Analyse IA, en direct',
    aiFrustration: 'D\'habitude, l\'analyste reçoit un chiffre de risque sans explication. Il reconstitue le raisonnement seul.',
    aiBenefit: 'Ici l\'IA écrit ce qu\'elle a trouvé, étape par étape. L\'analyste lit le raisonnement, puis il décide.',
    decisionTitle: 'Agir sur un cas, et voir la suite',
    decisionP1: 'L\'analyste choisit : bloquer la carte, transmettre à un senior, ou surveiller. Un écran récapitule ce qui s\'est passé. Puis deux choses apparaissent qui restent d\'habitude invisibles : le message Slack à l\'équipe fraude, et le SMS au client.',
    decisionP2: 'Pour les transmissions, l\'IA pré-rédige une note que l\'analyste peut modifier avant envoi. Le cas arrive avec du contexte au lieu de tomber à froid.',
    decisionCaption: 'Confirmation et ce qui s\'est passé ensuite',
    decisionFrustration: 'D\'habitude, l\'analyste agit et ne voit jamais la suite. Les transmissions semblent disparaître.',
    decisionBenefit: 'Chaque action laisse une trace visible : le message Slack, le SMS, le ticket. L\'analyste voit que c\'est passé.',
    falsePositiveTitle: 'Traiter une fausse alerte en huit secondes',
    falsePositiveText: 'Alerte de risque moyen : score 45, un paiement de 450 euros. L\'IA passe l\'historique en revue, ne trouve rien. Un clic pour confirmer. Huit secondes en tout.',
    falsePositiveCaption: 'Fausse alerte, résolue',
    falsePositiveFrustration: 'Les fausses alertes prennent autant de temps que les vrais cas, alors qu\'elles ne demandent rien.',
    falsePositiveBenefit: 'L\'IA repère les cas inoffensifs en quelques secondes. L\'analyste garde son attention pour le reste.',
    queueTitle: 'Enchaîner une file complète',
    queueText: 'Cinq cas à la suite. Après chacun, le suivant se charge. Barre de progression, chrono en direct. À la fin : cinq cas, 92 secondes, 18 de moyenne.',
    queueCaption: 'Enchaînement et bilan de session',
    queueFrustration: 'Changer de cas impose de reprendre ses repères à chaque fois.',
    queueBenefit: 'Les cas s\'enchaînent sans rupture. Les compteurs gardent le rythme visible.',
    learningsTitle: 'Ce que j\'ai appris sur les interfaces agentiques avec ce projet',
    learningsIntro: 'Deux observations m\'ont marqué. Je pense qu\'elles vont au-delà de la fraude.',
    learning1Title: 'Le streaming du raisonnement crée la confiance d\'une manière que les scores ne font pas.',
    learning1Text: 'Quand l\'IA écrit son analyse mot par mot, l\'analyste lit et se forge sa propre opinion en parallèle. Il peut acquiescer, tiquer sur un point, repérer un oubli. Un score de confiance affiché après coup dit juste « faites-moi confiance » sans montrer le travail.',
    learning2Title: 'Masquer les boutons tant que l\'analyse n\'est pas finie change la façon dont les gens lisent.',
    learning2Text: 'Les boutons de décision de RiskOS n\'apparaissent qu\'une fois que l\'IA a fini d\'écrire. Ça ajoute quelques secondes, mais ces secondes font la différence entre survoler et lire vraiment. Sous pression, les gens cliquent sur la première option disponible. Cette petite contrainte donne au raisonnement le temps d\'arriver.',
    learning3Title: '',
    learning3Text: '',
    learningsOutro: 'Je retrouve les mêmes dynamiques dans d\'autres contextes où l\'IA accompagne des décisions sous contrainte de temps : conformité, triage médical, modération de contenu, gestion d\'incidents.',
    techTitle: 'Stack',
    techText: 'Prototype fonctionnel. React 18, Vite, Tailwind CSS. Sombre, bureau d\'abord. Sur Vercel.',
    viewPrototype: 'Voir le prototype',
    viewGitHub: 'GitHub',
  },
};

// ─── Video card with Apple TV 3D tilt + liquid glass ─────────────────────────

const VIDEO_BASE = '/assets/projets/riskos/videos';

function GlassVideoCard({
  src,
  caption,
  description,
  frustration,
  benefit,
  lang,
  index,
  onClick,
}: {
  src: string;
  caption: string;
  description?: string;
  frustration?: string;
  benefit?: string;
  lang: 'en' | 'fr';
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring smoothing
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  // Glow position
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="mb-24 md:mb-32">
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group cursor-pointer"
        onClick={onClick}
        style={{ perspective: 1200 }}
      >
        {/* 3D tilt container */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-2xl overflow-hidden transition-shadow duration-300 ease-out shadow-lg shadow-black/40 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
        >
          {/* Liquid glass glow overlay */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.12) 0%, transparent 50%)`,
            }}
          />

          {/* Shine effect on edges (liquid glass) */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(0,0,0,0.3)',
            }}
          />

          {/* Glass border */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-300" />

          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full block"
          />
        </motion.div>
      </motion.figure>

      {/* Caption below */}
      <div className="mt-5 max-w-[65ch]">
        <p className="text-sm font-semibold text-gray-200 mb-1">{caption}</p>
        {description && (
          <p className="text-sm text-gray-400 leading-relaxed mb-3">{description}</p>
        )}
        {frustration && (
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="text-red-400/80 font-medium">
              {lang === 'fr' ? 'Frustration : ' : 'Frustration: '}
            </span>
            {frustration}
          </p>
        )}
        {benefit && (
          <p className="text-xs text-gray-500 leading-relaxed mt-1">
            <span className="text-emerald-400/80 font-medium">
              {lang === 'fr' ? 'Bénéfice : ' : 'Benefit: '}
            </span>
            {benefit}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-6">
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4 max-w-[65ch]">
      {children}
    </p>
  );
}

// ─── Lightbox media items ────────────────────────────────────────────────────

function buildLightboxItems(lang: 'en' | 'fr'): LightboxImage[] {
  const t = CONTENT[lang];
  return [
    { src: `${VIDEO_BASE}/06-before-after.mp4`, caption: t.beforeAfterCaption, type: 'video' },
    { src: `${VIDEO_BASE}/07-data-flow.mp4`, caption: t.dataFlowCaption, type: 'video' },
    { src: `${VIDEO_BASE}/01-hero-triage.mp4`, caption: t.triageCaption, type: 'video' },
    { src: `${VIDEO_BASE}/02-ai-insight.mp4`, caption: t.aiCaption, type: 'video' },
    { src: `${VIDEO_BASE}/03-decision-ellipses.mp4`, caption: t.decisionCaption, type: 'video' },
    { src: `${VIDEO_BASE}/05-false-positive.mp4`, caption: t.falsePositiveCaption, type: 'video' },
    { src: `${VIDEO_BASE}/04-queue-cleared.mp4`, caption: t.queueCaption, type: 'video' },
  ];
}

// ─── Main Component ──────────────────────────────────────────────────────────

const RiskOSPage: React.FC<RiskOSPageProps> = ({
  onClose,
  lang: propLang,
}) => {
  const lang = propLang || 'fr';
  const t = CONTENT[lang];
  const sections = TOC_SECTIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [showNav, setShowNav] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxItems = buildLightboxItems(lang);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Track scroll position and update active section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setShowNav(scrollTop > 300);

      if (scrollTop < 100) {
        setActiveSection('top');
        return;
      }

      const sectionElements = sections
        .filter(s => s.id !== 'top')
        .map(s => ({ id: s.id, element: document.getElementById(s.id) }))
        .filter(s => s.element);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    if (!containerRef.current) return;
    if (sectionId === 'top') {
      smoothScrollTo(containerRef.current, 0);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 80;
      smoothScrollTo(containerRef.current, offset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-[-0.02em] text-white">RiskOS</span>
          <button
            onClick={onClose}
            className="relative p-3 rounded-full transition-colors hover:bg-white/10 before:absolute before:inset-[-12px] before:content-[''] cursor-pointer"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
      </header>

      {/* TOC Sidebar */}
      <CaseStudyTOCSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={true}
        isVisible={showNav}
        lang={lang}
      />

      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="riskos"
      />

      {/* Main scrollable content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        {/* Hero */}
        <div className="max-w-[900px] mx-auto px-6 pt-16 md:pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-400">
                {t.category}
              </span>
              <span className="text-xs text-gray-500">2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-4">
              RiskOS
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-[55ch] mb-3">
              {t.subtitle}
            </p>
            <p className="text-sm text-gray-500">{t.author}</p>
          </motion.div>
        </div>

        {/* Content sections */}
        <div className="max-w-[900px] mx-auto px-6 pb-32">

          {/* Section: Why */}
          <section id="why" className="mb-24 md:mb-32 scroll-mt-24">
            <SectionTitle>{t.whyTitle}</SectionTitle>
            <Paragraph>{t.whyP1}</Paragraph>
            <Paragraph>{t.whyP2}</Paragraph>
            <Paragraph>{t.whyP3}</Paragraph>
          </section>

          {/* Section: Insight */}
          <section id="insight" className="mb-24 md:mb-32 scroll-mt-24">
            <SectionTitle>{t.insightTitle}</SectionTitle>
            <Paragraph>{t.insightP1}</Paragraph>
            <Paragraph>{t.insightP2}</Paragraph>
          </section>

          {/* Video 0: Before/After */}
          <GlassVideoCard
            src={`${VIDEO_BASE}/06-before-after.mp4`}
            caption={t.beforeAfterCaption}
            description={t.beforeAfterText}
            lang={lang}
            index={0}
            onClick={() => openLightbox(0)}
          />

          {/* Section: Design Question */}
          <section id="design-question" className="mb-24 md:mb-32 scroll-mt-24">
            <SectionTitle>{t.designQuestionTitle}</SectionTitle>
            <Paragraph>{t.designQuestionP1}</Paragraph>
            <Paragraph>{t.designQuestionP2}</Paragraph>
            <ul className="space-y-3 max-w-[65ch] mb-8">
              {t.designPrinciples.map((p, i) => (
                <li key={i} className="flex gap-3 text-base text-gray-300 leading-relaxed">
                  <span className="text-[#2D5CF3] mt-1.5 shrink-0">&#9679;</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Video 1: Data Flow */}
          <GlassVideoCard
            src={`${VIDEO_BASE}/07-data-flow.mp4`}
            caption={t.dataFlowCaption}
            description={t.dataFlowText}
            lang={lang}
            index={1}
            onClick={() => openLightbox(1)}
          />

          {/* Section: Triage */}
          <section id="triage" className="mb-8 scroll-mt-24">
            <SectionTitle>{t.triageTitle}</SectionTitle>
            <Paragraph>{t.triageText}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/01-hero-triage.mp4`}
            caption={t.triageCaption}
            frustration={t.triageFrustration}
            benefit={t.triageBenefit}
            lang={lang}
            index={2}
            onClick={() => openLightbox(2)}
          />

          {/* Section: AI Analysis */}
          <section id="ai-analysis" className="mb-8 scroll-mt-24">
            <SectionTitle>{t.aiTitle}</SectionTitle>
            <Paragraph>{t.aiP1}</Paragraph>
            <Paragraph>{t.aiP2}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/02-ai-insight.mp4`}
            caption={t.aiCaption}
            frustration={t.aiFrustration}
            benefit={t.aiBenefit}
            lang={lang}
            index={3}
            onClick={() => openLightbox(3)}
          />

          {/* Section: Decision */}
          <section id="decision" className="mb-8 scroll-mt-24">
            <SectionTitle>{t.decisionTitle}</SectionTitle>
            <Paragraph>{t.decisionP1}</Paragraph>
            <Paragraph>{t.decisionP2}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/03-decision-ellipses.mp4`}
            caption={t.decisionCaption}
            frustration={t.decisionFrustration}
            benefit={t.decisionBenefit}
            lang={lang}
            index={4}
            onClick={() => openLightbox(4)}
          />

          {/* Section: False Positive */}
          <section id="false-positive" className="mb-8 scroll-mt-24">
            <SectionTitle>{t.falsePositiveTitle}</SectionTitle>
            <Paragraph>{t.falsePositiveText}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/05-false-positive.mp4`}
            caption={t.falsePositiveCaption}
            frustration={t.falsePositiveFrustration}
            benefit={t.falsePositiveBenefit}
            lang={lang}
            index={5}
            onClick={() => openLightbox(5)}
          />

          {/* Section: Queue */}
          <section id="queue" className="mb-8 scroll-mt-24">
            <SectionTitle>{t.queueTitle}</SectionTitle>
            <Paragraph>{t.queueText}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/04-queue-cleared.mp4`}
            caption={t.queueCaption}
            frustration={t.queueFrustration}
            benefit={t.queueBenefit}
            lang={lang}
            index={6}
            onClick={() => openLightbox(6)}
          />

          {/* Section: Learnings */}
          <section id="learnings" className="mb-24 md:mb-32 scroll-mt-24">
            <SectionTitle>{t.learningsTitle}</SectionTitle>
            <Paragraph>{t.learningsIntro}</Paragraph>

            <div className="space-y-8 mt-8 max-w-[65ch]">
              {[
                { title: t.learning1Title, text: t.learning1Text },
                { title: t.learning2Title, text: t.learning2Text },
                { title: t.learning3Title, text: t.learning3Text },
              ].filter(l => l.title && l.text).map((learning, i) => (
                <div key={i}>
                  <p className="text-base md:text-lg text-white font-semibold mb-2">
                    {learning.title}
                  </p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {learning.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Paragraph>{t.learningsOutro}</Paragraph>
            </div>
          </section>

          {/* Technical scope + links */}
          <section className="mb-16">
            <SectionTitle>{t.techTitle}</SectionTitle>
            <Paragraph>{t.techText}</Paragraph>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all text-sm"
              >
                {t.viewPrototype}
                <ArrowUpRight size={16} weight="bold" />
              </a>
              <a
                href="https://github.com/marcus-clay/riskos-fraud-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium bg-white/10 text-gray-300 hover:bg-white/15 transition-all text-sm"
              >
                {t.viewGitHub}
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RiskOSPage;
