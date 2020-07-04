import {
  LOAD_UNITS,
  LOAD_UNITS_BEGIN,
  LOAD_UNITS_FINISHED,
  LOAD_UNITS_ERROR,
} from '../../types/units/unitsTypes';

export const loadUnitsAction = ({shoppingListId}) => {
  return {
    type: LOAD_UNITS,
    payload: {
      shoppingListId,
    },
  };
};

export const loadUnitsBeginAction = ({shoppingListId}) => {
  return {
    type: LOAD_UNITS_BEGIN,
    payload: {
      shoppingListId,
    },
  };
};

export const loadUnitsFinishedAction = ({shoppingListId, units}) => {
  return {
    type: LOAD_UNITS_FINISHED,
    payload: {
      shoppingListId,
      units,
    },
  };
};

export const loadUnitsErrorAction = ({shoppingListId, description}) => {
  return {
    type: LOAD_UNITS_ERROR,
    payload: {
      shoppingListId,
      error: {
        description,
      },
    },
  };
};
