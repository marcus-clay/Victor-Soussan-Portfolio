import React from 'react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
           {/* Preview: Top 3 curated testimonials - Same style as modal */}
           {[testimonials[0], testimonials[1], testimonials[2]].map((t, i) => (
              <motion.a
                key={i}
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`p-8 rounded-3xl border shadow-sm hover:shadow-md transition-[box-shadow,border-color] duration-200 ease-out h-fit flex flex-col cursor-pointer group/card ${
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
