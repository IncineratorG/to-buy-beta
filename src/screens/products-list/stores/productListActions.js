import {
  CLOSE_ADD_CATEGORY_DIALOG,
  CLOSE_EDIT_CATEGORY_DIALOG,
  HIDE_PRODUCT_INPUT_AREA,
  OPEN_ADD_CATEGORY_DIALOG,
  OPEN_EDIT_CATEGORY_DIALOG,
  OPEN_PRODUCT_INPUT_AREA,
  SET_DATA_LOADING,
} from './types/productListActionTypes';

export const pla_setDataLoading = ({dataLoading}) => {
  return {
    type: SET_DATA_LOADING,
    payload: {dataLoading},
  };
};

export const pla_openProductInputArea = () => {
  return {
    type: OPEN_PRODUCT_INPUT_AREA,
    payload: undefined,
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
