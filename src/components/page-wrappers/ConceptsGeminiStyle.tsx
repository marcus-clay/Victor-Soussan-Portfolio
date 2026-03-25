'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretDown, X, Play, BookOpen, PencilSimple, Compass, UsersThree, Lightning, Sparkle, Eye, Star } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';

const ALL_P = getProjects('en');
const CASES = ALL_P.filter(p => p.format === 'case-study').map(p => ({ ...p, coverImage: p.coverImage.startsWith('/') ? p.coverImage : `/images/${p.coverImage}` }));
const SHORTS = ALL_P.filter(p => p.format === 'short').map(p => ({ ...p, coverImage: p.coverImage.startsWith('/') ? p.coverImage : `/images/${p.coverImage}` }));
const PROJECTS = [...CASES, ...SHORTS];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TK = TOOLKIT_TRANSLATIONS.en as Record<string, any>;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS;
const UI = { toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`), scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`), sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`) };
const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Toolkit: Batch editing' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Toolkit: Planning' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Toolkit: Tasks' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion: Embed' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'SQOOL Connect' },
  { src: '/images/pj-and-app-onboarding-animation.mp4', label: 'PagesJaunes: Onboarding' },
];
const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];
const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: TK.testimonial.quote, avatar: '/images/pierre-marie-nigay.webp' },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale.", avatar: '/images/charlotte-rifflet.webp' },
  { author: 'Nicolas Moulin', role: 'Director of Innovation, PagesJaunes', content: "Victor brought a level of visual precision and interaction thinking that elevated the entire mobile experience for our 22 million users.", avatar: '/images/nicolas-moulin.webp' },
];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';
type MediaItem = { type: 'video' | 'image'; src: string; label: string };
const bounce = { type: 'spring' as const, stiffness: 500, damping: 20, mass: 0.8 };
const ease = [0.22, 1, 0.36, 1] as const;
const font = "system-ui, -apple-system, 'Segoe UI', sans-serif";
const blue = '#2D5CF3';

/* ═══ COMPONENTS ═══ */

function F({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-30px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease }} className={className}>{children}</motion.div>;
}

/* Image card with colored border/shadow (NOT macOS frame everywhere) */
function ImgCard({ src, label, shadow = 'blue', onClick, className = '' }: { src: string; label?: string; shadow?: 'blue' | 'violet' | 'rose'; onClick?: () => void; className?: string }) {
  const shadowMap = { blue: 'rgba(45,92,243,0.1)', violet: 'rgba(139,92,246,0.1)', rose: 'rgba(236,72,153,0.1)' };
  const borderMap = { blue: 'rgba(45,92,243,0.18)', violet: 'rgba(139,92,246,0.18)', rose: 'rgba(236,72,153,0.18)' };
  return (
    <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.5, ease }} onClick={onClick}
      className={`group cursor-pointer rounded-2xl overflow-hidden ${className}`}
      style={{ boxShadow: `0 20px 60px ${shadowMap[shadow]}, 0 8px 20px rgba(0,0,0,0.06)`, border: `1.5px solid ${borderMap[shadow]}` }}>
      <img src={src} alt={label || ''} className="w-full transition-transform duration-[2000ms] group-hover:scale-[1.05]" loading="lazy" />
      {label && <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><p className="text-[12px] text-white font-medium">{label}</p></div>}
    </motion.div>
  );
}

/* Featured macOS frame (used sparingly, only for hero featured project) */
function MacFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`} style={{ boxShadow: `0 25px 60px rgba(45,92,243,0.1), 0 8px 24px rgba(0,0,0,0.05)`, border: '1.5px solid rgba(45,92,243,0.1)' }}>
      <div className="h-7 bg-[#F6F6F6] border-b border-gray-200/50 flex items-center px-2.5 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}

/* Video hover-to-play */
function Vid({ src, label, onClick }: { src: string; label: string; onClick?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ boxShadow: '0 16px 48px rgba(45,92,243,0.08), 0 4px 12px rgba(0,0,0,0.04)', border: '1.5px solid rgba(45,92,243,0.1)' }}
      onMouseEnter={() => { ref.current?.play(); setOn(true); }} onMouseLeave={() => { ref.current?.pause(); setOn(false); }} onClick={onClick}>
      <video ref={ref} src={src} muted loop playsInline preload="metadata" className="w-full object-cover" />
      {!on && <div className="absolute inset-0 flex items-center justify-center bg-black/5"><div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg" style={{ boxShadow: `0 4px 20px rgba(45,92,243,0.15)` }}><Play size={20} weight="fill" className="ml-0.5" style={{ color: blue }} /></div></div>}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><p className="text-[12px] text-white font-medium">{label}</p></div>
    </motion.div>
  );
}

/* Lightbox with zoom-in transition */
function Lightbox({ items, idx, onClose, onChange }: { items: MediaItem[]; idx: number; onClose: () => void; onChange: (i: number) => void }) {
  const item = items[idx];
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') onChange(Math.max(0, idx - 1)); if (e.key === 'ArrowRight') onChange(Math.min(items.length - 1, idx + 1)); };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [idx, items.length, onClose, onChange]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center" onClick={onClose}>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10" onClick={e => e.stopPropagation()}>
        <p className="text-[14px] text-white/60">{item.label}</p>
        <div className="flex items-center gap-4"><span className="text-[13px] text-white/30 font-mono">{idx + 1}/{items.length}</span><button onClick={onClose} className="p-2 text-white/40 hover:text-white"><X size={20} /></button></div>
      </div>
      <div className="flex items-center gap-4 max-w-[95vw] w-full justify-center" onClick={e => e.stopPropagation()}>
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={() => onChange(Math.max(0, idx - 1))} disabled={idx === 0} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowLeft size={28} /></motion.button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.7, rotateY: 12, y: 40 }} animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, ease }}>
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="max-w-full max-h-[80vh] rounded-2xl" /> : <img src={item.src} alt="" className="max-w-full max-h-[80vh] rounded-2xl object-contain" />}
          </motion.div>
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={() => onChange(Math.min(items.length - 1, idx + 1))} disabled={idx === items.length - 1} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowRight size={28} /></motion.button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4 scrollbar-hide" onClick={e => e.stopPropagation()}>
        {items.map((it, i) => (
          <motion.button key={i} whileHover={{ scale: 1.15 }} onClick={() => onChange(i)} className={`w-14 h-9 rounded-lg overflow-hidden shrink-0 transition-all ${i === idx ? 'ring-2 ring-white opacity-100 scale-110' : 'opacity-25 hover:opacity-50'}`}>
            {it.type === 'video' ? <video src={it.src} muted preload="metadata" className="w-full h-full object-cover" /> : <img src={it.src} alt="" className="w-full h-full object-cover" />}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* Expand */
function Expand({ summary, children }: { summary: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={`transition-opacity duration-150 ${open ? 'hidden' : 'block'}`}>
        <p className="text-[17px] text-gray-500 leading-[1.7]">{summary}</p>
      </div>
      <div className="grid transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden"><div className={`transition-opacity duration-150 ${open ? 'opacity-100' : 'opacity-0'}`}>{children}</div></div>
      </div>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }} transition={bounce}
        className="mt-4 px-5 py-2.5 rounded-xl text-[14px] font-semibold flex items-center gap-2 bg-white text-gray-700 transition-colors hover:bg-gray-50"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)', border: '1.5px solid rgba(0,0,0,0.08)' }}>
        {open ? 'Show less' : 'Read more'} <motion.span animate={{ rotate: open ? 180 : 0 }} transition={bounce}><CaretDown size={13} /></motion.span>
      </motion.button>
    </div>
  );
}

