import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_BEGIN,
  LOAD_CATEGORIES_FINISHED,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_BEGIN,
  ADD_CATEGORY_FINISHED,
  ADD_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_BEGIN,
  UPDATE_CATEGORY_FINISHED,
  UPDATE_CATEGORY_ERROR,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_BEGIN,
  REMOVE_CATEGORY_FINISHED,
  REMOVE_CATEGORY_ERROR,
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

export const addCategoryAction = ({name, color}) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      name,
      color,
    },
  };
};

export const addCategoryBeginAction = () => {
  return {
    type: ADD_CATEGORY_BEGIN,
    payload: undefined,
  };
};

export const addCategoryFinishedAction = ({category}) => {
  return {
    type: ADD_CATEGORY_FINISHED,
    payload: {category},
  };
};

export const addCategoryErrorAction = ({description}) => {
  return {
    type: ADD_CATEGORY_ERROR,
    payload: {
      error: {
        description,
      },
    },
  };
};

export const updateCategoryAction = ({id, name, color}) => {
  return {
    type: UPDATE_CATEGORY,
    payload: {id, name, color},
  };
};

export const updateCategoryBeginAction = ({id}) => {
  return {
    type: UPDATE_CATEGORY_BEGIN,
    payload: {id},
  };
};

export const updateCategoryFinishedAction = ({category}) => {
  return {
    type: UPDATE_CATEGORY_FINISHED,
    payload: {category},
  };
};

export const updateCategoryErrorAction = ({id, description}) => {
  return {
    type: UPDATE_CATEGORY_ERROR,
    payload: {
      id,
      error: {
        description,
      },
    },
  };
};

export const removeCategoryAction = ({id}) => {
  return {
    type: REMOVE_CATEGORY,
    payload: {id},
  };
};

export const removeCategoryBeginAction = ({id}) => {
  return {
    type: REMOVE_CATEGORY_BEGIN,
    payload: {id},
  };
};

export const removeCategoryFinishedAction = ({id}) => {
  return {
    type: REMOVE_CATEGORY_FINISHED,
    payload: {id},
  };
};

export const removeCategoryErrorAction = ({id, description}) => {
  return {
    type: REMOVE_CATEGORY_ERROR,
    payload: {
      id,
      error: {
        description,
      },
    },
  };
};
