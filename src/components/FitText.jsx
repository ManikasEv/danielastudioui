import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Scales font-size so the text fits on one line inside its container.
 * Recomputes on resize and when children change. Falls back to a slight
 * horizontal scale if even the minimum size still overflows.
 */
export default function FitText({
  as: Tag = 'h3',
  wrapper: Wrap = 'div',
  children,
  className = '',
  wrapperClassName = 'min-w-0 w-full overflow-hidden',
  min = 14,
  max = 48,
  style,
  ...rest
}) {
  const wrapRef = useRef(null)
  const textRef = useRef(null)
  const [fit, setFit] = useState({ size: max, scale: 1 })

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const text = textRef.current
    if (!wrap || !text) return

    let frame = 0

    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const available = wrap.clientWidth
        if (available < 8) return

        text.style.transform = 'none'
        text.style.fontSize = `${max}px`
        text.style.whiteSpace = 'nowrap'

        if (text.scrollWidth <= available) {
          setFit({ size: max, scale: 1 })
          return
        }

        let lo = min
        let hi = max
        let best = min

        while (lo <= hi) {
          const mid = Math.floor((lo + hi) / 2)
          text.style.fontSize = `${mid}px`
          if (text.scrollWidth <= available) {
            best = mid
            lo = mid + 1
          } else {
            hi = mid - 1
          }
        }

        text.style.fontSize = `${best}px`
        let scale = 1
        if (text.scrollWidth > available) {
          scale = Math.max(0.55, (available / text.scrollWidth) * 0.98)
        }

        setFit({ size: best, scale })
      })
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(wrap)
    document.fonts?.ready?.then?.(measure)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [children, min, max])

  return (
    <Wrap ref={wrapRef} className={wrapperClassName}>
      <Tag
        ref={textRef}
        className={className}
        style={{
          ...style,
          fontSize: fit.size,
          whiteSpace: 'nowrap',
          lineHeight: 1.05,
          display: 'inline-block',
          maxWidth: '100%',
          transform: fit.scale < 1 ? `scale(${fit.scale})` : undefined,
          transformOrigin: 'left center',
        }}
        {...rest}
      >
        {children}
      </Tag>
    </Wrap>
  )
}
