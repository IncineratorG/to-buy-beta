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
  unitId,
  note,
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
