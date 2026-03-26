/**
 * CaseStudyTOCSidebar - Reusable Table of Contents sidebar for case studies
 * - Desktop: Persistent left-side navigation with collapse/expand functionality
 * - Mobile: Horizontal bar under header with dropdown
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft as ChevronLeft, CaretDown as ChevronDown, List } from '@phosphor-icons/react';

interface TOCSection {
  id: string;
  label: string;
}

interface CaseStudyTOCSidebarProps {
  sections: TOCSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isDark: boolean;
  isVisible: boolean;
  lang: 'en' | 'fr';
}

const CaseStudyTOCSidebar: React.FC<CaseStudyTOCSidebarProps> = ({
  sections,
  activeSection,
  onSectionClick,
  isDark,
  isVisible,
  lang,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate progress through sections
  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const progress = sections.length > 1 ? (currentIndex / (sections.length - 1)) * 100 : 0;

  // Handle section click in collapsed mode - expand first
  const handleCollapsedSectionClick = (sectionId: string) => {
    setIsCollapsed(false);
    // Small delay to let the expansion animation start before scrolling
    setTimeout(() => {
      onSectionClick(sectionId);
    }, 50);
  };

  // Handle section click in mobile mode
  const handleMobileSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileExpanded(false);
  };

  if (!isVisible) return null;

  // Mobile version - horizontal bar under header
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`fixed left-0 right-0 z-30 backdrop-blur-xl ${
          isDark
            ? 'bg-[#0a0a0a]/80'
            : 'bg-white/80'
        }`}
        style={{ top: 'var(--nav-height, 72px)', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {/* Collapsed state - shows current section */}
        <div className="w-full px-6">
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="w-full h-12 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2D5CF3]" />
              <span
                className={`text-sm font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {sections.find(s => s.id === activeSection)?.label || 'Top'}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isMobileExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                size={20}
                className={isDark ? 'text-gray-400' : 'text-gray-500'}
              />
            </motion.div>
          </button>

          {/* Expanded state - shows all sections */}
          <AnimatePresence>
            {isMobileExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className={`pb-3 space-y-1 border-t ${
                  isDark ? 'border-white/5' : 'border-gray-100'
                }`}>
                  {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const isPast = index < currentIndex;

                    return (
                      <button
                        key={section.id}
                        onClick={() => handleMobileSectionClick(section.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 transition-colors ${
                          isActive
                            ? isDark
                              ? 'bg-[#2D5CF3]/10 text-[#2D5CF3]'
                              : 'bg-blue-50 text-[#2D5CF3]'
                            : isDark
                              ? 'text-gray-400 hover:bg-white/5'
                              : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive
                              ? 'bg-[#2D5CF3]'
                              : isPast
                                ? isDark
                                  ? 'bg-gray-500'
                                  : 'bg-gray-400'
                                : isDark
                                  ? 'bg-gray-700'
                                  : 'bg-gray-300'
                          }`}
                        />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Desktop version - left sidebar
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="fixed left-0 z-30 flex"
        style={{ top: 'var(--nav-height, 72px)', height: 'calc(100vh - var(--nav-height, 72px))', transition: 'top 250ms cubic-bezier(0.23, 1, 0.32, 1), height 250ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {/* Sidebar Container */}
        <motion.div
          animate={{ width: isCollapsed ? 48 : 200 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`h-full flex flex-col ${
            isDark
              ? 'bg-[#0a0a0a]/95 border-r border-white/5'
              : 'bg-white/95 border-r border-gray-100'
          } backdrop-blur-xl`}
        >
          {/* Collapsed state - vertical progress bar with dots */}
          {isCollapsed ? (
            <div className="flex-1 flex flex-col items-center py-6">
              {/* Expand button */}
              <button
                onClick={() => setIsCollapsed(false)}
                className={`p-2 rounded-lg mb-4 transition-colors ${
                  isDark
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
                title={lang === 'fr' ? 'Développer le menu' : 'Expand menu'}
              >
                <List size={20} />
              </button>

              {/* Vertical progress track */}
              <div className="flex-1 relative flex flex-col items-center w-full px-4">
                {/* Progress line background */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-0.5 h-full ${
                    isDark ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                />

                {/* Progress line filled */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-[#2D5CF3] origin-top"
                  style={{ height: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />

                {/* Section dots */}
                <div className="relative flex flex-col justify-between h-full w-full py-2">
                  {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const isPast = index < currentIndex;

                    return (
                      <button
                        key={section.id}
                        onClick={() => handleCollapsedSectionClick(section.id)}
                        className="relative flex items-center justify-center group"
                        title={section.label}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? 1.3 : 1,
                            backgroundColor: isActive
                              ? '#2D5CF3'
                              : isPast
                                ? isDark ? '#6B7280' : '#9CA3AF'
                                : isDark ? '#374151' : '#D1D5DB',
                          }}
                          className="w-2.5 h-2.5 rounded-full z-10"
                          transition={{ duration: 0.2 }}
                        />

                        {/* Tooltip on hover */}
                        <div
                          className={`absolute left-8 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                            isDark
                              ? 'bg-white/10 text-white'
                              : 'bg-gray-900 text-white'
                          }`}
                        >
                          {section.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Expanded state - full section list */
            <div className="flex-1 flex flex-col py-4 overflow-y-auto">
              {/* Collapse button */}
              <div className="px-3 mb-3 flex justify-end">
                <button
                  onClick={() => setIsCollapsed(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                  }`}
                  title={lang === 'fr' ? 'Réduire le menu' : 'Collapse menu'}
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              {/* Section list */}
              <nav className="flex-1 px-3 space-y-1">
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  const isPast = index < currentIndex;

                  return (
                    <button
                      key={section.id}
                      onClick={() => onSectionClick(section.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                        isActive
                          ? isDark
                            ? 'bg-[#2D5CF3]/15 text-[#2D5CF3]'
                            : 'bg-blue-50 text-[#2D5CF3]'
                          : isDark
                            ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {/* Progress indicator dot */}
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#2D5CF3]'
                            : isPast
                              ? isDark
                                ? 'bg-gray-500'
                                : 'bg-gray-400'
                              : isDark
                                ? 'bg-gray-700'
                                : 'bg-gray-300'
                        }`}
                      />
                      <span className="text-sm font-medium truncate">
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Progress indicator at bottom */}
              <div className="px-4 pt-4 mt-auto">
                <div
                  className={`text-xs font-medium mb-2 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {currentIndex + 1} / {sections.length}
                </div>
                <div
                  className={`h-1 rounded-full overflow-hidden ${
                    isDark ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                >
                  <motion.div
                    className="h-full bg-[#2D5CF3] rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudyTOCSidebar;
