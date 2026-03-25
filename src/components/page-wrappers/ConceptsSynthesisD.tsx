'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, Play, BookOpen, PencilSimple, Compass, UsersThree, GridFour, List, Eye } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';

const PROJECTS = getProjects('en');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TK = TOOLKIT_TRANSLATIONS.en as Record<string, any>;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS.slice(0, 6);
const UI = { toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`), scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`), sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`) };
const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Toolkit: Batch editing', desc: 'Managing multiple tasks across sites simultaneously.' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Toolkit: Planning zoom', desc: 'Seamless zoom between day, week, and month views.' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Toolkit: Task manipulation', desc: 'Drag-and-drop task management for field managers.' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion: Embed code', desc: 'One-click embed generation for media partners.' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'SQOOL Connect: Dashboard', desc: 'Classroom orchestration for teachers.' },
];
const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';
type MediaItem = { type: 'video' | 'image'; src: string; label: string };

const sp = { type: 'spring' as const, stiffness: 300, damping: 26 };
const spB = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";
const r = 'rounded-2xl'; // 16px border-radius everywhere

/* ═══ CORE ═══ */

function F({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-20px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }} animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.35, delay, ...sp }} className={className}>{children}</motion.div>;
}

/* Tilt card */
function Tilt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 }); const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <motion.div ref={ref} style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onMouseMove={e => { if (!ref.current) return; const b = ref.current.getBoundingClientRect(); rx.set(((e.clientY - b.top) / b.height - 0.5) * -6); ry.set(((e.clientX - b.left) / b.width - 0.5) * 6); }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }} className={className}>{children}</motion.div>
  );
}

/* Video hover-to-play with caption */
function Vid({ src, label, desc, onClick, className = '' }: { src: string; label: string; desc?: string; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  return (
    <div>
      <div className={`group relative ${r} overflow-hidden bg-[#F5F5F7] cursor-pointer ${className}`}
        onMouseEnter={() => { ref.current?.play(); setOn(true); }} onMouseLeave={() => { ref.current?.pause(); setOn(false); }} onClick={onClick}>
        <video ref={ref} src={src} muted loop playsInline preload="metadata" className="w-full object-cover" />
        {!on && <div className="absolute inset-0 flex items-center justify-center bg-black/5"><div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"><Play size={18} weight="fill" className="text-gray-900 ml-0.5" /></div></div>}
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[14px] font-semibold text-gray-900" style={{ fontFamily: font }}>{label}</p>
        {desc && <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5" style={{ fontFamily: font }}>{desc}</p>}
      </div>
    </div>
  );
}

/* Captioned image */
function Img({ src, label, desc, onClick, className = '' }: { src: string; label: string; desc?: string; onClick?: () => void; className?: string }) {
  return (
    <div className={className}>
      <div className={`group ${r} overflow-hidden bg-[#F5F5F7] cursor-pointer`} onClick={onClick}>
        <img src={src} alt={label} className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[14px] font-semibold text-gray-900" style={{ fontFamily: font }}>{label}</p>
        {desc && <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5" style={{ fontFamily: font }}>{desc}</p>}
      </div>
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
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="max-w-[85vw] max-h-[80vh]">
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className={`max-w-full max-h-[80vh] ${r}`} /> : <img src={item.src} alt="" className={`max-w-full max-h-[80vh] ${r} object-contain`} />}
          </motion.div>
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onChange(Math.min(items.length - 1, idx + 1))} disabled={idx === items.length - 1} className="p-3 text-white/20 hover:text-white disabled:opacity-10"><ArrowRight size={24} /></motion.button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4 scrollbar-hide" onClick={e => e.stopPropagation()}>
        {items.map((it, i) => (
          <button key={i} onClick={() => onChange(i)} className={`w-14 h-9 ${r} overflow-hidden shrink-0 transition-all ${i === idx ? 'ring-2 ring-white opacity-100' : 'opacity-25 hover:opacity-50'}`}>
            {it.type === 'video' ? <video src={it.src} muted preload="metadata" className="w-full h-full object-cover" /> : <img src={it.src} alt="" className="w-full h-full object-cover" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* Nav */
function Nav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60));
  const labels: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  const tabs: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' }, { id: 'work', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'blog', label: 'Resources' }, { id: 'gallery', label: 'Interfaces' },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/80">
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gray-900 origin-left" style={{ scaleX: scrollYProgress }} />
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => go('home')} className="text-[15px] font-semibold text-gray-900 tracking-[-0.01em] shrink-0" style={{ fontFamily: font }}>Victor Soussan</motion.button>
        <AnimatePresence>
          {scrolled && labels[page] && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={sp} className="text-[13px] text-gray-400 font-medium ml-2">{labels[page]}</motion.span>}
        </AnimatePresence>
        <div className="ml-auto hidden md:flex items-center gap-0.5">
          {tabs.map(t => (
            <motion.button key={t.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go(t.id)}
              className={`px-3 py-1.5 ${r} text-[13px] font-medium transition-colors ${page === t.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`} style={{ fontFamily: font }}>
              {t.label}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* Floating CTA */
function FloatingCTA({ go }: { go: (p: PageId) => void }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 500));
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={spB}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl ${r} border border-gray-200 shadow-xl shadow-gray-900/10`}>
          <span className="text-[13px] text-gray-500 font-medium hidden sm:block" style={{ fontFamily: font }}>Available for new projects</span>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spB}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[13px] font-semibold hover:bg-gray-800">Book a call</motion.button>
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
          className={`fixed bottom-6 right-6 z-[80] w-10 h-10 ${r} bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50`}>
          <ArrowRight size={14} className="text-gray-600 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* Continue reading */
function Continue({ items }: { items: { label: string; desc: string; image?: string; onClick: () => void }[] }) {
  return (
    <section className="py-16 px-6 border-t border-gray-100 bg-gray-50/30">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6" style={{ fontFamily: font }}>Continue exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button key={i} onClick={item.onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={spB}
              className={`text-left p-5 ${r} bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-shadow group`}>
              {item.image && <img src={item.image} alt="" className={`w-full aspect-[16/9] ${r} object-cover mb-3 group-hover:scale-[1.02] transition-transform`} />}
              <p className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily: font }}>{item.label}</p>
              <p className="text-[13px] text-gray-400 mt-1" style={{ fontFamily: font }}>{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PAGES ═══ */

function Home({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const heroMedia: MediaItem[] = VIDEOS.slice(0, 3).map(v => ({ type: 'video', src: v.src, label: v.label }));

  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[800px] mx-auto">
          <F>
            <motion.div whileHover={{ scale: 1.02 }} transition={spB} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-10 cursor-default">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[14px] text-emerald-700 font-medium">{T.hero.availability}</span>
            </motion.div>
          </F>
          <F delay={0.05}>
            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-8">{T.hero.title}, <span className="text-gray-300">{T.hero.subtitle}.</span></h1>
          </F>
          <F delay={0.1}>
            <p className="text-[19px] text-gray-500 leading-[1.7] mb-4 max-w-[580px]">{T.hero.desc.slice(0, 220)}.</p>
            <p className="text-[14px] text-gray-300 tracking-wide mb-10">{T.hero.positioning}</p>
          </F>
          <F delay={0.15}>
            <div className="flex gap-3 flex-wrap">
              <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go('work')}
                className={`group px-7 py-3.5 bg-gray-900 text-white ${r} text-[15px] font-semibold flex items-center gap-2 hover:bg-gray-800`}>View work <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB} onClick={() => go('about')}
                className={`px-7 py-3.5 ${r} text-[15px] text-gray-500 border border-gray-200 hover:border-gray-300 font-medium hover:bg-gray-50`}>About me</motion.button>
            </div>
          </F>
        </div>
      </section>

      {/* Featured video breakout */}
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
                    className={`group cursor-pointer ${r} overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/[0.05] transition-all`}>
                    <div className="overflow-hidden relative">
                      <img src={p.coverImage} alt={p.title} className={`w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.04]`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                        <div className="flex flex-wrap gap-1.5">
                          {p.deliverables.slice(0, 3).map(d => <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">{d}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-[17px] font-semibold tracking-[-0.01em] group-hover:text-blue-600 transition-colors">{p.title}</h3>
                        <span className="text-[11px] text-gray-300 font-mono tabular-nums">{p.period}</span>
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

      {/* Video strip */}
      <section className="py-8">
        <div className="max-w-[800px] mx-auto px-6 mb-6"><F><h3 className="text-[20px] font-bold tracking-[-0.02em]">Products in motion</h3></F></div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x scrollbar-hide">
          {VIDEOS.map((v, i) => (
            <F key={i} delay={i * 0.04}>
              <div className="min-w-[380px] md:min-w-[500px] shrink-0 snap-start">
                <Vid src={v.src} label={v.label} desc={v.desc} onClick={() => setLbIdx(i)} />
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <F><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2></F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: PencilSimple, title: 'Design & Prototyping', desc: 'From wireframe to shipped UI. I prototype in code and Figma to validate ideas before investing development time.' },
              { icon: Compass, title: 'Product Strategy', desc: 'Framing the problem is half the solution. I run workshops, conduct research, and scope features that matter.' },
              { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, hiring, mentoring, delivery rituals. I build the practices that let the team scale.' },
            ].map((p, i) => (
              <F key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -3 }} transition={spB} className={`p-7 ${r} bg-gray-50/50 border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all`}>
                  <p.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-3">{p.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              </F>
            ))}
          </div>
          <F>
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-4">Trusted by</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">{LOGOS.map(n => <span key={n} className="text-[14px] text-gray-200 font-medium">{n}</span>)}</div>
            </div>
          </F>
        </div>
      </section>

      {/* Testimonials horizontal */}
      <section className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-6 px-6">
            {[
              { author: TK.testimonial.author, role: TK.testimonial.role, content: TK.testimonial.quote },
              { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
            ].map((t, i) => (
              <F key={i} delay={i * 0.08}>
                <div className={`min-w-[340px] max-w-[420px] p-6 ${r} bg-white border border-gray-100 snap-start shrink-0`}>
                  <Quotes size={16} weight="fill" className="text-gray-200 mb-3" />
                  <blockquote className="text-[15px] text-gray-600 leading-relaxed mb-4">{t.content}</blockquote>
                  <p className="text-[13px]"><span className="font-semibold text-gray-900">{t.author}</span> <span className="text-gray-400">· {t.role}</span></p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24 px-6 bg-gray-50/30">
        <div className="max-w-[1200px] mx-auto">
          <F>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Resources</h2>
              <motion.button whileHover={{ x: 2 }} transition={spB} onClick={() => go('blog')} className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All <ArrowRight size={12} /></motion.button>
            </div>
          </F>
          <F delay={0.05}>
            <motion.div whileHover={{ y: -2 }} transition={spB} onClick={() => go('blog')} className={`group cursor-pointer p-6 ${r} bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all mb-6`}>
              <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span></div>
              <h3 className="text-[18px] font-semibold group-hover:text-blue-600 transition-colors">Getting started with Claude Code</h3>
              <p className="text-[14px] text-gray-400 mt-1">Complete guide for designers: installation to deployment.</p>
            </motion.div>
          </F>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <F key={a.id} delay={0.08 + i * 0.04}>
                <motion.div whileHover={{ y: -2 }} transition={spB} onClick={() => go('article')}
                  className={`group cursor-pointer p-5 ${r} bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all`}>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{a.category}</span>
                  <h3 className="text-[15px] font-semibold mt-2 group-hover:text-blue-600 transition-colors leading-snug">{a.title_en}</h3>
                </motion.div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <F>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
          <p className="text-[18px] text-gray-400 mb-8">Currently available for product design missions.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB}
              className={`px-8 py-4 bg-gray-900 text-white ${r} text-[16px] font-semibold flex items-center justify-center gap-2`}>Book a call <Calendar size={16} /></motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spB}
              className={`px-8 py-4 ${r} text-[16px] text-gray-500 border border-gray-200 flex items-center justify-center gap-2`}>Email <Envelope size={16} /></motion.button>
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
            <div className="max-w-[800px] mx-auto mb-4">
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="text-[20px] font-bold tracking-[-0.02em]">{p.title}</h2>
                <span className="text-[13px] text-gray-300 font-mono">{p.period}</span>
              </div>
              <p className="text-[14px] text-gray-400 mb-1">{p.role}</p>
              <p className="text-[16px] text-gray-500 leading-relaxed">{p.summary}</p>
            </div>
            <div className="max-w-[1400px] mx-auto">
              <Tilt>
                <motion.div whileHover={{ scale: 1.003 }} transition={{ duration: 0.5 }} onClick={() => go('case')} className={`${r} overflow-hidden bg-[#F5F5F7] cursor-pointer`}>
                  <img src={p.coverImage} alt={p.title} className="w-full" loading="lazy" />
                </motion.div>
              </Tilt>
              <div className="max-w-[800px] mx-auto mt-3">
                <p className="text-[13px] font-semibold text-gray-900">{p.title}</p>
                <p className="text-[12px] text-gray-400">{p.summary.slice(0, 80)}</p>
              </div>
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
      <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-2">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {sections.map((s, i) => <button key={i} onClick={() => document.getElementById(`s${i}`)?.scrollIntoView({ behavior: 'smooth' })} className="text-[12px] font-semibold text-gray-300 hover:text-gray-600 whitespace-nowrap transition-colors">{s.label}</button>)}
        </div>
      </div>

      {/* Header */}
      <section className="pt-16 pb-10 px-6" id="s-header">
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

      {/* Sections */}
      {sections.map((s, i) => (
        <section key={i} className="py-14 px-6" id={`s${i}`}>
          <div className="max-w-[800px] mx-auto">
            <F>
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">{s.label}</span>
              {s.text.split('\n\n').map((p: string, j: number) => <p key={j} className="text-[18px] text-gray-600 leading-[1.75] mb-4">{p}</p>)}
            </F>
          </div>
          {/* Breakout visuals for some sections */}
          {i < 5 && UI.toolkit[i * 2] && (
            <F><div className="max-w-[1400px] mx-auto px-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UI.toolkit.slice(i * 2, i * 2 + 2).filter(Boolean).map((img, j) => (
                  <Img key={j} src={img} label={`${s.label} screen ${j + 1}`} desc="Designed for field conditions with high contrast and large touch targets." onClick={() => setLbIdx(3 + i * 2 + j)} />
                ))}
              </div>
            </div></F>
          )}
          {/* Impact metrics */}
          {i === 6 && (
            <F><div className="max-w-[800px] mx-auto mt-8 grid grid-cols-3 gap-4">
              <div className={`p-5 ${r} bg-gray-50 border border-gray-100`}><span className="text-2xl font-bold">{TK.impact.customers}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.customersDesc}</p></div>
              <div className={`p-5 ${r} bg-gray-50 border border-gray-100`}><span className="text-2xl font-bold">{TK.impact.seriesA}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.seriesADesc}</p></div>
              <div className={`p-5 ${r} bg-gray-50 border border-gray-100`}><span className="text-2xl font-bold">{TK.impact.enterprise}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.enterpriseDesc}</p></div>
            </div></F>
          )}
        </section>
      ))}

      {/* Testimonial */}
      <section className="py-14 px-6"><div className="max-w-[800px] mx-auto"><F>
        <div className="flex gap-6"><div className="w-1 bg-gray-200 rounded-full shrink-0" /><div>
          <blockquote className="text-[19px] text-gray-600 leading-[1.7] italic mb-4">{TK.testimonial.quote}</blockquote>
          <p className="text-[14px]"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
        </div></div>
      </F></div></section>

      {/* Next */}
      <section className="py-8 px-6 border-t border-gray-100"><div className="max-w-[800px] mx-auto"><F>
        <motion.div whileHover={{ x: 4 }} transition={spB} onClick={() => go('case')} className="flex items-center gap-5 py-4 cursor-pointer group">
          <div className={`w-16 h-12 ${r} overflow-hidden bg-gray-50 shrink-0`}><img src={PROJECTS[1].coverImage} alt="" className="w-full h-full object-cover" /></div>
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

