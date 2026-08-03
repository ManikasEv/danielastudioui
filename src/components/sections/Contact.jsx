import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../../i18n/LanguageContext'

const TYPE_OPTIONS = ['property', 'web']

const TYPE_TO_GROUP = {
  property: 'property',
  web: 'website',
}

const GROUP_TO_TYPE = {
  property: 'property',
  website: 'web',
}

const selectArrow = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' fill='none'%3E%3Cpath d='M1 1.5 7 7.5 13 1.5' stroke='%237a8f82' stroke-width='1.6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.35rem center',
}

function readContactParams() {
  if (typeof window === 'undefined') return { type: 'property', packageId: '' }
  const hash = window.location.hash || ''
  const qIndex = hash.indexOf('?')
  const params = new URLSearchParams(qIndex >= 0 ? hash.slice(qIndex + 1) : '')
  const typeParam = params.get('type')
  const pkg = params.get('package') || ''
  const type = TYPE_OPTIONS.includes(typeParam) ? typeParam : 'property'
  return { type, packageId: pkg }
}

export default function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const [projectType, setProjectType] = useState('property')
  const [packageId, setPackageId] = useState('')

  useEffect(() => {
    const apply = () => {
      const { type, packageId: pkg } = readContactParams()
      setProjectType(type)
      setPackageId(pkg)
      setSent(false)
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  const packageGroup = TYPE_TO_GROUP[projectType]

  const packageOptions = useMemo(() => {
    return [0, 1, 2]
      .map((i) => {
        const name = t(`packages.${packageGroup}.tiers.${i}.name`)
        const price = t(`packages.${packageGroup}.tiers.${i}.price`)
        const unit = t(`packages.${packageGroup}.tiers.${i}.unit`)
        if (!name || String(name).startsWith('packages.')) return null
        return {
          value: `${packageGroup}-${i}`,
          label: `${name} — ${price}`,
          hint: unit,
        }
      })
      .filter(Boolean)
  }, [packageGroup, t])

  useEffect(() => {
    if (!packageId) return
    const stillValid = packageOptions.some((o) => o.value === packageId)
    if (!stillValid) setPackageId('')
  }, [packageId, packageOptions])

  function handleTypeChange(e) {
    setProjectType(e.target.value)
    setPackageId('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  const selectedHint = packageOptions.find((o) => o.value === packageId)?.hint

  const fieldLabel =
    'mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:text-sm'
  const fieldInput =
    'w-full border-b border-line bg-transparent py-3.5 text-lg text-paper outline-none transition placeholder:text-muted/50 focus:border-emerald sm:text-xl'
  const fieldSelect =
    'w-full appearance-none border-b border-line bg-ink py-3.5 pr-10 text-lg text-paper outline-none transition focus:border-emerald sm:text-xl'
  const fieldHint = 'mt-2.5 block text-sm leading-snug text-muted sm:text-base'

  return (
    <section
      id="contact"
      className="relative grid min-w-0 overflow-x-hidden border-t border-line lg:min-h-screen lg:grid-cols-2"
    >
      {/* Photo — left */}
      <div className="relative order-1 min-h-[42vh] min-w-0 overflow-hidden sm:min-h-[48vh] lg:min-h-screen">
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
            <p className="mb-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-emerald sm:text-sm">
              {t('contact.eyebrow')}
            </p>
            <p className="font-display text-2xl font-extrabold leading-tight tracking-tight text-paper sm:text-3xl lg:text-2xl">
              {t('contact.mediaCaption')}
            </p>
          </div>
        </div>
      </div>

      {/* Form — right */}
      <div className="section-copy order-2 section-copy-rail pb-28 lg:pb-16">
        <div className="w-full min-w-0 max-w-xl">
          <p className="section-eyebrow">{t('contact.eyebrow')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-lead !font-normal text-muted">{t('contact.body')}</p>

          {sent ? (
            <p className="mt-10 border border-emerald/40 bg-emerald-dim/40 px-5 py-4 text-base text-emerald-bright sm:text-lg">
              {t('contact.success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
              <label className="block">
                <span className={fieldLabel}>{t('contact.name')}</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className={fieldInput}
                />
              </label>

              <label className="block">
                <span className={fieldLabel}>{t('contact.email')}</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={fieldInput}
                />
              </label>

              <fieldset className="space-y-6 border-0 p-0 sm:space-y-7">
                <legend className="sr-only">{t('contact.flowLegend')}</legend>

                <label className="block">
                  <span className="mb-2.5 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:text-sm">
                      {t('contact.type')}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald sm:text-sm">
                      1 / 2
                    </span>
                  </span>
                  <select
                    name="type"
                    value={projectType}
                    onChange={handleTypeChange}
                    className={fieldSelect}
                    style={selectArrow}
                  >
                    {TYPE_OPTIONS.map((key) => (
                      <option key={key} value={key}>
                        {t(`contact.types.${key}`)}
                      </option>
                    ))}
                  </select>
                  <span className={fieldHint}>{t('contact.typeHint')}</span>
                </label>

                <label className="block">
                  <span className="mb-2.5 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:text-sm">
                      {t('contact.package')}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald sm:text-sm">
                      2 / 2
                    </span>
                  </span>
                  <select
                    key={projectType}
                    name="package"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className={fieldSelect}
                    style={selectArrow}
                  >
                    <option value="">{t('contact.packageNone')}</option>
                    {packageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className={fieldHint}>
                    {selectedHint ||
                      t('contact.packageHint').replace(
                        '{category}',
                        t(`contact.types.${projectType}`),
                      )}
                  </span>
                </label>
              </fieldset>

              <label className="block">
                <span className={fieldLabel}>{t('contact.message')}</span>
                <textarea
                  name="message"
                  rows={3}
                  className={`${fieldInput} resize-none`}
                />
              </label>

              <input type="hidden" name="category" value={projectType} />
              <input type="hidden" name="packageId" value={packageId} />

              <button
                type="submit"
                className="mt-2 inline-flex min-h-14 w-full items-center justify-center bg-emerald px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-emerald-bright sm:w-auto sm:text-base"
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

export function contactHref(group, tierIndex) {
  const type = GROUP_TO_TYPE[group] || 'property'
  return `#contact?type=${type}&package=${group}-${tierIndex}`
}
