import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const DETECTION_OPTIONS = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(HttpApi)
    .init({
        lng: localStorage.getItem('i18nextLngMeCoreBack') || 'mn',
        fallbackLng: 'mn',
        detection: DETECTION_OPTIONS,
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            useSuspense: true,
        },
    })

export default i18n
