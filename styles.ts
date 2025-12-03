/**
 * Design System Styles
 * Centralized style constants for consistent UI across the site
 */

/**
 * CLICKABLE IMAGE HOVER EFFECT
 *
 * Standard hover effect for clickable images across the site.
 * The entire container scales up slightly (1.01 = 1%) on hover,
 * giving a subtle "lift" effect without zooming into the image content.
 *
 * Usage:
 * - Apply to the container div (not the img element)
 * - Container should have: rounded-2xl overflow-hidden cursor-pointer
 * - Add: transition-transform hover:scale-[1.01]
 *
 * Example:
 * <div
 *   className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
 *   onClick={() => openLightbox(imageSrc)}
 * >
 *   <img src={imageSrc} className="w-full h-auto object-cover" />
 * </div>
 */
export const IMAGE_HOVER_SCALE = 'transition-transform hover:scale-[1.01]';

// Full clickable image container classes
export const CLICKABLE_IMAGE_CONTAINER = 'rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]';
