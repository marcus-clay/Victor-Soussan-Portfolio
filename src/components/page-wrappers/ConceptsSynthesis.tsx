'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, Play, Pause, BookOpen, PencilSimple, Compass, UsersThree, Eye, Article, Layout } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';
import { scrollToElement } from '@/utils/smoothScroll';

/* ═══ REAL DATA ═══ */
const PROJECTS = getProjects('en');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TK = TOOLKIT_TRANSLATIONS.en as Record<string, any>;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS.slice(0, 6);

const UI = {
  toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`),
  scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`),
  sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`),
};

const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Toolkit: Batch editing', project: 'Toolkit' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Toolkit: Planning zoom', project: 'Toolkit' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Toolkit: Task manipulation', project: 'Toolkit' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion: Embed code', project: 'Dailymotion' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'SQOOL Connect: Dashboard', project: 'SQOOL' },
];

const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];
const TOOLS = ['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Linear', 'Notion'];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';
type MediaItem = { type: 'video' | 'image'; src: string; label: string };

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };
const springBounce = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";

/* ═══ CORE COMPONENTS ═══ */

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay, ...spring }} className={className}>{children}</motion.div>;
}

/* Video with hover-to-play + caption */
function Video({ src, label, onClick, className = '' }: { src: string; label: string; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`group relative rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer ${className}`}
      onMouseEnter={() => { ref.current?.play(); setPlaying(true); }}
      onMouseLeave={() => { ref.current?.pause(); setPlaying(false); }}
      onClick={onClick}>
      <video ref={ref} src={src} muted loop playsInline preload="metadata" className="w-full object-cover" />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
            <Play size={16} weight="fill" className="text-gray-900 ml-0.5" />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[12px] text-white font-medium" style={{ fontFamily: font }}>{label}</p>
      </div>
    </div>
  );
}

/* Captioned image (always has a legend) */
function CaptionedImage({ src, title, desc, onClick, className = '' }: { src: string; title: string; desc: string; onClick?: () => void; className?: string }) {
  return (
    <div className={`group ${className}`}>
      <div className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={onClick}>
        <img src={src} alt={title} className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[13px] font-semibold text-gray-900" style={{ fontFamily: font }}>{title}</p>
        <p className="text-[12px] text-gray-400 leading-relaxed mt-0.5" style={{ fontFamily: font }}>{desc}</p>
      </div>
    </div>
  );
}

/* Multi-media lightbox with keyboard nav + thumbnails */
function Lightbox({ items, startIdx, onClose }: { items: MediaItem[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const item = items[idx];
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') setIdx(i => Math.max(0, i - 1)); if (e.key === 'ArrowRight') setIdx(i => Math.min(items.length - 1, i + 1)); };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [items.length, onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center" onClick={onClose}>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10" onClick={e => e.stopPropagation()}>
        <p className="text-[14px] text-white/60 font-medium" style={{ fontFamily: font }}>{item.label}</p>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-white/40 font-mono tabular-nums">{idx + 1} / {items.length}</span>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white"><X size={20} /></button>
        </div>
      </div>
      <div className="flex items-center gap-4 max-w-[95vw] w-full justify-center" onClick={e => e.stopPropagation()}>
        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="p-3 text-white/30 hover:text-white disabled:opacity-20 shrink-0"><ArrowLeft size={24} /></button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
            className="max-w-[85vw] max-h-[80vh]">
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="max-w-full max-h-[80vh] rounded-lg" />
              : <img src={item.src} alt={item.label} className="max-w-full max-h-[80vh] rounded-lg object-contain" />}
          </motion.div>
        </AnimatePresence>
        <button onClick={() => setIdx(i => Math.min(items.length - 1, i + 1))} disabled={idx === items.length - 1} className="p-3 text-white/30 hover:text-white disabled:opacity-20 shrink-0"><ArrowRight size={24} /></button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4 scrollbar-hide" onClick={e => e.stopPropagation()}>
        {items.map((it, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-14 h-9 rounded-md overflow-hidden shrink-0 transition-all ${i === idx ? 'ring-2 ring-white opacity-100' : 'opacity-30 hover:opacity-60'}`}>
            {it.type === 'video' ? <video src={it.src} muted preload="metadata" className="w-full h-full object-cover" /> : <img src={it.src} alt="" className="w-full h-full object-cover" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* Sticky nav with scroll progress + page title */
function StickyNav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 80));
  const titles: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  const tabs: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' }, { id: 'work', label: 'Work' }, { id: 'about', label: 'About' },
    { id: 'blog', label: 'Resources' }, { id: 'gallery', label: 'Interface Work' },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gray-900 origin-left" style={{ scaleX: scrollYProgress }} />
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center">
        <button onClick={() => go('home')} className="text-[15px] font-semibold text-gray-900 tracking-[-0.01em] shrink-0" style={{ fontFamily: font }}>Victor Soussan</button>
        <AnimatePresence>
          {scrolled && titles[page] && (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={spring}
              className="text-[13px] text-gray-400 font-medium ml-2 shrink-0" style={{ fontFamily: font }}>/ {titles[page]}</motion.span>
          )}
        </AnimatePresence>
        <div className="ml-auto hidden md:flex items-center gap-0.5">
          {tabs.map(t => (
            <button key={t.id} onClick={() => go(t.id)}
              className={`px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${page === t.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'}`} style={{ fontFamily: font }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* Section progress bar for case study */
function CaseProgress({ sections }: { sections: string[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const els = sections.map((_, i) => document.getElementById(`cs-${i}`));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const i = els.indexOf(e.target as HTMLElement); if (i !== -1) setActiveIdx(i); } });
    }, { rootMargin: '-30% 0px -60% 0px' });
    els.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);
  return (
    <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-2">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {sections.map((s, i) => (
          <button key={i} onClick={() => scrollToElement(`cs-${i}`)}
            className={`text-[12px] font-semibold whitespace-nowrap transition-colors ${i === activeIdx ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'}`} style={{ fontFamily: font }}>{s}</button>
        ))}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          {sections.map((_, i) => <div key={i} className={`w-4 h-1 rounded-full transition-colors ${i <= activeIdx ? 'bg-gray-900' : 'bg-gray-200'}`} />)}
        </div>
      </div>
    </div>
  );
}

