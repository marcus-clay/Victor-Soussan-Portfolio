import type { KeyboardEvent, MouseEvent } from 'react'

/**
 * Props that make a non-button element (a figure, a card wrapper) behave as a button:
 * focusable, announced as a button, and activated by Enter and Space like a click.
 * Used for media that open the lightbox, where the wrapper can contain its own controls
 * (a video pause button), so key events coming from a child are left alone.
 */
export function zoomable(onActivate: (event?: MouseEvent<HTMLElement>) => void) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    onClick: (event: MouseEvent<HTMLElement>) => onActivate(event),
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onActivate()
      }
    },
  }
}
