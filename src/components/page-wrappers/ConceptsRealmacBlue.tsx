'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, Play, BookOpen, PencilSimple, Compass, UsersThree, GridFour, List } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';
import { scrollToElement } from '@/utils/smoothScroll';

const ALL_PROJECTS = getProjects('en');
// Fix missing /images/ prefix and filter case studies only
const PROJECTS = ALL_PROJECTS.filter(p => p.format === 'case-study').map(p => ({
  ...p,
  coverImage: p.coverImage.startsWith('/') ? p.coverImage : `/images/${p.coverImage}`,
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TK = TOOLKIT_TRANSLATIONS.en as Record<string, any>;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS.slice(0, 6);
const UI = { toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`), scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`), sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`) };
const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Toolkit: Batch editing', desc: 'Managing multiple tasks across construction sites simultaneously.' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Toolkit: Planning zoom', desc: 'Seamless zoom transitions between day, week, and month views.' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Toolkit: Task manipulation', desc: 'Drag-and-drop task management designed for field managers.' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion: Embed code', desc: 'One-click embed generation for tier-1 media partners.' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'SQOOL Connect: Dashboard', desc: 'Classroom orchestration prototype for teachers and students.' },
];
const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];
const TESTIMONIALS = [
  { author: TK.testimonial.author, role: TK.testimonial.role, content: TK.testimonial.quote, avatar: '/images/people/pierre-marie-nigay.webp' },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale.", avatar: '/images/people/charlotte-rifflet.webp' },
  { author: 'Nicolas Moulin', role: 'Director of Innovation, PagesJaunes', content: "Victor brought a level of visual precision and interaction thinking that elevated the entire mobile experience for our 22 million users.", avatar: '/images/people/nicolas-moulin.webp' },
];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';
type MediaItem = { type: 'video' | 'image'; src: string; label: string };

const sp = { type: 'spring' as const, stiffness: 300, damping: 26 };
const spB = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";

/* ═══ REALMAC DESIGN TOKENS ═══ */
const blue = '#2D5CF3';
const blueHover = '#2450d9';
const blueShadow = 'rgba(45,92,243,0.15)';
const blueSoft = 'rgba(45,92,243,0.06)';
const warmBg = '#FAFAF8';
const glass = 'bg-white/60 backdrop-blur-2xl border border-white/70';
const glassHover = 'hover:bg-white/80';
const innerGlow = `shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_rgba(0,0,0,0.04)]`;
const innerGlowSm = `shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.03)]`;
const innerGlowLg = `shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_16px_48px_rgba(0,0,0,0.06)]`;

/* ═══ CORE COMPONENTS ═══ */

function F({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-20px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }} animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.35, delay, ...sp }} className={className}>{children}</motion.div>;
}

/* Tilt card */
function Tilt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 }); const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <motion.div ref={ref} style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onMouseMove={e => { if (!ref.current) return; const b = ref.current.getBoundingClientRect(); rx.set(((e.clientY - b.top) / b.height - 0.5) * -5); ry.set(((e.clientX - b.left) / b.width - 0.5) * 5); }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }} className={className}>{children}</motion.div>
  );
}

/* Glass card wrapper */
function Glass({ children, className = '', hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return <div className={`${glass} ${innerGlow} rounded-2xl ${hover ? glassHover : ''} transition-all ${className}`}>{children}</div>;
}

/* Video with hover-to-play + glass surface */
function Vid({ src, label, desc, onClick, className = '' }: { src: string; label: string; desc?: string; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  return (
    <div>
      <div className={`group relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
        style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 40px rgba(0,0,0,0.06)` }}
        onMouseEnter={() => { ref.current?.play(); setOn(true); }} onMouseLeave={() => { ref.current?.pause(); setOn(false); }} onClick={onClick}>
        <div className="p-1.5 bg-white/40 rounded-2xl">
          <div className="rounded-[calc(1rem-6px)] overflow-hidden">
            <video ref={ref} src={src} muted loop playsInline preload="metadata" className="w-full object-cover" />
          </div>
        </div>
        {!on && <div className="absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center" style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)` }}><Play size={18} weight="fill" className="text-gray-900 ml-0.5" /></div></div>}
      </div>
      {(label || desc) && <div className="mt-3 px-1"><p className="text-[14px] font-semibold text-gray-900" style={{ fontFamily: font }}>{label}</p>{desc && <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5" style={{ fontFamily: font }}>{desc}</p>}</div>}
    </div>
  );
}

