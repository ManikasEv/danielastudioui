import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Real 360° viewer for EQUIRECTANGULAR panorama video or image.
 * Drag to look around. Does not stretch normal photos — only use true 360 media.
 */
export default function Panorama360({
  src,
  alt = '',
  hint = 'Drag to look around',
  className = '',
  isVideo = true,
}) {
  const mountRef = useRef(null)
  const [hintVisible, setHintVisible] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !src) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = mount.clientWidth || 640
    let height = mount.clientHeight || 480
    if (height < 120) height = 420

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
    camera.position.set(0, 0, 0.1)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.touchAction = 'none'
    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.setAttribute('aria-label', alt)
    mount.appendChild(renderer.domElement)

    // Sphere mapped with equirectangular media (viewed from inside)
    const geometry = new THREE.SphereGeometry(500, 64, 40)
    geometry.scale(-1, 1, 1)

    let material
    let mesh
    let videoEl
    let texture
    let disposed = false

    const lon = { current: 0 }
    const lat = { current: 0 }
    const targetLon = { current: 0 }
    const targetLat = { current: 0 }
    const dragging = { current: false }
    const last = { current: { x: 0, y: 0 } }
    const idle = { current: true }
    let frame = 0

    const finishSetup = (map) => {
      if (disposed) return
      texture = map
      if ('colorSpace' in texture) texture.colorSpace = THREE.SRGBColorSpace
      material = new THREE.MeshBasicMaterial({ map: texture })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      setReady(true)
    }

    if (isVideo) {
      videoEl = document.createElement('video')
      videoEl.src = src
      videoEl.crossOrigin = 'anonymous'
      videoEl.loop = true
      videoEl.muted = true
      videoEl.playsInline = true
      videoEl.setAttribute('playsinline', '')
      videoEl.preload = 'auto'
      const onReady = () => {
        const vt = new THREE.VideoTexture(videoEl)
        finishSetup(vt)
        videoEl.play().catch(() => {})
      }
      videoEl.addEventListener('loadeddata', onReady, { once: true })
      videoEl.load()
    } else {
      new THREE.TextureLoader().load(
        src,
        (tex) => finishSetup(tex),
        undefined,
        () => setReady(true),
      )
    }

    const updateCamera = () => {
      const phi = THREE.MathUtils.degToRad(90 - lat.current)
      const theta = THREE.MathUtils.degToRad(lon.current)
      camera.lookAt(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      )
    }

    const onPointerDown = (e) => {
      dragging.current = true
      idle.current = false
      setHintVisible(false)
      const p = e.touches ? e.touches[0] : e
      last.current = { x: p.clientX, y: p.clientY }
      renderer.domElement.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
      if (!dragging.current) return
      const p = e.touches ? e.touches[0] : e
      const dx = p.clientX - last.current.x
      const dy = p.clientY - last.current.y
      last.current = { x: p.clientX, y: p.clientY }
      targetLon.current -= dx * 0.18
      targetLat.current = THREE.MathUtils.clamp(
        targetLat.current + dy * 0.14,
        -45,
        45,
      )
    }

    const onPointerUp = () => {
      dragging.current = false
      renderer.domElement.style.cursor = 'grab'
      window.setTimeout(() => {
        idle.current = true
      }, 2000)
    }

    const el = renderer.domElement
    el.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    el.addEventListener('touchstart', onPointerDown, { passive: true })
    el.addEventListener('touchmove', onPointerMove, { passive: true })
    el.addEventListener('touchend', onPointerUp)

    const onResize = () => {
      width = mount.clientWidth || width
      height = mount.clientHeight || height
      if (height < 120) height = 420
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (idle.current && !dragging.current && !reduce) {
        targetLon.current += 0.08
      }
      lon.current += (targetLon.current - lon.current) * 0.12
      lat.current += (targetLat.current - lat.current) * 0.12
      updateCamera()
      if (texture?.isVideoTexture) texture.needsUpdate = true
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      ro.disconnect()
      el.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      el.removeEventListener('touchstart', onPointerDown)
      el.removeEventListener('touchmove', onPointerMove)
      el.removeEventListener('touchend', onPointerUp)
      videoEl?.pause()
      geometry.dispose()
      material?.dispose()
      texture?.dispose()
      renderer.dispose()
      if (el.parentNode === mount) mount.removeChild(el)
    }
  }, [src, alt, isVideo])

  return (
    <div
      className={[
        'relative h-full min-h-[280px] overflow-hidden bg-ink select-none',
        className,
      ].join(' ')}
    >
      <div ref={mountRef} className="absolute inset-0" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted">
          …
        </div>
      )}
      {hintVisible && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 border border-emerald/40 bg-ink/80 px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald backdrop-blur-sm">
          {hint}
        </p>
      )}
    </div>
  )
}
