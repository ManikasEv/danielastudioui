import { useMemo } from 'react'
import { SECTIONS } from '../data/sections'
import { useScrollJourney } from '../hooks/useScrollJourney'
import { useI18n } from '../i18n/LanguageContext'
import { useLenis } from './SmoothScroll'
import SectionIcon from './SectionIcon'

/** Icon box size (px) — keep in sync with size-9 */
const ICON = 36
/** Gap between icons (px) — longer segments on the path */
const GAP = 40
/** Distance between icon centers */
const STEP = ICON + GAP
/** SVG / rail width to fit zigzag */
const RAIL_W = 72
/** Horizontal offset from center for zigzag */
const ZIG = 16

function buildSnakePath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    const midY = (a.y + b.y) / 2
    // Soft S-curve between staggered nodes
    d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`
  }
  return d
}

export default function JourneyMap() {
  const { t } = useI18n()
  const ctx = useLenis()
  const lenisRef = ctx?.lenisRef
  const ready = ctx?.ready ?? 0
  const { activeIndex, desktopFillRef, mobileFillRef, mobileTrackRef } =
    useScrollJourney(lenisRef, ready)

  const count = SECTIONS.length
  const svgHeight = ICON + (count - 1) * STEP

  const nodes = useMemo(
    () =>
      SECTIONS.map((section, i) => {
        const x = RAIL_W / 2 + (i % 2 === 0 ? -ZIG : ZIG)
        const y = ICON / 2 + i * STEP
        return { ...section, x, y, i }
      }),
    [],
  )

  const pathD = useMemo(
    () => buildSnakePath(nodes.map((n) => ({ x: n.x, y: n.y }))),
    [nodes],
  )

  return (
    <>
      <aside
        className="pointer-events-none fixed top-1/2 right-3 z-50 hidden max-h-[min(760px,88vh)] -translate-y-1/2 lg:right-5 lg:block xl:right-7"
        aria-label={t('journey.aria')}
      >
        <div
          className="pointer-events-auto relative"
          style={{ width: RAIL_W, height: svgHeight }}
        >
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={RAIL_W}
            height={svgHeight}
            viewBox={`0 0 ${RAIL_W} ${svgHeight}`}
            aria-hidden
          >
            {/* Grey base snake */}
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-line"
            />
            {/* Emerald paint along the same shape */}
            <path
              ref={desktopFillRef}
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald"
            />
          </svg>

          <ol className="relative z-10 m-0 list-none p-0">
            {nodes.map((node) => {
              const reached = node.i <= activeIndex
              const current = node.i === activeIndex
              const label = t(`journey.${node.id}`)

              return (
                <li
                  key={node.id}
                  className="absolute"
                  style={{
                    left: node.x - ICON / 2,
                    top: node.y - ICON / 2,
                    width: ICON,
                    height: ICON,
                  }}
                >
                  <a
                    href={`#${node.id}`}
                    title={label}
                    className={[
                      'group flex size-9 items-center justify-center rounded-full border transition-colors duration-200',
                      reached
                        ? 'border-emerald bg-emerald text-ink'
                        : 'border-line bg-ink/90 text-muted hover:border-muted',
                      current ? 'scale-110' : 'scale-100',
                    ].join(' ')}
                  >
                    <SectionIcon name={node.icon} className="size-4" />
                    <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded bg-ink-soft/95 px-2 py-1 font-body text-[10px] uppercase tracking-[0.16em] text-paper opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100">
                      {label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </aside>

      {/* Mobile: soft wave path under icons */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line/80 bg-ink/92 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden"
        aria-label={t('journey.aria')}
      >
        <div
          ref={mobileTrackRef}
          className="relative mx-auto flex max-w-md items-center justify-between px-1"
        >
          <svg
            className="pointer-events-none absolute inset-x-4 top-1/2 h-6 w-[calc(100%-2rem)] -translate-y-1/2 overflow-visible"
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 12 C 12 2, 20 22, 33 12 S 54 2, 66 12 S 88 22, 100 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-line"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div
            ref={mobileFillRef}
            className="pointer-events-none absolute top-1/2 h-0.5 origin-left -translate-y-1/2 bg-emerald will-change-transform"
            style={{ left: 0, width: 0, transform: 'scaleX(0)' }}
            aria-hidden
          />
          {SECTIONS.map((section, i) => {
            const reached = i <= activeIndex
            const label = t(`journey.${section.id}`)
            return (
              <a
                key={section.id}
                data-journey-icon
                href={`#${section.id}`}
                title={label}
                aria-label={label}
                className={[
                  'relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                  reached
                    ? 'border-emerald bg-emerald text-ink'
                    : 'border-line bg-ink-soft text-muted',
                ].join(' ')}
              >
                <SectionIcon name={section.icon} className="size-3.5" />
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}
