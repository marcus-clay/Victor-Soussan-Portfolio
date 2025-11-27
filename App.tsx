import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Layers, 
  Users, 
  Briefcase, 
  LayoutGrid, 
  Figma, 
  PenTool, 
  Presentation, 
  BrainCircuit,
  ArrowUpRight,
  Mail,
  Linkedin,
  CheckCircle2,
  Target,
  Box,
  Cpu,
  Smartphone,
  Menu as MenuIcon,
  X,
  Maximize2,
  Image as ImageIcon,
  Download,
  FileText,
  BookOpen,
  ScrollText,
  Zap,
  Settings,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

// --- Types ---

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'blue' | 'gray' | 'indigo' | 'purple' | 'green' | 'orange';
}

// --- Components ---

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-apple-glass backdrop-blur-xl border border-apple-glassBorder rounded-3xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    green: "bg-green-100 text-green-700 border-green-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

// --- Data ---

const RESOURCES = [
  {
    title: "Checklist: Design d'une fonctionnalité",
    type: "Notion",
    desc: "A granular checklist to ensure quality from kickoff to handoff.",
    link: "https://victor-perso.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53",
    icon: <CheckCircle2 size={20} className="text-green-600"/>
  },
  {
    title: "Process: Découpage UI (Slicing)",
    type: "Notion",
    desc: "Methodology to break down interfaces into atomic components for devs.",
    link: "https://victor-perso.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c",
    icon: <Layers size={20} className="text-blue-600"/>
  },
  {
    title: "Template: Cadrage de conception",
    type: "Notion",
    desc: "A framework to frame design problems, scope, and goals before starting UI.",
    link: "https://victor-perso.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48",
    icon: <Target size={20} className="text-red-600"/>
  },
  {
    title: "Process: Synchro PO / Design",
    type: "Notion",
    desc: "Rituals and workflows to align Product Owners and Designers efficiently.",
    link: "https://victor-perso.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7",
    icon: <Users size={20} className="text-orange-600"/>
  },
  {
    title: "Atelier: Design Teardown",
    type: "Notion",
    desc: "Workshop template for analyzing and critiquing existing interfaces collectively.",
    link: "https://victor-perso.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d",
    icon: <ScrollText size={20} className="text-purple-600"/>
  },
  {
    title: "Atelier: Design Studio",
    type: "Notion",
    desc: "Facilitation guide for Crazy 8s and collaborative sketching sessions.",
    link: "https://victor-perso.notion.site/Template-Id-ation-Atelier-Design-Studio-22ea519b0dea811ea219efa2ae2569a8",
    icon: <PenTool size={20} className="text-pink-600"/>
  },
  {
    title: "Figma: Status des maquettes",
    type: "Notion",
    desc: "Naming conventions and status tags for keeping Figma files clean.",
    link: "https://victor-perso.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f",
    icon: <Figma size={20} className="text-indigo-600"/>
  }
];

