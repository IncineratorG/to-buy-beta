import {
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
} from './productInputAreaTypes';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../assets/icons';

function productInputAreaReducer(state, action) {
  switch (action.type) {
    case SELECT_PRODUCT_NAME: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          keyboardType: 'default',
          icon: icons.title,
        },
      };
    }

    case SELECT_PRODUCT_QUANTITY: {
      SystemEventsHandler.onInfo({info: 'SELECT_PRODUCT_QUANTITY'});
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          keyboardType: 'numeric',
          icon: icons.weight,
        },
      };
    }

    case SELECT_PRODUCT_NOTE: {
      SystemEventsHandler.onInfo({info: 'SELECT_PRODUCT_NOTE'});
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          keyboardType: 'default',
          icon: icons.note,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default productInputAreaReducer;