/* Captioned image with glass frame */
function Img({ src, label, desc, onClick, className = '' }: { src: string; label: string; desc?: string; onClick?: () => void; className?: string }) {
  return (
    <div className={className}>
      <div className="group rounded-2xl overflow-hidden cursor-pointer p-1.5 bg-white/40 border border-white/60" style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.04)` }} onClick={onClick}>
        <div className="rounded-[calc(1rem-6px)] overflow-hidden"><img src={src} alt={label} className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" /></div>
      </div>
      {(label || desc) && <div className="mt-3 px-1"><p className="text-[14px] font-semibold text-gray-900" style={{ fontFamily: font }}>{label}</p>{desc && <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5" style={{ fontFamily: font }}>{desc}</p>}</div>}
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
        <p className="text-[14px] text-white/60 font-medium" style={{ fontFamily: font }}>{item.label}</p>
        <div className="flex items-center gap-4"><span className="text-[13px] text-white/30 font-mono tabular-nums">{idx + 1} / {items.length}</span><button onClick={onClose} className="p-2 text-white/40 hover:text-white"><X size={20} /></button></div>
      </div>
      <div className="flex items-center gap-4 max-w-[95vw] w-full justify-center" onClick={e => e.stopPropagation()}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onChange(Math.max(0, idx - 1))} disabled={idx === 0} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowLeft size={24} /></motion.button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="max-w-full max-h-[80vh] rounded-2xl" /> : <img src={item.src} alt="" className="max-w-full max-h-[80vh] rounded-2xl object-contain" />}
          </motion.div>
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onChange(Math.min(items.length - 1, idx + 1))} disabled={idx === items.length - 1} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowRight size={24} /></motion.button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4 scrollbar-hide" onClick={e => e.stopPropagation()}>
        {items.map((it, i) => (
          <button key={i} onClick={() => onChange(i)} className={`w-14 h-9 rounded-lg overflow-hidden shrink-0 transition-all ${i === idx ? 'ring-2 ring-white opacity-100' : 'opacity-25 hover:opacity-50'}`}>
            {it.type === 'video' ? <video src={it.src} muted preload="metadata" className="w-full h-full object-cover" /> : <img src={it.src} alt="" className="w-full h-full object-cover" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══ NAVIGATION ═══ */

function Nav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60));
  const labels: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  const tabs: { id: PageId; label: string }[] = [{ id: 'home', label: 'Home' }, { id: 'work', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'blog', label: 'Resources' }, { id: 'gallery', label: 'Interfaces' }];
  return (
    <nav className="sticky top-0 z-50">
      <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left" style={{ scaleX: scrollYProgress, background: blue }} />
      <div className={`transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-2xl border-b border-white/60' : 'bg-transparent'}`} style={scrolled ? { boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.03)' } : {}}>
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => go('home')} className="text-[15px] font-semibold text-gray-900 tracking-[-0.01em] shrink-0" style={{ fontFamily: font }}>Victor Soussan</motion.button>
          <AnimatePresence>
            {scrolled && labels[page] && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={sp} className="text-[13px] text-gray-400 font-medium ml-2">{labels[page]}</motion.span>}
          </AnimatePresence>
          <div className="ml-auto hidden md:flex items-center gap-0.5">
            {tabs.map(t => (
              <motion.button key={t.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go(t.id)}
                className={`px-3 py-1.5 rounded-xl text-[13px] font-medium transition-all ${page === t.id ? 'text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-white/40'}`}
                style={page === t.id ? { background: blue, boxShadow: `0 2px 8px ${blueShadow}, inset 0 1px 0 rgba(255,255,255,0.2)` } : { fontFamily: font }}>
                {t.label}
              </motion.button>
            ))}
            <div className="w-px h-4 bg-gray-200 mx-1.5" />
            <div className="flex items-center rounded-lg bg-white/40 border border-white/60 p-0.5" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
              <button className="px-2 py-1 rounded-md text-[11px] font-bold text-white" style={{ background: blue }}>EN</button>
              <button className="px-2 py-1 rounded-md text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors">FR</button>
            </div>
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
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={spB}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 ${glass} rounded-full ${innerGlow}`}>
          <span className="text-[13px] text-gray-500 font-medium hidden sm:block" style={{ fontFamily: font }}>Available for new projects</span>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spB}
            className="px-4 py-2 text-white rounded-xl text-[13px] font-semibold" style={{ background: blue, boxShadow: `0 2px 8px ${blueShadow}, inset 0 1px 0 rgba(255,255,255,0.15)` }}>Book a call</motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Back to top */
function BackTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 1200));
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={spB}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 z-[80] w-10 h-10 rounded-xl ${glass} ${innerGlowSm} flex items-center justify-center hover:bg-white/80`}>
          <ArrowRight size={14} className="text-gray-600 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* Continue module */
