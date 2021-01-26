import AppWidgetActionTypes from '../../types/app-widget/appWidgetTypes';

const initialState = {
  appWidget: {
    requestedToOpenShoppingListId: -1,
  },
};

export const appWidgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppWidgetActionTypes.SET_REQUESTED_TO_OPEN_SHOPPING_LIST_ID: {
      return {
        ...state,
        appWidget: {
          ...state.appWidget,
          requestedToOpenShoppingListId: action.payload.listId,
        },
      };
    }

    case AppWidgetActionTypes.RESET_REQUESTED_TO_OPEN_SHOPPING_LIST_ID: {
      return {
        ...state,
        appWidget: {
          ...state.appWidget,
          requestedToOpenShoppingListId: -1,
        },
      };
    }

    default: {
      return state;
    }
  }
};
