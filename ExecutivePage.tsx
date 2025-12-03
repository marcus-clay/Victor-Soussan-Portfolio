import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import jsPDF from 'jspdf';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Linkedin,
  Phone,
  Calendar,
  MessageCircle,
  Download,
  FileText,
  Copy,
  Check,
  Video,
} from 'lucide-react';

// Apple-style spring transition for lightbox
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Slide transition for carousel
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
};

// Helper to load image as base64
const loadImageAsBase64 = (src: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

// PDF generation function for the Executive Profile deck
const generateExecutivePDF = async (lang: 'en' | 'fr', setGenerating?: (v: boolean) => void) => {
  if (setGenerating) setGenerating(true);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 297mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 210mm
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Colors (RGB values for jsPDF)
  const black: [number, number, number] = [17, 24, 39];
  const gray500: [number, number, number] = [107, 114, 128];
  const gray400: [number, number, number] = [156, 163, 175];
  const gray200: [number, number, number] = [229, 231, 235];

  // Helper to add centered text
  const addCenteredText = (text: string, y: number, fontSize: number, color: [number, number, number], fontStyle: 'normal' | 'bold' = 'normal') => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);
    pdf.setFont('helvetica', fontStyle);
    pdf.text(text, pageWidth / 2, y, { align: 'center' });
  };

  // Helper to add left-aligned text
  const addLeftText = (text: string, x: number, y: number, fontSize: number, color: [number, number, number], fontStyle: 'normal' | 'bold' = 'normal', maxWidth?: number) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);
    pdf.setFont('helvetica', fontStyle);
    if (maxWidth) {
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return lines.length;
    }
    pdf.text(text, x, y);
    return 1;
  };

  // Helper to add slide number
  const addSlideNumber = (index: number, total: number) => {
    pdf.setFontSize(9);
    pdf.setTextColor(...gray400);
    pdf.text(`${index + 1} / ${total}`, pageWidth - margin, pageHeight - 12);
  };

  // Helper to add image with aspect ratio preservation
  const addImage = async (src: string, x: number, y: number, maxWidth: number, maxHeight: number, rounded = false) => {
    const imgData = await loadImageAsBase64(src);
    if (imgData) {
      // Calculate dimensions preserving aspect ratio
      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = imgData;
      });

      let w = maxWidth;
      let h = (img.height / img.width) * w;
      if (h > maxHeight) {
        h = maxHeight;
        w = (img.width / img.height) * h;
      }

      // Center the image in the available space
      const xOffset = x + (maxWidth - w) / 2;
      const yOffset = y + (maxHeight - h) / 2;

      if (rounded) {
        // For rounded images, we'll just add them normally (jsPDF doesn't support clipping easily)
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, w, h);
      } else {
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, w, h);
      }
    }
  };

  const slides = SLIDES[lang];
  const visibleSlides = slides.filter(s => s.type !== 'farewell');
  const total = visibleSlides.length;

  // Generate each slide
  for (let index = 0; index < visibleSlides.length; index++) {
    const slide = visibleSlides[index];
    if (index > 0) pdf.addPage();

    addSlideNumber(index, total);

    switch (slide.type) {
      case 'title':
        // Portrait image centered
        if (slide.visual) {
          await addImage(slide.visual, pageWidth / 2 - 20, 40, 40, 40, true);
        }
        addCenteredText(slide.headline || '', 100, 36, black, 'bold');
        addCenteredText(slide.subline || '', 115, 14, gray500);
        break;

      case 'bigword':
        addCenteredText(slide.headline || '', pageHeight / 2 - 5, 64, black, 'bold');
        if (slide.subline) {
          addCenteredText(slide.subline, pageHeight / 2 + 20, 16, gray400);
        }
        break;

      case 'metric': {
        // Left side: text (35%), Right side: image (60%)
        const textWidth = contentWidth * 0.35;
        const imageWidth = contentWidth * 0.58;
        const imageX = margin + textWidth + contentWidth * 0.07;

        // Text on left
        addLeftText(slide.headline || '', margin, 70, 42, black, 'bold');
        if (slide.subline) {
          addLeftText(slide.subline, margin, 90, 12, gray500, 'normal', textWidth);
        }

        // Image on right
        if (slide.visual) {
          await addImage(slide.visual, imageX, 30, imageWidth, pageHeight - 60);
        }
        break;
      }

      case 'timeline': {
        addCenteredText(slide.headline || '', 30, 28, black, 'bold');
        const timelineItems = slide.items as Array<{ year: string; company: string; desc: string }>;
        let yPos = 50;
        const lineHeight = 22;

        timelineItems?.forEach((item) => {
          // Year
          pdf.setFontSize(10);
          pdf.setTextColor(...gray400);
          pdf.setFont('helvetica', 'normal');
          pdf.text(item.year, margin, yPos);

          // Company name
          pdf.setFontSize(13);
          pdf.setTextColor(...black);
          pdf.setFont('helvetica', 'bold');
          pdf.text(item.company, margin + 25, yPos);

          // Description
          pdf.setFontSize(10);
          pdf.setTextColor(...gray500);
          pdf.setFont('helvetica', 'normal');
          pdf.text(item.desc, margin + 25, yPos + 6);

          // Separator line
          pdf.setDrawColor(...gray200);
          pdf.setLineWidth(0.3);
          pdf.line(margin + 25, yPos + 12, pageWidth - margin, yPos + 12);

          yPos += lineHeight;
        });
        break;
      }

      case 'pillar': {
        // Left side: text (35%), Right side: image (60%)
        const textWidth = contentWidth * 0.35;
        const imageWidth = contentWidth * 0.58;
        const imageX = margin + textWidth + contentWidth * 0.07;

        // Title
        addLeftText(slide.headline || '', margin, 50, 32, black, 'bold');

        // Items
        const pillarItems = slide.items as string[];
        let itemY = 70;
        pillarItems?.forEach((item) => {
          pdf.setFillColor(...black);
          pdf.circle(margin + 2, itemY - 2, 1.5, 'F');
          const lines = addLeftText(item, margin + 8, itemY, 11, gray500, 'normal', textWidth - 10);
          itemY += 10 + (lines - 1) * 5;
        });

        // Image on right
        if (slide.visual) {
          await addImage(slide.visual, imageX, 30, imageWidth, pageHeight - 60);
        }
        break;
      }

      case 'bento': {
        // Left side: text (30%), Right side: bento images (65%)
        const textWidth = contentWidth * 0.30;
        const imageAreaWidth = contentWidth * 0.62;
        const imageX = margin + textWidth + contentWidth * 0.08;

        // Title
        addLeftText(slide.headline || '', margin, 50, 32, black, 'bold');

        // Items
        const bentoItems = slide.items as string[];
        let itemY = 70;
        bentoItems?.forEach((item) => {
          pdf.setFillColor(...gray400);
          pdf.circle(margin + 2, itemY - 2, 1.5, 'F');
          const lines = addLeftText(item, margin + 8, itemY, 10, gray500, 'normal', textWidth - 10);
          itemY += 10 + (lines - 1) * 5;
        });

        // Bento layout: 1 large on top, 2 smaller below
        const bentoVisuals = slide.visuals as string[];
        if (bentoVisuals && bentoVisuals.length > 0) {
          const gap = 4;
          const largeHeight = (pageHeight - 60) * 0.6;
          const smallHeight = (pageHeight - 60) * 0.35;

          // Large image on top
          if (bentoVisuals[0]) {
            await addImage(bentoVisuals[0], imageX, 25, imageAreaWidth, largeHeight);
          }

          // Two smaller images below
          const smallWidth = (imageAreaWidth - gap) / 2;
          if (bentoVisuals[1]) {
            await addImage(bentoVisuals[1], imageX, 25 + largeHeight + gap, smallWidth, smallHeight);
          }
          if (bentoVisuals[2]) {
            await addImage(bentoVisuals[2], imageX + smallWidth + gap, 25 + largeHeight + gap, smallWidth, smallHeight);
          }
        }
        break;
      }

      case 'info': {
        addCenteredText(slide.headline || '', 70, 32, black, 'bold');
        const infoItems = slide.items as string[];
        let infoY = 100;
        infoItems?.forEach((item) => {
          addCenteredText(item, infoY, 14, gray500);
          infoY += 14;
        });
        break;
      }

      case 'contact': {
        addCenteredText(slide.headline || '', 50, 32, black, 'bold');

        // Contact info
        let contactY = 90;
        pdf.setFontSize(12);
        pdf.setTextColor(...gray500);

        if (slide.email) {
          addCenteredText(slide.email, contactY, 12, gray500);
          contactY += 12;
        }
        if (slide.linkedin) {
          addCenteredText(slide.linkedin, contactY, 12, gray500);
          contactY += 12;
        }
        if (slide.phone) {
          addCenteredText(slide.phone, contactY, 12, gray500);
        }
        break;
      }
    }
  }

  // Save the PDF
  const filename = lang === 'fr'
    ? 'Victor_Soussan_Profil_Executif.pdf'
    : 'Victor_Soussan_Executive_Profile.pdf';
  pdf.save(filename);

  if (setGenerating) setGenerating(false);
};

