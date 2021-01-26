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

  return {
    setRequestedToOpenShoppingListId,
    resetRequestedToOpenShoppingListId,
  };
};

export default appWidgetActions();
