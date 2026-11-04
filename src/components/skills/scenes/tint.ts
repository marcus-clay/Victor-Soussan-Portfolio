'use client'

import { createContext } from 'react'

/**
 * When a scene is drawn for a card that wants a coloured stage (the Resources), the card provides the hue here and
 * StillStage paints its ground with it. Without a provider (the skill pictures) the ground stays the pale neutral
 * gradient, so nothing changes for them.
 */
export const StillTintContext = createContext<{ hex: string; soft: string; ground?: readonly [string, string, string]; on?: string } | null>(null)
