import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeader } from '../SectionHeader'
import { TimelineItem } from '../TimelineItem'
import { site, type ExperienceFromApi } from '../../content'
import { fetchJson } from '../../lib/api'

export function Experience() {
  const [entries, setEntries] = useState<ExperienceFromApi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.4'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    fetchJson<ExperienceFromApi[]>('/api/experience')
      .then(setEntries)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)]"
    >
      <div className="relative mx-auto max-w-[var(--width-content)] px-6 md:px-8">
        <SectionHeader
          label={site.experience.label}
          headline={site.experience.headline}
          className="mb-12"
        />

        {loading ? (
          <p className="text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)]" aria-live="polite">
            Loading experience…
          </p>
        ) : null}
        {error ? (
          <p className="text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)]">
            Could not load experience. Start the API server and run the seed script.
          </p>
        ) : null}
        {!loading && !error ? (
          <div className="relative md:pl-8">
            <motion.div
              aria-hidden
              className="absolute left-[11.5rem] top-0 hidden h-full w-px origin-top bg-[var(--color-ash-gray)]/35 md:block"
              style={{ scaleY: lineScale }}
            />
            <div>
              {entries.map((entry, index) => (
                <TimelineItem key={entry._id} entry={entry} index={index} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
