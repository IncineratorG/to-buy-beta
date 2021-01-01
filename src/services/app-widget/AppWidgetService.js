import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import AppWidgetServiceEventTypes from './data/event-types/AppWidgetServiceEventTypes';
import NativeWidget from './native-widget/NativeWidget';

const AppWidgetService = () => {
  const notifier = new Notifier();

  const init = async () => {
    SystemEventsHandler.onInfo({info: 'AppWidgetService->init()'});
    const result = await NativeWidget.getWidgetStatus();
    SystemEventsHandler.onInfo({info: 'RESULT: ' + JSON.stringify(result)});

    // ===
    // const {
    //   WIDGET_ACTIVE_CHANGED,
    //   SHOPPING_LIST_SET,
    //   MAP: {ONE, TWO},
    // } = AppWidget.getConstants();
    //
    // SystemEventsHandler.onInfo({
    //   info: 'AppWidgetService->init(): ' + ONE + ' - ' + TWO,
    // });
    // ===
  };

  const subscribe = ({event, handler}) => {
    return notifier.subscribe({event, handler});
  };

  return {
    init,
    subscribe,
  };
};

export default AppWidgetService;

// import {Notifier} from '../../utils/common/service-utils/notifier/Notifier';
// import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
// import AppWidget from './libs/app-widget/AppWidget';
// import {NativeEventEmitter, NativeModules} from 'react-native';
// import AppWidgetServiceEventTypes from './data/event-types/AppWidgetServiceEventTypes';
//
// const AppWidgetService = () => {
//   const {WIDGET_ACTIVE_CHANGED, SHOPPING_LIST_SET} = AppWidget.getConstants();
//   const widgetShoppingListIdsSet = new Set();
//   let widgetActive = false;
//   let currentWidgetShoppingListId = -1;
//   const notifier = new Notifier();
//
//   const init = async () => {
//     const eventEmitter = new NativeEventEmitter(AppWidget);
//
//     const widgetActiveChangedListener = eventEmitter.addListener(
//       WIDGET_ACTIVE_CHANGED,
//       (event) => {
//         const {isActive} = event;
//
//         widgetActive = isActive;
//
//         notifier.notify({
//           event: AppWidgetServiceEventTypes.WIDGET_ACTIVE_CHANGED,
//           data: {isActive},
//         });
//       },
//     );
//
//     const shoppingListSetListener = eventEmitter.addListener(
//       SHOPPING_LIST_SET,
//       (event) => {
//         const {shoppingListId} = event;
//
//         currentWidgetShoppingListId = shoppingListId;
//
//         notifier.notify({
//           event:
//             AppWidgetServiceEventTypes.CURRENT_WIDGET_SHOPPING_LIST_CHANGED,
//           data: {shoppingListId},
//         });
//       },
//     );
//
//     const widgetStatus = await AppWidget.getWidgetStatus();
//     const {isActive, shoppingListId} = widgetStatus;
//
//     widgetActive = isActive;
//     currentWidgetShoppingListId = shoppingListId;
//
//     notifier.notify({
//       event: AppWidgetServiceEventTypes.WIDGET_INITIAL_STATUS_CHANGED,
//       data: {isActive, shoppingListId},
//     });
//   };
//
//   const subscribe = ({event, handler}) => {
//     return notifier.subscribe({event, handler});
//   };
//
//   const isShoppingListInWidget = ({shoppingListId}) => {
//     if (!widgetActive) {
//       return false;
//     }
//
//     return shoppingListId !== currentWidgetShoppingListId;
//   };
//
//   const isWidgetActive = () => {
//     return widgetActive;
//   };
//
//   const setWidgetShoppingList = async ({listId, listName, productsList}) => {
//     SystemEventsHandler.onInfo({
//       info:
//         'AppWidgetService->setWidgetShoppingList(): ' +
//         listId +
//         ' - ' +
//         listName +
//         ' - ' +
//         productsList.length,
//     });
//
//     await AppWidget.setShoppingList(listId.toString(), listName, productsList);
//   };
//
//   return {
//     init,
//     subscribe,
//     isWidgetActive,
//     isShoppingListInWidget,
//     setWidgetShoppingList,
//   };
// };
//
// export default AppWidgetService;
