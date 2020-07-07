import {
  ADD_CATEGORY_BEGIN,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_FINISHED,
  LOAD_CATEGORIES_BEGIN,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_FINISHED,
} from '../../types/categories/categoriesTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

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

    default: {
      return state;
    }
  }
};
