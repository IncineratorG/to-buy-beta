import {
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_CONFIRMED,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_CREATED,
  CLEAR_PRODUCTS_LIST_CACHED_DATA,
  LOAD_PRODUCTS_LIST_BEGIN,
  LOAD_PRODUCTS_LIST_ERROR,
  LOAD_PRODUCTS_LIST_FINISHED,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_UPDATED,
  UPDATE_PRODUCT_CONFIRMED,
  UPDATE_PRODUCT_ERROR,
  CHANGE_PRODUCT_STATUS_BEGIN,
  CHANGE_PRODUCT_STATUS_CHANGED,
  CHANGE_PRODUCT_STATUS_CONFIRMED,
  CHANGE_PRODUCT_STATUS_ERROR,
  REMOVE_PRODUCT_BEGIN,
  REMOVE_PRODUCT_REMOVED,
  REMOVE_PRODUCT_CONFIRMED,
  REMOVE_PRODUCT_ERROR,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_BEGIN,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_CHANGED,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_CONFIRMED,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_ERROR,
  REMOVE_MULTIPLE_PRODUCTS_BEGIN,
  REMOVE_MULTIPLE_PRODUCTS_REMOVED,
  REMOVE_MULTIPLE_PRODUCTS_CONFIRMED,
  REMOVE_MULTIPLE_PRODUCTS_ERROR,
} from '../../types/products-list/productsListTypes';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import productsComparator from './helpers/productsComparator';
import {RENAME_SHOPPING_LIST_FINISHED} from '../../types/shopping-lists/shoppingListsTypes';

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

      const products = [...action.payload.productsList.products].sort(
        productsComparator,
      );

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

      const products = [...state.productsList.products, product].sort(
        productsComparator,
      );

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
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
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case UPDATE_PRODUCT_BEGIN: {
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

    case UPDATE_PRODUCT_UPDATED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const updatedProduct = action.payload.product;

      const products = state.productsList.products.map((product) => {
        if (product.id === updatedProduct.id) {
          return {
            ...updatedProduct,
            confirmationStatus: {
              awaitConfirmation: true,
              confirmed: false,
            },
          };
        }
        return product;
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case UPDATE_PRODUCT_CONFIRMED: {
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

    case UPDATE_PRODUCT_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer->UPDATE_PRODUCT_ERROR',
      });

      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          updating: false,
          updatingError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case CHANGE_PRODUCT_STATUS_BEGIN: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const updatedProductId = action.payload.productId;

      const products = state.productsList.products.map((product) => {
        if (product.id === updatedProductId) {
          return {
            ...product,
            confirmationStatus: {
              awaitConfirmation: true,
              confirmed: false,
            },
          };
        }
        return product;
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case CHANGE_PRODUCT_STATUS_CHANGED: {
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

    case CHANGE_PRODUCT_STATUS_CONFIRMED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const confirmed = action.payload.confirmed;

      const products = state.productsList.products.map((product) => {
        if (product.id === action.payload.product.id) {
          return {
            ...action.payload.product,
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

    case CHANGE_PRODUCT_STATUS_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer->CHANGE_PRODUCT_STATUS_ERROR',
      });

      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          updating: false,
          updatingError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case CHANGE_MULTIPLE_PRODUCTS_STATUS_BEGIN: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const updatedProductsIdsSet = new Set(action.payload.productsIdsArray);

      const products = state.productsList.products.map((product) => {
        if (updatedProductsIdsSet.has(product.id)) {
          return {
            ...product,
            confirmationStatus: {
              awaitConfirmation: true,
              confirmed: false,
            },
          };
        }
        return product;
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case CHANGE_MULTIPLE_PRODUCTS_STATUS_CHANGED: {
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

    case CHANGE_MULTIPLE_PRODUCTS_STATUS_CONFIRMED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const confirmed = action.payload.confirmed;
      const confirmedProductsArray = action.payload.productsArray;

      const confirmedProductsMap = new Map();
      confirmedProductsArray.forEach((product) => {
        confirmedProductsMap.set(product.id, product);
      });

      const products = state.productsList.products.map((product) => {
        if (confirmedProductsMap.has(product.id)) {
          return {
            ...confirmedProductsMap.get(product.id),
            confirmationStatus: {
              awaitConfirmation: false,
              confirmed: confirmed,
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

    case CHANGE_MULTIPLE_PRODUCTS_STATUS_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer->CHANGE_MULTIPLE_PRODUCTS_STATUS_ERROR',
      });

      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          updating: false,
          updatingError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case REMOVE_PRODUCT_BEGIN: {
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

    case REMOVE_PRODUCT_REMOVED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const removedProductId = action.payload.productId;

      const products = state.productsList.products.map((product) => {
        if (product.id === removedProductId) {
          return {
            ...product,
            confirmationStatus: {
              awaitConfirmation: true,
              confirmed: false,
            },
          };
        }
        return product;
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case REMOVE_PRODUCT_CONFIRMED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const removedProductId = action.payload.productId;
      const confirmed = action.payload.confirmed;

      let products = [];
      if (confirmed) {
        products = state.productsList.products.filter(
          (product) => product.id !== removedProductId,
        );
      } else {
        products = state.productsList.products.map((product) => {
          if (product.id === removedProductId) {
            return {
              ...product,
              confirmationStatus: {
                awaitConfirmation: false,
                confirmed: false,
              },
            };
          }
          return product;
        });
      }

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

    case REMOVE_PRODUCT_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer->REMOVE_PRODUCT_ERROR',
      });

      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          updating: false,
          updatingError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case REMOVE_MULTIPLE_PRODUCTS_BEGIN: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const removedProductsIdsSet = new Set(action.payload.productsIdsArray);

      const products = state.productsList.products.map((product) => {
        if (removedProductsIdsSet.has(product.id)) {
          return {
            ...product,
            confirmationStatus: {
              awaitConfirmation: true,
              confirmed: false,
            },
          };
        }
        return product;
      });

      return {
        ...state,
        productsList: {
          ...state.productsList,
          updating: true,
          updatingError: {
            hasError: false,
            description: '',
          },
          products,
        },
      };
    }

    case REMOVE_MULTIPLE_PRODUCTS_REMOVED: {
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

    case REMOVE_MULTIPLE_PRODUCTS_CONFIRMED: {
      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      const confirmed = action.payload.confirmed;
      const removedProductsIdsSet = new Set(action.payload.productsIdsArray);

      let products = [];
      if (confirmed) {
        products = state.productsList.products.filter(
          (product) => !removedProductsIdsSet.has(product.id),
        );
      } else {
        products = state.productsList.products.map((product) => {
          if (removedProductsIdsSet.has(product.id)) {
            return {
              ...product,
              confirmationStatus: {
                awaitConfirmation: false,
                confirmed: false,
              },
            };
          }
          return product;
        });
      }

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

    case REMOVE_MULTIPLE_PRODUCTS_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'productsListReducer->REMOVE_MULTIPLE_PRODUCTS_ERROR',
      });

      if (action.payload.shoppingListId !== state.productsList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          updating: false,
          updatingError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case RENAME_SHOPPING_LIST_FINISHED: {
      const {shoppingList} = action.payload;
      if (state.productsList.id !== shoppingList.id) {
        return state;
      }

      return {
        ...state,
        productsList: {
          ...state.productsList,
          name: shoppingList.name,
        },
      };
    }

    default: {
      return state;
    }
  }
};
