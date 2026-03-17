
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { EMAILJS_CONFIG } from './config/emailConfig';
import {
  CaretRight as ChevronRight,
  Stack as Layers,
  Users,
  PencilSimple as PenTool,
  ArrowUpRight,
  Envelope,
  LinkedinLogo,
  CheckCircle as CheckCircle2,
  Target,
  Package as Box,
  List as MenuIcon,
  X,
  DownloadSimple as Download,
  Lightning as Zap,
  Gear as Settings,
  Lightbulb,
  Quotes as Quote,
  User,
  Calendar,
  Copy,
  PaperPlaneTilt as Send,
  Images,
  Check,
  ArrowRight,
  Sun,
  Moon,
  Monitor,
  House as Home,
  ChatCircle as MessageCircle,
  FolderOpen,
  Link as Link2,
  Rocket,
  Buildings,
  HandHeart,
  Phone,
  Globe
} from '@phosphor-icons/react';
import { SIGNALS, FEATURED_SIGNAL_IDS, CATEGORY_COLORS as SIGNAL_CATEGORY_COLORS, CATEGORY_LABELS as SIGNAL_CATEGORY_LABELS } from './data/signalsData';
import type { Signal } from './data/signalsData';
import { TRANSLATIONS } from './data/translations';
import type { Language } from './data/translations';
import { getTestimonials } from './data/testimonialsData';
import type { Category } from './data/testimonialsData';
import { LAB_PREVIEWS } from './data/labData';
import { getResources } from './data/resourcesData';
import { getProjects } from './data/projectsData';
import type { Project } from './data/projectsData';
import { PROJECT_SEO, DEFAULT_SEO, updateMetaTags } from './utils/seo';

// Phosphor aliases for JSX backward compatibility
const Mail = Envelope;
const Linkedin = LinkedinLogo;

