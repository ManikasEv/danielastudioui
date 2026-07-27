import { useState } from 'react'
import { useI18n } from '../../i18n/LanguageContext'
import { PORTFOLIO, PORTFOLIO_TABS } from '../../data/portfolio'
import PortfolioCarousel from '../PortfolioCarousel'

export default function Portfolio() {
  const { t } = useI18n()
  const [tab, setTab] = useState('properties')
  const [index, setIndex] = useState(0)

  const items = PORTFOLIO[tab] ?? []

  function selectTab(next) {
    setTab(next)
    setIndex(0)
  }

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-0 overflow-x-hidden border-t border-line"
    >
      <div className="section-shell !border-0 !py-14 sm:!py-16 lg:!pb-10">
        <div className="section-inner">
          <p className="section-eyebrow">{t('portfolio.eyebrow')}</p>
          <h2 className="section-title">{t('portfolio.title')}</h2>
          <p className="section-lead !font-normal text-muted">
            {t('portfolio.lead')}
          </p>

          <div
            className="mt-8 flex min-w-0 flex-wrap gap-2 sm:mt-10"
            role="tablist"
            aria-label={t('portfolio.title')}
          >
            {PORTFOLIO_TABS.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => selectTab(id)}
                className={[
                  'min-h-12 max-w-full px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-base',
                  tab === id
                    ? 'bg-emerald text-ink'
                    : 'border border-line text-muted hover:border-muted hover:text-paper',
                ].join(' ')}
              >
                {t(`portfolio.tabs.${id}`)}
                <span className="ml-2 tabular-nums text-xs opacity-70">
                  {PORTFOLIO[id]?.length ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="min-w-0 overflow-hidden border-t border-line bg-ink-soft/40"
        role="tabpanel"
      >
        <PortfolioCarousel
          key={tab}
          items={items}
          index={index}
          onIndexChange={setIndex}
          t={t}
          hint={t('portfolio.hintWalk')}
          mediaLeft={false}
          labels={{
            carousel: t('portfolio.carousel'),
            prev: t('portfolio.prev'),
            next: t('portfolio.next'),
            slide: t('portfolio.slide'),
            visit: t('portfolio.visit'),
          }}
        />
      </div>
    </section>
  )
}
