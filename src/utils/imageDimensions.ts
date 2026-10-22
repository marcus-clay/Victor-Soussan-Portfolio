import { IMAGE_DIMENSIONS } from '@/data/imageDimensions'

/**
 * Natural size of a local image, as img width and height attributes. With both set the
 * browser reserves the image's box before it loads, so lazy images no longer push the page
 * down (and in-page links land on the right section). Unknown sources get no attributes.
 */
export function imgDims(src: string | undefined): { width?: number; height?: number } {
  if (!src) return {}
  let key = src.split('?')[0].split('#')[0]
  try {
    key = decodeURIComponent(key)
  } catch {
    // keep the raw path
  }
  const size = IMAGE_DIMENSIONS[key]
  return size ? { width: size[0], height: size[1] } : {}
}
