/**
 * ============================================================================
 * VICTOR SOUSSAN PORTFOLIO - DESIGN SYSTEM
 * ============================================================================
 *
 * This file documents all design patterns, tokens, and behaviors used across
 * the portfolio site. It serves as the source of truth for maintaining
 * consistency when adding new features or case studies.
 *
 * IMPORTANT: Always reference this file when creating new components or pages.
 *
 * Last updated: December 2024
 * ============================================================================
 */

// ============================================================================
// 1. COLOR SYSTEM
// ============================================================================

export const COLORS = {
  // Primary palette
  primary: {
    50: '#eff6ff',   // bg-blue-50
    100: '#dbeafe',  // bg-blue-100
    500: '#3b82f6',  // bg-blue-500 - Main accent
    600: '#2563eb',  // bg-blue-600 - Buttons, CTAs
    700: '#1d4ed8',  // bg-blue-700 - Hover states
  },

  // Neutral palette (Gray scale)
  neutral: {
    50: '#f9fafb',   // bg-gray-50 - Light backgrounds
    100: '#f3f4f6',  // bg-gray-100 - Cards, sections
    200: '#e5e7eb',  // bg-gray-200 - Borders
    300: '#d1d5db',  // bg-gray-300 - Disabled states
    400: '#9ca3af',  // text-gray-400 - Muted text
    500: '#6b7280',  // text-gray-500 - Secondary text
    600: '#4b5563',  // text-gray-600 - Body text
    700: '#374151',  // text-gray-700 - Headings
    800: '#1f2937',  // text-gray-800 - Strong text
    900: '#111827',  // text-gray-900 - Primary text
  },

  // Semantic colors
  success: '#10b981',  // green-500
  warning: '#f59e0b',  // amber-500
  error: '#ef4444',    // red-500
  info: '#3b82f6',     // blue-500

  // Brand colors per project
  brands: {
    dailymotion: '#0066DC',
    sqool: '#3b82f6',
    connect: '#10b981',
  },

  // Glass effect backgrounds
  glass: {
    light: 'bg-white/80 backdrop-blur-xl',
    dark: 'bg-black/80 backdrop-blur-xl',
    card: 'bg-white/95 backdrop-blur-sm',
  },
};

// ============================================================================
// 2. TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  // Font family - System fonts (Tailwind default)
  fontFamily: 'font-sans', // Inter, system-ui, sans-serif

  // Heading sizes (responsive)
  headings: {
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight',
    h3: 'text-xl sm:text-2xl md:text-3xl font-bold',
    h4: 'text-lg sm:text-xl font-semibold',
    h5: 'text-base sm:text-lg font-semibold',
  },

  // Body text
  body: {
    large: 'text-lg sm:text-xl leading-relaxed',
    base: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    xs: 'text-xs',
  },

  // Special text styles
  special: {
    quote: 'text-xl sm:text-2xl italic text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-500',
    label: 'text-xs font-medium uppercase tracking-wider text-gray-500',
    metric: 'text-4xl sm:text-5xl md:text-6xl font-bold',
  },
};

// ============================================================================
// 3. SPACING
// ============================================================================

export const SPACING = {
  // Page padding
  page: {
    x: 'px-4 sm:px-6 md:px-8 lg:px-12',
    y: 'py-12 sm:py-16 md:py-20 lg:py-24',
  },

  // Section spacing
  section: {
    gap: 'space-y-12 sm:space-y-16 md:space-y-20',
    margin: 'mt-16 sm:mt-20 md:mt-24',
  },

  // Component spacing
  card: {
    padding: 'p-4 sm:p-6 md:p-8',
    gap: 'gap-4 sm:gap-6',
  },

  // Grid gaps
  grid: {
    tight: 'gap-2 sm:gap-3',
    normal: 'gap-4 sm:gap-6',
    loose: 'gap-6 sm:gap-8 md:gap-10',
  },
};

// ============================================================================
// 4. BORDER RADIUS
// ============================================================================

export const RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-lg',        // 8px - Small elements
  md: 'rounded-xl',        // 12px - Cards, buttons
  lg: 'rounded-2xl',       // 16px - Large cards, images
  xl: 'rounded-3xl',       // 24px - Hero sections, modals
  full: 'rounded-full',    // Pills, avatars
};

// ============================================================================
// 5. SHADOWS
// ============================================================================

export const SHADOWS = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',

  // Special shadows
  card: 'shadow-sm hover:shadow-md transition-shadow',
  image: 'shadow-lg shadow-black/20',
  modal: 'shadow-2xl shadow-black/30',
  glow: {
    blue: 'shadow-lg shadow-blue-500/20',
    dark: 'shadow-lg shadow-black/30',
  },
};

