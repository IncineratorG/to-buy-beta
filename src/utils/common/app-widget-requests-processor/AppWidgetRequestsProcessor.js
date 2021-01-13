import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
import NativeWidgetConstants from '../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import MarkProductAsBoughtRequestHandler from './processors/MarkProductAsBoughtRequestHandler';
import OpenShoppingListRequestHandler from './processors/OpenShoppingListRequestHandler';
import Services from '../../../services/Services';
import ProductStatus from '../../../services/shopping-list/data/product-status/ProductStatus';

const AppWidgetRequestsProcessor = () => {
  const {
    OPEN_SHOPPING_LIST_REQUEST,
    MARK_PRODUCT_AS_BOUGHT_REQUEST,
  } = NativeWidgetConstants.widgetRequests;

  const openShoppingListRequestHandler = OpenShoppingListRequestHandler;
  const markProductAsBoughtRequestHandler = MarkProductAsBoughtRequestHandler;

  const process = async ({requests}) => {
    SystemEventsHandler.onInfo({
      info:
        'AppWidgetRequestsProcessor->process(): ' + JSON.stringify(requests),
    });

    // const navigationCommands = [];

    // ===
    // 1. Определить, нужно ли открывать какой-либо список покупок.
    // ===
    // =====
    // 2. Получить изменения, совершённые виджетом в списках покупок.
    // 3. Синхронизировать эти изменения с базой данных списка покупок приложения.
    // 4. Выгрузить все списки покупок из приложения в виджет.
    // =====

    // ================================
    // 1.******************************
    const navigationCommands = [];
    const productIdsToChangeStatus = [];
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
          const productDescription = markProductAsBoughtRequestHandler.handle({
            request,
          });
          productIdsToChangeStatus.push(productDescription);
          break;
        }
      }
    });
    // ********************************
    // 4.******************************
    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );
    const currentShoppingLists = await shoppingListService.getShoppingListsWithProducts(
      {productsStatus: ProductStatus.NOT_COMPLETED},
    );

    // ===
    const firstList = currentShoppingLists[0];
    SystemEventsHandler.onInfo({info: JSON.stringify(firstList)});
    // ===

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
    await appWidgetService.setMultipleShoppingLists({
      shoppingLists: currentShoppingLists,
    });
    // ********************************
    // ================================

    // const navigationCommands = [];
    // const shoppingListModificationCommands = [];
    // requests.forEach((request) => {
    //   switch (request.type) {
    //     case OPEN_SHOPPING_LIST_REQUEST: {
    //       const {navigationCommand} = openShoppingListRequestHandler.handle({
    //         request,
    //       });
    //       navigationCommands.push(navigationCommand);
    //       break;
    //     }
    //
    //     case MARK_PRODUCT_AS_BOUGHT_REQUEST: {
    //       break;
    //     }
    //   }
    // });
    //
    // return {
    //   navigationCommands,
    //   shoppingListModificationCommands,
    // };

    return {navigationCommands};
  };

  return {
    process,
  };
};

export default AppWidgetRequestsProcessor();

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
//     const navigationCommands = [];
//     const shoppingListModificationCommands = [];
//     requests.forEach((request) => {
//       switch (request.type) {
//         case OPEN_SHOPPING_LIST_REQUEST: {
//           const {navigationCommand} = openShoppingListRequestHandler.handle({
//             request,
//           });
//           navigationCommands.push(navigationCommand);
//           break;
//         }
//
//         case MARK_PRODUCT_AS_BOUGHT_REQUEST: {
//           break;
//         }
//       }
//     });
//
//     return {
//       navigationCommands,
//       shoppingListModificationCommands,
//     };
//   };
//
//   return {
//     process,
//   };
// };
//
// export default AppWidgetRequestsProcessor();

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