/* Continue reading module */
function ContinueModule({ items }: { items: { label: string; desc: string; image?: string; onClick: () => void }[] }) {
  return (
    <section className="py-16 px-6 border-t border-gray-100 bg-gray-50/30">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6" style={{ fontFamily: font }}>Continue exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button key={i} onClick={item.onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={springBounce}
              className="text-left p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-shadow group">
              {item.image && <img src={item.image} alt="" className="w-full aspect-[16/9] rounded-lg object-cover mb-3 group-hover:scale-[1.02] transition-transform" />}
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily: font }}>{item.label}</p>
              <p className="text-[13px] text-gray-400 mt-1" style={{ fontFamily: font }}>{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Testimonial horizontal scroller */
function TestimonialStrip() {
  const testimonials = [
    { author: TK.testimonial.author, role: TK.testimonial.role, content: TK.testimonial.quote },
    { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
  ];
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-6 px-6">
      {testimonials.map((t, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ...spring }}
          className="min-w-[340px] max-w-[420px] p-6 rounded-2xl bg-white border border-gray-100 snap-start shrink-0">
          <Quotes size={16} weight="fill" className="text-gray-200 mb-3" />
          <blockquote className="text-[15px] text-gray-600 leading-relaxed mb-4" style={{ fontFamily: font }}>{t.content}</blockquote>
          <p className="text-[13px]" style={{ fontFamily: font }}><span className="font-semibold text-gray-900">{t.author}</span> <span className="text-gray-400">· {t.role}</span></p>
        </motion.div>
      ))}
    </div>
  );
}

/* Back to top */
function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 1200));
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={springBounce}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[80] w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50">
          <ArrowRight size={14} className="text-gray-600 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SYNTHESIS A: "PRECISION"
   Narrow text (800px) + breakout visuals (1400px)
   LCA editorial case study + Motion video + Progressive disclosure
   ═══════════════════════════════════════════════════════════════════════ */

