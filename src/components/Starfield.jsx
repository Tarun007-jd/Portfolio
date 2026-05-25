import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let stars = [], w, h, mouseX = 0, mouseY = 0
    let animId

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = canvas.width = rect.width
      h = canvas.height = rect.height
      initStars()
    }

    function initStars() {
      const count = Math.floor((w * h) / 10000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * 1000,
        c: `rgba(${180 + Math.floor(Math.random() * 75)}, ${200 + Math.floor(Math.random() * 55)}, 255, ${Math.random() * 0.8 + 0.2})`,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      // Nebula glow
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.85, 0, w * 0.5, h * 0.85, Math.max(w, h) * 0.8)
      grad.addColorStop(0, 'rgba(124,110,245,0.05)')
      grad.addColorStop(0.5, 'rgba(0,212,255,0.03)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      stars.forEach(s => {
        const px = (mouseX - w / 2) * 0.0015 * s.z
        const py = (mouseY - h / 2) * 0.0015 * s.z
        const alpha = 0.4 + 0.6 * Math.sin((Date.now() + s.tw) * 0.0035)
        ctx.beginPath()
        ctx.arc(s.x - px, s.y - py, s.r * s.z, 0, Math.PI * 2)
        ctx.fillStyle = s.c.replace(/rgba\(([^)]+),\s*[\d.]+\)/, `rgba($1, ${alpha})`)
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', resize)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  )
}
