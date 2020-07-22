import {
  CHECK_SHARE_AVAILABILITY_BEGIN,
  CHECK_SHARE_AVAILABILITY_ERROR,
  SET_SHARE_AVAILABILITY,
} from '../../types/share/shareTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  share: {
    availability: {
      checking: false,
      checkingError: {
        hasError: false,
        description: '',
      },
      smsSharingSupported: false,
      whatsAppSharingSupported: false,
    },
  },
};

export const shareReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHARE_AVAILABILITY: {
      SystemEventsHandler.onInfo({info: 'HERE'});

      return {
        ...state,
        share: {
          ...state.share,
          availability: {
            ...state.share.availability,
            checking: false,
            checkingError: {
              hasError: false,
              description: '',
            },
            smsSharingSupported: action.payload.smsSharingSupported,
            whatsAppSharingSupported: action.payload.whatsAppSharingSupported,
          },
        },
      };
    }

    case CHECK_SHARE_AVAILABILITY_BEGIN: {
      return {
        ...state,
        share: {
          ...state.share,
          availability: {
            ...state.share.availability,
            checking: true,
            checkingError: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case CHECK_SHARE_AVAILABILITY_ERROR: {
      return {
        ...state,
        share: {
          ...state.share,
          availability: {
            ...state.share.availability,
            checking: false,
            checkingError: {
              hasError: true,
              description: action.payload.error.description,
            },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
