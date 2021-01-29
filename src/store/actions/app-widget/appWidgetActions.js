import AppWidgetActionTypes from '../../types/app-widget/appWidgetTypes';

const appWidgetActions = () => {
  const setRequestedToOpenShoppingListId = ({listId}) => {
    return {
      type: AppWidgetActionTypes.SET_REQUESTED_TO_OPEN_SHOPPING_LIST_ID,
      payload: {listId},
    };
  };

  const resetRequestedToOpenShoppingListId = () => {
    return {
      type: AppWidgetActionTypes.RESET_REQUESTED_TO_OPEN_SHOPPING_LIST_ID,
    };
  };

  const handleChangeProductStatusWidgetRequest = ({
    listId,
    productId,
    productStatus,
    requestId,
  }) => {
    return {
      type: AppWidgetActionTypes.HANDLE_CHANGE_PRODUCT_STATUS_WIDGET_REQUEST,
      payload: {listId, productId, productStatus, requestId},
    };
  };

  return {
    setRequestedToOpenShoppingListId,
    resetRequestedToOpenShoppingListId,
    handleChangeProductStatusWidgetRequest,
  };
};

export default appWidgetActions();
