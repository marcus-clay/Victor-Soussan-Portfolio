'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  PencilSimple,
  Compass,
  UsersThree,
  Quotes,
  Envelope,
  Calendar,
  BookOpen,
  Article,
  Layout,
  CaretRight,
} from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════════════════════
   SHARED DATA
   ═══════════════════════════════════════════════════════════════ */

const HERO = {
  title: 'Lead Product Designer',
  desc: '15 years in tech, 10 in product design. I help teams frame the problem, materialize the product vision through prototypes, and ship in short cycles.',
  availability: 'Available for new projects',
  positioning: 'SaaS B2B & B2G, complex business interfaces, Design Systems, AI-driven design & prototyping',
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP.', cover: '/images/thumbnail-toolkit.webp', category: 'Product Design', format: 'case-study' as const },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'National platform for professional certification, 100K+ candidates.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'Product Design', format: 'case-study' as const },
  { id: 'dailymotion', title: 'Dailymotion Partner', role: 'Senior Product Designer', period: '2017-2018', summary: 'Redesigning the professional video management suite for tier-1 media partners.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Product Design', format: 'case-study' as const },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'EdTech ecosystem for 500K+ students. Hardware to SaaS transformation.', cover: '/images/thumbnail-sqool-suite.webp', category: 'Product Design', format: 'case-study' as const },
  { id: 'pagesjaunes', title: 'PagesJaunes', role: 'Mobile UI Lead', period: '2014-2017', summary: 'Mobile-first modernization for 22M+ users across iOS, Android, and Web.', cover: '/images/thumbnail-pagesjaunes-multidevices.webp', category: 'Product Design', format: 'case-study' as const },
  { id: 'condamine-apps', title: 'Condamine Apps', role: 'Solo Designer & Builder', period: '2025', summary: '50+ web apps prototyped with Claude Code and AI workflows.', cover: '/images/guide-claude-code/hero-cover.png', category: 'AI Experiment', format: 'short' as const },
  { id: 'design-system-figma', title: 'Design System with Claude Code', role: 'Designer & Implementer', period: '2025', summary: 'Figma to code with zero drift. AI-driven implementation.', cover: '/images/guide-claude-code/hero-cover.png', category: 'AI Experiment', format: 'short' as const },
];

const PILLARS = [
  { icon: PencilSimple, title: 'Design & Prototyping', desc: 'Interface design, hi-fi prototyping, and rapid MVP development. I work in the tool, not just around it.' },
  { icon: Compass, title: 'Product Strategy', desc: 'Product vision, feature scoping, ideation workshops. Framing the problem before solving it.' },
  { icon: UsersThree, title: 'Leadership & Ops', desc: 'Design systems, dev handoff rituals, team management. Building practices that survive the people who create them.' },
];

const TESTIMONIALS = [
  { author: 'Pierre-Marie Nigay', role: 'Founder, Toolkit', content: "Victor didn't just create mockups. He transformed business requirements into perfectly adapted user journeys." },
  { author: 'Charlotte Rifflet', role: 'Product Manager, UNOWHY', content: "His ability to structure design ops while keeping the creative quality high was exactly what we needed at scale." },
];

const RESOURCES = [
  { id: 'guide-claude-code', type: 'guide' as const, title: 'Getting started with Claude Code', desc: 'Complete guide for designers: from installation to deployment.', chapters: 9, cover: '/images/guide-claude-code/hero-cover.png' },
  { id: 'ai-design-workflows', type: 'article' as const, title: 'AI-assisted design workflows', desc: 'How AI changes the way designers prototype, test, and ship.' },
  { id: 'design-scoping', type: 'template' as const, title: 'Template: Design Scoping', desc: 'The document I fill before opening Figma.' },
  { id: 'design-system-figma', type: 'article' as const, title: 'Design System with Claude Code', desc: 'Designing in Figma, implementing with AI. Zero drift.' },
];

const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];

const CASE_DEEP = {
  context: 'Toolkit is a construction management platform born from a simple observation: site managers still coordinate multi-million euro projects with spreadsheets, WhatsApp groups, and paper plans.',
  challenge: 'Three forces shaped every design decision. First, users who work with gloves in direct sunlight. Second, intermittent connectivity. Third, competing against established players.',
  approach: [
    { title: 'Field immersion first', desc: 'Two weeks on active construction sites before opening Figma. The key insight: their day is structured around interruptions, not workflows.' },
    { title: 'Constraint-driven design', desc: 'Every component designed for worst-case: direct sunlight (AAA contrast), gloved hands (56px touch targets), poor connectivity (optimistic UI).' },
    { title: 'Prototype-validated architecture', desc: 'Three interactive prototypes tested with 4-5 site managers on actual construction sites using their own data.' },
    { title: 'Lean delivery with the CTO', desc: '2-week sprints, Tailwind-ready components. The design system was the contract between us.' },
  ],
  outcomes: ['MVP shipped in 6 months', 'Pilot on 3 active sites', 'Seed round secured', 'UI system reusable across web and mobile'],
  deliverables: ['SaaS Platform', 'Interactive Gantt Module', 'Admin & Billing', 'Brand Identity', 'Pitch Deck', 'Design System'],
};

const ABOUT_DEEP = {
  intro: 'I started in tech 15 years ago as a visual designer at a small Parisian agency, making websites for luxury brands.',
  now: 'Today I work as a Lead Product Designer on complex B2B and B2G interfaces. SaaS platforms, EdTech ecosystems, public service digital products.',
  ai: 'My current focus is on AI-assisted design workflows. I use Claude Code daily and have published a 9-chapter guide on the subject.',
  philosophy: 'The best product design is invisible. It makes the user feel competent, not impressed.',
  location: 'Based in Paris. French and English, on-site or remote.',
  experience: [
    { role: 'Lead Product Designer', company: 'France VAE (Beta.gouv)', period: '2024-2025', desc: 'Product ops for a national public service scaling to 100K+ candidates.' },
    { role: 'Founding Designer', company: 'Toolkit', period: '2023-2024', desc: '0-to-1 construction tech SaaS. From field research to shipped MVP.' },
    { role: 'Product Design Manager', company: 'UNOWHY (SQOOL)', period: '2018-2024', desc: 'Led 4 designers. EdTech ecosystem for 500K+ students.' },
    { role: 'Senior Product Designer', company: 'Dailymotion', period: '2017-2018', desc: 'Video management suite for CBS, Bein Sports.' },
    { role: 'Mobile UI Lead', company: 'PagesJaunes', period: '2014-2017', desc: 'iOS/Android apps for 22M+ users.' },
  ],
  tools: ['Figma', 'Claude Code', 'VS Code', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Linear', 'Notion'],
  values: [
    { title: 'Ship, then polish', desc: 'A shipped prototype teaches more than a perfect mockup.' },
    { title: 'Frame before solve', desc: 'The problem definition is half the solution.' },
    { title: 'Design the system', desc: 'Components are decisions. A design system is a set of commitments.' },
  ],
};

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

const resourceIcon = (type: 'guide' | 'article' | 'template') => {
  if (type === 'guide') return BookOpen;
  if (type === 'article') return Article;
  return Layout;
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 24, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };

const fontFamily = "'Public Sans', system-ui, sans-serif";

/* Shared nav labels */
const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'gallery', label: 'Interface Work' },
  { id: 'case', label: 'Case Study' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Resources' },
];

/* Page title mapping */
const PAGE_TITLES: Record<PageId, string> = {
  home: '', work: 'Work', case: 'Case Study', about: 'About', blog: 'Resources', gallery: 'Interface Work',
};

/* ═══ STICKY SYSTEM ═══ */

