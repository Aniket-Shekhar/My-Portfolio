import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)] text-[var(--color-saffron-spark)]">
      {children}
    </p>
  )
}
