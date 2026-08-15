import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTRO_KEY = 'portfolio-intro-seen'

type Props = {
  onComplete?: () => void
}

export function PageLoadIntro({ onComplete }: Props) {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !reduced && !sessionStorage.getItem(INTRO_KEY)
  })

  useEffect(() => {
    if (!show) {
      onComplete?.()
      return
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(INTRO_KEY, '1')
      setShow(false)
      onComplete?.()
    }, 850)

    return () => window.clearTimeout(timer)
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-[var(--color-canvas)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      ) : null}
    </AnimatePresence>
  )
}
