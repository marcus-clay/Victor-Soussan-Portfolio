import React from 'react';
import {
  CheckCircle as CheckCircle2,
  ArrowUpRight,
  LinkedinLogo as Linkedin,
  FileText,
  BookOpen,
} from '@phosphor-icons/react';

interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
}

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'blue' | 'gray' | 'indigo' | 'purple' | 'green' | 'orange';
}

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

interface BiographySectionProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  content: {
    bio: {
      title: string;
      subtitle: string;
      role: string;
      exp: string;
      loc: string;
      p1: string;
      p2: string;
      value_prop: string;
      bullets: string[];
      view_full_bio: string;
      toolkit_title: string;
      toolkit_desc: string;
    };
  };
  resources: Resource[];
  Avatar: React.FC<{ filename: string; alt: string; className?: string; isDark?: boolean }>;
  openModalWithUrl: (path: string) => void;
}

const BiographySection: React.FC<BiographySectionProps> = ({
  systemTheme,
  content,
  resources,
  Avatar,
  openModalWithUrl,
}) => {
  return (
    <section id="bio" className={`py-16 md:py-32 px-10 relative ${
      systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6">{content.bio.title}</h2>
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{content.bio.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-12 gap-10">

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
                      filename="victor-soussan.webp"
                      alt="Victor Soussan"
                      className="w-28 h-28 md:w-40 md:h-40 rounded-2xl md:rounded-[2rem] shadow-lg border border-white/20"
                      isDark={systemTheme === 'dark'}
                    />
                    <div className="text-center md:text-left pt-2 flex-1">
                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 tracking-[-0.02em] ${
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
                        ? 'bg-blue-900/20 border-blue-600/20'
                        : 'bg-blue-50/50 border-blue-100'
                    }`}>
                      <p className={`font-semibold mb-3 text-base ${
                        systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{content.bio.value_prop}</p>
                      <ul className="space-y-2">
                        {content.bio.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <CheckCircle2 size={16} className="mr-2.5 mt-0.5 text-blue-600 flex-shrink-0" />
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
                     onClick={() => openModalWithUrl('/about')}
                     className="group px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center shadow-sm hover:shadow-md bg-[#2D5CF3] text-white hover:bg-[#2450d9]"
                   >
                     {content.bio.view_full_bio} <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </button>

                   <div className="flex space-x-2">
                      <a
                        href="https://linkedin.com/in/victorsoussan"
                        target="_blank"
                        rel="noreferrer"
                        className={`px-4 py-2.5 rounded-full text-sm font-medium btn-pill flex items-center ${
                          systemTheme === 'dark'
                            ? 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                            : 'glass-effect text-gray-700 hover:text-[#0077b5]'
                        }`}
                      >
                        <Linkedin size={16} className="mr-2"/> LinkedIn
                      </a>
                      <button
                        onClick={() => {
                          openModalWithUrl('/resume');
                        }}
                        className={`px-4 py-2.5 rounded-full text-sm font-medium btn-pill flex items-center ${
                          systemTheme === 'dark'
                            ? 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                            : 'glass-effect text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        <FileText size={16} className="mr-2"/> Resume
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
                           ? 'bg-white/5 hover:bg-blue-900/30 text-gray-300 hover:text-blue-400 border-white/5 hover:border-blue-600/30'
                           : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border-transparent hover:border-blue-100'
                       }`}
                     >
                        <div className={`mr-3 p-2 rounded-lg border shadow-sm ${
                          systemTheme === 'dark'
                            ? 'bg-white/10 border-white/10 group-hover:border-blue-600/30'
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
                        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600"/>
                     </a>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;
