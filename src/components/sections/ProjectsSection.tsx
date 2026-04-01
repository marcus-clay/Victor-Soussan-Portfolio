'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projectsData'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

function ArrowDiag({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

interface ProjectsSectionProps {
  systemTheme: 'light' | 'dark'
  lang: 'en' | 'fr'
  content: {
    projects: {
      missions: string
      deliverables: string
      view_all: string
    }
  }
  projects: Project[]
  ScrollExpandCard: React.FC<{
    project: Project
    index: number
    shouldAnimate: boolean
    startScale: number
    systemTheme: 'light' | 'dark'
    onClick: () => void
    children: React.ReactNode
  }>
  openProjectWithUrl: (
    projectId: 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear' | 'riskos',
    viewMode: 'caseStudy' | 'gallery' | 'executive'
  ) => void
  openModalWithUrl: (path: string) => void
  setIframeModalUrl: (url: string) => void
}

const CASE_STUDY_IDS = ['toolkit', 'dailymotion', 'connect', 'sqool', 'france-vae', 'riskos']

export default function ProjectsSection({
  lang,
  content,
  projects,
  openProjectWithUrl,
  openModalWithUrl,
  setIframeModalUrl,
}: ProjectsSectionProps) {
  const listed = projects.slice(0, 3)
  const [activeId, setActiveId] = useState<string>(listed[0]?.id ?? '')

  function handleClick(project: Project) {
    if (CASE_STUDY_IDS.includes(project.id)) {
      openProjectWithUrl(
        project.id as 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'france-vae' | 'riskos',
        'executive'
      )
    } else if (project.externalLink) {
      setIframeModalUrl(project.externalLink)
    }
  }

  function coverSrc(project: Project) {
    return project.coverImage.startsWith('/')
      ? project.coverImage
      : `/images/${project.coverImage}`
  }

  return (
    <section id="projects" className="pt-24 md:pt-40 pb-24 md:pb-40 px-6">
      <div className="max-w-[692px] mx-auto">

        <div className="mb-12 md:mb-14">
          <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900">
            {lang === 'en' ? 'Projects' : 'Projets'}
          </h2>
        </div>

        <div className="flex flex-col">
          {listed.map((project, index) => {
            const isActive = activeId === project.id
            const src = coverSrc(project)
            const year = project.period.split(' – ')[0]

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.3, delay: index * 0.06, ease: EASE }}
                className="border-t border-gray-100 last:border-b"
              >
                <button
                  className="w-full text-left"
                  onMouseEnter={() => setActiveId(project.id)}
                  onClick={() => handleClick(project)}
                  style={{
                    opacity: isActive ? 1 : 0.38,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  <div className="py-6">

                    {/* ── Mobile only: full-width thumbnail above text ── */}
                    <div
                      className="sm:hidden mb-4 w-full rounded-lg overflow-hidden"
                      style={{ aspectRatio: '16/10' }}
                    >
                      <img
                        src={src}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* ── Desktop: fixed two-column grid ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-x-8 items-start">

                      {/* Left: text */}
                      <div>
                        <div className="flex items-baseline gap-2.5 mb-2">
                          {/* Index — always w-5, only color-transitions, zero shift */}
                          <span
                            className="text-[11px] tabular-nums leading-none flex-shrink-0 w-5"
                            style={{
                              color: isActive ? '#9CA3AF' : '#E5E7EB',
                              transition: 'color 200ms ease',
                            }}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <h3
                            className="text-[15px] leading-snug tracking-[-0.01em]"
                            style={{
                              fontWeight: isActive ? 500 : 400,
                              color: '#111827',
                            }}
                          >
                            {project.title}
                          </h3>

                          <span
                            className="text-xs leading-none hidden sm:inline flex-shrink-0"
                            style={{
                              color: isActive ? '#6B7280' : '#9CA3AF',
                              transition: 'color 200ms ease',
                            }}
                          >
                            {project.role}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed max-w-[44ch] pl-7">
                          {project.summary}
                        </p>
                      </div>

                      {/* Right: year + arrow + thumbnail (desktop only) */}
                      <div className="hidden sm:flex flex-col items-end gap-2.5">

                        <div className="flex items-center gap-2 h-5">
                          <span className="text-[11px] tabular-nums text-gray-400 leading-none">
                            {year}
                          </span>
                          <ArrowDiag
                            style={{
                              color: '#9CA3AF',
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'translate(0,0)' : 'translate(-3px,3px)',
                              transition: 'opacity 160ms ease 30ms, transform 240ms cubic-bezier(0.23,1,0.32,1)',
                            }}
                          />
                        </div>

                        {/* Thumbnail: opacity + scale, no height change */}
                        <div
                          className="w-full rounded-lg overflow-hidden"
                          style={{ aspectRatio: '4/3' }}
                        >
                          <img
                            src={src}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'scale(1)' : 'scale(1.05)',
                              transition: 'opacity 260ms ease, transform 400ms cubic-bezier(0.23,1,0.32,1)',
                            }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 md:mt-14">
          <Link
            href={`/${lang}/projets`}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 active:opacity-60 transition-[color,opacity] duration-150 flex items-center gap-1.5"
          >
            {content.projects.view_all}
            <ArrowDiag />
          </Link>
        </div>

      </div>
    </section>
  )
}
