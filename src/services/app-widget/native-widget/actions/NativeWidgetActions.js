import NativeWidgetConstants from '../constants/NativeWidgetConstants';

const NativeWidgetActions = () => {
  const {
    actionTypes: {
      GET_WIDGET_STATUS,
      SET_SHOPPING_LIST,
      SET_INITIAL_SHOPPING_LISTS,
      SET_MULTIPLE_SHOPPING_LISTS,
      REMOVE_SHOPPING_LIST,
      GET_ALL_WIDGET_REQUESTS,
      GET_AND_REMOVE_ALL_WIDGET_REQUESTS,
    },
  } = NativeWidgetConstants;

  const getWidgetStatusAction = () => {
    return {
      type: GET_WIDGET_STATUS,
    };
  };

  const setInitialShoppingListsAction = ({shoppingLists}) => {
    return {
      type: SET_INITIAL_SHOPPING_LISTS,
      payload: {shoppingLists},
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

  const getWidgetRequestsAction = () => {
    return {
      type: GET_ALL_WIDGET_REQUESTS,
    };
  };

  const getAndRemoveAllWidgetRequestsAction = () => {
    return {
      type: GET_AND_REMOVE_ALL_WIDGET_REQUESTS,
    };
  };

  return {
    getWidgetStatusAction,
    setInitialShoppingListsAction,
    setShoppingListAction,
    setMultipleShoppingListsAction,
    removeShoppingListAction,
    getWidgetRequestsAction,
    getAndRemoveAllWidgetRequestsAction,
  };
};

export default NativeWidgetActions();