function About({ go }: { go: (p: PageId) => void }) {
  const timeline = [
    { y: '2024-25', co: 'France VAE / Beta.gouv', role: 'Lead Product Designer', d: 'Product ops for a national public service, 100K+ candidates.' },
    { y: '2023-24', co: 'Toolkit', role: 'Founding Designer', d: '0-to-1 construction tech SaaS.' },
    { y: '2018-24', co: 'UNOWHY / SQOOL', role: 'Product Design Manager', d: 'Team of 4, 8 apps, 500K+ students.' },
    { y: '2017-18', co: 'Dailymotion', role: 'Senior Product Designer', d: 'Video suite for CBS, Bein Sports.' },
    { y: '2014-17', co: 'PagesJaunes', role: 'Mobile UI Lead', d: '22M users, iOS/Android.' },
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
                <div className="flex gap-6 py-5 border-b border-gray-100 last:border-b-0 group">
                  <span className="text-[13px] text-gray-300 font-mono w-14 tabular-nums shrink-0">{t.y}</span>
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
              <div className={`${r} overflow-hidden`}><img src="/images/photos victor/image_victor_home.png" alt="" className="w-full aspect-[3/4] object-cover object-top" /></div>
              <div className={`p-5 ${r} bg-gray-50 border border-gray-100`}>
                <h3 className="text-[14px] font-semibold mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">{['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind', 'Vercel', 'Linear'].map(t => <span key={t} className={`text-[13px] px-3 py-1.5 rounded-xl bg-white text-gray-600 border border-gray-100`}>{t}</span>)}</div>
              </div>
              <div className={`p-5 ${r} bg-gray-50 border border-gray-100`}>
                <h3 className="text-[14px] font-semibold mb-3">Companies</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">{LOGOS.map(n => <span key={n} className="text-[13px] text-gray-400">{n}</span>)}</div>
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

function Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6"><div className="max-w-[800px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Resources</h1></F>
        <F delay={0.05}><p className="text-[18px] text-gray-400 mb-12">{T.signals.subtitle}</p></F>
        <F delay={0.08}>
          <motion.div whileHover={{ y: -2 }} transition={spB} onClick={() => go('article')} className={`group cursor-pointer p-6 ${r} bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all mb-8`}>
            <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span></div>
            <h2 className="text-[20px] font-bold group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h2>
            <p className="text-[16px] text-gray-500 leading-relaxed">Complete guide for designers.</p>
          </motion.div>
        </F>
        {ARTICLES.map((a, i) => (
          <F key={a.id} delay={0.1 + i * 0.04}>
            <motion.div whileHover={{ x: 4 }} transition={spB} onClick={() => go('article')} className="group cursor-pointer py-6 border-b border-gray-100 last:border-b-0">
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{a.category} · {a.date}</span>
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

function Article({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[680px] mx-auto">
        <F><motion.button whileHover={{ x: -3 }} transition={spB} onClick={() => go('blog')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-12"><ArrowLeft size={14} /> All articles</motion.button></F>
        <F delay={0.03}>
          <span className={`px-3 py-1 ${r} bg-gray-100 text-[12px] font-semibold text-gray-600`}>{a.category}</span>
          <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mt-4 mb-8">{a.title_en}</h1>
        </F>
      </div></section>
      <article className="px-6 pb-20"><div className="max-w-[680px] mx-auto">
        {(a.body_long_en || a.body_en).split('. ').reduce((acc: string[][], s, i) => { const p = Math.floor(i / 3); if (!acc[p]) acc[p] = []; acc[p].push(s); return acc; }, []).map((ss, i) => (
          <F key={i} delay={i * 0.02}><p className="text-[19px] text-gray-700 leading-[1.85] mb-10" style={{ fontFeatureSettings: "'kern' 1, 'liga' 1" }}>
            {i === 0 && <span className="text-[52px] font-bold text-gray-900 float-left mr-3 mt-2 leading-[0.78]">{ss[0][0]}</span>}{i === 0 ? ss.join('. ').slice(1) : ss.join('. ')}.</p></F>
        ))}
      </div></article>
      <section className="py-12 px-6 border-t border-gray-100"><div className="max-w-[680px] mx-auto flex items-center gap-4">
        <img src="/images/photos victor/image_victor_home.png" alt="" className="w-14 h-14 rounded-full object-cover" />
        <div><p className="text-[15px] font-semibold">Victor Soussan</p><p className="text-[14px] text-gray-400">Lead Product Designer · Paris</p></div>
      </div></section>
      <section className="py-16 px-6 bg-gray-50/30"><div className="max-w-[800px] mx-auto">
        <h2 className="text-[20px] font-bold mb-6">More articles</h2>
        {ARTICLES.slice(1, 4).map((ra, i) => (
          <F key={ra.id} delay={i * 0.04}><motion.div whileHover={{ x: 3 }} transition={spB} onClick={() => go('article')} className="group cursor-pointer py-4 border-b border-gray-100 last:border-b-0">
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{ra.category}</span>
            <h3 className="text-[16px] font-semibold mt-1 group-hover:text-blue-600 transition-colors">{ra.title_en}</h3>
          </motion.div></F>
        ))}
      </div></section>
    </div>
  );
}

function Gallery({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState('all');
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const groups = [{ id: 'toolkit', label: 'Toolkit', images: UI.toolkit }, { id: 'scrim', label: 'SCRIM', images: UI.scrim }, { id: 'sqool', label: 'SQOOL', images: UI.sqool }];
  const filtered = filter === 'all' ? groups : groups.filter(g => g.id === filter);
  const all = filtered.flatMap(g => g.images);
  const media: MediaItem[] = all.map((img, i) => ({ type: 'image', src: img, label: `Interface ${i + 1}` }));

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6"><div className="max-w-[1400px] mx-auto">
        <F><h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></F>
        <F delay={0.05}><p className="text-[18px] text-gray-500 mb-8">Click any image to explore at full scale. Arrow keys to navigate.</p></F>
        <F delay={0.08}><div className="flex gap-2 mb-8">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setFilter('all')} className={`px-3 py-1.5 ${r} text-[13px] font-medium ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}>All</motion.button>
          {groups.map(g => <motion.button key={g.id} whileTap={{ scale: 0.95 }} onClick={() => setFilter(g.id)} className={`px-3 py-1.5 ${r} text-[13px] font-medium ${filter === g.id ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}>{g.label}</motion.button>)}
        </div></F>
      </div></section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {all.map((img, i) => (
            <F key={`${filter}-${i}`} delay={Math.min(i * 0.02, 0.15)}>
              <div className="break-inside-avoid">
                <Img src={img} label={`Interface ${i + 1}`} desc="Designed with precision for real-world use." onClick={() => setLbIdx(i)} />
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
export function SynthesisD() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <Case go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} />}
      {page === 'article' && <Article go={go} />}
      {page === 'gallery' && <Gallery go={go} />}
      <FloatingCTA go={go} />
      <BackTop />
    </div>
  );
}
