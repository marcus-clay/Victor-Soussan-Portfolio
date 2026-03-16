import React from 'react';
import {
  CaretRight as ChevronRight,
  CheckCircle as CheckCircle2,
  Target,
  Package as Box,
  ArrowUpRight,
  Images,
} from '@phosphor-icons/react';

interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  missions: string[];
  system: {
    title: string;
    desc: string;
  };
  deliverables: string[];
  icon: React.ReactNode;
  color: 'blue' | 'gray' | 'indigo' | 'purple';
  coverImage: string;
  hoverImage?: string;
  externalLink?: string;
  testimonialId?: string;
  status?: 'shipped' | 'concept';
}

// Generate srcset for images with responsive versions
const getResponsiveSrcSet = (src: string): string | undefined => {
  const responsiveImages = [
    'thumbnail-toolkit',
    'thumbnail-connect',
    'thumbnail-sqool-suite',
    'thumbnail-dailymotion-web-platform',
    'thumbnail-pagesjaunes-multidevices',
    'thumbnail_france_vae',
    'thumbnail_france_vae_02',
    'thumbnail_toolkit_02',
    'thubmnail_dailymotion_03',
  ];

  if (!responsiveImages.some(name => src.includes(name))) {
    return undefined;
  }

  const lastDot = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDot);
  const ext = src.substring(lastDot);

  return `${basePath}-400w${ext} 400w, ${basePath}-800w${ext} 800w, ${basePath}-1200w${ext} 1200w`;
};

