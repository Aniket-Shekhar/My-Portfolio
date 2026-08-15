import { site } from '../content'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] py-10">
      <div className="mx-auto flex max-w-[var(--width-content)] flex-col gap-4 px-[var(--spacing-section-x)] text-[var(--text-caption)] text-[var(--color-ash-gray)] md:flex-row md:items-center md:justify-between">
        <p>{site.footer.copyright}</p>
        <div className="flex gap-6">
          <a
            href={site.contact.github}
            className="hover-scanline transition-colors hover:text-[var(--color-white)]"
          >
            GitHub
          </a>
          <a
            href={site.contact.linkedin}
            className="hover-scanline transition-colors hover:text-[var(--color-white)]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="hover-scanline transition-colors hover:text-[var(--color-white)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
