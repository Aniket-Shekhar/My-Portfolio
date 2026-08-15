import { useEffect, useRef, type MutableRefObject } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Button } from '../Button'
import { ParticleConstellation } from '../ParticleConstellation'
import { PixelHeroVideo } from '../PixelHeroVideo'
import { StaggerWords } from '../StaggerWords'
import { Section } from '../Section'
import { site } from '../../content'
import { fadeUp } from '../../lib/motion'

type Props = {
  introProgressRef: MutableRefObject<number>
}

export function Hero({ introProgressRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const dissolveRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    dissolveRef.current = v
  })

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -16])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      introProgressRef.current = 1
      return
    }

    const start = performance.now()
    const duration = 800

    const animate = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      introProgressRef.current = p
      if (p < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [introProgressRef])

  return (
    <Section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden pt-[calc(var(--nav-height)+2rem)] pb-16 md:pb-20"
    >
      <div className="absolute inset-0">
        <PixelHeroVideo />
        <ParticleConstellation dissolveRef={dissolveRef} introProgressRef={introProgressRef} />
      </div>

      <div className="relative mx-auto grid max-w-[var(--width-content)] gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          style={{ scale: headlineScale, y: headlineY }}
          className="z-10 flex max-w-xl flex-col gap-6 origin-top-left"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)]"
          >
            <span className="text-sheen">{site.heroLabel}</span>
          </motion.p>

          <StaggerWords
            as="h1"
            text={site.name}
            delay={0.25}
            className="text-[clamp(3rem,8vw,7.0625rem)] font-normal leading-[1.05] tracking-[var(--tracking-display)] text-[var(--color-white)]"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.55 }}
            className="text-[clamp(1.25rem,3vw,2.25rem)] font-normal leading-snug tracking-[var(--tracking-display)] text-[var(--color-silver-mist)]"
          >
            {site.role}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.68 }}
            className="max-w-md text-[var(--text-body)] font-extralight leading-relaxed text-[var(--color-white)]"
          >
            {site.heroSupporting}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.82 }}
            className="pt-2"
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
    </Section>
  )
}
