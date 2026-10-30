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
    title: 'The AI prepares, the analyst decides',
    category: 'Agentic UX experiment',
    author: 'Victor Soussan · Product Design',
    heroIntro: 'RiskOS is a working fraud-detection prototype. It tests whether an AI can prepare alerts while the analyst keeps the decision, with reasoning written out in full and a visible trace for every action.',
    heroRole: 'Product design',
    heroFormat: 'Working prototype',
    summaryContext: 'When an AI takes part in a decision, how do you keep the person deciding actively engaged? I chose fraud detection in European banking to explore the question: analysts work under time pressure, most of their alerts turn out to be false alarms, and the final decision is always theirs.',
    summaryRole: 'A personal exploration. I designed the interaction model and built the working prototype: React 18, Vite and Tailwind CSS, deployed on Vercel.',
    summaryDeliverables: [
      { title: 'Triage view', detail: 'Five cases sorted by risk level, with priority filters and a live counter.' },
      { title: 'Streaming AI analysis', detail: 'The AI writes its reasoning word by word, with highlighted details, sources and a confidence score.' },
      { title: 'Decision flow', detail: 'Block the card, escalate or monitor, with the Slack message and the customer SMS made visible.' },
      { title: 'False-alarm resolution', detail: 'A medium-risk alert reviewed by the AI and confirmed with one click.' },
      { title: 'Queue processing', detail: 'Five cases resolved in sequence, with a session recap.' },
    ],
    actContext: 'An AI that helps without disengaging the analyst',
    actApproach: 'Three design decisions',
    actProduct: 'The prototype in use',
    actLearn: 'What the project shows',
    challengeTitle: 'The challenge',
    challenge: 'If the AI does too much, the analyst disengages. If it does not explain itself, trust erodes. In many teams the daily tool is still a spreadsheet and fixed rules, with no context, no sorting by relevance and no memory of earlier cases. The prototype starts from a working hypothesis, not from client data: an analyst handles dozens of alerts per shift, and every minute spent on a false alarm is a minute not available for a real case.',
    beforeAfterCaption: 'Compare a raw CSV in a terminal with the RiskOS case view',
    goalsTitle: 'The objectives',
    goals: [
      'The prototype tests whether the AI can handle the preparation work while the analyst keeps full ownership of the decision. Three principles guided the design. The AI sets up the context and the analyst decides. The reasoning is written out in full, so the analyst can read it. When the analyst acts, the effect is visible outside the tool as well.',
      'In the process, a suspicious transaction first meets the bank’s automated rules. If it is flagged, the alert enters a queue, the AI analyzes it, and the analyst reviews and decides.',
    ],
    dataFlowCaption: 'Follow a transaction from the rule engine to the analyst’s decision',
    triageTitle: 'Triage under time pressure',
    triageText: 'The analyst opens a session and finds five cases sorted by risk level, with color-coded priorities, a filter and a live counter. Without sorting, the analyst scrolls the whole list to find the urgent cases. Here, sorting takes a few seconds.',
    triageCaption: 'Open the highest-risk case from the sorted inbox',
    filterCaption: 'Filter the inbox by risk level, then search for a case',
    aiTitle: 'Writing the AI reasoning in real time',
    aiText: 'The AI writes its analysis word by word. Relevant details are highlighted as they appear, the data sources light up progressively and a confidence score shows the level of certainty. The action buttons stay hidden until the analysis is complete, so the analyst reads the full reasoning before being able to decide.',
    aiCaption: 'Read the AI analysis as it is written, word by word',
    contextCaption: 'Ask the AI for more context before choosing an action',
    decisionTitle: 'Making the effect of each action visible',
    decisionText: 'The analyst picks an action: block the card, pass the case to a senior or keep it under watch. A confirmation screen recaps what happened. Then two things appear that usually stay invisible: the Slack message to the fraud team and the SMS to the customer. Usually the analyst acts and never sees the result.',
    decisionCaption: 'Block a card and see the Slack message and the customer SMS',
    falsePositiveTitle: 'Resolving a false alarm in eight seconds',
    falsePositiveText: 'A medium-risk alert arrives: score 45, a 450 euro payment. The AI reviews the transaction history and finds nothing unusual. The analyst confirms with one click.',
    falsePositiveCaption: 'Confirm a medium-risk alert as safe with one click',
    queueTitle: 'Processing a full queue',
    queueText: 'The analyst works through five cases in sequence. After each resolution, the next case loads automatically. At the end: five cases resolved, 92 seconds total.',
    queueCaption: 'Finish the queue and read the session recap',
    liveCaption: 'Open a case, block the card, then move on to the next one',
    learning1Title: 'Streaming the reasoning builds trust in a way scores cannot.',
    learning1Text: 'When the AI writes its analysis word by word, the analyst reads along and forms their own view at the same time. A confidence score after the fact just says “trust me” without showing the work.',
    learning2Title: 'Hiding the buttons until the analysis is done changes how people read.',
    learning2Text: 'Under pressure, people click the first thing available. Holding the decision buttons back until the AI finishes writing gives the reasoning a chance to land.',
    openTitle: 'What remains to be checked',
    openText: 'The prototype runs on five fictional cases and produces no measurement: its effect on the decisions of real analysts remains to be verified. The same dynamics exist in compliance, medical triage, content moderation and incident response.',
    viewPrototype: 'View prototype',
    viewGitHub: 'GitHub',
  },
  fr: {
    title: 'L’IA prépare, l’analyste décide',
    category: 'Expérimentation UX agentique',
    author: 'Victor Soussan · Product Design',
    heroIntro: 'RiskOS est un prototype fonctionnel de détection de fraude. Il teste si une IA peut préparer les alertes pendant que l’analyste garde la décision, avec un raisonnement écrit en toutes lettres et une trace visible pour chaque action.',
    heroRole: 'Product design',
    heroFormat: 'Prototype fonctionnel',
    summaryContext: 'Quand une IA participe à une décision, comment garder engagée la personne qui décide ? J’ai choisi la détection de fraude dans la banque européenne pour explorer cette question : les analystes travaillent sous contrainte de temps, la majorité de leurs alertes se révèlent être de fausses alarmes et la décision finale leur revient toujours.',
    summaryRole: 'Une exploration personnelle. J’ai conçu le modèle d’interaction et construit le prototype fonctionnel : React 18, Vite et Tailwind CSS, déployé sur Vercel.',
    summaryDeliverables: [
      { title: 'Vue de triage', detail: 'Cinq cas classés par niveau de risque, avec filtres de priorité et compteur en direct.' },
      { title: 'Analyse IA en direct', detail: 'L’IA écrit son raisonnement mot par mot, avec détails mis en évidence, sources et score de confiance.' },
      { title: 'Parcours de décision', detail: 'Bloquer la carte, transmettre ou surveiller, avec le message Slack et le SMS au client rendus visibles.' },
      { title: 'Résolution d’une fausse alerte', detail: 'Une alerte de risque moyen passée en revue par l’IA et confirmée d’un clic.' },
      { title: 'Traitement d’une file', detail: 'Cinq cas résolus en séquence, avec un bilan de session.' },
    ],
    actContext: 'Une IA qui aide sans désengager l’analyste',
    actApproach: 'Trois décisions de conception',
    actProduct: 'Le prototype en usage',
    actLearn: 'Ce que le projet enseigne',
    challengeTitle: 'L’enjeu',
    challenge: 'Si l’IA en fait trop, l’analyste se désengage. Si elle n’explique pas son raisonnement, la confiance s’effrite. Dans beaucoup d’équipes, l’outil du quotidien reste un tableur et des règles fixes, sans contexte, sans tri par pertinence et sans mémoire des cas précédents. Le prototype part d’une hypothèse de travail, sans donnée client : un analyste traite des dizaines d’alertes par vacation, et chaque minute passée sur une fausse alarme manque à un cas réel.',
    beforeAfterCaption: 'Comparer un CSV brut dans un terminal avec la vue de cas RiskOS',
    goalsTitle: 'Les objectifs',
    goals: [
      'Le prototype teste si l’IA peut prendre en charge la préparation tout en laissant à l’analyste la pleine maîtrise de la décision. Trois principes ont guidé la conception. L’IA pose le contexte et l’analyste décide. Le raisonnement est écrit en toutes lettres, pour que l’analyste puisse le lire. Quand l’analyste agit, l’effet est visible aussi en dehors de l’outil.',
      'Dans le processus, une transaction suspecte passe d’abord par les règles automatiques de la banque. Si elle est signalée, l’alerte entre dans une file, l’IA l’analyse, puis l’analyste examine et tranche.',
    ],
    dataFlowCaption: 'Suivre une transaction, du moteur de règles à la décision de l’analyste',
    triageTitle: 'Trier sous contrainte de temps',
    triageText: 'L’analyste ouvre sa session et trouve cinq cas classés par niveau de risque, avec des priorités colorées, un filtre et un compteur en direct. Sans tri, il parcourt toute la liste pour repérer les cas urgents. Ici, le tri prend quelques secondes.',
    triageCaption: 'Ouvrir le cas le plus risqué depuis la liste triée',
    filterCaption: 'Filtrer la liste par niveau de risque, puis chercher un cas',
    aiTitle: 'Écrire le raisonnement de l’IA en direct',
    aiText: 'L’IA rédige son analyse mot par mot. Les éléments pertinents sont mis en évidence au fur et à mesure, les sources de données s’allument progressivement et un score de confiance indique le niveau de certitude. Les boutons d’action restent masqués jusqu’à la fin de l’analyse, pour que l’analyste lise l’intégralité du raisonnement avant de pouvoir décider.',
    aiCaption: 'Lire l’analyse de l’IA au fil de son écriture, mot par mot',
    contextCaption: 'Demander plus de contexte à l’IA avant de choisir une action',
    decisionTitle: 'Rendre visible l’effet de chaque action',
    decisionText: 'L’analyste choisit une action : bloquer la carte, transmettre le cas à un senior ou le garder sous surveillance. Un écran de confirmation récapitule ce qui s’est passé. Puis apparaissent deux éléments qui restent habituellement invisibles : le message Slack à l’équipe fraude et le SMS au client. D’habitude, l’analyste agit sans jamais voir le résultat.',
    decisionCaption: 'Bloquer une carte et voir le message Slack et le SMS client',
    falsePositiveTitle: 'Résoudre une fausse alerte en huit secondes',
    falsePositiveText: 'Une alerte de risque moyen arrive : score de 45, paiement de 450 euros. L’IA passe l’historique des transactions en revue et ne trouve rien d’anormal. L’analyste confirme d’un clic.',
    falsePositiveCaption: 'Confirmer une alerte à risque moyen comme sûre en un clic',
    queueTitle: 'Traiter une file complète',
    queueText: 'L’analyste traite cinq cas en séquence. Après chaque résolution, le cas suivant se charge automatiquement. À la fin : cinq cas résolus, 92 secondes au total.',
    queueCaption: 'Terminer la file et lire le bilan de session',
    liveCaption: 'Ouvrir un cas, bloquer la carte, puis passer au cas suivant',
    learning1Title: 'Écrire le raisonnement en direct construit la confiance, ce qu’un score ne fait pas.',
    learning1Text: 'Quand l’IA écrit son analyse mot par mot, l’analyste suit et se forge sa propre opinion en parallèle. Un score de confiance affiché après coup revient à dire « faites-moi confiance » sans montrer le travail.',
    learning2Title: 'Masquer les boutons tant que l’analyse est en cours change la lecture.',
    learning2Text: 'Sous contrainte de temps, les gens cliquent sur la première option disponible. Retenir les boutons de décision jusqu’à la fin de l’écriture laisse au raisonnement le temps d’être reçu.',
    openTitle: 'Ce qui reste à vérifier',
    openText: 'Le prototype fonctionne sur cinq cas fictifs et ne produit aucune mesure : son effet sur les décisions d’analystes réels reste à vérifier. Les mêmes dynamiques existent en conformité, en triage médical, en modération de contenu et en gestion d’incidents.',
    viewPrototype: 'Voir le prototype',
    viewGitHub: 'GitHub',
  },
};

