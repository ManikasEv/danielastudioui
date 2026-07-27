import { SECTIONS } from '../data/sections'
import { useScrollJourney } from '../hooks/useScrollJourney'
import { useI18n } from '../i18n/LanguageContext'
import { useLenis } from './SmoothScroll'
import SectionIcon from './SectionIcon'

/** Icon box size (px) — keep in sync with size-9 / w-9 h-9 */
const ICON = 36
/** Gap between icons (px) — keep in sync with gap-7 (1.75rem = 28px) */
const GAP = 28
/** Distance between icon centers */
const STEP = ICON + GAP

export default function JourneyMap() {
  const { t } = useI18n()
  const ctx = useLenis()
  const lenisRef = ctx?.lenisRef
  const ready = ctx?.ready ?? 0
  const { activeIndex, desktopFillRef, mobileFillRef, mobileTrackRef } =
    useScrollJourney(lenisRef, ready)

  const count = SECTIONS.length
  const trackStart = ICON / 2
  const trackEnd = trackStart + (count - 1) * STEP
  const svgHeight = trackEnd + ICON / 2

  return (
    <>
      {/* Desktop / large tablet: vertical rail — inset so it never clips */}
      <aside
        className="pointer-events-none fixed top-1/2 right-4 z-50 hidden max-h-[min(560px,70vh)] -translate-y-1/2 lg:right-6 lg:block xl:right-8"
        aria-label={t('journey.aria')}
      >
        <div className="pointer-events-auto relative flex w-11 flex-col items-center">
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto overflow-visible"
            width={ICON}
            height={svgHeight}
            viewBox={`0 0 ${ICON} ${svgHeight}`}
            aria-hidden
          >
            {/* Grey base */}
            <line
              x1={ICON / 2}
              y1={trackStart}
              x2={ICON / 2}
              y2={trackEnd}
              stroke="currentColor"
              strokeWidth="2"
              className="text-line"
            />
            {/* Emerald paint — dash offset set only via ref (not React style) */}
            <line
              ref={desktopFillRef}
              x1={ICON / 2}
              y1={trackStart}
              x2={ICON / 2}
              y2={trackEnd}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-emerald"
            />
          </svg>

          <ol
            className="relative z-10 flex flex-col items-center"
            style={{ gap: GAP }}
          >
            {SECTIONS.map((section, i) => {
              const reached = i <= activeIndex
              const current = i === activeIndex
              const label = t(`journey.${section.id}`)

              return (
                <li key={section.id} className="relative" style={{ width: ICON, height: ICON }}>
                  <a
                    href={`#${section.id}`}
                    title={label}
                    className={[
                      'group flex size-9 items-center justify-center rounded-full border transition-colors duration-200',
                      reached
                        ? 'border-emerald bg-emerald text-ink'
                        : 'border-line bg-ink/90 text-muted hover:border-muted',
                      current ? 'scale-110' : 'scale-100',
                    ].join(' ')}
                  >
                    <SectionIcon name={section.icon} className="size-4" />
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

      {/* Mobile / tablet: bottom rail with measured fill between icons */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line/80 bg-ink/92 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden"
        aria-label={t('journey.aria')}
      >
        <div
          ref={mobileTrackRef}
          className="relative mx-auto flex max-w-md items-center justify-between"
        >
          <div
            className="pointer-events-none absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-line"
            aria-hidden
          />
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
