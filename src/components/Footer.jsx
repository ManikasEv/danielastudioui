import { useI18n } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-line px-5 py-10 pb-24 sm:px-6 md:px-8 lg:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg font-extrabold tracking-tight">
          Daniela<span className="text-emerald">Studio</span>
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} — {t('footer.line')}
        </p>
      </div>
    </footer>
  )
}
