import {
  HIDE_INPUT_AREA,
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
  SET_CATEGORY,
  SET_CURRENT_INPUT_PRODUCTS_SUGGESTIONS,
  SET_CURRENT_PRODUCTS_LIST,
  SET_NOTE,
  SET_PREDEFINED_DATA,
  SET_PREDEFINED_STATE,
  SET_PRODUCT_NAME,
  SET_QUANTITY,
  SET_RANDOM_PRODUCTS_SUGGESTIONS,
  SET_UNIT,
  SET_VOICE_INPUT_SERVICE_AVAILABILITY,
  SUBMIT_VALUES,
} from './types/productInputAreaActionTypes';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import {icons} from '../../../../../assets/icons';
import ProductInputType from './types/productInputAreaProductInputTypes';
import productInputAcceptable from './helpers/productInputAcceptable';

function productInputAreaReducer(state, action) {
  switch (action.type) {
    case HIDE_INPUT_AREA: {
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
        },
      };
    }

    case SET_PREDEFINED_STATE: {
      return {...state, ...action.payload.state};
    }

    case SET_CURRENT_PRODUCTS_LIST: {
      const productsNamesSet = new Set();
      action.payload.productsList.forEach((product) => {
        productsNamesSet.add(product.name);
      });

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          productsList: action.payload.productsList
            ? [...action.payload.productsList]
            : [],
          productsNamesSet,
        },
      };
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
              productsNames: state.currentInput.productsNamesSet,
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
      const productsNames = state.currentInput.productsNamesSet;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            productName: action.payload.name,
            acceptable: productInputAcceptable({
              productName,
              quantity,
              note,
              productsNames,
            }),
          },
        },
      };
    }

    case SET_QUANTITY: {
      const productName = state.currentInput.values.productName;
      const quantity = action.payload.quantity;
      const note = state.currentInput.values.note;
      const productsNames = state.currentInput.productsNamesSet;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            quantity: action.payload.quantity,
            acceptable: productInputAcceptable({
              productName,
              quantity,
              note,
              productsNames,
            }),
          },
        },
      };
    }

    case SET_NOTE: {
      const productName = state.currentInput.values.productName;
      const quantity = state.currentInput.values.quantity;
      const note = action.payload.note;
      const productsNames = state.currentInput.productsNamesSet;

      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          values: {
            ...state.currentInput.values,
            note: action.payload.note,
            acceptable: productInputAcceptable({
              productName,
              quantity,
              note,
              productsNames,
            }),
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
        },
      };
    }

    // case SET_PRODUCT_SUGGESTIONS: {
    //   return {
    //     ...state,
    //     currentInput: {
    //       ...state.currentInput,
    //       productSuggestions: {
    //         ...state.currentInput.productSuggestions,
    //         suggestions: [...action.payload.suggestions],
    //       },
    //     },
    //   };
    // }

    case SET_CURRENT_INPUT_PRODUCTS_SUGGESTIONS: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          suggestions: {
            ...state.currentInput.suggestions,
            productSuggestions: {
              ...state.currentInput.suggestions.productSuggestions,
              currentInputSuggestions: action.payload.suggestions
                ? [...action.payload.suggestions]
                : [],
            },
          },
        },
      };
    }

    case SET_RANDOM_PRODUCTS_SUGGESTIONS: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          suggestions: {
            ...state.currentInput.suggestions,
            productSuggestions: {
              ...state.currentInput.suggestions.productSuggestions,
              randomSuggestions: action.payload.suggestions
                ? [...action.payload.suggestions]
                : [],
            },
          },
        },
      };
    }

    case SET_VOICE_INPUT_SERVICE_AVAILABILITY: {
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          voiceInput: {
            ...state.currentInput.voiceInput,
            serviceAvailable: action.payload.isAvailable,
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
