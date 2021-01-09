import AppWidget from '../libs/app-widget/AppWidget';
import NativeWidgetActions from './actions/NativeWidgetActions';

const NativeWidget = () => {
  const getWidgetStatus = async () => {
    const action = NativeWidgetActions.getWidgetStatusAction();
    return await AppWidget.execute(action);
  };

  const setShoppingList = async ({listId, listName, productsList}) => {
    const action = NativeWidgetActions.setShoppingListAction({
      listId,
      listName,
      productsList,
    });
    return await AppWidget.execute(action);
  };

  const setMultipleShoppingLists = async ({shoppingLists}) => {
    const action = NativeWidgetActions.setMultipleShoppingListsAction({
      shoppingLists,
    });
    return await AppWidget.execute(action);
  };

  const removeShoppingList = async ({listId}) => {
    const action = NativeWidgetActions.removeShoppingListAction({listId});
    return await AppWidget.execute(action);
  };

  const getWidgetRequests = async () => {
    const action = NativeWidgetActions.getWidgetRequestsAction();
    return await AppWidget.execute(action);
  };

  const getAndRemoveAllWidgetRequests = async () => {
    const action = NativeWidgetActions.getAndRemoveAllWidgetRequestsAction();
    return await AppWidget.execute(action);
  };

  return {
    getWidgetStatus,
    setShoppingList,
    setMultipleShoppingLists,
    removeShoppingList,
    getWidgetRequests,
    getAndRemoveAllWidgetRequests,
  };
};

export default NativeWidget();
