'use client'

import React, { useMemo, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import type { Project } from '@/data/projectsData'
import EnhancedLightbox from '@/components/media/EnhancedLightbox'
import VideoPlayer from '@/components/VideoPlayer'

const CATEGORY_LABELS: Record<string, { en: string; fr: string }> = {
  'product-design': { en: 'Product Design', fr: 'Design Produit' },
  'ai-experiment': { en: 'AI Experiment', fr: 'Expérimentation IA' },
  'prototype': { en: 'Prototype', fr: 'Prototype' },
  'concept': { en: 'Concept', fr: 'Concept' },
}

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?|#|$)/i.test(src)

type BodyBlock =
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'figure'; src: string; caption: string; index: number }

/** Paragraphs are separated by a blank line. `## ` opens a section, `![caption](src)` alone on its line is a figure. */
function parseBody(body: string): { blocks: BodyBlock[]; figures: { src: string; caption: string }[] } {
  const blocks: BodyBlock[] = []
  const figures: { src: string; caption: string }[] = []
  for (const raw of body.split('\n\n')) {
    const text = raw.trim()
    if (!text) continue
    const figure = text.match(/^!\[(.*)\]\((.+)\)$/)
    if (figure) {
      blocks.push({ kind: 'figure', src: figure[2], caption: figure[1], index: figures.length })
      figures.push({ src: figure[2], caption: figure[1] })
    } else if (text.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: text.slice(3) })
    } else {
      blocks.push({ kind: 'p', text })
    }
  }
  return { blocks, figures }
}

export default function ShortProjectView({
  project,
  lang,
}: {
  project: Project
  lang: 'en' | 'fr'
}) {
  const categoryLabel = CATEGORY_LABELS[project.category]?.[lang] || project.category
  const { blocks, figures } = useMemo(() => parseBody(project.body ?? ''), [project.body])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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
                  {isVideoSrc(src) ? (
                    <VideoPlayer src={src} lang={lang} className="w-full h-full object-cover" containerClassName="w-full h-full" />
                  ) : (
                    <img
                      src={src}
                      alt={`${project.title} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cover image fallback if no media array */}
        {(!project.media || project.media.length === 0) && project.coverImage && !project.heroInBody && (
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
        {blocks.length > 0 && (
          <div className={project.heroInBody ? 'pb-12 md:pb-16' : 'border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16'}>
            {blocks.map((block, idx) => {
              if (block.kind === 'h2') {
                return (
                  <h2 key={idx} className="text-title-2 text-gray-900 mt-14 mb-4 max-w-[680px] first:mt-0">
                    {block.text}
                  </h2>
                )
              }
              if (block.kind === 'figure' && isVideoSrc(block.src)) {
                return (
                  <figure key={idx} className="my-10 first:mt-0">
                    <div className="overflow-hidden rounded-2xl bg-[#E8E8E8] ring-1 ring-black/[0.04]">
                      <VideoPlayer src={block.src} lang={lang} className="block w-full h-auto" />
                    </div>
                    <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed max-w-[680px]">
                      {block.caption}
                    </figcaption>
                  </figure>
                )
              }
              if (block.kind === 'figure') {
                return (
                  <figure key={idx} className="my-10 first:mt-0">
                    <button
                      type="button"
                      onClick={() => {
                        setLightboxIndex(block.index)
                        setLightboxOpen(true)
                      }}
                      aria-label={lang === 'fr' ? `Agrandir l’image : ${block.caption}` : `Enlarge image: ${block.caption}`}
                      className="group block w-full overflow-hidden rounded-2xl bg-[#E8E8E8] ring-1 ring-black/[0.04] hover:ring-black/[0.08] cursor-zoom-in transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5CF3] focus-visible:ring-offset-2"
                    >
                      <img
                        src={block.src}
                        alt={block.caption}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        className="block w-full h-auto transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                      />
                    </button>
                    <figcaption className="mt-3 text-xs text-gray-500 leading-relaxed max-w-[680px]">
                      {block.caption}
                    </figcaption>
                  </figure>
                )
              }
              return (
                <p key={idx} className="text-lg leading-relaxed text-gray-600 mb-4 max-w-[680px]">
                  {block.text}
                </p>
              )
            })}
          </div>
        )}

        {figures.length > 0 && (
          <EnhancedLightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            images={figures.map((f) => ({ src: f.src, caption: f.caption, type: isVideoSrc(f.src) ? ('video' as const) : ('image' as const) }))}
            currentIndex={lightboxIndex}
            onIndexChange={setLightboxIndex}
            lang={lang}
          />
        )}

        {/* Video */}
        {project.videoUrl && (
          <div className="border-t border-gray-100 pt-12 md:pt-16 pb-12 md:pb-16">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <VideoPlayer
                src={project.videoUrl}
                lang={lang}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
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
