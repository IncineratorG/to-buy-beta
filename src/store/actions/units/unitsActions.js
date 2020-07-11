import {
  LOAD_UNITS,
  LOAD_UNITS_BEGIN,
  LOAD_UNITS_FINISHED,
  LOAD_UNITS_ERROR,
  ADD_UNIT,
  ADD_UNIT_BEGIN,
  ADD_UNIT_FINISHED,
  ADD_UNIT_ERROR,
  UPDATE_UNIT,
  UPDATE_UNIT_BEGIN,
  UPDATE_UNIT_FINISHED,
  UPDATE_UNIT_ERROR,
  REMOVE_UNIT,
  REMOVE_UNIT_FINISHED,
  REMOVE_UNIT_ERROR,
  REMOVE_UNIT_BEGIN,
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

export const addUnitAction = ({name}) => {
  return {
    type: ADD_UNIT,
    payload: {name},
  };
};

export const addUnitBeginAction = () => {
  return {
    type: ADD_UNIT_BEGIN,
    payload: undefined,
  };
};

export const addUnitFinishedAction = ({unit}) => {
  return {
    type: ADD_UNIT_FINISHED,
    payload: {unit},
  };
};

export const addUnitErrorAction = ({description}) => {
  return {
    type: ADD_UNIT_ERROR,
    payload: {
      error: {
        description,
      },
    },
  };
};

export const updateUnitAction = ({id, name}) => {
  return {
    type: UPDATE_UNIT,
    payload: {id, name},
  };
};

export const updateUnitBeginAction = ({id}) => {
  return {
    type: UPDATE_UNIT_BEGIN,
    payload: {id},
  };
};

export const updateUnitFinishedAction = ({unit}) => {
  return {
    type: UPDATE_UNIT_FINISHED,
    payload: {unit},
  };
};

export const updateUnitErrorAction = ({id, description}) => {
  return {
    type: UPDATE_UNIT_ERROR,
    payload: {
      id,
      error: {
        description,
      },
    },
  };
};

export const removeUnitAction = ({id}) => {
  return {
    type: REMOVE_UNIT,
    payload: {id},
  };
};

export const removeUnitBeginAction = ({id}) => {
  return {
    type: REMOVE_UNIT_BEGIN,
    payload: {id},
  };
};

export const removeUnitFinishedAction = ({unit}) => {
  return {
    type: REMOVE_UNIT_FINISHED,
    payload: {unit},
  };
};

export const removeUnitErrorAction = ({id, description}) => {
  return {
    type: REMOVE_UNIT_ERROR,
    payload: {
      id,
      error: {
        description,
      },
    },
  };
};
