import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import translationEN from "./locales/en/translation.json";

export const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
