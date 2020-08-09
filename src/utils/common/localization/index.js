import {useSelector} from 'react-redux';
import translations from '../../../assets/translations';

export const useTranslation = () => {
  const appTranslations = translations;

  const currentLanguageCode = useSelector(
    (state) => state.system.system.localization.currentLanguageCode,
  );

  const t = (pattern) => {
    return appTranslations.availableTranslations[currentLanguageCode][pattern];
  };

  return {t, language: currentLanguageCode};
};

// import {useState, useEffect} from 'react';
// import * as RNLocalize from 'react-native-localize';
// import {ru} from '../../../assets/translations/languages/ru';
// import {en} from '../../../assets/translations/languages/en';
// import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
//
// const localization = {
//   options: {
//     defaultLanguage: 'en',
//   },
//   translations: {
//     ru: ru,
//     be: ru,
//     uk: ru,
//     az: ru,
//     en: en,
//   },
//   currentActiveLanguage: undefined,
// };
//
// export const useTranslation = () => {
//   if (!localization.currentActiveLanguage) {
//     const initialLocales = RNLocalize.getLocales();
//     localization.currentActiveLanguage = localization.options.defaultLanguage;
//     if (
//       initialLocales.length &&
//       localization.translations[initialLocales[0].languageCode]
//     ) {
//       localization.currentActiveLanguage = initialLocales[0].languageCode;
//     }
//   }
//
//   const [language, setLanguage] = useState(localization.currentActiveLanguage);
//
//   useEffect(() => {
//     const changeLocaleHandler = () => {
//       const locales = RNLocalize.getLocales();
//       if (locales.length) {
//         const languageCode = locales[0].languageCode;
//
//         if (localization.translations[languageCode]) {
//           localization.currentActiveLanguage = languageCode;
//           setLanguage(localization.currentActiveLanguage);
//         }
//       }
//     };
//
//     RNLocalize.addEventListener('change', changeLocaleHandler);
//
//     return () => {
//       RNLocalize.removeEventListener('change', changeLocaleHandler);
//     };
//   }, []);
//
//   const t = (pattern) => {
//     return localization.translations[language][pattern];
//   };
//
//   return {t, language};
// };

// import {useState, useEffect} from 'react';
// import * as RNLocalize from 'react-native-localize';
// import {ru} from './translations/ru';
// import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
// import {en} from './translations/en';
//
// const localization = {
//   options: {
//     defaultLanguage: 'ru',
//   },
//   translations: {
//     ru: ru,
//     en: en,
//   },
//   currentActiveLanguage: undefined,
// };
//
// export const useTranslation = () => {
//   const initialLocales = RNLocalize.getLocales();
//   let initialLanguageCode = localization.options.defaultLanguage;
//   if (
//     initialLocales.length &&
//     localization.translations[initialLocales[0].languageCode]
//   ) {
//     initialLanguageCode = initialLocales[0].languageCode;
//   }
//
//   const [language, setLanguage] = useState(initialLanguageCode);
//
//   useEffect(() => {
//     const changeLocaleHandler = () => {
//       const locales = RNLocalize.getLocales();
//       if (locales.length) {
//         const languageCode = locales[0].languageCode;
//
//         if (localization.translations[languageCode]) {
//           setLanguage(languageCode);
//         }
//       }
//     };
//
//     RNLocalize.addEventListener('change', changeLocaleHandler);
//
//     return () => {
//       RNLocalize.removeEventListener('change', changeLocaleHandler);
//     };
//   }, []);
//
//   const t = (pattern) => {
//     return localization.translations[language][pattern];
//   };
//
//   return {t, language};
// };