// Slide content - keynote style with visuals and big words
const SLIDES = {
  en: [
    // 1. Title with portrait
    {
      type: 'title',
      headline: 'Victor Soussan',
      subline: 'Senior Product Designer & Design Lead',
      visual: '/images/victor-soussan.png',
    },
    // 2. Big statement
    {
      type: 'bigword',
      headline: 'Shape.',
      subline: 'Strategy, systems, and craft.',
    },
    // 3. Experience
    {
      type: 'metric',
      headline: '15 years',
      subline: 'In tech. 10 in product design. From agency creative to product leadership.',
      visual: '/images/sqool/hero_ecosystem_sqool.webp',
    },
    // 4. Scale
    {
      type: 'metric',
      headline: '500K+',
      subline: 'Students using SQOOL. Deployed across 465 French public schools.',
      visual: '/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.jpg',
    },
    // 5. Career Timeline
    {
      type: 'timeline',
      headline: 'Career Path',
      items: [
        { year: '2025', company: 'Freelance', desc: 'Toolkit.ac SaaS, Banque des Territoires UX, AI agents & Condamine Apps' },
        { year: '2025', company: 'France VAE', desc: 'Public service for professional certification' },
        { year: '2018', company: 'UNOWHY', desc: 'EdTech — Device management, classroom supervision' },
        { year: '2017', company: 'Dailymotion', desc: 'Video platform — Upload, distribution, publishing' },
        { year: '2016', company: 'Ogury', desc: 'AdTech — Campaign reporting dashboards' },
        { year: '2014', company: 'PagesJaunes', desc: 'Media — Mobile apps, 22M downloads' },
        { year: '2010', company: 'Airbus', desc: 'Aerospace — Internal social network for 15K managers' },
      ],
    },
    // 6. Designer pillar with bento visuals
    {
      type: 'bento',
      headline: 'Designer',
      items: [
        'End-to-end product design: research, flows, UI, prototypes',
        'Design systems built for real dev handoff',
      ],
      visuals: [
        '/images/thumbnail-dailymotion-web-platform.webp',
        '/images/thumbnail-sqool-suite.webp',
        '/images/thumbnail-toolkit.webp',
      ],
    },
    // 7. Design Lead pillar with photos
    {
      type: 'bento',
      headline: 'Design Lead',
      items: [
        'Hiring, mentoring, career paths',
        'Ideation workshops, design teardowns, C-level presentations',
      ],
      visuals: [
        '/images/photos victor/photo victor demo.png',
        '/images/photos victor/vic conference talk.jpeg',
        '/images/photos victor/photo atelier aap.jpg',
      ],
    },
    // 8. AI Builder pillar with bento visuals
    {
      type: 'bento',
      headline: 'AI Product Builder',
      items: [
        '37+ apps designed and deployed',
      ],
      button: {
        label: 'Try the apps',
        url: 'https://imaginative-youtiao-371d08.netlify.app',
      },
      visuals: [
        '/images/condamine apps/condamine apps 01.png',
        '/images/condamine apps/condamine apps 03.png',
        '/images/condamine apps/condamine apps 05.png',
      ],
    },
    // 9. Big statement - Method
    {
      type: 'bigword',
      headline: 'Systems.',
      subline: 'Beyond screens.',
    },
    // 10. How I work
    {
      type: 'pillar',
      headline: 'How I work',
      items: [
        'Direct communication',
        'Proactive problem-solving',
        'Team player',
      ],
      visual: '/images/photos victor/alexis victor hiba ateliers fiction 02.jpg',
    },
    // 11. My approach
    {
      type: 'pillar',
      headline: 'My approach',
      items: [
        'From ambiguity to clarity — defining what your product should be',
        'Vision-driven design, grounded in prototyping and craft',
        'Collaborative teamwork, fast delivery',
      ],
      video: '/videos/connect/Video-demo-bulle-interactions-02.mp4',
    },
    // 12. Testimonials
    {
      type: 'testimonials',
      headline: 'What they say',
      testimonials: [
        {
          quote: 'Victor didn\'t just create mockups. He transformed business requirements into perfectly adapted user journeys. Victor is a great guy: curious, positive, ready to challenge to go further.',
          author: 'Pierre-Marie Nigay',
          role: 'Founder of Toolkit',
          image: 'pierre-marie-nigay.png',
          linkedin: 'https://www.linkedin.com/in/pierremarienigay',
        },
        {
          quote: 'Victor combines overflowing creativity with impressive rigor. He translates complex visions into clear, impactful user experiences. Always listening, curious, he constantly pushes thinking further.',
          author: 'Charlotte Rifflet',
          role: 'CPO @UNOWHY',
          image: 'charlotte-rifflet.png',
          linkedin: 'https://www.linkedin.com/in/charlotterifflet',
        },
        {
          quote: 'As Product Lead in UI & Interaction Design, he played a central role in defining the product vision... I was struck by Victor\'s curiosity and his ability to share knowledge pedagogically.',
          author: 'Justine Le Tellier',
          role: 'UX Researcher @UNOWHY',
          image: 'justine-le-tellier.png',
          linkedin: 'https://www.linkedin.com/in/justine-le-tellier',
        },
      ],
    },
    // 13. Availability
    {
      type: 'info',
      headline: 'Availability',
      items: [
        'Open to CDI or freelance missions',
        'Paris or remote',
        'Start: flexible',
      ],
    },
    // 14. Contact
    {
      type: 'contact',
      headline: 'Let\'s talk',
      email: 'victorsoussan@gmail.com',
      linkedin: 'linkedin.com/in/victorsoussan',
      phone: '+33 6 15 98 94 00',
    },
    // 15. Farewell (shown after modal closes)
    {
      type: 'farewell',
      headline: 'See you soon',
      visual: '/images/victor-soussan.png',
    },
  ],
  fr: [
    // 1. Title with portrait
    {
      type: 'title',
      headline: 'Victor Soussan',
      subline: 'Senior Product Designer & Design Lead',
      visual: '/images/victor-soussan.png',
    },
    // 2. Big statement
    {
      type: 'bigword',
      headline: 'Donner forme.',
      subline: 'Stratégie, systèmes et craft.',
    },
    // 3. Experience
    {
      type: 'metric',
      headline: '15 ans',
      subline: 'Dans la tech. 10 en product design. Du créatif en agence au leadership produit.',
      visual: '/images/sqool/hero_ecosystem_sqool.webp',
    },
    // 4. Scale
    {
      type: 'metric',
      headline: '500K+',
      subline: 'Élèves utilisent SQOOL. Déployé dans 465 écoles publiques françaises.',
      visual: '/images/sqool/image-unowhy-region-iledefrance-distribution-rentree.jpg',
    },
    // 5. Career Timeline
    {
      type: 'timeline',
      headline: 'Parcours',
      items: [
        { year: '2025', company: 'Freelance', desc: 'Toolkit.ac SaaS, Banque des Territoires UX, agents IA & Condamine Apps' },
        { year: '2025', company: 'France VAE', desc: 'Service public pour la certification professionnelle' },
        { year: '2018', company: 'UNOWHY', desc: 'EdTech — Gestion de parc, supervision de classe' },
        { year: '2017', company: 'Dailymotion', desc: 'Vidéo — Upload, distribution, publication' },
        { year: '2016', company: 'Ogury', desc: 'AdTech — Dashboards de reporting campagnes' },
        { year: '2014', company: 'PagesJaunes', desc: 'Media — Apps mobiles, 22M téléchargements' },
        { year: '2010', company: 'Airbus', desc: 'Aéronautique — Réseau social interne pour 15K managers' },
      ],
    },
    // 6. Designer pillar with bento visuals
    {
      type: 'bento',
      headline: 'Designer',
      items: [
        'Design produit end-to-end : research, flows, UI, prototypes',
        'Design systems pensés pour le handoff dev',
      ],
      visuals: [
        '/images/thumbnail-dailymotion-web-platform.webp',
        '/images/thumbnail-sqool-suite.webp',
        '/images/thumbnail-toolkit.webp',
      ],
    },
    // 7. Design Lead pillar with photos
    {
      type: 'bento',
      headline: 'Design Lead',
      items: [
        'Recrutement, mentoring, plans de carrière',
        'Ateliers d\'idéation, design teardowns, présentations C-levels',
      ],
      visuals: [
        '/images/photos victor/photo victor demo.png',
        '/images/photos victor/vic conference talk.jpeg',
        '/images/photos victor/photo atelier aap.jpg',
      ],
    },
    // 8. AI Builder pillar with bento visuals
    {
      type: 'bento',
      headline: 'AI Product Builder',
      items: [
        '37+ apps conçues et déployées',
      ],
      button: {
        label: 'Tester les apps',
        url: 'https://imaginative-youtiao-371d08.netlify.app',
      },
      visuals: [
        '/images/condamine apps/condamine apps 01.png',
        '/images/condamine apps/condamine apps 03.png',
        '/images/condamine apps/condamine apps 05.png',
      ],
    },
    // 9. Big statement - Method
    {
      type: 'bigword',
      headline: 'Systèmes.',
      subline: 'Au-delà des écrans.',
    },
    // 10. How I work
    {
      type: 'pillar',
      headline: 'Comment je travaille',
      items: [
        'Communication directe',
        'Résolution proactive des problèmes',
        'Team player',
      ],
      visual: '/images/photos victor/alexis victor hiba ateliers fiction 02.jpg',
    },
    // 11. My approach
    {
      type: 'pillar',
      headline: 'Mon approche',
      items: [
        'De l\'ambiguïté à la clarté — définir ce que doit être votre produit',
        'Design guidé par la vision, ancré dans le prototypage et le craft',
        'Travail collaboratif, livraison rapide',
      ],
      video: '/videos/connect/Video-demo-bulle-interactions-02.mp4',
    },
    // 12. Testimonials
    {
      type: 'testimonials',
      headline: 'Ce qu\'ils disent',
      testimonials: [
        {
          quote: 'Victor ne s\'est pas contenté de faire des maquettes. Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés. Victor est un super gars : curieux, positif, prêt à challenger pour aller toujours plus loin.',
          author: 'Pierre-Marie Nigay',
          role: 'Fondateur de Toolkit',
          image: 'pierre-marie-nigay.png',
          linkedin: 'https://www.linkedin.com/in/pierremarienigay',
        },
        {
          quote: 'Victor allie une créativité débordante à une rigueur de travail impressionnante. Il sait traduire des visions complexes en expériences utilisateur claires et percutantes. Toujours à l\'écoute, curieux, il pousse constamment les réflexions plus loin.',
          author: 'Charlotte Rifflet',
          role: 'CPO @UNOWHY',
          image: 'charlotte-rifflet.png',
          linkedin: 'https://www.linkedin.com/in/charlotterifflet',
        },
        {
          quote: 'En tant que Product Lead en UI & Interaction Design, il a joué un rôle central dans la définition de la vision produit... J\'ai été très marquée par la curiosité de Victor et sa capacité à partager son savoir avec pédagogie.',
          author: 'Justine Le Tellier',
          role: 'UX Researcher @UNOWHY',
          image: 'justine-le-tellier.png',
          linkedin: 'https://www.linkedin.com/in/justine-le-tellier',
        },
      ],
    },
    // 13. Availability
    {
      type: 'info',
      headline: 'Disponibilité',
      items: [
        'Ouvert CDI ou missions freelance',
        'Paris ou remote',
        'Démarrage : flexible',
      ],
    },
    // 14. Contact
    {
      type: 'contact',
      headline: 'Parlons-en',
      email: 'victorsoussan@gmail.com',
      linkedin: 'linkedin.com/in/victorsoussan',
      phone: '+33 6 15 98 94 00',
    },
    // 15. Farewell (shown after modal closes)
    {
      type: 'farewell',
      headline: 'À bientôt',
      visual: '/images/victor-soussan.png',
    },
  ],
};

