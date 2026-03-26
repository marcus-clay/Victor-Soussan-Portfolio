'use client'

/**
 * CaseStudyTOCBar - Dropdown TOC bar (mobile pattern, all viewports).
 * Collapsed: current section label + chevron, fits in h-10 swap container.
 * Expanded: portal dropdown with all sections, GPU-animated via scaleY.
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
  isDark: boolean
  lang: 'en' | 'fr'
}

const DROPDOWN_ID = 'toc-dropdown'

const CaseStudyTOCBar: React.FC<CaseStudyTOCBarProps> = ({
  sections,
  activeSection,
  onSectionClick,
  isDark,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownTop, setDropdownTop] = useState(0)

  const currentIndex = sections.findIndex(s => s.id === activeSection)
  const currentLabel = sections.find(s => s.id === activeSection)?.label || sections[0]?.label || ''

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
        // Return focus to trigger
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
    setIsExpanded(false)
    onSectionClick(sectionId)
  }

  // Handle keyboard navigation inside dropdown
  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
      next?.[Math.min(index + 1, sections.length - 1)]?.focus()
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
    }
  }

  // Portal dropdown (GPU-animated with clip-path: no text distortion, no layout thrash)
  const dropdown = typeof document !== 'undefined' && createPortal(
    <div
      ref={dropdownRef}
      id={DROPDOWN_ID}
      role="menu"
      aria-label="Table of contents"
      className={`fixed left-0 right-0 z-50 ${
        isDark
          ? 'bg-[#0a0a0a]/95 shadow-2xl shadow-black/40'
          : 'bg-[#FCFCFD]/95 shadow-lg shadow-black/8'
      } backdrop-blur-xl`}
      style={{
        top: dropdownTop,
        clipPath: isExpanded ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        opacity: isExpanded ? 1 : 0,
        transition: isExpanded
          ? 'clip-path 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms ease 20ms'
          : 'clip-path 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 120ms ease',
        pointerEvents: isExpanded ? 'auto' : 'none',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className={`py-2 space-y-0.5 border-t ${
          isDark ? 'border-white/5' : 'border-gray-100'
        }`}>
          {sections.map((section, index) => {
            const isActive = activeSection === section.id
            const isPast = index < currentIndex

            return (
              <button
                key={section.id}
                role="menuitem"
                tabIndex={isExpanded ? 0 : -1}
                onClick={() => handleSectionClick(section.id)}
                onKeyDown={(e) => handleItemKeyDown(e, index)}
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3
                  active:scale-[0.98]
                  ${isActive
                    ? isDark
                      ? 'bg-white/5 text-white'
                      : 'bg-gray-50 text-gray-900'
                    : isDark
                      ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                style={{
                  transition: 'color 150ms ease, background-color 150ms ease, transform 100ms cubic-bezier(0.23, 1, 0.32, 1)',
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? 'translateY(0)' : 'translateY(-4px)',
                  transitionDelay: isExpanded ? `${index * 30}ms` : '0ms',
                  transitionProperty: 'color, background-color, transform, opacity',
                  transitionDuration: isExpanded ? '150ms, 150ms, 200ms, 180ms' : '150ms, 150ms, 120ms, 80ms',
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
                <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {section.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <>
      <div ref={barRef} className="relative h-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-full">
          <button
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={DROPDOWN_ID}
            aria-haspopup="menu"
            className={`w-full h-full flex items-center justify-between rounded-lg
              active:scale-[0.98]
              ${isExpanded
                ? isDark ? 'bg-white/5' : 'bg-gray-50'
                : ''
              }`}
            style={{
              transition: 'background-color 150ms ease, transform 100ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-[#2D5CF3] flex-shrink-0" />
              <span
                className={`text-sm font-medium truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {currentLabel}
              </span>
              <span
                className={`text-xs tabular-nums flex-shrink-0 ${
                  isDark ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                · {currentIndex + 1}/{sections.length}
              </span>
            </div>
            <div
              className="flex-shrink-0 ml-2"
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <CaretDown
                size={14}
                weight="bold"
                className={isDark ? 'text-gray-500' : 'text-gray-400'}
              />
            </div>
          </button>
        </div>
      </div>

      {dropdown}
    </>
  )
}

export default CaseStudyTOCBar
