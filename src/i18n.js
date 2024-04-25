import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEn from "../src/locales/en/translation.json";
import translationAr from "../src/locales/ar/translation.json";
import translationDe from "../src/locales/de/translation.json";

const resources = {
  en: {
    translation: translationEn,
  },
  de: {
    translation: translationDe,
  },
  ar: {
    translation: translationAr,
  },
};

i18n
  //   .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: document.querySelector('html').lang,
    resources,
    fallbackLng: ["ar", "en", "de"],

    interpolation: {
      escapeValue: false,
    },
    // debug:true,
    returnObjects:true,
    detection: {
      order: [
        "path",
        "cookie",
        "localStorage",
        "htmlTag",
        "sessionStorage",
        "navigator",
        "subdomain",
      ],
      caches: ["cookie", "localStorage"],
    },
  });

export default i18n;
