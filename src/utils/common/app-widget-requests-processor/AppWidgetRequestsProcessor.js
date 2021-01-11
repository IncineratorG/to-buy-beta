import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
import NativeWidgetConstants from '../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import MarkProductAsBoughtRequestHandler from './processors/MarkProductAsBoughtRequestHandler';
import OpenShoppingListRequestHandler from './processors/OpenShoppingListRequestHandler';

const AppWidgetRequestsProcessor = () => {
  const {
    OPEN_SHOPPING_LIST_REQUEST,
    MARK_PRODUCT_AS_BOUGHT_REQUEST,
  } = NativeWidgetConstants.widgetRequests;

  const openShoppingListRequestHandler = OpenShoppingListRequestHandler;
  const markProductAsBoughtRequestHandler = MarkProductAsBoughtRequestHandler;

  const process = ({requests}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetRequestsProcessor->process(): ' + JSON.stringify(requests),
    });

    const navigationCommands = [];
    const shoppingListModificationCommands = [];
    requests.forEach((request) => {
      switch (request.type) {
        case OPEN_SHOPPING_LIST_REQUEST: {
          const {navigationCommand} = openShoppingListRequestHandler.handle({
            request,
          });
          navigationCommands.push(navigationCommand);
          break;
        }

        case MARK_PRODUCT_AS_BOUGHT_REQUEST: {
          break;
        }
      }
    });

    return {
      navigationCommands,
      shoppingListModificationCommands,
    };
  };

  return {
    process,
  };
};

export default AppWidgetRequestsProcessor();

// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// import NativeWidgetConstants from '../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
// import MarkProductAsBoughtRequestHandler from './processors/MarkProductAsBoughtRequestHandler';
// import OpenShoppingListRequestHandler from './processors/OpenShoppingListRequestHandler';
//
// const AppWidgetRequestsProcessor = () => {
//   const {
//     OPEN_SHOPPING_LIST_REQUEST,
//     MARK_PRODUCT_AS_BOUGHT_REQUEST,
//   } = NativeWidgetConstants.widgetRequests;
//
//   const openShoppingListRequestHandler = OpenShoppingListRequestHandler;
//   const markProductAsBoughtRequestHandler = MarkProductAsBoughtRequestHandler;
//
//   const process = ({requests}) => {
//     SystemEventsHandler.onInfo({
//       info:
//         'AppWidgetRequestsProcessor->process(): ' + JSON.stringify(requests),
//     });
//
//     let shoppingListToOpen = '';
//     requests.forEach((request) => {
//       switch (request.type) {
//         case OPEN_SHOPPING_LIST_REQUEST: {
//           const {shoppingListId} = openShoppingListRequestHandler.handle({
//             request,
//           });
//           shoppingListToOpen = shoppingListId;
//           break;
//         }
//
//         case MARK_PRODUCT_AS_BOUGHT_REQUEST: {
//           markProductAsBoughtRequestHandler.handle({request});
//           break;
//         }
//       }
//     });
//
//     return {
//       shoppingListToOpen,
//       actions: [],
//     };
//   };
//
//   return {
//     process,
//   };
// };
//
// export default AppWidgetRequestsProcessor();
