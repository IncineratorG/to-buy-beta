import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetActions = () => {
  const {
    actionTypes: {GET_WIDGET_STATUS, SET_SHOPPING_LIST, REMOVE_SHOPPING_LIST},
  } = NativeWidgetConstants;

  const getWidgetStatusAction = () => {
    return {
      type: GET_WIDGET_STATUS,
    };
  };

  const setShoppingListAction = ({listId, listName, productsList}) => {
    return {
      type: SET_SHOPPING_LIST,
      payload: {
        listId,
        listName,
        productsList,
      },
    };
  };

  const removeShoppingListAction = ({listId}) => {
    return {
      type: REMOVE_SHOPPING_LIST,
      payload: {
        listId,
      },
    };
  };

  return {
    getWidgetStatusAction,
    setShoppingListAction,
    removeShoppingListAction,
  };
};

export default NativeWidgetActions();
