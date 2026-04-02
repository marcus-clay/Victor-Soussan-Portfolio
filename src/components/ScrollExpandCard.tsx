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
      initial={{ opacity: 0, transform: 'translateY(24px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      style={
        shouldAnimate
          ? { scale, transformOrigin: 'center top' }
          : undefined
      }
      className={`group cursor-pointer overflow-hidden rounded-2xl ${
        systemTheme === 'dark'
          ? 'bg-[#1D1D1F]'
          : ''
      }`}
    >
      {children}
    </motion.div>
  )
}

export default ScrollExpandCard
