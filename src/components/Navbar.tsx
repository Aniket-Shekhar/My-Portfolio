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
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div
        className={`mx-auto flex max-w-[var(--width-content)] items-center justify-between gap-6 px-6 py-5 transition-[padding] duration-300 md:px-8 ${
          scrolled ? 'py-4' : ''
        }`}
      >
        <button type="button" onClick={() => scrollTo('#hero')} className="shrink-0">
          <Logo compact={scrolled} />
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className={`relative pb-1 text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] transition-colors ${
                active === link.href
                  ? 'text-[var(--color-white)]'
                  : 'text-[var(--color-ash-gray)] hover:text-[var(--color-white)]'
              }`}
            >
              {link.label}
              {active === link.href ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-saffron-spark)]"
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
          className="md:hidden text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] text-[var(--color-white)]"
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
            className="bg-[var(--color-canvas)] md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] text-[var(--color-ash-gray)]"
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
