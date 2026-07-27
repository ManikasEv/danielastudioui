import MediaSection from '../MediaSection'
import { useI18n } from '../../i18n/LanguageContext'

export default function Method() {
  const { t } = useI18n()

  return (
    <MediaSection
      id="method"
      eyebrow={t('method.eyebrow')}
      title={t('method.title')}
      lead={t('method.lead')}
      body={t('method.body')}
      cta={t('method.cta')}
      href="#contact"
      mediaSrc="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1800&q=80"
      mediaAlt={t('method.mediaAlt')}
      mediaCaption={t('method.mediaCaption')}
      mediaLeft={false}
    />
  )
}
