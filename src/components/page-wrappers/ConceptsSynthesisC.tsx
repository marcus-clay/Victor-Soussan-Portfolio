'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, Play, BookOpen, PencilSimple, Compass, UsersThree, GridFour, List, Funnel } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';
import { scrollToElement } from '@/utils/smoothScroll';

const PROJECTS = getProjects('en');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TK = TOOLKIT_TRANSLATIONS.en as Record<string, any>;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS.slice(0, 6);
const UI = { toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`), scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`), sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`) };
const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Toolkit: Batch editing' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Toolkit: Planning' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Toolkit: Tasks' },
];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';
type MediaItem = { type: 'video' | 'image'; src: string; label: string };

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };
const springB = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";

function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-20px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay, ...spring }} className={className}>{children}</motion.div>;
}

function LightboxC({ items, startIdx, onClose }: { items: MediaItem[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const item = items[idx];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6" onClick={e => e.stopPropagation()}>
        <p className="text-[14px] text-white/60">{item.label}</p>
        <div className="flex items-center gap-3"><span className="text-[13px] text-white/40 font-mono">{idx + 1}/{items.length}</span><button onClick={onClose} className="p-2 text-white/50 hover:text-white"><X size={20} /></button></div>
      </div>
      <div className="flex items-center gap-4 max-w-[95vw]" onClick={e => e.stopPropagation()}>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} className="p-3 text-white/30 hover:text-white"><ArrowLeft size={24} /></button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="max-w-[80vw] max-h-[80vh] rounded-xl" /> : <img src={item.src} alt="" className="max-w-[80vw] max-h-[80vh] rounded-xl object-contain" />}
          </motion.div>
        </AnimatePresence>
        <button onClick={() => setIdx(Math.min(items.length - 1, idx + 1))} className="p-3 text-white/30 hover:text-white"><ArrowRight size={24} /></button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SYNTHESIS C: "CRAFT"

   IA Approach: Dense, structured, everything expandable.
   Homepage = bento asymmetric grid (not linear scroll).
   Case study = 2-column with sticky sidebar TOC.
   About = modules grid (expandable cards).
   Gallery = filterable by project.
   Blog = magazine-style grid with featured.
   ═══════════════════════════════════════════════════════════════════════ */

function CNav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60));
  const labels: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gray-900 origin-left" style={{ scaleX: scrollYProgress }} />
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center">
        <button onClick={() => go('home')} className="text-[15px] font-semibold text-gray-900 tracking-[-0.01em]" style={{ fontFamily: font }}>VS</button>
        <AnimatePresence>
          {scrolled && labels[page] && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring} className="text-[13px] text-gray-400 font-medium ml-2">{labels[page]}</motion.span>}
        </AnimatePresence>
        <div className="ml-auto hidden md:flex items-center gap-0.5">
          {(['home', 'work', 'about', 'blog', 'gallery'] as PageId[]).map(id => (
            <button key={id} onClick={() => go(id)} className={`px-2.5 py-1.5 rounded-lg text-[13px] font-medium ${page === id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'}`} style={{ fontFamily: font }}>
              {id === 'home' ? 'Home' : id === 'work' ? 'Work' : id === 'about' ? 'About' : id === 'blog' ? 'Resources' : 'Interfaces'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══ HOME: Bento asymmetric ═══ */
function CHome({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Bento grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
            {/* Hero block: 8 cols, 3 rows */}
            <div className="col-span-12 md:col-span-8 md:row-span-3 p-8 md:p-12 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between min-h-[420px]">
              <Fade>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[14px] text-emerald-700 font-medium">{T.hero.availability}</span>
                </div>
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-6 max-w-[600px]">
                  {T.hero.title},<br /><span className="text-gray-300">{T.hero.subtitle}</span>
                </h1>
                <p className="text-[17px] text-gray-500 leading-relaxed max-w-[480px] mb-8">{T.hero.desc.slice(0, 160)}.</p>
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springB} onClick={() => go('work')}
                    className="group px-6 py-3 bg-gray-900 text-white rounded-full text-[15px] font-semibold flex items-center gap-2">View work <ArrowUpRight size={15} /></motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springB} onClick={() => go('about')}
                    className="px-6 py-3 rounded-full text-[15px] text-gray-500 border border-gray-200 font-medium">About</motion.button>
                </div>
              </Fade>
            </div>

            {/* Stats block: 4 cols, 1 row */}
            <Fade delay={0.05} className="col-span-6 md:col-span-4 p-6 rounded-2xl bg-white border border-gray-100 flex items-center justify-between">
              <div><p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Experience</p><p className="text-[32px] font-bold tracking-[-0.03em] mt-1">15 yrs</p></div>
              <div><p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Products</p><p className="text-[32px] font-bold tracking-[-0.03em] mt-1">12+</p></div>
            </Fade>

            {/* Testimonial block: 4 cols, 2 rows */}
            <Fade delay={0.1} className="col-span-12 md:col-span-4 md:row-span-2 p-6 rounded-2xl bg-white border border-gray-100 flex flex-col justify-between">
              <div>
                <Quotes size={18} weight="fill" className="text-gray-200 mb-3" />
                <p className="text-[15px] text-gray-600 leading-relaxed line-clamp-5">{TK.testimonial.quote}</p>
              </div>
              <p className="text-[13px] mt-4"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
            </Fade>

            {/* Featured project: 8 cols, 2 rows */}
            <Fade delay={0.08} className="col-span-12 md:col-span-8 md:row-span-2">
              <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('case')}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all cursor-pointer group h-full">
                <div className="overflow-hidden"><img src={PROJECTS[0].coverImage} alt={PROJECTS[0].title} className="w-full aspect-[21/9] object-cover group-hover:scale-[1.02] transition-transform duration-700" /></div>
                <div className="p-6">
                  <h3 className="text-[18px] font-bold group-hover:text-blue-600 transition-colors">{PROJECTS[0].title}</h3>
                  <p className="text-[14px] text-gray-400 mt-1">{PROJECTS[0].role} · {PROJECTS[0].period}</p>
                </div>
              </motion.div>
            </Fade>

            {/* More projects: 4 cols each */}
            {PROJECTS.slice(1, 5).map((p, i) => (
              <Fade key={p.id} delay={0.1 + i * 0.04} className="col-span-6 md:col-span-3">
                <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('case')}
                  className="rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group h-full">
                  <div className="overflow-hidden"><img src={p.coverImage} alt={p.title} className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500" /></div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-semibold group-hover:text-blue-600 transition-colors">{p.title}</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">{p.period}</p>
                  </div>
                </motion.div>
              </Fade>
            ))}

            {/* Expertise: 12 cols */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[
                { icon: PencilSimple, title: 'Design & Prototyping', desc: 'From wireframe to shipped UI.' },
                { icon: Compass, title: 'Product Strategy', desc: 'Framing the problem first.' },
                { icon: UsersThree, title: 'Leadership & Ops', desc: 'Building scalable practices.' },
              ].map((p, i) => (
                <Fade key={i} delay={i * 0.06}>
                  <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <p.icon size={24} weight="regular" className="text-gray-900 mb-3" />
                    <h3 className="text-[16px] font-bold mb-1">{p.title}</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Resources row: 12 cols */}
            <div className="col-span-12 mt-4">
              <Fade>
                <div className="flex items-end justify-between mb-6">
                  <h2 className="text-[22px] font-bold tracking-[-0.02em]">Resources</h2>
                  <button onClick={() => go('blog')} className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All <ArrowRight size={12} /></button>
                </div>
              </Fade>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ARTICLES.slice(0, 3).map((a, i) => (
                  <Fade key={a.id} delay={i * 0.04}>
                    <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('article')}
                      className="group cursor-pointer p-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{a.category}</span>
                      <h3 className="text-[15px] font-semibold mt-2 group-hover:text-blue-600 transition-colors leading-snug">{a.title_en}</h3>
                    </motion.div>
                  </Fade>
                ))}
              </div>
            </div>

            {/* CTA: 12 cols */}
            <div className="col-span-12 mt-4 p-10 rounded-2xl bg-gray-900 text-center">
              <Fade>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-white mb-3">Let&apos;s work together</h2>
                <p className="text-[16px] text-white/50 mb-6">Available for product design missions.</p>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springB}
                  className="px-7 py-3.5 bg-white text-gray-900 rounded-full text-[15px] font-semibold">Book a call</motion.button>
              </Fade>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ CASE: 2-column with sticky sidebar TOC ═══ */
