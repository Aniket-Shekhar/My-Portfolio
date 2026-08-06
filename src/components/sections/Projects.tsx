import { useEffect, useState } from 'react'
import { SectionHeader } from '../SectionHeader'
import { ProjectCard } from '../ProjectCard'
import { site, type ProjectFromApi } from '../../content'
import { fetchJson } from '../../lib/api'

function LoadingState() {
  return (
    <p className="text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)]" aria-live="polite">
      Loading projects…
    </p>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<ProjectFromApi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJson<ProjectFromApi[]>('/api/projects')
      .then(setProjects)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      id="projects"
      className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)]"
    >
      <div className="mx-auto max-w-[var(--width-content)] px-6 md:px-8">
        <SectionHeader
          label={site.projects.label}
          headline={site.projects.headline}
          className="mb-12"
        />

        {loading ? <LoadingState /> : null}
        {error ? (
          <p className="text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)]">
            Could not load projects. Start the API server and run the seed script.
          </p>
        ) : null}
        {!loading && !error ? (
          <div className="scrollbar-none md:-mx-8 md:overflow-x-auto md:px-8 md:snap-x md:snap-mandatory">
            <div className="md:flex md:gap-20">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className="md:min-w-[min(100%,42rem)] md:snap-center md:shrink-0"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
