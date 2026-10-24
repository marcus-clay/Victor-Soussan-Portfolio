'use client'

import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TRANSLATIONS } from '@/data/translations'
import { getProjects } from '@/data/projectsData'
import { getTestimonials } from '@/data/testimonialsData'
import type { Language } from '@/data/translations'

// ─── Tokens: cursor_design.md ────────────────────────────────────────────────
const C = {
  bg:           '#f7f7f4',
  fg:           '#26251e',
  fgMuted:      'rgba(38, 37, 30, 0.62)',   // was 0.5 — too light
  fgSubtle:     'rgba(38, 37, 30, 0.46)',   // was 0.32 — too light
  surface:      '#f2f1ed',
  surfaceHover: '#eae8e2',
  border:       'rgba(38, 37, 30, 0.06)',   // per spec
  borderStrong: 'rgba(38, 37, 30, 0.12)',   // for card outlines
  green:        '#1f8a65',                  // Success Green
  darkBg:       '#14120b',
  darkFg:       '#edecec',
  darkSurface:  '#1b1913',
  darkBorder:   'rgba(237, 236, 236, 0.1)',
} as const

// radius-xs per cursor_design.md "Standard Card: Rounded corners (radius-xs)"
const RADIUS_XS = 8

const SANS = "var(--font-cursor-sans, 'CursorGothic', system-ui, sans-serif)"
const MONO = "var(--font-cursor-mono, 'BerkeleyMono', 'Courier New', monospace)"

// Emil: strong ease-out — immediate response, no sluggish start
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

// ─── Primitives ──────────────────────────────────────────────────────────────

// Emil: diagonal arrow that translates on hover via .cursor-arrow class
function ArrowDiag({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      className="cursor-arrow"
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

// Green pulse dot — spec token Success Green #1f8a65
function AvailabilityDot() {
  return (
    <span aria-hidden="true" style={{
      position: 'relative', display: 'inline-block',
      width: 8, height: 8, flexShrink: 0,
    }}>
      <span className="cursor-avail-ring" style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%', backgroundColor: C.green,
      }} />
      <span style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%', backgroundColor: C.green,
      }} />
    </span>
  )
}

