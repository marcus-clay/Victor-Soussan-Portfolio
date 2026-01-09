import React, { useState, useRef, useEffect } from 'react';
import {
  getOptimizedImageUrl,
  getBlurPlaceholder,
  cloudinarySrcSet,
  localPathToPublicId,
  shouldUseCloudinary,
  type CloudinaryOptions,
} from '../utils/cloudinary';

interface CloudinaryImageProps {
  src: string; // Local path like /images/project/image.webp
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string; // Responsive sizes attribute
  priority?: boolean; // Skip lazy loading for above-the-fold images
  quality?: CloudinaryOptions['quality'];
  crop?: CloudinaryOptions['crop'];
  onClick?: () => void;
  draggable?: boolean;
}

/**
 * CloudinaryImage - Optimized image component with CDN delivery
 *
 * Features:
 * - Automatic WebP/AVIF format selection
 * - Responsive srcSet generation
 * - LQIP blur placeholder
 * - Lazy loading with Intersection Observer
 * - Falls back to local images in development
 */
const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  quality = 'auto',
  crop = 'fill',
  onClick,
  draggable = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  const useCloudinary = shouldUseCloudinary();

  // Generate URLs
  const optimizedSrc = getOptimizedImageUrl(src, { width, height, quality, crop });
  const blurPlaceholder = useCloudinary ? getBlurPlaceholder(src) : '';

  // Generate srcSet for responsive images (only in production with Cloudinary)
  const srcSet = useCloudinary
    ? cloudinarySrcSet(localPathToPublicId(src), [400, 800, 1200, 1600, 2000], {
        quality,
        crop,
        height: height ? undefined : undefined, // Keep aspect ratio
      })
    : undefined;

  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Determine background color based on image type
  const bgColor = src.includes('dark') ? '#1a1a1a' : '#f3f4f6';

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {/* LQIP Blur placeholder */}
      {!isLoaded && blurPlaceholder && (
        <img
          src={blurPlaceholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Skeleton placeholder (fallback when no blur available) */}
      {!isLoaded && !blurPlaceholder && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: bgColor }}
        />
      )}

      {/* Main image - only load when in view */}
      {isInView && (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          draggable={draggable}
          onClick={onClick}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

export default CloudinaryImage;
