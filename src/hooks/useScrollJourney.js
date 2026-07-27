import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../data/sections'

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function sectionTop(id) {
  const el = document.getElementById(id)
  if (!el) return 0
  return el.getBoundingClientRect().top + window.scrollY
}

/**
 * Scroll-linked journey paint via DOM refs (never reset by React re-renders).
 */
export function useScrollJourney(lenisRef, ready = 0) {
  const [activeIndex, setActiveIndex] = useState(0)
  const desktopFillRef = useRef(null)
  const mobileFillRef = useRef(null)
  const mobileTrackRef = useRef(null)
  const positionsRef = useRef([])
  const activeRef = useRef(0)
  const trackLenRef = useRef(0)

  useEffect(() => {
    let frame = 0
    let queued = false
    let trail = 0

    const cachePositions = () => {
      positionsRef.current = SECTIONS.map((s) => sectionTop(s.id))
    }

    const paintDesktop = (overall) => {
      const desk = desktopFillRef.current
      if (!desk) return
      const len = trackLenRef.current
      if (!len) return
      desk.style.strokeDasharray = `${len}`
      desk.style.strokeDashoffset = `${len * (1 - overall)}`
    }

    const paintMobile = (overall) => {
      const mobile = mobileFillRef.current
      const track = mobileTrackRef.current
      if (!mobile || !track) return
      const nav = track.closest('nav')
      if (nav && getComputedStyle(nav).display === 'none') return
      const icons = track.querySelectorAll('[data-journey-icon]')
      if (icons.length < 2) return
      const trackBox = track.getBoundingClientRect()
      const firstBox = icons[0].getBoundingClientRect()
      const lastBox = icons[icons.length - 1].getBoundingClientRect()
      const start = firstBox.left + firstBox.width / 2 - trackBox.left
      const end = lastBox.left + lastBox.width / 2 - trackBox.left
      const width = Math.max(end - start, 0)
      mobile.style.left = `${start}px`
      mobile.style.width = `${width}px`
      mobile.style.transform = `scaleX(${overall})`
    }

    const apply = () => {
      queued = false
      const positions = positionsRef.current
      if (positions.length < 2) return

      const first = positions[0]
      const last = positions[positions.length - 1]
      const span = last - first
      if (span < 80) {
        // Layout not ready — skip (don't clobber a good paint with 0)
        return
      }

      const lenis = lenisRef?.current
      const scrollY = Math.max(
        window.scrollY,
        typeof lenis?.scroll === 'number' ? lenis.scroll : 0,
      )
      // 0 at page top, 1 when the last section top reaches the viewport top
      const overall = clamp(scrollY / span, 0, 1)

      const lastIndex = positions.length - 1
      let active = 0
      for (let i = 0; i < positions.length; i++) {
        if (scrollY + 8 >= positions[i]) active = i
      }
      if (overall >= 0.98) active = lastIndex
      if (scrollY < 8) active = 0

      paintDesktop(overall)
      paintMobile(overall)

      if (active !== activeRef.current) {
        activeRef.current = active
        setActiveIndex(active)
      }
    }

    const requestApply = () => {
      if (queued) return
      queued = true
      frame = requestAnimationFrame(apply)
    }

    const onScroll = () => {
      requestApply()
      window.clearTimeout(trail)
      trail = window.setTimeout(requestApply, 100)
    }

    const measureDesktopTrack = () => {
      const desk = desktopFillRef.current
      if (!desk) return
      try {
        const len = desk.getTotalLength()
        if (len > 0) trackLenRef.current = len
      } catch {
        // not mounted
      }
    }

    cachePositions()
    measureDesktopTrack()
    apply()

    const onResize = () => {
      cachePositions()
      measureDesktopTrack()
      requestApply()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const lenis = lenisRef?.current
    const unsubLenis = lenis ? lenis.on('scroll', onScroll) : null

    const ro = new ResizeObserver(() => {
      cachePositions()
      measureDesktopTrack()
      requestApply()
    })
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) ro.observe(el)
    })

    const t1 = window.setTimeout(onResize, 120)
    const t2 = window.setTimeout(onResize, 700)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(trail)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScroll)
      window.removeEventListener('resize', onResize)
      if (typeof unsubLenis === 'function') unsubLenis()
      ro.disconnect()
    }
  }, [lenisRef, ready])

  return {
    activeIndex,
    desktopFillRef,
    mobileFillRef,
    mobileTrackRef,
  }
}