const PROJECTS = [
  {
    id: "sqool",
    title: "SQOOL Suite (UNOWHY)",
    role: "Product Lead & Manager",
    period: "2018 – 2024",
    summary: "Leading the design transformation of a hardware company into a comprehensive EdTech SaaS ecosystem.",
    missions: [
      "Managed a team of 4 designers: hiring, annual reviews, career coaching",
      "Led design strategy workshops for 'Road to 2025' vision",
      "Structured Design Ops: Figma organization, templates, and rituals",
      "Bridged Product & Tech: Designed decks for C-Level & All-Hands demos"
    ],
    system: {
      title: "Multi-Brand Design System",
      desc: "Built a centralized Figma system supporting 8+ apps (Web/Android/PC). Created shared libraries for icons, gestures, and device frames to speed up hand-offs."
    },
    deliverables: [
      "SQOOL Classe (Classroom mgmt)",
      "SQOOL MDM (Fleet mgmt)",
      "Zeroheight Documentation",
      "Strategic PRDs & Vision Decks"
    ],
    icon: <Briefcase size={24} />,
    color: "blue"
  },
  {
    id: "dailymotion",
    title: "Dailymotion Partner",
    role: "Senior Product Designer",
    period: "2017 – 2018",
    summary: "Redesigning the professional video management suite for tier-1 media partners (CBS, Bein Sports).",
    missions: [
      "Led UX for high-volume upload & livestreaming dashboards",
      "Mentored junior designers on interaction specs",
      "Collaborated across Paris, NYC & Marseille teams",
      "Initiated the internal 'Pattern Library' for consistency"
    ],
    system: {
      title: "Storybook UI Kit",
      desc: "Created the first atomic component library in Sketch (pre-Figma) and collaborated with frontend to implement it in Storybook for global scalability."
    },
    deliverables: [
      "Live Dashboard & Clipping Tool",
      "Batch Upload & Metadata Editor",
      "Motion Guidelines",
      "Partner Mobile App (iOS/Android)"
    ],
    icon: <Users size={24} />,
    color: "gray"
  },
  {
    id: "toolkit",
    title: "Toolkit",
    role: "Founding Designer",
    period: "2023 – 2024",
    summary: "0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP.",
    missions: [
      "Defined the entire product architecture from scratch",
      "Worked directly with Founders (CEO/CTO) in Lean mode",
      "Designed Investor Pitch Decks & Marketing Assets",
      "Conducted field research with construction site managers"
    ],
    system: {
      title: "Tailwind-ready UI Kit",
      desc: "Designed a lightweight, mobile-first system optimized for messy field conditions (high contrast, large touch targets) ready for rapid Tailwind integration."
    },
    deliverables: [
      "SaaS Platform (Web & Mobile)",
      "Planning & Gantt Interaction Model",
      "Admin & Billing Panels",
      "Brand Identity & Logo"
    ],
    icon: <Cpu size={24} />,
    color: "indigo"
  },
  {
    id: "pagesjaunes",
    title: "PagesJaunes",
    role: "Mobile UI Lead",
    period: "2014 – 2017",
    summary: "Modernizing a legacy giant. Bringing mobile-first thinking to 22M+ users.",
    missions: [
      "Led UI for iOS & Android apps (22M downloads)",
      "Managed transition to Material Design standards",
      "Supervised Android Wear prototyping & Motion Design",
      "Coordinated cross-platform consistency with Engineering"
    ],
    system: {
      title: "Cross-Platform Foundations",
      desc: "Established the first shared design language between iOS, Android, and Responsive Web to unify the brand experience across millions of daily interactions."
    },
    deliverables: [
      "Onboarding Redesign (iOS/Android)",
      "Navigation & Search UI",
      "Android Wear Prototype",
      "User Retention Flows"
    ],
    icon: <Smartphone size={24} />,
    color: "purple"
  }
];

const TESTIMONIALS = [
  {
    author: "Pierre-Marie Nigay",
    role: "Fondateur de Toolkit",
    date: "14/11/2025",
    content: "Victor ne s’est pas contenté de faire des maquettes. Nous avons travaillé en ateliers avant même la création du produit... Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés. Victor est un super gars : curieux, positif, prêt à challenger pour aller toujours plus loin."
  },
  {
    author: "Boris Aimé-Bauderlique",
    role: "Chargé de déploiement @FranceVAE",
    date: "28/06/2025",
    content: "Toujours en train de proposer des idées qui bousculent... tu ne t’es jamais contenté de rester dans la réflexion : tu as produit, testé, maquetté, prototypé. Ton expertise UX est indéniable, mais c’est ton expérience qui a vraiment fait la différence."
  },
  {
    author: "Justine Le Tellier",
    role: "UX Researcher @UNOWHY",
    date: "12/12/2024",
    content: "En tant que Product Lead en UI & Interaction Design, il a joué un rôle central dans la définition de la vision produit... J’ai été très marquée par la curiosité de Victor et sa capacité à partager son savoir avec pédagogie."
  },
  {
    author: "Achref Akkari",
    role: "Product Manager @UNOWHY",
    date: "18/12/2024",
    content: "Victor est une véritable source d’inspiration... Son leadership et sa capacité à collaborer étroitement avec les différentes parties prenantes ont été essentiels pour créer des produits répondant aux besoins des utilisateurs."
  },
  {
    author: "Hortense Jan",
    role: "Marketing Director @UNOWHY",
    date: "09/12/2024",
    content: "Son expertise, sa vision 360 et son talent de designer ont permis la création et la réussite de nombreux projets... Victor est passionné et passionnant."
  },
  {
    author: "Hubert Bloch",
    role: "DG Adjoint @UNOWHY",
    date: "08/12/2024",
    content: "Très cultivé, curieux et créatif, il apporte toujours des idées pertinentes et des perspectives originales à chaque projet. En plus de son talent, Victor est quelqu’un de particulièrement sympathique."
  },
  {
    author: "Nicolas Moulin",
    role: "Entrepreneur / Advisor",
    date: "12/04/2016",
    content: "Il sait fédérer les gens autour d'un projet... il est très utile de discuter avec lui lorsqu'il s'agit d'aborder la vision moyen terme des services, des métiers et des process associés."
  }
];

