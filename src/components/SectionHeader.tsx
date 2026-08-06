import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { headlineReveal, labelSlide, sectionHeaderContainer } from '../lib/motion'

type Props = {
  label: string
  headline: string
  className?: string
  headlineClassName?: string
}

export function SectionHeader({ label, headline, className = '', headlineClassName = '' }: Props) {
  return (
    <motion.div
      className={className}
      variants={sectionHeaderContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div variants={labelSlide}>
        <SectionLabel>{label}</SectionLabel>
      </motion.div>
      <div className="overflow-hidden">
        <motion.h2
          variants={headlineReveal}
          className={
            headlineClassName ||
            'text-[clamp(2.5rem,5vw,4.875rem)] font-normal tracking-[var(--tracking-display)] text-[var(--color-white)]'
          }
        >
          {headline}
        </motion.h2>
      </div>
    </motion.div>
  )
}