// ============================================================================
// 6. ANIMATIONS & TRANSITIONS
// ============================================================================

export const ANIMATIONS = {
  // Transition durations
  duration: {
    fast: 'duration-150',
    normal: 'duration-200',
    slow: 'duration-300',
    slower: 'duration-500',
  },

  // Easing
  easing: {
    default: 'ease-out',
    smooth: 'ease-in-out',
  },

  // Common transitions
  transitions: {
    default: 'transition-all duration-200 ease-out',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-200',
    opacity: 'transition-opacity duration-200',
  },

  // Framer Motion variants
  framerMotion: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.15 },
    },
    slideIn: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.15 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.12 },
    },
  },
};

// ============================================================================
// 7. INTERACTIVE ELEMENTS
// ============================================================================

export const INTERACTIVE = {
  // Clickable image hover effect (standard across site)
  clickableImage: {
    container: 'rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]',
    // Usage: Apply to container div, not img element
    // The container scales slightly on hover for a subtle "lift" effect
  },

  // Button styles
  button: {
    primary: 'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors',
    secondary: 'px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors',
    ghost: 'px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors',
    icon: 'p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-colors',
  },

  // Link styles
  link: {
    default: 'text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline',
    muted: 'text-gray-500 hover:text-gray-700 transition-colors',
  },

  // Focus states (accessibility)
  focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
};

// ============================================================================
// 8. COMPONENT PATTERNS
// ============================================================================

export const COMPONENTS = {
  // Card patterns
  card: {
    base: 'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all',
    glass: 'bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50',
    testimonial: 'flex flex-col p-5 sm:p-6 pb-6 sm:pb-8 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-[240px] sm:h-[320px] overflow-hidden',
    metric: 'p-6 sm:p-8 rounded-3xl border border-gray-100 text-center',
  },

  // Badge/Tag styles
  badge: {
    blue: 'px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200',
    gray: 'px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200',
    green: 'px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200',
  },

  // Navigation tab toggle
  tabToggle: {
    container: 'relative flex items-center gap-1 rounded-full p-1 bg-gray-100',
    tab: 'relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200',
    activeIndicator: 'absolute inset-0 bg-blue-600 rounded-full shadow-md',
  },

  // Lightbox/Modal
  lightbox: {
    overlay: 'fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center',
    closeButton: 'absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors',
    navButton: 'absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors',
    image: 'max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl',
    video: 'max-w-full max-h-full rounded-2xl shadow-2xl',
  },

  // Avatar
  avatar: {
    small: 'w-8 h-8 rounded-full',
    medium: 'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
    large: 'w-16 h-16 sm:w-20 sm:h-20 rounded-full',
    fallback: 'bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold',
  },
};

// ============================================================================
// 9. LAYOUT PATTERNS
// ============================================================================

export const LAYOUTS = {
  // Page container
  pageContainer: 'min-h-screen bg-gray-50',

  // Content max-widths
  maxWidth: {
    narrow: 'max-w-3xl mx-auto',
    normal: 'max-w-5xl mx-auto',
    wide: 'max-w-7xl mx-auto',
    full: 'max-w-full',
  },

  // Grid layouts
  grids: {
    twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8',
    threeCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    fourCol: 'grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6',
    bento: 'grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4',
  },

  // Flex layouts
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    col: 'flex flex-col',
    colCenter: 'flex flex-col items-center',
  },

  // Sticky header
  stickyHeader: 'sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100',
};

// ============================================================================
// 10. CASE STUDY PAGE STRUCTURE
// ============================================================================

export const CASE_STUDY_STRUCTURE = {
  /**
   * Standard case study page structure:
   *
   * 1. HEADER
   *    - Logo/Title (left)
   *    - View toggle: Case Study | Gallery (center)
   *    - Close button (right)
   *
   * 2. HERO SECTION
   *    - Project title (h1)
   *    - Subtitle/tagline
   *    - Meta info: Type, Scope, Period, Company
   *    - Optional: Hero image/video
   *
   * 3. OVERVIEW SECTION
   *    - Introduction text
   *    - Role description
   *    - Goals/Objectives list
   *
   * 4. CONTENT SECTIONS
   *    - Each section has: Title, Description, Visuals
   *    - Visuals: Images, videos, or galleries
   *    - Support for different layouts (text+image, full-width, grid)
   *
   * 5. IMPACT/RESULTS SECTION
   *    - Metrics grid (numbers + descriptions)
   *    - Key achievements
   *
   * 6. FOOTER
   *    - CTA: "Contact for similar project"
   *    - Navigation dots/progress
   */

  // Section header pattern
  sectionHeader: 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8',

  // Section subtitle
  sectionSubtitle: 'text-lg sm:text-xl text-gray-600 mb-4',

  // Body text in sections
  sectionBody: 'text-base sm:text-lg text-gray-600 leading-relaxed',

  // Image with caption
  imageWithCaption: {
    container: 'space-y-3',
    image: 'rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]',
    caption: 'text-sm text-gray-500 text-center',
  },
};

