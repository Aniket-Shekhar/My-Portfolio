const API_BASE = import.meta.env.VITE_API_URL ?? ''

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

export async function fetchJsonWithRetry<T>(
  path: string,
  init?: RequestInit,
  retries = 8,
  delayMs = 600
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await fetchJson<T>(path, init)
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Request failed')
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)))
      }
    }
  }

  throw lastError ?? new Error('Request failed')
}

export async function waitForApi(maxAttempts = 20, delayMs = 400): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      await fetchJson<{ ok: boolean }>('/api/health')
      return true
    } catch {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
  return false
}
