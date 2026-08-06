import { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Button } from '../Button'
import { ParticleConstellation } from '../ParticleConstellation'
import { StaggerWords } from '../StaggerWords'
import { site } from '../../content'
import { fadeUp } from '../../lib/motion'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const dissolveRef = useRef(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    dissolveRef.current = v
  })

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -24])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden pt-28 pb-20 md:pt-32"
    >
      <div className="absolute inset-0">
        <ParticleConstellation dissolveRef={dissolveRef} />
      </div>

      <div className="relative mx-auto grid max-w-[var(--width-content)] gap-12 px-6 md:grid-cols-2 md:items-center md:px-8">
        <motion.div
          style={{ scale: headlineScale, y: headlineY }}
          className="z-10 max-w-xl origin-top-left"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mb-4 text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] text-[var(--color-saffron-spark)]"
          >
            {site.heroLabel}
          </motion.p>

          <StaggerWords
            as="h1"
            text={site.name}
            delay={0.2}
            className="text-[clamp(3rem,8vw,7.0625rem)] font-normal leading-[0.95] tracking-[var(--tracking-display)] text-[var(--color-white)]"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.55 }}
            className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-normal tracking-[var(--tracking-display)] text-[var(--color-silver-mist)]"
          >
            {site.role}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.7 }}
            className="mt-8 max-w-md text-[var(--text-body)] font-extralight text-[var(--color-white)]"
          >
            {site.heroSupporting}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.85 }}
            className="mt-10"
          >
            <Button
              variant="primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {site.heroCta}
            </Button>
          </motion.div>
        </motion.div>
        <div className="relative hidden min-h-[420px] md:block" aria-hidden />
      </div>
    </section>
  )
}
