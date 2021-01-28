import {useState, useEffect} from 'react';
import Services from '../../../../services/Services';
import ChangeProductStatusRequestHandler from '../../../../utils/common/app-widget-requests-handler/handlers/ChangeProductStatusRequestHandler';
import NativeWidgetConstants from '../../../../services/app-widget/native-widget/constants/NativeWidgetConstants';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useWidgetRequestsHandler = ({requests}) => {
  const [widgetRequestsHandled, setWidgetRequestsHandled] = useState(false);

  const {
    MARK_PRODUCT_AS_BOUGHT_REQUEST,
    CHANGE_PRODUCT_STATUS_REQUEST,
  } = NativeWidgetConstants.widgetRequests;

  useEffect(() => {
    setWidgetRequestsHandled(false);

    const handleWidgetRequests = async () => {
      SystemEventsHandler.onInfo({
        info: 'useWidgetRequestsHandler()->WILL_HANDLE_REQUESTS',
      });

      if (!requests) {
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

      if (shoppingListsProductsChangeStatusMap.size > 0) {
        const shoppingListService = Services.get(
          Services.serviceTypes.SHOPPING_LIST,
        );
        if (shoppingListsProductsChangeStatusMap.size > 0) {
          await shoppingListService.changeMultipleShoppingListsProductsStatus({
            shoppingListsProductsChangeStatusMap,
          });
        }
      }

      setWidgetRequestsHandled(true);
    };

    handleWidgetRequests();
  }, [requests, CHANGE_PRODUCT_STATUS_REQUEST, MARK_PRODUCT_AS_BOUGHT_REQUEST]);

  return {
    widgetRequestsHandled,
  };
};

export default useWidgetRequestsHandler;
