import { useEffect, useRef } from 'react'

type Props = {
  className?: string
}

export function PixelHeroVideo({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const W = 80
    const H = 45
    canvas.width = W
    canvas.height = H

    const imageData = ctx.createImageData(W, H)
    const data = imageData.data
    let t = 0
    let visible = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const draw = () => {
      if (!visible || reduced) {
        if (reduced) {
          for (let i = 0; i < data.length; i += 4) {
            const v = 40 + Math.random() * 30
            data[i] = v
            data[i + 1] = v
            data[i + 2] = v
            data[i + 3] = 255
          }
          ctx.putImageData(imageData, 0, 0)
        }
        return
      }

      t += 0.04
      for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
          const i = (y * W + x) * 4
          const n =
            Math.sin(x * 0.15 + t) * 0.5 +
            Math.cos(y * 0.2 - t * 0.7) * 0.5 +
            Math.sin((x + y) * 0.08 + t * 1.2) * 0.35
          const v = Math.floor(30 + (n + 1.5) * 45)
          data[i] = v
          data[i + 1] = v
          data[i + 2] = v
          data[i + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
      frameRef.current = requestAnimationFrame(draw)
    }

    if (reduced) {
      draw()
    } else {
      frameRef.current = requestAnimationFrame(draw)
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{
        maskImage: 'var(--gradient-fade-edge)',
        WebkitMaskImage: 'var(--gradient-fade-edge)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="pixelated absolute inset-0 h-full w-full object-cover opacity-[0.22] contrast-125 grayscale"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}
