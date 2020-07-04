import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_BEGIN,
  LOAD_CATEGORIES_FINISHED,
  LOAD_CATEGORIES_ERROR,
} from '../../types/categories/categoriesTypes';

export const loadCategoriesAction = ({shoppingListId}) => {
  return {
    type: LOAD_CATEGORIES,
    payload: {
      shoppingListId,
    },
  };
};

export const loadCategoriesBeginAction = ({shoppingListId}) => {
  return {
    type: LOAD_CATEGORIES_BEGIN,
    payload: {
      shoppingListId,
    },
  };
};

export const loadCategoriesFinishedAction = ({shoppingListId, categories}) => {
  return {
    type: LOAD_CATEGORIES_FINISHED,
    payload: {
      shoppingListId,
      categories,
    },
  };
};

export const loadCategoriesErrorAction = ({shoppingListId, description}) => {
  return {
    type: LOAD_CATEGORIES_ERROR,
    payload: {
      shoppingListId,
      error: {
        description,
      },
    },
  };
};