interface ExecutivePageProps {
  language?: 'en' | 'fr';
  onClose: () => void;
  onBookCall?: () => void;
  onContact?: () => void;
  onOpenResume?: (lang: 'fr' | 'en') => void;
  showFarewell?: boolean;
}

// Clickable image component with hover effect and iPadOS-style border
const ClickableImage = ({
  src,
  alt = '',
  className = '',
  onClick,
  hasWhiteBg = false
}: {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  hasWhiteBg?: boolean;
}) => (
  <motion.div
    className={`relative overflow-hidden cursor-pointer group ${className}`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover transition-all duration-300 group-hover:brightness-95 ${
        hasWhiteBg ? 'border border-gray-200/60 rounded-xl shadow-sm' : ''
      }`}
    />
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
  </motion.div>
);

export default function ExecutivePage({ language = 'fr', onClose, onBookCall, onContact, onOpenResume, showFarewell }: ExecutivePageProps) {
  const [lang, setLang] = useState<'en' | 'fr'>(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [videoLightboxSrc, setVideoLightboxSrc] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const slides = SLIDES[lang];

  // Copy to clipboard helper
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Motion values for parallax effect in lightbox
  const dragX = useMotionValue(0);
  const parallaxX = useTransform(dragX, [-300, 0, 300], [30, 0, -30]);
  // Hide farewell slide unless showFarewell is true
  const visibleSlides = showFarewell ? slides : slides.filter(s => s.type !== 'farewell');
  const totalSlides = visibleSlides.length;

  // Collect all images from all slides for lightbox navigation
  const allImages = visibleSlides.flatMap(s => {
    const images: string[] = [];
    if (s.visual && s.type !== 'title' && s.type !== 'farewell') images.push(s.visual);
    if (s.visuals) images.push(...(s.visuals as string[]));
    return images;
  });

  // Jump to farewell slide when showFarewell becomes true
  useEffect(() => {
    if (showFarewell) {
      const farewellIndex = slides.findIndex(s => s.type === 'farewell');
      if (farewellIndex >= 0) {
        setCurrentSlide(farewellIndex);
      }
    }
  }, [showFarewell, slides]);

  const slide = visibleSlides[currentSlide];

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Open lightbox with specific image
  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex(img => img === imageSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setPage([index, 0]);
      setLightboxZoomed(false);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Open video lightbox
  const openVideoLightbox = (videoSrc: string) => {
    setVideoLightboxSrc(videoSrc);
    setVideoLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close video lightbox
  const closeVideoLightbox = () => {
    setVideoLightboxOpen(false);
    setVideoLightboxSrc(null);
    document.body.style.overflow = '';
  };

  // Navigate to next/previous image in lightbox
  const paginateLightbox = useCallback((newDirection: number) => {
    const newIndex = lightboxIndex + newDirection;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setLightboxIndex(newIndex);
      setPage([newIndex, newDirection]);
      setLightboxZoomed(false);
    }
  }, [lightboxIndex, allImages.length]);

  // Handle drag end for swipe navigation in lightbox
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      if (lightboxIndex < allImages.length - 1) paginateLightbox(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      if (lightboxIndex > 0) paginateLightbox(-1);
    }
    dragX.set(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If video lightbox is open, handle Escape
      if (videoLightboxOpen) {
        if (e.key === 'Escape') closeVideoLightbox();
        return;
      }
      // If image lightbox is open, handle its navigation
      if (lightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') paginateLightbox(1);
        if (e.key === 'ArrowLeft') paginateLightbox(-1);
        return;
      }
      // Otherwise handle slide navigation
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, onClose, lightboxOpen, videoLightboxOpen, paginateLightbox]);

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            {slide.visual && (
              <img
                src={slide.visual}
                alt=""
                className="w-32 h-32 rounded-full object-cover mb-8 border-4 border-gray-100"
              />
            )}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
              {slide.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light">
              {slide.subline}
            </p>
          </div>
        );

      case 'statement':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              {slide.headline}
            </h2>
            {slide.subline && (
              <p className="text-xl md:text-2xl text-gray-500 font-light">
                {slide.subline}
              </p>
            )}
          </div>
        );

      case 'metric':
        return (
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-8 lg:gap-16 px-6 md:px-12 lg:px-20">
            <div className="flex-shrink-0 lg:w-[35%]">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
                {slide.headline}
              </h2>
              <p className="text-lg md:text-xl text-gray-500 font-light">
                {slide.subline}
              </p>
            </div>
            {slide.visual && (
              <ClickableImage
                src={slide.visual}
                className="flex-1 w-full lg:w-[60%] max-h-[60vh] rounded-2xl shadow-xl"
                onClick={() => openLightbox(slide.visual!)}
              />
            )}
          </div>
        );

      case 'pillar':
        const pillarItems = slide.items as string[];
        const pillarVideo = slide.video as string | undefined;
        return (
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-8 lg:gap-16 px-6 md:px-12 lg:px-20">
            <div className="flex-shrink-0 lg:w-[35%]">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {slide.headline}
              </h2>
              <ul className="space-y-3">
                {pillarItems?.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-base md:text-lg text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {pillarVideo ? (
              <motion.div
                className="group relative flex-1 w-full lg:w-[60%] max-h-[60vh] rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                onClick={() => openVideoLightbox(pillarVideo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  src={pillarVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                {/* Hover overlay with expand icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ) : slide.visual && (
              <ClickableImage
                src={slide.visual}
                className="flex-1 w-full lg:w-[60%] max-h-[60vh] rounded-2xl shadow-xl"
                onClick={() => openLightbox(slide.visual!)}
              />
            )}
          </div>
        );

      case 'list':
        const listItems = slide.items as string[];
        return (
          <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight text-center">
              {slide.headline}
            </h2>
            <ul className="space-y-6 w-full">
              {listItems?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-xl md:text-2xl text-gray-700">
                  <span className="w-3 h-3 rounded-full bg-gray-900 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'vocabulary':
      case 'tools':
        const toolsItems = slide.items as string[];
        return (
          <div className="flex flex-col items-center justify-center h-full px-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight text-center">
              {slide.headline}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {toolsItems?.map((item, idx) => (
                <span
                  key={idx}
                  className="px-6 py-3 bg-gray-100 rounded-full text-lg md:text-xl text-gray-800 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );

      case 'info':
        const infoItems = slide.items as string[];
        return (
          <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight text-center">
              {slide.headline}
            </h2>
            <ul className="space-y-4 text-center">
              {infoItems?.map((item, idx) => (
                <li key={idx} className="text-xl md:text-2xl text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'testimonials':
        const testimonialsList = slide.testimonials as { quote: string; author: string; role: string; image?: string; linkedin?: string }[];
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight text-center">
              {slide.headline}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
              {testimonialsList?.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex flex-col p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Author info with avatar */}
                  <div className="flex items-center mb-5">
                    {testimonial.image ? (
                      <img
                        src={`/images/${testimonial.image}`}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-3 border-2 border-white shadow-sm object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full mr-3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      {testimonial.linkedin ? (
                        <a
                          href={testimonial.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-gray-900 hover:text-[#0077b5] transition-colors flex items-center group"
                        >
                          {testimonial.author}
                          <Linkedin size={14} className="ml-1.5 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                        </a>
                      ) : (
                        <div className="font-bold text-gray-900">{testimonial.author}</div>
                      )}
                      <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mt-1">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1">
                    <div className="text-3xl text-gray-200 absolute -top-1 -left-1">"</div>
                    <p className="text-gray-600 text-[15px] leading-relaxed pl-4 pt-2">
                      {testimonial.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-20 py-8">
            {/* Zone 1: Title + Primary buttons */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                {slide.headline}
              </h2>

              {/* Primary action buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {onBookCall && (
                  <button
                    onClick={onBookCall}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    <Video size={20} />
                    {lang === 'fr' ? 'En visio' : 'Video call'}
                  </button>
                )}
                {onContact && (
                  <button
                    onClick={onContact}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full text-lg font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Mail size={20} />
                    {lang === 'fr' ? 'Par écrit' : 'By email'}
                  </button>
                )}
              </div>
            </div>

            {/* Zone 2: Contact info card */}
            <div className="mb-8">
              <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-4 max-w-md">
                {/* Email */}
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${slide.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-sm">{slide.email}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(slide.email || '', 'email')}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    title={lang === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedField === 'email' ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`https://${slide.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin size={18} className="text-gray-400" />
                    <span className="text-sm">{slide.linkedin}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(`https://${slide.linkedin}`, 'linkedin')}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    title={lang === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedField === 'linkedin' ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`tel:${slide.phone?.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Phone size={18} className="text-gray-400" />
                    <span className="text-sm">{slide.phone}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(slide.phone || '', 'phone')}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    title={lang === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedField === 'phone' ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Download CV */}
                {onOpenResume && (
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={() => onOpenResume(lang)}
                      className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors w-full"
                    >
                      <Download size={18} className="text-gray-400" />
                      <span className="text-sm">{lang === 'fr' ? 'Télécharger mon CV' : 'Download my resume'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Zone 3: Download deck */}
            <div className="mt-4">
              <button
                onClick={() => generateExecutivePDF(lang, setIsGeneratingPDF)}
                disabled={isGeneratingPDF}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm border rounded-full transition-colors ${
                  isGeneratingPDF
                    ? 'text-gray-300 border-gray-200 cursor-wait'
                    : 'text-gray-400 hover:text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {isGeneratingPDF ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Download size={14} />
                )}
                {isGeneratingPDF
                  ? (lang === 'fr' ? 'Génération...' : 'Generating...')
                  : (lang === 'fr' ? 'Télécharger ce deck' : 'Download this deck')
                }
              </button>
            </div>
          </div>
        );

      case 'closing':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
              {slide.headline}
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">
              {slide.subline}
            </p>
          </div>
        );

      case 'bigword':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <h2 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-gray-900 tracking-tighter leading-none">
              {slide.headline}
            </h2>
            {slide.subline && (
              <p className="text-2xl md:text-4xl text-gray-400 font-light mt-4 tracking-wide">
                {slide.subline}
              </p>
            )}
          </div>
        );

      case 'timeline':
        const timelineItems = slide.items as Array<{ year: string; company: string; desc: string }>;
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 md:px-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 tracking-tight text-center">
              {slide.headline}
            </h2>
            <div className="w-full space-y-4">
              {timelineItems?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 group">
                  <span className="text-lg font-mono text-gray-400 w-16 flex-shrink-0 pt-1">
                    {item.year}
                  </span>
                  <div className="flex-1 pb-4 border-b border-gray-100 group-last:border-0">
                    <span className="text-xl md:text-2xl font-semibold text-gray-900">
                      {item.company}
                    </span>
                    <p className="text-base md:text-lg text-gray-500 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bento':
        const bentoVisuals = slide.visuals as string[];
        const bentoItems = slide.items as string[];
        const bentoButton = slide.button as { label: string; url: string } | undefined;
        // Check if this is the AI Product Builder slide (condamine apps have white backgrounds)
        const isCondamineApps = bentoVisuals?.[0]?.includes('condamine apps');
        return (
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-8 lg:gap-12 px-6 md:px-12 lg:px-20">
            {/* Left: Title + items */}
            <div className="flex-shrink-0 lg:w-[30%]">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {slide.headline}
              </h2>
              <ul className="space-y-3">
                {bentoItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* Liquid Glass Button */}
              {bentoButton && (
                <a
                  href={bentoButton.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-medium text-gray-700
                    bg-white/60 backdrop-blur-xl border border-white/40
                    shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)]
                    hover:bg-white/80 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)]
                    transition-all duration-300"
                >
                  {bentoButton.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            {/* Right: 1 large + 2 small bento layout */}
            <div className="flex-1 w-full lg:w-[65%] max-h-[70vh]">
              <div className="flex flex-col gap-3 h-full">
                {/* Large image on top */}
                {bentoVisuals?.[0] && (
                  <ClickableImage
                    src={bentoVisuals[0]}
                    className="flex-[2] rounded-xl"
                    onClick={() => openLightbox(bentoVisuals[0])}
                    hasWhiteBg={isCondamineApps}
                  />
                )}
                {/* 2 smaller images below */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {bentoVisuals?.slice(1, 3).map((src, idx) => (
                    <ClickableImage
                      key={idx}
                      src={src}
                      className="rounded-xl h-full"
                      onClick={() => openLightbox(src)}
                      hasWhiteBg={isCondamineApps}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'farewell':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            {slide.visual && (
              <img
                src={slide.visual}
                alt=""
                className="w-40 h-40 rounded-full object-cover mb-10 border-4 border-gray-100 shadow-xl"
              />
            )}
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
              {slide.headline}
            </h2>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      className="fixed inset-0 z-[100] bg-white"
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between border-b border-gray-100">
        {/* Left: Title */}
        <span className="text-sm text-gray-500 font-medium">
          {lang === 'fr' ? 'Présentation en 1-min' : '1-min Presentation'}
        </span>

        {/* Center: Slide counter + Language toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-sm text-gray-400 font-mono">
            {currentSlide + 1} / {totalSlides}
          </span>
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                lang === 'fr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              FR
            </button>
          </div>
        </div>

        {/* Right: Close button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </header>

      {/* Main content */}
      <main className="h-full pt-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full"
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between">
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className={`p-3 rounded-full transition-colors ${
            currentSlide === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {visibleSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-gray-900 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={currentSlide === totalSlides - 1}
          className={`p-3 rounded-full transition-colors ${
            currentSlide === totalSlides - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </footer>

      {/* Keyboard hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-gray-400">
        {lang === 'fr' ? 'Flèches ← → pour naviguer' : '← → arrows to navigate'}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginateLightbox(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <ChevronLeft size={28} />
              </motion.button>
            )}

            {lightboxIndex < allImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={springTransition}
                onClick={(e) => { e.stopPropagation(); paginateLightbox(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <ChevronRight size={28} />
              </motion.button>
            )}

            {/* Image container with carousel */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-20 py-20">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 350, damping: 35 },
                    opacity: { duration: 0.2 },
                    scale: { type: 'spring', stiffness: 350, damping: 35 },
                  }}
                  drag={lightboxZoomed ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDrag={(_, info) => dragX.set(info.offset.x)}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute w-full h-full ${
                    lightboxZoomed
                      ? 'overflow-y-auto overflow-x-hidden cursor-grab active:cursor-grabbing'
                      : 'flex flex-col items-center justify-center cursor-grab active:cursor-grabbing'
                  }`}
                >
                  {lightboxZoomed ? (
                    /* Zoomed mode - Full scrollable container */
                    <div
                      className="min-h-full w-full flex flex-col items-center py-16 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxZoomed(false);
                      }}
                    >
                      <motion.img
                        src={allImages[lightboxIndex]}
                        alt=""
                        className="w-[95vw] md:w-[90vw] h-auto rounded-lg shadow-2xl cursor-zoom-out"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                        draggable={false}
                      />
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 mb-8 text-gray-400 text-xs"
                      >
                        {lang === 'fr' ? 'Cliquez pour quitter le zoom' : 'Click to exit zoom'}
                      </motion.p>
                    </div>
                  ) : (
                    /* Normal mode - Centered with constraints */
                    <motion.div
                      style={{ x: parallaxX }}
                      className="relative max-w-[90vw] max-h-[70vh] md:max-w-[80vw] md:max-h-[75vh]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxZoomed(true);
                      }}
                    >
                      <motion.img
                        src={allImages[lightboxIndex]}
                        alt=""
                        className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain cursor-zoom-in rounded-lg shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                        draggable={false}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-mono">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {videoLightboxOpen && videoLightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeVideoLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeVideoLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={springTransition}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-[95vw] max-h-[90vh] flex items-center justify-center p-4 md:p-8"
            >
              <video
                src={videoLightboxSrc}
                className="max-w-full max-h-full rounded-2xl shadow-2xl"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            </motion.div>

            {/* Hint to close */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lang === 'fr' ? 'Cliquez en dehors pour fermer' : 'Click outside to close'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
