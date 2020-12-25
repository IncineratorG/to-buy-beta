import {WIDGET_SHOPPING_LIST_SET} from '../../types/app-widget/appWidgetTypes';

const initialState = {
  appWidget: {
    shoppingListId: undefined,
  },
};

export const appWidgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case WIDGET_SHOPPING_LIST_SET: {
      return {
        ...state,
        appWidget: {
          ...state.appWidget,
          shoppingListId: action.payload.shoppingListId,
        },
      };
    }

    default: {
      return state;
    }
  }
};