/* 1. Shared Nav with sticky page title + scroll progress bar */
function ConceptNav({ page, go }: { page: PageId; go: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 120));
  const pageTitle = PAGE_TITLES[page];
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      {/* Scroll progress bar */}
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gray-900 origin-left" style={{ scaleX: scrollYProgress }} />
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center gap-1">
        <button onClick={() => go('home')} className="font-semibold text-gray-900 tracking-[-0.02em] mr-2 text-[15px] shrink-0" style={{ fontFamily }}>
          Victor Soussan
        </button>
        <AnimatePresence>
          {scrolled && pageTitle && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="text-[13px] text-gray-400 font-medium shrink-0" style={{ fontFamily }}>
              / {pageTitle}
            </motion.span>
          )}
        </AnimatePresence>
        <div className="mr-auto" />
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => go(item.id)}
              className={`px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${page === item.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              style={{ fontFamily }}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* 2. Sticky section label (stays pinned under nav) */
function StickyLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-14 z-30 py-2.5 bg-white/90 backdrop-blur-md border-b border-gray-100 mb-6 -mx-6 px-6">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]" style={{ fontFamily }}>{children}</p>
    </div>
  );
}

/* 3. Sticky CTA bar (appears after scrolling past hero, bottom of screen) */
function StickyCTABar({ label = 'Book a call', visible = true }: { label?: string; visible?: boolean }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 500 && visible));
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200 shadow-xl shadow-gray-900/10"
        >
          <span className="text-[13px] text-gray-500 font-medium hidden sm:block" style={{ fontFamily }}>Available for new projects</span>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-[13px] font-semibold hover:bg-gray-800 transition-colors" style={{ fontFamily }}>{label}</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* 4. Sticky TOC sidebar for case studies */
function StickyTOC({ sections, activeIdx }: { sections: string[]; activeIdx: number }) {
  return (
    <div className="sticky top-20 hidden lg:block">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4" style={{ fontFamily }}>On this page</p>
      <div className="space-y-1">
        {sections.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-1 h-4 rounded-full transition-colors ${i === activeIdx ? 'bg-gray-900' : 'bg-gray-200'}`} />
            <span className={`text-[13px] font-medium transition-colors ${i === activeIdx ? 'text-gray-900' : 'text-gray-400'}`} style={{ fontFamily }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 5. Sticky "back to top" pill */
function StickyBackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 1200));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[80] w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg shadow-gray-900/[0.08] flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowRight size={14} className="text-gray-600 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* 6. Sticky project/article navigator (prev/next at bottom of viewport) */
function StickyPrevNext({ prev, next, go }: { prev?: { label: string; page: PageId }; next?: { label: string; page: PageId }; go: (p: PageId) => void }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 600));
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-[75] hidden lg:flex items-center gap-2"
        >
          {prev && (
            <button onClick={() => go(prev.page)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-md text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors" style={{ fontFamily }}>
              <ArrowRight size={12} className="rotate-180" /> {prev.label}
            </button>
          )}
          {next && (
            <button onClick={() => go(next.page)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-md text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors" style={{ fontFamily }}>
              {next.label} <ArrowRight size={12} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* 7. Expand/Collapse for long text blocks */
function ExpandCollapse({ preview, full, previewLines = 3 }: { preview: string; full: string; previewLines?: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div key="full" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <p className={bodyClass} style={{ whiteSpace: 'pre-line' }}>{full}</p>
          </motion.div>
        ) : (
          <motion.p key="preview" className={`${bodyClass} line-clamp-3`}>{preview}</motion.p>
        )}
      </AnimatePresence>
      <button onClick={() => setExpanded(!expanded)} className="mt-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1" style={{ fontFamily }}>
        {expanded ? 'Show less' : 'Read more'}
        <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={spring}><CaretRight size={12} /></motion.span>
      </button>
    </div>
  );
}

/* 8. Floating guide CTA (sticky right side) */
function FloatingGuide({ go }: { go: (p: PageId) => void }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 300));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => go('blog')}
          className="fixed right-6 top-24 z-[80] bg-white border border-gray-200 rounded-2xl p-3 shadow-lg shadow-gray-900/[0.06] hover:shadow-xl hover:border-gray-300 transition-all flex items-center gap-3 max-w-[220px]"
        >
          <img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
          <div className="text-left">
            <p className="text-[12px] font-semibold text-gray-900 leading-tight" style={{ fontFamily }}>Claude Code Guide</p>
            <p className="text-[11px] text-gray-400" style={{ fontFamily }}>9 chapters · Featured</p>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* 9. Sticky sidebar info card (for About page) */
function StickySidebar({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`md:sticky md:top-20 space-y-4 ${className}`}>
      {children}
    </div>
  );
}

/* Section wrapper */
function Section({ children, className = '', gradient = false }: { children: React.ReactNode; className?: string; gradient?: boolean }) {
  return (
    <section
      className={`py-20 px-6 ${className}`}
      style={gradient ? { background: 'linear-gradient(135deg, #EEF2FF, #FEF3F2, #ECFDF5)' } : undefined}
    >
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </section>
  );
}

/* Shared heading sizes */
const h1Class = "text-[clamp(2.8rem,6vw,5.5rem)] font-bold tracking-[-0.03em] leading-[1.05] text-gray-900";
const h2Class = "text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-gray-900";
const bodyClass = "text-[17px] leading-relaxed text-gray-600";
const secondaryClass = "text-[15px] text-gray-400";
const cardClass = "bg-white border border-gray-200/60 rounded-2xl";
const cardHoverClass = "bg-white border border-gray-200/60 rounded-2xl hover:shadow-lg hover:shadow-gray-900/[0.04] transition-shadow";
const btnPrimary = "inline-flex items-center gap-2 bg-gray-900 text-white rounded-xl px-5 py-2.5 text-[15px] font-medium hover:bg-gray-800 transition-colors";
const btnSecondary = "inline-flex items-center gap-2 border border-gray-200 text-gray-600 rounded-xl px-5 py-2.5 text-[15px] font-medium hover:bg-gray-50 transition-colors";

/* ═══════════════════════════════════════════════════════════════
   V21: "Gallery Grid" - Work page focus
   ═══════════════════════════════════════════════════════════════ */

