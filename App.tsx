
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './emailConfig';
import jsPDF from 'jspdf';
import {
  ChevronRight,
  Layers,
  Users,
  Briefcase,
  Figma,
  PenTool,
  ArrowUpRight,
  ArrowUp,
  Mail,
  Linkedin,
  CheckCircle2,
  Target,
  Box,
  Cpu,
  Smartphone,
  Menu as MenuIcon,
  X,
  Download,
  BookOpen,
  ScrollText,
  Zap,
  Settings,
  Lightbulb,
  ExternalLink,
  Quote,
  User,
  FlaskConical,
  Bot,
  Palette,
  Calendar,
  GraduationCap,
  FileText,
  Printer,
  Copy,
  Send,
  Images,
  Eye,
  Upload,
  CheckSquare,
  Square,
  Clock,
  Check,
  ArrowRight,
  Sun,
  Moon,
  Monitor,
  ChevronDown
} from 'lucide-react';
import { Rocket, Buildings, HandHeart, ArrowsClockwise, ChatCircleDots, ChartLineUp, Envelope, Phone, LinkedinLogo, Globe } from '@phosphor-icons/react';
import ToolkitPage from './ToolkitPage';

// --- Types ---

type Language = 'en' | 'fr';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'blue' | 'gray' | 'indigo' | 'purple' | 'green' | 'orange';
}

type Category = 'All' | 'Management' | 'Design' | 'Product & Tech' | 'Clients';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  image: string; // Just the filename
  linkedin?: string;
  category: Category;
}

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
  coverImage: string; // Landscape cover image filename
  externalLink?: string;
  testimonialId?: string;
}

interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
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

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const Avatar: React.FC<{ filename: string; alt: string; className?: string }> = ({ filename, alt, className = "" }) => {
  const cleanFilename = filename.split('/').pop() || filename;
  const imagePath = `/images/${cleanFilename}`;
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {!hasError ? (
        <img
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

// --- Lab Preview Data ---

const LAB_PREVIEWS = {
  apps: {
    title: 'Condamine Apps', subtitle: '37+ Apps Deployed', color: 'blue',
    highlights: ['37+ production-ready applications', 'Built using Bolt.new and Lovable AI', 'Real-world use cases from 2025'],
    previews: ['Timeboxing App', 'Recipe Generator', 'Portfolio Analyzer', 'Dashboard Builder', 'AI Chat Interface', 'Todo List Pro', 'Weather Station', 'Calculator Plus'],
    link: 'https://imaginative-youtiao-371d08.netlify.app'
  },
  learning: {
    title: 'Condamine Learning', subtitle: 'Education & Training', color: 'amber',
    highlights: ['Courses on AI-assisted design workflows', 'Workshops for Product Managers & Designers', 'From ideation to prototyping in hours'],
    previews: ['AI for Designers', 'Prompt Engineering', 'No-Code Prototyping', 'Design Systems with AI'],
    link: 'https://condamine-learning-a-5xzh.bolt.host'
  },
  agents: {
    title: 'Agents & Prompts', subtitle: 'System Engineering', color: 'purple',
    highlights: ['Custom GPTs optimized for design tasks', 'System prompts for product workflows', 'Agent configurations for automation'],
    previews: ['Design Critique Agent', 'User Story Generator', 'Component Naming Agent', 'Accessibility Checker'],
    link: 'https://victor-soussan.notion.site/Prompts-agents-database-VSO-155a519b0dea80ec9c99cdd229649c56'
  },
  art: {
    title: 'AI Art Gallery', subtitle: 'Midjourney V6', color: 'pink',
    highlights: ['Curated collection of AI-generated imagery', 'Exploring light, texture, and composition', 'Surreal and abstract visual experiments'],
    previews: ['Light & Shadow', 'Architectural Dreams', 'Abstract Textures', 'Portrait Series'],
    link: 'https://victor-soussan.notion.site/IA-Art-gallery-created-by-Victor-Soussan-2b8a519b0dea80b19385c8fe25dc9bb7'
  }
};

// --- Localization Data ---

const TRANSLATIONS = {
  en: {
    nav: {
      services: "Services",
      bio: "About",
      projects: "Work",
      lab: "The Lab",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    hero: {
      availability: "Available for new missions starting Jan '26",
      title: "Experienced designer for",
      subtitle: "product teams and startups",
      desc: "With 15 years in tech and 10 in product design, I build intuitive, high-impact interfaces for enterprise software, media, education, and public services.",
      cta_projects: "Case Studies",
      cta_book: "Book a 30min Call"
    },
    services: {
      title: "Services",
      subtitle: "From early ambiguity to clear form, I help you define what your product should be, its logic, its look, and the way people experience it.",
      execution: "Hands-on Execution",
      utility: "Product Utility",
      efficiency: "Operational Efficiency",
      impact: "Organizational Impact",
      items: {
        execution: [
          "UX framing, UI design, micro-interactions",
          "Hi-fi prototyping to validate ideas and sell a vision",
          "MVP build-outs using Bolt, Lovable, Figma",
          "Make Fast concept-to-interface workflows in complex domains"
        ],
        utility: [
          "Build new product capabilities and core features",
          "Shape product vision through interaction-first design",
          "Facilitate ideation & vision workshops with users and stakeholders",
          "Develop accessibility and inclusive UX from the ground up"
        ],
        efficiency: [
          "Set up design ops, systems, and reusable libraries",
          "Improve design/dev handoff and collaboration rituals",
          "Reduce repetitive work with documentation and prototypes"
        ],
        impact: [
          "Align product strategy with user needs via UX research",
          "Run design workshops with teams to boost collaboration and creativity",
          "Shape team culture through clarity, coaching, and tools"
        ]
      }
    },
    bio: {
      title: "About",
      subtitle: "Who I am, what I believe, and the tools I use.",
      role: "Product Design Lead • Mentor • Strategist",
      exp: "15 Years Experience",
      loc: "Based in Paris",
      value_prop: "I help startups and product teams ship fast without compromising quality.",
      bullets: [
        "Shape your product strategy without drowning in docs",
        "Create high-fidelity interactive prototypes to validate ideas",
        "Collaborate directly with engineering teams to iterate swiftly",
        "Build and nurture a design team that's set up for success"
      ],
      p1: "Passionate designer with experience in innovation, media groups and startups. I work at the intersection between product vision, strategy, interface design and content.",
      p2: "I am used to leading a team as well as being hands-on, with extensive knowledge in hardware, software and operating systems.",
      view_full_bio: "View Biography & Track Record",
      modal_title: "Biography & Track Record",
      modal_subtitle: "15 years building products, 10 years leading design",
      close: "Close",
      toolkit_title: "My Resource Toolkit",
      toolkit_desc: "I believe senior designers should give back. Here are templates I use to structure design teams and workflows.",
      journey_p1: "I started my career in <strong>2005 at Publicis Groupe</strong>, working on creative campaigns for luxury brands like Hermès, Leica, and Helena Rubinstein. This experience taught me the power of visual storytelling and attention to detail.",
      journey_p2: "From <strong>2005 to 2014</strong>, I evolved from print to digital, working as an Art Director for Groupe Hommell Publications (managing a magazine with 300,000 monthly circulation) and as a freelance creative director for clients like L'Oréal, Orange, and Galeries Lafayette. During this period at <strong>Louis 21 agency</strong>, I designed EADS's internal social network for 10,000 managers and created mobile apps for major brands, discovering my passion for product design.",
      journey_p3: "In <strong>2014</strong>, I joined <strong>PagesJaunes</strong> as a Product Designer, where I learned to design at scale. I redesigned their iOS and Android apps (<strong>22 million downloads, 300,000 daily users</strong>) and built their first cross-platform design system. I also grew into a leadership role, <strong>managing a team of 4 UI designers</strong>.",
      journey_p4: "At <strong>Ogury (2016-2017)</strong> and <strong>Dailymotion (2017-2018)</strong>, I specialized in B2B SaaS products. At Dailymotion, I designed publisher tools serving <strong>8,000+ users and 50-100 premium publishers</strong> (CBS, ESPN, BBC), handling <strong>100,000+ videos per month</strong>. I created their first UI Kit with Storybook, establishing design-to-development workflows.",
      journey_p5: "The most transformative chapter began in <strong>2018 at UNOWHY</strong>, where I spent 6 years (until Dec 2024). I started as a Senior Designer and grew into Product Lead, transforming SQOOL from a simple Android launcher into a <strong>5-application SaaS ecosystem serving 500,000+ students across 465 schools</strong> in Île-de-France.",
      journey_p6: "Key achievements at UNOWHY included:",
      journey_bullets: [
        "Leading SQOOL Extend (virtual machines for education) from 0-to-1, deploying MVP in 5 schools",
        "Delivering SQOOL Protect (parental control) in 3 months with interactive flows and demo video",
        "<strong>Recruiting and managing a team of 5 designers</strong>, establishing design operations and processes",
        "Creating a unified design system across 5 brands, reducing design time by 60%",
        "Co-designing 2 executive strategy seminars that defined the company's 2027 roadmap"
      ],
      journey_p7: "In parallel, I designed for <strong>Toolkit.ac (2023-2024)</strong>, a construction management SaaS startup, as their first product designer, helping shape their V2 product serving 2,000 paying users.",
      journey_p8: "From <strong>December 2024 to July 2025</strong>, I joined <strong>beta.gouv.fr</strong> to work on France VAE, a public service innovation. I designed the collective VAE MVP, conducted 10 user interviews, ran 2-day design thinking workshops, and restructured their product workflow with clear delivery cycles.",
      journey_p9: "Since <strong>July 2025</strong>, I've been operating as a <strong>Principal Designer</strong>, helping startups and enterprises with 0-to-1 product design, UX optimization, and AI integration. I'm also deeply exploring generative AI—building custom GPTs, prototyping with Bolt and Claude, and <strong>deploying 37+ functional web apps</strong> through my Condamine Apps lab.",
      journey_conclusion: "What drives me is turning complex problems into clear, testable products. Whether it's designing for 500,000 students, 8,000 B2B users, or helping a startup find product-market fit, I bring strategic vision grounded in hands-on execution, rapid prototyping, and a relentless focus on what actually works.",
      tools_title: "Daily Drivers",
      education_title: "Education & Certifications",
      education_master_title: "Master in Communication & Multimedia",
      education_master_school: "ISCOM Paris (2001-2005)",
      education_ux_title: "UX/UI Design & Prototyping",
      education_ux_school: "UXcel / Udemy (2021)",
      timeline: {
        "2026": [
          "Launch <strong>AI training program</strong> for entrepreneurs, product teams, and designers",
          "Continue experimentation on <strong>AI-assisted prototyping</strong> and industrialize this design approach",
          "Goal: Deploy <strong>100+ applications</strong> with Condamine Apps"
        ],
        "2025": [
          "Launched <strong>Condamine Apps</strong> – 37+ web apps prototyped and deployed",
          "Joined <strong>beta.gouv.fr</strong> as Lead Product Designer for France VAE",
          "Founded <strong>Victor Soussan Design</strong> as Principal Designer"
        ],
        "2024": [
          "Designed <strong>Toolkit.ac V2</strong> (construction SaaS, 2,000+ users)",
          "Shipped <strong>SQOOL Protect</strong> (parental control) in 3 months at UNOWHY",
          "Completed 6-year journey at UNOWHY (500K+ users, 465 schools)"
        ],
        "2023": [
          "Led <strong>SQOOL Extend</strong> (virtual machines for education) from 0-to-1",
          "Joined <strong>Toolkit.ac</strong> as First Product Designer",
          "Promoted to <strong>Product Lead</strong> at UNOWHY"
        ],
        "2022": [
          "Ran <strong><a href=\"https://www.notion.so/victor-soussan/Exp-rimentation-IA-et-ChatGPT-2022-1aaa519b0dea8085afd5e56f8893ba91\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-pink-600 hover:underline\">AI experimentation with ChatGPT</a></strong>",
          "Launched <strong>Hi SQOOL</strong> brand with complete identity"
        ],
        "2020-2021": [
          "Promoted to <strong>Design Lead</strong> at UNOWHY",
          "Transformed SQOOL from Android launcher to <strong>5-app SaaS ecosystem</strong>",
          "Recruited and built <strong>team of 5 designers</strong>"
        ],
        "2018-2019": [
          "Joined <strong>UNOWHY</strong> as UX/UI Designer Senior",
          "Designed solutions for <strong>465 Ile-de-France high schools (300,000 devices)</strong>"
        ],
        "2017-2018": [
          "Senior Product Designer at <strong>Dailymotion</strong> (8K+ users, 50-100 premium publishers)",
          "Created first <strong>UI Kit with Storybook</strong>, handling 100K+ videos/month"
        ],
        "2016-2017": [
          "Product Designer at <strong>Ogury</strong> (ad-tech dashboards)"
        ],
        "2014-2016": [
          "Lead UI/UX Designer at <strong>PagesJaunes</strong>",
          "Redesigned iOS & Android apps (<strong>22M downloads, 300K daily users</strong>)",
          "Built first <strong>cross-platform design system</strong>",
          "Managed team of <strong>4 UI designers</strong>"
        ],
        "2010-2014": [
          "Art Director at <strong>Groupe Hommell Publications</strong> (300K monthly circulation)",
          "Freelance Creative Director for <strong>L'Oréal, Orange, Galeries Lafayette</strong>",
          "Designed EADS internal social network at <strong>Louis 21</strong> (10K managers)",
          "Created mobile apps for major brands"
        ],
        "2005-2010": [
          "Started at <strong>Publicis Groupe</strong> (Hermès, Leica, Helena Rubinstein)",
          "Art Director for luxury brand campaigns",
          "Specialized in visual storytelling and premium design"
        ]
      }
    },
    resume: {
      title: "Victor Soussan – Product Design Lead",
      contact: "victorsoussan@gmail.com • +33 6 15 98 94 00 • Paris, France",
      linkedin: "linkedin.com/in/victorsoussan",
      portfolio: "https://victorsoussan-portfolio-2026.vercel.app",
      summary_title: "Professional Summary",
      summary: "Product Design Lead with 15 years in tech and 10 years leading design for enterprise software, education, media, and public services. Expert in 0-to-1 product design, design systems, team building, and AI-assisted prototyping. Track record of scaling products to 500K+ users and managing teams of 5+ designers.",
      experience_title: "Professional Experience",
      experience: [
        {
          period: "Jul 2025 – Present",
          role: "Principal Designer (Freelance)",
          company: "Independent Practice",
          achievements: [
            "Launched Condamine Apps – 37+ functional web apps prototyped and deployed",
            "Exploring AI-assisted design workflows with custom GPTs and rapid prototyping tools",
            "Advising startups on product strategy, UX optimization, and AI integration"
          ]
        },
        {
          period: "Dec 2024 – Jul 2025",
          role: "Product Designer",
          company: "beta.gouv.fr (France VAE)",
          achievements: [
            "Designed collective VAE MVP for public service innovation",
            "Conducted 10 user interviews and ran 2-day design thinking workshops",
            "Restructured product workflow with clear delivery cycles"
          ]
        },
        {
          period: "Jan 2018 – Dec 2024",
          role: "Product Lead & Design Manager",
          company: "UNOWHY (SQOOL Education Platform)",
          achievements: [
            "Scaled SQOOL from Android launcher to 5-app SaaS ecosystem serving 500K+ students across 465 schools",
            "Co-led product design team with CPO, member of Executive Committee for 1 year (slide preparation, bi-monthly committee participation)",
            "Led SQOOL Extend (virtual machines) from 0-to-1, deploying MVP in 5 schools",
            "Delivered SQOOL Protect (parental control) in 3 months with interactive flows",
            "Built and managed team of 5 designers, establishing design operations",
            "Created unified design system across 5 brands, reducing design time by 60%",
            "Co-designed 2 executive strategy seminars defining company's 2027 roadmap"
          ]
        },
        {
          period: "Feb 2023 – Dec 2024",
          role: "Product Designer",
          company: "Toolkit.ac (Construction SaaS)",
          achievements: [
            "First product designer for construction management startup",
            "Shaped V2 product serving 2,000 paying users",
            "Established design-to-development workflows"
          ]
        },
        {
          period: "Sep 2017 – Jan 2018",
          role: "Senior Product Designer",
          company: "Dailymotion",
          achievements: [
            "Designed publisher tools serving 8,000+ users and 50-100 premium publishers (CBS, ESPN, BBC)",
            "Handled 100,000+ videos per month",
            "Created first UI Kit with Storybook, establishing design-to-development workflows"
          ]
        },
        {
          period: "Sep 2016 – Sep 2017",
          role: "Product Designer",
          company: "Ogury (AdTech)",
          achievements: [
            "Specialized in B2B SaaS product design",
            "Designed analytics and campaign management tools"
          ]
        },
        {
          period: "Jan 2014 – Sep 2016",
          role: "Product Designer & Team Lead",
          company: "PagesJaunes (Solocal Group)",
          achievements: [
            "Redesigned iOS and Android apps (22M downloads, 300K daily users)",
            "Built first cross-platform design system",
            "Managed team of 4 UI designers"
          ]
        },
        {
          period: "2010 – 2014",
          role: "Art Director & Freelance Creative Director",
          company: "Groupe Hommell Publications / Freelance",
          achievements: [
            "Art Director for magazine with 300K monthly circulation",
            "Freelance Creative Director for L'Oréal, Orange, Galeries Lafayette",
            "Designed EADS internal social network at Louis 21 (10K managers)"
          ]
        },
        {
          period: "2005 – 2010",
          role: "Art Director",
          company: "Publicis Groupe",
          achievements: [
            "Worked on creative campaigns for Hermès, Leica, Helena Rubinstein",
            "Specialized in visual storytelling and premium design"
          ]
        }
      ],
      skills_title: "Core Skills",
      skills: [
        "Product Strategy & Vision",
        "0-to-1 Product Design",
        "Design Systems & Operations",
        "Team Leadership (up to 5 designers)",
        "UX Research & User Interviews",
        "Hi-Fi Prototyping (Figma, Bolt, Lovable)",
        "AI-Assisted Design Workflows",
        "B2B SaaS & Enterprise Software",
        "Design-Dev Collaboration"
      ],
      tools_title: "Tools & Technologies",
      tools: "Figma, FigJam, Adobe Suite, Sketch, Notion, Slack, Linear, ChatGPT, Claude, Midjourney, Bolt, Lovable, Storybook, HTML/CSS",
      education_title: "Education & Certifications",
      education: [
        "Master in Communication & Multimedia – ISCOM Paris (2001-2005)",
        "UX/UI Design & Prototyping – UXcel / Udemy (2021)"
      ],
      languages_title: "Languages",
      languages: "French (Native) • English (Fluent)",
      download_btn: "Download PDF",
      print_btn: "Print",
      copy_btn: "Copy to Clipboard",
      copied_message: "Copied to clipboard!",
      switch_lang: "Switch to French"
    },
    projects: {
      title: "Work",
      subtitle: "Select a project to explore missions, deliverables, and design systems.",
      missions: "Key Missions",
      system: "Design System",
      deliverables: "Key Deliverables",
      read_more: "Read the full case study"
    },
    lab: {
      tag: "Virtual R&D Laboratory",
      title: "Condamine Studio",
      desc: "Beyond pixel-perfect UI, I explore the frontiers of generative AI. My dedicated studio for rapid prototyping, prompt engineering, and synthetic art.",
      apps_title: "Condamine Apps",
      apps_sub: "37+ Apps Deployed",
      apps_desc: "A living archive of functional web prototypes built since 2025. Showcasing the speed of AI-assisted development.",
      apps_cta: "Visit App Gallery",
      learning_title: "Condamine Learning",
      learning_sub: "Education & Training",
      learning_desc: "Master the new stack. Courses, workshops, and resources to help designers and PMs leverage AI tools effectively.",
      learning_cta: "Explore Courses",
      agents_title: "Agents & Prompts",
      agents_sub: "System Engineering",
      agents_desc: "My personal Notion library of custom GPTs, system prompts, and agent workflows optimized for design tasks.",
      agents_cta: "Access Database",
      art_title: "AI Art Gallery",
      art_sub: "Midjourney V6",
      art_desc: "A curated collection of synthetic imagery, exploring light, texture, and surreal composition via generative models.",
      art_cta: "View Gallery"
    },
    testimonials: {
      title: "Trusted By",
      subtitle: "Feedback from clients, managers, and team members who have witnessed my impact on product and culture.",
      view_all: "View All 14 Recommendations",
      modal_title: "All Recommendations",
      modal_sub: "verified reviews from colleagues and partners",
      empty: "No testimonials found in this category.",
      close: "Close"
    },
    contact: {
      title: "Have a project in mind and want to get a quote?",
      subtitle: "I am currently open to freelance missions or leadership roles. Let's discuss how we can elevate your product.",
      email: "Send an Email",
      book: "Book a 30min Chat",
      linkedin: "LinkedIn Profile",
      simple_form_title: "Send me a message",
      simple_form_subtitle: "I typically respond within 24 hours",
      simple_form_name: "Name",
      simple_form_name_placeholder: "Your name",
      simple_form_email: "Email",
      simple_form_email_placeholder: "your.email@example.com",
      simple_form_message: "Message",
      simple_form_message_placeholder: "Tell me about your project...",
      simple_form_budget: "Estimated budget",
      simple_form_budget_placeholder: "Select a budget range",
      simple_form_start_date: "Start date",
      simple_form_end_date: "End date",
      simple_form_copy_email: "Copy email",
      simple_form_copy_intro: "You want to send an email on your own",
      simple_form_submit: "Send",
      simple_form_sending: "Sending...",
      quote_button: "Request a quote",
      quote_generator_title: "Get a Custom Quote",
      quote_step_1_title: "What best describes your situation?",
      quote_step_1_startup: "Startup / MVP",
      quote_step_1_startup_desc: "Early stage product",
      quote_step_1_established: "Established Company",
      quote_step_1_established_desc: "Optimize & scale",
      quote_step_1_longterm: "Long-term Partnership",
      quote_step_1_longterm_desc: "6+ months engagement",
      quote_step_2_title: "Do you have a project brief?",
      quote_step_2_drag: "Drag & drop your brief here",
      quote_step_2_or: "or",
      quote_step_2_browse: "Browse files",
      quote_step_2_formats: "PDF or DOCX (max 3MB)",
      quote_step_2_skip: "Skip this step",
      quote_step_3_title: "Which services do you need?",
      quote_step_3_service_1: "UX framing & UI design",
      quote_step_3_service_2: "Hi-fi prototyping & validation",
      quote_step_3_service_3: "MVP build-out (Bolt, Lovable, Figma)",
      quote_step_3_service_4: "Design system & UI Kit",
      quote_step_3_service_5: "User research & testing",
      quote_step_3_service_6: "Product strategy & roadmap",
      quote_step_3_service_7: "Team coaching & mentoring",
      quote_step_3_service_8: "Workshop facilitation",
      quote_step_4_title: "Tell us about your project",
      quote_step_4_need_label: "Do you have an idea of the need?",
      quote_step_4_need_placeholder: "Example: We need a dashboard for B2B users...",
      quote_step_4_desc_label: "Describe your project *",
      quote_step_4_desc_placeholder: "Tell us about your goals, challenges, and what success looks like...",
      quote_step_4_chars: "characters",
      quote_step_4_min_chars: "Minimum 50 characters",
      quote_step_5_title: "Budget & Timeline",
      quote_step_5_budget_label: "Estimated budget",
      quote_step_5_budget_placeholder: "Select a range",
      quote_step_5_start_label: "Desired start date",
      quote_step_5_end_label: "End date or duration",
      quote_step_6_title: "Your contact details",
      quote_step_6_name_label: "Name *",
      quote_step_6_name_placeholder: "Your name",
      quote_step_6_email_label: "Email *",
      quote_step_6_email_placeholder: "your.email@example.com",
      quote_step_6_company_label: "Company",
      quote_step_6_company_placeholder: "Your company name",
      quote_step_6_phone_label: "Phone",
      quote_step_6_phone_placeholder: "+33 6 12 34 56 78",
      quote_step_7_title: "Review your quote request",
      quote_step_7_project_type: "Project Type",
      quote_step_7_brief: "Brief Attached",
      quote_step_7_services: "Services",
      quote_step_7_project_details: "Project Details",
      quote_step_7_need: "Need",
      quote_step_7_description: "Description",
      quote_step_7_budget_timeline: "Budget & Timeline",
      quote_step_7_budget: "Budget",
      quote_step_7_start: "Start Date",
      quote_step_7_end: "End Date",
      quote_step_7_contact: "Contact Information",
      quote_step_7_edit: "Edit",
      quote_step_7_preview: "Preview",
      quote_step_7_download: "Download PDF",
      quote_step_7_send: "Send to Victor",
      quote_progress: "Step {current} of {total}",
      quote_next: "Next",
      quote_back: "Back",
      quote_skip: "Skip",
      quote_close: "Close",
      quote_confirm_close: "Are you sure? Your progress will be saved as a draft.",
      quote_success_title: "Quote request sent!",
      quote_success_message: "We'll be in touch within 24 hours",
      quote_success_new: "Start a new quote",
      quote_continue_draft: "Continue previous quote?",
      quote_continue_yes: "Continue",
      quote_continue_no: "Start fresh",
      quote_file_remove: "Remove file",
      quote_validation_select_type: "Please select a project type",
      quote_validation_select_service: "Please select at least one service",
      quote_validation_min_chars: "Please write at least 50 characters",
      quote_validation_required: "This field is required",
      quote_validation_email: "Please enter a valid email",
      quote_validation_file_size: "File size must be less than 3MB",
      quote_validation_file_type: "Only PDF and DOCX files are allowed"
    }
  },
  fr: {
    nav: {
      services: "Services",
      bio: "A propos",
      projects: "Études de Cas",
      lab: "Lab",
      testimonials: "Recommandations",
      contact: "Contact"
    },
    hero: {
      availability: "Disponible à partir de Janv. '26",
      title: "Designer expérimenté pour",
      subtitle: "équipes produit et startups",
      desc: "15 ans d'expérience, dont 10 dans la Tech. Je conçois, prototype et livre des logiciels complexes (SaaS, Mobile, Hardware) en me concentrant sur la clarté, l'utilisabilité et la faisabilité technique.",
      cta_projects: "Voir les Études de Cas",
      cta_book: "Planifier un appel de 30min"
    },
    services: {
      title: "Services",
      subtitle: "Je transforme des problèmes business flous en écrans clairs et fonctionnels. Mon rôle est de réduire le risque produit par le design et le prototypage rapide.",
      execution: "Exécution & Craft",
      utility: "Stratégie Produit",
      efficiency: "Efficacité & Ops",
      impact: "Leadership",
      items: {
        execution: [
          "Design d'interface (UI) propre et standardisé",
          "Prototypage haute-fidelité (du concept au test utilisateur)",
          "Développement MVP rapide (Bolt, Lovable, Figma)",
          "Design mobile natif (iOS/Android) & Responsive Web"
        ],
        utility: [
          "Cadrage de fonctionnalités (0 to 1) et définition du scope",
          "Clarification de la vision produit et des parcours clés",
          "Animation d'ateliers d'idéation & vision avec utilisateurs et clients",
          "Accessibilité et respect des standards ergonomiques"
        ],
        efficiency: [
          "Création et maintenance de Design Systems scalables",
          "Documentation technique pour le handoff développeur",
          "Optimisation des rituels de collaboration Tech/Produit"
        ],
        impact: [
          "Leadership d'équipe et recrutement de designers",
          "Animation d'ateliers design pour renforcer collaboration et créativité",
          "Alignement des parties prenantes (C-Level, PM, Tech)",
          "Mentorat et montée en compétence des juniors"
        ]
      }
    },
    bio: {
      title: "À Propos",
      subtitle: "Mon parcours, mon approche et mes ressources.",
      role: "Product Design Lead • Mentor • Strategist",
      exp: "15 Ans d'Expérience",
      loc: "Basé à Paris",
      value_prop: "Je vous aide à livrer vite sans sacrifier la qualité.",
      bullets: [
        "Définir votre stratégie produit sans vous noyer dans la doc",
        "Créer des prototypes haute-fidélité interactifs pour valider vos idées",
        "Collaborer directement avec les équipes d'engineering pour itérer rapidement",
        "Construire et accompagner une équipe design prête pour réussir"
      ],
      p1: "Je conçois des produits numériques depuis 15 ans. J'ai évolué de l'agence au produit, en passant par les grands groupes médias et les startups hardware. Je ne cherche pas à faire du 'beau', je cherche à faire du 'fonctionnel' et du 'viable'.",
      p2: "Mon profil est hybride : je peux définir une roadmap avec un CEO, manager une équipe de designers, et ouvrir Figma pour produire des maquettes prêtes à coder. Je comprends les contraintes techniques et je parle le langage des développeurs.",
      view_full_bio: "Voir mon Parcours Complet",
      modal_title: "Biographie et Parcours",
      modal_subtitle: "15 ans à construire des produits, 10 ans en design produit",
      close: "Fermer",
      toolkit_title: "Ma Boîte à Outils",
      toolkit_desc: "Templates et méthodes que j'utilise au quotidien pour structurer le design et les workflows de conception.",
      journey_p1: "J'ai démarré ma carrière en <strong>2005 chez Publicis Groupe</strong>, où j'ai travaillé sur des campagnes créatives pour des marques de luxe comme Hermès, Leica et Helena Rubinstein. Cette expérience m'a appris la puissance du storytelling visuel et l'attention au détail.",
      journey_p2: "De <strong>2005 à 2014</strong>, j'ai évolué de l'imprimé au digital, en tant que Directeur Artistique pour le Groupe Hommell Publications (direction d'un magazine à 300 000 exemplaires mensuels) et en freelance pour des clients comme L'Oréal, Orange et les Galeries Lafayette. Durant cette période chez <strong>l'agence Louis 21</strong>, j'ai conçu le réseau social interne d'EADS pour 10 000 managers et créé des applications mobiles pour de grandes marques, découvrant ainsi ma passion pour le design produit.",
      journey_p3: "En <strong>2014</strong>, j'ai rejoint <strong>PagesJaunes</strong> en tant que Product Designer, où j'ai appris à designer à grande échelle. J'ai redessiné leurs applications iOS et Android (<strong>22 millions de téléchargements, 300 000 utilisateurs quotidiens</strong>) et construit leur premier design system cross-platform. J'y ai également évolué vers un rôle de leadership, <strong>en manageant une équipe de 4 UI designers</strong>.",
      journey_p4: "Chez <strong>Ogury (2016-2017)</strong> et <strong>Dailymotion (2017-2018)</strong>, je me suis spécialisé dans les produits SaaS B2B. Chez Dailymotion, j'ai conçu des outils pour éditeurs servant <strong>8 000+ utilisateurs et 50-100 éditeurs premium</strong> (CBS, ESPN, BBC), gérant <strong>100 000+ vidéos par mois</strong>. J'ai créé leur premier UI Kit avec Storybook, établissant des workflows design-développement.",
      journey_p5: "Le chapitre le plus transformateur a commencé en <strong>2018 chez UNOWHY</strong>, où j'ai passé 6 ans (jusqu'en déc. 2024). J'ai débuté comme Senior Designer et ai évolué vers un rôle de Product Lead, transformant SQOOL d'un simple launcher Android en un <strong>écosystème SaaS de 5 applications servant 500 000+ élèves dans 465 établissements</strong> en Île-de-France.",
      journey_p6: "Réalisations clés chez UNOWHY :",
      journey_bullets: [
        "Direction de SQOOL Extend (machines virtuelles pour l'éducation) de 0 à 1, déploiement du MVP dans 5 écoles",
        "Livraison de SQOOL Protect (contrôle parental) en 3 mois avec flows interactifs et vidéo de démo",
        "<strong>Recrutement et management d'une équipe de 5 designers</strong>, mise en place des opérations et processus design",
        "Création d'un design system unifié sur 5 marques, réduisant le temps de design de 60%",
        "Co-conception de 2 séminaires stratégiques exécutifs définissant la roadmap 2027 de l'entreprise"
      ],
      journey_p7: "En parallèle, j'ai designé pour <strong>Toolkit.ac (2023-2024)</strong>, une startup SaaS de gestion de chantier, en tant que premier product designer, contribuant à façonner leur produit V2 servant 2 000 utilisateurs payants.",
      journey_p8: "De <strong>décembre 2024 à juillet 2025</strong>, j'ai rejoint <strong>beta.gouv.fr</strong> pour travailler sur France VAE, une innovation de service public. J'ai designé le MVP VAE collectif, conduit 10 entretiens utilisateurs, animé des ateliers design thinking de 2 jours et restructuré leur workflow produit avec des cycles de livraison clairs.",
      journey_p9: "Depuis <strong>juillet 2025</strong>, j'opère en tant que <strong>Principal Designer</strong>, aidant les startups et entreprises avec le design produit 0-to-1, l'optimisation UX et l'intégration IA. J'explore également en profondeur l'IA générative—création de GPTs personnalisés, prototypage avec Bolt et Claude, et <strong>déploiement de 37+ applications web fonctionnelles</strong> via mon lab Condamine Apps.",
      journey_conclusion: "Ce qui me motive, c'est transformer des problèmes complexes en produits clairs et testables. Que ce soit designer pour 500 000 élèves, 8 000 utilisateurs B2B ou aider une startup à trouver son product-market fit, j'apporte une vision stratégique ancrée dans l'exécution concrète, le prototypage rapide et une focalisation sans relâche sur ce qui fonctionne réellement.",
      tools_title: "Outils du Quotidien",
      education_title: "Formation & Certifications",
      education_master_title: "Master en Communication & Multimédia",
      education_master_school: "ISCOM Paris (2001-2005)",
      education_ux_title: "UX/UI Design & Prototypage",
      education_ux_school: "Certification UXcel / Udemy (2021)",
      timeline: {
        "2026": [
          "Lancement d'un <strong>programme de formation à l'IA générative</strong> pour entrepreneurs, équipes produits et designers",
          "Poursuite de l'expérimentation sur le <strong>prototypage assisté par l'IA</strong> et industrialisation de ce mode de conception",
          "Objectif : Déployer <strong>100+ applications</strong> avec Condamine Apps"
        ],
        "2025": [
          "Lancement de <strong>Condamine Apps</strong> – 37+ applications web prototypées et déployées",
          "Rejoint <strong>beta.gouv.fr</strong> en tant que Lead Product Designer pour France VAE",
          "Création de <strong>Victor Soussan Design</strong> en tant que Principal Designer"
        ],
        "2024": [
          "Design de <strong>Toolkit.ac V2</strong> (SaaS construction, 2 000+ utilisateurs)",
          "Livraison de <strong>SQOOL Protect</strong> (contrôle parental) en 3 mois chez UNOWHY",
          "Fin de 6 ans chez UNOWHY (500K+ utilisateurs, 465 établissements)"
        ],
        "2023": [
          "Direction de <strong>SQOOL Extend</strong> (machines virtuelles éducatives) de 0 à 1",
          "Rejoint <strong>Toolkit.ac</strong> en tant que Premier Product Designer",
          "Promotion <strong>Product Lead</strong> chez UNOWHY"
        ],
        "2022": [
          "Expérimentation <strong><a href=\"https://www.notion.so/victor-soussan/Exp-rimentation-IA-et-ChatGPT-2022-1aaa519b0dea8085afd5e56f8893ba91\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-pink-600 hover:underline\">IA avec ChatGPT</a></strong>",
          "Lancement de la marque <strong>Hi SQOOL</strong> avec identité complète"
        ],
        "2020-2021": [
          "Promotion <strong>Design Lead</strong> chez UNOWHY",
          "Transformation de SQOOL d'un launcher Android en <strong>écosystème SaaS de 5 apps</strong>",
          "Recrutement et formation d'une <strong>équipe de 5 designers</strong>"
        ],
        "2018-2019": [
          "Rejoint <strong>UNOWHY</strong> en tant qu'UX/UI Designer Senior",
          "Conception de solutions pour <strong>465 lycées Ile-de-France (300 000 équipements)</strong>"
        ],
        "2017-2018": [
          "Senior Product Designer chez <strong>Dailymotion</strong> (8K+ utilisateurs, 50-100 éditeurs premium)",
          "Création du premier <strong>UI Kit avec Storybook</strong>, gérant 100K+ vidéos/mois"
        ],
        "2016-2017": [
          "Product Designer chez <strong>Ogury</strong> (dashboards ad-tech)"
        ],
        "2014-2016": [
          "Lead UI/UX Designer chez <strong>PagesJaunes</strong>",
          "Refonte des apps iOS & Android (<strong>22M téléchargements, 300K utilisateurs/jour</strong>)",
          "Construction du premier <strong>design system cross-platform</strong>",
          "Management d'une équipe de <strong>4 UI designers</strong>"
        ],
        "2010-2014": [
          "Directeur Artistique chez <strong>Groupe Hommell Publications</strong> (300K ex. mensuels)",
          "Directeur de Création Freelance pour <strong>L'Oréal, Orange, Galeries Lafayette</strong>",
          "Conception du réseau social interne EADS chez <strong>Louis 21</strong> (10K managers)",
          "Création d'applications mobiles pour grandes marques"
        ],
        "2005-2010": [
          "Débuts chez <strong>Publicis Groupe</strong> (Hermès, Leica, Helena Rubinstein)",
          "Directeur Artistique pour campagnes marques de luxe",
          "Spécialisation storytelling visuel et design premium"
        ]
      }
    },
    resume: {
      title: "Victor Soussan – Lead Product Design",
      contact: "victorsoussan@gmail.com • +33 6 15 98 94 00 • Paris, France",
      linkedin: "linkedin.com/in/victorsoussan",
      portfolio: "https://victorsoussan-portfolio-2026.vercel.app",
      summary_title: "Résumé Professionnel",
      summary: "Lead Product Design avec 15 ans d'expérience tech et 10 ans de leadership design pour logiciels d'entreprise, éducation, médias et services publics. Expert en design produit 0-to-1, design systems, construction d'équipes et prototypage assisté par IA. Bilan : produits à 500K+ utilisateurs et gestion d'équipes de 5+ designers.",
      experience_title: "Expérience Professionnelle",
      experience: [
        {
          period: "Juil 2025 – Présent",
          role: "Principal Designer (Freelance)",
          company: "Pratique Indépendante",
          achievements: [
            "Lancement de Condamine Apps – 37+ applications web fonctionnelles prototypées et déployées",
            "Exploration des workflows de design assistés par IA avec GPTs personnalisés et outils de prototypage rapide",
            "Conseil auprès de startups sur stratégie produit, optimisation UX et intégration IA"
          ]
        },
        {
          period: "Déc 2024 – Juil 2025",
          role: "Product Designer",
          company: "beta.gouv.fr (France VAE)",
          achievements: [
            "Conception du MVP VAE collective pour innovation service public",
            "Réalisation de 10 entretiens utilisateurs et animation d'ateliers design thinking de 2 jours",
            "Restructuration du workflow produit avec cycles de livraison clairs"
          ]
        },
        {
          period: "Jan 2018 – Déc 2024",
          role: "Product Lead & Design Manager",
          company: "UNOWHY (Plateforme SQOOL Éducation)",
          achievements: [
            "Transformation de SQOOL d'un launcher Android en écosystème SaaS de 5 apps pour 500K+ élèves dans 465 écoles",
            "Co-leadership de l'équipe design produit avec la CPO, membre du Comité de Direction pendant 1 an (rédaction des slides, participation aux comités bi-mensuels)",
            "Direction de SQOOL Extend (machines virtuelles) de 0-to-1, déploiement MVP dans 5 écoles",
            "Livraison de SQOOL Protect (contrôle parental) en 3 mois avec flows interactifs",
            "Construction et gestion d'une équipe de 5 designers, mise en place des opérations design",
            "Création d'un design system unifié sur 5 marques, réduction du temps de design de 60%",
            "Co-conception de 2 séminaires stratégiques direction définissant la roadmap 2027"
          ]
        },
        {
          period: "Fév 2023 – Déc 2024",
          role: "Product Designer",
          company: "Toolkit.ac (SaaS Construction)",
          achievements: [
            "Premier product designer pour startup de gestion de chantiers",
            "Structuration du produit V2 servant 2 000 utilisateurs payants",
            "Mise en place des workflows design-développement"
          ]
        },
        {
          period: "Sep 2017 – Jan 2018",
          role: "Senior Product Designer",
          company: "Dailymotion",
          achievements: [
            "Conception d'outils éditeurs pour 8 000+ utilisateurs et 50-100 éditeurs premium (CBS, ESPN, BBC)",
            "Gestion de 100 000+ vidéos par mois",
            "Création du premier UI Kit avec Storybook, mise en place des workflows design-développement"
          ]
        },
        {
          period: "Sep 2016 – Sep 2017",
          role: "Product Designer",
          company: "Ogury (AdTech)",
          achievements: [
            "Spécialisation en design produit B2B SaaS",
            "Conception d'outils analytics et gestion de campagnes"
          ]
        },
        {
          period: "Jan 2014 – Sep 2016",
          role: "Product Designer & Team Lead",
          company: "PagesJaunes (Groupe Solocal)",
          achievements: [
            "Refonte des apps iOS et Android (22M téléchargements, 300K utilisateurs quotidiens)",
            "Construction du premier design system cross-plateforme",
            "Gestion d'une équipe de 4 UI designers"
          ]
        },
        {
          period: "2010 – 2014",
          role: "Directeur Artistique & Directeur de Création Freelance",
          company: "Groupe Hommell Publications / Freelance",
          achievements: [
            "Directeur Artistique pour magazine avec 300K ex. mensuels",
            "Directeur de Création Freelance pour L'Oréal, Orange, Galeries Lafayette",
            "Conception du réseau social interne EADS chez Louis 21 (10K managers)"
          ]
        },
        {
          period: "2005 – 2010",
          role: "Directeur Artistique",
          company: "Publicis Groupe",
          achievements: [
            "Campagnes créatives pour Hermès, Leica, Helena Rubinstein",
            "Spécialisation storytelling visuel et design premium"
          ]
        }
      ],
      skills_title: "Compétences Clés",
      skills: [
        "Stratégie & Vision Produit",
        "Design Produit 0-to-1",
        "Design Systems & Opérations",
        "Leadership d'Équipe (jusqu'à 5 designers)",
        "Recherche UX & Entretiens Utilisateurs",
        "Prototypage Hi-Fi (Figma, Bolt, Lovable)",
        "Workflows Design Assistés par IA",
        "SaaS B2B & Logiciels d'Entreprise",
        "Collaboration Design-Dev"
      ],
      tools_title: "Outils & Technologies",
      tools: "Figma, FigJam, Adobe Suite, Sketch, Notion, Slack, Linear, ChatGPT, Claude, Midjourney, Bolt, Lovable, Storybook, HTML/CSS",
      education_title: "Formation & Certifications",
      education: [
        "Master Communication & Multimédia – ISCOM Paris (2001-2005)",
        "UX/UI Design & Prototypage – UXcel / Udemy (2021)"
      ],
      languages_title: "Langues",
      languages: "Français (Natif) • Anglais (Courant)",
      download_btn: "Télécharger PDF",
      print_btn: "Imprimer",
      copy_btn: "Copier le texte",
      copied_message: "Copié dans le presse-papier !",
      switch_lang: "Passer en Anglais"
    },
    projects: {
      title: "Études de Cas",
      subtitle: "Projets récents : du SaaS B2B complexe à l'application grand public.",
      missions: "Mes responsabilités",
      system: "Approche Système",
      deliverables: "Ce que j'ai livré",
      read_more: "Lire le case study complet"
    },
    lab: {
      tag: "R&D et Expérimentation",
      title: "Studio Condamine",
      desc: "Mon espace personnel pour tester les limites de l'IA générative. J'y explore comment ces outils peuvent accélérer le design et le développement de produits.",
      apps_title: "Condamine Apps",
      apps_sub: "37+ Apps Déployées",
      apps_desc: "Une galerie de prototypes fonctionnels (React/Web) générés par IA. La preuve par l'exemple qu'on peut passer de l'idée au produit en quelques heures.",
      apps_cta: "Voir les Apps",
      learning_title: "Condamine Learning",
      learning_sub: "Transmission",
      learning_desc: "Formations et ressources pour aider les Designers et PMs à ne pas subir la vague IA, mais à la surfer.",
      learning_cta: "Explorer les Cours",
      agents_title: "Agents & Prompts",
      agents_sub: "Ingénierie Système",
      agents_desc: "Ma base de données Notion de prompts et d'agents GPTs que j'ai configurés pour automatiser les tâches répétitives du design.",
      agents_cta: "Accéder à la Base",
      art_title: "Galerie d'Art IA",
      art_sub: "Midjourney V6",
      art_desc: "Exploration purement visuelle. Composition, lumière et texture générées synthétiquement.",
      art_cta: "Voir la Galerie"
    },
    testimonials: {
      title: "Ils m'ont fait confiance",
      subtitle: "Ce que mes clients, managers et équipes disent de notre collaboration.",
      view_all: "Voir les 14 Recommandations",
      modal_title: "Toutes les Recommandations",
      modal_sub: "avis vérifiés (LinkedIn / PDF)",
      empty: "Aucune recommandation trouvée dans cette catégorie.",
      close: "Fermer"
    },
    contact: {
      title: "Un projet complexe à lancer ?",
      subtitle: "Je suis ouvert aux missions de Product Design (Freelance) ou rôles de Lead (CDI). Discutons concrètement de vos besoins.",
      email: "Envoyer un email",
      book: "Planifier un appel de 30min",
      linkedin: "LinkedIn",
      simple_form_title: "Envoyez-moi un message",
      simple_form_subtitle: "Je réponds généralement sous 24h",
      simple_form_name: "Nom",
      simple_form_name_placeholder: "Votre nom",
      simple_form_email: "Email",
      simple_form_email_placeholder: "votre.email@exemple.fr",
      simple_form_message: "Message",
      simple_form_message_placeholder: "Parlez-moi de votre projet...",
      simple_form_budget: "Budget estimé",
      simple_form_budget_placeholder: "Sélectionnez une fourchette",
      simple_form_start_date: "Date de début",
      simple_form_end_date: "Date de fin",
      simple_form_copy_email: "Copier l'email",
      simple_form_copy_intro: "Vous souhaitez envoyer un email de votre coté",
      simple_form_submit: "Envoyer",
      simple_form_sending: "Envoi en cours...",
      quote_button: "Obtenir une estimation",
      quote_generator_title: "Demander un Devis",
      quote_step_1_title: "Quelle est votre situation ?",
      quote_step_1_startup: "Startup / MVP",
      quote_step_1_startup_desc: "Produit en phase early stage",
      quote_step_1_established: "Entreprise Établie",
      quote_step_1_established_desc: "Optimiser & scaler",
      quote_step_1_longterm: "Partenariat Long Terme",
      quote_step_1_longterm_desc: "Engagement 6+ mois",
      quote_step_2_title: "Avez-vous un brief projet ?",
      quote_step_2_drag: "Déposez votre brief ici",
      quote_step_2_or: "ou",
      quote_step_2_browse: "Parcourir",
      quote_step_2_formats: "PDF ou DOCX (max 3Mo)",
      quote_step_2_skip: "Passer cette étape",
      quote_step_3_title: "De quels services avez-vous besoin ?",
      quote_step_3_service_1: "Cadrage UX & Design UI",
      quote_step_3_service_2: "Prototypage haute-fidélité & validation",
      quote_step_3_service_3: "Build-out MVP (Bolt, Lovable, Figma)",
      quote_step_3_service_4: "Design system & UI Kit",
      quote_step_3_service_5: "Recherche & tests utilisateurs",
      quote_step_3_service_6: "Stratégie produit & roadmap",
      quote_step_3_service_7: "Coaching & mentoring d'équipe",
      quote_step_3_service_8: "Animation d'ateliers",
      quote_step_4_title: "Parlez-nous de votre projet",
      quote_step_4_need_label: "Avez-vous une idée du besoin ?",
      quote_step_4_need_placeholder: "Exemple : Nous avons besoin d'un dashboard pour nos utilisateurs B2B...",
      quote_step_4_desc_label: "Décrivez votre projet *",
      quote_step_4_desc_placeholder: "Parlez-nous de vos objectifs, défis, et à quoi ressemble le succès...",
      quote_step_4_chars: "caractères",
      quote_step_4_min_chars: "Minimum 50 caractères",
      quote_step_5_title: "Budget & Planning",
      quote_step_5_budget_label: "Budget estimé",
      quote_step_5_budget_placeholder: "Sélectionnez une fourchette",
      quote_step_5_start_label: "Date de début souhaitée",
      quote_step_5_end_label: "Date de fin ou durée",
      quote_step_6_title: "Vos coordonnées",
      quote_step_6_name_label: "Nom *",
      quote_step_6_name_placeholder: "Votre nom",
      quote_step_6_email_label: "Email *",
      quote_step_6_email_placeholder: "votre.email@exemple.fr",
      quote_step_6_company_label: "Entreprise",
      quote_step_6_company_placeholder: "Nom de votre entreprise",
      quote_step_6_phone_label: "Téléphone",
      quote_step_6_phone_placeholder: "+33 6 12 34 56 78",
      quote_step_7_title: "Revue de votre demande",
      quote_step_7_project_type: "Type de Projet",
      quote_step_7_brief: "Brief Joint",
      quote_step_7_services: "Services",
      quote_step_7_project_details: "Détails du Projet",
      quote_step_7_need: "Besoin",
      quote_step_7_description: "Description",
      quote_step_7_budget_timeline: "Budget & Planning",
      quote_step_7_budget: "Budget",
      quote_step_7_start: "Date de Début",
      quote_step_7_end: "Date de Fin",
      quote_step_7_contact: "Coordonnées",
      quote_step_7_edit: "Modifier",
      quote_step_7_preview: "Aperçu",
      quote_step_7_download: "Télécharger PDF",
      quote_step_7_send: "Envoyer à Victor",
      quote_progress: "Étape {current} sur {total}",
      quote_next: "Suivant",
      quote_back: "Retour",
      quote_skip: "Passer",
      quote_close: "Fermer",
      quote_confirm_close: "Êtes-vous sûr ? Votre progression sera sauvegardée.",
      quote_success_title: "Demande envoyée !",
      quote_success_message: "Nous vous recontacterons sous 24h",
      quote_success_new: "Nouvelle demande",
      quote_continue_draft: "Continuer le brouillon précédent ?",
      quote_continue_yes: "Continuer",
      quote_continue_no: "Recommencer",
      quote_file_remove: "Supprimer le fichier",
      quote_validation_select_type: "Veuillez sélectionner un type de projet",
      quote_validation_select_service: "Veuillez sélectionner au moins un service",
      quote_validation_min_chars: "Veuillez écrire au moins 50 caractères",
      quote_validation_required: "Ce champ est requis",
      quote_validation_email: "Veuillez entrer un email valide",
      quote_validation_file_size: "La taille du fichier doit être inférieure à 3Mo",
      quote_validation_file_type: "Seuls les fichiers PDF et DOCX sont autorisés"
    }
  }
};

// --- Localized Data Functions ---

const getResources = (lang: Language): Resource[] => {
  const isEn = lang === 'en';
  return [
    {
      title: isEn ? "Checklist: Feature Design" : "Checklist : Design de fonctionnalité",
      type: "Notion",
      desc: isEn ? "A granular checklist to ensure quality from kickoff to handoff." : "Rien ne doit être oublié avant le dev : edge cases, états vides, erreurs, responsive.",
      link: "https://victor-soussan.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53",
      icon: <CheckCircle2 size={20} className="text-green-600"/>
    },
    {
      title: isEn ? "Process: UI Slicing" : "Méthode : Découpage UI (Slicing)",
      type: "Notion",
      desc: isEn ? "Methodology to break down interfaces into atomic components for devs." : "Comment je découpe une interface en composants React/Atomic pour les développeurs.",
      link: "https://victor-soussan.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c",
      icon: <Layers size={20} className="text-blue-600"/>
    },
    {
      title: isEn ? "Template: Design Scoping" : "Template : Cadrage Design",
      type: "Notion",
      desc: isEn ? "A framework to frame design problems, scope, and goals before starting UI." : "Le document que je remplis avant d'ouvrir Figma pour aligner tout le monde sur le 'Pourquoi'.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48",
      icon: <Target size={20} className="text-red-600"/>
    },
    {
      title: isEn ? "Process: PO / Design Sync" : "Rituel : Synchro PO / Design",
      type: "Notion",
      desc: isEn ? "Rituals and workflows to align Product Owners and Designers efficiently." : "Comment organiser la collaboration hebdomadaire pour éviter l'effet tunnel.",
      link: "https://victor-soussan.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7",
      icon: <Users size={20} className="text-orange-600"/>
    },
    {
      title: "Atelier : Design Teardown",
      type: "Notion",
      desc: isEn ? "Workshop template for analyzing and critiquing existing interfaces collectively." : "Template pour auditer une interface existante en équipe et identifier les dettes UX.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d",
      icon: <ScrollText size={20} className="text-purple-600"/>
    },
    {
      title: "Atelier : Design Studio",
      type: "Notion",
      desc: isEn ? "Facilitation guide for Crazy 8s and collaborative sketching sessions." : "Guide d'animation pour faire dessiner des solutions aux non-designers (Crazy 8s).",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Studio-22ea519b0dea811ea219efa2ae2569a8",
      icon: <PenTool size={20} className="text-pink-600"/>
    },
    {
      title: isEn ? "Figma: File Status" : "Figma : Convention de nommage",
      type: "Notion",
      desc: isEn ? "Naming conventions and status tags for keeping Figma files clean." : "Comment je gère les statuts (WIP, Review, Dev Ready) pour qu'on s'y retrouve.",
      link: "https://victor-soussan.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f",
      icon: <Figma size={20} className="text-indigo-600"/>
    }
  ];
};

const getProjects = (lang: Language): Project[] => {
  const isEn = lang === 'en';
  return [
    {
      id: "toolkit",
      title: "Toolkit",
      role: isEn ? "Founding Designer" : "Founding Designer (Premier Designer)",
      period: "2023 – 2024",
      summary: isEn 
        ? "0-to-1 Product Design for a Construction Tech SaaS. From pitch deck to MVP." 
        : "Création d'un SaaS B2B pour le BTP, de zéro (0 to 1). J'ai traduit la vision des fondateurs en un produit commercialisable.",
      missions: isEn ? [
        "Defined the entire product architecture from scratch",
        "Worked directly with Founders (CEO/CTO) in Lean mode",
        "Designed Investor Pitch Decks & Marketing Assets",
        "Conducted field research with construction site managers"
      ] : [
        "Architecture de l'information : structurer une app complexe pour le terrain",
        "Prototypage rapide pour valider les hypothèses avec les conducteurs de travaux",
        "Création de l'identité visuelle et des supports investisseurs (Pitch Deck)",
        "Livraison des maquettes prêtes au développement (Dev Handoff)"
      ],
      system: {
        title: isEn ? "Tailwind-ready UI Kit" : "UI Kit optimisé Tailwind",
        desc: isEn ? "Designed a lightweight, mobile-first system optimized for messy field conditions (high contrast, large touch targets) ready for rapid Tailwind integration." : "J'ai conçu un système simple et robuste (Mobile First), avec de gros contrastes pour l'usage sur chantier, directement aligné sur les classes utilitaires Tailwind."
      },
      deliverables: isEn ? [
        "SaaS Platform (Web & Mobile)",
        "Planning & Gantt Interaction Model",
        "Admin & Billing Panels",
        "Brand Identity & Logo"
      ] : [
        "Plateforme SaaS complète (Web & Mobile)",
        "Module de Gantt/Planning interactif",
        "Back-office Admin & Facturation",
        "Identité de marque & Logo"
      ],
      icon: <Cpu size={24} />,
      color: "indigo",
      coverImage: "thumbnail-toolkit.webp",
      externalLink: "https://victor-soussan.notion.site/ebd/2b7a519b0dea80d9b40cc730ce4cfc4b",
      testimonialId: "pierre-marie-nigay"
    },
    {
      id: "sqool",
      title: "SQOOL Suite (UNOWHY)",
      role: isEn ? "Product Lead & Manager" : "Product Design Manager",
      period: "2018 – 2024",
      summary: isEn ? "Leading the design transformation of a hardware company into a comprehensive EdTech SaaS ecosystem." : "Passage d'une boite Hardware à un écosystème SaaS EdTech complet. J'ai structuré le pôle design et piloté la refonte logicielle.",
      missions: isEn ? [
        "Managed a team of 4 designers: hiring, annual reviews, career coaching",
        "Led design strategy workshops for 'Road to 2025' vision",
        "Structured Design Ops: Figma organization, templates, and rituals",
        "Bridged Product & Tech: Designed decks for C-Level & All-Hands demos"
      ] : [
        "Recrutement et management d'une équipe de 4 Product Designers",
        "Mise en place des Design Ops (Process, Figma, QA Design)",
        "Pilotage de la stratégie UX pour la suite logicielle (Roadmap 2025)",
        "Collaboration étroite avec 30+ développeurs et PMs"
      ],
      system: {
        title: isEn ? "Multi-Brand Design System" : "Design System Multi-Plateforme",
        desc: isEn ? "Built a centralized Figma system supporting 8+ apps (Web/Android/PC). Created shared libraries for icons, gestures, and device frames to speed up hand-offs." : "Un système centralisé pour 8 applications (Web, Android, PC). J'ai standardisé les composants pour réduire la dette technique et accélérer les développements."
      },
      deliverables: [
        "SQOOL Classe (Gestion de classe)",
        "SQOOL MDM (Gestion de flotte)",
        "Documentation Zeroheight",
        "Présentations Stratégiques (Comex)"
      ],
      icon: <Briefcase size={24} />,
      color: "blue",
      coverImage: "thumbnail-sqool-suite.webp",
      testimonialId: "charlotte-rifflet"
    },
    {
      id: "dailymotion",
      title: "Dailymotion Partner",
      role: isEn ? "Senior Product Designer" : "Senior Product Designer",
      period: "2017 – 2018",
      summary: isEn ? "Redesigning the professional video management suite for tier-1 media partners (CBS, Bein Sports)." : "Refonte du back-office vidéo utilisé par les grands médias (CBS, Bein Sports). Un outil métier complexe à fort volume de données.",
      missions: isEn ? [
        "Led UX for high-volume upload & livestreaming dashboards",
        "Mentored junior designers on interaction specs",
        "Collaborated across Paris, NYC & Marseille teams",
        "Initiated the internal 'Pattern Library' for consistency"
      ] : [
        "Design des features critiques : Upload de masse, Livestreaming",
        "Simplification de workflows complexes pour les éditeurs vidéo",
        "Collaboration internationale (Paris, NYC, Marseille)",
        "Mentorat des designers juniors sur l'UI et les specs"
      ],
      system: {
        title: isEn ? "Storybook UI Kit" : "Pattern Library (Sketch/Storybook)",
        desc: isEn ? "Created the first atomic component library in Sketch (pre-Figma) and collaborated with frontend to implement it in Storybook for global scalability." : "Création de la première librairie de composants atomiques (à l'époque sous Sketch) pour aligner le design et le code (Storybook)."
      },
      deliverables: isEn ? [
        "Live Dashboard & Clipping Tool",
        "Batch Upload & Metadata Editor",
        "Motion Guidelines",
        "Partner Mobile App (iOS/Android)"
      ] : [
        "Dashboard Live & Outil de Clipping",
        "Éditeur de métadonnées en masse",
        "App Mobile Partenaire (iOS/Android)",
        "Guidelines d'animation"
      ],
      icon: <Users size={24} />,
      color: "gray",
      coverImage: "thumbnail-dailymotion-web-platform.webp",
      externalLink: "https://victor-soussan.notion.site/ebd/2b7a519b0dea80b99138d4b51a65620b"
    },
    {
      id: "pagesjaunes",
      title: "PagesJaunes",
      role: isEn ? "Mobile UI Lead" : "Lead UI Mobile",
      period: "2014 – 2017",
      summary: isEn ? "Modernizing a legacy giant. Bringing mobile-first thinking to 22M+ users." : "Modernisation de l'application grand public (22 millions de téléchargements). Le défi : faire simple pour une audience très large.",
      missions: isEn ? [
        "Led UI for iOS & Android apps (22M downloads)",
        "Managed transition to Material Design standards",
        "Supervised Android Wear prototyping & Motion Design",
        "Coordinated cross-platform consistency with Engineering"
      ] : [
        "Direction artistique des apps iOS & Android",
        "Passage aux standards Material Design (Google)",
        "Prototypage innovant (Android Wear, Motion Design)",
        "Garant de la cohérence visuelle sur toutes les plateformes"
      ],
      system: {
        title: isEn ? "Cross-Platform Foundations" : "Fondations Cross-Platform",
        desc: isEn ? "Established the first shared design language between iOS, Android, and Responsive Web to unify the brand experience across millions of daily interactions." : "Définition d'un langage visuel commun entre iOS, Android et Web Mobile pour unifier l'expérience utilisateur sur tous les écrans."
      },
      deliverables: isEn ? [
        "Onboarding Redesign (iOS/Android)",
        "Navigation & Search UI",
        "Android Wear Prototype",
        "User Retention Flows"
      ] : [
        "Refonte de l'Onboarding",
        "UI de Recherche & Navigation",
        "Expériences contextuelles (Wearables)",
        "Optimisation des parcours de rétention"
      ],
      icon: <Smartphone size={24} />,
      color: "purple",
      coverImage: "thumbnail-pagesjaunes.webp",
      testimonialId: "nicolas-moulin"
    }
  ];
};

const getTestimonials = (lang: Language): Testimonial[] => {
  const isEn = lang === 'en';
  // If French, we use the original texts. If English, we use the translations.
  return [
    {
      id: "pierre-marie-nigay",
      author: "Pierre-Marie Nigay",
      role: isEn ? "Founder of Toolkit" : "Fondateur de Toolkit",
      date: "14/11/2025",
      content: isEn 
        ? "Victor didn't just create mockups. We worked in workshops before the product even existed... He transformed business requirements into perfectly adapted user journeys. Victor is a great guy: curious, positive, ready to challenge to go further."
        : "Victor ne s’est pas contenté de faire des maquettes. Nous avons travaillé en ateliers avant même la création du produit... Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés. Victor est un super gars : curieux, positif, prêt à challenger pour aller toujours plus loin.",
      image: "pierre-marie-nigay.png",
      linkedin: "https://www.linkedin.com/in/pierremarienigay",
      category: "Clients"
    },
    {
      id: "charlotte-rifflet",
      author: "Charlotte Rifflet",
      role: isEn ? "CPO @UNOWHY" : "CPO @UNOWHY",
      date: "24/06/2025",
      content: isEn 
        ? "Victor combines overflowing creativity with impressive rigor. He translates complex visions into clear, impactful user experiences. Always listening, curious, he constantly pushes thinking further."
        : "Victor allie une créativité débordante à une rigueur de travail impressionnante. Il sait traduire des visions complexes en expériences utilisateur claires et percutantes. Toujours à l’écoute, curieux, il pousse constamment les réflexions plus loin.",
      image: "charlotte-rifflet.png",
      linkedin: "https://www.linkedin.com/in/charlotterifflet",
      category: "Management"
    },
    {
      id: "boris-aime",
      author: "Boris Aimé-Bauderlique",
      role: isEn ? "Deployment Manager @FranceVAE" : "Chargé de déploiement @FranceVAE",
      date: "28/06/2025",
      content: isEn
        ? "Always proposing ideas that shake things up... you never settled for just thinking: you produced, tested, wireframed, prototyped. Your UX expertise is undeniable, but your experience made the difference."
        : "Toujours en train de proposer des idées qui bousculent... tu ne t’es jamais contenté de rester dans la réflexion : tu as produit, testé, maquetté, prototypé. Ton expertise UX est indéniable, mais c’est ton expérience qui a vraiment fait la différence.",
      image: "boris-aime-bauderlique.png",
      linkedin: "https://www.linkedin.com/in/boris-aimé-bauderlique",
      category: "Product & Tech"
    },
    {
      id: "achref-akkari",
      author: "Achref Akkari",
      role: isEn ? "Product Manager @UNOWHY" : "Product Manager @UNOWHY",
      date: "18/12/2024",
      content: isEn
        ? "Victor is a true source of inspiration. I was lucky to work with him on several projects... he brought a pragmatic and professional approach. His leadership and ability to collaborate were essential."
        : "Victor est une véritable source d’inspiration. J’ai eu la chance de travailler avec lui sur plusieurs projets... il a su apporter une approche pragmatique et professionnelle. Son leadership et sa capacité à collaborer étaient essentiels.",
      image: "achref-akkari.png",
      linkedin: "https://www.linkedin.com/in/achref-akkari",
      category: "Product & Tech"
    },
    {
      id: "justine-le-tellier",
      author: "Justine Le Tellier",
      role: isEn ? "UX Researcher @UNOWHY" : "UX Researcher @UNOWHY",
      date: "12/12/2024",
      content: isEn
        ? "As Product Lead in UI & Interaction Design, he played a central role in defining the product vision... I was struck by Victor's curiosity and his ability to share knowledge pedagogically. He was a real driver of progress."
        : "En tant que Product Lead en UI & Interaction Design, il a joué un rôle central dans la définition de la vision produit... J’ai été très marquée par la curiosité de Victor et sa capacité à partager son savoir avec pédagogie. Il a été un véritable moteur de progrès.",
      image: "justine-le-tellier.png",
      linkedin: "https://www.linkedin.com/in/justine-le-tellier",
      category: "Design"
    },
    {
      id: "hortense-jan",
      author: "Hortense Jan",
      role: isEn ? "Marketing Director @UNOWHY" : "Directrice Marketing @UNOWHY",
      date: "09/12/2024",
      content: isEn
        ? "I worked alongside Victor for 5 beautiful years. His expertise, 360 vision, and design talent enabled the creation and success of many projects... Victor is passionate and fascinating."
        : "J’ai travaillé aux côtés de Victor pendant 5 belles années. Son expertise, sa vision 360 et son talent de designer ont permis la création et la réussite de nombreux projets... Victor est passionné et passionnant.",
      image: "hortense-jan.png",
      linkedin: "https://www.linkedin.com/in/hortense-jan",
      category: "Management"
    },
    {
      id: "hubert-bloch",
      author: "Hubert Bloch",
      role: isEn ? "Deputy CEO @UNOWHY" : "Directeur Général Adjoint @UNOWHY",
      date: "08/12/2024",
      content: isEn
        ? "Highly cultivated, curious, and creative, he always brings relevant ideas and original perspectives. Beyond his talent, Victor is particularly friendly, which makes collaborating with him even more enjoyable."
        : "Très cultivé, curieux et créatif, il apporte toujours des idées pertinentes et des perspectives originales. En plus de son talent, Victor est quelqu’un de particulièrement sympathique, ce qui rend la collaboration avec lui d’autant plus agréable.",
      image: "hubert-bloch.png",
      linkedin: "https://www.linkedin.com/in/hubert-bloch",
      category: "Management"
    },
    {
      id: "mbagna-johan",
      author: "Mbagna Johan Gaby",
      role: "Product Designer",
      date: "30/09/2024",
      content: isEn
        ? "Passionate and reliable... Lover of details... his feedback allowed me to reach a new level. He has the will to listen to his team, putting them in the best conditions."
        : "Passionné et fiable... Amoureux des détails... ses retours m'ont permis d'atteindre un nouveau palier. Il a la volonté d'être à l'écoute de son équipe, de les mettre dans les meilleures conditions.",
      image: "johan-mbagna-gaby.png",
      linkedin: "https://www.linkedin.com/in/mbagna-johan-gaby",
      category: "Design"
    },
    {
      id: "safak-aktas",
      author: "Şafak Aktaş",
      role: isEn ? "Graphic Designer at Reflet Digital" : "Graphiste chez Reflet Digital",
      date: "10/12/2020",
      content: isEn
        ? "Beyond being a manager concerned with his team's well-being, he is passionate about details. Patient and pedagogical, he doesn't hesitate to give constructive advice... A mentor I appreciated working with."
        : "En plus d'être un manager soucieux du bien-être de son équipe, c'est un passionné qui a le souci du détail. Patient et pédagogue, il n'hésite pas à donner des conseils constructifs... Un mentor avec lequel j'ai apprécié travailler.",
      image: "safak-aktas.png",
      linkedin: "https://www.linkedin.com/in/safak-aktas",
      category: "Design"
    },
    {
      id: "frederic-rodriguez",
      author: "Frederic Rodriguez",
      role: isEn ? "Head of Poker - FDJ" : "Head of Poker - FDJ",
      date: "29/06/2017",
      content: isEn
        ? "Professional and rigorous, Victor knows how to translate business stakes into relevant implementations... Victor is very attentive to his collaborators and different trades, both technical and marketing."
        : "Professionnel et rigoureux, Victor sait traduire les enjeux business dans des réalisations pertinentes... Victor est très à l'écoute de ses collaborateurs et des différents métiers, à la fois technique ou marketing.",
      image: "frederic-rodriguez.png",
      linkedin: "https://www.linkedin.com/in/frederic-rodriguez",
      category: "Management"
    },
    {
      id: "remi-serougne",
      author: "Rémi Serougne",
      role: isEn ? "Web Developer" : "Développeur Web",
      date: "08/03/2017",
      content: isEn
        ? "Accessible, attentive, and responsible... working with Victor is a pleasure as he adheres to collective intelligence principles and facilitates interactions between Design and Engineering."
        : "Accessible, à l'écoute et responsable... travailler avec Victor est un plaisir car il adhère aux principes de l'intelligence collective et facilite les interactions entre l'équipe Design et la maîtrise d'œuvre.",
      image: "remi-serougne.png",
      linkedin: "https://www.linkedin.com/in/remi-serougne",
      category: "Product & Tech"
    },
    {
      id: "simon-white",
      author: "Simon White",
      role: "Senior UX",
      date: "22/04/2016",
      content: isEn
        ? "He is a very capable designer who can do the legwork but also take a step back and advise on more strategic aspects... He's worked on mobile and web, and has a keen eye for interaction design. Highly recommended."
        : "Victor is passionate about UX... He is a very capable designer who can do the legwork but also take a step back... He's worked on mobile and web, and has a keen eye for interaction design. Highly recommended.",
      image: "simon-white.png",
      linkedin: "https://www.linkedin.com/in/simon-white",
      category: "Design"
    },
    {
      id: "nicolas-moulin",
      author: "Nicolas Moulin",
      role: isEn ? "Entrepreneur / Advisor" : "Entrepreneur / Advisor",
      date: "12/04/2016",
      content: isEn
        ? "He knows how to unite people around a project, allowing for total autonomy to see it through. It is very useful to discuss the medium-term service vision with him."
        : "Il sait fédérer les gens autour d'un projet et qu'on peut par conséquent lui laisser une autonomie totale pour le mener à bien. Il est très utile de discuter avec lui lorsqu'il s'agit d'aborder la vision moyen terme.",
      image: "nicolas-moulin.png",
      linkedin: "https://www.linkedin.com/in/nicolasmoulin",
      category: "Management"
    },
    {
      id: "francois-khoury",
      author: "François Khoury",
      role: isEn ? "Senior Presales" : "Senior Presales",
      date: "30/10/2014",
      content: isEn
        ? "His previous experiences as Art Director and Designer bring a critical sense and a new approach to our projects which allow us to improve user experience... Victor helped us a lot on the embedded PagesJaunes application."
        : "Ses expériences précédentes de DA et Designer apportent un sens critique et une nouvelle approche... Victor nous a beaucoup aidé sur l'application embarquée PagesJaunes que nous avons conçue ensemble.",
      image: "francois-khoury.png",
      linkedin: "https://www.linkedin.com/in/francoiskhoury",
      category: "Product & Tech"
    }
  ];
};

// --- Main App Component ---

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const content = TRANSLATIONS[lang];
  const resources = getResources(lang);
  const projects = getProjects(lang);
  const testimonials = getTestimonials(lang);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [bioViewMode, setBioViewMode] = useState<'text' | 'timeline'>('text');
  const bioContentRef = useRef<HTMLDivElement>(null);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedLabItem, setSelectedLabItem] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeLang, setResumeLang] = useState<'fr' | 'en'>('fr');
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  const [copiedPortfolio, setCopiedPortfolio] = useState(false);
  const [iframeModalUrl, setIframeModalUrl] = useState<string | null>(null);
  const [isToolkitPageOpen, setIsToolkitPageOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isSimpleContactOpen, setIsSimpleContactOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [simpleContactForm, setSimpleContactForm] = useState({
    name: '',
    email: '',
    message: '',
    budget: '',
    startDate: '',
    endDate: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    duration: '',
    budget: '',
    projectType: '' as 'startup' | 'established' | 'long-term' | '',
    selectedServices: [] as string[]
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedServiceGallery, setSelectedServiceGallery] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Quote Generator State
  const [isQuoteGeneratorOpen, setIsQuoteGeneratorOpen] = useState(false);
  const [quoteStep, setQuoteStep] = useState(0);
  const [quoteData, setQuoteData] = useState({
    clientNeed: '' as 'new-product' | 'optimize-existing' | 'long-term' | 'other' | '',
    projectStatus: '' as 'early-stage' | 'scale-complex' | 'long-term-mission' | '',
    briefFile: null as File | null,
    briefFileName: '',
    briefFileSize: 0,
    services: [] as string[],
    needIdea: '',
    projectDescription: '',
    budget: '',
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [quoteValidationErrors, setQuoteValidationErrors] = useState<{[key: string]: string}>({});
  const [isQuoteSending, setIsQuoteSending] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Update selected project when language changes
  useEffect(() => {
    const currentId = selectedProject.id;
    const newProject = projects.find(p => p.id === currentId) || projects[0];
    setSelectedProject(newProject);
  }, [lang]);

  // Testimonial Filters
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsBioOpen(false);
        setIsTestimonialsOpen(false);
        setIsBookingOpen(false);
        setSelectedLabItem(null);
        setIsContactFormOpen(false);
        setIsSimpleContactOpen(false);
        setShowTooltip(false);

        // Quote generator with confirmation
        if (isQuoteGeneratorOpen && !quoteSuccess) {
          const hasData = quoteData.clientNeed || quoteData.services.length > 0 ||
                         quoteData.projectDescription || quoteData.name || quoteData.email;
          if (hasData) {
            if (window.confirm(content.contact.quote_confirm_close)) {
              localStorage.setItem('quoteDraft', JSON.stringify({ quoteData, quoteStep }));
              setIsQuoteGeneratorOpen(false);
            }
          } else {
            setIsQuoteGeneratorOpen(false);
          }
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isQuoteGeneratorOpen, quoteSuccess, quoteData, quoteStep, content]);

  // Autosave quote data to localStorage
  useEffect(() => {
    if (isQuoteGeneratorOpen && !quoteSuccess) {
      const hasData = quoteData.clientNeed || quoteData.services.length > 0 ||
                     quoteData.projectDescription || quoteData.name || quoteData.email;
      if (hasData) {
        localStorage.setItem('quoteDraft', JSON.stringify({ quoteData, quoteStep }));
      }
    }
  }, [quoteData, quoteStep, isQuoteGeneratorOpen, quoteSuccess]);

  // Pre-fill user data from localStorage when opening quote modal
  useEffect(() => {
    if (isQuoteGeneratorOpen && quoteStep === 0) {
      const savedEmail = localStorage.getItem('user_email');
      const savedName = localStorage.getItem('user_name');
      if (savedEmail || savedName) {
        setQuoteData(prev => ({
          ...prev,
          email: savedEmail || '',
          name: savedName || ''
        }));
      }
    }
  }, [isQuoteGeneratorOpen]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (selectedImage || isBioOpen || isTestimonialsOpen || isBookingOpen || selectedLabItem || isContactFormOpen || isSimpleContactOpen || selectedServiceGallery || isQuoteGeneratorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage, isBioOpen, isTestimonialsOpen, isBookingOpen, selectedLabItem, isContactFormOpen, isSimpleContactOpen, selectedServiceGallery]);

  // Detect system theme (light/dark mode)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      const systemPreference = mediaQuery.matches ? 'dark' : 'light';
      if (themeMode === 'system') {
        setSystemTheme(systemPreference);
      } else {
        setSystemTheme(themeMode);
      }
    };

    updateSystemTheme();

    const handleChange = () => {
      if (themeMode === 'system') {
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const sections = ['services', 'bio', 'projects', 'lab', 'testimonials', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    // Scroll detail panel to top
    projectDetailRef.current?.scrollTo({ top: 0 });
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

  const filteredTestimonials = activeCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === activeCategory);

  const linkedTestimonial = selectedProject.testimonialId
    ? testimonials.find(t => t.id === selectedProject.testimonialId)
    : null;

  // Resume modal handlers
  const handleDownloadResume = () => {
    const url = resumeLang === 'fr'
      ? 'https://docs.google.com/document/d/1DvCVcLllc-f7vD2sGni5sONVdyDY8hIG/edit?usp=sharing&ouid=102321755574001298179&rtpof=true&sd=true'
      : 'https://docs.google.com/document/d/1EOTBgcnhxcbxk6dYIt1ZAMrd9WqCceUY/edit?usp=sharing&ouid=102321755574001298179&rtpof=true&sd=true';
    window.open(url, '_blank');
  };

  const handleCopyResume = () => {
    const resumeContent = TRANSLATIONS[resumeLang].resume;
    let text = `${resumeContent.title}\n${resumeContent.contact}\n\n`;
    text += `${resumeContent.summary_title}\n${resumeContent.summary}\n\n`;
    text += `${resumeContent.experience_title}\n`;
    resumeContent.experience.forEach(exp => {
      text += `\n${exp.period} | ${exp.role}\n${exp.company}\n`;
      exp.achievements.forEach(ach => text += `• ${ach}\n`);
    });
    text += `\n${resumeContent.skills_title}\n${resumeContent.skills.join(', ')}\n\n`;
    text += `${resumeContent.tools_title}\n${resumeContent.tools}\n\n`;
    text += `${resumeContent.education_title}\n${resumeContent.education.join('\n')}\n\n`;
    text += `${resumeContent.languages_title}\n${resumeContent.languages}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedResume(true);
      setTimeout(() => setCopiedResume(false), 2000);
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('victorsoussan@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+33 6 15 98 94 00').then(() => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    });
  };

  const handleCopyLinkedin = () => {
    navigator.clipboard.writeText('https://linkedin.com/in/victorsoussan').then(() => {
      setCopiedLinkedin(true);
      setTimeout(() => setCopiedLinkedin(false), 2000);
    });
  };

  const handleCopyPortfolio = () => {
    navigator.clipboard.writeText('https://victorsoussan.com').then(() => {
      setCopiedPortfolio(true);
      setTimeout(() => setCopiedPortfolio(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      systemTheme === 'dark'
        ? 'bg-[#0a0a0a] text-white'
        : 'bg-[#F5F5F7] text-[#1D1D1F]'
    }`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        systemTheme === 'dark'
          ? 'bg-[#0a0a0a]/80 border-b border-white/10'
          : 'bg-[#F5F5F7]/80 border-b border-white/50'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo/Section Name - Logo visible when not scrolled, section name when scrolled */}
          <div
            className="relative font-semibold text-lg tracking-tight cursor-pointer transition-all duration-300 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            {!isScrolled ? (
              <span className="inline-block transition-opacity duration-300 opacity-100 group-hover:opacity-70">
                Victor Soussan
              </span>
            ) : (
              <div className="relative inline-flex items-center">
                {/* Section name - visible by default, fades out on hover (desktop only) */}
                <span className={`transition-all duration-300 ease-out ${isHoveringLogo ? 'md:opacity-0' : 'opacity-100'}`}>
                  {[
                    { id: 'services', label: content.nav.services },
                    { id: 'bio', label: content.nav.bio },
                    { id: 'projects', label: content.nav.projects },
                    { id: 'lab', label: content.nav.lab },
                    { id: 'testimonials', label: content.nav.testimonials },
                    { id: 'contact', label: content.nav.contact }
                  ].find(item => item.id === activeSection)?.label || 'Victor Soussan'}
                </span>

                {/* "Top" with arrow icon - hidden by default, fades in on hover (desktop only) */}
                <div className={`hidden md:flex items-center gap-2 absolute left-0 top-0 transition-all duration-300 ease-out whitespace-nowrap ${isHoveringLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <ArrowUp size={18} className="flex-shrink-0" strokeWidth={2.5} />
                  <span>Top</span>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            {/* Navigation Items - All visible when at top, progressive disclosure when scrolled */}
            {[
              { id: 'services', label: content.nav.services },
              { id: 'bio', label: content.nav.bio },
              { id: 'projects', label: content.nav.projects },
              { id: 'lab', label: content.nav.lab, icon: <FlaskConical size={14} className="mr-1.5"/> },
              { id: 'testimonials', label: content.nav.testimonials },
              { id: 'contact', label: content.nav.contact }
            ].map((item) => {
              const isActive = activeSection === item.id;

              // When not scrolled: show all items as simple text
              if (!isScrolled) {
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 transition-all duration-300 flex items-center whitespace-nowrap ${
                      systemTheme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              }

              // When scrolled: hide active pill (shown in logo), show only inactive pills
              if (isActive) {
                return null;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap transition-all duration-300 ease-out opacity-60 hover:opacity-100 scale-100 backdrop-blur-sm ${
                    systemTheme === 'dark'
                      ? 'text-gray-400 hover:text-white bg-white/10 border border-white/10'
                      : 'text-gray-600 hover:text-black bg-white/30 border border-gray-200/30'
                  }`}
                  style={{
                    transitionProperty: 'opacity, background-color, color, transform, border-color',
                    transitionDuration: '300ms'
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}

            {/* Theme Toggle */}
            <div className={`flex items-center rounded-full p-1 ml-2 ${
              systemTheme === 'dark' ? 'bg-white/10' : 'glass-effect'
            }`}>
              <button
                onClick={() => setThemeMode('light')}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  themeMode === 'light'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : systemTheme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Light mode"
              >
                <Sun size={14} />
              </button>
              <button
                onClick={() => setThemeMode('system')}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  themeMode === 'system'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : systemTheme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="System theme"
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  themeMode === 'dark'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : systemTheme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Dark mode"
              >
                <Moon size={14} />
              </button>
            </div>

            {/* Language Toggle - Always visible */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className={`relative flex items-center justify-center rounded-full p-1 cursor-pointer btn-pill ml-2 ${
                systemTheme === 'dark' ? 'bg-white/10' : 'glass-effect'
              }`}
              aria-label="Switch Language"
            >
               <div
                 className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] accent-blue rounded-full shadow-sm transition-all duration-300 ease-spring ${lang === 'fr' ? 'translate-x-[100%] ml-1' : ''}`}
               />
               <span className={`relative z-10 px-3 py-0.5 text-[10px] font-bold transition-colors duration-300 flex items-center justify-center ${lang === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
               <span className={`relative z-10 px-3 py-0.5 text-[10px] font-bold transition-colors duration-300 flex items-center justify-center ${lang === 'fr' ? 'text-white' : 'text-gray-500'}`}>FR</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
             {/* Mobile Theme Toggle */}
             <button
               onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'system' : 'light')}
               className={`p-2 rounded-full transition-all duration-200 ${
                 systemTheme === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-200/50 text-gray-700'
               }`}
               aria-label="Toggle theme"
             >
               {themeMode === 'light' ? <Sun size={18} /> : themeMode === 'dark' ? <Moon size={18} /> : <Monitor size={18} />}
             </button>

             {/* Mobile Language Toggle */}
             <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className={`relative flex items-center justify-center rounded-full p-1 cursor-pointer ${
                systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-200/50'
              }`}
            >
               <div
                 className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full shadow-sm transition-all duration-300 ${lang === 'fr' ? 'translate-x-[100%] ml-1' : ''} ${
                   systemTheme === 'dark' ? 'bg-white/20' : 'bg-white'
                 }`}
               />
               <span className={`relative z-10 px-3 py-0.5 text-[10px] font-bold transition-colors duration-300 flex items-center justify-center ${lang === 'en' ? (systemTheme === 'dark' ? 'text-white' : 'text-black') : 'text-gray-500'}`}>EN</span>
               <span className={`relative z-10 px-3 py-0.5 text-[10px] font-bold transition-colors duration-300 flex items-center justify-center ${lang === 'fr' ? (systemTheme === 'dark' ? 'text-white' : 'text-black') : 'text-gray-500'}`}>FR</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 w-full shadow-lg p-6 flex flex-col space-y-3 ${
            systemTheme === 'dark'
              ? 'bg-[#1D1D1F] border-b border-white/10'
              : 'bg-[#F5F5F7] border-b border-gray-200'
          }`}>
            <button onClick={() => scrollToSection('projects')} className={`text-left text-base font-medium px-4 py-2.5 rounded-full btn-pill ${systemTheme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'glass-effect hover:text-blue-600'}`}>{content.nav.projects}</button>
            <button onClick={() => scrollToSection('services')} className={`text-left text-base font-medium px-4 py-2.5 rounded-full btn-pill ${systemTheme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'glass-effect hover:text-blue-600'}`}>{content.nav.services}</button>
            <button onClick={() => scrollToSection('bio')} className={`text-left text-base font-medium px-4 py-2.5 rounded-full btn-pill ${systemTheme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'glass-effect hover:text-blue-600'}`}>{content.nav.bio}</button>
            <button onClick={() => scrollToSection('testimonials')} className={`text-left text-base font-medium px-4 py-2.5 rounded-full btn-pill ${systemTheme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'glass-effect hover:text-blue-600'}`}>{content.nav.testimonials}</button>
            <button onClick={() => scrollToSection('lab')} className={`text-left text-base font-medium px-4 py-2.5 rounded-full btn-pill flex items-center ${systemTheme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'glass-effect hover:text-blue-600'}`}><FlaskConical size={18} className="mr-2"/>{content.nav.lab}</button>
            <button onClick={() => scrollToSection('contact')} className={`text-left text-base font-medium px-4 py-2.5 rounded-full btn-pill ${systemTheme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'glass-effect hover:text-blue-600'}`}>{content.nav.contact}</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-[154px] pb-[82px] md:pt-[170px] md:pb-[98px] px-6 overflow-hidden">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none ${
          systemTheme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none ${
          systemTheme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-200/30'
        }`} />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 backdrop-blur rounded-full mb-8 shadow-sm cursor-pointer transition-all duration-300 relative ${
              systemTheme === 'dark'
                ? 'bg-white/10 border border-white/20 hover:bg-white/20'
                : 'bg-white/60 border border-white/50 hover:bg-white/80'
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={`text-xs font-medium ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{content.hero.availability}</span>

            {/* Tooltip */}
            {showTooltip && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-[280px] backdrop-blur-xl rounded-3xl shadow-2xl p-5 z-50 ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F]/95 border border-white/10'
                      : 'bg-white/95 border border-gray-200/50'
                  }`}
                  style={{
                    boxShadow: systemTheme === 'dark'
                      ? '0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                      : '0 20px 60px -15px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {/* Arrow */}
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 backdrop-blur-xl rotate-45 ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F]/95 border-l border-t border-white/10'
                      : 'bg-white/95 border-l border-t border-gray-200/50'
                  }`} />

                  <div className="relative">
                    <h3 className={`text-base font-semibold mb-3 text-center ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Need a Design Partner?
                    </h3>

                    <div className="space-y-2.5">
                      {/* Contact Form Button */}
                      <button
                        className={`flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-2xl transition-all duration-200 shadow-lg text-sm font-medium ${
                          systemTheme === 'dark'
                            ? 'bg-white hover:bg-gray-100 text-gray-900 shadow-white/10'
                            : 'bg-gray-900 hover:bg-black text-white shadow-gray-900/20'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTooltip(false);
                          setIsSimpleContactOpen(true);
                        }}
                      >
                        <Mail size={18} />
                        <span>
                          Shoot me a note
                        </span>
                      </button>

                      {/* Book Call Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTooltip(false);
                          setIsBookingOpen(true);
                        }}
                        className={`flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-2xl transition-all duration-200 border text-sm font-medium ${
                          systemTheme === 'dark'
                            ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                            : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-200'
                        }`}
                      >
                        <Calendar size={18} />
                        <span>
                          Book a 30min Chat
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.15]">
            <span className={`${systemTheme === 'dark' ? 'text-white' : 'text-[#1D1D1F]'}`}>
              {content.hero.title}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {content.hero.subtitle}
            </span>
          </h1>

          <p className={`text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 ${
            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {content.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base btn-pill flex items-center cursor-pointer relative z-20 whitespace-nowrap accent-blue text-white"
            >
              {content.hero.cta_projects} <ChevronRight className="ml-2 flex-shrink-0" size={16} />
            </button>
            <button
               onClick={() => setIsBookingOpen(true)}
               className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base btn-pill cursor-pointer relative z-20 flex items-center justify-center transition-colors whitespace-nowrap ${
                 systemTheme === 'dark'
                   ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                   : 'glass-effect text-[#1D1D1F] hover:text-blue-600'
               }`}
            >
              <Calendar size={16} className="mr-2 flex-shrink-0"/> {content.hero.cta_book}
            </button>
          </div>
        </div>
      </header>

      {/* Logo Carousel */}
      <section className={`py-6 ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
              systemTheme === 'dark'
                ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-r from-[#F5F5F7] to-transparent'
            }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
              systemTheme === 'dark'
                ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-l from-[#F5F5F7] to-transparent'
            }`} />

          <div className="logo-carousel-track flex hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {[
                  { src: '/logos/LOGO AIRBUS.svg', alt: 'Airbus' },
                  { src: '/logos/LOGO ORANGE.svg', alt: 'Orange' },
                  { src: '/logos/LOGO VINCI.svg', alt: 'Vinci' },
                  { src: '/logos/LOGO DAILYMOTION-1.svg', alt: 'Dailymotion' },
                  { src: '/logos/LOGO BOUYGUES IMMO.svg', alt: 'Bouygues Immobilier' },
                  { src: '/logos/LOGO REGION ILE DE FRANCE.svg', alt: 'Région Île-de-France' },
                  { src: '/logos/LOGO BETAGOUV.svg', alt: 'Beta.gouv' },
                  { src: '/logos/LOGO OGURY.svg', alt: 'Ogury' },
                  { src: '/logos/LOGO SOLOCAL.svg', alt: 'Solocal' },
                  { src: '/logos/LOGO CELIO.svg', alt: 'Celio' },
                  { src: '/logos/LOGO OPERA COMIQUE.svg', alt: 'Opéra Comique' },
                  { src: '/logos/LOGO UNOWHY.svg', alt: 'Unowhy' },
                  { src: '/logos/LOGO KYU.svg', alt: 'Kyu' },
                  { src: '/logos/LOGO VERLINDE.svg', alt: 'Verlinde' },
                  { src: '/logos/LOGO UPTRADE.svg', alt: 'Uptrade' },
                ].map((logo, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex items-center justify-center mx-2 md:mx-3"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`h-[60px] sm:h-[80px] md:h-[100px] w-auto transition-all duration-500 ease-out ${
                        systemTheme === 'dark'
                          ? 'brightness-0 invert opacity-60 hover:opacity-100'
                          : 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          </div>
        </div>

        <style>{`
          .logo-carousel-track {
            animation: scroll 30s linear infinite;
          }
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .thin-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .thin-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .thin-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
          }
          .thin-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
          .dark .thin-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
          }
          .dark .thin-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}</style>
      </section>

      {/* Interactive Case Studies Section */}
      <section id="projects" className={`py-16 md:py-32 px-4 md:px-6 ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6">{content.projects.title}</h2>
            <p className={`text-sm sm:text-base md:text-lg ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{content.projects.subtitle}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-auto md:h-[750px]">

            {/* Project List (Master) */}
            <div className="w-full md:w-1/3 flex flex-col space-y-4 overflow-y-scroll py-2 pl-2 pr-4 no-scrollbar">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className={`
                    cursor-pointer p-6 pb-10 rounded-3xl border transition-all duration-300 group relative overflow-hidden
                    ${selectedProject.id === project.id
                      ? systemTheme === 'dark'
                        ? 'bg-blue-500/10 border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-[1.03]'
                        : 'bg-blue-50 border-blue-400 shadow-2xl shadow-blue-500/20 scale-[1.03]'
                      : systemTheme === 'dark'
                        ? 'bg-[#1D1D1F] border-white/5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10'
                        : 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100'}
                  `}
                >
                  {/* Gradient overlay on hover/active */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent transition-opacity duration-500 pointer-events-none ${
                    selectedProject.id === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <div className={`
                        p-2 rounded-xl mb-3 transition-all duration-300
                        ${selectedProject.id === project.id
                          ? systemTheme === 'dark'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-600'
                          : systemTheme === 'dark'
                            ? 'bg-white/10 text-gray-300 group-hover:scale-110'
                            : 'bg-gray-100 text-gray-600 group-hover:scale-110'}
                      `}>
                        {project.icon}
                      </div>
                      {selectedProject.id === project.id && <ArrowUpRight size={20} className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />}
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {project.period}
                    </p>
                    <p className={`text-xs mt-2 mb-4 font-medium ${
                      selectedProject.id === project.id
                        ? systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        : 'text-blue-500'
                    }`}>
                      {project.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Details (Detail) */}
            <div id="project-details" className="w-full md:w-2/3 h-full">
              <div
                ref={projectDetailRef}
                className={`h-full p-0 flex flex-col overflow-y-auto relative rounded-3xl border shadow-sm thin-scrollbar ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-white/80 backdrop-blur-xl border-white/50'
              }`}>
                {/* Cover Image */}
                <div className="p-4 md:p-6">
                  <div className={`relative w-full overflow-hidden rounded-2xl ${
                    systemTheme === 'dark' ? 'bg-[#111111]' : 'bg-gray-100'
                  }`}>
                    <img
                      src={`/images/${selectedProject.coverImage}`}
                      alt={`${selectedProject.title} cover`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  {/* Header */}
                  <div className={`border-b pb-6 mb-6 ${systemTheme === 'dark' ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge color="indigo">{selectedProject.period}</Badge>
                      <Badge color="gray">{selectedProject.role}</Badge>
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedProject.title}
                    </h2>
                    <p className={`text-xl leading-relaxed ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {selectedProject.summary}
                    </p>
                  </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">

                  {/* Missions */}
                  <div>
                    <div className={`flex items-center space-x-2 mb-4 font-semibold ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      <Target size={20} className="text-blue-500" />
                      <h3>{content.projects.missions}</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedProject.missions.map((m, i) => (
                        <li key={i} className={`flex items-start text-sm leading-relaxed ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Design System */}
                  <div>
                    <div className={`flex items-center space-x-2 mb-4 font-semibold ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      <Figma size={20} className="text-purple-500" />
                      <h3>{content.projects.system}</h3>
                    </div>
                    <div className={`p-4 rounded-2xl border ${
                      systemTheme === 'dark'
                        ? 'bg-purple-500/10 border-purple-500/20'
                        : 'bg-purple-50/50 border-purple-100'
                    }`}>
                      <h4 className={`text-sm font-bold mb-1 ${systemTheme === 'dark' ? 'text-purple-300' : 'text-purple-900'}`}>{selectedProject.system.title}</h4>
                      <p className={`text-sm leading-relaxed ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{selectedProject.system.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Deliverables & External Link */}
                <div className="mb-8">
                  <div className={`flex items-center space-x-2 mb-4 font-semibold ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <Box size={20} className="text-indigo-500" />
                    <h3>{content.projects.deliverables}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {selectedProject.deliverables.map((d, i) => (
                      <div key={i} className={`px-4 py-2 rounded-xl text-sm flex items-center ${
                        systemTheme === 'dark'
                          ? 'bg-white/5 border border-white/10 text-gray-300'
                          : 'bg-gray-50 border border-gray-100 text-gray-600'
                      }`}>
                        <CheckCircle2 size={14} className="mr-2 text-green-500" />
                        {d}
                      </div>
                    ))}
                  </div>

                  {selectedProject.externalLink && (
                    <button
                      onClick={() => {
                        if (selectedProject.id === 'toolkit') {
                          setIsToolkitPageOpen(true);
                        } else {
                          setIframeModalUrl(selectedProject.externalLink!);
                        }
                      }}
                      className={`inline-flex items-center px-5 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01] shadow-md ${
                        systemTheme === 'dark'
                          ? 'bg-white text-gray-900 hover:bg-gray-100'
                          : 'bg-gray-900 text-white hover:bg-black'
                      }`}
                    >
                      <BookOpen size={16} className="mr-2"/> {content.projects.read_more} <ArrowUpRight size={14} className="ml-2 opacity-70"/>
                    </button>
                  )}
                </div>

                {/* Project Linked Testimonial */}
                {linkedTestimonial && (
                  <div className={`mt-auto pt-8 border-t ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-100'
                  }`}>
                    <div className={`p-6 rounded-2xl border ${
                      systemTheme === 'dark'
                        ? 'bg-blue-900/20 border-blue-500/20'
                        : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-100'
                    }`}>
                       <div className="flex items-center mb-4">
                          <Avatar filename={linkedTestimonial.image} alt={linkedTestimonial.author} className={`w-10 h-10 rounded-full mr-3 border shadow-sm ${
                            systemTheme === 'dark' ? 'border-white/20' : 'border-white'
                          }`} />
                          <div>
                            <div className={`text-sm font-bold ${
                              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{linkedTestimonial.author}</div>
                            <div className={`text-xs ${
                              systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>{linkedTestimonial.role}</div>
                          </div>
                       </div>
                       <div className="relative">
                          <Quote size={16} className={`absolute -top-1 -left-1 transform -scale-x-100 ${
                            systemTheme === 'dark' ? 'text-blue-400/30' : 'text-blue-200'
                          }`} />
                          <p className={`text-sm italic relative z-10 pl-4 ${
                            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            "{linkedTestimonial.content}"
                          </p>
                       </div>
                    </div>
                  </div>
                )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Biography & Toolkit Section */}
      <section id="bio" className={`py-16 md:py-32 px-4 md:px-6 relative ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6">{content.bio.title}</h2>
            <p className={`text-sm sm:text-base md:text-lg ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{content.bio.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 md:gap-8">

            {/* Left: Bio Card */}
            <div className="md:col-span-7">
               <div className={`p-5 md:p-8 h-full flex flex-col justify-between overflow-hidden relative rounded-2xl md:rounded-3xl border shadow-sm ${
                 systemTheme === 'dark'
                   ? 'bg-[#1D1D1F] border-white/10'
                   : 'glass-effect border-white/50'
               }`}>
                  <div>
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-8">
                      <Avatar
                        filename="victor-soussan.png"
                        alt="Victor Soussan"
                        className="w-28 h-28 md:w-40 md:h-40 rounded-2xl md:rounded-[2rem] shadow-lg border border-white/20"
                      />
                      <div className="text-center md:text-left pt-2 flex-1">
                        <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Victor Soussan</h3>
                        <p className={`font-medium mb-3 md:mb-4 text-sm md:text-lg ${
                          systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>{content.bio.role}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          <Badge color="blue">{content.bio.exp}</Badge>
                          <Badge color="gray">{content.bio.loc}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className={`space-y-5 leading-relaxed text-[15px] ${
                      systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {/* Intro paragraphs first */}
                      <p>{content.bio.p1}</p>
                      <p>{content.bio.p2}</p>

                      {/* Value proposition block */}
                      <div className={`p-5 rounded-2xl border ${
                        systemTheme === 'dark'
                          ? 'bg-blue-900/20 border-blue-500/20'
                          : 'bg-blue-50/50 border-blue-100'
                      }`}>
                        <p className={`font-semibold mb-3 text-base ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{content.bio.value_prop}</p>
                        <ul className="space-y-2">
                          {content.bio.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <CheckCircle2 size={16} className="mr-2.5 mt-0.5 text-blue-500 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`flex flex-wrap gap-4 mt-8 pt-6 border-t ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-100'
                  }`}>
                     <button
                       onClick={() => setIsBioOpen(true)}
                       className="px-5 py-2.5 accent-blue text-white rounded-full text-sm font-medium btn-pill flex items-center"
                     >
                       <FileText size={16} className="mr-2"/> {content.bio.view_full_bio}
                     </button>

                     <a
                       href="https://linkedin.com/in/victorsoussan"
                       target="_blank"
                       rel="noreferrer"
                       className="px-5 py-2.5 rounded-full text-sm font-medium btn-pill flex items-center text-white"
                       style={{background: 'linear-gradient(135deg, #0077b5 0%, #006097 100%)'}}
                     >
                       <Linkedin size={16} className="mr-2"/> LinkedIn
                     </a>

                     <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setResumeLang('fr');
                            setIsResumeOpen(true);
                          }}
                          className={`px-4 py-2.5 rounded-full text-sm font-medium btn-pill flex items-center ${
                            systemTheme === 'dark'
                              ? 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                              : 'glass-effect text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          <Download size={16} className="mr-2"/> Résumé FR
                        </button>
                        <button
                          onClick={() => {
                            setResumeLang('en');
                            setIsResumeOpen(true);
                          }}
                          className={`px-4 py-2.5 rounded-full text-sm font-medium btn-pill flex items-center ${
                            systemTheme === 'dark'
                              ? 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                              : 'glass-effect text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          <Download size={16} className="mr-2"/> Résumé EN
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Toolkit Grid */}
            <div className="md:col-span-5 flex flex-col space-y-6">
              <div className={`p-6 rounded-3xl border shadow-sm h-full flex flex-col ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/10'
                  : 'bg-white border-gray-100'
              }`}>
                 <div className={`flex items-center mb-4 font-bold ${
                   systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                 }`}>
                   <BookOpen size={20} className="mr-2 text-blue-600"/>
                   <h3>{content.bio.toolkit_title}</h3>
                 </div>
                 <p className={`text-sm mb-6 ${
                   systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                 }`}>
                   {content.bio.toolkit_desc}
                 </p>

                 <div className="space-y-3 flex-1">
                    {resources.map((res, idx) => (
                       <a
                         key={idx}
                         href={res.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className={`flex items-center p-3 rounded-xl transition-colors group cursor-pointer border ${
                           systemTheme === 'dark'
                             ? 'bg-white/5 hover:bg-blue-900/30 text-gray-300 hover:text-blue-400 border-white/5 hover:border-blue-500/30'
                             : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border-transparent hover:border-blue-100'
                         }`}
                       >
                          <div className={`mr-3 p-2 rounded-lg border shadow-sm ${
                            systemTheme === 'dark'
                              ? 'bg-white/10 border-white/10 group-hover:border-blue-500/30'
                              : 'bg-white border-gray-100 group-hover:border-blue-100'
                          }`}>
                            {res.icon}
                          </div>
                          <div className="flex-1">
                             <div className="text-sm font-semibold">{res.title}</div>
                             <div className={`text-xs ${
                               systemTheme === 'dark'
                                 ? 'text-gray-500 group-hover:text-blue-400'
                                 : 'text-gray-400 group-hover:text-blue-400'
                             }`}>{res.desc}</div>
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

      {/* Services Section - Accordion Style */}
      <section id="services" className={`py-16 md:py-32 px-4 md:px-6 ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12 text-center md:text-left">
             <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6">{content.services.title}</h2>
             <p className={`text-sm sm:text-base md:text-lg max-w-2xl ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
               {content.services.subtitle}
             </p>
          </div>

          <div className="space-y-4">
            {/* Service Accordion Items */}
            {[
              {
                id: 'execution',
                icon: <PenTool size={24}/>,
                title: content.services.execution,
                items: content.services.items.execution,
                color: 'pink' as const,
                images: [
                  { src: '/images/bd-sketches/07 - Designing the Micro-Interaction - no legend.jpg', caption: lang === 'en' ? 'Designing micro-interactions' : 'Conception de micro-interactions' },
                  { src: '/images/bd-sketches/09 - Prototypage haute-fidélité et spécifications.jpg', caption: lang === 'en' ? 'Hi-fi prototyping & specs' : 'Prototypage haute-fidélité' },
                  { src: '/images/bd-sketches/06b - Prototyping La Bulle.jpg', caption: lang === 'en' ? 'Feature prototyping' : 'Prototypage de fonctionnalités' }
                ]
              },
              {
                id: 'utility',
                icon: <Zap size={24}/>,
                title: content.services.utility,
                items: content.services.items.utility,
                color: 'blue' as const,
                images: [
                  { src: '/images/bd-sketches/03 - Deep user observation - empathy.jpg', caption: lang === 'en' ? 'User observation & empathy' : 'Observation utilisateur & empathie' },
                  { src: '/images/bd-sketches/34 - User testing interviews.jpg', caption: lang === 'en' ? 'User testing & interviews' : 'Tests utilisateurs & interviews' },
                  { src: '/images/bd-sketches/design UX, product architecture, user flows.png', caption: lang === 'en' ? 'UX & product architecture' : 'Architecture UX & produit' }
                ]
              },
              {
                id: 'efficiency',
                icon: <Settings size={24}/>,
                title: content.services.efficiency,
                items: content.services.items.efficiency,
                color: 'orange' as const,
                images: [
                  { src: '/images/bd-sketches/11 - Construction du UI Kit et du Design System.jpg', caption: lang === 'en' ? 'UI Kit & Design System' : 'UI Kit & Design System' },
                  { src: '/images/bd-sketches/10 - Synchronisations Design-Dev et Architecture des Composants.jpg', caption: lang === 'en' ? 'Design-dev sync' : 'Sync Design-Dev' },
                  { src: '/images/bd-sketches/13b - Developer handoff.jpg', caption: lang === 'en' ? 'Developer handoff' : 'Passation aux développeurs' }
                ]
              },
              {
                id: 'impact',
                icon: <Users size={24}/>,
                title: content.services.impact,
                items: content.services.items.impact,
                color: 'teal' as const,
                images: [
                  { src: '/images/bd-sketches/21 - Ideation Workshop for the Suite.jpg', caption: lang === 'en' ? 'Ideation workshops' : 'Ateliers d\'idéation' },
                  { src: '/images/bd-sketches/27 - Ateliers de co creation et sketching en equipe.jpg', caption: lang === 'en' ? 'Co-creation workshops' : 'Ateliers de co-création' },
                  { src: '/images/bd-sketches/24 - Design teams rituals.jpg', caption: lang === 'en' ? 'Team rituals' : 'Rituels d\'équipe' }
                ]
              }
            ].map((service) => {
              const isExpanded = expandedService === service.id;
              const colorClasses = {
                pink: {
                  bg: systemTheme === 'dark' ? 'bg-pink-500/20' : 'bg-pink-50',
                  text: systemTheme === 'dark' ? 'text-pink-400' : 'text-pink-600',
                  check: 'text-pink-400'
                },
                blue: {
                  bg: systemTheme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-50',
                  text: systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600',
                  check: 'text-blue-400'
                },
                orange: {
                  bg: systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50',
                  text: systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600',
                  check: 'text-orange-400'
                },
                teal: {
                  bg: systemTheme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-50',
                  text: systemTheme === 'dark' ? 'text-teal-400' : 'text-teal-600',
                  check: 'text-teal-400'
                }
              }[service.color];

              const borderHoverColor = {
                pink: 'hover:border-pink-500/50',
                blue: 'hover:border-blue-500/50',
                orange: 'hover:border-orange-500/50',
                teal: 'hover:border-teal-500/50'
              }[service.color];

              const shadowHoverColor = {
                pink: 'hover:shadow-pink-900/10',
                blue: 'hover:shadow-blue-900/10',
                orange: 'hover:shadow-orange-900/10',
                teal: 'hover:shadow-teal-900/10'
              }[service.color];

              const gradientColor = {
                pink: 'from-pink-500/5',
                blue: 'from-blue-500/5',
                orange: 'from-orange-500/5',
                teal: 'from-teal-500/5'
              }[service.color];

              return (
                <div
                  key={service.id}
                  className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer ${
                    systemTheme === 'dark'
                      ? `bg-[#1D1D1F] border-white/5 ${borderHoverColor}`
                      : `bg-white border-gray-100 ${borderHoverColor}`
                  } ${isExpanded ? 'shadow-xl' : `shadow-sm hover:shadow-2xl ${shadowHoverColor}`}`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                  {/* Accordion Header */}
                  <button
                    onClick={() => setExpandedService(isExpanded ? null : service.id)}
                    className="relative z-10 w-full px-6 py-5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${colorClasses.bg} ${colorClasses.text}`}>
                        {service.icon}
                      </div>
                      <h3 className={`text-base md:text-lg font-bold ${
                        systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{service.title}</h3>
                    </div>
                    <div className={`p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      systemTheme === 'dark'
                        ? 'bg-white/10'
                        : 'bg-gray-100'
                    } ${isExpanded ? 'opacity-100' : ''}`}>
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        } ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className={`px-6 pb-6 border-t ${
                          systemTheme === 'dark' ? 'border-white/10' : 'border-gray-100'
                        }`}>
                          {/* Bullet Points */}
                          <ul className={`space-y-3 text-sm leading-relaxed pt-5 mb-6 ${
                            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {service.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 size={16} className={`mr-2 mt-0.5 ${colorClasses.check} flex-shrink-0`}/>
                                {item}
                              </li>
                            ))}
                          </ul>

                          {/* Image Grid - 3 columns */}
                          <div className="grid grid-cols-3 gap-3">
                            {service.images.map((img, idx) => (
                              <div
                                key={idx}
                                className={`rounded-xl overflow-hidden border ${
                                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-100'
                                }`}
                              >
                                <img
                                  src={img.src}
                                  alt={img.caption}
                                  className="w-full aspect-[4/3] object-cover"
                                />
                                <p className={`text-xs p-2 text-center ${
                                  systemTheme === 'dark'
                                    ? 'bg-white/5 text-gray-400'
                                    : 'bg-gray-50 text-gray-600'
                                }`}>
                                  {img.caption}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-16 md:py-32 px-4 md:px-6 border-t ${
        systemTheme === 'dark'
          ? 'bg-[#0a0a0a] border-white/10'
          : 'bg-white border-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6">{content.testimonials.title}</h2>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {content.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
             {/* Preview: Top 3 curated testimonials */}
             {[testimonials[0], testimonials[1], testimonials[2]].map((t, i) => (
                <div key={i} className={`p-5 md:p-8 rounded-2xl md:rounded-3xl border transition-colors shadow-sm h-full flex flex-col justify-between ${
                  systemTheme === 'dark'
                    ? 'bg-[#1D1D1F] border-white/10 hover:border-white/20'
                    : 'bg-[#F5F5F7] border-transparent hover:border-gray-200'
                }`}>
                   <div className="mb-6">
                      <div className="flex items-center mb-6">
                        <Avatar filename={t.image} alt={t.author} className={`w-14 h-14 rounded-full mr-4 border-2 shadow-sm ${systemTheme === 'dark' ? 'border-gray-700' : 'border-white'}`} />
                        <div>
                           {t.linkedin ? (
                             <a
                               href={t.linkedin}
                               target="_blank"
                               rel="noreferrer"
                               className={`font-bold leading-none hover:text-[#0077b5] transition-colors flex items-center group text-lg ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                             >
                               {t.author}
                               <Linkedin size={16} className="ml-2 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                             </a>
                           ) : (
                             <div className={`font-bold leading-none text-lg ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.author}</div>
                           )}
                           <div className={`text-xs font-medium mt-1 ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</div>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote size={20} className={`absolute -top-2 -left-2 transform -scale-x-100 ${systemTheme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                        <p className={`leading-relaxed text-[15px] pl-4 relative z-10 ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          "{t.content.length > 180 ? t.content.substring(0, 180) + '...' : t.content}"
                        </p>
                      </div>
                   </div>

                   <div className={`flex justify-between items-center border-t pt-4 mt-auto ${systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200/50'}`}>
                      <span className="text-xs text-gray-400 font-medium">{t.date}</span>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide ${
                        systemTheme === 'dark'
                          ? 'bg-white/10 text-gray-400 border border-white/10'
                          : 'bg-white text-gray-500 border border-gray-100'
                      }`}>
                        {t.category}
                      </span>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-12 text-center">
             <button
               onClick={() => setIsTestimonialsOpen(true)}
               className={`group px-8 py-3 border rounded-full font-medium transition-colors inline-flex items-center shadow-sm hover:shadow-md ${
                 systemTheme === 'dark'
                   ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                   : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
               }`}
             >
               {content.testimonials.view_all} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      {/* Condamine Studio Section */}
      <section id="lab" className="py-16 md:py-32 px-4 md:px-6 bg-[#09090b] text-white relative overflow-hidden">
         {/* Atmospheric Glows */}
         <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

         <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-blue-300 mb-3 md:mb-4 backdrop-blur-md">
                   <FlaskConical size={14} className="mr-2"/> {content.lab.tag}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">{content.lab.title}</h2>
                <p className="text-gray-400 mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-xl">
                   {content.lab.desc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
               {/* Card 1: Condamine Apps */}
               <div
                 onClick={() => setSelectedLabItem('apps')}
                 className="group relative bg-[#151517] border border-white/5 hover:border-blue-500/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col overflow-hidden cursor-pointer"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-blue-900/20 w-fit rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                     <Smartphone size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{content.lab.apps_title}</h3>
                  <div className="text-xs font-mono text-blue-400 mb-4">{content.lab.apps_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.apps_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.apps_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </div>

               {/* Card 2: Condamine Learning (NEW) */}
               <div
                 onClick={() => setSelectedLabItem('learning')}
                 className="group relative bg-[#151517] border border-white/5 hover:border-amber-500/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/10 flex flex-col overflow-hidden cursor-pointer"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-amber-900/20 w-fit rounded-2xl text-amber-400 group-hover:scale-110 transition-transform duration-300">
                     <GraduationCap size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{content.lab.learning_title}</h3>
                  <div className="text-xs font-mono text-amber-400 mb-4">{content.lab.learning_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.learning_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.learning_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </div>

               {/* Card 3: Prompts DB */}
               <div
                 onClick={() => setSelectedLabItem('agents')}
                 className="group relative bg-[#151517] border border-white/5 hover:border-purple-500/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 flex flex-col overflow-hidden cursor-pointer"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-purple-900/20 w-fit rounded-2xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
                     <Bot size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{content.lab.agents_title}</h3>
                  <div className="text-xs font-mono text-purple-400 mb-4">{content.lab.agents_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.agents_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.agents_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </div>

               {/* Card 4: Art Gallery */}
               <div
                 onClick={() => setSelectedLabItem('art')}
                 className="group relative bg-[#151517] border border-white/5 hover:border-pink-500/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/10 flex flex-col overflow-hidden cursor-pointer"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 p-4 bg-pink-900/20 w-fit rounded-2xl text-pink-400 group-hover:scale-110 transition-transform duration-300">
                     <Palette size={32}/>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{content.lab.art_title}</h3>
                  <div className="text-xs font-mono text-pink-400 mb-4">{content.lab.art_sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                     {content.lab.art_desc}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                     {content.lab.art_cta} <ArrowUpRight size={16} className="ml-2"/>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Full Screen Bio Modal - True Full Page */}
      <AnimatePresence>
      {isBioOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-[100] flex flex-col ${
            systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'
          }`}
        >

              {/* Full-Page Header */}
              <div className={`sticky top-0 z-20 flex items-center py-4 px-6 md:px-12 border-b ${
                systemTheme === 'dark'
                  ? 'border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md'
                  : 'border-gray-200 bg-[#F5F5F7]/95 backdrop-blur-md'
              }`}>
                 {/* Title - Left */}
                 <div className="flex-1">
                   <h2 className={`text-xl md:text-2xl font-bold ${
                     systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                   }`}>{content.bio.modal_title}</h2>
                 </div>

                 {/* Toggle - Center */}
                 <div className={`relative flex items-center rounded-full p-1 ${
                   systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                 }`}>
                   <motion.div
                     className="absolute bg-blue-600 rounded-full shadow-md"
                     initial={false}
                     animate={{
                       x: bioViewMode === 'text' ? 0 : '100%',
                       width: bioViewMode === 'text' ? '50%' : '50%'
                     }}
                     transition={{
                       type: 'spring',
                       stiffness: 500,
                       damping: 35,
                       mass: 0.8
                     }}
                     style={{
                       height: 'calc(100% - 8px)',
                       top: '4px',
                       left: '4px',
                       right: '4px'
                     }}
                   />
                   <button
                     onClick={() => {
                      setBioViewMode('text');
                      bioContentRef.current?.scrollTo({ top: 0 });
                    }}
                     className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                       bioViewMode === 'text'
                         ? 'text-white'
                         : systemTheme === 'dark'
                           ? 'text-gray-400 hover:text-white'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                     style={{ width: '50%' }}
                   >
                     {lang === 'fr' ? 'Texte' : 'Text'}
                   </button>
                   <button
                     onClick={() => {
                      setBioViewMode('timeline');
                      bioContentRef.current?.scrollTo({ top: 0 });
                    }}
                     className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                       bioViewMode === 'timeline'
                         ? 'text-white'
                         : systemTheme === 'dark'
                           ? 'text-gray-400 hover:text-white'
                           : 'text-gray-600 hover:text-gray-900'
                     }`}
                     style={{ width: '50%' }}
                   >
                     Timeline
                   </button>
                 </div>

                 {/* Close Button - Right */}
                 <div className="flex-1 flex justify-end">
                   <button
                     onClick={() => setIsBioOpen(false)}
                     className={`p-2 rounded-full transition-colors ${
                       systemTheme === 'dark'
                         ? 'bg-white/10 hover:bg-white/20 text-white'
                         : 'bg-gray-100 hover:bg-gray-200'
                     }`}
                   >
                      <X size={24} />
                   </button>
                 </div>
              </div>

              {/* Modal Content - Full Page Scrollable */}
              <div
                ref={bioContentRef}
                className={`flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-12 ${
                systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'
              }`}>
                 <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                    {/* TEXT VIEW */}
                    {bioViewMode === 'text' && (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                          mass: 0.8
                        }}
                        className="space-y-8"
                      >
                        {/* Personal Story */}
                        <div className={`p-8 md:p-10 rounded-3xl border shadow-sm ${
                          systemTheme === 'dark'
                            ? 'bg-[#1D1D1F] border-white/10'
                            : 'bg-white border-gray-100'
                        }`}>
                           <h3 className={`text-2xl font-bold mb-6 ${
                             systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                           }`}>{content.bio.journey_title}</h3>
                           <div className={`prose max-w-none space-y-6 leading-relaxed ${
                             systemTheme === 'dark' ? 'text-gray-300 prose-invert' : 'text-gray-700 prose-gray'
                           }`}>
                              <p className="text-lg" dangerouslySetInnerHTML={{ __html: content.bio.journey_p1 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p2 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p3 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p4 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p5 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p6 }} />
                              <ul className="list-disc pl-6 space-y-2">
                                 {content.bio.journey_bullets.map((bullet, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                                 ))}
                              </ul>
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p7 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p8 }} />
                              <p dangerouslySetInnerHTML={{ __html: content.bio.journey_p9 }} />
                              <p className={`text-lg font-semibold pt-4 ${
                                systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`} dangerouslySetInnerHTML={{ __html: content.bio.journey_conclusion }} />
                           </div>
                        </div>

                        {/* Tools & Stack */}
                        <div className={`p-8 rounded-3xl border shadow-sm ${
                          systemTheme === 'dark'
                            ? 'bg-[#1D1D1F] border-white/10'
                            : 'bg-white border-gray-100'
                        }`}>
                           <h3 className={`text-xl font-bold mb-6 ${
                             systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                           }`}>{content.bio.tools_title}</h3>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {['Figma', 'Bolt', 'Lovable', 'ZeroHeight', 'Notion', 'Loom', 'Claude', 'Perplexity', 'Midjourney', 'ChatGPT', 'Protopie', 'Adobe CC'].map(tool => (
                                <span key={tool} className={`px-4 py-2.5 rounded-xl text-sm font-medium border text-center transition-colors ${
                                  systemTheme === 'dark'
                                    ? 'bg-white/5 text-gray-300 border-white/10 hover:border-blue-500/50 hover:bg-blue-900/20'
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}>
                                  {tool}
                                </span>
                              ))}
                           </div>
                        </div>

                        {/* Education */}
                        <div className={`p-8 rounded-3xl border shadow-sm ${
                          systemTheme === 'dark'
                            ? 'bg-[#1D1D1F] border-white/10'
                            : 'bg-white border-gray-100'
                        }`}>
                           <h3 className={`text-xl font-bold mb-6 ${
                             systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                           }`}>{content.bio.education_title}</h3>
                           <div className="space-y-4">
                              <div className="flex items-start">
                                 <GraduationCap size={20} className="mr-3 mt-1 text-blue-600 flex-shrink-0" />
                                 <div>
                                    <h4 className={`font-bold ${
                                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>{content.bio.education_master_title}</h4>
                                    <p className={`text-sm ${
                                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>{content.bio.education_master_school}</p>
                                 </div>
                              </div>
                              <div className="flex items-start">
                                 <BookOpen size={20} className="mr-3 mt-1 text-blue-600 flex-shrink-0" />
                                 <div>
                                    <h4 className={`font-bold ${
                                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>{content.bio.education_ux_title}</h4>
                                    <p className={`text-sm ${
                                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>{content.bio.education_ux_school}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Resource Toolkit - Integrated into Biography */}
                        <div className={`p-8 rounded-3xl border shadow-sm ${
                          systemTheme === 'dark'
                            ? 'bg-[#1D1D1F] border-white/10'
                            : 'bg-white border-gray-100'
                        }`}>
                           <div className={`flex items-center mb-6 ${
                             systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                           }`}>
                             <BookOpen size={24} className="mr-3 text-blue-600"/>
                             <h3 className="text-xl font-bold">{content.bio.toolkit_title}</h3>
                           </div>
                           <p className={`text-sm mb-6 ${
                             systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                           }`}>
                             {content.bio.toolkit_desc}
                           </p>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {resources.map((res, idx) => (
                                 <a
                                   key={idx}
                                   href={res.link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={`flex items-center p-4 rounded-xl transition-colors group cursor-pointer border ${
                                     systemTheme === 'dark'
                                       ? 'bg-white/5 hover:bg-blue-900/30 text-gray-300 hover:text-blue-400 border-white/5 hover:border-blue-500/30'
                                       : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border-transparent hover:border-blue-100'
                                   }`}
                                 >
                                    <div className={`mr-4 p-2.5 rounded-lg border shadow-sm ${
                                      systemTheme === 'dark'
                                        ? 'bg-white/10 border-white/10 group-hover:border-blue-500/30'
                                        : 'bg-white border-gray-100 group-hover:border-blue-100'
                                    }`}>
                                      {res.icon}
                                    </div>
                                    <div className="flex-1">
                                       <div className="text-sm font-semibold">{res.title}</div>
                                       <div className={`text-xs ${
                                         systemTheme === 'dark'
                                           ? 'text-gray-500 group-hover:text-blue-400'
                                           : 'text-gray-400 group-hover:text-blue-400'
                                       }`}>{res.desc}</div>
                                    </div>
                                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"/>
                                 </a>
                              ))}
                           </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TIMELINE VIEW */}
                    {bioViewMode === 'timeline' && (
                      <motion.div
                        key="timeline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                          mass: 0.8
                        }}
                        className={`p-8 md:p-10 rounded-3xl border shadow-sm ${
                          systemTheme === 'dark'
                            ? 'bg-[#1D1D1F] border-white/10'
                            : 'bg-white border-gray-100'
                        }`}
                      >
                        <h3 className={`text-2xl font-bold mb-8 ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{content.bio.timeline_title}</h3>
                        <div className="space-y-12">
                          {['2026', '2025', '2024', '2023', '2022', '2020-2021', '2018-2019', '2017-2018', '2016-2017', '2014-2016', '2010-2014', '2005-2010']
                            .filter(year => (content.bio.timeline as any)[year])
                            .map((year, idx) => {
                            const items = (content.bio.timeline as any)[year] as string[];
                            const colors = [
                              { border: systemTheme === 'dark' ? 'border-blue-500/30' : 'border-blue-200', dot: 'bg-blue-500', text: 'text-blue-500' },
                              { border: systemTheme === 'dark' ? 'border-indigo-500/30' : 'border-indigo-200', dot: 'bg-indigo-500', text: 'text-indigo-500' },
                              { border: systemTheme === 'dark' ? 'border-purple-500/30' : 'border-purple-200', dot: 'bg-purple-500', text: 'text-purple-500' },
                              { border: systemTheme === 'dark' ? 'border-pink-500/30' : 'border-pink-200', dot: 'bg-pink-500', text: 'text-pink-500' },
                              { border: systemTheme === 'dark' ? 'border-orange-500/30' : 'border-orange-200', dot: 'bg-orange-500', text: 'text-orange-500' },
                              { border: systemTheme === 'dark' ? 'border-teal-500/30' : 'border-teal-200', dot: 'bg-teal-500', text: 'text-teal-500' },
                              { border: systemTheme === 'dark' ? 'border-cyan-500/30' : 'border-cyan-200', dot: 'bg-cyan-500', text: 'text-cyan-500' },
                              { border: systemTheme === 'dark' ? 'border-emerald-500/30' : 'border-emerald-200', dot: 'bg-emerald-500', text: 'text-emerald-500' },
                              { border: systemTheme === 'dark' ? 'border-amber-500/30' : 'border-amber-200', dot: 'bg-amber-500', text: 'text-amber-500' },
                              { border: systemTheme === 'dark' ? 'border-slate-500/30' : 'border-slate-200', dot: 'bg-slate-500', text: 'text-slate-500' },
                              { border: systemTheme === 'dark' ? 'border-gray-500/30' : 'border-gray-300', dot: 'bg-gray-500', text: 'text-gray-500' },
                            ];
                            const colorSet = colors[idx % colors.length];
                            const totalYears = ['2026', '2025', '2024', '2023', '2022', '2020-2021', '2018-2019', '2017-2018', '2016-2017', '2014-2016', '2010-2014', '2005-2010'].filter(y => (content.bio.timeline as any)[y]).length;
                            return (
                              <div key={year} className={`relative pl-8 ${idx < totalYears - 1 ? `border-l-2 ${colorSet.border}` : ''}`}>
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 ${colorSet.dot} rounded-full`}></div>
                                <div className={`text-2xl font-bold ${colorSet.text} mb-4`}>{year}</div>
                                <ul className={`space-y-3 ${
                                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                      <span className={`mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                        systemTheme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                                      }`} />
                                      <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>

                 </div>
              </div>

        </motion.div>
      )}
      </AnimatePresence>

      {/* Full Screen Testimonials Modal */}
      <AnimatePresence>
      {isTestimonialsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             className={`absolute inset-0 backdrop-blur-xl ${
               systemTheme === 'dark' ? 'bg-black/95' : 'bg-white/95'
             }`}
             onClick={() => setIsTestimonialsOpen(false)}
           />
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{
               type: 'spring',
               stiffness: 300,
               damping: 25,
               mass: 0.5
             }}
             className={`relative w-full max-w-7xl h-full flex flex-col rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border ${
               systemTheme === 'dark'
                 ? 'bg-[#1D1D1F]/90 border-white/10'
                 : 'bg-white/50 border-gray-200/50'
             }`}
           >

              {/* Modal Header */}
              <div className={`flex flex-col md:flex-row justify-between items-center py-6 px-8 border-b backdrop-blur-md z-10 ${
                systemTheme === 'dark'
                  ? 'border-white/10 bg-[#1D1D1F]/80'
                  : 'border-gray-200/50 bg-white/80'
              }`}>
                 <div className="mb-4 md:mb-0 text-center md:text-left">
                   <h2 className={`text-2xl font-bold ${
                     systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                   }`}>{content.testimonials.modal_title}</h2>
                   <p className={`text-sm ${
                     systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                   }`}>{testimonials.length} {content.testimonials.modal_sub}</p>
                 </div>

                 {/* Filters */}
                 <div className={`flex space-x-2 p-1 rounded-full overflow-x-auto max-w-full no-scrollbar ${
                   systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                 }`}>
                    {(['All', 'Management', 'Design', 'Product & Tech', 'Clients'] as Category[]).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                          px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap
                          ${activeCategory === cat
                            ? systemTheme === 'dark'
                              ? 'bg-white/20 text-white shadow-sm'
                              : 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                            : systemTheme === 'dark'
                              ? 'text-gray-400 hover:text-white hover:bg-white/10'
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}
                        `}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>

                 <button
                   onClick={() => setIsTestimonialsOpen(false)}
                   className={`hidden md:flex p-2 rounded-full transition-colors ml-6 ${
                     systemTheme === 'dark'
                       ? 'bg-white/10 hover:bg-white/20 text-white'
                       : 'bg-gray-100 hover:bg-gray-200'
                   }`}
                 >
                    <X size={24} />
                 </button>
              </div>

              {/* Modal Content */}
              <div className={`overflow-y-auto p-6 md:p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${
                systemTheme === 'dark' ? 'bg-[#111111]/50' : 'bg-[#F5F5F7]/50'
              }`}>
                 {filteredTestimonials.map((t, i) => (
                    <div key={i} className={`p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all h-fit break-inside-avoid flex flex-col ${
                      systemTheme === 'dark'
                        ? 'bg-[#1D1D1F] border-white/10'
                        : 'bg-white border-gray-100'
                    }`}>
                       <div className="flex items-center mb-6">
                          <Avatar filename={t.image} alt={t.author} className={`w-14 h-14 rounded-full mr-4 border-2 shadow-sm ${
                            systemTheme === 'dark' ? 'border-white/20' : 'border-white'
                          }`} />
                          <div>
                             {t.linkedin ? (
                               <a
                                 href={t.linkedin}
                                 target="_blank"
                                 rel="noreferrer"
                                 className={`font-bold leading-none hover:text-[#0077b5] transition-colors flex items-center group text-lg ${
                                   systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                                 }`}
                               >
                                 {t.author}
                                 <Linkedin size={16} className="ml-2 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                               </a>
                             ) : (
                               <div className={`font-bold leading-none text-lg ${
                                 systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                               }`}>{t.author}</div>
                             )}
                             <div className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit mt-1 ${
                               systemTheme === 'dark'
                                 ? 'text-blue-400 bg-blue-500/20'
                                 : 'text-blue-600 bg-blue-50'
                             }`}>{t.role}</div>
                          </div>
                       </div>

                       <div className="relative mb-6">
                          <Quote size={24} className={`absolute -top-4 -left-2 transform -scale-x-100 ${
                            systemTheme === 'dark' ? 'text-white/10' : 'text-gray-100'
                          }`} />
                          <p className={`leading-relaxed text-[15px] relative z-10 pt-2 ${
                            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            "{t.content}"
                          </p>
                       </div>

                       <div className={`border-t pt-4 mt-auto flex justify-between items-center ${
                         systemTheme === 'dark' ? 'border-white/10' : 'border-gray-50'
                       }`}>
                          <span className={`text-xs font-medium ${
                            systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`}>{t.date}</span>
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                            systemTheme === 'dark'
                              ? 'text-gray-400 bg-white/5'
                              : 'text-gray-400 bg-gray-50'
                          }`}>{t.category}</span>
                       </div>
                    </div>
                 ))}

                 {filteredTestimonials.length === 0 && (
                   <div className="col-span-full text-center py-20 text-gray-400">
                     {content.testimonials.empty}
                   </div>
                 )}
              </div>

              {/* Mobile Close Button */}
              <div className="md:hidden absolute bottom-6 left-0 w-full flex justify-center pointer-events-none">
                 <button
                   onClick={() => setIsTestimonialsOpen(false)}
                   className={`pointer-events-auto px-5 py-2.5 rounded-full shadow-xl flex items-center font-medium text-sm ${
                     systemTheme === 'dark'
                       ? 'bg-white text-black'
                       : 'bg-black text-white'
                   }`}
                 >
                    <X size={16} className="mr-2"/> {content.testimonials.close}
                 </button>
              </div>
           </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             onClick={() => setIsBookingOpen(false)}
             className={`absolute inset-0 ${
               systemTheme === 'dark'
                 ? 'bg-black/80 backdrop-blur-xl'
                 : 'bg-white/95 backdrop-blur-xl'
             }`}
           />

           {/* Modal content - same width as other modals */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
             className={`relative w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden ${
               systemTheme === 'dark'
                 ? 'bg-[#1D1D1F] border border-gray-800'
                 : 'bg-white border border-gray-200'
             }`}
             onClick={(e) => e.stopPropagation()}
           >
              {/* Close button */}
              <div className="absolute top-6 right-6 z-20">
                 <button
                   onClick={() => setIsBookingOpen(false)}
                   className={`p-2.5 rounded-full transition-all duration-200 backdrop-blur-sm ${
                     systemTheme === 'dark'
                       ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                       : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
                   }`}
                   aria-label="Close booking modal"
                 >
                    <X size={24} />
                 </button>
              </div>

              {/* Cal.com iframe - constrained */}
              <div className="w-full h-full">
                <iframe
                  src={`https://cal.com/victorsoussan/consulting-chat?user=victorsoussan&overlayCalendar=true&month=2025-12&theme=${systemTheme}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Book a consultation with Victor"
                  className="w-full h-full rounded-3xl"
                ></iframe>
              </div>
           </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Simple Contact Form Modal */}
      <AnimatePresence>
      {isSimpleContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             className={`absolute inset-0 ${
               systemTheme === 'dark'
                 ? 'bg-black/80 backdrop-blur-xl'
                 : 'bg-white/95 backdrop-blur-xl'
             }`}
             onClick={() => setIsSimpleContactOpen(false)}
           />
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{
               type: 'spring',
               stiffness: 300,
               damping: 25,
               mass: 0.5
             }}
             className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
               systemTheme === 'dark'
                 ? 'bg-[#1D1D1F] border border-gray-800'
                 : 'bg-white border border-gray-200'
             }`}
           >
              <div className={`sticky top-0 backdrop-blur-xl border-b p-6 z-10 ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F]/95 border-gray-800'
                  : 'bg-white/95 border-gray-100'
              }`}>
                <button
                  onClick={() => setIsSimpleContactOpen(false)}
                  className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
                    systemTheme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <X size={20} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src="/images/victor-soussan.png"
                        alt="Victor Soussan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="%236b7280">VS</text></svg>';
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {content.contact.simple_form_title}
                    </h2>
                    <p className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {content.contact.simple_form_subtitle}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="p-8">
              {/* Email Copy Option - Before Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
                  systemTheme === 'dark'
                    ? 'bg-gray-800/50 border border-gray-700'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {content.contact.simple_form_copy_intro}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('victorsoussan@gmail.com').then(() => {
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    });
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    systemTheme === 'dark'
                      ? 'bg-gray-700 border border-gray-600 hover:bg-gray-600 text-gray-200'
                      : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span className="text-green-600">{content.contact.simple_form_copy_email}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>{content.contact.simple_form_copy_email}</span>
                    </>
                  )}
                </button>
              </motion.div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSendingEmail(true);

                  try {
                    // Check if EmailJS is configured
                    const isEmailJSConfigured = EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID'
                      && EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
                      && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

                    if (isEmailJSConfigured) {
                      // Send email using EmailJS
                      await emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID,
                        {
                          from_name: simpleContactForm.name,
                          from_email: simpleContactForm.email,
                          message: simpleContactForm.message,
                          budget: simpleContactForm.budget || 'Not specified',
                          start_date: simpleContactForm.startDate || 'Not specified',
                          end_date: simpleContactForm.endDate || 'Not specified',
                          to_email: 'victorsoussan@gmail.com'
                        },
                        EMAILJS_CONFIG.PUBLIC_KEY
                      );

                      // Success
                      setToastMessage('Message sent successfully! I\'ll get back to you soon.');
                      setShowToast(true);
                      setIsSimpleContactOpen(false);
                      setSimpleContactForm({ name: '', email: '', message: '', budget: '', startDate: '', endDate: '' });

                      // Hide toast after 5 seconds
                      setTimeout(() => setShowToast(false), 5000);
                    } else {
                      // Fallback to mailto if EmailJS is not configured
                      const subject = `New Message from ${simpleContactForm.name}`;
                      const body = `Name: ${simpleContactForm.name}
Email: ${simpleContactForm.email}
Budget: ${simpleContactForm.budget || 'Not specified'}
Start Date: ${simpleContactForm.startDate || 'Not specified'}
End Date: ${simpleContactForm.endDate || 'Not specified'}

Message:
${simpleContactForm.message}`;

                      window.location.href = `mailto:victorsoussan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                      setToastMessage('Opening your email client...');
                      setShowToast(true);
                      setIsSimpleContactOpen(false);
                      setSimpleContactForm({ name: '', email: '', message: '', budget: '', startDate: '', endDate: '' });

                      setTimeout(() => setShowToast(false), 3000);
                    }
                  } catch (error) {
                    console.error('Failed to send email:', error);
                    setToastMessage('Failed to send message. Please try again or email me directly at victorsoussan@gmail.com');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 5000);
                  } finally {
                    setIsSendingEmail(false);
                  }
                }}
                className="space-y-6"
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.contact.simple_form_name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={simpleContactForm.name}
                    onChange={(e) => setSimpleContactForm({ ...simpleContactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder={content.contact.simple_form_name_placeholder}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.contact.simple_form_email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={simpleContactForm.email}
                    onChange={(e) => setSimpleContactForm({ ...simpleContactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder={content.contact.simple_form_email_placeholder}
                  />
                </motion.div>

                {/* Date Fields */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.contact.simple_form_start_date}
                    </label>
                    <input
                      type="date"
                      value={simpleContactForm.startDate}
                      onChange={(e) => setSimpleContactForm({ ...simpleContactForm, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.contact.simple_form_end_date}
                    </label>
                    <input
                      type="date"
                      value={simpleContactForm.endDate}
                      onChange={(e) => setSimpleContactForm({ ...simpleContactForm, endDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.contact.simple_form_message} *
                  </label>
                  <textarea
                    required
                    value={simpleContactForm.message}
                    onChange={(e) => setSimpleContactForm({ ...simpleContactForm, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                    placeholder={content.contact.simple_form_message_placeholder}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                >
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-2.5 accent-blue text-white rounded-full font-medium text-sm btn-pill transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingEmail ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>{content.contact.simple_form_sending}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{content.contact.simple_form_submit}</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
              </div>
           </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
      {isContactFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             className="absolute inset-0 bg-white/95 backdrop-blur-xl"
             onClick={() => setIsContactFormOpen(false)}
           />
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{
               type: 'spring',
               stiffness: 300,
               damping: 25,
               mass: 0.5
             }}
             className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-200"
           >
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 z-10">
                <button
                  onClick={() => setIsContactFormOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src="/images/victor-soussan.png"
                        alt="Victor Soussan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="%236b7280">VS</text></svg>';
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">Let's Work Together</h2>
                    <p className="text-sm text-gray-600">I typically respond within 24 hours</p>
                  </div>
                </motion.div>
              </div>

              <div className="p-8">

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSendingEmail(true);

                  try {
                    // Check if EmailJS is configured
                    const isEmailJSConfigured = EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID'
                      && EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
                      && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

                    if (isEmailJSConfigured) {
                      // Send email using EmailJS
                      await emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID,
                        {
                          from_name: contactForm.name,
                          from_email: contactForm.email,
                          company: contactForm.company || 'N/A',
                          project_type: contactForm.projectType,
                          selected_services: contactForm.selectedServices.join(', ') || 'None selected',
                          duration: contactForm.duration || 'Not specified',
                          budget: contactForm.budget || 'Not specified',
                          message: contactForm.message,
                          to_email: 'victorsoussan@gmail.com'
                        },
                        EMAILJS_CONFIG.PUBLIC_KEY
                      );

                      // Success
                      setToastMessage('Message sent successfully! I\'ll get back to you soon.');
                      setShowToast(true);
                      setIsContactFormOpen(false);
                      setContactForm({ name: '', company: '', email: '', message: '', duration: '', budget: '', projectType: '', selectedServices: [] });

                      // Hide toast after 5 seconds
                      setTimeout(() => setShowToast(false), 5000);
                    } else {
                      // Fallback to mailto if EmailJS is not configured
                      const projectTypeLabels = {
                        'startup': 'Startup / MVP',
                        'established': 'Established Company',
                        'long-term': 'Long-term Partnership'
                      };

                      const subject = `New Project Inquiry from ${contactForm.name}`;
                      const body = `Name: ${contactForm.name}
Company: ${contactForm.company || 'N/A'}
Email: ${contactForm.email}
Project Type: ${projectTypeLabels[contactForm.projectType as keyof typeof projectTypeLabels] || contactForm.projectType}
Selected Services: ${contactForm.selectedServices.join(', ') || 'None selected'}

Message:
${contactForm.message}`;

                      window.location.href = `mailto:victorsoussan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                      setToastMessage('Opening your email client...');
                      setShowToast(true);
                      setIsContactFormOpen(false);
                      setContactForm({ name: '', company: '', email: '', message: '', duration: '', budget: '', projectType: '', selectedServices: [] });

                      setTimeout(() => setShowToast(false), 3000);
                    }
                  } catch (error) {
                    console.error('Failed to send email:', error);
                    setToastMessage('Failed to send message. Please try again or email me directly at victorsoussan@gmail.com');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 5000);
                  } finally {
                    setIsSendingEmail(false);
                  }
                }}
                className="space-y-6"
              >
                {/* Project Type Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What best describes your situation? *
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { id: 'startup', IconComponent: Rocket, label: 'Startup / MVP', desc: 'Early stage product' },
                      { id: 'established', IconComponent: Buildings, label: 'Established Company', desc: 'Optimize & scale' },
                      { id: 'long-term', IconComponent: HandHeart, label: 'Long-term Partnership', desc: '6+ months engagement' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setContactForm({ ...contactForm, projectType: type.id as any, selectedServices: [] })}
                        className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                          contactForm.projectType === type.id
                            ? 'border-gray-900 bg-gray-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="mb-2">
                          <type.IconComponent size={32} weight="duotone" className="text-gray-900" />
                        </div>
                        <div className="font-medium text-gray-900 text-sm mb-1">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.desc}</div>
                        {contactForm.projectType === type.id && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle2 size={18} className="text-gray-900" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Service Selection - Dynamic based on project type */}
                {contactForm.projectType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What services are you interested in? (Select all that apply)
                    </label>

                    {/* Startup Services */}
                    {contactForm.projectType === 'startup' && (
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { id: 'mvp-kit', label: 'Starter Kit Produit', price: '6-8k €', desc: 'Proto, wireframes, UI kit' },
                          { id: 'mvp-full', label: 'MVP Build Complete', price: '14-40k €', desc: '1-3 months, full product' },
                          { id: 'branding', label: 'Initial Branding', price: 'Custom', desc: 'Logo, colors, identity' },
                          { id: 'design-system', label: 'UI Kit & Design System', price: '8-15k €', desc: 'Components, guidelines' },
                          { id: 'fractional-lead', label: 'Fractional Design Lead', price: '2.8k €/mo', desc: '2 days/week + team setup' }
                        ].map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              const isSelected = contactForm.selectedServices.includes(service.id);
                              setContactForm({
                                ...contactForm,
                                selectedServices: isSelected
                                  ? contactForm.selectedServices.filter(s => s !== service.id)
                                  : [...contactForm.selectedServices, service.id]
                              });
                            }}
                            className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                              contactForm.selectedServices.includes(service.id)
                                ? 'border-gray-900 bg-gray-50 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-medium text-sm text-gray-900">{service.label}</div>
                              {contactForm.selectedServices.includes(service.id) && (
                                <CheckCircle2 size={16} className="text-gray-900 flex-shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">{service.desc}</div>
                            <div className="text-xs font-medium text-gray-900">{service.price}</div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Established Company Services */}
                    {contactForm.projectType === 'established' && (
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { id: 'conversion-opt', label: 'Conversion Optimization', price: '450-700 €/j', desc: 'Onboarding, checkout flows' },
                          { id: 'fractional-lead', label: 'Fractional Design Lead', price: '2.8k €/mo', desc: 'Strategic guidance, 2d/week' },
                          { id: 'design-system-adv', label: 'Design System Creation/Audit', price: '15-30k €', desc: 'Enterprise-grade system' },
                          { id: 'product-strategy', label: 'Product Strategy Workshop', price: '3-5k €', desc: 'Vision, roadmap alignment' },
                          { id: 'ux-audit', label: 'UX Audit & Recommendations', price: '450-700 €/j', desc: 'Full product analysis' }
                        ].map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              const isSelected = contactForm.selectedServices.includes(service.id);
                              setContactForm({
                                ...contactForm,
                                selectedServices: isSelected
                                  ? contactForm.selectedServices.filter(s => s !== service.id)
                                  : [...contactForm.selectedServices, service.id]
                              });
                            }}
                            className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                              contactForm.selectedServices.includes(service.id)
                                ? 'border-gray-900 bg-gray-50 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-medium text-sm text-gray-900">{service.label}</div>
                              {contactForm.selectedServices.includes(service.id) && (
                                <CheckCircle2 size={16} className="text-gray-900 flex-shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">{service.desc}</div>
                            <div className="text-xs font-medium text-gray-900">{service.price}</div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Long-term Partnership */}
                    {contactForm.projectType === 'long-term' && (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                        <div className="flex items-start space-x-3 mb-4">
                          <HandHeart size={40} weight="duotone" className="text-gray-900 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Long-term Product Design Partnership</h3>
                            <p className="text-sm text-gray-600">For missions of 6+ months, I offer hands-on product design and/or leadership:</p>
                          </div>
                        </div>

                        {/* Two columns: Hands-on Design & Leadership */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {/* Hands-on Product Design */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Hands-on Product Design</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>User research & testing</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>UX/UI design (Figma)</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Design system creation</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Prototypes & user flows</span>
                              </li>
                            </ul>
                          </div>

                          {/* Design Leadership */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Design Leadership</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Product strategy & vision</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Team recruitment & mentorship</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Process & workflow setup</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Stakeholder alignment</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Pricing</div>
                          <div className="text-sm font-semibold text-gray-900">Custom pricing based on engagement level (part-time or full-time)</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Contact Details - Only show if project type selected */}
                {contactForm.projectType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Name & Company */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all"
                          placeholder="Acme Inc."
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell me about your project *
                      </label>
                      <textarea
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all resize-none"
                        placeholder="Share your vision, challenges, timeline, or any specific questions..."
                      />
                    </div>

                    {/* Helper text based on selection */}
                    {contactForm.selectedServices.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start space-x-2">
                          <Lightbulb size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-900">
                            <span className="font-medium">Selected services:</span> {contactForm.selectedServices.join(', ')}. I'll prepare a detailed proposal based on your needs.
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Submit Button - Only show if project type selected */}
                {contactForm.projectType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100"
                  >
                    <button
                      type="button"
                      onClick={() => setIsContactFormOpen(false)}
                      className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSendingEmail}
                      className="px-8 py-3 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white rounded-full font-medium transition-all duration-200 shadow-lg shadow-gray-900/20 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingEmail ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </form>
              </div>
           </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Lab Modal */}
      <AnimatePresence>
      {selectedLabItem && LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS] && (() => {
        const item = LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS];
        const colorClasses = {
          blue: {
            badge: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
            bullet: 'bg-blue-500',
            button: 'bg-blue-600 hover:bg-blue-700'
          },
          amber: {
            badge: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
            bullet: 'bg-amber-500',
            button: 'bg-amber-600 hover:bg-amber-700'
          },
          purple: {
            badge: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
            bullet: 'bg-purple-500',
            button: 'bg-purple-600 hover:bg-purple-700'
          },
          pink: {
            badge: 'bg-pink-500/20 border-pink-500/30 text-pink-300',
            bullet: 'bg-pink-500',
            button: 'bg-pink-600 hover:bg-pink-700'
          }
        };
        const colors = colorClasses[item.color as keyof typeof colorClasses];

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
               onClick={() => setSelectedLabItem(null)}
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{
                 type: 'spring',
                 stiffness: 300,
                 damping: 25,
                 mass: 0.5
               }}
               className="relative w-full max-w-5xl bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
             >
                {/* Close button */}
                <button
                  onClick={() => setSelectedLabItem(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                >
                   <X size={24} className="text-white" />
                </button>

                <div className="p-8 md:p-12">
                   {/* Header */}
                   <div className="mb-8">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium mb-4 ${colors.badge}`}>
                         {item.subtitle}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                         {item.title}
                      </h2>
                   </div>

                   {/* Highlights */}
                   <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-300 mb-4">Highlights</h3>
                      <ul className="space-y-2">
                         {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-gray-400">
                               <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 ${colors.bullet}`} />
                               <span>{highlight}</span>
                            </li>
                         ))}
                      </ul>
                   </div>

                   {/* Preview Grid */}
                   <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-300 mb-4">Preview</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                         {item.previews.map((previewItem, idx) => (
                            <div
                               key={idx}
                               className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                               style={{ animationDelay: `${idx * 50}ms` }}
                            >
                               <div className="text-sm text-gray-300 font-medium text-center">
                                  {previewItem}
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   {/* CTA */}
                   <div className="flex justify-center pt-4">
                      <a
                         href={item.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className={`px-8 py-4 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center ${colors.button}`}
                      >
                         Explore Full {item.title.split(' ')[1]} <ExternalLink size={20} className="ml-2" />
                      </a>
                   </div>
                </div>
             </motion.div>
          </div>
        );
      })()}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
      {isResumeOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsResumeOpen(false)}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm no-print"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.5
            }}
            className="relative w-full max-w-5xl my-8 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/50">
              {/* Header with Actions - Hide on print */}
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-5 no-print">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                      Résumé
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">Product Design Lead</p>
                  </div>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {/* Language Toggle */}
                  <div className="relative flex items-center bg-gray-100 rounded-lg p-1">
                    <motion.div
                      className="absolute bg-gray-900 rounded-md"
                      initial={false}
                      animate={{
                        x: resumeLang === 'fr' ? 0 : '100%',
                        width: '50%'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8
                      }}
                      style={{
                        height: 'calc(100% - 4px)',
                        top: '2px',
                        left: '2px'
                      }}
                    />
                    <button
                      onClick={() => setResumeLang('fr')}
                      className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        resumeLang === 'fr' ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => setResumeLang('en')}
                      className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        resumeLang === 'en' ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      EN
                    </button>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={handleDownloadResume}
                    className="px-4 py-1.5 accent-blue text-white rounded-full text-xs font-medium btn-pill flex items-center gap-1.5"
                  >
                    <Download size={14} />
                    {TRANSLATIONS[resumeLang].resume.download_btn}
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyResume}
                    className="px-4 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-1.5"
                  >
                    <Copy size={14} />
                    {copiedResume ? TRANSLATIONS[resumeLang].resume.copied_message : TRANSLATIONS[resumeLang].resume.copy_btn}
                  </button>
                </div>
              </div>

              {/* Resume Content - Printable */}
              <div id="resume-print-content" className="px-12 py-10 max-h-[calc(100vh-200px)] overflow-y-auto bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={resumeLang}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="mb-10">
                      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">
                        {TRANSLATIONS[resumeLang].resume.title}
                      </h1>

                      {/* Contact Info with Copy Buttons */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {/* Email */}
                        <button
                          onClick={handleCopyEmail}
                          className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                        >
                          <Envelope size={14} weight="bold" />
                          {copiedEmail ? (
                            <span className="text-green-600">{resumeLang === 'fr' ? 'Copié !' : 'Copied!'}</span>
                          ) : (
                            <>
                              victorsoussan@gmail.com
                              <Copy size={10} className="opacity-50" />
                            </>
                          )}
                        </button>

                        {/* Phone */}
                        <button
                          onClick={handleCopyPhone}
                          className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                        >
                          <Phone size={14} weight="bold" />
                          {copiedPhone ? (
                            <span className="text-green-600">{resumeLang === 'fr' ? 'Copié !' : 'Copied!'}</span>
                          ) : (
                            <>
                              +33 6 15 98 94 00
                              <Copy size={10} className="opacity-50" />
                            </>
                          )}
                        </button>

                        {/* LinkedIn */}
                        <button
                          onClick={handleCopyLinkedin}
                          className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                        >
                          <LinkedinLogo size={14} weight="bold" />
                          {copiedLinkedin ? (
                            <span className="text-green-600">{resumeLang === 'fr' ? 'Copié !' : 'Copied!'}</span>
                          ) : (
                            <>
                              LinkedIn
                              <Copy size={10} className="opacity-50" />
                            </>
                          )}
                        </button>

                        {/* Portfolio */}
                        <button
                          onClick={handleCopyPortfolio}
                          className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                        >
                          <Globe size={14} weight="bold" />
                          {copiedPortfolio ? (
                            <span className="text-green-600">{resumeLang === 'fr' ? 'Copié !' : 'Copied!'}</span>
                          ) : (
                            <>
                              Portfolio
                              <Copy size={10} className="opacity-50" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Professional Summary */}
                    <section className="mb-10">
                      <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                        {TRANSLATIONS[resumeLang].resume.summary_title}
                      </h2>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {TRANSLATIONS[resumeLang].resume.summary}
                      </p>
                    </section>

                    {/* Professional Experience */}
                    <section className="mb-10">
                      <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                        {TRANSLATIONS[resumeLang].resume.experience_title}
                      </h2>
                      <div className="space-y-6">
                        {TRANSLATIONS[resumeLang].resume.experience.map((exp, idx) => (
                          <div key={idx} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:w-1.5 before:h-1.5 before:bg-gray-400 before:rounded-full">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                                <p className="text-xs text-gray-600 mt-0.5">{exp.company}</p>
                              </div>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-4 font-medium">{exp.period}</span>
                            </div>
                            <ul className="space-y-1.5 mt-2">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="text-xs text-gray-700 leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                                  {ach}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Skills */}
                    <section className="mb-10">
                      <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                        {TRANSLATIONS[resumeLang].resume.skills_title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {TRANSLATIONS[resumeLang].resume.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Tools */}
                    <section className="mb-10">
                      <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                        {TRANSLATIONS[resumeLang].resume.tools_title}
                      </h2>
                      <p className="text-xs text-gray-700 leading-relaxed">{TRANSLATIONS[resumeLang].resume.tools}</p>
                    </section>

                    {/* Education */}
                    <section className="mb-10">
                      <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                        {TRANSLATIONS[resumeLang].resume.education_title}
                      </h2>
                      <ul className="space-y-2">
                        {TRANSLATIONS[resumeLang].resume.education.map((edu, idx) => (
                          <li key={idx} className="text-xs text-gray-700 pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Languages */}
                    <section>
                      <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                        {TRANSLATIONS[resumeLang].resume.languages_title}
                      </h2>
                      <p className="text-xs text-gray-700">{TRANSLATIONS[resumeLang].resume.languages}</p>
                    </section>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 px-4 md:px-6 bg-[#1D1D1F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-5 md:mb-8">{content.contact.title}</h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto">
            {content.contact.subtitle}
          </p>

          {/* CTA Buttons - Aligned horizontally */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 md:gap-6 mb-4">
             <button
               onClick={() => setIsSimpleContactOpen(true)}
               className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full font-medium text-sm sm:text-base btn-pill flex items-center w-full sm:w-auto justify-center hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg shadow-white/10"
             >
               <Mail className="mr-2" size={16} /> Shoot me a note
             </button>

             <button
               onClick={() => setIsBookingOpen(true)}
               className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium text-sm sm:text-base btn-pill flex items-center w-full sm:w-auto justify-center transition-all duration-200 border border-gray-700 hover:border-gray-600"
             >
                <Calendar className="mr-2" size={16} /> {content.contact.book}
             </button>

             <button
               onClick={() => setIsQuoteGeneratorOpen(true)}
               className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full font-medium text-sm sm:text-base btn-pill flex items-center w-full sm:w-auto justify-center hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg shadow-white/10"
             >
                <Quote className="mr-2" size={16} /> {content.contact.quote_button}
             </button>
          </div>

          {/* Copy Email - Below buttons */}
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText('victorsoussan@gmail.com').then(() => {
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                });
              }}
              className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 size={12} className="text-green-400" />
                  <span className="text-green-400">Email copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1D1D1F] text-gray-500 py-16 px-6 border-t border-gray-800">
         <div className="max-w-6xl mx-auto">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 pb-8 border-b border-gray-800">
               <button
                 onClick={() => scrollToSection('services')}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
               >
                 {content.nav.services}
               </button>
               <button
                 onClick={() => scrollToSection('bio')}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
               >
                 {content.nav.bio}
               </button>
               <button
                 onClick={() => scrollToSection('projects')}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
               >
                 {content.nav.projects}
               </button>
               <button
                 onClick={() => scrollToSection('lab')}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
               >
                 <FlaskConical size={14} className="mr-1.5" />
                 {content.nav.lab}
               </button>
               <button
                 onClick={() => scrollToSection('testimonials')}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
               >
                 {content.nav.testimonials}
               </button>
               <button
                 onClick={() => scrollToSection('contact')}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
               >
                 {content.nav.contact}
               </button>
               <button
                 onClick={() => setIsQuoteGeneratorOpen(true)}
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium"
               >
                 {content.contact.quote_button}
               </button>
               <a
                 href="https://linkedin.com/in/victorsoussan/"
                 target="_blank"
                 rel="noreferrer"
                 className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
               >
                 <Linkedin size={14} className="mr-1.5" />
                 LinkedIn
               </a>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col md:flex-row justify-between items-center">
               <div className="mb-4 md:mb-0">
                  <span className="font-bold text-white">Victor Soussan</span>
                  <span className="mx-2">•</span>
                  <span>Senior Product Design Lead</span>
               </div>
               <div className="text-sm">
                  © {new Date().getFullYear()} — Designed & Built with React & Tailwind
               </div>
            </div>
         </div>
      </footer>

      {/* Service Gallery Modal */}
      <AnimatePresence>
        {selectedServiceGallery && (
          <div className="fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white overflow-auto"
            >
              {/* Close button - fixed top right */}
              <button
                onClick={() => setSelectedServiceGallery(null)}
                className="fixed top-6 right-6 z-30 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-lg"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>

              {/* Header with Icon */}
              <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                  {selectedServiceGallery === 'execution' && (
                    <div className="p-4 bg-pink-50 rounded-2xl text-pink-600 flex-shrink-0">
                      <PenTool size={32} />
                    </div>
                  )}
                  {selectedServiceGallery === 'utility' && (
                    <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 flex-shrink-0">
                      <Zap size={32} />
                    </div>
                  )}
                  {selectedServiceGallery === 'efficiency' && (
                    <div className="p-4 bg-orange-50 rounded-2xl text-orange-600 flex-shrink-0">
                      <Settings size={32} />
                    </div>
                  )}
                  {selectedServiceGallery === 'impact' && (
                    <div className="p-4 bg-teal-50 rounded-2xl text-teal-600 flex-shrink-0">
                      <Users size={32} />
                    </div>
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedServiceGallery === 'execution' && content.services.execution}
                      {selectedServiceGallery === 'utility' && content.services.utility}
                      {selectedServiceGallery === 'efficiency' && content.services.efficiency}
                      {selectedServiceGallery === 'impact' && content.services.impact}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Examples & Deliverables</p>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="px-8 py-12">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
                  {/* Hands-on Execution Gallery */}
                  {selectedServiceGallery === 'execution' && (
                    <>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/07 - Designing the Micro-Interaction - no legend.jpg"
                          alt="Micro-interaction design"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Designing micro-interactions</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/09 - Prototypage haute-fidélité et spécifications.jpg"
                          alt="High-fidelity prototyping"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Hi-fi prototyping & interaction specs</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/06b - Prototyping La Bulle.jpg"
                          alt="Prototyping features"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Feature prototyping & validation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/16 - Des interactions fluides pour la gestion des médias (CRUD).jpg"
                          alt="Fluid interactions"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Fluid CRUD interactions for media management</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/micro interaction design on mobile.jpg"
                          alt="Mobile micro-interactions"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Mobile micro-interaction design</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/interaction and motion design with feedbacks.jpg"
                          alt="Motion design"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Interaction & motion design with feedback loops</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Product Utility Gallery */}
                  {selectedServiceGallery === 'utility' && (
                    <>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/03 - Deep user observation - empathy.jpg"
                          alt="User observation"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Deep user observation & empathy research</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/15d - research field observation with use of the product.jpg"
                          alt="Field research"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Field research & product usage observation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/34 - User testing interviews.jpg"
                          alt="User testing"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">User testing & interviews</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/11b - Design upstream strategy and roadmap.jpg"
                          alt="Product strategy"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design strategy & product roadmap</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/design UX, product architecture, user flows.png"
                          alt="UX architecture"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">UX design, product architecture & user flows</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/11 - Presenting Collaborative Study to CODIR - c-level alignment.jpg"
                          alt="Executive presentation"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Presenting research to C-level for alignment</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Operational Efficiency Gallery */}
                  {selectedServiceGallery === 'efficiency' && (
                    <>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/11 - Construction du UI Kit et du Design System.jpg"
                          alt="Design system"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Building UI Kit & Design System</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/10 - Synchronisations Design-Dev et Architecture des Composants.jpg"
                          alt="Design-dev sync"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design-dev sync & component architecture</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/13b - Developer handoff.jpg"
                          alt="Developer handoff"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Developer handoff & specifications</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/12d - Figma file archi & libraries.jpg"
                          alt="Figma architecture"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Figma file architecture & libraries</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/35 - Process - Standardized product design brief template.jpg"
                          alt="Design brief template"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Standardized product design brief</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/36 - Governance and process-  Mapping technical contraints with engineers.jpg"
                          alt="Technical governance"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Governance & mapping technical constraints</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/13 - Du design à l'architecture — Penser comme un ingénieur produit.jpg"
                          alt="Engineering mindset"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">From design to architecture — Product engineer mindset</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/19 - Boucles de feedback et amélioration continue.jpg"
                          alt="Feedback loops"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Feedback loops & continuous improvement</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Organizational Impact Gallery */}
                  {selectedServiceGallery === 'impact' && (
                    <>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/21 - Ideation Workshop for the Suite.jpg"
                          alt="Ideation workshop"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Ideation workshop facilitation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/27 - Ateliers de co creation et sketching en equipe.jpg"
                          alt="Co-creation workshop"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Co-creation & team sketching workshops</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/24 - Design teams rituals.jpg"
                          alt="Design team rituals"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design team rituals & ceremonies</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/25 - Weekly design critique.jpg"
                          alt="Design critique"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Weekly design critique sessions</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/22 - product Squad daily rituals.jpg"
                          alt="Squad rituals"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Product squad daily rituals</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/28 - remote UX workshops.jpg"
                          alt="Remote workshops"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Remote UX workshop facilitation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/design mentoring.png"
                          alt="Design mentoring"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design mentoring & coaching</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img
                          src="/images/bd-sketches/12b - Brand Identity system -Unifying Color and Grid.jpg"
                          alt="Brand identity"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Brand identity system & visual language</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA */}
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-600 mb-4">
                    Want to see how I can help with your project?
                  </p>
                  <button
                    onClick={() => {
                      setSelectedServiceGallery(null);
                      setIsContactFormOpen(true);
                    }}
                    className="px-5 py-2.5 accent-blue text-white rounded-full font-medium text-sm btn-pill transition-colors duration-200"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button - Mobile only */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="md:hidden fixed bottom-8 right-6 z-[90] p-4 bg-gray-900 hover:bg-black text-white rounded-full shadow-2xl transition-all duration-200 active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-8 right-8 z-[200] max-w-md"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 flex items-start space-x-3">
              <div className="flex-shrink-0">
                {toastMessage.includes('success') ? (
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X size={20} className="text-red-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {toastMessage.includes('success') ? 'Message Sent!' : 'Error'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {toastMessage}
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Generator Modal */}
      <AnimatePresence>
        {isQuoteGeneratorOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 backdrop-blur-md ${
                systemTheme === 'dark'
                  ? 'bg-black/80'
                  : 'bg-black/50'
              }`}
              onClick={() => {
                const hasData = quoteData.clientNeed || quoteData.services.length > 0 ||
                               quoteData.projectDescription || quoteData.name || quoteData.email;
                if (hasData && !quoteSuccess && quoteStep > 0) {
                  if (window.confirm(content.contact.quote_confirm_close)) {
                    localStorage.setItem('quoteDraft', JSON.stringify({ quoteData, quoteStep }));
                    setIsQuoteGeneratorOpen(false);
                  }
                } else {
                  setIsQuoteGeneratorOpen(false);
                }
              }}
            />

            {/* Modal Content - Fixed height */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`relative w-full max-w-4xl h-[85vh] flex flex-col backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/5 border ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F]/95 border-white/10'
                  : 'bg-white/95 border-gray-200/50'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Fixed */}
              {quoteStep > 0 && !quoteSuccess && (
                <div className={`flex-shrink-0 px-8 pt-6 pb-4 border-b ${
                  systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {/* Small Avatar */}
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/20 shadow-lg">
                        <img
                          src="/images/victor-soussan.png"
                          alt="Victor Soussan"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title & Step */}
                      <div>
                        <h2 className={`text-xl font-bold ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {lang === 'en' ? 'Project Estimate' : 'Estimation de Projet'}
                        </h2>
                        <p className={`text-sm ${
                          systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {lang === 'en' ? `Step ${quoteStep} of 8` : `Étape ${quoteStep} sur 8`}
                        </p>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => {
                        const hasData = quoteData.clientNeed || quoteData.services.length > 0 ||
                                       quoteData.projectDescription || quoteData.name || quoteData.email;
                        if (hasData && !quoteSuccess && quoteStep > 0) {
                          if (window.confirm(content.contact.quote_confirm_close)) {
                            localStorage.setItem('quoteDraft', JSON.stringify({ quoteData, quoteStep }));
                            setIsQuoteGeneratorOpen(false);
                          }
                        } else {
                          setIsQuoteGeneratorOpen(false);
                        }
                      }}
                      className={`p-2.5 rounded-full transition-all duration-200 ${
                        systemTheme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex items-center justify-between">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                      <div key={step} className="flex items-center flex-1">
                        <div className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                          step <= quoteStep ? 'bg-blue-600' : systemTheme === 'dark' ? 'bg-white/20' : 'bg-gray-200'
                        }`} />
                        {step < 8 && <div className="w-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {quoteStep === 0 && !quoteSuccess && (
                <div className="absolute top-6 right-6 z-20">
                  <button
                    onClick={() => setIsQuoteGeneratorOpen(false)}
                    className={`p-2.5 backdrop-blur-xl rounded-full transition-all duration-200 ${
                      systemTheme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-gray-100/80 hover:bg-gray-200'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* Content Area - Scrollable with fixed height */}
              <div className="flex-1 overflow-y-auto px-8 py-8 pb-24">
                <AnimatePresence mode="wait">
                  {/* Step 0: Welcome Screen */}
                  {quoteStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-12 px-8 max-w-3xl mx-auto"
                    >
                      {/* Portrait */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="mb-8 inline-block"
                      >
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-2xl shadow-blue-500/10 mx-auto">
                            <img
                              src="/images/victor-soussan.png"
                              alt="Victor Soussan"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg" />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`text-4xl font-bold mb-4 ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {lang === 'en' ? 'Get Your Project Estimate' : 'Obtenez votre Estimation'}
                      </motion.h1>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-xl mb-10 leading-relaxed ${
                          systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {lang === 'en'
                          ? 'This quick questionnaire will help me understand your needs and provide a tailored response.'
                          : 'Ce questionnaire rapide m\'aidera à comprendre vos besoins et à vous proposer une réponse calibrée.'}
                      </motion.p>

                      {/* Features */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid md:grid-cols-3 gap-6 mb-12"
                      >
                        <div className={`p-6 backdrop-blur-xl rounded-2xl border hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 ${
                          systemTheme === 'dark'
                            ? 'bg-blue-900/20 border-blue-500/20'
                            : 'bg-blue-50/50 border-blue-100'
                        }`}>
                          <Clock className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                          <h3 className={`font-semibold mb-2 ${
                            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {lang === 'en' ? '5 minutes' : '5 minutes'}
                          </h3>
                          <p className={`text-sm ${
                            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {lang === 'en' ? 'Quick and easy' : 'Rapide et simple'}
                          </p>
                        </div>

                        <div className={`p-6 backdrop-blur-xl rounded-2xl border hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 ${
                          systemTheme === 'dark'
                            ? 'bg-blue-900/20 border-blue-500/20'
                            : 'bg-blue-50/50 border-blue-100'
                        }`}>
                          <Target className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                          <h3 className={`font-semibold mb-2 ${
                            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {lang === 'en' ? 'Tailored estimate' : 'Estimation sur-mesure'}
                          </h3>
                          <p className={`text-sm ${
                            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {lang === 'en' ? 'Based on your needs' : 'Selon vos besoins'}
                          </p>
                        </div>

                        <div className={`p-6 backdrop-blur-xl rounded-2xl border hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 ${
                          systemTheme === 'dark'
                            ? 'bg-blue-900/20 border-blue-500/20'
                            : 'bg-blue-50/50 border-blue-100'
                        }`}>
                          <Zap className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                          <h3 className={`font-semibold mb-2 ${
                            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {lang === 'en' ? 'Fast response' : 'Réponse rapide'}
                          </h3>
                          <p className={`text-sm ${
                            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {lang === 'en' ? 'Within 24 hours' : 'Sous 24 heures'}
                          </p>
                        </div>
                      </motion.div>

                      {/* CTA */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuoteStep(1)}
                        className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200"
                      >
                        {lang === 'en' ? 'Start Now' : 'Démarrer'}
                        <ArrowRight className="ml-2" size={24} />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Step 1: Client Need */}
                  {quoteStep === 1 && !quoteSuccess && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className={`text-2xl font-bold mb-2 ${
                          systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {lang === 'en' ? 'What brings you here?' : 'Qu\'est-ce qui vous amène ?'}
                        </h3>
                        <p className={`text-base ${
                          systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {lang === 'en' ? 'Select the option that best describes your need' : 'Sélectionnez l\'option qui décrit le mieux votre besoin'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            type: 'new-product' as const,
                            icon: <Rocket size={32} weight="duotone" />,
                            title: lang === 'en'
                              ? 'I want to create a new app, service, or prototype a new product'
                              : 'Je souhaite créer une nouvelle app, un nouveau service, prototyper un nouveau produit'
                          },
                          {
                            type: 'optimize-existing' as const,
                            icon: <ArrowsClockwise size={32} weight="duotone" />,
                            title: lang === 'en'
                              ? 'I need to optimize an existing product, refresh the UI, or simplify complex user journeys'
                              : 'Je dois optimiser un produit existant, rafraîchir l\'UI, ou simplifier des parcours devenus trop complexes'
                          },
                          {
                            type: 'long-term' as const,
                            icon: <HandHeart size={32} weight="duotone" />,
                            title: lang === 'en'
                              ? 'I\'m looking for a long-term partnership'
                              : 'Je recherche une mission long terme'
                          },
                          {
                            type: 'other' as const,
                            icon: <ChatCircleDots size={32} weight="duotone" />,
                            title: lang === 'en'
                              ? 'Other (I\'ll explain in the description)'
                              : 'Autre (je préciserai dans la description)'
                          }
                        ].map((option) => (
                          <motion.button
                            key={option.type}
                            onClick={() => {
                              setQuoteData({ ...quoteData, clientNeed: option.type });
                              setQuoteValidationErrors({ ...quoteValidationErrors, clientNeed: '' });
                            }}
                            whileHover={{ scale: 1.01, x: 4 }}
                            whileTap={{ scale: 0.99 }}
                            className={`w-full flex items-center space-x-4 p-5 border-2 rounded-2xl text-left transition-all duration-200 ${
                              quoteData.clientNeed === option.type
                                ? 'border-blue-500 bg-blue-50/70 shadow-lg shadow-blue-500/10'
                                : systemTheme === 'dark'
                                  ? 'border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-900/20'
                                  : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-50/30'
                            }`}
                          >
                            <div className={`flex-shrink-0 ${quoteData.clientNeed === option.type ? 'text-blue-600' : systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                              {option.icon}
                            </div>
                            <span className={`text-base font-medium leading-relaxed ${
                              systemTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                            }`}>{option.title}</span>
                          </motion.button>
                        ))}
                      </div>

                      {quoteValidationErrors.clientNeed && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 text-center font-medium"
                        >
                          {quoteValidationErrors.clientNeed}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Project Status */}
                  {quoteStep === 2 && !quoteSuccess && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {lang === 'en' ? 'What is your situation?' : 'Quelle est votre situation ?'}
                        </h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'This helps us understand where you are in your journey' : 'Cela nous aide à comprendre où vous en êtes dans votre parcours'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {[
                          {
                            type: 'early-stage' as const,
                            icon: <Rocket size={40} weight="duotone" />,
                            title: lang === 'en' ? 'Early Stage Product' : 'Produit en phase de démarrage, early stage',
                            desc: lang === 'en' ? 'MVP, startup, or new product launch' : 'MVP, startup, ou lancement de nouveau produit'
                          },
                          {
                            type: 'scale-complex' as const,
                            icon: <ChartLineUp size={40} weight="duotone" />,
                            title: lang === 'en' ? 'Optimize & Scale' : 'Optimiser et scaler un produit complexe',
                            desc: lang === 'en' ? 'Improve existing product, increase performance' : 'Améliorer un produit existant, augmenter les performances'
                          },
                          {
                            type: 'long-term-mission' as const,
                            icon: <HandHeart size={40} weight="duotone" />,
                            title: lang === 'en' ? 'Long-term Mission' : 'Mission pour un engagement long terme',
                            desc: lang === 'en' ? 'Ongoing partnership, 6+ months commitment' : 'Partenariat continu, engagement 6+ mois'
                          }
                        ].map((option) => (
                          <motion.button
                            key={option.type}
                            onClick={() => {
                              setQuoteData({ ...quoteData, projectStatus: option.type });
                              setQuoteValidationErrors({ ...quoteValidationErrors, projectStatus: '' });
                            }}
                            whileHover={{ scale: 1.01, y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            className={`p-6 border-2 rounded-2xl text-left transition-all duration-200 ${
                              quoteData.projectStatus === option.type
                                ? 'border-blue-500 bg-blue-50/70 shadow-lg shadow-blue-500/10'
                                : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-50/30'
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`flex-shrink-0 ${quoteData.projectStatus === option.type ? 'text-blue-600' : 'text-gray-400'}`}>
                                {option.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-1">{option.title}</h4>
                                <p className="text-sm text-gray-600">{option.desc}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {quoteValidationErrors.projectStatus && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 text-center font-medium"
                        >
                          {quoteValidationErrors.projectStatus}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Upload Brief (Optional) */}
                  {quoteStep === 3 && !quoteSuccess && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-2xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {lang === 'en' ? 'Share your project brief' : 'Partagez votre brief de projet'}
                        </h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'Optional - Help us understand your project better' : 'Optionnel - Aidez-nous à mieux comprendre votre projet'}
                        </p>
                      </div>

                      {/* Upload Zone */}
                      <div
                        className={`relative p-10 rounded-2xl border-2 border-dashed transition-all duration-200 text-center ${
                          isDragging
                            ? 'border-blue-500 bg-blue-50/70'
                            : quoteData.briefFile
                            ? 'border-green-400 bg-green-50/30'
                            : 'border-gray-300 bg-gray-50/50 hover:border-blue-400'
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          const file = e.dataTransfer.files[0];
                          if (file) {
                            if (file.size > 3 * 1024 * 1024) {
                              setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: content.contact.quote_validation_file_size });
                              return;
                            }
                            if (!file.name.match(/\.(pdf|docx)$/i)) {
                              setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: content.contact.quote_validation_file_type });
                              return;
                            }
                            // Simulate upload progress
                            setIsUploading(true);
                            setUploadProgress(0);
                            const interval = setInterval(() => {
                              setUploadProgress(prev => {
                                if (prev >= 100) {
                                  clearInterval(interval);
                                  setIsUploading(false);
                                  setQuoteData({ ...quoteData, briefFile: file, briefFileName: file.name, briefFileSize: file.size });
                                  setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: '' });
                                  return 100;
                                }
                                return prev + 10;
                              });
                            }, 100);
                          }
                        }}
                      >
                        {!quoteData.briefFile && !isUploading ? (
                          <>
                            <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                            <p className="text-lg font-semibold text-gray-900 mb-1">
                              {lang === 'en' ? 'Drag & drop your file here' : 'Glissez-déposez votre fichier ici'}
                            </p>
                            <p className="text-sm text-gray-600 mb-5">
                              {lang === 'en' ? 'or browse from your computer' : 'ou parcourez depuis votre ordinateur'}
                            </p>
                            <label className="inline-block">
                              <input
                                type="file"
                                accept=".pdf,.docx"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 3 * 1024 * 1024) {
                                      setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: content.contact.quote_validation_file_size });
                                      return;
                                    }
                                    // Simulate upload progress (faster)
                                    setIsUploading(true);
                                    setUploadProgress(0);
                                    const interval = setInterval(() => {
                                      setUploadProgress(prev => {
                                        if (prev >= 100) {
                                          clearInterval(interval);
                                          setIsUploading(false);
                                          setQuoteData({ ...quoteData, briefFile: file, briefFileName: file.name, briefFileSize: file.size });
                                          setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: '' });
                                          return 100;
                                        }
                                        return prev + 20;
                                      });
                                    }, 50);
                                  }
                                }}
                              />
                              <motion.span
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-2.5 bg-white border-2 border-blue-500 text-blue-600 rounded-full font-medium text-sm hover:bg-blue-50 transition-all cursor-pointer inline-block btn-pill"
                              >
                                {lang === 'en' ? 'Browse Files' : 'Parcourir les fichiers'}
                              </motion.span>
                            </label>
                            <p className="text-xs text-gray-500 mt-3">
                              PDF or DOCX • Max 3MB
                            </p>
                          </>
                        ) : isUploading ? (
                          <div className="py-4">
                            <div className="w-16 h-16 mx-auto mb-3 relative">
                              <div className="w-full h-full rounded-full border-4 border-gray-200"></div>
                              <div
                                className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
                                style={{ animationDuration: '0.8s' }}
                              ></div>
                            </div>
                            <p className="text-base font-semibold text-gray-900">
                              {lang === 'en' ? 'Uploading...' : 'Téléchargement...'}
                            </p>
                          </div>
                        ) : (
                          <div className="py-2">
                            <div className="flex items-center justify-center space-x-3 mb-3">
                              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <Check className="w-7 h-7 text-white" />
                              </div>
                              <div className="text-left">
                                <p className="text-base font-semibold text-gray-900">
                                  {quoteData.briefFileName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {(quoteData.briefFileSize / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <motion.button
                              onClick={() => {
                                setQuoteData({ ...quoteData, briefFile: null, briefFileName: '', briefFileSize: 0 });
                                setUploadProgress(0);
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-5 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold hover:bg-red-100 transition-all"
                            >
                              {lang === 'en' ? 'Remove File' : 'Supprimer le fichier'}
                            </motion.button>
                          </div>
                        )}
                      </div>

                      {quoteValidationErrors.briefFile && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 text-center font-medium mt-4"
                        >
                          {quoteValidationErrors.briefFile}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4: Services Selection */}
                  {quoteStep === 4 && !quoteSuccess && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_3_title}</h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'Select all services that apply to your project' : 'Sélectionnez tous les services qui s\'appliquent à votre projet'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          content.contact.quote_step_3_service_1,
                          content.contact.quote_step_3_service_2,
                          content.contact.quote_step_3_service_3,
                          content.contact.quote_step_3_service_4,
                          content.contact.quote_step_3_service_5,
                          content.contact.quote_step_3_service_6,
                          content.contact.quote_step_3_service_7,
                          content.contact.quote_step_3_service_8
                        ].map((service, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => {
                              const services = quoteData.services.includes(service)
                                ? quoteData.services.filter(s => s !== service)
                                : [...quoteData.services, service];
                              setQuoteData({ ...quoteData, services });
                              setQuoteValidationErrors({ ...quoteValidationErrors, services: '' });
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center space-x-4 p-5 border-2 rounded-2xl text-left transition-all duration-200 ${
                              quoteData.services.includes(service)
                                ? 'border-blue-500 bg-blue-50/70 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20'
                                : 'border-gray-200 bg-white/50 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg'
                            }`}
                          >
                            {quoteData.services.includes(service) ? (
                              <CheckSquare size={28} className="text-blue-600 flex-shrink-0" />
                            ) : (
                              <Square size={28} className="text-gray-400 flex-shrink-0" />
                            )}
                            <span className="text-base font-semibold text-gray-900">{service}</span>
                          </motion.button>
                        ))}
                      </div>

                      {quoteValidationErrors.services && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 text-center font-medium mt-4"
                        >
                          {quoteValidationErrors.services}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 5: Project Details */}
                  {quoteStep === 5 && !quoteSuccess && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_4_title}</h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'Tell us more about your vision and goals' : 'Parlez-nous de votre vision et de vos objectifs'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">
                          {content.contact.quote_step_4_need_label}
                        </label>
                        <textarea
                          value={quoteData.needIdea}
                          onChange={(e) => setQuoteData({ ...quoteData, needIdea: e.target.value })}
                          className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none bg-white/50 backdrop-blur-xl"
                          rows={4}
                          placeholder={content.contact.quote_step_4_need_placeholder}
                        />
                      </div>

                      <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">
                          {content.contact.quote_step_4_desc_label}
                        </label>
                        <textarea
                          value={quoteData.projectDescription}
                          onChange={(e) => {
                            setQuoteData({ ...quoteData, projectDescription: e.target.value });
                            if (e.target.value.length >= 50) {
                              setQuoteValidationErrors({ ...quoteValidationErrors, projectDescription: '' });
                            }
                          }}
                          className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none bg-white/50 backdrop-blur-xl"
                          rows={6}
                          placeholder={content.contact.quote_step_4_desc_placeholder}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600 font-medium">
                            {quoteData.projectDescription.length} {content.contact.quote_step_4_chars}
                          </span>
                          {quoteData.projectDescription.length < 50 && (
                            <span className="text-sm text-gray-500">{content.contact.quote_step_4_min_chars}</span>
                          )}
                        </div>
                        {quoteValidationErrors.projectDescription && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-600 font-medium mt-2"
                          >
                            {quoteValidationErrors.projectDescription}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 6: Timeline */}
                  {quoteStep === 6 && !quoteSuccess && (
                    <motion.div
                      key="step6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang === 'en' ? 'Timeline' : 'Planning'}</h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'Help us understand your timeline expectations' : 'Aidez-nous à comprendre vos délais'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">
                            {content.contact.quote_step_5_start_label}
                          </label>
                          <input
                            type="date"
                            value={quoteData.startDate}
                            onChange={(e) => setQuoteData({ ...quoteData, startDate: e.target.value })}
                            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">
                            {content.contact.quote_step_5_end_label}
                          </label>
                          <input
                            type="date"
                            value={quoteData.endDate}
                            onChange={(e) => setQuoteData({ ...quoteData, endDate: e.target.value })}
                            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 7: Contact Information */}
                  {quoteStep === 7 && !quoteSuccess && (
                    <motion.div
                      key="step7"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_6_title}</h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'How can we reach you with your personalized estimate?' : 'Comment pouvons-nous vous joindre avec votre estimation personnalisée ?'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">
                            {content.contact.quote_step_6_name_label}
                          </label>
                          <input
                            type="text"
                            value={quoteData.name}
                            onChange={(e) => {
                              setQuoteData({ ...quoteData, name: e.target.value });
                              setQuoteValidationErrors({ ...quoteValidationErrors, name: '' });
                              localStorage.setItem('user_name', e.target.value);
                            }}
                            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                            placeholder={content.contact.quote_step_6_name_placeholder}
                          />
                          {quoteValidationErrors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600 font-medium mt-2"
                            >
                              {quoteValidationErrors.name}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">
                            {content.contact.quote_step_6_email_label}
                          </label>
                          <input
                            type="email"
                            value={quoteData.email}
                            onChange={(e) => {
                              setQuoteData({ ...quoteData, email: e.target.value });
                              setQuoteValidationErrors({ ...quoteValidationErrors, email: '' });
                              localStorage.setItem('user_email', e.target.value);
                            }}
                            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                            placeholder={content.contact.quote_step_6_email_placeholder}
                          />
                          {quoteValidationErrors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600 font-medium mt-2"
                            >
                              {quoteValidationErrors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">
                            {content.contact.quote_step_6_company_label} <span className="text-gray-500 font-normal">({lang === 'en' ? 'Optional' : 'Optionnel'})</span>
                          </label>
                          <input
                            type="text"
                            value={quoteData.company}
                            onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                            placeholder={content.contact.quote_step_6_company_placeholder}
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">
                            {content.contact.quote_step_6_phone_label} <span className="text-gray-500 font-normal">({lang === 'en' ? 'Optional' : 'Optionnel'})</span>
                          </label>
                          <input
                            type="tel"
                            value={quoteData.phone}
                            onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                            placeholder={content.contact.quote_step_6_phone_placeholder}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 8: Review & Send */}
                  {quoteStep === 8 && !quoteSuccess && (
                    <motion.div
                      key="step8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_7_title}</h3>
                        <p className="text-base text-gray-600">
                          {lang === 'en' ? 'Review your information before sending' : 'Vérifiez vos informations avant d\'envoyer'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Client Need */}
                        <div className="p-5 bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-bold text-gray-900">
                              {lang === 'en' ? 'Your Need' : 'Votre Besoin'}
                            </h4>
                            <button
                              onClick={() => setQuoteStep(1)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                              {content.contact.quote_step_7_edit}
                            </button>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {quoteData.clientNeed === 'new-product' && (lang === 'en'
                              ? 'I want to create a new app, service, or prototype a new product'
                              : 'Je souhaite créer une nouvelle app, un nouveau service, prototyper un nouveau produit')}
                            {quoteData.clientNeed === 'optimize-existing' && (lang === 'en'
                              ? 'I need to optimize an existing product, refresh the UI, or simplify user journeys'
                              : 'Je dois optimiser un produit existant, rafraîchir l\'UI d\'une app, faire évoluer les parcours')}
                            {quoteData.clientNeed === 'long-term' && (lang === 'en'
                              ? 'Long-term mission'
                              : 'Mission long terme')}
                            {quoteData.clientNeed === 'other' && (lang === 'en'
                              ? 'Other'
                              : 'Autre')}
                          </p>
                        </div>

                        {/* Project Status */}
                        <div className="p-5 bg-gradient-to-br from-purple-50/80 to-white rounded-2xl border border-purple-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-bold text-gray-900">
                              {lang === 'en' ? 'Project Status' : 'Statut du Projet'}
                            </h4>
                            <button
                              onClick={() => setQuoteStep(2)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                              {content.contact.quote_step_7_edit}
                            </button>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {quoteData.projectStatus === 'early-stage' && (lang === 'en'
                              ? 'Early Stage Product - MVP, startup, or new product launch'
                              : 'Produit en phase de démarrage, early stage - MVP, startup, ou lancement')}
                            {quoteData.projectStatus === 'scale-complex' && (lang === 'en'
                              ? 'Optimize & Scale Complex Product'
                              : 'Optimiser et scaler un produit complexe')}
                            {quoteData.projectStatus === 'long-term-mission' && (lang === 'en'
                              ? 'Long-term Mission'
                              : 'Mission pour un engagement long terme')}
                          </p>
                        </div>

                        {/* Brief File */}
                        {quoteData.briefFile && (
                          <div className="p-5 bg-gradient-to-br from-green-50/80 to-white rounded-2xl border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_brief}</h4>
                              <button
                                onClick={() => setQuoteStep(3)}
                                className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                              >
                                {content.contact.quote_step_7_edit}
                              </button>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText size={18} className="text-green-600" />
                              <p className="text-sm text-gray-700">{quoteData.briefFileName} <span className="text-gray-500">({(quoteData.briefFileSize / 1024).toFixed(1)} KB)</span></p>
                            </div>
                          </div>
                        )}

                        {/* Services */}
                        <div className="p-5 bg-gradient-to-br from-amber-50/80 to-white rounded-2xl border border-amber-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_services}</h4>
                            <button
                              onClick={() => setQuoteStep(4)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                              {content.contact.quote_step_7_edit}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {quoteData.services.map((service, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-white border border-amber-200 rounded-full text-sm text-gray-700 font-medium shadow-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="p-5 bg-gradient-to-br from-indigo-50/80 to-white rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_project_details}</h4>
                            <button
                              onClick={() => setQuoteStep(5)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                              {content.contact.quote_step_7_edit}
                            </button>
                          </div>
                          <div className="space-y-3">
                            {quoteData.needIdea && (
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_need}:</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{quoteData.needIdea}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_description}:</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{quoteData.projectDescription}</p>
                            </div>
                          </div>
                        </div>

                        {/* Budget & Timeline */}
                        {(quoteData.budget || quoteData.startDate || quoteData.endDate) && (
                          <div className="p-5 bg-gradient-to-br from-rose-50/80 to-white rounded-2xl border border-rose-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_budget_timeline}</h4>
                              <button
                                onClick={() => setQuoteStep(6)}
                                className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                              >
                                {content.contact.quote_step_7_edit}
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {quoteData.budget && (
                                <div className="p-3 bg-white rounded-xl border border-rose-100">
                                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_budget}</p>
                                  <p className="text-sm font-semibold text-gray-900">{quoteData.budget}</p>
                                </div>
                              )}
                              {quoteData.startDate && (
                                <div className="p-3 bg-white rounded-xl border border-rose-100">
                                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_start}</p>
                                  <p className="text-sm font-semibold text-gray-900">{quoteData.startDate}</p>
                                </div>
                              )}
                              {quoteData.endDate && (
                                <div className="p-3 bg-white rounded-xl border border-rose-100">
                                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_end}</p>
                                  <p className="text-sm font-semibold text-gray-900">{quoteData.endDate}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Contact Info */}
                        <div className="p-5 bg-gradient-to-br from-teal-50/80 to-white rounded-2xl border border-teal-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_contact}</h4>
                            <button
                              onClick={() => setQuoteStep(7)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                            >
                              {content.contact.quote_step_7_edit}
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-white rounded-xl border border-teal-100">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{lang === 'en' ? 'Name' : 'Nom'}</p>
                              <p className="text-sm font-semibold text-gray-900">{quoteData.name}</p>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-teal-100">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                              <p className="text-sm font-semibold text-gray-900">{quoteData.email}</p>
                            </div>
                            {quoteData.company && (
                              <div className="p-3 bg-white rounded-xl border border-teal-100">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{lang === 'en' ? 'Company' : 'Entreprise'}</p>
                                <p className="text-sm font-semibold text-gray-900">{quoteData.company}</p>
                              </div>
                            )}
                            {quoteData.phone && (
                              <div className="p-3 bg-white rounded-xl border border-teal-100">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{lang === 'en' ? 'Phone' : 'Téléphone'}</p>
                                <p className="text-sm font-semibold text-gray-900">{quoteData.phone}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <motion.button
                          onClick={() => {
                            // Generate Professional PDF with Linear/Apple Style
                            const pdf = new jsPDF();
                            const pageWidth = pdf.internal.pageSize.getWidth();
                            const pageHeight = pdf.internal.pageSize.getHeight();
                            let y = 25;

                            // Colors - Linear/Apple style
                            const colors = {
                              black: [0, 0, 0] as const,
                              gray900: [17, 24, 39] as const,
                              gray700: [55, 65, 81] as const,
                              gray500: [107, 114, 128] as const,
                              gray300: [209, 213, 219] as const,
                              gray100: [243, 244, 246] as const,
                              blue: [59, 130, 246] as const,
                              white: [255, 255, 255] as const
                            };

                            // Title
                            pdf.setTextColor(...colors.black);
                            pdf.setFontSize(28);
                            pdf.setFont('helvetica', 'bold');
                            pdf.text(lang === 'en' ? 'Project Estimate Request' : 'Demande d\'Estimation de Projet', 20, y);
                            y += 8;

                            // Date
                            pdf.setFontSize(10);
                            pdf.setFont('helvetica', 'normal');
                            pdf.setTextColor(...colors.gray500);
                            const requestDate = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            });
                            pdf.text(requestDate, 20, y);
                            y += 15;

                            // Divider line
                            pdf.setDrawColor(...colors.gray300);
                            pdf.setLineWidth(0.5);
                            pdf.line(20, y, pageWidth - 20, y);
                            y += 15;

                            // Contact Card - Victor's Information (Top Right)
                            const cardX = pageWidth - 75;
                            const cardY = 20;
                            const cardWidth = 55;
                            const cardHeight = 45;

                            // Card background
                            pdf.setFillColor(...colors.gray100);
                            pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, 'F');

                            // Card border
                            pdf.setDrawColor(...colors.gray300);
                            pdf.setLineWidth(0.3);
                            pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, 'S');

                            // Victor's info
                            pdf.setFontSize(9);
                            pdf.setFont('helvetica', 'bold');
                            pdf.setTextColor(...colors.black);
                            pdf.text('Victor Soussan', cardX + 3, cardY + 6);

                            pdf.setFontSize(7);
                            pdf.setFont('helvetica', 'normal');
                            pdf.setTextColor(...colors.gray700);
                            pdf.text('Senior Product Designer', cardX + 3, cardY + 10);

                            pdf.setFontSize(7);
                            pdf.setTextColor(...colors.gray500);
                            pdf.text('victorsoussan.fr', cardX + 3, cardY + 16);
                            pdf.text('victor@soussan.fr', cardX + 3, cardY + 20);
                            pdf.text('linkedin.com/in/victor-soussan', cardX + 3, cardY + 24);

                            // Blue accent line on card
                            pdf.setFillColor(...colors.blue);
                            pdf.rect(cardX, cardY, 2, cardHeight, 'F');

                            // Main content sections
                            // Section helper function
                            const addSection = (title: string, content: string, isFirst = false) => {
                              if (!isFirst) {
                                y += 10;
                                // Subtle divider
                                pdf.setDrawColor(...colors.gray300);
                                pdf.setLineWidth(0.3);
                                pdf.line(20, y, pageWidth - 95, y);
                                y += 10;
                              }

                              // Section title
                              pdf.setFontSize(10);
                              pdf.setFont('helvetica', 'bold');
                              pdf.setTextColor(...colors.gray900);
                              pdf.text(title, 20, y);
                              y += 7;

                              // Section content
                              pdf.setFontSize(10);
                              pdf.setFont('helvetica', 'normal');
                              pdf.setTextColor(...colors.gray700);
                              const lines = pdf.splitTextToSize(content, pageWidth - 100);
                              pdf.text(lines, 20, y);
                              y += lines.length * 5;
                            };

                            // Your Request
                            const clientNeedText = quoteData.clientNeed === 'new-product'
                              ? (lang === 'en' ? 'Create new app/service/prototype' : 'Créer nouvelle app/service/prototype')
                              : quoteData.clientNeed === 'optimize-existing'
                              ? (lang === 'en' ? 'Optimize existing product/refresh UI' : 'Optimiser produit existant/rafraîchir UI')
                              : quoteData.clientNeed === 'long-term'
                              ? (lang === 'en' ? 'Long-term mission' : 'Mission long terme')
                              : (lang === 'en' ? 'Other' : 'Autre');
                            addSection(lang === 'en' ? 'Your Request' : 'Votre Demande', clientNeedText, true);

                            // Project Status
                            const statusText = quoteData.projectStatus === 'early-stage'
                              ? (lang === 'en' ? 'Early Stage Product (MVP/Startup)' : 'Produit early stage (MVP/Startup)')
                              : quoteData.projectStatus === 'scale-complex'
                              ? (lang === 'en' ? 'Optimize & Scale Complex Product' : 'Optimiser et scaler produit complexe')
                              : (lang === 'en' ? 'Long-term Mission' : 'Mission long terme');
                            addSection(lang === 'en' ? 'Project Status' : 'Statut du Projet', statusText);

                            // Services
                            if (quoteData.services.length > 0) {
                              const servicesText = quoteData.services.join(', ');
                              addSection(lang === 'en' ? 'Services Requested' : 'Services Demandés', servicesText);
                            }

                            // Project Details
                            let projectDetails = '';
                            if (quoteData.needIdea) {
                              projectDetails += `${lang === 'en' ? 'Need/Idea' : 'Besoin/Idée'}: ${quoteData.needIdea}\n\n`;
                            }
                            projectDetails += quoteData.projectDescription;
                            addSection(lang === 'en' ? 'Project Details' : 'Détails du Projet', projectDetails);

                            // Budget & Timeline
                            if (quoteData.budget || quoteData.startDate || quoteData.endDate) {
                              let budgetText = '';
                              if (quoteData.budget) budgetText += `${lang === 'en' ? 'Budget' : 'Budget'}: ${quoteData.budget}`;
                              if (quoteData.startDate) budgetText += `\n${lang === 'en' ? 'Start' : 'Début'}: ${quoteData.startDate}`;
                              if (quoteData.endDate) budgetText += `\n${lang === 'en' ? 'End' : 'Fin'}: ${quoteData.endDate}`;
                              addSection(lang === 'en' ? 'Budget & Timeline' : 'Budget & Calendrier', budgetText);
                            }

                            // Client Contact
                            let contactText = `${quoteData.name}\n${quoteData.email}`;
                            if (quoteData.company) contactText += `\n${quoteData.company}`;
                            if (quoteData.phone) contactText += `\n${quoteData.phone}`;
                            if (quoteData.briefFile) contactText += `\n\n${lang === 'en' ? 'Brief File' : 'Fichier Brief'}: ${quoteData.briefFileName}`;
                            addSection(lang === 'en' ? 'Client Contact' : 'Contact Client', contactText);

                            // Footer
                            pdf.setFontSize(8);
                            pdf.setTextColor(...colors.gray500);
                            pdf.text(`Generated on ${requestDate}`, 20, pageHeight - 10);

                            pdf.save(`project-estimate-${quoteData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
                          }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center space-x-2 px-5 py-2.5 border-2 border-blue-500 text-blue-600 rounded-full font-medium text-sm hover:bg-blue-50 transition-all duration-200 btn-pill"
                        >
                          <Download size={16} />
                          <span>{content.contact.quote_step_7_download}</span>
                        </motion.button>

                        <motion.button
                          onClick={async () => {
                            setIsQuoteSending(true);
                            try {
                              // Send via EmailJS
                              const templateParams = {
                                from_name: quoteData.name,
                                from_email: quoteData.email,
                                company: quoteData.company || 'N/A',
                                phone: quoteData.phone || 'N/A',
                                client_need: quoteData.clientNeed || 'N/A',
                                project_status: quoteData.projectStatus || 'N/A',
                                services: quoteData.services.join(', '),
                                need_idea: quoteData.needIdea || 'N/A',
                                project_description: quoteData.projectDescription,
                                budget: quoteData.budget || 'N/A',
                                start_date: quoteData.startDate || 'N/A',
                                end_date: quoteData.endDate || 'N/A',
                                brief_attached: quoteData.briefFile ? `Yes - ${quoteData.briefFileName}` : 'No',
                                to_email: 'victorsoussan@gmail.com'
                              };

                              // Send email to Victor (quote request)
                              await emailjs.send(
                                EMAILJS_CONFIG.SERVICE_ID,
                                EMAILJS_CONFIG.TEMPLATE_ID,
                                templateParams,
                                EMAILJS_CONFIG.PUBLIC_KEY
                              );

                              // Send confirmation email to client
                              await emailjs.send(
                                EMAILJS_CONFIG.SERVICE_ID,
                                EMAILJS_CONFIG.CONFIRMATION_TEMPLATE_ID,
                                templateParams,
                                EMAILJS_CONFIG.PUBLIC_KEY
                              );

                              // Success
                              setQuoteSuccess(true);
                              localStorage.removeItem('quoteDraft');

                              // Auto-close after 5 seconds
                              setTimeout(() => {
                                setIsQuoteGeneratorOpen(false);
                                setQuoteSuccess(false);
                                setQuoteStep(0);
                                setQuoteData({
                                  clientNeed: '',
                                  projectStatus: '',
                                  briefFile: null,
                                  briefFileName: '',
                                  briefFileSize: 0,
                                  services: [],
                                  needIdea: '',
                                  projectDescription: '',
                                  budget: '',
                                  startDate: '',
                                  endDate: '',
                                  name: '',
                                  email: '',
                                  company: '',
                                  phone: ''
                                });
                              }, 5000);
                            } catch (error) {
                              console.error('Failed to send quote:', error);
                              setToastMessage('Failed to send quote. Please try again.');
                              setShowToast(true);
                              setTimeout(() => setShowToast(false), 5000);
                            } finally {
                              setIsQuoteSending(false);
                            }
                          }}
                          disabled={isQuoteSending}
                          whileHover={!isQuoteSending ? { scale: 1.02, y: -2 } : {}}
                          whileTap={!isQuoteSending ? { scale: 0.98 } : {}}
                          className="flex-1 flex items-center justify-center space-x-2 px-5 py-2.5 accent-blue text-white rounded-full font-medium text-sm btn-pill shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isQuoteSending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>{content.contact.simple_form_sending}</span>
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              <span>{content.contact.quote_step_7_send}</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Success State */}
                  {quoteSuccess && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 size={48} className="text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{content.contact.quote_success_title}</h3>
                      <p className="text-lg text-gray-600 mb-8">{content.contact.quote_success_message}</p>
                      <motion.button
                        onClick={() => {
                          setQuoteSuccess(false);
                          setQuoteStep(0);
                          setQuoteData({
                            clientNeed: '',
                            projectStatus: '',
                            briefFile: null,
                            briefFileName: '',
                            briefFileSize: 0,
                            services: [],
                            needIdea: '',
                            projectDescription: '',
                            budget: '',
                            startDate: '',
                            endDate: '',
                            name: '',
                            email: '',
                            company: '',
                            phone: ''
                          });
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2.5 accent-blue text-white rounded-full font-medium text-sm btn-pill shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200"
                      >
                        {content.contact.quote_success_new}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Navigation - Fixed */}
              {!quoteSuccess && quoteStep > 0 && (
                <div className="flex-shrink-0 relative z-20 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-8 py-5 flex items-center justify-between shadow-lg shadow-gray-900/5">
                  {quoteStep > 1 ? (
                    <motion.button
                      onClick={() => setQuoteStep(quoteStep - 1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-5 py-2.5 border-2 border-gray-200 text-gray-900 rounded-full font-medium text-sm btn-pill hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200"
                      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                    >
                      <ChevronRight size={16} className="rotate-180" />
                      <span>{content.contact.quote_back}</span>
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center space-x-3">
                    {quoteStep === 3 && (
                      <motion.button
                        onClick={() => setQuoteStep(4)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 text-gray-600 hover:text-blue-600 font-semibold transition-colors"
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                      >
                        {content.contact.quote_skip}
                      </motion.button>
                    )}

                    {quoteStep < 8 ? (
                      <motion.button
                        onClick={() => {
                          // Validation
                          const errors: {[key: string]: string} = {};

                          if (quoteStep === 1 && !quoteData.clientNeed) {
                            errors.clientNeed = lang === 'en' ? 'Please select an option' : 'Veuillez sélectionner une option';
                          }

                          if (quoteStep === 2 && !quoteData.projectStatus) {
                            errors.projectStatus = lang === 'en' ? 'Please select your situation' : 'Veuillez sélectionner votre situation';
                          }

                          if (quoteStep === 4 && quoteData.services.length === 0) {
                            errors.services = content.contact.quote_validation_select_service;
                          }

                          if (quoteStep === 5 && quoteData.projectDescription.length < 50) {
                            errors.projectDescription = content.contact.quote_validation_min_chars;
                          }

                          if (quoteStep === 7) {
                            if (!quoteData.name) errors.name = content.contact.quote_validation_required;
                            if (!quoteData.email) {
                              errors.email = content.contact.quote_validation_required;
                            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteData.email)) {
                              errors.email = content.contact.quote_validation_email;
                            }
                          }

                          if (Object.keys(errors).length > 0) {
                            setQuoteValidationErrors(errors);
                            return;
                          }

                          setQuoteValidationErrors({});
                          setQuoteStep(quoteStep + 1);
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                      >
                        <span>{content.contact.quote_next}</span>
                        <ChevronRight size={18} />
                      </motion.button>
                    ) : null}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Page Iframe Modal */}
      <AnimatePresence>
        {iframeModalUrl && (
          <div className="fixed inset-0 z-[200]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
            >
              {/* Close button - fixed top right */}
              <button
                onClick={() => setIframeModalUrl(null)}
                className="fixed top-6 right-6 z-[210] p-3 bg-gray-900 hover:bg-black text-white rounded-full transition-colors shadow-lg"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Iframe container */}
              <iframe
                src={iframeModalUrl}
                className="w-full h-full border-0"
                title="Project Details"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toolkit Case Study Page */}
      <AnimatePresence>
        {isToolkitPageOpen && (
          <ToolkitPage
            onClose={() => setIsToolkitPageOpen(false)}
            systemTheme={systemTheme}
            onToggleTheme={() => {
              setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
