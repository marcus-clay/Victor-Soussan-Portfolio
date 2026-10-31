'use client'

/**
 * The tablet and the laptop of the PagesJaunes cover, brought to life over the hero loop (which animates the
 * phone). Laid onto each screen at the angle of the picture (quadMatrix), measured on the cover:
 * - Laptop: the route panel goes through its three modes, walking, car, public transport, as if the tabs were
 *   tapped; only the panel moves (the map stays the picture's), cross-fading through a 2px blur.
 * - Tablet: a search is typed into "Quoi, qui…", the search button presses, then the field clears.
 * One 9s cycle in CSS, restarted each time the loop shows. Coordinates in the 2200 × 1467 cover.
 */

import { quadMatrix } from '@/utils/quadMatrix'

const COVER = { w: 2200, h: 1467 }
const SHOT = { w: 2048, h: 1536 }
/** The laptop screen, from six landmarks of the route screen matched on the cover (residuals under 4px) */
const LAPTOP: [number, number][] = [[924, 221], [1761, 477], [1523, 1168], [688, 828]]
/** The part of the route screen the mockup shows: the panel (from x = 1405), below the status bar and the
 *  close button the mockup crops (from y = 175, measured by mapping the visible screen edge back) */
const PANEL_CLIP = `inset(${((175 / SHOT.h) * 100).toFixed(2)}% 0 ${((36 / SHOT.h) * 100).toFixed(2)}% ${((1405 / SHOT.w) * 100).toFixed(2)}%)`
const MODES = ['pieton', 'voiture', 'transports'].map((m) => `/images/pagesjaunes/pj_ipad_itineraire_${m}.webp`)
/** The white part of the tablet's search field, and the yellow button after it */
const FIELD: [number, number][] = [[861, 419], [1067, 421], [1066, 463], [859, 460]]
const BUTTON: [number, number][] = [[1067, 421], [1105, 422], [1102, 464], [1066, 463]]
const QUERY = 'Restaurant italien'

type Box = { x: number; y: number; w: number; h: number }

const toBox = (box: Box, pts: [number, number][]) =>
  pts.map(([x, y]) => [box.x + (x / COVER.w) * box.w, box.y + (y / COVER.h) * box.h] as [number, number])

function Projected({ box, corners, w, h, children }: { box: Box; corners: [number, number][]; w: number; h: number; children: React.ReactNode }) {
  return (
    <div className="absolute left-0 top-0 overflow-hidden" style={{ width: w, height: h, transformOrigin: '0 0', transform: quadMatrix(w, h, toBox(box, corners)) }}>
      {children}
    </div>
  )
}

export default function PagesJaunesScreens({ box, run }: { box: Box; run: number }) {
  return (
    <div key={run} aria-hidden="true" className="pj-screens pointer-events-none absolute inset-0">
      {/* Laptop: the panel of each mode, clipped to the panel, the first one being the picture's own */}
      <Projected box={box} corners={LAPTOP} w={SHOT.w} h={SHOT.h}>
        {MODES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="pj-mode absolute inset-0 h-full w-full"
            style={{ clipPath: PANEL_CLIP, ['--n' as string]: i }}
          />
        ))}
      </Projected>
      {/* Tablet: the query typed letter by letter with its caret, then the button pressed */}
      <Projected box={box} corners={FIELD} w={412} h={84}>
        <div className="absolute inset-0 flex items-center bg-white pl-[20px]">
          <span className="pj-type overflow-hidden whitespace-nowrap text-[38px] font-light leading-none tracking-[-0.01em] text-gray-700" style={{ ['--chars' as string]: QUERY.length }}>
            {QUERY}
          </span>
          <span className="pj-caret ml-[2px] h-[44px] w-[2.5px] bg-gray-700" />
        </div>
      </Projected>
      <Projected box={box} corners={BUTTON} w={76} h={84}>
        <div className="pj-press absolute inset-0 bg-black" />
      </Projected>
    </div>
  )
}
