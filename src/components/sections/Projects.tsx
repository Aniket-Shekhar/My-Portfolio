import { SectionHeader } from '../SectionHeader'
import { ProjectCard } from '../ProjectCard'
import { DataState } from '../DataState'
import { Section } from '../Section'
import { site } from '../../content'
import { useApiData } from '../../hooks/useApiData'
import type { ProjectFromApi } from '../../content'

export function Projects() {
  const { data: projects, loading, error, retry } = useApiData<ProjectFromApi>('/api/projects')

  return (
    <Section id="projects">
      <div className="mx-auto max-w-[var(--width-content)]">
        <SectionHeader
          label={site.projects.label}
          headline={site.projects.headline}
          className="mb-10 md:mb-12"
        />

        <DataState loading={loading} error={error} onRetry={retry} skeletonRows={2}>
          <div className="scrollbar-none md:-mx-4 md:overflow-x-auto md:px-4 md:snap-x md:snap-mandatory">
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
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
        </DataState>
      </div>
    </Section>
  )
}
