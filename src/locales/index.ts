import { createI18n } from 'vue-i18n'
import en from './en.json'
import es from './es.json'

const LOCALE_KEY = 'app_locale'

const savedLocale = localStorage.getItem(LOCALE_KEY)
const browserLocale = navigator.language.split('-')[0]
const defaultLocale = savedLocale || (browserLocale === 'en' ? 'en' : 'es')

const i18n = createI18n({
  legacy: false, // habilita la Composition API (useI18n)
  locale: defaultLocale,
  fallbackLocale: 'es',
  messages: { en, es },
})

export function setLocale(locale: 'es' | 'en') {
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_KEY, locale)
}

export function getLocale(): string {
  return i18n.global.locale.value
}


export default i18n