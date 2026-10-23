'use client'

import { useEffect, useState } from 'react'
import CaseStudyTOCBar from '@/components/CaseStudyTOCBar'
import { scrollToElement } from '@/utils/smoothScroll'

/**
 * Sticky table of contents of the Approach page: the same bar as the case studies (current act,
 * counter, dropdown with a progress line), under the header. It slides in once the reader has left
 * the top of the page, and follows the act that is currently at the top of the window.
 *
 * The wrapper has no height of its own (h-0): the bar is absolutely placed inside it, so the page
 * keeps its exact layout while the bar is hidden.
 */
export default function ApprocheToc({
  sections,
  lang,
}: {
  sections: { id: string; label: string }[]
  lang: 'en' | 'fr'
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const first = sections[0]?.id
    const onScroll = () => {
      setShown(window.scrollY > 300)
      // The last act whose top has crossed the line under the header is the current one
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i].id)
          return
        }
      }
      if (first) setActive(first)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  return (
    <div
      className="sticky z-10 h-0"
      style={{ top: 'var(--nav-height, 64px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <div
        className="absolute inset-x-0 top-0 bg-[#FDFDFC]/80 backdrop-blur-xl"
        style={{
          transform: shown ? 'translateY(0)' : 'translateY(-8px)',
          opacity: shown ? 1 : 0,
          // Out of the tab order and the accessibility tree while hidden
          visibility: shown ? 'visible' : 'hidden',
          pointerEvents: shown ? 'auto' : 'none',
          transition: shown
            ? 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease, visibility 0s'
            : 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease, visibility 0s linear 200ms',
        }}
      >
        <CaseStudyTOCBar
          sections={sections}
          activeSection={active}
          onSectionClick={scrollToElement}
          isDark={false}
          lang={lang}
        />
      </div>
    </div>
  )
}
