'use client'

import React from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
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
  const categoryLabel = CATEGORY_LABELS[project.category]?.[lang] || project.category

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      <div className="wrap pb-16 md:pb-24">
        {/* Header */}
        <div className="pt-10 md:pt-16 pb-10 md:pb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {categoryLabel}
            </span>
            {project.status === 'shipped' && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                Shipped
              </span>
            )}
          </div>
          <h1 className="text-headline text-gray-900 mb-4 max-w-[22ch]">
            {project.title}
          </h1>
          <p className="text-lead-lg text-gray-600 max-w-[56ch]">
            {project.role}
          </p>
        </div>

        {/* Description */}
        <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
          <p className="text-lg leading-relaxed text-gray-600 max-w-[680px]">
            {project.shortDescription || project.summary}
          </p>
        </div>

        {/* Media grid */}
        {project.media && project.media.length > 0 && (
          <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
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
          <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 aspect-[16/9]">
              <img
                src={project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body / extended description */}
        {project.body && (
          <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
            {project.body.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-lg leading-relaxed text-gray-600 mb-4 last:mb-0 max-w-[680px]">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Video */}
        {project.videoUrl && (
          <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <video
                src={project.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Deliverables if present */}
        {project.deliverables && project.deliverables.length > 0 && (
          <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
            <h2 className="text-title-2 text-gray-900 mb-4">
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
            className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-black active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            {lang === 'fr' ? 'Voir le projet' : 'View project'}
            <ArrowUpRight size={18} weight="bold" />
          </a>
        )}
      </div>
    </div>
  )
}