function SynAHome({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const allMedia: MediaItem[] = VIDEOS.slice(0, 3).map(v => ({ type: 'video', src: v.src, label: v.label }));

  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="py-28 md:py-40 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[14px] text-emerald-700 font-medium">{T.hero.availability}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-8 text-gray-900">
              {T.hero.title},<br /><span className="text-gray-300">{T.hero.subtitle}.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[19px] text-gray-500 leading-[1.7] mb-4 max-w-[600px]">{T.hero.desc.slice(0, 200)}.</p>
            <p className="text-[14px] text-gray-300 tracking-wide mb-10">{T.hero.positioning}</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springBounce} onClick={() => go('work')}
                className="group px-7 py-3.5 bg-gray-900 text-white rounded-full text-[15px] font-semibold flex items-center gap-2 hover:bg-gray-800">
                View work <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springBounce} onClick={() => go('about')}
                className="px-7 py-3.5 rounded-full text-[15px] text-gray-500 border border-gray-200 hover:border-gray-300 font-medium">About me</motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Featured video: breakout */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-4 mb-8">
          <Video src={VIDEOS[0].src} label={VIDEOS[0].label} className="rounded-2xl" onClick={() => setLbIdx(0)} />
          <div className="max-w-[800px] mx-auto mt-4">
            <p className="text-[13px] font-semibold text-gray-900">Toolkit: Batch editing workflow</p>
            <p className="text-[12px] text-gray-400 mt-0.5">Editing multiple tasks simultaneously reduces repetitive actions for site managers coordinating 15+ projects.</p>
          </div>
        </div>
      </FadeUp>

      {/* Projects list (narrow) */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em]">Selected work</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mt-2 mb-12">Projects</h2>
          </FadeUp>
          {PROJECTS.slice(0, 6).map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.04}>
              <motion.div whileHover={{ x: 4 }} transition={springBounce} onClick={() => go('case')}
                className="group flex items-center gap-6 py-6 border-b border-gray-100 cursor-pointer last:border-b-0">
                <span className="text-[12px] text-gray-300 font-mono w-6 tabular-nums">0{i + 1}</span>
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                  <img src={p.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-[14px] text-gray-400 mt-0.5">{p.role} · {p.period}</p>
                </div>
                <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Breakout UI visual grid */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-4 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {UI.toolkit.slice(0, 6).map((img, i) => (
              <CaptionedImage key={i} src={img} title={`Toolkit interface ${i + 1}`} desc="High-contrast components designed for field conditions." />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Expertise (narrow) */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2></FadeUp>
          {[
            { icon: PencilSimple, title: 'Design & Prototyping', desc: T.services.items.execution.join('. ') + '.' },
            { icon: Compass, title: 'Product Strategy', desc: T.services.items.utility.join('. ') + '.' },
            { icon: UsersThree, title: 'Leadership & Ops', desc: T.services.items.impact.join('. ') + '.' },
          ].map((p, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="flex gap-5 py-6 border-b border-gray-100 last:border-b-0">
                <p.icon size={24} weight="regular" className="text-gray-900 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-1">{p.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp>
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-4">Trusted by</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">{LOGOS.map(n => <span key={n} className="text-[14px] text-gray-200 font-medium">{n}</span>)}</div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Testimonials horizontal */}
      <section className="py-16 px-6"><div className="max-w-[1400px] mx-auto"><TestimonialStrip /></div></section>

      {/* Resources */}
      <section className="py-24 px-6 bg-gray-50/30">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Resources</h2>
              <motion.button whileHover={{ x: 2 }} transition={springBounce} onClick={() => go('blog')} className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All <ArrowRight size={12} /></motion.button>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="p-5 rounded-xl bg-white border border-gray-100 mb-5 cursor-pointer group" onClick={() => go('blog')}>
              <div className="flex items-center gap-2 mb-2"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span></div>
              <h3 className="text-[17px] font-semibold group-hover:text-blue-600 transition-colors">Getting started with Claude Code</h3>
              <p className="text-[14px] text-gray-400 mt-1">Complete guide for designers: from installation to deployment.</p>
            </div>
          </FadeUp>
          {ARTICLES.slice(0, 3).map((a, i) => (
            <FadeUp key={a.id} delay={0.08 + i * 0.04}>
              <motion.div whileHover={{ x: 3 }} transition={springBounce} onClick={() => go('article')}
                className="group cursor-pointer py-5 border-b border-gray-100 last:border-b-0">
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{a.category} · {a.date}</span>
                <h3 className="text-[16px] font-semibold mt-1.5 group-hover:text-blue-600 transition-colors">{a.title_en}</h3>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeUp>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
            <p className="text-[18px] text-gray-400 mb-8">Currently available for product design missions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-7 py-3.5 bg-gray-900 text-white rounded-full text-[15px] font-semibold flex items-center justify-center gap-2">Book a call <Calendar size={16} /></motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-7 py-3.5 rounded-full text-[15px] text-gray-500 border border-gray-200 flex items-center justify-center gap-2">Email <Envelope size={16} /></motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContinueModule items={[
        { label: 'Work', desc: 'All projects with video demos', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'Interface Work', desc: '100+ UI screens up close', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years of context', onClick: () => go('about') },
      ]} />

      <AnimatePresence>{lbIdx !== null && <Lightbox items={allMedia} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

/* Placeholder for pages B and C (will be added in follow-up) */
function SynAWork({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-16 px-6"><div className="max-w-[800px] mx-auto">
        <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Work</h1></FadeUp>
        <FadeUp delay={0.05}><p className="text-[18px] text-gray-500 leading-[1.7] mb-12">{T.services.subtitle}</p></FadeUp>
      </div></section>
      {PROJECTS.map((p, i) => (
        <FadeUp key={p.id} delay={i * 0.04}>
          <section className="pb-20 px-6">
            <div className="max-w-[800px] mx-auto mb-4">
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="text-[20px] font-bold tracking-[-0.02em]">{p.title}</h2>
                <span className="text-[13px] text-gray-300 font-mono">{p.period}</span>
              </div>
              <p className="text-[14px] text-gray-400 mb-1">{p.role}</p>
              <p className="text-[16px] text-gray-500 leading-relaxed">{p.summary}</p>
            </div>
            <div className="max-w-[1400px] mx-auto">
              <motion.div whileHover={{ scale: 1.003 }} transition={{ duration: 0.5 }} onClick={() => go('case')}
                className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer">
                <img src={p.coverImage} alt={p.title} className="w-full" loading="lazy" />
              </motion.div>
              <div className="max-w-[800px] mx-auto mt-3">
                <p className="text-[13px] font-semibold text-gray-900">{p.title}</p>
                <p className="text-[12px] text-gray-400">{p.summary.slice(0, 80)}</p>
              </div>
            </div>
          </section>
        </FadeUp>
      ))}
      <ContinueModule items={[
        { label: 'Interface Work', desc: 'UI craft at full scale', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

function SynACase({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const sections = ['Overview', 'Context', 'Phase 1', 'Phase 2', 'Phase 3', 'Design System', 'Impact'];
  const allMedia: MediaItem[] = [
    ...VIDEOS.slice(0, 3).map(v => ({ type: 'video' as const, src: v.src, label: v.label })),
    ...UI.toolkit.map((img, i) => ({ type: 'image' as const, src: img, label: `${TK.captions?.overview || 'Toolkit'} ${i + 1}` })),
  ];

  return (
    <div style={{ fontFamily: font }}>
      <CaseProgress sections={sections} />

      {/* Metadata + Title */}
      <section className="pt-20 pb-12 px-6" id="cs-header">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('work')}
              className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-10 transition-colors"><ArrowLeft size={14} /> All projects</motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <div className="flex items-center gap-6 text-[14px] text-gray-400 mb-6">
              <span className="font-semibold text-gray-900">Toolkit</span><span>·</span><span>{TK.meta.type}</span><span>·</span><span>{TK.meta.period}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-6">{TK.hero.title}</h1>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="text-[18px] text-gray-500 leading-[1.75]">{TK.hero.description}</p>
          </FadeUp>
        </div>
      </section>

      {/* Hero visual */}
      <FadeUp><div className="max-w-[1400px] mx-auto px-4 mb-16">
        <Video src={VIDEOS[0].src} label={VIDEOS[0].label} className="rounded-2xl" onClick={() => setLbIdx(0)} />
        <div className="max-w-[800px] mx-auto mt-4">
          <p className="text-[13px] font-semibold text-gray-900">Toolkit platform in action</p>
          <p className="text-[12px] text-gray-400">Batch editing workflow for managing tasks across multiple construction sites simultaneously.</p>
        </div>
      </div></FadeUp>

      {/* Overview */}
      <section className="py-16 px-6" id="cs-0">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Overview</span>
            <p className="text-[19px] text-gray-600 leading-[1.75] mb-6">{TK.overview.introP1}</p>
            <p className="text-[19px] text-gray-600 leading-[1.75]">{TK.overview.introP2}</p>
          </FadeUp>
        </div>
      </section>

      {/* Context */}
      <section className="py-16 px-6" id="cs-1">
        <div className="max-w-[800px] mx-auto mb-10">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Context</span>
            <p className="text-[19px] text-gray-600 leading-[1.75] mb-6">{TK.context.intro}</p>
          </FadeUp>
        </div>
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CaptionedImage src={UI.toolkit[0]} title="High-contrast field interface" desc="56px touch targets, AAA contrast for direct sunlight operation." onClick={() => setLbIdx(3)} />
              <CaptionedImage src={UI.toolkit[1]} title="Planning module" desc="Drag-and-drop Gantt scheduling adapted for non-technical site managers." onClick={() => setLbIdx(4)} />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Phase 1 */}
      <section className="py-16 px-6" id="cs-2">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Phase 1: Funding prototype</span>
            <p className="text-[19px] text-gray-600 leading-[1.75] mb-6">{TK.phase1.intro}</p>
          </FadeUp>
        </div>
        <FadeUp><div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {UI.toolkit.slice(2, 5).map((img, i) => (
              <CaptionedImage key={i} src={img} title={`Phase 1 screen ${i + 1}`} desc="Early prototype validated with construction site managers." onClick={() => setLbIdx(5 + i)} />
            ))}
          </div>
        </div></FadeUp>
      </section>

      {/* Phase 2 */}
      <section className="py-16 px-6" id="cs-3">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Phase 2: Feature expansion</span>
            <p className="text-[19px] text-gray-600 leading-[1.75]">{TK.phase2.intro}</p>
          </FadeUp>
        </div>
        <FadeUp><div className="max-w-[1400px] mx-auto px-4 mt-10">
          <Video src={VIDEOS[1].src} label={VIDEOS[1].label} className="rounded-2xl" onClick={() => setLbIdx(1)} />
          <div className="max-w-[800px] mx-auto mt-4">
            <p className="text-[13px] font-semibold text-gray-900">Planning zoom interaction</p>
            <p className="text-[12px] text-gray-400">Smooth zoom transitions let managers switch between day, week, and month views without losing context.</p>
          </div>
        </div></FadeUp>
      </section>

      {/* Phase 3 */}
      <section className="py-16 px-6" id="cs-4">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Phase 3: Mobile optimization</span>
            <p className="text-[19px] text-gray-600 leading-[1.75]">{TK.phase3.intro}</p>
          </FadeUp>
        </div>
        <FadeUp><div className="max-w-[1400px] mx-auto px-4 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {UI.toolkit.slice(5, 9).map((img, i) => (
              <CaptionedImage key={i} src={img} title={`Mobile screen ${i + 1}`} desc="Optimized for one-handed use on construction sites." onClick={() => setLbIdx(8 + i)} />
            ))}
          </div>
        </div></FadeUp>
      </section>

      {/* Design System */}
      <section className="py-16 px-6" id="cs-5">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Design system</span>
            <p className="text-[19px] text-gray-600 leading-[1.75]">{TK.designSystem.intro}</p>
          </FadeUp>
        </div>
        <FadeUp><div className="max-w-[1400px] mx-auto px-4 mt-10">
          <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLbIdx(12)}>
            <img src={UI.toolkit[9]} alt="Design system" className="w-full hover:scale-[1.01] transition-transform duration-700" />
          </div>
          <div className="max-w-[800px] mx-auto mt-4">
            <p className="text-[13px] font-semibold text-gray-900">Tailwind-ready component library</p>
            <p className="text-[12px] text-gray-400">40+ components enabling the CTO to implement designs directly from Figma source files.</p>
          </div>
        </div></FadeUp>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="flex gap-6">
              <div className="w-1 bg-gray-200 rounded-full shrink-0" />
              <div>
                <blockquote className="text-[19px] text-gray-600 leading-[1.7] italic mb-4">{TK.testimonial.quote}</blockquote>
                <p className="text-[14px]"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 px-6" id="cs-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Impact</span>
            <p className="text-[19px] text-gray-600 leading-[1.75] mb-8">{TK.impact.intro}</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div><span className="text-3xl font-bold text-gray-900">{TK.impact.customers}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.customersDesc}</p></div>
              <div><span className="text-3xl font-bold text-gray-900">{TK.impact.seriesA}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.seriesADesc}</p></div>
              <div><span className="text-3xl font-bold text-gray-900">{TK.impact.enterprise}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.enterpriseDesc}</p></div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Next project */}
      <section className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <motion.div whileHover={{ x: 4 }} transition={springBounce} onClick={() => go('case')}
              className="flex items-center gap-5 py-4 cursor-pointer group">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0"><img src={PROJECTS[1].coverImage} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1">
                <p className="text-[12px] text-gray-400">Next project</p>
                <p className="text-[15px] font-semibold group-hover:text-blue-600 transition-colors">{PROJECTS[1].title}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </FadeUp>
        </div>
      </section>

      <ContinueModule items={[
        { label: 'All projects', desc: 'Browse work', image: PROJECTS[2].coverImage, onClick: () => go('work') },
        { label: 'Interface Work', desc: 'UI at full scale', image: UI.scrim[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
      ]} />

      <AnimatePresence>{lbIdx !== null && <Lightbox items={allMedia} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

function SynAAbout({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-8">About</h1></FadeUp>
            <FadeUp delay={0.05}><p className="text-[18px] text-gray-600 leading-[1.75] mb-6">{T.bio.p1}</p></FadeUp>
            <FadeUp delay={0.1}><p className="text-[18px] text-gray-600 leading-[1.75] mb-6">{T.bio.p2}</p></FadeUp>
            <FadeUp delay={0.15}>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-12 mb-8">Career</h2>
              {[
                { y: '2024-25', co: 'France VAE / Beta.gouv', role: 'Lead Product Designer', desc: 'Product ops for a national public service, 100K+ candidates.' },
                { y: '2023-24', co: 'Toolkit', role: 'Founding Designer', desc: '0-to-1 construction tech SaaS.' },
                { y: '2018-24', co: 'UNOWHY / SQOOL', role: 'Product Design Manager', desc: 'Team of 4, 8 apps, 500K+ students.' },
                { y: '2017-18', co: 'Dailymotion', role: 'Senior Product Designer', desc: 'Video suite for CBS, Bein Sports.' },
                { y: '2014-17', co: 'PagesJaunes', role: 'Mobile UI Lead', desc: '22M users, iOS/Android.' },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, ...spring }}
                  className="flex gap-5 py-5 border-b border-gray-100 last:border-b-0">
                  <span className="text-[13px] text-gray-300 font-mono w-14 tabular-nums shrink-0">{t.y}</span>
                  <div>
                    <p className="text-[16px] font-semibold">{t.co}</p>
                    <p className="text-[14px] text-gray-400">{t.role}</p>
                    <p className="text-[14px] text-gray-500 mt-1">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </FadeUp>
          </div>
          <div className="md:col-span-5">
            <FadeUp delay={0.15}>
              <div className="md:sticky md:top-20 space-y-5">
                <div className="rounded-2xl overflow-hidden bg-gray-50"><img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full aspect-[3/4] object-cover object-top" /></div>
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <h3 className="text-[14px] font-semibold mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2">{TOOLS.map(t => <span key={t} className="text-[13px] px-3 py-1.5 rounded-full bg-white text-gray-600 border border-gray-100">{t}</span>)}</div>
                </div>
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <h3 className="text-[14px] font-semibold mb-3">Companies</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">{LOGOS.map(n => <span key={n} className="text-[13px] text-gray-400">{n}</span>)}</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ContinueModule items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'Resources', desc: 'Articles and guides', onClick: () => go('blog') },
        { label: 'Interface Work', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

function SynABlog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Resources</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[18px] text-gray-400 mb-12">{T.signals.subtitle}</p></FadeUp>
          <FadeUp delay={0.08}>
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8 cursor-pointer group" onClick={() => go('article')}>
              <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span></div>
              <h2 className="text-[20px] font-bold group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h2>
              <p className="text-[16px] text-gray-500 leading-relaxed">Complete guide for designers: installation to deployment, visual quality, skills, and Figma MCP.</p>
            </div>
          </FadeUp>
          {ARTICLES.map((a, i) => (
            <FadeUp key={a.id} delay={0.1 + i * 0.04}>
              <motion.div whileHover={{ x: 3 }} transition={springBounce} onClick={() => go('article')}
                className="group cursor-pointer py-6 border-b border-gray-100 last:border-b-0">
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{a.category} · {a.date}</span>
                <h3 className="text-[18px] font-semibold mt-2 mb-2 group-hover:text-blue-600 transition-colors">{a.title_en}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2">{a.body_en.slice(0, 160)}...</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>
      <ContinueModule items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Interface Work', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

function SynAArticle({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('blog')}
              className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-12 transition-colors"><ArrowLeft size={14} /> All articles</motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">{a.category}</span>
              <span className="text-[13px] text-gray-300 font-mono">{a.date}</span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-8">{a.title_en}</h1>
          </FadeUp>
        </div>
      </section>
      <article className="px-6 pb-20">
        <div className="max-w-[680px] mx-auto">
          {(a.body_long_en || a.body_en).split('. ').reduce((acc: string[][], s, i) => {
            const pIdx = Math.floor(i / 3);
            if (!acc[pIdx]) acc[pIdx] = [];
            acc[pIdx].push(s);
            return acc;
          }, []).map((sentences, i) => (
            <FadeUp key={i} delay={i * 0.02}>
              <p className="text-[19px] text-gray-700 leading-[1.85] mb-10 tracking-[-0.005em]" style={{ fontFeatureSettings: "'kern' 1, 'liga' 1", textRendering: 'optimizeLegibility' }}>
                {i === 0 && <span className="text-[52px] font-bold text-gray-900 float-left mr-3 mt-2 leading-[0.78]">{sentences[0][0]}</span>}
                {i === 0 ? sentences.join('. ').slice(1) : sentences.join('. ')}.
              </p>
            </FadeUp>
          ))}
        </div>
      </article>
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-[680px] mx-auto flex items-center gap-4">
          <img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-14 h-14 rounded-full object-cover" />
          <div><p className="text-[15px] font-semibold">Victor Soussan</p><p className="text-[14px] text-gray-400">Lead Product Designer · Paris</p></div>
        </div>
      </section>
      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[20px] font-bold mb-6">More articles</h2>
          <div className="space-y-4">
            {ARTICLES.slice(1, 4).map((ra, i) => (
              <FadeUp key={ra.id} delay={i * 0.04}>
                <motion.div whileHover={{ x: 3 }} transition={springBounce} onClick={() => go('article')}
                  className="group cursor-pointer py-4 border-b border-gray-100 last:border-b-0">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{ra.category}</span>
                  <h3 className="text-[16px] font-semibold mt-1 group-hover:text-blue-600 transition-colors">{ra.title_en}</h3>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SynAGallery({ go }: { go: (p: PageId) => void }) {
  const allImages = [...UI.toolkit, ...UI.scrim, ...UI.sqool];
  const allMedia: MediaItem[] = allImages.map((img, i) => ({ type: 'image', src: img, label: `Interface ${i + 1}` }));
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[18px] text-gray-500 mb-12">A selection of interfaces designed over the years. Click any image to explore in full screen with keyboard navigation.</p></FadeUp>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {allImages.map((img, i) => (
            <FadeUp key={i} delay={Math.min(i * 0.02, 0.2)}>
              <div className="break-inside-avoid">
                <CaptionedImage src={img} title={`Interface ${i + 1}`} desc="Designed with attention to contrast, spacing, and touch target precision." onClick={() => setLbIdx(i)} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <ContinueModule items={[
        { label: 'Work', desc: 'Full case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'Background', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <Lightbox items={allMedia} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

/* ═══ EXPORT: SYNTHESIS A ═══ */
export function SynthesisA() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <StickyNav page={page} go={go} />
      {page === 'home' && <SynAHome go={go} />}
      {page === 'work' && <SynAWork go={go} />}
      {page === 'case' && <SynACase go={go} />}
      {page === 'about' && <SynAAbout go={go} />}
      {page === 'blog' && <SynABlog go={go} />}
      {page === 'article' && <SynAArticle go={go} />}
      {page === 'gallery' && <SynAGallery go={go} />}
      <BackToTop />
    </div>
  );
}

/* B and C are in separate files, re-exported here */
export { SynthesisB } from './ConceptsSynthesisB';
export { SynthesisC } from './ConceptsSynthesisC';
