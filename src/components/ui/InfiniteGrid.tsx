import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame
} from "framer-motion";

interface InfiniteGridProps {
  isDark?: boolean;
  className?: string;
}

export const InfiniteGrid: React.FC<InfiniteGridProps> = ({ isDark = false, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.3;
  const speedY = 0.3;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
    >
      {/* Base grid - very subtle */}
      <div className={`absolute inset-0 z-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} isDark={isDark} />
      </div>

      {/* Interactive grid - reveals on mouse hover */}
      <motion.div
        className={`absolute inset-0 z-0 ${isDark ? 'opacity-20' : 'opacity-30'}`}
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} isDark={isDark} />
      </motion.div>

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute right-[-10%] top-[-20%] w-[50%] h-[50%] rounded-full blur-[120px] ${
          isDark ? 'bg-blue-600/8' : 'bg-blue-300/20'
        }`} />
        <div className={`absolute right-[20%] top-[10%] w-[25%] h-[25%] rounded-full blur-[100px] ${
          isDark ? 'bg-indigo-500/5' : 'bg-indigo-300/15'
        }`} />
        <div className={`absolute left-[-15%] bottom-[-10%] w-[45%] h-[45%] rounded-full blur-[120px] ${
          isDark ? 'bg-indigo-600/8' : 'bg-indigo-300/20'
        }`} />
        <div className={`absolute left-[30%] bottom-[20%] w-[20%] h-[20%] rounded-full blur-[80px] ${
          isDark ? 'bg-violet-500/5' : 'bg-violet-300/12'
        }`} />
      </div>

      {/* Bottom fade to blend with next section */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10 ${
          isDark
            ? 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent'
            : 'bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/70 to-transparent'
        }`}
      />
    </div>
  );
};

interface GridPatternProps {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
  isDark?: boolean;
}

const GridPattern: React.FC<GridPatternProps> = ({ offsetX, offsetY, isDark = false }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="hero-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={isDark ? 'text-white/40' : 'text-gray-400'}
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
    </svg>
  );
};

export default InfiniteGrid;
