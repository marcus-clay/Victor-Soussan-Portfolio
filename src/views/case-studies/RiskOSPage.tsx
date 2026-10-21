import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '@/lib/motion'
import { ArrowUpRight } from '@phosphor-icons/react';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudySummary from '@/components/case-study/CaseStudySummary';
import { ActRule, ActTitle } from '@/components/case-study/ActSection';

import EnhancedLightbox, { type LightboxImage } from '../../components/media/EnhancedLightbox';
import VideoPlayer from '@/components/VideoPlayer';
import { zoomable } from '@/utils/zoomable'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface RiskOSPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang?: 'en' | 'fr';
  viewMode?: 'caseStudy' | 'gallery' | 'executive';
  onViewModeChange?: (mode: 'caseStudy' | 'gallery' | 'executive') => void;
  onContact?: () => void;
}

const CONTENT = {
  en: {
    subtitle: 'AI-Augmented Fraud Detection',
    category: 'Agentic UX experimentation',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'Context',
    heroIntro: 'RiskOS is a working prototype that tests whether an AI can prepare fraud alerts while the analyst keeps the decision. The AI writes its reasoning in full, and every action leaves a visible trace.',
    heroRole: 'Product design',
    heroFormat: 'Working prototype',
    summaryContext: 'Agentic interfaces raise a question I find genuinely interesting from a product design perspective: when an AI is part of a decision process, how do you keep the person making the call actively engaged? Fraud detection in European banking was a natural context to explore this. Analysts work under time pressure, 80% of their alerts turn out to be false alarms, and the final decision is always theirs.',
    summaryRole: 'I designed and built RiskOS, a working prototype that tests whether the AI can handle the preparation work while the analyst keeps full ownership of the decision. Stack: React 18, Vite and Tailwind CSS, deployed on Vercel.',
    summaryDeliverables: [
      { title: 'Triage view', detail: 'Five cases sorted by risk level, with priority filters and a live counter.' },
      { title: 'Streaming AI analysis', detail: 'The AI writes its reasoning word by word, with highlighted details, sources and a confidence score.' },
      { title: 'Decision flow', detail: 'Block the card, escalate or monitor, with the Slack message and the customer SMS made visible.' },
      { title: 'False-alarm resolution', detail: 'A medium-risk alert reviewed by the AI and confirmed with one click.' },
      { title: 'Queue processing', detail: 'Five cases resolved in sequence, with a session recap.' },
    ],
    actContext: 'Keeping the analyst engaged when an AI helps decide',
    actApproach: 'Keeping the analyst in charge: three principles, three decisions',
    actProduct: 'The prototype in use: from one false alarm to a full queue',
    whyP1: 'If the AI does too much, the human disengages. If it does too little to explain itself, trust erodes.',
    insightTitle: 'Initial observation',
    insightP1: 'A fraud analyst at a European neobank handles 80 to 150 alerts per shift. Most are harmless. Every minute spent on a false alarm is a minute not available for a real case.',
    insightP2: 'In many teams, the daily tool is still a spreadsheet and a set of fixed rules. No surrounding context, no sorting by relevance, no memory of previous cases.',
    beforeAfterCaption: 'Same data, two readings.',
    beforeAfterText: 'On the left, the alert feed as most institutions receive it: raw spreadsheet. On the right, the same information organized in RiskOS.',
    designQuestionTitle: 'Design approach',
    designQuestionP1: 'The central question was whether the AI could handle the preparation work while the analyst retained full ownership of the decision.',
    designQuestionP2: 'Three principles guided the design:',
    designPrinciples: [
      'The AI sets up context so the analyst can think clearly, and the analyst makes the decision.',
      'The reasoning is written out in full, so the analyst can read it.',
      'When the analyst acts, the effect is visible outside the tool as well.',
    ],
    dataFlowCaption: 'Where RiskOS sits in the process.',
    dataFlowText: 'A suspicious transaction hits the bank\'s automated rules. If flagged, the alert goes into a queue. The AI analyzes it. The analyst reviews and decides.',
    triageTitle: 'Triage under time pressure',
    triageText: 'The analyst opens their session. Five cases are waiting, sorted by risk level. They can filter by priority and track their progress with a live counter.',
    triageCaption: 'Triage view',
    triageFrustration: 'Without sorting, the analyst scrolls through the whole list looking for the urgent ones.',
    triageBenefit: 'Color-coded priorities and a live counter. Sorting takes a few seconds.',
    aiTitle: 'Making the AI reasoning readable',
    aiP1: 'The AI writes its analysis in real time, word by word. Relevant details are highlighted as they appear. The data sources used light up progressively, and a confidence score indicates the level of certainty.',
    aiP2: 'The action buttons remain hidden until the analysis is complete. The analyst reads the full reasoning before any decision is possible.',
    aiCaption: 'AI analysis, streaming',
    aiFrustration: 'Usually the analyst gets a risk number with no explanation.',
    aiBenefit: 'Here the AI writes out what it found, step by step. The analyst reads the reasoning, then decides.',
    decisionTitle: 'Acting on a case',
    decisionP1: 'The analyst picks an action: block the card, pass the case to a senior, or keep it under watch. A confirmation screen recaps what happened. Then two things appear that usually stay invisible: the Slack message to the fraud team, and the SMS to the customer.',
    decisionCaption: 'Confirmation and what happened next',
    decisionFrustration: 'Usually the analyst acts and never sees the result.',
    decisionBenefit: 'Every action has a visible trace: the Slack message, the customer SMS, the ticket.',
    falsePositiveTitle: 'Resolving a false alarm in eight seconds',
    falsePositiveText: 'A medium-risk alert arrives: score 45, a 450 euro payment. The AI reviews the transaction history and finds nothing unusual. The analyst confirms with one click.',
    falsePositiveCaption: 'False alarm, resolved',
    queueTitle: 'Processing a full queue',
    queueText: 'The analyst works through five cases in sequence. After each resolution, the next case loads automatically. At the end: five cases resolved, 92 seconds total.',
    queueCaption: 'Case flow and session recap',
    learningsTitle: 'Observations',
    learningsIntro: 'Two findings from this project that apply well beyond fraud detection.',
    learning1Title: 'Streaming the reasoning builds trust in a way scores cannot.',
    learning1Text: 'When the AI writes its analysis word by word, the analyst reads along and forms their own view at the same time. A confidence score after the fact just says "trust me" without showing the work.',
    learning2Title: 'Hiding the buttons until the analysis is done changes how people read.',
    learning2Text: 'The decision buttons only appear once the AI finishes writing. Under pressure, people click the first thing available. This small constraint gives the reasoning a chance to land.',
    learningsOutro: 'I see the same dynamics in other contexts: compliance, medical triage, content moderation, incident response.',
    techTitle: 'Stack',
    techText: 'Working prototype. React 18, Vite, Tailwind CSS. Deployed on Vercel.',
    viewPrototype: 'View prototype',
    viewGitHub: 'GitHub',
  },
  fr: {
    subtitle: 'Détection de fraude augmentée par IA agentique',
    category: 'Expérimentation UX agentique',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'Contexte',
    heroIntro: 'RiskOS est un prototype fonctionnel qui teste si une IA peut préparer les alertes de fraude pendant que l\'analyste garde la décision. L\'IA écrit son raisonnement en toutes lettres et chaque action laisse une trace visible.',
    heroRole: 'Product design',
    heroFormat: 'Prototype fonctionnel',
    summaryContext: 'Les interfaces agentiques posent une question intéressante du point de vue du product design : quand une IA participe à un processus de décision, comment maintenir la personne qui décide dans une posture active ? La détection de fraude dans le secteur bancaire européen offrait un contexte naturel pour explorer cette question. Les analystes travaillent sous contrainte de temps, 80 % de leurs alertes se révèlent être de fausses alarmes, et la décision finale leur revient toujours.',
    summaryRole: 'J\'ai conçu et construit RiskOS, un prototype fonctionnel qui teste si l\'IA peut prendre en charge la préparation tout en laissant à l\'analyste la pleine maîtrise de la décision. Périmètre technique : React 18, Vite et Tailwind CSS, déployé sur Vercel.',
    summaryDeliverables: [
      { title: 'Vue de triage', detail: 'Cinq cas classés par niveau de risque, avec filtres de priorité et compteur en direct.' },
      { title: 'Analyse IA en direct', detail: 'L\'IA écrit son raisonnement mot par mot, avec détails mis en évidence, sources et score de confiance.' },
      { title: 'Parcours de décision', detail: 'Bloquer la carte, transmettre ou surveiller, avec le message Slack et le SMS au client rendus visibles.' },
      { title: 'Résolution d\'une fausse alerte', detail: 'Une alerte de risque moyen passée en revue par l\'IA et confirmée d\'un clic.' },
      { title: 'Traitement d\'une file', detail: 'Cinq cas résolus en séquence, avec un bilan de session.' },
    ],
    actContext: 'Garder l\'analyste engagé quand une IA participe à la décision',
    actApproach: 'Laisser la main à l\'analyste : trois principes, trois décisions',
    actProduct: 'Le prototype en usage : d\'une fausse alerte à une file complète',
    whyP1: 'Si l\'IA fait trop, l\'humain se désengage. Si elle manque de transparence, la confiance s\'effrite.',
    insightTitle: 'Observation initiale',
    insightP1: 'Un analyste fraude dans une néobanque européenne traite 80 à 150 alertes par vacation. La plupart sont sans suite. Chaque minute passée sur une fausse alarme est une minute indisponible pour un cas réel.',
    insightP2: 'Dans beaucoup d\'équipes, l\'outil du quotidien reste un tableur et un jeu de règles fixes. Pas de contexte, pas de tri par pertinence, pas de mémoire des cas précédents.',
    beforeAfterCaption: 'Mêmes données, deux lectures.',
    beforeAfterText: 'À gauche, le flux d\'alertes tel que la plupart des établissements le reçoivent\u00a0: un tableur brut. À droite, les mêmes informations organisées dans RiskOS.',
    designQuestionTitle: 'Approche de design',
    designQuestionP1: 'La question centrale\u00a0: l\'IA peut-elle prendre en charge la préparation tout en laissant à l\'analyste la pleine maîtrise de la décision\u00a0?',
    designQuestionP2: 'Trois principes ont guidé le design\u00a0:',
    designPrinciples: [
      'L\'IA pose le contexte pour que l\'analyste puisse réfléchir clairement, et l\'analyste prend la décision.',
      'Le raisonnement est écrit en toutes lettres, pour que l\'analyste puisse le lire.',
      'Quand l\'analyste agit, l\'effet est visible aussi en dehors de l\'outil.',
    ],
    dataFlowCaption: 'Où se place RiskOS dans le processus.',
    dataFlowText: 'Une transaction suspecte passe par les règles automatiques. Si elle est signalée, l\'alerte entre dans une file. L\'IA l\'analyse. L\'analyste examine et tranche.',
    triageTitle: 'Trier sous contrainte de temps',
    triageText: 'L\'analyste ouvre sa session. Cinq cas l\'attendent, classés par niveau de risque. Il peut filtrer par priorité et suivre sa progression grâce à un compteur en direct.',
    triageCaption: 'Vue de triage',
    triageFrustration: 'Sans tri, l\'analyste parcourt toute la liste à la main pour trouver les cas urgents.',
    triageBenefit: 'Priorités colorées et compteur en direct. Le tri prend quelques secondes.',
    aiTitle: 'Rendre le raisonnement de l\'IA lisible',
    aiP1: 'L\'IA rédige son analyse en temps réel, mot par mot. Les éléments pertinents sont mis en évidence au fur et à mesure. Les sources de données utilisées s\'allument progressivement, et un score de confiance indique le niveau de certitude.',
    aiP2: 'Les boutons d\'action restent masqués jusqu\'à la fin de l\'analyse. L\'analyste lit l\'intégralité du raisonnement avant de pouvoir décider.',
    aiCaption: 'Analyse IA, en direct',
    aiFrustration: 'D\'habitude, l\'analyste reçoit un chiffre de risque sans explication.',
    aiBenefit: 'Ici l\'IA écrit ce qu\'elle a trouvé, étape par étape. L\'analyste lit le raisonnement, puis il décide.',
    decisionTitle: 'Agir sur un cas',
    decisionP1: 'L\'analyste choisit une action\u00a0: bloquer la carte, transmettre le cas à un senior ou le garder sous surveillance. Un écran de confirmation récapitule ce qui s\'est passé. Puis apparaissent deux éléments qui restent habituellement invisibles\u00a0: le message Slack à l\'équipe fraude et le SMS au client.',
    decisionCaption: 'Confirmation et suite',
    decisionFrustration: 'D\'habitude, l\'analyste agit et ne voit jamais le résultat.',
    decisionBenefit: 'Chaque action laisse une trace visible\u00a0: le message Slack, le SMS au client, le ticket.',
    falsePositiveTitle: 'Résoudre une fausse alerte en huit secondes',
    falsePositiveText: 'Une alerte de risque moyen arrive\u00a0: score de 45, paiement de 450 euros. L\'IA passe l\'historique des transactions en revue et ne trouve rien d\'anormal. L\'analyste confirme d\'un clic.',
    falsePositiveCaption: 'Fausse alerte, résolue',
    queueTitle: 'Traiter une file complète',
    queueText: 'L\'analyste traite cinq cas en séquence. Après chaque résolution, le cas suivant se charge automatiquement. À la fin\u00a0: cinq cas résolus, 92 secondes au total.',
    queueCaption: 'Enchaînement des cas et bilan de session',
    learningsTitle: 'Observations',
    learningsIntro: 'Deux enseignements de ce projet qui s\'appliquent bien au-delà de la détection de fraude.',
    learning1Title: 'Écrire le raisonnement en direct construit la confiance, ce qu\'un score ne fait pas.',
    learning1Text: 'Quand l\'IA écrit son analyse mot par mot, l\'analyste suit et se forge sa propre opinion en parallèle. Un score de confiance affiché après coup revient à dire «\u202ffaites-moi confiance\u202f» sans montrer le travail.',
    learning2Title: 'Masquer les boutons tant que l\'analyse est en cours change la lecture.',
    learning2Text: 'Les boutons de décision n\'apparaissent qu\'une fois l\'analyse terminée. Sous contrainte de temps, les gens cliquent sur la première option disponible. Cette contrainte laisse au raisonnement le temps d\'être reçu.',
    learningsOutro: 'Je retrouve ces dynamiques dans d\'autres contextes\u00a0: conformité, triage médical, modération de contenu, gestion d\'incidents.',
    techTitle: 'Périmètre technique',
    techText: 'Prototype fonctionnel. React 18, Vite, Tailwind CSS. Déployé sur Vercel.',
    viewPrototype: 'Voir le prototype',
    viewGitHub: 'GitHub',
  },
};

