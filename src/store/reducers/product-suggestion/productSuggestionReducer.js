import {
  CLEAR_PRODUCTS_SUGGESTIONS,
  SUGGEST_PRODUCTS_BEGIN,
  SUGGEST_PRODUCTS_ERROR,
  SUGGEST_PRODUCTS_FINISHED,
} from '../../types/product-suggestion/productSuggestionTypes';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

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

    // ===
    // case SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_BEGIN: {
    //   SystemEventsHandler.onInfo({
    //     info: 'SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_BEGIN',
    //   });
    //   return state;
    // }
    //
    // case SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_FINISHED: {
    //   SystemEventsHandler.onInfo({
    //     info: 'SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_FINISHED',
    //   });
    //   return state;
    // }
    //
    // case SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_ERROR: {
    //   SystemEventsHandler.onInfo({
    //     info: 'SUGGEST_PRODUCTS_BASED_ON_CURRENT_PRODUCTS_LIST_ERROR',
    //   });
    //   return state;
    // }
    //
    // case SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_BEGIN: {
    //   SystemEventsHandler.onInfo({
    //     info: 'SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_BEGIN',
    //   });
    //   return state;
    // }
    //
    // case SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_FINISHED: {
    //   SystemEventsHandler.onInfo({
    //     info: 'SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_FINISHED',
    //   });
    //   return state;
    // }
    //
    // case SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_ERROR: {
    //   SystemEventsHandler.onInfo({
    //     info: 'SUGGEST_PRODUCTS_BASED_ON_PARTIAL_INPUT_ERROR',
    //   });
    //   return state;
    // }
    // ===

    default: {
      return state;
    }
  }
};