// Mono section label + thin rule
function SectionLabel({
  label, linkText, linkHref,
}: { label: string; linkText?: string; linkHref?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
      <span style={{
        fontFamily: MONO, fontSize: 12,
        letterSpacing: '0.08em', color: C.fgSubtle,
        textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
      {linkText && linkHref && (
        <Link href={linkHref} className="cursor-label-link" style={{
          fontFamily: MONO, fontSize: 12,
          letterSpacing: '0.06em', color: C.fgSubtle,
          textTransform: 'uppercase', textDecoration: 'none',
          whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5,
          transition: 'color 150ms ease',
        }}>
          {linkText}
          <ArrowDiag size={10} />
        </Link>
      )}
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

interface Props { lang: Language }

export default function HomepageCursorClient({ lang }: Props) {
  const router = useRouter()
  const isEn = lang === 'en'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = JSON.parse(JSON.stringify(TRANSLATIONS[lang])) as any
  const projects     = getProjects(lang).slice(0, 4)
  const testimonials = getTestimonials(lang).slice(0, 3)
  const pillars: Array<{ title: string; desc: string }> =
    content.services.homepage_pillars ?? []

  const navigate = useCallback((path: string) => {
    router.push(`/${lang}${path}`)
  }, [router, lang])

  return (
    <>
      <style>{`
        /* ── Availability dot ─────────────────────────────────────────── */
        @keyframes cursorAvailPulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.15; transform: scale(2.6); }
        }
        .cursor-avail-ring { animation: cursorAvailPulse 2.8s ease-in-out infinite; }

        /* ── Arrow: translate on hover (Emil) ─────────────────────────── */
        /* Emil: arrows give directional feedback — 200ms ease-out */
        .cursor-arrow {
          transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .cursor-btn-primary:hover .cursor-arrow,
          .cursor-btn-ghost:hover   .cursor-arrow,
          .cursor-label-link:hover  .cursor-arrow,
          .cursor-pillar-link:hover .cursor-arrow {
            transform: translate(2px, -2px);
          }
        }

        /* ── Button states (Emil: active scale 0.97, 160ms ease-out) ──── */
        .cursor-btn-primary {
          transition: opacity 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cursor-btn-primary:active { transform: scale(0.97); }
        @media (hover: hover) and (pointer: fine) {
          .cursor-btn-primary:hover { opacity: 0.86; }
        }
        .cursor-btn-ghost {
          transition: color 150ms ease, opacity 150ms ease;
        }
        .cursor-btn-ghost:active { opacity: 0.55; }
        @media (hover: hover) and (pointer: fine) {
          .cursor-btn-ghost:hover { color: ${C.fg} !important; }
        }

        /* ── Project card hover ────────────────────────────────────────── */
        /* Cursor: bg-shift only (no card scale). Image inside does zoom. */
        .cursor-project-card {
          transition: background-color 150ms ease, border-color 200ms ease;
        }
        .cursor-project-img {
          transition: transform 350ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .cursor-project-card:hover {
            background-color: ${C.surfaceHover};
            border-color: ${C.borderStrong};
          }
          .cursor-project-card:hover .cursor-project-img {
            transform: scale(1.04);
          }
        }

        /* ── Pillar rows ───────────────────────────────────────────────── */
        .cursor-pillar {
          transition: background-color 150ms ease;
        }
        .cursor-pillar-arrow {
          opacity: 0;
          transition: opacity 150ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .cursor-pillar:hover                  { background-color: ${C.surface}; }
          .cursor-pillar:hover .cursor-pillar-arrow { opacity: 1; }
        }

        /* ── Testimonials ──────────────────────────────────────────────── */
        .cursor-testimonial {
          transition: background-color 150ms ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .cursor-testimonial:hover { background-color: ${C.surface}; }
        }

        /* ── Section label link ─────────────────────────────────────────  */
        @media (hover: hover) and (pointer: fine) {
          .cursor-label-link:hover { color: ${C.fg} !important; }
        }

        /* ── Focus ring (keyboard nav) ─────────────────────────────────  */
        .cursor-project-card:focus-visible,
        .cursor-btn-primary:focus-visible,
        .cursor-btn-ghost:focus-visible {
          outline: 2px solid ${C.fg};
          outline-offset: 3px;
        }
      `}</style>

      <div style={{ backgroundColor: C.bg, color: C.fg, fontFamily: SANS, minHeight: '100vh' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <header style={{
          padding: 'clamp(96px, 14vw, 144px) 40px clamp(64px, 10vw, 96px)',
          maxWidth: 1100, margin: '0 auto',
        }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Availability badge — mono + green pulse */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                fontFamily: MONO, fontSize: 13,
                color: C.fgMuted, marginBottom: 32, letterSpacing: '0.02em',
              }}
            >
              <AvailabilityDot />
              {isEn ? 'Available for engagements' : 'Disponible pour des missions'}
            </motion.div>

            {/* Name — CursorGothic bold, display scale */}
            {/* cursor_design.md text-2xl = 4.5rem for hero headlines */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              style={{
                fontFamily: SANS,
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
                color: C.fg,
                marginBottom: 16,
                textWrap: 'balance',
              } as React.CSSProperties}
            >
              {content.hero.tagline}
            </motion.h1>

            {/* Role — text-lg scale (2.25rem) is reserved for section titles;
                use ~1.25rem here for the subtitle line */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              style={{
                fontFamily: SANS, fontSize: 20,
                color: C.fgMuted, marginBottom: 48, letterSpacing: '-0.01em',
              }}
            >
              Lead Product Designer
            </motion.p>

            {/* Description — text-base 1rem, max 52ch for readability */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              style={{
                fontFamily: SANS, fontSize: 17, lineHeight: 1.7,
                color: C.fgMuted, maxWidth: '52ch', marginBottom: 44,
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              {content.hero.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
            >
              {/* Primary — pill, foreground-filled (cursor_design.md spec) */}
              <button
                onClick={() => navigate('/contact')}
                className="cursor-btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 22px', borderRadius: 9999,
                  backgroundColor: C.fg, color: C.bg,
                  fontFamily: SANS, fontSize: 15, fontWeight: 500,
                  border: 'none', cursor: 'pointer', letterSpacing: '0.005em',
                }}
              >
                {isEn ? "Let's talk" : 'Parlons-en'}
                <ArrowDiag size={13} />
              </button>

              {/* Tertiary — text + arrow (cursor_design.md Tertiary button) */}
              <button
                onClick={() => navigate('/approche')}
                className="cursor-btn-ghost"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: SANS, fontSize: 15, color: C.fgMuted,
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                {isEn ? 'My approach' : 'Mon approche'}
                <ArrowDiag size={13} />
              </button>
            </motion.div>
          </motion.div>
        </header>

        {/* ══ WORK ══════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 40px 96px', maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel
            label={isEn ? 'Work' : 'Projets'}
            linkText={isEn ? 'All projects' : 'Tous les projets'}
            linkHref={`/${lang}/projets`}
          />

          {/*
            cursor_design.md "Standard Card: Rounded corners (radius-xs), subtle border"
            Individual cards with gap — rounded corners require overflow:hidden on card
            Emil: image zooms inside container on hover (media hover pattern)
          */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT }}
                className="cursor-project-card"
                role="button"
                tabIndex={0}
                aria-label={project.title}
                style={{
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: RADIUS_XS,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  outline: 'none',
                }}
                onClick={() => navigate(`/project/${project.id}/full`)}
                onKeyDown={e => e.key === 'Enter' && navigate(`/project/${project.id}/full`)}
              >
                {/*
                  Image area — rounded top via parent overflow:hidden
                  Emil: inner image zooms 1.04 on card hover (CSS transition, off main thread)
                */}
                <div style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  backgroundColor: C.surface,
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="cursor-project-img"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Text area */}
                <div style={{ padding: '20px 24px 28px' }}>
                  {/* BerkeleyMono metadata — text-product-base 0.75rem */}
                  <div style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: C.fgSubtle,
                    marginBottom: 10,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {project.role} · {project.period}
                  </div>

                  <div style={{
                    fontFamily: SANS, fontSize: 16, fontWeight: 600,
                    color: C.fg, marginBottom: 8, letterSpacing: '-0.015em',
                  }}>
                    {project.title}
                  </div>

                  <div style={{
                    fontFamily: SANS, fontSize: 14, lineHeight: 1.6, color: C.fgMuted,
                  }}>
                    {project.summary}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ EXPERTISE ════════════════════════════════════════════════ */}
        <section style={{
          padding: '96px 40px',
          borderTop: `1px solid ${C.border}`,
          maxWidth: 1100, margin: '0 auto',
        }}>
          <SectionLabel label={isEn ? 'Expertise' : 'Expertise'} />

          <div>
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: EASE_OUT }}
                className="cursor-pillar"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr auto',
                  gap: 24,
                  padding: '28px 16px',
                  borderBottom: `1px solid ${C.border}`,
                  alignItems: 'center',
                }}
              >
                {/* BerkeleyMono index */}
                <span style={{
                  fontFamily: MONO, fontSize: 12,
                  color: C.fgSubtle, letterSpacing: '0.05em',
                  alignSelf: 'start', paddingTop: 3,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div style={{ alignSelf: 'start' }}>
                  <div style={{
                    fontFamily: SANS, fontSize: 16, fontWeight: 600,
                    color: C.fg, marginBottom: 8, letterSpacing: '-0.01em',
                  }}>
                    {pillar.title}
                  </div>
                  <div style={{
                    fontFamily: SANS, fontSize: 14, lineHeight: 1.65, color: C.fgMuted,
                  }}>
                    {pillar.desc}
                  </div>
                </div>

                {/* Arrow that appears on hover — Emil: directional affordance */}
                <span
                  className="cursor-pillar-arrow"
                  style={{ color: C.fgSubtle, flexShrink: 0, alignSelf: 'center' }}
                >
                  <ArrowDiag size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIALS ═════════════════════════════════════════════ */}
        <section style={{
          padding: '96px 40px',
          borderTop: `1px solid ${C.border}`,
          maxWidth: 1100, margin: '0 auto',
        }}>
          <SectionLabel label={isEn ? 'Testimonials' : 'Témoignages'} />

          <div>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_OUT }}
                className="cursor-testimonial"
                style={{
                  padding: '40px 20px',
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {/* Large opening quote mark — visual anchor */}
                <div style={{
                  fontFamily: SANS, fontSize: 56, lineHeight: 1,
                  color: C.border, marginBottom: -8, userSelect: 'none',
                  fontWeight: 700,
                }}>
                  &ldquo;
                </div>

                {/* Quote body — CursorGothic, readable size */}
                <blockquote style={{
                  fontFamily: SANS, fontStyle: 'normal',
                  fontSize: 17, lineHeight: 1.7,
                  color: C.fg, margin: '0 0 24px', maxWidth: '68ch',
                }}>
                  {t.content.length > 380
                    ? t.content.slice(0, 380) + '\u2026'
                    : t.content}
                </blockquote>

                {/* BerkeleyMono attribution — 13px minimum for readability */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  {t.image && (
                    <div style={{
                      width: 32, height: 32,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: `1px solid ${C.border}`,
                      flexShrink: 0,
                      position: 'relative',
                    }}>
                      <Image
                        src={`/images/testimonials/${t.image}`}
                        alt={t.author}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{
                    fontFamily: MONO, fontSize: 13,
                    color: C.fgMuted, letterSpacing: '0.02em',
                  }}>
                    {t.author} · {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ CONTACT CTA ══════════════════════════════════════════════ */}
        {/* Dark obsidian block — cursor_design.md dark bg #14120b */}
        <section style={{ backgroundColor: C.darkBg, padding: '112px 40px 96px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              {/* BerkeleyMono eyebrow */}
              <p style={{
                fontFamily: MONO, fontSize: 12,
                color: 'rgba(237,236,236,0.4)',
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28,
              }}>
                {isEn ? 'Next step' : 'Prochaine étape'}
              </p>

              {/* Headline — cursor_design.md text-lg = 2.25rem for section titles */}
              <h2 style={{
                fontFamily: SANS, fontWeight: 700,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.1, letterSpacing: '-0.025em',
                color: C.darkFg, marginBottom: 48, maxWidth: '18ch',
                textWrap: 'balance',
              } as React.CSSProperties}>
                {isEn
                  ? 'Ready to build something?'
                  : 'Prêt à construire quelque\u00a0chose\u00a0?'}
              </h2>

              {/* Dark-mode primary: #edecec pill on #14120b */}
              <button
                onClick={() => navigate('/contact')}
                className="cursor-btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 26px', borderRadius: 9999,
                  backgroundColor: C.darkFg, color: C.darkBg,
                  fontFamily: SANS, fontSize: 16, fontWeight: 500,
                  border: 'none', cursor: 'pointer',
                }}
              >
                {isEn ? "Let's talk" : 'Parlons-en'}
                <ArrowDiag size={14} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ══ FOOTER STRIP ═════════════════════════════════════════════ */}
        <div style={{
          backgroundColor: C.darkBg,
          borderTop: `1px solid ${C.darkBorder}`,
          padding: '22px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{
            fontFamily: MONO, fontSize: 12,
            color: 'rgba(237,236,236,0.38)', letterSpacing: '0.04em',
          }}>
            Victor Soussan · cursor_design.md fork
          </span>
          <Link
            href={`/${lang}`}
            className="cursor-label-link"
            style={{
              fontFamily: MONO, fontSize: 12,
              color: 'rgba(237,236,236,0.38)',
              textDecoration: 'none', letterSpacing: '0.04em',
              transition: 'color 150ms ease',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
          >
            ← {isEn ? 'Back to main site' : 'Retour au site principal'}
          </Link>
        </div>

      </div>
    </>
  )
}
