/**
 * ProgressiveVideo - A reusable video component with progressive loading
 *
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Poster/thumbnail display during loading
 * - Loading progress indicator
 * - Smooth fade-in when video is ready
 * - Supports autoplay, loop, controls, muted options
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';

interface ProgressiveVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  // When true, video loads immediately when in viewport
  // When false, waits for user interaction (click play)
  lazyLoad?: boolean;
  // Threshold for intersection observer (0-1)
  threshold?: number;
  // Root margin for intersection observer
  rootMargin?: string;
  // Show play button overlay when not autoplaying
  showPlayButton?: boolean;
  // Optional callback when video is ready
  onReady?: () => void;
  // Optional callback on error
  onError?: (error: Error) => void;
  // Dark mode
  isDark?: boolean;
}

const ProgressiveVideo: React.FC<ProgressiveVideoProps> = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  playsInline = true,
  preload = 'metadata',
  lazyLoad = true,
  threshold = 0.1,
  rootMargin = '100px',
  showPlayButton = true,
  onReady,
  onError,
  isDark = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(!autoPlay && showPlayButton);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once in view, stop observing
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad, threshold, rootMargin]);

  // Handle video loading progress
  const handleProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const duration = video.duration;
      if (duration > 0) {
        setLoadProgress((bufferedEnd / duration) * 100);
      }
    }
  }, []);

  // Handle video can play through
  const handleCanPlayThrough = useCallback(() => {
    setIsLoading(false);
    setIsReady(true);
    setLoadProgress(100);
    onReady?.();
  }, [onReady]);

  // Handle video can play
  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, show play button
        setShowOverlay(true);
      });
    }
  }, [autoPlay]);

  // Handle video error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.(new Error('Video failed to load'));
  }, [onError]);

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setShowOverlay(false);
      }).catch(handleError);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [handleError]);

  // Handle video events
  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  // Generate poster from video if not provided
  const effectivePoster = poster || (isInView ? undefined : undefined);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Loading skeleton / poster */}
      <AnimatePresence>
        {(isLoading || !isInView) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 flex items-center justify-center z-10 ${
              isDark ? 'bg-[#1a1a1c]' : 'bg-gray-100'
            }`}
          >
            {poster ? (
              <img loading="lazy"
                src={poster}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full ${isDark ? 'bg-[#1a1a1c]' : 'bg-gray-100'}`} />
            )}

            {/* Loading indicator */}
            {isLoading && isInView && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                <Loader2
                  className="w-10 h-10 text-white animate-spin"
                />
                {loadProgress > 0 && loadProgress < 100 && (
                  <div className="mt-3 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button overlay */}
      <AnimatePresence>
        {showOverlay && !isLoading && isReady && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handlePlayPause}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group"
            aria-label="Play video"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
              isDark ? 'bg-white/20 backdrop-blur-sm' : 'bg-black/30 backdrop-blur-sm'
            }`}>
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className={`absolute inset-0 flex items-center justify-center z-20 ${
          isDark ? 'bg-[#1a1a1c]' : 'bg-gray-100'
        }`}>
          <div className="text-center p-4">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Video failed to load
            </p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                videoRef.current?.load();
              }}
              className={`mt-2 text-sm underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Video element */}
      {isInView && (
        <motion.video
          ref={videoRef}
          src={src}
          poster={effectivePoster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls && !showOverlay}
          playsInline={playsInline}
          preload={preload}
          onProgress={handleProgress}
          onCanPlay={handleCanPlay}
          onCanPlayThrough={handleCanPlayThrough}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-contain ${hasError ? 'hidden' : ''}`}
        />
      )}
    </div>
  );
};

export default ProgressiveVideo;
