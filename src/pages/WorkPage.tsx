/**
 * WorkPage - Grid view of all projects
 * Displays all case studies in a 3-column grid layout
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from '@phosphor-icons/react';

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
  baseScale?: number;
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
      id: "sqool-classe",
      title: "SQOOL Classe",
      role: isEn ? "Lead Interaction Designer" : "Lead Interaction Designer",
      period: "2022",
      summary: isEn
        ? "Designing a real-time classroom supervision tool for 465 schools across Île-de-France."
        : "Conception d\u2019un outil de supervision de classe en temps r\u00e9el pour 465 \u00e9tablissements en \u00cele-de-France.",
      coverImage: "/images/thumbnail_sqool_classe.webp",
      color: "blue",
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
    },
    {
      id: "pagesjaunes",
      title: "PagesJaunes",
      role: isEn ? "Product Designer → UI Team Lead" : "Product Designer → UI Team Lead",
      period: "2014 – 2016",
      summary: isEn
        ? "Redesigning France's most downloaded utility app for 22M users across iOS, Android, and web."
        : "Refonte de l'app utilitaire la plus téléchargée de France pour 22M d'utilisateurs.",
      coverImage: "/images/thumbnail_pagesjaunes_sp_tablette.webp",
      hoverImage: "/images/thumbnail-pagesjaunes-multidevices.webp",
      color: "orange",
      category: isEn ? "Product Design" : "Design Produit",
      baseScale: 1.15
    },
    {
      id: "androidwear",
      title: "PagesJaunes Android Wear",
      role: isEn ? "Product Designer" : "Product Designer",
      period: "2015",
      summary: isEn
        ? "Designing a glanceable local search experience for wearables in duo with Android developer."
        : "Conception d'une expérience de recherche locale pour montre connectée en duo designer-dev.",
      coverImage: "/images/pagesjaunes/Android%20wear/android_wear_thumbnail%2002.webp",
      color: "purple",
      category: isEn ? "Mobile" : "Mobile",
      baseScale: 1.15
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
    shipped: 'En Production',
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

// Project Card Component - Minimal style inspired by Gabriel Valdivia
const ProjectCard: React.FC<{
  project: Project;
  systemTheme: 'light' | 'dark';
  lang: Language;
  onClick: () => void;
  index: number;
}> = ({ project, systemTheme, lang, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = systemTheme === 'dark';
  const isDisabled = project.status === 'coming-soon';
  const t = TRANSLATIONS[lang];
  const isConcept = project.status === 'concept';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isDisabled && onClick()}
    >
      {/* Card Container - testimonial card style */}
      <div
        className={`relative overflow-hidden rounded-3xl border shadow-sm hover:shadow-md transition-all duration-300 ${
          isDark
            ? 'bg-[#1D1D1F] border-white/10'
            : 'bg-white border-gray-100'
        } ${isDisabled ? 'opacity-50' : ''}`}
      >
        {/* Image Container - Square ratio, larger visuals */}
        <div className="relative aspect-square flex items-center justify-center overflow-hidden">
          {/* Status Badge - Top left */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md ${
              isDark
                ? 'bg-black/40 text-white border border-white/10'
                : 'bg-white/70 text-gray-700 border border-gray-200/50'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                isConcept ? 'bg-violet-500' : 'bg-green-500'
              }`} />
              {isConcept ? t.concept.toUpperCase() : t.shipped.toUpperCase()}
            </span>
          </div>

          {/* Project Image - Device mockup with zoom effect - larger size */}
          <img
            loading={index < 6 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
            src={project.hoverImage
              ? project.hoverImage
              : project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`}
            alt={project.title}
            className={`w-full h-full object-contain transition-transform duration-300 ease-out ${isDisabled ? 'grayscale' : ''}`}
            style={{
              transform: `scale(${isHovered && !isDisabled
                ? (project.baseScale || 1) * 1.05
                : (project.baseScale || 1)})`
            }}
            draggable={false}
          />
        </div>

        {/* Text Content - Same style as Homepage */}
        <div className="px-5 pb-5">
          <h3 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h3>
          <p className={`text-sm mt-1 line-clamp-2 max-w-[75%] ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {project.summary}
          </p>
        </div>

        {/* Arrow button on hover - black circle, white arrow - positioned at card bottom right */}
        <AnimatePresence>
          {isHovered && !isDisabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-[#2D5CF3] text-white"
            >
              <ArrowRight size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 md:top-16 z-[100] overflow-y-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}
    >
      {/* Header - mobile only, desktop uses persistent nav */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl md:hidden ${
        isDark
          ? 'bg-[#0a0a0a]/80'
          : 'bg-[#FCFCFD]/80'
      }`}>
        <div className="w-full pl-6 pr-2.5 h-16 flex items-center justify-between">
          {/* Title on left - Same style as Homepage nav */}
          <span className={`font-semibold text-lg tracking-[-0.02em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </span>

          {/* Close Button on right - same size as lightbox with larger hitbox */}
          <button
            onClick={onBack}
            className={`relative p-3 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-[''] ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Main Content - Full width with 40px padding */}
      <main className="p-10">
        {/* Page title - visible on desktop when header is hidden */}
        <h1 className={`hidden md:block text-3xl font-bold tracking-[-0.03em] mb-8 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t.title}
        </h1>
        {/* Projects Grid - 3 columns, full width, 40px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

    </motion.div>
  );
};

export default WorkPage;
