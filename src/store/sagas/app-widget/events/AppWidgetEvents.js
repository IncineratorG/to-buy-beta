import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import NativeWidgetEvents from '../../../../services/app-widget/native-widget/events/NativeWidgetEvents';
import appWidgetActions from '../../../actions/app-widget/appWidgetActions';

const AppWidgetEvents = () => {
  const openShoppingListRequestEvent = (emit) => {
    const openShoppingListRequestEventHandler = ({listId}) => {
      emit(appWidgetActions.setRequestedToOpenShoppingListId({listId}));
    };

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);

    const openShoppingListRequestEventUnsubscribe = appWidgetService.subscribe({
      event: NativeWidgetEvents.types.OPEN_SHOPPING_LIST_REQUEST_EVENT,
      handler: openShoppingListRequestEventHandler,
    });

    return () => {
      openShoppingListRequestEventUnsubscribe();
    };
  };

  const changeProductStatusRequestEvent = (emit) => {
    const changeProductStatusRequestEventHandler = ({
      listId,
      productId,
      productStatus,
      requestId,
    }) => {
      SystemEventsHandler.onInfo({
        info:
          'changeProductStatusRequestEventHandler(): ' +
          listId +
          ' - ' +
          productId +
          ' - ' +
          productStatus +
          ' - ' +
          requestId,
      });
    };

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);

    const changeProductStatusRequestEventUnsubscribe = appWidgetService.subscribe(
      {
        event: NativeWidgetEvents.types.CHANGE_PRODUCT_STATUS_REQUEST_EVENT,
        handler: changeProductStatusRequestEventHandler,
      },
    );

    return () => {
      changeProductStatusRequestEventUnsubscribe();
    };
  };

  return {
    openShoppingListRequestEvent,
    changeProductStatusRequestEvent,
  };
};

export default AppWidgetEvents();
