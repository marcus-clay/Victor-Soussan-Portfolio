'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import type { ProjectCategory, ProjectFormat } from '@/data/projectsData'

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

const FORMAT_COLORS: Record<ProjectFormat, string> = {
  'case-study': 'bg-blue-50 text-blue-700',
  short: 'bg-emerald-50 text-emerald-700',
}

export default function ProjetsPageClient({ lang }: { lang: 'en' | 'fr' }) {
  const isEn = lang === 'en'
  const projects = getProjects(lang)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  // Only show filter buttons for categories that have projects
  const activeCategories = [...new Set(projects.map((p) => p.category))]
  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: CATEGORY_LABELS.all[lang], count: projects.length },
    ...activeCategories.map((cat) => ({
      key: cat as FilterKey,
      label: CATEGORY_LABELS[cat]?.[lang] || cat,
      count: projects.filter((p) => p.category === cat).length,
    })),
  ]

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]">
            {isEn ? 'Projects' : 'Projets'}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[55ch]">
            {isEn
              ? 'Case studies in product design, design systems and AI-assisted prototyping.'
              : 'Études de cas en design produit, design systems et prototypage assisté par IA.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-gray-400">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => {
            const imgSrc = project.coverImage.startsWith('/')
              ? project.coverImage
              : `/images/${project.coverImage}`

            return (
              <Link
                key={project.id}
                href={`/${lang}/project/${project.id}/summary`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all"
              >
                {/* Cover image */}
                <div className="aspect-[16/9] overflow-hidden bg-gray-50">
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${FORMAT_COLORS[project.format]}`}>
                      {FORMAT_LABELS[project.format][lang]}
                    </span>
                    {project.status === 'shipped' && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {isEn ? 'Shipped' : 'En production'}
                      </span>
                    )}
                    {project.status === 'concept' && (
                      <span className="flex items-center gap-1 text-xs text-violet-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        Concept
                      </span>
                    )}
                  </div>

                  {/* Title + meta */}
                  <h2 className="text-lg font-bold tracking-[-0.01em] text-gray-900 mb-1 group-hover:text-[#2D5CF3] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-3">
                    {project.role} · {project.period}
                  </p>

                  {/* Summary */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {project.summary}
                  </p>

                  {/* CTA */}
                  <span className="text-sm font-medium text-[#2D5CF3] flex items-center gap-1">
                    {project.format === 'case-study'
                      ? (isEn ? 'View case study' : 'Voir l\'étude de cas')
                      : (isEn ? 'View project' : 'Voir le projet')}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
