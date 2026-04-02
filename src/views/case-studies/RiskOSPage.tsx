import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

import EnhancedLightbox, { type LightboxImage } from '../../components/media/EnhancedLightbox';
import VideoPlayer from '@/components/VideoPlayer';

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
    category: 'Agentic UX Experimentation',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'Context',
    whyP1: 'Agentic interfaces raise a question I find genuinely interesting from a product design perspective: when an AI is part of a decision process, how do you keep the person making the call actively engaged? If the AI does too much, the human disengages. If it does too little to explain itself, trust erodes.',
    whyP2: 'Fraud detection in European banking was a natural context to explore this. Analysts work under time pressure, 80% of their alerts turn out to be false alarms, and the final decision is always theirs.',
    whyP3: 'RiskOS is the prototype I built to test ideas around that balance.',
    insightTitle: 'Initial observation',
    insightP1: 'A fraud analyst at a European neobank handles 80 to 150 alerts per shift. Most are harmless. Every minute spent on a false alarm is a minute not available for a real case.',
    insightP2: 'In many teams, the daily tool is still a spreadsheet and a set of fixed rules. No surrounding context, no sorting by relevance, no memory of previous cases.',
    beforeAfterCaption: 'Same data, two readings.',
    beforeAfterText: 'On the left, the alert feed as most institutions receive it: raw spreadsheet. On the right, the same information organized in RiskOS.',
    designQuestionTitle: 'Design approach',
    designQuestionP1: 'The central question was whether the AI could handle the preparation work while the analyst retained full ownership of the decision.',
    designQuestionP2: 'Three principles guided the design:',
    designPrinciples: [
      'The AI sets up context so the analyst can think clearly. It doesn\'t decide.',
      'The reasoning is readable, not hidden behind a number.',
      'When the analyst acts, something happens outside the tool, not just inside it.',
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
    learning1Title: 'Streaming the reasoning builds trust in a way that scores don\'t.',
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
    category: 'Expérimentation UX agentiques',
    author: 'Victor Soussan · Product Design',
    whyTitle: 'Contexte',
    whyP1: 'Les interfaces agentiques posent une question intéressante du point de vue du product design : quand une IA participe à un processus de décision, comment maintenir la personne qui décide dans une posture active ? Si l\'IA fait trop, l\'humain se désengage. Si elle manque de transparence, la confiance s\'effrite.',
    whyP2: 'La détection de fraude dans le secteur bancaire européen offrait un contexte naturel pour explorer cette question. Les analystes travaillent sous contrainte de temps, 80 % de leurs alertes se révèlent être de fausses alarmes, et la décision finale leur revient toujours.',
    whyP3: 'RiskOS est le prototype que j\'ai construit pour tester des idées autour de cet équilibre.',
    insightTitle: 'Observation initiale',
    insightP1: 'Un analyste fraude dans une néobanque européenne traite 80 à 150 alertes par vacation. La plupart sont sans suite.',
    insightP2: 'Dans beaucoup d\'équipes, l\'outil du quotidien reste un tableur et un jeu de règles fixes. Pas de contexte, pas de tri par pertinence, pas de mémoire des cas précédents.',
    beforeAfterCaption: 'Mêmes données, deux lectures.',
    beforeAfterText: 'À gauche, le flux d\'alertes tel que la plupart des établissements le reçoivent. À droite, les mêmes informations organisées dans RiskOS.',
    designQuestionTitle: 'Approche de design',
    designQuestionP1: 'La question centrale : l\'IA peut-elle prendre en charge la préparation tout en laissant à l\'analyste la pleine maîtrise de la décision ?',
    designQuestionP2: 'Trois principes ont guidé le design :',
    designPrinciples: [
      'L\'IA pose le contexte pour que l\'analyste puisse réfléchir clairement. Elle ne décide pas.',
      'Le raisonnement doit être lisible, pas réduit à un chiffre.',
      'Quand l\'analyste agit, le résultat doit être visible au-delà de l\'outil.',
    ],
    dataFlowCaption: 'Où se place RiskOS dans le processus.',
    dataFlowText: 'Une transaction suspecte passe par les règles automatiques. Si signalée, l\'alerte entre dans une file. L\'IA l\'analyse. L\'analyste examine et tranche.',
    triageTitle: 'Trier sous contrainte de temps',
    triageText: 'L\'analyste ouvre sa session. Cinq cas l\'attendent, classés par niveau de risque.',
    triageCaption: 'Vue de triage',
    triageFrustration: 'Sans tri, l\'analyste parcourt toute la liste à la main.',
    triageBenefit: 'Priorités colorées et compteur en direct. Le tri prend quelques secondes.',
    aiTitle: 'Rendre le raisonnement de l\'IA lisible',
    aiP1: 'L\'IA rédige son analyse en temps réel, mot par mot. Les éléments pertinents sont mis en évidence au fur et à mesure.',
    aiP2: 'Les boutons d\'action restent masqués jusqu\'à la fin de l\'analyse. L\'analyste lit l\'intégralité du raisonnement avant de pouvoir décider.',
    aiCaption: 'Analyse IA, en direct',
    aiFrustration: 'D\'habitude, l\'analyste reçoit un chiffre de risque sans explication.',
    aiBenefit: 'Ici l\'IA écrit ce qu\'elle a trouvé, étape par étape. L\'analyste lit le raisonnement, puis il décide.',
    decisionTitle: 'Agir sur un cas',
    decisionP1: 'L\'analyste choisit : bloquer la carte, transmettre à un senior, ou surveiller. Un écran récapitule ce qui s\'est passé. Puis apparaissent le message Slack à l\'équipe fraude, et le SMS au client.',
    decisionCaption: 'Confirmation et suite',
    decisionFrustration: 'D\'habitude, l\'analyste agit et ne voit jamais la suite.',
    decisionBenefit: 'Chaque action laisse une trace visible.',
    falsePositiveTitle: 'Résoudre une fausse alerte en huit secondes',
    falsePositiveText: 'Une alerte de risque moyen arrive. L\'IA passe l\'historique en revue et ne trouve rien d\'anormal. L\'analyste confirme d\'un clic.',
    falsePositiveCaption: 'Fausse alerte, résolue',
    queueTitle: 'Traiter une file complète',
    queueText: 'L\'analyste traite cinq cas en séquence. Après chaque résolution, le cas suivant se charge automatiquement. Cinq cas résolus, 92 secondes au total.',
    queueCaption: 'Enchaînement et bilan de session',
    learningsTitle: 'Observations',
    learningsIntro: 'Deux enseignements qui s\'appliquent au-delà de la détection de fraude.',
    learning1Title: 'Le streaming du raisonnement construit la confiance.',
    learning1Text: 'Quand l\'IA écrit son analyse mot par mot, l\'analyste suit et se forge sa propre opinion en parallèle. Un score de confiance affiché après coup demande la confiance sans montrer le travail.',
    learning2Title: 'Masquer les boutons tant que l\'analyse est en cours change la lecture.',
    learning2Text: 'Les boutons de décision n\'apparaissent qu\'une fois l\'analyse terminée. Sous contrainte de temps, les utilisateurs cliquent sur la première option disponible. Cette contrainte donne au raisonnement le temps d\'être reçu.',
    learningsOutro: 'Je retrouve ces dynamiques dans d\'autres contextes : conformité, triage médical, modération de contenu, gestion d\'incidents.',
    techTitle: 'Périmètre technique',
    techText: 'Prototype fonctionnel. React 18, Vite, Tailwind CSS. Déployé sur Vercel.',
    viewPrototype: 'Voir le prototype',
    viewGitHub: 'GitHub',
  },
};

