'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { getProjects } from '@/data/projectsData';
import { TOOLKIT_TRANSLATIONS } from '@/data/caseStudyTranslations/toolkitTranslations';
import { TRANSLATIONS } from '@/data/translations';
import { SIGNALS } from '@/data/signalsData';
import {
  ArrowRight, ArrowUpRight, CaretDown, Star, Sparkle,
  Image as ImageIcon, BookOpen, Fingerprint, Drop, List,
  Cpu, Layout, Compass, PencilSimple, UsersThree, Quotes, Envelope, Calendar
} from '@phosphor-icons/react';
import { StickyLayer, ContinueReading, TestimonialScroller } from './ConceptSharedUI';

// Fetch the real English contents from the existing data layer
const PROJECTS = getProjects('en');
const TOOLKIT = TOOLKIT_TRANSLATIONS.en;
const TRANSLATIONS_EN = TRANSLATIONS.en;
const tkCase = TOOLKIT.caseStudy || 'Case Study';
const ARTICLES = SIGNALS.slice(0, 6);
const UI_IMAGES = Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`);
const TESTIMONIALS_DATA = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys." },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
];

/* ═══════════════════════════════════════════════════════════════
   UTILITIES & SHARED LOGIC
   ═══════════════════════════════════════════════════════════════ */
type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'gallery';

function usePageNav() {
  const [page, setPage] = useState<PageId>('home'); 
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return { page, go };
}

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number, y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

const pageLabels: PageId[] = ['home', 'work', 'case', 'about', 'blog', 'gallery'];

// The actual long format editorial content mapped for the Toolkit case study
const ToolkitContent = () => {
  return (
    <div className="space-y-20 pb-32">
      <section className="scroll-mt-32" id="overview">
        <Reveal>
           <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-8">{TOOLKIT.overview.title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8 space-y-6">
            <Reveal delay={0.1}><p className="text-xl leading-relaxed text-gray-700 font-medium">{TOOLKIT.overview.introP1}</p></Reveal>
            <Reveal delay={0.2}><p className="text-xl leading-relaxed text-gray-600">{TOOLKIT.overview.introP2}</p></Reveal>
          </div>
          <div className="md:col-span-4 space-y-8">
            <Reveal delay={0.3}>
              <div className="pt-6 border-t-2 border-gray-100">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">{TOOLKIT.overview.roleTitle}</h3>
                <p className="text-[15px] leading-relaxed text-gray-700 font-medium">{TOOLKIT.overview.roleDesc}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skueomorphic Focus Element (Content level, not card level) */}
      <Reveal y={50}>
        <div className="my-16 flex justify-center">
          <div className="relative group cursor-pointer w-[400px] h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="w-full h-full relative rounded-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.1),inset_0_4px_10px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center translate-y-0 group-hover:-translate-y-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-[340px] h-[340px] rounded-full bg-gray-50 shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden relative">
                 <img src={PROJECTS[0].coverImage} className="w-full h-full object-cover opacity-90 scale-110 group-hover:scale-100 transition-transform duration-700" alt="Toolkit" />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-b from-white to-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,1)] flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-500 delay-100">
               <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-blue-600 border-b-[10px] border-b-transparent ml-2 drop-shadow-sm" />
            </div>
          </div>
        </div>
      </Reveal>

      <section className="scroll-mt-32" id="context">
         <Reveal><h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-8">{TOOLKIT.context.title}</h2></Reveal>
         <Reveal delay={0.1}><p className="text-xl leading-relaxed text-gray-700 font-medium max-w-3xl mb-12">{TOOLKIT.context.intro}</p></Reveal>
         <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
               <Reveal delay={0.1}>
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center text-blue-600 mb-6 shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.02)] border border-blue-200"><Fingerprint weight="fill" size={24}/></div>
                 <h3 className="text-2xl font-semibold text-gray-900 mb-4">{TOOLKIT.context.coreChallenge}</h3>
                 <p className="text-lg text-gray-600 leading-relaxed">{TOOLKIT.context.coreChallengeDesc}</p>
               </Reveal>
            </div>
            <div>
               <Reveal delay={0.2}>
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-pink-50 to-pink-100 flex items-center justify-center text-pink-600 mb-6 shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.02)] border border-pink-200"><List weight="fill" size={24}/></div>
                 <h3 className="text-2xl font-semibold text-gray-900 mb-4">{TOOLKIT.context.research}</h3>
                 <p className="text-lg text-gray-600 leading-relaxed">{TOOLKIT.context.researchDesc}</p>
               </Reveal>
            </div>
            <div>
               <Reveal delay={0.3}>
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-[inset_0_2px_2px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.02)] border border-emerald-200"><Cpu weight="fill" size={24}/></div>
                 <h3 className="text-2xl font-semibold text-gray-900 mb-4">{TOOLKIT.context.interactionPrinciples}</h3>
                 <p className="text-lg text-gray-600 leading-relaxed">{TOOLKIT.context.interactionPrinciplesDesc}</p>
               </Reveal>
            </div>
         </div>
      </section>

      <Reveal y={50}>
        <figure className="relative w-[calc(100%+3rem)] -mx-6 md:w-full md:mx-0 py-16 bg-gray-50 flex flex-col items-center rounded-3xl my-16 border border-gray-100">
          <div className="max-w-[1200px] w-full px-6 md:px-12">
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,0.5)]">
               <img src={'/images/visuels UI/1100_1_5x.webp'} className="w-full aspect-[16/9] object-cover" alt={TOOLKIT.captions.planningV2}/>
            </div>
            <figcaption className="mt-6 text-center text-sm font-semibold text-gray-500 uppercase tracking-widest">{TOOLKIT.captions.planningV2Desc}</figcaption>
          </div>
        </figure>
      </Reveal>

      <section className="scroll-mt-32" id="impact">
         <Reveal><h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-8">{TOOLKIT.impact.title}</h2></Reveal>
         <Reveal delay={0.1}><p className="text-xl leading-relaxed text-gray-700 font-medium max-w-3xl mb-12">{TOOLKIT.impact.intro}</p></Reveal>
         <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="flex flex-col">
                <span className="text-5xl font-semibold text-blue-600 mb-3 tracking-tighter">{TOOLKIT.impact.customers}</span>
                <span className="text-lg font-semibold text-gray-900 leading-snug">{TOOLKIT.impact.customersDesc}</span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col">
                <span className="text-5xl font-semibold text-emerald-500 mb-3 tracking-tighter">{TOOLKIT.impact.seriesA}</span>
                <span className="text-lg font-semibold text-gray-900 leading-snug">{TOOLKIT.impact.seriesADesc}</span>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col">
                <span className="text-5xl font-semibold text-purple-600 mb-3 tracking-tighter">{TOOLKIT.impact.enterprise}</span>
                <span className="text-lg font-semibold text-gray-900 leading-snug">{TOOLKIT.impact.enterpriseDesc}</span>
              </div>
            </Reveal>
         </div>
      </section>
    </div>
  );
};

// --- STICKY LOCAL NAVIGATION FOR IN-PAGE READING ---
const StickyLocalNav = ({ sections, variant }: { sections: string[], variant: 'stripe' | 'macpaw' | 'realmac' | 'apple' | 'ios' }) => {
  const [active, setActive] = useState(sections[0]);

  if (variant === 'stripe') {
    return (
      <div className="md:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 px-6 flex gap-6 overflow-x-auto no-scrollbar shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-8">
         {sections.map(s => (
           <a href={`#${s.toLowerCase()}`} key={s} onClick={()=>setActive(s)} className={`text-[13px] font-semibold tracking-wide uppercase whitespace-nowrap transition-colors ${active===s ? 'text-blue-600': 'text-gray-400'}`}>{s}</a>
         ))}
      </div>
    );
  }
  if (variant === 'macpaw') {
    return (
      <div className="sticky top-24 z-40 flex justify-center w-full mb-12 pointer-events-none">
         <div className="bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] border border-gray-200/50 p-1.5 rounded-full flex gap-1 pointer-events-auto">
            {sections.map(s => (
              <a href={`#${s.toLowerCase()}`} key={s} onClick={()=>setActive(s)} className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all ${active===s ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>{s}</a>
            ))}
         </div>
      </div>
    );
  }
  if (variant === 'realmac') {
    return (
      <div className="sticky top-[72px] z-40 bg-[#FAFAFA]/95 backdrop-blur-md py-4 mb-12 flex gap-3 overflow-x-auto no-scrollbar border-b-[3px] border-gray-100 px-2 justify-center">
         {sections.map(s => (
            <a href={`#${s.toLowerCase()}`} key={s} onClick={()=>setActive(s)}
              className={`px-4 py-2 rounded-xl text-[14px] font-bold transition-transform active:scale-95 ${active===s ? 'bg-[#2D5CF3] text-white shadow-[0_4px_10px_rgba(45,92,243,0.3)]' : 'bg-white text-gray-500 shadow-sm border-[2px] border-gray-100'}`}>{s}</a>
         ))}
      </div>
    );
  }
  if (variant === 'apple') {
    return (
      <div className="sticky top-12 z-40 bg-[#1d1d1f]/80 backdrop-blur-2xl border-b border-[#333336] py-3 mb-16 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
         <div className="max-w-[800px] mx-auto px-6 flex gap-8 overflow-x-auto no-scrollbar justify-center">
            {sections.map(s => (
              <a href={`#${s.toLowerCase()}`} key={s} onClick={()=>setActive(s)} className={`text-[12px] font-semibold tracking-wider uppercase whitespace-nowrap transition-colors ${active===s ? 'text-white' : 'text-[#86868b] hover:text-[#f5f5f7]'}`}>{s}</a>
            ))}
         </div>
      </div>
    );
  }
  if (variant === 'ios') {
    return (
      <div className="sticky top-14 z-40 bg-[#FDFDFD]/90 backdrop-blur-2xl border-b border-gray-200 py-3 mb-8 px-6 flex gap-2 overflow-x-auto no-scrollbar justify-center shadow-sm">
         {sections.map(s => (
            <a href={`#${s.toLowerCase()}`} key={s} onClick={()=>setActive(s)} className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${active===s ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{s}</a>
         ))}
      </div>
    );
  }
  return null;
}

// Renderer for the rest of the site's contents to answer the user's request
const OtherPagesContent = ({ page, go, inverse = false }: { page: PageId, go: (p: PageId) => void, inverse?: boolean }) => {
  const t = TRANSLATIONS_EN;
  const tc = inverse ? 'text-gray-300' : 'text-gray-600';
  const th = inverse ? 'text-white' : 'text-gray-900';
  const cardBg = inverse ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100';

  if (page === 'home') return (
    <div className="pb-20">
      <div className="pt-40 max-w-[900px] mx-auto text-center px-6 pb-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[14px] text-emerald-700 font-medium">{t.hero.availability}</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}><h1 className={`text-5xl md:text-7xl font-semibold tracking-tighter mb-6 leading-[0.95] ${th}`}>{t.hero.title}, {t.hero.subtitle}</h1></Reveal>
        <Reveal delay={0.1}><p className={`text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed ${tc}`}>{t.hero.desc.slice(0, 200)}.</p></Reveal>
        <Reveal delay={0.15}>
          <div className="flex gap-3 justify-center">
            <button onClick={() => go('work')} className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-[16px] shadow-xl hover:bg-gray-800 transition flex items-center gap-2">View work <ArrowRight size={16} /></button>
            <button onClick={() => go('about')} className="px-8 py-4 border border-gray-200 text-gray-600 rounded-full font-semibold text-[16px] hover:bg-gray-50 transition">About me</button>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="max-w-[1200px] mx-auto px-6 mb-20">
          <div className={`rounded-3xl overflow-hidden ${cardBg} border cursor-pointer group`} onClick={() => go('case')}>
            <div className="overflow-hidden"><img src={PROJECTS[0].coverImage} className="w-full aspect-[21/9] object-cover group-hover:scale-[1.02] transition-transform duration-700" alt="" /></div>
            <div className="p-8">
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">{PROJECTS[0].role} · {PROJECTS[0].period}</span>
              <h3 className={`text-2xl font-semibold mt-2 mb-2 group-hover:text-blue-600 transition-colors ${th}`}>{PROJECTS[0].title}</h3>
              <p className={`text-base leading-relaxed max-w-lg ${tc}`}>{PROJECTS[0].summary}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="max-w-[1200px] mx-auto px-6 mb-20">
        <Reveal><h2 className={`text-3xl font-semibold tracking-tight mb-10 ${th}`}>Selected work</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.slice(1, 5).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div onClick={() => go('case')} className={`cursor-pointer group rounded-2xl overflow-hidden ${cardBg} border hover:shadow-lg hover:shadow-gray-900/[0.04] transition-all`}>
                <div className="overflow-hidden"><img src={p.coverImage} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.03] transition-transform duration-500" alt="" /></div>
                <div className="p-5">
                  <h3 className={`text-lg font-semibold group-hover:text-blue-600 transition-colors ${th}`}>{p.title}</h3>
                  <p className={`text-[14px] mt-1 ${tc}`}>{p.role} · {p.period}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mb-20">
        <Reveal><h2 className={`text-3xl font-semibold tracking-tight mb-10 ${th}`}>Expertise</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops.' },
            { icon: Layout, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, rapid MVP development.' },
            { icon: Cpu, title: 'Leadership & Ops', desc: 'Design systems, dev handoff, team management.' },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={`p-7 rounded-2xl ${cardBg} border`}>
                <p.icon size={28} weight="regular" className={th} />
                <h3 className={`text-lg font-semibold mt-4 mb-2 ${th}`}>{p.title}</h3>
                <p className={`text-[15px] leading-relaxed ${tc}`}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 text-center py-16">
        <Reveal>
          <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${th}`}>Let&apos;s work together</h2>
          <p className={`text-lg mb-8 ${tc}`}>Currently available for product design missions.</p>
          <button onClick={() => go('about')} className="px-7 py-3.5 bg-gray-900 text-white rounded-full font-semibold">Contact me</button>
        </Reveal>
      </div>
    </div>
  );

  if (page === 'work') return (
    <div className="pt-40 max-w-[1200px] mx-auto px-6 pb-20">
      <Reveal><h1 className={`text-5xl font-semibold tracking-tighter mb-4 ${th}`}>Work</h1></Reveal>
      <Reveal delay={0.05}><p className={`text-xl mb-16 max-w-lg ${tc}`}>Products shipped across B2B SaaS, EdTech, GovTech, and AI-assisted design.</p></Reveal>
      <div className="space-y-12">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <div onClick={() => go('case')} className="cursor-pointer group">
              <div className={`rounded-2xl overflow-hidden ${cardBg} border hover:shadow-xl hover:shadow-gray-900/[0.05] transition-all`}>
                <div className="overflow-hidden"><img src={p.coverImage} className="w-full aspect-[21/9] object-cover group-hover:scale-[1.02] transition-transform duration-700" alt="" /></div>
                <div className="p-6 md:p-8">
                  <div className="flex items-baseline gap-4 mb-2">
                    <h2 className={`text-xl font-semibold group-hover:text-blue-600 transition-colors ${th}`}>{p.title}</h2>
                    <span className="text-[13px] text-gray-300 font-mono">{p.period}</span>
                  </div>
                  <p className={`text-[14px] mb-2 ${tc}`}>{p.role}</p>
                  <p className={`text-base leading-relaxed max-w-lg ${tc}`}>{p.summary}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );

  if (page === 'about') return (
    <div className="pt-40 max-w-[800px] mx-auto px-6 pb-40">
      <Reveal><h1 className={`text-5xl font-semibold mb-10 ${th}`}>{t.bio.title}</h1></Reveal>
      <Reveal delay={0.05}><p className={`text-lg leading-relaxed mb-6 ${tc}`}>{t.bio.p1}</p></Reveal>
      <Reveal delay={0.1}><p className={`text-lg leading-relaxed mb-6 ${tc}`}>{t.bio.p2}</p></Reveal>
      <Reveal delay={0.15}>
        <h2 className={`text-2xl font-semibold mt-12 mb-6 ${th}`}>Experience</h2>
        <div className={`space-y-4 text-base leading-relaxed ${tc}`}>
          {['2024: France VAE / Beta.gouv, Lead Product Designer', '2023: Toolkit, Founding Designer', '2018-2024: UNOWHY / SQOOL, Product Design Manager', '2017: Dailymotion, Senior Product Designer', '2014-2017: PagesJaunes, Mobile UI Lead'].map((line, i) => (
            <Reveal key={i} delay={0.15 + i * 0.04}><p>{line}</p></Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );

  if (page === 'blog') return (
    <div className="pt-40 max-w-[1200px] mx-auto px-6 pb-40">
      <Reveal><h1 className={`text-5xl font-semibold mb-4 ${th}`}>{t.signals.title}</h1></Reveal>
      <Reveal delay={0.05}><p className={`text-xl mb-16 max-w-lg ${tc}`}>{t.signals.subtitle}</p></Reveal>
      <Reveal delay={0.08}>
        <div className={`rounded-2xl overflow-hidden ${cardBg} border mb-8 cursor-pointer group`}>
          <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
            <div className="w-full md:w-48 rounded-xl overflow-hidden bg-gray-50 shrink-0">
              <img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full aspect-[16/10] object-cover" />
            </div>
            <div>
              <span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · 9 chapters</span>
              <h2 className={`text-xl font-semibold mb-2 mt-2 group-hover:text-blue-600 transition-colors ${th}`}>Getting started with Claude Code</h2>
              <p className={`text-base leading-relaxed ${tc}`}>Complete guide for designers: from installation to deployment.</p>
            </div>
          </div>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5">
        {SIGNALS.slice(0, 6).map((a, i) => (
          <Reveal key={a.id} delay={0.1 + i * 0.04}>
            <div className={`cursor-pointer group rounded-xl p-6 ${cardBg} border hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all`}>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{a.category} · {a.date}</span>
              <h3 className={`text-[17px] font-semibold mt-2 mb-3 group-hover:text-blue-600 transition-colors leading-snug ${th}`}>{a.title_en}</h3>
              <p className={`text-[15px] leading-relaxed line-clamp-3 ${tc}`}>{a.body_en.slice(0, 200)}...</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );

  if (page === 'gallery') return (
    <div className="pt-40 max-w-[1400px] mx-auto px-6 pb-20">
      <Reveal><h1 className={`text-5xl font-semibold mb-4 ${th}`}>Interface Work</h1></Reveal>
      <Reveal delay={0.05}><p className={`text-xl mb-16 max-w-lg ${tc}`}>A selection of interfaces designed over the years.</p></Reveal>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
        {[...Array.from({ length: 10 }, (_, i) => '/images/visuels UI/' + (1100 + i) + '_1_5x.webp'), ...Array.from({ length: 7 }, (_, i) => '/images/visuels UI/' + (100 + i) + '_1_5x.webp'), ...Array.from({ length: 9 }, (_, i) => '/images/visuels UI/' + (1000 + i) + '_1_5x.webp')].map((img, i) => (
          <Reveal key={i} delay={Math.min(i * 0.02, 0.2)}>
            <div className="break-inside-avoid rounded-xl overflow-hidden bg-[#F5F5F7] group cursor-pointer">
              <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
  return null;
}


/* ═══════════════════════════════════════════════════════════════
   V33: GEMINI STRIPE EDITORIAL
   Flat text, slanted backgrounds, sticky nav highlights, deep elevated images
   ═══════════════════════════════════════════════════════════════ */
export function V33() {
  const { page, go } = usePageNav();
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-200 overflow-x-hidden w-full" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <motion.header 
        className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
        style={{ opacity: page === 'case' ? headerOpacity : 1 }}
      >
        <div className="max-w-[1240px] mx-auto h-16 flex items-center justify-between px-6">
          <span className="font-semibold text-[15px] tracking-tight">Victor Soussan.</span>
          <nav className="flex gap-6">
            {pageLabels.slice(0,5).map(p => (
              <button key={p} onClick={() => go(p)} className={`text-[14px] font-semibold capitalize transition-colors ${page === p ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{p}</button>
            ))}
          </nav>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {page === 'case' ? (
            <main>
              <div className="relative pt-32 pb-40 overflow-hidden bg-gray-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1)_0%,transparent_50%)] pointer-events-none" />
                 <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                      <span className="inline-block py-1.5 px-3 rounded-full bg-blue-100 text-blue-700 text-[13px] font-semibold uppercase tracking-widest mb-6">Case Study</span>
                      <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-gray-900 leading-[1.05] mb-6">{TOOLKIT.hero.title}</h1>
                      <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">{TOOLKIT.hero.subtitle}</p>
                    </motion.div>
                 </div>
              </div>

              <div className="max-w-[900px] mx-auto px-6 -mt-16 relative z-20">
                 <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                   <div className="w-full aspect-video rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05),0_40px_100px_rgba(59,130,246,0.15)] overflow-hidden mb-20 border-[8px] border-white">
                      <img src={PROJECTS[0].coverImage} className="w-full h-full object-cover" alt="" />
                   </div>
                 </motion.div>

                 <div className="grid md:grid-cols-[200px_1fr] gap-12">
                   <div className="hidden md:block">
                     <div className="sticky top-32 flex flex-col gap-4 border-l-2 border-gray-100 pl-4">
                        {['Overview', 'Context', 'Impact'].map(s => (
                           <a href={`#${s.toLowerCase()}`} key={s} className="text-[14px] font-semibold text-gray-400 hover:text-blue-600 transition-colors">{s}</a>
                        ))}
                     </div>
                   </div>
                   <div className="editorial-content min-w-0 w-full overflow-hidden">
                     <StickyLocalNav sections={['Overview', 'Context', 'Impact']} variant="stripe" />
                     <p className="text-2xl text-gray-800 font-medium leading-relaxed mb-16 break-words">{TOOLKIT.hero.description}</p>
                     <ToolkitContent />
                   </div>
                 </div>
              </div>
            </main>
          ) : (
            <div className="pb-20">
              {page === 'blog' && <StickyLocalNav sections={['Introduction', 'Analysis', 'Conclusion']} variant="stripe" />}
              <OtherPagesContent page={page} go={go} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V34: GEMINI MACPAW ARTICLE
   Vast whitespace, massive typography, hyper-glossy inline elements
   ═══════════════════════════════════════════════════════════════ */
export function V34() {
  const { page, go } = usePageNav();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-[#1D1D1F]" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100, scale: isScrolled ? 1 : 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-2 py-2 bg-black text-white rounded-[100px] w-full max-w-[400px] shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)]"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-gray-600"><Compass weight="fill" /></div>
        <div className="flex gap-4 px-4 font-semibold text-[14px]">
          <button onClick={() => go('work')} className="hover:text-cyan-400 transition-colors">Work</button>
          <button onClick={() => go('case')} className="text-cyan-400">Toolkit</button>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_2px_10px_rgba(6,182,212,0.4),inset_0_2px_2px_rgba(255,255,255,0.5)] flex items-center justify-center border border-cyan-300">
           <ArrowRight weight="bold" className="text-white" />
        </div>
      </motion.header>

      {!isScrolled && (
        <header className="absolute top-0 inset-x-0 h-24 flex items-center justify-between px-8 z-40 text-black">
          <span className="font-semibold text-xl tracking-tighter">VICTOR</span>
          <nav className="flex gap-6 font-semibold text-[14px] uppercase tracking-wider text-gray-400">
            {pageLabels.map(p => <button key={p} onClick={()=>go(p)} className="hover:text-black transition-colors">{p}</button>)}
          </nav>
        </header>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {page === 'case' ? (
            <main>
               <div className="pt-40 max-w-[1000px] mx-auto px-6 text-center">
                 <h1 className="text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tighter leading-[0.9] text-black mb-8">{TOOLKIT.hero.title}</h1>
                 
                 <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-b from-white to-[#F2F2F7] shadow-[0_10px_20px_rgba(0,0,0,0.06),inset_0_2px_0_rgba(255,255,255,1)] border border-gray-200 mb-16">
                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 shadow-[inset_0_2px_2px_rgba(255,255,255,0.6)]" />
                    <span className="font-semibold text-[15px] text-gray-800 tracking-tight">{TOOLKIT.hero.subtitle}</span>
                 </div>
               </div>

               <div className="max-w-[760px] mx-auto px-6">
                 <div className="relative w-full aspect-[4/3] rounded-[40px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.08),inset_0_2px_2px_rgba(255,255,255,1)] border border-gray-100 p-3 mb-24 overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-700">
                    <img src={PROJECTS[0].coverImage} className="w-full h-full object-cover rounded-[28px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]" alt=""/>
                 </div>

                 <p className="text-[26px] font-semibold text-gray-900 leading-[1.4] tracking-tight mb-24">{TOOLKIT.hero.description}</p>
                 
                 <StickyLocalNav sections={['Overview', 'Context', 'Impact']} variant="macpaw" />
                 <ToolkitContent />
               </div>
            </main>
          ) : (
             <div className="pb-20">
               {page === 'blog' && <StickyLocalNav sections={['Introduction', 'Analysis', 'Conclusion']} variant="macpaw" />}
               <OtherPagesContent page={page} go={go} />
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V35: GEMINI REALMAC PLAYFUL
   Fun, chunky gradients, inline 3D icons, interactive toggles
   ═══════════════════════════════════════════════════════════════ */
export function V35() {
  const { page, go } = usePageNav();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#333333]" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-xl border-b-[3px] border-gray-100 flex items-center justify-center py-4">
        <div className="flex gap-2 p-1.5 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_2px_0_rgba(255,255,255,1)] border-[2px] border-gray-100">
          {pageLabels.map(p => (
            <button key={p} onClick={()=>go(p)} className={`px-5 py-2 rounded-full font-semibold text-[15px] capitalize transition-all ${page === p ? 'bg-[#2D5CF3] text-white shadow-[0_4px_12px_rgba(45,92,243,0.3),inset_0_2px_2px_rgba(255,255,255,0.3)]' : 'text-gray-500 hover:bg-gray-50'}`}>{p}</button>
          ))}
        </div>
      </header>

      <main className="max-w-[1120px] mx-auto pt-24 pb-32 px-6">
         {page === 'case' ? (
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-16">
                 <div className="w-24 h-24 mx-auto bg-gradient-to-b from-[#4B7BF5] to-[#2D5CF3] rounded-[32px] rotate-12 flex items-center justify-center shadow-[0_15px_30px_rgba(45,92,243,0.25),inset_0_4px_4px_rgba(255,255,255,0.5),inset_0_-4px_4px_rgba(0,0,0,0.1)] border-[3px] border-[#4B7BF5] mb-8">
                    <Layout weight="fill" size={48} className="text-white drop-shadow-md" />
                 </div>
                 <h1 className="text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">{TOOLKIT.hero.title}</h1>
                 
                 <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-2xl font-semibold text-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.06),0_2px_0_rgba(200,200,200,0.5)] active:translate-y-0.5 active:shadow-[0_2px_5px_rgba(0,0,0,0.06)] transition-all">
                    {expanded ? 'Hide Overview' : 'Read Full Overview'} <CaretDown size={18} weight="bold" className={`transition-transform duration-300 ${expanded ? 'rotate-180':''}`} />
                 </button>
              </div>

              <AnimatePresence>
                 {expanded && (
                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-16">
                      <div className="p-8 bg-white border-[3px] border-gray-100 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                         <p className="text-xl font-semibold text-gray-600 leading-relaxed">{TOOLKIT.hero.description}</p>
                      </div>
                   </motion.div>
                 )}
              </AnimatePresence>

              <StickyLocalNav sections={['Overview', 'Context', 'Impact']} variant="realmac" />
              <ToolkitContent />
           </motion.div>
         ) : (
           <div className="pb-20">
              {page === 'blog' && <StickyLocalNav sections={['Introduction', 'Analysis', 'Conclusion']} variant="realmac" />}
              <OtherPagesContent page={page} go={go} />
           </div>
         )}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V36: GEMINI APPLE HARDWARE
   Strict grid, large full-width text, parallax images
   ═══════════════════════════════════════════════════════════════ */
export function V36() {
  const { page, go } = usePageNav();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F7]" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-[#333336]">
         <div className="max-w-[1000px] mx-auto px-4 h-12 flex items-center justify-between text-[12px] font-semibold text-gray-400">
           <span className="text-white hover:text-white cursor-pointer" onClick={()=>go('home')}>Victor</span>
           <nav className="flex gap-6">
             {pageLabels.slice(0,4).map(p => <button key={p} onClick={()=>go(p)} className="hover:text-white transition-colors capitalize">{p}</button>)}
           </nav>
         </div>
      </header>
      
      <main className="overflow-hidden">
        <AnimatePresence mode="wait">
           {page === 'case' ? (
             <motion.div key="case" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                
                <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
                   <Reveal y={20}>
                     <h2 className="text-[21px] font-semibold text-[#86868b] tracking-wide mb-2">Pro Design.</h2>
                     <h1 className="text-[clamp(40px,8vw,80px)] font-semibold text-[#f5f5f7] leading-tight tracking-tight mb-8">{TOOLKIT.hero.title}</h1>
                     <p className="text-[24px] font-semibold text-[#86868b]">{TOOLKIT.hero.subtitle}</p>
                     
                     <div className="mt-12 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-gray-200 transition-colors cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Explore <CaretDown size={16} />
                     </div>
                   </Reveal>
                </section>

                 <StickyLocalNav sections={['Overview', 'Context', 'Impact']} variant="apple" />
                 <motion.section style={{ scale }} className="relative bg-[#1d1d1f] py-32 rounded-[40px] z-10 mx-4 lg:mx-auto max-w-[1200px] shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.1)] mb-32 overflow-hidden border border-[#333336]">
                    <div className="max-w-[800px] mx-auto px-6">
                      <ToolkitContent />
                    </div>
                 </motion.section>

              </motion.div>
            ) : (
              <div className="pb-20">
                 {page === 'blog' && <StickyLocalNav sections={['Introduction', 'Analysis', 'Conclusion']} variant="apple" />}
                 <OtherPagesContent page={page} go={go} inverse={true} />
              </div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V37: GEMINI INTERACTIVE iOS
   Dynamic title scaling into header, Accordion disclosures
   ═══════════════════════════════════════════════════════════════ */
export function V37() {
  const { page, go } = usePageNav();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 100], [0, -40]);
  const titleScale = useTransform(scrollY, [0, 100], [1, 0.6]);
  const titleOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const headerOpacity = useTransform(scrollY, [80, 100], [0, 1]);

  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const Accordion = ({ index, title, children }: { index: number, title: string, children: React.ReactNode }) => {
    const isActive = activeAccordion === index;
    return (
      <div className="border-b border-gray-200 py-6">
         <button className="w-full flex justify-between items-center text-left" onClick={() => setActiveAccordion(isActive ? null : index)}>
           <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
           <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.3)] rotate-180': 'bg-gray-100 text-gray-500'}`}>
              <CaretDown size={16} weight="bold" />
           </div>
         </button>
         <AnimatePresence>
           {isActive && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                 <div className="pt-6 pb-2 text-lg text-gray-600 leading-relaxed font-medium">
                   {children}
                 </div>
              </motion.div>
           )}
         </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 inset-x-0 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50 flex items-center justify-center"
      >
        <span className="font-semibold text-gray-900">{TOOLKIT.hero.title}</span>
      </motion.header>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-1.5 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        {pageLabels.map(p => (
           <button key={p} onClick={()=>go(p)} className={`px-4 py-2 rounded-full font-semibold text-[14px] capitalize transition-colors ${page === p ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>{p}</button>
        ))}
      </nav>

      <main className="max-w-[700px] mx-auto pt-32 pb-40 px-6">
         <AnimatePresence mode="wait">
            {page === 'case' ? (
              <motion.div key="case" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 
                 <motion.div style={{ y: titleY, scale: titleScale, opacity: titleOpacity, transformOrigin: 'top left' }} className="mb-16">
                    <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-2 block">Case Study</span>
                    <h1 className="text-4xl font-semibold text-gray-900 tracking-tight leading-tight">{TOOLKIT.hero.title}</h1>
                 </motion.div>

                 <div className="w-full aspect-square md:aspect-video rounded-[32px] bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-[0_20px_40px_rgba(37,99,235,0.2),inset_0_2px_4px_rgba(255,255,255,0.4)] mb-16">
                    <div className="w-full h-full rounded-[28px] overflow-hidden bg-gray-900 border border-black/20 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]">
                       <img src={PROJECTS[0].coverImage} className="w-full h-full object-cover opacity-90" alt=""/>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <Accordion index={0} title="The Challenge">
                      {TOOLKIT.context.intro} <br/><br/>
                      {TOOLKIT.context.coreChallengeDesc}
                    </Accordion>
                    <Accordion index={1} title="Product Evolution">
                      {TOOLKIT.overview.projectP1} <br/><br/>
                      {TOOLKIT.overview.projectP2}
                    </Accordion>
                    <Accordion index={2} title="Design System & Ops">
                      {TOOLKIT.designSystem.intro} <br/><br/>
                      {TOOLKIT.designSystem.dsDesc}
                    </Accordion>
                    <Accordion index={3} title="Business Impact">
                      {TOOLKIT.impact.intro}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"><span className="block text-2xl font-semibold text-gray-900">{TOOLKIT.impact.customers}</span><span className="text-sm text-gray-600 font-medium">{TOOLKIT.impact.customersDesc}</span></div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"><span className="block text-2xl font-semibold text-gray-900">{TOOLKIT.impact.seriesA}</span><span className="text-sm text-gray-600 font-medium">{TOOLKIT.impact.seriesADesc}</span></div>
                      </div>
                    </Accordion>
                 </div>
              </motion.div>
            ) : (
              <div className="pb-20 pt-20">
                 {page === 'blog' && <StickyLocalNav sections={['Introduction', 'Analysis', 'Conclusion']} variant="ios" />}
                 <OtherPagesContent page={page} go={go} />
              </div>
            )}
         </AnimatePresence>
      </main>
    </div>
  );
}