function Continue({ items }: { items: { label: string; desc: string; image?: string; onClick: () => void }[] }) {
  return (
    <section className="py-16 px-6 border-t border-gray-100/50">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6" style={{ fontFamily: font }}>Continue exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button key={i} onClick={item.onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={spB}
              className={`text-left p-5 rounded-2xl ${glass} ${innerGlowSm} ${glassHover} transition-all group`}>
              {item.image && <div className="rounded-xl overflow-hidden mb-3 p-1 bg-white/30"><img src={item.image} alt="" className="w-full aspect-[16/9] rounded-lg object-cover group-hover:scale-[1.02] transition-transform" /></div>}
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily: font }}>{item.label}</p>
              <p className="text-[13px] text-gray-400 mt-1" style={{ fontFamily: font }}>{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Grain overlay */
function Grain() {
  return <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />;
}

/* ═══ HOME ═══ */

function Home({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const heroMedia: MediaItem[] = VIDEOS.slice(0, 3).map(v => ({ type: 'video', src: v.src, label: v.label }));

  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[800px] mx-auto">
          <F>
            <motion.div whileHover={{ scale: 1.02 }} transition={spB} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${glass} ${innerGlowSm} mb-10 cursor-default`}>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
              <span className="text-[14px] text-emerald-700 font-medium">{T.hero.availability}</span>
            </motion.div>
          </F>
          <F delay={0.05}>
            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-8 text-gray-900">
              {T.hero.title}, <span className="text-gray-300">{T.hero.subtitle}.</span>
            </h1>
          </F>
          <F delay={0.1}>
            <p className="text-[19px] text-gray-500 leading-[1.7] mb-4 max-w-[580px]">{T.hero.desc.slice(0, 220)}.</p>
            <p className="text-[14px] text-gray-400 tracking-wide mb-10">{T.hero.positioning}</p>
          </F>
          <F delay={0.15}>
            <div className="flex gap-3 flex-wrap">
              <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go('work')}
                className="group px-7 py-3.5 text-white rounded-2xl text-[15px] font-semibold flex items-center gap-2"
                style={{ background: blue, boxShadow: `0 4px 16px ${blueShadow}, inset 0 1px 0 rgba(255,255,255,0.15)` }}>
                View work <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go('about')}
                className={`px-7 py-3.5 rounded-2xl text-[15px] text-gray-500 font-medium ${glass} ${innerGlowSm} ${glassHover}`}>About me</motion.button>
            </div>
          </F>
        </div>
      </section>

      {/* Featured video breakout with glass frame */}
      <F>
        <div className="max-w-[1400px] mx-auto px-4 mb-8">
          <Tilt><Vid src={VIDEOS[0].src} label={VIDEOS[0].label} desc={VIDEOS[0].desc} onClick={() => setLbIdx(0)} /></Tilt>
        </div>
      </F>

      {/* Projects */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <F>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Selected work</h2>
              <motion.button whileHover={{ x: 3 }} transition={spB} onClick={() => go('work')} className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All projects <ArrowRight size={12} /></motion.button>
            </div>
          </F>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <F key={p.id} delay={i * 0.06}>
                <Tilt>
                  <motion.div whileHover={{ y: -4 }} transition={spB} onClick={() => go('case')}
                    className={`group cursor-pointer rounded-2xl overflow-hidden ${glass} ${innerGlow} ${glassHover} transition-all`}>
                    <div className="p-1.5">
                      <div className="rounded-[calc(1rem-6px)] overflow-hidden relative">
                        <img src={p.coverImage} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.06]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {p.deliverables.slice(0, 3).map((d: string) => <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">{d}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-2">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-[17px] font-semibold tracking-[-0.01em] group-hover:text-blue-600 transition-colors">{p.title}</h3>
                        <span className="text-[11px] text-gray-400 font-mono tabular-nums">{p.period}</span>
                      </div>
                      <p className="text-[14px] text-gray-400 mt-1">{p.role}</p>
                    </div>
                  </motion.div>
                </Tilt>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2></F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: PencilSimple, title: 'Design & Prototyping', desc: 'From wireframe to shipped UI. I prototype in code and Figma to validate ideas before investing development time.' },
              { icon: Compass, title: 'Product Strategy', desc: 'Framing the problem is half the solution. I run workshops, conduct research, and scope features that matter.' },
              { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, hiring, mentoring, delivery rituals. I build the practices that let the team scale.' },
            ].map((p, i) => (
              <F key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -3 }} transition={spB} className={`p-7 rounded-2xl ${glass} ${innerGlow} ${glassHover} transition-all`}>
                  <p.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-3">{p.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof: testimonials + logos */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">What they say</h2></F>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide -mx-6 px-6 mb-12">
            {TESTIMONIALS.map((t, i) => (
              <F key={i} delay={i * 0.08}>
                <Glass className="min-w-[360px] max-w-[440px] p-6 snap-start shrink-0">
                  <Quotes size={16} weight="fill" className="text-blue-200 mb-4" />
                  <blockquote className="text-[15px] text-gray-600 leading-relaxed mb-5">{t.content}</blockquote>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border-2 border-white/60" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.06)' }} />
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">{t.author}</p>
                      <p className="text-[12px] text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </Glass>
              </F>
            ))}
          </div>
          <F>
            <Glass className="p-6 md:p-8">
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-5">Companies I have worked with</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
                {LOGOS.map(n => <span key={n} className="text-[16px] text-gray-300 font-semibold tracking-[-0.01em] hover:text-gray-500 transition-colors cursor-default">{n}</span>)}
              </div>
            </Glass>
          </F>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24 px-6" style={{ background: blueSoft }}>
        <div className="max-w-[1200px] mx-auto">
          <F>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Resources</h2>
              <motion.button whileHover={{ x: 2 }} transition={spB} onClick={() => go('blog')} className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All <ArrowRight size={12} /></motion.button>
            </div>
          </F>
          <F delay={0.05}>
            <Glass className="p-6 mb-6 cursor-pointer group" hover>
              <div className="flex items-center gap-2 mb-3" onClick={() => go('blog')}><BookOpen size={14} style={{ color: blue }} /><span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: blue }}>Guide · 9 chapters</span></div>
              <h3 className="text-[18px] font-semibold group-hover:text-blue-600 transition-colors">Getting started with Claude Code</h3>
              <p className="text-[14px] text-gray-400 mt-1">Complete guide for designers: installation to deployment.</p>
            </Glass>
          </F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <F key={a.id} delay={0.08 + i * 0.04}>
                <motion.div whileHover={{ y: -2 }} transition={spB} onClick={() => go('article')}>
                  <Glass className="p-5 cursor-pointer group" hover>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{a.category}</span>
                    <h3 className="text-[15px] font-semibold mt-2 group-hover:text-blue-600 transition-colors leading-snug">{a.title_en}</h3>
                  </Glass>
                </motion.div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <F>
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
            <p className="text-[18px] text-gray-400 mb-8">Currently available for product design missions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB}
                className="px-8 py-4 text-white rounded-2xl text-[16px] font-semibold flex items-center justify-center gap-2"
                style={{ background: blue, boxShadow: `0 4px 16px ${blueShadow}, inset 0 1px 0 rgba(255,255,255,0.15)` }}>Book a call <Calendar size={16} /></motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB}
                className={`px-8 py-4 rounded-2xl text-[16px] text-gray-500 font-medium ${glass} ${innerGlowSm} ${glassHover}`}>Email <Envelope size={16} /></motion.button>
            </div>
          </div>
        </F>
      </section>

      <Continue items={[
        { label: 'Work', desc: 'All projects with video demos', image: PROJECTS[0].coverImage, onClick: () => go('work') },
        { label: 'Interface Work', desc: '100+ UI screens up close', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years of context', onClick: () => go('about') },
      ]} />

      <AnimatePresence>{lbIdx !== null && <LB items={heroMedia} idx={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />}</AnimatePresence>
    </div>
  );
}

/* ═══ WORK ═══ */
function Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-12 px-6"><div className="max-w-[800px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Work</h1></F>
        <F delay={0.05}><p className="text-[19px] text-gray-500 leading-[1.7] mb-12">Every project here shipped. Click any to read the full story.</p></F>
      </div></section>
      {PROJECTS.map((p, i) => (
        <F key={p.id} delay={i * 0.03}>
          <section className="pb-16 px-6">
            <div className="max-w-[1400px] mx-auto">
              <Tilt>
                <motion.div whileHover={{ y: -3 }} transition={spB} onClick={() => go('case')}
                  className={`cursor-pointer group rounded-2xl overflow-hidden ${glass} ${innerGlow} ${glassHover} transition-all`}>
                  <div className="p-1.5">
                    <div className="rounded-[calc(1rem-6px)] overflow-hidden">
                      <img src={p.coverImage} alt={p.title} className="w-full aspect-[21/9] object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.06]" />
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3">
                    <div className="flex items-baseline gap-4 mb-1">
                      <h2 className="text-[20px] font-bold tracking-[-0.02em] group-hover:text-blue-600 transition-colors">{p.title}</h2>
                      <span className="text-[13px] text-gray-400 font-mono tabular-nums">{p.period}</span>
                    </div>
                    <p className="text-[14px] text-gray-400 mb-2">{p.role}</p>
                    <p className="text-[16px] text-gray-500 leading-relaxed max-w-lg">{p.summary}</p>
                  </div>
                </motion.div>
              </Tilt>
            </div>
          </section>
        </F>
      ))}
      <Continue items={[
        { label: 'Interface Work', desc: 'UI craft at full scale', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

/* ═══ CASE STUDY ═══ */
function Case({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const media: MediaItem[] = [...VIDEOS.slice(0, 3).map(v => ({ type: 'video' as const, src: v.src, label: v.label })), ...UI.toolkit.map((img, i) => ({ type: 'image' as const, src: img, label: `Toolkit interface ${i + 1}` }))];
  const sections = [
    { label: 'Overview', text: TK.overview.introP1 + '\n\n' + TK.overview.introP2 },
    { label: 'Context', text: TK.context.intro },
    { label: 'Phase 1', text: TK.phase1.intro },
    { label: 'Phase 2', text: TK.phase2.intro },
    { label: 'Phase 3', text: TK.phase3.intro },
    { label: 'Design System', text: TK.designSystem.intro },
    { label: 'Impact', text: TK.impact.intro },
  ];

  return (
    <div style={{ fontFamily: font }}>
      {/* Section progress */}
      <div className="sticky top-14 z-30 bg-white/60 backdrop-blur-xl border-b border-white/40 py-2" style={{ boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.4)' }}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {sections.map((s, i) => <button key={i} onClick={() => scrollToElement(`rb-${i}`)} className="text-[12px] font-semibold text-gray-300 hover:text-gray-600 whitespace-nowrap transition-colors">{s.label}</button>)}
        </div>
      </div>

      {/* Header */}
      <section className="pt-16 pb-10 px-6">
        <div className="max-w-[800px] mx-auto">
          <F><motion.button whileHover={{ x: -3 }} transition={spB} onClick={() => go('work')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-10"><ArrowLeft size={14} /> All projects</motion.button></F>
          <F delay={0.03}>
            <div className="flex items-center gap-6 text-[14px] text-gray-400 mb-4"><span className="font-semibold text-gray-900">Toolkit</span><span>·</span><span>{TK.meta.type}</span><span>·</span><span>{TK.meta.period}</span></div>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-6">{TK.hero.title}</h1>
            <p className="text-[18px] text-gray-500 leading-[1.75]">{TK.hero.description}</p>
          </F>
        </div>
      </section>

      {/* Hero video */}
      <F><div className="max-w-[1400px] mx-auto px-4 mb-16">
        <Tilt><Vid src={VIDEOS[0].src} label={VIDEOS[0].label} desc={VIDEOS[0].desc} onClick={() => setLbIdx(0)} /></Tilt>
      </div></F>

      {/* Sections with sticky TOC sidebar */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12">
        {/* Sticky TOC */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">On this page</p>
            <div className="space-y-1">
              {sections.map((s, i) => (
                <button key={i} onClick={() => scrollToElement(`rb-${i}`)}
                  className="block w-full text-left py-1.5 text-[13px] font-medium text-gray-400 hover:text-gray-700 transition-colors">{s.label}</button>
              ))}
            </div>
            {/* Floating suggestion */}
            <div className="mt-10 pt-6 border-t border-gray-100/50">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Also read</p>
              <motion.div whileHover={{ x: 2 }} transition={spB} onClick={() => go('blog')} className="group cursor-pointer">
                <p className="text-[13px] font-semibold text-gray-600 group-hover:text-blue-600 transition-colors leading-snug">Claude Code Guide</p>
                <p className="text-[11px] text-gray-400 mt-0.5">9 chapters for designers</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {sections.map((s, i) => (
            <section key={i} className="py-14" id={`rb-${i}`}>
              <F>
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">{s.label}</span>
                {s.text.split('\n\n').map((p: string, j: number) => <p key={j} className="text-[18px] text-gray-600 leading-[1.75] mb-4 max-w-[720px]">{p}</p>)}
              </F>
              {i < 5 && UI.toolkit[i * 2] && (
                <F><div className="mt-8 -mx-6 lg:-mx-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 lg:px-12">
                    {UI.toolkit.slice(i * 2, i * 2 + 2).filter(Boolean).map((img, j) => (
                      <Img key={j} src={img} label={`${s.label} screen ${j + 1}`} desc="Designed for field conditions with high contrast and large touch targets." onClick={() => setLbIdx(3 + i * 2 + j)} />
                    ))}
                  </div>
                </div></F>
              )}
              {i === 6 && (
                <F><div className="mt-8 grid grid-cols-3 gap-4 max-w-[720px]">
                  {[{ v: TK.impact.customers, d: TK.impact.customersDesc }, { v: TK.impact.seriesA, d: TK.impact.seriesADesc }, { v: TK.impact.enterprise, d: TK.impact.enterpriseDesc }].map((m, mi) => (
                    <Glass key={mi} className="p-5"><span className="text-2xl font-bold" style={{ color: blue }}>{m.v}</span><p className="text-[14px] text-gray-500 mt-1">{m.d}</p></Glass>
                  ))}
                </div></F>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <section className="py-14 px-6"><div className="max-w-[800px] mx-auto"><F>
        <Glass className="p-8">
          <Quotes size={18} weight="fill" className="text-blue-200 mb-4" />
          <blockquote className="text-[18px] text-gray-600 leading-[1.7] italic mb-4">{TK.testimonial.quote}</blockquote>
          <p className="text-[14px]"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
        </Glass>
      </F></div></section>

      {/* Next project */}
      <section className="py-8 px-6 border-t border-gray-100/50"><div className="max-w-[800px] mx-auto"><F>
        <motion.div whileHover={{ x: 4 }} transition={spB} onClick={() => go('case')} className="flex items-center gap-5 py-4 cursor-pointer group">
          <div className="w-16 h-12 rounded-xl overflow-hidden p-0.5 bg-white/40 border border-white/60 shrink-0"><img src={PROJECTS[1].coverImage} alt="" className="w-full h-full rounded-lg object-cover" /></div>
          <div><p className="text-[12px] text-gray-400">Next project</p><p className="text-[15px] font-semibold group-hover:text-blue-600 transition-colors">{PROJECTS[1].title}</p></div>
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
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const timeline = [
    { y: '2024-25', co: 'France VAE / Beta.gouv', role: 'Lead Product Designer', d: 'National public service, 100K+ candidates.', expanded: 'Co-designed prioritization matrix with Lead PM. Led 10 user interviews for dashboard launch. Organized 2-day design thinking workshop with field actors. Restructured Figma architecture and delivery process. Shipped VAE Collective MVP and employer journey.' },
    { y: '2023-24', co: 'Toolkit', role: 'Founding Designer', d: '0-to-1 construction tech SaaS.', expanded: 'Sole designer in a 3-person team. Translated business requirements into a product that field managers adopted. Designed the entire platform from pitch deck to shipped MVP. Built a Tailwind-ready design system with 40+ components. Product secured seed funding and reached 2,000 customers.' },
    { y: '2018-24', co: 'UNOWHY / SQOOL', role: 'Product Design Manager', d: 'Team of 4, 8 apps, 500K+ students.', expanded: 'Managed 4 designers: hiring, annual reviews, career coaching. Led design strategy for the SQOOL ecosystem across 8 applications. Built a multi-brand design system shared across Web, Android, and PC. Structured Design Ops: Figma organization, templates, QA rituals. Collaborated with 30+ developers and PMs.' },
    { y: '2017-18', co: 'Dailymotion', role: 'Senior Product Designer', d: 'Video suite for CBS, Bein Sports.', expanded: 'Designed high-volume upload and livestreaming dashboards. Created the first pattern library (Sketch + Storybook). Mentored junior designers on interaction specifications. Collaboration across Paris, NYC, and Marseille teams.' },
    { y: '2014-17', co: 'PagesJaunes', role: 'Mobile UI Lead', d: '22M users, iOS/Android.', expanded: 'Led UI for iOS and Android apps (22M downloads). Managed transition to Material Design standards. Supervised Android Wear prototyping and Motion Design. Coordinated cross-platform consistency with engineering.' },
  ];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-8">About</h1></F>
            <F delay={0.05}><p className="text-[19px] text-gray-600 leading-[1.75] mb-6">{T.bio.p1}</p></F>
            <F delay={0.1}><p className="text-[19px] text-gray-600 leading-[1.75] mb-16">{T.bio.p2}</p></F>
            <F delay={0.15}><h2 className="text-[22px] font-bold tracking-[-0.02em] mb-8">Career</h2></F>
            {timeline.map((t, i) => (
              <F key={i} delay={0.15 + i * 0.04}>
                <div className="flex gap-6 py-5 border-b border-gray-100/50 last:border-b-0 group">
                  <span className="text-[13px] text-gray-400 font-mono w-14 tabular-nums shrink-0">{t.y}</span>
                  <div>
                    <p className="text-[17px] font-semibold group-hover:text-blue-600 transition-colors">{t.co}</p>
                    <p className="text-[15px] text-gray-400">{t.role}</p>
                    <p className="text-[15px] text-gray-500 mt-1">{t.d}</p>
                  </div>
                </div>
              </F>
            ))}
          </div>
          <div className="md:col-span-5">
            <F delay={0.2}><div className="md:sticky md:top-20 space-y-5">
              <div className="rounded-2xl overflow-hidden p-1.5 bg-white/40 border border-white/60" style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 40px rgba(0,0,0,0.05)` }}>
                <div className="rounded-[calc(1rem-6px)] overflow-hidden"><img src="/images/photos victor/image_victor_home.png" alt="" className="w-full aspect-[3/4] object-cover object-top" /></div>
              </div>
              <Glass className="p-5">
                <h3 className="text-[14px] font-semibold mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">{['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind', 'Vercel', 'Linear'].map(t => <span key={t} className="text-[13px] px-3 py-1.5 rounded-xl bg-white/50 text-gray-600 border border-white/60">{t}</span>)}</div>
              </Glass>
              <Glass className="p-5">
                <h3 className="text-[14px] font-semibold mb-3">Companies</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">{LOGOS.map(n => <span key={n} className="text-[13px] text-gray-400">{n}</span>)}</div>
              </Glass>
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
      <section className="pt-24 pb-20 px-6"><div className="max-w-[800px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Resources</h1></F>
        <F delay={0.05}><p className="text-[18px] text-gray-400 mb-12">{T.signals.subtitle}</p></F>
        <F delay={0.08}>
          <Glass className="p-6 mb-8 cursor-pointer group" hover>
            <div className="flex items-center gap-2 mb-3" onClick={() => go('article')}><BookOpen size={14} style={{ color: blue }} /><span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: blue }}>Guide · 9 chapters</span></div>
            <h2 className="text-[20px] font-bold group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h2>
            <p className="text-[16px] text-gray-500 leading-relaxed">Complete guide for designers: installation to deployment, visual quality, skills, and Figma MCP.</p>
          </Glass>
        </F>
        {ARTICLES.map((a, i) => (
          <F key={a.id} delay={0.1 + i * 0.04}>
            <motion.div whileHover={{ x: 4 }} transition={spB} onClick={() => go('article')} className="group cursor-pointer py-6 border-b border-gray-100/50 last:border-b-0">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{a.category} · {a.date}</span>
              <h3 className="text-[18px] font-semibold mt-2 mb-2 group-hover:text-blue-600 transition-colors">{a.title_en}</h3>
              <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2">{a.body_en.slice(0, 160)}...</p>
            </motion.div>
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
function Article({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[680px] mx-auto">
        <F><motion.button whileHover={{ x: -3 }} transition={spB} onClick={() => go('blog')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-12"><ArrowLeft size={14} /> All articles</motion.button></F>
        <F delay={0.03}>
          <span className="px-3 py-1 rounded-xl bg-white/50 border border-white/60 text-[12px] font-semibold text-gray-600" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>{a.category}</span>
          <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mt-4 mb-8">{a.title_en}</h1>
        </F>
      </div></section>
      <article className="px-6 pb-20"><div className="max-w-[680px] mx-auto">
        {(a.body_long_en || a.body_en).split('. ').reduce((acc: string[][], s, i) => { const p = Math.floor(i / 3); if (!acc[p]) acc[p] = []; acc[p].push(s); return acc; }, []).map((ss, i) => (
          <F key={i} delay={i * 0.02}><p className="text-[19px] text-gray-700 leading-[1.85] mb-10" style={{ fontFeatureSettings: "'kern' 1, 'liga' 1" }}>
            {i === 0 && <span className="text-[52px] font-bold float-left mr-3 mt-2 leading-[0.78]" style={{ color: blue }}>{ss[0][0]}</span>}{i === 0 ? ss.join('. ').slice(1) : ss.join('. ')}.</p></F>
        ))}
      </div></article>
      <section className="py-12 px-6 border-t border-gray-100/50"><div className="max-w-[680px] mx-auto flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden p-0.5 bg-white/40 border border-white/60"><img src="/images/photos victor/image_victor_home.png" alt="" className="w-full h-full rounded-full object-cover" /></div>
        <div><p className="text-[15px] font-semibold">Victor Soussan</p><p className="text-[14px] text-gray-400">Lead Product Designer · Paris</p></div>
      </div></section>
      <section className="py-16 px-6" style={{ background: blueSoft }}><div className="max-w-[800px] mx-auto">
        <h2 className="text-[20px] font-bold mb-6">More articles</h2>
        {ARTICLES.slice(1, 4).map((ra, i) => (
          <F key={ra.id} delay={i * 0.04}><motion.div whileHover={{ x: 3 }} transition={spB} onClick={() => go('article')} className="group cursor-pointer py-4 border-b border-gray-200/30 last:border-b-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{ra.category}</span>
            <h3 className="text-[16px] font-semibold mt-1 group-hover:text-blue-600 transition-colors">{ra.title_en}</h3>
          </motion.div></F>
        ))}
      </div></section>
    </div>
  );
}

/* ═══ GALLERY ═══ */
function Gallery({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState('all');
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const toolkitScreens = ['Planning overview', 'Task board', 'Gantt module', 'Site coordination', 'Batch actions', 'Mobile dashboard', 'Project hub', 'Admin panel', 'Billing view', 'Design system'];
  const scrimScreens = ['Landing page', 'Feature grid', 'Pricing table', 'Onboarding flow', 'Dashboard home', 'Settings panel', 'Profile editor'];
  const sqoolScreens = ['Classroom view', 'Student dashboard', 'App launcher', 'Content library', 'Device manager', 'Teacher console', 'Activity feed', 'Assessment builder', 'Admin overview'];
  const groups = [
    { id: 'toolkit', label: 'Toolkit', images: UI.toolkit, screens: toolkitScreens, descs: toolkitScreens.map(s => 'Reducing complexity for construction teams who need clarity under pressure.') },
    { id: 'scrim', label: 'SCRIM', images: UI.scrim, screens: scrimScreens, descs: scrimScreens.map(s => 'Making the product speak for itself, so users understand before they click.') },
    { id: 'sqool', label: 'SQOOL', images: UI.sqool, screens: sqoolScreens, descs: sqoolScreens.map(s => 'Giving teachers control without adding cognitive load to an already demanding job.') },
  ];
  const filtered = filter === 'all' ? groups : groups.filter(g => g.id === filter);
  const allItems = filtered.flatMap(g => g.images.map((img, i) => ({ img, project: g.label, screen: g.screens[i] || 'Interface', desc: g.descs[i] || '' })));
  const media: MediaItem[] = allItems.map(item => ({ type: 'image' as const, src: item.img, label: `${item.project}: ${item.screen}` }));

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[1400px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></F>
        <F delay={0.05}><p className="text-[18px] text-gray-500 mb-8">Click any image to explore at full scale. Arrow keys to navigate.</p></F>
        <F delay={0.08}><div className="flex gap-2 mb-8">
          {['all', ...groups.map(g => g.id)].map(id => (
            <motion.button key={id} whileTap={{ scale: 0.95 }} onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${filter === id ? 'text-white' : `${glass} ${innerGlowSm} text-gray-400 hover:text-gray-600`}`}
              style={filter === id ? { background: blue, boxShadow: `0 2px 8px ${blueShadow}, inset 0 1px 0 rgba(255,255,255,0.15)` } : {}}>
              {id === 'all' ? 'All' : groups.find(g => g.id === id)?.label}
            </motion.button>
          ))}
        </div></F>
      </div></section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {allItems.map((item, i) => (
            <F key={`${filter}-${i}`} delay={Math.min(i * 0.02, 0.15)}>
              <div className="break-inside-avoid">
                <Img src={item.img} label={`${item.project}: ${item.screen}`} desc={item.desc} onClick={() => setLbIdx(i)} />
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
export function RealmacBlue() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen text-gray-900" style={{ background: warmBg }}>
      <Grain />
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <Case go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} />}
      {page === 'article' && <Article go={go} />}
      {page === 'gallery' && <Gallery go={go} />}
      <FloatCTA />
      <BackTop />
    </div>
  );
}
