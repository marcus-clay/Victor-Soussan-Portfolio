// Bilingual translations (EN/FR) for the portfolio
// Extracted from App.tsx for maintainability
import { resumeExperience } from './profileData';

export type Language = 'en' | 'fr';

export const TRANSLATIONS = {
  en: {
    nav: {
      services: "Expertise",
      bio: "About",
      projects: "Work",
      lab: "The Lab",
      testimonials: "Testimonials",
      contact: "Contact",
      archive: "Gallery",
      blog: "Resources",
      approach: "Approach",
      interventions: "Interventions"
    },
    hero: {
      availability: "Available for collaborations and engagements",
      tagline: "Victor Soussan",
      title: "Lead Product Designer, AI",
      subtitle: "end-to-end",
      positioning: "Product Builder \u00b7 SaaS B2B & B2G \u00b7 Design Systems \u00b7 AI-driven design & prototyping \u00b7 Claude Code \u00b7 Figma MCP",
      desc: "I design digital products with AI, applied to design, project management and front-end development. I work with product teams, from field framing to production.",
      descShort: "I design digital products with AI, applied to design, project management and front-end development. I work with product teams, from field framing to production.",
      cta_projects: "See the work",
      cta_guide: "Explore the Claude Code guide",
      cta_book: "Book a 30min Call",
      tooltip_title: "Need a Design Partner?",
      tooltip_email: "Shoot me a note",
      tooltip_book: "Book a 30min Chat"
    },
    services: {
      title: "Expertise",
      subtitle: "Each engagement looks different. Some teams need a strategic partner from the start; others need someone who can come in and design. I adapt to what's most useful.",
      execution: "Hands-on Execution",
      utility: "Product Utility",
      efficiency: "Operational Efficiency",
      impact: "Organizational Impact",
      items: {
        execution: [
          "UX framing, UI design, micro-interactions",
          "Hi-fi prototyping to validate ideas and sell a vision",
          "Rapid MVP development using Claude Code, Gemini & Vercel (auth, DB, GenAI integration)",
          "Native mobile design (iOS/Android) and responsive web"
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
      },
      homepage_pillars: [
        {
          title: "Design & Prototyping",
          desc: "Interface design, high-fidelity prototyping, and rapid product development. From first concepts through to screens that are ready to build and test with users."
        },
        {
          title: "Product Strategy",
          desc: "Product vision, feature scoping, and ideation workshops. Helping teams clarify what they are building before committing to how they will build it."
        },
        {
          title: "Leadership & Ops",
          desc: "Design team building, design systems, and developer handoff. Structures that keep working as the team and product grow."
        }
      ],
      cta_all: "Explore my expertise"
    },
    visual_archive: {
      title: "Gallery",
      subtitle: "Interfaces, design systems and interaction prototypes from my projects.",
      filter_all: "All",
      filter_product: "Product",
      filter_workshop: "Workshop",
      filter_brand: "Brand"
    },
    bio: {
      title: "About",
      subtitle: "My journey, my approach and my resources.",
      role: "Product Design Lead \u2022 Mentor \u2022 Strategist",
      exp: "15 Years of Experience",
      loc: "Based in Paris",
      value_prop: "I help you ship fast without sacrificing quality.",
      bullets: [
        "Define your product strategy without drowning in documentation",
        "Create high-fidelity interactive prototypes to validate your ideas",
        "Collaborate directly with engineering teams to iterate rapidly",
        "Build and coach a design team set up for success"
      ],
      p1: "I've been designing digital products for 15 years. I evolved from agency to product, through major media groups and hardware startups. I don't aim for 'beautiful', I aim for 'functional' and 'viable'.",
      p2: "When a team is short on framing, time or design capacity, I take on what is missing: field-based framing, product delivery, the design system, sometimes the design team. With AI, I show a prototype where people used to write a document.",
      view_full_bio: "See my Full Journey",
      view_executive: "1-min Presentation",
      modal_title: "Biography and Journey",
      modal_title_short: "Bio",
      modal_subtitle: "15 years building products, 10 years in product design",
      close: "Close",
      toolkit_title: "My Toolkit",
      toolkit_desc: "Templates and methods I use daily to structure design and product workflows.",
      journey_p1: "I started my career in <strong>2005 at Publicis Groupe</strong>, working on creative campaigns for luxury brands like Herm\u00e8s, Leica, and Helena Rubinstein. This experience taught me the power of visual storytelling and attention to detail.",
      journey_p2: "From <strong>2005 to 2014</strong>, I transitioned from print to digital, serving as Art Director for Groupe Hommell Publications (directing a 300,000-copy monthly magazine) and freelancing for clients like L'Or\u00e9al, Orange, and Galeries Lafayette. During my time at <strong>agency Louis 21</strong>, I designed the internal social network for EADS serving 10,000 managers and built mobile applications for major brands, discovering my passion for product design.",
      journey_p3: "In <strong>2014</strong>, I joined <strong>PagesJaunes</strong> as a Product Designer, where I learned to design at scale. I redesigned their iOS and Android apps (<strong>22 million downloads, 300,000 daily users</strong>) and built their first cross-platform design system. I also evolved into a leadership role, <strong>managing a team of 4 UI designers</strong>.",
      journey_p4: "At <strong>Ogury (2016-2017)</strong> and <strong>Dailymotion (2017-2018)</strong>, I specialized in B2B SaaS products. At Dailymotion, I designed tools for publishers serving <strong>8,000+ users and 50-100 premium publishers</strong> (CBS, ESPN, BBC), handling <strong>100,000+ videos per month</strong>. I created their first UI Kit with Storybook, establishing design-development workflows.",
      journey_p5: "The most transformative chapter began in <strong>2018 at UNOWHY</strong>, where I spent 6 years (until Dec 2024). I started as a Senior Designer and evolved into a Product Lead role, transforming SQOOL from a simple Android launcher into a <strong>7-app SaaS ecosystem serving 500,000+ students across 465 schools</strong> in \u00cele-de-France.",
      journey_p6: "Key achievements at UNOWHY:",
      journey_bullets: [
        "Led SQOOL Extend (virtual machines for education) from 0-to-1, deploying MVP to 5 schools",
        "Shipped SQOOL Protect (parental control) in 3 months with interactive flows and demo video",
        "<strong>Hired and managed a team of 5 designers</strong>, establishing design operations and processes",
        "Built a unified design system across 5 brands, speeding up delivery across the five SQOOL apps",
        "Co-designed 2 executive strategy offsites defining the company\u2019s 2027 roadmap"
      ],
      journey_p7: "In parallel, I designed for <strong>Toolkit.ac (2023-2024)</strong>, a construction SaaS startup, as their first product designer, helping shape their V2 product serving 2,000 paying users.",
      journey_p8: "From <strong>December 2024 to July 2025</strong>, I joined <strong>beta.gouv.fr</strong> to work on France VAE, a public service innovation. I designed the collective VAE MVP, conducted 10 user interviews, ran 2-day design thinking workshops, and restructured their product workflow with clear delivery cycles.",
      journey_p9: "Since <strong>July 2025</strong>, I've been operating as <strong>Principal Designer</strong>, helping startups and companies with 0-to-1 product design, UX optimization, and AI integration. I'm also deep-diving into generative AI, building custom GPTs, prototyping with Bolt and Claude, and <strong>deploying 50+ functional web applications</strong> through my Condamine Apps lab.",
      journey_conclusion: "What drives me is transforming complex problems into clear, testable products. Whether designing for 500,000 students, 8,000 B2B users, or helping a startup find product-market fit, I bring strategic vision grounded in hands-on execution, rapid prototyping, and a relentless focus on what actually works.",
      tools_title: "Tools",
      education_title: "Education & Certifications",
      education_master_title: "Master in Communication & Multimedia",
      education_master_school: "ISCOM Paris (2001-2005)",
      education_ux_title: "UX/UI Design & Prototyping",
      education_ux_school: "UXcel / Udemy Certification (2021)",
      timeline: {
        "2026": [
          "Launching a <strong>generative AI training program</strong> for entrepreneurs, product teams, and designers",
          "Continuing experimentation on <strong>AI-assisted prototyping</strong> and industrializing this design workflow",
          "Goal: Deploy <strong>100+ applications</strong> with Condamine Apps"
        ],
        "2025": [
          "Launched <strong>Condamine Apps</strong> \u2013 50+ web apps prototyped and deployed",
          "Joined <strong>beta.gouv.fr</strong> as Lead Product Designer for France VAE",
          "Created <strong>Victor Soussan Design</strong> as Principal Designer"
        ],
        "2024": [
          "Designed <strong>Toolkit.ac V2</strong> (construction SaaS, 2,000+ users)",
          "Shipped <strong>SQOOL Protect</strong> (parental control) in 3 months at UNOWHY",
          "End of 6 years at UNOWHY (500K+ users, 465 schools)"
        ],
        "2023": [
          "Led <strong>SQOOL Extend</strong> (educational virtual machines) from 0-to-1",
          "Joined <strong>Toolkit.ac</strong> as First Product Designer",
          "Promoted to <strong>Product Lead</strong> at UNOWHY"
        ],
        "2022": [
          "<strong><a href=\"https://www.notion.so/victor-soussan/Exp-rimentation-IA-et-ChatGPT-2022-1aaa519b0dea8085afd5e56f8893ba91\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-pink-600 hover:underline\">AI experimentation with ChatGPT</a></strong>",
          "Launched the <strong>Hi SQOOL</strong> brand with complete identity"
        ],
        "2020-2021": [
          "Promoted to <strong>Design Lead</strong> at UNOWHY",
          "Transformed SQOOL from an Android launcher to a <strong>5-app SaaS ecosystem</strong>",
          "Hired and trained a <strong>team of 5 designers</strong>"
        ],
        "2018-2019": [
          "Joined <strong>UNOWHY</strong> as Senior UX/UI Designer",
          "Designing solutions for <strong>465 \u00cele-de-France high schools (500,000 devices)</strong>"
        ],
        "2017-2018": [
          "Senior Product Designer at <strong>Dailymotion</strong> (8K+ users, 50-100 premium publishers)",
          "Created the first <strong>UI Kit with Storybook</strong>, handling 100K+ videos/month"
        ],
        "2016-2017": [
          "Product Designer at <strong>Ogury</strong> (ad-tech dashboards)"
        ],
        "2014-2016": [
          "Lead UI/UX Designer at <strong>PagesJaunes</strong>",
          "Redesigned iOS & Android apps (<strong>22M downloads, 300K daily users</strong>)",
          "Built the first <strong>cross-platform design system</strong>",
          "Managed a team of <strong>4 UI designers</strong>"
        ],
        "2010-2014": [
          "Art Director at <strong>Groupe Hommell Publications</strong> (300K monthly copies)",
          "Freelance Creative Director for <strong>L'Or\u00e9al, Orange, Galeries Lafayette</strong>",
          "Designed EADS internal social network at <strong>Louis 21</strong> (10K managers)",
          "Built mobile applications for major brands"
        ],
        "2005-2010": [
          "Started at <strong>Publicis Groupe</strong> (Herm\u00e8s, Leica, Helena Rubinstein)",
          "Art Director for luxury brand campaigns",
          "Specialized in visual storytelling and premium design"
        ]
      }
    },
    resume: {
      title: "Victor Soussan, Lead Product Designer",
      contact: "victorsoussan@gmail.com \u2022 +33 6 15 98 94 00 \u2022 Paris, France",
      linkedin: "linkedin.com/in/victorsoussan-product-design",
      portfolio: "https://victorsoussan-portfolio-2026.vercel.app",
      summary_title: "Professional Summary",
      summary: "Lead Product Designer, 15 years of experience in B2B and B2G SaaS and complex business interfaces. Framing with a PM, delivery with a developer, or directly with Claude Code and Figma MCP. SQOOL suite: 7 applications, 500,000 students, team of 5 designers. Dailymotion publisher tools: 8,000+ users. France VAE for beta.gouv. PagesJaunes mobile apps: 22 million downloads. Available for freelance engagements and permanent roles (Head of Design, Design Lead).",
      experience_title: "Professional Experience",
      experience: resumeExperience('en'),
      skills_title: "Key Skills",
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
        "Master in Communication & Multimedia, ISCOM Paris (2001-2005)",
        "UX/UI Design & Prototyping, UXcel / Udemy (2021)"
      ],
      languages_title: "Languages",
      languages: "French (native) \u2022 English (full professional) \u2022 Spanish (professional working)",
      download_btn: "Download PDF",
      print_btn: "Print",
      copy_btn: "Copy text",
      copied_message: "Copied to clipboard!",
      switch_lang: "Switch to French"
    },
    projects: {
      title: "Case Studies",
      subtitle: "Recent projects: from complex B2B SaaS to consumer applications.",
      missions: "My responsibilities",
      system: "System Approach",
      deliverables: "What I shipped",
      read_more: "Read the full case study",
      view_all: "View all projects"
    },
    homepage_visual_archive: {
      title: "Gallery",
      subtitle: "A selection of interfaces, design systems and interaction prototypes from my projects.",
      cta: "Browse the full gallery",
    },
    signals: {
      title: "Blog",
      subtitle: "Perspectives on product design, leadership and methodology.",
      cta: "All articles",
    },
    testimonials: {
      title: "Testimonials",
      title_short: "Reviews",
      subtitle: "What my clients, managers and teams say about working together.",
      view_all: "View all 14 Testimonials",
      modal_title: "All Testimonials",
      modal_sub: "verified reviews (LinkedIn / PDF)",
      empty: "No testimonials found in this category.",
      filters_label: "Filter by category",
      filter_all: "All",
      filter_clients: "Clients",
      filter_management: "Management",
      filter_design: "Design",
      filter_product: "Product and tech",
      count_one: "{n} testimonial",
      count_other: "{n} testimonials",
      read_full: "Read the full testimonial",
      read_more: "Read more",
      read_less: "Show less",
      case_study_link: "Read the {name} case study",
      linkedin_profile: "{name} on LinkedIn",
      close: "Close",
      linkedin_cta_title: "More recommendations on LinkedIn",
      linkedin_cta_desc: "These testimonials are all published on LinkedIn. You'll find the full list there, along with articles on product design, Claude Code, and AI-driven workflows.",
      linkedin_cta_button: "View LinkedIn profile",
      crosslink_title: "Continue exploring",
      crosslink_approach_title: "How I work",
      crosslink_approach_desc: "My approach to product design: from strategic framing to shipped interfaces.",
      crosslink_projects_title: "Projects",
      crosslink_projects_desc: "Case studies and delivered products across SaaS, B2B, and public service."
    },
    contact: {
      title: "Let's work together",
      subtitle: "I'm available for freelance and consulting work. If you have a product to design or a design challenge to work through, get in touch.",
      email: "Send an email",
      book: "Book a 30min call",
      shoot_note: "Shoot me a note",
      copy_email: "Copy email address",
      email_copied: "Email copied!",
      linkedin: "LinkedIn",
      simple_form_title: "Send me a message",
      simple_form_subtitle: "I usually reply within 24 hours",
      simple_form_name: "Name",
      simple_form_name_placeholder: "Your name",
      simple_form_email: "Email",
      simple_form_email_placeholder: "your.email@example.com",
      simple_form_message: "Message",
      simple_form_message_placeholder: "Tell me about your project...",
      simple_form_budget: "Estimated budget",
      simple_form_budget_placeholder: "Select a range",
      simple_form_start_date: "Start date",
      simple_form_end_date: "End date",
      simple_form_copy_email: "Copy email",
      simple_form_copy_intro: "Prefer to reach out by email?",
      simple_form_submit: "Send",
      simple_form_sending: "Sending...",
      quote_button: "Get an estimate",
      quote_generator_title: "Request a Quote",
      quote_step_1_title: "What's your situation?",
      quote_step_1_startup: "Startup / MVP",
      quote_step_1_startup_desc: "Product in early stage",
      quote_step_1_established: "Established Company",
      quote_step_1_established_desc: "Optimize & scale",
      quote_step_1_longterm: "Long-Term Partnership",
      quote_step_1_longterm_desc: "6+ month engagement",
      quote_step_2_title: "Do you have a project brief?",
      quote_step_2_drag: "Drop your brief here",
      quote_step_2_or: "or",
      quote_step_2_browse: "Browse",
      quote_step_2_formats: "PDF or DOCX (max 3MB)",
      quote_step_2_skip: "Skip this step",
      quote_step_3_title: "What expertise do you need?",
      quote_step_3_service_1: "UX Framing & UI Design",
      quote_step_3_service_2: "Hi-fi Prototyping & Validation",
      quote_step_3_service_3: "MVP Build-out (Bolt, Lovable, Figma)",
      quote_step_3_service_4: "Design System & UI Kit",
      quote_step_3_service_5: "User Research & Testing",
      quote_step_3_service_6: "Product Strategy & Roadmap",
      quote_step_3_service_7: "Team Coaching & Mentoring",
      quote_step_3_service_8: "Workshop Facilitation",
      quote_step_4_title: "Tell us about your project",
      quote_step_4_need_label: "Do you have a sense of the need?",
      quote_step_4_need_placeholder: "Example: We need a dashboard for our B2B users...",
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
      quote_step_7_title: "Review your request",
      quote_step_7_project_type: "Project Type",
      quote_step_7_brief: "Attached Brief",
      quote_step_7_services: "Expertise",
      quote_step_7_project_details: "Project Details",
      quote_step_7_need: "Need",
      quote_step_7_description: "Description",
      quote_step_7_budget_timeline: "Budget & Timeline",
      quote_step_7_budget: "Budget",
      quote_step_7_start: "Start Date",
      quote_step_7_end: "End Date",
      quote_step_7_contact: "Contact Details",
      quote_step_7_edit: "Edit",
      quote_step_7_preview: "Preview",
      quote_step_7_download: "Download PDF",
      quote_step_7_send: "Send to Victor",
      quote_progress: "Step {current} of {total}",
      quote_next: "Next",
      quote_back: "Back",
      quote_skip: "Skip",
      quote_close: "Close",
      quote_confirm_close: "Are you sure? Your progress will be saved.",
      quote_success_title: "Request sent!",
      quote_success_message: "We'll get back to you within 24h",
      quote_success_new: "New request",
      quote_continue_draft: "Continue previous draft?",
      quote_continue_yes: "Continue",
      quote_continue_no: "Start over",
      quote_file_remove: "Remove file",
      quote_validation_select_type: "Please select a project type",
      quote_validation_select_service: "Please select at least one expertise",
      quote_validation_min_chars: "Please write at least 50 characters",
      quote_validation_required: "This field is required",
      quote_validation_email: "Please enter a valid email",
      quote_validation_file_size: "File size must be under 3MB",
      quote_validation_file_type: "Only PDF and DOCX files are allowed"
    },
    related: {
      keep_reading: "Keep reading",
      next_project: "Next project"
    },
    settings: {
      title: "Settings",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      accessibility: "Accessibility",
      normal: "Normal",
      contrast: "High Contrast",
      dyslexic: "Dyslexic-friendly"
    }
  },
  fr: {
    nav: {
      services: "Expertises",
      bio: "À propos",
      projects: "Projets",
      lab: "Lab",
      testimonials: "T\u00e9moignages",
      contact: "Contact",
      archive: "Galerie",
      blog: "Ressources",
      approach: "Approche",
      interventions: "Interventions"
    },
    hero: {
      availability: "Disponible pour collaborations et interventions",
      tagline: "Victor Soussan",
      title: "Lead Product Designer, IA",
      subtitle: "end-to-end",
      positioning: "Product Builder \u00b7 SaaS B2B & B2G \u00b7 Design Systems \u00b7 Design et prototypage IA \u00b7 Claude Code \u00b7 Figma MCP",
      desc: "Je con\u00e7ois des produits num\u00e9riques avec l\u2019IA, appliqu\u00e9e au design, \u00e0 la gestion de projet et au d\u00e9veloppement front. Je travaille avec les \u00e9quipes produit, du cadrage sur le terrain \u00e0 la mise en production.",
      descShort: "Je con\u00e7ois des produits num\u00e9riques avec l\u2019IA, appliqu\u00e9e au design, \u00e0 la gestion de projet et au d\u00e9veloppement front. Je travaille avec les \u00e9quipes produit, du cadrage sur le terrain \u00e0 la mise en production.",
      cta_projects: "Voir les projets",
      cta_guide: "Explorer le guide Claude Code",
      cta_book: "Planifier un appel de 30min",
      tooltip_title: "Besoin d\u2019un designer ou d\u2019un lead pour votre \u00e9quipe ?",
      tooltip_email: "Envoyer un message",
      tooltip_book: "Planifier un appel de 30min"
    },
    services: {
      title: "Expertises",
      subtitle: "Chaque mission prend une forme diff\u00e9rente. Certaines \u00e9quipes ont besoin d\u2019un partenaire strat\u00e9gique d\u00e8s le d\u00e9part, d\u2019autres d\u2019un designer op\u00e9rationnel. Je m\u2019adapte \u00e0 ce qui est le plus utile.",
      execution: "Ex\u00e9cution & Craft",
      utility: "Strat\u00e9gie Produit",
      efficiency: "Efficacit\u00e9 & Ops",
      impact: "Leadership",
      items: {
        execution: [
          "Design d\u2019interface (UI) propre et standardis\u00e9",
          "Prototypage haute-fidelit\u00e9 (du concept au test utilisateur)",
          "D\u00e9veloppement MVP rapide via Claude Code, Gemini & Vercel (auth, BDD, int\u00e9gration GenAI)",
          "Design mobile natif (iOS/Android) & Responsive Web"
        ],
        utility: [
          "Cadrage de fonctionnalit\u00e9s (0 to 1) et d\u00e9finition du scope",
          "Clarification de la vision produit et des parcours cl\u00e9s",
          "Animation d\u2019ateliers d\u2019id\u00e9ation & vision avec utilisateurs et clients",
          "Accessibilit\u00e9 et respect des standards ergonomiques"
        ],
        efficiency: [
          "Cr\u00e9ation et maintenance de Design Systems scalables",
          "Documentation technique pour le handoff d\u00e9veloppeur",
          "Optimisation des rituels de collaboration Tech/Produit"
        ],
        impact: [
          "Leadership d\u2019\u00e9quipe et recrutement de designers",
          "Animation d\u2019ateliers design pour renforcer collaboration et cr\u00e9ativit\u00e9",
          "Alignement des parties prenantes (C-Level, PM, Tech)",
          "Mentorat et mont\u00e9e en comp\u00e9tence des juniors"
        ]
      },
      homepage_pillars: [
        {
          title: "Design & Prototypage",
          desc: "Design d\u2019interface, prototypage haute fid\u00e9lit\u00e9 et d\u00e9veloppement produit rapide. Des premi\u00e8res esquisses aux \u00e9crans pr\u00eats \u00e0 impl\u00e9menter et \u00e0 tester avec les utilisateurs."
        },
        {
          title: "Strat\u00e9gie Produit",
          desc: "Vision produit, cadrage fonctionnel et ateliers d\u2019id\u00e9ation. Aider les \u00e9quipes \u00e0 clarifier ce qu\u2019elles construisent avant de s\u2019engager sur le comment."
        },
        {
          title: "Leadership & Ops",
          desc: "Construction d\u2019\u00e9quipe design, syst\u00e8mes de design et handoff d\u00e9veloppeurs. Des structures qui tiennent quand l\u2019\u00e9quipe et le produit grandissent."
        }
      ],
      cta_all: "Voir toutes les expertises"
    },
    visual_archive: {
      title: "Galerie",
      subtitle: "Interfaces, design systems et prototypes d\u2019interaction issus de mes projets.",
      filter_all: "Tout",
      filter_product: "Produit",
      filter_workshop: "Atelier",
      filter_brand: "Marque"
    },
    bio: {
      title: "\u00c0 Propos",
      subtitle: "Mon parcours, mon approche et mes ressources.",
      role: "Product Design Lead \u2022 Mentor \u2022 Strategist",
      exp: "15 Ans d\u2019Exp\u00e9rience",
      loc: "Bas\u00e9 \u00e0 Paris",
      value_prop: "Je vous aide \u00e0 livrer vite sans sacrifier la qualit\u00e9.",
      bullets: [
        "D\u00e9finir votre strat\u00e9gie produit sans vous noyer dans la doc",
        "Cr\u00e9er des prototypes haute-fid\u00e9lit\u00e9 interactifs pour valider vos id\u00e9es",
        "Collaborer directement avec les \u00e9quipes d\u2019engineering pour it\u00e9rer rapidement",
        "Construire et accompagner une \u00e9quipe design pr\u00eate pour r\u00e9ussir"
      ],
      p1: "Je con\u00e7ois des produits num\u00e9riques depuis 15 ans. J\u2019ai \u00e9volu\u00e9 de l\u2019agence au produit, en passant par les grands groupes m\u00e9dias et les startups hardware. Je ne cherche pas \u00e0 faire du \u2018beau\u2019, je cherche \u00e0 faire du \u2018fonctionnel\u2019 et du \u2018viable\u2019.",
      p2: "Quand une \u00e9quipe manque de cadre, de temps ou de relais c\u00f4t\u00e9 design, je prends ce qui manque\u00a0: le cadrage avec le terrain, le pilotage produit, le design system, parfois l\u2019\u00e9quipe design. Avec l\u2019IA, je montre un prototype l\u00e0 o\u00f9 l\u2019on r\u00e9digeait un document.",
      view_full_bio: "Voir mon Parcours Complet",
      view_executive: "Pr\u00e9sentation en 1-min",
      modal_title: "Biographie et Parcours",
      modal_title_short: "Bio",
      modal_subtitle: "15 ans \u00e0 construire des produits, 10 ans en design produit",
      close: "Fermer",
      toolkit_title: "Ma Bo\u00eete \u00e0 Outils",
      toolkit_desc: "Templates et m\u00e9thodes que j\u2019utilise au quotidien pour structurer le design et les workflows de conception.",
      journey_p1: "J\u2019ai d\u00e9marr\u00e9 ma carri\u00e8re en <strong>2005 chez Publicis Groupe</strong>, o\u00f9 j\u2019ai travaill\u00e9 sur des campagnes cr\u00e9atives pour des marques de luxe comme Herm\u00e8s, Leica et Helena Rubinstein. Cette exp\u00e9rience m\u2019a appris la puissance du storytelling visuel et l\u2019attention au d\u00e9tail.",
      journey_p2: "De <strong>2005 \u00e0 2014</strong>, j\u2019ai \u00e9volu\u00e9 de l\u2019imprim\u00e9 au digital, en tant que Directeur Artistique pour le Groupe Hommell Publications (direction d\u2019un magazine \u00e0 300 000 exemplaires mensuels) et en freelance pour des clients comme L\u2019Or\u00e9al, Orange et les Galeries Lafayette. Durant cette p\u00e9riode chez <strong>l\u2019agence Louis 21</strong>, j\u2019ai con\u00e7u le r\u00e9seau social interne d\u2019EADS pour 10 000 managers et cr\u00e9\u00e9 des applications mobiles pour de grandes marques, d\u00e9couvrant ainsi ma passion pour le design produit.",
      journey_p3: "En <strong>2014</strong>, j\u2019ai rejoint <strong>PagesJaunes</strong> en tant que Product Designer, o\u00f9 j\u2019ai appris \u00e0 designer \u00e0 grande \u00e9chelle. J\u2019ai redessin\u00e9 leurs applications iOS et Android (<strong>22 millions de t\u00e9l\u00e9chargements, 300 000 utilisateurs quotidiens</strong>) et construit leur premier design system cross-platform. J\u2019y ai \u00e9galement \u00e9volu\u00e9 vers un r\u00f4le de leadership, <strong>en manageant une \u00e9quipe de 4 UI designers</strong>.",
      journey_p4: "Chez <strong>Ogury (2016-2017)</strong> et <strong>Dailymotion (2017-2018)</strong>, je me suis sp\u00e9cialis\u00e9 dans les produits SaaS B2B. Chez Dailymotion, j\u2019ai con\u00e7u des outils pour \u00e9diteurs servant <strong>8 000+ utilisateurs et 50-100 \u00e9diteurs premium</strong> (CBS, ESPN, BBC), g\u00e9rant <strong>100 000+ vid\u00e9os par mois</strong>. J\u2019ai cr\u00e9\u00e9 leur premier UI Kit avec Storybook, \u00e9tablissant des workflows design-d\u00e9veloppement.",
      journey_p5: "Le chapitre le plus transformateur a commenc\u00e9 en <strong>2018 chez UNOWHY</strong>, o\u00f9 j\u2019ai pass\u00e9 6 ans (jusqu\u2019en d\u00e9c. 2024). J\u2019ai d\u00e9but\u00e9 comme Senior Designer et ai \u00e9volu\u00e9 vers un r\u00f4le de Product Lead, transformant SQOOL d\u2019un simple launcher Android en un <strong>\u00e9cosyst\u00e8me SaaS de 7 applications servant 500 000+ \u00e9l\u00e8ves dans 465 \u00e9tablissements</strong> en \u00cele-de-France.",
      journey_p6: "R\u00e9alisations cl\u00e9s chez UNOWHY :",
      journey_bullets: [
        "Direction de SQOOL Extend (machines virtuelles pour l\u2019\u00e9ducation) de 0 \u00e0 1, d\u00e9ploiement du MVP dans 5 \u00e9coles",
        "Livraison de SQOOL Protect (contr\u00f4le parental) en 3 mois avec flows interactifs et vid\u00e9o de d\u00e9mo",
        "<strong>Recrutement et management d\u2019une \u00e9quipe de 5 designers</strong>, mise en place des op\u00e9rations et processus design",
        "Cr\u00e9ation d\u2019un design system unifi\u00e9 sur 5 marques, qui a acc\u00e9l\u00e9r\u00e9 la livraison sur les cinq applications SQOOL",
        "Co-conception de 2 s\u00e9minaires strat\u00e9giques ex\u00e9cutifs d\u00e9finissant la roadmap 2027 de l\u2019entreprise"
      ],
      journey_p7: "En parall\u00e8le, j\u2019ai design\u00e9 pour <strong>Toolkit.ac (2023-2024)</strong>, une startup SaaS de gestion de chantier, en tant que premier product designer, contribuant \u00e0 fa\u00e7onner leur produit V2 servant 2 000 utilisateurs payants.",
      journey_p8: "De <strong>d\u00e9cembre 2024 \u00e0 juillet 2025</strong>, j\u2019ai rejoint <strong>beta.gouv.fr</strong> pour travailler sur France VAE, une innovation de service public. J\u2019ai design\u00e9 le MVP VAE collectif, conduit 10 entretiens utilisateurs, anim\u00e9 des ateliers design thinking de 2 jours et restructur\u00e9 leur workflow produit avec des cycles de livraison clairs.",
      journey_p9: "Depuis <strong>juillet 2025</strong>, j\u2019op\u00e8re en tant que <strong>Principal Designer</strong>, aidant les startups et entreprises avec le design produit 0-to-1, l\u2019optimisation UX et l\u2019int\u00e9gration IA. J\u2019explore \u00e9galement en profondeur l\u2019IA g\u00e9n\u00e9rative, cr\u00e9ation de GPTs personnalis\u00e9s, prototypage avec Bolt et Claude, et <strong>d\u00e9ploiement de 50+ applications web fonctionnelles</strong> via mon lab Condamine Apps.",
      journey_conclusion: "Ce qui me motive, c\u2019est transformer des probl\u00e8mes complexes en produits clairs et testables. Que ce soit designer pour 500 000 \u00e9l\u00e8ves, 8 000 utilisateurs B2B ou aider une startup \u00e0 trouver son product-market fit, j\u2019apporte une vision strat\u00e9gique ancr\u00e9e dans l\u2019ex\u00e9cution concr\u00e8te, le prototypage rapide et une focalisation sans rel\u00e2che sur ce qui fonctionne r\u00e9ellement.",
      tools_title: "Outils",
      education_title: "Formation & Certifications",
      education_master_title: "Master en Communication & Multim\u00e9dia",
      education_master_school: "ISCOM Paris (2001-2005)",
      education_ux_title: "UX/UI Design & Prototypage",
      education_ux_school: "Certification UXcel / Udemy (2021)",
      timeline: {
        "2026": [
          "Lancement d\u2019un <strong>programme de formation \u00e0 l\u2019IA g\u00e9n\u00e9rative</strong> pour entrepreneurs, \u00e9quipes produits et designers",
          "Poursuite de l\u2019exp\u00e9rimentation sur le <strong>prototypage assist\u00e9 par l\u2019IA</strong> et industrialisation de ce mode de conception",
          "Objectif : D\u00e9ployer <strong>100+ applications</strong> avec Condamine Apps"
        ],
        "2025": [
          "Lancement de <strong>Condamine Apps</strong> \u2013 50+ applications web prototyp\u00e9es et d\u00e9ploy\u00e9es",
          "Rejoint <strong>beta.gouv.fr</strong> en tant que Lead Product Designer pour France VAE",
          "Cr\u00e9ation de <strong>Victor Soussan Design</strong> en tant que Principal Designer"
        ],
        "2024": [
          "Design de <strong>Toolkit.ac V2</strong> (SaaS construction, 2 000+ utilisateurs)",
          "Livraison de <strong>SQOOL Protect</strong> (contr\u00f4le parental) en 3 mois chez UNOWHY",
          "Fin de 6 ans chez UNOWHY (500K+ utilisateurs, 465 \u00e9tablissements)"
        ],
        "2023": [
          "Direction de <strong>SQOOL Extend</strong> (machines virtuelles \u00e9ducatives) de 0 \u00e0 1",
          "Rejoint <strong>Toolkit.ac</strong> en tant que Premier Product Designer",
          "Promotion <strong>Product Lead</strong> chez UNOWHY"
        ],
        "2022": [
          "Exp\u00e9rimentation <strong><a href=\"https://www.notion.so/victor-soussan/Exp-rimentation-IA-et-ChatGPT-2022-1aaa519b0dea8085afd5e56f8893ba91\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-pink-600 hover:underline\">IA avec ChatGPT</a></strong>",
          "Lancement de la marque <strong>Hi SQOOL</strong> avec identit\u00e9 compl\u00e8te"
        ],
        "2020-2021": [
          "Promotion <strong>Design Lead</strong> chez UNOWHY",
          "Transformation de SQOOL d\u2019un launcher Android en <strong>\u00e9cosyst\u00e8me SaaS de 5 apps</strong>",
          "Recrutement et formation d\u2019une <strong>\u00e9quipe de 5 designers</strong>"
        ],
        "2018-2019": [
          "Rejoint <strong>UNOWHY</strong> en tant qu\u2019UX/UI Designer Senior",
          "Conception de solutions pour <strong>465 lyc\u00e9es Ile-de-France (500 000 \u00e9quipements)</strong>"
        ],
        "2017-2018": [
          "Senior Product Designer chez <strong>Dailymotion</strong> (8K+ utilisateurs, 50-100 \u00e9diteurs premium)",
          "Cr\u00e9ation du premier <strong>UI Kit avec Storybook</strong>, g\u00e9rant 100K+ vid\u00e9os/mois"
        ],
        "2016-2017": [
          "Product Designer chez <strong>Ogury</strong> (dashboards ad-tech)"
        ],
        "2014-2016": [
          "Lead UI/UX Designer chez <strong>PagesJaunes</strong>",
          "Refonte des apps iOS & Android (<strong>22M t\u00e9l\u00e9chargements, 300K utilisateurs/jour</strong>)",
          "Construction du premier <strong>design system cross-platform</strong>",
          "Management d\u2019une \u00e9quipe de <strong>4 UI designers</strong>"
        ],
        "2010-2014": [
          "Directeur Artistique chez <strong>Groupe Hommell Publications</strong> (300K ex. mensuels)",
          "Directeur de Cr\u00e9ation Freelance pour <strong>L\u2019Or\u00e9al, Orange, Galeries Lafayette</strong>",
          "Conception du r\u00e9seau social interne EADS chez <strong>Louis 21</strong> (10K managers)",
          "Cr\u00e9ation d\u2019applications mobiles pour grandes marques"
        ],
        "2005-2010": [
          "D\u00e9buts chez <strong>Publicis Groupe</strong> (Herm\u00e8s, Leica, Helena Rubinstein)",
          "Directeur Artistique pour campagnes marques de luxe",
          "Sp\u00e9cialisation storytelling visuel et design premium"
        ]
      }
    },
    resume: {
      title: "Victor Soussan, Lead Product Designer",
      contact: "victorsoussan@gmail.com \u2022 +33 6 15 98 94 00 \u2022 Paris, France",
      linkedin: "linkedin.com/in/victorsoussan-product-design",
      portfolio: "https://victorsoussan-portfolio-2026.vercel.app",
      summary_title: "R\u00e9sum\u00e9 Professionnel",
      summary: "Lead Product Designer, 15 ans d’expérience en SaaS B2B, B2G et interfaces métier complexes. Cadrage avec un PM, livraison avec un développeur, ou directement avec Claude Code et Figma MCP. Suite SQOOL : 7 applications, 500 000 élèves, équipe de 5 designers. Outils publishers de Dailymotion : 8 000+ utilisateurs. France VAE pour beta.gouv. Applications mobiles PagesJaunes : 22 millions de téléchargements. Disponible en mission freelance et en CDI (Head of Design, Design Lead).",
      experience_title: "Exp\u00e9rience Professionnelle",
      experience: resumeExperience('fr'),
      skills_title: "Comp\u00e9tences Cl\u00e9s",
      skills: ["Strat\u00e9gie & Vision Produit", "Design Produit 0-to-1", "Design Systems & Op\u00e9rations", "Leadership d\u2019\u00c9quipe (jusqu\u2019\u00e0 5 designers)", "Recherche UX & Entretiens Utilisateurs", "Prototypage Hi-Fi (Figma, Bolt, Lovable)", "Workflows Design Assist\u00e9s par IA", "SaaS B2B & Logiciels d\u2019Entreprise", "Collaboration Design-Dev"],
      tools_title: "Outils & Technologies",
      tools: "Figma, FigJam, Adobe Suite, Sketch, Notion, Slack, Linear, ChatGPT, Claude, Midjourney, Bolt, Lovable, Storybook, HTML/CSS",
      education_title: "Formation & Certifications",
      education: ["Master Communication & Multim\u00e9dia, ISCOM Paris (2001-2005)", "UX/UI Design & Prototypage, UXcel / Udemy (2021)"],
      languages_title: "Langues",
      languages: "Fran\u00e7ais (natif) \u2022 Anglais (professionnel complet) \u2022 Espagnol (professionnel)",
      download_btn: "T\u00e9l\u00e9charger PDF",
      print_btn: "Imprimer",
      copy_btn: "Copier le texte",
      copied_message: "Copi\u00e9 dans le presse-papier !",
      switch_lang: "Passer en Anglais"
    },
    projects: {
      title: "\u00c9tudes de Cas",
      subtitle: "Projets r\u00e9cents : du SaaS B2B complexe \u00e0 l\u2019application grand public.",
      missions: "Mes responsabilit\u00e9s",
      system: "Approche Syst\u00e8me",
      deliverables: "Ce que j\u2019ai livr\u00e9",
      read_more: "Lire le case study complet",
      view_all: "Voir tous les projets"
    },
    homepage_visual_archive: {
      title: "Galerie",
      subtitle: "Une s\u00e9lection d\u2019interfaces, de design systems et de prototypes d\u2019interaction issus de mes projets.",
      cta: "Parcourir la galerie compl\u00e8te",
    },
    signals: {
      title: "Blog",
      subtitle: "R\u00e9flexions sur le design produit, le leadership et la m\u00e9thodologie.",
      cta: "Tous les articles",
    },
    testimonials: {
      title: "T\u00e9moignages",
      title_short: "Avis",
      subtitle: "Ce que mes clients, managers et \u00e9quipes disent de notre collaboration.",
      view_all: "Voir les 14 T\u00e9moignages",
      modal_title: "Tous les T\u00e9moignages",
      modal_sub: "avis v\u00e9rifi\u00e9s (LinkedIn / PDF)",
      empty: "Aucun témoignage trouvé dans cette catégorie.",
      filters_label: "Filtrer par catégorie",
      filter_all: "Tous",
      filter_clients: "Clients",
      filter_management: "Management",
      filter_design: "Design",
      filter_product: "Produit et tech",
      count_one: "{n}\u00a0témoignage",
      count_other: "{n}\u00a0témoignages",
      read_full: "Lire le témoignage complet",
      read_more: "Lire la suite",
      read_less: "Voir moins",
      case_study_link: "Lire l’étude de cas {name}",
      linkedin_profile: "{name} sur LinkedIn",
      close: "Fermer",
      linkedin_cta_title: "D'autres recommandations sur LinkedIn",
      linkedin_cta_desc: "Ces témoignages sont tous publiés sur LinkedIn. Vous y trouverez la liste complète, ainsi que des articles sur le product design, Claude Code et les workflows augmentés par l'IA.",
      linkedin_cta_button: "Voir le profil LinkedIn",
      crosslink_title: "Continuer l'exploration",
      crosslink_approach_title: "Mon approche",
      crosslink_approach_desc: "Ma méthode de product design : du cadrage stratégique aux interfaces livrées.",
      crosslink_projects_title: "Projets",
      crosslink_projects_desc: "Études de cas et produits livrés en SaaS, B2B et service public."
    },
    contact: {
      title: "Travaillons ensemble",
      subtitle: "Je suis disponible pour des missions freelance et du conseil. Si vous avez un produit \u00e0 concevoir ou un d\u00e9fi design \u00e0 relever, contactez-moi.",
      email: "Envoyer un email",
      book: "R\u00e9server un appel de 30min",
      shoot_note: "Envoyer un message",
      copy_email: "Copier l\u2019adresse email",
      email_copied: "Email copi\u00e9 !",
      linkedin: "LinkedIn",
      simple_form_title: "Envoyez-moi un message",
      simple_form_subtitle: "Je r\u00e9ponds g\u00e9n\u00e9ralement sous 24h",
      simple_form_name: "Nom",
      simple_form_name_placeholder: "Votre nom",
      simple_form_email: "Email",
      simple_form_email_placeholder: "votre.email@exemple.fr",
      simple_form_message: "Message",
      simple_form_message_placeholder: "Parlez-moi de votre projet...",
      simple_form_budget: "Budget estim\u00e9",
      simple_form_budget_placeholder: "S\u00e9lectionnez une fourchette",
      simple_form_start_date: "Date de d\u00e9but",
      simple_form_end_date: "Date de fin",
      simple_form_copy_email: "Copier l\u2019email",
      simple_form_copy_intro: "Vous souhaitez envoyer un email de votre cot\u00e9",
      simple_form_submit: "Envoyer",
      simple_form_sending: "Envoi en cours...",
      quote_button: "Obtenir une estimation",
      quote_generator_title: "Demander un Devis",
      quote_step_1_title: "Quelle est votre situation ?",
      quote_step_1_startup: "Startup / MVP",
      quote_step_1_startup_desc: "Produit en phase early stage",
      quote_step_1_established: "Entreprise \u00c9tablie",
      quote_step_1_established_desc: "Optimiser & scaler",
      quote_step_1_longterm: "Partenariat Long Terme",
      quote_step_1_longterm_desc: "Engagement 6+ mois",
      quote_step_2_title: "Avez-vous un brief projet ?",
      quote_step_2_drag: "D\u00e9posez votre brief ici",
      quote_step_2_or: "ou",
      quote_step_2_browse: "Parcourir",
      quote_step_2_formats: "PDF ou DOCX (max 3Mo)",
      quote_step_2_skip: "Passer cette \u00e9tape",
      quote_step_3_title: "De quelles expertises avez-vous besoin ?",
      quote_step_3_service_1: "Cadrage UX & Design UI",
      quote_step_3_service_2: "Prototypage haute-fid\u00e9lit\u00e9 & validation",
      quote_step_3_service_3: "Build-out MVP (Bolt, Lovable, Figma)",
      quote_step_3_service_4: "Design system & UI Kit",
      quote_step_3_service_5: "Recherche & tests utilisateurs",
      quote_step_3_service_6: "Strat\u00e9gie produit & roadmap",
      quote_step_3_service_7: "Coaching & mentoring d\u2019\u00e9quipe",
      quote_step_3_service_8: "Animation d\u2019ateliers",
      quote_step_4_title: "Parlez-nous de votre projet",
      quote_step_4_need_label: "Avez-vous une id\u00e9e du besoin ?",
      quote_step_4_need_placeholder: "Exemple : Nous avons besoin d\u2019un dashboard pour nos utilisateurs B2B...",
      quote_step_4_desc_label: "D\u00e9crivez votre projet *",
      quote_step_4_desc_placeholder: "Parlez-nous de vos objectifs, d\u00e9fis, et \u00e0 quoi ressemble le succ\u00e8s...",
      quote_step_4_chars: "caract\u00e8res",
      quote_step_4_min_chars: "Minimum 50 caract\u00e8res",
      quote_step_5_title: "Budget & Planning",
      quote_step_5_budget_label: "Budget estim\u00e9",
      quote_step_5_budget_placeholder: "S\u00e9lectionnez une fourchette",
      quote_step_5_start_label: "Date de d\u00e9but souhait\u00e9e",
      quote_step_5_end_label: "Date de fin ou dur\u00e9e",
      quote_step_6_title: "Vos coordonn\u00e9es",
      quote_step_6_name_label: "Nom *",
      quote_step_6_name_placeholder: "Votre nom",
      quote_step_6_email_label: "Email *",
      quote_step_6_email_placeholder: "votre.email@exemple.fr",
      quote_step_6_company_label: "Entreprise",
      quote_step_6_company_placeholder: "Nom de votre entreprise",
      quote_step_6_phone_label: "T\u00e9l\u00e9phone",
      quote_step_6_phone_placeholder: "+33 6 12 34 56 78",
      quote_step_7_title: "Revue de votre demande",
      quote_step_7_project_type: "Type de Projet",
      quote_step_7_brief: "Brief Joint",
      quote_step_7_services: "Expertises",
      quote_step_7_project_details: "D\u00e9tails du Projet",
      quote_step_7_need: "Besoin",
      quote_step_7_description: "Description",
      quote_step_7_budget_timeline: "Budget & Planning",
      quote_step_7_budget: "Budget",
      quote_step_7_start: "Date de D\u00e9but",
      quote_step_7_end: "Date de Fin",
      quote_step_7_contact: "Coordonn\u00e9es",
      quote_step_7_edit: "Modifier",
      quote_step_7_preview: "Aper\u00e7u",
      quote_step_7_download: "T\u00e9l\u00e9charger PDF",
      quote_step_7_send: "Envoyer \u00e0 Victor",
      quote_progress: "\u00c9tape {current} sur {total}",
      quote_next: "Suivant",
      quote_back: "Retour",
      quote_skip: "Passer",
      quote_close: "Fermer",
      quote_confirm_close: "\u00cates-vous s\u00fbr ? Votre progression sera sauvegard\u00e9e.",
      quote_success_title: "Demande envoy\u00e9e !",
      quote_success_message: "Nous vous recontacterons sous 24h",
      quote_success_new: "Nouvelle demande",
      quote_continue_draft: "Continuer le brouillon pr\u00e9c\u00e9dent ?",
      quote_continue_yes: "Continuer",
      quote_continue_no: "Recommencer",
      quote_file_remove: "Supprimer le fichier",
      quote_validation_select_type: "Veuillez s\u00e9lectionner un type de projet",
      quote_validation_select_service: "Veuillez s\u00e9lectionner au moins une expertise",
      quote_validation_min_chars: "Veuillez \u00e9crire au moins 50 caract\u00e8res",
      quote_validation_required: "Ce champ est requis",
      quote_validation_email: "Veuillez entrer un email valide",
      quote_validation_file_size: "La taille du fichier doit \u00eatre inf\u00e9rieure \u00e0 3Mo",
      quote_validation_file_type: "Seuls les fichiers PDF et DOCX sont autoris\u00e9s"
    },
    related: {
      keep_reading: "Pour continuer",
      next_project: "Projet suivant"
    },
    settings: {
      title: "Param\u00e8tres",
      language: "Langue",
      theme: "Th\u00e8me",
      light: "Clair",
      dark: "Sombre",
      system: "Syst\u00e8me",
      accessibility: "Accessibilit\u00e9",
      normal: "Normal",
      contrast: "Contraste \u00e9lev\u00e9",
      dyslexic: "Mode dyslexique"
    }
  }
} as const;
