'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, Play, Pause, BookOpen, PencilSimple, Compass, UsersThree, Eye } from '@phosphor-icons/react';
import { StickyLayer, SectionProgress, ContinueReading, TestimonialScroller, ExpandCollapse } from './ConceptSharedUI';

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };
const springBounce = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";

/* ═══ MEDIA ASSETS ═══ */
const VIDEOS = {
  toolkit: [
    { src: '/videos/toolkit/video_-_batch_edition.mp4', label: 'Batch editing workflow' },
    { src: '/videos/toolkit/video_-_navigation_-_show_hide.mp4', label: 'Navigation interactions' },
    { src: '/videos/toolkit/video_-_planning_-_zoom_dezoom.mp4', label: 'Planning zoom gestures' },
    { src: '/videos/toolkit/video_-_task_manipulation.mp4', label: 'Task manipulation' },
  ],
  dailymotion: [
    { src: '/videos/dailymotion/Dailymotion_-_video_manager_-_Embed_code_TOP_v6.mp4', label: 'Embed code interaction' },
    { src: '/videos/dailymotion/Geoblocking.mp4', label: 'Geoblocking controls' },
    { src: '/videos/dailymotion/video_add_subtitle.mp4', label: 'Subtitle management' },
    { src: '/videos/dailymotion/switch_12-24.mp4', label: 'Time format toggle' },
  ],
  connect: [
    { src: '/videos/connect/connect-dashboard-prototype-compressed.mp4', label: 'Dashboard prototype' },
    { src: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4', label: 'La Bulle interactions' },
  ],
  pagesjaunes: [
    { src: '/images/pagesjaunes/micro-interactions/Anim_remarketing_historique.mp4', label: 'Remarketing animation' },
    { src: '/images/pagesjaunes/micro-interactions/anim_favoris.mp4', label: 'Favorites micro-interaction' },
    { src: '/images/pj-and-app-onboarding-animation.mp4', label: 'Onboarding animation' },
  ],
  francevae: [
    { src: '/images/francevae/video-ministre-compressed.mp4', label: 'Minister presentation' },
  ],
};

const UI_IMAGES = {
  toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`),
  scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`),
  sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`),
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP, I translated the founders\' vision into a product that field managers actually want to use.', cover: '/images/thumbnail-toolkit.webp', category: 'SaaS B2B', videos: VIDEOS.toolkit, images: UI_IMAGES.toolkit,
    context: 'Toolkit is a construction management startup. When I joined, they had domain expertise but no product design. My mission: transform business requirements into a usable, sellable product from scratch.',
    sections: [
      { label: 'Context', text: 'Two weeks on active construction sites before opening Figma. The key insight: their day is structured around interruptions, not workflows.' },
      { label: 'Design System', text: 'Built a lightweight, mobile-first system: high contrast for outdoor visibility, 56px touch targets for gloves, Tailwind-ready components. 40+ components across web and mobile.' },
      { label: 'Outcome', text: 'MVP shipped in 6 months. Pilot on 3 active sites. Seed round secured on product demo. The UI system is reusable across web and mobile.' },
    ],
    deliverables: ['SaaS Platform', 'Gantt Module', 'Admin Panels', 'Brand Identity', 'Pitch Deck', 'Design System'],
  },
  { id: 'dailymotion', title: 'Dailymotion Partner', role: 'Senior Product Designer', period: '2017-2018', summary: 'Redesigning the professional video management suite used by CBS, Bein Sports, and other tier-1 media partners.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Media Tech', videos: VIDEOS.dailymotion, images: UI_IMAGES.scrim,
    context: 'Dailymotion needed a modern video management suite for enterprise partners managing thousands of videos daily.',
    sections: [
      { label: 'Challenge', text: 'Enterprise users managing 50K+ videos daily across multiple channels. The existing tools were built for individual creators, not media operations teams.' },
      { label: 'Approach', text: 'Batch operations, keyboard shortcuts for power users, real-time preview. Built the first pattern library (Sketch + Storybook) for design/dev alignment.' },
      { label: 'Outcome', text: 'Shipped live dashboard with clipping tool, batch upload system, and partner mobile app. Reduced average task completion time for bulk operations.' },
    ],
    deliverables: ['Live Dashboard', 'Batch Upload', 'Pattern Library', 'Mobile App'],
  },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'Leading the design transformation of a hardware company into an EdTech SaaS ecosystem serving 500K+ students.', cover: '/images/thumbnail-sqool-suite.webp', category: 'EdTech B2G', videos: VIDEOS.connect, images: UI_IMAGES.sqool,
    context: 'UNOWHY made tablets. They needed to become a software company. I led the design transformation across 8 applications.',
    sections: [
      { label: 'Challenge', text: 'Hardware company transitioning to SaaS. 8 applications, 4 designers to manage, 30+ developers to coordinate with. EdTech in French schools with strict accessibility requirements.' },
      { label: 'Design System', text: 'Multi-brand design system supporting 8+ apps across Web, Android, and PC. Shared libraries for icons, gestures, and device frames.' },
      { label: 'Outcome', text: '500K+ students using the ecosystem. Design team grew from 1 to 4. Standardized components reduced dev time by an estimated 30%.' },
    ],
    deliverables: ['SQOOL Classe', 'SQOOL MDM', 'Design System', 'Strategic Decks'],
  },
  { id: 'pagesjaunes', title: 'PagesJaunes', role: 'Mobile UI Lead', period: '2014-2017', summary: 'Bringing mobile-first thinking to 22M+ users across iOS, Android, and Web.', cover: '/images/thumbnail-pagesjaunes-multidevices.webp', category: 'Consumer', videos: VIDEOS.pagesjaunes, images: [],
    context: 'PagesJaunes had 22 million app downloads but the mobile experience was stuck in 2012.',
    sections: [
      { label: 'Challenge', text: 'Modernizing for 22M+ users without breaking the familiar experience. Platform fragmentation: iOS, Android, Android Wear, responsive web.' },
      { label: 'Approach', text: 'Material Design migration for Android, custom onboarding flows for iOS, and experimental Android Wear prototypes. Focus on micro-interactions and motion design.' },
      { label: 'Outcome', text: 'Unified cross-platform design language. New onboarding reduced bounce rate. Android Wear prototype shipped as internal innovation showcase.' },
    ],
    deliverables: ['iOS/Android Apps', 'Onboarding', 'Wearable Prototype', 'Search UI'],
  },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'Structuring product ops for a national public service scaling to 100K+ candidates.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'GovTech', videos: VIDEOS.francevae, images: [],
    context: 'Beta.gouv startup d\'État serving 100K+ candidates for professional certification.',
    sections: [
      { label: 'Mission', text: '6-month engagement: co-designed prioritization matrix with Lead PM, led 10 user interviews, organized 2-day design thinking workshop, restructured Figma architecture.' },
      { label: 'Outcome', text: 'VAE Collective MVP shipped. Employer journey redesigned. Seasonal delivery process adopted across the team.' },
    ],
    deliverables: ['VAE Collective MVP', 'Research Protocol', 'Design Ops', 'Promo Video'],
  },
];

const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys." },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
];

const PILLARS = [
  { icon: PencilSimple, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, rapid MVP development. I work in the tool, not just around it.' },
  { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops. Framing the problem before solving it.' },
  { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, dev handoff rituals, team management. Building practices that survive the people who create them.' },
];

const RESOURCES = [
  { id: 'guide-claude-code', type: 'guide' as const, title: 'Getting started with Claude Code', desc: 'Complete guide for designers: installation to deployment.', chapters: 9, cover: '/images/guide-claude-code/hero-cover.png' },
  { id: 'ai-design-workflows', type: 'article' as const, title: 'AI-assisted design workflows', desc: 'How AI changes the way designers prototype and ship.' },
  { id: 'design-system-figma', type: 'article' as const, title: 'Design System with Claude Code', desc: 'Figma to code with zero drift.' },
];

const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'gallery';
type MediaItem = { type: 'video'; src: string; label: string } | { type: 'image'; src: string; label: string };

/* ═══ COMPONENTS ═══ */

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay, ...spring }} className={className}>{children}</motion.div>;
}

/* ── Video player with hover-to-play ── */
function VideoCard({ src, label, onClick, large = false }: { src: string; label: string; onClick?: (e?: any) => void; large?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div whileHover={{ y: large ? -4 : -2 }} transition={springBounce}
      className={`group relative ${large ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden bg-[#F5F5F7] cursor-pointer`}
      onMouseEnter={() => { videoRef.current?.play(); setPlaying(true); }}
      onMouseLeave={() => { videoRef.current?.pause(); setPlaying(false); }}
      onClick={onClick}>
      <video ref={videoRef} src={src} muted loop playsInline preload="metadata"
        className={`w-full ${large ? '' : 'aspect-video'} object-cover transition-transform duration-500 group-hover:scale-[1.02]`} />
      <AnimatePresence>
        {!playing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Play size={18} weight="fill" className="text-gray-900 ml-0.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[13px] text-white font-medium" style={{ fontFamily: font }}>{label}</p>
      </div>
    </motion.div>
  );
}

/* ── Multi-media Lightbox with navigation ── */
function MediaLightbox({ items, startIdx, onClose }: { items: MediaItem[]; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const item = items[idx];
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(items.length - 1, i + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center" onClick={onClose}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10" onClick={e => e.stopPropagation()}>
        <p className="text-[14px] text-white/60 font-medium" style={{ fontFamily: font }}>{item.label}</p>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-white/40 font-mono tabular-nums">{idx + 1} / {items.length}</span>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors"><X size={20} /></button>
        </div>
      </div>

      {/* Media */}
      <div className="flex items-center gap-4 max-w-[95vw] w-full justify-center" onClick={e => e.stopPropagation()}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prev} disabled={idx === 0}
          className="p-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors shrink-0"><ArrowLeft size={24} /></motion.button>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
            className="max-w-[85vw] max-h-[80vh]">
            {item.type === 'video' ? (
              <video src={item.src} autoPlay loop muted playsInline className="max-w-full max-h-[80vh] rounded-xl" />
            ) : (
              <img src={item.src} alt={item.label} className="max-w-full max-h-[80vh] rounded-xl object-contain" />
            )}
          </motion.div>
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={next} disabled={idx === items.length - 1}
          className="p-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors shrink-0"><ArrowRight size={24} /></motion.button>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 scrollbar-hide" onClick={e => e.stopPropagation()}>
        {items.map((it, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`w-16 h-10 rounded-lg overflow-hidden shrink-0 transition-all ${i === idx ? 'ring-2 ring-white opacity-100' : 'opacity-40 hover:opacity-70'}`}>
            {it.type === 'video' ? (
              <video src={it.src} muted preload="metadata" className="w-full h-full object-cover" />
            ) : (
              <img src={it.src} alt="" className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Sticky Nav ── */
function Nav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80));
  const titles: Record<PageId, string> = { home: '', work: 'Work', case: 'Case Study', about: 'About', blog: 'Resources', gallery: 'Interface Work' };
  const tabs: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' }, { id: 'work', label: 'Work' }, { id: 'case', label: 'Case Study' },
    { id: 'about', label: 'About' }, { id: 'blog', label: 'Resources' }, { id: 'gallery', label: 'Interface Work' },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
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

/* ── Scroll-triggered surprise module ── */
function SurpriseModule({ triggerY = 3000 }: { triggerY?: number }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => { if (!dismissed) setShow(v > triggerY && v < triggerY + 1000); });
  if (dismissed) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, x: -20, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20 }} transition={springBounce}
          className="fixed left-6 top-1/3 z-[75] max-w-[240px] p-4 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-900/10">
          <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500"><X size={14} /></button>
          <p className="text-[14px] text-gray-700 font-medium leading-snug pr-4" style={{ fontFamily: font }}>I also wrote a 9-chapter guide on Claude Code for designers.</p>
          <p className="mt-2 text-[13px] text-blue-600 font-semibold flex items-center gap-1" style={{ fontFamily: font }}>Read the guide <ArrowRight size={12} /></p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════════════════ */
function Home({ go }: { go: (p: PageId) => void }) {
  const allMedia: MediaItem[] = [
    ...VIDEOS.toolkit.map(v => ({ type: 'video' as const, src: v.src, label: `Toolkit: ${v.label}` })),
    ...VIDEOS.dailymotion.slice(0, 2).map(v => ({ type: 'video' as const, src: v.src, label: `Dailymotion: ${v.label}` })),
  ];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="min-h-[90dvh] flex items-center px-6 pt-14">
        <div className="max-w-[1400px] mx-auto w-full py-16">
          <div className="max-w-[700px]">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[14px] text-emerald-700 font-medium">Available for new projects</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-8">
                Products in<br />motion<span className="text-gray-300">.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-[20px] text-gray-500 leading-[1.65] mb-10 max-w-[560px]">
                Lead Product Designer, 15 years. I design interfaces that work on construction sites, in classrooms, in newsrooms, and in living rooms. Every product here shipped.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="flex gap-3 flex-wrap">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce} onClick={() => go('work')}
                  className="group px-8 py-4 bg-gray-900 text-white rounded-full text-[16px] font-semibold flex items-center gap-2">
                  View work <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce} onClick={() => go('about')}
                  className="px-8 py-4 rounded-full text-[16px] text-gray-500 border border-gray-200 hover:border-gray-300 font-medium">About me</motion.button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Hero video: full-bleed autoplay */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-4">
          <VideoCard src={VIDEOS.toolkit[0].src} label={VIDEOS.toolkit[0].label} large onClick={() => setLightboxIdx(0)} />
        </div>
      </FadeUp>

      {/* Projects with video previews */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-6">Selected work</h2>
            <p className="text-[18px] text-gray-400 mb-16 max-w-lg">Each project below includes live video demos of the shipped interfaces.</p>
          </FadeUp>
          <div className="space-y-16">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <FadeUp key={p.id} delay={0.05}>
                <div className="group cursor-pointer" onClick={() => go('case')}>
                  <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
                    <div className="flex-1 min-w-0 py-2">
                      <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-3">{p.category} · {p.period}</span>
                      <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.03em] mb-3 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                      <p className="text-[14px] text-gray-400 mb-3">{p.role}</p>
                      <p className="text-[17px] text-gray-500 leading-relaxed max-w-lg">{p.summary}</p>
                      <div className="mt-4 flex items-center gap-2 text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        View case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      {p.videos.length > 0 ? (
                        <VideoCard src={p.videos[0].src} label={p.videos[0].label} large />
                      ) : (
                        <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
                          <img src={p.cover} alt={p.title} className="w-full group-hover:scale-[1.02] transition-transform duration-700" />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Video thumbnail strip */}
                  {p.videos.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {p.videos.slice(1).map((v, vi) => (
                        <div key={vi} className="min-w-[200px] max-w-[280px] shrink-0">
                          <VideoCard src={v.src} label={v.label} onClick={(e: any) => { e?.stopPropagation(); }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <div className="mt-12 text-center">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springBounce} onClick={() => go('work')}
                className="text-[15px] text-gray-400 hover:text-gray-900 font-medium inline-flex items-center gap-2 transition-colors">
                View all projects <ArrowRight size={14} />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Full-width video strip */}
      <section className="py-8">
        <div className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x scrollbar-hide">
          {[...VIDEOS.dailymotion, ...VIDEOS.connect].map((v, i) => (
            <div key={i} className="min-w-[350px] md:min-w-[500px] shrink-0 snap-start">
              <VideoCard src={v.src} label={v.label} onClick={() => setLightboxIdx(VIDEOS.toolkit.length + i)} />
            </div>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -3 }} transition={springBounce}
                  className="p-8 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all">
                  <pillar.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-3">{pillar.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <TestimonialScroller testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Resources */}
      <section className="py-24 px-6 bg-gray-50/30">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Resources</h2>
              <motion.button whileHover={{ x: 2 }} transition={springBounce} onClick={() => go('blog')}
                className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">All <ArrowRight size={12} /></motion.button>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RESOURCES.map((r, i) => (
              <FadeUp key={r.id} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('blog')}
                  className="group cursor-pointer p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all h-full">
                  {r.cover && <img src={r.cover} alt="" className="w-full aspect-[16/10] rounded-lg object-cover mb-4 group-hover:scale-[1.02] transition-transform" />}
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={13} className="text-gray-400" />
                    <span className="text-[11px] text-gray-400 font-mono uppercase">{r.type}{r.chapters ? ` · ${r.chapters} ch.` : ''}</span>
                  </div>
                  <h3 className="text-[16px] font-semibold group-hover:text-blue-600 transition-colors">{r.title}</h3>
                  <p className="text-[14px] text-gray-400 mt-1">{r.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeUp>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
            <p className="text-[18px] text-gray-400 mb-8">Currently available for product design missions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-8 py-4 bg-gray-900 text-white rounded-full text-[16px] font-semibold flex items-center justify-center gap-2">Book a call <Calendar size={18} /></motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-8 py-4 rounded-full text-[16px] text-gray-500 border border-gray-200 flex items-center justify-center gap-2">Email me <Envelope size={18} /></motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContinueReading items={[
        { label: 'All projects', desc: 'Case studies with video demos', image: PROJECTS[1].cover, onClick: () => go('work') },
        { label: 'Interface Work', desc: '100+ UI screens up close', image: UI_IMAGES.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years of context', onClick: () => go('about') },
      ]} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && <MediaLightbox items={allMedia} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ═══ CASE STUDY (with multiple projects) ═══ */
function CaseStudy({ go, projectIdx = 0 }: { go: (p: PageId) => void; projectIdx?: number }) {
  const p = PROJECTS[projectIdx];
  const allMedia: MediaItem[] = [
    ...p.videos.map(v => ({ type: 'video' as const, src: v.src, label: v.label })),
    ...p.images.map((img, i) => ({ type: 'image' as const, src: img, label: `Interface detail ${i + 1}` })),
  ];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const sectionNames = ['Context', ...p.sections.map(s => s.label), 'Media', 'Deliverables'];

  return (
    <div style={{ fontFamily: font }}>
      <SectionProgress sections={sectionNames} />

      {/* Header */}
      <section className="pt-20 pb-12 px-6" id="cs-section-0">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('work')}
              className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-10 transition-colors">
              <ArrowLeft size={14} /> All projects
            </motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <div className="flex items-center gap-6 text-[14px] text-gray-400 mb-6">
              <span className="font-semibold text-gray-900">{p.title}</span><span>·</span><span>{p.role}</span><span>·</span><span>{p.period}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-6">{p.summary}</h1>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="text-[18px] text-gray-500 leading-[1.75]">{p.context}</p>
          </FadeUp>
        </div>
      </section>

      {/* Hero video */}
      {p.videos.length > 0 && (
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4 mb-16">
            <VideoCard src={p.videos[0].src} label={p.videos[0].label} large onClick={() => setLightboxIdx(0)} />
          </div>
        </FadeUp>
      )}

      {/* Narrative sections */}
      {p.sections.map((s, i) => (
        <section key={i} className="py-16 px-6" id={`cs-section-${i + 1}`}>
          <div className="max-w-[800px] mx-auto">
            <FadeUp>
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">{s.label}</span>
              <p className="text-[18px] text-gray-600 leading-[1.75]">{s.text}</p>
            </FadeUp>
          </div>
          {/* Breakout visual after each section */}
          {(p.images.length > i * 2 || p.videos.length > i + 1) && (
            <FadeUp>
              <div className="max-w-[1400px] mx-auto px-4 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {p.videos[i + 1] && <VideoCard src={p.videos[i + 1].src} label={p.videos[i + 1].label} onClick={() => setLightboxIdx(i + 1)} />}
                  {p.images[i * 2] && (
                    <div className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer group" onClick={() => setLightboxIdx(p.videos.length + i * 2)}>
                      <img src={p.images[i * 2]} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          )}
        </section>
      ))}

      {/* Full media gallery */}
      <section className="py-16 px-6" id={`cs-section-${p.sections.length + 1}`}>
        <div className="max-w-[800px] mx-auto mb-8">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">All media</span>
            <p className="text-[18px] text-gray-500 leading-[1.75]">Videos and interface screenshots from the project. Click any to explore in detail.</p>
          </FadeUp>
        </div>
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allMedia.map((m, i) => (
                <div key={i} className="cursor-pointer group" onClick={() => setLightboxIdx(i)}>
                  {m.type === 'video' ? (
                    <VideoCard src={m.src} label={m.label} />
                  ) : (
                    <div className="rounded-xl overflow-hidden bg-[#F5F5F7]">
                      <img src={m.src} alt={m.label} className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Deliverables */}
      <section className="py-16 px-6" id={`cs-section-${p.sections.length + 2}`}>
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Deliverables</span>
            <div className="flex flex-wrap gap-2">
              {p.deliverables.map(d => <span key={d} className="px-4 py-2 rounded-full bg-gray-50 text-[14px] text-gray-600 border border-gray-100 font-medium">{d}</span>)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Testimonial */}
      {TESTIMONIALS[0] && (
        <section className="py-16 px-6">
          <div className="max-w-[800px] mx-auto">
            <FadeUp>
              <div className="flex gap-6">
                <div className="w-1 bg-gray-200 rounded-full shrink-0" />
                <div>
                  <blockquote className="text-[18px] text-gray-600 leading-[1.7] italic mb-4">{TESTIMONIALS[0].content}</blockquote>
                  <p className="text-[14px]"><span className="font-semibold">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Project navigator */}
      <div className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.filter((_, i) => i !== projectIdx).slice(0, 2).map((np, i) => (
            <motion.div key={np.id} whileHover={{ y: -2 }} transition={springBounce} onClick={() => go('case')}
              className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md cursor-pointer group transition-all">
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                {np.videos.length > 0 ? (
                  <video src={np.videos[0].src} muted preload="metadata" className="w-full h-full object-cover" />
                ) : (
                  <img src={np.cover} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">{i === 0 ? 'Next project' : 'Also'}</p>
                <p className="text-[15px] font-semibold group-hover:text-blue-600 transition-colors">{np.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ContinueReading items={[
        { label: 'All projects', desc: 'Browse work', image: PROJECTS[1].cover, onClick: () => go('work') },
        { label: 'Interface Work', desc: 'UI at full scale', image: UI_IMAGES.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
      ]} />

      <AnimatePresence>
        {lightboxIdx !== null && <MediaLightbox items={allMedia} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ═══ WORK PAGE ═══ */
function Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-4">Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[20px] text-gray-400 mb-16 max-w-lg">Products shipped with video demos of the live interfaces.</p></FadeUp>
        </div>
      </section>
      {PROJECTS.map((p, i) => (
        <FadeUp key={p.id} delay={i * 0.04}>
          <section className="px-6 pb-16">
            <div className="max-w-[1400px] mx-auto" onClick={() => go('case')}>
              <div className="flex items-baseline gap-4 mb-3">
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] hover:text-blue-600 transition-colors cursor-pointer">{p.title}</h2>
                <span className="text-[13px] text-gray-300 font-mono">{p.period}</span>
                <span className="text-[13px] text-gray-400">{p.category}</span>
              </div>
              <p className="text-[16px] text-gray-500 mb-6 max-w-lg">{p.summary}</p>
              {p.videos.length > 0 ? (
                <VideoCard src={p.videos[0].src} label={p.videos[0].label} large />
              ) : (
                <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] cursor-pointer">
                  <img src={p.cover} alt={p.title} className="w-full hover:scale-[1.01] transition-transform duration-700" />
                </div>
              )}
            </div>
          </section>
        </FadeUp>
      ))}
      <ContinueReading items={[
        { label: 'Interface Work', desc: '100+ UI screens', image: UI_IMAGES.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

/* ═══ ABOUT ═══ */
function About({ go }: { go: (p: PageId) => void }) {
  const timeline = [
    { year: '2025', company: 'Condamine Studio', role: 'Independent', desc: 'AI-assisted design, 50+ web apps' },
    { year: '2024', company: 'France VAE / Beta.gouv', role: 'Lead Product Designer', desc: '100K+ users, public service' },
    { year: '2023', company: 'Toolkit', role: 'Founding Designer', desc: '0-to-1 SaaS, seed round' },
    { year: '2018', company: 'UNOWHY / SQOOL', role: 'Product Design Manager', desc: 'Team of 4, 500K+ students' },
    { year: '2017', company: 'Dailymotion', role: 'Senior Product Designer', desc: 'CBS, Bein Sports' },
    { year: '2014', company: 'PagesJaunes', role: 'Mobile UI Lead', desc: '22M users' },
  ];
  const tools = ['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Linear', 'Notion'];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-8">About</h1></FadeUp>
            <FadeUp delay={0.05}>
              <ExpandCollapse
                preview="I started in tech 15 years ago as a visual designer at a small Parisian agency. Today I work as a Lead Product Designer on complex B2B and B2G interfaces."
                full="I started in tech 15 years ago as a visual designer at a small Parisian agency, making websites for luxury brands. Today I work as a Lead Product Designer on complex B2B and B2G interfaces: SaaS platforms, EdTech ecosystems, public service digital products.\n\nMy current focus is on AI-assisted design workflows. I use Claude Code daily and have published a 9-chapter guide on the subject. I believe the best product design is invisible: it makes the user feel competent, not impressed.\n\nBased in Paris. French and English."
              />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-16 mb-8">Timeline</h2>
              {timeline.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, ...spring }}
                  className="flex gap-5 py-5 border-b border-gray-100 last:border-b-0 group">
                  <span className="text-[13px] text-gray-300 font-mono w-10 tabular-nums shrink-0">{t.year}</span>
                  <div>
                    <p className="text-[16px] font-semibold group-hover:text-blue-600 transition-colors">{t.company}</p>
                    <p className="text-[14px] text-gray-400">{t.role}</p>
                    <p className="text-[14px] text-gray-500 mt-1">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </FadeUp>
          </div>
          <div className="md:col-span-5">
            <FadeUp delay={0.15}>
              <div className="md:sticky md:top-20 space-y-6">
                <div className="rounded-2xl overflow-hidden bg-gray-50">
                  <img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full aspect-[3/4] object-cover object-top" />
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <h3 className="text-[14px] font-semibold mb-4">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map(t => <span key={t} className="text-[13px] px-3 py-1.5 rounded-full bg-white text-gray-600 border border-gray-100">{t}</span>)}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <h3 className="text-[14px] font-semibold mb-3">Companies</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {LOGOS.map(n => <span key={n} className="text-[13px] text-gray-400">{n}</span>)}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <ContinueReading items={[
        { label: 'Work', desc: 'Case studies with video', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
        { label: 'Interface Work', desc: 'UI at full scale', onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ BLOG ═══ */
function Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-12">Resources</h1></FadeUp>
          {RESOURCES.map((r, i) => (
            <FadeUp key={r.id} delay={i * 0.05}>
              <motion.div whileHover={{ x: 3 }} transition={springBounce}
                className="group cursor-pointer py-6 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-gray-400" />
                  <span className="text-[12px] text-gray-400 font-mono uppercase">{r.type}{r.chapters ? ` · ${r.chapters} ch.` : ''}</span>
                </div>
                <h2 className="text-[20px] font-bold tracking-[-0.02em] group-hover:text-blue-600 transition-colors mb-2">{r.title}</h2>
                <p className="text-[16px] text-gray-500 leading-relaxed">{r.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>
      <ContinueReading items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'About', desc: 'My approach', onClick: () => go('about') },
        { label: 'Interface Work', desc: 'UI craft', onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ GALLERY ═══ */
function Gallery({ go }: { go: (p: PageId) => void }) {
  const allImages = [...UI_IMAGES.toolkit, ...UI_IMAGES.scrim, ...UI_IMAGES.sqool];
  const allVideos = [...VIDEOS.toolkit, ...VIDEOS.dailymotion.slice(0, 2)];
  const allMedia: MediaItem[] = [
    ...allVideos.map(v => ({ type: 'video' as const, src: v.src, label: v.label })),
    ...allImages.map((img, i) => ({ type: 'image' as const, src: img, label: `Interface ${i + 1}` })),
  ];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[20px] text-gray-500 mb-16 max-w-lg">Videos and screenshots. Click any to explore in full screen with keyboard navigation.</p></FadeUp>
        </div>
      </section>

      {/* Videos section */}
      <section className="px-6 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6">Video demos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allVideos.map((v, i) => (
              <FadeUp key={i} delay={Math.min(i * 0.04, 0.2)}>
                <VideoCard src={v.src} label={v.label} onClick={() => setLightboxIdx(i)} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Images section */}
      <section className="px-6 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-6">Interface screenshots</p>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
            {allImages.map((img, i) => (
              <FadeUp key={i} delay={Math.min(i * 0.02, 0.2)}>
                <div className="break-inside-avoid rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer group" onClick={() => setLightboxIdx(allVideos.length + i)}>
                  <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <ContinueReading items={[
        { label: 'Work', desc: 'Full case studies', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'About', desc: 'Background', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides', onClick: () => go('blog') },
      ]} />

      <AnimatePresence>
        {lightboxIdx !== null && <MediaLightbox items={allMedia} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ═══ EXPORT ═══ */
export function VariantMotion() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <Home go={go} />}
      {page === 'work' && <Work go={go} />}
      {page === 'case' && <CaseStudy go={go} />}
      {page === 'about' && <About go={go} />}
      {page === 'blog' && <Blog go={go} />}
      {page === 'gallery' && <Gallery go={go} />}
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
      <SurpriseModule />
    </div>
  );
}
