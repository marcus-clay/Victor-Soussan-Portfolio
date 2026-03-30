import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

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


// ─── Content ─────────────────────────────────────────────────────────────────

const CONTENT = {
  en: {
    subtitle: 'AI-Augmented Fraud Detection',
    category: 'Agentic UX Experimentation',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'Context',
    whyP1: 'Agentic interfaces raise a question I find genuinely interesting from a product design perspective: when an AI is part of a decision process, how do you keep the person making the call actively engaged? If the AI does too much, the human disengages. If it does too little to explain itself, trust erodes.',
    whyP2: 'Fraud detection in European banking was a natural context to explore this. Analysts work under time pressure, 80% of their alerts turn out to be false alarms, and the final decision is always theirs. A setting where the balance between AI assistance and human judgment has immediate, measurable consequences.',
    whyP3: 'RiskOS is the prototype I built to test ideas around that balance.',
    insightTitle: 'Initial observation',
    insightP1: 'A fraud analyst at a European neobank handles 80 to 150 alerts per shift. Most are harmless. Every minute spent on a false alarm is a minute not available for a real case.',
    insightP2: 'In many teams, the daily tool is still a spreadsheet and a set of fixed rules. No surrounding context, no sorting by relevance, no memory of previous cases.',
    beforeAfterCaption: 'Same data, two readings.',
    beforeAfterText: 'On the left, the alert feed as most institutions receive it: raw spreadsheet, flat columns. On the right, the same information organized in RiskOS.',
    designQuestionTitle: 'Design approach',
    designQuestionP1: 'The central question was whether the AI could handle the preparation work while the analyst retained full ownership of the decision.',
    designQuestionP2: 'Three principles guided the design:',
    designPrinciples: [
      'The AI sets up context so the analyst can think clearly. It doesn\'t decide.',
      'The reasoning is readable, not hidden behind a number.',
      'When the analyst acts, something happens outside the tool, not just inside it.',
    ],
    dataFlowCaption: 'Where RiskOS sits in the process.',
    dataFlowText: 'A suspicious transaction hits the bank\'s automated rules. If flagged, the alert goes into a queue. The AI analyzes it. The analyst reviews and decides. RiskOS is the workspace for that last step.',
    triageTitle: 'Triage under time pressure',
    triageText: 'The analyst opens their session. Five cases are waiting, sorted by risk level. They can filter by priority and track their progress with a live counter.',
    triageCaption: 'Triage view',
    triageFrustration: 'Without sorting, the analyst scrolls through the whole list looking for the urgent ones.',
    triageBenefit: 'Color-coded priorities and a live counter. Sorting takes a few seconds.',
    aiTitle: 'Making the AI reasoning readable',
    aiP1: 'The AI writes its analysis in real time, word by word. Relevant details like amounts, locations, and devices are highlighted as they appear. The data sources used light up progressively, and a confidence score indicates the level of certainty.',
    aiP2: 'The action buttons remain hidden until the analysis is complete. The analyst reads the full reasoning before any decision is possible.',
    aiCaption: 'AI analysis, streaming',
    aiFrustration: 'Usually the analyst gets a risk number with no explanation. They reconstruct the reasoning themselves.',
    aiBenefit: 'Here the AI writes out what it found, step by step. The analyst reads the reasoning, then decides.',
    decisionTitle: 'Acting on a case, and seeing it through',
    decisionP1: 'The analyst picks an action: block the card, pass the case to a senior, or keep it under watch. A confirmation screen recaps what happened. Then two things appear that usually stay invisible: the Slack message to the fraud team, and the SMS to the customer.',
    decisionP2: 'For handoffs, the AI pre-writes a note the analyst can edit before sending. The case arrives with context instead of landing cold.',
    decisionCaption: 'Confirmation and what happened next',
    decisionFrustration: 'Usually the analyst acts and never sees the result. Handoffs seem to disappear.',
    decisionBenefit: 'Every action has a visible trace: the Slack message, the customer SMS, the ticket. The analyst sees it went through.',
    falsePositiveTitle: 'Resolving a false alarm in eight seconds',
    falsePositiveText: 'A medium-risk alert arrives: score 45, a 450 euro payment. The AI reviews the transaction history and finds nothing unusual. The analyst confirms with one click. Total time from open to resolved: eight seconds.',
    falsePositiveCaption: 'False alarm, resolved',
    falsePositiveFrustration: 'False alarms take as long as real cases, even though they need no action.',
    falsePositiveBenefit: 'The AI catches the harmless ones in seconds. The analyst keeps their attention for the rest.',
    queueTitle: 'Processing a full queue',
    queueText: 'The analyst works through five cases in sequence. After each resolution, the next case loads automatically. A progress bar and running timer track the session. At the end: five cases resolved, 92 seconds total, 18 seconds on average.',
    queueCaption: 'Case flow and session recap',
    queueFrustration: 'Switching cases usually means starting over mentally each time.',
    queueBenefit: 'The cases chain without interruption. Running totals keep the pace visible.',
    learningsTitle: 'Observations on agentic interfaces',
    learningsIntro: 'Two findings from this project that I believe apply well beyond fraud detection.',
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
    whyTitle: 'Contexte',
    whyP1: 'Les interfaces agentiques posent une question que je trouve particulièrement intéressante du point de vue du product design : quand une IA participe à un processus de décision, comment maintenir la personne qui décide dans une posture active ? Si l\'IA fait trop, l\'humain se désengage. Si elle manque de transparence, la confiance s\'effrite.',
    whyP2: 'La détection de fraude dans le secteur bancaire européen offrait un contexte naturel pour explorer cette question. Les analystes travaillent sous contrainte de temps, 80 % de leurs alertes se révèlent être de fausses alarmes, et la décision finale leur revient toujours. Un terrain où l\'équilibre entre assistance de l\'IA et jugement humain a des conséquences immédiates et mesurables.',
    whyP3: 'RiskOS est le prototype que j\'ai construit pour tester des idées autour de cet équilibre.',
    insightTitle: 'Observation initiale',
    insightP1: 'Un analyste fraude dans une néobanque européenne traite 80 à 150 alertes par vacation. La plupart sont sans suite. Chaque minute consacrée à une fausse alarme est une minute retirée aux cas qui nécessitent une vraie attention.',
    insightP2: 'Dans beaucoup d\'équipes, l\'outil du quotidien reste un tableur et un jeu de règles fixes. Pas de contexte environnant, pas de tri par pertinence, pas de mémoire des cas précédents.',
    beforeAfterCaption: 'Mêmes données, deux lectures.',
    beforeAfterText: 'À gauche, le flux d\'alertes tel que la plupart des établissements le reçoivent : tableur brut, colonnes à plat. À droite, les mêmes informations organisées dans RiskOS.',
    designQuestionTitle: 'Approche de design',
    designQuestionP1: 'La question centrale était de savoir si l\'IA pouvait prendre en charge le travail de préparation tout en laissant à l\'analyste la pleine maîtrise de la décision.',
    designQuestionP2: 'Trois principes ont guidé le design :',
    designPrinciples: [
      'L\'IA pose le contexte pour que l\'analyste puisse réfléchir clairement. Elle ne décide pas.',
      'Le raisonnement doit être lisible, pas réduit à un chiffre.',
      'Quand l\'analyste agit, le résultat doit être visible au-delà de l\'outil.',
    ],
    dataFlowCaption: 'Où se place RiskOS dans le processus.',
    dataFlowText: 'Une transaction suspecte passe d\'abord par les règles automatiques de la banque. Si elle est signalée, l\'alerte entre dans une file. L\'IA l\'analyse. L\'analyste examine et tranche. RiskOS, c\'est l\'espace de travail de cette dernière étape.',
    triageTitle: 'Trier sous contrainte de temps',
    triageText: 'L\'analyste ouvre sa session. Cinq cas l\'attendent, classés par niveau de risque. Il peut filtrer par priorité et suivre sa progression avec un compteur en direct.',
    triageCaption: 'Vue de triage',
    triageFrustration: 'Sans tri, l\'analyste parcourt toute la liste à la main pour repérer les urgents.',
    triageBenefit: 'Priorités colorées et compteur en direct. Le tri prend quelques secondes.',
    aiTitle: 'Rendre le raisonnement de l\'IA lisible',
    aiP1: 'L\'IA rédige son analyse en temps réel, mot par mot. Les éléments pertinents (montants, localisations, appareils) sont mis en évidence au fur et à mesure. Les sources de données utilisées s\'éclairent progressivement, et un score de confiance indique le niveau de certitude.',
    aiP2: 'Les boutons d\'action restent masqués jusqu\'à la fin de l\'analyse. L\'analyste lit l\'intégralité du raisonnement avant de pouvoir prendre sa décision.',
    aiCaption: 'Analyse IA, en direct',
    aiFrustration: 'D\'habitude, l\'analyste reçoit un chiffre de risque sans explication. Il reconstitue le raisonnement seul.',
    aiBenefit: 'Ici l\'IA écrit ce qu\'elle a trouvé, étape par étape. L\'analyste lit le raisonnement, puis il décide.',
    decisionTitle: 'Agir sur un cas, et voir la suite',
    decisionP1: 'L\'analyste choisit : bloquer la carte, transmettre à un senior, ou surveiller. Un écran récapitule ce qui s\'est passé. Puis deux choses apparaissent qui restent d\'habitude invisibles : le message Slack à l\'équipe fraude, et le SMS au client.',
    decisionP2: 'Pour les transmissions, l\'IA pré-rédige une note que l\'analyste peut ajuster avant envoi. Le cas arrive auprès du collègue avec du contexte, au lieu de tomber sans explication.',
    decisionCaption: 'Confirmation et ce qui s\'est passé ensuite',
    decisionFrustration: 'D\'habitude, l\'analyste agit et ne voit jamais la suite. Les transmissions semblent disparaître.',
    decisionBenefit: 'Chaque action laisse une trace visible : le message Slack, le SMS, le ticket. L\'analyste voit que c\'est passé.',
    falsePositiveTitle: 'Résoudre une fausse alerte en huit secondes',
    falsePositiveText: 'Une alerte de risque moyen arrive : score 45, un paiement de 450 euros. L\'IA passe l\'historique en revue et ne trouve rien d\'anormal. L\'analyste confirme d\'un clic. Temps total entre l\'ouverture et la résolution : huit secondes.',
    falsePositiveCaption: 'Fausse alerte, résolue',
    falsePositiveFrustration: 'Les fausses alertes prennent autant de temps que les vrais cas, alors qu\'elles ne demandent rien.',
    falsePositiveBenefit: 'L\'IA repère les cas inoffensifs en quelques secondes. L\'analyste garde son attention pour le reste.',
    queueTitle: 'Traiter une file complète',
    queueText: 'L\'analyste traite cinq cas en séquence. Après chaque résolution, le cas suivant se charge automatiquement. Une barre de progression et un chronomètre suivent la session. Au terme de la file : cinq cas résolus, 92 secondes au total, 18 secondes de moyenne.',
    queueCaption: 'Enchaînement et bilan de session',
    queueFrustration: 'Changer de cas impose de reprendre ses repères à chaque fois.',
    queueBenefit: 'Les cas s\'enchaînent sans rupture. Les compteurs gardent le rythme visible.',
    learningsTitle: 'Observations sur les interfaces agentiques',
    learningsIntro: 'Deux enseignements de ce projet qui, je pense, s\'appliquent bien au-delà de la détection de fraude.',
    learning1Title: 'Le streaming du raisonnement construit la confiance d\'une manière que les scores ne permettent pas.',
    learning1Text: 'Quand l\'IA écrit son analyse mot par mot, l\'analyste suit et se forge sa propre opinion en parallèle. Il peut acquiescer, relever une incohérence, repérer un élément manquant. Un score de confiance affiché après coup demande la confiance sans montrer le travail qui l\'a produit.',
    learning2Title: 'Masquer les boutons tant que l\'analyse est en cours change la façon dont les gens lisent.',
    learning2Text: 'Les boutons de décision de RiskOS n\'apparaissent qu\'une fois l\'analyse terminée. Ces quelques secondes supplémentaires font la différence entre survoler et lire attentivement. Sous contrainte de temps, les utilisateurs cliquent sur la première option disponible. Cette petite contrainte donne au raisonnement le temps d\'être reçu.',
    learning3Title: '',
    learning3Text: '',
    learningsOutro: 'Je retrouve ces mêmes dynamiques dans d\'autres contextes où l\'IA accompagne une décision humaine sous contrainte de temps : conformité réglementaire, triage médical, modération de contenu, gestion d\'incidents.',
    techTitle: 'Périmètre technique',
    techText: 'Prototype fonctionnel construit avec React 18, Vite et Tailwind CSS. Interface sombre, conçue pour le bureau. Déployé sur Vercel.',
    viewPrototype: 'Voir le prototype',
    viewGitHub: 'GitHub',
  },
};

