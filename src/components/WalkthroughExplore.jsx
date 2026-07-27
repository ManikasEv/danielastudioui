import { useEffect, useRef, useState } from 'react'

/**
 * Interactive property walkthrough for a NORMAL video.
 * Drag left/right (or use the scrubber) to move through the space along the filmed path.
 * This is not free-roam 360 — that needs equirectangular 360 footage (see Panorama360).
 */
export default function WalkthroughExplore({
  src,
  alt = '',
  hint = 'Drag to move through the property',
  className = '',
}) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const onTime = () => {
      if (!video.duration) return
      setProgress(video.currentTime / video.duration)
    }
    const onMeta = () => setReady(true)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.muted = true
    video.playsInline = true
    video.pause()
    // Start near the beginning so first frame is clean
    video.currentTime = 0.05

    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [src])

  function scrubByDelta(dx, width) {
    const video = videoRef.current
    if (!video || !video.duration) return
    // Drag right = move forward through the property
    const delta = (dx / Math.max(width, 1)) * video.duration * 1.35
    video.currentTime = Math.min(
      video.duration - 0.05,
      Math.max(0, video.currentTime + delta),
    )
    setProgress(video.currentTime / video.duration)
  }

  function pointerDown(e) {
    dragging.current = true
    setHintVisible(false)
    const p = e.touches ? e.touches[0] : e
    lastX.current = p.clientX
    videoRef.current?.pause()
  }

  function pointerMove(e) {
    if (!dragging.current) return
    const p = e.touches ? e.touches[0] : e
    const dx = p.clientX - lastX.current
    lastX.current = p.clientX
    const width = wrapRef.current?.clientWidth || 600
    scrubByDelta(dx, width)
  }

  function pointerUp() {
    dragging.current = false
  }

  function togglePlay(e) {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    setHintVisible(false)
    if (video.paused) video.play()
    else video.pause()
  }

  function onScrubBar(e) {
    const video = videoRef.current
    const bar = e.currentTarget
    if (!video?.duration) return
    const rect = bar.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    video.pause()
    video.currentTime = ratio * video.duration
    setProgress(ratio)
    setHintVisible(false)
  }

  return (
    <div
      ref={wrapRef}
      className={[
        'relative h-full min-h-[280px] cursor-ew-resize overflow-hidden bg-ink select-none touch-none',
        className,
      ].join(' ')}
      onMouseDown={pointerDown}
      onMouseMove={pointerMove}
      onMouseUp={pointerUp}
      onMouseLeave={pointerUp}
      onTouchStart={pointerDown}
      onTouchMove={pointerMove}
      onTouchEnd={pointerUp}
      role="img"
      aria-label={alt}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 size-full object-cover"
        playsInline
        muted
        preload="auto"
        draggable={false}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted">
          …
        </div>
      )}

      {hintVisible && (
        <p className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 border border-emerald/40 bg-ink/80 px-4 py-2 text-center font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald backdrop-blur-sm">
          {hint}
        </p>
      )}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="flex size-10 shrink-0 items-center justify-center border border-emerald/50 bg-ink/80 text-sm text-emerald backdrop-blur-sm transition hover:bg-emerald hover:text-ink"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '❚❚' : '▶'}
          </button>

          <div
            className="relative h-2 flex-1 cursor-pointer rounded-full bg-line"
            onMouseDown={onScrubBar}
            onClick={onScrubBar}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="Walkthrough position"
            tabIndex={0}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-emerald"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-ink bg-emerald"
              style={{ left: `calc(${progress * 100}% - 7px)` }}
            />
          </div>
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted">
          {Math.round(progress * 100)}% through the property
        </p>
      </div>
    </div>
  )
}
