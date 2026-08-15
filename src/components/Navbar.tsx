import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import { Button } from './Button'
import { site } from '../content'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [active, setActive] = useState('#hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'experience', 'contact']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-hairline)] bg-[rgba(0,0,0,0.85)] backdrop-blur-[8px]">
      <div className="mx-auto flex h-[var(--nav-height)] max-w-[var(--width-content)] items-center justify-between gap-6 px-[var(--spacing-section-x)]">
        <button type="button" onClick={() => scrollTo('#hero')} className="shrink-0">
          <Logo compact />
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className={`hover-scanline relative pb-1 text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] transition-colors ${
                active === link.href
                  ? 'text-[var(--color-white)]'
                  : 'text-[var(--color-ash-gray)] hover:text-[var(--color-white)]'
              }`}
            >
              {link.label}
              {active === link.href ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-white)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="primary" onClick={() => scrollTo('#contact')}>
            {site.navCta}
          </Button>
        </div>

        <button
          type="button"
          className="hover-scanline md:hidden text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] text-[var(--color-white)]"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--color-hairline)] bg-[rgba(0,0,0,0.95)] md:hidden"
          >
            <ul className="flex flex-col gap-4 px-[var(--spacing-section-x)] py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="hover-scanline text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] text-[var(--color-ash-gray)]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button variant="primary" onClick={() => scrollTo('#contact')}>
                  {site.navCta}
                </Button>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
