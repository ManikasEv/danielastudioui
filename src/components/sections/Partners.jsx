import { useState } from 'react'
import { useI18n } from '../../i18n/LanguageContext'
import { PARTNERS } from '../../data/partners'
import PartnersCarousel from '../PartnersCarousel'

export default function Partners() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)

  return (
    <section id="partners" className="section-shell scroll-mt-0">
      <div className="section-inner">
        <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald sm:text-xs">
          {t('partners.eyebrow')}
        </p>
        <h2 className="max-w-3xl break-words font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[0.92] tracking-tight text-paper text-balance">
          {t('partners.title')}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {t('partners.lead')}
        </p>

        <div className="mt-10 min-w-0">
          <PartnersCarousel
            items={PARTNERS}
            index={index}
            onIndexChange={setIndex}
            t={t}
            labels={{
              carousel: t('partners.carousel'),
              prev: t('partners.prev'),
              next: t('partners.next'),
              slide: t('partners.slide'),
            }}
          />
        </div>
      </div>
    </section>
  )
}
