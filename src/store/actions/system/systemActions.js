import {
  SYSTEM_LANGUAGE_SET,
  UPDATE_SYSTEM_LANGUAGE,
} from '../../types/system/systemTypes';

export const updateSystemLanguageAction = () => {
  return {
    type: UPDATE_SYSTEM_LANGUAGE,
    payload: undefined,
  };
};

export const systemLanguageSetAction = ({languageCode}) => {
  return {
    type: SYSTEM_LANGUAGE_SET,
    payload: {languageCode},
  };
};