const VIDEO_BASE = '/videos/riskos';
const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';

// Clips kept out of the narration (their copy stays in CONTENT): 07-data-flow, a process diagram.
// The narration shows the six clips of the prototype in use (dark UI with colour accents).
const HERO_IMAGE = '/images/riskos/02-case-detail.webp';
const CLIP_BEFORE_AFTER = `${VIDEO_BASE}/06-before-after.mp4`;
const CLIP_TRIAGE = `${VIDEO_BASE}/01-hero-triage.mp4`;
const CLIP_FALSE_POSITIVE = `${VIDEO_BASE}/05-false-positive.mp4`;
const CLIP_AI = `${VIDEO_BASE}/02-ai-insight.mp4`;
const CLIP_DECISION = `${VIDEO_BASE}/03-decision-ellipses.mp4`;
const CLIP_QUEUE = `${VIDEO_BASE}/04-queue-cleared.mp4`;

interface VideoFigureProps {
  src: string;
  /** Accessible name of the zoomable frame, also the one-line caption */
  name: string;
  onZoom: () => void;
}

function VideoFigure({ src, name, onZoom }: VideoFigureProps) {
  const reveal = useReveal();
  return (
    <motion.figure {...reveal()}>
        <div
          {...zoomable(onZoom)}
          aria-label={name}
          className={`group rounded-2xl overflow-hidden border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 cursor-zoom-in shadow-sm [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-300 ${EASE}`}
        >
          <VideoPlayer src={src} className={`w-full h-auto block transition-transform duration-300 ${EASE} [@media(hover:hover)]:group-hover:scale-[1.02]`} />
        </div>
        <figcaption className="mt-3 text-xs text-gray-500">{name}</figcaption>
    </motion.figure>
  );
}

