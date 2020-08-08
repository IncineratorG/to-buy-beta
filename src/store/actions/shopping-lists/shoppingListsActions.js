import {
  COPY_SHOPPING_LIST,
  COPY_SHOPPING_LIST_BEGIN,
  COPY_SHOPPING_LIST_ERROR,
  COPY_SHOPPING_LIST_FINISHED,
  CREATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_BEGIN,
  CREATE_SHOPPING_LIST_ERROR,
  CREATE_SHOPPING_LIST_FINISHED,
  LOAD_SHOPPING_LISTS,
  LOAD_SHOPPING_LISTS_BEGIN,
  LOAD_SHOPPING_LISTS_ERROR,
  LOAD_SHOPPING_LISTS_FINISHED,
  REMOVE_SHOPPING_LIST,
  REMOVE_SHOPPING_LIST_BEGIN,
  REMOVE_SHOPPING_LIST_ERROR,
  REMOVE_SHOPPING_LIST_FINISHED,
  RENAME_SHOPPING_LIST,
  RENAME_SHOPPING_LIST_BEGIN,
  RENAME_SHOPPING_LIST_ERROR,
  RENAME_SHOPPING_LIST_FINISHED,
  RESET_CREATE_SHOPPING_LIST_STATUS,
  UPDATE_SHOPPING_LISTS,
  UPDATE_SHOPPING_LISTS_BEGIN,
  UPDATE_SHOPPING_LISTS_ERROR,
  UPDATE_SHOPPING_LISTS_FINISHED,
} from '../../types/shopping-lists/shoppingListsTypes';

export const createShoppingListAction = ({listName}) => {
  return {
    type: CREATE_SHOPPING_LIST,
    payload: {listName},
  };
};

export const createShoppingListBeginAction = () => {
  return {
    type: CREATE_SHOPPING_LIST_BEGIN,
    payload: undefined,
  };
};

export const createShoppingListFinishedAction = ({shoppingList}) => {
  return {
    type: CREATE_SHOPPING_LIST_FINISHED,
    payload: {
      shoppingList,
    },
  };
};

export const createShoppingListErrorAction = ({description}) => {
  return {
    type: CREATE_SHOPPING_LIST_ERROR,
    payload: {
      error: {
        description,
      },
    },
  };
};

export const resetCreateShoppingListStatusAction = () => {
  return {
    type: RESET_CREATE_SHOPPING_LIST_STATUS,
    payload: undefined,
  };
};

export const loadShoppingListsAction = () => {
  return {
    type: LOAD_SHOPPING_LISTS,
    payload: undefined,
  };
};

export const loadShoppingListsBeginAction = () => {
  return {
    type: LOAD_SHOPPING_LISTS_BEGIN,
    payload: undefined,
  };
};

export const loadShoppingListsFinishedAction = ({shoppingLists}) => {
  return {
    type: LOAD_SHOPPING_LISTS_FINISHED,
    payload: {
      shoppingLists,
    },
  };
};

export const loadShoppingListsErrorAction = ({description}) => {
  return {
    type: LOAD_SHOPPING_LISTS_ERROR,
    payload: {
      error: {
        description,
      },
    },
  };
};

export const updateShoppingListsAction = () => {
  return {
    type: UPDATE_SHOPPING_LISTS,
    payload: undefined,
  };
};

export const updateShoppingListsBeginAction = () => {
  return {
    type: UPDATE_SHOPPING_LISTS_BEGIN,
    payload: undefined,
  };
};

export const updateShoppingListsFinishedAction = ({shoppingLists}) => {
  return {
    type: UPDATE_SHOPPING_LISTS_FINISHED,
    payload: {
      shoppingLists,
    },
  };
};

export const updateShoppingListsErrorAction = ({description}) => {
  return {
    type: UPDATE_SHOPPING_LISTS_ERROR,
    payload: {
      error: {
        description,
      },
    },
  };
};

export const removeShoppingListAction = ({id}) => {
  return {
    type: REMOVE_SHOPPING_LIST,
    payload: {
      id,
    },
  };
};

export const removeShoppingListBeginAction = ({id}) => {
  return {
    type: REMOVE_SHOPPING_LIST_BEGIN,
    payload: {
      id,
    },
  };
};

export const removeShoppingListFinishedAction = ({id}) => {
  return {
    type: REMOVE_SHOPPING_LIST_FINISHED,
    payload: {
      id,
    },
  };
};

export const removeShoppingListErrorAction = ({id, description}) => {
  return {
    type: REMOVE_SHOPPING_LIST_ERROR,
    payload: {
      id,
      error: {
        description,
      },
    },
  };
};

export const renameShoppingListAction = ({id, newName}) => {
  return {
    type: RENAME_SHOPPING_LIST,
    payload: {id, newName},
  };
};

export const renameShoppingListBeginAction = ({id}) => {
  return {
    type: RENAME_SHOPPING_LIST_BEGIN,
    payload: {id},
  };
};

export const renameShoppingListFinishedAction = ({shoppingList}) => {
  return {
    type: RENAME_SHOPPING_LIST_FINISHED,
    payload: {shoppingList},
  };
};

export const renameShoppingListErrorAction = ({id, description}) => {
  return {
    type: RENAME_SHOPPING_LIST_ERROR,
    payload: {id, error: {description}},
  };
};

export const copyShoppingListAction = ({shoppingListId, copiedListName}) => {
  return {
    type: COPY_SHOPPING_LIST,
    payload: {shoppingListId, copiedListName},
  };
};

export const copyShoppingListBeginAction = ({shoppingListId}) => {
  return {
    type: COPY_SHOPPING_LIST_BEGIN,
    payload: {shoppingListId},
  };
};

export const copyShoppingListFinishedAction = ({shoppingList}) => {
  return {
    type: COPY_SHOPPING_LIST_FINISHED,
    payload: {shoppingList},
  };
};

export const copyShoppingListErrorAction = ({shoppingListId, description}) => {
  return {
    type: COPY_SHOPPING_LIST_ERROR,
    payload: {shoppingListId, error: {description}},
  };
};
