import {
  ADD_PRODUCT,
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_CONFIRMED,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_CREATED,
  CLEAR_PRODUCTS_LIST_CACHED_DATA,
  LOAD_PRODUCTS_LIST,
  LOAD_PRODUCTS_LIST_BEGIN,
  LOAD_PRODUCTS_LIST_ERROR,
  LOAD_PRODUCTS_LIST_FINISHED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_UPDATED,
  UPDATE_PRODUCT_CONFIRMED,
  UPDATE_PRODUCT_ERROR,
  CHANGE_PRODUCT_STATUS,
  CHANGE_PRODUCT_STATUS_BEGIN,
  CHANGE_PRODUCT_STATUS_CHANGED,
  CHANGE_PRODUCT_STATUS_CONFIRMED,
  CHANGE_PRODUCT_STATUS_ERROR,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_BEGIN,
  REMOVE_PRODUCT_REMOVED,
  REMOVE_PRODUCT_CONFIRMED,
  REMOVE_PRODUCT_ERROR,
  REMOVE_ALL_PRODUCTS,
  REMOVE_ALL_PRODUCTS_BEGIN,
  REMOVE_ALL_PRODUCTS_REMOVED,
  REMOVE_ALL_PRODUCTS_CONFIRMED,
  REMOVE_ALL_PRODUCTS_ERROR,
  CHANGE_MULTIPLE_PRODUCTS_STATUS,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_BEGIN,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_CHANGED,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_CONFIRMED,
  CHANGE_MULTIPLE_PRODUCTS_STATUS_ERROR,
} from '../../types/products-list/productsListTypes';

export const loadProductsListAction = ({shoppingListId}) => {
  return {
    type: LOAD_PRODUCTS_LIST,
    payload: {
      shoppingListId,
    },
  };
};

export const loadProductsListBeginAction = ({shoppingListId}) => {
  return {
    type: LOAD_PRODUCTS_LIST_BEGIN,
    payload: {
      shoppingListId,
    },
  };
};

export const loadProductsListFinishedAction = ({
  shoppingListId,
  productsList,
}) => {
  return {
    type: LOAD_PRODUCTS_LIST_FINISHED,
    payload: {
      shoppingListId,
      productsList,
    },
  };
};

export const loadProductsListErrorAction = ({shoppingListId, description}) => {
  return {
    type: LOAD_PRODUCTS_LIST_ERROR,
    payload: {
      shoppingListId,
      error: {
        description,
      },
    },
  };
};

export const clearProductsListCachedData = () => {
  return {
    type: CLEAR_PRODUCTS_LIST_CACHED_DATA,
    payload: undefined,
  };
};

export const addProductAction = ({
  editor,
  shoppingListId,
  name,
  quantity,
  note,
  unitId,
  categoryId,
}) => {
  return {
    type: ADD_PRODUCT,
    payload: {
      editor,
      shoppingListId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
    },
  };
};

export const addProductBeginAction = ({shoppingListId}) => {
  return {
    type: ADD_PRODUCT_BEGIN,
    payload: {shoppingListId},
  };
};

export const addProductCreatedAction = ({shoppingListId, product}) => {
  return {
    type: ADD_PRODUCT_CREATED,
    payload: {
      shoppingListId,
      product,
    },
  };
};

export const addProductConfirmedAction = ({
  shoppingListId,
  product,
  confirmed,
}) => {
  return {
    type: ADD_PRODUCT_CONFIRMED,
    payload: {
      shoppingListId,
      product,
      confirmed,
    },
  };
};

export const addProductErrorAction = ({shoppingListId, description}) => {
  return {
    type: ADD_PRODUCT_ERROR,
    payload: {
      shoppingListId,
      error: {
        description,
      },
    },
  };
};

export const updateProductAction = ({
  editor,
  shoppingListId,
  productId,
  name,
  quantity,
  note,
  unitId,
  categoryId,
}) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      editor,
      shoppingListId,
      productId,
      name,
      quantity,
      note,
      unitId,
      categoryId,
    },
  };
};

export const updateProductBeginAction = ({shoppingListId, productId}) => {
  return {
    type: UPDATE_PRODUCT_BEGIN,
    payload: {shoppingListId, productId},
  };
};

export const updateProductUpdatedAction = ({shoppingListId, product}) => {
  return {
    type: UPDATE_PRODUCT_UPDATED,
    payload: {shoppingListId, product},
  };
};

export const updateProductConfirmedAction = ({
  shoppingListId,
  product,
  confirmed,
}) => {
  return {
    type: UPDATE_PRODUCT_CONFIRMED,
    payload: {shoppingListId, product, confirmed},
  };
};

export const updateProductErrorAction = ({
  shoppingListId,
  productId,
  description,
}) => {
  return {
    type: UPDATE_PRODUCT_ERROR,
    payload: {
      shoppingListId,
      productId,
      error: {
        description,
      },
    },
  };
};