/** One block: an h3, one short paragraph in the reading column, then at most one visual */
function Block({ id, title, text, children }: { id?: string; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28 mb-12 md:mb-16 last:mb-0">
      <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
      <p className="max-w-[62ch] text-base text-gray-600">{text}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

/** Act opening: hairline, number, title and an optional lead of 55 words at most */
function ActOpen({ index, title, lead, leadId }: { index: string; title: string; lead?: string; leadId?: string }) {
  return (
    <div className={lead ? 'mb-10 md:mb-14' : 'mb-5 md:mb-9'}>
      <ActTitle index={index} title={title} />
      {lead && (
        <p id={leadId} className="max-w-[62ch] text-base text-gray-600 scroll-mt-28">{lead}</p>
      )}
    </div>
  );
}

function buildLightboxItems(lang: 'en' | 'fr'): LightboxImage[] {
  const t = CONTENT[lang];
  return [
    { src: HERO_IMAGE, caption: 'RiskOS', type: 'image' },
    { src: CLIP_BEFORE_AFTER, caption: t.beforeAfterCaption, type: 'video' },
    { src: CLIP_TRIAGE, caption: t.triageCaption, type: 'video' },
    { src: CLIP_AI, caption: t.aiCaption, type: 'video' },
    { src: CLIP_DECISION, caption: t.decisionCaption, type: 'video' },
    { src: CLIP_FALSE_POSITIVE, caption: t.falsePositiveCaption, type: 'video' },
    { src: CLIP_QUEUE, caption: t.queueCaption, type: 'video' },
  ];
}

const RiskOSPage: React.FC<RiskOSPageProps> = ({ lang: propLang }) => {
  const lang = propLang ?? 'en';
  const fr = lang === 'fr';
  const t = CONTENT[lang];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const lightboxItems = buildLightboxItems(lang);

  const openLightbox = (src: string, currentTime = 0) => {
    const index = lightboxItems.findIndex((item) => item.src === src);
    if (index === -1) return;
    setVideoTime(currentTime);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#FDFDFC] min-h-screen">
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

      {/* Hero: the intro is the executive summary. The prototype is external, and there is no gallery view. */}
      <CaseStudyHero
        lang={lang}
        projectId="riskos"
        title={t.subtitle}
        intro={t.heroIntro}
        meta={[
          { label: fr ? 'Rôle' : 'Role', value: t.heroRole },
          { label: fr ? 'Périmètre' : 'Scope', value: t.category },
          { label: 'Format', value: t.heroFormat },
        ]}
        visualAlt={t.subtitle}
        externalHref="https://riskos.vercel.app"
        externalLabel={t.viewPrototype}
        hideGallery
        onZoom={() => openLightbox(HERO_IMAGE)}
      />

      {/* Summary: context, role and deliverables. No measured outcome exists, so no number strip. */}
      <CaseStudySummary
        lang={lang}
        context={t.summaryContext}
        role={t.summaryRole}
        deliverables={t.summaryDeliverables}
      />

      {/* ================================================================ */}
      {/* 01 CONTEXT: why engagement is the design problem */}
      {/* ================================================================ */}
      <section id="context">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="01" title={t.actContext} lead={t.whyP1} leadId="why" />

          <Block id="insight" title={t.insightTitle} text={t.insightP1}>
            <VideoFigure src={CLIP_BEFORE_AFTER} name={t.beforeAfterCaption} onZoom={() => openLightbox(CLIP_BEFORE_AFTER)} />
          </Block>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 02 APPROACH: three principles, three decisions */}
      {/* ================================================================ */}
      <section id="approach">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="02" title={t.actApproach} lead={t.designQuestionP1} leadId="design-question" />

          <Block id="triage" title={t.triageTitle} text={t.triageText}>
            <VideoFigure src={CLIP_TRIAGE} name={t.triageCaption} onZoom={() => openLightbox(CLIP_TRIAGE)} />
          </Block>

          <Block id="ai-analysis" title={t.aiTitle} text={t.aiP1}>
            <VideoFigure src={CLIP_AI} name={t.aiCaption} onZoom={() => openLightbox(CLIP_AI)} />
          </Block>

          <Block id="decision" title={t.decisionTitle} text={t.decisionP1}>
            <VideoFigure src={CLIP_DECISION} name={t.decisionCaption} onZoom={() => openLightbox(CLIP_DECISION)} />
          </Block>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 03 PRODUCT: the prototype in use */}
      {/* ================================================================ */}
      <section id="product">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="03" title={t.actProduct} />

          <Block id="false-positive" title={t.falsePositiveTitle} text={t.falsePositiveText}>
            <VideoFigure src={CLIP_FALSE_POSITIVE} name={t.falsePositiveCaption} onZoom={() => openLightbox(CLIP_FALSE_POSITIVE)} />
          </Block>

          <Block id="queue" title={t.queueTitle} text={t.queueText}>
            <VideoFigure src={CLIP_QUEUE} name={t.queueCaption} onZoom={() => openLightbox(CLIP_QUEUE)} />
          </Block>

          {/* The prototype itself is in the hero; the source is here */}
          <div className="mt-12">
            <a
              href="https://github.com/marcus-clay/riskos-fraud-detection"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 min-h-11 text-sm font-medium text-gray-900 [@media(hover:hover)]:hover:text-gray-500 active:scale-[0.97] transition-[color,transform] duration-150 ${EASE}`}
            >
              {t.viewGitHub}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 04 LEARNINGS */}
      {/* ================================================================ */}
      <section id="learnings">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActOpen index="04" title={t.learningsTitle} />

          <Block title={t.learning1Title} text={t.learning1Text} />
          <Block title={t.learning2Title} text={t.learning2Text} />
        </div>
      </section>
    </div>
  );
};

export default RiskOSPage;
