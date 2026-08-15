import { site } from '../content'

type Props = {
  compact?: boolean
}

export function Logo({ compact = false }: Props) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#9a9a9a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path fill="url(#logo-grad)" d="M14 2 L26 24 H2 Z" />
      </svg>
      <span
        className={`font-normal tracking-tight text-[var(--color-white)] transition-all duration-300 ${
          compact ? 'text-[var(--text-caption)]' : 'text-[var(--text-body)]'
        }`}
      >
        {site.initials}
      </span>
    </span>
  )
}
