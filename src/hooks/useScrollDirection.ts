import { useState, useEffect, useRef } from 'react'

/**
 * Detects scroll direction with a threshold to avoid jitter.
 * Returns 'down' when user scrolls down past threshold, 'up' otherwise.
 */
export function useScrollDirection(threshold = 5) {
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - lastScrollY.current

      if (Math.abs(diff) >= threshold) {
        setIsScrollingDown(diff > 0 && currentY > 100)
        lastScrollY.current = currentY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrollingDown
}
