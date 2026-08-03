import { useI18n } from '../../i18n/LanguageContext'

export default function Hero() {
  const { t } = useI18n()

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-soft"
    >
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=75"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-90"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-4 pb-[8.75rem] pt-28 sm:px-6 sm:pb-28 md:px-8 md:pb-32 lg:pr-24 xl:pr-28">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.28em] text-emerald sm:mb-5 sm:text-sm">
          {t('hero.eyebrow')}
        </p>
        <h1 className="max-w-4xl break-words font-display text-[2.75rem] font-extrabold leading-[0.88] tracking-tight text-paper text-balance sm:text-6xl md:text-7xl xl:text-8xl">
          {t('hero.brand')}
          <span className="block text-emerald">{t('hero.brandAccent')}</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/90 sm:mt-6 sm:text-lg md:text-xl">
          {t('hero.tagline')}
        </p>
        <ul className="mt-6 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
          {[0, 1].map((i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-sm text-paper/85 sm:text-base"
            >
              <span className="size-1.5 shrink-0 bg-emerald" aria-hidden />
              {t(`hero.points.${i}`)}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href="#offers"
            className="inline-flex min-h-12 items-center justify-center bg-emerald px-6 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-emerald-bright"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#packages"
            className="inline-flex min-h-12 items-center justify-center border border-paper/40 bg-ink/30 px-6 py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-paper backdrop-blur-sm transition hover:border-emerald hover:text-emerald"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  )
}
