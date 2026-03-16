import React from 'react';
import {
  ArrowUpRight,
  Smartphone,
  FlaskConical,
} from 'lucide-react';
import { Bot, Palette } from 'lucide-react';

interface LabPreview {
  title: string;
  subtitle: string;
  color: string;
  highlights: string[];
  previews: string[];
  link: string;
}

interface LabSectionProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  content: {
    lab: {
      tag: string;
      title: string;
      desc: string;
      apps_title: string;
      apps_sub: string;
      apps_desc: string;
      apps_cta: string;
      agents_title: string;
      agents_sub: string;
      agents_desc: string;
      agents_cta: string;
      art_title: string;
      art_sub: string;
      art_desc: string;
      art_cta: string;
    };
  };
  labPreviews: {
    apps: LabPreview;
    agents: LabPreview;
    art: LabPreview;
  };
}

const LabSection: React.FC<LabSectionProps> = ({
  content,
  labPreviews,
}) => {
  return (
    <section id="lab" className="py-16 md:py-32 px-10 bg-[#09090b] text-white relative overflow-hidden">
       {/* Atmospheric Glows */}
       <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

       <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="mb-8 md:mb-12 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-blue-300 mb-3 md:mb-4 backdrop-blur-md">
               <FlaskConical size={14} className="mr-2"/> {content.lab.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">{content.lab.title}</h2>
            <p className="text-gray-400 mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
               {content.lab.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
             {/* Card 1: Condamine Apps */}
             <a
               href={labPreviews.apps.link}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative bg-[#151517] border border-white/5 hover:border-blue-600/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 p-4 bg-blue-900/20 w-fit rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                   <Smartphone size={32}/>
                </div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] mb-2">{content.lab.apps_title}</h3>
                <div className="text-xs font-mono text-blue-400 mb-4">{content.lab.apps_sub}</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                   {content.lab.apps_desc}
                </p>
                <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                   {content.lab.apps_cta} <ArrowUpRight size={16} className="ml-2"/>
                </div>
             </a>

             {/* Card 2: Prompts DB */}
             <a
               href={labPreviews.agents.link}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative bg-[#151517] border border-white/5 hover:border-purple-500/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 flex flex-col overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 p-4 bg-purple-900/20 w-fit rounded-2xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
                   <Bot size={32}/>
                </div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] mb-2">{content.lab.agents_title}</h3>
                <div className="text-xs font-mono text-purple-400 mb-4">{content.lab.agents_sub}</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                   {content.lab.agents_desc}
                </p>
                <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                   {content.lab.agents_cta} <ArrowUpRight size={16} className="ml-2"/>
                </div>
             </a>

             {/* Card 3: Art Gallery */}
             <a
               href={labPreviews.art.link}
               target="_blank"
               rel="noopener noreferrer"
               className="group relative bg-[#151517] border border-white/5 hover:border-pink-500/50 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/10 flex flex-col overflow-hidden cursor-pointer"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 p-4 bg-pink-900/20 w-fit rounded-2xl text-pink-400 group-hover:scale-110 transition-transform duration-300">
                   <Palette size={32}/>
                </div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] mb-2">{content.lab.art_title}</h3>
                <div className="text-xs font-mono text-pink-400 mb-4">{content.lab.art_sub}</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                   {content.lab.art_desc}
                </p>
                <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                   {content.lab.art_cta} <ArrowUpRight size={16} className="ml-2"/>
                </div>
             </a>
          </div>
       </div>
    </section>
  );
};

export default LabSection;
