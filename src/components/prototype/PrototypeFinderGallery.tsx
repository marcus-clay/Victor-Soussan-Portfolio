import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, Users, Play, Pause, ArrowCounterClockwise as RotateCcw, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  GALLERY_CATEGORIES,
  PROTOTYPE_MAP,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  PROTOTYPE_DETAILS,
  PrototypeCategory,
  PrototypeItem,
} from '../../data/sqoolPrototypesData';
import { useIframeLifecycle } from '../../hooks/useIframeLifecycle';

// Benefit-focused captions
const BENEFIT_CAPTIONS: Record<string, { en: string; fr: string }> = {
  T1: { en: 'Students join in seconds, no setup needed', fr: 'Les élèves rejoignent en quelques secondes, sans configuration' },
  T2: { en: 'The teacher decides what students can do', fr: 'L\'enseignant décide ce que les élèves peuvent faire' },
  T3: { en: 'See who is working and who has drifted', fr: 'Voir qui travaille et qui a décroché' },
  T4: { en: 'Answer questions without interrupting the lesson', fr: 'Répondre aux questions sans interrompre le cours' },
  T5: { en: 'Instant silence, one tap', fr: 'Le silence instantané, en un tap' },
  T6: { en: 'Every student receives the file at the same time', fr: 'Chaque élève reçoit le fichier au même moment' },
  T7: { en: 'Show your screen to the whole class at once', fr: 'Montrer son écran à toute la classe d\'un geste' },
  T8: { en: 'Help a student without leaving your desk', fr: 'Aider un élève sans quitter son bureau' },
  T9: { en: 'Differentiate instruction with flexible grouping', fr: 'Différencier l\'enseignement avec des groupes flexibles' },
  T10: { en: 'Gauge comprehension in real time', fr: 'Mesurer la compréhension en temps réel' },
  T11: { en: 'A private channel that keeps the class calm', fr: 'Un canal privé qui préserve le calme de la classe' },
  T12: { en: 'Celebrate student work in front of everyone', fr: 'Valoriser le travail d\'un élève devant toute la classe' },
  T13: { en: 'Comment and annotate live, together', fr: 'Commenter et annoter en direct, ensemble' },
  T14: { en: 'Paper to digital in one gesture', fr: 'Du papier au numérique en un geste' },
  T15: { en: 'A clear summary to close the lesson', fr: 'Un récapitulatif clair pour clore la séance' },
  T16: { en: 'Every browser opens the same page instantly', fr: 'Chaque navigateur ouvre la même page instantanément' },
  T17: { en: 'Students see how much time they have left', fr: 'Les élèves voient le temps qu\'il leur reste' },
  T18: { en: 'Fair teams, generated in one tap', fr: 'Des équipes équilibrées, générées en un tap' },
  T19: { en: 'Everything from past lessons, always accessible', fr: 'Tout ce qui a été fait, toujours accessible' },
  T20: { en: 'Ready to teach in under 30 seconds', fr: 'Prêt à enseigner en moins de 30 secondes' },
  T21: { en: 'A controlled environment for focused work', fr: 'Un environnement contrôlé pour un travail concentré' },
  T22: { en: 'Full exam setup from a single screen', fr: 'Configuration complète de l\'examen depuis un seul écran' },
  T23: { en: 'Monitor 32 students without stress', fr: 'Surveiller 32 élèves sans stress' },
  T24: { en: 'All copies collected, none lost', fr: 'Toutes les copies collectées, aucune perdue' },
  T25: { en: 'A classroom walkthrough without leaving your seat', fr: 'Un tour de classe sans quitter son siège' },
  S1: { en: 'Join class instantly, no password needed', fr: 'Rejoindre la classe instantanément, sans mot de passe' },
  S2: { en: 'All lesson materials in one place', fr: 'Toutes les ressources du cours au même endroit' },
  S3: { en: 'Signal completion without disrupting the class', fr: 'Signaler qu\'on a fini sans perturber la classe' },
  S4: { en: 'Ask for help without raising your hand', fr: 'Demander de l\'aide sans lever la main' },
  S5: { en: 'Submit work with timestamped confirmation', fr: 'Rendre son travail avec confirmation horodatée' },
  S6: { en: 'Receive documents instantly on your tablet', fr: 'Recevoir les documents instantanément sur sa tablette' },
  S7: { en: 'A calm screen that explains what is happening', fr: 'Un écran sobre qui explique ce qui se passe' },
  SC1: { en: 'From opening to first activity in under a minute', fr: 'De l\'ouverture à la première activité en moins d\'une minute' },
  SC2: { en: 'Spot difficulties and act before they escalate', fr: 'Repérer les difficultés et agir avant qu\'elles ne s\'aggravent' },
  SC3: { en: 'Each student gets the right level of challenge', fr: 'Chaque élève reçoit le bon niveau de défi' },
  SC4: { en: 'Know where the class stands, mid-lesson', fr: 'Savoir où en est la classe, en plein cours' },
  SC5: { en: 'Teamwork with clear structure and submission', fr: 'Travail d\'équipe avec structure claire et rendu' },
  SC6: { en: 'Bridge paper and digital without friction', fr: 'Relier papier et numérique sans friction' },
  SC7: { en: 'A complete exam, supervised from start to finish', fr: 'Un examen complet, supervisé du début à la fin' },
  SC8: { en: 'Structured evaluation with minimal overhead', fr: 'Évaluation structurée avec un minimum de logistique' },
  SC9: { en: 'Turn a student screen into a teaching moment', fr: 'Transformer l\'écran d\'un élève en moment pédagogique' },
  SC10: { en: 'A full lesson, step by step, as it happens in class', fr: 'Un cours entier, étape par étape, tel qu\'il se vit en classe' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORY_ICONS: Record<PrototypeCategory, React.FC<any>> = {
  teacher: Monitor,
  student: Users,
  scenario: Play,
};

// Animation constants
const SPRING = { type: 'spring' as const, duration: 0.35, bounce: 0 };

// ── Prototype List (stagger + sliding selection indicator) ──────────

interface PrototypeListProps {
  protos: PrototypeItem[];
  selectedId: string;
  activeCategory: PrototypeCategory;
  isDark: boolean;
  lang: 'en' | 'fr';
  onSelect: (id: string) => void;
  instanceId: string;
}

const PrototypeList: React.FC<PrototypeListProps> = ({
  protos, selectedId, activeCategory, isDark, lang, onSelect,
}) => {
  const prefersReduced = useReducedMotion();
  const [tooltip, setTooltip] = useState<{ id: string; x: number; y: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Once a tooltip has been shown, subsequent hovers are instant (Emil pattern)
  const quickRef = useRef(false);

  // Reset quick-mode and dismiss tooltip when category changes
  useEffect(() => {
    quickRef.current = false;
    setTooltip(null);
  }, [activeCategory]);

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const showTip = useCallback((e: React.MouseEvent<HTMLButtonElement>, protoId: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    const delay = quickRef.current ? 0 : 400;
    timerRef.current = setTimeout(() => {
      setTooltip({ id: protoId, x: rect.right + 10, y: rect.top + rect.height / 2 });
      quickRef.current = true;
    }, delay);
  }, []);

  const hideTip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTooltip(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentIdx = protos.findIndex(p => p.id === selectedId);
    if (e.key === 'ArrowDown' && currentIdx < protos.length - 1) {
      e.preventDefault();
      onSelect(protos[currentIdx + 1].id);
    } else if (e.key === 'ArrowUp' && currentIdx > 0) {
      e.preventDefault();
      onSelect(protos[currentIdx - 1].id);
    }
  }, [protos, selectedId, onSelect]);

  const tooltipCaption = tooltip
    ? (BENEFIT_CAPTIONS[tooltip.id]?.[lang] || PROTOTYPE_MAP.get(tooltip.id)?.desc[lang] || '')
    : '';

  // Portal tooltip — fixed position escapes overflow:hidden on Finder container.
  // Wrap in a plain div to own `transform: translateY(-50%)` for vertical centering;
  // the motion.div handles only opacity + scale so they don't conflict.
  const tooltipEl = tooltip && tooltipCaption && typeof document !== 'undefined'
    ? createPortal(
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateY(-50%)',
            transformOrigin: 'left center',
            zIndex: 200,
            maxWidth: 216,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            key={tooltip.id}
            role="tooltip"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.15, bounce: 0 }}
            style={{ transformOrigin: 'left center' }}
            className={`px-3 py-2 rounded-xl text-xs leading-relaxed shadow-lg ${
              isDark
                ? 'bg-[#2A2A2C] border border-white/10 text-gray-200 shadow-black/40'
                : 'bg-white border border-gray-100 text-gray-600'
            }`}
          >
            {tooltipCaption}
          </motion.div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        className="py-1.5 px-1.5"
        onKeyDown={handleKeyDown}
      >
        {protos.map(proto => {
          const isSelected = proto.id === selectedId;
          return (
            <motion.button
              key={proto.id}
              onClick={() => onSelect(proto.id)}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={(e) => showTip(e, proto.id)}
              onMouseLeave={hideTip}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              tabIndex={0}
              className={`flex items-center gap-2 w-full text-left px-3 py-[7px] rounded-lg transition-colors ${
                isSelected
                  ? 'bg-[#2D5CF3] text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-white/5'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold flex-shrink-0 w-7 ${
                isSelected ? 'text-white/70' : (isDark ? 'text-gray-500' : 'text-gray-400')
              }`}>
                {proto.id}
              </span>
              <span className={`text-[13px] ${isSelected ? 'font-medium' : ''}`}>
                {proto.title[lang]}
              </span>
            </motion.button>
          );
        })}
      </div>
      {tooltipEl}
    </>
  );
};