export const changeProductStatusAction = ({
  shoppingListId,
  productId,
  status,
}) => {
  return {
    type: CHANGE_PRODUCT_STATUS,
    payload: {
      shoppingListId,
      productId,
      status,
    },
  };
};

export const changeProductStatusBeginAction = ({shoppingListId, productId}) => {
  return {
    type: CHANGE_PRODUCT_STATUS_BEGIN,
    payload: {shoppingListId, productId},
  };
};

export const changeProductStatusChangedAction = ({shoppingListId, product}) => {
  return {
    type: CHANGE_PRODUCT_STATUS_CHANGED,
    payload: {shoppingListId, product},
  };
};

export const changeProductStatusConfirmedAction = ({
  shoppingListId,
  product,
  confirmed,
}) => {
  return {
    type: CHANGE_PRODUCT_STATUS_CONFIRMED,
    payload: {shoppingListId, product, confirmed},
  };
};

export const changeProductStatusErrorAction = ({
  shoppingListId,
  productId,
  description,
}) => {
  return {
    type: CHANGE_PRODUCT_STATUS_ERROR,
    payload: {shoppingListId, productId, error: {description}},
  };
};

export const removeProductAction = ({shoppingListId, productId}) => {
  return {
    type: REMOVE_PRODUCT,
    payload: {shoppingListId, productId},
  };
};

export const removeProductBeginAction = ({shoppingListId, productId}) => {
  return {
    type: REMOVE_PRODUCT_BEGIN,
    payload: {shoppingListId, productId},
  };
};

export const removeProductRemovedAction = ({shoppingListId, productId}) => {
  return {
    type: REMOVE_PRODUCT_REMOVED,
    payload: {shoppingListId, productId},
  };
};

export const removeProductConfirmedAction = ({
  shoppingListId,
  productId,
  confirmed,
}) => {
  return {
    type: REMOVE_PRODUCT_CONFIRMED,
    payload: {shoppingListId, productId, confirmed},
  };
};

export const removeProductErrorAction = ({
  shoppingListId,
  productId,
  description,
}) => {
  return {
    type: REMOVE_PRODUCT_ERROR,
    payload: {shoppingListId, productId, error: {description}},
  };
};

export const removeAllProductsAction = ({shoppingListId}) => {
  return {
    type: REMOVE_ALL_PRODUCTS,
    payload: {shoppingListId},
  };
};

export const removeAllProductsBeginAction = ({shoppingListId}) => {
  return {
    type: REMOVE_ALL_PRODUCTS_BEGIN,
    payload: {shoppingListId},
  };
};

export const removeAllProductsRemovedAction = ({shoppingListId}) => {
  return {
    type: REMOVE_ALL_PRODUCTS_REMOVED,
    payload: {shoppingListId},
  };
};

export const removeAllProductsConfirmedAction = ({
  shoppingListId,
  confirmed,
}) => {
  return {
    type: REMOVE_ALL_PRODUCTS_CONFIRMED,
    payload: {shoppingListId, confirmed},
  };
};

export const removeAllProductsErrorAction = ({shoppingListId, description}) => {
  return {
    type: REMOVE_ALL_PRODUCTS_ERROR,
    payload: {shoppingListId, error: {description}},
  };
};

export const changeMultipleProductsStatusAction = ({
  shoppingListId,
  productsIdsArray,
  status,
}) => {
  return {
    type: CHANGE_MULTIPLE_PRODUCTS_STATUS,
    payload: {shoppingListId, productsIdsArray, status},
  };
};

export const changeMultipleProductsStatusBeginAction = ({
  shoppingListId,
  productsIdsArray,
  status,
}) => {
  return {
    type: CHANGE_MULTIPLE_PRODUCTS_STATUS_BEGIN,
    payload: {shoppingListId, productsIdsArray, status},
  };
};

export const changeMultipleProductsStatusChangedAction = ({
  shoppingListId,
  productsArray,
}) => {
  return {
    type: CHANGE_MULTIPLE_PRODUCTS_STATUS_CHANGED,
    payload: {shoppingListId, productsArray},
  };
};

export const changeMultipleProductsStatusConfirmedAction = ({
  shoppingListId,
  productsArray,
  confirmed,
}) => {
  return {
    type: CHANGE_MULTIPLE_PRODUCTS_STATUS_CONFIRMED,
    payload: {shoppingListId, productsArray, confirmed},
  };
};

export const changeMultipleProductsStatusErrorAction = ({
  shoppingListId,
  productsIdsArray,
  description,
}) => {
  return {
    type: CHANGE_MULTIPLE_PRODUCTS_STATUS_ERROR,
    payload: {shoppingListId, productsIdsArray, error: {description}},
  };
};
