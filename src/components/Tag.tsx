import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-ash-gray)]/40 px-3 py-1 text-[var(--text-caption)] font-normal text-[var(--color-ash-gray)]">
      {children}
    </span>
  )
}