// --- Main App Component ---

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsBioOpen(false);
        setIsTestimonialsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (selectedImage || isBioOpen || isTestimonialsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage, isBioOpen, isTestimonialsOpen]);

  // Scroll to section with offset for fixed header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const handleProjectClick = (project: typeof PROJECTS[0]) => {
    setSelectedProject(project);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const detailsElement = document.getElementById('project-details');
        if (detailsElement) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = detailsElement.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#F5F5F7] text-[#1D1D1F]">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-white/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="font-semibold text-lg tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Victor Soussan
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <button onClick={() => scrollToSection('services')} className="hover:text-black transition-colors">Services</button>
            <button onClick={() => scrollToSection('bio')} className="hover:text-black transition-colors">Bio & Toolkit</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-black transition-colors">Projets</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-black transition-colors">Testimonials</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-black transition-colors">Contact</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#F5F5F7] border-b border-gray-200 shadow-lg p-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium">Services</button>
            <button onClick={() => scrollToSection('bio')} className="text-left text-lg font-medium">Bio & Toolkit</button>
            <button onClick={() => scrollToSection('projects')} className="text-left text-lg font-medium">Projets</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-left text-lg font-medium">Testimonials</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-lg font-medium">Contact</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/60 backdrop-blur border border-white/50 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-600">Available for new missions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-6 leading-tight">
            Vision-driven design, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              grounded in prototyping and craft.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
            With 15 years in tech and 10 in product design, I build intuitive, high-impact interfaces for enterprise software, education, and public services.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-[#1D1D1F] text-white rounded-full font-medium text-lg hover:bg-black hover:scale-105 transition-all duration-300 shadow-lg flex items-center cursor-pointer relative z-20"
            >
              See Case Studies <ChevronRight className="ml-2" size={20} />
            </button>
            <button 
               onClick={() => scrollToSection('contact')}
               className="px-8 py-4 bg-white text-[#1D1D1F] border border-gray-200 rounded-full font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-sm cursor-pointer relative z-20"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center md:text-left">
             <h2 className="text-3xl font-bold mb-4">Services</h2>
             <p className="text-gray-500 text-lg max-w-2xl">
               From early ambiguity to clear form, I help you define what your product should be, its logic, its look, and the way people experience it.
             </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hands-on Execution */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-pink-50 w-fit rounded-2xl text-pink-600"><PenTool size={28}/></div>
               <h3 className="text-xl font-bold mb-4">Hands-on Execution</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-pink-400 flex-shrink-0"/> UX framing, UI design, micro-interactions</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-pink-400 flex-shrink-0"/> Hi-fi prototyping to validate ideas and sell a vision</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-pink-400 flex-shrink-0"/> MVP build-outs using Bolt, Lovable, Figma</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-pink-400 flex-shrink-0"/> Make Fast concept-to-interface workflows in complex domains</li>
               </ul>
            </div>

            {/* Product Utility */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl text-blue-600"><Zap size={28}/></div>
               <h3 className="text-xl font-bold mb-4">Product Utility</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-blue-400 flex-shrink-0"/> Build new product capabilities and core features</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-blue-400 flex-shrink-0"/> Shape product vision through interaction-first design</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-blue-400 flex-shrink-0"/> Develop accessibility and inclusive UX from the ground up</li>
               </ul>
            </div>

            {/* Operational Efficiency */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-orange-50 w-fit rounded-2xl text-orange-600"><Settings size={28}/></div>
               <h3 className="text-xl font-bold mb-4">Operational Efficiency</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-orange-400 flex-shrink-0"/> Set up design ops, systems, and reusable libraries</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-orange-400 flex-shrink-0"/> Improve design/dev handoff and collaboration rituals</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-orange-400 flex-shrink-0"/> Reduce repetitive work with documentation and prototypes</li>
               </ul>
            </div>

            {/* Organizational Impact */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="mb-6 p-4 bg-teal-50 w-fit rounded-2xl text-teal-600"><Users size={28}/></div>
               <h3 className="text-xl font-bold mb-4">Organizational Impact</h3>
               <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-teal-400 flex-shrink-0"/> Align product strategy with user needs via UX research</li>
                  <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 mt-0.5 text-teal-400 flex-shrink-0"/> Shape team culture through clarity, coaching, and tools</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Toolkit Section */}
      <section id="bio" className="py-20 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Biography & Toolkit</h2>
            <p className="text-gray-500 text-lg">Who I am, what I believe, and the tools I use.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            
            {/* Left: Bio Card */}
            <div className="md:col-span-7">
               <GlassCard className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                         <img 
                           src="/images/portrait-2026.webp" 
                           onError={(e) => {
                             e.currentTarget.onerror = null; 
                             e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80";
                           }}
                           alt="Victor Soussan" 
                           className="w-full h-full object-cover opacity-90"
                         />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Who</h3>
                        <p className="text-gray-500 text-sm">Product Design Lead • Mentor • Strategist</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                      <p>
                        Passionate designer with experience in innovation, media groups and startups. 
                        I work at the intersection between product vision, strategy, interface design and content.
                      </p>
                      <p>
                        I am used to leading a team as well as being hands-on, with extensive knowledge in hardware, software and operating systems.
                      </p>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-gray-900 font-semibold mb-3 flex items-center">
                          <Lightbulb size={18} className="mr-2 text-yellow-500"/> I believe in
                        </h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start">
                            <span className="mr-2 mt-1 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                            Creating digital products that help clients, not overwhelm or nag them.
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 mt-1 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                            Precision in craft, standard patterns over fancy UI, and valuable interactions.
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 mt-1 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                            Empowering teams with guidelines and coaching to navigate complexity.
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                         <h4 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wide text-opacity-70">Daily Drivers</h4>
                         <div className="flex flex-wrap gap-2">
                            {['Figma', 'Bolt', 'Lovable', 'ZeroHeight', 'Notion', 'Loom', 'Claude', 'Perplexity'].map(tool => (
                              <span key={tool} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-200">
                                {tool}
                              </span>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                     <button 
                       onClick={() => setIsBioOpen(true)}
                       className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
                     >
                       <ScrollText size={16} className="mr-2"/> Read Full Story
                     </button>
                     
                     <a 
                       href="https://victor-perso.notion.site/Portfolio-Victor-Soussan-113a519b0dea80309990e66347209772?pvs=4" 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                     >
                       <ExternalLink size={16} className="mr-2"/> Detailed Case Studies
                     </a>

                     <div className="flex space-x-2">
                        <a 
                          href="https://drive.google.com/file/d/1LqbuLyNUTn0zEf--wk_MaTynO8mHlokc/view?usp=drive_link" 
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Download size={16} className="mr-2"/> FR
                        </a>
                        <a 
                          href="https://docs.google.com/document/d/1YN-bE-x6Pmx2QMdYUm_q_uY4hafSb8mR/edit?usp=sharing&ouid=102321755574001298179&rtpof=true&sd=true" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <Download size={16} className="mr-2"/> EN
                        </a>
                     </div>
                  </div>
               </GlassCard>
            </div>

            {/* Right: Toolkit Grid */}
            <div className="md:col-span-5 flex flex-col space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col">
                 <div className="flex items-center mb-4 text-gray-900 font-bold">
                   <BookOpen size={20} className="mr-2 text-blue-600"/> 
                   <h3>My Resource Toolkit</h3>
                 </div>
                 <p className="text-sm text-gray-500 mb-6">
                   I believe senior designers should give back. Here are templates I use to structure design teams and workflows.
                 </p>
                 
                 <div className="space-y-3 flex-1">
                    {RESOURCES.map((res, idx) => (
                       <a 
                         key={idx} 
                         href={res.link} 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors group cursor-pointer border border-transparent hover:border-blue-100"
                       >
                          <div className="mr-3 bg-white p-2 rounded-lg border border-gray-100 group-hover:border-blue-100 shadow-sm">
                            {res.icon}
                          </div>
                          <div className="flex-1">
                             <div className="text-sm font-semibold">{res.title}</div>
                             <div className="text-xs text-gray-400 group-hover:text-blue-400">{res.desc}</div>
                          </div>
                          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"/>
                       </a>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Case Studies Section */}
      <section id="projects" className="py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Case Studies</h2>
            <p className="text-gray-500 text-lg">Select a project to explore missions, deliverables, and design systems.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[750px]">
            
            {/* Project List (Master) */}
            <div className="w-full md:w-1/3 flex flex-col space-y-4 overflow-y-auto pr-2 no-scrollbar">
              {PROJECTS.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className={`
                    cursor-pointer p-6 rounded-3xl border transition-all duration-300 group relative overflow-hidden
                    ${selectedProject.id === project.id 
                      ? 'bg-[#1D1D1F] text-white shadow-xl scale-[1.02]' 
                      : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-600'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`
                      p-2 rounded-xl mb-3 
                      ${selectedProject.id === project.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                    `}>
                      {project.icon}
                    </div>
                    {selectedProject.id === project.id && <ArrowUpRight size={20} className="opacity-50" />}
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${selectedProject.id === project.id ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm ${selectedProject.id === project.id ? 'text-gray-400' : 'text-gray-500'}`}>
                    {project.period}
                  </p>
                  <p className={`text-xs mt-2 font-medium ${selectedProject.id === project.id ? 'text-blue-300' : 'text-blue-600'}`}>
                    {project.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Project Details (Detail) */}
            <div id="project-details" className="w-full md:w-2/3 h-full">
              <GlassCard className="h-full p-8 md:p-10 flex flex-col overflow-y-auto relative no-scrollbar">
                {/* Header */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge color="indigo">{selectedProject.period}</Badge>
                    <Badge color="gray">{selectedProject.role}</Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl text-gray-500 leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Missions */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4 text-gray-900 font-semibold">
                      <Target size={20} className="text-blue-600" />
                      <h3>Key Missions</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedProject.missions.map((m, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm leading-relaxed">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Design System */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4 text-gray-900 font-semibold">
                      <Figma size={20} className="text-purple-600" />
                      <h3>Design System</h3>
                    </div>
                    <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                      <h4 className="text-sm font-bold text-purple-900 mb-1">{selectedProject.system.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{selectedProject.system.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="flex items-center space-x-2 mb-4 text-gray-900 font-semibold">
                    <Box size={20} className="text-indigo-600" />
                    <h3>Key Deliverables</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.deliverables.map((d, i) => (
                      <div key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 flex items-center">
                        <CheckCircle2 size={14} className="mr-2 text-green-500" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Trusted By</h2>
            <p className="text-gray-500 text-lg">Feedback from clients, managers, and team members.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             {/* Show only first 3 testimonials for preview */}
             {TESTIMONIALS.slice(0, 3).map((t, i) => (
                <div key={i} className="bg-[#F5F5F7] p-8 rounded-3xl border border-transparent hover:border-gray-200 transition-colors shadow-sm h-full flex flex-col justify-between">
                   <p className="text-gray-700 leading-relaxed text-sm mb-6">"{t.content}"</p>
                   <div>
                      <div className="font-bold text-gray-900">{t.author}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-10 text-center">
             <button 
               onClick={() => setIsTestimonialsOpen(true)}
               className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors inline-flex items-center"
             >
               View All Recommendations
             </button>
          </div>
        </div>
      </section>

      {/* Full Screen Testimonials Modal */}
      {isTestimonialsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
           <div 
             className="absolute inset-0 bg-white/95 backdrop-blur-xl"
             onClick={() => setIsTestimonialsOpen(false)}
           />
           <div className="relative w-full max-w-6xl h-full flex flex-col">
              <div className="flex justify-between items-center py-6 px-4">
                 <h2 className="text-3xl font-bold">All Recommendations</h2>
                 <button onClick={() => setIsTestimonialsOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              <div className="overflow-y-auto pb-20 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-fit break-inside-avoid">
                       <div className="text-xs text-gray-400 mb-4 font-mono">{t.date}</div>
                       <p className="text-gray-700 leading-relaxed text-sm mb-6">"{t.content}"</p>
                       <div className="border-t border-gray-50 pt-4">
                          <div className="font-bold text-gray-900">{t.author}</div>
                          <div className="text-xs text-blue-600 font-medium">{t.role}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#1D1D1F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to build something robust?</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            I am currently open to freelance missions or leadership roles. Let's discuss how we can elevate your product.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
             <a href="mailto:victorsoussan@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-colors flex items-center">
                <Mail className="mr-2" size={20} /> Send an Email
             </a>
             <a href="https://linkedin.com/in/victorsoussan/" target="_blank" rel="noreferrer" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-colors flex items-center">
                <Linkedin className="mr-2" size={20} /> LinkedIn Profile
             </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1D1D1F] text-gray-500 py-12 px-6 border-t border-gray-800">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
               <span className="font-bold text-white">Victor Soussan</span>
               <span className="mx-2">•</span>
               <span>Senior Product Design Lead</span>
            </div>
            <div className="text-sm">
               © {new Date().getFullYear()} — Designed & Built with React & Tailwind
            </div>
         </div>
      </footer>

    </div>
  );
};

export default App;