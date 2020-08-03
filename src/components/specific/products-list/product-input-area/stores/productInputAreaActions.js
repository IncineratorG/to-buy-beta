import {
  HIDE_INPUT_AREA,
  SELECT_PRODUCT_NAME,
  SELECT_PRODUCT_NOTE,
  SELECT_PRODUCT_QUANTITY,
  SET_CATEGORY,
  SET_NOTE,
  SET_PREDEFINED_DATA,
  SET_PREDEFINED_STATE,
  SET_PRODUCT_NAME,
  SET_PRODUCT_SUGGESTIONS,
  SET_QUANTITY,
  SET_UNIT,
  SUBMIT_VALUES,
} from './types/productInputAreaActionTypes';

export const piaa_hideInputArea = () => {
  return {
    type: HIDE_INPUT_AREA,
    payload: undefined,
  };
};

export const piaa_setPredefinedState = ({state}) => {
  return {
    type: SET_PREDEFINED_STATE,
    payload: {state},
  };
};

export const piaa_setPredefinedData = ({
  name,
  quantity,
  note,
  unit,
  category,
}) => {
  return {
    type: SET_PREDEFINED_DATA,
    payload: {name, quantity, note, unit, category},
  };
};

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

export const piaa_setCategory = ({category}) => {
  return {
    type: SET_CATEGORY,
    payload: {category},
  };
};

export const piaa_setUnit = ({unit}) => {
  return {
    type: SET_UNIT,
    payload: {unit},
  };
};

export const piaa_submitValues = () => {
  return {
    type: SUBMIT_VALUES,
    payload: undefined,
  };
};

export const piaa_setProductSuggestions = ({suggestions}) => {
  return {
    type: SET_PRODUCT_SUGGESTIONS,
    payload: {suggestions},
  };
};
