import React, { useState, useEffect } from 'react';
import { Monitor, Users, Play } from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  PROTOTYPE_MAP,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  PrototypeCategory,
} from '../data/sqoolPrototypesData';

interface GallerySidebarProps {
  activeCategory: PrototypeCategory | null;
  activePrototypeId: string | null;
  onPrototypeClick: (prototypeId: string) => void;
  onCategoryClick: (category: PrototypeCategory) => void;
  isDark: boolean;
  lang: 'en' | 'fr';
}

const CATEGORY_ICONS = {
  teacher: Monitor,
  student: Users,
  scenario: Play,
} as const;

const GallerySidebar: React.FC<GallerySidebarProps> = ({
  activeCategory,
  activePrototypeId,
  onPrototypeClick,
  onCategoryClick,
  isDark,
  lang,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    // Mobile: horizontal pill bar
    return (
      <div className={`sticky top-16 z-30 px-4 py-2 flex gap-2 overflow-x-auto ${
        isDark ? 'bg-[#0a0a0a]/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'
      }`}>
        {GALLERY_CATEGORIES.map(cat => {
          const Icon = CATEGORY_ICONS[cat.id];
          const colors = CATEGORY_COLORS[cat.id];
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive
                  ? (isDark ? `${colors.bg} ${colors.text}` : `${colors.bgLight} ${colors.textLight}`)
                  : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
              }`}
            >
              <Icon size={12} />
              {CATEGORY_LABELS[cat.id][lang]}
              <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {cat.prototypeIds.length}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Desktop: fixed sidebar
  return (
    <nav className={`w-[220px] flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 ${
      isDark ? '' : ''
    }`} style={{ scrollbarWidth: 'thin' }}>
      {GALLERY_CATEGORIES.map(cat => {
        const Icon = CATEGORY_ICONS[cat.id];
        const colors = CATEGORY_COLORS[cat.id];
        const isActiveCategory = activeCategory === cat.id;
        return (
          <div key={cat.id} className="mb-6">
            {/* Category header */}
            <button
              onClick={() => onCategoryClick(cat.id)}
              className={`flex items-center gap-2 w-full text-left mb-2 px-2 py-1 rounded-lg transition-colors ${
                isActiveCategory
                  ? (isDark ? 'bg-white/5' : 'bg-gray-100')
                  : ''
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              <Icon size={12} className={isDark ? colors.text : colors.textLight} />
              <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {CATEGORY_LABELS[cat.id][lang]}
              </span>
              <span className={`text-[10px] ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {cat.prototypeIds.length}
              </span>
            </button>
            {/* Prototype list */}
            <div className="space-y-0.5">
              {cat.prototypeIds.map(pid => {
                const proto = PROTOTYPE_MAP.get(pid);
                if (!proto) return null;
                const isActive = activePrototypeId === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => onPrototypeClick(pid)}
                    className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded-md text-[11px] transition-colors ${
                      isActive
                        ? (isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-[#2D5CF3]')
                        : (isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50')
                    }`}
                  >
                    <span className={`font-mono text-[10px] flex-shrink-0 w-6 ${
                      isActive ? '' : (isDark ? 'text-gray-500' : 'text-gray-400')
                    }`}>
                      {pid}
                    </span>
                    <span className="truncate">{proto.title[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default GallerySidebar;
