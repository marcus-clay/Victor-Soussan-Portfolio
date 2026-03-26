'use client'

/**
 * CaseStudyTOCBar - Horizontal TOC bar that swaps with breadcrumb on scroll.
 * Pills with colored dots, sliding underline on active section.
 */

import React, { useEffect, useRef, useState } from 'react'

interface TOCSection {
  id: string
  label: string
}

interface CaseStudyTOCBarProps {
  sections: TOCSection[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  isDark: boolean
  lang: 'en' | 'fr'
}

const CaseStudyTOCBar: React.FC<CaseStudyTOCBarProps> = ({
  sections,
  activeSection,
  onSectionClick,
  isDark,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)
  const [underline, setUnderline] = useState({ left: 0, width: 0 })

  // Auto-scroll to keep active pill visible + measure underline position
  useEffect(() => {
    if (!activeRef.current || !scrollRef.current) return
    const container = scrollRef.current
    const el = activeRef.current

    // Center active pill in scroll viewport
    const targetScroll = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
    if (Math.abs(targetScroll - container.scrollLeft) > 40) {
      container.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }

    // Position the sliding underline relative to scroll container
    setUnderline({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeSection])

  const currentIndex = sections.findIndex(s => s.id === activeSection)

  return (
    <div className="relative h-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-full">
        {/* Horizontal pill strip */}
        <div
          ref={scrollRef}
          className="relative flex items-center gap-0.5 overflow-x-auto h-full scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section, index) => {
            const isActive = activeSection === section.id
            const isPast = index < currentIndex

            return (
              <button
                key={section.id}
                ref={isActive ? activeRef : undefined}
                onClick={() => onSectionClick(section.id)}
                className={`
                  flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  text-xs whitespace-nowrap
                  ${isActive
                    ? isDark
                      ? 'text-white font-semibold'
                      : 'text-gray-900 font-semibold'
                    : isDark
                      ? 'text-gray-500 font-medium hover:text-gray-300'
                      : 'text-gray-400 font-medium hover:text-gray-600'
                  }
                `}
                style={{
                  transition: 'color 150ms ease, transform 100ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isActive
                      ? 'bg-[#2D5CF3]'
                      : isPast
                        ? isDark ? 'bg-gray-500' : 'bg-gray-400'
                        : isDark ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  style={{ transition: 'background-color 150ms ease' }}
                />
                {section.label}
              </button>
            )
          })}

          {/* Sliding underline indicator */}
          <div
            className="absolute bottom-0 h-[2px] bg-[#2D5CF3] rounded-full"
            style={{
              left: underline.left,
              width: underline.width,
              transition: 'left 280ms cubic-bezier(0.23, 1, 0.32, 1), width 280ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          />
        </div>
      </div>

      {/* Subtle bottom separator */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />
    </div>
  )
}

export default CaseStudyTOCBar
