import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onClick?: () => void;
  draggable?: boolean;
}

/**
 * LazyImage - Optimized image component with lazy loading
 * - Uses native browser lazy loading
 * - Shows placeholder while loading
 * - Smooth fade-in on load
 * - Intersection Observer fallback for older browsers
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  onClick,
  draggable = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${placeholderClassName}`}>
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg ${placeholderClassName}`}
        />
      )}

      {/* Actual image - only load src when in view */}
      {isInView && (
        <img loading="lazy"
          src={src}
          alt={alt}
          decoding="async"
          draggable={draggable}
          onClick={onClick}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
