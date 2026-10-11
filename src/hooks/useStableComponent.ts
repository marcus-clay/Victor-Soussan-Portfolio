import { useMemo, useRef, type FC } from 'react'

/**
 * Components declared inside another component's body get a new identity on every render,
 * so React unmounts and remounts their whole subtree (images, videos, entrance animations)
 * each time the parent state changes. This keeps one stable identity while still rendering
 * with the latest closure.
 */
export function useStableComponent<P extends object>(render: (props: P) => React.ReactElement | null): FC<P> {
  const latest = useRef(render)
  latest.current = render
  return useMemo(() => {
    const Stable: FC<P> = (props) => latest.current(props)
    return Stable
  }, [])
}
