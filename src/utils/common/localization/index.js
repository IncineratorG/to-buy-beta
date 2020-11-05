import {useSelector} from 'react-redux';
import translations from '../../../assets/translations';
import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';

export const useTranslation = () => {
  const appTranslations = translations;

  const currentLanguageCode = useSelector(
    (state) => state.system.system.localization.currentLanguageCode,
  );

  const t = (pattern) => {
    if (appTranslations.translationsMap[currentLanguageCode][pattern]) {
      return appTranslations.translationsMap[currentLanguageCode][pattern];
    }

    return '';
  };

  return {t, language: currentLanguageCode};
};
