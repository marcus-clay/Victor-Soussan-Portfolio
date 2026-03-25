'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, X, Play, BookOpen, PencilSimple, Compass, UsersThree, ArrowDown } from '@phosphor-icons/react';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';

const PROJECTS = getProjects('en');
const TK = TOOLKIT_TRANSLATIONS.en;
const T = TRANSLATIONS.en;
const ARTICLES = SIGNALS.slice(0, 6);
const UI = { toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`), scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`), sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`) };
const VIDEOS = [
  { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Toolkit: Batch editing' },
  { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Toolkit: Planning zoom' },
  { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Toolkit: Task manipulation' },
  { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Dailymotion: Embed code' },
  { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'SQOOL Connect: Dashboard' },
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

function VideoHover({ src, label, onClick, className = '' }: { src: string; label: string; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  return (
    <div className={`group relative rounded-2xl overflow-hidden bg-[#F5F5F7] cursor-pointer ${className}`}
      onMouseEnter={() => { ref.current?.play(); setOn(true); }} onMouseLeave={() => { ref.current?.pause(); setOn(false); }} onClick={onClick}>
      <video ref={ref} src={src} muted loop playsInline preload="metadata" className="w-full object-cover" />
      {!on && <div className="absolute inset-0 flex items-center justify-center bg-black/5"><div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"><Play size={16} weight="fill" className="text-gray-900 ml-0.5" /></div></div>}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><p className="text-[12px] text-white font-medium" style={{ fontFamily: font }}>{label}</p></div>
    </div>
  );
}