const VIDEO_BASE = '/videos/riskos';
const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';

// The clips were recorded on a 1920x1080 black canvas where the interface takes a fraction of the
// frame. The "-fit" files are the same recordings cropped to the interface (the originals stay in
// the folder), so every clip fills the width of the column instead of floating in the middle.
const HERO_IMAGE = '/images/riskos/02-case-detail.webp';
const CLIP_BEFORE_AFTER = `${VIDEO_BASE}/06-before-after-fit.mp4`;
const CLIP_DATA_FLOW = `${VIDEO_BASE}/07-data-flow-fit.mp4`;
const CLIP_TRIAGE = `${VIDEO_BASE}/01-hero-triage-fit.mp4`;
const CLIP_FALSE_POSITIVE = `${VIDEO_BASE}/05-false-positive-fit.mp4`;
const CLIP_AI = `${VIDEO_BASE}/02-ai-insight-fit.mp4`;
const CLIP_DECISION = `${VIDEO_BASE}/03-decision-ellipses-fit.mp4`;
const CLIP_QUEUE = `${VIDEO_BASE}/04-queue-cleared-fit.mp4`;
// Recorded on the live prototype (riskos.vercel.app), fictional cases only
const CLIP_LIVE = `${VIDEO_BASE}/00-live-prototype-fit.mp4`;
const CLIP_FILTER = `${VIDEO_BASE}/08-inbox-filter.mp4`;
const CLIP_CONTEXT = `${VIDEO_BASE}/09-ask-context.mp4`;

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
          className={`group rounded-2xl overflow-hidden border border-gray-100 [@media(hover:hover)]:hover:border-gray-200 cursor-zoom-in shadow-sm [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:scale-[1.01] active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-300 ease-media active:duration-150 active:ease-out`}
        >
          <VideoPlayer src={src} className={`w-full h-auto block transition-transform duration-300 ease-media [@media(hover:hover)]:group-hover:scale-[1.02]`} />
        </div>
        <figcaption className="mt-3 text-xs text-gray-500">{name}</figcaption>
    </motion.figure>
  );
}

