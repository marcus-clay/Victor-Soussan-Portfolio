import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle as CheckCircle2,
  Stack as Layers,
  Lightning as Zap,
  Trophy
} from '@phosphor-icons/react';

// --- DATA ---

const PHASES = [
  {
    id: 1,
    title: "Foundation",
    duration: "Months 1-3",
    icon: Layers,
    description: "Establishing the core architecture and essential workflows.",
    features: [
      "Core authentication & navigation architecture",
      "Project creation & management workflows",
      "Task library with drag-drop sequences",
      "Planning V1 with colorful task cards",
      "Subscription system (individual + enterprise)",
      "PDF export functionality"
    ]
  },
  {
    id: 2,
    title: "Feature Expansion",
    duration: "Months 4-8",
    icon: Zap,
    description: "Enhancing interactivity and visual systems.",
    features: [
      "Advanced planning interactions (multi-select)",
      "Dynamic island adaptive menu system",
      "Refined task card aesthetic (V2 visual system)",
      "Fluid zoom timeline (daily to quarterly)",
      "Project hub for multi-site managers",
      "Stakeholder management features"
    ]
  },
  {
    id: 3,
    title: "Platform Maturity",
    duration: "Months 9-12",
    icon: Trophy,
    description: "Scalability, mobile strategy, and refinement.",
    features: [
      "Visual complexity management (hierarchy)",
      "Mobile strategy with platform-specific design",
      "Navigation evolution (direct access)",
      "Consolidated mobile navigation (4 groups)",
      "Activity enrichment (photo annotation)",
      "Design system scalability (120+ screens)"
    ]
  }
];

// --- COMPONENTS ---

