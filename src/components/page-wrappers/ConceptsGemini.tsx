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
  Command,
  Sparkle,
  BookOpen,
  AppleLogo,
  Archive,
  Star
} from '@phosphor-icons/react';
import { TRANSLATIONS } from '@/data/translations';

const TRANSLATIONS_EN = TRANSLATIONS.en;

/* ═══════════════════════════════════════════════════════════════
   SHARED DATA
   ═══════════════════════════════════════════════════════════════ */
const HERO = {
  title: 'Lead Product Designer',
  desc: '15 years in tech, 10 in product design. Framing problems, materializing vision, shipping fast.',
  availability: 'Available for new projects',
  positioning: 'SaaS B2B & B2G, complex interfaces, Design Systems, AI workflows',
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS.', cover: '/images/thumbnail-toolkit.webp', category: 'SaaS Platform' },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'National platform for professional certification.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'Public Service' },
  { id: 'dailymotion', title: 'Dailymotion', role: 'Senior Product Designer', period: '2017-2018', summary: 'Video management suite for tier-1 media partners.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Media Tech' },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'EdTech ecosystem for 500K+ students.', cover: '/images/thumbnail-sqool-suite.webp', category: 'EdTech B2G' },
];

const PILLARS = [
  { icon: PencilSimple, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, and rapid MVP development.' },
  { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops.' },
  { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, dev handoff rituals, team management.' },
];

const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys." },
];

const RESOURCES = [
  { id: 'guide-claude-code', type: 'guide' as const, title: 'Getting started with Claude Code', desc: 'Complete guide for designers: from installation to deployment.', chapters: 9, cover: '/images/guide-claude-code/hero-cover.png' },
  { id: 'ai-design-workflows', type: 'article' as const, title: 'AI-assisted design workflows', desc: 'How AI changes the way designers prototype, test, and ship.' },
];

const CASE_DEEP = {
  context: 'Toolkit is a construction management platform born from a simple observation: site managers still coordinate multi-million euro projects with spreadsheets and paper plans.',
  challenge: 'Three forces shaped every design decision. First, users who work with gloves in direct sunlight. Second, intermittent connectivity. Third, competing against established players.',
  outcomes: ['MVP shipped in 6 months', 'Pilot on 3 active sites', 'Seed round secured', 'UI system reusable across web and mobile'],
};

const ABOUT_DEEP = {
  intro: 'I started in tech 15 years ago as a visual designer at a small Parisian agency. Today I work as a Lead Product Designer on complex B2B and B2G interfaces.',
  location: 'Based in Paris. French and English, on-site or remote.',
  experience: [
    { role: 'Lead Product Designer', company: 'France VAE', period: '2024-2025' },
    { role: 'Founding Designer', company: 'Toolkit', period: '2023-2024' },
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
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return { page, go };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 300, damping: 30, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const pageLabels: PageId[] = ['home', 'work', 'gallery', 'case', 'about', 'blog'];

const OtherPagesContent = ({ page, go, inverse = false }: { page: PageId, go: (p: PageId) => void, inverse?: boolean }) => {
  const t = TRANSLATIONS_EN;
  const tc = inverse ? "text-gray-300" : "text-gray-600";
  const th = inverse ? "text-white" : "text-gray-900";
  const bg = inverse ? "bg-white/5" : "bg-gray-100";
  
  if (page === 'home') return (
    <div className="pt-20 max-w-[900px] mx-auto text-center px-6 pb-40">
      <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 ${th}`}>{t.hero.title}</h1>
      <p className={`text-xl font-semibold mb-12 ${tc}`}>{t.hero.desc}</p>
      <button onClick={() => go('work')} className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl hover:bg-blue-700 transition">View My Work</button>
    </div>
  );
  if (page === 'work') return (
    <div className="pt-20 max-w-[1200px] mx-auto px-6 pb-40">
      <h1 className={`text-5xl font-extrabold mb-12 ${th}`}>{t.projects.title}</h1>
      <div className="grid md:grid-cols-2 gap-12">
        {PROJECTS.map((p, i) => (
           <div key={i} onClick={() => go('case')} className="cursor-pointer group">
             <div className={`aspect-[4/3] rounded-3xl overflow-hidden mb-6 ${bg} shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-gray-200/20`}>
                <img src={p.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" alt=""/>
             </div>
             <h3 className={`text-2xl font-extrabold transition-colors group-hover:text-blue-500 ${th}`}>{p.title}</h3>
             <p className={`mt-2 font-semibold ${tc}`}>{p.summary}</p>
           </div>
        ))}
      </div>
    </div>
  );
  if (page === 'about') return (
    <div className="pt-20 max-w-[800px] mx-auto px-6 pb-40">
      <h1 className={`text-5xl font-extrabold mb-12 ${th}`}>{t.bio.title}</h1>
      <div className={`space-y-8 text-lg ${tc} font-medium leading-relaxed`}>
         <p dangerouslySetInnerHTML={{ __html: t.bio.journey_p1 }} />
         <p dangerouslySetInnerHTML={{ __html: t.bio.journey_p2 }} />
         <p dangerouslySetInnerHTML={{ __html: t.bio.journey_p3 }} />
         <p dangerouslySetInnerHTML={{ __html: t.bio.journey_p4 }} />
         <p dangerouslySetInnerHTML={{ __html: t.bio.journey_p5 }} />
      </div>
    </div>
  );
  if (page === 'blog') return (
    <div className="pt-20 max-w-[800px] mx-auto px-6 text-center pb-40">
      <h1 className={`text-5xl font-extrabold mb-6 ${th}`}>{t.signals.title}</h1>
      <p className={`text-xl font-semibold ${tc}`}>{t.signals.subtitle}</p>
    </div>
  );
  if (page === 'gallery') return (
    <div className="pt-20 max-w-[1200px] mx-auto px-6 text-center pb-40">
      <h1 className={`text-5xl font-extrabold mb-6 ${th}`}>{t.visual_archive.title}</h1>
      <p className={`text-xl font-semibold mb-16 ${tc}`}>{t.visual_archive.subtitle}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
         {PROJECTS.map((p,i) => (
            <div key={i} className={`aspect-square ${bg} rounded-3xl overflow-hidden shadow-inner`}>
               <img src={p.cover} className="w-full h-full object-cover" alt="" />
            </div>
         ))}
      </div>
    </div>
  );
  if (page === 'case') return (
    <div className="pt-20 max-w-[900px] mx-auto px-6 pb-40">
      <h1 className={`text-5xl font-extrabold mb-8 ${th}`}>{PROJECTS[0].title}</h1>
      <div className={`w-full aspect-video rounded-3xl ${bg} overflow-hidden mb-12`}><img src={PROJECTS[0].cover} className="w-full h-full object-cover" alt=""/></div>
      <p className={`text-xl font-medium leading-relaxed mb-8 ${tc}`}>{CASE_DEEP.context}</p>
      <p className={`text-lg font-medium leading-relaxed ${tc}`}>{CASE_DEEP.challenge}</p>
    </div>
  );
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   V28: GEMINI MACPAW CLASSIC (Pure Skeuomorphic, glossy white)
   ═══════════════════════════════════════════════════════════════ */
const v28Card = "bg-white shadow-[0_15px_35px_rgba(0,0,0,0.08),0_3px_10px_rgba(0,0,0,0.04)] border border-[#E5E5E5] rounded-[28px] overflow-hidden relative";
const v28Inner = "absolute inset-0 rounded-[28px] border-[2px] border-white pointer-events-none z-10";
const v28BtnGlossy = "relative overflow-hidden bg-gradient-to-b from-[#4A90E2] to-[#2067B8] text-white px-6 py-3.5 rounded-full font-bold shadow-[0_8px_16px_rgba(32,103,184,0.3),inset_0_2px_1px_rgba(255,255,255,0.4),inset_0_-2px_2px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform active:scale-95";
const v28NavBtn = "px-4 py-2 font-bold text-[14px] rounded-full transition-all";

export function V28() {
  const { page, go } = usePageNav();

  const Nav = () => (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#F4F4F6] border-b border-[#D1D1D6] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
       <div className="absolute inset-x-0 top-0 h-[1px] bg-white opacity-80" />
       <div className="max-w-[1100px] mx-auto h-16 px-6 flex items-center justify-between">
         <div className="flex items-center gap-2 text-[#1C1C1E] font-extrabold text-[17px] tracking-tight">
           <div className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center border border-gray-400">
             <AppleLogo weight="fill" size={16} />
           </div>
           Victor Soussan
         </div>
         <div className="flex gap-1">
           {pageLabels.map(p => (
             <button key={p} onClick={() => go(p)} className={`${v28NavBtn} ${page === p ? 'bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1),inset_0_-1px_0_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] text-[#1C1C1E] border border-gray-200' : 'text-[#8E8E93] hover:text-[#1C1C1E]'}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
           ))}
         </div>
       </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#E5E5EA] text-[#1C1C1E]" style={{ fontFamily }}>
      <Nav />
      {/* Glossy gradient background light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8)_0%,rgba(229,229,234,0)_70%)] pointer-events-none" />
      
      <main className="relative z-10 max-w-[1100px] mx-auto pt-32 pb-24 px-6">
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            
            {page === 'home' && (
              <div className="space-y-10">
                <div className={`${v28Card} p-12 text-center flex flex-col items-center bg-[url('/images/ui-noise.png')] bg-repeat bg-opacity-10`}>
                  <div className={v28Inner} />
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF3B30] to-[#FF9500] mb-6 shadow-[0_10px_20px_rgba(255,59,48,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-4px_4px_rgba(0,0,0,0.1)] flex items-center justify-center border border-[#FF3B30]">
                    <Sparkle weight="fill" size={40} className="text-white drop-shadow-md" />
                  </div>
                  <h1 className="text-5xl font-extrabold tracking-tight text-[#1C1C1E] mb-4 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Designing apps that feel<br/>incredibly real.</h1>
                  <p className="text-[19px] text-[#3A3A3C] font-semibold max-w-[600px] leading-relaxed mb-8">{HERO.desc}</p>
                  <button onClick={() => go('work')} className={v28BtnGlossy}>
                    <span className="relative z-10 flex items-center gap-2">View Portfolio <ArrowRight weight="bold" /></span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {PROJECTS.slice(0,2).map((p, i) => (
                    <div key={i} onClick={() => go('case')} className={`${v28Card} cursor-pointer group hover:-translate-y-1 transition-transform`}>
                      <div className={v28Inner} />
                      <div className="h-[260px] bg-[#F2F2F7] relative border-b border-[#D1D1D6] overflow-hidden shadow-[inset_0_-2px_10px_rgba(0,0,0,0.05)] p-4">
                        <img src={p.cover} className="w-full h-full object-cover rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500" alt="" />
                      </div>
                      <div className="p-8 bg-white">
                        <h3 className="text-[22px] font-extrabold text-[#1C1C1E] mb-2">{p.title}</h3>
                        <p className="text-[15px] text-[#8E8E93] font-bold uppercase tracking-widest mb-3">{p.category}</p>
                        <p className="text-[16px] text-[#3A3A3C] font-medium">{p.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {page === 'work' && (
              <div className="space-y-8">
                <h1 className="text-4xl font-extrabold drop-shadow-[0_2px_1px_white]">Work Library</h1>
                <div className="grid md:grid-cols-2 gap-8">
                  {PROJECTS.map((p, i) => (
                    <div key={i} onClick={() => go('case')} className={`${v28Card} cursor-pointer group hover:-translate-y-1 transition-transform`}>
                      <div className={v28Inner} />
                      <div className="h-[220px] bg-[#F2F2F7] relative border-b border-[#D1D1D6] overflow-hidden p-3"><img src={p.cover} className="w-full h-full object-cover rounded-[16px] shadow-sm" alt="" /></div>
                      <div className="p-6 bg-white"><h3 className="text-[20px] font-extrabold text-[#1C1C1E]">{p.title}</h3><p className="text-[14px] text-[#8E8E93] font-bold">{p.role}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {page === 'case' && (
              <div className={`${v28Card} p-10 bg-white`}>
                <div className={v28Inner} />
                <button onClick={() => go('work')} className="mb-8 font-bold text-[#4A90E2] flex items-center gap-1 hover:underline"><ArrowRight className="rotate-180" weight="bold"/> Back</button>
                <div className="w-full aspect-[21/9] rounded-[24px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,0.5)] border border-gray-300 mb-10"><img src={PROJECTS[0].cover} className="w-full h-full object-cover" alt=""/></div>
                <h1 className="text-4xl font-extrabold mb-4">{PROJECTS[0].title}</h1>
                <p className="text-xl text-[#3A3A3C] font-medium leading-relaxed mb-8">{CASE_DEEP.context}</p>
                <div className="p-6 rounded-[20px] bg-[#F2F2F7] border border-[#D1D1D6] shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)]">
                  <h3 className="font-extrabold text-[#1C1C1E] mb-3">Outcomes</h3>
                  <ul className="space-y-2">{CASE_DEEP.outcomes.map(o => <li key={o} className="flex gap-2 text-[#3A3A3C] font-semibold"><span className="text-[#34C759]">✓</span> {o}</li>)}</ul>
                </div>
              </div>
            )}

            {page === 'about' && (
              <div className="grid md:grid-cols-12 gap-8">
                <div className={`${v28Card} md:col-span-4 p-8 flex flex-col items-center bg-white`}>
                  <div className={v28Inner} />
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 shadow-[inset_0_4px_4px_rgba(255,255,255,1),0_10px_20px_rgba(0,0,0,0.1)] border border-gray-300 mb-6" />
                  <h2 className="text-2xl font-extrabold">Victor Soussan</h2>
                  <p className="text-[#8E8E93] font-bold mt-1">{ABOUT_DEEP.location}</p>
                </div>
                <div className={`${v28Card} md:col-span-8 p-10 bg-white`}>
                  <div className={v28Inner} />
                  <h2 className="text-3xl font-extrabold mb-4">About Me</h2>
                  <p className="text-lg font-medium text-[#3A3A3C] leading-relaxed mb-8">{ABOUT_DEEP.intro}</p>
                  <h3 className="text-xl font-extrabold mb-4">Experience</h3>
                  <div className="space-y-4">
                    {ABOUT_DEEP.experience.map((e, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-[#F2F2F7] border border-[#D1D1D6] shadow-[inset_0_1px_2px_rgba(255,255,255,1)] flex justify-between">
                        <div><h4 className="font-extrabold">{e.role}</h4><p className="text-[#3A3A3C] font-semibold">{e.company}</p></div>
                        <span className="font-bold text-[#8E8E93]">{e.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {page === 'blog' && (
               <div className="grid md:grid-cols-2 gap-8">
                 {RESOURCES.map((r, i) => (
                    <div key={i} className={`${v28Card} p-8 bg-white hover:-translate-y-1 transition-transform cursor-pointer`}>
                      <div className={v28Inner} />
                      <div className="w-16 h-16 rounded-[20px] bg-gradient-to-b from-[#5AC8FA] to-[#007AFF] text-white flex items-center justify-center shadow-[0_5px_15px_rgba(0,122,255,0.3),inset_0_2px_1px_rgba(255,255,255,0.5)] mb-6"><BookOpen weight="bold" size={32} /></div>
                      <h3 className="text-2xl font-extrabold mb-2">{r.title}</h3>
                      <p className="font-medium text-[#3A3A3C]">{r.desc}</p>
                    </div>
                 ))}
               </div>
            )}

            {page === 'gallery' && (
              <div className="grid md:grid-cols-2 gap-8">
                {GALLERY_DATA.flatMap(g => g.items).map((src, i) => (
                  <div key={i} className={`${v28Card} p-3 bg-white`}>
                    <div className={v28Inner} />
                    <img src={src} className="w-full aspect-[4/3] object-cover rounded-[18px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-[#E5E5E5]" alt=""/>
                  </div>
                ))}
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V29: GEMINI MACPAW APP UI (Sidebar macOS style)
   ═══════════════════════════════════════════════════════════════ */
export function V29() {
  const { page, go } = usePageNav();

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1E1E1E] flex" style={{ fontFamily }}>
      {/* Sidebar physically separated */}
      <aside className="fixed top-0 bottom-0 left-0 w-[260px] bg-[#EBEBEB] border-r border-[#D2D2D7] shadow-[2px_0_10px_rgba(0,0,0,0.02)] flex flex-col">
        <div className="h-10 border-b border-[#D2D2D7] bg-[#E2E2E2] flex items-center px-4 gap-2">
           <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
           <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
           <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="p-6">
          <h2 className="text-[14px] font-bold text-[#86868B] uppercase tracking-wide mb-3 px-3 shadow-[0_1px_0_rgba(255,255,255,0.8)] pb-1">Navigation</h2>
          <div className="flex flex-col gap-1">
            {pageLabels.map(p => (
              <button key={p} onClick={() => go(p)} className={`text-left px-3 py-2 rounded-lg font-bold text-[14px] transition-colors ${page === p ? 'bg-[#007AFF] text-white shadow-[0_2px_4px_rgba(0,122,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#0061D5]' : 'text-[#1E1E1E] hover:bg-[#DCDDE0]'}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="ml-[260px] flex-1 bg-white min-h-screen shadow-[inset_2px_0_5px_rgba(0,0,0,0.03)] relative">
        <header className="h-14 bg-gradient-to-b from-[#F5F5F7] to-[#EAEAEA] border-b border-[#C6C6C8] flex items-center px-6 shadow-[inset_0_1px_0_rgba(255,255,255,1)] sticky top-0 z-20">
          <h1 className="font-extrabold text-[15px] text-[#4D4D4D] text-shadow-[0_1px_0_rgba(255,255,255,0.8)]">Victor Soussan — Portfolio Viewer</h1>
        </header>

        <div className="p-10 max-w-[900px]">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {page === 'home' && (
                <div className="space-y-8">
                  <div className="bg-[#F2F2F7] border border-[#D1D1D6] rounded-[24px] p-10 shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/images/guide-claude-code/hero-cover.png')] opacity-10 blur-xl pointer-events-none" />
                    <h1 className="text-4xl font-extrabold text-[#1C1C1E] mb-4">Gemini MacPaw App UI</h1>
                    <p className="text-[17px] font-semibold text-[#86868B] mb-8">{HERO.desc}</p>
                    <button onClick={() => go('work')} className="px-6 py-2.5 rounded-full bg-gradient-to-b from-white to-[#F0F0F0] border border-[#C6C6C8] text-[#1C1C1E] font-extrabold shadow-[0_2px_5px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,1)] active:scale-95 transition-transform flex items-center justify-center gap-2 mx-auto">
                      Explore Work <span className="text-[#007AFF]">→</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     {PROJECTS.map(p => (
                       <div key={p.id} onClick={() => go('case')} className="cursor-pointer bg-white border border-[#D1D1D6] rounded-2xl p-3 shadow-[0_5px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-shadow">
                          <img src={p.cover} className="w-full h-36 object-cover rounded-xl border border-[#E5E5EA]" alt=""/>
                          <div className="px-2 pt-3 pb-1">
                            <h3 className="font-extrabold text-[#1C1C1E]">{p.title}</h3>
                            <p className="text-[13px] font-bold text-[#86868B]">{p.category}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}
              {/* Other pages reuse similar dense physical styles */}
              {page !== 'home' && (
                <div className="bg-[#F2F2F7] border border-[#D1D1D6] rounded-[24px] shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden">
                   <OtherPagesContent page={page} go={go} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V30: GEMINI MACPAW DARK GLOSS (Dark Mode Skeuo)
   ═══════════════════════════════════════════════════════════════ */
const v30Card = "bg-gradient-to-b from-[#2A2A2C] to-[#1E1E20] border border-[#3A3A3C] rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden";
const v30Inner = "absolute inset-0 rounded-[28px] border border-black/50 pointer-events-none z-10";

export function V30() {
  const { page, go } = usePageNav();

  return (
    <div className="min-h-screen bg-[#111112] text-white" style={{ fontFamily }}>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 bg-[#1C1C1E] border border-[#3A3A3C] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
        {pageLabels.map(p => (
           <button key={p} onClick={() => go(p)} className={`px-5 py-2 font-extrabold text-[14px] rounded-full transition-colors ${page === p ? 'bg-gradient-to-b from-[#0A84FF] to-[#005ECB] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_10px_rgba(10,132,255,0.4)]' : 'text-[#8E8E93] hover:text-white'}`}>
             {p}
           </button>
        ))}
      </nav>

      <main className="max-w-[1000px] mx-auto pt-32 pb-24 px-6 relative z-10">
         <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
              {page === 'home' && (
                <div className="space-y-8">
                  <div className={`${v30Card} p-12 text-center`}>
                    <div className={v30Inner} />
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#30D158] to-[#1F8232] flex items-center justify-center mb-8 border border-[#30D158] shadow-[0_0_40px_rgba(48,209,88,0.4),inset_0_2px_5px_rgba(255,255,255,0.6)]">
                       <Archive weight="fill" size={48} className="text-white drop-shadow-md" />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-b from-white to-[#AAAAAA]">Gemini MacPaw Dark</h1>
                    <p className="text-[#8E8E93] font-semibold text-[18px] max-w-[600px] mx-auto leading-relaxed">{HERO.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {PROJECTS.map(p => (
                      <div key={p.id} className={`${v30Card} p-4 cursor-pointer hover:-translate-y-2 transition-transform duration-300`}>
                        <div className={v30Inner} />
                        <div className="bg-[#111112] rounded-[20px] overflow-hidden border border-[#2A2A2C] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]"><img src={p.cover} className="w-full h-40 object-cover opacity-80 hover:opacity-100 transition-opacity" alt=""/></div>
                        <h3 className="text-xl font-bold mt-4 px-2">{p.title}</h3>
                        <p className="text-[#0A84FF] font-bold text-[14px] px-2 pb-2">{p.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {page !== 'home' && (
                 <div className="w-full relative z-10 pt-10">
                   <OtherPagesContent page={page} go={go} inverse />
                 </div>
              )}
            </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V31: GEMINI MACPAW SPATIAL (Heavy nested layers & grids)
   ═══════════════════════════════════════════════════════════════ */
export function V31() {
  const { page, go } = usePageNav();
  const v31Card = "bg-gradient-to-b from-white to-[#F9FAFB] rounded-[32px] border border-[#E5E5EA] shadow-[0_20px_40px_rgba(0,0,0,0.06),0_0_0_4px_rgba(255,255,255,0.5),inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden";
  return (
    <div className="min-h-screen bg-[#DFE1E5]" style={{ fontFamily }}>
       <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 bg-[#F2F2F7] border border-[#D1D1D6] rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.1),inset_0_2px_2px_rgba(255,255,255,1)]">
         {pageLabels.map(p => (
            <button key={p} onClick={() => go(p)} className={`px-5 py-3 rounded-[16px] font-extrabold text-[14px] shadow-[0_2px_5px_rgba(0,0,0,0.05),inset_0_2px_2px_rgba(255,255,255,0.8)] border transition-all ${page === p ? 'bg-white border-[#C7C7CC] text-[#1C1C1E] scale-110 -translate-y-2' : 'bg-[#E5E5EA] border-transparent text-[#8E8E93] hover:bg-white/50'}`}>
               {p.charAt(0).toUpperCase()}
            </button>
         ))}
       </nav>
       <main className="max-w-[1200px] mx-auto pt-24 pb-40 px-6">
         <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, rotateX: 10, y: 20 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, rotateX: -10, y: -20 }} transition={{ duration: 0.3 }} style={{ perspective: 1000 }}>
              {page === 'home' && (
                 <div className="grid grid-cols-3 gap-8">
                   <div className={`${v31Card} col-span-3 p-16 flex justify-between items-center`}>
                      <div>
                        <h1 className="text-6xl font-extrabold text-[#1C1C1E] tracking-tighter mb-4 drop-shadow-sm">Gemini Spatial.</h1>
                        <p className="text-[20px] font-bold text-[#8E8E93] max-w-lg leading-relaxed">{HERO.desc}</p>
                      </div>
                      <div className="w-48 h-48 rounded-[40px] bg-gradient-to-tr from-[#32ADE6] to-[#007AFF] shadow-[0_20px_40px_rgba(0,122,255,0.3),inset_0_4px_10px_rgba(255,255,255,0.6)] border border-[#32ADE6] flex items-center justify-center transform rotate-6">
                         <Star weight="fill" size={80} className="text-white drop-shadow-lg" />
                      </div>
                   </div>
                   {PROJECTS.slice(0,3).map((p, i) => (
                      <div key={i} className={`${v31Card} p-4 h-[300px] flex flex-col hover:scale-105 transition-transform duration-500`}>
                        <div className="flex-1 rounded-[24px] bg-[#E5E5EA] shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05)] overflow-hidden border border-[#D1D1D6] mb-4"><img src={p.cover} className="w-full h-full object-cover" alt="" /></div>
                        <h3 className="text-xl font-extrabold text-[#1C1C1E] text-center px-2">{p.title}</h3>
                      </div>
                   ))}
                 </div>
              )}
              {page !== 'home' && (
                 <div className={`${v31Card} col-span-3 pt-10 bg-white/50 backdrop-blur-3xl`}>
                   <OtherPagesContent page={page} go={go} />
                 </div>
              )}
            </motion.div>
         </AnimatePresence>
       </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V32: GEMINI MACPAW EDITORIAL (Physical papers, striking typography)
   ═══════════════════════════════════════════════════════════════ */
export function V32() {
  const { page, go } = usePageNav();
  const v32Paper = "bg-[#FCFCFC] border border-[#E5E5E5] shadow-[0_10px_30px_rgba(0,0,0,0.08),4px_4px_0_rgba(209,209,214,0.5)]";

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
      <header className={`${v32Paper} max-w-[900px] mx-auto mt-10 p-6 flex justify-between items-center rounded-sm`}>
        <h1 className="text-2xl font-black uppercase tracking-widest text-[#1C1C1E]">Gemini Edition</h1>
        <nav className="flex gap-4 font-sans font-bold text-[13px] uppercase tracking-wider text-[#8E8E93]">
           {pageLabels.map(p => <button key={p} onClick={() => go(p)} className={`hover:text-[#1C1C1E] transition-colors ${page === p ? 'text-black border-b-2 border-black' : ''}`}>{p}</button>)}
        </nav>
      </header>
      <main className="max-w-[900px] mx-auto mt-10 mb-24">
         <AnimatePresence mode="wait">
           <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
             {page === 'home' && (
               <div className="space-y-10">
                 <div className={`${v32Paper} p-12 text-center rounded-sm bg-[url('/images/ui-noise.png')] bg-repeat bg-opacity-5`}>
                   <h2 className="text-6xl font-black text-[#1C1C1E] leading-tight mb-6">Designing Digital<br/>Physicality.</h2>
                   <p className="font-sans text-lg font-bold text-[#8E8E93] max-w-lg mx-auto">{HERO.desc}</p>
                 </div>
                 {PROJECTS.map(p => (
                   <div key={p.id} className={`${v32Paper} p-6 flex gap-6 rounded-sm`}>
                      <div className="w-1/2 aspect-video overflow-hidden border border-[#E5E5E5] shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] rounded-sm"><img src={p.cover} className="w-full h-full object-cover" alt="" /></div>
                      <div className="w-1/2 flex flex-col justify-center">
                        <span className="font-sans text-[12px] font-black uppercase tracking-widest text-[#007AFF] mb-2">{p.category}</span>
                        <h3 className="text-3xl font-black mb-3 text-[#1C1C1E]">{p.title}</h3>
                        <p className="font-sans font-semibold text-[#8E8E93]">{p.summary}</p>
                      </div>
                   </div>
                 ))}
               </div>
             )}
             {page !== 'home' && (
                <div className={`${v32Paper} rounded-sm overflow-hidden`}>
                   <OtherPagesContent page={page} go={go} />
                </div>
             )}
           </motion.div>
         </AnimatePresence>
      </main>
    </div>
  );
}
