'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { Project } from '@/data/projectsData'

interface ScrollExpandCardProps {
  project: Project
  index: number
  shouldAnimate: boolean
  startScale: number
  systemTheme: 'light' | 'dark'
  onClick: () => void
  children: React.ReactNode
}

const ScrollExpandCard: React.FC<ScrollExpandCardProps> = ({
  index,
  shouldAnimate,
  startScale,
  systemTheme,
  onClick,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.3'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const scale = useTransform(
    smoothProgress,
    [0, 1],
    shouldAnimate ? [startScale, 1] : [1, 1]
  )

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      style={
        shouldAnimate
          ? { scale, transformOrigin: 'center top' }
          : undefined
      }
      className={`group cursor-pointer rounded-2xl md:rounded-3xl border overflow-hidden ${
        systemTheme === 'dark'
          ? 'bg-[#1D1D1F] border-white/5 shadow-xl shadow-black/20'
          : 'bg-white border-gray-200 shadow-lg shadow-gray-300/40'
      }`}
    >
      {children}
    </motion.div>
  )
}

export default ScrollExpandCard
