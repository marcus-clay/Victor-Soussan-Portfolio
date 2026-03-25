'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { V21, V22, V23, V24, V25 } from './ConceptsV21to25';
import { V26, V27 } from './ConceptsV26to27';
import { StickyLayer, SectionProgress, ContinueReading, TestimonialScroller, ScrollRevealCallout, HoverRevealProjectCard, SitemapToggle } from './ConceptSharedUI';
import { VariantLCA, VariantFullBleed } from './ConceptsVisual';
import { VariantMotion } from './ConceptsMotion';
import { VariantHeroNarrative, VariantArticlePremium } from './ConceptsHeroNarrative';
import { SynthesisA, SynthesisB, SynthesisC } from './ConceptsSynthesis';
import { SynthesisD } from './ConceptsSynthesisD';
import { RealmacBlue } from './ConceptsRealmacBlue';
import { MacPawFull } from './ConceptsMacPawFull';
import { MacPawXL } from './ConceptsMacPawXL';
import { StripeFull } from './ConceptsStripeFull';
import { GeminiDark, GeminiLight, GeminiHybrid } from './ConceptsGeminiStyle';
import { V28, V29, V30, V31, V32 } from './ConceptsGemini';
import { V33, V34, V35, V36, V37 } from './ConceptsGeminiEditorial';
import { 
  ArrowUpRight, ArrowRight, CaretDown, Star, Sparkle, Image as ImageIcon, 
  Fingerprint, Drop, List, Cpu, PencilSimple, Compass, UsersThree, 
  Quotes, Envelope, Calendar, BookOpen, Article, Layout, CaretRight, 
  Play, Lightning, Target, Users
} from '@phosphor-icons/react';

const CASE_DEEP = {
  challenge: 'Challenge text',
  context: 'Context text',
  approach: [{ title: 'Step 1', desc: 'Desc' }, { title: 'Step 2', desc: 'Desc' }],
  outcomes: ['Outcome 1', 'Outcome 2'],
  deliverables: ['Deliv 1', 'Deliv 2']
};

const ABOUT_DEEP = {
  intro: 'Intro text',
  now: 'Now text',
  ai: 'AI text',
  philosophy: 'Philosophy text',
  location: 'Paris, France',
  values: [{ title: 'Value 1', desc: 'Desc' }, { title: 'Value 2', desc: 'Desc' }],
  experience: [{ role: 'Role', company: 'Org', period: '2020', desc: 'Desc' }],
  tools: ['Tool 1', 'Tool 2']
};

/* ── SHARED DATA ── */
const HERO = {
  tagline: 'Frame. Design. Ship.',
  title: 'Lead Product Designer',
  subtitle: 'end-to-end',
  positioning: 'SaaS B2B & B2G, complex business interfaces, Design Systems, AI-driven design & prototyping',
  desc: '15 years in tech, 10 in product design. I help teams frame the problem, materialize the product vision through prototypes, and ship in short cycles.',
  availability: 'Available for new projects',
};

const PROJECTS = [
  { id: 'toolkit', title: 'Toolkit', role: 'Founding Designer', period: '2023-2024', summary: '0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP.', cover: '/images/thumbnail-toolkit.webp', category: 'Product Design' },
  { id: 'france-vae', title: 'France VAE', role: 'Lead Product Designer', period: '2024-2025', summary: 'National platform for professional certification, 100K+ candidates. Product ops structuring for a scaling public service.', cover: '/images/francevae/thumbnail_france_vae.webp', category: 'Product Design' },
  { id: 'dailymotion', title: 'Dailymotion Partner', role: 'Senior Product Designer', period: '2017-2018', summary: 'Redesigning the professional video management suite for tier-1 media partners.', cover: '/images/thumbnail-dailymotion-web-platform.webp', category: 'Product Design' },
  { id: 'sqool', title: 'SQOOL Suite', role: 'Product Design Manager', period: '2018-2024', summary: 'EdTech ecosystem for 500K+ students. Hardware company to SaaS transformation.', cover: '/images/thumbnail-sqool-suite.webp', category: 'Product Design' },
  { id: 'pagesjaunes', title: 'PagesJaunes', role: 'Mobile UI Lead', period: '2014-2017', summary: 'Mobile-first modernization for 22M+ users across iOS, Android, and Web.', cover: '/images/thumbnail-pagesjaunes-multidevices.webp', category: 'Product Design' },
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
  { id: 'ai-design-workflows', type: 'article' as const, title: 'AI-assisted design workflows', desc: 'How AI changes the way designers prototype, test, and ship.', date: '2025-02' },
  { id: 'design-scoping', type: 'template' as const, title: 'Template: Design Scoping', desc: 'The document I fill before opening Figma to align everyone on the Why.', date: '2024-01' },
  { id: 'design-system-figma', type: 'article' as const, title: 'Design System with Claude Code', desc: 'Designing in Figma, implementing with AI. Zero drift between design and code.', date: '2025-03' },
];

const LOGOS = ['Beta.gouv', 'UNOWHY', 'Toolkit', 'Airbus', 'Orange', 'Dailymotion', 'Vinci', 'Bouygues'];

const resourceIcon = (type: 'guide' | 'article' | 'template') => {
  if (type === 'guide') return BookOpen;
  if (type === 'article') return Article;
  return Layout;
};

/* ── FadeIn utility (spring, faster) ── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 260, damping: 24, delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Shared Nav (light tech-craft) ── */
function LightNav({ variant = 'default' }: { variant?: string }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-[-0.01em] text-gray-900">Victor Soussan</span>
        <div className="hidden md:flex items-center gap-7">
          <span className="text-[13px] text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">Projects</span>
          <span className="text-[13px] text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">Expertise</span>
          <span className="text-[13px] text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">Resources</span>
          <span className="text-[13px] text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">About</span>
          <button className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-[13px] font-medium hover:bg-gray-800 transition-colors">Contact</button>
        </div>
      </div>
    </nav>
  );
}

