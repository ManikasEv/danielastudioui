import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'

export default function Nav() {
  const { t, locale, setLocale, locales } = useI18n()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:gap-4 sm:px-6 md:px-8">
        <a
          href="#hero"
          className="shrink-0 font-display text-base font-extrabold tracking-tight text-paper sm:text-lg md:text-xl"
        >
          Adriatic<span className="text-emerald">WebEstate</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className="flex items-center rounded-full border border-line bg-ink-soft/80 p-0.5"
            role="group"
            aria-label={t('nav.lang')}
          >
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={[
                  'min-h-8 min-w-8 rounded-full px-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:min-h-9 sm:min-w-9 sm:px-2.5 sm:text-[11px]',
                  locale === code
                    ? 'bg-emerald text-ink'
                    : 'text-muted hover:text-paper',
                ].join(' ')}
                aria-pressed={locale === code}
              >
                {code}
              </button>
            ))}
          </div>

          <Link
            to="/ticket"
            className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-emerald sm:text-[11px] sm:tracking-[0.18em] md:text-xs"
          >
            {t('nav.ticket')}
          </Link>

          <a
            href="#packages"
            className="hidden font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-emerald sm:inline md:text-xs"
          >
            {t('nav.pricing')}
          </a>

          <a
            href="#contact"
            className="hidden font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:text-emerald sm:inline md:text-xs"
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </header>
  )
}
