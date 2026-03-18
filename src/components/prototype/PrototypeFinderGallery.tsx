import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Monitor, Users, Play, Pause, ArrowCounterClockwise as RotateCcw, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
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
  T1: { en: 'Students join in seconds, no setup needed', fr: 'Les \u00e9l\u00e8ves rejoignent en quelques secondes, sans configuration' },
  T2: { en: 'The teacher decides what students can do', fr: 'L\u2019enseignant d\u00e9cide ce que les \u00e9l\u00e8ves peuvent faire' },
  T3: { en: 'See who is working and who has drifted', fr: 'Voir qui travaille et qui a d\u00e9croch\u00e9' },
  T4: { en: 'Answer questions without interrupting the lesson', fr: 'R\u00e9pondre aux questions sans interrompre le cours' },
  T5: { en: 'Instant silence, one tap', fr: 'Le silence instantan\u00e9, en un tap' },
  T6: { en: 'Every student receives the file at the same time', fr: 'Chaque \u00e9l\u00e8ve re\u00e7oit le fichier au m\u00eame moment' },
  T7: { en: 'Show your screen to the whole class at once', fr: 'Montrer son \u00e9cran \u00e0 toute la classe d\u2019un geste' },
  T8: { en: 'Help a student without leaving your desk', fr: 'Aider un \u00e9l\u00e8ve sans quitter son bureau' },
  T9: { en: 'Differentiate instruction with flexible grouping', fr: 'Diff\u00e9rencier l\u2019enseignement avec des groupes flexibles' },
  T10: { en: 'Gauge comprehension in real time', fr: 'Mesurer la compr\u00e9hension en temps r\u00e9el' },
  T11: { en: 'A private channel that keeps the class calm', fr: 'Un canal priv\u00e9 qui pr\u00e9serve le calme de la classe' },
  T12: { en: 'Celebrate student work in front of everyone', fr: 'Valoriser le travail d\u2019un \u00e9l\u00e8ve devant toute la classe' },
  T13: { en: 'Comment and annotate live, together', fr: 'Commenter et annoter en direct, ensemble' },
  T14: { en: 'Paper to digital in one gesture', fr: 'Du papier au num\u00e9rique en un geste' },
  T15: { en: 'A clear summary to close the lesson', fr: 'Un r\u00e9capitulatif clair pour clore la s\u00e9ance' },
  T16: { en: 'Every browser opens the same page instantly', fr: 'Chaque navigateur ouvre la m\u00eame page instantan\u00e9ment' },
  T17: { en: 'Students see how much time they have left', fr: 'Les \u00e9l\u00e8ves voient le temps qu\u2019il leur reste' },
  T18: { en: 'Fair teams, generated in one tap', fr: 'Des \u00e9quipes \u00e9quilibr\u00e9es, g\u00e9n\u00e9r\u00e9es en un tap' },
  T19: { en: 'Everything from past lessons, always accessible', fr: 'Tout ce qui a \u00e9t\u00e9 fait, toujours accessible' },
  T20: { en: 'Ready to teach in under 30 seconds', fr: 'Pr\u00eat \u00e0 enseigner en moins de 30\u00a0secondes' },
  T21: { en: 'A controlled environment for focused work', fr: 'Un environnement contr\u00f4l\u00e9 pour un travail concentr\u00e9' },
  T22: { en: 'Full exam setup from a single screen', fr: 'Configuration compl\u00e8te de l\u2019examen depuis un seul \u00e9cran' },
  T23: { en: 'Monitor 32 students without stress', fr: 'Surveiller 32\u00a0\u00e9l\u00e8ves sans stress' },
  T24: { en: 'All copies collected, none lost', fr: 'Toutes les copies collect\u00e9es, aucune perdue' },
  T25: { en: 'A classroom walkthrough without leaving your seat', fr: 'Un tour de classe sans quitter son si\u00e8ge' },
  S1: { en: 'Join class instantly, no password needed', fr: 'Rejoindre la classe instantan\u00e9ment, sans mot de passe' },
  S2: { en: 'All lesson materials in one place', fr: 'Toutes les ressources du cours au m\u00eame endroit' },
  S3: { en: 'Signal completion without disrupting the class', fr: 'Signaler qu\u2019on a fini sans perturber la classe' },
  S4: { en: 'Ask for help without raising your hand', fr: 'Demander de l\u2019aide sans lever la main' },
  S5: { en: 'Submit work with timestamped confirmation', fr: 'Rendre son travail avec confirmation horodat\u00e9e' },
  S6: { en: 'Receive documents instantly on your tablet', fr: 'Recevoir les documents instantan\u00e9ment sur sa tablette' },
  S7: { en: 'A calm screen that explains what is happening', fr: 'Un \u00e9cran sobre qui explique ce qui se passe' },
  SC1: { en: 'From opening to first activity in under a minute', fr: 'De l\u2019ouverture \u00e0 la premi\u00e8re activit\u00e9 en moins d\u2019une minute' },
  SC2: { en: 'Spot difficulties and act before they escalate', fr: 'Rep\u00e9rer les difficult\u00e9s et agir avant qu\u2019elles ne s\u2019aggravent' },
  SC3: { en: 'Each student gets the right level of challenge', fr: 'Chaque \u00e9l\u00e8ve re\u00e7oit le bon niveau de d\u00e9fi' },
  SC4: { en: 'Know where the class stands, mid-lesson', fr: 'Savoir o\u00f9 en est la classe, en plein cours' },
  SC5: { en: 'Teamwork with clear structure and submission', fr: 'Travail d\u2019\u00e9quipe avec structure claire et rendu' },
  SC6: { en: 'Bridge paper and digital without friction', fr: 'Relier papier et num\u00e9rique sans friction' },
  SC7: { en: 'A complete exam, supervised from start to finish', fr: 'Un examen complet, supervis\u00e9 du d\u00e9but \u00e0 la fin' },
  SC8: { en: 'Structured evaluation with minimal overhead', fr: '\u00c9valuation structur\u00e9e avec un minimum de logistique' },
  SC9: { en: 'Turn a student screen into a teaching moment', fr: 'Transformer l\u2019\u00e9cran d\u2019un \u00e9l\u00e8ve en moment p\u00e9dagogique' },
  SC10: { en: 'A full lesson, step by step, as it happens in class', fr: 'Un cours entier, \u00e9tape par \u00e9tape, tel qu\u2019il se vit en classe' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORY_ICONS: Record<PrototypeCategory, React.FC<any>> = {
  teacher: Monitor,
  student: Users,
  scenario: Play,
};


// ── Preview pane (column 3) ─────────────────────────────────────
const PreviewPane: React.FC<{
  prototype: PrototypeItem;
  isDark: boolean;
  lang: 'en' | 'fr';
}> = ({ prototype, isDark, lang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
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
          <button
            onClick={() => setDetailsOpen(prev => !prev)}
            className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              detailsOpen
                ? (isDark ? 'bg-[#2D5CF3] text-white' : 'bg-[#2D5CF3] text-white')
                : (isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700')
            }`}
          >
            <CaretDown
              size={12}
              className={`transition-transform duration-200 ${detailsOpen ? 'rotate-180' : ''}`}
            />
            {detailsOpen
              ? (lang === 'fr' ? 'Masquer les détails' : 'Hide details')
              : (lang === 'fr' ? 'Voir les détails' : 'View details')}
          </button>
        )}

        {/* Playback controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
          {(showPlay || showControls) && iframeLoaded && (
            <>
              <button
                onClick={showPlay ? play : pause}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
                }`}
                title={showPlay ? 'Play' : 'Pause'}
              >
                {showPlay ? <Play size={18} weight="fill" /> : <Pause size={18} weight="fill" />}
              </button>
              <button
                onClick={restart}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-800'
                }`}
                title={lang === 'fr' ? 'Rejouer' : 'Replay'}
              >
                <RotateCcw size={18} />
              </button>
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
            <button
              onClick={play}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 hover:bg-black/15 transition-colors cursor-pointer rounded-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                <Play size={24} weight="fill" className="ml-0.5 text-gray-900" />
              </div>
            </button>
          )}
        </div>

        {/* Details overlay (absolute, over the iframe, doesn't push layout) */}
        <AnimatePresence>
          {detailsOpen && details && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
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

  const handleCategoryClick = useCallback((cat: PrototypeCategory) => {
    setActiveCategory(cat);
    const catData = GALLERY_CATEGORIES.find(c => c.id === cat);
    if (catData && catData.prototypeIds.length > 0) {
      setSelectedProtoId(catData.prototypeIds[0]);
    }
  }, []);

  const handleListKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentIdx = categoryProtos.findIndex(p => p.id === selectedProtoId);
    if (e.key === 'ArrowDown' && currentIdx < categoryProtos.length - 1) {
      e.preventDefault();
      setSelectedProtoId(categoryProtos[currentIdx + 1].id);
    } else if (e.key === 'ArrowUp' && currentIdx > 0) {
      e.preventDefault();
      setSelectedProtoId(categoryProtos[currentIdx - 1].id);
    }
  }, [categoryProtos, selectedProtoId]);

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

  // Category pills (shared between mobile/tablet/desktop)
  const categoryPills = (
    <div className="flex gap-1.5 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
      {GALLERY_CATEGORIES.map(cat => {
        const Icon = CATEGORY_ICONS[cat.id];
        const isActive = activeCategory === cat.id;
        const colors = CATEGORY_COLORS[cat.id];
        return (
          <button
            key={cat.id}
            onClick={() => { handleCategoryClick(cat.id); setShowList(false); }}
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
          </button>
        );
      })}
    </div>
  );

  // Prototype list (shared)
  const protoList = (
    <div
      className="overflow-y-auto py-1.5 px-1.5"
      style={{ scrollbarWidth: 'thin' }}
      onKeyDown={handleListKeyDown}
    >
      {categoryProtos.map(proto => {
        const isSelected = proto.id === selectedProtoId;
        return (
          <button
            key={proto.id}
            onClick={() => { setSelectedProtoId(proto.id); setShowList(false); }}
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
          </button>
        );
      })}
    </div>
  );

  // Preview content (shared)
  const previewContent = (
    <AnimatePresence mode="wait">
      {selectedProto && (
        <motion.div
          key={selectedProto.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.15 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          <PreviewPane prototype={selectedProto} isDark={isDark} lang={lang} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ── DESKTOP (>1024px): 3-column Finder ── */}
      <div
        className={`hidden lg:flex rounded-2xl border overflow-hidden ${borderColor} ${
          isDark ? 'bg-[#161618]' : 'bg-white'
        }`}
        style={{ height: 'calc(100vh - 140px)', minHeight: '560px' }}
      >
        {/* Col 1: Categories */}
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
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-[#2D5CF3] text-white' : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white/80' : (isDark ? colors.text : colors.textLight)} />
                  <span className={`text-[13px] font-medium flex-1 ${isActive ? 'text-white' : ''}`}>{CATEGORY_LABELS[cat.id][lang]}</span>
                  <span className={`text-[11px] tabular-nums flex-shrink-0 ${isActive ? 'text-white/60' : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>{cat.prototypeIds.length}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Col 2: Prototype list */}
        <div className={`w-[300px] flex-shrink-0 border-r ${borderColor} ${bgCol} flex flex-col`}>
          <div className={`px-4 py-3 border-b ${borderColor}`}>
            <h3 className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
              {CATEGORY_LABELS[activeCategory][lang]}
              <span className={`ml-1.5 ${isDark ? 'text-white/20' : 'text-gray-300'}`}>{categoryProtos.length}</span>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">{protoList}</div>
        </div>

        {/* Col 3: Preview */}
        <div className="flex-1 min-w-0 p-6 flex flex-col">{previewContent}</div>
      </div>

      {/* ── TABLET (768-1024px): pills + list sidebar + preview ── */}
      <div
        className={`hidden md:flex lg:hidden flex-col rounded-2xl border overflow-hidden ${borderColor} ${
          isDark ? 'bg-[#161618]' : 'bg-white'
        }`}
        style={{ height: 'calc(100vh - 140px)', minHeight: '500px' }}
      >
        {/* Top bar: pills + current prototype selector */}
        <div className={`px-4 py-3 border-b ${borderColor} ${bgCol}`}>
          {categoryPills}
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Sidebar: prototype list */}
          <div className={`w-[240px] flex-shrink-0 border-r ${borderColor} ${bgCol} overflow-y-auto`}>
            {protoList}
          </div>

          {/* Preview */}
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
        {/* Top: category pills */}
        <div className={`px-3 py-2.5 border-b ${borderColor} ${bgCol}`}>
          {categoryPills}
        </div>

        {/* Prototype selector button */}
        <button
          onClick={() => setShowList(!showList)}
          className={`flex items-center justify-between px-4 py-3 border-b ${borderColor} ${
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
          <CaretDown size={14} className={`transition-transform ${showList ? 'rotate-180' : ''} ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        </button>

        {/* Collapsible list */}
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className={`overflow-hidden border-b ${borderColor}`}
            >
              <div className="max-h-[40vh] overflow-y-auto">{protoList}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview */}
        <div className="flex-1 min-h-0 p-3 flex flex-col">{previewContent}</div>
      </div>
    </>
  );
};

export default PrototypeFinderGallery;
