import FitText from './FitText'

/**
 * Split section: full-bleed media + text.
 * On mobile, media always stacks first for clarity; desktop respects mediaLeft.
 * Copy always hugs the left edge of its column (same inset as .section-shell).
 */
export default function MediaSection({
  id,
  eyebrow,
  title,
  lead,
  body,
  cta,
  href = '#contact',
  mediaSrc,
  mediaAlt,
  mediaCaption,
  mediaType = 'image',
  mediaLeft = false,
  stackTitle = false,
}) {
  const titleLines = stackTitle
    ? String(title)
        .split(/(?<=\.)\s+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : null

  const media = (
    <div
      className={[
        'relative min-h-[48vh] min-w-0 overflow-hidden sm:min-h-[55vh] lg:min-h-screen',
        'order-1',
        mediaLeft ? 'lg:order-1' : 'lg:order-2',
      ].join(' ')}
    >
      {mediaType === 'video' ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={mediaSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={mediaAlt}
        />
      ) : (
        <img
          src={mediaSrc}
          alt={mediaAlt}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      )}
      <div
        className={[
          'absolute inset-0',
          'bg-gradient-to-t from-ink/80 via-ink/20 to-transparent',
          'lg:bg-none',
          mediaLeft
            ? 'lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/75'
            : 'lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-ink/75',
        ].join(' ')}
      />
      <div className="grain absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/70 to-transparent px-4 pb-5 pt-16 sm:px-6 sm:pb-7 lg:inset-x-auto lg:right-auto lg:bottom-6 lg:left-6 lg:bg-none lg:p-0 lg:pt-0">
        <div className="max-w-lg border border-emerald/35 bg-ink/80 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4 lg:bg-ink/75">
          {eyebrow && (
            <p className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald sm:text-[11px]">
              {eyebrow}
            </p>
          )}
          <p className="font-display text-xl font-extrabold leading-tight tracking-tight text-paper sm:text-2xl lg:text-lg">
            {mediaCaption || title}
          </p>
        </div>
      </div>
    </div>
  )

  const copy = (
    <div
      className={[
        'relative flex min-w-0 items-center py-14 pb-24 sm:py-16 lg:min-h-screen lg:pb-16',
        'px-4 sm:px-6 lg:px-8 xl:px-10',
        'order-2',
        mediaLeft ? 'lg:order-2 lg:pr-24 xl:pr-28' : 'lg:order-1',
      ].join(' ')}
    >
      <div className="w-full min-w-0">
        <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald sm:mb-4 sm:text-xs">
          {eyebrow}
        </p>

        {titleLines ? (
          <h2 className="w-full min-w-0 font-display font-extrabold tracking-tight text-paper">
            {titleLines.map((line) => (
              <FitText
                key={line}
                as="span"
                wrapper="span"
                wrapperClassName="block min-w-0 w-full overflow-hidden"
                min={22}
                max={72}
                className="font-display font-extrabold tracking-tight text-paper"
              >
                {line}
              </FitText>
            ))}
          </h2>
        ) : (
          <h2 className="max-w-3xl break-words font-display text-[clamp(2rem,5.5vw,4.25rem)] font-extrabold leading-[0.92] tracking-tight text-paper text-balance">
            {title}
          </h2>
        )}

        {lead && (
          <p className="mt-5 max-w-2xl break-words text-lg font-medium leading-snug text-paper/90 sm:mt-6 sm:text-xl md:text-2xl">
            {lead}
          </p>
        )}
        <p className="mt-4 max-w-2xl break-words text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
          {body}
        </p>
        {cta && (
          <a
            href={href}
            className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-emerald pb-1 font-body text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:text-emerald sm:mt-10"
          >
            {cta}
            <span aria-hidden className="text-emerald">
              →
            </span>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <section
      id={id}
      className="relative grid min-w-0 scroll-mt-0 overflow-x-hidden border-t border-line lg:grid-cols-2"
    >
      {media}
      {copy}
    </section>
  )
}
