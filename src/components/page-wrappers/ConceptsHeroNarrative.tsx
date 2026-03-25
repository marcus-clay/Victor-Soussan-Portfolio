'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowLeft, Quotes, Envelope, Calendar, CaretRight, X, Play, BookOpen, PencilSimple, Compass, UsersThree } from '@phosphor-icons/react';
import { StickyLayer, ContinueReading, TestimonialScroller, ExpandCollapse, SectionProgress } from './ConceptSharedUI';

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };
const springBounce = { type: 'spring' as const, stiffness: 400, damping: 25 };
const font = "'Public Sans', system-ui, sans-serif";

/* ═══ PHOTOS ═══ */
const PHOTOS = {
  hero: '/images/photos victor/image_victor_home.png',
  atelier: '/images/photos victor/photo atelier aap.webp',
  atelier2: '/images/photos victor/photo atelier aap 02.webp',
  demo: '/images/photos victor/photo victor demo.webp',
  talk: '/images/photos victor/vic conference talk.webp',
  talk2: '/images/photos victor/vic conference talk 02.webp',
  wall: '/images/photos victor/mur atelier vision produit.webp',
  team: '/images/photos victor/alexis victor hiba ateliers fiction 02.webp',
  canva: '/images/photos victor/photo canva first use case.webp',
  presentation: '/images/photos victor/photo victor presentation atelier sqool.webp',
  sqoolShoot: '/images/sqool/image-unowhy-shootingphoto-tablette.webp',
  sqoolHero: '/images/sqool/hero_ecosystem_sqool.webp',
};

const UI = {
  toolkit: Array.from({ length: 8 }, (_, i) => `/images/visuels UI/${1100 + i}_1_5x.webp`),
  scrim: Array.from({ length: 5 }, (_, i) => `/images/visuels UI/${100 + i}_1_5x.webp`),
};

const VIDEOS = {
  toolkit: '/videos/toolkit/video_-_batch_edition.mp4',
  connect: '/videos/connect/connect-dashboard-prototype-compressed.mp4',
  pj: '/images/pj-and-app-onboarding-animation.mp4',
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS.', cover: '/images/thumbnail-toolkit.webp', category: 'SaaS B2B', photo: PHOTOS.wall, video: VIDEOS.toolkit, gradient: 'from-indigo-600/80 to-violet-700/80' },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'National platform for professional certification, 100K+ candidates.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'GovTech', photo: PHOTOS.atelier, video: null, gradient: 'from-emerald-600/80 to-teal-700/80' },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'EdTech ecosystem for 500K+ students. Hardware to SaaS.', cover: '/images/thumbnail-sqool-suite.webp', category: 'EdTech B2G', photo: PHOTOS.sqoolShoot, video: VIDEOS.connect, gradient: 'from-blue-600/80 to-cyan-700/80' },
  { id: 'dailymotion', title: 'Dailymotion Partner', role: 'Senior Product Designer', period: '2017-2018', summary: 'Professional video management for CBS, Bein Sports.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Media Tech', photo: PHOTOS.presentation, video: null, gradient: 'from-orange-600/80 to-red-600/80' },
  { id: 'pagesjaunes', title: 'PagesJaunes', role: 'Mobile UI Lead', period: '2014-2017', summary: 'Mobile-first modernization for 22M+ users.', cover: '/images/thumbnail-pagesjaunes-multidevices.webp', category: 'Consumer', photo: PHOTOS.demo, video: VIDEOS.pj, gradient: 'from-amber-600/80 to-yellow-600/80' },
];

const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys." },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
];

