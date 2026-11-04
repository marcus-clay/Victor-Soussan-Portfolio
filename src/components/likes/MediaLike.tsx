'use client'

import LikeButton from './LikeButton'
import { isMediaKey, mediaKey } from '@/lib/mediaKey'

/**
 * The like pill of a visual, from the `src` of the file. Put it as a DIRECT child of the element that
 * tightly wraps the visual (the frame that clips it, not a button: a button cannot hold a button),
 * after the picture. Draws nothing for a path that gives no valid key.
 */
export default function MediaLike({ src, className }: { src: string; className?: string }) {
  const key = mediaKey(src)
  if (!isMediaKey(key)) return null
  return <LikeButton mediaKey={key} className={className} />
}