export default function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'overview' | 'focus'>('focus');

  // Trigger initial animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleNext = () => {
    if (activePhase < PHASES.length - 1) setActivePhase(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activePhase > 0) setActivePhase(prev => prev - 1);
  };

  return (
    <div className={`min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-start bg-gradient-to-b from-[#F5F5F7] to-transparent h-32">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Product Evolution</h1>
          <p className="text-[#86868B] text-sm mt-1 font-medium">12-Month Journey</p>
        </div>
        
        {/* View Toggle */}
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-sm rounded-full p-1 flex">
          <button 
            onClick={() => setViewMode('focus')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${viewMode === 'focus' ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
          >
            Focus
          </button>
          <button 
            onClick={() => setViewMode('overview')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${viewMode === 'overview' ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
          >
            Overview
          </button>
        </div>
      </header>

      {/* --- MAIN STAGE --- */}
      <main className="relative h-screen w-full flex flex-col justify-center items-center">
        
        {viewMode === 'focus' ? (
          <FocusView 
            activePhase={activePhase} 
            setActivePhase={setActivePhase} 
            handleNext={handleNext} 
            handlePrev={handlePrev} 
          />
        ) : (
          <OverviewView />
        )}

      </main>

      {/* Footer removed as requested */}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function FocusView({ activePhase, setActivePhase, handleNext, handlePrev }: any) {
  // Swipe Logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div 
      className="w-full max-w-6xl px-6 md:px-12 flex flex-col items-center relative z-10 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Progress Indicator */}
      <div className="flex items-center gap-3 mb-12">
        {PHASES.map((_phase, idx) => (
          <div key={idx} className="flex items-center">
            <button
              onClick={() => setActivePhase(idx)}
              className={`h-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${idx === activePhase ? 'w-12 bg-[#1D1D1F]' : 'w-2 bg-[#D1D1D6] hover:bg-[#86868B]'}`}
            />
          </div>
        ))}
      </div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-4xl h-[500px]">
        {PHASES.map((phase, idx) => {
          const isActive = idx === activePhase;
          const isPrev = idx < activePhase;
          const isNext = idx > activePhase;

          return (
            <div 
              key={phase.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom
                ${isActive ? 'opacity-100 scale-100 translate-x-0 z-20' : ''}
                ${isPrev ? 'opacity-0 scale-90 -translate-x-24 z-10' : ''}
                ${isNext ? 'opacity-0 scale-95 translate-x-24 z-10 blur-sm' : ''}
              `}
            >
              <div className="bg-white rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.08)] border border-white/50 w-full h-full overflow-hidden flex flex-col md:flex-row select-none">
                
                {/* Left: Identity */}
                <div className="md:w-1/3 bg-[#FAFAFA] border-b md:border-b-0 md:border-r border-[#E5E5E5] p-10 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1D1D1F] text-white rounded-2xl shadow-lg mb-8">
                      <phase.icon size={26} strokeWidth={2} />
                    </div>
                    <div className="uppercase tracking-widest text-[10px] font-bold text-[#86868B] mb-2">
                      Phase {phase.id}
                    </div>
                    <h2 className="text-3xl font-bold text-[#1D1D1F] leading-tight mb-2">
                      {phase.title}
                    </h2>
                    <div className="inline-block px-3 py-1 bg-[#E8E8ED] rounded-md text-xs font-semibold text-[#1D1D1F]">
                      {phase.duration}
                    </div>
                  </div>
                  <p className="text-[#86868B] text-sm leading-relaxed mt-6">
                    {phase.description}
                  </p>
                </div>

                {/* Right: Features */}
                <div className="md:w-2/3 p-10 md:p-12 overflow-y-auto">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#86868B] mb-8">
                    Key Deliverables
                  </h3>
                  <ul className="space-y-6">
                    {phase.features.map((feature, fIdx) => (
                      <li 
                        key={fIdx} 
                        className="flex items-start gap-4 group"
                        style={{ 
                          transitionDelay: `${isActive ? 300 + (fIdx * 100) : 0}ms` 
                        }}
                      >
                        <div className={`mt-0.5 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                           {/* Accent Color Change: #007AFF -> #4D4BE7 */}
                           <CheckCircle2 size={20} className="text-[#4D4BE7]" strokeWidth={2.5} />
                        </div>
                        <span className={`text-[17px] font-medium text-[#1D1D1F] leading-relaxed transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (Floating) */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-5xl flex justify-between pointer-events-none px-4 md:px-0 z-50">
        <button 
          onClick={handlePrev}
          disabled={activePhase === 0}
          className={`w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-[#1D1D1F] pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:cursor-default`}
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <button 
          onClick={handleNext}
          disabled={activePhase === PHASES.length - 1}
          className={`w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-[#1D1D1F] pointer-events-auto transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:cursor-default`}
        >
          <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}

function OverviewView() {
  return (
    <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row gap-6 items-stretch justify-center h-[600px] animate-in fade-in zoom-in-95 duration-700">
      {PHASES.map((phase, _idx) => (
        <div
          key={phase.id}
          className="flex-1 bg-white rounded-[24px] shadow-sm border border-[#E5E5E5] p-8 flex flex-col hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
        >
           <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors duration-500">
                    <phase.icon size={22} strokeWidth={2} />
                 </div>
                 <div>
                    <div className="text-[10px] uppercase font-bold text-[#86868B] tracking-wider">Phase {phase.id}</div>
                    <div className="text-xs font-semibold text-[#1D1D1F]">{phase.duration}</div>
                 </div>
              </div>
           </div>
           
           <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">{phase.title}</h3>
           
           <div className="flex-1 space-y-3">
             {phase.features.slice(0, 4).map((f, i) => (
               <div key={i} className="flex items-center gap-2 text-sm text-[#424245]">
                 {/* Accent Color Change: #007AFF -> #4D4BE7 */}
                 <div className="w-1.5 h-1.5 rounded-full bg-[#D1D1D6] group-hover:bg-[#4D4BE7] transition-colors duration-500" />
                 <span className="truncate">{f}</span>
               </div>
             ))}
             {phase.features.length > 4 && (
                <div className="text-xs text-[#86868B] pl-3.5 italic">
                   + {phase.features.length - 4} more
                </div>
             )}
           </div>
        </div>
      ))}
    </div>
  );
}