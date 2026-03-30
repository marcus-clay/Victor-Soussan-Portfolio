import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedinLogo as Linkedin, ArrowUpRight, Quotes as Quote } from '@phosphor-icons/react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  image: string;
  linkedin?: string;
  category: 'All' | 'Management' | 'Design' | 'Product & Tech' | 'Clients';
}

interface TestimonialsSectionProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  content: {
    testimonials: {
      title: string;
      subtitle: string;
      view_all: string;
    };
  };
  testimonials: Testimonial[];
  Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }>;
  openModalWithUrl: (path: string) => void;
}

const PREVIEW_LENGTH = 160;

function TestimonialCards({
  testimonials,
  systemTheme,
  Avatar,
}: {
  testimonials: Testimonial[];
  systemTheme: 'light' | 'dark';
  Avatar: TestimonialsSectionProps['Avatar'];
}) {
  const isDark = systemTheme === 'dark';
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const top3 = [testimonials[0], testimonials[1], testimonials[2]];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {top3.map((t, i) => {
        const needsTruncation = t.content.length > PREVIEW_LENGTH;
        const isExpanded = expandedId === t.id;
        const displayText = isExpanded || !needsTruncation
          ? t.content
          : t.content.substring(0, PREVIEW_LENGTH) + '\u2026';

        return (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => needsTruncation && setExpandedId(isExpanded ? null : t.id)}
            className={`p-7 rounded-2xl border shadow-sm h-fit flex flex-col ${
              needsTruncation ? 'cursor-pointer' : ''
            } ${
              isDark
                ? 'bg-[#1D1D1F] border-white/10 hover:border-white/15'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            style={{ transition: 'border-color 200ms ease-out, box-shadow 300ms ease-out' }}
          >
            {/* Author */}
            <div className="flex items-center mb-5">
              <Avatar
                filename={t.image}
                alt={t.author}
                className={`w-12 h-12 rounded-full mr-3.5 border-2 shadow-sm ${
                  isDark ? 'border-white/20' : 'border-white'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-[15px] leading-tight truncate ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.author}
                  </span>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 text-gray-400 hover:text-[#0077b5] active:scale-[0.9]"
                      style={{ transition: 'color 150ms ease-out, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                </div>
                <span className={`text-xs mt-0.5 block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {t.role}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="relative flex-1 mb-4">
              <Quote
                size={20}
                className={`absolute -top-2 -left-1 transform -scale-x-100 ${
                  isDark ? 'text-white/8' : 'text-gray-100'
                }`}
              />
              <p className={`leading-relaxed text-[14.5px] relative z-10 pt-1 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                &ldquo;{displayText}&rdquo;
              </p>
              {needsTruncation && (
                <span className={`inline-block mt-2 text-xs font-medium ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {isExpanded ? 'Show less' : 'Read more'}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className={`border-t pt-3.5 mt-auto flex justify-between items-center ${
              isDark ? 'border-white/8' : 'border-gray-100'
            }`}>
              <span className={`text-[11px] font-medium ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {t.date}
              </span>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                isDark ? 'text-gray-500 bg-white/5' : 'text-gray-400 bg-gray-50'
              }`}>
                {t.category}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  systemTheme,
  content,
  testimonials,
  Avatar,
  openModalWithUrl,
}) => {
  return (
    <section id="testimonials" className={`py-16 md:py-32 px-10 ${
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

        <TestimonialCards testimonials={testimonials} systemTheme={systemTheme} Avatar={Avatar} />

        <div className="mt-12 text-center">
           <button
             onClick={() => openModalWithUrl('/testimonials')}
             className="group px-8 py-3 rounded-full font-medium transition-[background-color,box-shadow,transform] duration-200 ease-out inline-flex items-center shadow-sm hover:shadow-md bg-[#2D5CF3] text-white hover:bg-[#2450d9] active:scale-[0.97]"
           >
             {content.testimonials.view_all} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
