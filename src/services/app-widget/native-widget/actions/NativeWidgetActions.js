import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetActions = () => {
  const {
    actionTypes: {
      GET_WIDGET_STATUS,
      SET_SHOPPING_LIST,
      SET_MULTIPLE_SHOPPING_LISTS,
      REMOVE_SHOPPING_LIST,
    },
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

  const setMultipleShoppingListsAction = ({shoppingLists}) => {
    return {
      type: SET_MULTIPLE_SHOPPING_LISTS,
      payload: {
        shoppingLists,
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
    setMultipleShoppingListsAction,
    removeShoppingListAction,
  };
};

export default NativeWidgetActions();