// ─── Video card with hover zoom + shadow lift ────────────────────────────────

const VIDEO_BASE = '/videos/riskos';

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
  onClick: (currentTime: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    const time = videoRef.current?.currentTime ?? 0;
    onClick(time);
  };

  return (
    <div className="mb-24 md:mb-32">
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group cursor-zoom-in"
        onClick={handleClick}
      >
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/50 group-hover:scale-[1.01]">
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </div>
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
    { src: '/images/riskos/thubmnail_riskos_dark.webp', caption: 'RiskOS', type: 'image' },
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
  lang: propLang,
}) => {
  const lang = propLang || 'fr';
  const t = CONTENT[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const lightboxItems = buildLightboxItems(lang);

  const openLightbox = (index: number, currentTime = 0) => {
    setVideoTime(currentTime);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen">
      {/* Lightbox */}
      <EnhancedLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        lang={lang}
        projectId="riskos"
        videoStartTime={videoTime}
      />
        {/* Hero */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
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
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-32">

          {/* Hero image */}
          <figure className="mb-16 md:mb-24">
            <div
              className="rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] cursor-zoom-in group transition-[border-color,box-shadow,transform] duration-300 ease-out shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/50 hover:scale-[1.01]"
              style={{ backgroundColor: '#0a0a0a' }}
              onClick={() => openLightbox(0)}
            >
              <img
                loading="lazy"
                src="/images/riskos/thubmnail_riskos_dark.webp"
                alt="RiskOS — fraud detection dashboard overview"
                className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </figure>

          {/* Section: Why */}
          <section id="why" className="mb-24 md:mb-32 scroll-mt-28">
            <SectionTitle>{t.whyTitle}</SectionTitle>
            <Paragraph>{t.whyP1}</Paragraph>
            <Paragraph>{t.whyP2}</Paragraph>
            <Paragraph>{t.whyP3}</Paragraph>
          </section>

          {/* Section: Insight */}
          <section id="insight" className="mb-24 md:mb-32 scroll-mt-28">
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
            index={1}
            onClick={(time) => openLightbox(1, time)}
          />

          {/* Section: Design Question */}
          <section id="design-question" className="mb-24 md:mb-32 scroll-mt-28">
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
            index={2}
            onClick={(time) => openLightbox(2, time)}
          />

          {/* Section: Triage */}
          <section id="triage" className="mb-8 scroll-mt-28">
            <SectionTitle>{t.triageTitle}</SectionTitle>
            <Paragraph>{t.triageText}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/01-hero-triage.mp4`}
            caption={t.triageCaption}
            frustration={t.triageFrustration}
            benefit={t.triageBenefit}
            lang={lang}
            index={3}
            onClick={(time) => openLightbox(3, time)}
          />

          {/* Section: AI Analysis */}
          <section id="ai-analysis" className="mb-8 scroll-mt-28">
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
            index={4}
            onClick={(time) => openLightbox(4, time)}
          />

          {/* Section: Decision */}
          <section id="decision" className="mb-8 scroll-mt-28">
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
            index={5}
            onClick={(time) => openLightbox(5, time)}
          />

          {/* Section: False Positive */}
          <section id="false-positive" className="mb-8 scroll-mt-28">
            <SectionTitle>{t.falsePositiveTitle}</SectionTitle>
            <Paragraph>{t.falsePositiveText}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/05-false-positive.mp4`}
            caption={t.falsePositiveCaption}
            frustration={t.falsePositiveFrustration}
            benefit={t.falsePositiveBenefit}
            lang={lang}
            index={6}
            onClick={(time) => openLightbox(6, time)}
          />

          {/* Section: Queue */}
          <section id="queue" className="mb-8 scroll-mt-28">
            <SectionTitle>{t.queueTitle}</SectionTitle>
            <Paragraph>{t.queueText}</Paragraph>
          </section>
          <GlassVideoCard
            src={`${VIDEO_BASE}/04-queue-cleared.mp4`}
            caption={t.queueCaption}
            frustration={t.queueFrustration}
            benefit={t.queueBenefit}
            lang={lang}
            index={7}
            onClick={(time) => openLightbox(7, time)}
          />

          {/* Section: Learnings */}
          <section id="learnings" className="mb-24 md:mb-32 scroll-mt-28">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] text-sm"
              >
                {t.viewPrototype}
                <ArrowUpRight size={16} weight="bold" />
              </a>
              <a
                href="https://github.com/marcus-clay/riskos-fraud-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium bg-white/10 text-gray-300 hover:bg-white/15 transition-[background-color,transform] duration-200 ease-out active:scale-[0.97] text-sm"
              >
                {t.viewGitHub}
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>
          </section>
        </div>
    </div>
  );
};

export default RiskOSPage;
