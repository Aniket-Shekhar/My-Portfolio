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
      className="relative grid gap-2 py-12 first:pt-0 md:grid-cols-[12rem_1fr] md:gap-8"
    >
      <span
        aria-hidden
        className="absolute left-[11.45rem] top-[1.35rem] hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-saffron-spark)] md:block"
      />
      <p className="text-[var(--text-caption)] text-[var(--color-ash-gray)]">{dates}</p>
      <div className="space-y-2">
        <h3 className="text-[var(--text-heading-xs)] font-normal text-[var(--color-white)]">
          {entry.role}
          <span className="text-[var(--color-silver-mist)]"> · {entry.company}</span>
        </h3>
        <p className="text-[var(--text-body)] font-extralight text-[var(--color-silver-mist)] max-w-prose">
          {entry.description}
        </p>
      </div>
    </motion.article>
  )
}