// Lazy load heavy page components for code splitting
const ToolkitPage = lazy(() => import('./pages/case-studies/ToolkitPage'));
const DailymotionPage = lazy(() => import('./pages/case-studies/DailymotionPage'));
const ConnectPage = lazy(() => import('./pages/case-studies/ConnectPage'));
const SqoolPage = lazy(() => import('./pages/case-studies/SqoolPage'));
const SqoolClassePage = lazy(() => import('./pages/case-studies/SqoolClassePage'));
const FranceVaePage = lazy(() => import('./pages/case-studies/FranceVaePage'));
const PagesJaunesPage = lazy(() => import('./pages/case-studies/PagesJaunesPage'));
const AndroidWearPage = lazy(() => import('./pages/case-studies/AndroidWearPage'));
const ExecutivePage = lazy(() => import('./pages/ExecutivePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const IframeModal = lazy(() => import('./components/IframeModal'));
const HomePageV2 = lazy(() => import('./pages/HomePageV2'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const VisualArchivePage = lazy(() => import('./pages/VisualArchivePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SignalsPage = lazy(() => import('./pages/SignalsPage'));
const ConsultingPage = lazy(() => import('./pages/ConsultingPage'));
const SignalDetailPage = lazy(() => import('./pages/SignalDetailPage'));
const GuideClaudeCodePage = lazy(() => import('./pages/GuideClaudeCodePage'));
const QuoteGeneratorModal = lazy(() => import('./components/QuoteGeneratorModal'));

// Loading spinner component for lazy loaded pages
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-inherit">
    <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
  </div>
);

// --- Types ---

type AccessibilityMode = 'normal' | 'contrast' | 'dyslexic';

// --- Utility Functions ---

// Generate srcset for images with responsive versions
const getResponsiveSrcSet = (src: string): string | undefined => {
  const responsiveImages = [
    'thumbnail-toolkit',
    'thumbnail-connect',
    'thumbnail-sqool-suite',
    'thumbnail-dailymotion-web-platform',
    'thumbnail-pagesjaunes-multidevices',
    'thumbnail_france_vae',
    'thumbnail_france_vae_02',
    'thumbnail_toolkit_02',
    'thubmnail_dailymotion_03',
  ];

  if (!responsiveImages.some(name => src.includes(name))) {
    return undefined;
  }

  const lastDot = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDot);
  const ext = src.substring(lastDot);

  return `${basePath}-400w${ext} 400w, ${basePath}-800w${ext} 800w, ${basePath}-1200w${ext} 1200w`;
};

// --- Components ---

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }> = ({ filename, alt, className = "", isDark = false }) => {
  // For Victor's portrait, use dark version when in dark mode
  const isVictorPortrait = filename.includes('victor-soussan');
  const actualFilename = isVictorPortrait && isDark ? 'victor_soussan_dark.webp' : filename;
  const cleanFilename = actualFilename.split('/').pop() || actualFilename;
  const imagePath = `/images/${cleanFilename}`;
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {!hasError ? (
        <img loading="lazy"
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

// Scroll-linked expanding card component using Framer Motion for smooth Apple-style animations
// Uses scale transform instead of width to prevent text reflow
const ScrollExpandCard: React.FC<{
  project: Project;
  index: number;
  shouldAnimate: boolean;
  startScale: number;
  systemTheme: 'light' | 'dark';
  onClick: () => void;
  children: React.ReactNode;
}> = ({ index, shouldAnimate, startScale, systemTheme, onClick, children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the card's position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Start animation when card enters viewport, end when it's fully visible
    offset: ["start end", "start 0.3"]
  });

  // Smooth spring physics for Apple-like feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to scale (uniform scaling prevents text reflow)
  const scale = useTransform(
    smoothProgress,
    [0, 1],
    shouldAnimate ? [startScale, 1] : [1, 1]
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      style={shouldAnimate ? {
        scale,
        transformOrigin: 'center top',
      } : undefined}
      className={`group cursor-pointer rounded-2xl md:rounded-3xl border overflow-hidden ${
        systemTheme === 'dark'
          ? 'bg-[#1D1D1F] border-white/5 shadow-xl shadow-black/20'
          : 'bg-white border-gray-200 shadow-lg shadow-gray-300/40'
      }`}
    >
      {children}
    </motion.div>
  );
};

// --- Lab Preview Data ---

// --- Main App Component ---

const App: React.FC = () => {
  // Parse initial language from URL query param
  const getInitialLang = (): Language => {
    if (typeof window === 'undefined') return 'en';
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'fr' || urlLang === 'en') return urlLang;
    // Default to browser language or 'en'
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  };

  const [lang, setLang] = useState<Language>(getInitialLang);
  const content = TRANSLATIONS[lang];
  const resources = getResources(lang);
  const projects = getProjects(lang);
  const testimonials = getTestimonials(lang);

  const [, setIsMenuOpen] = useState(false);
  const [isMobileTabMenuOpen, setIsMobileTabMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Parse initial URL for modal states
  const initialPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const initialUrlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

  // Check if we should show HomePageV2
  const [showHomeV2, setShowHomeV2] = useState(initialPath === '/home-v2' || initialPath === '/v2');

  const [isBioOpen, setIsBioOpen] = useState(initialPath === '/about');
  const [isServicesPageOpen, setIsServicesPageOpen] = useState(initialPath === '/services');
  const [isVisualArchiveOpen, setIsVisualArchiveOpen] = useState(initialPath === '/visual-archive');
  const [isSignalsOpen, setIsSignalsOpen] = useState(initialPath === '/signals');
  const [openSignalId, setOpenSignalId] = useState<string | null>(() => {
    const match = initialPath.match(/^\/signal\/(.+)$/);
    return match ? match[1] : null;
  });
  const [copiedSignalId, setCopiedSignalId] = useState<string | null>(null);
  const [guideView, setGuideView] = useState<string | null>(() => {
    if (initialPath === '/guide/claude-code') return 'index';
    const guideMatch = initialPath.match(/^\/guide\/claude-code\/(.+)$/);
    return guideMatch ? guideMatch[1] : null;
  });
  const [isConsultingOpen, setIsConsultingOpen] = useState(initialPath === '/consulting');
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(initialPath === '/testimonials');
  const [isWorkOpen, setIsWorkOpen] = useState(initialPath === '/work');
  const [openedFromIndex, setOpenedFromIndex] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(initialPath === '/contact');
  const [selectedLabItem, setSelectedLabItem] = useState<string | null>(null);
  const [isExecutiveOpen, setIsExecutiveOpen] = useState(() => {
    // Check URL path or parameters to open presentation directly
    return initialPath === '/presentation' || initialUrlParams.get('presentation') === '1' || initialUrlParams.get('deck') === '1';
  });
  const [showExecutiveFarewell, setShowExecutiveFarewell] = useState(false);
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [accessibilityMode] = useState<AccessibilityMode>('normal');
  const [isResumeOpen, setIsResumeOpen] = useState(initialPath === '/resume');
  const [resumeLang, setResumeLang] = useState<'fr' | 'en'>('fr');
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  const [copiedPortfolio, setCopiedPortfolio] = useState(false);
  const [iframeModalUrl, setIframeModalUrl] = useState<string | null>(null);
  // Unified project modal state: which project is open and which view mode
  // Also tracks initial media index if URL points to specific image/video
  const [_initialMediaIndex, setInitialMediaIndex] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<{
    project: 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear';
    viewMode: 'caseStudy' | 'gallery' | 'executive';
  } | null>(() => {
    // Parse URL on initial load
    const path = window.location.pathname;

    // Match media URLs: /project/:id/media/:type/:index
    const mediaMatch = path.match(/^\/projects?\/(toolkit|dailymotion|connect|sqool|sqool-classe|france-vae|pagesjaunes|androidwear)\/media\/(image|video)\/(\d+)$/);
    if (mediaMatch) {
      const projectId = mediaMatch[1] as 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear';
      const mediaIndex = parseInt(mediaMatch[3], 10) - 1; // Convert to 0-based index
      // Store the media index to open lightbox automatically
      setTimeout(() => setInitialMediaIndex(mediaIndex >= 0 ? mediaIndex : 0), 100);
      return { project: projectId, viewMode: 'gallery' };
    }

    // Match standard project URLs: /project/:id/:viewMode?
    // Supports new URLs: /project/:id/summary, /project/:id/full, /project/:id/gallery
    // Also supports legacy URLs: /project/:id/executive, /project/:id/case-study
    const projectMatch = path.match(/^\/projects?\/(toolkit|dailymotion|connect|sqool|sqool-classe|france-vae|pagesjaunes|androidwear)(?:\/(case-study|full|gallery|executive|summary))?$/);
    if (projectMatch) {
      const projectId = projectMatch[1] as 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear';
      const viewParam = projectMatch[2];
      // Map URL paths to internal view modes
      // summary & executive -> executive (En bref)
      // full & case-study & default -> caseStudy (Complet)
      // gallery -> gallery
      const viewMode = viewParam === 'gallery' ? 'gallery'
        : (viewParam === 'executive' || viewParam === 'summary') ? 'executive'
        : 'caseStudy';
      return { project: projectId, viewMode };
    }
    return null;
  });
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track which modal page is currently open (for nav active state)
  const activePageId = isBioOpen ? 'about'
    : isServicesPageOpen ? 'services'
    : isConsultingOpen ? 'consulting'
    : isVisualArchiveOpen ? 'visual-archive'
    : (isSignalsOpen || !!openSignalId || !!guideView) ? 'signals'
    : isWorkOpen ? 'work'
    : null;
  const anyModalOpen = activePageId !== null;

  const [_showTooltip, setShowTooltip] = useState(false);
  const [isSimpleContactOpen, setIsSimpleContactOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [simpleContactForm, setSimpleContactForm] = useState({
    name: '',
    email: '',
    message: '',
    budget: '',
    startDate: '',
    endDate: '',
    website: '' // Honeypot field - should remain empty for real users
  });
  const [lastSubmitTime, setLastSubmitTime] = useState(0); // Rate limiting
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

  // Quote Generator State (internalized in QuoteGeneratorModal, only open/close managed here)
  const [isQuoteGeneratorOpen, setIsQuoteGeneratorOpen] = useState(initialPath === '/quote');

  // Testimonial Filters
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // Handle Escape key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const hasModalOpen = isBioOpen || isTestimonialsOpen || isWorkOpen || isBookingOpen || isResumeOpen || isExecutiveOpen || isQuoteGeneratorOpen || isServicesPageOpen || isVisualArchiveOpen || isSignalsOpen || !!openSignalId || !!guideView;

        setSelectedImage(null);
        setIsBioOpen(false);
        setIsTestimonialsOpen(false);
        setIsWorkOpen(false);
        setIsBookingOpen(false);
        setIsResumeOpen(false);
        setIsExecutiveOpen(false);
        setSelectedLabItem(null);
        setIsContactFormOpen(false);
        setIsSimpleContactOpen(false);
        setShowTooltip(false);
        setIsServicesPageOpen(false);
        setIsVisualArchiveOpen(false);
        setIsSignalsOpen(false);
        setOpenSignalId(null);
        setGuideView(null);

        // Quote generator close is handled by the component itself
        if (isQuoteGeneratorOpen) {
          setIsQuoteGeneratorOpen(false);
        }

        // Reset URL if any modal was open
        if (hasModalOpen) {
          window.history.pushState({}, '', '/');
          updateMetaTags(DEFAULT_SEO);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isBioOpen, isTestimonialsOpen, isWorkOpen, isBookingOpen, isResumeOpen, isExecutiveOpen, isQuoteGeneratorOpen, isServicesPageOpen, isVisualArchiveOpen, isSignalsOpen, content]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (selectedImage || isBioOpen || isTestimonialsOpen || isWorkOpen || isBookingOpen || selectedLabItem || isContactFormOpen || isSimpleContactOpen || selectedServiceGallery || isQuoteGeneratorOpen || isExecutiveOpen || isServicesPageOpen || isVisualArchiveOpen || isSignalsOpen || openSignalId || !!guideView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage, isBioOpen, isTestimonialsOpen, isWorkOpen, isBookingOpen, selectedLabItem, isContactFormOpen, isSimpleContactOpen, selectedServiceGallery, isExecutiveOpen, isServicesPageOpen, isVisualArchiveOpen, isSignalsOpen, openSignalId]);

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

  // Apply accessibility mode classes to body
  useEffect(() => {
    document.body.classList.remove('accessibility-normal', 'accessibility-contrast', 'accessibility-dyslexic');
    document.body.classList.add(`accessibility-${accessibilityMode}`);
  }, [accessibilityMode]);

  // Global haptic feedback and tap sound on all taps/clicks
  useEffect(() => {
    const handleGlobalTap = (e: MouseEvent | TouchEvent) => {
      // Get the target element
      const target = e.target as HTMLElement;

      // Determine if it's an interactive element
      const isButton = target.closest('button') ||
                      target.closest('a') ||
                      target.closest('[role="button"]') ||
                      target.closest('[onclick]') ||
                      target.tagName === 'BUTTON' ||
                      target.tagName === 'A';

      const isInteractive = target.closest('[class*="cursor-pointer"]') ||
                           window.getComputedStyle(target).cursor === 'pointer';

      // Play tap sound for all interactive taps
      if (isButton || isInteractive) {
        const audio = new Audio('/sounds/tap.wav');
        audio.volume = 0.15;
        audio.play().catch(() => {});
      }

      // Haptic feedback if device supports vibration
      if (navigator.vibrate) {
        if (isButton) {
          navigator.vibrate(10);
        } else if (isInteractive) {
          navigator.vibrate(8);
        } else {
          navigator.vibrate(5);
        }
      }
    };

    // Use click for all devices (touchstart causes double sound on mobile)
    document.addEventListener('click', handleGlobalTap, { passive: true });

    return () => {
      document.removeEventListener('click', handleGlobalTap);
    };
  }, []);


  // Signal to prerender script that the app is ready
  useEffect(() => {
    document.dispatchEvent(new Event('prerender-ready'));
  }, []);

  // Detect active section on scroll - improved accuracy
  useEffect(() => {
    const sectionIds = ['projects', 'gallery', 'services', 'lab', 'testimonials', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerOffset = 80; // Height of sticky header

      // Find the section that's currently most visible
      let currentSectionId: string | null = null;
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;

          // Section is considered "active" when its top is near or above the header
          // and it's not completely scrolled past
          if (sectionTop <= headerOffset + 150 && rect.bottom > headerOffset) {
            const distance = Math.abs(sectionTop - headerOffset);
            if (distance < minDistance) {
              minDistance = distance;
              currentSectionId = id;
            }
          }
        }
      }

      // Only show "Victor Soussan" when truly at the top (no section detected and scroll near top)
      if (currentSectionId) {
        setActiveSection(currentSectionId);
      } else if (scrollY < 200) {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // URL helpers for project routing
  // New URL structure: /project/:id/summary (En bref), /project/:id/full (Complet), /project/:id/gallery
  // Includes ?lang=xx parameter for sharing
  const getProjectUrl = (projectId: string, viewMode: 'caseStudy' | 'gallery' | 'executive', includeLang = true) => {
    const viewPath = viewMode === 'gallery' ? '/gallery'
      : viewMode === 'executive' ? '/summary'
      : '/full';
    const langParam = includeLang ? `?lang=${lang}` : '';
    return `/project/${projectId}${viewPath}${langParam}`;
  };

  // Open project with URL update
  const openProjectWithUrl = (
    projectId: 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear',
    viewMode: 'caseStudy' | 'gallery' | 'executive',
    pushHistory = true
  ) => {
    setOpenProject({ project: projectId, viewMode });
    // Update meta tags for SEO
    const seo = PROJECT_SEO[projectId];
    if (seo) updateMetaTags(seo);
    if (pushHistory) {
      const url = getProjectUrl(projectId, viewMode);
      window.history.pushState({ project: projectId, viewMode }, '', url);
    }
  };

  // Handle project close - return to Index if opened from there
  const handleProjectClose = () => {
    setOpenProject(null);
    if (openedFromIndex) {
      // Go back to work modal with URL
      openModalWithUrl('/work');
      setOpenedFromIndex(false);
    } else {
      // Restore default meta tags and reset URL with lang param
      updateMetaTags(DEFAULT_SEO);
      window.history.pushState({ lang }, '', `/?lang=${lang}`);
    }
  };

  // Modal URL helpers - open modals with URL routing
  const MODAL_ROUTES: Record<string, { setter: (v: boolean) => void; title: string; description: string }> = {
    '/testimonials': {
      setter: setIsTestimonialsOpen,
      title: 'Témoignages | Victor Soussan',
      description: 'Témoignages de clients et collègues sur le travail de Victor Soussan, Product Design Lead.'
    },
    '/about': {
      setter: setIsBioOpen,
      title: 'À propos | Victor Soussan',
      description: 'Parcours et expertise de Victor Soussan, Product Design Lead avec 15+ ans d\'expérience.'
    },
    '/work': {
      setter: setIsWorkOpen,
      title: 'Projets | Victor Soussan',
      description: 'Portfolio de projets UX/UI : Dailymotion, France VAE, SQOOL, PagesJaunes et plus.'
    },
    '/resume': {
      setter: setIsResumeOpen,
      title: 'CV | Victor Soussan',
      description: 'Curriculum vitae de Victor Soussan, Product Design Lead.'
    },
    '/contact': {
      setter: setIsBookingOpen,
      title: 'Contact | Victor Soussan',
      description: 'Contactez Victor Soussan pour vos projets de Product Design et UX.'
    },
    '/quote': {
      setter: setIsQuoteGeneratorOpen,
      title: 'Demande de devis | Victor Soussan',
      description: 'Demandez un devis pour vos projets de Product Design, UX Research ou Design System.'
    },
    '/presentation': {
      setter: setIsExecutiveOpen,
      title: 'Présentation Executive | Victor Soussan',
      description: 'Présentation executive du portfolio de Victor Soussan, Product Design Lead.'
    },
    '/services': {
      setter: setIsServicesPageOpen,
      title: 'Expertises | Victor Soussan',
      description: 'Expertises en design produit : conception d\'interfaces, stratégie, design ops et leadership.'
    },
    '/visual-archive': {
      setter: setIsVisualArchiveOpen,
      title: 'Gallery | Victor Soussan',
      description: 'Galerie d\'interfaces, design systems et prototypes d\'interaction de Victor Soussan.'
    },
    '/signals': {
      setter: setIsSignalsOpen,
      title: 'Blog | Victor Soussan',
      description: 'Réflexions et perspectives sur le design produit, le leadership et la méthodologie.'
    },
    '/consulting': {
      setter: setIsConsultingOpen,
      title: 'Consulting | Victor Soussan',
      description: 'Consulting design senior pour directions digitales, DSI et VP Produit. Diagnostic, prototypage, recherche utilisateur, transformation.'
    }
  };

  const openModalWithUrl = (path: string) => {
    // Handle guide routes
    if (path === '/guide/claude-code') {
      Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
      setOpenSignalId(null);
      setGuideView('index');
      window.history.pushState({ guide: 'index', lang }, '', `/guide/claude-code?lang=${lang}`);
      updateMetaTags({ title: 'Guide Claude Code pour les designers | Victor Soussan', description: 'Guide complet pour les designers : prototypes interactifs, pages déployées, documentation de design system, le tout sans apprendre à coder.', image: '/images/guide-claude-code/hero-cover.png' });
      return;
    }
    const guideChapterMatch = path.match(/^\/guide\/claude-code\/(.+)$/);
    if (guideChapterMatch) {
      const slug = guideChapterMatch[1];
      Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
      setOpenSignalId(null);
      setGuideView(slug);
      window.history.pushState({ guide: slug, lang }, '', `${path}?lang=${lang}`);
      updateMetaTags({ title: `Guide Claude Code | Victor Soussan`, description: 'Guide Claude Code pour les designers.', image: '/images/guide-claude-code/hero-cover.png' });
      return;
    }

    // Handle dynamic signal detail routes
    const signalMatch = path.match(/^\/signal\/(.+)$/);
    if (signalMatch) {
      const sId = signalMatch[1];
      Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
      setOpenSignalId(sId);
      const signal = SIGNALS.find(s => s.id === sId);
      const signalTitle = signal ? (lang === 'en' ? signal.title_en : signal.title_fr) : 'Signal';
      window.history.pushState({ signalId: sId, lang }, '', `${path}?lang=${lang}`);
      updateMetaTags({ title: `${signalTitle} | Victor Soussan`, description: signal ? (lang === 'en' ? signal.body_en : signal.body_fr).substring(0, 160) : '', image: '/images/og_victor_soussan.webp' });
      return;
    }

    const route = MODAL_ROUTES[path];
    if (route) {
      // Close all other modals first to prevent stacking
      Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
      setOpenSignalId(null);
      route.setter(true);
      const urlWithLang = `${path}?lang=${lang}`;
      window.history.pushState({ modal: path, lang }, '', urlWithLang);
      updateMetaTags({ title: route.title, description: route.description, image: '/images/og_victor_soussan.webp' });
    }
  };

  const closeModalWithUrl = (setterFn: (v: boolean) => void) => {
    setterFn(false);
    window.history.pushState({ lang }, '', `/?lang=${lang}`);
    updateMetaTags(DEFAULT_SEO);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Restore language from state or URL
      if (event.state?.lang) {
        setLang(event.state.lang);
      } else {
        // Try to get lang from URL
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'fr' || urlLang === 'en') {
          setLang(urlLang);
        }
      }

      // Handle guide
      if (event.state?.guide) {
        Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
        setOpenSignalId(null);
        setGuideView(event.state.guide);
        return;
      }

      // Handle signal detail
      if (event.state?.signalId) {
        Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
        setOpenProject(null);
        setOpenSignalId(event.state.signalId);
        return;
      }

      // Handle project modals
      if (event.state?.project) {
        setOpenProject({
          project: event.state.project,
          viewMode: event.state.viewMode || 'caseStudy'
        });
        // Update meta tags for the project
        const seo = PROJECT_SEO[event.state.project];
        if (seo) updateMetaTags(seo);
        return;
      }

      // Handle other modals
      if (event.state?.modal) {
        const route = MODAL_ROUTES[event.state.modal];
        if (route) {
          // Close all modals first
          Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
          setOpenProject(null);
          setOpenSignalId(null);
          // Open the requested modal
          route.setter(true);
          updateMetaTags({ title: route.title, description: route.description, image: '/images/og_victor_soussan.webp' });
          return;
        }
      }

      // No modal state - close everything
      Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
      setOpenProject(null);
      setOpenSignalId(null);
      setGuideView(null);
      updateMetaTags(DEFAULT_SEO);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update meta tags on initial load if project is open from URL
  useEffect(() => {
    if (openProject?.project) {
      const seo = PROJECT_SEO[openProject.project];
      if (seo) updateMetaTags(seo);
    }
  }, []);

  // Update URL when language changes (keeps current path, updates lang param)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const newUrl = currentPath === '/' ? `/?lang=${lang}` : `${currentPath}?lang=${lang}`;
    window.history.replaceState({ ...window.history.state, lang }, '', newUrl);
  }, [lang]);

  // Easing function for smooth scroll
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const duration = 800; // ms
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, currentScroll * (1 - easedProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Scroll to section with offset
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Projects section has negative margin, needs more offset to show cards properly
      const offset = id === 'projects' ? 150 : 50;
      const elementRect = element.getBoundingClientRect().top;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = currentScroll + elementRect - offset;

      // Use native smooth scroll with explicit duration for consistency
      const startPosition = currentScroll;
      const distance = targetPosition - startPosition;
      const duration = 800; // ms
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
      setIsMenuOpen(false);
    }
  };

  const filteredTestimonials = activeCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === activeCategory);

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

  // If showing HomePageV2, render only that
  if (showHomeV2) {
    return (
      <ErrorBoundary systemTheme={systemTheme}>
        <Suspense fallback={<PageLoader />}>
          <HomePageV2
            onNavigateHome={() => {
              setShowHomeV2(false);
              window.history.pushState({}, '', '/');
            }}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      systemTheme === 'dark'
        ? 'bg-[#0a0a0a] text-white'
        : 'bg-[#F9F9F9] text-[#1D1D1F]'
    }`}>

      {/* Navigation - Full width with glass effect */}
      {/* z-[150] when a modal page is open (above z-[100] pages), z-50 otherwise (case studies cover it) */}
      <nav className={`fixed top-0 w-full ${anyModalOpen ? 'z-[150]' : 'z-50'} ${
        systemTheme === 'dark'
          ? anyModalOpen ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]/80 backdrop-blur-xl'
          : anyModalOpen ? 'bg-[#FCFCFD]' : 'bg-white/80 backdrop-blur-xl'
      }`}>
        <div className="w-full px-6 h-16 flex items-center justify-between">
          {/* Logo - click returns home when a modal is open */}
          <div
            className="font-semibold text-lg tracking-[-0.02em] cursor-pointer transition-opacity duration-300 hover:opacity-70 whitespace-nowrap"
            onClick={() => {
              if (anyModalOpen) {
                Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
                window.history.pushState({ lang }, '', `/?lang=${lang}`);
                updateMetaTags(DEFAULT_SEO);
              } else {
                scrollToTop();
              }
            }}
          >
            Victor Soussan
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            {/* Scroll-section items */}
            {[
              { id: 'projects', label: content.nav.projects },
              { id: 'gallery', label: content.nav.archive },
              { id: 'services', label: content.nav.services },
              { id: 'testimonials', label: content.nav.testimonials },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (anyModalOpen) {
                    Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
                    window.history.pushState({ lang }, '', `/?lang=${lang}`);
                    updateMetaTags(DEFAULT_SEO);
                    setTimeout(() => scrollToSection(item.id), 100);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className={`px-3 py-2 transition-colors duration-200 flex items-center whitespace-nowrap ${
                  systemTheme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* About - Opens modal */}
            <button
              onClick={() => openModalWithUrl('/about')}
              className={`px-3 py-2 transition-colors duration-200 flex items-center whitespace-nowrap ${
                activePageId === 'about'
                  ? systemTheme === 'dark' ? 'text-white' : 'text-black'
                  : systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {content.nav.bio}
            </button>

            {/* Blog - Opens modal */}
            <button
              onClick={() => openModalWithUrl('/signals')}
              className={`px-3 py-2 transition-colors duration-200 flex items-center whitespace-nowrap ${
                activePageId === 'signals'
                  ? systemTheme === 'dark' ? 'text-white' : 'text-black'
                  : systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {content.nav.blog}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                systemTheme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-black hover:bg-black/5'
              }`}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Contact Button */}
            <button
              onClick={() => {
                if (anyModalOpen) {
                  Object.values(MODAL_ROUTES).forEach(r => r.setter(false));
                  window.history.pushState({ lang }, '', `/?lang=${lang}`);
                  updateMetaTags(DEFAULT_SEO);
                  setTimeout(() => scrollToSection('contact'), 100);
                } else {
                  scrollToSection('contact');
                }
              }}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg ${
                systemTheme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {content.nav.contact}
            </button>
          </div>

          {/* Mobile: Hide hamburger, we use bottom tab bar instead */}
          <div className="md:hidden" />
        </div>
      </nav>

      {/* Floating Liquid Glass Menu - Mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        {/* Expanded Menu - Liquid Glass Bottom Sheet */}
        <AnimatePresence>
          {isMobileTabMenuOpen && (
            <>
              {/* Backdrop with blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
                onClick={() => {
                  // Haptic feedback
                  if (navigator.vibrate) navigator.vibrate(10);
                  // Play close sound
                  const audio = new Audio('/sounds/menu-close.wav');
                  audio.volume = 0.3;
                  audio.play().catch(() => {});
                  setIsMobileTabMenuOpen(false);
                }}
              />
              {/* Liquid Glass Bottom Sheet */}
              <motion.div
                initial={{ y: '100%', scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: '100%', scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 35,
                  mass: 0.8,
                }}
                className="fixed bottom-6 left-4 right-4 rounded-[32px] overflow-hidden pointer-events-auto"
                style={{
                  background: systemTheme === 'dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: systemTheme === 'dark'
                    ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 1px rgba(255,255,255,0.15)'
                    : '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.5), inset 0 1px 1px rgba(255,255,255,0.8)',
                  marginBottom: 'env(safe-area-inset-bottom, 0px)',
                }}
              >
                {/* Liquid highlight effect at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: systemTheme === 'dark'
                      ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                      : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)'
                  }}
                />

                {/* Handle bar with glow */}
                <div className="flex justify-center pt-3 pb-1">
                  <motion.div
                    className={`w-10 h-1 rounded-full ${
                      systemTheme === 'dark' ? 'bg-white/30' : 'bg-black/15'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                </div>

                {/* Navigation items */}
                <div className="px-3 pb-2">
                  <div className={`rounded-2xl overflow-hidden ${
                    systemTheme === 'dark'
                      ? 'bg-white/5'
                      : 'bg-black/[0.03]'
                  }`}>
                    {[
                      { id: 'home', label: lang === 'en' ? 'Home' : 'Accueil', icon: Home, action: () => { scrollToTop(); setActiveSection(null); } },
                      { id: 'projects', label: content.nav.projects, icon: FolderOpen, action: () => scrollToSection('projects') },
                      { id: 'gallery', label: content.nav.archive, icon: Images, action: () => scrollToSection('gallery') },
                      { id: 'services', label: content.nav.services, icon: Layers, action: () => scrollToSection('services') },
                      { id: 'testimonials', label: content.nav.testimonials, icon: MessageCircle, action: () => scrollToSection('testimonials') },
                      { id: 'bio', label: content.nav.bio, icon: User, action: () => openModalWithUrl('/about') },
                      { id: 'contact', label: content.nav.contact, icon: Mail, action: () => scrollToSection('contact') },
                    ].map((item, index, arr) => {
                      const isActive = activeSection === item.id || (item.id === 'home' && activeSection === null);
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => {
                            // Haptic feedback
                            if (navigator.vibrate) navigator.vibrate(15);
                            // Play button tap sound
                            const audio = new Audio('/sounds/tap.wav');
                            audio.volume = 0.25;
                            audio.play().catch(() => {});
                            item.action();
                            // Delay closing for visual feedback
                            setTimeout(() => {
                              const closeAudio = new Audio('/sounds/menu-close.wav');
                              closeAudio.volume = 0.2;
                              closeAudio.play().catch(() => {});
                              setIsMobileTabMenuOpen(false);
                            }, 100);
                          }}
                          whileTap={{ scale: 0.97, backgroundColor: systemTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                          className={`w-full flex items-center gap-4 px-4 py-3.5 transition-all ${
                            index < arr.length - 1
                              ? systemTheme === 'dark'
                                ? 'border-b border-white/5'
                                : 'border-b border-black/[0.03]'
                              : ''
                          }`}
                        >
                          <motion.div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                              isActive
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : systemTheme === 'dark'
                                  ? 'bg-white/10 text-gray-400'
                                  : 'bg-black/5 text-gray-500'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                          </motion.div>
                          <span className={`text-[16px] tracking-[-0.02em] ${
                            isActive
                              ? systemTheme === 'dark' ? 'text-white font-semibold' : 'text-gray-900 font-semibold'
                              : systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{item.label}</span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto w-2 h-2 rounded-full bg-blue-500"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Language & Theme row */}
                <div className="px-3 pb-4 pt-1">
                  <div className={`flex items-center gap-2 rounded-2xl p-1.5 ${
                    systemTheme === 'dark' ? 'bg-white/5' : 'bg-black/[0.03]'
                  }`}>
                    {/* Language Switch */}
                    <motion.button
                      onClick={() => {
                        if (navigator.vibrate) navigator.vibrate(15);
                        const audio = new Audio('/sounds/tap.wav');
                        audio.volume = 0.25;
                        audio.play().catch(() => {});
                        setLang(lang === 'en' ? 'fr' : 'en');
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all ${
                        systemTheme === 'dark'
                          ? 'text-white bg-white/10 hover:bg-white/15'
                          : 'text-gray-800 bg-white/60 hover:bg-white/80 shadow-sm'
                      }`}
                    >
                      <Globe size={18} strokeWidth={2} />
                      <span className="text-[14px] font-medium">{lang === 'en' ? 'FR' : 'EN'}</span>
                    </motion.button>
                    {/* Theme Toggle */}
                    <motion.button
                      onClick={() => {
                        if (navigator.vibrate) navigator.vibrate(15);
                        const audio = new Audio('/sounds/tap.wav');
                        audio.volume = 0.25;
                        audio.play().catch(() => {});
                        if (themeMode === 'light') setThemeMode('dark');
                        else if (themeMode === 'dark') setThemeMode('system');
                        else setThemeMode('light');
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all ${
                        systemTheme === 'dark'
                          ? 'text-white bg-white/10 hover:bg-white/15'
                          : 'text-gray-800 bg-white/60 hover:bg-white/80 shadow-sm'
                      }`}
                    >
                      {themeMode === 'light' ? <Sun size={18} strokeWidth={2} /> : themeMode === 'dark' ? <Moon size={18} strokeWidth={2} /> : <Monitor size={18} strokeWidth={2} />}
                      <span className="text-[14px] font-medium">
                        {themeMode === 'light' ? (lang === 'en' ? 'Light' : 'Clair') : themeMode === 'dark' ? (lang === 'en' ? 'Dark' : 'Sombre') : 'Auto'}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Pill Tab Bar - Liquid Glass style */}
        <motion.div
          className="flex items-center justify-center px-4 pb-6 pointer-events-auto"
          style={{ paddingBottom: 'max(24px, calc(env(safe-area-inset-bottom, 0px) + 16px))' }}
          initial={false}
          animate={{ y: isMobileTabMenuOpen ? 100 : 0, opacity: isMobileTabMenuOpen ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <motion.div
            className="flex items-center gap-1 rounded-[28px] p-1.5"
            style={{
              background: systemTheme === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: systemTheme === 'dark'
                ? '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 1px rgba(255,255,255,0.2)'
                : '0 20px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.6), inset 0 1px 1px rgba(255,255,255,0.9)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Home */}
            <motion.button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                const audio = new Audio('/sounds/tap.wav');
                audio.volume = 0.25;
                audio.play().catch(() => {});
                scrollToTop();
                setActiveSection(null);
              }}
              whileTap={{ scale: 0.85 }}
              className={`flex items-center justify-center w-14 h-12 rounded-[22px] transition-all ${
                activeSection === null
                  ? systemTheme === 'dark'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-md'
                  : systemTheme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
              }`}
            >
              <Home size={22} strokeWidth={activeSection === null ? 2.5 : 2} />
            </motion.button>

            {/* Projects */}
            <motion.button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                const audio = new Audio('/sounds/tap.wav');
                audio.volume = 0.25;
                audio.play().catch(() => {});
                scrollToSection('projects');
              }}
              whileTap={{ scale: 0.85 }}
              className={`flex items-center justify-center w-14 h-12 rounded-[22px] transition-all ${
                activeSection === 'projects'
                  ? systemTheme === 'dark'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-md'
                  : systemTheme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
              }`}
            >
              <FolderOpen size={22} strokeWidth={activeSection === 'projects' ? 2.5 : 2} />
            </motion.button>

            {/* Bio/About */}
            <motion.button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                const audio = new Audio('/sounds/tap.wav');
                audio.volume = 0.25;
                audio.play().catch(() => {});
                openModalWithUrl('/about');
              }}
              whileTap={{ scale: 0.85 }}
              className={`flex items-center justify-center w-14 h-12 rounded-[22px] transition-all ${
                systemTheme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
              }`}
            >
              <User size={22} strokeWidth={2} />
            </motion.button>

            {/* Divider */}
            <div className={`w-px h-8 mx-1 ${systemTheme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />

            {/* Menu Toggle - Special styling */}
            <motion.button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(20);
                const audio = new Audio(isMobileTabMenuOpen ? '/sounds/menu-close.wav' : '/sounds/menu-open.wav');
                audio.volume = 0.3;
                audio.play().catch(() => {});
                setIsMobileTabMenuOpen(!isMobileTabMenuOpen);
              }}
              whileTap={{ scale: 0.85 }}
              animate={{
                rotate: isMobileTabMenuOpen ? 180 : 0,
                backgroundColor: isMobileTabMenuOpen
                  ? (systemTheme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 1)')
                  : 'transparent'
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`flex items-center justify-center w-14 h-12 rounded-[22px] transition-colors ${
                isMobileTabMenuOpen
                  ? 'text-white shadow-lg shadow-blue-500/30'
                  : systemTheme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
              }`}
            >
              {isMobileTabMenuOpen ? <X size={22} strokeWidth={2.5} /> : <MenuIcon size={22} strokeWidth={2} />}
            </motion.button>

            {/* Contact - Accent button */}
            <motion.button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(15);
                const audio = new Audio('/sounds/tap.wav');
                audio.volume = 0.25;
                audio.play().catch(() => {});
                scrollToSection('contact');
              }}
              whileTap={{ scale: 0.85 }}
              className={`flex items-center justify-center w-14 h-12 rounded-[22px] transition-all ${
                activeSection === 'contact'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                  : systemTheme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
              }`}
            >
              <Mail size={22} strokeWidth={activeSection === 'contact' ? 2.5 : 2} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex flex-col justify-center px-4 md:px-10 py-24 md:py-32 overflow-hidden">
        {/* Static Background - Performance optimized (no JS animation) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient blobs only - no animated grid */}
          <div className={`absolute right-[-10%] top-[-20%] w-[50%] h-[50%] rounded-full blur-[120px] ${
            systemTheme === 'dark' ? 'bg-blue-600/8' : 'bg-blue-300/20'
          }`} />
          <div className={`absolute right-[20%] top-[10%] w-[25%] h-[25%] rounded-full blur-[100px] ${
            systemTheme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-300/15'
          }`} />
          <div className={`absolute left-[-15%] bottom-[-10%] w-[45%] h-[45%] rounded-full blur-[120px] ${
            systemTheme === 'dark' ? 'bg-indigo-600/8' : 'bg-indigo-300/20'
          }`} />
          <div className={`absolute left-[30%] bottom-[20%] w-[20%] h-[20%] rounded-full blur-[80px] ${
            systemTheme === 'dark' ? 'bg-violet-500/5' : 'bg-violet-300/12'
          }`} />
          {/* Bottom fade */}
          <div className={`absolute bottom-0 left-0 right-0 h-40 ${
            systemTheme === 'dark'
              ? 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent'
              : 'bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/70 to-transparent'
          }`} />
        </div>

        <div className="relative max-w-[1200px] mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Left: Text Content (2/3) */}
            <div className="md:col-span-7 lg:col-span-8 text-left">
              {/* Availability Badge */}
              <div
                className={`inline-flex items-center relative z-20 pl-1 pr-3 py-1 rounded-full mb-6 md:mb-8 ${
                  systemTheme === 'dark'
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-white/70 border border-gray-200/60'
                }`}
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1" />
                <span className={`text-xs font-medium ml-2 ${systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {content.hero.availability}
                </span>
              </div>

              {/* Main Tagline */}
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] mb-4 md:mb-5 leading-[1.05] ${
                systemTheme === 'dark' ? 'text-white' : 'text-[#1D1D1F]'
              }`}>
                {content.hero.tagline}
              </h1>

              {/* Subtitle */}
              <p className={`text-lg sm:text-xl md:text-2xl font-medium mb-3 md:mb-4 ${
                systemTheme === 'dark' ? 'text-white' : 'text-[#1D1D1F]'
              }`}>
                {content.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{content.hero.subtitle}</span>
              </p>

              {/* Positioning keywords */}
              <p className={`text-sm md:text-base mb-5 md:mb-6 max-w-2xl ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {content.hero.positioning}
              </p>

              <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-7 md:mb-8 max-w-2xl ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {content.hero.desc}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-start items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base btn-pill flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-all duration-200 bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-lg shadow-[#2D5CF3]/25 hover:shadow-xl hover:shadow-[#2D5CF3]/30 w-full sm:w-auto"
                >
                  {lang === 'en' ? 'View work' : 'Voir mes projets'} <ArrowUpRight className="ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
                </button>
                <button
                  onClick={() => openModalWithUrl('/presentation')}
                  className={`group px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base btn-pill flex items-center justify-center cursor-pointer relative z-20 whitespace-nowrap transition-all duration-200 w-full sm:w-auto ${
                    systemTheme === 'dark'
                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white/15'
                      : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  {lang === 'en' ? '1-min Presentation' : 'Présentation 1 min'} <ArrowUpRight className="ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
                </button>
              </div>
            </div>

            {/* Right: Photo (1/3) - Portrait */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-center md:justify-end">
              <div className="relative w-full max-w-[340px]">
                <div
                  className={`aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden border shadow-lg ${
                    systemTheme === 'dark'
                      ? 'border-white/10 shadow-black/30'
                      : 'border-gray-200/60 shadow-gray-200/50'
                  }`}
                >
                  <img
                    src="/images/photos victor/image_victor_home.png"
                    alt="Victor Soussan"
                    className="w-full h-full object-cover object-[center_15%]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Global Styles */}
      <style>{`
        .logo-carousel-track {
          animation: scroll 30s linear infinite;
          will-change: transform;
          contain: layout style;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
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

      {/* Featured Content - 2 columns */}
      <section className={`relative z-10 px-4 md:px-10 py-10 md:py-14 ${systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'}`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg md:text-xl font-bold tracking-[-0.02em] ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {lang === 'en' ? 'Latest' : 'À la une'}
            </h2>
            <button
              onClick={() => openModalWithUrl('/signals')}
              className={`group flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
                systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {lang === 'en' ? 'All articles' : 'Tous les articles'}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Card 1: Guide Claude Code */}
            <button
              onClick={() => openModalWithUrl('/guide/claude-code')}
              className={`group text-left rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden hover:-translate-y-0.5 ${
                systemTheme === 'dark'
                  ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15 hover:shadow-xl'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg shadow-sm'
              }`}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="/images/guide-claude-code/hero-cover.png"
                  alt="Guide Claude Code"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#D97757]/10 text-[#D97757]">Guide</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2D5CF3]/10 text-[#2D5CF3]">Claude Code</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${systemTheme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>9 chapitres</span>
                </div>
                <h3 className={`text-base md:text-lg font-bold tracking-[-0.01em] mb-1.5 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {lang === 'en' ? 'Getting Started with Claude Code' : 'Bien d\u00e9marrer avec Claude Code'}
                </h3>
                <p className={`text-sm leading-relaxed line-clamp-2 mb-3 ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'en'
                    ? 'Complete guide for designers: from setup to deployment, visual quality, skills and Figma MCP.'
                    : 'Guide complet pour les designers : de l\'installation au d\u00e9ploiement, qualit\u00e9 visuelle, skills et Figma MCP.'}
                </p>
                <span className="flex items-center gap-1 text-xs font-medium text-[#2D5CF3]">
                  {lang === 'en' ? 'Read the guide' : 'Lire le guide'}
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>

            {/* Card 2: Claude Code & Figma MCP */}
            {(() => {
              const figmaMcpSignal = SIGNALS.find(s => s.id === 'claude-code-figma-mcp');
              if (!figmaMcpSignal) return null;
              const sColors = SIGNAL_CATEGORY_COLORS[figmaMcpSignal.category];
              return (
                <button
                  onClick={() => openModalWithUrl('/signal/claude-code-figma-mcp')}
                  className={`group text-left rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden hover:-translate-y-0.5 flex flex-col ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/5 hover:border-white/15 hover:shadow-xl'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg shadow-sm'
                  }`}
                >
                  <div className={`aspect-[16/9] flex items-center justify-center ${systemTheme === 'dark' ? 'bg-[#161618]' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <svg width="44" height="44" viewBox="0 0 48 48" fill="none"><path d="M16 8H24V16H16C11.6 16 8 12.4 8 8s3.6-8 8-8z" fill="#F24E1E"/><path d="M24 8h8c4.4 0 8 3.6 8 8s-3.6 8-8 8h-8V8z" fill="#FF7262"/><path d="M24 24h8c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8v-8z" fill="#1ABCFE"/><path d="M8 24c0-4.4 3.6-8 8-8h8v16h-8c-4.4 0-8-3.6-8-8z" fill="#A259FF"/><path d="M8 40c0-4.4 3.6-8 8-8h8v8c0 4.4-3.6 8-8 8s-8-3.6-8-8z" fill="#0ACF83"/></svg>
                      <span className={`text-2xl font-light ${systemTheme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>+</span>
                      <span className="text-[28px] font-bold tracking-[-0.03em] text-[#D97757]">Claude</span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${systemTheme === 'dark' ? sColors.bgDark : sColors.bg} ${sColors.text}`}>
                        {SIGNAL_CATEGORY_LABELS[figmaMcpSignal.category][lang]}
                      </span>
                    </div>
                    <h3 className={`text-base md:text-lg font-bold tracking-[-0.01em] mb-1.5 line-clamp-2 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {lang === 'en' ? figmaMcpSignal.title_en : figmaMcpSignal.title_fr}
                    </h3>
                    <p className={`text-sm leading-relaxed line-clamp-2 flex-1 mb-3 ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {(lang === 'en' ? figmaMcpSignal.body_en : figmaMcpSignal.body_fr).substring(0, 150)}...
                    </p>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#2D5CF3]">
                      {lang === 'en' ? 'Read' : 'Lire'}
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </button>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Case Studies Section - Landscape Banners */}
      <section id="projects" className={`pt-4 md:pt-8 pb-16 md:pb-32 px-4 md:px-10 relative z-10 ${
        systemTheme === 'dark' ? 'bg-transparent' : 'bg-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto">
          {/* Stacked Landscape Cards - Show only first 3 projects */}
          <div className="flex flex-col gap-6 md:gap-10">
            {projects.slice(0, 3).map((project, index) => {
              // No scale animation - all cards at 100%
              const shouldAnimate = false;
              const startScale = 1;

              return (
                <ScrollExpandCard
                  key={project.id}
                  project={project}
                  index={index}
                  shouldAnimate={shouldAnimate}
                  startScale={startScale}
                  systemTheme={systemTheme}
                  onClick={() => {
                    if (project.id === 'toolkit' || project.id === 'dailymotion' || project.id === 'connect' || project.id === 'sqool' || project.id === 'sqool-classe' || project.id === 'france-vae') {
                      openProjectWithUrl(project.id, 'executive');
                    } else if (project.externalLink) {
                      setIframeModalUrl(project.externalLink);
                    }
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section - Left on desktop, full width on mobile */}
                    <div className={`relative w-full md:w-[55%] overflow-hidden ${
                      systemTheme === 'dark' ? 'bg-[#111111]' : 'bg-gray-50'
                    }`}>
                      {/* Status Badge - Top left - Hidden on mobile for condensed view */}
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 hidden md:block">
                        <span className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md ${
                          systemTheme === 'dark'
                            ? 'bg-black/40 text-white border border-white/10'
                            : 'bg-white/70 text-gray-700 border border-gray-200/50'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            project.status === 'concept' ? 'bg-violet-500' : 'bg-green-500'
                          }`} />
                          {project.status === 'concept' ? 'CONCEPT' : 'SHIPPED'}
                        </span>
                      </div>

                      <div className={`aspect-[16/9] md:aspect-auto md:h-full relative ${project.hoverImage ? 'p-0' : 'p-3 md:p-6'}`}>
                        {/* Default image - with responsive srcset */}
                        {(() => {
                          const imgSrc = project.coverImage.startsWith('/') ? project.coverImage : `/images/${project.coverImage}`;
                          const srcSet = getResponsiveSrcSet(imgSrc);
                          return (
                            <img
                              loading="lazy"
                              src={imgSrc}
                              srcSet={srcSet}
                              sizes={srcSet ? "(max-width: 768px) 100vw, 55vw" : undefined}
                              alt={`${project.title} preview`}
                              className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                                project.hoverImage
                                  ? 'opacity-100 group-hover:opacity-0 rounded-none md:rounded-l-2xl'
                                  : 'rounded-xl md:rounded-2xl md:object-contain'
                              } ${
                                project.hoverImage
                                  ? ''
                                  : project.id !== 'toolkit'
                                    ? 'md:scale-[1.02] md:group-hover:scale-[1.08]'
                                    : 'scale-[0.85] group-hover:scale-90'
                              }`}
                            />
                          );
                        })()}
                        {/* Hover image (device mockup) - with zoom effect and responsive srcset */}
                        {project.hoverImage && (() => {
                          const srcSet = getResponsiveSrcSet(project.hoverImage);
                          return (
                            <img
                              loading="lazy"
                              src={project.hoverImage}
                              srcSet={srcSet}
                              sizes={srcSet ? "(max-width: 768px) 100vw, 55vw" : undefined}
                              alt={`${project.title} device mockup`}
                              className="absolute inset-0 w-full h-full object-cover md:object-contain rounded-none md:rounded-l-2xl transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110"
                            />
                          );
                        })()}
                      </div>
                    </div>

                    {/* Content Section - Right on desktop, condensed on mobile */}
                    <div className="w-full md:w-[45%] p-4 md:p-8 flex flex-col justify-between">
                      {/* Top: Meta & Title */}
                      <div>
                        {/* Mobile: Year + Title inline, Desktop: Full badges */}
                        <div className="flex md:hidden items-center gap-2 mb-2">
                          <span className={`text-xs font-medium ${
                            systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {project.period.split(' – ')[0]}
                          </span>
                          <span className={`w-1 h-1 rounded-full ${
                            systemTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                          }`} />
                          <h3 className={`text-base font-bold tracking-[-0.02em] ${
                            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {project.title}
                          </h3>
                        </div>

                        {/* Desktop: Full meta badges */}
                        <div className="hidden md:flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            systemTheme === 'dark'
                              ? 'bg-white/10 text-gray-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {project.period}
                          </span>
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            systemTheme === 'dark'
                              ? 'bg-blue-600/10 text-blue-400'
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            {project.role}
                          </span>
                        </div>

                        {/* Desktop: Title */}
                        <div className="hidden md:block mb-3">
                          <h3 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] ${
                            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {project.title}
                          </h3>
                        </div>

                        {/* Summary - Shorter on mobile */}
                        <p className={`text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-none ${
                          systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {project.summary}
                        </p>

                        {/* Key Missions - Hidden on mobile */}
                        <div className="hidden md:block mb-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Target size={14} className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                            <p className={`text-xs font-semibold uppercase tracking-wider ${
                              systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {content.projects.missions}
                            </p>
                          </div>
                          <ul className="space-y-1.5">
                            {project.missions.slice(0, 2).map((m, i) => (
                              <li key={i} className={`text-xs flex items-start ${
                                systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                                  systemTheme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                                }`} />
                                <span className="line-clamp-1">{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Key deliverables - Hidden on mobile */}
                        <div className="hidden md:block mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Box size={14} className={systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                            <p className={`text-xs font-semibold uppercase tracking-wider ${
                              systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {content.projects.deliverables}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.deliverables.slice(0, 4).map((d, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-1 rounded-md flex items-center border ${
                                  systemTheme === 'dark'
                                    ? 'text-gray-300 border-white/5 bg-white/5'
                                    : 'text-gray-600 border-gray-100 bg-gray-50/30'
                                }`}
                              >
                                <CheckCircle2 size={12} className={`mr-1.5 flex-shrink-0 ${
                                  systemTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
                                }`} />
                                {d}
                              </span>
                            ))}
                            {project.deliverables.length > 4 && (
                              <span className={`text-xs px-2 py-1 rounded-md border ${
                                systemTheme === 'dark'
                                  ? 'text-gray-500 border-white/5 bg-white/5'
                                  : 'text-gray-400 border-gray-100 bg-gray-50/30'
                              }`}>
                                +{project.deliverables.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom: CTA - Simplified on mobile */}
                      <div className={`pt-3 md:pt-4 mt-auto md:mt-4 border-t flex items-center justify-between md:justify-end gap-2 ${systemTheme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                        {/* Mobile: Simple arrow indicator */}
                        <span className={`md:hidden text-xs font-medium ${
                          systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {lang === 'en' ? 'View case study' : 'Voir le case study'}
                        </span>
                        <ChevronRight size={18} className={`md:hidden ${
                          systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`} />

                        {/* Desktop: Full buttons */}
                        {(project.id === 'toolkit' || project.id === 'dailymotion' || project.id === 'connect' || project.id === 'sqool' || project.id === 'sqool-classe' || project.id === 'france-vae') ? (
                          <div className="hidden md:flex items-center gap-2">
                            {/* Gallery Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openProjectWithUrl(project.id as 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae', 'gallery');
                              }}
                              className={`inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200 ${
                                systemTheme === 'dark'
                                  ? 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
                                  : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700'
                              }`}
                              title={lang === 'en' ? 'View gallery' : 'Voir la galerie'}
                            >
                              <Images size={16} className="mr-2" />
                              {lang === 'en' ? 'Gallery' : 'Galerie'}
                            </button>
                            {/* Case Study Button */}
                            <div className={`inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-xl transition-colors duration-300 ${
                              systemTheme === 'dark'
                                ? 'bg-white/10 text-gray-200 border border-white/20 group-hover:bg-[#2D5CF3] group-hover:text-white group-hover:border-[#2D5CF3]'
                                : 'bg-gray-100/80 text-gray-700 border border-gray-200/50 group-hover:bg-[#2D5CF3] group-hover:text-white group-hover:border-[#2D5CF3]'
                            }`}>
                              <span className="mr-2">Case Study</span>
                              <ChevronRight size={16} />
                            </div>
                          </div>
                        ) : (
                          <span className={`hidden md:inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full ${
                            systemTheme === 'dark'
                              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                              : 'bg-orange-50 text-orange-600 border border-orange-100'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 animate-pulse" />
                            {lang === 'en' ? 'Coming Soon' : 'Bientôt'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollExpandCard>
              );
            })}
          </div>

          {/* View All Projects Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => openModalWithUrl('/work')}
              onMouseEnter={() => {
                import('./pages/WorkPage');
                // Preload first 3 project thumbnails
                ['/images/francevae/thumbnail_france_vae_02.webp', '/images/toolkit/thumbnail_toolkit_02.webp', '/images/dailymotion/thubmnail_dailymotion_03.webp'].forEach(src => {
                  const img = new Image();
                  img.src = src;
                });
              }}
              className="group px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center shadow-sm hover:shadow-md bg-[#2D5CF3] text-white hover:bg-[#2450d9]"
            >
              {content.projects.view_all} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className={`py-16 md:py-24 px-4 md:px-10 ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 md:mb-14 text-center">
            <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{content.homepage_visual_archive.title}</h2>
            <p className={`text-base md:text-lg max-w-2xl mx-auto ${
              systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{content.homepage_visual_archive.subtitle}</p>
          </div>
          {/* First image: full width, high impact */}
          <div
            onClick={() => openModalWithUrl('/visual-archive')}
            className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-lg mb-4 ${
              systemTheme === 'dark'
                ? 'border-white/5 hover:border-white/10'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <img
              src="/images/visuels UI/100_1_5x.webp"
              alt=""
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
          {/* Three images in row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              '/images/visuels UI/800_1_5x.webp',
              '/images/visuels UI/200_1_5x.webp',
              '/images/visuels UI/1102_1_5x.webp',
            ].map((src, i) => (
              <div
                key={i}
                onClick={() => openModalWithUrl('/visual-archive')}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  systemTheme === 'dark'
                    ? 'border-white/5 hover:border-white/10'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => openModalWithUrl('/visual-archive')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md"
            >
              {content.homepage_visual_archive.cta}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Services & Clients Section - Combined */}
      <section id="services" className={`py-16 md:py-32 px-4 md:px-10 relative overflow-hidden ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-8 md:mb-12 text-center">
             <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 ${
               systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
             }`}>{content.services.title}</h2>
             <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
               {content.services.subtitle}
             </p>
          </div>

          {/* Service Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              const pillarIcons = [
                <PenTool size={24} key="pen" />,
                <Zap size={24} key="zap" />,
                <Users size={24} key="users" />
              ];
              const pillarColors = [
                {
                  bg: systemTheme === 'dark' ? 'bg-pink-500/20' : 'bg-pink-50',
                  text: systemTheme === 'dark' ? 'text-pink-400' : 'text-pink-600',
                  border: 'hover:border-pink-500/30'
                },
                {
                  bg: systemTheme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50',
                  text: systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600',
                  border: 'hover:border-blue-600/30'
                },
                {
                  bg: systemTheme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-50',
                  text: systemTheme === 'dark' ? 'text-teal-400' : 'text-teal-600',
                  border: 'hover:border-teal-500/30'
                }
              ];
              return content.services.homepage_pillars.map((pillar: { title: string; desc: string }, i: number) => (
                <div
                  key={i}
                  className={`group p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                    systemTheme === 'dark'
                      ? `bg-[#1D1D1F] border-white/5 ${pillarColors[i].border}`
                      : `bg-white border-gray-100 ${pillarColors[i].border}`
                  } hover:shadow-lg`}
                >
                  <div className={`p-3 rounded-xl inline-flex mb-5 transition-transform duration-300 group-hover:scale-110 ${pillarColors[i].bg} ${pillarColors[i].text}`}>
                    {pillarIcons[i]}
                  </div>
                  <h3 className={`text-xl font-bold tracking-[-0.02em] mb-3 ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{pillar.title}</h3>
                  <p className={`text-sm leading-relaxed ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{pillar.desc}</p>
                </div>
              ));
            })()}
          </div>

          {/* CTA to full services page */}
          <div className="mt-10 text-center">
            <button
              onClick={() => openModalWithUrl('/services')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md"
            >
              {content.services.cta_all}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Trusted by - Integrated in same section */}
          <div id="clients" className="mt-20 md:mt-48">
            <div className="mb-8 md:mb-12 text-center">
              <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.02em] ${
                systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {lang === 'en' ? 'Trusted by leading companies' : 'Ils me font confiance'}
              </h3>
            </div>

            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 pointer-events-none ${
                systemTheme === 'dark'
                  ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent'
                  : 'bg-gradient-to-r from-[#FCFCFD] to-transparent'
              }`} />
              <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 pointer-events-none ${
                systemTheme === 'dark'
                  ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
                  : 'bg-gradient-to-l from-[#FCFCFD] to-transparent'
              }`} />

              <div className="logo-carousel-track flex hover:[animation-play-state:paused]">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex shrink-0">
                    {[
                      { src: '/logos/LOGO UNOWHY.svg', alt: 'Unowhy' },
                      { src: '/logos/LOGO BETAGOUV.svg', alt: 'Beta.gouv' },
                      { src: '/logos/LOGO TOOLKIT.svg', alt: 'Toolkit' },
                      { src: '/logos/LOGO KYU.svg', alt: 'Kyu' },
                      { src: '/logos/LOGO AIRBUS.svg', alt: 'Airbus' },
                      { src: '/logos/LOGO ORANGE.svg', alt: 'Orange' },
                      { src: '/logos/LOGO VINCI.svg', alt: 'Vinci' },
                      { src: '/logos/LOGO DAILYMOTION-1.svg', alt: 'Dailymotion' },
                      { src: '/logos/LOGO BOUYGUES IMMO.svg', alt: 'Bouygues Immobilier' },
                      { src: '/logos/LOGO REGION ILE DE FRANCE.svg', alt: 'Région Île-de-France' },
                      { src: '/logos/LOGO OGURY.svg', alt: 'Ogury' },
                      { src: '/logos/LOGO SOLOCAL.svg', alt: 'Solocal' },
                      { src: '/logos/LOGO CELIO.svg', alt: 'Celio' },
                      { src: '/logos/LOGO OPERA COMIQUE.svg', alt: 'Opéra Comique' },
                      { src: '/logos/LOGO VERLINDE.svg', alt: 'Verlinde' },
                      { src: '/logos/LOGO UPTRADE.svg', alt: 'Uptrade' },
                    ].map((logo, index) => (
                      <div
                        key={`${setIndex}-${index}`}
                        className="flex items-center justify-center mx-2 md:mx-3 flex-shrink-0"
                        style={{ contain: 'layout style' }}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          width="100"
                          height="100"
                          className={`h-[60px] sm:h-[80px] md:h-[100px] w-auto transition-opacity duration-300 ease-out ${
                            systemTheme === 'dark'
                              ? 'brightness-0 invert opacity-60 hover:opacity-100'
                              : 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100'
                          }`}
                          style={{ contentVisibility: 'auto' }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signals Section */}
      <section className={`py-16 md:py-32 px-4 md:px-10 ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
      }`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{content.signals.title}</h2>
            <p className={`text-base md:text-lg max-w-2xl mx-auto ${
              systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{content.signals.subtitle}</p>
          </div>

          {/* Featured blog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {(() => {
              const featured = FEATURED_SIGNAL_IDS
                .map(id => SIGNALS.find(s => s.id === id))
                .filter((s): s is Signal => !!s);

              return featured.map(signal => {
                return (
                  <div
                    key={signal.id}
                    onClick={() => openModalWithUrl(`/signal/${signal.id}`)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                      systemTheme === 'dark'
                        ? 'bg-[#1D1D1F] ring-1 ring-white/5 hover:ring-white/15'
                        : 'bg-white ring-1 ring-gray-200/60 hover:ring-gray-300/80 shadow-sm'
                    }`}
                  >
                    <div className="p-5 md:p-6 flex flex-col min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          systemTheme === 'dark' ? SIGNAL_CATEGORY_COLORS[signal.category].bgDark : SIGNAL_CATEGORY_COLORS[signal.category].bg
                        } ${SIGNAL_CATEGORY_COLORS[signal.category].text}`}>
                          {SIGNAL_CATEGORY_LABELS[signal.category][lang]}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = `${window.location.origin}/signal/${signal.id}?lang=${lang}`;
                            navigator.clipboard.writeText(url).then(() => {
                              setCopiedSignalId(signal.id);
                              setTimeout(() => setCopiedSignalId(null), 2000);
                            });
                          }}
                          className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                            copiedSignalId === signal.id
                              ? 'text-green-500'
                              : systemTheme === 'dark'
                                ? 'text-gray-600 hover:text-gray-300 hover:bg-white/5'
                                : 'text-gray-300 hover:text-gray-600 hover:bg-gray-100'
                          }`}
                          title={copiedSignalId === signal.id ? (lang === 'en' ? 'Link copied' : 'Lien copié') : 'Copy link'}
                        >
                          {copiedSignalId === signal.id ? <Check size={14} /> : <Link2 size={14} />}
                        </button>
                      </div>
                      <h3 className={`text-lg md:text-xl font-bold mb-2 leading-snug tracking-[-0.02em] transition-colors line-clamp-3 ${
                        systemTheme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-[#2D5CF3]'
                      }`}>
                        {lang === 'en' ? signal.title_en : signal.title_fr}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                        systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {lang === 'en' ? signal.body_en : signal.body_fr}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-medium transition-colors ${
                          systemTheme === 'dark' ? 'text-blue-400' : 'text-[#2D5CF3]'
                        }`}>
                          {lang === 'en' ? 'Read more' : 'Lire la suite'}
                        </span>
                        <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${
                          systemTheme === 'dark' ? 'text-blue-400' : 'text-[#2D5CF3]'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <button
              onClick={() => openModalWithUrl('/signals')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md"
            >
              {content.signals.cta}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-16 md:py-32 px-4 md:px-10 ${
        systemTheme === 'dark'
          ? 'bg-[#0a0a0a]'
          : 'bg-[#FCFCFD]'
      }`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{content.testimonials.title}</h2>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {content.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
             {/* Preview: Top 3 curated testimonials - Same style as modal */}
             {[testimonials[1], testimonials[6], testimonials[0]].map((t, i) => (
                <motion.a
                  key={i}
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`p-5 md:p-8 rounded-2xl md:rounded-3xl border shadow-sm hover:shadow-md transition-all h-fit flex flex-col cursor-pointer group/card ${
                    systemTheme === 'dark'
                      ? 'bg-[#1D1D1F] border-white/10 hover:border-[#0077b5]/50'
                      : 'bg-white border-gray-100 hover:border-[#0077b5]/30'
                  }`}
                >
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
                          ? 'text-blue-400 bg-blue-600/20'
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
                      "{t.content.length > 180 ? t.content.substring(0, 180) + '...' : t.content}"
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
                </motion.a>
             ))}
          </div>

          <div className="mt-12 text-center">
             <button
               onClick={() => openModalWithUrl('/testimonials')}
               className="group px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center shadow-sm hover:shadow-md bg-[#2D5CF3] text-white hover:bg-[#2450d9]"
             >
               {content.testimonials.view_all} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      {/* Condamine Studio Section - Removed from homepage (Phase 1 MOFU restructuring) */}
      {/* Lab content remains accessible via footer links and direct URLs */}

      {/* About Page */}
      <AnimatePresence>
        {isBioOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <AboutPage
                systemTheme={systemTheme}
                lang={lang}
                onBack={() => closeModalWithUrl(setIsBioOpen)}
                onContact={() => { closeModalWithUrl(setIsBioOpen); openModalWithUrl('/contact'); }}
                resources={resources}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Full Screen Testimonials Modal */}
      <AnimatePresence>
      {isTestimonialsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`fixed inset-0 z-[100] overflow-y-auto ${
            systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
          }`}
        >
          {/* Sticky Header - Full width responsive */}
          <header
            className={`sticky top-0 z-40 backdrop-blur-xl ${
              systemTheme === 'dark'
                ? 'bg-[#0a0a0a]/80'
                : 'bg-white/80'
            }`}
          >
            <div className="w-full px-4 sm:px-6 h-16 flex items-center gap-2 sm:gap-4">
              {/* Left - Title */}
              <div className="flex-shrink-0">
                <h1
                  className={`font-semibold text-base sm:text-lg tracking-[-0.02em] ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <span className="hidden sm:inline">{content.testimonials.modal_title}</span>
                  <span className="sm:hidden">{content.testimonials.title_short}</span>
                </h1>
              </div>

              {/* Center - Filters toggle with animated pill (scrollable on mobile) */}
              <div className="flex-1 flex justify-center overflow-x-auto no-scrollbar">
                <div className={`relative flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-full ${
                  systemTheme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                }`}>
                  {(['All', 'Management', 'Design', 'Product & Tech', 'Clients'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative z-10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                    >
                      {activeCategory === cat && (
                        <motion.div
                          layoutId="testimonials-filter-pill"
                          className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                          transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                        />
                      )}
                      <span className={`relative z-10 ${
                        activeCategory === cat
                          ? 'text-white'
                          : systemTheme === 'dark'
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-500 hover:text-gray-900'
                      }`}>
                        <span className="hidden sm:inline">{cat}</span>
                        <span className="sm:hidden">{cat === 'Product & Tech' ? 'Tech' : cat === 'Management' ? 'Mgmt' : cat}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Close button */}
              <button
                onClick={() => closeModalWithUrl(setIsTestimonialsOpen)}
                className={`relative flex-shrink-0 p-3 flex items-center justify-center rounded-full transition-colors before:absolute before:inset-[-12px] before:content-[''] ${
                  systemTheme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                <X size={24} />
              </button>
            </div>
          </header>

          {/* Modal Content - Grid of testimonials */}
          <div className={`px-4 md:px-10 py-8 md:py-12 ${
            systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50/50'
          }`}>
            <div className="max-w-[1200px] mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {filteredTestimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onClick={() => t.linkedin && window.open(t.linkedin, '_blank')}
                    className={`p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all h-fit break-inside-avoid flex flex-col ${
                      t.linkedin ? 'cursor-pointer' : ''
                    } ${
                      systemTheme === 'dark'
                        ? 'bg-[#1D1D1F] border-white/10'
                        : 'bg-white border-gray-100'
                    }`}
                  >
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
                            ? 'text-blue-400 bg-blue-600/20'
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
                  </motion.div>
                ))}

                {filteredTestimonials.length === 0 && (
                  <div className="col-span-full text-center py-20 text-gray-400">
                    {content.testimonials.empty}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with CTA buttons */}
          <div className={`sticky bottom-0 z-40 border-t backdrop-blur-xl ${
            systemTheme === 'dark'
              ? 'bg-[#0a0a0a]/80 border-white/10'
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://linkedin.com/in/victorsoussan/"
                target="_blank"
                rel="noreferrer"
                className={`px-5 py-2.5 rounded-full font-medium text-sm flex items-center justify-center w-full sm:w-auto transition-all duration-200 ${
                  systemTheme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Linkedin size={16} className="mr-2" />
                {content.contact.linkedin}
              </a>
              <button
                onClick={() => {
                  closeModalWithUrl(setIsTestimonialsOpen);
                  openModalWithUrl('/contact');
                }}
                className="px-5 py-2.5 bg-[#2D5CF3] hover:bg-[#2450d9] text-white rounded-full font-medium text-sm flex items-center justify-center w-full sm:w-auto transition-all duration-200 shadow-lg shadow-[#2D5CF3]/20 hover:scale-105"
              >
                <Calendar size={16} className="mr-2" />
                {content.contact.book}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             onClick={() => {
               closeModalWithUrl(setIsBookingOpen);
               if (isExecutiveOpen) setShowExecutiveFarewell(true);
             }}
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
                   onClick={() => {
                     closeModalWithUrl(setIsBookingOpen);
                     if (isExecutiveOpen) setShowExecutiveFarewell(true);
                   }}
                   className={`relative p-3 rounded-full transition-all duration-200 backdrop-blur-sm before:absolute before:inset-[-12px] before:content-[''] ${
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
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
             onClick={() => {
               setIsSimpleContactOpen(false);
               if (isExecutiveOpen) setShowExecutiveFarewell(true);
             }}
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
                  onClick={() => {
                    setIsSimpleContactOpen(false);
                    if (isExecutiveOpen) setShowExecutiveFarewell(true);
                  }}
                  className={`absolute top-6 right-6 p-3 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-[''] ${
                    systemTheme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <X size={24} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border-2 border-white shadow-lg">
                      <img loading="lazy"
                        src={systemTheme === 'dark' ? '/images/victor_soussan_dark.webp' : '/images/victor-soussan.webp'}
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

                  // Anti-spam: Honeypot check - bots fill hidden fields
                  if (simpleContactForm.website) {
                    setToastMessage('Message sent successfully!');
                    setShowToast(true);
                    setIsSimpleContactOpen(false);
                    setTimeout(() => setShowToast(false), 3000);
                    return;
                  }

                  // Anti-spam: Rate limiting - prevent rapid submissions (30 seconds)
                  const now = Date.now();
                  if (now - lastSubmitTime < 30000) {
                    setToastMessage('Please wait a moment before sending another message.');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                    return;
                  }

                  setIsSendingEmail(true);
                  setLastSubmitTime(now);

                  try {
                    // Check if EmailJS is configured
                    const isEmailJSConfigured = EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID'
                      && EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
                      && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

                    if (isEmailJSConfigured) {
                      // Dynamic import emailjs for code splitting
                      const emailjs = await import('@emailjs/browser');
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
                      setSimpleContactForm({ name: '', email: '', message: '', budget: '', startDate: '', endDate: '', website: '' });

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
                      setSimpleContactForm({ name: '', email: '', message: '', budget: '', startDate: '', endDate: '', website: '' });

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
                {/* Honeypot field - hidden from users, bots will fill it */}
                <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={simpleContactForm.website}
                    onChange={(e) => setSimpleContactForm({ ...simpleContactForm, website: e.target.value })}
                  />
                </div>

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
                  transition={{ delay: 0.1, duration: 0.15 }}
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
                  transition={{ delay: 0.12, duration: 0.15 }}
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
                  transition={{ delay: 0.15, duration: 0.15 }}
                >
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-[#2D5CF3] hover:bg-[#2450d9] text-white rounded-full font-semibold text-lg btn-pill transition-colors duration-200 shadow-lg shadow-[#2D5CF3]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingEmail ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>{content.contact.simple_form_sending}</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
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
                  className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-['']"
                >
                  <X size={24} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border-2 border-white shadow-lg">
                      <img loading="lazy"
                        src={systemTheme === 'dark' ? '/images/victor_soussan_dark.webp' : '/images/victor-soussan.webp'}
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
                      // Dynamic import emailjs for code splitting
                      const emailjs = await import('@emailjs/browser');
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
                    transition={{ duration: 0.15 }}
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
                    transition={{ duration: 0.15 }}
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
                    transition={{ duration: 0.15 }}
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

      {/* Lab Modal - Full screen iframe */}
      <AnimatePresence>
        {selectedLabItem && LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS] && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <IframeModal
                key={selectedLabItem}
                onClose={() => setSelectedLabItem(null)}
                systemTheme={systemTheme}
                title={LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS].title}
                url={LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS].link}
                lang={lang}
                subtitle={LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS].subtitle}
                description={LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS].highlights.join(' • ')}
                color={LAB_PREVIEWS[selectedLabItem as keyof typeof LAB_PREVIEWS].color as 'blue' | 'amber' | 'purple' | 'pink'}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
      {isResumeOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeModalWithUrl(setIsResumeOpen)}
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
                    <h2 className="text-2xl font-semibold text-gray-900 tracking-[-0.02em]">
                      Résumé
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">Product Design Lead</p>
                  </div>
                  <button
                    onClick={() => closeModalWithUrl(setIsResumeOpen)}
                    className="relative p-3 hover:bg-gray-100 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-['']"
                  >
                    <X size={24} className="text-gray-500" />
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
                      <h1 className="text-3xl font-semibold text-gray-900 tracking-[-0.02em] mb-4">
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

      {/* Contact Section - White Background */}
      <section id="contact" className={`py-20 pb-16 md:py-32 md:pb-24 px-6 md:px-10 ${
        systemTheme === 'dark' ? 'bg-[#111111]' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Portrait Photo */}
          <div className="mb-8">
            <Avatar
              filename="victor-soussan.webp"
              alt="Victor Soussan"
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-[2rem] mx-auto shadow-lg border border-white/20"
              isDark={systemTheme === 'dark'}
            />
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 ${
            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {content.contact.title}
          </h2>
          <p className={`text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto ${
            systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {content.contact.subtitle}
          </p>

          {/* Main CTA - Shoot me a note */}
          <div className="mb-4">
            <button
              onClick={() => setIsSimpleContactOpen(true)}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-[#2D5CF3] hover:bg-[#2450d9] text-white rounded-full font-semibold text-lg sm:text-xl btn-pill flex items-center justify-center mx-auto hover:scale-105 transition-all duration-200 shadow-lg shadow-[#2D5CF3]/25"
            >
              <Mail className="mr-3" size={22} /> {content.contact.shoot_note}
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
              className={`flex items-center space-x-1.5 text-xs transition-colors duration-200 px-3 py-1.5 rounded-full ${
                systemTheme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span className="text-green-500">{content.contact.email_copied}</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>{content.contact.copy_email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Jumpshare Style */}
      <footer className={`py-16 px-6 md:px-10 border-t ${
        systemTheme === 'dark'
          ? 'bg-[#0a0a0a] border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  filename="victor-soussan.webp"
                  alt="Victor Soussan"
                  className="w-10 h-10 rounded-full"
                  isDark={systemTheme === 'dark'}
                />
                <span className={`font-bold text-lg ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Victor Soussan
                </span>
              </div>
              <p className={`text-sm mb-4 max-w-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'en'
                  ? 'Lead Product Designer. Strategy, user research and product design for teams building enterprise tools and digital services.'
                  : 'Lead Product Designer. Strat\u00e9gie, recherche utilisateur et design produit pour les \u00e9quipes qui construisent des outils m\u00e9tier et des services num\u00e9riques.'}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/victorsoussan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    systemTheme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:victorsoussan@gmail.com"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    systemTheme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className={`font-semibold mb-4 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {lang === 'en' ? 'Navigation' : 'Navigation'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {content.nav.projects}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModalWithUrl('/about')}
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {content.nav.bio}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {content.nav.services}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {content.nav.testimonials}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModalWithUrl('/consulting')}
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Consulting
                  </button>
                </li>
              </ul>
            </div>

            {/* Studio Column */}
            <div>
              <h4 className={`font-semibold mb-4 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Condamine Studio
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.condamine.studio/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm transition-colors flex items-center ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Condamine Apps
                    <ArrowUpRight size={12} className="ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.condamine.studio/agents-prompts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm transition-colors flex items-center ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang === 'en' ? 'Agents & Prompts' : 'Agents & Prompts'}
                    <ArrowUpRight size={12} className="ml-1" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => openModalWithUrl('/visual-archive')}
                    className={`text-sm transition-colors flex items-center cursor-pointer ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang === 'en' ? 'Gallery' : 'Galerie'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModalWithUrl('/signals')}
                    className={`text-sm transition-colors flex items-center cursor-pointer ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang === 'en' ? 'Blog' : 'Blog'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className={`font-semibold mb-4 ${systemTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:victorsoussan@gmail.com"
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    victorsoussan@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33615989400"
                    className={`text-sm transition-colors ${
                      systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    +33 6 15 98 94 00
                  </a>
                </li>
                <li>
                  <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Paris, France
                  </span>
                </li>
                <li>
                  <a
                    href="https://calendly.com/victorsoussan/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2D5CF3] hover:text-[#2450d9] transition-colors"
                  >
                    {lang === 'en' ? 'Book a call' : 'Réserver un appel'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
            systemTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p className={`text-sm ${systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} Victor Soussan. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className={`text-sm transition-colors flex items-center gap-2 ${
                  systemTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'Français' : 'English'}
              </button>
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
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-white overflow-auto"
            >
              {/* Close button - fixed top right */}
              <button
                onClick={() => setSelectedServiceGallery(null)}
                className="relative fixed top-6 right-2.5 z-30 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-lg before:absolute before:inset-[-12px] before:content-['']"
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
                        <img loading="lazy"
                          src="/images/bd-sketches/07 - Designing the Micro-Interaction - no legend.webp"
                          alt="Micro-interaction design"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Designing micro-interactions</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/09 - Prototypage haute-fidélité et spécifications.webp"
                          alt="High-fidelity prototyping"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Hi-fi prototyping & interaction specs</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/06b - Prototyping La Bulle.webp"
                          alt="Prototyping features"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Feature prototyping & validation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/16 - Des interactions fluides pour la gestion des médias (CRUD).webp"
                          alt="Fluid interactions"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Fluid CRUD interactions for media management</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/micro interaction design on mobile.webp"
                          alt="Mobile micro-interactions"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Mobile micro-interaction design</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/interaction and motion design with feedbacks.webp"
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
                        <img loading="lazy"
                          src="/images/bd-sketches/03 - Deep user observation - empathy.webp"
                          alt="User observation"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Deep user observation & empathy research</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/15d - research field observation with use of the product.webp"
                          alt="Field research"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Field research & product usage observation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/34 - User testing interviews.webp"
                          alt="User testing"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">User testing & interviews</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/11b - Design upstream strategy and roadmap.webp"
                          alt="Product strategy"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design strategy & product roadmap</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/design UX, product architecture, user flows.webp"
                          alt="UX architecture"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">UX design, product architecture & user flows</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/11 - Presenting Collaborative Study to CODIR - c-level alignment.webp"
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
                        <img loading="lazy"
                          src="/images/bd-sketches/11 - Construction du UI Kit et du Design System.webp"
                          alt="Design system"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Building UI Kit & Design System</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/10 - Synchronisations Design-Dev et Architecture des Composants.webp"
                          alt="Design-dev sync"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design-dev sync & component architecture</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/13b - Developer handoff.webp"
                          alt="Developer handoff"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Developer handoff & specifications</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/12d - Figma file archi & libraries.webp"
                          alt="Figma architecture"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Figma file architecture & libraries</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/35 - Process - Standardized product design brief template.webp"
                          alt="Design brief template"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Standardized product design brief</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/36 - Governance and process-  Mapping technical contraints with engineers.webp"
                          alt="Technical governance"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Governance & mapping technical constraints</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/13 - Du design à l'architecture - Penser comme un ingénieur produit.webp"
                          alt="Engineering mindset"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">From design to architecture, product engineer mindset</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/19 - Boucles de feedback et amélioration continue.webp"
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
                        <img loading="lazy"
                          src="/images/bd-sketches/21 - Ideation Workshop for the Suite.webp"
                          alt="Ideation workshop"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Ideation workshop facilitation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/27 - Ateliers de co creation et sketching en equipe.webp"
                          alt="Co-creation workshop"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Co-creation & team sketching workshops</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/24 - Design teams rituals.webp"
                          alt="Design team rituals"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design team rituals & ceremonies</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/25 - Weekly design critique.webp"
                          alt="Design critique"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Weekly design critique sessions</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/22 - product Squad daily rituals.webp"
                          alt="Squad rituals"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Product squad daily rituals</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/28 - remote UX workshops.webp"
                          alt="Remote workshops"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Remote UX workshop facilitation</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/design mentoring.webp"
                          alt="Design mentoring"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 font-medium">Design mentoring & coaching</p>
                        </div>
                      </div>
                      <div className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
                        <img loading="lazy"
                          src="/images/bd-sketches/12b - Brand Identity system -Unifying Color and Grid.webp"
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
      <QuoteGeneratorModal
        isOpen={isQuoteGeneratorOpen}
        onClose={() => closeModalWithUrl(setIsQuoteGeneratorOpen)}
        systemTheme={systemTheme}
        lang={lang}
        content={content}
        onToast={(msg: string) => { setToastMessage(msg); setShowToast(true); setTimeout(() => setShowToast(false), 3000); }}
      />

      {/* Full-Page Iframe Modal */}
      <AnimatePresence>
        {iframeModalUrl && (
          <div className="fixed inset-0 z-[200]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-white"
            >
              {/* Close button - fixed top right */}
              <button
                onClick={() => setIframeModalUrl(null)}
                className="relative fixed top-6 right-2.5 z-[210] p-3 bg-gray-900 hover:bg-black text-white rounded-full transition-colors shadow-lg before:absolute before:inset-[-12px] before:content-['']"
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

      {/* Unified Project Modal - Toolkit */}
      <AnimatePresence>
        {openProject?.project === 'toolkit' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <ToolkitPage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('toolkit', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - Dailymotion */}
      <AnimatePresence>
        {openProject?.project === 'dailymotion' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <DailymotionPage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('dailymotion', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - Connect */}
      <AnimatePresence>
        {openProject?.project === 'connect' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <ConnectPage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('connect', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - SQOOL */}
      <AnimatePresence>
        {openProject?.project === 'sqool' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <SqoolPage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('sqool', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - SQOOL Classe */}
      <AnimatePresence>
        {openProject?.project === 'sqool-classe' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <SqoolClassePage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('sqool-classe', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - France VAE */}
      <AnimatePresence>
        {openProject?.project === 'france-vae' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <FranceVaePage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('france-vae', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - PagesJaunes */}
      <AnimatePresence>
        {openProject?.project === 'pagesjaunes' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <PagesJaunesPage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode}
                onViewModeChange={(mode) => openProjectWithUrl('pagesjaunes', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
                onNavigateToProject={(projectId) => openProjectWithUrl(projectId as 'androidwear', 'caseStudy')}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Unified Project Modal - Android Wear */}
      <AnimatePresence>
        {openProject?.project === 'androidwear' && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <AndroidWearPage
                onClose={handleProjectClose}
                systemTheme={systemTheme}
                onToggleTheme={() => {
                  setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
                }}
                viewMode={openProject.viewMode as 'caseStudy' | 'gallery'}
                onViewModeChange={(mode) => openProjectWithUrl('androidwear', mode)}
                lang={lang}
                onContact={() => setIsSimpleContactOpen(true)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Executive Profile Modal */}
      <AnimatePresence>
        {isExecutiveOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <ExecutivePage
                language={lang}
                onClose={() => {
                  closeModalWithUrl(setIsExecutiveOpen);
                  setShowExecutiveFarewell(false);
                }}
                onBookCall={() => openModalWithUrl('/contact')}
                onContact={() => setIsSimpleContactOpen(true)}
                onOpenResume={(resumeLanguage) => {
                  setResumeLang(resumeLanguage);
                  openModalWithUrl('/resume');
                }}
                showFarewell={showExecutiveFarewell}
                systemTheme={systemTheme}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Work Page Modal - All Projects */}
      <AnimatePresence>
        {isWorkOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <WorkPage
                systemTheme={systemTheme}
                lang={lang}
                onProjectClick={(projectId) => {
                  closeModalWithUrl(setIsWorkOpen);
                  setOpenedFromIndex(true);
                  if (projectId === 'toolkit' || projectId === 'dailymotion' || projectId === 'connect' || projectId === 'sqool' || projectId === 'sqool-classe' || projectId === 'france-vae' || projectId === 'pagesjaunes') {
                    openProjectWithUrl(projectId, 'executive');
                  } else if (projectId === 'androidwear') {
                    openProjectWithUrl(projectId, 'caseStudy');
                  }
                }}
                onBack={() => closeModalWithUrl(setIsWorkOpen)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Services Page Modal */}
      <AnimatePresence>
        {isServicesPageOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <ServicesPage
                systemTheme={systemTheme}
                lang={lang}
                onBack={() => closeModalWithUrl(setIsServicesPageOpen)}
                onContact={() => {
                  closeModalWithUrl(setIsServicesPageOpen);
                  openModalWithUrl('/contact');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Consulting Page Modal */}
      <AnimatePresence>
        {isConsultingOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <ConsultingPage
                systemTheme={systemTheme}
                lang={lang}
                onBack={() => closeModalWithUrl(setIsConsultingOpen)}
                onContact={() => {
                  closeModalWithUrl(setIsConsultingOpen);
                  openModalWithUrl('/contact');
                }}
                onProjectClick={(projectId) => {
                  closeModalWithUrl(setIsConsultingOpen);
                  setOpenedFromIndex(true);
                  openProjectWithUrl(projectId as 'toolkit' | 'dailymotion' | 'connect' | 'sqool' | 'sqool-classe' | 'france-vae' | 'pagesjaunes' | 'androidwear', 'executive');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Gallery Page Modal */}
      <AnimatePresence>
        {isVisualArchiveOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <VisualArchivePage
                systemTheme={systemTheme}
                lang={lang}
                onBack={() => closeModalWithUrl(setIsVisualArchiveOpen)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Signals Page Modal */}
      <AnimatePresence>
        {isSignalsOpen && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <SignalsPage
                systemTheme={systemTheme}
                lang={lang}
                onBack={() => closeModalWithUrl(setIsSignalsOpen)}
                onOpenSignal={(signalId: string) => {
                  setIsSignalsOpen(false);
                  openModalWithUrl(`/signal/${signalId}`);
                }}
                onOpenGuide={() => {
                  setIsSignalsOpen(false);
                  openModalWithUrl('/guide/claude-code');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Guide Claude Code Page */}
      <AnimatePresence>
        {guideView && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <GuideClaudeCodePage
                systemTheme={systemTheme}
                lang={lang}
                view={guideView}
                onNavigate={(target: string) => {
                  if (target === 'blog') {
                    setGuideView(null);
                    openModalWithUrl('/signals');
                  } else if (target === 'index') {
                    openModalWithUrl('/guide/claude-code');
                  } else {
                    openModalWithUrl(`/guide/claude-code/${target}`);
                  }
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Signal Detail Page */}
      <AnimatePresence>
        {openSignalId && (
          <ErrorBoundary systemTheme={systemTheme}>
            <Suspense fallback={<PageLoader />}>
              <SignalDetailPage
                signalId={openSignalId}
                systemTheme={systemTheme}
                lang={lang}
                onBack={() => {
                  setOpenSignalId(null);
                  window.history.pushState({ lang }, '', `/?lang=${lang}`);
                  updateMetaTags(DEFAULT_SEO);
                }}
                onOpenSignal={(newSignalId: string) => {
                  openModalWithUrl(`/signal/${newSignalId}`);
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
