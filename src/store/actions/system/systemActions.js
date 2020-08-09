import {
  SET_SYSTEM_LANGUAGE,
  SYSTEM_LANGUAGE_SET,
  UPDATE_SYSTEM_LANGUAGE,
} from '../../types/system/systemTypes';

export const updateSystemLanguageAction = () => {
  return {
    type: UPDATE_SYSTEM_LANGUAGE,
    payload: undefined,
  };
};

export const setSystemLanguageAction = ({languageCode}) => {
  return {
    type: SET_SYSTEM_LANGUAGE,
    payload: {languageCode},
  };
};

export const systemLanguageSetAction = ({
  languageCode,
  availableLanguageCodes,
}) => {
  return {
    type: SYSTEM_LANGUAGE_SET,
    payload: {languageCode, availableLanguageCodes},
  };
};
