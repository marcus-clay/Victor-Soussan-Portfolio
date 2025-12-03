// SqoolTimeline - Interactive timeline and carousel component
// Apple-style design with clean typography and subtle animations

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, Clock } from 'lucide-react';

interface TimelinePhase {
  id: string;
  period: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  colorLight: string;
  items: {
    title: string;
    description?: string;
    icon?: string;
  }[];
  images?: string[];
}

interface SqoolTimelineProps {
  lang: 'en' | 'fr';
  isDark: boolean;
  onImageClick?: (src: string) => void;
}

const TRANSLATIONS = {
  en: {
    timeline: 'Timeline',
    carousel: 'Phases',
    viewTimeline: 'View Timeline',
    viewCarousel: 'View by Phase',
    phase: 'Phase',
    of: 'of',
    phases: [
      {
        id: 'legacy',
        period: '2015-2018',
        year: '2015',
        title: 'Legacy Foundation',
        subtitle: 'The monolithic era',
        description: 'SQOOL Suite was a native Android launcher designed for shared tablets on classroom carts. Teachers used heavy C++ desktop apps while students were locked into a custom environment.',
        items: [
          { title: 'Android Launcher', description: 'Custom locked environment for students' },
          { title: 'C++ Desktop Apps', description: 'Heavy native applications for teachers' },
          { title: 'Shared Tablets', description: 'Classroom cart deployment model' },
          { title: 'On-premise Servers', description: 'School-hosted infrastructure' },
        ],
      },
      {
        id: 'research',
        period: '2019-2020',
        year: '2019',
        title: 'Finding Our Path',
        subtitle: 'Web-first exploration',
        description: 'With 500,000 personal devices deploying, we needed a new approach. Hi-SQOOL tested student engagement while Connect prototype validated web technology—and revealed why dashboards wouldn\'t work.',
        items: [
          { title: 'Hi-SQOOL', description: 'Student platform with fresh identity' },
          { title: 'Connect Prototype', description: 'Vision dashboard with "La Bulle" concept' },
          { title: 'Cloud Authentication', description: 'New SSO infrastructure' },
          { title: 'User Research', description: 'Interviews with teachers & students' },
        ],
      },
      {
        id: 'pivot',
        period: '2021',
        year: '2021',
        title: 'Strategic Pivot',
        subtitle: 'Simple, Fluid, Magical',
        description: 'Instead of one big platform, we chose focused apps that do one thing well. A new manifesto guided product direction while the brand system and design system enabled scale.',
        items: [
          { title: 'Product Manifesto', description: 'Simple, Fluid, Magical principles' },
          { title: 'Brand System', description: 'Visual identity for 7+ apps' },
          { title: 'Design System', description: 'Figma libraries & ZeroHeight docs' },
          { title: 'Team Scaling', description: '5 designers recruited & managed' },
        ],
      },
      {
        id: 'delivery',
        period: '2022-2024',
        year: '2022',
        title: 'Suite Delivery',
        subtitle: 'Specialized applications',
        description: 'With strategy defined and design system ready, we shipped the specialized apps: Classe for supervision, Partage for file sharing, Applications for discovery, MDM for IT, Protect for parents, Extend for virtual desktops.',
        items: [
          { title: 'SQOOL Classe', description: 'Real-time classroom supervision' },
          { title: 'SQOOL Partage', description: 'One-gesture file sharing' },
          { title: 'SQOOL Applications', description: 'Educational app discovery' },
          { title: 'SQOOL MDM', description: 'Device fleet management' },
          { title: 'SQOOL Protect', description: 'Parental controls via QR' },
          { title: 'SQOOL Extend', description: 'Virtual desktops for heavy software' },
        ],
      },
    ],
  },
  fr: {
    timeline: 'Timeline',
    carousel: 'Phases',
    viewTimeline: 'Voir la timeline',
    viewCarousel: 'Voir par phase',
    phase: 'Phase',
    of: 'sur',
    phases: [
      {
        id: 'legacy',
        period: '2015-2018',
        year: '2015',
        title: 'Fondation Legacy',
        subtitle: 'L\'ère monolithique',
        description: 'La suite SQOOL était un launcher Android natif conçu pour des tablettes partagées sur chariots. Les enseignants utilisaient des apps C++ lourdes tandis que les élèves étaient enfermés dans un environnement personnalisé.',
        items: [
          { title: 'Launcher Android', description: 'Environnement verrouillé pour les élèves' },
          { title: 'Apps C++ Desktop', description: 'Applications natives lourdes pour enseignants' },
          { title: 'Tablettes partagées', description: 'Modèle de déploiement sur chariots' },
          { title: 'Serveurs on-premise', description: 'Infrastructure hébergée dans les écoles' },
        ],
      },
      {
        id: 'research',
        period: '2019-2020',
        year: '2019',
        title: 'Trouver notre voie',
        subtitle: 'Exploration web-first',
        description: 'Avec 500 000 appareils personnels à déployer, nous avions besoin d\'une nouvelle approche. Hi-SQOOL a testé l\'engagement des élèves tandis que le prototype Connect a validé la technologie web—et révélé pourquoi les dashboards ne marcheraient pas.',
        items: [
          { title: 'Hi-SQOOL', description: 'Plateforme élève avec nouvelle identité' },
          { title: 'Prototype Connect', description: 'Dashboard de vision avec concept "La Bulle"' },
          { title: 'Authentification Cloud', description: 'Nouvelle infrastructure SSO' },
          { title: 'Recherche utilisateur', description: 'Entretiens avec enseignants & élèves' },
        ],
      },
      {
        id: 'pivot',
        period: '2021',
        year: '2021',
        title: 'Pivot stratégique',
        subtitle: 'Simple, Fluide, Magique',
        description: 'Au lieu d\'une grande plateforme, nous avons choisi des apps ciblées qui font une seule chose bien. Un nouveau manifeste a guidé la direction produit tandis que le système de marque et le design system ont permis de passer à l\'échelle.',
        items: [
          { title: 'Manifeste Produit', description: 'Principes Simple, Fluide, Magique' },
          { title: 'Système de marque', description: 'Identité visuelle pour 7+ apps' },
          { title: 'Design System', description: 'Librairies Figma & docs ZeroHeight' },
          { title: 'Scaling équipe', description: '5 designers recrutés & managés' },
        ],
      },
      {
        id: 'delivery',
        period: '2022-2024',
        year: '2022',
        title: 'Livraison de la suite',
        subtitle: 'Applications spécialisées',
        description: 'Avec la stratégie définie et le design system prêt, nous avons livré les apps spécialisées : Classe pour la supervision, Partage pour les fichiers, Applications pour la découverte, MDM pour l\'IT, Protect pour les parents, Extend pour les bureaux virtuels.',
        items: [
          { title: 'SQOOL Classe', description: 'Supervision de classe en temps réel' },
          { title: 'SQOOL Partage', description: 'Partage de fichiers en un geste' },
          { title: 'SQOOL Applications', description: 'Découverte d\'apps éducatives' },
          { title: 'SQOOL MDM', description: 'Gestion de flotte d\'appareils' },
          { title: 'SQOOL Protect', description: 'Contrôle parental via QR' },
          { title: 'SQOOL Extend', description: 'Bureaux virtuels pour logiciels lourds' },
        ],
      },
    ],
  },
};