// ── Preview pane (column 3) ─────────────────────────────────────
const PreviewPane: React.FC<{
  prototype: PrototypeItem;
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ prototype, isDark, lang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const {
    iframeRef,
    shouldLoad,
    iframeLoaded,
    iframeScale,
    playerState,
    nativeW,
    nativeH,
    play,
    pause,
    iframeSrc,
    restart,
    onIframeLoad,
  } = useIframeLifecycle({
    prototypeId: prototype.id,
    containerRef,
    loadImmediately: true,
  });

  const [detailsOpen, setDetailsOpen] = useState(false);
  const showPlay = playerState === 'ready' || playerState === 'paused';
  const showControls = playerState === 'playing';
  const caption = BENEFIT_CAPTIONS[prototype.id]?.[lang] || prototype.desc[lang];
  const details = PROTOTYPE_DETAILS[prototype.id];

  // Close details when prototype changes
  useEffect(() => { setDetailsOpen(false); }, [prototype.id]);

  return (
    <div className="relative flex flex-col h-full">
      {/* Header: title + description + controls (fixed height, never pushes iframe) */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <button
          onClick={() => details && setDetailsOpen(prev => !prev)}
          className="flex-1 min-w-0 text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex-shrink-0 ${
              isDark
                ? `${CATEGORY_COLORS[prototype.category].bg} ${CATEGORY_COLORS[prototype.category].text}`
                : `${CATEGORY_COLORS[prototype.category].bgLight} ${CATEGORY_COLORS[prototype.category].textLight}`
            }`}>
              {prototype.id}
            </span>
            <h3 className={`text-lg font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {prototype.title[lang]}
            </h3>
          </div>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {caption}
          </p>
        </button>

        {/* "Voir les détails" button */}
        {details && (
          <motion.button
            onClick={() => setDetailsOpen(prev => !prev)}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              detailsOpen
                ? 'bg-[#2D5CF3] text-white'
                : (isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700')
            }`}
          >
            <motion.span
              animate={{ rotate: detailsOpen ? 180 : 0 }}
              transition={SPRING}
              className="inline-flex"
            >
              <CaretDown size={12} />
            </motion.span>
            {detailsOpen
              ? (lang === 'fr' ? 'Masquer les détails' : 'Hide details')
              : (lang === 'fr' ? 'Voir les détails' : 'View details')}
          </motion.button>
        )}

        {/* Playback controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
          {(showPlay || showControls) && iframeLoaded && (
            <>
              <motion.button
                onClick={showPlay ? play : pause}
                whileTap={prefersReduced ? {} : { scale: 0.93 }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
                }`}
                title={showPlay ? 'Play' : 'Pause'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={showPlay ? 'play' : 'pause'}
                    initial={prefersReduced ? {} : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReduced ? {} : { opacity: 0, scale: 0.7 }}
                    transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
                    className="inline-flex"
                  >
                    {showPlay ? <Play size={18} weight="fill" /> : <Pause size={18} weight="fill" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <motion.button
                onClick={restart}
                whileTap={prefersReduced ? {} : { scale: 0.93, rotate: -30 }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
                }`}
                title={lang === 'fr' ? 'Rejouer' : 'Replay'}
              >
                <RotateCcw size={18} />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Iframe container with uniform padding */}
      <div className={`relative flex-1 min-h-0 rounded-2xl overflow-hidden ${
        isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]'
      }`}>
        {/* Iframe wrapper with padding */}
        <div
          ref={containerRef}
          className="absolute inset-3 md:inset-4"
        >
          {/* Loading skeleton */}
          {!iframeLoaded && (
            <div className={`absolute inset-0 flex items-center justify-center z-10 rounded-xl ${
              isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]'
            }`}>
              <div className="flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full border-2 border-t-transparent animate-spin ${
                  isDark ? 'border-white/20' : 'border-black/10'
                }`} />
                <span className={`text-xs font-mono ${isDark ? 'text-white/20' : 'text-black/15'}`}>
                  {prototype.id}
                </span>
              </div>
            </div>
          )}

          {/* Iframe */}
          {shouldLoad && (
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <iframe
                ref={iframeRef as React.RefObject<HTMLIFrameElement>}
                src={iframeSrc}
                className={`transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  border: 'none',
                  width: `${nativeW}px`,
                  height: `${nativeH}px`,
                  transformOrigin: 'top left',
                  transform: `scale(${iframeScale})`,
                  pointerEvents: showPlay ? 'none' : 'auto',
                }}
                onLoad={onIframeLoad}
                title={prototype.title[lang]}
                tabIndex={-1}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}

          {/* Play overlay (centered, only when paused/ready) */}
          {showPlay && iframeLoaded && (
            <motion.button
              onClick={play}
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors cursor-pointer rounded-xl"
            >
              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.08 }}
                whileTap={prefersReduced ? {} : { scale: 0.94 }}
                transition={SPRING}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-lg"
              >
                <Play size={24} weight="fill" className="ml-0.5 text-gray-900" />
              </motion.div>
            </motion.button>
          )}
        </div>

        {/* Details overlay (absolute, over the iframe, doesn't push layout) */}
        <AnimatePresence>
          {detailsOpen && details && (
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
              transition={SPRING}
              className={`absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 z-30 rounded-xl p-6 backdrop-blur-xl shadow-lg ${
                isDark ? 'bg-[#1D1D1F]/95 border border-white/10' : 'bg-white/95 border border-gray-200 shadow-gray-200/50'
              }`}
              onClick={() => setDetailsOpen(false)}
            >
              <div className="grid grid-cols-2 gap-5" onClick={e => e.stopPropagation()}>
                {details.interaction && (
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      Interaction
                    </p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {details.interaction}
                    </p>
                  </div>
                )}
                {details.concept && (
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                      {lang === 'fr' ? 'Parti pris' : 'Concept'}
                    </p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {details.concept}
                    </p>
                  </div>
                )}
                {details.uxStrategy && (
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                      {lang === 'fr' ? 'Stratégie UX' : 'UX Strategy'}
                    </p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {details.uxStrategy}
                    </p>
                  </div>
                )}
                {details.outcome && (
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      Outcome
                    </p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {details.outcome}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};


// ── Main Gallery Component ──────────────────────────────────────
interface PrototypeFinderGalleryProps {
  isDark: boolean;
  lang: 'en' | 'fr';
  initialCategory?: PrototypeCategory;
}

const PrototypeFinderGallery: React.FC<PrototypeFinderGalleryProps> = ({
  isDark,
  lang,
  initialCategory,
}) => {
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<PrototypeCategory>(initialCategory || 'teacher');
  const [selectedProtoId, setSelectedProtoId] = useState<string>(() => {
    if (initialCategory) {
      const cat = GALLERY_CATEGORIES.find(c => c.id === initialCategory);
      return cat?.prototypeIds[0] || 'T1';
    }
    return 'T1';
  });

  // Update when initialCategory changes from parent
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      const cat = GALLERY_CATEGORIES.find(c => c.id === initialCategory);
      if (cat && cat.prototypeIds.length > 0) {
        setSelectedProtoId(cat.prototypeIds[0]);
      }
    }
  }, [initialCategory]);

  const activeCat = GALLERY_CATEGORIES.find(c => c.id === activeCategory);
  const categoryProtos: PrototypeItem[] = (activeCat?.prototypeIds || [])
    .map(pid => PROTOTYPE_MAP.get(pid))
    .filter((p): p is PrototypeItem => !!p);

  const selectedProto = PROTOTYPE_MAP.get(selectedProtoId) || categoryProtos[0];

  const handleSelectProto = useCallback((id: string) => {
    const savedY = window.scrollY;
    setSelectedProtoId(id);
    requestAnimationFrame(() => window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior }));
  }, []);

  const handleCategoryClick = useCallback((cat: PrototypeCategory) => {
    const savedY = window.scrollY;
    setActiveCategory(cat);
    const catData = GALLERY_CATEGORIES.find(c => c.id === cat);
    if (catData && catData.prototypeIds.length > 0) {
      setSelectedProtoId(catData.prototypeIds[0]);
    }
    requestAnimationFrame(() => window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior }));
  }, []);

  useEffect(() => {
    if (!activeCat?.prototypeIds.includes(selectedProtoId)) {
      if (activeCat && activeCat.prototypeIds.length > 0) {
        setSelectedProtoId(activeCat.prototypeIds[0]);
      }
    }
  }, [activeCategory, activeCat, selectedProtoId]);

  const borderColor = isDark ? 'border-white/[0.08]' : 'border-gray-200';
  const bgCol = isDark ? 'bg-[#1D1D1F]/50' : 'bg-gray-50/80';
  const [showList, setShowList] = useState(false);

  // Category pills — tablet/mobile (no layoutId to avoid cross-instance conflicts)
  const categoryPills = (
    <div className="flex gap-1.5 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
      {GALLERY_CATEGORIES.map(cat => {
        const Icon = CATEGORY_ICONS[cat.id];
        const isActive = activeCategory === cat.id;
        const colors = CATEGORY_COLORS[cat.id];
        return (
          <motion.button
            key={cat.id}
            onClick={() => { handleCategoryClick(cat.id); setShowList(false); }}
            onMouseDown={(e) => e.preventDefault()}
            whileTap={prefersReduced ? {} : { scale: 0.96 }}
            className={`flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-[#2D5CF3] text-white'
                : isDark
                  ? 'text-gray-300 hover:bg-white/5'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon size={14} className={isActive ? 'text-white/80' : (isDark ? colors.text : colors.textLight)} />
            <span className={`text-[13px] font-medium ${isActive ? 'text-white' : ''}`}>
              {CATEGORY_LABELS[cat.id][lang]}
            </span>
            <span className={`text-[11px] tabular-nums ${isActive ? 'text-white/60' : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
              {cat.prototypeIds.length}
            </span>
          </motion.button>
        );
      })}
    </div>
  );

  // key on PreviewPane is required: all prototypes share /prototypes/index.html,
  // only the hash changes. Hash-only src changes do NOT fire onLoad, so without key
  // the iframe never reports loaded and controls never appear.
  // Scroll caused by remount is handled separately via scroll-position restore.
  const previewContent = selectedProto ? (
    <div className="flex-1 min-h-0 flex flex-col">
      <PreviewPane key={selectedProto.id} prototype={selectedProto} isDark={isDark} lang={lang} />
    </div>
  ) : null;

  return (
    <>
      {/* ── DESKTOP (>1024px): 3-column Finder ── */}
      <div
        className={`hidden lg:flex rounded-2xl border overflow-hidden ${borderColor} ${
          isDark ? 'bg-[#161618]' : 'bg-white'
        }`}
        style={{ height: 'calc(100vh - var(--nav-height, 72px) - 56px)', minHeight: '560px' }}
      >
        {/* Col 1: Categories — sliding selection indicator via layoutId */}
        <div className={`w-[200px] flex-shrink-0 border-r ${borderColor} ${bgCol} flex flex-col`}>
          <div className={`px-4 py-3 border-b ${borderColor}`}>
            <h3 className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
              {lang === 'fr' ? 'Catégories' : 'Categories'}
            </h3>
          </div>
          <div className="flex-1 py-1.5 px-1.5">
            {GALLERY_CATEGORIES.map(cat => {
              const Icon = CATEGORY_ICONS[cat.id];
              const isActive = activeCategory === cat.id;
              const colors = CATEGORY_COLORS[cat.id];
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  onMouseDown={(e) => e.preventDefault()}
                  whileTap={prefersReduced ? {} : { scale: 0.97 }}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-[#2D5CF3] text-white' : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white/80' : (isDark ? colors.text : colors.textLight)} />
                  <span className={`text-[13px] font-medium flex-1 ${isActive ? 'text-white' : ''}`}>
                    {CATEGORY_LABELS[cat.id][lang]}
                  </span>
                  <span className={`text-[11px] tabular-nums flex-shrink-0 ${isActive ? 'text-white/60' : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
                    {cat.prototypeIds.length}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Col 2: Prototype list */}
        <div className={`w-[300px] flex-shrink-0 border-r ${borderColor} ${bgCol} flex flex-col`}>
          <div className={`px-4 py-3 border-b ${borderColor}`}>
            <h3 className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeCategory}
                  initial={prefersReduced ? {} : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? {} : { opacity: 0, y: -4 }}
                  transition={{ type: 'spring', duration: 0.25, bounce: 0 }}
                  className="inline-flex items-baseline gap-1.5"
                >
                  {CATEGORY_LABELS[activeCategory][lang]}
                  <span className={`${isDark ? 'text-white/20' : 'text-gray-300'}`}>{categoryProtos.length}</span>
                </motion.span>
              </AnimatePresence>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            <PrototypeList
              protos={categoryProtos}
              selectedId={selectedProtoId}
              activeCategory={activeCategory}
              isDark={isDark}
              lang={lang}
              onSelect={handleSelectProto}
              instanceId="desktop"
            />
          </div>
        </div>

        {/* Col 3: Preview */}
        <div className="flex-1 min-w-0 p-6 flex flex-col">{previewContent}</div>
      </div>

      {/* ── TABLET (768-1024px): pills + list sidebar + preview ── */}
      <div
        className={`hidden md:flex lg:hidden flex-col rounded-2xl border overflow-hidden ${borderColor} ${
          isDark ? 'bg-[#161618]' : 'bg-white'
        }`}
        style={{ height: 'calc(100vh - var(--nav-height, 72px) - 56px)', minHeight: '500px' }}
      >
        <div className={`px-4 py-3 border-b ${borderColor} ${bgCol}`}>
          {categoryPills}
        </div>

        <div className="flex flex-1 min-h-0">
          <div className={`w-[240px] flex-shrink-0 border-r ${borderColor} ${bgCol} overflow-y-auto`} style={{ scrollbarWidth: 'thin' }}>
            <PrototypeList
              protos={categoryProtos}
              selectedId={selectedProtoId}
              activeCategory={activeCategory}
              isDark={isDark}
              lang={lang}
              onSelect={handleSelectProto}
              instanceId="tablet"
            />
          </div>
          <div className="flex-1 min-w-0 p-4 flex flex-col">{previewContent}</div>
        </div>
      </div>

      {/* ── MOBILE (<768px): stacked with toggle ── */}
      <div
        className={`flex md:hidden flex-col rounded-2xl border overflow-hidden ${borderColor} ${
          isDark ? 'bg-[#161618]' : 'bg-white'
        }`}
        style={{ minHeight: '70vh' }}
      >
        <div className={`px-3 py-2.5 border-b ${borderColor} ${bgCol}`}>
          {categoryPills}
        </div>

        <motion.button
          onClick={() => setShowList(!showList)}
          onMouseDown={(e) => e.preventDefault()}
          whileTap={prefersReduced ? {} : { scale: 0.99 }}
          className={`flex items-center justify-between px-4 py-3 border-b ${borderColor} transition-colors ${
            isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {selectedProtoId}
            </span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedProto?.title[lang]}
            </span>
          </div>
          <motion.span
            animate={{ rotate: showList ? 180 : 0 }}
            transition={SPRING}
            className="inline-flex"
          >
            <CaretDown size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {showList && (
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={SPRING}
              className={`overflow-hidden border-b ${borderColor}`}
            >
              <div className="max-h-[40vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <PrototypeList
                  protos={categoryProtos}
                  selectedId={selectedProtoId}
                  activeCategory={activeCategory}
                  isDark={isDark}
                  lang={lang}
                  onSelect={(id) => { handleSelectProto(id); setShowList(false); }}
                  instanceId="mobile"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 min-h-0 p-3 flex flex-col">{previewContent}</div>
      </div>
    </>
  );
};

export default PrototypeFinderGallery;