/** Several clips of one idea, stacked at the full width of the column */
function Clips({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6 md:space-y-8">{children}</div>;
}

/** One block: an h3, one or two short paragraphs in the reading column, then at most one visual */
function Block({ id, title, text, children }: { id?: string; title: string; text: string | string[]; children?: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28 mb-14 md:mb-16 last:mb-0">
      <h3 className="text-title-3 text-gray-900 mb-3 max-w-[56ch]">{title}</h3>
      <div className="max-w-[62ch] text-base text-gray-600 [&>p+p]:mt-4">
        {(Array.isArray(text) ? text : [text]).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {children && <div className="mt-6 md:mt-8">{children}</div>}
    </div>
  );
}

function buildLightboxItems(lang: 'en' | 'fr'): LightboxImage[] {
  const t = CONTENT[lang];
  return [
    { src: HERO_IMAGE, caption: 'RiskOS', type: 'image' },
    { src: CLIP_BEFORE_AFTER, caption: t.beforeAfterCaption, type: 'video' },
    { src: CLIP_DATA_FLOW, caption: t.dataFlowCaption, type: 'video' },
    { src: CLIP_TRIAGE, caption: t.triageCaption, type: 'video' },
    { src: CLIP_FILTER, caption: t.filterCaption, type: 'video' },
    { src: CLIP_AI, caption: t.aiCaption, type: 'video' },
    { src: CLIP_CONTEXT, caption: t.contextCaption, type: 'video' },
    { src: CLIP_DECISION, caption: t.decisionCaption, type: 'video' },
    { src: CLIP_FALSE_POSITIVE, caption: t.falsePositiveCaption, type: 'video' },
    { src: CLIP_QUEUE, caption: t.queueCaption, type: 'video' },
    { src: CLIP_LIVE, caption: t.liveCaption, type: 'video' },
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
        title={t.title}
        intro={t.heroIntro}
        meta={[
          { label: fr ? 'Rôle' : 'Role', value: t.heroRole },
          { label: fr ? 'Périmètre' : 'Scope', value: t.category },
          { label: 'Format', value: t.heroFormat },
        ]}
        visualAlt={t.title}
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

      {/* 01 Challenge and objectives: why engagement is the design problem */}
      <section id="context">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="01" title={t.actContext} />
          <div className="mt-4 md:mt-6">
            <Block id="challenge" title={t.challengeTitle} text={t.challenge}>
              <VideoFigure src={CLIP_BEFORE_AFTER} name={t.beforeAfterCaption} onZoom={() => openLightbox(CLIP_BEFORE_AFTER)} />
            </Block>
            <Block id="objectives" title={t.goalsTitle} text={t.goals}>
              <VideoFigure src={CLIP_DATA_FLOW} name={t.dataFlowCaption} onZoom={() => openLightbox(CLIP_DATA_FLOW)} />
            </Block>
          </div>
        </div>
      </section>

      {/* 02 Design approach: three decisions, each with its reason and its clip */}
      <section id="approach">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="02" title={t.actApproach} />
          <div className="mt-4 md:mt-6">
            <Block id="triage" title={t.triageTitle} text={t.triageText}>
              <Clips>
                <VideoFigure src={CLIP_TRIAGE} name={t.triageCaption} onZoom={() => openLightbox(CLIP_TRIAGE)} />
                <VideoFigure src={CLIP_FILTER} name={t.filterCaption} onZoom={() => openLightbox(CLIP_FILTER)} />
              </Clips>
            </Block>

            <Block id="ai-analysis" title={t.aiTitle} text={t.aiText}>
              <Clips>
                <VideoFigure src={CLIP_AI} name={t.aiCaption} onZoom={() => openLightbox(CLIP_AI)} />
                <VideoFigure src={CLIP_CONTEXT} name={t.contextCaption} onZoom={() => openLightbox(CLIP_CONTEXT)} />
              </Clips>
            </Block>

            <Block id="decision" title={t.decisionTitle} text={t.decisionText}>
              <VideoFigure src={CLIP_DECISION} name={t.decisionCaption} onZoom={() => openLightbox(CLIP_DECISION)} />
            </Block>
          </div>
        </div>
      </section>

      {/* 03 The prototype in use */}
      <section id="product">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="03" title={t.actProduct} />
          {/* The whole prototype in one pass, before the two cases that are told separately */}
          <div className="mt-4 md:mt-6 mb-14 md:mb-16">
            <VideoFigure src={CLIP_LIVE} name={t.liveCaption} onZoom={() => openLightbox(CLIP_LIVE)} />
          </div>
          <div>
            <Block id="false-positive" title={t.falsePositiveTitle} text={t.falsePositiveText}>
              <VideoFigure src={CLIP_FALSE_POSITIVE} name={t.falsePositiveCaption} onZoom={() => openLightbox(CLIP_FALSE_POSITIVE)} />
            </Block>

            <Block id="queue" title={t.queueTitle} text={t.queueText}>
              <VideoFigure src={CLIP_QUEUE} name={t.queueCaption} onZoom={() => openLightbox(CLIP_QUEUE)} />
            </Block>
          </div>
        </div>
      </section>

      {/* 04 What the project shows, and what stays open */}
      <section id="learnings">
        <ActRule />
        <div className="act-wide pt-10 md:pt-14 pb-12 md:pb-16">
          <ActTitle index="04" title={t.actLearn} />
          <div className="mt-4 md:mt-6">
            <Block title={t.learning1Title} text={t.learning1Text} />
            <Block title={t.learning2Title} text={t.learning2Text} />
            <Block id="open" title={t.openTitle} text={t.openText} />
          </div>

          {/* The prototype itself is in the hero; the source is here */}
          <div className="mt-10">
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
    </div>
  );
};

export default RiskOSPage;
