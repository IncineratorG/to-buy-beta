import {
  CREATE_SHOPPING_LIST_BEGIN,
  CREATE_SHOPPING_LIST_ERROR,
  CREATE_SHOPPING_LIST_FINISHED,
  LOAD_SHOPPING_LISTS_BEGIN,
  LOAD_SHOPPING_LISTS_ERROR,
  LOAD_SHOPPING_LISTS_FINISHED,
  REMOVE_SHOPPING_LIST_BEGIN,
  REMOVE_SHOPPING_LIST_ERROR,
  REMOVE_SHOPPING_LIST_FINISHED,
  RENAME_SHOPPING_LIST_BEGIN,
  RENAME_SHOPPING_LIST_ERROR,
  RENAME_SHOPPING_LIST_FINISHED,
  RESET_CREATE_SHOPPING_LIST_STATUS,
  UPDATE_SHOPPING_LISTS_BEGIN,
  UPDATE_SHOPPING_LISTS_ERROR,
  UPDATE_SHOPPING_LISTS_FINISHED,
} from '../../types/shopping-lists/shoppingListsTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';
import shoppingListsComparator from './helpers/shoppingListsComparator';

const initialState = {
  shoppingLists: {
    loading: false,
    loadError: {
      hasError: false,
      description: '',
    },
    updating: false,
    updateError: {
      hasError: false,
      description: '',
    },
    allLists: {
      lists: [],
    },
    localLists: {
      lists: [],
    },
    sharedLists: {
      lists: [],
    },
  },

  create: {
    running: false,
    error: {
      description: '',
    },
    success: false,
    createdListId: undefined,
  },
};

export const shoppingListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CREATE_SHOPPING_LIST_STATUS: {
      return {
        ...state,
        create: {
          ...state.create,
          running: false,
          error: {
            description: '',
          },
          success: false,
          createdListId: undefined,
        },
      };
    }

    case CREATE_SHOPPING_LIST_BEGIN: {
      return {
        ...state,
        create: {
          ...state.create,
          running: true,
          error: {
            description: '',
          },
          success: false,
          createdListId: undefined,
        },
      };
    }

    case CREATE_SHOPPING_LIST_FINISHED: {
      return {
        ...state,
        create: {
          ...state.create,
          running: false,
          error: {
            description: '',
          },
          success: true,
          createdListId: action.payload.shoppingList.id,
        },
      };
    }

    case CREATE_SHOPPING_LIST_ERROR: {
      SystemEventsHandler.onInfo({
        info:
          'shoppingListsReducer()->CREATE_SHOPPING_LIST_ERROR: ' +
          action.payload.error.description,
      });

      return {
        ...state,
        create: {
          ...state.create,
          running: false,
          error: {
            description: action.payload.error.description,
          },
          success: false,
          createdListId: undefined,
        },
      };
    }

    case LOAD_SHOPPING_LISTS_BEGIN: {
      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          loading: true,
          loadError: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_SHOPPING_LISTS_FINISHED: {
      const allLists = [...action.payload.shoppingLists];
      allLists.sort(shoppingListsComparator);
      const localLists = [];
      const sharedLists = [];
      allLists.forEach((list) => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          loading: false,
          loadError: {
            hasError: false,
            description: '',
          },
          allLists: {
            lists: allLists,
          },
          localLists: {
            lists: localLists,
          },
          sharedLists: {
            lists: sharedLists,
          },
        },
      };
    }

    case LOAD_SHOPPING_LISTS_ERROR: {
      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          loading: false,
          loadError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case UPDATE_SHOPPING_LISTS_BEGIN: {
      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          updating: true,
          updateError: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case UPDATE_SHOPPING_LISTS_FINISHED: {
      const allLists = [...action.payload.shoppingLists];
      allLists.sort(shoppingListsComparator);
      const localLists = [];
      const sharedLists = [];
      allLists.forEach((list) => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          updating: false,
          updateError: {
            hasError: false,
            description: '',
          },
          allLists: {
            lists: allLists,
          },
          localLists: {
            lists: localLists,
          },
          sharedLists: {
            lists: sharedLists,
          },
        },
      };
    }

    case UPDATE_SHOPPING_LISTS_ERROR: {
      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          updating: false,
          updateError: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    case REMOVE_SHOPPING_LIST_BEGIN: {
      const allLists = state.shoppingLists.allLists.lists.map((list) => {
        if (list.id === action.payload.id) {
          const removedList = {...list};
          removedList.removing = true;
        }
        return list;
      });
      const localLists = [];
      const sharedLists = [];
      allLists.forEach((list) => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          allLists: {
            lists: allLists,
          },
          localLists: {
            lists: localLists,
          },
          sharedLists: {
            lists: sharedLists,
          },
        },
      };
    }

    case REMOVE_SHOPPING_LIST_FINISHED: {
      const allLists = state.shoppingLists.allLists.lists.filter(
        (list) => list.id !== action.payload.id,
      );
      const localLists = [];
      const sharedLists = [];
      allLists.forEach((list) => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          allLists: {
            lists: allLists,
          },
          localLists: {
            lists: localLists,
          },
          sharedLists: {
            lists: sharedLists,
          },
        },
      };
    }

    case REMOVE_SHOPPING_LIST_ERROR: {
      const allLists = state.shoppingLists.allLists.lists.map((list) => {
        if (list.id === action.payload.id) {
          const removedList = {...list};
          removedList.removing = false;
          removedList.removeError = {
            error: true,
            description: action.payload.error.description,
          };
        }
        return list;
      });
      const localLists = [];
      const sharedLists = [];
      allLists.forEach((list) => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          allLists: {
            lists: allLists,
          },
          localLists: {
            lists: localLists,
          },
          sharedLists: {
            lists: sharedLists,
          },
        },
      };
    }

    case RENAME_SHOPPING_LIST_BEGIN: {
      return state;
    }

    case RENAME_SHOPPING_LIST_FINISHED: {
      const {shoppingList} = action.payload;

      const allLists = [...state.shoppingLists.allLists.lists];
      for (let i = 0; i < allLists.length; ++i) {
        if (allLists[i].id === shoppingList.id) {
          allLists[i] = shoppingList;
          break;
        }
      }
      allLists.sort(shoppingListsComparator);

      const localLists = [];
      const sharedLists = [];
      allLists.forEach((list) => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        shoppingLists: {
          ...state.shoppingLists,
          allLists: {
            lists: allLists,
          },
          localLists: {
            lists: localLists,
          },
          sharedLists: {
            lists: sharedLists,
          },
        },
      };
    }

    case RENAME_SHOPPING_LIST_ERROR: {
      SystemEventsHandler.onError({
        err: 'RENAME_SHOPPING_LIST_ERROR->' + action.payload.error.description,
      });

      return state;
    }

    default: {
      return state;
    }
  }
};
