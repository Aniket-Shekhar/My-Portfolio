import type { ReactNode } from 'react'
import { Button } from './Button'

type Props = {
  loading: boolean
  error: string | null
  onRetry: () => void
  skeletonRows?: number
  children: ReactNode
}

function SkeletonBlock() {
  return (
    <div className="space-y-4 py-8">
      <div className="skeleton-pulse h-8 w-2/3 max-w-md rounded bg-[var(--color-hairline)]" />
      <div className="skeleton-pulse h-4 w-full max-w-lg rounded bg-[var(--color-hairline)]" />
      <div className="skeleton-pulse h-4 w-5/6 max-w-md rounded bg-[var(--color-hairline)]" />
    </div>
  )
}

export function DataState({ loading, error, onRetry, skeletonRows = 2, children }: Props) {
  if (loading) {
    return (
      <div aria-live="polite" aria-busy="true">
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <SkeletonBlock key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-start gap-4 py-8" role="alert">
        <p className="text-[var(--text-body)] font-extralight text-[var(--color-silver-mist)]">
          Could not load content. The API may still be starting — try again.
        </p>
        <Button variant="ghost-outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
