import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import NativeWidget from './native-widget/NativeWidget';
import NativeWidgetEvents from './native-widget/events/NativeWidgetEvents';

const AppWidgetService = () => {
  const notifier = new Notifier();
  const widget = NativeWidget;

  const init = async () => {
    widget.subscribe({
      event: NativeWidgetEvents.types.OPEN_SHOPPING_LIST_REQUEST_EVENT,
      handler: (data) => {
        notifier.notify({
          event: NativeWidgetEvents.types.OPEN_SHOPPING_LIST_REQUEST_EVENT,
          data: NativeWidgetEvents.openShoppingListRequestEventPayload(data),
        });
      },
    });
    widget.subscribe({
      event: NativeWidgetEvents.types.CHANGE_PRODUCT_STATUS_REQUEST_EVENT,
      handler: (data) => {
        notifier.notify({
          event: NativeWidgetEvents.types.CHANGE_PRODUCT_STATUS_REQUEST_EVENT,
          data: NativeWidgetEvents.changeProductStatusRequestEventPayload(data),
        });
      },
    });
  };

  const subscribe = ({event, handler}) => {
    return notifier.subscribe({event, handler});
  };

  const setInitialShoppingLists = async ({shoppingLists}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetService->setInitialShoppingLists(): ' + shoppingLists.length,
    });

    return await widget.setInitialShoppingLists({shoppingLists});
  };

  const setShoppingList = async ({listId, listName, productsList}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetService->setShoppingList(): ' +
        listId +
        ' - ' +
        listName +
        ' - ' +
        productsList.length,
    });

    return await widget.setShoppingList({listId, listName, productsList});
  };

  const setMultipleShoppingLists = async ({shoppingLists}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetService->setMultipleShoppingLists(): ' + shoppingLists.length,
    });

    return await widget.setMultipleShoppingLists({shoppingLists});
  };

  const removeShoppingList = async ({listId}) => {
    SystemEventsHandler.onInfo({
      info: 'AppWidgetService->removeShoppingList(): ' + listId,
    });

    return await widget.removeShoppingList({listId});
  };

  const getWidgetRequests = async () => {
    SystemEventsHandler.onInfo({
      info: 'AppWidgetService->getWidgetRequests()',
    });

    return await widget.getWidgetRequests();
  };

  const getAndRemoveAllWidgetRequests = async () => {
    SystemEventsHandler.onInfo({
      info: 'AppWidgetService->getAndRemoveAllWidgetRequests()',
    });

    return await widget.getAndRemoveAllWidgetRequests();
  };

  const removeMultipleWidgetRequests = async ({widgetRequestIdsArray}) => {
    SystemEventsHandler.onInfo({
      info: 'AppWidgetService->removeMultipleWidgetRequests()',
    });

    return await widget.removeMultipleWidgetRequests();
  };

  return {
    init,
    subscribe,
    setInitialShoppingLists,
    setShoppingList,
    setMultipleShoppingLists,
    removeShoppingList,
    getWidgetRequests,
    getAndRemoveAllWidgetRequests,
    removeMultipleWidgetRequests,
  };
};

export default AppWidgetService;
