'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  PencilSimple,
  Compass,
  UsersThree,
  Quotes,
  Envelope,
  Command,
  Sparkle,
  BookOpen,
  Article,
  Layout,
  CaretRight
} from '@phosphor-icons/react';
import { StickyLayer } from './ConceptSharedUI';

/* ═══════════════════════════════════════════════════════════════
   SHARED DATA
   ═══════════════════════════════════════════════════════════════ */
const HERO = {
  title: 'Lead Product Designer',
  desc: '15 years in tech, 10 in product design. I help teams frame the problem, materialize the product vision through prototypes, and ship in short cycles.',
  availability: 'Available for new projects',
  positioning: 'SaaS B2B & B2G, complex interfaces, Design Systems, AI-driven prototyping',
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP.', cover: '/images/thumbnail-toolkit.webp', category: 'SaaS Platform', format: 'case-study' },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'National platform for professional certification, 100K+ candidates.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'Public Service', format: 'case-study' },
  { id: 'dailymotion', title: 'Dailymotion Partner', role: 'Senior Product Designer', period: '2017-2018', summary: 'Redesigning the professional video management suite for tier-1 media partners.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Media Tech', format: 'case-study' },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'EdTech ecosystem for 500K+ students. Hardware to SaaS transformation.', cover: '/images/thumbnail-sqool-suite.webp', category: 'EdTech B2G', format: 'case-study' },
];

