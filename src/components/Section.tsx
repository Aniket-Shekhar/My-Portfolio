import { forwardRef, type ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
  className?: string
  divider?: boolean
}

export const Section = forwardRef<HTMLElement, Props>(function Section(
  { id, children, className = '', divider = true },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`px-[var(--spacing-section-x)] py-12 md:py-16 ${
        divider ? 'border-b border-[var(--color-hairline)]' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
})