function LightboxB({ items, startIdx, onClose }: { items: MediaItem[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const item = items[idx];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="absolute top-4 right-4 flex items-center gap-3" onClick={e => e.stopPropagation()}>
        <span className="text-[13px] text-white/40 font-mono">{idx + 1}/{items.length}</span>
        <span className="text-[13px] text-white/60">{item.label}</span>
        <button onClick={onClose} className="p-2 text-white/50 hover:text-white"><X size={20} /></button>
      </div>
      <div className="flex items-center gap-4 max-w-[95vw]" onClick={e => e.stopPropagation()}>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} className="p-3 text-white/30 hover:text-white"><ArrowLeft size={24} /></button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {item.type === 'video' ? <video src={item.src} autoPlay loop muted playsInline className="max-w-[80vw] max-h-[80vh] rounded-xl" />
              : <img src={item.src} alt="" className="max-w-[80vw] max-h-[80vh] rounded-xl object-contain" />}
          </motion.div>
        </AnimatePresence>
        <button onClick={() => setIdx(Math.min(items.length - 1, idx + 1))} className="p-3 text-white/30 hover:text-white"><ArrowRight size={24} /></button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SYNTHESIS B: "IMMERSION"

   IA Approach: Project-centric navigation. Homepage is a cinematic reel.
   Case study = full-screen scroll narrative with breakout visuals.
   About = horizontal timeline + values grid.
   Différence fondamentale: pas de page "list" classique. Tout est visuel.
   ═══════════════════════════════════════════════════════════════════════ */

function BNav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60));
  const labels: Record<PageId, string> = { home: '', work: 'Work', case: 'Toolkit', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'}`}>
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gray-900 origin-left" style={{ scaleX: scrollYProgress }} />
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center">
        <button onClick={() => go('home')} className={`text-[16px] font-semibold tracking-[-0.02em] ${scrolled ? 'text-gray-900' : 'text-gray-900'}`} style={{ fontFamily: font }}>Victor Soussan</button>
        <AnimatePresence>
          {scrolled && labels[page] && (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring}
              className="text-[14px] text-gray-400 font-medium ml-3" style={{ fontFamily: font }}>/ {labels[page]}</motion.span>
          )}
        </AnimatePresence>
        <div className="ml-auto hidden md:flex items-center gap-1">
          {(['home', 'work', 'about', 'blog', 'gallery'] as PageId[]).map(id => (
            <button key={id} onClick={() => go(id)} className={`px-3 py-1.5 rounded-lg text-[14px] font-medium transition-colors ${page === id ? 'bg-gray-900 text-white' : (scrolled ? 'text-gray-400 hover:text-gray-900' : 'text-gray-500 hover:text-gray-900')}`} style={{ fontFamily: font }}>
              {id === 'home' ? 'Home' : id === 'work' ? 'Work' : id === 'about' ? 'About' : id === 'blog' ? 'Resources' : 'Interface Work'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function BHome({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      {/* Cinematic hero: full viewport, large type, scroll indicator */}
      <section className="min-h-[100dvh] flex flex-col justify-center px-8 pt-16 relative">
        <div className="max-w-[1400px] mx-auto w-full">
          <Fade>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[15px] text-emerald-700 font-medium">{T.hero.availability}</span>
            </div>
          </Fade>
          <Fade delay={0.05}>
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-bold tracking-[-0.05em] leading-[0.88] mb-10 max-w-[900px]">
              Frame.<br />Design.<br /><span className="text-gray-300">Ship.</span>
            </h1>
          </Fade>
          <Fade delay={0.1}>
            <p className="text-[20px] text-gray-500 leading-[1.6] max-w-[520px] mb-10">{T.hero.desc.slice(0, 180)}.</p>
          </Fade>
          <Fade delay={0.15}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springB} onClick={() => go('work')}
              className="group px-8 py-4 bg-gray-900 text-white rounded-full text-[16px] font-semibold flex items-center gap-2">
              Explore work <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </Fade>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={20} className="text-gray-300" />
        </motion.div>
      </section>

      {/* Projects as cinematic full-width blocks */}
      {PROJECTS.slice(0, 5).map((p, i) => (
        <Fade key={p.id}>
          <section className="px-4 mb-4">
            <motion.div whileHover={{ scale: 0.998 }} transition={{ duration: 0.5 }} onClick={() => go('case')}
              className="max-w-[1400px] mx-auto rounded-3xl overflow-hidden cursor-pointer group relative" style={{ minHeight: '70vh' }}>
              <img src={p.coverImage} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
                <span className="text-[13px] font-semibold text-white/50 uppercase tracking-wider block mb-3">{p.role} · {p.period}</span>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] text-white mb-3">{p.title}</h2>
                <p className="text-[17px] text-white/70 max-w-lg leading-relaxed">{p.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-[15px] font-semibold text-white/60 group-hover:text-white transition-colors">
                  View project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </section>
        </Fade>
      ))}

      {/* Video reel strip */}
      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-8 mb-8">
          <Fade><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Products in motion</h2></Fade>
        </div>
        <div className="flex gap-4 overflow-x-auto px-8 pb-4 snap-x scrollbar-hide">
          {VIDEOS.map((v, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div className="min-w-[400px] md:min-w-[550px] shrink-0 snap-start">
                <VideoHover src={v.src} label={v.label} />
                <p className="text-[13px] font-semibold text-gray-900 mt-3 px-1">{v.label.split(':')[0]}</p>
                <p className="text-[12px] text-gray-400 px-1">{v.label.split(':')[1]?.trim()}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* Expertise (large type, minimal) */}
      <section className="py-24 px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: PencilSimple, title: 'Design & Prototyping', desc: 'From wireframe to shipped UI. I prototype in code and Figma to validate ideas before investing development time.' },
            { icon: Compass, title: 'Product Strategy', desc: 'Framing the problem is half the solution. I run workshops, conduct research, and scope features that matter.' },
            { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, hiring, mentoring, delivery rituals. I build the practices that let the team scale.' },
          ].map((p, i) => (
            <Fade key={i} delay={i * 0.08}>
              <p.icon size={32} weight="regular" className="text-gray-900 mb-6" />
              <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-3">{p.title}</h3>
              <p className="text-[17px] text-gray-500 leading-relaxed">{p.desc}</p>
            </Fade>
          ))}
        </div>
      </section>

      {/* Testimonial (single, large, centered) */}
      <section className="py-24 px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <Fade>
            <Quotes size={32} weight="fill" className="text-gray-200 mx-auto mb-6" />
            <blockquote className="text-[clamp(1.5rem,3vw,2rem)] text-gray-700 leading-[1.5] font-medium tracking-[-0.02em] mb-6">{TK.testimonial.quote}</blockquote>
            <p className="text-[15px]"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
          </Fade>
        </div>
      </section>

      {/* Resources teaser */}
      <section className="py-24 px-8 bg-gray-50/50">
        <div className="max-w-[800px] mx-auto">
          <Fade>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Resources</h2>
              <button onClick={() => go('blog')} className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All <ArrowRight size={12} /></button>
            </div>
          </Fade>
          {ARTICLES.slice(0, 3).map((a, i) => (
            <Fade key={a.id} delay={i * 0.04}>
              <motion.div whileHover={{ x: 4 }} transition={springB} onClick={() => go('article')}
                className="group cursor-pointer py-6 border-b border-gray-200/60 last:border-b-0">
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{a.category}</span>
                <h3 className="text-[18px] font-semibold mt-1.5 group-hover:text-blue-600 transition-colors">{a.title_en}</h3>
              </motion.div>
            </Fade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <Fade>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s build something</h2>
          <p className="text-[18px] text-gray-400 mb-8">Currently available for product design missions.</p>
          <div className="flex gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springB}
              className="px-8 py-4 bg-gray-900 text-white rounded-full text-[16px] font-semibold flex items-center gap-2">Book a call <Calendar size={16} /></motion.button>
          </div>
        </Fade>
      </section>

      {/* Continue */}
      <section className="py-12 px-8 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ l: 'About', d: '15 years of context', p: 'about' as PageId }, { l: 'Interface Work', d: 'UI craft up close', p: 'gallery' as PageId }, { l: 'Resources', d: 'Guides and articles', p: 'blog' as PageId }].map((item, i) => (
            <motion.button key={i} whileHover={{ y: -2 }} transition={springB} onClick={() => go(item.p)}
              className="text-left p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md group transition-all">
              <p className="text-[15px] font-semibold group-hover:text-blue-600 transition-colors">{item.l}</p>
              <p className="text-[13px] text-gray-400 mt-1">{item.d}</p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

function BWork({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-28 pb-12 px-8"><div className="max-w-[800px] mx-auto">
        <Fade><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-6">Work</h1></Fade>
        <Fade delay={0.05}><p className="text-[20px] text-gray-500 leading-[1.6]">Every project here shipped. Click any to read the full story.</p></Fade>
      </div></section>
      {PROJECTS.map((p, i) => (
        <Fade key={p.id} delay={i * 0.03}>
          <section className="px-4 mb-4">
            <motion.div whileHover={{ y: -3 }} transition={springB} onClick={() => go('case')}
              className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden cursor-pointer group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all">
              <div className="overflow-hidden"><img src={p.coverImage} alt={p.title} className="w-full aspect-[21/9] object-cover group-hover:scale-[1.02] transition-transform duration-700" /></div>
              <div className="p-8 flex items-start justify-between">
                <div>
                  <h2 className="text-[22px] font-bold tracking-[-0.02em] group-hover:text-blue-600 transition-colors">{p.title}</h2>
                  <p className="text-[15px] text-gray-400 mt-1">{p.role} · {p.period}</p>
                  <p className="text-[16px] text-gray-500 mt-3 max-w-lg leading-relaxed">{p.summary}</p>
                </div>
                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
              </div>
            </motion.div>
          </section>
        </Fade>
      ))}
      <section className="py-12 px-8 border-t border-gray-100 mt-8">
        <div className="max-w-[800px] mx-auto flex gap-4">
          <motion.button whileHover={{ x: 3 }} transition={springB} onClick={() => go('gallery')} className="group flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 font-medium">Interface Work <ArrowRight size={12} /></motion.button>
          <motion.button whileHover={{ x: 3 }} transition={springB} onClick={() => go('about')} className="group flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 font-medium">About <ArrowRight size={12} /></motion.button>
        </div>
      </section>
    </div>
  );
}

function BCase({ go }: { go: (p: PageId) => void }) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const media: MediaItem[] = [...VIDEOS.slice(0, 3).map(v => ({ type: 'video' as const, src: v.src, label: v.label })), ...UI.toolkit.map((img, i) => ({ type: 'image' as const, src: img, label: `Toolkit interface ${i + 1}` }))];

  return (
    <div style={{ fontFamily: font }}>
      {/* Full-bleed hero */}
      <section className="relative min-h-[70vh] flex items-end px-4 pt-16">
        <div className="absolute inset-0 rounded-b-3xl overflow-hidden mx-4">
          <img src={PROJECTS[0].coverImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto w-full pb-12 px-4">
          <Fade>
            <button onClick={() => go('work')} className="flex items-center gap-2 text-[14px] text-white/50 hover:text-white mb-8"><ArrowLeft size={14} /> All projects</button>
          </Fade>
          <Fade delay={0.05}>
            <div className="flex items-center gap-4 text-[14px] text-white/50 mb-4">
              <span className="font-semibold text-white">{PROJECTS[0].title}</span><span>·</span><span>{TK.meta.type}</span><span>·</span><span>{TK.meta.period}</span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-white">{TK.hero.title}</h1>
          </Fade>
        </div>
      </section>

      {/* Narrative body */}
      <section className="py-20 px-8">
        <div className="max-w-[800px] mx-auto">
          <Fade><p className="text-[20px] text-gray-600 leading-[1.75] mb-16">{TK.hero.description}</p></Fade>

          <Fade><span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Overview</span></Fade>
          <Fade delay={0.03}><p className="text-[18px] text-gray-600 leading-[1.75] mb-6">{TK.overview.introP1}</p></Fade>
          <Fade delay={0.06}><p className="text-[18px] text-gray-600 leading-[1.75] mb-16">{TK.overview.introP2}</p></Fade>
        </div>
      </section>

      {/* Breakout video */}
      <Fade><div className="max-w-[1400px] mx-auto px-4 mb-16">
        <VideoHover src={VIDEOS[0].src} label={VIDEOS[0].label} onClick={() => setLbIdx(0)} />
        <div className="max-w-[800px] mx-auto mt-4"><p className="text-[13px] font-semibold text-gray-900">Toolkit: Batch editing</p><p className="text-[12px] text-gray-400">Managing multiple tasks simultaneously across construction sites.</p></div>
      </div></Fade>

      {/* Context */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto">
          <Fade><span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Context</span></Fade>
          <Fade delay={0.03}><p className="text-[18px] text-gray-600 leading-[1.75] mb-6">{TK.context.intro}</p></Fade>
        </div>
      </section>

      {/* Breakout grid */}
      <Fade><div className="max-w-[1400px] mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {UI.toolkit.slice(0, 4).map((img, i) => (
            <div key={i} className="group rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLbIdx(3 + i)}>
              <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="max-w-[800px] mx-auto mt-4 grid grid-cols-2 gap-8">
          <div><p className="text-[13px] font-semibold text-gray-900">High-contrast field UI</p><p className="text-[12px] text-gray-400">56px touch targets for gloved operation in direct sunlight.</p></div>
          <div><p className="text-[13px] font-semibold text-gray-900">Planning module</p><p className="text-[12px] text-gray-400">Drag-and-drop Gantt scheduling for non-technical managers.</p></div>
        </div>
      </div></Fade>

      {/* Design system + more phases */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto">
          <Fade><span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Design system</span></Fade>
          <Fade delay={0.03}><p className="text-[18px] text-gray-600 leading-[1.75] mb-6">{TK.designSystem.intro}</p></Fade>
        </div>
      </section>

      <Fade><div className="max-w-[1400px] mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {UI.toolkit.slice(4, 10).map((img, i) => (
            <div key={i} className="group rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLbIdx(7 + i)}>
              <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div></Fade>

      {/* Testimonial */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto">
          <Fade>
            <div className="flex gap-6"><div className="w-1 bg-gray-200 rounded-full shrink-0" />
              <div>
                <blockquote className="text-[19px] text-gray-600 leading-[1.7] italic mb-4">{TK.testimonial.quote}</blockquote>
                <p className="text-[14px]"><span className="font-semibold">{TK.testimonial.author}</span> <span className="text-gray-400">· {TK.testimonial.role}</span></p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto">
          <Fade><span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Impact</span></Fade>
          <Fade delay={0.03}><p className="text-[18px] text-gray-600 leading-[1.75] mb-8">{TK.impact.intro}</p></Fade>
          <Fade delay={0.06}>
            <div className="grid grid-cols-3 gap-6">
              <div><span className="text-3xl font-bold">{TK.impact.customers}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.customersDesc}</p></div>
              <div><span className="text-3xl font-bold">{TK.impact.seriesA}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.seriesADesc}</p></div>
              <div><span className="text-3xl font-bold">{TK.impact.enterprise}</span><p className="text-[14px] text-gray-500 mt-1">{TK.impact.enterpriseDesc}</p></div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Next project */}
      <section className="px-4 pb-8">
        <Fade>
          <motion.div whileHover={{ y: -2 }} transition={springB} onClick={() => go('case')}
            className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden cursor-pointer group relative" style={{ minHeight: '30vh' }}>
            <img src={PROJECTS[1].coverImage} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-[12px] text-white/50 font-medium mb-1">Next project</p>
              <p className="text-[24px] font-bold text-white">{PROJECTS[1].title}</p>
            </div>
          </motion.div>
        </Fade>
      </section>

      <AnimatePresence>{lbIdx !== null && <LightboxB items={media} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

function BAbout({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-28 pb-20 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-8">
            <Fade><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-10">About</h1></Fade>
            <Fade delay={0.05}><p className="text-[20px] text-gray-600 leading-[1.75] mb-6">{T.bio.p1}</p></Fade>
            <Fade delay={0.1}><p className="text-[20px] text-gray-600 leading-[1.75] mb-16">{T.bio.p2}</p></Fade>

            <Fade delay={0.15}><h2 className="text-[24px] font-bold tracking-[-0.02em] mb-8">Timeline</h2></Fade>
            {[
              { y: '2024', co: 'France VAE', role: 'Lead Product Designer', d: '100K+ users, public service.' },
              { y: '2023', co: 'Toolkit', role: 'Founding Designer', d: '0-to-1 SaaS, seed round.' },
              { y: '2018', co: 'UNOWHY / SQOOL', role: 'Product Design Manager', d: 'Team of 4, 500K+ students.' },
              { y: '2017', co: 'Dailymotion', role: 'Senior Product Designer', d: 'CBS, Bein Sports.' },
              { y: '2014', co: 'PagesJaunes', role: 'Mobile UI Lead', d: '22M users.' },
            ].map((t, i) => (
              <Fade key={i} delay={0.15 + i * 0.04}>
                <div className="flex gap-6 py-6 border-b border-gray-100 last:border-b-0">
                  <span className="text-[14px] text-gray-300 font-mono w-12 tabular-nums shrink-0">{t.y}</span>
                  <div>
                    <p className="text-[17px] font-semibold">{t.co}</p>
                    <p className="text-[15px] text-gray-400">{t.role}</p>
                    <p className="text-[15px] text-gray-500 mt-1">{t.d}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div className="md:col-span-4">
            <Fade delay={0.2}>
              <div className="md:sticky md:top-24 space-y-6">
                <div className="rounded-2xl overflow-hidden"><img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full aspect-[3/4] object-cover object-top" /></div>
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <h3 className="text-[14px] font-semibold mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind', 'Vercel', 'Linear'].map(t => <span key={t} className="text-[13px] px-3 py-1.5 rounded-full bg-white text-gray-600 border border-gray-100">{t}</span>)}
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </div>
  );
}

function BBlog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto">
          <Fade><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-4">Resources</h1></Fade>
          <Fade delay={0.05}><p className="text-[18px] text-gray-400 mb-12">{T.signals.subtitle}</p></Fade>
          <Fade delay={0.08}>
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-8 cursor-pointer group" onClick={() => go('article')}>
              <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span></div>
              <h2 className="text-[20px] font-bold group-hover:text-blue-600 transition-colors mb-2">Getting started with Claude Code</h2>
              <p className="text-[16px] text-gray-500 leading-relaxed">Complete guide for designers.</p>
            </div>
          </Fade>
          {ARTICLES.map((a, i) => (
            <Fade key={a.id} delay={0.1 + i * 0.04}>
              <motion.div whileHover={{ x: 4 }} transition={springB} onClick={() => go('article')}
                className="group cursor-pointer py-6 border-b border-gray-100 last:border-b-0">
                <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{a.category} · {a.date}</span>
                <h3 className="text-[18px] font-semibold mt-2 mb-2 group-hover:text-blue-600 transition-colors">{a.title_en}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2">{a.body_en.slice(0, 160)}...</p>
              </motion.div>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}

function BArticle({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-28 pb-8 px-8"><div className="max-w-[680px] mx-auto">
        <Fade><button onClick={() => go('blog')} className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-12"><ArrowLeft size={14} /> All articles</button></Fade>
        <Fade delay={0.03}>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">{a.category}</span>
          <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] mt-4 mb-8">{a.title_en}</h1>
        </Fade>
      </div></section>
      <article className="px-8 pb-20"><div className="max-w-[680px] mx-auto">
        {(a.body_long_en || a.body_en).split('. ').reduce((acc: string[][], s, i) => { const p = Math.floor(i / 3); if (!acc[p]) acc[p] = []; acc[p].push(s); return acc; }, []).map((ss, i) => (
          <Fade key={i} delay={i * 0.02}><p className="text-[19px] text-gray-700 leading-[1.85] mb-10">{i === 0 && <span className="text-[52px] font-bold text-gray-900 float-left mr-3 mt-2 leading-[0.78]">{ss[0][0]}</span>}{i === 0 ? ss.join('. ').slice(1) : ss.join('. ')}.</p></Fade>
        ))}
      </div></article>
      <section className="py-12 px-8 border-t border-gray-100"><div className="max-w-[680px] mx-auto flex items-center gap-4">
        <img src="/images/photos victor/image_victor_home.png" alt="" className="w-14 h-14 rounded-full object-cover" />
        <div><p className="text-[15px] font-semibold">Victor Soussan</p><p className="text-[14px] text-gray-400">Lead Product Designer · Paris</p></div>
      </div></section>
    </div>
  );
}

function BGallery({ go }: { go: (p: PageId) => void }) {
  const all = [...UI.toolkit, ...UI.scrim, ...UI.sqool];
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const media: MediaItem[] = all.map((img, i) => ({ type: 'image', src: img, label: `Interface ${i + 1}` }));
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-28 pb-8 px-8"><div className="max-w-[800px] mx-auto">
        <Fade><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></Fade>
        <Fade delay={0.05}><p className="text-[18px] text-gray-500 mb-12">Click any image to explore at full scale.</p></Fade>
      </div></section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {all.map((img, i) => (
            <Fade key={i} delay={Math.min(i * 0.02, 0.2)}>
              <div className="break-inside-avoid group cursor-pointer" onClick={() => setLbIdx(i)}>
                <div className="rounded-xl overflow-hidden bg-[#F5F5F7]"><img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" /></div>
                <p className="text-[12px] text-gray-400 mt-2 px-0.5">Interface {i + 1}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
      <AnimatePresence>{lbIdx !== null && <LightboxB items={media} startIdx={lbIdx} onClose={() => setLbIdx(null)} />}</AnimatePresence>
    </div>
  );
}

/* ═══ EXPORT ═══ */
export function SynthesisB() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <BNav page={page} go={go} />
      <div className="pt-0">
        {page === 'home' && <BHome go={go} />}
        {page === 'work' && <BWork go={go} />}
        {page === 'case' && <BCase go={go} />}
        {page === 'about' && <BAbout go={go} />}
        {page === 'blog' && <BBlog go={go} />}
        {page === 'article' && <BArticle go={go} />}
        {page === 'gallery' && <BGallery go={go} />}
      </div>
    </div>
  );
}