interface ProjectsSectionProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  content: {
    projects: {
      missions: string;
      deliverables: string;
      view_all: string;
    };
  };
  projects: Project[];
  ScrollExpandCard: React.FC<{
    project: Project;
    index: number;
    shouldAnimate: boolean;
    startScale: number;
    systemTheme: 'light' | 'dark';
    onClick: () => void;
    children: React.ReactNode;
  }>;
  openProjectWithUrl: (projectId: 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear', viewMode: 'caseStudy' | 'gallery' | 'executive') => void;
  openModalWithUrl: (path: string) => void;
  setIframeModalUrl: (url: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  systemTheme,
  lang,
  content,
  projects,
  ScrollExpandCard,
  openProjectWithUrl,
  openModalWithUrl,
  setIframeModalUrl,
}) => {
  return (
    <section id="projects" className={`-mt-[36px] md:-mt-[68px] pt-0 pb-16 md:pb-32 px-10 relative z-10 ${
      systemTheme === 'dark' ? 'bg-transparent' : 'bg-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto">
        {/* Stacked Landscape Cards - Show only first 3 projects */}
        <div className="flex flex-col gap-10">
          {projects.slice(0, 3).map((project, index) => {
            // No scale animation - all cards at 100%
            const shouldAnimate = false;
            const startScale = 1;

            return (
              <ScrollExpandCard
                key={project.id}
                project={project}
                index={index}
                shouldAnimate={shouldAnimate}
                startScale={startScale}
                systemTheme={systemTheme}
                onClick={() => {
                  if (project.id === 'toolkit' || project.id === 'dailymotion' || project.id === 'connect' || project.id === 'sqool' || project.id === 'france-vae') {
                    openProjectWithUrl(project.id, 'executive');
                  } else if (project.externalLink) {
                    setIframeModalUrl(project.externalLink);
                  }
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section - Left on desktop, full width on mobile */}
                  <div className={`relative w-full md:w-[55%] overflow-hidden ${
                    systemTheme === 'dark' ? 'bg-[#111111]' : 'bg-gray-50'
                  }`}>
                    {/* Status Badge - Top left - Hidden on mobile for condensed view */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 hidden md:block">
                      <span className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md ${
                        systemTheme === 'dark'
                          ? 'bg-black/40 text-white border border-white/10'
                          : 'bg-white/70 text-gray-700 border border-gray-200/50'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          project.status === 'concept' ? 'bg-violet-500' : 'bg-green-500'
                        }`} />
                        {project.status === 'concept' ? 'CONCEPT' : 'SHIPPED'}
                      </span>
                    </div>

                    <div className={`aspect-[16/9] md:aspect-auto md:h-full relative ${project.hoverImage ? 'p-0' : 'p-3 md:p-6'}`}>
                      {/* Default image - with responsive srcset */}
                      {(() => {
                        const imgSrc = project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`;
                        const srcSet = getResponsiveSrcSet(imgSrc);
                        return (
                          <img
                            loading="lazy"
                            src={imgSrc}
                            srcSet={srcSet}
                            sizes={srcSet ? "(max-width: 768px) 100vw, 55vw" : undefined}
                            alt={`${project.title} preview`}
                            className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                              project.hoverImage
                                ? 'opacity-100 group-hover:opacity-0 rounded-none md:rounded-l-2xl'
                                : 'rounded-xl md:rounded-2xl md:object-contain'
                            } ${
                              project.hoverImage
                                ? ''
                                : project.id !== 'toolkit'
                                  ? 'md:scale-[1.02] md:group-hover:scale-[1.08]'
                                  : 'scale-[0.85] group-hover:scale-90'
                            }`}
                          />
                        );
                      })()}
                      {/* Hover image (device mockup) - with zoom effect and responsive srcset */}
                      {project.hoverImage && (() => {
                        const srcSet = getResponsiveSrcSet(project.hoverImage);
                        return (
                          <img
                            loading="lazy"
                            src={project.hoverImage}
                            srcSet={srcSet}
                            sizes={srcSet ? "(max-width: 768px) 100vw, 55vw" : undefined}
                            alt={`${project.title} device mockup`}
                            className="absolute inset-0 w-full h-full object-cover md:object-contain rounded-none md:rounded-l-2xl transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110"
                          />
                        );
                      })()}
                    </div>
                  </div>

                  {/* Content Section - Right on desktop, condensed on mobile */}
                  <div className="w-full md:w-[45%] p-4 md:p-8 flex flex-col justify-between">
                    {/* Top: Meta & Title */}
                    <div>
                      {/* Mobile: Year + Title inline, Desktop: Full badges */}
                      <div className="flex md:hidden items-center gap-2 mb-2">
                        <span className={`text-xs font-medium ${
                          systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {project.period.split(' – ')[0]}
                        </span>
                        <span className={`w-1 h-1 rounded-full ${
                          systemTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`} />
                        <h3 className={`text-base font-bold tracking-[-0.02em] ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.title}
                        </h3>
                      </div>

                      {/* Desktop: Full meta badges */}
                      <div className="hidden md:flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          systemTheme === 'dark'
                            ? 'bg-white/10 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {project.period}
                        </span>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          systemTheme === 'dark'
                            ? 'bg-blue-600/10 text-blue-400'
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          {project.role}
                        </span>
                      </div>

                      {/* Desktop: Title */}
                      <div className="hidden md:block mb-3">
                        <h3 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.title}
                        </h3>
                      </div>

                      {/* Summary - Shorter on mobile */}
                      <p className={`text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-none ${
                        systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {project.summary}
                      </p>

                      {/* Key Missions - Hidden on mobile */}
                      <div className="hidden md:block mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Target size={14} className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                          <p className={`text-xs font-semibold uppercase tracking-wider ${
                            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {content.projects.missions}
                          </p>
                        </div>
                        <ul className="space-y-1.5">
                          {project.missions.slice(0, 2).map((m, i) => (
                            <li key={i} className={`text-xs flex items-start ${
                              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                                systemTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                              }`} />
                              <span className="line-clamp-1">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key deliverables - Hidden on mobile */}
                      <div className="hidden md:block mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Box size={14} className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                          <p className={`text-xs font-semibold uppercase tracking-wider ${
                            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {content.projects.deliverables}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.deliverables.slice(0, 4).map((d, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded-md flex items-center border ${
                                systemTheme === 'dark'
                                  ? 'text-gray-300 border-white/5 bg-white/5'
                                  : 'text-gray-600 border-gray-100 bg-gray-50/30'
                              }`}
                            >
                              <CheckCircle2 size={12} className={`mr-1.5 flex-shrink-0 ${
                                systemTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
                              }`} />
                              {d}
                            </span>
                          ))}
                          {project.deliverables.length > 4 && (
                            <span className={`text-xs px-2 py-1 rounded-md border ${
                              systemTheme === 'dark'
                                ? 'text-gray-500 border-white/5 bg-white/5'
                                : 'text-gray-400 border-gray-100 bg-gray-50/30'
                            }`}>
                              +{project.deliverables.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: CTA - Simplified on mobile */}
                    <div className={`pt-3 md:pt-4 mt-auto md:mt-4 border-t flex items-center justify-between md:justify-end gap-2 ${systemTheme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                      {/* Mobile: Simple arrow indicator */}
                      <span className={`md:hidden text-xs font-medium ${
                        systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {lang === 'en' ? 'View case study' : 'Voir le case study'}
                      </span>
                      <ChevronRight size={18} className={`md:hidden ${
                        systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`} />

                      {/* Desktop: Full buttons */}
                      {(project.id === 'toolkit' || project.id === 'dailymotion' || project.id === 'connect' || project.id === 'sqool' || project.id === 'france-vae') ? (
                        <div className="hidden md:flex items-center gap-2">
                          {/* Gallery Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectWithUrl(project.id as 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'france-vae', 'gallery');
                            }}
                            className={`inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200 ${
                              systemTheme === 'dark'
                                ? 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
                                : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                            title={lang === 'en' ? 'View gallery' : 'Voir la galerie'}
                          >
                            <Images size={16} className="mr-2" />
                            {lang === 'en' ? 'Gallery' : 'Galerie'}
                          </button>
                          {/* Case Study Button */}
                          <div className={`inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-xl transition-colors duration-300 ${
                            systemTheme === 'dark'
                              ? 'bg-white/10 text-gray-200 border border-white/20 group-hover:bg-[#2D5CF3] group-hover:text-white group-hover:border-[#2D5CF3]'
                              : 'bg-gray-100/80 text-gray-700 border border-gray-200/50 group-hover:bg-[#2D5CF3] group-hover:text-white group-hover:border-[#2D5CF3]'
                          }`}>
                            <span className="mr-2">Case Study</span>
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      ) : (
                        <span className={`hidden md:inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full ${
                          systemTheme === 'dark'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            : 'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 animate-pulse" />
                          {lang === 'en' ? 'Coming Soon' : 'Bientot'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollExpandCard>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openModalWithUrl('/work')}
            className="group px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center shadow-sm hover:shadow-md bg-[#2D5CF3] text-white hover:bg-[#2450d9]"
          >
            {content.projects.view_all} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
