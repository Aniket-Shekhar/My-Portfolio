import { motion } from 'framer-motion'
import { SectionHeader } from '../SectionHeader'
import { Tag } from '../Tag'
import { Section } from '../Section'
import { site } from '../../content'
import { staggerContainer, staggerItem } from '../../lib/motion'

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto grid max-w-[var(--width-content)] gap-10 md:grid-cols-2 md:gap-16">
        <SectionHeader label={site.about.label} headline={site.about.headline} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-8"
        >
          <motion.p
            variants={staggerItem}
            className="max-w-prose text-[var(--text-body)] font-extralight text-[var(--color-white)]"
          >
            {site.about.body}
          </motion.p>
          <motion.ul variants={staggerItem} className="flex flex-wrap gap-2">
            {site.about.skills.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </Section>
  )
}
