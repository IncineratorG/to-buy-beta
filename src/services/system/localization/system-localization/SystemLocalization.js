import * as RNLocalize from 'react-native-localize';
import translations from '../../../../assets/translations';
import {SystemEventsHandler} from '../../../service-utils/system-events-handler/SystemEventsHandler';

class SystemLocalization {
  static async init() {}

  static getOptimalLanguageCode() {
    const appTranslations = translations;
    const appDefaultLanguage = appTranslations.defaultLanguage;
    const appTranslationsMap = appTranslations.translationsMap;

    const availableTranslationsSet = new Set();
    Object.keys(appTranslationsMap).forEach((key) =>
      availableTranslationsSet.add(key),
    );

    const phoneLocales = RNLocalize.getLocales();
    if (phoneLocales && phoneLocales.length) {
      const firstPhoneLocaleLanguageCode = phoneLocales[0].languageCode;
      if (availableTranslationsSet.has(firstPhoneLocaleLanguageCode)) {
        return firstPhoneLocaleLanguageCode;
      } else {
        return appDefaultLanguage;
      }
    }

    if (!appDefaultLanguage) {
      SystemEventsHandler.onError({
        err:
          'SystemLocalization->getOptimalLanguageCode(): NO_DEFAULT_LANGUAGE',
      });
    }

    return appDefaultLanguage;
  }

  static getAvailableLanguageCodes() {
    const appTranslations = translations;
    const uniqueLanguageCodes = appTranslations.uniqueLanguages;

    const uniqueLanguagesArray = [];
    Object.keys(uniqueLanguageCodes).forEach((key) =>
      uniqueLanguagesArray.push(key),
    );

    return uniqueLanguagesArray;
  }
}

export default SystemLocalization;
