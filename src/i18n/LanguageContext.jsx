import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { LOCALES, translations } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'awe-lang'

function readInitialLocale() {
  if (typeof window === 'undefined') return 'en'

  // SEO hreflang landing: ?lang=de|hr|en
  const params = new URLSearchParams(window.location.search)
  const fromQuery = (params.get('lang') || '').toLowerCase()
  if (LOCALES.includes(fromQuery)) return fromQuery

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (LOCALES.includes(saved)) return saved

  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('de')) return 'de'
  if (nav.startsWith('hr')) return 'hr'
  if (nav.startsWith('el')) return 'en' // Greece → English UI for now
  return 'en'
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next) => {
    if (LOCALES.includes(next)) setLocaleState(next)
  }, [])

  const t = useCallback(
    (path) => {
      const parts = path.split('.')
      let node = translations[locale]
      for (const part of parts) {
        node = node?.[part]
      }
      if (typeof node === 'string' || Array.isArray(node)) return node
      let en = translations.en
      for (const part of parts) {
        en = en?.[part]
      }
      if (typeof en === 'string' || Array.isArray(en)) return en
      return path
    },
    [locale],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, locales: LOCALES }),
    [locale, setLocale, t],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
