// Bilingual translations (EN/FR) for the portfolio
// Extracted from App.tsx for maintainability

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
      blog: "Blog"
    },
    hero: {
      availability: "Available for new projects",
      tagline: "Frame. Design. Ship.",
      title: "Lead Product Designer",
      subtitle: "end-to-end",
      positioning: "SaaS B2B & B2G · Complex business interfaces · Design Systems · AI-driven design & prototyping",
      desc: "15 years in tech, 10 in product design. I help teams frame the problem, materialize the product vision through prototypes, and ship in short cycles. I work alongside PM and engineering to build what lasts: design systems, documented components, and shared practices that let the team scale without dependency. I use Claude Code and Figma MCP to go from concept to deployed prototype in hours.",
      cta_projects: "My 1-min Presentation",
      cta_book: "Book a 30min Call",
      tooltip_title: "Need a Design Partner?",
      tooltip_email: "Shoot me a note",
      tooltip_book: "Book a 30min Chat"
    },
    services: {
      title: "Expertise",
      subtitle: "From early ambiguity to clear form, I partner with product teams to define what the product should be, its logic, its look, and the way people experience it.",
      execution: "Hands-on Execution",
      utility: "Product Utility",
      efficiency: "Operational Efficiency",
      impact: "Organizational Impact",
      items: {
        execution: [
          "UX framing, UI design, micro-interactions",
          "Hi-fi prototyping to validate ideas and sell a vision",
          "Rapid MVP development using Claude Code, Gemini & Vercel (auth, DB, GenAI integration)",
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
      },
      homepage_pillars: [
        {
          title: "Design & Prototyping",
          desc: "Interface design, hi-fi prototyping, and rapid MVP development. From concept to tested screens, with AI-assisted workflows."
        },
        {
          title: "Product Strategy",
          desc: "Product vision, feature scoping, ideation workshops. Working alongside PMs to move from ambiguity to a clear, validated direction."
        },
        {
          title: "Leadership & Ops",
          desc: "Design team building, design systems, dev handoff rituals. Practices that scale and stick."
        }
      ],
      cta_all: "Explore my expertise"
    },
    services_page: {
      page_title: "Expertise",
      page_subtitle: "From ambiguity to shipped product",
      page_intro: "I work with product teams, startups and public services to reduce risk through design. Whether you need an end-to-end designer, a strategic partner, or someone to structure your design practice, here is what I bring.",
      pillars: [
        {
          title: "Design & Prototyping",
          desc: "I design interfaces from wireframe to pixel-perfect screens, then prototype them at high fidelity to validate ideas before a single line of code is written. When speed matters, I build functional MVPs using Claude Code and Vercel, and I use Figma MCP to generate production-ready components directly from my design files.",
          deliverables: [
            "UX framing, UI design, micro-interactions",
            "Hi-fi prototyping to validate ideas and sell a vision",
            "AI-driven prototyping: Figma to deployed prototype via Claude Code and Figma MCP",
            "Rapid MVP development shipped to Vercel for stakeholder validation",
            "Mobile native (iOS/Android) and responsive web design",
            "Concept-to-interface workflows in complex domains"
          ]
        },
        {
          title: "Product Strategy",
          desc: "Before designing screens, I help clarify what the product should be. I facilitate workshops, define feature scope, and shape the vision through interaction-first thinking. The goal is always to reduce ambiguity and align the team.",
          deliverables: [
            "Feature scoping (0 to 1) and product roadmap input",
            "Product vision clarification through key user journeys",
            "Ideation and vision workshops with users and stakeholders",
            "Accessibility strategy and inclusive UX standards"
          ]
        },
        {
          title: "Design Ops",
          desc: "A great design system isn't a component library. It's a shared language between design and engineering. I set up the tools, documentation, and rituals that make collaboration efficient and sustainable.",
          deliverables: [
            "Scalable design systems and reusable component libraries",
            "Technical documentation for developer handoff",
            "Collaboration rituals between design, product, and engineering"
          ]
        },
        {
          title: "Leadership & Organization",
          desc: "I've hired, managed, and mentored design teams of up to 5 people. I align stakeholders, run design workshops, and build the culture and processes that let a design practice thrive within an organization.",
          deliverables: [
            "Team leadership, hiring, and designer onboarding",
            "Design workshops for collaboration and creativity",
            "Stakeholder alignment (C-Level, PM, Engineering)",
            "Mentoring and junior designer growth"
          ]
        }
      ],
      approach_title: "How I Work",
      approach_steps: [
        { title: "Frame", desc: "Understand the problem, the users, the constraints. Align the team on what we're solving and why." },
        { title: "Design", desc: "Explore solutions, prototype fast, test with real users. Iterate until we've validated the direction." },
        { title: "Ship", desc: "Collaborate with engineering, refine details, deliver production-ready designs. Stay involved until launch." },
        { title: "Scale", desc: "Document patterns, build the system, establish rituals. Ensure what works today holds at 10x." }
      ],
      cta_text: "Let's talk about your project"
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
      p2: "My profile is hybrid: I can define a roadmap with a CEO, manage a team of designers, and open Figma to produce dev-ready mockups. I understand technical constraints and speak the language of developers.",
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
      journey_p5: "The most transformative chapter began in <strong>2018 at UNOWHY</strong>, where I spent 6 years (until Dec 2024). I started as a Senior Designer and evolved into a Product Lead role, transforming SQOOL from a simple Android launcher into a <strong>5-app SaaS ecosystem serving 500,000+ students across 465 schools</strong> in \u00cele-de-France.",
      journey_p6: "Key achievements at UNOWHY:",
      journey_bullets: [
        "Led SQOOL Extend (virtual machines for education) from 0-to-1, deploying MVP to 5 schools",
        "Shipped SQOOL Protect (parental control) in 3 months with interactive flows and demo video",
        "<strong>Hired and managed a team of 5 designers</strong>, establishing design operations and processes",
        "Built unified design system across 5 brands, reducing design time by 60%",
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
          "Designing solutions for <strong>465 \u00cele-de-France high schools (300,000 devices)</strong>"
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
      title: "Victor Soussan \u2013 Lead Product Design",
      contact: "victorsoussan@gmail.com \u2022 +33 6 15 98 94 00 \u2022 Paris, France",
      linkedin: "linkedin.com/in/victorsoussan",
      portfolio: "https://victorsoussan-portfolio-2026.vercel.app",
      summary_title: "Professional Summary",
      summary: "Lead Product Design with 15 years of tech experience and 10 years of design leadership for enterprise software, education, media, and public services. Expert in 0-to-1 product design, design systems, team building, and AI-assisted prototyping. Track record: products serving 500K+ users and teams of 5+ designers.",
      experience_title: "Professional Experience",
      experience: [
        {
          period: "Jul 2025 \u2013 Present",
          role: "Principal Designer (Freelance)",
          company: "Independent Practice",
          achievements: [
            "Launched Condamine Apps \u2013 50+ functional web apps prototyped and deployed",
            "Exploring AI-assisted design workflows with custom GPTs and rapid prototyping tools",
            "Consulting startups on product strategy, UX optimization, and AI integration"
          ]
        },
        {
          period: "Dec 2024 \u2013 Jul 2025",
          role: "Product Designer",
          company: "beta.gouv.fr (France VAE)",
          achievements: [
            "Designed the collective VAE MVP for public service innovation",
            "Conducted 10 user interviews and ran 2-day design thinking workshops",
            "Restructured product workflow with clear delivery cycles"
          ]
        },
        {
          period: "Jan 2018 \u2013 Dec 2024",
          role: "Product Lead & Design Manager",
          company: "UNOWHY (SQOOL Education Platform)",
          achievements: [
            "Transformed SQOOL from Android launcher to 5-app SaaS ecosystem for 500K+ students across 465 schools",
            "Co-led the product design team with the CPO, member of the Executive Committee for 1 year (authored slides, attended biweekly committees)",
            "Led SQOOL Extend (virtual machines) from 0-to-1, deployed MVP to 5 schools",
            "Shipped SQOOL Protect (parental control) in 3 months with interactive flows",
            "Built and managed a team of 5 designers, established design operations",
            "Created unified design system across 5 brands, reducing design time by 60%",
            "Co-designed 2 executive strategy offsites defining the 2027 roadmap"
          ]
        },
        {
          period: "Feb 2023 \u2013 Dec 2024",
          role: "Product Designer",
          company: "Toolkit.ac (Construction SaaS)",
          achievements: [
            "First product designer for construction management startup",
            "Structured V2 product serving 2,000 paying users",
            "Established design-development workflows"
          ]
        },
        {
          period: "Sep 2017 \u2013 Jan 2018",
          role: "Senior Product Designer",
          company: "Dailymotion",
          achievements: [
            "Designed publisher tools for 8,000+ users and 50-100 premium publishers (CBS, ESPN, BBC)",
            "Handled 100,000+ videos per month",
            "Created the first UI Kit with Storybook, establishing design-development workflows"
          ]
        },
        {
          period: "Sep 2016 \u2013 Sep 2017",
          role: "Product Designer",
          company: "Ogury (AdTech)",
          achievements: [
            "Specialized in B2B SaaS product design",
            "Designed analytics and campaign management tools"
          ]
        },
        {
          period: "Jan 2014 \u2013 Sep 2016",
          role: "Product Designer & Team Lead",
          company: "PagesJaunes (Solocal Group)",
          achievements: [
            "Redesigned iOS and Android apps (22M downloads, 300K daily users)",
            "Built the first cross-platform design system",
            "Managed a team of 4 UI designers"
          ]
        },
        {
          period: "2010 \u2013 2014",
          role: "Art Director & Freelance Creative Director",
          company: "Groupe Hommell Publications / Freelance",
          achievements: [
            "Art Director for 300K monthly copy magazine",
            "Freelance Creative Director for L'Or\u00e9al, Orange, Galeries Lafayette",
            "Designed EADS internal social network at Louis 21 (10K managers)"
          ]
        },
        {
          period: "2005 \u2013 2010",
          role: "Art Director",
          company: "Publicis Groupe",
          achievements: [
            "Creative campaigns for Herm\u00e8s, Leica, Helena Rubinstein",
            "Specialized in visual storytelling and premium design"
          ]
        }
      ],
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
        "Master in Communication & Multimedia \u2013 ISCOM Paris (2001-2005)",
        "UX/UI Design & Prototyping \u2013 UXcel / Udemy (2021)"
      ],
      languages_title: "Languages",
      languages: "French (Native) \u2022 English (Fluent)",
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
    lab: {
      tag: "R&D and Experimentation",
      title: "Condamine Studio",
      desc: "My personal space for testing the boundaries of generative AI. I explore how these tools can accelerate product design and development.",
      apps_title: "Condamine Apps",
      apps_sub: "50+ Apps Deployed",
      apps_desc: "A gallery of functional prototypes (React/Web) generated by AI. Proof that you can go from idea to product in a few hours.",
      apps_cta: "See the Apps",
      learning_title: "Condamine Learning",
      learning_sub: "Knowledge Transfer",
      learning_desc: "Training and resources to help Designers and PMs ride the AI wave instead of being swept away by it.",
      learning_cta: "Explore Courses",
      agents_title: "Agents & Prompts",
      agents_sub: "System Engineering",
      agents_desc: "My Notion database of prompts and custom GPTs configured to automate repetitive design tasks.",
      agents_cta: "Access the Database",
      art_title: "AI Art Gallery",
      art_sub: "Midjourney V6",
      art_desc: "Purely visual exploration. Composition, light, and synthetically generated texture.",
      art_cta: "View the Gallery"
    },
    homepage_about: {
      title: "About",
      text: "I've been designing digital products for nearly twenty years, from advertising agencies to enterprise software, EdTech platforms, and public services. I've led design teams, worked hand in hand with product managers and engineers, and shipped products used by hundreds of thousands of people.",
      cta: "Full journey",
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
      close: "Close"
    },
    contact: {
      title: "Looking for a fast and experienced designer?",
      subtitle: "I'm open to Product Design freelance missions or Lead roles (permanent). Let's talk concretely about your needs.",
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
      simple_form_copy_intro: "Want to send an email on your own",
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
      bio: "A propos",
      projects: "\u00c9tudes de Cas",
      lab: "Lab",
      testimonials: "T\u00e9moignages",
      contact: "Contact",
      archive: "Galerie",
      blog: "Blog"
    },
    hero: {
      availability: "Disponible pour de nouvelles missions",
      tagline: "Frame. Design. Ship.",
      title: "Lead Product Designer",
      subtitle: "end-to-end",
      positioning: "SaaS B2B & B2G \u00b7 Interfaces m\u00e9tier complexes \u00b7 Design Systems \u00b7 Design et prototypage pilot\u00e9s par IA",
      desc: "15 ans dans la tech, 10 en design produit. J\u2019accompagne les \u00e9quipes \u00e0 cadrer le probl\u00e8me, mat\u00e9rialiser la vision produit par des prototypes, et livrer en cycles courts. Je travaille avec le PM et l\u2019engineering pour construire ce qui dure : design systems, composants document\u00e9s, pratiques partag\u00e9es qui permettent \u00e0 l\u2019\u00e9quipe de scaler sans d\u00e9pendance. J\u2019utilise Claude Code et Figma MCP pour passer du concept au prototype d\u00e9ploy\u00e9 en quelques heures.",
      cta_projects: "Ma pr\u00e9sentation en 1-min",
      cta_book: "Planifier un appel de 30min",
      tooltip_title: "Besoin d\u2019un designer ou d\u2019un lead pour votre \u00e9quipe ?",
      tooltip_email: "Envoyer un message",
      tooltip_book: "Planifier un appel de 30min"
    },
    services: {
      title: "Expertises",
      subtitle: "Du flou initial \u00e0 la forme claire, je travaille avec les \u00e9quipes produit pour d\u00e9finir ce que le produit doit \u00eatre, sa logique, son apparence, et la mani\u00e8re dont les gens l\u2019utilisent.",
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
          desc: "Design d\u2019interface, prototypage haute fid\u00e9lit\u00e9 et d\u00e9veloppement MVP rapide. Du concept aux \u00e9crans test\u00e9s, avec des workflows assist\u00e9s par IA."
        },
        {
          title: "Strat\u00e9gie Produit",
          desc: "Vision produit, cadrage fonctionnel, ateliers d\u2019id\u00e9ation. En bin\u00f4me avec les PM pour passer de l\u2019ambigu\u00eft\u00e9 \u00e0 une direction claire et valid\u00e9e."
        },
        {
          title: "Leadership & Ops",
          desc: "Construction d\u2019\u00e9quipe design, design systems, rituels de handoff. Des pratiques qui tiennent et qui passent \u00e0 l\u2019\u00e9chelle."
        }
      ],
      cta_all: "Voir toutes les expertises"
    },
    services_page: {
      page_title: "Expertises",
      page_subtitle: "Du flou au produit livr\u00e9",
      page_intro: "J\u2019accompagne les \u00e9quipes produit, les startups et les services publics pour r\u00e9duire le risque par le design. Que vous cherchiez un designer end-to-end, un partenaire strat\u00e9gique ou quelqu\u2019un pour structurer votre pratique design, voici ce que j\u2019apporte.",
      pillars: [
        {
          title: "Design & Prototypage",
          desc: "Je con\u00e7ois les interfaces du wireframe \u00e0 l\u2019\u00e9cran pixel-perfect, puis je les prototype en haute fid\u00e9lit\u00e9 pour valider les id\u00e9es avant la moindre ligne de code. Quand la vitesse compte, je construis des MVP fonctionnels avec Claude Code et Vercel, et j\u2019utilise Figma MCP pour g\u00e9n\u00e9rer des composants production-ready directement depuis mes fichiers Figma.",
          deliverables: [
            "Cadrage UX, design UI, micro-interactions",
            "Prototypage haute fid\u00e9lit\u00e9 pour valider et vendre une vision",
            "Prototypage pilot\u00e9 par IA : de Figma au prototype d\u00e9ploy\u00e9 via Claude Code et Figma MCP",
            "D\u00e9veloppement MVP rapide d\u00e9ploy\u00e9 sur Vercel pour validation parties prenantes",
            "Design mobile natif (iOS/Android) et responsive web",
            "Workflows concept-to-interface dans des domaines complexes"
          ]
        },
        {
          title: "Strat\u00e9gie Produit",
          desc: "Avant de dessiner des \u00e9crans, j\u2019aide \u00e0 clarifier ce que le produit doit \u00eatre. J\u2019anime des ateliers, je d\u00e9finis le scope des fonctionnalit\u00e9s et je structure la vision par le design d\u2019interaction. L\u2019objectif : r\u00e9duire l\u2019ambigu\u00eft\u00e9 et aligner l\u2019\u00e9quipe.",
          deliverables: [
            "Cadrage de fonctionnalit\u00e9s (0 to 1) et contribution \u00e0 la roadmap",
            "Clarification de la vision produit par les parcours utilisateurs cl\u00e9s",
            "Ateliers d\u2019id\u00e9ation et de vision avec utilisateurs et parties prenantes",
            "Strat\u00e9gie d\u2019accessibilit\u00e9 et standards UX inclusifs"
          ]
        },
        {
          title: "Design Ops",
          desc: "Un bon design system n\u2019est pas une biblioth\u00e8que de composants. C\u2019est un langage commun entre le design et l\u2019engineering. Je mets en place les outils, la documentation et les rituels qui rendent la collaboration efficace et durable.",
          deliverables: [
            "Design systems scalables et biblioth\u00e8ques de composants r\u00e9utilisables",
            "Documentation technique pour le handoff d\u00e9veloppeur",
            "Rituels de collaboration entre design, produit et engineering"
          ]
        },
        {
          title: "Leadership & Organisation",
          desc: "J\u2019ai recrut\u00e9, manag\u00e9 et mentor\u00e9 des \u00e9quipes design jusqu\u2019\u00e0 5 personnes. J\u2019aligne les parties prenantes, j\u2019anime des ateliers design et je construis la culture et les process qui permettent \u00e0 une pratique design de s\u2019\u00e9panouir dans une organisation.",
          deliverables: [
            "Leadership d\u2019\u00e9quipe, recrutement et onboarding de designers",
            "Ateliers design pour la collaboration et la cr\u00e9ativit\u00e9",
            "Alignement des parties prenantes (C-Level, PM, Engineering)",
            "Mentorat et mont\u00e9e en comp\u00e9tence des juniors"
          ]
        }
      ],
      approach_title: "Comment je travaille",
      approach_steps: [
        { title: "Frame", desc: "Comprendre le probl\u00e8me, les utilisateurs, les contraintes. Aligner l\u2019\u00e9quipe sur ce qu\u2019on r\u00e9sout et pourquoi." },
        { title: "Design", desc: "Explorer les solutions, prototyper vite, tester avec de vrais utilisateurs. It\u00e9rer jusqu\u2019\u00e0 valider la direction." },
        { title: "Ship", desc: "Collaborer avec l\u2019engineering, affiner les d\u00e9tails, livrer des designs pr\u00eats pour la production. Rester impliqu\u00e9 jusqu\u2019\u00e0 la mise en ligne." },
        { title: "Scale", desc: "Documenter les patterns, construire le syst\u00e8me, installer les rituels. S\u2019assurer que ce qui marche aujourd\u2019hui tient \u00e0 10x." }
      ],
      cta_text: "Parlons de votre projet"
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
      p2: "Mon profil est hybride : je peux d\u00e9finir une roadmap avec un CEO, manager une \u00e9quipe de designers, et ouvrir Figma pour produire des maquettes pr\u00eates \u00e0 coder. Je comprends les contraintes techniques et je parle le langage des d\u00e9veloppeurs.",
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
      journey_p5: "Le chapitre le plus transformateur a commenc\u00e9 en <strong>2018 chez UNOWHY</strong>, o\u00f9 j\u2019ai pass\u00e9 6 ans (jusqu\u2019en d\u00e9c. 2024). J\u2019ai d\u00e9but\u00e9 comme Senior Designer et ai \u00e9volu\u00e9 vers un r\u00f4le de Product Lead, transformant SQOOL d\u2019un simple launcher Android en un <strong>\u00e9cosyst\u00e8me SaaS de 5 applications servant 500 000+ \u00e9l\u00e8ves dans 465 \u00e9tablissements</strong> en \u00cele-de-France.",
      journey_p6: "R\u00e9alisations cl\u00e9s chez UNOWHY :",
      journey_bullets: [
        "Direction de SQOOL Extend (machines virtuelles pour l\u2019\u00e9ducation) de 0 \u00e0 1, d\u00e9ploiement du MVP dans 5 \u00e9coles",
        "Livraison de SQOOL Protect (contr\u00f4le parental) en 3 mois avec flows interactifs et vid\u00e9o de d\u00e9mo",
        "<strong>Recrutement et management d\u2019une \u00e9quipe de 5 designers</strong>, mise en place des op\u00e9rations et processus design",
        "Cr\u00e9ation d\u2019un design system unifi\u00e9 sur 5 marques, r\u00e9duisant le temps de design de 60%",
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
          "Conception de solutions pour <strong>465 lyc\u00e9es Ile-de-France (300 000 \u00e9quipements)</strong>"
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
      title: "Victor Soussan \u2013 Lead Product Design",
      contact: "victorsoussan@gmail.com \u2022 +33 6 15 98 94 00 \u2022 Paris, France",
      linkedin: "linkedin.com/in/victorsoussan",
      portfolio: "https://victorsoussan-portfolio-2026.vercel.app",
      summary_title: "R\u00e9sum\u00e9 Professionnel",
      summary: "Lead Product Design avec 15 ans d\u2019exp\u00e9rience tech et 10 ans de leadership design pour logiciels d\u2019entreprise, \u00e9ducation, m\u00e9dias et services publics. Expert en design produit 0-to-1, design systems, construction d\u2019\u00e9quipes et prototypage assist\u00e9 par IA. Bilan : produits \u00e0 500K+ utilisateurs et gestion d\u2019\u00e9quipes de 5+ designers.",
      experience_title: "Exp\u00e9rience Professionnelle",
      experience: [
        { period: "Juil 2025 \u2013 Pr\u00e9sent", role: "Principal Designer (Freelance)", company: "Pratique Ind\u00e9pendante", achievements: ["Lancement de Condamine Apps \u2013 50+ applications web fonctionnelles prototyp\u00e9es et d\u00e9ploy\u00e9es", "Exploration des workflows de design assist\u00e9s par IA avec GPTs personnalis\u00e9s et outils de prototypage rapide", "Conseil aupr\u00e8s de startups sur strat\u00e9gie produit, optimisation UX et int\u00e9gration IA"] },
        { period: "D\u00e9c 2024 \u2013 Juil 2025", role: "Product Designer", company: "beta.gouv.fr (France VAE)", achievements: ["Conception du MVP VAE collective pour innovation service public", "R\u00e9alisation de 10 entretiens utilisateurs et animation d\u2019ateliers design thinking de 2 jours", "Restructuration du workflow produit avec cycles de livraison clairs"] },
        { period: "Jan 2018 \u2013 D\u00e9c 2024", role: "Product Lead & Design Manager", company: "UNOWHY (Plateforme SQOOL \u00c9ducation)", achievements: ["Transformation de SQOOL d\u2019un launcher Android en \u00e9cosyst\u00e8me SaaS de 5 apps pour 500K+ \u00e9l\u00e8ves dans 465 \u00e9coles", "Co-leadership de l\u2019\u00e9quipe design produit avec la CPO, membre du Comit\u00e9 de Direction pendant 1 an (r\u00e9daction des slides, participation aux comit\u00e9s bi-mensuels)", "Direction de SQOOL Extend (machines virtuelles) de 0-to-1, d\u00e9ploiement MVP dans 5 \u00e9coles", "Livraison de SQOOL Protect (contr\u00f4le parental) en 3 mois avec flows interactifs", "Construction et gestion d\u2019une \u00e9quipe de 5 designers, mise en place des op\u00e9rations design", "Cr\u00e9ation d\u2019un design system unifi\u00e9 sur 5 marques, r\u00e9duction du temps de design de 60%", "Co-conception de 2 s\u00e9minaires strat\u00e9giques direction d\u00e9finissant la roadmap 2027"] },
        { period: "F\u00e9v 2023 \u2013 D\u00e9c 2024", role: "Product Designer", company: "Toolkit.ac (SaaS Construction)", achievements: ["Premier product designer pour startup de gestion de chantiers", "Structuration du produit V2 servant 2 000 utilisateurs payants", "Mise en place des workflows design-d\u00e9veloppement"] },
        { period: "Sep 2017 \u2013 Jan 2018", role: "Senior Product Designer", company: "Dailymotion", achievements: ["Conception d\u2019outils \u00e9diteurs pour 8 000+ utilisateurs et 50-100 \u00e9diteurs premium (CBS, ESPN, BBC)", "Gestion de 100 000+ vid\u00e9os par mois", "Cr\u00e9ation du premier UI Kit avec Storybook, mise en place des workflows design-d\u00e9veloppement"] },
        { period: "Sep 2016 \u2013 Sep 2017", role: "Product Designer", company: "Ogury (AdTech)", achievements: ["Sp\u00e9cialisation en design produit B2B SaaS", "Conception d\u2019outils analytics et gestion de campagnes"] },
        { period: "Jan 2014 \u2013 Sep 2016", role: "Product Designer & Team Lead", company: "PagesJaunes (Groupe Solocal)", achievements: ["Refonte des apps iOS et Android (22M t\u00e9l\u00e9chargements, 300K utilisateurs quotidiens)", "Construction du premier design system cross-plateforme", "Gestion d\u2019une \u00e9quipe de 4 UI designers"] },
        { period: "2010 \u2013 2014", role: "Directeur Artistique & Directeur de Cr\u00e9ation Freelance", company: "Groupe Hommell Publications / Freelance", achievements: ["Directeur Artistique pour magazine avec 300K ex. mensuels", "Directeur de Cr\u00e9ation Freelance pour L\u2019Or\u00e9al, Orange, Galeries Lafayette", "Conception du r\u00e9seau social interne EADS chez Louis 21 (10K managers)"] },
        { period: "2005 \u2013 2010", role: "Directeur Artistique", company: "Publicis Groupe", achievements: ["Campagnes cr\u00e9atives pour Herm\u00e8s, Leica, Helena Rubinstein", "Sp\u00e9cialisation storytelling visuel et design premium"] }
      ],
      skills_title: "Comp\u00e9tences Cl\u00e9s",
      skills: ["Strat\u00e9gie & Vision Produit", "Design Produit 0-to-1", "Design Systems & Op\u00e9rations", "Leadership d\u2019\u00c9quipe (jusqu\u2019\u00e0 5 designers)", "Recherche UX & Entretiens Utilisateurs", "Prototypage Hi-Fi (Figma, Bolt, Lovable)", "Workflows Design Assist\u00e9s par IA", "SaaS B2B & Logiciels d\u2019Entreprise", "Collaboration Design-Dev"],
      tools_title: "Outils & Technologies",
      tools: "Figma, FigJam, Adobe Suite, Sketch, Notion, Slack, Linear, ChatGPT, Claude, Midjourney, Bolt, Lovable, Storybook, HTML/CSS",
      education_title: "Formation & Certifications",
      education: ["Master Communication & Multim\u00e9dia \u2013 ISCOM Paris (2001-2005)", "UX/UI Design & Prototypage \u2013 UXcel / Udemy (2021)"],
      languages_title: "Langues",
      languages: "Fran\u00e7ais (Natif) \u2022 Anglais (Courant)",
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
    lab: {
      tag: "R&D et Exp\u00e9rimentation",
      title: "Studio Condamine",
      desc: "Mon espace personnel pour tester les limites de l\u2019IA g\u00e9n\u00e9rative. J\u2019y explore comment ces outils peuvent acc\u00e9l\u00e9rer le design et le d\u00e9veloppement de produits.",
      apps_title: "Condamine Apps",
      apps_sub: "50+ Apps D\u00e9ploy\u00e9es",
      apps_desc: "Une galerie de prototypes fonctionnels (React/Web) g\u00e9n\u00e9r\u00e9s par IA. La preuve par l\u2019exemple qu\u2019on peut passer de l\u2019id\u00e9e au produit en quelques heures.",
      apps_cta: "Voir les Apps",
      learning_title: "Condamine Learning",
      learning_sub: "Transmission",
      learning_desc: "Formations et ressources pour aider les Designers et PMs \u00e0 ne pas subir la vague IA, mais \u00e0 la surfer.",
      learning_cta: "Explorer les Cours",
      agents_title: "Agents & Prompts",
      agents_sub: "Ing\u00e9nierie Syst\u00e8me",
      agents_desc: "Ma base de donn\u00e9es Notion de prompts et d\u2019agents GPTs que j\u2019ai configur\u00e9s pour automatiser les t\u00e2ches r\u00e9p\u00e9titives du design.",
      agents_cta: "Acc\u00e9der \u00e0 la Base",
      art_title: "Galerie d\u2019Art IA",
      art_sub: "Midjourney V6",
      art_desc: "Exploration purement visuelle. Composition, lumi\u00e8re et texture g\u00e9n\u00e9r\u00e9es synth\u00e9tiquement.",
      art_cta: "Voir la Galerie"
    },
    homepage_about: {
      title: "\u00c0 propos",
      text: "Je con\u00e7ois des produits num\u00e9riques depuis bient\u00f4t vingt ans, de l\u2019agence de publicit\u00e9 aux logiciels d\u2019entreprise, plateformes EdTech et services publics. J\u2019ai dirig\u00e9 des \u00e9quipes design, travaill\u00e9 main dans la main avec des product managers et des ing\u00e9nieurs, et livr\u00e9 des produits utilis\u00e9s par des centaines de milliers de personnes.",
      cta: "Parcours complet",
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
      empty: "Aucun t\u00e9moignage trouv\u00e9 dans cette cat\u00e9gorie.",
      close: "Fermer"
    },
    contact: {
      title: "Vous recherchez un designer rapide et exp\u00e9riment\u00e9 ?",
      subtitle: "Je suis ouvert aux missions de Product Design (Freelance) ou r\u00f4les de Lead (CDI). Discutons concr\u00e8tement de vos besoins.",
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
