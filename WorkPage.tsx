/**
 * WorkPage - Grid view of all projects
 * Displays all case studies in a 3-column grid layout
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

type Language = 'en' | 'fr';

interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  coverImage: string;
  hoverImage?: string;
  color: 'blue' | 'gray' | 'indigo' | 'purple' | 'green' | 'orange';
  status?: 'coming-soon' | 'active' | 'concept';
  category?: string;
}

interface WorkPageProps {
  systemTheme: 'light' | 'dark';
  lang: Language;
  onProjectClick: (projectId: string) => void;
  onBack: () => void;
}

// Projects data
const getProjects = (lang: Language): Project[] => {
  const isEn = lang === 'en';
  return [
    {
      id: "france-vae",
      title: "France VAE",
      role: isEn ? "Lead Product Designer" : "Lead Product Designer",
      period: "2024 – 2025",
      summary: isEn
        ? "6-month mission structuring product ops for a national public service scaling to 100K+ candidates."
        : "Mission de 6 mois pour structurer les ops produit d'un service public national.",
      coverImage: "/images/francevae/thumbnail_france_vae_02.webp",
      hoverImage: "/images/francevae/thumbnail_france_vae.webp",
      color: "blue",
      category: isEn ? "Product Design" : "Design Produit"
    },
    {
      id: "toolkit",
      title: "Toolkit",
      role: isEn ? "Founding Designer" : "Founding Designer",
      period: "2023 – 2024",
      summary: isEn
        ? "0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP."
        : "Création d'un SaaS B2B pour le BTP, de zéro (0 to 1).",
      coverImage: "/images/toolkit/thumbnail_toolkit_02.webp",
      hoverImage: "/images/thumbnail-toolkit.webp",
      color: "indigo",
      category: isEn ? "Product Design" : "Design Produit"
    },
    {
      id: "dailymotion",
      title: "Dailymotion Partner",
      role: isEn ? "Senior Product Designer" : "Senior Product Designer",
      period: "2017 – 2018",
      summary: isEn
        ? "Redesigning the professional video management suite for tier-1 media partners."
        : "Refonte du back-office vidéo utilisé par les grands médias.",
      coverImage: "/images/dailymotion/thubmnail_dailymotion_03.webp",
      hoverImage: "/images/thumbnail-dailymotion-web-platform.webp",
      color: "gray",
      category: isEn ? "Product Design" : "Design Produit"
    },
    {
      id: "connect",
      title: "SQOOL Connect",
      role: isEn ? "Product Design Lead" : "Product Design Lead",
      period: "2020 – 2021",
      summary: isEn
        ? "Designing a web-based dashboard concept for classroom orchestration."
        : "Conception d'un dashboard web pour l'orchestration de classe.",
      coverImage: "thumbnail-connect.webp",
      color: "purple",
      status: "concept",
      category: isEn ? "Concept" : "Concept"
    },
    {
      id: "sqool",
      title: "SQOOL Suite",
      role: isEn ? "Product Design Manager" : "Product Design Manager",
      period: "2018 – 2024",
      summary: isEn
        ? "Leading the design transformation of a hardware company into an EdTech SaaS."
        : "Transformation d'une boite Hardware en écosystème SaaS EdTech.",
      coverImage: "thumbnail-sqool-suite.webp",
      color: "blue",
      category: isEn ? "Management" : "Management"
    }
  ];
};

const TRANSLATIONS = {
  en: {
    title: 'Index',
    subtitle: 'Selected projects and case studies',
    viewProject: 'View project',
    shipped: 'Shipped',
    concept: 'Concept',
    categories: {
      all: 'All',
      product: 'Product Design',
      mobile: 'Mobile',
      systems: 'Systems',
      management: 'Management'
    }
  },
  fr: {
    title: 'Index',
    subtitle: 'Projets sélectionnés et études de cas',
    viewProject: 'Voir le projet',
    shipped: 'Livré',
    concept: 'Concept',
    categories: {
      all: 'Tous',
      product: 'Design Produit',
      mobile: 'Mobile',
      systems: 'Systèmes',
      management: 'Management'
    }
  }
};

// Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  systemTheme: 'light' | 'dark';
  lang: Language;
  onClick: () => void;
  index: number;
}> = ({ project, systemTheme, lang, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = TRANSLATIONS[lang];
  const isDark = systemTheme === 'dark';

  // Status badge logic - only SHIPPED or CONCEPT
  const getStatusBadge = () => {
    if (project.status === 'concept') {
      return { label: t.concept, color: 'purple' };
    }
    // All other projects are shipped
    return { label: t.shipped, color: 'green' };
  };

  const status = getStatusBadge();
  const isDisabled = project.status === 'coming-soon';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isDisabled && onClick()}
    >
      <motion.div
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
          isDark ? 'bg-[#1C1C1E]' : 'bg-white'
        } ${isDisabled ? 'opacity-60' : ''}`}
        style={{
          boxShadow: isHovered && !isDisabled
            ? isDark
              ? '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)'
              : '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)'
            : isDark
              ? '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)'
        }}
      >
        {/* Image Container */}
        <div
          className={`relative aspect-[4/3] flex items-center justify-center overflow-hidden ${
            isDark ? 'bg-[#2C2C2E]' : 'bg-[#F5F5F7]'
          }`}
        >
          {/* Status Badge */}
          <div
            className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              status.color === 'green'
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : status.color === 'orange'
                ? isDark
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'bg-orange-50 text-orange-600 border border-orange-200'
                : status.color === 'purple'
                ? isDark
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-purple-50 text-purple-600 border border-purple-200'
                : isDark
                  ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}
          >
            {status.label}
          </div>

          {/* Period Badge */}
          <div
            className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              isDark
                ? 'bg-white/10 text-white/70 border border-white/10'
                : 'bg-black/5 text-black/50 border border-black/5'
            }`}
          >
            {project.period}
          </div>

          {/* Project Image - Default (fills container) */}
          <img
            src={project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
              project.hoverImage
                ? isHovered && !isDisabled ? 'opacity-0' : 'opacity-100'
                : isHovered && !isDisabled ? 'scale-105' : 'scale-100'
            } ${isDisabled ? 'grayscale' : ''}`}
            draggable={false}
          />

          {/* Hover Image - Device mockup (contained) */}
          {project.hoverImage && (
            <img
              src={project.hoverImage}
              alt={`${project.title} device mockup`}
              className={`w-[90%] max-h-[85%] object-contain transition-all duration-500 ease-out ${
                isHovered && !isDisabled ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${isDisabled ? 'grayscale' : ''}`}
              draggable={false}
            />
          )}

          {/* Coming Soon Overlay */}
          {isDisabled && (
            <div className={`absolute inset-0 flex items-center justify-center ${
              isDark ? 'bg-black/40' : 'bg-white/40'
            }`}>
              <span className={`text-sm font-semibold ${isDark ? 'text-white/60' : 'text-black/40'}`}>
                {t.comingSoon}
              </span>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="p-5 relative">
          <div>
            <h3 className={`text-lg font-semibold truncate ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {project.title}
            </h3>
            <p className={`text-sm mt-1 line-clamp-2 pr-10 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {project.summary}
            </p>
          </div>

          {/* Role & Category */}
          <div className="flex items-center gap-2 mt-3">
            <span className={`text-xs px-2 py-1 rounded-md ${
              isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              {project.role}
            </span>
            {project.category && (
              <span className={`text-xs px-2 py-1 rounded-md ${
                isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
                {project.category}
              </span>
            )}
          </div>

          {/* Arrow button - positioned absolute bottom-right */}
          <AnimatePresence>
            {isHovered && !isDisabled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className={`absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <ArrowRight size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main WorkPage Component
const WorkPage: React.FC<WorkPageProps> = ({
  systemTheme,
  lang,
  onProjectClick,
  onBack
}) => {
  const isDark = systemTheme === 'dark';
  const t = TRANSLATIONS[lang];
  const projects = getProjects(lang);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'}`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
          isDark ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Title on left */}
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h1>

          {/* Close Button on right */}
          <button
            onClick={onBack}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'text-gray-300 hover:bg-white/10'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Projects Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              systemTheme={systemTheme}
              lang={lang}
              onClick={() => onProjectClick(project.id)}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {lang === 'en' ? 'More projects coming soon...' : 'Plus de projets à venir...'}
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default WorkPage;
