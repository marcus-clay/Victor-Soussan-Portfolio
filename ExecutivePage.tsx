import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import jsPDF from 'jspdf';
import CareerCarousel from './src/components/CareerCarousel';
import { careerData } from './src/data/careerData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Linkedin,
  Phone,
  Download,
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
// direction === 0 means initial open (zoom from center)
// direction > 0 means navigating forward (slide from right)
// direction < 0 means navigating backward (slide from left)
const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: direction === 0 ? 0.8 : 0.95,
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
        // Use careerData directly for PDF generation
        let yPos = 50;
        const lineHeight = 22;

        careerData.forEach((item) => {
          // Year
          pdf.setFontSize(10);
          pdf.setTextColor(...gray400);
          pdf.setFont('helvetica', 'normal');
          pdf.text(item.period.split('-')[0], margin, yPos);

          // Company name
          pdf.setFontSize(13);
          pdf.setTextColor(...black);
          pdf.setFont('helvetica', 'bold');
          pdf.text(item.company, margin + 25, yPos);

          // Role (description)
          pdf.setFontSize(10);
          pdf.setTextColor(...gray500);
          pdf.setFont('helvetica', 'normal');
          pdf.text(item.role[lang], margin + 25, yPos + 6);

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

      case 'testimonials': {
        addCenteredText(slide.headline || '', 25, 24, black, 'bold');
        const testimonials = slide.testimonials as Array<{ quote: string; author: string; role: string }>;

        // Layout: 3 columns, 2 rows = 6 testimonials per page
        const colWidth = (contentWidth - 10) / 3;
        const rowHeight = 75;
        const startY = 45;

        // Show first 6 testimonials on main page
        const firstPageTestimonials = testimonials.slice(0, 6);
        firstPageTestimonials.forEach((testimonial, idx) => {
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const x = margin + col * (colWidth + 5);
          const y = startY + row * rowHeight;

          // Quote (truncated)
          const shortQuote = testimonial.quote.length > 120
            ? testimonial.quote.substring(0, 117) + '...'
            : testimonial.quote;
          pdf.setFontSize(8);
          pdf.setTextColor(...gray500);
          pdf.setFont('helvetica', 'italic');
          const quoteLines = pdf.splitTextToSize(`"${shortQuote}"`, colWidth - 5);
          pdf.text(quoteLines.slice(0, 4), x, y);

          // Author
          pdf.setFontSize(9);
          pdf.setTextColor(...black);
          pdf.setFont('helvetica', 'bold');
          pdf.text(testimonial.author, x, y + 35);

          // Role
          pdf.setFontSize(7);
          pdf.setTextColor(...gray400);
          pdf.setFont('helvetica', 'normal');
          pdf.text(testimonial.role, x, y + 41);
        });

        // If more than 6 testimonials, add additional pages
        const remainingTestimonials = testimonials.slice(6);
        let pageOffset = 0;
        while (pageOffset < remainingTestimonials.length) {
          pdf.addPage();
          addSlideNumber(index, total);
          addCenteredText(slide.headline || '', 25, 24, black, 'bold');

          const pageTestimonials = remainingTestimonials.slice(pageOffset, pageOffset + 6);
          pageTestimonials.forEach((testimonial, idx) => {
            const col = idx % 3;
            const row = Math.floor(idx / 3);
            const x = margin + col * (colWidth + 5);
            const y = startY + row * rowHeight;

            // Quote (truncated)
            const shortQuote = testimonial.quote.length > 120
              ? testimonial.quote.substring(0, 117) + '...'
              : testimonial.quote;
            pdf.setFontSize(8);
            pdf.setTextColor(...gray500);
            pdf.setFont('helvetica', 'italic');
            const quoteLines = pdf.splitTextToSize(`"${shortQuote}"`, colWidth - 5);
            pdf.text(quoteLines.slice(0, 4), x, y);

            // Author
            pdf.setFontSize(9);
            pdf.setTextColor(...black);
            pdf.setFont('helvetica', 'bold');
            pdf.text(testimonial.author, x, y + 35);

            // Role
            pdf.setFontSize(7);
            pdf.setTextColor(...gray400);
            pdf.setFont('helvetica', 'normal');
            pdf.text(testimonial.role, x, y + 41);
          });

          pageOffset += 6;
        }
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
      subline: 'Senior Product Designer — Conceptualization & Rapid Prototyping',
      visual: '/images/victor-soussan.webp',
    },
    // 2. Big statement - Frame. Design. Ship.
    {
      type: 'bigword',
      headline: 'Frame. Design. Ship.',
      subline: 'From vision to working prototype.',
    },
    // 3. Experience
    {
      type: 'metric',
      headline: '15 years',
      subline: 'In tech. 10 in product design. Specialized in rapid conceptualization and AI-assisted prototyping.',
      visual: '/images/sqool/hero_ecosystem_sqool.webp',
      caption: 'SQOOL Suite: 6 modular apps designed from 0-to-1, design system, and team rituals (2019–2024)',
    },
    // 4. Scale
    {
      type: 'metric',
      headline: '22M+',
      subline: 'Downloads for PagesJaunes mobile apps in 2016. Award-winning smartphone & tablet experience.',
      visual: '/images/thumbnail_pagesjaunes_sp_tablette.webp',
      caption: 'Conversational homepage, iOS/Android onboarding, and map navigation redesign (2014–2016)',
    },
    // 5. Career Timeline - Uses CareerCarousel component with careerData
    {
      type: 'timeline',
      headline: 'Career Path',
    },
    // 6. FRAME - Pillar 1
    {
      type: 'bigword',
      headline: 'Frame.',
      subline: 'Product strategy, user research, team structuring.',
    },
    // 7. Frame pillar with photos
    {
      type: 'bento',
      headline: 'Frame',
      items: [
        'Product framing & vision alignment',
        'User research & interviews',
        'Team structuring & workshops',
      ],
      visuals: [
        '/images/photos victor/alexis victor hiba ateliers fiction 02.webp',
        '/images/photos victor/photo victor demo.webp',
        '/images/photos victor/photo atelier aap.webp',
      ],
      captions: [
        'Strategy workshop at UNOWHY',
        'Product demo presentation',
        'Design thinking workshop',
      ],
    },
    // 8. DESIGN - Pillar 2
    {
      type: 'bigword',
      headline: 'Design.',
      subline: 'Interactions, journeys, interfaces, animations.',
    },
    // 9. Design pillar with bento visuals
    {
      type: 'bento',
      headline: 'Design',
      items: [
        'End-to-end product design: flows, UI, micro-interactions',
        'Design systems built for real dev handoff',
      ],
      visuals: [
        '/images/thumbnail-dailymotion-web-platform.webp',
        '/images/thumbnail-sqool-suite.webp',
        '/images/thumbnail-toolkit.webp',
      ],
      captions: [
        'Dailymotion Partner HQ',
        'SQOOL Suite ecosystem',
        'Toolkit.ac planning',
      ],
    },
    // 10. SHIP - Pillar 3
    {
      type: 'bigword',
      headline: 'Ship.',
      subline: 'Functional prototypes, fast iteration, deployment.',
    },
    // 11. Ship pillar with AI bento visuals
    {
      type: 'bento',
      headline: 'Ship',
      items: [
        '37+ apps designed and deployed with AI',
        'From prototype to production in days',
      ],
      button: {
        label: 'Try the apps',
        url: 'https://imaginative-youtiao-371d08.netlify.app',
      },
      visuals: [
        '/images/condamine apps/condamine apps 01.webp',
        '/images/condamine apps/condamine apps 03.webp',
        '/images/condamine apps/condamine apps 05.webp',
      ],
      captions: [
        'AI apps catalog',
        'Text-to-speech generator',
        'Visual content tools',
      ],
    },
    // 12. My approach
    {
      type: 'pillar',
      headline: 'My approach',
      items: [
        'From ambiguity to clarity — defining what your product should be',
        'Vision-driven design, grounded in prototyping and craft',
        'Collaborative teamwork, fast delivery',
      ],
      video: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4',
    },
    // 12. Testimonials
    {
      type: 'testimonials',
      headline: 'Testimonials',
      testimonials: [
        {
          quote: 'Victor didn\'t just create mockups. He transformed business requirements into perfectly adapted user journeys. Victor is a great guy: curious, positive, ready to challenge to go further.',
          author: 'Pierre-Marie Nigay',
          role: 'Founder of Toolkit',
          image: 'pierre-marie-nigay.webp',
          linkedin: 'https://www.linkedin.com/in/pnigay/',
        },
        {
          quote: 'Victor combines overflowing creativity with impressive rigor. He translates complex visions into clear, impactful user experiences. Always listening, curious, he constantly pushes thinking further.',
          author: 'Charlotte Rifflet',
          role: 'CPO @UNOWHY',
          image: 'charlotte-rifflet.webp',
          linkedin: 'https://www.linkedin.com/in/charlotterifflet/',
        },
        {
          quote: 'Always proposing ideas that shake things up... you never settled for just thinking: you produced, tested, wireframed, prototyped. Your UX expertise is undeniable.',
          author: 'Boris Aimé-Bauderlique',
          role: 'Deployment Manager @FranceVAE',
          image: 'boris-aime-bauderlique.webp',
          linkedin: 'https://www.linkedin.com/in/borisaimebauderlique',
        },
        {
          quote: 'Victor is a true source of inspiration. I was lucky to work with him on several projects... he brought a pragmatic and professional approach.',
          author: 'Achref Akkari',
          role: 'Product Manager @UNOWHY',
          image: 'achref-akkari.webp',
          linkedin: 'https://www.linkedin.com/in/achref-akkari',
        },
        {
          quote: 'As Product Lead in UI & Interaction Design, he played a central role in defining the product vision... I was struck by Victor\'s curiosity.',
          author: 'Justine Le Tellier',
          role: 'UX Researcher @UNOWHY',
          image: 'justine-le-tellier.webp',
          linkedin: 'https://www.linkedin.com/in/justine-le-tellier',
        },
        {
          quote: 'I worked alongside Victor for 5 beautiful years. His expertise, 360 vision, and design talent enabled the creation and success of many projects.',
          author: 'Hortense Jan',
          role: 'Marketing Director @UNOWHY',
          image: 'hortense-jan.webp',
          linkedin: 'https://www.linkedin.com/in/hortensejan',
        },
        {
          quote: 'Highly cultivated, curious, and creative, he always brings relevant ideas and original perspectives. Victor is particularly friendly.',
          author: 'Hubert Bloch',
          role: 'Deputy CEO @UNOWHY',
          image: 'hubert-bloch.webp',
          linkedin: 'https://fr.linkedin.com/in/hubertbloch',
        },
        {
          quote: 'Passionate and reliable... Lover of details... his feedback allowed me to reach a new level. He has the will to listen to his team.',
          author: 'Mbagna Johan Gaby',
          role: 'Product Designer',
          image: 'johan-mbagna-gaby.webp',
          linkedin: 'https://fr.linkedin.com/in/mbagnajohan',
        },
        {
          quote: 'Beyond being a manager concerned with his team\'s well-being, he is passionate about details. Patient and pedagogical... A mentor I appreciated working with.',
          author: 'Şafak Aktaş',
          role: 'Graphic Designer at Reflet Digital',
          image: 'safak-aktas.webp',
          linkedin: 'https://www.linkedin.com/in/safak-aktas/',
        },
        {
          quote: 'Professional and rigorous, Victor knows how to translate business stakes into relevant implementations... Victor is very attentive to his collaborators.',
          author: 'Frederic Rodriguez',
          role: 'Head of Poker - FDJ',
          image: 'frederic-rodriguez.webp',
          linkedin: 'https://www.linkedin.com/in/frederic-rodriguez-71061255/',
        },
        {
          quote: 'Accessible, attentive, and responsible... working with Victor is a pleasure as he adheres to collective intelligence principles.',
          author: 'Rémi Serougne',
          role: 'Web Developer',
          image: 'remi-serougne.webp',
          linkedin: 'https://www.linkedin.com/in/remi-serougne-7314b940/',
        },
        {
          quote: 'He is a very capable designer who can do the legwork but also take a step back... He\'s worked on mobile and web, and has a keen eye for interaction design. Highly recommended.',
          author: 'Simon White',
          role: 'Senior UX',
          image: 'simon-white.webp',
          linkedin: 'https://www.linkedin.com/in/fruey/',
        },
        {
          quote: 'He knows how to unite people around a project, allowing for total autonomy to see it through.',
          author: 'Nicolas Moulin',
          role: 'Entrepreneur / Advisor',
          image: 'nicolas-moulin.webp',
          linkedin: 'https://www.linkedin.com/in/moulinnicolas',
        },
        {
          quote: 'His previous experiences as Art Director and Designer bring a critical sense and a new approach... Victor helped us a lot on the embedded PagesJaunes application.',
          author: 'François Khoury',
          role: 'Senior Presales',
          image: 'francois-khoury.webp',
          linkedin: 'https://www.linkedin.com/in/francoisk',
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
      visual: '/images/victor-soussan.webp',
    },
  ],
  fr: [
    // 1. Title with portrait
    {
      type: 'title',
      headline: 'Victor Soussan',
      subline: 'Senior Product Designer — Conceptualisation & Prototypage Rapide',
      visual: '/images/victor-soussan.webp',
    },
    // 2. Big statement - Cadrer. Concevoir. Livrer.
    {
      type: 'bigword',
      headline: 'Cadrer. Concevoir. Livrer.',
      subline: 'De la vision au prototype fonctionnel.',
    },
    // 3. Experience
    {
      type: 'metric',
      headline: '15 ans',
      subline: 'Dans la tech. 10 en product design. Spécialisé en conceptualisation rapide et prototypage assisté par IA.',
      visual: '/images/sqool/hero_ecosystem_sqool.webp',
      caption: 'SQOOL Suite : 6 apps modulaires conçues de 0, design system et rituels d\'équipe (2019–2024)',
    },
    // 4. Scale
    {
      type: 'metric',
      headline: '22M+',
      subline: 'Téléchargements des apps mobiles PagesJaunes en 2016. Expérience smartphone & tablette primée.',
      visual: '/images/thumbnail_pagesjaunes_sp_tablette.webp',
      caption: 'Homepage conversationnelle, onboarding iOS/Android et refonte navigation carte (2014–2016)',
    },
    // 5. Career Timeline - Uses CareerCarousel component with careerData
    {
      type: 'timeline',
      headline: 'Parcours',
    },
    // 6. CADRER - Pillar 1
    {
      type: 'bigword',
      headline: 'Cadrer.',
      subline: 'Stratégie produit, recherche utilisateur, structuration d\'équipe.',
    },
    // 7. Cadrer pillar with photos
    {
      type: 'bento',
      headline: 'Cadrer',
      items: [
        'Cadrage produit & alignement de vision',
        'Recherche utilisateur & entretiens',
        'Structuration d\'équipe & ateliers',
      ],
      visuals: [
        '/images/photos victor/alexis victor hiba ateliers fiction 02.webp',
        '/images/photos victor/photo victor demo.webp',
        '/images/photos victor/photo atelier aap.webp',
      ],
      captions: [
        'Atelier stratégie chez UNOWHY',
        'Présentation démo produit',
        'Atelier design thinking',
      ],
    },
    // 8. CONCEVOIR - Pillar 2
    {
      type: 'bigword',
      headline: 'Concevoir.',
      subline: 'Interactions, parcours, interfaces, animations.',
    },
    // 9. Concevoir pillar with bento visuals
    {
      type: 'bento',
      headline: 'Concevoir',
      items: [
        'Design produit end-to-end : flows, UI, micro-interactions',
        'Design systems pensés pour le handoff dev',
      ],
      visuals: [
        '/images/thumbnail-dailymotion-web-platform.webp',
        '/images/thumbnail-sqool-suite.webp',
        '/images/thumbnail-toolkit.webp',
      ],
      captions: [
        'Dailymotion Partner HQ',
        'Écosystème SQOOL Suite',
        'Toolkit.ac planning',
      ],
    },
    // 10. LIVRER - Pillar 3
    {
      type: 'bigword',
      headline: 'Livrer.',
      subline: 'Prototypes fonctionnels, itération rapide, déploiement.',
    },
    // 11. Livrer pillar with AI bento visuals
    {
      type: 'bento',
      headline: 'Livrer',
      items: [
        '37+ apps conçues et déployées avec l\'IA',
        'Du prototype à la production en quelques jours',
      ],
      button: {
        label: 'Tester les apps',
        url: 'https://imaginative-youtiao-371d08.netlify.app',
      },
      visuals: [
        '/images/condamine apps/condamine apps 01.webp',
        '/images/condamine apps/condamine apps 03.webp',
        '/images/condamine apps/condamine apps 05.webp',
      ],
      captions: [
        'Catalogue apps IA',
        'Générateur text-to-speech',
        'Outils de contenu visuel',
      ],
    },
    // 12. Mon approche
    {
      type: 'pillar',
      headline: 'Mon approche',
      items: [
        'De l\'ambiguïté à la clarté — définir ce que doit être votre produit',
        'Design guidé par la vision, ancré dans le prototypage et le craft',
        'Travail collaboratif, livraison rapide',
      ],
      video: '/videos/connect/Video-demo-bulle-interactions-compressed.mp4',
    },
    // 12. Testimonials
    {
      type: 'testimonials',
      headline: 'Témoignages',
      testimonials: [
        {
          quote: 'Victor ne s\'est pas contenté de faire des maquettes. Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés. Victor est un super gars : curieux, positif, prêt à challenger pour aller toujours plus loin.',
          author: 'Pierre-Marie Nigay',
          role: 'Fondateur de Toolkit',
          image: 'pierre-marie-nigay.webp',
          linkedin: 'https://www.linkedin.com/in/pnigay/',
        },
        {
          quote: 'Victor allie une créativité débordante à une rigueur de travail impressionnante. Il sait traduire des visions complexes en expériences utilisateur claires et percutantes. Toujours à l\'écoute, curieux, il pousse constamment les réflexions plus loin.',
          author: 'Charlotte Rifflet',
          role: 'CPO @UNOWHY',
          image: 'charlotte-rifflet.webp',
          linkedin: 'https://www.linkedin.com/in/charlotterifflet/',
        },
        {
          quote: 'Toujours en train de proposer des idées qui bousculent... tu ne t\'es jamais contenté de rester dans la réflexion : tu as produit, testé, maquetté, prototypé. Ton expertise UX est indéniable.',
          author: 'Boris Aimé-Bauderlique',
          role: 'Chargé de déploiement @FranceVAE',
          image: 'boris-aime-bauderlique.webp',
          linkedin: 'https://www.linkedin.com/in/borisaimebauderlique',
        },
        {
          quote: 'Victor est une véritable source d\'inspiration. J\'ai eu la chance de travailler avec lui sur plusieurs projets... il a su apporter une approche pragmatique et professionnelle.',
          author: 'Achref Akkari',
          role: 'Product Manager @UNOWHY',
          image: 'achref-akkari.webp',
          linkedin: 'https://www.linkedin.com/in/achref-akkari',
        },
        {
          quote: 'En tant que Product Lead en UI & Interaction Design, il a joué un rôle central dans la définition de la vision produit... J\'ai été très marquée par la curiosité de Victor.',
          author: 'Justine Le Tellier',
          role: 'UX Researcher @UNOWHY',
          image: 'justine-le-tellier.webp',
          linkedin: 'https://www.linkedin.com/in/justine-le-tellier',
        },
        {
          quote: 'J\'ai travaillé aux côtés de Victor pendant 5 belles années. Son expertise, sa vision 360 et son talent de designer ont permis la création et la réussite de nombreux projets.',
          author: 'Hortense Jan',
          role: 'Directrice Marketing @UNOWHY',
          image: 'hortense-jan.webp',
          linkedin: 'https://www.linkedin.com/in/hortensejan',
        },
        {
          quote: 'Très cultivé, curieux et créatif, il apporte toujours des idées pertinentes et des perspectives originales. Victor est quelqu\'un de particulièrement sympathique.',
          author: 'Hubert Bloch',
          role: 'Directeur Général Adjoint @UNOWHY',
          image: 'hubert-bloch.webp',
          linkedin: 'https://fr.linkedin.com/in/hubertbloch',
        },
        {
          quote: 'Passionné et fiable... Amoureux des détails... ses retours m\'ont permis d\'atteindre un nouveau palier. Il a la volonté d\'être à l\'écoute de son équipe.',
          author: 'Mbagna Johan Gaby',
          role: 'Product Designer',
          image: 'johan-mbagna-gaby.webp',
          linkedin: 'https://fr.linkedin.com/in/mbagnajohan',
        },
        {
          quote: 'En plus d\'être un manager soucieux du bien-être de son équipe, c\'est un passionné qui a le souci du détail. Patient et pédagogue... Un mentor avec lequel j\'ai apprécié travailler.',
          author: 'Şafak Aktaş',
          role: 'Graphiste chez Reflet Digital',
          image: 'safak-aktas.webp',
          linkedin: 'https://www.linkedin.com/in/safak-aktas/',
        },
        {
          quote: 'Professionnel et rigoureux, Victor sait traduire les enjeux business dans des réalisations pertinentes... Victor est très à l\'écoute de ses collaborateurs.',
          author: 'Frederic Rodriguez',
          role: 'Head of Poker - FDJ',
          image: 'frederic-rodriguez.webp',
          linkedin: 'https://www.linkedin.com/in/frederic-rodriguez-71061255/',
        },
        {
          quote: 'Accessible, à l\'écoute et responsable... travailler avec Victor est un plaisir car il adhère aux principes de l\'intelligence collective.',
          author: 'Rémi Serougne',
          role: 'Développeur Web',
          image: 'remi-serougne.webp',
          linkedin: 'https://www.linkedin.com/in/remi-serougne-7314b940/',
        },
        {
          quote: 'He is a very capable designer who can do the legwork but also take a step back... He\'s worked on mobile and web, and has a keen eye for interaction design. Highly recommended.',
          author: 'Simon White',
          role: 'Senior UX',
          image: 'simon-white.webp',
          linkedin: 'https://www.linkedin.com/in/fruey/',
        },
        {
          quote: 'Il sait fédérer les gens autour d\'un projet et qu\'on peut par conséquent lui laisser une autonomie totale pour le mener à bien.',
          author: 'Nicolas Moulin',
          role: 'Entrepreneur / Advisor',
          image: 'nicolas-moulin.webp',
          linkedin: 'https://www.linkedin.com/in/moulinnicolas',
        },
        {
          quote: 'Ses expériences précédentes de DA et Designer apportent un sens critique et une nouvelle approche... Victor nous a beaucoup aidé sur l\'application embarquée PagesJaunes.',
          author: 'François Khoury',
          role: 'Senior Presales',
          image: 'francois-khoury.webp',
          linkedin: 'https://www.linkedin.com/in/francoisk',
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
      visual: '/images/victor-soussan.webp',
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
  systemTheme?: 'light' | 'dark';
}

// Helper to get portrait image based on theme
const getPortraitImage = (isDark: boolean) => {
  return isDark ? '/images/victor_soussan_dark.webp' : '/images/victor-soussan.webp';
};

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
    onClick={(e) => {
      e.stopPropagation(); // Prevent navigation when clicking image
      onClick?.();
    }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <img loading="lazy"
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

export default function ExecutivePage({ language = 'fr', onClose, onBookCall, onContact, onOpenResume, showFarewell, systemTheme = 'light' }: ExecutivePageProps) {
  const [lang, setLang] = useState<'en' | 'fr'>(language);
  const isDark = systemTheme === 'dark';
  const portraitImage = getPortraitImage(isDark);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [videoLightboxSrc, setVideoLightboxSrc] = useState<string | null>(null);
  const [videoStartTime, setVideoStartTime] = useState<number>(0);
  const pillarVideoRef = useRef<HTMLVideoElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const [testimonialsPage, setTestimonialsPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isInitialMount, setIsInitialMount] = useState(true); // Track initial mount for zoom animation
  const slides = SLIDES[lang];

  // Motion values for swipe navigation on main slides
  const slideDragX = useMotionValue(0);

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

  // Collect all images with captions from all slides for lightbox navigation
  const allImagesWithCaptions = visibleSlides.flatMap(s => {
    const items: { src: string; caption?: string }[] = [];
    if (s.visual && s.type !== 'title' && s.type !== 'farewell') {
      items.push({ src: s.visual, caption: s.headline || undefined });
    }
    if (s.visuals) {
      const visuals = s.visuals as string[];
      const captions = (s.captions as string[] | undefined) || [];
      visuals.forEach((src, idx) => {
        items.push({ src, caption: captions[idx] || undefined });
      });
    }
    return items;
  });
  const allImages = allImagesWithCaptions.map(item => item.src);

  // Jump to farewell slide when showFarewell becomes true
  useEffect(() => {
    if (showFarewell) {
      const farewellIndex = slides.findIndex(s => s.type === 'farewell');
      if (farewellIndex >= 0) {
        setCurrentSlide(farewellIndex);
      }
    }
  }, [showFarewell, slides]);

  // Reset testimonials carousel when changing slides or language
  useEffect(() => {
    setTestimonialsPage(0);
  }, [currentSlide, lang]);

  const slide = visibleSlides[currentSlide];

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setSlideDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setSlideDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Handle swipe/tap navigation on main slides (story-like)
  const handleSlideDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Don't navigate if lightbox is open
    if (lightboxOpen || videoLightboxOpen) {
      slideDragX.set(0);
      return;
    }

    const swipeThreshold = 50;
    const swipeVelocity = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      goNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      goPrev();
    }
    slideDragX.set(0);
  };

  // Handle tap navigation (tap left/right sides of screen)
  const handleTapNavigation = (e: React.MouseEvent | React.TouchEvent) => {
    // Don't navigate if lightbox is open
    if (lightboxOpen || videoLightboxOpen) {
      return;
    }

    // Don't navigate if clicking on interactive elements or career timeline
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('video') || target.closest('input') || target.closest('.career-card') || target.closest('.career-timeline')) {
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
    const x = clientX - rect.left;
    const width = rect.width;

    // Tap left third = prev, tap right third = next
    if (x < width * 0.3) {
      goPrev();
    } else if (x > width * 0.7) {
      goNext();
    }
  };

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

  // Open video lightbox with optional start time
  const openVideoLightbox = (videoSrc: string, startTime: number = 0) => {
    setVideoLightboxSrc(videoSrc);
    setVideoStartTime(startTime);
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
      // If video lightbox is open, handle Escape - prevent closing presentation
      if (videoLightboxOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          closeVideoLightbox();
        }
        return;
      }
      // If image lightbox is open, handle its navigation - prevent closing presentation
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          closeLightbox();
        }
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

    // Use capture phase to intercept ESC before other listeners
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [goNext, goPrev, onClose, lightboxOpen, videoLightboxOpen, paginateLightbox, closeLightbox, closeVideoLightbox]);

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
            {slide.visual && (
              <img loading="lazy"
                src={portraitImage}
                alt=""
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-6 sm:mb-8 border-4 border-gray-100"
              />
            )}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-[-0.02em]">
              {slide.headline}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-500 font-light">
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
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-4 sm:gap-8 lg:gap-16 px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-0">
            <div className="flex-shrink-0 lg:w-[35%] text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2 sm:mb-4 tracking-tight">
                {slide.headline}
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-500 font-light">
                {slide.subline}
              </p>
            </div>
            {slide.visual && (
              <ClickableImage
                src={slide.visual}
                className="flex-1 w-full lg:w-[60%] max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] rounded-xl sm:rounded-2xl border border-gray-200"
                onClick={() => openLightbox(slide.visual!)}
              />
            )}
          </div>
        );

      case 'pillar':
        const pillarItems = slide.items as string[];
        const pillarVideo = slide.video as string | undefined;
        return (
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-4 sm:gap-8 lg:gap-16 px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-0">
            <div className="flex-shrink-0 lg:w-[35%] text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-6 tracking-tight">
                {slide.headline}
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-left">
                {pillarItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg text-gray-700">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-900 flex-shrink-0 mt-1.5 sm:mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {pillarVideo ? (
              <motion.div
                className="group relative flex-1 w-full lg:w-[60%] max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking video
                  const currentTime = pillarVideoRef.current?.currentTime || 0;
                  openVideoLightbox(pillarVideo, currentTime);
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  ref={pillarVideoRef}
                  src={pillarVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                {/* Hover overlay with expand icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ) : slide.visual && (
              <ClickableImage
                src={slide.visual}
                className="flex-1 w-full lg:w-[60%] max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh] rounded-xl sm:rounded-2xl border border-gray-200"
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
          <div className="flex flex-col items-center justify-center h-full px-4 sm:px-8 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-12 tracking-tight text-center">
              {slide.headline}
            </h2>
            <ul className="space-y-3 sm:space-y-4 text-center">
              {infoItems?.map((item, idx) => (
                <li key={idx} className="text-base sm:text-xl md:text-2xl text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'testimonials':
        const testimonialsList = slide.testimonials as { quote: string; author: string; role: string; image?: string; linkedin?: string }[];
        // Show 1 testimonial per page on mobile, 3 on larger screens
        const isMobileView = typeof window !== 'undefined' && window.innerWidth < 640;
        const testimonialsPerPage = isMobileView ? 1 : 3;
        const totalTestimonialsPages = Math.ceil(testimonialsList.length / testimonialsPerPage);
        const currentTestimonials = testimonialsList.slice(
          testimonialsPage * testimonialsPerPage,
          (testimonialsPage + 1) * testimonialsPerPage
        );
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-0">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-8 tracking-tight text-center">
              {slide.headline}
            </h2>

            {/* Carousel container */}
            <div className="relative w-full max-w-6xl">
              {/* Navigation arrows */}
              {testimonialsPage > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setTestimonialsPage(p => p - 1); }}
                  className="absolute -left-2 sm:-left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
              )}
              {testimonialsPage < totalTestimonialsPages - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setTestimonialsPage(p => p + 1); }}
                  className="absolute -right-2 sm:-right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={16} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
              )}

              {/* Testimonials grid with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialsPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 items-stretch"
                >
                  {currentTestimonials?.map((testimonial, idx) => (
                    <motion.div
                      key={`${testimonialsPage}-${idx}`}
                      initial={testimonialsPage === 0 ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      transition={testimonialsPage === 0 ? { duration: 0.4, delay: idx * 0.1 } : { duration: 0 }}
                      onClick={() => testimonial.linkedin && window.open(testimonial.linkedin, '_blank')}
                      className={`flex flex-col p-5 sm:p-6 pb-6 sm:pb-8 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-[240px] sm:h-[320px] overflow-hidden ${
                        testimonial.linkedin ? 'cursor-pointer' : ''
                      }`}
                    >
                      {/* Author info with avatar */}
                      <div className="flex items-center mb-4 sm:mb-5">
                        {testimonial.image ? (
                          <img loading="lazy"
                            src={`/images/${testimonial.image}`}
                            alt={testimonial.author}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-white shadow-sm object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs sm:text-sm">
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div>
                          {testimonial.linkedin ? (
                            <a
                              href={testimonial.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold text-gray-900 hover:text-[#0077b5] transition-colors flex items-center group text-sm sm:text-base"
                            >
                              {testimonial.author}
                              <Linkedin size={12} className="sm:w-4 sm:h-4 ml-1.5 text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                            </a>
                          ) : (
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.author}</div>
                          )}
                          <div className="text-[10px] sm:text-xs font-medium text-blue-600 bg-blue-50 px-2 sm:px-2.5 py-0.5 rounded-full w-fit mt-1">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative flex-1">
                        <div className="text-2xl sm:text-3xl text-gray-200 absolute -top-1 -left-1">"</div>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-4 pt-2">
                          {testimonial.quote}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {Array.from({ length: totalTestimonialsPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setTestimonialsPage(idx); }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    idx === testimonialsPage
                      ? 'bg-gray-800 w-4 sm:w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-[10px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2">
              {testimonialsPage + 1} / {totalTestimonialsPages}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-12 lg:px-20">
            {/* Zone 1: Title + Primary buttons */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                {slide.headline}
              </h2>

              {/* Primary action buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                {onBookCall && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onBookCall(); }}
                    className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full text-sm sm:text-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    <Video size={18} className="sm:w-5 sm:h-5" />
                    {lang === 'fr' ? 'En visio' : 'Video call'}
                  </button>
                )}
                {onContact && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onContact(); }}
                    className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-full text-sm sm:text-lg font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                    {lang === 'fr' ? 'Par écrit' : 'By email'}
                  </button>
                )}
              </div>
            </div>

            {/* Zone 2: Contact info card */}
            <div className="mb-4 sm:mb-8 w-full max-w-md">
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <a
                    href={`mailto:${slide.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-gray-900 transition-colors min-w-0"
                  >
                    <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{slide.email}</span>
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); copyToClipboard(slide.email || '', 'email'); }}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                    title={lang === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedField === 'email' ? (
                      <Check size={14} className="sm:w-4 sm:h-4 text-green-600" />
                    ) : (
                      <Copy size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <a
                    href={`https://${slide.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-gray-900 transition-colors min-w-0"
                  >
                    <Linkedin size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{slide.linkedin}</span>
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); copyToClipboard(`https://${slide.linkedin}`, 'linkedin'); }}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                    title={lang === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedField === 'linkedin' ? (
                      <Check size={14} className="sm:w-4 sm:h-4 text-green-600" />
                    ) : (
                      <Copy size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <a
                    href={`tel:${slide.phone?.replace(/\s/g, '')}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-gray-900 transition-colors min-w-0"
                  >
                    <Phone size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{slide.phone}</span>
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); copyToClipboard(slide.phone || '', 'phone'); }}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                    title={lang === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedField === 'phone' ? (
                      <Check size={14} className="sm:w-4 sm:h-4 text-green-600" />
                    ) : (
                      <Copy size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Download CV */}
                {onOpenResume && (
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenResume(lang); }}
                      className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-gray-900 transition-colors w-full"
                    >
                      <Download size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400" />
                      <span className="text-xs sm:text-sm">{lang === 'fr' ? 'Télécharger mon CV' : 'Download my resume'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Zone 3: Download deck + Continue to site */}
            <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); generateExecutivePDF(lang, setIsGeneratingPDF); }}
                disabled={isGeneratingPDF}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm border rounded-full transition-colors ${
                  isGeneratingPDF
                    ? 'text-gray-300 border-gray-200 cursor-wait'
                    : 'text-gray-400 hover:text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {isGeneratingPDF ? (
                  <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Download size={12} className="sm:w-[14px] sm:h-[14px]" />
                )}
                {isGeneratingPDF
                  ? (lang === 'fr' ? 'Génération...' : 'Generating...')
                  : (lang === 'fr' ? 'Télécharger ce deck' : 'Download this deck')
                }
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-400 hover:text-gray-600 border border-gray-200 hover:border-gray-300 rounded-full transition-colors"
              >
                {lang === 'fr' ? 'Continuer sur le site' : 'Continue to website'}
                <ChevronRight size={12} className="sm:w-[14px] sm:h-[14px]" />
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
          <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
            <h2 className="text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-gray-900 tracking-tighter leading-none">
              {slide.headline}
            </h2>
            {slide.subline && (
              <p className="text-lg sm:text-2xl md:text-4xl text-gray-400 font-light mt-2 sm:mt-4 tracking-wide">
                {slide.subline}
              </p>
            )}
          </div>
        );

      case 'timeline':
        return (
          <div className="h-full w-full py-4 sm:py-6">
            <CareerCarousel lang={lang} headline={slide.headline} />
          </div>
        );

      case 'bento':
        const bentoVisuals = slide.visuals as string[];
        const bentoItems = slide.items as string[];
        const bentoCaptions = slide.captions as string[] | undefined;
        const bentoButton = slide.button as { label: string; url: string } | undefined;
        // Check if this is the AI Product Builder slide (condamine apps have white backgrounds)
        const isCondamineApps = bentoVisuals?.[0]?.includes('condamine apps');
        return (
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-4 sm:gap-8 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-0">
            {/* Left: Title + items */}
            <div className="flex-shrink-0 lg:w-[30%] text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-6 tracking-tight">
                {slide.headline}
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-left">
                {bentoItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-base md:text-lg text-gray-600">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 mt-1 sm:mt-2 flex-shrink-0" />
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
                  className="inline-flex items-center gap-2 mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-gray-700
                    bg-white/60 backdrop-blur-xl border border-white/40
                    shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)]
                    hover:bg-white/80 hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)]
                    transition-all duration-300"
                >
                  {bentoButton.label}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            {/* Right: 1 large + 2 small bento layout with captions below */}
            <div className="flex-1 w-full lg:w-[65%] bg-gray-50/50 rounded-2xl p-3 sm:p-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Large image on top with caption below */}
                {bentoVisuals?.[0] && (
                  <figure className="flex-shrink-0">
                    <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
                      <ClickableImage
                        src={bentoVisuals[0]}
                        className="w-full h-auto max-h-[35vh] sm:max-h-[42vh] object-cover"
                        onClick={() => openLightbox(bentoVisuals[0])}
                        hasWhiteBg={isCondamineApps}
                      />
                    </div>
                    {bentoCaptions?.[0] && (
                      <figcaption className="mt-2 text-xs sm:text-sm text-gray-400 px-1">
                        {bentoCaptions[0]}
                      </figcaption>
                    )}
                  </figure>
                )}
                {/* 2 smaller images below with captions - equal height with 16:9 ratio */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {bentoVisuals?.slice(1, 3).map((src, idx) => (
                    <figure key={idx}>
                      <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow aspect-video bg-white">
                        <ClickableImage
                          src={src}
                          className="w-full h-full object-contain"
                          onClick={() => openLightbox(src)}
                          hasWhiteBg={isCondamineApps}
                        />
                      </div>
                      {bentoCaptions?.[idx + 1] && (
                        <figcaption className="mt-1.5 text-[10px] sm:text-xs text-gray-400 px-1">
                          {bentoCaptions[idx + 1]}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'farewell':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
            {slide.visual && (
              <img loading="lazy"
                src={portraitImage}
                alt=""
                className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover mb-6 sm:mb-10 border-4 border-gray-100 shadow-xl"
              />
            )}
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-8 sm:mb-12">
              {slide.headline}
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full text-sm sm:text-lg font-medium hover:bg-gray-800 transition-colors shadow-lg"
            >
              {lang === 'fr' ? 'Continuer sur le site' : 'Continue to website'}
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
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
      {/* Header - Glass effect */}
      <header className="absolute top-0 left-0 right-0 z-50 pl-6 pr-2.5 h-16 flex items-center justify-between bg-white/80 backdrop-blur-xl">
        {/* Left: Title - Same style as Homepage nav */}
        <span className="font-semibold text-lg tracking-[-0.02em] text-gray-900 hidden sm:block">
          {lang === 'fr' ? 'Présentation 1-min' : '1-min Presentation'}
        </span>
        {/* Mobile: Just show slide counter on left */}
        <span className="text-xs text-gray-400 font-mono sm:hidden">
          {currentSlide + 1}/{totalSlides}
        </span>

        {/* Center: Slide counter (desktop) + Language toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm text-gray-400 font-mono hidden sm:block">
            {currentSlide + 1} / {totalSlides}
          </span>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 sm:p-1">
            <button
              onClick={() => setLang('en')}
              className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full transition-all ${
                lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full transition-all ${
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
          className="relative p-3 rounded-full hover:bg-gray-100 transition-colors before:absolute before:inset-[-12px] before:content-['']"
          aria-label="Close"
        >
          <X size={24} className="text-gray-500" />
        </button>
      </header>

      {/* Main content - swipe/tap enabled for story-like navigation */}
      <main
        className="h-full pt-14 sm:pt-16 pb-16 sm:pb-20 overflow-y-auto overflow-x-hidden"
        onClick={handleTapNavigation}
      >
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentSlide}
            custom={slideDirection}
            initial={isInitialMount
              ? { opacity: 0, scale: 0.9 } // Zoom from center on initial open
              : { opacity: 0, x: slideDirection >= 0 ? 100 : -100 } // Slide transition for navigation
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: slideDirection >= 0 ? -100 : 100 }}
            transition={isInitialMount
              ? { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } // Smooth ease for zoom
              : { duration: 0.3, ease: 'easeInOut' } // Quick ease for slide
            }
            onAnimationComplete={() => {
              if (isInitialMount) setIsInitialMount(false);
            }}
            className="h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleSlideDragEnd}
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between bg-white/95 backdrop-blur-sm border-t border-gray-100 sm:border-0 sm:bg-transparent">
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className={`p-2 sm:p-3 rounded-full transition-colors ${
            currentSlide === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
        </button>

        {/* Progress dots - simplified on mobile */}
        <div className="flex items-center gap-1 sm:gap-2 max-w-[60%] sm:max-w-none overflow-hidden">
          {visibleSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all flex-shrink-0 ${
                idx === currentSlide
                  ? 'bg-gray-900 w-4 sm:w-6'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 sm:w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={currentSlide === totalSlides - 1}
          className={`p-2 sm:p-3 rounded-full transition-colors ${
            currentSlide === totalSlides - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="sm:w-7 sm:h-7" />
        </button>
      </footer>

      {/* Keyboard/swipe hint - different text for mobile */}
      <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
        <span className="hidden sm:inline">{lang === 'fr' ? 'Flèches ← → pour naviguer' : '← → arrows to navigate'}</span>
        <span className="sm:hidden">{lang === 'fr' ? 'Swipez ou tapez pour naviguer' : 'Swipe or tap to navigate'}</span>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-2.5 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors before:absolute before:inset-[-12px] before:content-['']"
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
              <AnimatePresence initial={true} custom={direction} mode="popLayout">
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
                        alt={allImagesWithCaptions[lightboxIndex]?.caption || ''}
                        className="w-[95vw] md:w-[90vw] h-auto rounded-lg border border-gray-200 cursor-zoom-out"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                        draggable={false}
                      />
                      {allImagesWithCaptions[lightboxIndex]?.caption && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="mt-6 text-gray-500 text-sm max-w-2xl text-center"
                        >
                          {allImagesWithCaptions[lightboxIndex].caption}
                        </motion.p>
                      )}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 mb-8 text-gray-400 text-xs"
                      >
                        {lang === 'fr' ? 'Cliquez pour quitter le zoom' : 'Click to exit zoom'}
                      </motion.p>
                    </div>
                  ) : (
                    /* Normal mode - Centered with constraints */
                    <motion.div
                      style={{ x: parallaxX }}
                      className="relative flex flex-col items-center max-w-[90vw] md:max-w-[80vw]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxZoomed(true);
                      }}
                    >
                      <motion.img
                        src={allImages[lightboxIndex]}
                        alt={allImagesWithCaptions[lightboxIndex]?.caption || ''}
                        className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain cursor-zoom-in rounded-lg border border-gray-200"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={springTransition}
                        draggable={false}
                      />
                      {allImagesWithCaptions[lightboxIndex]?.caption && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.3 }}
                          className="mt-4 text-gray-500 text-sm max-w-2xl text-center px-4"
                        >
                          {allImagesWithCaptions[lightboxIndex].caption}
                        </motion.p>
                      )}
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
            className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
            onClick={closeVideoLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              onClick={closeVideoLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-2.5 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors before:absolute before:inset-[-12px] before:content-['']"
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
                className="max-w-full max-h-full rounded-2xl border border-gray-200"
                autoPlay
                loop
                muted
                playsInline
                controls
                onLoadedMetadata={(e) => {
                  const video = e.target as HTMLVideoElement;
                  if (videoStartTime > 0) {
                    video.currentTime = videoStartTime;
                  }
                }}
              />
            </motion.div>

            {/* Hint to close */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
              {lang === 'fr' ? 'Cliquez en dehors pour fermer' : 'Click outside to close'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
