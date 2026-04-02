import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CaretRight } from '@phosphor-icons/react';

export interface AccordionPhase {
  title: string;
  period?: string;
  goal?: string;
  deliverables: string[];
}

interface PhaseAccordionProps {
  phases: AccordionPhase[];
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * PhaseAccordion — collapsible phase list for case study journey sections.
 *
 * Each phase shows as a clickable header (title + period + chevron).
 * The first phase is open by default; all others are collapsed.
 * Each phase can be toggled independently.
 */
const PhaseAccordion: React.FC<PhaseAccordionProps> = ({ phases }) => {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));
  const prefersReduced = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="divide-y divide-gray-100">
      {phases.map((phase, idx) => {
        const isOpen = openSet.has(idx);

        return (
          <div key={idx}>
            {/* Header row — clickable trigger */}
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-3 text-left transition-transform duration-100 active:scale-[0.995]"
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                  {phase.title}
                </span>
                {phase.period && (
                  <span className="text-xs text-gray-400 shrink-0">{phase.period}</span>
                )}
              </div>
              <CaretRight
                size={14}
                weight="bold"
                className={[
                  'shrink-0 text-gray-400',
                  'transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
                  isOpen ? 'rotate-90' : 'rotate-0',
                ].join(' ')}
              />
            </button>

            {/* Collapsible content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.22, ease: EASE_OUT },
                          opacity: { duration: 0.16, ease: EASE_OUT },
                        }
                  }
                  style={{ overflow: 'hidden' }}
                >
                  <div className="pb-5">
                    {phase.goal && (
                      <p className="text-base text-gray-500 mb-3 max-w-[65ch]">{phase.goal}</p>
                    )}
                    <div className="divide-y divide-gray-100">
                      {phase.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="py-2.5 text-base text-gray-500 leading-relaxed"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default PhaseAccordion;
