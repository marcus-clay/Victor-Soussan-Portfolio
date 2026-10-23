'use client'

import React, { useEffect, useRef, useState } from 'react'

/** The 390 × 844 screen of a phone, scaled to the device that holds it. */
export default function ScaledScreen({ children, className = 'absolute inset-0 overflow-hidden' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.6)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setScale(el.clientWidth / 390)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 390, height: 844, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}
