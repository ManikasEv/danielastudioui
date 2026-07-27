import MediaSection from '../MediaSection'
import { useI18n } from '../../i18n/LanguageContext'
import commercialVideo from '../../assets/commercial1.mp4'

export default function Commercial() {
  const { t } = useI18n()

  return (
    <MediaSection
      id="commercial"
      eyebrow={t('commercial.eyebrow')}
      title={t('commercial.title')}
      lead={t('commercial.lead')}
      body={t('commercial.body')}
      cta={t('commercial.cta')}
      mediaSrc={commercialVideo}
      mediaAlt={t('commercial.mediaAlt')}
      mediaCaption={t('commercial.mediaCaption')}
      mediaType="video"
      mediaLeft={false}
    />
  )
}
