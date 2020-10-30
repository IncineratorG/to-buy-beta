import {
  LOCATE_PRODUCT_BEGIN,
  LOCATE_PRODUCT_ERROR,
  LOCATE_PRODUCT_FINISHED,
} from '../../types/products-location/productsLocationTypes';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  productsLocation: {
    locationUri: undefined,
  },
};

export const productsLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATE_PRODUCT_BEGIN: {
      SystemEventsHandler.onInfo({info: 'LOCATE_PRODUCT_BEGIN'});

      return state;
    }

    case LOCATE_PRODUCT_FINISHED: {
      SystemEventsHandler.onInfo({info: 'LOCATE_PRODUCT_FINISHED'});

      return state;
    }

    case LOCATE_PRODUCT_ERROR: {
      SystemEventsHandler.onInfo({info: 'LOCATE_PRODUCT_ERROR'});

      return state;
    }

    default: {
      return state;
    }
  }
};
