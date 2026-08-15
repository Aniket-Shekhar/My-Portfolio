import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 overflow-hidden text-[var(--text-nav)] font-semibold uppercase tracking-[var(--tracking-nav)]">
      <span className="inline-block text-sheen">{children}</span>
    </p>
  )
}
