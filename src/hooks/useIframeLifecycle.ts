import { useRef, useState, useCallback, useEffect, RefObject } from 'react';
import { getIframeSrc } from '../data/sqoolPrototypesData';

// Native resolution of UI-motion prototypes
const NATIVE_W = 1200;
const NATIVE_H = 900;

export type PlayerState = 'idle' | 'ready' | 'playing' | 'paused';

export interface UseIframeLifecycleOptions {
  prototypeId: string;
  /** Container ref for scale computation and IntersectionObserver */
  containerRef: RefObject<HTMLDivElement | null>;
  /** IntersectionObserver rootMargin for lazy loading. Default: '300px 0px' */
  loadMargin?: string;
  /** Skip IntersectionObserver and load immediately (e.g. expanded view) */
  loadImmediately?: boolean;
}

export interface UseIframeLifecycleReturn {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  shouldLoad: boolean;
  iframeLoaded: boolean;
  iframeScale: number;
  playerState: PlayerState;
  iframeSrc: string;
  nativeW: number;
  nativeH: number;
  play: () => void;
  pause: () => void;
  restart: () => void;
  onIframeLoad: () => void;
}

export function useIframeLifecycle({
  prototypeId,
  containerRef,
  loadMargin = '300px 0px',
  loadImmediately = false,
}: UseIframeLifecycleOptions): UseIframeLifecycleReturn {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(loadImmediately);
  const [iframeScale, setIframeScale] = useState(0);

  // Compute scale: container width / native iframe width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setIframeScale(w / NATIVE_W);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  // IntersectionObserver: load iframe when entering viewport
  useEffect(() => {
    if (loadImmediately) {
      setShouldLoad(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: loadMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prototypeId, containerRef, loadMargin, loadImmediately]);

  // Reset state when prototype changes
  useEffect(() => {
    setPlayerState('idle');
    setIframeLoaded(false);
    if (!loadImmediately) setShouldLoad(false);
  }, [prototypeId, loadImmediately]);

  const play = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('play', '*');
    setPlayerState('playing');
  }, []);

  const pause = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('pause', '*');
    setPlayerState('paused');
  }, []);

  const restart = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage('restart', '*');
    setPlayerState('playing');
  }, []);

  const onIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    setPlayerState((prev) => (prev === 'idle' ? 'ready' : prev));
  }, []);

  return {
    iframeRef,
    shouldLoad,
    iframeLoaded,
    iframeScale,
    playerState,
    iframeSrc: getIframeSrc(prototypeId),
    nativeW: NATIVE_W,
    nativeH: NATIVE_H,
    play,
    pause,
    restart,
    onIframeLoad,
  };
}
