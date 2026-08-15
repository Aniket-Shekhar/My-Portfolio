import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeader } from '../SectionHeader'
import { TimelineItem } from '../TimelineItem'
import { DataState } from '../DataState'
import { Section } from '../Section'
import { site, type ExperienceFromApi } from '../../content'
import { useApiData } from '../../hooks/useApiData'

export function Experience() {
  const { data: entries, loading, error, retry } = useApiData<ExperienceFromApi>('/api/experience')
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.35'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="experience" ref={sectionRef}>
      <div className="relative mx-auto max-w-[var(--width-content)]">
        <SectionHeader
          label={site.experience.label}
          headline={site.experience.headline}
          className="mb-10 md:mb-12"
        />

        <DataState loading={loading} error={error} onRetry={retry} skeletonRows={3}>
          <div className="relative md:pl-8">
            <motion.div
              aria-hidden
              className="absolute left-[11.45rem] top-0 hidden h-full w-px origin-top bg-[var(--color-hairline)] md:block"
              style={{ scaleY: lineScale }}
            />
            <div>
              {entries.map((entry, index) => (
                <TimelineItem key={entry._id} entry={entry} index={index} />
              ))}
            </div>
          </div>
        </DataState>
      </div>
    </Section>
  )
}
