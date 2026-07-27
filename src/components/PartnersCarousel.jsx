import { useEffect, useRef } from 'react'
import FitText from './FitText'

export default function PartnersCarousel({
  items,
  index,
  onIndexChange,
  t,
  labels,
}) {
  const touchX = useRef(null)
  const count = items.length
  const item = items[index] ?? items[0]

  useEffect(() => {
    if (index > count - 1) onIndexChange(0)
  }, [count, index, onIndexChange])

  if (!item || count === 0) return null

  const go = (dir) => {
    if (count < 2) return
    onIndexChange((index + dir + count) % count)
  }

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 48) return
    go(dx < 0 ? 1 : -1)
  }

  const name = t(`partners.items.${item.id}.name`)
  const role = t(`partners.items.${item.id}.role`)
  const body = t(`partners.items.${item.id}.body`)

  return (
    <div
      className="relative min-w-0 max-w-full overflow-hidden border border-line bg-ink-soft/40"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
    >
      <div className="grid min-w-0 lg:grid-cols-2">
        {/* Logo panel — left */}
        <div className="relative flex min-h-[280px] min-w-0 items-center justify-center overflow-hidden bg-ink px-6 py-12 sm:min-h-[360px] sm:px-8 lg:min-h-[420px]">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="block w-full max-w-sm transition hover:opacity-90"
            aria-label={name}
          >
            <img
              src={item.logo}
              alt={name}
              className="mx-auto h-auto w-full max-w-[280px] object-contain"
              loading="lazy"
            />
          </a>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-ink/30 max-lg:bg-gradient-to-t max-lg:from-transparent max-lg:to-ink/40" />
        </div>

        {/* Text — right */}
        <div className="relative flex min-w-0 flex-col justify-center px-4 py-8 sm:px-8 sm:py-10 lg:px-8 xl:px-10">
          <div className="mb-4 flex min-w-0 items-center justify-between gap-3">
            <p className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald">
              {role}
            </p>
            <p className="shrink-0 font-body text-[11px] tabular-nums tracking-[0.14em] text-muted">
              {index + 1} / {count}
            </p>
          </div>

          <FitText
            as="h3"
            min={18}
            max={44}
            className="font-display font-extrabold tracking-tight text-paper"
          >
            {name}
          </FitText>
          <p className="mt-5 max-w-md break-words leading-relaxed text-muted">
            {body}
          </p>

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-emerald pb-1 text-sm font-semibold uppercase tracking-[0.16em] text-paper transition hover:text-emerald"
            >
              {t('partners.visit')}
              <span aria-hidden className="text-emerald">
                →
              </span>
            </a>
          )}

          {count > 1 && (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex size-11 items-center justify-center border border-line text-paper transition hover:border-emerald hover:text-emerald"
                aria-label={labels.prev}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex size-11 items-center justify-center border border-line text-paper transition hover:border-emerald hover:text-emerald"
                aria-label={labels.next}
              >
                →
              </button>

              <div className="ml-2 flex flex-wrap gap-1.5">
                {items.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`${labels.slide} ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => onIndexChange(i)}
                    className={[
                      'h-1.5 transition-all',
                      i === index
                        ? 'w-7 bg-emerald'
                        : 'w-1.5 bg-line hover:bg-muted',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
