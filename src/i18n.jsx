import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationES from './locales/es/global.json'
import translationEN from './locales/en/global.json'

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
