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
      category: isEn ? "Product Design" : "Design Produit"
    },
    {
      id: "androidwear",
      title: "PagesJaunes Android Wear",
      role: isEn ? "Product Designer" : "Product Designer",
      period: "2015",
      summary: isEn
        ? "Designing a glanceable local search experience for wearables in duo with Android developer."
        : "Conception d'une expérience de recherche locale pour montre connectée en duo designer-dev.",
      coverImage: "/images/pagesjaunes/Android wear/android_wear_insitu_store_01.png",
      color: "purple",
      category: isEn ? "Mobile" : "Mobile"
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

// Project Card Component - Minimal style inspired by Gabriel Valdivia
const ProjectCard: React.FC<{
  project: Project;
  systemTheme: 'light' | 'dark';
  lang: Language;
  onClick: () => void;
  index: number;
}> = ({ project, systemTheme, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = systemTheme === 'dark';
  const isDisabled = project.status === 'coming-soon';

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
          {/* Project Image - Device mockup with zoom effect - larger size */}
          <img loading="lazy"
            src={project.hoverImage
              ? project.hoverImage
              : project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`}
            alt={project.title}
            className={`w-full h-full object-contain transition-transform duration-300 ease-out ${
              isHovered && !isDisabled ? 'scale-105' : 'scale-100'
            } ${isDisabled ? 'grayscale' : ''}`}
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
      className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}
    >
      {/* Header - Glass effect */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl ${
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
