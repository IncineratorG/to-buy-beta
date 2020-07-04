import {
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
} from './productInputAreaTypes';

export const selectProductNameType = () => {
  return {
    type: SELECT_PRODUCT_NAME,
    payload: undefined,
  };
};

export const selectProductQuantityType = () => {
  return {
    type: SELECT_PRODUCT_QUANTITY,
    payload: undefined,
  };
};

export const selectProductNoteType = () => {
  return {
    type: SELECT_PRODUCT_NOTE,
    payload: undefined,
  };
};
