'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, CaretDown, X, Play, BookOpen, PencilSimple, Compass, UsersThree, Command, Sparkle, Eye, Article, Layout } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';
import { scrollToElement } from '@/utils/smoothScroll';

/* ═══ DATA ═══ */
const ALL_PROJECTS = getProjects('en');
const PROJECTS = ALL_PROJECTS.filter(p => p.format === 'case-study').map(p => ({ ...p, coverImage: p.coverImage.startsWith('/') ? p.coverImage : `/images/${p.coverImage}` }));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TK = TOOLKIT_TRANSLATIONS.en as Record<string, any>;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS.slice(0, 8);
const UI = { toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`), scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`), sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`) };
const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Batch editing', project: 'Toolkit' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Planning zoom', project: 'Toolkit' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Task manipulation', project: 'Toolkit' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Embed code', project: 'Dailymotion' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'Dashboard prototype', project: 'SQOOL Connect' },
];
const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];
const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: TK.testimonial.quote, avatar: '/images/pierre-marie-nigay.webp' },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale.", avatar: '/images/charlotte-rifflet.webp' },
  { author: 'Nicolas Moulin', role: 'Director of Innovation, PagesJaunes', content: "Victor brought a level of visual precision and interaction thinking that elevated the entire mobile experience for our 22 million users.", avatar: '/images/nicolas-moulin.webp' },
];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';
type MediaItem = { type: 'video' | 'image'; src: string; label: string };

const sp = { type: 'spring' as const, stiffness: 300, damping: 26 };
const spB = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";
const blue = '#2D5CF3';

/* ═══ COMPONENTS ═══ */

function F({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-20px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay, ...sp }} className={className}>{children}</motion.div>;
}

/* Progressive disclosure */
function Expand({ summary, children }: { summary: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!open && <p className="text-[19px] text-gray-500 leading-relaxed">{summary}</p>}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ ...sp, opacity: { duration: 0.15 } }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} className="mt-2 text-[19px] font-medium flex items-center gap-1 transition-colors hover:text-blue-700" style={{ color: blue, fontFamily: font }}>
        {open ? 'Show less' : 'Read more'} <motion.span animate={{ rotate: open ? 180 : 0 }} transition={sp}><CaretDown size={12} /></motion.span>
      </button>
    </div>
  );
}

/* Expandable list item */
function ExpandItem({ title, subtitle, badge, children }: { title: string; subtitle?: string; badge?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 py-5 text-left group">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3">
            <h3 className="text-[19px] font-semibold group-hover:text-blue-600 transition-colors">{title}</h3>
            {badge && <span className="text-[11px] text-gray-400 font-mono tabular-nums shrink-0">{badge}</span>}
          </div>
          {subtitle && <p className="text-[19px] text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={sp} className="shrink-0"><CaretRight size={14} className="text-gray-300" /></motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ ...sp, opacity: { duration: 0.15 } }} className="overflow-hidden">
            <div className="pb-5 pl-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Lightbox */
function LB({ items, idx, onClose, onChange }: { items: MediaItem[]; idx: number; onClose: () => void; onChange: (i: number) => void }) {
  const item = items[idx];
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') onChange(Math.max(0, idx - 1)); if (e.key === 'ArrowRight') onChange(Math.min(items.length - 1, idx + 1)); };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [idx, items.length, onClose, onChange]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center" onClick={onClose}>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10" onClick={e => e.stopPropagation()}>
        <p className="text-[19px] text-white/60">{item.label}</p>
        <div className="flex items-center gap-4"><span className="text-[20px] text-white/30 font-mono">{idx + 1}/{items.length}</span><button onClick={onClose} className="p-2 text-white/40 hover:text-white"><X size={20} /></button></div>
      </div>
      <div className="flex items-center gap-4 max-w-[95vw] w-full justify-center" onClick={e => e.stopPropagation()}>
        <button onClick={() => onChange(Math.max(0, idx - 1))} disabled={idx === 0} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowLeft size={24} /></button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="max-w-full max-h-[80vh] rounded-2xl" /> : <img src={item.src} alt="" className="max-w-full max-h-[80vh] rounded-2xl object-contain" />}
          </motion.div>
        </AnimatePresence>
        <button onClick={() => onChange(Math.min(items.length - 1, idx + 1))} disabled={idx === items.length - 1} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowRight size={24} /></button>
      </div>
    </motion.div>
  );
}

/* Video hover-to-play */
function Vid({ src, label, onClick }: { src: string; label: string; onClick?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
      onMouseEnter={() => { ref.current?.play(); setOn(true); }} onMouseLeave={() => { ref.current?.pause(); setOn(false); }} onClick={onClick}>
      <video ref={ref} src={src} muted loop playsInline preload="metadata" className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]" />
      {!on && <div className="absolute inset-0 flex items-center justify-center bg-black/5"><div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"><Play size={18} weight="fill" className="text-gray-900 ml-0.5" /></div></div>}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><p className="text-[19px] text-white font-medium">{label}</p></div>
    </div>
  );
}

/* Nav */
function Nav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60));
  const labels: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/60" style={{ boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.4), 0 4px 16px rgba(0,0,0,0.03)' }}>
      <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left" style={{ scaleX: scrollYProgress, background: blue }} />
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => go('home')} className="text-[20px] font-semibold text-gray-900 tracking-[-0.01em] shrink-0" style={{ fontFamily: font }}>Victor Soussan</motion.button>
        <AnimatePresence>
          {scrolled && labels[page] && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={sp} className="text-[20px] text-gray-400 font-medium ml-2">{labels[page]}</motion.span>}
        </AnimatePresence>
        <div className="ml-auto hidden md:flex items-center gap-0.5">
          {([['home','Home'],['work','Work'],['about','About'],['blog','Resources'],['gallery','Interfaces']] as [PageId,string][]).map(([id,label]) => (
            <motion.button key={id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go(id)}
              className={`px-3 py-1.5 rounded-xl text-[20px] font-medium transition-all ${page === id ? 'text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              style={page === id ? { background: blue } : {}}>
              {label}
            </motion.button>
          ))}
          <div className="w-px h-4 bg-gray-200 mx-1.5" />
          <div className="flex items-center rounded-lg bg-gray-50 p-0.5">
            <button className="px-2 py-1 rounded-md text-[11px] font-bold text-white" style={{ background: blue }}>EN</button>
            <button className="px-2 py-1 rounded-md text-[11px] font-bold text-gray-400">FR</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Floating CTA */
