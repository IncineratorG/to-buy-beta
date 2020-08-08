import {useState, useEffect} from 'react';
import * as RNLocalize from 'react-native-localize';
import {ru} from './translations/ru';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {en} from './translations/en';

const localization = {
  options: {
    defaultLanguage: 'ru',
  },
  translations: {
    ru: ru,
    en: en,
  },
};

export const useTranslation = () => {
  const initialLocales = RNLocalize.getLocales();
  let initialLanguageCode = localization.options.defaultLanguage;
  if (
    initialLocales.length &&
    localization.translations[initialLocales[0].languageCode]
  ) {
    initialLanguageCode = initialLocales[0].languageCode;
  }

  const [language, setLanguage] = useState(initialLanguageCode);

  useEffect(() => {
    const changeLocaleHandler = () => {
      const locales = RNLocalize.getLocales();
      if (locales.length) {
        const languageCode = locales[0].languageCode;

        if (localization.translations[languageCode]) {
          setLanguage(languageCode);
        }
      }
    };

    RNLocalize.addEventListener('change', changeLocaleHandler);

    return () => {
      RNLocalize.removeEventListener('change', changeLocaleHandler);
    };
  }, []);

  const t = (pattern) => {
    return localization.translations[language][pattern];
  };

  return {t, language};
};