function CCase({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0, 1]));
  const toggleSection = (i: number) => setExpandedSections(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const media: MediaItem[] = [...VIDEOS.map(v => ({ type: 'video' as const, src: v.src, label: v.label })), ...UI.toolkit.map((img, i) => ({ type: 'image' as const, src: img, label: `Interface ${i + 1}` }))];

  const sections = [
    { title: 'Overview', content: TK.overview.introP1 + ' ' + TK.overview.introP2 },
    { title: 'Context', content: TK.context.intro },
    { title: 'Phase 1: Prototype', content: TK.phase1.intro },
    { title: 'Phase 2: Expansion', content: TK.phase2.intro },
    { title: 'Phase 3: Mobile', content: TK.phase3.intro },
    { title: 'Design System', content: TK.designSystem.intro },
    { title: 'Impact', content: TK.impact.intro },
  ];

  return (
    <div style={{ fontFamily: font }}>
      {/* Header */}
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Fade><button onClick={() => go('work')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-8"><ArrowLeft size={14} /> All projects</button></Fade>
          <Fade delay={0.03}>
            <div className="flex items-center gap-4 text-[14px] text-gray-400 mb-4">
              <span className="font-semibold text-gray-900">Toolkit</span><span>·</span><span>{TK.meta.type}</span><span>·</span><span>{TK.meta.period}</span>
            </div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-4 max-w-[700px]">{TK.hero.title}</h1>
            <p className="text-[18px] text-gray-500 leading-[1.7] max-w-[600px]">{TK.hero.subtitle}</p>
          </Fade>
        </div>
      </section>

      {/* Hero visual */}
      <Fade><div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLbIdx(3)}>
          <img src={PROJECTS[0].coverImage} alt="" className="w-full hover:scale-[1.01] transition-transform duration-700" />
        </div>
        <p className="text-[13px] font-semibold text-gray-900 mt-3">Toolkit platform</p>
        <p className="text-[12px] text-gray-400">Planning, task management, and field coordination for construction teams.</p>
      </div></Fade>

      {/* 2-column: TOC sidebar + content */}
      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sticky TOC sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-20">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">On this page</p>
              {sections.map((s, i) => (
                <button key={i} onClick={() => scrollToElement(`sec-${i}`)}
                  className={`block w-full text-left py-2 text-[13px] font-medium transition-colors ${expandedSections.has(i) ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'}`}>{s.title}</button>
              ))}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Deliverables</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Platform', 'Gantt', 'Admin', 'Brand', 'DS'].map(d => <span key={d} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">{d}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            {sections.map((s, i) => (
              <div key={i} id={`sec-${i}`} className="mb-4">
                <button onClick={() => toggleSection(i)} className="w-full flex items-center justify-between py-4 border-b border-gray-100 text-left group">
                  <h2 className={`text-[18px] font-bold tracking-[-0.01em] transition-colors ${expandedSections.has(i) ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>{s.title}</h2>
                  <motion.div animate={{ rotate: expandedSections.has(i) ? 90 : 0 }} transition={spring}><CaretRight size={16} className="text-gray-300" /></motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {expandedSections.has(i) && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ ...spring, opacity: { duration: 0.15 } }} className="overflow-hidden">
                      <div className="py-6">
                        <p className="text-[17px] text-gray-600 leading-[1.75] mb-6">{s.content}</p>
                        {/* Visuals for this section */}
                        {i < 5 && UI.toolkit[i * 2] && (
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            {UI.toolkit.slice(i * 2, i * 2 + 2).map((img, j) => (
                              <div key={j} className="group rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLbIdx(3 + i * 2 + j)}>
                                <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" />
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Impact metrics for last section */}
                        {i === 6 && (
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                              <span className="text-2xl font-bold">{TK.impact.customers}</span>
                              <p className="text-[13px] text-gray-500 mt-1">{TK.impact.customersDesc}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                              <span className="text-2xl font-bold">{TK.impact.seriesA}</span>
                              <p className="text-[13px] text-gray-500 mt-1">{TK.impact.seriesADesc}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                              <span className="text-2xl font-bold">{TK.impact.enterprise}</span>
                              <p className="text-[13px] text-gray-500 mt-1">{TK.impact.enterpriseDesc}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Testimonial */}
            <Fade>
              <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-100">
                <Quotes size={16} weight="fill" className="text-gray-200 mb-3" />
                <blockquote className="text-[16px] text-gray-600 leading-relaxed italic mb-4">{TK.testimonial.quote}</blockquote>
                <p className="text-[13px]"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
              </div>
            </Fade>

            {/* Next */}
            <Fade>
              <motion.div whileHover={{ x: 4 }} transition={springB} onClick={() => go('case')}
                className="mt-8 flex items-center gap-4 py-4 cursor-pointer group border-t border-gray-100">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0"><img src={PROJECTS[1].coverImage} alt="" className="w-full h-full object-cover" /></div>
                <div><p className="text-[12px] text-gray-400">Next project</p><p className="text-[15px] font-semibold group-hover:text-blue-600 transition-colors">{PROJECTS[1].title}</p></div>
                <ArrowRight size={14} className="text-gray-300 ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Fade>
          </div>
        </div>
      </section>

      <AnimatePresence>{lbIdx !== null && <LightboxC items={media} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

/* ═══ WORK: Grid + List toggle with filter ═══ */
function CWork({ go }: { go: (p: PageId) => void }) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', ...new Set(PROJECTS.map(p => p.format === 'case-study' ? 'Case Study' : 'Experiment'))];
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => (p.format === 'case-study' ? 'Case Study' : 'Experiment') === filter);

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Fade><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Work</h1></Fade>
          <Fade delay={0.05}><p className="text-[17px] text-gray-500 mb-8 max-w-lg">Products shipped across B2B SaaS, EdTech, GovTech, and AI-assisted design.</p></Fade>
          <Fade delay={0.08}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${filter === c ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}>{c === 'all' ? 'All' : c}</button>
                ))}
              </div>
              <div className="flex gap-1">
                <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}><GridFour size={16} /></button>
                <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}><List size={16} /></button>
              </div>
            </div>
          </Fade>

          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((p, i) => (
                <Fade key={p.id} delay={i * 0.04}>
                  <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('case')}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all">
                    <div className="overflow-hidden"><img src={p.coverImage} alt={p.title} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.03] transition-transform duration-500" /></div>
                    <div className="p-5">
                      <h3 className="text-[16px] font-semibold group-hover:text-blue-600 transition-colors">{p.title}</h3>
                      <p className="text-[14px] text-gray-400 mt-1">{p.role} · {p.period}</p>
                      <p className="text-[14px] text-gray-500 mt-2 line-clamp-2">{p.summary}</p>
                    </div>
                  </motion.div>
                </Fade>
              ))}
            </div>
          ) : (
            <div>
              {filtered.map((p, i) => (
                <Fade key={p.id} delay={i * 0.03}>
                  <motion.div whileHover={{ x: 4 }} transition={springB} onClick={() => go('case')}
                    className="group flex items-center gap-6 py-5 border-b border-gray-100 cursor-pointer last:border-b-0">
                    <span className="text-[12px] text-gray-300 font-mono w-6">0{i + 1}</span>
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0"><img src={p.coverImage} alt="" className="w-full h-full object-cover" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16px] font-semibold group-hover:text-blue-600 transition-colors">{p.title}</h3>
                      <p className="text-[13px] text-gray-400">{p.role} · {p.period}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </motion.div>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ═══ ABOUT: Module grid (expandable cards) ═══ */
function CAbout({ go }: { go: (p: PageId) => void }) {
  const [expanded, setExpanded] = useState<string | null>('bio');
  const modules = [
    { id: 'bio', title: 'Who I am', content: T.bio.p1 + ' ' + T.bio.p2, span: 'md:col-span-8' },
    { id: 'photo', title: '', content: '', span: 'md:col-span-4', isPhoto: true },
    { id: 'career', title: 'Career', content: '2024: France VAE, Lead Product Designer. 2023: Toolkit, Founding Designer. 2018-2024: UNOWHY / SQOOL, Product Design Manager. 2017: Dailymotion, Senior Product Designer. 2014-2017: PagesJaunes, Mobile UI Lead.', span: 'md:col-span-6' },
    { id: 'tools', title: 'Tools', content: 'Figma, Claude Code, VS Code, Next.js, Tailwind CSS, Framer Motion, Vercel, Linear, Notion.', span: 'md:col-span-6' },
    { id: 'approach', title: 'How I work', content: 'I frame problems before solving them. I prototype fast to learn faster. I build design practices that scale beyond the people who create them. The best product design is invisible: it makes the user feel competent, not impressed.', span: 'md:col-span-6' },
    { id: 'companies', title: 'Companies', content: 'Beta.gouv, UNOWHY, Toolkit, Airbus, Orange, Dailymotion, Vinci, Bouygues.', span: 'md:col-span-6' },
  ];

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Fade><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-8">About</h1></Fade>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {modules.map((m, i) => (
              <Fade key={m.id} delay={i * 0.04} className={`col-span-12 ${m.span}`}>
                {m.isPhoto ? (
                  <div className="rounded-2xl overflow-hidden h-full min-h-[200px]"><img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full h-full object-cover object-top" /></div>
                ) : (
                  <motion.div whileHover={{ y: -1 }} transition={springB}
                    className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all cursor-pointer h-full"
                    onClick={() => setExpanded(expanded === m.id ? null : m.id)}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[16px] font-bold">{m.title}</h3>
                      <motion.div animate={{ rotate: expanded === m.id ? 90 : 0 }} transition={spring}><CaretRight size={14} className="text-gray-300" /></motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded === m.id ? (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ ...spring, opacity: { duration: 0.15 } }} className="overflow-hidden">
                          <p className="text-[15px] text-gray-600 leading-relaxed">{m.content}</p>
                        </motion.div>
                      ) : (
                        <p className="text-[14px] text-gray-400 line-clamp-2">{m.content}</p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ BLOG: Magazine grid ═══ */
function CBlog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Fade><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Resources</h1></Fade>
          <Fade delay={0.05}><p className="text-[17px] text-gray-400 mb-12">{T.signals.subtitle}</p></Fade>

          {/* Featured: full width */}
          <Fade delay={0.08}>
            <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('article')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all mb-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 shrink-0 overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full h-full object-cover min-h-[160px]" /></div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span></div>
                  <h2 className="text-[20px] font-bold group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h2>
                  <p className="text-[15px] text-gray-500 leading-relaxed">Complete guide for designers: installation to deployment.</p>
                </div>
              </div>
            </motion.div>
          </Fade>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.map((a, i) => (
              <Fade key={a.id} delay={0.1 + i * 0.04}>
                <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('article')}
                  className="group cursor-pointer p-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{a.category} · {a.date}</span>
                  <h3 className="text-[16px] font-semibold mt-2 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{a.title_en}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-3">{a.body_en.slice(0, 140)}...</p>
                </motion.div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CArticle({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-20 pb-8 px-6"><div className="max-w-[680px] mx-auto">
        <Fade><button onClick={() => go('blog')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-12"><ArrowLeft size={14} /> All articles</button></Fade>
        <Fade delay={0.03}>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">{a.category}</span>
          <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mt-4 mb-8">{a.title_en}</h1>
        </Fade>
      </div></section>
      <article className="px-6 pb-20"><div className="max-w-[680px] mx-auto">
        {(a.body_long_en || a.body_en).split('. ').reduce((acc: string[][], s, i) => { const p = Math.floor(i / 3); if (!acc[p]) acc[p] = []; acc[p].push(s); return acc; }, []).map((ss, i) => (
          <Fade key={i} delay={i * 0.02}><p className="text-[19px] text-gray-700 leading-[1.85] mb-10">{i === 0 && <span className="text-[52px] font-bold text-gray-900 float-left mr-3 mt-2 leading-[0.78]">{ss[0][0]}</span>}{i === 0 ? ss.join('. ').slice(1) : ss.join('. ')}.</p></Fade>
        ))}
      </div></article>
    </div>
  );
}

/* ═══ GALLERY: Filterable by project ═══ */
function CGallery({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState('all');
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const groups = [
    { id: 'toolkit', label: 'Toolkit', images: UI.toolkit },
    { id: 'scrim', label: 'SCRIM', images: UI.scrim },
    { id: 'sqool', label: 'SQOOL', images: UI.sqool },
  ];
  const filtered = filter === 'all' ? groups : groups.filter(g => g.id === filter);
  const allFiltered = filtered.flatMap(g => g.images);
  const media: MediaItem[] = allFiltered.map((img, i) => ({ type: 'image', src: img, label: `Interface ${i + 1}` }));

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <Fade><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></Fade>
          <Fade delay={0.05}><p className="text-[17px] text-gray-500 mb-8">Click any image to explore at full scale.</p></Fade>
          <Fade delay={0.08}>
            <div className="flex gap-2 mb-8">
              <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400'}`}>All</button>
              {groups.map(g => (
                <button key={g.id} onClick={() => setFilter(g.id)} className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${filter === g.id ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400'}`}>{g.label}</button>
              ))}
            </div>
          </Fade>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {allFiltered.map((img, i) => (
            <Fade key={`${filter}-${i}`} delay={Math.min(i * 0.02, 0.15)}>
              <div className="break-inside-avoid group cursor-pointer" onClick={() => setLbIdx(i)}>
                <div className="rounded-xl overflow-hidden bg-[#F5F5F7]"><img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" /></div>
                <p className="text-[12px] text-gray-400 mt-2 px-0.5">Interface {i + 1}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
      <AnimatePresence>{lbIdx !== null && <LightboxC items={media} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

/* ═══ EXPORT ═══ */
export function SynthesisC() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <CNav page={page} go={go} />
      {page === 'home' && <CHome go={go} />}
      {page === 'work' && <CWork go={go} />}
      {page === 'case' && <CCase go={go} />}
      {page === 'about' && <CAbout go={go} />}
      {page === 'blog' && <CBlog go={go} />}
      {page === 'article' && <CArticle go={go} />}
      {page === 'gallery' && <CGallery go={go} />}
    </div>
  );
}
