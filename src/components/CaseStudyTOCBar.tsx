'use client'

/**
 * CaseStudyTOCBar - Dropdown TOC bar (mobile pattern, all viewports).
 * Collapsed: current section label + fraction counter + chevron.
 * Expanded: portal dropdown with vertical progress line and polished interactions.
 */

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CaretDown } from '@phosphor-icons/react'

interface TOCSection {
  id: string
  label: string
}

interface CaseStudyTOCBarProps {
  sections: TOCSection[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
  isDark?: boolean  // kept for API compat, always light
  lang: 'en' | 'fr'
}

const DROPDOWN_ID = 'toc-dropdown'

const CaseStudyTOCBar: React.FC<CaseStudyTOCBarProps> = ({
  sections,
  activeSection,
  onSectionClick,
  lang,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [pressedSection, setPressedSection] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownTop, setDropdownTop] = useState(0)
  // The dropdown is portaled to document.body, which only exists on the client. Rendering it on the
  // first client pass would not match the server HTML and React would drop the server-rendered page.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const currentIndex = sections.findIndex(s => s.id === activeSection)
  const currentLabel = sections.find(s => s.id === activeSection)?.label || sections[0]?.label || ''
  const progressRatio = sections.length <= 1 ? 0 : currentIndex / (sections.length - 1)

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        barRef.current && !barRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isExpanded])

  // Close on scroll
  useEffect(() => {
    if (!isExpanded) return
    const close = () => setIsExpanded(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [isExpanded])

  // Close on Escape
  useEffect(() => {
    if (!isExpanded) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false)
        barRef.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isExpanded])

  const handleToggle = () => {
    if (!isExpanded && barRef.current) {
      setDropdownTop(barRef.current.getBoundingClientRect().bottom)
    }
    setIsExpanded(prev => !prev)
  }

  const handleSectionClick = (sectionId: string) => {
    // Brief press flash, then close and scroll. Kept short: the wait is latency the visitor feels.
    setPressedSection(sectionId)
    setTimeout(() => {
      setPressedSection(null)
      setIsExpanded(false)
      onSectionClick(sectionId)
    }, 80)
  }

  // Keyboard navigation inside dropdown
  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[data-toc-item]')
      items?.[Math.min(index + 1, sections.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[data-toc-item]')
      items?.[Math.max(index - 1, 0)]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      dropdownRef.current?.querySelector<HTMLButtonElement>('[data-toc-item]')?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[data-toc-item]')
      items?.[items.length - 1]?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSectionClick(sections[index].id)
    }
  }

  // Portal dropdown: solid bg, no glass
  const dropdown = mounted && createPortal(
    <nav
      ref={dropdownRef}
      id={DROPDOWN_ID}
      aria-label={lang === 'fr' ? 'Sommaire' : 'Table of contents'}
      className="fixed left-0 right-0 z-50 bg-white/90 backdrop-blur-xl"
      style={{
        top: dropdownTop,
        clipPath: isExpanded ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        opacity: isExpanded ? 1 : 0,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        transition: isExpanded
          ? 'clip-path 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease 20ms'
          : 'clip-path 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 100ms ease, visibility 0s linear 160ms',
        pointerEvents: isExpanded ? 'auto' : 'none',
        // Out of the tab order and the accessibility tree once the close transition ends
        visibility: isExpanded ? 'visible' : 'hidden',
      }}
    >
      <div className="wrap">
        <div className="py-2 border-t border-gray-100">
          {/* Section list with vertical progress line */}
          <div className="relative">
            {/* Track line: full height background */}
            {sections.length > 1 && (
              <div
                className="absolute w-px bg-gray-100"
                style={{ left: 16, top: 18, bottom: 18 }}
                aria-hidden="true"
              />
            )}
            {/* Progress fill: scaleY from top */}
            {sections.length > 1 && (
              <div
                className="absolute w-px bg-gray-300 origin-top"
                style={{
                  left: 16,
                  top: 18,
                  bottom: 18,
                  transform: `scaleY(${progressRatio})`,
                  transition: 'transform 350ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                aria-hidden="true"
              />
            )}

            {sections.map((section, index) => {
              const isActive = activeSection === section.id
              const isPast = index < currentIndex
              const isPressed = pressedSection === section.id

              return (
                <button
                  key={section.id}
                  data-toc-item
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => handleSectionClick(section.id)}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  className={`w-full text-left py-2 pl-3 pr-3 rounded-lg flex items-center gap-3 active:[scale:0.98]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1
                    ${isActive
                      ? 'text-gray-900'
                      : 'text-gray-500'
                    }
                    ${isPressed
                      ? 'bg-black/[0.06]'
                      : isActive
                        ? 'bg-black/[0.04] hover:bg-black/[0.06]'
                        : 'hover:bg-black/[0.04] hover:text-gray-900'
                    }`}
                  style={{
                    // The stagger belongs to opacity only: a delay on the whole list would also
                    // hold back hover and press colours on the lower rows.
                    transition: `color 60ms ease, background-color 60ms ease, scale 80ms cubic-bezier(0.23, 1, 0.32, 1), opacity 140ms ease ${isExpanded ? index * 20 : 0}ms`,
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  {/* Dot on progress line: fixed 8px slot centred on the line, the dot scales
                      inside it, so changing the active section never shifts the label */}
                  <div className="relative z-10 flex-shrink-0 w-2 h-2">
                    <div
                      className={`absolute inset-0 rounded-full ring-2 ring-white/80 transition-[transform,background-color] duration-200 ease-out ${
                        isActive
                          ? 'scale-100 bg-gray-900'
                          : isPast
                            ? 'scale-75 bg-gray-400'
                            : 'scale-75 bg-gray-200'
                      }`}
                    />
                  </div>
                  <span className={`text-sm leading-snug ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {section.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>,
    document.body
  )

  return (
    <>
      <div ref={barRef} className="relative h-10">
        <div className="wrap h-full">
          <button
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={DROPDOWN_ID}
            className={`w-full h-full flex items-center justify-between rounded-lg pl-1 pr-[10px]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1
              active:scale-[0.98]
              ${isExpanded ? 'bg-black/[0.06]' : 'hover:bg-black/[0.04]'}`}
            style={{
              transition: 'background-color 100ms ease, transform 80ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              {/* Active section indicator dot */}
              <div className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0" />
              {/* Current label */}
              <span className="text-sm font-medium text-gray-900 truncate">
                {currentLabel}
              </span>
              {/* Fraction counter */}
              <span className="text-xs tabular-nums flex-shrink-0 text-gray-500">
                · {currentIndex + 1}/{sections.length}
              </span>
            </div>
            {/* Chevron */}
            <div
              className="flex-shrink-0 ml-2"
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <CaretDown size={14} weight="bold" className="text-gray-500" />
            </div>
          </button>
        </div>
      </div>

      {dropdown}
    </>
  )
}

export default CaseStudyTOCBar
