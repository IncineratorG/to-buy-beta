import {
  CLOSE_ADD_CATEGORY_DIALOG,
  CLOSE_ADD_UNIT_DIALOG,
  CLOSE_EDIT_CATEGORY_DIALOG,
  CLOSE_EDIT_UNIT_DIALOG,
  CLOSE_REMOVE_PRODUCT_DIALOG,
  HIDE_PRODUCT_INPUT_AREA,
  OPEN_ADD_CATEGORY_DIALOG,
  OPEN_ADD_UNIT_DIALOG,
  OPEN_EDIT_CATEGORY_DIALOG,
  OPEN_EDIT_UNIT_DIALOG,
  OPEN_PRODUCT_INPUT_AREA_IN_CREATE_MODE,
  OPEN_PRODUCT_INPUT_AREA_IN_EDIT_MODE,
  OPEN_REMOVE_PRODUCT_DIALOG,
  SET_DATA_LOADING,
} from './types/productListActionTypes';

export const pla_setDataLoading = ({dataLoading}) => {
  return {
    type: SET_DATA_LOADING,
    payload: {dataLoading},
  };
};

export const pla_openProductInputAreaInCreateMode = () => {
  return {
    type: OPEN_PRODUCT_INPUT_AREA_IN_CREATE_MODE,
    payload: undefined,
  };
};

export const pla_openProductInputAreaInEditMode = ({
  shoppingListId,
  productId,
  name,
  quantity,
  note,
  unitId,
  categoryId,
}) => {
  return {
    type: OPEN_PRODUCT_INPUT_AREA_IN_EDIT_MODE,
    payload: {
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

export const pla_hideProductInputArea = () => {
  return {
    type: HIDE_PRODUCT_INPUT_AREA,
    payload: undefined,
  };
};

export const pla_openAddCategoryDialog = ({productInputAreaState}) => {
  return {
    type: OPEN_ADD_CATEGORY_DIALOG,
    payload: {productInputAreaState},
  };
};

export const pla_closeAddCategoryDialog = () => {
  return {
    type: CLOSE_ADD_CATEGORY_DIALOG,
    payload: undefined,
  };
};

export const pla_openEditCategoryDialog = ({
  productInputAreaState,
  category,
}) => {
  return {
    type: OPEN_EDIT_CATEGORY_DIALOG,
    payload: {
      productInputAreaState,
      category,
    },
  };
};

export const pla_closeEditCategoryDialog = () => {
  return {
    type: CLOSE_EDIT_CATEGORY_DIALOG,
    payload: undefined,
  };
};

export const pla_openAddUnitDialog = ({productInputAreaState}) => {
  return {
    type: OPEN_ADD_UNIT_DIALOG,
    payload: {productInputAreaState},
  };
};

export const pla_closeAddUnitDialog = () => {
  return {
    type: CLOSE_ADD_UNIT_DIALOG,
    payload: undefined,
  };
};

export const pla_openEditUnitDialog = ({productInputAreaState, unit}) => {
  return {
    type: OPEN_EDIT_UNIT_DIALOG,
    payload: {productInputAreaState, unit},
  };
};

export const pla_closeEditUnitDialog = () => {
  return {
    type: CLOSE_EDIT_UNIT_DIALOG,
    payload: undefined,
  };
};

export const pla_openRemoveProductDialog = ({
  shoppingListId,
  productId,
  productName,
}) => {
  return {
    type: OPEN_REMOVE_PRODUCT_DIALOG,
    payload: {shoppingListId, productId, productName},
  };
};

export const pla_closeRemoveProductDialog = () => {
  return {
    type: CLOSE_REMOVE_PRODUCT_DIALOG,
    payload: undefined,
  };
};
