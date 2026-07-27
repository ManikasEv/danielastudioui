import { useState } from 'react'
import { useI18n } from '../../i18n/LanguageContext'
import { PARTNERS } from '../../data/partners'
import PartnersCarousel from '../PartnersCarousel'

export default function Partners() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)

  return (
    <section
      id="partners"
      className="relative scroll-mt-0 overflow-x-hidden border-t border-line"
    >
      <div className="section-shell !border-0 !py-14 sm:!py-16 lg:!pb-10">
        <div className="section-inner">
          <p className="section-eyebrow">{t('partners.eyebrow')}</p>
          <h2 className="section-title">{t('partners.title')}</h2>
          <p className="section-lead !font-normal text-muted">
            {t('partners.lead')}
          </p>
        </div>
      </div>

      <div className="min-w-0 overflow-hidden border-t border-line">
        <PartnersCarousel
          items={PARTNERS}
          index={index}
          onIndexChange={setIndex}
          t={t}
          mediaLeft
          labels={{
            carousel: t('partners.carousel'),
            prev: t('partners.prev'),
            next: t('partners.next'),
            slide: t('partners.slide'),
          }}
        />
      </div>
    </section>
  )
}
