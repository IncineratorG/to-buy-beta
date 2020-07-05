import {
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
  SET_NOTE,
  SET_PRODUCT_NAME,
  SET_QUANTITY,
} from './types/productInputAreaActionTypes';
import {SystemEventsHandler} from '../../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../assets/icons';
import ProductInputType from './types/productInputAreaProductInputTypes';

function productInputAreaReducer(state, action) {
  switch (action.type) {
    case SELECT_PRODUCT_NAME: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          type: ProductInputType.PRODUCT_NAME,
          keyboardType: 'default',
          icon: icons.title,
          placeholder: 'ProductMainInput_placeholderProductName',
        },
      };
    }

    case SELECT_PRODUCT_QUANTITY: {
      SystemEventsHandler.onInfo({info: 'SELECT_PRODUCT_QUANTITY'});
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          type: ProductInputType.QUANTITY,
          keyboardType: 'numeric',
          icon: icons.weight,
          placeholder: 'ProductMainInput_placeholderQuantity',
        },
      };
    }

    case SELECT_PRODUCT_NOTE: {
      SystemEventsHandler.onInfo({info: 'SELECT_PRODUCT_NOTE'});
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          type: ProductInputType.NOTE,
          keyboardType: 'default',
          icon: icons.note,
          placeholder: 'ProductMainInput_placeholderNote',
        },
      };
    }

    case SET_PRODUCT_NAME: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            productName: action.payload.name,
          },
        },
      };
    }

    case SET_QUANTITY: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            quantity: action.payload.quantity,
          },
        },
      };
    }

    case SET_NOTE: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            note: action.payload.note,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default productInputAreaReducer;
