import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';
import NativeWidgetConstants from '../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import ChangeProductStatusRequestHandler from './handlers/ChangeProductStatusRequestHandler';
import Services from '../../../services/Services';

const AppWidgetRequestsHandler = () => {
  const {
    MARK_PRODUCT_AS_BOUGHT_REQUEST,
    CHANGE_PRODUCT_STATUS_REQUEST,
  } = NativeWidgetConstants.widgetRequests;

  const handle = async ({requests}) => {
    SystemEventsHandler.onInfo({info: 'AppWidgetRequestsHandler->handle()'});

    if (!requests || !requests.length) {
      return;
    }

    const shoppingListsProductsChangeStatusMap = new Map();
    requests.forEach((request) => {
      switch (request.type) {
        case MARK_PRODUCT_AS_BOUGHT_REQUEST: {
          break;
        }

        case CHANGE_PRODUCT_STATUS_REQUEST: {
          const {
            listId,
            productId,
            productStatus,
          } = ChangeProductStatusRequestHandler.handle({request});

          const productsWithNewStatusDataArray = shoppingListsProductsChangeStatusMap.has(
            listId,
          )
            ? shoppingListsProductsChangeStatusMap.get(listId)
            : [];

          productsWithNewStatusDataArray.push({
            listId,
            productId,
            productStatus,
          });

          shoppingListsProductsChangeStatusMap.set(
            listId,
            productsWithNewStatusDataArray,
          );
          break;
        }
      }
    });

    const shoppingListService = Services.get(
      Services.serviceTypes.SHOPPING_LIST,
    );
    if (shoppingListsProductsChangeStatusMap.size > 0) {
      await shoppingListService.changeMultipleShoppingListsProductsStatus({
        shoppingListsProductsChangeStatusMap,
      });
    }

    const currentShoppingLists = await shoppingListService.getShoppingListsWithProducts(
      {},
    );

    const appWidgetService = Services.get(Services.serviceTypes.APP_WIDGET);
    appWidgetService.setInitialShoppingLists({
      shoppingLists: currentShoppingLists,
    });
  };

  return {
    handle,
  };
};

export default AppWidgetRequestsHandler();
