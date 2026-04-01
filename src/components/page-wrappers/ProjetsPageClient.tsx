'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProjects } from '@/data/projectsData'
import { HOMEPAGE_GALLERY_ITEMS } from '@/data/galleryData'
import type { ProjectCategory, ProjectFormat } from '@/data/projectsData'

function ArrowDiag({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function ArrowDiagMd({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

type FilterKey = 'all' | ProjectCategory

const CATEGORY_LABELS: Record<FilterKey, { en: string; fr: string }> = {
  all: { en: 'All', fr: 'Tous' },
  'product-design': { en: 'Product Design', fr: 'Design Produit' },
  'ai-experiment': { en: 'AI Experiment', fr: 'Expérimentation IA' },
  prototype: { en: 'Prototype', fr: 'Prototype' },
  concept: { en: 'Concept', fr: 'Concept' },
}

const FORMAT_LABELS: Record<ProjectFormat, { en: string; fr: string }> = {
  'case-study': { en: 'Case Study', fr: 'Étude de cas' },
  short: { en: 'Project', fr: 'Projet' },
}

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

const CASE_STUDY_IDS = ['toolkit', 'dailymotion', 'connect', 'sqool', 'france-vae', 'riskos']

export default function ProjetsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const projects = getProjects(lang)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const activeCategories = [...new Set(projects.map((p) => p.category))]
  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: CATEGORY_LABELS.all[lang], count: projects.length },
    ...activeCategories.map((cat) => ({
      key: cat as FilterKey,
      label: CATEGORY_LABELS[cat]?.[lang] || cat,
      count: projects.filter((p) => p.category === cat).length,
    })),
  ]

  const handleFilterChange = useCallback((key: FilterKey) => {
    setHoveredId(null)
    setActiveFilter(key)
  }, [])

  function projectHref(project: ReturnType<typeof getProjects>[0]) {
    if (CASE_STUDY_IDS.includes(project.id)) {
      return `/${lang}/project/${project.id}/summary`
    }
    return `/${lang}/project/${project.id}/full`
  }

  function coverSrc(project: ReturnType<typeof getProjects>[0]) {
    return project.coverImage.startsWith('/')
      ? project.coverImage
      : `/images/${project.coverImage}`
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <div className="max-w-[740px] mx-auto px-6 pt-32 md:pt-40 pb-24 md:pb-40">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <h1 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
            {isEn ? 'Projects' : 'Projets'}
          </h1>
          <p className="mt-1 text-base text-gray-500 leading-relaxed max-w-[52ch]">
            {isEn
              ? 'Product design, design systems and AI-assisted prototyping.'
              : 'Design produit, design systems et prototypage assisté par IA.'}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: EASE }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer active:scale-[0.97] ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              style={{ transition: 'background-color 180ms ease, color 180ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${activeFilter === f.key ? 'text-white/50' : 'text-gray-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10"
          onMouseLeave={() => setHoveredId(null)}
        >
          {filtered.map((project, index) => {
            const isActive = hoveredId === project.id
            const isDimmed = hoveredId !== null && !isActive
            const src = coverSrc(project)
            const year = project.period.split(' – ')[0]

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.28, delay: (index % 2) * 0.05, ease: EASE }}
                style={{
                  opacity: isDimmed ? 0.45 : 1,
                  transition: 'opacity 200ms ease',
                }}
              >
                <Link
                  href={projectHref(project)}
                  className="group block"
                  onMouseEnter={() => setHoveredId(project.id)}
                >
                  {/* Thumbnail */}
                  <div
                    className="w-full rounded-xl overflow-hidden mb-4"
                    style={{
                      aspectRatio: '16/10',
                      outline: isActive ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(0,0,0,0.04)',
                      boxShadow: isActive
                        ? '0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)'
                        : 'none',
                      transition: 'outline-color 200ms ease, box-shadow 220ms ease',
                    }}
                  >
                    <img
                      src={src}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                        transition: 'transform 420ms cubic-bezier(0.23,1,0.32,1)',
                      }}
                    />
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] tabular-nums font-medium"
                        style={{ color: isActive ? '#9CA3AF' : '#D1D5DB', transition: 'color 200ms ease' }}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-[11px] px-1.5 py-0.5 rounded-full border"
                        style={{
                          color: isActive ? '#6B7280' : '#9CA3AF',
                          borderColor: isActive ? '#D1D5DB' : '#F3F4F6',
                          transition: 'color 180ms ease, border-color 180ms ease',
                        }}
                      >
                        {FORMAT_LABELS[project.format][lang]}
                      </span>
                    </div>
                    <span
                      className="text-[11px] tabular-nums"
                      style={{ color: isActive ? '#6B7280' : '#9CA3AF', transition: 'color 200ms ease' }}
                    >
                      {year}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[15px] leading-snug tracking-[-0.01em] mb-1.5"
                    style={{
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? '#000000' : '#111827',
                      transition: 'color 180ms ease',
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Summary */}
                  <p
                    className="text-sm leading-relaxed line-clamp-2 mb-3"
                    style={{
                      color: isActive ? '#4B5563' : '#6B7280',
                      transition: 'color 180ms ease',
                    }}
                  >
                    {project.summary}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs"
                      style={{
                        color: isActive ? '#374151' : '#9CA3AF',
                        transition: 'color 180ms ease',
                      }}
                    >
                      {isEn ? 'View project' : 'Voir le projet'}
                    </span>
                    <ArrowDiag
                      style={{
                        color: isActive ? '#374151' : '#9CA3AF',
                        transform: isActive ? 'translate(1px,-1px)' : 'translate(0,0)',
                        transition: 'color 180ms ease, transform 220ms cubic-bezier(0.23,1,0.32,1)',
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* ── Visual gallery teaser ─────────────────────────────────── */}
        <motion.div
          className="mt-24 pt-16 border-t border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="mb-8">
            <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-2">
              {isEn ? 'Interface gallery' : 'Galerie d\u2019interfaces'}
            </h2>
            <p className="text-base text-gray-500 max-w-[50ch] leading-relaxed mb-4">
              {isEn
                ? 'Screens and prototypes from enterprise apps, SaaS platforms and design systems I\u2019ve worked on.'
                : '\u00c9crans et prototypes d\u2019applications m\u00e9tier, plateformes SaaS et design systems.'}
            </p>
            <Link
              href={`/${lang}/visual-archive`}
              className="group inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
              style={{ transition: 'color 150ms ease' }}
            >
              {isEn ? 'Browse gallery' : 'Parcourir la galerie'}
              <ArrowDiagMd
                style={{
                  transition: 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              />
            </Link>
          </div>

          <Link href={`/${lang}/visual-archive`} className="group block">
            <div className="grid grid-cols-3 gap-3">
              {HOMEPAGE_GALLERY_ITEMS.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="aspect-[16/10] rounded-xl overflow-hidden"
                  style={{
                    outline: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <img
                    src={src}
                    alt={isEn ? `UI gallery preview ${i + 1}` : `Aperçu galerie UI ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      transition: 'transform 400ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Gallery hover: all three images lift together */}
            <style>{`
              .group:hover img {
                transform: scale(1.03);
              }
            `}</style>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
