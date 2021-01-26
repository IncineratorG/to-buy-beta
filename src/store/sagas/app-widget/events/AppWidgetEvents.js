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

  return {
    openShoppingListRequestEvent,
  };

  // const widgetInitialStatusChangedEvent = (emit) => {
  //   const widgetInitialStatusChangedHandler = ({isActive, shoppingListId}) => {
  //     SystemEventsHandler.onInfo({
  //       info:
  //         'AppWidgetEvents->widgetInitialStatusChanged(): ' +
  //         isActive +
  //         ' - ' +
  //         shoppingListId,
  //     });
  //
  //     emit(setWidgetInitialStateAction({isActive, shoppingListId}));
  //   };
  //
  //   const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
  //
  //   const widgetInitialStatusChangedUnsubscribe = appWidgetService.subscribe({
  //     event: AppWidgetServiceEventTypes.WIDGET_INITIAL_STATUS_CHANGED,
  //     handler: widgetInitialStatusChangedHandler,
  //   });
  //
  //   return () => {
  //     widgetInitialStatusChangedUnsubscribe();
  //   };
  // };
  //
  // const widgetActiveStatusChangedEvent = (emit) => {
  //   const widgetActiveStatusChangedHandler = ({isActive}) => {
  //     // SystemEventsHandler.onInfo({
  //     //   info:
  //     //     'AppWidgetEvents->widgetActiveStatusChangedHandler(): ' + isActive,
  //     // });
  //
  //     emit(setWidgetIsActiveStatusAction({isActive}));
  //   };
  //
  //   const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
  //
  //   const widgetActiveStatusChangedUnsubscribe = appWidgetService.subscribe({
  //     event: AppWidgetServiceEventTypes.WIDGET_ACTIVE_CHANGED,
  //     handler: widgetActiveStatusChangedHandler,
  //   });
  //
  //   return () => {
  //     widgetActiveStatusChangedUnsubscribe();
  //   };
  // };
  //
  // const shoppingListChangedEvent = (emit) => {
  //   const shoppingListChangedHandler = ({shoppingListId}) => {
  //     // SystemEventsHandler.onInfo({
  //     //   info:
  //     //     'AppWidgetEvents->shoppingListChangedHandler(): ' + shoppingListId,
  //     // });
  //
  //     emit(widgetShoppingListSetAction({shoppingListId}));
  //   };
  //
  //   const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
  //
  //   const shoppingListChangedUnsubscribe = appWidgetService.subscribe({
  //     event: AppWidgetServiceEventTypes.CURRENT_WIDGET_SHOPPING_LIST_CHANGED,
  //     handler: shoppingListChangedHandler,
  //   });
  //
  //   return () => {
  //     shoppingListChangedUnsubscribe();
  //   };
  // };
  //
  // return {
  //   widgetInitialStatusChangedEvent,
  //   widgetActiveStatusChangedEvent,
  //   shoppingListChangedEvent,
  // };
};

export default AppWidgetEvents();
