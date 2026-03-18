'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import type { Project } from '@/data/projectsData'

const CATEGORY_LABELS: Record<string, { en: string; fr: string }> = {
  'product-design': { en: 'Product Design', fr: 'Design Produit' },
  'ai-experiment': { en: 'AI Experiment', fr: 'Expérimentation IA' },
  'prototype': { en: 'Prototype', fr: 'Prototype' },
  'concept': { en: 'Concept', fr: 'Concept' },
}

export default function ShortProjectView({
  project,
  lang,
}: {
  project: Project
  lang: 'en' | 'fr'
}) {
  const router = useRouter()
  const categoryLabel = CATEGORY_LABELS[project.category]?.[lang] || project.category

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        {/* Back button */}
        <button
          onClick={() => router.push(`/${lang}/projets`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft size={16} />
          {lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {categoryLabel}
            </span>
            <span className="text-xs text-gray-400">{project.period}</span>
            {project.status === 'shipped' && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                Shipped
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-gray-900 leading-[1.08] mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-[55ch]">
            {project.role}
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-[65ch]">
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            {project.shortDescription || project.summary}
          </p>
        </div>

        {/* Media grid */}
        {project.media && project.media.length > 0 && (
          <div className="mb-12">
            {/* Video if present */}
            {project.videoUrl && (
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-4">
                <video
                  src={project.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={project.media[0]}
                />
              </div>
            )}

            {/* Image grid: adapt layout to number of images */}
            <div className={`grid gap-4 ${
              project.media.length === 1 ? 'grid-cols-1' :
              project.media.length === 2 ? 'grid-cols-2' :
              project.media.length === 3 ? 'grid-cols-3' :
              'grid-cols-2'
            }`}>
              {project.media.map((src, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl overflow-hidden bg-white border border-gray-100 ${
                    project.media!.length === 3 && idx === 0 ? 'col-span-3 aspect-[16/7]' :
                    project.media!.length >= 4 && idx === 0 ? 'col-span-2 aspect-[16/9]' :
                    'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cover image fallback if no media array */}
        {(!project.media || project.media.length === 0) && project.coverImage && (
          <div className="mb-12">
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 aspect-[16/9]">
              <img
                src={project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Deliverables if present */}
        {project.deliverables && project.deliverables.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {lang === 'fr' ? 'Livrables' : 'Deliverables'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((d, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1.5 rounded-lg bg-white border border-gray-100 text-gray-600"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* External link */}
        {project.externalLink && (
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all"
          >
            {lang === 'fr' ? 'Voir le projet' : 'View project'}
            <ArrowUpRight size={18} weight="bold" />
          </a>
        )}
      </div>
    </div>
  )
}
