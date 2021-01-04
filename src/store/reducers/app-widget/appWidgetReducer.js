import {
  SET_WIDGET_INITIAL_STATE,
  SET_WIDGET_IS_ACTIVE_STATUS,
  WIDGET_SHOPPING_LIST_SET,
} from '../../types/app-widget/appWidgetTypes';

const initialState = {
  appWidget: {
    isActive: false,
    shoppingListId: -1,
  },
};

export const appWidgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WIDGET_INITIAL_STATE: {
      const {
        payload: {isActive, shoppingListId},
      } = action;

      return {
        ...state,
        appWidget: {
          ...state.appWidget,
          isActive,
          shoppingListId,
        },
      };
    }

    case SET_WIDGET_IS_ACTIVE_STATUS: {
      const {
        payload: {isActive},
      } = action;

      return {
        ...state,
        appWidget: {
          ...state.appWidget,
          isActive,
        },
      };
    }

    case WIDGET_SHOPPING_LIST_SET: {
      const {
        payload: {shoppingListId},
      } = action;

      return {
        ...state,
        appWidget: {
          ...state.appWidget,
          shoppingListId,
        },
      };
    }

    default: {
      return state;
    }
  }
};
