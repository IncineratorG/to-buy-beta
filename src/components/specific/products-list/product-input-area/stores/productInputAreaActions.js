import {
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
  SET_NOTE,
  SET_PRODUCT_NAME,
  SET_QUANTITY,
  SUBMIT_VALUES,
} from './types/productInputAreaActionTypes';

export const piaa_selectProductNameType = () => {
  return {
    type: SELECT_PRODUCT_NAME,
    payload: undefined,
  };
};

export const piaa_selectProductQuantityType = () => {
  return {
    type: SELECT_PRODUCT_QUANTITY,
    payload: undefined,
  };
};

export const piaa_selectProductNoteType = () => {
  return {
    type: SELECT_PRODUCT_NOTE,
    payload: undefined,
  };
};

export const piaa_setProductName = ({name}) => {
  return {
    type: SET_PRODUCT_NAME,
    payload: {name},
  };
};

export const piaa_setQuantity = ({quantity}) => {
  return {
    type: SET_QUANTITY,
    payload: {quantity},
  };
};

export const piaa_setNote = ({note}) => {
  return {
    type: SET_NOTE,
    payload: {note},
  };
};

export const piaa_submitValues = () => {
  return {
    type: SUBMIT_VALUES,
    payload: undefined,
  };
};
