import {
  CLEAR_PRODUCTS_SUGGESTIONS,
  SUGGEST_PRODUCTS_BEGIN,
  SUGGEST_PRODUCTS_ERROR,
  SUGGEST_PRODUCTS_FINISHED,
} from '../../types/product-suggestion/productSuggestionTypes';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  productSuggestions: {
    suggestions: [],
    inProgress: false,
    error: {
      hasError: false,
      description: '',
    },
  },
};

export const productSuggestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PRODUCTS_SUGGESTIONS: {
      return {
        ...state,
        productSuggestions: {
          ...state.productSuggestions,
          suggestions: [],
          inProgress: false,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case SUGGEST_PRODUCTS_BEGIN: {
      return {
        ...state,
        productSuggestions: {
          ...state.productSuggestions,
          inProgress: true,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case SUGGEST_PRODUCTS_FINISHED: {
      const {suggestedProductsData} = action.payload;

      return {
        ...state,
        productSuggestions: {
          ...state.productSuggestions,
          inProgress: false,
          suggestions: [...suggestedProductsData],
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case SUGGEST_PRODUCTS_ERROR: {
      const {error} = action.payload;

      SystemEventsHandler.onError({
        err: 'SUGGEST_PRODUCT_ERROR->' + error.description,
      });

      return {
        ...state,
        productSuggestions: {
          ...state.productSuggestions,
          suggestions: [],
          inProgress: false,
          error: {
            hasError: true,
            description: error.description,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