function V21Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      {/* Hero */}
      <Section>
        <FadeIn>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className={secondaryClass}>{HERO.availability}</span>
          </div>
          <h1 className={h1Class}>{HERO.title}</h1>
          <p className={`${bodyClass} max-w-2xl mt-6`}>{HERO.desc}</p>
          <div className="flex gap-3 mt-8">
            <button onClick={() => go('work')} className={btnPrimary}>View work <ArrowRight size={16} /></button>
            <button onClick={() => go('about')} className={btnSecondary}>About me</button>
          </div>
        </FadeIn>
      </Section>

      {/* Featured 2 projects */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn>
          <h2 className={h2Class}>Featured projects</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {PROJECTS.slice(0, 2).map((p) => (
              <button key={p.id} onClick={() => go('case')} className={`${cardHoverClass} overflow-hidden text-left`}>
                <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover rounded-t-2xl" />
                <div className="p-6">
                  <span className="text-[13px] font-medium text-gray-400">{p.category}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-1">{p.title}</h3>
                  <p className="text-[15px] text-gray-600 mt-2">{p.summary}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => go('work')} className={btnSecondary}>All projects <ArrowRight size={16} /></button>
          </div>
        </FadeIn>
      </Section>

      {/* Expertise 3 cols */}
      <Section>
        <FadeIn>
          <h2 className={h2Class}>Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PILLARS.map((p) => (
              <div key={p.title} className={`${cardClass} p-6`}>
                <p.icon size={28} weight="duotone" className="text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* Interface Work teaser: horizontal scroll */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 mb-8 flex items-end justify-between">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Interface Work</span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] mt-1 text-gray-900">A close look at the craft</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <button onClick={() => go('gallery')} className="text-[14px] font-medium text-gray-400 hover:text-gray-900 flex items-center gap-1.5 transition-colors">See all <ArrowRight size={14} /></button>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="flex gap-4 overflow-x-auto pb-4 px-6 snap-x" style={{ scrollbarWidth: 'none' }}>
            {ALL_GALLERY_FLAT.slice(0, 8).map((src, i) => (
              <div key={i} onClick={() => go('gallery')} className="shrink-0 w-[320px] md:w-[400px] cursor-pointer rounded-2xl overflow-hidden bg-[#F5F5F7] hover:shadow-lg hover:shadow-gray-900/[0.06] transition-all duration-300 snap-start group">
                <img src={src} alt={`Interface ${i + 1}`} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Testimonial */}
      <Section gradient>
        <FadeIn>
          <Quotes size={32} weight="fill" className="text-gray-300 mb-4" />
          <blockquote className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-medium text-gray-900 leading-snug max-w-3xl">
            {TESTIMONIALS[0].content}
          </blockquote>
          <p className="text-[15px] text-gray-600 mt-4">{TESTIMONIALS[0].author}, {TESTIMONIALS[0].role}</p>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section>
        <FadeIn className="text-center">
          <h2 className={h2Class}>Let&apos;s work together</h2>
          <p className={`${bodyClass} mt-4`}>Product design, strategy, or team mentoring.</p>
          <button onClick={() => go('about')} className={`${btnPrimary} mt-6`}>Get in touch <Envelope size={16} /></button>
        </FadeIn>
      </Section>
    </div>
  );
}

function V21Work({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState<'all' | 'case-study' | 'short'>('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.format === filter);
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <h1 className={h2Class}>Work</h1>
          <p className={`${bodyClass} mt-2 max-w-xl`}>Selected projects from 10 years of product design.</p>
          <div className="flex gap-2 mt-8">
            {([['all', 'All'], ['case-study', 'Case Studies'], ['short', 'Experiments']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                  filter === key ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <button
                onClick={() => go('case')}
                className={`${cardHoverClass} overflow-hidden text-left w-full ${p.format === 'case-study' ? 'md:col-span-1' : ''}`}
              >
                <div className="relative group">
                  <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover rounded-t-2xl" />
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/60 transition-colors rounded-t-2xl flex items-center justify-center">
                    <span className="text-white font-medium text-[15px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      View project <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-gray-400">{p.category}</span>
                    <span className="text-[13px] text-gray-400">{p.period}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{p.title}</h3>
                  <p className="text-[14px] text-gray-500 mt-1">{p.role}</p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </Section>
    </div>
  );
}

function V21Case({ go }: { go: (p: PageId) => void }) {
  /* La Tech Checkout style: alternating vision headings + full-width visual grids.
     Near-zero chrome. Narration-driven. Metadata ultra-minimal. */
  return (
    <div style={{ fontFamily }}>
      {/* Back + Metadata */}
      <Section>
        <FadeIn>
          <button onClick={() => go('work')} className="text-[14px] text-gray-400 hover:text-gray-600 mb-12 flex items-center gap-1.5">
            <ArrowRight size={14} className="rotate-180" /> Back to work
          </button>
        </FadeIn>
        <FadeIn delay={0.03}>
          <div className="flex items-center justify-center gap-6 text-[14px] text-gray-400 mb-8">
            <div className="flex items-center gap-1.5"><span className="font-semibold text-gray-900">Role</span><span>·</span><span>{PROJECTS[0].role}</span></div>
            <div className="flex items-center gap-1.5"><span className="font-semibold text-gray-900">Focus</span><span>·</span><span>Product Design, 0-to-1</span></div>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-normal tracking-[-0.03em] leading-[1.1] text-center text-gray-900 max-w-[700px] mx-auto">
            Designing a construction management platform for the <span className="italic font-medium">real world.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="text-[18px] text-gray-500 leading-[1.7] text-center max-w-[560px] mx-auto mt-6">{CASE_DEEP.context}</p>
        </FadeIn>
      </Section>

      {/* Hero visual: full-width */}
      <Section className="!py-0">
        <FadeIn>
          <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
            <img src={PROJECTS[0].cover} alt="Toolkit Platform" className="w-full aspect-video object-cover" />
          </div>
          <p className="text-[14px] text-gray-400 mt-4 text-center">Toolkit platform overview: planning, task management, and field coordination.</p>
        </FadeIn>
      </Section>

      {/* Vision heading 1 */}
      <Section>
        <StickyLabel>Vision</StickyLabel>
        <FadeIn>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-normal tracking-[-0.02em] leading-[1.15] text-center text-gray-900 max-w-[600px] mx-auto">
            A tool built for people who build with their <span className="italic font-medium">hands.</span>
          </h2>
        </FadeIn>
      </Section>

      {/* Feature grid A: 2-col */}
      <Section className="!py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <img src={PROJECTS[3].cover} alt="Field conditions" className="w-full aspect-[4/3] object-cover" />
            </div>
            <p className="text-[15px] text-gray-500 mt-4 leading-relaxed">High-contrast interface designed for direct sunlight and gloved operation. 56px minimum touch targets across every interactive element.</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <img src={PROJECTS[1].cover} alt="Planning module" className="w-full aspect-[4/3] object-cover" />
            </div>
            <p className="text-[15px] text-gray-500 mt-4 leading-relaxed">Gantt-based planning module adapted for non-technical users. Drag-and-drop task scheduling with offline sync capability.</p>
          </FadeIn>
        </div>
      </Section>

      {/* Vision heading 2 */}
      <Section>
        <StickyLabel>Constraint-driven design</StickyLabel>
        <FadeIn>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-normal tracking-[-0.02em] leading-[1.15] text-center text-gray-900 max-w-[600px] mx-auto">
            Every decision shaped by what <span className="italic font-medium">the site demands.</span>
          </h2>
        </FadeIn>
      </Section>

      {/* Approach narrative with expand */}
      <Section className="!py-8">
        <FadeIn>
          <div className="max-w-[620px] mx-auto">
            <ExpandCollapse
              preview={CASE_DEEP.challenge}
              full={`${CASE_DEEP.challenge}\n\n${CASE_DEEP.approach.map(a => `${a.title}: ${a.desc}`).join('\n\n')}`}
            />
          </div>
        </FadeIn>
      </Section>

      {/* Feature grid B: 2-col with embedded testimonial */}
      <Section className="!py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <img src={PROJECTS[2].cover} alt="Design system" className="w-full aspect-[4/3] object-cover" />
            </div>
            <p className="text-[15px] text-gray-500 mt-4 leading-relaxed">Tailwind-ready component library enabling the CTO to implement designs directly. The design system was the contract between designer and engineer.</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            {/* Embedded testimonial (social proof in flow) */}
            <div className="rounded-2xl bg-[#F5F5F7] p-8 flex flex-col justify-center h-full">
              <Quotes size={24} weight="fill" className="text-gray-300 mb-4" />
              <blockquote className="text-[18px] text-gray-700 leading-[1.6] mb-6 italic">{TESTIMONIALS[0].content}</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">{TESTIMONIALS[0].author}</p>
                  <p className="text-[13px] text-gray-400">{TESTIMONIALS[0].role}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 3-col visual grid */}
      <Section className="!py-8">
        <div className="grid md:grid-cols-3 gap-4">
          {PROJECTS.slice(0, 3).map((p) => (
            <FadeIn key={p.id}><div className="rounded-2xl overflow-hidden bg-[#F5F5F7]"><img src={p.cover} alt={p.title} className="w-full aspect-[4/3] object-cover" /></div></FadeIn>
          ))}
        </div>
      </Section>

      {/* Vision heading 3 */}
      <Section>
        <StickyLabel>Outcome</StickyLabel>
        <FadeIn>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-normal tracking-[-0.02em] leading-[1.15] text-center text-gray-900 max-w-[600px] mx-auto">
            From two weeks on-site to a <span className="italic font-medium">shipped product.</span>
          </h2>
        </FadeIn>
      </Section>

      {/* Outcomes + Deliverables */}
      <Section className="!py-8">
        <FadeIn>
          <div className="max-w-[600px] mx-auto">
            <ul className="space-y-4 mb-10">
              {CASE_DEEP.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-[17px] text-gray-600 leading-[1.6]">
                  <span className="text-emerald-500 text-[18px] shrink-0 mt-0.5">&#10003;</span>{o}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 justify-center">
              {CASE_DEEP.deliverables.map(d => (
                <span key={d} className="px-4 py-2 rounded-xl bg-[#F5F5F7] text-[14px] font-medium text-gray-600">{d}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Full-width closing visual */}
      <Section className="!py-8 !pb-20">
        <FadeIn>
          <div className="rounded-2xl overflow-hidden bg-[#F5F5F7]">
            <img src={PROJECTS[0].cover} alt="Final product" className="w-full aspect-[21/9] object-cover" />
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function V21About() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  return (
    <div style={{ fontFamily }}>
      <Section>
        <div className="grid md:grid-cols-[280px_1fr] gap-12">
          {/* Sticky photo */}
          <FadeIn>
            <div className="md:sticky md:top-20">
              <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className={secondaryClass}>Photo</span>
              </div>
              <p className="text-[15px] text-gray-600 mt-4">{ABOUT_DEEP.location}</p>
              <button className={`${btnPrimary} mt-4 w-full justify-center`}>Contact <Envelope size={16} /></button>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <h1 className={h2Class}>About</h1>
              <div className="mt-6">
                <ExpandCollapse
                  preview={ABOUT_DEEP.intro}
                  full={`${ABOUT_DEEP.intro}\n\n${ABOUT_DEEP.now}\n\n${ABOUT_DEEP.ai}\n\n${ABOUT_DEEP.philosophy}`}
                />
              </div>
            </FadeIn>

            {/* Expandable career */}
            <FadeIn delay={0.1}>
              <StickyLabel>Experience</StickyLabel>
              <div className="space-y-3">
                {ABOUT_DEEP.experience.map((exp, i) => (
                  <div key={i} className={`${cardClass} overflow-hidden`}>
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div>
                        <h3 className="text-[15px] font-semibold text-gray-900">{exp.role}</h3>
                        <p className="text-[14px] text-gray-500">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={secondaryClass}>{exp.period}</span>
                        <motion.span animate={{ rotate: expandedIdx === i ? 90 : 0 }} transition={spring}>
                          <CaretRight size={16} className="text-gray-400" />
                        </motion.span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedIdx === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={spring}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-[15px] text-gray-600">{exp.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Values on gradient cards */}
            <FadeIn delay={0.15}>
              <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-6">Values</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {ABOUT_DEEP.values.map((v) => (
                  <div key={v.title} className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #EEF2FF, #FEF3F2, #ECFDF5)' }}>
                    <h3 className="text-[15px] font-semibold text-gray-900">{v.title}</h3>
                    <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Tools */}
            <FadeIn delay={0.2}>
              <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Tools</h2>
              <div className="flex flex-wrap gap-2">
                {ABOUT_DEEP.tools.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[14px] rounded-lg border border-gray-100">{t}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>
    </div>
  );
}

function V21Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <h1 className={h2Class}>Resources</h1>
          <p className={`${bodyClass} mt-2`}>Guides, articles, and templates on product design and AI workflows.</p>
        </FadeIn>

        {/* Featured guide */}
        <FadeIn delay={0.05}>
          <div className={`${cardHoverClass} mt-10 overflow-hidden md:flex`}>
            <img src={RESOURCES[0].cover} alt="" className="md:w-1/3 aspect-[16/10] md:aspect-auto object-cover rounded-l-2xl" />
            <div className="p-6 flex flex-col justify-center">
              <span className="text-[13px] font-medium text-indigo-500 uppercase tracking-wider">Guide</span>
              <h2 className="text-xl font-semibold text-gray-900 mt-2">{RESOURCES[0].title}</h2>
              <p className="text-[15px] text-gray-600 mt-2">{RESOURCES[0].desc}</p>
              <p className={`${secondaryClass} mt-2`}>{'chapters' in RESOURCES[0] ? `${RESOURCES[0].chapters} chapters` : ''}</p>
            </div>
          </div>
        </FadeIn>

        {/* Article grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {RESOURCES.slice(1).map((r, i) => {
            const Icon = resourceIcon(r.type);
            return (
              <FadeIn key={r.id} delay={i * 0.05}>
                <div className={`${cardClass} p-5`}>
                  <Icon size={24} weight="duotone" className="text-gray-400 mb-3" />
                  <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{r.type}</span>
                  <h3 className="text-[15px] font-semibold text-gray-900 mt-1">{r.title}</h3>
                  <p className="text-[14px] text-gray-500 mt-2">{r.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

/* ── Gallery data (subset for concept preview) ── */
const GALLERY_DATA = [
  { project: 'SCRIM', items: ['/images/visuels UI/100_1_5x.webp', '/images/visuels UI/101_1_5x.webp', '/images/visuels UI/102_1_5x.webp', '/images/visuels UI/103_1_5x.webp'] },
  { project: 'Dailymotion', items: ['/images/dailymotion/thumbnail_dailymotion_-_web_platform2x.webp', '/images/dailymotion/design_system_-_component_library2x.webp', '/images/dailymotion/dailymotion_-_upload2x.webp'] },
  { project: 'SQOOL Connect', items: ['/images/visuels UI/800_1_5x.webp', '/images/visuels UI/801_1_5x.webp', '/images/visuels UI/802_1_5x.webp', '/images/visuels UI/803_1_5x.webp'] },
  { project: 'Toolkit', items: ['/images/visuels UI/1100_1_5x.webp', '/images/visuels UI/1101_1_5x.webp', '/images/visuels UI/1102_1_5x.webp', '/images/visuels UI/1103_1_5x.webp'] },
  { project: 'Komète', items: ['/images/visuels UI/200_1_5x.webp', '/images/visuels UI/201_1_5x.webp', '/images/visuels UI/202_1_5x.webp'] },
  { project: 'Vinci Construction', items: ['/images/visuels UI/600_1_5x.webp', '/images/visuels UI/601_1_5x.webp', '/images/visuels UI/500_1_5x.webp'] },
  { project: 'PagesJaunes', items: ['/images/visuels UI/1300_1_5x.webp', '/images/visuels UI/1301_1_5x.webp', '/images/visuels UI/1302_1_5x.webp'] },
  { project: 'Ogury', items: ['/images/visuels UI/1200_1_5x.webp', '/images/visuels UI/1201_1_5x.webp', '/images/visuels UI/1202_1_5x.webp'] },
  { project: 'EADS / Airbus', items: ['/images/visuels UI/700_1_5x.webp', '/images/visuels UI/701_1_5x.webp', '/images/visuels UI/702_1_5x.webp'] },
];
const ALL_GALLERY_FLAT = GALLERY_DATA.flatMap(g => g.items);

/* ── V21 Gallery Page ── */
function V21Gallery({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = filter ? GALLERY_DATA.filter(g => g.project === filter) : GALLERY_DATA;

  return (
    <div style={{ fontFamily }}>
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
            <motion.img src={lightbox} alt="" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={spring} className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <span className="text-xl">&times;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Section>
        <FadeIn>
          <button onClick={() => go('home')} className="text-[14px] text-gray-400 hover:text-gray-600 mb-8 flex items-center gap-1.5">
            <ArrowRight size={14} className="rotate-180" /> Home
          </button>
          <h1 className={h1Class}>Interface Work</h1>
          <p className={`${bodyClass} mt-4 max-w-xl`}>A close look at the interfaces I have designed over the past 10 years. Dashboards, mobile apps, design systems, and product UIs across SaaS, EdTech, construction, media, and public services.</p>
        </FadeIn>
      </Section>

      {/* Filter pills */}
      <Section className="!py-0 !pb-8">
        <FadeIn>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter(null)} className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all ${!filter ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>All projects</button>
            {GALLERY_DATA.map(g => (
              <button key={g.project} onClick={() => setFilter(g.project)} className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all ${filter === g.project ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>{g.project}</button>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* Gallery grouped by project */}
      {filtered.map((group, gi) => (
        <Section key={group.project} className="!py-8">
          <FadeIn>
            <h2 className="text-[20px] font-bold tracking-[-0.02em] text-gray-900 mb-2">{group.project}</h2>
            <p className="text-[14px] text-gray-400 mb-6">{group.items.length} screens</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.items.map((src, i) => (
              <FadeIn key={src} delay={i * 0.03}>
                <div onClick={() => setLightbox(src)} className="cursor-pointer rounded-2xl overflow-hidden bg-[#F5F5F7] hover:shadow-lg hover:shadow-gray-900/[0.06] transition-all duration-300 group">
                  <img src={src} alt={`${group.project} screen ${i + 1}`} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

export function V21() {
  const { page, go } = usePageNav();
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      <ConceptNav page={page} go={go} />
      {page === 'home' && <V21Home go={go} />}
      {page === 'work' && <V21Work go={go} />}
      {page === 'gallery' && <V21Gallery go={go} />}
      {page === 'case' && <V21Case go={go} />}
      {page === 'about' && <V21About />}
      {page === 'blog' && <V21Blog go={go} />}
      <FloatingGuide go={go} />
      <StickyCTABar />
      <StickyBackToTop />
      <StickyPrevNext
        prev={page === 'case' ? { label: 'Work', page: 'work' } : page === 'about' ? { label: 'Case Study', page: 'case' } : undefined}
        next={page === 'home' ? { label: 'Work', page: 'work' } : page === 'work' ? { label: 'Case Study', page: 'case' } : page === 'case' ? { label: 'About', page: 'about' } : undefined}
        go={go}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V22: "Masonry Work" - Asymmetric project grid
   ═══════════════════════════════════════════════════════════════ */

function V22Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      {/* Split hero */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className={secondaryClass}>{HERO.availability}</span>
            </div>
            <h1 className={h1Class}>{HERO.title}</h1>
            <p className={`${bodyClass} mt-6`}>{HERO.desc}</p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => go('work')} className={btnPrimary}>View work <ArrowRight size={16} /></button>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button onClick={() => go('case')} className={`${cardHoverClass} overflow-hidden text-left`}>
              <img src={PROJECTS[0].cover} alt={PROJECTS[0].title} className="w-full aspect-[16/10] object-cover rounded-t-2xl" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">{PROJECTS[0].title}</h3>
                <p className="text-[14px] text-gray-500 mt-1">{PROJECTS[0].role}</p>
              </div>
            </button>
          </FadeIn>
        </div>
      </Section>

      {/* Horizontal scroll project strip */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn>
          <h2 className={h2Class}>Selected work</h2>
        </FadeIn>
        <div className="flex gap-5 mt-8 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.04}>
              <button onClick={() => go('case')} className={`${cardHoverClass} flex-shrink-0 w-[280px] overflow-hidden text-left`}>
                <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover rounded-t-2xl" />
                <div className="p-4">
                  <span className="text-[12px] font-medium text-gray-400">{p.category}</span>
                  <h3 className="text-[15px] font-semibold text-gray-900 mt-1">{p.title}</h3>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Expertise */}
      <Section>
        <FadeIn><h2 className={h2Class}>What I do</h2></FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className={`${cardClass} p-6`}>
                <p.icon size={28} weight="duotone" className="text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Resources preview */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className={h2Class}>Resources</h2>
            <button onClick={() => go('blog')} className={btnSecondary}>All resources <ArrowRight size={16} /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {RESOURCES.slice(0, 2).map((r) => {
              const Icon = resourceIcon(r.type);
              return (
                <div key={r.id} className={`${cardClass} p-5 flex gap-4`}>
                  <Icon size={24} weight="duotone" className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900">{r.title}</h3>
                    <p className="text-[14px] text-gray-500 mt-1">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function V22Work({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <h1 className={h2Class}>Work</h1>
          <p className={`${bodyClass} mt-2`}>Case studies and experiments.</p>
        </FadeIn>

        {/* Masonry grid: case studies taller, experiments compact */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-10 space-y-6">
          {PROJECTS.map((p, i) => {
            const isCaseStudy = p.format === 'case-study';
            return (
              <FadeIn key={p.id} delay={i * 0.04}>
                <button
                  onClick={() => go('case')}
                  className={`${cardHoverClass} overflow-hidden text-left w-full break-inside-avoid group`}
                >
                  <div className="relative">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className={`w-full object-cover rounded-t-2xl transition-transform group-hover:scale-[1.02] ${
                        isCaseStudy ? 'aspect-[4/3]' : 'aspect-[16/9]'
                      }`}
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[12px] font-medium text-gray-700">
                      {p.category}
                    </span>
                  </div>
                  <div className={`${isCaseStudy ? 'p-5' : 'p-4'}`}>
                    <h3 className={`font-semibold text-gray-900 ${isCaseStudy ? 'text-lg' : 'text-[15px]'}`}>{p.title}</h3>
                    <p className="text-[14px] text-gray-500 mt-1">{p.role} / {p.period}</p>
                    {isCaseStudy && <p className="text-[14px] text-gray-600 mt-2 line-clamp-2">{p.summary}</p>}
                  </div>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function V22Case({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <button onClick={() => go('work')} className="text-[14px] text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1">
            <ArrowRight size={14} className="rotate-180" /> Back
          </button>
          <h1 className={h2Class}>{PROJECTS[0].title}</h1>
          <p className={`${bodyClass} mt-3`}>{PROJECTS[0].summary}</p>
        </FadeIn>
      </Section>

      {/* Timeline phases */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn><h2 className="text-xl font-semibold text-gray-900 mb-4">Context</h2></FadeIn>
        <FadeIn><p className={bodyClass}>{CASE_DEEP.context}</p></FadeIn>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {PROJECTS.slice(0, 2).map((p) => (
            <FadeIn key={p.id}><img src={p.cover} alt="" className="w-full rounded-2xl aspect-[16/10] object-cover" /></FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn><h2 className="text-xl font-semibold text-gray-900 mb-4">Challenge</h2></FadeIn>
        <FadeIn><p className={bodyClass}>{CASE_DEEP.challenge}</p></FadeIn>
      </Section>

      <Section className="bg-[#F9FAFB]">
        <FadeIn><h2 className="text-xl font-semibold text-gray-900 mb-8">Approach</h2></FadeIn>
        <div className="relative pl-8 border-l-2 border-gray-200 space-y-10">
          {CASE_DEEP.approach.map((a, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="relative">
                <div className="absolute -left-[calc(2rem+5px)] w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-[13px] font-semibold text-gray-500">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{a.title}</h3>
                <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {PROJECTS.slice(2, 5).map((p) => (
            <FadeIn key={p.id}><img src={p.cover} alt="" className="w-full rounded-2xl aspect-[4/3] object-cover" /></FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CASE_DEEP.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /><span className={bodyClass}>{o}</span></div>
            ))}
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function V22About() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ fontFamily }}>
      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h1 className={h2Class}>About</h1>
              <p className={`${bodyClass} mt-6`}>{ABOUT_DEEP.intro}</p>

              {/* Inline expandable: "now" */}
              <p className={`${bodyClass} mt-4`}>
                {ABOUT_DEEP.now.slice(0, 80)}...
                <AnimatePresence initial={false}>
                  {expandedSections['now'] && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={spring}>
                      {' '}{ABOUT_DEEP.now.slice(80)}
                    </motion.span>
                  )}
                </AnimatePresence>
                <button onClick={() => toggle('now')} className="ml-1 text-[14px] font-medium text-gray-400 hover:text-gray-600">
                  {expandedSections['now'] ? 'less' : 'more'}
                </button>
              </p>

              <p className={`${bodyClass} mt-4`}>{ABOUT_DEEP.ai}</p>
              <p className={`${bodyClass} mt-4 italic`}>{ABOUT_DEEP.philosophy}</p>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.1}>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-4">
                {ABOUT_DEEP.experience.map((exp, i) => (
                  <div key={i}>
                    <button onClick={() => toggle(`exp-${i}`)} className="text-left w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[15px] font-semibold text-gray-900">{exp.role}</h3>
                          <p className="text-[14px] text-gray-500">{exp.company}</p>
                        </div>
                        <span className={secondaryClass}>{exp.period}</span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedSections[`exp-${i}`] && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={spring}
                          className="text-[14px] text-gray-600 mt-2 overflow-hidden"
                        >
                          {exp.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {i < ABOUT_DEEP.experience.length - 1 && <div className="border-b border-gray-100 mt-4" />}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Tools</h2>
              <div className="flex flex-wrap gap-2">
                {ABOUT_DEEP.tools.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[14px] rounded-lg border border-gray-100">{t}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>
    </div>
  );
}

function V22Blog() {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn><h1 className={h2Class}>Resources</h1></FadeIn>

        {/* Magazine: 1 large + 3 small */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <FadeIn className="md:col-span-2 md:row-span-2">
            <div className={`${cardHoverClass} overflow-hidden h-full`}>
              <img src={RESOURCES[0].cover} alt="" className="w-full aspect-[16/9] object-cover rounded-t-2xl" />
              <div className="p-6">
                <span className="text-[13px] font-medium text-indigo-500 uppercase tracking-wider">Guide</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2">{RESOURCES[0].title}</h2>
                <p className="text-[15px] text-gray-600 mt-2">{RESOURCES[0].desc}</p>
              </div>
            </div>
          </FadeIn>
          {RESOURCES.slice(1).map((r, i) => {
            const Icon = resourceIcon(r.type);
            return (
              <FadeIn key={r.id} delay={i * 0.05}>
                <div className={`${cardClass} p-5`}>
                  <Icon size={24} weight="duotone" className="text-gray-400 mb-3" />
                  <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{r.type}</span>
                  <h3 className="text-[15px] font-semibold text-gray-900 mt-1">{r.title}</h3>
                  <p className="text-[14px] text-gray-500 mt-2">{r.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export function V22() {
  const { page, go } = usePageNav();
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      <ConceptNav page={page} go={go} />
      {page === 'home' && <V22Home go={go} />}
      {page === 'work' && <V22Work go={go} />}
      {page === 'gallery' && <V21Gallery go={go} />}
      {page === 'case' && <V22Case go={go} />}
      {page === 'about' && <V22About />}
      {page === 'blog' && <V22Blog />}
      <FloatingGuide go={go} />
      <StickyCTABar />
      <StickyBackToTop />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V23: "List View" - Dense, Notion-like work page
   ═══════════════════════════════════════════════════════════════ */

function V23Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      {/* Minimal hero */}
      <Section>
        <FadeIn>
          <h1 className={h1Class}>{HERO.title}</h1>
          <p className={`${bodyClass} max-w-2xl mt-4`}>{HERO.desc}</p>
        </FadeIn>
      </Section>

      {/* Dense project table */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn>
          <h2 className={h2Class}>Projects</h2>
          <div className="mt-8 border border-gray-200/60 rounded-2xl overflow-hidden bg-white">
            {/* Header */}
            <div className="grid grid-cols-[1fr_180px_120px_140px] px-5 py-3 border-b border-gray-100 text-[13px] font-medium text-gray-400 uppercase tracking-wider">
              <span>Project</span><span>Role</span><span>Period</span><span>Category</span>
            </div>
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go('case')}
                className={`grid grid-cols-[1fr_180px_120px_140px] px-5 py-4 text-left hover:bg-gray-50 transition-colors w-full ${
                  i < PROJECTS.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <span className="text-[15px] font-medium text-gray-900">{p.title}</span>
                <span className="text-[14px] text-gray-500">{p.role}</span>
                <span className="text-[14px] text-gray-400">{p.period}</span>
                <span className="text-[13px] text-gray-500">{p.category}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => go('work')} className={btnSecondary}>Detailed view <ArrowRight size={16} /></button>
          </div>
        </FadeIn>
      </Section>

      {/* Expertise horizontal cards */}
      <Section>
        <FadeIn><h2 className={h2Class}>Expertise</h2></FadeIn>
        <div className="flex gap-4 mt-8 overflow-x-auto pb-4 -mx-6 px-6">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className={`${cardClass} p-5 flex-shrink-0 w-[320px]`}>
                <p.icon size={24} weight="duotone" className="text-gray-900 mb-3" />
                <h3 className="text-[15px] font-semibold text-gray-900">{p.title}</h3>
                <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 className={h2Class}>Resources</h2>
            <button onClick={() => go('blog')} className={btnSecondary}>All <ArrowRight size={16} /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {RESOURCES.slice(0, 2).map((r) => {
              const Icon = resourceIcon(r.type);
              return (
                <div key={r.id} className={`${cardClass} p-4 flex gap-3`}>
                  <Icon size={20} weight="duotone" className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900">{r.title}</h3>
                    <p className="text-[14px] text-gray-500 mt-1">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function V23Work({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState<'all' | 'case-study' | 'short'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.format === filter);

  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <h1 className={h2Class}>Work</h1>
          <div className="flex gap-2 mt-6">
            {([['all', 'All'], ['case-study', 'Case Studies'], ['short', 'Experiments']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => { setFilter(key); setExpandedId(null); }}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                  filter === key ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Sortable table-like list */}
        <div className={`${cardClass} mt-8 overflow-hidden`}>
          <div className="grid grid-cols-[1fr_180px_100px_130px_40px] px-5 py-3 border-b border-gray-100 text-[12px] font-medium text-gray-400 uppercase tracking-wider">
            <span>Project</span><span>Role</span><span>Period</span><span>Category</span><span />
          </div>
          {filtered.map((p) => (
            <div key={p.id}>
              <button
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                className="grid grid-cols-[1fr_180px_100px_130px_40px] px-5 py-4 text-left hover:bg-gray-50 transition-colors w-full items-center"
              >
                <span className="text-[15px] font-medium text-gray-900">{p.title}</span>
                <span className="text-[14px] text-gray-500">{p.role}</span>
                <span className="text-[14px] text-gray-400">{p.period}</span>
                <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[12px] rounded-md inline-block w-fit">{p.category}</span>
                <motion.span animate={{ rotate: expandedId === p.id ? 90 : 0 }} transition={spring}>
                  <CaretRight size={14} className="text-gray-400" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {expandedId === p.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 flex gap-6 items-start">
                      <img src={p.cover} alt={p.title} className="w-48 rounded-xl aspect-[16/10] object-cover flex-shrink-0" />
                      <div>
                        <p className="text-[15px] text-gray-600 leading-relaxed">{p.summary}</p>
                        <button onClick={() => go('case')} className={`${btnPrimary} mt-4 text-[13px] px-4 py-2`}>
                          View case study <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="border-b border-gray-50" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function V23Case({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <button onClick={() => go('work')} className="text-[14px] text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1">
            <ArrowRight size={14} className="rotate-180" /> Back
          </button>
          <h1 className={h2Class}>{PROJECTS[0].title}</h1>
          <p className="text-[20px] text-gray-500 mt-3 max-w-2xl leading-relaxed">{PROJECTS[0].summary}</p>
          <div className="flex gap-8 mt-8">
            <div><span className={secondaryClass}>Role</span><p className="text-[15px] font-medium text-gray-900 mt-1">{PROJECTS[0].role}</p></div>
            <div><span className={secondaryClass}>Period</span><p className="text-[15px] font-medium text-gray-900 mt-1">{PROJECTS[0].period}</p></div>
            <div><span className={secondaryClass}>Deliverables</span><p className="text-[15px] font-medium text-gray-900 mt-1">{CASE_DEEP.deliverables.length} items</p></div>
          </div>
        </FadeIn>
      </Section>

      {/* Full-width image */}
      <div className="px-6">
        <FadeIn><img src={PROJECTS[0].cover} alt="" className="w-full max-w-[1200px] mx-auto rounded-2xl aspect-[21/9] object-cover" /></FadeIn>
      </div>

      {/* Long-form editorial */}
      <Section>
        <div className="max-w-[720px] mx-auto">
          <FadeIn>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Context</h2>
            <p className={`${bodyClass} leading-[1.8]`}>{CASE_DEEP.context}</p>
          </FadeIn>

          {/* Pull quote */}
          <FadeIn delay={0.05}>
            <blockquote className="my-10 pl-6 border-l-2 border-gray-200">
              <p className="text-[20px] text-gray-700 leading-relaxed italic">{ABOUT_DEEP.philosophy}</p>
            </blockquote>
          </FadeIn>

          <FadeIn>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenge</h2>
            <p className={`${bodyClass} leading-[1.8]`}>{CASE_DEEP.challenge}</p>
          </FadeIn>
        </div>
      </Section>

      {/* Full-width images */}
      <div className="px-6"><div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-4">
        {PROJECTS.slice(1, 3).map((p) => (<FadeIn key={p.id}><img src={p.cover} alt="" className="w-full rounded-2xl aspect-[16/10] object-cover" /></FadeIn>))}
      </div></div>

      <Section>
        <div className="max-w-[720px] mx-auto">
          <FadeIn><h2 className="text-xl font-semibold text-gray-900 mb-8">Approach</h2></FadeIn>
          {CASE_DEEP.approach.map((a, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="flex gap-5 mb-8">
                <span className="text-[28px] font-bold text-gray-200 leading-none flex-shrink-0 w-8">{i + 1}</span>
                <div>
                  <h3 className="text-[17px] font-semibold text-gray-900">{a.title}</h3>
                  <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-12">Outcomes</h2>
            <ul className="space-y-3">
              {CASE_DEEP.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /><span className={bodyClass}>{o}</span></li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

function V23About() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  return (
    <div style={{ fontFamily }}>
      <Section>
        <div className="max-w-[720px] mx-auto">
          <FadeIn>
            <h1 className={h2Class}>About</h1>
            <p className={`${bodyClass} mt-6 leading-[1.8]`}>{ABOUT_DEEP.intro}</p>
            <p className={`${bodyClass} mt-4 leading-[1.8]`}>{ABOUT_DEEP.now}</p>
            <p className={`${bodyClass} mt-4 leading-[1.8]`}>{ABOUT_DEEP.ai}</p>
            <p className={`${bodyClass} mt-4 italic`}>{ABOUT_DEEP.philosophy}</p>
            <p className={`text-[15px] text-gray-500 mt-4`}>{ABOUT_DEEP.location}</p>
          </FadeIn>

          {/* Expandable experience entries */}
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-semibold text-gray-900 mt-16 mb-6">Experience</h2>
            {ABOUT_DEEP.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <button onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className="text-left w-full flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-[14px] text-gray-500">{exp.company}</p>
                  </div>
                  <span className={secondaryClass}>{exp.period}</span>
                </button>
                <AnimatePresence initial={false}>
                  {expandedIdx === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={spring} className="text-[14px] text-gray-600 mt-3 overflow-hidden">
                      {exp.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Values</h2>
            {ABOUT_DEEP.values.map((v) => (
              <div key={v.title} className="mb-4">
                <h3 className="text-[15px] font-semibold text-gray-900">{v.title}</h3>
                <p className="text-[14px] text-gray-600 mt-1">{v.desc}</p>
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Tools</h2>
            <div className="flex flex-wrap gap-2">
              {ABOUT_DEEP.tools.map((t) => (
                <span key={t} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[14px] rounded-lg border border-gray-100">{t}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

function V23Blog() {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn><h1 className={h2Class}>Resources</h1></FadeIn>

        {/* Compact list */}
        <div className={`${cardClass} mt-8 overflow-hidden`}>
          {RESOURCES.map((r, i) => {
            const Icon = resourceIcon(r.type);
            return (
              <div key={r.id} className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${i < RESOURCES.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <Icon size={20} weight="duotone" className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-gray-900">{r.title}</h3>
                  <p className="text-[14px] text-gray-500 truncate">{r.desc}</p>
                </div>
                <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[12px] rounded-md flex-shrink-0 uppercase tracking-wider font-medium">{r.type}</span>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export function V23() {
  const { page, go } = usePageNav();
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      <ConceptNav page={page} go={go} />
      {page === 'home' && <V23Home go={go} />}
      {page === 'work' && <V23Work go={go} />}
      {page === 'gallery' && <V21Gallery go={go} />}
      {page === 'case' && <V23Case go={go} />}
      {page === 'about' && <V23About />}
      {page === 'blog' && <V23Blog />}
      <FloatingGuide go={go} />
      <StickyCTABar />
      <StickyBackToTop />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V24: "Card Stack" - Overlapping card depth
   ═══════════════════════════════════════════════════════════════ */

function V24Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      {/* Hero with stacked cards */}
      <Section>
        <FadeIn>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className={secondaryClass}>{HERO.availability}</span>
          </div>
          <h1 className={h1Class}>{HERO.title}</h1>
          <p className={`${bodyClass} max-w-2xl mt-6`}>{HERO.desc}</p>
        </FadeIn>

        {/* Stacked project cards */}
        <div className="relative mt-12 h-[320px]">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <motion.button
                onClick={() => go('case')}
                className={`${cardHoverClass} absolute overflow-hidden text-left w-[340px]`}
                style={{
                  left: `${i * 60}px`,
                  top: `${i * 16}px`,
                  zIndex: 3 - i,
                }}
                whileHover={{ y: -8, zIndex: 10 }}
                transition={spring}
              >
                <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover rounded-t-2xl" />
                <div className="p-4">
                  <h3 className="text-[15px] font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-[13px] text-gray-500">{p.role}</p>
                </div>
              </motion.button>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8">
          <button onClick={() => go('work')} className={btnPrimary}>All projects <ArrowRight size={16} /></button>
        </div>
      </Section>

      {/* Expertise */}
      <Section className="bg-[#F9FAFB]">
        <FadeIn><h2 className={h2Class}>Expertise</h2></FadeIn>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className={`${cardClass} p-6`}>
                <p.icon size={28} weight="duotone" className="text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <Section gradient>
        <FadeIn>
          <Quotes size={32} weight="fill" className="text-gray-300 mb-4" />
          <blockquote className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-medium text-gray-900 leading-snug max-w-3xl">
            {TESTIMONIALS[0].content}
          </blockquote>
          <p className="text-[15px] text-gray-600 mt-4">{TESTIMONIALS[0].author}, {TESTIMONIALS[0].role}</p>
        </FadeIn>
      </Section>

      {/* Resources */}
      <Section>
        <FadeIn>
          <h2 className={h2Class}>Resources</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {RESOURCES.slice(0, 2).map((r) => {
              const Icon = resourceIcon(r.type);
              return (
                <div key={r.id} className={`${cardClass} p-5 flex gap-4`}>
                  <Icon size={20} weight="duotone" className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-900">{r.title}</h3>
                    <p className="text-[14px] text-gray-500 mt-1">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function V24Work({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState<'all' | 'case-study' | 'short'>('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.format === filter);

  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <h1 className={h2Class}>Work</h1>
          <div className="flex gap-2 mt-6">
            {([['all', 'All'], ['case-study', 'Case Studies'], ['short', 'Experiments']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                  filter === key ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Overlapping card stack */}
        <div className="mt-10 space-y-[-12px]">
          {filtered.map((p, i) => {
            const isCaseStudy = p.format === 'case-study';
            return (
              <FadeIn key={p.id} delay={i * 0.04}>
                <motion.button
                  onClick={() => go('case')}
                  className={`${cardHoverClass} relative overflow-hidden text-left w-full ${isCaseStudy ? '' : 'max-w-[600px]'}`}
                  style={{ zIndex: filtered.length - i }}
                  whileHover={{ y: -6, zIndex: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  transition={spring}
                >
                  <div className={`flex ${isCaseStudy ? 'flex-col md:flex-row' : ''}`}>
                    <img
                      src={p.cover}
                      alt={p.title}
                      className={`object-cover ${isCaseStudy ? 'md:w-1/3 aspect-[16/10] rounded-l-2xl' : 'w-20 h-20 rounded-xl m-4 flex-shrink-0'}`}
                    />
                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{p.category}</span>
                        <span className="text-[12px] text-gray-300">{p.period}</span>
                      </div>
                      <h3 className={`font-semibold text-gray-900 mt-1 ${isCaseStudy ? 'text-lg' : 'text-[15px]'}`}>{p.title}</h3>
                      <p className="text-[14px] text-gray-500 mt-1">{p.role}</p>
                      {isCaseStudy && <p className="text-[14px] text-gray-600 mt-2 line-clamp-2">{p.summary}</p>}
                    </div>
                  </div>
                </motion.button>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function V24Case({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <button onClick={() => go('work')} className="text-[14px] text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1">
            <ArrowRight size={14} className="rotate-180" /> Back
          </button>
          <h1 className={h2Class}>{PROJECTS[0].title}</h1>
          <p className={`${bodyClass} mt-3 max-w-2xl`}>{PROJECTS[0].summary}</p>
        </FadeIn>
      </Section>

      {/* Cards-within-cards layout */}
      <Section className="bg-[#F9FAFB]">
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Context</h2>
              <p className={bodyClass}>{CASE_DEEP.context}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Challenge</h2>
              <p className={bodyClass}>{CASE_DEEP.challenge}</p>
            </div>
          </FadeIn>
        </div>

        {/* 2x2 image grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {PROJECTS.slice(0, 4).map((p) => (
            <FadeIn key={p.id}><img src={p.cover} alt="" className="w-full rounded-2xl aspect-[16/10] object-cover" /></FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn><h2 className="text-xl font-semibold text-gray-900 mb-6">Approach</h2></FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          {CASE_DEEP.approach.map((a, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className={`${cardClass} p-6 shadow-sm`}>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[13px] font-bold text-gray-500 mb-3">{i + 1}</div>
                <h3 className="text-[15px] font-semibold text-gray-900">{a.title}</h3>
                <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-[#F9FAFB]">
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Outcomes</h2>
              <ul className="space-y-3">
                {CASE_DEEP.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /><span className="text-[15px] text-gray-600">{o}</span></li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Deliverables</h2>
              <div className="flex flex-wrap gap-2">
                {CASE_DEEP.deliverables.map((d) => (
                  <span key={d} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[14px] rounded-lg">{d}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

function V24About() {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn><h1 className={h2Class}>About</h1></FadeIn>

        {/* Card-based layout */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <FadeIn>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Background</h2>
              <p className={bodyClass}>{ABOUT_DEEP.intro}</p>
              <p className={`${bodyClass} mt-3`}>{ABOUT_DEEP.now}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Current focus</h2>
              <p className={bodyClass}>{ABOUT_DEEP.ai}</p>
              <p className={`${bodyClass} mt-3 italic`}>{ABOUT_DEEP.philosophy}</p>
              <p className={`text-[15px] text-gray-500 mt-4`}>{ABOUT_DEEP.location}</p>
            </div>
          </FadeIn>
        </div>

        {/* Experience as cards */}
        <FadeIn delay={0.1}>
          <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-6">Experience</h2>
          <div className="space-y-4">
            {ABOUT_DEEP.experience.map((exp, i) => (
              <div key={i} className={`${cardClass} p-5 shadow-sm flex items-start justify-between`}>
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-[14px] text-gray-500">{exp.company}</p>
                  <p className="text-[14px] text-gray-600 mt-2">{exp.desc}</p>
                </div>
                <span className={`${secondaryClass} flex-shrink-0 ml-4`}>{exp.period}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Values + Tools cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <FadeIn delay={0.15}>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Values</h2>
              {ABOUT_DEEP.values.map((v) => (
                <div key={v.title} className="mb-4 last:mb-0">
                  <h3 className="text-[15px] font-semibold text-gray-900">{v.title}</h3>
                  <p className="text-[14px] text-gray-600 mt-1">{v.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className={`${cardClass} p-6 shadow-sm`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Tools</h2>
              <div className="flex flex-wrap gap-2">
                {ABOUT_DEEP.tools.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[14px] rounded-lg border border-gray-100">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

function V24Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn><h1 className={h2Class}>Resources</h1></FadeIn>

        {/* Card stack */}
        <div className="mt-10 space-y-[-8px]">
          {RESOURCES.map((r, i) => {
            const Icon = resourceIcon(r.type);
            return (
              <FadeIn key={r.id} delay={i * 0.04}>
                <motion.div
                  className={`${cardClass} p-5 relative shadow-sm`}
                  style={{ zIndex: RESOURCES.length - i }}
                  whileHover={{ y: -4, zIndex: 20 }}
                  transition={spring}
                >
                  <div className="flex gap-4 items-start">
                    {r.type === 'guide' && 'cover' in r ? (
                      <img src={r.cover} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} weight="duotone" className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{r.type}</span>
                      <h3 className="text-[15px] font-semibold text-gray-900 mt-1">{r.title}</h3>
                      <p className="text-[14px] text-gray-500 mt-1">{r.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export function V24() {
  const { page, go } = usePageNav();
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      <ConceptNav page={page} go={go} />
      {page === 'home' && <V24Home go={go} />}
      {page === 'work' && <V24Work go={go} />}
      {page === 'gallery' && <V21Gallery go={go} />}
      {page === 'case' && <V24Case go={go} />}
      {page === 'about' && <V24About />}
      {page === 'blog' && <V24Blog go={go} />}
      <FloatingGuide go={go} />
      <StickyCTABar />
      <StickyBackToTop />
      <StickyPrevNext
        prev={page === 'case' ? { label: 'Work', page: 'work' } : undefined}
        next={page === 'work' ? { label: 'Case Study', page: 'case' } : page === 'case' ? { label: 'About', page: 'about' } : undefined}
        go={go}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   V25: "Bento" - Mixed-size grid layout
   ═══════════════════════════════════════════════════════════════ */

function V25Home({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          {/* Bento grid */}
          <div className="grid md:grid-cols-3 gap-4 auto-rows-auto">
            {/* Hero text: spans 2 cols */}
            <div className="md:col-span-2 rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #EEF2FF, #FEF3F2, #ECFDF5)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className={secondaryClass}>{HERO.availability}</span>
              </div>
              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-gray-900">{HERO.title}</h1>
              <p className={`${bodyClass} mt-4 max-w-xl`}>{HERO.desc}</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => go('work')} className={btnPrimary}>View work <ArrowRight size={16} /></button>
              </div>
            </div>

            {/* Featured project: 1 col tall */}
            <button onClick={() => go('case')} className={`${cardHoverClass} overflow-hidden text-left md:row-span-2`}>
              <img src={PROJECTS[0].cover} alt={PROJECTS[0].title} className="w-full aspect-[4/3] object-cover rounded-t-2xl" />
              <div className="p-5">
                <span className="text-[12px] font-medium text-gray-400">{PROJECTS[0].category}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{PROJECTS[0].title}</h3>
                <p className="text-[14px] text-gray-500 mt-1">{PROJECTS[0].role}</p>
                <p className="text-[14px] text-gray-600 mt-2 line-clamp-3">{PROJECTS[0].summary}</p>
              </div>
            </button>

            {/* Expertise: 1 col */}
            <div className={`${cardClass} p-5`}>
              <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Expertise</h3>
              {PILLARS.map((p) => (
                <div key={p.title} className="flex items-start gap-3 mb-3 last:mb-0">
                  <p.icon size={18} weight="duotone" className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[14px] font-semibold text-gray-900">{p.title}</span>
                    <p className="text-[13px] text-gray-500 mt-0.5 line-clamp-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial: spans 2 cols */}
            <div className="md:col-span-2 rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #ECFDF5, #EEF2FF)' }}>
              <Quotes size={24} weight="fill" className="text-gray-300 mb-2" />
              <p className="text-[17px] font-medium text-gray-900 leading-relaxed">{TESTIMONIALS[0].content}</p>
              <p className="text-[14px] text-gray-500 mt-3">{TESTIMONIALS[0].author}, {TESTIMONIALS[0].role}</p>
            </div>

            {/* Resources: 1 col */}
            <div className={`${cardClass} p-5`}>
              <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Resources</h3>
              {RESOURCES.slice(0, 3).map((r) => {
                const Icon = resourceIcon(r.type);
                return (
                  <button key={r.id} onClick={() => go('blog')} className="flex items-center gap-2.5 mb-2.5 last:mb-0 text-left w-full hover:bg-gray-50 rounded-lg -mx-2 px-2 py-1.5 transition-colors">
                    <Icon size={16} weight="duotone" className="text-gray-400 flex-shrink-0" />
                    <span className="text-[14px] text-gray-700 truncate">{r.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Logos */}
            <div className="md:col-span-2 flex items-center gap-6 px-4 py-3 overflow-x-auto">
              {LOGOS.map((l) => (
                <span key={l} className="text-[13px] font-medium text-gray-300 whitespace-nowrap">{l}</span>
              ))}
            </div>

            {/* Availability badge */}
            <div className={`${cardClass} p-4 flex items-center gap-3`}>
              <Calendar size={20} weight="duotone" className="text-gray-400" />
              <div>
                <p className="text-[14px] font-semibold text-gray-900">{HERO.availability}</p>
                <p className="text-[13px] text-gray-500">Paris, remote OK</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function V25Work({ go }: { go: (p: PageId) => void }) {
  const [filter, setFilter] = useState<'all' | 'case-study' | 'short'>('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.format === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <h1 className={h2Class}>Work</h1>
          <div className="flex gap-2 mt-6">
            {([['all', 'All'], ['case-study', 'Case Studies'], ['short', 'Experiments']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                  filter === key ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Bento work grid */}
        <div className="mt-10 space-y-4">
          {/* Featured: full width */}
          {featured && (
            <FadeIn>
              <button onClick={() => go('case')} className={`${cardHoverClass} overflow-hidden text-left w-full md:flex`}>
                <img src={featured.cover} alt={featured.title} className="md:w-1/2 aspect-[16/10] object-cover rounded-l-2xl" />
                <div className="p-6 flex flex-col justify-center">
                  <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{featured.category}</span>
                  <h2 className="text-xl font-semibold text-gray-900 mt-2">{featured.title}</h2>
                  <p className="text-[14px] text-gray-500 mt-1">{featured.role} / {featured.period}</p>
                  <p className={`${bodyClass} mt-3`}>{featured.summary}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-[14px] font-medium text-gray-900">View project <ArrowUpRight size={14} /></span>
                </div>
              </button>
            </FadeIn>
          )}

          {/* Rest in bento grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {rest.map((p, i) => {
              const isCaseStudy = p.format === 'case-study';
              return (
                <FadeIn key={p.id} delay={i * 0.04} className={isCaseStudy ? 'md:col-span-2' : ''}>
                  <button onClick={() => go('case')} className={`${cardHoverClass} overflow-hidden text-left w-full h-full`}>
                    <img src={p.cover} alt={p.title} className={`w-full object-cover rounded-t-2xl ${isCaseStudy ? 'aspect-[21/9]' : 'aspect-[16/10]'}`} />
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-gray-400">{p.category}</span>
                        <span className="text-[12px] text-gray-300">{p.period}</span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-gray-900 mt-1">{p.title}</h3>
                      {isCaseStudy && <p className="text-[14px] text-gray-500 mt-1 line-clamp-1">{p.summary}</p>}
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}

function V25Case({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn>
          <button onClick={() => go('work')} className="text-[14px] text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1">
            <ArrowRight size={14} className="rotate-180" /> Back
          </button>
          <h1 className={h2Class}>{PROJECTS[0].title}</h1>
          <p className={`${bodyClass} mt-3 max-w-2xl`}>{PROJECTS[0].summary}</p>
        </FadeIn>
      </Section>

      {/* Bento-like sections */}
      <Section className="bg-[#F9FAFB]">
        <div className="grid md:grid-cols-2 gap-4">
          <FadeIn>
            <div className={`${cardClass} p-6`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Context</h2>
              <p className={bodyClass}>{CASE_DEEP.context}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className={`${cardClass} p-6`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Challenge</h2>
              <p className={bodyClass}>{CASE_DEEP.challenge}</p>
            </div>
          </FadeIn>
        </div>

        {/* Bento image grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <FadeIn className="col-span-2"><img src={PROJECTS[0].cover} alt="" className="w-full rounded-2xl aspect-[16/9] object-cover" /></FadeIn>
          <FadeIn delay={0.05}><img src={PROJECTS[1].cover} alt="" className="w-full rounded-2xl aspect-[16/9] object-cover h-full" /></FadeIn>
        </div>
      </Section>

      <Section>
        <FadeIn><h2 className="text-xl font-semibold text-gray-900 mb-6">Approach</h2></FadeIn>
        <div className="grid md:grid-cols-2 gap-4">
          {CASE_DEEP.approach.map((a, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className={`${cardClass} p-5`}>
                <span className="text-[24px] font-bold text-gray-200">{i + 1}</span>
                <h3 className="text-[15px] font-semibold text-gray-900 mt-2">{a.title}</h3>
                <p className="text-[14px] text-gray-600 mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-[#F9FAFB]">
        <div className="grid md:grid-cols-3 gap-4">
          <FadeIn className="md:col-span-2">
            <div className={`${cardClass} p-6`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Outcomes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {CASE_DEEP.outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" /><span className="text-[15px] text-gray-600">{o}</span></div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className={`${cardClass} p-6`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Deliverables</h2>
              <div className="flex flex-wrap gap-2">
                {CASE_DEEP.deliverables.map((d) => (
                  <span key={d} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[13px] rounded-lg">{d}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

function V25About() {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn><h1 className={h2Class}>About</h1></FadeIn>

        {/* Bento grid mixing photo, bio, values, experience, tools */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {/* Photo */}
          <FadeIn>
            <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
              <span className={secondaryClass}>Photo</span>
            </div>
          </FadeIn>

          {/* Bio: spans 2 cols */}
          <FadeIn delay={0.05} className="md:col-span-2">
            <div className={`${cardClass} p-6 h-full`}>
              <p className={bodyClass}>{ABOUT_DEEP.intro}</p>
              <p className={`${bodyClass} mt-3`}>{ABOUT_DEEP.now}</p>
              <p className={`${bodyClass} mt-3`}>{ABOUT_DEEP.ai}</p>
              <p className={`text-[15px] text-gray-500 mt-4`}>{ABOUT_DEEP.location}</p>
            </div>
          </FadeIn>

          {/* Values: spans 2 cols */}
          <FadeIn delay={0.1} className="md:col-span-2">
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #EEF2FF, #FEF3F2, #ECFDF5)' }}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Values</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {ABOUT_DEEP.values.map((v) => (
                  <div key={v.title}>
                    <h3 className="text-[15px] font-semibold text-gray-900">{v.title}</h3>
                    <p className="text-[14px] text-gray-600 mt-1">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Tools */}
          <FadeIn delay={0.15}>
            <div className={`${cardClass} p-5`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Tools</h2>
              <div className="flex flex-wrap gap-1.5">
                {ABOUT_DEEP.tools.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[13px] rounded-md">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Experience: spans 3 cols */}
          <FadeIn delay={0.2} className="md:col-span-3">
            <div className={`${cardClass} p-6`}>
              <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Experience</h2>
              <div className="grid md:grid-cols-5 gap-4">
                {ABOUT_DEEP.experience.map((exp, i) => (
                  <div key={i}>
                    <span className="text-[12px] text-gray-400">{exp.period}</span>
                    <h3 className="text-[14px] font-semibold text-gray-900 mt-1">{exp.role}</h3>
                    <p className="text-[13px] text-gray-500">{exp.company}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Philosophy */}
          <FadeIn delay={0.25} className="md:col-span-3">
            <div className="rounded-2xl p-6 bg-[#F9FAFB] text-center">
              <p className="text-[20px] font-medium text-gray-700 italic max-w-xl mx-auto">{ABOUT_DEEP.philosophy}</p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
}

function V25Blog({ go }: { go: (p: PageId) => void }) {
  return (
    <div style={{ fontFamily }}>
      <Section>
        <FadeIn><h1 className={h2Class}>Resources</h1></FadeIn>

        {/* Bento grid: guide spans 2 cols */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <FadeIn className="md:col-span-2">
            <div className={`${cardHoverClass} overflow-hidden h-full`}>
              <img src={RESOURCES[0].cover} alt="" className="w-full aspect-[21/9] object-cover rounded-t-2xl" />
              <div className="p-6">
                <span className="text-[12px] font-medium text-indigo-500 uppercase tracking-wider">Guide</span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2">{RESOURCES[0].title}</h2>
                <p className="text-[15px] text-gray-600 mt-2">{RESOURCES[0].desc}</p>
                <p className={`${secondaryClass} mt-2`}>{'chapters' in RESOURCES[0] ? `${RESOURCES[0].chapters} chapters` : ''}</p>
              </div>
            </div>
          </FadeIn>

          {RESOURCES.slice(1).map((r, i) => {
            const Icon = resourceIcon(r.type);
            return (
              <FadeIn key={r.id} delay={i * 0.05}>
                <div className={`${cardClass} p-5 h-full`}>
                  <Icon size={24} weight="duotone" className="text-gray-400 mb-3" />
                  <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{r.type}</span>
                  <h3 className="text-[15px] font-semibold text-gray-900 mt-1">{r.title}</h3>
                  <p className="text-[14px] text-gray-500 mt-2">{r.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export function V25() {
  const { page, go } = usePageNav();
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      <ConceptNav page={page} go={go} />
      {page === 'home' && <V25Home go={go} />}
      {page === 'work' && <V25Work go={go} />}
      {page === 'gallery' && <V21Gallery go={go} />}
      {page === 'case' && <V25Case go={go} />}
      {page === 'about' && <V25About />}
      {page === 'blog' && <V25Blog go={go} />}
      <FloatingGuide go={go} />
      <StickyCTABar />
      <StickyBackToTop />
    </div>
  );
}
