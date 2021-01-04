import {
  SET_WIDGET_INITIAL_STATE,
  SET_WIDGET_IS_ACTIVE_STATUS,
  SET_WIDGET_SHOPPING_LIST,
  WIDGET_SHOPPING_LIST_SET,
} from '../../types/app-widget/appWidgetTypes';

export const setWidgetInitialStateAction = ({isActive, shoppingListId}) => {
  return {
    type: SET_WIDGET_INITIAL_STATE,
    payload: {isActive, shoppingListId},
  };
};

export const setWidgetIsActiveStatusAction = ({isActive}) => {
  return {
    type: SET_WIDGET_IS_ACTIVE_STATUS,
    payload: {isActive},
  };
};

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
