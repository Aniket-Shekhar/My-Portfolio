import { useEffect, useRef, type MutableRefObject } from 'react'

const ACCENTS = [
  '#8052ff',
  '#f0b429',
  '#1a9e8f',
  '#d946ef',
  '#38bdf8',
]

type Particle = {
  x: number
  y: number
  tx: number
  ty: number
  size: number
  color: string
  opacity: number
  phase: number
  ambient: boolean
}

type Props = {
  dissolveRef?: MutableRefObject<number>
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
    particles.push({
      x: cx + nx * scale,
      y: cy + ny * scale,
      tx: nx,
      ty: ny,
      size: 1 + Math.random() * 1.5,
      color: ACCENTS[Math.floor(Math.random() * ACCENTS.length)]!,
      opacity: 0.35 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      ambient: false,
    })
  }

  while (particles.length < count) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      tx: 0,
      ty: 0,
      size: 0.8 + Math.random(),
      color: ACCENTS[Math.floor(Math.random() * ACCENTS.length)]!,
      opacity: 0.08 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      ambient: true,
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

export function ParticleConstellation({ dissolveRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let w = 0
    let h = 0

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
      const count = mobile ? 450 : w < 1024 ? 900 : 1400
      particles = createParticles(w, h, count)
    }

    resize()
    window.addEventListener('resize', resize)

    const tick = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      const t = time * 0.001
      const dissolve = dissolveRef?.current ?? 0
      const spread = dissolve * 140

      for (const p of particles) {
        let x = p.x
        let y = p.y

        if (!p.ambient) {
          x += p.tx * spread
          y += p.ty * spread
        }

        if (!reduced) {
          const drift = p.ambient ? 4 : 10
          x += Math.sin(t + p.phase) * drift * 0.03
          y += Math.cos(t * 0.8 + p.phase) * drift * 0.03
        }

        const fade = p.ambient ? 1 - dissolve * 0.92 : 1 - dissolve * 0.75
        const twinkle = reduced ? 1 : 0.85 + Math.sin(t * 2 + p.phase) * 0.15
        drawTriangle(ctx, x, y, p.size, p.color, p.opacity * twinkle * Math.max(0, fade))
      }

      if (!reduced) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    if (reduced) {
      tick(0)
    } else {
      frameRef.current = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [dissolveRef])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
