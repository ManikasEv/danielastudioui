import { useI18n } from '../../i18n/LanguageContext'
import { contactHref } from './Contact'

const GROUPS = ['property', 'commercial', 'website']

export default function Packages() {
  const { t } = useI18n()

  return (
    <section id="packages" className="section-shell scroll-mt-0">
      <div className="section-inner">
        <p className="section-eyebrow">{t('packages.eyebrow')}</p>
        <h2 className="section-title">{t('packages.title')}</h2>
        <p className="section-lead !font-normal text-muted">{t('packages.lead')}</p>

        <div className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
          {GROUPS.map((group) => {
            const tiers = [0, 1, 2]
              .map((i) => ({
                index: i,
                name: t(`packages.${group}.tiers.${i}.name`),
                price: t(`packages.${group}.tiers.${i}.price`),
                unit: t(`packages.${group}.tiers.${i}.unit`),
                features: t(`packages.${group}.tiers.${i}.features`),
                featured: t(`packages.${group}.tiers.${i}.featured`) === 'true',
              }))
              .filter((tier) => tier.name && !tier.name.startsWith('packages.'))

            return (
              <div key={group} className="min-w-0">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="break-words font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold tracking-tight text-paper">
                      {t(`packages.${group}.title`)}
                    </h3>
                    <p className="mt-2 max-w-xl text-base text-muted sm:text-lg">
                      {t(`packages.${group}.blurb`)}
                    </p>
                  </div>
                </div>

                <div className="grid min-w-0 gap-4 md:grid-cols-3">
                  {tiers.map((tier) => (
                    <article
                      key={tier.name}
                      className={[
                        'flex min-w-0 flex-col border px-4 py-5 sm:px-5 sm:py-6 transition-colors',
                        tier.featured
                          ? 'border-emerald bg-emerald/10'
                          : 'border-line bg-ink-soft/30 hover:border-muted',
                      ].join(' ')}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald">
                        {tier.name}
                      </p>
                      <p className="mt-4 break-words font-display text-2xl font-extrabold tracking-tight text-paper sm:text-3xl">
                        {tier.price}
                      </p>
                      <p className="mt-1 break-words text-sm text-muted">
                        {tier.unit}
                      </p>
                      {Array.isArray(tier.features) && (
                        <ul className="mt-6 flex-1 space-y-2.5">
                          {tier.features.map((f) => (
                            <li
                              key={f}
                              className="flex gap-2.5 text-sm leading-snug text-paper/80"
                            >
                              <span
                                className="mt-1.5 size-1 shrink-0 bg-emerald"
                                aria-hidden
                              />
                              <span className="min-w-0 break-words">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <a
                        href={contactHref(group, tier.index)}
                        className={[
                          'mt-8 inline-flex min-h-11 items-center justify-center px-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] transition',
                          tier.featured
                            ? 'bg-emerald text-ink hover:bg-emerald-bright'
                            : 'border border-line text-paper hover:border-emerald hover:text-emerald',
                        ].join(' ')}
                      >
                        {t('packages.cta')}
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-12 text-sm text-muted">{t('packages.note')}</p>
      </div>
    </section>
  )
}
