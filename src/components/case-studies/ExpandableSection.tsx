import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';

interface ExpandableSectionProps {
  children: React.ReactNode;
  /** Background color for gradient fade (must match the page background). Defaults to white. */
  gradientFrom?: string;
  /** Approximate collapsed height in rem. Defaults to 8. */
  previewRem?: number;
  expandLabel?: string;
  collapseLabel?: string;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * ExpandableSection — progressive disclosure for long prose/list content.
 *
 * Uses Framer Motion height animation (not max-height) to avoid layout/paint jank.
 * Gradient fade masks truncated content. +/− toggle instead of rotating chevron.
 */
const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  children,
  gradientFrom = '#FDFDFC',
  previewRem = 8,
  expandLabel = 'Read more',
  collapseLabel = 'Show less',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <div className="relative">
        {/* Collapsed: fixed height container; Expanded: full height via AnimatePresence */}
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ height: `${previewRem}rem`, opacity: 0.8 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: `${previewRem}rem`, opacity: 0.8 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      height: { duration: 0.28, ease: EASE_OUT },
                      opacity: { duration: 0.2, ease: EASE_OUT },
                    }
              }
              style={{ overflow: 'hidden' }}
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={false}
              style={{ height: `${previewRem}rem`, overflow: 'hidden' }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient fade — only visible when collapsed */}
        <AnimatePresence initial={false}>
          {!isExpanded && (
            <motion.div
              key="fade"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${gradientFrom}, transparent)`,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded(v => !v)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 active:scale-[0.97]"
      >
        {isExpanded ? collapseLabel : expandLabel}
        <span className="flex items-center justify-center">
          {isExpanded
            ? <Minus size={13} weight="bold" />
            : <Plus size={13} weight="bold" />
          }
        </span>
      </button>
    </div>
  );
};

export default ExpandableSection;
