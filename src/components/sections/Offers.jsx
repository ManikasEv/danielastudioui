import { useI18n } from '../../i18n/LanguageContext'

const CARDS = [
  {
    id: 'property',
    href: '#property',
    priceHref: '#packages',
    accent: true,
  },
  {
    id: 'websites',
    href: '#websites',
    priceHref: '#packages',
    accent: false,
  },
]

export default function Offers() {
  const { t } = useI18n()

  return (
    <section id="offers" className="section-shell scroll-mt-0">
      <div className="section-inner">
        <p className="section-eyebrow">{t('offers.eyebrow')}</p>
        <h2 className="section-title">{t('offers.title')}</h2>
        <p className="section-lead !font-normal text-muted">{t('offers.lead')}</p>

        <div className="mt-12 grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-6">
          {CARDS.map((card) => (
            <article
              key={card.id}
              className={[
                'flex min-w-0 flex-col border p-6 sm:p-8',
                card.accent
                  ? 'border-emerald/50 bg-emerald/8'
                  : 'border-line bg-ink-soft/40',
              ].join(' ')}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald">
                {t(`offers.${card.id}.label`)}
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight text-paper">
                {t(`offers.${card.id}.title`)}
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted sm:text-lg">
                {t(`offers.${card.id}.body`)}
              </p>
              <p className="mt-6 font-display text-2xl font-extrabold tracking-tight text-paper sm:text-3xl">
                {t(`offers.${card.id}.from`)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={card.href}
                  className="inline-flex min-h-12 items-center justify-center bg-emerald px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-emerald-bright"
                >
                  {t(`offers.${card.id}.cta`)}
                </a>
                <a
                  href={card.priceHref}
                  className="inline-flex min-h-12 items-center justify-center border border-line px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition hover:border-emerald hover:text-emerald"
                >
                  {t('offers.seePrices')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