const ARTICLES = [
  { id: 'hiring-solo-designer', title: 'Hiring designers when you are the only designer', excerpt: 'When I joined UNOWHY, I was the only designer for five products. The instinct is to hire someone who works like you. The better move is to hire someone who complements you.', body: 'When I joined UNOWHY, I was the only designer for five products. The instinct is to hire someone who works like you. The better move is to hire someone who complements you. I recruited five designers over three years. Each one brought a skill I did not have: motion, research, systems thinking. The team became stronger precisely because I did not try to clone myself.\n\nThe first hire was a motion designer. I needed someone who could prototype transitions and micro-interactions, which was my weakest area. The second was a researcher who brought structured user interview methodology. The third had deep systems thinking and became the design system lead.\n\nThe lesson: when you are building a team from scratch, hiring for complementary skills creates a team that is greater than the sum of its parts. Hiring for similarity creates a team that shares the same blind spots.', category: 'Leadership', date: 'June 2024', photo: PHOTOS.team },
  { id: 'design-thinking-public-service', title: 'Running design thinking workshops in a public service context', excerpt: 'At beta.gouv.fr, I facilitated two-day workshops with field actors who had never heard of design thinking.', body: 'At beta.gouv.fr, I facilitated two-day workshops with field actors who had never heard of design thinking. The method worked, but only after I stripped it of all the jargon. No "How Might We", no dot voting theater. Just clear questions, sticky notes, and structured conversations.\n\nThe participants were social workers, HR managers, and union representatives. They came in skeptical. They left with a shared understanding of the user journey and a prioritized list of pain points. The output was better because the participants felt respected, not lectured.\n\nThe biggest mistake in design workshops is assuming the method is the value. The value is the conversation. The method is just the structure that makes the conversation productive.', category: 'Methodology', date: 'March 2025', photo: PHOTOS.atelier2 },
  { id: 'ai-prototyping-50-apps', title: '50 apps in one year: what AI prototyping actually changes', excerpt: 'Since launching Condamine Apps, I have prototyped and deployed 50 functional web applications using Claude Code.', body: 'Since launching Condamine Apps, I have prototyped and deployed 50 functional web applications using Claude Code, Bolt, and Cursor. The speed gain is real: what used to take weeks now takes days. But the design decisions remain mine. AI accelerates production, it does not replace the thinking.\n\nThe biggest shift is that I can now validate ideas with real, working prototypes instead of static mockups. A working prototype tells you things a Figma mockup cannot: edge cases in data, performance bottlenecks, accessibility issues that only surface with real DOM interaction.\n\nThe workflow I have settled on: rough concept in my head, verbal brief to Claude Code, iterate on code directly, deploy to Vercel for testing. The entire cycle from idea to deployed URL takes 2-4 hours for a single-feature app.', category: 'AI', date: 'January 2025', photo: PHOTOS.canva },
  { id: 'design-system-five-brands', title: 'A design system for five brands: the real challenge is not technical', excerpt: 'At UNOWHY, I built a unified design system across SQOOL, SQOOL Extend, SQOOL Protect, Hi SQOOL and the corporate brand.', body: 'At UNOWHY, I built a unified design system across five products. The Figma architecture was straightforward: shared foundations, brand-specific tokens. The hard part was getting five product managers to agree on shared components.\n\nI spent more time in alignment meetings than in Figma. The system cut design time by an estimated 60%, but only because the team trusted it. Trust came from three things: involving PMs in component decisions, documenting the rationale for every pattern, and showing the time savings in sprint retrospectives.\n\nA design system is not a Figma library. A design system is a set of agreements that happen to be expressed in Figma.', category: 'Craft', date: 'March 2023', photo: PHOTOS.sqoolHero },
];

const PILLARS = [
  { icon: PencilSimple, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, rapid MVP development.' },
  { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops.' },
  { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, dev handoff, team management.' },
];

const RESOURCES = [
  { id: 'guide-claude-code', type: 'guide' as const, title: 'Getting started with Claude Code', desc: 'Complete guide for designers: installation to deployment.', chapters: 9, cover: '/images/guide-claude-code/hero-cover.png' },
];

type PageId = 'home' | 'work' | 'case' | 'about' | 'blog' | 'article' | 'gallery';

/* ═══ UTILITIES ═══ */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay, ...spring }} className={className}>{children}</motion.div>;
}

