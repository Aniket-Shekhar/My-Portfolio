import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  href?: string
  children: ReactNode
}

export function Button({ variant = 'primary', href, children, className = '', ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center font-semibold text-[var(--text-nav)] uppercase tracking-[var(--tracking-nav)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-electric-iris)]'

  const styles =
    variant === 'primary'
      ? `${base} rounded-[var(--radius-ui)] bg-[var(--color-electric-iris)] px-6 py-3.5 text-[var(--color-white)] hover:brightness-110`
      : `${base} bg-transparent p-0 text-[var(--color-ash-gray)] hover:text-[var(--color-white)] normal-case tracking-normal font-normal text-[var(--text-body)]`

  if (href) {
    return (
      <a href={href} className={`${styles} ${className}`}>
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