function ExpandItem({ title, sub, badge, children }: { title: string; sub?: string; badge?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5 border-b border-gray-100/80 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 text-left group">
        <div className="flex-1"><div className="flex items-baseline gap-3"><h3 className="text-[17px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>{badge && <span className="text-[12px] text-gray-400 font-mono">{badge}</span>}</div>
          {sub && <p className="text-[14px] text-gray-400 mt-0.5">{sub}</p>}</div>
        <motion.div animate={{ rotate: open ? 45 : 0, scale: open ? 1.1 : 1 }} transition={bounce}
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
          style={{ background: open ? blue : 'white', border: `1.5px solid ${open ? blue : 'rgba(45,92,243,0.15)'}`, boxShadow: '0 2px 8px rgba(45,92,243,0.08)' }}>
          <span className={`text-[18px] leading-none font-medium ${open ? 'text-white' : 'text-blue-500'}`}>+</span>
        </motion.div>
      </button>
      {/* CSS grid transition instead of Framer height:auto (no layout thrash) */}
      <div className="grid transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className={`pt-4 pb-1 transition-opacity duration-150 ${open ? 'opacity-100' : 'opacity-0'}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* Wave divider */
function Wave({ color = '#F0F4FF', flip = false }: { color?: string; flip?: boolean }) {
  return <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`} style={{ marginTop: flip ? 0 : -1, marginBottom: flip ? -1 : 0 }}><svg viewBox="0 0 1440 60" className="w-full h-16 md:h-24" preserveAspectRatio="none"><path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,38 1440,30 L1440,60 L0,60 Z" fill={color} /></svg></div>;
}

/* Gradient orb */
function Orb({ color, size, className = '' }: { color: string; size: number; className?: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} style={{ width: size, height: size, background: `radial-gradient(circle at 40% 40%, ${color} 0%, transparent 70%)`, opacity: 0.4 }} />;
}

/* Scroll-triggered nudge */
function ScrollNudge({ text, cta, onClick, at = 2000 }: { text: string; cta: string; onClick: () => void; at?: number }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => { if (!gone) setShow(v > at && v < at + 1500); });
  if (gone) return null;
  return <AnimatePresence>{show && (
    <motion.div initial={{ opacity: 0, x: -32, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease }}
      className="fixed left-6 top-1/3 z-[75] max-w-[220px] p-4 bg-white rounded-2xl shadow-xl" style={{ border: '1.5px solid rgba(45,92,243,0.1)', boxShadow: '0 16px 48px rgba(45,92,243,0.08)' }}>
      <button onClick={() => setGone(true)} className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500"><X size={12} /></button>
      <p className="text-[14px] text-gray-700 font-medium leading-snug pr-4">{text}</p>
      <button onClick={() => { onClick(); setGone(true); }} className="mt-2 text-[13px] font-semibold flex items-center gap-1" style={{ color: blue }}>{cta} <ArrowRight size={11} /></button>
    </motion.div>
  )}</AnimatePresence>;
}

/* Scroll-triggered stat reveal */
function ScrollStat({ label, value, at = 3000 }: { label: string; value: string; at?: number }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => { if (!gone) setShow(v > at && v < at + 2000); });
  if (gone) return null;
  return <AnimatePresence>{show && (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.4, ease }}
      className="fixed right-6 bottom-24 z-[75] px-5 py-3 bg-white rounded-xl shadow-lg" style={{ border: '1.5px solid rgba(45,92,243,0.1)' }}>
      <button onClick={() => setGone(true)} className="absolute top-1.5 right-1.5 p-0.5 text-gray-300 hover:text-gray-500"><X size={10} /></button>
      <span className="text-[24px] font-bold" style={{ color: blue }}>{value}</span>
      <p className="text-[12px] text-gray-400 font-medium">{label}</p>
    </motion.div>
  )}</AnimatePresence>;
}

/* Nav */
function Nav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 80));
  const labels: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interfaces' };
  return (
    <motion.nav className="fixed top-0 w-full z-50">
      <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left" style={{ scaleX: scrollYProgress, background: `linear-gradient(90deg, ${blue}, #8B5CF6)` }} />
      <div className={`transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)]' : 'bg-transparent'}`}>
        <div className="max-w-[1100px] mx-auto px-8 h-16 flex items-center">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => go('home')} className="text-[16px] font-bold text-gray-900 tracking-[-0.02em]" style={{ fontFamily: font }}>Victor Soussan</motion.button>
          <AnimatePresence>
            {scrolled && labels[page] && <motion.span initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} className="text-[14px] text-gray-400 font-medium ml-3">{labels[page]}</motion.span>}
          </AnimatePresence>
          <div className="ml-auto hidden md:flex items-center gap-2">
            {([['home','Home'],['work','Work'],['about','About'],['blog','Resources'],['gallery','Interfaces']] as [PageId,string][]).map(([id,label]) => (
              <motion.button key={id} whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.92 }} onClick={() => go(id)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-300 ${page === id ? 'text-white shadow-lg' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                style={page === id ? { background: blue, boxShadow: `0 4px 14px rgba(45,92,243,0.3)` } : {}}>
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/* Continue */
function Continue({ items }: { items: { label: string; desc: string; image?: string; onClick: () => void }[] }) {
  return (
    <section className="py-32 px-8 bg-white border-t border-gray-100/50">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[13px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-10">Continue exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.button key={i} onClick={item.onClick} whileHover={{ y: -10, scale: 1.01 }} transition={{ duration: 0.4, ease }} className="text-left group">
              {item.image && <div className="rounded-2xl overflow-hidden mb-5" style={{ boxShadow: '0 12px 40px rgba(45,92,243,0.06)', border: '1.5px solid rgba(45,92,243,0.08)' }}><img src={item.image} alt="" className="w-full aspect-[16/9] object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]" /></div>}
              <p className="text-[16px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.label}</p>
              <p className="text-[14px] text-gray-400 mt-1">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ HOME ═══ */
function Home({ go, variant }: { go: (p: PageId) => void; variant: 'A' | 'B' | 'C' }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const allMedia: MediaItem[] = [...VIDEOS.map(v => ({ type: 'video' as const, src: v.src, label: v.label })), ...UI.toolkit.slice(0, 6).map((img, i) => ({ type: 'image' as const, src: img, label: `Toolkit screen ${i + 1}` }))];
  const heroBg = variant === 'A' ? 'linear-gradient(180deg, #F4F7FF 0%, #EEF2FF 40%, white 100%)' : variant === 'C' ? 'linear-gradient(180deg, #F3EFFE 0%, #EBF0FE 40%, white 100%)' : 'linear-gradient(160deg, #F4F7FF 0%, #EEF2FF 60%, white 100%)';
  const isCenter = variant !== 'B';

  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="pt-32 pb-20 px-8 relative overflow-hidden" style={{ background: heroBg }}>
        <Orb color="rgba(45,92,243,0.12)" size={500} className="top-[-150px] right-[-100px]" />
        {variant === 'C' && <Orb color="rgba(139,92,246,0.1)" size={400} className="bottom-[-100px] left-[-80px]" />}
        <div className={`max-w-[1100px] mx-auto relative z-10 ${isCenter ? 'text-center' : ''}`}>
          <div className={isCenter ? 'max-w-[700px] mx-auto' : 'max-w-[600px]'}>
            <F><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm mb-10" style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              <span className="text-[14px] text-gray-600 font-medium">{T.hero.availability}</span>
            </div></F>
            <F delay={0.08}><h1 className="text-[clamp(2.8rem,6vw,4.8rem)] font-bold tracking-[-0.03em] leading-[1.05] text-gray-900 mb-3">{T.hero.title}</h1>
              <p className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-gray-400 tracking-[-0.01em] mb-8">{T.hero.subtitle}</p></F>
            <F delay={0.12}>
              <p className="text-[18px] text-gray-500 leading-[1.65] mb-10 max-w-[520px] mx-auto">{T.hero.desc.slice(0, 180)}.</p>
            </F>
            <F delay={0.16}><div className={`flex gap-3 mt-8 ${isCenter ? 'justify-center' : ''}`}>
              <motion.button whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => go('work')}
                className="px-8 py-4 rounded-full text-[15px] font-semibold text-white flex items-center gap-2"
                style={{ background: variant === 'C' ? 'linear-gradient(135deg, #7C3AED, #2D5CF3)' : blue, boxShadow: `0 6px 20px ${variant === 'C' ? 'rgba(124,58,237,0.3)' : 'rgba(45,92,243,0.3)'}` }}>
                View work <ArrowUpRight size={16} />
              </motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => go('about')}
                className="px-8 py-4 rounded-full text-[15px] text-gray-600 font-semibold bg-white shadow-sm hover:shadow-md transition-shadow" style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>
                About me
              </motion.button>
            </div></F>
          </div>
        </div>
      </section>

      {/* Featured project: single macOS frame (only here) */}
      <section className="py-16 px-8">
        <div className="max-w-[960px] mx-auto">
          <F>
            <motion.div whileHover={{ y: -10, scale: 1.01 }} transition={{ duration: 0.5, ease }} onClick={() => go('case')} className="cursor-pointer group">
              <MacFrame className="transition-all duration-500 group-hover:shadow-[0_30px_80px_rgba(45,92,243,0.12)]">
                <img src={PROJECTS[0].coverImage} alt="" className="w-full transition-transform duration-[2000ms] group-hover:scale-[1.03]" />
              </MacFrame>
              <div className="text-center mt-8">
                <span className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: blue }}>{PROJECTS[0].role} · {PROJECTS[0].period}</span>
                <h3 className="text-[28px] font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors">{PROJECTS[0].title}</h3>
                <p className="text-[16px] text-gray-500 max-w-md mx-auto">{PROJECTS[0].summary.slice(0, 100)}.</p>
              </div>
            </motion.div>
          </F>
        </div>
      </section>

      {/* Projects: tilted images on blue section */}
      <Wave color="#F0F4FF" />
      <section className="py-32 px-8 relative" style={{ background: '#F0F4FF' }}>
        <Orb color="rgba(45,92,243,0.08)" size={300} className="top-[10%] right-[-50px]" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-6 text-center">Selected work</h2></F>
          <F delay={0.05}><p className="text-[17px] text-gray-500 mb-14 text-center max-w-md mx-auto">Case studies, concepts, and experiments.</p></F>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {PROJECTS.slice(1, 7).map((p, i) => (
              <F key={p.id} delay={0.08 + i * 0.05}>
                <motion.div whileHover={{ y: -10, rotate: 0 }} initial={{ rotate: i % 3 === 0 ? -1.5 : i % 3 === 2 ? 1.5 : 0 }} transition={{ duration: 0.5, ease }}
                  onClick={() => go(p.format === 'case-study' ? 'case' : 'work')} className="cursor-pointer group">
                  <ImgCard src={p.coverImage} shadow={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'violet' : 'rose'} />
                  <div className="mt-4 px-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                      {p.format === 'short' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 font-semibold">Concept</span>}
                    </div>
                    <p className="text-[13px] text-gray-400">{p.role} · {p.period}</p>
                  </div>
                </motion.div>
              </F>
            ))}
          </div>
          <F><div className="text-center"><motion.button whileHover={{ y: -2 }} onClick={() => go('work')} className="text-[15px] font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all" style={{ color: blue }}>All projects <ArrowRight size={14} /></motion.button></div></F>
        </div>
      </section>
      <Wave color="#F0F4FF" flip />

      {/* Video strip */}
      <section className="py-20 px-8">
        <div className="max-w-[800px] mx-auto mb-8 text-center"><F><h3 className="text-[22px] font-bold text-gray-900">Products in motion</h3><p className="text-[15px] text-gray-400 mt-2">Hover to preview. Click to explore.</p></F></div>
        <div className="flex gap-5 overflow-x-auto px-8 pb-4 snap-x scrollbar-hide">
          {VIDEOS.slice(0, 4).map((v, i) => (
            <F key={i} delay={i * 0.05}><div className="min-w-[380px] md:min-w-[460px] shrink-0 snap-start">
              <Vid src={v.src} label={v.label} onClick={() => setLbIdx(i)} />
            </div></F>
          ))}
        </div>
      </section>

      {/* Expertise with gradient cards */}
      <section className="py-32 px-8">
        <div className="max-w-[1100px] mx-auto">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-6 text-center">Expertise</h2></F>
          <F delay={0.05}><p className="text-[17px] text-gray-500 mb-16 text-center max-w-md mx-auto">{T.services.subtitle.slice(0, 100)}.</p></F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: PencilSimple, title: T.services.execution, items: T.services.items.execution, bg: 'linear-gradient(135deg, #EBF0FE 0%, #F3EFFE 100%)' },
              { icon: Compass, title: T.services.utility, items: T.services.items.utility, bg: 'linear-gradient(135deg, #F3EFFE 0%, #FDF2F8 100%)' },
              { icon: UsersThree, title: T.services.impact, items: T.services.items.impact, bg: 'linear-gradient(135deg, #ECFEFF 0%, #EBF0FE 100%)' },
            ].map((p, i) => (
              <F key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.5, ease }}
                  className="p-8 rounded-3xl" style={{ background: p.bg, boxShadow: '0 8px 32px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm mb-6"><p.icon size={26} style={{ color: blue }} /></div>
                  <h3 className="text-[19px] font-bold text-gray-900 mb-4">{p.title}</h3>
                  <Expand summary={p.items[0]}>
                    <ul className="space-y-2">{p.items.map((item: string, j: number) => <li key={j} className="text-[15px] text-gray-500 leading-relaxed flex gap-2"><span style={{ color: blue }}>·</span>{item}</li>)}</ul>
                  </Expand>
                </motion.div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials on rose */}
      <Wave color="#FFF0F6" />
      <section className="py-32 px-8 relative" style={{ background: 'linear-gradient(180deg, #FFF0F6 0%, #FDE8F0 100%)' }}>
        <Orb color="rgba(236,72,153,0.08)" size={300} className="bottom-[-80px] left-[-50px]" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-14 text-center">What they say</h2></F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <F key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -10, rotate: i === 0 ? -1 : i === 2 ? 1 : 0 }} transition={{ duration: 0.5, ease }}
                  className="p-7 rounded-2xl bg-white h-full flex flex-col" style={{ boxShadow: '0 12px 40px rgba(236,72,153,0.06)', border: '1.5px solid rgba(236,72,153,0.08)' }}>
                  <Quotes size={20} weight="fill" className="mb-4 text-pink-300" />
                  <blockquote className="text-[15px] text-gray-600 leading-[1.7] mb-5 flex-1">{t.content}</blockquote>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt="" className="w-11 h-11 rounded-full object-cover shadow-sm border-2 border-white" />
                    <div><p className="text-[14px] font-bold text-gray-900">{t.author}</p><p className="text-[12px] text-gray-400">{t.role}</p></div>
                  </div>
                </motion.div>
              </F>
            ))}
          </div>
          <F><div className="mt-14 text-center">
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-5">Companies I have worked with</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center">{LOGOS.map(n => <span key={n} className="text-[16px] text-gray-300 font-bold hover:text-gray-500 transition-colors cursor-default">{n}</span>)}</div>
          </div></F>
        </div>
      </section>
      <Wave color="#FFF0F6" flip />

      {/* Resources */}
      <section className="py-32 px-8">
        <div className="max-w-[800px] mx-auto text-center">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-14">Resources</h2></F>
          <F delay={0.05}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease }} onClick={() => go('blog')}
              className="group cursor-pointer p-8 rounded-3xl mb-8" style={{ background: 'linear-gradient(135deg, #EBF0FE, #F3EFFE)', boxShadow: '0 8px 32px rgba(45,92,243,0.06)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-white shadow-sm"><BookOpen size={28} style={{ color: blue }} /></div>
              <h3 className="text-[22px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h3>
              <p className="text-[16px] text-gray-500">Complete guide for designers · 9 chapters</p>
            </motion.div>
          </F>
          <div className="text-left">
            {ARTICLES.slice(0, 4).map((a, i) => (
              <F key={a.id} delay={0.08 + i * 0.04}>
                <ExpandItem title={a.title_en} sub={`${a.category} · ${a.date}`}>
                  <p className="text-[15px] text-gray-500 leading-[1.7]">{a.body_en.slice(0, 200)}...</p>
                  <button onClick={() => go('article')} className="mt-2 text-[14px] font-semibold flex items-center gap-1" style={{ color: blue }}>Read full article <ArrowRight size={12} /></button>
                </ExpandItem>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Wave color="#EBF0FE" />
      <section className="py-32 px-8 text-center" style={{ background: 'linear-gradient(180deg, #EBF0FE 0%, #F0F4FF 100%)' }}>
        <F>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-4">Let&apos;s work together</h2>
          <p className="text-[17px] text-gray-500 mb-10">Currently available for product design missions.</p>
          <div className="flex gap-3 justify-center">
            <motion.button whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-full text-[16px] font-semibold text-white flex items-center gap-2"
              style={{ background: blue, boxShadow: `0 8px 28px rgba(45,92,243,0.35), 0 2px 8px rgba(45,92,243,0.2)` }}>Book a call <Calendar size={16} /></motion.button>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-full text-[16px] text-gray-600 font-semibold bg-white shadow-sm flex items-center gap-2" style={{ border: '1.5px solid rgba(0,0,0,0.06)' }}>Email <Envelope size={16} /></motion.button>
          </div>
        </F>
      </section>
      <Wave color="#EBF0FE" flip />

      <Continue items={[
        { label: 'Work', desc: 'All projects', image: PROJECTS[1].coverImage, onClick: () => go('work') },
        { label: 'Interface Work', desc: 'UI screens', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years', onClick: () => go('about') },
      ]} />

      <AnimatePresence>{lbIdx !== null && <Lightbox items={allMedia} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ WORK ═══ */
function Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-32 pb-8 px-8" style={{ background: 'linear-gradient(180deg, #F3EFFE 0%, white 100%)' }}>
        <div className="max-w-[1100px] mx-auto">
          <F><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-4 text-center">Work</h1></F>
          <F delay={0.05}><p className="text-[18px] text-gray-500 mb-12 text-center max-w-md mx-auto">Case studies, concepts, and AI experiments.</p></F>
        </div>
      </section>
      <div className="max-w-[1100px] mx-auto px-8 pb-20">
        <F><p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6">Case Studies</p></F>
        {CASES.map((p, i) => (
          <F key={p.id} delay={i * 0.04}>
            <ExpandItem title={p.title} sub={`${p.role} · ${p.period}`}>
              <div className="flex flex-col md:flex-row gap-6">
                <motion.div whileHover={{ rotate: -1 }} transition={{ duration: 0.4, ease }} className="w-full md:w-72 shrink-0 cursor-pointer" onClick={() => go('case')}>
                  <ImgCard src={p.coverImage} shadow="blue" />
                </motion.div>
                <div><p className="text-[16px] text-gray-500 leading-[1.7] mb-3">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-3">{p.deliverables.slice(0, 4).map((d: string) => <span key={d} className="text-[12px] px-3 py-1 rounded-full bg-blue-50 font-semibold" style={{ color: blue }}>{d}</span>)}</div>
                  <button onClick={() => go('case')} className="text-[14px] font-semibold flex items-center gap-1" style={{ color: blue }}>View case study <ArrowRight size={12} /></button>
                </div>
              </div>
            </ExpandItem>
          </F>
        ))}
        {SHORTS.length > 0 && <>
          <F><p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.12em] mt-12 mb-6">Concepts & Experiments</p></F>
          {SHORTS.map((p, i) => (
            <F key={p.id} delay={i * 0.04}>
              <ExpandItem title={p.title} sub={`${p.role} · ${p.period}`} badge="Concept">
                <p className="text-[16px] text-gray-500 leading-[1.7]">{p.summary}</p>
              </ExpandItem>
            </F>
          ))}
        </>}
      </div>
      <Continue items={[
        { label: 'Interfaces', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

/* ═══ CASE STUDY ═══ */
function Case({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const media: MediaItem[] = [...VIDEOS.slice(0, 3).map(v => ({ type: 'video' as const, src: v.src, label: v.label })), ...UI.toolkit.map((img, i) => ({ type: 'image' as const, src: img, label: `Toolkit screen ${i + 1}` }))];
  const sections = [
    { label: 'Overview', text: TK.overview?.introP1 || TK.overview?.intro || '', extra: TK.overview?.introP2 || '', bg: '' },
    { label: 'Context', text: TK.context?.intro || '', bg: '#F0F4FF' },
    { label: 'Phase 1', text: TK.phase1?.intro || '', bg: '' },
    { label: 'Phase 2', text: TK.phase2?.intro || '', bg: '#F3EFFE' },
    { label: 'Design System', text: TK.designSystem?.intro || '', bg: '' },
    { label: 'Impact', text: TK.impact?.intro || '', bg: '#ECFEFF' },
  ].filter(s => s.text);
  return (
    <div style={{ fontFamily: font }}>
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl py-2.5" style={{ borderBottom: '1.5px solid rgba(0,0,0,0.04)' }}>
        <div className="max-w-[1100px] mx-auto px-8 flex items-center gap-5 overflow-x-auto scrollbar-hide justify-center">
          {sections.map((s, i) => <button key={i} onClick={() => document.getElementById(`gv-${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-[13px] font-semibold text-gray-400 hover:text-gray-800 whitespace-nowrap transition-colors">{s.label}</button>)}
        </div>
      </div>
      <section className="pt-16 pb-12 px-8 text-center" style={{ background: 'linear-gradient(180deg, #F0F4FF 0%, white 100%)' }}>
        <div className="max-w-[700px] mx-auto">
          <F><button onClick={() => go('work')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-8 mx-auto"><ArrowLeft size={14} /> All projects</button></F>
          <F delay={0.03}>
            <span className="text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: blue }}>Toolkit · {TK.meta.type} · {TK.meta.period}</span>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-900 mt-3 mb-6">{TK.hero.title}</h1>
            <Expand summary={(TK.hero?.description || '').slice(0, 160) + '.'}>
              <p className="text-[17px] text-gray-500 leading-[1.7]">{TK.hero.description}</p>
            </Expand>
          </F>
        </div>
      </section>
      <F><div className="max-w-[960px] mx-auto px-8 mb-16">
        <Vid src={VIDEOS[0].src} label="Toolkit: Batch editing" onClick={() => setLbIdx(0)} />
        <p className="text-[14px] text-gray-400 mt-4 text-center">Managing multiple tasks across construction sites simultaneously.</p>
      </div></F>
      {sections.map((s, i) => (
        <div key={i}>
          {s.bg && <Wave color={s.bg} />}
          <section className="py-20 px-8" id={`gv-${i}`} style={{ background: s.bg || 'white' }}>
            <div className="max-w-[700px] mx-auto text-center">
              <F><span className="text-[13px] font-bold uppercase tracking-[0.1em] block mb-4" style={{ color: blue }}>{s.label}</span>
                <Expand summary={(s.text || '').slice(0, 160) + '.'}>
                  <p className="text-[17px] text-gray-600 leading-[1.7] mb-4">{s.text}</p>
                  {s.extra && <p className="text-[17px] text-gray-600 leading-[1.7]">{s.extra}</p>}
                </Expand>
              </F>
            </div>
            {i < 4 && UI.toolkit[i * 2] && (
              <F><div className="max-w-[960px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {UI.toolkit.slice(i * 2, i * 2 + 2).map((img, j) => (
                  <ImgCard key={j} src={img} label={`${s.label} screen ${j + 1}`} shadow={i % 2 === 0 ? 'blue' : 'violet'} onClick={() => setLbIdx(3 + i * 2 + j)} />
                ))}
              </div></F>
            )}
            {i === 5 && (
              <F><div className="max-w-[700px] mx-auto mt-10 grid grid-cols-3 gap-5">
                {[{ v: TK.impact.customers, d: TK.impact.customersDesc, c: blue }, { v: TK.impact.seriesA, d: TK.impact.seriesADesc, c: '#8B5CF6' }, { v: TK.impact.enterprise, d: TK.impact.enterpriseDesc, c: '#06B6D4' }].map((m, mi) => (
                  <motion.div key={mi} whileHover={{ y: -4 }} transition={{ duration: 0.4, ease }} className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(45,92,243,0.03), rgba(139,92,246,0.03))', border: '1.5px solid rgba(45,92,243,0.08)' }}>
                    <span className="text-3xl font-bold" style={{ color: m.c }}>{m.v}</span>
                    <p className="text-[14px] text-gray-500 mt-2">{m.d}</p>
                  </motion.div>
                ))}
              </div></F>
            )}
          </section>
          {s.bg && <Wave color={s.bg} flip />}
        </div>
      ))}
      <Wave color="#FFF0F6" />
      <section className="py-16 px-8" style={{ background: '#FFF0F6' }}>
        <div className="max-w-[700px] mx-auto text-center"><F>
          <Quotes size={24} weight="fill" className="mx-auto mb-5 text-pink-300" />
          <blockquote className="text-[20px] text-gray-700 leading-[1.6] italic mb-5">{TK.testimonial.quote}</blockquote>
          <div className="flex items-center gap-3 justify-center"><img src="/images/pierre-marie-nigay.webp" alt="" className="w-11 h-11 rounded-full object-cover shadow-sm border-2 border-white" /><div className="text-left"><p className="text-[14px] font-bold text-gray-900">{TK.testimonial.author}</p><p className="text-[12px] text-gray-400">{TK.testimonial.role}</p></div></div>
        </F></div>
      </section>
      <Wave color="#FFF0F6" flip />
      <section className="py-8 px-8 border-t border-gray-100"><div className="max-w-[700px] mx-auto"><F>
        <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.3, ease }} onClick={() => go('case')} className="flex items-center gap-5 py-4 cursor-pointer group">
          <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0" style={{ boxShadow: '0 4px 16px rgba(45,92,243,0.06)', border: '1.5px solid rgba(45,92,243,0.08)' }}><img src={PROJECTS[1].coverImage} alt="" className="w-full h-full object-cover" /></div>
          <div><p className="text-[12px] text-gray-400">Next project</p><p className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{PROJECTS[1].title}</p></div>
          <ArrowRight size={14} className="text-gray-300 ml-auto group-hover:translate-x-2 transition-transform" />
        </motion.div>
      </F></div></section>
      <Continue items={[
        { label: 'All projects', desc: 'Browse work', image: PROJECTS[2].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <Lightbox items={media} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ ABOUT ═══ */
function About({ go }: { go: (p: PageId) => void }) {
  const career = [
    { y: '2024-25', co: 'France VAE / Beta.gouv', role: 'Lead Product Designer', d: 'National public service, 100K+ candidates.', exp: 'Co-designed prioritization matrix. Led 10 user interviews. Organized 2-day design thinking workshop. Restructured Figma architecture.' },
    { y: '2023-24', co: 'Toolkit', role: 'Founding Designer', d: '0-to-1 construction tech SaaS.', exp: 'Sole designer in 3-person team. Designed platform from pitch deck to shipped MVP. Built Tailwind-ready design system.' },
    { y: '2018-24', co: 'UNOWHY / SQOOL', role: 'Product Design Manager', d: 'Team of 4, 8 apps, 500K+ students.', exp: 'Managed 4 designers. Multi-brand design system. Structured Design Ops. Collaborated with 30+ developers.' },
    { y: '2017-18', co: 'Dailymotion', role: 'Senior Product Designer', d: 'Video suite for CBS, Bein Sports.', exp: 'Designed livestreaming dashboards. Created first pattern library. Mentored juniors.' },
    { y: '2014-17', co: 'PagesJaunes', role: 'Mobile UI Lead', d: '22M users, iOS/Android.', exp: 'Led UI for iOS and Android. Material Design migration. Android Wear prototyping.' },
  ];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-32 pb-20 px-8" style={{ background: 'linear-gradient(180deg, #F0F4FF 0%, white 100%)' }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <F><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-8">About</h1></F>
            <F delay={0.05}><Expand summary={T.bio.p1}>
              <p className="text-[17px] text-gray-600 leading-[1.7] mb-4">{T.bio.p1}</p>
              <p className="text-[17px] text-gray-600 leading-[1.7] mb-4">{T.bio.p2}</p>
              <div className="p-4 rounded-xl mt-4" style={{ background: 'linear-gradient(135deg, #EBF0FE, #F3EFFE)', border: '1.5px solid rgba(45,92,243,0.08)' }}>
                <h4 className="text-[14px] font-bold mb-2">Core strengths</h4>
                <ul className="space-y-1">{T.bio.bullets.map((b: string, i: number) => <li key={i} className="text-[15px] text-gray-500 flex gap-2"><span style={{ color: blue }}>·</span>{b}</li>)}</ul>
              </div>
            </Expand></F>
            <F delay={0.1}><h2 className="text-[22px] font-bold text-gray-900 mt-16 mb-4">Career</h2></F>
            {career.map((c, i) => (
              <F key={i} delay={0.12 + i * 0.04}>
                <ExpandItem title={c.co} sub={c.role} badge={c.y}>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-2">{c.d}</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{c.exp}</p>
                </ExpandItem>
              </F>
            ))}
          </div>
          <div className="md:col-span-5">
            <F delay={0.2}><div className="md:sticky md:top-24 space-y-5">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 16px 48px rgba(45,92,243,0.08)', border: '1.5px solid rgba(45,92,243,0.08)' }}><img src="/images/photos victor/image_victor_home.png" alt="" className="w-full aspect-[3/4] object-cover object-top" /></div>
              <div className="p-5 rounded-2xl bg-white shadow-sm" style={{ border: '1.5px solid rgba(0,0,0,0.04)' }}>
                <h3 className="text-[14px] font-bold text-gray-900 mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">{['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind', 'Vercel', 'Linear'].map(t => <span key={t} className="text-[13px] px-3 py-1.5 rounded-full bg-blue-50 font-semibold" style={{ color: blue }}>{t}</span>)}</div>
              </div>
            </div></F>
          </div>
        </div>
      </section>
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
        { label: 'Interfaces', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ BLOG ═══ */
/* 3 gradient options for Resources page (one per variant) */
const blogGradients = {
  A: 'linear-gradient(180deg, #FFF7ED 0%, #FFFBF5 40%, white 100%)',  // warm amber
  B: 'linear-gradient(180deg, #F0FDF4 0%, #F5FFF8 40%, white 100%)',  // fresh green
  C: 'linear-gradient(180deg, #FDF2F8 0%, #FFF5FA 40%, white 100%)',  // soft rose
};

function Blog({ go, variant = 'A' }: { go: (p: PageId) => void; variant?: 'A' | 'B' | 'C' }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-32 pb-20 px-8" style={{ background: blogGradients[variant] }}>
        <div className="max-w-[1100px] mx-auto">
          <F><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-4 text-center">Resources</h1></F>
          <F delay={0.05}><p className="text-[18px] text-gray-500 mb-12 text-center">{T.signals.subtitle}</p></F>
          <F delay={0.08}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease }} onClick={() => go('article')}
              className="group cursor-pointer p-8 rounded-3xl mb-10 max-w-[700px] mx-auto" style={{ background: 'linear-gradient(135deg, #EBF0FE, #F3EFFE)', boxShadow: '0 8px 32px rgba(45,92,243,0.06)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-white shadow-sm"><BookOpen size={28} style={{ color: blue }} /></div>
              <h2 className="text-[22px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-center">Getting started with Claude Code</h2>
              <p className="text-[16px] text-gray-500 text-center">Complete guide for designers · 9 chapters</p>
            </motion.div>
          </F>
          <div className="max-w-[700px] mx-auto">
            <F><p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">Articles ({ARTICLES.length})</p></F>
            {ARTICLES.map((a, i) => (
              <F key={a.id} delay={0.1 + i * 0.03}>
                <ExpandItem title={a.title_en} sub={`${a.category} · ${a.date}`}>
                  <p className="text-[15px] text-gray-500 leading-[1.7]">{a.body_en.slice(0, 250)}...</p>
                  <button onClick={() => go('article')} className="mt-2 text-[14px] font-semibold flex items-center gap-1" style={{ color: blue }}>Read full article <ArrowRight size={12} /></button>
                </ExpandItem>
              </F>
            ))}
          </div>
        </div>
      </section>
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Interfaces', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ ARTICLE: Substack-style with reading progress, sticky TOC, section title in header ═══ */
function ArticlePage({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();

  // Split article into titled sections
  const rawText = a.body_long_en || a.body_en;
  const sentences = rawText.split('. ');
  const articleSections = [
    { title: 'Introduction', body: sentences.slice(0, 3).join('. ') + '.' },
    { title: 'The approach', body: sentences.slice(3, 6).join('. ') + '.' },
    { title: 'What changed', body: sentences.slice(6, 9).join('. ') + '.' },
    { title: 'Takeaway', body: sentences.slice(9).join('. ') + (sentences.length > 9 ? '.' : '') },
  ].filter(s => s.body.length > 5);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const els = articleSections.map((_, i) => document.getElementById(`art-${i}`));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const idx = els.indexOf(e.target as HTMLElement); if (idx !== -1) setActiveSection(idx); } });
    }, { rootMargin: '-20% 0px -60% 0px' });
    els.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [articleSections.length]);

  return (
    <div style={{ fontFamily: font }}>
      {/* Reading progress bar (under nav) */}
      <motion.div className="fixed top-[64px] left-0 right-0 h-[3px] origin-left z-40" style={{ scaleX: scrollYProgress, background: `linear-gradient(90deg, ${blue}, #8B5CF6)` }} />

      {/* Sticky section title bar (Substack-style) */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100/50 py-2">
        <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => go('blog')} className="text-[13px] text-gray-400 hover:text-gray-900 flex items-center gap-1"><ArrowLeft size={12} /> Resources</button>
            <span className="text-gray-200">·</span>
            <span className="text-[13px] font-semibold text-gray-600">{articleSections[activeSection]?.title || a.title_en}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-gray-400 font-mono tabular-nums">{activeSection + 1}/{articleSections.length}</span>
            {/* Section dots */}
            <div className="flex gap-1">
              {articleSections.map((_, i) => (
                <button key={i} onClick={() => document.getElementById(`art-${i}`)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeSection ? 'bg-gray-900 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article header */}
      <section className="pt-16 pb-8 px-8">
        <div className="max-w-[680px] mx-auto">
          <F>
            <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: '#EBF0FE', color: blue }}>{a.category}</span>
            <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold text-gray-900 mt-4 mb-4">{a.title_en}</h1>
            <div className="flex items-center gap-3 mb-8">
              <img src="/images/photos victor/image_victor_home.png" alt="" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-[14px] text-gray-500">Victor Soussan · {a.date}</span>
            </div>
          </F>
        </div>
      </section>

      {/* Article body with sidebar TOC */}
      <div className="max-w-[1100px] mx-auto px-8 pb-20 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12">
        {/* Sticky TOC sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">Sections</p>
            {articleSections.map((s, i) => (
              <button key={i} onClick={() => document.getElementById(`art-${i}`)?.scrollIntoView({ behavior: 'smooth' })}
                className={`block w-full text-left py-2 text-[13px] font-medium transition-all border-l-2 pl-3 mb-0.5 ${i === activeSection ? 'border-blue-500 text-gray-900 font-semibold' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'}`}>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <article>
          {articleSections.map((s, i) => (
            <section key={i} id={`art-${i}`} className="mb-16 scroll-mt-32">
              <F delay={i * 0.03}>
                <h2 className="text-[22px] font-bold text-gray-900 mb-6">{s.title}</h2>
                <p className="text-[19px] text-gray-700 leading-[1.85]" style={{ fontFeatureSettings: "'kern' 1, 'liga' 1" }}>
                  {i === 0 && <span className="text-[52px] font-bold float-left mr-3 mt-2 leading-[0.78]" style={{ color: blue }}>{s.body[0]}</span>}
                  {i === 0 ? s.body.slice(1) : s.body}
                </p>
              </F>
            </section>
          ))}

          {/* Author card */}
          <div className="pt-8 border-t border-gray-100">
            <F>
              <div className="flex items-center gap-4 mb-8">
                <img src="/images/photos victor/image_victor_home.png" alt="" className="w-14 h-14 rounded-full object-cover shadow-sm" style={{ border: '2px solid white' }} />
                <div><p className="text-[15px] font-bold text-gray-900">Victor Soussan</p><p className="text-[14px] text-gray-400">Lead Product Designer · Paris</p></div>
              </div>
            </F>
          </div>

          {/* Continue reading (next articles) */}
          <div className="pt-8 border-t border-gray-100">
            <F>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6">Continue reading</p>
              <div className="space-y-4">
                {ARTICLES.slice(1, 4).map((ra, i) => (
                  <motion.button key={ra.id} whileHover={{ x: 4 }} transition={bounce} onClick={() => go('article')}
                    className="w-full text-left group py-3 border-b border-gray-100/50 last:border-b-0">
                    <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{ra.category}</span>
                    <h3 className="text-[16px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-1">{ra.title_en}</h3>
                  </motion.button>
                ))}
              </div>
            </F>
          </div>
        </article>
      </div>
    </div>
  );
}

/* ═══ GALLERY ═══ */
/* ═══ GALLERY A: Full-screen grid, zoomed crops, shaky hover ═══ */
function GalleryFullGrid({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const allImages = [...UI.toolkit, ...UI.scrim, ...UI.sqool];
  const media: MediaItem[] = allImages.map((img, i) => ({ type: 'image', src: img, label: `Interface ${i + 1}` }));
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-32 pb-8 px-8 text-center" style={{ background: 'linear-gradient(180deg, #F3EFFE 0%, white 100%)' }}>
        <div className="max-w-[800px] mx-auto">
          <F><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-4">Interface Work</h1></F>
          <F delay={0.05}><p className="text-[18px] text-gray-500 mb-12">Every detail is intentional. Click to explore at full scale.</p></F>
        </div>
      </section>
      {/* Full-width grid with zoomed-in crops */}
      <div className="px-2 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {allImages.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03, rotate: Math.random() > 0.5 ? 1 : -1, zIndex: 10 }} whileTap={{ scale: 0.97 }} transition={bounce}
              className="relative aspect-square overflow-hidden cursor-pointer group" onClick={() => setLbIdx(i)}
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              {/* Zoomed crop: scale 1.4 + different object-position per image */}
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: i % 4 === 0 ? 'top left' : i % 4 === 1 ? 'center' : i % 4 === 2 ? 'top right' : 'bottom center', transform: 'scale(1.3)' }} loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'Background', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <Lightbox items={media} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ GALLERY B: Auto-scrolling strips per project, hover stops ═══ */
function GalleryStrips({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [hoveredStrip, setHoveredStrip] = useState<string | null>(null);
  const groups = [
    { id: 'toolkit', label: 'Toolkit', desc: 'Construction management SaaS. High-contrast interfaces for field conditions.', images: UI.toolkit },
    { id: 'scrim', label: 'SCRIM', desc: 'Creative platform. Clean layouts and conversion-focused design.', images: UI.scrim },
    { id: 'sqool', label: 'SQOOL', desc: 'EdTech ecosystem for 500K+ students. Teacher and student interfaces.', images: UI.sqool },
  ];
  const allMedia: MediaItem[] = groups.flatMap(g => g.images.map((img, i) => ({ type: 'image' as const, src: img, label: `${g.label}: Screen ${i + 1}` })));
  let globalIdx = 0;

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-32 pb-12 px-8 text-center" style={{ background: 'linear-gradient(180deg, #F3EFFE 0%, white 100%)' }}>
        <div className="max-w-[800px] mx-auto">
          <F><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-4">Interface Work</h1></F>
          <F delay={0.05}><p className="text-[18px] text-gray-500 mb-4">Hover to pause. Click to explore at full scale.</p></F>
        </div>
      </section>
      {groups.map((g, gi) => {
        const startIdx = globalIdx;
        globalIdx += g.images.length;
        return (
          <section key={g.id} className="py-12" style={{ background: gi % 2 === 1 ? '#F8F9FA' : 'white' }}>
            <div className="max-w-[1100px] mx-auto px-8 mb-6">
              <F><h2 className="text-[24px] font-bold text-gray-900">{g.label}</h2></F>
              <F delay={0.03}><p className="text-[16px] text-gray-500 mt-1">{g.desc}</p></F>
            </div>
            <div className="overflow-hidden" onMouseEnter={() => setHoveredStrip(g.id)} onMouseLeave={() => setHoveredStrip(null)}>
              <motion.div
                className="flex gap-4 px-8"
                animate={{ x: hoveredStrip === g.id ? 0 : [0, -(g.images.length * 360)] }}
                transition={hoveredStrip === g.id ? { duration: 0 } : { x: { duration: g.images.length * 8, repeat: Infinity, ease: 'linear' } }}>
                {[...g.images, ...g.images].map((img, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05, y: -8, rotate: Math.random() > 0.5 ? 1.5 : -1.5 }} whileTap={{ scale: 0.95 }} transition={bounce}
                    className="shrink-0 w-[340px] rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ boxShadow: '0 12px 40px rgba(45,92,243,0.06)', border: '1.5px solid rgba(45,92,243,0.1)' }}
                    onClick={() => setLbIdx(startIdx + (i % g.images.length))}>
                    <img src={img} alt="" className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'Background', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <Lightbox items={allMedia} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ GALLERY C: Finder-style layout (sidebar + main view) ═══ */
function GalleryFinder({ go }: { go: (p: PageId) => void }) {
  const groups = [
    { id: 'toolkit', label: 'Toolkit', images: UI.toolkit },
    { id: 'scrim', label: 'SCRIM', images: UI.scrim },
    { id: 'sqool', label: 'SQOOL', images: UI.sqool },
  ];
  const [activeGroup, setActiveGroup] = useState('toolkit');
  const [activeScreen, setActiveScreen] = useState(0);
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const currentGroup = groups.find(g => g.id === activeGroup)!;
  const allMedia: MediaItem[] = currentGroup.images.map((img, i) => ({ type: 'image', src: img, label: `${currentGroup.label}: Screen ${i + 1}` }));

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-32 pb-4 px-8" style={{ background: 'linear-gradient(180deg, #F3EFFE 0%, white 100%)' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <F><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-gray-900 mb-4">Interface Work</h1></F>
          <F delay={0.05}><p className="text-[18px] text-gray-500 mb-8">Browse by project. Click to zoom.</p></F>
        </div>
      </section>
      {/* Finder window: full screen with 32px padding */}
      <div className="px-8 pb-20">
        <F>
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}>
            {/* macOS title bar */}
            <div className="h-10 bg-[#F6F6F6] border-b border-gray-200/60 flex items-center px-3 gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" /><div className="w-3 h-3 rounded-full bg-[#FFBD2E]" /><div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="text-[13px] text-gray-500 font-medium ml-4">{currentGroup.label} — {currentGroup.images.length} screens</span>
            </div>
            {/* Body: sidebar + main */}
            <div className="flex bg-white" style={{ minHeight: 'calc(100vh - 200px)' }}>
              {/* Sidebar */}
              <div className="w-[220px] bg-[#F8F9FA] border-r border-gray-200/60 p-3 shrink-0">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Projects</p>
                {groups.map(g => (
                  <button key={g.id} onClick={() => { setActiveGroup(g.id); setActiveScreen(0); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-medium mb-0.5 transition-colors ${activeGroup === g.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                    {g.label} <span className="text-[12px] text-gray-400 ml-1">({g.images.length})</span>
                  </button>
                ))}
                <div className="border-t border-gray-200/60 mt-3 pt-3">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Screens</p>
                  <div className="space-y-0.5 max-h-[400px] overflow-y-auto">
                    {currentGroup.images.map((_, i) => (
                      <button key={i} onClick={() => setActiveScreen(i)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors ${activeScreen === i ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
                        Screen {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Main view */}
              <div className="flex-1 p-6 flex items-center justify-center bg-[#FAFAFA]">
                <AnimatePresence mode="wait">
                  <motion.div key={`${activeGroup}-${activeScreen}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                    className="cursor-pointer max-w-full" onClick={() => setLbIdx(activeScreen)}>
                    <motion.img whileHover={{ scale: 1.02 }} transition={bounce}
                      src={currentGroup.images[activeScreen]} alt="" className="max-w-full max-h-[560px] rounded-lg object-contain mx-auto"
                      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }} />
                    <p className="text-[14px] text-gray-400 text-center mt-4">{currentGroup.label}: Screen {activeScreen + 1} — Click to zoom</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </F>
      </div>
      <Continue items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'About', desc: 'Background', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />
      <AnimatePresence>{lbIdx !== null && <Lightbox items={allMedia} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ EXPORTS ═══ */

export function GeminiDark() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} variant="A" />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <Case go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} variant="A" />}
      {page === 'article' && <ArticlePage go={go} />}
      {page === 'gallery' && <GalleryFullGrid go={go} />}
      <ScrollNudge text="I wrote a 9-chapter guide on Claude Code for designers." cta="Read the guide" onClick={() => go('blog')} at={2000} />
      <ScrollStat label="Years in tech" value="15" at={3500} />
    </div>
  );
}

export function GeminiLight() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} variant="B" />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <Case go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} variant="B" />}
      {page === 'article' && <ArticlePage go={go} />}
      {page === 'gallery' && <GalleryStrips go={go} />}
      <ScrollNudge text="50+ apps shipped with AI-assisted workflows." cta="See experiments" onClick={() => go('work')} at={1800} />
    </div>
  );
}

export function GeminiHybrid() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} variant="C" />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <Case go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} variant="C" />}
      {page === 'article' && <ArticlePage go={go} />}
      {page === 'gallery' && <GalleryFinder go={go} />}
      <ScrollNudge text="Managing teams of 4+ designers and 30+ developers." cta="Read about" onClick={() => go('about')} at={2500} />
      <ScrollStat label="Products shipped" value="12+" at={4000} />
    </div>
  );
}