const VIDEO_BASE = '/videos/riskos';

function VideoCard({
  src, caption, description, frustration, benefit, lang, index, onClick,
}: {
  src: string; caption: string; description?: string; frustration?: string; benefit?: string;
  lang: 'en' | 'fr'; index: number; onClick: (currentTime: number) => void;
}) {
  return (
    <div className="mb-24 md:mb-32">
      <motion.figure
        initial={{ opacity: 0, transform: 'translateY(12px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.35, delay: index * 0.04, ease: EASE_OUT }}
        className="group cursor-zoom-in ring-1 ring-black/[0.04] hover:ring-black/[0.08] rounded-xl overflow-hidden transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
        onClick={() => onClick(0)}
      >
          <VideoPlayer src={src} className="w-full h-auto block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]" />
      </motion.figure>
      <div className="mt-4 max-w-[740px] mx-auto">
        <p className="text-xs font-medium text-gray-400 mb-1">{caption}</p>
        {description && <p className="text-base text-gray-500 leading-relaxed mb-2">{description}</p>}
        {frustration && (
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-medium">{lang === 'fr' ? 'Frustration : ' : 'Frustration: '}</span>
            {frustration}
          </p>
        )}
        {benefit && (
          <p className="text-xs text-gray-500 leading-relaxed mt-1">
            <span className="font-medium">{lang === 'fr' ? 'Bénéfice : ' : 'Benefit: '}</span>
            {benefit}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-gray-500 leading-relaxed mb-3 max-w-[65ch]">{children}</p>;
}

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

const RiskOSPage: React.FC<RiskOSPageProps> = ({ lang: propLang }) => {
  const lang = propLang || 'fr';
  const t = CONTENT[lang];
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div ref={containerRef} className="bg-[#FDFDFC] min-h-screen">
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
      <div className="max-w-[740px] mx-auto px-6 pt-16 md:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(12px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400">{t.category}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-xs text-gray-400">2026</span>
          </div>
          <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-1">
            RiskOS
          </h1>
          <p className="text-base text-gray-500 max-w-[55ch] mb-2">
            {t.subtitle}
          </p>
          <p className="text-xs text-gray-400">{t.author}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-[960px] mx-auto px-6 pb-24 md:pb-40">

        {/* Hero image */}
        <figure className="mb-24 md:mb-32">
          <div
            className="rounded-xl overflow-hidden cursor-zoom-in group ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99]"
            onClick={() => openLightbox(0)}
          >
            <img
              loading="lazy"
              src="/images/riskos/thubmnail_riskos_dark.webp"
              alt="RiskOS"
              className="w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
            />
          </div>
        </figure>

        {/* Text sections use narrower container */}
        <div className="max-w-[740px] mx-auto">

          <section id="why" className="mb-24 md:mb-32 scroll-mt-28">
            <SectionTitle>{t.whyTitle}</SectionTitle>
            <Paragraph>{t.whyP1}</Paragraph>
            <Paragraph>{t.whyP2}</Paragraph>
            <Paragraph>{t.whyP3}</Paragraph>
          </section>

          <section id="insight" className="mb-24 md:mb-32 scroll-mt-28">
            <SectionTitle>{t.insightTitle}</SectionTitle>
            <Paragraph>{t.insightP1}</Paragraph>
            <Paragraph>{t.insightP2}</Paragraph>
          </section>
        </div>

        {/* Video: Before/After (full width) */}
        <VideoCard src={`${VIDEO_BASE}/06-before-after.mp4`} caption={t.beforeAfterCaption} description={t.beforeAfterText} lang={lang} index={1} onClick={(time) => openLightbox(1, time)} />

        <div className="max-w-[740px] mx-auto">
          <section id="design-question" className="mb-24 md:mb-32 scroll-mt-28">
            <SectionTitle>{t.designQuestionTitle}</SectionTitle>
            <Paragraph>{t.designQuestionP1}</Paragraph>
            <Paragraph>{t.designQuestionP2}</Paragraph>
            <ul className="space-y-2 max-w-[65ch] mb-4">
              {t.designPrinciples.map((p, i) => (
                <li key={i} className="flex gap-2 text-base text-gray-500 leading-relaxed">
                  <span className="text-gray-300 mt-1 shrink-0">&#8226;</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <VideoCard src={`${VIDEO_BASE}/07-data-flow.mp4`} caption={t.dataFlowCaption} description={t.dataFlowText} lang={lang} index={2} onClick={(time) => openLightbox(2, time)} />

        <div className="max-w-[740px] mx-auto">
          <section id="triage" className="mb-6 scroll-mt-28">
            <SectionTitle>{t.triageTitle}</SectionTitle>
            <Paragraph>{t.triageText}</Paragraph>
          </section>
        </div>
        <VideoCard src={`${VIDEO_BASE}/01-hero-triage.mp4`} caption={t.triageCaption} frustration={t.triageFrustration} benefit={t.triageBenefit} lang={lang} index={3} onClick={(time) => openLightbox(3, time)} />

        <div className="max-w-[740px] mx-auto">
          <section id="ai-analysis" className="mb-6 scroll-mt-28">
            <SectionTitle>{t.aiTitle}</SectionTitle>
            <Paragraph>{t.aiP1}</Paragraph>
            <Paragraph>{t.aiP2}</Paragraph>
          </section>
        </div>
        <VideoCard src={`${VIDEO_BASE}/02-ai-insight.mp4`} caption={t.aiCaption} frustration={t.aiFrustration} benefit={t.aiBenefit} lang={lang} index={4} onClick={(time) => openLightbox(4, time)} />

        <div className="max-w-[740px] mx-auto">
          <section id="decision" className="mb-6 scroll-mt-28">
            <SectionTitle>{t.decisionTitle}</SectionTitle>
            <Paragraph>{t.decisionP1}</Paragraph>
          </section>
        </div>
        <VideoCard src={`${VIDEO_BASE}/03-decision-ellipses.mp4`} caption={t.decisionCaption} frustration={t.decisionFrustration} benefit={t.decisionBenefit} lang={lang} index={5} onClick={(time) => openLightbox(5, time)} />

        <div className="max-w-[740px] mx-auto">
          <section id="false-positive" className="mb-6 scroll-mt-28">
            <SectionTitle>{t.falsePositiveTitle}</SectionTitle>
            <Paragraph>{t.falsePositiveText}</Paragraph>
          </section>
        </div>
        <VideoCard src={`${VIDEO_BASE}/05-false-positive.mp4`} caption={t.falsePositiveCaption} lang={lang} index={6} onClick={(time) => openLightbox(6, time)} />

        <div className="max-w-[740px] mx-auto">
          <section id="queue" className="mb-6 scroll-mt-28">
            <SectionTitle>{t.queueTitle}</SectionTitle>
            <Paragraph>{t.queueText}</Paragraph>
          </section>
        </div>
        <VideoCard src={`${VIDEO_BASE}/04-queue-cleared.mp4`} caption={t.queueCaption} lang={lang} index={7} onClick={(time) => openLightbox(7, time)} />

        {/* Learnings */}
        <div className="max-w-[740px] mx-auto">
          <section id="learnings" className="mb-24 md:mb-32 scroll-mt-28">
            <SectionTitle>{t.learningsTitle}</SectionTitle>
            <Paragraph>{t.learningsIntro}</Paragraph>

            <div className="divide-y divide-gray-100 mt-6 max-w-[65ch]">
              {[
                { title: t.learning1Title, text: t.learning1Text },
                { title: t.learning2Title, text: t.learning2Text },
              ].map((learning, i) => (
                <div key={i} className="py-5">
                  <p className="text-sm font-medium text-gray-900 mb-1.5">{learning.title}</p>
                  <p className="text-base text-gray-500 leading-relaxed">{learning.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Paragraph>{t.learningsOutro}</Paragraph>
            </div>
          </section>

          {/* Tech + links */}
          <section className="mb-16">
            <SectionTitle>{t.techTitle}</SectionTitle>
            <Paragraph>{t.techText}</Paragraph>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-150 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500 inline-flex items-center gap-1"
              >
                {t.viewPrototype} <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/marcus-clay/riskos-fraud-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 inline-flex items-center gap-1"
              >
                {t.viewGitHub} <ArrowUpRight size={14} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RiskOSPage;
