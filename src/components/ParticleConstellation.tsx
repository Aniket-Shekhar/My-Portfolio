import { useEffect, useRef, type MutableRefObject } from 'react'

const MONO = ['#ffffff', '#b8b8b8', '#9a9a9a', '#ffffff', '#b8b8b8']

type Particle = {
  x: number
  y: number
  homeX: number
  homeY: number
  tx: number
  ty: number
  size: number
  color: string
  opacity: number
  phase: number
  ambient: boolean
  seedX: number
  seedY: number
}

type Props = {
  dissolveRef?: MutableRefObject<number>
  introProgressRef?: MutableRefObject<number>
  sparse?: boolean
}

function inBrainCloud(nx: number, ny: number) {
  const left = Math.hypot(nx + 0.35, ny - 0.05) < 0.42
  const right = Math.hypot(nx - 0.32, ny - 0.02) < 0.38
  const center = Math.hypot(nx, ny + 0.12) < 0.35
  const stem = Math.abs(nx) < 0.12 && ny > 0.15 && ny < 0.55
  return left || right || center || stem
}

function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = []
  const cx = width * 0.62
  const cy = height * 0.48
  const scale = Math.min(width, height) * 0.38

  let attempts = 0
  while (particles.filter((p) => !p.ambient).length < Math.floor(count * 0.55) && attempts < count * 20) {
    attempts += 1
    const nx = (Math.random() - 0.5) * 1.1
    const ny = (Math.random() - 0.5) * 1.1
    if (!inBrainCloud(nx, ny)) continue
    const hx = cx + nx * scale
    const hy = cy + ny * scale
    particles.push({
      x: hx,
      y: hy,
      homeX: hx,
      homeY: hy,
      tx: nx,
      ty: ny,
      size: 1 + Math.random() * 1.5,
      color: MONO[Math.floor(Math.random() * MONO.length)]!,
      opacity: 0.35 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      ambient: false,
      seedX: Math.random() * width,
      seedY: Math.random() * height,
    })
  }

  while (particles.length < count) {
    const hx = Math.random() * width
    const hy = Math.random() * height
    particles.push({
      x: hx,
      y: hy,
      homeX: hx,
      homeY: hy,
      tx: 0,
      ty: 0,
      size: 0.8 + Math.random(),
      color: MONO[Math.floor(Math.random() * MONO.length)]!,
      opacity: 0.06 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2,
      ambient: true,
      seedX: hx,
      seedY: hy,
    })
  }

  return particles
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha: number
) {
  const h = size * 1.2
  ctx.save()
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = Math.max(0.6, size * 0.35)
  ctx.beginPath()
  ctx.moveTo(x, y - h)
  ctx.lineTo(x + size, y + h * 0.6)
  ctx.lineTo(x - size, y + h * 0.6)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

function drawGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, alpha: number) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
  g.addColorStop(0, `rgba(255,255,255,${alpha * 0.12})`)
  g.addColorStop(0.4, `rgba(74,74,74,${alpha * 0.06})`)
  g.addColorStop(0.75, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)
}

export function ParticleConstellation({ dissolveRef, introProgressRef, sparse = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let w = 0
    let h = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const mobile = w < 768
      let count = mobile ? 450 : w < 1024 ? 900 : 1400
      if (sparse) count = Math.floor(count * 0.22)
      particles = createParticles(w, h, count)
    }

    resize()
    window.addEventListener('resize', resize)

    const tick = (time: number) => {
      if (!visibleRef.current && !reduced) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      ctx.clearRect(0, 0, w, h)
      const t = time * 0.001
      const dissolve = dissolveRef?.current ?? 0
      const intro = introProgressRef?.current ?? 1
      const spread = dissolve * 140
      const cx = w * 0.62
      const cy = h * 0.48
      const glowRadius = Math.min(w, h) * 0.35

      if (!sparse) {
        drawGlow(ctx, cx, cy, glowRadius, 1 - dissolve * 0.6)
      }

      for (const p of particles) {
        const assemble = Math.min(1, intro)
        let x = p.seedX + (p.homeX - p.seedX) * assemble
        let y = p.seedY + (p.homeY - p.seedY) * assemble

        if (!p.ambient) {
          x += p.tx * spread
          y += p.ty * spread
        }

        if (!reduced && visibleRef.current) {
          const drift = p.ambient ? 3 : 8
          x += Math.sin(t + p.phase) * drift * 0.03
          y += Math.cos(t * 0.8 + p.phase) * drift * 0.03
        }

        const fade = p.ambient ? 1 - dissolve * 0.92 : 1 - dissolve * 0.75
        const twinkle = reduced ? 1 : 0.85 + Math.sin(t * 2 + p.phase) * 0.15
        drawTriangle(ctx, x, y, p.size, p.color, p.opacity * twinkle * Math.max(0, fade) * assemble)
      }

      if (!reduced) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    if (reduced) {
      if (introProgressRef) introProgressRef.current = 1
      tick(0)
    } else {
      frameRef.current = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      cancelAnimationFrame(frameRef.current)
    }
  }, [dissolveRef, introProgressRef, sparse])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
