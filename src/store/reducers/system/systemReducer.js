import {SYSTEM_LANGUAGE_SET} from '../../types/system/systemTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  system: {
    localization: {
      currentLanguageCode: '',
    },
  },
};

export const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_LANGUAGE_SET: {
      return {
        ...state,
        system: {
          ...state.system,
          localization: {
            ...state.system.localization,
            currentLanguageCode: action.payload.languageCode,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
