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
    whyTitle: 'Where this project comes from',
    whyP1: 'When you bring an AI agent into a workflow where a human makes the final call, a real design problem appears: how do you make the two collaborate without the human becoming passive, or losing trust in the tool?',
    whyP2: 'I wanted to explore that question in a concrete setting. Fraud detection in European banking turned out to be a good fit: the stakes are measurable, the time pressure is real, and 80% of the alerts analysts receive are false positives. There is a genuine tension between speed and accuracy, and the analyst must remain in control.',
    whyP3: 'RiskOS is a functional prototype I built to test specific design hypotheses around that collaboration.',
    insightTitle: 'What I observed first',
    insightP1: 'A fraud analyst at a European neobank typically handles 80 to 150 alerts in an 8-hour shift. The vast majority turn out to be false positives. Every minute spent on a case that needs no action is a minute taken away from the ones that do.',
    insightP2: 'In many teams, the day-to-day tool is still a CSV export, a terminal, and a set of static rules. There is no contextual view, no intelligent prioritization, and no memory of past patterns.',
    beforeAfterCaption: 'The same data, two ways of reading it.',
    beforeAfterText: 'On the left, the alert stream as it actually arrives in many institutions: raw CSV, flat columns, no visual hierarchy. On the right, the same information structured in RiskOS. The side-by-side makes the cognitive cost of the current setup immediately visible.',
    designQuestionTitle: 'Can AI contextualize an alert in real time while keeping the analyst in charge?',
    designQuestionP1: 'That was the question I set out to answer with this prototype. The analyst needs to stay in control of the final call, but the AI can do a lot of the preparation work before that moment arrives.',
    designQuestionP2: 'Three principles shaped the design:',
    designPrinciples: [
      'The AI prepares the ground for the analyst to think. It does not make the call.',
      'The reasoning behind the analysis should be visible, not just the conclusion.',
      'Every action the analyst takes should have a traceable effect in the real environment.',
    ],
    dataFlowCaption: 'Where RiskOS fits in the detection chain.',
    dataFlowText: 'A suspicious transaction travels from the core banking system to the rule engine, into the alert queue, through the AI analysis layer, and finally to the human analyst. RiskOS sits at the point where the alert needs judgment, not another automated rule.',
    triageTitle: 'Starting the shift: triage under pressure',
    triageText: 'The L1 analyst opens their session. The inbox shows five open cases, sorted by risk level. Filters let them focus on high, medium, or low priority. A session counter keeps track of what has been processed and what remains.',
    triageCaption: 'The triage view',
    triageFrustration: 'Without prioritization, the analyst has to scan the full list manually to find the urgent cases.',
    triageBenefit: 'Color-coded risk levels, active filtering, and the live session counter bring triage down to a few seconds.',
    aiTitle: 'How the AI shows its work',
    aiP1: 'The AI agent processes the case in real time. Its analysis streams in word by word: pattern matching, behavioral signals, a recommendation. Key tokens like amounts, geolocations, and device identifiers are highlighted to guide attention. A confidence indicator shows how certain the analysis is, and the data sources it relied on (Core Banking API, Device Fingerprint, Geo Intelligence) light up as they contribute.',
    aiP2: 'One deliberate design choice: the action buttons only appear once the AI has finished streaming. This forces a minimum reading time and prevents the analyst from deciding before understanding.',
    aiCaption: 'AI streaming analysis',
    aiFrustration: 'The analyst sees a risk score but has no visibility into how it was calculated. They have to piece together the reasoning from scattered data points.',
    aiBenefit: 'The AI assembles the weak signals into a coherent narrative. The analyst understands the reasoning before choosing what to do.',
    decisionTitle: 'Acting on a case, and seeing what happens next',
    decisionP1: 'The analyst picks an action: block the card, escalate to Level 2, or flag for monitoring. A confirmation screen recaps the case, the action taken, and the review duration. Then two follow-up notifications appear on screen: the Slack message posted to the #fraud-ops channel, and the SMS sent to the customer whose card was just frozen.',
    decisionP2: 'When escalating, the analyst gets a note pre-drafted by the AI that they can edit before sending. This turns escalation into a real handoff with context, rather than pushing a case out of sight.',
    decisionCaption: 'Action confirmation and downstream effects',
    decisionFrustration: 'The analyst takes action inside the tool but has no confirmation that anything actually happened outside of it. Escalations seem to vanish.',
    decisionBenefit: 'Each action produces visible feedback across the ecosystem: a Slack message, an SMS, a tracking ticket. The analyst knows the decision has been carried through.',
    falsePositiveTitle: 'Clearing a false positive in eight seconds',
    falsePositiveText: 'A medium-risk case comes in: score 45, a 450 euro payment. The AI analysis concludes that the transaction falls within normal patterns and recommends marking it as safe. The analyst confirms with a single click. Total time from open to resolved: eight seconds.',
    falsePositiveCaption: 'A false positive, resolved',
    falsePositiveFrustration: 'False positives take as long to process as real fraud cases, even though they need no action.',
    falsePositiveBenefit: 'The AI pre-qualifies false positives in a few seconds, so the analyst can spend their attention on the cases that actually require judgment.',
    queueTitle: 'Processing a full queue without breaking rhythm',
    queueText: 'The analyst works through five cases back to back. After each confirmation, the next case loads automatically. The session bar updates in real time. At the end of the queue, a summary screen shows the result: five cases processed, 92 seconds total, 18 seconds average per case.',
    queueCaption: 'Queue flow and session summary',
    queueFrustration: 'Switching between cases forces a cognitive reset each time. The analyst loses momentum.',
    queueBenefit: 'Automatic chaining between cases and live session metrics keep the workflow fluid and make progress tangible.',
    learningsTitle: 'What I took away from this project',
    learningsIntro: 'The real design work with AI-assisted decisions is not about automation. It is about deciding, at each step, what the AI should prepare and what the human should own.',
    learning1Title: 'Showing the reasoning builds trust faster than showing a score.',
    learning1Text: 'When the analysis streams in word by word, the analyst can start forming their own judgment while reading. It feels like working alongside someone. A confidence number displayed after the fact asks for trust without offering any visibility into how it got there.',
    learning2Title: 'A few seconds of intentional delay protects the quality of decisions.',
    learning2Text: 'In RiskOS, the action buttons only appear once the AI has finished its analysis. Under time pressure, that short pause gives the analyst just enough time to actually read the reasoning. The interface is a few seconds slower, but the decisions are better informed.',
    learning3Title: '',
    learning3Text: '',
    learningsOutro: 'These two patterns apply beyond fraud detection. They are relevant wherever an AI assists a human decision under time pressure: compliance, medical triage, content moderation, incident response.',
    techTitle: 'How it was built',
    techText: 'RiskOS is a functional prototype built with React 18, Vite, and Tailwind CSS. It uses lucide-react for icons and the Web Audio API for audio feedback. Dark mode, desktop-first. Deployed on Vercel.',
    viewPrototype: 'View prototype',
    viewGitHub: 'GitHub',
  },
  fr: {
    subtitle: 'Détection de fraude augmentée par IA agentique',
    category: 'Expérimentation UX agentiques',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'D\'où vient ce projet',
    whyP1: 'Quand on introduit un agent IA dans un processus où la décision finale revient à un humain, une vraie question de design se pose : comment faire collaborer les deux sans que l\'humain devienne passif, ou qu\'il finisse par ne plus faire confiance à l\'outil ?',
    whyP2: 'J\'ai voulu explorer cette question dans un cadre concret. La détection de fraude dans le secteur bancaire européen s\'y prêtait bien : les enjeux sont mesurables, la pression temporelle est réelle, et 80 % des alertes que reçoivent les analystes sont des faux positifs. Il y a une tension authentique entre vitesse et précision, et l\'analyste doit rester aux commandes.',
    whyP3: 'RiskOS est un prototype fonctionnel que j\'ai construit pour tester des hypothèses de design précises autour de cette collaboration.',
    insightTitle: 'Ce que j\'ai observé en premier',
    insightP1: 'Un analyste fraude dans une néobanque européenne traite en moyenne 80 à 150 alertes par vacation de 8 heures. La grande majorité se révèle être des faux positifs. Chaque minute passée sur un cas qui ne nécessite aucune action est une minute retirée aux cas qui en ont réellement besoin.',
    insightP2: 'Dans beaucoup d\'équipes, l\'outil du quotidien reste un export CSV, un terminal et un jeu de règles statiques. Pas de vue contextuelle, pas de priorisation intelligente, pas de mémoire des patterns passés.',
    beforeAfterCaption: 'Les mêmes données, deux façons de les lire.',
    beforeAfterText: 'À gauche, le flux d\'alertes tel qu\'il arrive dans beaucoup d\'établissements : un CSV brut, des colonnes à plat, sans hiérarchie visuelle. À droite, la même information structurée dans RiskOS. La mise en regard rend immédiatement visible le coût cognitif de l\'outil actuel.',
    designQuestionTitle: 'Comment contextualiser une alerte en temps réel sans retirer le contrôle à l\'analyste ?',
    designQuestionP1: 'C\'est la question que j\'ai voulu explorer avec ce prototype. L\'analyste doit garder la main sur la décision finale, mais l\'IA peut faire une grande partie du travail de préparation en amont.',
    designQuestionP2: 'Trois principes ont guidé le design :',
    designPrinciples: [
      'L\'IA prépare le terrain pour que l\'analyste réfléchisse. Elle ne prend pas la décision.',
      'Le raisonnement qui sous-tend l\'analyse doit être visible, pas seulement la conclusion.',
      'Chaque action de l\'analyste doit produire un effet traçable dans l\'environnement réel.',
    ],
    dataFlowCaption: 'Où se place RiskOS dans la chaîne de détection.',
    dataFlowText: 'Une transaction suspecte passe du système bancaire au moteur de règles, entre dans la file d\'alertes, traverse la couche d\'analyse IA, et arrive enfin devant l\'analyste humain. RiskOS intervient au moment où l\'alerte a besoin d\'un jugement, pas d\'une règle automatique supplémentaire.',
    triageTitle: 'Début de vacation : trier sous pression',
    triageText: 'L\'analyste L1 ouvre sa session. L\'inbox affiche cinq cas ouverts, classés par niveau de risque. Des filtres permettent de se concentrer sur les priorités hautes, moyennes ou basses. Un compteur de session indique ce qui a été traité et ce qui reste.',
    triageCaption: 'La vue de triage',
    triageFrustration: 'Sans priorisation, l\'analyste doit parcourir toute la liste à la main pour repérer les cas urgents.',
    triageBenefit: 'Les niveaux de risque colorés, le filtrage actif et le compteur en temps réel ramènent le triage à quelques secondes.',
    aiTitle: 'Comment l\'IA montre son travail',
    aiP1: 'L\'agent IA traite le cas en temps réel. Son analyse apparaît mot par mot : correspondance de patterns, signaux comportementaux, recommandation. Les éléments sensibles (montants, géolocalisations, identifiants d\'appareil) sont mis en évidence pour guider l\'attention. Un indicateur de confiance montre le degré de certitude de l\'analyse, et les sources de données utilisées (Core Banking API, Device Fingerprint, Geo Intelligence) s\'éclairent au fur et à mesure.',
    aiP2: 'Un choix de design délibéré : les boutons d\'action n\'apparaissent qu\'une fois l\'analyse terminée. Cela impose un temps de lecture minimum et empêche l\'analyste de décider avant d\'avoir compris.',
    aiCaption: 'Analyse IA en streaming',
    aiFrustration: 'L\'analyste voit un score de risque mais n\'a aucune visibilité sur la façon dont il a été calculé. Il doit reconstituer le raisonnement à partir de données éparses.',
    aiBenefit: 'L\'IA assemble les signaux faibles en un récit cohérent. L\'analyste comprend le raisonnement avant de choisir quoi faire.',
    decisionTitle: 'Agir sur un cas, et voir ce qui se passe ensuite',
    decisionP1: 'L\'analyste choisit une action : bloquer la carte, escalader au niveau 2, ou placer en surveillance. Un écran de confirmation récapitule le cas, l\'action prise et la durée de revue. Puis deux notifications de suivi apparaissent à l\'écran : le message Slack posté dans le canal #fraud-ops, et le SMS envoyé au client dont la carte vient d\'être gelée.',
    decisionP2: 'En cas d\'escalade, l\'analyste dispose d\'une note pré-rédigée par l\'IA qu\'il peut modifier avant envoi. L\'escalade devient ainsi une vraie transmission avec contexte, plutôt qu\'un dossier poussé hors de vue.',
    decisionCaption: 'Confirmation d\'action et effets en aval',
    decisionFrustration: 'L\'analyste agit dans l\'outil mais n\'a aucune confirmation que quelque chose s\'est réellement passé à l\'extérieur. Les escalades semblent disparaître.',
    decisionBenefit: 'Chaque action produit un retour visible dans l\'écosystème : un message Slack, un SMS, un ticket de suivi. L\'analyste sait que sa décision a été exécutée.',
    falsePositiveTitle: 'Traiter un faux positif en huit secondes',
    falsePositiveText: 'Un cas de risque moyen arrive : score 45, un paiement de 450 euros. L\'analyse IA conclut que la transaction s\'inscrit dans les patterns habituels et recommande de la marquer comme sûre. L\'analyste confirme d\'un clic. Temps total entre l\'ouverture et la résolution : huit secondes.',
    falsePositiveCaption: 'Un faux positif, résolu',
    falsePositiveFrustration: 'Les faux positifs prennent autant de temps à traiter que les vrais cas de fraude, alors qu\'ils ne nécessitent aucune action.',
    falsePositiveBenefit: 'L\'IA pré-qualifie les faux positifs en quelques secondes, ce qui permet à l\'analyste de consacrer son attention aux cas qui demandent réellement un jugement.',
    queueTitle: 'Traiter une file complète sans perdre le rythme',
    queueText: 'L\'analyste enchaîne cinq cas. Après chaque confirmation, le cas suivant se charge automatiquement. La barre de session se met à jour en temps réel. Au bout de la file, un écran récapitulatif affiche le résultat : cinq cas traités, 92 secondes au total, 18 secondes de moyenne par cas.',
    queueCaption: 'Enchaînement des cas et bilan de session',
    queueFrustration: 'Passer d\'un cas à l\'autre impose une remise en contexte à chaque fois. L\'analyste perd son rythme.',
    queueBenefit: 'L\'enchaînement automatique entre les cas et les métriques de session en direct maintiennent la fluidité du travail et rendent la progression visible.',
    learningsTitle: 'Ce que je retiens de ce projet',
    learningsIntro: 'Le vrai travail de design avec les outils de décision assistés par IA ne porte pas sur l\'automatisation. Il porte sur la répartition : à chaque étape, qu\'est-ce que l\'IA prépare, et qu\'est-ce que l\'humain décide.',
    learning1Title: 'Montrer le raisonnement construit la confiance plus vite qu\'afficher un score.',
    learning1Text: 'Quand l\'analyse se déroule mot par mot, l\'analyste peut commencer à former son propre jugement en lisant. Ça ressemble à un travail à deux. Un chiffre de confiance affiché après coup demande de faire confiance sans montrer comment on y est arrivé.',
    learning2Title: 'Quelques secondes de délai intentionnel protègent la qualité des décisions.',
    learning2Text: 'Dans RiskOS, les boutons d\'action n\'apparaissent qu\'une fois l\'analyse terminée. Sous pression, cette courte pause donne à l\'analyste juste assez de temps pour lire le raisonnement. L\'interface est ralentie de quelques secondes, mais les décisions sont mieux informées.',
    learning3Title: '',
    learning3Text: '',
    learningsOutro: 'Ces deux mécanismes s\'appliquent au-delà de la détection de fraude. Ils sont pertinents partout où une IA assiste une décision humaine sous pression temporelle : conformité, triage médical, modération de contenu, gestion d\'incidents.',
    techTitle: 'Comment c\'est construit',
    techText: 'RiskOS est un prototype fonctionnel développé avec React 18, Vite et Tailwind CSS. Il utilise lucide-react pour les icônes et la Web Audio API pour le feedback sonore. Mode sombre, pensé d\'abord pour le bureau. Déployé sur Vercel.',
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
