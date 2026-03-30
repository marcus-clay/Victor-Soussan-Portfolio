'use client'

import React, { useState } from 'react'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const Avatar: React.FC<{
  filename: string
  alt: string
  className?: string
  isDark?: boolean
}> = ({ filename, alt, className = '', isDark = false }) => {
  const isVictorPortrait = filename.includes('victor-soussan')
  const actualFilename = isVictorPortrait && isDark ? 'victor_soussan_dark.webp' : filename
  const cleanFilename = actualFilename.split('/').pop() || actualFilename
  const [tryPeople, setTryPeople] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imagePath = tryPeople ? `/images/people/${cleanFilename}` : `/images/${cleanFilename}`

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {!hasError ? (
        <img
          loading="lazy"
          src={imagePath}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => {
            if (tryPeople) {
              setTryPeople(false)
            } else {
              setHasError(true)
            }
          }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold tracking-wider">
          {getInitials(alt)}
        </div>
      )}
    </div>
  )
}

export default Avatar
