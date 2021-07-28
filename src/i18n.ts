import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(XHR)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(
    {
      initImmediate: false,
      backend: {
        loadPath: `./locales/{{lng}}.json`
      },
      react: {
        useSuspense: true
      },
      fallbackLng: 'en',
      preload: ['en'],
      keySeparator: false,
      nsSeparator: false,
      interpolation: { escapeValue: false },
      // resources: {
      //   "en": { translation: require('locales/en.json') }
      // }
    })


export default i18next
