'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { getProjects } from '@/data/projectsData'
import { HOMEPAGE_GALLERY_ITEMS } from '@/data/galleryData'
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
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08]"
          >
            {isEn ? 'Projects' : 'Projets'}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-[55ch]"
          >
            {isEn
              ? 'Case studies in product design, design systems and AI-assisted prototyping.'
              : 'Études de cas en design produit, design systems et prototypage assisté par IA.'}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 ease-out cursor-pointer active:scale-[0.97] ${
                activeFilter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 ${activeFilter === f.key ? 'text-white/60' : 'text-gray-400'}`}>{f.count}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {filtered.map((project, index) => {
            const imgSrc = project.coverImage.startsWith('/')
              ? project.coverImage
              : `/images/${project.coverImage}`

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.06, ease: [0.23, 1, 0.32, 1] }}
              >
              <Link
                href={`/${lang}/project/${project.id}/summary`}
                className="group block transition-transform duration-200 ease-out hover:-translate-y-1"
              >
                {/* Cover image — taller ratio, soft bg, hover scale inside container */}
                <div
                  className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 ring-1 ring-black/[0.04] transition-shadow duration-200 ease-out group-hover:shadow-lg group-hover:shadow-gray-300/40"
                  style={{ backgroundColor: project.cardBg || '#F0F0F2' }}
                >
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div>
                  {/* Badges — neutral gray, no colors */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      {FORMAT_LABELS[project.format][lang]}
                    </span>
                    {project.status === 'shipped' && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {isEn ? 'Shipped' : 'En production'}
                      </span>
                    )}
                    {project.status === 'experiment' && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {isEn ? 'Experiment' : 'Expérimentation'}
                      </span>
                    )}
                    {project.status === 'concept' && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        Concept
                      </span>
                    )}
                  </div>

                  {/* Title + meta */}
                  <h2 className="text-xl font-bold tracking-[-0.02em] text-gray-900 mb-1 group-hover:text-[#2D5CF3] transition-colors duration-200 ease-out">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-3">
                    {project.role} · {project.period}
                  </p>

                  {/* Summary */}
                  <p className="text-base text-gray-600 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Visual Gallery teaser */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-gray-900 mb-2">
                {isEn ? 'Interface gallery' : 'Galerie d\u2019interfaces'}
              </h2>
              <p className="text-base text-gray-500 max-w-[50ch] leading-relaxed">
                {isEn
                  ? 'Screens and prototypes from enterprise apps, SaaS platforms and design systems I\u2019ve worked on over the years.'
                  : '\u00c9crans et prototypes d\u2019applications m\u00e9tier, de plateformes SaaS et de design systems sur lesquels j\u2019ai travaill\u00e9 au fil du temps.'}
              </p>
            </div>
            <Link
              href={`/${lang}/visual-archive`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] shrink-0"
            >
              {isEn ? 'Browse gallery' : 'Parcourir la galerie'}
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          <Link
            href={`/${lang}/visual-archive`}
            className="group block"
          >
            <div className="grid grid-cols-3 gap-3">
              {HOMEPAGE_GALLERY_ITEMS.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-black/[0.04] transition-[box-shadow,transform] duration-300 ease-out group-hover:shadow-lg group-hover:shadow-gray-300/30 group-hover:scale-[1.005]"
                >
                  <img
                    src={src}
                    alt={isEn ? `UI gallery preview ${i + 1}` : `Aperçu galerie UI ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
