import { useState } from 'react'
import { useI18n } from '../../i18n/LanguageContext'

export default function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative grid border-t border-line lg:min-h-screen lg:grid-cols-2"
    >
      <div className="relative order-1 min-h-[42vh] overflow-hidden sm:min-h-[48vh] lg:order-1 lg:min-h-screen">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
          alt={t('contact.mediaAlt')}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/85" />
        <div className="grain absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-ink via-ink/70 to-transparent px-4 pb-5 pt-16 sm:px-6 sm:pb-7 lg:inset-x-auto lg:bottom-6 lg:left-6 lg:bg-none lg:p-0 lg:pt-0">
          <div className="max-w-lg border border-emerald/35 bg-ink/80 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4 lg:bg-ink/75">
            <p className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald sm:text-[11px]">
              {t('contact.eyebrow')}
            </p>
            <p className="font-display text-xl font-extrabold leading-tight tracking-tight text-paper sm:text-2xl lg:text-lg">
              {t('contact.mediaCaption')}
            </p>
          </div>
        </div>
      </div>

      <div className="relative order-2 flex items-center px-5 py-14 pb-28 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:pb-16 lg:pr-28 xl:px-24">
        <div className="w-full max-w-md">
          <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald sm:text-xs">
            {t('contact.eyebrow')}
          </p>
          <h2 className="font-display text-[2.35rem] font-extrabold leading-[0.92] tracking-tight text-paper text-balance sm:text-5xl md:text-6xl">
            {t('contact.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {t('contact.body')}
          </p>

          {sent ? (
            <p className="mt-10 border border-emerald/40 bg-emerald-dim/40 px-5 py-4 text-sm text-emerald-bright">
              {t('contact.success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 sm:mt-10">
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted">
                  {t('contact.name')}
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="w-full border-b border-line bg-transparent py-3 text-base text-paper outline-none transition focus:border-emerald"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted">
                  {t('contact.email')}
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full border-b border-line bg-transparent py-3 text-base text-paper outline-none transition focus:border-emerald"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted">
                  {t('contact.type')}
                </span>
                <select
                  name="type"
                  className="w-full border-b border-line bg-ink py-3 text-base text-paper outline-none transition focus:border-emerald"
                  defaultValue="property"
                >
                  <option value="property">{t('contact.types.property')}</option>
                  <option value="commercial">
                    {t('contact.types.commercial')}
                  </option>
                  <option value="web">{t('contact.types.web')}</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted">
                  {t('contact.message')}
                </span>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full resize-none border-b border-line bg-transparent py-3 text-base text-paper outline-none transition focus:border-emerald"
                />
              </label>
              <button
                type="submit"
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center bg-emerald px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-emerald-bright sm:w-auto"
              >
                {t('contact.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
