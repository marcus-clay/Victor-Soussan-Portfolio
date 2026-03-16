import React, { useState, useRef, useEffect } from 'react';
import { CaretRight as ChevronRight, CaretLeft as ChevronLeft, Briefcase } from '@phosphor-icons/react';
import { careerData, CareerItem } from '../data/careerData';

interface CareerCarouselProps {
  lang: 'en' | 'fr';
  headline?: string;
}

export default function CareerCarousel({ lang, headline }: CareerCarouselProps) {
  // Find the index of the 2025 item to start there
  const startIndex = careerData.findIndex(d => d.period === "2025");
  const [activeId, setActiveId] = useState(careerData[startIndex >= 0 ? startIndex : careerData.length - 2].id);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const activeIndex = careerData.findIndex(d => d.id === activeId);

  // Sync scroll of the thumbnail timeline with active ID (desktop only)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        const container = scrollContainerRef.current;
        const scrollLeft = activeElement.offsetLeft - container.offsetWidth / 2 + activeElement.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeId, activeIndex]);

  // Scroll to active item on mobile
  useEffect(() => {
    if (mobileScrollRef.current) {
      const activeElement = mobileScrollRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeIndex]);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveId(careerData[activeIndex - 1].id);
  };

  const handleNext = () => {
    if (activeIndex < careerData.length - 1) setActiveId(careerData[activeIndex + 1].id);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = index - activeIndex;
    const isActive = offset === 0;

    if (Math.abs(offset) > 2) return { display: 'none' };

    let xTransform = '0%';
    let scale = 1;
    let opacity = 1;
    let blur = '0px';
    let zIndex = 0;

    if (isActive) {
      xTransform = '0%';
      scale = isHovering ? 1.02 : 1;
      opacity = 1;
      zIndex = 30;
    } else if (offset === -1) {
      xTransform = '-60%';
      scale = 0.85;
      opacity = 0.5;
      blur = '2px';
      zIndex = 20;
    } else if (offset === 1) {
      xTransform = '60%';
      scale = 0.85;
      opacity = 0.5;
      blur = '2px';
      zIndex = 20;
    } else if (offset < 0) {
      xTransform = '-120%';
      scale = 0.7;
      opacity = 0;
      zIndex = 10;
    } else {
      xTransform = '120%';
      scale = 0.7;
      opacity = 0;
      zIndex = 10;
    }

    return {
      transform: `translateX(${xTransform}) scale(${scale})`,
      opacity,
      filter: `blur(${blur})`,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
      position: 'absolute',
      width: '100%',
      maxWidth: '550px',
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
    };
  };

  const getRole = (item: CareerItem) => item.role[lang];
  const getDetails = (item: CareerItem) => item.details[lang];

  return (
    <div className="flex flex-col h-full bg-zinc-50 font-sans text-zinc-900 overflow-hidden selection:bg-zinc-200">

      {/* Header */}
      {headline && (
        <header className="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 flex justify-between items-center z-30 shrink-0">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900">{headline}</h1>
            <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-medium">
              {lang === 'fr' ? 'Evolution & Expertise' : 'Evolution & Expertise'}
            </p>
          </div>
        </header>
      )}

      {/* ============ MOBILE VIEW - Vertical Scrollable List ============ */}
      <div
        className="md:hidden flex-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div
          ref={mobileScrollRef}
          className="h-full overflow-y-auto px-4 py-4 space-y-3 career-timeline"
        >
          {careerData.map((item) => {
            const isActive = activeId === item.id;
            const yearLabel = item.period.split('-')[0];

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(item.id);
                }}
                className={`
                  career-card rounded-2xl border p-4 transition-all duration-300 cursor-pointer
                  ${isActive
                    ? 'bg-white border-zinc-300 shadow-lg ring-1 ring-zinc-200'
                    : 'bg-white/60 border-zinc-100 hover:bg-white hover:border-zinc-200'}
                `}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`}></span>
                    <span className="text-xs font-mono font-semibold text-zinc-500">{yearLabel}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                      {lang === 'fr' ? 'Actuel' : 'Current'}
                    </span>
                  )}
                </div>

                {/* Role */}
                <h3 className={`font-bold tracking-tight leading-tight mb-1 transition-colors ${isActive ? 'text-lg text-zinc-900' : 'text-base text-zinc-600'}`}>
                  {getRole(item)}
                </h3>

                {/* Company */}
                <p className={`text-sm mb-2 flex items-center ${isActive ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  <Briefcase className="w-3.5 h-3.5 mr-1.5 opacity-60" />
                  {item.company}
                </p>

                {/* Details - only show for active item */}
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
                    {getDetails(item).map((detail, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mt-1.5 mr-2 min-w-[4px] h-[4px] rounded-full bg-zinc-300"></div>
                        <p className="text-sm text-zinc-600 leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ DESKTOP VIEW - 3D Carousel ============ */}
      <main
        className="hidden md:flex flex-1 flex-col relative z-20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CAROUSEL SECTION */}
        <div className="flex-1 flex items-center justify-center relative w-full perspective-1000 pb-20">
          {/* Background Year */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
            {careerData.map((data, idx) => (
              <span
                key={data.id}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[18rem] font-bold text-zinc-100 tracking-tighter transition-all duration-700 ease-out select-none
                  ${idx === activeIndex ? 'opacity-60 scale-100' : 'opacity-0 scale-90 blur-sm'}
                `}
              >
                {data.period.split('-')[0]}
              </span>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`absolute left-12 z-50 p-4 rounded-full bg-white/50 hover:bg-white backdrop-blur-md border border-zinc-200 shadow-sm transition-all duration-300 group ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
          >
            <ChevronLeft className="w-6 h-6 text-zinc-500 group-hover:text-zinc-800" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === careerData.length - 1}
            className={`absolute right-12 z-50 p-4 rounded-full bg-white/50 hover:bg-white backdrop-blur-md border border-zinc-200 shadow-sm transition-all duration-300 group ${activeIndex === careerData.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
          >
            <ChevronRight className="w-6 h-6 text-zinc-500 group-hover:text-zinc-800" />
          </button>

          {/* Main Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {careerData.map((data, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <div
                  key={data.id}
                  style={style}
                  className={`cursor-pointer ${isActive ? 'cursor-default' : ''}`}
                  onClick={() => !isActive && setActiveId(data.id)}
                  onMouseEnter={() => isActive && setIsHovering(true)}
                  onMouseLeave={() => isActive && setIsHovering(false)}
                >
                  <div className={`
                    h-auto min-h-[400px] flex flex-col justify-center rounded-3xl p-10
                    transition-all duration-500 overflow-hidden relative
                    ${isActive ? 'bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-zinc-900/5' : 'bg-white border border-zinc-200/80 shadow-lg opacity-80'}
                  `}>
                    <div className="transition-transform duration-700 ease-out" style={{ transform: isActive ? `translateX(${offset * -20}px)` : 'none' }}>
                      <div className="flex items-center space-x-3 mb-6">
                        <span className={`h-3 w-3 rounded-full ${data.color} ring-4 ring-white shadow-sm`}></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-zinc-400">{data.period}</span>
                      </div>
                      <h2 className={`font-bold text-zinc-800 mb-2 tracking-tight leading-tight transition-all duration-500 ${isActive ? 'text-4xl' : 'text-xl text-zinc-300'}`}>
                        {getRole(data)}
                      </h2>
                      <h3 className={`font-medium mb-8 flex items-center transition-all duration-500 ${isActive ? 'text-lg text-zinc-500' : 'text-sm text-zinc-300'}`}>
                        <Briefcase className={`w-5 h-5 mr-2 opacity-60 ${!isActive && 'hidden'}`} />
                        {data.company}
                      </h3>
                      <div className={`space-y-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                        {getDetails(data).map((detail, idx) => (
                          <div key={idx} className="flex items-start group/item">
                            <div className="mt-2 mr-3 min-w-[5px] h-[5px] rounded-full bg-zinc-200 group-hover/item:bg-zinc-400 transition-colors"></div>
                            <p className="text-lg text-zinc-600 leading-relaxed font-light group-hover/item:text-zinc-900 transition-colors duration-300">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SECTION: Thumbnail Timeline */}
        <div className="h-44 bg-white/80 backdrop-blur-md border-t border-zinc-100 z-50 shrink-0 relative shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">

          {/* Visual gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>

          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-4 overflow-x-auto px-[50vw] hide-scrollbar h-full py-4 snap-x"
            style={{ scrollBehavior: 'smooth' }}
          >
            {careerData.map((item) => {
              const isActive = activeId === item.id;
              const yearLabel = item.period.split('-')[0];

              return (
                <div
                  key={item.id}
                  className={`
                    relative flex-none w-32 h-24 rounded-xl border cursor-pointer transition-all duration-300 ease-out group snap-center flex flex-col justify-between p-3 overflow-hidden
                    ${isActive
                      ? 'bg-white border-zinc-300 scale-110 shadow-lg ring-1 ring-zinc-200 -translate-y-2'
                      : 'bg-zinc-50 border-zinc-100 hover:border-zinc-200 hover:bg-white hover:scale-105 opacity-60 hover:opacity-100'}
                  `}
                  onClick={() => setActiveId(item.id)}
                >
                  <div className={`w-full h-1.5 rounded-full ${item.color} mb-2 opacity-80`}></div>
                  <div className="flex-1">
                    <p className={`text-[9px] font-bold leading-tight line-clamp-2 ${isActive ? 'text-zinc-800' : 'text-zinc-400'}`}>
                      {getRole(item)}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-zinc-100 flex justify-between items-end">
                    <span className={`text-[10px] font-mono font-medium ${isActive ? 'text-zinc-900' : 'text-zinc-300'}`}>
                      {yearLabel}
                    </span>
                    {isActive && <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none">
            <p className="text-[9px] text-zinc-300 uppercase tracking-widest">Timeline</p>
          </div>
        </div>

      </main>
    </div>
  );
}
