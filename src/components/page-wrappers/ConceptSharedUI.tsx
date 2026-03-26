'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CaretRight, Quotes, X, TreeStructure, MapPin, BookOpen, Article, Layout } from '@phosphor-icons/react';
import { scrollToElement } from '@/utils/smoothScroll';

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };
const springBounce = { type: 'spring' as const, stiffness: 400, damping: 25 };
const fontFamily = "'Public Sans', system-ui, sans-serif";

/* ═══════════════════════════════════════════════════════
   1. SCROLL PROGRESS (thin bar at top of nav)
   ═══════════════════════════════════════════════════════ */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-900 origin-left z-[60]" style={{ scaleX: scrollYProgress }} />;
}

/* ═══════════════════════════════════════════════════════
   2. SECTION PROGRESS (for case studies: shows which section you're in)
   ═══════════════════════════════════════════════════════ */
export function SectionProgress({ sections, className = '' }: { sections: string[]; className?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const els = sections.map((_, i) => document.getElementById(`cs-section-${i}`));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className={`sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-2 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {sections.map((s, i) => (
          <button key={i} onClick={() => scrollToElement(`cs-section-${i}`)}
            className={`text-[12px] font-semibold whitespace-nowrap transition-colors ${i === activeIdx ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'}`} style={{ fontFamily }}>
            {s}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          {sections.map((_, i) => (
            <div key={i} className={`w-5 h-1 rounded-full transition-colors ${i <= activeIdx ? 'bg-gray-900' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. STICKY CTA BAR (bottom center)
   ═══════════════════════════════════════════════════════ */
export function StickyCTABar({ label = 'Book a call' }: { label?: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 500));
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={springBounce}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200 shadow-xl shadow-gray-900/10">
          <span className="text-[13px] text-gray-500 font-medium hidden sm:block" style={{ fontFamily }}>Available for new projects</span>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-[13px] font-semibold hover:bg-gray-800 transition-colors" style={{ fontFamily }}>{label}</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   4. STICKY BACK TO TOP
   ═══════════════════════════════════════════════════════ */
export function StickyBackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 1200));
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={springBounce}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[80] w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg shadow-gray-900/[0.08] flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ArrowRight size={14} className="text-gray-600 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   5. FLOATING GUIDE CTA (right side)
   ═══════════════════════════════════════════════════════ */
export function FloatingGuideCTA({ onClick }: { onClick?: () => void }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 300 && v < 8000));
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={springBounce}
          onClick={onClick}
          className="fixed right-6 top-24 z-[80] bg-white border border-gray-200 rounded-2xl p-3 shadow-lg shadow-gray-900/[0.06] hover:shadow-xl hover:border-gray-300 transition-all flex items-center gap-3 max-w-[220px]">
          <img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
          <div className="text-left">
            <p className="text-[12px] font-semibold text-gray-900 leading-tight" style={{ fontFamily }}>Claude Code Guide</p>
            <p className="text-[11px] text-gray-400" style={{ fontFamily }}>9 chapters</p>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   6. HORIZONTAL TESTIMONIAL SCROLLER
   ═══════════════════════════════════════════════════════ */
export function TestimonialScroller({ testimonials }: { testimonials: { author: string; role: string; content: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ...spring }}
            className="min-w-[320px] max-w-[400px] p-6 rounded-2xl bg-white border border-gray-100 snap-start shrink-0">
            <Quotes size={16} weight="fill" className="text-gray-200 mb-3" />
            <blockquote className="text-[15px] text-gray-600 leading-relaxed mb-4" style={{ fontFamily }}>{t.content}</blockquote>
            <p className="text-[13px]" style={{ fontFamily }}>
              <span className="font-semibold text-gray-900">{t.author}</span> <span className="text-gray-400">· {t.role}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   7. CONTINUE READING MODULE (bottom of every page)
   ═══════════════════════════════════════════════════════ */
export function ContinueReading({ items, onNavigate }: { items: { label: string; desc: string; image?: string; onClick: () => void }[]; onNavigate?: () => void }) {
  return (
    <section className="py-16 px-6 border-t border-gray-100 bg-gray-50/30">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6" style={{ fontFamily }}>Continue exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button key={i} onClick={item.onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={springBounce}
              className="text-left p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-shadow group">
              {item.image && <img src={item.image} alt="" className="w-full aspect-[16/9] rounded-lg object-cover mb-3 group-hover:scale-[1.02] transition-transform" />}
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily }}>{item.label}</p>
              <p className="text-[13px] text-gray-400 mt-1" style={{ fontFamily }}>{item.desc}</p>
              <ArrowRight size={14} className="text-gray-300 mt-3 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   8. PROJECT NAVIGATOR (prev/next project cards)
   ═══════════════════════════════════════════════════════ */
export function ProjectNavigator({ projects, currentIdx = 0, onSelect }: { projects: { title: string; cover: string; role: string }[]; currentIdx?: number; onSelect: (idx: number) => void }) {
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;
  return (
    <div className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev && (
          <motion.button whileHover={{ y: -2 }} transition={springBounce} onClick={() => onSelect(currentIdx - 1)}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all text-left group">
            <ArrowRight size={14} className="text-gray-300 rotate-180 shrink-0" />
            <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0"><img src={prev.cover} alt="" className="w-full h-full object-cover" /></div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400 font-medium" style={{ fontFamily }}>Previous</p>
              <p className="text-[14px] font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors" style={{ fontFamily }}>{prev.title}</p>
            </div>
          </motion.button>
        )}
        {next && (
          <motion.button whileHover={{ y: -2 }} transition={springBounce} onClick={() => onSelect(currentIdx + 1)}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all text-left group md:ml-auto md:flex-row-reverse md:text-right">
            <ArrowRight size={14} className="text-gray-300 shrink-0" />
            <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0"><img src={next.cover} alt="" className="w-full h-full object-cover" /></div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400 font-medium" style={{ fontFamily }}>Next</p>
              <p className="text-[14px] font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors" style={{ fontFamily }}>{next.title}</p>
            </div>
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   9. VISUAL SITEMAP TOGGLE
   ═══════════════════════════════════════════════════════ */
const SITEMAP_DATA = [
  { id: 'home', label: 'Home', children: ['Hero', 'Featured Work', 'Expertise', 'Resources', 'Testimonials', 'CTA'] },
  { id: 'work', label: 'Work', children: ['Case Studies', 'Short Projects', 'AI Experiments'] },
  { id: 'case', label: 'Case Study', children: ['Context', 'Research', 'Approach', 'Design System', 'Outcomes', 'Gallery'] },
  { id: 'about', label: 'About', children: ['Bio', 'Timeline', 'Tools', 'Values', 'Companies'] },
  { id: 'blog', label: 'Resources', children: ['Guide (9 chapters)', 'Articles', 'Templates'] },
  { id: 'gallery', label: 'Interface Work', children: ['UI Gallery', 'Lightbox', 'Project Filter'] },
];

export function SitemapToggle({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springBounce}
        onClick={() => setOpen(true)}
        className="fixed left-6 bottom-6 z-[80] w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg shadow-gray-900/[0.08] flex items-center justify-center hover:bg-gray-50 transition-colors">
        <TreeStructure size={16} className="text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-xl flex items-center justify-center p-8" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={springBounce}
              className="max-w-[900px] w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900" style={{ fontFamily }}>Site Map</h2>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><X size={20} className="text-gray-500" /></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {SITEMAP_DATA.map((page, pi) => (
                  <motion.div key={page.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: pi * 0.06, ...spring }}>
                    <button onClick={() => { onNavigate?.(page.id); setOpen(false); }}
                      className="text-left w-full group">
                      <h3 className="text-[16px] font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors flex items-center gap-2" style={{ fontFamily }}>
                        {page.label} <ArrowUpRight size={12} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </h3>
                      <div className="space-y-1.5 pl-3 border-l-2 border-gray-100">
                        {page.children.map((child, ci) => (
                          <motion.p key={ci} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: pi * 0.06 + ci * 0.03, ...spring }}
                            className="text-[13px] text-gray-400" style={{ fontFamily }}>
                            {child}
                          </motion.p>
                        ))}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   10. SCROLL REVEAL CALLOUT (appears at specific scroll depth)
   ═══════════════════════════════════════════════════════ */
export function ScrollRevealCallout({ message, triggerAt = 2000, onAction, actionLabel = 'Learn more' }: { message: string; triggerAt?: number; onAction?: () => void; actionLabel?: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => { if (!dismissed) setShow(v > triggerAt && v < triggerAt + 1500); });
  if (dismissed) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, x: -20, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20, scale: 0.95 }} transition={springBounce}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-[75] max-w-[260px] p-4 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-900/10">
          <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500"><X size={14} /></button>
          <p className="text-[14px] text-gray-700 font-medium leading-snug pr-4" style={{ fontFamily }}>{message}</p>
          {onAction && (
            <button onClick={onAction} className="mt-3 text-[13px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors" style={{ fontFamily }}>
              {actionLabel} <ArrowRight size={12} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   11. HOVER REVEAL CARD (shows extra info on hover)
   ═══════════════════════════════════════════════════════ */
export function HoverRevealProjectCard({ title, role, period, cover, summary, deliverables = [], onClick }: {
  title: string; role: string; period: string; cover: string; summary: string; deliverables?: string[]; onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div whileHover={{ y: -4 }} transition={springBounce}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/[0.05] transition-shadow">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={cover} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-5">
              <div>
                <p className="text-white text-[14px] font-medium mb-2" style={{ fontFamily }}>View project</p>
                {deliverables.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {deliverables.slice(0, 3).map(d => <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">{d}</span>)}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[16px] font-semibold tracking-[-0.01em] group-hover:text-blue-600 transition-colors" style={{ fontFamily }}>{title}</h3>
          <span className="text-[11px] text-gray-300 font-mono tabular-nums">{period}</span>
        </div>
        <p className="text-[14px] text-gray-400 mt-1" style={{ fontFamily }}>{role}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   12. EXPAND/COLLAPSE with spring animation
   ═══════════════════════════════════════════════════════ */
export function ExpandCollapse({ preview, full }: { preview: string; full: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div key="full" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={spring}>
            <p className="text-[17px] leading-relaxed text-gray-600" style={{ whiteSpace: 'pre-line', fontFamily }}>{full}</p>
          </motion.div>
        ) : (
          <motion.p key="preview" className="text-[17px] leading-relaxed text-gray-600 line-clamp-3" style={{ fontFamily }}>{preview}</motion.p>
        )}
      </AnimatePresence>
      <button onClick={() => setExpanded(!expanded)} className="mt-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1" style={{ fontFamily }}>
        {expanded ? 'Show less' : 'Read more'}
        <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={spring}><CaretRight size={12} /></motion.span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   13. STICKY SECTION LABEL (pins under nav)
   ═══════════════════════════════════════════════════════ */
export function StickyLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-14 z-30 py-2.5 bg-white/90 backdrop-blur-md border-b border-gray-100 mb-6 -mx-6 px-6">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]" style={{ fontFamily }}>{children}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   14. ALL-IN-ONE STICKY LAYER (drops into any variant)
   ═══════════════════════════════════════════════════════ */
export function StickyLayer({ onNavigateBlog, onNavigatePage }: { onNavigateBlog?: () => void; onNavigatePage?: (page: string) => void }) {
  return (
    <>
      <ScrollProgressBar />
      <StickyCTABar />
      <StickyBackToTop />
      <FloatingGuideCTA onClick={onNavigateBlog} />
      <SitemapToggle onNavigate={onNavigatePage} />
    </>
  );
}
