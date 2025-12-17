import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
}

/**
 * ResponsiveImage - Automatically uses srcset for optimized loading
 *
 * For images with responsive versions (-400w, -800w, -1200w), this component
 * will automatically load the appropriate size based on viewport.
 *
 * Example: src="/images/thumbnail-toolkit.webp"
 * Will generate srcset with -400w.webp, -800w.webp, -1200w.webp versions
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy',
  draggable = false,
}) => {
  // Check if this image has responsive versions
  const hasResponsiveVersions = (path: string): boolean => {
    // List of images with generated responsive versions
    const responsiveImages = [
      'thumbnail-toolkit',
      'thumbnail-connect',
      'thumbnail-sqool-suite',
      'thumbnail-dailymotion-web-platform',
      'thumbnail-pagesjaunes-multidevices',
      'thumbnail_france_vae',
      'thumbnail_france_vae_02',
      'thumbnail_toolkit_02',
      'thubmnail_dailymotion_03',
    ];
    return responsiveImages.some(name => path.includes(name));
  };

  // Generate srcset if responsive versions exist
  const generateSrcSet = (imageSrc: string): string | undefined => {
    if (!hasResponsiveVersions(imageSrc)) {
      return undefined;
    }

    // Extract base path and extension
    const lastDot = imageSrc.lastIndexOf('.');
    const basePath = imageSrc.substring(0, lastDot);
    const ext = imageSrc.substring(lastDot);

    // Generate srcset for 400w, 800w, 1200w
    return `${basePath}-400w${ext} 400w, ${basePath}-800w${ext} 800w, ${basePath}-1200w${ext} 1200w`;
  };

  const srcSet = generateSrcSet(src);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      draggable={draggable}
    />
  );
};

export default ResponsiveImage;
