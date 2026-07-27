import { useEffect, useRef, useState } from 'react'
import FitText from './FitText'
import WalkthroughExplore from './WalkthroughExplore'
import Panorama360 from './Panorama360'

/**
 * Media + copy carousel. Only the active slide mounts heavy media (video / 360).
 */
export default function PortfolioCarousel({
  items,
  index,
  onIndexChange,
  t,
  hint,
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

  const title = t(`portfolio.items.${item.id}.title`)
  const body = t(`portfolio.items.${item.id}.body`)
  const tag = t(`portfolio.items.${item.id}.tag`)
  const mediaAlt = t(`portfolio.items.${item.id}.mediaAlt`)
  const host = item.url ? safeHost(item.url) : null

  return (
    <div
      className="relative min-w-0 max-w-full overflow-hidden"
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
            'relative min-h-[48vh] min-w-0 overflow-hidden bg-ink sm:min-h-[55vh] lg:min-h-[70vh]',
            'order-1',
            mediaLeft ? 'lg:order-1' : 'lg:order-2',
          ].join(' ')}
        >
          <SlideMedia
            key={item.id}
            item={item}
            alt={mediaAlt}
            hint={hint}
            visitLabel={labels.visit}
          />
        </div>

        <div
          className={[
            'section-copy order-2 !min-h-0 lg:!min-h-[70vh]',
            mediaLeft ? 'lg:order-2' : 'lg:order-1',
          ].join(' ')}
        >
          <div className="w-full min-w-0">
            <div className="mb-5 flex min-w-0 items-center justify-between gap-3 sm:mb-6">
              <p className="section-tag min-w-0 truncate">{tag}</p>
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
              {title}
            </FitText>
            {host && (
              <p className="mt-3 truncate font-body text-base tracking-wide text-emerald/90 sm:text-lg">
                {host}
              </p>
            )}
            <p className="section-body !mt-5 sm:!mt-6">{body}</p>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="section-cta"
              >
                {labels.visit}
                <span aria-hidden className="text-emerald">
                  →
                </span>
              </a>
            )}

            {count > 1 && (
              <div className="mt-10 flex min-w-0 flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="inline-flex size-12 shrink-0 items-center justify-center border border-line text-lg text-paper transition hover:border-emerald hover:text-emerald"
                  aria-label={labels.prev}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="inline-flex size-12 shrink-0 items-center justify-center border border-line text-lg text-paper transition hover:border-emerald hover:text-emerald"
                  aria-label={labels.next}
                >
                  →
                </button>

                <div className="flex min-w-0 flex-1 flex-wrap gap-1.5" role="tablist">
                  {items.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`${labels.slide} ${i + 1}`}
                      onClick={() => onIndexChange(i)}
                      className={[
                        'h-1.5 shrink-0 transition-all',
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

function SlideMedia({ item, alt, hint, visitLabel }) {
  if (item.type === 'walkthrough') {
    return (
      <WalkthroughExplore
        src={item.src}
        alt={alt}
        hint={hint}
        className="absolute inset-0 size-full"
      />
    )
  }

  if (item.type === 'pano360') {
    return (
      <Panorama360
        src={item.src}
        alt={alt}
        hint={hint}
        isVideo={item.isVideo !== false}
        className="absolute inset-0 size-full"
      />
    )
  }

  if (item.type === 'video') {
    return (
      <>
        <video
          className="absolute inset-0 size-full object-cover"
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
      </>
    )
  }

  if (item.type === 'site') {
    return <SitePreview item={item} alt={alt} visitLabel={visitLabel} />
  }

  return (
    <>
      <img
        src={item.src}
        alt={alt}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
    </>
  )
}

function SitePreview({ item, alt, visitLabel }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="absolute inset-0 flex min-w-0 flex-col overflow-hidden bg-gradient-to-br from-ink-soft to-ink p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex h-full w-full min-w-0 max-w-xl flex-1 flex-col overflow-hidden rounded-lg border border-line/80 bg-ink shadow-[0_20px_60px_rgb(0_0_0_/_0.45)]">
        <div className="flex shrink-0 items-center gap-2 border-b border-line/70 bg-ink-soft px-2.5 py-2 sm:px-3 sm:py-2.5">
          <span className="size-2 shrink-0 rounded-full bg-[#ff5f57] sm:size-2.5" />
          <span className="size-2 shrink-0 rounded-full bg-[#febc2e] sm:size-2.5" />
          <span className="size-2 shrink-0 rounded-full bg-[#28c840] sm:size-2.5" />
          <div className="ml-1 flex min-w-0 flex-1 items-center overflow-hidden rounded bg-ink px-2 py-1 sm:ml-2 sm:px-3">
            <span className="truncate font-body text-[10px] tracking-wide text-muted sm:text-[11px]">
              {safeHost(item.url)}
            </span>
          </div>
        </div>

        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden bg-ink-soft">
          {!failed ? (
            <img
              src={item.src}
              alt={alt}
              className="absolute inset-0 size-full object-cover object-top"
              loading="lazy"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
              <p className="break-all font-display text-xl font-extrabold text-paper sm:text-2xl">
                {safeHost(item.url)}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald"
              >
                {visitLabel}
              </a>
            </div>
          )}
        </div>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-10"
        aria-label={visitLabel}
      />
    </div>
  )
}

function safeHost(url) {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return url
  }
}
