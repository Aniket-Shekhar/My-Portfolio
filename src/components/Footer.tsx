import { site } from '../content'

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-[var(--width-content)] flex-col gap-4 px-6 text-[var(--text-caption)] text-[var(--color-ash-gray)] md:flex-row md:items-center md:justify-between md:px-8">
        <p>{site.footer.copyright}</p>
        <div className="flex gap-6">
          <a href={site.contact.github} className="hover:text-[var(--color-white)] transition-colors">
            GitHub
          </a>
          <a href={site.contact.linkedin} className="hover:text-[var(--color-white)] transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${site.contact.email}`} className="hover:text-[var(--color-white)] transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
