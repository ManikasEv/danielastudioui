import { useEffect, useRef } from 'react'
import FitText from './FitText'

export default function PartnersCarousel({
  items,
  index,
  onIndexChange,
  t,
  labels,
  mediaLeft = true,
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
      className="relative min-w-0 max-w-full overflow-hidden bg-ink-soft/40"
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
        <div
          className={[
            'relative flex min-h-[48vh] min-w-0 items-center justify-center overflow-hidden bg-ink px-6 py-12 sm:min-h-[55vh] sm:px-8 lg:min-h-[70vh]',
            'order-1',
            mediaLeft ? 'lg:order-1' : 'lg:order-2',
          ].join(' ')}
        >
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

        <div
          className={[
            'section-copy order-2 !min-h-0 lg:!min-h-[70vh]',
            mediaLeft ? 'lg:order-2' : 'lg:order-1',
          ].join(' ')}
        >
          <div className="w-full min-w-0">
            <div className="mb-5 flex min-w-0 items-center justify-between gap-3 sm:mb-6">
              <p className="section-tag min-w-0 truncate">{role}</p>
              <p className="section-meta shrink-0">
                {index + 1} / {count}
              </p>
            </div>

            <FitText
              as="h3"
              min={28}
              max={56}
              className="font-display font-extrabold tracking-tight text-paper"
            >
              {name}
            </FitText>
            <p className="section-body !mt-5 sm:!mt-6">{body}</p>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="section-cta"
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
                  className="inline-flex size-12 items-center justify-center border border-line text-lg text-paper transition hover:border-emerald hover:text-emerald"
                  aria-label={labels.prev}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="inline-flex size-12 items-center justify-center border border-line text-lg text-paper transition hover:border-emerald hover:text-emerald"
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
    </div>
  )
}
