import React, { useRef, useState, useCallback, useEffect } from 'react';
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight, Play, Pause, ArrowCounterClockwise as RotateCcw, ArrowsOut as Expand } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrototypeItem, getIframeSrc, CATEGORY_COLORS } from '../../data/sqoolPrototypesData';

interface PrototypeCarouselProps {
  prototypes: PrototypeItem[];
  isDark: boolean;
  lang: 'en' | 'fr';
  onCardClick: (index: number) => void;
  totalCount?: number;
  onSeeAll?: () => void;
}

// Benefit-focused captions (user value, not UI description)
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

// The UI-motion prototypes render at this native resolution
const NATIVE_W = 1200;
const NATIVE_H = 900;

type PlayerState = 'idle' | 'ready' | 'playing' | 'paused';

interface PrototypePlayerProps {
  prototype: PrototypeItem;
  isDark: boolean;
  lang: 'en' | 'fr';
  isHero?: boolean;
  onExpand?: () => void;
}

const PrototypePlayer: React.FC<PrototypePlayerProps> = ({
  prototype,
  isDark,
  lang,
  isHero = false,
  onExpand,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const scaleRef = useRef(1);
  const [, forceUpdate] = useState(0);
  const colors = CATEGORY_COLORS[prototype.category];
  const caption = BENEFIT_CAPTIONS[prototype.id]?.[lang] || prototype.desc[lang];

  // Compute scale once on mount, update on resize (no state change = no re-render flicker)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) {
        const newScale = w / NATIVE_W;
        if (Math.abs(newScale - scaleRef.current) > 0.001) {
          scaleRef.current = newScale;
          // Update iframe transform directly without React re-render
          const iframe = iframeRef.current;
          if (iframe) iframe.style.transform = `scale(${newScale})`;
        }
      }
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handlePlay = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('play', '*');
    setPlayerState('playing');
  }, []);

  const handlePause = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('pause', '*');
    setPlayerState('paused');
  }, []);

  const handleRestart = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('restart', '*');
    setPlayerState('playing');
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    setPlayerState('ready');
    // Apply correct scale immediately on load
    const el = containerRef.current;
    const iframe = iframeRef.current;
    if (el && iframe) {
      const w = el.getBoundingClientRect().width;
      scaleRef.current = w / NATIVE_W;
      iframe.style.transform = `scale(${scaleRef.current})`;
    }
  }, []);

  // Reset on prototype change
  useEffect(() => {
    setPlayerState('idle');
    setIframeLoaded(false);
    forceUpdate(n => n + 1);
  }, [prototype.id]);

  const showPlayButton = playerState === 'ready' || playerState === 'paused';
  const showControls = playerState === 'playing';

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Player container: padding-bottom for stable aspect ratio */}
      <div
        className={`relative overflow-hidden ${isHero ? 'rounded-xl' : 'rounded-lg'} ${
          isDark
            ? 'bg-[#1C1C1E] border border-white/[0.08]'
            : 'bg-[#F2F2F7] border border-black/[0.06]'
        }`}
        style={{ paddingBottom: `${(NATIVE_H / NATIVE_W) * 100}%`, height: 0 }}
      >
        {/* Loading spinner (shown until iframe fires onLoad) */}
        {!iframeLoaded && (
          <div className={`absolute inset-0 flex items-center justify-center z-10 ${
            isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]'
          }`}>
            <div className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${
              isDark ? 'border-white/20' : 'border-black/10'
            }`} />
          </div>
        )}

        {/* Iframe: always rendered, no lazy loading, no conditional mount */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={getIframeSrc(prototype.id)}
            className={`block ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              border: 'none',
              width: `${NATIVE_W}px`,
              height: `${NATIVE_H}px`,
              transformOrigin: 'top left',
              transform: `scale(${scaleRef.current})`,
              pointerEvents: showPlayButton ? 'none' : 'auto',
            }}
            onLoad={handleIframeLoad}
            title={prototype.title[lang]}
            loading="lazy"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Badge */}
        <div className={`absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide backdrop-blur-sm ${
          isDark ? `${colors.bg} ${colors.text}` : `${colors.bgLight} ${colors.textLight}`
        }`}>
          {prototype.id}
        </div>

        {/* Expand button (top right) */}
        {onExpand && iframeLoaded && (
          <button
            onClick={(e) => { e.stopPropagation(); onExpand(); }}
            className={`absolute top-2.5 right-2.5 z-20 p-1.5 rounded-md backdrop-blur-sm transition-colors ${
              isDark
                ? 'bg-black/40 hover:bg-black/60 text-white/60 hover:text-white'
                : 'bg-white/60 hover:bg-white/80 text-gray-500 hover:text-gray-800'
            }`}
            title={lang === 'fr' ? 'Agrandir' : 'Expand'}
          >
            <Expand size={14} />
          </button>
        )}

        {/* Play button overlay */}
        {showPlayButton && iframeLoaded && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
          >
            <div className={`flex items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110 ${
              isHero ? 'w-16 h-16' : 'w-12 h-12'
            }`}>
              <Play size={isHero ? 24 : 18} weight="fill" className="ml-0.5 text-gray-900" />
            </div>
          </button>
        )}

        {/* Pause + Restart controls */}
        {showControls && (
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5">
            <button
              onClick={handlePause}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
              title="Pause"
            >
              <Pause size={14} weight="fill" />
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
              title={lang === 'fr' ? 'Rejouer' : 'Replay'}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-2 px-1">
        <p className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
          {prototype.title[lang]}
        </p>
        <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
          {caption}
        </p>
      </div>
    </div>
  );
};


