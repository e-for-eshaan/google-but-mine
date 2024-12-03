import { useEffect, RefObject, ReactNode } from 'react'

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  options?: {
    enabled?: boolean
    excludeRefs?: RefObject<HTMLElement | null>[]
  }
) {
  useEffect(() => {
    const { enabled = true, excludeRefs = [] } = options || {}

    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const isExcluded = excludeRefs.some(
        excludeRef =>
          excludeRef.current &&
          excludeRef.current.contains(event.target as Node)
      )

      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        isExcluded
      ) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, options])
}

export default useClickOutside