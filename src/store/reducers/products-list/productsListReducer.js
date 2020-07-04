import {
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_CONFIRMED,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_CREATED,
  CLEAR_PRODUCTS_LIST_CACHED_DATA,
  LOAD_PRODUCTS_LIST_BEGIN,
  LOAD_PRODUCTS_LIST_ERROR,
  LOAD_PRODUCTS_LIST_FINISHED,
} from '../../types/products-list/productsListTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  productsList: {
    id: undefined,
    name: '',
    products: [],
    loading: false,
    loadingError: {
      hasError: false,
      description: '',
    },
    updating: false,
    updatingError: {
      hasError: false,
      description: '',
    },
    // ===
    shared: false,
    creator: '',
    receivers: [],
    // ===
  },
};

export const productsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PRODUCTS_LIST_CACHED_DATA: {
      return {
        ...state,
        productsList: {
          ...state.productsList,
          id: undefined,
          name: '',
          products: [],
          loading: false,
          loadingError: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_PRODUCTS_LIST_BEGIN: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer()->LOAD_PRODUCTS_LIST_BEGIN',
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          loading: true,
          loadingError: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_PRODUCTS_LIST_FINISHED: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer()->LOAD_PRODUCTS_LIST_FINISHED',
      });

      const products = [...action.payload.productsList.products];
      // if (products.length) {
      //   products.push({id: 'extra', extra: true});
      // }

      return {
        ...state,
        productsList: {
          ...state.productsList,
          id: action.payload.productsList.id,
          name: action.payload.productsList.name,
          products,
          loading: false,
          loadingError: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_PRODUCTS_LIST_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer()->LOAD_PRODUCTS_LIST_ERROR',
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          loading: false,
          loadingError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case ADD_PRODUCT_BEGIN: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
          updatingError: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case ADD_PRODUCT_CREATED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const product = {...action.payload.product};
      product.confirmationStatus = {
        awaitConfirmation: true,
        confirmed: false,
      };

      const products = [...state.productsList.products, product];

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: false,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case ADD_PRODUCT_CONFIRMED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const productId = action.payload.product.id;
      const confirmed = action.payload.confirmed;

      const products = state.productsList.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            confirmationStatus: {
              awaitConfirmation: false,
              confirmed,
            },
          };
        }
        return product;
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: false,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case ADD_PRODUCT_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer->ADD_PRODUCT_ERROR',
      });

      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          updating: false,
          updatingError: {
            hasError: false,
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
