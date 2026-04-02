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
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [pressedSection, setPressedSection] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownTop, setDropdownTop] = useState(0)

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
    // Brief press flash, then close and scroll
    setPressedSection(sectionId)
    setTimeout(() => {
      setPressedSection(null)
      setIsExpanded(false)
      onSectionClick(sectionId)
    }, 120)
  }

  // Keyboard navigation inside dropdown
  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
      items?.[Math.min(index + 1, sections.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
      items?.[Math.max(index - 1, 0)]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      dropdownRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const items = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
      items?.[items.length - 1]?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSectionClick(sections[index].id)
    }
  }

  // Portal dropdown — solid bg, no glass
  const dropdown = typeof document !== 'undefined' && createPortal(
    <div
      ref={dropdownRef}
      id={DROPDOWN_ID}
      role="menu"
      aria-label="Table of contents"
      className="fixed left-0 right-0 z-50 bg-[#FDFDFC]"
      style={{
        top: dropdownTop,
        clipPath: isExpanded ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        opacity: isExpanded ? 1 : 0,
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.07)',
        transition: isExpanded
          ? 'clip-path 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease 20ms'
          : 'clip-path 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 100ms ease',
        pointerEvents: isExpanded ? 'auto' : 'none',
      }}
    >
      <div className="max-w-[740px] mx-auto px-6">
        <div className="py-2 border-t border-gray-100">
          {/* Section list with vertical progress line */}
          <div className="relative">
            {/* Track line — full height background */}
            {sections.length > 1 && (
              <div
                className="absolute w-px bg-gray-100"
                style={{ left: 16, top: 18, bottom: 18 }}
                aria-hidden="true"
              />
            )}
            {/* Progress fill — scaleY from top */}
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
                  role="menuitem"
                  tabIndex={isExpanded ? 0 : -1}
                  onClick={() => handleSectionClick(section.id)}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  className={`w-full text-left py-2 pl-3 pr-3 rounded-lg flex items-center gap-3
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1
                    ${isActive
                      ? 'text-gray-900'
                      : 'text-gray-500'
                    }
                    ${isPressed
                      ? 'bg-gray-100'
                      : isActive
                        ? 'bg-gray-50 hover:bg-gray-100'
                        : 'hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  style={{
                    transition: 'color 100ms ease, background-color 100ms ease, transform 80ms cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
                    opacity: isExpanded ? 1 : 0,
                    transitionDelay: isExpanded ? `${index * 20}ms` : '0ms',
                  }}
                >
                  {/* Dot on progress line */}
                  <div
                    className={`relative z-10 flex-shrink-0 rounded-full ring-2 ring-[#FDFDFC] transition-all duration-200 ${
                      isActive
                        ? 'w-2 h-2 bg-gray-900'
                        : isPast
                          ? 'w-1.5 h-1.5 bg-gray-400'
                          : 'w-1.5 h-1.5 bg-gray-200'
                    }`}
                  />
                  <span className={`text-sm leading-snug ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {section.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <>
      <div ref={barRef} className="relative h-10">
        <div className="max-w-[740px] mx-auto px-6 h-full">
          <button
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={DROPDOWN_ID}
            aria-haspopup="menu"
            className={`w-full h-full flex items-center justify-between rounded-lg
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1
              active:scale-[0.98]
              ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
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
              <span className="text-xs tabular-nums flex-shrink-0 text-gray-400">
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
              <CaretDown size={14} weight="bold" className="text-gray-400" />
            </div>
          </button>
        </div>
      </div>

      {dropdown}
    </>
  )
}

export default CaseStudyTOCBar