// ── Fullscreen Lightbox (opened from Expand button) ──────────────
const FullscreenPlayer: React.FC<{
  prototype: PrototypeItem;
  lang: 'en' | 'fr';
  onClose: () => void;
}> = ({ prototype, lang, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handlePlay = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('play', '*');
    setPlayerState('playing');
  }, []);
  const handlePause = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('pause', '*');
    setPlayerState('paused');
  }, []);
  const handleRestart = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('restart', '*');
    setPlayerState('playing');
  }, []);

  const showPlay = (playerState === 'ready' || playerState === 'paused') && loaded;
  const showControls = playerState === 'playing' && loaded;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-blue-400 bg-blue-400/20 px-2 py-0.5 rounded">
            {prototype.id}
          </span>
          <span className="text-sm font-medium text-white truncate">
            {prototype.title[lang]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <span className="text-lg leading-none">&times;</span>
        </button>
      </div>

      {/* Iframe */}
      <div className="flex-1 relative mx-4 md:mx-16 mb-4 rounded-lg overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-[#1D1D1F] flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={getIframeSrc(prototype.id)}
          className={`w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ border: 'none' }}
          onLoad={() => { setLoaded(true); setPlayerState('ready'); }}
          title={prototype.title[lang]}
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
        />

        {showPlay && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 shadow-lg hover:scale-110 transition-transform">
              <Play size={28} weight="fill" className="ml-1 text-gray-900" />
            </div>
          </button>
        )}

        {showControls && (
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
            <button onClick={handlePause} className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm">
              <Pause size={16} weight="fill" />
            </button>
            <button onClick={handleRestart} className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm">
              <RotateCcw size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="text-center pb-4 px-4">
        <p className="text-sm text-gray-300">
          {BENEFIT_CAPTIONS[prototype.id]?.[lang] || prototype.desc[lang]}
        </p>
      </div>
    </motion.div>
  );
};


// ── Main Carousel ────────────────────────────────────────────────
const THUMB_WIDTH = 480; // px, fixed width for carousel items
const SCROLL_AMOUNT = THUMB_WIDTH + 16; // item width + gap

const PrototypeCarousel: React.FC<PrototypeCarouselProps> = ({
  prototypes,
  isDark,
  lang,
  onCardClick: _onCardClick,
  totalCount,
  onSeeAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [expandedProto, setExpandedProto] = useState<PrototypeItem | null>(null);

  const heroProto = prototypes[0];
  const carouselProtos = prototypes.slice(1);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || carouselProtos.length === 0) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, carouselProtos.length]);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' });
  }, []);

  if (prototypes.length === 0) return null;

  return (
    <div className="relative">
      {/* Hero: full-width player with container query for scale */}
      {heroProto && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <PrototypePlayer
            prototype={heroProto}
            isDark={isDark}
            lang={lang}
            isHero
            onExpand={() => setExpandedProto(heroProto)}
          />
        </motion.div>
      )}

      {/* Horizontal scrollable strip */}
      {carouselProtos.length > 0 && (
        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scrollBy(-1)}
              className={`absolute -left-3 top-[calc(50%-40px)] -translate-y-1/2 z-10 p-2.5 rounded-full shadow-lg transition-all ${
                isDark
                  ? 'bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white/70 hover:text-white border border-white/10'
                  : 'bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 border border-gray-200 shadow-md'
              }`}
            >
              <ChevronLeft size={18} weight="bold" />
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="proto-strip flex gap-4 overflow-x-auto scroll-smooth pb-3"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`.proto-strip::-webkit-scrollbar { display: none; }`}</style>
            {carouselProtos.map((proto) => (
              <div
                key={proto.id}
                className="flex-shrink-0"
                style={{ width: `${THUMB_WIDTH}px` }}
              >
                <PrototypePlayer
                  prototype={proto}
                  isDark={isDark}
                  lang={lang}
                  onExpand={() => setExpandedProto(proto)}
                />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scrollBy(1)}
              className={`absolute -right-3 top-[calc(50%-40px)] -translate-y-1/2 z-10 p-2.5 rounded-full shadow-lg transition-all ${
                isDark
                  ? 'bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white/70 hover:text-white border border-white/10'
                  : 'bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 border border-gray-200 shadow-md'
              }`}
            >
              <ChevronRight size={18} weight="bold" />
            </button>
          )}

          {/* Right fade gradient */}
          {canScrollRight && (
            <div className={`absolute right-0 top-0 bottom-3 w-16 pointer-events-none ${
              isDark
                ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-l from-white to-transparent'
            }`} />
          )}
        </div>
      )}

      {/* "See all N prototypes" link */}
      {onSeeAll && totalCount && totalCount > prototypes.length && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSeeAll}
            className={`text-sm font-medium inline-flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'text-[#2D5CF3] hover:text-[#4B7BF5]'
                : 'text-[#2D5CF3] hover:text-[#2450d9]'
            }`}
          >
            {lang === 'fr'
              ? `Voir les ${totalCount} prototypes`
              : `See all ${totalCount} prototypes`}
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {expandedProto && (
          <FullscreenPlayer
            prototype={expandedProto}
            lang={lang}
            onClose={() => setExpandedProto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrototypeCarousel;
