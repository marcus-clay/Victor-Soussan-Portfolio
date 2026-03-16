import React from 'react';
import {
  PencilSimple as PenTool,
  Lightning as Zap,
  Gear as Settings,
  Users,
  CheckCircle as CheckCircle2,
  CaretDown as ChevronDown,
} from '@phosphor-icons/react';

interface ServicesSectionProps {
  systemTheme: 'light' | 'dark';
  lang: 'en' | 'fr';
  content: {
    services: {
      title: string;
      subtitle: string;
      execution: string;
      utility: string;
      efficiency: string;
      impact: string;
      items: {
        execution: string[];
        utility: string[];
        efficiency: string[];
        impact: string[];
      };
    };
  };
  expandedService: string | null;
  setExpandedService: (id: string | null) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  systemTheme,
  lang,
  content,
  expandedService,
  setExpandedService,
}) => {
  const services = [
    {
      id: 'execution',
      icon: <PenTool size={24}/>,
      title: content.services.execution,
      items: content.services.items.execution,
      color: 'pink' as const,
      image: '/images/sketches services/gifs/01_image_hand_on_execution.gif'
    },
    {
      id: 'utility',
      icon: <Zap size={24}/>,
      title: content.services.utility,
      items: content.services.items.utility,
      color: 'blue' as const,
      image: '/images/sketches services/gifs/02_workshop_product_vision.gif'
    },
    {
      id: 'efficiency',
      icon: <Settings size={24}/>,
      title: content.services.efficiency,
      items: content.services.items.efficiency,
      color: 'orange' as const,
      image: '/images/sketches services/gifs/03 - product_vision_workshop_facilitation.gif'
    },
    {
      id: 'impact',
      icon: <Users size={24}/>,
      title: content.services.impact,
      items: content.services.items.impact,
      color: 'teal' as const,
      image: '/images/sketches services/gifs/04_organisationtal_impact_workshop_alignment.gif'
    }
  ];

  const logos = [
    { src: '/logos/LOGO UNOWHY.svg', alt: 'Unowhy' },
    { src: '/logos/LOGO BETAGOUV.svg', alt: 'Beta.gouv' },
    { src: '/logos/LOGO TOOLKIT.svg', alt: 'Toolkit' },
    { src: '/logos/LOGO KYU.svg', alt: 'Kyu' },
    { src: '/logos/LOGO AIRBUS.svg', alt: 'Airbus' },
    { src: '/logos/LOGO ORANGE.svg', alt: 'Orange' },
    { src: '/logos/LOGO VINCI.svg', alt: 'Vinci' },
    { src: '/logos/LOGO DAILYMOTION-1.svg', alt: 'Dailymotion' },
    { src: '/logos/LOGO BOUYGUES IMMO.svg', alt: 'Bouygues Immobilier' },
    { src: '/logos/LOGO REGION ILE DE FRANCE.svg', alt: 'Region Ile-de-France' },
    { src: '/logos/LOGO OGURY.svg', alt: 'Ogury' },
    { src: '/logos/LOGO SOLOCAL.svg', alt: 'Solocal' },
    { src: '/logos/LOGO CELIO.svg', alt: 'Celio' },
    { src: '/logos/LOGO OPERA COMIQUE.svg', alt: 'Opera Comique' },
    { src: '/logos/LOGO VERLINDE.svg', alt: 'Verlinde' },
    { src: '/logos/LOGO UPTRADE.svg', alt: 'Uptrade' },
  ];

  return (
    <section id="services" className={`py-16 md:py-32 px-10 relative overflow-hidden ${
      systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#FCFCFD]'
    }`}>
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="mb-8 md:mb-12 text-center">
           <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 ${
             systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
           }`}>{content.services.title}</h2>
           <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
             {content.services.subtitle}
           </p>
        </div>

        <div className="space-y-4">
          {/* Service Accordion Items */}
          {services.map((service) => {
            const isExpanded = expandedService === service.id;
            const colorClasses = {
              pink: {
                bg: systemTheme === 'dark' ? 'bg-pink-500/20' : 'bg-pink-50',
                text: systemTheme === 'dark' ? 'text-pink-400' : 'text-pink-600',
                check: 'text-pink-400'
              },
              blue: {
                bg: systemTheme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50',
                text: systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600',
                check: 'text-blue-400'
              },
              orange: {
                bg: systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50',
                text: systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600',
                check: 'text-orange-400'
              },
              teal: {
                bg: systemTheme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-50',
                text: systemTheme === 'dark' ? 'text-teal-400' : 'text-teal-600',
                check: 'text-teal-400'
              }
            }[service.color];

            const borderHoverColor = {
              pink: 'hover:border-pink-500/50',
              blue: 'hover:border-blue-600/50',
              orange: 'hover:border-orange-500/50',
              teal: 'hover:border-teal-500/50'
            }[service.color];

            const shadowHoverColor = {
              pink: 'hover:shadow-pink-900/10',
              blue: 'hover:shadow-blue-900/10',
              orange: 'hover:shadow-orange-900/10',
              teal: 'hover:shadow-teal-900/10'
            }[service.color];

            const gradientColor = {
              pink: 'from-pink-500/5',
              blue: 'from-blue-600/5',
              orange: 'from-orange-500/5',
              teal: 'from-teal-500/5'
            }[service.color];

            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer ${
                  systemTheme === 'dark'
                    ? `bg-[#1D1D1F] border-white/5 ${borderHoverColor}`
                    : `bg-white border-gray-100 ${borderHoverColor}`
                } ${isExpanded ? 'shadow-xl' : `shadow-sm hover:shadow-2xl ${shadowHoverColor}`}`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                  className="relative z-10 w-full px-6 py-5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${colorClasses.bg} ${colorClasses.text}`}>
                      {service.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold tracking-[-0.02em] ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{service.title}</h3>
                  </div>
                  <div className={`p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    systemTheme === 'dark'
                      ? 'bg-white/10'
                      : 'bg-gray-100'
                  } ${isExpanded ? 'opacity-100' : ''}`}>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      } ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                  </div>
                </button>

                {/* Accordion Content - CSS Grid trick for smooth height animation */}
                <div
                  className="grid relative z-10"
                  style={{
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms ease-out',
                  }}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      transition: 'opacity 200ms ease-out',
                      transitionDelay: isExpanded ? '100ms' : '0ms',
                    }}
                  >
                    <div className={`px-6 pb-6 border-t ${
                      systemTheme === 'dark' ? 'border-white/10' : 'border-gray-100'
                    }`}>
                      {/* Layout: 1/3 image, 2/3 bullets */}
                      <div className="flex flex-col md:flex-row gap-6 pt-6">
                        {/* Image - 1/3 width on desktop */}
                        <div className="md:w-1/3 flex-shrink-0">
                          <div className={`rounded-2xl overflow-hidden border ${
                            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                          }`}>
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-auto object-cover"
                              loading="eager"
                            />
                          </div>
                        </div>
                        {/* Bullet Points - 2/3 width on desktop */}
                        <div className="md:w-2/3">
                          <ul className={`space-y-4 ${
                            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {service.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 size={18} className={`mr-3 mt-0.5 ${colorClasses.check} flex-shrink-0`}/>
                                <span className="text-base leading-relaxed font-medium tracking-[-0.01em]">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trusted by - Integrated in same section */}
        <div id="clients" className="mt-32 md:mt-48">
          <div className="mb-8 md:mb-12 text-center">
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.02em] ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {lang === 'en' ? 'Trusted by leading companies' : 'Ils me font confiance'}
            </h3>
          </div>

          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className={`absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none ${
              systemTheme === 'dark'
                ? 'bg-gradient-to-r from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-r from-[#FCFCFD] to-transparent'
            }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none ${
              systemTheme === 'dark'
                ? 'bg-gradient-to-l from-[#0a0a0a] to-transparent'
                : 'bg-gradient-to-l from-[#FCFCFD] to-transparent'
            }`} />

            <div className="logo-carousel-track flex hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0">
                  {logos.map((logo, index) => (
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
  );
};

export default ServicesSection;
