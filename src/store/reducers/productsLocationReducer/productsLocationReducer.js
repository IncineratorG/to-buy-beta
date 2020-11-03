import {
  LOCATE_PRODUCT_BEGIN,
  LOCATE_PRODUCT_ERROR,
  LOCATE_PRODUCT_FINISHED,
  MAP_PROVIDER_SET,
} from '../../types/products-location/productsLocationTypes';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const initialState = {
  productsLocation: {
    locationUri: undefined,
    error: {
      hasError: false,
      description: '',
    },
    mapProviders: {
      currentMapProviderType: '',
      availableMapProviderTypes: [],
    },
  },
};

export const productsLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_PROVIDER_SET: {
      return {
        ...state,
        productsLocation: {
          ...state.productsLocation,
          mapProviders: {
            ...state.productsLocation.mapProviders,
            currentMapProviderType: action.payload.mapProviderType,
            availableMapProviderTypes: [
              ...action.payload.availableMapProviderTypes,
            ],
          },
        },
      };
    }

    case LOCATE_PRODUCT_BEGIN: {
      SystemEventsHandler.onInfo({info: 'LOCATE_PRODUCT_BEGIN'});

      return {
        ...state,
        productsLocation: {
          ...state.productsLocation,
          locationUri: undefined,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOCATE_PRODUCT_FINISHED: {
      SystemEventsHandler.onInfo({info: 'LOCATE_PRODUCT_FINISHED'});

      const {locationUri} = action.payload;

      return {
        ...state,
        productsLocation: {
          ...state.productsLocation,
          locationUri: locationUri,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOCATE_PRODUCT_ERROR: {
      SystemEventsHandler.onInfo({info: 'LOCATE_PRODUCT_ERROR'});

      return {
        ...state,
        productsLocation: {
          ...state.productsLocation,
          locationUri: undefined,
          error: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