/* Hero photo section with gradient overlay and text inside */
function PhotoHero({ src, gradient, children, className = '' }: { src: string; gradient: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Nav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80));
  const titles: Record<PageId, string> = { home: '', work: 'Work', case: 'Case Study', about: 'About', blog: 'Resources', article: 'Article', gallery: 'Interface Work' };
  const tabs: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' }, { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' }, { id: 'blog', label: 'Resources' }, { id: 'gallery', label: 'Interface Work' },
  ];
  return (
    <nav className={`sticky top-0 z-50 transition-colors ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center">
        <button onClick={() => go('home')} className={`text-[15px] font-semibold tracking-[-0.01em] shrink-0 transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: font }}>Victor Soussan</button>
        <AnimatePresence>
          {scrolled && titles[page] && (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={spring}
              className="text-[13px] text-gray-400 font-medium ml-2 shrink-0" style={{ fontFamily: font }}>/ {titles[page]}</motion.span>
          )}
        </AnimatePresence>
        <div className="ml-auto hidden md:flex items-center gap-0.5">
          {tabs.map(t => (
            <button key={t.id} onClick={() => go(t.id)}
              className={`px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${page === t.id ? (scrolled ? 'bg-gray-900 text-white' : 'bg-white/20 text-white') : (scrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/60 hover:text-white')}`} style={{ fontFamily: font }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   V34: HERO NARRATIVE — Apple-style hero photos with gradients,
   vibrant colors, narrative case studies
   ═══════════════════════════════════════════════════════════════════════ */

function V34Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }}>
      {/* Full-bleed hero photo with gradient */}
      <PhotoHero src={PHOTOS.talk} gradient="from-gray-900/90 via-gray-900/60 to-gray-900/30" className="min-h-[100dvh] flex items-end -mt-14">
        <div className="max-w-[1400px] mx-auto px-6 pb-20 pt-40 w-full">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-10">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[14px] text-white/90 font-medium">Available for new projects</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold tracking-[-0.04em] leading-[0.90] text-white mb-8 max-w-[800px]">
              I design products<br />that move<span className="text-emerald-400">.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[20px] text-white/60 leading-[1.6] max-w-[520px] mb-10">
              Lead Product Designer, 15 years. From field research to shipped product. Every interface here is real, used, and in production.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce} onClick={() => go('work')}
                className="group px-8 py-4 bg-white text-gray-900 rounded-full text-[16px] font-semibold flex items-center gap-2">
                View work <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </PhotoHero>

      {/* Projects as cinematic cards with photos */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-16">Selected work</h2>
          </FadeUp>
          <div className="space-y-8">
            {PROJECTS.map((p, i) => (
              <FadeUp key={p.id} delay={0.05}>
                <motion.div whileHover={{ y: -4 }} transition={springBounce} onClick={() => go('case')}
                  className="cursor-pointer group">
                  <PhotoHero src={p.cover} gradient={`${p.gradient}`} className="rounded-3xl overflow-hidden">
                    <div className="p-10 md:p-14 min-h-[400px] flex flex-col justify-end">
                      <span className="text-[13px] font-bold text-white/60 uppercase tracking-wider mb-3">{p.category} · {p.period}</span>
                      <h3 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-3">{p.title}</h3>
                      <p className="text-[17px] text-white/80 leading-relaxed max-w-lg mb-4">{p.summary}</p>
                      <div className="flex items-center gap-2 text-[15px] font-semibold text-white/70 group-hover:text-white transition-colors">
                        Read case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </PhotoHero>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Photo strip of human moments */}
      <section className="py-8 bg-white">
        <div className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x scrollbar-hide">
          {[PHOTOS.atelier, PHOTOS.demo, PHOTOS.wall, PHOTOS.team, PHOTOS.presentation, PHOTOS.canva].map((src, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="min-w-[300px] md:min-w-[450px] aspect-[3/2] rounded-2xl overflow-hidden shrink-0 snap-start">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mb-12">Expertise</h2></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                  <pillar.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-3">{pillar.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Articles preview */}
      <section className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Writing</h2>
              <motion.button whileHover={{ x: 2 }} transition={springBounce} onClick={() => go('blog')}
                className="text-[14px] text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1">All articles <ArrowRight size={12} /></motion.button>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.slice(0, 2).map((a, i) => (
              <FadeUp key={a.id} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('article')}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={a.photo} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[12px] text-white font-medium">{a.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-2 group-hover:text-blue-600 transition-colors">{a.title}</h3>
                    <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <p className="text-[13px] text-gray-300 mt-3 font-mono">{a.date}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto"><TestimonialScroller testimonials={TESTIMONIALS} /></div>
      </section>

      {/* CTA with photo background */}
      <PhotoHero src={PHOTOS.hero} gradient="from-gray-900/80 via-gray-900/70 to-gray-900/60" className="py-24 md:py-32">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] text-white mb-4">Let&apos;s work together</h2>
            <p className="text-[18px] text-white/50 mb-8">Currently available for product design missions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-8 py-4 bg-white text-gray-900 rounded-full text-[16px] font-semibold flex items-center justify-center gap-2">Book a call <Calendar size={18} /></motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springBounce}
                className="px-8 py-4 rounded-full text-[16px] text-white/80 border border-white/20 flex items-center justify-center gap-2">Email <Envelope size={18} /></motion.button>
            </div>
          </FadeUp>
        </div>
      </PhotoHero>

      <ContinueReading items={[
        { label: 'Work', desc: 'All projects', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'About', desc: '15 years of context', image: PHOTOS.demo, onClick: () => go('about') },
        { label: 'Interface Work', desc: 'UI craft up close', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ CASE STUDY (narrative, photo-driven) ═══ */
function V34Case({ go }: { go: (p: PageId) => void }) {
  const p = PROJECTS[0];
  const sections = ['Context', 'On-site', 'Design System', 'Key Screens', 'Outcome'];
  return (
    <div style={{ fontFamily: font }}>
      <SectionProgress sections={sections} />

      {/* Cinematic hero: project cover, not human photo */}
      <PhotoHero src={p.cover} gradient={p.gradient} className="min-h-[60vh] flex items-end -mt-14">
        <div className="max-w-[800px] mx-auto px-6 pb-16 pt-32 w-full">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('work')}
              className="flex items-center gap-2 text-[14px] text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={14} /> All projects
            </motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <div className="flex items-center gap-4 text-[14px] text-white/60 mb-4">
              <span className="font-semibold text-white">{p.title}</span><span>·</span><span>{p.role}</span><span>·</span><span>{p.period}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-white">{p.summary}</h1>
          </FadeUp>
        </div>
      </PhotoHero>

      {/* Context */}
      <section className="py-20 px-6 bg-white" id="cs-section-0">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Context</span>
            <p className="text-[20px] text-gray-600 leading-[1.75]">Toolkit is a construction management platform born from a simple observation: site managers still coordinate multi-million euro projects with spreadsheets, WhatsApp groups, and paper plans. They needed a digital tool, but every existing solution was designed for office workers, not people wearing gloves in direct sunlight.</p>
          </FadeUp>
        </div>
      </section>

      {/* On-site photo + text */}
      <section id="cs-section-1">
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <img src={UI.toolkit[0]} alt="Toolkit interface" className="w-full" loading="lazy" />
            </div>
            <div className="max-w-[800px] mx-auto mt-6 px-2">
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-3">On-site</span>
              <p className="text-[18px] text-gray-600 leading-[1.7]">Two weeks on active construction sites before opening Figma. The key insight: their day is structured around interruptions, not workflows.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Design system with breakout visuals */}
      <section className="py-20 px-6 bg-white" id="cs-section-2">
        <div className="max-w-[800px] mx-auto mb-10">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Design system</span>
            <p className="text-[20px] text-gray-600 leading-[1.75]">Built a lightweight, mobile-first component system: high contrast for outdoor visibility, 56px touch targets for gloved hands, Tailwind-ready components. 40+ components across web and mobile. The design system was the contract between designer and engineer.</p>
          </FadeUp>
        </div>
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {UI.toolkit.slice(0, 4).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-[#F5F5F7]">
                  <img src={img} alt="" className="w-full hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Key screens: 3-col breakout */}
      <section className="py-12 bg-white" id="cs-section-3">
        <div className="max-w-[800px] mx-auto px-6 mb-8">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Key screens</span>
            <p className="text-[20px] text-gray-600 leading-[1.75]">Interface details showing the precision in the final product.</p>
          </FadeUp>
        </div>
        <FadeUp>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {UI.toolkit.slice(4, 8).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-[#F5F5F7] group cursor-pointer">
                  <img src={img} alt="" className="w-full group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="flex gap-6">
              <div className="w-1 bg-gray-200 rounded-full shrink-0" />
              <div>
                <blockquote className="text-[20px] text-gray-600 leading-[1.7] italic mb-4">{TESTIMONIALS[0].content}</blockquote>
                <p className="text-[14px]"><span className="font-semibold">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-20 px-6 bg-white" id="cs-section-4">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.12em] block mb-4">Outcome</span>
            <ul className="space-y-3 mb-10">
              {['MVP shipped in 6 months', 'Pilot on 3 active construction sites', 'Seed round secured on product demo', 'UI system reusable across web and mobile'].map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-[18px] text-gray-600"><span className="text-emerald-500 mt-0.5">&#10003;</span>{o}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {'deliverables' in p && (p as { deliverables: string[] }).deliverables.map((d: string) => <span key={d} className="px-4 py-2 rounded-full bg-gray-50 text-[14px] text-gray-600 border border-gray-100 font-medium">{d}</span>)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Next project */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <motion.div whileHover={{ y: -2 }} transition={springBounce} onClick={() => go('case')}
              className="cursor-pointer group">
              <PhotoHero src={PROJECTS[1].cover} gradient={PROJECTS[1].gradient} className="rounded-2xl overflow-hidden">
                <div className="p-8 md:p-10 min-h-[200px] flex items-end justify-between">
                  <div>
                    <p className="text-[12px] text-white/60 font-medium mb-2">Next project</p>
                    <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white">{PROJECTS[1].title}</h3>
                    <p className="text-[15px] text-white/70 mt-1">{PROJECTS[1].role} · {PROJECTS[1].period}</p>
                  </div>
                  <ArrowRight size={20} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </PhotoHero>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      <ContinueReading items={[
        { label: 'All projects', desc: 'Browse work', image: PROJECTS[2].cover, onClick: () => go('work') },
        { label: 'About', desc: 'Background', image: PHOTOS.demo, onClick: () => go('about') },
        { label: 'Writing', desc: 'Articles', image: PHOTOS.atelier, onClick: () => go('blog') },
      ]} />
    </div>
  );
}

/* ═══ ARTICLE PAGE (high typography) ═══ */
function V34Article({ go }: { go: (p: PageId) => void }) {
  const a = ARTICLES[0];
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      {/* Article hero with photo */}
      {/* Article hero: use guide cover or neutral gradient, not atelier photo */}
      <div className="min-h-[40vh] flex items-end -mt-14 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8E0F0 0%, #D4E4F7 50%, #E0F4E8 100%)' }}>
        <div className="max-w-[800px] mx-auto px-6 pb-12 pt-32 w-full">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('blog')}
              className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft size={14} /> All articles
            </motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <span className="text-[13px] text-gray-500 font-medium block mb-3">{a.category} · {a.date}</span>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-gray-900">{a.title}</h1>
          </FadeUp>
        </div>
      </div>

      {/* Article body with premium typography */}
      <article className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          {a.body.split('\n\n').map((paragraph, i) => (
            <FadeUp key={i} delay={i * 0.03}>
              <p className="text-[19px] text-gray-700 leading-[1.8] mb-8" style={{ fontFamily: font, fontFeatureSettings: "'kern' 1, 'liga' 1" }}>
                {i === 0 && <span className="text-[48px] font-bold text-gray-900 float-left mr-3 mt-1 leading-[0.85]">{paragraph[0]}</span>}
                {i === 0 ? paragraph.slice(1) : paragraph}
              </p>
            </FadeUp>
          ))}
        </div>
      </article>

      {/* Author card */}
      <section className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-[680px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-4">
              <img src={PHOTOS.hero} alt="Victor Soussan" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="text-[15px] font-semibold">Victor Soussan</p>
                <p className="text-[14px] text-gray-400">Lead Product Designer · Paris</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Related articles */}
      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-8">More articles</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ARTICLES.slice(1, 4).map((ra, i) => (
              <FadeUp key={ra.id} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('article')}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={ra.photo} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] text-gray-400 font-mono">{ra.category} · {ra.date}</span>
                    <h3 className="text-[16px] font-semibold mt-2 group-hover:text-blue-600 transition-colors leading-snug">{ra.title}</h3>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ WORK ═══ */
function V34Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-16">Work</h1></FadeUp>
        </div>
      </section>
      <div className="space-y-6 px-6 pb-20">
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} delay={i * 0.04}>
            <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('case')}
              className="max-w-[1400px] mx-auto cursor-pointer group">
              <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/[0.05] transition-all">
                <div className="overflow-hidden">
                  <img src={p.cover} alt={p.title} className="w-full aspect-[21/9] object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="p-8 md:p-10">
                  <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">{p.category} · {p.period}</span>
                  <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em] text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h2>
                  <p className="text-[16px] text-gray-500 max-w-lg">{p.summary}</p>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ═══ ABOUT ═══ */
function V34About({ go }: { go: (p: PageId) => void }) {
  const timeline = [
    { year: '2025', company: 'Condamine Studio', role: 'Independent', desc: 'AI-assisted design, 50+ web apps' },
    { year: '2024', company: 'France VAE / Beta.gouv', role: 'Lead Product Designer', desc: '100K+ users' },
    { year: '2023', company: 'Toolkit', role: 'Founding Designer', desc: '0-to-1 SaaS' },
    { year: '2018', company: 'UNOWHY / SQOOL', role: 'Product Design Manager', desc: '500K+ students' },
    { year: '2017', company: 'Dailymotion', role: 'Senior Product Designer', desc: 'CBS, Bein' },
    { year: '2014', company: 'PagesJaunes', role: 'Mobile UI Lead', desc: '22M users' },
  ];
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      <PhotoHero src={PHOTOS.talk2} gradient="from-gray-900/80 to-gray-900/40" className="min-h-[50vh] flex items-end -mt-14">
        <div className="max-w-[800px] mx-auto px-6 pb-12 pt-32 w-full">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] text-white">About</h1></FadeUp>
        </div>
      </PhotoHero>
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <ExpandCollapse
              preview="I started in tech 15 years ago as a visual designer at a small Parisian agency. Today I work as a Lead Product Designer on complex B2B and B2G interfaces."
              full="I started in tech 15 years ago as a visual designer at a small Parisian agency, making websites for luxury brands. Today I work as a Lead Product Designer on complex B2B and B2G interfaces: SaaS platforms, EdTech ecosystems, public service digital products.\n\nMy current focus is on AI-assisted design workflows. I use Claude Code daily and have published a 9-chapter guide on the subject. I believe the best product design is invisible: it makes the user feel competent, not impressed.\n\nBased in Paris. French and English."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-16 mb-8">Timeline</h2>
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, ...spring }}
                className="flex gap-5 py-5 border-b border-gray-100 last:border-b-0">
                <span className="text-[13px] text-gray-300 font-mono w-10 tabular-nums shrink-0">{t.year}</span>
                <div>
                  <p className="text-[16px] font-semibold">{t.company}</p>
                  <p className="text-[14px] text-gray-400">{t.role}</p>
                  <p className="text-[14px] text-gray-500 mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </FadeUp>
        </div>
      </section>
      <ContinueReading items={[
        { label: 'Work', desc: 'Case studies', image: PROJECTS[0].cover, onClick: () => go('work') },
        { label: 'Writing', desc: 'Articles', image: PHOTOS.atelier, onClick: () => go('blog') },
        { label: 'Interface Work', desc: 'UI craft', image: UI.toolkit[0], onClick: () => go('gallery') },
      ]} />
    </div>
  );
}

/* ═══ BLOG (articles with photos) ═══ */
function V34Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">Writing</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[18px] text-gray-400 mb-16 max-w-lg">Articles from 15 years of product design practice.</p></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.map((a, i) => (
              <FadeUp key={a.id} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('article')}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={a.photo} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[12px] text-white font-medium">{a.category}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-[20px] font-bold tracking-[-0.02em] mb-2 group-hover:text-blue-600 transition-colors">{a.title}</h2>
                    <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <p className="text-[13px] text-gray-300 mt-3 font-mono">{a.date}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ GALLERY ═══ */
function V34Gallery({ go }: { go: (p: PageId) => void }) {
  const allImages = [...UI.toolkit, ...UI.scrim];
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.04em] mb-4">Interface Work</h1></FadeUp>
          <FadeUp delay={0.05}><p className="text-[20px] text-gray-500 mb-16 max-w-lg">Every pixel, every detail.</p></FadeUp>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {allImages.map((img, i) => (
            <FadeUp key={i} delay={Math.min(i * 0.03, 0.2)}>
              <div className="break-inside-avoid rounded-xl overflow-hidden bg-[#F5F5F7] group cursor-pointer">
                <img src={img} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   V35: ARTICLES WITH PREMIUM TYPOGRAPHY (enriches V31/V32 blog pages)
   Same home/case/about as V34 but with dedicated article reading experience
   ═══════════════════════════════════════════════════════════════════════ */

function V35ArticlePage({ go, articleIdx = 0 }: { go: (p: PageId) => void; articleIdx?: number }) {
  const a = ARTICLES[articleIdx];
  const otherArticles = ARTICLES.filter((_, i) => i !== articleIdx);
  return (
    <div style={{ fontFamily: font }} className="bg-white">
      {/* Clean header with category pill */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeUp>
            <motion.button whileHover={{ x: -3 }} transition={springBounce} onClick={() => go('blog')}
              className="flex items-center gap-2 text-[14px] text-gray-400 hover:text-gray-900 mb-12 transition-colors">
              <ArrowLeft size={14} /> All articles
            </motion.button>
          </FadeUp>
          <FadeUp delay={0.03}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">{a.category}</span>
              <span className="text-[13px] text-gray-300 font-mono">{a.date}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-8">{a.title}</h1>
          </FadeUp>
        </div>
      </section>

      {/* Full-width photo */}
      <FadeUp>
        <div className="max-w-[1200px] mx-auto px-6 mb-16">
          <div className="rounded-2xl overflow-hidden">
            <img src={a.photo} alt="" className="w-full aspect-[21/9] object-cover" />
          </div>
        </div>
      </FadeUp>

      {/* Article body: premium typography, drop cap, generous spacing */}
      <article className="px-6 pb-20">
        <div className="max-w-[680px] mx-auto">
          {a.body.split('\n\n').map((paragraph, i) => (
            <FadeUp key={i} delay={i * 0.02}>
              <p className="text-[19px] text-gray-700 leading-[1.85] mb-10 tracking-[-0.005em]" style={{ fontFeatureSettings: "'kern' 1, 'liga' 1", textRendering: 'optimizeLegibility' }}>
                {i === 0 && (
                  <span className="text-[56px] font-bold text-gray-900 float-left mr-4 mt-2 leading-[0.78] tracking-[-0.03em]">{paragraph[0]}</span>
                )}
                {i === 0 ? paragraph.slice(1) : paragraph}
              </p>
            </FadeUp>
          ))}
        </div>
      </article>

      {/* Pull quote */}
      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeUp>
            <blockquote className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] leading-[1.3] text-gray-900">
              &ldquo;{a.body.split('.')[2]?.trim()}.&rdquo;
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* Author + bio */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[680px] mx-auto flex items-start gap-5">
          <img src={PHOTOS.hero} alt="Victor Soussan" className="w-16 h-16 rounded-full object-cover shrink-0" />
          <div>
            <p className="text-[16px] font-semibold mb-1">Victor Soussan</p>
            <p className="text-[15px] text-gray-500 leading-relaxed">Lead Product Designer with 15 years of experience. Currently exploring AI-assisted design workflows from Paris.</p>
          </div>
        </div>
      </section>

      {/* Related articles: horizontal scroll */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp><h2 className="text-[22px] font-bold tracking-[-0.02em] mb-8">Continue reading</h2></FadeUp>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-6 px-6">
            {otherArticles.map((ra, i) => (
              <FadeUp key={ra.id} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3 }} transition={springBounce} onClick={() => go('article')}
                  className="min-w-[320px] max-w-[400px] shrink-0 snap-start group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={ra.photo} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] text-gray-400 font-mono">{ra.category} · {ra.date}</span>
                    <h3 className="text-[16px] font-semibold mt-2 group-hover:text-blue-600 transition-colors leading-snug">{ra.title}</h3>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══ EXPORTS ═══ */

export function VariantHeroNarrative() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <V34Home go={go} />}
      {page === 'work' && <V34Work go={go} />}
      {page === 'case' && <V34Case go={go} />}
      {page === 'about' && <V34About go={go} />}
      {page === 'blog' && <V34Blog go={go} />}
      {page === 'article' && <V34Article go={go} />}
      {page === 'gallery' && <V34Gallery go={go} />}
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
    </div>
  );
}

export function VariantArticlePremium() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav page={page} go={go} />
      {page === 'home' && <V34Home go={go} />}
      {page === 'work' && <V34Work go={go} />}
      {page === 'case' && <V34Case go={go} />}
      {page === 'about' && <V34About go={go} />}
      {page === 'blog' && <V34Blog go={go} />}
      {page === 'article' && <V35ArticlePage go={go} />}
      {page === 'gallery' && <V34Gallery go={go} />}
      <StickyLayer onNavigateBlog={() => go('blog')} onNavigatePage={(p) => go(p as PageId)} />
    </div>
  );
}
