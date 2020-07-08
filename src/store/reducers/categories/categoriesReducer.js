import {
  ADD_CATEGORY_BEGIN,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_FINISHED,
  LOAD_CATEGORIES_BEGIN,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_FINISHED,
  UPDATE_CATEGORY_BEGIN,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_FINISHED,
} from '../../types/categories/categoriesTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import categoriesComparator from './helpers/categoriesComparator';

const initialState = {
  categories: {
    list: [],
    map: new Map(),
    loading: false,
    error: {
      hasError: false,
      description: '',
    },
    addCategory: {
      error: {
        hasError: false,
        description: '',
      },
    },
    updateCategory: {
      error: {
        hasError: false,
        description: '',
      },
    },
  },
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES_BEGIN: {
      SystemEventsHandler.onInfo({
        info: 'categoriesReducer()->LOAD_CATEGORIES_BEGIN',
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_CATEGORIES_FINISHED: {
      SystemEventsHandler.onInfo({
        info: 'categoriesReducer()->LOAD_CATEGORIES_FINISHED',
      });

      const categoriesList = [...action.payload.categories];
      categoriesList.sort(categoriesComparator);
      const categoriesMap = new Map();
      categoriesList.forEach((c) => categoriesMap.set(c.id, c));

      return {
        ...state,
        categories: {
          ...state.categories,
          list: categoriesList,
          map: categoriesMap,
          loading: false,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_CATEGORIES_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'categoriesReducer()->LOAD_CATEGORIES_ERROR',
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          error: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case ADD_CATEGORY_BEGIN: {
      return {
        ...state,
        categories: {
          ...state.categories,
          addCategory: {
            ...state.categories.addCategory,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case ADD_CATEGORY_FINISHED: {
      const category = {...action.payload.category};

      const categoriesList = [...state.categories.list, category];
      categoriesList.sort(categoriesComparator);
      const categoriesMap = new Map();
      categoriesList.forEach((c) => categoriesMap.set(c.id, c));

      return {
        ...state,
        categories: {
          ...state.categories,
          list: categoriesList,
          map: categoriesMap,
          addCategory: {
            ...state.categories.addCategory,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case ADD_CATEGORY_ERROR: {
      return {
        ...state,
        categories: {
          ...state.categories,
          addCategory: {
            ...state.categories.addCategory,
            error: {
              hasError: true,
              description: action.payload.error.description,
            },
          },
        },
      };
    }

    case UPDATE_CATEGORY_BEGIN: {
      return {
        ...state,
        categories: {
          ...state.categories,
          updateCategory: {
            ...state.categories.updateCategory,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case UPDATE_CATEGORY_FINISHED: {
      const updatedCategory = {...action.payload.category};

      const categoriesList = state.categories.list.filter(
        (c) => c.id !== updatedCategory.id,
      );
      categoriesList.push(updatedCategory);
      categoriesList.sort(categoriesComparator);

      const categoriesMap = new Map();
      categoriesList.forEach((c) => categoriesMap.set(c.id, c));

      return {
        ...state,
        categories: {
          ...state.categories,
          list: categoriesList,
          map: categoriesMap,
          updateCategory: {
            ...state.categories.updateCategory,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case UPDATE_CATEGORY_ERROR: {
      return {
        ...state,
        categories: {
          ...state.categories,
          updateCategory: {
            ...state.categories.updateCategory,
            error: {
              hasError: true,
              description: action.payload.error.description,
            },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
