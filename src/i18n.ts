import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      saveJoke_one: "Save a Joke",
      saveJoke_other: "Save {{count}} Jokes",
      impersonate: "Impersonate Chuck Norris",
      categories: "Categories",
      selectCategory: "Select category",
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
