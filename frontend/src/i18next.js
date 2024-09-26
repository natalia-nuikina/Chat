import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/ru.js';

const i18n = async () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;
