import { motion } from 'framer-motion'
import { Tag } from './Tag'
import type { ProjectFromApi } from '../content'
import { fadeUp } from '../lib/motion'

type Props = {
  project: ProjectFromApi
  index?: number
}

export function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px', amount: 0.35 }}
      variants={fadeUp}
      transition={{ delay: index * 0.08 }}
      className="grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12 first:pt-0"
    >
      {project.image ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[var(--radius-ui)] aspect-[16/10] bg-[var(--color-canvas)]"
        >
          <img src={project.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
      ) : null}
      <div className="flex flex-col gap-4">
        <h3 className="hover-dissolve w-fit text-[var(--text-heading-lg)] font-normal tracking-[var(--tracking-display)] text-[var(--color-white)]">
          {project.name}
        </h3>
        <p className="max-w-prose text-[var(--text-body)] font-extralight text-[var(--color-white)]">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.stack?.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
        {project.link ? (
          <ButtonLink href={project.link} />
        ) : null}
      </div>
    </motion.article>
  )
}

function ButtonLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover-scanline mt-2 w-fit text-[var(--text-body)] font-extralight text-[var(--color-silver-mist)] transition-colors hover:text-[var(--color-white)]"
    >
      View project →
    </a>
  )
}