const PILLARS = [
  { icon: PencilSimple, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, and rapid MVP development.' },
  { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops.' },
  { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, dev handoff rituals, team management.' },
];

const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys that users actually understand and love." },
];

const RESOURCES = [
  { id: 'guide-claude-code', type: 'guide' as const, title: 'Getting started with Claude Code', desc: 'Complete guide for designers: from installation to deployment.', chapters: 9, cover: '/images/guide-claude-code/hero-cover.png' },
  { id: 'ai-design-workflows', type: 'article' as const, title: 'AI-assisted design workflows', desc: 'How AI changes the way designers prototype, test, and ship.' },
];

const CASE_DEEP = {
  context: 'Toolkit is a construction management platform born from a simple observation: site managers still coordinate multi-million euro projects with spreadsheets and paper plans.',
  challenge: 'Three forces shaped every design decision. First, users who work with gloves in direct sunlight. Second, intermittent connectivity. Third, competing against established players.',
  outcomes: ['MVP shipped in 6 months', 'Pilot on 3 active sites', 'Seed round secured', 'UI system reusable across web and mobile'],
  deliverables: ['SaaS Platform', 'Gantt Module', 'Design System'],
};

const ABOUT_DEEP = {
  intro: 'I started in tech 15 years ago as a visual designer at a small Parisian agency, making websites for luxury brands. Today I work as a Lead Product Designer on complex B2B and B2G interfaces.',
  location: 'Based in Paris. French and English, on-site or remote.',
  experience: [
    { role: 'Lead Product Designer', company: 'France VAE (Beta.gouv)', period: '2024-2025', desc: 'Product ops for a national public service scaling to 100K+ candidates.' },
    { role: 'Founding Designer', company: 'Toolkit', period: '2023-2024', desc: '0-to-1 construction tech SaaS. From field research to shipped MVP.' },
  ]
};

const GALLERY_DATA = [
  { project: 'SCRIM', items: ['/images/visuels UI/100_1_5x.webp', '/images/visuels UI/101_1_5x.webp'] },
  { project: 'Toolkit', items: ['/images/visuels UI/1100_1_5x.webp', '/images/visuels UI/1101_1_5x.webp'] },
];

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILITIES
   ═══════════════════════════════════════════════════════════════ */
type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'gallery';

function usePageNav() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };
  return { page, go };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ type: 'spring', stiffness: 280, damping: 28, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* ═══════════════════════════════════════════════════════════════
   V26 COMPONENTS (Apple Soft Glass)
   ═══════════════════════════════════════════════════════════════ */
const glassHeaderClass = "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 rounded-full bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] max-w-[calc(100vw-2rem)] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";
const glassCardClass = "bg-white/50 w-full backdrop-blur-2xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[32px] overflow-hidden relative";
const glassButtonClass = "px-5 py-2 rounded-2xl bg-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] text-[14px] font-semibold text-gray-900 border border-white/80 hover:bg-white transition-all";
const glassNavBtnActive = "px-4 py-1.5 rounded-full bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[13px] font-medium text-gray-900 border border-white/80 shrink-0 whitespace-nowrap";
const glassNavBtnIdle = "px-4 py-1.5 rounded-full text-[13px] font-medium text-gray-600 hover:bg-white/40 transition-colors shrink-0 whitespace-nowrap";

function V26Nav({ page, go }: { page: PageId, go: (p: PageId) => void }) {
  return (
    <nav className={glassHeaderClass}>
      <span className="px-4 text-[14px] font-semibold text-gray-900 mr-1 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
        <Command size={14} weight="bold" /> VS
      </span>
      {(['home', 'work', 'gallery', 'case', 'about', 'blog'] as PageId[]).map((p) => (
        <button key={p} onClick={() => go(p)} className={page === p ? glassNavBtnActive : glassNavBtnIdle}>
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </nav>
  );
}

function V26Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-50/50 blur-[120px]" />
      <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-50/30 blur-[120px]" />
    </div>
  );
}

function V26Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div className="relative z-10 pt-32 pb-32 px-6 max-w-[1080px] mx-auto space-y-8">
      <FadeIn>
        <div className={`${glassCardClass} p-10 md:p-16 rounded-[40px]`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[12px] font-medium text-green-700">{HERO.availability}</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 mb-6 max-w-2xl break-words hyphens-auto">
            Designing products with clarity and depth.
          </h1>
          <p className="text-[19px] leading-relaxed text-gray-600 max-w-[600px] font-medium mb-10">{HERO.desc}</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => go('work')} className="px-6 py-3.5 bg-gray-900 text-white rounded-2xl text-[15px] font-semibold flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform">
              Explore Work <ArrowRight weight="bold" size={16} />
            </button>
            <button onClick={() => go('about')} className={glassButtonClass}>About Me</button>
          </div>
        </div>
      </FadeIn>
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <FadeIn delay={0.1}>
            <div onClick={() => go('case')} className={`${glassCardClass} group w-full h-[400px] md:h-[500px] cursor-pointer flex flex-col justify-between p-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500`}>
              <img src={PROJECTS[0].cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[13px] font-medium border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">{PROJECTS[0].category}</span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex justify-center items-center border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight weight="bold" size={16}/></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2">{PROJECTS[0].title}</h3>
                <p className="text-white/80 text-[15px] max-w-md font-medium">{PROJECTS[0].summary}</p>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-4 flex flex-col gap-8">
          <FadeIn delay={0.2} className="h-full">
            <div className={`${glassCardClass} h-full p-8 flex flex-col justify-center`}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-[0_8px_16px_rgba(59,130,246,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] mb-6"><Sparkle weight="fill" size={24} /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Core Expertise</h3>
              <div className="space-y-4">
                {PILLARS.slice(0, 2).map((p, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><p.icon size={12} weight="bold" /></div>
                    <div><p className="text-[14px] font-semibold text-gray-900">{p.title}</p><p className="text-[13px] text-gray-500 leading-snug">{p.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function V26Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div className="relative z-10 pt-32 pb-32 px-6 max-w-[1080px] mx-auto space-y-8">
      <FadeIn>
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Selected Work</h1>
          <p className="text-[18px] text-gray-500 mt-4 font-medium">Projects shipped from 2017 to today.</p>
        </div>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.1}>
            <div onClick={() => go('case')} className={`${glassCardClass} group w-full h-[320px] md:h-[400px] cursor-pointer flex p-4 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500`}>
              <div className="absolute inset-4 rounded-[24px] overflow-hidden bg-gray-100 pointer-events-none">
                 <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[17px] font-bold text-gray-900">{p.title}</h3>
                  <ArrowUpRight size={16} className="text-gray-400 group-hover:text-gray-900" />
                </div>
                <p className="text-[13px] text-gray-500 font-medium truncate">{p.category} · {p.role}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function V26Case({ go }: { go: (p: PageId) => void }) {
  return (
    <div className="relative z-10 pt-32 pb-32 px-6 max-w-[900px] mx-auto space-y-8">
      <FadeIn>
        <button onClick={() => go('work')} className="text-[14px] text-gray-500 hover:text-gray-900 mb-8 flex items-center gap-1.5 font-medium">
          <ArrowRight size={14} className="rotate-180" /> Back to work
        </button>
        <div className={`${glassCardClass} rounded-[40px] p-8 md:p-12 mb-10`}>
          <div className="rounded-[24px] overflow-hidden bg-gray-100 mb-10 shadow-[inner_0_2px_10px_rgba(0,0,0,0.05)]">
            <img src={PROJECTS[0].cover} alt="" className="w-full aspect-video object-cover" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 break-words">{PROJECTS[0].title}</h1>
          <p className="text-[19px] text-gray-600 font-medium leading-relaxed mb-8 break-words">{CASE_DEEP.context}</p>
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-200/50">
            <div>
              <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-3">Challenge</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">{CASE_DEEP.challenge}</p>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-3">Outcomes</h3>
              <ul className="space-y-2">
                {CASE_DEEP.outcomes.map(o => (
                  <li key={o} className="flex items-center gap-2 text-[15px] text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" />{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function V26About({ go }: { go: (p: PageId) => void }) {
  return (
    <div className="relative z-10 pt-32 pb-32 px-6 max-w-[1080px] mx-auto">
      <div className="grid md:grid-cols-[300px_1fr] gap-10">
        <FadeIn>
          <div className="sticky top-32">
            <div className={`${glassCardClass} p-4 rounded-[36px] aspect-square flex items-center justify-center flex-col`}>
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 shadow-inner" />
              <button onClick={() => go('work')} className={glassButtonClass + " w-full mt-4"}>Contact Me</button>
            </div>
          </div>
        </FadeIn>
        <div className="space-y-8">
          <FadeIn delay={0.1}>
            <div className={`${glassCardClass} p-10 md:p-12 rounded-[40px]`}>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight break-words">About</h1>
              <p className="text-[18px] text-gray-600 font-medium leading-relaxed mb-10 break-words">{ABOUT_DEEP.intro}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-10">Experience</h3>
              <div className="space-y-4">
                {ABOUT_DEEP.experience.map((exp, i) => (
                   <div key={i} className="p-5 rounded-2xl bg-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-white/50">
                     <div className="flex justify-between items-start mb-2">
                       <h4 className="text-[16px] font-bold text-gray-900">{exp.role}</h4>
                       <span className="text-[13px] font-medium text-gray-500 bg-gray-100/50 px-2 py-1 rounded-md">{exp.period}</span>
                     </div>
                     <p className="text-[14px] text-gray-600 font-medium">{exp.company}</p>
                     <p className="text-[14px] text-gray-500 mt-2">{exp.desc}</p>
                   </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function V26Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div className="relative z-10 pt-32 pb-32 px-6 max-w-[1080px] mx-auto space-y-8">
      <FadeIn>
        <div className="mb-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight break-words">Resources</h1>
          <p className="text-[18px] text-gray-500 mt-4 font-medium break-words">Guides and articles on design and AI.</p>
        </div>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-8">
        {RESOURCES.map((r, i) => (
          <FadeIn key={r.id} delay={i * 0.1}>
            <div className={`${glassCardClass} p-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all cursor-pointer`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-xl bg-blue-100 text-blue-600 shadow-sm"><BookOpen size={16} weight="bold" /></span>
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{r.type}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-[15px] text-gray-500 font-medium">{r.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function V26Gallery({ go }: { go: (p: PageId) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <div className="relative z-10 pt-32 pb-32 px-6 max-w-[1080px] mx-auto space-y-8">
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white/60 backdrop-blur-3xl flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
            <motion.img src={lightbox} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
      <FadeIn>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8 break-words">Visual Gallery</h1>
      </FadeIn>
      <div className="space-y-12">
        {GALLERY_DATA.map((group, gi) => (
          <FadeIn key={group.project} delay={0.1 * gi}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 px-2">{group.project}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {group.items.map((src, i) => (
                <div key={src} onClick={() => setLightbox(src)} className={`${glassCardClass} p-2 cursor-zoom-in group hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-shadow`}>
                   <div className="rounded-[24px] overflow-hidden bg-gray-100">
                     <img src={src} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                   </div>
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function V26() {
  const { page, go } = usePageNav();
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1D1D1F] overflow-x-hidden selection:bg-blue-200 w-full" style={{ fontFamily }}>
      <V26Background />
      <V26Nav page={page} go={go} />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          {page === 'home' && <V26Home go={go} />}
          {page === 'work' && <V26Work go={go} />}
          {page === 'case' && <V26Case go={go} />}
          {page === 'about' && <V26About go={go} />}
          {page === 'blog' && <V26Blog go={go} />}
          {page === 'gallery' && <V26Gallery go={go} />}
        </motion.div>
      </AnimatePresence>
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V27 COMPONENTS (Modular Skeuo / CleanMyMac / Bento)
   ═══════════════════════════════════════════════════════════════ */
const bentoPageClass = "min-h-screen bg-[#FDFDFE] text-[#1E2022] overflow-x-hidden";
const bentoTileOuter = "rounded-[32px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,1)] border border-[#EBECEF] relative overflow-hidden group";
const bentoTileInner = "rounded-[32px] bg-[#F4F5F7] shadow-[inset_0_2px_5px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,1)] border border-[#EBECEF]/50 relative overflow-hidden";

function V27Nav({ page, go }: { page: PageId, go: (p: PageId) => void }) {
  return (
    <nav className="relative z-50 flex justify-center pt-8">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1240px] px-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_-2px_6px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center border border-gray-100">
            <Command size={20} weight="bold" className="text-gray-700" />
          </div>
          <span className="font-bold text-[16px] text-gray-800 tracking-tight">Victor Soussan</span>
        </div>
        <div className="flex gap-2 p-1.5 bg-[#F4F5F7] rounded-[20px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,1)] overflow-x-auto">
           {(['home', 'work', 'gallery', 'case', 'about', 'blog'] as PageId[]).map((p) => (
            <button key={p} onClick={() => go(p)} className={`px-4 py-2 rounded-xl text-[14px] font-bold transition-transform active:scale-95 whitespace-nowrap ${
              page === p ? 'bg-white text-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]' : 'text-gray-500 hover:text-gray-800'
            }`}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function V27Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(244,144,167,0.05)_0%,rgba(255,255,255,0)_70%)] blur-[40px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(62,187,233,0.04)_0%,rgba(255,255,255,0)_70%)] blur-[60px]" />
    </div>
  );
}

function V27Home({ go }: { go: (p: PageId) => void }) {
  return (
    <main className="relative z-10 max-w-[1240px] mx-auto px-8 py-16">
      <div className="grid grid-cols-12 gap-6 grid-flow-dense md:auto-rows-[160px]">
        {/* Hero Tile */}
        <div className={`col-span-12 md:col-span-8 md:row-span-3 p-8 md:p-12 flex flex-col justify-between ${bentoTileOuter}`}>
          <div className="relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F5F7] border border-[#EBECEF] mb-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4C6A] shadow-[0_0_12px_rgba(255,76,106,0.5),inset_0_1px_2px_rgba(255,255,255,0.8)]" />
              <span className="text-[13px] font-bold text-gray-600 tracking-tight">{HERO.availability}</span>
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,3.8rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1E2022] max-w-[600px] mb-6 drop-shadow-sm">
              Materializing vision through prototypes.
            </h1>
            <p className="text-[18px] text-[#6B717B] font-medium max-w-[500px] leading-relaxed">{HERO.positioning}</p>
          </div>
          <div className="relative z-10 mt-8 md:mt-0">
            <button onClick={() => go('work')} className="relative px-7 py-4 rounded-[20px] bg-gradient-to-b from-[#4A90E2] to-[#357ABD] text-white text-[15px] font-bold shadow-[0_8px_20px_rgba(74,144,226,0.3),inset_0_2px_1px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02] active:scale-95 active:shadow-[0_2px_10px_rgba(74,144,226,0.2),inset_0_2px_8px_rgba(0,0,0,0.2)] flex items-center gap-2 w-max">
              See Case Studies <ArrowRight weight="bold" />
            </button>
          </div>
          <div className="absolute right-[-10%] bottom-[-20%] w-[380px] h-[380px] bg-white rounded-full shadow-[inset_0_20px_60px_rgba(0,0,0,0.03),0_20px_40px_rgba(0,0,0,0.04)] border border-gray-50 items-center justify-center opacity-60 pointer-events-none group-hover:scale-105 transition-transform duration-700 hidden md:flex">
             <div className="w-[300px] h-[300px] rounded-full bg-[#F9FAFB] shadow-[inset_0_10px_30px_rgba(0,0,0,0.04)] border border-[#EBECEF] flex items-center justify-center">
                <div className="w-[220px] h-[220px] rounded-full bg-white shadow-[0_15px_30px_rgba(0,0,0,0.05),inset_0_2px_2px_rgba(255,255,255,1)]" />
             </div>
          </div>
        </div>

        {/* Stats Tile */}
        <div className={`col-span-12 md:col-span-4 md:row-span-1 p-8 flex items-center justify-between ${bentoTileInner}`}>
          <div>
            <p className="text-[13px] font-bold text-[#8C939D] uppercase tracking-wider mb-1">XP</p>
            <h2 className="text-[32px] font-extrabold text-[#1E2022] tracking-tight">15 Yrs</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center text-[#4A90E2]"><Sparkle weight="fill" size={24} /></div>
        </div>

        {/* Testimonial Tile */}
        <div onClick={() => go('about')} className={`col-span-12 md:col-span-4 md:row-span-2 p-8 flex flex-col justify-between cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow ${bentoTileOuter}`}>
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#FEF2F4] text-[#FF4C6A] flex items-center justify-center mb-6 shadow-[inset_0_2px_4px_rgba(255,76,106,0.1)]"><Quotes weight="fill" size={20} /></div>
            <p className="text-[16px] text-[#1E2022] font-semibold leading-relaxed">"{TESTIMONIALS[0].content}"</p>
          </div>
          <div className="mt-8">
            <p className="font-bold text-[14px] text-[#1E2022]">{TESTIMONIALS[0].author}</p>
            <p className="font-medium text-[13px] text-[#8C939D]">{TESTIMONIALS[0].role}</p>
          </div>
        </div>

        {/* Work Tiles */}
        <div onClick={() => go('case')} className={`col-span-12 md:col-span-4 md:row-span-2 p-2 cursor-pointer ${bentoTileOuter}`}>
           <div className="absolute inset-2 bg-[#F4F5F7] rounded-[24px] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)]">
             <img src={PROJECTS[0].cover} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
           </div>
           <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
             <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-[#1E2022] text-[12px] font-bold rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">{PROJECTS[0].title}</span>
           </div>
        </div>
        
        <div onClick={() => go('case')} className={`col-span-12 md:col-span-4 md:row-span-2 p-2 cursor-pointer ${bentoTileOuter}`}>
           <div className="absolute inset-2 bg-[#F4F5F7] rounded-[24px] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)]">
             <img src={PROJECTS[2].cover} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
           </div>
           <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
             <h3 className="text-[15px] font-bold text-[#1E2022] mb-1">{PROJECTS[2].title}</h3>
             <p className="text-[13px] font-semibold text-[#8C939D]">{PROJECTS[2].category}</p>
           </div>
        </div>
      </div>
    </main>
  );
}

function V27Work({ go }: { go: (p: PageId) => void }) {
  return (
    <main className="relative z-10 max-w-[1240px] mx-auto px-8 py-16">
      <div className="mb-10 text-center">
         <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E2022] tracking-tight">Work Library</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 grid-flow-dense md:auto-rows-[160px]">
        {PROJECTS.map((p, i) => (
          <div key={p.id} onClick={() => go('case')} className={`col-span-12 md:col-span-${i===0 ? '8' : '4'} md:row-span-2 p-2 cursor-pointer ${bentoTileOuter}`}>
             <div className="absolute inset-2 bg-[#F4F5F7] rounded-[24px] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)]">
               <img src={p.cover} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
               <div>
                  <h3 className="text-[15px] font-bold text-[#1E2022] mb-1">{p.title}</h3>
                  <p className="text-[13px] font-semibold text-[#8C939D]">{p.category}</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-[#1E2022] text-white flex items-center justify-center shadow-md"><ArrowUpRight weight="bold" size={14}/></div>
             </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function V27Case({ go }: { go: (p: PageId) => void }) {
  return (
    <main className="relative z-10 max-w-[1000px] mx-auto px-8 py-16">
      <button onClick={() => go('work')} className="px-5 py-2.5 rounded-[20px] bg-white text-[#1E2022] text-[14px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_-2px_6px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center gap-2 mb-8 hover:scale-105 transition-transform active:scale-95">
        <ArrowRight size={14} className="rotate-180" weight="bold" /> Back
      </button>
      <div className={`p-8 md:p-12 mb-8 ${bentoTileOuter}`}>
        <div className={`w-full aspect-video rounded-[24px] overflow-hidden mb-10 p-2 ${bentoTileInner}`}>
           <img src={PROJECTS[0].cover} alt="" className="w-full h-full object-cover rounded-[16px]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E2022] mb-6">{PROJECTS[0].title}</h1>
        <p className="text-[19px] text-[#6B717B] font-medium leading-relaxed mb-8">{CASE_DEEP.context}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-8 ${bentoTileInner}`}>
           <h3 className="text-[14px] font-bold text-[#8C939D] uppercase tracking-wider mb-4">Challenge</h3>
           <p className="text-[16px] text-[#1E2022] font-semibold leading-relaxed">{CASE_DEEP.challenge}</p>
        </div>
        <div className={`p-8 ${bentoTileOuter}`}>
           <h3 className="text-[14px] font-bold text-[#8C939D] uppercase tracking-wider mb-4">Outcomes</h3>
           <ul className="space-y-4">
             {CASE_DEEP.outcomes.map(o => (
               <li key={o} className="flex items-center gap-3 text-[15px] text-[#1E2022] font-bold">
                 <div className="w-5 h-5 rounded-full bg-[#4A90E2]/10 text-[#4A90E2] flex items-center justify-center shrink-0">✓</div>{o}
               </li>
             ))}
           </ul>
        </div>
      </div>
    </main>
  );
}

function V27About({ go }: { go: (p: PageId) => void }) {
  return (
    <main className="relative z-10 max-w-[1240px] mx-auto px-8 py-16">
      <div className="grid grid-cols-12 gap-6 grid-flow-dense auto-rows-[160px]">
        <div className={`col-span-12 md:col-span-8 row-span-2 p-10 flex flex-col justify-center ${bentoTileOuter}`}>
          <h1 className="text-4xl font-extrabold text-[#1E2022] mb-6 tracking-tight">About</h1>
          <p className="text-[18px] text-[#6B717B] font-medium leading-relaxed">{ABOUT_DEEP.intro}</p>
        </div>
        <div className={`col-span-12 md:col-span-4 row-span-2 p-4 flex flex-col items-center justify-center ${bentoTileInner}`}>
          <div className="w-32 h-32 bg-white rounded-full mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_2px_2px_rgba(255,255,255,1)]" />
          <button onClick={() => go('work')} className="px-6 py-3 rounded-[20px] bg-white text-[#1E2022] text-[14px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_-2px_6px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,1)]">Contact Me</button>
        </div>
        {ABOUT_DEEP.experience.map((exp, i) => (
          <div key={i} className={`col-span-12 md:col-span-6 row-span-1 p-8 flex flex-col justify-center ${bentoTileOuter}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-[18px] font-extrabold text-[#1E2022]">{exp.role}</h4>
              <span className="text-[13px] font-bold text-[#8C939D] bg-[#F4F5F7] px-3 py-1 rounded-full">{exp.period}</span>
            </div>
            <p className="text-[14px] text-[#6B717B] font-medium max-w-sm">{exp.company} — {exp.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function V27Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <main className="relative z-10 max-w-[1240px] mx-auto px-8 py-16">
      <div className="mb-10 text-center">
         <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E2022] tracking-tight">Resources</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 grid-flow-dense auto-rows-[160px]">
        {RESOURCES.map((r, i) => (
          <div key={r.id} className={`col-span-12 md:col-span-6 row-span-2 p-8 flex flex-col justify-center cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow ${bentoTileOuter}`}>
            <div className="w-12 h-12 rounded-2xl bg-[#4A90E2]/10 text-[#4A90E2] flex items-center justify-center mb-6 shadow-[inset_0_2px_4px_rgba(74,144,226,0.1)]"><BookOpen weight="bold" size={24} /></div>
            <h3 className="text-2xl font-extrabold text-[#1E2022] mb-3">{r.title}</h3>
            <p className="text-[16px] text-[#6B717B] font-medium leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function V27Gallery({ go }: { go: (p: PageId) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const flatGallery = GALLERY_DATA.flatMap(g => g.items);
  return (
    <main className="relative z-10 max-w-[1240px] mx-auto px-8 py-16">
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-xl flex items-center justify-center p-8 cursor-pointer" onClick={() => setLightbox(null)}>
            <motion.div className={`p-4 ${bentoTileOuter}`} onClick={e => e.stopPropagation()}>
               <motion.img src={lightbox} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-[85vw] max-h-[80vh] object-contain rounded-[20px]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mb-10 text-center">
         <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E2022] tracking-tight">Visual Gallery</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 grid-flow-dense auto-rows-[250px]">
        {flatGallery.map((src, i) => (
          <div key={i} onClick={() => setLightbox(src)} className={`col-span-12 md:col-span-6 row-span-1 p-2 cursor-pointer ${bentoTileOuter}`}>
            <div className="absolute inset-2 bg-[#F4F5F7] rounded-[24px] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)]">
              <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export function V27() {
  const { page, go } = usePageNav();
  return (
    <div className={bentoPageClass} style={{ fontFamily }}>
      <V27Background />
      <V27Nav page={page} go={go} />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.2 }}>
          {page === 'home' && <V27Home go={go} />}
          {page === 'work' && <V27Work go={go} />}
          {page === 'case' && <V27Case go={go} />}
          {page === 'about' && <V27About go={go} />}
          {page === 'blog' && <V27Blog go={go} />}
          {page === 'gallery' && <V27Gallery go={go} />}
        </motion.div>
      </AnimatePresence>
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
    </div>
  );
}
