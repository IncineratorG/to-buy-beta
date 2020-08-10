import {
  HIDE_INPUT_AREA,
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
  SET_CATEGORY,
  SET_NOTE,
  SET_PREDEFINED_DATA,
  SET_PREDEFINED_STATE,
  SET_PRODUCT_NAME,
  SET_PRODUCT_SUGGESTIONS,
  SET_QUANTITY,
  SET_UNIT,
  SUBMIT_VALUES,
} from './types/productInputAreaActionTypes';
import {SystemEventsHandler} from '../../../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../assets/icons';
import ProductInputType from './types/productInputAreaProductInputTypes';
import productInputAcceptable from './helpers/productInputAcceptable';

function productInputAreaReducer(state, action) {
  switch (action.type) {
    case HIDE_INPUT_AREA: {
      SystemEventsHandler.onInfo({
        info: 'productInputAreaReducer(): HIDE_INPUT_AREA',
      });

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          type: ProductInputType.PRODUCT_NAME,
          keyboardType: 'default',
          icon: icons.title,
          placeholder: 'ProductMainInput_placeholderProductName',
          values: {
            productName: '',
            quantity: '',
            note: '',
            acceptable: false,
          },
          selectedCategory: undefined,
          selectedUnit: undefined,
          // productSuggestions: {
          //   suggestions: [],
          // },
        },
      };
    }

    case SET_PREDEFINED_STATE: {
      return {...state, ...action.payload.state};
    }

    case SET_PREDEFINED_DATA: {
      const {name, quantity, note, unit, category} = action.payload;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            productName: name.toString(),
            quantity: quantity.toString(),
            note: note.toString(),
            acceptable: productInputAcceptable({
              productName: name,
              quantity,
              note,
            }),
          },
          selectedCategory: {...category},
          selectedUnit: {...unit},
        },
      };
    }

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
      const productName = action.payload.name;
      const quantity = state.currentInput.values.quantity;
      const note = state.currentInput.values.note;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            productName: action.payload.name,
            acceptable: productInputAcceptable({productName, quantity, note}),
          },
        },
      };
    }

    case SET_QUANTITY: {
      const productName = state.currentInput.values.productName;
      const quantity = action.payload.quantity;
      const note = state.currentInput.values.note;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            quantity: action.payload.quantity,
            acceptable: productInputAcceptable({productName, quantity, note}),
          },
        },
      };
    }

    case SET_NOTE: {
      const productName = state.currentInput.values.productName;
      const quantity = state.currentInput.values.quantity;
      const note = action.payload.note;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            note: action.payload.note,
            acceptable: productInputAcceptable({productName, quantity, note}),
          },
        },
      };
    }

    case SET_CATEGORY: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          selectedCategory: {...action.payload.category},
        },
      };
    }

    case SET_UNIT: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          selectedUnit: {...action.payload.unit},
        },
      };
    }

    case SUBMIT_VALUES: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          type: ProductInputType.PRODUCT_NAME,
          keyboardType: 'default',
          icon: icons.title,
          placeholder: 'ProductMainInput_placeholderProductName',
          values: {
            productName: '',
            quantity: '',
            note: '',
            acceptable: false,
          },
          // productSuggestions: {
          //   ...state.currentInput.productSuggestions,
          //   suggestions: [],
          // },
        },
        // selectedCategory: undefined,
        // selectedUnit: undefined,
      };
    }

    case SET_PRODUCT_SUGGESTIONS: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          productSuggestions: {
            ...state.currentInput.productSuggestions,
            suggestions: [...action.payload.suggestions],
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
