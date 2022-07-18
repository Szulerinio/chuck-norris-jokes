import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      "Save joke_one": "Save Joke",
      "Save joke_other": "Save Jokes",
      Impersonate: "Impersonate Chuck Norris",
      categories: "Categories",
      "Select category": "Select category",
    },
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
