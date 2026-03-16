import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { PrototypeCategory, CATEGORY_COLORS } from '../../data/sqoolPrototypesData';

interface PrototypeCardProps {
  prototypeId: string;
  title: string;
  description: string;
  category: PrototypeCategory;
  isDark: boolean;
  onClick: () => void;
  compact?: boolean;
}

const PrototypeCard: React.FC<PrototypeCardProps> = ({
  prototypeId,
  title,
  description,
  category,
  isDark,
  onClick,
  compact = false,
}) => {
  const colors = CATEGORY_COLORS[category];
  const [imgLoaded, setImgLoaded] = useState(false);
  const thumbnailSrc = `/images/prototypes/${prototypeId}.webp`;

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-200 aspect-[16/10] ${
        isDark
          ? 'bg-[#1D1D1F] border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5'
          : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-lg'
      } hover:scale-[1.02] cursor-pointer w-full`}
    >
      {/* Screenshot thumbnail */}
      <img
        src={thumbnailSrc}
        alt={title}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Badge */}
      <div className={`absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide backdrop-blur-sm ${
        isDark ? `${colors.bg} ${colors.text}` : `${colors.bgLight} ${colors.textLight}`
      }`}>
        {prototypeId}
      </div>

      {/* Play icon - appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className={`flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 ${
          compact ? 'w-10 h-10' : 'w-12 h-12'
        } bg-white/90 shadow-lg`}>
          <Play
            size={compact ? 16 : 20}
            className="ml-0.5 text-gray-900"
          />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

      {/* Bottom text overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t ${
        isDark
          ? 'from-black/80 via-black/40 to-transparent'
          : 'from-white/90 via-white/60 to-transparent'
      }`}>
        <p className={`text-xs font-semibold leading-tight truncate ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </p>
        {!compact && (
          <p className={`text-[10px] leading-tight mt-0.5 line-clamp-2 ${
            isDark ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {description}
          </p>
        )}
      </div>
    </button>
  );
};

export default PrototypeCard;
