import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CaretRight as ChevronRight,
  ArrowUpRight,
  Envelope as Mail,
  LinkedinLogo as Linkedin,
  Calendar,
  Lightning as Zap,
  Users,
  Stack as Layers,
  Target,
  Cpu,
  PencilSimple as PenTool,
  Quotes as Quote,
  Star,
  ArrowRight,
  Sparkle as Sparkles,
  Globe,
  Sun,
  Moon,
  X
} from '@phosphor-icons/react';

// Types
type Language = 'en' | 'fr';

interface HomePageV2Props {
  onNavigateHome?: () => void;
}

// Avatar Component
const Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }> = ({
  filename, alt, className = "", isDark = false
}) => {
  const isVictorPortrait = filename.includes('victor-soussan');
  const actualFilename = isVictorPortrait && isDark ? 'victor_soussan_dark.webp' : filename;
  const cleanFilename = actualFilename.split('/').pop() || actualFilename;
  const imagePath = `/images/${cleanFilename}`;
  const [hasError, setHasError] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {!hasError ? (
        <img
          loading="lazy"
          src={imagePath}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold tracking-wider">
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};

// Main Component
const HomePageV2: React.FC<HomePageV2Props> = ({ onNavigateHome }) => {
  const [lang, setLang] = useState<Language>('en');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const isDark = themeMode === 'dark';

  // Projects data
  const projects = [
    {
      id: 'toolkit',
      title: 'Toolkit.ac',
      subtitle: lang === 'en' ? 'Construction SaaS' : 'SaaS Construction',
      description: lang === 'en'
        ? 'First Product Designer for a construction management startup. Shaped V2 product serving 2,000+ paying users.'
        : 'Premier Product Designer pour une startup de gestion de chantier. Conception du produit V2 servant 2 000+ utilisateurs.',
      image: '/images/toolkit/desktop_-_chantier_-_details_-_v2.svg',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
      metrics: '2,000+ users',
      year: '2023-2024'
    },
    {
      id: 'sqool',
      title: 'SQOOL Suite',
      subtitle: lang === 'en' ? 'EdTech Ecosystem' : 'Ecosystème EdTech',
      description: lang === 'en'
        ? 'Led product design for a 5-app SaaS ecosystem serving 500,000+ students across 465 schools in Île-de-France.'
        : 'Direction du design produit pour un écosystème SaaS de 5 apps servant 500 000+ élèves dans 465 établissements.',
      image: '/images/sqool/hero_ecosystem_sqool.webp',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      metrics: '500K+ students',
      year: '2018-2024'
    },
    {
      id: 'dailymotion',
      title: 'Dailymotion',
      subtitle: lang === 'en' ? 'Video Platform' : 'Plateforme Vidéo',
      description: lang === 'en'
        ? 'Designed publisher tools serving 8,000+ users and premium publishers like CBS, ESPN, BBC.'
        : 'Conception des outils éditeurs servant 8 000+ utilisateurs et des publishers premium (CBS, ESPN, BBC).',
      image: '/images/dailymotion/dailymotion_-_upload2x.webp',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50',
      metrics: '8K+ users',
      year: '2017-2018'
    },
    {
      id: 'connect',
      title: 'Connect',
      subtitle: lang === 'en' ? 'B2B Dashboard' : 'Dashboard B2B',
      description: lang === 'en'
        ? 'End-to-end product design for a B2B analytics dashboard with real-time data visualization.'
        : 'Design produit complet pour un dashboard B2B avec visualisation de données en temps réel.',
      image: '/images/connect/connect_overview.webp',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50',
      metrics: 'B2B Platform',
      year: '2022'
    }
  ];

  // Services data
  const services = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: lang === 'en' ? 'UX/UI Design' : 'Design UX/UI',
      description: lang === 'en'
        ? 'From wireframes to pixel-perfect interfaces. Mobile-first, accessible, and beautiful.'
        : 'Du wireframe aux interfaces pixel-perfect. Mobile-first, accessible et élégant.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: lang === 'en' ? 'Rapid Prototyping' : 'Prototypage Rapide',
      description: lang === 'en'
        ? 'High-fidelity prototypes in days, not weeks. Validate ideas fast with real interactions.'
        : 'Prototypes haute-fidélité en jours, pas en semaines. Validez vos idées rapidement.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: lang === 'en' ? 'Design Systems' : 'Design Systems',
      description: lang === 'en'
        ? 'Scalable component libraries that accelerate development and ensure consistency.'
        : 'Bibliothèques de composants scalables pour accélérer le développement.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: lang === 'en' ? 'AI-Augmented Workflows' : 'Workflows IA',
      description: lang === 'en'
        ? 'Leveraging Claude, GPT, and Midjourney to 10x design velocity and exploration.'
        : 'Claude, GPT et Midjourney pour multiplier par 10 la vélocité et l\'exploration.',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  // Testimonials
  const testimonials: { author: string; role: string; content: string; image: string; linkedin?: string }[] = [
    {
      author: 'François Khoury',
      role: 'CEO @ Toolkit.ac',
      content: lang === 'en'
        ? 'Victor brought clarity to our product vision. His prototypes helped us secure our Series A.'
        : 'Victor a apporté de la clarté à notre vision produit. Ses prototypes nous ont aidés à lever notre Série A.',
      image: 'francois-khoury.webp'
    },
    {
      author: 'Boris-Aimé Bauderlique',
      role: 'CPO @ UNOWHY',
      content: lang === 'en'
        ? 'One of the most versatile designers I\'ve worked with. Strategic thinking meets hands-on excellence.'
        : 'L\'un des designers les plus polyvalents avec qui j\'ai travaillé. Vision stratégique et excellence opérationnelle.',
      image: 'boris-aime-bauderlique.webp'
    },
    {
      author: 'Safak Aktas',
      role: 'Engineering Manager @ Dailymotion',
      content: lang === 'en'
        ? 'Victor bridged the gap between design and engineering beautifully. A true collaborator.'
        : 'Victor a parfaitement fait le lien entre design et engineering. Un vrai collaborateur.',
      image: 'safak-aktas.webp'
    }
  ];

  // Stats
  const stats = [
    { value: '15+', label: lang === 'en' ? 'Years Experience' : 'Ans d\'expérience' },
    { value: '500K+', label: lang === 'en' ? 'Users Impacted' : 'Utilisateurs touchés' },
    { value: '37+', label: lang === 'en' ? 'Apps Deployed' : 'Apps déployées' },
    { value: '5', label: lang === 'en' ? 'Design Teams Led' : 'Équipes design dirigées' }
  ];

  // Clients logos
  const clients = [
    { name: 'Dailymotion', logo: '/images/dailymotion/logo-dailymotion-black.svg' },
    { name: 'SQOOL', logo: '/images/sqool/logo-sqool.svg' },
    { name: 'Toolkit', logo: '/images/toolkit/Logo toolkit - light bg - large - horizontal.svg' },
    { name: 'UNOWHY', logo: '/images/unowhy/Logo-Unowhy-LightBg.svg' }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        isDark
          ? 'bg-[#0a0a0a]/80 border-b border-white/10'
          : 'bg-white/80 border-b border-gray-200/50'
      } backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              filename="victor-soussan.webp"
              alt="Victor Soussan"
              className="w-9 h-9 rounded-full ring-2 ring-blue-500/20"
              isDark={isDark}
            />
            <span className="font-semibold">Victor Soussan</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className={`text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              {lang === 'en' ? 'Work' : 'Projets'}
            </a>
            <a href="#services" className={`text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              {lang === 'en' ? 'Expertise' : 'Expertises'}
            </a>
            <a href="#about" className={`text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              {lang === 'en' ? 'About' : 'À propos'}
            </a>
            <a href="#testimonials" className={`text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              {lang === 'en' ? 'Testimonials' : 'Témoignages'}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={onNavigateHome}
              className={`relative p-3 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors before:absolute before:inset-[-12px] before:content-['']`}
              title="Back to original home"
            >
              <X size={24} />
            </button>
            <a
              href="mailto:victorsoussan@gmail.com"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              {lang === 'en' ? 'Get in touch' : 'Me contacter'}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Jumpshare style with gradient background */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 via-indigo-400/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-400/15 via-purple-400/10 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm mb-8"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                {lang === 'en' ? "Available for new missions starting Jan '26" : "Disponible pour nouvelles missions à partir de Jan. '26"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            >
              <span className="text-gray-900">Design that </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                ships.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              {lang === 'en'
                ? 'I turn ambiguous requirements into functional prototypes, fast. 15 years in tech, 10 in product design. Enterprise software, media, education, public services.'
                : 'Je transforme des besoins flous en prototypes fonctionnels, rapidement. 15 ans dans la tech, 10 en design produit. Logiciels entreprise, médias, éducation, services publics.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#work"
                className="group px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-900/20"
              >
                {lang === 'en' ? 'View my work' : 'Voir mes projets'}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg flex items-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                <Calendar className="w-5 h-5" />
                {lang === 'en' ? 'Book a 30min call' : 'Planifier un appel de 30min'}
              </a>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            {lang === 'en' ? 'Trusted by leading companies' : 'Ils m\'ont fait confiance'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {clients.map((client, i) => (
              <img
                key={i}
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-10 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work - Bento Grid Style */}
      <section id="work" className="py-24 md:py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4"
            >
              {lang === 'en' ? 'Featured Work' : 'Projets Phares'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {lang === 'en' ? 'Deliver your work at the' : 'Livrez votre travail à la'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {lang === 'en' ? 'Speed of Light' : 'Vitesse de la Lumière'}
              </span>
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'en'
                ? 'From 0-to-1 products to scaling established platforms. Enterprise-grade quality, startup-speed delivery.'
                : 'Des produits 0-to-1 au scaling de plateformes établies. Qualité entreprise, vitesse startup.'}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={`/project/${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl ${project.bgColor} border border-gray-200/50 p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500`}
              >
                {/* Year Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-600">
                    {project.year}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-medium`}>
                      <Users className="w-4 h-4" />
                      {project.metrics}
                    </span>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                      {lang === 'en' ? 'View case study' : 'Voir le cas'}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200/50 group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.a>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              {lang === 'en' ? 'View all projects' : 'Voir tous les projets'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Expertise Section - Colored Cards */}
      <section id="services" className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4"
            >
              {lang === 'en' ? 'Expertise' : 'Expertises'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {lang === 'en' ? 'Get 10× higher engagement' : 'Obtenez 10× plus d\'engagement'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                {lang === 'en' ? 'and response rates' : 'et de taux de réponse'}
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-3xl bg-white border border-gray-200/50 hover:border-gray-300/50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Photo */}
      <section id="about" className="py-24 md:py-32 px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
                {lang === 'en' ? 'About Me' : 'À Propos'}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {lang === 'en'
                  ? 'Goodbye misunderstandings, hello'
                  : 'Adieu les malentendus, bonjour la'}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  {lang === 'en' ? 'Clarity' : 'Clarté'}
                </span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {lang === 'en'
                  ? 'I bridge the gap between vision and execution. With 15 years of experience across agencies, startups, and enterprises, I bring strategic thinking grounded in hands-on craft. My goal: reduce product risk through design and rapid prototyping.'
                  : 'Je fais le lien entre vision et exécution. Avec 15 ans d\'expérience en agence, startup et grands groupes, j\'apporte une pensée stratégique ancrée dans le craft. Mon objectif : réduire le risque produit par le design et le prototypage rapide.'}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                  <Target className="w-5 h-5 text-amber-300" />
                  <span className="text-sm font-medium">{lang === 'en' ? 'Product Strategy' : 'Stratégie Produit'}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                  <Users className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm font-medium">{lang === 'en' ? 'Team Leadership' : 'Leadership'}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                  <Sparkles className="w-5 h-5 text-violet-300" />
                  <span className="text-sm font-medium">{lang === 'en' ? 'AI-Augmented' : 'Augmenté par l\'IA'}</span>
                </div>
              </div>

              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-xl transition-all"
              >
                {lang === 'en' ? 'Read full bio' : 'Lire ma bio complète'}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/connect/connect_dashboard_home_light_full-scaled.webp"
                  alt="Dashboard Preview"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    filename="victor-soussan.webp"
                    alt="Victor Soussan"
                    className="w-12 h-12 rounded-full"
                    isDark={false}
                  />
                  <div>
                    <div className="font-bold text-gray-900">Victor Soussan</div>
                    <div className="text-sm text-gray-500">Product Design Lead</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {lang === 'en' ? 'Based in Paris, working globally' : 'Basé à Paris, travaille à l\'international'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4"
            >
              {lang === 'en' ? 'Testimonials' : 'Témoignages'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {lang === 'en' ? 'Trusted by over a million users' : 'Plus d\'un million d\'utilisateurs'}
            </motion.h2>
            <p className="text-lg text-gray-600">
              {lang === 'en'
                ? 'Don\'t just take my word for it. Here\'s what they\'re saying.'
                : 'Ne me croyez pas sur parole. Voici ce qu\'ils disent.'}
            </p>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">4.9/5 based on 14 reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => testimonial.linkedin && window.open(testimonial.linkedin, '_blank')}
                className={`p-8 rounded-3xl bg-white border border-gray-200/50 hover:shadow-xl transition-all ${
                  testimonial.linkedin ? 'cursor-pointer' : ''
                }`}
              >
                <Quote className="w-10 h-10 text-blue-100 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar
                    filename={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                    isDark={isDark}
                  />
                  <div>
                    {testimonial.linkedin ? (
                      <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-gray-900 hover:text-[#0077b5] transition-colors flex items-center gap-1 group"
                      >
                        {testimonial.author}
                        <Linkedin size={14} className="text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                      </a>
                    ) : (
                      <div className="font-bold text-gray-900">{testimonial.author}</div>
                    )}
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              {lang === 'en' ? 'View all 14 recommendations' : 'Voir les 14 recommandations'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {lang === 'en' ? 'Ready to improve your' : 'Prêt à améliorer votre'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {lang === 'en' ? 'productivity?' : 'productivité ?'}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-10"
          >
            {lang === 'en'
              ? 'Get in touch to start building better products with your team.'
              : 'Contactez-moi pour commencer à construire de meilleurs produits avec votre équipe.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="mailto:victorsoussan@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all"
            >
              {lang === 'en' ? 'Get in touch' : 'Me contacter'}
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer - Jumpshare Style */}
      <footer className="py-16 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  filename="victor-soussan.webp"
                  alt="Victor Soussan"
                  className="w-10 h-10 rounded-full"
                  isDark={false}
                />
                <span className="font-bold text-lg">Victor Soussan</span>
              </div>
              <p className="text-sm text-gray-600 mb-4 max-w-sm">
                {lang === 'en'
                  ? 'Lead Product Designer. Strategy, user research and product design for teams building enterprise tools and digital services.'
                  : 'Lead Product Designer. Strat\u00e9gie, recherche utilisateur et design produit pour les \u00e9quipes qui construisent des outils m\u00e9tier et des services num\u00e9riques.'}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/victorsoussan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href="mailto:victorsoussan@gmail.com"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{lang === 'en' ? 'Features' : 'Fonctionnalités'}</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">UX/UI Design</a></li>
                <li><a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{lang === 'en' ? 'Prototyping' : 'Prototypage'}</a></li>
                <li><a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Design Systems</a></li>
                <li><a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{lang === 'en' ? 'AI Workflows' : 'Workflows IA'}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{lang === 'en' ? 'Learn More' : 'En savoir plus'}</h4>
              <ul className="space-y-3">
                <li><a href="/work" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{lang === 'en' ? 'Case Studies' : 'Études de cas'}</a></li>
                <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{lang === 'en' ? 'About' : 'À propos'}</a></li>
                <li><a href="/testimonials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{lang === 'en' ? 'Testimonials' : 'Témoignages'}</a></li>
                <li><a href="/resume" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">CV / Resume</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li><a href="mailto:victorsoussan@gmail.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">victorsoussan@gmail.com</a></li>
                <li><a href="tel:+33615989400" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">+33 6 15 98 94 00</a></li>
                <li><span className="text-sm text-gray-600">Paris, France</span></li>
                <li>
                  <a
                    href="https://calendar.app.google/Zyp3tRyA2M9QByun6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {lang === 'en' ? 'Book a call' : 'Réserver un appel'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Victor Soussan. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'Français' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePageV2;