function FloatCTA() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 500));
  return <AnimatePresence>{show && (
    <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={spB}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200 shadow-xl shadow-gray-900/10">
      <span className="text-[20px] text-gray-500 font-medium hidden sm:block">Available for new projects</span>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 text-white rounded-xl text-[20px] font-semibold" style={{ background: blue }}>Book a call</motion.button>
    </motion.div>
  )}</AnimatePresence>;
}

/* Scroll surprise */
function Surprise({ go }: { go: (p: PageId) => void }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => { if (!dismissed) setShow(v > 2500 && v < 4000); });
  if (dismissed) return null;
  return <AnimatePresence>{show && (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={spB}
      className="fixed left-6 top-1/3 z-[75] max-w-[240px] p-4 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-900/10">
      <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500"><X size={14} /></button>
      <p className="text-[19px] text-gray-700 font-medium leading-snug pr-4">I wrote a 9-chapter guide on Claude Code for designers.</p>
      <button onClick={() => { go('blog'); setDismissed(true); }} className="mt-2 text-[20px] font-semibold flex items-center gap-1" style={{ color: blue }}>Read the guide <ArrowRight size={12} /></button>
    </motion.div>
  )}</AnimatePresence>;
}

/* Continue module */
function Continue({ items }: { items: { label: string; desc: string; image?: string; onClick: () => void }[] }) {
  return (
    <section className="py-16 px-6 border-t border-gray-100 bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/20">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[19px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6">Continue exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button key={i} onClick={item.onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={spB}
              className="text-left p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
              {item.image && <img src={item.image} alt="" className="w-full aspect-[16/9] rounded-xl object-cover mb-3 transition-transform duration-[2000ms] group-hover:scale-[1.04]" />}
              <p className="text-[20px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.label}</p>
              <p className="text-[20px] text-gray-400 mt-1">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ HOME ═══ */
function Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[800px] mx-auto">
          <F>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[19px] text-emerald-700 font-medium">{T.hero.availability}</span>
            </div>
          </F>
          <F delay={0.05}><h1 className="text-[clamp(2.8rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-8">{T.hero.title}, <span className="text-gray-300">{T.hero.subtitle}.</span></h1></F>
          <F delay={0.1}>
            <Expand summary={T.hero.desc.slice(0, 180) + '.'}>
              <p className="text-[19px] text-gray-500 leading-relaxed mb-3">{T.hero.desc}</p>
              <p className="text-[19px] text-gray-400 tracking-wide">{T.hero.positioning}</p>
            </Expand>
          </F>
          <F delay={0.15}>
            <div className="flex gap-3 flex-wrap mt-8">
              <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go('work')}
                className="group px-7 py-3.5 text-white rounded-2xl text-[20px] font-semibold flex items-center gap-2" style={{ background: blue }}>
                View work <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go('about')}
                className="px-7 py-3.5 rounded-2xl text-[20px] text-gray-500 border border-gray-200 hover:border-gray-300 font-medium">About me</motion.button>
            </div>
          </F>
        </div>
      </section>

      {/* Featured project */}
      <F><div className="max-w-[1400px] mx-auto px-4 mb-24">
        <motion.div whileHover={{ y: -3 }} transition={spB} onClick={() => go('case')}
          className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all">
          <div className="overflow-hidden"><img src={PROJECTS[0].coverImage} alt={PROJECTS[0].title} className="w-full aspect-[21/9] object-cover transition-transform duration-[2000ms] group-hover:scale-[1.06]" /></div>
          <div className="p-8">
            <span className="text-[19px] font-bold text-gray-400 uppercase tracking-wider">{PROJECTS[0].role} · {PROJECTS[0].period}</span>
            <h3 className="text-[22px] font-bold mt-2 mb-2 group-hover:text-blue-600 transition-colors">{PROJECTS[0].title}</h3>
            <Expand summary={PROJECTS[0].summary.slice(0, 100) + '.'}>
              <p className="text-[19px] text-gray-500 leading-relaxed">{PROJECTS[0].summary}</p>
              <div className="flex flex-wrap gap-2 mt-3">{PROJECTS[0].deliverables.map((d: string) => <span key={d} className="text-[19px] px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">{d}</span>)}</div>
            </Expand>
          </div>
        </motion.div>
      </div></F>

      {/* More projects grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <F><div className="flex items-end justify-between mb-10">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Selected work</h2>
            <motion.button whileHover={{ x: 3 }} transition={spB} onClick={() => go('work')} className="text-[19px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All projects <ArrowRight size={12} /></motion.button>
          </div></F>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.slice(1, 5).map((p, i) => (
              <F key={p.id} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} transition={spB} onClick={() => go('case')}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all">
                  <div className="overflow-hidden"><img src={p.coverImage} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-[2000ms] group-hover:scale-[1.06]" /></div>
                  <div className="p-5">
                    <h3 className="text-[20px] font-semibold group-hover:text-blue-600 transition-colors">{p.title}</h3>
                    <p className="text-[19px] text-gray-500 mt-1">{p.role} · {p.period}</p>
                  </div>
                </motion.div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #FEF3F2 50%, #ECFDF5 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2></F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: PencilSimple, title: T.services.execution, items: T.services.items.execution },
              { icon: Compass, title: T.services.utility, items: T.services.items.utility },
              { icon: UsersThree, title: T.services.impact, items: T.services.items.impact },
            ].map((p, i) => (
              <F key={i} delay={i * 0.08}>
                <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.02)]">
                  <p.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[22px] font-bold tracking-[-0.01em] mb-3">{p.title}</h3>
                  <Expand summary={p.items[0]}>
                    <ul className="space-y-2">{p.items.map((item: string, j: number) => <li key={j} className="text-[20px] text-gray-500 leading-relaxed flex gap-2"><span className="text-gray-300 shrink-0">·</span>{item}</li>)}</ul>
                  </Expand>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-10">What they say</h2></F>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-6 px-6 mb-10">
            {TESTIMONIALS.map((t, i) => (
              <F key={i} delay={i * 0.08}>
                <div className="min-w-[360px] max-w-[440px] p-6 rounded-2xl bg-white border border-gray-100 snap-start shrink-0">
                  <Quotes size={16} weight="fill" className="text-blue-200 mb-4" />
                  <blockquote className="text-[20px] text-gray-600 leading-relaxed mb-5">{t.content}</blockquote>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                    <div><p className="text-[20px] font-semibold text-gray-900">{t.author}</p><p className="text-[19px] text-gray-400">{t.role}</p></div>
                  </div>
                </div>
              </F>
            ))}
          </div>
          <F>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-[19px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">Companies I have worked with</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">{LOGOS.map(n => <span key={n} className="text-[19px] text-gray-300 font-semibold hover:text-gray-500 transition-colors cursor-default">{n}</span>)}</div>
            </div>
          </F>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #FEF3F2 50%, #ECFDF5 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <F><div className="flex items-end justify-between mb-10">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Resources</h2>
            <motion.button whileHover={{ x: 2 }} transition={spB} onClick={() => go('blog')} className="text-[19px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All <ArrowRight size={12} /></motion.button>
          </div></F>
          <F delay={0.05}>
            <motion.div whileHover={{ y: -2 }} transition={spB} onClick={() => go('blog')}
              className="group cursor-pointer p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all mb-6">
              <div className="flex items-center gap-2 mb-3"><BookOpen size={14} style={{ color: blue }} /><span className="text-[19px] font-bold uppercase tracking-wider" style={{ color: blue }}>Guide · 9 chapters</span></div>
              <h3 className="text-[22px] font-semibold group-hover:text-blue-600 transition-colors">Getting started with Claude Code</h3>
              <p className="text-[19px] text-gray-500 mt-1">Complete guide for designers: installation to deployment, visual quality, skills, and Figma MCP.</p>
            </motion.div>
          </F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <F key={a.id} delay={0.08 + i * 0.04}>
                <ExpandItem title={a.title_en} subtitle={`${a.category} · ${a.date}`}>
                  <p className="text-[20px] text-gray-500 leading-relaxed">{a.body_en.slice(0, 200)}...</p>
                  <button onClick={() => go('article')} className="mt-2 text-[19px] font-medium flex items-center gap-1" style={{ color: blue }}>Read full article <ArrowRight size={12} /></button>
                </ExpandItem>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <F>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
          <p className="text-[22px] text-gray-400 mb-8">Currently available for product design missions.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB}
              className="px-8 py-4 text-white rounded-2xl text-[19px] font-semibold flex items-center justify-center gap-2" style={{ background: blue }}>Book a call <Calendar size={16} /></motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB}
              className="px-8 py-4 rounded-2xl text-[19px] text-gray-500 border border-gray-200 flex items-center justify-center gap-2">Email <Envelope size={16} /></motion.button>
          </div>
        </F>
      </section>

      <Continue items={[
        { label: 'Work', desc: 'All projects with details', image: PROJECTS[1].coverImage, onClick: () => go('work') },
        { label: 'Interface Work', desc: '100+ UI screens', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years of context', onClick: () => go('about') },
      ]} />
    </div>
  );
}

/* ═══ WORK ═══ */
function Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[1200px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Work</h1></F>
        <F delay={0.05}><p className="text-[19px] text-gray-500 mb-12 max-w-lg">{T.services.subtitle}</p></F>
      </div></section>
      <div className="max-w-[1200px] mx-auto px-6 pb-16">
        {PROJECTS.map((p, i) => (
          <F key={p.id} delay={i * 0.03}>
            <ExpandItem title={p.title} subtitle={`${p.role} · ${p.period}`} badge={p.format === 'case-study' ? 'Case Study' : 'Short'}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 rounded-xl overflow-hidden bg-gray-50 shrink-0 cursor-pointer" onClick={() => go('case')}>
                  <img src={p.coverImage} alt={p.title} className="w-full aspect-[16/10] object-cover hover:scale-[1.03] transition-transform duration-[2000ms]" />
                </div>
                <div className="flex-1">
                  <p className="text-[19px] text-gray-500 leading-relaxed mb-3">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-3">{p.deliverables.slice(0, 4).map((d: string) => <span key={d} className="text-[19px] px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">{d}</span>)}</div>
                  <button onClick={() => go('case')} className="text-[19px] font-medium flex items-center gap-1" style={{ color: blue }}>View case study <ArrowRight size={12} /></button>
                </div>
              </div>
            </ExpandItem>
          </F>
        ))}
      </div>
      <Continue items={[
        { label: 'Interface Work', desc: 'UI craft up close', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

/* ═══ CASE STUDY ═══ */
function Case({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const media: MediaItem[] = [...VIDEOS.slice(0, 3).map(v => ({ type: 'video' as const, src: v.src, label: `Toolkit: ${v.label}` })), ...UI.toolkit.map((img, i) => ({ type: 'image' as const, src: img, label: `Toolkit interface ${i + 1}` }))];
  const sections = [
    { label: 'Overview', text: TK.overview.introP1, extra: TK.overview.introP2, role: TK.overview.roleDesc },
    { label: 'Context', text: TK.context.intro, extra: '' },
    { label: 'Phase 1', text: TK.phase1.intro, extra: '' },
    { label: 'Phase 2', text: TK.phase2.intro, extra: '' },
    { label: 'Phase 3', text: TK.phase3.intro, extra: '' },
    { label: 'Design System', text: TK.designSystem.intro, extra: '' },
    { label: 'Impact', text: TK.impact.intro, extra: '' },
  ];

  return (
    <div style={{ fontFamily: font }}>
      {/* Section progress */}
      <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 py-2">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {sections.map((s, i) => <button key={i} onClick={() => scrollToElement(`mp-${i}`)} className="text-[19px] font-semibold text-gray-400 hover:text-gray-700 whitespace-nowrap transition-colors">{s.label}</button>)}
        </div>
      </div>

      {/* Header */}
      <section className="pt-16 pb-10 px-6">
        <div className="max-w-[800px] mx-auto">
          <F><motion.button whileHover={{ x: -3 }} transition={spB} onClick={() => go('work')} className="flex items-center gap-2 text-[19px] text-gray-400 hover:text-gray-900 mb-10"><ArrowLeft size={14} /> All projects</motion.button></F>
          <F delay={0.03}>
            <div className="flex items-center gap-6 text-[19px] text-gray-500 mb-4"><span className="font-semibold text-gray-900">Toolkit</span><span>·</span><span>{TK.meta.type}</span><span>·</span><span>{TK.meta.period}</span></div>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-6">{TK.hero.title}</h1>
            <Expand summary={TK.hero.description.slice(0, 160) + '.'}>
              <p className="text-[19px] text-gray-500 leading-relaxed">{TK.hero.description}</p>
            </Expand>
          </F>
        </div>
      </section>

      {/* Hero video */}
      <F><div className="max-w-[1400px] mx-auto px-4 mb-16">
        <Vid src={VIDEOS[0].src} label="Toolkit: Batch editing workflow" onClick={() => setLbIdx(0)} />
        <div className="max-w-[800px] mx-auto mt-4"><p className="text-[20px] font-semibold text-gray-900">Toolkit: Batch editing</p><p className="text-[19px] text-gray-400">Managing multiple tasks across construction sites simultaneously.</p></div>
      </div></F>

      {/* Sections with TOC sidebar */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">On this page</p>
            {sections.map((s, i) => <button key={i} onClick={() => scrollToElement(`mp-${i}`)} className="block w-full text-left py-1.5 text-[20px] font-medium text-gray-400 hover:text-gray-700 transition-colors">{s.label}</button>)}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Also explore</p>
              <motion.button whileHover={{ x: 2 }} transition={spB} onClick={() => go('gallery')} className="text-[20px] font-semibold text-gray-500 hover:text-blue-600 transition-colors block mb-2">Interface Work</motion.button>
              <motion.button whileHover={{ x: 2 }} transition={spB} onClick={() => go('blog')} className="text-[20px] font-semibold text-gray-500 hover:text-blue-600 transition-colors block">Claude Code Guide</motion.button>
            </div>
          </div>
        </div>
        <div>
          {sections.map((s, i) => (
            <section key={i} className="py-12" id={`mp-${i}`}>
              <F>
                <span className="text-[19px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">{s.label}</span>
                {s.extra ? (
                  <Expand summary={s.text.slice(0, 160) + '.'}>
                    <p className="text-[20px] text-gray-600 leading-[1.75] mb-4">{s.text}</p>
                    {s.extra && <p className="text-[20px] text-gray-600 leading-[1.75]">{s.extra}</p>}
                    {s.role && <p className="text-[20px] text-gray-500 mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100"><span className="font-semibold text-gray-700">My role: </span>{s.role}</p>}
                  </Expand>
                ) : (
                  <p className="text-[20px] text-gray-600 leading-[1.75]">{s.text}</p>
                )}
              </F>
              {i < 5 && UI.toolkit[i * 2] && (
                <F><div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {UI.toolkit.slice(i * 2, i * 2 + 2).filter(Boolean).map((img, j) => (
                    <div key={j} className="group rounded-2xl overflow-hidden bg-gray-50 cursor-pointer" onClick={() => setLbIdx(3 + i * 2 + j)}>
                      <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                      <div className="p-3"><p className="text-[20px] font-semibold text-gray-900">{s.label} screen {j + 1}</p></div>
                    </div>
                  ))}
                </div></F>
              )}
              {i === 6 && (
                <F><div className="mt-8 grid grid-cols-3 gap-4">
                  {[{ v: TK.impact.customers, d: TK.impact.customersDesc }, { v: TK.impact.seriesA, d: TK.impact.seriesADesc }, { v: TK.impact.enterprise, d: TK.impact.enterpriseDesc }].map((m, mi) => (
                    <div key={mi} className="p-5 rounded-2xl bg-gray-50 border border-gray-100"><span className="text-2xl font-bold" style={{ color: blue }}>{m.v}</span><p className="text-[19px] text-gray-500 mt-1">{m.d}</p></div>
                  ))}
                </div></F>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <section className="py-14 px-6"><div className="max-w-[800px] mx-auto"><F>
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <Quotes size={18} weight="fill" className="text-blue-200 mb-4" />
          <blockquote className="text-[22px] text-gray-600 leading-[1.7] italic mb-4">{TK.testimonial.quote}</blockquote>
          <div className="flex items-center gap-3">
            <img src="/images/pierre-marie-nigay.webp" alt="" className="w-10 h-10 rounded-full object-cover" />
            <div><p className="text-[19px] font-semibold">{TK.testimonial.author}</p><p className="text-[19px] text-gray-400">{TK.testimonial.role}</p></div>
          </div>
        </div>
      </F></div></section>

      {/* Next project */}
      <section className="py-8 px-6 border-t border-gray-100"><div className="max-w-[800px] mx-auto"><F>
        <motion.div whileHover={{ x: 4 }} transition={spB} onClick={() => go('case')} className="flex items-center gap-5 py-4 cursor-pointer group">
          <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0"><img src={PROJECTS[1].coverImage} alt="" className="w-full h-full object-cover" /></div>
          <div><p className="text-[19px] text-gray-400">Next project</p><p className="text-[20px] font-semibold group-hover:text-blue-600 transition-colors">{PROJECTS[1].title}</p></div>
          <ArrowRight size={14} className="text-gray-300 ml-auto group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </F></div></section>

      <Continue items={[
        { label: 'All projects', desc: 'Browse work', image: PROJECTS[2].coverImage, onClick: () => go('work') },
        { label: 'Interface Work', desc: 'UI at full scale', image: UI.scrim[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <LB items={media} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ ABOUT ═══ */
function About({ go }: { go: (p: PageId) => void }) {
  const career = [
    { y: '2024-25', co: 'France VAE / Beta.gouv', role: 'Lead Product Designer', d: 'National public service, 100K+ candidates.', expanded: 'Co-designed prioritization matrix with Lead PM. Led 10 user interviews for dashboard launch. Organized 2-day design thinking workshop. Restructured Figma architecture and delivery process. Shipped VAE Collective MVP.' },
    { y: '2023-24', co: 'Toolkit', role: 'Founding Designer', d: '0-to-1 construction tech SaaS.', expanded: 'Sole designer in 3-person team. Designed entire platform from pitch deck to shipped MVP. Built Tailwind-ready design system (40+ components). Product reached 2,000 customers and secured seed funding.' },
    { y: '2018-24', co: 'UNOWHY / SQOOL', role: 'Product Design Manager', d: 'Team of 4, 8 apps, 500K+ students.', expanded: 'Managed 4 designers: hiring, reviews, coaching. Led design strategy for SQOOL ecosystem (8 apps). Built multi-brand design system for Web, Android, PC. Structured Design Ops: Figma, templates, QA. Collaborated with 30+ developers and PMs.' },
    { y: '2017-18', co: 'Dailymotion', role: 'Senior Product Designer', d: 'Video suite for CBS, Bein Sports.', expanded: 'Designed high-volume upload and livestreaming dashboards. Created first pattern library (Sketch + Storybook). Mentored junior designers. Collaboration across Paris, NYC, Marseille.' },
    { y: '2014-17', co: 'PagesJaunes', role: 'Mobile UI Lead', d: '22M users, iOS/Android.', expanded: 'Led UI for iOS and Android apps (22M downloads). Material Design migration. Android Wear prototyping. Cross-platform consistency with engineering.' },
  ];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-8">About</h1></F>
            <F delay={0.05}>
              <Expand summary={T.bio.p1}>
                <p className="text-[20px] text-gray-600 leading-[1.75] mb-4">{T.bio.p1}</p>
                <p className="text-[20px] text-gray-600 leading-[1.75] mb-4">{T.bio.p2}</p>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mt-4">
                  <h4 className="text-[19px] font-semibold mb-2">Core strengths</h4>
                  <ul className="space-y-1">{T.bio.bullets.map((b: string, i: number) => <li key={i} className="text-[20px] text-gray-500 flex gap-2"><span className="text-gray-300">·</span>{b}</li>)}</ul>
                </div>
              </Expand>
            </F>
            <F delay={0.1}>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-16 mb-6">Career</h2>
              {career.map((c, i) => (
                <ExpandItem key={i} title={c.co} subtitle={c.role} badge={c.y}>
                  <p className="text-[20px] text-gray-500 leading-relaxed mb-2">{c.d}</p>
                  <p className="text-[20px] text-gray-600 leading-relaxed">{c.expanded}</p>
                </ExpandItem>
              ))}
            </F>
            <F delay={0.15}>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-16 mb-6">Values</h2>
              {[
                { title: 'Ship, then polish', desc: 'A shipped prototype teaches more than a perfect mockup.' },
                { title: 'Frame before solve', desc: 'The problem definition is half the solution.' },
                { title: 'Design the system', desc: 'Components are decisions. A design system is a set of commitments.' },
              ].map((v, i) => (
                <ExpandItem key={i} title={v.title}>
                  <p className="text-[20px] text-gray-500 leading-relaxed">{v.desc}</p>
                </ExpandItem>
              ))}
            </F>
          </div>
          <div className="md:col-span-5">
            <F delay={0.2}><div className="md:sticky md:top-20 space-y-5">
              <div className="rounded-2xl overflow-hidden bg-gray-50"><img src="/images/photos victor/image_victor_home.png" alt="" className="w-full aspect-[3/4] object-cover object-top" /></div>
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.02)]">
                <h3 className="text-[19px] font-semibold mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">{['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind', 'Vercel', 'Linear', 'Notion'].map(t => <span key={t} className="text-[20px] px-3 py-1.5 rounded-xl bg-gray-50 text-gray-600 border border-gray-100">{t}</span>)}</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.02)]">
                <h3 className="text-[19px] font-semibold mb-3">Companies</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">{LOGOS.map(n => <span key={n} className="text-[20px] text-gray-400">{n}</span>)}</div>
              </div>
            </div></F>
          </div>
        </div>
      </section>
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
        { label: 'Interface Work', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ BLOG ═══ */
function Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6"><div className="max-w-[1200px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Resources</h1></F>
        <F delay={0.05}><p className="text-[22px] text-gray-500 mb-12">{T.signals.subtitle}</p></F>
        <F delay={0.08}>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 mb-8 cursor-pointer group" onClick={() => go('article')}>
            <div className="flex items-center gap-2 mb-3"><BookOpen size={14} style={{ color: blue }} /><span className="text-[19px] font-bold uppercase tracking-wider" style={{ color: blue }}>Guide · 9 chapters</span></div>
            <h2 className="text-[20px] font-bold group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h2>
            <Expand summary="Complete guide for designers: from installation to deployment.">
              <p className="text-[19px] text-gray-500 leading-relaxed">A comprehensive walkthrough covering installation, configuration, visual quality tips, skills system, Figma MCP integration, and deployment workflows. Written from 6 months of daily practice.</p>
            </Expand>
          </div>
        </F>
        <F delay={0.1}><h3 className="text-[20px] font-bold mb-6">Articles</h3></F>
        {ARTICLES.map((a, i) => (
          <F key={a.id} delay={0.12 + i * 0.03}>
            <ExpandItem title={a.title_en} subtitle={`${a.category} · ${a.date}`}>
              <p className="text-[20px] text-gray-500 leading-relaxed mb-3">{a.body_en.slice(0, 250)}...</p>
              <button onClick={() => go('article')} className="text-[19px] font-medium flex items-center gap-1" style={{ color: blue }}>Read full article <ArrowRight size={12} /></button>
            </ExpandItem>
          </F>
        ))}
      </div></section>
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Interface Work', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ ARTICLE ═══ */
function ArticlePage({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[680px] mx-auto">
        <F><motion.button whileHover={{ x: -3 }} transition={spB} onClick={() => go('blog')} className="flex items-center gap-2 text-[19px] text-gray-400 hover:text-gray-900 mb-12"><ArrowLeft size={14} /> All articles</motion.button></F>
        <F delay={0.03}>
          <span className="px-3 py-1 rounded-xl bg-gray-100 text-[19px] font-semibold text-gray-600">{a.category}</span>
          <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mt-4 mb-8">{a.title_en}</h1>
        </F>
      </div></section>
      <article className="px-6 pb-20"><div className="max-w-[680px] mx-auto">
        {(a.body_long_en || a.body_en).split('. ').reduce((acc: string[][], s, i) => { const p = Math.floor(i / 3); if (!acc[p]) acc[p] = []; acc[p].push(s); return acc; }, []).map((ss, i) => (
          <F key={i} delay={i * 0.02}><p className="text-[22px] text-gray-700 leading-[1.85] mb-10" style={{ fontFeatureSettings: "'kern' 1, 'liga' 1" }}>
            {i === 0 && <span className="text-[52px] font-bold float-left mr-3 mt-2 leading-[0.78]" style={{ color: blue }}>{ss[0][0]}</span>}{i === 0 ? ss.join('. ').slice(1) : ss.join('. ')}.</p></F>
        ))}
      </div></article>
      <section className="py-12 px-6 border-t border-gray-100"><div className="max-w-[680px] mx-auto flex items-center gap-4">
        <img src="/images/photos victor/image_victor_home.png" alt="" className="w-14 h-14 rounded-full object-cover" />
        <div><p className="text-[20px] font-semibold">Victor Soussan</p><p className="text-[19px] text-gray-400">Lead Product Designer · Paris</p></div>
      </div></section>
      <section className="py-16 px-6 bg-gray-50/50"><div className="max-w-[800px] mx-auto">
        <h2 className="text-[20px] font-bold mb-6">More articles</h2>
        {ARTICLES.slice(1, 4).map((ra, i) => (
          <ExpandItem key={ra.id} title={ra.title_en} subtitle={`${ra.category} · ${ra.date}`}>
            <p className="text-[20px] text-gray-500 leading-relaxed">{ra.body_en.slice(0, 150)}...</p>
          </ExpandItem>
        ))}
      </div></section>
    </div>
  );
}

/* ═══ GALLERY ═══ */
function Gallery({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState('all');
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const groups = [
    { id: 'toolkit', label: 'Toolkit', images: UI.toolkit, screens: ['Planning', 'Task board', 'Gantt', 'Coordination', 'Batch actions', 'Mobile', 'Project hub', 'Admin', 'Billing', 'System'] },
    { id: 'scrim', label: 'SCRIM', images: UI.scrim, screens: ['Landing', 'Features', 'Pricing', 'Onboarding', 'Dashboard', 'Settings', 'Profile'] },
    { id: 'sqool', label: 'SQOOL', images: UI.sqool, screens: ['Classroom', 'Student', 'Launcher', 'Library', 'Device mgr', 'Teacher', 'Activity', 'Assessment', 'Admin'] },
  ];
  const filtered = filter === 'all' ? groups : groups.filter(g => g.id === filter);
  const allItems = filtered.flatMap(g => g.images.map((img, i) => ({ img, project: g.label, screen: g.screens[i] || 'Interface' })));
  const media: MediaItem[] = allItems.map(item => ({ type: 'image' as const, src: item.img, label: `${item.project}: ${item.screen}` }));

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[1400px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></F>
        <F delay={0.05}><p className="text-[22px] text-gray-500 mb-8">Click any image to explore at full scale. Arrow keys to navigate.</p></F>
        <F delay={0.08}><div className="flex gap-2 mb-8">
          {['all', ...groups.map(g => g.id)].map(id => (
            <motion.button key={id} whileTap={{ scale: 0.95 }} onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-xl text-[20px] font-medium transition-all ${filter === id ? 'text-white' : 'bg-gray-50 text-gray-500 hover:text-gray-700 border border-gray-100'}`}
              style={filter === id ? { background: blue } : {}}>
              {id === 'all' ? 'All' : groups.find(g => g.id === id)?.label}
            </motion.button>
          ))}
        </div></F>
      </div></section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {allItems.map((item, i) => (
            <F key={`${filter}-${i}`} delay={Math.min(i * 0.02, 0.15)}>
              <div className="break-inside-avoid group cursor-pointer" onClick={() => setLbIdx(i)}>
                <div className="rounded-2xl overflow-hidden bg-gray-50"><img src={item.img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" /></div>
                <div className="mt-2 px-1"><p className="text-[20px] font-semibold text-gray-900">{item.project}: {item.screen}</p></div>
              </div>
            </F>
          ))}
        </div>
      </div>
      <Continue items={[
        { label: 'Work', desc: 'Full case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'Background', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <LB items={media} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ EXPORT ═══ */
function GrainXL() {
  return <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />;
}

export function MacPawXL() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen text-gray-900" style={{ background: '#FAFAF8' }}>
      <GrainXL />
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <Case go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} />}
      {page === 'article' && <ArticlePage go={go} />}
      {page === 'gallery' && <Gallery go={go} />}
      <FloatCTA />
      <Surprise go={go} />
    </div>
  );
}
