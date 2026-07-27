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
    <section id="portfolio" className="section-shell scroll-mt-0">
      <div className="section-inner">
        <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald sm:text-xs">
          {t('portfolio.eyebrow')}
        </p>
        <h2 className="max-w-3xl break-words font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[0.92] tracking-tight text-paper text-balance">
          {t('portfolio.title')}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
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
                'min-h-11 max-w-full px-3 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-4 sm:text-xs sm:tracking-[0.16em]',
                tab === id
                  ? 'bg-emerald text-ink'
                  : 'border border-line text-muted hover:border-muted hover:text-paper',
              ].join(' ')}
            >
              {t(`portfolio.tabs.${id}`)}
              <span className="ml-2 tabular-nums text-[10px] opacity-70">
                {PORTFOLIO[id]?.length ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div
          className="mt-6 min-w-0 overflow-hidden border border-line bg-ink-soft/40 sm:mt-8"
          role="tabpanel"
        >
          <PortfolioCarousel
            key={tab}
            items={items}
            index={index}
            onIndexChange={setIndex}
            t={t}
            hint={t('portfolio.hintWalk')}
            labels={{
              carousel: t('portfolio.carousel'),
              prev: t('portfolio.prev'),
              next: t('portfolio.next'),
              slide: t('portfolio.slide'),
              visit: t('portfolio.visit'),
            }}
          />
        </div>
      </div>
    </section>
  )
}
