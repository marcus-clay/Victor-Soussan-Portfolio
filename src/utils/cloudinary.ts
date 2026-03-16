/// <reference types="vite/client" />

/**
 * Cloudinary Image Optimization Utility
 *
 * Generates optimized image URLs with automatic:
 * - Format selection (WebP/AVIF based on browser support)
 * - Quality optimization
 * - Responsive sizing
 * - Lazy loading placeholders (LQIP)
 */

const CLOUD_NAME = 'dqohphelh';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'pad';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  dpr?: 'auto' | number;
  blur?: number; // For LQIP placeholder
}

/**
 * Generate optimized Cloudinary URL
 * @param publicId - The image public ID (path in Cloudinary)
 * @param options - Transformation options
 */
export function cloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    dpr = 'auto',
    blur,
  } = options;

  const transformations: string[] = [];

  // Format and quality (always apply for optimization)
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  // DPR for retina displays
  if (dpr) {
    transformations.push(`dpr_${dpr}`);
  }

  // Dimensions
  if (width) {
    transformations.push(`w_${width}`);
  }
  if (height) {
    transformations.push(`h_${height}`);
  }

  // Crop and gravity
  if (width || height) {
    transformations.push(`c_${crop}`);
    transformations.push(`g_${gravity}`);
  }

  // Blur for LQIP
  if (blur) {
    transformations.push(`e_blur:${blur}`);
  }

  const transformString = transformations.join(',');
  return `${BASE_URL}/${transformString}/${publicId}`;
}

/**
 * Generate a tiny blurred placeholder URL (LQIP)
 * Returns a very small, blurred version for instant loading
 */
export function cloudinaryBlurUrl(publicId: string, width = 20): string {
  return cloudinaryUrl(publicId, {
    width,
    quality: 'auto:low',
    blur: 1000,
    format: 'auto',
  });
}

/**
 * Generate responsive image srcSet for different screen sizes
 */
export function cloudinarySrcSet(
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600, 2000],
  options: Omit<CloudinaryOptions, 'width'> = {}
): string {
  return widths
    .map(w => `${cloudinaryUrl(publicId, { ...options, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Map local image path to Cloudinary public ID
 * Converts: /images/project/image.webp → portfolio/project/image
 */
export function localPathToPublicId(localPath: string): string {
  // Remove leading slash and /images/ prefix
  let path = localPath.replace(/^\//, '').replace(/^images\//, '');

  // Remove file extension
  path = path.replace(/\.(webp|jpg|jpeg|png|gif|svg)$/i, '');

  // Add portfolio folder prefix
  return `portfolio/${path}`;
}

/**
 * Check if we should use Cloudinary (production) or local (development)
 */
export function shouldUseCloudinary(): boolean {
  // Use Cloudinary in production, local images in development for faster iteration
  return import.meta.env.PROD;
}

/**
 * Get optimized image URL - uses Cloudinary in prod, local in dev
 */
export function getOptimizedImageUrl(
  localPath: string,
  options: CloudinaryOptions = {}
): string {
  if (!shouldUseCloudinary()) {
    return localPath; // Use local path in development
  }

  const publicId = localPathToPublicId(localPath);
  return cloudinaryUrl(publicId, options);
}

/**
 * Get blur placeholder URL
 */
export function getBlurPlaceholder(localPath: string): string {
  if (!shouldUseCloudinary()) {
    return ''; // No placeholder in development
  }

  const publicId = localPathToPublicId(localPath);
  return cloudinaryBlurUrl(publicId);
}

// Preset configurations for common use cases
export const presets = {
  thumbnail: { width: 400, height: 300, crop: 'fill' as const, quality: 'auto:good' as const },
  card: { width: 800, height: 600, crop: 'fill' as const, quality: 'auto' as const },
  hero: { width: 1600, quality: 'auto:best' as const },
  avatar: { width: 100, height: 100, crop: 'fill' as const, gravity: 'face' as const },
  gallery: { width: 1200, quality: 'auto' as const },
} as const;
