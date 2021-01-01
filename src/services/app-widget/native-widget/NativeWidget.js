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

  return {
    getWidgetStatus,
    setShoppingList,
  };
};

export default NativeWidget();
