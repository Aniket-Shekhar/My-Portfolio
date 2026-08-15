import { motion } from 'framer-motion'
import type { ExperienceFromApi } from '../content'
import { fadeUp } from '../lib/motion'

type Props = {
  entry: ExperienceFromApi
  index?: number
}

export function TimelineItem({ entry, index = 0 }: Props) {
  const dates = `${entry.startDate} — ${entry.endDate}`

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      transition={{ delay: index * 0.1 }}
      className="relative grid gap-2 py-10 first:pt-0 md:grid-cols-[12rem_1fr] md:gap-8 md:py-12"
    >
      <motion.span
        aria-hidden
        initial={{ scale: 0.5, backgroundColor: '#4a4a4a' }}
        whileInView={{ scale: 1, backgroundColor: '#ffffff' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="absolute left-[11.45rem] top-[1.35rem] hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full md:block"
      />
      <p className="text-[var(--text-caption)] text-[var(--color-ash-gray)]">{dates}</p>
      <div className="space-y-2">
        <h3 className="text-[var(--text-heading-xs)] font-normal text-[var(--color-white)]">
          {entry.role}
          <span className="text-[var(--color-silver-mist)]"> · {entry.company}</span>
        </h3>
        <p className="max-w-prose text-[var(--text-body)] font-extralight text-[var(--color-silver-mist)]">
          {entry.description}
        </p>
      </div>
    </motion.article>
  )
}
