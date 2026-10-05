import { createContext, useContext } from 'react'
import pl from './pl.js'
import uk from './uk.js'
import en from './en.js'

export const dictionaries = { pl, uk, en }
export const languages = ['pl', 'uk', 'en']
export const defaultLang = 'pl'

// Польский — на корне сайта, украинский — /uk/, английский — /en/
export const langPath = (lang) => (lang === defaultLang ? '/' : `/${lang}/`)

export function langFromPath(pathname) {
  const seg = pathname.split('/')[1]
  return languages.includes(seg) ? seg : defaultLang
}

// Разделы SPA и их адреса (польские слаги для всех языков): /oprawki/, /uk/oprawki/, /en/oprawki/
const slugs = {
  home: '',
  frames: 'oprawki',
  lenses: 'szkla',
  tryon: 'home-try-on',
  business: 'dla-firm',
  salon: 'salon',
  contact: 'kontakt',
}

export const routes = Object.keys(slugs)

export const routePath = (lang, route = 'home') => langPath(lang) + (slugs[route] ? `${slugs[route]}/` : '')

export function routeFromPath(pathname) {
  const segs = pathname.split('/').filter(Boolean)
  if (languages.includes(segs[0])) segs.shift()
  return routes.find((r) => slugs[r] === (segs[0] ?? '')) ?? 'home'
}

const LangContext = createContext(null)

export function LangProvider({ value, children }) {
  return <LangContext.Provider value={{ ...value, t: dictionaries[value.lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

// Цена в формате языка: 1 540 zł
export const formatPrice = (n, lang) => `${n.toLocaleString(lang === 'en' ? 'en-GB' : lang)} zł`
