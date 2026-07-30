import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

const TYPE_OPTIONS = ['property', 'commercial', 'web']

const TYPE_TO_GROUP = {
  property: 'property',
  commercial: 'commercial',
  web: 'website',
}

export default function TicketPage() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'property',
    packageId: '',
    subject: '',
    message: '',
  })

  const packageGroup = TYPE_TO_GROUP[form.category]

  const packageOptions = useMemo(() => {
    return [0, 1, 2]
      .map((i) => {
        const name = t(`packages.${packageGroup}.tiers.${i}.name`)
        const price = t(`packages.${packageGroup}.tiers.${i}.price`)
        if (!name || String(name).startsWith('packages.')) return null
        return {
          value: `${packageGroup}-${i}`,
          label: `${name} — ${price}`,
        }
      })
      .filter(Boolean)
  }, [packageGroup, t])

  function onTypeChange(e) {
    setForm((f) => ({ ...f, category: e.target.value, packageId: '' }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const pkg = packageOptions.find((o) => o.value === form.packageId)
      const res = await fetch(`${API_URL}/api/public/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          category: form.category,
          package: pkg?.label || form.packageId || null,
          subject: form.subject,
          message: form.message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Could not create ticket')
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fieldLabel =
    'mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:text-sm'
  const fieldInput =
    'w-full border-b border-line bg-transparent py-3.5 text-lg text-paper outline-none transition focus:border-emerald sm:text-xl'

  return (
    <div className="min-h-[100svh] overflow-x-hidden">
      <header className="border-b border-white/5 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 md:px-8">
          <Link
            to="/"
            className="font-display text-base font-extrabold tracking-tight sm:text-lg"
          >
            Adriatic<span className="text-emerald">WebEstate</span>
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-muted hover:text-emerald"
          >
            {t('ticket.back')}
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="section-eyebrow">{t('ticket.eyebrow')}</p>
          <h1 className="section-title">{t('ticket.title')}</h1>
          <p className="section-lead !font-normal text-muted">
            {t('ticket.lead')}
          </p>
        </div>

        <div className="min-w-0">
          {sent ? (
            <p className="border border-emerald/40 bg-emerald-dim/40 px-5 py-4 text-base text-emerald-bright sm:text-lg">
              {t('ticket.success')}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <label className="block">
                <span className={fieldLabel}>{t('contact.name')}</span>
                <input
                  required
                  className={fieldInput}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="block">
                <span className={fieldLabel}>{t('contact.email')}</span>
                <input
                  required
                  type="email"
                  className={fieldInput}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="block">
                <span className={fieldLabel}>{t('contact.type')}</span>
                <select
                  className={fieldInput}
                  value={form.category}
                  onChange={onTypeChange}
                >
                  {TYPE_OPTIONS.map((key) => (
                    <option key={key} value={key}>
                      {t(`contact.types.${key}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={fieldLabel}>{t('contact.package')}</span>
                <select
                  className={fieldInput}
                  value={form.packageId}
                  onChange={(e) =>
                    setForm({ ...form, packageId: e.target.value })
                  }
                >
                  <option value="">{t('contact.packageNone')}</option>
                  {packageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={fieldLabel}>{t('ticket.subject')}</span>
                <input
                  required
                  className={fieldInput}
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />
              </label>
              <label className="block">
                <span className={fieldLabel}>{t('contact.message')}</span>
                <textarea
                  required
                  rows={4}
                  className={`${fieldInput} resize-none`}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </label>
              {error && <p className="text-sm text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-14 items-center justify-center bg-emerald px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-emerald-bright disabled:opacity-60"
              >
                {loading ? t('ticket.sending') : t('ticket.submit')}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
