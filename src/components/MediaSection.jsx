import FitText from './FitText'

/**
 * Split section: full-bleed media + text.
 * Mobile: media stacks first. Desktop: mediaLeft toggles L/R zigzag.
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
  mediaLeft = true,
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

      <div
        className={[
          'absolute bottom-0 z-10 bg-gradient-to-t from-ink via-ink/70 to-transparent px-4 pb-5 pt-16 sm:px-6 sm:pb-7 lg:bg-none lg:p-0 lg:pt-0',
          'inset-x-0 lg:inset-x-auto lg:bottom-6',
          mediaLeft ? 'lg:left-6 lg:right-auto' : 'lg:right-6 lg:left-auto',
        ].join(' ')}
      >
        <div className="max-w-lg border border-emerald/35 bg-ink/80 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4 lg:bg-ink/75">
          {eyebrow && (
            <p className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-emerald sm:text-sm">
              {eyebrow}
            </p>
          )}
          <p className="font-display text-2xl font-extrabold leading-tight tracking-tight text-paper sm:text-3xl lg:text-2xl">
            {mediaCaption || title}
          </p>
        </div>
      </div>
    </div>
  )

  const copy = (
    <div
      className={[
        'section-copy order-2',
        mediaLeft ? 'lg:order-2 section-copy-rail' : 'lg:order-1',
      ].join(' ')}
    >
      <div className="w-full min-w-0">
        <p className="section-eyebrow">{eyebrow}</p>

        {titleLines ? (
          <h2 className="w-full min-w-0 font-display font-extrabold tracking-tight text-paper">
            {titleLines.map((line) => (
              <FitText
                key={line}
                as="span"
                wrapper="span"
                wrapperClassName="block min-w-0 w-full overflow-hidden"
                min={28}
                max={72}
                className="font-display font-extrabold tracking-tight text-paper"
              >
                {line}
              </FitText>
            ))}
          </h2>
        ) : (
          <h2 className="section-title">{title}</h2>
        )}

        {lead && <p className="section-lead">{lead}</p>}
        <p className="section-body">{body}</p>
        {cta && (
          <a href={href} className="section-cta">
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
