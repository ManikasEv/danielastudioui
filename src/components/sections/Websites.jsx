import MediaSection from '../MediaSection'
import { useI18n } from '../../i18n/LanguageContext'

export default function Websites() {
  const { t } = useI18n()

  return (
    <MediaSection
      id="websites"
      eyebrow={t('websites.eyebrow')}
      title={t('websites.title')}
      lead={t('websites.lead')}
      body={t('websites.body')}
      cta={t('websites.cta')}
      mediaSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80"
      mediaAlt={t('websites.mediaAlt')}
      mediaCaption={t('websites.mediaCaption')}
      mediaLeft
    />
  )
}