const PHASE_COLORS = [
  { color: '#6B7280', colorLight: '#9CA3AF', gradient: 'from-gray-500 to-gray-600' },
  { color: '#3B82F6', colorLight: '#60A5FA', gradient: 'from-blue-500 to-blue-600' },
  { color: '#8B5CF6', colorLight: '#A78BFA', gradient: 'from-violet-500 to-violet-600' },
  { color: '#06B6D4', colorLight: '#22D3EE', gradient: 'from-cyan-500 to-cyan-600' },
];

export const SqoolTimeline: React.FC<SqoolTimelineProps> = ({ lang, isDark, onImageClick }) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'carousel'>('timeline');
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];
  const phases = t.phases;

  // Carousel navigation
  const goToPhase = (index: number) => {
    setActivePhase(Math.max(0, Math.min(phases.length - 1, index)));
  };

  const nextPhase = () => goToPhase(activePhase + 1);
  const prevPhase = () => goToPhase(activePhase - 1);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'carousel') return;
      if (e.key === 'ArrowLeft') prevPhase();
      if (e.key === 'ArrowRight') nextPhase();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, activePhase]);

  return (
    <div className={`w-full ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className={`inline-flex p-1 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'timeline'
                ? isDark
                  ? 'bg-white/10 text-white'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Clock size={16} />
            {t.timeline}
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === 'carousel'
                ? isDark
                  ? 'bg-white/10 text-white'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers size={16} />
            {t.carousel}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'timeline' ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Timeline View */}
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="relative px-4 md:px-8">
                {/* Background line */}
                <div
                  className={`absolute top-[60px] left-0 right-0 h-[2px] ${
                    isDark ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                />

                {/* Progress line */}
                <motion.div
                  className="absolute top-[60px] left-0 h-[2px] bg-gradient-to-r from-gray-500 via-blue-500 via-violet-500 to-cyan-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />

                {/* Phase Points */}
                <div className="relative flex justify-between">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: `${100 / phases.length}%` }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.15 }}
                      onMouseEnter={() => setHoveredPhase(index)}
                      onMouseLeave={() => setHoveredPhase(null)}
                      onClick={() => {
                        setActivePhase(index);
                        setViewMode('carousel');
                      }}
                    >
                      {/* Year Label */}
                      <motion.span
                        className={`text-xs font-medium mb-3 transition-colors ${
                          hoveredPhase === index
                            ? 'text-current'
                            : isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}
                        style={{ color: hoveredPhase === index ? PHASE_COLORS[index].color : undefined }}
                      >
                        {phase.period}
                      </motion.span>

                      {/* Point */}
                      <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 ${
                            isDark ? 'bg-[#0a0a0a]' : 'bg-white'
                          }`}
                          style={{
                            borderColor: PHASE_COLORS[index].color,
                            boxShadow: hoveredPhase === index
                              ? `0 0 20px ${PHASE_COLORS[index].color}40`
                              : 'none'
                          }}
                        />
                        {/* Pulse effect on hover */}
                        {hoveredPhase === index && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: PHASE_COLORS[index].color }}
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      {/* Phase Content */}
                      <div className="mt-6 text-center px-2">
                        <motion.h3
                          className={`text-sm md:text-base font-semibold mb-1 transition-colors ${
                            hoveredPhase === index
                              ? ''
                              : isDark ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{ color: hoveredPhase === index ? PHASE_COLORS[index].color : undefined }}
                        >
                          {phase.title}
                        </motion.h3>
                        <p className={`text-xs md:text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {phase.subtitle}
                        </p>
                      </div>

                      {/* Expanded Preview on Hover */}
                      <AnimatePresence>
                        {hoveredPhase === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full mt-4 w-64 md:w-80 p-4 rounded-2xl border backdrop-blur-xl z-20 ${
                              isDark
                                ? 'bg-[#1D1D1F]/95 border-white/10'
                                : 'bg-white/95 border-gray-200'
                            }`}
                            style={{
                              left: '50%',
                              transform: 'translateX(-50%)',
                              boxShadow: isDark
                                ? `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${PHASE_COLORS[index].color}20`
                                : '0 20px 40px rgba(0,0,0,0.1)'
                            }}
                          >
                            <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {phase.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {phase.items.slice(0, 3).map((item, i) => (
                                <span
                                  key={i}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    isDark ? 'bg-white/10' : 'bg-gray-100'
                                  }`}
                                  style={{
                                    backgroundColor: `${PHASE_COLORS[index].color}15`,
                                    color: PHASE_COLORS[index].color
                                  }}
                                >
                                  {item.title}
                                </span>
                              ))}
                              {phase.items.length > 3 && (
                                <span className={`text-xs px-2 py-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                  +{phase.items.length - 3}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Click hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className={`text-center mt-12 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
              >
                {lang === 'fr' ? 'Cliquez sur une phase pour voir les détails' : 'Click on a phase to see details'}
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Carousel View */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevPhase}
                disabled={activePhase === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
                  activePhase === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-100 hover:scale-110'
                } ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextPhase}
                disabled={activePhase === phases.length - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
                  activePhase === phases.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-100 hover:scale-110'
                } ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <ChevronRight size={24} />
              </button>

              {/* Carousel Content */}
              <div className="overflow-hidden px-12 md:px-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="w-full"
                  >
                    <div className={`p-8 md:p-12 rounded-3xl border ${
                      isDark ? 'bg-[#1D1D1F] border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}>
                      {/* Phase Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <div className="flex-1">
                          {/* Phase Number - Large Apple Style */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-baseline gap-3 mb-4"
                          >
                            <span
                              className="text-6xl md:text-8xl font-bold tracking-tight"
                              style={{
                                color: PHASE_COLORS[activePhase].color,
                                textShadow: isDark ? `0 0 60px ${PHASE_COLORS[activePhase].color}30` : 'none'
                              }}
                            >
                              {String(activePhase + 1).padStart(2, '0')}
                            </span>
                            <span className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              / {String(phases.length).padStart(2, '0')}
                            </span>
                          </motion.div>

                          {/* Period Badge */}
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                            style={{
                              backgroundColor: `${PHASE_COLORS[activePhase].color}15`,
                              color: PHASE_COLORS[activePhase].color
                            }}
                          >
                            <Clock size={14} />
                            <span className="text-sm font-medium">{phases[activePhase].period}</span>
                          </motion.div>

                          {/* Title */}
                          <motion.h2
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`text-3xl md:text-4xl font-bold mb-2 ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {phases[activePhase].title}
                          </motion.h2>

                          {/* Subtitle */}
                          <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-lg"
                            style={{ color: PHASE_COLORS[activePhase].colorLight }}
                          >
                            {phases[activePhase].subtitle}
                          </motion.p>
                        </div>
                      </div>

                      {/* Description */}
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-lg leading-relaxed mb-8 max-w-3xl ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {phases[activePhase].description}
                      </motion.p>

                      {/* Items Grid */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {phases[activePhase].items.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                              isDark
                                ? 'bg-white/5 border-white/5 hover:border-white/10'
                                : 'bg-white border-gray-100 hover:border-gray-200'
                            }`}
                            style={{
                              boxShadow: `0 0 0 1px ${PHASE_COLORS[activePhase].color}10`
                            }}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                              style={{ backgroundColor: `${PHASE_COLORS[activePhase].color}15` }}
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: PHASE_COLORS[activePhase].color }}
                              />
                            </div>
                            <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </h4>
                            {item.description && (
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {item.description}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {phases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhase(index)}
                    className={`transition-all duration-300 rounded-full ${
                      activePhase === index
                        ? 'w-8 h-2'
                        : 'w-2 h-2 hover:scale-125'
                    }`}
                    style={{
                      backgroundColor: activePhase === index
                        ? PHASE_COLORS[index].color
                        : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                    }}
                  />
                ))}
              </div>

              {/* Phase Labels Below Dots */}
              <div className="flex justify-center gap-8 mt-4">
                {phases.map((phase, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhase(index)}
                    className={`text-xs font-medium transition-all duration-300 ${
                      activePhase === index
                        ? ''
                        : isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    style={{ color: activePhase === index ? PHASE_COLORS[index].color : undefined }}
                  >
                    {phase.period}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SqoolTimeline;
