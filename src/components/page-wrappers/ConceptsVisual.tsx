'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, BookOpen, PencilSimple, Compass, UsersThree } from '@phosphor-icons/react';
import { StickyLayer, SectionProgress, ContinueReading, TestimonialScroller, ProjectNavigator, ExpandCollapse } from './ConceptSharedUI';

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };
const springBounce = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";

/* ═══ UI VISUALS (real paths from /images/visuels UI/) ═══ */
const UI = {
  scrim: Array.from({ length: 7 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`),
  toolkit: Array.from({ length: 10 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`),
  sqool: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1000 + i}_1_5x.webp`),
  misc: Array.from({ length: 9 }, (_, i) => `/images/visuels UI/${1700 + i}_1_5x.webp`),
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP, I translated the founders\' vision into a product that field managers actually want to use.', cover: '/images/thumbnail-toolkit.webp', category: 'SaaS B2B', deliverables: ['SaaS Platform', 'Gantt Module', 'Admin Panels', 'Brand Identity', 'Pitch Deck', 'Design System'] },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'Structuring product ops for a national public service scaling to 100K+ candidates.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'GovTech', deliverables: ['VAE Collective MVP', 'Research Protocol', 'Design Ops', 'Promo Video'] },
  { id: 'dailymotion', title: 'Dailymotion Partner', role: 'Senior Product Designer', period: '2017-2018', summary: 'Redesigning the professional video management suite for CBS, Bein Sports, and other tier-1 media partners.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Media Tech', deliverables: ['Live Dashboard', 'Batch Upload', 'Pattern Library', 'Mobile App'] },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'Leading the design transformation of a hardware company into an EdTech SaaS ecosystem serving 500K+ students.', cover: '/images/thumbnail-sqool-suite.webp', category: 'EdTech B2G', deliverables: ['SQOOL Classe', 'SQOOL MDM', 'Design System', 'Comex Decks'] },
  { id: 'pagesjaunes', title: 'PagesJaunes', role: 'Mobile UI Lead', period: '2014-2017', summary: 'Mobile-first modernization for 22M+ users across iOS, Android, and Web.', cover: '/images/thumbnail-pagesjaunes-multidevices.webp', category: 'Consumer', deliverables: ['iOS/Android Apps', 'Onboarding', 'Wearable Prototype', 'Search UI'] },
];

const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys." },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
];

const PILLARS = [
  { icon: PencilSimple, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, rapid MVP development.' },
  { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops.' },
  { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, dev handoff, team management.' },
];

const RESOURCES = [
  { id: 'guide-claude-code', type: 'guide' as const, title: 'Getting started with Claude Code', desc: 'Complete guide for designers: from installation to deployment.', chapters: 9, cover: '/images/guide-claude-code/hero-cover.png' },
  { id: 'ai-design-workflows', type: 'article' as const, title: 'AI-assisted design workflows', desc: 'How AI changes the way designers prototype, test, and ship.' },
  { id: 'design-system-figma', type: 'article' as const, title: 'Design System with Claude Code', desc: 'Figma to code with zero drift.' },
];

const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'gallery';

/* ═══ UTILITIES ═══ */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay, ...spring }} className={className}>{children}</motion.div>;
}

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

/* ═══════════════════════════════════════════════════════════════════════
   VARIANTE A: LCA EDITORIAL
   Narrow text (max-w-[800px]) + immense breakout visuals
   Focus on interface detail, tight crops, pixel precision
   ═══════════════════════════════════════════════════════════════════════ */

function AHome({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <section className="py-28 md:py-40 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[13px] text-emerald-700 font-medium">Available for new projects</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-8">
              I design interfaces<br />people rely on<span className="text-gray-300">.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[19px] text-gray-500 leading-[1.7] mb-10 max-w-[600px]">
              Lead Product Designer with 15 years of experience. I help teams frame the problem, prototype fast, and ship products that work in real conditions.
            </p>
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

      {/* Immense visual break */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
            <img src={UI.toolkit[0]} alt="Interface detail" className="w-full" loading="lazy" />
          </div>
        </div>
      </FadeUp>

      {/* Projects list */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em]">Selected work</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mt-2 mb-12">Projects</h2>
          </FadeUp>
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.04}>
              <motion.div whileHover={{ x: 4 }} transition={springBounce} onClick={() => go('case')}
                className="group flex items-center gap-6 py-6 border-b border-gray-100 cursor-pointer last:border-b-0">
                <span className="text-[12px] text-gray-300 font-mono w-6 tabular-nums">0{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em] group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-[14px] text-gray-400 mt-0.5">{p.role} · {p.period}</p>
                </div>
                <span className="text-[12px] text-gray-300 font-medium hidden md:block">{p.category}</span>
                <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Full-width visual grid */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 gap-3">
            {UI.scrim.slice(0, 4).map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-[#F5F5F7]">
                <img src={img} alt="" className="w-full" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Expertise */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2>
          </FadeUp>
          {PILLARS.map((pillar, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="flex gap-5 py-6 border-b border-gray-100 last:border-b-0">
                <pillar.icon size={24} weight="regular" className="text-gray-900 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-1">{pillar.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Testimonials horizontal scroll */}
      <section className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <TestimonialScroller testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeUp>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
            <p className="text-[17px] text-gray-400 mb-8">Currently available for product design missions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-7 py-3.5 bg-gray-900 text-white rounded-full text-[15px] font-semibold flex items-center justify-center gap-2">Book a call <Calendar size={16} /></motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-7 py-3.5 rounded-full text-[15px] text-gray-500 border border-gray-200 flex items-center justify-center gap-2">Email <Envelope size={16} /></motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContinueReading items={[
        { label: 'Work', desc: 'All projects and case studies', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'Interface Work', desc: 'UI craft up close', image: UI.toolkit[1], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years of context', onClick: () => go('about') },
      ]} />
    </div>
  );
}

function ACase({ go }: { go: (p: PageId) => void }) {
  const p = PROJECTS[0];
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionNames = ['Context', 'Vision', 'Research', 'Design System', 'Key Screens', 'Outcome'];

  return (
    <div style={{ fontFamily: font }}>
      <SectionProgress sections={sectionNames} />

      {/* Back + metadata */}
      <section className="pt-20 pb-12 px-6" id="cs-section-0">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('work')}
              className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-10 transition-colors">
              <ArrowLeft size={14} /> Back to work
            </motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <div className="flex items-center gap-6 text-[14px] text-gray-400 mb-8">
              <div className="flex items-center gap-1.5"><span className="font-semibold text-gray-900">Role</span><span>·</span><span>{p.role}</span></div>
              <div className="flex items-center gap-1.5"><span className="font-semibold text-gray-900">Period</span><span>·</span><span>{p.period}</span></div>
              <div className="flex items-center gap-1.5"><span className="font-semibold text-gray-900">Focus</span><span>·</span><span>{p.category}</span></div>
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-normal tracking-[-0.03em] leading-[1.1] mb-8">
              Designing a construction management platform for the <span className="italic font-medium">real world.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="text-[18px] text-gray-500 leading-[1.75]">{p.summary}</p>
          </FadeUp>
        </div>
      </section>

      {/* Hero visual: IMMENSE, breakout */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLightbox(p.cover)}>
            <img src={p.cover} alt={p.title} className="w-full hover:scale-[1.01] transition-transform duration-700" />
          </div>
          <p className="text-[14px] text-gray-400 mt-4 text-center max-w-[800px] mx-auto">Toolkit platform overview: planning, task management, and field coordination.</p>
        </div>
      </FadeUp>

      {/* Vision */}
      <section className="py-24 px-6" id="cs-section-1">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Vision</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-normal tracking-[-0.02em] leading-[1.15]">
              A tool built for people who build with their <span className="italic font-medium">hands.</span>
            </h2>
          </FadeUp>
        </div>
      </section>

      {/* Research section with immense visuals */}
      <section id="cs-section-2">
        <div className="max-w-[800px] mx-auto px-6 pb-12">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Research</span>
            <p className="text-[18px] text-gray-500 leading-[1.75] mb-4">Two weeks on active construction sites before opening Figma. The key insight: their day is structured around interruptions, not workflows. Every tool they use must survive being dropped, ignored for 20 minutes, and picked back up in direct sunlight.</p>
            <ExpandCollapse
              preview="Three forces shaped every design decision. First, users who work with gloves in direct sunlight. Second, intermittent connectivity on most construction sites."
              full="Three forces shaped every design decision. First, users who work with gloves in direct sunlight, meaning every touch target needs to be at least 56px and contrast ratios need to exceed AAA standards. Second, intermittent connectivity on most construction sites, which demanded an optimistic UI architecture where every action feels instant even when the network is unreliable. Third, competing against established habits: Excel sheets, WhatsApp groups, and paper plans that have the advantage of being infinitely flexible."
            />
          </FadeUp>
        </div>

        {/* Breakout: 2-column immense visuals */}
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLightbox(UI.toolkit[0])}>
                <img src={UI.toolkit[0]} alt="High contrast UI for field conditions" className="w-full hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLightbox(UI.toolkit[1])}>
                <img src={UI.toolkit[1]} alt="Planning module with drag-and-drop" className="w-full hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
              </div>
            </div>
            <div className="max-w-[800px] mx-auto mt-4 grid grid-cols-2 gap-x-8">
              <p className="text-[14px] text-gray-400 leading-relaxed">High-contrast interface designed for direct sunlight. 56px minimum touch targets across every interactive element.</p>
              <p className="text-[14px] text-gray-400 leading-relaxed">Gantt-based planning module adapted for non-technical users. Drag-and-drop task scheduling with offline sync.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Design System section */}
      <section className="py-24 px-6" id="cs-section-3">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Design system</span>
            <p className="text-[18px] text-gray-500 leading-[1.75]">Built a lightweight, mobile-first component system optimized for field conditions. 40+ components designed for Tailwind integration, enabling the CTO to implement designs directly from the Figma source. The design system was the contract between designer and engineer.</p>
          </FadeUp>
        </div>

        {/* Single immense visual */}
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4 mt-12">
            <div className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLightbox(UI.toolkit[2])}>
              <img src={UI.toolkit[2]} alt="Design system components" className="w-full hover:scale-[1.01] transition-transform duration-700" loading="lazy" />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Key Screens: 3-column breakout grid */}
      <section className="py-12" id="cs-section-4">
        <div className="max-w-[800px] mx-auto px-6 mb-8">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Key screens</span>
            <p className="text-[18px] text-gray-500 leading-[1.75]">A selection of interface details showing the level of precision in the final product. Every component was designed to work in the worst conditions a construction site can offer.</p>
          </FadeUp>
        </div>
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {UI.toolkit.slice(3, 9).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer group" onClick={() => setLightbox(img)}>
                  <img src={img} alt="" className="w-full group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Testimonial inline */}
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

      {/* Outcome */}
      <section className="py-16 px-6" id="cs-section-5">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Outcome</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-normal tracking-[-0.02em] leading-[1.15] mb-8">
              From two weeks on-site to a <span className="italic font-medium">shipped product.</span>
            </h2>
            <ul className="space-y-3 mb-10">
              {['MVP shipped in 6 months', 'Pilot on 3 active construction sites', 'Seed round secured on product demo', 'UI system reusable across web and mobile'].map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-[17px] text-gray-600"><span className="text-emerald-500 mt-0.5">&#10003;</span>{o}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {p.deliverables.map(d => <span key={d} className="px-3 py-1.5 rounded-full bg-gray-50 text-[14px] text-gray-600 border border-gray-100">{d}</span>)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Closing immense visual */}
      <FadeUp>
        <div className="max-w-[1400px] mx-auto px-4 pb-16">
          <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] cursor-pointer" onClick={() => setLightbox(UI.toolkit[9])}>
            <img src={UI.toolkit[9]} alt="Final product" className="w-full hover:scale-[1.01] transition-transform duration-700" loading="lazy" />
          </div>
        </div>
      </FadeUp>

      <ProjectNavigator projects={PROJECTS} currentIdx={0} onSelect={() => go('case')} />
      <ContinueReading items={[
        { label: 'All projects', desc: 'Browse work', image: PROJECTS[1].cover, onClick: () => go('work') },
        { label: 'Interface Work', desc: 'UI craft up close', image: UI.scrim[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'Background and approach', onClick: () => go('about') },
      ]} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setLightbox(null)}>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"><X size={24} /></motion.button>
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={springBounce}
              src={lightbox} alt="" className="max-w-[95vw] max-h-[90vh] rounded-lg object-contain" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AWork({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[18px] text-gray-500 leading-[1.7] mb-12">Products I helped frame, design, and ship across B2B SaaS, EdTech, GovTech, and AI-assisted design.</p></FadeUp>
        </div>
      </section>
      {PROJECTS.map((p, i) => (
        <FadeUp key={p.id} delay={i * 0.04}>
          <section className="pb-20 px-6">
            <div className="max-w-[800px] mx-auto mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="text-[22px] font-bold tracking-[-0.02em]">{p.title}</h2>
                <span className="text-[13px] text-gray-300 font-mono">{p.period}</span>
              </div>
              <p className="text-[14px] text-gray-400 mb-2">{p.role} · {p.category}</p>
              <p className="text-[16px] text-gray-500 leading-relaxed">{p.summary}</p>
            </div>
            <div className="max-w-[1400px] mx-auto px-0">
              <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.5 }} onClick={() => go('case')}
                className="rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer">
                <img src={p.cover} alt={p.title} className="w-full" loading="lazy" />
              </motion.div>
            </div>
          </section>
        </FadeUp>
      ))}
      <ContinueReading items={[
        { label: 'Interface Work', desc: 'UI craft up close', image: UI.toolkit[0], onClick: () => go('gallery') },
        { label: 'About', desc: 'Background and approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

function AAbout({ go }: { go: (p: PageId) => void }) {
  const timeline = [
    { year: '2025', role: 'Independent', company: 'Condamine Studio', desc: 'AI-assisted design, 50+ web apps shipped' },
    { year: '2024', role: 'Lead Product Designer', company: 'France VAE / Beta.gouv', desc: 'National public service, 100K+ users' },
    { year: '2023', role: 'Founding Designer', company: 'Toolkit', desc: '0-to-1 SaaS, seed round' },
    { year: '2018', role: 'Product Design Manager', company: 'UNOWHY / SQOOL', desc: 'Team of 4, 8 apps, 500K+ students' },
    { year: '2017', role: 'Senior Product Designer', company: 'Dailymotion', desc: 'Video suite, CBS/Bein' },
    { year: '2014', role: 'Mobile UI Lead', company: 'PagesJaunes', desc: '22M users, iOS/Android' },
  ];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-8">About</h1></FadeUp>
          <FadeUp delay={0.05}>
            <ExpandCollapse
              preview="I started in tech 15 years ago as a visual designer at a small Parisian agency, making websites for luxury brands. Today I work as a Lead Product Designer on complex B2B and B2G interfaces."
              full="I started in tech 15 years ago as a visual designer at a small Parisian agency, making websites for luxury brands. Today I work as a Lead Product Designer on complex B2B and B2G interfaces: SaaS platforms, EdTech ecosystems, public service digital products.\n\nMy current focus is on AI-assisted design workflows. I use Claude Code daily and have published a 9-chapter guide on the subject. I believe the best product design is invisible: it makes the user feel competent, not impressed.\n\nBased in Paris. French and English, on-site or remote."
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
          <FadeUp delay={0.15}>
            <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-16 mb-6">Companies</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LOGOS.map(n => <span key={n} className="text-[14px] text-gray-300 font-medium">{n}</span>)}
            </div>
          </FadeUp>
        </div>
      </section>
      <ContinueReading items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
        { label: 'Interface Work', desc: 'UI craft up close', onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

function ABlog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-12">Resources</h1></FadeUp>
          <FadeUp delay={0.05}>
            <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-gray-100 mb-8 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-blue-500" /><span className="text-[12px] text-blue-500 font-bold uppercase tracking-wider">Guide · {RESOURCES[0].chapters} chapters</span></div>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-2 group-hover:text-blue-600 transition-colors">{RESOURCES[0].title}</h2>
              <p className="text-[16px] text-gray-500 leading-relaxed">{RESOURCES[0].desc}</p>
            </div>
          </FadeUp>
          {RESOURCES.slice(1).map((r, i) => (
            <FadeUp key={r.id} delay={0.08 + i * 0.04}>
              <div className="py-5 border-b border-gray-100 cursor-pointer group last:border-b-0">
                <h3 className="text-[17px] font-semibold group-hover:text-blue-600 transition-colors">{r.title}</h3>
                <p className="text-[14px] text-gray-400 mt-1">{r.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}

function AGallery({ go }: { go: (p: PageId) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const allImages = [...UI.toolkit, ...UI.scrim, ...UI.sqool, ...UI.misc];
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[18px] text-gray-500 leading-[1.7] mb-12">A selection of interfaces designed over the years. Click any image to zoom in on the details.</p></FadeUp>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {allImages.map((img, i) => (
            <FadeUp key={i} delay={Math.min(i * 0.03, 0.3)}>
              <div className="break-inside-avoid rounded-xl overflow-hidden bg-[#F5F5F7] cursor-pointer group" onClick={() => setLightbox(img)}>
                <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setLightbox(null)}>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"><X size={24} /></motion.button>
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={springBounce} src={lightbox} alt="" className="max-w-[95vw] max-h-[90vh] rounded-lg object-contain" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
      <ContinueReading items={[
        { label: 'Work', desc: 'Full case studies', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'About', desc: 'Background and approach', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and articles', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   VARIANTE B: FULL-WIDTH IMMERSIVE
   Full-bleed everything, giant cards, colorful gradient backgrounds
   behind UI screenshots, skeuomorphic touches
   ═══════════════════════════════════════════════════════════════════════ */

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

function BHome({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      {/* Hero: full-width gradient */}
      <section className="min-h-[100dvh] flex items-center px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #E8E0F0 0%, #D4E4F7 30%, #E0F4E8 60%, #F8F0E0 100%)' }}>
        <div className="max-w-[1400px] mx-auto w-full py-20">
          <div className="max-w-[700px]">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg shadow-black/[0.03] mb-10">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[14px] text-gray-700 font-medium">Available for new projects</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-8 text-gray-900">
                Product<br />Designer<span className="text-violet-400">.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-[20px] text-gray-600 leading-[1.6] mb-10 max-w-[560px]">15 years designing interfaces for construction sites, classrooms, newsrooms, and living rooms. I work end-to-end.</p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={springBounce} onClick={() => go('work')}
                  className="group px-8 py-4 bg-gray-900 text-white rounded-2xl text-[16px] font-semibold flex items-center gap-2 shadow-xl shadow-gray-900/20">
                  View work <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Projects: giant cards with gradient backgrounds */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-16">Selected work</h2>
          </FadeUp>
          <div className="space-y-8">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeUp key={p.id} delay={0.05}>
                <motion.div whileHover={{ y: -4 }} transition={springBounce} onClick={() => go('case')}
                  className="rounded-3xl overflow-hidden cursor-pointer group" style={{ background: gradients[i % gradients.length] }}>
                  <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 text-white min-w-0">
                      <span className="text-[13px] font-bold uppercase tracking-wider opacity-70 block mb-3">{p.category} · {p.period}</span>
                      <h3 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-4">{p.title}</h3>
                      <p className="text-[17px] leading-relaxed opacity-90 mb-4 max-w-lg">{p.summary}</p>
                      <div className="flex items-center gap-2 font-semibold text-[15px] opacity-80 group-hover:opacity-100 transition-opacity">
                        View project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 group-hover:shadow-3xl transition-shadow">
                        <img src={p.cover} alt={p.title} className="w-full group-hover:scale-[1.02] transition-transform duration-700" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width UI visual strip */}
      <section className="py-12">
        <div className="flex gap-3 overflow-x-auto pb-4 px-6 snap-x scrollbar-hide">
          {[...UI.toolkit.slice(0, 5), ...UI.scrim.slice(0, 3)].map((img, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="min-w-[400px] md:min-w-[600px] rounded-2xl overflow-hidden snap-start shrink-0" style={{ background: gradients[(i + 2) % gradients.length], padding: '24px' }}>
                <div className="rounded-xl overflow-hidden shadow-xl shadow-black/10">
                  <img src={img} alt="" className="w-full" loading="lazy" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Expertise with colored cards */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-12">Expertise</h2></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => {
              const bgs = ['linear-gradient(135deg, #E8E0F0, #F0E8F8)', 'linear-gradient(135deg, #D4E4F7, #E0F0FF)', 'linear-gradient(135deg, #E0F4E8, #D8F8E8)'];
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} transition={springBounce}
                    className="p-8 rounded-3xl border border-white/50" style={{ background: bgs[i] }}>
                    <pillar.icon size={32} weight="regular" className="text-gray-800 mb-5" />
                    <h3 className="text-[20px] font-bold tracking-[-0.01em] mb-3">{pillar.title}</h3>
                    <p className="text-[16px] text-gray-600 leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials horizontal */}
      <section className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <TestimonialScroller testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* CTA with gradient */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="p-12 md:p-16 rounded-3xl text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-4">Let&apos;s work together</h2>
              <p className="text-[17px] text-white/70 mb-8">Currently available for product design missions.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                  className="px-7 py-3.5 bg-white text-gray-900 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 shadow-xl shadow-black/10">Book a call <Calendar size={16} /></motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                  className="px-7 py-3.5 rounded-full text-[15px] text-white/80 border border-white/30 flex items-center justify-center gap-2 hover:bg-white/10">Email <Envelope size={16} /></motion.button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ContinueReading items={[
        { label: 'Interface Work', desc: 'UI craft at full scale', image: UI.scrim[0], onClick: () => go('gallery') },
        { label: 'About', desc: '15 years of context', onClick: () => go('about') },
        { label: 'Resources', desc: 'Guides and tools', onClick: () => go('blog') },
      ]} />
    </div>
  );
}

function BWork({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-16">Work</h1></FadeUp>
        </div>
      </section>
      {PROJECTS.map((p, i) => (
        <FadeUp key={p.id} delay={0.04}>
          <section className="px-6 pb-8">
            <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('case')}
              className="max-w-[1400px] mx-auto rounded-3xl overflow-hidden cursor-pointer group" style={{ background: gradients[i % gradients.length] }}>
              <div className="p-6 md:p-10">
                <div className="flex items-baseline gap-4 mb-3 text-white">
                  <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">{p.title}</h2>
                  <span className="text-[14px] opacity-60">{p.period}</span>
                </div>
                <p className="text-[16px] text-white/80 mb-6 max-w-lg">{p.summary}</p>
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/15">
                  <img src={p.cover} alt={p.title} className="w-full group-hover:scale-[1.01] transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          </section>
        </FadeUp>
      ))}
    </div>
  );
}

function BCase({ go }: { go: (p: PageId) => void }) {
  return <ACase go={go} />;
}

function BAbout({ go }: { go: (p: PageId) => void }) {
  return <AAbout go={go} />;
}

function BBlog({ go }: { go: (p: PageId) => void }) {
  return <ABlog go={go} />;
}

function BGallery({ go }: { go: (p: PageId) => void }) {
  const allImages = [...UI.toolkit, ...UI.scrim, ...UI.sqool, ...UI.misc];
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <div style={{ fontFamily: font }}>
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[20px] text-gray-500 mb-16 max-w-lg">Every pixel, every interaction, every detail.</p></FadeUp>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allImages.map((img, i) => (
            <FadeUp key={i} delay={Math.min(i * 0.03, 0.3)}>
              <div className="rounded-2xl overflow-hidden cursor-pointer group p-5" style={{ background: gradients[i % gradients.length] }} onClick={() => setLightbox(img)}>
                <div className="rounded-xl overflow-hidden shadow-xl shadow-black/10 group-hover:shadow-2xl transition-shadow">
                  <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setLightbox(null)}>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"><X size={24} /></motion.button>
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={springBounce} src={lightbox} alt="" className="max-w-[95vw] max-h-[90vh] rounded-lg object-contain" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══ EXPORTS ═══ */

export function VariantLCA() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <AHome go={go} />}
      {page === 'work' && <AWork go={go} />}
      {page === 'case' && <ACase go={go} />}
      {page === 'about' && <AAbout go={go} />}
      {page === 'blog' && <ABlog go={go} />}
      {page === 'gallery' && <AGallery go={go} />}
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
    </div>
  );
}

export function VariantFullBleed() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <BHome go={go} />}
      {page === 'work' && <BWork go={go} />}
      {page === 'case' && <BCase go={go} />}
      {page === 'about' && <BAbout go={go} />}
      {page === 'blog' && <BBlog go={go} />}
      {page === 'gallery' && <BGallery go={go} />}
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
    </div>
  );
}