/* ── Shared CTA Section ── */
function CTASection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.03em] text-gray-900 mb-4">Let&apos;s work together</h2>
          <p className="text-gray-400 text-base mb-8 max-w-sm mx-auto">Currently available for product design missions. Let&apos;s talk about what you&apos;re building.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="group px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
              Book a call <Calendar size={15} />
            </button>
            <button className="px-6 py-3 rounded-full text-sm text-gray-500 border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
              victor@victorsoussan.fr <Envelope size={15} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V1: TOFU — Discovery-first, thought leadership prominent
   Positioning: "I write about what I practice"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V1() {
  return (
    <div className="bg-[#FAFAFA] text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />

      {/* Hero: Thought leadership first */}
      <header className="min-h-[100dvh] flex items-center pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <div className="max-w-[720px]">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[11px] text-emerald-700 font-medium">{HERO.availability}</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-6 text-gray-900">
                I design products<br />that work<span className="text-gray-300">.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-[540px] mb-4">{HERO.desc}</p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="font-mono text-[10px] text-gray-300 tracking-[0.1em] uppercase mb-8">{HERO.positioning}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex gap-3">
                <button className="group px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all">
                  View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
                </button>
                <button className="px-6 py-3 rounded-full text-sm text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-white transition-all">
                  Read resources
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* Resources first (TOFU: content leads) */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Thinking & writing</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1">Resources</h2>
              </div>
              <button className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">All resources <ArrowRight size={12} /></button>
            </div>
          </FadeIn>

          {/* Featured guide */}
          <FadeIn delay={0.05}>
            <div className="group cursor-pointer mb-6 p-6 md:p-8 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.02] transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="w-full md:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={RESOURCES[0].cover} alt={RESOURCES[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={14} className="text-gray-400" />
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Guide · {RESOURCES[0].chapters} chapters</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-[-0.02em] mb-2 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-md">{RESOURCES[0].desc}</p>
                </div>
                <ArrowUpRight size={18} className="text-gray-200 group-hover:text-gray-400 transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </FadeIn>

          {/* Other resources in grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESOURCES.slice(1).map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={0.08 + i * 0.05}>
                  <div className="group cursor-pointer p-5 rounded-xl bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-gray-900/[0.02] transition-all duration-500 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={13} className="text-gray-400" />
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">{r.type}</span>
                    </div>
                    <h3 className="text-sm font-semibold tracking-[-0.01em] mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Work</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-10">Selected projects</h2>
          </FadeIn>
          <div className="space-y-4">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <div className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-6 px-6 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/[0.02] transition-all duration-500 cursor-pointer">
                  <div className="w-full md:w-40 aspect-[16/10] rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{p.title}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{p.summary}</p>
                  </div>
                  <div className="shrink-0 hidden md:block">
                    <span className="font-mono text-[10px] text-gray-300">{p.period}</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise (compact) */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Capabilities</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-10">Expertise</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-gray-100">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="py-8 md:pr-10 border-b md:border-b-0 md:border-r last:border-r-0 border-gray-100 md:pl-8 first:md:pl-0">
                  <pillar.icon size={24} weight="regular" className="text-gray-900 mb-4" />
                  <h3 className="text-base font-bold tracking-[-0.01em] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-16 pt-8 border-t border-gray-100">
              <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Trusted by</span>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4">
                {LOGOS.map((n) => <span key={n} className="text-xs text-gray-200 font-medium">{n}</span>)}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-gray-100">
              <Quotes size={20} weight="fill" className="text-gray-200 mb-4" />
              <blockquote className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">{TESTIMONIALS[0].content}</blockquote>
              <p className="text-sm"><span className="font-semibold text-gray-900">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V2: MOFU — Methodology-first, expertise prominent
   Positioning: "My process is my product"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V2() {
  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />

      {/* Hero: Split, methodology visible */}
      <header className="min-h-[100dvh] flex items-center pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[11px] text-emerald-700 font-medium">{HERO.availability}</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">
                  Frame the problem.<br />
                  <span className="text-gray-300">Then design the solution.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-base text-gray-500 leading-relaxed max-w-[480px] mb-8">{HERO.desc}</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="flex gap-3">
                  <button className="group px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all">
                    See how I work <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </div>
              </FadeIn>
            </div>
            <div className="hidden md:block">
              <FadeIn delay={0.2}>
                <div className="space-y-3">
                  {['Frame', 'Research', 'Prototype', 'Test', 'Ship'].map((step, i) => (
                    <div key={step} className="flex items-center gap-4 p-4 rounded-xl bg-[#FAFAFA] border border-gray-100 group hover:border-gray-200 transition-all cursor-default">
                      <span className="font-mono text-[10px] text-gray-300 w-5">0{i + 1}</span>
                      <span className="text-sm font-semibold tracking-[-0.01em] flex-1">{step}</span>
                      <div className={`w-12 h-1 rounded-full ${i < 3 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </header>

      {/* Expertise: expanded methodology */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">How I work</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-12">Expertise</h2>
          </FadeIn>
          {PILLARS.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-7 border-b border-gray-200/60 cursor-default">
                <div className="flex items-center gap-4 md:w-72">
                  <pillar.icon size={22} weight="regular" className="text-gray-900 shrink-0" />
                  <h3 className="text-base font-bold tracking-[-0.01em]">{pillar.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Projects: visual grid */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Selected work</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-10">Projects</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div className="group cursor-pointer">
                  <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-500">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    </div>
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{p.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{p.role}</p>
                      </div>
                      <span className="font-mono text-[10px] text-gray-300 mt-0.5">{p.period}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resources: methodology-adjacent content */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Learn</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1">Resources</h2>
              </div>
              <button className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">View all <ArrowRight size={12} /></button>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESOURCES.map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={i * 0.05}>
                  <div className="group cursor-pointer flex gap-5 p-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-gray-900/[0.02] transition-all duration-500">
                    {r.cover && (
                      <div className="w-20 aspect-square rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <img src={r.cover} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={12} className="text-gray-400" />
                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">{r.type}</span>
                      </div>
                      <h3 className="text-sm font-semibold tracking-[-0.01em] mb-1 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{r.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <Quotes size={20} weight="fill" className="text-gray-200 mb-5" />
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">{TESTIMONIALS[1].content}</blockquote>
            <p className="text-sm"><span className="font-semibold">{TESTIMONIALS[1].author}</span> <span className="text-gray-400">· {TESTIMONIALS[1].role}</span></p>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V3: BOFU — Results-first, social proof prominent
   Positioning: "Here's what I delivered"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V3() {
  return (
    <div className="bg-[#FAFAFA] text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />

      {/* Hero: Results-oriented with metrics-like layout */}
      <header className="min-h-[100dvh] flex items-center pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-8">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-medium">{HERO.availability}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(2.2rem,5vw,4.2rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-6 max-w-[700px]">
              Lead Product Designer,<br />
              <span className="text-gray-300">15 years shipping products.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base text-gray-500 leading-relaxed max-w-[540px] mb-10">{HERO.desc}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-[600px]">
              {[
                { label: 'Years in tech', value: '15' },
                { label: 'Products shipped', value: '12+' },
                { label: 'Designers mentored', value: '8' },
                { label: 'End users reached', value: '22M+' },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-white border border-gray-100">
                  <span className="text-xl font-bold tracking-[-0.03em] text-gray-900">{m.value}</span>
                  <p className="font-mono text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex gap-3">
              <button className="group px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all">
                View projects <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
              </button>
              <button className="px-6 py-3 rounded-full text-sm text-gray-500 border border-gray-200 hover:border-gray-300 transition-all">1-min Presentation</button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Projects: large visual cards */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Track record</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-10">Selected projects</h2>
          </FadeIn>
          <div className="space-y-16">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={0.05}>
                <div className={`group flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-center cursor-pointer`}>
                  <div className="flex-1 w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-gray-200 transition-all duration-500">
                    <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                  </div>
                  <div className="flex-1 w-full md:max-w-sm">
                    <span className="font-mono text-[10px] text-gray-300 uppercase tracking-wider">{p.period}</span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-[-0.02em] mt-2 mb-3 group-hover:text-gray-600 transition-colors">{p.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-2">{p.role}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.summary}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      Read case study <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials: prominent */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Social proof</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-10">What they say</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 md:p-8 rounded-xl bg-white border border-gray-100 h-full">
                  <Quotes size={18} weight="fill" className="text-gray-200 mb-4" />
                  <blockquote className="text-sm md:text-base text-gray-600 leading-relaxed mb-5">{t.content}</blockquote>
                  <p className="text-xs"><span className="font-semibold text-gray-900">{t.author}</span> <span className="text-gray-400">· {t.role}</span></p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-14 pt-8 border-t border-gray-100">
              <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase mb-4 block">Companies</span>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {LOGOS.map((n) => <span key={n} className="text-xs text-gray-200 font-medium">{n}</span>)}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Resources (compact, secondary) */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Resources</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1">Writing & tools</h2>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {RESOURCES.map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={i * 0.04}>
                  <div className="group cursor-pointer p-4 rounded-lg bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 transition-all duration-400 h-full">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon size={12} className="text-gray-400" />
                      <span className="font-mono text-[9px] text-gray-300 uppercase tracking-wider">{r.type}</span>
                    </div>
                    <h3 className="text-xs font-semibold tracking-[-0.01em] group-hover:text-gray-600 transition-colors leading-snug">{r.title}</h3>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V4: Progressive Disclosure — Minimal surface, rich depth
   Positioning: "Less visible, more to discover"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V4() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />

      {/* Hero: Ultra minimal */}
      <header className="min-h-[100dvh] flex items-end pb-20 pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-600 font-medium">{HERO.availability}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-6">
              Victor Soussan
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-gray-400 max-w-[500px] leading-relaxed mb-4">
              Lead Product Designer, end-to-end. I frame problems and ship solutions.
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-mono text-[10px] text-gray-300 tracking-[0.1em] uppercase max-w-[500px]">{HERO.positioning}</p>
          </FadeIn>
        </div>
      </header>

      {/* Projects: Expandable list */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Work</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-8">Projects</h2>
          </FadeIn>
          <div className="space-y-0">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.04}>
                <div className="border-b border-gray-200/60">
                  <button
                    onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                    className="w-full flex items-center gap-6 py-5 text-left group"
                  >
                    <span className="font-mono text-[10px] text-gray-300 w-6">0{i + 1}</span>
                    <span className="text-base font-semibold tracking-[-0.01em] flex-1 group-hover:text-gray-600 transition-colors">{p.title}</span>
                    <span className="text-xs text-gray-300 hidden md:block">{p.role}</span>
                    <span className="font-mono text-[10px] text-gray-300">{p.period}</span>
                    <motion.div animate={{ rotate: expandedProject === p.id ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <CaretRight size={14} className="text-gray-300" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedProject === p.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-12 md:pl-16">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-64 aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-md">{p.summary}</p>
                              <button className="text-sm font-medium text-gray-900 flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                                Read case study <ArrowRight size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise: minimal */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div>
                  <pillar.icon size={22} weight="regular" className="text-gray-900 mb-3" />
                  <h3 className="text-base font-bold tracking-[-0.01em] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resources: Horizontal scroll strip */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Resources</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1">Explore</h2>
              </div>
            </div>
          </FadeIn>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x">
            {RESOURCES.map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={i * 0.05}>
                  <div className="group cursor-pointer min-w-[260px] p-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 snap-start">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={13} className="text-gray-400" />
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">{r.type}</span>
                    </div>
                    <h3 className="text-sm font-semibold tracking-[-0.01em] mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial: minimal inline */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <blockquote className="text-lg md:text-2xl text-gray-400 leading-relaxed font-medium tracking-[-0.02em]">
              &ldquo;{TESTIMONIALS[0].content}&rdquo;
            </blockquote>
            <p className="text-sm mt-6"><span className="font-semibold text-gray-900">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V5: Editorial Precision — Magazine meets tech
   Positioning: "Craft in every pixel, clarity in every word"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V5() {
  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />

      {/* Hero: Editorial split */}
      <header className="min-h-[100dvh] flex items-center pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <FadeIn>
                <div className="inline-flex items-center gap-2 mb-8">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[11px] text-emerald-600 font-medium">{HERO.availability}</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">
                  Lead Product<br />Designer
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-base text-gray-500 leading-relaxed mb-6 max-w-sm">{HERO.desc}</p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="font-mono text-[10px] text-gray-300 tracking-[0.1em] uppercase mb-8">{HERO.positioning}</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="flex gap-3">
                  <button className="group px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all">
                    Explore <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </FadeIn>
            </div>
            <div className="md:col-span-7 hidden md:block">
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3]">
                    <img src={PROJECTS[0].cover} alt="" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                  <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3] mt-8">
                    <img src={PROJECTS[1].cover} alt="" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </header>

      {/* Projects: editorial zig-zag */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Selected work</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mt-1 mb-12">Projects</h2>
          </FadeIn>
          {PROJECTS.slice(0, 4).map((p, i) => (
            <FadeIn key={p.id} delay={0.05}>
              <div className={`group flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-center mb-12 last:mb-0 cursor-pointer`}>
                <div className="flex-1 w-full rounded-xl overflow-hidden bg-white border border-gray-100 group-hover:border-gray-200 transition-all duration-500">
                  <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                </div>
                <div className="flex-1 w-full md:max-w-sm">
                  <span className="font-mono text-[10px] text-gray-300 uppercase tracking-wider">{p.category} · {p.period}</span>
                  <h3 className="text-lg md:text-xl font-bold tracking-[-0.02em] mt-2 mb-2 group-hover:text-gray-600 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.summary}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    View project <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Resources + Expertise side by side */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Resources */}
            <div className="md:col-span-7">
              <FadeIn>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Thinking</span>
                    <h2 className="text-2xl font-bold tracking-[-0.03em] mt-1">Resources</h2>
                  </div>
                  <button className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">All <ArrowRight size={12} /></button>
                </div>
              </FadeIn>
              <div className="space-y-3">
                {RESOURCES.map((r, i) => {
                  const Icon = resourceIcon(r.type);
                  return (
                    <FadeIn key={r.id} delay={i * 0.05}>
                      <div className="group cursor-pointer flex items-center gap-4 p-4 rounded-lg bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-400">
                        <Icon size={16} className="text-gray-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{r.title}</h3>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{r.desc}</p>
                        </div>
                        <ArrowRight size={12} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>

            {/* Expertise */}
            <div className="md:col-span-5">
              <FadeIn>
                <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Capabilities</span>
                <h2 className="text-2xl font-bold tracking-[-0.03em] mt-1 mb-8">Expertise</h2>
              </FadeIn>
              <div className="space-y-6">
                {PILLARS.map((pillar, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="flex gap-4">
                      <pillar.icon size={20} weight="regular" className="text-gray-900 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold tracking-[-0.01em] mb-1">{pillar.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn>
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <span className="font-mono text-[10px] text-gray-300 tracking-[0.15em] uppercase">Companies</span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                    {LOGOS.map((n) => <span key={n} className="text-xs text-gray-200 font-medium">{n}</span>)}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAFA]">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="flex gap-6 md:gap-10">
              <div className="w-1 bg-gray-200 rounded-full shrink-0" />
              <div>
                <blockquote className="text-base md:text-lg text-gray-600 leading-relaxed mb-5">{TESTIMONIALS[0].content}</blockquote>
                <p className="text-sm"><span className="font-semibold">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V6: APPLE TYPO — Large type, clean surfaces, multi-page preview
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V6() {
  const [page, setPage] = useState<'home' | 'case' | 'about' | 'blog'>('home');

  const PageNav = () => (
    <div className="flex gap-1 mt-6 mb-12">
      {(['home', 'case', 'about', 'blog'] as const).map(p => (
        <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${page === p ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          {p === 'home' ? 'Homepage' : p === 'case' ? 'Case Study' : p === 'about' ? 'About' : 'Blog'}
        </button>
      ))}
    </div>
  );

  const Home6 = () => (
    <>
      <header className="min-h-[100dvh] flex items-center pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-medium">{HERO.availability}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.05em] leading-[0.88] text-gray-900 mb-8">
              Product<br />Designer.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-[580px] mb-4 font-medium tracking-[-0.02em]">{HERO.desc}</p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-sm text-gray-300 tracking-wide mb-10">{HERO.positioning}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex gap-3">
              <button className="group px-8 py-4 bg-gray-900 text-white rounded-full text-base font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all">
                View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={18} />
              </button>
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="py-24 md:py-36 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-4">Selected work.</h2>
            <p className="text-lg text-gray-400 mb-14 max-w-md">Products I helped frame, design, and ship.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div className="group cursor-pointer rounded-3xl overflow-hidden bg-white hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-700">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold tracking-[-0.02em] mb-1 group-hover:text-gray-600 transition-colors">{p.title}</h3>
                    <p className="text-sm text-gray-400">{p.role} · {p.period}</p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{p.summary}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-4">Expertise.</h2>
            <p className="text-lg text-gray-400 mb-14 max-w-lg">Three pillars that structure how I approach every project.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 rounded-3xl bg-[#F5F5F7]">
                  <pillar.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-xl font-bold tracking-[-0.02em] mb-3">{pillar.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-4">Resources.</h2>
            <p className="text-lg text-gray-400 mb-14 max-w-md">Guides, articles, and templates from practice.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESOURCES.map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={i * 0.05}>
                  <div className="group cursor-pointer p-6 rounded-2xl bg-white hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} weight="regular" className="text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{r.type}{r.chapters ? ` · ${r.chapters} chapters` : ''}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-[-0.01em] mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{r.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <Quotes size={28} weight="fill" className="text-gray-200 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-bold tracking-[-0.03em] leading-snug text-gray-700 mb-8">{TESTIMONIALS[0].content}</blockquote>
            <p className="text-base text-gray-400"><span className="font-semibold text-gray-700">{TESTIMONIALS[0].author}</span> · {TESTIMONIALS[0].role}</p>
          </FadeIn>
        </div>
      </section>
      <CTASection />
    </>
  );

  const Case6 = () => (
    <>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <FadeIn>
          <button className="text-sm text-gray-400 mb-8 flex items-center gap-1 hover:text-gray-600 transition-colors">
            <ArrowRight size={12} className="rotate-180" /> Back to projects
          </button>
          <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Case Study · 2023-2024</span>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.05em] leading-[0.9] mt-3 mb-6">Toolkit</h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed mb-12">0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP.</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="rounded-3xl overflow-hidden bg-gray-100 mb-16">
            <img src="/images/thumbnail-toolkit.webp" alt="Toolkit" className="w-full aspect-[21/9] object-cover" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <FadeIn>
              <div className="space-y-6">
                <div><span className="text-xs text-gray-300 uppercase tracking-wider font-medium">Role</span><p className="text-base font-semibold mt-1">Founding Designer</p></div>
                <div><span className="text-xs text-gray-300 uppercase tracking-wider font-medium">Duration</span><p className="text-base font-semibold mt-1">14 months</p></div>
                <div><span className="text-xs text-gray-300 uppercase tracking-wider font-medium">Team</span><p className="text-base font-semibold mt-1">CEO, CTO, 1 Designer</p></div>
                <div><span className="text-xs text-gray-300 uppercase tracking-wider font-medium">Deliverables</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['SaaS Platform', 'Gantt Module', 'Brand Identity', 'Pitch Deck'].map(d => (
                      <span key={d} className="px-3 py-1 rounded-full bg-[#F5F5F7] text-xs font-medium text-gray-600">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              <h2 className="text-2xl font-bold tracking-[-0.03em] mb-4">The challenge</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-8">Construction site managers coordinate dozens of subcontractors using spreadsheets, phone calls, and paper plans. The founding team had deep industry knowledge but no product vision translated into user flows. My role was to turn their understanding of the problem into a product that field workers would actually use.</p>
              <h2 className="text-2xl font-bold tracking-[-0.03em] mb-4">The approach</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-8">I spent the first two weeks on construction sites, observing how foremen managed their day. The key insight: they needed a tool that worked with gloves, in direct sunlight, with intermittent connectivity. Every design decision, from contrast ratios to touch target sizes, came from that constraint.</p>
              <h2 className="text-2xl font-bold tracking-[-0.03em] mb-4">Key decisions</h2>
              <ul className="space-y-3 text-base text-gray-500">
                <li className="flex gap-3"><span className="text-gray-300 shrink-0">01</span> Mobile-first architecture with offline capability baked into the interaction model</li>
                <li className="flex gap-3"><span className="text-gray-300 shrink-0">02</span> High-contrast UI system designed for outdoor readability</li>
                <li className="flex gap-3"><span className="text-gray-300 shrink-0">03</span> Gantt-based planning module adapted for non-technical users</li>
                <li className="flex gap-3"><span className="text-gray-300 shrink-0">04</span> Tailwind-ready component library for rapid frontend implementation</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );

  const About6 = () => (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <FadeIn>
            <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-[3/4]">
              <img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full h-full object-cover object-top" />
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-7">
          <FadeIn>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[0.9] mb-8">About.</h1>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-xl text-gray-500 leading-relaxed mb-6">I started in tech 15 years ago as a visual designer, then moved progressively toward product thinking, user research, and design management.</p>
            <p className="text-base text-gray-400 leading-relaxed mb-6">Today I work as a Lead Product Designer, primarily on complex B2B and B2G interfaces. SaaS platforms, EdTech ecosystems, public service digital products. The kind of projects where the real design challenge is not the visual layer but the information architecture underneath.</p>
            <p className="text-base text-gray-400 leading-relaxed mb-10">I&apos;m based in Paris. I work in French and English, on-site or remote. My current focus is on AI-assisted design workflows: using tools like Claude Code and Figma MCP to ship faster while maintaining design quality.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-bold tracking-[-0.03em] mb-4">Experience</h2>
            <div className="space-y-4 border-t border-gray-100 pt-4">
              {[
                { role: 'Lead Product Designer', co: 'France VAE (Beta.gouv)', y: '2024-2025' },
                { role: 'Founding Designer', co: 'Toolkit', y: '2023-2024' },
                { role: 'Product Design Manager', co: 'UNOWHY (SQOOL)', y: '2018-2024' },
                { role: 'Senior Product Designer', co: 'Dailymotion', y: '2017-2018' },
                { role: 'Mobile UI Lead', co: 'PagesJaunes (SoLocal)', y: '2014-2017' },
              ].map((e, i) => (
                <div key={i} className="flex items-baseline gap-4 py-2 border-b border-gray-50">
                  <span className="text-sm font-semibold flex-1">{e.role}</span>
                  <span className="text-sm text-gray-400">{e.co}</span>
                  <span className="font-mono text-[10px] text-gray-300">{e.y}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );

  const Blog6 = () => (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
      <FadeIn>
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[0.9] mb-4">Resources.</h1>
        <p className="text-xl text-gray-400 mb-14 max-w-lg">Guides, articles, and templates built from experience.</p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <div className="group cursor-pointer rounded-3xl overflow-hidden bg-[#F5F5F7] hover:shadow-xl hover:shadow-gray-900/[0.03] transition-all duration-700 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden">
              <img src="/images/guide-claude-code/hero-cover.png" alt="Guide" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Guide · 9 chapters</span>
              </div>
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-3 group-hover:text-gray-600 transition-colors">Getting started with Claude Code</h2>
              <p className="text-base text-gray-400 leading-relaxed">Complete guide for designers: from installation to deployment, visual quality, skills, and Figma MCP.</p>
            </div>
          </div>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {RESOURCES.slice(1).map((r, i) => {
          const Icon = resourceIcon(r.type);
          return (
            <FadeIn key={r.id} delay={0.08 + i * 0.05}>
              <div className="group cursor-pointer p-6 rounded-2xl bg-[#F5F5F7] hover:bg-white hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{r.type}</span>
                </div>
                <h3 className="text-lg font-bold tracking-[-0.01em] mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16">
        <PageNav />
      </div>
      {page === 'home' && <Home6 />}
      {page === 'case' && <Case6 />}
      {page === 'about' && <About6 />}
      {page === 'blog' && <Blog6 />}
      <StickyLayer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V7: RICH PROGRESSIVE DISCLOSURE — Floating modules, guide featured
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V7() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showGuidePreview, setShowGuidePreview] = useState(false);

  return (
    <div className="bg-white text-gray-900 min-h-screen relative" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />

      {/* Floating guide CTA */}
      <motion.div className="fixed right-6 bottom-24 z-[90]" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 0.5, type: 'spring' }}>
        <button
          onClick={() => setShowGuidePreview(!showGuidePreview)}
          className="group flex items-center gap-3 px-5 py-3 bg-gray-900 text-white rounded-2xl shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-500"
        >
          <BookOpen size={18} weight="fill" />
          <span className="text-sm font-medium">Guide Claude Code</span>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">9</span>
        </button>
      </motion.div>

      {/* Guide preview overlay */}
      <AnimatePresence>
        {showGuidePreview && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed right-6 bottom-40 z-[90] w-80 rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-gray-900/10 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
              <img src="/images/guide-claude-code/hero-cover.png" alt="Guide" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold tracking-[-0.01em] mb-1">Getting started with Claude Code</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">9 chapters. From installation to deploying production interfaces with AI assistance.</p>
              <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                Start reading
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero: Large type with animated reveal */}
      <header className="min-h-[100dvh] flex items-center pt-14">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-medium">{HERO.availability}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(3rem,7vw,7rem)] font-bold tracking-[-0.05em] leading-[0.85] text-gray-900 mb-8">
              Frame.<br /><span className="text-gray-300">Design.</span><br /><span className="text-gray-200">Ship.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-[540px] mb-12 tracking-[-0.01em]">{HERO.desc}</p>
          </FadeIn>

          {/* Interactive discovery modules */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'work', label: 'View work', icon: ArrowUpRight, count: PROJECTS.length },
                { id: 'expertise', label: 'Expertise', icon: Compass, count: PILLARS.length },
                { id: 'resources', label: 'Resources', icon: BookOpen, count: RESOURCES.length },
                { id: 'about', label: 'About me', icon: Users, count: undefined },
              ].map(mod => (
                <motion.button
                  key={mod.id}
                  onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                  className={`group flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-400 ${
                    activeModule === mod.id
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/15'
                      : 'bg-[#F5F5F7] text-gray-600 hover:bg-gray-200/80'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  <mod.icon size={16} />
                  {mod.label}
                  {mod.count && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeModule === mod.id ? 'bg-white/20' : 'bg-gray-300/30'}`}>{mod.count}</span>}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* Expandable module content */}
          <AnimatePresence mode="wait">
            {activeModule === 'work' && (
              <motion.div key="work" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECTS.slice(0, 4).map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      className="group flex gap-4 p-4 rounded-2xl bg-[#F5F5F7] hover:bg-white hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-500 cursor-pointer">
                      <div className="w-20 aspect-square rounded-xl overflow-hidden bg-gray-200 shrink-0">
                        <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold group-hover:text-gray-600 transition-colors">{p.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{p.role} · {p.period}</p>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{p.summary}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeModule === 'expertise' && (
              <motion.div key="expertise" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PILLARS.map((pillar, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-[#F5F5F7]">
                      <pillar.icon size={22} weight="regular" className="text-gray-900 mb-3" />
                      <h3 className="text-sm font-bold mb-1.5">{pillar.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeModule === 'resources' && (
              <motion.div key="resources" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="pt-8 space-y-3">
                  {RESOURCES.map((r, i) => {
                    const Icon = resourceIcon(r.type);
                    return (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] hover:bg-white hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-500 cursor-pointer">
                        <Icon size={18} className="text-gray-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold group-hover:text-gray-600 transition-colors">{r.title}</h3>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{r.desc}</p>
                        </div>
                        <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
            {activeModule === 'about' && (
              <motion.div key="about" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="pt-8 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                    <img src="/images/photos victor/image_victor_home.png" alt="Victor" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-base text-gray-500 leading-relaxed max-w-lg mb-4">15 years in tech, from visual design to product leadership. I work on complex B2B and B2G interfaces: SaaS platforms, EdTech, public services. Based in Paris, fluent in French and English.</p>
                    <button className="text-sm font-medium text-gray-900 flex items-center gap-1.5 hover:text-gray-600 transition-colors">Full profile <ArrowRight size={12} /></button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Featured content: Guide Claude Code (large) */}
      <section className="py-24 md:py-36 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <span className="text-sm text-gray-300 font-medium uppercase tracking-wider">Featured</span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mt-2 mb-10">Start here.</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="group cursor-pointer rounded-3xl overflow-hidden bg-white hover:shadow-2xl hover:shadow-gray-900/[0.05] transition-all duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src="/images/guide-claude-code/hero-cover.png" alt="Guide Claude Code" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={16} weight="fill" className="text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Guide · 9 chapters</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 group-hover:text-gray-600 transition-colors">Getting started with Claude Code</h3>
                  <p className="text-base text-gray-400 leading-relaxed mb-6">The complete reference for designers who want to ship real interfaces with AI. Installation, configuration, visual quality control, Figma MCP integration, and deployment.</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Installation', 'Figma MCP', 'Quality Control', 'Deployment', 'Skills'].map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[11px] font-medium text-gray-500">{t}</span>
                    ))}
                  </div>
                  <button className="self-start px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                    Start reading <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project showcase with hover animations */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-14">Work.</h2>
          </FadeIn>
          <div className="space-y-6">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <motion.div className="group cursor-pointer flex flex-col md:flex-row gap-6 p-5 rounded-3xl hover:bg-[#F5F5F7] transition-all duration-500" whileHover={{ x: 4 }}>
                  <div className="w-full md:w-48 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl font-bold tracking-[-0.02em] group-hover:text-gray-600 transition-colors">{p.title}</h3>
                      <span className="text-xs text-gray-300">{p.period}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{p.role}</p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{p.summary}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-200 group-hover:text-gray-400 transition-all shrink-0 mt-1" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial + logos */}
      <section className="py-24 md:py-36 px-6 bg-[#F5F5F7]">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <Quotes size={28} weight="fill" className="text-gray-200 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-bold tracking-[-0.03em] leading-snug text-gray-700 mb-8">{TESTIMONIALS[0].content}</blockquote>
            <p className="text-base text-gray-400 mb-16"><span className="font-semibold text-gray-700">{TESTIMONIALS[0].author}</span> · {TESTIMONIALS[0].role}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center">
              {LOGOS.map(n => <span key={n} className="text-sm text-gray-300 font-medium">{n}</span>)}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
      <StickyLayer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V8: SKEUOMORPHISM #1 — Warm, textured, Realmac style
   Deep shadows, warm gradients, rounded surfaces, tactile feel
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V8() {
  return (
    <div className="min-h-screen text-gray-900" style={{ fontFamily: "'Public Sans', system-ui, sans-serif", background: 'linear-gradient(180deg, #F8F6F3 0%, #EFEAE4 40%, #F2EDE7 100%)' }}>
      {/* Subtle grain overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* Nav: warm glass */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-[1100px]">
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-lg shadow-amber-900/[0.04]" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.8), 0 8px 32px rgba(120,80,40,0.06)' }}>
          <span className="text-sm font-bold tracking-[-0.01em]">Victor Soussan</span>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Projects</span>
            <span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Resources</span>
            <span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">About</span>
            <button className="px-5 py-2 bg-[#3B3121] text-[#F8F0E3] rounded-xl text-sm font-medium hover:bg-[#4A3D2B] transition-colors shadow-sm" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(59,49,33,0.2)' }}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero: warm, editorial, tactile */}
      <header className="min-h-[100dvh] flex items-center pt-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/50 border border-white/60 shadow-sm mb-10" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 8px rgba(120,80,40,0.05)' }}>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/30" />
                  <span className="text-[12px] text-emerald-800 font-medium">{HERO.availability}</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="text-[clamp(3rem,6.5vw,6rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-6 text-[#2A2318]">
                  Product<br />Designer.
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-lg text-[#7A6B55] leading-relaxed max-w-[480px] mb-10">{HERO.desc}</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="flex gap-3">
                  <button className="group px-7 py-3.5 bg-[#3B3121] text-[#F8F0E3] rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#4A3D2B] transition-all" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 16px rgba(59,49,33,0.25)' }}>
                    View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
                  </button>
                  <button className="px-7 py-3.5 bg-white/60 border border-white/80 rounded-xl text-sm font-medium text-[#5A4D3A] hover:bg-white/80 transition-all" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 8px rgba(120,80,40,0.06)' }}>
                    Resources
                  </button>
                </div>
              </FadeIn>
            </div>
            <div className="md:col-span-5 hidden md:block">
              <FadeIn delay={0.2}>
                <div className="p-2 rounded-3xl bg-white/40 border border-white/60" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 40px rgba(120,80,40,0.08)' }}>
                  <div className="rounded-[calc(1.5rem-8px)] overflow-hidden">
                    <img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full aspect-[3/4] object-cover object-top" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </header>

      {/* Projects: warm cards with deep shadows */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-[#2A2318] mb-14">Selected work.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white/50 border border-white/60 hover:bg-white/70 transition-all duration-700" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 32px rgba(120,80,40,0.06)' }}>
                  <div className="p-2">
                    <div className="rounded-xl overflow-hidden">
                      <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <h3 className="text-lg font-bold tracking-[-0.01em] text-[#2A2318] group-hover:text-[#5A4D3A] transition-colors">{p.title}</h3>
                    <p className="text-sm text-[#9A8B73] mt-1">{p.role} · {p.period}</p>
                    <p className="text-sm text-[#7A6B55] mt-2 leading-relaxed">{p.summary}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise: embossed cards */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-[#2A2318] mb-14">Expertise.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-7 rounded-2xl bg-white/40 border border-white/60" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 24px rgba(120,80,40,0.05)' }}>
                  <pillar.icon size={26} weight="regular" className="text-[#3B3121] mb-4" />
                  <h3 className="text-lg font-bold tracking-[-0.01em] text-[#2A2318] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[#7A6B55] leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-[#2A2318] mb-14">Resources.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESOURCES.map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={i * 0.05}>
                  <div className="group cursor-pointer flex gap-4 p-5 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all duration-500" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 16px rgba(120,80,40,0.04)' }}>
                    <Icon size={18} className="text-[#9A8B73] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold tracking-[-0.01em] text-[#2A2318] group-hover:text-[#5A4D3A] transition-colors">{r.title}</h3>
                      <p className="text-xs text-[#9A8B73] mt-1 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="p-8 md:p-10 rounded-2xl bg-white/50 border border-white/60" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 32px rgba(120,80,40,0.06)' }}>
              <Quotes size={22} weight="fill" className="text-[#D4C5AE] mb-5" />
              <blockquote className="text-lg md:text-xl text-[#3B3121] leading-relaxed mb-6">{TESTIMONIALS[0].content}</blockquote>
              <p className="text-sm"><span className="font-semibold text-[#2A2318]">{TESTIMONIALS[0].author}</span> <span className="text-[#9A8B73]">· {TESTIMONIALS[0].role}</span></p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA: warm dark */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <div className="p-12 md:p-16 rounded-3xl bg-[#2A2318]" style={{ boxShadow: '0 16px 48px rgba(42,35,24,0.3)' }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#F8F0E3] mb-4">Let&apos;s work together.</h2>
              <p className="text-[#A89880] text-base mb-8">Currently available for product design missions.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-7 py-3.5 bg-[#F8F0E3] text-[#2A2318] rounded-xl text-sm font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2">Book a call <Calendar size={15} /></button>
                <button className="px-7 py-3.5 rounded-xl text-sm text-[#A89880] border border-[#4A3D2B] hover:border-[#6A5B48] transition-colors flex items-center justify-center gap-2">victor@victorsoussan.fr <Envelope size={15} /></button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <StickyLayer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V9: SKEUOMORPHISM #2 — Dark premium, MacPaw style
   Deep blacks, product hero, reflections, glass depth
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V9() {
  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Public Sans', system-ui, sans-serif", background: 'linear-gradient(180deg, #0C0C0E 0%, #141418 50%, #0C0C0E 100%)' }}>
      {/* Grain */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* Nav: glass pill */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-2xl" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)' }}>
          <span className="px-4 py-2 text-sm font-semibold text-white/90 tracking-[-0.01em]">VS</span>
          <div className="w-px h-4 bg-white/10" />
          <span className="px-3.5 py-2 text-[13px] text-white/40 hover:text-white/80 cursor-pointer transition-colors rounded-full hover:bg-white/[0.05]">Projects</span>
          <span className="px-3.5 py-2 text-[13px] text-white/40 hover:text-white/80 cursor-pointer transition-colors rounded-full hover:bg-white/[0.05]">Resources</span>
          <span className="px-3.5 py-2 text-[13px] text-white/40 hover:text-white/80 cursor-pointer transition-colors rounded-full hover:bg-white/[0.05]">About</span>
          <span className="px-3.5 py-2 text-[13px] bg-white/[0.1] text-white rounded-full cursor-pointer hover:bg-white/[0.15] transition-colors" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}>Contact</span>
        </div>
      </nav>

      {/* Hero: cinematic with ambient glow */}
      <header className="min-h-[100dvh] flex items-center justify-center text-center pt-20 relative overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-10" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.05)' }}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.4)' }} />
              <span className="text-[12px] text-emerald-400/90 font-medium">{HERO.availability}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-bold tracking-[-0.05em] leading-[0.85] mb-8">
              <span className="text-white">Product</span><br />
              <span className="bg-gradient-to-b from-white/60 to-white/20 bg-clip-text text-transparent">Designer.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-white/35 max-w-lg mx-auto leading-relaxed mb-10">{HERO.desc}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex gap-3 justify-center">
              <button className="group px-8 py-4 bg-white text-[#0C0C0E] rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 16px rgba(255,255,255,0.08)' }}>
                View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
              <button className="px-8 py-4 bg-white/[0.06] border border-white/[0.1] rounded-2xl text-sm font-medium text-white/60 hover:text-white/80 hover:border-white/[0.15] transition-all" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                Resources
              </button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Projects: glass cards with glow */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-14">Selected work.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.2)' }}>
                  <div className="p-1.5">
                    <div className="rounded-[calc(1rem-6px)] overflow-hidden">
                      <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] opacity-85 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <h3 className="text-lg font-bold tracking-[-0.01em] group-hover:text-white transition-colors">{p.title}</h3>
                    <p className="text-sm text-white/30 mt-1">{p.role} · {p.period}</p>
                    <p className="text-sm text-white/40 mt-2 leading-relaxed">{p.summary}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured guide: spotlight card */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="group cursor-pointer rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-700 relative" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.3)' }}>
              {/* Spotlight glow */}
              <div className="absolute top-0 left-1/3 w-96 h-48 rounded-full bg-blue-500/[0.04] blur-[80px] pointer-events-none group-hover:bg-blue-500/[0.06] transition-colors duration-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
                <div className="p-2">
                  <div className="rounded-[calc(1.5rem-8px)] overflow-hidden aspect-[4/3]">
                    <img src="/images/guide-claude-code/hero-cover.png" alt="Guide Claude Code" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={16} weight="fill" className="text-white/30" />
                    <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Featured guide · 9 chapters</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 group-hover:text-white transition-colors">Getting started with Claude Code</h3>
                  <p className="text-sm text-white/35 leading-relaxed mb-6">The complete reference for designers who want to ship real interfaces with AI assistance.</p>
                  <button className="self-start px-6 py-3 bg-white text-[#0C0C0E] rounded-xl text-sm font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2">
                    Start reading <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Expertise: lined rows */}
      <section className="py-24 md:py-40 px-6 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-14">Expertise.</h2>
          </FadeIn>
          {PILLARS.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 border-b border-white/[0.05] cursor-default">
                <div className="flex items-center gap-4 md:w-64">
                  <pillar.icon size={22} weight="regular" className="text-white/80 shrink-0" />
                  <h3 className="text-lg font-bold tracking-[-0.01em]">{pillar.title}</h3>
                </div>
                <p className="text-sm text-white/30 leading-relaxed flex-1">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
          <FadeIn>
            <div className="mt-16 pt-8 border-t border-white/[0.04]">
              <span className="text-[10px] text-white/20 tracking-[0.15em] uppercase font-medium">Trusted by</span>
              <div className="flex flex-wrap gap-x-8 gap-y-3 mt-4">
                {LOGOS.map(n => <span key={n} className="text-sm text-white/12 font-medium">{n}</span>)}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <div className="p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.06]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.2)' }}>
              <Quotes size={20} weight="fill" className="text-white/10 mb-5" />
              <blockquote className="text-lg md:text-xl text-white/60 leading-relaxed mb-6">{TESTIMONIALS[0].content}</blockquote>
              <p className="text-sm"><span className="font-semibold text-white/80">{TESTIMONIALS[0].author}</span> <span className="text-white/25">· {TESTIMONIALS[0].role}</span></p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 px-6 border-t border-white/[0.04]">
        <div className="max-w-[600px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] mb-4">Let&apos;s build.</h2>
            <p className="text-white/25 text-base mb-10">Currently available for product design missions.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-8 py-4 bg-white text-[#0C0C0E] rounded-2xl text-sm font-semibold transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] flex items-center justify-center gap-2" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 16px rgba(255,255,255,0.06)' }}>Book a call <Calendar size={15} /></button>
              <button className="px-8 py-4 bg-white/[0.06] border border-white/[0.1] rounded-2xl text-sm text-white/50 hover:border-white/[0.15] transition-all flex items-center justify-center gap-2" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>victor@victorsoussan.fr <Envelope size={15} /></button>
            </div>
          </FadeIn>
        </div>
      </section>
      <StickyLayer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V10: TECH MINIMAL + MULTI-PAGE (home, case, about, blog)
   Large Apple typography, internal navigation
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V10() {
  const [page, setPage] = useState<'home' | 'case' | 'about' | 'blog'>('home');

  const TabNav = () => (
    <div className="border-b border-gray-100 mb-0">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex gap-0">
        {(['home', 'case', 'about', 'blog'] as const).map(p => (
          <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }}
            className={`px-5 py-3 text-[13px] font-medium transition-all border-b-2 ${page === p ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
            {p === 'home' ? 'Home' : p === 'case' ? 'Case Study' : p === 'about' ? 'About' : 'Blog'}
          </button>
        ))}
      </div>
    </div>
  );

  const Home10 = () => (
    <>
      <header className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-600 font-medium">{HERO.availability}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(3rem,7vw,7rem)] font-bold tracking-[-0.05em] leading-[0.85] mb-8">
              Victor<br />Soussan<span className="text-gray-200">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-[580px] tracking-[-0.01em]">{HERO.desc}</p>
          </FadeIn>
        </div>
      </header>
      <section className="py-16 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.04em] mb-10">Work.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white transition-all duration-500 hover:shadow-lg hover:shadow-gray-900/[0.03]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{p.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{p.role} · {p.period}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.04em] mb-10">Resources.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {RESOURCES.map((r, i) => {
              const Icon = resourceIcon(r.type);
              return (
                <FadeIn key={r.id} delay={i * 0.04}>
                  <div className="group cursor-pointer p-5 rounded-xl bg-[#F5F5F7] hover:bg-white hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-500">
                    <Icon size={18} className="text-gray-400 mb-3" />
                    <h3 className="text-sm font-bold tracking-[-0.01em] mb-1 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{r.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );

  const Case10 = () => (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
      <FadeIn>
        <span className="text-sm text-gray-300 uppercase tracking-wider font-medium">Case Study</span>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.05em] leading-[0.9] mt-2 mb-6">Toolkit</h1>
        <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-12">From pitch deck to MVP. Founding designer on a construction tech SaaS.</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] mb-12">
          <img src="/images/thumbnail-toolkit.webp" alt="Toolkit" className="w-full aspect-[21/9] object-cover" />
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[{ l: 'Role', v: 'Founding Designer' }, { l: 'Duration', v: '14 months' }, { l: 'Team', v: 'CEO, CTO, 1 Designer' }].map(m => (
            <div key={m.l} className="p-5 rounded-xl bg-[#F5F5F7]">
              <span className="text-[10px] text-gray-300 uppercase tracking-wider font-medium">{m.l}</span>
              <p className="text-base font-bold mt-1">{m.v}</p>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="max-w-[700px]">
          <h2 className="text-2xl font-bold tracking-[-0.03em] mb-4">The challenge</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-8">Construction site managers coordinate dozens of subcontractors using spreadsheets, phone calls, and paper plans. The founding team had deep industry knowledge but no product vision translated into user flows.</p>
          <h2 className="text-2xl font-bold tracking-[-0.03em] mb-4">Key decisions</h2>
          <ul className="space-y-3 text-base text-gray-500">
            <li className="flex gap-3"><span className="text-gray-300 font-mono text-sm">01</span> Mobile-first architecture with offline capability</li>
            <li className="flex gap-3"><span className="text-gray-300 font-mono text-sm">02</span> High-contrast UI designed for outdoor readability</li>
            <li className="flex gap-3"><span className="text-gray-300 font-mono text-sm">03</span> Gantt module adapted for non-technical users</li>
          </ul>
        </div>
      </FadeIn>
    </div>
  );

  const About10 = () => (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden bg-[#F5F5F7] aspect-[3/4]">
              <img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full h-full object-cover object-top" />
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-7">
          <FadeIn>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[0.9] mb-8">About.</h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-6">15 years in tech, from visual design to product leadership. I work on complex B2B and B2G interfaces.</p>
            <p className="text-base text-gray-400 leading-relaxed mb-10">Based in Paris. French and English. Currently focused on AI-assisted design workflows.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3 border-t border-gray-100 pt-6">
              {[
                { role: 'Lead Product Designer', co: 'France VAE', y: '2024-25' },
                { role: 'Founding Designer', co: 'Toolkit', y: '2023-24' },
                { role: 'Design Manager', co: 'UNOWHY', y: '2018-24' },
                { role: 'Senior Designer', co: 'Dailymotion', y: '2017-18' },
              ].map((e, i) => (
                <div key={i} className="flex items-baseline gap-3 py-2">
                  <span className="text-sm font-semibold flex-1">{e.role}</span>
                  <span className="text-sm text-gray-400">{e.co}</span>
                  <span className="font-mono text-[10px] text-gray-300">{e.y}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );

  const Blog10 = () => (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
      <FadeIn>
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[0.9] mb-12">Resources.</h1>
      </FadeIn>
      <div className="space-y-4">
        {RESOURCES.map((r, i) => {
          const Icon = resourceIcon(r.type);
          return (
            <FadeIn key={r.id} delay={i * 0.05}>
              <div className="group cursor-pointer flex items-center gap-5 p-5 rounded-xl bg-[#F5F5F7] hover:bg-white hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-500">
                <Icon size={20} className="text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{r.title}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{r.desc}</p>
                </div>
                <span className="text-xs text-gray-300 font-medium uppercase tracking-wider shrink-0">{r.type}</span>
                <ArrowRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <LightNav />
      <div className="pt-14">
        <TabNav />
      </div>
      {page === 'home' && <Home10 />}
      {page === 'case' && <Case10 />}
      {page === 'about' && <About10 />}
      {page === 'blog' && <Blog10 />}
      <StickyLayer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED: Multi-page shell with internal routing
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
type PageId = 'home' | 'case' | 'about' | 'blog';
function usePageNav() {
  const [page, setPage] = useState<PageId>('home');
  const go = (p: PageId) => { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };
  return { page, go };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V16: STRIPE PRECISION — Clean surfaces, warm depth, dense content
   IA: Homepage = value proposition -> social proof -> work -> expertise -> resources -> CTA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V16() {
  const { page, go } = usePageNav();
  const [expandedApproach, setExpandedApproach] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const bg = '#FAFAF8';
  const cardBg = '#FFFFFF';

  const Nav16 = () => (
    <nav className="fixed top-0 w-full z-40 border-b border-gray-200/60" style={{ background: `${bg}ee`, backdropFilter: 'blur(20px) saturate(1.2)' }}>
      <div className="max-w-[1140px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <span className="text-[15px] font-bold tracking-[-0.02em] text-gray-900">Victor Soussan</span>
        <div className="hidden md:flex items-center gap-8">
          {(['home', 'case', 'about', 'blog'] as const).map(p => (
            <button key={p} onClick={() => go(p)} className={`text-[14px] font-medium transition-colors ${page === p ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}>
              {p === 'home' ? 'Home' : p === 'case' ? 'Case Study' : p === 'about' ? 'About' : 'Resources'}
            </button>
          ))}
        </div>
        <button className="px-5 py-2 bg-gray-900 text-white rounded-lg text-[13px] font-semibold hover:bg-gray-800 transition-colors" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)' }}>Contact</button>
      </div>
    </nav>
  );

  const SectionTitle = ({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) => (
    <div className="mb-12 md:mb-16">
      <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">{eyebrow}</span>
      <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.03em] leading-tight mt-2 text-gray-900">{title}</h2>
      {desc && <p className="text-[17px] text-gray-500 leading-relaxed mt-3 max-w-lg">{desc}</p>}
    </div>
  );

  const Home16 = () => (
    <>
      <header className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: bg }}>
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 mb-8">
              <span className="w-[6px] h-[6px] bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[12px] text-emerald-700 font-semibold">{HERO.availability}</span>
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.92] text-gray-900 mb-6 max-w-[700px]">
              I design products that solve real problems.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[19px] text-gray-500 leading-relaxed max-w-[560px] mb-8">{HERO.desc}</p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="text-[14px] text-gray-400 tracking-wide max-w-[500px] mb-10">{HERO.positioning}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex gap-3">
              <button onClick={() => go('case')} className="group px-6 py-3 bg-gray-900 text-white rounded-lg text-[15px] font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
              <button onClick={() => go('about')} className="px-6 py-3 rounded-lg text-[15px] font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-white transition-all">About me</button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Social proof strip */}
      <section className="py-8 border-y border-gray-200/60 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              <span className="text-[12px] text-gray-300 font-semibold uppercase tracking-[0.1em]">Trusted by</span>
              {LOGOS.map(n => <span key={n} className="text-[14px] text-gray-300 font-semibold hover:text-gray-500 transition-colors cursor-default">{n}</span>)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects: large cards with hover info */}
      <section className="py-20 md:py-28" style={{ background: bg }}>
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn><SectionTitle eyebrow="Selected work" title="Projects" desc="Products I helped frame, design, and ship." /></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div onClick={() => go('case')} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-600" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    {/* Hover overlay with summary */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <p className="text-[14px] text-white/90 leading-relaxed">{p.summary}</p>
                    </div>
                  </div>
                  <div className="p-5 flex items-start justify-between">
                    <div>
                      <h3 className="text-[17px] font-bold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{p.title}</h3>
                      <p className="text-[14px] text-gray-400 mt-0.5">{p.role}</p>
                    </div>
                    <span className="text-[12px] text-gray-300 font-mono mt-1">{p.period}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise: expandable pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn><SectionTitle eyebrow="How I work" title="Expertise" desc="Three pillars that structure every engagement." /></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-7 rounded-2xl border border-gray-200/60 bg-[#FAFAF8] hover:bg-white hover:border-gray-300 hover:shadow-lg hover:shadow-gray-900/[0.03] transition-all duration-500">
                  <pillar.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-3 text-gray-900">{pillar.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 md:py-28" style={{ background: bg }}>
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn><SectionTitle eyebrow="Resources" title="Guides, articles & templates" desc="What I learn, I document." /></FadeIn>
          {/* Featured guide */}
          <FadeIn delay={0.05}>
            <div onClick={() => go('blog')} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-600 mb-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="Guide" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div>
                <div className="p-7 md:p-10 flex-1 flex flex-col justify-center">
                  <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-3">Guide · 9 chapters</span>
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-3 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-5">{RESOURCES[0].desc}</p>
                  <span className="text-[14px] font-semibold text-gray-900 flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">Start reading <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESOURCES.slice(1).map((r, i) => { const Icon = resourceIcon(r.type); return (
              <FadeIn key={r.id} delay={0.1 + i * 0.05}>
                <div className="group cursor-pointer p-6 rounded-xl bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-500">
                  <Icon size={18} className="text-gray-400 mb-3" />
                  <h3 className="text-[15px] font-bold tracking-[-0.01em] mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </FadeIn>
            ); })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="p-8 md:p-10 rounded-2xl border border-gray-200/60" style={{ background: bg }}>
              <Quotes size={22} weight="fill" className="text-gray-200 mb-5" />
              <blockquote className="text-[18px] md:text-[20px] text-gray-700 leading-relaxed mb-6 tracking-[-0.01em]">{TESTIMONIALS[0].content}</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div><p className="text-[14px] font-semibold text-gray-900">{TESTIMONIALS[0].author}</p><p className="text-[13px] text-gray-400">{TESTIMONIALS[0].role}</p></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ background: bg }}>
        <div className="max-w-[700px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] text-gray-900 mb-4">Let&apos;s work together</h2>
            <p className="text-[17px] text-gray-400 mb-8 max-w-md mx-auto">Currently available for product design missions. Let&apos;s talk about what you&apos;re building.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>Book a call <Calendar size={16} /></button>
              <button className="px-6 py-3 rounded-lg text-[15px] text-gray-500 border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 transition-all">victor@victorsoussan.fr <Envelope size={16} /></button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );

  const Case16 = () => (
    <div className="pt-24 pb-20" style={{ background: bg }}>
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <FadeIn>
          <button onClick={() => go('home')} className="text-[14px] text-gray-400 mb-8 flex items-center gap-1.5 hover:text-gray-600 transition-colors"><ArrowRight size={13} className="rotate-180" /> All projects</button>
          <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Case Study · Toolkit · 2023-2024</span>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.92] mt-3 mb-6 text-gray-900 max-w-[600px]">From field research to shipped MVP in 6 months</h1>
          <p className="text-[19px] text-gray-500 leading-relaxed max-w-[560px] mb-4">Founding Designer on a construction tech SaaS. Solo designer working directly with the CTO.</p>
        </FadeIn>

        {/* Hero image */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-gray-200/60 my-12" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <img src={PROJECTS[0].cover} alt="Toolkit" className="w-full aspect-[21/9] object-cover" />
          </div>
        </FadeIn>

        {/* Metadata grid */}
        <FadeIn delay={0.12}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[{ l: 'Role', v: 'Founding Designer' }, { l: 'Duration', v: '14 months' }, { l: 'Team', v: 'CEO, CTO, 1 Designer' }, { l: 'Outcome', v: 'Seed round secured' }].map(m => (
              <div key={m.l} className="p-5 rounded-xl bg-white border border-gray-200/60">
                <span className="text-[11px] text-gray-300 uppercase tracking-[0.1em] font-semibold">{m.l}</span>
                <p className="text-[15px] font-bold mt-1.5 text-gray-900">{m.v}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Context */}
        <div className="max-w-[720px]">
          <FadeIn><SectionTitle eyebrow="Context" title="The problem space" /></FadeIn>
          <FadeIn delay={0.05}><p className="text-[16px] text-gray-600 leading-[1.7] mb-12">{CASE_DEEP.context}</p></FadeIn>

          <FadeIn><SectionTitle eyebrow="Challenge" title="Three constraints that shaped everything" /></FadeIn>
          <FadeIn delay={0.05}><p className="text-[16px] text-gray-600 leading-[1.7] mb-12">{CASE_DEEP.challenge}</p></FadeIn>

          {/* Approach: expandable sections */}
          <FadeIn><SectionTitle eyebrow="Approach" title="How I worked" /></FadeIn>
          <div className="space-y-3 mb-16">
            {CASE_DEEP.approach.map((step, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-gray-200/60 bg-white overflow-hidden" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <button onClick={() => setExpandedApproach(expandedApproach === i ? null : i)} className="w-full flex items-center gap-4 p-5 text-left group">
                    <span className="text-[13px] font-mono text-gray-300 w-6">0{i + 1}</span>
                    <span className="text-[16px] font-semibold text-gray-900 flex-1 group-hover:text-gray-600 transition-colors">{step.title}</span>
                    <motion.div animate={{ rotate: expandedApproach === i ? 90 : 0 }} transition={{ duration: 0.2 }}><CaretRight size={16} className="text-gray-300" /></motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedApproach === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                        <div className="px-5 pb-5 pl-16"><p className="text-[15px] text-gray-500 leading-relaxed">{step.desc}</p></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Outcomes */}
          <FadeIn><SectionTitle eyebrow="Outcomes" title="What shipped" /></FadeIn>
          <FadeIn delay={0.05}>
            <ul className="space-y-3 mb-12">
              {CASE_DEEP.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 text-[16px] text-gray-600"><span className="text-emerald-500 shrink-0 mt-1">&#10003;</span> {o}</li>
              ))}
            </ul>
          </FadeIn>

          {/* Deliverables */}
          <FadeIn><SectionTitle eyebrow="Deliverables" title="What I produced" /></FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-12">
              {CASE_DEEP.deliverables.map(d => (
                <span key={d} className="px-4 py-2 rounded-lg bg-white border border-gray-200/60 text-[14px] font-medium text-gray-600">{d}</span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Testimonial */}
        <FadeIn>
          <div className="max-w-[720px] p-8 rounded-2xl border border-gray-200/60 bg-white mt-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <Quotes size={20} weight="fill" className="text-gray-200 mb-4" />
            <blockquote className="text-[17px] text-gray-700 leading-relaxed mb-5">{TESTIMONIALS[0].content}</blockquote>
            <p className="text-[14px]"><span className="font-semibold text-gray-900">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
          </div>
        </FadeIn>
      </div>
    </div>
  );

  const About16 = () => (
    <div className="pt-24 pb-20" style={{ background: bg }}>
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">
          <div className="md:col-span-4">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden border border-gray-200/60 aspect-[3/4] sticky top-24" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                <img src="/images/photos victor/image_victor_home.png" alt="Victor Soussan" className="w-full h-full object-cover object-top" />
              </div>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.92] text-gray-900 mb-8">About</h1>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-[18px] text-gray-600 leading-[1.7] mb-6">{ABOUT_DEEP.intro}</p>
              <p className="text-[16px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.now}</p>
              <p className="text-[16px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.ai}</p>
              <p className="text-[16px] text-gray-500 leading-[1.7] mb-12">{ABOUT_DEEP.location}</p>
            </FadeIn>

            {/* Philosophy */}
            <FadeIn><SectionTitle eyebrow="Philosophy" title="How I think about design" /></FadeIn>
            <FadeIn delay={0.05}><p className="text-[16px] text-gray-500 leading-[1.7] mb-10">{ABOUT_DEEP.philosophy}</p></FadeIn>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {ABOUT_DEEP.values.map((v, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="p-5 rounded-xl bg-white border border-gray-200/60">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{v.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Experience: expandable */}
            <FadeIn><SectionTitle eyebrow="Experience" title="15 years in product" /></FadeIn>
            <div className="space-y-3 mb-16">
              {ABOUT_DEEP.experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="rounded-xl border border-gray-200/60 bg-white overflow-hidden">
                    <button onClick={() => setExpandedExp(expandedExp === i ? null : i)} className="w-full flex items-center gap-4 p-5 text-left group">
                      <div className="flex-1 min-w-0">
                        <span className="text-[15px] font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">{exp.role}</span>
                        <span className="text-[14px] text-gray-400 ml-2">{exp.company}</span>
                      </div>
                      <span className="text-[12px] font-mono text-gray-300 shrink-0">{exp.period}</span>
                      <motion.div animate={{ rotate: expandedExp === i ? 90 : 0 }} transition={{ duration: 0.2 }}><CaretRight size={14} className="text-gray-300" /></motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedExp === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="px-5 pb-5"><p className="text-[14px] text-gray-500 leading-relaxed">{exp.desc}</p></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Tools */}
            <FadeIn><SectionTitle eyebrow="Tools" title="What I use daily" /></FadeIn>
            <FadeIn delay={0.05}>
              <div className="flex flex-wrap gap-2">
                {ABOUT_DEEP.tools.map(t => (
                  <span key={t} className="px-4 py-2 rounded-lg bg-white border border-gray-200/60 text-[14px] font-medium text-gray-600">{t}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );

  const Blog16 = () => (
    <div className="pt-24 pb-20" style={{ background: bg }}>
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <FadeIn>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.92] text-gray-900 mb-4">Resources</h1>
          <p className="text-[19px] text-gray-500 mb-14 max-w-lg">Guides, articles, and templates built from daily practice.</p>
        </FadeIn>
        {/* Featured */}
        <FadeIn delay={0.05}>
          <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-600 mb-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div>
              <div className="p-7 md:p-10 flex-1">
                <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Guide · 9 chapters</span>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-2 mb-3 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h2>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-4">{RESOURCES[0].desc}</p>
                <div className="flex flex-wrap gap-2">
                  {['Installation', 'Figma MCP', 'Quality', 'Deploy', 'Skills'].map(t => <span key={t} className="px-3 py-1 rounded-md bg-gray-100 text-[12px] font-medium text-gray-500">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESOURCES.slice(1).map((r, i) => { const Icon = resourceIcon(r.type); return (
            <FadeIn key={r.id} delay={0.1 + i * 0.05}>
              <div className="group cursor-pointer p-6 rounded-xl bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-500 h-full">
                <Icon size={20} className="text-gray-400 mb-4" />
                <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-[0.08em]">{r.type}</span>
                <h3 className="text-[16px] font-bold tracking-[-0.01em] mt-2 mb-2 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                <p className="text-[14px] text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            </FadeIn>
          ); })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-900" style={{ fontFamily: "'Public Sans', system-ui, sans-serif", background: bg }}>
      <Nav16 />{page === 'home' && <Home16 />}{page === 'case' && <Case16 />}{page === 'about' && <About16 />}{page === 'blog' && <Blog16 />}
      <StickyLayer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V17: WARM SHELF — Realmac style, content organized as "product cards"
   IA: Hero narrative -> Product shelf (projects as apps) -> Deep about -> Resources grid
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V17() {
  const { page, go } = usePageNav();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedApproach, setExpandedApproach] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const Nav17 = () => (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[1060px]">
      <div className="flex items-center justify-between px-5 py-2.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px) saturate(1.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)' }}>
        <span className="text-[15px] font-bold tracking-[-0.02em] text-gray-900">Victor Soussan</span>
        <div className="hidden md:flex items-center gap-1">
          {(['home', 'case', 'about', 'blog'] as const).map(p => (
            <button key={p} onClick={() => go(p)} className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 ${page === p ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'}`}>
              {p === 'home' ? 'Home' : p === 'case' ? 'Case Study' : p === 'about' ? 'About' : 'Resources'}
            </button>
          ))}
        </div>
        <button className="px-5 py-2 rounded-xl text-[13px] font-semibold text-white" style={{ background: 'linear-gradient(180deg, #3B3B3B, #1A1A1A)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.15)' }}>Contact</button>
      </div>
    </nav>
  );

  const Home17 = () => (
    <>
      <header className="pt-32 pb-24 md:pt-40 md:pb-32 text-center" style={{ background: 'linear-gradient(180deg, #F6F4F0 0%, #EDEAE4 100%)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl mb-10 mx-auto" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.03)' }}>
              <span className="w-[6px] h-[6px] bg-emerald-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 6px rgba(5,150,105,0.3)' }} />
              <span className="text-[12px] text-emerald-700 font-semibold">{HERO.availability}</span>
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.92] text-gray-900 mb-6">
              I design products<br />people rely on.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[18px] text-gray-500 leading-relaxed max-w-[520px] mx-auto mb-10">{HERO.desc}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex gap-3 justify-center">
              <button onClick={() => go('case')} className="group px-7 py-3.5 text-white rounded-xl text-[15px] font-semibold flex items-center gap-2 transition-all" style={{ background: 'linear-gradient(180deg, #3B3B3B, #1A1A1A)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.15)' }}>
                View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </button>
              <button onClick={() => go('about')} className="px-7 py-3.5 rounded-xl text-[15px] font-medium text-gray-600 transition-all" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 6px rgba(0,0,0,0.04)' }}>About me</button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Product shelf: projects as app-like cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1060px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Selected work</span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-14 text-gray-900">Projects I shaped</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div onClick={() => go('case')} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
                  className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-600"
                  style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: hoveredIdx === i ? 'inset 0 1px 0 rgba(255,255,255,0.8), 0 16px 40px rgba(0,0,0,0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="p-2">
                    <div className="rounded-xl overflow-hidden relative">
                      <img src={p.cover} alt={p.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                        <p className="text-[14px] text-white/90 leading-relaxed">{p.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-[17px] font-bold tracking-[-0.01em] text-gray-900 group-hover:text-gray-600 transition-colors">{p.title}</h3>
                      <p className="text-[14px] text-gray-400 mt-0.5">{p.role}</p>
                    </div>
                    <span className="text-[12px] font-mono text-gray-300 mt-1">{p.period}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 md:py-28" style={{ background: '#F6F4F0' }}>
        <div className="max-w-[1060px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">How I work</span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-14 text-gray-900">Expertise</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-7 rounded-2xl transition-all duration-500 hover:shadow-lg" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.03)' }}>
                  <pillar.icon size={28} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-3 text-gray-900">{pillar.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1060px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Resources</span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-14 text-gray-900">Guides & articles</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div onClick={() => go('blog')} className="group cursor-pointer rounded-2xl overflow-hidden mb-6 transition-all duration-600" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 overflow-hidden p-2"><div className="rounded-xl overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full aspect-[16/10] md:aspect-auto md:h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div></div>
                <div className="p-7 md:p-10 flex-1 flex flex-col justify-center">
                  <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-3">Featured guide · 9 chapters</span>
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-3 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{RESOURCES[0].desc}</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESOURCES.slice(1).map((r, i) => { const Icon = resourceIcon(r.type); return (
              <FadeIn key={r.id} delay={0.1 + i * 0.04}>
                <div className="group cursor-pointer p-6 rounded-xl transition-all duration-500 hover:shadow-md" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.04)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                  <Icon size={18} className="text-gray-400 mb-3" />
                  <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-[0.08em]">{r.type}</span>
                  <h3 className="text-[15px] font-bold tracking-[-0.01em] mt-1.5 mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </FadeIn>
            ); })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28" style={{ background: '#F6F4F0' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="p-8 md:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 16px rgba(0,0,0,0.03)' }}>
              <Quotes size={22} weight="fill" className="text-gray-200 mb-5" />
              <blockquote className="text-[18px] text-gray-700 leading-relaxed mb-6">{TESTIMONIALS[0].content}</blockquote>
              <p className="text-[14px]"><span className="font-semibold text-gray-900">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white"><div className="max-w-[700px] mx-auto px-6 text-center"><FadeIn>
        <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] text-gray-900 mb-4">Let&apos;s work together</h2>
        <p className="text-[17px] text-gray-400 mb-8">Currently available for product design missions.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-7 py-3.5 text-white rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2" style={{ background: 'linear-gradient(180deg, #3B3B3B, #1A1A1A)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.15)' }}>Book a call <Calendar size={16} /></button>
          <button className="px-7 py-3.5 rounded-xl text-[15px] text-gray-500 flex items-center justify-center gap-2" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>Email <Envelope size={16} /></button>
        </div>
      </FadeIn></div></section>
    </>
  );

  const Case17 = () => (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-[1060px] mx-auto px-6 md:px-10">
        <FadeIn>
          <button onClick={() => go('home')} className="text-[14px] text-gray-400 mb-8 flex items-center gap-1.5 hover:text-gray-600 transition-colors"><ArrowRight size={13} className="rotate-180" /> Projects</button>
          <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Case Study · 2023-2024</span>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.92] mt-3 mb-6 text-gray-900 max-w-[600px]">From field research to shipped MVP</h1>
          <p className="text-[19px] text-gray-500 leading-relaxed max-w-[560px]">Founding Designer on Toolkit, a construction tech SaaS.</p>
        </FadeIn>
        <FadeIn delay={0.1}><div className="rounded-2xl overflow-hidden my-12" style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}><img src={PROJECTS[0].cover} alt="" className="w-full aspect-[21/9] object-cover" /></div></FadeIn>
        <FadeIn delay={0.12}><div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[{ l: 'Role', v: 'Founding Designer' }, { l: 'Duration', v: '14 months' }, { l: 'Team', v: 'CEO, CTO, 1 Designer' }, { l: 'Outcome', v: 'Seed round secured' }].map(m => (
            <div key={m.l} className="p-5 rounded-xl" style={{ background: '#F6F4F0', border: '1px solid rgba(0,0,0,0.04)' }}><span className="text-[11px] text-gray-300 uppercase tracking-[0.1em] font-semibold">{m.l}</span><p className="text-[15px] font-bold mt-1.5 text-gray-900">{m.v}</p></div>
          ))}
        </div></FadeIn>
        <div className="max-w-[720px]">
          <FadeIn><p className="text-[16px] text-gray-600 leading-[1.7] mb-8">{CASE_DEEP.context}</p></FadeIn>
          <FadeIn><p className="text-[16px] text-gray-600 leading-[1.7] mb-12">{CASE_DEEP.challenge}</p></FadeIn>
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Approach</span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">How I worked</h2>
          </FadeIn>
          <div className="space-y-3 mb-12">
            {CASE_DEEP.approach.map((step, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                  <button onClick={() => setExpandedApproach(expandedApproach === i ? null : i)} className="w-full flex items-center gap-4 p-5 text-left group">
                    <span className="text-[13px] font-mono text-gray-300">0{i + 1}</span>
                    <span className="text-[16px] font-semibold text-gray-900 flex-1 group-hover:text-gray-600 transition-colors">{step.title}</span>
                    <motion.div animate={{ rotate: expandedApproach === i ? 90 : 0 }}><CaretRight size={16} className="text-gray-300" /></motion.div>
                  </button>
                  <AnimatePresence>{expandedApproach === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pl-16"><p className="text-[15px] text-gray-500 leading-relaxed">{step.desc}</p></div>
                    </motion.div>
                  )}</AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn><ul className="space-y-3 mb-12">{CASE_DEEP.outcomes.map((o, i) => (<li key={i} className="flex gap-3 text-[16px] text-gray-600"><span className="text-emerald-500 shrink-0">&#10003;</span>{o}</li>))}</ul></FadeIn>
          <FadeIn><div className="flex flex-wrap gap-2">{CASE_DEEP.deliverables.map(d => (<span key={d} className="px-4 py-2 rounded-lg text-[14px] font-medium text-gray-600" style={{ background: '#F6F4F0', border: '1px solid rgba(0,0,0,0.04)' }}>{d}</span>))}</div></FadeIn>
        </div>
      </div>
    </div>
  );

  const About17 = () => (
    <div className="pt-24 pb-20" style={{ background: '#F6F4F0' }}>
      <div className="max-w-[1060px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4"><FadeIn><div className="rounded-2xl overflow-hidden aspect-[3/4] sticky top-24" style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}><img src="/images/photos victor/image_victor_home.png" alt="Victor" className="w-full h-full object-cover object-top" /></div></FadeIn></div>
          <div className="md:col-span-8">
            <FadeIn><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.92] text-gray-900 mb-8">About</h1></FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-[18px] text-gray-600 leading-[1.7] mb-6">{ABOUT_DEEP.intro}</p>
              <p className="text-[16px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.now}</p>
              <p className="text-[16px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.ai}</p>
              <p className="text-[16px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.philosophy}</p>
              <p className="text-[14px] text-gray-400 mb-12">{ABOUT_DEEP.location}</p>
            </FadeIn>
            <FadeIn><span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Values</span><h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Principles</h2></FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {ABOUT_DEEP.values.map((v, i) => (<FadeIn key={i} delay={i * 0.05}><div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)' }}><h3 className="text-[15px] font-bold text-gray-900 mb-2">{v.title}</h3><p className="text-[13px] text-gray-400 leading-relaxed">{v.desc}</p></div></FadeIn>))}
            </div>
            <FadeIn><span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Experience</span><h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Career</h2></FadeIn>
            <div className="space-y-3 mb-16">
              {ABOUT_DEEP.experience.map((exp, i) => (<FadeIn key={i} delay={i * 0.04}><div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)' }}>
                <button onClick={() => setExpandedExp(expandedExp === i ? null : i)} className="w-full flex items-center gap-4 p-5 text-left group">
                  <div className="flex-1"><span className="text-[15px] font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">{exp.role}</span><span className="text-[14px] text-gray-400 ml-2">{exp.company}</span></div>
                  <span className="text-[12px] font-mono text-gray-300 shrink-0">{exp.period}</span>
                  <motion.div animate={{ rotate: expandedExp === i ? 90 : 0 }}><CaretRight size={14} className="text-gray-300" /></motion.div>
                </button>
                <AnimatePresence>{expandedExp === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><div className="px-5 pb-5"><p className="text-[14px] text-gray-500 leading-relaxed">{exp.desc}</p></div></motion.div>)}</AnimatePresence>
              </div></FadeIn>))}
            </div>
            <FadeIn><span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Toolkit</span><h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Tools</h2></FadeIn>
            <FadeIn><div className="flex flex-wrap gap-2">{ABOUT_DEEP.tools.map(t => (<span key={t} className="px-4 py-2 rounded-lg text-[14px] font-medium text-gray-600" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.04)' }}>{t}</span>))}</div></FadeIn>
          </div>
        </div>
      </div>
    </div>
  );

  const Blog17 = () => (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-[1060px] mx-auto px-6 md:px-10">
        <FadeIn><h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.92] text-gray-900 mb-4">Resources</h1><p className="text-[19px] text-gray-500 mb-14">From daily practice.</p></FadeIn>
        <FadeIn delay={0.05}>
          <div className="group cursor-pointer rounded-2xl overflow-hidden mb-6 transition-all duration-600" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 p-2"><div className="rounded-xl overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full aspect-[16/10] md:aspect-auto md:h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div></div>
              <div className="p-7 md:p-10 flex-1">
                <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Guide · 9 chapters</span>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mt-2 mb-3 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h2>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-4">{RESOURCES[0].desc}</p>
                <div className="flex flex-wrap gap-2">{['Installation', 'Figma MCP', 'Quality', 'Deploy', 'Skills'].map(t => <span key={t} className="px-3 py-1 rounded-md text-[12px] font-medium text-gray-500" style={{ background: '#F6F4F0' }}>{t}</span>)}</div>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{RESOURCES.slice(1).map((r, i) => { const Icon = resourceIcon(r.type); return (<FadeIn key={r.id} delay={0.1 + i * 0.04}><div className="group cursor-pointer p-6 rounded-xl transition-all duration-500 hover:shadow-md" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.04)' }}><Icon size={18} className="text-gray-400 mb-3" /><h3 className="text-[15px] font-bold mt-1.5 mb-1.5 group-hover:text-gray-600 transition-colors">{r.title}</h3><p className="text-[13px] text-gray-400 leading-relaxed">{r.desc}</p></div></FadeIn>); })}</div>
      </div>
    </div>
  );

  return (<div className="min-h-screen text-gray-900" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}><Nav17 /><div className="pt-16">{page === 'home' && <Home17 />}{page === 'case' && <Case17 />}{page === 'about' && <About17 />}{page === 'blog' && <Blog17 />}</div><StickyLayer /></div>);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   V18: GRADIENT STUDIO — Light base, soft gradient sections, visual case study
   IA: Bento hero -> projects grid -> gradient expertise -> visual case study with image grids
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function V18() {
  const { page, go } = usePageNav();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const spring = { type: 'spring' as const, stiffness: 300, damping: 26 };

  const Nav18 = () => (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-[1140px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <span className="text-[16px] font-bold tracking-[-0.02em] text-gray-900">Victor Soussan</span>
        <div className="hidden md:flex items-center gap-1">
          {(['home', 'case', 'about', 'blog'] as const).map(p => (
            <button key={p} onClick={() => go(p)} className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all ${page === p ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}>{p === 'home' ? 'Home' : p === 'case' ? 'Case Study' : p === 'about' ? 'About' : 'Resources'}</button>
          ))}
        </div>
        <button className="px-5 py-2 bg-gray-900 text-white rounded-xl text-[14px] font-semibold hover:bg-gray-800 transition-colors">Contact</button>
      </div>
    </nav>
  );

  {/* Floating guide CTA */}
  const FloatingGuide = () => (
    <motion.div className="fixed right-6 bottom-24 z-[90]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, ...spring }}>
      <div onClick={() => go('blog')} className="group cursor-pointer flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-900/[0.06] transition-all duration-300">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-gray-900">Guide Claude Code</p>
          <p className="text-[11px] text-gray-400">9 chapters · Read now</p>
        </div>
        <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );

  const Home18 = () => (
    <>
      <FloatingGuide />
      <header className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 mb-10">
              <span className="w-[7px] h-[7px] bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[13px] text-emerald-700 font-semibold">{HERO.availability}</span>
            </span>
          </FadeIn>
          <FadeIn delay={0.03}>
            <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold tracking-[-0.045em] leading-[0.88] text-gray-900 mb-8 max-w-[700px]">
              I design products<br />that work<span className="text-gray-200">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="text-[20px] text-gray-500 leading-[1.6] max-w-[560px] mb-5">{HERO.desc}</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-[15px] text-gray-400 mb-10">{HERO.positioning}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex gap-3">
              <button onClick={() => go('case')} className="group px-7 py-3.5 bg-gray-900 text-white rounded-xl text-[16px] font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all">
                View work <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={17} />
              </button>
              <button onClick={() => go('about')} className="px-7 py-3.5 rounded-xl text-[16px] font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">About</button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Social proof */}
      <div className="py-6 border-y border-gray-100 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-10 flex flex-wrap gap-x-10 gap-y-2 items-center">
          <span className="text-[12px] text-gray-300 font-semibold uppercase tracking-[0.1em]">Trusted by</span>
          {LOGOS.map(n => <span key={n} className="text-[14px] text-gray-300 font-semibold">{n}</span>)}
        </div>
      </div>

      {/* Projects */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Selected work</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mt-2 mb-14 text-gray-900">Projects</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.04}>
                <div onClick={() => go('case')} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/[0.04]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-[15px] text-white/90 leading-relaxed">{p.summary}</p>
                    </div>
                  </div>
                  <div className="p-6 flex items-start justify-between">
                    <div><h3 className="text-[18px] font-bold tracking-[-0.01em] group-hover:text-gray-600 transition-colors">{p.title}</h3><p className="text-[15px] text-gray-400 mt-1">{p.role}</p></div>
                    <span className="text-[13px] font-mono text-gray-300 mt-1">{p.period}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise on gradient section */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #FEF3F2 50%, #ECFDF5 100%)' }}>
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-[0.08em]">How I work</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mt-2 mb-14 text-gray-900">Expertise</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 hover:bg-white hover:shadow-lg hover:shadow-gray-900/[0.04] transition-all duration-300">
                  <pillar.icon size={30} weight="regular" className="text-gray-900 mb-5" />
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-3 text-gray-900">{pillar.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 md:px-10">
          <FadeIn>
            <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Resources</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] mt-2 mb-14 text-gray-900">Guides & articles</h2>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div onClick={() => go('blog')} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-300 mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div>
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                  <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-3">Guide · 9 chapters</span>
                  <h3 className="text-[24px] font-bold tracking-[-0.02em] mb-3 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed mb-5">{RESOURCES[0].desc}</p>
                  <span className="text-[15px] font-semibold text-gray-900 flex items-center gap-1.5">Start reading <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RESOURCES.slice(1).map((r, i) => { const Icon = resourceIcon(r.type); return (
              <FadeIn key={r.id} delay={0.06 + i * 0.03}>
                <div className="group cursor-pointer p-6 rounded-xl bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-300">
                  <Icon size={20} className="text-gray-400 mb-4" />
                  <span className="text-[12px] font-semibold text-gray-300 uppercase tracking-[0.08em]">{r.type}</span>
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] mt-2 mb-2 group-hover:text-gray-600 transition-colors">{r.title}</h3>
                  <p className="text-[15px] text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </FadeIn>
            ); })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #EFF6FF 100%)' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="p-10 md:p-12 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80">
              <Quotes size={24} weight="fill" className="text-gray-200 mb-6" />
              <blockquote className="text-[20px] md:text-[22px] text-gray-700 leading-[1.6] mb-8 tracking-[-0.01em]">{TESTIMONIALS[0].content}</blockquote>
              <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-gray-200" /><div><p className="text-[15px] font-semibold text-gray-900">{TESTIMONIALS[0].author}</p><p className="text-[14px] text-gray-400">{TESTIMONIALS[0].role}</p></div></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white"><div className="max-w-[700px] mx-auto px-6 text-center"><FadeIn>
        <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-[-0.03em] text-gray-900 mb-5">Let&apos;s work together</h2>
        <p className="text-[18px] text-gray-400 mb-10 max-w-md mx-auto">Currently available for product design missions.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-7 py-4 bg-gray-900 text-white rounded-xl text-[16px] font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">Book a call <Calendar size={17} /></button>
          <button className="px-7 py-4 rounded-xl text-[16px] text-gray-500 border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 transition-all">victor@victorsoussan.fr <Envelope size={17} /></button>
        </div>
      </FadeIn></div></section>
    </>
  );

  const Case18 = () => (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <FadeIn>
          <button onClick={() => go('home')} className="text-[15px] text-gray-400 mb-8 flex items-center gap-1.5 hover:text-gray-600 transition-colors"><ArrowRight size={14} className="rotate-180" /> All projects</button>
          <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Case Study · Toolkit · 2023-2024</span>
          <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.9] mt-4 mb-6 text-gray-900 max-w-[650px]">From field research to shipped MVP in 6 months</h1>
          <p className="text-[20px] text-gray-500 leading-[1.6] max-w-[580px]">Founding Designer on a construction tech SaaS. Solo designer working directly with the CTO.</p>
        </FadeIn>

        {/* Hero visual */}
        <FadeIn delay={0.06}>
          <div className="rounded-2xl overflow-hidden border border-gray-200/60 my-14">
            <img src={PROJECTS[0].cover} alt="Toolkit" className="w-full aspect-[21/9] object-cover" />
          </div>
        </FadeIn>

        {/* Metadata */}
        <FadeIn delay={0.08}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[{ l: 'Role', v: 'Founding Designer' }, { l: 'Duration', v: '14 months' }, { l: 'Team', v: 'CEO, CTO, 1 Designer' }, { l: 'Outcome', v: 'Seed round secured' }].map(m => (
              <div key={m.l} className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[12px] text-gray-300 uppercase tracking-[0.1em] font-semibold">{m.l}</span>
                <p className="text-[17px] font-bold mt-2 text-gray-900">{m.v}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Context */}
        <div className="max-w-[740px] mb-16">
          <FadeIn><span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Context</span><h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">The problem space</h2></FadeIn>
          <FadeIn delay={0.03}><p className="text-[17px] text-gray-600 leading-[1.75]">{CASE_DEEP.context}</p></FadeIn>
        </div>

        {/* Visual grid: field research */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16 rounded-2xl overflow-hidden">
            {[PROJECTS[0].cover, PROJECTS[1].cover, PROJECTS[2].cover, PROJECTS[3].cover, PROJECTS[4].cover, PROJECTS[0].cover].map((src, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 overflow-hidden"><img src={src} alt="" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" /></div>
            ))}
          </div>
        </FadeIn>

        {/* Challenge */}
        <div className="max-w-[740px] mb-16">
          <FadeIn><span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Challenge</span><h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Three constraints</h2></FadeIn>
          <FadeIn delay={0.03}><p className="text-[17px] text-gray-600 leading-[1.75]">{CASE_DEEP.challenge}</p></FadeIn>
        </div>

        {/* Approach: expandable with spring */}
        <div className="max-w-[740px] mb-16">
          <FadeIn><span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Approach</span><h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">How I worked</h2></FadeIn>
          <div className="space-y-3">
            {CASE_DEEP.approach.map((step, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div className="rounded-xl border border-gray-200/60 bg-gray-50 overflow-hidden">
                  <button onClick={() => setExpandedStep(expandedStep === i ? null : i)} className="w-full flex items-center gap-4 p-6 text-left group">
                    <span className="text-[14px] font-mono text-gray-300 w-7">0{i + 1}</span>
                    <span className="text-[17px] font-semibold text-gray-900 flex-1 group-hover:text-gray-600 transition-colors">{step.title}</span>
                    <motion.div animate={{ rotate: expandedStep === i ? 90 : 0 }} transition={spring}><CaretRight size={17} className="text-gray-300" /></motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedStep === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={spring} className="overflow-hidden">
                        <div className="px-6 pb-6 pl-[4.5rem]"><p className="text-[16px] text-gray-500 leading-[1.7]">{step.desc}</p></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Visual grid: design screens */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
            {[PROJECTS[0].cover, PROJECTS[3].cover].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200/60 aspect-[16/10] bg-gray-100"><img src={src} alt="" className="w-full h-full object-cover" /></div>
            ))}
          </div>
        </FadeIn>

        {/* Outcomes */}
        <div className="max-w-[740px] mb-16">
          <FadeIn><span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Outcomes</span><h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">What shipped</h2></FadeIn>
          <FadeIn delay={0.03}><ul className="space-y-4">{CASE_DEEP.outcomes.map((o, i) => (<li key={i} className="flex gap-4 text-[17px] text-gray-600 leading-[1.6]"><span className="text-emerald-500 text-[18px] shrink-0 mt-0.5">&#10003;</span>{o}</li>))}</ul></FadeIn>
        </div>

        {/* Deliverables */}
        <FadeIn>
          <div className="max-w-[740px] mb-16">
            <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Deliverables</span>
            <div className="flex flex-wrap gap-2 mt-4">{CASE_DEEP.deliverables.map(d => (<span key={d} className="px-5 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[15px] font-medium text-gray-600">{d}</span>))}</div>
          </div>
        </FadeIn>

        {/* Testimonial */}
        <FadeIn>
          <div className="max-w-[740px] p-8 md:p-10 rounded-2xl bg-gray-50 border border-gray-100">
            <Quotes size={22} weight="fill" className="text-gray-200 mb-5" />
            <blockquote className="text-[18px] text-gray-700 leading-[1.6] mb-6">{TESTIMONIALS[0].content}</blockquote>
            <p className="text-[15px]"><span className="font-semibold text-gray-900">{TESTIMONIALS[0].author}</span> <span className="text-gray-400">· {TESTIMONIALS[0].role}</span></p>
          </div>
        </FadeIn>
      </div>
    </div>
  );

  const About18 = () => (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4"><FadeIn><div className="rounded-2xl overflow-hidden border border-gray-200/60 aspect-[3/4] sticky top-24"><img src="/images/photos victor/image_victor_home.png" alt="Victor" className="w-full h-full object-cover object-top" /></div></FadeIn></div>
          <div className="md:col-span-8">
            <FadeIn><h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.9] text-gray-900 mb-10">About</h1></FadeIn>
            <FadeIn delay={0.03}>
              <p className="text-[20px] text-gray-600 leading-[1.7] mb-6">{ABOUT_DEEP.intro}</p>
              <p className="text-[17px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.now}</p>
              <p className="text-[17px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.ai}</p>
              <p className="text-[17px] text-gray-500 leading-[1.7] mb-6">{ABOUT_DEEP.philosophy}</p>
              <p className="text-[15px] text-gray-400 mb-14">{ABOUT_DEEP.location}</p>
            </FadeIn>

            {/* Values on gradient */}
            <FadeIn>
              <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Principles</span>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Values</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {ABOUT_DEEP.values.map((v, i) => (<FadeIn key={i} delay={i * 0.04}>
                <div className="p-6 rounded-xl" style={{ background: i === 0 ? 'linear-gradient(135deg, #EEF2FF, #F5F3FF)' : i === 1 ? 'linear-gradient(135deg, #ECFDF5, #F0FDF9)' : 'linear-gradient(135deg, #FEF3F2, #FFF7ED)', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-2">{v.title}</h3><p className="text-[14px] text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>))}
            </div>

            {/* Experience expandable */}
            <FadeIn><span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Career</span><h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Experience</h2></FadeIn>
            <div className="space-y-3 mb-16">
              {ABOUT_DEEP.experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.03}>
                  <div className="rounded-xl border border-gray-200/60 bg-gray-50 overflow-hidden">
                    <button onClick={() => setExpandedExp(expandedExp === i ? null : i)} className="w-full flex items-center gap-4 p-5 text-left group">
                      <div className="flex-1"><span className="text-[16px] font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">{exp.role}</span><span className="text-[15px] text-gray-400 ml-2">{exp.company}</span></div>
                      <span className="text-[13px] font-mono text-gray-300 shrink-0">{exp.period}</span>
                      <motion.div animate={{ rotate: expandedExp === i ? 90 : 0 }} transition={spring}><CaretRight size={15} className="text-gray-300" /></motion.div>
                    </button>
                    <AnimatePresence initial={false}>{expandedExp === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={spring} className="overflow-hidden">
                        <div className="px-5 pb-5"><p className="text-[15px] text-gray-500 leading-[1.7]">{exp.desc}</p></div>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Tools */}
            <FadeIn><span className="text-[14px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Daily toolkit</span><h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em] mt-2 mb-6 text-gray-900">Tools</h2></FadeIn>
            <FadeIn delay={0.03}><div className="flex flex-wrap gap-2">{ABOUT_DEEP.tools.map(t => (<span key={t} className="px-5 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[15px] font-medium text-gray-600">{t}</span>))}</div></FadeIn>
          </div>
        </div>
      </div>
    </div>
  );

  const Blog18 = () => (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 md:px-10">
        <FadeIn><h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.9] text-gray-900 mb-4">Resources</h1><p className="text-[20px] text-gray-500 mb-14">Guides, articles, and templates from practice.</p></FadeIn>
        <FadeIn delay={0.04}>
          <div onClick={() => {}} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:shadow-xl hover:shadow-gray-900/[0.04] transition-all duration-300 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden"><img src="/images/guide-claude-code/hero-cover.png" alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div>
              <div className="p-8 md:p-10 flex-1">
                <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Featured guide · 9 chapters</span>
                <h2 className="text-[24px] font-bold tracking-[-0.02em] mt-3 mb-4 group-hover:text-gray-600 transition-colors">{RESOURCES[0].title}</h2>
                <p className="text-[16px] text-gray-500 leading-relaxed mb-5">{RESOURCES[0].desc}</p>
                <div className="flex flex-wrap gap-2">{['Installation', 'Figma MCP', 'Quality Control', 'Deployment', 'Skills'].map(t => <span key={t} className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[13px] font-medium text-gray-500">{t}</span>)}</div>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{RESOURCES.slice(1).map((r, i) => { const Icon = resourceIcon(r.type); return (
          <FadeIn key={r.id} delay={0.06 + i * 0.03}><div className="group cursor-pointer p-7 rounded-xl bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-md hover:shadow-gray-900/[0.03] transition-all duration-300 h-full">
            <Icon size={22} className="text-gray-400 mb-4" /><span className="text-[12px] font-semibold text-gray-300 uppercase tracking-[0.08em]">{r.type}</span>
            <h3 className="text-[17px] font-bold tracking-[-0.01em] mt-2 mb-2 group-hover:text-gray-600 transition-colors">{r.title}</h3><p className="text-[15px] text-gray-400 leading-relaxed">{r.desc}</p>
          </div></FadeIn>
        ); })}</div>
      </div>
    </div>
  );

  return (<div className="min-h-screen text-gray-900 bg-white" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}><Nav18 /><FloatingGuide /><div className="pt-16">{page === 'home' && <Home18 />}{page === 'case' && <Case18 />}{page === 'about' && <About18 />}{page === 'blog' && <Blog18 />}</div><StickyLayer /></div>);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONCEPT SWITCHER (20 concepts)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const concepts = [
  { id: '1', label: 'TOFU', Component: V1 },
  { id: '2', label: 'MOFU', Component: V2 },
  { id: '3', label: 'BOFU', Component: V3 },
  { id: '4', label: 'Progressive', Component: V4 },
  { id: '5', label: 'Editorial', Component: V5 },
  { id: '6', label: 'Apple Typo', Component: V6 },
  { id: '7', label: 'Rich Disclosure', Component: V7 },
  { id: '8', label: 'Skeuo Warm', Component: V8 },
  { id: '9', label: 'Skeuo Dark', Component: V9 },
  { id: '10', label: 'Multi-Page', Component: V10 },
  { id: '11', label: 'Stripe Dense', Component: V16 },
  { id: '12', label: 'Warm Shelf', Component: V17 },
  { id: '13', label: 'Gradient', Component: V18 },
  { id: '14', label: 'Gallery Grid', Component: V21 },
  { id: '15', label: 'Masonry', Component: V22 },
  { id: '16', label: 'List View', Component: V23 },
  { id: '17', label: 'Card Stack', Component: V24 },
  { id: '18', label: 'Bento', Component: V25 },
  { id: '19', label: 'MacPaw Full', Component: MacPawFull },
  { id: '20', label: 'Immersive', Component: V27 },
  { id: '21', label: 'Gemini Classic', Component: V28 },
  { id: '22', label: 'Gemini App UI', Component: V29 },
  { id: '23', label: 'Gemini Dark Gloss', Component: V30 },
  { id: '24', label: 'Gemini Spatial', Component: V31 },
  { id: '25', label: 'Gemini Editorial', Component: V32 },
  { id: '26', label: 'Gemini Stripe Ed.', Component: V33 },
  { id: '27', label: 'Gemini MacPaw Ed.', Component: V34 },
  { id: '28', label: 'Gemini Realmac Ed.', Component: V35 },
  { id: '29', label: 'Gemini Apple Hard.', Component: V36 },
  { id: '30', label: 'Gemini iOS Ed.', Component: V37 },
  { id: '31', label: 'LCA Editorial', Component: VariantLCA },
  { id: '32', label: 'Full-Bleed', Component: VariantFullBleed },
  { id: '33', label: 'Motion Video', Component: VariantMotion },
  { id: '34', label: 'Hero Narrative', Component: VariantHeroNarrative },
  { id: '35', label: 'Article Premium', Component: VariantArticlePremium },
  { id: '36', label: 'Synthesis A', Component: SynthesisA },
  { id: '37', label: 'Synthesis B', Component: SynthesisB },
  { id: '38', label: 'Synthesis C', Component: SynthesisC },
  { id: '39', label: 'Synthesis D', Component: SynthesisD },
  { id: '40', label: 'Realmac Blue', Component: RealmacBlue },
  { id: '41', label: 'MacPaw XL', Component: MacPawXL },
  { id: '42', label: 'Stripe Full', Component: StripeFull },
  { id: '43', label: 'Gemini Dark', Component: GeminiDark },
  { id: '44', label: 'Gemini Light', Component: GeminiLight },
  { id: '45', label: 'Gemini Hybrid', Component: GeminiHybrid },
];

export default function ConceptsShowcase() {
  const [active, setActive] = useState('43');
  const [panelOpen, setPanelOpen] = useState(false);
  const ActiveComponent = concepts.find(c => c.id === active)!.Component;
  const switchTo = (id: string) => { setActive(id); setPanelOpen(false); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); };

  // Group concepts by category
  const groups = [
    { label: 'Foundations', ids: ['1','2','3','4','5'] },
    { label: 'Styles', ids: ['6','7','8','9','10'] },
    { label: 'Layouts', ids: ['11','12','13','14','15','16','17','18'] },
    { label: 'MacPaw', ids: ['19','20'] },
    { label: 'Gemini (old)', ids: ['21','22','23','24','25','26','27','28','29','30'] },
    { label: 'Editorial', ids: ['31','32','33','34','35'] },
    { label: 'Synthesis', ids: ['36','37','38','39'] },
    { label: 'Premium', ids: ['40','41','42'] },
    { label: 'Gemini', ids: ['43','44','45'] },
  ];

  return (
    <div className="relative">
      {/* Toggle button: small pill fixed bottom-left */}
      <button onClick={() => setPanelOpen(!panelOpen)}
        className="fixed bottom-4 left-4 z-[110] px-3 py-2 rounded-full bg-gray-900/80 backdrop-blur-sm text-white text-[11px] font-bold shadow-lg hover:bg-gray-900 transition-colors flex items-center gap-1.5"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        V{active}
      </button>

      {/* Slide-out panel */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/20" onClick={() => setPanelOpen(false)} />
            <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] z-[105] bg-white shadow-2xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <p className="text-[13px] font-bold text-gray-900">Concepts ({concepts.length})</p>
                <button onClick={() => setPanelOpen(false)} className="text-[12px] text-gray-400 hover:text-gray-600">Close</button>
              </div>
              <div className="p-3">
                {groups.map(group => {
                  const items = concepts.filter(c => group.ids.includes(c.id));
                  if (items.length === 0) return null;
                  return (
                    <div key={group.label} className="mb-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1.5">{group.label}</p>
                      <div className="flex flex-wrap gap-1">
                        {items.map(c => (
                          <button key={c.id} onClick={() => switchTo(c.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${active === c.id ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                            {c.id}. {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ActiveComponent key={active} />
    </div>
  );
}
