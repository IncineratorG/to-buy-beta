import {
  ADD_CATEGORY_BEGIN,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_FINISHED,
  LOAD_CATEGORIES_BEGIN,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_FINISHED,
  REMOVE_CATEGORY_BEGIN,
  REMOVE_CATEGORY_ERROR,
  REMOVE_CATEGORY_FINISHED,
  UPDATE_CATEGORY_BEGIN,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_FINISHED,
} from '../../types/categories/categoriesTypes';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import categoriesComparator from './helpers/categoriesComparator';

const initialState = {
  categories: {
    all: {
      list: [],
      map: new Map(),
    },
    active: {
      list: [],
      map: new Map(),
    },
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
    removeCategory: {
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

      const allCategoriesList = [...action.payload.categories];
      const activeCategoriesList = allCategoriesList.filter((c) => !c.deleted);
      activeCategoriesList.sort(categoriesComparator);

      const allCategoriesMap = new Map();
      const activeCategoriesMap = new Map();

      allCategoriesList.forEach((c) => {
        allCategoriesMap.set(c.id, c);
        if (!c.deleted) {
          activeCategoriesMap.set(c.id, c);
        }
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          all: {
            ...state.categories.all,
            list: allCategoriesList,
            map: allCategoriesMap,
          },
          active: {
            ...state.categories.active,
            list: activeCategoriesList,
            map: activeCategoriesMap,
          },
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

      const allCategoriesList = [...state.categories.all.list, category];
      const activeCategoriesList = allCategoriesList.filter((c) => !c.deleted);
      activeCategoriesList.sort(categoriesComparator);

      const allCategoriesMap = new Map();
      const activeCategoriesMap = new Map();

      allCategoriesList.forEach((c) => {
        allCategoriesMap.set(c.id, c);
        if (!c.deleted) {
          activeCategoriesMap.set(c.id, c);
        }
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          all: {
            ...state.categories.all,
            list: allCategoriesList,
            map: allCategoriesMap,
          },
          active: {
            ...state.categories.active,
            list: activeCategoriesList,
            map: activeCategoriesMap,
          },
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

      const allCategoriesList = state.categories.all.list.filter(
        (c) => c.id !== updatedCategory.id,
      );
      allCategoriesList.push(updatedCategory);
      const activeCategoriesList = allCategoriesList.filter((c) => !c.deleted);
      activeCategoriesList.sort(categoriesComparator);

      const allCategoriesMap = new Map();
      const activeCategoriesMap = new Map();

      allCategoriesList.forEach((c) => {
        allCategoriesMap.set(c.id, c);
        if (!c.deleted) {
          activeCategoriesMap.set(c.id, c);
        }
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          all: {
            ...state.categories.all,
            list: allCategoriesList,
            map: allCategoriesMap,
          },
          active: {
            ...state.categories.active,
            list: activeCategoriesList,
            map: activeCategoriesMap,
          },
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

    case REMOVE_CATEGORY_BEGIN: {
      return {
        ...state,
        categories: {
          ...state.categories,
          removeCategory: {
            ...state.categories.removeCategory,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case REMOVE_CATEGORY_FINISHED: {
      const removedCategory = {...action.payload.category};

      const allCategoriesList = state.categories.all.list.filter(
        (c) => c.id !== removedCategory.id,
      );
      allCategoriesList.push(removedCategory);

      const activeCategoriesList = allCategoriesList.filter((c) => !c.deleted);
      activeCategoriesList.sort(categoriesComparator);

      const allCategoriesMap = new Map();
      const activeCategoriesMap = new Map();

      allCategoriesList.forEach((c) => {
        allCategoriesMap.set(c.id, c);
        if (!c.deleted) {
          activeCategoriesMap.set(c.id, c);
        }
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          all: {
            ...state.categories.all,
            list: allCategoriesList,
            map: allCategoriesMap,
          },
          active: {
            ...state.categories.active,
            list: activeCategoriesList,
            map: activeCategoriesMap,
          },
          removeCategory: {
            ...state.categories.removeCategory,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case REMOVE_CATEGORY_ERROR: {
      return {
        ...state,
        categories: {
          ...state.categories,
          removeCategory: {
            ...state.categories.removeCategory,
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
