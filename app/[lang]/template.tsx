import type { ReactNode } from 'react'

// A template remounts on every navigation, so every route (home included) gets the same
// page-load transition: the content fades in (CSS `.page-in`, opacity only, 320ms). No
// page moves on load, and no page scrolls on load.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>
}
