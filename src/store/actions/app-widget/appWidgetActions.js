import {
  SET_WIDGET_SHOPPING_LIST,
  WIDGET_SHOPPING_LIST_SET,
} from '../../types/app-widget/appWidgetTypes';

export const setWidgetShoppingListAction = ({shoppingListId}) => {
  return {
    type: SET_WIDGET_SHOPPING_LIST,
    payload: {shoppingListId},
  };
};

export const widgetShoppingListSetAction = ({shoppingListId}) => {
  return {
    type: WIDGET_SHOPPING_LIST_SET,
    payload: {shoppingListId},
  };
};
