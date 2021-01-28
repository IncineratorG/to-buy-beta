import AppWidget from '../libs/app-widget/AppWidget';
import {NativeEventEmitter} from 'react-native';
import NativeWidgetActions from './actions/NativeWidgetActions';
import NativeWidgetConstants from './constants/NativeWidgetConstants';
import {Notifier} from '../../../utils/common/service-utils/notifier/Notifier';

const NativeWidget = () => {
  const notifier = new Notifier();

  const nativeEventsHandler = () => {
    const eventEmitter = new NativeEventEmitter(AppWidget);

    const openShoppingListRequestEventListener = eventEmitter.addListener(
      NativeWidgetConstants.widgetEvents.OPEN_SHOPPING_LIST_REQUEST_EVENT,
      (event) => {
        notifier.notify({
          event:
            NativeWidgetConstants.widgetEvents.OPEN_SHOPPING_LIST_REQUEST_EVENT,
          data: event,
        });
      },
    );
    const changeProductStatusRequestEventListener = eventEmitter.addListener(
      NativeWidgetConstants.widgetEvents.CHANGE_PRODUCT_STATUS_REQUEST_EVENT,
      (event) => {
        notifier.notify({
          event:
            NativeWidgetConstants.widgetEvents
              .CHANGE_PRODUCT_STATUS_REQUEST_EVENT,
          data: event,
        });
      },
    );
  };
  nativeEventsHandler();

  const subscribe = ({event, handler}) => {
    notifier.subscribe({event, handler});
  };

  const getWidgetStatus = async () => {
    const action = NativeWidgetActions.getWidgetStatusAction();
    return await AppWidget.execute(action);
  };

  const setInitialShoppingLists = async ({shoppingLists}) => {
    const action = NativeWidgetActions.setInitialShoppingListsAction({
      shoppingLists,
    });
    return AppWidget.execute(action);
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

  const removeMultipleWidgetRequests = async ({widgetRequestIdsArray}) => {
    const action = NativeWidgetActions.removeMultipleWidgetRequests({
      widgetRequestIdsArray,
    });
    return await AppWidget.execute(action);
  };

  return {
    subscribe,
    getWidgetStatus,
    setInitialShoppingLists,
    setShoppingList,
    setMultipleShoppingLists,
    removeShoppingList,
    getWidgetRequests,
    getAndRemoveAllWidgetRequests,
    removeMultipleWidgetRequests,
  };
};

export default NativeWidget();
