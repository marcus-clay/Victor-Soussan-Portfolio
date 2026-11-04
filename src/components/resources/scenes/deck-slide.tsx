'use client'

import React from 'react'
import { Bar } from '@/components/stageshow/kit'
import './deck-slide.css'

/**
 * The face of a slide shared by the two deck pictures, so that they stay one family: a section kicker (the accent
 * bar and the label), a title, two filler lines. With `ghost` it is the same slide drawn as filler only (no words),
 * for the slides that are not the one the picture is about. Sizes come from the parent through custom properties
 * (`--face-title`, `--face-kicker`, `--face-title-w`).
 */
export default function Face({ kicker, title, ghost }: { kicker?: string; title?: string; ghost?: boolean }) {
  return (
    <div className="sc-res-deck-face">
      <div className="kicker">
        <i />
        {ghost ? <Bar w={52} h={5} r={2.5} tone={2} /> : <span>{kicker}</span>}
      </div>
      {ghost ? (
        <div className="title ghost">
          <Bar w={150} h={10} r={5} tone={3} />
          <Bar w={96} h={10} r={5} tone={3} />
        </div>
      ) : (
        <div className="title">{title}</div>
      )}
      <div className="lines">
        <Bar w={ghost ? 110 : 120} h={6} r={3} tone={2} />
        <Bar w={ghost ? 76 : 84} h={6} r={3} tone={2} />
      </div>
    </div>
  )
}
