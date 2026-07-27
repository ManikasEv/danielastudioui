import MediaSection from '../MediaSection'
import { useI18n } from '../../i18n/LanguageContext'
import propertyVideo from '../../assets/propertyvideo1.mp4'

export default function Property() {
  const { t } = useI18n()

  return (
    <MediaSection
      id="property"
      eyebrow={t('property.eyebrow')}
      title={t('property.title')}
      lead={t('property.lead')}
      body={t('property.body')}
      cta={t('property.cta')}
      mediaSrc={propertyVideo}
      mediaAlt={t('property.mediaAlt')}
      mediaCaption={t('property.mediaCaption')}
      mediaType="video"
      mediaLeft
    />
  )
}
