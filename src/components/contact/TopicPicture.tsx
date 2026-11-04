'use client'

import { StillTintContext } from '@/components/skills/scenes/tint'
import { TOPIC_SCENES } from './topic-scenes'

/**
 * One calm hue per topic, from the soft end of the palette of the resource pictures (the same lightness and saturation for
 * all: accent for the one element a scene is about, a pale tint for the container). Four neighbours, four families.
 */
const HUES: Record<string, { name: string; hex: string; soft: string; on: string }> = {
  'claude-code': { name: 'corail', hex: '#C87A56', soft: '#FFE9DE', on: '#FFFFFF' },
  'personal-os': { name: 'ambre', hex: '#AF8B37', soft: '#F8EDD8', on: '#FFFFFF' },
  'ai-prototype': { name: 'emeraude', hex: '#42A680', soft: '#DDF5E9', on: '#FFFFFF' },
  'figma-ds': { name: 'violet', hex: '#9284CE', soft: '#EEEBFF', on: '#FFFFFF' },
}

/**
 * The picture of a speaking card: the realistic Stageshow scene of its topic, small and quiet, in a light container tinted with the
 * topic's pale hue (a wash, mostly white) with room all around it, the scene itself drawn from its left edge. Grey and
 * white everywhere, the hue on one element. It plays on hover of the whole card (the card is marked `data-hover-scope`).
 */
export default function TopicPicture({ scene, lang, className = '' }: { scene: string; lang: 'en' | 'fr'; className?: string }) {
  const Scene = TOPIC_SCENES[scene]
  const hue = HUES[scene]
  if (!Scene || !hue) return null
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl p-5 ring-1 ring-inset ${className}`}
      style={{
        backgroundColor: `color-mix(in oklab, ${hue.soft} 55%, white)`,
        ['--tw-ring-color' as string]: `color-mix(in oklab, ${hue.hex} 16%, transparent)`,
      }}
    >
      <div className="still-bare relative aspect-[13/8] w-full">
        <StillTintContext.Provider value={hue}>
          <Scene lang={lang} a={hue} note="" />
        </StillTintContext.Provider>
      </div>
    </div>
  )
}
