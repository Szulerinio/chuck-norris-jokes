import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as translationEN from "./locales/en/translation.json";

export const resources = {
  en: {
    mainPage: translationEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