// ============================================================================
// 11. RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  /**
   * Tailwind default breakpoints:
   * sm: 640px   - Mobile landscape / small tablets
   * md: 768px   - Tablets
   * lg: 1024px  - Small laptops
   * xl: 1280px  - Desktops
   * 2xl: 1536px - Large screens
   *
   * Common patterns:
   * - Mobile first: Start with base styles, add sm:, md:, lg: for larger
   * - Hide/show: hidden sm:block, sm:hidden
   * - Size changes: text-sm sm:text-base md:text-lg
   */
  usage: {
    mobileOnly: 'sm:hidden',
    tabletUp: 'hidden sm:block',
    desktopUp: 'hidden lg:block',
  },
};

// ============================================================================
// 12. DARK MODE (if enabled)
// ============================================================================

export const DARK_MODE = {
  /**
   * Dark mode classes use systemTheme === 'dark' conditional
   *
   * Pattern:
   * className={`base-classes ${systemTheme === 'dark' ? 'dark-variant' : 'light-variant'}`}
   *
   * Common swaps:
   * - bg-white → bg-gray-900
   * - text-gray-900 → text-white
   * - text-gray-600 → text-gray-300
   * - border-gray-100 → border-gray-800
   */
  backgrounds: {
    light: 'bg-white',
    dark: 'bg-gray-900',
  },
  text: {
    light: 'text-gray-900',
    dark: 'text-white',
  },
};

// ============================================================================
// 13. FILE STRUCTURE
// ============================================================================

export const FILE_STRUCTURE = {
  /**
   * Project file organization:
   *
   * /
   * ├── App.tsx              - Main app, homepage, routing
   * ├── ExecutivePage.tsx    - 1-min presentation deck
   * ├── DailymotionPage.tsx  - Case study template example
   * ├── ConnectPage.tsx      - Case study
   * ├── ToolkitPage.tsx      - Case study
   * ├── SqoolPage.tsx        - Case study
   * ├── BentoGallery.tsx     - Gallery component
   * ├── IframeModal.tsx      - External content modal
   * ├── styles.ts            - Basic style constants
   * ├── DESIGN_SYSTEM.ts     - This file (comprehensive docs)
   * └── public/
   *     └── images/          - All images organized by project
   *         ├── dailymotion/
   *         ├── sqool/
   *         ├── connect/
   *         └── toolkit/
   */
};

// ============================================================================
// 14. CREATING A NEW CASE STUDY
// ============================================================================

export const NEW_CASE_STUDY_CHECKLIST = {
  /**
   * Checklist for adding a new case study:
   *
   * □ 1. Create [ProjectName]Page.tsx based on DailymotionPage.tsx
   * □ 2. Add translations object (TRANSLATIONS) for EN/FR
   * □ 3. Add images to /public/images/[project-name]/
   * □ 4. Define gallery items for BentoGallery
   * □ 5. Add route in App.tsx
   * □ 6. Add project card in App.tsx projects section
   * □ 7. Update navigation if needed
   * □ 8. Test lightbox, video player, responsive layouts
   * □ 9. Deploy and verify on Vercel
   *
   * Key patterns to follow:
   * - Use CLICKABLE_IMAGE_CONTAINER for all clickable images
   * - Use rounded-2xl for image containers
   * - Use transition-transform hover:scale-[1.01] for hover effects
   * - Include e.stopPropagation() on clickable elements inside draggable areas
   * - Support both 'caseStudy' and 'gallery' view modes
   */
};

// ============================================================================
// EXPORTS FOR DIRECT USE
// ============================================================================

// Re-export commonly used patterns as class strings
export const IMAGE_HOVER_SCALE = 'transition-transform hover:scale-[1.01]';
export const CLICKABLE_IMAGE_CONTAINER = 'rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]';
export const SECTION_TITLE = 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8';
export const BODY_TEXT = 'text-base sm:text-lg text-gray-600 leading-relaxed';
export const CARD_BASE = 'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all';
