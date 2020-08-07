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
  SET_CHANGE_CATEGORY_LIST_UPDATE_RUNNING,
  SET_DATA_LOADING,
  SET_REMOVE_ALL_PRODUCTS_DIALOG_VISIBILITY,
  SET_RENAME_LIST_DIALOG_VISIBILITY,
  SET_SELECTED_CATEGORY_ID,
  SET_SHARE_BUTTON_VISIBILITY,
  SET_SHARE_PANEL_VISIBILITY,
  SET_USED_CATEGORIES,
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
  canRemove,
}) => {
  return {
    type: OPEN_EDIT_CATEGORY_DIALOG,
    payload: {
      productInputAreaState,
      category,
      canRemove,
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

export const pla_openEditUnitDialog = ({
  productInputAreaState,
  unit,
  canRemove,
}) => {
  return {
    type: OPEN_EDIT_UNIT_DIALOG,
    payload: {productInputAreaState, unit, canRemove},
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

export const pla_setUsedCategories = ({categories}) => {
  return {
    type: SET_USED_CATEGORIES,
    payload: {categories},
  };
};

export const pla_setSelectedCategoryId = ({id}) => {
  return {
    type: SET_SELECTED_CATEGORY_ID,
    payload: {id},
  };
};

export const pla_setShareButtonVisibility = ({visible}) => {
  return {
    type: SET_SHARE_BUTTON_VISIBILITY,
    payload: {visible},
  };
};

export const pla_setSharePanelVisibility = ({visible}) => {
  return {
    type: SET_SHARE_PANEL_VISIBILITY,
    payload: {visible},
  };
};

export const pla_setRenameListDialogVisibility = ({visible}) => {
  return {
    type: SET_RENAME_LIST_DIALOG_VISIBILITY,
    payload: {visible},
  };
};

export const pla_setRemoveAllProductsDialogVisibility = ({visible}) => {
  return {
    type: SET_REMOVE_ALL_PRODUCTS_DIALOG_VISIBILITY,
    payload: {visible},
  };
};

export const pla_setChangeCategoryListUpdateRunning = ({running}) => {
  return {
    type: SET_CHANGE_CATEGORY_LIST_UPDATE_RUNNING,
    payload: {running},
  };
};
