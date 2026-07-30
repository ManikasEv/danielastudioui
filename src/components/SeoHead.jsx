import { useEffect } from 'react'
import { useI18n } from '../i18n/LanguageContext'

const SITE = 'https://adriaticwebestate.com'
const BRAND = 'Adriatic Web Estate'

const META = {
  en: {
    title: `${BRAND} | AI Property Video, Commercials & Websites — Germany, Croatia, Switzerland, Greece`,
    description:
      'AI property films, AI commercial videos, and SEO-ready websites with databases for real estate and brands in Germany, Croatia, Switzerland, and Greece.',
  },
  de: {
    title: `${BRAND} | KI-Immobilienvideo, Werbevideo & Websites — Deutschland, Kroatien, Schweiz, Griechenland`,
    description:
      'KI-Immobilienfilme, KI-Werbevideos und SEO-Websites mit Datenbanken für Immobilien und Marken in Deutschland, Kroatien, der Schweiz und Griechenland.',
  },
  hr: {
    title: `${BRAND} | AI video za nekretnine, reklame i web — Njemačka, Hrvatska, Švicarska, Grčka`,
    description:
      'AI filmovi za nekretnine, AI reklamni videozapisi i SEO web stranice s bazama podataka za agencije i brendove u Njemačkoj, Hrvatskoj, Švicarskoj i Grčkoj.',
  },
}

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Updates document title/description/OG for the active UI language.
 * Does not change visible page copy.
 */
export default function SeoHead() {
  const { locale } = useI18n()

  useEffect(() => {
    const meta = META[locale] || META.en
    document.title = meta.title
    document.documentElement.lang = locale

    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', SITE + '/')
    setMeta('property', 'og:locale', locale === 'de' ? 'de_DE' : locale === 'hr' ? 'hr_HR' : 'en_US')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', `${SITE}/og-cover.png`)
    setMeta('property', 'og:image', `${SITE}/og-cover.png`)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE}/`)
  }, [locale])

  return null
}
