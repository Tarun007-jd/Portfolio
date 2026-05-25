import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver-based scroll reveal hook.
 * Returns a ref to attach to an element and a boolean indicating if it's visible.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el) // fire once
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
