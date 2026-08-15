import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'ghost-outline'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  href?: string
  children: ReactNode
}

export function Button({ variant = 'primary', href, children, className = '', ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center font-semibold text-[var(--text-nav)] uppercase tracking-[var(--tracking-nav)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]'

  const styles =
    variant === 'primary'
      ? `${base} hover-dissolve rounded-[var(--radius-ui)] bg-[var(--color-white)] px-6 py-3.5 text-[var(--color-canvas)] hover:bg-[var(--color-silver-mist)]`
      : variant === 'ghost-outline'
        ? `${base} hover-scanline rounded-[var(--radius-ghost-btn)] border border-[var(--color-ash-gray)] bg-transparent px-5 py-2.5 text-[var(--color-white)] normal-case tracking-normal font-normal text-[var(--text-body)] hover:border-[var(--color-white)]`
        : `${base} hover-scanline bg-transparent p-0 text-[var(--color-ash-gray)] hover:text-[var(--color-white)] normal-case tracking-normal font-normal text-[var(--text-body)]`

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={`${styles} ${className}`}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={`${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}
